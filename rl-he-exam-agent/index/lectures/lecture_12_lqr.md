# הרצאה 12 — בקרה לינארית (LQR)

**File:** materials/lectures/lecture_12_lqr.pdf
**Pillar:** Planning
**Summary:** פותרת את בעיית הבקרה במרחב מצבים רציף עם **דינמיקה לינארית** $x_{t+1}=Ax_t+Bu_t$ ו**עלות ריבועית** באמצעות תכנון דינמי. תוצאה מרכזית: העלות-לעתיד (cost-to-go) האופטימלית היא ריבועית $V_t^*(x)=x^\top P_t x$ והבקרה האופטימלית היא **לינארית** $u_t^*=-K_t x_t$, כאשר $P_t$ נתון על ידי **רקורסיית Riccati** לאחור (אופק אינסופי → משוואת Riccati אלגברית). מכסה גם בקירות (controllability), יציבות, LQG (רעש גאוסי), ורדוקציות של מערכות אפיניות/חלקות/תלויות-זמן/לא-לינאריות ל-LQR. נושא בעל ערך גבוה במבחן משום שהרקורסיה מכנית ובודקת את עצמה.

## Outline

- דינמיקה לינארית: דוגמה פיזיקלית (מסוק) → מערכת LTI $x_{t+1}=Ax_t+Bu_t$.
- בעיית LQR: עלות ריבועית עם $Q,R\succeq0$ סימטריות, סופית $Q_f\succ0$.
- טרייד-אוף עלות בין דיוק מצב לאנרגיית בקרה ($R=\rho I$, $Q=C^\top C$).
- משפט הבקרה האופטימלית באופק סופי באמצעות DP + רקורסיית Riccati; דוגמת $2\times2$ פתורה.
- אופק אינסופי: אופטימליות Bellman → משוואת Riccati אלגברית (ARE).
- בקירות (הישגיות, Cayley-Hamilton, $C=[B\ AB\ \dots\ A^{n-1}B]$ בעלת דרגה מלאה).
- יציבות: ערכים עצמיים של $A-BK$ בתוך/מחוץ למעגל היחידה.
- הרחבות: מערכת אפינית, חלקות (קנס $\Delta u_t$), LQG (רעש גאוסי), תלוית-זמן (LTV), לא-לינארית (לינאריזציה סביב $x^*$).
- לימוד המערכת: ריבועים פחותים רגילים ורקורסיביים עבור $(A,B)$.
- יישום: אקרובטיקה מוטסת אוטונומית של מסוק (חניכה + LQR).

## Key definitions

