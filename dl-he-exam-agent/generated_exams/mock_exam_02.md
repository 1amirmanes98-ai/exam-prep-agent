# מבחן לדוגמה FODL 2 (נוצר 2026-07-06)

**הפורמט תואם למבחן האמיתי:** 3 שעות · ללא חומר עזר · 3 שאלות · 105 נקודות
(ציון מרבי 100 — 5 הנקודות העודפות הן מרווח, כמו בשנים האחרונות).
כל טענה שהוכחה בכיתה או בתרגול ניתנת לשימוש אם צוטטה במדויק; כל דבר אחר
חייב להיות מוכח. מבנים חדשים — וריאציות של תבניות מבחן אמיתיות (2020–2024), לא העתקים.

פתרונות ומחוון ציון: `mock_exam_02_solutions.md` — **אל תפתחו לפני שניסיתם.**

---

## Question 1 (40 pts) — רשתות product-pooling ודרגת מטריצה

יהי $M \in \mathbb{N}_{\ge 2}$ ונתבונן בפונקציות על הסריג הדו-ממדי,
$f : [M] \times [M] \to \mathbb{R}$ (המקרה $N = 2$ של מרחבי הקלט הבדידים
מהכיתה). נזהה כל פונקציה כזו עם טבלת החיפוש שלה — המטריצה
$F \in \mathbb{R}^{M \times M}$ המוגדרת על ידי $F_{d_1, d_2} := f(d_1, d_2)$.

עבור רוחב $R \in \mathbb{N}$, נתבונן ברשת ה-product-pooling הרדודה מהכיתה
(ייצוג one-hot $\to$ קונבולוציית $1{\times}1$ ברוחב $R$, מחוברת מקומית $\to$
product pooling גלובלי $\to$ פלט לינארי). על קלט $(d_1, d_2)$, היחידה החבויה
$r \in [R]$ מחשבת $\langle \varphi^r, \mathbf{e}^{d_1} \rangle \cdot
\langle \psi^r, \mathbf{e}^{d_2} \rangle$ עם פילטרים
$\varphi^r, \psi^r \in \mathbb{R}^M$, ולשכבת הפלט משקלים
$c \in \mathbb{R}^R$:

$$h(d_1, d_2) \;=\; \sum_{r=1}^{R} c_r \, \langle \varphi^r, \mathbf{e}^{d_1} \rangle
\, \langle \psi^r, \mathbf{e}^{d_2} \rangle \;=\; \sum_{r=1}^{R} c_r \,
\varphi^r_{d_1} \, \psi^r_{d_2},$$

כלומר, המטריצה הממומשת היא $F_h = \sum_{r=1}^R c_r \, \varphi^r (\psi^r)^\top$ (פירוק
CP עם $R$ איברים). נגדיר את מחלקת ההשערות, כקבוצת מטריצות,

$$\mathcal{H}_R := \Big\{ \sum_{r=1}^{R} c_r \, \varphi^r (\psi^r)^\top \;:\;
c \in \mathbb{R}^R, \;\; \varphi^r, \psi^r \in \mathbb{R}^M \Big\}
\;\subseteq\; \mathbb{R}^{M \times M}.$$

1. **(10 pts)** הוכיחו ש-
   $$\mathcal{H}_R = \big\{ F \in \mathbb{R}^{M \times M} : \operatorname{rank}(F) \le R \big\}.$$
   יש להוכיח את שתי ההכלות.
   *תזכורת (מותר להשתמש בה כידועה מאלגברה לינארית): עבור $A, B$ מאותו גודל,
   $\operatorname{rank}(A + B) \le \operatorname{rank}(A) + \operatorname{rank}(B)$.*
   *רמז: עבור ההכלה $\supseteq$, פתחו את עמודות $F$ בבסיס של מרחב
   העמודות שלה.*

