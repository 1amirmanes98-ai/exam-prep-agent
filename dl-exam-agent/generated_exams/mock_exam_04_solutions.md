# Mock Exam 4 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_04.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-07-06 (Q1, re-verified 2026-11-01: the leaky-ReLU identities
and the width-$p$ construction in exact fractions on 1500 random PWL targets, the
interpolation bound $K/(3n)$, monotonicity of 3000 random width-1 deep nets and their
distance $\ge \frac18$ from $|2x-1|$; Q2 flow on the part-4 dataset: $v^2 - \|w\|^2$ drift
$\sim 5\text{e-}6$ at Euler step $10^{-5}$, loss plateaus at exactly $0.5$;
Q3: Gaussian-KL Monte-Carlo agrees with $\|w\|^2/(2\sigma^2)$ to $10^{-3}$).

## Q1 — Leaky-ReLU networks: exact representation, universality, and narrow deep nets (40)

**Hint:** Write one leaky neuron as a multiple of a ReLU plus a linear term, and write the identity map as a difference of two leaky neurons with opposite inputs; then a ReLU decomposition of a piecewise linear function becomes a leaky network, and the real question is how many neurons the leftover linear terms cost when they are collected together. For a single neuron, compare its slopes on the two sides of its kink. For universality, interpolate on a grid so fine that uniform continuity makes neighbouring values close, and check that the interpolant has few pieces. For the width-1 networks, ask what one layer does to the order of two inputs, and then look for a target that goes down and then up.

**Full solution:**

**1.a (3) Three leaky-ReLU identities**

**What is asked.** Prove three identities that hold for every real $z$. The answer is a proof by cases.

**Tool and why.** Case analysis on the sign of $z$ (cheat sheet §5, the leaky-ReLU conversions of the recitation on expressiveness, P3–P4). The activation is affine on each side of $0$, so two cases settle all three identities.

**Definitions.** No new notation. We use the two branches of $\sigma$, derived in Step 1.

**Solution.**

Step 1, the two branches: if $z\ge0$ then $\alpha z\le z$, because $\alpha<1$, so $\sigma(z)=z$. If $z\le0$ then $\alpha z\ge z$, so $\sigma(z)=\alpha z$. At $z=0$ both formulas give $0$, so they agree.

Step 2, case $z\ge0$: then $-z\le0$, so $\sigma(-z)=-\alpha z$ by Step 1, and both $[z]_+$ and $|z|$ equal $z$. Hence

$$\begin{aligned}
\sigma(z)-\sigma(-z)&=z+\alpha z=(1+\alpha)z,\\
\sigma(z)-\alpha z&=(1-\alpha)z=(1-\alpha)[z]_+,\\
\sigma(z)+\sigma(-z)&=z-\alpha z=(1-\alpha)|z|.
\end{aligned}$$

Step 3, case $z<0$: then $-z>0$, so $\sigma(-z)=-z$ and $\sigma(z)=\alpha z$; also $[z]_+=0$ and $|z|=-z$. Hence

$$\begin{aligned}
\sigma(z)-\sigma(-z)&=\alpha z+z=(1+\alpha)z,\\
\sigma(z)-\alpha z&=0=(1-\alpha)[z]_+,\\
\sigma(z)+\sigma(-z)&=\alpha z-z=(1-\alpha)|z|.
\end{aligned}$$

The two cases cover $\mathbb{R}$, so the identities hold for every $z$.

**In words.** A leaky neuron is a scaled ReLU plus a linear term, $\sigma(z)=(1-\alpha)[z]_++\alpha z$. Two leaky neurons with opposite inputs give the identity map (their difference) or the absolute value (their sum).

**Sanity check.** With $\alpha=\frac12$ and $z=-2$: $\sigma(-2)=-1$ and $\sigma(2)=2$. The difference is $-3$, which is $\frac32\cdot(-2)$; the sum is $1$, which is $\frac12\cdot|-2|$. Letting $\alpha\to0$ recovers the ReLU facts $[z]_+-[-z]_+=z$ and $[z]_++[-z]_+=|z|$.

**What to write in the exam.**

- Branches (1 pt): $\sigma(z)=z$ for $z\ge0$ and $\sigma(z)=\alpha z$ for $z\le0$, because $\alpha<1$.
- Cases (2 pts): substitute in each case and simplify, as in Steps 2 and 3.

*Verified: the three identities hold exactly (Python fractions) on 20000 random rational pairs $(z,\alpha)$, including $z=0$.*

**1.b (5) Every network in $\mathcal{H}_B$ is PWL with at most $B+1$ pieces**

**What is asked.** Show that every $h\in\mathcal{H}_B$ is continuous and affine on each of at most $B+1$ closed intervals covering $\mathbb{R}$. The answer is a proof.

**Tool and why.** Breakpoint counting, the converse half of Prop. 1 of Lecture 2 (Home Assignment 2, P1.1; Exam 2022 Moed B, Q1b; cheat sheet §5). Each neuron bends at most once, and a sum of functions can bend only where a summand bends.

**Definitions.** Write $u_i(x):=w_ix+b_i$ for the pre-activation of neuron $i$. Let $P$ be the set of points $-b_i/w_i$ over the neurons with $w_i\ne0$; these are the only candidate kinks. Let $k:=|P|$, so $k\le B$, and list the points of $P$ in increasing order:

$$\tau_1<\tau_2<\dots<\tau_k.$$

Let $I_0:=(-\infty,\tau_1]$, $I_j:=[\tau_j,\tau_{j+1}]$ for $j\in[k-1]$, and $I_k:=[\tau_k,\infty)$. They are closed, cover $\mathbb{R}$, and number $k+1$.

**Solution.**

Step 1, neurons with $w_i=0$: then $v_i\sigma(u_i(x))=v_i\sigma(b_i)$ for every $x$, a constant, which is affine on every interval.

Step 2, neurons with $w_i\ne0$ keep one sign on each interval: $u_i$ is affine with the single zero $-b_i/w_i$, which belongs to $P$. No point of $P$ lies in the interior of an interval $I_j$, so $u_i$ does not vanish there and, being continuous, keeps one strict sign on the interior. By continuity it is $\ge0$ on all of $I_j$ or $\le0$ on all of $I_j$, endpoints included.

Step 3, each neuron is affine on each interval: by Step 1 of 1.a, on $I_j$ the neuron equals $v_iu_i(x)$ if $u_i\ge0$ there, and $\alpha v_iu_i(x)$ if $u_i\le0$ there. Either way it is affine on $I_j$; at a point where $u_i=0$ both formulas agree, so the closed endpoints cause no conflict.

Step 4, the network: on each $I_j$, $h$ is the constant $c$ plus a sum of affine functions, hence affine. Also $h$ is continuous, as a sum of compositions of continuous functions ($\sigma$ is continuous because its two branches agree at $0$).

Step 5, counting: $h$ fits Def. 1 with the $k+1$ intervals $I_0,\dots,I_k$. The number of pieces is the minimal such count, so it is at most $k+1$, and $k+1\le B+1$. If $k=0$, $h$ is affine on $\mathbb{R}$: one piece.

**In words.** A leaky neuron is a line bent once, at the point where its input crosses $0$. A width-$B$ network adds $B$ such lines, so it can bend only at $B$ places, which cut the line into at most $B+1$ straight pieces.

**Sanity check.** For $B=1$ and $h=\sigma$ there are exactly $2$ pieces, slopes $\alpha$ and $1$, so the bound $B+1$ is attained. If two neurons share a kink, or their bends cancel, there are fewer pieces; that is why the claim is "at most".

**What to write in the exam.**

- Kinks (2 pts): the neuron with $w_i\ne0$ changes branch only at $-b_i/w_i$; the neuron with $w_i=0$ is constant.
- Pieces (2 pts): between consecutive kinks every pre-activation keeps one sign, so every neuron and hence $h$ is affine there; $h$ is continuous.
- Count (1 pt): at most $B$ kinks give at most $B+1$ pieces.

*Verified: 1500 random networks ($B\le6$, about 15% zero input weights, random $\alpha$, exact fractions); the number of pieces, counted by slope changes, never exceeds $B+1$.*

**2.a (7) A PWL function with $p$ pieces is in $\mathcal{H}_p$**

**What is asked.** Build, for a PWL $f$ with $p\ge2$ pieces, a leaky network with $p$ neurons equal to $f$ everywhere, with only $p-1$ neurons when $s_0=\alpha s_{p-1}$; show that affine functions are in $\mathcal{H}_2$; and conclude that the union of the classes is the set of PWL functions. The answer is a construction with a proof.

**Tool and why.** Substitute 1.a (second identity) into the given ReLU decomposition (cheat sheet §5, "PWL = affine + sum of ReLUs"). Each ReLU becomes one leaky neuron plus an affine term. The affine terms are then collected into a single affine function and built with 1.a (first identity) at the point $t_1$, where one of the two neurons it needs already exists. This is cheaper than the recitation's two leaky neurons per ReLU, which gives width $2(p-1)$ plus the affine part (compare Exam 2022 Moed B, Q1c, width $2M$).

**Definitions.** For $i\in[p-1]$ let $c_i:=s_i-s_{i-1}$, the slope jump at $t_i$. Introduce the slope and the constant of the leftover affine part:

