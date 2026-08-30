# מבחן FODL — מועד ב׳ 2020
**Date / semester:** 13 באוגוסט 2020 — סמסטר אביב 2019–2020, מועד ב׳
**Total points:** 100

## Q1 (45 pts) — טנזורים כפונקציות על רשת, פירוק CP כרשת, והאילוץ הסימטרי
**Topics:** שיטות טנזוריות, אוניברסליות, מחלקת השערות, פירוק CP, טנזורים סימטריים, שיתוף משקלים | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness, fodl_recitation_kronecker_expressiveness
**Statement (English translation):**
יהיו $M, N \in \mathbb{N}$, ושקלו את מרחב הפונקציות מ-$[M]^N$ ל-$\mathbb{R}$.

- **(5 pts)** הסבירו כיצד מרחב פונקציות זה מתאים למרחב הטנזורים הממשיים מסדר $N$ וממד $M$ בכל מוד.

שקלו את פירוק CP:

$$A = \sum_{z=1}^{Z} a_z \cdot \underline{a}^{z,1} \otimes \underline{a}^{z,2} \otimes \cdots \otimes \underline{a}^{z,N}\,,\quad Z \in \mathbb{N}\,,\ \{a_z \in \mathbb{R}\}_{z \in [Z]}\,,\ \{\underline{a}^{z,i} \in \mathbb{R}^M\}_{z \in [Z], i \in [N]} \tag{1}$$

- **(5 pts)** שרטטו סכמה של רשת הנוירונים ש-(1) מתאים לה, תוך הדגשת התפקיד של $Z$, $\{a_z\}_z$ ו-$\{\underline{a}^{z,i}\}_{z,i}$.
- **(10 pts)** הוכיחו ש-(1) אוניברסלי, כלומר עם $Z$ גדול מספיק, ניתן לבחור את הפרמטרים $\{a_z\}_z$ ו-$\{\underline{a}^{z,i}\}_{z,i}$ כדי לממש כל טנזור.

נניח כעת ש-(1) מאולץ לקיים: $\underline{a}^{z,1} = \underline{a}^{z,2} = \cdots = \underline{a}^{z,N}\,,\ \forall z \in [Z]$.

- **(5 pts)** כיצד יש לשנות את רשת הנוירונים המתאימה כדי להביא בחשבון אילוץ זה?
- **(10 pts)** האם קיימים $M, N \geq 2$ שעבורם הפירוק המאולץ אוניברסלי? הוכיחו את תשובתכם.
- **(10 pts)** עבור $N = 2$, אפיינו את מחלקת הטנזורים שניתן לבטא על ידי הפירוק המאולץ (עם $Z$ גדול כרצוננו). הוכיחו את תשובתכם.

**Solution sketch:**
**i.** התאמה חד-חד-ערכית ועל $f \leftrightarrow A$ באמצעות $A_{d_1, \ldots, d_N} = f(d_1, \ldots, d_N)$: טנזור מסדר $N$ וממד $M$ הוא בדיוק טבלת החיפוש של פונקציה על הרשת $[M]^N$.

**ii.** "רשת CP" רדודה: $N$ ענפי קלט (קידודי one-hot של $d_1,\ldots,d_N$); שכבה חבויה ברוחב $Z$, כאשר יחידה $z$ מחשבת את המכפלה $\prod_{i=1}^N \langle \underline a^{z,i}, e_{d_i}\rangle$ (מאגם-מכפלה של ההעתקות הלינאריות לכל מוד $\underline a^{z,i}$); שכבת פלט לינארית עם משקלים $\{a_z\}$. $Z$ = רוחב חבוי = חסם דרגת CP.

**iii.** אוניברסליות: עם $Z = M^N$, מנו את כל צירופי האינדקסים וקחו את האיברים $A_{d_1 \ldots d_N}\, e_{d_1} \otimes \cdots \otimes e_{d_N}$ (וקטורי בסיס סטנדרטי, $a_z$ = הרכיב המתאים). הסכום משחזר כל $A$ מבוקש.

**iv.** האילוץ הוא שיתוף משקלים: אותו וקטור $\underline a^{z}$ משמש בכל $N$ ענפי הקלט של יחידה חבויה $z$ (בדומה לשיתוף משקלים קונבולוציוני על פני המודים).

