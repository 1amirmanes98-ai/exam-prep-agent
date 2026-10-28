# Solution style — every exam and mock solution is written this way

**תקציר בעברית:** כל פתרון באתרים (מבחני עבר, מבחני בית, מבחני דוגמה; עברית ואנגלית) נכתב כך
שסטודנט שלא פתר את השאלה יוכל לעקוב אחרי כל צעד בלי להשלים חורים לבד. לכל סעיף שמונה רכיבים
קבועים, בסוף כל שאלה "טעויות נפוצות" ואז 💡/⚠️, כל מספר מאומת ב-Python, ויש כללי ניסוח מחייבים
לטקסט מימין לשמאל. מסמך זה הוא המקור; AGENT.md של כל קורס והנחיות יצירת מבחני דוגמה מפנים אליו.

Owner's standing rule (2026-10): solutions are too short when they leave holes. A student who did
not solve the question must be able to follow every step without filling gaps. This applies to past
exams (`index/exams/*.md`, including the sample and home exams) and to mock exams
(`generated_exams/mock_exam_*_solutions.md`), in Hebrew and English, in every course.

## 1. What stays fixed

- **The statement and the final answers do not change.** If you find an error (a wrong number, a
  false claim, a missing case), fix it and log it (section 7) — never silently.
- **Hints do not change** (`**Hint:**` blocks / bullets).
- Parser markers stay exactly as they are (`## Q<n> (<pts> pts) — `, `**Topics:**`, `**Pillar:**`,
  `**Difficulty:**`, `**Maps to:**`, `**Hint:**`, `**Statement …:**`, `**Solution sketch:**` for past
  exams, `**Full solution:**` for mocks, `## Question N (P pts) — ` in mock statements).
- The 💡 and ⚠️ callouts stay, and stay the **last two paragraphs** of each question block. Keep
  their text; edit only to fix an error or an RTL-rule violation (section 4).

## 2. Per-part structure (every sub-part a, b, c, …)

Start each part with a bold leader line in the course's existing style — RL letters its parts
`**(a) <short title>**`, DL numbers them `**1. <short title>**` (DL mocks keep the points tag:
`**1. (10) <short title>**`) — then these labelled paragraphs, in this order. Labels are bold and
end with a period.

| # | Hebrew label | English label | Content |
|---|---|---|---|
| 1 | `**מה שואלים.**` | `**What is asked.**` | One sentence in words, plus the form of the answer: number, formula, proof, or counterexample. |
| 2 | `**הכלי ולמה.**` | `**Tool and why.**` | Which method (backward induction, threshold structure, guess-and-verify, chain rule, union bound, …) and why it fits *here*. Cite the cheat-sheet section: `(דף עזר, סעיף N)` / `(cheat sheet §N)` — numbering in section 6. |
| 3 | `**הגדרות.**` | `**Definitions.**` | Every new symbol defined in words before use, including *why* it is introduced. Write "אין סימונים חדשים" / "No new notation" if none. |
| 4 | `**פתרון.**` | `**Solution.**` | Step by step: `שלב 1, <what this step does>: …` / `Step 1, <what>: …`, one move per step, each with a short reason ("כי…", "לפי…", "מהגדרת…" / "because…", "by…", "by definition of…"). No skipped algebra. In every numeric computation show where each number comes from. Many intermediate values → a table. |
| 5 | (proofs, inside 4) | | State the claim explicitly (`**טענה.**` / `**Claim.**`); say what the induction is on and in which direction; `**בסיס.**`, `**הנחת האינדוקציה.**`, `**צעד.**` (`**Base.**`, `**Hypothesis.**`, `**Step.**`) as separate paragraphs; say exactly where the hypothesis is used. "Equivalent" / "strictly better" → show the inequality, don't just assert it. True/false questions: a clear verdict first, then a full proof or a complete counterexample with all numbers. |
| 6 | `**במילים.**` | `**In words.**` | A short paragraph of intuition: why the result makes sense. |
| 7 | `**בדיקת שפיות.**` | `**Sanity check.**` | An edge case, substituting back, or comparing to a naive policy/choice. |
| 8 | `**מה לכתוב במבחן.**` | `**What to write in the exam.**` | The minimal version that earns full credit, 3–6 lines, as a bullet list (each bullet starts with a word, not with math). |
| — | `*אומת: …*` | `*Verified: …*` | Last line of the part, italic: one line on how it was verified in Python (exact DP / fractions, simulation, finite differences, randomized tests). |

At the end of each question, **before** 💡 and ⚠️: `**טעויות נפוצות.**` / `**Common mistakes.**`
followed by 2–3 bullets (concrete mistakes and what they lead to).

Reference implementation: Q1 of `rl-he-exam-agent/generated_exams/mock_exam_04_solutions.md`.

## 3. Correctness

- Recompute **every** number in Python before writing it (scripts live outside the repo). Exact
  fractions where possible; Monte-Carlo / finite differences / randomized inequality tests otherwise.
- Every proof step must be valid at exam level; every counterexample must be recomputed.
- Final answers in `\boxed{}`.

## 4. Formatting rules (sites are RTL Hebrew and LTR English, Markdown + KaTeX)

These are hard rules; two scripts check them (section 8).