2. **(10 pts)** נזכיר שמחלקת השערות של פונקציות על $[M] \times [M]$ היא
   *אוניברסלית* אם היא יכולה לממש **כל** פונקציה, כלומר, תחת הזיהוי
   לעיל, אם היא שווה ל-$\mathbb{R}^{M \times M}$. הוכיחו ש-$\mathcal{H}_R$
   אוניברסלית **אם ורק אם** $R \ge M$. באופן ספציפי:
   (i) עבור $R \ge M$, הוכיחו $\mathcal{H}_R = \mathbb{R}^{M \times M}$, ותנו
   השמה מפורשת של $\{c_r, \varphi^r, \psi^r\}_{r=1}^{M}$ הממשת
   $F$ נתונה כלשהי ברוחב $M$ בדיוק;
   (ii) עבור $R < M$, הציגו מטריצה קונקרטית שאינה ב-$\mathcal{H}_R$, בצירוף הוכחה.

3. **(10 pts)** הוכיחו שעבור כל $R \in \{0, 1, \dots, M-1\}$:
   $$\min_{F \in \mathcal{H}_R} \big\| F - I_M \big\|_F^2 \;=\; M - R,$$
   והציגו מטריצה המשיגה את המינימום. הסיקו: עם המרחק מהכיתה
   $D(h, \bar h) := \|F_h - F_{\bar h}\|_F$, אם רשת ברוחב $R$ מקיימת
   $D(h, \mathrm{identity\ table}) \le \epsilon$ (כאשר פונקציית המטרה היא
   $f(d_1, d_2) = \mathbb{1}[d_1 = d_2]$, כלומר $F = I_M$), אז $R \ge M - \epsilon^2$.
   *תזכורת (Eckart–Young–Mirsky, מותר להשתמש בה כפי שנוסחה בכיתה): תהי
   $A \in \mathbb{R}^{m_1 \times m_2}$ עם ערכים סינגולריים
   $\sigma_1(A) \ge \dots \ge \sigma_{\min\{m_1, m_2\}}(A) \ge 0$. עבור כל
   $r \in \{0, 1, \dots, \min\{m_1, m_2\}\}$:*
   $$\min_{W \in \mathbb{R}^{m_1 \times m_2},\; \operatorname{rank}(W) \le r}
   \|W - A\|_F^2 \;=\; \sum\nolimits_{i=r+1}^{\min\{m_1, m_2\}} \sigma_i(A).$$

4. **(10 pts)** נניח כעת את אילוץ שיתוף-המשקלים $\psi^r = \varphi^r$ לכל
   $r \in [R]$ (אותו פילטר מוחל בשני מיקומי הסריג — המקרה
   ה*קונבולוציוני* מהכיתה), ונסמן את המחלקה המתקבלת ב-
   $$\mathcal{H}^{\mathrm{sym}}_R := \Big\{ \sum_{r=1}^{R} c_r \,
   \varphi^r (\varphi^r)^\top : c \in \mathbb{R}^R, \; \varphi^r \in \mathbb{R}^M \Big\}.$$
   (i) הוכיחו ש-$\bigcup_{R \in \mathbb{N}} \mathcal{H}^{\mathrm{sym}}_R =
   \{ F \in \mathbb{R}^{M \times M} : F^\top = F \}$ (כל המטריצות הסימטריות), ו-
   שרוחב $R = M$ כבר מספיק: $\mathcal{H}^{\mathrm{sym}}_M = \{F : F^\top = F\}$.
   (ii) נניח שמשקלי הפלט מאולצים בנוסף להיות אי-שליליים:
   $c_r \ge 0$ לכל $r$. אפיינו את מחלקת המטריצות הניתנות לביטוי ברוחב
   שרירותי, והוכיחו את האפיון שלכם.
   *מותר להשתמש במשפט הספקטרלי עבור מטריצות סימטריות ממשיות כידוע מאלגברה
   לינארית.*

---

## Question 2 (35 pts) — דינמיקת חיזוי תחת גרעין (משתנה-בזמן)

