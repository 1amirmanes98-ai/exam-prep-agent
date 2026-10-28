# מבחן לדוגמה FODL 8 (נוצר 2026-10-28)

**הפורמט תואם למבחן האמיתי:** 3 שעות · ללא חומר עזר · 3 שאלות · 105 נקודות
(ציון מרבי 100 — 5 הנקודות העודפות הן מרווח, כמו בשנים האחרונות).
כל טענה שהוכחה בכיתה או בתרגול ניתנת לשימוש אם צוטטה במדויק; כל דבר אחר
חייב להיות מוכח. מבנים חדשים — וריאציות של תבניות מבחן אמיתיות מהשנים האחרונות (2023–2024), לא העתקים.

פתרונות ומחוון ציון: `mock_exam_08_solutions.md` — **אל תפתחו לפני שניסיתם.**

---

## Question 1 (40 pts) — RNN לינאריים: סכומים אקספוננציאליים, דרגת Hankel וסיבובים

קבעו $L \in \mathbb{N}_{\ge 3}$. עבור $d \in \mathbb{N}$, *השערת RNN לינארית* עם
מימד מצב $d$ מקבלת $x = (x_1, \dots, x_L) \in \mathbb{R}^L$ ומוציאה
$h(x) \in \mathbb{R}$ באמצעות

$$s_0(x) = 0 \in \mathbb{R}^d, \qquad
  \forall t \in [L]:\; s_t(x) = A\, s_{t-1}(x) + B\, x_t, \qquad
  h(x) = C^\top s_L(x),$$

עם משקלים $A \in \mathbb{R}^{d \times d}$ (*מטריצת המעבר*) ו-
$B, C \in \mathbb{R}^d$. נסמן ב-$\mathcal{H}_d$ את מחלקת כל ההשערות מסוג זה. מותר
להשתמש ללא הוכחה בעובדה השימושית

$$h(x) = \sum_{t=1}^{L} C^\top A^{L-t} B\, x_t ,$$

עם המוסכמה $A^0 := I_d$ (בפרט $\lambda^0 := 1$ עבור כל סקלר, כולל
$\lambda = 0$). נוח לקרוא את המקדמים **לאחור**: עבור
$k \in \{0, \dots, L-1\}$ נסמן $c_k := C^\top A^{k} B$ (המקדם של $x_{L-k}$), ונקרא ל-
$c = (c_0, \dots, c_{L-1}) \in \mathbb{R}^L$ *סדרת המקדמים ההפוכה* של $h$. עבור
תת-מחלקה $\mathcal{G} \subseteq \mathcal{H}_d$ תהי $\mathcal{S}(\mathcal{G}) \subseteq \mathbb{R}^L$
קבוצת סדרות המקדמים ההפוכות של ההשערות ב-$\mathcal{G}$ (שתי השערות
עם אותה סדרה הן אותה פונקציה, ולכן הכלות בין מחלקות שקולות
להכלות בין קבוצות ה-$\mathcal{S}$ שלהן). נגדיר את תת-המחלקות

- $\mathcal{H}_d^{diag}$: המטריצה $A$ אלכסונית;
- $\mathcal{H}_d^{diag+}$: המטריצה $A$ אלכסונית וכל איברי האלכסון שלה $\ge 0$;
- $\mathcal{H}_d^{sym}$: המטריצה $A$ סימטרית.

*תזכורת (Vandermonde):* אם $\nu_1, \dots, \nu_m \in \mathbb{R}$ שונים זה מזה בזוגות, אז
המטריצה $V \in \mathbb{R}^{m \times m}$ עם $V_{l,j} = \nu_l^{\,j}$ ($l \in [m]$,
$j \in \{0, \dots, m-1\}$) הפיכה.

1. **(8 pts)** *אי-אוניברסליות כמותית.* תהי $f(x) := |x_1|$. הוכיחו שעבור כל
   $d \in \mathbb{N}$ וכל $h \in \mathcal{H}_d$

   $$\sup_{x \in [-1,1]^L} \big| h(x) - f(x) \big| \;\ge\; 1 ,$$

   ושהערך $1$ מושג על ידי $h \in \mathcal{H}_d$ כלשהי. הסיקו ש-
   $\bigcup_{d \in \mathbb{N}} \mathcal{H}_d$ אינה אוניברסלית: אי אפשר אפילו לקרב פונקציה רציפה
   על הקובייה הקומפקטית לדיוק $\tfrac12$.

