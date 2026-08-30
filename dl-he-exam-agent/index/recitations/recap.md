# תרגול: שאלות ותשובות על חומר הרענון (תרגול 3)
- **File:** materials/recitations/recap.pdf
- **Related lectures:** רקע מתמטי המשמש לאורך כל הקורס — lecture_02_expressiveness (SVD, דרגה, נורמת פרובניוס), lecture_03_optimization_1 / lecture_04_optimization_2 / lecture_05_optimization_3 (ערכים עצמיים, חסמי מנת-Rayleigh, עקמומיות/נקודות קריטיות, קמירות), lecture_06_generalization_1+ (נורמות)
- **Summary:** רענון בסגנון שאלות-ותשובות של הדרישות המתמטיות המוקדמות: אלגברה לינארית (דרגה דרך SVD, עקבה = סכום ערכים עצמיים, זהויות נורמת פרובניוס, חסמי מנת-Rayleigh על תבניות ריבועיות), חשבון רב-משתני (תנאי מסדר שני: נקודה קריטית שבה להסיאן יש ערך עצמי שלילי אינה מינימום מקומי — מוכח על ידי צמצום לישר לאורך הווקטור העצמי בעל העקמומיות השלילית ביותר), ונורמות (כל נורמה קמורה, אף נורמה אינה קמורה-ממש). כל אחת משש השאלות היא הוכחה קצרה ופתורה במלואה; כלים אלה (ספקטרום $A^\top A$, ציקליות $\mathrm{Tr}$, $\lambda_{\min}\|x\|^2 \le x^\top Ax \le \lambda_{\max}\|x\|^2$, טיעוני צמצום-לישר) הם צעדי-העבודה בהוכחות האופטימיזציה וכושר הביטוי של הקורס.

## נושאים שנסקרו
- SVD $A = U\Sigma V^\top = \sum_{i=1}^r \sigma_i u_i v_i^\top$ ודרגה: $\operatorname{rank}(A) = \operatorname{rank}(A^\top A) = \operatorname{rank}(AA^\top)$
- עקבה של מטריצה סימטרית = סכום ערכים עצמיים (תכונת הציקליות של העקבה + EVD אורתוגונלי)
- נורמת פרובניוס: הגדרה דרך ערכים סינגולריים לעומת הגדרה רכיבית; $\|A\|_F^2 = \operatorname{Tr}(A^\top A) = \langle A, A\rangle$
- חסמי מנת-Rayleigh עבור $A$ סימטרית: $\lambda_{\min}(A)\|x\|_2^2 \le x^\top Ax \le \lambda_{\max}(A)\|x\|_2^2$
- אופטימליות מסדר שני: נקודה קריטית + $\lambda_{\min}(\nabla^2 g(w_0)) < 0$ $\Rightarrow$ אינה מינימום מקומי (כיוון אוכף ממש)
- נורמות: קמירות (אי-שוויון המשולש + הומוגניות); כישלון קמירות-ממש (נקודות קולינאריות)

## בעיות פתורות וגזירות
**P1 (Q1).** עבור $A \in \mathbb{R}^{m,n}$, הוכיחו

$$\operatorname{rank}(A) = \operatorname{rank}(A^\top A) = \operatorname{rank}(AA^\top)$$

טכניקה: SVD

$$A = \sum_{i=1}^r \sigma_i u_i v_i^\top$$

עם $r = \operatorname{rank}(A)$; אורתוגונליות של $U$ נותנת

$$A^\top A = V\Sigma^\top\Sigma V^\top = \sum_{i=1}^r \sigma_i^2 v_i v_i^\top$$

(דרגה $r$), ובאופן סימטרי

$$AA^\top = \sum_{i=1}^r \sigma_i^2 u_i u_i^\top$$

**P2 (Q2).** עבור $A \in \mathbb{R}^{n,n}$ סימטרית, הוכיחו

$$\operatorname{Tr}(A) = \sum_{i=1}^n \lambda_i(A)$$

טכניקה: EVD אורתוגונלי $A = UDU^\top$; תכונת הציקליות:

$$\operatorname{Tr}(UDU^\top) = \operatorname{Tr}(U^\top UD) = \operatorname{Tr}(D) = \sum_i \lambda_i(A)$$

**P3 (Q3).** עם

$$\|A\|_F := \sqrt{\sum_{i=1}^{\min\{m,n\}} \sigma_i^2(A)}$$

, הוכיחו

$$\|A\|_F = \sqrt{\sum_{i=1}^m\sum_{j=1}^n A_{ij}^2}$$

טכניקה: $\sigma_1^2(A),\dots$ הם הערכים העצמיים של $A^\top A$; לפי P2,

$$\sum_i \sigma_i^2(A) = \operatorname{Tr}(A^\top A) = \langle A, A\rangle = \sum_{ij} A_{ij}^2$$

, בעזרת $\operatorname{Tr}(X^\top Y) = \langle X, Y\rangle$.

**P4 (Q4).** עבור $A$ סימטרית ו-$x \in \mathbb{R}^n$, הוכיחו

$$\|x\|_2^2\,\lambda_{\min}(A) \le x^\top Ax \le \|x\|_2^2\,\lambda_{\max}(A)$$

טכניקה: EVD $A = UDU^\top$, הציבו $q := U^\top x$:

$$x^\top Ax = q^\top Dq = \sum_i q_i^2\lambda_i(A) \le \lambda_{\max}(A)\|q\|_2^2$$

; אורתוגונליות שומרת נורמות,

$$\|q\|_2^2 = x^\top UU^\top x = \|x\|_2^2$$

; החסם התחתון אנלוגי.

