# הרצאה 10 — בעיית שודד רב-זרועות (Multi-Arm Bandits)

**File:** materials/lectures/lecture_10_bandits.pdf
**Pillar:** Bandits
**Summary:** הרצאת הבנדיטים המרכזית למבחן: היא מגדירה חרטה / פסאודו-חרטה עבור בעיית השודד הרב-זרועות הסטוכסטית (MDP חד-מצבי עם משוב בנדיט) ובונה את כל ארגז הכלים למזעור חרטה — explore-then-exploit ($\tilde O(T^{2/3})$), successive elimination ו-UCB (שניהם $O(\sqrt{kT\log T})$, כלומר לכל זרוע $O(\frac{\log T}{\Delta_i})$), וחסם התחתון $\Omega(\log T)$ — ואז מחליפה מטרה לזיהוי הזרוע הטובה ביותר / PAC (דגימה נאיבית ו-median elimination, סיבוכיות הדגימה האופטימלית $O(\frac{k}{\epsilon^2}\log\frac1\delta)$).

## Outline

- מודל MAB: MDP חד-מצבי, $k$ פעולות, משוב בנדיט, תגמולים i.i.d.
- מזעור חרטה
  - חימום: מידע מלא $k=2$ (חרטה $O(1/\Delta)$, בלתי תלויה ב-$T$)
  - חסם תחתון $\Omega(\log T)$
  - Explore-then-Exploit ($\tilde O(T^{2/3})$)
  - Successive Elimination ($O(\sqrt{kT\log T})$)
  - Upper Confidence Bound / UCB ($O(\sqrt{kT\log T})$)
- זיהוי הזרוע הטובה ביותר
  - מטרת PAC; דגימה נאיבית $O(\frac{k}{\epsilon^2}\log\frac{k}{\delta})$
  - Median Elimination $O(\frac{k}{\epsilon^2}\log\frac1\delta)$
- יישומים: בנדיטים הקשריים (contextual), המלצת שלט של Netflix

## Key definitions

**Def (Multi-armed bandit model).** MDP חד-מצבי עם קבוצת פעולות $A=\{1,\dots,k\}$ וללא דינמיקה. משיכת זרוע $i$ מניבה תגמול $X_i\sim D_i$ עם תוחלת $\mu_i=E[X_i]$; התגמולים חסומים, $X_i\in[0,1]$. הזרוע הטובה ביותר היא $\mu^*=\max_i\mu_i$, $a^*=\arg\max_i\mu_i$. המשוב הוא **בנדיט** (נצפה רק $r_t(a_t)$ של הזרוע שנמשכה), בניגוד ל**מידע מלא** (כל $r_t(i)$ נצפים).

**Def (Cumulative reward, regret).** לאורך אופק $T$, אם $a_t$ היא הזרוע הנמשכת בצעד $t$, התגמול המצטבר הוא $\sum_{t=1}^T r_t(a_t)$. **חרטה** 

$$= E\big[\max_i\sum_{t=1}^T r_t(i) - \sum_{t=1}^T r_t(a_t)\big]$$

**Def (Pseudo-regret).**

$$\max_i E[\sum_{t=1}^T r_t(i)] - E[\sum_{t=1}^T r_t(a_t)] = \mu^* T - E[\sum_{t=1}^T \mu_{a_t}]$$

(המקסימום מוצא אל מחוץ לתוחלת, ולכן פסאודו-חרטה $\le$ חרטה; היא שווה ל-$\sum_{i\ne a^*}\Delta_i\,E[n_T(i)]$.)

**Def (Gap $\Delta_i$).** עבור זרוע תת-אופטימלית $i$, $\Delta_i=\mu^*-\mu_i\ge0$. הוא שולט בכמה יקרה כל משיכה של $i$ ובכמה מהר ניתן להבחין בין $i$ ל-$a^*$.

**Def (Confidence radius and good event $G$).** עם $n_t(i)$ משיכות של זרוע $i$ עד זמן $t$ וממוצע אמפירי $\hat\mu_t(i)$, נגדיר את הרדיוס 

$$\lambda_t(i)=\sqrt{\tfrac{2\log T}{n_t(i)}}$$

**המאורע הטוב** הוא 

$$G=\{\forall i\,\forall t:\ |\hat\mu_t(i)-\mu_i|\le\lambda_t(i)\}$$

ו-

$$\Pr[G]\ge 1-\tfrac{2kT}{T^4}\ge 1-\tfrac2{T^2}$$

 (באמצעות דגימה מוקדמת של כל $kT$ התגמולים + חסם איחוד, מאחר ש-$n_t(i)$ הוא בעצמו אקראי).

