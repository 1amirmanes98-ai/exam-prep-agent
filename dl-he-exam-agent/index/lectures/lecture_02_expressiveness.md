# הרצאה 2 — כושר ביטוי 1
- **File:** materials/lectures/lecture_02_expressiveness.pdf | **Text:** materials/text/lectures/lecture_02_expressiveness.txt
- **Pillar:** Expressiveness
- **One-paragraph summary:** הופכת את שלושת מושגי כושר הביטוי מהרצאה 1 (אוניברסליות, יעילות ביטוי, הטיה אינדוקטיבית) לקפדניים לחלוטין על שתי ארכיטקטורות קונקרטיות. (i) רשתות ReLU מחוברות-לחלוטין עם קלט סקלרי (Telgarsky): המחלקה הרדודה מממשת בדיוק את הפונקציות הלינאריות למקוטעין (רוחב $B$ ⟹ $\le B+1$ מקטעים), מה שמניב $L^1([0,1])$-אוניברסליות עבור מטרות רציפות; הרכבת העתקת ה"אוהל" ברוחב 3 $g(x)=[2x]_+-[4x-2]_+ +[2x-2]_+$ נותנת פונקציית שיני-מסור בעלת $L$ שכבות ורוחב 3 עם $2+2^{L-1}$ מקטעים שרשת רדודה אינה יכולה אפילו *לקרב* אלא אם $B>2^{L+2}(\tfrac18-\epsilon)-6$ — יעילות ביטוי אקספוננציאלית של עומק, עם אי-קריבות. (ii) מעגלים אריתמטיים קונבולוציוניים על $\mathcal X=[M]^N$: פונקציות ≡ טנזורים מסדר $N$; הרשת הרדודה (pooling מכפלה גלובלי) מחשבת פירוק CP והרשת העמוקה ($L=\log_2N$ שכבות, pooling זוגי) פירוק Hierarchical Tucker. טיעוני דרגת מטריציזציה (כפליות דרגת Kronecker + Eckart–Young–Mirsky) מראים שהרשת העמוקה ברוחב $O(M)$ משיגה דרגת מטריציזציה קנונית $M^{N/2}$ — עבור *כמעט כל* ערכי הפרמטרים (טיעון קבוצת-אפסים-של-פולינום ⟹ יעילות ביטוי אקספוננציאלית **מלאה**, עם אי-קריבות $B\ge M^{N/2}-\epsilon^2$). לבסוף, דרגת ההפרדה $\mathrm{sep}[f;I]=\mathrm{rank}[\![\mathcal A]\!]_I$ מכמתת את התלויות שהמודל מייצג: דרגות ההפרדה של הרשת הרדודה הן $\le Z$ תחת *כל* חלוקה, בעוד הרשת העמוקה תומכת בדרגת הפרדה מקסימלית (אקספוננציאלית) תחת חלוקת לוח-השחמט אך רק $\le r_{L-1}$ תחת חצייה — הטיה אינדוקטיבית לעבר תלויות מקומיות, הניתנת לכוונון דרך גאומטריית ה-pooling.

## Outline
1. **רשתות ReLU מחוברות-לחלוטין עם קלט סקלרי** (מבוסס על Telgarsky [4]); $\mathcal X=\mathcal Y=\mathbb R$.
   1. *1.1 רשת רדודה* — מחלקת ReLU בת 2 שכבות ורוחב $B$ $\mathcal H_B$; מונוטונית ב-$B$.
   2. *1.2 רשת עמוקה* — מחלקה בעלת $L(\ge3)$ שכבות ורוחב $\bar B$ $\bar{\mathcal H}_{\bar B}$; מונוטונית; מכילה את $\mathcal H_{B}$ באמצעות שכבות מעבר (זהות).
   3. *1.3 אוניברסליות* — פונקציות לינאריות למקוטעין (Def 1) מקרבות פונקציות רציפות ב-$d(f_1,f_2)=\int_0^1|f_1-f_2|$; Prop 1 + Lemma 1 ⟹ $\mathcal F$-אוניברסליות של הרדודה (ומכאן העמוקה).
   4. *1.4 יעילות ביטוי* — שיני-המסור $g^{\circ L-1}$ ניתנים למימוש בעומק $L$ ורוחב 3; רשת רדודה זקוקה ל-$B\in\exp(L)$ כדי לממש (Prop 2) או אפילו לקרב אותם (טיעון החטאת-מרווחים).
2. **מעגלים אריתמטיים קונבולוציוניים** — $\mathcal X=[M]^N$ ($N$ חזקה של 2), $\mathcal Y=\mathbb R$; פונקציות מזוהות עם טנזורים מסדר $N$ $\mathcal A_{d_1,\dots,d_N}:=f(d_1,\dots,d_N)$.
   1. *2.1 רשת רדודה* — ייצוג one-hot → קונבולוציית $1\times1$ (רוחב $Z$) → pooling מכפלה גלובלי → פלט לינארי; מחשבת פירוק CP (Prop 3).
   2. *2.2 רשת עמוקה* — $L=\log_2 N$ שכבות חבויות של קונבולוציית $1\times1$ + pooling מכפלה בגודל 2; מחשבת פירוק Hierarchical Tucker (Prop 4).
   3. *2.3 אוניברסליות* — CP עם $Z=M^N$ מממש כל טנזור (Prop 5); אוניברסליות עמוקה נובעת מיעילות הביטוי.
   4. *2.4 יעילות ביטוי* — $\mathrm{rank}[\![\mathcal A^{\mathrm{CP}}]\!]\le Z$ לעומת השמה עמוקה המשיגה $[\![\mathcal A^{\mathrm{HT}}]\!]=I_{M^{N/2}}$ (Prop 6; משתמשת במכפלת Kronecker, מטריציזציה, Lemmas 2–3).
   5. *2.5 אי-קריבות* — מרחק Frobenius $D(h,\bar h)\ge\sqrt{M^{N/2}-B}$ באמצעות Eckart–Young–Mirsky (Thm 1).
   6. *2.6 שלמות* — $\det[\![\mathcal A^{\mathrm{HT}}]\!]$ הוא פולינום לא-אפסי בפרמטרים ⟹ דרגה מלאה עבור כמעט כל הפרמטרים (Thm 2, קבוצת האפסים של פולינום) ⟹ יעילות ביטוי (אקספוננציאלית) מלאה.
   7. *2.7 הטיה אינדוקטיבית* — דרגת הפרדה (Def 7) = דרגת מטריציזציה (Prop 7); *2.7.1 תלויות המיוצגות על ידי רשתות* — רדודה: $\le Z$ עבור כל החלוקות; עמוקה: מקסימלית תחת $I_{\mathrm{check}}$, $\le r_{L-1}$ תחת $I_{\mathrm{half}}$; גאומטריית ה-pooling מעצבת את ההטיה (ניסוי pooling ריבועי לעומת מראה).

## Key definitions
### Section 1 (ReLU networks, scalar input)

**Def (shallow ReLU class $\mathcal H_B$).** עם $\mathcal X=\mathcal Y=\mathbb R$, אקטיבציה חבויה $[z]_+:=\max\{0,z\}$ (ReLU):
$$\mathcal H_B:=\Big\{x\mapsto y=W^{(2)}\big[W^{(1)}x+\mathbf b^{(1)}\big]_+ +b^{(2)}\ :\ W^{(1)}\in\mathbb R^{B,1},\ \mathbf b^{(1)}\in\mathbb R^B,\ W^{(2)}\in\mathbb R^{1,B},\ b^{(2)}\in\mathbb R\Big\}.$$
מונוטונית ביחס ל-$B$ (איפוס משקלי הפלט של נוירונים עודפים).

