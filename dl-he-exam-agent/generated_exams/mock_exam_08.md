# מבחן לדוגמה FODL 8 (נוצר 2026-10-28) (שאלה 1 הוחלפה 2026-11-01)

**הפורמט תואם למבחן האמיתי:** 3 שעות · ללא חומר עזר · 3 שאלות · 105 נקודות
(ציון מרבי 100 — 5 הנקודות העודפות הן מרווח, כמו בשנים האחרונות).
כל טענה שהוכחה בכיתה או בתרגול ניתנת לשימוש אם צוטטה במדויק; כל דבר אחר
חייב להיות מוכח. מבנים חדשים — וריאציות של תבניות מבחן אמיתיות מהשנים האחרונות (2023–2024), לא העתקים.

פתרונות ומחוון ציון: `mock_exam_08_solutions.md` — **אל תפתחו לפני שניסיתם.**

---

## Question 1 (40 pts) — פירוקי טנזורים עמוקים מול רדודים: דרגות Kronecker וגאומטריית pooling

סימונים כמו בכיתה (הרצאה 2, §2): $\otimes$ היא המכפלה החיצונית (הטנזורית) ו-$\odot$ היא
מכפלת Kronecker. יהי $M \in \mathbb{N}_{\ge 2}$ ויהי $N = 2^L$ עם $L \in \mathbb{N}_{\ge 2}$
(כלומר $N \ge 4$). פונקציה $f : [M]^N \to \mathbb{R}$ מזוהה עם הטנזור מסדר $N$
$\mathcal{A}_f$ המוגדר על ידי $(\mathcal{A}_f)_{d_1, \dots, d_N} := f(d_1, \dots, d_N)$. עבור
$I \subseteq [N]$, $[\![\mathcal{A}]\!]_I$ היא המטריציזציה של $\mathcal{A}$ (האופנים ב-$I$
ממספרים את השורות), ו-$[\![\mathcal{A}]\!]$ היא המטריציזציה הקנונית, כלומר
$[\![\mathcal{A}]\!]_{I_{odd}}$ עם $I_{odd} := \{1, 3, \dots, N-1\}$. נסמן
$I_{half} := \{1, 2, \dots, N/2\}$. דרגת ההפרדה של $f$ ביחס ל-$I$ היא

$$\mathrm{sep}(f; I) := \min \Big\{ R \in \mathbb{N} \cup \{0\} :
f(d_1, \dots, d_N) = \sum_{\nu=1}^{R} g_\nu\big((d_i)_{i \in I}\big)\,
\bar g_\nu\big((d_i)_{i \notin I}\big) \Big\},$$

כאשר המינימום הוא על פני כל הפונקציות $g_\nu, \bar g_\nu$ (סכום ריק הוא פונקציית האפס).

**שתי הרשתות.** הרשת ה*רדודה* ברוחב $Z$ (pooling מכפלה גלובלי) מממשת
בדיוק את טנזורי ה-CP

$$\mathcal{A} = \sum_{z=1}^{Z} a_z \cdot \mathbf{a}^{z,1} \otimes \mathbf{a}^{z,2} \otimes \cdots
\otimes \mathbf{a}^{z,N}$$

עם $a_z \in \mathbb{R}$ ו-$\mathbf{a}^{z,i} \in \mathbb{R}^M$.

הרשת ה*עמוקה* עם רוחבים חבויים $r_0, \dots, r_{L-1}$ (pooling מכפלה בגודל 2 על
הזוגות $\{2j-1, 2j\}$, כמו בכיתה) מממשת בדיוק את הטנזורים של רקורסיית Hierarchical Tucker (HT)
(הרצאה 2, Prop 4):

$$\Phi^{1,j,\gamma} = \sum_{\alpha=1}^{r_0} a^{1,j,\gamma}_\alpha \cdot \mathbf{a}^{0,2j-1,\alpha} \otimes \mathbf{a}^{0,2j,\alpha}$$

