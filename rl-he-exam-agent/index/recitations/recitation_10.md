# תרגול 10 — בעיות שודד רב-זרועות סטוכסטיות

**File:** materials/recitations/recitation_10.pptx
**Pillar:** Bandits
**Summary:** פסאודו-חרטה ופירוקה לפערים לכל זרוע, חסם הריכוז של צ'רנוף-הופדינג, וגזירה מלאה של חסם החרטה $O(\log T)$ עבור UCB.

## בעיות פתורות

- **תרגיל 1 — פירוק החרטה.**
  הגדרה: זרועות $1,\dots,N$, תגמולים בלתי-תלויים ושווי-התפלגות, $\mu_i=\mathbb{E}[r_i]$, $\mu^*=\max_j\mu_j$, פער $\Delta_i=\mu^*-\mu_i$; $N_i(T)$ = מספר המשיכות של זרוע $i$. פסאודו-חרטה $\mathbb{E}[R_T]=\max_i\mathbb{E}[\sum_t r_i^t]-\mathbb{E}[\sum_t r_{I_t}^t]$.
  הוכיחו: $\displaystyle \mathbb{E}[R_T]=\sum_{i=1}^N \mathbb{E}[N_i(T)]\,\Delta_i$.
  שיטה: לפי לינאריות,

  $$\max_i\sum_t\mathbb{E}[r_i^t]-\sum_t\mathbb{E}[r_{I_t}^t]=\sum_t(\mu^*-\mathbb{E}[\mu_{I_t}])=\mathbb{E}\sum_t\Delta_{I_t}$$

  ואז כתבו $\Delta_{I_t}=\sum_i \mathbb{1}[I_t=i]\Delta_i$ והחליפו סדר סכימה כך ש-$\sum_t\mathbb{1}[I_t=i]=N_i(T)$. מצמצם את החרטה ל"ספירת משיכות תת-אופטימליות, משוקללות בפעריהן".

- **גזירה מרכזית — חסם החרטה של UCB.**
  **Thm (UCB).** $\displaystyle R_T\le\sum_{i:\Delta_i>0}\frac{8\log T}{\Delta_i}+\frac{2}{T}.$
  אינדקס UCB: משכו $\arg\max_i\big(\hat\mu_t(i)+\lambda_t(i)\big)$ עם $\lambda_t(i)=\sqrt{2\log T/n_t(i)}$.
  שלד ההוכחה (נעבד על השקפים):
  1. הגדירו מאורעות טובים $A_t:\hat\mu_t(i)\le\mu_i+\sqrt{2\log T/n_t(i)}$ ו-$B_t:\hat\mu_t(1)\ge\mu_1-\sqrt{2\log T/n_t(1)}$ (זרוע 1 אופטימלית, בה"כ).
  2. לפי צ'רנוף-הופדינג עם $\epsilon_m=\sqrt{8\log T/m}$ וחסם איחוד מעל $m\le T$:

     $$\Pr[\neg A_t]\le\sum_{m=1}^T e^{-4\log T/m\cdot m}=\sum_m T^{-4}\le T^{-3}$$

     זהה עבור $B_t$.
  3. כאשר שניהם מתקיימים, זרוע תת-אופטימלית $i$ נמשכת רק כל עוד היא תת-נדגמת; שרשור שני אי-השוויונים נותן $\sqrt{2\log T/n_t(i)}\ge\Delta_i/2$, כלומר $n_t(i)\le 8\Delta_i^{-2}\log T$.
  4. המאורעות נכשלים בהסתברות כוללת $\le 2/T^2$, ותורמים $\le T\cdot 2/T^2=2/T$ לחרטה. סכימה מעל הזרועות התת-אופטימליות: $\mathbb{E}[R_T]\le\sum_{i\ne1}\Delta_i\cdot\frac{8\log T}{\Delta_i^2}+\frac{2}{T}=\sum_{i\ne1}\frac{8\log T}{\Delta_i}+\frac{2}{T}$.

## טכניקות מפתח

- **אי-שוויון צ'רנוף-הופדינג.** עבור $X_i\in[a_i,b_i]$ בלתי-תלויים: $\Pr\big[\frac1m\sum X_i-\frac1m\sum\mathbb{E}X_i\ge\epsilon\big]\le\exp\!\big(-\frac{2\epsilon^2 m^2}{\sum(b_i-a_i)^2}\big)$; עבור $X_i\in[0,1]$ זהו $\exp(-2\epsilon^2 m)$.
- **פירוק החרטה** $\mathbb{E}[R_T]=\sum_i\mathbb{E}[N_i(T)]\Delta_i$ — סוס-העבודה שהופך כל ניתוח חרטה לחסימת מספרי המשיכות התת-אופטימליות.
- **חסמי ביטחון** $UCB_t(i)=\hat\mu_t(i)+\lambda_t(i)$, $LCB_t(i)=\hat\mu_t(i)-\lambda_t(i)$; "המאורע הטוב" שכל ה-$\mu_i$ נמצאים בקטעיהם מתקיים בהסתברות $\ge 1-2/T^2$.
- **חסם איחוד מעל מספר הדגימות** $m\le T$ כדי להפוך את רדיוס הביטחון לתקף בכל סבב בו-זמנית.
- טקסונומיית אלגוריתמים: מזעור-חרטה (explore-then-exploit, חיסול עוקב, UCB) מול זיהוי הזרוע הטובה ביותר / PAC (נאיבי, חיסול עוקב, חציון).

## רלוונטיות למבחן

- "גזרו / נסחו את חסם החרטה של UCB" ושחזרו את הטיעון של מאורע-טוב + הופדינג + חסם-איחוד.
- הוכיחו או השתמשו בפירוק הפסאודו-חרטה $\sum_i\mathbb{E}[N_i(T)]\Delta_i$.
- החילו הופדינג לקביעת גודל של קטע ביטחון או לחסימת סיבוכיות הדגימה של סכמת שודד explore-then-exploit / PAC.