**Def (deep ReLU class $\bar{\mathcal H}_{\bar B}$).** עבור $L\ge3$ שכבות, רוחב $\bar B$:
$$\bar{\mathcal H}_{\bar B}:=\Big\{x\mapsto y=W^{(L)}\Big[W^{(L-1)}\big[\cdots\big[W^{(1)}x+\mathbf b^{(1)}\big]_+\cdots\big]_+ +\mathbf b^{(L-1)}\Big]_+ +b^{(L)}\ :\ W^{(1)}\in\mathbb R^{\bar B,1},\ \mathbf b^{(1)}\in\mathbb R^{\bar B},\ \forall l=2,\dots,L-1:\ W^{(l)}\in\mathbb R^{\bar B,\bar B},\ \mathbf b^{(l)}\in\mathbb R^{\bar B},\ W^{(L)}\in\mathbb R^{1,\bar B},\ b^{(L)}\in\mathbb R\Big\}.$$
מונוטונית ביחס ל-$\bar B$; יתרה מכך $\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B=B}$ — שכבות $2,\dots,L-1$ הופכות ל"מעבר" על ידי קביעת מטריצות המשקל שלהן לזהות וההטיות לאפס (תקף כיוון ש-ReLU היא הזהות על אקטיבציות אי-שליליות).

**Def (distance for universality, Section 1).** $\mathcal F\subseteq\mathcal Y^{\mathcal X}$ = פונקציות רציפות; מרחק = הפרש מוחלט המשולב על קטע סגור וחסום, בה"כ $[0,1]$:
$$d(f_1,f_2):=\int_0^1|f_1(x)-f_2(x)|\,dx.$$

