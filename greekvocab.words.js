/* Greek Vocabulary — Word List page.
 * Browse, search, and rate every word; add your own.
 * Shares localStorage with the writing-prompts page:
 *   gvm_vocab_track — { "<word>": {rating, seen, used, last}, __settings: {...}, __custom: [words] }
 */
(function () {
  'use strict';

  var BUILTIN = window.VOCAB || [];
  var THEMES = window.THEMES || {};
  var TRACK_KEY = 'gvm_vocab_track';
  var PAGE = 150;

  var track = {};
  try { track = JSON.parse(localStorage.getItem(TRACK_KEY) || '{}'); } catch (e) { track = {}; }
  if (!track.__settings) track.__settings = { includeKnown: false };
  if (!Array.isArray(track.__custom)) track.__custom = [];
  // Migrate old binary "known" data, same rules as the prompts page.
  Object.keys(track).forEach(function (k) {
    if (k.indexOf('__') === 0) return;
    var r = track[k];
    if (r && typeof r.rating !== 'number') r.rating = r.known ? 5 : 0;
  });
  function save() { try { localStorage.setItem(TRACK_KEY, JSON.stringify(track)); } catch (e) {} }

  function buildAll() {
    var have = {};
    var all = BUILTIN.map(function (w) { have[w.gr] = 1; return w; });
    track.__custom.forEach(function (w) {
      if (w && w.gr && !have[w.gr]) { w.custom = true; all.push(w); have[w.gr] = 1; }
    });
    return all;
  }
  var ALL = buildAll();

  var el = {};
  ['search', 'regFilter', 'posFilter', 'ratingFilter', 'sortBy', 'summary', 'wlist', 'showMore',
   'addGr', 'addEn', 'addArt', 'addPos', 'addReg', 'addTheme', 'addNote', 'addBtn', 'addMsg'].forEach(function (id) {
    el[id] = document.getElementById(id);
  });

  // Theme dropdown for the add form.
  el.addTheme.innerHTML = Object.keys(THEMES).map(function (k) {
    return '<option value="' + k + '">' + THEMES[k].label + '</option>';
  }).join('');

  var state = { q: '', reg: 'all', pos: 'all', rating: 'all', sort: 'alpha', limit: PAGE };

  // Canonical normalizer lives in greekvocab.shared.js; tiny wrapper for load-order safety.
  function normGr(s) {
    if (window.GVShared && GVShared.normGr) return GVShared.normGr(s);
    return String(s == null ? '' : s).toLowerCase().replace(/ς/g, 'σ');
  }
  function ratingOf(gr) { return track[gr] ? (track[gr].rating || 0) : 0; }
  function seenOf(gr) { return track[gr] ? (track[gr].seen || 0) : 0; }
  function usedOf(gr) { return track[gr] ? (track[gr].used || 0) : 0; }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function filtered() {
    var q = state.q.trim().toLowerCase();
    var qGr = normGr(q);
    var out = ALL.filter(function (w) {
      if (state.reg !== 'all' && w.register !== state.reg) return false;
      if (state.pos !== 'all' && w.pos !== state.pos) return false;
      var r = ratingOf(w.gr);
      if (state.rating === 'unrated' && r !== 0) return false;
      if (state.rating === 'learning' && (r < 1 || r > 4)) return false;
      if (state.rating === 'mastered' && r !== 5) return false;
      if (q) {
        var hitGr = normGr(w.gr).indexOf(qGr) !== -1;
        var hitEn = (w.en || '').toLowerCase().indexOf(q) !== -1;
        if (!hitGr && !hitEn) return false;
      }
      return true;
    });
    if (state.sort === 'alpha') out.sort(function (a, b) { return a.gr.localeCompare(b.gr, 'el'); });
    if (state.sort === 'rating') out.sort(function (a, b) { return ratingOf(b.gr) - ratingOf(a.gr) || a.gr.localeCompare(b.gr, 'el'); });
    if (state.sort === 'seen') out.sort(function (a, b) { return seenOf(b.gr) - seenOf(a.gr) || a.gr.localeCompare(b.gr, 'el'); });
    if (state.sort === 'custom') out.sort(function (a, b) { return (b.custom ? 1 : 0) - (a.custom ? 1 : 0) || a.gr.localeCompare(b.gr, 'el'); });
    return out;
  }

  function rowHtml(w) {
    var color = (THEMES[w.theme] && THEMES[w.theme].color) || 'var(--border)';
    var r = ratingOf(w.gr);
    var btns = '';
    for (var i = 0; i <= 5; i++) {
      btns += '<button class="lvl' + i + (i === r ? ' active' : '') + '" data-gr="' + escapeHtml(w.gr) + '" data-r="' + i + '">' + i + '</button>';
    }
    return '<div class="wrow ' + w.register + '" style="--chip:' + color + '" data-gr="' + escapeHtml(w.gr) + '">' +
      '<div class="w-main">' +
        '<div class="w-gr">' + (w.art ? '<span class="art">' + escapeHtml(w.art) + '</span> ' : '') + escapeHtml(w.gr) +
          (w.custom ? '<span class="custom-tag">custom</span>' : '') + '</div>' +
        '<div class="w-en">' + escapeHtml(w.en) + ' · ' + escapeHtml(w.pos) + ' · ' + escapeHtml(w.register) + '</div>' +
      '</div>' +
      '<span class="w-meta">drawn ' + seenOf(w.gr) + '× · used ' + usedOf(w.gr) + '×</span>' +
      '<span class="w-rate">' + btns + '</span>' +
      (w.custom ? '<button class="w-del" data-del="' + escapeHtml(w.gr) + '">delete</button>' : '') +
      '</div>';
  }

  function render() {
    var list = filtered();
    var shown = list.slice(0, state.limit);
    el.wlist.innerHTML = shown.map(rowHtml).join('') ||
      '<div style="color:var(--muted); font-size:14px;">Nothing matches.</div>';
    el.showMore.style.display = list.length > state.limit ? 'block' : 'none';
    var mastered = 0, learning = 0, unrated = 0;
    ALL.forEach(function (w) {
      var r = ratingOf(w.gr);
      if (r === 5) mastered++; else if (r > 0) learning++; else unrated++;
    });
    el.summary.textContent = 'Showing ' + shown.length + ' of ' + list.length + ' matches · pool: ' + ALL.length +
      ' words (' + track.__custom.length + ' custom) · ' + mastered + ' mastered · ' + learning + ' learning · ' + unrated + ' unrated';
  }

  // Writes ONLY the page's own track store. SRS sync + verb-drill seeding happen
  // once, centrally, in GVShared.rateAndRefresh (which calls this via onRate).
  function applyRating(gr, rating) {
    if (!track[gr]) track[gr] = { rating: 0, seen: 0, used: 0, last: null };
    track[gr].rating = rating;
    save();
  }
  // Route every rating through the shared central path so bridges fire exactly once.
  function rate(gr, rating) {
    if (window.GVShared && GVShared.rateAndRefresh) GVShared.rateAndRefresh(gr, rating);
    else { applyRating(gr, rating); render(); }
  }

  // Shared word-detail modal (conjugations, grammar, related words).
  if (window.GVShared) {
    GVShared.init({
      modalEl: document.getElementById('wordModal'),
      vocab: ALL,
      themes: THEMES,
      statsOf: function (gr) { var r = track[gr] || {}; return { rating: r.rating || 0, seen: r.seen || 0, used: r.used || 0 }; },
      onRate: function (gr, rating) { applyRating(gr, rating); render(); }
    });
  }

  // Event delegation: ratings, deletes, and opening word details.
  el.wlist.addEventListener('click', function (e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute('data-r')) {
      rate(t.getAttribute('data-gr'), parseInt(t.getAttribute('data-r'), 10));
    } else if (t.hasAttribute && t.hasAttribute('data-del')) {
      var g = t.getAttribute('data-del');
      if (confirm('Delete custom word "' + g + '"? Its rating history goes too.')) {
        track.__custom = track.__custom.filter(function (w) { return w.gr !== g; });
        delete track[g];
        save();
        // Remove its flashcard SRS record too (rating 0 = delete from the deck).
        if (window.GVSrsBridge) GVSrsBridge.syncSrsFromRating(g, 0);
        ALL = buildAll();
        render();
      }
    } else {
      var main = t.closest && t.closest('.w-main');
      if (main && window.GVShared) {
        var row = main.parentElement;
        var gr2 = row.getAttribute('data-gr');
        var found = ALL.filter(function (w) { return w.gr === gr2; })[0];
        if (found) GVShared.openDetail(found);
      }
    }
  });

  ['search'].forEach(function (id) {
    el[id].addEventListener('input', function () { state.q = el.search.value; state.limit = PAGE; render(); });
  });
  el.regFilter.addEventListener('change', function () { state.reg = el.regFilter.value; state.limit = PAGE; render(); });
  el.posFilter.addEventListener('change', function () { state.pos = el.posFilter.value; state.limit = PAGE; render(); });
  el.ratingFilter.addEventListener('change', function () { state.rating = el.ratingFilter.value; state.limit = PAGE; render(); });
  el.sortBy.addEventListener('change', function () { state.sort = el.sortBy.value; state.limit = PAGE; render(); });
  el.showMore.addEventListener('click', function () { state.limit += PAGE; render(); });

  function msg(text, isErr) {
    el.addMsg.textContent = text;
    el.addMsg.className = 'add-msg' + (isErr ? ' err' : '');
  }
  el.addBtn.addEventListener('click', function () {
    var gr = el.addGr.value.trim();
    var en = el.addEn.value.trim();
    var pos = el.addPos.value;
    var art = el.addArt.value;
    if (!gr || !en) { msg('Greek and English are both required.', true); return; }
    if (/[a-zA-Z]/.test(gr)) { msg('The Greek field has latin characters in it.', true); return; }
    var exists = ALL.some(function (w) { return normGr(w.gr) === normGr(gr); });
    if (exists) { msg('That word is already in the pool.', true); return; }
    if (pos === 'noun' && !art) { msg('Nouns need an article (ο/η/το).', true); return; }
    if (pos !== 'noun' && art) art = '';
    var w = { gr: gr, en: en, art: art, pos: pos, register: el.addReg.value, theme: el.addTheme.value, custom: true };
    var note = el.addNote.value.trim();
    if (note) w.note = note;
    track.__custom.push(w);
    save();
    ALL = buildAll();
    el.addGr.value = ''; el.addEn.value = ''; el.addNote.value = ''; el.addArt.value = '';
    msg('Added ' + gr + ' ✓ — it is now in the prompt pool.');
    state.q = gr; el.search.value = gr; state.limit = PAGE;
    render();
  });

  render();
  if (window.GVBackup) GVBackup.init(); // unified cloud auto-backup
})();
