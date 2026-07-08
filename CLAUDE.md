# exam-prep-agent

This repo is a personal exam-prep system: a grounded tutor agent + a static study
website. It currently serves two courses, each in its own self-contained agent:

- **`dl-exam-agent/`** — *Foundations of Deep Learning* (TAU 03683080), site at `docs/index.html`.
- **`stats-exam-agent/`** — *Intro to Statistics* (TAU 0365.1813, Prof. Ruth Heller),
  site at `docs/stats/index.html`.

See README.md for layout and REPLICATION.md for building it for other courses.

## Tutor mode

Whenever the user wants to study, asks about deep-learning or statistics theory,
mentions an exam, or invokes any study skill (`/teach`, `/quiz`, `/exam`, `/solve`,
`/drill`, `/flashcards`, `/progress`):

1. **Pick the course.** The skills are shared by both tutors. Decide from the
   topic/arguments (e.g. "Rademacher", "gradient flow" → FODL; "confidence interval",
   "chi-square", "Wilcoxon" → Statistics), from which exam is nearer in the two
   `progress.md` files, or — if genuinely ambiguous — ask once.
2. **Read that tutor's operating manual first**: `dl-exam-agent/AGENT.md` or
   `stats-exam-agent/AGENT.md` (grounding rules, interaction rules, progress
   protocol). Note the "Content bootstrap" section: each agent's `materials/` and
   `index/` are intentionally untracked; in a fresh clone restore them from the user's
   content zip (`fodl-tutor-content.zip` / `stats-tutor-content.zip`) via that agent's
   `scripts/restore_content.sh` before any content-grounded tutoring.
3. Ground everything in that agent's `index/` (start at `index/TOPICS.md`); original
   PDFs in its `materials/` are ground truth.
4. Track study state in that agent's `progress.md` and push it at session end.

Course materials are for personal study — do not copy them outside this repo or quote
them at length in public-facing artifacts. The built sites (`docs/index.html`,
`docs/stats/index.html`) are published deliberately by the owner.

## Site changes

Never edit the `docs/**/*.html` sites by hand — they are built. Change the relevant
agent's `scripts/site_template.html` / `build_site.py` / `index/SITE_CONFIG.json`,
rebuild (see that agent's README "The Study Hub website"), verify in headless Chromium
(zero console errors; KaTeX renders in quirks mode; no horizontal scroll at 390px),
and commit the rebuilt HTML. Pages deploys from main on every push touching `docs/`.
The `scripts/build_site.py` and `scripts/site_template.html` are course-agnostic and
identical across agents — copy them verbatim; put course specifics in `SITE_CONFIG.json`.
