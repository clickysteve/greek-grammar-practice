/* Greek Verb Memoriser — application logic
 * Expects the following globals from greekverbprac.data.js:
 *   - VERBS           (array of verb objects)
 *   - CONJUGATIONS    (overrides keyed by verb.english → { present:[6], past:[6], future:[6], pastCont:[6], futureCont:[6] })
 *   - EXAMPLES        (keyed by verb.english → { present:[gr,en], past:[gr,en], ... })
 *   - FAMILIES        (object: key → { label, note, members:[english, ...] })
 *   - GRAMMAR_NOTES   (keyed by tense → { short, title })
 *   - STEM_MAPS       (keyed by verb.english → { presentSide, pastSide, note })
 */

(function () {
'use strict';

const PERSONS = [
  { key: '1sg', label: '1sg (εγώ)', pronounGr: 'εγώ', pronounEn: 'I' },
  { key: '2sg', label: '2sg (εσύ)', pronounGr: 'εσύ', pronounEn: 'you' },
  { key: '3sg', label: '3sg (αυτός/ή/ό)', pronounGr: 'αυτός', pronounEn: 'he/she/it' },
  { key: '1pl', label: '1pl (εμείς)', pronounGr: 'εμείς', pronounEn: 'we' },
  { key: '2pl', label: '2pl (εσείς)', pronounGr: 'εσείς', pronounEn: 'you (pl)' },
  { key: '3pl', label: '3pl (αυτοί/ές/ά)', pronounGr: 'αυτοί', pronounEn: 'they' },
  { key: 'random', label: 'Random' }
];
const PERSON_INDEX = { '1sg':0, '2sg':1, '3sg':2, '1pl':3, '2pl':4, '3pl':5 };

const directions = [{ key: 'en-to-gr', label: 'English → Greek' }, { key: 'gr-to-en', label: 'Greek → English' }];
const tenses = [
  { key: 'present', label: 'Present' },
  { key: 'past', label: 'Simple Past' },
  { key: 'future', label: 'Future Simple' },
  { key: 'pastCont', label: 'Past Continuous' },
  { key: 'futureCont', label: 'Future Continuous' },
  { key: 'mixed', label: 'Mixed' }
];
const drillTypes = [
  { key: 'vocab', label: 'Vocabulary (1sg)' },
  { key: 'conjugation', label: 'Conjugation (all persons)' }
];
const modes = [{ key: 'typed', label: 'Typed answers' }, { key: 'flashcard', label: 'Flashcards only' }];
const ratings = [0,1,2,3,4,5];
const reviewFilters = [
  { key: 'all', label: 'All cards' },
  { key: 'weak', label: 'Weak only (≤1)' },
  { key: 'due', label: 'Due now' }
];

/* ----------------- Conjugation ----------------- */

function conjugateComputed(v, tense) {
  // Class-based fallback conjugation for verbs without an override.
  // Good enough for class-A regulars; irregulars should always have an override.
  const cls = v.class || 'A';
  const present1 = v.present;
  const past1 = v.past;
  const pastCont1 = v.pastCont;
  const futureSimple1 = (v.future || '').replace(/^θα\s+/, '');
  const futureCont1 = (v.futureCont || '').replace(/^θα\s+/, '');

  function stripEnd(w, end) { return w.endsWith(end) ? w.slice(0, -end.length) : w; }

  function presentA(stem) {
    return [stem+'ω', stem+'εις', stem+'ει', stem+'ουμε', stem+'ετε', stem+'ουν'];
  }
  function presentB1(stem) {
    return [stem+'ώ', stem+'άς', stem+'ά', stem+'άμε', stem+'άτε', stem+'άνε'];
  }
  function presentB2(stem) {
    return [stem+'ώ', stem+'είς', stem+'εί', stem+'ούμε', stem+'είτε', stem+'ούν'];
  }
  function presentMP(stem) {
    return [stem+'ομαι', stem+'εσαι', stem+'εται', stem+'όμαστε', stem+'εστε', stem+'ονται'];
  }

  function presentForms() {
    if (cls === 'A')  return presentA(stripEnd(present1, 'ω'));
    if (cls === 'B1') return presentB1(stripEnd(present1, 'άω').replace(/ώ$/, ''));
    if (cls === 'B2') return presentB2(stripEnd(present1, 'ώ'));
    if (cls === 'MP') return presentMP(stripEnd(present1, 'ομαι'));
    return [present1, present1, present1, present1, present1, present1];
  }

  // Past/past-cont: derive from 1sg by stripping final α and applying endings.
  // Drops augment (έ-/ή-) in 1pl/2pl when the 1sg is 3-syllables-with-augment.
  function pastLike(form1sg) {
    if (!form1sg) return ['','','','','',''];
    const base = form1sg.replace(/α$/, '');
    const augmented = /^[έήἐἠ]/.test(base);
    // "Rough" heuristic: if augmented and the base minus augment has ≥2 vowels, drop augment in 1pl/2pl
    // We also need to re-stress when dropping augment — approximated by promoting the first unstressed
    // vowel to its accented equivalent.
    const plBase = augmented ? reStressDropAugment(base) : base;
    return [form1sg, base+'ες', base+'ε', plBase+'αμε', plBase+'ατε', base+'αν'];
  }

  function reStressDropAugment(base) {
    // base starts with έ/ή (stressed augment). Drop first char, then stress the first vowel of the rest.
    const rest = base.slice(1);
    const vowelMap = { 'α':'ά','ε':'έ','η':'ή','ι':'ί','ο':'ό','υ':'ύ','ω':'ώ' };
    // Walk chars until we hit an already-stressed vowel (then no shift) or an unstressed vowel (stress it).
    let out = '', stressed = false;
    for (const ch of rest) {
      if (!stressed) {
        if ('άέήίόύώ'.includes(ch)) { stressed = true; out += ch; continue; }
        if (vowelMap[ch]) { out += vowelMap[ch]; stressed = true; continue; }
      }
      out += ch;
    }
    return out;
  }

  function futureSimpleForms() {
    const stem = stripEnd(futureSimple1, 'ω');
    return ['θα '+stem+'ω', 'θα '+stem+'εις', 'θα '+stem+'ει', 'θα '+stem+'ουμε', 'θα '+stem+'ετε', 'θα '+stem+'ουν'];
  }
  function futureContForms() {
    const p = presentForms();
    return p.map(x => 'θα ' + x);
  }

  if (tense === 'present')    return presentForms();
  if (tense === 'past')       return pastLike(past1);
  if (tense === 'pastCont')   return pastLike(pastCont1);
  if (tense === 'future')     return futureSimpleForms();
  if (tense === 'futureCont') return futureContForms();
  return [present1, present1, present1, present1, present1, present1];
}

function conjugate(v, tense) {
  const ov = (window.CONJUGATIONS || {})[v.english];
  if (ov && ov[tense] && ov[tense].length === 6) return ov[tense];
  return conjugateComputed(v, tense);
}

/* ----------------- State ----------------- */

const state = {
  drillType: 'vocab',
  direction: 'en-to-gr',
  tense: 'mixed',
  person: 'random',
  set: 1,
  mode: 'typed',
  review: 'all',
  search: '',
  current: null,
  currentTense: 'present',
  currentPerson: 0,
  seen: 0,
  revealed: false,
  checked: false,
  tableCollapsed: false,
  lastRating: null,
  ratings: JSON.parse(localStorage.getItem('gvm_ratings') || '{}'),
  history: JSON.parse(localStorage.getItem('gvm_history') || '{}'),
  schedule: JSON.parse(localStorage.getItem('gvm_schedule') || '{}')
};

const el = {};
['drillTypeBtns','directionBtns','tenseBtns','personGroup','personBtns','setBtns','modeBtns','reviewBtns','ratingBtns','search',
 'shuffleBtn','revealBtn','nextBtn','promptLabel','promptText','personChip','hintText','typedWrap','answerInput',
 'checkBtn','clearTypedBtn','feedback','answersBox','answerGrid','grammarBtn','grammarIcon','grammarContent',
 'siblingsBtn','siblingsIcon','siblingsContent','toggleTableBtn','tableWrap','verbRows','cardsN','seenN','strongN','weakN',
 'modePill','exportBtn','importBtn','clearProgressBtn','importFile','accentPicker','bgPicker','panelPicker','textPicker',
 'resetThemeBtn','exampleBox','exampleGr','exampleEn']
 .forEach(id => el[id] = document.getElementById(id));

/* ----------------- Storage ----------------- */

function save() {
  localStorage.setItem('gvm_ratings', JSON.stringify(state.ratings));
  localStorage.setItem('gvm_history', JSON.stringify(state.history));
  localStorage.setItem('gvm_schedule', JSON.stringify(state.schedule));
}

function idFor(v, tense, dir, drillType, personIdx) {
  const base = `${v.set}__${v.english}__${tense}__${dir}`;
  return drillType === 'conjugation' ? `${base}__${personIdx}` : base;
}

function escapeHtml(s) { return String(s || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch]); }
function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’'΄]/g, '').replace(/\s+/g, ' ').trim(); }
function stripAccentsOnly(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim(); }

function greekForms(v, tense) {
  const forms = [v[tense], ...(v[`${tense}Alt`] || [])].filter(Boolean);
  return Array.from(new Set(forms));
}
function displayForm(v, tense) { return greekForms(v, tense).join(' / '); }

function conjugatedFormFor(v, tense, personIdx) {
  const arr = conjugate(v, tense);
  return arr[personIdx];
}

/* ----------------- Answer comparison ----------------- */

function foldOmicronOmega(s) {
  return stripAccentsOnly(s).replace(/[ωώ]/g, 'ο');
}

function compareGreek(typed, expectedForms) {
  const forms = Array.isArray(expectedForms) ? expectedForms : [expectedForms];
  const exact = forms.find(form => typed.trim() === form.trim());
  if (exact) return { result: 'correct', expected: exact };
  const accent = forms.find(form => stripAccentsOnly(typed) === stripAccentsOnly(form));
  if (accent) return { result: 'accent', expected: accent };
  const ooMix = forms.find(form => foldOmicronOmega(typed) === foldOmicronOmega(form));
  if (ooMix) return { result: 'oo-mix', expected: ooMix };
  return { result: 'wrong', expected: forms[0] };
}

function ooMixExplanation(typed, expected) {
  // Post-accent-strip strings differ only at positions where one has ο and the other has ω.
  const t = stripAccentsOnly(typed);
  const e = stripAccentsOnly(expected);
  let wroteO = 0, wroteW = 0;
  const len = Math.min(t.length, e.length);
  for (let i = 0; i < len; i++) {
    if (t[i] === e[i]) continue;
    if (t[i] === 'ο' && e[i] === 'ω') wroteO++;
    else if (t[i] === 'ω' && e[i] === 'ο') wroteW++;
  }
  const parts = [];
  if (wroteO) parts.push(`ο where it should be ω${wroteO > 1 ? ` (×${wroteO})` : ''}`);
  if (wroteW) parts.push(`ω where it should be ο${wroteW > 1 ? ` (×${wroteW})` : ''}`);
  const msg = parts.length ? `you wrote ${parts.join(' and ')}` : 'one of ο/ω is wrong';
  return `Right sounds, wrong letter — ${msg}. Correct form: ${expected}.`;
}

function isCombining(ch) { const code = ch.charCodeAt(0); return code >= 768 && code <= 879; }

function syllableParts(word) {
  const clean = (word || '').toLowerCase().trim();
  const vowels = 'αεηιουωάέήίόύώϊΐϋΰ';
  const chars = Array.from(clean);
  const parts = [];
  let current = '';
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]; current += ch;
    const next = chars[i + 1] || '';
    if (vowels.includes(ch) && !vowels.includes(next)) { parts.push(current); current = ''; }
  }
  if (current) { if (parts.length) parts[parts.length - 1] += current; else parts.push(current); }
  return parts.filter(Boolean);
}
function stressFromEnd(word) {
  const decomposed = Array.from((word || '').normalize('NFD'));
  const vowels = 'αεηιουω';
  let stressed = -1, vi = -1, accentNext = false;
  for (const ch of decomposed) {
    if (isCombining(ch)) { accentNext = true; continue; }
    const plain = ch.toLowerCase().normalize('NFD').split('').filter(c => !isCombining(c)).join('');
    if (vowels.includes(plain)) { vi += 1; if (accentNext || 'άέήίόύώΐΰ'.includes(ch)) stressed = vi; }
    accentNext = false;
  }
  if (stressed === -1) return null;
  const syllables = syllableParts(word);
  let seen = 0;
  for (let i = 0; i < syllables.length; i++) {
    const count = Array.from(syllables[i]).filter(c => vowels.includes(c.toLowerCase().normalize('NFD').split('').filter(x => !isCombining(x)).join(''))).length;
    if (stressed < seen + count) return syllables.length - i;
    seen += count;
  }
  return null;
}
function stressLabel(n) { if (n === 1) return 'final'; if (n === 2) return 'penultimate'; if (n === 3) return 'antepenultimate'; return `${n}th from the end`; }
function accentExplanation(typed, expected) {
  const ts = stressFromEnd(typed), es = stressFromEnd(expected);
  if (ts === null && es !== null) return `Right word, but you missed the written accent. The correct form is ${expected}, with stress on the ${stressLabel(es)} syllable.`;
  if (ts !== null && es !== null && ts !== es) return `Right word, wrong accent placement. You stressed the ${stressLabel(ts)} syllable, but Greek wants the ${stressLabel(es)} syllable. Correct form: ${expected}.`;
  return `Right word, wrong accent placement. The correct written form is ${expected}.`;
}

