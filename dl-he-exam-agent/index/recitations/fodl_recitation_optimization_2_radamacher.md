# תרגול: תרגילי אופטימיזציה 2 + מורכבות Rademacher (תרגול 9)
- **File:** materials/recitations/fodl_recitation_optimization_2_radamacher.pdf
- **Related lectures:** lecture_04_optimization_2, lecture_06_generalization_1 (ההגדרות גם ב-lecture_01_three_pillars)
- **Summary:** תרגול בן שני חלקים המגשר בין מחצית האופטימיזציה למחצית ההכללה של הקורס. חלק 1 מנתח רגרסיה לינארית חד-ממדית בפרמטריזציית-יתר על ידי רשת לינארית בעומק $N$ ורוחב חבוי 1, $\phi(w_1,\dots,w_N)=L_S(\prod_i w_i)$: היא לא-קמורה, בעלת אינסוף מינימות גלובליות, עבור $N=2$ אין לה מינימות מקומיות רעות ורק אוכפים ממש, ותחת gradient flow ה-"unbalancedness" $w_1^2-w_2^2$ נשמר, ומניב צורה סגורה לנקודת הגבול. חלק 2 מגדיר מורכבות Rademacher (השקופיות מאייתות "Radamacher"), מפרש אותה כיכולת להתאים סימנים אקראיים, מחשב אותה לדוגמאות קיצוניות, ומוכיח את חסם ההכללה בהסתברות גבוהה $L_D(h)-L_S(h)\le 2R(\ell\circ\mathcal{H}\circ S) + 3\sqrt{2\ln(4/\delta)/m}$ דרך למה 26.2 של Shalev-Shwartz & Ben-David בתוספת אי-שוויון McDiarmid, כולל אימות תנאי ההפרשים-החסומים.

## נושאים שנסקרו
- רגרסיה לינארית בפרמטריזציית-יתר: הפסד $\ell_2$ $L_S(w)=\frac1m\|wx-\mathbf{y}\|^2$ על מודלים לינאריים סקלריים, בפרמטריזציית-יתר על ידי רשת NN לינארית בעומק $N\ge2$ ורוחב 1
- אי-קמירות דרך נקודה קריטית שאינה מינימום גלובלי; אינסוף מינימות גלובליות דרך סימטריית שינוי-קנה-מידה
- הנוף עבור $N=2$: אין מינימות מקומיות רעות (לא-גלובליות), אין אוכפים לא-ממש; ניתוח הסיאן של האוכף בראשית
- חוק שימור תחת GF (balancedness) וגבול הזרימה בצורה סגורה
- הגדרת ההכללה: $\mathcal{X},\mathcal{Y},\mathcal{D},S\sim\mathcal{D}^m,\mathcal{H}$, הפסד חסום ב-1, הפסד אוכלוסייה $L_\mathcal{D}$, הפסד אמפירי $L_S$
- מורכבות Rademacher של קבוצה $A\subseteq\mathbb{R}^m$; קבוצת הרכבת-ההפסד $\ell\circ\mathcal{H}\circ S$
- פרשנות (התאמת תת-קבוצה אקראית תוך "אנטי-התאמה" של השאר) ודוגמאות (יחידון, הקובייה המלאה $\{\pm1\}^m$)
- חסם הכללה מבוסס-Rademacher; אי-שוויון McDiarmid; אימות הפרשים-חסומים

## בעיות פתורות וגזירות
**P1.** ביטוי מפורש לפונקציית המטרה בפרמטריזציית-יתר.
טכניקה: הצבה ישירה:

$$\phi(w_1,\dots,w_N) = L_S\big(\prod_{i=1}^N w_i\big) = \frac1m\big\|\big(\prod_{i=1}^N w_i\big)x - \mathbf{y}\big\|^2$$

, עם $x,\mathbf{y}\in\mathbb{R}^m$, $x\ne0$, $\langle x,\mathbf{y}\rangle>0$.

**P2.** $\phi$ לא-קמורה.
טכניקה: הציגו נקודה קריטית שאינה מינימום גלובלי: כלל השרשרת נותן

$$\frac{\partial\phi}{\partial w_j} = \nabla L_S\big(\prod_i w_i\big)\prod_{k\ne j}w_k$$

, ולכן $\nabla\phi(0)=0$ (עבור $N\ge2$); אך $L_S$ קמורה עם ממזער יחיד

$$w^* = \frac{\langle x,\mathbf{y}\rangle}{\|x\|^2} > 0$$

, ולכן

$$\phi(0)=L_S(0) > L_S(w^*) = \phi(w^*,1,\dots,1)$$

**P3.** ל-$\phi$ יש אינסוף מינימות גלובליות.
טכניקה: סימטריית שינוי-קנה-מידה של פרמטריזציית המכפלה: לכל $c>0$,

