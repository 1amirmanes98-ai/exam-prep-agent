# Mock Exam 6 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_06.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-10-28 (Q1: homogeneity on random nets; $\inf_c\sup_{\lambda\in[0,1]}|c\lambda-\lambda^2| = 3-2\sqrt2 \approx 0.1716 \ge \tfrac16$
on a grid; $|A_h| \le 2B$ by dense angular sampling on 400 random planar nets (incl. parallel and zero rows) and $|A_h| = 2B$ for
$v>0$, pairwise non-parallel $w_i$, $B = 1..8$; the width-$m$ interpolant attains error exactly $1/(4m^2)$ for $m \in \{1,2,3,5,10,37\}$;
Q2: PL of least squares at 1000 random points, Euler GF ($dt = 10^{-4}$) obeys $f(t) \le e^{-2\mu t}f_0$, trajectory length
$3.00 \le 4.62$ = bound, limit = projection of $w_0$; 1-D instance length $= 1.000$ = bound; weight-normalized GF:
$\|v\|$ drift $1.3\text{e-}7$ (Euler $dt = 10^{-3}$, $T = 20$), $v^\top\nabla_v F \approx 10^{-17}$, GD norm identity exact;
Q3: brute-force count of $\{w \in G_p^d : \|w\|_0 \le k\}$ for $d \le 4$, $p \le 2$ against $(1+d2^{p+1})^k$; $\sum\pi = 1$;
rounding bound $\|w-\bar w\|_1 \le \sigma_k(w)+k2^{-(p+1)}$ on 20000 random cases; the choice $p = \lceil\log_2(s/\eta)\rceil$).

## Q1 — Bias-free ReLU networks: cones, sectors, and restoring biases (40)

**Hint:** Without biases every neuron's "kink" set $\{w_i^\top x = 0\}$ passes through the origin, so the whole picture is invariant under positive scaling — what does that force along a single ray, and what shape do the activation regions have? In the plane, count how many open pieces $m$ lines through the origin leave, and for the lower bound use that a sum of ReLUs with positive output weights is convex, so it lies above each of its linear pieces. For the biases, think of the bias as a weight on an extra input that is always $1$.

**Full solution:**

**1.a (3) Positive homogeneity**

**What is asked.** Prove that a bias-free network scales linearly along every ray from the origin, $h(\lambda x)=\lambda h(x)$ for every $\lambda\ge0$, and in particular $h(0)=0$. The answer is a short proof.

**Tool and why.** Positive homogeneity of ReLU, then linearity of the sum over neurons (cheat sheet §5). Without biases, $\lambda$ enters each neuron only through $w_i^\top(\lambda x)$, which equals $\lambda\,w_i^\top x$, so it is enough to pull $\lambda$ out of a single ReLU.

**Definitions.** No new notation.

**Solution.**

Step 1, one ReLU: for $\lambda\ge0$ and $z\in\mathbb{R}$,

$$\begin{aligned}
\sigma(\lambda z)&=\max\{0,\lambda z\}\\
&=\lambda\max\{0,z\}\\
&=\lambda\sigma(z).
\end{aligned}$$

The middle step holds because multiplying both entries of a maximum by the same non-negative number does not change which entry is larger. For $\lambda=0$ both sides are $0$, so the case $\lambda=0$ is included.

Step 2, the whole network: apply Step 1 with $z=w_i^\top x$ to every neuron, using $w_i^\top(\lambda x)=\lambda\,w_i^\top x$:

$$\begin{aligned}
h(\lambda x)&=\sum_i v_i\,\sigma(\lambda\,w_i^\top x)\\
&=\lambda\sum_i v_i\,\sigma(w_i^\top x)\\
&=\lambda\,h(x).
\end{aligned}$$

Step 3, the origin: Step 2 with $\lambda=0$ gives $h(0)=0\cdot h(x)$, that is, $h(0)=0$.

**In words.** Scaling the input scales every pre-activation by the same non-negative factor, and a ReLU commutes with such a factor. Nothing in a bias-free network can tell the scale of the input, so along a ray it is a straight line through the origin.

**Sanity check.** A negative factor breaks the identity: $\sigma(-1)=0$ while $-\sigma(1)=-1$. This is why the claim is stated only for $\lambda\ge0$.

**What to write in the exam.**

- For $\lambda\ge0$: $\sigma(\lambda z)=\lambda\sigma(z)$, including $\lambda=0$ (2 pts).
- Sum over the neurons: $h(\lambda x)=\lambda h(x)$, and $\lambda=0$ gives $h(0)=0$ (1 pt).

*Verified: 200 random bias-free nets ($D\le4$, $B\le5$, $\lambda\in[0,3]$) satisfy $h(\lambda x)=\lambda h(x)$ to within $10^{-9}$.*

**1.b (5) A floor of $\tfrac16$ along every ray**

**What is asked.** Prove that along every unit direction $u$ the error of any bias-free net against $f(x)=\|x\|^2$ on $\lambda\in[0,1]$ is at least $\tfrac16$, for every width $B$, and conclude that no width approximates $f$ uniformly on the unit ball better than $\tfrac16$. The answer is a proof by contradiction.

**Tool and why.** Part 1.a turns $h$ on a ray into a single number, its slope, and then two test points give a contradiction. The conclusion is a statement about universality in the sup-norm (cheat sheet §4).

**Definitions.** For a fixed unit vector $u$ let $c:=h(u)$. We introduce it because, by part 1.a, $h$ on the ray through $u$ is the line $\lambda\mapsto c\lambda$, so all of $h$ along the ray is described by $c$.

**Solution.**

Step 1, restrict to the ray: by part 1.a, $h(\lambda u)=c\lambda$ for $\lambda\ge0$. Since $\|u\|=1$, also $f(\lambda u)=\lambda^2$. So the quantity to bound is

$$\sup_{\lambda\in[0,1]}\big|c\lambda-\lambda^2\big|.$$

Step 2, assume the opposite: suppose this supremum is smaller than $\tfrac16$. Then every $\lambda\in[0,1]$ has $|c\lambda-\lambda^2|<\tfrac16$.

Step 3, the point $\lambda=1$: here $|c-1|<\tfrac16$, so $c>1-\tfrac16$, that is, $c>\tfrac56$.

Step 4, the point $\lambda=\tfrac12$: here $|\tfrac c2-\tfrac14|<\tfrac16$. Multiplying by $2$ gives $|c-\tfrac12|<\tfrac13$, so $c<\tfrac12+\tfrac13$, that is, $c<\tfrac56$.

Step 5, contradiction: Steps 3 and 4 require $c>\tfrac56$ and $c<\tfrac56$ at once, which is impossible. Hence

$$\boxed{\sup_{\lambda\in[0,1]}\big|h(\lambda u)-f(\lambda u)\big|\ge\tfrac16}$$

Step 6, conclusion: $B$, $h$ and $u$ were arbitrary. Every point $\lambda u$ with $\lambda\in[0,1]$ lies in the unit ball, so for every $h\in\bigcup_B\mathcal{H}_B^D$

$$\sup_{\|x\|\le1}\big|h(x)-\|x\|^2\big|\ge\tfrac16.$$

No width helps, so $\bigcup_B\mathcal{H}_B^D$ is not universal with respect to continuous functions in the sup-norm on the unit ball.

**In words.** Along a ray a bias-free net is a line through the origin, while $\|x\|^2$ is a parabola. Matching the parabola at $\lambda=1$ needs a slope near $1$, and matching it at $\lambda=\tfrac12$ needs a slope near $\tfrac12$; one line cannot do both.

**Sanity check.** The slope $c=\tfrac56$ has error exactly $\tfrac16$ at both test points, so the two-point argument cannot give more than $\tfrac16$. The exact best floor along a ray is $3-2\sqrt2\approx0.172$, attained at $c=2(\sqrt2-1)$, slightly above $\tfrac16\approx0.167$ (not required).

**What to write in the exam.**

- Along the ray, $h(\lambda u)=c\lambda$ with $c=h(u)$, and $f(\lambda u)=\lambda^2$ (2 pts).
- If the supremum were below $\tfrac16$: $\lambda=1$ gives $c>\tfrac56$ and $\lambda=\tfrac12$ gives $c<\tfrac56$, a contradiction (2 pts).
- Since $B$, $h$ and $u$ are arbitrary, no width beats $\tfrac16$: the union is not universal (1 pt).

*Verified: a grid over $c\in[0,2]$ and $\lambda\in[0,1]$ gives min-max error $0.17160$, equal to $3-2\sqrt2$ and above $\tfrac16$; the bounds $\tfrac56$ were checked in exact fractions.*

**2. (8) Activation cones and $|A_h|\le2^B$**

**What is asked.** Four claims: $C(x)$ contains $x$ and is open; $C(x)$ is a convex cone; $h(x')=a(x)^\top x'$ on $C(x)$, so $h$ is linear around $x$; and every element of $A_h$ is one of the vectors $a(x)$, so $|A_h|\le2^B$. The answer is a proof.

**Tool and why.** A ReLU net is linear wherever the on/off pattern of its neurons is frozen (cheat sheet §5). The pattern is decided by finitely many signs of linear functions, which gives openness and convexity, and counting patterns gives the bound.

**Definitions.** For $i\in I$ let $s_i:=\operatorname{sign}(w_i^\top x)$, the sign pattern of $x$; $C(x)$ is the set of points with the same pattern. Let $Z_i$ be the hyperplane $\{z:w_i^\top z=0\}$, where neuron $i$ switches; we need it to find points off all switching sets.

**Solution.**

Step 1, $x\in C(x)$ and openness: $x$ has its own sign pattern, so $x\in C(x)$. Each map $x'\mapsto w_i^\top x'$ is continuous, so the set of $x'$ with $\operatorname{sign}(w_i^\top x')=s_i$ is an open half-space, the preimage of $(0,\infty)$ or of $(-\infty,0)$. $C(x)$ is the intersection of $|I|$ such sets, a finite intersection of open sets, hence open. If $I=\emptyset$ then $C(x)=\mathbb{R}^D$.

Step 2, convex cone: let $x',x''\in C(x)$ and $\lambda,\mu>0$. For each $i\in I$, by linearity,