**v.** אין $M, N \geq 2$ כאלה: כל איבר מאולץ $a_z (\underline a^z)^{\otimes N}$ הוא טנזור סימטרי (אינווריאנטי תחת כל תמורה של האינדקסים), וסכומים של טנזורים סימטריים הם סימטריים. מכיוון שקיימים טנזורים לא-סימטריים בכל פעם ש-$M, N \geq 2$ (למשל $A_{1,2,\ldots} \neq A_{2,1,\ldots}$), הפירוק המאולץ לעולם אינו אוניברסלי.

**vi.** $N = 2$: המחלקה הניתנת לביטוי היא בדיוק המטריצות הסימטריות $M \times M$. ($\subseteq$) כל איבר $a_z\, \underline a^z (\underline a^z)^\top$ סימטרי. ($\supseteq$) לפי המשפט הספקטרלי, כל מטריצה סימטרית מקיימת $A = \sum_{z=1}^{M} \lambda_z\, \underline v_z \underline v_z^\top$ — קחו $Z = M$, $a_z = \lambda_z$ (הסימנים נבלעים על ידי $a_z$), $\underline a^z = \underline v_z$.

**💡 טריקים שימושיים:** פונקציה על הרשת ↔ טנזור (טבלת חיפוש); CP = רשת מאגם-מכפלה רדודה עם רוחב $Z$ = דרגה; אוניברסליות על ידי מניית $M^N$ האיברים מדרגה-1 של הבסיס הסטנדרטי; האילוץ הסימטרי הוא *שיתוף משקלים* על פני המודים; עבור $N=2$ המשפט הספקטרלי נותן בדיוק את המטריצות הסימטריות (הסקלר $a_z$ בולע סימן, ולכן ערכים עצמיים שליליים בסדר).

**⚠️ שים לב:** (v) המכשול הוא ש*סכום* של טנזורים סימטריים נשאר סימטרי בעוד שקיימים טנזורים לא-סימטריים עבור $M,N\geq2$ — צטטו רכיב א-סימטרי קונקרטי; (vi) הוכיחו את שתי ההכלות, ושימו לב שכיוון ה-$\supseteq$ זקוק לסימנים הנישאים על ידי $a_z$ (לא על ידי $\underline a^z$, שמכפלתו החיצונית תמיד חיובית-למחצה).

## Q2 (35 pts) — דינמיקת ניבוי של gradient flow ($\dot{u} = -H(u-y)$) והתכנסות תחת גרעין קבוע
**Topics:** זרימת גרדיאנט, NTK, פרמטריזציית יתר, קצב התכנסות, התכנסות לינארית | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_05_optimization_3, fodl_recitation_gradient_flow
**Statement (English translation):**
עבור $k, d \in \mathbb{N}$, תהי $f : \mathbb{R}^k \times \mathbb{R}^d \to \mathbb{R}$ פונקציה גזירה ברציפות המייצגת רשת נוירונים, כך ש-$f(\underline{w}, \underline{x})$ מייצג את פלט הרשת כאשר המשקלים $= \underline{w}$ והקלט $= \underline{x}$. בהינתן קבוצת אימון $\{(\underline{x}_i, y_i)\}_{i=1}^m \subseteq \mathbb{R}^d \times \mathbb{R}$, נניח שאנו מאמנים על ידי הרצת gradient flow על הפסד $\ell_2$:

$$\ell(\underline{w}) = \tfrac{1}{2}\sum\nolimits_{i=1}^m (f(\underline{w}, \underline{x}_i) - y_i)^2$$

סמנו $\underline{y} := [y_1, y_2, \ldots, y_m]^\top \in \mathbb{R}^m$, ועבור $t \geq 0$, יהי $\underline{u}(t)$ מחזיק את הניבויים על דוגמאות האימון בזמן $t$ של האופטימיזציה, כלומר $\underline{u}(t) := [f(\underline{w}(t), \underline{x}_1), \ldots, f(\underline{w}(t), \underline{x}_m)]^\top \in \mathbb{R}^m$.

