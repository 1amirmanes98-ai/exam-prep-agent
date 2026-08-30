# הרצאה 3 — אופטימיזציה 1
- **File:** materials/lectures/lecture_03_optimization_1.pdf | **Text:** materials/text/lectures/lecture_03_optimization_1.txt
- **Pillar:** Optimization
- **One-paragraph summary:** מבססת שמטרות האימון של למידה עמוקה אינן קמורות מטבען (טיעון סימטריית-תמורה העובד עבור *כל* אקטיבציה, אפילו לינארית), ואז מפתחת את **גישת הנוף**: אם למטרה לא-קמורה אין מינימות מקומיות גרועות ואין אוכפים לא-ממש, GD אמור להגיע למינימום גלובלי. שני העקרונות התומכים מוכחים כמותית: (i) על כל מטרה $\beta$-חלקה, GD עם גודל צעד $\eta \le 1/\beta$ מגיע לנקודה $\epsilon$-סטציונרית בתוך $2(f(w_0)-f^*)/(\eta\epsilon^2)$ צעדים; (ii) על המודל הריבועי (טיילור מסדר שני) של אוכף ממש, GD נמלט בזמן לוגריתמי בהסתברות גבוהה על פני הפרעה אקראית. אלה משולבים במשפט ה-Perturbed GD (PGD) של Jin et al. (התכנסות לנקודות $\epsilon$-סטציונריות מסדר שני). גישת הנוף אז נבחנת על רשתות נוירונים לינאריות (LNN): הגרדיאנט וה-Hessian של $\phi(W_1,\dots,W_N)=\ell(W_N\cdots W_1)$ מחושבים, "אין מינימות מקומיות גרועות" מוכח לכל עומק (Laurent & Brecht), כל הנקודות הסטציונריות הלא-גלובליות הן אוכפים ממש בעומק 2 (Nouiehed & Razaviyayn), **אך** בעומק $N\ge 3$ קיימים אוכפים לא-ממש (בראשית) — כך שגישת הנוף נכשלת כבר עבור המודלים העמוקים הפשוטים ביותר, ומניעה את גישת המסלול של הרצאה 4.

## Outline
1. **אופטימיזציה בלמידה עמוקה אינה קמורה** — כל הפסד התלוי בפרמטרים רק דרך העתקת הקלט-פלט של הרשת אינו קמור (Prop 1 באמצעות סימטריית תמורה; Prop 2 וריאנט עם הנחות מתונות שונות).
2. **גישת הנוף** — הנחת יסוד: אין מינימות מקומיות גרועות + אין אוכפים לא-ממש $\Rightarrow$ GD/SGD מגיעים למינימות גלובליות; בנויה על שני עקרונות (הגעה לנקודות סטציונריות; מילוט מאוכפים ממש).
   - 2.1 **התכנסות לנקודה סטציונרית** — $\beta$-חלקוּת (Def 1), אופרטור Hessian בי-לינארי (Def 2), $\epsilon$-סטציונריות (Def 3); למת הירידה (Lem 1-2); GD מגיע לנקודה $\epsilon$-סטציונרית ב-$O(1/\epsilon^2)$ צעדים (Thm 1).
   - 2.2 **מילוט מנקודות אוכף ממש** — אוכף ממש (Def 4), $\epsilon$-מילוט (Def 5); GD על המודל הריבועי נמלט מאוכף ממש בזמן לוגריתמי, בהסתברות גבוהה תחת אתחול איזוטרופי אקראי סביב האוכף.
   - 2.3 **חיבור הכול יחד** — $\rho$-Hessian Lipschitz ונקודות $\epsilon$-סטציונריות מסדר שני (Def 6); אלגוריתם Perturbed Gradient Descent (PGD) והערובה שלו (Thm 2, Jin et al.).
   - 2.4 **דוגמה: רשתות נוירונים לינאריות** — 2.4.1 הגרדיאנט וה-Hessian של המטרה בעלת פרמטריזציית-היתר (Eqs. (2)-(3)); 2.4.2 אין מינימות מקומיות גרועות (Thm 3); 2.4.3 עומק 2: כל נקודה סטציונרית לא-גלובלית היא אוכף ממש (Thm 4); עומק $\ge 3$: קיימים אוכפים לא-ממש (Prop 3), כך שגישת הנוף אינה מתאימה לרשתות עמוקות.