עבור $j \in [N/2]$ ו-$\gamma \in [r_1]$; אחר כך, עבור $l \in \{2, \dots, L-1\}$ (אין $l$ כזה
כאשר $L = 2$), $j \in [N/2^l]$ ו-$\gamma \in [r_l]$,

$$\Phi^{l,j,\gamma} = \sum_{\alpha=1}^{r_{l-1}} a^{l,j,\gamma}_\alpha \cdot \Phi^{l-1,2j-1,\alpha} \otimes \Phi^{l-1,2j,\alpha};$$

ולבסוף

$$\mathcal{A} = \sum_{\alpha=1}^{r_{L-1}} a^{L}_\alpha \cdot \Phi^{L-1,1,\alpha} \otimes \Phi^{L-1,2,\alpha},$$

עם $\mathbf{a}^{0,i,\alpha} \in \mathbb{R}^M$, $\mathbf{a}^{l,j,\gamma} \in \mathbb{R}^{r_{l-1}}$
ו-$\mathbf{a}^{L} \in \mathbb{R}^{r_{L-1}}$. כל $\Phi^{l,j,\gamma}$ הוא מסדר $2^l$.

**מותר להשתמש ללא הוכחה ב:** לינאריות המטריציזציה; Lemma 3 מהכיתה,

$$[\![\mathcal{T} \otimes \bar{\mathcal{T}}]\!]_I =
[\![\mathcal{T}]\!]_{I \cap [n]} \odot [\![\bar{\mathcal{T}}]\!]_{(I - n) \cap [\bar n]}$$

עבור טנזורים מסדרים $n, \bar n$ (ובפרט
$[\![\mathcal{T} \otimes \bar{\mathcal{T}}]\!] = [\![\mathcal{T}]\!] \odot [\![\bar{\mathcal{T}}]\!]$
כאשר $n, \bar n$ זוגיים); Prop 7 מהכיתה, $\mathrm{sep}(f; I) = \mathrm{rank}\,[\![\mathcal{A}_f]\!]_I$;
תכונת המכפלה המעורבת $(A \odot B)(C \odot D) = (AC) \odot (BD)$; $I_m \odot I_n = I_{mn}$;
$\mathrm{rank}(X + Y) \le \mathrm{rank}\,X + \mathrm{rank}\,Y$; ו*הצורה הנורמלית של הדרגה*: אם
ל-$A \in \mathbb{R}^{m_1 \times m_2}$ יש דרגה $r$, קיימות $P, Q$ הפיכות עם
$PAQ = J_r$, כאשר ל-$J_r \in \mathbb{R}^{m_1 \times m_2}$ יש $(J_r)_{i,i} = 1$ עבור $i \in [r]$
וכל שאר האיברים $0$. **אין** לצטט את Lemma 2 (כפליות הדרגה) — סעיף 1 מבקש
להוכיח אותה.

לאורך כל השאלה קבעו $G \in \mathbb{R}^{M \times M}$ עם $\rho := \mathrm{rank}\,G \ge 1$, והגדירו

$$f_G(d_1, \dots, d_N) := \prod_{j=1}^{N/2} G_{d_{2j-1},\, d_{2j}},$$

כלומר (כאשר $G$ נתפסת כטנזור מסדר 2)

$$\mathcal{A}_{f_G} = \underbrace{G \otimes G \otimes \cdots \otimes G}_{N/2 \text{ factors}}.$$

לדוגמה, $G = I_M$ נותנת
$f_{I_M}(d) = \prod_j \mathbb{1}[d_{2j-1} = d_{2j}]$.

1. **(7 pts)** *דרגת Kronecker.* הוכיחו שלכל $A \in \mathbb{R}^{m_1 \times m_2}$ ולכל
   $B \in \mathbb{R}^{n_1 \times n_2}$

   $$\mathrm{rank}(A \odot B) = \mathrm{rank}(A) \cdot \mathrm{rank}(B).$$

   *רמז:* צמצמו למקרה $J_r \odot J_s$, והראו שהאיברים השונים מאפס שלה נמצאים בשורות שונות
   ובעמודות שונות.