$$w_i^\top(\lambda x'+\mu x'')=\lambda\,w_i^\top x'+\mu\,w_i^\top x''.$$

Both terms on the right have sign $s_i$, because positive multiples keep the sign, and a sum of two numbers of the same strict sign has that sign. So $\lambda x'+\mu x''\in C(x)$.

Step 3, linearity on $C(x)$: let $x'\in C(x)$ and $i\in I$. If $w_i^\top x>0$ then $w_i^\top x'>0$ and $\sigma(w_i^\top x')=w_i^\top x'$. If $w_i^\top x<0$ then $\sigma(w_i^\top x')=0$. A neuron with $w_i=0$ contributes $\sigma(0)=0$. Summing,

$$h(x')=\sum_{i\in I:\,w_i^\top x>0}v_i\,w_i^\top x'=a(x)^\top x'.$$

Step 4, linear around $x$: since $C(x)$ is open, it contains a ball of some radius $\epsilon>0$ around $x$, and on that ball $h$ equals $a(x)^\top x'$. So $h$ is linear around $x$ according to $a(x)$.

Step 5, every element of $A_h$ is some $a(x)$: let $a\in A_h$, so $h=a^\top(\cdot)$ on some ball $\mathcal{B}$. The union of the $Z_i$, $i\in I$, is a finite union of hyperplanes and has empty interior, so $\mathcal{B}$ contains a point $x$ off all of them. The set $\mathcal{B}\cap C(x)$ is open and non-empty, since it contains $x$, and on it both $a^\top x'$ and $a(x)^\top x'$ equal $h(x')$. A linear form that vanishes on an open set is zero, because the differences of points in a small ball span $\mathbb{R}^D$. Hence $a=a(x)$. This step also covers linearity points that sit on a hyperplane or at the origin.

Step 6, counting: $a(x)$ depends only on the sign pattern $(s_i)_{i\in I}\in\{+,-\}^{|I|}$, so

$$|A_h|\le2^{|I|}\le2^B.$$

**In words.** Each neuron cuts space by a hyperplane through the origin. Inside each cell of this arrangement the on/off pattern is frozen, so $h$ is one linear function there, and there are at most $2^B$ patterns.

**Sanity check.** For $D=1$, $B=1$, $w=1$, $v=1$ we get $h=\sigma$: the cones are $(0,\infty)$ and $(-\infty,0)$, the coefficients are $1$ and $0$, and $|A_h|=2$, which equals $2^1$.

**What to write in the exam.**

- Each sign condition is an open half-space, so $C(x)$ is open, and it contains $x$ (2 pts).
- A positive combination of two numbers of sign $s_i$ has sign $s_i$: convex cone (2 pts).
- On $C(x)$ the active set is frozen, so $h(x')=a(x)^\top x'$; neurons with $w_i=0$ give $0$ (2 pts).
- Any linearity ball contains a point off all hyperplanes, so $a=a(x)$, and there are at most $2^B$ patterns (2 pts).

*Verified: on 400 random planar nets (including parallel and zero rows), dense angular sampling found only coefficients of the form $a(x)$, never more than $2B$, hence at most $2^B$.*

**3.a (6) At most $2B$ coefficients in the plane**

**What is asked.** Prove $|A_h|\le2B$ for every $h\in\mathcal{H}_B^2$. The answer is a proof, sharper than the $2^B$ of part 2.

**Tool and why.** In the plane the switching sets are lines through the origin, and such a central arrangement has few cells (cheat sheet §5). So we count sectors instead of sign patterns, and reuse part 2 on each sector.

**Definitions.** Let $\ell_1,\dots,\ell_m$ be the distinct lines among the $Z_i$, $i\in I$; parallel weights give the same line, so $m\le|I|$, and $|I|\le B$. A sector is a set $\{ru:r>0,\ u\in\text{arc}\}$ for an open arc of the unit circle between consecutive intersection points. For a sector $S$, $a_S$ is the coefficient of $h$ on $S$.

**Solution.**

Step 1, the trivial case: if $I=\emptyset$ then $h\equiv0$ and $A_h=\{0\}$, so $|A_h|=1$, which is at most $2B$. From now on $m\ge1$.

Step 2, counting sectors: each $\ell_j$ meets the unit circle in two antipodal points. Distinct lines through the origin share only the origin, so these are $2m$ distinct points, and they cut the circle into $2m$ open arcs. The plane minus the lines is the disjoint union of the $2m$ open sectors over these arcs, and each sector is connected.

Step 3, one pattern per sector: on a sector $S$ every $w_i^\top z$ with $i\in I$ is continuous and never $0$, because $S$ avoids all the lines. A continuous function without zeros on a connected set has constant sign, so the whole of $S$ has one sign pattern and lies in a single cone $C(x)$ of part 2. By part 2, $h(z)=a_S^\top z$ on $S$.

Step 4, every element of $A_h$ is some $a_S$: if $h=a^\top(\cdot)$ on a ball, the ball meets some open sector $S$, because the lines have empty interior. On that open intersection $a^\top z$ and $a_S^\top z$ agree, so $a=a_S$, exactly as in part 2, Step 5.

Step 5, conclusion: $A_h$ is contained in the set of the $a_S$, so

$$|A_h|\le2m\le2B.$$

**In words.** In the plane most sign patterns cannot occur: $m$ lines through one point cut the plane into only $2m$ pieces, not $2^m$.

**Sanity check.** With $w_1=(1,0)$ and $w_2=(2,0)$ there is one line and two sectors: $h(z)=(v_1+2v_2)\,\sigma(z_1)$ has at most $2$ coefficients, fewer than $2B=4$. The bound counts distinct lines, not neurons.

**What to write in the exam.**

- Distinct lines: $m\le B$; they give $2m$ points on the circle and $2m$ open sectors (2 pts).
- Each sector is connected and avoids the lines, so its pattern is constant and $h=a_S^\top(\cdot)$ there (2 pts).
- A linearity ball meets an open sector, so every $a\in A_h$ is some $a_S$, and $|A_h|\le2m$, which is at most $2B$ (2 pts).

*Verified: dense angular sampling on 400 random planar nets with $B\le6$, including parallel and zero rows, never found more than $2B$ distinct coefficients.*

**3.b (6) Exactly $2B$ with positive output weights**

**What is asked.** For pairwise independent $w_i$ and positive $v_i$, prove that the $2B$ sector coefficients are pairwise distinct, so $|A_h|=2B$; conclude that the maximum over $\mathcal{H}_B^2$ is $2B$, and compare with $2^B$. The answer is a proof by contradiction plus a comparison.

**Tool and why.** Convexity (cheat sheet §7): with $v_i>0$ the net is a sum of convex functions, so it lies above each of its linear pieces. Adjacent sectors differ by one neuron, but non-adjacent sectors could in principle share a coefficient, and convexity is what rules that out.

**Definitions.** Let $S\ne S'$ be two sectors. For $x\in S$ and $x'\in S'$ let $y(t):=(1-t)x+tx'$, $t\in[0,1]$, the segment from $x$ to $x'$. Let $t^*$ be the supremum of the $t$ with $y([0,t])\subseteq S$, the moment the segment first leaves $S$, and $z:=y(t^*)$.

**Solution.**

Step 1, reduction: pairwise independence makes the $B$ lines distinct, so $m=B$ and there are $2B$ sectors. Each $a_S$ lies in $A_h$, because $h$ is linear around any point of the open set $S$. It remains to show that the $2B$ vectors $a_S$ are pairwise distinct.

Step 2, the support inequality: each $z\mapsto v_i\sigma(w_i^\top z)$ is a positive multiple of a convex function of a linear map, hence convex, and so is the sum $h$. On a sector $S$, $h$ is differentiable with gradient $a_S$. For a convex differentiable function the tangent plane lies below the graph, so for $x\in S$ and every $y$

$$\begin{aligned}
h(y)&\ge h(x)+a_S^\top(y-x)\\
&=a_S^\top y,
\end{aligned}$$

where the last step uses $h(x)=a_S^\top x$.

Step 3, equal coefficients force linearity on a segment: suppose $a_S=a_{S'}$ and call this vector $a$. Pick $x\in S$ and $x'\in S'$ with $x'$ not on the line $\mathbb{R}x$; this is possible because $S'$ is open and a line is not. Convexity of $h$ and $h(x)=a^\top x$, $h(x')=a^\top x'$ give the upper bound

$$\begin{aligned}
h(y(t))&\le(1-t)h(x)+t\,h(x')\\
&=a^\top y(t),
\end{aligned}$$

and Step 2 with the vector $a$ gives the lower bound $h(y(t))\ge a^\top y(t)$. So $h=a^\top(\cdot)$ on the whole segment. Because $x$ and $x'$ are linearly independent, the segment never passes through $0$ and lies on a line that does not pass through the origin.

Step 4, the first crossing: $t^*<1$, since $y(1)=x'$ lies in $S'$, which is disjoint from $S$, and $z\notin S$, since $S$ is open. So $z\ne0$ is a boundary point of $S$, hence lies on some line $\ell_i$, and on only that one, since distinct lines through the origin meet only at $0$. The segment is not contained in $\ell_i$, because it contains $x\notin\ell_i$, so it crosses $\ell_i$ at $z$. For $t\in(t^*,t^*+\epsilon)$ with small $\epsilon$ the points $y(t)$ lie in the sector $S''$ on the other side of $\ell_i$ near $z$. Crossing $\ell_i$ flips only neuron $i$, so

$$a_{S''}-a_S=\pm v_iw_i\ne0,$$

because $v_i>0$ and $w_i\ne0$.

Step 5, contradiction: pick $t_1\ne t_2$ in $(t^*,t^*+\epsilon)$. The points $y(t_1)$ and $y(t_2)$ lie in $S''$ and on a line not through the origin, so they are linearly independent and span $\mathbb{R}^2$. On both, $a_{S''}^\top y$ and $a^\top y$ equal $h(y)$, so $a_{S''}=a$. But $a=a_S$, contradicting Step 4. Hence the $a_S$ are pairwise distinct:

$$\boxed{|A_h|=2B}$$

Step 6, the maximum: by part 3.a every $h\in\mathcal{H}_B^2$ has $|A_h|\le2B$, and this $h$ attains it, so the maximum is $2B$.

Step 7, comparison: $2B$ grows linearly in $B$, while the sign-pattern bound $2^B$ of part 2 grows exponentially; for $B=10$ this is $20$ against $1024$. In the plane most sign patterns are geometrically impossible, because the arrangement is central and not a product of independent choices. Contrast a\_2023 Q1(3), where $2^D$ regions needed $D$ input dimensions.

**In words.** Convexity means $h$ lies above every one of its linear pieces. If two pieces had the same coefficient, $h$ would be that single linear function along the whole segment between them, but the segment must cross a kink where the slope changes.

**Sanity check.** Positivity matters: with $w_i$ at angles $0$, $\tfrac\pi3$, $\tfrac{2\pi}3$ and $v=(1,-1,1)$ one gets $v_1w_1+v_2w_2+v_3w_3=0$. Opposite sectors have complementary patterns, so their coefficients add up to that sum, and one pair of opposite sectors shares the coefficient $0$: only $5$ distinct coefficients instead of $6$ (not required).

**What to write in the exam.**

- Distinct lines give $2B$ sectors, each $a_S\in A_h$; it remains to show they differ (1 pt).
- Positive $v_i$ make $h$ convex, so $h\ge a_S^\top(\cdot)$; equal coefficients make $h$ linear on a segment avoiding the origin (2 pts).
- The first boundary crossing flips one neuron, so the next coefficient is $a_S\pm v_iw_i$ (2 pts).
- Two independent points of the segment in $S''$ force $a_{S''}=a_S$, a contradiction; so $|A_h|=2B$, versus $2^B$ (1 pt).

*Verified: for $B=1,\dots,8$ with random pairwise independent $w_i$ and positive $v_i$, angular sampling found exactly $2B$ distinct coefficients; the example with $v=(1,-1,1)$ gives $5$.*

**4.a (3) A bias is a weight on a constant input**

**What is asked.** Two directions: every biased net $g\in\mathcal{N}_B^D$ is the slice $x\mapsto h(x,1)$ of some bias-free $h$ of width $B+1$, and every slice of a bias-free $h$ of width $B$ is a biased net of width $B$. The answer is two constructions.

**Tool and why.** The identity $w_i^\top x+b_i=(w_i,b_i)^\top(x,1)$: a bias is a weight on an input that is always $1$ (cheat sheet §5). The output bias $c$ needs one more neuron, because $c=c\,\sigma(1)$.

**Definitions.** For $i\le B$ let $\tilde w_i:=(w_i,b_i)\in\mathbb{R}^{D+1}$, the hidden weight that absorbs the bias. Let $e_{D+1}$ be the last standard basis vector of $\mathbb{R}^{D+1}$.

**Solution.**

Step 1, construction: given $g(x)=\sum_{i=1}^Bv_i\sigma(w_i^\top x+b_i)+c$, take the $B$ neurons with weights $\tilde w_i$ and output weights $v_i$, and add neuron $B+1$ with $\tilde w_{B+1}:=e_{D+1}$ and $v_{B+1}:=c$. Any sign of $c$ is allowed, since output weights are arbitrary reals.

Step 2, check: $\tilde w_i^\top(x,1)=w_i^\top x+b_i$ and $e_{D+1}^\top(x,1)=1$, so

$$\begin{aligned}
h(x,1)&=\sum_{i=1}^Bv_i\sigma(w_i^\top x+b_i)+c\,\sigma(1)\\
&=g(x),
\end{aligned}$$

because $\sigma(1)=1$. So $h\in\mathcal{H}_{B+1}^{D+1}$ has the required slice.

Step 3, converse: for $h\in\mathcal{H}_B^{D+1}$ write each hidden weight as $\tilde w_i=(w_i,b_i)$ with $w_i\in\mathbb{R}^D$. Then $h(x,1)=\sum_iv_i\sigma(w_i^\top x+b_i)$, which is in $\mathcal{N}_B^D$ with $c=0$.

**In words.** Appending a constant coordinate turns every affine function of $x$ into a linear function of $(x,1)$, so biases come for free; only the output constant costs an extra neuron.

**Sanity check.** The constant net $g\equiv c$ (all $v_i=0$) is reproduced only through neuron $B+1$, and a negative $c$ works because $v_{B+1}=c$ may be negative.

**What to write in the exam.**

- Set $\tilde w_i=(w_i,b_i)$, add $\tilde w_{B+1}=e_{D+1}$ with $v_{B+1}=c$; then $h(x,1)=g(x)$ (2 pts).
- Conversely, splitting $\tilde w_i=(w_i,b_i)$ gives a biased net with $c=0$ (1 pt).

*Verified: random biased nets with $D\le3$ and their bias-free embeddings with $B+1$ neurons agree on $1000$ random inputs to within $10^{-12}$.*

**4.b (5) At most $B+1$ pieces in one dimension, and a tight example**

**What is asked.** For $D=1$: prove that every $g\in\mathcal{N}_B^1$ is piecewise linear with at most $B+1$ pieces, using the embedding of part 4.a and the lines of the bias-free picture, and give a $g$ with exactly $B+1$ pieces, proving the count. The answer is a proof and an example.

**Tool and why.** Part 2 says $h$ is linear on each open cone of a central arrangement. Restricting to the line $\{(x,1)\}$, which misses the origin, every switching line is met at most once, so the pieces are counted by crossing points (cheat sheet §5).

**Definitions.** Let $L:=\{(x,1):x\in\mathbb{R}\}$, the slice. For each neuron let $\ell_i$ be its switching line $\{z:\tilde w_i^\top z=0\}$. Let $t_1,\dots,t_r$ be the points where $L$ meets these lines, in increasing order, and put $t_0:=-\infty$, $t_{r+1}:=\infty$.

**Solution.**

Step 1, embedding: by part 4.a, $g(x)=h(x,1)$ with $\tilde w_i=(w_i,b_i)$ for $i\le B$ and $\tilde w_{B+1}=(0,1)$.

Step 2, where the lines meet $L$: if $w_i\ne0$, the point $(x,1)$ is on $\ell_i$ exactly when $w_ix+b_i=0$, so $\ell_i$ meets $L$ at the single point $x=-b_i/w_i$. If $w_i=0$ and $b_i\ne0$, then $\ell_i$ is the axis $z_2=0$, parallel to $L$, and is never met; on $L$ that neuron is the constant $\sigma(b_i)$. Neuron $B+1$ also has the line $z_2=0$ and is the constant $\sigma(1)=1$ on $L$. A neuron with $\tilde w_i=0$ vanishes identically.

Step 3, pieces: so $L$ meets the lines in at most $B$ points, $r\le B$. Each open interval $(t_{j-1},t_j)$, seen inside $L$, avoids every line and is connected, so it lies in a single open cone of part 2, on which $h$ is linear. Hence on that interval $g(x)=h(x,1)$ is affine in $x$.

Step 4, closed pieces: $g$ is continuous, so it is affine on each closed interval $[t_{j-1},t_j]$. There are $r+1$ intervals, and $r+1\le B+1$. In Lecture 2, Def 1 the number of pieces is a minimum over partitions, so exhibiting one partition proves the bound.

Step 5, a tight example: let $g(x):=\sum_{i=1}^B\sigma(x-i)$, which is in $\mathcal{N}_B^1$. On $(j,j+1)$ exactly the neurons with $i\le j$ are active, so the slope there is $j$, for $j=0,\dots,B$, where $(0,1)$ is read as $(-\infty,1)$ and $(B,B+1)$ as $(B,\infty)$. At each $i\in\{1,\dots,B\}$ the left slope is $i-1$ and the right slope is $i$, so $g$ is not affine on any neighbourhood of $i$. Every partition into affine pieces therefore has a breakpoint at each of the $B$ points, so at least $B+1$ pieces. With the upper bound, $g$ has exactly $B+1$ pieces, so the largest possible number of pieces is

$$\boxed{B+1}$$

**In words.** A biased net in one dimension is an affine slice of a bias-free net in two dimensions. The slice meets each switching line at most once, and the bias neuron's line is parallel to the slice, so it adds no breakpoint.

**Sanity check.** For $B=1$, $g(x)=\sigma(x-1)$ has slopes $0$ and $1$, so $2$ pieces, which is $B+1$. A neuron with $w_i=0$ is constant on the slice and adds nothing, consistent with Step 2.

**What to write in the exam.**

- Embed with $\tilde w_{B+1}=(0,1)$ and restrict to $L$, which misses the origin (1 pt).
- A line with $w_i\ne0$ meets $L$ once; lines with $w_i=0$ and the bias neuron are parallel to $L$ (1 pt).
- At most $B$ crossing points; each interval lies in one cone, so $g$ is affine there: at most $B+1$ pieces (1 pt).
- Example $\sum_{i=1}^B\sigma(x-i)$: slopes $0,\dots,B$, a breakpoint forced at each $i$, exactly $B+1$ pieces (2 pts).

*Verified: finite-difference slopes of $\sum_{i=1}^B\sigma(x-i)$ for $B=5$ are $0,0,1,2,3,4,5$ on the unit intervals from $(-1,0)$ to $(5,6)$.*

**4.c (4) A bias-free width-$m$ net that fits $x^2$ on the slice**

**What is asked.** Build $h\in\mathcal{H}_m^2$ with error at most $\tfrac1{4m^2}$ between $h(x,1)$ and $x^2$ on $[0,1]$, and explain why this does not contradict part 1.b. The answer is a construction, an error bound and one or two sentences.

**Tool and why.** Piecewise-linear interpolation of a convex function (cheat sheet §5): the chord of $x^2$ on each of $m$ equal intervals. The second input plays the role of a bias by part 4.a, so the kinks can sit at $x=\tfrac im$ without any bias term.

**Definitions.** Let

$$h(z):=\frac1m\,\sigma(z_1)+\frac2m\sum_{i=1}^{m-1}\sigma\Big(z_1-\frac im\,z_2\Big).$$

For $j\in\{1,\dots,m\}$ the $j$-th interval is $[\tfrac{j-1}m,\tfrac jm]$.

**Solution.**

Step 1, width: $h$ has $1+(m-1)$ neurons, that is $m$, and no biases, so $h\in\mathcal{H}_m^2$.

Step 2, $h$ on the slice: let $x$ be in the $j$-th interval. Neuron $i$ of the sum is active when $x>\tfrac im$, that is, for $i\le j-1$; at the left endpoint neuron $j-1$ is at $0$ and contributes $0$ either way. The first neuron gives $\sigma(x)=x$, since $x\ge0$. Using $\sum_{i=1}^{j-1}i=\tfrac{(j-1)j}2$,

$$\begin{aligned}
h(x,1)&=\frac xm+\frac2m\sum_{i=1}^{j-1}\Big(x-\frac im\Big)\\
&=\frac xm+\frac{2(j-1)}m\,x-\frac{(j-1)j}{m^2}\\
&=\frac{2j-1}m\,x-\frac{j(j-1)}{m^2}.
\end{aligned}$$

Step 3, it is the chord: at the left endpoint $x=\tfrac{j-1}m$,

$$\begin{aligned}
h&=\frac{(2j-1)(j-1)-j(j-1)}{m^2}\\
&=\frac{(j-1)^2}{m^2},
\end{aligned}$$

and at the right endpoint $x=\tfrac jm$,

$$\begin{aligned}
h&=\frac{(2j-1)j-j(j-1)}{m^2}\\
&=\frac{j^2}{m^2}.
\end{aligned}$$

Both values lie on $x^2$, and $h(x,1)$ is affine on the interval, so it is the chord of $x^2$ there.

Step 4, the error: chord minus parabola is a quadratic with leading coefficient $-1$ that vanishes at both endpoints, so on the $j$-th interval

$$h(x,1)-x^2=\Big(x-\frac{j-1}m\Big)\Big(\frac jm-x\Big).$$

The two factors are non-negative and sum to $\tfrac1m$, so by AM-GM their product is at most $\big(\tfrac1{2m}\big)^2$, with equality at the midpoint. Hence

$$\boxed{\sup_{x\in[0,1]}\big|h(x,1)-x^2\big|\le\frac1{4m^2}}$$

Step 5, no contradiction with part 1.b: part 1.b constrains $h$ only along rays through the origin of the input space $\mathbb{R}^2$. The slice $\{(x,1)\}$ meets each ray at most once, so homogeneity links $h(x,1)$ only to values $h(\lambda x,\lambda)$ off the slice, while the target $x^2$ lives on the slice. The constant coordinate is exactly a bias, and with biases universality returns.

**In words.** The second input acts as a constant $1$, so the kink of neuron $i$, where $z_1=\tfrac im z_2$, meets the slice at $x=\tfrac im$. The net is the usual piecewise-linear interpolant with $m$ pieces, written without biases.

**Sanity check.** For $m=1$, $h=\sigma(z_1)$ and $h(x,1)=x$; the error $x-x^2$ peaks at $x=\tfrac12$ with value $\tfrac14$, which is $\tfrac1{4m^2}$. Since equality holds at every midpoint, the bound is exact.

**What to write in the exam.**

- Define $h$ as above: $m$ neurons, no biases (1 pt).
- On the $j$-th interval $h(x,1)$ is affine and equals the chord of $x^2$, checked at both endpoints (1 pt).
- Chord minus parabola is a product of two non-negative numbers summing to $\tfrac1m$, so at most $\tfrac1{4m^2}$ (1 pt).
- Part 1.b speaks only about rays through the origin; the slice meets each ray once, and the constant coordinate is a bias (1 pt).

*Verified: exact fractions confirm the formula of Step 2 at both endpoints and the midpoint of every interval for $m\le7$, and a dense grid gives maximal error exactly $\tfrac1{4m^2}$ for $m\in\{1,2,3,5,10,37\}$.*

**Common mistakes.**

- In part 1.b, using $\lambda>1$, which leaves the unit ball, or proving the floor for one fixed $B$ only; the conclusion is about every width.
- In part 3, counting $B$ lines when weights are parallel, or arguing "adjacent sectors differ, so all differ"; non-adjacent sectors are the real issue, and the segment must avoid the origin.
- In part 4.b, counting the bias neuron or neurons with $w_i=0$ as breakpoints, which gives $B+2$ pieces instead of $B+1$ (costs 2 pts).

**💡 Useful tricks:** $\sigma(\lambda z)=\lambda\sigma(z)$ ⇒ along a ray every bias-free net is $c\lambda$, and two values of $\lambda$ already pin down a floor; activation regions are open convex cones $C(x)$ with coefficient $a(x)=\sum_{w_i^\top x>0}v_iw_i$; in $\mathbb R^2$, $m$ central lines give exactly $2m$ sectors; positive output weights ⇒ convex ⇒ $h\ge a_S^\top(\cdot)$ everywhere, so equal coefficients force linearity along a whole segment; a bias is a weight on a constant input, and an affine slice of a central arrangement meets each line at most once.

**⚠️ Watch out:** (1b) keep $\lambda\in[0,1]$ and quantify over all $B$; (2) a linearity point may sit on a hyperplane — pass to a generic nearby point; (3a) parallel weights share a line, so count *distinct* lines; (3b) non-adjacent sectors are the real issue, and the segment must avoid the origin; agreement at one point does not identify a vector; (4b) neurons with $w_i=0$ and the bias neuron create no breakpoint — the count is $B+1$, not $B+2$.

## Q2 — Gradient flow under a PL inequality, and weight normalization (35)

**Hint:** For the rate, look at how fast the gap $f(w(t)) - f^*$ changes and compare it with the gap itself; an integrating factor avoids dividing by zero. For the length, the PL inequality bounds $\|\nabla f\|$ from below by the square root of the gap — find a quantity whose time derivative is at most a negative multiple of the speed $\|\dot w\|$. For weight normalization, differentiate the invariance $c \mapsto q(cu)$ at $c = 1$; then ask what an orthogonal step does to a norm, and what scaling $u$ does to the size of the gradient.

**Full solution:**

**1. (5) Least squares with full row rank is PL**

**What is asked.** Three things for $f(w)=\tfrac12\|Xw-y\|^2$ with $\operatorname{rank}X=N$: that $f^*=0$; that $f$ is PL with $\mu=\lambda_{\min}(XX^\top)$, and this $\mu$ is positive; and whether $f$ is strongly convex when $N<d$. The answer is a proof and a one-line verdict.

**Tool and why.** The Rayleigh-quotient bound $u^\top Mu\ge\lambda_{\min}(M)\|u\|^2$ (cheat sheet §3) applied to $\|\nabla f\|^2$, and the definition of PL (cheat sheet §9). The gradient of a least-squares loss is $X^\top$ times the residual, so its squared norm is a quadratic form in $XX^\top$.

**Definitions.** Let $r:=Xw-y$, the residual. We introduce it because both $f$ and $\nabla f$ are simple in terms of $r$: $f=\tfrac12\|r\|^2$.

**Solution.**

Step 1, $f^*=0$: $f\ge0$ as half a squared norm. Since $\operatorname{rank}X=N$, the rows of $X$ are independent and the map $w\mapsto Xw$ is onto $\mathbb{R}^N$, so some $w$ has $Xw=y$ and $f(w)=0$. Hence $f^*=0$.

Step 2, the gradient: by the chain rule on $\tfrac12\|r\|^2$, $\nabla f(w)=X^\top r$.

Step 3, the PL inequality:

$$\begin{aligned}
\|\nabla f(w)\|^2&=r^\top XX^\top r\\
&\ge\lambda_{\min}(XX^\top)\,\|r\|^2\\
&=2\mu\,f(w)\\
&=2\mu\,\big(f(w)-f^*\big).
\end{aligned}$$

The second line is the Rayleigh bound, the third uses $\|r\|^2=2f(w)$, and the fourth uses $f^*=0$.

Step 4, $\mu>0$: $XX^\top\in\mathbb{R}^{N\times N}$ is PSD, since $u^\top XX^\top u=\|X^\top u\|^2$. It has rank $N$, so $X^\top u\ne0$ for every $u\ne0$; hence it is positive definite and $\lambda_{\min}(XX^\top)>0$.

Step 5, not strongly convex when $N<d$: then $\operatorname{rank}X<d$, so there is $n\ne0$ with $Xn=0$, and $f(w+tn)=f(w)$ for every $t$. An $\alpha$-strongly convex function grows at least like $\tfrac\alpha2t^2\|n\|^2$ along every line, so it cannot be constant along one. **Verdict: no**, $f$ is not strongly convex, so PL is strictly weaker than the strong convexity of Lecture 4.

**In words.** PL only asks the gradient to be large where the loss is large. The flat directions in $\ker X$ do not change the loss at all, so they do no harm to PL, while they do kill strong convexity.

**Sanity check.** Using the other Gram matrix fails: for a random matrix $X$ of size $3\times6$, $\lambda_{\min}(X^\top X)\approx0$ (it is $0$ whenever $N<d$), while $\lambda_{\min}(XX^\top)\approx0.481$.

**What to write in the exam.**

- Onto map, so $Xw=y$ is solvable and $f^*=0$ (1 pt).
- Gradient $\nabla f(w)=X^\top r$ with $r=Xw-y$ (1 pt).
- Rayleigh: $\|X^\top r\|^2\ge\lambda_{\min}(XX^\top)\|r\|^2$, which is $2\mu f(w)$; and $XX^\top$ is positive definite (2 pts).
- Not strongly convex for $N<d$: $f$ is constant along any $n\in\ker X$ (1 pt).

*Verified: for a random matrix $X$ of size $3\times6$, $\|\nabla f\|^2\ge2\mu f$ held at $1000$ random points with $\mu\approx0.481$, and $\lambda_{\min}(X^\top X)$ was $0$ up to rounding.*

**2. (6) Linear rate under PL**

**What is asked.** Prove that along gradient flow the gap to $f^*$ decays at least like $e^{-2\mu t}$. The answer is a proof.

**Tool and why.** The chain rule along gradient flow (cheat sheet §7) turns PL into a differential inequality for the gap (cheat sheet §9). An integrating factor solves it without dividing by the gap, which may become $0$.

**Definitions.** Let $G(t):=f(w(t))-f^*$, the gap at time $t$. It is non-negative because $f^*$ is the infimum, and the claim is a statement about $G$.

**Solution.**

Step 1, the derivative of the gap: by the chain rule and the GF equation,

$$\begin{aligned}
\dot G(t)&=\nabla f(w(t))^\top\dot w(t)\\
&=-\|\nabla f(w(t))\|^2\\
&\le-2\mu\,G(t).
\end{aligned}$$

The last line is the PL inequality at the point $w(t)$.

Step 2, integrating factor: multiply by $e^{2\mu t}$ and use Step 1:

$$\begin{aligned}
\frac{d}{dt}\big(e^{2\mu t}G(t)\big)&=e^{2\mu t}\big(\dot G(t)+2\mu G(t)\big)\\
&\le0.
\end{aligned}$$

Step 3, conclusion: $e^{2\mu t}G(t)$ is non-increasing, so it is at most its value $G(0)$ at time $0$. Multiplying by $e^{-2\mu t}$,

$$\boxed{f(w(t))-f^*\le e^{-2\mu t}\big(f(w_0)-f^*\big)}$$

No division by $G$ was needed, so the case where $G$ hits $0$ is covered automatically.

**In words.** PL says that the descent speed $\|\nabla f\|^2$ is at least proportional to the remaining gap. A quantity that shrinks at a rate proportional to itself decays exponentially.

**Sanity check.** For $f(w)=\tfrac12(w-1)^2$ we have $\mu=1$, and GF from $w_0=0$ gives $G(t)=\tfrac12e^{-2t}$, so the bound holds with equality: the factor $2$ in the exponent cannot be improved.

**What to write in the exam.**

- Chain rule: $\dot G=-\|\nabla f\|^2$, and PL gives $\dot G\le-2\mu G$ (2 pts).
- Integrating factor: the derivative of $e^{2\mu t}G$ is at most $0$ (3 pts).
- Hence $e^{2\mu t}G(t)\le G(0)$, the claim, with no division by $G$ (1 pt).

*Verified: an Euler discretization of GF ($dt=10^{-4}$, up to $t=20$) on a random full-row-rank least-squares problem stayed below $e^{-2\mu t}G(0)$ at every checkpoint.*

**3.a (5) Finite trajectory length**

**What is asked.** Prove that the total length of the GF path is at most $\sqrt{2G(0)/\mu}$. The answer is a proof with two cases.

**Tool and why.** A Lyapunov-type potential (cheat sheet §9): the square root of the gap decreases at a rate at least proportional to the speed $\|\dot w\|$. Then the length, the integral of the speed, is bounded by the total drop of the potential.

**Definitions.** Let $s(t):=\sqrt{G(t)}$, the potential; we take the square root because its derivative compares with $\|\dot w\|$ rather than with $\|\dot w\|^2$. If $G$ vanishes at some finite time, let $t_1$ be the first such time.

**Solution.**

Step 1, case $G>0$ on $[0,T]$: there $s$ is differentiable. PL can be written as $\|\nabla f\|\ge\sqrt{2\mu G}$, and $\|\nabla f\|$ equals $\|\dot w\|$, so

$$\begin{aligned}
\dot s&=\frac{\dot G}{2\sqrt G}\\
&=-\frac{\|\nabla f\|^2}{2\sqrt G}\\
&\le-\frac{\|\nabla f\|\sqrt{2\mu G}}{2\sqrt G}\\
&=-\sqrt{\frac\mu2}\,\|\dot w\|.
\end{aligned}$$

The second line uses Step 1 of part 2, and the third uses PL on one of the two factors $\|\nabla f\|$.

Step 2, integrate over $[0,T]$: rearranging Step 1 and integrating,

$$\begin{aligned}
\int_0^T\|\dot w\|\,dt&\le\sqrt{\tfrac2\mu}\,\big(s(0)-s(T)\big)\\
&\le\sqrt{\tfrac{2G(0)}\mu}.
\end{aligned}$$

The last line drops $s(T)$, which is non-negative, and uses $s(0)=\sqrt{G(0)}$.

Step 3, case $G(t_1)=0$: then $w(t_1)$ is a global minimizer of the $C^1$ function $f$, so $\nabla f(w(t_1))=0$. The constant curve is a GF solution from $w(t_1)$, so by uniqueness $\dot w\equiv0$ on $[t_1,\infty)$. On $[0,t_1)$ Step 2 applies for every $T<t_1$, so the length up to $t_1$ obeys the same bound and nothing is added afterwards.

Step 4, let $T\to\infty$: the integrand is non-negative, so the integrals over $[0,T]$ increase to the full integral (monotone convergence), and each of them obeys the bound. Hence

$$\boxed{\int_0^\infty\|\dot w(t)\|\,dt\le\sqrt{\frac{2\,(f(w_0)-f^*)}{\mu}}}$$

**In words.** The potential $\sqrt G$ starts at $\sqrt{G(0)}$, never goes below $0$, and every unit of distance travelled costs at least $\sqrt{\mu/2}$ of it. So the path cannot be longer than the starting potential divided by that price.

**Sanity check.** Part 3.c gives an instance with equality, so the constant is sharp. On a random least-squares problem the path length was $1.49$ against a bound of $2.84$.

**What to write in the exam.**

- While $G>0$: $\tfrac{d}{dt}\sqrt G\le-\sqrt{\mu/2}\,\|\dot w\|$, using PL on one factor (3 pts).
- If $G(t_1)=0$: $\nabla f=0$ there, and by uniqueness the flow stops (1 pt).
- Integrate and let $T\to\infty$: length at most $\sqrt{2G(0)/\mu}$ (1 pt).

*Verified: Euler GF ($dt=10^{-4}$) on a random $3\times6$ least-squares problem gave path length $1.493$, below the bound $2.842$.*

**3.b (3) Convergence of the iterates and attainment of the infimum**

**What is asked.** Deduce that $w(t)$ converges to some $w_\infty$, that $f(w_\infty)=f^*$, and that $\|w(t)-w_\infty\|$ decays like $e^{-\mu t}$. The answer is a proof.

**Tool and why.** A finite-length path is Cauchy (cheat sheet §9), and restarting the flow at a later time lets us reuse part 3.a with a smaller starting gap, which part 2 controls.

**Definitions.** Let $\tau\ge0$ denote a fixed time, used instead of $t$ so that $t$ can stay the integration variable. $w_\infty$ is the limit, once we show it exists.

**Solution.**

Step 1, Cauchy: for $\tau<\tau'$, the fundamental theorem of calculus and the triangle inequality give

$$\|w(\tau')-w(\tau)\|\le\int_\tau^{\tau'}\|\dot w\|\,dt.$$

The right side is at most the tail $\int_\tau^\infty\|\dot w\|\,dt$ of a convergent integral (part 3.a), which tends to $0$ as $\tau\to\infty$. So $w(\tau)$ is Cauchy and converges to some $w_\infty$, because $\mathbb{R}^d$ is complete.

Step 2, the infimum is attained: $f$ is continuous and $f(w(\tau))\to f^*$ by part 2, so

$$\begin{aligned}
f(w_\infty)&=\lim_{\tau\to\infty}f(w(\tau))\\
&=f^*.
\end{aligned}$$

This is a conclusion, not an assumption: PL alone forces a minimizer to exist.

Step 3, the rate: by time invariance and uniqueness, $t\mapsto w(\tau+t)$ is the GF started at $w(\tau)$, whose gap is $G(\tau)$. Letting $\tau'\to\infty$ in Step 1, then applying part 3.a from $w(\tau)$, then part 2,

$$\begin{aligned}
\|w(\tau)-w_\infty\|&\le\int_\tau^\infty\|\dot w\|\,dt\\
&\le\sqrt{\frac{2G(\tau)}\mu}\\
&\le e^{-\mu\tau}\sqrt{\frac{2G(0)}\mu}.
\end{aligned}$$

The last line takes the square root of $G(\tau)\le e^{-2\mu\tau}G(0)$, which halves the exponent.

**In words.** The distance still to travel is at most the remaining length, and the remaining length is controlled by the remaining gap. Distance behaves like the square root of the gap, so its rate is $\mu$ instead of $2\mu$.

**Sanity check.** For least squares the limit is the projection of $w_0$ onto the solution set $\{Xw=y\}$; numerically the GF endpoint was within $5\cdot10^{-5}$ of that projection. With $w_0=0$ this is the min-norm interpolant (Lecture 7, Prop 1).

**What to write in the exam.**

- Finite length, so $\|w(\tau')-w(\tau)\|$ is bounded by a vanishing tail: Cauchy, limit $w_\infty$ (1 pt).
- Continuity and part 2 give $f(w_\infty)=f^*$: the infimum is attained (1 pt).
- Restart at $\tau$, apply part 3.a and then part 2 (1 pt):

$$\|w(\tau)-w_\infty\|\le e^{-\mu\tau}\sqrt{2G(0)/\mu}.$$

*Verified: the Euler GF endpoint on a random least-squares problem matched the projection of $w_0$ onto $\{Xw=y\}$ to $5\cdot10^{-5}$.*

**3.c (2) An instance where the length bound is attained**

**What is asked.** Give an instance of part 1 for which the path length equals $\sqrt{2G(0)/\mu}$. The answer is an example with both sides computed.

**Tool and why.** In one dimension GF moves monotonically, so its length is just the distance between start and limit (cheat sheet §9); pick a problem where the bound equals that distance.

**Definitions.** No new notation.

**Solution.**

Step 1, the instance: $N=1$, $d=1$, $X=(1)$, $y=1$, $w_0=0$. Then $f(w)=\tfrac12(w-1)^2$, and $\mu$ is $\lambda_{\min}(XX^\top)$, which equals $1$.

Step 2, the bound: $G(0)=f(0)$, which is $\tfrac12$, so

$$\begin{aligned}
\sqrt{\frac{2G(0)}\mu}&=\sqrt{\frac{2\cdot\frac12}1}\\
&=1.
\end{aligned}$$

Step 3, the flow: $\dot w=-(w-1)$, so $w(t)=1-e^{-t}$ and $\dot w(t)=e^{-t}$, which is positive. The length is

$$\begin{aligned}
\int_0^\infty\|\dot w\|\,dt&=\int_0^\infty e^{-t}\,dt\\
&=1.
\end{aligned}$$

Both sides equal $1$: the bound is attained.

**In words.** Equality needs a straight path along which PL is tight. In one dimension the path is straight, and here $\|\nabla f\|^2$ equals exactly $2\mu G$ everywhere.

**Sanity check.** More generally, whenever the initial residual is an eigenvector of $XX^\top$ for $\lambda_{\min}$, the path is a straight segment of length exactly $\sqrt{2G(0)/\mu}$.

**What to write in the exam.**

- Instance: $X=(1)$, $y=1$, $w_0=0$, so $\mu=1$ and the bound is $1$ (1 pt).
- Flow $w(t)=1-e^{-t}$ with length $\int_0^\infty e^{-t}dt=1$: equality (1 pt).

*Verified: an Euler GF ($dt=10^{-5}$) on this instance gave length $1.000$, and sympy gives the bound exactly $1$.*

**4. (7) Scale invariance: orthogonal gradients, gradient scaling, and a conserved norm**

**What is asked.** For a scale-invariant $q$, prove $\nabla q(u)^\top u=0$ and $\nabla q(cu)=\tfrac1c\nabla q(u)$; then deduce that $\|v(t)\|$ is constant along the joint GF of Part Two, even though $g$ is trained too. The answer is a proof.

**Tool and why.** Differentiating an invariance (cheat sheet §8): a function that is constant along a curve has zero derivative along it. Here the curve is the ray $c\mapsto cu$, and the invariance holds for every fixed $g$.

**Definitions.** For fixed $u\in U$ let $\gamma(c):=q(cu)$ for $c>0$, the restriction of $q$ to the ray through $u$. For fixed $g$ let $q_g(v):=F(v,g)$, the objective as a function of $v$ alone.

**Solution.**

Step 1, orthogonality: $\gamma$ is constant on $(0,\infty)$, since $\gamma(c)=q(u)$, and it is differentiable with $\gamma'(c)=\nabla q(cu)^\top u$ by the chain rule. At $c=1$,

$$\begin{aligned}
0&=\gamma'(1)\\
&=\nabla q(u)^\top u.
\end{aligned}$$

Step 2, gradient scaling: fix $c>0$. Since $cU=U$, the identity $q(cu)=q(u)$ holds for all $u$ in the open set $U$, so we may differentiate both sides in $u$. The chain rule gives $c\,\nabla q(cu)$ on the left and $\nabla q(u)$ on the right, so

$$\nabla q(cu)=\tfrac1c\,\nabla q(u).$$

Step 3, $F$ is scale invariant in $v$: for $c>0$, $\|cv\|=c\|v\|$, so the factor $c$ cancels in $h_{cv,g}$ and $h_{cv,g}=h_{v,g}$. Hence $q_g$ is scale invariant on $U=\mathbb{R}^m\setminus\{0\}$, which is open with $cU=U$, and it is $C^1$ there because $\ell$ is $C^1$ and $v\mapsto v/\|v\|$ is smooth away from $0$. Its gradient is $\nabla q_g(v)=\nabla_vF(v,g)$.

Step 4, conservation: along the joint GF, using Step 1 for $q_{g(t)}$ at the point $v(t)$,

$$\begin{aligned}
\frac{d}{dt}\|v(t)\|^2&=2\,v^\top\dot v\\
&=-2\,v^\top\nabla_vF(v,g)\\
&=0.
\end{aligned}$$

Step 1 holds for every value of $g$, so it does not matter that $g(t)$ moves. Hence $\|v(t)\|=\|v(0)\|$ for all $t\ge0$.

**In words.** Because the loss cannot see the length of $v$, its gradient has no component along $v$. A continuous flow that always moves perpendicular to $v$ stays on the sphere where it started.

**Sanity check.** Only $\|v\|$ is conserved: $g$ is trained freely and changes, so neither $g$ nor $\|(v,g)\|$ is conserved. Numerically $v^\top\nabla_vF$ was about $4\cdot10^{-17}$, and $\nabla_vF$ at $3v$ was exactly one third of $\nabla_vF$ at $v$.

**What to write in the exam.**

- Differentiate $c\mapsto q(cu)$ at $c=1$: $\nabla q(u)^\top u=0$ (3 pts).
- Differentiate $q(cu)=q(u)$ in $u$: $c\,\nabla q(cu)=\nabla q(u)$ (2 pts).
- For each fixed $g$, $F(\cdot,g)$ is scale invariant, so the derivative of $\|v\|^2$ along the flow is $0$ whatever $g(t)$ does (2 pts).

*Verified: finite differences confirm $\nabla_vF$ for a random square-loss instance to $10^{-10}$, $v^\top\nabla_vF\approx4\cdot10^{-17}$, the $1/c$ scaling holds to $10^{-17}$, and Euler GF ($dt=10^{-3}$, $T=20$) kept $\|v\|$ constant to $1.3\cdot10^{-6}$.*

**5.a (3) Gradient descent inflates $\|v\|$**

**What is asked.** Prove the identity

$$\|v_{k+1}\|^2=\|v_k\|^2+\eta^2\|\nabla_vF(v_k,g_k)\|^2,$$

so that the norm grows strictly at every step with a non-zero gradient. The answer is a short computation.

**Tool and why.** Expanding a squared norm plus the orthogonality of part 4 (cheat sheet §8): the step is perpendicular to $v_k$, so Pythagoras applies.

**Definitions.** Let $\gamma_k:=\nabla_vF(v_k,g_k)$, the step direction at iteration $k$.

**Solution.**

Step 1, expand the square:

$$\begin{aligned}
\|v_{k+1}\|^2&=\|v_k-\eta\gamma_k\|^2\\
&=\|v_k\|^2-2\eta\,v_k^\top\gamma_k+\eta^2\|\gamma_k\|^2\\
&=\|v_k\|^2+\eta^2\|\gamma_k\|^2.
\end{aligned}$$

The last line uses $v_k^\top\gamma_k=0$, which is part 4 applied to $q_{g_k}$ at $v_k$.

Step 2, strict growth: if $\gamma_k\ne0$ then $\eta^2\|\gamma_k\|^2>0$, so $\|v_{k+1}\|>\|v_k\|$. Under GF the norm is constant; the difference is a discretization effect of order $\eta^2$ per step that the flow does not see.

**In words.** Each step goes perpendicular to $v_k$, so the new point is the far corner of a right triangle and is farther from the origin. Since $\|\nabla_vF\|$ scales like $1/\|v\|$, the growing norm shrinks the effective step $\eta/\|v\|^2$ on the direction $v/\|v\|$ (not required).

**Sanity check.** On a random instance with $\eta=0.7$ the two sides of the identity agreed to $9\cdot10^{-16}$.

**What to write in the exam.**

- Expand $\|v_k-\eta\gamma_k\|^2$ and use $v_k^\top\gamma_k=0$ from part 4 (2 pts).
- The extra term $\eta^2\|\gamma_k\|^2$ is positive whenever $\gamma_k\ne0$ (1 pt).

*Verified: one GD step on a random weight-normalized square-loss instance satisfied the identity to $9\cdot10^{-16}$.*

**5.b (4) A scale-invariant function is PL only if it is constant**

**What is asked.** Prove that a scale-invariant $q$ satisfying PL on $\mathbb{R}^m\setminus\{0\}$ must be constant, and conclude that the $v$-subproblem of a non-trivial weight-normalized objective is never globally PL. The answer is a proof and a conclusion.

**Tool and why.** Combine PL (cheat sheet §9) with the gradient scaling of part 4: far out on a ray the gradient tends to $0$ while the gap stays the same, so PL forces the gap to be $0$.

**Definitions.** No new notation; fix $u\ne0$ and let $c>0$ vary.

**Solution.**

Step 1, PL along the ray: apply PL at the point $cu$, then the scaling of part 4 on the left and scale invariance on the right:

$$\begin{aligned}
\frac{\|\nabla q(u)\|^2}{c^2}&=\|\nabla q(cu)\|^2\\
&\ge2\mu\,\big(q(cu)-q^*\big)\\
&=2\mu\,\big(q(u)-q^*\big).
\end{aligned}$$

Step 2, send $c\to\infty$: the left side tends to $0$ and the right side does not depend on $c$, so $q(u)-q^*\le0$. Since $q^*$ is the infimum, also $q(u)\ge q^*$, so $q(u)=q^*$. As $u$ was arbitrary,

$$\boxed{q\equiv q^*}$$

Step 3, consequence for $F$: by part 4, Step 3, for each fixed $g$ the map $q_g=F(\cdot,g)$ is scale invariant on $\mathbb{R}^m\setminus\{0\}$. So it satisfies PL there only if it is constant, and the linear-rate argument of part 2 can never be applied globally to the $v$-subproblem of a non-trivial weight-normalized objective.

**In words.** Far from the origin the gradients become arbitrarily small, like $1/\|v\|$, while the gap does not shrink at all, so no uniform $\mu$ can work. At best one can hope for PL on a sphere $\{\|v\|=r\}$, with a constant that degrades like $1/r^2$.

**Sanity check.** The scope is only the $v$-subproblem: the joint objective $F(v,g)$ is not scale invariant in $(v,g)$ and can be PL. For $m=1$, $N=1$, $\phi\equiv1$, $y_1=1$ and square loss, $F=\tfrac12(g\,\mathrm{sign}(v)-1)^2$ and $|\partial_gF|^2=2F$ (not required). Also, for the scale-invariant $q(u)=u_1^2/\|u\|^2$ the ratio of $\|\nabla q(cu)\|^2$ to the gap fell like $1/c^2$, from $0.56$ at $c=1$ to $5.6\cdot10^{-5}$ at $c=100$.

**What to write in the exam.**

- PL at $cu$ with $\nabla q(cu)=\nabla q(u)/c$ and $q(cu)=q(u)$ (3 pts):

$$\frac{\|\nabla q(u)\|^2}{c^2}\ge2\mu\big(q(u)-q^*\big).$$

- Let $c\to\infty$: $q(u)=q^*$ for every $u$, so $q$ is constant; apply this to $F(\cdot,g)$ (1 pt).

*Verified: finite differences for $q(u)=u_1^2/\|u\|^2$ show the PL ratio falling exactly like $1/c^2$, and sympy confirms $|\partial_gF|^2-2F=0$ for the joint example with both signs of $v$.*

**Common mistakes.**

- In part 1, using $\lambda_{\min}(X^\top X)$, which is $0$ when $N<d$ and gives no PL constant.
- In parts 2 and 3.a, dividing by the gap without handling $G=0$, losing the factor $2$ in $e^{-2\mu t}$, or bounding $\int\|\dot w\|^2$, which does not bound the length.
- In parts 4 and 5.b, claiming that $g$ or $\|(v,g)\|$ is conserved, or letting $c\to0$ instead of $c\to\infty$.

**💡 Useful tricks:** PL ⇒ $\dot G\leq-2\mu G$ ⇒ integrating factor $e^{2\mu t}$ (no division); $\frac{d}{dt}\sqrt G\leq-\sqrt{\mu/2}\,\|\dot w\|$ turns the rate into a finite path length, hence convergence of the iterates and attainment of the infimum; least squares with full row rank is PL with $\lambda_{\min}(XX^\top)$ without being strongly convex; scale invariance ⇒ $\nabla q(u)\perp u$ and $\nabla q(cu)=\nabla q(u)/c$ ⇒ GF conserves $\|v\|$, GD inflates it by Pythagoras, and no global PL in $v$ is possible.

**⚠️ Watch out:** (1) use $XX^\top$, not $X^\top X$; (2) don't divide by the gap without the $G=0$ case, and keep the factor $2$ in $e^{-2\mu t}$; (3a) bound $\int\|\dot w\|$, not $\int\|\dot w\|^2$ — use the square-root trick; (3b) the infimum's attainment is a *conclusion*, not an assumption; (4) the conserved quantity is $\|v\|$ only — not $g$, not $\|(v,g)\|$; (5b) send $c\to\infty$, using $\nabla q(cu)=\nabla q(u)/c$.

## Q3 — Generalization of quantized and approximately sparse linear predictors (30)

**Hint:** Count by encoding: a sparse quantized vector is a short list of (position, non-zero value) pairs, padded with blanks. For the uniform bound, fix a single hypothesis first, then pay for the whole class. To cover all $(k, p)$ at once, give each pair its own share of the confidence budget, proportional to a "prior" weight. For a real, dense, nearly sparse $w$, find a member of some $\mathcal{H}_{k,p}$ that is uniformly close to $h_w$ on $\mathcal{X}$ — what does Hölder's inequality say about $|w^\top x - \bar w^\top x|$ when $\|x\|_\infty \le 1$?

**Full solution:**

**1. (5) Counting $\mathcal{H}_{k,p}$ with $k$ slots**

**What is asked.** Prove that $|\mathcal{H}_{k,p}|\le(1+d\,2^{p+1})^k$. The answer is a counting proof.

**Tool and why.** Counting by encoding (cheat sheet §10): if every object has a distinct code that is a string of length $k$ over an alphabet of size $A$, there are at most $A^k$ objects. A sparse quantized vector is naturally a short list of (position, value) pairs.

**Definitions.** Let $\mathcal{A}$ be the alphabet of all pairs $(i,a)$ with $i\in\{1,\dots,d\}$ and $a\in G_p\setminus\{0\}$, plus one blank symbol $\varnothing$. The blank is introduced so that vectors with fewer than $k$ non-zeros also get a code of length exactly $k$.

**Solution.**

Step 1, the grid: $G_p$ consists of $j\,2^{-p}$ for the integers $j$ from $-2^p$ to $2^p$, so $|G_p|=2^{p+1}+1$, and $G_p\setminus\{0\}$ has $2^{p+1}$ elements. Hence $|\mathcal{A}|=d\,2^{p+1}+1$.

Step 2, the code: for $w\in G_p^d$ with $\|w\|_0=j$ and $j\le k$, list the pairs $(i,w_i)$ over its non-zero coordinates in increasing order of $i$, then append $k-j$ blanks. This is a string of length $k$ over $\mathcal{A}$.

Step 3, the code is injective: $w$ can be read back from its string, since each pair gives one coordinate and its value, and all other coordinates are $0$. So the number of admissible $w$ is at most $|\mathcal{A}|^k$.

Step 4, from vectors to hypotheses: the map $w\mapsto h_w$ sends the admissible vectors onto $\mathcal{H}_{k,p}$, so $\mathcal{H}_{k,p}$ has at most as many elements as there are admissible $w$. Hence

$$\boxed{|\mathcal{H}_{k,p}|\le\big(1+d\,2^{p+1}\big)^k}$$

**In words.** A $k$-sparse vector on the grid is described by at most $k$ choices of "which coordinate and which non-zero value", and the blank lets some of the $k$ slots stay unused.

**Sanity check.** The exact count, not required, is

$$\sum_{j=0}^k\binom dj2^{(p+1)j}\le\big(1+d\,2^{p+1}\big)^k.$$

For $k=1$ both sides equal $1+d\,2^{p+1}$, and for $k=0$ both equal $1$, the zero vector.

**What to write in the exam.**

- The grid has $2^{p+1}+1$ points, so $2^{p+1}$ non-zero values (1 pt).
- Code: the non-zero pairs $(i,w_i)$ in increasing $i$, padded with blanks to length $k$ (2 pts).
- Alphabet size $1+d\,2^{p+1}$ and an injective code give at most $(1+d\,2^{p+1})^k$ vectors (1 pt).
- The map $w\mapsto h_w$ is onto $\mathcal{H}_{k,p}$, so the class is no larger (1 pt).

*Verified: brute-force enumeration of $\{w\in G_p^d:\|w\|_0\le k\}$ for $d\le4$, $p\le2$ and every $k$ matches the exact sum and stays below the bound.*

**2. (7) A uniform bound from Hoeffding and a union bound**

**What is asked.** Prove from Hoeffding alone that, for fixed $(k,p)$, with probability at least $1-\delta$ every $h\in\mathcal{H}_{k,p}$ has generalization gap at most

$$\sqrt{\frac{k\ln\!\big(1+d\,2^{p+1}\big)+\ln(2/\delta)}{2N}}.$$

The answer is a proof.

**Tool and why.** Hoeffding for one fixed hypothesis, then a union bound over the finite class (cheat sheet §2 and §10). Hoeffding needs the hypothesis to be fixed before the sample is drawn; every member of a finite class given in advance is, so we pay for the whole class instead of for the learned one.

**Definitions.** Write $\mathcal{H}:=\mathcal{H}_{k,p}$. For a fixed $h$ let $A_n:=\ell(h(x_n),y_n)$, the loss on the $n$-th example. Let $\epsilon>0$ be the gap we aim for, and let $B_h$ be the bad event that $L_D(h)-L_S(h)\ge\epsilon$.

**Solution.**

Step 1, one fixed $h$: the examples are i.i.d. and the loss lies in $[0,1]$, so the $A_n$ are i.i.d. in $[0,1]$ with $\mathbb{E}A_1=L_D(h)$ and average $L_S(h)$. Hoeffding gives

$$P\big(|L_D(h)-L_S(h)|\ge\epsilon\big)\le2e^{-2N\epsilon^2}.$$

In particular $P(B_h)$ is at most $2e^{-2N\epsilon^2}$.

Step 2, union bound over the class:

$$\begin{aligned}
P\big(\exists h\in\mathcal{H}:\ L_D(h)-L_S(h)\ge\epsilon\big)&\le\sum_{h\in\mathcal{H}}P(B_h)\\
&\le2|\mathcal{H}|\,e^{-2N\epsilon^2}.
\end{aligned}$$

Step 3, solve for $\epsilon$: set the right side equal to $\delta$ and take logarithms.

$$\begin{aligned}
2|\mathcal{H}|\,e^{-2N\epsilon^2}&=\delta\\
2N\epsilon^2&=\ln(2|\mathcal{H}|/\delta)\\
\epsilon&=\sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2N}}.
\end{aligned}$$

With this $\epsilon$, with probability at least $1-\delta$ every $h\in\mathcal{H}$ has gap smaller than $\epsilon$.

Step 4, plug in part 1: $\ln(2|\mathcal{H}|/\delta)$ equals $\ln|\mathcal{H}|+\ln(2/\delta)$, and part 1 gives $\ln|\mathcal{H}|\le k\ln(1+d2^{p+1})$. The square root is increasing, so with probability at least $1-\delta$, for every $h\in\mathcal{H}_{k,p}$,

$$\boxed{L_D(h)-L_S(h)\le\sqrt{\frac{k\ln\!\big(1+d\,2^{p+1}\big)+\ln(2/\delta)}{2N}}}$$

This is Lecture 6, Prop 1, re-derived as the question requires.

**In words.** Each fixed predictor is estimated well by its training loss with overwhelming probability, so even after paying for all of them at once, only the logarithm of the class size enters the bound.

**Sanity check.** For $k=0$ the class is just the zero predictor, and the bound becomes $\sqrt{\ln(2/\delta)/(2N)}$, the plain Hoeffding bound for a single hypothesis.

**What to write in the exam.**

- For a fixed $h$ the losses $A_n$ are i.i.d. in $[0,1]$, so Hoeffding gives $2e^{-2N\epsilon^2}$ (3 pts).
- Union bound: the probability that some $h$ is bad is at most $2|\mathcal{H}|e^{-2N\epsilon^2}$ (2 pts).
- Set it equal to $\delta$, solve for $\epsilon$, and use $\ln|\mathcal{H}|\le k\ln(1+d2^{p+1})$ (2 pts).

*Verified: a Monte-Carlo run with $d=3$, $p=1$, $k=1$ (a class of $13$ predictors, equal to the bound), $N=100$ and $\delta=0.1$ never exceeded the bound in $2000$ samples.*

**3.a (4) One bound for all $(k,p)$ through a weighted union**

**What is asked.** Given weights $\pi(k,p)$ with total at most $1$, prove that with probability at least $1-\delta$ the part-2 type bound holds simultaneously for all $(k,p)$, with $\ln(2/(\pi(k,p)\delta))$ in place of $\ln(2/\delta)$. The answer is a proof.

**Tool and why.** The weighted (SRM) union bound (cheat sheet §2): give each class its own share $\pi(k,p)\delta$ of the failure budget, apply the fixed-class bound to it, and add the shares. The index set is infinite, so the shares must be summable, which is what $\sum\pi\le1$ guarantees.

**Definitions.** Let $\delta_{k,p}:=\pi(k,p)\,\delta$, the share of class $(k,p)$. Let $E_{k,p}$ be the failure event of the part-2 argument for $\mathcal{H}_{k,p}$ at confidence $\delta_{k,p}$, and let $\epsilon_{k,p}$ be the corresponding width,

$$\epsilon_{k,p}:=\sqrt{\frac{\ln|\mathcal{H}_{k,p}|+\ln(2/\delta_{k,p})}{2N}}.$$

**Solution.**

Step 1, one class: $\delta_{k,p}\in(0,1)$, because $\pi(k,p)\in(0,1]$ and $\delta\in(0,1)$. Steps 1 to 3 of part 2, with $\delta_{k,p}$ in place of $\delta$, give $P(E_{k,p})\le\delta_{k,p}$, and outside $E_{k,p}$ every $h\in\mathcal{H}_{k,p}$ has gap at most $\epsilon_{k,p}$.

Step 2, the countable union: the index set $\{0,\dots,d\}\times\mathbb{N}_0$ is countable, so by countable subadditivity

$$\begin{aligned}
P\Big(\bigcup_{k,p}E_{k,p}\Big)&\le\sum_{k,p}\pi(k,p)\,\delta\\
&\le\delta.
\end{aligned}$$

Step 3, the good event: with probability at least $1-\delta$ none of the $E_{k,p}$ occurs, so all the bounds hold at once. Since $\ln(2/\delta_{k,p})=\ln(2/(\pi(k,p)\delta))$, this is exactly the claimed bound for every $(k,p)$ and every $h\in\mathcal{H}_{k,p}$.

**In words.** The failure budget $\delta$ is spread over the classes like a prior. Each class pays $\ln(1/\pi(k,p))$ extra inside the square root, and in exchange all classes are covered by one event.

**Sanity check.** This is the same weighted union as Lecture 6's $\delta_k=\tfrac{6}{\pi^2k^2}\delta$. A uniform split over $p$ is impossible: infinitely many precisions cannot share $\delta$ equally.

**What to write in the exam.**

- Apply part 2 to $\mathcal{H}_{k,p}$ at confidence $\delta_{k,p}=\pi(k,p)\delta$ (2 pts).
- Countable union bound: total failure at most $\sum\pi(k,p)\delta$, which is at most $\delta$ (2 pts).

*Verified: for the weights of part 3.b, exact partial sums over $k\le29$ and $p\le59$ equal $0.99999999907$, below $1$.*

**3.b (4) An explicit $\Delta$**

**What is asked.** Choose $\pi$ and write an explicit $\Delta(N,\delta,k,p)$ that is a valid simultaneous bound, strictly increasing in $k$ and in $p$, and tends to $0$ as $N\to\infty$; prove all three. The answer is a formula and three short proofs.

**Tool and why.** Geometric weights in each index (cheat sheet §2): they are summable over the infinite range of $p$ and cost only a linear number of $\ln2$'s, which is also what makes $\Delta$ strictly increasing.

**Definitions.** Let $\pi(k,p):=2^{-(k+1)}\,2^{-(p+1)}$, a product of two geometric priors.

**Solution.**

Step 1, the weights are admissible: each $\pi(k,p)$ lies in $(0,1]$, and

$$\begin{aligned}
\sum_{k=0}^d\sum_{p\ge0}\pi(k,p)&\le\Big(\sum_{k\ge0}2^{-(k+1)}\Big)\Big(\sum_{p\ge0}2^{-(p+1)}\Big)\\
&=1.
\end{aligned}$$

Each geometric series sums to $1$.

Step 2, the price of the prior: $\ln(1/\pi(k,p))$ equals $(k+1)\ln2+(p+1)\ln2$, that is $(k+p+2)\ln2$, so

$$\ln\frac2{\pi(k,p)\,\delta}=\ln(2/\delta)+(k+p+2)\ln2.$$

Step 3, validity: insert Step 2 and the part-1 bound $\ln|\mathcal{H}_{k,p}|\le k\ln(1+d2^{p+1})$ into part 3.a. With probability at least $1-\delta$, for all $(k,p)$ and all $h\in\mathcal{H}_{k,p}$, the gap is at most

$$\boxed{\Delta(N,\delta,k,p):=\sqrt{\frac{k\ln\!\big(1+d\,2^{p+1}\big)+(k+p+2)\ln2+\ln(2/\delta)}{2N}}}$$

Step 4, strictly increasing: in the numerator, $k\ln(1+d2^{p+1})$ is non-decreasing in $k$ and in $p$, the term $(k+p+2)\ln2$ is strictly increasing in each, and the other terms do not depend on $k$ or $p$. The square root is strictly increasing, so $\Delta$ is strictly increasing in $k$ and in $p$.

Step 5, the limit: for fixed $(\delta,k,p)$ the numerator is a constant, so $\Delta$ is that constant over $2N$, under a square root. Hence $\Delta=O(1/\sqrt N)$, which tends to $0$.

**In words.** Using a sparser or coarser class is cheaper, and the bound reflects it: every extra slot or extra bit of precision costs a little more in the numerator, which is exactly the increasing structure the question asks for.

**Sanity check.** For $d=10^6$, $\delta=0.01$, $k=20$, $p=11$, the value is $\Delta\approx0.0485$ at $N=10^5$, then $0.0153$ at $N=10^6$ and $0.0049$ at $N=10^7$: it falls like $1/\sqrt N$.

**What to write in the exam.**

- Weights $\pi(k,p)=2^{-(k+1)}2^{-(p+1)}$ with total at most $1$ (1 pt).
- Validity from part 3.a, with $\ln(1/\pi)=(k+p+2)\ln2$ (1 pt).
- The term $(k+p+2)\ln2$ makes $\Delta$ strictly increasing in $k$ and $p$ (1 pt).
- Fixed $(\delta,k,p)$: $\Delta=O(1/\sqrt N)$ (1 pt).

*Verified: numerically $\Delta$ increased strictly over $k<50$ and $p<50$ at $d=10^6$, and the values above were computed directly from the formula.*

**4.a (2) Why part 3 says nothing about $h_{w_S}$**

**What is asked.** Explain why the bound of part 3 gives no useful guarantee for the trained predictor $h_{w_S}$. The answer is a short explanation with two reasons.

**Tool and why.** Read the quantifiers of the bound (cheat sheet §10 and §12): it covers only hypotheses inside some $\mathcal{H}_{k,p}$, and its size depends on the sparsity level $k$ of that class.

**Definitions.** No new notation.

**Solution.**

Step 1, $h_{w_S}$ is outside every class: a real-valued $w_S$ generally has entries that are not multiples of any $2^{-p}$, so $h_{w_S}$ lies in no $\mathcal{H}_{k,p}$ and the bound does not apply to it at all.

Step 2, rounding alone does not help: even after rounding $w_S$ to a grid, $\|w_S\|_0=d$ forces $k=d$. Since $\Delta$ is smallest at $p=0$,

$$\Delta(N,\delta,d,p)\ge\sqrt{\frac{d\ln(1+2d)}{2N}},$$

which is larger than $1$, hence vacuous for a loss in $[0,1]$, whenever $d$ is much larger than $N$. The bound ignores that $w_S$ is *nearly* sparse.

**In words.** Part 3 rewards exact sparsity on a grid, but training produces dense real weights whose mass is concentrated on a few coordinates; we need a bridge from "nearly sparse" to "in a small class".

**Sanity check.** For $d=10^6$ and $N=10^5$ the lower bound above is about $8.5$, and $\Delta$ with $k=d$, $p=0$ is about $8.7$: far above $1$. The same issue appears as index versus rank in a\_2024 Q3(4).

**What to write in the exam.**

- A real $w_S$ is not on any grid, so $h_{w_S}$ is in no $\mathcal{H}_{k,p}$ (1 pt).
- Rounding still leaves $k=d$, and then $\Delta$ is at least $\sqrt{d\ln(1+2d)/(2N)}$, vacuous when $d$ is much larger than $N$ (1 pt).

*Verified: for $d=10^6$, $N=10^5$ and $\delta=0.01$, direct evaluation gives $8.52$ for the lower bound and $8.72$ for $\Delta$ with $k=d$, $p=0$.*

**4.b (5) Transfer to approximately sparse real weights**

**What is asked.** Prove that, on one event of probability at least $1-\delta$, for every $w\in[-1,1]^d$ and every $(k,p)$, the gap of $h_w$ is at most

$$\Delta(N,\delta,k,p)+2\rho\big(\sigma_k(w)+k\,2^{-(p+1)}\big)$$

The answer is a proof.

**Tool and why.** Compression plus Lipschitz transfer (cheat sheet §10): find a member $h_{\bar w}$ of $\mathcal{H}_{k,p}$ uniformly close to $h_w$ on $\mathcal{X}$, use the part-3 bound for it, and pay for the distance once in $L_D$ and once in $L_S$. Hölder's inequality with $\|x\|_\infty\le1$ turns an $\ell_1$ distance between weights into a uniform distance between predictions.

**Definitions.** Given $w$, $k$, $p$: let $T$ be a set of $k$ coordinates of largest $|w_i|$; let $\bar w_i$ be a nearest point of $G_p$ to $w_i$ for $i\in T$, and $\bar w_i:=0$ otherwise. Let

$$\epsilon_{k,p}(w):=\sigma_k(w)+k\,2^{-(p+1)},$$

the total $\ell_1$ error of this compression.

**Solution.**

Step 1, the event: work on the event of part 3.b, of probability at least $1-\delta$. Everything below is deterministic on it, so the conclusion holds for all $w$, $k$, $p$ simultaneously.

Step 2, $\bar w$ is in the class: $G_p$ covers $[-1,1]$ with spacing $2^{-p}$, so for $i\in T$ we have $|\bar w_i-w_i|\le2^{-(p+1)}$, using $w_i\in[-1,1]$. Also $\bar w\in G_p^d$ and $\|\bar w\|_0\le k$, so $h_{\bar w}\in\mathcal{H}_{k,p}$.

Step 3, the $\ell_1$ error: the best $k$-sparse $\ell_1$ approximation keeps the $k$ largest entries, so $\sum_{i\notin T}|w_i|$ equals $\sigma_k(w)$. Therefore

$$\begin{aligned}
\|w-\bar w\|_1&=\sum_{i\notin T}|w_i|+\sum_{i\in T}|w_i-\bar w_i|\\
&\le\sigma_k(w)+k\,2^{-(p+1)}\\
&=\epsilon_{k,p}(w).
\end{aligned}$$

Step 4, uniform closeness: for $x\in\mathcal{X}$, by Hölder's inequality,

$$\begin{aligned}
|h_w(x)-h_{\bar w}(x)|&=|(w-\bar w)^\top x|\\
&\le\|w-\bar w\|_1\|x\|_\infty\\
&\le\epsilon_{k,p}(w).
\end{aligned}$$

Step 5, Lipschitz transfer: $\ell$ is $\rho$-Lipschitz in its first argument, so for every $(x,y)$ the two losses differ by at most $\rho\,\epsilon_{k,p}(w)$. Averaging over $D$ and over $S$, both $|L_D(h_w)-L_D(h_{\bar w})|$ and $|L_S(h_w)-L_S(h_{\bar w})|$ are at most $\rho\,\epsilon_{k,p}(w)$.

Step 6, combine: add and subtract the losses of $h_{\bar w}$, then use part 3.b for $h_{\bar w}$:

$$\begin{aligned}
L_D(h_w)-L_S(h_w)&\le\big(L_D(h_{\bar w})-L_S(h_{\bar w})\big)+2\rho\,\epsilon_{k,p}(w)\\
&\le\Delta(N,\delta,k,p)+2\rho\big(\sigma_k(w)+k\,2^{-(p+1)}\big).
\end{aligned}$$

The factor $2$ appears because both $L_D$ and $L_S$ move when $h_w$ is replaced by $h_{\bar w}$. This is Lecture 6's compression argument (Prop 2 there), with the compressed class indexed by $(k,p)$.

**In words.** A nearly sparse $w$ is close in $\ell_1$ to a sparse grid vector, close weights give close predictions on bounded inputs, and close predictions give close losses. So $h_w$ inherits the guarantee of its compressed version, up to the compression error.

**Sanity check.** If $w$ is already a $k$-sparse grid vector, then $\bar w=w$ and the transfer costs nothing; the bound still adds $2\rho k2^{-(p+1)}$, which is valid but slightly loose. Rounding to error $2^{-p}$ instead of $2^{-(p+1)}$ would also be valid but would not give the stated constant.

**What to write in the exam.**

- Keep the $k$ largest entries and round each to the nearest grid point, error at most $2^{-(p+1)}$, so $h_{\bar w}\in\mathcal{H}_{k,p}$ and $\|w-\bar w\|_1\le\epsilon_{k,p}(w)$ (2 pts).
- Hölder with $\|x\|_\infty\le1$: predictions differ by at most $\epsilon_{k,p}(w)$ (1 pt).
- Lipschitz: $L_D$ and $L_S$ each move by at most $\rho\epsilon$, so the gap moves by at most $2\rho\epsilon$; then apply part 3.b (2 pts).

*Verified: on 20000 random cases ($d\le7$, $p\le4$) the rounding error never exceeded $\sigma_k(w)+k2^{-(p+1)}$, and the prediction gap never exceeded the $\ell_1$ error.*

**4.c (3) Choosing $(s,p)$ after training**

**What is asked.** For $w_S$ with $\ell_1$ mass at most $\eta$ outside $s$ coordinates and $p=\lceil\log_2(s/\eta)\rceil$: show the gap is at most $\Delta(N,\delta,s,p)+3\rho\eta$; explain why choosing $(s,p)$ after seeing $S$ is legitimate; and show that $\Delta$ depends on $d$ only logarithmically. The answer is an instantiation, an explanation and an estimate.

**Tool and why.** Instantiate part 4.b (cheat sheet §10). The legitimacy comes from simultaneity: the union over all $(k,p)$ was already paid in part 3 (cheat sheet §2), and the dependence on $d$ comes from the term $k\ln(1+d2^{p+1})$, where $d$ appears only inside a logarithm.

**Definitions.** No new notation; $s$, $\eta$ and $p$ are as in the statement.

**Solution.**

Step 1, $\sigma_s(w_S)\le\eta$: the given $s$ coordinates form one admissible support, so the minimum defining $\sigma_s(w_S)$ is at most the mass outside them, which is at most $\eta$.

Step 2, $p$ is admissible and fine enough: $s\ge1$ and $\eta\le1$ give $s/\eta\ge1$, so $p\in\mathbb{N}_0$. By the definition of the ceiling, $2^p\ge s/\eta$, so $2^{-p}\le\eta/s$ and $s\,2^{-(p+1)}\le\eta/2$.

Step 3, instantiate part 4.b with $w=w_S$ and $k=s$:

$$\begin{aligned}
2\rho\big(\sigma_s(w_S)+s\,2^{-(p+1)}\big)&\le2\rho\Big(\eta+\frac\eta2\Big)\\
&=3\rho\eta.
\end{aligned}$$

Hence, on the same event,

$$\boxed{L_D(h_{w_S})-L_S(h_{w_S})\le\Delta(N,\delta,s,p)+3\rho\eta}$$

Step 4, why $(s,p)$ may depend on $S$: part 4.b holds on **one** event, simultaneously for all $(w,k,p)$; the union over $(k,p)$ was paid in part 3 through $\pi$. So $(s,p)$ and $w=w_S$ may be read off the trained weights, and no new union bound or fresh $\delta$ is needed.

Step 5, logarithmic in $d$: from $p<\log_2(s/\eta)+1$ we get $2^{p+1}<4s/\eta$, and $k+p+2$ with $k=s$ is less than $s+\log_2(s/\eta)+3$. So

$$\Delta(N,\delta,s,p)\le\sqrt{\frac{s\ln\!\big(1+4ds/\eta\big)+\big(s+\log_2(s/\eta)+3\big)\ln2+\ln(2/\delta)}{2N}},$$

which is of order $\sqrt{s\log(ds/\eta)/N}$: $d$ enters only through a logarithm, so the bound is meaningful when $s\log d$ is much smaller than $N$, even if $d$ is much larger than $N$.

**In words.** If training has an implicit bias toward approximately sparse solutions, this turns it into a guarantee: the effective size is $s$, not $d$, and the price of not being exactly sparse is the small extra term $3\rho\eta$.

**Sanity check.** For $d=10^6$, $N=10^5$, $s=20$, $\eta=0.01$, $\delta=0.01$: $p=11$, and $\Delta(N,\delta,s,p)\approx0.049$, with the closed-form upper bound $0.0492$, versus about $8.7$ for $k=d$ even with $p=0$.

**What to write in the exam.**

- $\sigma_s(w_S)\le\eta$, and the ceiling gives $s\,2^{-(p+1)}\le\eta/2$, so the extra term is at most $3\rho\eta$ (1 pt).
- Part 4.b is simultaneous over all $(w,k,p)$, so a data-dependent $(s,p)$ needs no new union bound (1 pt).
- From $2^{p+1}<4s/\eta$: $\Delta$ is of order $\sqrt{s\log(ds/\eta)/N}$, logarithmic in $d$ (1 pt).

*Verified: for the numbers above, $p=11$, $2^{-p}\approx0.000488$ is below $\eta/s=0.0005$, and direct evaluation gives $\Delta=0.0485$, the upper bound $0.0492$, and $8.72$ for $k=d$, $p=0$.*

**Common mistakes.**

- In part 1, forgetting the blank slot, which gives $(d2^{p+1})^k$ and misses vectors with fewer than $k$ non-zeros.
- In part 2, applying Hoeffding directly to the learned predictor $h_{w_S}$: it depends on $S$, so its losses are not i.i.d. with mean $L_D$ (costs 3 pts).
- In parts 3 and 4, weights that are not summable over the infinite range of $p$, a transfer cost of $\rho\epsilon$ instead of $2\rho\epsilon$, or claiming a fresh $\delta$ for the data-chosen $(s,p)$.

**💡 Useful tricks:** encode a $k$-sparse quantized vector as $k$ slots from an alphabet of size $1+d2^{p+1}$; Hoeffding per fixed $h$ + union bound, solved for $\epsilon$; a prior $\pi(k,p)=2^{-(k+1)}2^{-(p+1)}$ over a 2-D index costs $(k+p+2)\ln 2$ and buys simultaneity, hence data-dependent $(k,p)$; for approximate sparsity: keep the top $k$ entries, round them (error $\le 2^{-(p+1)}$ each), Hölder with $\|x\|_\infty\le1$, then the $2\rho\epsilon$ Lipschitz transfer.

**⚠️ Watch out:** (1) include the blank slot so sparsity $<k$ is counted; (2) Hoeffding only for fixed hypotheses — never on $h_{w_S}$; (3) the precision index is unbounded, so the weights must be summable — and keep the $\ln(1/\pi)$ term that makes $\Delta$ strictly increasing; (4) the transfer costs $2\rho\epsilon$ (on $L_D$ and $L_S$), the rounding error is $2^{-(p+1)}$ per kept coordinate, and $(s,p)$ may be chosen after training only because the bound is simultaneous over $(k,p)$.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1b using $\lambda>1$ or a single fixed $B$; Q1.2 ignoring
  linearity points on a hyperplane; Q1.3a counting $B$ lines when weights are parallel;
  Q1.3b comparing only adjacent sectors or using a segment through the origin; Q1.4b
  counting $B+2$ pieces (bias neuron or $w_i=0$ neurons as breakpoints); Q1.4c error
  checked only at midpoints; Q2.1 $\lambda_{\min}(X^\top X)$ instead of $XX^\top$; Q2.2
  dividing by a gap that may vanish, or rate $e^{-\mu t}$; Q2.3a bounding
  $\int\|\dot w\|^2$ instead of the length; Q2.3b assuming the infimum is attained; Q2.4
  claiming $g$ or $\|(v,g)\|$ conserved; Q2.5b letting $c\to0$; Q3.1 no blank slot;
  Q3.2 Hoeffding on the learned predictor; Q3.3 non-summable weights over $p$; Q3.4
  transfer cost $\rho\epsilon$ instead of $2\rho\epsilon$, or a fresh $\delta$ for the
  data-chosen $(s,p)$.
