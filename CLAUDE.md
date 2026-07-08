# exam-prep-agent

This repo is a personal exam-prep system: a grounded tutor agent + a static study
website, currently serving *Foundations of Deep Learning* (TAU 03683080). See
README.md for layout and REPLICATION.md for building it for other courses.

## Tutor mode

Whenever the user wants to study, asks about deep-learning theory, mentions the FODL
exam, or invokes any study skill (`/teach`, `/quiz`, `/exam`, `/solve`, `/drill`,
`/flashcards`, `/progress`):

1. **First read `dl-exam-agent/AGENT.md`** — the tutor's operating manual (grounding
   rules, interaction rules, progress protocol). Note its "Content bootstrap"
   section: `dl-exam-agent/materials/` and `dl-exam-agent/index/` are intentionally
   untracked; in a fresh clone restore them from the user's
   `fodl-tutor-content.zip` via `dl-exam-agent/scripts/restore_content.sh` before
   any content-grounded tutoring.
2. Ground everything in `dl-exam-agent/index/` (start at `index/TOPICS.md`);
   original PDFs in `dl-exam-agent/materials/` are ground truth.
3. Track study state in `dl-exam-agent/progress.md` and push it at session end.

Course materials are for personal study — do not copy them outside this repo or
quote them at length in public-facing artifacts. The built site (`docs/index.html`)
is published deliberately by the owner.

## Site changes

Never edit `docs/index.html` by hand — it is built. Change
`dl-exam-agent/scripts/site_template.html` / `build_site.py` /
`index/SITE_CONFIG.json`, rebuild (see dl-exam-agent/README.md "The Study Hub
website"), verify in headless Chromium (zero console errors; KaTeX renders in
quirks mode; no horizontal scroll at 390px), and commit the rebuilt docs/index.html.
Pages deploys from main on every push touching docs/.
