# הרצאה 13 — מודל גנרטיבי; למידה מחיזוקים הפוכה / חניכה (Inverse / Apprenticeship RL)

**File:** materials/lectures/lecture_13_generative_inverse_rl.pdf
**Pillar:** Learning
**Summary:** תכנון עם **מודל גנרטיבי** בלבד (קופסה שחורה: קלט $(s,a)$, פלט $(r,s')$) שעשוי לייצג MDP אקספוננציאלי/אינסופי. בונה הערכת מדיניות במונטה-קרלו, עצי מסלולים, אמידת מדיניות-גרדיאנט לא-מוטה, ואת אלגוריתם **הדגימה הדלילה** (sparse-sampling) למדיניות כמעט-אופטימלית שזמן הריצה שלו אקספוננציאלי ב-$H$ אך **בלתי תלוי ב-$|S|$** (עם חסם תחתון תואם $\Omega(|A|^H)$). המחצית השנייה חוזרת על חומר inverse-RL / חניכה מהרצאה 11 (מאונדקס שם במלואו).

## Outline

- מודל גנרטיבי: הגדרה, מדוע (מצב אקספוננציאלי / אינסופי)
- הערכת מדיניות באמצעות המחולל (החזר קטום, סיבוכיות דגימה)
- עץ מסלולים ועץ רב-מסלולים; הערכת מחלקת מדיניות סופית
- חישוב מדיניות-גרדיאנט לא-מוטה על העץ
- מדיניות כמעט-אופטימלית (דגימה דלילה): מקרה פשוט (תמיכה חסומה) ואז מקרה כללי; ניתוח; חסם תחתון
- Inverse RL / למידת חניכה (חזרה על הרצאה 11)
- סיכום הקורס

## Key definitions

**Def (Generative model).** ייצוג MDP משתמע: קופסה שחורה שבהינתן מצב $s$ ופעולה $a$, מחזירה תגמול $r(s,a)$ ומצב עוקב מדגמי $s'\sim p(\cdot|s,a)$. מטפל במרחבי מצבים גדולים אקספוננציאלית או אינסופיים שבהם טבלת מעברים מפורשת בלתי אפשרית.

**Def (Truncated Monte-Carlo policy evaluation).** מ-$s_0$, גלגל את $\pi$ עבור $t\in[0,H]$ תוך קריאה למחולל, וצור את האומדן הבודד הלא-מוטה $v=\sum_{t=0}^H\gamma^t r_t$ (תקף אפילו למדיניויות תלויות-היסטוריה). מצע $m$ גלגולים בלתי תלויים: 

$$\hat V^\pi(s_0)=\tfrac1m\sum_{i=1}^m v_i$$

עם $V_{\max}=R_{\max}/(1-\gamma)$.

**Def (Trajectory tree).** מבנה נתונים הבנוי מהמחולל המקודד את כל המסלולים עד עומק $H$: בכל צומת, דגום את התוצאה של כל פעולה. עבור **כל** מדיניות $\pi$ הוא מניב הערכה בודדת $T(\pi)$ עם $E_T[T(\pi)]=V^\pi(s_0)$. **העץ הרב-מסלולי** דוגם כל פעולה $m$ פעמים (עומק $H$, דרגה $m|A|$), ונותן $m$ מסלולים בלתי תלויים לכל מדיניות עבור $m$ הערכות.

**Def (Near-optimal policy from a generator — sparse sampling).** אלגוריתם ש, בהינתן המחולל ומצב בלבד, מוציא פעולה — ובכך מגדיר *במשתמע* מדיניות — באמצעות ראייה-קדימה רקורסיבית: `EstimateQ(n,s,a)` דוגם $m$ מצבים עוקבים $s'_{a,i}$ ומחזיר 

$$r(s,a)+\tfrac\gamma m\sum_i\texttt{EstimateV}(n-1,s'_{a,i})$$

`EstimateV(n,s)=`$\max_a$`EstimateQ`; השורש מחזיר $\arg\max_a\texttt{EstimateQ}(H,s_0,a)$.

## Key theorems & results

**Thm (Policy evaluation — accuracy).** עם 

$$m=\tfrac{V_{\max}^2}{\epsilon^2}\log\tfrac1\delta$$

 גלגולים, $|\hat V^\pi(s_0)-V^\pi(s_0)|\le\epsilon$ בהסתברות $\ge1-\delta$.

**Proof idea:** כל $v_i\in[0,V_{\max}]$ לא-מוטה; Hoeffding על הממוצע.

**Exam relevance:** העובדה הבסיסית של "כמה גלגולים"; אומת 

$$V_{\max}=10,\epsilon=0.5,\delta=0.05\Rightarrow m\approx1198$$

**Thm (Finite policy-class evaluation).** עבור $\Pi=\{\pi:S\to A\}$, בנה עץ רב-מסלולי עם 

$$m=\tfrac{V_{\max}^2}{\epsilon^2}\log\tfrac{|\Pi|}\delta$$

אזי 

$$\hat\pi=\arg\max_{\pi\in\Pi}\hat V^\pi(s_0)$$

 מקיים, בהסתברות $\ge1-\delta$, 

$$V^{\pi^*}(s_0)-V^{\hat\pi}(s_0)\le2\epsilon$$

 (כאשר $\pi^*=\arg\max_{\pi\in\Pi}V^\pi$).

**Proof idea:** חסם איחוד על פני $|\Pi|$ מדיניויות (כל אחת בתוך $\epsilon$ בהסתברות $1-\delta/|\Pi|$); ההשוואה נבחר-מול-הטוב-ביותר מפסידה לכל היותר $2\epsilon$.

**Exam relevance:** עץ אחד מעריך את *כל* המדיניויות בו-זמנית — התלות הדגימתית $\log|\Pi|$ ופער הבחירה הסטנדרטי $2\epsilon$.

**Thm (Unbiased policy gradient on the tree).** עבור מחלקה מפורמטרת חלקות $\pi(\cdot;\theta)$, דגימת צומת $s_i\sim P[s_i|d_i]\gamma^{d_i}$ (עומק $d\sim\mathrm{Geom}(1-\gamma)$, כלומר $\Pr[d=\ell]\propto\gamma^\ell$) ו, עבור כל פעולה $a$, דגימת ערך ההמשך $v^2_{i,a}$, האומד 

$$\sum_a v^2_{i,a}\tfrac{\partial p_{s_i,a}}{\partial\theta}$$

 פרופורציוני ל-

$$\tfrac\partial{\partial\theta}T(\pi(\cdot;\theta))$$

 בתוחלת.

**Proof idea:** כלל השרשרת דרך

$$T=\sum_{d,s,a}P[s_i|d](v^1_i+\gamma^d E[v^2_{i,a}])\pi(a|s_i;\theta)$$

רק הערך העתידי $v^2$ תלוי בהסתברויות הפעולה ב-$s_i$.

**Exam relevance:** נותן גרדיאנט לא-מוטה עם $O(H|A|)$ קריאות מחולל בלבד (היה עצלן — אל תבנה את העץ; דגום את המסלול, הסתעף על כל פעולה פעם אחת). מגיע לאופטימום מקומי באמצעות עליית גרדיאנט.

**Thm (Near-optimal policy — main result / sparse sampling).** קיים אלגוריתם המשתמש במודל גנרטיבי המגדיר מדיניות $\pi$ עם $V^*(s)-V^\pi(s)\le\epsilon$ עבור כל $s$. עם $\epsilon\leftarrow\epsilon'(1-\gamma)$, 

$$H=\tfrac1{1-\gamma}\log\tfrac{V_{\max}}{\epsilon'}$$

$$m=\tfrac{V_{\max}^2}{\epsilon'^2}\log\tfrac1\delta=\tfrac1{\epsilon^2(1-\gamma)^2}\log\tfrac1\delta$$

הוא משיג 

$$V^*(s)-V^\pi(s)\le2\epsilon'=\tfrac{2\epsilon}{1-\gamma}$$

**זמן ריצה $O((|A|m)^H)$ — אקספוננציאלי ב-$H$ אך בלתי תלוי ב-$|S|$** (מטפל במרחבי מצבים אינסופיים).

**Proof idea:** שני מקורות שגיאה — מדגם-סופי ($m$ מצבים עוקבים, נשלט ל-$\epsilon$ על ידי Hoeffding) ורקורסיבי; הרקורסיה 

$$\alpha_n\le\gamma(\epsilon+\alpha_{n-1})$$

 עם $\alpha_0=V_{\max}$ נפרשת ל-

$$\alpha_H\le\sum_{i=1}^H\gamma^i\epsilon+\gamma^H V_{\max}\le\tfrac\epsilon{1-\gamma}+\gamma^H V_{\max}$$

וההיוון *מדכא* שגיאות עמוקות יותר ולכן היא מתכנסת.

**Exam relevance:** התוצאה הדגל — זמן ריצה בלתי תלוי בגודל מרחב-המצבים הוא הכותרת; דע את קיטום האופק 

$$H=\Theta(\tfrac1{1-\gamma}\log\tfrac{V_{\max}}{\epsilon'})$$

 ואת רקורסיית השגיאה. אומת: $\gamma=0.99\Rightarrow H=691$, $\alpha_H\approx0.195\le2\epsilon'=0.2$.

**Lem (Q-gap ⇒ value sub-optimality, probabilistic).** אם עבור כל $s$, $\pi(s)$ מבטיחה $Q^*(s,a^*)-Q^*(s,\pi(s))\le\epsilon$ בהסתברות $\ge1-\delta$, אזי 

$$V^*(s)-V^\pi(s)\le\tfrac{\epsilon+2\delta V_{\max}}{1-\gamma}$$

 עבור כל $s$.

**Proof idea:**

$$E[Q^*(s,\pi(s))]\ge(1-\delta)(Q^*(s,a^*)-\epsilon)-\delta V_{\max}\ge Q^*(s,a^*)-(\epsilon+2\delta V_{\max})$$

ואז החל את הטענה הדטרמיניסטית למטה עם $\beta=\epsilon+2\delta V_{\max}$.

**Exam relevance:** ממיר הבטחת פער-פעולה לכל מצב לחסם ערך גלובלי; ההתפוצצות $\tfrac1{1-\gamma}$ היא האיבר המרכזי.

**Claim (Q-gap ⇒ value sub-optimality, deterministic).** אם $Q^*(s,a^*)-Q^*(s,\pi(s))\le\beta$ עבור כל $s$, אזי $V^*(s)-V^\pi(s)\le\tfrac\beta{1-\gamma}$.

**Proof idea:** יהי $\pi_i$ מריץ את $\pi$ עבור $i$ צעדים ואז $\pi^*$; 

$$V^{\pi_i}(s)-V^{\pi_{i+1}}(s)\le\gamma^i\beta$$

 ($i$ הצעדים הראשונים זהים), סכום 

$$\sum_i\gamma^i\beta=\tfrac\beta{1-\gamma}$$

**Exam relevance:** טיעון "סטיית צעד יחיד, טלסקופיה" הניתן לשימוש חוזר — מופיע לאורך הוכחות תכנון.

**Thm (Lower bound).** כל אלגוריתם המשתמש במודל גנרטיבי זקוק ללפחות $\tfrac12|A|^H$ שאילתות בתוחלת כדי למצוא פעולה כמעט-אופטימלית.

**Proof idea:** עץ מלא בדרגה $|A|$ ובעומק $H$, כל התגמולים אפס פרט לעלה אחד הממוקם אחיד באקראי; מציאתו דורשת בדיקה של שבר קבוע מ-$|A|^H$ העלים.

**Exam relevance:** מראה שהעלות האקספוננציאלית-ב-$H$ מובנית — אינך יכול להימנע ממנה, רק אי-התלות ב-$|S|$ היא הרווח.

## טכניקות וטריקים

- **עץ אחד, כל המדיניויות:** עץ (רב-)מסלולי הנבנה פעם אחת מעריך כל מדיניות; העלות מתמסחרת עם $\log|\Pi|$, לא עם $|S|$.
- **קיטום אופק:** החלף את האופק האינסופי ב- 

  $$H=\tfrac1{1-\gamma}\log\tfrac{V_{\max}}{\epsilon'}$$

הזנב $\gamma^H V_{\max}\le\epsilon'$ זניח.
- **רקורסיית שגיאה עם היוון:** 

  $$\alpha_n\le\gamma(\epsilon+\alpha_{n-1})$$

   — משום שכל רקורסיה מכפילה ב-$\gamma<1$, שגיאות מרמות עמוקות יותר מדוכאות, ולכן האמידה הרקורסיבית מתכנסת אפילו שאתה "פותר יותר תת-בעיות."
- **דגימה עצלה עבור גרדיאנטים:** לעולם אל תממש את העץ; דגום עומק $d\sim\mathrm{Geom}(1-\gamma)$, עקוב אחר $\pi$ עד צומת $s_i$, הסתעף פעם אחת לכל פעולה, דגום המשכים — $O(H|A|)$ קריאות מחולל לכל דגימת גרדיאנט לא-מוטה.
- **מקרה מיוחד של תמיכה חסומה:** אם $|\{s':p(s'|s,a)>0\}|\le d$, הקבוצה הישיגה היא $\approx(dA)^H$; המקרה הכללי משמיט זאת באמצעות קירוב שכנות של עץ-מסלולים.

## נקודות רלוונטיות למבחן

- מודל גנרטיבי = קופסה שחורה $(s,a)\mapsto(r,s')$; מאפשר תכנון ב-MDP אקספוננציאלי/אינסופי.
- הערכת מדיניות: 

  $$m=\tfrac{V_{\max}^2}{\epsilon^2}\log\tfrac1\delta$$

   גלגולים $\Rightarrow$ מדויק עד $\epsilon$ בהסתברות $1-\delta$; מחלקה סופית $\Rightarrow$ תוספת $\log|\Pi|$ ופער בחירה $2\epsilon$.
- **כותרת הדגימה הדלילה:** מדיניות כמעט-אופטימלית בזמן $O((|A|m)^H)$ — אקספוננציאלי ב-$H$, **בלתי תלוי ב-$|S|$**; אופק 

 $$H=\Theta(\tfrac1{1-\gamma}\log\tfrac{V_{\max}}\epsilon)$$

- רקורסיית שגיאה 

  $$\alpha_H\le\tfrac\epsilon{1-\gamma}+\gamma^H V_{\max}$$

ההבטחה הסופית 

 $$V^*-V^\pi\le\tfrac{2\epsilon}{1-\gamma}$$

- שתי למות ניתנות לשימוש חוזר: פער-$Q$ $\beta$ (דטרמיניסטי) 

  $$\Rightarrow V^*-V^\pi\le\tfrac\beta{1-\gamma}$$

הגרסה ההסתברותית מוסיפה $2\delta V_{\max}$ בפנים.
- חסם תחתון $\Omega(|A|^H)$ שאילתות מחולל — התלות האקספוננציאלית ב-$H$ בלתי נמנעת.
- המחצית השנייה של inverse-RL / חניכה משכפלת את הרצאה 11 (חסם behavioral cloning $(T\epsilon+\delta)V_{\max}$, אפיון תגמול טבלאי, חניכה במאפיינים לינאריים, למה גאומטרית) — ראה `lecture_11_inverse_rl_rlhf.md`.
