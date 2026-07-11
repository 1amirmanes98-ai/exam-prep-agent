# Replicating this exam-prep system for another course — the cheap way

This playbook exists because the first naive replication attempt burned ~2M tokens.
Followed exactly, a replication should cost **roughly 400–800k tokens**, almost all of
it on the one irreducible task: reading YOUR course's PDFs. Everything else is
copying, not creating.

**The golden rule: COPY the code, GENERATE only the content.**
The canonical engine lives in **`replication/engine/`** (`site_template.html` +
`build_site.py`); `replication/engine/sync.sh` copies it byte-identically into every
course's `scripts/` dir (and `sync.sh --check` detects drift). `scripts/restore_content.sh`
and `.github/workflows/pages.yml` are likewise course-agnostic. All course-specific
values live in TWO small files you write: `index/SITE_CONFIG.json` (config + UI strings)
and `index/figures.js` (figure registries; optional). If you find yourself editing the
template HTML or the build script for a course, you are doing it wrong — a genuinely
new feature goes into `replication/engine/` and is synced to ALL courses.

**Reusable tooling lives in `replication/`** — use it instead of re-deriving anything:
`INDEX_FORMAT.md` (the exact output spec to hand every indexing agent — the single biggest
speedup), `fetch_libs.sh` (fetch the pinned KaTeX/marked/fonts), `make_text_mirrors.py`
(PDF+PPTX → text mirrors), `validate_index.py` (pre-build format check — run before building),
`checks/` (the full headless-Chromium verification suite — `checks/run_all.sh` per rebuilt
site) with `verify_site.mjs` as its generic smoke test, `engine/` (the canonical site
template + build script + sync), `MODELS.md` (which Claude model for which job),
`SESSION_CHECKLIST.md` (the end-of-session engineering checklist), `FEATURES.md` (everything
the engine gives a new course for free), and `STUDENT_GUIDE_TEMPLATE.md` (fill-in README for
the new course). The phases below point at each.

## Phase 0 — Setup (≈5k tokens)

1. Clone the template read-only: `git clone https://github.com/1amirmanes98-ai/exam-prep-agent /tmp/template`
2. Copy verbatim into your repo: `dl-exam-agent/scripts/` (3 files),
   `.github/workflows/pages.yml`, and the `.gitignore` entries for
   `dl-exam-agent/materials/` and `dl-exam-agent/index/`.
3. Unzip the user's materials into `dl-exam-agent/materials/{lectures,recitations,homework,exams}/`
   with clean snake_case names; run `pdftotext -layout` into `materials/text/...`
   mirrors (`apt-get install poppler-utils`).
4. **Decide with the user NOW**: is course content allowed on their (public?) repo?
   Default: keep `materials/` + `index/` gitignored; ship content via a zip +
   `restore_content.sh` (like the template), and publish only `docs/index.html`.
5. **Decide the CONTENT language NOW** (second up-front decision — this one burned
   ~700k tokens once). If the course is Hebrew and the user will want a Hebrew site,
   index the prose **in Hebrew directly** in Phase 1 (structural markers stay
   English — see Phase 6). Indexing in English "by convention" and translating the
   whole index back later costs a full extra fan-out (~300–500k tokens) and risks
   translation drift from the original exam wording.

## Phase 1 — Index the course (the expensive part; ≈250–500k tokens)

Fan out parallel agents (3–4 files each). **Give every agent the exact output
format** below — inventing formats is where replicas waste tokens. Copy the agent
prompts from the template's index files' structure:

- `index/lectures/<name>.md` — format: title/File/Pillar/summary header, then
  `## Outline`, `## Key definitions` (items start `**Def (name).**`),
  `## Key theorems & results` (items start `**Thm/Lem/Prop (name).**`, each with
  "Proof idea:" and "Exam relevance:"), `## Techniques & tricks`,
  `## Exam-relevant nuggets`. Flashcards are auto-extracted from the Def/Thm items.
- `index/exams/<name>.md` — per question: `## Q<n> (<pts> pts) — <title>`, then a
  `**Topics:** ... | **Pillar:** ... | **Difficulty:** ...` line, `**Maps to:**`,
  `**Statement (English translation):**`, `**Solution sketch:**`. Statements must
  be complete enough to re-administer.
