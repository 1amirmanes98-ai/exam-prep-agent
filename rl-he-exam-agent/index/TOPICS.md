# למידה מחיזוקים — מפת נושאים

למבחן יש **צורה יציבה מאוד** (נמדד על פני כל 18 המבחנים המאונדקסים,
2018–2025 + מבחן לדוגמא):

- **Q1 — Planning (100% מהמבחנים).** מדלים בעיה סיפורית כ-MDP ⟨S,A,R,P,s₀⟩,
  ואז מחשבים את המדיניות / הערך האופטימליים (איטרציית ערך, צורה סגורה).
- **Q2 — שאלת התנודה.** **Learning** ללא מודל (5×), שאלת **Planning**
  שנייה (8×), או **Bandits** (5×).
- **Q3 — Approximation (100% מהמבחנים).** מדיניות-גרדיאנט / REINFORCE: גזרו את
  הניקוד ∇log π עבור מדיניות פרמטרית נתונה וכתבו את העדכון.
- **Q4 — Planning (17/18).** הוכיחו שאופרטור מסוג בלמן נתון הוא γ-כיווץ,
  איטרו אותו, וזהו את נקודת השבת שלו (לעיתים קרובות: האם היא Vπ/Qπ של איזושהי מדיניות?).

משקל נקודות: **Planning ≈57%, Approximation ≈25%, Learning ≈9%, Bandits ≈7%.**
Q1 ו-Q3 מובטחים למעשה — שלטו בארכיטיפים אלו ראשונה, ואז בהוכחת הכיווץ של Q4,
ואז החליטו האם לתת עדיפות ל-Learning או ל-Bandits עבור Q2.

מפתח עדיפות: 🔴 ליבה (כמעט כל מבחן) · 🟠 תדיר · 🟡 נראה לפחות פעם אחת / נלמד.

## Pillar 1 — Planning

| topic | taught | examined | priority |
|---|---|---|---|
| פורמליזציית MDP (כתיבת ⟨S,A,R,P,s₀⟩ עבור סיפור) | lecture_03, recitation_03 | a2018_Q1, a2019_Q1, a2020_Q1, a2021_Q1, a2022_Q1, a2023_Q1, a2024_Q1, a2025_Q1, b2018_Q1, b2019_Q1, b2020_Q1, b2021_Q1, b2022_Q1, b2023_Q1, b2024_Q1, b2025_Q1, c2025_Q1, example_Q1 | 🔴 |
| איטרציית ערך ומדיניות / ערך אופטימליים | lecture_04, recitation_04 | a2018_Q1, a2019_Q1, a2020_Q1, a2024_Q1, b2018_Q1, b2019_Q1, b2020_Q1, b2021_Q1, b2025_Q1, c2025_Q1, example_Q1 | 🔴 |
| אופרטורי בלמן והוכחות γ-כיווץ (נקודת שבת) | lecture_04, recitation_04 | a2018_Q4, a2019_Q4, a2020_Q4, a2021_Q4, a2022_Q4, a2023_Q4, a2024_Q4, a2025_Q4, b2018_Q4, b2020_Q4, b2021_Q4, b2022_Q4, b2023_Q4, b2024_Q4, b2025_Q4, c2025_Q4, example_Q4 | 🔴 |
| הערכת מדיניות (משוואות לינאריות / אלגברת Qπ) | lecture_04, recitation_04 | a2021_Q1, a2022_Q1, b2018_Q4, b2022_Q1, b2025_Q4 | 🟠 |
| מדיניות אופטימלית מסוג סף / מבנית (מונוטוניות) | lecture_03, lecture_04 | a2021_Q1, a2022_Q1, a2023_Q1, a2024_Q1, b2023_Q1, c2025_Q1 | 🟠 |
| DP באופק סופי ודטרמיניסטי (אינדוקציה לאחור) | lecture_02, recitation_02 | a2020_Q1, a2025_Q2, b2018_Q1, b2020_Q1, b2021_Q1, b2023_Q1, b2024_Q1, b2025_Q1, c2025_Q1 | 🟠 |
| לינאריות הערך בתגמול ואינווריאנטיות המדיניות האופטימלית | lecture_04, recitation_04 | a2023_Q2, a2025_Q2, b2021_Q2, b2022_Q2, b2024_Q2, b2025_Q2 | 🟠 |
| POMDP / belief-MDP (עדכון אמונה, VI על אמונות) | recitation_11 | a2022_Q2, b2021_Q4 | 🟠 |
| איטרציית מדיניות | lecture_04, recitation_04 | b2021_Q1 | 🟡 |
| LQR (בקירות, Riccati / DARE, משוב לינארי) | lecture_12, recitation_12 | b2019_Q2 | 🟡 |
| RL מבוסס-מודל (Rmax, למת הסימולציה, שגיאת מודל) | lecture_05, recitation_05 | — | 🟡 |

## Pillar 2 — Learning

| topic | taught | examined | priority |
|---|---|---|---|
| חיזוי מונטה-קרלו (ביקור-ראשון מול כל-ביקור) | lecture_06, recitation_06 | b2018_Q2, b2020_Q2 | 🟠 |
| TD(0) / TD(λ) ועקבות זכאות על מסלול | lecture_07, recitation_07 | a2020_Q2, example_Q2 | 🟠 |
| Q-learning ו-SARSA (בקרת TD off-policy מול on-policy) | lecture_06, recitation_06 | a2018_Q2 | 🟠 |
| התכנסות: Robbins-Monro / קירוב סטוכסטי | lecture_06, lecture_07 | a2020_Q2 | 🟡 |
| דגימת חשיבות ו-actor-critic | lecture_07, recitation_07 | — | 🟡 |
| RL הפוך / חניכות / RLHF (מסומן כאופציונלי) | lecture_11, lecture_13 | — | 🟡 |

## Pillar 3 — Approximation

| topic | taught | examined | priority |
|---|---|---|---|
| מדיניות-גרדיאנט / REINFORCE (ניקוד ∇log π של מדיניות פרמטרית) | lecture_09, recitation_09 | a2018_Q3, a2019_Q3, a2020_Q3, a2021_Q3, a2022_Q3, a2023_Q3, a2024_Q3, b2020_Q3, b2021_Q3, b2022_Q3, b2023_Q3, b2024_Q3, example_Q3 | 🔴 |
| משפט מדיניות-גרדיאנט (ניסוח וגזירה) | lecture_09 | a2019_Q3, a2023_Q3 | 🟠 |
| קירוב פונקציות (לינארי, SGD; מטרות MC/TD) | lecture_08, recitation_08 | a2021_Q3, a2025_Q3, b2018_Q3, b2019_Q3, b2025_Q3, c2025_Q3 | 🟠 |
| התבדרות off-policy ו-semi-gradient TD | lecture_08 | b2018_Q3 | 🟡 |

## Pillar 4 — Bandits

| topic | taught | examined | priority |
|---|---|---|---|
| מזעור חרטה (חקירה-ניצול, Hoeffding, חרטת UCB) | lecture_10, recitation_10 | a2024_Q2, b2019_Q4, b2023_Q2 | 🟠 |
| זיהוי הזרוע הטובה ביותר (UCB/LCB, חיסול עוקב, PAC) | lecture_10, recitation_10 | a2019_Q2, a2021_Q2, c2025_Q2 | 🟠 |
| חיסול חציוני וחסמי מדגם PAC | lecture_10, recitation_10 | a2019_Q2 | 🟡 |
