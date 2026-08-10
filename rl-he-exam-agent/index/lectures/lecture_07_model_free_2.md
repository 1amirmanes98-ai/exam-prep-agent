# הרצאה 07 — למידה חסרת-מודל (2): TD(0), TD(λ), SARSA(λ), דגימת חשיבות, שחקן-מבקר

**File:** materials/lectures/lecture_07_model_free_2.pdf
**Pillar:** Learning
**Summary:** מפתחת למידת הפרש-זמני (temporal-difference) — TD(0), החזרים בני $n$ צעדים, TD($\lambda$) עם עקבות זכאות (מבט קדימה = מבט אחורה) ו-SARSA($\lambda$) — בתוספת דגימת חשיבות להערכה מחוץ-למדיניות (off-policy) ותבנית השחקן-מבקר. מרכזי למבחן: הכר את משוואות העדכון המדויקות, את הניגוד בין TD המוטה-דרך-bootstrap לבין MC הבלתי-מוטה בעל השונות הגבוהה, ואת נסיגת עקבת הזכאות.

## Outline

- סיכום מדיניות-פנימית (on-policy) מול מחוץ-למדיניות (off-policy); מוטיבציה, אלגוריתם, התכנסות של TD(0), ונקודת השבת שלו במודל האמפירי.
- הסתכלות רב-צעדית קדימה (החזרים בני $n$ צעדים) ו-TD($\lambda$): מבט קדימה (מיצוע מעריכי של החזרים בני $n$ צעדים) ומבט אחורה (עקבות זכאות); שקילותם.
- SARSA($\lambda$): צורות בנות $n$ צעדים ועקבות זכאות.
- דגימת חשיבות: מדיניות התנהגותית $\pi$ מול מדיניות מוערכת $\rho$; וריאנטים של MC ו-TD; השוואת שונות.
- מתודולוגיית שחקן-מבקר (המבקר מעריך, השחקן משפר).

## Key definitions

**Def (On-policy vs off-policy).** מדיניות-פנימית (on-policy): מדיניות יחידה גם *בוחרת פעולות* וגם *מתעדכנת* (למשל SARSA). מחוץ-למדיניות (off-policy): מדיניות *התנהגותית* בוחרת פעולות (ומתעדת אותן) בעוד העדכונים מכוונים למדיניות *אמונה-נוכחית* שונה (למשל Q-learning). off-policy מפריד בין הפעולה לבין הלמידה.

**Def (TD(0) update).** מתחזקים $\hat V$; מתוך $(s_t,a_t,r_t,s_{t+1})$, 

$$\hat V(s_t)\leftarrow(1-\alpha_t)\hat V(s_t)+\alpha_t\bigl[r_t+\gamma\hat V(s_{t+1})\bigr]=\hat V(s_t)+\alpha_t\Delta_t$$

עם שגיאת ה-TD 

$$\Delta_t=r_t+\gamma\hat V(s_{t+1})-\hat V(s_t)$$

מבצע bootstrap על ההערכה הנוכחית $\hat V(s_{t+1})$ ומעדכן *לפני* סיום האפיזודה.

**Def ($n$-step return / look-ahead).** 

$$R_t^{(n)}(s_t)=\sum_{i=0}^{n-1}\gamma^i r_{t+i}+\gamma^n\hat V(s_{t+n})$$

עדכון 

$$\hat V(s_t)\leftarrow\hat V(s_t)+\alpha_t\Delta_t^{(n)}$$

 עם 

$$\Delta_t^{(n)}=R_t^{(n)}(s_t)-\hat V(s_t)=\sum_{i=0}^{n-1}\gamma^i\Delta_{t+i}$$

 (סכום טלסקופי של שגיאות TD בנות צעד אחד). $n=1$ הוא TD(0); $n=\infty$ הוא מונטה-קרלו.

**Def (TD($\lambda$) forward view).** מִצוע מעריכי של כל ההחזרים בני $n$ צעדים עם משקל $(1-\lambda)\lambda^{n-1}$ על ההחזר בן $n$ הצעדים: 

