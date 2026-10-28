# Mock Exam 1 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_01.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-07-06 (Q2 flow: loss → 1e-27, imbalance drift ~1e-14).

## Q1 — Maxout networks (40)

**Full solution:**

**1. (10) Convexity and at most $k$ pieces**

**What is asked.** Two facts about a single maxout unit $h\in\mathcal{M}_k$: it is convex, and the real line splits into at most $k$ maximal intervals on which $h$ is affine. The answer is a proof. Points: 4 for convexity, 6 for the piece count.

**Tool and why.** Two elementary facts about piecewise linear functions (cheat sheet §5): a pointwise maximum of convex functions is convex, and a sublevel set of a convex function on $\mathbb{R}$ is an interval. The second fact attaches to every line one interval on which it is the maximum, and $k$ intervals give at most $k$ pieces.

**Definitions.** Write $\ell_i(x) := w_i x + b_i$ for $i\in[k]$, so that $h=\max_i \ell_i$. We may assume the $k$ pairs $(w_i,b_i)$ are distinct, because a repeated line does not change the maximum and only lowers the count. For each $i$ the *active set*

$$I_i := \{x\in\mathbb{R} : h(x) = \ell_i(x)\}$$

is the set of inputs where line $i$ attains the maximum. We introduce it because $h$ coincides with $\ell_i$ on $I_i$, so $h$ is affine there.

**Solution.**

Step 1, convexity: fix $x,y\in\mathbb{R}$ and $\theta\in[0,1]$. Each $\ell_i$ is affine, and $\ell_i\le h$ pointwise, so for every $i$

$$\begin{aligned}
\ell_i(\theta x+(1-\theta)y)&=\theta\ell_i(x)+(1-\theta)\ell_i(y)\\
&\le\theta h(x)+(1-\theta)h(y).
\end{aligned}$$

The inequality uses that $\theta$ and $1-\theta$ are non-negative. Taking the maximum over $i$ on the left side gives

$$h(\theta x+(1-\theta)y)\le\theta h(x)+(1-\theta)h(y),$$

which is the definition of convexity.

Step 2, each active set is an interval: since $h\ge\ell_i$ everywhere,

$$I_i=\{x : h(x)-\ell_i(x)\le0\}.$$

The function $h-\ell_i$ is convex (convex minus affine), and a sublevel set of a convex function is convex: if $x$ and $y$ lie in it, so does every point between them. On $\mathbb{R}$ the convex sets are intervals. Each $I_i$ is also closed, by continuity, and may be empty or a single point.

Step 3, the active sets cover the line: at every $x$ the maximum is attained by some $i$, so $\bigcup_i I_i=\mathbb{R}$.

Step 4, distinct lines overlap in at most one point: if $I_i\cap I_j$ contained two points, then $\ell_i$ and $\ell_j$ would agree at two different inputs. Two affine functions that agree at two points are identical, which contradicts distinctness. So distinct active sets share at most an endpoint.

Step 5, counting: discard the active sets that are empty or a single point. The remaining $p$ closed intervals, with $p\le k$, still cover $\mathbb{R}$: their union is closed and contains all of $\mathbb{R}$ except finitely many points, so it is all of $\mathbb{R}$. By Step 4 they meet only at endpoints, so in left-to-right order they partition $\mathbb{R}$ into $p$ consecutive intervals, and $h$ is affine on each. A maximal affine piece is a union of consecutive intervals of this partition, so $h$ has at most $p$ maximal pieces, and $p\le k$.

**In words.** Convexity means the slope of $h$ only grows from left to right. Once a line loses the maximum to a steeper line it never wins again, so every line owns at most one interval.

**Sanity check.** For $k=2$ with $\ell_1(x)=x$ and $\ell_2(x)=-x$ we get $h(x)=|x|$, which is convex with exactly $2$ pieces. Without the maximum structure, $k$ lines can cross up to $\binom{k}{2}$ times, so the convexity argument is really needed.

**What to write in the exam.**

- Each $\ell_i$ is affine, hence convex, and a pointwise maximum of convex functions is convex (two lines, using $\ell_i\le h$).
- The active set $I_i$ is a sublevel set of the convex function $h-\ell_i$, hence an interval.
- Distinct lines agree at most at one point, so the intervals meet only at endpoints and cover $\mathbb{R}$.
- So $h$ is affine on each of at most $k$ consecutive intervals: at most $k$ pieces.

*Verified: exact upper envelopes of 300 random units with $k\le7$ have at most $k$ pieces and a nondecreasing active slope, and midpoint convexity holds at random points (NumPy).*

**2. (10) Non-universality from the midpoint of $[0,1]$**

**What is asked.** A continuous target $f$ on $[0,1]$ and a constant $c>0$ such that no maxout unit of any width comes within $c$ of $f$ in sup norm. The answer is an explicit pair $(f,c)$ with a quantitative proof. Points: 3 for a strictly concave target and the convexity obstruction, 7 for the quantitative argument.

**Tool and why.** To refute universality it is enough to exhibit one target and one gap (cheat sheet §4). By part 1 every member of $\mathcal{M}$ is convex and therefore lies below its chords, while a strictly concave target lies above its chord by a fixed amount at the midpoint. That fixed amount becomes the constant $c$.

**Definitions.** The target is $f(x) := -x^2$, which is continuous, and $c := \tfrac18$. For a given $k$ and $h\in\mathcal{M}_k$ let

$$\epsilon := \sup_{x\in[0,1]}|f(x)-h(x)|$$

be the sup-norm error, the quantity we bound from below.

**Solution.**

Step 1, convexity at the midpoint: $h$ is convex by part 1, so with $\theta=\tfrac12$

$$h(\tfrac12)\le\tfrac{h(0)+h(1)}{2}.$$

Step 2, the left side from below: by definition of $\epsilon$, $h$ is within $\epsilon$ of $f$ at $\tfrac12$, and $f(\tfrac12)=-\tfrac14$, so

$$h(\tfrac12)\ge f(\tfrac12)-\epsilon=-\tfrac14-\epsilon.$$

Step 3, the right side from above: also by definition of $\epsilon$, $h(0)\le f(0)+\epsilon$ and $h(1)\le f(1)+\epsilon$. With $f(0)=0$ and $f(1)=-1$,

$$\tfrac{h(0)+h(1)}{2}\le\tfrac{f(0)+f(1)}{2}+\epsilon=-\tfrac12+\epsilon.$$

Step 4, combine: chaining Steps 2, 1 and 3,

