# הרצאה 09 — מדיניות-גרדיאנט

**File:** materials/lectures/lecture_09_policy_gradient.pdf
**Pillar:** Approximation
**Summary:** ממטבים מדיניות מפורמטת $\pi(a\mid s;\theta)$ ישירות באמצעות עליית-גרדיאנט על $J(\theta)=V^{\pi_\theta}(s_0)$, במקום ללמוד פונקציית ערך ולפעול חמדנית. מבססת את משפט המדיניות-גרדיאנט, את אומד REINFORCE / פונקציית-הציון (score-function), קווי-בסיס (baselines) ואת היתרון (advantage) להפחתת שונות, ושחקן-מבקר (כולל קירוב פונקציות תואם). תשואה גבוהה: נסח את משפט ה-PG בדיוק, גזור את צורת פונקציית-הציון, והוכח את אי-תלות קו-הבסיס.

## Outline

- מדוע למטב את המדיניות ישירות (כינוי-מצבים, הצורך במדיניויות סטוכסטיות, פעולות רציפות)
- פרמטריזציות מדיניות: לוג-לינארית/softmax, גאוסית
- אמידת גרדיאנט בהפרשים סופיים (הפרעות קואורדינטה, וריאנט least-squares)
- משפט המדיניות-גרדיאנט וצורת פונקציית-הציון (לוג-נראות) שלו
- REINFORCE (מדיניות-גרדיאנט מונטה-קרלו)
- קווי-בסיס / יתרון להפחתת שונות
- שחקן-מבקר (TD); קירוב פונקציות תואם
- יישומים: הליכת Aibo (הפרשים סופיים), AlphaGo

## Key definitions

**Def (policy objective $J(\theta)$).** ממקסמים $J(\theta)=V^{\pi_\theta}(s_0)$; במקרה האפיזודי 

$$J(\theta)=V^\pi(s_1)=E_{\pi_\theta}\big[\sum_{t=1}^T r_t\mid s_1\big]$$

 (וריאנטים מהוונים / תגמול-ממוצע חלים גם הם). האופטימיזציה היא באמצעות עליית-גרדיאנט (**ascent**) 

$$\theta_{t+1}=\theta_t+\alpha\nabla_\theta J(\theta_t)$$

 — שים לב ש-$J$ הוא היעד האמיתי, בניגוד למזעור של הפסד תחליפי בשיטות פונקציית-ערך.

**Def (log-linear / softmax policy).** קודדים $(s,a)$ כ-$\phi(s,a)$ וקובעים 

$$\pi(a\mid s;\theta)\propto e^{\phi(s,a)^\top\theta}$$

הציון שלו הוא 

$$\nabla_\theta\log\pi(a\mid s;\theta)=\phi(s,a)-E_{b\sim\pi(\cdot\mid s;\theta)}[\phi(s,b)]$$

 (מאפיין פחות ממוצעו-לפי-המדיניות).

**Def (Gaussian policy).** קודדים מצב כ-$\phi(s)$, פעולה ממוצעת $\mu(s)=\phi(s)^\top\theta$, ו-$a\sim\mathcal N(\mu(s),\sigma^2)$ (תומך בפעולות רציפות). ציון: 

$$\nabla_\theta\log\pi(a\mid s;\theta)=\dfrac{(a-\mu(s))}{\sigma^2}\phi(s)$$

**Def (finite-difference gradient estimate).** מפריעים קואורדינטה אחת בכל פעם: 

$$\dfrac{\partial}{\partial\theta_i}J(\theta)\approx\dfrac{\hat J(\theta+\delta e_i)-\hat J(\theta-\delta e_i)}{2\delta}$$

 (הפרש מרכזי), כאשר $\hat J$ היא הערכת rollout רועשת. דורש הרבה rollouts לכל קואורדינטה; הצעד $\delta$ מאזן בין הרעש היחסי לבין אי-הלינאריות של $J$. וריאנט least-squares מתאים 

$$\Delta J\approx[\Delta\Theta]\,\nabla J(\theta)$$

 על-פני הפרעות כלליות $\Delta\theta^{(i)}=\delta u_i$, ופותר 