/* ----------------- Pool & picking ----------------- */

function matchesSearch(v, q) {
  if (!q) return true;
  const ql = q.toLowerCase();
  return [v.english, ...greekForms(v,'present'), ...greekForms(v,'past'), ...greekForms(v,'future'), ...greekForms(v,'pastCont'), ...greekForms(v,'futureCont')]
    .some(x => x.toLowerCase().includes(ql));
}

function pool() {
  const verbs = window.VERBS || [];
  let p = state.set === 'all' ? verbs.slice() : verbs.filter(v => v.set === state.set);
  const q = state.search.trim();
  if (q) p = p.filter(v => matchesSearch(v, q));
  if (state.review === 'weak') {
    p = p.filter(v => {
      return [0,1,2,3,4].some(ti => {
        const t = ['present','past','future','pastCont','futureCont'][ti];
        const id = idFor(v, t, state.direction, state.drillType, 0);
        const r = Number(state.ratings[id] ?? -1);
        return r >= 0 && r <= 1;
      });
    });
  } else if (state.review === 'due') {
    const now = Date.now();
    p = p.filter(v => {
      return [0,1,2,3,4].some(ti => {
        const t = ['present','past','future','pastCont','futureCont'][ti];
        const id = idFor(v, t, state.direction, state.drillType, 0);
        const s = state.schedule[id];
        return s && s.dueAt && s.dueAt <= now;
      });
    });
  }
  return p;
}

