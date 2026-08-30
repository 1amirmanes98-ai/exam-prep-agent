# הרצאה 7 — הכללה 2
- **File:** materials/lectures/lecture_07_generalization_2.pdf | **Text:** materials/text/lectures/lecture_07_generalization_2.txt
- **Pillar:** Generalization
- **One-paragraph summary:** מציגה **רגולריזציה משתמעת (הטיה משתמעת)**: בלמידה עמוקה בעלת פרמטריזציית-יתר יש ממזערי הפסד-אמפירי רבים, ואופטימיזציה מבוססת-גרדיאנט נוטה לבחור כאלה שהם "פשוטים" תחת מדד מורכבות כלשהו, מה שתחת התפלגויות טבעיות מתואם עם הכללה (התער של אוקאם). במקום להניח מדדי מורכבות עבור חסמים (הרצאה 6), הרצאה זו מאפיינת את ההטיה ישירות בשלוש מסגרות. (i) רגרסיה לינארית בעלת פרמטריזציית-יתר ($d>m$, $\mathrm{rank}(X)=m$, הפסד $\ell_2$): כל שיטה איטרטיבית המאותחלת ב-$w^{(0)}=0$ שעדכוניה נמצאים בפרישת גרדיאנטי המדגם (GD/SGD ± מומנטום) ומגיעה להפסד אפס מתכנסת ל-$X(X^\top X)^{-1}y$ — האינטרפולנט בעל ה**נורמה האוקלידית המינימלית**. (ii) רשתות אולטרה-רחבות במשטר ה-NTK יורשות זאת: המנבא הנלמד הוא האינטרפולנט בעל נורמת-ה-RKHS-המינימלית, בלתי-תלוי באיזו העתקת מאפיינים מממשת את הקרנל. (iii) סיווג בינארי של נתונים פרידים לינארית עם ההפסד האקספוננציאלי: gradient flow על מנבא לינארי — ועל **רשת נוירונים לינארית מכל עומק** מאתחול מאוזן — מקיימת $\|w(t)\|\to\infty$ כאשר הכיוון $w(t)/\|w(t)\|$ מתכנס לפתרון ה**מרווח המקסימלי** של hard-SVM $u^*$ (Ji–Telgarsky). ראוי לציין שהתוצאה עיוורת-לעומק; הרחבות שבהן העומק כן משנה (רשתות קונבולוציה לינאריות) ורשתות הומוגניות (מקסום מרווח, Lyu–Li) חותמות את ההרצאה.

## Outline
1. **רגולריזציה משתמעת.** הרעיון: אופטימיזציה מבוססת-גרדיאנט בוחרת ממזערים "פשוטים" מבין הפתרונות הרבים בעלי הפסד-אימון-אפס; מסלול משלים לחסמי הרצאה 6.
   - 1.1 **רגרסיה לינארית.** שיטות פרישת-גרדיאנטים מאותחלות-אפס מתכנסות לממזער הגלובלי בעל נורמת-$\ell_2$ מינימלית $X(X^\top X)^{-1}y$ (Prop 1, Lem 1, Cor 1).
   - 1.2 **רשתות נוירונים אולטרה-רחבות.** משטר NTK ⇒ המנבא הנלמד הוא אינטרפולנט הקרנל $x\mapsto [K_{NTK}(x,x_1),\dots,K_{NTK}(x,x_m)](H^*)^{-1}y$; רגולריזציה משתמעת = נורמת RKHS מינימלית.
   - 1.3 **סיווג נתונים פרידים לינארית** (Ji–Telgarsky [2]). הפסד אקספוננציאלי, GF.
     - 1.3.1 **מבואות.** עובדות hard-SVM, וקטורים תומכים, הקבוע $\delta>0$ (Lem 2).
     - 1.3.2 **מנבאים לינאריים.** Lem 3 (הרכיב הניצב מתקן את עצמו) ו-Thm 1: $w(t)/\|w(t)\|\to u^*$.
     - 1.3.3 **רשתות נוירונים לינאריות.** דינמיקת קצה-אל-קצה; Thm 2: תחת אתחול מאוזן, $W_{1:N}(t)/\|W_{1:N}(t)\|\to u^*$ לכל עומק $N$.
     - 1.3.4 **הרחבות.** מגבלת העיוורון-לעומק; רשתות קונבולוציה לינאריות (העומק משנה); רשתות הומוגניות ממקסמות מרווח מנורמל.