$$\begin{aligned}
-\tfrac14-\epsilon&\le h(\tfrac12)\\
&\le\tfrac{h(0)+h(1)}{2}\\
&\le-\tfrac12+\epsilon.
\end{aligned}$$

Step 5, solve for $\epsilon$: moving the terms gives $2\epsilon\ge\tfrac14$, that is

$$\boxed{\epsilon\ge\tfrac18=c}$$

This holds for every $k$ and every $h\in\mathcal{M}_k$, so $\mathcal{M}$ is not universal.

**In words.** A convex function lies below its chords, while $-x^2$ bulges above its chord by $\tfrac14$ at the midpoint. Any convex approximation has to pay at least half of that gap at one of the three points $0,\tfrac12,1$.

**Sanity check.** The constant is tight: the line $h(x)=-x+\tfrac18$ lies in $\mathcal{M}_1$, and

$$f(x)-h(x)=\tfrac18-(x-\tfrac12)^2,$$

which ranges over $[-\tfrac18,\tfrac18]$ on $[0,1]$. So its sup error is exactly $\tfrac18$.

**What to write in the exam.**

- Take $f(x)=-x^2$ and $c=\tfrac18$, and let $\epsilon$ be the sup error of a given $h\in\mathcal{M}_k$.
- By part 1, $h$ is convex, so $h(\tfrac12)\le\tfrac{h(0)+h(1)}{2}$.
- Bounding both sides through $\epsilon$ gives $-\tfrac14-\epsilon\le-\tfrac12+\epsilon$.
- Hence $\epsilon\ge\tfrac18$ for every $k$ and every $h$.

*Verified: sympy gives $f(\tfrac12)-\tfrac{f(0)+f(1)}{2}=\tfrac14$ and the exact error $\tfrac18$ of the line $-x+\tfrac18$; the best of 2000 random maxout units has sup error $0.145$ (SymPy, NumPy).*

**3. (10) Every PWL function is a difference of two maxout units**

**What is asked.** Show that a piecewise linear $f$ with $m$ pieces lies in $\mathcal{D}_m$, then conclude that $\mathcal{D}$ is universal for $C([a,b])$ in sup norm. The answer is a construction plus a short density argument. Points: 4 for the ReLU representation, 3 for the converse of part 1 (a convex PWL function is the maximum of its pieces), 3 for universality.

**Tool and why.** The representation "affine plus a sum of ReLUs" (cheat sheet §5) writes $f$ through its slope jumps. Splitting the jumps by sign gives a convex part and a concave part, and every convex PWL function is the maximum of its own affine pieces. Universality then follows from the granted density of PWL functions (cheat sheet §4).

**Definitions.** Let $t_1,\dots,t_{m-1}$ be the breakpoints of $f$ in increasing order, and $c_i$ the slope of $f$ just right of $t_i$ minus the slope just left of it (the slope jump at $t_i$). Write $[z]_+ := \max\{z,0\}$. The upward bends go into

$$P(x) := ax+b+\sum_{i:\,c_i>0} c_i[x-t_i]_+$$

and the downward bends, with a positive sign, into

$$Q(x) := \sum_{i:\,c_i<0} (-c_i)[x-t_i]_+ .$$

Here $a$ is the slope of $f$ left of $t_1$ and $b$ is fixed in Step 1.

**Solution.**

Step 1, ReLU representation: choose $b$ so that the two sides below agree on $(-\infty,t_1]$. Then

$$f(x) = ax + b + \sum_{i=1}^{m-1} c_i [x - t_i]_+ .$$

Reason: both sides are continuous and affine between consecutive breakpoints, and they agree left of $t_1$. Crossing $t_i$, the slope of the right side jumps by exactly $c_i$, as does the slope of $f$. So they agree everywhere.

Step 2, split by sign: grouping the terms with $c_i>0$ and those with $c_i<0$ (terms with $c_i=0$ vanish) gives

$$f=P-Q.$$

Step 3, $P$ and $Q$ are convex PWL functions with at most $m$ pieces: each $[x-t_i]_+$ is convex, being a maximum of two affine functions. Positive multiples and sums of convex functions are convex, and adding $ax+b$ keeps convexity. The breakpoints of $P$ and $Q$ are among $t_1,\dots,t_{m-1}$, so each has at most $m$ pieces.

Step 4, the converse of part 1.

**Claim.** A convex PWL function $g$ whose pieces are given by the affine functions $\ell_1,\dots,\ell_p$ equals $\max_j \ell_j$.

Proof: fix $j$ and a point $x_0$ inside the $j$-th piece. There $g$ is differentiable with the slope of $\ell_j$, and a convex function lies above its tangent lines, so $g\ge\ell_j$ on all of $\mathbb{R}$. Hence $g\ge\max_j\ell_j$. Conversely, every $x$ lies in some piece $j$, where $g(x)=\ell_j(x)$. So equality holds everywhere.

Step 5, membership: by the claim $P$ is a maximum of at most $m$ affine functions. Repeating one of them until there are exactly $m$ does not change the maximum, so $P\in\mathcal{M}_m$. The same holds for $Q$; if no $c_i$ is negative, $Q$ is the zero function, the maximum of $m$ copies of $0$. Therefore $f=P-Q\in\mathcal{D}_m$.

Step 6, universality: let $g\in C([a,b])$ and $\epsilon>0$. By the granted fact there is a PWL function $\tilde f$ with $\sup_{[a,b]}|g-\tilde f|<\epsilon$. Extend $\tilde f$ outside $[a,b]$ by continuing its first and last pieces; it keeps some finite number $m$ of pieces. By Step 5, $\tilde f\in\mathcal{D}_m\subseteq\mathcal{D}$. Hence $\mathcal{D}$ is universal, with $m$ allowed to depend on $g$ and $\epsilon$, exactly as the definition of universality permits.

**In words.** A PWL function bends up at some breakpoints and down at others. Collect the upward bends into one convex function and the downward bends into another; each convex one is a maxout unit, so a difference of two units can bend both ways.

**Sanity check.** The tent $f(x)=\min\{x,1-x\}$ has $2$ pieces, slope $1$ then $-1$, so one jump $c_1=-2$ at $\tfrac12$. The construction gives $P(x)=x$ and $Q(x)=2[x-\tfrac12]_+$, that is $P=\max\{x,x\}$ and $Q=\max\{0,2x-1\}$, both in $\mathcal{M}_2$. At $x=1$ indeed $P-Q$ equals $1-1$, which is $f(1)$.

**What to write in the exam.**