יהי $\{(x_n, y_n)\}_{n=1}^N \subseteq \mathbb{R}^d \times \mathbb{R}$ מדגם אימון
ו-$y := [y_1, \dots, y_N]^\top \in \mathbb{R}^N$. עבור מודל גזיר
$f(w, x)$ ($w$ = משקלים) המאומן ב-gradient flow על הפסד $\ell_2$, יהי
$u(t) \in \mathbb{R}^N$ המחזיק את חיזויי האימון בזמן $t$:
$u_n(t) := f(w(t), x_n)$. נזכיר מהכיתה ש-$u(t)$ מקיים
$\dot u(t) = -H(t)\,(u(t) - y)$ כאשר $H(t)$ חיובית-למחצה (PSD). שאלה זו
חוקרת דינמיקה זו.

1. **(8 pts)** *מודל לינארי.* קבעו העתקת מאפיינים $\phi : \mathbb{R}^d \to \mathbb{R}^k$
   ויהי $f(w, x) = \phi(x)^\top w$ עם $w \in \mathbb{R}^k$. תהי
   $\Phi \in \mathbb{R}^{N \times k}$ המטריצה שהשורה ה-$n$ שלה היא
   $\phi(x_n)^\top$, כך ש-$u = \Phi w$, והריצו gradient flow
   $\dot w(t) = -\nabla \ell(w(t))$ על
   $$\ell(w) = \tfrac{1}{2} \| \Phi w - y \|^2.$$
   הוכיחו: (i) $\dot u(t) = -H \, (u(t) - y)$ כאשר $H := \Phi \Phi^\top$ קבועה
   בזמן; (ii) $H$ סימטרית וחיובית-למחצה, עם רכיבים
   $(H)_{n, n'} = \langle \phi(x_n), \phi(x_{n'}) \rangle$.

2. **(10 pts)** *גרעין קבוע.* נניח $\dot u(t) = -H (u(t) - y)$ עבור
   $H \in \mathbb{R}^{N \times N}$ סימטרית וחיובית-למחצה קבועה; לפי המשפט הספקטרלי כתבו
   $H = \sum_{n=1}^N \lambda_n v_n v_n^\top$ עם $\{v_n\}_{n=1}^N$ אורתונורמליים ו-
   $\lambda_n \ge 0$.
   (i) הוכיחו שעבור כל $n \in [N]$ ו-$t \ge 0$:
   $$\langle v_n, u(t) - y \rangle = e^{-\lambda_n t} \, \langle v_n, u(0) - y \rangle,
   \qquad \text{ולכן} \qquad
   u(t) - y = \sum_{n=1}^{N} e^{-\lambda_n t} \, \langle v_n, u(0) - y \rangle \, v_n.$$
   *רמז: גזרו את $e^{\lambda_n t} \langle v_n, u(t) - y \rangle$.*
   (ii) הסיקו את התנהגות ההתכנסות לכל ערך עצמי: רכיבי $u(t) - y$ לאורך
   וקטורים עצמיים עם $\lambda_n > 0$ דועכים לאפס אקספוננציאלית (בקצב $\lambda_n$),
   בעוד רכיבים לאורך וקטורים עצמיים עם $\lambda_n = 0$ נשארים **קבועים** לכל
   $t$. הסיקו ש-$\lim_{t \to \infty} \big( u(t) - y \big) = P_{\ker H}
   \big( u(0) - y \big)$ (הטלה אורתוגונלית על הגרעין של $H$), ו-
   $u(t) \to y$ אם ורק אם $u(0) - y \perp \ker(H)$ — בפרט, בכל פעם ש-$H$
   אינה סינגולרית.