- **(10 pts)** הוכיחו ש-$\underline{u}(t)$ עוקב אחר הדינמיקה:
$$\underline{\dot{u}}(t) := \tfrac{d}{dt}\underline{u}(t) = -H(t)\,(\underline{u}(t) - \underline{y})\,,\ t \geq 0\,,$$
כאשר $H(t) \in \mathbb{R}^{m \times m}$ מוגדרת על ידי $(H(t))_{i,j} = \left\langle \frac{\partial f(\underline{w}(t), \underline{x}_i)}{\partial \underline{w}}, \frac{\partial f(\underline{w}(t), \underline{x}_j)}{\partial \underline{w}} \right\rangle$.

נניח כעת ש-$H(t)$ קבועה ($H(t) = H(0)$, $\forall t \geq 0$) ויהיו $\{\lambda_i \in \mathbb{R}\}_{i=1}^m$ ערכיה העצמיים.

- **(10 pts)** הוכיחו שאם $\lambda_i > 0$, $\forall i \in [m]$, אז עבור כל $\epsilon > 0$, מתקיים $\ell(\underline{w}(t)) \leq \epsilon$ לאחר זמן של לכל היותר $\max_{i \in [m]} \frac{1}{2\lambda_i} \log\left(\frac{m \|\underline{u}(0) - \underline{y}\|^2}{2\epsilon}\right)$.
- **(8 pts)** הוכיחו שאם $k < m$ אז קיים $i \in [m]$ שעבורו $\lambda_i = 0$.
- **(7 pts)** הסבירו (איכותית) מדוע התכנסות להפסד אפס אינה סבירה במשטר זה ($k < m$), אך סבירה תחת פרמטריזציית יתר, כלומר כאשר $k \gg m$.

**Solution sketch:**
**i.** gradient flow: $\underline{\dot w} = -\nabla\ell(\underline w) = -\sum_j (u_j - y_j)\, \frac{\partial f(\underline w, \underline x_j)}{\partial \underline w}$. כלל השרשרת לכל קואורדינטה: $\dot u_i = \big\langle \frac{\partial f(\underline w, \underline x_i)}{\partial \underline w}, \underline{\dot w}\big\rangle = -\sum_j H_{ij}(t)(u_j - y_j)$.

**ii.** יהי $\underline e := \underline u - \underline y$. עם $H$ קבועה סימטרית וחיובית-למחצה: $\underline{\dot e} = -H\underline e \Rightarrow \underline e(t) = e^{-Ht}\underline e(0)$. בבסיס העצמי האורתונורמלי של $H$, הרכיב ה-$i$ דועך כ-$e^{-\lambda_i t}$. $\ell(\underline w(t)) = \frac12\|\underline e(t)\|^2 = \frac12\sum_i e^{-2\lambda_i t}\,\langle \underline e(0), \underline v_i\rangle^2$. כל מחובר הוא $\leq \epsilon/m$ ברגע ש-$t \geq \frac{1}{2\lambda_i}\log\big(\frac{m\,\|\underline e(0)\|^2}{2\epsilon}\big)$ (בשימוש ב-$\langle \underline e(0), \underline v_i\rangle^2 \leq \|\underline e(0)\|^2$). קחו את המקסימום על $i$ וסכמו — ה-$m$ בתוך הלוג משלם עבור $m$ המחוברים.

**iii.** $H = JJ^\top$ כאשר $J \in \mathbb{R}^{m \times k}$ הוא היעקוביאן עם שורות $\frac{\partial f(\underline w, \underline x_i)}{\partial \underline w}^\top$. לכן $\mathrm{rank}(H) \leq \mathrm{rank}(J) \leq k < m$, ולכן המטריצה הסימטרית חיובית-למחצה $H$ סינגולרית — ערך עצמי כלשהו שווה 0.

**iv.** כאשר $k < m$: רכיבי השארית הנמצאים במרחב האפס של $H$ אינם דועכים, ובאופן גנרי לא ניתן להתאים את כל $m$ התוויות על ידי $k < m$ פרמטרים — הפסד האימון נתקע מעל 0. כאשר $k \gg m$: באופן גנרי ל-$J$ יש דרגת שורות מלאה ולכן $H \succ 0$ ($\lambda_{\min} > 0$), הנותן התכנסות אקספוננציאלית להפסד אפס. יתר על כן, במשטר האולטרה-רחב (NTK) $H(t)$ אכן נשארת קרובה ל-$H(0)$, מה שמצדיק את הנחת הגרעין הקבוע.

