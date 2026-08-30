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
**a.** Each neuron $\sigma(w_i x + b_i)$ with $w_i > 0$ is the step function $\mathbb{1}[x \ge -b_i/w_i]$ (constant if $w_i = 0$). Sorting the $\le B$ distinct thresholds $t_1 < \cdots < t_k$ partitions $\mathbb{R}$ into $\le B+1$ intervals $(-\infty,t_1), [t_1,t_2), \dots, [t_k,\infty)$ on which every neuron — hence the whole sum plus $b'$ — is constant. The half-open convention matches $\sigma(0)=1$.

**b.** Given $g$ with values $\alpha_1,\dots,\alpha_{N'}$ ($N' \le B+1$) and breakpoints $c_1 < \cdots < c_{N'-1}$: set $b' := \alpha_1$ and for $i \le N'-1$ take $w_i := 1$, $b_i := -c_i$, $v_i := \alpha_{i+1} - \alpha_i$ (unused neurons get $v_i := 0$). Since $\sigma(x - c_i) = \mathbb{1}[x \ge c_i]$, on $[c_{j-1},c_j)$ the network telescopes to $\alpha_1 + \sum_{i<j}(\alpha_{i+1}-\alpha_i) = \alpha_j$.

**c.** Definition: for every $f \in F$ and every $\epsilon > 0$ there exist $B \in \mathbb{N}$ and $h \in \mathcal{H}_B$ such that $d(f,h) \le \epsilon$ (i.e. wide-enough sign networks approximate every continuous function on $[0,1]$ in sup-distance to arbitrary accuracy).

**d.** Given $f \in F$ and $\epsilon > 0$: $f$ restricted to $[0,1]$ is uniformly continuous (hint). Pick $\delta$ for $\epsilon$, choose $B$ with $1/B < \delta$, and let $h$ be the piecewise constant function with breakpoints $c_j = j/B$ ($j=1,\dots,B$) taking value $f(j/B)$ on the piece containing $[j/B,(j+1)/B)$ (constant extension outside $[0,1]$). $h$ has $\le B+1$ constant segments, so $h \in \mathcal{H}_B$ by (b). Every $x \in [0,1]$ lies within distance $< \delta$ of its piece's anchor point, so $|f(x) - h(x)| < \epsilon$, giving $d(f,h) \le \epsilon$.

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
**a.** $\phi(U) = \phi(-U)$ for every $U$. If $\phi$ were convex, then $\phi(0) = \phi\big(\tfrac{1}{2}U + \tfrac{1}{2}(-U)\big) \le \tfrac{1}{2}\phi(U) + \tfrac{1}{2}\phi(-U) = \phi(U)$, making $0$ a global minimizer of $\phi$. But $W^*$ is PSD, so it has a square root $U^*$ with $U^*U^{*\top} = W^*$, and $\phi(U^*) = L(W^*) < L(0) = \phi(0)$ — contradiction.

**b.** Chain rule: $\nabla\phi(U) = \big[\nabla L(UU^\top) + \nabla L(UU^\top)^\top\big]U = 2\nabla L(W)U$ using the symmetry assumption. Gradient flow $\dot U = -\nabla\phi(U) = -2\nabla L(W)U$. Hence $\dot W = \dot U U^\top + U\dot U^\top = -2\big[\nabla L(W)\,UU^\top + UU^\top\,\nabla L(W)^\top\big] = -2[\nabla L(W)W + W\nabla L(W)]$.

**c.** $D(t)_{r,r} = v_r(t)^\top W(t)v_r(t)$. Differentiating: $\dot D_{r,r} = 2\dot v_r^\top W v_r + v_r^\top \dot W v_r = 2D_{r,r}(\dot v_r^\top v_r) + v_r^\top \dot W v_r$. Orthonormality gives $v_r^\top v_r \equiv 1 \Rightarrow \dot v_r^\top v_r = 0$ (and $Wv_r = D_{r,r}v_r$). Substituting (b): $v_r^\top \dot W v_r = -2\big[v_r^\top\nabla L(W)\,W v_r + v_r^\top W\,\nabla L(W)v_r\big] = -4D_{r,r}\,v_r^\top \nabla L(W) v_r = 4D_{r,r}\langle -\nabla L(W), v_rv_r^\top\rangle$.

**d.** Each eigenvalue evolves multiplicatively, $\dot\lambda_r = 4\lambda_r\langle-\nabla L, v_rv_r^\top\rangle$, so $\lambda_r(t) = \lambda_r(0)\exp\big(4\int_0^t \langle-\nabla L, v_rv_r^\top\rangle dz\big)$: eigenvalues cannot change sign and, starting from a near-zero initialization, all start (exponentially) tiny and move very slowly while small. An eigenvalue grows to significant size only after sustained exponential amplification along a persistently aligned descent direction. Eigenvalues are thus learned incrementally/sequentially. Since $L$ can be minimized with low-rank matrices, the flow can drive $L$ down while only a few eigenvalues leave the vicinity of $0$, so the end-to-end matrix is expected to be (approximately) low-rank — an implicit regularization toward low rank (unverified as a formal theorem; this is the expected qualitative explanation).

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
**a.** The class is finite: $|\mathcal{H}| \le k^p$ (each of $p$ parameters takes one of $k$ values). For a fixed $h$, apply Hoeffding to $A_i := l(h(x_i),y_i) \in [0,1]$ with $\mathbb{E}[A_1] = L_D(h)$: $P(|L_S(h) - L_D(h)| \ge \epsilon) \le 2e^{-2m\epsilon^2}$. Union bound over all $\le k^p$ hypotheses: $P(\exists h: |L_S(h)-L_D(h)| \ge \epsilon) \le 2k^p e^{-2m\epsilon^2}$. Setting this to $\delta$ and solving for $\epsilon$ gives $\Delta(m,\delta) = \sqrt{\dfrac{p\ln k + \ln(2/\delta)}{2m}}$, which is hypothesis-independent and $\to 0$ as $m \to \infty$.

**b.** The phenomenon taught in class (and reproduced in the homework): modern over-parameterized networks ($p \gg m$) can perfectly fit even random labels. So $\mathcal{H}$ contains hypotheses with $L_S \approx 0$ but $L_D \approx$ chance level, i.e. generalization gap of order a constant. A uniform-convergence bound must hold simultaneously for **all** $h \in \mathcal{H}$, including those memorizing hypotheses. Hence $\Delta(m,\delta)$ cannot be smaller than their (large) gap unless $m \gtrsim p\ln k$, which fails in practice. The bound above is vacuous at realistic sample sizes. The same trained architecture nonetheless generalizes well on real data: generalization is determined by *which* hypothesis the training algorithm (GD and its implicit regularization) selects, a fact invisible to bounds that are uniform over the entire class. Hence such bounds are inherently not tight for deep learning.

**💡 Useful tricks:** $p$ parameters × $k$ values ⇒ $|\mathcal H|\leq k^p$; Hoeffding + union then invert to $\Delta=\sqrt{(p\ln k+\ln(2/\delta))/2m}$; (b) invoke the Zhang-et-al. random-label experiments — the class contains memorizers with $L_S\approx0,\ L_D\approx$ chance.

**⚠️ Watch out:** (a) the log gives $p\ln k$ (not $\ln p$) — count $k^p$ carefully; (b) the argument is that UC must cover ALL $h$ including memorizers, so it can't beat their constant gap unless $m\gtrsim p\ln k$; the real point is generalization depends on *which* $h$ GD picks (implicit bias) — invisible to any uniform bound.
