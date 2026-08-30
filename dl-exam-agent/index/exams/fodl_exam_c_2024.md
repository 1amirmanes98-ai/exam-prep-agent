# FODL Exam — Moed C 2024
**Date / semester:** 09.10.2024 — Semester B 2023/24 (תשפ"ד), Moed C; School of CS, Tel Aviv University; lecturer: Dr. Nadav Cohen, TA: Yonatan Ariel Slutzky; 3 hours; 3 questions, max possible score 105
**Total points:** 105

## Q1 (40 pts) — Width-$B$ sign networks = piecewise-constant functions with $\leq B+1$ pieces; universal approximation of continuous functions
**Topics:** universality, hypothesis-class, sign-activation, piecewise-constant | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_B$ be the hypothesis class of neural networks with a single hidden layer of width $B$, one-dimensional input and output (i.e. $\mathcal{X} = \mathcal{Y} = \mathbb{R}$, where $\mathcal{X}$ is the input space and $\mathcal{Y}$ the output space), and sign activation on the hidden-layer neurons; namely:

$$\mathcal{H}_B = \left\{ x \mapsto b' + \sum_{i=1}^{B} v_i\, \sigma(w_i x + b_i)\ :\ w_1, \ldots, w_B,\, b_1, \ldots, b_B,\, v_1, \ldots, v_B,\, b' \in \mathbb{R} \right\}$$

where $\sigma(z)$ equals one if $z \geq 0$ and zero otherwise. For simplicity, assume that $w_1, \ldots, w_B \geq 0$.

We say that $g: \mathbb{R} \to \mathbb{R}$ is *piecewise constant* if there exist scalars $\alpha_1, \ldots, \alpha_N$ and $c_0 := -\infty < c_1 < \cdots < c_{N-1} < c_N := \infty$ such that $g(x) = \alpha_j$ on every interval $[c_{j-1}, c_j)$ (of course, for $j = 1$ the interval is open on its left side as well). The minimal $N$ for which such scalars exist is called the *number of constant pieces* of $g$.

**(1) (11 pts)** For $B \in \mathbb{N}$, prove that every function in $\mathcal{H}_B$ is piecewise constant with at most $B + 1$ constant pieces.

**(2) (11 pts)** For $B \in \mathbb{N}$, prove that every piecewise-constant function with at most $B + 1$ constant pieces is contained in $\mathcal{H}_B$.

Now, we define the following distance measure between functions from $\mathbb{R}$ to $\mathbb{R}$:

$$d(f_1, f_2) = \sup_{x \in [0,1]} |f_1(x) - f_2(x)|$$

and denote by $F$ the class of continuous functions from $\mathbb{R}$ to $\mathbb{R}$.

**(3) (6 pts)** Define formally the following expression: "$\mathcal{H}_B$ is universal in the sense of $d(\cdot,\cdot)$ with respect to the class $F$."

**(4) (12 pts)** Prove that $\mathcal{H}_B$ is universal in the sense of $d(\cdot,\cdot)$ with respect to the class $F$.
*Hint:* if $f: [0,1] \to \mathbb{R}$ is continuous then it is uniformly continuous; that is, for every $\epsilon > 0$ there exists $\delta > 0$ such that if $x_1, x_2 \in [0,1]$ satisfy $|x_1 - x_2| < \delta$ then necessarily $|f(x_1) - f(x_2)| < \epsilon$.

**Solution sketch:**
(Cross-reference: Moed B 2021 Q1 used these same piecewise-constant facts as given lemmas — here they are proven.)

**1.** With $w_i \geq 0$: each unit $\sigma(w_i x + b_i)$ is either constant (if $w_i = 0$) or a single left-closed step: $0$ for $x < -b_i/w_i$ and $1$ for $x \geq -b_i/w_i$. Sorting the $\leq B$ distinct thresholds gives $c_1 < \cdots < c_m$ ($m \leq B$). On each of the $\leq B+1$ intervals $[c_{j-1}, c_j)$ all indicators are fixed, so $h$ is constant there.

**2.** Given $g$ with values $\alpha_1, \ldots, \alpha_N$ and breakpoints $c_1 < \cdots < c_{N-1}$ ($N \leq B+1$), realize it as $h(x) = \alpha_1 + \sum_{j=1}^{N-1} (\alpha_{j+1} - \alpha_j)\, \sigma(x - c_j)$: take $b' = \alpha_1$, $w_j = 1 \geq 0$, $b_j = -c_j$, $v_j = \alpha_{j+1} - \alpha_j$, and $v_j = 0$ for unused units. On $[c_{j-1}, c_j)$ exactly the first $j-1$ steps are active and the sum telescopes to $\alpha_j$.

**3.** Definition: for every $f \in F$ and every $\epsilon > 0$ there exist $B \in \mathbb{N}$ and $h \in \mathcal{H}_B$ such that $d(f, h) \leq \epsilon$.

**4.** Given continuous $f$ and $\epsilon > 0$: uniform continuity on $[0,1]$ gives $\delta > 0$. Partition $[0,1]$ into $m = \lceil 1/\delta \rceil$ sub-intervals of length $< \delta$ and let $g$ be the step function equal to $f$'s value at (say) the left endpoint of each sub-interval. For every $x \in [0,1]$, $x$ is within $\delta$ of its sample point, so $|f(x) - g(x)| < \epsilon$. $g$ is piecewise constant with $\leq m + 1$ pieces, so by part (2) $g \in \mathcal{H}_B$ for $B = m$. Hence $d(f, g) \leq \epsilon$ and $\mathcal{H}_B$ (with $B$ depending on $\epsilon$, as the definition allows) is universal.

**💡 Useful tricks:** With $w_i\geq0$ each sign unit is a single left-closed step, so $\leq B$ thresholds ⇒ $\leq B+1$ pieces; to *realize* a target step function, telescope with jump weights $v_j=\alpha_{j+1}-\alpha_j$ and $b_j=-c_j$; universality of continuous functions runs through *uniform continuity* → partition $[0,1]$ into $<\delta$ pieces → step-approximate.

**⚠️ Watch out:** (1) handle the $w_i=0$ (constant unit) case, not just the step case; (2) give the *explicit* construction and verify the sum telescopes to $\alpha_j$ on each interval; (3) the formal definition needs "$\exists B$ (depending on $\epsilon$)"; (4) it's fine that $B$ grows with $1/\delta$ — the definition allows $B$ to depend on $\epsilon$.

## Q2 (35 pts) — Gradient flow on a depth-$N$ scalar linear network: balancedness and exponential convergence
**Topics:** gradient-flow, linear-nn, balancedness, conservation-laws, matrix-factorization | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_04_optimization_2, fodl_recitation_gradient_flow, fodl_recitation_optimization_1
**Statement (English translation):**
Let $y > 0$. Define the following loss function:

$$L: \mathbb{R} \to \mathbb{R}, \quad L(w) = \frac{1}{2}(w - y)^2$$

Denote by $\phi(\cdot)$ the objective function obtained when we over-parameterize $w$ with a linear network of depth $N \geq 2$ and width $1$ in all hidden layers:

$$\phi: \mathbb{R}^N \to \mathbb{R}, \quad \phi(w_1, \ldots, w_N) = L\big(\Pi_{i=1}^{N} w_i\big)$$

Suppose gradient flow is run over $\phi(\cdot)$ with initialization $w_1(0), \ldots, w_N(0) \in \mathbb{R}$, and denote by $w(t)$ the "end-to-end" scalar at time $t \geq 0$, i.e. $w(t) = \Pi_{i=1}^{N} w_i(t)$.

**(1) (10 pts)** Prove that $w_i(t)^2 - w_j(t)^2 = w_i(0)^2 - w_j(0)^2$ for all $i, j \in \{1, \ldots, N\}$ and all $t \geq 0$. Do not use claims from class during the solution.

Now assume that $w_i(0)^2 = w_j(0)^2$ for all $i, j \in \{1, \ldots, N\}$.

**(2) (10 pts)** Prove that $\frac{d}{dt} w(t) = -N\big(w(t) - y\big)\, w(t)^{2 - \frac{2}{N}}$. Do not use claims from class during the solution.

Let $w(0) = c$ and assume $c \in (0, y)$.

**(3) (5 pts)** Prove that $w(t) \geq c$ for all $t \geq 0$. You may use the fact that, in general, under gradient flow the objective function is monotonically non-increasing (as a function of $t$).

**(4) (10 pts)** Prove that:

$$\forall t \geq 0: \quad L(w(t)) \leq L(w(0)) \exp\left(-2N c^{2 - \frac{2}{N}} \cdot t\right)$$

i.e., the loss function converges to $0$ at an exponential rate. Do not use claims from class during the solution.
*Hint:* first show that $\frac{d}{dt} L(w(t)) = -L(w(t)) \cdot 2N w(t)^{2 - \frac{2}{N}}$.

**Solution sketch:**
(Identical to Moed B 2021 Q2 — see index/exams/fodl_exam_b_2021.md; only the point split differs: 10/10/5/10 instead of 12/12/6/12.)

**1.**

$$\frac{\partial \phi}{\partial w_i} = L'(w)\prod_{k \neq i} w_k$$

so under gradient flow

$$\frac{d}{dt} w_i^2 = 2 w_i \dot w_i = -2 L'(w) \prod_k w_k = -2 L'(w)\, w(t)$$

— identical for every $i$. Subtracting for $i, j$ gives $\frac{d}{dt}(w_i^2 - w_j^2) = 0$ (balancedness conservation law).

**2.** By (1), a balanced initialization stays balanced: $w_i(t)^2 = |w(t)|^{2/N}$ ($= w(t)^{2/N}$ in the $w(t) \geq 0$ regime considered). Product rule:

$$\dot w = \sum_i \big(\prod_{k \neq i} w_k\big) \dot w_i = -L'(w) \sum_i \big(\prod_{k \neq i} w_k\big)^2 = -L'(w) \sum_i w^2 / w_i^2 = -N L'(w)\, w^{2 - 2/N}$$

with $L'(w) = w - y$.

**3.** Gradient-flow monotonicity: $L(w(t)) \leq L(w(0)) = L(c)$, i.e. $|w(t) - y| \leq y - c$ (as $c \in (0, y)$), which gives $c \leq w(t) \leq 2y - c$.

**4.** Hint step:

$$\frac{d}{dt} L(w(t)) = (w - y)\dot w = -N (w - y)^2 w^{2 - 2/N} = -2 L(w(t)) \cdot N w(t)^{2 - 2/N}$$

Since $w(t) \geq c > 0$ by (3) and $2 - 2/N > 0$:

$$\frac{d}{dt} L(w(t)) \leq -2N c^{2 - 2/N} L(w(t))$$

Integrate ($\frac{d}{dt} \ln L \leq -2N c^{2-2/N}$, Grönwall) to obtain the exponential bound.

**💡 Useful tricks:** "Do not use claims from class" ⇒ derive balancedness from scratch: $\frac{d}{dt}w_i^2=-2L'(w)\,w$ is *identical for all $i$*, so differences are conserved; balanced init ⇒ $w_i^2=w^{2/N}$; the loss-monotonicity fact gives the barrier $w(t)\geq c$, which is what lets you lower-bound $w^{2-2/N}\geq c^{2-2/N}$; finish with $\frac{d}{dt}\ln L\leq -2Nc^{2-2/N}$ + Grönwall.

**⚠️ Watch out:** you may NOT cite the conservation law — prove it; the barrier from part 3 is essential (without $w(t)\geq c$ the exponential rate doesn't follow); mind signs — $c\in(0,y)$ keeps $w(t)\geq c>0$ so the power $w^{2-2/N}$ is well-defined and bounded below.

## Q3 (30 pts) — Generalization via a finite $\epsilon$-cover: Hoeffding on the cover, Lipschitz discretization transfer, and index-weighted bounds over a partition
**Topics:** covering-numbers, uniform-convergence, hoeffding, concentration, probability-tools, structural-risk-minimization | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2, lecture_08_generalization_3
**Statement (English translation):**
For an input space $\mathcal{X}$ and output space $\mathcal{Y}$, let $\mathcal{H} \subseteq \mathcal{Y}^{\mathcal{X}}$ be a hypothesis class and let $\mathcal{F} \subseteq \mathcal{H}$ be a *finite* subset of $\mathcal{H}$. Let $\epsilon > 0$. Assume that for every $h \in \mathcal{H}$ there exists $f \in \mathcal{F}$ such that:

$$|h(x) - f(x)| \leq \epsilon$$

(for every $x \in \mathcal{X}$; i.e., $\mathcal{F}$ is an $\epsilon$-cover of $\mathcal{H}$ in the sup metric).

Let $\mathcal{D}$ be a distribution (unknown) over $\mathcal{X} \times \mathcal{Y}$, let $S = \{(x_n, y_n)\}_{n=1}^{N}$ be a training sample of $N$ examples drawn i.i.d. from $\mathcal{D}$, and let $l: \mathcal{Y} \times \mathcal{Y} \to [0,1]$ be a loss function. For a hypothesis $h \in \mathcal{H}$, denote by $L_\mathcal{D}(h)$ the generalization error (i.e. $L_\mathcal{D}(h) := E_{(x,y) \sim \mathcal{D}}[l(h(x), y)]$) and by $L_S(h)$ the sample error (i.e. $L_S(h) := \frac{1}{N} \sum_{n=1}^{N} l(h(x_n), y_n)$).

**(1) (8 pts)** Derive a generalization bound based on uniform convergence for the class $\mathcal{F}$. That is, derive an expression $\Delta(N, \delta, |\mathcal{F}|)$ (whose dependence on the hypothesis class is only through $|\mathcal{F}|$) satisfying $\lim_{N \to \infty} \Delta(N, \delta, |\mathcal{F}|) = 0$, such that for every $\delta \in (0,1)$, with probability at least $1 - \delta$:

$$\forall f \in \mathcal{F}:\ L_\mathcal{D}(f) - L_S(f) \leq \Delta(N, \delta, |\mathcal{F}|)$$

*Reminder (Hoeffding bound):* let $A_1, \ldots, A_N$ be i.i.d. (independent, identically distributed) random variables bounded in the interval $[0,1]$. For every $\epsilon \geq 0$:

$$P\left(\left|\frac{1}{N}\sum_{i=1}^{N} A_i - E[A_1]\right| \geq \epsilon\right) \leq 2\exp(-2N\epsilon^2)$$

**(2) (11 pts)** Assume the loss function $l$ is $\rho$-Lipschitz with respect to its first variable, for some fixed $\rho > 0$. Derive a generalization bound for the class $\mathcal{H}$ based on the "discretization (compression) technique" learned in class. That is, using the previous part, prove that for every $\delta \in (0,1)$, with probability at least $1 - \delta$:

$$\forall h \in \mathcal{H}:\ L_\mathcal{D}(h) - L_S(h) \leq \Delta(N, \delta, |\mathcal{F}|) + 2\rho\epsilon$$

**(3) (11 pts)** Denote by $\mathcal{F}_1, \ldots, \mathcal{F}_R \subset \mathcal{F}$ an arbitrary partition of $\mathcal{F}$ into disjoint subsets; that is, $\mathcal{F}_1 \cup \cdots \cup \mathcal{F}_R = \mathcal{F}$ and $\mathcal{F}_i \cap \mathcal{F}_j = \emptyset$ for all $i \neq j \in \{1, \ldots, R\}$. Suppose we have at our disposal a learning algorithm which tends to return hypotheses $h \in \mathcal{H}$ for which $f \in \arg\min_{f \in \mathcal{F}} \|h - f\|_\infty$ lies in a set $\mathcal{F}_i$ with a relatively small index $i$. Derive a generalization bound similar to the bound of part 2, but suited to the use of this algorithm. That is, for $h \in \mathcal{H}$: the smaller the index $i$ of the set $\mathcal{F}_i$ in which the hypothesis of $\mathcal{F}$ closest to $h$ lies, the smaller the bound for $h$ should be.

**Solution sketch:**
**1.** Fix $f$: $A_n := l(f(x_n), y_n)$ are i.i.d. in $[0,1]$ with $E[A_1] = L_\mathcal{D}(f)$. Hoeffding gives

$$P(|L_S(f) - L_\mathcal{D}(f)| \geq \epsilon') \leq 2e^{-2N\epsilon'^2}$$

Union bound over the finite $\mathcal{F}$ and solve $2|\mathcal{F}| e^{-2N\epsilon'^2} = \delta$:

$$\Delta(N, \delta, |\mathcal{F}|) = \sqrt{\frac{\ln(2|\mathcal{F}|/\delta)}{2N}} \to 0$$

**2.** For $h \in \mathcal{H}$ take its cover point $f \in \mathcal{F}$ with $\sup_x |h(x) - f(x)| \leq \epsilon$. $\rho$-Lipschitzness of $l$ in its first argument gives $|l(h(x), y) - l(f(x), y)| \leq \rho\epsilon$ pointwise. Hence $L_\mathcal{D}(h) \leq L_\mathcal{D}(f) + \rho\epsilon$ and $L_S(f) \leq L_S(h) + \rho\epsilon$. On part 1's event:

$$L_\mathcal{D}(h) - L_S(h) \leq \big(L_\mathcal{D}(f) - L_S(f)\big) + 2\rho\epsilon \leq \Delta(N, \delta, |\mathcal{F}|) + 2\rho\epsilon$$

uniformly over $\mathcal{H}$, w.p. $\geq 1 - \delta$.

**3.** SRM-style confidence weighting over the cells: allocate $\delta_i := \delta \cdot 2^{-i}$ to $\mathcal{F}_i$ (so $\sum_{i=1}^{R} \delta_i < \delta$) and apply part 1 to each cell: w.p. $\geq 1 - \delta$, simultaneously $\forall i,\ \forall f \in \mathcal{F}_i$:

$$L_\mathcal{D}(f) - L_S(f) \leq \Delta(N, \delta 2^{-i}, |\mathcal{F}_i|)$$

For $h$, let $i(h)$ be the index of the cell containing its nearest cover point $f$ (which satisfies $\|h - f\|_\infty \leq \epsilon$ by the cover assumption). The Lipschitz transfer of part 2 gives

$$\boxed{\,L_\mathcal{D}(h) - L_S(h) \leq \Delta\big(N, \delta 2^{-i(h)}, |\mathcal{F}_{i(h)}|\big) + 2\rho\epsilon\,}$$

The bound strictly decreases as $i(h)$ decreases (larger confidence share $\delta 2^{-i}$; to make monotonicity in $i$ hold regardless of the cell sizes one may replace $|\mathcal{F}_{i(h)}|$ by $|\mathcal{F}|$), matching the algorithm's bias toward small-index cells.

**💡 Useful tricks:** A finite $\epsilon$-cover ⇒ Hoeffding + union on $\mathcal F$ only; transfer to *all* of $\mathcal H$ via the $2\rho\epsilon$ Lipschitz bridge; "algorithm prefers low-index cells" ⇒ SRM weight $\delta_i=\delta 2^{-i}$ per cell of the partition.

**⚠️ Watch out:** the transfer factor is $2\rho\epsilon$ — you pay $\rho\epsilon$ *twice* (once on $L_D$, once on $L_S$); the cover assumption is what guarantees a nearest $f$ within $\epsilon$; to force monotonicity in $i$ irrespective of cell sizes, put $|\mathcal F|$ (not $|\mathcal F_i|$) inside the log.