**💡 טריקים שימושיים:** הדינמיקה נובעת מכלל השרשרת: $\dot u_i=\langle\partial_{\underline w}f_i,\dot{\underline w}\rangle$ עם $\dot{\underline w}=-\nabla\ell$; $H$ חיובית-למחצה וקבועה ⇒ $\underline e(t)=e^{-Ht}\underline e(0)$, ולכן עבדו בבסיס העצמי של $H$; הגורם $m$ בתוך הלוג משלם עבור $m$ המחוברים העצמיים; $H=JJ^\top$ ⇒ $\mathrm{rank}(H)\leq k$.

**⚠️ שים לב:** (ii) חסמו $\langle\underline e(0),v_i\rangle^2\leq\|\underline e(0)\|^2$ וחלקו את התקציב $\epsilon/m$ לכל מוד לפני לקיחת המקסימום; (iii) $k<m$ ⇒ $H$ בעלת חוסר-דרגה ⇒ ערך עצמי אפס אמיתי שהשארית שלו במרחב-האפס *לעולם* אינה דועכת; (iv) פרמטריזציית יתר נותנת גם $H\succ0$ *וגם* (NTK) $H(t)\approx H(0)$ — הזכירו את שניהם.

## Q3 (20 pts) — חסם הכללה לכל המשקלים ממחלקות של קואורדינטה-מאופסת (Lipschitz + חסם איחוד)
**Topics:** התכנסות במידה שווה, כלים הסתברותיים, חסמי נורמה, Lipschitz, מזעור סיכון מבני | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2
**Statement (English translation):**
עבור $k, d \in \mathbb{N}$, תהי $f : \mathbb{R}^k \times \mathbb{R}^d \to \mathbb{R}$ פונקציה המייצגת רשת נוירונים, כך ש-$f(\underline{w}, \underline{x})$ מייצג את פלט הרשת כאשר המשקלים $= \underline{w}$ והקלט $= \underline{x}$. הניחו שעבור $\rho > 0$ כלשהו, $f(\cdot, \cdot)$ הוא $\rho$-Lipschitz בארגומנט הראשון שלו, כלומר $|f(\underline{w}_1, \underline{x}) - f(\underline{w}_2, \underline{x})| \leq \rho \cdot |\underline{w}_1 - \underline{w}_2|$, $\forall \underline{w}_1, \underline{w}_2 \in \mathbb{R}^k$, $\underline{x} \in \mathbb{R}^d$ (כאן $|\cdot|$ מציין את הנורמה האוקלידית). תהי $\mathcal{D}$ התפלגות מעל $\mathbb{R}^d \times \mathbb{R}$, $S = \{(\underline{x}_i, y_i)\}_{i=1}^m$ קבוצת אימון שנדגמה i.i.d. לפי $\mathcal{D}$, וגם

$$L_{\mathcal{D}}(\underline{w}) = \mathbb{E}_{(\underline{x}, y) \sim \mathcal{D}}\big[\,|y - f(\underline{w}, \underline{x})|\,\big] \quad\text{וגם}\quad L_S(\underline{w}) = \frac{1}{m}\sum\nolimits_{i=1}^m |y_i - f(\underline{w}, \underline{x}_i)|$$

הם הפסדי $\ell_1$ האוכלוסייתי והאמפירי המתאימים, בהתאמה. עבור כל $r \in [k]$, יהי $W_r := \{\underline{w} \in \mathbb{R}^k : (\underline{w})_r = 0\}$, ותהי $\Delta_r : \mathbb{N} \times (0,1) \to \mathbb{R}_{\geq 0}$ פונקציה שעבורה $\forall \delta \in (0,1)$, בהסתברות $\geq 1 - \delta$ על $S$:

$$\forall \underline{w} \in W_r : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \Delta_r(m, \delta)$$