- Write $f(x)=ax+b+\sum_i c_i[x-t_i]_+$ with $c_i$ the slope jumps.
- Put $ax+b$ and the terms with $c_i>0$ in $P$, and the terms with $c_i<0$, sign flipped, in $Q$; then $f=P-Q$.
- State and prove that a convex PWL function is the maximum of its affine pieces (tangent-line argument), so $P,Q\in\mathcal{M}_m$.
- PWL functions are dense in $C([a,b])$ and all lie in $\mathcal{D}$, so $\mathcal{D}$ is universal.

*Verified: for 300 random PWL functions with up to $8$ pieces, $f=P-Q$ and both $P$ and $Q$ equal the maximum of at most $m$ affine pieces on a fine grid (NumPy).*

**4. (10) Sawtooth lower bound and depth separation**

**What is asked.** If $g_L=h_1-h_2$ on $[0,1]$ with $h_1\in\mathcal{M}_{k_1}$ and $h_2\in\mathcal{M}_{k_2}$, prove $k_1+k_2\ge2^L+1$, then interpret the result. The answer is a counting proof and one or two sentences. Points: 6 for the breakpoint count, 2 for using the $2^L$ pieces, 2 for the conclusion.

**Tool and why.** Breakpoint counting (cheat sheet §5): a difference of two functions can bend only where one of them bends. Part 1 bounds the breakpoints of each unit, and the sawtooth has many breakpoints.

**Definitions.** A *breakpoint* of a PWL function is a point at which the function is not affine on any neighbourhood. A function with $p$ pieces on an interval has exactly $p-1$ breakpoints inside it.

**Solution.**

Step 1, breakpoints of each unit: by part 1, $h_i$ has at most $k_i$ pieces on $\mathbb{R}$, hence at most $k_i-1$ breakpoints.

Step 2, breakpoints of the difference: if neither $h_1$ nor $h_2$ has a breakpoint at $x$, both are affine on a neighbourhood of $x$, and so is $h_1-h_2$. Hence every breakpoint of $h_1-h_2$ is a breakpoint of $h_1$ or of $h_2$, and the number of breakpoints of $h_1-h_2$ is at most

$$(k_1-1)+(k_2-1)=k_1+k_2-2.$$

Step 3, breakpoints of the sawtooth: $g_L$ has $2^L$ pieces on $[0,1]$, hence $2^L-1$ breakpoints in $(0,1)$. Since $g_L=h_1-h_2$ on $[0,1]$, these are breakpoints of $h_1-h_2$, so

$$2^L-1\le k_1+k_2-2.$$

Adding $2$ to both sides:

$$\boxed{k_1+k_2\ge2^L+1}$$

Step 4, conclusion: the widths are integers, so the larger of $k_1$ and $k_2$ is at least $2^{L-1}+1$. A difference of two maxout units therefore needs width exponential in $L$ to express $g_L$, while a ReLU network expresses it with $O(L)$ layers of constant width. This is a depth separation: depth buys an exponential saving in width.

**In words.** A maxout unit can bend only as many times as it has lines, and subtracting two units creates no new bends. The sawtooth bends $2^L-1$ times, so the lines have to be paid for one by one.

**Sanity check.** The bound is tight. Applying part 3 to $g_L$: its slopes alternate between $2^L$ and $-2^L$, so its $2^L-1$ slope jumps split into $2^{L-1}$ negative and $2^{L-1}-1$ positive ones. The construction gives $k_1=2^{L-1}$ and $k_2=2^{L-1}+1$, whose sum is exactly $2^L+1$. For the tent, $L=1$, this is $k_1=1$ and $k_2=2$.

**What to write in the exam.**

- By part 1, $h_i$ has at most $k_i-1$ breakpoints, and $h_1-h_2$ bends only where $h_1$ or $h_2$ bends.
- So $h_1-h_2$ has at most $k_1+k_2-2$ breakpoints, while $g_L$ has $2^L-1$ of them in $(0,1)$.
- Hence $k_1+k_2\ge2^L+1$.
- Conclusion: maxout differences need width exponential in $L$, while ReLU nets need only depth $O(L)$ with constant width, a depth separation.

*Verified: for $L$ from $1$ to $7$ the iterated tent has $2^L$ pieces, and the part-3 split gives $k_1+k_2=2^L+1$ exactly (NumPy).*

**Common mistakes.**

- Arguing "$k$ lines give at most $k$ pieces" without convexity. Arbitrary lines can cross $\binom{k}{2}$ times, and the rubric deducts 3 points in part 1 for this.
- In part 3, assuming that a convex PWL function lies in $\mathcal{M}_m$ without proving that it is the maximum of its pieces.
- In part 4, comparing pieces instead of breakpoints, which gives only $k_1+k_2\ge2^L$ and loses the $+1$.

**💡 Useful tricks:** Max-of-affines cue: pointwise max of convex functions is convex; order active pieces by slope to count them; prove approximation lower bounds via midpoint convexity $h(1/2)\le\frac{h(0)+h(1)}{2}$ on concave targets; decompose any PWL as $ax+b+\sum_i c_i[x-t_i]_+$ (Lecture 2).

**⚠️ Watch out:** "$k$ lines give $k$ pieces" fails without convexity — lines cross up to $\binom{k}{2}$ times; prove, don't assume, that a convex PWL is a max of its affine pieces; make the $\epsilon\ge\tfrac18$ argument quantitative; state the exponential-width conclusion explicitly.

## Q2 — Asymmetric rank-1 factorization (35)

**Full solution:**

**1. (7) $L$ is not convex**

**What is asked.** Show that $L$, as a function of the pair $(u,v)$, is not convex. The answer is a proof: a critical point that is not a global minimum. Points: 7; an explicit violation of the chord inequality along a line is also full credit.

**Tool and why.** The reminder says that for a differentiable convex function every critical point is a global minimum (cheat sheet §7). Its contrapositive certifies non-convexity. The origin is critical because every non-constant term of $L$ has degree at least $2$, yet a small step along the top singular direction of $M$ lowers the loss.

**Definitions.** Let $(\sigma_1,p,q)$ be the top singular triplet of $M$: unit vectors $p$ and $q$ with $p^\top Mq=\sigma_1$, where $\sigma_1>0$ because $M\neq0$. For $\epsilon>0$ we test the point $(\sqrt\epsilon\,p,\sqrt\epsilon\,q)$, chosen so that $uv^\top=\epsilon\,pq^\top$.

**Solution.**

