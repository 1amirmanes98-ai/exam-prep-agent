# הרצאה 6 — הכללה 1
- **File:** materials/lectures/lecture_06_generalization_1.pdf | **Text:** materials/text/lectures/lecture_06_generalization_1.txt
- **Pillar:** Generalization
- **One-paragraph summary:** מעמידה את המסגרת הפורמלית של למידה מונחית עבור עמוד ההכללה ומציבה את המטרה המרכזית: חסמים שלאחר-אימון מהצורה $L_D(\hat h)-L_S(\hat h)\le \Delta(m,\delta,H,\hat h,S)$ המתקיימים בהסתברות $\ge 1-\delta$ על פני $S\sim D^m$, אשר צריכים להיות גם הדוקים וגם מלמדים (אומדן שגיאת-הולידציה הדוק אך חסר-תובנה). היא מתעדת ארבע תופעות אמפיריות (Zhang et al.) לגבי רשתות בעלות פרמטריזציית-יתר — הכללה טובה ללא רגולריזציה מפורשת, התאמה מושלמת של תוויות שרירותיות/אקראיות, מסגרות של נתונים חלקית-אקראיים, שיבוש עוין של תוויות — ומשתמשת בהן כמבחני-הפרכה לארבע משפחות של חסמים: התכנסות אחידה דרך דיסקרטיזציה (נכשלת: זקוקה ל-$m\gtrsim$ מספר-הביטים, עיוורת-להתפלגות, מתעלמת מ-$\hat h$), דחיסה (יורשת את ההכללה של מחלקה קטנה $H'$ במחיר $2\rho\, d(\hat h,H')$; דוגמת דחיסה-לדרגה-1), חסמים מבוססי-מורכבות-Rademacher/נורמה (תלויי-נתונים, אך רק דרך $\max_i\|x_i\|$, ואקספוננציאליים בעומק), ו-PAC-Bayes (חסם KL-ל-prior; ההצבה של prior/posterior גאוסיאניים מניבה את קריטריון ה"מינימום שטוח + נורמה נמוכה" ותלויה הן ב-$\hat h$ והן ב-$S$, כך שהיא יכולה עקרונית להסביר את כל ארבע התופעות, אם כי היא לא-אנליטית ורופפת נומרית). לקח חוזר: חסמים הדוקים חייבים להיות תלויים במפורש בהשערה הנלמדת $\hat h$ ובקבוצת האימון $S$.

## Outline
0. **הכנה (הקדמה, לא-ממוספרת).** מסגרת הלמידה ($X,Y,D,S,H,\ell,L_D,L_S$), החסם המבוקש $\Delta(m,\delta,H,\hat h,S)$, ודוגמת שגיאת-הולידציה: הדוקה (Hoeffding) אך לא-מלמדת.
1. **תופעות אמפיריות.** ארבע עובדות (Zhang et al. [7]) לגבי רשתות סטנדרטיות בעלות פרמטריזציית-יתר שכל תיאוריה מועמדת חייבת לשחזר.
2. **חסמי הכללה.** ארבע גישות:
   - 2.1 **התכנסות אחידה.** חִסמו את $L_D-L_S$ במשותף על פני כל $h\in H$; הגזירה הפשוטה ביותר דרך דיסקרטיזציה ($|H|\le 2^b$); מדוע UC לבדה אינה מספיקה.
   - 2.2 **דחיסה.** $\hat h$ הניתנת לקירוב על ידי $h'\in H'$ (מחלקה קטנה) יורשת את ההכללה של $H'$ + שארית Lipschitz; דוגמה: דחיסת מטריצות משקל לדרגה 1, רקורסיית שגיאת נורמה-ספקטרלית.
   - 2.3 **מורכבות Radamacher ונורמות** (איות הסיכומים; הסטנדרטי: Rademacher). מורכבות תלוית-נתונים $R(\ell\circ H\circ S)$; חסם הכללה; איחוד על פני תת-מחלקות מקוננות $H_1\subseteq H_2\subseteq\cdots$; חסם מבוסס-נורמה (מכפלת נורמות Frobenius) וחסרונותיו.
   - 2.4 **PAC-Bayes.** חסמים עבור התפלגויות $Q$ על $H$ במונחי $\mathrm{KL}(Q\|P)$ ל-prior בלתי-תלוי-נתונים $P$; הצבה גאוסיאנית → מינימות שטוחות ונורמת פרמטרים נמוכה.