**Def 1 (piecewise linear function, # linear pieces).** פונקציה רציפה $g\in\mathcal Y^{\mathcal X}$ היא *לינארית למקוטעין* אם קיימים קבועים $-\infty=:c_0<c_1<\dots<c_{N-1}<c_N:=\infty$ כך שעבור כל $i\in[N]$, $g$ אפינית על $[c_{i-1},c_i]$ (כלומר, $\forall x\in[c_{i-1},c_i]:g(x)=\alpha_ix+\beta_i$ עבור $\alpha_i,\beta_i\in\mathbb R$ כלשהם). **מספר המקטעים הלינאריים** של $g$ הוא ה-$N$ המינימלי שעבורו זה מתקיים.

**Def (tent map $g$ and sawtooth $g^{\circ k}$).** $g:\mathbb R\to\mathbb R$ היא ה"אוהל": $0$ מחוץ ל-$[0,1]$, עולה לינארית מ-$g(0)=0$ ל-$g(1/2)=1$ וחזרה ל-$g(1)=0$; ממומשת בדיוק על ידי רשת בת 2 שכבות ורוחב 3 שכן
$$g(x)=[2x]_+-[4x-2]_+ +[2x-2]_+.$$
$g^{\circ k}:=\underbrace{g\circ\cdots\circ g}_{k\text{ times}}:\mathbb R\to\mathbb R$ היא פונקציית "שיני-המסור" עם $2^{k-1}$ שיניים על $[0,1]$.

**Def (the sets $S_>$, $S_<$ and "missing" an interval).**
$$S_>:=\Big\{x\in[0,1]:g^{\circ L-1}(x)>\tfrac12\Big\}=\bigcup_{i=1}^{2^{L-2}}\Big(2^{-L+2}(i-1)+\tfrac14\cdot2^{-L+2},\ 2^{-L+2}(i-1)+\tfrac34\cdot2^{-L+2}\Big),$$
$$S_<:=\Big\{x\in[0,1]:g^{\circ L-1}(x)<\tfrac12\Big\}=\bigcup_{i=1}^{2^{L-2}-1}\Big(2^{-L+2}i-\tfrac14\cdot2^{-L+2},\ 2^{-L+2}i+\tfrac14\cdot2^{-L+2}\Big)\cup\Big(0,\tfrac14\cdot2^{-L+2}\Big)\cup\Big(1-\tfrac14\cdot2^{-L+2},\,1\Big).$$
שתיהן איחודים זרים של קטעים פתוחים ($2^{L-1}+1$ קטעים בסך הכול). פונקציה $f:\mathbb R\to\mathbb R$ **מחטיאה** קטע של $S_>$ אם ערכה לאורך אותו קטע אינו גדול מ-$\frac12$; היא מחטיאה קטע של $S_<$ אם ערכה לאורך אותו קטע אינו קטן מ-$\frac12$. אם $f$ מחטיאה קטע, אזי $\int_{\text{interval}}|f(x)-g^{\circ L-1}(x)|\,dx\ge[\text{interval length}]\cdot\frac12\cdot\frac12$ (שטח משולש מעל/מתחת לרמת $\tfrac12$).

### Section 2 (convolutional arithmetic circuits)

**Def (function ↔ tensor identification).** $\mathcal X=[M]^N$ ($N$ חזקה של 2; $N$ = מספר הפיקסלים/טלאים, $M$ = מספר הערכים/תבניות), $\mathcal Y=\mathbb R$. פונקציה $f:\mathcal X\to\mathcal Y$ מזוהה עם הטנזור מסדר $N$ $\mathcal A\in\mathbb R^{\overbrace{M,\dots,M}^{N\text{ times}}}$ ($N$ מודים, ממד $M$ בכל מוד) המוגדר על ידי $\mathcal A_{d_1,\dots,d_N}:=f(d_1,\dots,d_N)$ — "טבלת החיפוש" של $f$.

**Def (shallow CAC).** הקלט $\mathbf x=(d_1,\dots,d_N)^\top\in[M]^N$ עובר דרך: **ייצוג** $(d_1,\dots,d_N)\xrightarrow{\mathrm{rep}(\cdot)}(\mathbf e^{d_1},\dots,\mathbf e^{d_N})\in(\mathbb R^M)^N$ (וקטורי one-hot, $\mathrm{rep}(i,d)=\mathbb 1[x_i=d]$); **קונבולוציית $1\times1$** ברוחב $Z\in\mathbb N$ — מחוברת מקומית עם $Z$ קבוצות מסננים $\{(\mathbf a^{z,1},\dots,\mathbf a^{z,N})\in(\mathbb R^M)^N\}_{z=1}^Z$, $\mathrm{conv}(i,z)=\langle\mathbf a^{z,i},\mathrm{rep}(i,:)\rangle$ (המקרה ה*קונבולוציוני* הוא כאשר המסננים משותפים בין המיקומים: $\mathbf a^{z,1}=\dots=\mathbf a^{z,N}$; ההרצאה מתמקדת במקרה הכללי יותר של חיבור מקומי); **pooling מכפלה גלובלי** $\mathrm{pool}(z)=\prod_{i=1}^N\mathrm{conv}(i,z)$; **פלט צפוף** $\mathrm{out}=\langle\mathbf a^{\mathrm{out}},\mathrm{pool}(:)\rangle=\sum_{z=1}^Z a^{\mathrm{out}}_z\prod_{i=1}^N\langle\mathbf a^{z,i},\mathbf e^{d_i}\rangle$ עם $\mathbf a^{\mathrm{out}}\in\mathbb R^Z$. פרמטרים ניתנים-ללמידה: מסנני הקונבולוציה + משקלי הפלט, $(NM+1)Z$ בסך הכול. $\mathcal H_B$ := מרחב ההשערות של הרשת הרדודה עם $Z=B$ ≡ טנזורים הניתנים לייצוג בפירוק CP עם $Z=B$ איברים; מונוטונית ב-$B$.

**Def 2 (outer product of vectors).** עבור $\mathbf v^1,\dots,\mathbf v^N\in\mathbb R^M$, $\mathbf v^1\otimes\cdots\otimes\mathbf v^N$ הוא הטנזור מסדר $N$ עם ממד $M$ בכל מוד הנתון על ידי $(\mathbf v^1\otimes\mathbf v^2\otimes\cdots\otimes\mathbf v^N)_{d_1,\dots,d_N}:=\prod_{i=1}^N v^i_{d_i}$.

**Def (deep CAC).** $L=\log_2(N)$ שכבות חבויות. אותו ייצוג one-hot; שכבה חבויה $l\in\{0,1,\dots,L-1\}$ מיישמת קונבולוציית $1\times1$ עם קבוצות מסננים $\big\{(\mathbf a^{l,1,\gamma},\dots,\mathbf a^{l,N\cdot2^{-l},\gamma})\in(\mathbb R^{r_{l-1}})^{N\cdot2^{-l}}\big\}_{\gamma=1}^{r_l}$ (מוסכמה $r_{-1}:=M$), $\mathrm{conv}_l(j,\gamma)=\langle\mathbf a^{l,j,\gamma},\cdot\rangle$, ואחריה **pooling מכפלה בגודל 2** על זוגות מיקומים: $\mathrm{pool}_l(j,\gamma)=\prod_{j'\in\{2j-1,2j\}}\mathrm{conv}_l(j',\gamma)$ (מחצה את מספר המיקומים המרחביים). לאחר $L$ שכבות המרחב המרחבי מתכווץ ליחידון, ומותיר וקטור בממד $r_{L-1}$ הממופה לפלט הסקלרי על ידי שכבה לינארית צפופה: $\mathrm{out}=\langle\mathbf a^L,\mathrm{pool}_{L-1}(:)\rangle$, $\mathbf a^L\in\mathbb R^{r_{L-1}}$. סך מספר הפרמטרים: $\sum_{l=0}^{L-1}(r_{l-1}\cdot N\cdot2^{-l}\cdot r_l)+r_{L-1}$. $\bar{\mathcal H}_{\bar B}$ := מרחב ההשערות של הרשת העמוקה עם $r_0=\dots=r_{L-1}=\bar B$ ≡ טנזורים הניתנים לייצוג בפירוק HT עם רוחבים אלו; מונוטונית ב-$\bar B$.

**Def 3 (outer product of tensors).** עבור טנזורים $\mathcal A,\bar{\mathcal A}$ מסדרים $k,\bar k$ עם ממד $M$ בכל מוד, $\mathcal A\otimes\bar{\mathcal A}$ הוא הטנזור מסדר $(k+\bar k)$ $(\mathcal A\otimes\bar{\mathcal A})_{d_1,\dots,d_k,d_{k+1},\dots,d_{k+\bar k}}:=\mathcal A_{d_1,\dots,d_k}\cdot\bar{\mathcal A}_{d_{k+1},\dots,d_{k+\bar k}}$.

**Def 4 (Kronecker product).** עבור $A\in\mathbb R^{m_1,m_2}$, $B\in\mathbb R^{n_1,n_2}$:
$$A\odot B:=\begin{pmatrix}a_{11}B & a_{12}B & \cdots\\ a_{21}B & a_{22}B & \cdots\\ \vdots & \vdots & \ddots\end{pmatrix}\in\mathbb R^{m_1n_1,\,m_2n_2}.$$
באופן כללי $A\odot B\ne B\odot A$.

**Def 5 (matricization; canonical matricization).** עבור טנזור $\mathcal T\in\mathbb R^{m_1,\dots,m_n}$ ותת-קבוצת מודים מסודרת $I=\{i_1,\dots,i_{|I|}\}\subseteq[n]$ ($1\le i_1\le\dots\le i_{|I|}\le n$), עם משלים $I^c:=[n]\setminus I=\{j_1,\dots,j_{|I^c|}\}$: המטריציזציה $[\![\mathcal T]\!]_I\in\mathbb R^{\prod_{t=1}^{|I|}m_{i_t},\ \prod_{t=1}^{|I^c|}m_{j_t}}$ פורשת את מודי $I$ כשורות ואת אלו של $I^c$ כעמודות:
$$\big([\![\mathcal T]\!]_I\big)_{\,1+\sum_{t=1}^{|I|}(d_{i_t}-1)\prod_{s=t+1}^{|I|}m_{i_s},\ \ 1+\sum_{t=1}^{|I^c|}(d_{j_t}-1)\prod_{s=t+1}^{|I^c|}m_{j_s}}:=\mathcal T_{d_1,\dots,d_n}.$$
אם $n$ זוגי, $[\![\mathcal T]\!]$ (ללא מציין תחתי) מציין את ה**מטריציזציה הקנונית** $[\![\mathcal T]\!]_I$ עם $I=\{1,3,\dots,n-1\}$ (מודים אי-זוגיים לעומת זוגיים). המטריציזציה היא אופרטור **לינארי**: $[\![\sum_k\alpha_k\mathcal T_k]\!]_I=\sum_k\alpha_k[\![\mathcal T_k]\!]_I$.

**Def 6 (distance $D$ for CAC inapproximability).** עבור $f,\bar f:[M]^N\to\mathbb R$:
$$D(f,\bar f):=\sqrt{\sum_{d_1,\dots,d_N=1}^M\big(f(d_1,\dots,d_N)-\bar f(d_1,\dots,d_N)\big)^2}\,;\qquad D(f,\bar f)=\big\|[\![\mathcal A]\!]-[\![\bar{\mathcal A}]\!]\big\|_F=:\|\mathcal A-\bar{\mathcal A}\|_F,$$
כאשר $\mathcal A,\bar{\mathcal A}$ הם הטנזורים המתאימים.

**Def 7 (separation rank).** עבור $f:[M]^N\to\mathbb R$ ו-$I=\{i_1,\dots,i_{|I|}\}\subseteq[n]$ עם משלים $I^c=\{j_1,\dots,j_{|I^c|}\}$, דרגת ההפרדה של $f$ ביחס לחלוקת הקלט $I\,\dot\cup\,I^c$ ($\dot\cup$ = איחוד זר) היא
$$\mathrm{sep}[f;I]:=\min\Big\{R\in\mathbb N\cup\{0\}:\exists g_1,\dots,g_R:[M]^{|I|}\to\mathbb R,\ \bar g_1,\dots,\bar g_R:[M]^{|I^c|}\to\mathbb R\ \text{ s.t. }\ f(d_1,\dots,d_N)=\sum_{\nu=1}^R g_\nu\big(d_{i_1},\dots,d_{i_{|I|}}\big)\cdot\bar g_\nu\big(d_{j_1},\dots,d_{j_{|I^c|}}\big)\Big\},$$
כלומר, המספר המינימלי של מחוברים, שכל אחד מהם ניתן להפרדה ביחס ל-$I\,\dot\cup\,I^c$, שיחד נותנים את $f$. **פרשנות:** $\mathrm{sep}[f;I]=1$ ⟺ $f$ ניתנת להפרדה ⟺ (כאשר $f,g,\bar g$ הן פונקציות הסתברות/צפיפות) הקלטים של $I$ ושל $I^c$ בלתי-תלויים סטטיסטית תחת $f$; $\mathrm{sep}[f;I]$ גבוה יותר = "רחוק" יותר מהפרדה = תלות מיוצגת חזקה יותר. דרגת ההפרדה ואנלוגיות שלה שקולות לסוגים של מדדי **שזירה קוונטית** (היסטורית הומצאו באופן בלתי-תלוי, באנליזה נומרית).

**Def (representative partitions).** $I_{\mathrm{check}}=\{1,3,\dots,N-1\}$, $I^c_{\mathrm{check}}=\{2,4,\dots,N\}$ ("לוח-שחמט": משולב/אי-זוגי–זוגי); $I_{\mathrm{half}}=\{1,2,\dots,\frac N2\}$, $I^c_{\mathrm{half}}=\{\frac N2+1,\frac N2+2,\dots,N\}$ ("חצייה": חצי שמאלי לעומת חצי ימני). עבור נתונים טבעיים (איברים סמוכים מתואמים יותר), $\mathrm{sep}[f;I_{\mathrm{check}}]$ גבוה חשוב יותר מ-$\mathrm{sep}[f;I_{\mathrm{half}}]$ גבוה.

## Key theorems & results
**Prop 1 (shallow ReLU ↔ piecewise linear).** רשת רדודה ברוחב $B\ge2$ יכולה לממש כל פונקציה לינארית למקוטעין עם $\le B$ מקטעים: עבור כל $g$ כזו קיימת $h\in\mathcal H_B$ עם $g\equiv h$. הפוך, כל פונקציה הניתנת למימוש על ידי רשת רדודה ברוחב $B\ge2$ היא לינארית למקוטעין עם $\le B+1$ מקטעים: עבור כל $h\in\mathcal H_B$ קיימת $g$ לינארית למקוטעין עם $\le B+1$ מקטעים כך ש-$h\equiv g$.
רעיון ההוכחה: נדחה לשיעורי בית 2 (כל נוירון ReLU תורם נקודת שבירה אחת; הפוך, סכומים של $B$ ReLU-ים בתוספת אפיני נותנים $\le B+1$ מקטעים).
רלוונטיות למבחן: ספירות המקטעים המדויקות ($\le B$ ניתנות למימוש לעומת $\le B+1$ עבור פונקציות ממומשות) מניעות הן את האוניברסליות והן את החסם התחתון של Prop 2.

**Lemma 1 (piecewise linear approximation of continuous functions).** עבור כל $\epsilon>0$ וכל $f\in\mathcal F$ (רציפה), קיימת $g$ לינארית למקוטעין עם $d(f,g)=\int_0^1|f(x)-g(x)|dx<\epsilon$.
רעיון ההוכחה: $f$ רציפה במידה שווה על $[0,1]$ (Heine–Cantor); ניקח דיסקרטיזציה $0=:c_0<c_1<\dots<c_N:=1$ עם רשת $<\delta$ ותהי $g$ אינטרפולציה של $f$ בנקודות $c_i$; על כל $[c_i,c_{i+1}]$, $g(x)$ נמצאת בין $g(c_i)=f(c_i)$ ל-$g(c_{i+1})=f(c_{i+1})$, שתיהן $\epsilon$-קרובות ל-$f(x)$; בצעו אינטגרציה.
רלוונטיות למבחן: בשילוב עם Prop 1 נותן $\mathcal F$-אוניברסליות של $\mathcal H_B$ במובן של $d(\cdot,\cdot)$; אוניברסליות של $\bar{\mathcal H}_{\bar B}$ נובעת כיוון ש-$\mathcal H_B\subset\bar{\mathcal H}_{\bar B=B}$.

**Prop 2 (exponential expressive efficiency of deep ReLU nets).** (1) עבור כל $B\in\mathbb N$ קיים $\bar B\in O(B)$ כך ש-$\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B}$; (2) קיימים $\bar B\in\mathbb N$ (למעשה $\bar B\in O(1)$, כלומר רוחב 3) ו-$\bar h\in\bar{\mathcal H}_{\bar B}$ כך ש-$\bar h\notin\mathcal H_B$ אלא אם $B\in\exp(L)$ ($L$ = מספר שכבות הרשת העמוקה).
רעיון ההוכחה: (1) שכבות מעבר. (2) רשת בעלת $L$ שכבות ורוחב 3 מממשת $\bar h=g^{\circ L-1}$ (פעולות אפיניות רציפות מתמזגות בעת הרכבת הבלוק ברוחב 3), פונקציה לינארית למקוטעין עם $2+2\cdot2^{L-2}=2+2^{L-1}$ מקטעים לינאריים; לפי Prop 1 רשת רדודה המממשת אותה זקוקה לרוחב $\ge2^{L-1}+1$.
רלוונטיות למבחן: הוכחת הפרדת-עומק קנונית; דעו את ספירת המקטעים $2+2^{L-1}$ ומהיכן מגיע כל גורם.