2. **(8 pts)** *דרגות ההפרדה של $f_G$.* מותר להשתמש בסעיף 1.

   a. **(5 pts)** הוכיחו ש-
      $[\![\mathcal{A}_{f_G}]\!] = G \odot G \odot \cdots \odot G$ ($N/2$ גורמים), והסיקו
      ש-$\mathrm{sep}(f_G; I_{odd}) = \rho^{N/2}$.

   b. **(3 pts)** הוכיחו ש-$\mathrm{sep}(f_G; I_{half}) = 1$.

3. **(8 pts)** *רשת עמוקה קטנה.* כתבו $G = \sum_{\alpha=1}^{\rho} \mathbf{u}^\alpha (\mathbf{v}^\alpha)^\top$
   עם $\mathbf{u}^\alpha, \mathbf{v}^\alpha \in \mathbb{R}^M$ (אפשרי כי
   $\mathrm{rank}\,G = \rho$). תנו השמה מפורשת של הרשת העמוקה שבה כל הרוחבים החבויים
   שווים ל-$\rho$ והמממשת את $f_G$, והוכיחו שהיא אכן מממשת אותה (אינדוקציה על
   רמות רקורסיית ה-HT).

4. **(9 pts)** *הרשת הרדודה זקוקה בדיוק ל-$\rho^{N/2}$.* מותר להשתמש בכך ש-
   $\mathrm{rank}\,[\![\mathcal{A}_{f_G}]\!] = \rho^{N/2}$ (סעיף 2a) ובסעיף 1.

   a. **(5 pts)** הוכיחו שכל טנזור $\mathcal{A}$ שהרשת הרדודה ברוחב
      $Z$ מממשת מקיים $\mathrm{rank}\,[\![\mathcal{A}]\!] \le Z$. הסיקו שהרשת הרדודה
      מממשת את $f_G$ רק אם $Z \ge \rho^{N/2}$.

   b. **(4 pts)** תנו השמה מפורשת של הרשת הרדודה ברוחב $Z = \rho^{N/2}$
      המממשת את $f_G$, והוכיחו זאת. הסיקו, יחד עם סעיף 3, שעבור $\rho \ge 2$
      הרשת העמוקה מממשת את $f_G$ ברוחב $\rho \le M$ בעוד הרשת הרדודה זקוקה
      לרוחב אקספוננציאלי ב-$N$.

5. **(8 pts)** *גאומטריית pooling.* תהי $P : [M]^N \to \mathbb{R}$ פונקציית האינדיקטור
   של *פלינדרום*

   $$P(d_1, \dots, d_N) := \prod_{i=1}^{N/2} \mathbb{1}\big[d_i = d_{N+1-i}\big].$$

   a. **(5 pts)** הוכיחו שכל טנזור $\mathcal{A}$ שהרשת העמוקה מממשת מקיים
      $\mathrm{rank}\,[\![\mathcal{A}]\!]_{I_{half}} \le r_{L-1}$. חשבו את
      $\mathrm{sep}(P; I_{half})$, והסיקו שהרשת העמוקה מממשת את $P$ רק אם
      $r_{L-1} \ge M^{N/2}$.

   b. **(3 pts)** מצאו תמורה $\pi$ של $[N]$ כך ש-
      $P(d_1, \dots, d_N) = f_{I_M}(d_{\pi(1)}, \dots, d_{\pi(N)})$ לכל
      $d \in [M]^N$. הסיקו שהרשת העמוקה עם *גאומטריית ה-pooling המסודרת מחדש* (אותה
      רשת כשמזינים לה את $(d_{\pi(1)}, \dots, d_{\pi(N)})$) מממשת את $P$ כאשר כל הרוחבים
      החבויים שווים ל-$M$, והסבירו במשפט אחד מה זה אומר על ההטיה האינדוקטיבית
      שקובעת גאומטריית ה-pooling.

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