## Key definitions
**Def (learning setting).** $X\subseteq\mathbb{R}^d$ מרחב מופעים; $Y\subseteq\mathbb{R}^k$ מרחב תוויות; $D$ ההתפלגות (הלא ידועה) של העולם על $X\times Y$; $S=\{(x_i,y_i)\}_{i=1}^m\sim D^m$ קבוצת אימון i.i.d.; $H=\{h_\theta: X\to\mathbb{R}^k \,|\, \theta\in\Theta\}$ מרחב השערות (מנבאים הניתנים למימוש על ידי הארכיטקטורה, מרחב פרמטרים $\Theta$); $\ell: Y\times\mathbb{R}^k\to\mathbb{R}_{\ge 0}$ הפסד, בהנחה שהוא **חסום (בה"כ ב-$[0,1]$) ו-$\rho$-Lipschitz בארגומנט השני שלו**.

**Def (population / training loss).** $L_D(h):=\mathbb{E}_{(x,y)\sim D}[\ell(y,h(x))]$; $L_S(h):=\mathbb{E}_{(x,y)\sim S}[\ell(y,h(x))]=\frac{1}{m}\sum_{i=1}^m \ell(y_i,h(x_i))$.

**Def (goal: generalization bound).** עבור כל $\delta\in(0,1)$, בהסתברות $\ge 1-\delta$ על פני $S\sim D^m$: $L_D(\hat h)-L_S(\hat h)\le \Delta(m,\delta,H,\hat h,S)$, כאשר $\hat h\in H$ היא ההשערה המוחזרת על ידי אלגוריתם האימון ו-$\Delta(\cdot)$ תלויה רק בארגומנטים שלה (ובקבועים).

**Def (validation error).** למדו את $\hat h$ על $m/2$ הדוגמאות הראשונות; $L_V(\hat h):=\frac{2}{m}\sum_{i=m/2+1}^{m}\ell(y_i,\hat h(x_i))$.

**Def (compression distance).** עבור $h\in H$ ומחלקה קטנה יותר $H'$: $d(h,H'):=\min_{h'\in H'}\sup_{x\in X}\|h(x)-h'(x)\|$ (גודל שארית הדחיסה).

**Def 1 (Rademacher complexity).** עבור $\ell\circ H\circ S:=\{(\ell(y_1,h(x_1)),\dots,\ell(y_m,h(x_m))) : h\in H\}\subseteq\mathbb{R}^m$,

$$R(\ell\circ H\circ S):=\frac{1}{m}\,\mathbb{E}_{\xi}\Big[\sup_{v\in \ell\circ H\circ S}\sum_{i=1}^m \xi_i v_i\Big],$$

כאשר $\xi_1,\dots,\xi_m$ הם i.i.d. עם $\Pr(\xi_i=1)=0.5=\Pr(\xi_i=-1)$. פרשנות: יכולתה של $H$ להתאים (הפסד נמוך) תת-קבוצה אקראית של $S$ תוך "אנטי-התאמה" (הפסד גבוה) של השארית.

**Def (norm-bounded subclass $H_c$).** עבור רשת ReLU מחוברת-לחלוטין הזנה-קדימה $H=\{x\mapsto W_N\sigma(W_{N-1}(\cdots\sigma(W_1x)\cdots))\}$ עם $x\in\mathbb{R}^d$, $y\in\mathbb{R}$, $W_1\in\mathbb{R}^{d',d}$, $W_2,\dots,W_{N-1}\in\mathbb{R}^{d',d'}$, $W_N\in\mathbb{R}^{1,d'}$, $\sigma(z)=\max\{z,0\}$, ללא הטיות: עבור $c>0$,

