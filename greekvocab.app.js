/* Greek Vocabulary Writing Prompts — app logic.
 * Reads globals from greekvocab.data.js: VOCAB, SCENARIOS, THEMES.
 * Also reads greekverbprac.data.js (VERBS, CONJUGATIONS) when loaded, to show real
 * conjugations for verbs that exist in the Verb Memoriser.
 * No backend: word lists regenerate by re-sampling the pool client-side.
 */
(function () {
  'use strict';

  var VOCAB = window.VOCAB || [];
  var SCENARIOS = window.SCENARIOS || [];
  var THEMES = window.THEMES || {};
  var VERB_APP = { verbs: window.VERBS || [], conj: window.CONJUGATIONS || {} };

  // Word categories, each with an independent stepper.
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

  var state = { counts: {}, words: [], scenario: SCENARIOS[0] || { gr: '', en: '' }, daily: false };
  CATS.forEach(function (c) { state.counts[c.key] = c.def; });

  var el = {};
  ['scenarioText', 'scenarioEn', 'scenarioBadge', 'wordChips', 'catSteppers', 'totalNote',
   'newPromptBtn', 'todayBtn', 'shuffleWordsBtn', 'newScenarioBtn', 'writing',
   'writeCount', 'clearBtn', 'poolNote', 'wordModal'].forEach(function (id) {
    el[id] = document.getElementById(id);
  });

  /* ---------- randomness (regular + date-seeded) ---------- */
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
  function take(arr, n, rng) { return shuffle(arr, rng).slice(0, Math.max(0, Math.min(n, arr.length))); }

  function buildWords(rng) {
    var picked = [];
    CATS.forEach(function (c) { picked = picked.concat(take(pools[c.key], state.counts[c.key], rng)); });
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
  // Move the stress one vowel-group to the right (υπόθεσεις → υποθέσεις).
  function shiftStressRight(s) {
    var DE = { 'ά': 'α', 'έ': 'ε', 'ή': 'η', 'ί': 'ι', 'ό': 'ο', 'ύ': 'υ', 'ώ': 'ω', 'ΐ': 'ϊ', 'ΰ': 'ϋ' };
    var AC = { 'α': 'ά', 'ε': 'έ', 'η': 'ή', 'ι': 'ί', 'ο': 'ό', 'υ': 'ύ', 'ω': 'ώ' };
    var arr = s.split('');
    var i = -1;
    for (var x = 0; x < arr.length; x++) if (GR_ACCENTED.indexOf(arr[x]) !== -1) { i = x; break; }
    if (i < 0) return s;
    arr[i] = DE[arr[i]];
    var j = i + 1;
    while (j < arr.length && GR_VOWELS.indexOf(arr[j]) !== -1) j++;       // end of current vowel group
    while (j < arr.length && GR_VOWELS.indexOf(arr[j]) === -1) j++;      // skip consonants
    if (j >= arr.length) return s;
    var k = j;
    while (k + 1 < arr.length && GR_VOWELS.indexOf(arr[k + 1]) !== -1) k++; // accent the last vowel of the group
    arr[k] = AC[arr[k]] || arr[k];
    return arr.join('');
  }
  // Count vowel groups after the accented one (2+ means proparoxytone).
  function groupsAfterAccent(s) {
    var i = -1;
    for (var x = 0; x < s.length; x++) if (GR_ACCENTED.indexOf(s[x]) !== -1) { i = x; break; }
    if (i < 0) return 0;
    var n = 0, inGroup = true; // we start inside the accented group
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
    var h = '<div class="wd-head" style="--chip:' + color + '">' +
      '<div class="wd-gr">' + (w.art ? '<span class="art">' + escapeHtml(w.art) + '</span> ' : '') + escapeHtml(w.gr) + '</div>' +
      '<div class="wd-en">' + escapeHtml(w.en) + '</div>' +
      '<div class="wd-meta">' + escapeHtml(POS_LABEL[w.pos] || w.pos) + ' · ' + escapeHtml(w.register) +
        (THEMES[w.theme] ? ' · ' + escapeHtml(THEMES[w.theme].label) : '') + '</div>' +
      '</div>';

    if (w.note) h += '<p class="wd-note">' + escapeHtml(w.note) + '</p>';

    var persons = ['εγώ', 'εσύ', 'αυτός/ή', 'εμείς', 'εσείς', 'αυτοί'];

    if (w.pos === 'verb') {
      var v = findVerbAppEntry(w.gr);
      if (v) {
        h += '<div class="wd-section"><div class="wd-title">Principal parts (from the Verb Memoriser)</div><div class="wd-grid">' +
          [['Present', v.present], ['Simple past', v.past], ['Past continuous', v.pastCont], ['Future simple', v.future], ['Future continuous', v.futureCont]]
            .map(function (r) { return '<div class="wd-k">' + r[0] + '</div><div class="wd-v">' + escapeHtml(r[1] || '—') + '</div>'; }).join('') +
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
        rel.map(function (r) {
          return '<button class="wd-rel-chip" data-gr="' + escapeHtml(r.gr) + '">' +
            (r.art ? r.art + ' ' : '') + escapeHtml(r.gr) + ' <span class="wd-rel-en">' + escapeHtml(r.en) + '</span></button>';
        }).join('') + '</div></div>';
    }
    return h;
  }

  function openDetail(w) {
    el.wordModal.innerHTML =
      '<div class="modal-backdrop"></div>' +
      '<div class="modal-panel"><button class="modal-close" aria-label="Close">×</button>' + detailHtml(w) + '</div>';
    el.wordModal.style.display = 'block';
    el.wordModal.querySelector('.modal-backdrop').addEventListener('click', closeDetail);
    el.wordModal.querySelector('.modal-close').addEventListener('click', closeDetail);
    el.wordModal.querySelectorAll('.wd-rel-chip').forEach(function (b) {
      b.addEventListener('click', function () {
        var found = VOCAB.filter(function (x) { return x.gr === b.getAttribute('data-gr'); })[0];
        if (found) openDetail(found);
      });
    });
  }
  function closeDetail() { el.wordModal.style.display = 'none'; el.wordModal.innerHTML = ''; }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDetail(); });

  /* ---------- rendering ---------- */
  function renderScenario() {
    var n = String(state.words.length);
    el.scenarioText.textContent = (state.scenario.gr || '').replace('{n}', n);
    el.scenarioEn.textContent = (state.scenario.en || '').replace('{n}', n);
    el.scenarioBadge.style.display = state.daily ? '' : 'none';
  }

  function renderChips() {
    if (!state.words.length) {
      el.wordChips.innerHTML = '<div class="no-words">No words selected — turn up at least one category above.</div>';
      return;
    }
    var text = el.writing ? el.writing.value : '';
    el.wordChips.innerHTML = state.words.map(function (w, i) {
      var used = wordUsed(w, text);
      var color = (THEMES[w.theme] && THEMES[w.theme].color) || 'var(--accent)';
      var article = w.art ? '<span class="art">' + escapeHtml(w.art) + '</span> ' : '';
      var reg = w.register === 'everyday' ? 'everyday' : 'expressive';
      return '' +
        '<div class="vchip ' + reg + (used ? ' used' : '') + '" style="--chip:' + color + '" data-idx="' + i + '" title="Click for grammar & related words">' +
          '<div class="vchip-gr">' + article + escapeHtml(w.gr) +
            (used ? '<span class="tick">✓</span>' : '') + '</div>' +
          '<div class="vchip-en">' + escapeHtml(w.en) + '</div>' +
          '<div class="vchip-meta"><span class="pos">' + escapeHtml(w.pos) + '</span>' +
            '<span class="reg reg-' + reg + '">' + reg + '</span></div>' +
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

  /* ---------- actions ---------- */
  function regenerate(newScenario) {
    state.daily = false;
    state.words = buildWords();
    if (newScenario) state.scenario = pickScenario();
    renderScenario(); renderChips(); renderPoolNote();
  }
  function todayPrompt() {
    var rng = mulberry32(dateSeed());
    state.scenario = pickScenario(rng);
    state.words = buildWords(rng);
    state.daily = true;
    renderScenario(); renderChips(); renderPoolNote();
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

  /* ---------- init ---------- */
  renderSteppers();
  regenerate(true);
  renderWriteCount();
})();
