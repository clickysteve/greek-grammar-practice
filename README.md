# Greek Verb Practice

A single-page Greek verb memorisation tool — drill conjugations across tenses, with spaced repetition, grammar notes, and example sentences baked in.

Live site: https://clickysteve.github.io/greek-grammar-practice/

## What it does

- **Drill modes.** Vocabulary (1sg only) or full conjugation across all six persons.
- **Direction.** English → Greek or Greek → English.
- **Tenses.** Present, simple past (aorist), future simple, past continuous (imperfect), future continuous, or mixed.
- **Spaced repetition.** Rate yourself 0–5 after each card; the scheduler weights struggling cards to come back sooner.
- **Fuzzy matching.** Accent-insensitive, with separate feedback when you confuse ο / ω.
- **Grammar notes.** Expand the grammar panel for per-verb explanations — class (A / B1 / B2 / MP / IRR), endings tables, and how the aorist and past continuous are formed for that class.
- **Verb families.** Sibling verbs that share a conjugation pattern are linked so you can jump between them.
- **Progress export / import.** Your ratings live in localStorage; export a JSON file to move them between devices.

## How to use

1. Open the live site. Pick a set, tense, and drill type.
2. Read the prompt, type the Greek form, press Enter to check.
3. Rate how well you knew it (0 = none, 5 = mastered). Press Enter or Space to advance.
4. Open the grammar panel if the rule doesn't feel obvious yet.

## Files

- `index.html` — layout, styles, element scaffolding
- `greekverbprac.app.js` — application logic, SRS, rendering, answer comparison
- `greekverbprac.data.js` — verb list, overrides, example sentences, grammar notes

No build step. Three static files, served straight from GitHub Pages.