$$H_c:=\Big\{h\in H : \exists\, W_1,\dots,W_N \text{ s.t. } \prod_{n=1}^N\|W_n\|_F\le c \,\wedge\, h(x)\equiv W_N\sigma(W_{N-1}(\cdots\sigma(W_1x)\cdots))\Big\}.$$

**Def (losses of a distribution over hypotheses).** עבור התפלגות $Q$ על $H$: $L_D(Q):=\mathbb{E}_{h\sim Q}[L_D(h)]$, $L_S(Q):=\mathbb{E}_{h\sim Q}[L_S(h)]$.

**Def 2 (KL divergence).** $\mathrm{KL}(Q\|P):=\mathbb{E}_{h\sim Q}\big[\ln\frac{Q(h)}{P(h)}\big]$.

## Key theorems & results
**Empirical phenomena (Zhang et al. [7]).** (1) רשתות נוירונים סטנדרטיות (למשל, AlexNet) המאומנות באלגוריתמים סטנדרטיים (SGD+momentum) על נתונים סטנדרטיים (CIFAR-10) מכלילות היטב **ללא כל רגולריזציה מפורשת**, אפילו עם מספר-פרמטרים $\gg$ מספר-דוגמאות. (2) במשטר זה שגיאת האימון $\approx 0$, וזה מתמיד עבור למעשה **כל** קבוצת אימון באותו גודל — אפילו מופעים ו/או תוויות אקראיים מותאמים באופן מושלם. (3) אם **מחצית** מקבוצת האימון מוחלפת בנתונים אקראיים (מופעים ותוויות אקראיים), שגיאת הבדיקה של ההשערה הנלמדת (שגיאת אימון $\approx 0$) היא **טובה בהרבה מטריוויאלית**. (4) מניפולציה **עוינת** של מחצית תוויות האימון יכולה להדרדר משמעותית את שגיאת הבדיקה (שגיאת האימון עדיין $\approx 0$). (תרגיל: שחזרו ניסויית.)

**רלוונטיות למבחן:** אלה אמות המידה; דעו איזה חסם נכשל באיזו תופעה.

**Fact (validation bound; Hoeffding).** כיוון ש-$\ell\in[0,1]$: $\Pr\big(|L_V(\hat h)-L_D(\hat h)|\ge\epsilon\big)\le 2\exp(-m\epsilon^2)$, ומכאן עבור כל $\delta\in(0,1)$, בהסתברות $\ge 1-\delta$: $L_D(\hat h)-L_V(\hat h)\le\sqrt{\ln\frac{2}{\delta}\cdot\frac{1}{m}}$.

**רעיון ההוכחה:** Hoeffding על $m/2$ ההפסדים המופרשים ה-i.i.d.; $\hat h$ בלתי-תלויה בהם.

**רלוונטיות למבחן:** אב-טיפוס של "הדוק אך לא-מלמד."

**Prop 1 (finite-class / discretization UC bound).** אם $|H|\le 2^b$ ($b$ = מספר-הביטים לייצוג המשקלים) אזי עבור כל $\delta\in(0,1)$, בהסתברות $\ge 1-\delta$ על פני $S\sim D^m$:

$$L_D(\hat h)-L_S(\hat h)\le\sqrt{\frac{(b+1)\ln(2)+\ln\big(\frac{1}{\delta}\big)}{2m}}.$$