**Def (linear time-invariant (LTI) dynamics).** מצב $x\in\mathbb R^n$, בקרה $u\in\mathbb R^d$, דינמיקה דטרמיניסטית $x_{t+1}=Ax_t+Bu_t$ עם מטריצות קבועות $A\in\mathbb R^{n\times n}$, $B\in\mathbb R^{n\times d}$. כ-MDP: $p(x'\mid x,u)=1$ אם ורק אם $x'=Ax+Bu$.

**Def (LQR problem — finite horizon).** מזער על פני $u_0,\dots,u_{T-1}$
$$J(u_0,\dots,u_{T-1},x_0)=\sum_{t=0}^{T-1}\big(x_t^\top Q x_t+u_t^\top R u_t\big)+x_T^\top Q_f x_T$$
בכפוף ל-$x_{t+1}=Ax_t+Bu_t$. כאן $x_t^\top Q x_t$ הוא עלות המצב (סטייה מהמצב הרצוי), $u_t^\top R u_t$ הוא עלות קלט-הבקרה, $x_T^\top Q_f x_T$ הוא העלות הסופית. תנאים: $Q,R$ סימטריות חיוביות למחצה ($Q=Q^\top$, $R=R^\top$, $Q,R\succeq0$), $Q_f$ חיובית מובהקת. ($R\succ0$ הוא מה שהופך את עלות-הבקרה להפיכה ברקורסיה.)

**Def (cost-to-go / value function).**

$$J(u_t,\dots,u_{T-1},x_t)=\sum_{i=t}^{T-1}(x_i^\top Q x_i+u_i^\top R u_i)+x_T^\top Q_f x_T$$

העלות-לעתיד האופטימלית היא 

$$V_t^*(x_t)=\min_{u_t,\dots,u_{T-1}}J(\cdot,x_t)$$

לפי עקרון האופטימליות פתרון אופטימלי על $[0,T]$ הוא אופטימלי על כל סיפא $[t,T]$.

**Def (controllability).** המערכת בקירה אם מכל $x_0$ ניתן להגיע לכל יעד $x_D$ באמצעות איזושהי סדרת בקרה $u_0,u_1,\dots$. מאחר ש-

$$x_{t+1}=A^{t+1}x_0+\sum_{i=0}^{t}A^iB\,u_{t-i}$$

די בכך שמטריצת הבקירות 

$$C=[\,B\ \ AB\ \ A^2B\ \ \cdots\ \ A^{n-1}B\,]$$

 בעלת דרגה מלאה (לפי Cayley-Hamilton, חזקות $A^{\ge n}$ אינן מוסיפות דבר חדש). $C$ בעלת דרגה מלאה ⇒ ל-ARE יש פתרון.

**Def (stability).** תחת החוק האופטימלי $u^*=-Kx$, הלולאה הסגורה היא $x_{t+1}=(A-BK)x_t$, ולכן $x_t=(A-BK)^t x_0$. באלכסון $A-BK=M\Lambda M^{-1}$: אם כל ערך עצמי $|\lambda_i|<1$ המערכת מתכנסת ל-$0$ (**יציבה**); אם קיים $|\lambda_i|>1$ היא מתבדרת (**לא-יציבה**).

**Def (Linear Quadratic Gaussian, LQG).** LQR עם רעש תהליך גאוסי אדיטיבי: $x_{t+1}=Ax_t+Bu_t+w_t$, $w_t\sim N(0,W)$, העלות נלקחת בתוחלת. הערך האופטימלי מרוויח היסט קבוע: $V_t^*(x_t)=x_t^\top P_t x_t+m_t$.

## Key theorems & results

**Thm (LQR optimal control — finite horizon; THE Riccati recursion).** העלות-לעתיד והבקרה האופטימליות בזמן $t$ הן
$$V_t^*(x_t)=x_t^\top P_t x_t,\qquad u_t^*=-K_t x_t,$$
כאשר, מחושבות **לאחור** מ-$P_T=Q_f$,
$$K_t=\big(R+B^\top P_{t+1}B\big)^{-1}B^\top P_{t+1}A,$$
$$P_t=Q+K_t^\top R\,K_t+(A-BK_t)^\top P_{t+1}(A-BK_t),\qquad P_T=Q_f.$$
כל $P_t$ סימטרית, חיובית מובהקת, והפיכה ($P_t=P_t^\top$, $x^\top P_t x>0$ עבור $x\ne0$).

**Proof idea:** אינדוקציה לאחור. בסיס $t=T$: $V_T^*=x_T^\top Q_f x_T$ ולכן $P_T=Q_f$. צעד: הצב $V_t^*(x)=x^\top P_t x$ בתוך

$$V_{t-1}^*(x)=\min_u\{x^\top Q x+u^\top R u+(Ax+Bu)^\top P_t(Ax+Bu)\}$$

הצב 

$$\nabla_u=2u^\top R+2(Ax+Bu)^\top P_t B=0$$

 כדי לקבל 

$$u^*=-(R+B^\top P_t B)^{-1}B^\top P_t A\,x=-K_{t-1}x$$

 (הפיך מאחר ש-

$$P_t\succ0\Rightarrow R+B^\top P_t B\succ0$$

); הצב חזרה כדי לקבל

$$P_{t-1}=Q+K_{t-1}^\top R K_{t-1}+(A-BK_{t-1})^\top P_t(A-BK_{t-1})$$

שהיא סימטרית חיובית מובהקת.

**Exam relevance:** התוצאה המרכזית — צפה להריץ צעד אחד או שניים של הרקורסיה הזו לאחור ביד ולנסח שהבקר האופטימלי לינארי. שמר על הרקורסיה בדיוק; טעות סימן ב-$K_t$ או ב-$A-BK_t$ היא המלכודת הקלאסית.

**Thm (LQR infinite horizon → Algebraic Riccati Equation).** עבור $T=\infty$ (בהנחה ש-$x_t\to0$ הישיג, כך שהעלויות סופיות) קיימות מטריצות **סטציונריות** $P,K$ עם $V^*(x)=x^\top P x$ ו-$u_t^*=-Kx_t$, כאשר
$$K=\big(R+B^\top P B\big)^{-1}B^\top P A,$$
$$P=Q+A^\top P A-A^\top P B\big(R+B^\top P B\big)^{-1}B^\top P A\quad(\textbf{ARE}).$$

**Proof idea:** אופטימליות Bellman

$$V^*(x)=\min_u\{x^\top Q x+u^\top R u+(Ax+Bu)^\top P(Ax+Bu)\}$$

מזעור על $u$ נותן $u^*=-Kx$, הצבה חזרה ודרישה שהזהות תתקיים לכל $x$ מניבה את ה-ARE (נקודת השבת של רקורסיית האופק הסופי כאשר $t\to-\infty$).

**Exam relevance:** דע שהרקורסיה תלוית-הזמן מתכנסת ל-$P$ הסטציונרי של ה-ARE; בקירות מבטיחה שקיים פתרון.

**Thm (LQG — noise does not change the optimal control).** עבור $x_{t+1}=Ax_t+Bu_t+w_t$, $w_t\sim N(0,W)$: הבקרה האופטימלית עדיין $u_t^*=-K_t x_t$ עם **אותו** $K_t$ ו**אותו** Riccati $P_t$ כמו LQR ללא רעש; רק הערך מרוויח קבוע אדיטיבי $V_t^*(x_t)=x_t^\top P_t x_t+m_t$ עם $m_{t-1}=m_t+\mathrm{Tr}(W P_t)$, $m_T=0$.

**Proof idea:** אינדוקציה לאחור;

$$E[(Ax+Bu+w)^\top P_t(Ax+Bu+w)]=(Ax+Bu)^\top P_t(Ax+Bu)+E[w^\top P_t w]$$

ו-$E[w^\top P_t w]=\mathrm{Tr}(WP_t)$ בלתי תלוי ב-$u$, ולכן הממזער אינו משתנה.

**Exam relevance:** "מדוע הבקרה האופטימלית בלתי תלויה ב-$W$?" היא שאלה מושגית חביבה — איבר הרעש הוא קבוע-אדיטיבי, אינו נוגע במזעור-$u$ (certainty equivalence).

**Thm (controllability ⇒ ARE solvable; sufficiency of $n$ columns).** אם $C=[B\ AB\ \cdots\ A^{n-1}B]$ בעלת דרגה מלאה המערכת בקירה ול-ARE יש פתרון. לפי Cayley-Hamilton $A^n$ הוא צירוף לינארי של $I,A,\dots,A^{n-1}$ (מהפולינום האופייני $p(\lambda)=\det(\lambda I-A)$), ולכן ערימה מעבר ל-$A^{n-1}B$ אינה מוסיפה דרגה.

**Proof idea:** כתוב $x_{t+1}=A^{t+1}x_0+CU^\top$ עם $U=(u_t^\top,\dots,u_0^\top)$; $C$ בעלת דרגה מלאה מאפשרת ל-$CU^\top$ לפגוע בכל יעד.

**Exam relevance:** חשב מטריצת בקירות $2\times2$ או $2\times3$ ובדוק את דרגתה; זהה את שתי דוגמאות הנגד הבלתי-בקירות / הבלתי-מייצבות למטה.

## טכניקות וטריקים

- **הרצת רקורסיית Riccati ביד (לאחור):** אתחל $P_T=Q_f$; ואז עבור $t=T{-}1,\dots,0$: (1) צור $R+B^\top P_{t+1}B$ והפוך אותה; (2) 

  $$K_t=(R+B^\top P_{t+1}B)^{-1}B^\top P_{t+1}A$$

(3) 

  $$P_t=Q+K_t^\top R K_t+(A-BK_t)^\top P_{t+1}(A-BK_t)$$

הבקרה האופטימלית היא $u_t^*=-K_t x_t$, לולאה סגורה $x_{t+1}=(A-BK_t)x_t$.
- **דוגמת $2\times2$ פתורה (מאומתת בפייתון).** 

  $$A=\left(\begin{smallmatrix}1&2\\0&1\end{smallmatrix}\right)$$

   $$B=\left(\begin{smallmatrix}2\\2\end{smallmatrix}\right)$$

$R=1$, $Q=\left(\begin{smallmatrix}1&1\\1&1\end{smallmatrix}\right)$ $$P_T=Q_f=\left(\begin{smallmatrix}100&0\\0&100\end{smallmatrix}\right)$$

אזי $R+B^\top P_T B=801$; $K_{T-1}=\frac1{801}B^\top P_T A=\big[\tfrac{200}{801},\tfrac{600}{801}\big]\approx[0.2497,0.7491]$ $$A-BK_{T-1}=\left(\begin{smallmatrix}401/801&402/801\\-400/801&-399/801\end{smallmatrix}\right)\approx\left(\begin{smallmatrix}1/2&1/2\\-1/2&-1/2\end{smallmatrix}\right)$$ $K_{T-1}^\top R K_{T-1}\approx\left(\begin{smallmatrix}1/16&3/16\\3/16&9/16\end{smallmatrix}\right)$ ; ו- $P_{T-1}=Q+K_{T-1}^\top R K_{T-1}+(A-BK_{T-1})^\top P_T(A-BK_{T-1})\approx\left(\begin{smallmatrix}51.06&51.19\\51.19&51.56\end{smallmatrix}\right)$ (סימטרית, ערכים עצמיים $\approx0.12,102.5>0$, המאשרים חיוביות מובהקת).
- **בדיקת שפיות של מסלול המסוק (מאומתת בפייתון):** 

  $$A=\left(\begin{smallmatrix}1&2\\0&1\end{smallmatrix}\right)$$

   (מ-$\tau=2$), 

  $$B=\left(\begin{smallmatrix}2\\2\end{smallmatrix}\right)$$

$x_0=(0,0)$; $u_1=1\Rightarrow x_1=(2,2)$; $u_2=-1\Rightarrow x_2=(4,0)$ (מגיע לגובה $h_D=4$ עם מהירות אפס).
- **רדוקציות ל-LQR פשוט:**
 - *אפיני* $x_{t+1}=Ax_t+Bu_t+c$: הרחב $z_t=\binom{x_t}{1}$, 

  $$A'=\left(\begin{smallmatrix}A&c\\0&1\end{smallmatrix}\right)$$

$B'=\binom{B}{0}$ — הבקרה נשארת לינארית.
 - *חלקות* (קנוס $\Delta u_t=u_t-u_{t-1}$): הרחב את המצב עם $u_{t-1}$, קח פעולה $\Delta u_t$; $z_t=\binom{x_t}{u_{t-1}}$, 

  $$A'=\left(\begin{smallmatrix}A&B\\0&I\end{smallmatrix}\right)$$

$B'=\binom{B}{I}$, 

  $$Q'=\left(\begin{smallmatrix}Q&0\\0&R\end{smallmatrix}\right)$$

   - *תלוית-זמן (LTV)* $x_{t+1}=A_t x_t+B_t u_t$: אותה רקורסיה עם $A_t,B_t$; $u_t^*=-K_t x_t$, $V_t^*=x_t^\top P_t x_t$.
 - *לא-לינארית* $x_{t+1}=f(x_t,u_t)$: בחר שיווי משקל $x^*=f(x^*,u^*)$, לינאריזציה 

  $$A=\frac{\partial f}{\partial x}\big|_{x^*,u^*}$$

   $$B=\frac{\partial f}{\partial u}\big|_{x^*,u^*}$$

עם $z_t=x_t-x^*$, $v_t=u_t-u^*$ פתור LQR, מה שנותן $u_t=u^*-K(x_t-x^*)$.
- **לימוד $(A,B)$ מנתונים:** ערום $z_t=(x_t,u_t)$, מטרות $x_{t+1}$; ריבועים פחותים רגילים $\hat M=(Z^\top Z)^{-1}Z^\top X$ עם $M=\binom{A}{B}$ (דורש ש-$Z^\top Z$ הפיכה / עירור מספק). ריבועים פחותים רקורסיביים מעדכנים $\Phi_t=Z_t^\top Z_t$, $\Psi_t=Z_t^\top X_t$ מקוון (online) באמצעות עדכון דרגה-1 של Sherman-Morrison 

 $$\Phi_{t+1}^{-1}=\Phi_t^{-1}-\frac{\Phi_t^{-1}z_{t+1}z_{t+1}^\top\Phi_t^{-1}}{1+z_{t+1}^\top\Phi_t^{-1}z_{t+1}}$$

## נקודות רלוונטיות למבחן

- העלות-לעתיד האופטימלית היא **ריבועית** $x^\top P_t x$; הבקרה האופטימלית היא **לינארית** $u_t^*=-K_t x_t$ — שנן את שתי הצורות ואת שתי משוואות הרקורסיה.
- מוסכמות סימן: $u_t^*=-K_t x_t$ (מינוס), והלולאה הסגורה היא $A-BK_t$. $K_t$ משתמש ב-$P_{t+1}$ (המטריצה של הצעד *הבא*), בעוד $P_t$ מערבב הן את $K_t$ והן את $P_{t+1}$.
- ההפיכות תלויה ב-$R+B^\top P_{t+1}B\succ0$, המתקיים משום ש-$R\succeq0$ ו-$P_{t+1}\succ0$ (חיוביות מובהקת נשמרת על ידי הרקורסיה מ-$Q_f\succ0$).
- אופק אינסופי משתמש בפתרון ה-ARE ה**סטציונרי** $P$ (ללא תת-סקריפט $t$); ה-$P_t$ של האופק הסופי מתכנס אליו ככל שהאופק גדל.
- **certainty equivalence של LQG:** רעש גאוסי משאיר את הגיין האופטימלי $K_t$ ואת Riccati $P_t$ ללא שינוי; הוא רק מוסיף $m_{t-1}=m_t+\mathrm{Tr}(WP_t)$ לערך (ולכן העלות האופטימלית אינה אפס אפילו ביעד בגלל הרעש).
- בדיקת בקירות = דרגת $C=[B\ AB\ \cdots\ A^{n-1}B]$. דוגמה בלתי-בקירה: $A=I$, $B=\binom11$ (ניתן לזוז רק לאורך הכיוון $(1,1)$). דוגמה הישיגה-אך-לא-מייצבת: 

  $$A=\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$$

$B=\binom11$ — ניתן להגיע ליעד אך לא תמיד להישאר בו (דינמיקת ההחלפה דוחפת אותך ממנו).
- יציבות = רדיוס ספקטרלי של $A-BK$: כל $|\lambda_i|<1$ ⇒ מתכנס ל-$0$; כל $|\lambda_i|>1$ ⇒ מתבדר.
- פרמטריזציית עלות נפוצה: $R=\rho I$, $Q=C^\top C$, פלט $y_t=Cx_t$, עלות 

  $$\sum_t\lVert y_t\rVert^2+\rho\sum_t\lVert u_t\rVert^2$$

   עם $\rho$ הטרייד-אוף דיוק-מול-אנרגיה.
- אינטואיציית עלות-תנועה ($A=B=I$, עלות בקרה בלבד): פיזור התנועה באופן שווה על פני $T$ צעדים ($u_t=\frac{x_{final}-x_0}{T}$) עולה $\frac1T\lVert x_{final}-x_0\rVert^2$, זול בפי $T$ מצעד גדול אחד — העלות הריבועית מתגמלת בקרה חלקה.
- יישום (אקרובטיקת מסוק): בנה מודל דינמיקה לינארי בסיסי מ-~20 דקות של נתוני מומחה, שכלל לכל תמרון באמצעות למידת חניכה, למד תגמול המקנס סטייה ממסלול המטרה, ואז הרץ LQR/LQG (אופקים של 2 שניות, לינאריזציה מחדש) לא-מקוון (offline) — עלה על מומחים אנושיים.
