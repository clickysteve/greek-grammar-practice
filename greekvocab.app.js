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

  // Merge user-added custom words (managed on the Word List page, stored with progress).
  try {
    var __t = JSON.parse(localStorage.getItem('gvm_vocab_track') || '{}');
    if (__t && Array.isArray(__t.__custom)) {
      var __have = {};
      VOCAB.forEach(function (w) { __have[w.gr] = 1; });
      __t.__custom.forEach(function (w) {
        if (w && w.gr && w.en && !__have[w.gr]) { VOCAB = VOCAB.concat([w]); __have[w.gr] = 1; }
      });
    }
  } catch (e) {}

  var everydayPool = VOCAB.filter(function (w) { return w.register === 'everyday'; });
  var expressivePool = VOCAB.filter(function (w) { return w.register === 'expressive'; });

  var state = {
    count: 4,        // words per prompt
    exprRatio: 0.6,  // fraction of words that should be expressive
    words: [], scenario: SCENARIOS[0] || { gr: '', en: '' },
    daily: false, usedCounted: {}
  };
  // Restore saved settings (the panel is collapsed, so make them sticky).
  var COUNTS_KEY = 'gvm_vocab_simple';
  try {
    var savedCfg = JSON.parse(localStorage.getItem(COUNTS_KEY) || '{}');
    if (typeof savedCfg.count === 'number') state.count = Math.max(1, Math.min(10, savedCfg.count));
    if (typeof savedCfg.exprRatio === 'number') state.exprRatio = Math.max(0, Math.min(1, savedCfg.exprRatio));
  } catch (e) {}
  function saveCounts() { try { localStorage.setItem(COUNTS_KEY, JSON.stringify({ count: state.count, exprRatio: state.exprRatio })); } catch (e) {} }

  var el = {};
  ['scenarioText', 'scenarioEn', 'scenarioBadge', 'wordChips',
   'newPromptBtn', 'todayBtn', 'shuffleWordsBtn', 'newScenarioBtn', 'writing',
   'writeCount', 'clearBtn', 'poolNote', 'wordModal', 'countSlider', 'countVal', 'mixSlider', 'mixLabel',
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
      if (k.indexOf('__') === 0) return; // reserved keys: __settings, __custom
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
    var rating = Math.max(r ? (r.rating || 0) : 0, drillBoost[w.gr] || 0);
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
    refreshDrillBoost();
    var n = state.count;
    var nExpr = Math.round(n * state.exprRatio);
    var picked = weightedTake(expressivePool, nExpr, rng)
      .concat(weightedTake(everydayPool, n - nExpr, rng));
    // Fill any shortfall (a pool exhausted by ratings) from whatever is left.
    if (picked.length < n) {
      var have = {};
      picked.forEach(function (w) { have[w.gr] = 1; });
      picked = picked.concat(weightedTake(VOCAB.filter(function (w) { return !have[w.gr]; }), n - picked.length, rng));
    }
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

  /* ---------- word detail & verb-practice bridge (greekvocab.shared.js) ---------- */
  // Cached "drill boost": rounded average of each linked verb's ratings in the
  // Verb Memoriser ('gvm_ratings'). Raises the effective rating used for sampling,
  // so verbs you have already drilled well appear less in writing prompts.
  var drillBoost = {};
  function refreshDrillBoost() {
    drillBoost = {};
    var ratings;
    try { ratings = JSON.parse(localStorage.getItem('gvm_ratings') || '{}'); } catch (e) { ratings = {}; }
    var sums = {};
    Object.keys(ratings).forEach(function (k) {
      var parts = k.split('__');
      if (parts.length < 4) return;
      var eng = parts[1];
      if (!sums[eng]) sums[eng] = { s: 0, c: 0 };
      sums[eng].s += Number(ratings[k]) || 0;
      sums[eng].c++;
    });
    VOCAB.forEach(function (w) {
      if (w.pos !== 'verb') return;
      var entry = GVShared.findVerbAppEntry(w.gr);
      if (entry && sums[entry.english] && sums[entry.english].c) {
        drillBoost[w.gr] = Math.round(sums[entry.english].s / sums[entry.english].c);
      }
    });
  }
  function openDetail(w) { GVShared.openDetail(w); }

  /* ---------- rendering ---------- */
  function renderScenario() {
    var n = String(state.words.length);
    el.scenarioText.textContent = (state.scenario.gr || '').replace('{n}', n);
    el.scenarioEn.textContent = (state.scenario.en || '').replace('{n}', n);
    el.scenarioBadge.style.display = state.daily ? '' : 'none';
  }

  function renderChips() {
    if (!state.words.length) {
      el.wordChips.innerHTML = '<div class="no-words">No words to draw — everything eligible is rated 5. Lower some ratings or include mastered words.</div>';
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

  function renderMixLabel() {
    var nExpr = Math.round(state.count * state.exprRatio);
    el.mixLabel.textContent = nExpr + ' expressive · ' + (state.count - nExpr) + ' everyday';
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
  el.countSlider.addEventListener('input', function () {
    state.count = parseInt(el.countSlider.value, 10) || 1;
    el.countVal.textContent = String(state.count);
    saveCounts();
    renderMixLabel();
    regenerate(false);
  });
  el.mixSlider.addEventListener('input', function () {
    state.exprRatio = (parseInt(el.mixSlider.value, 10) || 0) / 100;
    saveCounts();
    renderMixLabel();
    regenerate(false);
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
  GVShared.init({
    modalEl: el.wordModal,
    vocab: VOCAB,
    themes: THEMES,
    statsOf: function (gr) { var r = track[gr] || {}; return { rating: r.rating || 0, seen: r.seen || 0, used: r.used || 0 }; },
    onRate: function (gr, n) { setRating(gr, n); renderChips(); }
  });
  el.countSlider.value = String(state.count);
  el.countVal.textContent = String(state.count);
  el.mixSlider.value = String(Math.round(state.exprRatio * 100));
  renderMixLabel();
  regenerate(true);
  renderWriteCount();
  renderTrackStats();
  // Auto-backup to the gist if configured and the last backup is over 24h old.
  if (gh.token && window.fetch && Date.now() - (gh.lastBackup || 0) > 24 * 3600 * 1000) {
    backupToGist(true);
  }
})();