2. **(8 pts)** *סכומים אקספוננציאליים.*
   a. **(4 pts)** הוכיחו ש-

      $$\mathcal{S}(\mathcal{H}_d^{diag}) = \Big\{ c \in \mathbb{R}^L :
      \exists\, p, \lambda \in \mathbb{R}^d \ \ \forall k \in \{0, \dots, L-1\}:\;
      c_k = \sum_{i=1}^{d} p_i \lambda_i^{k} \Big\}$$

      (שני הכיוונים), ושהקבוצה $\mathcal{S}(\mathcal{H}_d^{diag+})$ היא אותה קבוצה עם
      הדרישה הנוספת $\lambda \in \mathbb{R}_{\ge 0}^d$.

   b. **(4 pts)** הוכיחו ש-$\mathcal{H}_d^{sym} = \mathcal{H}_d^{diag}$.

3. **(9 pts)** *היררכיה של דרגת Hankel.* עבור $c \in \mathbb{R}^L$ ו-
   $m \in \mathbb{N}$ עם $2m - 1 \le L$, תהי $H_m(c) \in \mathbb{R}^{m \times m}$
   מטריצת Hankel $\big(H_m(c)\big)_{i,j} := c_{i+j}$, $i, j \in \{0, \dots, m-1\}$.

   a. **(5 pts)** הוכיחו: אם $c \in \mathcal{S}(\mathcal{H}_d^{diag})$ אז
      $\mathrm{rank}\, H_m(c) \le d$ עבור כל $m$ המקיים $2m - 1 \le L$.
      *רמז:* כתבו את $H_m(c)$ כמכפלה של שלוש מטריצות.

   b. **(4 pts)** הוכיחו שאם $L \ge 2d + 1$ אז
      $\mathcal{H}_d^{diag} \subsetneq \mathcal{H}_{d+1}^{diag}$ (גם ההכלה וגם
      היותה ממש). *רמז:* נסו את $c_k := \sum_{i=1}^{d+1} i^{\,k}$.

4. **(8 pts)** *מעברים אלכסוניים אי-שליליים לעומת כלליים.*

   a. **(4 pts)** יהי $m \in \mathbb{N}$, יהיו $\mu_1 < \mu_2 < \dots < \mu_m$ ממשיים, ויהי
      $q \in \mathbb{R}^m$ עם $q \ne 0$. הוכיחו שלפונקציה

      $$g(s) := \sum_{j=1}^{m} q_j\, e^{\mu_j s}, \qquad s \in \mathbb{R},$$

      יש לכל היותר $m - 1$ אפסים ממשיים שונים. *רמז:* אינדוקציה על $m$ ומשפט Rolle,
      אחרי הכפלת $g$ בפונקציה חיובית מתאימה.

   b. **(4 pts)** תהי $c^{alt}$ הסדרה המתחלפת $c^{alt}_k := (-1)^k$,
      $k \in \{0, \dots, L-1\}$. הוכיחו ש-$c^{alt} \in \mathcal{S}(\mathcal{H}_1^{diag})$,
      וש-

      $$c^{alt} \in \mathcal{S}(\mathcal{H}_d^{diag+}) \iff d \ge L .$$

      הסיקו ש-$\mathcal{H}_d^{diag+} \subsetneq \mathcal{H}_d^{diag}$ עבור כל
      $d \in \{1, \dots, L-1\}$ — ערך עצמי שלילי יחיד אינו ניתן לחיקוי על ידי $L-1$
      ערכים עצמיים אי-שליליים.

5. **(7 pts)** *סיבובים.* הניחו בסעיף זה $L \ge 4$. תהי

   $$R := \begin{pmatrix} \tfrac12 & -\tfrac{\sqrt3}{2} \\ \tfrac{\sqrt3}{2} & \tfrac12 \end{pmatrix}$$

   (סיבוב בזווית $\pi/3$), ותהי $h^{rot} \in \mathcal{H}_2$ ההשערה עם המשקלים $A = R$,
   $B = C = e_1$.

   a. **(2 pts)** הוכיחו שסדרת המקדמים ההפוכה של $h^{rot}$ היא
      $c_k = \cos(k\pi/3)$, כלומר $c = (1, \tfrac12, -\tfrac12, -1, \dots)$.

   b. **(4 pts)** הוכיחו ש-$h^{rot} \notin \mathcal{H}_2^{sym}$ (באופן שקול, לפי סעיף 2,
      $h^{rot} \notin \mathcal{H}_2^{diag}$). הסיקו ש-
      $\mathcal{H}_2^{sym} \subsetneq \mathcal{H}_2$.

   c. **(1 pt)** הסבירו במשפט או שניים מדוע אי אפשר להשתמש במבחן דרגת ה-Hankel של סעיף 3
      כדי להוכיח את סעיף b.

