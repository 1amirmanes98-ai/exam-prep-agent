# תרגול 09 — מדיניות-גרדיאנט

**File:** materials/recitations/recitation_09.pptx
**Pillar:** Approximation
**Summary:** שיטות מדיניות-גרדיאנט (REINFORCE, בסיס, שחקן-מבקר) וכיצד לגזור את הציון $\nabla_\theta\ln\pi$ עבור מדיניות פרמטרית בדידה (ברנולי-לוגיסטית / softmax) ורציפה (גאוסיאנית).

## בעיות פתורות

- **תרגיל 1 — יחידת ברנולי-לוגיסטית (בדיד, 2 פעולות).**
  הגדרה: שתי פעולות $a\in\{0,1\}$ עם העדפות $h(s,1,\theta)-h(s,0,\theta)=\theta^\top x(s)$; היחידה מוציאה את פעולה $1$ בהסתברות $p_t$.
  - *חלק (a) — הראו ש-softmax מצטמצם לסיגמואיד.* עם softmax מעל שתי ההעדפות,

    $$p_t=\pi(1\mid s,\theta)=\dfrac{e^{h(s,1,\theta)}}{e^{h(s,1,\theta)}+e^{h(s,0,\theta)}}=\dfrac{1}{1+e^{-(\theta^\top x(s))}}$$

    כלומר הלוגיסטי/סיגמואיד של $\theta^\top x(s)$.
  - *חלק (b) — עדכון REINFORCE (מונטה-קרלו).* עם קבלת ההחזר $G_t=\sum_{i=t}^T r_i$: $\;\Delta\theta=\alpha\,G_t\,\nabla_\theta\ln\pi(a_t\mid s_t,\theta)$.
  - *חלק (c) — הציון.* נגדיר $g(s;\theta)=\theta^\top x(s)$ כך ש-$\partial p_t/\partial g=p_t(1-p_t)$. גזירת נראות-הלוג לכל פעולה ($\nabla_g\ln p_t=1-p_t$, $\nabla_g\ln(1-p_t)=-p_t$) ושילובן:
    $$\nabla_\theta\ln\pi(a\mid s,\theta)=\big[a(1-p_t)-(1-a)p_t\big]\,x(s)=(a-p_t)\,x(s).$$
    (פישוט מרכזי: הביטוי בסוגריים מצטמצם ל-$a-p_t$, "פעולה פחות ההסתברות שלה".)

- **תרגיל 2 — מדיניות גאוסיאנית (מרחב פעולות רציף).**
  הגדרה:

  $$\pi(a\mid s,\theta)=\dfrac{1}{\sigma(s,\theta)\sqrt{2\pi}}\exp\!\Big(-\dfrac{(a-\mu(s,\theta))^2}{2\sigma(s,\theta)^2}\Big)$$

  כאשר וקטור הפרמטרים מפוצל $\theta=(\theta_\mu,\theta_\sigma)$, ממוצע $\mu=\theta_\mu^\top x(s)$ (לינארי) וסטיית תקן $\sigma=\exp(\theta_\sigma^\top x(s))$ (אקספוננט של לינארי, כדי להישאר חיובי).
  - *גרדיאנט הממוצע:* $\displaystyle\nabla_{\theta_\mu}\ln\pi(a\mid s,\theta)=\frac{a-\mu(s,\theta)}{\sigma(s,\theta)^2}\,x(s)$.
  - *גרדיאנט סטיית התקן:* $\displaystyle\nabla_{\theta_\sigma}\ln\pi(a\mid s,\theta)=\Big(\frac{(a-\mu(s,\theta))^2}{\sigma(s,\theta)^2}-1\Big)\,x(s)$.
    (הפרמטריזציה עם $\exp$ נותנת $\nabla_{\theta_\sigma}\sigma=\sigma\,x(s)$, המבטלת את ה-$1/\sigma$ הנוסף ומותירה צורה נקייה וחסרת-ממד.)

## טכניקות מפתח

- **משפט מדיניות-גרדיאנט** (אפיזודי/אופק סופי): $\nabla J(\theta)\propto\sum_s\mu(s)\sum_a Q^\pi(s,a)\nabla_\theta\pi(a\mid s;\theta)=\mathbb{E}_\pi\big[\sum_{t} Q^\pi(s_t,a_t)\nabla_\theta\ln\pi(a_t\mid s_t;\theta)\big]$, כאשר $\mu(s)$ היא מידת ביקור-המצבים הצפויה.
- **טריק נגזרת-הלוג ("פונקציית ציון")** — הפיכת $\nabla\pi$ ל-$\pi\,\nabla\ln\pi$ כך שהגרדיאנט הופך לתוחלת שניתן לדגום.
- **REINFORCE** (אומדן מונטה-קרלו של ההחזר), **REINFORCE עם בסיס** ($\Gamma_t=R_{t:T}-V(s_t;w)$ מפחית שונות; עדכון המבקר $\Delta w=\alpha\Gamma_t\nabla_w V$, השחקן $\Delta\theta=\beta\Gamma_t\nabla_\theta\ln\pi$), ו**שחקן-מבקר** (bootstrap $\Gamma_t=r_t+Q(s_{t+1},a_{t+1};w)-Q(s_t,a_t;w)$).
- גזירת הציון עבור מדיניות **softmax/סיגמואיד** של שתי פעולות ועבור מדיניות **גאוסיאנית** — שתי הפרמטריזציות הקנוניות הנבחנות.

## רלוונטיות למבחן

- "בהינתן פרמטריזציית מדיניות $\pi_\theta$, גזרו את $\nabla_\theta\ln\pi$ וכתבו את עדכון REINFORCE/שחקן-מבקר" — softmax (בדיד) וגאוסיאני (רציף) הם הווריאנטים הסטנדרטיים.
- ניסוח משפט מדיניות-גרדיאנט וזיהוי תפקיד הבסיס (הפחתת שונות, חוסר-הטיה).
- השוואת מדיניות-גרדיאנט מול קירוב פונקציות מבוסס-ערך (יתרונות: פעולות רציפות, חקירה סטוכסטית, התכנסות טובה יותר; חסרונות: מינימות מקומיות, הערכה איטית/רבת-שונות).