- **(10 pts)** עבור $r \in [k]$ קבוע, הוכיחו ש-$\forall \delta \in (0,1)$, בהסתברות $\geq 1 - \delta$ על $S$:
$$\forall \underline{w} \in \mathbb{R}^k : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \Delta_r(m, \delta) + 2\rho \cdot |(\underline{w})_r|$$
(המבחן מדפיס "$\Delta(m,\delta)$" כאן; מההקשר זהו $\Delta_r(m,\delta)$).
- **(10 pts)** הוכיחו ש-$\forall \delta \in (0,1)$, בהסתברות $\geq 1 - \delta$ על $S$:
$$\forall \underline{w} \in \mathbb{R}^k : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \min_{r \in [k]}\left\{\Delta_r\left(m, \tfrac{\delta}{k}\right) + 2\rho \cdot |(\underline{w})_r|\right\}$$

**Solution sketch:**
**i.** עבור $\underline w$ שרירותי, הגדירו $\tilde{\underline w} \in W_r$ על ידי איפוס קואורדינטה $r$. אז $\|\underline w - \tilde{\underline w}\| = |(\underline w)_r|$. העברת Lipschitz: $|f(\underline w, \underline x) - f(\tilde{\underline w}, \underline x)| \leq \rho\,|(\underline w)_r|$ עבור כל $\underline x$, ולפי אי-שוויון המשולש ההפוך, הפסד $\ell_1$ (כלומר $|y - f(\cdot, \underline x)|$) הוא 1-Lipschitz בניבוי, ולכן נקודתית $\big|\,|y - f(\underline w,\underline x)| - |y - f(\tilde{\underline w},\underline x)|\,\big| \leq \rho\,|(\underline w)_r|$. מיצוע/לקיחת תוחלת נותנים $|L_S(\underline w) - L_S(\tilde{\underline w})| \leq \rho|(\underline w)_r|$ וגם $|L_{\mathcal D}(\underline w) - L_{\mathcal D}(\tilde{\underline w})| \leq \rho|(\underline w)_r|$. שרשרו את שלושת אי-השוויונות על מאורע ה-$1-\delta$ עבור $W_r$: $L_{\mathcal D}(\underline w) - L_S(\underline w) \leq \big[L_{\mathcal D}(\tilde{\underline w}) - L_S(\tilde{\underline w})\big] + 2\rho|(\underline w)_r| \leq \Delta_r(m,\delta) + 2\rho|(\underline w)_r|$.

**ii.** הפעילו את חלק (i) עבור כל $r \in [k]$ עם פרמטר ביטחון $\delta/k$. לפי חסם איחוד כל $k$ המאורעות מתקיימים בו-זמנית בהסתברות $\geq 1 - \delta$. על המאורע המשותף הזה חסם (i) מתקיים עבור *כל* $r$ בו-זמנית ועבור כל $\underline w$, ולכן ניתן לקחת את המינימום על $r \in [k]$ — הנותן את החסם המבוקש (בטעם SRM/למידה לא-אחידה: הקואורדינטה הטובה ביותר לאיפוס לכל השערה).

**💡 טריקים שימושיים:** הטילו את $\underline w$ לתוך $W_r$ על ידי איפוס קואורדינטה $r$ (מרחק $=|(\underline w)_r|$), ואז העבירו Lipschitz; הפסד $\ell_1$ הוא $1$-Lipschitz בניבוי (אי-שוויון המשולש ההפוך), ולכן הוא מתרכב עם תכונת ה-$\rho$-Lipschitz של הרשת ונותן $2\rho|(\underline w)_r|$; איחוד על $k$ מחלקות-הקואורדינטה עם $\delta/k$ לכל אחת ⇒ קחו $\min_r$.

**⚠️ שים לב:** ההעברה היא $2\rho|(\underline w)_r|$ — משולמת גם על $L_D$ וגם על $L_S$; עליכם להיעזר בכך ש-$|y-\cdot|$ הוא $1$-Lipschitz כדי לשרשר את ההפסדים; (ii) האיחוד עולה $\delta/k$ לכל מחלקה, ורק *לאחר מכן* מותר למזער על $r$ (המינימום הוא על משפחה תקפה-בו-זמנית).