---

## Question 2 (35 pts) — פירוק סימטרי עם מטרה לא-מוגדרת

יהי $d \in \mathbb{N}_{\ge 2}$ ותהי $W^* \in \mathbb{R}^{d \times d}$ מטריצה סימטרית
עם פירוק עצמי אורתוגונלי

$$W^* = Q\, \mathrm{diag}(\mu_1, \dots, \mu_d)\, Q^\top = \sum_{r=1}^{d} \mu_r\, q_r q_r^\top ,$$

כאשר $Q \in \mathbb{R}^{d \times d}$ אורתוגונלית עם עמודות $q_1, \dots, q_d$. נניח ש-$W^*$
**לא-מוגדרת** (indefinite): $\mu_r > 0$ עבור $r$ כלשהו ו-$\mu_{r'} < 0$ עבור $r'$ כלשהו. נגדיר

$$W^*_+ := \sum_{r:\, \mu_r > 0} \mu_r\, q_r q_r^\top \qquad \text{וגם} \qquad
W^*_- := -\sum_{r:\, \mu_r < 0} \mu_r\, q_r q_r^\top ,$$

כך ש-$W^* = W^*_+ - W^*_-$ כאשר $W^*_+, W^*_-$ הן PSD. נסמן
$L(W) := \|W - W^*\|_F^2$ עבור $W \in \mathbb{R}^{d \times d}$, ו-

$$\phi : \mathbb{R}^{d \times d} \to \mathbb{R}, \qquad \phi(U) := L(UU^\top).$$

gradient flow מורץ על $\phi$: $\dot U(t) = -\nabla \phi(U(t))$, ונסמן
$W(t) := U(t) U(t)^\top$. כמו בכיתה, מותר להניח שלכל משוואה דיפרנציאלית בשאלה זו (מטריציונית
או סקלרית) יש פתרון יחיד, המוגדר וגזיר לכל $t \ge 0$.

1. **(7 pts)** *מה הפירוק יכול להשיג.* הוכיחו שעבור כל
   $U \in \mathbb{R}^{d \times d}$

   $$\phi(U) \;\ge\; \sum_{r:\, \mu_r < 0} \mu_r^2 ,$$

   עם שוויון **אם ורק אם** $UU^\top = W^*_+$ (וששוויון זה ניתן להשגה).
   *רמז:* פתחו את $\|(W - W^*_+) + W^*_-\|_F^2$, והראו ש-$\mathrm{Tr}(UU^\top P) \ge 0$
   עבור כל $P$ שהיא PSD.

2. **(9 pts)** *אתחול מתחלף.*

   a. **(3 pts)** הוכיחו ש-$\nabla \phi(U) = 4\,(UU^\top - W^*)\, U$.

   b. **(6 pts)** נניח $U(0) = Q\, \mathrm{diag}(u_1(0), \dots, u_d(0))\, Q^\top$ עבור
      $u(0) \in \mathbb{R}^d$ כלשהו. הוכיחו שלכל $t \ge 0$

      $$U(t) = Q\, \mathrm{diag}\big(u_1(t), \dots, u_d(t)\big)\, Q^\top, \qquad
      \dot u_r(t) = -4\big(u_r(t)^2 - \mu_r\big)\, u_r(t) \;\; (r \in [d]),$$

      והסיקו ש-$W(t) = Q\, \mathrm{diag}(\lambda_1(t), \dots, \lambda_d(t))\, Q^\top$
      כאשר $\lambda_r(t) := u_r(t)^2$ מקיים

      $$\dot \lambda_r(t) = 8\, \lambda_r(t)\, \big(\mu_r - \lambda_r(t)\big).$$

3. **(11 pts)** *פתרון משוואת הערכים העצמיים.* תהי $\lambda(\cdot)$ הפתרון של
   $\dot \lambda = 8 \lambda (\mu - \lambda)$ עם $\lambda(0) = \lambda_0 \ge 0$, עבור
   $\mu \in \mathbb{R}$ כלשהו.

   a. **(2 pts)** הוכיחו שאם $\lambda_0 = 0$ אז $\lambda \equiv 0$, ואם
      $\lambda_0 > 0$ אז $\lambda(t) > 0$ לכל $t \ge 0$.

   b. **(4 pts)** יהיו $\mu > 0$ ו-$\lambda_0 > 0$. הוכיחו ש-

      $$\lambda(t) = \frac{\mu\, \lambda_0}{\lambda_0 + (\mu - \lambda_0)\, e^{-8\mu t}}
      \qquad \forall t \ge 0,$$

      והסיקו ש-$\lambda(t) \to \mu$ כאשר $t \to \infty$.

   c. **(3 pts)** יהי $\lambda_0 > 0$. הוכיחו שאם $\mu < 0$ אז
      $\lambda(t) \le \lambda_0\, e^{-8|\mu| t}$, ואם $\mu = 0$ אז
      $\lambda(t) = \lambda_0 / (1 + 8 \lambda_0 t)$; בשני המקרים $\lambda(t) \to 0$.

   d. **(2 pts)** חזרה לסעיף 2b. הוכיחו שאם $u_r(0) \ne 0$ לכל $r$, אז
      $W(t) \to W^*_+$ ו-$\phi(U(t)) \to \min \phi$. הראו שאי אפשר לוותר על ההנחה
      $u_r(0) \ne 0$.

4. **(8 pts)** *אתחול קטן.* יהי $U(0) = \alpha I_d$ עם $\alpha \in (0, 1)$ (אתחול
   מתחלף עבור כל $W^*$), ונניח (אחרי מספור מחדש) ש-
$\mu_1 > \mu_2 > 0$ הם שניים מהערכים העצמיים של $W^*$.

   a. **(5 pts)** קבעו $c$ עם $\frac{1}{4\mu_1} < c < \frac{1}{4\mu_2}$ והגדירו
      $t_\alpha := c \ln(1/\alpha)$. הוכיחו ש-

      $$\lim_{\alpha \to 0^+} \lambda_1(t_\alpha) = \mu_1, \qquad
      \lim_{\alpha \to 0^+} \lambda_2(t_\alpha) = 0,$$

      וש-$\lambda_r(t) \le \alpha^2$ לכל $t \ge 0$ בכל פעם ש-$\mu_r \le 0$.

   b. **(3 pts)** פרשו את סעיף a במונחי הדרגה של $W(t)$ לאורך המסלול
      ובסופו (השוו להטיה לדרגה נמוכה של פירוק מטריצות שנדונה בכיתה, הרצאה 8).
      העמידו זאת מול gradient flow המורץ ישירות על $L$ מעל $W$ החל מ-$W(0) = \alpha^2 I_d$:
      פתרו זרימה זו במפורש וציינו את הגבול שלה.

---

## Question 3 (30 pts) — הכללה של רשתות עמוקות באמצעות כיסויים לכל שכבה ודליי נורמה

יהי $K \in \mathbb{N}$ (עומק) ויהיו רוחבים $n_0, n_1, \dots, n_K \in \mathbb{N}$ עם
$n_K = 1$. וקטור פרמטרים הוא $\theta = (W_1, \dots, W_K)$ עם
$W_k \in \mathbb{R}^{n_k \times n_{k-1}}$; יהי $P := \sum_{k=1}^{K} n_k n_{k-1}$ מספר
הפרמטרים. תהי $\sigma : \mathbb{R} \to \mathbb{R}$ פונקציה $1$-Lipschitz עם $\sigma(0) = 0$
(למשל ReLU), המופעלת איבר-איבר. הרשת היא

$$f_\theta(x) := W_K\, \sigma\big(W_{K-1}\, \sigma( \cdots \sigma(W_1 x) \cdots )\big)
\qquad (\text{עבור } K = 1:\ f_\theta(x) = W_1 x),$$

על תחום הקלט $\mathcal{X} := \{ x \in \mathbb{R}^{n_0} : \|x\|_2 \le 1 \}$. עבור
$M > 0$ נגדיר

$$\Theta_M := \big\{ \theta : \|W_k\|_F \le M \ \ \forall k \in [K] \big\}, \qquad
\mathcal{H}_M := \{ f_\theta : \theta \in \Theta_M \}.$$

תהי $D$ התפלגות לא ידועה מעל $\mathcal{X} \times \mathcal{Y}$,
$S = \{(x_n, y_n)\}_{n=1}^{N}$ מדגם i.i.d. מ-$D$, ו-
$\ell : \mathbb{R} \times \mathcal{Y} \to [0,1]$ הפסד שהוא $\rho$-Lipschitz בארגומנט
הראשון שלו. נכתוב $L_D(\theta) := \mathbb{E}_{(x,y) \sim D}[\ell(f_\theta(x), y)]$ ו-
$L_S(\theta) := \frac1N \sum_{n=1}^{N} \ell(f_\theta(x_n), y_n)$. מותר להשתמש בכך ש-
$\|Wz\|_2 \le \|W\|_F \|z\|_2$ עבור כל מטריצה $W$ וכל וקטור $z$.

*תזכורת (מחלקה סופית, כפי שהוכח בכיתה, הרצאה 6):* אם $\mathcal{F}$ קבוצה סופית של
מנבאים שנבחרה באופן בלתי-תלוי ב-$S$, אז עבור כל $\delta \in (0,1)$, בהסתברות של
לפחות $1 - \delta$,

$$\forall f \in \mathcal{F}: \quad L_D(f) - L_S(f) \;\le\;
\sqrt{\frac{\ln(2|\mathcal{F}|/\delta)}{2N}} .$$

*תזכורת (כיסוי כדור אוקלידי):* עבור כל $p \in \mathbb{N}$, $R > 0$ ו-
$\eta \in (0, R]$ קיימת קבוצה סופית $C \subseteq \{v \in \mathbb{R}^p : \|v\|_2 \le R\}$
עם $|C| \le (3R/\eta)^p$, כך שכל $v \in \mathbb{R}^p$ עם $\|v\|_2 \le R$ מקיים
$\|v - v'\|_2 \le \eta$ עבור $v' \in C$ כלשהו. (החילו זאת על מטריצות דרך נורמת
Frobenius, שהיא הנורמה האוקלידית של המטריצה המשוטחת.)

1. **(8 pts)** *Lipschitz-יות בפרמטרים.* הוכיחו שעבור כל $M > 0$ ולכל
   $\theta = (W_1, \dots, W_K)$, $\theta' = (W_1', \dots, W_K') \in \Theta_M$:

   $$\sup_{x \in \mathcal{X}} \big| f_\theta(x) - f_{\theta'}(x) \big|
   \;\le\; M^{K-1} \sum_{k=1}^{K} \big\| W_k - W_k' \big\|_F .$$

   *רמז:* חסמו תחילה את הנורמות של הייצוגים החבויים; אחר כך שנו שכבה אחת
   בכל פעם.

2. **(8 pts)** *כיסוי של מכפלת הכדורים של השכבות.* יהיו $M > 0$ ו-
   $\epsilon \in (0, K M^K]$. הוכיחו שקיימת $\mathcal{F}_M \subseteq \mathcal{H}_M$ סופית
   עם

   $$|\mathcal{F}_M| \le \Big( \frac{3 K M^K}{\epsilon} \Big)^{P}$$

   שהיא $\epsilon$-כיסוי של $\mathcal{H}_M$ בנורמת הסופרמום מעל $\mathcal{X}$, ו-
   הסיקו שעבור כל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$,

   $$\forall \theta \in \Theta_M: \quad L_D(\theta) - L_S(\theta) \;\le\;
   \sqrt{\frac{P \ln\!\big(3 K M^K / \epsilon\big) + \ln(2/\delta)}{2N}} \;+\; 2\rho\epsilon .$$

3. **(8 pts)** *דליי נורמה.* קבעו $\epsilon \in (0, 1]$. עבור וקטור פרמטרים שרירותי
   $\theta$ (ללא אילוץ נורמה) נגדיר $M(\theta) := \max_{k} \|W_k\|_F$ ו-

   $$j(\theta) := \min\big\{ j \in \mathbb{N}_0 : M(\theta) \le 2^j \big\} .$$

   הוכיחו שעבור כל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$,
   בו-זמנית עבור **כל** $\theta$ (עם $j := j(\theta)$):

   $$L_D(\theta) - L_S(\theta) \;\le\;
   \sqrt{\frac{P \ln(3K/\epsilon) + jKP \ln 2 + (j+1)\ln 2 + \ln(2/\delta)}{2N}}
   \;+\; 2\rho\epsilon ,$$

   והראו ש-$j(\theta) \le \log_2 \max\{1, 2M(\theta)\}$.

4. **(6 pts)** *קריאת החסם.*

   a. **(3 pts)** קחו $\epsilon := 1/\sqrt{N}$. הוכיחו שעבור כל $\theta$ קבוע (ועבור
      $K, P, \rho, \delta$ קבועים) החסם של סעיף 3 שואף ל-$0$ כאשר $N \to \infty$, ו-
      ציינו כיצד הוא תלוי בעומק $K$ ובנורמה הנלמדת $M(\theta)$.

   b. **(3 pts)** בארבעה משפטים לכל היותר: מדוע עדיף סעיף 3 על פני הפעלת סעיף 2
      עם $M$ יחיד, כאשר $\theta = \hat\theta$ הוא הפלט של האימון? ומדוע
      החסם בכל זאת אינו אומר דבר עבור הרשתות בעלות פרמטריזציית-יתר שבשימוש בפועל
      (קשרו לדיון בכיתה על מה שחסם הכללה בעל משמעות
      צריך להיות תלוי בו)?