1. An equation with **more than one relation sign** (`=`, `<`, `>`, `\le`, `\ge`, `\ne`, `\approx`,
   `\iff`, `\Rightarrow`, …; sum/product limits and `cases` do not count) goes on its own display
   line `$$…$$`. Chains use `\begin{aligned}…\end{aligned}`, **one step per row**.
2. Never write ⇒ ⇐ ⇔ → ← ≤ ≥ < > or square brackets `[ ]` in Hebrew prose outside math — they flip
   in RTL. They belong only inside `$…$`.
3. Do not wrap a lone formula in parentheses inside a Hebrew sentence; do not put two English words
   in a row with an arrow between them.
4. No Hebrew mixed with numbers or symbols inside one formula (`\Pr[\text{תשלום }0]` renders with the
   0 on the wrong side). A single Hebrew word alone in `\text{}` is fine; otherwise define a symbol in
   words ("נסמן ב-$P_0$ את …") and use it.
5. Keep inline formulas short (≈ 35 characters); longer → display. Long sample lists → several short
   inline formulas so the line can wrap. Phones are 390px wide: nothing may overflow.
6. Tables: at most 4 narrow columns (transpose wide ones).
7. Markdown: separate paragraphs with a blank line (single newlines merge lines into one paragraph);
   a blank line before and after every `$$…$$` block and around lists; Hebrew list items start with a
   Hebrew word, not with math.
8. KaTeX only: no `\[ \]`, no `align*`, no macros, no `\label`; no `\qquad`-joined displays wider than
   ~70 characters (stack them).

## 5. Both languages

Hebrew and English versions of the same file are written together and carry **identical math**
(same `$…$` / `$$…$$` spans in the same order; only `\text{}` arguments may differ). The EN↔HE parity
gate must pass. Hebrew: natural academic Hebrew, plural imperative, terminology from the course's
Hebrew index. Mock solution labels: Hebrew `**💡 טריק.**` / `**⚠️ שים לב.**`; English
`**💡 Trick.**` / `**⚠️ Watch out.**` (RL) and `**💡 Useful tricks:**` / `**⚠️ Watch out:**` (DL).

## 6. Cheat-sheet section numbers (cite as "דף עזר, סעיף N")

**Reinforcement Learning** (the owner's A4 double-sided sheet):
1 הגדרות V ו-Q · 2 משוואות בלמן · 3 VI ו-PI, איטרציות Q ו-V, אופק סופי · 4 עצירה אופטימלית ומבנה
סף · 5 טרנספורמציות תגמול · 6 אופרטורים, כיווץ ונקודת שבת · 7 למידה ללא מודל · 8 קירוב פונקציות
(GD, SGD, MC-SGD) · 9 Policy Gradient ו-REINFORCE עם טבלת score · 10 Bandits · 11 POMDP ו-LQR ·
12 מידול סיפור כ-MDP · 13 סדר עבודה לכל שאלה.

**Foundations of Deep Learning** (built from `dl-exam-agent/index/CHEATSHEET.md`):
1 הגדרות יסוד: $L_D$, $L_S$, פער הכללה, פירוק השגיאה לשלושת העמודים · 2 כלים הסתברותיים: Hoeffding,
חסם איחוד, SRM ומשקלות $\delta_k$, KL בין גאוסיאנים · 3 כלים מאלגברה לינארית: דרגה ו-SVD, פירוק
ספקטרלי, חזקות מטריצה, מנת Rayleigh · 4 אוניברסליות ויעילות ביטוי (הגדרות) · 5 רשתות לינאריות
למקוטעין וספירת מקטעים: ReLU, sign, sawtooth, הרכבה · 6 טנזורים ודרגה: CP/HT, matricization, דרגת
הפרדה · 7 Gradient flow, החלקות, למת הירידה, נקודות קריטיות ואוכפים · 8 חוקי שימור, balancedness
ודינמיקה מקצה לקצה · 9 PL וקצבי התכנסות, NTK ודינמיקת החיזוי · 10 מחלקה סופית, ספירת ביטים,
כיסוי וטרנספר ליפשיץ · 11 Rademacher, חסמים מסתגלי נורמה, PAC-Bayes · 12 הטיה מרומזת ואינטרפולציה:
min-norm, תוויות אקראיות, חסמים ריקים · 13 סדר עבודה לכל שאלה.

English sites use the same numbers: `(cheat sheet §N)`.

## 7. Corrections log

Every change to a statement, a final answer, a numeric value, or a claim is logged in the commit
message and reported to the owner: file · question · part · what was wrong · what it is now · how
it was verified.

## 8. Checks (run on every rewritten file before committing)

`python3 replication/checks/solution_style_check.py <en.md> <he.md> --structure` runs the first three
(parity, multirel, rtl, plus a Hebrew-next-to-digit check inside math, and — with `--structure` —
the per-part labels). Then:

- `multirel` — no inline formula with 2+ relation signs.
- `rtl_chars` — no ⇒ ≤ ≥ < > [ ] → in prose outside math.
- EN↔HE parity gate on the file pair.
- Build both sites; `replication/checks/run_all.sh` green (EN, and HE with `--rtl`); every math span
  renders; no page overflow at 390px on the rewritten questions.
