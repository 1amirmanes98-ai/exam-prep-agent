# הרצאה 06 — למידה חסרת-מודל (1): Q-learning, ‏SARSA, ‏Monte-Carlo

**File:** materials/lectures/lecture_06_model_free_1.pdf
**Pillar:** Learning
**Summary:** מציגה בקרה חסרת-מודל מדגימות — אלגוריתם Q-learning (off-policy), ‏SARSA (on-policy), והערכת Monte-Carlo — יחד עם מנגנון הקירוב הסטוכסטי / Robbins–Monro שמוכיח את התכנסותם. זוהי הרצאת ה"למידה" המרכזית של המבחן: יש לזכור את כללי העדכון המדויקים, את תנאי גודל-הצעד $\sum\alpha_t=\infty,\ \sum\alpha_t^2<\infty$, ואת סיפור ההטיה של ביקור-ראשון מול כל-ביקור.

## Outline

- קירוב מקוון של ממוצע (ממוצע אינקרמנטלי, ממוצע מעריכי) וריכוז McDiarmid.
- Q-learning: מוטיבציה off-policy; גרסת DP דטרמיניסטי; גרסת MDP; התכנסות דרך קירוב סטוכסטי; בחירות גודל-צעד.
- SARSA: בקרה on-policy; חקירה ($\epsilon$-חמדנית, ‏soft-max); התכנסות $Q_t$ וההחזר.
- Monte-Carlo: מתודולוגיה, ביקור-ראשון מול כל-ביקור, הקשר למודל הנראות-המרבית, בקרת MC.

## Key definitions

**Def (Incremental / online mean).** עבור תגמולים $r_1,\dots,r_T$ הממוצע האצווה $\hat\mu_T=\frac1T\sum_{t=1}^T r_t$ בעל הצורה המקוונת 

$$\hat\mu_T=\hat\mu_{T-1}+\frac1T\bigl(r_T-\hat\mu_{T-1}\bigr)$$

החלפת $\frac1T$ בגודל-צעד כללי $\alpha_T$ נותנת את הממוצע המעריכי (ממושקל-לפי-עדכניות)

$$\hat\mu_T=\hat\mu_{T-1}+\alpha_T(r_T-\hat\mu_{T-1})=\sum_{t=1}^T\beta_t r_t$$

עם 

$$\beta_t=\alpha_t\prod_{i=t+1}^T(1-\alpha_i)$$

**Def (Off-policy learning).** הדגימות $(s_t,a_t,r_t,s_{t+1})$ נוצרות על ידי מדיניות *התנהגותית* (חוקרת) כלשהי, בעוד האלגוריתם לומד על מדיניות *מטרה* אחרת (החמדנית/אופטימלית). דרישה: כל $(s,a)$ מבוצע אינסוף פעמים.

**Def (Optimal Q-function).**

$$Q^*(s,a)=r(s,a)+\gamma\,\mathbb{E}_{s'\sim p(\cdot\mid s,a)}\bigl[\max_{a'}Q^*(s',a')\bigr]$$

$Q^*$ מגדיר את המדיניות האופטימלית דרך $\pi^*(s)\in\arg\max_a Q^*(s,a)$.

**Def (Q-learning update, MDP).** מתוך $(s_t,a_t,r_t,s_{t+1})$: 

$$Q_{t+1}(s_t,a_t)=Q_t(s_t,a_t)+\alpha_t(s_t,a_t)\,\Gamma_t$$

עם ההפרש הזמני

$$\Gamma_t=r_t+\gamma\max_a Q_t(s_{t+1},a)-Q_t(s_t,a_t)$$

במקרה הפרטי של DP דטרמיניסטי (גודל-צעד $=1$) זה מתמוטט ל-

$$Q_{t+1}(s_t,a_t)=r_t+\gamma\max_a Q_t(s_{t+1},a)$$

Off-policy: ה-$\max_a$ משתמש במטרה החמדנית, בלתי-תלוי בפעולה שבוצעה בפועל.

**Def (SARSA update, on-policy).** מתוך $(s_t,a_t,r_t,s_{t+1},a_{t+1})$ עם $a_{t+1}=\pi(s_{t+1};Q_t)$ הנבחרת על ידי *אותה* מדיניות שנלמדת: 