**רעיון ההוכחה:** עבור $h$ קבוע, Hoeffding נותן $\Pr(|L_D(h)-L_S(h)|\ge\epsilon)\le 2e^{-2m\epsilon^2}$; חסם איחוד על פני $|H|$ השערות; פתרו $2|H|e^{-2m\epsilon^2}=\delta$, השתמשו ב-$|H|\le 2^b$. למעשה מוכיח את הדו-צדדי $\forall h\in H: |L_D(h)-L_S(h)|\le\sqrt{\frac{1}{2m}\ln\frac{2|H|}{\delta}}$.

**רלוונטיות למבחן:** דעו את הקבועים $(b+1)\ln 2$ ומדוע אי-ריקנות זקוקה ל-$m\gtrsim b$ (בפרקטיקה $b\gg m$).

**Prop 2 (compression bound).** אם $|H'|\le 2^b$ אזי עבור כל $\delta\in(0,1)$, בהסתברות $\ge 1-\delta$ על פני $S\sim D^m$:

$$L_D(\hat h)-L_S(\hat h)\le\sqrt{\frac{(b+1)\ln(2)+\ln\big(\frac{1}{\delta}\big)}{2m}}+2\rho\cdot d(\hat h,H'),$$

$\rho$ = קבוע ה-Lipschitz של $\ell$. רעיון ההוכחה: יישמו את Prop 1 על $H'$; קחו $\hat h'\in\arg\min_{h'\in H'}\sup_x\|\hat h(x)-h'(x)\|$; חִסמו $L_S(\hat h)-L_S(\hat h')\le\rho\, d(\hat h,H')$ באמצעות Lipschitz-יות, וכן $L_D(\hat h)-L_D(\hat h')\le\rho\, d(\hat h,H')$ באמצעות Jensen + Lipschitz-יות; פרקו $L_D(\hat h)-L_S(\hat h)\le [L_D(\hat h')-L_S(\hat h')]+2\rho\, d(\hat h,H')$.

**רלוונטיות למבחן:** גורם $2\rho$ (אחד $\rho d$ מצד האימון, אחד מצד האוכלוסייה); הנחת יסוד = זיקוק ידע.

**Example (rank-1 compression of an FC network).** $H=\{x\mapsto W_N\sigma(W_{N-1}(\cdots\sigma(W_1x)\cdots)) : W_n\in\mathbb{R}^{d,d}\}$ (כל הממדים $=d$, ללא הטיות), $\sigma$ נקודתית $\gamma$-Lipschitz עם $\sigma(0)=0$, $X=\{x:\|x\|\le 1\}$; $H'$ = אותה רשת עם כל $W_n$ מוגבלת לדרגה 1 ($W_n=u_nv_n^\top$): $2Nd$ לעומת $Nd^2$ פרמטרים. עם $W_n'$ הקירוב הטוב ביותר מדרגה 1 של $W_n$ ושגיאות $e_n(x)$ המוגדרות שכבתית, מקבלים $e_1(x)\le\|W_1-W_1'\|_{\mathrm{spectral}}\|x\|$ ואת הרקורסיה

$$e_n(x)\le \|W_n-W_n'\|_{\mathrm{spectral}}\cdot\gamma^{n-1}\prod_{j=1}^{n-1}\|W_j\|_{\mathrm{spectral}} + \|W_n\|_{\mathrm{spectral}}\cdot\gamma\cdot e_{n-1}(x),$$