**Result (inapproximability of the sawtooth; Section 1.4).** יהי $h\in\mathcal H_B$. על פני כל $2^{L-1}+1$ הקטעים של $S_>$ ו-$S_<$, $h$ יכולה להימנע מהחטאה של לא יותר מ-$\big\lceil\frac12(2^{L-1}+1)+\frac12(B+1)\big\rceil$ קטעים, כלומר מחטיאה לפחות $\big\lfloor\frac12(2^{L-1}+1)-\frac12(B+1)\big\rfloor$ קטעים (הוכחת טענת הספירה: תרגיל; שימו לב שטקסט התרגיל בסיכומים מדפיס בטעות את ספירת הקטעים כ-"$2^{L+1}+1$"). לכל הקטעים המוחטאים פרט לכל היותר שניים יש אורך $2^{-L+1}$, ומכאן
$$d\big(g^{\circ L-1},h\big)=\int_0^1\big|g^{\circ L-1}(x)-h(x)\big|dx\ \ge\ \Big(\Big\lfloor\tfrac12(2^{L-1}+1)-\tfrac12(B+1)\Big\rfloor-2\Big)\cdot2^{-L+1}\cdot\tfrac14\ \ge\ \tfrac18-B\cdot2^{-L-2}-3\cdot2^{-L-1}.$$
דרישת מרחק $<\epsilon$ מכריחה
$$B>2^{L+2}\Big(\tfrac18-\epsilon\Big)-6.$$
רעיון ההוכחה: פונקציה לינארית למקוטעין $h$ עם $\le B+1$ מקטעים יכולה לחצות את רמת $\frac12$ רק מספר מוגבל של פעמים, ולכן היא חייבת "להחטיא" את רוב הקטעים המתחלפים הרבים אקספוננציאלית; כל החטאה עולה $\ge\text{length}\cdot\frac14$ ב-$L^1$.
רלוונטיות למבחן: משדרג את Prop 2 מאי-מימוש ל**אי-קריבות** (הצורה החזקה יותר של יעילות ביטוי מהרצאה 1, הערה 2); הרוחב הרדוד חייב להיות אקספוננציאלי ב-$L$ כדי להגיע בתוך $\epsilon$ קבוע.