$$Q_{t+1}(s_t,a_t)=Q_t(s_t,a_t)+\alpha_t(s_t,a_t)\,\Gamma_t$$

$$\ \Gamma_t=r_t+\gamma\,Q_t(s_{t+1},a_{t+1})-Q_t(s_t,a_t)$$

ההבדל מ-Q-learning: SARSA מבצע bootstrap על הפעולה הבאה *שנבחרה בפועל* $a_{t+1}$ (ללא $\max$).

**Def ($\epsilon$-greedy exploration).** עם $\bar a\in\arg\max_a Q_t(s,a)$: משחקים $\bar a$ בהסתברות $1-\epsilon_t$, וכל $a\in A$ בהסתברות $\epsilon_t/|A|$. לוחות זמנים אופייניים $\epsilon_t=1/t$ או $\epsilon_t=1/t^\theta$ (חייבים לדעוך כדי להמשיך לחקור אך להיעשות חמדניים בגבול).

**Def (Soft-max / Boltzmann exploration).** $\pi(s;Q_t)=a$ בהסתברות 

$$\dfrac{e^{\beta_t Q_t(s,a)}}{\sum_{a'\in A}e^{\beta_t Q_t(s,a')}}$$

הטמפרטורה ההפוכה $\beta_t\to\infty$ באיטיות כאשר $t\to\infty$.

**Def (Monte-Carlo value estimate).** לומדים $V^\pi$ מאפיזודות שלמות $s_1,a_1,r_1,\dots,s_k,a_k,r_k$ הנוצרות על ידי $\pi$. עם החזרים $G_1(s),\dots,G_m(s)$, 

$$\hat V^\pi(s)=\frac1m\sum_{i=1}^m G_i(s)$$

בעיקר עבור MDP-ים אפיזודיים.

**Def (First-visit MC).** לכל מצב $s_j$ באפיזודה, משתמשים רק ב*הופעה הראשונה* שלו (נניח הצעד ה-$m$): $G_i(s_j)=\sum_{l=m}^k r_l$; מעדכנים את $\hat V^\pi(s_j)$ פעם אחת. אומד חסר-הטיה.

**Def (Every-visit MC).** מעדכנים את $\hat V^\pi(s_j)$ ב*כל* הופעה של $s_j$ (החזר-סיומת אחד לכל הופעה). עדכונים מרובים בתוך אפיזודה מתואמים; האומד מוטה.

**Def (Stochastic approximation, well-behaved $(B,\gamma)$).** האיטרציה

$$X_{t+1}(s)=(1-\alpha_t(s))X_t(s)+\alpha_t(s)\bigl[(HX_t)(s)+w_t(s)\bigr]$$

מתנהגת-היטב אם: (i) גודל-הצעד $\sum_t\alpha_t(s)=\infty$ ו-$\sum_t\alpha_t^2(s)<\infty$; (ii) הרעש $\mathbb{E}[w_t(s)]=0$ ו-$|w_t(s)|\le B$; (iii) $H$ הוא $\gamma$-כיווץ ב-$\|\cdot\|_\infty$ עם נקודה שבת $X^*$ ($HX^*=X^*$).

## Key theorems & results

**Thm (Q-learning, deterministic DP, convergence).** אם כל $(s,a)$ מופיע אינסוף פעמים, אז $\lim_{t\to\infty}Q_t(s,a)=Q^*(s,a)$.

**רעיון ההוכחה:** יהי $\Delta_t=\|Q_t-Q^*\|_\infty$. בשימוש ב-

$$|\max_a f_a-\max_b g_b|\le\max_a|f_a-g_a|$$

מראים ש-

$$|Q_{t+1}(s_t,a_t)-Q^*(s_t,a_t)|\le\gamma\Delta_t$$

ברגע שכל $(s,a)$ עודכן לפחות פעם אחת על פני $[t,t_1]$, $\Delta_{t_1}\le\gamma\Delta_t$, ולכן $\Delta_t\to0$.

**רלוונטיות למבחן:** שאלת "הוכח ש-Q-learning מתכנס" הקאנונית; צעד הכיווץ-ב-$\gamma$ ואינטואיציית ההתכנסות-לפי-מרחק של המסלול-הקצר-ביותר נשאלים לעיתים קרובות.

