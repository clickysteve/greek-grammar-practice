/* Greek Grammar — SRS engine.
 * Reads GRAMMAR_LEVELS, GRAMMAR from greekgrammar.data.js.
 * Progress in localStorage 'gvm_grammar':
 *   { "<pointId>": { stage, due (ms epoch), seen, correct, incorrect, last }, __settings: { answerMode } }
 *   - stage advances on correct answers; each stage maps to a longer interval.
 *   - a point is "due" when due <= now and stage < MASTER; at MASTER it is "mastered".
 */
(function () {
  'use strict';

  var LEVELS = window.GRAMMAR_LEVELS || [];
  var GRAMMAR = window.GRAMMAR || [];
  var byId = {};
  GRAMMAR.forEach(function (p) { byId[p.id] = p; });

  // SRS stage → hours until next review. Reaching the end = mastered.
  var STAGE_HOURS = [4, 8, 24, 72, 168, 336, 720, 1440];
  var MASTER = STAGE_HOURS.length; // stage 8 = mastered

  var KEY = 'gvm_grammar';
  var store = {};
  try { store = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { store = {}; }
  if (!store.__settings) store.__settings = { answerMode: 'choice' };
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }
  function rec(id) {
    if (!store[id]) store[id] = { stage: 0, due: 0, seen: 0, correct: 0, incorrect: 0, last: null };
    return store[id];
  }
  function isLearned(id) { return !!store[id] && store[id].stage !== undefined && (store[id].seen > 0 || store[id].due > 0); }
  function isMastered(id) { return !!store[id] && store[id].stage >= MASTER; }
  function isDue(id) { return !!store[id] && store[id].stage < MASTER && (store[id].due || 0) <= Date.now(); }
  function dueIds() { return GRAMMAR.filter(function (p) { return isDue(p.id); }).map(function (p) { return p.id; }); }

  function schedule(id, correct) {
    var r = rec(id);
    r.seen += 1;
    r.last = Date.now();
    if (correct) {
      r.correct += 1;
      r.stage = Math.min(MASTER, r.stage + 1);
      var h = STAGE_HOURS[Math.min(r.stage, STAGE_HOURS.length - 1)];
      r.due = Date.now() + h * 3600 * 1000;
    } else {
      r.incorrect += 1;
      r.stage = Math.max(0, r.stage - 2);
      r.due = Date.now() + 1 * 3600 * 1000; // relearn in ~1h
    }
    save();
  }

  /* ---------- helpers ---------- */
  function el(id) { return document.getElementById(id); }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function normGr(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/ς/g, 'σ').replace(/[.,;!·]+$/g, '').replace(/\s+/g, ' ').trim();
  }
  function answerCorrect(item, given) {
    var g = normGr(given);
    if (!g) return false;
    var ok = [item.answer].concat(item.accept || []);
    return ok.some(function (a) { return normGr(a) === g; });
  }
  function shuffle(a) {
    var c = a.slice();
    for (var i = c.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = c[i]; c[i] = c[j]; c[j] = t; }
    return c;
  }
  function randItem(point) { return point.items[Math.floor(Math.random() * point.items.length)]; }
  function pointStatus(id) {
    if (isMastered(id)) return 'mastered';
    if (isDue(id)) return 'due';
    if (isLearned(id)) return 'learning';
    return 'new';
  }
  function dueLabel(id) {
    var r = store[id];
    if (!r || !r.due) return '';
    var ms = r.due - Date.now();
    if (ms <= 0) return 'due now';
    var h = ms / 3600000;
    if (h < 1) return 'in ' + Math.round(h * 60) + 'm';
    if (h < 48) return 'in ' + Math.round(h) + 'h';
    return 'in ' + Math.round(h / 24) + 'd';
  }

  /* ---------- views ---------- */
  var root, state = { session: null };

  function render() {
    if (state.session) renderSession();
    else renderDashboard();
  }

  function renderDashboard() {
    var due = dueIds();
    var learned = GRAMMAR.filter(function (p) { return isLearned(p.id); }).length;
    var mastered = GRAMMAR.filter(function (p) { return isMastered(p.id); }).length;
    var mode = store.__settings.answerMode;

    var html = '<div class="g-hero">' +
      '<div class="g-hero-num">' + due.length + '</div>' +
      '<div class="g-hero-label">reviews due</div>' +
      '<button class="btn-primary g-review-btn"' + (due.length ? '' : ' disabled') + ' id="startReview">Start review session</button>' +
      '</div>' +
      '<div class="g-summary">' + learned + ' learned · ' + mastered + ' mastered · ' + GRAMMAR.length + ' grammar points total</div>' +
      '<div class="g-modebar">Answer mode: ' +
        '<button class="g-mode' + (mode === 'choice' ? ' active' : '') + '" data-mode="choice">Multiple choice</button>' +
        '<button class="g-mode' + (mode === 'type' ? ' active' : '') + '" data-mode="type">Type the answer</button>' +
        '<span class="g-spacer"></span>' +
        '<button id="gExport">Export</button><button id="gImport">Import</button>' +
        '<button id="gCloud">☁ Cloud backup</button>' +
        '<input type="file" id="gImportFile" accept="application/json" style="display:none;" />' +
      '</div>';

    LEVELS.forEach(function (lv) {
      var pts = GRAMMAR.filter(function (p) { return p.level === lv.key; });
      if (!pts.length) return;
      var lm = pts.filter(function (p) { return isMastered(p.id); }).length;
      var ll = pts.filter(function (p) { return isLearned(p.id); }).length;
      html += '<div class="g-level"><div class="g-level-head">' +
        '<span class="g-level-title">' + escapeHtml(lv.label) + '</span>' +
        '<span class="g-level-prog">' + ll + '/' + pts.length + ' started · ' + lm + ' mastered ' +
          '<button class="g-practice" data-level="' + lv.key + '">Practice level</button></span>' +
        '</div><div class="g-points">';
      pts.forEach(function (p) {
        var st = pointStatus(p.id);
        html += '<div class="g-point st-' + st + '" data-point="' + p.id + '">' +
          '<div class="g-point-main">' +
            '<div class="g-point-title">' + escapeHtml(p.title) + '</div>' +
            '<div class="g-point-short">' + escapeHtml(p.short) + '</div>' +
          '</div>' +
          '<span class="g-badge st-' + st + '">' + (st === 'new' ? 'new' : st === 'due' ? 'due' : st === 'mastered' ? '★' : dueLabel(p.id)) + '</span>' +
          '</div>';
      });
      html += '</div></div>';
    });

    root.innerHTML = html;

    var sr = el('startReview'); if (sr) sr.addEventListener('click', function () { startSession(reviewQuestions(), 'review'); });
    root.querySelectorAll('.g-mode').forEach(function (b) {
      b.addEventListener('click', function () { store.__settings.answerMode = b.getAttribute('data-mode'); save(); renderDashboard(); });
    });
    root.querySelectorAll('.g-practice').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        startSession(levelQuestions(b.getAttribute('data-level')), 'practice');
      });
    });
    root.querySelectorAll('.g-point').forEach(function (d) {
      d.addEventListener('click', function () { openPoint(byId[d.getAttribute('data-point')]); });
    });
    el('gExport').addEventListener('click', exportProgress);
    el('gImport').addEventListener('click', function () { el('gImportFile').click(); });
    el('gImportFile').addEventListener('change', function () {
      if (this.files && this.files[0]) importProgress(this.files[0]);
      this.value = '';
    });
    var cb = el('gCloud');
    if (cb && window.GVBackup) cb.addEventListener('click', function () { GVBackup.openModal(); });
  }

  /* ---------- grammar point detail (learn) ---------- */
  function openPoint(p) {
    var learned = isLearned(p.id);
    var ex = (p.examples || []).map(function (e) {
      return '<div class="g-ex"><span class="g-ex-gr">' + escapeHtml(e.gr) + '</span><span class="g-ex-en">' + escapeHtml(e.en) + '</span></div>';
    }).join('');
    el('grammarModal').innerHTML =
      '<div class="modal-backdrop"></div><div class="modal-panel">' +
      '<button class="modal-close">×</button>' +
      '<div class="g-md-level">' + escapeHtml(p.level) + '</div>' +
      '<h2 class="g-md-title">' + escapeHtml(p.title) + '</h2>' +
      '<div class="g-md-body">' + p.explanation + '</div>' +
      (ex ? '<div class="g-md-ex"><div class="g-md-exh">Examples</div>' + ex + '</div>' : '') +
      '<div class="g-md-actions">' +
        '<button class="btn-primary" id="gPractice">Practice — ' + p.items.length + ' questions</button>' +
        '<button id="gAddReviews"' + (learned ? ' disabled' : '') + '>' + (learned ? 'In your reviews ✓' : 'Add to reviews') + '</button>' +
        (learned ? '<span class="g-md-note">next review ' + dueLabel(p.id) + '</span>' : '') +
      '</div>' +
      '<p class="g-md-hint">Read the lesson, then <strong>Practice</strong> drills all of this point’s sentences. Doing well schedules it for spaced review.</p>' +
      '</div>';
    el('grammarModal').style.display = 'block';
    el('grammarModal').querySelector('.modal-backdrop').addEventListener('click', closeModal);
    el('grammarModal').querySelector('.modal-close').addEventListener('click', closeModal);
    el('gPractice').addEventListener('click', function () {
      closeModal();
      startSession(pointQuestions(p), 'practice');
    });
    var add = el('gAddReviews');
    if (add && !learned) add.addEventListener('click', function () {
      rec(p.id).due = Date.now(); save(); // add at stage 0, due now
      openPoint(p); // refresh modal state
    });
  }
  function closeModal() { var m = el('grammarModal'); m.style.display = 'none'; m.innerHTML = ''; }

  /* ---------- review session ---------- */
  // A session is a queue of questions: { pointId, item, counted }.
  function startSession(questions, kind) {
    if (!questions.length) return;
    state.session = { kind: kind, queue: shuffle(questions.slice()), done: 0, correctCount: 0, results: {}, current: null, answered: false };
    nextQuestion();
  }
  function reviewQuestions() {
    return dueIds().map(function (id) { return { pointId: id, item: randItem(byId[id]) }; });
  }
  function pointQuestions(point) {
    return point.items.map(function (it) { return { pointId: point.id, item: it }; });
  }
  function levelQuestions(levelKey) {
    var qs = [];
    GRAMMAR.filter(function (p) { return p.level === levelKey; }).forEach(function (p) {
      p.items.forEach(function (it) { qs.push({ pointId: p.id, item: it }); });
    });
    return qs;
  }
  function nextQuestion() {
    var s = state.session;
    if (!s.queue.length) { finishSession(); return; }
    var q = s.queue.shift();
    s.current = { pointId: q.pointId, point: byId[q.pointId], item: q.item, counted: q.counted || false, choices: null };
    if (store.__settings.answerMode === 'choice') s.current.choices = shuffle(s.current.item.choices || []);
    s.answered = false;
    render();
  }
  function finishSession() {
    var s = state.session;
    // Apply one SRS step per grammar point, based on first-attempt accuracy.
    var qTotal = 0, qRight = 0;
    Object.keys(s.results).forEach(function (pid) {
      var r = s.results[pid];
      qTotal += r.total; qRight += r.right;
      schedule(pid, r.total > 0 && r.right / r.total >= 0.6);
    });
    state.session = null;
    root.innerHTML = '<div class="g-done"><div class="g-done-tick">✓</div>' +
      '<div class="g-done-title">Session complete</div>' +
      '<div class="g-done-sub">' + qRight + ' / ' + qTotal + ' correct first try</div>' +
      '<button class="btn-primary" id="gBackDash">Back to grammar</button></div>';
    el('gBackDash').addEventListener('click', render);
  }

  function renderSession() {
    var s = state.session, cur = s.current, item = cur.item, mode = store.__settings.answerMode;
    var sentenceParts = item.text.split('{b}');
    var pre = escapeHtml(sentenceParts[0] || ''), post = escapeHtml(sentenceParts[1] || '');

    var blankHtml;
    if (!s.answered) {
      blankHtml = mode === 'type'
        ? '<input type="text" id="gAnswerInput" class="g-blank-input" autocomplete="off" autocapitalize="off" spellcheck="false" />'
        : '<span class="g-blank">_____</span>';
    } else {
      var cls = s.lastCorrect ? 'g-blank-filled ok' : 'g-blank-filled bad';
      blankHtml = '<span class="' + cls + '">' + escapeHtml(item.answer) + '</span>';
    }

    var html = '<div class="g-session">' +
      '<div class="g-sess-top"><button id="gQuit" class="g-quit">✕ end</button>' +
        '<span class="g-progress">' + (s.done + 1) + ' / ' + (s.done + 1 + s.queue.length) + '</span></div>' +
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
        html += '<div class="g-type-actions"><button class="btn-primary" id="gSubmit">Check</button>' +
          '<button class="g-dontknow" id="gDontKnow">Don’t know</button></div>';
      }
    } else {
      html += '<div class="g-feedback ' + (s.lastCorrect ? 'ok' : 'bad') + '">' +
        (s.lastCorrect ? 'Correct' : 'Answer: ' + escapeHtml(item.answer) +
          ((item.accept && item.accept.length) ? ' (also: ' + item.accept.map(escapeHtml).join(', ') + ')' : '')) + '</div>' +
        '<div class="g-after"><button class="g-explain" id="gExplain">Why?</button>' +
        '<button class="btn-primary" id="gNext">Next →</button></div>';
    }
    html += '</div>';
    root.innerHTML = html;

    el('gQuit').addEventListener('click', function () { state.session = null; render(); });
    if (!s.answered) {
      if (mode === 'choice') {
        root.querySelectorAll('.g-choice').forEach(function (b) {
          b.addEventListener('click', function () { answer(b.getAttribute('data-c')); });
        });
      } else {
        var inp = el('gAnswerInput'); if (inp) inp.focus();
        el('gSubmit').addEventListener('click', function () { answer(el('gAnswerInput').value); });
        el('gDontKnow').addEventListener('click', function () { answer('', true); });
      }
    } else {
      el('gExplain').addEventListener('click', function () { openPoint(cur.point); });
      el('gNext').addEventListener('click', nextQuestion);
    }
  }

  function answer(given, forceWrong) {
    var s = state.session, cur = s.current;
    var correct = !forceWrong && answerCorrect(cur.item, given);
    s.answered = true;
    s.lastCorrect = correct;
    s.done += 1;
    if (correct) s.correctCount += 1;
    // Count first attempts only (re-asked items don't double-count toward SRS).
    if (!cur.counted) {
      cur.counted = true;
      var r = s.results[cur.pointId] || (s.results[cur.pointId] = { right: 0, total: 0 });
      r.total += 1; if (correct) r.right += 1;
    }
    if (!correct) s.queue.push({ pointId: cur.pointId, item: cur.item, counted: true }); // re-ask later
    render();
  }

  /* ---------- export / import ---------- */
  function exportProgress() {
    var blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'greek-grammar-progress.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
  function importProgress(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (typeof data !== 'object' || data === null) throw new Error('bad');
        store = data;
        if (!store.__settings) store.__settings = { answerMode: 'choice' };
        save(); render();
        alert('Grammar progress imported.');
      } catch (e) { alert('Could not read that file.'); }
    };
    reader.readAsText(file);
  }

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    if (el('grammarModal') && el('grammarModal').style.display === 'block') {
      if (e.key === 'Escape') closeModal();
      return;
    }
    var s = state.session; if (!s) return;
    if (!s.answered) {
      if (store.__settings.answerMode === 'choice' && /^[1-4]$/.test(e.key)) {
        var idx = parseInt(e.key, 10) - 1;
        if (s.current.choices[idx]) answer(s.current.choices[idx]);
      } else if (store.__settings.answerMode === 'type' && e.key === 'Enter') {
        var inp = el('gAnswerInput'); if (inp) answer(inp.value);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); nextQuestion();
    }
  });

  /* ---------- init ---------- */
  root = el('grammarRoot');
  render();
  if (window.GVBackup) GVBackup.init(); // unified cloud backup + auto-backup
})();