$$A:=\frac{s_0-\alpha s_{p-1}}{1-\alpha},\qquad q:=f(t_1)+\frac{\alpha}{1-\alpha}\sum_{i=1}^{p-1}c_i\,(t_i-t_1).$$

They are well defined because $\alpha<1$.

**Solution.**

Step 1, one ReLU as one leaky neuron: apply the second identity of 1.a with $z=x-t_i$ and divide by $1-\alpha$, which is positive:

$$[x-t_i]_+=\frac{\sigma(x-t_i)-\alpha\,(x-t_i)}{1-\alpha}.$$

Step 2, substitute into the decomposition:

$$f(x)=\sum_{i=1}^{p-1}\frac{c_i}{1-\alpha}\,\sigma(x-t_i)+f(t_1)+s_0(x-t_1)-\frac{\alpha}{1-\alpha}\sum_{i=1}^{p-1}c_i\,(x-t_i).$$

Step 3, collect the affine terms: write $x-t_i$ as $(x-t_1)+(t_1-t_i)$. The terms with $x-t_1$ have total coefficient

$$\begin{aligned}
s_0-\frac{\alpha}{1-\alpha}\sum_{i=1}^{p-1}c_i&=s_0-\frac{\alpha\,(s_{p-1}-s_0)}{1-\alpha}\\
&=\frac{s_0(1-\alpha)+\alpha s_0-\alpha s_{p-1}}{1-\alpha}\\
&=A,
\end{aligned}$$

where the sum of the jumps telescopes to $s_{p-1}-s_0$. The remaining constants add up to $q$, by its definition. Hence, for every $x$,

$$f(x)=\sum_{i=1}^{p-1}\frac{c_i}{1-\alpha}\,\sigma(x-t_i)+A\,(x-t_1)+q.$$

Step 4, the affine part from two neurons at $t_1$: the first identity of 1.a with $z=x-t_1$, divided by $1+\alpha$, gives

$$x-t_1=\frac{\sigma(x-t_1)-\sigma(t_1-x)}{1+\alpha}.$$

Step 5, merge the neurons at $t_1$: the term $\sigma(x-t_1)$ already appears in Step 3 (index $i=1$), so

$$f(x)=\Big(\frac{c_1}{1-\alpha}+\frac{A}{1+\alpha}\Big)\sigma(x-t_1)-\frac{A}{1+\alpha}\,\sigma(t_1-x)+\sum_{i=2}^{p-1}\frac{c_i}{1-\alpha}\,\sigma(x-t_i)+q.$$

Step 6, read off the network: with output bias $q$ and

| neuron | $w$ | $b$ | $v$ |
|---|---|---|---|
| $1$ | $1$ | $-t_1$ | $\frac{c_1}{1-\alpha}+\frac{A}{1+\alpha}$ |
| $i\in\{2,\dots,p-1\}$ | $1$ | $-t_i$ | $\frac{c_i}{1-\alpha}$ |
| $p$ | $-1$ | $t_1$ | $-\frac{A}{1+\alpha}$ |

the network computes the right-hand side of Step 5, which equals $f(x)$ for every $x$. It has $p$ neurons, so $f\in\mathcal{H}_p$.

Step 7, the case $s_0=\alpha s_{p-1}$: then $A=0$, neuron $p$ has output weight $0$ and can be removed, and neuron $1$ has weight $\frac{c_1}{1-\alpha}$. So $f\in\mathcal{H}_{p-1}$.

Step 8, affine functions: let $f(x)=sx+r$. By the first identity of 1.a with $z=x$,

$$f(x)=\frac{s}{1+\alpha}\,\sigma(x)-\frac{s}{1+\alpha}\,\sigma(-x)+r,$$

two neurons, so $f\in\mathcal{H}_2$.

Step 9, the characterization: by 1.b every member of every $\mathcal{H}_B$ is PWL. Conversely a PWL function with one piece is affine, hence in $\mathcal{H}_2$ by Step 8, and one with $p\ge2$ pieces is in $\mathcal{H}_p$ by Step 6. Therefore

$$\boxed{\bigcup_{B\in\mathbb{N}}\mathcal{H}_B=\{\text{PWL functions}\}}$$

**In words.** Each leaky neuron is a ReLU in disguise plus a straight line. All the stray straight lines add up to one straight line, and a straight line costs two leaky neurons; but one of those two can be the neuron that already bends at $t_1$, so the total is only one extra neuron.

**Sanity check.** Take $\alpha=\frac12$ and $f=[x]_+$: $p=2$, $t_1=0$, $s_0=0$, $s_1=1$, so $A=-1$ and $q=0$. The table gives $h(x)=\frac43\sigma(x)+\frac23\sigma(-x)$. For $x>0$ this is $\frac43x-\frac13x=x$, and for $x<0$ it is $\frac23x-\frac23x=0$. These are exactly the recitation's coefficients $\frac{1}{1-\alpha^2}$ and $\frac{\alpha}{1-\alpha^2}$. A three-piece check, $f(x)=|x|+[x-1]_+$ with $\alpha=\frac12$: the table gives $\frac43\sigma(x)+2\sigma(x-1)+\frac83\sigma(-x)+1$, which at $x=-3$ equals $-2-4+8+1=3$, that is $f(-3)$.

**What to write in the exam.**

- ReLU to leaky (2 pts): by 1.a, each $[x-t_i]_+$ equals $\frac{\sigma(x-t_i)-\alpha(x-t_i)}{1-\alpha}$.
- Affine leftover (2 pts): it is $A(x-t_1)+q$, with $A$ from the telescoping sum of the jumps.
- Width $p$ (2 pts): build $A(x-t_1)$ from $\sigma(x-t_1)$ and $\sigma(t_1-x)$, merge the first one with neuron $1$, and give the table.
- Rest (1 pt): $A=0$ when $s_0=\alpha s_{p-1}$; affine functions use two neurons; with 1.b, the union is the PWL set.

*Verified: on 1500 random PWL targets ($p$ from $2$ to $7$, random $\alpha$, exact fractions) the table's network equals $f$ at 40 random points and next to every breakpoint; in 495 cases with $s_0=\alpha s_{p-1}$ it uses $p-1$ neurons; both worked examples were evaluated exactly.*

**2.b (3) The single-neuron class $\mathcal{H}_1$, and $[x]_+\notin\mathcal{H}_1$**

**What is asked.** Describe the slopes of a non-constant one-neuron network and deduce that the ReLU is not one. The answer is a proof.

**Tool and why.** Compute the slopes on both sides of the neuron's kink, split by the sign of $w$ (cheat sheet §5). A single neuron has no freedom left once its two slopes are tied by $\alpha$.

**Definitions.** Let $h(x)=c+v\,\sigma(wx+b)$ and, when $w\ne0$, let $t:=-b/w$, the kink.

**Solution.**

Step 1, non-constant forces $v\ne0$ and $w\ne0$: if $v=0$ then $h=c$, and if $w=0$ then $h=c+v\sigma(b)$; both are constant.

Step 2, case $w>0$: for $x\le t$ the input $wx+b$ is $\le0$, so $h(x)=c+\alpha v(wx+b)$ with slope $\alpha vw$; for $x\ge t$ it is $\ge0$, slope $vw$. So $s_1=vw$, which is non-zero, and $s_0=\alpha s_1$.

Step 3, case $w<0$: dividing by $w<0$ flips the inequality, so for $x\le t$ the input is $\ge0$, slope $vw$, and for $x\ge t$ it is $\le0$, slope $\alpha vw$. So $s_0=vw$, which is non-zero, and $s_1=\alpha s_0$.

Step 4, exactly two pieces with same-sign slopes: in both cases the slopes are non-zero and differ, because $\alpha\ne1$, so $h$ is not affine and has at least $2$ pieces; by 1.b it has at most $2$. The slopes have the same sign because $\alpha>0$.

Step 5, the ReLU: $[x]_+$ is not constant, and its slope on $(-\infty,0]$ is $0$. By Step 4 a non-constant member of $\mathcal{H}_1$ has no zero slope, so $[x]_+\notin\mathcal{H}_1$. It has $p=2$ pieces, and 2.a puts it in $\mathcal{H}_2$, so for this $f$ the width $p$ cannot be lowered to $p-1$. With ReLU activation it is a single neuron.

**In words.** One leaky neuron is never flat on either side: it is a bent line whose two slopes have the same sign and ratio exactly $\alpha$. So it is strictly monotone, and it can never switch off the way a ReLU does.

**Sanity check.** The activation itself, $h=\sigma$, has slopes $\alpha$ and $1$, so $s_0=\alpha s_1$, as in Step 2. Conversely, a two-piece $f$ with $s_0=\alpha s_1$ lies in $\mathcal{H}_1$ by the last claim of 2.a, so the slope condition is the whole story for the case $w>0$.

**What to write in the exam.**

- Setup (1 pt): non-constant means $v\ne0$ and $w\ne0$; the kink is $t=-b/w$.
- Slopes (1 pt): $w>0$ gives $s_0=\alpha s_1$, and $w<0$ gives $s_1=\alpha s_0$, both non-zero, so two pieces.
- ReLU (1 pt): its left slope is $0$, impossible for a non-constant member of $\mathcal{H}_1$.

*Verified: 3000 random non-constant neurons (exact fractions): the measured slopes always satisfy $s_0=\alpha s_1$ or $s_1=\alpha s_0$ and have the same sign.*

