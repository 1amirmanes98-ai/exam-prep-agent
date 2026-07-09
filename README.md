# 🎓 exam-prep-agent

An AI exam-prep system in two parts:

1. **A grounded tutor agent** (Claude Code): teaches, quizzes, administers and
   strictly grades mock exams, walks through past-exam questions Socratically, and
   tracks your progress between sessions — every claim grounded in the actual course
   materials, never from memory.
2. **A self-contained study website** (free GitHub Pages, works on any phone):
   all past exams translated with sealed solution sketches, generated mock exams,
   flashcards, quizzes, a memorization cheat sheet with tracking, computed concept
   figures, and retrieval search over everything.

Currently serving three courses:

- **Foundations of Deep Learning** (TAU 03683080) →
  **https://1amirmanes98-ai.github.io/exam-prep-agent/**
- **Intro to Statistics** (TAU 0365.1813, Prof. Ruth Heller) →
  **https://1amirmanes98-ai.github.io/exam-prep-agent/stats/**
- **Reinforcement Learning** (TAU 0368.3075, Prof. Yishay Mansour) →
  **https://1amirmanes98-ai.github.io/exam-prep-agent/rl/**

## Study

- **Website:** the links above — no account, free, everything client-side.
- **Tutor:** open a Claude Code session on this repo and run `/progress` to start.
  The skills serve both courses and pick the right one from your question; on a fresh
  clone, attach the matching content zip (`fodl-tutor-content.zip` /
  `stats-tutor-content.zip`) and say "restore my study content" — see each agent's
  README ([FODL](dl-exam-agent/README.md) · [Statistics](stats-exam-agent/README.md)).
- Skills: `/teach` · `/quiz` · `/exam` · `/solve` · `/drill` · `/flashcards` · `/progress`

## 🔁 Build this for YOUR course

**Read [`REPLICATION.md`](REPLICATION.md)** — the exact playbook (with per-phase
token budgets and cost traps to avoid; a naive replication costs ~2M tokens, the
playbook route ~400–800k). The pipeline is course-agnostic: copy
`dl-exam-agent/scripts/` and `.github/workflows/pages.yml` verbatim; everything
course-specific lives in one config file (`index/SITE_CONFIG.json`). Hebrew course
content is supported out of the box; a full Hebrew/RTL UI is a documented one-time
phase (`REPLICATION.md` Phase 6).

**Reusable toolkit in [`replication/`](replication/)** — so the next build re-derives nothing:

| tool | what it does |
|---|---|
| `INDEX_FORMAT.md` | the exact output spec to hand every indexing agent (the biggest speedup) |
| `fetch_libs.sh` | fetch the pinned KaTeX/marked/fonts the build inlines |
| `make_text_mirrors.py` | PDF/PPTX → greppable text mirrors (read the cheap mirror first) |
| `validate_index.py` | pre-build format check (catches parser-breaking mistakes for free) |
| `verify_site.mjs` | the once-per-phase headless-Chromium verification |

Short version: create a repo → open a Claude Code session with your materials +
past-exams zips → *"Build me an exam-prep agent and study site like
`1amirmanes98-ai/exam-prep-agent` — read its REPLICATION.md and follow it exactly."*

### התחלה מהירה (עברית)

לבניית סוכן לקורס חדש: פִּתחו ריפו, פִּתחו סשן של Claude Code עם שני קבצי zip (חומרי הקורס +
מבחני עבר), ובקשו: *"בנה לי סוכן לימוד ואתר מבחנים כמו `1amirmanes98-ai/exam-prep-agent` —
קרא את `REPLICATION.md` ועקוב אחריו בדיוק."* מבחנים בעברית נתמכים (הסוכן קורא את עמודי ה-PDF
חזותית ומתרגם); הכלים המשותפים ב-`replication/` חוסכים זמן וטוקנים; ממשק עברי (RTL) לאתר הוא
שדרוג חד-פעמי מתועד (Phase 6).

## Repo layout

```
dl-exam-agent/          # FODL tutor (same layout as stats-/rl- below)
stats-exam-agent/
rl-exam-agent/
├── AGENT.md            # tutor operating manual (grounding, grading, progress rules)
├── README.md           # tutor usage + content-restore + site rebuild instructions
├── progress.md         # study memory (committed at session end)
├── generated_exams/    # tutor-generated mock exams + sealed rubrics (original content)
├── scripts/            # course-agnostic: site builder, template, restore script
└── index/SITE_CONFIG.json  # ALL course-specific site values
.claude/skills/         # /teach /quiz /exam /solve /drill /flashcards /progress (shared)
.github/workflows/      # Pages deploy (docs/ → github.io on every push)
docs/index.html         # built FODL site   ·   docs/stats/ · docs/rl/  the others
replication/            # reusable toolkit: INDEX_FORMAT.md + build/validate/verify scripts
REPLICATION.md          # how to rebuild this for any course, cheaply
```

Raw course materials and the generated study index are intentionally **not in git**
(`.gitignore`) — they live in the owner's content zip and inside the built site only.
Course content belongs to its authors; publish only what you're allowed to.
