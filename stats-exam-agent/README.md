# Intro to Statistics Exam Tutor 🎓

A personal exam-prep agent for **Intro to Statistics** (TAU 0365.1813, Prof. Ruth
Heller), built from the course's written summary (weeks 1–10), the lecture slide
decks (7–11), and **19 past finals (2012–2025)** — all indexed, translated, and
tagged by topic. Five of the exams include official solutions.

## How to use it

Open a Claude Code session on this repo (claude.ai/code, the app, or the CLI) and just
talk, or use the skills (shared with the FODL tutor — they detect the course):

| Command | What it does |
|---|---|
| `/progress` | Dashboard: days to exam, coverage, weak spots, and a study plan. **Start here** — it will ask for your exam date. |
| `/teach <topic>` | Interactive lesson: intuition → precise definitions/formulas → mini-checks → where it appeared in past exams. |
| `/quiz [topic]` | Adaptive graded quiz, one question at a time, real point values. |
| `/exam past a_2024` | Take a real past exam under exam conditions, strictly graded /100. |
| `/exam new` | A freshly generated mock exam in the exact real format. |
| `/solve b_2023 2` | Socratic walkthrough of a specific past-exam question. |
| `/drill <topic>` | Brand-new exam-style exercises on a topic (novel variants of past patterns). |
| `/flashcards [topic]` | Rapid-fire definitions/formulas drill (feeds your two allowed formula pages). |

Free-form works too: *"when do I use Wilson instead of Wald?"*, *"test me on power
calculations"*, *"מה ההבדל בין מבחן וילקוקסון למבחן פרמוטציות?"* — the tutor answers
from the course materials and cites the week/exam it came from.

## What's inside

```
stats-exam-agent/
├── AGENT.md          # the tutor's operating manual (persona, rules, protocols)
├── progress.md       # your study memory: scores, weak spots, exams taken
├── index/            # the tutor's brain — generated from the PDFs
│   ├── TOPICS.md     #   topic map with exam-frequency stats
│   ├── EXAM_MAP.md   #   every past-exam question: points, topics, difficulty + archetypes
│   ├── CHEATSHEET.md #   the ~50 items that belong on your two formula pages
│   ├── exams/        #   full English translations + solution sketches per exam
│   └── lectures/     #   per-week notes (week_*) + slide-deck notes (slides_*)
├── generated_exams/  # tutor-generated mock exams + sealed rubrics (tracked in git)
└── materials/        # original course PDFs (ground truth) + text mirrors
```

Progress persists because the tutor commits `progress.md` at the end of each study
session — so every new session knows where you left off.

## ⚠️ First thing in every new session: restore the content

By your choice, the course PDFs and the generated `index/` are **not stored on GitHub**
(the repo is public). Keep **`stats-tutor-content.zip`** (Claude sent it to you on
2026-07-07) somewhere safe. When you start a fresh session:

1. Attach `stats-tutor-content.zip` to the chat.
2. Say "restore my statistics study content" — the tutor runs
   `bash stats-exam-agent/scripts/restore_content.sh <zip>` and you're ready to go.

(If you ever make the repo private, tell the tutor "commit the course content" once —
then you can drop the zip ritual forever. The `.gitignore` entries for
`stats-exam-agent/materials/` and `stats-exam-agent/index/` are the only thing to
remove.)

## The Study Hub website · אתר הלימוד

**https://1amirmanes98-ai.github.io/exam-prep-agent/stats/**

A single self-contained HTML file — no account, works offline on any phone, and fully
in **Hebrew (RTL)**. Everything runs in your browser; your progress is saved there too.

### What it contains & how to use it (English)

Seven tabs (bottom bar on mobile, side rail on desktop):

- **Overview (סקירה)** — set your exam date for a live countdown; read the exam
  *template* (average points per area — Descriptive / Estimation / Testing), the
  recurring question **archetypes** worth drilling, your progress, and your weakest
  topics. Includes a computed figure of the normal curve with the 5% rejection region.
- **Topics (נושאים)** — every syllabus topic: where it's taught, how often it's
  *actually* been tested (core / frequent / seen), and every past-exam question that
  tested it. Computed concept figures appear where they help (CLT, confidence-interval
  coverage, regression, QQ-plot, power, rank-sum). Tap a topic to drill or open its
  flashcards.
- **Ask (חיפוש)** — a search box over the whole corpus (weekly notes, slide decks, all
  19 exams with their sketches, the topic map). Type a term or question in **Hebrew or
  English** → exact quoted passages and where each appears. It *retrieves*, it doesn't
  reason — for worked answers, ask the tutor in a Claude session.
- **Exams (מבחנים)** — all **19 finals (2012–2025)**, tagged by area, with **collapsible
  solution sketches** (sealed until you open them). Plot-based questions now show a
  **drawn figure** (histogram, scatter + regression line, QQ-plot, boxplot, or
  residuals), and **every solution ends with a 💡 useful-trick box and a ⚠️ watch-out
  box**. Five exams have official solutions; those sketches follow them.
- **Memorize (לשינון)** — the check-off list for your two allowed formula pages (mark
  what you already know; saved in the browser).
