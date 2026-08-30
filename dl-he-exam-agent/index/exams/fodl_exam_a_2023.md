# מבחן FODL — מועד א׳ 2023
**Date / semester:** 13.07.2023 — סמסטר ב׳ 2022/23 (תשפ"ג), מועד א׳; מרצה Dr. Nadav Cohen, מתרגל Noam Razin; מבחן בן 3 שעות
**Total points:** 105

## Q1 (38 pts) — אזורי לינאריות מקומית של רשתות ReLU רדודות נטולות-הטיה
**Topics:** מחלקת השערות, רשתות ReLU, אזורים לינאריים | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
נאמר ש-$h:\mathbb{R}^d\to\mathbb{R}$ *לינארית סביב* $x\in\mathbb{R}^d$ *לפי וקטור* $a\in\mathbb{R}^d$ אם קיים $\epsilon>0$ כך שלכל $x'\in\mathbb{R}^d$ עם $\|x'-x\|\le\epsilon$ מתקיים $h(x')=a^\top x'$. כלומר, קיים כדור סביב $x$ שעליו $h$ היא הפונקציה הלינארית המוגדרת על ידי $a$. נסמן:
$$A_h=\big\{a\in\mathbb{R}^d:\ \exists\, x\in\mathbb{R}^d \text{ for which } h \text{ is linear around } x \text{ according to the vector } a\big\}.$$
במילים אחרות, $A_h$ מכיל, עבור כל נקודה שסביבה $h$ לינארית, את הווקטור המגדיר את $h$ בסביבת אותה נקודה.

תהי $H_M$ מחלקת ההשערות של רשתות נוירונים עם שכבה חבויה יחידה ברוחב $M$, ללא הטיות, עם קלט ופלט חד-ממדיים (כלומר $X=Y=\mathbb{R}$, כאשר $X$ הוא מרחב הקלט ו-$Y$ מרחב הפלט), ואקטיבציית ReLU על נוירוני השכבה החבויה. דהיינו:
$$H_M=\Big\{x\mapsto \textstyle\sum_{i=1}^M v_i\,\sigma(w_i x)\ :\ w_1,\dots,w_M,\,v_1,\dots,v_M\in\mathbb{R}\Big\},\qquad \sigma(z)=\max\{0,z\}.$$

1. **(12 pts)** הוכיחו שלכל $h\in H_M$ מתקיים $|A_h|\le 2$. שימו לב שבתת-סעיף זה ממד הקלט בהגדרת $A_h$ הוא $d=1$.

כעת נתמקד ברשתות עם קלט רב-ממדי. עבור $d\ge 2$, נסמן ב-$H_M^d$ את מחלקת ההשערות של רשתות נוירונים עם שכבה חבויה יחידה ברוחב $M$, ללא הטיות, קלט ממימד $d$ ופלט חד-ממדי (כלומר $X=\mathbb{R}^d$, $Y=\mathbb{R}$), ואקטיבציית ReLU על נוירוני השכבה החבויה. דהיינו:
$$H_M^d=\Big\{x\mapsto \textstyle\sum_{i=1}^M v_i\,\sigma(w_i^\top x)\ :\ w_1,\dots,w_M\in\mathbb{R}^d,\ v_1,\dots,v_M\in\mathbb{R}\Big\}.$$

2. **(13 pts)** תהי $h\in H_M^d$ מוגדרת על ידי המשקלים $w_1,\dots,w_M\in\mathbb{R}^d$, $v_1,\dots,v_M\in\mathbb{R}$. עבור $x\in\mathbb{R}^d$ המקיים $w_i^\top x\neq 0$ לכל $i\in\{1,\dots,M\}$, הוכיחו ש-$h$ לינארית סביב $x$ לפי $a\in\mathbb{R}^d$ כלשהו. כתבו במפורש מהו ה-$a$ שלפיו $h$ לינארית (שימו לב ש-$a$ עשוי להיות תלוי ב-$x$).

3. **(13 pts)** הניחו ש-$M\ge d$ (רוחב הרשת אינו קטן מממד הקלט). הוכיחו או הפריכו את הטענה הבאה: קיים $h\in H_M^d$ שעבורו $|A_h|\ge 2^d$.

**Solution sketch:**
**1.** ללא הטיות, כל נוירון $x\mapsto v_i\sigma(w_i x)$ לינארי בנפרד על $x>0$ ועל $x<0$ (נקודת השבירה האפשרית היחידה היא $x=0$). סביב כל $x>0$:

$$h(x')=\big(\sum_{i:\,w_i>0}v_iw_i\big)x'$$

סביב כל $x<0$:

$$h(x')=\big(\sum_{i:\,w_i<0}v_iw_i\big)x'$$

לכן כל מקדם לינאריות-מקומית שווה ל-$a_+=\sum_{i:w_i>0}v_iw_i$ או ל-$a_-=\sum_{i:w_i<0}v_iw_i$. לינאריות סביב $x=0$ (אם היא מתקיימת) מכריחה את המקדם להתלכד עם אלה, ולכן $A_h\subseteq\{a_+,a_-\}$ וגם $|A_h|\le2$.

**2.** נגדיר

$$\epsilon=\min_{i:\,w_i\ne0}\,|w_i^\top x|/\|w_i\|>0$$

עבור $\|x'-x\|\le\epsilon$, לכל $w_i^\top x'$ יש אותו סימן כמו ל-$w_i^\top x$ (קושי-שוורץ). לכן על כדור זה $h(x')=\sum_{i\in I_+}v_i\,w_i^\top x'$ עם $I_+=\{i:\,w_i^\top x>0\}$, כלומר $h$ לינארית סביב $x$ עם

$$\boxed{\,a=\sum_{i\in I_+}v_i w_i\,}$$

**3.** הטענה נכונה. ניקח $w_i=e_i$ (הבסיס הסטנדרטי) ו-$v_i=1$ עבור $i=1,\dots,d$, וגם $v_i=0$ (או $w_i=0$) עבור $M-d$ הנוירונים הנותרים, כלומר $h(x)=\sum_{i=1}^d\sigma(x_i)$. עבור כל תבנית סימנים $s\in\{+,-\}^d$, בחרו $x$ באורתנט הפתוח המתאים (כל $w_i^\top x=x_i\ne0$). לפי תת-סעיף 2, $h$ לינארית סביב $x$ עם $a_s=\sum_{i:\,s_i=+}e_i$. אלה הם וקטורי המציין של כל $2^d$ תת-הקבוצות של $\{1,\dots,d\}$ — שונים בזוגות — ולכן $|A_h|\ge2^d$.

**💡 טריקים שימושיים:** ReLU נטול-הטיה ⇒ כל היפר-מישור שבירה עובר דרך הראשית, ולכן תבניות הסימנים של $\{w_i^\top x\}$ מאנדקסות את האזורים הלינאריים; המקדם המקומי הוא $a=\sum_{i\,:\,w_i^\top x>0}v_iw_i$; כדי להגיע ל-$2^d$ אזורים בחרו $w_i=e_i,v_i=1$ כך שאורתנטים שונים נותנים וקטורי מציין-תת-קבוצה שונים.

**⚠️ שים לב:** (1) ב-$d=1$ יש רק שני אזורי סימן, והמקדם ב-$x=0$ (אם לינארית שם) חייב להיות שווה ל-$a_+$ או ל-$a_-$ — ולכן $|A_h|\leq2$; (2) הציגו $\epsilon$ *מפורש* (קושי-שוורץ שומר כל סימן קבוע על הכדור) וכתבו את $a$ במפורש; (3) הטענה נכונה — הוכיחו שוקטורי ה-$2^d$ שונים בזוגות.

## Q2 (37 pts) — Gradient flow: קצב התכנסות מסוג PL וחוק שימור של softmax
**Topics:** gradient flow, תנאי PL, חוקי שימור, אינווריאנטיות של softmax | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_03_optimization_1, lecture_04_optimization_2, fodl_recitation_gradient_flow
**Statement (English translation):**
**חלק ראשון.** תהי $f:\mathbb{R}^d\to\mathbb{R}$ גזירה ברציפות, המשיגה את ערכה המינימלי בנקודה $w^*\in\operatorname{argmin}_{w\in\mathbb{R}^d}f(w)$. הניחו שלכל $w\in\mathbb{R}^d$:
$$f(w)-f(w^*)\le\|\nabla f(w)\|^2.$$

1. **(10 pts)** נניח שאנו מריצים gradient flow על $f$ עם אתחול $w_0\in\mathbb{R}^d$. נסמן ב-$w(t)$ את הפרמטרים של $f$ בזמן $t\ge0$. הוכיחו שלכל $t\ge0$:
$$f(w(t))-f(w^*)\le e^{-t}\cdot\big(f(w_0)-f(w^*)\big).$$

**חלק שני.** תהי $f:\mathbb{R}^d\to\mathbb{R}$ גזירה ברציפות. הניחו שקיים $v\in\mathbb{R}^d$ שעבורו $f(w+c\cdot v)=f(w)$ לכל $c\in\mathbb{R}$ ו-$w\in\mathbb{R}^d$.

2. **(6 pts)** הוכיחו ש-$\nabla f(w)^\top v=0$ לכל $w\in\mathbb{R}^d$. *רמז:* התבוננו ב-$g(c):=f(w+c\cdot v)$.

3. **(6 pts)** נסמן ב-$S:\mathbb{R}^d\to\mathbb{R}^d$ את פונקציית ה-softmax; כלומר, לכל $z\in\mathbb{R}^d$ ואינדקס $i\in\{1,\dots,d\}$:
$$S(z)_i=\frac{\exp(z_i)}{\sum_{j=1}^d\exp(z_j)}.$$
הוכיחו ש-$S(z+c\cdot\mathbf{1})=S(z)$ לכל $z\in\mathbb{R}^d$ ו-$c\in\mathbb{R}$, כאשר $\mathbf{1}\in\mathbb{R}^d$ הוא הווקטור שכל רכיביו שווים לאחד.

תהי $h_\theta:\mathbb{R}^d\to\mathbb{R}^d$ רשת מלאה עם $L-1$ שכבות חבויות, ללא הטיות, פונקציית אקטיבציה גזירה $\sigma$, ומשקלים $\theta$; כלומר:
$$h_\theta(x)=W_L\,\sigma\big(W_{L-1}\,\sigma(\cdots\sigma(W_1x)\cdots)\big),$$
כאשר $\theta:=(W_1,\dots,W_L)$ הוא וקטור המכיל את כל רכיבי מטריצות המשקל של הרשת. לשם הפשטות, הניחו שממד הקלט, ממד הפלט, וכל הממדים החבויים הם $d$. הניחו גם שברשותנו דוגמת אימון יחידה $x\in\mathbb{R}^d$ עם תווית $y\in\mathbb{R}$, ופונקציית הפסד גזירה ברציפות $\ell:\mathbb{R}^d\times\mathbb{R}\to\mathbb{R}$ (המשתנה השני של $\ell$ הוא התווית האמיתית והראשון הוא ניבוי הרשת).

4. **(10 pts)** נתבונן בפונקציית ההפסד הבאה ביחס לפרמטרים של השכבה האחרונה ברשת:
$$\phi(W_L):=\ell\big(S(h_\theta(x)),\,y\big).$$
נניח שאנו מריצים gradient flow על $\phi$ עם אתחול $W_L(0)\in\mathbb{R}^{d\times d}$ (כלומר, אנו מאמנים רק את השכבה האחרונה של הרשת ו"מקפיאים" את $W_1,\dots,W_{L-1}$ בערכים שרירותיים). נסמן ב-$W_L(t)$ את פרמטרי השכבה האחרונה בזמן $t\ge0$. הוכיחו שלכל $t\ge0$:
$$\langle W_L(t),\mathbf{1}\rangle=\langle W_L(0),\mathbf{1}\rangle,$$
כאשר $\mathbf{1}\in\mathbb{R}^{d\times d}$ מסמן את המטריצה שכל רכיביה שווים לאחד. במילים אחרות, הוכיחו שסכום המשקלים בשכבה האחרונה אינו משתנה תחת gradient flow.
*רמז:* השתמשו בטענות מתת-סעיפים 2 ו-3.

5. **(5 pts)** אם היינו מריצים gradient flow ביחס לכל פרמטרי הרשת, כלומר על הפונקציה $\psi(\theta):=\ell\big(S(h_\theta(x)),y\big)$, האם $\langle W_L(t),\mathbf{1}\rangle=\langle W_L(0),\mathbf{1}\rangle$ עדיין היה מתקיים לכל זמן $t\ge0$? הוכיחו את תשובתכם.

**Solution sketch:**
**1.** תחת gradient flow $\dot w(t)=-\nabla f(w(t))$:

$$\frac{d}{dt}\big(f(w(t))-f(w^*)\big)=-\|\nabla f(w(t))\|^2\le-\big(f(w(t))-f(w^*)\big)$$

לפי אי-השוויון המונח מסוג PL. Grönwall (או אינטגרציה של $\frac{d}{dt}\ln(\cdot)\le-1$, תוך טיפול במקרה שבו הפער מגיע ל-$0$) נותן את הדעיכה $e^{-t}$.

**2.** $g(c)=f(w+cv)$ קבועה וגזירה, ולכן $0=g'(0)=\nabla f(w)^\top v$. מכיוון ש-$w$ היה שרירותי, זה מתקיים בכל מקום.

**3.** גם המונה וגם המכנה מקבלים פקטור $e^c$:

$$S(z+c\mathbf1)_i=\frac{e^{c}e^{z_i}}{e^{c}\sum_j e^{z_j}}=S(z)_i$$

**4.** נכתוב $u:=\sigma(W_{L-1}\sigma(\cdots\sigma(W_1x)))$ כך ש-$\phi(W_L)=\ell(S(W_Lu),y)$. מכיוון ש-

$$(W_L+c\,\mathbf1_{d\times d})u=W_Lu+c\,(\mathbf1^\top u)\,\mathbf1_d$$

תת-סעיף 3 נותן $\phi(W_L+c\,\mathbf1_{d\times d})=\phi(W_L)$ לכל $c$. לפי תת-סעיף 2 (המוחל ב-$\mathbb{R}^{d\times d}$ עם כיוון $v=\mathbf1_{d\times d}$): $\langle\nabla\phi(W_L),\mathbf1\rangle=0$ לכל $W_L$. לכן

$$\frac{d}{dt}\langle W_L(t),\mathbf1\rangle=\langle-\nabla\phi(W_L(t)),\mathbf1\rangle=0$$

ולכן המכפלה הפנימית נשמרת.

**5.** כן, זה עדיין מתקיים: תחת gradient flow של הרשת המלאה $\dot W_L(t)=-\nabla_{W_L}\psi(\theta(t))$, ועבור *כל* ערכים קבועים של $W_1,\dots,W_{L-1}$ להעתקה $W_L\mapsto\psi(\theta)$ יש אותה אינווריאנטיות להוספת $c\,\mathbf1_{d\times d}$. לכן $\langle\nabla_{W_L}\psi(\theta),\mathbf1\rangle=0$ בכל $\theta$, ו-$\langle W_L(t),\mathbf1\rangle$ נותר קבוע.

**💡 טריקים שימושיים:** אי-שוויון PL + GF ⇒ $\frac{d}{dt}(f-f^*)\leq-(f-f^*)$ ⇒ Grönwall נותן $e^{-t}$; כיוון אינווריאנטיות $v$ מכריח $\nabla f\perp v$ (גזרו $g(c)=f(w+cv)$ ב-$0$); softmax אינווריאנטית להזזה מכיוון שה-$e^c$ מתבטל; שרשרו אותם — הוספת $c\mathbf1$ ל-$W_L$ מזיזה את הלוגיטים בקבוע, כיוון האפס המדויק של softmax.

**⚠️ שים לב:** (1) טפלו במקרה שבו הפער מגיע ל-$0$ בעת חלוקה בו ב-Grönwall; (4) העיקר הוא $(W_L+c\mathbf1)u=W_Lu+c(\mathbf1^\top u)\mathbf1$ — הזזת לוגיט *קבועה*, לא שרירותית; (5) "כן" — האינווריאנטיות מתקיימת ב-$W_L$ עבור כל שכבות תחתונות קפואות, ולכן אותו טיעון $\nabla_{W_L}\perp\mathbf1$ שורד.

## Q3 (30 pts) — הכללה דרך כיסוי סופי: התכנסות אחידה, דיסקרטיזציית Lipschitz, חסמים משוקללי-אינדקס
**Topics:** התכנסות אחידה, Hoeffding, ריכוזיות, מספרי כיסוי, רגולריזציה מרומזת, כלים הסתברותיים | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2, lecture_09_generalization_4
**Statement (English translation):**
עבור מרחב קלט $X$ ומרחב פלט $Y$, תהי $H\subseteq Y^X$ מחלקת השערות ותהי $F\subseteq H$ תת-קבוצה **סופית** של $H$. יהי $\epsilon>0$. הניחו שלכל $h\in H$ קיים $f\in F$ כך ש
$$|h(x)-f(x)|\le\epsilon \quad\text{for every } x\in X$$
(כלומר, $F$ הוא $\epsilon$-כיסוי של $H$ בנורמת הסופרמום; הכימות על $x$ בהתאם לשימוש ב-$\|h-f\|_\infty$ בתת-סעיף 3).

תהי $D$ התפלגות (לא ידועה) מעל $X\times Y$, יהי $S=\{(x_n,y_n)\}_{n=1}^N$ מדגם אימון של $N$ דוגמאות שנדגמו i.i.d. מ-$D$, ותהי $\ell:Y\times Y\to[0,1]$ פונקציית הפסד. עבור השערה $h\in H$, נסמן ב-$L_D(h)$ את שגיאת ההכללה (דהיינו $L_D(h):=\mathbb{E}_{(x,y)\sim D}[\ell(h(x),y)]$) וב-$L_S(h)$ את שגיאת המדגם (האמפירית) (דהיינו $L_S(h):=\frac{1}{N}\sum_{n=1}^N\ell(h(x_n),y_n)$).

1. **(8 pts)** גזרו חסם הכללה המבוסס על התכנסות אחידה עבור המחלקה $F$. כלומר, גזרו ביטוי $\Delta(N,\delta)$ (שאינו תלוי בהשערה), המקיים $\Delta(N,\delta)\xrightarrow[N\to\infty]{}0$ לכל $\delta\in(0,1)$, כך שבהסתברות גדולה או שווה ל-$1-\delta$:
$$\forall f\in F:\quad L_D(f)-L_S(f)\le\Delta(N,\delta).$$
*תזכורת (חסם Hoeffding):* יהיו $A_1,\dots,A_N$ משתנים מקריים בלתי תלויים ושווי-התפלגות החסומים בקטע $[0,1]$. לכל $\epsilon\ge0$:
$$P\Big(\Big|\tfrac{1}{N}\textstyle\sum_{i=1}^N A_i-\mathbb{E}[A_1]\Big|\ge\epsilon\Big)\le 2\exp(-2N\epsilon^2).$$

2. **(11 pts)** הניחו שפונקציית ההפסד $\ell$ היא $\rho$-Lipschitz ביחס למשתנה הראשון שלה, עבור קבוע $\rho>0$. גזרו חסם הכללה עבור המחלקה $H$ המבוסס על "טכניקת החסימה (הכיסוי)" שנלמדה בכיתה. כלומר, עבור $\Delta(N,\delta)$ מתת-הסעיף הקודם, הוכיחו שלכל $\delta\in(0,1)$, בהסתברות גדולה או שווה ל-$1-\delta$:
$$\forall h\in H:\quad L_D(h)-L_S(h)\le\Delta(N,\delta)+2\rho\epsilon.$$

3. **(11 pts)** נסמן ב-$F_1,\dots,F_R\subseteq F$ חלוקה שרירותית של $F$ לתת-קבוצות זרות. כלומר, $F_i\cap F_j=\emptyset$ לכל $i\neq j\in\{1,\dots,R\}$, וגם $F_1\cup\cdots\cup F_R=F$. נניח שברשותנו אלגוריתם למידה הנוטה להחזיר השערות $h\in H$ שעבורן $f\in\operatorname{argmin}_{f\in F}\|h-f\|_\infty$ נמצא בתת-קבוצה $F_i$ בעלת אינדקס $i$ קטן יחסית. גזרו חסם הכללה הדומה לחסם מתת-סעיף 2, אך מתאים לשימוש באלגוריתם זה. כלומר, עבור $h\in H$, ככל שהאינדקס $i$ של תת-הקבוצה $F_i$ שבה נמצאת ההשערה של $F$ הקרובה ביותר ל-$h$ קטן יותר, כך החסם עבור $h$ צריך להיות קטן יותר.

**Solution sketch:**
**1.** נקבע $f\in F$: המשתנים $A_n=\ell(f(x_n),y_n)$ הם i.i.d. ב-$[0,1]$ עם תוחלת $L_D(f)$. Hoeffding נותן זנב $2e^{-2N\epsilon^2}$. חסם איחוד על $F$ הסופי עם ביטחון לכל-השערה $\delta/|F|$ נותן

$$\Delta(N,\delta)=\sqrt{\ln(2|F|/\delta)/(2N)}\to0$$

**2.** בהינתן $h\in H$, בחרו איבר כיסוי $f$ עם $\|h-f\|_\infty\le\epsilon$. תכונת ה-$\rho$-Lipschitz נותנת נקודתית $|\ell(h(x),y)-\ell(f(x),y)|\le\rho\epsilon$. לכן $|L_D(h)-L_D(f)|\le\rho\epsilon$ וגם $|L_S(h)-L_S(f)|\le\rho\epsilon$. על המאורע של תת-סעיף 1:

$$L_D(h)-L_S(h)\le\big(L_D(f)-L_S(f)\big)+2\rho\epsilon\le\Delta(N,\delta)+2\rho\epsilon$$

בו-זמנית לכל $h\in H$.

**3.** הקצאת ביטחון לא-אחידה (בסגנון SRM): נקבע $\delta_i:=\delta\cdot2^{-i}$ (כל פיצול סכים כגון $\delta/(i(i+1))$ עובד, כך ש-$\sum_i\delta_i\le\delta$). החילו את חסם תת-סעיף 1 על כל $F_i$ עם ביטחון $\delta_i$ וקחו חסם איחוד על $i$. בהסתברות $\ge1-\delta$, בו-זמנית לכל $i$ ולכל $f\in F_i$:

$$L_D(f)-L_S(f)\le\Delta_i:=\sqrt{\big(\ln(2|F|/\delta)+i\ln2\big)/(2N)}$$

(חסמו $|F_i|\le|F|$ בתוך הלוג כך ש-$\Delta_i$ עולה באמת ב-$i$; שמירה על $\ln|F_i|$ עלולה להפר את המונוטוניות הנדרשת מכיוון שגדלי החלוקה $|F_i|$ שרירותיים.) בשילוב עם שלב הכיסוי כמו ב-(2): כל $h\in H$ שאיבר הכיסוי הקרוב ביותר אליו נמצא ב-$F_i$ מקיים

$$L_D(h)-L_S(h)\le\Delta_i+2\rho\epsilon$$

— חסם העולה עם $i$, כלומר הדוק יותר עבור ההשערות בעלות אינדקס נמוך שהאלגוריתם מעדיף במרומז.

**💡 טריקים שימושיים:** כיסוי ⇒ Hoeffding + איחוד על $F$ הסופי בלבד; גשרו לכל $H$ בעזרת העברת Lipschitz של $2\rho\epsilon$; "האלגוריתם מעדיף תאים בעלי אינדקס קטן" ⇒ משקלי SRM $\delta_i=\delta 2^{-i}$ (או כל פיצול סכים) לכל תא.

**⚠️ שים לב:** ההעברה עולה $2\rho\epsilon$ (משולם גם על $L_D$ וגם על $L_S$); שימו $\ln|F|$ (לא $\ln|F_i|$) בתוך השורש כך ש-$\Delta_i$ *עולה באמת* ב-$i$ — אחרת גדלי תאים שרירותיים $|F_i|$ עלולים לשבור את המונוטוניות הנדרשת; נקודת הכיסוי הקרובה ביותר מובטחת בתוך $\epsilon$ לפי ההנחה.
