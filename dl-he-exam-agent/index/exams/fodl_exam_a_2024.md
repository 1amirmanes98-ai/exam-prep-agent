# מבחן FODL — מועד א׳ 2024
**Date / semester:** 15.08.2024 — סמסטר ב׳ 2023/24 (תשפ"ד), מועד א׳; בית הספר למדעי המחשב, אוניברסיטת תל אביב; מרצה: Dr. Nadav Cohen, מתרגל: Yonatan Ariel Slutzky; 3 שעות; 3 שאלות, ניקוד מרבי אפשרי 105
**Total points:** 105

## Q1 (40 pts) — RNN לינאריים: אי-אוניברסליות והיררכיית מטריצות המעבר האלכסונית/הסימטרית
**Topics:** RNN לינארי, מחלקת השערות, אוניברסליות, היררכיית אקספרסיביות | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
בשאלה זו אנו עוסקים ברשתות נוירונים מסוג Linear Recurrent Neural Network. עבור $L \in \mathbb{N}_{\geq 3}$ שרירותי, אנו מתעניינים במחלקת ההשערות $\mathcal{H}_d$ המכילה השערות $h$ המקבלות סדרה של $L$ מספרים ממשיים המסומנת $x = (x_1, \cdots, x_L)$, כאשר $x_1, \cdots, x_L \in \mathbb{R}$, מפיקות מספר ממשי יחיד $y \in \mathbb{R}$, ומקיימות את יחס הרקורסיה הבא:

$$s_0(x) = 0$$
$$\forall t \in [L]:\ s_t(x) = A\, s_{t-1}(x) + B x_t$$
$$h(x) = C^\top s_L(x)$$

הווקטורים $s_0(x), \cdots, s_L(x) \in \mathbb{R}^d$ נקראים *המצבים החבויים*, ו-$d \in \mathbb{N}$ הוא *ממד מרחב-המצבים* של מחלקת ההשערות. המשקלים המגדירים את ההשערה הם $A \in \mathbb{R}^{d \times d}$ (הנקראת *מטריצת המעבר*) וכן $B, C \in \mathbb{R}^d$. עובדה שימושית היא שלכל $h \in \mathcal{H}_d$ עם משקלים $A, B, C$:

$$h(x) = \sum_{t=1}^{L} C^\top A^{L-t} B\, x_t$$

**(1) (10 pts)** הוכיחו שהמחלקה $\mathcal{H}_d$ אינה אוניברסלית ביחס לקבוצת הפונקציות הרציפות, במובן שהיא אינה כוללת את כל הפונקציות הרציפות. כלומר, קיימת פונקציה רציפה $f$ שעבורה

$$\forall d \in \mathbb{N}:\ f \notin \mathcal{H}_d$$

עבור $d \in \mathbb{N}$ נסמן ב-$\mathcal{H}_d^{diag} \subseteq \mathcal{H}_d$ את תת-מחלקת ההשערות שמטריצת המעבר $A$ שלהן היא מטריצה אלכסונית.

**(2) (10 pts)** הוכיחו ש-$\mathcal{H}_d^{diag}$ מונוטונית (לא-יורדת) ביחס ל-$d$.

**(3) (10 pts)** הוכיחו את הטענה הבאה: $\mathcal{H}_1^{diag}$ מוכלת ממש ב-$\mathcal{H}_2^{diag}$.
*רמז:* עבור כל אחת מהמחלקות, התבוננו כיצד סכום האלכסון (העקבה) של המטריצה $A^t$ מתנהג כפונקציה של $t$.

עבור $d \in \mathbb{N}$ נסמן ב-$\mathcal{H}_d^{sym} \subseteq \mathcal{H}_d$ את תת-מחלקת ההשערות שמטריצת המעבר $A$ שלהן היא מטריצה סימטרית.

**(4) (10 pts)** הוכיחו ש-$\mathcal{H}_d^{diag} = \mathcal{H}_d^{sym}$.
*רמז:* התבוננו בפירוק העצמי האורתוגונלי של מטריצות המעבר הסימטריות.

**Solution sketch:**
**1.** כל $h \in \mathcal{H}_d$ הוא פונקציונל *לינארי* של הקלט: $h(x) = \sum_t w_t x_t$ עם $w_t = C^\top A^{L-t} B$. לכן $h(0) = 0$, וגם $h$ אדיטיבי/הומוגני. כל פונקציה רציפה לא-לינארית, למשל $f(x) = x_1^2$ (או $f \equiv 1$, מכיוון שכל $h$ מתאפס ב-$x = 0$), אינה נמצאת באף $\mathcal{H}_d$.

**2.** ריפוד (padding): בהינתן $(A, B, C)$ עם $A$ אלכסונית בגודל $d$, ניקח

$$A' = \mathrm{diag}(A, 0) \in \mathbb{R}^{(d+1)\times(d+1)}$$

ונרפד את $B, C$ ברכיב אפס. אזי $C'^\top A'^{L-t} B' = C^\top A^{L-t} B$ לכל $t$, ולכן אותה פונקציה ממומשת, מה שנותן

$$\mathcal{H}_d^{diag} \subseteq \mathcal{H}_{d+1}^{diag}$$

**3.** ההכלה נובעת מ-(2). ממשות (strictness): עבור $d = 1$ סדרת המקדמים $w_t = cb\,a^{L-t}$ היא סדרה הנדסית. בפרט, אם המקדם האמצעי $w_{L-1} = cb\,a = 0$ אז $cb = 0$ או $a = 0$, מה שמכריח גם $w_L = 0$ או $w_{L-2} = 0$. ניקח את מקדמי המטרה $(w_{L-2}, w_{L-1}, w_L) = (1, 0, 1)$ (משתמש ב-$L \geq 3$): בלתי אפשרי ב-$\mathcal{H}_1^{diag}$ לפי האמור לעיל, אך ממומש ב-$\mathcal{H}_2^{diag}$ עם $a_1 = 1, a_2 = -1$ וגם $c_1 b_1 = c_2 b_2 = \tfrac{1}{2}$, מה שנותן $w_t = \tfrac{1 + (-1)^{L-t}}{2}$ (התבנית המתחלפת $1, 0, 1$). זה תואם את הרמז: העקבה/המקדמים של $A^t$ הם סדרה הנדסית יחידה עבור $d=1$ לעומת סכום של שתי סדרות הנדסיות עבור $d=2$.

**4.** ($\subseteq$) מטריצות אלכסוניות הן סימטריות, ולכן

$$\mathcal{H}_d^{diag} \subseteq \mathcal{H}_d^{sym}$$

($\supseteq$) נכתוב מטריצה סימטרית $A = V D V^\top$ עם $V$ אורתוגונלית, $D$ אלכסונית. אזי

$$C^\top A^{L-t} B = (V^\top C)^\top D^{L-t} (V^\top B)$$

ולכן החלפת $(A, B, C) \to (D, V^\top B, V^\top C)$ ממשת את אותה פונקציה עם מטריצת מעבר אלכסונית. שתי ההכלות נותנות שוויון.

**💡 טריקים שימושיים:** כל שאלת "האם המחלקה הזו אוניברסלית?" קורסת ברגע שמראים ש-$h$ *לינארי* בקלטים ($h(x)=\sum_t w_t x_t$) — ואז עד לא-לינארי או $h(0)=0$ הורג את האוניברסליות; החתימה של סדרה הנדסית $w_{t+1}w_{t-1}=w_t^2$ מפרידה את $d=1$; אלכסנו מטריצה סימטרית $A=VDV^\top$ ו*בלעו* את $V$ לתוך $B,C$.

**⚠️ שים לב:** (1) הציגו $f$ קונקרטי והוכיחו $f\notin\mathcal H_d\ \forall d$, לא רק "הוא לא-לינארי"; (3) הוכיחו גם את ההכלה (מהריפוד, סעיף 2) וגם את הממשות, ושימו לב שהעד $(1,0,1)$ דורש $L\geq 3$; (4) הוכיחו את שני הכיוונים — התובנה המרכזית היא ש-$(V^\top B,V^\top C)$ ממש את *אותה* פונקציה.

## Q2 (35 pts) — Gradient flow על פירוק מטריצות סימטרי $W = UU^\top$: אי-קמירות, דינמיקת end-to-end וערכים עצמיים, הטיה לדרגה נמוכה
**Topics:** פירוק מטריצות, gradient flow, קמירות, רגולריזציה מרומזת, רשת לינארית, חוקי שימור | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_04_optimization_2, lecture_05_optimization_3, fodl_recitation_gradient_flow
**Statement (English translation):**
בשאלה זו אנו עוסקים בפונקציית ההפסד $L$ המוגדרת כך:

$$L: \mathbb{R}^{d \times d} \to \mathbb{R}, \quad L(W) := \|W - W^*\|^2$$

כאשר $d \in \mathbb{N}$ ו-$W^* \in \mathbb{R}^{d \times d}$ היא מטריצה סימטרית חיובית למחצה שאינה $0 \in \mathbb{R}^{d \times d}$, כלומר $L(0) > L(W^*)$. נגדיר את פונקציית המטרה $\phi$ כך:

$$\phi: \mathbb{R}^{d \times d} \to \mathbb{R}, \quad \phi(U) := L(U U^\top)$$

**(1) (7 pts)** הוכיחו ש-$\phi$ אינה קמורה.

נניח כי gradient flow מורץ על $\phi$ עם אתחול כלשהו $U_0 \in \mathbb{R}^{d \times d}$. נסמן ב-$W(t)$ את המטריצה ה-"end-to-end" בזמן $t \in \mathbb{R}_{\geq 0}$, כלומר $W(t) = U(t) U(t)^\top$.

**(2) (13 pts)** הוכיחו כי

$$\frac{d}{dt} W(t) = -2\big[\,2(W(t) - W^*)W(t) + 2W(t)(W(t) - W^*)\,\big]$$

*רמז:* חשבו תחילה את $\frac{d}{dt} U(t)$ ואז החילו את כלל המכפלה (כלל לייבניץ).

המטריצה $W(t)$ סימטרית ולכן ניתנת ללכסון עבור כל $t \geq 0$. הניחו שקיים פירוק עצמי אנליטי של $W(t)$; כלומר, קיימות פונקציות $V: \mathbb{R}_{\geq 0} \to \mathbb{R}^{d \times d}$ ו-$\Lambda: \mathbb{R}_{\geq 0} \to \mathbb{R}^{d \times d}$ כך שלכל $t \geq 0$ המטריצה $V(t)$ אורתונורמלית, המטריצה $\Lambda(t)$ אלכסונית, שתיהן גזירות (אינסוף פעמים) ביחס ל-$t$, וכן $W(t) = V(t) \Lambda(t) V(t)^\top$.

**(3) (10 pts)** הוכיחו שלכל $r \in \{1, \cdots, d\}$:

$$\frac{d}{dt} \Lambda(t)_{r,r} = 4 \Lambda(t)_{r,r} \left\langle -2(W(t) - W^*),\ v_r(t) v_r(t)^\top \right\rangle$$

(כאשר $v_r(t)$ מסמן את העמודה ה-$r$ של $V(t)$).
*תזכורת:* לכל המטריצות הממשיות $A, B, C$ מתקיים:
- אם המכפלות $ABC$ ו-$CAB$ מוגדרות, אז $Tr(ABC) = Tr(CAB)$.
- אם ל-$A$ ו-$B$ אותם ממדים, אז $\langle A, B \rangle = Tr(A B^\top)$.

**(4) (5 pts)** הסבירו מדוע ניתן לצפות שהרצת gradient flow על $\phi$ עם אתחול קרוב לראשית $0 \in \mathbb{R}^{d \times d}$ מניבה, בתום האופטימיזציה, מטריצת end-to-end בעלת דרגה נמוכה בקירוב (תחת ההנחה ש-$L$ ניתנת למזעור באמצעות מטריצות בעלות דרגה נמוכה בקירוב). ההסבר יכול להיות איכותני.

**Solution sketch:**
**1.** טריק סימטריה: $\phi(U) = \phi(-U)$ לכל $U$. אילו $\phi$ הייתה קמורה, אז

$$\begin{aligned} \phi(0) &= \phi\big(\tfrac{1}{2}U + \tfrac{1}{2}(-U)\big) \\ &\leq \tfrac{1}{2}\phi(U) + \tfrac{1}{2}\phi(-U) \\ &= \phi(U) \end{aligned}$$

לכל $U$, כלומר $0$ היה ממזער גלובלי של $\phi$. אבל $W^*$ היא PSD, ולכן $U^* := (W^*)^{1/2}$ מקיימת $U^* U^{*\top} = W^*$ וגם $\phi(U^*) = L(W^*) < L(0) = \phi(0)$ — סתירה.

**2.** גרדיאנט:

$$\nabla \phi(U) = 2\big[(UU^\top - W^*) + (UU^\top - W^*)^\top\big]U = 4(W - W^*)U$$

תוך שימוש בסימטריה של $W = UU^\top$ ושל $W^*$. Gradient flow: $\dot U(t) = -4(W(t) - W^*)U(t)$. לייבניץ:

$$\begin{aligned} \dot W &= \dot U U^\top + U \dot U^\top \\ &= -4(W - W^*)UU^\top - 4UU^\top(W - W^*) \\ &= -2[2(W - W^*)W + 2W(W - W^*)] \end{aligned}$$

**3.** נכתוב

$$\Lambda(t)_{r,r} = \lambda_r(t) = v_r(t)^\top W(t) v_r(t)$$

בגזירה, איברי $\dot v_r$ מתאפסים מכיוון ש-$W v_r = \lambda_r v_r$ וגם $v_r^\top v_r = 1 \Rightarrow \dot v_r^\top v_r = 0$, ונותר $\dot \lambda_r = v_r^\top \dot W v_r$. נציב את (2):

$$\begin{aligned} v_r^\top \dot W v_r &= -4\big[v_r^\top (W - W^*) W v_r + v_r^\top W (W - W^*) v_r\big] \\ &= -8 \lambda_r\, v_r^\top (W - W^*) v_r \end{aligned}$$

לפי זהויות העקבה זה שווה ל-

$$4 \lambda_r \langle -2(W - W^*), v_r v_r^\top \rangle$$

**4.** משוואת ה-ODE של הערך העצמי $\dot \lambda_r \propto \lambda_r \cdot (\text{alignment with } -\nabla L)$ פירושה שכל ערך עצמי נע בקצב פרופורציוני לגודלו שלו (דינמיקה מכפלתית/מעריכית). עם אתחול קרוב-לאפס כל ה-$\lambda_r \approx 0$. הערכים העצמיים מוגברים בעצם אחד-אחד, רק בכיוונים הדרושים להקטנת $L$, בעוד שהיתר נותרים תקועים סביב $0$. לכן ה-$W$ הסופי הוא בעל דרגה נמוכה בקירוב — רגולריזציה מרומזת / למידת דרגה-נמוכה הדרגתית (חמדנית) של gradient flow על פירוק מטריצות.

**💡 טריקים שימושיים:** $\phi(U)=\phi(-U)$ ⇒ אי-קמירות דרך אי-שוויון נקודת-האמצע ב-$0$; כדי לגזור ערך עצמי כתבו $\lambda_r=v_r^\top W v_r$ ובטלו את איברי $\dot v_r$ בעזרת $Wv_r=\lambda_r v_r$ וגם $v_r^\top v_r=1$; עצבו מחדש את התוצאה בעזרת זהויות העקבה $\langle A,B\rangle=\mathrm{Tr}(AB^\top)$, $\mathrm{Tr}(ABC)=\mathrm{Tr}(CAB)$ (הרצאה 4/8).

**⚠️ שים לב:** (1) סתירת קמירות דורשת נקודה טובה יותר *מפורשת* — $U^*=(W^*)^{1/2}$ מנצחת את $0$; קביעה שהפונקציה אינה קמורה אינה מספיקה; (2) הגרדיאנט עם המקדם $4$ משתמש בסימטריה של $W$ ושל $W^*$ כאחד; (3) התאפסות איברי $\dot v_r$ חייבת להיות מנומקת, לא מונחת מראש; (4) העיקר הוא ה-$\dot\lambda_r\propto\lambda_r$ ה*מכפלתי*, שמעכב ערכים עצמיים קטנים.

## Q3 (30 pts) — מחלקת השערות סופית: Hoeffding + חסם איחוד, חסם SRM המעדיף דרגה נמוכה, וחסם אינדקס לדרגה-נמוכה בקירוב
**Topics:** התכנסות אחידה, Hoeffding, ריכוזיות, כלים הסתברותיים, מזעור סיכון מבני, דרגה נמוכה, רגולריזציה מרומזת | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2
**Statement (English translation):**
עבור מרחב קלט $\mathcal{X}$ ומרחב פלט $\mathcal{Y} = \mathbb{R}$, תהי $\mathcal{H} \subseteq \mathcal{Y}^{\mathcal{X}}$ מחלקת השערות של רשתות נוירונים עם ארכיטקטורה כלשהי בעלת מטריצת פרמטרים $W \in \mathbb{R}^{d \times d}$, עבור $d \in \mathbb{N}$ זוגי. תהי $D$ התפלגות (לא ידועה) מעל $\mathcal{X} \times \mathcal{Y}$, יהי $S = \{(x_n, y_n)\}_{n=1}^{N}$ מדגם אימון של $N$ דוגמאות שנדגמו i.i.d. מ-$D$, ותהי $l: \mathcal{Y} \times \mathcal{Y} \to [0,1]$ פונקציית הפסד.

לכל השערה $h \in \mathcal{H}$, נסמן ב-$L_D(h)$ את שגיאת ההכללה (כלומר $L_D(h) := E_{(x,y)\sim D}[l(h(x), y)]$) וב-$L_S(h)$ את שגיאת המדגם (כלומר $L_S(h) := \frac{1}{N}\sum_{n=1}^{N} l(h(x_n), y_n)$). הניחו שכל רכיב של $W_h$ (מטריצת הפרמטרים של השערה $h$) מקבל ערכים ב-$\{1, \cdots, B\}$ (כלומר, $\forall i, j \in \{1, \cdots, d\}:\ (W_h)_{ij} \in \{1, \cdots, B\}$).

**(1) (5 pts)** הוכיחו ש-$|\mathcal{H}| \leq B^{d^2}$.

**(2) (8 pts)** גזרו חסם הכללה המבוסס על התכנסות אחידה עבור המחלקה $\mathcal{H}$. כלומר, גזרו ביטוי $\Delta_1(N, \delta, |\mathcal{H}|)$ (שתלותו במחלקת ההשערות היא רק דרך $|\mathcal{H}|$) המקיים $\lim_{N \to \infty} \Delta_1(N, \delta, |\mathcal{H}|) = 0$, כך שלכל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$:

$$\forall h \in \mathcal{H}:\ L_D(h) - L_S(h) \leq \Delta_1(N, \delta, |\mathcal{H}|)$$

**בחלק זה אינכם רשאים להסתמך על טענות שהוכחו בכיתה במהלך הפתרון, אך מותר לכם להשתמש בחסם Hoeffding (ראו תזכורת למטה).**

*תזכורת (חסם Hoeffding):* יהיו $A_1, \ldots, A_N$ משתנים מקריים i.i.d. (בלתי תלויים, שווי-התפלגות) החסומים בקטע $[0,1]$. לכל $\epsilon \geq 0$:

$$P\left(\left|\frac{1}{N}\sum_{i=1}^{N} A_i - E[A_1]\right| \geq \epsilon\right) \leq 2\exp(-2N\epsilon^2)$$

**(3) (9 pts)** עבור כל $i \in \{0, \cdots, d\}$ נסמן ב-$\mathcal{H}_i \subseteq \mathcal{H}$ את קבוצת ההשערות המשויכות למטריצות מדרגה לכל היותר $i$; כלומר, לכל $h \in \mathcal{H}$: $h \in \mathcal{H}_i$ אם ורק אם $rank(W_h) \leq i$. גזרו חסם הכללה הדומה לזה של סעיף 2, המעדיף השערות המשויכות למטריצות מדרגה נמוכה. כלומר, גזרו ביטוי $\Delta_2(N, \delta, i)$ המקיים את התנאים הבאים:

a. $\lim_{N \to \infty} \Delta_2(N, \delta, i) = 0$ לכל $i \in \{0, \cdots, d\}$ ולכל $\delta \in (0,1)$.
b. לכל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$:
$$\forall i \in \{0, \cdots, d\},\ \forall h \in \mathcal{H}_i:\ L_D(h) - L_S(h) \leq \Delta_2(N, \delta, i)$$
c. $\Delta_2(N, \delta, 0) < \Delta_2(N, \delta, 1) < \cdots < \Delta_2(N, \delta, d)$ לכל $\delta \in (0,1)$.

**בחלק זה מותר לכם להשתמש בחסם $\Delta_1(N, \delta, |\mathcal{H}|)$ מהסעיף הקודם כ"קופסה שחורה", גם אם לא גזרתם עבורו ביטוי.**

**(4) (8 pts)** יהי $\epsilon > 0$. נסמן ב-$index: \mathcal{H} \to \{0, \cdots, d\}$ את הפונקציה הממפה השערה $h$ לאינדקס המינימלי של תת-המחלקות $\mathcal{H}_i$ שבהן קיימת השערה $\bar h$ שמרחקה מ-$h$ אינו עולה על $\epsilon$. כלומר, לכל $h \in \mathcal{H}$:

$$index(h) = \min\left\{ i \in \{0, \cdots, d\}:\ \exists \bar h \in \mathcal{H}_i\ s.t.\ \forall x \in \mathcal{X}:\ |h(x) - \bar h(x)| \leq \epsilon \right\}$$

נניח שאלגוריתם הלמידה שברשותנו נוטה להחזיר השערות $h \in \mathcal{H}$ שעבורן $index(h)$ קטן יחסית. הסבירו מה בעייתי בשימוש בחסם הקודם. בנוסף, הניחו ש-$l$ הוא $\rho$-Lipschitz ביחס למשתנה הראשון שלו, והציעו חסם חדש המבוסס על החסם $\Delta_2(N, \delta, i)$ המעדיף את ההשערות שהאלגוריתם מחזיר. כלומר, גזרו ביטוי $\Delta_3(N, \delta, h)$ המקיים את התנאים הבאים:

a. $\lim_{N \to \infty} \Delta_3(N, \delta, h) = \mathcal{O}(\epsilon)$ לכל $h \in \mathcal{H}$ ולכל $\delta \in (0,1)$.
b. לכל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$:
$$\forall h \in \mathcal{H}:\ L_D(h) - L_S(h) \leq \Delta_3(N, \delta, h)$$
c. לכל $h_1, h_2 \in \mathcal{H}$ ולכל $\delta \in (0,1)$: אם $index(h_1) < index(h_2)$ אז $\Delta_3(N, \delta, h_1) < \Delta_3(N, \delta, h_2)$.

*רמז:* מצאו קבוע $c > 0$ כך שהתנאים מתקיימים עבור החסם

$$\Delta_3(N, \delta, h) := \Delta_2(N, \delta, index(h)) + c \cdot \rho \cdot \epsilon$$

**בחלק זה מותר לכם להשתמש בחסם $\Delta_2(N, \delta, i)$ מהסעיף הקודם כ"קופסה שחורה", גם אם לא גזרתם עבורו ביטוי.**

**Solution sketch:**
**1.** כל השערה נקבעת על ידי מטריצת הפרמטרים שלה $W_h$. יש לכל היותר $B^{d^2}$ מטריצות כאלה ($d^2$ רכיבים, לכל אחד לכל היותר $B$ ערכים אפשריים), וההעתקה ממטריצות על $\mathcal{H}$ היא על, ולכן $|\mathcal{H}| \leq B^{d^2}$.

**2.** נקבע $h$: המשתנים $A_n := l(h(x_n), y_n)$ הם i.i.d. ב-$[0,1]$ עם $E[A_1] = L_D(h)$, ולכן Hoeffding נותן

$$P(|L_S(h) - L_D(h)| \geq \epsilon) \leq 2e^{-2N\epsilon^2}$$

חסם איחוד על המחלקה (הסופית): הסתברות הכישלון $\leq 2|\mathcal{H}| e^{-2N\epsilon^2}$. השוואת ביטוי זה ל-$\delta$ ופתרון נותנים

$$\Delta_1(N, \delta, |\mathcal{H}|) = \sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2N}} \to 0$$

