# exam-prep-agent

This repo is a personal exam-prep system: a grounded tutor agent + a static study
website. **It is the single home for the owner's exam-prep agents** — new courses are
added here, not in any other repo. It currently serves three courses, each in its own
self-contained agent:

- **`dl-exam-agent/`** — *Foundations of Deep Learning* (TAU 03683080), site at `docs/index.html`.
- **`stats-exam-agent/`** — *Intro to Statistics* (TAU 0365.1813, Prof. Ruth Heller),
  site at `docs/stats/index.html`.
- **`rl-exam-agent/`** — *Reinforcement Learning* (TAU 0368.3075, Prof. Yishay Mansour),
  site at `docs/rl/index.html`.

See README.md for layout and REPLICATION.md for building it for other courses.

## Tutor mode

Whenever the user wants to study, asks about deep-learning, statistics, or
reinforcement-learning theory, mentions an exam, or invokes any study skill (`/teach`,
`/quiz`, `/exam`, `/solve`, `/drill`, `/flashcards`, `/progress`):

1. **Pick the course.** The skills are shared by all tutors. Decide from the
   topic/arguments (e.g. "Rademacher", "gradient flow", "NTK" → FODL; "confidence
   interval", "chi-square", "Wilcoxon" → Statistics; "MDP", "Bellman", "Q-learning",
   "policy gradient", "bandit/regret", "value iteration" → RL), from which exam is nearer
   in the three `progress.md` files, or — if genuinely ambiguous — ask once.
2. **Read that tutor's operating manual first**: `dl-exam-agent/AGENT.md`,
   `stats-exam-agent/AGENT.md`, or `rl-exam-agent/AGENT.md` (grounding rules, interaction
   rules, progress protocol). Note the "Content bootstrap" section: each agent's
   `materials/` and `index/` are intentionally untracked; in a fresh clone restore them
   from the user's content zip (`fodl-tutor-content.zip` / `stats-tutor-content.zip` /
   `rl-tutor-content.zip`) via that agent's `scripts/restore_content.sh` before any
   content-grounded tutoring.
3. Ground everything in that agent's `index/` (start at `index/TOPICS.md`); original
   PDFs in its `materials/` are ground truth.
4. Track study state in that agent's `progress.md` and push it at session end.

Course materials are for personal study — do not copy them outside this repo or quote
them at length in public-facing artifacts. The built sites (`docs/index.html`,
`docs/stats/index.html`, `docs/rl/index.html`) are published deliberately by the owner.

## Site changes

Never edit the `docs/**/*.html` sites by hand — they are built. The canonical engine
(`site_template.html` + `build_site.py`) lives in **`replication/engine/`**; every
course's `scripts/` copy is a byte-identical sync. To change the site: edit the engine,
run `bash replication/engine/sync.sh`, rebuild the affected course(s) with the 5-arg
build, run `bash replication/checks/run_all.sh <site> [--rtl --figs --examfigs --memo]`
(zero console errors is the pass bar), and commit the rebuilt HTML. Pages deploys from
main on every push touching `docs/`. Course specifics live ONLY in
`index/SITE_CONFIG.json` (config/UI strings) and `index/figures.js` (figure registries,
injected at the `__FIGS__` placeholder). All engine features — RTL/i18n, config-driven
pillar count via `slotRoles`, Hint/Full solution folds, callouts, figures, the flashcard
mistakes mode, search jump-to-question — are shared by every course. A new course copies
nothing by hand: see REPLICATION.md; end every build session with
`replication/SESSION_CHECKLIST.md`.