Step 1, expand the loss: write $\|A\|_F^2=\langle A,A\rangle$ and use two entrywise identities, $\langle uv^\top,M\rangle=u^\top Mv$ and $\|uv^\top\|_F^2=\|u\|^2\|v\|^2$. Then

$$L(u,v)=\tfrac12\|M\|_F^2-u^\top Mv+\tfrac12\|u\|^2\|v\|^2.$$

Step 2, the origin is critical: the term $u^\top Mv$ is bilinear and the last term has degree $4$, so every non-constant term is a product of at least two coordinates of $(u,v)$. Every partial derivative of such a term vanishes at $(0,0)$, so $\nabla L(0,0)=0$. The value there is $L(0,0)=\tfrac12\|M\|_F^2$.

Step 3, a better point: substitute $u=\sqrt\epsilon\,p$ and $v=\sqrt\epsilon\,q$ into Step 1. Since $p$ and $q$ are unit vectors and $p^\top Mq=\sigma_1$,

$$\begin{aligned}
L(\sqrt\epsilon\,p,\sqrt\epsilon\,q)&=\tfrac12\|M\|_F^2-\epsilon\,p^\top Mq+\tfrac12\epsilon^2\\
&=\tfrac12\|M\|_F^2-\epsilon\sigma_1+\tfrac12\epsilon^2\\
&=L(0,0)-\tfrac12\epsilon\,(2\sigma_1-\epsilon).
\end{aligned}$$

Step 4, the drop is positive: for every $\epsilon$ in $(0,2\sigma_1)$ both factors $\epsilon$ and $2\sigma_1-\epsilon$ are positive, so

$$L(\sqrt\epsilon\,p,\sqrt\epsilon\,q)<L(0,0).$$

Step 5, conclusion: $(0,0)$ is a critical point but not a global minimum. If $L$ were convex, this would contradict the reminder; so $L$ is not convex.

**In words.** At the origin the product $uv^\top$ cannot move to first order, so the gradient vanishes. A second-order move along the best rank-1 direction of $M$ already pays off.

**Sanity check.** Take $d=2$ and $M=\mathrm{diag}(1,0)$, so $\sigma_1=1$ and $p$, $q$ are both $e_1$. With $\epsilon=1$ the formula of Step 3 gives $\tfrac12-1+\tfrac12$, which is $0$, and indeed $uv^\top$ equals $M$ there; meanwhile $L(0,0)=\tfrac12$.

**What to write in the exam.**

- Expand $L$ into $\tfrac12\|M\|_F^2$, $-u^\top Mv$ and $\tfrac12\|u\|^2\|v\|^2$; every non-constant term has degree at least $2$, so $\nabla L(0,0)=0$.
- With the top singular triplet $(\sigma_1,p,q)$, the point $(\sqrt\epsilon p,\sqrt\epsilon q)$ lowers the loss by $\epsilon\sigma_1-\tfrac12\epsilon^2$, positive for small $\epsilon>0$.
- A critical point that is not a global minimum contradicts the reminder, so $L$ is not convex.

*Verified: for 200 random $4\times4$ matrices the loss at $(\sqrt\epsilon p,\sqrt\epsilon q)$ matches the formula of Step 3 and lies below $L(0,0)$ for $\epsilon$ up to $1.9\sigma_1$ (NumPy).*

**2. (10) Deriving the gradient flow equations**

**What is asked.** Derive the two ODEs of the flow, that is, compute $\nabla_u L$ and $\nabla_v L$. The answer is a derivation. Points: 10; full marks require an actual derivation (index computation or directional derivative), not a quoted formula.

**Tool and why.** Directional derivative of the expanded loss (cheat sheet §7): perturb $u$, keep the part that is linear in the perturbation, and read off the gradient as the vector that pairs with it. The expansion from part 1 makes this short, because for fixed $v$ the loss is a quadratic polynomial in $u$.

**Definitions.** For a perturbation $\delta u\in\mathbb{R}^d$, the directional derivative $D_uL[\delta u]$ is the part of $L(u+\delta u,v)-L(u,v)$ that is linear in $\delta u$. The gradient $\nabla_uL$ is the unique vector with $D_uL[\delta u]=\langle\nabla_uL,\delta u\rangle$ for every $\delta u$. The same definitions apply to $v$.

**Solution.**

Step 1, expand, as in part 1:

$$L(u,v)=\tfrac12\|M\|_F^2-u^\top Mv+\tfrac12(u^\top u)(v^\top v).$$

Step 2, perturb $u$: replace $u$ by $u+\delta u$ in each term.

- The constant term does not change.
- The bilinear term becomes $-u^\top Mv-\delta u^\top Mv$.
- The last term becomes $\tfrac12(v^\top v)$ times $(u+\delta u)^\top(u+\delta u)$, and the second factor expands to $u^\top u+2\delta u^\top u+\delta u^\top\delta u$.

Step 3, keep the linear part: dropping the quadratic term $\delta u^\top\delta u$,

$$D_uL[\delta u]=\delta u^\top\big((v^\top v)\,u-Mv\big),$$

so $\nabla_uL=(v^\top v)\,u-Mv$.

Step 4, the same for $v$: first rewrite the bilinear term as $v^\top M^\top u$, the transpose of the scalar $u^\top Mv$. Perturbing $v$, the linear part is $-\delta v^\top M^\top u$ from this term and $(u^\top u)\,\delta v^\top v$ from the last term, so

$$\nabla_vL=(u^\top u)\,v-M^\top u.$$

Step 5, the flow: $\dot u=-\nabla_uL$ and $\dot v=-\nabla_vL$, so

$$\dot u=-(v^\top v)\,u+Mv,\qquad \dot v=-(u^\top u)\,v+M^\top u.$$

Step 6, compact form: since $(v^\top v)\,u=uv^\top v$, the gradients also read $(uv^\top-M)\,v$ and $(uv^\top-M)^\top u$, the residual times the other factor.

**In words.** Each factor is pulled towards the best response to the other one, $Mv$ or $M^\top u$, and shrunk in proportion to the squared norm of the other factor.

**Sanity check.** In the scalar case $L=\tfrac12(uv-m)^2$, the chain rule gives $\partial_uL=(uv-m)\,v$, which equals $v^2u-mv$, the formula of Step 3 with $d=1$.

**What to write in the exam.**

- Expand $L$ as in part 1, with the last term written as $\tfrac12(u^\top u)(v^\top v)$.
- Perturb $u$ by $\delta u$; the linear part is $\delta u^\top\big((v^\top v)u-Mv\big)$, so $\nabla_uL=(v^\top v)u-Mv$.
- Symmetrically $\nabla_vL=(u^\top u)v-M^\top u$, using $u^\top Mv=v^\top M^\top u$.
- Negate both gradients to get the flow.