function tensePick() {
  if (state.tense !== 'mixed') return state.tense;
  const arr = ['present','past','future','pastCont','futureCont'];
  return arr[Math.floor(Math.random() * arr.length)];
}
function personPick() {
  if (state.person !== 'random') return PERSON_INDEX[state.person];
  return Math.floor(Math.random() * 6);
}

function weightedPick(p) {
  const now = Date.now();
  const scored = p.map(v => {
    const tense = tensePick();
    const personIdx = state.drillType === 'conjugation' ? personPick() : 0;
    const id = idFor(v, tense, state.direction, state.drillType, personIdx);
    const s = state.schedule[id] || { dueAt: 0, lapses: 0, lastSeenAt: 0 };
    const r = Number(state.ratings[id] ?? 0);
    const overdueMs = now - (s.dueAt || 0);
    const overdue = s.dueAt ? (overdueMs > 0 ? Math.min(5, 1 + overdueMs / (12 * 60 * 60 * 1000)) : 0.2) : 4;
    const difficulty = Math.max(1, 6 - r);
    const lapse = 1 + (s.lapses || 0) * 0.35;
    const freshness = s.lastSeenAt && now - s.lastSeenAt < 90 * 1000 ? 0.1 : 1;
    return { v, tense, personIdx, score: overdue * difficulty * lapse * freshness };
  });
  const total = scored.reduce((a,b) => a + b.score, 0);
  let pick = Math.random() * total;
  let chosen = scored[0];
  for (const item of scored) { pick -= item.score; if (pick <= 0) { chosen = item; break; } }
  return chosen;
}