- **Flashcards (כרטיסיות)** — definitions and theorems, drilled in an order that brings
  your recent **misses back first**; grade each card yourself.
- **Quiz (בוחן)** — a random real past-exam question: solve it on paper (calculator +
  formula sheets, like the real thing), reveal the sketch, and grade yourself honestly.

Exam conditions (3 hours, calculator + two double-sided formula sheets) are reflected
throughout. Site progress (exam date, flashcard/quiz stats, memorize checkboxes) lives
in the browser's **localStorage**, separate from the tutor's `progress.md`.

### מה יש באתר ואיך משתמשים בו (עברית)

קובץ HTML יחיד ועצמאי — בלי חשבון, עובד גם ללא חיבור לרשת בכל טלפון, וכולו **בעברית (RTL)**.
הכול רץ בדפדפן וגם ההתקדמות נשמרת בו. שבע לשוניות (סרגל תחתון בנייד, סרגל צד במחשב):

- **סקירה** — קבעו תאריך בחינה לספירה לאחור; ראו את *תבנית* המבחן (ממוצע נקודות לכל תחום —
  תיאורית / אמידה / מבחני השערות), את **דפוסי השאלות** החוזרים ששווה לתרגל, את ההתקדמות
  ואת הנושאים החלשים שלכם. כולל איור מחושב של העקומה הנורמלית עם אזור הדחייה של 5%.
- **נושאים** — כל נושא בסילבוס: היכן נלמד, כמה פעמים *באמת* נבחן (ליבה / נפוץ / הופיע), וכל
  שאלת מבחן שבדקה אותו. איורים מושגיים מחושבים מופיעים היכן שהם עוזרים (משפט הגבול המרכזי,
  כיסוי רווח סמך, רגרסיה, QQ-plot, עוצמה, מבחן דירוגים). לחצו על נושא כדי לתרגל או לפתוח
  את הכרטיסיות שלו.
- **חיפוש** — תיבת חיפוש על כל התוכן (סיכומי השבועות, השקפים, כל 19 המבחנים עם הסקיצות, מפת
  הנושאים). הקלידו מונח או שאלה **בעברית או באנגלית** → ציטוטים מדויקים והיכן כל אחד מופיע.
  זה **מחפש, לא חושב** — לתשובות מלאות פנו למתרגל בשיחת Claude.
- **מבחנים** — כל **19 המבחנים (2012–2025)**, מתויגים לפי תחום, עם **סקיצות פתרון מתקפלות**
  (חתומות עד שתפתחו). שאלות מבוססות-גרף מציגות עכשיו **איור מצויר** (היסטוגרמה, פיזור + קו
  רגרסיה, QQ-plot, תרשים קופסה, או שאריות), ו**כל פתרון מסתיים בתיבת 💡 טריק שימושי ובתיבת
  ⚠️ זהירות**. לחמישה מבחנים יש פתרונות רשמיים, והסקיצות שלהם נאמנות להם.
- **לשינון** — רשימת סימון של מה שכדאי לדעת בעל-פה לשני דפי הנוסחאות (סמנו מה שכבר ידוע; נשמר
  בדפדפן).
- **כרטיסיות** — הגדרות ומשפטים, בסדר שמחזיר קודם את מה **שפספסתם** לאחרונה; דרגו כל כרטיס
  בעצמכם.
- **בוחן** — שאלה אקראית ממבחן עבר: פתרו על דף (מחשבון + דפי נוסחאות, כמו במבחן האמיתי), חשפו
  את הסקיצה, ותנו לעצמכם ציון בכנות.

תנאי הבחינה (3 שעות, מחשבון + שני דפי נוסחאות דו-צדדיים) משתקפים לאורך האתר. התקדמות באתר
(תאריך בחינה, סטטיסטיקות כרטיסיות/בוחן, סימוני שינון) נשמרת ב-**localStorage** של הדפדפן,
בנפרד מ-`progress.md` של המתרגל.

### Rebuilding the site · בנייה מחדש של האתר

After the index changes, rebuild `docs/stats/index.html` (needs restored content +
internet for the KaTeX/marked libs) · אחרי שינוי באינדקס, בנו מחדש את הקובץ:

```bash
L=/tmp/site-libs; mkdir -p $L/fonts
for f in katex.min.js katex.min.css contrib/auto-render.min.js; do
  curl -sL "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/$f" -o "$L/$(basename $f)"; done
curl -sL "https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js" -o "$L/marked.min.js"
# fonts: KaTeX_{Main-{Regular,Bold,Italic,BoldItalic},Math-{Italic,BoldItalic},Size{1..4}-Regular,AMS-Regular,Caligraphic-Regular,Typewriter-Regular}.woff2
python3 stats-exam-agent/scripts/build_site.py stats-exam-agent/index $L \
  stats-exam-agent/scripts/site_template.html /tmp/stats-study-hub.html docs/stats/index.html
```

Then commit + push `docs/stats/index.html` — `.github/workflows/pages.yml` redeploys
automatically. **Deploys run from `main`, so a side-branch push needs a merge to `main`
first** (הפריסה רצה מ-`main` בלבד — דחיפה לענף צד דורשת מיזוג ל-`main`).