$$G=([\Delta\Theta]^\top[\Delta\Theta])^{-1}[\Delta\Theta]^\top\Delta J$$

 (ויכול לפתור עבור ה-$J(\theta)$ הלא-ידוע במשותף על-ידי הוספת עמודת קבועים, $M=[\mathbf 1,\Delta\Theta]$).

**Def (score function / likelihood-ratio identity).** עבור כל $f$ גזירה, 

$$\nabla f(x)=f(x)\dfrac{\nabla f(x)}{f(x)}=f(x)\nabla\log f(x)$$

ביישום על $\pi$, זה ממיר 

$$\nabla_\theta\pi=\pi\,\nabla_\theta\log\pi$$

ומאפשר לפעולה בודדת נדגמת לתת אומד גרדיאנט בלתי-מוטה.

**Def (baseline and advantage).** קו-בסיס $b(s)$ תלוי במצב בלבד; ניתן לחסר אותו מ-$Q^\pi$ מבלי להטות את הגרדיאנט. עם $b(s)=V^\pi(s)$ המכפיל הופך ל**יתרון** $A^\pi(s,a)=Q^\pi(s,a)-V^\pi(s)$.

**Def (compatible function approximation).** אומד-ערך $Q(s,a;w)$ הוא *תואם* למדיניות אם 

$$\nabla_w Q(s,a;w)=\nabla_\theta\log\pi(a\mid s;\theta)$$

 (כלומר $Q$ לינארי במאפייני הציון של המדיניות). התאימות היא מה שהופך את שחקן-המבקר לבלתי-מוטה-בגרדיאנט.

## Key theorems & results

**Thm (Policy Gradient Theorem).** עבור ההחזר האפיזודי $J(\theta)=V^\pi(s_1)$,
$$\nabla_\theta J(\theta)=\sum_{s,a}\sum_{t=1}^{T}\Pr(s_t=s\mid s_1,\pi)\,Q_t^\pi(s,a)\,\nabla_\theta\pi(a\mid s;\theta),$$
כאשר 

$$Q_t^\pi(s,a)=r(s,a)+E_{s'}[V_{t+1}^\pi(s')]$$

 הוא ערך שארית המסלול ב-$[t,T]$. באופן שקול, דרך זהות פונקציית-הציון,
$$\nabla_\theta J(\theta)=E_\pi\Big[\sum_{t=1}^{T}Q_t^\pi(s,a)\,\nabla_\theta\log\pi(a\mid s;\theta)\Big].$$
באופן מכריע, הגרדיאנט אינו מכיל **שום איבר** עבור $\nabla_\theta$ של התפלגות המצבים $\Pr(s_t=s)$.

**רעיון ההוכחה:** גזור את 

$$V_1^\pi(s)=\sum_a\pi(a\mid s;\theta)Q_1^\pi(s,a)$$

 בכלל המכפלה; 