$$\hat V(s_t)\leftarrow\hat V(s_t)+\alpha_t(1-\lambda)\sum_{n=1}^{\infty}\lambda^{n-1}\Delta_t^{(n)}=\hat V(s_t)+\alpha_t\sum_{i=0}^{\infty}(\lambda\gamma)^{i}\Delta_{t+i}$$

אל תבלבל בין $\gamma$ (היוון) לבין $\lambda$ (דעיכת העקבה). דורש ידיעת תגמולים עתידיים, ולכן הוא לא-מקוון/מסתכל-קדימה.

**Def (Eligibility trace / TD($\lambda$) backward view).** 

$$e_t(s)=\sum_{\tau=0}^{t}(\gamma\lambda)^{t-\tau}I(s_\tau=s)$$

המחושב באופן מקוון על-ידי 

$$e_t(s)=\gamma\lambda\,e_{t-1}(s)+I(s_t=s)$$

 (אתחול $e_0(s)=0$). מעדכנים כל מצב בכל צעד: 

$$\hat V_{t+1}(s)=\hat V_t(s)+\alpha_t e_t(s)\Delta_t$$

 עם 

$$\Delta_t=r_t+\gamma\hat V_t(s_{t+1})-\hat V_t(s_t)$$

TD(0) הוא המקרה הפרטי $e_t(s)=I(s_t=s)$.

**Def (SARSA $n$-step and SARSA($\lambda$)).** בן $n$ צעדים: 

$$q_t^{(n)}=\sum_{i=0}^{n-1}\gamma^i r(s_{t+i},a_{t+i})+\gamma^n Q_t(s_{t+n},a_{t+n})$$

עדכון 

$$Q_{t+1}(s_t,a_t)=Q_t(s_t,a_t)+\alpha_t(q_t^{(n)}-Q_t(s_t,a_t))$$

המבט קדימה משתמש ב-

$$q_t^{\lambda}=(1-\lambda)\sum_{n\ge1}\lambda^{n-1}q_t^{(n)}$$

המבט אחורה משתמש בעקבות מצב-פעולה 

$$e_t(s,a)=\gamma\lambda\,e_{t-1}(s,a)+I(s_t=s,a_t=a)$$

$$\Delta_t=r_t+\gamma Q_t(s_{t+1},a_{t+1})-Q_t(s_t,a_t)$$

$$Q_{t+1}(s,a)=Q_t(s,a)+\alpha_t\Delta_t e_t(s,a)$$

**Def (Importance sampling).** אומדים תוחלת תחת $P$ באמצעות דגימות מתוך $Q$: 

$$\mathbb{E}_{X\sim P}[f(X)]=\sum_x P(x)f(x)=\sum_x Q(x)\tfrac{P(x)}{Q(x)}f(x)=\mathbb{E}_{X\sim Q}\!\bigl[\tfrac{P(X)}{Q(X)}f(X)\bigr]$$

בלתי-מוטה; השונות עלולה להיות עצומה בהתאם ליחס $P(x)/Q(x)$.

**Def (Importance-sampling MC, off-policy).** מדיניות התנהגותית (בחירת-פעולות) $\pi$, מדיניות מוערכת $\rho$. גורמי המעבר/התגמול מצטמצמים ומתבטלים, ונותרת מכפלת יחסי-המדיניות 

$$G_{\rho/\pi}=\Bigl(\prod_{t=1}^{T}\tfrac{\rho(a_t\mid s_t)}{\pi(a_t\mid s_t)}\Bigr)\bigl(\sum_{t=1}^{T}r_t\bigr)$$

עדכון 

$$\hat V^\rho(s_1)\leftarrow\hat V^\rho(s_1)+\alpha(G_{\rho/\pi}-\hat V^\rho(s_1))$$

עלול לתת עדכונים עצומים (מכפלה על-פני כל המסלול).

**Def (Importance-sampling TD, off-policy).** משקללים מחדש צעד אחד בלבד: 