## Key definitions
**Def (implicit regularization / implicit bias).** הנטייה של אופטימיזציה מבוססת-גרדיאנט, מבין ממזרי ההפסד-האמפירי הרבים של מודל בעל פרמטריזציית-יתר, לבחור פתרונות שהם "פשוטים" לפי מדד מורכבות כלשהו; תחת התפלגויות נתונים טבעיות פשטות כזו לרוב מקושרת להכללה טובה יותר.

**Def (overparametrized linear regression setting).** $X=\mathbb{R}^d$, $Y=\mathbb{R}$, $H=\{x\mapsto\langle x,w\rangle : w\in\mathbb{R}^d\}$, $\ell_{(x,y)}(w):=\frac{1}{2}(y-\langle x,w\rangle)^2$. עם $X:=[x_1,\dots,x_m]\in\mathbb{R}^{d\times m}$ (מופעים כעמודות) ו-$y=[y_1,\dots,y_m]\in\mathbb{R}^m$: $L_S(w)=\frac{1}{2m}\|X^\top w-y\|^2$. משטר בעל פרמטריזציית-יתר: $d>m$ וכן $\mathrm{rank}(X)=m$ (מופעים בלתי-תלויים לינארית) ⇒ ריבוי מינימות גלובליות עבור כל $y$.

**Def (NTK objects).** עבור רשת אולטרה-רחבה במשטר ה-NTK, הפלט על קלט $x$ עם משקלים נלמדים $w$ הוא $\langle\phi(x),w\rangle$, כאשר $\phi$ היא העתקת המאפיינים המגדירה את ה-NTK: $K_{NTK}(x,x'):=\langle\phi(x),\phi(x')\rangle$; $\Phi:=[\phi(x_1),\dots,\phi(x_m)]$; מטריצת גרם $H^*:=\Phi^\top\Phi\in\mathbb{R}^{m\times m}$, $(H^*)_{i,j}=K_{NTK}(x_i,x_j)$. העתקת מאפיינים $\psi$ "מממשת" את ה-NTK אם $K_{NTK}(x,x')=\langle\psi(x),\psi(x')\rangle$ עבור כל $x,x'$.

**Def (separable classification setting).** $X=\{x\in\mathbb{R}^d:\|x\|\le 1\}$, $Y=\{+1,-1\}$, הפסד אקספוננציאלי $\ell(y,\hat y)=e^{-y\hat y}$. $S=\{(x_i,y_i)\}_{i=1}^m$ הוא **פריד לינארית**: $\exists u\in\mathbb{R}^d$ עם $y_i\langle u,x_i\rangle>0\ \forall i\in[m]$. עבור מנבאים לינאריים הפסד האימון הוא $L_S(w)=\frac{1}{m}\sum_{i=1}^m e^{-\langle w,z_i\rangle}$ עם $z_i:=y_ix_i$.

**Def (maximum margin & max-margin solution).** $\gamma:=\max_{u\in\mathbb{R}^d,\|u\|=1}\min_{i\in[m]} y_i\langle u,x_i\rangle$ (פרידות $\iff\gamma>0$); $u^*:=\operatorname{argmax}_{u\in\mathbb{R}^d,\|u\|=1}\min_{i\in[m]} y_i\langle u,x_i\rangle$ — פתרון ה-hard-SVM.

**Hard-SVM facts (from intro ML, used as given).** $u^*$ קיים ויחיד; $\exists\,\alpha_1^*,\dots,\alpha_m^*\in\mathbb{R}_{\ge0}$ עם $u^*=\sum_{i=1}^m\alpha_i^* y_i x_i=\sum_i \alpha_i^* z_i$; אם $\alpha_i^*>0$ אזי $y_i\langle u^*,x_i\rangle=\gamma$ (המרווח מושג).

