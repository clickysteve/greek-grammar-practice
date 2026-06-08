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
  var MASTER = 8;
  function J(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dayStr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function todayStr() { return dayStr(new Date()); }

  /* ---- streak ---- */
  function touchStreak() {
    var s = J('gvm_streak') || { last: null, days: 0, best: 0 };
    var t = todayStr();
    if (s.last !== t) {
      var y = new Date(); y.setDate(y.getDate() - 1);
      s.days = (s.last === dayStr(y)) ? (s.days || 0) + 1 : 1;
      s.last = t; s.best = Math.max(s.best || 0, s.days);
      try { localStorage.setItem('gvm_streak', JSON.stringify(s)); } catch (e) {}
    }
    return s;
  }
  function streak() { return J('gvm_streak') || { last: null, days: 0, best: 0 }; }

  /* ---- grammar ---- */
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
      mastered: vals.filter(function (v) { return v >= 4; }).length,
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
   * Returns up to `limit` items: { type, label, sub, score, href }.
   */
  function troubleSpots(limit) {
    limit = limit || 12;
    var out = [];
    // Verbs: rated 0-2
    var vr = J('gvm_ratings') || {};
    Object.keys(vr).forEach(function (id) {
      var r = Number(vr[id]);
      if (r <= 2) {
        var parts = id.split('__'); // set__english__tense__dir[__person]
        out.push({ type: 'verb', label: parts[1] || id, sub: (parts[2] || '') + ' · rated ' + r + '/5', score: r, href: 'verbs.html' });
      }
    });
    // Grammar: practice accuracy < 65%
    var g = J('gvm_grammar') || {}; var prac = g.__practice || {};
    Object.keys(prac).forEach(function (id) {
      var p = prac[id]; if (p.seen >= 3) {
        var acc = Math.round(100 * p.correct / p.seen);
        if (acc < 65) out.push({ type: 'grammar', label: id, sub: acc + '% practice', score: acc / 20, href: 'grammar.html', id: id });
      }
    });
    // Vocab: rated 1-2
    var vt = J('gvm_vocab_track') || {};
    Object.keys(vt).forEach(function (k) {
      if (k.indexOf('__') === 0) return;
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
