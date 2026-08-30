# הרצאה 5 — אופטימיזציה 3
- **File:** materials/lectures/lecture_05_optimization_3.pdf | **Text:** materials/text/lectures/lecture_05_optimization_3.txt
- **Pillar:** Optimization
- **One-paragraph summary:** מרחיבה את גישת המסלול לרשתות **לא-לינאריות** דרך משטר ה-**Neural Tangent Kernel (NTK)** של רשתות אולטרה-רחבות (מבוסס על Arora et al.). עבור GF על הפסד ה-$\ell_2$, ניבויי האימון $u(t)$ מצייתים לדינמיקה המדויקת $\dot u(t) = -H(t)(u(t)-y)$, כאשר $H(t)$ היא מטריצת הגרם (תמיד PSD) של היעקוביאנים של הרשת. אם הרשת רחבה מספיק, $H(t) \approx H(0) \approx H^*$, מטריצה דטרמיניסטית בעלת צורה סגורה — כך שהאימון הוא בקירוב ODE לינארי: בבסיס העצמי של $H^*$, קואורדינטות השגיאה דועכות כ-$e^{-\lambda_i t}$, ונותנות **התכנסות אקספוננציאלית של הפסד האימון לאפס (מינימום גלובלי של מטרה לא-קמורה) בכל פעם ש-$H^*$ לא-סינגולרית**. יתרה מכך, במשטר שבו היעקוביאן קבוע (הפלט אפיני במשקלים), הפונקציה הנלמדת היא **בדיוק רגרסיית קרנל** עם ה-NTK $K(x,x') = \langle\phi(x),\phi(x')\rangle$. חסמי רוחב כמותיים מוכחים עבור רשת רדודה — ריכוז Hoeffding באתחול ($n \gtrsim m^4/\epsilon^2$) ויציבות הקרנל במהלך האימון ($n \gtrsim c^2m^6t^2/\epsilon^2$, באמצעות חסם תנועת-המשקלים ה"עצל" $1/\sqrt n$) — וה-NTK של הרשת העמוקה נתון על ידי רקורסיה גאוסיאנית שכבתית מפורשת. הסתייגות המודגשת בסיכומים: הרוחבים הנדרשים אוסרים; הניתוח הוא עבור GF אך ניתן להתאמה ל-GD.

