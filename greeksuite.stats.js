/* Greek suite — shared stats & streak (reads every app's localStorage).
 * Exposes window.GSStats. No dependencies; safe to load on any page.
 *   gvm_ratings / gvm_schedule  — Verb Memoriser
 *   gvm_grammar                 — Grammar (__srs, __practice, __lessons)
 *   gvm_vocab_track             — Vocabulary ratings/custom
 *   gvm_vocab_srs               — Vocabulary flashcard SRS
 *   gvm_streak                  — daily streak {last, days, best}
 */
window.GSStats = (function () {
  'use strict';
  // SRS ladder length comes from the bridge when it's loaded on the page; the
  // literal fallback matches GVSrsBridge.STAGE_HOURS.length.
  var MASTER = (window.GSSrs && GSSrs.MASTER) || (window.GVSrsBridge && GVSrsBridge.MASTER) || 8;
  function J(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dayStr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function todayStr() { return dayStr(new Date()); }
  function yesterdayStr() { var y = new Date(); y.setDate(y.getDate() - 1); return dayStr(y); }

  /* ---- streak ----
   * touchStreak() records practice activity and is called ONLY when the user
   * actually grades/answers something (verbs, grammar, flashcards). Pages that
   * just display the streak must use the read-only streak(). */
  function touchStreak() {
    var s = J('gvm_streak') || { last: null, days: 0, best: 0 };
    var t = todayStr();
    if (s.last !== t) {
      s.days = (s.last === yesterdayStr()) ? (s.days || 0) + 1 : 1;
      s.last = t; s.best = Math.max(s.best || 0, s.days);
      try { localStorage.setItem('gvm_streak', JSON.stringify(s)); } catch (e) {}
    }
    return s;
  }
  // Read-only view. A streak is only alive if the last practice was today or
  // yesterday; otherwise it reads as 0 (best is kept) without writing anything.
  function streak() {
    var s = J('gvm_streak') || { last: null, days: 0, best: 0 };
    if (s.last !== todayStr() && s.last !== yesterdayStr()) {
      return { last: s.last, days: 0, best: s.best || 0 };
    }
    return s;
  }

  /* ---- grammar ----
   * "Due" everywhere in the suite = due NOW (the same definition the apps use
   * to serve cards), so the hub numbers always match what you can review. */
  function grammar() {
    var g = J('gvm_grammar') || {};
    var srs = g.__srs || {}, prac = g.__practice || {}, lessons = g.__lessons || {};
    var now = Date.now(), due = 0, mastered = 0, inSrs = 0;
    Object.keys(srs).forEach(function (id) {
      var r = srs[id]; inSrs++;
      if (r.stage >= MASTER) mastered++;
      else if ((r.due || 0) <= now) due++;
    });
    var ps = 0, pc = 0;
    Object.keys(prac).forEach(function (id) { ps += prac[id].seen || 0; pc += prac[id].correct || 0; });
    return { due: due, mastered: mastered, inSrs: inSrs, lessonsRead: Object.keys(lessons).length,
      acc: ps ? Math.round(100 * pc / ps) : null, practice: prac, srs: srs };
  }

  /* ---- verbs ---- */
  function verbs() {
    var ratings = J('gvm_ratings') || {}, sched = J('gvm_schedule') || {};
    var now = Date.now(), ids = Object.keys(ratings);
    var vals = ids.map(function (k) { return Number(ratings[k]) || 0; });
    var avg = vals.length ? vals.reduce(function (a, b) { return a + b; }, 0) / vals.length : null;
    var due = 0;
    Object.keys(sched).forEach(function (k) { if ((sched[k].dueAt || 0) <= now) due++; });
    return {
      rated: ids.length, avg: avg != null ? Math.round(avg * 10) / 10 : null,
      mastered: vals.filter(function (v) { return v >= 5; }).length, // rating 5 = mastered (same rule as vocab)
      weak: vals.filter(function (v) { return v > 0 && v <= 2; }).length,
      due: due, ratings: ratings
    };
  }

  /* ---- vocab ---- */
  function vocab() {
    var t = J('gvm_vocab_track') || {}, srs = J('gvm_vocab_srs') || {};
    var rated = 0, mastered = 0, learning = 0;
    Object.keys(t).forEach(function (k) {
      if (k.indexOf('__') === 0) return;
      var r = (t[k] && t[k].rating) || 0;
      if (r >= 5) mastered++; else if (r > 0) learning++;
      if (r > 0) rated++;
    });
    var now = Date.now(), due = 0, inSrs = 0;
    Object.keys(srs).forEach(function (k) {
      if (k.indexOf('__') === 0) return;
      var r = srs[k]; inSrs++;
      if (r.stage < MASTER && (r.due || 0) <= now) due++;
    });
    return { rated: rated, mastered: mastered, learning: learning, srsDue: due, srsCount: inSrs, track: t, srs: srs };
  }

  function totalDue() { var g = grammar(), o = vocab(); return g.due + o.srsDue; } // verbs excluded: conjugation practice, not learning-SRS

  /* ---- trouble spots (weakest items across systems) ----
   * Returns up to `limit` items: { type, label, sub, score, href, leech? }.
   * Leeches — items you keep failing (repeated lapses or a low correct ratio
   * in the SRS) — surface first, ahead of merely low-rated items.
   */
  function isLeech(rec) {
    if (!rec || rec.stage >= MASTER) return false;
    var seen = rec.seen || 0, correct = rec.correct || 0, lapses = rec.lapses || 0;
    return lapses >= 3 || (seen >= 6 && correct / seen <= 0.5);
  }
  function troubleSpots(limit) {
    limit = limit || 12;
    var out = [];
    var leeched = {}; // '<type>|<label>' → true, so leech rows suppress duplicates

    // Vocab leeches (flashcard SRS records carry seen/correct/lapses)
    var vsrs = J('gvm_vocab_srs') || {};
    Object.keys(vsrs).forEach(function (k) {
      if (k.indexOf('__') === 0) return;
      var r = vsrs[k];
      if (isLeech(r)) {
        leeched['vocab|' + k] = true;
        out.push({ type: 'vocab', label: k, sub: 'leech · ' + (r.correct || 0) + '/' + (r.seen || 0) + ' correct', leech: true,
          score: -1 + ((r.seen ? (r.correct || 0) / r.seen : 0)), href: 'flashcards.html' });
      }
    });
    // Grammar leeches (SRS records carry seen/correct/incorrect/lapses)
    var g = J('gvm_grammar') || {}; var gsrs = g.__srs || {};
    Object.keys(gsrs).forEach(function (id) {
      var r = gsrs[id];
      var fails = Math.max(r.lapses || 0, r.incorrect || 0);
      if (r.stage < MASTER && (isLeech(r) || (fails >= 3 && (r.seen ? (r.correct || 0) / r.seen : 0) <= 0.6))) {
        leeched['grammar|' + id] = true;
        out.push({ type: 'grammar', label: id, sub: 'leech · failed ' + fails + '×', leech: true,
          score: -1 + ((r.seen ? (r.correct || 0) / r.seen : 0)), href: 'grammar.html', id: id });
      }
    });
    // Verb leeches (schedule records carry lapses), ONE row per verb
    var sched = J('gvm_schedule') || {};
    var leechVerbs = {};
    Object.keys(sched).forEach(function (id) {
      var s = sched[id];
      if ((s.lapses || 0) >= 3) {
        var parts = id.split('__');
        var key = parts[1] || id;
        var L = leechVerbs[key] || (leechVerbs[key] = { lapses: 0, cards: 0 });
        L.lapses = Math.max(L.lapses, s.lapses); L.cards++;
      }
    });
    Object.keys(leechVerbs).forEach(function (eng) {
      var L = leechVerbs[eng];
      leeched['verb|' + eng] = true;
      out.push({ type: 'verb', label: eng, sub: 'leech · failed ' + L.lapses + '×' + (L.cards > 1 ? ' (' + L.cards + ' cards)' : ''), leech: true,
        score: -1, href: 'verbs.html' });
    });

    // Verbs: rated 0-2, ONE row per verb (a verb has many cards — tenses ×
    // directions × persons — and seeding can create several identical low
    // ratings at once; per-card rows would crowd everything else out).
    var vr = J('gvm_ratings') || {};
    var weakVerbs = {};
    Object.keys(vr).forEach(function (id) {
      var r = Number(vr[id]);
      if (r <= 2) {
        var parts = id.split('__'); // set__english__tense__dir[__person]
        var key = (parts[0] || '') + '__' + (parts[1] || id);
        if (leeched['verb|' + (parts[1] || id)]) return;
        var w = weakVerbs[key];
        if (!w) weakVerbs[key] = { label: parts[1] || id, worst: r, count: 1, tense: parts[2] || '' };
        else { w.count++; if (r < w.worst) { w.worst = r; w.tense = parts[2] || ''; } }
      }
    });
    Object.keys(weakVerbs).forEach(function (k) {
      var w = weakVerbs[k];
      var sub = w.count > 1
        ? (w.count + ' weak cards · worst ' + w.worst + '/5')
        : (w.tense + ' · rated ' + w.worst + '/5');
      out.push({ type: 'verb', label: w.label, sub: sub, score: w.worst, href: 'verbs.html' });
    });
    // Grammar: practice accuracy < 65%
    var prac = g.__practice || {};
    Object.keys(prac).forEach(function (id) {
      if (leeched['grammar|' + id]) return;
      var p = prac[id]; if (p.seen >= 3) {
        var acc = Math.round(100 * p.correct / p.seen);
        if (acc < 65) out.push({ type: 'grammar', label: id, sub: acc + '% practice', score: acc / 20, href: 'grammar.html', id: id });
      }
    });
    // Vocab: rated 1-2
    var vt = J('gvm_vocab_track') || {};
    Object.keys(vt).forEach(function (k) {
      if (k.indexOf('__') === 0) return;
      if (leeched['vocab|' + k]) return;
      var r = (vt[k] && vt[k].rating) || 0;
      if (r > 0 && r <= 2) out.push({ type: 'vocab', label: k, sub: 'rated ' + r + '/5', score: r, href: 'words.html' });
    });
    out.sort(function (a, b) { return a.score - b.score; });
    return out.slice(0, limit);
  }

  return {
    touchStreak: touchStreak, streak: streak,
    grammar: grammar, verbs: verbs, vocab: vocab,
    totalDue: totalDue, troubleSpots: troubleSpots, todayStr: todayStr, MASTER: MASTER
  };
})();