$$\Delta_t=\tfrac{\rho(a_t\mid s_t)}{\pi(a_t\mid s_t)}\bigl[r_t+\gamma\hat V^\rho(s_{t+1})\bigr]-\hat V^\rho(s_t)$$

שונות קטנה בהרבה ממכפלת ה-MC (יחס בן-צעד-יחיד, לא מכפלה על-פני $T$).

**Def (Actor-Critic).** תבנית המפרידה בין *הערכה* לבין *שיפור*. מבקר (Critic): קלט מצב + תגמול, מעריך את המדיניות הנוכחית (שיטה: TD / MC / Q-learning). שחקן (Actor): קלט מצב + ערך, משפר את המדיניות לכיוון כמעט-חמדני (שיטה: $\epsilon$-חמדני / soft-max / SARSA).

## Key theorems & results

**Thm (TD(0) convergence w.p. 1 — Robbins–Monro).** עם גדלי-צעד המקיימים, לכל $(s,a)$, $\sum_t\alpha_t(s,a)=\infty$ ו-$\sum_t\alpha_t^2(s,a)<\infty$, מתקיים $V_t(s)\to V^\pi(s)$ בהסתברות 1.

**רעיון ההוכחה:** כותבים מחדש 

$$V_{t+1}(s_t)=(1-\alpha_t)V_t(s_t)+\alpha_t\Phi_t$$

$\Phi_t=r_t+\gamma V_t(s_{t+1})$; $\mathbb{E}[\Phi_t]=(HV_t)(s_t)$, לרעש $w_t$ מתקיים $\mathbb{E}[w_t]=0$, $|w_t|\le R_{\max}/(1-\gamma)$; מפעילים קירוב סטוכסטי עם אופרטור הערכת-המדיניות $H$. אותו שלד כמו ב-Q-learning.

**רלוונטיות למבחן:** תנאי גדלי-הצעד הזהים והרדוקציה לקירוב סטוכסטי הם מטרות מבחן מובהקות; דע ש-TD מעריך $\pi$ *קבועה* (בשונה מה-$\max$ של Q-learning).

**Thm (TD(0) policy-evaluation operator is a $\gamma$-contraction).** עבור $\pi$ קבועה, 

$$(Hv)(s)=r(s,a)+\gamma\sum_{s'}p(s'\mid s,a)v(s')$$

 ($a=\pi(s)$) מקיים 

$$\|Hv_1-Hv_2\|_\infty\le\gamma\|v_1-v_2\|_\infty$$

נקודת שבת $V^\pi$.

**רעיון ההוכחה:** מוציאים את $\gamma$ כגורם משותף, וחוסמים את ההפרש הממוצע-על-מעברים במקסימום שלו.

**רלוונטיות למבחן:** הכיווץ שמאפשר את הפעלת הקירוב הסטוכסטי; שים לב שאין כאן $\max$ (אופרטור לינארי) ולכן זה אף פשוט יותר מה-Q-learning.

**Thm (TD(0) fixed point = empirical/maximum-likelihood model).** הרצת TD(0) עד התכנסות באמצעות דגימה חוזרת מתוך מדגם קבוע נותנת $\hat V^\pi$ השווה ל-$V^\pi$ במודל האמפירי (= נראות-מרבית) $\hat r(s,a)=\tfrac1{n(s,a)}\sum r_t$, $\hat p(s'\mid s,a)=n(s,a,s')/n(s,a)$.

**רעיון ההוכחה:** בהתכנסות $\mathbb{E}[\Delta_t]=0$, ולכן 

$$\hat V(s)=\hat r(s,a)+\gamma\mathbb{E}_{s'\sim\hat p}[\hat V(s')]$$

 — בדיוק משוואת בלמן של המודל האמפירי.

**רלוונטיות למבחן:** השווה ל-MC (הרצאה 06), המשתמש במודל האמפירי *המצומצם*; TD משתמש במודל האמפירי *המלא* — הבחנה קלאסית במבחנים (למשל דוגמת שרשרת A,B,C,D).

**Thm ($n$-step return operator is $\gamma^n$-contracting).** 