**Prop 3 (shallow CAC ≡ CP decomposition).** הטנזור הנוצר על ידי הרשת הרדודה הוא
$$\mathcal A=\sum_{z=1}^Z a^{\mathrm{out}}_z\cdot\mathbf a^{z,1}\otimes\mathbf a^{z,2}\otimes\cdots\otimes\mathbf a^{z,N}$$
— פירוק CANDECOMP/PARAFAC (CP).
רעיון ההוכחה: על קלט $(d_1,\dots,d_N)$: $\mathrm{conv}(i,z)=\langle\mathbf a^{z,i},\mathbf e^{d_i}\rangle=a^{z,i}_{d_i}$; $\mathrm{pool}(z)=\prod_i a^{z,i}_{d_i}$; $\mathrm{out}=\sum_z a^{\mathrm{out}}_z\prod_i a^{z,i}_{d_i}$, שהוא הרכיב $(d_1,\dots,d_N)$ של סכום ה-CP (Def 2).
רלוונטיות למבחן: הגשר מהארכיטקטורה לאנליזת טנזורים; $\mathcal H_B$ = טנזורים בעלי ייצוג CP-דרגה $\le B$.

**Prop 4 (deep CAC ≡ Hierarchical Tucker (HT) decomposition).** הטנזור הנוצר על ידי הרשת העמוקה נתון רקורסיבית על ידי
$$\Phi^{1,j,\gamma}=\sum_{\alpha=1}^{r_0}a^{1,j,\gamma}_\alpha\cdot\mathbf a^{0,2j-1,\alpha}\otimes\mathbf a^{0,2j,\alpha},\qquad j\in[\tfrac N2],\ \gamma\in[r_1]$$
$$\Phi^{l,j,\gamma}=\sum_{\alpha=1}^{r_{l-1}}a^{l,j,\gamma}_\alpha\cdot\underbrace{\Phi^{l-1,2j-1,\alpha}}_{\text{order }2^{l-1}}\otimes\underbrace{\Phi^{l-1,2j,\alpha}}_{\text{order }2^{l-1}},\qquad j\in[\tfrac N{2^l}],\ \gamma\in[r_l]$$
$$\mathcal A=\sum_{\alpha=1}^{r_{L-1}}a^L_\alpha\cdot\underbrace{\Phi^{L-1,1,\alpha}}_{\text{order }\frac N2}\otimes\underbrace{\Phi^{L-1,2,\alpha}}_{\text{order }\frac N2}.$$
רעיון ההוכחה: אינדוקציה על $l\in[L-1]$: הנוירון $\mathrm{conv}_l(j,\gamma)$ (התלוי באיברי הקלט $(j-1)2^l+1$ עד $j\cdot2^l$) מתאים לטנזור מסדר $2^l$ $\Phi^{l,j,\gamma}$; מקרה הבסיס הוא רשת רדודה על 2 קלטים (Prop 3); הצעד משתמש ב-$\mathrm{conv}_l(j,\gamma)=\sum_{\alpha}a^{l,j,\gamma}_\alpha\,\mathrm{conv}_{l-1}(2j-1,\alpha)\,\mathrm{conv}_{l-1}(2j,\alpha)$ וב-Def 3.
רלוונטיות למבחן: דעו את הרקורסיה, טווחי האינדקסים, ואילו חצאים של הקלט כל גורם מכסה.

**Prop 5 (universality of CAC).** עבור $\mathcal F=\mathcal Y^{\mathcal X}$ (כל הפונקציות $[M]^N\to\mathbb R$), $\mathcal H_B$ היא $\mathcal F$-אוניברסלית: עם $B=M^N$ היא יכולה לממש **כל** פונקציה/טנזור. ($\mathcal F$-אוניברסליות של $\bar{\mathcal H}_{\bar B}$ נובעת מיעילות הביטוי שלה ביחס ל-$\mathcal H_B$, תנאי (1).)
רעיון ההוכחה: אנדקסו $z\in[M^N]$ באמצעות $(d_1,\dots,d_N)\in[M]^N$ בסדר לקסיקוגרפי; קבעו $\mathbf a^{z,i}=\mathbf e^{d_i}$, מה שהופך את $\mathbf a^{z,1}\otimes\cdots\otimes\mathbf a^{z,N}=\mathbb 1[d_1,\dots,d_N]$ (טנזור one-hot); קבעו $a^{\mathrm{out}}_z=\mathcal T_{d_1,\dots,d_N}$ כדי לשחזר כל מטרה $\mathcal T$.
רלוונטיות למבחן: אוניברסליות כאן היא *מימוש מדויק* (תחום סופי), לא קירוב; זקוקה לרוחב אקספוננציאלי $M^N$.

**Lemma 2 (Kronecker rank multiplicativity).** עבור כל $A\in\mathbb R^{m_1,m_2}$, $B\in\mathbb R^{n_1,n_2}$: $\mathrm{rank}(A\odot B)=\mathrm{rank}(A)\cdot\mathrm{rank}(B)$.
רעיון ההוכחה: בסיכומי התרגול (באמצעות SVD של הגורמים).

**Lemma 3 (matricization of tensor outer product).** עבור טנזורים $\mathcal T,\bar{\mathcal T}$ מסדרים $n,\bar n$ ו-$I\subseteq[n+\bar n]$:
$$[\![\mathcal T\otimes\bar{\mathcal T}]\!]_I=[\![\mathcal T]\!]_{I\cap[n]}\odot[\![\bar{\mathcal T}]\!]_{(I-n)\cap[\bar n]}$$
($I-n$ = חיסור $n$ מכל איברי $I$). בפרט, עבור $n,\bar n$ זוגיים: $[\![\mathcal T\otimes\bar{\mathcal T}]\!]=[\![\mathcal T]\!]\odot[\![\bar{\mathcal T}]\!]$.
רעיון ההוכחה: שיעורי בית 2 (ניהול אינדקסים ב-Def 5).
רלוונטיות למבחן: סוס העבודה של כל חישוב דרגה בחלק 2 (בשימוש עם לינאריות המטריציזציה).