**3.** פיצול ביטחון בסגנון SRM: נקצה $\delta_i := \delta \cdot 2^{-(i+1)}$ לתת-מחלקה $\mathcal{H}_i$ (כך ש-$\sum_{i=0}^{d} \delta_i < \delta$) ונחיל את סעיף 2 על כל $\mathcal{H}_i$ (בשימוש ב-$|\mathcal{H}_i| \leq |\mathcal{H}| \leq B^{d^2}$):

$$\Delta_2(N, \delta, i) := \sqrt{\frac{\ln(2 \cdot 2^{i+1} B^{d^2} / \delta)}{2N}}$$

חסם איחוד על $i$ נותן את (b); המקדם $2^{i+1}$ הופך את החסם לעולה ממש ב-$i$ (c); והוא עדיין שואף לאפס כאשר $N \to \infty$ (a). (חלופה: פיצול אחיד $\delta/(d+1)$ בשילוב עם חסם ספירה עולה-ממש $|\mathcal{H}_i| \lesssim B^{2di}$ דרך טיעון מסוג skeleton/CUR — קבוע הספירה (לא מאומת).)

**4.** הבעיה: $\Delta_2$ עוזר ל-$h$ רק דרך הדרגה האמיתית של $W_h$ (ה-$i$ הקטן ביותר עם $h \in \mathcal{H}_i$). השערה שהאלגוריתם מחזיר היא בדרך כלל רק *קרובה* להשערה מדרגה נמוכה ($index(h)$ קטן) בעוד ש-$rank(W_h)$ עצמו יכול להיות גדול כמו $d$, ולכן חסם ה-$\Delta_2$ נותר גדול ואינו מתגמל את ההטיה לדרגה נמוכה של האלגוריתם. תיקון: תהי $\bar h \in \mathcal{H}_{index(h)}$ קרובה-$\epsilon$ ל-$h$. תכונת ה-$\rho$-Lipschitz של $l$ בארגומנט הראשון שלו נותנת