/* ----------------- SRS ----------------- */

function scheduleCard(level) {
  if (!state.current) return;
  const id = idFor(state.current, state.currentTense, state.direction, state.drillType, state.currentPerson);
  const now = Date.now();
  const s = state.schedule[id] || { intervalHours: 0, dueAt: 0, reps: 0, lapses: 0, lastSeenAt: 0 };
  let interval = 0;
  if (level <= 1) { interval = level === 0 ? 0.08 : 0.5; s.lapses = (s.lapses || 0) + 1; s.reps = 0; }
  else if (level === 2) { interval = 4; s.reps = (s.reps || 0) + 1; }
  else if (level === 3) { interval = 12; s.reps = (s.reps || 0) + 1; }
  else if (level === 4) { interval = Math.max(24, (s.intervalHours || 12) * 2); s.reps = (s.reps || 0) + 1; }
  else { interval = Math.max(72, (s.intervalHours || 24) * 3); s.reps = (s.reps || 0) + 1; }
  s.intervalHours = interval;
  s.lastSeenAt = now;
  s.dueAt = now + interval * 60 * 60 * 1000;
  s.lastRating = level;
  state.schedule[id] = s;
  state.ratings[id] = level;
  state.history[id] = { rating: level, updatedAt: new Date().toISOString(), english: state.current.english, tense: state.currentTense, direction: state.direction, personIdx: state.currentPerson, drillType: state.drillType };
  state.lastRating = level;
  save();
}

/* ----------------- UI rendering ----------------- */

function buttonSet(container, items, current, onClick) {
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    const b = document.createElement('button');
    b.textContent = item.label ?? String(item);
    const key = item.key ?? item;
    if (String(key) === String(current)) b.classList.add('active');
    b.onclick = () => onClick(key);
    container.appendChild(b);
  });
}

function renderControls() {
  buttonSet(el.drillTypeBtns, drillTypes, state.drillType, v => { state.drillType = v; el.personGroup.style.display = v === 'conjugation' ? '' : 'none'; nextCard(); });
  buttonSet(el.directionBtns, directions, state.direction, v => { state.direction = v; nextCard(); });
  buttonSet(el.tenseBtns, tenses, state.tense, v => { state.tense = v; nextCard(); });
  buttonSet(el.personBtns, PERSONS, state.person, v => { state.person = v; nextCard(); });
  const setsList = [{ key: 1, label: 'Set 1' }, { key: 2, label: 'Set 2' }, { key: 3, label: 'Set 3' }, { key: 4, label: 'Set 4 (essentials)' }, { key: 'all', label: 'All' }];
  buttonSet(el.setBtns, setsList, state.set, v => { state.set = v; nextCard(); });
  buttonSet(el.modeBtns, modes, state.mode, v => { state.mode = v; renderMode(); renderCard(); if (state.mode === 'typed') el.answerInput.focus(); });
  buttonSet(el.reviewBtns, reviewFilters, state.review, v => { state.review = v; nextCard(); });
  buttonSet(el.ratingBtns, ratings, state.lastRating, v => { scheduleCard(Number(v)); renderStats(); nextCard(); });
  el.personGroup.style.display = state.drillType === 'conjugation' ? '' : 'none';
}

