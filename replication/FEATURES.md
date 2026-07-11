# Site feature matrix — what every new course inherits for free

**תקציר בעברית:** כל מה שהמנוע המאוחד (`replication/engine/`) נותן לקורס חדש
בלי לכתוב שורת קוד: 7 לשוניות, איורים מחושבים (גם בתוך שאלות מבחן), קריאות
💡/⚠️, שבלונות שאלה, פתרון דו-שלבי רמז/מלא, כרטיסיות עם מצב "הטעויות שלי",
חיפוש שקופץ לשאלה המדויקת, RTL מלא — הכול מונע מ-`SITE_CONFIG.json`,
`index/*.md` ו-`index/figures.js` בלבד.

Everything below ships in the canonical engine. A new course writes **content
and config only** (`index/*.md`, `SITE_CONFIG.json`, optional `figures.js`) —
zero template edits.

| Feature | What it does | Engine location | Driven by |
|---|---|---|---|
| **Overview tab** | pillar cards, exam countdown, progress snapshot | `renderDash` | `slots`/`slotRoles`, `examDate` (localStorage) |
| **Topics tab** | per-pillar topic map, taught/examined refs, priority, inline past questions per topic | `renderTopics`/`renderTopicDetail` | `index/TOPICS.md` |
| **Ask tab (search)** | client-side TF-IDF over notes+exams+cheatsheet+topics (rebuilt every load), fuzzy terms, direct-answer chips, verbatim quoted passages | `buildChunks`/`ask`/`renderAsk` | all indexed content; suggestions via `askSuggestions` |
| **Search → jump-to-question** | clicking a hit opens the exam scrolled to that exact question, briefly highlighted | `openExam(examId, qn)`, `#q-<exam>-<n>` anchors, `.qflash` CSS | — |
| **Exams tab** | every past exam, per-question cards: statement, chips, difficulty dots, sealed solutions | `renderExamGrid`/`renderExamDetail` | `index/exams/*.md` (FORMAT C) |
| **Two-tier solutions** | optional collapsed **Hint** fold before the **Full solution** fold; single fold when no hint | `hintfold` CSS + both qcard builders | `**Hint:**` line in exam/mock md |
| **💡/⚠️ callouts** | "useful trick" / "watch out" accent boxes inside solutions | `.co-trick`/`.co-warn` in `md()` | `**💡 …:**` / `**⚠️ …:**` lines in sketches |
| **Question-template boxes (שבלונה)** | collapsed "this is archetype X — here's the recurring pattern" box under matching question headers | `ARCH_BY_Q`/`tmplNode` | archetype list in `index/EXAM_MAP.md` |
| **Concept figures** | computed (never hand-drawn) canvas illustrations on topics/memo/solutions | generators `figScatter/figHist/figQQ/figBox` + `figNode` | `index/figures.js`: `FIGS`, `FIG_TOPIC_MAP`, `FIG_MEMO_MAP` |
| **Per-question exam figures** | schematic reconstructions of the exam's own plots, mounted inside the question statement | same generators | `figures.js`: `FIG_EXAM` (`"a_2024_Q1": [ids]`) |
| **Figures on solutions** | ≤1 relevant concept figure appended to a solution | `figsForSolution` | `FIG_TOPIC_MAP` keywords vs title/topics |
| **Memorize tab** | cheat-sheet items with statement / use-when / watch-out and per-item "known" tracking | `renderMemo` | `index/CHEATSHEET.md` (FORMAT E) |
| **Flashcards tab** | def/thm cards, miss-first deck ranking, per-card last-grade badge, graded counter | `buildDeck`/`renderFlash` | Def/Thm items in lecture notes |
| **"My mistakes" mode** | toggle restricting the deck to cards graded miss/almost; friendly empty state | `flashMistakes` in `buildDeck` | localStorage grades |
| **Explicit progress reset** | grades never auto-wipe; user-initiated reset button with confirm | `renderFlashFilters` | localStorage |
| **Quiz tab** | random past questions by pillar/topic scope, self-grading, repeat-avoidance | `pickQuiz`/`renderQuiz` | exam questions |
| **Weak-spots panel** | topics ranked by quiz misses | `renderWeak` | localStorage quiz log |
| **RTL / i18n** | full right-to-left with LTR islands for math/code/refs; every UI string via `tr()` with English fallbacks | `BIDI`, `.katex/code/.pts/.chip` islands, `tr()` | `SITE_CONFIG.json`: `dir`, `lang`, `ui{}`, `slotLabels` |
| **Config-driven pillars** | 3 or 4 (or N) subject pillars | `PILLARS` from `slotRoles` | `slots` + `slotRoles` |
| **KaTeX everywhere** | inline+display math in statements, solutions, cards, search results | inlined KaTeX 0.16.11 + marked 12 | `replication/fetch_libs.sh` |
| **Single-file deploy** | whole site = one HTML file; Pages deploys `docs/` on push to main | `build_site.py` 5-arg | `.github/workflows/pages.yml` |
| **State persistence** | grades, quiz log, exam date survive reload in localStorage | `store` | — |

**Caveat worth knowing:** flashcard state keys are `lecture + "::" + front.slice(0,60)`
— stable across rebuilds as long as card fronts don't change their first 60 chars.
Editing card fronts orphans existing grades (accepted trade-off; documented, not fixed).