3. **(10 pts)** *גרעין משתנה-בזמן.* נניח כעת רק ש-$H(t)$ סימטרית עבור
   כל $t \ge 0$, רציפה ב-$t$, ושקיים $\lambda > 0$ עם
   $H(t) \succeq \lambda I_N$ לכל $t \ge 0$ (כלומר, $H(t) - \lambda I_N$ חיובית-למחצה).
   הוכיחו:
   $$\forall t \ge 0: \qquad \| u(t) - y \|^2 \;\le\; e^{-2 \lambda t} \,
   \| u(0) - y \|^2,$$
   והסיקו שההפסד $\ell(t) := \tfrac{1}{2}\|u(t) - y\|^2$ מקיים
   $\ell(t) \le \epsilon$ עבור כל
   $t \ge \frac{1}{2\lambda} \ln\big( \frac{\|u(0) - y\|^2}{2\epsilon} \big)$.
   *רמז: הראו ש-$g(t) := e^{2\lambda t} \, \|u(t) - y\|^2$ אינה עולה. שימו
   לב שאין כאן פתרון סגור למשוואה הדיפרנציאלית — עבור $H(t)$ משתנה-בזמן
   אסור פשוט לכתוב $e^{-\int H}$.*

4. **(7 pts)** *רשתות רחבות-במיוחד.* ב**לכל היותר ארבעה משפטים**: עבור רשת
   לא-לינארית רחבה-במיוחד (המשטר שנחקר בכיתה), מדוע $H(t)$ נשארת קרובה
   לערכה באתחול לאורך כל האימון, ומה זה מרמז על התכנסות הפסד האימון?
   התייחסו לתוצאות הכמותיות הרלוונטיות מהכיתה (אין צורך בהוכחות).

---

## Question 3 (30 pts) — מורכבות Rademacher של מנבאים לינאריים חסומי-ℓ1

יהיו $d, N \in \mathbb{N}$. יהי $\mathcal{X} \subseteq \{x \in \mathbb{R}^d :
\|x\|_\infty \le 1\}$ מרחב קלט (כל הקלטים בעלי רכיבים ב-$[-1, 1]$),
$\mathcal{Y}$ מרחב תוויות, $D$ התפלגות לא ידועה מעל
$\mathcal{X} \times \mathcal{Y}$, ו-$S = \{(x_n, y_n)\}_{n=1}^N$ מדגם i.i.d..
עבור $B > 0$ נגדיר את מחלקת המנבאים הלינאריים חסומי-$\ell_1$

$$\mathcal{H}_B := \big\{ h_w : x \mapsto \langle w, x \rangle \;:\;
w \in \mathbb{R}^d, \; \|w\|_1 \le B \big\},
\qquad \|w\|_1 = \sum\nolimits_{j=1}^d |w_j|, \quad
\|v\|_\infty = \max\nolimits_{j \in [d]} |v_j|.$$

תהי $\ell : \mathcal{Y} \times \mathbb{R} \to [0, 1]$ פונקציית הפסד שהיא
$\rho$-Lipschitz בארגומנט השני שלה, ויסמנו $L_D, L_S$ את הפסדי האוכלוסייה
והמדגם, כרגיל. עבור מחלקה $\mathcal{H}$ נכתוב
$\mathcal{H} \circ S := \{ (h(x_1), \dots, h(x_N)) : h \in \mathcal{H} \}
\subseteq \mathbb{R}^N$ ו-
$\ell \circ \mathcal{H} \circ S := \{ (\ell(y_1, h(x_1)), \dots, \ell(y_N, h(x_N))) :
h \in \mathcal{H} \}$.

1. **(8 pts)** נסחו את ההגדרה של מורכבות Rademacher (האמפירית) $R(A)$ של
   קבוצה $A \subseteq \mathbb{R}^N$, כפי שניתנה בכיתה, והוכיחו:
   $$R(\mathcal{H}_B \circ S) \;=\; \frac{B}{N} \; \mathbb{E}_{\sigma}
   \Big[ \Big\| \sum\nolimits_{n=1}^{N} \sigma_n x_n \Big\|_\infty \Big].$$
   *רמז: הוכיחו תחילה שעבור כל $v \in \mathbb{R}^d$,
   $\sup_{\|w\|_1 \le B} \langle w, v \rangle = B \|v\|_\infty$, וזהו נקודה
   שבה הסופרמום מושג.*