function renderMode() { el.typedWrap.style.display = state.mode === 'typed' ? 'block' : 'none'; }
function resetTyped() {
  state.checked = false;
  el.answerInput.value = '';
  el.answerInput.className = 'answer-input';
  el.feedback.className = 'feedback';
  el.feedback.textContent = '';
}
function reveal() {
  state.revealed = true;
  el.answersBox.classList.add('show');
  if (el.exampleBox && el.exampleBox.dataset.hasContent === '1') el.exampleBox.style.display = '';
}
function hideReveal() {
  state.revealed = false;
  el.answersBox.classList.remove('show');
  if (el.exampleBox) el.exampleBox.style.display = 'none';
}

function renderAnswers(v, tense, personIdx) {
  el.answerGrid.innerHTML = '';
  const cells = [
    ['English', v.english, 'english', tense === 'english'],
    ['Present',         null, 'present',    tense === 'present'],
    ['Simple Past',     null, 'past',       tense === 'past'],
    ['Future Simple',   null, 'future',     tense === 'future'],
    ['Past Continuous', null, 'pastCont',   tense === 'pastCont'],
    ['Future Continuous', null, 'futureCont', tense === 'futureCont']
  ];
  cells.forEach(([k, _val, key, isFocus]) => {
    const d = document.createElement('div');
    d.className = 'mini ' + key + (isFocus ? ' focus' : '');
    if (key === 'english') {
      d.innerHTML = `<div class="k">${k}</div><div class="v">${v.english}</div>`;
    } else {
      const forms = conjugate(v, key);
      const personLabels = ['εγώ','εσύ','αυτός','εμείς','εσείς','αυτοί'];
      const rows = forms.map((f, i) => {
        const hi = (state.drillType === 'conjugation' && isFocus && i === personIdx);
        return `<div class="row-line${hi ? ' focus-row' : ''}"><span class="per">${personLabels[i]}</span><span>${f}</span></div>`;
      }).join('');
      d.innerHTML = `<div class="k">${k}${isFocus ? ' ★' : ''}</div>${rows}`;
    }
    el.answerGrid.appendChild(d);
  });
}

function renderHint(instruction) {
  const note = (window.GRAMMAR_NOTES || {})[state.currentTense];
  if (!note) { el.hintText.textContent = instruction; return; }
  el.hintText.innerHTML = `<div class="hint-main">${instruction}</div><div class="hint-note"><strong>Grammar cue:</strong> ${note.short}</div>`;
}

function renderExample(v, tense) {
  const ex = (window.EXAMPLES || {})[v.english];
  const pair = ex && ex[tense];
  if (!pair) {
    el.exampleBox.style.display = 'none';
    el.exampleBox.dataset.hasContent = '0';
    return;
  }
  el.exampleGr.textContent = pair[0];
  el.exampleEn.textContent = pair[1];
  el.exampleBox.dataset.hasContent = '1';
  // Stay hidden until the user reveals or checks — otherwise the example gives the answer away.
  el.exampleBox.style.display = state.revealed ? '' : 'none';
}

function renderGrammar() {
  const v = state.current, tense = state.currentTense;
  if (!v) { el.grammarContent.innerHTML = ''; return; }
  const notes = window.GRAMMAR_NOTES || {};
  const maps = window.STEM_MAPS || {};
  const note = notes[tense];
  const family = (
    `<p><strong>Present-stem / loop family:</strong> ${displayForm(v,'present')} → ${displayForm(v,'pastCont')} → ${displayForm(v,'futureCont')}</p>` +
    `<p><strong>Past-stem / one-shot family:</strong> ${displayForm(v,'past')} → ${displayForm(v,'future')}</p>`
  );
  const map = maps[v.english];
  const stemBlock = map
    ? `<p><strong>Stem map:</strong> present-side = <strong>${map.presentSide}</strong>; past-side = <strong>${map.pastSide}</strong>.</p><p>${map.note}</p>`
    : `<p>This verb is relatively regular — the main job is hearing the split between present-stem and past-stem families.</p>`;
  const tips = {
    present: `<p><strong>Mental model:</strong> inside the action, loop running.</p><p><strong>Build:</strong> present stem + present endings.</p>`,
    past: `<p><strong>Mental model:</strong> whole action, one-shot.</p><p><strong>Build:</strong> past stem + present endings (+ ε- often).</p>`,
    future: `<p><strong>Mental model:</strong> one-shot in the future.</p><p><strong>Build:</strong> θα + past stem + present endings.</p>`,
    pastCont: `<p><strong>Mental model:</strong> was inside the action.</p><p><strong>Build:</strong> present stem + past endings (+ ε- sometimes).</p>`,
    futureCont: `<p><strong>Mental model:</strong> ongoing in the future.</p><p><strong>Build:</strong> θα + present tense.</p>`
  };
  const defectiveNote = v.defective ? `<p><strong>Defective verb:</strong> ${v.defective}</p>` : '';
  const classNote = v.class ? `<p><strong>Class:</strong> ${v.class}${v.classNote ? ' — ' + v.classNote : ''}.</p>` : '';
  el.grammarContent.innerHTML = (note ? `<p><strong>${note.title}</strong></p>` : '') + (tips[tense] || '') + classNote + defectiveNote + family + stemBlock;
}