**P5 (Q5).** תהי $g \in C^2(\mathbb{R}^d)$, $\nabla g(w_0) = 0$, וגם $\lambda_{\min}(\nabla^2 g(w_0)) < 0$. הוכיחו ש-$w_0$ אינה מינימום מקומי.
טכניקה: קחו וקטור עצמי יחידה $v$ של $\lambda_{\min}$ וצמצמו לישר $f(t) := g(w_0 + tv)$. אזי $f'(t) = \nabla g(w_0+tv)^\top v$, $f''(t) = v^\top\nabla^2 g(w_0+tv)v$, ולכן $f'(0) = 0$ וגם

$$f''(0) = \lambda_{\min}(\nabla^2 g(w_0))\|v\|_2^2 < 0$$

. רציפות $f''$ נותנת $\delta > 0$ עם $f'' < 0$ על $(-\delta,\delta)$ $\Rightarrow$ $f'$ יורדת $\Rightarrow$ $f'(t) < f'(0) = 0$ על $(0,\delta)$ $\Rightarrow$ $f$ יורדת ממש על $[0,\delta)$ $\Rightarrow$ $0$ אינו מינימום מקומי של $f$, ומכאן $w_0$ אינו מינימום מקומי של $g$.

**P6 (Q6).** הוכיחו שכל נורמה $\|\cdot\|$ על $\mathbb{R}^d$ קמורה אך אינה קמורה-ממש.
טכניקה: קמירות — אי-שוויון המשולש ואז הומוגניות מוחלטת:

$$\|\lambda x + (1-\lambda)y\| \le \|\lambda x\| + \|(1-\lambda)y\| = \lambda\|x\| + (1-\lambda)\|y\|$$

. לא ממש — בחרו $y = 2x$ קולינאריים עם $x \ne 0$:

$$\|\lambda x + (1-\lambda)2x\| = (\lambda + 2(1-\lambda))\|x\| = \lambda\|x\| + (1-\lambda)\|2x\|$$

, כלומר שוויון מתקיים עבור $\lambda \in (0,1)$.

## נוסחאות ועובדות מפתח
- SVD: $A = U\Sigma V^\top = \sum_{i=1}^r \sigma_i u_i v_i^\top$, $r = \operatorname{rank}(A)$; $A^\top A = \sum_i \sigma_i^2 v_i v_i^\top$, $AA^\top = \sum_i \sigma_i^2 u_i u_i^\top$ — ולכן $\sigma_i^2(A)$ הם הערכים העצמיים השונים מאפס של שתי מטריצות Gram.
- $\operatorname{rank}(A) = \operatorname{rank}(A^\top A) = \operatorname{rank}(AA^\top)$.
- $A$ סימטרית: $\operatorname{Tr}(A) = \sum_{i=1}^n \lambda_i(A)$; תכונת ציקליות $\operatorname{Tr}(XYZ) = \operatorname{Tr}(ZXY)$.
- $\|A\|_F^2 = \sum_i \sigma_i^2(A) = \operatorname{Tr}(A^\top A) = \langle A,A\rangle = \sum_{ij}A_{ij}^2$; זהות $\operatorname{Tr}(X^\top Y) = \langle X,Y\rangle$.
- חסמי Rayleigh ($A$ סימטרית): $\lambda_{\min}(A)\|x\|_2^2 \le x^\top Ax \le \lambda_{\max}(A)\|x\|_2^2$; הכפלה במטריצה אורתוגונלית שומרת נורמת $\ell_2$.
- תנאי הכרחי מסדר שני: מינימום מקומי $\Rightarrow$ $\nabla g(w_0) = 0$ וגם $\nabla^2 g(w_0) \succeq 0$; ההיפוך-הלוגי מוכח כאן דרך צמצום חד-ממדי $f(t) = g(w_0 + tv)$ עם $f'(t) = \nabla g(w_0+tv)^\top v$, $f''(t) = v^\top \nabla^2 g(w_0+tv)v$.
- תכונות נורמה שנעשה בהן שימוש: אי-שוויון המשולש, הומוגניות מוחלטת $\|\alpha x\| = |\alpha|\|x\|$; כל נורמה קמורה; אף נורמה אינה קמורה-ממש (שוויון לאורך קרניים דרך הראשית).

## נקודות רלוונטיות למבחן
- שש ההוכחות האלה הן ארגז הכלים הסטנדרטי המופעל בתוך פתרונות מבחן ארוכים ב-FODL: דרגת מטריצות Gram ו-$\sigma_i^2(A) = \lambda_i(A^\top A)$ מופיעות בשאלות פירוק-מטריצות/כושר-ביטוי; חסם Rayleigh בשימוש מתמיד בניתוחי התכנסות GD (חסימת $x^\top H x$ בערכים עצמיים קיצוניים).
- P5 היא בדיוק טיעון ה-"אוכף הממש" בשימוש בעמוד התווך של האופטימיזציה (מדוע עקמומיות שלילית בנקודה קריטית פירושה שקיימים כיווני בריחה); שחזור הוכחת הצמצום-לישר הוא חומר מבחן קלאסי.
- דעו את שתי ההגדרות של נורמת פרובניוס (ערכים סינגולריים לעומת רכיבים) ואת הזהות המגשרת $\|A\|_F^2 = \operatorname{Tr}(A^\top A)$ — לרוב צעד בשורה אחת בשאלות balancedness/זרימת-גרדיאנט.
- העובדה "נורמות קמורות אך לעולם לא קמורות-ממש" (נגד-דוגמה: נקודות קולינאריות $x, 2x$) היא פריט נכון/לא-נכון מהיר; זכרו את מקרה השוויון של אי-שוויון המשולש לאורך קרניים.
- שלטו בהצבה $q = U^\top x$ ובעובדה שהחלפות בסיס אורתוגונליות שומרות נורמת $\ell_2$ — היא מניעה בשקט את P4 ואינספור טיעוני מצוב.
