# תרגול: מכפלת Kronecker + תרגילי כושר ביטוי (תרגול 4)
- **File:** materials/recitations/fodl_recitation_kronecker_expressiveness.pdf
- **Related lectures:** lecture_02_expressiveness (פירוקי טנזורים, אוניברסליות, יעילות ביטויית, דרגת הפרדה)
- **Summary:** כלים ותרגילים התומכים בהרצאות כושר הביטוי. המחצית הראשונה בונה את ארגז הכלים של מכפלת Kronecker: הגדרה עם דוגמה נומרית פתורה, בי-לינאריות/אסוציאטיביות, תכונת המכפלה-המעורבת, כללי שחלוף/היפוך, ה-SVD של מכפלת Kronecker, וכפליוּת הדרגה — בדיוק העובדות המשמשות להוכחת חסמי-תחתית של יעילות-עומק למעגלים אריתמטיים קונבולוציוניים (דרך מטריציזציות). המחצית השנייה עם תרגילי כושר ביטוי: נוירוני ReLU ו-LeakyReLU ניתנים לכתיבה כצירופים לינאריים זה של זה (כך שכל תוצאות המחלקה עוברות בין האקטיבציות), וניתוח של פירוק הטנזור CP תחת אילוץ הסימטריה $a^{z,1}=\dots=a^{z,N}$ — המתאים לשיתוף משקלים ברשת המשויכת, הורס אוניברסליות (רק טנזורים אינוריאנטיים לתמורות ניתנים לביטוי), ועבור $N=2$ מניב בדיוק את המטריצות הסימטריות.

## נושאים שנסקרו
- מכפלת Kronecker $A \odot B$: הגדרה (מטריצת בלוקים $[a_{ij}B]$) ודוגמה נומרית $2\times3$-ב-$2\times2$ (שימו לב: קורס זה משתמש ב-$\odot$ למכפלת Kronecker וב-$\otimes$ למכפלה חיצונית/טנזורית)
- תכונות: בי-לינאריות, אסוציאטיביות, $A \odot 0 = 0$, מכפלה מעורבת, שחלוף, היפוך
- SVD של $A \odot B$ והערכים הסינגולריים המתקבלים; כפליות הדרגה
- ReLU לעומת LeakyReLU: יכולת-ביטוי הדדית דרך צירופים לינאריים של 2 נוירונים
- פירוק טנזור CP עם גורמים משותפים (סימטריים): השפעה על הרשת המתאימה, אוניברסליות, ואפיון $N=2$

## בעיות פתורות וגזירות
**P1.** הוכיחו $(A \odot B)^{-1} = A^{-1} \odot B^{-1}$ עבור $A, B$ הפיכות.
טכניקה: תכונת המכפלה המעורבת: $(A\odot B)(A^{-1}\odot B^{-1}) = (AA^{-1})\odot(BB^{-1}) = I \odot I = I$.

**P2.** SVD ודרגה של מכפלת Kronecker: בהינתן SVD-ים $A = U_A\Sigma_A V_A^\top$, $B = U_B\Sigma_B V_B^\top$, הראו שה-SVD של $A\odot B$ הוא $U = U_A \odot U_B$, $\Sigma = \Sigma_A \odot \Sigma_B$, $V = V_A \odot V_B$, והסיקו $\operatorname{rank}(A\odot B) = \operatorname{rank}(A)\cdot\operatorname{rank}(B)$.
טכניקה: המכפלה המעורבת מראה ש-$U, V$ אורתוגונליות ושהפירוק מתקיים; הערכים הסינגולריים הם כל המכפלות $\sigma_i(A)\sigma_j(B)$, ולכן ספירת הערכים הסינגולריים השונים מאפס נותנת את זהות הדרגה.

**P3.** הביעו נוירון LeakyReLU באמצעות נוירוני ReLU: עבור $f(x) = \sigma_a(\langle w,x\rangle + b)$, עם $g_1(x) = \sigma(\langle w,x\rangle+b)$ ו-$g_2(x) = \sigma(-(\langle w,x\rangle+b))$, הראו $f = g_1 - a\, g_2$.
טכניקה: ניתוח מקרים לפי סימן $z = \langle w,x\rangle + b$ ($z>0$: $g_1 = z, g_2 = 0$; $z<0$: $g_1 = 0, -a g_2 = az$; $z=0$: שניהם אפס).

**P4.** הביעו נוירון ReLU באמצעות נוירוני LeakyReLU: עם $g_1(x)=\sigma_a(\langle w,x\rangle+b)$, $g_2(x)=\sigma_a(-(\langle w,x\rangle+b))$, מצאו $\beta,\gamma$ עם $\sigma(\langle w,x\rangle+b) = \beta g_1 + \gamma g_2$.
טכניקה: התאמת מקדמים על $z>0$ נותנת $\beta - \gamma a = 1$; על $z<0$ נותנת $\beta a - \gamma = 0$; הפתרון מניב $\gamma = \frac{a}{1-a^2}$, $\beta = 1 + \frac{a^2}{1-a^2} = \frac{1}{1-a^2}$. (ל-$\beta$ המודפס בשקופית יש טעות-סימן; ערכים אלה מקיימים את שתי המשוואות.)