(בשימוש ב-$\|W_n'\|_{\mathrm{spectral}}=\|W_n\|_{\mathrm{spectral}}$, כיוון שהקירוב הטוב ביותר מדרגה 1 משמר את הנורמה הספקטרלית), אשר באינדוקציה נותן

$$d(h,H')\le\sup_{x:\|x\|\le1} e_N(x)\le \gamma^{N-1}\sum_{n=1}^{N}\ \prod_{j\in[N]\setminus\{n\}}\|W_j\|_{\mathrm{spectral}}\cdot\|W_n-W_n'\|_{\mathrm{spectral}}.$$

**רעיון ההוכחה:** אי-שוויון המשולש המפצל את ההפרש של שכבה $n$ ל"שינוי $W_n$" + "הפצת שגיאת שכבה-נמוכה"; $\|\sigma(v)\|\le\gamma\|v\|$ מ-$\sigma(0)=0$.

**רלוונטיות למבחן:** לימוד מטריצות כמעט-דרגה-1 ⇒ איבר דחיסה קטן ⇒ חסם הכללה קטן.

**Thm 1 (Rademacher generalization bound; Thm 26.5 in Shalev-Shwartz–Ben-David [6]).** עבור כל $\delta\in(0,1)$, בהסתברות $\ge 1-\delta$ על פני $S\sim D^m$:

$$\forall h\in H:\quad L_D(h)-L_S(h)\le 2\,R(\ell\circ H\circ S)+4\sqrt{\frac{2\ln\big(\frac{4}{\delta}\big)}{m}}.$$

**רעיון ההוכחה:** בתרגול (לא בסיכומים אלה).

**רלוונטיות למבחן:** הצורה החשופה אינה מספיקה — לפי תופעה (2), $H$ בעלת פרמטריזציית-יתר מתאימה תוויות שרירותיות ⇒ $R(\ell\circ H\circ S)$ גבוה; יש לחסום את $R$ על תת-מחלקות משמעותיות.

**Prop 3 (union over nested subclasses).** יהיו $H_1\subseteq H_2\subseteq\cdots$ עם $\bigcup_{k=1}^\infty H_k=H$. אזי עבור כל $\delta\in(0,1)$, בהסתברות $\ge 1-\delta$:

$$\forall k\in\mathbb{N},\ \forall h\in H_k:\quad L_D(h)-L_S(h)\le 2\,R(\ell\circ H_k\circ S)+4\sqrt{\frac{2\ln\big(\frac{2\pi^2}{3}\cdot k^2\cdot\frac{1}{\delta}\big)}{m}}.$$

**רעיון ההוכחה:** קבעו $\delta_k':=\frac{6}{\pi^2}\cdot\frac{1}{k^2}\cdot\delta$; יישמו את Thm 1 לכל $k$ עם $\delta_k'$; $\sum_k \delta_k'=\delta$ (Basel: $\sum_k\frac{6}{\pi^2 k^2}=1$); חסם איחוד. שימו לב $\frac{4}{\delta_k'}=\frac{2\pi^2}{3}\cdot\frac{k^2}{\delta}$.

**Example (norm-based bound; Neyshabur et al. [4]).** עבור $H_c$ כמוגדר לעיל, ניתן להראות ש-

$$R(\ell\circ H_c\circ S)\le\frac{c\cdot\rho\cdot 2^{N-1}\cdot\max_{i\in[m]}\|x_i\|}{\sqrt{2m}}.$$

בשילוב עם Prop 3 (תת-מחלקות $H_k$, $k\in\mathbb{N}$), בהסתברות $\ge 1-\delta$:

$$L_D(\hat h)-L_S(\hat h)\le\frac{\sqrt{2}\cdot 2^{N-1}\cdot\rho\cdot\max_{i\in[m]}\|x_i\|\cdot k+\sqrt{2\ln\big(\frac{2\pi^2}{3}\cdot k^2\cdot\frac{1}{\delta}\big)}}{\sqrt{m}},$$

כאשר $k:=\min\{k'\in\mathbb{N}: \exists W_1,\dots,W_N \text{ s.t. } \prod_{n=1}^N\|W_n\|_F\le k' \wedge \hat h(x)\equiv W_N\sigma(W_{N-1}(\cdots\sigma(W_1x)\cdots))\}$. (כפי שמודפס בסיכומים; הצבה מילולית של Prop 3 הייתה נושאת גורם 4 לפני הרדיקל השני.) חסרונות: (i) גדל אקספוננציאלית עם העומק $N$ (מחסם ה-$R$; מוקל על ידי Golowich et al. [2]); (ii) תלוי ב-$S$ רק דרך $\max_i\|x_i\|$ ⇒ **אינו יכול להסביר את תופעה (3)**.

**Thm 2 (PAC-Bayes; Thm 31.1 in Shalev-Shwartz–Ben-David [6]).** יהי $P$ prior על $H$ (נבחר בלתי-תלוי ב-$S$), $\delta\in(0,1)$. אזי בהסתברות $\ge 1-\delta$ על פני $S\sim D^m$, **עבור כל** ההתפלגויות $Q$ על $H$ (אפילו תלויות-$S$):

$$L_D(Q)-L_S(Q)\le\sqrt{\frac{\mathrm{KL}(Q\|P)+\ln\big(\frac{2m}{\delta}\big)}{2(m-1)}}.$$

**רעיון ההוכחה:** הגדירו $f(S):=\sup_{Q}\big[2(m-1)\mathbb{E}_{h\sim Q}[\Delta(h)^2]-\mathrm{KL}(Q\|P)\big]$ עם $\Delta(h):=L_D(h)-L_S(h)$; החלפת מידה + Jensen נותנים $f(S)\le\ln\mathbb{E}_{h\sim P}[e^{2(m-1)\Delta(h)^2}]$; החלפת $\mathbb{E}_S,\mathbb{E}_{h\sim P}$ (אי-תלות) וזנב Hoeffding + נוסחת סכום-הזנב נותנים $\mathbb{E}_S[e^{2(m-1)\Delta(h)^2}]\le 2m$; Markov על $e^{f(S)}$ עם $\delta=2m/e^\epsilon$; סיימו עם Jensen $(\mathbb{E}_Q[\Delta])^2\le\mathbb{E}_Q[\Delta^2]$.

**רלוונטיות למבחן:** ההוכחה המלאה ניתנה בכיתה — מועמד מוביל לשאלת הוכחה; דעו מדוע $P$ אסור שיהיה תלוי ב-$S$ אך $Q$ מותר.

**Lem 1 (KL between multivariate Gaussians).** עבור $\Sigma_0,\Sigma_1$ לא-סינגולריות (PD) על $\mathbb{R}^r$:

$$\mathrm{KL}\big(N(\mu_0,\Sigma_0)\,\|\,N(\mu_1,\Sigma_1)\big)=\frac{1}{2}\Big(\mathrm{Tr}(\Sigma_1^{-1}\Sigma_0)+(\mu_1-\mu_0)^\top\Sigma_1^{-1}(\mu_1-\mu_0)-r+\ln\frac{\det(\Sigma_1)}{\det(\Sigma_0)}\Big).$$

(תרגיל: הוכיחו.)

**Example (PAC-Bayes for NNs; Dziugaite–Roy [1], Neyshabur et al. [5]).** $\Theta=\mathbb{R}^r$; prior $P=N(0,\sigma^2 I)$ (תואם אתחול אקראי מקובל); posterior $Q=N(\hat\theta,\bar\sigma^2 I)$, $\hat\theta$ = הפרמטרים המאומנים. לפי Lem 1: $\mathrm{KL}(Q\|P)=\frac{1}{2}\big(r\frac{\bar\sigma^2}{\sigma^2}+\frac{1}{\sigma^2}\|\hat\theta\|^2-r+r\ln(\sigma^2)-r\ln(\bar\sigma^2)\big)$, ממוזער על פני $\bar\sigma^2$ ב-$\bar\sigma^2=\sigma^2$, ונותן $\mathrm{KL}(Q\|P)=\frac{1}{2\sigma^2}\|\hat\theta\|^2$. בהצבה ב-Thm 2:

$$L_D(Q)\le \mathbb{E}_{\theta\sim N(\hat\theta,\sigma^2 I)}[L_S(h_\theta)]+\sqrt{\frac{\frac{1}{2\sigma^2}\|\hat\theta\|^2+\ln\big(\frac{2m}{\delta}\big)}{2(m-1)}}.$$

פרשנות: חסם נמוך אם ורק אם הפתרון (1) הוא **מינימום שטוח** (הפסד האימון הממוצע על פני סביבה גאוסיאנית של $\hat\theta$ נמוך — השוו Keskar et al. [3]) ו-(2) בעל **נורמה נמוכה** $\|\hat\theta\|$. הערובה חלה על ההתפלגות $Q$ (רשת סטוכסטית הדוגמת משקלים מ-$Q$ לכל ניבוי), לא על $\hat\theta$ עצמה, אלא אם חוסמים בנוסף את $L_D(h_{\hat\theta})-\mathbb{E}_{\theta\sim N(\hat\theta,\sigma^2 I)}[L_S(h_\theta)]$. הסתייגויות: איבר הסביבה לא-אנליטי (ניתן לאמידה רק על ידי דגימה); הערכים על רשתות אמיתיות רחוקים מלהיות הדוקים (כמו בכל החסמים הידועים).

## טכניקות וטריקים
- אי-שוויון Hoeffding עבור הפסדים חסומים ($\ell\in[0,1]$): $\Pr(|L_D(h)-L_S(h)|\ge\epsilon)\le 2e^{-2m\epsilon^2}$ עבור (בלתי-תלוי-$S$) $h$ **קבוע**; ואז חסם איחוד על פני מחלקה סופית ("דיסקרטיזציה": $b$ ביטים ⇒ $|H|\le 2^b$).
- פרקו את הפער דרך השערה דחוסה: $L_D(\hat h)-L_S(\hat h)\le[L_D(\hat h')-L_S(\hat h')]+[L_D(\hat h)-L_D(\hat h')]+[L_S(\hat h)-L_S(\hat h')]$; שלטו בשניים האחרונים באמצעות $\rho$-Lipschitz-יות של $\ell$ (אי-שוויון Jensen עבור איבר האוכלוסייה).
- רקורסיית שגיאה של קילוף-שכבות עבור רשתות עמוקות: אי-שוויון המשולש לכל שכבה + תת-כפליות של הנורמה הספקטרלית + $\|\sigma(v)\|=\|\sigma(v)-\sigma(0)\|\le\gamma\|v\|$; אינדוקציה מניבה חסמי מכפלת-נורמות-ספקטרליות.
- הקירוב הטוב ביותר מדרגה 1 משמר את הנורמה הספקטרלית: $\|W'\|_{\mathrm{spectral}}=\|W\|_{\mathrm{spectral}}$.
- חסם איחוד בן-מנייה עם משקלים $\delta_k'=\frac{6}{\pi^2 k^2}\delta$ (כך ש-$\sum_k\delta_k'=\delta$) כדי לקבל חסמים בו-זמנית עבור כל אינדקסי תת-המחלקה $k$.
- מכונת PAC-Bayes: אי-שוויון Markov על $e^{f(S)}$; החלפת מידה $\mathbb{E}_{h\sim Q}[\ln(e^{g(h)}\frac{P(h)}{Q(h)})]\le\ln\mathbb{E}_{h\sim P}[e^{g(h)}]$ באמצעות Jensen; החליפו $\mathbb{E}_S\mathbb{E}_{h\sim P}$ באמצעות אי-תלות; נוסחת סכום-הזנב $\mathbb{E}[V]=\int_0^\infty\Pr(V\ge\beta)d\beta$ עם החלפת משתנים $\beta=e^{2(m-1)\alpha^2}$ כדי להוכיח $\mathbb{E}_S[e^{2(m-1)\Delta(h)^2}]\le 1+2(m-1)\le 2m$; צעד Jensen אחרון מהמומנט השני לראשון.
- KL בין גאוסיאנים ככלי חישובי בצורה סגורה; מיטוב שונות ה-posterior ($\bar\sigma^2=\sigma^2$).