*Verified: symbolic differentiation of $L$ for $d=3$ with a symbolic $M$ reproduces the expansion and both gradients (SymPy).*

**3. (8) Conservation of the imbalance**

**What is asked.** Prove that $\|u(t)\|^2-\|v(t)\|^2$ does not change along the flow. The answer is a proof. Points: 8.

**Tool and why.** Balancedness conservation (cheat sheet §8, Lecture 4): differentiate each squared norm by the chain rule and substitute the flow. The two interaction terms coincide because a scalar equals its transpose.

**Definitions.** No new notation.

**Solution.**

Step 1, chain rule: $\tfrac{d}{dt}\|u\|^2=2u^\top\dot u$ and $\tfrac{d}{dt}\|v\|^2=2v^\top\dot v$.

Step 2, substitute the flow from part 2:

$$\begin{aligned}
2u^\top\dot u&=2u^\top\big(-(v^\top v)\,u+Mv\big)\\
&=-2(u^\top u)(v^\top v)+2u^\top Mv,
\end{aligned}$$

$$\begin{aligned}
2v^\top\dot v&=2v^\top\big(-(u^\top u)\,v+M^\top u\big)\\
&=-2(u^\top u)(v^\top v)+2v^\top M^\top u.
\end{aligned}$$

Step 3, subtract: the first terms cancel, so

$$\tfrac{d}{dt}\big(\|u\|^2-\|v\|^2\big)=2\big(u^\top Mv-v^\top M^\top u\big)=0,$$

because $v^\top M^\top u$ is the transpose of the scalar $u^\top Mv$.

Step 4, conclusion: a function with zero derivative on an interval is constant, so for all $t$

$$\|u(t)\|^2-\|v(t)\|^2=\|u(0)\|^2-\|v(0)\|^2.$$

**In words.** The flow treats $u$ and $v$ symmetrically: whatever the interaction term feeds into $\|u\|^2$, it feeds equally into $\|v\|^2$. This is the rank-1 case of the conserved $W_2^\top W_2-W_1W_1^\top$, with $W_2=u$ and $W_1=v^\top$.

**Sanity check.** In part 4 the solution is $u=ax$ and $v=ay$ with unit $x$ and $y$, so the imbalance is $a^2-a^2$ at every time, constantly $0$, as this part predicts.

**What to write in the exam.**

- Chain rule: $\tfrac{d}{dt}\|u\|^2=2u^\top\dot u$, and likewise for $v$.
- Substituting, both equal $-2(u^\top u)(v^\top v)$ plus $2u^\top Mv$ or $2v^\top M^\top u$ respectively.
- These scalars are transposes of each other, so the difference has zero derivative.

*Verified: sympy gives an identically zero derivative for $d=3$, and numerical integration of the flow for a random $4\times4$ matrix keeps the imbalance constant to within $2\cdot10^{-13}$ on $[0,30]$ (SymPy, SciPy).*

**4. (10) The aligned rank-1 solution and its convergence**

**What is asked.** For $M=\lambda xy^\top$ and the aligned initialization: show that the ansatz solves the flow, prove that $a(t)^2$ increases to $\lambda$, and conclude that the loss tends to $0$. The answer is a proof. Points: 4 for the ansatz, 4 for convergence, 2 for the conclusion.

**Tool and why.** Guess-and-verify plus uniqueness of ODE solutions (cheat sheet §8): if a guessed curve satisfies the ODE and the initial condition, uniqueness makes it *the* solution. The scalar ODE is then handled by monotone-and-bounded convergence, with the equilibria $0$ and $\sqrt\lambda$ acting as barriers.

**Definitions.** $a(t)$ is the solution of the scalar problem $\dot a=\lambda a-a^3$ with $a(0)=\alpha$. For the sanity check we also write $b(t):=a(t)^2$.

**Solution.**

Step 1, plug the ansatz into the $u$-equation: put $u=ax$ and $v=ay$, with $x$ and $y$ unit vectors.

- First, $v^\top v=a^2$ because $y^\top y=1$.
- Second, $Mv=\lambda a\,x$, because $My$ equals $\lambda x\,(y^\top y)$, that is $\lambda x$.

So the right side of the $u$-equation is

$$-(v^\top v)\,u+Mv=-a^3x+\lambda a\,x=(\lambda a-a^3)\,x,$$

while the left side is $\dot u=\dot a\,x$. They agree exactly when $\dot a=\lambda a-a^3$.

Step 2, the $v$-equation: in the same way $u^\top u=a^2$ and $M^\top u=\lambda a\,y$, so

$$-(u^\top u)\,v+M^\top u=(\lambda a-a^3)\,y=\dot a\,y=\dot v.$$

Step 3, uniqueness: at $t=0$ the ansatz gives $u(0)=\alpha x$ and $v(0)=\alpha y$, the prescribed initialization. So the pair $(ax,ay)$ solves the flow with the right initial values, and by the assumed uniqueness it is the solution. The scalar solution exists for all $t$ because, by Step 4, it stays in a bounded interval.

Step 4, $a$ stays strictly between the equilibria: the constants $0$ and $\sqrt\lambda$ solve $\dot a=\lambda a-a^3$. Its right side is a polynomial, hence locally Lipschitz, so two scalar solutions can never meet. Since $a(0)=\alpha$ lies strictly between $0$ and $\sqrt\lambda$, for every $t\ge0$

$$0<a(t)<\sqrt\lambda.$$

Step 5, monotone increase: on that interval both factors of $a(\lambda-a^2)$ are positive, so

$$\dot a=a(\lambda-a^2)>0.$$

Hence $a$ is strictly increasing, and so is $a^2$, because $a>0$.

Step 6, the limit: $a$ is increasing and bounded by $\sqrt\lambda$, so it converges to a limit $a_\infty$ with

$$\alpha<a_\infty\le\sqrt\lambda.$$

Suppose $a_\infty<\sqrt\lambda$. The function $a(\lambda-a^2)$ is continuous and positive on the closed interval $[\alpha,a_\infty]$, so it has a positive minimum $m$ there. All values $a(t)$ lie in this interval, so $\dot a\ge m$ and $a(t)\ge\alpha+mt$, which tends to infinity, a contradiction. Hence $a_\infty=\sqrt\lambda$, and $a(t)^2$ increases monotonically to $\lambda$.