$$R_t^{(n)}v[s]=\mathbb{E}_\pi\bigl[\sum_{i=0}^{n-1}\gamma^i r_{t+i}+\gamma^n v(s_{t+n})\mid s\bigr]$$

 מקיים 

$$\|R_t^{(n)}v_1-R_t^{(n)}v_2\|\le\gamma^n\|v_1-v_2\|_\infty$$

**רעיון ההוכחה:** רק איבר ה-bootstrap $\gamma^n v(s_{t+n})$ תלוי ב-$v$; $n$ התגמולים המהוונים מתבטלים.

**רלוונטיות למבחן:** $n$ גדול יותר מכווץ מהר יותר ($\gamma^n$) אך בעל שונות גבוהה יותר — כפתור ההטיה/שונות ש-TD($\lambda$) ממצע עליו.

**Thm (TD($\lambda$) forward = backward view).** 

$$\sum_{t=0}^{\infty}\Delta V_t^{B}(s)=\sum_{t=0}^{\infty}\Delta V_t^{F}(s)\,I(s_t=s)$$

כלומר סך העדכון המקוון (מבט אחורה, עקבת-זכאות) שווה לסך עדכון המבט-קדימה (החזר-$\lambda$) על-פני אפיזודה.

**רעיון ההוכחה:** מפתחים את שני האגפים; קדימה 

$$\sum_t\alpha(1-\lambda)\sum_{n\ge t}\lambda^{n-t}\Delta_t^{(n)}I(s=s_t)$$

 ואחורה 

$$\sum_t\alpha\Delta_t(s)\sum_{n\le t}(\gamma\lambda)^{t-n}I(s=s_n)$$

 הם אותו סכום כפול עם החלפת התפקידים של $n$ ו-$t$.

**רלוונטיות למבחן:** מצדיק את האלגוריתם המקוון המעשי; דע לומר שהשקילות מתקיימת *בסוף האפיזודה*.

**Thm (Importance sampling is unbiased).** 

$$\mathbb{E}_{X\sim Q}\bigl[\tfrac{P(X)}{Q(X)}f(X)\bigr]=\mathbb{E}_{X\sim P}[f(X)]$$

 בדיוק, בתנאי ש-$Q(x)>0$ בכל מקום שבו $P(x)f(x)\neq0$.

**רעיון ההוכחה:** היחס $P/Q$ מבטל את שינוי המידה בסכום.

**רלוונטיות למבחן:** הערכה מחוץ-למדיניות היא בלתי-מוטה, אך ה*שונות* (דרך $\prod\rho/\pi$ עבור MC) היא הנקודה האמיתית במבחן — השקלול הבן-צעד-יחיד של TD הוא בעל שונות נמוכה בהרבה.

## טכניקות וטריקים

- **TD(0) ביד:** לכל $(s_t,r_t,s_{t+1})$ הפעל 

  $$\hat V(s_t)\!\leftarrow\!\hat V(s_t)+\alpha[r_t+\gamma\hat V(s_{t+1})-\hat V(s_t)]$$

כדי לקבל את *נקודת השבת* על מדגם קבוע, פתור $\mathbb{E}[\Delta]=0$ לכל מצב.
- **TD מול MC על שרשרת A,B,C,D (מאומת):** אפיזודות 

  $$(A,0,B,0,C)\times1,\ (B,1,D)\times6,\ (B,0,C)\times1$$

MC: 

  $$\hat V(B)=\tfrac{1\cdot6+0\cdot2}{8}=0.75$$

$\hat V(A)=0$ (A נצפה פעם אחת, החזר 0). נקודת השבת של TD: $\hat V(B)$ פותר 

  $$\tfrac68(1-\hat V_B)+\tfrac28(0-\hat V_B)=0\Rightarrow\hat V(B)=0.75$$

ו-$\hat V(A)=\gamma\hat V(B)=0.75\gamma$ (TD מפיץ $A\to B$ דרך המודל; MC אינו עושה זאת מכיוון שההחזר היחיד של $A$ היה 0).
- **נסיגת עקבת הזכאות:** נשא 

  $$e(s)\leftarrow\gamma\lambda\,e(s)+I(s_t=s)$$

   לכל מצב, ואז עדכן את כל המצבים ב-$\alpha e(s)\Delta_t$ בכל צעד. מצבים אחרונים/תכופים מקבלים עקבות גדולות יותר.
