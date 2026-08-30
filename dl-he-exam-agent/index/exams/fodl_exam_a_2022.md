# מבחן FODL — מועד א 2022
**Date / semester:** 15.07.2022, סמסטר ב׳ 2021/22 (תשפ"ב); מרצה ד"ר נדב כהן, מתרגל נעם רזין; 3 שעות, ללא חומר עזר
**Total points:** 110

## Q1 (37 pts) — דרגת הפרדה שווה לדרגת המטריציזציה
**Topics:** שיטות טנזוריות, Kronecker, הפרדת עומק, מחלקת השערות | **Pillar:** Expressiveness | **Difficulty:** 4
**Maps to:** lecture_02_expressiveness, fodl_recitation_kronecker_expressiveness
**Statement (English translation):**
תהי $f:(\mathbb{R}^D)^N \to \mathbb{R}$ פונקציה המוגדרת מעל $N \in \mathbb{N}$ משתנים, כל אחד $D \in \mathbb{N}$-ממדי, באופן הבא:

$$f(x^{(1)},\dots,x^{(N)}) := \langle x^{(1)} \otimes \cdots \otimes x^{(N)}, \mathcal{A}\rangle = \sum_{d_1=1}^{D}\cdots\sum_{d_N=1}^{D} x^{(1)}_{d_1}\cdots x^{(N)}_{d_N}\cdot \mathcal{A}_{d_1,\dots,d_N}$$

כאשר $\mathcal{A} \in \mathbb{R}^{D\times\cdots\times D}$ הוא טנזור מסדר $N$, $\otimes$ מסמן את המכפלה החיצונית (הטנזורית) בין שני וקטורים/טנזורים, ו-$\langle\cdot,\cdot\rangle$ היא המכפלה הפנימית הסטנדרטית בין שני טנזורים. יהי $I \subset \{1,\dots,N\}$. לשם פשטות, הניחו $I = \{1,\dots,|I|\}$.

סימונים:
- נסמן $I^c := \{1,\dots,N\}\setminus I = \{|I|+1,\dots,N\}$.
- נסמן ב-$\mathrm{mat}(\mathcal{A};I) \in \mathbb{R}^{D^{|I|}\times D^{|I^c|}}$ את המטריציזציה של $\mathcal{A}$ ביחס ל-$I$: המטריצה המתקבלת על ידי סידור מחדש של רכיבי $\mathcal{A}$ כך שהמודים (הצירים) ב-$I$ ממופים לשורות ושאר המודים לעמודות. נסמן ב-$\mathrm{row}(d_1,\dots,d_{|I|})$ את אינדקס השורה ב-$\mathrm{mat}(\mathcal{A};I)$ המתאים ל-$d_1,\dots,d_{|I|} \in \{1,\dots,D\}\times\cdots\times\{1,\dots,D\}$, ובאופן דומה ב-$\mathrm{col}(d_{|I|+1},\dots,d_N)$ את אינדקס העמודה ב-$\mathrm{mat}(\mathcal{A};I)$ המתאים ל-$d_{|I|+1},\dots,d_N \in \{1,\dots,D\}\times\cdots\times\{1,\dots,D\}$.

תזכורת: *דרגת ההפרדה* של $f$ ביחס ל-$I$ מוגדרת כ:

$$\mathrm{sep}(f;I) := \min\left\{ R\in\mathbb{N}\cup\{0\} : \exists\, g_1,\dots,g_R:(\mathbb{R}^D)^{|I|}\to\mathbb{R},\ \bar g_1,\dots,\bar g_R:(\mathbb{R}^D)^{|I^c|}\to\mathbb{R} \ \ s.t.\ \ f(x^{(1)},\dots,x^{(N)}) = \sum_{r=1}^{R} g_r\big((x^{(i)})_{i\in I}\big)\cdot \bar g_r\big((x^{(j)})_{j\in I^c}\big)\right\}$$

**a. (15 pts)** הוכיחו ש-$\mathrm{sep}(f;I) \le \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$.

**b. (15 pts)** תהי $h:(\mathbb{R}^D)^N \to \mathbb{R}$ פונקציה שרירותית. עבור וקטורים שרירותיים $v^{(1)},\dots,v^{(K)} \in \mathbb{R}^D$, נסמן ב-$\mathcal{V} \in \mathbb{R}^{K\times\cdots\times K}$ את הטנזור מסדר-$N$ המוגדר על ידי:
$$\mathcal{V}_{k_1,\dots,k_N} = h\big(v^{(k_1)},\dots,v^{(k_N)}\big) \quad \text{for all } k_1,\dots,k_N \in \{1,\dots,K\}\times\cdots\times\{1,\dots,K\}.$$
במילים, $\mathcal{V}$ הוא הטנזור המחזיק את פלטי $h$ מעל כל צירוף אפשרי של $N$ וקטורים הנלקחים מ-$\{v^{(1)},\dots,v^{(K)}\}$ (עם חזרות). הוכיחו ש-$\mathrm{sep}(h;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{V};I)$.

*רמז:* הראו ש-$\mathcal{V} = \sum_{r=1}^{\mathrm{sep}(h;I)} \mathcal{Z}_r \otimes \bar{\mathcal{Z}}_r$ עבור טנזורים $\mathcal{Z}_1,\dots,\mathcal{Z}_{\mathrm{sep}(h;I)} \in \mathbb{R}^{K\times\cdots\times K}$ מסדר $|I|$ ו-$\bar{\mathcal{Z}}_1,\dots,\bar{\mathcal{Z}}_{\mathrm{sep}(h;I)} \in \mathbb{R}^{K\times\cdots\times K}$ מסדר $|I^c|$.

**c. (7 pts)** הוכיחו ש-$\mathrm{sep}(f;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$.

*רמז:* השתמשו בתת-סעיף b. כלומר, מצאו וקטורים $v^{(1)},\dots,v^{(D)} \in \mathbb{R}^D$ כך שהטנזור $\mathcal{V}$ המתאים להם שווה ל-$\mathcal{A}$.

**Solution sketch:**
**a.** יהי $R := \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$ ונכתוב פירוק דרגה $\mathrm{mat}(\mathcal{A};I) = \sum_{r=1}^R u_r \bar u_r^\top$. נגדיר

$$g_r((x^{(i)})_{i\in I}) := \sum_{d_1,\dots,d_{|I|}} \big(\prod_{i\le|I|} x^{(i)}_{d_i}\big)(u_r)_{\mathrm{row}(d_1,\dots,d_{|I|})}$$

ו-$\bar g_r$ באופן אנלוגי עם $\bar u_r$ ואינדקסי עמודה. פיתוח $f$ רכיב-רכיב והצבת $\mathcal{A}_{d_1,\dots,d_N} = \sum_r (u_r)_{\mathrm{row}(\cdot)}(\bar u_r)_{\mathrm{col}(\cdot)}$ מפצלים את הסכום ל-$\sum_{r=1}^R g_r \cdot \bar g_r$, ולכן $\mathrm{sep}(f;I)\le R$.

**b.** אם $\mathrm{sep}(h;I) = R'$ עם $h = \sum_{r=1}^{R'} g_r\bar g_r$, נגדיר

$$(\mathcal{Z}_r)_{k_1,\dots,k_{|I|}} := g_r(v^{(k_1)},\dots,v^{(k_{|I|})})$$

ו-

$$(\bar{\mathcal{Z}}_r)_{k_{|I|+1},\dots,k_N} := \bar g_r(v^{(k_{|I|+1})},\dots,v^{(k_N)})$$

הצבת $h$ על הרשת נותנת

$$\mathcal{V} = \sum_{r=1}^{R'} \mathcal{Z}_r \otimes \bar{\mathcal{Z}}_r$$

(הרמז). המטריציזציה לינארית ו-

$$\mathrm{mat}(\mathcal{Z}_r\otimes\bar{\mathcal{Z}}_r;I) = \mathrm{vec}(\mathcal{Z}_r)\,\mathrm{vec}(\bar{\mathcal{Z}}_r)^\top$$

מדרגה $\le 1$, ולכן

$$\mathrm{rank}\,\mathrm{mat}(\mathcal{V};I) \le R' = \mathrm{sep}(h;I)$$

(תת-אדיטיביות של הדרגה).

**c.** בחרו $K = D$ ו-$v^{(k)} := e_k$ (בסיס סטנדרטי). לפי רב-לינאריות,

$$f(e_{d_1},\dots,e_{d_N}) = \mathcal{A}_{d_1,\dots,d_N}$$

ולכן $\mathcal{V} = \mathcal{A}$. החילו את (b) עם $h = f$ כדי לקבל

$$\mathrm{sep}(f;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$$

יחד עם (a), זה נותן את הזהות הקלאסית

$$\boxed{\,\mathrm{sep}(f;I) = \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)\,}$$

המשמשת בניתוחי הפרדת-עומק של מודלים טנזוריים/קונבולוציוניים.

**💡 טריקים שימושיים:** חסם עליון: פירוק דרגה של $\mathrm{mat}(\mathcal A;I)$ *הוא* סכום מפריד; חסם תחתון: הציבו $h$ על רשת כדי לקבל $\mathcal V=\sum_r\mathcal Z_r\otimes\bar{\mathcal Z}_r$, ו-$\mathrm{mat}(\mathcal Z\otimes\bar{\mathcal Z})=\mathrm{vec}(\mathcal Z)\mathrm{vec}(\bar{\mathcal Z})^\top$ מדרגה $\leq1$; סגרו את הפער עם $v^{(k)}=e_k$ כך ש-$\mathcal V=\mathcal A$ (רב-לינאריות).

**⚠️ שים לב:** (a) ו-(b)/(c) הם שני אי-השוויונות ה*הפוכים* — שמרו עליהם מובחנים; החסם התחתון נשען על כך שהמטריציזציה *לינארית* ושהדרגה תת-אדיטיבית; ב-(c) בחירת הבסיס הסטנדרטי היא כל הטריק — הצדיקו את $f(e_{d_1},\dots,e_{d_N})=\mathcal A_{d_1\dots d_N}$.

## Q2 (40 pts) — שימור ב-gradient flow ונוף ההפסד של רשתות ReLU עם שכבה נסתרת אחת
**Topics:** gradient flow, balancedness, חוקי שימור, אתחול, נקודות אוכף, מינימות מקומיות | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_03_optimization_1, lecture_04_optimization_2, fodl_recitation_gradient_flow
**Statement (English translation):**
תהי $\mathcal{H}$ מחלקת ההשערות של רשתות נוירונים עם שכבה נסתרת אחת ברוחב $M \in \mathbb{N}$, קלט $D \in \mathbb{N}$-ממדי, פלט חד-ממדי (כלומר $X = \mathbb{R}^D$, $Y = \mathbb{R}$ כאשר $X$ הוא מרחב הקלט ו-$Y$ מרחב הפלט), אקטיבציית ReLU על נוירוני השכבה הנסתרת, וללא biases. פורמלית:

$$\mathcal{H} = \left\{ x \mapsto \sum_{m=1}^{M} v_m\,\sigma(\langle w_m, x\rangle) \ :\ w_1,\dots,w_M \in \mathbb{R}^D,\ v_1,\dots,v_M \in \mathbb{R} \right\}$$

כאשר $\sigma(z) := \max\{0,z\}$. נסמן ב-$\theta := (w_1,\dots,w_M,v_1,\dots,v_M) \in \mathbb{R}^{MD+M}$ את וקטור הפרמטרים של הרשת, וב-$h_\theta:\mathbb{R}^D\to\mathbb{R}$ את ההעתקה שהיא מממשת, כלומר $h_\theta(x) := \sum_{m=1}^M v_m\sigma(\langle w_m,x\rangle)$.

בהינתן פונקציית הפסד גזירה $\ell:\mathbb{R}\times\mathbb{R}\to\mathbb{R}$ ומדגם אימון $\{(x_1,y_1),\dots,(x_N,y_N)\} \subset (X\times Y)^N$, נגדיר את ההפסד האמפירי מעל פרמטרי הרשת כ:

$$L(\theta) = \sum_{n=1}^{N} \ell(h_\theta(x_n), y_n)$$

**a. (12 pts)** נניח ש-gradient flow מורצת על $L$ עם אתחול $\theta_0 \in \mathbb{R}^{MD+M}$. נסמן ב-$\theta(t)$, ובהתאמה ב-$\{w_m(t), v_m(t)\}_{m=1}^M$, את פרמטרי הרשת בזמן $t \ge 0$. לשם פשטות, מותר להניח שהזרימה קיימת ומוגדרת היטב, ו-$\frac{d}{dz}\sigma(0) := 0$, כלומר אי-הגזירות של ReLU ב-$0$ אינה "מפריעה". הוכיחו שלכל $m \in \{1,\dots,M\}$: $\ \frac{d}{dt} v_m(t)^2 = \frac{d}{dt} \|w_m(t)\|^2$.

כעת הניחו $L(\theta) = (h_\theta(x) - y)^2$ עבור $x \in \mathbb{R}^D,\ y \in \mathbb{R}$ עם $x \neq 0,\ y > 0$. כלומר, הניחו שמדגם האימון מכיל דוגמה יחידה, שהיא שונה מאפס ובעלת תיוג חיובי, וההפסד ריבועי.

**b. (6 pts)** הוכיחו ש-$\theta = 0$ היא נקודה קריטית של $L$.

**c. (11 pts)** הוכיחו ש-$\theta = 0$ היא נקודת אוכף של $L$, במובן שלכל $\epsilon > 0$ קיימים $\theta_1, \theta_2 \in \mathbb{R}^{MD+M}$ עם $\|\theta_1\| < \epsilon,\ \|\theta_2\| < \epsilon$, שעבורם $L(\theta_2) < L(0) < L(\theta_1)$.

**d. (11 pts)** הוכיחו של-$L$ יש מינימום מקומי "גרוע". כלומר, מצאו $\theta \in \mathbb{R}^{MD+M}$ שהוא מצד אחד מינימום מקומי, ומצד שני קיים $\theta^* \in \mathbb{R}^{MD+M}$ המקיים $L(\theta^*) < L(\theta)$.

*רמז:* התבוננו באזורים של מרחב הפרמטרים שבהם אקטיבציית ReLU מאפסת את כל הנוירונים בשכבה הנסתרת.

**Solution sketch:**
**a.** gradient flow:

$$\dot v_m = -\sum_n \ell'(h_\theta(x_n),y_n)\,\sigma(\langle w_m,x_n\rangle)$$

וגם

$$\dot w_m = -\sum_n \ell'(h_\theta(x_n),y_n)\,v_m\,\sigma'(\langle w_m,x_n\rangle)x_n$$

($\ell'$ = נגזרת בארגומנט הראשון). אז $\frac{d}{dt}v_m^2 = 2v_m\dot v_m$ וגם $\frac{d}{dt}\|w_m\|^2 = 2\langle w_m,\dot w_m\rangle$. זהות ההומוגניות-1 $z\,\sigma'(z) = \sigma(z)$ (תקפה ב-$z=0$ תחת המוסכמה) הופכת את שניהם לשווים $-2\sum_n \ell'(\cdot)\,v_m\,\sigma(\langle w_m,x_n\rangle)$. זהו חוק שימור ה-balancedness: $v_m(t)^2 - \|w_m(t)\|^2$ קבוע.

**b.** ב-$\theta=0$: $\partial L/\partial v_m \propto \sigma(\langle 0,x\rangle) = 0$ וגם $\partial L/\partial w_m \propto v_m = 0$, ולכן $\nabla L(0)=0$. שימו לב ש-$L(0) = y^2$.

**c.** קחו $u := x/\|x\|$ ואת ההפרעה שבה רק $w_1 = \tfrac{\epsilon}{2}u$, $v_1 = \pm\tfrac{\epsilon}{2}$: אז $h_\theta(x) = \pm\tfrac{\epsilon^2}{4}\|x\|=: \pm c$. עם $v_1<0$: $L = (y+c)^2 > y^2$ (נותן את $\theta_1$). עם $v_1>0$ ו-$\epsilon$ קטן מספיק כך ש-$c < 2y$: $L = (y-c)^2 < y^2$ (נותן את $\theta_2$). לשניהם נורמה $<\epsilon$.

**d.** קחו $\bar\theta$ עם $w_m := -x$ לכל $m$ (כך ש-$\langle w_m,x\rangle = -\|x\|^2 < 0$) ו-$v$ שרירותי (למשל $v=0$). עבור כל הפרעה קטנה, $\langle w_m',x\rangle$ נשאר שלילי, ולכן כל ה-ReLU-ים מפיקים $0$, $h\equiv 0$ בסביבה, ו-$L \equiv y^2$: $\bar\theta$ הוא מינימום מקומי. הוא "גרוע": $\theta^*$ עם $w_1 = x$, $v_1 = y/\|x\|^2$ (השאר אפס) נותן $h_{\theta^*}(x) = y$, כלומר

$$L(\theta^*) = 0 < y^2 = L(\bar\theta)$$

**💡 טריקים שימושיים:** זהות ההומוגניות $z\,\sigma'(z)=\sigma(z)$ מניעה את ה-balancedness $v_m^2-\|w_m\|^2=\mathrm{const}$; $\theta=0$ קריטית מכיוון ששני הגרדיאנטים החלקיים נושאים גורם $\sigma(0)$ או $v_m=0$; בנו אוכף עם בליטה מדרגה-1 הנותנת $h=\pm c$ (בחרו את הסימן); מינימום מקומי "גרוע" שוכן באזור *כל-ה-ReLU-כבויים* ($w_m=-x$) שבו $h\equiv0$ מקומית ולכן $L\equiv y^2$ בעוד שהגלובלי הוא $0$.

**⚠️ שים לב:** (a) המוסכמה $\sigma'(0):=0$ בתוספת $z\sigma'(z)=\sigma(z)$ היא שמשווה את שתי הנגזרות; (c) הציגו גם נקודה גבוהה יותר $\theta_1$ וגם נקודה נמוכה יותר $\theta_2$ בתוך $\epsilon$; (d) סביבת ה-ReLU-המת השטוחה היא המינימום המקומי — ההפרעה חייבת לשמור *כל* אקטיבציה כבויה, אחרת $h\not\equiv0$.

## Q3 (33 pts) — PAC-Bayes: חסמים למחלקה בת-מנייה, priors מותאמי-אלגוריתם, ומלכודת prior תלוי-נתונים
**Topics:** PAC-Bayes, ריכוזיות, התכנסות במידה שווה, כלים הסתברותיים, פרקטיקות סטנדרטיות | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1
**Statement (English translation):**
עבור מרחב קלט $X$ ומרחב פלט $Y$, תהי $\mathcal{H} = \{h_m\}_{m=1}^{\infty} \subset Y^X$ מחלקת השערות בת-מנייה. תהי $D$ התפלגות (לא ידועה) מעל $X \times Y$, יהי $S = \{(x_n,y_n)\}_{n=1}^N$ מדגם אימון של $N$ דוגמאות הנדגמות i.i.d. מ-$D$, ותהי $\ell: Y\times Y \to [0,1]$ פונקציית הפסד. עבור השערה $h \in \mathcal{H}$, נסמן ב-$L_D(h)$ את הפסד ההכללה (האוכלוסייה) (כלומר $L_D(h) := \mathbb{E}_{(x,y)\sim D}[\ell(h(x),y)]$) וב-$L_S(h)$ את הפסד המדגם (האמפירי) (כלומר $L_S(h) := \frac{1}{N}\sum_{n=1}^N \ell(h(x_n),y_n)$).

תזכורת (חסם PAC-Bayes): יהי $P$ התפלגות prior מעל $\mathcal{H}$ ויהי $\delta \in (0,1)$. אז, בהסתברות של לפחות $1-\delta$ מעל המדגם $S$, לכל התפלגות $Q$ מעל $\mathcal{H}$:

$$\mathbb{E}_{h\sim Q}[L_D(h)] - \mathbb{E}_{h\sim Q}[L_S(h)] \le \sqrt{\frac{KL(Q\|P) + \ln(2N/\delta)}{2(N-1)}}$$

כאשר $KL(Q\|P) := \mathbb{E}_{h\sim Q}[\ln(Q(h)/P(h))]$ היא הדיברגנץ של Kullback-Leibler בין $Q$ ל-$P$.

**a. (13 pts)** יהי $\delta \in (0,1)$. הוכיחו, בהתבסס על חסם ה-PAC-Bayes מהתזכורת, שלכל $\{\delta_m\}_{m=1}^\infty$ חיובי המקיים $\sum_{m=1}^\infty \delta_m = \delta$, בהסתברות של לפחות $1-\delta$ מעל המדגם $S$, לכל $m \in \mathbb{N}$:

$$L_D(h_m) - L_S(h_m) \le \sqrt{\frac{\ln(2N/\delta_m)}{2(N-1)}}$$

*רמז:* חשבו על המקרה שבו $P$ ו-$Q$ מרוכזות על השערה יחידה.

**b. (6 pts)** נניח שיש לנו אלגוריתם למידה $A$ שתמיד מחזיר השערה מתת-קבוצה סופית שנקבעה מראש $\mathcal{H}' \subset \mathcal{H}$ (כלומר $|\mathcal{H}'| < \infty$). השתמשו בחסם מתת-סעיף a כדי לקבל חסם הכללה המותאם לשימוש באלגוריתם $A$. כלומר, החסם צריך להיות קטן יותר עבור השערות ב-$\mathcal{H}'$ מאשר עבור השערות ב-$\mathcal{H}\setminus\mathcal{H}'$ (אף רצוי שלא יבטיח דבר כלל עבור השערות שאינן ב-$\mathcal{H}'$).

**c. (6 pts)** נניח שיש לנו אלגוריתם למידה $B$ הנוטה להחזיר השערות $h_m \in \mathcal{H}$ עם אינדקס $m \in \mathbb{N}$ נמוך יותר. השתמשו בחסם מתת-סעיף a כדי לקבל חסם הכללה המותאם לשימוש באלגוריתם $B$. כלומר, החסם צריך להיות קטן יותר עבור השערות עם אינדקס נמוך יותר.

**d. (8 pts)** "נניח שאני משתמש באלגוריתם הלמידה המועדף עליי כדי ללמוד השערה עבור מאגר הנתונים CIFAR10. אני מקבל בחזרה השערה $h$ עם הפסד 0-1 אמפירי נמוך. אני רוצה להעריך עד כמה ההשערה שלי מכלילה מבלי להשתמש בקבוצת ולידציה. לשם כך, אני משתמש בחסם ה-PAC-Bayes מהתזכורת ובוחר התפלגויות $P$ ו-$Q$ המקצות הסתברות $1$ ל-$h$ ו-$0$ לכל שאר ההשערות. אני מבחין שהחסם קטן בהסתברות גבוהה. האם שיטת ההערכה שלי תקפה? אם לא, נמקו."

**Solution sketch:**
**a.** עבור כל $m$, החילו את תזכורת ה-PAC-Bayes עם prior $P := \delta_{h_m}$ (מסת נקודה) ופרמטר ביטחון $\delta_m$, ואז בחרו $Q := \delta_{h_m}$: איבר ה-KL מתאפס והתוחלות מתמוטטות, ונותנים

$$L_D(h_m)-L_S(h_m) \le \sqrt{\ln(2N/\delta_m)/(2(N-1))}$$

עם הסתברות כישלון $\le \delta_m$. חסם איחוד מעל $m \in \mathbb{N}$: הסתברות הכישלון הכוללת $\le \sum_m \delta_m = \delta$, ולכן כל החסמים מתקיימים בו-זמנית בהסתברות $\ge 1-\delta$. (הוכחה חלופית חד-שלבית: prior $P(h_m) = \delta_m/\delta$, $Q = \delta_{h_m}$, ולכן $KL = \ln(\delta/\delta_m)$ וגם $\ln(\delta/\delta_m) + \ln(2N/\delta) = \ln(2N/\delta_m)$.)

**b.** הקצו את תקציב הביטחון רק ל-$\mathcal{H}'$: $\delta_m := \delta/|\mathcal{H}'|$ עבור $h_m \in \mathcal{H}'$ ו-$\delta_m := 0$ אחרת (בפרשנות שהחסם ריק/$+\infty$ מחוץ ל-$\mathcal{H}'$). תוצאה: בהסתברות $\ge 1-\delta$, $\forall h \in \mathcal{H}'$:

$$L_D(h)-L_S(h) \le \sqrt{\ln(2N|\mathcal{H}'|/\delta)/(2(N-1))}$$

— החסם האחיד למחלקה סופית. דבר אינו מובטח מחוץ ל-$\mathcal{H}'$. (אם עומדים על חיוביות ממש של כל $\delta_m$, תנו ל-$\mathcal{H}'$ תקציב $(1-\lambda)\delta$ ופזרו $\lambda\delta$ גאומטרית בחוץ, $\lambda$ קטן.)

**c.** בחרו סדרה חיובית יורדת, למשל $\delta_m := \delta\,2^{-m}$: החסם

$$\sqrt{(\ln(2N/\delta) + m\ln 2)/(2(N-1))}$$

מונוטוני עולה ב-$m$, ולכן הדוק יותר עבור השערות בעלות אינדקס נמוך (המועדפות על ידי האלגוריתם). כל סדרה יורדת סכימה (למשל $\delta\frac{6}{\pi^2 m^2}$) עובדת.

**d.** השיטה אינה תקפה. ב-PAC-Bayes ה-prior $P$ חייב להיקבע **לפני** ראיית המדגם $S$. כאן $h$ הוא הפלט של אלגוריתם למידה שאומן על $S$, ולכן $P$ (וגם $Q$) תלויים ב-$S$. ולכן הערובה ההסתברותית של המשפט (מעל הגרלות של $S$ עבור $P$ קבוע) אינה חלה. ה"ארוחה חינם" של $KL=0$ היא בדיוק ה-prior תלוי-הנתונים הבלתי-חוקי. חלופות נכונות: קבעו prior מראש ושלמו $KL$/$\ln(1/\delta_m)$ כמו ב-(a)-(c), או העריכו הכללה עם נתונים שהופרשו (ולידציה).

**💡 טריקים שימושיים:** מסת-נקודה $P=Q=\delta_{h_m}$ הורגת את איבר ה-$KL$ ⇒ חסם לכל-השערה; איחוד מעל $m$ עם כל $\sum\delta_m=\delta$ (או prior חד-שלבי $P(h_m)=\delta_m/\delta$ כך ש-$KL=\ln(\delta/\delta_m)$); priors מותאמי-אלגוריתם = רכזו את התקציב על $\mathcal H'$ (חסם למחלקה סופית) או השתמשו בסדרה יורדת $\delta_m=\delta2^{-m}$ להעדפת אינדקס נמוך.

**⚠️ שים לב:** (d) היא המלכודת הקלאסית — ה-prior $P$ של PAC-Bayes חייב להיקבע *לפני* ראיית $S$; שימת $P=Q=\delta_h$ על ה-$h$ ה*מאומן* היא prior תלוי-נתונים בלתי-חוקי, ולכן הערובה בטלה; התיקונים היחידים הם prior שהתחייבו אליו מראש (שלמו $KL$) או קבוצת ולידציה שהופרשה.