Step 7, the loss: the residual is $uv^\top-M=(a^2-\lambda)\,xy^\top$, and $\|x\|$ and $\|y\|$ equal $1$, so

$$\begin{aligned}
L(u(t),v(t))&=\tfrac12\|(a^2-\lambda)\,xy^\top\|_F^2\\
&=\tfrac12(\lambda-a^2)^2\,\|x\|^2\|y\|^2\\
&=\tfrac12\big(\lambda-a(t)^2\big)^2\to0.
\end{aligned}$$

**In words.** Starting aligned with $M$, the flow never leaves the directions $x$ and $y$; only the scale $a$ moves, growing from $\alpha$ until $a^2$ matches the singular value $\lambda$.

**Sanity check.** With $b=a^2$ the ODE becomes the logistic equation $\dot b=2\lambda b-2b^2$, whose solution is

$$b(t)=\frac{\lambda}{1+(\lambda/\alpha^2-1)\,e^{-2\lambda t}}.$$

It increases from $\alpha^2$ to $\lambda$, matching Steps 5 and 6. The imbalance $a^2-a^2$ is $0$, as part 3 requires.

**What to write in the exam.**

- Ansatz: $v^\top v=a^2$ and $Mv=\lambda a\,x$, so the $u$-equation reduces to $\dot a=\lambda a-a^3$; the same holds for $v$, and by uniqueness the ansatz is the solution.
- Equilibria $0$ and $\sqrt\lambda$ cannot be crossed, so $a$ stays in $(0,\sqrt\lambda)$ and $\dot a=a(\lambda-a^2)$ is positive.
- Monotone and bounded, so $a\to a_\infty$; the limit must be an equilibrium, and $a_\infty\ge\alpha$ rules out $0$, so $a^2\to\lambda$.
- Then $L$ equals $\tfrac12(\lambda-a^2)^2$, which tends to $0$.

*Verified: sympy confirms that the logistic formula solves $\dot a=\lambda a-a^3$ with $a(0)=\alpha$; integrating the full flow with $\lambda=2$, $\alpha=0.1$ and $d=4$ matches $a(t)x$ to $10^{-11}$, and the loss falls from $1.98$ to about $10^{-24}$ by $t=20$ (SymPy, SciPy).*

**Common mistakes.**

- In part 1, showing only that the origin is critical. Some other point must beat it, otherwise nothing contradicts convexity.
- In part 2, quoting the gradient formula without a derivation; the rubric gives no credit for that.
- In part 4, skipping uniqueness, so the ansatz is only some curve satisfying the ODE, or forgetting to rule out the limit $a_\infty=0$.

**💡 Useful tricks:** Non-convexity from a critical point $(0,0)$ undercut by the top singular triplet; derive gradients by the directional derivative $\langle uv^\top-M,\delta u\,v^\top\rangle$; imbalance $\|u\|^2-\|v\|^2$ is conserved (scalar-transpose $u^\top Mv=v^\top M^\top u$); an aligned rank-1 ansatz $u=ax$, $v=ay$ collapses the flow to the scalar $\dot a=\lambda a-a^3$, and monotone+bounded ⇒ $a^2\to\lambda$.

**⚠️ Watch out:** (1) exhibit a strictly-*better* point, not merely a critical one; (2) full marks need an actual derivation, not a quoted gradient; (4) invoke ODE uniqueness so the ansatz IS the solution, and rule out $a_\infty=0$ using that $a$ increases from $\alpha>0$.

## Q3 — Ternary sparse predictors (30)

**Full solution:**

**1. (8) Finite-class bound for ternary weights**

**What is asked.** A bound on the gap $L_D(h)-L_S(h)$ that holds for all $h\in\mathcal{H}$ at once, with probability at least $1-\delta$. The answer is a proof. Points: 2 for the class size, 3 for Hoeffding with the right $\epsilon$, 3 for the union bound.

**Tool and why.** The finite-class recipe (cheat sheet §2 and §10): Hoeffding for one fixed hypothesis, a union bound over the class, then solve for $\epsilon$. It fits because $\mathcal{H}$ is finite and the loss is bounded in $[0,1]$.

**Definitions.** The target gap is

$$\epsilon:=\sqrt{\frac{d\ln3+\ln(2/\delta)}{2N}}.$$

For a fixed $h$, the bad event $B_h$ is the event that $|L_S(h)-L_D(h)|\ge\epsilon$. We name it because the union bound adds up these events.

**Solution.**

Step 1, size of the class: every $h\in\mathcal{H}$ is $h_w$ for some $w\in\{-1,0,1\}^d$, and there are $3^d$ such vectors. The map from $w$ to $h_w$ is onto (different $w$ may give the same function), so $|\mathcal{H}|\le3^d$.

Step 2, Hoeffding for a fixed $h$: put $A_n:=\ell(h(x_n),y_n)$. These are i.i.d. because the samples are and $h$ is fixed before sampling, they lie in $[0,1]$ because the loss does, and their mean is $L_D(h)$; their average is $L_S(h)$. Hoeffding gives $P(B_h)\le2e^{-2N\epsilon^2}$.

Step 3, plug in $\epsilon$: by its definition $2N\epsilon^2=d\ln3+\ln(2/\delta)$, so

$$\begin{aligned}
P(B_h)&\le2\exp\big(-d\ln3-\ln(2/\delta)\big)\\
&=2\cdot3^{-d}\cdot\tfrac{\delta}{2}\\
&=\delta\,3^{-d}.
\end{aligned}$$

Step 4, union bound: the probability that at least one $h$ is bad is at most the sum of the individual probabilities,

$$P\Big(\bigcup_{h\in\mathcal{H}}B_h\Big)\le|\mathcal{H}|\cdot\delta\,3^{-d}\le\delta.$$

Step 5, complement: with probability at least $1-\delta$ no $h$ is bad, so $|L_D(h)-L_S(h)|<\epsilon$ for every $h$. In particular

$$\forall h\in\mathcal{H}:\quad L_D(h)-L_S(h)\le\sqrt{\frac{d\ln3+\ln(2/\delta)}{2N}}.$$

**In words.** Each hypothesis is fooled by the sample with probability $\delta3^{-d}$, and there are at most $3^d$ hypotheses, so all of them together are fooled with probability at most $\delta$. The price is $d\ln3$, the logarithm of the class size.

**Sanity check.** With $d=20$, $N=10^4$ and $\delta=0.05$ the bound is about $0.036$. A Monte-Carlo run on a tiny instance with $d=3$, $N=100$ and $\delta=0.1$ violated the uniform bound in $0.35\%$ of 4000 samples, well below $\delta$.

