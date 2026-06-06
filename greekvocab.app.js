/* Greek Vocabulary Writing Prompts — app logic.
 * Reads globals from greekvocab.data.js: VOCAB, SCENARIOS, THEMES.
 * Also reads greekverbprac.data.js (VERBS, CONJUGATIONS) when loaded, to show real
 * conjugations for verbs that exist in the Verb Memoriser.
 *
 * Tracking: progress lives in localStorage ('gvm_vocab_track'):
 *   { "<greek word>": { known: bool, seen: n, used: n, last: "YYYY-MM-DD" }, "__settings": {...} }
 *   - seen  = times the word was drawn into a prompt
 *   - used  = times you actually used it in your writing
 *   - known = retired from the pool (unless "include known" is on)
 * Sampling is weighted toward words you have seen/used least.
 */
(function () {
  'use strict';

  var VOCAB = window.VOCAB || [];
  var SCENARIOS = window.SCENARIOS || [];
  var THEMES = window.THEMES || {};
  var VERB_APP = { verbs: window.VERBS || [], conj: window.CONJUGATIONS || {} };

  var CATS = [
    { key: 'everyNoun', label: 'Everyday nouns',        match: function (w) { return w.register === 'everyday'  && w.pos === 'noun'; }, def: 2 },
    { key: 'everyAdj',  label: 'Everyday adjectives',   match: function (w) { return w.register === 'everyday'  && w.pos === 'adj';  }, def: 1 },
    { key: 'verb',      label: 'Verbs',                 match: function (w) { return w.pos === 'verb'; },   def: 1 },
    { key: 'connector', label: 'Connectors & little words', match: function (w) { return w.pos === 'adv'; }, def: 0 },
    { key: 'phrase',    label: 'Phrases & expressions', match: function (w) { return w.pos === 'phrase'; }, def: 0 },
    { key: 'exprAdj',   label: 'Expressive adjectives', match: function (w) { return w.register === 'expressive' && w.pos === 'adj';  }, def: 1 },
    { key: 'exprNoun',  label: 'Expressive nouns',      match: function (w) { return w.register === 'expressive' && w.pos === 'noun'; }, def: 1 }
  ];
  var MAX_PER_CAT = 8;

  var pools = {};
  CATS.forEach(function (c) { pools[c.key] = VOCAB.filter(c.match); });

  var state = {
    counts: {}, words: [], scenario: SCENARIOS[0] || { gr: '', en: '' },
    daily: false, usedCounted: {}
  };
  CATS.forEach(function (c) { state.counts[c.key] = c.def; });
  // Restore saved per-category counts (settings live in a collapsed panel, so make them sticky).
  var COUNTS_KEY = 'gvm_vocab_counts';
  try {
    var savedCounts = JSON.parse(localStorage.getItem(COUNTS_KEY) || '{}');
    CATS.forEach(function (c) {
      if (typeof savedCounts[c.key] === 'number') {
        state.counts[c.key] = Math.max(0, Math.min(MAX_PER_CAT, savedCounts[c.key]));
      }
    });
  } catch (e) {}
  function saveCounts() { try { localStorage.setItem(COUNTS_KEY, JSON.stringify(state.counts)); } catch (e) {} }

  var el = {};
  ['scenarioText', 'scenarioEn', 'scenarioBadge', 'wordChips', 'catSteppers', 'totalNote',
   'newPromptBtn', 'todayBtn', 'shuffleWordsBtn', 'newScenarioBtn', 'writing',
   'writeCount', 'clearBtn', 'poolNote', 'wordModal',
   'trackStats', 'includeKnownBtn', 'exportBtn', 'importBtn', 'importFile', 'resetTrackBtn', 'ghBtn'].forEach(function (id) {
    el[id] = document.getElementById(id);
  });

  /* ---------- tracking store ---------- */
  var TRACK_KEY = 'gvm_vocab_track';
  var DAILY_KEY = 'gvm_vocab_daily';
  var track = {};
  try { track = JSON.parse(localStorage.getItem(TRACK_KEY) || '{}'); } catch (e) { track = {}; }
  // Migrate older data: binary known → rating (0–5 scale; 5 = known).
  function migrateTrack(t) {
    if (!t || typeof t !== 'object') t = {};
    Object.keys(t).forEach(function (k) {
      if (k === '__settings') return;
      var r = t[k];
      if (r && typeof r.rating !== 'number') r.rating = r.known ? 5 : 0;
    });
    if (!t.__settings) t.__settings = { includeKnown: false };
    return t;
  }
  track = migrateTrack(track);

  function saveTrack() { try { localStorage.setItem(TRACK_KEY, JSON.stringify(track)); } catch (e) {} }
  function rec(gr) {
    if (!track[gr]) track[gr] = { rating: 0, seen: 0, used: 0, last: null };
    return track[gr];
  }
  function ratingOf(gr) { return track[gr] ? (track[gr].rating || 0) : 0; }
  function setRating(gr, n) {
    var r = rec(gr);
    r.rating = Math.max(0, Math.min(5, n));
    saveTrack();
    renderTrackStats();
  }
  function todayStr() {
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  function countSeen(words) {
    words.forEach(function (w) { var r = rec(w.gr); r.seen += 1; r.last = todayStr(); });
    saveTrack();
  }

  /* ---------- randomness & weighted sampling ---------- */
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function dateSeed() {
    var d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }
  function shuffle(arr, rng) {
    var rnd = rng || Math.random;
    var c = arr.slice();
    for (var i = c.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = c[i]; c[i] = c[j]; c[j] = t;
    }
    return c;
  }
  // Weight: fresh words come up most; well-practised ones fade; the higher your 0–5
  // rating, the rarer the word — at 5 it is retired (unless "include mastered" is on).
  function weightOf(w) {
    var r = track[w.gr];
    var rating = r ? (r.rating || 0) : 0;
    if (rating >= 5 && !track.__settings.includeKnown) return 0;
    var seen = r ? r.seen : 0, used = r ? r.used : 0;
    var base = 1 / (1 + seen * 0.5 + used * 1.5);
    var factor = Math.max(0.05, 1 - rating / 5);
    return base * factor;
  }
  function weightedTake(arr, n, rng) {
    var rnd = rng || Math.random;
    var items = arr.slice(), out = [];
    while (out.length < n && items.length) {
      var weights = items.map(weightOf);
      var total = weights.reduce(function (a, b) { return a + b; }, 0);
      if (total <= 0) break; // everything known & excluded
      var r = rnd() * total, i = 0;
      while (i < items.length - 1 && r > weights[i]) { r -= weights[i]; i++; }
      out.push(items.splice(i, 1)[0]);
    }
    return out;
  }

  function buildWords(rng) {
    var picked = [];
    CATS.forEach(function (c) { picked = picked.concat(weightedTake(pools[c.key], state.counts[c.key], rng)); });
    return shuffle(picked, rng);
  }
  function pickScenario(rng) {
    if (!SCENARIOS.length) return { gr: '', en: '' };
    if (rng) return SCENARIOS[Math.floor(rng() * SCENARIOS.length)];
    var s;
    do { s = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]; }
    while (SCENARIOS.length > 1 && s === state.scenario);
    return s;
  }

  /* ---------- text helpers ---------- */
  function normGr(s) {
    return (s || '').toLowerCase()
      .replace(/[άἀἁ]/g, 'α').replace(/έ/g, 'ε').replace(/ή/g, 'η')
      .replace(/[ίϊΐ]/g, 'ι').replace(/ό/g, 'ο').replace(/[ύϋΰ]/g, 'υ')
      .replace(/ώ/g, 'ω').replace(/ς/g, 'σ');
  }
  function wordUsed(word, text) {
    var t = normGr(text);
    var base = normGr(word.gr);
    var stem = base.length > 5 ? base.slice(0, base.length - 2) : base;
    return t.indexOf(stem) !== -1;
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

  var VOWELS = 'αεηιουωάέήίόύώ';
  function adjForms(w) {
    var g = w.gr;
    function ew(e) { return g.length > e.length && g.slice(-e.length) === e; }
    if (ew('ος') || ew('ός')) {
      var acc = ew('ός');
      var stem = g.slice(0, -2);
      var femEnd = VOWELS.indexOf(stem.slice(-1)) !== -1 ? (acc ? 'ά' : 'α') : (acc ? 'ή' : 'η');
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

  function findVerbAppEntry(gr) {
    var n = normGr(gr);
    for (var i = 0; i < VERB_APP.verbs.length; i++) {
      var v = VERB_APP.verbs[i];
      if (normGr(v.present) === n) return v;
      if (v.presentAlt && v.presentAlt.some(function (a) { return normGr(a) === n; })) return v;
    }
    return null;
  }

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
    var rel = VOCAB.filter(function (w) {
      if (w.gr === word.gr || w.pos === 'phrase') return false;
      var b = normGr(w.gr).replace(/σ$/, '');
      var n = commonPrefixLen(base, b);
      var m = Math.min(base.length, b.length);
      return n >= 4 && n >= m - 3;
    });
    CURATED_RELATED.forEach(function (pair) {
      var other = pair[0] === word.gr ? pair[1] : (pair[1] === word.gr ? pair[0] : null);
      if (other && !rel.some(function (w) { return w.gr === other; })) {
        var found = VOCAB.filter(function (w) { return w.gr === other; })[0];
        if (found) rel.push(found);
      }
    });
    return rel.slice(0, 8);
  }

  /* ---------- word detail modal ---------- */
  var POS_LABEL = { noun: 'noun', adj: 'adjective', verb: 'verb', adv: 'adverb / connector', phrase: 'phrase' };

  function detailHtml(w) {
    var color = (THEMES[w.theme] && THEMES[w.theme].color) || 'var(--accent)';
    var r = track[w.gr] || { rating: 0, seen: 0, used: 0 };
    var rating = r.rating || 0;
    var h = '<div class="wd-head" style="--chip:' + color + '">' +
      '<div class="wd-gr">' + (w.art ? '<span class="art">' + escapeHtml(w.art) + '</span> ' : '') + escapeHtml(w.gr) + '</div>' +
      '<div class="wd-en">' + escapeHtml(w.en) + '</div>' +
      '<div class="wd-meta">' + escapeHtml(POS_LABEL[w.pos] || w.pos) + ' · ' + escapeHtml(w.register) +
        (THEMES[w.theme] ? ' · ' + escapeHtml(THEMES[w.theme].label) : '') + '</div>' +
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

    var persons = ['εγώ', 'εσύ', 'αυτός/ή', 'εμείς', 'εσείς', 'αυτοί'];

    if (w.pos === 'verb') {
      var v = findVerbAppEntry(w.gr);
      if (v) {
        h += '<div class="wd-section"><div class="wd-title">Principal parts (from the Verb Memoriser)</div><div class="wd-grid">' +
          [['Present', v.present], ['Simple past', v.past], ['Past continuous', v.pastCont], ['Future simple', v.future], ['Future continuous', v.futureCont]]
            .map(function (row) { return '<div class="wd-k">' + row[0] + '</div><div class="wd-v">' + escapeHtml(row[1] || '—') + '</div>'; }).join('') +
          '</div></div>';
        var ov = VERB_APP.conj[v.english];
        var pres = (ov && ov.present) || verbPresentTable(w.gr);
        var past = ov && ov.pastCont;
        if (pres) {
          h += '<div class="wd-section"><div class="wd-title">Present' + (past ? ' & imperfect' : '') + '</div><div class="wd-grid wd-grid-' + (past ? '3' : '2') + '">' +
            persons.map(function (p, i) {
              return '<div class="wd-k">' + p + '</div><div class="wd-v">' + escapeHtml(pres[i] || '') + '</div>' +
                (past ? '<div class="wd-v muted">' + escapeHtml(past[i] || '') + '</div>' : '');
            }).join('') + '</div></div>';
        }
        h += '<p class="wd-link"><a href="index.html">Drill this verb in the Verb Memoriser →</a></p>';
      } else {
        var t = verbPresentTable(w.gr);
        if (t) {
          h += '<div class="wd-section"><div class="wd-title">Present tense (rule-based)</div><div class="wd-grid wd-grid-2">' +
            persons.map(function (p, i) { return '<div class="wd-k">' + p + '</div><div class="wd-v">' + escapeHtml(t[i]) + '</div>'; }).join('') +
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

  var currentDetailWord = null;
  function openDetail(w) {
    currentDetailWord = w;
    el.wordModal.innerHTML =
      '<div class="modal-backdrop"></div>' +
      '<div class="modal-panel"><button class="modal-close" aria-label="Close">×</button>' + detailHtml(w) + '</div>';
    el.wordModal.style.display = 'block';
    el.wordModal.querySelector('.modal-backdrop').addEventListener('click', closeDetail);
    el.wordModal.querySelector('.modal-close').addEventListener('click', closeDetail);
    el.wordModal.querySelectorAll('.wd-rate').forEach(function (b) {
      b.addEventListener('click', function () {
        setRating(b.getAttribute('data-gr'), parseInt(b.getAttribute('data-r'), 10));
        openDetail(w); // re-render with new state
        renderChips(); // refresh chip dots
      });
    });
    el.wordModal.querySelectorAll('.wd-rel-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        var found = VOCAB.filter(function (x) { return x.gr === b.getAttribute('data-gr'); })[0];
        if (found) openDetail(found);
      });
    });
  }
  function closeDetail() { el.wordModal.style.display = 'none'; el.wordModal.innerHTML = ''; currentDetailWord = null; }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDetail(); return; }
    // 0–5 rates the word while its detail panel is open (and you are not typing somewhere).
    if (currentDetailWord && /^[0-5]$/.test(e.key) &&
        !(e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'))) {
      setRating(currentDetailWord.gr, parseInt(e.key, 10));
      openDetail(currentDetailWord);
      renderChips();
    }
  });

  /* ---------- rendering ---------- */
  function renderScenario() {
    var n = String(state.words.length);
    el.scenarioText.textContent = (state.scenario.gr || '').replace('{n}', n);
    el.scenarioEn.textContent = (state.scenario.en || '').replace('{n}', n);
    el.scenarioBadge.style.display = state.daily ? '' : 'none';
  }

  function renderChips() {
    if (!state.words.length) {
      el.wordChips.innerHTML = '<div class="no-words">No words selected — turn up at least one category above, or you have marked everything as known.</div>';
      return;
    }
    var text = el.writing ? el.writing.value : '';
    el.wordChips.innerHTML = state.words.map(function (w, i) {
      var used = wordUsed(w, text);
      if (used && !state.usedCounted[w.gr]) {
        state.usedCounted[w.gr] = true;
        var r = rec(w.gr); r.used += 1; r.last = todayStr(); saveTrack();
        renderTrackStats();
      }
      var color = (THEMES[w.theme] && THEMES[w.theme].color) || 'var(--accent)';
      var article = w.art ? '<span class="art">' + escapeHtml(w.art) + '</span> ' : '';
      var reg = w.register === 'everyday' ? 'everyday' : 'expressive';
      var rating = ratingOf(w.gr);
      var dots = '';
      for (var k = 1; k <= 5; k++) dots += '<span class="dot' + (k <= rating ? ' on' : '') + '"></span>';
      return '' +
        '<div class="vchip ' + reg + (used ? ' used' : '') + '" style="--chip:' + color + '" data-idx="' + i + '" title="Click for grammar, related words & rating">' +
          '<div class="vchip-gr">' + article + escapeHtml(w.gr) +
            (used ? '<span class="tick">✓</span>' : '') + '</div>' +
          '<div class="vchip-en">' + escapeHtml(w.en) + '</div>' +
          '<div class="vchip-meta"><span class="pos">' + escapeHtml(w.pos) + '</span>' +
            '<span class="reg reg-' + reg + '">' + reg + '</span>' +
            '<span class="vchip-dots lvl' + rating + '" title="known ' + rating + '/5">' + dots + '</span></div>' +
        '</div>';
    }).join('');
  }
  el.wordChips.addEventListener('click', function (e) {
    var chip = e.target.closest('.vchip');
    if (chip) openDetail(state.words[parseInt(chip.getAttribute('data-idx'), 10)]);
  });

  function totalCount() {
    return CATS.reduce(function (s, c) { return s + state.counts[c.key]; }, 0);
  }
  function renderSteppers() {
    el.catSteppers.innerHTML = CATS.map(function (c) {
      var n = state.counts[c.key];
      var max = Math.min(MAX_PER_CAT, pools[c.key].length);
      return '' +
        '<div class="stepper-row">' +
          '<span class="stepper-label">' + escapeHtml(c.label) +
            ' <span class="stepper-pool">(' + pools[c.key].length + ')</span></span>' +
          '<span class="stepper-ctrl">' +
            '<button class="step-btn" data-cat="' + c.key + '" data-d="-1"' + (n <= 0 ? ' disabled' : '') + '>−</button>' +
            '<span class="step-val">' + n + '</span>' +
            '<button class="step-btn" data-cat="' + c.key + '" data-d="1"' + (n >= max ? ' disabled' : '') + '>+</button>' +
          '</span>' +
        '</div>';
    }).join('');
    el.totalNote.textContent = totalCount() + ' words per prompt';
    el.catSteppers.querySelectorAll('.step-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-cat');
        var d = parseInt(b.getAttribute('data-d'), 10);
        var max = Math.min(MAX_PER_CAT, pools[key].length);
        state.counts[key] = Math.max(0, Math.min(max, state.counts[key] + d));
        saveCounts();
        renderSteppers();
        regenerate(false);
      });
    });
  }
  function renderPoolNote() {
    el.poolNote.textContent = 'Pool: ' + VOCAB.length + ' words · ' + SCENARIOS.length + ' scenarios';
  }
  function renderWriteCount() {
    var v = el.writing.value.trim();
    var words = v ? v.split(/\s+/).length : 0;
    el.writeCount.textContent = words + (words === 1 ? ' word' : ' words');
  }
  function renderTrackStats() {
    var mastered = 0, learning = 0, unseen = 0;
    VOCAB.forEach(function (w) {
      var r = track[w.gr];
      var rt = r ? (r.rating || 0) : 0;
      if (rt >= 5) mastered++;
      else if (rt > 0 || (r && r.used > 0)) learning++;
      else if (!r || !r.seen) unseen++;
    });
    el.trackStats.textContent = mastered + ' mastered (5) · ' + learning + ' learning (1–4) · ' + unseen + ' unseen of ' + VOCAB.length;
    el.includeKnownBtn.classList.toggle('active', !!track.__settings.includeKnown);
    el.includeKnownBtn.textContent = track.__settings.includeKnown ? 'Mastered words: included' : 'Mastered words: hidden';
  }

  /* ---------- actions ---------- */
  function regenerate(newScenario) {
    state.daily = false;
    state.usedCounted = {};
    state.words = buildWords();
    countSeen(state.words);
    if (newScenario) state.scenario = pickScenario();
    renderScenario(); renderChips(); renderPoolNote(); renderTrackStats();
  }
  function todayPrompt() {
    var snap = null;
    try { snap = JSON.parse(localStorage.getItem(DAILY_KEY) || 'null'); } catch (e) {}
    state.usedCounted = {};
    if (snap && snap.date === todayStr()) {
      state.words = snap.words.map(function (g) {
        return VOCAB.filter(function (w) { return w.gr === g; })[0];
      }).filter(Boolean);
      state.scenario = SCENARIOS[snap.scenario] || SCENARIOS[0];
    } else {
      var rng = mulberry32(dateSeed());
      state.scenario = pickScenario(rng);
      state.words = buildWords(rng);
      countSeen(state.words);
      try {
        localStorage.setItem(DAILY_KEY, JSON.stringify({
          date: todayStr(),
          scenario: SCENARIOS.indexOf(state.scenario),
          words: state.words.map(function (w) { return w.gr; })
        }));
      } catch (e) {}
    }
    state.daily = true;
    renderScenario(); renderChips(); renderPoolNote(); renderTrackStats();
  }

  function exportTrack() {
    var blob = new Blob([JSON.stringify(track, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'greek-vocab-progress-' + todayStr() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
  function importTrack(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (typeof data !== 'object' || data === null) throw new Error('bad format');
        track = migrateTrack(data);
        saveTrack();
        renderTrackStats();
        alert('Progress imported.');
      } catch (e) { alert('Could not read that file — is it a progress export?'); }
    };
    reader.readAsText(file);
  }

  /* ---------- GitHub gist backup ---------- */
  var GH_KEY = 'gvm_vocab_gh';
  var GIST_FILE = 'greek-vocab-progress.json';
  var gh = { token: '', gistId: '', lastBackup: 0 };
  try {
    var stored = JSON.parse(localStorage.getItem(GH_KEY) || '{}');
    if (stored && typeof stored === 'object') {
      gh.token = stored.token || ''; gh.gistId = stored.gistId || ''; gh.lastBackup = stored.lastBackup || 0;
    }
  } catch (e) {}
  function ghSave() { try { localStorage.setItem(GH_KEY, JSON.stringify(gh)); } catch (e) {} }

  function ghApi(method, path, body) {
    return window.fetch('https://api.github.com' + path, {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + gh.token,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (res) {
      if (!res.ok) throw new Error('GitHub said ' + res.status + (res.status === 401 ? ' (bad token?)' : ''));
      return res.json();
    });
  }

  function backupToGist(silent) {
    if (!gh.token) { if (!silent) openGhModal('Add a token first.'); return Promise.resolve(); }
    var payload = { description: 'Greek vocab progress backup (greek.clickysteve.com)', files: {} };
    payload.files[GIST_FILE] = { content: JSON.stringify(track, null, 2) };
    var p = gh.gistId
      ? ghApi('PATCH', '/gists/' + gh.gistId, payload)
      : ghApi('POST', '/gists', Object.assign({ public: false }, payload));
    return p.then(function (g) {
      if (g && g.id) gh.gistId = g.id;
      gh.lastBackup = Date.now();
      ghSave();
      if (!silent) openGhModal('Backed up ✓');
    }).catch(function (e) {
      if (!silent) openGhModal('Backup failed: ' + e.message);
    });
  }

  function restoreFromGist() {
    if (!gh.token || !gh.gistId) { openGhModal('No backup to restore from yet.'); return; }
    ghApi('GET', '/gists/' + gh.gistId).then(function (g) {
      var f = g.files && g.files[GIST_FILE];
      if (!f || !f.content) throw new Error('no backup file found in the gist');
      if (!confirm('Replace the progress in this browser with the GitHub backup?')) return;
      var data = JSON.parse(f.content);
      if (typeof data !== 'object' || data === null) throw new Error('bad backup format');
      track = migrateTrack(data);
      saveTrack();
      renderTrackStats();
      openGhModal('Restored ✓');
    }).catch(function (e) { openGhModal('Restore failed: ' + e.message); });
  }

  function openGhModal(status) {
    var hasToken = !!gh.token;
    var lastTxt = gh.lastBackup ? new Date(gh.lastBackup).toLocaleString() : 'never';
    el.wordModal.innerHTML =
      '<div class="modal-backdrop"></div>' +
      '<div class="modal-panel"><button class="modal-close" aria-label="Close">×</button>' +
      '<div class="wd-title" style="margin-bottom:10px;">GitHub backup — secret gist</div>' +
      '<p class="wd-approx" style="margin:0 0 12px;">Create a <strong>classic</strong> personal access token with only the <code>gist</code> scope (GitHub → Settings → Developer settings → Tokens (classic)). It is stored only in this browser. Auto-backup runs when the page loads and the last backup is over a day old.</p>' +
      '<input type="password" id="ghTokenInput" class="gh-input" placeholder="' + (hasToken ? 'token saved — paste here to replace' : 'ghp_…') + '" />' +
      '<div class="gh-status">' +
        'Last backup: ' + escapeHtml(lastTxt) +
        (gh.gistId ? ' · <a href="https://gist.github.com/' + escapeHtml(gh.gistId) + '" target="_blank" rel="noopener">view gist</a>' : '') +
        (status ? '<div class="gh-msg">' + escapeHtml(status) + '</div>' : '') +
      '</div>' +
      '<div class="gh-btns">' +
        '<button id="ghSaveBtn">Save token</button>' +
        '<button id="ghBackupNowBtn"' + (hasToken ? '' : ' disabled') + '>Backup now</button>' +
        '<button id="ghRestoreBtn"' + (gh.token && gh.gistId ? '' : ' disabled') + '>Restore</button>' +
        '<button id="ghForgetBtn"' + (hasToken ? '' : ' disabled') + '>Forget token</button>' +
      '</div></div>';
    el.wordModal.style.display = 'block';
    el.wordModal.querySelector('.modal-backdrop').addEventListener('click', closeDetail);
    el.wordModal.querySelector('.modal-close').addEventListener('click', closeDetail);
    document.getElementById('ghSaveBtn').addEventListener('click', function () {
      var v = document.getElementById('ghTokenInput').value.trim();
      if (v) { gh.token = v; ghSave(); openGhModal('Token saved.'); }
    });
    document.getElementById('ghBackupNowBtn').addEventListener('click', function () { backupToGist(false); });
    document.getElementById('ghRestoreBtn').addEventListener('click', restoreFromGist);
    document.getElementById('ghForgetBtn').addEventListener('click', function () {
      gh.token = ''; ghSave(); openGhModal('Token forgotten (gist kept).');
    });
  }

  /* ---------- wiring ---------- */
  el.newPromptBtn.addEventListener('click', function () { regenerate(true); });
  el.todayBtn.addEventListener('click', todayPrompt);
  el.shuffleWordsBtn.addEventListener('click', function () { regenerate(false); });
  el.newScenarioBtn.addEventListener('click', function () {
    state.daily = false;
    state.scenario = pickScenario();
    renderScenario();
  });
  el.writing.addEventListener('input', function () { renderChips(); renderWriteCount(); });
  el.clearBtn.addEventListener('click', function () {
    if (!el.writing.value || confirm('Clear your writing?')) {
      el.writing.value = '';
      renderChips(); renderWriteCount();
      el.writing.focus();
    }
  });
  el.includeKnownBtn.addEventListener('click', function () {
    track.__settings.includeKnown = !track.__settings.includeKnown;
    saveTrack();
    renderTrackStats();
  });
  el.exportBtn.addEventListener('click', exportTrack);
  el.importBtn.addEventListener('click', function () { el.importFile.click(); });
  el.importFile.addEventListener('change', function () {
    if (el.importFile.files && el.importFile.files[0]) importTrack(el.importFile.files[0]);
    el.importFile.value = '';
  });
  el.resetTrackBtn.addEventListener('click', function () {
    if (confirm('Reset ALL vocabulary progress (known words, counts)? This cannot be undone.')) {
      track = { __settings: { includeKnown: false } };
      saveTrack();
      try { localStorage.removeItem(DAILY_KEY); } catch (e) {}
      renderTrackStats();
    }
  });

  el.ghBtn.addEventListener('click', function () { openGhModal(); });

  /* ---------- init ---------- */
  renderSteppers();
  regenerate(true);
  renderWriteCount();
  renderTrackStats();
  // Auto-backup to the gist if configured and the last backup is over 24h old.
  if (gh.token && window.fetch && Date.now() - (gh.lastBackup || 0) > 24 * 3600 * 1000) {
    backupToGist(true);
  }
})();