## נקודות רלוונטיות למבחן
- שננו את ארבע התופעות האמפיריות מילה-במילה ואת המיפוי: חסמי UC עיוורים-להתפלגות ואחידים-בהשערה ⇒ נסתרים על ידי (1)+(2) (אותם $H,m$, $D$ שונה ⇒ פערים שונים לחלוטין) ועל ידי (4) (קיימות $h$ עם $L_S$ קטן, $L_D$ גדול, למשל, בנויות על ידי צירוף דוגמאות מתויגות-עוינת); כל (בלתי-תלוי-$S$) $\Delta$ (כולל חסם הדחיסה) אינו יכול להסביר את (3); החסם מבוסס-הנורמה רואה את $S$ רק דרך $\max_i\|x_i\|$ ⇒ גם נכשל ב-(3); דוגמת ה-PAC-Bayes תלויה הן ב-$\hat h$ והן ב-$S$ ⇒ יכולה פוטנציאלית להסביר את (1)–(4).
- אי-ריקנות של Prop 1 דורשת $m$ לפחות בסדר גודל של $b$ (ביטים); בפרקטיקה $b\gg m$ ובכל זאת רשתות מכלילות — אי-ההתאמה המניעה כל דבר אחרי חלק 2.1.
- מסקנה שנאמרה במפורש בסיכומים: חסמים הדוקים חייבים להתחשב ב-$\hat h$ הנלמדת; "UC לבדה אינה מספיקה."
- איבר השארית של חסם הדחיסה הוא $2\rho\, d(\hat h,H')$ — קל להשמיט בטעות את ה-2 (צדי אימון + אוכלוסייה) ואת ה-$\rho$.
- ספירות פרמטרים בדוגמת הדרגה-1: $2Nd$ (דרגה-1) לעומת $Nd^2$ (מלא) — גורם דחיסה $d$.
- משפט הפרשנות של Rademacher (התאמת תת-קבוצה אקראית, אנטי-התאמת השאר) ושתופעה (2) ⇒ $R(\ell\circ H\circ S)$ גדול עבור המחלקה המלאה.
- הקבוע של Prop 3: $\frac{2\pi^2}{3}k^2\frac{1}{\delta}$ נובע מ-$4/\delta_k'$ עם $\delta_k'=\frac{6}{\pi^2k^2}\delta$; מלכודת: שכחת ה-$k^2$ בתוך הלוג או ה-$4$ מחוץ לרדיקל (ושימו לב שהתצוגה מבוססת-הנורמה הסופית בסיכומים משמיטה את ה-4 ההוא).
- בחסם מבוסס-הנורמה, $k$ הוא החסם העליון ה**שלם** המינימלי על $\prod_n\|W_n\|_F$ על פני כל הייצוגים של $\hat h$; ה-$2^{N-1}$ הופך אותו לאקספוננציאלי בעומק (Golowich et al. מסירים זאת).
- PAC-Bayes: $P$ שרירותי אך קבוע לפני ראיית $S$; החסם מתקיים בו-זמנית עבור כל $Q$, כולל תלויות-$S$; המכנים הם $2(m-1)$, איבר הלוג $\ln(2m/\delta)$ — לא $\ln(1/\delta)$.
- $\bar\sigma^2=\sigma^2$ אופטימלי, ומכווץ את KL ל-$\frac{\|\hat\theta\|^2}{2\sigma^2}$; החסם אז מצמיד שטיחות ($\mathbb{E}_{\theta\sim N(\hat\theta,\sigma^2 I)}[L_S(h_\theta)]$) עם נורמת הפרמטרים.
- ערובת ה-PAC-Bayes היא עבור $L_D(Q)$, לא $L_D(h_{\hat\theta})$: ממשו באמצעות רשת סטוכסטית, או חִסמו בנפרד את הפער ל-$\hat\theta$.
- כל חסמי ההכללה הידועים רחוקים נומרית מלהיות הדוקים על רשתות אמיתיות — הסתייגות מנוסחת, הוגנת כשאלת דיון.