2. **(8 pts)** הוכיחו:
   $$R(\mathcal{H}_B \circ S) \;\le\; B \sqrt{\frac{2 \ln(2d)}{N}}.$$
   *תזכורת (הלמה של Massart, מותר להשתמש בה כקופסה שחורה): עבור כל קבוצה סופית
   $V \subset \mathbb{R}^N$ ו-$\sigma_1, \dots, \sigma_N$ i.i.d. אחידים על
   $\{\pm 1\}$:*
   $$\mathbb{E}_{\sigma} \Big[ \max_{v \in V} \langle \sigma, v \rangle \Big] \;\le\;
   \Big( \max_{v \in V} \|v\|_2 \Big) \sqrt{2 \ln |V|}.$$
   *רמז: כתבו את $\|\sum_n \sigma_n x_n\|_\infty$ כמקסימום של
   $\langle \sigma, v \rangle$ מעל קבוצה של $2d$ וקטורים הבנויים מהקואורדינטות של
   המדגם.*

3. **(7 pts)** גזרו: עבור כל $B > 0$ ו-$\delta \in (0, 1)$ קבועים, בהסתברות
   של לפחות $1 - \delta$ מעל $S$:
   $$\forall h \in \mathcal{H}_B: \qquad L_D(h) \;\le\; L_S(h) \;+\;
   2 \rho B \sqrt{\frac{2 \ln(2d)}{N}} \;+\; 3 \sqrt{\frac{2 \ln(4/\delta)}{N}}.$$
   *תזכורת (חסם הכללה של Rademacher, הוכח בתרגול): עבור כל
   מחלקת השערות $\mathcal{H}$ ו-$\delta \in (0,1)$, בהסתברות $\ge 1 - \delta$ מעל
   $S \sim D^N$:*
   $$\forall h \in \mathcal{H}: \quad L_D(h) - L_S(h) \;\le\;
   2 R(\ell \circ \mathcal{H} \circ S) + 3 \sqrt{\frac{2 \ln(4/\delta)}{N}}.$$
   *תזכורת (התכווצות, מותר להשתמש בה כקופסה שחורה): אם $\ell(y, \cdot)$ היא
   $\rho$-Lipschitz עבור כל $y \in \mathcal{Y}$, אז
   $R(\ell \circ \mathcal{H} \circ S) \le \rho \cdot R(\mathcal{H} \circ S)$.*

4. **(7 pts)** הוכיחו גרסה **אדפטיבית** המתקיימת עבור כל הנורמות בו-זמנית: עם
   הסתברות של לפחות $1 - \delta$ מעל $S$, עבור **כל** $w \in \mathbb{R}^d$ (ללא
   הגבלת נורמה), עם $B(w) := \max\{ 1, \, 2\|w\|_1 \}$:
   $$L_D(h_w) \;\le\; L_S(h_w) \;+\; 2 \rho \, B(w) \sqrt{\frac{2 \ln(2d)}{N}}
   \;+\; 3 \sqrt{\frac{2 \big( \ln(4/\delta) + \ln(2 B(w)) \big)}{N}}.$$
   *רמז: החילו את סעיף 3 על המחלקות $\mathcal{H}_{2^j}$, $j = 0, 1, 2, \dots$, עם
   רמות ביטחון $\delta_j := \delta \cdot 2^{-(j+1)}$.*
   הסיקו במשפט או שניים: אילו מנבאים החסם הזה מעדיף, ומדוע זה רלוונטי
   להכללה של מודלים המאומנים בגרדיאנט כאשר $d \gg N$ (היזכרו בדיון על
   הרגולריזציה הסמויה מהכיתה)?