**3.a (3) Definition of universality**

**What is asked.** Write the formal definition, with the quantifiers in the right order. The answer is a definition.

**Tool and why.** Def. 1 of Lecture 1 as used in Lecture 2, §1.3 (cheat sheet §4). The content is the order of the quantifiers: the width is chosen after the target and the accuracy.

**Definitions.** No new notation; $\mathcal{F}$, $d$ and $\mathcal{H}_B$ are from the statement.

**Solution.**

Step 1, the definition: the family $(\mathcal{H}_B)_{B\in\mathbb{N}}$ is $\mathcal{F}$-universal in the sense of $d(\cdot,\cdot)$ if

$$\forall f\in\mathcal{F}\ \ \forall\epsilon>0\ \ \exists B\in\mathbb{N}\ \ \exists h\in\mathcal{H}_B:\ \ d(f,h)<\epsilon.$$

Step 2, reading it: $B$ may depend on both $f$ and $\epsilon$. Only the values on $[0,1]$ enter $d$, so $h$ is unconstrained outside $[0,1]$. Writing $\le\epsilon$ gives an equivalent notion (apply it with $\epsilon/2$).

**In words.** Whatever continuous target and tolerance you pick, some finite width gets within that tolerance in average absolute error on $[0,1]$.

**Sanity check.** The swapped order, one width for all targets, is false: by 1.b every $h\in\mathcal{H}_B$ has at most $B+1$ pieces, and the inapproximability argument of Lecture 2, §1.4, uses only this piece count, so the sawtooth $g^{\circ L-1}$ stays at distance at least $\frac18-B\cdot2^{-L-2}-3\cdot2^{-L-1}$ from $\mathcal{H}_B$, close to $\frac18$ for large $L$.

**What to write in the exam.**

- Definition (3 pts): for every $f\in\mathcal{F}$ and $\epsilon>0$ there are $B\in\mathbb{N}$ and $h\in\mathcal{H}_B$ with $d(f,h)<\epsilon$.
- Remark: $B$ depends on $f$ and $\epsilon$.

*Verified: definitional part; the quantifier order is the one used in 3.b, where each target and tolerance get their own width.*

**3.b (6) Proof of universality**

**What is asked.** Prove that every continuous $f$ can be approximated in $d$ to any accuracy by a leaky network of some width, proving the approximation step rather than citing Lemma 1. The answer is a proof.

**Tool and why.** Lecture 2, §1.3: uniform continuity on $[0,1]$ (Heine–Cantor, the given hint) plus linear interpolation on a fine grid (cheat sheet §5, density of PWL functions). Part 2.a turns the interpolant into a network, so the approximation step is all that remains.

**Definitions.** Fix $f\in\mathcal{F}$ and $\epsilon>0$. Let $\delta>0$ be given by uniform continuity, choose an integer $n\ge2$ with $1/n<\delta$, and put the grid points $c_j:=j/n$ for $j=0,\dots,n$. Let $g$ be the function that is affine on each $[c_{j-1},c_j]$ with $g(c_j)=f(c_j)$, and that continues the affine formula of the first cell to $(-\infty,0]$ and that of the last cell to $[1,\infty)$.

**Solution.**

Step 1, $g$ is PWL with at most $n$ pieces: neighbouring cells share their grid value, so $g$ is continuous, and it is affine on the $n$ intervals $(-\infty,c_1]$, $[c_1,c_2]$, …, $[c_{n-1},\infty)$.

Step 2, $g$ is a network of width $n$: let $p\le n$ be its number of pieces. If $p\ge2$, then $g\in\mathcal{H}_p$ by 2.a, and $\mathcal{H}_p\subseteq\mathcal{H}_n$. If $p=1$, $g$ is affine, so $g\in\mathcal{H}_2$ by 2.a, and $\mathcal{H}_2\subseteq\mathcal{H}_n$ because $n\ge2$. Set $h:=g$.

Step 3, $g$ is a convex combination of two nearby values: fix $x\in[c_{j-1},c_j]$ and let $\lambda:=n(c_j-x)$, which lies in $[0,1]$. Because $g$ is affine on the cell,

$$g(x)=\lambda f(c_{j-1})+(1-\lambda)f(c_j).$$

Step 4, the pointwise bound: both $|x-c_{j-1}|$ and $|x-c_j|$ are at most $1/n$, which is below $\delta$, so by uniform continuity both $|f(x)-f(c_{j-1})|$ and $|f(x)-f(c_j)|$ are below $\epsilon$. Writing $f(x)=\lambda f(x)+(1-\lambda)f(x)$ and using the triangle inequality,

$$\begin{aligned}
|f(x)-g(x)|&\le\lambda\,|f(x)-f(c_{j-1})|+(1-\lambda)\,|f(x)-f(c_j)|\\
&<\lambda\epsilon+(1-\lambda)\epsilon\\
&=\epsilon.
\end{aligned}$$

Step 5, integrate: the cells cover $[0,1]$, so $|f-g|<\epsilon$ on all of $[0,1]$. The function $|f-g|$ is continuous on the compact $[0,1]$, so it attains a maximum $m$, and $m<\epsilon$. Hence

$$d(f,h)=\int_0^1|f(x)-g(x)|\,dx\le m<\epsilon.$$

Step 6, conclusion: for every $f\in\mathcal{F}$ and $\epsilon>0$ we found $B=n$ and $h\in\mathcal{H}_n$ with $d(f,h)<\epsilon$, which is the definition of 3.a.

**In words.** On a fine enough grid a continuous function hardly moves inside a cell, so the straight segment joining its two end values stays close to it. That segment chain is PWL with as many pieces as cells, and part 2 says a leaky network with that many neurons computes it exactly.

**Sanity check.** We even proved the stronger sup-norm statement on $[0,1]$, which implies the $L^1$ one, as in the sign-network exams (Exam 2021 Moed A, Q1d; Exam 2024 Moed C, Q1(4)). For $f(x)=x^2$ and $n=4$ the interpolation error in $d$ is exactly $\frac{1}{96}$, that is $\frac{1}{6n^2}$.

**What to write in the exam.**

- Grid (1 pt): $\delta$ from uniform continuity; $n\ge2$ with $1/n<\delta$; $g$ interpolates $f$ at $j/n$, extended affinely outside $[0,1]$.
- Membership (2 pts): $g$ is PWL with at most $n$ pieces, so $g\in\mathcal{H}_n$ by part 2.
- Bound (2 pts): $g(x)$ is a convex combination of $f(c_{j-1})$ and $f(c_j)$, both within $\epsilon$ of $f(x)$.
- Conclusion (1 pt): $|f-g|<\epsilon$ on $[0,1]$, so $d(f,g)<\epsilon$.

*Verified: numpy interpolation of several continuous targets on grids of $n$ from $2$ to $40$ cells; the measured errors are below the bounds, and for $x^2$ the error equals $\frac{1}{6n^2}$ to $10^{-8}$.*

**3.c (3) A width that guarantees accuracy $\epsilon$ for $K$-Lipschitz targets**

**What is asked.** For a $K$-Lipschitz $f$ and $n\ge2$, find $h\in\mathcal{H}_n$ with $d(f,h)\le\frac{K}{3n}$, and turn this into a width for accuracy $\epsilon$. The answer is a proof and a formula.

**Tool and why.** The same interpolant $g$ as in 3.b, with the convex-combination bound of Step 4 made quantitative by the Lipschitz constant, then integrated cell by cell (cheat sheet §5).

**Definitions.** Use $g$, $c_j$ and $\lambda$ from 3.b. For $x$ in the cell $[c_{j-1},c_j]$ let $u:=x-c_{j-1}$, the distance from the left grid point; then $c_j-x=\frac1n-u$ and $\lambda=1-nu$.

**Solution.**

Step 1, the pointwise bound: as in 3.b, Step 4, but with $|f(x)-f(c)|\le K|x-c|$:

$$\begin{aligned}
|f(x)-g(x)|&\le\lambda Ku+(1-\lambda)K\Big(\frac1n-u\Big)\\
&=K\Big[(1-nu)\,u+nu\Big(\frac1n-u\Big)\Big]\\
&=2Kn\,u\Big(\frac1n-u\Big).
\end{aligned}$$

Step 2, integrate over one cell: substituting $u$ for $x$,

$$\int_0^{1/n}2Kn\,u\Big(\frac1n-u\Big)du=2Kn\cdot\frac{1}{6n^3}=\frac{K}{3n^2},$$

using $\int_0^a u(a-u)\,du=\frac{a^3}{6}$ with $a=1/n$.

Step 3, sum over the $n$ cells:

$$d(f,g)\le n\cdot\frac{K}{3n^2}=\frac{K}{3n},$$

and $g\in\mathcal{H}_n$ by 3.b, Step 2.

Step 4, the width: $d(f,g)\le\epsilon$ as soon as $\frac{K}{3n}\le\epsilon$, so the width

$$\boxed{n=\max\Big\{2,\ \Big\lceil\frac{K}{3\epsilon}\Big\rceil\Big\}}$$

suffices.

**In words.** For a Lipschitz target the needed width grows only like $1/\epsilon$: halving the error costs twice the neurons. Plain continuity in 3.b gives no rate, because $\delta$ can be arbitrarily small.