**Prop 6 (exponential expressive efficiency of deep CAC).** (1) עבור כל $B\in\mathbb N$ קיים $\bar B\in O(B)$ כך ש-$\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B}$. (2) קיימים $\bar B\in\mathbb N$ עם $\bar B\in O(M)$ ו-$\bar h\in\bar{\mathcal H}_{\bar B}$ כך ש-$\bar h\notin\mathcal H_B$ אלא אם $B\in\exp(N)$.
רעיון ההוכחה: (1) עם $r_0=\dots=r_{L-1}=B=\bar B$ ומסננים $\mathbf a^{l,j,\gamma}=\mathbf e^\gamma$ עבור $l\in[L-1]$, הקונבולוציות החבויות 1..$L-1$ הן מעבר והמיזוגים הזוגיים מתחברים ל-pooling גלובלי — ומשחזרים את הרשת הרדודה. (2) מטריציזציה קנונית של CP: $[\![\mathcal A^{\mathrm{CP}}]\!]=\sum_{z=1}^Z a^{\mathrm{out}}_z\cdot[\![\mathbf a^{z,1}\otimes\mathbf a^{z,2}]\!]\odot\cdots\odot[\![\mathbf a^{z,N-1}\otimes\mathbf a^{z,N}]\!]$, כל גורם מטריצה מדרגה 1, ולכן $\mathrm{rank}[\![\mathcal A^{\mathrm{CP}}]\!]\le Z$. עבור הרשת העמוקה, הניחו $r_0\ge M$ והשימו: $\mathbf a^{0,j,\alpha}=\mathbf e^\alpha$ אם $\alpha\in[M]$, אחרת $\mathbf 0$; $\mathbf a^{1,j,\gamma}=\mathbf 1$ (כולו אחדות) אם $\gamma=1$, אחרת $\mathbf 0$; עבור $l=2,\dots,L-1$: $\mathbf a^{l,j,\gamma}=\mathbf e^1$ אם $\gamma=1$, אחרת $\mathbf 0$; $\mathbf a^L=\mathbf e^1$. אז $[\![\Phi^{1,j,\gamma}]\!]=I_M$ עבור $\gamma=1$ (אחרת $0$), ובפריסת הרקורסיה, $[\![\mathcal A^{\mathrm{HT}}]\!]=\underbrace{I_M\odot\cdots\odot I_M}_{N/2\text{ times}}=I_{M^{N/2}}$, מדרגה $M^{N/2}$.
רלוונטיות למבחן: משפט הפרדת-העומק המרכזי עבור CAC-ים — עמוקה ברוחב $O(M)$ לעומת רדודה $\exp(N)$; היו מסוגלים לשחזר הן את חסם הדרגה $\le Z$ והן את השמת מטריציזציית-הזהות.

**Thm 1 (Eckart–Young–Mirsky).** יהי $A\in\mathbb R^{m_1,m_2}$ עם ערכים סינגולריים $\sigma_1(A)\ge\sigma_2(A)\ge\dots\ge\sigma_{\min\{m_1,m_2\}}(A)\ge0$. עבור כל $r\in\{0,\dots,\min\{m_1,m_2\}\}$:
$$\min_{W\in\mathbb R^{m_1,m_2},\ \mathrm{rank}(W)\le r}\|W-A\|_F^2=\sum\nolimits_{i=r+1}^{\min\{m_1,m_2\}}\sigma_i(A)$$
(כפי שמודפס בסיכומים; הניסוח הקלאסי מכיל $\sigma_i(A)^2$ מימין — השניים מתלכדים ביישום שלהלן, בו כל $\sigma_i\in\{0,1\}$).
רעיון ההוכחה: תוצאת קירוב מדרגה-נמוכה קלאסית [Eckart–Young 1936]; קטמו את ה-SVD.

**Result (inapproximability for CACs; Section 2.5).** יהי $h\in\mathcal H_B$ עם טנזור $\mathcal A^{\mathrm{CP}}$, ותהי $\bar h\in\bar{\mathcal H}_{\bar B}$ הפונקציה העמוקה של Prop 6 (מטריציזציה קנונית $I_{M^{N/2}}$). כיוון ש-$\mathrm{rank}[\![\mathcal A^{\mathrm{CP}}]\!]\le B$:
$$D(h,\bar h)=\big\|[\![\mathcal A^{\mathrm{CP}}]\!]-I_{M^{N/2}}\big\|_F\ \ge\ \sqrt{\min_{W:\,\mathrm{rank}(W)\le B}\|W-I_{M^{N/2}}\|_F^2}=\sqrt{\sum\nolimits_{i=B+1}^{M^{N/2}}\sigma_i\big(I_{M^{N/2}}\big)}=\sqrt{M^{N/2}-B}.$$
לפיכך עבור כל $\epsilon>0$, $D(h,\bar h)\le\epsilon$ מכריח $B\ge M^{N/2}-\epsilon^2$: גדול אקספוננציאלית.
רעיון ההוכחה: EYM מיושם עם $A=I_{M^{N/2}}$ (כל הערכים הסינגולריים 1).
רלוונטיות למבחן: חיזוק אי-קריבות עבור CAC-ים; שימו לב שהמרחק הוא Frobenius/$\ell_2$ על פני כל $M^N$ הקלטים (Def 6).

**Thm 2 (zero set of a polynomial; Caron–Traynor).** יהי $p:\mathbb R^n\to\mathbb R$ פולינום. אזי $p^{-1}(0):=\{\mathbf x\in\mathbb R^n:p(\mathbf x)=0\}$ הוא או כל $\mathbb R^n$ או בעל מידה (Lebesgue) אפס.
רעיון ההוכחה: מצוטט [Caron & Traynor 2005]; אינדוקציה על הממד.

**Result (completeness; Section 2.6).** $\mathrm{rank}\big([\![\mathcal A^{\mathrm{HT}}]\!]\big)=M^{N/2}$ עבור **כמעט כל** השמות הפרמטרים של הרשת העמוקה (עם $r_0\ge M$), ומבססת **יעילות ביטוי (אקספוננציאלית) מלאה** של ה-CAC העמוק ביחס לרדוד.
רעיון ההוכחה: רכיבי $[\![\mathcal A^{\mathrm{HT}}]\!]$ הם פולינומים בפרמטרים, ולכן גם $\det([\![\mathcal A^{\mathrm{HT}}]\!])$; הוא לא-אפסי בהשמת Prop 6, ולכן אינו פולינום האפס; לפי Thm 2 קבוצת האפסים שלו בעלת מידה אפס. לפיכך פרמטרים הנדגמים מכל התפלגות רציפה נותנים $\det\ne0$ בהסתברות 1.
רלוונטיות למבחן: טיעון גנריות סטנדרטי — שננו את השרשרת "רכיבים פולינומיים → לא-אפס בנקודה אחת → לא פולינום האפס → קבוצת אפסים בעלת מידה אפס".

**Prop 7 (separation rank = matricization rank).** עבור $f:[M]^N\to\mathbb R$ עם טנזור $\mathcal A$ וכל $I\subseteq[N]$:
$$\mathrm{sep}[f;I]=\mathrm{rank}\big([\![\mathcal A]\!]_I\big).$$
רעיון ההוכחה: בה"כ $I=[|I|]$ (תמורה משמרת את שני האגפים). ($\le$): סכום של $R$ איברים הניתנים להפרדה נותן $\mathcal A=\sum_{\nu=1}^R\mathcal B^\nu\otimes\bar{\mathcal B}^\nu$; מטריציזציה עם לינאריות + Lemma 3 נותנת $[\![\mathcal A]\!]_I=\sum_\nu\mathrm{vec}[\mathcal B^\nu]\,\mathrm{vec}[\bar{\mathcal B}^\nu]^\top$, ולכן דרגה $\le R$. ($\ge$): פירוק מדרגה $r$ $[\![\mathcal A]\!]_I=\sum_{\nu=1}^r\mathbf v^\nu(\bar{\mathbf v}^\nu)^\top$ מתקפל בחזרה ל-$\mathcal A=\sum_\nu\mathcal B^\nu\otimes\bar{\mathcal B}^\nu$, כלומר $r$ מחוברים הניתנים להפרדה — סתירה אם $r<R$.
רלוונטיות למבחן: ההוכחה הדו-כיוונית (שני האי-שוויונות) היא שאלת מבחן סבירה; היא ממירה שאלות הטיה-אינדוקטיבית לחישובי דרגה.

