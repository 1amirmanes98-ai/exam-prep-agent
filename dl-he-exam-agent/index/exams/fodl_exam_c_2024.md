# מבחן FODL — מועד ג 2024
**Date / semester:** 09.10.2024 — סמסטר ב׳ 2023/24 (תשפ"ד), מועד ג׳; בית הספר למדעי המחשב, אוניברסיטת תל אביב; מרצה: ד"ר נדב כהן, מתרגל: יונתן אריאל סלוצקי; 3 שעות; 3 שאלות, ניקוד מקסימלי אפשרי 105
**Total points:** 105

## Q1 (40 pts) — רשתות sign ברוחב $B$ = פונקציות קבועות-למקוטעין עם $\leq B+1$ מקטעים; קירוב אוניברסלי של פונקציות רציפות
**Topics:** אוניברסליות, מחלקת השערות, אקטיבציית sign, קבועה-למקוטעין | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
תהי $\mathcal{H}_B$ מחלקת ההשערות של רשתות נוירונים עם שכבה נסתרת יחידה ברוחב $B$, קלט ופלט חד-ממדיים (כלומר $\mathcal{X} = \mathcal{Y} = \mathbb{R}$, כאשר $\mathcal{X}$ הוא מרחב הקלט ו-$\mathcal{Y}$ מרחב הפלט), ואקטיבציית sign על נוירוני השכבה הנסתרת; כלומר:

$$\mathcal{H}_B = \left\{ x \mapsto b' + \sum_{i=1}^{B} v_i\, \sigma(w_i x + b_i)\ :\ w_1, \ldots, w_B,\, b_1, \ldots, b_B,\, v_1, \ldots, v_B,\, b' \in \mathbb{R} \right\}$$

כאשר $\sigma(z)$ שווה אחת אם $z \geq 0$ ואפס אחרת. לשם פשטות, הניחו ש-$w_1, \ldots, w_B \geq 0$.

נאמר ש-$g: \mathbb{R} \to \mathbb{R}$ היא *קבועה-למקוטעין* אם קיימים סקלרים $\alpha_1, \ldots, \alpha_N$ ו-$c_0 := -\infty < c_1 < \cdots < c_{N-1} < c_N := \infty$ כך ש-$g(x) = \alpha_j$ על כל קטע $[c_{j-1}, c_j)$ (כמובן, עבור $j = 1$ הקטע פתוח גם בצדו השמאלי). ה-$N$ המינימלי שעבורו קיימים סקלרים כאלה נקרא *מספר המקטעים הקבועים* של $g$.

**(1) (11 pts)** עבור $B \in \mathbb{N}$, הוכיחו שכל פונקציה ב-$\mathcal{H}_B$ היא קבועה-למקוטעין עם לכל היותר $B + 1$ מקטעים קבועים.

**(2) (11 pts)** עבור $B \in \mathbb{N}$, הוכיחו שכל פונקציה קבועה-למקוטעין עם לכל היותר $B + 1$ מקטעים קבועים מוכלת ב-$\mathcal{H}_B$.

כעת, נגדיר את מדד המרחק הבא בין פונקציות מ-$\mathbb{R}$ ל-$\mathbb{R}$:

$$d(f_1, f_2) = \sup_{x \in [0,1]} |f_1(x) - f_2(x)|$$

ונסמן ב-$F$ את מחלקת הפונקציות הרציפות מ-$\mathbb{R}$ ל-$\mathbb{R}$.

**(3) (6 pts)** הגדירו פורמלית את הביטוי הבא: "$\mathcal{H}_B$ אוניברסלית במובן של $d(\cdot,\cdot)$ ביחס למחלקה $F$."

**(4) (12 pts)** הוכיחו ש-$\mathcal{H}_B$ אוניברסלית במובן של $d(\cdot,\cdot)$ ביחס למחלקה $F$.
*רמז:* אם $f: [0,1] \to \mathbb{R}$ רציפה אז היא רציפה במידה שווה; כלומר, לכל $\epsilon > 0$ קיים $\delta > 0$ כך שאם $x_1, x_2 \in [0,1]$ מקיימים $|x_1 - x_2| < \delta$ אז בהכרח $|f(x_1) - f(x_2)| < \epsilon$.

**Solution sketch:**
(הפניה: מועד ב 2021 שאלה 1 השתמש באותן עובדות קבועות-למקוטעין בתור למות נתונות — כאן הן מוכחות.)

**1.** עם $w_i \geq 0$: כל יחידה $\sigma(w_i x + b_i)$ היא או קבועה (אם $w_i = 0$) או מדרגה בודדת סגורה-משמאל: $0$ עבור $x < -b_i/w_i$ ו-$1$ עבור $x \geq -b_i/w_i$. מיון $\leq B$ הספים השונים נותן $c_1 < \cdots < c_m$ ($m \leq B$). על כל אחד מ-$\leq B+1$ הקטעים $[c_{j-1}, c_j)$ כל האינדיקטורים קבועים, ולכן $h$ קבועה שם.

**2.** בהינתן $g$ עם ערכים $\alpha_1, \ldots, \alpha_N$ ונקודות שבירה $c_1 < \cdots < c_{N-1}$ ($N \leq B+1$), ממשו אותה כ-$h(x) = \alpha_1 + \sum_{j=1}^{N-1} (\alpha_{j+1} - \alpha_j)\, \sigma(x - c_j)$: קחו $b' = \alpha_1$, $w_j = 1 \geq 0$, $b_j = -c_j$, $v_j = \alpha_{j+1} - \alpha_j$, ו-$v_j = 0$ עבור יחידות שאינן בשימוש. על $[c_{j-1}, c_j)$ בדיוק $j-1$ המדרגות הראשונות פעילות והסכום מצטמצם טלסקופית ל-$\alpha_j$.

**3.** הגדרה: לכל $f \in F$ ולכל $\epsilon > 0$ קיימים $B \in \mathbb{N}$ ו-$h \in \mathcal{H}_B$ כך ש-$d(f, h) \leq \epsilon$.

**4.** בהינתן $f$ רציפה ו-$\epsilon > 0$: רציפות במידה שווה על $[0,1]$ נותנת $\delta > 0$. חלקו את $[0,1]$ ל-$m = \lceil 1/\delta \rceil$ תת-קטעים באורך $< \delta$ ותהי $g$ פונקציית המדרגה השווה לערך של $f$ ב(נניח) הקצה השמאלי של כל תת-קטע. לכל $x \in [0,1]$, $x$ נמצא במרחק $\delta$ מנקודת הדגימה שלו, ולכן $|f(x) - g(x)| < \epsilon$. $g$ קבועה-למקוטעין עם $\leq m + 1$ מקטעים, ולכן לפי סעיף (2) $g \in \mathcal{H}_B$ עבור $B = m$. מכאן $d(f, g) \leq \epsilon$ ו-$\mathcal{H}_B$ (עם $B$ התלוי ב-$\epsilon$, כפי שההגדרה מתירה) אוניברסלית.

**💡 טריקים שימושיים:** עם $w_i\geq0$ כל יחידת sign היא מדרגה בודדת סגורה-משמאל, ולכן $\leq B$ ספים ⇒ $\leq B+1$ מקטעים; כדי *לממש* פונקציית מדרגה מטרה, צמצמו טלסקופית עם משקלי-הקפיצה $v_j=\alpha_{j+1}-\alpha_j$ ו-$b_j=-c_j$; אוניברסליות של פונקציות רציפות עוברת דרך *רציפות במידה שווה* → חלוקת $[0,1]$ למקטעים באורך $<\delta$ → קירוב במדרגות.

**⚠️ שים לב:** (1) טפלו במקרה $w_i=0$ (יחידה קבועה), לא רק במקרה המדרגה; (2) תנו את הבנייה ה*מפורשת* וודאו שהסכום מצטמצם טלסקופית ל-$\alpha_j$ בכל קטע; (3) ההגדרה הפורמלית זקוקה ל-"$\exists B$ (התלוי ב-$\epsilon$)"; (4) זה בסדר ש-$B$ גדל עם $1/\delta$ — ההגדרה מתירה ל-$B$ להיות תלוי ב-$\epsilon$.

## Q2 (35 pts) — זרימת גרדיאנט על רשת לינארית סקלרית בעומק $N$: balancedness והתכנסות אקספוננציאלית
**Topics:** זרימת גרדיאנט, רשת לינארית, balancedness, חוקי שימור, פירוק מטריצות | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_04_optimization_2, fodl_recitation_gradient_flow, fodl_recitation_optimization_1
**Statement (English translation):**
יהי $y > 0$. הגדירו את פונקציית ההפסד הבאה:

$$L: \mathbb{R} \to \mathbb{R}, \quad L(w) = \frac{1}{2}(w - y)^2$$

נסמן ב-$\phi(\cdot)$ את פונקציית המטרה המתקבלת כאשר מבצעים פרמטריזציית-יתר ל-$w$ באמצעות רשת לינארית בעומק $N \geq 2$ ורוחב $1$ בכל השכבות הנסתרות:

$$\phi: \mathbb{R}^N \to \mathbb{R}, \quad \phi(w_1, \ldots, w_N) = L\big(\Pi_{i=1}^{N} w_i\big)$$

נניח שזרימת גרדיאנט מורצת על $\phi(\cdot)$ עם אתחול $w_1(0), \ldots, w_N(0) \in \mathbb{R}$, ונסמן ב-$w(t)$ את הסקלר ה"מקצה-לקצה" בזמן $t \geq 0$, כלומר $w(t) = \Pi_{i=1}^{N} w_i(t)$.

**(1) (10 pts)** הוכיחו ש-$w_i(t)^2 - w_j(t)^2 = w_i(0)^2 - w_j(0)^2$ לכל $i, j \in \{1, \ldots, N\}$ ולכל $t \geq 0$. אל תשתמשו בטענות מהכיתה במהלך הפתרון.

כעת הניחו ש-$w_i(0)^2 = w_j(0)^2$ לכל $i, j \in \{1, \ldots, N\}$.

**(2) (10 pts)** הוכיחו ש-$\frac{d}{dt} w(t) = -N\big(w(t) - y\big)\, w(t)^{2 - \frac{2}{N}}$. אל תשתמשו בטענות מהכיתה במהלך הפתרון.

יהי $w(0) = c$ והניחו $c \in (0, y)$.

**(3) (5 pts)** הוכיחו ש-$w(t) \geq c$ לכל $t \geq 0$. מותר לכם להשתמש בעובדה שבאופן כללי, תחת זרימת גרדיאנט פונקציית המטרה מונוטונית לא-עולה (כפונקציה של $t$).

**(4) (10 pts)** הוכיחו ש:

$$\forall t \geq 0: \quad L(w(t)) \leq L(w(0)) \exp\left(-2N c^{2 - \frac{2}{N}} \cdot t\right)$$

כלומר, פונקציית ההפסד מתכנסת ל-$0$ בקצב אקספוננציאלי. אל תשתמשו בטענות מהכיתה במהלך הפתרון.
*רמז:* ראשית הראו ש-$\frac{d}{dt} L(w(t)) = -L(w(t)) \cdot 2N w(t)^{2 - \frac{2}{N}}$.

**Solution sketch:**
(זהה למועד ב 2021 שאלה 2 — ראו index/exams/fodl_exam_b_2021.md; רק חלוקת הנקודות שונה: 10/10/5/10 במקום 12/12/6/12.)

**1.** $\frac{\partial \phi}{\partial w_i} = L'(w)\prod_{k \neq i} w_k$, ולכן תחת זרימת גרדיאנט $\frac{d}{dt} w_i^2 = 2 w_i \dot w_i = -2 L'(w) \prod_k w_k = -2 L'(w)\, w(t)$ — זהה לכל $i$. חיסור עבור $i, j$ נותן $\frac{d}{dt}(w_i^2 - w_j^2) = 0$ (חוק שימור ה-balancedness).

**2.** לפי (1), אתחול מאוזן נשאר מאוזן: $w_i(t)^2 = |w(t)|^{2/N}$ ($= w(t)^{2/N}$ במשטר $w(t) \geq 0$ הנדון). כלל המכפלה: $\dot w = \sum_i \big(\prod_{k \neq i} w_k\big) \dot w_i = -L'(w) \sum_i \big(\prod_{k \neq i} w_k\big)^2 = -L'(w) \sum_i w^2 / w_i^2 = -N L'(w)\, w^{2 - 2/N}$, כאשר $L'(w) = w - y$.

**3.** מונוטוניות זרימת-הגרדיאנט: $L(w(t)) \leq L(w(0)) = L(c)$, כלומר $|w(t) - y| \leq y - c$ (כיוון ש-$c \in (0, y)$), מה שנותן $c \leq w(t) \leq 2y - c$.

**4.** שלב הרמז: $\frac{d}{dt} L(w(t)) = (w - y)\dot w = -N (w - y)^2 w^{2 - 2/N} = -2 L(w(t)) \cdot N w(t)^{2 - 2/N}$. מכיוון ש-$w(t) \geq c > 0$ לפי (3) ו-$2 - 2/N > 0$: $\frac{d}{dt} L(w(t)) \leq -2N c^{2 - 2/N} L(w(t))$. אינטגרציה ($\frac{d}{dt} \ln L \leq -2N c^{2-2/N}$, Grönwall) נותנת את החסם האקספוננציאלי.

**💡 טריקים שימושיים:** "אל תשתמשו בטענות מהכיתה" ⇒ גזרו את ה-balancedness מאפס: $\frac{d}{dt}w_i^2=-2L'(w)\,w$ *זהה לכל $i$*, ולכן הפרשים נשמרים; אתחול מאוזן ⇒ $w_i^2=w^{2/N}$; עובדת מונוטוניות-ההפסד נותנת את המחסום $w(t)\geq c$, שהוא מה שמאפשר לחסום מלרע $w^{2-2/N}\geq c^{2-2/N}$; סיימו עם $\frac{d}{dt}\ln L\leq -2Nc^{2-2/N}$ + Grönwall.

**⚠️ שים לב:** אסור לכם לצטט את חוק השימור — הוכיחו אותו; המחסום מסעיף 3 חיוני (ללא $w(t)\geq c$ הקצב האקספוננציאלי אינו נובע); שימו לב לסימנים — $c\in(0,y)$ שומר על $w(t)\geq c>0$ כך שהחזקה $w^{2-2/N}$ מוגדרת היטב וחסומה מלרע.

## Q3 (30 pts) — הכללה באמצעות $\epsilon$-כיסוי סופי: Hoeffding על הכיסוי, העברת דיסקרטיזציה Lipschitz, וחסמים משוקללי-אינדקס מעל חלוקה
**Topics:** מספרי כיסוי, התכנסות במידה שווה, Hoeffding, ריכוזיות, כלים הסתברותיים, מזעור סיכון מבני | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2, lecture_08_generalization_3
**Statement (English translation):**
עבור מרחב קלט $\mathcal{X}$ ומרחב פלט $\mathcal{Y}$, תהי $\mathcal{H} \subseteq \mathcal{Y}^{\mathcal{X}}$ מחלקת השערות ותהי $\mathcal{F} \subseteq \mathcal{H}$ תת-קבוצה *סופית* של $\mathcal{H}$. יהי $\epsilon > 0$. הניחו שלכל $h \in \mathcal{H}$ קיימת $f \in \mathcal{F}$ כך ש:

$$|h(x) - f(x)| \leq \epsilon$$

(לכל $x \in \mathcal{X}$; כלומר, $\mathcal{F}$ היא $\epsilon$-כיסוי של $\mathcal{H}$ במטריקת הסופרמום).

תהי $\mathcal{D}$ התפלגות (לא ידועה) מעל $\mathcal{X} \times \mathcal{Y}$, יהי $S = \{(x_n, y_n)\}_{n=1}^{N}$ מדגם אימון של $N$ דוגמאות הנדגמות i.i.d. מ-$\mathcal{D}$, ותהי $l: \mathcal{Y} \times \mathcal{Y} \to [0,1]$ פונקציית הפסד. עבור השערה $h \in \mathcal{H}$, נסמן ב-$L_\mathcal{D}(h)$ את שגיאת ההכללה (כלומר $L_\mathcal{D}(h) := E_{(x,y) \sim \mathcal{D}}[l(h(x), y)]$) וב-$L_S(h)$ את שגיאת המדגם (כלומר $L_S(h) := \frac{1}{N} \sum_{n=1}^{N} l(h(x_n), y_n)$).

**(1) (8 pts)** גזרו חסם הכללה המבוסס על התכנסות במידה שווה עבור המחלקה $\mathcal{F}$. כלומר, גזרו ביטוי $\Delta(N, \delta, |\mathcal{F}|)$ (שתלותו במחלקת ההשערות היא רק דרך $|\mathcal{F}|$) המקיים $\lim_{N \to \infty} \Delta(N, \delta, |\mathcal{F}|) = 0$, כך שלכל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$:

$$\forall f \in \mathcal{F}:\ L_\mathcal{D}(f) - L_S(f) \leq \Delta(N, \delta, |\mathcal{F}|)$$

*תזכורת (חסם Hoeffding):* יהיו $A_1, \ldots, A_N$ משתנים מקריים i.i.d. (בלתי-תלויים ושווי-התפלגות) החסומים בקטע $[0,1]$. לכל $\epsilon \geq 0$:

$$P\left(\left|\frac{1}{N}\sum_{i=1}^{N} A_i - E[A_1]\right| \geq \epsilon\right) \leq 2\exp(-2N\epsilon^2)$$

**(2) (11 pts)** הניחו שפונקציית ההפסד $l$ היא $\rho$-Lipschitz ביחס למשתנה הראשון שלה, עבור $\rho > 0$ קבוע כלשהו. גזרו חסם הכללה עבור המחלקה $\mathcal{H}$ המבוסס על "טכניקת הדיסקרטיזציה (הדחיסה)" שנלמדה בכיתה. כלומר, בעזרת הסעיף הקודם, הוכיחו שלכל $\delta \in (0,1)$, בהסתברות של לפחות $1 - \delta$:

$$\forall h \in \mathcal{H}:\ L_\mathcal{D}(h) - L_S(h) \leq \Delta(N, \delta, |\mathcal{F}|) + 2\rho\epsilon$$

**(3) (11 pts)** נסמן ב-$\mathcal{F}_1, \ldots, \mathcal{F}_R \subset \mathcal{F}$ חלוקה שרירותית של $\mathcal{F}$ לתת-קבוצות זרות; כלומר, $\mathcal{F}_1 \cup \cdots \cup \mathcal{F}_R = \mathcal{F}$ ו-$\mathcal{F}_i \cap \mathcal{F}_j = \emptyset$ לכל $i \neq j \in \{1, \ldots, R\}$. נניח שברשותנו אלגוריתם למידה הנוטה להחזיר השערות $h \in \mathcal{H}$ שעבורן $f \in \arg\min_{f \in \mathcal{F}} \|h - f\|_\infty$ שוכנת בקבוצה $\mathcal{F}_i$ עם אינדקס $i$ קטן יחסית. גזרו חסם הכללה דומה לחסם מסעיף 2, אך מותאם לשימוש באלגוריתם זה. כלומר, עבור $h \in \mathcal{H}$: ככל שהאינדקס $i$ של הקבוצה $\mathcal{F}_i$ שבה שוכנת ההשערה מ-$\mathcal{F}$ הקרובה ביותר ל-$h$ קטן יותר, כך החסם עבור $h$ צריך להיות קטן יותר.

**Solution sketch:**
**1.** קבעו $f$: $A_n := l(f(x_n), y_n)$ הם i.i.d. ב-$[0,1]$ עם $E[A_1] = L_\mathcal{D}(f)$. Hoeffding נותן $P(|L_S(f) - L_\mathcal{D}(f)| \geq \epsilon') \leq 2e^{-2N\epsilon'^2}$. חסם איחוד מעל ה-$\mathcal{F}$ הסופית ופתרון $2|\mathcal{F}| e^{-2N\epsilon'^2} = \delta$: $\Delta(N, \delta, |\mathcal{F}|) = \sqrt{\frac{\ln(2|\mathcal{F}|/\delta)}{2N}} \to 0$.

**2.** עבור $h \in \mathcal{H}$ קחו את נקודת הכיסוי שלה $f \in \mathcal{F}$ עם $\sup_x |h(x) - f(x)| \leq \epsilon$. תכונת ה-$\rho$-Lipschitz של $l$ בארגומנט הראשון שלה נותנת $|l(h(x), y) - l(f(x), y)| \leq \rho\epsilon$ נקודתית. מכאן $L_\mathcal{D}(h) \leq L_\mathcal{D}(f) + \rho\epsilon$ וגם $L_S(f) \leq L_S(h) + \rho\epsilon$. על המאורע של סעיף 1: $L_\mathcal{D}(h) - L_S(h) \leq \big(L_\mathcal{D}(f) - L_S(f)\big) + 2\rho\epsilon \leq \Delta(N, \delta, |\mathcal{F}|) + 2\rho\epsilon$, במידה אחידה מעל $\mathcal{H}$, בהסתברות $\geq 1 - \delta$.

**3.** שקלול ביטחון בסגנון SRM מעל התאים: הקצו $\delta_i := \delta \cdot 2^{-i}$ ל-$\mathcal{F}_i$ (כך ש-$\sum_{i=1}^{R} \delta_i < \delta$) והחילו את סעיף 1 על כל תא: בהסתברות $\geq 1 - \delta$, בו-זמנית $\forall i,\ \forall f \in \mathcal{F}_i$: $L_\mathcal{D}(f) - L_S(f) \leq \Delta(N, \delta 2^{-i}, |\mathcal{F}_i|)$. עבור $h$, יהי $i(h)$ אינדקס התא המכיל את נקודת הכיסוי הקרובה ביותר שלו $f$ (המקיימת $\|h - f\|_\infty \leq \epsilon$ לפי הנחת הכיסוי). העברת ה-Lipschitz מסעיף 2 נותנת $L_\mathcal{D}(h) - L_S(h) \leq \Delta\big(N, \delta 2^{-i(h)}, |\mathcal{F}_{i(h)}|\big) + 2\rho\epsilon$. החסם קטן ממש כאשר $i(h)$ קטֵן (חלק ביטחון גדול יותר $\delta 2^{-i}$; כדי שהמונוטוניות ב-$i$ תתקיים ללא תלות בגדלי התאים אפשר להחליף את $|\mathcal{F}_{i(h)}|$ ב-$|\mathcal{F}|$), בהתאמה להטיית האלגוריתם לכיוון תאים בעלי אינדקס קטן.

**💡 טריקים שימושיים:** $\epsilon$-כיסוי סופי ⇒ Hoeffding + איחוד על $\mathcal F$ בלבד; העברה ל*כל* $\mathcal H$ דרך גשר ה-Lipschitz $2\rho\epsilon$; "אלגוריתם מעדיף תאים בעלי אינדקס נמוך" ⇒ משקל SRM $\delta_i=\delta 2^{-i}$ לכל תא בחלוקה.

**⚠️ שים לב:** גורם ההעברה הוא $2\rho\epsilon$ — אתם משלמים $\rho\epsilon$ *פעמיים* (פעם על $L_D$, פעם על $L_S$); הנחת הכיסוי היא שמבטיחה $f$ קרוב ביותר בתוך $\epsilon$; כדי לכפות מונוטוניות ב-$i$ ללא תלות בגדלי התאים, שימו $|\mathcal F|$ (לא $|\mathcal F_i|$) בתוך ה-log.
