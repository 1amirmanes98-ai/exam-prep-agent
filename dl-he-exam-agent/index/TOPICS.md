# יסודות הלמידה העמוקה — מפת כיסוי נושאים
כל נושא שנלמד בקורס, מוצלב מול המקום שבו נבחן. נבנה על ידי ניתוח `index/exams/*.md`.

## Pillar 1 — Expressiveness

| Topic | Taught | Examined | Priority |
|---|---|---|---|
| אפיון לינארי/קבוע למקוטעין של רשתות ReLU / leaky-ReLU / סימן | lecture_02 §1; hw_expressiveness | example_Q1, a2020_Q1, a2021_Q1, b2021_Q1, b2022_Q1, a2023_Q1, c2024_Q1 | 🔴 |
| אוניברסליות (כולל הוכחת אי-אוניברסליות) | lecture_02 (Heine–Cantor $L^1$ argument) | example_Q1, a2021_Q1, b2020_Q1, b2022_Q1, a2024_Q1, b2024_Q1, c2024_Q1 | 🔴 |
| הפרדת עומק / יעילות ביטוי (sawtooth של Telgarsky; טיעוני ספירה/VC) | lecture_02 §1.2; hw_expressiveness | a2020_Q1, b2021_Q1(neg.), a2022_Q1, b2022_Q1, b2023_Q1, b2024_Q1 | 🔴 |
| שיטות טנזור: פירוקי CP/HT, Kronecker, דרגת מטריציזציה, דרגת הפרדה | lecture_02 §2; recitation kronecker_expressiveness | b2020_Q1, a2022_Q1 | 🟠 |
| RNN לינאריים / מרחבי השערות של מרחב-מצבים (אלכסוני ⊂ סימטרי ⊂ כללי) | recitations + hw (SSM material); lecture_01 framing | a2024_Q1, b2024_Q2 — **new 2024 trend** | 🟠 |
| ממד VC ככלי לספירת יעילות | lecture_06 (context); b2023 exam | b2023_Q1 | 🟡 |

## Pillar 2 — Optimization

| Topic | Taught | Examined | Priority |
|---|---|---|---|
| gradient flow: הגדרה, מונוטוניות ההפסד, עבודה עם $\dot w = -\nabla L(w)$ | lecture_04 §1; recitation gradient_flow | 11 of 12 exams' Q2 | 🔴 |
| רשתות לינאריות עמוקות: balancedness / חוקי שימור, דינמיקת end-to-end | lecture_04 §2 | a2020_Q2, b2021_Q2, a2022_Q2, a2023_Q2, b2022_Q2, b2023_Q2, a2024_Q2, c2024_Q2 | 🔴 |
| רשתות לינאריות סקלריות: התכנסות אקספוננציאלית באמצעות גדלים נשמרים | lecture_04; recitation gradient_flow | a2020_Q2, b2021_Q2, c2024_Q2 (b2021≡c2024) | 🔴 |
| פירוק מטריצות ($W=UU^\top$, Hadamard/אלכסוני): דינמיקה, הטיה לדרגה נמוכה | lecture_08 (dynamics), lecture_04 | a2021_Q2, b2023_Q2, a2024_Q2 | 🔴 |
| הוכחות אי-קמירות (סימטריית תמורות, דוגמאות נגדיות מפורשות) | lecture_03 §1 | a2021_Q2, a2024_Q2, b2024_Q2, example_Q2 | 🟠 |
| נוף: נקודות נייחות, אוכפים ממש, מינימות מזויפות, נקודות קריטיות בפרמטריזציית-יתר | lecture_03 §3–4 | a2020_Q2, a2022_Q2, example_Q2 | 🟠 |
| חלקות, למת הירידה, התכנסות GD לנייחות | lecture_03 §2; recitation optimization_1 | example_Q2 (+ implicit prerequisite everywhere) | 🟠 |
| תנאי PL → קצב לינארי | lecture_04 §3 | a2023_Q2 | 🟡 |
| משטר NTK: $\dot u = -H(t)(u-y)$, פירוק ספקטרלי, שקילות לרגרסיית גרעין | lecture_05 | b2020_Q2 | 🟡 |
| רשתות ReLU רדודות: שימור סימן ב-GF, שימור, רמות הפסד בלתי-נתונות-להשגה | lecture_03/04 + exams | a2022_Q2, b2022_Q2 | 🟠 |

## Pillar 3 — Generalization

| Topic | Taught | Examined | Priority |
|---|---|---|---|
| Hoeffding + חסם איחוד → התכנסות אחידה למחלקות סופיות/מקוונטטות | lecture_06 §2 (Prop 1); lecture_01 | a2021_Q3, a2022_Q3, a2023_Q3, b2023_Q3, a2024_Q3, b2024_Q3, c2024_Q3, example_Q3 | 🔴 |
| חסמי SRM / משוקללים ("קופסה שחורה") על תת-מחלקות מקוננות או ממופתחות | lecture_06; hw_optimization | b2020_Q3, a2023_Q3, a2024_Q3, b2024_Q3, c2024_Q3 | 🔴 |
| כיסוי / $\epsilon$-דיסקרטיזציה + העברת Lipschitz | lecture_06 (Prop 1 proof); a2023/c2024 | a2023_Q3, c2024_Q3 (nearly identical) | 🟠 |
| הסיפור של רגולריזציה מרומזת (Zhang et al.; מדוע UC לבדה נכשלת; אינטרפולציה) | lecture_06 §1, lecture_07 | a2021_Q3, b2023_Q3, example_Q3 (+ flavors everywhere) | 🔴 |
| הטיה מרומזת של GD → פתרון נורמה-מינימלית ($X(X^\top X)^{-1}y$; GD נשאר במרחב השורות) | lecture_07 §1 | a2020_Q3, b2022_Q3 | 🟠 |
| חסמים מבוססי-נורמה; איחוד אדפטיבי-לנורמה על רדיוסים | lecture_06 (Neyshabur), lecture_07 | a2020_Q3, b2020_Q3, b2021_Q3, b2022_Q3, b2024_Q3 | 🟠 |
| מורכבות Rademacher (הגדרה, משפט מרכזי, מחלקות לינאריות) | lecture_06 §4; recitation optimization_2_radamacher | a2020_Q3, b2021_Q3 | 🟠 |
| PAC-Bayes (חסם KL, priors/posteriors גאוסיים, מלכודות של prior תלוי-נתונים) | lecture_06 §5 | a2022_Q3, example_Q3 | 🟡 |
| פירוק מטריצות עמוק: דינמיקת ערכים סינגולריים, הפרכת השערת הנורמה הגרעינית | lecture_08 | a2024_Q2/Q3 (low-rank SRM flavor) | 🟠 |
| השערת הנפח (רוחב הורג אותה, עומק מאשש אותה) | lecture_09 | not yet examined — plausible new-question source | 🟡 |
