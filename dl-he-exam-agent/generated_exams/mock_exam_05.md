# מבחן לדוגמה FODL 5 (נוצר 2026-10-28)

**הפורמט תואם למבחן האמיתי:** 3 שעות · ללא חומר עזר · 3 שאלות · 105 נקודות
(ציון מרבי 100 — 5 הנקודות העודפות הן מרווח, כמו בשנים האחרונות).
כל טענה שהוכחה בכיתה או בתרגול ניתנת לשימוש אם צוטטה במדויק; כל דבר אחר
חייב להיות מוכח. מבנים חדשים — וריאציות של תבניות מבחן אמיתיות מהשנים האחרונות (2023–2024), לא העתקים.

פתרונות ומחוון ציון: `mock_exam_05_solutions.md` — **אל תפתחו לפני שניסיתם.**

---

## Question 1 (40 pts) — רשתות ריבוע עמוקות: הפרדת עומק בעזרת Chebyshev ו(אי-)אוניברסליות

לאורך כל השאלה הקלטים והפלטים הם סקלרים, $\mathcal{X} = \mathcal{Y} = \mathbb{R}$, ו-
$\sigma(u) := u^2$ היא *אקטיבציית הריבוע*, המופעלת על וקטורים איבר-איבר. עבור שתי
פונקציות $f_1, f_2 : \mathbb{R} \to \mathbb{R}$ נגדיר

$$dist(f_1, f_2) := \sup_{x \in [-1, 1]} |f_1(x) - f_2(x)| .$$

*רשתות ריבוע עמוקות.* עבור עומק $L \in \mathbb{N}$, המחלקה $\mathcal{N}_L$
מורכבת מכל הפונקציות $h : \mathbb{R} \to \mathbb{R}$ מהצורה

$$z^{(0)} := x, \qquad z^{(l)} := \sigma\big( W_l\, z^{(l-1)} + b_l \big) \in \mathbb{R}^4
\;\; (l = 1, \dots, L), \qquad h(x) := a^\top z^{(L)} + c,$$

עם משקלים $W_1 \in \mathbb{R}^{4 \times 1}$, $W_l \in \mathbb{R}^{4 \times 4}$ עבור
$l \ge 2$, הטיות (biases) $b_l \in \mathbb{R}^4$ ומשקלי פלט $a \in \mathbb{R}^4$,
$c \in \mathbb{R}$ (רוחב $4$; בסך הכול $20L - 7$ פרמטרים).

*רשתות מאפייני-פולינום.* עבור $B \in \mathbb{N}_0$ יהי

$$\mathcal{P}_B := \Big\{\, h(x) = \sum_{j=0}^{B} \alpha_j x^j \;:\; \alpha_0, \dots,
\alpha_B \in \mathbb{R} \,\Big\}$$

(שכבה לינארית מעל $B+1$ המאפיינים הקבועים $1, x, \dots, x^B$), כלומר
הפולינומים מדרגה לכל היותר $B$.

*תזכורות (מותר להשתמש בהן ללא הוכחה).* **(Weierstrass)** עבור כל פונקציה רציפה
$f : [-1,1] \to \mathbb{R}$ ועבור כל $\epsilon > 0$ קיים פולינום $p$ כך ש-
$\sup_{x \in [-1,1]} |f(x) - p(x)| < \epsilon$. **(Chebyshev)** עבור כל $n \in \mathbb{N}$
קיים פולינום $T_n$ מדרגה $n$ בדיוק כך ש-
$T_n(\cos\theta) = \cos(n\theta)$ לכל $\theta \in \mathbb{R}$; למשל $T_1(x) = x$,
$T_2(x) = 2x^2 - 1$.

1. **(5 pts)** כתבו באופן פורמלי את הגדרת הביטוי: "המשפחה
   $(\mathcal{N}_L)_{L \in \mathbb{N}}$ היא *בעלת יעילות ביטויית אקספוננציאלית* ביחס
   ל-$(\mathcal{P}_B)_{B \in \mathbb{N}_0}$, במובן אי-הקריבות ביחס
   ל-$dist(\cdot,\cdot)$." שני התנאים שבהגדרה מהקורס חייבים להופיע,
   עם כמתים מפורשים.

