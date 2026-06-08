/* Greek Vocabulary — shared module.
 * Used by both vocab.html (writing prompts) and words.html (word list).
 * Provides: the word-detail modal (conjugations, grammar, related words, rating),
 * the rule-based grammar engine, and the bridge to the Verb Memoriser's ratings.
 *
 * Verb-practice bridge ('gvm_ratings', written by greekverbprac.app.js):
 *   - keys: `${set}__${english}__${tense}__${dir}` (+ `__${personIdx}` for conjugation drill)
 *   - verbPracticeStats(entry) → average + count of that verb's rated cards
 *   - effectiveRating(word, own) → max(own, round(drill average)) for linked verbs,
 *     so verbs you have drilled well fade out of writing prompts automatically
 *   - seedVerbRatings(entry, rating) → fills in UNRATED vocab-drill cards only,
 *     so rating a verb here gives the drill a starting point without overwriting
 *     anything you rated tense-by-tense.
 */
window.GVShared = (function () {
  'use strict';

  var cfg = null; // {modalEl, vocab, themes, statsOf(gr), onRate(gr, rating)}
  var currentWord = null;

  /* ---------- text helpers ---------- */
  function normGr(s) {
    return (s || '').toLowerCase()
      .replace(/[άἀἁ]/g, 'α').replace(/έ/g, 'ε').replace(/ή/g, 'η')
      .replace(/[ίϊΐ]/g, 'ι').replace(/ό/g, 'ο').replace(/[ύϋΰ]/g, 'υ')
      .replace(/ώ/g, 'ω').replace(/ς/g, 'σ');
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- grammar engine (rule-based, approximate) ---------- */
  var INVARIABLE_NOUNS = ['ασανσέρ', 'ρεπό', 'μαγιό', 'ραντεβού', 'καλοριφέρ', 'μπουφάν', 'στυλό', 'κλισέ', 'ρούμι', 'τσάι', 'σινεμά'];
  var GR_VOWELS = 'αεηιουωάέήίόύώϊϋΐΰ';
  var GR_ACCENTED = 'άέήίόύώΐΰ';

  function shiftStressRight(s) {
    var DE = { 'ά': 'α', 'έ': 'ε', 'ή': 'η', 'ί': 'ι', 'ό': 'ο', 'ύ': 'υ', 'ώ': 'ω', 'ΐ': 'ϊ', 'ΰ': 'ϋ' };
    var AC = { 'α': 'ά', 'ε': 'έ', 'η': 'ή', 'ι': 'ί', 'ο': 'ό', 'υ': 'ύ', 'ω': 'ώ' };
    var arr = s.split('');
    var i = -1;
    for (var x = 0; x < arr.length; x++) if (GR_ACCENTED.indexOf(arr[x]) !== -1) { i = x; break; }
    if (i < 0) return s;
    arr[i] = DE[arr[i]];
    var j = i + 1;
    while (j < arr.length && GR_VOWELS.indexOf(arr[j]) !== -1) j++;
    while (j < arr.length && GR_VOWELS.indexOf(arr[j]) === -1) j++;
    if (j >= arr.length) return s;
    var k = j;
    while (k + 1 < arr.length && GR_VOWELS.indexOf(arr[k + 1]) !== -1) k++;
    arr[k] = AC[arr[k]] || arr[k];
    return arr.join('');
  }
  function groupsAfterAccent(s) {
    var i = -1;
    for (var x = 0; x < s.length; x++) if (GR_ACCENTED.indexOf(s[x]) !== -1) { i = x; break; }
    if (i < 0) return 0;
    var n = 0, inGroup = true;
    for (var y = i + 1; y < s.length; y++) {
      var isV = GR_VOWELS.indexOf(s[y]) !== -1;
      if (isV && !inGroup) n++;
      inGroup = isV;
    }
    return n;
  }

  function nounPlural(w) {
    var g = w.gr;
    if (INVARIABLE_NOUNS.indexOf(g) !== -1) return null;
    if (w.art === 'τα' || w.art === 'οι') return '(plural-only word)';
    function endsWith(e) { return g.length > e.length && g.slice(-e.length) === e; }
    var proparox = groupsAfterAccent(g) >= 2;
    if (w.art === 'ο') {
      if (endsWith('ος')) return g.slice(0, -2) + 'οι';
      if (endsWith('άς')) return g.slice(0, -2) + 'άδες';
      if (endsWith('ας')) return g.slice(0, -2) + 'ες';
      if (endsWith('ής')) return g.slice(0, -2) + 'ές';
      if (endsWith('ης')) return g.slice(0, -2) + 'ες';
    }
    if (w.art === 'η') {
      if (endsWith('ση') || endsWith('ξη') || endsWith('ψη')) {
        var pl = g.slice(0, -1) + 'εις';
        return proparox ? shiftStressRight(pl) : pl;
      }
      if (endsWith('α')) return g.slice(0, -1) + 'ες';
      if (endsWith('ά')) return g.slice(0, -1) + 'άδες';
      if (endsWith('η')) return g.slice(0, -1) + 'ες';
      if (endsWith('ή')) return g.slice(0, -1) + 'ές';
    }
    if (w.art === 'το') {
      if (endsWith('μα')) {
        var plm = g + 'τα';
        return proparox ? shiftStressRight(plm) : plm;
      }
      if (endsWith('ος')) return g.slice(0, -2) + 'η';
      if (endsWith('ί'))  return g.slice(0, -1) + 'ιά';
      if (endsWith('ι'))  return g + 'α';
      if (endsWith('ο'))  return g.slice(0, -1) + 'α';
      if (endsWith('ό'))  return g.slice(0, -1) + 'ά';
    }
    return null;
  }

  var VOWELS_PLAIN = 'αεηιουωάέήίόύώ';
  function adjForms(w) {
    var g = w.gr;
    function ew(e) { return g.length > e.length && g.slice(-e.length) === e; }
    if (ew('ος') || ew('ός')) {
      var acc = ew('ός');
      var stem = g.slice(0, -2);
      var femEnd = VOWELS_PLAIN.indexOf(stem.slice(-1)) !== -1 ? (acc ? 'ά' : 'α') : (acc ? 'ή' : 'η');
      return { fem: stem + femEnd, neut: stem + (acc ? 'ό' : 'ο'), adv: stem + (acc ? 'ά' : 'α'), note: 'Adverb in -α (more formal: -ως).' };
    }
    if (ew('ής')) {
      return { fem: g, neut: g.slice(0, -2) + 'ές', adv: g.slice(0, -2) + 'ώς', note: 'Same form for masculine and feminine.' };
    }
    if (ew('ης')) {
      return { fem: g.slice(0, -2) + 'α', neut: g.slice(0, -2) + 'ικο', adv: null, note: 'Colloquial -ης / -α / -ικο pattern (τεμπέλης → τεμπέλα → τεμπέλικο).' };
    }
    if (ew('ύς')) {
      return { fem: g.slice(0, -2) + 'ιά', neut: g.slice(0, -2) + 'ύ', adv: g.slice(0, -2) + 'ιά', note: 'The -ύς / -ιά / -ύ pattern (βαρύς, βαριά, βαρύ).' };
    }
    if (ew('ων')) {
      return { fem: g.slice(0, -2) + 'ουσα', neut: g.slice(0, -2) + 'ον', adv: null, note: 'Participle-style -ων / -ουσα / -ον pattern.' };
    }
    return null;
  }

  function verbPresentTable(g) {
    function ew(e) { return g.length > e.length && g.slice(-e.length) === e; }
    var s;
    if (ew('άω'))   { s = g.slice(0, -2); return [g, s + 'άς', s + 'άει', s + 'άμε', s + 'άτε', s + 'άνε']; }
    if (ew('ιέμαι')){ s = g.slice(0, -5); return [g, s + 'ιέσαι', s + 'ιέται', s + 'ιόμαστε', s + 'ιέστε', s + 'ιούνται']; }
    if (ew('ούμαι')){ s = g.slice(0, -5); return [g, s + 'είσαι', s + 'είται', s + 'ούμαστε', s + 'είστε', s + 'ούνται']; }
    if (ew('άμαι')) { s = g.slice(0, -4); return [g, s + 'άσαι', s + 'άται', s + 'όμαστε', s + 'άστε', s + 'ούνται']; }
    if (ew('ομαι')) { s = g.slice(0, -4); return [g, s + 'εσαι', s + 'εται', s + 'όμαστε', s + 'εστε', s + 'ονται']; }
    if (ew('ώ'))    { s = g.slice(0, -1); return [g, s + 'είς', s + 'εί', s + 'ούμε', s + 'είτε', s + 'ούν']; }
    if (ew('ω'))    { s = g.slice(0, -1); return [g, s + 'εις', s + 'ει', s + 'ουμε', s + 'ετε', s + 'ουν']; }
    return null;
  }

  /* ---------- verb app lookup & rating bridge ---------- */
  function verbApp() { return { verbs: window.VERBS || [], conj: window.CONJUGATIONS || {} }; }

  function findVerbAppEntry(gr) {
    var n = normGr(gr);
    var verbs = verbApp().verbs;
    for (var i = 0; i < verbs.length; i++) {
      var v = verbs[i];
      if (normGr(v.present) === n) return v;
      if (v.presentAlt && v.presentAlt.some(function (a) { return normGr(a) === n; })) return v;
    }
    return null;
  }

  var TENSES = ['present', 'past', 'future', 'pastCont', 'futureCont'];
  var DIRS = ['en-to-gr', 'gr-to-en'];
  function loadDrillRatings() {
    try { return JSON.parse(localStorage.getItem('gvm_ratings') || '{}'); } catch (e) { return {}; }
  }
  function verbPracticeStats(entry) {
    if (!entry) return null;
    var ratings = loadDrillRatings();
    var prefix = entry.set + '__' + entry.english + '__';
    var sum = 0, count = 0;
    Object.keys(ratings).forEach(function (k) {
      if (k.indexOf(prefix) === 0) { sum += Number(ratings[k]) || 0; count++; }
    });
    return count ? { avg: sum / count, count: count } : { avg: 0, count: 0 };
  }
  // Seed UNRATED vocab-drill cards with a rating; never overwrite existing ratings.
  function seedVerbRatings(entry, rating) {
    if (!entry) return 0;
    var ratings = loadDrillRatings();
    var seeded = 0;
    TENSES.forEach(function (t) {
      DIRS.forEach(function (d) {
        var key = entry.set + '__' + entry.english + '__' + t + '__' + d;
        if (!(key in ratings)) { ratings[key] = rating; seeded++; }
      });
    });
    if (seeded) { try { localStorage.setItem('gvm_ratings', JSON.stringify(ratings)); } catch (e) {} }
    return seeded;
  }
  // For linked verbs, drill knowledge raises the effective rating used in sampling.
  function effectiveRating(word, ownRating) {
    if (word.pos !== 'verb') return ownRating;
    var entry = findVerbAppEntry(word.gr);
    if (!entry) return ownRating;
    var stats = verbPracticeStats(entry);
    if (!stats || stats.count === 0) return ownRating;
    return Math.max(ownRating, Math.round(stats.avg));
  }

  /* ---------- related words ---------- */
  var CURATED_RELATED = [
    ['θυμός', 'θυμωμένος'], ['φοβάμαι', 'φοβισμένος'], ['ντρέπομαι', 'ντροπιασμένος'],
    ['άγχος', 'αγχωμένος'], ['γελάω', 'γελαστός'], ['όνειρο', 'ονειρεύομαι'], ['όνειρο', 'ονειρικός']
  ];
  function commonPrefixLen(a, b) {
    var n = 0;
    while (n < a.length && n < b.length && a[n] === b[n]) n++;
    return n;
  }
  function relatedWords(word) {
    var base = normGr(word.gr).replace(/σ$/, '');
    var rel = cfg.vocab.filter(function (w) {
      if (w.gr === word.gr || w.pos === 'phrase') return false;
      var b = normGr(w.gr).replace(/σ$/, '');
      var n = commonPrefixLen(base, b);
      var m = Math.min(base.length, b.length);
      return n >= 4 && n >= m - 3;
    });
    CURATED_RELATED.forEach(function (pair) {
      var other = pair[0] === word.gr ? pair[1] : (pair[1] === word.gr ? pair[0] : null);
      if (other && !rel.some(function (w) { return w.gr === other; })) {
        var found = cfg.vocab.filter(function (w) { return w.gr === other; })[0];
        if (found) rel.push(found);
      }
    });
    return rel.slice(0, 8);
  }

  /* ---------- detail modal ---------- */
  var POS_LABEL = { noun: 'noun', adj: 'adjective', verb: 'verb', adv: 'adverb / connector', phrase: 'phrase' };
  var PERSONS = ['εγώ', 'εσύ', 'αυτός/ή', 'εμείς', 'εσείς', 'αυτοί'];

  function detailHtml(w) {
    var color = (cfg.themes[w.theme] && cfg.themes[w.theme].color) || 'var(--accent)';
    var r = cfg.statsOf(w.gr);
    var rating = r.rating || 0;
    var h = '<div class="wd-head" style="--chip:' + color + '">' +
      '<div class="wd-gr">' + (w.art ? '<span class="art">' + escapeHtml(w.art) + '</span> ' : '') + escapeHtml(w.gr) +
        (w.custom ? ' <span class="wd-custom">custom</span>' : '') + '</div>' +
      '<div class="wd-en">' + escapeHtml(w.en) + '</div>' +
      '<div class="wd-meta">' + escapeHtml(POS_LABEL[w.pos] || w.pos) + ' · ' + escapeHtml(w.register) +
        (cfg.themes[w.theme] ? ' · ' + escapeHtml(cfg.themes[w.theme].label) : '') + '</div>' +
      '</div>';

    var rateBtns = '';
    for (var ri = 0; ri <= 5; ri++) {
      rateBtns += '<button class="wd-rate lvl' + ri + (ri === rating ? ' active' : '') + '" data-gr="' + escapeHtml(w.gr) + '" data-r="' + ri + '">' + ri + '</button>';
    }
    h += '<div class="wd-track">' +
      '<div class="wd-rate-row"><span class="wd-rate-label">Known:</span>' + rateBtns + '</div>' +
      '<span class="wd-track-stats">0 = not at all · 5 = known (retired) · drawn ' + (r.seen || 0) + '× · used ' + (r.used || 0) + '× · keys 0–5 work</span>' +
      '</div>';

    if (w.note) h += '<p class="wd-note">' + escapeHtml(w.note) + '</p>';

    if (w.pos === 'verb') {
      var v = findVerbAppEntry(w.gr);
      if (v) {
        var stats = verbPracticeStats(v);
        h += '<div class="wd-section"><div class="wd-title">Principal parts (from the Verb Memoriser)</div><div class="wd-grid">' +
          [['Present', v.present], ['Simple past', v.past], ['Past continuous', v.pastCont], ['Future simple', v.future], ['Future continuous', v.futureCont]]
            .map(function (row) { return '<div class="wd-k">' + row[0] + '</div><div class="wd-v">' + escapeHtml(row[1] || '—') + '</div>'; }).join('') +
          '</div></div>';
        var ov = verbApp().conj[v.english];
        var pres = (ov && ov.present) || verbPresentTable(w.gr);
        var past = ov && ov.pastCont;
        if (pres) {
          h += '<div class="wd-section"><div class="wd-title">Present' + (past ? ' & imperfect' : '') + '</div><div class="wd-grid wd-grid-' + (past ? '3' : '2') + '">' +
            PERSONS.map(function (p, i) {
              return '<div class="wd-k">' + p + '</div><div class="wd-v">' + escapeHtml(pres[i] || '') + '</div>' +
                (past ? '<div class="wd-v muted">' + escapeHtml(past[i] || '') + '</div>' : '');
            }).join('') + '</div></div>';
        }
        h += '<p class="wd-drill">' +
          (stats && stats.count
            ? 'Verb practice: average <strong>' + stats.avg.toFixed(1) + '/5</strong> across ' + stats.count + ' rated cards. The higher of the two ratings decides how often it appears in prompts.'
            : 'Not yet rated in verb practice. Rating it here seeds its drill cards.') +
          '</p>' +
          '<p class="wd-link"><a href="verbs.html">Drill this verb in the Verb Memoriser →</a></p>';
      } else {
        var t = verbPresentTable(w.gr);
        if (t) {
          h += '<div class="wd-section"><div class="wd-title">Present tense (rule-based)</div><div class="wd-grid wd-grid-2">' +
            PERSONS.map(function (p, i) { return '<div class="wd-k">' + p + '</div><div class="wd-v">' + escapeHtml(t[i]) + '</div>'; }).join('') +
            '</div><p class="wd-approx">Generated from the ending pattern — irregular verbs may differ.</p></div>';
        }
      }
    }

    if (w.pos === 'noun') {
      var gender = { 'ο': 'masculine (ο)', 'η': 'feminine (η)', 'το': 'neuter (το)', 'οι': 'plural', 'τα': 'plural' }[w.art] || '';
      var pl = nounPlural(w);
      h += '<div class="wd-section"><div class="wd-title">Grammar</div><div class="wd-grid">' +
        '<div class="wd-k">Gender</div><div class="wd-v">' + gender + '</div>' +
        (pl ? '<div class="wd-k">Plural ≈</div><div class="wd-v">' + escapeHtml(pl) + '</div>' : '') +
        '</div>' + (pl ? '<p class="wd-approx">Plural is rule-based — a few nouns are irregular.</p>' : '') + '</div>';
    }

    if (w.pos === 'adj') {
      var f = adjForms(w);
      if (f) {
        h += '<div class="wd-section"><div class="wd-title">Forms ≈</div><div class="wd-grid">' +
          '<div class="wd-k">Masculine</div><div class="wd-v">' + escapeHtml(w.gr) + '</div>' +
          '<div class="wd-k">Feminine</div><div class="wd-v">' + escapeHtml(f.fem) + '</div>' +
          '<div class="wd-k">Neuter</div><div class="wd-v">' + escapeHtml(f.neut) + '</div>' +
          (f.adv ? '<div class="wd-k">Adverb</div><div class="wd-v">' + escapeHtml(f.adv) + '</div>' : '') +
          '</div><p class="wd-approx">' + escapeHtml(f.note) + '</p></div>';
      }
    }

    var rel = relatedWords(w);
    if (rel.length) {
      h += '<div class="wd-section"><div class="wd-title">Related words</div><div class="wd-rel">' +
        rel.map(function (x) {
          return '<button class="wd-rel-chip" data-gr="' + escapeHtml(x.gr) + '">' +
            (x.art ? x.art + ' ' : '') + escapeHtml(x.gr) + ' <span class="wd-rel-en">' + escapeHtml(x.en) + '</span></button>';
        }).join('') + '</div></div>';
    }
    return h;
  }

  function rateAndRefresh(gr, rating) {
    cfg.onRate(gr, rating);
    // Bridge: seed unrated drill cards for linked verbs.
    var word = cfg.vocab.filter(function (x) { return x.gr === gr; })[0];
    if (word && word.pos === 'verb') {
      var entry = findVerbAppEntry(gr);
      if (entry) seedVerbRatings(entry, rating);
    }
    if (currentWord) openDetail(currentWord);
  }

  function openDetail(w) {
    currentWord = w;
    cfg.modalEl.innerHTML =
      '<div class="modal-backdrop"></div>' +
      '<div class="modal-panel"><button class="modal-close" aria-label="Close">×</button>' + detailHtml(w) + '</div>';
    cfg.modalEl.style.display = 'block';
    cfg.modalEl.querySelector('.modal-backdrop').addEventListener('click', closeDetail);
    cfg.modalEl.querySelector('.modal-close').addEventListener('click', closeDetail);
    cfg.modalEl.querySelectorAll('.wd-rate').forEach(function (b) {
      b.addEventListener('click', function () {
        rateAndRefresh(b.getAttribute('data-gr'), parseInt(b.getAttribute('data-r'), 10));
      });
    });
    cfg.modalEl.querySelectorAll('.wd-rel-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        var found = cfg.vocab.filter(function (x) { return x.gr === b.getAttribute('data-gr'); })[0];
        if (found) openDetail(found);
      });
    });
  }
  function closeDetail() {
    cfg.modalEl.style.display = 'none';
    cfg.modalEl.innerHTML = '';
    currentWord = null;
  }

  function init(config) {
    cfg = config;
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDetail(); return; }
      if (currentWord && /^[0-5]$/.test(e.key) &&
          !(e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'))) {
        rateAndRefresh(currentWord.gr, parseInt(e.key, 10));
      }
    });
  }

  return {
    init: init,
    openDetail: openDetail,
    closeDetail: closeDetail,
    normGr: normGr,
    findVerbAppEntry: findVerbAppEntry,
    verbPracticeStats: verbPracticeStats,
    seedVerbRatings: seedVerbRatings,
    effectiveRating: effectiveRating,
    nounPlural: nounPlural,
    adjForms: adjForms,
    verbPresentTable: verbPresentTable
  };
})();
