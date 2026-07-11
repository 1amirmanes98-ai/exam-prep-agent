# Headless verification suite

**תקציר בעברית:** סוויטת בדיקות Chromium ללא-ראש לאתר הבנוי. מריצים
`bash run_all.sh docs/stats/index.html --rtl --figs --examfigs --memo`
אחרי כל rebuild; "עובר" = כל הבדיקות ירוקות ואפס שגיאות קונסול. הבדיקות נולדו
מרגרסיות אמיתיות — אל תוותרו עליהן.

Each check opens the built single-file site in headless Chromium and asserts a
feature the hard way (real DOM, real clicks). All take `<site.html> [shots-dir]`;
`run_all.sh` picks the right subset by course flags (see its header).

| Check | Guards |
|---|---|
| `../verify_site.mjs` | generic smoke: zero console errors, KaTeX both modes, exam math renders, localStorage survives reload |
| `verify_stmt.js` | question statements render (mdslot-collision regression); stats-only: a_2023 shows all 4 questions (bonus-pts regression) |
| `verify_dir.js` | RTL courses: base direction is `rtl` even when content opens with Latin (`**a.**`) — the `dir="auto"` regression; step-splitting into `<p>`s |
| `verify_callouts.js` | 💡/⚠️ callouts render with correct accent side + Hebrew |
| `verify_mistakes.js` | flashcards: mistakes-only toggle isolates miss/almost, grade badges, graded counter, reset button |
| `verify_search.js` | Ask tab: queries return hits (override via 3rd arg, comma-separated), corpus composition line, clicking a hit lands on the exact question (anchor + flash) |
| `verify_allfigs.js` | every registered concept figure paints non-blank pixels |
| `verify_examfigs.js` | per-question exam figures mount inside the right questions (skips exams not in the course) |
| `verify_memo.js` | Memorize tab: sections, items, known-counter |

Setup (once per machine): `npm i playwright-core` in a dir on `NODE_PATH` (or next
to this dir), Chromium under `/opt/pw-browsers/chromium-*/` or `CHROME_BIN=<path>`.

Pass = exit 0 per script, `ALL ... CHECKS PASSED` lines, and the run_all summary
`N passed, 0 failed`. Any console error inside the page fails the run.