**Thm (Q-learning, MDP, convergence w.p. 1 — Robbins–Monro).** אם כל $(s,a)$ מבוצע אינסוף פעמים, ולכל $(s,a)$ גדלי הצעד מקיימים $\sum_t\alpha_t(s,a)=\infty$ ו-$\sum_t\alpha_t^2(s,a)<\infty$, אז $Q_t(s,a)\to Q^*(s,a)$ בהסתברות 1.

**רעיון ההוכחה:** כותבים את העדכון כ-$Q_{t+1}=(1-\alpha_t)Q_t+\alpha_t\Phi_t$ עם $\Phi_t=r_t+\gamma\max_a Q_t(s_{t+1},a)$; אז $\mathbb{E}[\Phi_t]=(HQ_t)(s_t,a_t)$ והרעש $w_t=\Phi_t-(HQ_t)(s_t,a_t)$ מקיים $\mathbb{E}[w_t]=0$, $|w_t|\le V_{\max}=R_{\max}/(1-\gamma)$. מיישמים את משפט הקירוב הסטוכסטי עם ה-$\gamma$-כיווץ $H$.

**רלוונטיות למבחן:** שני תנאי גודל-הצעד הם הפרט הנבחן ביותר; יש לדעת מדוע $\sum\alpha_t=\infty$ (להגיע למטרה) ו-$\sum\alpha_t^2<\infty$ (לחסל את הרעש) נחוצים שניהם.

**Thm (Q-learning Bellman operator is a $\gamma$-contraction).**