- **בחירת עומק ההסתכלות קדימה:** $n=1$ (TD, שונות נמוכה, מוטה/איטי) עד $n=\infty$ (MC, בלתי-מוטה, שונות גבוהה); $\lambda$ מבצע אינטרפולציה חלקה ויכול לנצח את שניהם. אם האפיזודה מסתיימת לפני $n$ צעדים, רפד באפסים.
- **שקלול מחוץ-למדיניות:** MC מכפיל את יחס כל-המסלול $\prod_t\rho(a_t|s_t)/\pi(a_t|s_t)$; TD מכפיל רק את היחס הבן-צעד-יחיד $\rho(a_t|s_t)/\pi(a_t|s_t)$ — העדף TD כאשר האופק ארוך.
- **הרכבת שחקן-מבקר:** חבר כל מבקר (MC/TD/Q-learning) לכל שחקן ($\epsilon$-חמדני/soft-max/SARSA) — מתכון להרכבת אלגוריתמים.

## נקודות רלוונטיות למבחן

- **ניגוד הטיה/שונות (הכותרת הראשית):** TD מבצע *bootstrap* על ההערכה שלו עצמו, ולכן הוא *מוטה* אך *בעל שונות נמוכה* ומתעדכן מקוון מאפיזודות בלתי-שלמות; MC הוא *בלתי-מוטה* (ביקור-ראשון) אך *בעל שונות גבוהה* ומתעדכן רק בסוף האפיזודה. TD($\lambda$)/בני $n$ צעדים מבצעים אינטרפולציה.
- **שלושה מבטים על $V^\pi(s)$:** MC 

  $$=\mathbb{E}_\pi[\sum_{i\ge t}r_i\mid s_t=s]$$

TD(0) 

  $$=\mathbb{E}_\pi[r(s,a)+\gamma V^\pi(s')\mid \dots]$$

   (bootstrap בן-צעד, נדגם); DP 

  $$=\sum_a\pi(a|s)[r(s,a)+\gamma\sum_{s'}p(s'|s,a)V^\pi(s')]$$

   (תוחלת מלאה, דורש מודל).
- **TD משתמש במודל האמפירי המלא; MC משתמש במודל האמפירי המצומצם** — הסיבה ש-TD יכול להקצות ערך שונה מאפס למצב שכל ההחזרים שנדגמו עבורו היו אפס (דוגמת צומת A).
- **דוגמת קצב-התכנסות:** כדי להגיע ל- 

  $$|\hat V(s_2)-\tfrac\gamma2|\approx\epsilon$$

MC זקוק ל-$\sim\tfrac1{\beta\epsilon^2}$ ו-TD(0) זקוק ל-$\sim\tfrac1{\epsilon^2}+\tfrac1\beta$ — TD מנצח כאשר הסתברות המאורע הנדיר $\beta$ קטנה.
- **דגימת חשיבות היא תמיד בלתי-מוטה; השונות היא הרוצחת.** שונות ה-MC מחוץ-למדיניות מתפוצצת כ-$\prod\rho/\pi$ (למשל הסתברות $1/2^T$, משקל $2^T$); TD מחוץ-למדיניות משקלל לכל צעד (הסתברות $\tfrac12$, משקל $2$) — קטנה בהרבה.
- **$\gamma$ מול $\lambda$:** $\gamma$ מהוון את *התגמול העתידי*; $\lambda$ מדעיך את *הזכאות/המיצוע* על-פני עומקי ההסתכלות קדימה. הם מוכפלים כ-$(\gamma\lambda)$ בעקבה.
- **מבט קדימה = מבט אחורה מתקיים על-פני כל האפיזודה**, ומעניק ל-TD($\lambda$) מימוש מקוון מדויק באמצעות עקבות זכאות.