2. **(6 pts)** הוכיחו שכל $h \in \mathcal{N}_L$ היא פולינום מדרגה לכל היותר
   $2^L$, כלומר $\mathcal{N}_L \subseteq \mathcal{P}_{2^L}$.

3. **(10 pts)** *Horner ברשת ריבוע.* הוכיחו שעבור כל $B \in \mathbb{N}$,
   $\mathcal{P}_B \subseteq \mathcal{N}_B$ (וכן $\mathcal{P}_0 \subseteq \mathcal{N}_1$).
   הסיקו שהמשפחה $(\mathcal{N}_L)_{L \in \mathbb{N}}$ אוניברסלית במובן
   $dist(\cdot,\cdot)$ ביחס למחלקת הפונקציות הרציפות על $[-1,1]$
   (נסחו את ההגדרה שאתם מאמתים).
   *רמז:* $\;r\,x = \tfrac14\big[ (r+x)^2 - (r-x)^2 \big]$, והרשת חייבת גם
   "לשאת" את $x$ עצמו משכבה לשכבה.

4. **(12 pts)** *עד בעומק-$L$.* יהי $\bar h_L := T_2 \circ T_2 \circ \cdots \circ T_2$
   (הרכבה של $L$ עותקים).

   a. **(4 pts)** הוכיחו ש-$\bar h_L \in \mathcal{N}_L$ וש-
      $\bar h_L(\cos\theta) = \cos(2^L \theta)$ לכל $\theta \in \mathbb{R}$.

   b. **(6 pts)** הוכיחו שעבור כל $n \in \mathbb{N}$ ועבור כל פולינום $p$ מדרגה
      לכל היותר $n - 1$:

      $$dist(T_n, p) \;\ge\; 1,$$

      וששוויון מושג (ולכן $\inf_{p \in \mathcal{P}_{n-1}} dist(T_n, p) = 1$).
      *רמז:* הציבו בנקודות $x_k := \cos(k\pi / n)$, $k = 0, 1, \dots, n$.

   c. **(2 pts)** הסיקו, בעזרת סעיפים 3–4, שהמשפחה $(\mathcal{N}_L)_L$ בעלת
      יעילות ביטויית אקספוננציאלית ביחס ל-$(\mathcal{P}_B)_B$ במובן
      אי-הקריבות של סעיף 1. השוו את מספרי הפרמטרים.

5. **(7 pts)** *שתי דרכים לאבד אוניברסליות.*

   a. **(2 pts)** הוכיחו שעבור כל $L \in \mathbb{N}$ **קבוע**, המחלקה הבודדת
      $\mathcal{N}_L$ אינה אוניברסלית: הציגו פונקציה רציפה $f$ עם
      $dist(f, h) \ge 1$ לכל $h \in \mathcal{N}_L$.

   b. **(5 pts)** תהי $\mathcal{N}^0_L \subseteq \mathcal{N}_L$ תת-המחלקה *ללא הטיה*,
      שבה $b_1 = \cdots = b_L = 0$ (הטיית הפלט $c$ נשמרת). הוכיחו
      שכל $h \in \mathcal{N}^0_L$ היא מהצורה $h(x) = \gamma\, x^{2^L} + c$ עבור
      $\gamma \in \mathbb{R}$ כלשהו, והסיקו שהמשפחה $(\mathcal{N}^0_L)_{L \in \mathbb{N}}$
      **אינה** אוניברסלית ביחס לפונקציות הרציפות על $[-1,1]$ — אפילו לא
      עם עומק בלתי-חסום: הראו ש-$dist(f, h) \ge 1$ עבור $f(x) = x$ ועבור כל
      $h \in \bigcup_{L} \mathcal{N}^0_L$.

---

## Question 2 (35 pts) — gradient flow על פרמטריזציה של הפרש ריבועים (אלכסונית)