## Key definitions
**Def (network family for the non-convexity result).** רשת נוירונים מחוברת-לחלוטין הזנה-קדימה עם אקטיבציה $\sigma(\cdot)$:
$$\mathcal{H} = \left\{\, x \mapsto y = W_N\,\sigma\big(W_{N-1}\,\sigma(\dots W_2\,\sigma(W_1 x)\dots)\big) \;:\; \forall n \in [N],\ W_n \in \mathbb{R}^{d_n,d_{n-1}} \right\}.$$
(פרוזת הסיכומים אומרת "עומק 2" אך המשפחה המוצגת ו-Props 1-2 הם עבור עומק כללי $N$.)

**Def 1 ($\beta$-smoothness).** יהי $\beta > 0$. פונקציה גזירה $f:\mathbb{R}^d \to \mathbb{R}$ היא *$\beta$-חלקה* כאשר הגרדיאנט שלה הוא $\beta$-Lipschitz: עבור כל $w_1, w_2 \in \mathbb{R}^d$,
$$\|\nabla f(w_1) - \nabla f(w_2)\| \le \beta\,\|w_1 - w_2\|,$$
כאשר $\|\cdot\|$ על וקטורים היא הנורמה האוקלידית.

**Def 2 (Hessian as a bilinear operator).** עבור $f:\mathbb{R}^d\to\mathbb{R}$ גזירה ברציפות פעמיים ו-$w \in \mathbb{R}^d$, האופרטור הבי-לינארי הסימטרי המתאים ל-Hessian של $f$ ב-$w$ הוא $\nabla^2 f(w)[\cdot,\cdot] : \mathbb{R}^d \times \mathbb{R}^d \to \mathbb{R}$,
$$\nabla^2 f(w)[u,v] := u^\top \nabla^2 f(w)\, v ,$$
כאשר $\nabla^2 f(w) \in \mathbb{R}^{d,d}$ היא מטריצת ה-Hessian של הנגזרות השניות.

**Def 3 ($\epsilon$-stationary point).** יהי $\epsilon \ge 0$ ו-$f:\mathbb{R}^d \to \mathbb{R}$ גזירה. נקודה $w \in \mathbb{R}^d$ היא *נקודה $\epsilon$-סטציונרית* של $f(\cdot)$ כאשר $\|\nabla f(w)\| \le \epsilon$. "נקודה סטציונרית" היא המקרה $\epsilon = 0$.

**Def 4 (strict saddle).** תהי $f:\mathbb{R}^d \to \mathbb{R}$ גזירה ברציפות פעמיים ותהי $w$ נקודה סטציונרית של $f(\cdot)$. $w$ היא *אוכף ממש* כאשר
$$\lambda_{\min}\big(\nabla^2 f(w)\big) < 0,$$
כלומר, ל-Hessian ב-$w$ יש לפחות ערך עצמי שלילי אחד. (הגדרה זו יכולה לחול על מקסימום מקומי.)

**Def 5 (GD $\epsilon$-escaped $w_s$ at step $t$).** יהי $\epsilon>0$ ותהי $\tilde f$ קירוב טיילור מסדר שני של $f$ סביב אוכף ממש $w_s$. GD *$\epsilon$-נמלט* מ-$w_s$ בצעד $t$ אם
$$\tilde f(w_t) \le \tilde f(w_s) = f(w_s) \quad\text{and}\quad \|\nabla\tilde f(w_t)\| > \epsilon ,$$
כלומר, GD הגיע לנקודה לא-$\epsilon$-סטציונרית שערך המטרה שלה נמוך מזה של $w_s$.

**Def 6 ($\rho$-Hessian Lipschitz; $\epsilon$-second-order stationary point).** פונקציה $f:\mathbb{R}^d\to\mathbb{R}$ גזירה ברציפות פעמיים היא *$\rho$-Hessian Lipschitz* ($\rho>0$) כאשר עבור כל $w_1,w_2 \in \mathbb{R}^d$
$$\big\|\nabla^2 f(w_1) - \nabla^2 f(w_2)\big\|_{\mathrm{spectral}} \le \rho\,\|w_1 - w_2\| .$$
עבור $f(\cdot)$ כזו וכל $\epsilon > 0$, $w \in \mathbb{R}^d$ היא *נקודה $\epsilon$-סטציונרית מסדר שני* כאשר
$$\|\nabla f(w)\| \le \epsilon \quad\text{and}\quad \lambda_{\min}\big(\nabla^2 f(w)\big) \ge -\sqrt{\rho\epsilon}\,.$$

**Def (linear neural network, LNN).** LNN בעומק $N$ עם ממד קלט $d_0$, ממדים חבויים $d_1,\dots,d_{N-1}$ וממד פלט $d_N$ היא המשפחה הפרמטרית
$$\{\, x \mapsto y = W_N W_{N-1}\cdots W_1 x \;:\; x\in\mathbb{R}^{d_0},\, y\in\mathbb{R}^{d_N},\, \forall n\in[N],\, W_n \in \mathbb{R}^{d_n,d_{n-1}} \,\}.$$