$$\nabla Q_1^\pi(s,a)=\sum_{s'}p(s'\mid s,a)\nabla V_2^\pi(s')$$

 (התגמולים אינם תלויים ב-$\theta$), וגלגול הנסיגה מתקפל טלסקופית לסכום על-פני $t$ משוקלל בהסתברויות ביקורי-המצבים.

**רלוונטיות למבחן:** התוצאה המרכזית — שנן את שתי הצורות ואת העובדה שגרדיאנט דינמיקת-הסביבה נופל. נשאל תדיר לנסח אותו, לגזור את גרסת פונקציית-הציון, או להתמחות בו (softmax/גאוסי/MAB).

**Thm (baseline invariance).** עבור כל פונקציה $b(s)$ של המצב בלבד, 

$$\sum_a b(s)\nabla_\theta\pi(a\mid s;\theta)=b(s)\nabla_\theta\sum_a\pi(a\mid s;\theta)=b(s)\nabla_\theta 1=0$$

מכאן
$$\nabla_\theta J(\theta)=E_\pi\big[(Q^\pi(s,a)-b(s))\,\nabla_\theta\log\pi(a\mid s;\theta)\big]$$
בלתי-מוטה עבור כל קו-בסיס; $b$ טוב רק מפחית שונות.

**רעיון ההוכחה:** המדיניות מנורמלת, ולכן הגרדיאנט שלה מסתכם לאפס על-פני הפעולות; הכפלה ב-$b(s)$ תלוי-מצב-בלבד משאירה אפס זה ללא שינוי.

**רלוונטיות למבחן:** שאלת ה"הוכח שחיסור קו-בסיס משאיר את האומד בלתי-מוטה" הסטנדרטית; טיעון השורה-האחת $\nabla\sum_a\pi=\nabla 1=0$ הוא העיקר.

**Prop (variance-minimizing baseline).** תחת "קפיצת האמונה" שכל $\nabla\log\pi$ בעלי גודל שווה, מזעור $E_\pi[(Q^\pi(s,a)-b(s))^2]$ נותן 

$$b(s)=E_{a\sim\pi}[Q^\pi(s,a)]=V^\pi(s)$$

ולכן המכפיל הטבעי הוא היתרון $A^\pi(s,a)=Q^\pi(s,a)-V^\pi(s)$.

**רעיון ההוכחה:** מזעֵר $E[(Q-b)^2]$ על-פני קבוע תלוי-מצב-בלבד הוא התוחלת המותנית $E[Q\mid s]=V^\pi(s)$.

**רלוונטיות למבחן:** מסביר מדוע $V^\pi$ הוא קו-הבסיס ה"ברירת-מחדל" ומדוע שחקן-מבקר יתרון הוא הצורה מופחתת-השונות.

**Thm (compatible function approximation / no bias).** אם $Q(s,a;w)$ תואם ($\nabla_w Q=\nabla_\theta\log\pi$) ו-$w$ ממזער את 

$$\mathrm{SE}(w)=E_\pi[(Q^\pi(s,a)-Q(s,a;w))^2]$$

אז המדיניות-גרדיאנט מדויק:
$$\nabla_\theta J(\theta)=E_\pi[\nabla_\theta\log\pi(a\mid s;\theta)\,Q(s,a;w)].$$

**רעיון ההוכחה:** במזעֵר, 

$$0=\nabla_w\mathrm{SE}(w)=E_\pi[(Q^\pi-Q(\cdot;w))\nabla_w Q(\cdot;w)]$$

הצב את התאימות $\nabla_w Q=\nabla_\theta\log\pi$ כדי לקבל 

$$E_\pi[Q^\pi\nabla\log\pi]=E_\pi[Q(\cdot;w)\nabla\log\pi]$$

כלומר החלפת $Q^\pi$ במבקר הנלמד $Q(\cdot;w)$ אינה מכניסה הטיה.

**רלוונטיות למבחן:** מצדיק את שחקן-מבקר — מבקר נלמד יכול להחליף את $Q^\pi$ האמיתי במשפט ה-PG ללא הטיה, בתנאי תאימות + התאמת least-squares.

## טכניקות וטריקים

- **REINFORCE (מדיניות-גרדיאנט מונטה-קרלו):** באופן חוזר (1) יצֵר אפיזודה $s_1,a_1,r_1,\dots,s_T,a_T,r_T$ באמצעות $\pi(\cdot\mid\cdot;\theta)$; (2) חשב החזרים $R_{t:T}=\sum_{i=t}^T r_i$; (3) עדכן 

  $$\theta\leftarrow\theta+\alpha\sum_{t=1}^T R_{t:T}\,\nabla_\theta\log\pi(a_t\mid s_t;\theta)$$

$R_{t:T}$ הוא אומד בלתי-מוטה של $Q_t^\pi$.
- **REINFORCE עם קו-בסיס (יתרון):** התאם גם מבקר $\hat V(s;w)$; השתמש ב-$\Gamma_{t:T}=R_{t:T}-\hat V(s_t;w)$; עדכונים 

  $$\Delta w=\alpha\sum_t\Gamma_{t:T}\nabla_w\hat V(s_t;w)$$

   ו- 

  $$\Delta\theta=\beta\sum_t\Gamma_{t:T}\nabla_\theta\log\pi(a_t\mid s_t;\theta)$$

כל $b(s)$ משאיר את עדכוני ה-$\theta$ בלתי-מוטים; $\hat V$ טוב מקצץ שונות.
- **שחקן-מבקר (TD):** המבקר מתחזק $\hat V(\cdot;w)$ ויוצר את שגיאת ה-TD 

  $$\Gamma_t=r_t+\gamma\hat V(s_{t+1};w)-\hat V(s_t;w)$$

ומעדכן $\Delta w=\alpha\Gamma_t\nabla_w\hat V$; השחקן מתחזק $\pi(\cdot;\theta)$ ומעדכן 

  $$\Delta\theta=\beta\Gamma_t\nabla_\theta\log\pi(a_t\mid s_t;\theta)$$

מבקר bootstrap ⇐ שונות נמוכה יותר אך מכניס הטיה (לא גרדיאנט "טהור").
- **גרדיאנטי ציון לזכור:** softmax ⇐ $\phi(s,a)-E_{b\sim\pi}[\phi(s,b)]$; גאוסי ⇐ $\frac{(a-\mu(s))}{\sigma^2}\phi(s)$.
- **הפרשים סופיים למדיניויות קופסה-שחורה:** כאשר המדיניות/סימולטור אטומים (למשל הליכת Aibo), הפרע כל פרמטר ב-$\pm\epsilon_i$, הרץ rollouts, וקבע 

  $$A_i=\mathrm{avg}(+\epsilon_i)-\mathrm{avg}(-\epsilon_i)$$

   (או $0$ אם הערך הלא-מופרע הוא הטוב-ביותר); צעד 

 $$\theta\leftarrow\theta+\alpha\,A/\|A\|$$

## נקודות רלוונטיות למבחן

- **מדוע אופטימיזציית מדיניות ישירה:** (i) כינוי-מצבים לאחר קידוד הופך את הבעיה ללא-מרקובית, ולכן המדיניות ה*חסרת-זיכרון* הטובה ביותר היא סטוכסטית (עולם-רשת מכונה); (ii) מצבי יריב/סכום-אפס (התאמת-מטבעות) דורשים את המדיניות המוגרלת $(\tfrac12,\tfrac12)$ — כל $\epsilon$-חמדני כמעט-דטרמיניסטי ניתן לניצול; (iii) מרחבי פעולה רציפים (מדיניות גאוסית).
- מדיניויות אופטימליות עבור MDP אמיתי הן דטרמיניסטיות — סטוכסטיות נדרשת רק בשל קידוד מצב לא-מושלם / תצפיתיות חלקית / יריבים.
- הגרדיאנט של משפט ה-PG **אינו** מכיל איבר $\nabla_\theta\Pr(s_t=s)$ — לעולם אינך גוזר את דינמיקת הסביבה.
- בדיקת שפיות MAB (מצב יחיד, 2 פעולות, softmax $p_i$, אופק 1): 

  $$\nabla J(\theta)=(r_1-r_2)p_1p_2(+1,-1)^\top$$

   — מאומת נומרית (אנליטי = הפרש-מרכזי עד 1e-5).
- REINFORCE = שונות גבוהה / בלתי-מוטה; קו-בסיס מפחית שונות ונשאר בלתי-מוטה; שחקן-מבקר (TD) מפחית שונות עוד יותר אך מוסיף הטיה.
- תנאי קירוב פונקציות תואם 

  $$\nabla_w Q(s,a;w)=\nabla_\theta\log\pi(a\mid s;\theta)$$

   + התאמת least-squares ⇐ המבקר יכול להחליף את $Q^\pi$ ללא הטיה.
- יתרונות מדיניות-גרדיאנט: פעולות רציפות/רבות-ממדים, מדיניויות סטוכסטיות, לעיתים קרובות התכנסות אמפירית טובה יותר. חסרונות: בדרך-כלל רק אופטימום **מקומי** (לעומת האופטימום הגלובלי של קירוב פונקציית-ערך לינארי), והערכת $J$ יקרה.
- יישומים: כוונון הליכת Aibo (מדיניות-גרדיאנט בהפרשים סופיים, מדיניות לא-ידועה), AlphaGo (3 שלבים: רשת מדיניות SL $p(a|s;\sigma)$, רשת מדיניות RL של משחק-עצמי $p(a|s;\rho)$ מאומנת ב- 

  $$\Delta\rho\propto\nabla\log p(a|s;\rho)\,z$$

רשת ערך $V(s;\theta)$, הסתכלות-קדימה MCTS).
