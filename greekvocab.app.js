/* Greek Vocabulary Writing Prompts — app logic.
 * Reads globals from greekvocab.data.js: VOCAB, SCENARIOS, THEMES.
 * No backend, no network: the word list "regenerates" by re-sampling the pool client-side.
 * The mix slider blends everyday vs expressive words.
 */
(function () {
  'use strict';

  var VOCAB = window.VOCAB || [];
  var SCENARIOS = window.SCENARIOS || [];
  var THEMES = window.THEMES || {};

  var state = {
    count: 4,        // words per prompt
    exprRatio: 0.6,  // fraction of words that should be expressive (0 = all everyday, 1 = all expressive)
    words: [],
    scenario: SCENARIOS[0] || ''
  };

  var el = {};
  ['scenarioText', 'wordChips', 'countSlider', 'countVal', 'mixSlider', 'mixLabel',
   'newPromptBtn', 'shuffleWordsBtn', 'newScenarioBtn', 'writing',
   'writeCount', 'clearBtn', 'poolNote'].forEach(function (id) {
    el[id] = document.getElementById(id);
  });

  var everydayPool = VOCAB.filter(function (w) { return w.register === 'everyday'; });
  var expressivePool = VOCAB.filter(function (w) { return w.register === 'expressive'; });

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

  // Blend everyday + expressive according to the ratio, filling shortfalls from the other pool.
  function buildWords() {
    var n = state.count;
    var nExpr = Math.round(n * state.exprRatio);
    var nEvery = n - nExpr;
    var expr = take(expressivePool, nExpr);
    var every = take(everydayPool, nEvery);
    var picked = expr.concat(every);
    // Fill any shortfall (a pool was too small) from whatever's left.
    if (picked.length < n) {
      var have = {};
      picked.forEach(function (w) { have[w.gr] = 1; });
      var rest = shuffle(VOCAB.filter(function (w) { return !have[w.gr]; }));
      picked = picked.concat(rest.slice(0, n - picked.length));
    }
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

  function renderMixLabel() {
    var nExpr = Math.round(state.count * state.exprRatio);
    var nEvery = state.count - nExpr;
    el.mixLabel.textContent = nExpr + ' expressive · ' + nEvery + ' everyday';
  }

  function renderPoolNote() {
    el.poolNote.textContent =
      'Pool: ' + expressivePool.length + ' expressive + ' + everydayPool.length +
      ' everyday words · drawing ' + state.words.length + ' per prompt';
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
  el.countSlider.addEventListener('input', function () {
    state.count = parseInt(el.countSlider.value, 10) || 1;
    el.countVal.textContent = String(state.count);
    renderMixLabel();
    regenerate(false);
  });
  el.mixSlider.addEventListener('input', function () {
    state.exprRatio = (parseInt(el.mixSlider.value, 10) || 0) / 100;
    renderMixLabel();
    regenerate(false);
  });
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
  el.countSlider.value = String(state.count);
  el.countVal.textContent = String(state.count);
  el.mixSlider.value = String(Math.round(state.exprRatio * 100));
  renderMixLabel();
  regenerate(true);
  renderWriteCount();
})();
