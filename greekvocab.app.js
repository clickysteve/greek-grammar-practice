/* Greek Vocabulary Writing Prompts — app logic.
 * Reads globals from greekvocab.data.js: VOCAB, SCENARIOS, THEMES.
 * No backend, no network: the word list "regenerates" by re-sampling the pool client-side.
 * Each word category (everyday nouns, expressive adjectives, …) has its own counter.
 */
(function () {
  'use strict';

  var VOCAB = window.VOCAB || [];
  var SCENARIOS = window.SCENARIOS || [];
  var THEMES = window.THEMES || {};

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

  var state = {
    counts: {},
    words: [],
    scenario: SCENARIOS[0] || ''
  };
  CATS.forEach(function (c) { state.counts[c.key] = c.def; });

  var el = {};
  ['scenarioText', 'wordChips', 'catSteppers', 'totalNote',
   'newPromptBtn', 'shuffleWordsBtn', 'newScenarioBtn', 'writing',
   'writeCount', 'clearBtn', 'poolNote'].forEach(function (id) {
    el[id] = document.getElementById(id);
  });

  /* ---------- helpers ---------- */
  function shuffle(arr) {
    var c = arr.slice();
    for (var i = c.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = c[i]; c[i] = c[j]; c[j] = t;
    }
    return c;
  }
  function take(arr, n) { return shuffle(arr).slice(0, Math.max(0, Math.min(n, arr.length))); }
  function totalCount() {
    return CATS.reduce(function (s, c) { return s + state.counts[c.key]; }, 0);
  }

  function buildWords() {
    var picked = [];
    CATS.forEach(function (c) {
      picked = picked.concat(take(pools[c.key], state.counts[c.key]));
    });
    return shuffle(picked);
  }

  function pickScenario() {
    if (!SCENARIOS.length) return '';
    var s;
    do { s = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]; }
    while (SCENARIOS.length > 1 && s === state.scenario);
    return s;
  }

  // Strip Greek accents / final sigma so we can loosely detect a word's use.
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

  /* ---------- rendering ---------- */
  function renderScenario() {
    el.scenarioText.textContent = state.scenario.replace('{n}', String(state.words.length));
  }

  function renderChips() {
    if (!state.words.length) {
      el.wordChips.innerHTML = '<div class="no-words">No words selected — turn up at least one category on the left.</div>';
      return;
    }
    var text = el.writing ? el.writing.value : '';
    el.wordChips.innerHTML = state.words.map(function (w) {
      var used = wordUsed(w, text);
      var color = (THEMES[w.theme] && THEMES[w.theme].color) || 'var(--accent)';
      var article = w.art ? '<span class="art">' + escapeHtml(w.art) + '</span> ' : '';
      var reg = w.register === 'everyday' ? 'everyday' : 'expressive';
      var title = w.note ? ' title="' + escapeHtml(w.note) + '"' : '';
      return '' +
        '<div class="vchip ' + reg + (used ? ' used' : '') + '" style="--chip:' + color + '"' + title + '>' +
          '<div class="vchip-gr">' + article + escapeHtml(w.gr) +
            (used ? '<span class="tick">✓</span>' : '') + '</div>' +
          '<div class="vchip-en">' + escapeHtml(w.en) + '</div>' +
          '<div class="vchip-meta"><span class="pos">' + escapeHtml(w.pos) + '</span>' +
            '<span class="reg reg-' + reg + '">' + reg + '</span></div>' +
        '</div>';
    }).join('');
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
    state.words = buildWords();
    if (newScenario) state.scenario = pickScenario();
    renderScenario();
    renderChips();
    renderPoolNote();
  }

  /* ---------- wiring ---------- */
  el.newPromptBtn.addEventListener('click', function () { regenerate(true); });
  el.shuffleWordsBtn.addEventListener('click', function () { regenerate(false); });
  el.newScenarioBtn.addEventListener('click', function () {
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