**Def 1 (support vectors).** $z_i:=y_ix_i$; $I:=\{i\in[m]:\alpha_i^*>0\}$; הדוגמאות $\{z_i\}_{i\in I}$ הן הווקטורים התומכים. **הנחה עומדת:** $\mathrm{span}(\{z_i\}_{i\in I})=\mathbb{R}^d$.

**Def ($\delta$ and $\Pi^\perp$).** $\delta:=\min_{\xi\in\mathbb{R}^d,\|\xi\|=1,\xi\perp u^*}\max_{i\in I}\langle\xi,z_i\rangle$ (Lem 2: $\delta>0$). $\Pi^\perp:\mathbb{R}^d\to\mathbb{R}^d$ היא ההטלה על המשלים האורתוגונלי של $\mathrm{span}(\{u^*\})$: $\Pi^\perp w=w-\langle w,u^*\rangle u^*$.

**Def (linear neural network overparameterization).** עומק $N$, רוחבים חבויים $d_1,\dots,d_{N-1}$: $\phi(W_1,\dots,W_N)=L_S(W_N W_{N-1}\cdots W_1)$ עם $W_{1:N}:=W_N\cdots W_1\in\mathbb{R}^{1,d}$ **מטריצת הקצה-אל-קצה (E2E)**; GF: $\dot W_j(t)=-\frac{\partial}{\partial W_j}\phi(W_1(t),\dots,W_N(t))$ עבור כל $j\in[N]$.

**Def (balanced initialization).** $\forall j\in[N-1]:\ W_{j+1}(0)^\top W_{j+1}(0)=W_j(0)W_j(0)^\top$.

**Def (homogeneous networks & their margin).** מודלים שבהם הכפלת הפרמטרים $\Theta$ ב-$c>0$ מכפילה את הפלט ב-$c^N$ ($N$ = סדר ההומוגניות; לוכד ארכיטקטורות ReLU ללא הטיות). מרווח: $\gamma(\Theta):=\min_{i\in[m]} y_i\, h_{\Theta/\|\Theta\|_{Fro}}(x_i)=\frac{\min_{i\in[m]} y_i\, h_\Theta(x_i)}{\|\Theta\|_{Fro}^N}$.

## Key theorems & results
**Prop 1 (linear regression: where span-of-gradients methods land).** מזערו את $L_S(w)$ עם $w^{(0)}=0$ ואיטרטים המקיימים $w^{(t+1)}-w^{(t)}\in\mathrm{span}(\{\nabla\ell_{(x_i,y_i)}(w):i\in[m],w\in\mathbb{R}^d\})$ (כולל GD ו-SGD, עם/בלי מומנטום). אם האיטרטים מתכנסים לממזער גלובלי (הפסד אפס), גבול זה הוא $X(X^\top X)^{-1}y$.

**רעיון ההוכחה:** $\nabla\ell_{(x_i,y_i)}(w)=(y_i-x_i^\top w)\cdot x_i\in\mathrm{span}(\{x_i\})$ ⇒ כל האיטרטים (והגבול — פרישות סגורות טופולוגית) נמצאים ב-$\mathrm{span}(\{x_i\}_{i=1}^m)$, ולכן $w^{(\infty)}=Xr$; הפסד אפס ⇒ $X^\top Xr=y$ עם $X^\top X$ הפיכה ($\mathrm{rank}(X)=m$) ⇒ $r=(X^\top X)^{-1}y$.

**רלוונטיות למבחן:** צטטו בדיוק אילו אלגוריתמים מכוסים ומדוע הגבול נשאר בפרישה.

**Lem 1 (minimal-norm characterization).** מבין כל הפתרונות בעלי הפסד-אפס של $L_S$, $X(X^\top X)^{-1}y$ הוא זה בעל הנורמה האוקלידית המינימלית.

**רעיון ההוכחה:** פרקו ממזער גלובלי בעל נורמה מינימלית $w^*=w_\parallel^*+w_\perp^*$ ביחס ל-$\mathrm{span}(\{x_i\})$; $X^\top w^*=X^\top w_\parallel^*$ ולכן $w_\parallel^*$ הוא גם ממזער גלובלי; פיתגורס מכריח $\|w_\perp^*\|=0$; הפתרון בעל הפסד-אפס בתוך-הפרישה יחיד $=X(X^\top X)^{-1}y$.

