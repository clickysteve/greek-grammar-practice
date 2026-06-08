/* Greek Grammar — lessons + SRS engine (v2).
 * Reads GRAMMAR_LEVELS, GRAMMAR from greekgrammar.data.js.
 *
 * Practice and SRS are SEPARATE:
 *   - Practice = free drilling (5/10/20/custom/free). Tracks accuracy only; never moves the SRS schedule.
 *   - SRS reviews = the spaced system. Only review answers advance/demote a point's stage.
 *
 * localStorage 'gvm_grammar' (v2):
 *   { __version, __settings:{answerMode, sessionLength}, __lessons:{id:true},
 *     __open:{levelKey_collapsed:bool}, __srs:{id:{stage,due,seen,correct,incorrect,last}},
 *     __practice:{id:{seen,correct}} }
 */
(function () {
  'use strict';

  var LEVELS = window.GRAMMAR_LEVELS || [];
  var GRAMMAR = window.GRAMMAR || [];
  var byId = {};
  GRAMMAR.forEach(function (p) { byId[p.id] = p; });

  var STAGE_HOURS = [4, 8, 24, 72, 168, 336, 720, 1440]; // hours to next review per stage
  var MASTER = STAGE_HOURS.length;
  var VERSION = 2;

  var KEY = 'gvm_grammar';
  var store = {};
  try { store = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { store = {}; }
  if (store.__version !== VERSION) store = {}; // one-time reset to the new schema
  store.__version = VERSION;
  if (!store.__settings) store.__settings = {};
  if (!store.__settings.answerMode) store.__settings.answerMode = 'choice';
  if (typeof store.__settings.sessionLength !== 'number') store.__settings.sessionLength = 5; // 0 = free
  if (!store.__lessons) store.__lessons = {};
  if (!store.__open) store.__open = {};
  if (!store.__srs) store.__srs = {};
  if (!store.__practice) store.__practice = {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }
  save(); // persist the (possibly reset/migrated) shape immediately

  /* ---------- state queries ---------- */
  function lessonRead(id) { return !!store.__lessons[id]; }
  function markLessonRead(id) { if (!store.__lessons[id]) { store.__lessons[id] = true; save(); } }
  function inSrs(id) { return !!store.__srs[id]; }
  function srsRec(id) { return store.__srs[id]; }
  function addToSrs(id) { if (!store.__srs[id]) { store.__srs[id] = { stage: 0, due: Date.now(), seen: 0, correct: 0, incorrect: 0, last: null }; save(); } }
  function removeFromSrs(id) { delete store.__srs[id]; save(); }
  function isMastered(id) { return inSrs(id) && store.__srs[id].stage >= MASTER; }
  function isDue(id) { var r = store.__srs[id]; return !!r && r.stage < MASTER && (r.due || 0) <= Date.now(); }
  function dueIds() { return GRAMMAR.filter(function (p) { return isDue(p.id); }).map(function (p) { return p.id; }); }
  function practiceAcc(id) { var p = store.__practice[id]; return p && p.seen ? Math.round(100 * p.correct / p.seen) : null; }

  function srsSchedule(id, correct) {
    var r = store.__srs[id]; if (!r) { addToSrs(id); r = store.__srs[id]; }
    r.seen += 1; r.last = Date.now();
    if (correct) {
      r.correct += 1;
      r.stage = Math.min(MASTER, r.stage + 1);
      r.due = Date.now() + STAGE_HOURS[Math.min(r.stage, STAGE_HOURS.length - 1)] * 3600000;
    } else {
      r.incorrect += 1;
      r.stage = Math.max(0, r.stage - 2);
      r.due = Date.now() + 3600000; // relearn in ~1h
    }
    save();
  }
  function recordPractice(id, right, total) {
    var p = store.__practice[id] || (store.__practice[id] = { seen: 0, correct: 0 });
    p.seen += total; p.correct += right;
  }

  function pointStatus(id) {
    if (isMastered(id)) return 'mastered';
    if (isDue(id)) return 'due';
    if (inSrs(id)) return 'learning';
    if (lessonRead(id)) return 'lesson';
    return 'new';
  }
  var STATUS_BADGE = { new: 'new', lesson: '✓ lesson read', due: 'due', mastered: '★ mastered' };

  /* ---------- helpers ---------- */
  function el(id) { return document.getElementById(id); }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function normGr(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/ς/g, 'σ').replace(/[.,;!·]+$/g, '').replace(/\s+/g, ' ').trim();
  }
  function answerCorrect(item, given) {
    var g = normGr(given); if (!g) return false;
    return [item.answer].concat(item.accept || []).some(function (a) { return normGr(a) === g; });
  }
  function shuffle(a) { var c = a.slice(); for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; } return c; }
  function randItem(point) { return point.items[Math.floor(Math.random() * point.items.length)]; }
  function fmtDur(ms) { var h = ms / 3600000; if (h < 1) return Math.max(1, Math.round(h * 60)) + 'm'; if (h < 48) return Math.round(h) + 'h'; return Math.round(h / 24) + 'd'; }
  function whenLabel(id) {
    var r = store.__srs[id]; if (!r) return '';
    if (r.stage >= MASTER) return 'mastered';
    var ms = r.due - Date.now();
    if (ms <= 0) { return (-ms) < 3600000 ? 'due now' : 'overdue ' + fmtDur(-ms); }
    return 'in ' + fmtDur(ms);
  }

  /* ---------- top-level render ---------- */
  var root, state = { view: 'lessons', session: null };
  function render() { if (state.session) renderSession(); else renderShell(); }

  function toolbarHtml() {
    var mode = store.__settings.answerMode;
    var len = store.__settings.sessionLength;
    var presets = [5, 10, 20];
    return '<div class="g-modebar"><span class="g-modelabel">Answer:</span>' +
      '<button class="g-mode' + (mode === 'choice' ? ' active' : '') + '" data-mode="choice">Multiple choice</button>' +
      '<button class="g-mode' + (mode === 'type' ? ' active' : '') + '" data-mode="type">Type</button>' +
      '<span class="g-modelabel" style="margin-left:8px;">Practice length:</span>' +
      presets.map(function (n) { return '<button class="g-len' + (len === n ? ' active' : '') + '" data-len="' + n + '">' + n + '</button>'; }).join('') +
      '<input type="number" id="gLenInput" class="g-leninput" min="1" max="200" placeholder="#" value="' + (len > 0 ? len : '') + '" title="custom number" />' +
      '<button class="g-len' + (len === 0 ? ' active' : '') + '" data-len="0">Free</button>' +
      '<span class="g-spacer"></span>' +
      '<button id="gExport">Export</button><button id="gImport">Import</button>' +
      '<button id="gCloud">☁ Cloud</button><button id="gReset">Reset</button>' +
      '<input type="file" id="gImportFile" accept="application/json" style="display:none;" />' +
      '</div>';
  }

  function renderShell() {
    var tabs = '<div class="g-tabs">' +
      '<button class="g-tab' + (state.view === 'lessons' ? ' active' : '') + '" data-view="lessons">Lessons</button>' +
      '<button class="g-tab' + (state.view === 'reviews' ? ' active' : '') + '" data-view="reviews">Reviews (SRS) ' +
        (dueIds().length ? '<span class="g-tab-due">' + dueIds().length + '</span>' : '') + '</button>' +
      '</div>';
    root.innerHTML = tabs + toolbarHtml() + (state.view === 'lessons' ? lessonsHtml() : reviewsHtml());
    wireToolbar();
    root.querySelectorAll('.g-tab').forEach(function (b) {
      b.addEventListener('click', function () { state.view = b.getAttribute('data-view'); render(); });
    });
    if (state.view === 'lessons') wireLessons(); else wireReviews();
  }

  function wireToolbar() {
    root.querySelectorAll('.g-mode').forEach(function (b) { b.addEventListener('click', function () { store.__settings.answerMode = b.getAttribute('data-mode'); save(); render(); }); });
    root.querySelectorAll('.g-len').forEach(function (b) { b.addEventListener('click', function () { store.__settings.sessionLength = parseInt(b.getAttribute('data-len'), 10); save(); render(); }); });
    var li = el('gLenInput');
    if (li) li.addEventListener('change', function () { var n = parseInt(li.value, 10); if (n > 0) { store.__settings.sessionLength = Math.min(200, n); save(); render(); } });
    el('gExport').addEventListener('click', exportProgress);
    el('gImport').addEventListener('click', function () { el('gImportFile').click(); });
    el('gImportFile').addEventListener('change', function () { if (this.files && this.files[0]) importProgress(this.files[0]); this.value = ''; });
    var cb = el('gCloud'); if (cb && window.GVBackup) cb.addEventListener('click', function () { GVBackup.openModal(); });
    el('gReset').addEventListener('click', function () {
      if (confirm('Reset ALL grammar progress (lessons read, SRS, practice stats)? This cannot be undone.')) {
        store = { __version: VERSION, __settings: store.__settings, __lessons: {}, __open: {}, __srs: {}, __practice: {} };
        save(); render();
      }
    });
  }

  /* ---------- Lessons view ---------- */
  function lessonsHtml() {
    var html = '<div class="g-summary">Read a lesson, then practise it. Add points you want to retain to your SRS reviews.</div>';
    LEVELS.forEach(function (lv) {
      var pts = GRAMMAR.filter(function (p) { return p.level === lv.key; });
      if (!pts.length) return;
      var lr = pts.filter(function (p) { return lessonRead(p.id); }).length;
      var insrs = pts.filter(function (p) { return inSrs(p.id); }).length;
      var lm = pts.filter(function (p) { return isMastered(p.id); }).length;
      var collapsed = !!store.__open[lv.key + '_collapsed'];
      html += '<div class="g-level' + (collapsed ? ' collapsed' : '') + '">' +
        '<div class="g-level-head" data-toggle="' + lv.key + '">' +
        '<span class="g-level-title"><span class="g-caret">' + (collapsed ? '▸' : '▾') + '</span> ' + escapeHtml(lv.label) + '</span>' +
        '<span class="g-level-prog">' + lr + '/' + pts.length + ' lessons · ' + insrs + ' in SRS · ' + lm + ' mastered ' +
        '<button class="g-practice" data-level="' + lv.key + '">Practice level</button></span></div>' +
        '<div class="g-points"' + (collapsed ? ' style="display:none;"' : '') + '>';
      pts.forEach(function (p) {
        var st = pointStatus(p.id);
        var badge = st === 'learning' ? whenLabel(p.id) : (STATUS_BADGE[st] || st);
        var acc = practiceAcc(p.id);
        html += '<div class="g-point st-' + st + '" data-point="' + p.id + '">' +
          '<div class="g-point-main"><div class="g-point-title">' + escapeHtml(p.title) + '</div>' +
          '<div class="g-point-short">' + escapeHtml(p.short) + (acc != null ? ' · practice ' + acc + '%' : '') + '</div></div>' +
          '<span class="g-badge st-' + st + '">' + badge + '</span></div>';
      });
      html += '</div></div>';
    });
    return html;
  }
  function wireLessons() {
    root.querySelectorAll('.g-level-head').forEach(function (h) {
      h.addEventListener('click', function (e) {
        if (e.target.closest('.g-practice')) return;
        var k = h.getAttribute('data-toggle');
        store.__open[k + '_collapsed'] = !store.__open[k + '_collapsed']; save(); render();
      });
    });
    root.querySelectorAll('.g-practice').forEach(function (b) {
      b.addEventListener('click', function (e) { e.stopPropagation(); startPractice(levelQuestions(b.getAttribute('data-level'))); });
    });
    root.querySelectorAll('.g-point').forEach(function (d) {
      d.addEventListener('click', function () { openPoint(byId[d.getAttribute('data-point')]); });
    });
  }

  /* ---------- Reviews (SRS) view ---------- */
  function reviewsHtml() {
    var ids = GRAMMAR.filter(function (p) { return inSrs(p.id); }).map(function (p) { return p.id; });
    if (!ids.length) {
      return '<div class="g-empty"><div class="g-empty-icon">🗓️</div>' +
        '<p>No grammar points in your reviews yet.</p>' +
        '<p class="g-empty-sub">Open a lesson under <strong>Lessons</strong> and tap <strong>Add to reviews</strong> to start spaced repetition for the points you want to keep.</p></div>';
    }
    var now = Date.now();
    var overdue = 0, dueNow = 0, soon = 0, mastered = 0;
    ids.forEach(function (id) {
      var r = store.__srs[id];
      if (r.stage >= MASTER) mastered++;
      else if (r.due <= now) { if (now - r.due >= 3600000) overdue++; else dueNow++; }
      else soon++;
    });
    var dueCount = dueIds().length;
    var html = '<div class="g-hero"><div class="g-hero-num">' + dueCount + '</div>' +
      '<div class="g-hero-label">due for review</div>' +
      '<button class="btn-primary"' + (dueCount ? '' : ' disabled') + ' id="startReview">Start review session</button></div>' +
      '<div class="g-srsstats">' +
        '<div class="g-srsstat"><span class="n" style="color:var(--bad)">' + overdue + '</span>overdue</div>' +
        '<div class="g-srsstat"><span class="n" style="color:var(--warn)">' + dueNow + '</span>due now</div>' +
        '<div class="g-srsstat"><span class="n">' + soon + '</span>upcoming</div>' +
        '<div class="g-srsstat"><span class="n" style="color:var(--good)">' + mastered + '</span>mastered</div>' +
      '</div>';
    // Sort: not-mastered by due ascending (most overdue first), mastered last.
    ids.sort(function (a, b) {
      var ra = store.__srs[a], rb = store.__srs[b];
      var ma = ra.stage >= MASTER ? 1 : 0, mb = rb.stage >= MASTER ? 1 : 0;
      if (ma !== mb) return ma - mb;
      return ra.due - rb.due;
    });
    html += '<div class="g-srslist">';
    ids.forEach(function (id) {
      var p = byId[id], r = store.__srs[id];
      var od = r.stage < MASTER && r.due <= now;
      var cls = r.stage >= MASTER ? 'mastered' : (od && now - r.due >= 3600000 ? 'overdue' : (r.due <= now ? 'due' : 'soon'));
      html += '<div class="g-srsrow ' + cls + '" data-point="' + id + '">' +
        '<div class="g-srsrow-main"><div class="g-srsrow-title">' + escapeHtml(p.title) + '</div>' +
        '<div class="g-srsrow-sub">' + escapeHtml(p.level) + ' · stage ' + r.stage + '/' + MASTER + '</div></div>' +
        '<span class="g-srsrow-when">' + whenLabel(id) + '</span>' +
        '<button class="g-srsrow-x" data-remove="' + id + '" title="remove from reviews">✕</button></div>';
    });
    html += '</div>';
    return html;
  }
  function wireReviews() {
    var sr = el('startReview'); if (sr) sr.addEventListener('click', startReview);
    root.querySelectorAll('.g-srsrow').forEach(function (rowEl) {
      rowEl.addEventListener('click', function (e) {
        if (e.target.closest('[data-remove]')) return;
        openPoint(byId[rowEl.getAttribute('data-point')]);
      });
    });
    root.querySelectorAll('[data-remove]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        removeFromSrs(b.getAttribute('data-remove')); render();
      });
    });
  }

  /* ---------- lesson modal ---------- */
  function openPoint(p) {
    markLessonRead(p.id);
    var srs = inSrs(p.id);
    var lenTxt = store.__settings.sessionLength === 0 ? 'free run' : store.__settings.sessionLength + ' questions';
    var ex = (p.examples || []).map(function (e) {
      return '<div class="g-ex"><span class="g-ex-gr">' + escapeHtml(e.gr) + '</span><span class="g-ex-en">' + escapeHtml(e.en) + '</span></div>';
    }).join('');
    el('grammarModal').innerHTML =
      '<div class="modal-backdrop"></div><div class="modal-panel"><button class="modal-close">×</button>' +
      '<div class="g-md-kicker">LESSON · ' + escapeHtml(p.level) + '</div>' +
      '<h2 class="g-md-title">' + escapeHtml(p.title) + '</h2>' +
      '<div class="g-md-body">' + p.explanation + '</div>' +
      (ex ? '<div class="g-md-ex"><div class="g-md-exh">Examples</div>' + ex + '</div>' : '') +
      '<div class="g-md-divider"></div>' +
      '<p class="g-md-hint"><strong>Practice</strong> drills sentences (' + lenTxt + ') without touching your review schedule. <strong>Add to reviews</strong> puts this point into spaced repetition.</p>' +
      '<div class="g-md-actions">' +
        '<button class="btn-primary" id="gPractice">▶ Practice (' + lenTxt + ')</button>' +
        '<button id="gAddReviews"' + (srs ? ' disabled' : '') + '>' + (srs ? 'In reviews ✓' : '+ Add to reviews') + '</button>' +
        (srs ? '<span class="g-md-note">next ' + whenLabel(p.id) + '</span>' : '') +
      '</div></div>';
    el('grammarModal').style.display = 'block';
    el('grammarModal').querySelector('.modal-backdrop').addEventListener('click', function () { closeModal(); render(); });
    el('grammarModal').querySelector('.modal-close').addEventListener('click', function () { closeModal(); render(); });
    el('gPractice').addEventListener('click', function () { closeModal(); startPractice(pointQuestions(p)); });
    var add = el('gAddReviews');
    if (add && !srs) add.addEventListener('click', function () { addToSrs(p.id); openPoint(p); });
  }
  function closeModal() { var m = el('grammarModal'); m.style.display = 'none'; m.innerHTML = ''; }

  /* ---------- sessions ---------- */
  function pointQuestions(point) { return point.items.map(function (it) { return { pointId: point.id, item: it }; }); }
  function levelQuestions(levelKey) {
    var qs = [];
    GRAMMAR.filter(function (p) { return p.level === levelKey; }).forEach(function (p) { p.items.forEach(function (it) { qs.push({ pointId: p.id, item: it }); }); });
    return qs;
  }
  function reviewQuestions() { return dueIds().map(function (id) { return { pointId: id, item: randItem(byId[id]) }; }); }
  function expandTo(base, n) {
    var out = [], pool = shuffle(base), i = 0;
    while (out.length < n) { if (i >= pool.length) { pool = shuffle(base); i = 0; } out.push({ pointId: pool[i].pointId, item: pool[i].item }); i++; }
    return out;
  }
  function startPractice(base) {
    if (!base.length) return;
    var n = store.__settings.sessionLength, free = n === 0;
    state.session = { kind: 'practice', free: free, pool: base.slice(), queue: free ? shuffle(base) : expandTo(base, n),
      target: free ? 0 : n, done: 0, correctCount: 0, results: {}, current: null, answered: false };
    nextQuestion();
  }
  function startReview() {
    var qs = reviewQuestions(); if (!qs.length) return;
    state.session = { kind: 'review', free: false, pool: null, queue: shuffle(qs), target: qs.length,
      done: 0, correctCount: 0, results: {}, current: null, answered: false };
    nextQuestion();
  }
  function nextQuestion() {
    var s = state.session;
    if (!s.queue.length) { if (s.free) { s.queue = shuffle(s.pool); } else { finishSession(); return; } }
    var q = s.queue.shift();
    s.current = { pointId: q.pointId, point: byId[q.pointId], item: q.item, counted: q.counted || false, choices: null };
    if (store.__settings.answerMode === 'choice') s.current.choices = shuffle(s.current.item.choices || []);
    s.answered = false;
    render();
  }
  function answer(given, forceWrong) {
    var s = state.session, cur = s.current;
    var correct = !forceWrong && answerCorrect(cur.item, given);
    s.answered = true; s.lastCorrect = correct; s.done += 1;
    if (correct) s.correctCount += 1;
    if (!cur.counted) {
      cur.counted = true;
      var r = s.results[cur.pointId] || (s.results[cur.pointId] = { right: 0, total: 0 });
      r.total += 1; if (correct) r.right += 1;
    }
    if (!correct) s.queue.push({ pointId: cur.pointId, item: cur.item, counted: true });
    render();
  }
  function finishSession() {
    var s = state.session;
    var qTotal = 0, qRight = 0;
    Object.keys(s.results).forEach(function (pid) {
      var r = s.results[pid]; qTotal += r.total; qRight += r.right;
      if (s.kind === 'review') srsSchedule(pid, r.total > 0 && r.right / r.total >= 0.6);
      else recordPractice(pid, r.right, r.total);
    });
    save();
    state.session = null;
    root.innerHTML = '<div class="g-done"><div class="g-done-tick">✓</div>' +
      '<div class="g-done-title">' + (s.kind === 'review' ? 'Review complete' : 'Practice complete') + '</div>' +
      '<div class="g-done-sub">' + qRight + ' / ' + qTotal + ' correct first try</div>' +
      '<button class="btn-primary" id="gBackDash">Back to grammar</button></div>';
    el('gBackDash').addEventListener('click', render);
  }

  function renderSession() {
    var s = state.session, cur = s.current, item = cur.item, mode = store.__settings.answerMode;
    var parts = item.text.split('{b}');
    var pre = escapeHtml(parts[0] || ''), post = escapeHtml(parts[1] || '');
    var blankHtml;
    if (!s.answered) {
      blankHtml = mode === 'type'
        ? '<input type="text" id="gAnswerInput" class="g-blank-input" autocomplete="off" autocapitalize="off" spellcheck="false" />'
        : '<span class="g-blank">_____</span>';
    } else {
      blankHtml = '<span class="g-blank-filled ' + (s.lastCorrect ? 'ok' : 'bad') + '">' + escapeHtml(item.answer) + '</span>';
    }
    var answered = 0; Object.keys(s.results).forEach(function (k) { answered += s.results[k].total; });
    var progress = s.free ? ('Q' + (answered + 1) + ' · free run') : (Math.min(answered + 1, s.target) + ' / ' + s.target);

    var html = '<div class="g-session">' +
      '<div class="g-sess-top"><button id="gQuit" class="g-quit">✕ end &amp; save</button>' +
      '<span class="g-kindtag">' + (s.kind === 'review' ? 'SRS review' : 'practice') + '</span>' +
      '<span class="g-progress">' + progress + '</span></div>' +
      '<div class="g-prompt-point">' + escapeHtml(cur.point.title) + '</div>' +
      '<div class="g-sentence">' + pre + blankHtml + post + '</div>' +
      '<div class="g-en">' + escapeHtml(item.en) + '</div>' +
      (item.hint ? '<div class="g-hint">' + escapeHtml(item.hint) + '</div>' : '');
    if (!s.answered) {
      if (mode === 'choice') {
        html += '<div class="g-choices">' + cur.choices.map(function (c, i) {
          return '<button class="g-choice" data-c="' + escapeHtml(c) + '"><span class="g-choice-n">' + (i + 1) + '</span>' + escapeHtml(c) + '</button>';
        }).join('') + '</div>';
      } else {
        html += '<div class="g-type-actions"><button class="btn-primary" id="gSubmit">Check</button><button class="g-dontknow" id="gDontKnow">Don’t know</button></div>';
      }
    } else {
      html += '<div class="g-feedback ' + (s.lastCorrect ? 'ok' : 'bad') + '">' +
        (s.lastCorrect ? 'Correct' : 'Answer: ' + escapeHtml(item.answer) + ((item.accept && item.accept.length) ? ' (also: ' + item.accept.map(escapeHtml).join(', ') + ')' : '')) + '</div>' +
        '<div class="g-after"><button class="g-explain" id="gExplain">Why?</button><button class="btn-primary" id="gNext">Next →</button></div>';
    }
    html += '</div>';
    root.innerHTML = html;

    el('gQuit').addEventListener('click', finishSession);
    if (!s.answered) {
      if (mode === 'choice') root.querySelectorAll('.g-choice').forEach(function (b) { b.addEventListener('click', function () { answer(b.getAttribute('data-c')); }); });
      else { var inp = el('gAnswerInput'); if (inp) inp.focus(); el('gSubmit').addEventListener('click', function () { answer(el('gAnswerInput').value); }); el('gDontKnow').addEventListener('click', function () { answer('', true); }); }
    } else {
      el('gExplain').addEventListener('click', function () { openPoint(cur.point); });
      el('gNext').addEventListener('click', nextQuestion);
    }
  }

  /* ---------- export / import ---------- */
  function exportProgress() {
    var blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'greek-grammar-progress.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
  }
  function importProgress(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try { var d = JSON.parse(reader.result); if (typeof d !== 'object' || d === null) throw 0; store = d; store.__version = VERSION; save(); render(); alert('Grammar progress imported.'); }
      catch (e) { alert('Could not read that file.'); }
    };
    reader.readAsText(file);
  }

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    if (el('grammarModal') && el('grammarModal').style.display === 'block') { if (e.key === 'Escape') { closeModal(); render(); } return; }
    var s = state.session; if (!s) return;
    if (!s.answered) {
      if (store.__settings.answerMode === 'choice' && /^[1-4]$/.test(e.key)) { var idx = parseInt(e.key, 10) - 1; if (s.current.choices[idx]) answer(s.current.choices[idx]); }
      else if (store.__settings.answerMode === 'type' && e.key === 'Enter') { var inp = el('gAnswerInput'); if (inp) answer(inp.value); }
    } else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextQuestion(); }
  });

  /* ---------- init ---------- */
  root = el('grammarRoot');
  render();
  if (window.GVBackup) GVBackup.init();
})();