**Result (dependencies modeled; Section 2.7.1).**
- רדודה: מטריציזציה של פירוק ה-CP ביחס ל**כל** $I\subseteq[N]$ (Lemma 3 רקורסיבי) נותנת $[\![\mathcal A^{\mathrm{CP}}]\!]_I=\sum_{z=1}^Z a^{\mathrm{out}}_z\cdot[\![\mathbf a^{z,1}]\!]_{I\cap\{1\}}\odot[\![\mathbf a^{z,2}]\!]_{(I-1)\cap\{1\}}\odot\cdots\odot[\![\mathbf a^{z,N}]\!]_{(I-(N-1))\cap\{1\}}$ (כל גורם וקטור שורה/עמודה), סכום של $Z$ איברים מדרגה 1, ומכאן $\mathrm{rank}([\![\mathcal A^{\mathrm{CP}}]\!]_I)\le Z$: הרשת הרדודה אינה יכולה לדגמן דרגת הפרדה מעבר לרוחבה **תחת כל חלוקה**.
- עמוקה, לוח-שחמט: עם $r_0\ge M$, $\mathrm{rank}([\![\mathcal A^{\mathrm{HT}}]\!]_{I_{\mathrm{check}}})=M^{N/2}$ (מקסימלית) עבור כמעט כל השמות הפרמטרים ⟹ $\mathrm{sep}[\,\cdot\,;I_{\mathrm{check}}]$ אקספוננציאלית (מקסימלית) עבור כמעט כל הפונקציות הממומשות.
- עמוקה, חצייה: מטריציזציה של שורת ה-HT האחרונה ביחס ל-$I_{\mathrm{half}}$ ובהבחנה כי $I_{\mathrm{half}}\cap[\frac N2]=[\frac N2]$, $(I_{\mathrm{half}}-\frac N2)\cap[\frac N2]=\emptyset$, נותנת $[\![\mathcal A^{\mathrm{HT}}]\!]_{I_{\mathrm{half}}}=\sum_{\alpha=1}^{r_{L-1}}a^L_\alpha\cdot\mathrm{vec}[\Phi^{L-1,1,\alpha}]\,\mathrm{vec}[\Phi^{L-1,2,\alpha}]^\top$, ומכאן $\mathrm{rank}([\![\mathcal A^{\mathrm{HT}}]\!]_{I_{\mathrm{half}}})\le r_{L-1}$ וכן $\mathrm{sep}[\,\cdot\,;I_{\mathrm{half}}]\le$ רוחב השכבה החבויה $L-1$, עבור **כל** הפונקציות הניתנות למימוש.
רעיון ההוכחה: לינאריות המטריציזציה + Lemma 3 לכל אורך הדרך.
רלוונטיות למבחן: שורת המחץ על הטיה אינדוקטיבית — CAC-ים עמוקים מעדיפים **תלויות מקומיות (משולבות)** על פני תלויות ארוכות-טווח; CAC-ים רדודים אינם מעדיפים דבר (חלשים באופן אחיד).

## טכניקות וטריקים
- **בנייות מעבר** להוכחת ההכלה $\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B}$: מטריצות משקל זהות + הטיות אפס עבור רשתות ReLU; מסנני בסיס-סטנדרטי $\mathbf a^{l,j,\gamma}=\mathbf e^\gamma$ עבור CAC-ים (המיזוגים הזוגיים אז מתחברים ל-pooling גלובלי). מונוטוניות ברוחב: איפוס משקלי נוירונים/מפות-מאפיינים עודפים.
- **הרכבה-עצמית להכפלת מקטעים לינאריים** (Telgarsky): ממשו אוהל $g$ עם בלוק קטן, הרכיבו $L-1$ פעמים, מזגו פעולות אפיניות רציפות — המקטעים הלינאריים גדלים אקספוננציאלית בעומק בעוד הרוחב נשאר 3.
- **טיעון חצייה/ספירה לאי-קריבות $L^1$**: פונקציה בעלת $\le B+1$ מקטעים יכולה שלא "להחטיא" רק $O(B)$ מתוך $2^{L-1}+1$ הקטעים המתחלפים ברמת $\frac12$; כל קטע מוחטא תורם $\ge$ length$\cdot\frac14$ למרחק ה-$L^1$.
- **זיהוי פונקציה ↔ טנזור** על תחומים דיסקרטיים ($\mathcal A$ = טבלת חיפוש), ההופך את כושר הביטוי של ארכיטקטורות לכוח הייצוגי של פירוקי טנזור (רדודה ↔ CP, עמוקה ↔ HT).
- **ייצוג one-hot + pooling מכפלה** הופך את פלט הרשת לרב-לינארי במסננים — הסיבה שמעגלים אריתמטיים ניתנים לניתוח.
- **אינדוקציה על שכבות** לגזירת פירוק הטנזור הממומש על ידי מודל היררכי עמוק (כל נוירון ↔ טנזור מסדר $2^l$ על שדה הקליטה שלו).
- **חסימת דרגת-מטריציזציה**: לינאריות של $[\![\cdot]\!]_I$ + Lemma 3 ($[\![\mathcal T\otimes\bar{\mathcal T}]\!]_I=[\![\mathcal T]\!]_{I\cap[n]}\odot[\![\bar{\mathcal T}]\!]_{(I-n)\cap[\bar n]}$) + Lemma 2 ($\mathrm{rank}(A\odot B)=\mathrm{rank}A\cdot\mathrm{rank}B$); דרגת סכום $\le$ סכום הדרגות.
- **Eckart–Young–Mirsky** להמרת פער דרגה לחסם תחתון על מרחק Frobenius (אי-קריבות).
- **גנריות דרך קבוצות אפסים של פולינומים**: הציגו השמת פרמטרים אחת שבה פולינום (למשל, $\det$ של מטריציזציה) הוא לא-אפס ⟹ התכונה מתקיימת עבור כמעט כל ההשמות (Thm 2) ⟹ יעילות ביטוי "מלאה".
- **דרגת הפרדה ↔ דרגת מטריציזציה** (Prop 7): תרגמו שאלות דגמון-תלות (הטיה אינדוקטיבית) לאלגברה לינארית; בחרו חלוקות חושפות ($I_{\mathrm{check}}$ לעומת $I_{\mathrm{half}}$).
- **גאומטריית pooling כחוגה של הטיה-אינדוקטיבית**: מיקומים הממוזגים יחד בשכבות מוקדמות יותר יכולים להיות בעלי תלות חזקה יותר המיוצגת ביניהם.