**Cor 1.** תחת תנאי Prop 1, האופטימיזציה מתכנסת לפתרון בעל הנורמה האוקלידית המינימלית. (רגולריזציה משתמעת של אופטימיזציה מבוססת-גרדיאנט ברגרסיה לינארית, אתחול אפס = מזעור נורמת-$\ell_2$.)

**Result (NTK regime).** המשקלים הנלמדים מתכנסים ל-$\Phi(\Phi^\top\Phi)^{-1}y$; כלל הניבוי

$$x\mapsto\big\langle\phi(x),\Phi(\Phi^\top\Phi)^{-1}y\big\rangle=[K_{NTK}(x,x_1),\dots,K_{NTK}(x,x_m)]^\top (H^*)^{-1}y .$$

עבור **כל** העתקת מאפיינים $\psi$ המממשת את ה-NTK (עם $\Psi:=[\psi(x_1),\dots,\psi(x_m)]$) אותו כלל שווה ל-$x\mapsto\langle\psi(x),\Psi(\Psi^\top\Psi)^{-1}y\rangle$ — המנבא הלינארי המאנטרפל בעל הנורמה-האוקלידית-המינימלית במרחב המאפיינים של $\psi$. ומכאן: רגולריזציה משתמעת של רשתות אולטרה-רחבות במשטר ה-NTK = **מזעור נורמה ב-RKHS**.

**רלוונטיות למבחן:** הכלל תלוי רק בקרנל, לא במימוש העתקת-המאפיינים.

**Lem 2 ($\delta>0$).** $\delta:=\min_{\xi:\|\xi\|=1,\xi\perp u^*}\max_{i\in I}\langle\xi,z_i\rangle>0$.

**רעיון ההוכחה:** אם ל-$\xi\perp u^*$ יחידה כלשהי היה $\max_{i\in I}\langle\xi,z_i\rangle\le0$, אזי $0=\langle\xi,u^*\rangle=\sum_{i\in I}\alpha_i^*\langle\xi,z_i\rangle$ עם מחוברים אי-חיוביים ו-$\alpha_i^*>0$ מכריח $\langle\xi,z_i\rangle=0\ \forall i\in I$; כיוון ש-$\{z_i\}_{i\in I}$ פורש את $\mathbb{R}^d$, $\xi=0$ — סתירה.

**Lem 3 (gradient pushes the perpendicular part back).** יהי $w\in\mathbb{R}^d$ עם $\langle w,u^*\rangle\ge0$ ו-$\|\Pi^\perp w\|\ge\frac{1+\ln(m)}{\delta}$. אזי $\langle\Pi^\perp w,\nabla L_S(w)\rangle\ge 0$.

**רעיון ההוכחה:** בחרו וקטור תומך $z'\in\operatorname{argmax}_{z\in\{z_i\}_{i\in I}}\langle-\Pi^\perp w,z\rangle$, כך ש-$\langle-\Pi^\perp w,z'\rangle\ge\delta\|\Pi^\perp w\|$; פצלו את $\langle\Pi^\perp w,\nabla L_S(w)\rangle=\frac1m\sum_i e^{-\langle w,z_i\rangle}\langle-\Pi^\perp w,\Pi^\perp z_i\rangle$ לאיבר ה-$z'$, החסום מלמטה על ידי $\frac1m e^{-\gamma\langle w,u^*\rangle}e^{\delta\|\Pi^\perp w\|}\delta\|\Pi^\perp w\|$ (בשימוש ב-$z'=\Pi^\perp z'+\gamma u^*$), ולאיברים עם $\langle\Pi^\perp w,\Pi^\perp z_i\rangle\ge0$, כל אחד חסום מלמטה על ידי $-e^{-\gamma\langle w,u^*\rangle}\cdot\frac1e$ באמצעות $-\beta e^{-\beta}\ge-e^{-1}$; הסף $\|\Pi^\perp w\|\ge\frac{1+\ln m}{\delta}$ גורם לאיבר החיובי לשלוט.

**רלוונטיות למבחן:** הסף המדויק $\frac{1+\ln(m)}{\delta}$ ותפקיד ההנחה $\langle w,u^*\rangle\ge 0$.