$$|l(h(x), y) - l(\bar h(x), y)| \leq \rho\epsilon$$

נקודתית. לכן $|L_D(h) - L_D(\bar h)| \leq \rho\epsilon$ וגם $|L_S(\bar h) - L_S(h)| \leq \rho\epsilon$. על המאורע של סעיף 3:

$$\begin{aligned} L_D(h) - L_S(h) &\leq \big(L_D(\bar h) - L_S(\bar h)\big) + 2\rho\epsilon \\ &\leq \Delta_2(N, \delta, index(h)) + 2\rho\epsilon \end{aligned}$$

— ולכן $c = 2$ עובד. תנאים: (a) $\lim_N \Delta_3 = 0 + 2\rho\epsilon = \mathcal{O}(\epsilon)$; (b) מתקיים על אותו מאורע בהסתברות $(1-\delta)$ כמו בסעיף 3; (c) המונוטוניות הממש של $\Delta_2$ ב-$i$ עוברת ל-$\Delta_3$ דרך $index(h)$.

**💡 טריקים שימושיים:** מחלקה סופית ⇒ Hoeffding לכל-השערה ואז חסם איחוד; "מעדיף דרגה-נמוכה/אינדקס-נמוך" מרמז על SRM — פצלו את התקציב כ-$\delta_i=\delta\,2^{-(i+1)}$ (סכים ⇒ עדיין תקף, וה-$2^{i+1}$ הופך אותו לעולה ממש ב-$i$); "ההשערות המוחזרות *קרובות* לדרגה נמוכה" מרמז על העברת Lipschitz $|L(h)-L(\bar h)|\leq\rho\epsilon$ לאיבר הכיסוי הקרוב ביותר.

**⚠️ שים לב:** Hoeffding דורש ש-$h$ יהיה קבוע לפני ראיית $S$ — לעולם אל תחילו אותו על ה-$\hat h$ הנלמד; איחוד על כל $\mathcal H$; פיצול ה-SRM חייב גם לסכום ל-$\leq\delta$ וגם לעלות ב-$i$; ב-(4) כל העיקר הוא $index(h)\ll\mathrm{rank}(W_h)$, ו-$c=2$ מכיוון שמעבירים פעמיים (על $L_D$ ו-$L_S$).