**Sanity check.** For $f(x)=x^2$ on $[0,1]$, $K=2$, the true error $\frac{1}{6n^2}$ is far below $\frac{2}{3n}$. The worst Lipschitz case, a tent of slope $K$ in every cell with zeros at the grid points, has error exactly $\frac{K}{4n}$, so the constant $\frac13$ is within a factor $\frac43$ of the best possible.

**What to write in the exam.**

- Bound (1 pt): $|f-g|\le2Kn\,u(\frac1n-u)$ on a cell, from the convex combination and the Lipschitz condition.
- Integral (1 pt): $\frac{K}{3n^2}$ per cell, $\frac{K}{3n}$ in total.
- Width (1 pt): $n=\max\{2,\lceil K/(3\epsilon)\rceil\}$.

*Verified: sympy confirms the identity of Step 1 and the cell integral $\frac{1}{3n^2}$; numpy on 80 (target, $K$, $n$) combinations finds the error at most $0.58$ of $\frac{K}{3n}$, and exactly $\frac{K}{4n}$ for the tent-per-cell target.*

**4.a (4) Width-1 networks are monotone**

**What is asked.** Prove that every function in $\mathcal{N}_L$ is non-decreasing or non-increasing on $\mathbb{R}$. The answer is an induction over the layers.

**Tool and why.** Induction on the layer index, as for the passthrough and composition arguments of Lecture 2 (cheat sheet §5). With width $1$ every layer is a map from one number to one number, and such a map built from monotone pieces is monotone.

**Definitions.** Call a function *monotone of type $+$* if it is non-decreasing and *of type $-$* if it is non-increasing; constant functions are of both types. Let $u_l(x):=a_lz_{l-1}(x)+b_l$, the pre-activation of layer $l$.

**Solution.**

Step 1, $\sigma$ is increasing: on $z\ge0$ it is $z$, on $z\le0$ it is $\alpha z$ with $\alpha>0$, and the two branches agree at $0$. So $z\le z'$ implies $\sigma(z)\le\sigma(z')$.

Step 2, an affine map of a monotone function: if $g$ is monotone, then $ag+b$ is monotone, of the same type when $a\ge0$ and of the opposite type when $a\le0$, because multiplying an inequality by a non-positive number reverses it, and adding $b$ keeps it.

**Claim.** For every $l\in\{0,\dots,L\}$ the function $z_l$ is monotone. The induction is on $l$, upwards.

**Base.** $z_0(x)=x$ is non-decreasing.

**Hypothesis.** $z_{l-1}$ is monotone for some $l\in[L]$.

**Step.** By the hypothesis and Step 2, $u_l=a_lz_{l-1}+b_l$ is monotone; this is where the hypothesis is used. If $u_l$ is non-decreasing and $x\le x'$, then $u_l(x)\le u_l(x')$, and Step 1 gives $z_l(x)\le z_l(x')$. If $u_l$ is non-increasing, the same argument gives $z_l(x)\ge z_l(x')$. So $z_l$ is monotone, of the type of $u_l$.

Step 3, the output: $h=a_{L+1}z_L+b_{L+1}$ is monotone by the claim with $l=L$ and Step 2.

**In words.** A width-1 network passes a single number from layer to layer, and every layer either keeps or reverses the order of any two inputs. Composing order-keeping and order-reversing maps can only keep or reverse order, never produce a "down then up" shape.

**Sanity check.** For $L=1$ this is the monotonicity of $\mathcal{H}_1$ seen in 2.b (two slopes of the same sign). An example of type $-$: $\sigma(-\sigma(x))$, since the inner layer is increasing and the outer layer reverses order.

**What to write in the exam.**

- Activation (1 pt): $\sigma$ is non-decreasing (both branches increase, as $\alpha>0$).
- Induction (2 pts): if $z_{l-1}$ is monotone, so is $a_lz_{l-1}+b_l$ (the type flips when $a_l<0$), and so is its image under $\sigma$.
- Output (1 pt): the final affine map keeps monotonicity.

*Verified: 3000 random width-1 networks ($L\le8$, random signs, some zero weights, random $\alpha$) are monotone on a grid of 20001 points in $[-6,6]$ (numpy).*

**4.b (6) A floor of $\frac18$ for every depth, and width 2 suffices**

**What is asked.** Show that no width-1 network of any depth comes within $\frac18$ of $|2x-1|$ in $d$, conclude non-universality, show that $|2x-1|$ is in $\mathcal{H}_2$, and draw the moral. The answer is a proof, a construction and a sentence.

**Tool and why.** Pair each point with a point a quarter to its right, where the target moves against any monotone function (cheat sheet §4: non-universality means one target and one $\epsilon_0$ that no member reaches). Part 4.a reduces the class to monotone functions; 1.a (third identity) gives the width-2 construction.

**Definitions.** For a given $h$ let $e(x):=f(x)-h(x)$, the error at $x$.

**Solution.**

Step 1, the target on the left half moves down by $\frac12$: for $x\in[0,\frac14]$ both $x$ and $x+\frac14$ lie in $[0,\frac12]$, where $f(x)=1-2x$. So $f(x)=1-2x$ and $f(x+\frac14)=\frac12-2x$, and

$$f(x)-f\big(x+\tfrac14\big)=\tfrac12.$$

Step 2, a non-decreasing $h$: for $x\in[0,\frac14]$ we have $h(x+\frac14)\ge h(x)$, so, using $|a|+|b|\ge a-b$,

$$\begin{aligned}
|e(x)|+\big|e\big(x+\tfrac14\big)\big|&\ge e(x)-e\big(x+\tfrac14\big)\\
&=f(x)-f\big(x+\tfrac14\big)+h\big(x+\tfrac14\big)-h(x)\\
&\ge\tfrac12.
\end{aligned}$$

Step 3, integrate: substituting $x+\frac14$ in the second half of $[0,\frac12]$,

$$\begin{aligned}
d(f,h)&\ge\int_0^{1/2}|e(x)|\,dx\\
&=\int_0^{1/4}\Big(|e(x)|+\big|e\big(x+\tfrac14\big)\big|\Big)dx\\
&\ge\tfrac14\cdot\tfrac12=\tfrac18.
\end{aligned}$$

Step 4, a non-increasing $h$: use the right half. For $x\in[\frac12,\frac34]$ we have $f(x)=2x-1$ and $f(x+\frac14)=2x-\frac12$, so $f(x+\frac14)-f(x)=\frac12$, while $h(x)\ge h(x+\frac14)$. Then

$$|e(x)|+\big|e\big(x+\tfrac14\big)\big|\ge e\big(x+\tfrac14\big)-e(x)\ge\tfrac12,$$

and integrating over $x\in[\frac12,\frac34]$ gives $\int_{1/2}^1|e|\ge\frac18$, so again $d(f,h)\ge\frac18$.

Step 5, every depth: by 4.a every $h\in\mathcal{N}_L$ is of one of the two types, so

$$\boxed{d(f,h)\ge\tfrac18\quad\forall L\in\mathbb{N},\ \forall h\in\mathcal{N}_L}$$

Step 6, non-universality: the definition of 3.a, applied to $(\mathcal{N}_L)_L$, fails for the continuous target $f$ and $\epsilon=\frac18$: no depth $L$ and no $h\in\mathcal{N}_L$ have $d(f,h)<\frac18$.

Step 7, width 2 suffices: the third identity of 1.a with $z=2x-1$, divided by $1-\alpha$, gives

$$|2x-1|=\frac{1}{1-\alpha}\,\sigma(2x-1)+\frac{1}{1-\alpha}\,\sigma(1-2x),$$

a network with neurons $(w,b)=(2,-1)$ and $(-2,1)$, output weights $\frac{1}{1-\alpha}$ and bias $0$. So $f\in\mathcal{H}_2$ and its distance from $\mathcal{H}_2$ is $0$.