**P5.** פירוק CP $\mathcal{A} = \sum_{z=1}^{Z} a_z \cdot \otimes_{n=1}^{N} a^{z,n}$ תחת האילוץ $a^{z,1} = \dots = a^{z,N}$ לכל $z$:
- (Q1) השפעה על הרשת המתאימה: לשכבות (הקונבולוציה 1×1) יש שיתוף משקלים — פילטרים באותו ערוץ שווים.
- (Q2) אוניברסליות: נכשלת לכל $M, N \ge 2$; רק טנזורים אינוריאנטיים לתמורות מודים ($\mathcal{A}_{i_1,\dots,i_N} = \mathcal{A}_{\pi(i_1),\dots,\pi(i_N)}$) ניתנים לביטוי, כך שלדוגמה $e_2 \otimes e_1 \otimes \dots \otimes e_1$ לא ניתן לייצוג או קירוב.
- (Q3) עבור $N=2$ ו-$Z$ בלתי-מוגבל: המחלקה בת-הביטוי היא בדיוק המטריצות הסימטריות $\mathcal{S} = \{A \in \mathbb{R}^{M,M} : A = A^\top\}$.
טכניקה: הסימטריה של המחוברים כופה אינוריאנטיות לתמורות; ובכיוון ההפוך עבור $N=2$ השתמשו בפירוק העצמי $A = UDU^\top = \sum_{i=1}^M \lambda_i U_i \otimes U_i$ (פירוק CP מאולץ), וכל $\sum_z a_z\, a^z (a^z)^\top$ הוא סימטרי.

## נוסחאות ועובדות מפתח
- הגדרה: עבור $A \in \mathbb{R}^{m,n}, B \in \mathbb{R}^{p,q}$: $A \odot B := \begin{pmatrix} a_{11}B & \cdots & a_{1n}B \\ \vdots & \ddots & \vdots \\ a_{m1}B & \cdots & a_{mn}B\end{pmatrix} \in \mathbb{R}^{mp,nq}$.
- בי-לינאריות/אסוציאטיביות: $A\odot(B+C) = A\odot B + A\odot C$; $(\alpha A)\odot B = A\odot(\alpha B) = \alpha(A\odot B)$; $(A\odot B)\odot C = A\odot(B\odot C)$; $A \odot 0 = 0$.
- מכפלה מעורבת: $(A\odot B)(C\odot D) = (AC)\odot(BD)$ (ממדים תואמים).
- שחלוף / היפוך: $(A\odot B)^\top = A^\top \odot B^\top$; $(A\odot B)^{-1} = A^{-1}\odot B^{-1}$.
- SVD: $A\odot B = (U_A\odot U_B)(\Sigma_A\odot\Sigma_B)(V_A\odot V_B)^\top$; ערכים סינגולריים $\{\sigma_i(A)\sigma_j(B)\}$.
- כפליות הדרגה: $\operatorname{rank}(A\odot B) = \operatorname{rank}(A)\cdot\operatorname{rank}(B)$.
- אקטיבציות: $\operatorname{ReLU}(z) = \sigma(z) = \max\{0,z\}$; $\operatorname{LeakyReLU}(z;a) = \sigma_a(z) = \max\{a z, z\}$, $a \in (0,1)$.
- המרות: $\sigma_a(z) = \sigma(z) - a\,\sigma(-z)$; $\;\sigma(z) = \frac{1}{1-a^2}\sigma_a(z) + \frac{a}{1-a^2}\sigma_a(-z)$.
- פירוק CP: $\mathcal{A} = \sum_{z=1}^Z a_z \cdot \otimes_{n=1}^N a^{z,n}$, $a_z \in \mathbb{R}$, $a^{z,n} \in \mathbb{R}^M$.

## נקודות רלוונטיות למבחן
- כפליות הדרגה של מכפלת Kronecker היא *המנוע* מאחורי חסמי-תחתית של יעילות-עומק למעגלים אריתמטיים קונבולוציוניים (דרך הלמה "מטריציזציה של מכפלה חיצונית = מכפלת Kronecker של מטריציזציות", המוכחת ב-hw_expressiveness) — צפו לצטט או למחזר אותה.
- ההמרה ReLU$\leftrightarrow$LeakyReLU נבחנת ישירות במבחן: מבחני עבר (מועד ב׳ 2022, מבחן לדוגמה) מבקשים לבצע מחדש תוצאות מהמחלקה עם leaky ReLU; hw_expressiveness P1.3 עושה את אותו הדבר. שננו את שתי זהויות שני-הנוירונים.
- פירוק CP סימטרי/עם-גורם-משותף מקשר בין שיתוף משקלים לאובדן אוניברסליות — שאלה מושגית קומפקטית; חומר דרגת-ההפרדה של בלוק ההרצאות הזה הופיע במבחן מועד א׳ 2022.
- שימו לב לסימון: בקורס זה $\odot$ = מכפלת Kronecker, $\otimes$ = מכפלה חיצונית (טנזורית); ספרי לימוד רבים משתמשים ב-$\otimes$ ל-Kronecker.
- עובדת ה-SVD-של-Kronecker נותנת תשובות מיידיות לשאלות על ערכים סינגולריים/נורמות של $A \odot B$ (לדוגמה $\|A\odot B\|_{2} = \|A\|_2\|B\|_2$).