**Def (UCB / LCB).** חסם ביטחון עליון $UCB_t(i)=\hat\mu_t(i)+\lambda_t(i)$; חסם ביטחון תחתון $LCB_t(i)=\hat\mu_t(i)-\lambda_t(i)$. תחת $G$, $\mu_i\in[LCB_t(i),UCB_t(i)]$ לכל $i,t$ (בהסתברות $\ge 1-\tfrac2{T^2}$). "אופטימיות מול אי-ודאות": פעל לפי ה-UCB.

**Def (Best-arm identification, PAC).** מטרה שונה — למצוא זרוע כמעט-אופטימלית תוך *מזעור זמן החקירה*, בהתעלם מעלות החקירה. $(\epsilon,\delta)$-PAC: בהינתן $\epsilon,\delta>0$, החזר זרוע $i$ עם $\mu^*-\mu_i\le\epsilon$ בהסתברות $\ge1-\delta$.

## Key theorems & results

**Lem (Chernoff–Hoeffding).** עבור $m$ משתנים i.i.d. $X_i\in[-1,1]$ בעלי תוחלת $\mu$:

$$\Pr\big[|\tfrac1m\sum_{i=1}^m X_i-\mu|\ge\epsilon\big]\le 2\exp(-2\epsilon^2 m)$$

באופן שקול 

$$m\ge\tfrac1{2\epsilon^2}\log\tfrac2\delta$$

 גורם למאורע הסטייה $\ge\epsilon$ להיות בעל הסתברות $\le\delta$.

**Proof idea:** ריכוזיות סטנדרטית עבור משתנים i.i.d. חסומים.

**Exam relevance:** סוס העבודה מאחורי כל חסם בהרצאה זו; מציבים $\epsilon=\lambda$ וקוראים כמה משיכות נותנות ביטחון — אומת: 

$$\epsilon=0.1,\delta=0.05\Rightarrow m\ge 185$$

**Thm (Full-information $k=2$ regret).** אלגוריתם חמדני על ממוצעים רצים ($a_t=\arg\max_i \mathrm{avg}_{t-1}(i)$) עם $\mu_1\ge\mu_2$, $\Delta=\mu_1-\mu_2$ בעל פסאודו-חרטה

$$\sum_{t=1}^\infty \Delta\,\Pr[\mathrm{avg}_t(2)\ge\mathrm{avg}_t(1)]\le\sum_{t=1}^\infty\Delta\,e^{-2\Delta^2 t}\le\int_0^\infty\Delta e^{-2\Delta^2 t}\,dt=\tfrac1{2\Delta}=O(1/\Delta)$$

**Proof idea:** חוסמים את ההסתברות שהזרוע השגויה נראית טובה יותר באמצעות Chernoff-Hoeffding, ואז מסכמים את הטור הגאומטרי-למחצה על ידי אינטגרל.

**Exam relevance:** השורה התחתונה היא **חרטה בלתי תלויה ב-$T$** עם מידע מלא — מסבירה מדוע משוב בנדיט קשה יותר באמת. (נומרית הסכום הוא $\approx\tfrac1{2\Delta}$, למשל $0.950$ מול $1/(2\Delta)=1.0$ עבור $\Delta=0.5$; "$2/\Delta$" בשקף הוא טעות דפוס של מקדם הפונקציה הקדומה $\tfrac1{2\Delta}$.)

**Thm (MAB lower bound).** לכל אלגוריתם בנדיט יש חרטה מצופה $\Omega(\log T)$.

**Proof idea:** שני פרופילים המסכימים על זרוע $a_1\sim\mathrm{Br}(\tfrac12)$ אך נבדלים על $a_2\sim\mathrm{Br}(\tfrac14)$ מול $\mathrm{Br}(\tfrac34)$; עם $\Delta=\tfrac14$ בדיקת זרוע $2$ עולה $\tfrac14$ למשיכה, ולפי מרקוב אם $E[\mathrm{regret}]=R$ אז בהסתברות $\ge\tfrac12$ אתה בודק את $a_2$ לכל היותר $8R$ פעמים — אם רצף הדגימות הוא כולו אפסים אתה שומר על הזרוע השגויה, מה שנותן סתירה אלא אם כן $R=\Omega(\log T)$.

**Exam relevance:** מבסס שה-$\log T$ ב-SE/UCB בלתי נמנע; חרטת בנדיט לא יכולה להיות בלתי תלויה ב-$T$ (בניגוד למידע מלא).