**Thm 1 (GF on linear predictors → max margin).** יהי $w(t)$ מסלול GF, $\dot w(t)=-\nabla L_S(w(t))$, עם $\lim_{t\to\infty}L_S(w(t))=0$. אזי

$$\lim_{t\to\infty}\frac{w(t)}{\|w(t)\|}=u^*.$$

**רעיון ההוכחה:** הפסד $\to0$ ⇒ כל $e^{-\langle w(t),z_i\rangle}\to0$ ⇒ $\|w(t)\|\to\infty$ וכן $\exists t_0$: $\langle w(t),z_i\rangle\ge0\ \forall i,t\ge t_0$ ⇒ $\langle w(t),u^*\rangle=\sum_i\alpha_i^*\langle w(t),z_i\rangle\ge0$; $\frac{d}{dt}\|\Pi^\perp w(t)\|^2=-2\langle\Pi^\perp w(t),\nabla L_S(w(t))\rangle\le0$ בכל פעם ש-$\|\Pi^\perp w(t)\|\ge\frac{1+\ln m}{\delta}$ (Lem 3) ⇒ $\|\Pi^\perp w(t)\|\le R:=\max\{\|\Pi^\perp w(t_0)\|,\frac{1+\ln m}{\delta}\}$ עבור כל $t\ge t_0$ (אחרת סתירת משפט-הערך-הממוצע בחצייה האחרונה של $R$); $\|\Pi^\perp w\|$ חסום + $\|w\|\to\infty$ ⇒ $w/\|w\|\to u^*$.

**רלוונטיות למבחן:** ההוכחה ניתנה במלואה — חומר מבחן קנוני; שימו לב שאינפימום ההפסד אינו מושג, רק הכיוון מתכנס.

**Thm 2 (GF on deep linear networks → max margin).** יהי $(W_1(t),\dots,W_N(t))$ מסלול GF של $\phi(\cdot)$ מ**אתחול מאוזן**, עם $\lim_{t\to\infty}\phi(W_1(t),\dots,W_N(t))=0$. אזי, בראיית $W_{1:N}(t)\in\mathbb{R}^{1,d}$ כווקטור,

$$\lim_{t\to\infty}\frac{W_{1:N}(t)}{\|W_{1:N}(t)\|}=u^*.$$