function renderSiblings() {
  const v = state.current;
  if (!v || !v.family) { el.siblingsContent.innerHTML = '<p class="small">No sibling group set for this verb.</p>'; return; }
  const fam = (window.FAMILIES || {})[v.family];
  if (!fam) { el.siblingsContent.innerHTML = '<p class="small">No sibling group set for this verb.</p>'; return; }
  const chips = fam.members
    .filter(eng => eng !== v.english)
    .map(eng => {
      const sib = (window.VERBS || []).find(x => x.english === eng);
      if (!sib) return `<span class="sibling-chip">${eng}</span>`;
      return `<span class="sibling-chip" data-english="${eng}">${sib.present} <span class="eng">${eng}</span></span>`;
    }).join('');
  el.siblingsContent.innerHTML = `<p><strong>${fam.label}</strong></p><p>${fam.note || ''}</p><div>${chips || '<span class="small">No other verbs in this group yet.</span>'}</div>`;
  el.siblingsContent.querySelectorAll('.sibling-chip[data-english]').forEach(c => {
    c.addEventListener('click', () => {
      const eng = c.getAttribute('data-english');
      const sib = (window.VERBS || []).find(x => x.english === eng);
      if (sib) { state.current = sib; state.seen += 1; hideReveal(); resetTyped(); renderCard(); renderTable(); renderStats(); if (state.mode === 'typed') el.answerInput.focus(); }
    });
  });
}

function renderTable() {
  const verbs = window.VERBS || [];
  const all = state.set === 'all' ? verbs.slice() : verbs.filter(v => v.set === state.set);
  const q = state.search.trim();
  const visible = q ? all.filter(v => matchesSearch(v, q)) : all;
  const ordered = state.current
    ? visible.slice().sort((a, b) => ((a.english === state.current.english) - (b.english === state.current.english)) * -1)
    : visible;
  el.verbRows.innerHTML = ordered.map(v => {
    const tag = v.class ? `<span class="tag cls-${v.class}">${v.class}</span>` : '';
    const defTag = v.defective ? `<span class="tag defective">defective</span>` : '';
    const active = state.current && v.english === state.current.english ? 'active-row' : '';
    return `<tr class="${active}"><td>${v.english}${tag}${defTag}</td><td>${displayForm(v,'present')}</td><td>${displayForm(v,'past')}</td><td>${displayForm(v,'future')}</td><td>${displayForm(v,'pastCont')}</td><td>${displayForm(v,'futureCont')}</td></tr>`;
  }).join('');
  el.cardsN.textContent = all.length;
}

function renderStats() {
  el.seenN.textContent = state.seen;
  const vals = Object.values(state.ratings).map(Number);
  el.strongN.textContent = vals.filter(v => v >= 4).length;
  el.weakN.textContent = vals.filter(v => v <= 1).length;
  renderControls();
}

/* ----------------- Card flow ----------------- */

