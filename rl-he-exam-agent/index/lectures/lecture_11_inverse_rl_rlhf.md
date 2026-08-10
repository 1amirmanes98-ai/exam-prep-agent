# הרצאה 11 — למידה מחיזוקים הפוכה / חניכה (Inverse / Apprenticeship RL) ולמידה מחיזוקים ממשוב אנושי (RLHF)

**File:** materials/lectures/lecture_11_inverse_rl_rlhf.pdf
**Pillar:** Learning
**Summary:** ההגדרה "ללא פונקציית תגמול": שחזר התנהגות או תגמול ממסלולי מומחה (behavioral cloning, inverse RL, למידת חניכה עם מאפיינים לינאריים) ולמד תגמול/מדיניות מהשוואות העדפה אנושיות (RLHF באמצעות Bradley–Terry, PPO, והצורה הסגורה של DPO). מסומן כבעל משקל נמוך במבחן — הכר את ההגדרות, את חסם שגיאת השיבוט, את אפיון התגמול במרווח מקסימלי (max-margin), ואת הגזירה של DPO.

## Outline

- Inverse RL: RL קדמי (תגמול → מדיניות) מול inverse RL (מדיניות → תגמול)
- Behavioral cloning; חסם התפשטות שגיאה
- IRL במרחבי מצבים קטנים: אפיון תגמול + LP מרווח-מקסימלי
- למידת חניכה עם תוחלות מאפיינים לינאריות; אלגוריתם ייצור-אילוצים
- RLHF: משוב העדפה, מודל תגמול Bradley–Terry, הפסד מודל התגמול
- PPO: זהות ביצועי מדיניות יחסיים, אזור אמון (trust region) / קנס KL
- DPO: מדיניות אופטימלית בצורה סגורה, הפסד העדפה ישיר
- סיכום הקורס

## Key definitions