יהיו $X \in \mathbb{R}^{N \times d}$ ו-$y \in \mathbb{R}^N$, ונתבונן ברגרסיה לינארית
עם ההפסד הריבועי $L(w) := \frac12 \|X w - y\|^2$, $w \in \mathbb{R}^d$. במקום
לבצע אופטימיזציה ישירות על $w$, נכתוב את המנבא כ*הפרש של ריבועי
Hadamard* (רשת לינארית אלכסונית בעומק 2 עם ענף "חיובי" וענף "שלילי"):

$$\phi(u, v) := L\big( u \odot u - v \odot v \big), \qquad u, v \in \mathbb{R}^d ,$$

כאשר $\odot$ היא המכפלה איבר-איבר (מכפלת Hadamard). gradient flow מורץ על $\phi$:
$\dot u(t) = -\nabla_u \phi(u(t), v(t))$, $\dot v(t) = -\nabla_v \phi(u(t), v(t))$, מאתחול
כלשהו $(u(0), v(0))$. נסמן

$$w(t) := u(t) \odot u(t) - v(t) \odot v(t), \qquad r(t) := X w(t) - y, \qquad
g(t) := \nabla L(w(t)) = X^\top r(t).$$

מותר להניח שהזרימה קיימת, יחידה ומוגדרת לכל $t \ge 0$. פונקציות של
וקטורים כגון $\sqrt{\cdot}$, $\sinh$, $\operatorname{arcsinh}$ פועלות איבר-איבר.

1. **(5 pts)** הוכיחו ש-$\nabla_u \phi(u, v) = 2\, u \odot \nabla L(w)$ ו-
   $\nabla_v \phi(u, v) = -2\, v \odot \nabla L(w)$, כך שהזרימה היא
   $\dot u = -2\, u \odot g$, $\;\dot v = 2\, v \odot g$.

2. **(7 pts)** *שימור וצורה סגורה.*
   (i) הוכיחו ש-$u_i(t)\, v_i(t) = u_i(0)\, v_i(0)$ לכל $i \in [d]$ ו-$t \ge 0$.
   (ii) עם $G(t) := \int_0^t g(s)\, ds \in \mathbb{R}^d$, הוכיחו ש-

   $$u(t) = u(0) \odot e^{-2G(t)}, \qquad v(t) = v(0) \odot e^{2G(t)} .$$

   (iii) הסיקו שכל רכיב של $u(t)$ ושל $v(t)$ שומר על הסימן שהיה לו ב-$t = 0$
   (רכיבי אפס נשארים אפס). בפרט, אם $v(0) = 0$ אז $w(t) \ge 0$ איבר-איבר
   לכל $t$; הסבירו במשפט אחד מדוע המודל משתמש בהפרש
   $u \odot u - v \odot v$ ולא ב-$u \odot u$ לבדו.

3. **(6 pts)** מעתה $u(0) = v(0) = \alpha \mathbf{1}$ עבור סקלר $\alpha > 0$
   (כך ש-$w(0) = 0$). הוכיחו ש-

   $$\dot w(t) = -4\, \sqrt{w(t) \odot w(t) + 4\alpha^4 \mathbf{1}} \;\odot\; \nabla L(w(t)) .$$

4. **(6 pts)** *התכנסות.* נניח של-$X$ דרגת שורות מלאה, ויהי
   $\lambda_0 := \lambda_{\min}(X X^\top) > 0$. הוכיחו שלכל $t \ge 0$

   $$L(w(t)) \;\le\; \tfrac12 \|y\|^2\, e^{-16 \alpha^2 \lambda_0 t} .$$

   במשפט אחד: מה אומר הקצב הזה על אתחול קטן?