function renderCard() {
  if (!state.current) {
    el.promptLabel.textContent = 'No cards found';
    el.promptText.textContent = 'Try a different filter';
    el.hintText.textContent = 'Your search/filter has no matches.';
    el.modePill.textContent = 'Empty';
    el.personChip.style.display = 'none';
    el.exampleBox.style.display = 'none';
    return;
  }
  const tenseLabel = tenses.find(t => t.key === state.currentTense)?.label || state.currentTense;
  const v = state.current, tense = state.currentTense, personIdx = state.currentPerson;
  const person = PERSONS[personIdx];
  const directionLabel = state.direction === 'en-to-gr' ? 'English → Greek' : 'Greek → English';
  el.promptLabel.innerHTML = `<span class="prompt-tense ${tense}">${tenseLabel}</span> · ${directionLabel}`;

  if (state.drillType === 'conjugation') {
    el.personChip.style.display = '';
    el.personChip.textContent = `${person.pronounGr} · ${person.pronounEn}`;
    if (state.direction === 'en-to-gr') {
      el.promptText.textContent = `${person.pronounEn} · ${v.english}`;
      renderHint(`Type the Greek ${tenseLabel.toLowerCase()} form for the ${person.label.toLowerCase()}.`);
      el.answerInput.placeholder = 'Type the Greek form';
    } else {
      const form = conjugatedFormFor(v, tense, personIdx);
      el.promptText.textContent = form;
      renderHint(`Type the English meaning (use “${person.pronounEn}” as the subject).`);
      el.answerInput.placeholder = 'Type the English meaning';
    }
  } else {
    el.personChip.style.display = 'none';
    if (state.direction === 'en-to-gr') {
      el.promptText.textContent = v.english;
      renderHint(`Type the Greek for ${tenseLabel.toLowerCase()} (1sg).`);
      el.answerInput.placeholder = 'Type the Greek answer here';
    } else {
      el.promptText.textContent = displayForm(v, tense);
      renderHint('Type the English meaning, then check yourself.');
      el.answerInput.placeholder = 'Type the English answer here';
    }
  }
  renderAnswers(v, tense, personIdx);
  renderExample(v, tense);
  renderGrammar();
  renderSiblings();
  el.modePill.textContent = `${state.drillType === 'conjugation' ? 'CONJ' : 'VOCAB'} · ${state.direction === 'en-to-gr' ? 'EN → GR' : 'GR → EN'} · ${tenseLabel}`;
}

function expectedAnswer() {
  const v = state.current, tense = state.currentTense;
  if (state.drillType === 'conjugation') {
    if (state.direction === 'en-to-gr') return [conjugatedFormFor(v, tense, state.currentPerson)];
    return [v.english];
  }
  return state.direction === 'en-to-gr' ? greekForms(v, tense) : [v.english];
}

function checkAnswer() {
  if (!state.current) return;
  const exp = expectedAnswer();
  const typed = el.answerInput.value;
  state.checked = true;
  el.answerInput.className = 'answer-input';
  el.feedback.className = 'feedback';
  const answerDisplay = exp.join(' / ');
  if (state.direction === 'en-to-gr') {
    const match = compareGreek(typed, exp);
    if (match.result === 'correct') {
      el.answerInput.classList.add('correct'); el.feedback.classList.add('correct');
      el.feedback.textContent = `Correct: ${answerDisplay}. Rate 0–5 or press Enter/Space for next.`;
    } else if (match.result === 'accent') {
      el.answerInput.classList.add('accent'); el.feedback.classList.add('accent');
      el.feedback.innerHTML =
        `<span class="feedback-label">Right word — wrong accent.</span>` +
        `<span class="big-answer">${escapeHtml(match.expected)}</span>` +
        `<span class="feedback-tail">${escapeHtml(accentExplanation(typed, match.expected))} Rate 0–5 or press Enter/Space for next.</span>`;
    } else if (match.result === 'oo-mix') {
      el.answerInput.classList.add('accent'); el.feedback.classList.add('accent');
      el.feedback.innerHTML =
        `<span class="feedback-label">Right sounds — wrong letter (ο / ω).</span>` +
        `<span class="big-answer">${escapeHtml(match.expected)}</span>` +
        `<span class="feedback-tail">${escapeHtml(ooMixExplanation(typed, match.expected))} Rate 0–5 or press Enter/Space for next.</span>`;
    } else {
      el.answerInput.classList.add('wrong'); el.feedback.classList.add('wrong');
      el.feedback.innerHTML =
        `<span class="feedback-label">Not quite. Correct answer:</span>` +
        `<span class="big-answer">${escapeHtml(answerDisplay)}</span>` +
        `<span class="feedback-tail">Rate 0–5 or press Enter/Space for next.</span>`;
    }
  } else {
    if (norm(typed) === norm(exp[0])) {
      el.answerInput.classList.add('correct'); el.feedback.classList.add('correct');
      el.feedback.textContent = `Correct: ${exp[0]}. Rate 0–5 or press Enter/Space for next.`;
    } else {
      el.answerInput.classList.add('wrong'); el.feedback.classList.add('wrong');
      el.feedback.innerHTML =
        `<span class="feedback-label">Not quite. Correct answer:</span>` +
        `<span class="big-answer">${escapeHtml(exp[0])}</span>` +
        `<span class="feedback-tail">Rate 0–5 or press Enter/Space for next.</span>`;
    }
  }
  reveal();
}

function nextCard() {
  const p = pool();
  if (!p.length) { state.current = null; renderCard(); renderTable(); renderStats(); return; }
  const chosen = weightedPick(p);
  state.current = chosen.v;
  state.currentTense = chosen.tense;
  state.currentPerson = chosen.personIdx || 0;
  state.lastRating = state.ratings[idFor(state.current, state.currentTense, state.direction, state.drillType, state.currentPerson)] ?? null;
  state.seen += 1;
  hideReveal();
  resetTyped();
  renderCard();
  renderTable();
  renderStats();
  if (state.mode === 'typed') requestAnimationFrame(() => el.answerInput.focus());
}

