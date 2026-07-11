# 🎓 exam-prep-agent

An AI exam-prep system in two parts:

1. **A grounded tutor agent** (Claude Code): teaches, quizzes, administers and
   strictly grades mock exams, walks through past-exam questions Socratically, and
   tracks your progress between sessions — every claim grounded in the actual course
   materials, never from memory.
2. **A self-contained study website** (free GitHub Pages, works on any phone):
   all past exams translated with sealed solution sketches and a 💡-trick / ⚠️-watch-out
   takeaway on each, generated mock exams, flashcards, quizzes, a memorization cheat
   sheet with tracking, computed concept figures plus per-question exam figures
   (histograms, scatter/regression, QQ, boxplots), and retrieval search over everything.

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
| `exam_figures.js` | drop-in canvas generators (histogram/scatter/QQ/boxplot/residual) for per-question exam figures — copy in, wire 3 hooks, populate `FIG_EXAM` |
| `verify_site.mjs` | the once-per-phase headless-Chromium verification (console errors, KaTeX in both modes, localStorage, and every computed figure draws + pillar-coverage warning) |
| `checks/` | the full headless verification suite (`checks/run_all.sh <site> [--rtl] [--figs] [--examfigs] [--memo]`) — statements, RTL, callouts, flashcard mistakes mode, search jump-to-question, figures, memo |
| `engine/` | the **canonical** site template + build script; `engine/sync.sh` keeps every course's `scripts/` copy byte-identical |
| `MODELS.md` | which Claude model for which job (Fable plans, Opus executes, Sonnet runs the indexing fleet) |
| `SESSION_CHECKLIST.md` | end-of-session engineering checklist (sync → rebuild → checks → zip → git/PR) |
| `FEATURES.md` | everything the engine gives a new course for free (the feature matrix) |
| `STUDENT_GUIDE_TEMPLATE.md` | fill-in bilingual README/user-guide for the new course |

Short version: create a repo → open a Claude Code session with your materials +
past-exams zips → *"Build me an exam-prep agent and study site like
`1amirmanes98-ai/exam-prep-agent` — read its REPLICATION.md and follow it exactly."*

### התחלה מהירה (עברית)

לבניית סוכן לקורס חדש: פִּתחו ריפו, פִּתחו סשן של Claude Code עם שני קבצי zip (חומרי הקורס +
מבחני עבר), ובקשו: *"בנה לי סוכן לימוד ואתר מבחנים כמו `1amirmanes98-ai/exam-prep-agent` —
קרא את `REPLICATION.md` ועקוב אחריו בדיוק."* מבחנים בעברית נתמכים (הסוכן קורא את עמודי ה-PDF
חזותית ומתרגם); הכלים המשותפים ב-`replication/` חוסכים זמן וטוקנים; ממשק עברי (RTL) לאתר הוא
שדרוג חד-פעמי מתועד (Phase 6).

**לקחים שנצברו (בקצרה) — כדי לעבוד מהר יותר, חכם יותר, זול יותר:**

- **החליטו מראש (Phase 0):** שפת התוכן (עברית/אנגלית) והפרטיות (האם חומרי הקורס עולים לריפו).
  אינדוקס באנגלית ואז תרגום חזרה לעברית = fan-out שלם מבוזבז (~300–500k טוקנים).
- **אל תערכו את התבנית של קורס.** המנוע הקנוני יושב ב-`replication/engine/` ומסונכרן לכל הקורסים
  (`engine/sync.sh`); ספציפי-לקורס = `index/SITE_CONFIG.json` + `index/figures.js` בלבד. פיצ'ר
  חדש נכנס למנוע פעם אחת וכל הקורסים מקבלים אותו.
- **איורים מאוד עוזרים ללמידה** — אבל *מחושבים* (מסימולציה/משוואה חיה), לא ידניים; אחד לכל pillar;
  וגם **מקופלים ליד הפתרונות** (עוזר לראות את הקונספט ליד התשובה). מאמתים במסלול האמיתי בדף
  (`figNode`), לא ב-harness שמוחק את ה-`body` — אחרת הצבעים נשברים והכל נצבע שחור.
- **מבחנים בעברית = מוקד העלות** (טקסט משובש, צריך קריאה חזותית של ה-PDF). שקופיות ההרצאה/תרגול
  נקראות זול מ-text mirrors.
- **git:** אחרי שה-PR מוזג — פותחים **ענף חדש מ-`main`** ל-PR חדש; לא דוחפים עוד על ענף של PR שכבר
  מוזג (זה סתם מבלבל ולא ניתן למיזוג מחדש).
- **אימות פעם אחת לכל שלב** — עכשיו עם סוויטה מוכנה: `replication/checks/run_all.sh` על כל אתר
  שנבנה מחדש (0 שגיאות קונסול = תנאי מעבר); לא צילום מסך אחרי כל עריכה קטנה.
- **חלוקת מודלים חוסכת הכי הרבה:** פייבל לתכנון, אופוס לביצוע ותוכן, סונט לצי האינדוקס של שלב 1
  (מוקד העלות). פירוט ב-`replication/MODELS.md`.
- **שני PR פתוחים עם `docs/` מיוצר = המיזוג האחרון דורס את הראשון.** מערימים את ה-PR השני על ענף
  הראשון וכותבים בגוף ה-PR מה למזג ומה לסגור.
- **בסוף כל סשן בנייה:** לעבור על `replication/SESSION_CHECKLIST.md` (סנכרון, בנייה, בדיקות,
  ריענון ה-zip אם ה-index השתנה, היגיינת git).

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
replication/            # reusable toolkit: engine/ (canonical template+build), checks/ (verification suite), INDEX_FORMAT.md, MODELS.md, FEATURES.md, guides
REPLICATION.md          # how to rebuild this for any course, cheaply
```

Raw course materials and the generated study index are intentionally **not in git**
(`.gitignore`) — they live in the owner's content zip and inside the built site only.
Course content belongs to its authors; publish only what you're allowed to.