- `index/recitations/<name>.md`, `index/homework/<name>.md` — see template files.
- `index/TOPICS.md` — pillar tables `| topic | taught | examined | 🔴/🟠/🟡 |` under
  `## Pillar N — <SlotName>` headings; exam refs formatted `a2023_Q2`-style.
- `index/EXAM_MAP.md` — master table + `## Recurring question archetypes`
  numbered list (the site parses the refs out of the archetype text).

**Cost controls:**
- Typeset English PDFs → agents read the **text mirrors** (cheap); use visual PDF
  reads ONLY for scanned/Hebrew/garbled files or to double-check a formula.
- Instruct agents to **write each file as soon as it's done** (crash resilience).
- Skip homework indexing in v1 if budget-tight; add later.
- **Wall-clock control on small boxes:** a workflow's agent concurrency is capped at
  `min(16, cpu_cores − 2)` — on a 4-core cloud box that is **2 agents**, so one big
  fan-out crawls (8 units/40 min). The cap is *per workflow*: make the fan-out script
  take an `args {units:[...]}` slice and launch **5–7 parallel workflows** over
  disjoint slices → ~14 concurrent agents, ~7× faster, identical prompts/quality.
  (Also: `args` may arrive as a JSON *string* — normalize with a
  `typeof args === "string" ? JSON.parse(args) : args` guard at the top.)
- If subagents die with credit/model errors mid-fleet, relaunch the failed slices
  with an explicit `model:` override in the agent opts instead of rerunning everything
  — completed files on disk are the ground truth of what's left.

## Phase 2 — Config + build + verify (≈30k tokens)