**רעיון ההוכחה:** המאוזנות נותנת את דינמיקת ה-E2E $\dot W_{1:N}=-\sum_{j=1}^N[W_{1:N}W_{1:N}^\top]^{\frac{j-1}{N}}\nabla\ell(W_{1:N})[W_{1:N}^\top W_{1:N}]^{\frac{N-j}{N}}$, אשר עבור וקטור שורה $w(t):=W_{1:N}(t)$ הופכת ל-$\dot w=-\|w\|^{\frac{2(N-1)}{N}}\nabla L_S(w)-(N-1)\|w\|^{-\frac2N}\langle\nabla L_S(w),w\rangle w$; די להראות $\frac{\|\Pi^\perp w(t)\|^2}{\|w(t)\|^2}\to0$; באמצעות כלל המנה, כאשר היחס $\ge\epsilon$ ו-$\|w\|^2\ge\frac{(1+\ln m)^2}{\delta^2\epsilon}$, $\frac{d}{dt}\frac{\|\Pi^\perp w\|^2}{\|w\|^2}\le 2\|w\|^{-\frac2N}\langle\nabla L_S(w),w\rangle\epsilon=-\frac{\epsilon}{N}\frac{d}{dt}\ln(\|w\|^2)<0$ (בשימוש ב-Lem 3 וב-$\langle\nabla L_S(w),w\rangle=-\frac1m\sum_ie^{-\langle w,z_i\rangle}\langle w,z_i\rangle<0$); באינטגרציה, אם היחס נשאר $\ge\epsilon$ הירידה באגף ימין הייתה $-\frac{\epsilon}{N}[\ln\|w(t')\|^2-\ln\|w(t)\|^2]\to-\infty$ — סתירה, כך שהיחס בסופו של דבר יורד מתחת לכל $\epsilon$ ונשאר שם.

**רלוונטיות למבחן:** הניסוח + תפקיד האתחול המאוזן; התוצאה מתקיימת עבור **כל עומק $N$** — אותו גבול $u^*$.

**Exercise (E2E dynamics in vector form).** בהינתן דינמיקת ה-E2E לעיל עם $W_{1:N}(t)\in\mathbb{R}^{1,d}$, הוכיחו

$$\frac{d}{dt}W_{1:N}(t)=-\|W_{1:N}(t)\|_{Fro}^{\frac{2(N-1)}{N}}\cdot\nabla L_S(W_{1:N}(t))-(N-1)\|W_{1:N}(t)\|_{Fro}^{-\frac2N}\cdot\big\langle\nabla L_S(W_{1:N}(t)),W_{1:N}(t)\big\rangle\cdot W_{1:N}(t).$$

**Extensions (1.3.4, stated results).** (i) האמור לעיל עיוור-לעומק — עומקים $1$, $2$, $\ge3$ נותנים את אותה הטיה משתמעת, בניגוד לפרקטיקה; עם וריאנטים "קונבולוציוניים" מסוימים של רשתות לינאריות העומק כן משנה את ההטיה המשתמעת (Gunasekar et al. [1]). (ii) עבור רשתות הומוגניות מסדר $N$, תחת תנאים מסוימים GD מחזיר פתרון מקורב ל-$\max_\Theta\gamma(\Theta)$, כלומר ממקסם את המרווח המנורמל (Lyu–Li [3]). (iii) Thm 2 מתרחב ל-GD עם קצב למידה יורד ואתחול שרירותי (לא-מאוזן); אומת אמפירית (איור: GD על נתונים פרידים דו-ממדיים סינתטיים, LNN בעומק 4 ומנבא בעומק 1 שניהם מתכנסים לכיוון המרווח-המקסימלי; מ-Ji–Telgarsky, "GD Aligns the Layers of Deep Linear Networks").

## טכניקות וטריקים
- **אינווריאנטיות פרישה:** עדכונים הבנויים מגרדיאנטי מדגם נשארים ב-$\mathrm{span}(\{x_i\})$; תת-מרחבים סגורים טופולוגית, כך שגם גבולות נשארים שם; ואז פתרו את המערכת הלינארית בעלת הפסד-האפס בקואורדינטות הפרישה.
- **פירוק אורתוגונלי + פיתגורס** להוכחת טענות נורמה-מינימלית ($w^*=w_\parallel^*+w_\perp^*$; חסלו את הרכיב הניצב).
- **תלות בקרנל-בלבד:** שכתוב $\langle\phi(x),\Phi(\Phi^\top\Phi)^{-1}y\rangle$ אך ורק באמצעות $K_{NTK}$ ומטריצת הגרם $H^*$, המראה אי-תלות במימוש העתקת-המאפיינים.
- **פיתוח דואלי/וקטורים-תומכים** $u^*=\sum_i\alpha_i^*z_i$ להמרת טענות על $u^*$ לטענות על וקטורים תומכים (Lem 2, חיוביות של $\langle w,u^*\rangle$).
- **פירוק וקטור-תומך** $z'=\Pi^\perp z'+\gamma u^*$ (תקף כיוון ש-$\langle u^*,z'\rangle=\gamma$ על התומכים) לפירוק $e^{-\langle w,z'\rangle}=e^{-\gamma\langle w,u^*\rangle}e^{-\langle\Pi^\perp w,z'\rangle}$.
- **אי-שוויון סקלרי** $-\beta e^{-\beta}\ge-e^{-1}$ עבור $\beta\ge0$, לחסימה אחידה של מחוברים "רעים".
- **זהות הטלה** $\langle v_1,\Pi v_2\rangle=\langle\Pi v_1,\Pi v_2\rangle=\langle\Pi v_1,v_2\rangle$ עבור הטלות אורתוגונליות.
- **טיעוני Lyapunov/סף:** הראו שכמות ($\|\Pi^\perp w\|^2$, או היחס $\|\Pi^\perp w\|^2/\|w\|^2$) אינה עולה מעל סף; הסיקו חסימות באמצעות סתירת חצייה-אחרונה/משפט-הערך-הממוצע.
- **המרת תנועה רדיאלית לנגזרת-לוג:** $2\|w\|^{-2/N}\langle\nabla L_S(w),w\rangle=-\frac1N\frac{d}{dt}\ln(\|w\|^2)$, ואז אנטגרלו כדי לכפות סתירה (כמות חסומה מול $-\infty$).
- **התכנסות כיוונית** מנוסחת באמצעות חסימות הרכיב הניצב (המקרה הלינארי) או התאפסות היחס הניצב המנורמל (המקרה העמוק).

## נקודות רלוונטיות למבחן
- ההנחות המדויקות של Prop 1: $w^{(0)}=0$; עדכונים ב-$\mathrm{span}(\{\nabla\ell_{(x_i,y_i)}(w): i\in[m], w\in\mathbb{R}^d\})=\mathrm{span}(\{x_i\}_{i=1}^m)$; התכנסות להפסד אפס **בהנחה**. מכוסים: GD, SGD, עם ובלי מומנטום.
- הגבול הוא $X(X^\top X)^{-1}y$ — שימו לב שזה $X^\top X\in\mathbb{R}^{m\times m}$ (הפיכה כיוון ש-$\mathrm{rank}(X)=m$, $d>m$), לא $XX^\top$.
- משפטי שורת-מחץ לציטוט: רגרסיה לינארית + אתחול אפס ⇒ רגולריזציה משתמעת = נורמה אוקלידית מינימלית; משטר NTK ⇒ נורמת RKHS מינימלית; סיווג פריד + הפסד אקספוננציאלי ⇒ מרווח מקסימלי (hard SVM).
- פרטי ההפסד האקספוננציאלי: $L_S(w)=\frac1m\sum_ie^{-\langle w,z_i\rangle}$; הפסד אפס מתקרבים אליו אך לעולם לא מושג; $\|w(t)\|\to\infty$; רק התכנסות **כיוונית** משמעותית.
- עובדות ה-hard-SVM בשימוש כקופסאות שחורות: קיום/יחידות של $u^*$; $u^*=\sum_i\alpha_i^*z_i$, $\alpha_i^*\ge0$; $\alpha_i^*>0\Rightarrow y_i\langle u^*,x_i\rangle=\gamma$.
- ההנחה העומדת $\mathrm{span}(\{z_i\}_{i\in I})=\mathbb{R}^d$ היא מה שגורם ל-$\delta>0$ (Lem 2) — שאלת "היכן נעשה שימוש בהנחה זו?" מועדפת.
- קבוע הסף ב-Lem 3: $\frac{1+\ln(m)}{\delta}$; ב-Thm 1 החסם $R=\max\{\|\Pi^\perp w(t_0)\|,\frac{1+\ln m}{\delta}\}$.
- אתחול מאוזן: $W_{j+1}(0)^\top W_{j+1}(0)=W_j(0)W_j(0)^\top$ — שימו לב למיקום השחלוף (גרם של שורות לעומת עמודות).
- חזקות דינמיקת E2E: $\|W_{1:N}\|_{Fro}^{2(N-1)/N}$ על איבר הגרדיאנט, $-(N-1)\|W_{1:N}\|_{Fro}^{-2/N}$ על האיבר הרדיאלי; קביעת $N=1$ משחזרת GF פשוטה.
- העיוורון-לעומק הוא **מגבלה** מפורשת: עומקים $1,2,\ge3$ כולם נותנים $u^*$, ובכל זאת העומק משנה אמפירית; השוו לרשתות קונבולוציה לינאריות (Gunasekar et al.) ולפירוק מטריצות (הרצאה 8).
- נרמול מרווח הומוגני: $\gamma(\Theta)=\min_i y_i h_\Theta(x_i)/\|\Theta\|_{Fro}^N$ — המעריך הוא סדר ההומוגניות $N$ (רשתות ReLU ללא הטיות הן הומוגניות).
- מלכודת חישוב סימן: $\langle\nabla L_S(w),w\rangle=-\frac1m\sum_ie^{-\langle w,z_i\rangle}\langle w,z_i\rangle<0$ ברגע שכל המרווחים חיוביים — זה מניע את צמיחת $\|w(t)\|$.