## Outline
1. **גישת המסלול (המשך)**
   - 1.1 **רשתות נוירונים אולטרה-רחבות** — רשת מופשטת $f(w,x)$, הפסד $\ell_2$; דינמיקה מדויקת במרחב-הניבוי $\dot u(t) = -H(t)(u(t)-y)$ (Lemma 1); רשתות רחבות: $H(t) \approx H(0) \approx H^*$ דטרמיניסטית, ומכאן דינמיקה לינארית בקירוב, התכנסות אקספוננציאלית להפסד אפס כאשר $H^* \succ 0$.
     - 1.1.1 **שקילות לרגרסיית קרנל** — משטר יעקוביאן-קבוע (אפיני): המנבא הנלמד $= $ רגרסיית קרנל עם ה-NTK.
     - 1.1.2 **רשת רדודה** — שכבה חבויה אחת מאומנת, משקלי פלט $\pm1$ קבועים; NTK $K_s(x,x') = x^\top x'\,\mathbb{E}_w[\dot\sigma(w^\top x)\dot\sigma(w^\top x')]$; Prop 1 (ריכוז באתחול), Prop 2 (הקרנל נשאר במקומו במהלך האימון).
     - 1.1.3 **רשת עמוקה** — ארכיטקטורה עמוקה מוקנית-מידה ב-$\sqrt{c_\sigma/d}$; הגדרות רקורסיביות $\Sigma^{(n)}, \dot\Sigma^{(n)}$; NTK עמוק בצורה סגורה $K_d$ (מנוסח ללא הוכחה, גבול רוחב-אינסופי).

## Key definitions
**Def (abstract NN and training setup).** ארכיטקטורת רשת נוירונים (אולי לא-לינארית) היא $f : \mathbb{R}^k \times \mathbb{R}^d \to \mathbb{R}$ גזירה, כאשר $f(w,x)$ הוא הפלט על קלט $x \in \mathbb{R}^d$ עם משקלים $w \in \mathbb{R}^k$. בהינתן נתוני אימון $\{(x_i,y_i)\}_{i=1}^m \subseteq \mathbb{R}^d\times\mathbb{R}$, אמנו באמצעות GF על הפסד ה-$\ell_2$
$$\ell(w) = \frac12\sum_{i=1}^m \big(f(w,x_i) - y_i\big)^2 .$$

**Def (prediction curve and labels).** $u : \mathbb{R}_{\ge0} \to \mathbb{R}^m$, $u(t) := [f(w(t),x_1),\dots,f(w(t),x_m)]^\top$; $y := [y_1,\dots,y_m]^\top \in \mathbb{R}^m$.

**Def (time-varying kernel matrix $H(t)$).** $H(t) \in \mathbb{R}^{m,m}$ היא מטריצת ה-PSD
$$(H(t))_{i,j} = \left\langle \frac{\partial}{\partial w} f(w(t),x_i),\ \frac{\partial}{\partial w} f(w(t),x_j) \right\rangle .$$

**Def (spectral coordinates).** $H^*$ היא PSD עם פירוק עצמי אורתוגונלי $H^* = V\Lambda V^\top$, $\Lambda = \mathrm{diag}(\lambda_1,\dots,\lambda_m) \ge 0$; החלפת משתנים $q(t) := V^\top(u(t) - y) \iff u(t) = Vq(t) + y$.

**Def (features and NTK, affine regime).** כאשר $\frac{\partial}{\partial w}f(w(t),x)$ בלתי-תלוי ב-$w(t)$ (פלט הרשת אפיני ב-$w$), הגדירו $\phi(x) := \frac{\partial}{\partial w}f(w(t),x) \in \mathbb{R}^k$; אזי $f(w,x) = \langle\phi(x),w\rangle + b_x$, ו-$b_x = 0$ במסגרת הנפוצה שבה משקלים אפסיים נותנים פלט אפס. ל-$\Phi \in \mathbb{R}^{k,m}$ יש עמודה $i$-ית $\phi(x_i)$. הקרנל
$$K : \mathbb{R}^d\times\mathbb{R}^d \to \mathbb{R},\qquad K(x,x') := \langle\phi(x), \phi(x')\rangle$$
הוא ה-**Neural Tangent Kernel (NTK)**; הוא תלוי בארכיטקטורה. $H^* = \Phi^\top\Phi$ היא מטריצת הגרם שלו: $(H^*)_{i,j} = K(x_i,x_j)$.

**Def (shallow network).** קלט $x \in \mathbb{R}^d$ עם $\|x\| = 1$. אקטיבציה $\sigma(\cdot)$: לא-לינארית, גזירה ברציפות פעמיים, עם $\big|\frac{d}{dz}\sigma(z)\big| \le 1$ וכן $\big|\frac{d^2}{dz^2}\sigma(z)\big| \le 1$. משקלים חבויים $\{w_r\}_{r=1}^n$ מאותחלים i.i.d. $w_r(0) \sim \mathcal{N}(0,I)$ ($d$-ממדי), ממוטבים באמצעות GF על הפסד ה-$\ell_2$. משקלי פלט $\{a_r\}_{r=1}^n$ מאותחלים i.i.d. $a_r(0) = +1$ בהסתברות $0.5$, $-1$ בהסתברות $0.5$, **קבועים במהלך האימון**. עם $W := [w_1,\dots,w_n]\in\mathbb{R}^{d,n}$, $a := [a_1,\dots,a_n]^\top$:
$$f_a : \mathbb{R}^{d,n}\times\mathbb{R}^d \to \mathbb{R},\qquad f_a(W,x) = \frac{1}{\sqrt n}\sum_{r=1}^n a_r\,\sigma(w_r^\top x) .$$
המטרה $\ell(W) = \frac12\sum_i (f_a(W,x_i)-y_i)^2$ אינה קמורה (בשל $\sigma$), למרות ששכבה אחת בלבד מאומנת.

**Def (shallow NTK).** עם $\dot\sigma(z) := \frac{d}{dz}\sigma(z)$:
$$K_s(x,x') := x^\top x' \cdot \mathbb{E}_{w\sim\mathcal N(0,I)}\big[\dot\sigma(w^\top x)\,\dot\sigma(w^\top x')\big] .$$
$H^* \in \mathbb{R}^{m,m}$ היא מטריצת הגרם שלו, $(H^*)_{i,j} = K_s(x_i,x_j)$.

**Def (deep network).** 
$$f((W_1,\dots,W_N),x) := W_N \sqrt{\tfrac{c_\sigma}{d_{N-1}}}\,\sigma\!\left(W_{N-1}\sqrt{\tfrac{c_\sigma}{d_{N-2}}}\,\sigma\!\left(W_{N-2}\cdots\sqrt{\tfrac{c_\sigma}{d_1}}\,\sigma(W_1x)\cdots\right)\right),$$
כאשר $W_n \in \mathbb{R}^{d_n,d_{n-1}}$, $n\in[N-1]$, וכן $W_N \in \mathbb{R}^{1,d_N}$ (כפי שמודפס; השכבה האחרונה ממפה את השכבה החבויה האחרונה לסקלר) הם המשקלים הממוטבים, הרכיבים מאותחלים i.i.d. $\mathcal N(0,1)$; $\sigma(\cdot)$ היא אקטיבציה נקודתית; וכן
$$c_\sigma := \big(\mathbb{E}_{z\sim\mathcal N(0,1)}[\sigma(z)^2]\big)^{-1}.$$
ה-NTK מוצג בגבול של רוחבים חבויים גדולים $d_1,\dots,d_N \to \infty$.

**Def (deep NTK recursions).** הגדירו רקורסיבית, עבור $n \in [N]$:
$$\Sigma^{(0)}(x,x') := x^\top x',\qquad \Lambda^{(n)}(x,x') := \begin{pmatrix}\Sigma^{(n-1)}(x,x) & \Sigma^{(n-1)}(x,x')\\ \Sigma^{(n-1)}(x',x) & \Sigma^{(n-1)}(x',x')\end{pmatrix}\in\mathbb{R}^{2,2},$$
$$\Sigma^{(n)}(x,x') := c_\sigma\,\mathbb{E}\big[\sigma(u)\sigma(v)\big],\qquad (u,v)\sim\mathcal N\big(0,\Lambda^{(n)}(x,x')\big).$$
בנוסף (כפי שכתוב בסיכומים, רקורסיה מקבילה הבנויה מ-$\dot\Sigma$ עצמו):
$$\dot\Sigma^{(0)}(x,x') := x^\top x',\qquad \dot\Lambda^{(n)}(x,x') := \begin{pmatrix}\dot\Sigma^{(n-1)}(x,x) & \dot\Sigma^{(n-1)}(x,x')\\ \dot\Sigma^{(n-1)}(x',x) & \dot\Sigma^{(n-1)}(x',x')\end{pmatrix}\in\mathbb{R}^{2,2},$$
$$\dot\Sigma^{(n)}(x,x') := c_\sigma\,\mathbb{E}\big[\dot\sigma(u)\dot\sigma(v)\big],\qquad (u,v)\sim\mathcal N\big(0,\dot\Lambda^{(n)}(x,x')\big).$$

## Key theorems & results
**Lem 1 (prediction-space dynamics — exact).** תחת GF על הפסד ה-$\ell_2$, $u(t)$ מקיים
$$\forall t \in \mathbb{R}_{\ge0}:\quad \dot u(t) = -H(t)\,\big(u(t) - y\big),$$
עם $H(t)$ כמוגדר לעיל (PSD).
*רעיון ההוכחה:* $\dot w(t) = -\nabla\ell(w(t)) = -\sum_{j=1}^m (f(w(t),x_j)-y_j)\frac{\partial}{\partial w}f(w(t),x_j)$; יישמו את כלל השרשרת על $\frac{d}{dt}f(w(t),x_i)$ וזהו את המכפלות הפנימיות כ-$(H(t))_{i,j}$.
*רלוונטיות למבחן:* גזירה זו קצרה, מדויקת (ללא הנחת רוחב), וסבירה מאוד להישאל; דעו שה-PSD-יות אוטומטית (מטריצת גרם).

**Result (convergence under the idealized dynamics).** אם הרשת רחבה מספיק אזי $H(t) \approx H(0)$ לכל אורך האימון, ותחת אתחול אקראי מתאים $H(0) \approx H^*$ דטרמיניסטית, ונותנת $\dot u(t) \approx -H^*(u(t)-y)$. בהתייחסות לכך כמדויק וליכסון ($q := V^\top(u-y)$):
$$\forall i \in [m]:\quad (q(t))_i = (q(0))_i\,e^{-\lambda_i t},\qquad \|q(t)\|_2^2 = \|u(t)-y\|_2^2 = 2\,\ell(w(t)).$$
אם $H^*$ לא-סינגולרית ($\lambda_i > 0\ \forall i$), הפסד האימון מתכנס למינימום הגלובלי (אפס) במהירות אקספוננציאלית; ספציפית $\ell(w(t)) < \epsilon$ עבור כל
$$t > \max_{i\in[m]} \frac{1}{2\lambda_i}\,\log\!\left(\frac{m\,(q(0))_i^2}{2\epsilon}\right).$$
*רעיון ההוכחה:* $\dot q = -\Lambda q$ מתנתק ל-ODE-ים סקלריים $\dot q_i = -\lambda_i q_i$; אנטגרלו $\frac{\dot q_i}{q_i}$.
*רלוונטיות למבחן:* התכנסות למינימום-גלובלי עבור מטרה לא-קמורה; כל מוד שגיאה דועך בקצב שלו $\lambda_i$ (הערכים העצמיים של מטריצת הגרם של ה-NTK קובעים את המהירות).

**Result (equivalence to kernel regression).** במשטר $H(t) \approx H^*$ עם $\frac{\partial}{\partial w}f$ בלתי-תלוי ב-$w$ (פלטים אפיניים, $b_x = 0$): $\dot w(t) = -\Phi(\Phi^\top w(t) - y)$, כך שעם $w(0) \approx 0$, $w(t)$ נשאר במרחב העמודות של $\Phi$, כלומר $w(t) = \Phi r(t)$; אזי $u(t) = \Phi^\top w(t) = \Phi^\top\Phi\, r(t) = H^* r(t)$. בהנחה ש-$H^*$ בעלת דרגה מלאה, $u(t) \to y$ מכריח $r(t) \to (H^*)^{-1}y$ וכן
$$w(t) \xrightarrow{t\to\infty} \Phi\,(H^*)^{-1}y,$$
כך שפונקציית הניבוי המוחזרת על ידי האימון היא
$$x \mapsto f\big(\Phi(H^*)^{-1}y,\ x\big) = \big[K(x,x_1),\dots,K(x,x_m)\big]^\top (H^*)^{-1}\, y$$
— **בדיוק רגרסיית קרנל** עם ה-NTK $K(\cdot,\cdot)$.
*רעיון ההוכחה:* הציבו $f(w,x) = \langle\phi(x),w\rangle$ בכל מקום; המנבא הגבולי הוא $\langle\phi(x), \Phi(H^*)^{-1}y\rangle$, שרכיביו הם הערכות קרנל.
*רלוונטיות למבחן:* זהות שורת-המחץ "רשת אולטרה-רחבה מאומנת $=$ רגרסיית קרנל NTK"; היו מסוגלים לשחזר את השרשרת המלאה $w(t)=\Phi r(t) \Rightarrow u = H^*r \Rightarrow w_\infty = \Phi(H^*)^{-1}y$.

**Result (shallow NTK formula).** עבור הארכיטקטורה הרדודה, אם $n$ גדול מספיק אזי עבור כל $t \ge 0$, $H(t)$ היא בקירוב מטריצת הגרם של
$$K_s(x,x') = x^\top x'\cdot\mathbb{E}_{w\sim\mathcal N(0,I)}\big[\dot\sigma(w^\top x)\,\dot\sigma(w^\top x')\big].$$
מבוסס באמצעות Prop 1 (ב-$t=0$) + Prop 2 (עבור $t>0$).

**Prop 1 (concentration at initialization).** יהיו $\epsilon > 0$, $\delta \in (0,1)$. אם
$$n \ \ge\ \frac{2m^4}{\epsilon^2}\,\log\!\left(\frac{m^2}{\delta}\right),$$
אזי בהסתברות $\ge 1-\delta$ על פני האתחול של $w_1,\dots,w_n$: $\|H(0) - H^*\|_{\mathrm{spectral}} \le \epsilon$ (נורמה ספקטרלית = ערך סינגולרי מקסימלי), כאשר $(H^*)_{i,j} = K_s(x_i,x_j)$.
*רעיון ההוכחה:* $(H(0))_{i,j} = \frac1n\sum_{r=1}^n x_i^\top x_j\,\dot\sigma(w_r(0)^\top x_i)\,\dot\sigma(w_r(0)^\top x_j)$ הוא ממוצע של $n$ עותקים i.i.d. של $\gamma := x_i^\top x_j\dot\sigma(w^\top x_i)\dot\sigma(w^\top x_j) \in [-1,1]$ (בשימוש ב-$a_r^2 = 1$, $|\dot\sigma|\le1$, $\|x_i\|=1$) עם $\mathbb{E}[\gamma] = K_s(x_i,x_j)$; Hoeffding בדיוק $\epsilon/m^2$ לכל רכיב, חסם איחוד על פני $m^2$ רכיבים, ואז $\|A\|_{\mathrm{spectral}} \le \|A\|_F \le \sum_{i,j}|A_{i,j}|$.
*רלוונטיות למבחן:* צינור ריכוז סטנדרטי (Hoeffding + חסם איחוד + שליטת נורמה) — ניתן לשחזור לפי דרישה.

**Prop 2 (kernel stability during training).** יהי $t \ge 0$. הניחו $|y_i| \le c$ וכן $\max_{\tau\in[0,t]}|(u(\tau))_i| \le c$ עבור כל $i \in [m]$, עבור $c > 0$ כלשהו. אם
$$n \ \ge\ \frac{16\,c^2 m^6 t^2}{\epsilon^2},$$
אזי $\|H(t) - H(0)\|_{\mathrm{spectral}} \le \epsilon$.
*רעיון ההוכחה:* אנטגרלו GF עבור נוירון בודד: $\|w_r(t) - w_r(0)\| \le \int_0^t\|\dot w_r\| \le \frac{2cmt}{\sqrt n}$ (אי-שוויון המשולש; $|u_i - y_i| \le 2c$, $|\dot\sigma| \le 1$, $\|x_i\| = 1$, קנה-מידה $1/\sqrt n$). משפט הערך הממוצע עם $|\ddot\sigma| \le 1$: $|\dot\sigma(w_r(t)^\top x) - \dot\sigma(w_r(0)^\top x)| \le \|w_r(t)-w_r(0)\|$, נותן את החסם הרכיבי $|(H(t))_{i,j} - (H(0))_{i,j}| \le \frac{4cmt}{\sqrt n}$; סיימו עם $\|H(t)-H(0)\|_{\mathrm{spectral}} \le m^2\max_{i,j}|(H(t))_{i,j}-(H(0))_{i,j}| \le \frac{4cm^3t}{\sqrt n}$.
*רלוונטיות למבחן:* מנגנון ה"אימון העצל": התנועה לכל נוירון היא $O(1/\sqrt n)$, כך שהקרנל כמעט קפוא; דעו את שלושת החסמים הביניים $\frac{2cmt}{\sqrt n}$, $\frac{4cmt}{\sqrt n}$, $\frac{4cm^3t}{\sqrt n}$.

**Result (deep NTK; stated without proof).** בגבול הרוחב-האינסופי, ה-NTK של הרשת העמוקה $K_d : \mathbb{R}^{d_0}\times\mathbb{R}^{d_0} \to \mathbb{R}$ הוא
$$K_d(x,x') = \sum_{n=1}^{N}\left(\Sigma^{(n-1)}(x,x') \prod_{n'=n}^{N} \dot\Sigma^{(n')}(x,x')\right),$$
עם $\Sigma^{(n)}, \dot\Sigma^{(n)}$ כמו בהגדרות הרקורסיביות לעיל.
*רלוונטיות למבחן:* דעו את המבנה — סכום על פני שכבות של (שונות-משותפת של שכבה-$(n{-}1)$) $\times$ (מכפלת קרנלי-נגזרת משכבה $n$ עד $N$) — ואת תפקידי $c_\sigma$ ושונויות גאוס 2-על-2 $\Lambda^{(n)}$.

## טכניקות וטריקים
- **הרמת דינמיקת פרמטרים למרחב פונקציות:** כלל השרשרת על $\frac{d}{dt}f(w(t),x_i)$ ממיר GF על משקלים לדינמיקת קרנל על ניבויים; $H(t)$ היא מטריצת גרם של יעקוביאנים, ומכאן PSD בחינם.
- **ליכסון ODE לינארי:** החלפת משתנים אורתוגונלית $q = V^\top(u-y)$ מנתקת את $\dot u = -H^*(u-y)$ ל-$\dot q_i = -\lambda_iq_i$; פתרו על ידי אינטגרציה של $\dot q_i/q_i$; אורתוגונליות משמרת נורמות ($\|q\|_2^2 = 2\ell$).
- **נימוק במשטר אפיני/לינארי:** יעקוביאן קבוע $\Rightarrow$ $f(w,x)=\langle\phi(x),w\rangle$; GF מ-$w(0)\approx0$ נשאר ב-$\mathrm{col}(\Phi)$ — פרמטרו $w(t) = \Phi r(t)$ כדי לזהות את הגבול כפתרון הנורמה-המינימלית/רגרסיית-הקרנל.
- **צינור ריכוז לקרנלים אקראיים:** כתבו כל רכיב כממוצע i.i.d., חִסמו את טווח המחובר, Hoeffding, חסם איחוד על פני רכיבים, ואז עברו לנורמה ספקטרלית באמצעות $\|A\|_{\mathrm{spectral}} \le \|A\|_F \le \sum_{i,j}|A_{i,j}|$.
- **חסם היסט של אימון-עצל:** אנטגרלו את ה-ODE של נוירון-בודד, השתמשו בקנה-המידה $\frac{1}{\sqrt n}$ של הפלט ובשאריות חסומות כדי להראות שכל $w_r$ זז $O(1/\sqrt n)$ — הרוחב קונה יציבות מסלול.
- **העברת משפט הערך הממוצע:** $\ddot\sigma$ חסום ממיר היסט משקל להיסט רכיב-קרנל.
- **רקורסיה גאוסיאנית שכבתית:** קרנלים ברוחב-אינסופי מחושבים על ידי הפצת מטריצות שונות-משותפת 2-על-2 $\Lambda^{(n)}$ דרך תוחלות גאוסיאניות של $\sigma$ (ו-$\dot\sigma$), מנורמלות ב-$c_\sigma$.

## נקודות רלוונטיות למבחן
- $\dot u(t) = -H(t)(u(t)-y)$ **מדויק** עבור GF על הפסד ה-$\ell_2$ — ללא הנחת רוחב או ארכיטקטורה; הקירובים נכנסים רק דרך $H(t)\approx H(0)\approx H^*$.
- $H(t)$ תמיד PSD; **אי-סינגולריות של $H^*$** היא התנאי להתכנסות אקספוננציאלית להפסד אימון **אפס** — אופטימליות גלובלית למרות אי-הקמירות של $\ell$.
- זהות שימושית: $\|q(t)\|_2^2 = \|u(t)-y\|_2^2 = 2\,\ell(w(t))$; זמן התכנסות $t > \max_i\frac{1}{2\lambda_i}\log\frac{m(q(0))_i^2}{2\epsilon}$ — הערך העצמי ה**קטן ביותר** של $H^*$ שולט.
- מטרת המודל הרדוד אינה קמורה למרות שרק השכבה החבויה מאומנת — האי-לינאריות של $\sigma$ מספיקה.
- NTK רדוד: $K_s(x,x') = x^\top x'\,\mathbb{E}_{w\sim\mathcal N(0,I)}[\dot\sigma(w^\top x)\dot\sigma(w^\top x')]$ — שימו לב שהוא מערב את $\dot\sigma$, לא את $\sigma$; הנחות: $\|x\|=1$, $|\dot\sigma|\le1$, $|\ddot\sigma|\le1$, $w_r\sim\mathcal N(0,I)$, $a_r \in \{\pm1\}$ קבועים.
- חסמי רוחב לשינון: $n \ge \frac{2m^4}{\epsilon^2}\log\frac{m^2}{\delta}$ (ריכוז באתחול, בהסתברות $1-\delta$) וכן $n \ge \frac{16c^2m^6t^2}{\epsilon^2}$ (יציבות עד זמן $t$, בהנחה $|y_i|\le c$ ו-$|(u(\tau))_i|\le c$ על $[0,t]$). התלות ב-$t^2$ משמעה שהערובה היא על אופק זמן סופי; הרוחבים הכוללים "אוסרים" — ההסתייגות המנוסחת של מסגרת ה-NTK.
- שקילות רגרסיית-קרנל זקוקה ל: יעקוביאן קבוע (משטר אפיני), משקלים-אפסיים-נותנים-פלט-אפס (כך ש-$b_x=0$), $w(0)\approx0$, $H^*$ בעלת דרגה מלאה; המנבא הנלמד $x \mapsto [K(x,x_1),\dots,K(x,x_m)]^\top(H^*)^{-1}y$.
- מרכיבי NTK עמוק: גורמי קנה-מידה $\sqrt{c_\sigma/d_n}$ בתוך הארכיטקטורה, $c_\sigma = (\mathbb{E}_{z\sim\mathcal N(0,1)}[\sigma(z)^2])^{-1}$, משקלים i.i.d. $\mathcal N(0,1)$, גבול $d_1,\dots,d_N\to\infty$; נוסחה $K_d(x,x') = \sum_{n=1}^N\big(\Sigma^{(n-1)}(x,x')\prod_{n'=n}^N\dot\Sigma^{(n')}(x,x')\big)$.
- אזהרה לגבי רקורסיית ה-$\dot\Sigma$ של הסיכומים: כפי שמודפס, $\dot\Lambda^{(n)}$ בנויה מ-$\dot\Sigma^{(n-1)}$ (רקורסיה עצמאית); בספרות ה-NTK המפורסמת (למשל, Arora et al. 2019) תוחלת ה-$\dot\sigma$ נלקחת בדרך כלל ביחס ל-$\Lambda^{(n)}$ הבנויה מ-$\Sigma^{(n-1)}$. למבחן, עקבו אחר גרסת הסיכומים אך אל תתבלבלו בעת הצלבה.
- ניתוח ה-NTK מוצג עבור GF; הסיכומים מציינים שהוא "ניתן להתאמה כדי להתחשב גם ב-GD" — ומטרת המסגרת המנוסחת היא הוכחת התכנסות עבור רשתות **לא-לינאריות**, ומשלימה את הקשת: נוף (L3) $\to$ מסלולים עבור LNN (L4) $\to$ מסלולים עבור רשתות אולטרה-רחבות לא-לינאריות (L5).