5. **(11 pts)** *הטיה מרומזת.* שמרו על ההנחות של סעיפים 3–4.

   a. **(4 pts)** יהי $q(t) := \operatorname{arcsinh}\big( w(t) / (2\alpha^2) \big)$. הוכיחו
      ש-$\dot q(t) = -4 X^\top r(t)$, ולכן $q(t) = X^\top \mu(t)$ עם
      $\mu(t) := -4 \int_0^t r(s)\, ds$. בעזרת סעיף 4, הוכיחו ש-$\mu(t)$ מתכנס כאשר
      $t \to \infty$, והסיקו ש-$w(t) \to w_\infty$ עבור $w_\infty$ כלשהו המקיים

      $$X w_\infty = y \qquad \text{וגם} \qquad
      \operatorname{arcsinh}\big( w_\infty / (2\alpha^2) \big) \in
      \operatorname{range}(X^\top) .$$

   b. **(3 pts)** יהי

      $$\Psi_\alpha(w) := \sum_{i=1}^d \Big[ w_i \operatorname{arcsinh}\Big(
      \frac{w_i}{2\alpha^2} \Big) - \sqrt{w_i^2 + 4\alpha^4} \Big] .$$

      הוכיחו ש-$w_\infty$ הוא הממזער ה**יחיד** של $\Psi_\alpha$ על
      $\{ w \in \mathbb{R}^d : X w = y \}$.

   c. **(4 pts)** קחו $d = 2$, $N = 1$, $X = (1 \;\; 2)$, $y = 2$. הוכיחו ש-

      $$w_\infty = \frac{1}{1 + 4\cosh\mu} \begin{pmatrix} 2 \\ 4\cosh\mu \end{pmatrix}$$

      כאשר $\mu > 0$ הוא הפתרון היחיד של $\sinh\mu\, (1 + 4\cosh\mu) = \alpha^{-2}$.
      חשבו את $\lim_{\alpha \to 0^+} w_\infty$ ואת $\lim_{\alpha \to \infty} w_\infty$, וזהו
      כל גבול כאינטרפולנט בעל נורמת-$\ell_1$ מינימלית או כאינטרפולנט בעל נורמת-$\ell_2$
      מינימלית (הוכיחו את הזיהוי).

---

## Question 3 (30 pts) — ספירת ביטים עם רוחב ודיוק הנבחרים מתוך הנתונים

יהי $\mathcal{X} = \mathbb{R}^D$, $\mathcal{Y} = \{0, 1\}$, יהי $\ell(\hat y, y) :=
\mathbb{1}[\hat y \ne y]$ הפסד 0-1, תהי $D$ התפלגות (לא ידועה) מעל
$\mathcal{X} \times \mathcal{Y}$ ותהי $S = \{(x_n, y_n)\}_{n=1}^N$ קבוצת אימון של $N$
דוגמאות שנדגמו i.i.d. מ-$D$. כרגיל $L_D(h) := \mathbb{E}_{(x,y) \sim D}[\ell(h(x), y)]$
ו-$L_S(h) := \frac1N \sum_{n=1}^N \ell(h(x_n), y_n)$.

קבעו, *לפני ראיית הנתונים*, סדרה של ארכיטקטורות: עבור כל $P \in \mathbb{N}$, העתקה
$\theta \mapsto h^{(P)}_\theta$ מ-$\mathbb{R}^P$ למסווגים (מדידים)
$\mathcal{X} \to \{0, 1\}$ — רשת עם $P$ פרמטרים. קבעו גם, עבור כל
$k \in \mathbb{N}$, קבוצה $Q_k \subset \mathbb{R}$ של בדיוק $2^k$ מספרים (הערכים
הניתנים לייצוג ב-$k$ ביטים). עבור $P, k \in \mathbb{N}$ הגדירו את מחלקת הרשתות בעלות
$P$ פרמטרים, המקוונטטות ל-$k$ ביטים לכל פרמטר:

$$\mathcal{H}_{P,k} := \big\{ h^{(P)}_\theta \;:\; \theta \in Q_k^P \big\} .$$

*תזכורת (Hoeffding).* אם $A_1, \dots, A_N$ משתנים מקריים i.i.d. ב-$[0,1]$, אז
עבור כל $\epsilon \ge 0$:

$$P\Big( \Big| \frac1N \sum_{n=1}^N A_n - \mathbb{E}[A_1] \Big| \ge \epsilon \Big) \le
2 e^{-2N\epsilon^2} .$$

1. **(7 pts)** הוכיחו ש-$|\mathcal{H}_{P,k}| \le 2^{Pk}$, וכן שעבור $P, k$ קבועים
   ועבור כל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$:

   $$\forall h \in \mathcal{H}_{P,k}: \quad L_D(h) - L_S(h) \;\le\;
   \sqrt{\frac{Pk \ln 2 + \ln(2/\delta)}{2N}} .$$

   אל תסתמכו כאן על חסמים שהוכחו בכיתה — רק על תזכורת Hoeffding.