**Thm (Explore-then-Exploit).** חקור כל זרוע $M$ פעמים ($kM$ צעדים, $a_t=t\bmod k$), אמוד $\hat\mu_i$, ואז נצל $\hat a^*=\arg\max_i\hat\mu_i$ לשארית. אזי

$$E[\mathrm{regret}]\le kM+2\sqrt{\tfrac{2\log T}{M}}\,T+\tfrac2{T^2}$$

מסקנה: $M=T^{2/3}$ נותן

$$E[\mathrm{regret}]\le kT^{2/3}+2\sqrt{2\log T}\,T^{2/3}+\tfrac2{T^2}=\tilde O(T^{2/3})$$

**Proof idea:** הצב $\lambda=\sqrt{\tfrac{2\log T}{M}}$; מחוץ למאורע הרע 

$$\{\exists i:|\hat\mu_i-\mu_i|\ge\lambda\}$$

 (הסתברות $\le\tfrac2{T^3}$) לזרוע המנוצלת יש $\Delta_{\hat a}\le2\lambda$; החקירה עולה $kM$, הניצול עולה $(T-kM)2\lambda$, המאורע הרע עולה $\le\tfrac2{T^2}$.

**Exam relevance:** "היכן הפסדנו?" הקנוני — חקירה אחידה מבזבזת משיכות על זרועות רעות-מאוד וכמעט-אופטימליות באותה מידה; מניע דגימה תלוית-זרוע. אומת סקיילינג $\tilde O(T^{2/3})$.

**Thm (Successive Elimination — regret).** תחזק קבוצה חיה $S=A$; משיכה אחת לכל זרוע חיה בכל שלב (round-robin); הסר $j$ אם קיים $i$ עם $UCB_t(j)<LCB_t(i)$. אזי

$$E[\mathrm{regret}]\le\sum_{i\ne a^*}\Delta_i E[n_T(i)]+\tfrac2{T^2}T\le\sum_{i\ne a^*}\tfrac{c}{\Delta_i}\log T+\tfrac2T$$

ומכאן $E[\mathrm{regret}]=O(\sqrt{kT\log T})$.

**Proof idea:** תחת $G$ הזרוע הטובה ביותר לעולם אינה מוסרת וכל זרוע תת-אופטימלית $i$ נמשכת $n_T(i)\le\tfrac{32}{\Delta_i^2}\log T$ פעמים (הלמה למטה); מפצלים את הזרועות לפי האם $\Delta_i\lessgtr 1/\sqrt T$ כדי לקבל את החסם במקרה הגרוע ביותר $\sqrt{kT\log T}$.

**Exam relevance:** הדואליות בין תלוי-פער ($\sum \frac{\log T}{\Delta_i}$) לבין חופשי-פער ($\sqrt{kT\log T}$) היא מניפולציה חביבה במבחן.

**Lem (SE/UCB: pulls of a sub-optimal arm).** תחת $G$: (i) הזרוע הטובה ביותר לעולם אינה מוסרת ($UCB_t(a^*)\ge\mu^*>\mu_i\ge LCB_t(i)$ מאחר ש-$\lambda_t$ שווה); (ii) זרוע תת-אופטימלית חיה מקיימת $\mu_i+2\lambda_t\ge\mu^*-2\lambda_t$, ולכן במשיכתה האחרונה $4\lambda_t\ge\Delta_i$ נותן $n_T(i)\le\tfrac{32}{\Delta_i^2}\log T$ (successive elimination) / $\tfrac{8}{\Delta_i^2}\log T$ (UCB).

**Proof idea:** שרשר $UCB_t(i)\le\mu_i+2\lambda_t(i)$ ו-$LCB_t(a^*)\ge\mu^*-2\lambda_t(a^*)$ עם 

$$\lambda_t=\sqrt{\tfrac{2\log T}{n_T(i)}}$$

**Exam relevance:** הקבוע המדויק ($32$ מול $8$) והתלות $1/\Delta_i^2$ נשאלים לעיתים קרובות; היה מסוגל לגזור מחדש $n_T(i)\le\frac{c}{\Delta_i^2}\log T$.

**Thm (UCB — regret).** שחק כל זרוע פעם אחת, ואז $a_t=\arg\max_i UCB_{t-1}(i)$. תחת $G$: $UCB_t(a_t)\ge UCB_t(a^*)\ge\mu^*$, ולכן

$$\mu^*\le\mu_i+2\lambda_t(i)\Rightarrow n_t(i)\le\tfrac{8}{\Delta_i^2}\log T$$

מכאן

$$E[\mathrm{regret}]\le\sum_{i\ne a^*}\tfrac{8}{\Delta_i}\log T+\tfrac2T=O(\sqrt{kT\log T})$$