**Def (partial products $W_{j:j'}$).** עבור $1 \le j \le j' \le N$: $W_{j:j'} := W_{j'}W_{j'-1}\cdots W_j$; אם $j > j'$ אזי $W_{j:j'} := Id$ (הממדים מההקשר).

**Def (overparameterized objective).** עבור הפסד קמור $\ell : \mathbb{R}^{d_N,d_0} \to \mathbb{R}$ גזיר ברציפות פעמיים (למשל, רגרסיה לוגיסטית על מודלים לינאריים), ה-LNN משרה $\phi : \mathbb{R}^{d_1,d_0}\times\mathbb{R}^{d_2,d_1}\times\dots\times\mathbb{R}^{d_N,d_{N-1}} \to \mathbb{R}$,
$$\phi(W_1,\dots,W_N) := \ell(W_N W_{N-1}\cdots W_1) = \ell(W_{1:N}).$$

## Key theorems & results
**Prop 1 (non-convexity of DL training).** יהי $L(W_1,\dots,W_N)$ הפסד התלוי ב-$W_1,\dots,W_N$ רק דרך העתקת הקלט-פלט של הרשת. הניחו שהמינימום הגלובלי של $L(\cdot)$ מושג באיזשהם $W_1^*,\dots,W_N^*$, ושמינימום גלובלי זה *קטן ממש* מההפסד הניתן להשגה עם רשת בעלת רוחבים חבויים $d_1 = d_2 = \dots = d_{N-1} = 1$. אזי $L(\cdot)$ אינו קמור.

**רעיון ההוכחה:** תמורת נוירונים חבויים משמרת את העתקת הקלט-פלט:

$$L(PW_1^*, W_2^*P^\top,\dots,W_N^*) = L^*$$

עבור כל מטריצת תמורה $P \in \mathbb{R}^{d_1,d_1}$. אילו $L$ היה קמור, מיצוע על פני כל $d_1!$ התמורות (Jensen + אופטימליות) מראה ש-$Q := \frac{1}{d_1!}\sum_{P\in\mathcal P}P = \frac{1}{d_1}\mathbf{1}\mathbf{1}^\top$ נותן נקודה אופטימלית $(QW_1^*, W_2^*Q^\top,\dots)$ שבה ל-$QW_1^*$ יש שורות זהות; חזרה שכבה-אחר-שכבה מניבה משקלים אופטימליים שלכולם שורות זהות — למעשה שכבות חבויות ברוחב 1, בסתירה להנחת הפער-הממש.

**רלוונטיות למבחן:** הוכחה קנונית; שימו לב שהיא ניתנת להרחבה לרשתות עם הטיות ומתקיימת עבור **כל** אקטיבציה $\sigma$, כולל לינארית.

**Prop 2 (non-convexity, variant assumptions).** אותה הנחת תלות-דרך-ההעתקה. הניחו שהמינימום הגלובלי של $L(\cdot)$ *אינו* מושג ב-$W_1 = \dots = W_N = 0$, ש-$\sigma(\cdot)$ גזירה ברציפות, וש-$\sigma(0)=0$. אזי $L(\cdot)$ אינו קמור. *הוכחה:* שיעורי בית 3.

**רלוונטיות למבחן:** דעו את שתי מערכות "ההנחות הטכניות המתונות" ואיזו טענה משתמשת באיזו.

**Lem 1 (Hessian bounded by smoothness).** עבור פונקציה $\beta$-חלקה $f$ גזירה ברציפות פעמיים, וכל $w,v \in \mathbb{R}^d$:
$$\big|\nabla^2 f(w)[v,v]\big| \le \beta\,\|v\|^2 .$$

**רעיון ההוכחה:** הציבו $h(t) := \langle v, \nabla f(w+tv) - \nabla f(w)\rangle$; כלל השרשרת נותן $h'(0) = \nabla^2 f(w)[v,v]$, בעוד Cauchy-Schwarz + $\beta$-חלקוּת נותנים $|h(t)| \le \beta|t|\|v\|^2$; הסיקו באמצעות מנת ההפרש ב-$0$.

**רלוונטיות למבחן:** מניב גם: כל ערך עצמי של Hessian של פונקציה $\beta$-חלקה מקיים $|\lambda| \le \beta$.

**Lem 2 (quadratic upper/lower bound; "descent lemma").** עבור פונקציה $\beta$-חלקה $f$ גזירה ברציפות פעמיים, וכל $w_1,w_2$:
$$\big|f(w_2) - f(w_1) - \langle\nabla f(w_1), w_2 - w_1\rangle\big| \le \frac{\beta}{2}\,\|w_1 - w_2\|^2 ,$$
כאשר $f(w_1) + \langle\nabla f(w_1), w_2-w_1\rangle$ הוא הקירוב מסדר ראשון של $f$ סביב $w_1$.

**רעיון ההוכחה:** טיילור עם שארית Lagrange על $g(t) := f(w_1 + t(w_2-w_1))$:

$$g(1) = g(0) + g'(0) + \frac12 g''(\xi)$$

עבור $\xi\in(0,1)$ כלשהו; חִסמו את האיבר מסדר שני באמצעות Lem 1.

**Thm 1 (GD reaches an $\epsilon$-stationary point; Folklore, see Nesterov).** תהי $f:\mathbb{R}^d\to\mathbb{R}$ גזירה ברציפות פעמיים, $\beta$-חלקה, המשיגה מינימום גלובלי $f^* := \min_{w} f(w)$. הריצו GD עם גודל צעד $\eta \le \frac{1}{\beta}$ מכל $w_0$. אזי עבור כל $\epsilon > 0$, נקודה $\epsilon$-סטציונרית מושגת בתוך לא יותר מ-
$$\frac{2\,(f(w_0) - f^*)}{\eta\,\epsilon^2} \ \text{ steps.}$$

**רעיון ההוכחה:** Lem 2 עם $w_{t+1}-w_t = -\eta\nabla f(w_t)$ ו-$\eta \le 1/\beta$ נותן את הירידה לכל צעד $f(w_{t+1}) \le f(w_t) - \frac{\eta}{2}\|\nabla f(w_t)\|^2$; אם $\|\nabla f(w_t)\| > \epsilon$ עבור כל $t < T$, טלסקופ נותן $f(w_T) < f(w_0) - \eta T\epsilon^2/2$, בסתירה ל-$f^* \le f(w_T)$ ברגע ש-$T$ עולה על החסם.

**רלוונטיות למבחן:** שננו את אי-שוויון הירידה ואת החסם $2(f(w_0)-f^*)/(\eta\epsilon^2)$; התכנסות בזמן פולינומי לסטציונריות על כל מטרה חלקה (לא-קמורה).

**Result (GD escapes strict saddles on the quadratic model).** יהי $w_s$ אוכף ממש, $H := \nabla^2 f(w_s)$, ושקלו GD על קירוב טיילור מסדר שני $\tilde f(w) = f(w_s) + \frac12 (w-w_s)^\top H (w-w_s)$ (בשימוש ב-$\nabla f(w_s) = 0$), שהדינמיקה שלו היא $w_{t+1} = w_t - \eta H(w_t - w_s)$. עם הפירוק העצמי האורתוגונלי $H = U\Lambda U^\top$ והחלפת המשתנים $\theta^{(t)} := U^\top(w_t - w_s)$, הדינמיקה מתנתקת:
$$\theta_i^{(t+1)} = (1 - \eta\lambda_i)\,\theta_i^{(t)} \quad\Longrightarrow\quad \theta_i^{(t)} = (1-\eta\lambda_i)^t\,\theta_i^{(0)} .$$
$\epsilon$-מילוט (Def 5) שקול ל-$\sum_{i=1}^d \lambda_i(\theta_i^{(t)})^2 < 0$ וכן $\sum_{i=1}^d \lambda_i^2(\theta_i^{(t)})^2 > \epsilon^2$. הניחו בה"כ $-\alpha := \lambda_1 < 0$ וכן $\eta \le \frac1\beta$ (כך ש-$|\lambda_i| \le \beta$ ו-$1-\eta\lambda_i \in (0,1)$ עבור $\lambda_i > 0$, בעוד $(1+\eta\alpha)^t$ גדל). אזי שני התנאים מתקיימים (בהנחה $\theta_1^{(0)} \neq 0$) בכל פעם ש-
$$t > \left\lceil \frac{\log\!\left(\frac{\max\left\{\sum_{i\in[d]:\lambda_i>0}\lambda_i\big(\theta_i^{(0)}\big)^2,\ \frac{\epsilon^2}{\alpha}\right\}}{\alpha\big(\theta_1^{(0)}\big)^2}\right)}{2\log(1+\eta\alpha)} \right\rceil .$$

**רעיון ההוכחה:** חִסמו את איבר העקמומיות השלילית $-\alpha(1+\eta\alpha)^{2t}(\theta_1^{(0)})^2$ מול תרומות העקמומיות החיובית (המתכווצות); כל תנאי מצטמצם לכך ש-$(1+\eta\alpha)^{2t}$ עולה על יחס מפורש.

**רלוונטיות למבחן:** זמן המילוט לוגריתמי; ההסתייגות "בהסתברות גבוהה" נובעת מכך שהחסם תלוי ב-$|\theta_1^{(0)}|$ (המרחק ההתחלתי מ-$w_s$ לאורך העקמומיות השלילית) — אתחול אקראי איזוטרופי מוקנה-מידה כראוי הממורכז ב-$w_s$ הופך את כל הקואורדינטות של $\theta^{(0)}$ לגדולות מספיק בהסתברות גבוהה, **ללא צורך לדעת אילו כיוונים בעלי עקמומיות שלילית**.

**Algorithm (Perturbed Gradient Descent, PGD; Jin et al.).** קלט $w_0 \in \mathbb{R}^d$ ו-$\beta,\rho,\epsilon,c,\delta,\Delta f \in \mathbb{R}_{>0}$. קבעו
$$\chi := 3\max\left\{\log\!\left(\tfrac{d\beta\Delta f}{c\epsilon^2\delta}\right),\,4\right\},\quad \eta := \tfrac{c}{\beta},\quad r := \tfrac{\sqrt{r}}{\chi^2}\cdot\tfrac{\epsilon}{\beta},$$
$$g_{\text{thresh}} := \tfrac{\sqrt{r}}{\chi^2}\cdot\epsilon,\quad f_{\text{thresh}} := \tfrac{c}{\chi^3}\sqrt{\tfrac{\epsilon^3}{\rho}},\quad t_{\text{thresh}} := \tfrac{\chi}{c}\cdot\tfrac{\beta}{\sqrt{\rho\epsilon}},\quad t_{\text{noise}} := -t_{\text{thresh}} - 1.$$
(מתועתק כפי שמודפס; ה-$\sqrt{r}$ ב-$r$ וב-$g_{\text{thresh}}$ הוא עצמי-מתייחס — שגיאת דפוס בסיכומים; ב-Jin et al. אלה נקראים $\sqrt{c}$, ול-$t_{\text{thresh}}$ יש $\chi/c^2$.) עבור $t=0,1,\dots$: אם $\|\nabla f(w_t)\| \le g_{\text{thresh}}$ וכן $t - t_{\text{noise}} > t_{\text{thresh}}$, קבעו $\tilde w_t := w_t$, $t_{\text{noise}} := t$, והפריעו $w_t := \tilde w_t + \xi_t$ עם $\xi_t \sim \mathrm{Unif}\{w' : \|w'\| \le r\}$; אם $t - t_{\text{noise}} = t_{\text{thresh}}$ וכן $f(w_t) - f(\tilde w_{t_{\text{noise}}}) > -f_{\text{thresh}}$, **החזירו** $\tilde w_{t_{\text{noise}}}$; אחרת צעד GD $w_{t+1} := w_t - \eta\nabla f(w_t)$.

**Thm 2 (PGD guarantee; Jin et al.).** תהי $f:\mathbb{R}^d\to\mathbb{R}$ $\beta$-חלקה ו-$\rho$-Hessian Lipschitz (Def 6) עם מינימום גלובלי $f^*$. קיים קבוע אבסולוטי $c_{\max}$ כך שעבור כל $\delta > 0$, $\epsilon \le \frac{\beta^2}{\rho}$, $\Delta f \ge f(w_0) - f^*$ וקבוע $c \le c_{\max}$, הרצת $\mathrm{PGD}(w_0,\beta,\rho,\epsilon,c,\delta,\Delta f)$ מפיקה נקודה $\epsilon$-סטציונרית מסדר שני, בהסתברות $1-\delta$, לאחר מספר צעדים שאינו גדול מ-
$$O\!\left(\frac{\beta\,(f(w_0) - f^*)}{\epsilon^2}\,\log^4\!\left(\frac{d\beta\Delta f}{\epsilon^2\delta}\right)\right).$$

**רעיון ההוכחה:** מנוסח ללא הוכחה (פורמליזציה של חלקים 2.1-2.2 יחד היא טכנית מאוד, בעיקר טיפול בפער בין מודל טיילור הריבועי למטרה האמיתית).

**רלוונטיות למבחן:** דעו את הניסוח במדויק: תנאים ($\epsilon \le \beta^2/\rho$, $\Delta f \ge f(w_0)-f^*$), מסקנה (סטציונריות מסדר-שני-$\epsilon$ בהסתברות $1-\delta$), ושהממד נכנס רק דרך $\log^4 d$.

**Result (gradient and Hessian of the LNN objective; Eqs. (1)-(3)).** פיתוח מסדר שני של $\phi(W_1{+}\Delta_1,\dots,W_N{+}\Delta_N)$ מניב, עבור כל $j \in [N]$:
$$\nabla\phi(W_1,\dots,W_N) = \Big(W_{2:N}^\top\nabla\ell(W_{1:N}),\ \dots,\ W_{j+1:N}^\top\,\nabla\ell(W_{1:N})\,W_{1:j-1}^\top,\ \dots,\ \nabla\ell(W_{1:N})\,W_{1:N-1}^\top\Big), \tag{2}$$
$$\nabla^2\phi(W_1,\dots,W_N)[(\Delta_1,\dots,\Delta_N),(\Delta_1,\dots,\Delta_N)] = \nabla^2\ell(W_{1:N})\Big[\textstyle\sum_{j=1}^N W_{j+1:N}\Delta_j W_{1:j-1},\ \sum_{j=1}^N W_{j+1:N}\Delta_j W_{1:j-1}\Big] + 2\Big\langle \nabla\ell(W_{1:N}),\ \textstyle\sum_{1\le j<j'\le N} W_{j'+1:N}\,\Delta_{j'}\,W_{j+1:j'-1}\,\Delta_j\,W_{1:j-1} \Big\rangle. \tag{3}$$

**רעיון ההוכחה:** פתחו את המכפלה $(W_N+\Delta_N)\cdots(W_1+\Delta_1)$ עד סדר שני ב-$(\Delta_j)_j$, הרכיבו עם פיתוח טיילור מסדר שני של $\ell$, ואספו איברים מסדר ראשון/שני; צורת הגרדיאנט משתמשת בזהויות עקבה (מכפלה פנימית כעקבה + תכונה מחזורית).

**רלוונטיות למבחן:** שתי הנוסחאות מנוצלות מחדש מילה-במילה ב-Thm 4, Prop 3, ולכל אורך הרצאה 4.

**Thm 3 (no bad local minima for LNNs; Laurent & Brecht).** יהי $\ell:\mathbb{R}^{d_N,d_0}\to\mathbb{R}$ הפסד **קמור** גזיר המשרה $\phi(W_1,\dots,W_N) := \ell(W_N\cdots W_1)$. הניחו שאין צוואר-בקבוק:

$$\min_{i\in[N-1]} d_i \ge \min\{d_0, d_N\}$$

אזי כל ממזער מקומי $(\hat W_1,\dots,\hat W_N)$ של $\phi(\cdot)$ הוא ממזער גלובלי.

**רעיון ההוכחה:** בה"כ $d_N \ge d_0$. אם $\ker(\hat W_{1:N-1}) = \{0\}$, אופטימליות מסדר ראשון $\nabla\ell(\hat W_{1:N})\hat W_{1:N-1}^\top = 0$ מכריחה $\nabla\ell(\hat W_{1:N}) = 0$ (קמירות מסיימת). אחרת קחו את ה-$k^*$ הראשון עם $\ker(\hat W_{1:k^*}) \neq \{0\}$ (הגרעינים מקוננים), והפריעו לשכבות $k > k^*$ ל-$\tilde W_k := \hat W_k + w_k\hat u_{k-1}^\top$ כאשר $\hat u_k$ וקטור סינגולרי של $\hat W_{1:k}$ עבור הערך הסינגולרי האפסי — זה משמר $\tilde W_{1:N} = \hat W_{1:N}$ ו(עבור $\|w_k\|$ קטן) מינימליות מקומית; יישום אופטימליות מסדר ראשון ב-$j = k^*{+}1$ עבור כל $\{w_k\}$ הקבילים וקילוף גורמים איטרטיבית מניב $\nabla\ell(\hat W_{1:N}) = 0$.

**רלוונטיות למבחן:** דעו את ההנחה המדויקת $\min_{i\in[N-1]}d_i \ge \min\{d_0,d_N\}$ ואת הטריק של הפרעות המותירות את מטריצת הקצה-אל-קצה בלתי-משתנה.

**Thm 4 (depth 2: non-global stationary points are strict saddles; Nouiehed & Razaviyayn).** יהי $\ell:\mathbb{R}^{d,d}\to\mathbb{R}$ הפסד קמור גזיר ברציפות פעמיים; שקלו LNN בעומק $N=2$ עם $d_0=d_1=d_2=d$ ו-$\phi(W_1,W_2) = \ell(W_2W_1)$. אזי כל נקודה סטציונרית $(\hat W_1,\hat W_2)$ של $\phi(\cdot)$ שאינה ממזער גלובלי היא אוכף ממש (Def 4).

**רעיון ההוכחה:** סטציונריות: $\hat W_2^\top\nabla\ell(\hat W_{1:2}) = 0$, $\nabla\ell(\hat W_{1:2})\hat W_1^\top = 0$. לא-גלובלי + קמירות $\Rightarrow \nabla\ell(\hat W_{1:2}) \neq 0$, כך שרכיב כלשהו $c := (\nabla\ell(\hat W_{1:2}))_{i,j} \neq 0$, ושתי $\hat W_1,\hat W_2$ סינגולריות. בחרו $v \neq 0$ עם $\hat W_2 v = 0$ וקבעו $\Delta_1 = \beta v e_j^\top$, $\Delta_2 = e_i v^\top$; אז Eq. (3) נותנת $\nabla^2\phi[(\Delta_1,\Delta_2),(\Delta_1,\Delta_2)] = \nabla^2\ell(\hat W_{1:2})[\Delta_2\hat W_1, \Delta_2\hat W_1] + 2\beta\|v\|^2 c$ — לינארי ב-$\beta$ עם שיפוע לא-אפסי, ומכאן שלילי עבור $\beta$ מתאים.

**רלוונטיות למבחן:** בניית ההפרעה מדרגה-אחת ($\hat W_2\Delta_1 = 0$, $\Delta_2\Delta_1 = \beta\|v\|^2 e_ie_j^\top$) היא מועדפת; שימו לב להנחת המטריצה הריבועית.

**Prop 3 (depth $\ge 3$: non-strict saddles exist).** יהי $\ell:\mathbb{R}^{d_N,d_0}\to\mathbb{R}$ גזיר ברציפות פעמיים וקמור; שקלו LNN בעומק $N \ge 3$ עם $\min_{i\in[N-1]} d_i \ge \min\{d_0,d_N\}$ ו-$\phi(W_1,\dots,W_N) = \ell(W_{1:N})$. הניחו ש-$\ell(\cdot)$ אינו משיג את המינימום הגלובלי שלו ב-$0$. אזי ל-$\phi(\cdot)$ יש אוכפים לא-ממש (Def 4 נכשלת: סטציונרית, לא מינימום, ובכל זאת $\lambda_{\min}(\nabla^2\phi) \ge 0$).

**רעיון ההוכחה:** ב-$(\hat W_1,\dots,\hat W_N) = (0,\dots,0)$: כל איבר של הגרדיאנט (Eq. 2) מכיל גורם אפס, כך שהיא סטציונרית; היא אינה מינימום גלובלי, ולפי Thm 3 אינה מינימום מקומי, ומכאן אוכף. בתבנית הריבועית של ה-Hessian (Eq. 3), עבור $N \ge 3$ כל מחובר מכיל לפחות גורם אחד $\hat W_k = 0$, כך ש-$\nabla^2\phi[\Delta,\Delta] = 0$ עבור כל $\Delta$ — אין ערך עצמי שלילי.

**רלוונטיות למבחן:** שורת המחץ של ההרצאה: גישת הנוף (בצורתה הנוכחית) אינה יכולה לבסס התכנסות GD עבור LNN עמוקים — רשתות הנוירונים העמוקות הפשוטות ביותר — ולכן "נדרשת נקודת מבט שונה" (גישת המסלול, הרצאה 4).

## טכניקות וטריקים
- **סימטריה + Jensen נגד קמירות:** מצעו אופטימום על פני חבורת סימטריה (תמורות של נוירונים חבויים); קמירות הייתה הופכת את הממוצע לאופטימלי, אך הנקודה הממוצעת מנוונת (שורות זהות), בסתירה להנחות כושר הביטוי.
- **פונקציות עזר חד-ממדיות** להוכחת השלכות חלקוּת: $h(t) := \langle v, \nabla f(w+tv)-\nabla f(w)\rangle$ (Lem 1) ו-$g(t) := f(w_1 + t(w_2-w_1))$ עם Taylor-Lagrange (Lem 2).
- **טלסקופ של אי-שוויון הירידה** $f(w_{t+1}) \le f(w_t) - \frac{\eta}{2}\|\nabla f(w_t)\|^2$ כדי לקבל את סיבוכיות האיטרציות.
- **מודל ריבועי + ניתוק בבסיס עצמי:** החליפו את $f$ ליד אוכף ב-$\tilde f$, החליפו משתנים $\theta = U^\top(w - w_s)$, קבלו רקורסיות גאומטריות סקלריות $\theta_i^{(t)} = (1-\eta\lambda_i)^t\theta_i^{(0)}$ (בטעם איטרציית-חזקה); ערך עצמי שלילי $\Rightarrow$ צמיחה גאומטרית $(1+\eta\alpha)^t$.
- **הפרעה איזוטרופית אקראית** להבטחת רכיב לא-זניח בהסתברות גבוהה לאורך כיווני מילוט (לא ידועים).
- **פיתוח הפרעה מסדר שני של מכפלות מטריצות** + מניפולציות עקבה/תכונה-מחזורית כדי לחלץ את $\nabla\phi$ ו-$\nabla^2\phi$.
- **הפרעות בלתי-משתנות מקצה-אל-קצה** הבנויות מכיווני ערך-סינגולרי-אפס (SVD) כדי לייצר תנאי אופטימליות מסדר ראשון נוספים במינימום מקומי (Thm 3).
- **תעודות עקמומיות-שלילית מפורשות** באמצעות $\Delta$-ים מדרגה-אחת המותאמים לגרעיני מטריצות המשקל (Thm 4); בראשית עם $N\ge3$, כל איבר Hessian מתאפס (Prop 3).

## נקודות רלוונטיות למבחן
- אי-הקמירות **אינה** נגרמת על ידי אקטיבציות לא-לינאריות: Prop 1 מתקיים עבור כל $\sigma$, כולל לינארית; המניע הוא סימטריית תמורה + ההפסד התלוי בפרמטרים רק דרך העתקת הקלט-פלט.
- מערכת ההנחות של Prop 2: מינימום גלובלי לא ב-$0$, $\sigma \in C^1$, $\sigma(0)=0$ (ההוכחה היא שיעורי בית 3 — שאלת מבחן סבירה).
- שננו: $\eta \le 1/\beta$; ירידה לכל צעד $\frac{\eta}{2}\|\nabla f(w_t)\|^2$; חסם איטרציות $2(f(w_0)-f^*)/(\eta\epsilon^2)$.
- $\beta$-חלקוּת $\Rightarrow$ כל הערכים העצמיים של ה-Hessian ב-$[-\beta,\beta]$ (באמצעות Lem 1 על וקטורים עצמיים יחידה).
- הגדרת האוכף הממש מכסה מקסימות מקומיות — נאמר במפורש בסיכומים.
- סטציונריות מסדר-שני-$\epsilon$ מצמידה את שתי הסבילויות: $\|\nabla f(w)\|\le\epsilon$ **וגם** $\lambda_{\min}(\nabla^2 f(w)) \ge -\sqrt{\rho\epsilon}$ (לא $-\epsilon$) — מלכודת קלאסית.
- ערובת PGD: $O\big(\frac{\beta(f(w_0)-f^*)}{\epsilon^2}\log^4\frac{d\beta\Delta f}{\epsilon^2\delta}\big)$ צעדים, בהסתברות $1-\delta$, בדרישה $\epsilon \le \beta^2/\rho$; הממד $d$ מופיע רק בתוך ה-$\log^4$.
- זמן המילוט מאוכף לוגריתמי ביחס $\max\{\sum_{\lambda_i>0}\lambda_i(\theta_i^{(0)})^2, \epsilon^2/\alpha\}/(\alpha(\theta_1^{(0)})^2)$, עם קצב $2\log(1+\eta\alpha)$; המילוט הוא רק "בהסתברות גבוהה" כיוון ש-$\theta_1^{(0)}$ יכול להיות קטן כרצוננו.
- גרדיאנט ה-LNN $\frac{\partial\phi}{\partial W_j} = W_{j+1:N}^\top\,\nabla\ell(W_{1:N})\,W_{1:j-1}^\top$ — מנוצל מחדש כנקודת הפתיחה של גזירת המאוזנות בהרצאה 4.
- ניהול הנחות: Thm 3 זקוק ל-$\ell$ קמור גזיר + ללא צוואר-בקבוק ($\min_i d_i \ge \min\{d_0,d_N\}$); Thm 4 זקוק לעומק בדיוק 2 + ממדים ריבועיים; Prop 3 זקוק ל-$N\ge3$ + מינימום גלובלי של $\ell$ לא ב-$0$.
- האוכף הלא-ממש של Prop 3 הוא ה**ראשית** — בדיוק האזור שבו אתחולים קטנים סטנדרטיים מתחילים; זהו הטיעון של ההרצאה מדוע ניתוח מבוסס-מסלול (לא מבוסס-נוף) הכרחי עבור רשתות עמוקות.
- שגיאות דפוס בסיכומים שאין להיתפס בהן: ה-$r, g_{\text{thresh}}$ של PGD מודפסים עם $\sqrt{r}$ (עצמי-מתייחס; ל-Jin et al. יש $\sqrt{c}$), $t_{\text{thresh}}$ מודפס $\frac{\chi}{c}\cdot\frac{\beta}{\sqrt{\rho\epsilon}}$ (Jin et al.: $\chi/c^2$); הפרוזה "עומק 2" לפני המשפחה בעומק כללי $N$ $\mathcal H$.