$$(Hq)(s,a)=\sum_{s'}p(s'\mid s,a)\bigl[r(s,a)+\gamma\max_{b\in A}q(s',b)\bigr]$$

מקיים 

$$\|Hq_1-Hq_2\|_\infty\le\gamma\|q_1-q_2\|_\infty$$

עם נקודה שבת יחידה $Q^*$.

**רעיון ההוכחה:** מוציאים את ה-$\gamma$, חוסמים 

$$|\max_b q_1-\max_b q_2|\le\max_b|q_1-q_2|$$

ממצעים על $s'$.

**רלוונטיות למבחן:** הכיווץ הוא ההנחה שמאפשרת לקירוב הסטוכסטי לחול; נשאל לעיתים קרובות כלמה עצמאית.

**Thm (Stochastic approximation convergence).** אם $X_t$ נוצר על ידי איטרציה מתנהגת-היטב $(B,\gamma)$, אז $X_t\to X^*$ בהסתברות 1.

**רעיון ההוכחה:** מפצלים את השגיאה לחלק דטרמיניסטי המונע על ידי $H$ שמתכווץ ב-$\gamma$ לכל שלב, וחלק רעש חסר-תוחלת חסום דרך טיעון חוק המספרים הגדולים; על פני שלב

$$D_{t+1}\le\gamma D_t+\tfrac12(1-\gamma)D_t=\tfrac12(1+\gamma)D_t=(1-\beta)D_t$$

**רלוונטיות למבחן:** משפט-המטריה שמאחורי Q-learning, ‏SARSA, ו-TD(0); מצטטים אותו במקום להוכיח כל אחד מחדש.

**Thm (SARSA $\epsilon$-greedy converges to $Q^{*,\epsilon}$).** SARSA עם מדיניות $\epsilon$-חמדנית קבועה מתכנס לנקודה השבת $Q^{*,\epsilon}$ של האופרטור ה-$\gamma$-מכווץ

$$(T^{*,\epsilon}q)(s,a)=r(s,a)+\gamma\mathbb{E}_{s'}\bigl[\tfrac{\epsilon}{|A|}\sum_{b'}q(s',b')+(1-\epsilon)\max_{a'}q(s',a')\bigr]$$

וגם 

$$\|Q^{*,\epsilon}-Q^*\|\le \dfrac{\epsilon\gamma V_{\max}}{1-\gamma}$$

**רעיון ההוכחה:** $T^{*,\epsilon}$ הוא $\gamma$-מכווץ; חסימת $\Delta_\epsilon=\|Q^{*,\epsilon}-Q^*\|$ נותנת 

$$\Delta_\epsilon\le\gamma(1-\epsilon)\Delta_\epsilon+\epsilon\gamma V_{\max}$$

**רלוונטיות למבחן:** מראה ש-SARSA ה-on-policy מתכנס לערך *מוטה* שמתקרב ל-$Q^*$ רק כאשר $\epsilon\to0$ — עיקר ההבדל בין on-policy ל-off-policy.

**Thm (SARSA plays a $\lambda$-optimal policy).** עם מדיניות $\epsilon_n$-חמדנית מונוטונית ($\epsilon_n\downarrow0$), לכל $\lambda>0$ קיים זמן $\tau$ שאחריו SARSA משחק מדיניות $\lambda$-אופטימלית.

**רעיון ההוכחה:** משלבים את ההפסד אופטימלי-מול-חמדני 

$$\tfrac{2\Delta}{1-\gamma}\le\tfrac\lambda2$$

 עם ההפסד חמדני-מול-$\epsilon_n$-חמדני 

$$\tfrac{2\epsilon_n}{1-\gamma^2}\le\tfrac\lambda2$$

שניהם מתכווצים כאשר $\epsilon_n\to0$.

**רלוונטיות למבחן:** בקרה on-policy צריכה שהחקירה תיעלם כדי שה*החזר* (לא רק $Q$) ייעשה כמעט-אופטימלי.

**Lem (Greedy-policy value loss).** אם $\|Q-Q^*\|_\infty\le\Delta$ ו-$\pi$ חמדנית ביחס ל-$Q$, אז 

$$V^*(s)-V^\pi(s)\le\dfrac{2\Delta}{1-\gamma}$$

**רעיון ההוכחה:** $Q^*(s,a^*)-Q^*(s,\pi(s))\le2\Delta$ (כל פער $Q$-מול-$Q^*$ הוא $\le\Delta$, ו-$\pi$ חמדנית ביחס ל-$Q$); פורשים 

$$V^*\le V^\pi+\sum_i 2\Delta\gamma^i=V^\pi+\tfrac{2\Delta}{1-\gamma}$$

**רלוונטיות למבחן:** המרת "שגיאת $Q$ להפסד-מדיניות" הסטנדרטית; מופיעה בשאלות Q-learning, ‏SARSA, וקירוב.

**Lem (Close policies have close value).** אם 

$$\|\pi(\cdot\mid s)-\pi'_{\epsilon_1}(\cdot\mid s)\|_1\le\epsilon_1$$

 לכל $s$, אז 

$$|V^\pi(s_0)-V^{\pi'_{\epsilon_1}}(s_0)|\le\dfrac{\epsilon_1\gamma R_{\max}}{1-\gamma^2}$$

**רעיון ההוכחה:** שתי המדיניויות מסכימות במשך $t$ צעדים בהסתברות $\ge(1-\epsilon_1)^t$; חוסמים את הפרש התגמול בטור הנדסי.

**רלוונטיות למבחן:** מאפשר להחליף מדיניות אידאלית במדיניות האקראית שבוצעה בפועל.

**Thm ($\epsilon$-greedy policy improvement).** לכל מדיניות $\epsilon$-חמדנית $\pi$, השיפור ה-$\epsilon$-חמדני שלה $\pi''$ (מניחים משקל $\tfrac{\epsilon}{|A|}+1-\epsilon$ על $\bar a=\arg\max_a Q^\pi$, אחרת $\tfrac{\epsilon}{|A|}$) מקיים $V^{\pi''}\ge V^\pi$.

**רעיון ההוכחה:** מראים 

$$\mathbb{E}_{a\sim\pi''}[Q^\pi(s,a)]\ge V^\pi(s)$$

 בטיעון ממוצע-ממושקל, ואז מיישמים את משפט שיפור-המדיניות.

**רלוונטיות למבחן:** מצדיק בקרת MC עם $\epsilon$-חמדנית; הוכחה קצרה ונקייה שנשאלת לעיתים קרובות.

**Thm (First-visit MC = maximum likelihood on the reduced sample).** הערכת ביקור-ראשון של $V^\pi(s)$ שווה לערך המחושב במודל הנראות-המרבית (האמפירי) הבנוי מהדגימה ה*מצומצמת* שמשמיטה מסלולים שאינם מגיעים ל-$s$ ואת כל הצעדים לפני הביקור הראשון ב-$s$.

**רעיון ההוכחה:** עם $\hat p(u,v)=n(u,v)/n(u)$, $\hat r(v)=\tfrac1{n(v)}\sum_i r_i^v$, והסתברות-ההגעה $\mu(s)=n(s)/N$, מוודאים ש-

$$\sum_v\mu(v)\hat r(v)=\tfrac1N\sum_j G_j$$

**רלוונטיות למבחן:** מקשר MC דוגם להערכה מבוססת-מודל; הסתייגות ה"דגימה המצומצמת" מבדילה אותו מ-TD (הרצאה 07).

**Thm (Every-visit MC minimizes squared error / is biased).** אומד כל-הביקורים 

$$\hat V(s)=\dfrac{\sum_{i,j:\,s_{i,j}=s}R(s_{i,j})}{|\{i,j:s_{i,j}=s\}|}$$

 ממזער את $\sum(\hat V(s)-R(s_{i,j}))^2$, אך מוטה: בלולאה בת 2 מצבים אפיזודה יחידה נותנת 

$$\mathbb{E}[\hat V(s)]=\tfrac{1-p}{2p}r_1+r_2$$

 מול הערך האמיתי $V(s)=\tfrac{1-p}{p}r_1+r_2$; עם $m$ אפיזודות

$$\mathbb{E}[\hat V(s)]=\tfrac{m}{m+1}\cdot\tfrac{1-p}{p}r_1+r_2\to V(s)$$

**רעיון ההוכחה:** בתוך אפיזודה עם $n$ ביקורים החזרי-הסיומת המקובצים ממצעים לגורמים מסוג $\tfrac{n+1}{2}\cdot\tfrac1n$; מיצוע האומד-לכל-אפיזודה שומר את הטיית ה-$\tfrac12$. (מאומת נומרית: $\mathbb{E}[\hat V]\approx3.167$ מול האמיתי $4.333$ עבור $p=0.3,r_1=1,r_2=2$.)

**רלוונטיות למבחן:** הטיית ביקור-ראשון מול כל-ביקור היא שאלת-קצרה מועדפת; כל-ביקור *אסימפטוטית* חסר-הטיה אך מוטה עבור אפיזודה אחת.

## טכניקות וטריקים

- **הרצת Q-learning ביד (MDP):** לכל $(s_t,a_t,r_t,s_{t+1})$ שנצפה מיישמים 

  $$Q\!\leftarrow\!Q+\alpha[r+\gamma\max_a Q(s_{t+1},a)-Q]$$

   עם $\alpha_t(s,a)=1/\#(s,a)$. צעדים פתורים מאומתים ($\gamma=\tfrac12$): 

  $$(2,u,4,2){:}\ 0+1\cdot[4+\tfrac12\max(0,2)]=5$$

   $$(3,u,3,2){:}\ 0+1\cdot[3+\tfrac12\max(5,2)]=5.5$$

 $$(2,u,7,1){:}\ 5+\tfrac12[7+\tfrac12\cdot1-5]=6.25$$

- **הרצת SARSA ביד:** זהה אך bootstrap על הפעולה הבאה ה*נתונה*, ללא $\max$. מאומת ($\gamma=\tfrac12$): 

  $$(3,u,3,2,u){:}\ 0+1\cdot[3+\tfrac12\cdot2]=4$$

   $$(2,u,7,1,d){:}\ 2+\tfrac12[7+\tfrac12\cdot1-2]=4.75$$

- **ביקור-ראשון מול כל-ביקור ביד:** על המסלול $s_1,s_1,s_1,s_1,s_2$ עם $+1$ לכל צעד, ביקור-ראשון $\hat V(s_1)=4$; כל-ביקור $\hat V(s_1)=\tfrac{4+3+2+1}{4}=2.5$. נראות-מרבית 

  $$p^*=\arg\max(1-p)^3p=\tfrac14\Rightarrow V=1/p^*=4$$

   (תואם לביקור-ראשון כאן, לא בכלל).
- **תכנון גודל-צעד:** $\alpha(s,a)=1/g(\#(s,a))$. ליניארי $g(n)=n$: $\sum 1/n\approx\ln N=\infty$, $\sum1/n^2=\pi^2/6<\infty$ — תקף אך *איטי* (דוגמה רעה: $Q_t=\Theta(t^{\gamma-1})$, דורש $t=\Theta((1/\epsilon)^{1/(1-\gamma)})$). פולינומי $g(n)=n^\theta$, $\theta\in(\tfrac12,1)$: 

  $$\sum1/n^\theta\approx\tfrac{N^{1-\theta}}{1-\theta}=\infty$$

   $$\sum1/n^{2\theta}\le\tfrac1{2\theta-1}+1<\infty$$

 — מתכנס *מעריכית* ( $Q_t=\Theta(e^{-(1-\gamma)t^{1-\theta}})$ ).
- **ריכוז McDiarmid:** עבור $f$ עם רגישות-לקואורדינטה $c_i$, 

  $$\Pr[|f-\mathbb{E}f|\ge\epsilon]\le2\exp\!\bigl(-\tfrac{2\epsilon^2}{\sum_i c_i^2}\bigr)$$

ממוצע פשוט: 

  $$c_i=1/n\Rightarrow\Pr\le2e^{-2\epsilon^2 n}$$

ממוצע ממושקל $\sum\beta_i x_i$: $c_i=\beta_i$; עבור $\beta_t=\alpha(1-\alpha)^{T-t}$, 

  $$\sum\beta_i^2\approx\tfrac{\alpha}{2-\alpha}$$

שנותן 

 $$\epsilon\approx\sqrt{\alpha\log(2/\delta)}$$

## נקודות רלוונטיות למבחן

- **Off-policy (Q-learning) מול on-policy (SARSA):** Q-learning מכוון ל-$\max_a Q(s_{t+1},a)$ ללא קשר להתנהגות ומתכנס ל-$Q^*$; SARSA מכוון ל-$Q(s_{t+1},a_{t+1})$ תחת המדיניות החוקרת שבוצעה ומתכנס ל-$Q^{*,\epsilon}$ ה*מוטה* עם 

 $$\|Q^{*,\epsilon}-Q^*\|\le\epsilon\gamma V_{\max}/(1-\gamma)$$

- **שני תנאי גודל-הצעד נושאים משקל:** $\sum\alpha_t=\infty$ (ההתקדמות מגיעה לנקודה השבת) ו-$\sum\alpha_t^2<\infty$ (השונות/רעש מדוכאים). ויתור על אחד מהם שובר את ההתכנסות.
- **חסם הרעש:** ברדוקציה של הקירוב הסטוכסטי הרעש חסום על ידי $V_{\max}=R_{\max}/(1-\gamma)$ — יש לזכור שזה נובע מסדר-הגודל של ההחזר המהוון.
- **ביקור-ראשון חסר-הטיה; כל-ביקור מוטה** (אסימפטוטית חסר-הטיה כאשר האפיזודות $\to\infty$). כל-ביקור הוא ממזער-ה-MSE על פני החזרי-הסיומת המקובצים ומנצל מחדש את הנתונים (שונות נמוכה יותר).
- **יתרונות/חסרונות MC:** ללא הנחת מרקוב, מתרחב לקירוב פונקציות, חסר-הטיה (ביקור-ראשון); אך מעדכן רק בסוף האפיזודה ודורש משימות אפיזודיות. זה מניע את TD (הרצאה 07).
- **התכנסות ה*החזר* $\neq$ התכנסות $Q$:** SARSA צריך שהחקירה תדעך (מונוטונית $\epsilon_n\to0$) כדי שהמדיניות שבוצעה תיעשה כמעט-אופטימלית — המטרה ה-off-policy של Q-learning עוקפת זאת עבור $Q^*$.
- **אינטואיציית מסלול-קצר-ביותר ל-Q-learning:** עם עלויות ואתחול גבוה, ההתכנסות מתפשטת החוצה לפי המרחק מהיעד — צמתים ננעלים על הקשת האופטימלית שלהם בסדר הקרבה.
