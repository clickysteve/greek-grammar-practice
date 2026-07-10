/* Greek suite — the ONE spaced-repetition scheduler.
 * Exposes window.GSSrs. No dependencies; load BEFORE greekvocab.srsbridge.js,
 * greeksuite.stats.js and the app scripts on any page that schedules reviews.
 *
 * Every app shares the same ladder: a card/point at stage n waits
 * STAGE_HOURS[n-1] before its next review; stage 8 (MASTER) = retired.
 *
 *   - Flashcards + grammar call applyGrade() ('again' | 'good' | 'easy',
 *     or a boolean where true = good).
 *   - The Verb Memoriser's 0-5 self-ratings map onto the same ladder via
 *     applyRating().
 *   - The vocab bridge seeds schedules with nextDue() and the
 *     stageFromRating / ratingFromStage mapping.
 *
 * Due-time rules (shared by everything):
 *   - sub-24h rungs are exact;
 *   - ≥24h rungs get ±10% fuzz (so cards don't clump) and are floored to
 *     local start-of-day (daily reviews come due in the morning instead of
 *     drifting later each day) — but never into the past: if the floor would
 *     land today, the card is due at the NEXT midnight instead.
 */
window.GSSrs = (function () {
  'use strict';
  var STAGE_HOURS = [4, 8, 24, 72, 168, 336, 720, 1440];
  var MASTER = STAGE_HOURS.length; // 8
  var FAR = STAGE_HOURS[STAGE_HOURS.length - 1] * 3600000;

  // Due time for a card that just reached `stage`.
  function nextDue(stage, now) {
    now = now || Date.now();
    if (stage >= MASTER) return now + FAR;
    var hours = STAGE_HOURS[Math.max(0, Math.min(stage, STAGE_HOURS.length) - 1)];
    if (hours < 24) return now + hours * 3600000;
    var fuzzed = hours * 3600000 * (0.9 + Math.random() * 0.2);
    var d = new Date(now + fuzzed);
    d.setHours(0, 0, 0, 0);
    if (d.getTime() <= now) { d = new Date(now); d.setHours(24, 0, 0, 0); }
    return d.getTime();
  }

  /* Grade a review. grade: 'again' | 'good' | 'easy' (booleans accepted:
   * true = good, false = again). Returns { stage, due, lapse } — the caller
   * owns its own record shape and seen/correct/lapse counters. */
  function applyGrade(stage, grade) {
    if (grade === true) grade = 'good';
    if (grade === false) grade = 'again';
    if (grade === 'again') {
      return { stage: Math.max(0, stage - 2), due: Date.now() + 3600000, lapse: true }; // relearn in ~1h
    }
    var next = Math.min(MASTER, stage + (grade === 'easy' ? 2 : 1));
    return { stage: next, due: nextDue(next), lapse: false };
  }

  /* The Verb Memoriser's 0-5 self-rating on the same ladder:
   *   0 = blank        → drop 2 stages, retry in 5 minutes
   *   1 = barely       → drop 1 stage,  retry in 30 minutes
   *   2 = hard         → hold the stage, short 4h interval
   *   3 = knew it      → +1 stage
   *   4 = easy         → +2 stages
   *   5 = trivial      → +3 stages
   * Returns { stage, due, lapse }. */
  function applyRating(stage, rating) {
    rating = Math.max(0, Math.min(5, rating | 0));
    if (rating === 0) return { stage: Math.max(0, stage - 2), due: Date.now() + 5 * 60000, lapse: true };
    if (rating === 1) return { stage: Math.max(0, stage - 1), due: Date.now() + 30 * 60000, lapse: true };
    if (rating === 2) return { stage: Math.max(1, stage), due: Date.now() + STAGE_HOURS[0] * 3600000, lapse: false };
    var next = Math.min(MASTER, stage + (rating - 2));
    return { stage: next, due: nextDue(next), lapse: false };
  }

  /* Word-list 0-5 rating ↔ ladder stage (used by the vocab bridge; round-trips):
   *   0→0, 1→2, 2→3, 3→5, 4→6, 5→8 */
  function stageFromRating(r) { return [0, 2, 3, 5, 6, 8][Math.max(0, Math.min(5, r | 0))]; }
  function ratingFromStage(s) { if (s <= 0) return 0; if (s >= MASTER) return 5; return Math.round(s / MASTER * 5); }

  return {
    STAGE_HOURS: STAGE_HOURS, MASTER: MASTER, FAR: FAR,
    nextDue: nextDue, applyGrade: applyGrade, applyRating: applyRating,
    stageFromRating: stageFromRating, ratingFromStage: ratingFromStage
  };
})();