**Def (IRL problem setup).** בהינתן מצבים $S$, פעולות $A$, דינמיקה $p(s'|s,a)$, ומדיניות אופטימלית $\pi^*$ (במפורש או כמסלולים) אך **ללא תגמול**. שלוש מטרות: **behavioral cloning** (למד את $\pi^*$ ישירות), **inverse RL** (שחזר תגמול $R$ עקבי עם $\pi^*$), **למידת חניכה** (למד מדיניות כמעט-אופטימלית עבור התגמול הלא-ידוע).

**Def (Behavioral cloning).** התייחס לנתוני המומחה $(s_t,a_t=\pi^*(s_t))$ כאל בעיית סיווג מונחית מעל מחלקת מדיניות (לינארי/DNN/SVM); שחזר את $\hat\pi^*$ ישירות. חולשה: הסחת התפלגות (distribution shift) — לאחר טעות הסוכן מבקר במצבים הנעדרים מנתוני המומחה, והשגיאות מצטברות.

**Def (IRL reward characterization, tabular).** עם $P^*_{ij}=p(s_j|s_i,\pi^*(s_i))$, $P^a_{ij}=p(s_j|s_i,a)$, ווקטור תגמול $R$: $V^*=(I-\gamma P^*)^{-1}R$ ו-$Q^*(\cdot,a)=R+\gamma P^a V^*$. $\pi^*$ אופטימלית עבור $R$ **אם ורק אם** $(P^*-P^a)(I-\gamma P^*)^{-1}R\ge0$ לכל $a$.

**Def (Apprenticeship learning, linear features).** מאפייני מצב $\phi(s)\in\mathbb R^n$, $\|\phi(s)\|_\infty\le1$; תגמול $r(s)=w^\top\phi(s)$, $\|w\|_2\le1$. **תוחלות מאפיינים** 

$$\mu(\pi)=\sum_{t=0}^\infty\gamma^t E[\phi(s_t)\mid\pi]$$

 נותנות $V^\pi(s_0)=w^\top\mu(\pi)$, עם $\|\mu(\pi)\|_2\le\sqrt n/(1-\gamma)$. מטרה: מצא $\pi$ עם $\|\mu(\pi^*)-\mu(\pi)\|_2\le\epsilon$ — ואז $V$ תואם את המומחה עבור **כל** תגמול $w$ (

$$|w^\top\mu(\pi^*)-w^\top\mu(\pi)|\le\epsilon\|w\|_2$$

).

**Def (Bradley–Terry preference model).** מפה חלופות $A$ לתגמולים $r(A)$; עם $\sigma(x)=\tfrac1{1+e^{x}}$,

$$\Pr[A_i\succ A_j]=\tfrac{e^{r(A_i)}}{e^{r(A_i)}+e^{r(A_j)}}=\sigma(r(A_j)-r(A_i))$$

(ניגוד: **מנצח קונדורסה** — חלופה המנצחת את כל האחרות — אינו חייב להתקיים, ראה את המחזור-שלישייה $A_1\succ A_2\succ A_3\succ A_1$.)

**Def (RLHF reward-model loss).** למד $r_\phi$ משלשות (פרומפט $x$, מועדף $y$, לא-מועדף $z$): 

$$\min_\phi -E_{x,y,z\sim D}[\log\sigma(r_\phi(x,y)-r_\phi(x,z))]$$

ואז מטב את המדיניות עם רסן KL אל התייחסות:

$$\max_\theta E_{x\sim D,\,y\sim\pi_\theta}[r_\phi(x,y)]-\beta D_{KL}(\pi_\theta(\cdot|x)\,\|\,\pi_{ref}(\cdot|x))$$

## Key theorems & results

**Thm (Behavioral cloning performance).** אם למדיניות המשובטת יש הבטחת PAC — עבור כל מצב $s$, $\Pr[a\ne a^*]\le\epsilon$ בהסתברות $\ge1-\delta$ — אזי לאורך אופק $T$, 

$$V^*(s)-V^\pi(s)\le(T\epsilon+\delta)V_{\max}$$

**Proof idea:** הסתברות טעות לכל צעד $\epsilon$ יכולה להיווצר לאורך $T$ צעדים; הצטברות איחוד/אופק נותנת את האיבר $T\epsilon$, ה-$\delta$ בולע את כשל ההבטחה.

**Exam relevance:** מראה ששגיאת השיבוט גדלה **לינארית באופק** — המניע הסטנדרטי ל-IRL/חניכה על פני שיבוט נאיבי.

**Prop (IRL max-margin LP).** האפיון הנאיבי מאפשר את הפתרון הטריוויאלי $R=0$; פתור את העמימות על ידי מקסום המרווח: $\max\lambda$ בכפוף ל-

$$(P^*-P^a)(I-\gamma P^*)^{-1}R\ge\lambda\ \forall a\ne a^*$$

עם $-R_{\max}\le R\le R_{\max}$. תכנון לינארי פשוט.

**Proof idea:** בחר את התגמול ההופך את $\pi^*$ לאופטימלית באמצעות פער-$Q$ הגדול ביותר האפשרי על פני פעולות תת-אופטימליות.

**Exam relevance:** דע ש-IRL תת-נקבעת (הפתרון הטריוויאלי $R=0$) ושמרווח-מקסימלי / LP הוא התיקון הסטנדרטי.

**Thm (Apprenticeship learning — convergence).** אלגוריתם ייצור-האילוצים (תחזק קבוצת מדיניות $\Pi$; בכל סבב פתור $\max_w\min_{j\in\Pi}w^\top(\mu^*-\mu_j)$ — SVM עם דוגמה חיובית $\mu^*$, שליליות $\mu_j$ — קבל $w_i$, פתור את ה-MDP המושרה $r_i(s)=w_i\cdot\phi(s)$ עבור $\pi_i$, הוסף אותו) מסתיים תוך 

$$O(\tfrac{n}{(1-\gamma)^2\epsilon^2}\log\tfrac{n}{(1-\gamma)\epsilon})$$

 איטרציות, עם סיבוכיות דגימה 

$$m=O(\tfrac{n}{\epsilon^2(1-\gamma)^2}\log\tfrac n\delta)$$

 כדי לאמוד כל $\mu$ עד $\epsilon$.

**Proof idea:** גאומטרי — כל איטרנד מוקרן $\tilde\mu_{i+1}$ מכווץ את המרחק ל-$\mu^*$ בגורם $\tfrac{n}{n+(1-\gamma)^2}$; המדיניות המעורבת בפלט $\mu=\sum_i\alpha_i\mu_i$ (תמיכה $\le n+1$) ממומשת על ידי בחירת $\pi_i$ בהסתברות $\alpha_i$ בהתחלה והרצתה (לא ערבוב בכל צעד).

**Exam relevance:** בניית המדיניות המעורבת ו"תאם תוחלות מאפיינים $\Rightarrow$ תאם ערך עבור כל תגמול" הם הרעיונות הניתנים לבחינה.

**Lem (Geometric lemma, apprenticeship).**

$$\|\mu^*-\tilde\mu_{i+1}\|_2^2\le\tfrac{n}{n+(1-\gamma)^2}\|\mu^*-\bar\mu_i\|_2^2$$

ו-$\tilde\mu_{i+1}$ שוכן בין $\bar\mu_i$ ל-$\mu_{i+1}$ ולכן 

$$\|\mu^*-\tilde\mu_{i+1}\|_2\le\|\mu^*-\bar\mu_i\|_2$$

**Proof idea:** היטל אורתוגונלי של $\mu^*$ על המעטפת האפינית של תוחלות המאפיינים שביקרו בהן מתכווץ מונוטונית.

**Exam relevance:** מקור ספירת האיטרציות; נשאל בשלמותו לעיתים נדירות אך מסביר את ההתכנסות.

**Thm (Relative policy performance identity — basis of PPO).** לכל $\pi_1,\pi_2$:

$$V^{\pi_1}(s_0)-V^{\pi_2}(s_0)=E_{\tau\sim\pi_1}[\sum_t\gamma^t A^{\pi_2}(s_t,a_t)]=\tfrac1{1-\gamma}E_{s\sim d^{\pi_1},a\sim\pi_1}[A^{\pi_2}(s,a)]$$

כאשר $A^{\pi}(s,a)=Q^\pi(s,a)-V^\pi(s)$ ו-

$$d^\pi(s)=(1-\gamma)\sum_t\gamma^t\Pr[s_t=s|\pi]$$

**Proof idea:** טלסקופיה — הצב 

$$A^{\pi_2}=r+\gamma V^{\pi_2}(s')-V^{\pi_2}(s)$$

 והאיברים $\gamma^t V^{\pi_2}$ מתבטלים, ומותירים $V^{\pi_1}(s_0)-V^{\pi_2}(s_0)$.

**Exam relevance:** דגימת חשיבות (importance sampling) ל-$a\sim\pi_2$ בתוספת הקירוב $d^{\pi_1}\approx d^{\pi_2}$ נותנת את התחליף (surrogate) $L_{\pi_2}(\pi_1)$; PPO ממקסם את 

$$L_{\pi_t}(\pi)-\beta E_{s\sim d^{\pi_t}}D_{KL}(\pi_t\|\pi)[s]$$

 (אזור אמון / רסן KL), ומבטיח שיפור מונוטוני מאחר שהחסם הוא $\ge0$ ב-$\pi_1=\pi_2$.

**Thm (DPO — closed-form optimal policy).** מטרת ה-KL-מוסדרת 

$$\max_\theta E_{x,\,y\sim\pi_\theta}[r(x,y)]-\beta D_{KL}(\pi_\theta\|\pi_{ref})$$

 נפתרת על ידי

$$\pi^*(y|x)=\tfrac1{Z(x)}\pi_{ref}(y|x)\exp(\tfrac1\beta r(x,y))$$

$$Z(x)=\sum_y\pi_{ref}(y|x)\exp(\tfrac1\beta r(x,y))$$

היפוך: 

$$r(x,y)=\beta\log\tfrac{\pi^*(y|x)}{\pi_{ref}(y|x)}+\beta\log Z(x)$$

הצבה בתוך הפסד Bradley–Terry מבטלת את $Z(x)$:

$$L_{DPO}(\pi_\theta,\pi_{ref})=-E_{x,y,z\sim D}[\log\sigma(\beta\log\tfrac{\pi_\theta(y|x)}{\pi_{ref}(y|x)}-\beta\log\tfrac{\pi_\theta(z|x)}{\pi_{ref}(z|x)})]$$

**Proof idea:** כתוב מחדש את המטרה כ-

$$\min_\theta E_x[D_{KL}(\pi_\theta\|\pi^*)]-\log Z(x)$$

ה-KL ממוזער ב-$\pi_\theta=\pi^*$; ואז בטא את התגמול המשתמע דרך יחס המדיניות, מה שהורג את $Z(x)$ הבלתי-ניתן-לחישוב בהפסד הזוגי.

**Exam relevance:** הגזירה (ביטול $Z(x)$) היא פריט המבחן בעל הערך הגבוה ביותר ב-RLHF. PPO מול DPO: PPO עובד עבור כל מודל משוב ומניב מודל תגמול הניתן לשימוש חוזר אך הוא דו-שלבי; DPO חד-שלבי, ללא מודל תגמול, אך רק עבור מודלי משוב מסוימים (מסוג Bradley–Terry).

## טכניקות וטריקים

- **התאמת תוחלות מאפיינים:** כדי לחקות עבור *כל* תגמול לינארי, הנע את $\|\mu(\pi^*)-\mu(\pi)\|_2\le\epsilon$; אמוד 

  $$\mu(\pi)\approx\tfrac1m\sum_{i}\sum_t\gamma^t\phi(s_{t,i})$$

   מ-$m$ מסלולים.
- **מרווח מקסימלי לשבירת עמימות IRL:** לכל תנאי עקביות מהצורה (מטריצה)$\cdot R\ge0$ יש את הפתרון הטריוויאלי $R=0$; הוסף $\max\lambda$ עם תקרת נורמה כדי לבחור תגמול לא-מנוון — מצטמצם ל-LP (טבלאי) או SVM (מאפיינים).
- **מימוש מדיניות מעורבת:** דגום $\pi_i$ אחת בהסתברות $\alpha_i$ ב*התחלה* והתחייב אליה; וקטור המאפיינים המצופה שלה הוא $\sum_i\alpha_i\mu_i$ (נבדל מערבוב מחדש בכל צעד).
- **תחליף + אזור אמון KL (PPO):** מקסם את תחליף היתרון (advantage surrogate) תחת אילוץ KL אל המדיניות הישנה; קנס ה-KL שולט בשגיאת הקירוב $d^{\pi_1}\approx d^{\pi_2}$.
- **קיצור הדרך של DPO:** דלג על לימוד התגמול — הצורה הסגורה $\pi^*$ מאפשרת לך לאמן את המדיניות ישירות על העדפות עם ההפסד הלוגיסטי הזוגי חופשי-$Z(x)$.

## נקודות רלוונטיות למבחן

- שגיאת השיבוט היא **$(T\epsilon+\delta)V_{\max}$** — לינארית באופק; הצטברות לאחר טעויות היא החולשה המכונה.
- IRL תת-נקבעת: $R=0$ תמיד "עובד"; LP מרווח-מקסימלי הוא התרופה הסטנדרטית; $\pi^*$ אופטימלית עבור $R$ **אם ורק אם** 

 $$(P^*-P^a)(I-\gamma P^*)^{-1}R\ge0\ \forall a$$

- חניכה: $V^\pi=w^\top\mu(\pi)$, $\|\mu\|_2\le\sqrt n/(1-\gamma)$; התאמת תוחלות מאפיינים $\Rightarrow$ התאמת ערך עבור כל התגמולים.
- Bradley–Terry: $\Pr[A_i\succ A_j]=\sigma(r(A_j)-r(A_i))$ עם $\sigma(x)=1/(1+e^{x})$; בני אדם משווים באופן אמין יותר ממה שהם מדרגים.
- מטרת RLHF = תגמול מצופה $-\beta\,\mathrm{KL}$ אל ההתייחסות; PPO ממטב אותה באמצעות תחליף + KL, DPO פותר אותה בצורה סגורה ומבטל את פונקציית החלוקה $Z(x)$.
- זהות ביצועי המדיניות היחסיים 

  $$V^{\pi_1}-V^{\pi_2}=E_{\tau\sim\pi_1}[\sum_t\gamma^t A^{\pi_2}(s_t,a_t)]$$

   — המשפט היחיד עם הוכחה מלאה (טלסקופיה) בהרצאה זו.
- מסומן **רשות / משקל נמוך** על ידי המרצה; החומר הנוסף של "השבוע הבא" מפורשות אינו במבחן.