$$\theta_c := (cw^*, \tfrac1c, 1,\dots,1)^\top$$

מקיים $\phi(\theta_c) = L_S(w^*)$, ומכאן רצף של ממזערים גלובליים.

**P4.** עבור $N=2$: אין מינימות מקומיות רעות ואין אוכפים לא-ממש.
טכניקה: נקודות קריטיות מקיימות $\nabla L_S(w_1w_2)=0$ (ואז $(w_1,w_2)$ הוא מינימום גלובלי כי $w_1w_2$ ממזער את $L_S$) או $w_1=w_2=0$. בנקודה $(0,0)$ חשבו את ההסיאן:

$$\partial^2_{w_1}\phi(0,0)=\partial^2_{w_2}\phi(0,0)=0$$

$$\partial^2_{w_1w_2}\phi(0,0) = \nabla L_S(0) = -\frac2m\langle x,\mathbf{y}\rangle$$

; אזי

$$\nabla^2\phi(0,0)\binom{1}{1} = -\frac2m\langle x,\mathbf{y}\rangle\binom{1}{1}$$

מציג ערך עצמי שלילי $\Rightarrow$ אוכף ממש.

**P5.** גבול GF עם אתחול לא-מאוזן: $c := w_1(0)^2 - w_2(0)^2 > 0$, בהנחת התכנסות לממזער גלובלי עם $w_1(\infty)>0$; גזרו את הגבול בצורה סגורה.
טכניקה: חוק שימור — כלל השרשרת נותן

$$\frac{d}{dt}w_1(t)^2 = -2w_1w_2\nabla L_S(w_1w_2) = \frac{d}{dt}w_2(t)^2$$

, ולכן $w_1(t)^2 - w_2(t)^2 \equiv c$ ("שימור balancedness"). שלבו עם $w_1(\infty)w_2(\infty) = w^*$: פתרו את המשוואה הריבועית ב-$w_2(\infty)^2$ לקבלת

$$w_2(\infty) = \sqrt{\tfrac{-c+\sqrt{c^2+4(w^*)^2}}{2}}$$

$$w_1(\infty) = \sqrt{\tfrac{c+\sqrt{c^2+4(w^*)^2}}{2}}$$