**What to write in the exam.**

- Counting: $|\mathcal{H}|\le3^d$, because $w\mapsto h_w$ is onto.
- For fixed $h$ the losses are i.i.d. in $[0,1]$ with mean $L_D(h)$; Hoeffding gives failure probability $2e^{-2N\epsilon^2}$, which is $\delta3^{-d}$ for the stated $\epsilon$.
- Union bound over at most $3^d$ hypotheses: total failure probability at most $\delta$.

*Verified: sympy simplifies $2e^{-2N\epsilon^2}$ to $\delta3^{-d}$ for the stated $\epsilon$, and a 4000-trial simulation on a class of $27$ ternary predictors stays below $\delta$ (SymPy, NumPy).*

**2. (10) Counting sparse ternary vectors**

**What is asked.** Prove $|\mathcal{H}_k|\le(2d+1)^k$ and deduce the bound for a fixed $k$. The answer is a proof. Points: 5 for the counting, 5 for the bound.

**Tool and why.** Counting by encoding (cheat sheet §10): give every sparse $w$ a code word of length $k$ over an alphabet of $2d+1$ letters. If decoding is onto, the class is no larger than the set of words. Then part 1 is repeated with the new class size.

**Definitions.** The alphabet is

$$\Sigma:=\{(i,s): i\in[d],\ s\in\{\pm1\}\}\cup\{\mathrm{null}\},$$

with $2d+1$ letters. A letter $(i,s)$ means "coordinate $i$ equals $s$", and $\mathrm{null}$ means "nothing". Decoding sends a word in $\Sigma^k$ to the vector $w$ whose coordinate $i$ equals $s$ if $(i,s)$ is the first letter mentioning $i$, and $0$ if no letter mentions $i$.

**Solution.**

Step 1, decoding reaches every sparse vector: let $w$ have at most $k$ nonzero coordinates. List them as letters $(i,w_i)$ in increasing order of $i$ and pad with $\mathrm{null}$ to length $k$. Decoding this word returns $w$.

Step 2, count: there are $(2d+1)^k$ words and every $w$ with $\|w\|_0\le k$ is the image of at least one of them, so there are at most $(2d+1)^k$ such vectors. Every $h\in\mathcal{H}_k$ is $h_w$ for one of them, hence

$$|\mathcal{H}_k|\le(2d+1)^k.$$

Step 3, an exact-count route, also accepted: there are $\sum_{j=0}^{k}\binom{d}{j}2^j$ such vectors (choose the support of size $j$, then the signs). For $j\le k$,

$$\binom{d}{j}\le\frac{d^j}{j!}\le\binom{k}{j}\,d^j,$$

because $\binom{k}{j}$ is at least $1$ and $\frac{1}{j!}$ is at most $1$. Summing and using the binomial theorem,

$$\sum_{j=0}^{k}\binom{d}{j}2^j\le\sum_{j=0}^{k}\binom{k}{j}(2d)^j=(2d+1)^k.$$

Step 4, the bound: repeat part 1 with $3^d$ replaced by $(2d+1)^k$. Set

$$\epsilon_k:=\sqrt{\frac{k\ln(2d+1)+\ln(2/\delta)}{2N}}.$$

Each fixed $h$ fails with probability at most $2e^{-2N\epsilon_k^2}$, which equals $\delta(2d+1)^{-k}$. The union over at most $(2d+1)^k$ hypotheses gives total failure probability at most $\delta$, so with probability at least $1-\delta$

$$\forall h\in\mathcal{H}_k:\quad L_D(h)-L_S(h)\le\sqrt{\frac{k\ln(2d+1)+\ln(2/\delta)}{2N}}.$$

**In words.** A $k$-sparse ternary vector is described by $k$ choices of "which coordinate and which sign", each with about $2d$ options. So $k\ln(2d+1)$ replaces the $d\ln3$ of part 1, far smaller when $k$ is much smaller than $d$.

**Sanity check.** For $k=0$ the class holds only the zero predictor and the bound $(2d+1)^0$ is $1$, exact. For $d=2$ and $k=1$ the exact count is $1+2\cdot2$, which is $5$, equal to $2d+1$. For $d=3$ and $k=2$ the exact count is $19$ against the bound $49$.

**What to write in the exam.**

- Encode each $w$ with $\|w\|_0\le k$ as a word of length $k$ over the $2d+1$ letters $(i,\pm1)$ and $\mathrm{null}$; decoding is onto.
- Hence $|\mathcal{H}_k|\le(2d+1)^k$.
- Same Hoeffding and union bound as part 1, with $k\ln(2d+1)$ in place of $d\ln3$.

*Verified: the exact counts $\sum_j\binom{d}{j}2^j$ are at most $(2d+1)^k$ for all $d\le24$ and $k\le d$, as is the termwise bound of Step 3 (Python integers).*

**3. (7) A bound simultaneous over all sparsity levels**

**What is asked.** One bound $\Delta(N,\delta,k)$ valid for all $k$ at once with probability at least $1-\delta$, increasing in $k$ and tending to $0$ as $N\to\infty$. The answer is an explicit formula with a proof. Points: 7; both properties of $\Delta$ must be stated.

**Tool and why.** The SRM weighted union bound (cheat sheet §2): spend a confidence budget $\delta_k$ on level $k$, with budgets summing to at most $\delta$, apply part 2 at that level, and take a union over $k$. The budget shrinks with $k$, which adds a penalty that grows with $k$.

**Definitions.** The confidence budget of level $k$ is $\delta_k:=\delta\,2^{-(k+1)}$, for $k$ from $0$ to $d$. Any schedule summing to at most $\delta$ works, for example $\frac{\delta}{(k+1)(k+2)}$.

**Solution.**

Step 1, total budget: a geometric sum,

$$\sum_{k=0}^{d}\delta_k=\delta\big(1-2^{-(d+1)}\big)\le\delta.$$

Step 2, part 2 at level $\delta_k$: the logarithmic term becomes

$$\ln(2/\delta_k)=\ln(2/\delta)+(k+1)\ln2.$$

So for each fixed $k$, the event that some $h\in\mathcal{H}_k$ has a gap above

$$\boxed{\Delta(N,\delta,k)=\sqrt{\frac{k\ln(2d+1)+(k+1)\ln2+\ln(2/\delta)}{2N}}}$$

has probability at most $\delta_k$.

Step 3, union over $k$: the probability that some level fails is at most $\sum_k\delta_k$, which is at most $\delta$ by Step 1. So with probability at least $1-\delta$,