2. **(8 pts)** בפועל, גם הגודל $P$ וגם הדיוק $k$ נבחרים *אחרי* האימון
   (למשל על ידי גיזום וקוונטיזציה). גזרו ביטוי מפורש
   $\Delta(N, \delta, P, k)$ כך ש:
   (a) עבור כל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$,
   בו-זמנית לכל $P, k \in \mathbb{N}$ ולכל $h \in \mathcal{H}_{P,k}$:
   $L_D(h) - L_S(h) \le \Delta(N, \delta, P, k)$;
   (b) הביטוי $\Delta$ עולה ממש ב-$P$ וב-$k$;
   (c) מתקיים $\lim_{N \to \infty} \Delta(N, \delta, P, k) = 0$ לכל $P, k, \delta$ קבועים.
   הסבירו במשפט אחד מדוע (a) מכשיר בחירה של $(P, k)$ מתוך הנתונים.

3. **(5 pts)** נניח שעבור $P, k$ כלשהם קיימים $N$ קלטים שונים
   $x_1, \dots, x_N$ כך ש**כל** תיוג $(y_1, \dots, y_N) \in \{0,1\}^N$ ממומש
   על ידי $h \in \mathcal{H}_{P,k}$ כלשהי. הוכיחו ש-$Pk \ge N$, והסיקו שהביטוי
   $\Delta(N, \delta, P, k)$ שלכם מסעיף 2 עולה על $\sqrt{\ln 2 / 2} \approx 0.589$. מדוע
   זה חסר תועלת עבור השערה עם $L_S(h) = 0$?

4. **(6 pts)** נניח כעת ש-$\mathcal{H}_{P,k}$ מתאימה לכל תיוג של **כל** $N$
   קלטים שונים, ויהי $\hat h_S$ הפלט של כלל ERM כלשהו מעל
   $\mathcal{H}_{P,k}$. תהי $D^{\mathrm{rand}}$ ההתפלגות שבה
   $x \sim \mathrm{Uniform}([0,1]^D)$ ובאופן בלתי-תלוי $y \sim \mathrm{Bernoulli}(1/2)$.
   (i) הוכיחו ש-$L_{D^{\mathrm{rand}}}(h) = \frac12$ לכל מסווג $h$, וש-
   $L_S(\hat h_S) = 0$ בהסתברות $1$ כאשר $S \sim (D^{\mathrm{rand}})^N$.
   (ii) יהי $\Delta'(N, \delta, P, k)$ גודל **כלשהו**, התלוי רק ב-
   $N, \delta, P, k$, כך שעבור **כל** התפלגות $D$, בהסתברות של לפחות
   $1 - \delta$: $L_D(\hat h_S) - L_S(\hat h_S) \le \Delta'(N, \delta, P, k)$. הוכיחו
   ש-$\Delta' \ge \frac12$. מה זה אומר על חסמים מהסוג שנגזר בסעיפים
   1–2, ובמה חייב להיות תלוי חסם בעל משמעות (כפי שנדון בכיתה)?

5. **(4 pts)** *מספרים.* השתמשו ב-$\ln 2 \approx 0.693$, ב-$\ln 40 \approx 3.689$ ובחסם
   ה-$(P,k)$-הקבוע של סעיף 1 (כלומר אפילו *תוך התעלמות* מהמחיר ששולם בסעיף 2 על
   בחירת $P, k$ מתוך הנתונים), עם $\delta = 0.05$ ו-$N = 5 \cdot 10^4$
   (גודל CIFAR-10). (i) חשבו את החסם עבור רשת עם $P = 10^6$ פרמטרים
   המקוונטטים ל-$k = 1$ ביט כל אחד, וקבעו אם הוא אינפורמטיבי. (ii) מצאו את
   ה-$P$ הגדול ביותר שעבורו $k = 1$ נותן חסם $\le 0.1$, והשוו אותו ל-$N$.