**Proof idea:** אופטימיות מבטיחה שה-UCB של הזרוע הנמשכת שולט ב-$\mu^*$; רדיוס הביטחון אז מגביל כמה זמן זרוע תת-אופטימלית יכולה לשמור על ה-UCB הגדול ביותר.

**Exam relevance:** נסח את חסם הביטחון $\lambda_t(i)=\sqrt{2\log T/n_t(i)}$, את החרטה לכל זרוע $O(\frac{\log T}{\Delta_i})$, ואת המסקנה חופשית-הפער $O(\sqrt{kT\log T})$ — העובדות בעלות הערך הגבוה ביותר בהרצאה זו.

**Thm (Naïve PAC sampling).** דגום כל זרוע 

$$m(\epsilon,\delta)=\tfrac2{\epsilon^2}\log\tfrac{2k}\delta$$

 פעמים, החזר $\hat a=\arg\max_i\hat\mu_i$. בהסתברות $\ge1-\delta$, $\mu^*-\mu_{\hat a}\le\epsilon$. סך הדגימות 

$$O(\tfrac{k}{\epsilon^2}\log\tfrac{k}\delta)$$

**Proof idea:** כל $\hat\mu_i$ בתוך $\epsilon/2$ בהסתברות $1-\delta/k$ (Chernoff); חסם איחוד; ואז

$$\mu^*-\tfrac\epsilon2\le\hat\mu^*\le\hat\mu_{\hat a}\le\mu_{\hat a}+\tfrac\epsilon2$$

**Exam relevance:** סיבוכיות PAC בסיסית; שים לב ל-$\log k$ הפנימי מחסם האיחוד — כל מטרתו של median elimination היא להסירו.

**Thm (Median Elimination — sample complexity).** אלגוריתם מבוסס-שלבים (

$$\epsilon_1=\tfrac\epsilon4,\delta_1=\tfrac\delta2$$

בכל שלב דגום 

$$m(\epsilon_\ell,\delta_\ell)=\tfrac2{\epsilon_\ell^2}\log\tfrac3{\delta_\ell}$$

שמור זרועות מעל החציון, ואז $\epsilon_{\ell+1}=\tfrac34\epsilon_\ell$, $\delta_{\ell+1}=\tfrac{\delta_\ell}2$) הוא $(\epsilon,\delta)$-PAC עם סך דגימות 

$$O(\tfrac{k}{\epsilon^2}\log\tfrac1\delta)$$

**Proof idea:** $|S_\ell|=k/2^{\ell-1}$, $\sum_\ell\epsilon_\ell\le\epsilon$, $\sum_\ell\delta_\ell\le\delta$; סכום הסיבוכיות 

$$\tfrac{2k}{\epsilon^2}\log\tfrac3\delta\sum_\ell(\ell-1)(\tfrac89)^{\ell-1}$$

 מתכנס (הטור $=72$), ומסיר את הגורם $\log k$.

**Exam relevance:** חסם ה-PAC האופטימלי — נסח הן את רעיון חיתוך-החציון של האלגוריתם והן שהוא מכה את הנאיבי בגורם $\log k$. אומת: $\sum_\ell(\ell-1)(8/9)^{\ell-1}=72$.

**Lem (Median Elimination — correctness).**

$$\Pr[\max_{i\in S_\ell}\mu_i\le\max_{j\in S_{\ell+1}}\mu_j+\epsilon_\ell]\ge1-\delta_\ell$$

ומכאן המשפט 

$$\Pr[\mu^*-\epsilon\le\mu_{\hat a}]\ge1-\delta$$

 על ידי סכימת $\epsilon_\ell$ לאורך השלבים.

**Proof idea:** למאורע הרע 

$$\hat\mu^*_\ell<\mu^*_\ell-\tfrac{\epsilon_\ell}2$$

 יש הסתברות $\le\tfrac{\delta_\ell}3$; מספר השורדים התת-אופטימליים המצופה הוא $\le|S_\ell|\tfrac{\delta_\ell}3$, ולכן לפי מרקוב פחות מחצי שורדים בהסתברות $\ge1-\tfrac23\delta_\ell$, מה שמבטיח שזרוע כמעט-אופטימלית נשארת.

**Exam relevance:** טיעון הצטברות-השגיאה לכל שלב ($\sum\epsilon_\ell$, $\sum\delta_\ell$) הוא טכניקת ההוכחה הניתנת לשימוש חוזר.

## טכניקות וטריקים