1. Write `index/SITE_CONFIG.json` (copy the template's and edit): courseName,
   subtitle, heroTitle/heroSub, examFormatLine, `slots` (up to 4 **single-word**
   category names — they become CSS classes), slotKeywords (lowercase keyword →
   slot, used to classify index content), slotRoles, mockSlotByQ,
   askSuggestions, and **`"figures": false`** (the built-in figures are
   FODL-specific; write new ones only as a later phase).
2. Fetch libs once (KaTeX 0.16.11 min js/css + contrib/auto-render + marked 12 +
   the 13 woff2 fonts — exact list in `dl-exam-agent/README.md`).
3. Build: `python3 dl-exam-agent/scripts/build_site.py dl-exam-agent/index <libs> \
   dl-exam-agent/scripts/site_template.html /tmp/site.html docs/index.html`
   The **5th arg** (`docs/index.html`) is written **wrapped in `<!doctype html>`**
   (standards mode — needed so KaTeX doesn't hit quirks mode); the 4th arg is the raw
   fragment. Always pass the 5th arg for the deployed copy, and **never hand-patch the
   doctype into `docs/`** — a plain rebuild would just drop it again.
4. Verify ONCE in headless Chromium (Playwright, executablePath
   `/opt/pw-browsers/chromium`): zero console errors; KaTeX count > 0 on an exam
   page; **test the raw fragment (quirks mode) — the build already patches KaTeX's
   quirks-mode guard, just confirm**; no horizontal scroll at 390px; localStorage
   survives reload. Do NOT iterate visual polish beyond this.

## Phase 3 — Agent + skills (≈15k tokens)

Copy the template's `CLAUDE.md`, `dl-exam-agent/AGENT.md`, `progress.md`, and
`.claude/skills/*` and substitute course facts (name, exam format, file counts).
Do not redesign them.
For the course README (the student's user guide), fill in
`replication/STUDENT_GUIDE_TEMPLATE.md` instead of writing one from scratch.

## Phase 4 — Publish (≈10k tokens)

Commit `docs/index.html` + workflow, push, PR to main, user merges. Known gotcha:
first Pages deploy may fail "Resource not accessible" → user sets Settings → Pages
→ Source: **GitHub Actions**, then re-runs the workflow. Deploys only run from main.

## Phase 5 — Optional extras (defer until the user asks)

Mock exams (generate ONE, solve-first, numeric sanity-check — ≈40k each);
**cheat sheet** → `index/CHEATSHEET.md` in **INDEX_FORMAT.md FORMAT E** (populates the
Memorize tab; ~40–55 grounded items — generate it AFTER the exams are indexed so the
`Seen in` refs are real; skipping it ships a live but **empty** Memorize tab); figures
(see Phase 7); **takeaway callouts** on each solution (💡 tricks / ⚠️ watch-outs — the
format is in **INDEX_FORMAT.md** under FORMAT C, so hand it to the indexing agents and
they land for free); full adversarial audit (≈150–300k — worth it, but run ONE audit
pass at the end, not after every phase).

## Phase 7 — Illustrations, diagrams & figures (≈40–80k tokens)

Rules that keep figures an asset instead of a liability in a rigor-focused course:

1. **Computed, never hand-drawn.** Every curve must be produced live in the page
   by integrating/simulating the stated equation (RK4/Euler ODE integration, real
   GD iterates, fixed-seed Monte-Carlo) — a subtly wrong hand-drawn figure is
   worse than none. Diagrammatic figures (decompositions, covers) are allowed
   only when they depict a *definition*, not a behavior.
2. **Where they live in the code:** the `FIGS` registry + `FIG_TOPIC_MAP` /
   `FIG_MEMO_MAP` blocks in `site_template.html` are the ONE sanctioned
   course-specific edit to the template (everything else stays verbatim). Each
   entry = { title, pillar (a config slot), caption, draw(canvas) }. Use
   `figCanvas()` (dpr-aware) and `cssVar()` for theme colors — figures must
   redraw correctly on theme toggle (already wired).
3. **Pick 4–8 concepts where geometry IS the insight** (a flow riding a conserved
   quantity, rates separating, a projection, a cover, oscillations doubling).
   Skip decorative network diagrams and stock imagery — zero exam value.
   **Cover every pillar.** A pillar with no figure is a visible gap — in the RL
   course Approximation (policy gradient) had none until a later pass; sweep the
   `slots` list and make sure each has at least one figure before you stop.
4. **Mounting — topics, memo, AND solutions.** Map by regex (`FIG_TOPIC_MAP` /
   `FIG_MEMO_MAP`) onto topic and cheat-sheet item names; they render as collapsed
   📈 nodes (lazy-drawn), so they add no page weight or clutter. **Also mount a
   single folded figure on matching exam/mock solutions** — `figsForSolution(q)`
   appended to the `.sketchslot` in both `questionCard` and `renderExamDetail`. The
   diagram sitting next to the worked answer is a real learning aid; this **reverses
   the original "never in solutions" rule** after users explicitly asked for it.
   Keep it **capped at one and collapsed** so it never competes with the full
   *written* argument, and put generic regexes (a bare `/mdp/`) LAST in the map so
   specific concepts win the match.
5. **Captions state the exact model** ("Computed: σ̇ᵣ = −3(σᵣ²)^(2/3)(σᵣ−σᵣ*)
   from σ(0)=0.01") and cite the lecture; captions are indexed by Ask
   automatically. Raster images/photos are a last resort: the site must stay
   self-contained, so anything external would need embedding as a data: URI —
   prefer canvas.
6. **Verify visually once — via the real mount path.** Build a `figNode()` inside
   the *live* page and screenshot its canvas. Do **not** screenshot from a scratch
   harness that overwrites `document.body.innerHTML` — that detaches `cssVar()` from
   `:root`, and every figure silently renders as false all-black (a full debugging
   detour paid for already). Eyeball each figure for (a) the computed behavior
   matching the theorem and (b) **label collisions** — a figure can draw throw-free
   yet have two edge labels stacked on top of each other. Canvas gotchas already
   paid for: `color-mix()` is unreliable as a canvas `fillStyle` (use `globalAlpha`
   + a solid `cssVar()` color); and on a **reversed** arrow the left-normal vector
   flips sign, so a bidirectional edge needs opposite-signed label offsets on its
   two directions.
7. **Per-question exam figures (data-driven) — a second, complementary system.** The
   figures above are *concept* pictures mapped onto topics/memo by regex. A course whose
   EXAMS lean on plots (histograms, scatter/regression, QQ-plots, boxplots, residuals)
   also wants a figure drawn **under each such question's statement**. That engine is a
   reusable toolkit file — **`replication/exam_figures.js`** — with pre-tested generators
   (`figScatter` / `figHist` / `figQQ` / `figBox`) and three wiring hooks (a
   `figNode(id, open)` flag, a `FIG_EXAM` question→figure map, and an open mount in
   `renderExamDetail`). To fill `FIG_EXAM` cheaply: fan out one extraction agent per batch
   of exam files that emits a tiny JSON spec `{qid, type, title, caption, params}` (no
   agent writes canvas code), then a deterministic assembler turns that JSON into the
   `Object.assign(FIGS,…)` + `FIG_EXAM` block. Pass the exam's EXACT printed numbers
   (regression equation, R summary stats, axis ranges) so the reconstruction is faithful,
   and caption each as an **illustration / schematic** (the index has the described shape
   + parameters, not the raw sample points). Mount **open** — a question depends on its
   plot — and verify via the real page mount, not a body-overwriting harness. Live
   reference implementation: the ~21 figures in `stats-exam-agent/`.

## Phase 6 — Hebrew-language course (IMPLEMENTED in the template — config-only)

As of the Hebrew-RTL upgrade (see `contrib/hebrew-rtl.patch` and the live example at
`stats-exam-agent/`), the template ships with full RTL/i18n support. **Do not edit the
template files** — everything is driven from `SITE_CONFIG.json`:

1. `"dir": "rtl"`, `"lang": "he"` — boot sets `document.documentElement.dir/lang`.
2. `"ui": { ... }` — every UI string (nav, buttons, headings, section subtitles, units
   like "pts", the Ask corpus line and result headers, priority badges, flashcard
   prompts/filters, empty states). **Copy the complete working pack from
   `stats-exam-agent/index/SITE_CONFIG.json`** — it is the canonical reference; any
   missing key silently falls back to English, so partial packs "work" but produce
   the mixed-language UI you are trying to avoid. Static-HTML strings are wired via
   `data-i18n` attributes; JS-generated strings via the `tr()` helper.
3. `"slotLabels": { "SlotId": "שם בעברית", ... }` — Hebrew DISPLAY names for the
   category slots. Slot **IDs** stay single-word English (they are CSS classes and
   index-file tokens); only what users see is translated.

**Content language.** Hebrew content already works end-to-end: index prose may be
Hebrew (decide this in Phase 0!), math stays LTR inside KaTeX, rendered markdown gets
`dir="auto"` so each block auto-detects its direction (English and Hebrew content both
read correctly), and the Ask tokenizer understands Hebrew (stopwords +
definite-article stripping). Keep the *structural* markers of the index format in
English — the parsers key on them: `## Q1 (40 pts) — …` headers,
`**Statement…:**`/`**Solution sketch:**`/`**Topics:**`/`**Pillar:**` keys, the
`## Key definitions` / `## Key theorems & results` section names, `**Def (…)**`
item markers, pillar tokens, and `a2023_Q2`-style refs. Only prose goes Hebrew.
If translating an existing English index, give each agent the original Hebrew text
mirrors so exam statements are *restored* to authentic wording, not back-translated.

**Pitfalls already paid for (so you don't pay again):**
- Name the i18n helper `tr()`, NOT `t()` — the template uses `t` as a local variable
  (topics), and the collision ("t is not a function") silently blanks whole tabs.
- LTR islands are broader than just math: `.katex, .katex-display, code, pre, .pts,
  .chip, .diff { direction: ltr; unicode-bidi: isolate }`.
- `main { min-width: 0 }` on the grid child — without it, wide content forces
  horizontal scroll at 390px (a CSS-grid min-content quirk, not an RTL issue).
- Verify in headless Chromium at desktop + 390px: `document.dir === "rtl"`, nav rail
  on the RIGHT, card stripes flipped (borderRight = 4px), KaTeX computed
  `direction: ltr`, a Hebrew search query returns hits, bottom mobile nav mirrored,
  zero console errors, no horizontal scroll. Screenshot 2–3 mixed Hebrew+math
  paragraphs and eyeball them — bidi bugs hide from DOM checks.

## English-language course notes (the cheap case)

Phase 6 covers Hebrew; an English course is strictly easier — mostly *omissions*:

- Leave `dir`/`lang`/`ui`/`slotLabels` out of `SITE_CONFIG.json` (or set
  `"dir":"ltr","lang":"en"` explicitly, as `rl-exam-agent` does). Every UI string
  falls back to the template's built-in English; the LTR islands are inert.
- Text mirrors come out clean (no RTL garbling), so Phase 1 agents can index
  from the cheap mirrors throughout — including exams. Budget accordingly (the
  "Hebrew exams are the cost center" rule doesn't apply).
- The build strips a leading `Def (…)`/`Thm (…)` keyword from flashcard fronts
  automatically; write card items naturally per INDEX_FORMAT.
- Keyword-based pillar slotting (`slotKeywords`) works unmodified — just supply
  English keywords.

## Model playbook

Which Claude model to use for which job (planning vs execution vs the Phase-1
fan-out — the single biggest cost lever) is documented in
**`replication/MODELS.md`**. Read it before launching any agent fleet.

## Per-session checklist

Before ending any build/engineering session, run the checklist in
**`replication/SESSION_CHECKLIST.md`** (sync → 5-arg rebuild → checks suite →
zip regeneration → git/PR hygiene). Its study-side counterpart is the progress
protocol in each agent's `AGENT.md`.

## Anti-patterns that burned tokens the first time

- Rewriting/adapting `site_template.html` instead of using SITE_CONFIG. (Biggest sink.)
- Indexing a Hebrew course in English "by convention", then translating the whole
  index back to Hebrew later — a full extra fan-out. Decide content language in
  Phase 0 and index in it directly. (Second-biggest sink.)
- Re-reading whole PDFs visually when text mirrors sufficed.
- Re-verifying with screenshots after every tiny edit — verify once per phase.
- Auditing everything at maximum depth repeatedly — one adversarial pass at the end.
- Agents batching all writes to the end, then dying (rate limits) — write-as-you-go.
- One giant fan-out workflow on a 4-core box (2-agent cap) — slice into parallel
  workflows (see Phase 1 cost controls).
- Translating UI strings piecemeal from screenshots — enumerate ALL string literals
  in the template first (grep), wrap them once, then fill the `ui` pack completely.
- Debugging LaTeX/quirks/Pages issues from scratch — they're already solved here;
  read this file and the commit history instead.
- **Stacking follow-up commits on a branch whose PR was already merged.** A merged
  PR is closed and finished; pushing more onto its branch just confuses everyone
  (and can't be re-merged). For follow-up work, branch fresh off the latest `main`
  and open a NEW PR — even a one-commit change. (Paid for on the RL figures follow-up.)
- **Verifying canvas figures from a `document.body.innerHTML = …` scratch harness.**
  It detaches the figures from the `:root` CSS variables, so `cssVar()` returns empty
  and everything paints black — you chase a "bug" that only exists in the harness.
  Mount the real `figNode()` in the loaded page and screenshot that.
- `dir="auto"` on rendered blocks — it resolves by FIRST strong character, so any
  Hebrew block that opens with Latin/digits (`**a.**`, `Q1 ·`) flips whole-block LTR.
  Base direction must come from config (`const BIDI = CONFIG.dir`); keep `auto` nowhere.
- Two open PRs both carrying generated `docs/` files: the last merge silently clobbers
  the first. Stack the second PR on the first branch and say so in the PR body.
- Points regex anchored as `\((\d+)\s*pts?\)` drops questions titled
  `(24 pts +7 bonus)` — always `pts?[^)]*\)`, and watch the build's question count.
- Reusing a generic mount class (`.mdslot`) for a new box: `setMd($(".mdslot"))`
  grabbed the new box and the question statements vanished. New slots get their own
  class; `checks/verify_stmt.js` guards this.
- Bulk content passes via agent fan-out: agents can misclassify Hebrew files as
  "English" and silently skip them. Diff every file against a backup, and diff the
  extracted math spans against a baseline — prose may change, math must not.
- `\text{...}` inside math is user-visible language: Hebraize labels
  (`\text{עוצמה}`, `\text{סכום שורה}`) but keep Latin identifiers/subscripts.

## Engine updates & lessons (from the RL replication — the 3rd course)

The RL agent (`rl-exam-agent/`, a 4-pillar Hebrew-exam course) refined the engine and the
process. Copy new agents' `scripts/` from the **most up-to-date** agent — currently
`rl-exam-agent/scripts/` — which adds, all still driven by `SITE_CONFIG.json`:

- **Config-driven pillar count (3 or 4).** A slot is a hero pillar (gets a card, template-bar
  segment, and topic/flashcard/quiz filter) **iff it has a `slotRole`**; any extra slot with no
  role is the misc/catch-all bucket. So FODL/stats (3 roles) render 3 pillars and RL (4 roles)
  renders 4 — no template edit, no hard-coded "3". Put exactly as many entries in `slotRoles`
  as you want hero pillars.
- **Two-tier solutions.** Each question can show a short **`**Hint:**`** fold above a
  **`**Full solution:**`** fold. Past-exam files just keep their worked solution (rendered as
  "Full solution"); mocks put `**Hint:**` / `**Full solution:**` in each `## QN` solutions block.
- **Takeaway callouts on solutions.** All three templates' `setMd()` auto-boxes any bullet or
  paragraph whose leading bold text starts with `💡` or `⚠️` (`💡 Useful tricks` → pillar/`--opt`
  color; `⚠️ Watch out` → `--gen`). To use them, append two blocks per solution — past-exam files
  as bullets under `**Solution sketch:**`, mocks as a paragraph per `## QN`:
  `**💡 Useful tricks:** …` / `**⚠️ Watch out:** …`. The CSS is logical-property based
  (`border-inline-start`) so it flips in an RTL/Hebrew site untouched, and the labels live in
  content (emoji-detected) so a Hebrew course just writes them in Hebrew.
- **Mock total** is derived from the sum of the mock's question points (no hard-coded value).
- **Figures on solutions + full pillar coverage.** The `FIGS` registry should cover every
  pillar, and `figsForSolution()` mounts one folded figure next to matching worked solutions —
  not just on topics/memo.

**UPDATE — the engines are unified.** The RTL/i18n line (dl/stats) and the newer engine
(rl) were merged into ONE canonical template + build in **`replication/engine/`**; every
course's `scripts/` copy is a byte-identical sync (`replication/engine/sync.sh`). Course
figure registries (`FIGS` / `FIG_EXAM` / `FIG_TOPIC_MAP` / `FIG_MEMO_MAP`) moved out of the
template into per-course **`index/figures.js`**, injected by the build at the `__FIGS__`
placeholder — so there is NO sanctioned course-specific template edit anymore. A new course
gets RTL, hints, callouts, figures, config-driven pillars, the mistakes flashcard mode, and
search jump-to-question from the same file. `contrib/hebrew-rtl.patch` is historical.

Process lessons that made this replication cheaper/faster:

- **Materials are often already sorted.** If the user hands you clean per-category folders,
  skip re-sorting — map them straight into `materials/{lectures,recitations,exams,...}`.
- **Hebrew (or scanned) exams are the cost center** — their text mirrors are RTL-garbled, so
  agents must *visually* Read the PDF pages. English lecture/recitation slides index fine from
  the cheap `pdftotext`/pymupdf mirrors; reserve visual reads for exams and formula checks.
- **Fan out ~1 agent per 2–3 files** (≈16 for a full course), each given the exact output
  format and told to **write-as-you-go**; then run a tiny **format-validation script** (grep for
  the required `## Q`, `**Pillar:**`, `**Statement:**`, `**Solution sketch:**` markers, and that
  points sum to the exam total) before building — it catches parser-breaking mistakes for free.
- **Synthesize `TOPICS.md` + `EXAM_MAP.md` yourself** after indexing, by parsing the generated
  `index/exams/*.md` for each question's pillar/points/topics — that gives you real recurring-
  archetype **frequencies** (e.g. "Q1 Planning 13/13, Q3 Approximation 13/13") to drive the
  dashboard and the mock design, instead of guessing.
- **Verify once with a headless-Chromium script**, not screenshots-per-edit: zero console
  errors; KaTeX count > 0 on an exam page **and** on the raw quirks-mode fragment; a mock parses
  to the right pillars/total; localStorage survives reload. One run per phase.