/* ----------------- Progress import/export ----------------- */

function exportProgress() {
  const payload = { app: 'greek-verb-memoriser', version: 2, exportedAt: new Date().toISOString(), ratings: state.ratings, history: state.history, schedule: state.schedule };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'greek-verb-memoriser-progress.json';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
function importProgress(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      state.ratings = data.ratings || {}; state.history = data.history || {}; state.schedule = data.schedule || {};
      save(); renderStats(); nextCard();
    } catch { alert('That JSON file did not parse properly.'); }
  };
  reader.readAsText(file);
}
function clearProgress() {
  if (!confirm('Clear all saved ratings and history for this tool?')) return;
  state.ratings = {}; state.history = {}; state.schedule = {}; state.lastRating = null;
  save(); renderStats(); nextCard();
}

/* ----------------- Events ----------------- */

el.search.addEventListener('input', e => { state.search = e.target.value; nextCard(); });
el.shuffleBtn.addEventListener('click', nextCard);
el.revealBtn.addEventListener('click', reveal);
el.nextBtn.addEventListener('click', nextCard);
el.checkBtn.addEventListener('click', checkAnswer);
el.clearTypedBtn.addEventListener('click', resetTyped);

el.grammarBtn.addEventListener('click', () => { const open = el.grammarContent.classList.toggle('show'); el.grammarIcon.textContent = open ? '–' : '+'; });
el.siblingsBtn.addEventListener('click', () => { const open = el.siblingsContent.classList.toggle('show'); el.siblingsIcon.textContent = open ? '–' : '+'; });
el.toggleTableBtn.addEventListener('click', () => {
  state.tableCollapsed = !state.tableCollapsed;
  el.tableWrap.style.display = state.tableCollapsed ? 'none' : 'block';
  el.toggleTableBtn.textContent = state.tableCollapsed ? 'Expand' : 'Collapse';
});
el.exportBtn.addEventListener('click', exportProgress);
el.importBtn.addEventListener('click', () => el.importFile.click());
el.importFile.addEventListener('change', e => importProgress(e.target.files[0]));
el.clearProgressBtn.addEventListener('click', clearProgress);

el.answerInput.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); reveal(); return; }
  if (e.key === 'Enter') { e.preventDefault(); if (state.revealed || state.checked) nextCard(); else checkAnswer(); }
  if (e.key === ' ' && (state.revealed || state.checked)) { e.preventDefault(); nextCard(); }
});
document.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (document.activeElement === el.search) return;
  const typing = document.activeElement === el.answerInput;
  if (state.mode === 'typed' && typing) {
    if (/^[0-5]$/.test(e.key) && (state.revealed || state.checked)) { e.preventDefault(); scheduleCard(Number(e.key)); renderStats(); nextCard(); }
    return;
  }
  if (e.key === ' ') { e.preventDefault(); if (state.revealed) nextCard(); else reveal(); }
  if (/^[0-5]$/.test(e.key)) { e.preventDefault(); scheduleCard(Number(e.key)); renderStats(); nextCard(); }
});

/* Theme: set CSS variables without reloading */
const root = document.documentElement;
function setVar(name, value) { root.style.setProperty(name, value); }
el.accentPicker.addEventListener('input', e => { setVar('--accent', e.target.value); setVar('--accent-strong', e.target.value); });
el.bgPicker.addEventListener('input', e => { setVar('--bg', e.target.value); document.body.style.background = e.target.value; });
el.panelPicker.addEventListener('input', e => { setVar('--panel', e.target.value); document.querySelectorAll('.panel, .inline-panel').forEach(p => p.style.background = e.target.value); });
el.textPicker.addEventListener('input', e => { setVar('--text', e.target.value); });
el.resetThemeBtn.addEventListener('click', () => {
  const defaults = { '--accent': '#ff9f43', '--accent-strong': '#ff9f43', '--bg': '#111315', '--panel': '#1b1f24', '--text': '#eef2f7' };
  Object.entries(defaults).forEach(([k,v]) => setVar(k, v));
  document.body.style.background = '';
  document.querySelectorAll('.panel, .inline-panel').forEach(p => p.style.background = '');
  el.accentPicker.value = '#ff9f43'; el.bgPicker.value = '#111315'; el.panelPicker.value = '#1b1f24'; el.textPicker.value = '#eef2f7';
});

/* Boot */
function boot() {
  if (!window.VERBS || !window.VERBS.length) {
    el.promptText.textContent = 'Data not loaded';
    el.hintText.textContent = 'greekverbprac.data.js failed to load or has no verbs.';
    return;
  }
  renderControls();
  renderMode();
  renderStats();
  nextCard();
}
boot();

})();
