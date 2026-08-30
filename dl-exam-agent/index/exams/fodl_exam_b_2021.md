# FODL Exam — Moed B 2021
**Date / semester:** 10.08.2021 — Semester B 2020/21 (תשפ"א), Moed B; School of CS, Tel Aviv University; lecturer: Dr. Nadav Cohen, TA: Noam Razin; 3 hours; 3 questions, max possible score 106
**Total points:** 106

## Q1 (42 pts) — Depth adds no expressiveness: sign networks with non-negative weights
**Topics:** depth-separation, hypothesis-class, sign-activation, piecewise-constant, non-negative-weights | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_B^L$ be the hypothesis class of a neural network with $L \geq 1$ hidden layers of width $B$, one-dimensional input and output (i.e. $X = Y = \mathbb{R}$, where $X$ is the input space and $Y$ the output space), sign activation function on the neurons of the hidden layers, and **non-negative weight matrices**. That is:

$$\mathcal{H}_B^L = \left\{ x \mapsto W_{L+1}\,\sigma\!\big(W_L\,\sigma(\cdots \sigma(W_1 x + b_1)\cdots) + b_L\big) + b_{L+1} \;:\; W_1 \in \mathbb{R}_{\geq 0}^{B,1},\, W_2,\ldots,W_L \in \mathbb{R}_{\geq 0}^{B,B},\, W_{L+1} \in \mathbb{R}_{\geq 0}^{1,B},\, b_1,\ldots,b_L \in \mathbb{R}^B,\, b_{L+1} \in \mathbb{R} \right\}$$

where $\sigma(z)_i$ equals one if $z_i > 0$ and zero otherwise, for every $z \in \mathbb{R}^B$ and $i \in \{1,\ldots,B\}$.

**(a) (7 pts)** Formally define the following expression: "$\mathcal{H}_B^L$ is expressively efficient with respect to $\mathcal{H}_B^1$."

**(b) (12 pts)** Prove that $\mathcal{H}_B^1 \subset \mathcal{H}_B^L$ for $B, L \in \mathbb{N}$.

We say that $g : \mathbb{R} \to \mathbb{R}$ is *piecewise constant* if there exist scalars $\alpha_1, \ldots, \alpha_N$ and $c_0 := -\infty < c_1 < \cdots < c_{N-1} < c_N := \infty$ such that $g(x) = \alpha_j$ on each interval $(c_{j-1}, c_j]$ (of course, for $j = N$ the interval is open on its right side as well). The minimal $N$ for which such scalars exist is called the *number of constant pieces* of $g$.

In the following sub-parts you may use the following facts:
- $\mathcal{H}_B^1$ equals the class of piecewise constant functions with at most $B+1$ constant pieces.
- For any $h_1, \ldots, h_B \in \mathcal{H}_B^1$ sharing the same first-layer parameter values ($W_1$ and $b_1$), there exist scalars $c_0 := -\infty < c_1 < \cdots < c_B < c_{B+1} := \infty$ for which $h_1, \ldots, h_B$ are all constant on each interval $(c_{j-1}, c_j]$ (again, for $j = B+1$ the interval is open on its right side as well).

**(c) (16 pts)** Prove that every function in $\mathcal{H}_B^L$ is piecewise constant with at most $B+1$ constant pieces.

*Hint:* First prove that, for any values of $W_1, W_2, b_1, b_2$, the vector-valued function defined by $g(x) := W_2\,\sigma(W_1 x + b_1) + b_2$ is piecewise constant with at most $B+1$ constant pieces, i.e. there exist scalars $c_0 := -\infty < c_1 < \cdots < c_B < c_{B+1} := \infty$ for which the (vector) output $g(x)$ is constant on each interval $(c_{j-1}, c_j]$.

**(d) (7 pts)** Is $\mathcal{H}_B^L$ expressively efficient with respect to $\mathcal{H}_B^1$? Explain.

**Solution sketch:**
**a.** Use the course definition (Lecture 1, Def 2): $\{\mathcal{H}_B^L\}_{B}$ is expressively efficient w.r.t. $\{\mathcal{H}_B^1\}_{B}$ if (i) $\forall B\ \exists \bar{B} \in O(B)$ with $\mathcal{H}_B^1 \subseteq \mathcal{H}_{\bar{B}}^L$, and (ii) there exists $\bar h \in \mathcal{H}_{\bar B}^L$ (for reasonable $\bar B$) with $\bar h \notin \mathcal{H}_B^1$ unless $B$ is prohibitively large. (State (i) with $\bar B \in O(B)$ exactly — writing $\mathrm{poly}(B)$ deviates from Def 2 and can cost points on a 7-pt "define formally" item.)

**b.** Hidden activations lie in $\{0,1\}^B$ and $\sigma$ acts as the identity on $\{0,1\}$-vectors ($\sigma(v) = v$ for $v \in \{0,1\}^B$). So take the given depth-1 net's first layer, insert $L-1$ "pass-through" layers $W_i = I_B \geq 0$, $b_i = 0$ (non-negativity respected), and reuse the original output layer.

**c.** Hint step: each pre-activation coordinate $(W_1)_{i,1}\,x + (b_1)_i$ is non-decreasing in $x$ because $(W_1)_{i,1} \geq 0$, hence crosses $0$ at most once — giving at most $B$ breakpoints $c_1 < \cdots < c_B$. Thus $\sigma(W_1 x + b_1)$, and hence $g(x) = W_2\sigma(W_1x+b_1)+b_2$, is constant on each of the $\leq B+1$ intervals. Conclusion: the whole network is (rest of the network) $\circ$ (first two layers' pre-composition). Since the map $x \mapsto \sigma(W_1x+b_1)$ is constant on each of the $\leq B+1$ intervals, applying any further (fixed) layers keeps the output constant on the same intervals — no new breakpoints can appear. Hence $\leq B+1$ pieces for any $L$.

**d.** No. By (c), $\mathcal{H}_B^L \subseteq \{$piecewise constant, $\leq B+1$ pieces$\} = \mathcal{H}_B^1$ (given fact), and combined with (b), $\mathcal{H}_B^L = \mathcal{H}_B^1$. Depth-$L$ functions are replicated in depth 1 with the *same* width $B$. So the super-polynomial-blowup requirement of expressive efficiency fails. (Non-negativity of weights kills the usual depth separation.)

**💡 Useful tricks:** Constrained weights + sign activation cue a depth-collapse result: non-negative weights make pre-activations monotone in $x$, so each neuron adds $\leq 1$ breakpoint; identity pass-through layers ($\sigma(v)=v$ on $\{0,1\}^B$) give inclusions (Lecture 1 Def 2, Lecture 2).

**⚠️ Watch out:** (a) write $\bar B \in O(B)$, not $\mathrm{poly}(B)$; (b) verify inserted layers satisfy $W_i \geq 0$; (c) explicitly argue later layers add no breakpoints; (d) prove equality $\mathcal{H}_B^L = \mathcal{H}_B^1$ — a bare "No" scores little.

## Q2 (42 pts) — Gradient flow on a depth-$N$ scalar linear network: balancedness and exponential convergence
**Topics:** gradient-flow, linear-nn, balancedness, conservation-laws, matrix-factorization | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_04_optimization_2, fodl_recitation_gradient_flow, fodl_recitation_optimization_1
**Statement (English translation):**
Let $y > 0$. Define the loss function:

$$L : \mathbb{R} \to \mathbb{R}, \quad L(w) = \frac{1}{2}(w - y)^2$$

Denote by $\phi(\cdot)$ the objective obtained when we overparameterize $w$ with a linear network of depth $N \geq 2$ and width 1 in all hidden layers:

$$\phi : \mathbb{R}^N \to \mathbb{R}, \quad \phi(w_1, \ldots, w_N) = L\big(\Pi_{i=1}^N w_i\big)$$

Suppose gradient flow is run over $\phi(\cdot)$ with initialization $w_1(0), \ldots, w_N(0) \in \mathbb{R}$, and denote by $w(t)$ the "end-to-end" scalar at time $t \geq 0$, i.e. $w(t) = \Pi_{i=1}^N w_i(t)$.

**(a) (12 pts)** Prove that $w_i(t)^2 - w_j(t)^2 = w_i(0)^2 - w_j(0)^2$ for all $i, j \in \{1, \ldots, N\}$ and $t \geq 0$. Do not use claims from class in the solution.

Now assume that $w_i(0)^2 = w_j(0)^2$ for all $i, j \in \{1, \ldots, N\}$.

**(b) (12 pts)** Prove that $\frac{d}{dt} w(t) = -N\big(w(t) - y\big)\, w(t)^{2 - \frac{2}{N}}$. Do not use claims from class in the solution.

Let $w(0) = c$ and assume $c \in (0, y)$.

**(c) (6 pts)** Prove that $w(t) \geq c$ for all $t \geq 0$. You may use the fact that, in general, under gradient flow the objective function is monotonically non-increasing (as a function of $t$).

**(d) (12 pts)** Prove that:

$$\forall t \geq 0: \quad L(w(t)) \leq L(w(0)) \exp\left(-2N c^{2-\frac{2}{N}} \cdot t\right)$$

i.e., the loss converges to 0 at an exponential rate. Do not use claims from class in the solution.

*Hint:* First show that $\frac{d}{dt} L(w(t)) = -L(w(t)) \cdot 2N w(t)^{2-\frac{2}{N}}$.

**Solution sketch:**
**a.**

$$\frac{\partial \phi}{\partial w_i} = L'(w)\prod_{k \neq i} w_k$$

So under gradient flow

$$\begin{aligned} \frac{d}{dt}w_i^2 &= 2w_i\dot{w}_i \\ &= -2L'(w)\prod_k w_k \\ &= -2L'(w)\,w(t) \end{aligned}$$

— identical for every $i$. Subtracting for $i,j$ gives $\frac{d}{dt}(w_i^2 - w_j^2) = 0$ (balancedness conservation).

**b.** By (a), balanced initialization stays balanced: $w_i(t)^2 = w_j(t)^2$ for all $t$. Hence $w_i(t)^2 = |w(t)|^{2/N}$ ($= w(t)^{2/N}$ in the regime $w(t) \geq 0$ considered). Product rule:

$$\begin{aligned} \dot{w} &= \sum_i \big(\prod_{k\neq i} w_k\big)\dot{w}_i \\ &= -L'(w)\sum_i \big(\prod_{k\neq i}w_k\big)^2 \\ &= -L'(w)\sum_i w^2/w_i^2 \\ &= -L'(w)\, N\, w^{2-2/N} \end{aligned}$$

and $L'(w) = w - y$.

**c.** Gradient flow monotonicity: $L(w(t)) \leq L(w(0)) = L(c)$, i.e. $(w(t)-y)^2 \leq (c-y)^2$, i.e. $|w(t) - y| \leq y - c$ (as $c \in (0,y)$), which directly gives $c \leq w(t) \leq 2y - c$.

**d.** Hint:

$$\begin{aligned} \frac{d}{dt}L(w(t)) &= (w-y)\dot{w} \\ &= -N(w-y)^2 w^{2-2/N} \\ &= -2L(w(t))\cdot N w(t)^{2-2/N} \end{aligned}$$

Since $w(t) \geq c > 0$ by (c) and $2 - 2/N > 0$:

$$\frac{d}{dt}L(w(t)) \leq -2Nc^{2-2/N} L(w(t))$$

Integrate (Grönwall / $\frac{d}{dt}\ln L \leq -2Nc^{2-2/N}$) to get the exponential bound.

**💡 Useful tricks:** "Do not use claims from class" ⇒ derive balancedness directly: $\frac{d}{dt}w_i^2=-2L'(w)w$ is identical for all $i$; balanced init ⇒ $w_i^2=w^{2/N}$; loss-monotonicity gives the barrier $w(t)\geq c$, which lower-bounds $w^{2-2/N}\geq c^{2-2/N}$; finish with $\frac{d}{dt}\ln L\leq-2Nc^{2-2/N}$ + Grönwall. (Identical to Moed C 2024 Q2.)

**⚠️ Watch out:** prove the conservation law — you may not cite it; the part-(c) barrier is essential to the exponential rate; keep $w(t)\geq c>0$ so the power is well-defined; the factor is $2N$ (from $\frac{d}{dt}L=-2L\cdot Nw^{2-2/N}$), not $N$.

## Q3 (22 pts) — Norm-adaptive Rademacher generalization bound via union over radii
**Topics:** rademacher, uniform-convergence, norm-bounds, probability-tools, implicit-regularization | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2, fodl_recitation_optimization_2_radamacher
**Statement (English translation):**
Let $\mathcal{H} = \{h_\theta : \theta \in \mathbb{R}^p\}$ be the hypothesis class of a neural network with some architecture, where $\theta$ represents the concatenation of the network's parameter values as a vector. Denote the network's input space by $X$ and its output space by $Y$. Let $D$ be an (unknown) distribution over $X \times Y$, let $S = \{(x_i, y_i)\}_{i=1}^m$ be a training sample of $m$ examples drawn i.i.d. from $D$, and let $l : Y \times Y \to [0,1]$ be a loss function. For $h_\theta \in \mathcal{H}$, denote by $L_D(h_\theta)$ the generalization error (i.e. $L_D(h_\theta) := \mathbb{E}_{(x,y)\sim D}[l(h_\theta(x), y)]$) and by $L_S(h_\theta)$ the sample error (i.e. $L_S(h_\theta) := \frac{1}{m}\sum_{i=1}^m l(h_\theta(x_i), y_i)$).

**(a) (12 pts)** For every $r \in \mathbb{R}$ define $\mathcal{H}_r = \{h_\theta \in \mathcal{H} : \|\theta\| \leq r,\ \theta \in \mathbb{R}^p\} \subset \mathcal{H}$ (the notation $\|\cdot\|$ stands for the Euclidean norm). It is given that for every $r \in \mathbb{R}$: $R(l \circ \mathcal{H}_r \circ S) \leq \frac{r}{\sqrt{m}}$, where $R(l \circ \mathcal{H}_r \circ S)$ is the Rademacher complexity of the set:

$$l \circ \mathcal{H}_r \circ S := \{(l(h_\theta(x_1), y_1), \ldots, l(h_\theta(x_m), y_m)) : h_\theta \in \mathcal{H}_r\}$$

Prove that for every $\delta \in (0,1)$, with probability greater than or equal to $1 - \delta$:

$$\forall h_\theta \in \mathcal{H}: \quad L_D(h_\theta) - L_S(h_\theta) \leq \frac{2(\|\theta\| + 1)}{\sqrt{m}} + 4\sqrt{\frac{2 \cdot \ln\left(\frac{2\pi^2(\|\theta\|+1)^2}{3\delta}\right)}{m}}$$

During the solution you may use the reminder below and the fact $\sum_{k=1}^\infty \frac{1}{k^2} = \frac{\pi^2}{6}$; beyond that, do not use claims from class.

*Reminder (Rademacher-complexity-based generalization bound):* for a hypothesis class $\mathcal{H}$, for every $\delta \in (0,1)$, with probability greater than or equal to $1-\delta$:

$$\forall h \in \mathcal{H}: \quad L_D(h) - L_S(h) \leq 2R(l \circ \mathcal{H} \circ S) + 4\sqrt{\frac{2 \cdot \ln(4/\delta)}{m}}$$

**(b) (10 pts)** Denote by $GD(S) \in \mathcal{H}$ the hypothesis obtained from running gradient descent to minimize the sample error $L_S(\cdot)$. For the learned hypothesis, when the number of examples in the sample is increased, does the bound proven in the previous sub-part necessarily become smaller? That is, for a sample $S'$ with $|S'| > |S| = m$, will the bound for $GD(S')$ necessarily be smaller than the one obtained for $GD(S)$? Justify your answer.

**Solution sketch:**
**a.** For each integer $k \in \mathbb{N}$ apply the reminder bound to the restricted class $\mathcal{H}_k$ with confidence budget $\delta_k := \frac{6\delta}{\pi^2 k^2}$. Note $\sum_{k=1}^\infty \delta_k = \delta$ by the Basel fact. So a union bound gives all events simultaneously w.p. $\geq 1 - \delta$. On that event, for all $k$: $\forall h_\theta \in \mathcal{H}_k$, gap

$$\leq \frac{2k}{\sqrt m} + 4\sqrt{\frac{2\ln(4/\delta_k)}{m}}$$

and $4/\delta_k = \frac{2\pi^2 k^2}{3\delta}$ — exactly the log term in the target. For arbitrary $h_\theta$, choose $k := \lceil \|\theta\| \rceil + 1$ if $\lceil\|\theta\|\rceil = 0$ else $k := \lceil\|\theta\|\rceil$. Then $h_\theta \in \mathcal{H}_k$ and $k \leq \|\theta\| + 1$. Monotonicity of both terms in $k$ yields the claimed bound with $\|\theta\|+1$.

**b.** Not necessarily. The bound depends on $m$ *and* on the norm $\|\theta\|$ of the learned hypothesis. With a larger sample $S'$, gradient descent may converge to parameters of larger norm (fitting more examples typically requires larger $\|\theta\|$). So growth of $\|\theta(GD(S'))\|$ can outweigh the $1/\sqrt{m}$ decrease. Concluding point: the bound is *a posteriori* (data/algorithm dependent) — nothing in it is monotone in $m$ alone.

**💡 Useful tricks:** "Make the bound depend on the learned norm $\|\theta\|$" ⇒ union over radius shells $\mathcal H_k$ ($k\in\mathbb N$) with Basel weights $\delta_k=\frac{6\delta}{\pi^2k^2}$ (sum to $\delta$); then pick $k=\lceil\|\theta\|\rceil$ so $h_\theta\in\mathcal H_k$ and $k\leq\|\theta\|+1$; substitute $4/\delta_k$ into the log to hit the target expression.

**⚠️ Watch out:** the shell index runs over infinite $\mathbb N$, so weights must be *summable* (uniform split is impossible); handle the $\lceil\|\theta\|\rceil=0$ edge case (take $k=1$); (b) the answer is "NOT necessarily" — more data can push $\|\theta(GD(S'))\|$ up, and the bound isn't monotone in $m$ alone (this a-posteriori nature is the point).