## נקודות רלוונטיות למבחן
- ספירות מקטעים מדויקות: רוחב רדוד $B$ מממש כל לינארית למקוטעין עם $\le B$ מקטעים אך לכל $h\in\mathcal H_B$ יש $\le B+1$ מקטעים — אל תחליפו בין שני הכיוונים. הגדרת "מספר המקטעים הלינאריים" היא ה-$N$ ה*מינימלי* ב-Def 1 (עם $c_0=-\infty$, $c_N=\infty$).
- $g(x)=[2x]_+-[4x-2]_+ +[2x-2]_+$ (רוחב 3, 2 שכבות); ל-$g^{\circ k}$ יש $2^{k-1}$ שיניים; רשת בעלת $L$ שכבות ורוחב 3 מממשת $g^{\circ L-1}$ עם $2+2\cdot2^{L-2}=2+2^{L-1}$ מקטעים. לפיכך מימוש רדוד זקוק ל-$B\ge2^{L-1}+1$, כלומר $B\in\exp(L)$.
- חסם אי-קריבות לשינון: $d(g^{\circ L-1},h)\ge\frac18-B\cdot2^{-L-2}-3\cdot2^{-L-1}$, כך ש-$d<\epsilon$ מכריח $B>2^{L+2}(\frac18-\epsilon)-6$. ספירת הקטעים היא $2^{L-1}+1$ ($2^{L-2}$ קטעים ב-$S_>$, $2^{L-2}+1$ ב-$S_<$); קטע מוחטא עולה [length]$\cdot\frac12\cdot\frac12$; לכל הקטעים המוחטאים פרט ל-$\le2$ יש אורך $2^{-L+1}$. טענת הספירה ("$h$ נמנעת מהחטאה של לכל היותר $\lceil\frac12(2^{L-1}+1)+\frac12(B+1)\rceil$") מושארת כ**תרגיל** — שאלת מבחן טבעית.
- הוכחות אוניברסליות שונות באופיין: חלק 1 הוא *קירוב* של פונקציות רציפות ב-$\int_0^1|\cdot|$ (באמצעות רציפות במידה שווה Heine–Cantor + אינטרפולציה); חלק 2 הוא *מימוש מדויק* של כל הפונקציות על התחום הסופי $[M]^N$ (עם $Z=M^N$, מסננים $\mathbf a^{z,i}=\mathbf e^{d_i}$, משקלי פלט $=\mathcal T_{d_1,\dots,d_N}$).
- ספירות פרמטרים: ל-CAC רדוד יש $(NM+1)Z$ פרמטרים; ל-CAC עמוק יש $\sum_{l=0}^{L-1}(r_{l-1}\cdot N\cdot2^{-l}\cdot r_l)+r_{L-1}$ עם $r_{-1}:=M$; עומק ה-CAC העמוק קבוע ב-$L=\log_2N$ ($N$ חזקה של 2), ה-pooling הוא על זוגות $\{2j-1,2j\}$.
- "קונבולוציוני" לעומת "מחובר מקומית": קונבולוציה משמעה מסננים משותפים $\mathbf a^{z,1}=\dots=\mathbf a^{z,N}$; הניתוח מבוצע עבור המקרה הכללי יותר של חיבור מקומי.
- CP ↔ רדודה, HT ↔ עמוקה; דעו את הרקורסיה של Prop 4 כולל טווחי האינדקסים $j\in[N/2^l]$, $\gamma\in[r_l]$, וסדרי ה-$\Phi$-ים ($2^{l-1}$ ברמה $l-1$... גורמים מסדר $2^{l-1}$ מתחברים לסדר $2^l$).
- עובדות דרגה מרכזיות: $\mathrm{rank}[\![\mathcal A^{\mathrm{CP}}]\!]_I\le Z$ עבור **כל** חלוקה $I$ (לא רק הקנונית); ההשמה העמוקה המיוחדת נותנת $[\![\mathcal A^{\mathrm{HT}}]\!]=I_{M^{N/2}}$ (זקוקה ל-$r_0\ge M$; משתמשת במסנן כולו-אחדות $\mathbf a^{1,j,1}=\mathbf 1$ בשכבה 1 כך ש-$[\![\Phi^{1,j,1}]\!]=\sum_{\alpha=1}^M\mathbf e^\alpha(\mathbf e^\alpha)^\top=I_M$). עמוקה זקוקה רק ל-$\bar B\in O(M)$; רדודה זקוקה ל-$B\in\exp(N)$, ואפילו כדי לקרב עד $\epsilon$: $B\ge M^{N/2}-\epsilon^2$.
- מטריציזציה קנונית = שורות מאונדקסות על ידי מודים **אי-זוגיים** $I=\{1,3,\dots,n-1\}$; מוגדרת רק לסדר זוגי; המטריציזציה לינארית; דעו את הדוגמאות הקטנות $2\times2\times2$ של $[\![\mathcal T]\!]_{\{1,2\}}$ לעומת $[\![\mathcal T]\!]_{\{1,3\}}$.
- Lemma 2 ($\mathrm{rank}(A\odot B)=\mathrm{rank}(A)\,\mathrm{rank}(B)$, הוכחה בתרגול) ו-Lemma 3 (הוכחה בשיעורי בית 2) ניתנים לציטוט; מכפלת Kronecker **אינה** קומוטטיבית.
- EYM כפי שמודפס בסיכומים נקרא $\min_{\mathrm{rank}(W)\le r}\|W-A\|_F^2=\sum_{i=r+1}^{\min\{m_1,m_2\}}\sigma_i(A)$ — המשפט הקלאסי מעלה בריבוע את הערכים הסינגולריים; עבור יישום מטריצת-הזהות כל $\sigma_i=1$ ולכן החסם $\sqrt{M^{N/2}-B}$ אינו מושפע.
- Prop 7 ($\mathrm{sep}[f;I]=\mathrm{rank}[\![\mathcal A]\!]_I$) עם ההוכחה הדו-כיוונית שלה; פרשנות: $\mathrm{sep}=1$ ⟺ הפרדה ⟺ אי-תלות סטטיסטית (עבור צפיפויות); הקשר לשזירה קוונטית הוא הערת אגב מודגשת.
- מסקנות הטיה-אינדוקטיבית: CAC רדוד בגודל סביר מדגמן רק תלות חלשה תחת **כל** החלוקות; CAC עמוק מדגמן תלות מקסימלית תחת $I_{\mathrm{check}}=\{1,3,\dots,N-1\}$ (עבור כמעט כל הפרמטרים) אך רק $\le r_{L-1}$ תחת $I_{\mathrm{half}}=\{1,\dots,N/2\}$ — תואם נתונים טבעיים שבהם המתאמים מקומיים. חלונות pooling רציפים מעדיפים תלויות מקומיות; גאומטריות pooling אחרות מכוונות מחדש את ההטיה (קו מנחה: מיקומים הממוזגים יחד מוקדם יותר יכולים להיות מדוגמנים כתלויים חזק יותר). הדגמה אמפירית: pooling ריבועי (רציף) מנצח במשימת ה*סגירוּת* (תלויות מקומיות), pooling מראה (השתקפות) מנצח במשימת ה*סימטריה* (תלויות על פני מרחקים); הניסוי השתמש בחלונות בגודל 4 אך הניתוח מתקיים גם כאן.
- הוכחות שנדחו (הוגנות כתרגילים): Prop 1 (שיעורי בית 2), Lemma 3 (שיעורי בית 2), Lemma 2 (תרגול), תרגיל ספירת-הקטעים ב-1.4.
- מלכודות סימון: $[z]_+=\max\{0,z\}$; $g^{\circ k}$ = הרכבה $k$-פעמית; $\otimes$ = מכפלה חיצונית (וקטורים: Def 2, טנזורים: Def 3), $\odot$ = מכפלת Kronecker; $[\![\cdot]\!]_I$ = מטריציזציה, $[\![\cdot]\!]$ = קנונית; $r_{-1}:=M$; $\dot\cup$ = איחוד זר; התרגיל בסיכומים מדפיס בטעות "$2^{L+1}+1$" עבור ספירת הקטעים $2^{L-1}+1$, ו-Prop 1 ההופכי מדפיס בטעות "$g\in\mathcal X^{\mathcal Y}$" במקום $g\in\mathcal Y^{\mathcal X}$.
