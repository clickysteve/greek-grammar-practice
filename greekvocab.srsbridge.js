/* Greek Vocabulary — SRS ↔ rating bridge.
 * Ties the word-list 0-5 ratings (gvm_vocab_track) to the flashcard SRS
 * (gvm_vocab_srs) so the two are one inter-related system:
 *   - grading a flashcard updates that word's 0-5 rating, and
 *   - rating a word in the word list seeds/updates its SRS schedule.
 *
 * Mapping (round-trips cleanly):
 *   rating 0 -> stage 0 (not started)
 *   rating 1 -> stage 2     rating 2 -> stage 3
 *   rating 3 -> stage 5     rating 4 -> stage 6
 *   rating 5 -> stage 8 (mastered)
 *
 * Scheduling convention (shared with flashcards + grammar): a card at stage n
 * waits STAGE_HOURS[n-1] before its next review. Rating a word 1-4 schedules
 * it at its stage's normal interval — it is NOT dumped into "due now", so
 * rating a batch of words in the word list no longer floods the flashcards.
 */
window.GVSrsBridge = (function () {
  'use strict';
  // The scheduler core lives in greeksuite.srs.js (load it first); the
  // literals below are a fallback so this file still works standalone.
  var CORE = window.GSSrs || null;
  var MASTER = (CORE && CORE.MASTER) || 8;
  var STAGE_HOURS = (CORE && CORE.STAGE_HOURS) || [4, 8, 24, 72, 168, 336, 720, 1440];
  var SRS_KEY = 'gvm_vocab_srs';
  var TRACK_KEY = 'gvm_vocab_track';
  var FAR = STAGE_HOURS[STAGE_HOURS.length - 1] * 3600000; // mastered interval

  function load(key) { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (e) { return {}; } }
  function store(key, obj) { try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) {} }

  function stageFromRating(r) { return CORE ? CORE.stageFromRating(r) : [0, 2, 3, 5, 6, 8][Math.max(0, Math.min(5, r | 0))]; }
  function ratingFromStage(s) { if (CORE) return CORE.ratingFromStage(s); if (s <= 0) return 0; if (s >= MASTER) return 5; return Math.round(s / MASTER * 5); }
  // Next-review time for a card that just reached `stage` (stage n → STAGE_HOURS[n-1]).
  function dueForStage(stage) {
    if (CORE) return CORE.nextDue(stage);
    if (stage >= MASTER) return Date.now() + FAR;
    var hours = STAGE_HOURS[Math.max(0, Math.min(stage, STAGE_HOURS.length) - 1)];
    return Date.now() + hours * 3600000;
  }

  /* Write a 0-5 rating into the word-list track store (used by the flashcards on grade). */
  function writeRating(gr, rating) {
    var t = load(TRACK_KEY);
    if (!t[gr] || typeof t[gr] !== 'object') t[gr] = { rating: 0, seen: 0, used: 0, last: null };
    t[gr].rating = rating;
    t[gr].last = Date.now();
    store(TRACK_KEY, t);
  }
  function readRating(gr) {
    var t = load(TRACK_KEY);
    return (t[gr] && typeof t[gr].rating === 'number') ? t[gr].rating : null;
  }

  /* Push a word-list rating change into the SRS store (used by the word list on rate). */
  function syncSrsFromRating(gr, rating) {
    var s = load(SRS_KEY);
    if (rating <= 0) {
      delete s[gr]; // unrated -> not in the SRS deck
    } else {
      var prev = s[gr] || { stage: 0, due: 0, seen: 0, correct: 0, last: null };
      prev.stage = stageFromRating(rating);
      prev.due = dueForStage(prev.stage);
      prev.last = Date.now();
      s[gr] = prev;
    }
    store(SRS_KEY, s);
  }

  /* Seed missing SRS records from existing ratings. Mutates the in-memory store the
   * flashcards page already holds, so it can save() once afterwards. Returns count seeded. */
  function seedInto(srsStore) {
    var t = load(TRACK_KEY), n = 0;
    Object.keys(t).forEach(function (gr) {
      if (gr.indexOf('__') === 0) return;
      var rating = t[gr] && typeof t[gr].rating === 'number' ? t[gr].rating : 0;
      if (rating > 0 && !srsStore[gr]) {
        var stage = stageFromRating(rating);
        srsStore[gr] = {
          stage: stage,
          due: dueForStage(stage),
          seen: 0, correct: 0, last: null
        };
        n++;
      }
    });
    return n;
  }

  return {
    MASTER: MASTER, STAGE_HOURS: STAGE_HOURS,
    stageFromRating: stageFromRating, ratingFromStage: ratingFromStage, dueForStage: dueForStage,
    writeRating: writeRating, readRating: readRating,
    syncSrsFromRating: syncSrsFromRating, seedInto: seedInto
  };
})();
