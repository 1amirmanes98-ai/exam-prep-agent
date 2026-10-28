# FODL Exam — Moed A 2021
**Date / semester:** 04.07.2021, Semester B 2020/21 (תשפ"א); lecturer Dr. Nadav Cohen, TA Noam Razin; 3 hours, no aid material
**Total points:** 106

## Q1 (42 pts) — Sign-activation networks: piecewise-constant expressiveness and universality
**Topics:** universality, hypothesis-class, piecewise-constant | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_B$ be the hypothesis class of neural networks with one hidden layer of width $B$, one-dimensional input and output (i.e. $X = Y = \mathbb{R}$, where $X$ is the input space and $Y$ the output space), and sign activation on the hidden-layer neurons. That is:

$$\mathcal{H}_B = \left\{ x \mapsto b' + \sum_{i=1}^{B} v_i\,\sigma(w_i x + b_i)\ :\ w_1,\dots,w_B,\ b_1,\dots,b_B,\ v_1,\dots,v_B,\ b' \in \mathbb{R} \right\}$$

where $\sigma(z)$ equals $1$ if $z \ge 0$ and $0$ otherwise. For simplicity, assume $w_1,\dots,w_B \ge 0$.

We say that $g:\mathbb{R}\to\mathbb{R}$ is piecewise constant if there exist scalars $\alpha_1,\dots,\alpha_N$ and $c_0 := -\infty < c_1 < \cdots < c_{N-1} < c_N := \infty$ such that $g(x) = \alpha_j$ on each interval $[c_{j-1}, c_j)$ (of course, for $j = 1$ the interval is open on its left side as well). The minimal $N$ for which such scalars exist is called the number of constant segments of $g$.

**a. (12 pts)** For $B \in \mathbb{N}$, prove that every function in $\mathcal{H}_B$ is piecewise constant with at most $B+1$ constant segments.

**b. (12 pts)** For $B \in \mathbb{N}$, prove that every piecewise constant function with at most $B+1$ constant segments is contained in $\mathcal{H}_B$.

Now, we define the following distance measure between functions from $\mathbb{R}$ to $\mathbb{R}$:

$$d(f_1, f_2) = \sup_{x \in [0,1]} |f_1(x) - f_2(x)|$$

and denote by $F$ the set of continuous functions from $\mathbb{R}$ to $\mathbb{R}$.

**c. (6 pts)** Formally define the following expression: "$\mathcal{H}_B$ is universal with respect to $F$ in the sense of the distance $d$."

**d. (12 pts)** Prove that $\mathcal{H}_B$ is universal with respect to $F$ in the sense of the distance $d$.

*Hint:* If $f:[0,1]\to\mathbb{R}$ is continuous then it is uniformly continuous, i.e. for every $\epsilon > 0$ there exists $\delta > 0$ such that if $x_1, x_2 \in [0,1]$ satisfy $|x_1 - x_2| < \delta$, then necessarily $|f(x_1) - f(x_2)| < \epsilon$.

**Solution sketch:**

**1. Every network in $\mathcal{H}_B$ has at most $B+1$ constant segments**

**What is asked.** Show that every $h \in \mathcal{H}_B$ is piecewise constant, with at most $B+1$ constant segments. The answer is a proof.

**Tool and why.** Counting the pieces of a sum of simple functions (cheat sheet §5). With $w_i \geq 0$ every sign neuron is either a constant or a single upward step, and a sum of steps can change value only where one of the steps does. So it is enough to count the possible step locations.

**Definitions.** For neuron $i$ let $s_i(x) := \sigma(w_i x + b_i)$, so that $h(x) = b' + \sum_i v_i s_i(x)$. Let $T$ be the set of thresholds $-b_i/w_i$ of the neurons with $w_i > 0$, let $k := |T|$, and list the thresholds in increasing order:

$$t_1 < t_2 < \cdots < t_k.$$

We introduce $T$ because, as Step 2 shows, these are the only points where a neuron can switch.

**Solution.**

Step 1, neurons with $w_i = 0$: then $s_i(x) = \sigma(b_i)$ for every $x$, a constant ($0$ or $1$). Such a neuron has no switching point.

Step 2, neurons with $w_i > 0$: dividing by $w_i$ keeps the direction of the inequality, so

$$w_i x + b_i \geq 0 \iff x \geq -b_i/w_i.$$

Hence $s_i$ is $0$ to the left of its threshold and $1$ from the threshold on, including the threshold itself because $\sigma(0) = 1$. It is a single step, closed on the left.

Step 3, count the thresholds: at most $B$ neurons have $w_i > 0$, and several of them may share a threshold, so $k \leq B$.

Step 4, the pieces: the $k+1$ intervals $(-\infty, t_1)$, $[t_1, t_2)$, …, $[t_k, \infty)$ cover $\mathbb{R}$ without overlap. Take $x$ in one of them. No threshold lies strictly inside the interval, so every neuron whose threshold is at or left of the interval's left end outputs $1$, and every other neuron with $w_i > 0$ outputs $0$; the neurons of Step 1 are constant anyway. So every $s_i$ is constant on the interval, and therefore so is $h$.

Step 5, match the definition: take $N := k+1$, $c_j := t_j$ for $j = 1, \dots, k$, and $\alpha_j :=$ the value of $h$ on the $j$-th interval. The intervals are exactly the left-closed intervals of the definition (the first one is open on the left), so $h$ is piecewise constant. The minimal number of segments, call it $N_{\min}(h)$, is at most this $N$:

$$N_{\min}(h) \leq k + 1 \leq B + 1.$$

If $k = 0$ (all $w_i = 0$), $h$ is constant: one segment.

**In words.** Each neuron contributes at most one jump, so $B$ neurons give at most $B$ jumps and at most $B+1$ flat pieces. Two neurons with the same threshold, or jumps that cancel, only lower the count; that is why the claim is "at most".

**Sanity check.** With $B = 1$, $w_1 = 1$, $b_1 = 0$, $v_1 = 1$, $b' = 0$ we get $h(x) = \sigma(x)$: it is $0$ on $(-\infty, 0)$ and $1$ on $[0, \infty)$, exactly $2 = B+1$ segments. With $B = 2$ and $h(x) = \sigma(x) + \sigma(2x)$ both thresholds are $0$, so $h = 2\sigma(x)$ has only $2$ segments, fewer than $B+1$.

**What to write in the exam.**

- If $w_i = 0$ the neuron is the constant $\sigma(b_i)$.
- If $w_i > 0$ the neuron is the step $\mathbb{1}[x \geq -b_i/w_i]$, closed on the left since $\sigma(0) = 1$.
- There are at most $B$ distinct thresholds; between consecutive thresholds every neuron, hence $h$, is constant.
- So $h$ is piecewise constant with at most $B+1$ segments.

*Verified: 2000 random networks ($B \leq 6$, some $w_i = 0$, exact fractions): $h$ is constant on every piece (checked at each threshold, between thresholds and just before each), and the segment count never exceeds $B+1$ (it equals $B+1$ in some cases).*

**2. Every piecewise constant function with at most $B+1$ segments is in $\mathcal{H}_B$**

**What is asked.** Given a piecewise constant $g$ with at most $B+1$ segments, exhibit parameters of a network in $\mathcal{H}_B$ that equals $g$ everywhere. The answer is a construction and a check.

**Tool and why.** A telescoping staircase (cheat sheet §5): start at the leftmost value and, at each breakpoint, add exactly the jump of $g$ there. A sign neuron $\sigma(x - c)$ is precisely a unit step at $c$, closed on the left like the segments of the definition.

**Definitions.** Let $g$ have $N$ segments with $N \leq B+1$, values $\alpha_1, \dots, \alpha_N$ and breakpoints $c_1, \dots, c_{N-1}$ in increasing order. For $i = 1, \dots, N-1$ let $J_i := \alpha_{i+1} - \alpha_i$, the jump of $g$ at $c_i$. We introduce $J_i$ because it will be the output weight of neuron $i$.

**Solution.**

Step 1, the parameters: for the first $N-1$ neurons set

$$b' := \alpha_1, \quad w_i := 1, \quad b_i := -c_i, \quad v_i := J_i.$$

The remaining $B - (N-1)$ neurons (a non-negative number, because $N - 1 \leq B$) get $w_i := 0$, $b_i := 0$ and $v_i := 0$; each contributes $0 \cdot \sigma(0) = 0$. All $w_i \geq 0$, as the class requires.

Step 2, each used neuron is a step at $c_i$: $\sigma(x - c_i)$ is $1$ exactly when $x \geq c_i$, and $0$ otherwise.

Step 3, evaluate on segment $j$: take $x \in [c_{j-1}, c_j)$. The breakpoints increase, so $x \geq c_i$ holds exactly for $i \leq j-1$. Hence only the first $j-1$ steps are on, and the sum telescopes:

$$h(x) = \alpha_1 + \sum_{i=1}^{j-1} (\alpha_{i+1} - \alpha_i) = \alpha_j.$$

For $j = 1$ the sum is empty and $h(x) = \alpha_1$, also correct.

Step 4, conclusion: $h = g$ on every segment, hence on all of $\mathbb{R}$, and $h \in \mathcal{H}_B$. So $g \in \mathcal{H}_B$.

**In words.** The network walks from left to right: it starts at the first value $\alpha_1$, and at each breakpoint one neuron switches on and adds exactly the jump needed to reach the next value. $N$ segments need only $N-1$ jumps, which is why $B$ neurons suffice for $B+1$ segments.

**Sanity check.** Take $B = 2$ and $g$ equal to $2$ on $(-\infty, 0)$, $5$ on $[0, 1)$ and $1$ on $[1, \infty)$. The construction gives $h(x) = 2 + 3\sigma(x) - 4\sigma(x - 1)$, whose values at $x = -1, 0, 0.5, 1, 2$ are $2, 5, 5, 1, 1$, as required. Together with part 1, $\mathcal{H}_B$ is exactly the set of piecewise constant functions with at most $B+1$ segments.

**What to write in the exam.**

- Let $g$ have values $\alpha_1, \dots, \alpha_N$ with $N \leq B+1$ and breakpoints $c_1, \dots, c_{N-1}$.
- Set $b' := \alpha_1$, and for $i \leq N-1$: $w_i := 1$, $b_i := -c_i$, $v_i := \alpha_{i+1} - \alpha_i$; unused neurons get $v_i := 0$.
- On $[c_{j-1}, c_j)$ exactly the first $j-1$ neurons fire, so the sum telescopes to $\alpha_j$.
- Hence $g \in \mathcal{H}_B$.

*Verified: 2000 random $g$ with $N \leq B+1$ and $B \leq 6$: the constructed network equals $g$ exactly (fractions) on 200 grid points and at every breakpoint; the example gives $2, 5, 5, 1, 1$.*

**3. Formal definition of universality**

**What is asked.** Write the statement "$\mathcal{H}_B$ is universal with respect to $F$ in the sense of $d$" as a formal quantified statement. The answer is a definition.

**Tool and why.** The definition of universality (cheat sheet §4): every target can be approximated to every accuracy by some member of the family, where the size of the network may depend on the target and on the accuracy. Here the size is the width $B$.

**Definitions.** No new notation: $F$, $d$ and $\mathcal{H}_B$ are as in the statement.

**Solution.**

Step 1, what must be approximated: every $f \in F$, to every accuracy $\epsilon > 0$.

Step 2, what we may choose: a width $B$ and a network $h \in \mathcal{H}_B$, both allowed to depend on $f$ and on $\epsilon$.

Step 3, the definition:

$$\forall f \in F \ \ \forall \epsilon > 0 \ \ \exists B \in \mathbb{N} \ \ \exists h \in \mathcal{H}_B : \ \ d(f, h) \leq \epsilon.$$

Equivalently, the union of all $\mathcal{H}_B$ is dense in $F$ with respect to $d$. Writing $< \epsilon$ instead of $\leq \epsilon$ gives the same notion (apply the definition with $\epsilon/2$). Only the values on $[0,1]$ matter, because $d$ looks only there.

**In words.** No fixed width can be enough, because by part 1 a network of width $B$ has only $B+1$ flat pieces. Universality says that by paying with width we can get as close as we like to any continuous function.

**Sanity check.** The order of quantifiers matters. The version "there is one $B$ that works for all $f$ and $\epsilon$" is false: for $f(x) = x$, the $B+1$ segments of any $h \in \mathcal{H}_B$ cover $[0,1]$, so one of them meets $[0,1]$ in an interval of length at least $1/(B+1)$. On that interval $f$ changes by at least that length while $h$ is constant, so $d(f, h) \geq 1/(2(B+1))$. Equal pieces achieve exactly this value, so for $\epsilon$ below it width $B$ fails.

**What to write in the exam.**

- For every $f \in F$ and every $\epsilon > 0$ there exist $B \in \mathbb{N}$ and $h \in \mathcal{H}_B$ with $d(f, h) \leq \epsilon$.
- Note that $B$ may depend on $f$ and on $\epsilon$.

*Verified: for $f(x) = x$ the best staircase with $B+1$ equal pieces has sup error exactly $1/(2(B+1))$ on a grid of $10^6$ points, for $B = 1, \dots, 10$.*

**4. Proof of universality**

**What is asked.** Prove that the definition of part 3 holds. The answer is an $\epsilon$–$\delta$ proof with an explicit construction.

**Tool and why.** Uniform continuity (the hint) plus a staircase approximation and part 2 (cheat sheet §4 and §5). Uniform continuity gives one $\delta$ for the whole interval, so a single uniform grid of mesh below $\delta$ works everywhere; part 2 turns the staircase into a network.

**Definitions.** Fix $f \in F$ and $\epsilon > 0$. Let $\delta > 0$ be the number the hint gives for the restriction of $f$ to $[0,1]$ and this $\epsilon$. Let $B := \lfloor 1/\delta \rfloor + 1$, an integer with $B > 1/\delta$. The staircase $h$ freezes $f$ at the left end of each grid cell:

$$h(x) := \begin{cases} f(0), & x < 1/B, \\ f(j/B), & j/B \leq x < (j+1)/B, \ \ 1 \leq j \leq B-1, \\ f(1), & x \geq 1. \end{cases}$$

**Solution.**

Step 1, uniform continuity: $f$ is continuous on $\mathbb{R}$, so its restriction to the closed bounded interval $[0,1]$ is uniformly continuous (the hint). This gives $\delta$.

Step 2, the mesh: since $B > 1/\delta$, we have $1/B < \delta$.

Step 3, $h$ is a network: its breakpoints are $c_j = j/B$ for $j = 1, \dots, B$, so it is piecewise constant with $B+1$ segments (fewer if neighbouring values coincide). By part 2, $h \in \mathcal{H}_B$.

Step 4, the error at a point $x \in [0,1)$: let $j := \lfloor Bx \rfloor$, an integer between $0$ and $B-1$. Then $x$ lies in the cell that starts at $j/B$, $h(x) = f(j/B)$, and

$$0 \leq x - \tfrac{j}{B} < \tfrac{1}{B} < \delta.$$

By uniform continuity, $|f(x) - f(j/B)| < \epsilon$. At $x = 1$ we have $h(1) = f(1)$, error $0$.

Step 5, the distance: every $x \in [0,1]$ has error below $\epsilon$, so the supremum is at most $\epsilon$, that is $d(f, h) \leq \epsilon$. (A supremum of values below $\epsilon$ can equal $\epsilon$, which is why part 3 uses $\leq$.) Since $f$ and $\epsilon$ were arbitrary, the definition of part 3 holds.

**In words.** A continuous function hardly changes over short intervals. Chop $[0,1]$ into cells shorter than $\delta$, freeze $f$ at the left end of each cell, and the staircase is within $\epsilon$ everywhere; part 2 says every staircase with $B+1$ steps is a width-$B$ sign network.

**Sanity check.** Take $f(x) = \sin(2\pi x) + x^2$ and $\epsilon = 0.1$. On $[0,1]$,

$$|f'| \leq 2\pi + 2 \approx 8.28,$$

so $\delta = \epsilon / 8.28$, about $0.0121$, works and $B = 83$. The resulting network has sup error $0.0996$, below $0.1$; with $B = 82$ the error is $0.1008$, so the estimate is not wasteful here. For a constant $f$ the error is $0$ for every $B$.

**What to write in the exam.**

- Given $f$ and $\epsilon$, take $\delta$ from uniform continuity on $[0,1]$ and $B$ with $1/B < \delta$.
- Let $h$ equal $f(j/B)$ on the cell starting at $j/B$ (constant extension outside $[0,1]$); it has at most $B+1$ segments, so $h \in \mathcal{H}_B$ by part 2.
- Each $x \in [0,1]$ is within $1/B < \delta$ of its anchor, so $|f(x) - h(x)| < \epsilon$.
- Hence $d(f, h) \leq \epsilon$.

*Verified: on a grid of $2 \cdot 10^6$ points, the part-2 network with $B = 83$ equals the staircase exactly and has sup error $0.0996$; $B = 82$ gives $0.1008$.*

**Common mistakes.**

- In part 1, forgetting the neurons with $w_i = 0$, or saying every neuron adds a segment even when thresholds coincide; the claim is only "at most".
- In part 2, taking $v_i := \alpha_{i+1}$ instead of the jump: then the sum on segment $j$ is $\alpha_1 + \dots + \alpha_j$, not $\alpha_j$.
- In parts 3 and 4, fixing $B$ before $f$ and $\epsilon$ (false, see the sanity check of part 3), or using plain continuity, whose $\delta$ depends on the point, so no single grid works.

**💡 Useful tricks:** With $w_i\geq0$ each sign unit is one left-closed step ⇒ $\leq B$ thresholds ⇒ $\leq B+1$ segments; realize a target step function by telescoping with jump weights $v_i=\alpha_{i+1}-\alpha_i$, $b_i=-c_i$; universality runs through *uniform continuity* → partition into $<\delta$ pieces → step-approximate. (Identical machinery to Moed C 2024 Q1.)

**⚠️ Watch out:** (a) treat the $w_i=0$ constant-unit case; (b) verify the sum telescopes to $\alpha_j$ on each interval; (c) the formal definition needs "$\exists B$ depending on $\epsilon$"; (d) it's fine that $B$ grows as $1/\delta$ shrinks.

## Q2 (42 pts) — Symmetric matrix factorization: non-convexity, end-to-end gradient flow dynamics, and low-rank bias
**Topics:** matrix-factorization, gradient-flow, convexity, implicit-regularization, linear-nn | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_05_optimization_3, lecture_08_generalization_3, fodl_recitation_gradient_flow
**Statement (English translation):**
Let $L: \mathbb{R}^{d,d} \to \mathbb{R}$ be a convex, continuously differentiable loss function that attains its minimal value at a point (matrix) $W^* \in \mathbb{R}^{d,d}$ which is symmetric, positive semi-definite, and is **not** $0 \in \mathbb{R}^{d,d}$; that is, $L(0) > L(W^*)$. Furthermore, assume that $\nabla L(W) = \nabla L(W)^\top$ for every $W \in \mathbb{R}^{d,d}$. Define the following objective function:

$$\phi: \mathbb{R}^{d,d} \to \mathbb{R}\ ,\quad \phi(U) = L(UU^\top)$$

**a. (12 pts)** Prove that $\phi$ is **not** convex.

Now suppose gradient flow is run over $\phi$ with initialization $U_0 \in \mathbb{R}^{d,d}$, and denote by $W(t)$ the "end-to-end" matrix at time $t \ge 0$, i.e. $W(t) = U(t)U(t)^\top$.

**b. (12 pts)** Prove that $\ \frac{d}{dt}W(t) = -2\big[\nabla L\big(W(t)\big)W(t) + W(t)\nabla L\big(W(t)\big)\big]$.

For every $t \ge 0$, $W(t)$ is symmetric and therefore orthogonally diagonalizable. Assume that an analytic eigendecomposition of $W(t)$ exists: i.e. there exist $V:\mathbb{R}_{\ge0}\to\mathbb{R}^{d,d}$ and $D:\mathbb{R}_{\ge0}\to\mathbb{R}^{d,d}$ such that for every $t \ge 0$ the matrix $V(t)$ is orthonormal, the matrix $D(t)$ is diagonal, both are differentiable (infinitely many times) with respect to $t$, and $W(t) = V(t)D(t)V(t)^\top$.

**c. (12 pts)** Prove that for every $r \in \{1,\dots,d\}$:
$$\frac{d}{dt}D(t)_{r,r} = 4\,D(t)_{r,r}\,\big\langle -\nabla L\big(W(t)\big),\ v_r(t)\,v_r(t)^\top \big\rangle$$
where $v_r(t)$ is the $r$-th column vector of $V(t)$.

**d. (6 pts)** Explain why, following the result of sub-part c, one can expect that running gradient flow over $\phi$ with initialization close to $0 \in \mathbb{R}^{d,d}$ will yield an end-to-end matrix of low rank (under the assumption that $L$ can be minimized with low-rank matrices).

**Solution sketch:**

**1. $\phi$ is not convex**

**What is asked.** Prove that $\phi$ is not a convex function. The answer is a proof by contradiction with explicit points.

**Tool and why.** Symmetry plus the midpoint convexity inequality (cheat sheet §7, non-convexity of factorized objectives). Since $\phi(U) = \phi(-U)$ and the midpoint of $U$ and $-U$ is $0$, convexity would make $0$ a global minimizer. A square root of the PSD matrix $W^*$ (cheat sheet §3) gives a point strictly better than $0$.

**Definitions.** Let $U^* := (W^*)^{1/2}$ be the PSD square root of $W^*$: write $W^* = Q S Q^\top$ with $Q$ orthogonal and $S$ diagonal with non-negative entries (spectral theorem; the entries are non-negative because $W^*$ is PSD), and set $U^* := Q S^{1/2} Q^\top$. We need it because its product with its own transpose is exactly $W^*$.

**Solution.**

Step 1, symmetry: for every $U$,

$$\phi(-U) = L\big((-U)(-U)^\top\big) = L(UU^\top) = \phi(U).$$

Step 2, convexity would make $0$ a global minimizer: suppose $\phi$ is convex. For every $U$ the point $0$ is the midpoint of $U$ and $-U$, so

$$\begin{aligned} \phi(0) &= \phi\big(\tfrac{1}{2}U + \tfrac{1}{2}(-U)\big) \\ &\leq \tfrac{1}{2}\phi(U) + \tfrac{1}{2}\phi(-U) \\ &= \phi(U). \end{aligned}$$

The second row is the definition of convexity with weight $\tfrac12$; the third row is Step 1.

Step 3, a point better than $0$: $U^*$ is symmetric, so

$$U^* U^{*\top} = Q S^{1/2} Q^\top Q S^{1/2} Q^\top = Q S Q^\top = W^*,$$

by $Q^\top Q = I$. Hence, using the given $L(0) > L(W^*)$,

$$\phi(U^*) = L(W^*) < L(0) = \phi(0).$$

Step 4, contradiction: Step 2 with $U = U^*$ says $\phi(0) \leq \phi(U^*)$, which contradicts Step 3. Written as a violated midpoint inequality:

$$\phi\big(\tfrac{1}{2}U^* + \tfrac{1}{2}(-U^*)\big) = \phi(0) > \phi(U^*) = \tfrac{1}{2}\phi(U^*) + \tfrac{1}{2}\phi(-U^*).$$

So $\phi$ is not convex, even though $L$ is: composing with the non-linear map $U \mapsto UU^\top$ destroys convexity.

**In words.** The objective has two equally good points, $U^*$ and $-U^*$, and exactly between them a strictly worse point, the origin. A convex function cannot have a "hill" between two of its points that is higher than both.

**Sanity check.** For $d = 1$ and $L(w) = (w - 1)^2$ (convex, minimized at $w^* = 1$, with $L(0) = 1$) we get $\phi(u) = (u^2 - 1)^2$: $\phi(1) = 0$ and $\phi(-1) = 0$, but $\phi(0) = 1$. This is the classical double well.

**What to write in the exam.**

- Symmetry: $\phi(U) = \phi(-U)$, because $(-U)(-U)^\top = UU^\top$.
- If $\phi$ were convex, the midpoint inequality at $0$ would give $\phi(0) \leq \phi(U)$ for every $U$.
- But $U^* = (W^*)^{1/2}$ exists since $W^*$ is PSD, and $\phi(U^*) = L(W^*)$ is smaller than $L(0) = \phi(0)$. Contradiction.

*Verified: for 100 random PSD $W^*$ ($d \leq 5$) and a convex loss with symmetric gradient (the sum of $\log\cosh$ over the entries of $\tfrac12(W + W^\top) - W^*$): $\phi(U) = \phi(-U)$, $U^* U^{*\top} = W^*$ (SciPy `sqrtm`), and the midpoint inequality at $0$ fails in all 100 cases.*

**2. The end-to-end dynamics**

**What is asked.** Derive the differential equation for $W(t)$ given in the statement. The answer is a derivation.

**Tool and why.** Gradient flow is $\dot U = -\nabla\phi(U)$ (cheat sheet §7); the end-to-end matrix then follows from the product rule, as in end-to-end dynamics of linear networks (cheat sheet §8). First we need $\nabla\phi$; since $\phi$ is a composition, the cleanest way is to expand $\phi(U + H)$ and keep the part that is linear in $H$.

**Definitions.** $W := UU^\top$ and $G := \nabla L(W)$, the gradient of the loss at the current end-to-end matrix; by assumption $G^\top = G$. The inner product is $\langle X, Y \rangle = \mathrm{Tr}(XY^\top)$. A dot means $\frac{d}{dt}$, and we drop the argument $t$.

**Solution.**

Step 1, expand the product around $U$ in direction $H$:

$$(U + H)(U + H)^\top = UU^\top + HU^\top + UH^\top + HH^\top.$$

Step 2, first-order expansion of $L$ ($L$ is continuously differentiable): the term $HH^\top$ is quadratic in $H$, so

$$\phi(U + H) = L(W) + \langle G,\ HU^\top + UH^\top \rangle + o(\|H\|).$$

Step 3, write each linear term as an inner product with $H$, by the trace identities:

$$\begin{aligned} \langle G, HU^\top \rangle &= \mathrm{Tr}(G U H^\top) \\ &= \langle GU, H \rangle, \\ \langle G, UH^\top \rangle &= \mathrm{Tr}(G H U^\top) \\ &= \mathrm{Tr}(H U^\top G) \\ &= \langle H, G^\top U \rangle. \end{aligned}$$

Step 4, the gradient: the linear part is $\langle (G + G^\top)U, H \rangle$, and the symmetry assumption $G^\top = G$ merges the two terms:

$$\nabla\phi(U) = \big(G + G^\top\big)U = 2GU.$$

Step 5, gradient flow: $\dot U = -2GU$.

Step 6, the product rule for $W = UU^\top$:

$$\begin{aligned} \dot W &= \dot U U^\top + U \dot U^\top \\ &= -2GUU^\top - 2UU^\top G^\top \\ &= -2GW - 2WG \\ &= -2\big[\nabla L(W)\, W + W\, \nabla L(W)\big]. \end{aligned}$$

The second row substitutes Step 5 and its transpose; the third uses $UU^\top = W$ and $G^\top = G$; the fourth factors out $-2$ and writes $G$ out in full.

**In words.** The end-to-end matrix moves against the gradient of $L$, but multiplied on the left and on the right by $W$ itself. Directions in which $W$ is small move slowly; part 3 makes this precise.

**Sanity check.** For $d = 1$ and $L(w) = \tfrac12(w - 1)^2$ we have $G = w - 1$ and $\phi(u) = \tfrac12(u^2 - 1)^2$, so $\phi'(u) = 2u(u^2 - 1)$, which is $2Gu$ as in Step 4. With $w = u^2$,

$$\dot w = 2u\dot u = -4u^2(u^2 - 1) = -4w(w - 1),$$

and the formula gives $-2[(w - 1)w + w(w - 1)]$, the same. Also $\dot W = 0$ at $W = 0$: initializing exactly at the origin, nothing ever moves.

**What to write in the exam.**

- Gradient: the part of $\phi(U + H)$ linear in $H$ is $\langle G, HU^\top + UH^\top \rangle$, which equals $\langle (G + G^\top)U, H \rangle$; with $G^\top = G$ this gives $\nabla\phi(U) = 2GU$.
- Flow: $\dot U = -2\nabla L(W)U$.
- Product rule: $\dot W = \dot U U^\top + U \dot U^\top$; substitute and use $UU^\top = W$ and the symmetry of $\nabla L$.

*Verified: on 50 random cases with the log-cosh loss of part 1, central finite differences agree with $\nabla\phi(U) = 2GU$ (max error $5 \cdot 10^{-9}$) and with the formula for $\dot W$ (max error $8 \cdot 10^{-10}$) (NumPy).*

**3. The eigenvalue dynamics**

**What is asked.** Prove the formula for $\frac{d}{dt}D(t)_{r,r}$. The answer is a derivation.

**Tool and why.** Write the eigenvalue as a quadratic form, $\lambda_r = v_r^\top W v_r$, and differentiate (cheat sheet §8, eigenvalue dynamics in matrix factorization). The derivative $\dot v_r$ is unknown, but its terms cancel because $v_r$ has norm one. The trace identities (cheat sheet §3) turn the result into the required inner product.

**Definitions.** $\lambda_r := D_{r,r}$, and $v_r$ is the $r$-th column of $V$. From $W = VDV^\top$ and $V^\top V = I$ we get $WV = VD$, whose $r$-th column is $Wv_r = \lambda_r v_r$; also $v_r^\top v_r = 1$. As in part 2, $G := \nabla L(W)$. The analytic decomposition assumed in the statement is what makes $\dot v_r$ and $\dot\lambda_r$ exist.

**Solution.**

Step 1, the eigenvalue as a quadratic form: multiply $Wv_r = \lambda_r v_r$ on the left by $v_r^\top$ and use $v_r^\top v_r = 1$:

$$\lambda_r = v_r^\top W v_r.$$

Step 2, differentiate by the product rule (three factors):

$$\dot\lambda_r = \dot v_r^\top W v_r + v_r^\top \dot W v_r + v_r^\top W \dot v_r.$$

Step 3, the outer terms vanish: $Wv_r = \lambda_r v_r$, and since $W$ is symmetric also $v_r^\top W = \lambda_r v_r^\top$. So the first and third terms are both $\lambda_r v_r^\top \dot v_r$, and

$$\dot v_r^\top W v_r + v_r^\top W \dot v_r = 2\lambda_r\, v_r^\top \dot v_r.$$

Differentiating $v_r^\top v_r = 1$ gives $2 v_r^\top \dot v_r = 0$. Hence $\dot\lambda_r = v_r^\top \dot W v_r$.

Step 4, substitute part 2, using $Wv_r = \lambda_r v_r$ in the first term and $v_r^\top W = \lambda_r v_r^\top$ in the second:

$$\begin{aligned} v_r^\top \dot W v_r &= -2\big[v_r^\top G W v_r + v_r^\top W G v_r\big] \\ &= -2\big[\lambda_r v_r^\top G v_r + \lambda_r v_r^\top G v_r\big] \\ &= -4\lambda_r\, v_r^\top G v_r. \end{aligned}$$

Step 5, the quadratic form as an inner product:

$$\begin{aligned} v_r^\top G v_r &= \mathrm{Tr}(v_r^\top G v_r) \\ &= \mathrm{Tr}(G v_r v_r^\top) \\ &= \langle G, v_r v_r^\top \rangle. \end{aligned}$$

The first row holds because a scalar equals its own trace; the second is the cyclic rule $\mathrm{Tr}(ABC) = \mathrm{Tr}(CAB)$; the third uses $\langle A, B \rangle = \mathrm{Tr}(AB^\top)$ with $(v_r v_r^\top)^\top = v_r v_r^\top$.

Step 6, combine Steps 3 to 5 and move the minus sign into the inner product:

$$\frac{d}{dt}D_{r,r} = -4\lambda_r \langle G, v_r v_r^\top \rangle = 4\lambda_r \big\langle -\nabla L(W),\, v_r v_r^\top \big\rangle.$$

**In words.** $-\nabla L(W)$ is the direction that decreases the loss. Its component along $v_r v_r^\top$ says whether the $r$-th eigenvalue should grow or shrink, and the speed is multiplied by $\lambda_r$ itself: an eigenvalue at $0$ stays at $0$.

**Sanity check.** For $d = 1$: $v = \pm 1$ and $\lambda = w$, so with $L(w) = \tfrac12(w - 1)^2$ the formula gives $4w \cdot (-(w - 1)) = -4w(w - 1)$, exactly the $\dot w$ of the sanity check in part 2.

**What to write in the exam.**

- Write $\lambda_r = v_r^\top W v_r$, from $Wv_r = \lambda_r v_r$ and $v_r^\top v_r = 1$.
- Differentiate: the two terms with $\dot v_r$ add up to $2\lambda_r v_r^\top \dot v_r$, which is $0$ because $v_r^\top v_r = 1$.
- So $\dot\lambda_r = v_r^\top \dot W v_r$; substitute part 2 and use $Wv_r = \lambda_r v_r$ to get $-4\lambda_r v_r^\top \nabla L(W) v_r$.
- Finally $v_r^\top G v_r = \langle G, v_r v_r^\top \rangle$ by the trace identities.

*Verified: on 50 random cases with the log-cosh loss, finite differences of the eigenvalues of $W + h\dot W$ match the formula with relative error below $10^{-10}$ (NumPy).*

**4. Why near-zero initialization gives approximately low rank**

**What is asked.** Explain, qualitatively, why gradient flow started near the origin ends at an end-to-end matrix of approximately low rank, when $L$ can be minimized by low-rank matrices. The answer is an argument, not a proof.

**Tool and why.** The eigenvalue equation of part 3 (cheat sheet §8) and the implicit-regularization picture (cheat sheet §12). The key feature is that the growth rate of $\lambda_r$ is proportional to $\lambda_r$: multiplicative dynamics, which learn one direction at a time.

**Definitions.** $g_r(t) := \langle -\nabla L(W(t)), v_r(t) v_r(t)^\top \rangle$ measures how strongly the loss pushes the $r$-th eigenvalue up. Let $\alpha$ be the initialization scale: the entries of $U_0$ are of order $\alpha$, so every $\lambda_r(0)$ is of order $\alpha^2$, tiny. Since $W = UU^\top$ is PSD, every $\lambda_r \geq 0$.

**Solution.**

Step 1, closed form: part 3 says $\dot\lambda_r = 4 g_r \lambda_r$, a linear scalar equation, so

$$\lambda_r(t) = \lambda_r(0)\exp\Big(4\int_0^t g_r(s)\,ds\Big).$$

An eigenvalue changes only by a multiplicative factor. It never changes sign, and it can become large only through a long period in which $g_r$ is positive.

Step 2, there is a direction to grow in: by convexity of $L$,

$$L(W^*) \geq L(0) + \langle \nabla L(0), W^* \rangle,$$

so

$$\langle -\nabla L(0), W^* \rangle \geq L(0) - L(W^*) > 0.$$

So near the origin the descent direction has a positive component along the PSD target, and eigen-directions aligned with it have $g_r > 0$.

Step 3, the early phase: while $W$ is near $0$, $g_r$ is close to $\langle -\nabla L(0), v_r v_r^\top \rangle$. Eigenvalues whose directions align with the strongest descent directions grow exponentially, at a rate proportional to that alignment. Starting from order $\alpha^2$, an eigenvalue needs time of order $\ln(1/\alpha)$ divided by its rate to reach order $1$. So the strongest direction is learned first, the next one later, and the time gap grows as $\alpha$ shrinks.

Step 4, saturation: once $\lambda_r$ has fitted its direction, the loss no longer pushes along it, $g_r$ drops to about $0$, and $\lambda_r$ stops. In directions the minimizer does not need, $g_r$ is zero, tiny or negative, so their eigenvalues stay of order $\alpha^2$ for a very long time.

Step 5, conclusion: at every moment $W$ is the sum of the few components already learned plus a remainder of order $\alpha^2$. If $L$ can be made small by a low-rank matrix, gradient flow reaches small loss after learning only those few components, while all other eigenvalues are still tiny. So the end-to-end matrix is approximately low-rank: incremental, greedy rank learning. This is the expected qualitative behaviour, not a theorem for every convex $L$.

Step 6, a numerical illustration: take

$$L(W) = \tfrac12\big\|\tfrac12(W + W^\top) - W^*\big\|^2$$

(convex, with symmetric gradient), $d = 5$, $W^*$ with eigenvalues $1, 0.25, 0.01, 0, 0$ in a random orthonormal basis, and entries of $U_0$ equal to $10^{-3}$ times a standard normal (so every $\lambda_r(0)$ is below $10^{-5}$). Record the time at which each eigenvalue reaches half its target:

| target eigenvalue | time to reach half |
|---|---|
| $1$ | $3.3$ |
| $0.25$ | $12.4$ |
| $0.01$ | $231$ |

At $t = 30$ the eigenvalues of $W$ are about $1$, $0.25$, $5.5 \cdot 10^{-6}$, $2.5 \cdot 10^{-6}$, $1.8 \cdot 10^{-6}$: numerically rank $2$.

**In words.** "The rich get richer": a direction that is already large moves fast, and a direction that is still tiny barely moves. Starting from almost nothing, the flow adds one rank at a time, in order of importance, and stops adding once the loss is small.

**Sanity check.** Compare with gradient flow directly on $W$, without the factorization: then $\dot W = -\nabla L(W)$, every direction moves at a speed independent of its size, and there is no low-rank bias. The factor $\lambda_r$ of part 3, which comes from the factorization, is what creates the bias. Also, the initialization must be small but not exactly $0$: by part 2, $W = 0$ is a stationary point.

**What to write in the exam.**

- Part 3 gives $\dot\lambda_r = 4 g_r \lambda_r$, so $\lambda_r(t) = \lambda_r(0) e^{4\int_0^t g_r}$: growth is multiplicative.
- Near-zero initialization: all eigenvalues start tiny; those aligned with strong descent directions grow exponentially first, the others wait.
- A fitted direction gets $g_r$ near $0$ and stops; unneeded directions stay near $0$.
- So when the loss is small only a few eigenvalues are large: approximately low rank (incremental learning). This is a qualitative expectation, not a theorem.

*Verified: an Euler simulation of the flow (step sizes $2 \cdot 10^{-3}$ and $10^{-3}$ agree) gives the half-times and the spectrum at $t = 30$ above (NumPy).*

**Common mistakes.**

- In part 1, arguing "$L$ is convex, so $\phi$ is convex": composition with $U \mapsto UU^\top$ is not affine. Or taking $U^* = W^*$ instead of the square root, which gives $(W^*)^2$.
- In part 2, writing $\nabla\phi(U) = \nabla L(W)U$: this keeps only one of the two linear terms and loses the factor $2$; the symmetry of $\nabla L$ is what merges them.
- In parts 3 and 4, assuming $\dot v_r = 0$ instead of showing its terms cancel; or presenting the low-rank argument as a theorem.

**💡 Useful tricks:** $\phi(U)=\phi(-U)$ ⇒ non-convex via midpoint at $0$; differentiate $\lambda_r=v_r^\top W v_r$ and kill $\dot v_r$ terms with $Wv_r=\lambda_r v_r$, $v_r^\top v_r=1$; the multiplicative $\dot\lambda_r\propto\lambda_r$ ⇒ eigenvalues keep their sign and grow one-at-a-time from tiny init ⇒ low rank. (Same as Moed A 2024 Q2, here with general convex $L$ and the $\nabla L$ symmetry given.)

**⚠️ Watch out:** (a) exhibit the strictly-better $U^*=(W^*)^{1/2}$; (b) the factor-$2$ gradient uses the given $\nabla L=\nabla L^\top$; (c) justify $\dot v_r^\top v_r=0$; (d) it's a *qualitative* expectation — say so; don't over-claim a theorem.

## Q3 (22 pts) — Uniform convergence bound for finite (quantized) network classes and why it fails for deep learning
**Topics:** uniform-convergence, hoeffding, concentration, implicit-regularization, three-pillars | **Pillar:** Generalization | **Difficulty:** 2
**Maps to:** lecture_06_generalization_1, lecture_01_three_pillars
**Statement (English translation):**
Let $\mathcal{H}$ be the hypothesis class of a neural network with some arbitrary architecture having $p \in \mathbb{N}$ parameters, where each parameter can hold only one of $k \in \mathbb{N}$ different values. Every assignment to the parameters induces a function from domain $X$ to range $Y$. Let $D$ be an (unknown) distribution over $X\times Y$, let $S = \{(x_i,y_i)\}_{i=1}^m$ be a training sample of $m$ examples drawn i.i.d. from $D$, and let $l: Y\times Y \to [0,1]$ be the loss function. For a hypothesis $h \in \mathcal{H}$, denote by $L_D(h) := \mathbb{E}_{(x,y)\sim D}[l(h(x),y)]$ the generalization loss and by $L_S(h) := \frac{1}{m}\sum_{i=1}^m l(h(x_i),y_i)$ the sample loss.

**a. (12 pts)** Develop a generalization bound based on uniform convergence for the class $\mathcal{H}$. That is, develop an expression $\Delta(m,\delta)$ (independent of the hypothesis), which for every $\delta \in (0,1)$ satisfies $\lim_{m\to\infty}\Delta(m,\delta) = 0$, such that with probability at least $1-\delta$:

$$\forall h \in \mathcal{H}:\quad L_D(h) - L_S(h) \le \Delta(m,\delta)$$

Reminder (Hoeffding bound): Let $A_1,\dots,A_m$ be i.i.d. random variables bounded in the interval $[0,1]$. For every $\epsilon \ge 0$:
$$P\left(\left|\frac{1}{m}\sum_{i=1}^m A_i - \mathbb{E}[A_1]\right| \ge \epsilon\right) \le 2\exp(-2m\epsilon^2)$$

**b. (10 pts)** In light of the empirical phenomena studied in class (and demonstrated in the home exercises) concerning generalization of neural networks, explain why in deep learning, generalization bounds based on uniform convergence will not be tight.

**Solution sketch:**

**1. The uniform-convergence bound**

**What is asked.** An explicit $\Delta(m, \delta)$, the same for every hypothesis, that tends to $0$ as $m$ grows and such that with probability at least $1 - \delta$ every $h \in \mathcal{H}$ has $L_D(h) - L_S(h) \leq \Delta(m, \delta)$. The answer is a formula with its derivation.

**Tool and why.** Count the class, then Hoeffding for one fixed hypothesis and a union bound over the class (cheat sheet §2 and §10). Hoeffding controls a single hypothesis that does not depend on the sample; the union bound makes the statement hold for all hypotheses at once, which is what "uniform" means; and the quantization makes the class finite, so the union is over finitely many events.

**Definitions.** For a fixed $h$ let $A_i := l(h(x_i), y_i)$ for $i = 1, \dots, m$, the losses of $h$ on the sample. For $\epsilon > 0$ let

$$F_h(\epsilon) := \big\{ |L_S(h) - L_D(h)| \geq \epsilon \big\}$$

be the bad event for $h$: its sample loss and its generalization loss are far apart.

**Solution.**

Step 1, count the class: each of the $p$ parameters takes one of $k$ values, so by the product rule there are $k^p$ parameter assignments. Every $h \in \mathcal{H}$ is induced by at least one assignment, and different assignments may induce the same function, so $|\mathcal{H}| \leq k^p$.

Step 2, the conditions of Hoeffding: the pairs $(x_i, y_i)$ are i.i.d. and $h$ is fixed in advance, so $A_1, \dots, A_m$ are i.i.d. They lie in $[0,1]$ because $l$ takes values in $[0,1]$. Their mean is $\mathbb{E}[A_1] = L_D(h)$ by the definition of $L_D$, and their average is $\frac1m \sum_i A_i = L_S(h)$ by the definition of $L_S$.

Step 3, Hoeffding for one hypothesis:

$$P\big(F_h(\epsilon)\big) \leq 2e^{-2m\epsilon^2}.$$

Step 4, union bound over the class: the probability that some hypothesis is bad is at most the sum of the individual probabilities, and by Step 1 there are at most $k^p$ terms:

$$\begin{aligned} P\Big(\bigcup_{h \in \mathcal{H}} F_h(\epsilon)\Big) &\leq \sum_{h \in \mathcal{H}} 2e^{-2m\epsilon^2} \\ &\leq 2k^p e^{-2m\epsilon^2}. \end{aligned}$$

Step 5, choose $\epsilon$: set the right-hand side equal to $\delta$ and take logarithms:

$$\begin{aligned} 2k^p e^{-2m\epsilon^2} &= \delta \\ \ln 2 + p\ln k - 2m\epsilon^2 &= \ln\delta \\ \epsilon^2 &= \frac{p\ln k + \ln(2/\delta)}{2m}. \end{aligned}$$

Step 6, conclusion: with this $\epsilon$, with probability at least $1 - \delta$ no hypothesis is bad, so every $h$ satisfies $|L_S(h) - L_D(h)| < \epsilon$, and in particular $L_D(h) - L_S(h) < \epsilon$. Therefore

$$\boxed{\Delta(m, \delta) = \sqrt{\frac{p\ln k + \ln(2/\delta)}{2m}}}$$

It does not depend on the hypothesis (nor on the unknown $D$), as required.

Step 7, the limit: for fixed $\delta$, $p$ and $k$ the numerator is a constant and the denominator grows, so $\Delta(m, \delta) \to 0$ as $m \to \infty$, at rate $1/\sqrt{m}$.

**In words.** The price of a guarantee for all hypotheses at once is the term $p\ln k = \ln(k^p)$: the number of nats needed to write down the parameters. A network with $p$ parameters of $b$ bits each has $p\ln k = pb\ln 2$.

**Sanity check.** With $p = 1$ and $k = 1$ there is one hypothesis, $\ln k = 0$, and the bound becomes $\sqrt{\ln(2/\delta)/(2m)}$, plain Hoeffding; for $m = 100$ and $\delta = 0.1$ this is $0.1224$. A simulation with $p = 3$, $k = 2$ (so $8$ hypotheses with Bernoulli losses of random means), $m = 100$ and $\delta = 0.1$ gives $\Delta \approx 0.1593$, and the bound fails in a fraction $0.0021$ of $20000$ samples, well below $\delta$.

**What to write in the exam.**

- Count: $|\mathcal{H}| \leq k^p$.
- Fix $h$; the losses $l(h(x_i), y_i)$ are i.i.d. in $[0,1]$ with mean $L_D(h)$ and average $L_S(h)$, so Hoeffding bounds the probability of a gap of at least $\epsilon$ by $2e^{-2m\epsilon^2}$.
- Union bound: some $h$ is bad with probability at most $2k^p e^{-2m\epsilon^2}$; set it to $\delta$ and solve for $\epsilon$.
- Result: $\Delta(m, \delta) = \sqrt{(p\ln k + \ln(2/\delta))/(2m)}$, which tends to $0$.

*Verified: SymPy confirms that the closed form solves the equation of Step 5 exactly; the Monte-Carlo run above ($8$ hypotheses, $m = 100$, $\delta = 0.1$, $20000$ samples) gives failure frequency $0.0021$.*

**2. Why uniform-convergence bounds are not tight in deep learning**

**What is asked.** Explain, using the empirical phenomena from class and the home exercises, why bounds of the type of part 1 cannot be tight for neural networks. The answer is an argument in words, with the key logical step made explicit.

**Tool and why.** The generalization gap (cheat sheet §1) and the random-label experiments with the implicit-bias picture (cheat sheet §12). The decisive observation is that $\Delta(m, \delta)$ depends only on $m$, $\delta$ and the class, so the same number must also cover data on which the network provably generalizes badly.

**Definitions.** The generalization gap of $h$ is $L_D(h) - L_S(h)$. A random-label distribution is one in which the label $y$ is drawn independently of $x$, for example a fair coin in $\{-1, 1\}$; with the 0-1 loss every $h$ then has $L_D(h) = 1/2$.

**Solution.**

Step 1, the phenomenon (Zhang et al., reproduced in the home exercises): the same architectures that generalize well on real data, trained the same way, reach zero training error also when the labels are replaced by random labels. Their test error on random labels is at chance level.

Step 2, consequence for any uniform bound: apply the guarantee of part 1 to the random-label distribution. With high probability the class contains (and training finds) an $h$ with $L_S(h) = 0$, while $L_D(h) = 1/2$. A valid uniform bound must cover this $h$, so it must satisfy $\Delta(m, \delta) \geq 1/2$ at this sample size.

Step 3, the same number is used on real data: $\Delta(m, \delta)$ does not depend on the distribution or on the hypothesis. So on real data, where the trained network has a small gap, the bound still says about $1/2$ or more. It cannot be tight.

Step 4, the numbers: for $p = 10^6$ parameters quantized to $8$ bits ($k = 256$), $m = 5 \cdot 10^4$ and $\delta = 0.05$, we have $p\ln k \approx 5.55 \cdot 10^6$ and $\Delta \approx 7.45$, larger than $1$, hence vacuous for a loss in $[0,1]$. To get $\Delta \leq 0.1$ one would need $m \approx 2.77 \cdot 10^8$ examples.

Step 5, what is missing: whether a network generalizes depends on which hypothesis the training algorithm picks on the given data (gradient descent and its implicit regularization), not on how rich the class is. A bound that is uniform over the whole class is blind to this choice, so it is controlled by the worst hypotheses in the class, the memorizers.

**In words.** Over-parameterized networks can memorize anything, so the class always contains hypotheses with a huge gap. A uniform bound has to pay for them, even though gradient descent on real data never chooses them.

**Sanity check.** Uniform convergence is tight when the class is small relative to the data, as in the simulation of part 1 ($p\ln k$ much smaller than $m$). A small experiment shows the opposite regime: a random-feature model with $2000$ ReLU features, fitted by minimum-norm least squares to $200$ points with random labels, has training error $0$ and test error $0.505$, a gap of about $1/2$.

**What to write in the exam.**

- Networks fit random labels perfectly (zero training error, chance test error): the class contains memorizers with gap about $1/2$.
- $\Delta(m, \delta)$ depends only on $m$, $\delta$ and the class, so it must be at least about $1/2$ for realistic $m$, also on real data.
- On real data the actual gap is small, so the bound is loose; numerically it is vacuous unless $m$ is of order $p\ln k$.
- Generalization depends on which $h$ the algorithm picks (implicit regularization), which a class-wide bound cannot see.

*Verified: the values $5.55 \cdot 10^6$, $7.45$ and $2.77 \cdot 10^8$ computed in Python; the random-feature experiment (NumPy, seed fixed) gives training error $0$ and test error $0.505$.*

**Common mistakes.**

- In part 1, applying Hoeffding directly to the learned hypothesis, which depends on the sample, instead of to each fixed $h$ followed by a union bound.
- In part 1, miscounting the class as $p^k$ or $pk$, which gives $k\ln p$ or $\ln(pk)$ instead of $p\ln k$.
- In part 2, saying only "there are many parameters"; the full argument is that the same distribution-free $\Delta$ must also cover random labels, where the gap is about $1/2$.

**💡 Useful tricks:** $p$ parameters × $k$ values ⇒ $|\mathcal H|\leq k^p$; Hoeffding + union then invert to $\Delta=\sqrt{(p\ln k+\ln(2/\delta))/(2m)}$; (b) invoke the Zhang-et-al. random-label experiments — the class contains memorizers with $L_S\approx0$ but $L_D$ at chance level.

**⚠️ Watch out:** (a) the log gives $p\ln k$ (not $\ln p$) — count $k^p$ carefully; (b) the argument is that UC must cover ALL $h$ including memorizers, so it can't beat their constant gap unless $m\gtrsim p\ln k$; the real point is generalization depends on *which* $h$ GD picks (implicit bias) — invisible to any uniform bound.