Step 8, the moral: depth cannot replace width; a width-1 network of any depth stays at least $\frac18$ away from a function that one hidden layer of width $2$ computes exactly, so depth pays off (as in Lecture 2's sawtooth, at width 3) only on top of enough width.

**In words.** A monotone function cannot follow a V: if it is low enough near the bottom of the V, it is too low on one of the arms. Every width-1 network is monotone, so it pays a fixed price on one arm, however many layers it has.

**Sanity check.** The bound is valid but not tight: the best monotone $L^1$ fit of $|2x-1|$ on $[0,1]$ has error $\frac16$ (dynamic program on a fine grid), attained by the constant $\frac13$ up to $x=\frac23$ followed by $f$ itself. Random width-1 networks never got below $0.25$.

**What to write in the exam.**

- Pairing (2 pts): on $[0,\frac14]$, $f$ drops by $\frac12$ from $x$ to $x+\frac14$ while a non-decreasing $h$ does not drop, so the two errors sum to at least $\frac12$.
- Integral (1 pt): integrate over $[0,\frac14]$ to get $\frac18$; the non-increasing case is symmetric on $[\frac12,1]$.
- Conclusion (1 pt): by 4.a this covers all of $\bigcup_L\mathcal{N}_L$, so universality fails with $\epsilon=\frac18$.
- Width 2 and moral (2 pts): $|2x-1|=\frac{\sigma(2x-1)+\sigma(1-2x)}{1-\alpha}$; depth does not replace width.

*Verified: the pairing identities hold on both halves; 3000 random width-1 networks have $d\ge\frac18$ (minimum found $0.2501$); a dynamic program for the best monotone $L^1$ fit on a 2000-point grid gives $0.16667$ for both types; the width-2 formula is exact in fractions.*

**Common mistakes.**

- In 2.a, converting each ReLU into two leaky neurons (the recitation formula) and stopping at width about $2p$: the function is right but $f\in\mathcal{H}_p$ is not proved (costs 3 points). Dropping the leftover term $\alpha(x-t_i)$ of the second identity breaks the construction altogether.
- In 1.b and 2.b, treating only $w>0$, or not saying why the network is affine on closed intervals (both branches of $\sigma$ agree at $0$); in 3.b citing Lemma 1 of Lecture 2 instead of proving the interpolation bound (costs 3 points).
- In 4.a, claiming that every layer is increasing: a negative $a_l$ reverses the order, so only "monotone of some type" survives. In 4.b, handling only the non-decreasing case (costs 2 points).

**💡 Useful tricks:** A leaky neuron is $(1-\alpha)$ times a ReLU plus $\alpha z$, the identity is $\frac{\sigma(z)-\sigma(-z)}{1+\alpha}$, and $|z|$ is $\frac{\sigma(z)+\sigma(-z)}{1-\alpha}$. Collect all affine leftovers into one term $A(x-t_1)$ and build it at an existing kink: width $p$ for $p$ pieces, and $p-1$ when $s_0=\alpha s_{p-1}$. A single leaky neuron is never flat, so $[x]_+\notin\mathcal{H}_1$. For universality, write the interpolant as a convex combination of two grid values. Width-1 nets are monotone at every depth, and pairing $x$ with $x+\frac14$ prices the V-shaped target at $\frac18$.

**⚠️ Watch out:** (1b) handle $w_i=0$ and both signs of $w_i$; the closed intervals need the two branches of $\sigma$ to agree at $0$. (2a) two leaky neurons per ReLU is correct but gives the wrong width; keep the $\alpha(x-t_i)$ leftovers. (2b) "non-constant" is what forces $v\ne0$ and $w\ne0$. (3b) prove the interpolation step; a fixed width is not enough, $B$ depends on $f$ and $\epsilon$. (4a) negative weights flip the order, so the claim is monotone, not increasing. (4b) treat the non-increasing case too, and remember $f$ itself is in $\mathcal{H}_2$.

## Q2 — Gradient flow on a single ReLU neuron (35)

**Full solution:**

**1. (8) The gradient flow equations**

**What is asked.** Compute $\partial \mathcal{L} / \partial v$ and $\nabla_w \mathcal{L}$ with the chain rule, and negate them to get the two flow equations. The answer is a derivation of the two displayed formulas.

**Tool and why.** The loss is a sum of squares of residuals, and each residual is a composition: a linear map $w \mapsto w^\top x_n$, then the ReLU, then multiplication by $v$. The chain rule handles such compositions term by term (cheat sheet §7). The ReLU derivative is fixed by the stated convention, so no case analysis at $0$ is needed.

**Definitions.** Write $z_n := w^\top x_n$ for the pre-activation on example $n$; we name it because the ReLU acts on it. The residual is $r_n = v\,[z_n]_+ - y_n$, as in the statement. The convention is

$$\frac{d}{dz}[z]_+ = \mathbb{1}[z > 0] .$$

**Solution.**

Step 1, the loss as a sum: $\mathcal{L} = \tfrac12 \sum_n r_n^2$, so by the chain rule each term contributes $r_n$ times the derivative of $r_n$.

Step 2, derivative in $v$: $[z_n]_+$ does not depend on $v$, so $\partial r_n / \partial v = [z_n]_+$. Hence

$$\frac{\partial \mathcal{L}}{\partial v} = \sum_{n=1}^{N} r_n\, [w^\top x_n]_+ .$$

Step 3, derivative in $w$: $v$ and $y_n$ do not depend on $w$. The ReLU derivative is $\mathbb{1}[z_n > 0]$ by the convention, and $\nabla_w z_n = x_n$ because $z_n$ is linear in $w$. So

$$\nabla_w r_n = v\, \mathbb{1}[z_n > 0]\, x_n ,$$

and

$$\nabla_w \mathcal{L} = \sum_{n=1}^{N} r_n\, v\, \mathbb{1}[w^\top x_n > 0]\, x_n .$$

Step 4, the flow: gradient flow is $\dot v = -\partial \mathcal{L} / \partial v$ and $\dot w = -\nabla_w \mathcal{L}$. Negating Steps 2 and 3 and pulling the common factor $v$ out of the sum gives exactly the two displayed equations.

**In words.** The output weight $v$ is pushed by how wrong each prediction is, times the neuron's activation. The input weight $w$ is pushed the same way, but only through examples where the neuron is active, and scaled by $v$, because $v$ is the path from the neuron to the output.

**Sanity check.** In the setting of part 4 ($D = 1$, one example $x_1 = 1$, $y_1 = -1$) the loss is $\tfrac12 (v[w]_+ + 1)^2$. Differentiating it directly in $v$ gives $(v[w]_+ + 1)\,[w]_+$, which is $r_1 [w x_1]_+$, as Step 2 says.

**What to write in the exam.**

- Chain rule on $\mathcal{L} = \tfrac12 \sum_n r_n^2$: $\partial r_n / \partial v = [w^\top x_n]_+$ (4 pts).
- Next, $\nabla_w r_n$ is $v\, \mathbb{1}[w^\top x_n > 0]\, x_n$ by the convention and $\nabla_w (w^\top x_n) = x_n$ (4 pts).
- Finally, negate both to get $\dot v$ and $\dot w$.

*Verified: on 200 random datasets and parameters, both formulas agree with central finite differences of $\mathcal{L}$ to $6 \cdot 10^{-9}$ (NumPy).*

**2. (9) Balancedness: $v^2 - \|w\|^2$ is conserved**

**What is asked.** Show that the time derivative of $v(t)^2 - \|w(t)\|^2$ is zero along the flow. The answer is a calculation.

**Tool and why.** Differentiate along the flow with the chain rule, substitute the flow equations of part 1, and compare the two terms. They match thanks to the positive homogeneity of the ReLU, $z\, \mathbb{1}[z > 0]$ equals $[z]_+$ (cheat sheet §8, balancedness).

**Definitions.** No new notation; $z_n$ and $r_n$ are as in part 1.

**Solution.**

Step 1, differentiate: $\tfrac{d}{dt} v^2 = 2 v \dot v$, and $\tfrac{d}{dt} \|w\|^2 = 2 w^\top \dot w$ because $\|w\|^2 = w^\top w$. So

$$\frac{d}{dt}\big(v^2 - \|w\|^2\big) = 2 v \dot v - 2 w^\top \dot w .$$

Step 2, substitute part 1: multiply $\dot v$ by $2v$, and take the inner product of $\dot w$ with $2w$, using $w^\top x_n = z_n$.

$$2 v \dot v = -2 v \sum_{n} r_n\, [z_n]_+ , \qquad 2 w^\top \dot w = -2 v \sum_{n} r_n\, \mathbb{1}[z_n > 0]\, z_n .$$

Step 3, the homogeneity identity: for every real $z$, $z\, \mathbb{1}[z > 0]$ equals $[z]_+$. Check two cases. If $z > 0$, both sides equal $z$. If $z \le 0$, the left side is $z \cdot 0$ and the right side is $\max\{z, 0\}$, both $0$; this includes $z = 0$, where the convention makes the indicator $0$.

Step 4, conclude: by Step 3 the two sums of Step 2 are term by term equal, so the difference in Step 1 is $0$. Integrating from $0$ to $t$,

$$v(t)^2 - \|w(t)\|^2 = v(0)^2 - \|w(0)\|^2 \quad \text{for all } t \ge 0 .$$

This is the single-neuron case of the balancedness conservation law (Lecture 4, Lemma 1).

**In words.** Scaling $w$ up by a factor and $v$ down by the same factor does not change the network. Gradient flow is "blind" in that direction, and the conserved quantity is exactly the record of that blindness.

**Sanity check.** In the part 4 example started at $(w, v) = (1, 2)$, the conserved value is $4 - 1 = 3$. The simulated flow ends at $w = 0$, $v = 1.73205$, and $1.73205^2$ is $3.0000$.

**What to write in the exam.**

- Setup: $\tfrac{d}{dt}(v^2 - \|w\|^2) = 2v\dot v - 2w^\top \dot w$ (3 pts).
- Substitution of part 1: both terms carry the factor $-2v$, and they sum $r_n [z_n]_+$ and $r_n \mathbb{1}[z_n > 0]\, z_n$ respectively (3 pts).
- Identity: $z\,\mathbb{1}[z > 0]$ equals $[z]_+$, checked for $z > 0$ and $z \le 0$, so the derivative is $0$ (3 pts).

*Verified: at 200 random points $2v\dot v - 2w^\top \dot w$ is below $10^{-8}$; RK4 runs on 5 random datasets keep $v^2 - \|w\|^2$ constant to $10^{-4}$ (NumPy).*

**3. (8) Strict imbalance freezes the sign of $v$**

**What is asked.** Assuming $v(0)^2 > \|w(0)\|^2$, prove that $v(t)$ never vanishes and keeps the sign of $v(0)$. The answer is a proof.

**Tool and why.** Part 2 gives a conserved quantity, and here it is strictly positive. Since $\|w\|^2 \ge 0$, it bounds $v^2$ away from $0$ (cheat sheet §8). The sign then cannot change because $v$ is continuous: the intermediate value theorem would produce a zero.

**Definitions.** Let $c_0 := v(0)^2 - \|w(0)\|^2$, the conserved value; by assumption $c_0 > 0$.

**Solution.**

Step 1, a lower bound on $v^2$: by part 2, $v(t)^2 = \|w(t)\|^2 + c_0$ for every $t \ge 0$. A squared norm is non-negative, so

$$v(t)^2 \ge c_0 > 0 .$$

Only the difference is conserved, not $v^2$ itself, but the difference is enough.

Step 2, no zeros: from Step 1, $|v(t)| \ge \sqrt{c_0}$, so $v(t) \ne 0$ for every $t \ge 0$. In particular $v(0) \ne 0$, so $v(0)$ has a definite sign.

Step 3, **Claim.** $v(t)$ has the sign of $v(0)$ for every $t \ge 0$. The proof is by contradiction. Suppose $v(t_1)$ has the sign of $v(0)$ but $v(t_2)$ has the opposite sign, for some $t_2 > 0$ (take $t_1 = 0$). The flow is differentiable by assumption, so $v$ is continuous on $[0, t_2]$. By the intermediate value theorem there is a time $t^*$ strictly between $0$ and $t_2$ with $v(t^*) = 0$. This contradicts Step 2.

**In words.** The output weight starts "bigger" than the input weight, and the gap $c_0$ never closes. So $|v|$ can shrink only down to $\sqrt{c_0}$ and never passes through zero. This is simpler than the balanced case ($c_0 = 0$, as in b\_2022 Q2), which needs an integrating-factor argument.

**Sanity check.** Five RK4 runs on random data with $c_0$ between $0.37$ and $0.58$ keep the sign of $v$, and the smallest $|v|$ seen is always above $\sqrt{c_0}$ (for example $0.716$ against $0.698$).

**What to write in the exam.**

- Bound: by part 2, $v(t)^2 = \|w(t)\|^2 + c_0$, which is at least $c_0$, and $c_0 > 0$ (3 pts).
- Hence $|v(t)| \ge \sqrt{c_0}$ and $v(t) \ne 0$ for all $t$ (2 pts).
- Sign change plus continuity would give a zero by the intermediate value theorem, a contradiction (3 pts).

*Verified: RK4 with step $10^{-3}$ up to $t = 5$ on five random datasets: the sign of $v$ is kept and the minimum of $|v|$ stays above $\sqrt{c_0}$ (NumPy).*

**4. (10) An unreachable infimum**

**What is asked.** For $\mathcal{L}(w, v) = \tfrac12 (v[w]_+ + 1)^2$: (i) the infimum is $0$ and is attained; (ii) from $v(0) > |w(0)|$ the loss stays at least $\tfrac12$ forever; (iii) conclude and contrast with linear networks. The answer is a minimizer, a lower bound, and one sentence of comparison.

**Tool and why.** For (i) a square is at least $0$, so exhibiting one zero suffices. For (ii) part 3 freezes the sign of $v$ (cheat sheet §8, ReLU sign preservation); with $v > 0$ the network output is never negative, while the label is $-1$. For (iii) the relevant class result is convergence of gradient flow over deep linear networks (cheat sheet §9; Lecture 4, Thm 2).

**Definitions.** No new notation. Note that here $r_1 = v[w]_+ + 1$, since $x_1 = 1$ and $y_1 = -1$.

**Solution.**

Step 1, (i) the infimum: $\mathcal{L} \ge 0$ as half a square. At $(w, v) = (1, -1)$ the output is $(-1)[1]_+ = -1$, so $r_1 = 0$ and $\mathcal{L}(1, -1) = 0$. Hence $\inf \mathcal{L} = 0$, attained at $(1, -1)$. Any minimizer needs $v[w]_+ = -1$, which forces $v < 0$ because $[w]_+ \ge 0$.

Step 2, (ii) the initialization satisfies part 3: from the assumption,

$$v(0) > |w(0)| \ge 0 .$$

So $v(0) > 0$, and squaring two non-negative numbers keeps the strict order, so $v(0)^2 > w(0)^2$. With $D = 1$ this is the assumption $v(0)^2 > \|w(0)\|^2$ of part 3.

Step 3, the sign stays positive: by part 3, $v(t) > 0$ for every $t \ge 0$.

Step 4, the output is never negative: $[w(t)]_+ \ge 0$ and $v(t) > 0$, so $v(t)[w(t)]_+ \ge 0$. Hence the residual satisfies $r_1(t) \ge 1$, and

$$\mathcal{L}(w(t), v(t)) = \tfrac12\, r_1(t)^2 \ge \tfrac12 .$$

Squaring keeps the inequality because both sides of $r_1(t) \ge 1$ are positive.

Step 5, (iii) conclusion: the flow stays at loss at least $\tfrac12$ forever, while the infimum is $0$, so gradient flow over ReLU networks does not always converge to the global infimum. Contrast: for deep linear networks, gradient flow from a balanced initialization whose end-to-end matrix has a deficiency margin provably reaches the global minimum at a linear rate (Lecture 4, Thm 2), whereas a single ReLU neuron already admits no such unconditional guarantee.

**In words.** To output $-1$ the network needs $v < 0$, but the conserved gap keeps $v$ away from $0$, so $v$ can never cross from positive to negative. The flow is trapped on the wrong side.

**Sanity check.** Start at $(w, v) = (1, 2)$, so $c_0 = 3$. Simulating the flow, $w$ reaches $0$ at about $t = 0.316$; from then on both gradients vanish (the ReLU is inactive), so the flow freezes with $v = \sqrt{3}$ and $\mathcal{L} = \tfrac12$ exactly. The bound of Step 4 is tight. Also, on a grid with $v > 0$ the smallest loss is $0.5$.

**What to write in the exam.**

- (i) $\mathcal{L} \ge 0$ and $\mathcal{L}(1, -1) = 0$, so the infimum $0$ is attained; minimizers need $v < 0$ (3 pts).
- (ii) $v(0) > |w(0)|$ gives $v(0) > 0$ and $v(0)^2 > w(0)^2$; part 3 gives $v(t) > 0$ (3 pts).
- Then $v[w]_+ \ge 0$, the residual is at least $1$, and $\mathcal{L} \ge \tfrac12$ (2 pts).
- (iii) No convergence to the infimum; contrast with linear-network convergence, Lecture 4, Thm 2 (2 pts).

*Verified: RK4 from $(1, 2)$, $(0.5, 0.6)$, $(0.9, 1)$ and $(-0.3, 1)$ ends with loss $0.500000$ and $v$ equal to $\sqrt{c_0}$ when $w$ reaches $0$; Euler with step $10^{-5}$ from $(1, 2)$ never goes below $\tfrac12$; $\mathcal{L}(1, -1) = 0$ exactly (NumPy).*

**Common mistakes.**

- Dropping the factor $v$ in $\dot w$, or a sign error in the flow (costs 2 points); using $\mathbb{1}[z \ge 0]$ against the stated convention.
- Claiming that $v^2$ itself is conserved, or citing balancedness from class instead of deriving it here; skipping continuity and the intermediate value theorem in part 3 ("$v$ cannot jump" must be justified).
- Exhibiting a minimizer with $v > 0$ (impossible), or contrasting part 4 with the wrong class result: the relevant one is convergence of linear networks, not saddle avoidance.

**💡 Useful tricks:** Chain rule with the $\mathbb 1[z>0]$ convention; homogeneity $z\,\mathbb 1[z>0]$ equals $[z]_+$ ⇒ balancedness $v^2-\|w\|^2$ conserved; *strict* imbalance $c_0>0$ ⇒ $v(t)^2\geq c_0$ ⇒ sign of $v$ frozen (simpler than the balanced case); $v>0$ and $[w]_+\geq0$ ⇒ a negative label is unreachable ⇒ loss floor $\tfrac12$.

**⚠️ Watch out:** (1) don't drop the factor $v$ in $\dot w$; (2) derive balancedness in *this* setting — don't cite class; (3) sign preservation needs continuity + IVT, and strict imbalance hands you $|v(t)|\geq\sqrt{c_0}$ for free; (4) the global min needs $v<0$, and the contrast is with *linear-network convergence* (Thm 2), not saddle avoidance.

## Q3 — PAC-Bayes with Gaussian priors and posteriors (30)

**Full solution:**

**1. (8) KL between two Gaussians with the same variance**

**What is asked.** Compute $KL(Q \| P)$ for $Q = N(w, \sigma^2 I_d)$ and $P = N(0, \sigma^2 I_d)$ from the definition, and show it equals $\|w\|^2 / (2\sigma^2)$. The answer is a derivation.

**Tool and why.** KL is the expectation under $Q$ of the log density ratio (cheat sheet §2, KL between Gaussians). The two densities share the same normalization, so it cancels in the ratio, and the log of an exponential leaves a quadratic in $\theta$ whose expectation needs only the mean of $Q$.

**Definitions.** Let $q, p$ be the densities of $Q$ and $P$. We use $\langle \theta, w \rangle$ for the inner product and the expansion $\|\theta - w\|^2 = \|\theta\|^2 - 2\langle \theta, w \rangle + \|w\|^2$.

**Solution.**

Step 1, the ratio of densities: both densities carry the factor $(2\pi\sigma^2)^{-d/2}$, which cancels. What is left is a ratio of exponentials, so its log is the difference of exponents:

$$\ln \frac{q(\theta)}{p(\theta)} = \frac{ -\|\theta - w\|^2 + \|\theta\|^2 }{2\sigma^2} .$$

Step 2, expand the square: by the expansion in Definitions the $\|\theta\|^2$ terms cancel, and

$$\ln \frac{q(\theta)}{p(\theta)} = \frac{ 2\langle \theta, w\rangle - \|w\|^2 }{2\sigma^2} .$$

Step 3, take the expectation under $Q$: the expression is affine in $\theta$, and $\mathbb{E}_{\theta \sim Q}[\theta] = w$ because $w$ is the mean of $Q$. So $\mathbb{E}_Q \langle \theta, w \rangle$ equals $\|w\|^2$, and

$$\begin{aligned}
KL(Q \| P) &= \frac{2\|w\|^2 - \|w\|^2}{2\sigma^2} \\
&= \frac{\|w\|^2}{2\sigma^2} .
\end{aligned}$$

Step 4, the lecture formula as a cross-check: Lecture 6, Lemma 1 with both covariances equal to $\sigma^2 I_d$ has trace term $d$, mean term $\|w\|^2 / \sigma^2$, dimension term $-d$ and log-determinant term $\ln 1 = 0$. Half their sum is again $\|w\|^2 / (2\sigma^2)$. This route earns full credit too if all four terms are computed.

**In words.** Moving a Gaussian without changing its shape costs, in KL, the squared distance moved measured in units of the variance. A wider prior makes the same move cheaper.

**Sanity check.** At $w = 0$ the two distributions coincide and the formula gives $0$, as KL must. Expanding the second moments separately also works: $\mathbb{E}_Q \|\theta\|^2$ is $\|w\|^2 + d\sigma^2$ and $\mathbb{E}_Q \|\theta - w\|^2$ is $d\sigma^2$, and their difference is again $\|w\|^2$.

**What to write in the exam.**

- Normalizations $(2\pi\sigma^2)^{-d/2}$ cancel in $q / p$ (2 pts).
- Log ratio: $(2\langle \theta, w \rangle - \|w\|^2) / (2\sigma^2)$ after expanding the square (3 pts).
- Expectation with $\mathbb{E}_Q[\theta] = w$ gives $\|w\|^2 / (2\sigma^2)$ (3 pts).

*Verified: SymPy integrates the one-dimensional case exactly to $w^2 / (2\sigma^2)$; Monte-Carlo in $d = 5$ with $4 \cdot 10^5$ samples gives $8.130$ against the formula's $8.122$ (NumPy, SymPy).*

**2. (7) The Gaussian PAC-Bayes bound and what it covers**

**What is asked.** Derive the bound for $N(w, \sigma^2 I_d)$ that holds for all $w$ at once, then explain (i) why $w_S$ may depend on $S$ and (ii) which predictor the bound is about. The answer is a short derivation and two sentences.

**Tool and why.** The PAC-Bayes theorem of the reminder (cheat sheet §11) with the data-independent prior $P = N(0, \sigma^2 I_d)$, plus part 1 for its KL term. The theorem's event does not depend on $Q$, which is the whole point of (i).

**Definitions.** Write $Q_w := N(w, \sigma^2 I_d)$ for the posterior centred at $w$.

**Solution.**

Step 1, the theorem applies: $P$ is fixed before seeing the data, so it is independent of $S$, as the reminder requires.

Step 2, one event for all posteriors: the reminder gives a single event of probability at least $1 - \delta$ over $S$ on which the bound holds for every $Q$ simultaneously. In particular it holds for every member of the family $\{ Q_w : w \in \mathbb{R}^d \}$.

Step 3, substitute part 1: on that event, $KL(Q_w \| P) = \|w\|^2 / (2\sigma^2)$, so for every $w$

$$L_D(Q_w) \le L_S(Q_w) + \sqrt{\frac{\frac{\|w\|^2}{2\sigma^2} + \ln\!\big(\frac{2N}{\delta}\big)}{2(N-1)}} .$$

Since this holds for every $w$ on the same event, it holds for $w = w_S$ whatever value training produced.

Step 4, (i) legitimacy: the quantifier over $Q$ sits inside the high-probability event, so the event is the same whichever posterior is used afterwards. Hence the posterior may be chosen after seeing $S$; only the prior must be data-independent. No union bound over $w$ is needed, and none would work over an uncountable family.

Step 5, (ii) which predictor: the guarantee is for the stochastic ("noisy") predictor that draws $\theta \sim N(w_S, \sigma^2 I_d)$ and predicts with $h_\theta$. It bounds $L_D(Q_{w_S})$, not $L_D(h_{w_S})$; the latter needs an additional argument (Lecture 6).

**In words.** The prior is the commitment you make before seeing data; the posterior is free. PAC-Bayes charges you only for how far the posterior moved from the prior.

**Sanity check.** At $w = 0$ the KL term vanishes and the bound reduces to $\sqrt{\ln(2N/\delta) / (2(N-1))}$, the price of using a single fixed distribution.

**What to write in the exam.**

- Prior $N(0, \sigma^2 I_d)$ is data-independent, so the reminder holds on one event for all $Q$ (3 pts).
- Plug in $KL = \|w\|^2 / (2\sigma^2)$ from part 1, for all $w$, in particular $w_S$.
- (i) The "for all $Q$" is inside the event, so $Q$ may depend on $S$; no union bound over $w$ (2 pts).
- (ii) The bound is for the stochastic predictor $Q_{w_S}$, not for $h_{w_S}$ itself (2 pts).

*Verified: the bound is the reminder with the KL of part 1, which was checked symbolically and by Monte-Carlo; at $w = 0$ the KL term is $0$ (SymPy).*

**3.a (5) Why a prior centred at $w_S$ is illegal**

**What is asked.** Name the violated hypothesis of the theorem, and the step of the class proof that breaks when $P$ depends on $S$. The answer is an explanation that points at a specific proof step.

**Tool and why.** Recall the structure of the class proof of PAC-Bayes (cheat sheet §11; Lecture 6, Thm 2): change of measure, a swap of two expectations, Hoeffding for a fixed hypothesis, and Markov. We locate which of these uses the independence of $P$ from $S$.

**Definitions.** For a hypothesis $\theta$ let $\Delta(\theta) := L_D(h_\theta) - L_S(h_\theta)$, its generalization gap. Let

$$f(S) := \sup_Q \Big[ 2(N-1)\, \mathbb{E}_{\theta \sim Q}[\Delta(\theta)^2] - KL(Q\|P) \Big],$$

the quantity whose exponential the proof bounds in expectation.

**Solution.**

Step 1, the violated hypothesis: the prior must be chosen independently of $S$. The prior $N(w_S, \sigma^2 I_d)$ is a function of $S$, so the theorem simply does not cover it. Its probability statement is over draws of $S$ for a fixed $P$.

Step 2, the proof outline: change of measure gives

$$f(S) \le \ln \mathbb{E}_{\theta \sim P}\big[ e^{2(N-1)\Delta(\theta)^2} \big] .$$

Then the proof takes $\mathbb{E}_S$ of $e^{f(S)}$ and swaps $\mathbb{E}_S$ with $\mathbb{E}_{\theta \sim P}$. Then, for each fixed $\theta$, Hoeffding on the i.i.d. losses gives

$$\mathbb{E}_S\big[ e^{2(N-1)\Delta(\theta)^2} \big] \le 2N .$$

Markov's inequality on $e^{f(S)}$ finishes.

Step 3, the broken step: the swap is valid only because $P$ does not depend on $S$, so that the inner expectation is over a fixed distribution. Likewise Hoeffding applies only to a hypothesis fixed before drawing $S$. With $P = P(S)$ the swap is illegal, and the hypotheses that $P(S)$ favours are selected using $S$. Training centres $P(S)$ exactly on parameters whose empirical loss is atypically small relative to $L_D$, so $\Delta(\theta)$ is large there. Then $\mathbb{E}_S \mathbb{E}_{\theta \sim P(S)}[e^{2(N-1)\Delta(\theta)^2}]$ need not be at most $2N$, and the failure probability is no longer at most $\delta$.

**In words.** The "free" bound with $KL = 0$ is the same fallacy as reading generalization off the training loss: the prior was allowed to look at the answers.

**Sanity check.** The shortcut bound has no dependence on $w_S$ at all; for $N = 10^4$ and $\delta = 0.05$ it is $0.0254$ for any network, even one that memorized random labels, which by the Zhang et al. experiments can have test error near chance. A bound that cannot tell these apart cannot be valid.

**What to write in the exam.**

- Violated hypothesis: $P$ must be independent of $S$, and $N(w_S, \sigma^2 I_d)$ is not (2 pts).
- Broken step: swapping $\mathbb{E}_S$ and $\mathbb{E}_{\theta \sim P}$, and Hoeffding for a fixed $\theta$, both need $P$ independent of $S$ (3 pts).
- Without them $\mathbb{E}_S[e^{f(S)}]$ is not bounded by $2N$, so the $\delta$ guarantee is lost.

*Verified: the numeric value $\sqrt{\ln(2 \cdot 10^4 / 0.05) / (2 \cdot 9999)}$ equals $0.0254$; the proof steps were checked against the lecture's proof outline (NumPy).*

**3.b (5) Adapting the prior's scale by a weighted union bound**

**What is asked.** Prove a bound that holds with probability at least $1 - \delta$ for all $j$ and all $Q$ at once, with the extra term $(j+1)\ln 2$, and write it for $Q_j = N(w_S, 2^j \sigma_0^2 I_d)$. The answer is a proof and the final bound.

**Tool and why.** Each prior $P_j$ is data-independent, so the reminder applies to it at its own confidence $\delta_j$. Countably many events are combined by a weighted union bound with summable weights (cheat sheet §2, SRM and the $\delta_k$ trick). Part 1 then gives each KL term.

**Definitions.** $P_j = N(0, 2^j \sigma_0^2 I_d)$ and $\delta_j = \delta\, 2^{-(j+1)}$, as in the statement. Let $E_j$ be the event on which the reminder's bound holds for $P_j$ at level $\delta_j$, for all $Q$.

**Solution.**

Step 1, each event: $P_j$ does not depend on $S$, so by the reminder $E_j$ has probability at least $1 - \delta_j$, that is, its complement has probability at most $\delta_j$.

Step 2, the weights sum to $\delta$: a geometric series,

$$\sum_{j \ge 0} \delta_j = \delta \sum_{j \ge 0} 2^{-(j+1)} = \delta \Big( \tfrac12 + \tfrac14 + \cdots \Big) = \delta .$$

Step 3, union bound: the probability that some $E_j$ fails is at most $\sum_j \delta_j$, which is $\delta$. So with probability at least $1 - \delta$ all events $E_j$ hold together.

Step 4, the log term: on $E_j$ the bound has $\ln(2N/\delta_j)$, and since $1/\delta_j$ is $2^{j+1}/\delta$,

$$\ln\frac{2N}{\delta_j} = \ln\frac{2N}{\delta} + (j+1)\ln 2 .$$

This is exactly the displayed bound, for every $j$ and every $Q$ simultaneously. Hence $j$, like $Q$, may be chosen after seeing $S$.

Step 5, instantiate: part 1 with variance $2^j \sigma_0^2$ in place of $\sigma^2$ gives

$$KL(Q_j \| P_j) = \frac{\|w_S\|^2}{2 \cdot 2^j \sigma_0^2} = \frac{\|w_S\|^2}{2^{j+1} \sigma_0^2} .$$

So with probability at least $1 - \delta$, for every $j$:

$$L_D(Q_j) \le L_S(Q_j) + \sqrt{ \frac{ \frac{\|w_S\|^2}{2^{j+1}\sigma_0^2} + \ln\!\big(\tfrac{2N}{\delta}\big) + (j+1)\ln 2 }{ 2(N-1) } } ,$$

and one may pick the $j$ that minimizes the right-hand side.

**In words.** Instead of guessing one prior scale in advance, we commit in advance to a list of scales, doubling each time, and pay only $\ln 2$ per step down the list. The scale is tuned within a factor $2$ of any target at a logarithmic price, and only the scale, never the mean.

**Sanity check.** Take $\|w_S\|^2 = 100$, $\sigma_0^2 = 1$, $N = 10^4$, $\delta = 0.05$, and look at the square-root term alone. It is $0.0564$ at $j = 0$, falls to $0.0304$ at $j = 6$ (KL $0.78$), and rises again to $0.0316$ at $j = 9$, because the $(j+1)\ln 2$ penalty takes over. In practice $L_S(Q_j)$ also grows with $j$, since the noise is wider.

**What to write in the exam.**

- Each $P_j$ is data-independent; apply the reminder at level $\delta_j$.
- Weights sum to $\delta$, so by the union bound all events hold together with probability at least $1 - \delta$ (2 pts).
- Rewrite $\ln(2N/\delta_j)$ as $\ln(2N/\delta) + (j+1)\ln 2$; holds for all $j$ and $Q$, so $j$ may depend on $S$ (2 pts).
- Part 1 at variance $2^j\sigma_0^2$: $KL(Q_j \| P_j) = \|w_S\|^2 / (2^{j+1}\sigma_0^2)$ (1 pt).

*Verified: SymPy sums $\sum_{j \ge 0} 2^{-(j+1)}$ to $1$, simplifies the log identity and the KL at variance $2^j\sigma_0^2$; the table of square-root terms for $j = 0, \dots, 9$ was computed in NumPy.*

**4. (5) Flat minima and low norm**

**What is asked.** In at most four sentences, explain why the bound of part 2 favours flat, low-norm solutions, and tie this to the class discussion on what a meaningful bound should depend on. The answer is a short paragraph.

**Tool and why.** Read the two terms of the bound of part 2 separately (cheat sheet §11, PAC-Bayes instantiations; Lecture 6). The bound is small only if both terms are small, and each term measures one property.

**Definitions.** No new notation; $L_S(N(w_S, \sigma^2 I_d))$ is the training loss averaged over Gaussian noise added to the weights.

**Solution.**

Step 1, the noisy training loss: this term stays close to $L_S(h_{w_S})$ exactly when the loss barely changes under random perturbations of the weights, that is, when $w_S$ is a **flat** minimum.

Step 2, the KL term: $\|w_S\|^2 / (2\sigma^2)$ is small exactly when the learned weights have **low norm**.

Step 3, the model answer (four sentences): "The bound is small only if both of its terms are small. The first term is the training loss averaged over Gaussian weight noise, which stays near the training loss of $h_{w_S}$ exactly when the minimum is flat, while the KL term $\|w_S\|^2 / (2\sigma^2)$ is small exactly when the weights have low norm. So PAC-Bayes rewards flat, low-norm solutions. Unlike uniform convergence or the norm-only Rademacher bound, it depends on both the learned hypothesis and the sample, which is what the class discussion requires of a bound that could explain the observed generalization phenomena."

**In words.** A flat minimum can be described coarsely (noise does not hurt), and a low-norm one is close to the prior; both mean the solution is "simple" relative to the prior, which is what the bound pays for.

**Sanity check.** A larger $\sigma^2$ shrinks the KL term but widens the noise ball, raising the noisy training loss; part 3.b tunes this trade-off legitimately.

**What to write in the exam.**

- Noisy training loss term is small iff the minimum is flat (2 pts).
- KL term $\|w_S\|^2 / (2\sigma^2)$ is small iff the norm is low (2 pts).
- Tie to class: the bound depends on both $w_S$ and $S$, as a meaningful bound must (1 pt); stay within four sentences (otherwise lose 1).

*Verified: the KL term was computed in part 1; the claim about the noisy term is qualitative and matches Lecture 6's interpretation, so there is no number to check.*

**Common mistakes.**

- A sign error in the exponent difference of part 1, or leaving the second moments uncancelled.
- Re-invoking the theorem for each $w$ with fresh $\delta$'s and union-bounding in part 2, or claiming the bound holds for $h_{w_S}$ itself.
- In 3.a, a vague "overfitting" remark without naming the broken step (only 2 of 5 points); in 3.b, non-summable $\delta_j$, a KL left at variance $\sigma_0^2$, or letting the prior's mean depend on $w_S$.

**💡 Useful tricks:** Gaussian KL: normalizations cancel and $\mathbb E_Q[\theta]=w$ ⇒ $KL=\|w\|^2/2\sigma^2$; the "$\forall Q$" sits *inside* the high-probability event, so the posterior may be picked after seeing $S$ (no union over $w$); tune the prior *scale* with a grid $P_j=N(0,2^j\sigma_0^2)$, $\delta_j=\delta2^{-(j+1)}$; a small bound ⇔ flat + low-norm minimum.

**⚠️ Watch out:** (1) watch the exponent sign; the second moments cancel; (2) do NOT union-bound over $w$ — the free $\forall Q$ is the point; (3a) name the *broken step* — the $\mathbb E_S\leftrightarrow\mathbb E_{\theta\sim P}$ swap needs $P\perp S$, and Hoeffding fails on $S$-selected hypotheses — not a vague "overfitting"; (3b) keep $\delta_j$ summable, recompute $KL$ at variance $2^j\sigma_0^2$, and tune only the scale, never the prior mean.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1b only $w_i > 0$ treated, or affinity on closed intervals
  not argued; Q1.2a two leaky neurons per ReLU (width about $2p$) or the leftover
  $\alpha(x - t_i)$ dropped; Q1.2b only one sign of $w$ treated; Q1.3b Lemma 1 cited
  instead of proved; Q1.4a "every layer is increasing" (negative weights reverse the
  order); Q1.4b only the non-decreasing case handled; Q2.1
  missing factor $v$; Q2.3 claiming $v^2$ (rather than the difference) conserved,
  or skipping the IVT step; Q2.4 wrong class result cited in the contrast; Q3.1
  exponent sign; Q3.2 spurious union bound over $w$; Q3.3a vague "overfitting"
  answer without naming the broken step; Q3.3b non-summable weights or stale KL.