$$\forall k,\ \forall h\in\mathcal{H}_k:\quad L_D(h)-L_S(h)\le\Delta(N,\delta,k).$$

Step 4, the two required properties: each unit of $k$ adds $\ln(2d+1)+\ln2$ to the numerator, a positive amount, so $\Delta$ is strictly increasing in $k$. For fixed $k$ and $\delta$ the numerator is constant while the denominator $2N$ grows, so $\Delta\to0$ as $N\to\infty$.

**In words.** Each sparsity level pays for its own share of the failure probability. Sparse levels get large shares and pay little, so the bound rewards sparse hypotheses: the SRM pattern of Lecture 6 and of Q3 in the 2024 exams.

**Sanity check.** Compared with part 2 at one fixed $k$, the only extra cost is $(k+1)\ln2$ in the numerator. For $d=10^6$, $N=10^4$, $\delta=0.05$ and $k=10$ the bound moves only from $0.0862$ to $0.0884$.

**What to write in the exam.**

- Budget $\delta_k=\delta2^{-(k+1)}$, so $\sum_k\delta_k\le\delta$.
- Apply part 2 at level $\delta_k$, where $\ln(2/\delta_k)$ equals $\ln(2/\delta)+(k+1)\ln2$, and take a union over $k$.
- State $\Delta$ explicitly and note that it is increasing in $k$ and tends to $0$ as $N\to\infty$.

*Verified: exact fractions give a total budget of $\tfrac{2097151}{2097152}\delta$ for $d=20$; sympy sums the alternative schedule $\frac{1}{(k+1)(k+2)}$ to $1$; the values of $\Delta$ were computed in Python.*

**4. (5) Why the sparse bound can explain generalization**

**What is asked.** In at most five sentences: when is the bound of part 3 meaningful for $d\gg N$, and why does that resolve the apparent contradiction with the vacuous bound of part 1. The answer is an explanation. Full credit needs: (i) the bound depends on the sparsity of the returned $h$; (ii) simultaneity over $k$ is what makes this legitimate; (iii) explicit use of implicit regularization.

**Tool and why.** The implicit-regularization narrative (cheat sheet §12) together with the non-uniform bound of part 3 (cheat sheet §2). The algorithm, not the class, picks a simple hypothesis, and the bound charges only for the simplicity of the hypothesis actually returned.

**Definitions.** Let $\hat h=h_{\hat w}$ be the hypothesis returned by training, and $\hat k:=\|\hat w\|_0$ its number of nonzero weights. The level $\hat k$ depends on the sample, which is why part 2 alone is not enough.

**Solution.**

Step 1, part 1 is vacuous: with $d\gg N$ the term $d\ln3$ dominates. For example $d=10^6$, $N=10^4$ and $\delta=0.05$ give a bound of $7.4$, useless for a loss in $[0,1]$.

Step 2, implicit regularization: gradient-based training does not return an arbitrary member of $\mathcal{H}$. If its implicit bias favours sparse solutions, in the way the min-norm and low-rank biases from class favour simple solutions, then $\hat k\ll d$.

Step 3, apply part 3 to $\hat h$: part 3 holds for all $k$ simultaneously, so we may plug in the data-dependent level $\hat k$ after training, without fixing it in advance. With the numbers of Step 1 and $\hat k=10$ we get $\Delta\approx0.088$.

Step 4, resolution: uniform convergence over all of $\mathcal{H}$ fails, but it is not needed. Generalization is a property of the algorithm together with the class: the bound adapts to the hypothesis that the algorithm actually returns, as in the Zhang et al. narrative of Lectures 6–7. A small test loss still requires a small $L_S(\hat h)$, because the bound controls only the gap.

**In words.** A huge class is harmless if the learner only ever visits a tiny, simple corner of it, and the bound is allowed to look at which corner was visited.

**Sanity check.** If training returned a dense $\hat w$ with $\hat k$ equal to $d$, then $\Delta$ would exceed the part-1 bound, because $\ln(2d+1)$ exceeds $\ln3$; nothing would be gained. The explanation really rests on the bias toward sparsity: for $\hat k=1$ the bound is $0.031$, for $\hat k=100$ it is $0.276$.

**What to write in the exam.**

- Uniform convergence over all of $\mathcal{H}$ is vacuous for $d\gg N$, but GD does not return an arbitrary $h$.
- Its implicit regularization biases it toward sparse solutions, so the returned $\hat h$ has a small $\hat k$.
- Part 3 holds for all $k$ simultaneously, so it applies to the data-dependent $\hat k$ and gives a small gap.
- Generalization is a property of the algorithm together with the class; a small $L_S(\hat h)$ is still needed for a small $L_D(\hat h)$.

*Verified: for $d=10^6$, $N=10^4$ and $\delta=0.05$ the part-1 bound is $7.41$, and the part-3 bound is $0.031$, $0.088$ and $0.276$ for $k$ equal to $1$, $10$ and $100$ (Python).*

**Common mistakes.**

- Inverting Hoeffding wrongly, for example writing $\ln d$ instead of $d\ln3$, or dropping the factor $2$ inside $\ln(2/\delta)$.
- Applying Hoeffding directly to the trained hypothesis. It depends on the sample, so only the union bound over a class fixed in advance is valid.
- In part 3, using a schedule whose budgets sum to more than $\delta$, or plugging the data-dependent $\hat k$ into the fixed-$k$ bound of part 2.

**💡 Useful tricks:** Ternary weights ⇒ $|\mathcal H|\leq3^d$; sparse count $|\mathcal H_k|\leq(2d+1)^k$ via (position, sign, null) tuples — cleaner than binomials; SRM split $\delta_k=\delta2^{-(k+1)}$ makes the bound prefer sparse $h$; part 4 = implicit bias to small effective $k$.

**⚠️ Watch out:** (1) invert Hoeffding correctly ($d\ln3$, not $\ln d$); (3) the $\delta_k$ must sum to at most $\delta$, and the resulting $\Delta$ must be increasing in $k$; (4) the bound controls the *gap* and applies to the returned sparse $h$ only if you note simultaneity over $k$ — low true loss still needs small $L_S$.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1 piece-count without convexity; Q1.3 missing the
  "convex PWL ⇒ max of affines" converse; Q2.2 quoting gradients without derivation;
  Q2.4 not invoking uniqueness for the ansatz; Q3.1 missing the union bound step or
  wrong $\epsilon$ inversion; Q3.3 non-summable $\delta_k$.