- **פסאודו-חרטה $=\sum_{i\ne a^*}\Delta_i E[n_T(i)]$.** כל חסם חרטה מצטמצם לחסימת המשיכות $n_T(i)$ של כל זרוע תת-אופטימלית; עשה זאת, הכפל ב-$\Delta_i$, הוסף את כשל המאורע הטוב ($\le\tfrac2{T^2}\cdot T=\tfrac2T$).
- **רדיוס ביטחון ביד:** $\lambda_t(i)=\sqrt{2\log T/n_t(i)}$; UCB מושך את הזרוע עם $\hat\mu+\lambda$ הגדול ביותר, SE מסלק כאשר ה-LCB של מתחרה עולה על ה-UCB של זרוע. שניהם מוציאים $O(\frac{\log T}{\Delta_i^2})$ משיכות לכל זרוע; הם נבדלים רק ב*מתי* הם חוקרים (SE מראש / באופן רציף, UCB פרוס לאורך הזמן).
- **פיצול פער כדי לעבור לחופשי-פער:** עבור $\Delta_i<1/\sqrt T$ חסום $n_T(i)\le T$ (תרומה $\le\sqrt T$ לכל זרוע); עבור $\Delta_i\ge1/\sqrt T$ השתמש ב- 

  $$\frac{c}{\Delta_i}\log T\le c\sqrt T\log T$$

סכום על $k$ זרועות $\Rightarrow O(\sqrt{kT\log T})$.
- **כוונון explore-then-exploit:** אזן בין עלות החקירה $kM$ לעלות הניצול $\propto T/\sqrt M$; האופטימום $M=T^{2/3}$ נותן $\tilde O(T^{2/3})$ (גרוע מ-$\sqrt T$ בדיוק משום שהדגימה בלתי תלוית-זרוע).
- **ניהול חשבונות של median elimination:** חצה את קבוצת הזרועות בכל שלב, כווץ את $\epsilon$ בפי $\tfrac34$ ואת $\delta$ בחצי; סכומים גאומטריים שומרים על $\sum\epsilon_\ell\le\epsilon$, $\sum\delta_\ell\le\delta$ תוך ויתור על $\log k$.
- **בנדיט הקשרי (יישומים):** explore-then-exploit על מחלקת מדיניות סופית $\Pi$ באמצעות אומדנים לא-מוטים לכל מדיניות 

  $$\hat\mu_\pi=\mathrm{avg}\{r_t:\pi(x_t)=a_t\}$$

חרטה $\tilde O(T^{2/3}\log|\Pi|)$.

## נקודות רלוונטיות למבחן

- **ארבעת החסמים המרכזיים:** מידע מלא $k=2$ $\Rightarrow O(1/\Delta)$ (בלתי תלוי ב-$T$); explore-then-exploit $\Rightarrow\tilde O(T^{2/3})$; SE ו-UCB $\Rightarrow O(\sqrt{kT\log T})$ חופשי-פער, $O(\sum_i\frac{\log T}{\Delta_i})$ תלוי-פער; חסם תחתון $\Omega(\log T)$.
- **קבועי המשיכות לכל זרוע:** SE $n_T(i)\le\frac{32}{\Delta_i^2}\log T$, UCB $n_T(i)\le\frac{8}{\Delta_i^2}\log T$ — שניהם מ-$4\lambda_t\ge\Delta_i$; דע את הקבוע.
- **חסם הביטחון של UCB הוא $\sqrt{2\log T/n_t(i)}$** (משתמש באופק $T$, לא ב-$t$, משום שכל $kT$ התגמולים נדגמים מראש כדי לטפל ב-$n_t(i)$ האקראי). המאורע הטוב מתקיים בהסתברות $\ge1-2/T^2$.
- **סיבוכיות דגימת PAC:** נאיבי 

  $$O(\frac{k}{\epsilon^2}\log\frac{k}\delta)$$

successive elimination (במקרה הגרוע ביותר) זהה, **median elimination $O(\frac{k}{\epsilon^2}\log\frac1\delta)$ ** — ה-$\log\frac1\delta$ (ללא $k$) הוא כל היתרון.
- **חרטה מול פסאודו-חרטה:** המקסימום בתוך מול מחוץ לתוחלת; פסאודו-חרטה $\le$ חרטה והיא הכמות הנחסמת בפועל.
- **זיהוי הזרוע הטובה ביותר ≠ מזעור חרטה:** הראשון מתעלם מעלות החקירה (סופר רק *זמן*); PAC מחזיר זרוע $\epsilon$-אופטימלית, הוא אינו ממזער תגמול מצטבר.
- **MAB יריב** (תגמולים נקבעים על ידי יריב, ללא התפלגות) עדיין מאפשר חרטה שואפת לאפס — מסומן כמתקדם/רשות.