**P6.** מורכבות Rademacher של קבוצות קיצוניות: (a) $A=\{a'\}\Rightarrow R(A)=0$; (b) $A=\{1,-1\}^m\Rightarrow R(A)=1$.
טכניקה: (a) לינאריות התוחלת עם $\mathbb{E}[\sigma_i]=0$; (b) חסם עליון $\sum_i\sigma_ia_i\le m$ והשׂגתו עם $a=\sigma\in A$ (כך שהסופרמום שווה ל-$m$ לכל מימוש).

**P7.** משפט 1 (חסם הכללה): לכל $\delta\in(0,1)$, בהסתברות $\ge 1-\delta$ מעל $S\sim\mathcal{D}^m$,

$$\forall h\in\mathcal{H}:\ L_\mathcal{D}(h)-L_S(h) \le 2R(\ell\circ\mathcal{H}\circ S) + 3\sqrt{\frac{2\ln(4/\delta)}{m}}$$

טכניקה: עבדו עם

$$\Delta(S) := \sup_{h\in\mathcal{H}}[L_\mathcal{D}(h)-L_S(h)]$$

. (i) שלב-בתוחלת:

$$\mathbb{E}_S[\Delta(S)] \le 2\mathbb{E}_S[R(\ell\circ\mathcal{H}\circ S)]$$

(למה 26.2, "Understanding ML"). (ii) ריכוזיות: גם $\Delta(S)$ וגם $R(\ell\circ\mathcal{H}\circ S)$ מקיימים את תנאי ההפרשים-החסומים של McDiarmid עם $c=\frac2m$, ונותנים לכל אחד סטיות $\sqrt{\frac2m\ln\frac{2}{\delta'}}$; קחו $\delta'=\delta/2$ וחסם איחוד. (iii) שרשרו את שלושת אי-השוויונים; הקבועים מצטרפים ל-$2R + 3\sqrt{\frac2m\ln\frac4\delta}$.

**P8.** אימות הפרשים-חסומים ($c=\frac2m$) עבור $\Delta(S)$ ו-$R(\ell\circ\mathcal{H}\circ S)$.
טכניקה: החליפו דוגמה אחת $(x_j,y_j)\to(x_j',y_j')$; השתמשו ב-$\sup f - \sup g \le \sup(f-g)$, בטלו את $m-1$ האיברים המשותפים, וחסמו את האיבר הבודד הנותר ב-$\frac2m$ באמצעות $|\ell|\le1$ (וכן $|\sigma_j|=1$ במקרה של Rademacher); סמטרו לקבלת ערך מוחלט.

## נוסחאות ועובדות מפתח
- $L_S(w) = \frac1m\sum_{i=1}^m (wx_i-y_i)^2 = \frac1m\|wx-\mathbf{y}\|^2$; ממזער יחיד $w^* = \frac{\langle x,\mathbf{y}\rangle}{\|x\|^2}$
- גרדיאנט פרמטריזציית-המכפלה: $\frac{\partial\phi}{\partial w_j} = \nabla L_S\big(\prod_{i=1}^N w_i\big)\prod_{k\ne j}w_k$
- שימור balancedness תחת GF (עומק 2): $w_1(t)^2 - w_2(t)^2 = w_1(0)^2 - w_2(0)^2$ לכל $t$
- גבול GF: $w_{1,2}(\infty) = \sqrt{\frac{\pm c+\sqrt{c^2+4(w^*)^2}}{2}}$ עם $w_1(\infty)w_2(\infty)=w^*$
- הסיאן בראשית (N=2): $\nabla^2\phi(0,0) = \begin{pmatrix}0 & -\frac2m\langle x,\mathbf{y}\rangle\\ -\frac2m\langle x,\mathbf{y}\rangle & 0\end{pmatrix}$, ערכים עצמיים $\pm\frac2m\langle x,\mathbf{y}\rangle$ ⇒ אוכף ממש
- משתני Rademacher: $\Pr(\sigma_i=1)=\Pr(\sigma_i=-1)=\frac12$, i.i.d.
- מורכבות Rademacher: $R(A) := \frac1m\,\mathbb{E}_\sigma\Big[\sup_{a\in A}\sum_{i=1}^m \sigma_i a_i\Big]$, מיושמת בדרך כלל על $\ell\circ\mathcal{H}\circ S := \{(\ell(y_1,h(x_1)),\dots,\ell(y_m,h(x_m))) : h\in\mathcal{H}\}$
- $R(\{a'\})=0$; $R(\{\pm1\}^m)=1$
- למה 26.2 (SSBD): $\mathbb{E}_{S\sim\mathcal{D}^m}[\Delta(S)] \le 2\,\mathbb{E}_{S\sim\mathcal{D}^m}[R(\ell\circ\mathcal{H}\circ S)]$
- McDiarmid: הפרשים חסומים $\le c$ ⇒ בהסתברות $\ge1-\delta$, $|f(X_1,\dots,X_m) - \mathbb{E}f| \le c\sqrt{\frac m2\ln\frac2\delta}$
- משפט 1: בהסתברות $\ge1-\delta$, $\forall h\in\mathcal{H}$: $L_\mathcal{D}(h)-L_S(h) \le 2R(\ell\circ\mathcal{H}\circ S) + 3\sqrt{\frac{2\ln(4/\delta)}{m}}$

## נקודות רלוונטיות למבחן
- מתכון סטנדרטי להוכחת אי-קמירות: מצאו נקודה קריטית ($\nabla=0$) שאינה מינימום גלובלי — כאן $0$ עובד לכל עומק $N\ge2$ כי כל נגזרת חלקית מכילה מכפלה של יתר המשקלים.
- שימור balancedness $\frac{d}{dt}(w_1^2-w_2^2)=0$ הוא חוק השימור החתום של רשתות לינאריות תחת GF (תואם את הרצאה 4); צפו לשאלה המבקשת לגזור אותו ולהשתמש בו כדי לקבע את נקודת הגבול.
- הסמכת אוכף-ממש = חשבו את ההסיאן בנקודה הקריטית החשודה והציגו כיוון אחד של ערך-עצמי-שלילי (כאן $(1,1)$); אין צורך בכל הספקטרום.
- אינטואיציית Rademacher לציטוט: מודדת את יכולת $\mathcal{H}$ להתאים תוויות/סימנים אקראיים על $S$ ("התאימו את החלק $\sigma_i=1$, אנטי-התאימו את השאר"); $R=1$ למחלקה הממשת את כל תבניות הסימן פירושה שהחסם ריק — מתקשר לניסויי התוויות-האקראיות המניעים את הרצאות ההכללה.
- שלד הוכחת משפט-1 (למת הסימטריזציה-בתוחלת → McDiarmid פעמיים → חסם איחוד עם $\delta/2$ → הקבועים $2$ ו-$3$) וחישוב ההפרשים-החסומים עם $c=2/m$ הם טיעונים עצמאיים וברי-מבחן במיוחד.
- הערת איות: השקופיות כותבות "Radamacher"; האיות הסטנדרטי הוא Rademacher (מקור למה 26.2: Shalev-Shwartz & Ben-David, *Understanding Machine Learning*).
