# FODL Exam — Moed B 2022
**Date / semester:** 17.08.2022, Semester B 2021/22 (תשפ"ב); lecturer Dr. Nadav Cohen, TA Noam Razin; 3 hours, no aid material
**Total points:** 110

## Q1 (37 pts) — Leaky-ReLU networks: piecewise-linear expressiveness and depth separation
**Topics:** depth-separation, hypothesis-class, universality, piecewise-linear | **Pillar:** Expressiveness | **Difficulty:** 4
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_M^L$ be the hypothesis class of neural networks with $L \ge 1$ hidden layers of width $M \in \mathbb{N}$, one-dimensional input and output ($X = Y = \mathbb{R}$, where $X$ is the input space and $Y$ the output space), and Leaky-ReLU activation with parameter $\alpha \in (0,1)$ on the hidden-layer neurons. That is:

$$\mathcal{H}_M^L = \left\{ x \mapsto W_{L+1}\,\phi_\alpha\big(W_L\,\phi_\alpha(\cdots \phi_\alpha(W_1 x + b_1)\cdots) + b_L\big) + b_{L+1} \ :\ W_1 \in \mathbb{R}^{M,1},\ W_2,\dots,W_L \in \mathbb{R}^{M,M},\ W_{L+1} \in \mathbb{R}^{1,M},\ b_1,\dots,b_L \in \mathbb{R}^M,\ b_{L+1} \in \mathbb{R} \right\}$$

where $\phi_\alpha(z)_m = \max\{z_m,\ \alpha\cdot z_m\}$ for every $z \in \mathbb{R}^M$ and $m \in \{1,\dots,M\}$.

**a. (5 pts)** Define what a "piecewise linear" function from $\mathbb{R}$ to $\mathbb{R}$ is, and what "the number of its linear segments" is.

**b. (5 pts)** Prove that every $h \in \mathcal{H}_M^1$ is piecewise linear with at most $M+1$ linear segments.

Denote by $\widehat{\mathcal{H}}_M^L$ the hypothesis class obtained from $\mathcal{H}_M^L$ by replacing the activation function in the networks from Leaky-ReLU to ReLU.

**c. (10 pts)** For $M \ge 2$, let $f: \mathbb{R} \to \mathbb{R}$ be a piecewise linear function with at most $M$ linear segments. Prove that $f \in \mathcal{H}_{2M}^L$ for every $L \in \mathbb{N}$. You may use without proof the fact that $f \in \widehat{\mathcal{H}}_M^L$ for every $L \in \mathbb{N}$, but other claims from the lectures or recitations must be proven.

**d. (10 pts)** For $L \ge 2$, prove that $\mathcal{H}_M^L$ is expressively exponentially more efficient in $L$ relative to $\mathcal{H}_M^1$. That is, show that:
1. For every $M \in \mathbb{N}$ there exists $\bar M \in \mathbb{N}$ with $\bar M = O(M)$ such that $\mathcal{H}_M^1 \subset \mathcal{H}_{\bar M}^L$;
2. There exist $\bar M \in \mathbb{N}$, a constant independent of $L$, and $h \in \mathcal{H}_{\bar M}^L$ such that $h \notin \mathcal{H}_M^1$ unless $M = \Omega(2^L)$.

**e. (7 pts)** If we were to set the parameter $\alpha$ of the Leaky-ReLU activation to be equal to $1$, would the expressive efficiency proven in sub-part d still hold? Prove your answer.

**Solution sketch:**
**a.** $f$ is piecewise linear if it is continuous and $\mathbb{R}$ can be partitioned into finitely many intervals on each of which $f$ is affine. The number of linear segments is the minimal number of intervals in such a partition (equivalently, number of maximal affine pieces = number of breakpoints + 1).

**b.** A depth-1 net is $x \mapsto \sum_{m=1}^M u_m\phi_\alpha(w_m x + b_m) + c$. Each neuron is piecewise linear with at most one breakpoint (at $-b_m/w_m$ if $w_m \ne 0$). A sum of such functions is piecewise linear with breakpoints contained in the union — at most $M$ breakpoints, hence at most $M+1$ segments.

**c.** Key identity: $\mathrm{ReLU}(z) = \frac{1}{1-\alpha^2}\big(\phi_\alpha(z) + \alpha\,\phi_\alpha(-z)\big)$ (check separately for $z\ge0$, $z<0$). Take the ReLU network of width $M$ realizing $f$ (the allowed fact $f \in \widehat{\mathcal{H}}_M^L$) and replace each ReLU neuron by a pair of Leaky-ReLU neurons fed with pre-activations $z$ and $-z$ (duplicate the incoming row/bias with a sign flip). Absorb the coefficients $\frac{1}{1-\alpha^2}, \frac{\alpha}{1-\alpha^2}$ into the outgoing weights. Width doubles to $2M$, depth and computed function are unchanged. So $f \in \mathcal{H}_{2M}^L$.

**d1.** By (b), any $h \in \mathcal{H}_M^1$ is piecewise linear with $\le M+1$ segments. By (c) applied with $M+1$ in place of $M$, $h \in \mathcal{H}_{2(M+1)}^L$, i.e. $\bar M = 2M+2 = O(M)$.

**d2.** Telgarsky-style triangle wave: let $\Delta$ be the "hat" function (3 segments, e.g. peak $1$ at $1/2$, zero outside $[0,1]$). By (c), $\Delta \in \mathcal{H}_{\bar M}^1$ for a constant width $\bar M$ (e.g. $\bar M = 6$). The $L$-fold composition $\Delta^{\circ L}$ lies in $\mathcal{H}_{\bar M}^L$ (stack the depth-1 blocks and merge each block's output layer with the next block's input layer — a product of two weight matrices), and it is a sawtooth with $\Omega(2^L)$ linear segments. By (b), members of $\mathcal{H}_M^1$ have $\le M+1$ segments. So $\Delta^{\circ L} \notin \mathcal{H}_M^1$ unless $M = \Omega(2^L)$.

**e.** No. With $\alpha = 1$, $\phi_1(z) = \max\{z,z\} = z$ is the identity. So every network in $\mathcal{H}_M^L$ collapses to a composition of affine maps, i.e. an affine function, for all $L, M$. Then every $h \in \mathcal{H}_{\bar M}^L$ is affine and already lies in $\mathcal{H}_1^1 \subseteq \mathcal{H}_M^1$ for every $M$. So condition (2) fails — there is no depth efficiency at all (condition (1) still holds trivially).

**💡 Useful tricks:** Depth-1 = PWL with $\leq M+1$ segments (one breakpoint per unit); the identity $\mathrm{ReLU}(z)=\frac1{1-\alpha^2}(\phi_\alpha(z)+\alpha\phi_\alpha(-z))$ simulates each ReLU with *two* leaky units (width doubles to $2M$); a hat function composed $L$ times is a sawtooth with $\Omega(2^L)$ segments; segment-counting is the separation lower bound.

**⚠️ Watch out:** (c) duplicate each pre-activation with a sign flip and absorb the $\frac1{1-\alpha^2}$ constants downstream; (d) prove BOTH the $O(M)$ containment and the $\Omega(2^L)$ hardness; (e) the answer *flips* at $\alpha=1$ — leaky-ReLU becomes the identity, everything is affine, and all depth efficiency vanishes.

## Q2 (40 pts) — Balanced gradient flow on one-hidden-layer ReLU nets: sign preservation and an unreachable loss level
**Topics:** gradient-flow, balancedness, conservation-laws, initialization, implicit-bias | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_04_optimization_2, fodl_recitation_gradient_flow, fodl_recitation_optimization_1
**Statement (English translation):**
Let $\mathcal{H}$ be a hypothesis class of neural networks with one hidden layer of width $M \in \mathbb{N}$, $D \in \mathbb{N}$-dimensional input, one-dimensional output (i.e. $X = \mathbb{R}^D$, $Y = \mathbb{R}$), ReLU activation on the hidden-layer neurons, and no biases. Formally:

$$\mathcal{H} = \left\{ x \mapsto \sum_{m=1}^{M} v_m\,\phi(\langle w_m, x\rangle)\ :\ w_1,\dots,w_M \in \mathbb{R}^D,\ v_1,\dots,v_M \in \mathbb{R} \right\}$$

where $\phi:\mathbb{R}\to\mathbb{R}$ is the ReLU activation. Denote by $\theta := (w_1,\dots,w_M,v_1,\dots,v_M) \in \mathbb{R}^{MD+M}$ the network's parameter vector and by $h_\theta:\mathbb{R}^D\to\mathbb{R}$ the mapping it realizes, i.e. $h_\theta(x) := \sum_{m=1}^M v_m\phi(\langle w_m,x\rangle)$.

Given a continuously differentiable loss $\ell:\mathbb{R}\times\mathbb{R}\to\mathbb{R}_{\ge0}$ and a sample $\{(x_n,y_n)\}_{n=1}^N \subset (X\times Y)^N$, define the empirical loss over the network parameters:

$$\mathcal{L}(\theta) := \sum_{n=1}^{N} \ell(h_\theta(x_n), y_n)$$

Suppose gradient flow is run over $\mathcal{L}$ with initialization $\theta(0) \in \mathbb{R}^{MD+M}$. Denote by $\theta(t)$, and correspondingly $\{w_m(t), v_m(t)\}_{m=1}^M$, the network parameters at time $t \ge 0$. For simplicity, you may assume the flow exists and is unique, and that $\frac{d}{dz}\phi(0) := 0$, i.e. the non-differentiability of ReLU at $0$ does not "disturb".

**a. (6 pts)** Prove that for every $m \in \{1,\dots,M\}$:
$$\frac{d}{dt}\big(v_m(t)^2\big) = \frac{d}{dt}\big(\|w_m(t)\|^2\big) = -2\sum_{n=1}^N \ell'\big(h_{\theta(t)}(x_n), y_n\big)\cdot v_m(t)\cdot \phi(\langle w_m(t), x_n\rangle)$$
where $\ell'$ is the derivative of $\ell$ with respect to its first argument.

**b. (12 pts)** Assume the initialization $\theta(0)$ is balanced in the sense that $v_m(0)^2 = \|w_m(0)\|^2$ for every $m \in \{1,\dots,M\}$. For $m \in \{1,\dots,M\}$, denote $\sigma_m(t) := |v_m(t)|\cdot\|w_m(t)\|$. Prove that if $v_m(t) \neq 0$ then:
$$\frac{d}{dt}\big(\sigma_m(t)^2\big) = \sigma_m(t)^2\left[-4\sum_{n=1}^N \ell'\big(h_{\theta(t)}(x_n), y_n\big)\cdot \frac{v_m(t)}{|v_m(t)|}\cdot \phi\left(\left\langle \frac{w_m(t)}{\|w_m(t)\|},\, x_n\right\rangle\right)\right]$$
and otherwise, if $v_m(t) = 0$, then $\frac{d}{dt}(\sigma_m(t)^2) = 0$.

**c. (14 pts)** Assume the initialization $\theta(0)$ is balanced as in the previous sub-part. In addition, for $m \in \{1,\dots,M\}$, assume $v_m(0) > 0$. Prove that $v_m(t)$ does not change sign throughout the optimization, i.e. $v_m(t) > 0$ for all $t \ge 0$.

*Guidance (הדרכה):* Assume by contradiction that there exists a time $\bar t$ at which $v_m(\bar t) \le 0$. For the first time point at which $v_m(t)$ vanishes, $t_0 := \min\{t \in \mathbb{R}_{\ge0} : v_m(t) = 0\}$, consider the interval $[0, t_0)$. Use the expression for $\frac{d}{dt}(\sigma_m(t)^2)$ from the previous sub-part to show that over this time interval there exists a continuous and **bounded** $g:[0,t_0)\to\mathbb{R}$ such that $\sigma_m(t)^2 = \sigma_m(0)^2\cdot\exp\big(\int_0^t g(z)\,dz\big)$. Deduce from this that it cannot be that $v_m(t_0) = 0$, and therefore $v_m(t) > 0$ for all $t \ge 0$. Every step of the proof must be justified.

Now assume $\mathcal{L}(\theta) = \sum_{n=1}^N (h_\theta(x_n) - y_n)^2$, that the initialization $\theta(0)$ is balanced as in sub-parts b and c, and that $v_m(0) > 0$ for every $m \in \{1,\dots,M\}$.

**d. (8 pts)** Prove that if there exists an example with a negative label, i.e. $\bar n \in \{1,\dots,N\}$ with $y_{\bar n} < 0$, then there exists $\epsilon > 0$ for which gradient flow cannot reach an empirical loss smaller than $\epsilon$; namely, there is no $t \ge 0$ for which $\mathcal{L}(\theta(t)) < \epsilon$.

*Hint:* Use the result of sub-part c.

**Solution sketch:**
**a.** Gradient flow gives $\dot v_m = -\sum_n \ell'(\cdot)\phi(\langle w_m,x_n\rangle)$, $\dot w_m = -\sum_n \ell'(\cdot)\,v_m\,\phi'(\langle w_m,x_n\rangle)\,x_n$. Then $\frac{d}{dt}v_m^2 = 2v_m\dot v_m$, $\frac{d}{dt}\|w_m\|^2 = 2\langle w_m,\dot w_m\rangle$, and the ReLU homogeneity identity $z\phi'(z) = \phi(z)$ makes both expressions coincide with the stated one.

**b.** By (a), $v_m(t)^2 - \|w_m(t)\|^2$ is conserved. So balancedness persists: $|v_m(t)| = \|w_m(t)\|$ and $\sigma_m = v_m^2$. Differentiate $\sigma_m^2 = v_m^2\|w_m\|^2$ by the product rule, substitute (a), and use positive 1-homogeneity $\phi(\langle w_m,x\rangle) = \|w_m\|\,\phi(\langle w_m/\|w_m\|,x\rangle)$ (valid since $v_m \ne 0 \Rightarrow w_m \ne 0$). The identity $v_m^3\|w_m\| = \sigma_m^2\cdot\frac{v_m}{|v_m|}$ yields the stated ODE. If $v_m(t) = 0$ then $w_m(t) = 0$ by balancedness, and both derivatives in (a) vanish. So $\frac{d}{dt}\sigma_m^2 = 0$.

**c.** If $v_m(\bar t)\le 0$ for some $\bar t$, continuity (IVT) gives a zero of $v_m$. The set $\{t: v_m(t)=0\}$ is closed and nonempty so $t_0 := \min$ exists, with $v_m > 0$ on $[0,t_0)$. On $[0,t_0)$, part (b) holds with $g(t) := -4\sum_n \ell'(h_{\theta(t)}(x_n),y_n)\,\phi(\langle w_m(t)/\|w_m(t)\|,x_n\rangle)$, which is continuous and bounded ($\theta(t)$ continuous on the compact $[0,t_0]$, $\ell'$ continuous, normalized $w_m$ has unit norm so $\phi(\langle\cdot,x_n\rangle)\le\|x_n\|$). Solving the linear ODE $\frac{d}{dt}\sigma_m^2 = g\,\sigma_m^2$: $\sigma_m(t)^2 = \sigma_m(0)^2 e^{\int_0^t g}\ \ge\ \sigma_m(0)^2 e^{-\sup|g|\,t_0} > 0$ on $[0,t_0)$ (note $\sigma_m(0)^2 = v_m(0)^4 > 0$). By continuity $\sigma_m(t_0)^2 > 0$, contradicting $\sigma_m(t_0) = |v_m(t_0)|\|w_m(t_0)\| = 0$. Hence $v_m(t) > 0$ for all $t$.

**d.** By (c), $v_m(t) > 0$ for all $m,t$, and $\phi \ge 0$. So $h_{\theta(t)}(x) \ge 0$ for every $x$. Then $\mathcal{L}(\theta(t)) \ge (h_{\theta(t)}(x_{\bar n}) - y_{\bar n})^2 \ge y_{\bar n}^2 > 0$ since $h \ge 0 > y_{\bar n}$. Take $\epsilon := y_{\bar n}^2$: no $t \ge 0$ achieves $\mathcal{L}(\theta(t)) < \epsilon$.

**💡 Useful tricks:** Homogeneity $z\phi'(z)=\phi(z)$ ⇒ balancedness $v_m^2-\|w_m\|^2$ conserved; write $\sigma_m^2$'s ODE as $\frac{d}{dt}\sigma_m^2=g(t)\sigma_m^2$ with $g$ *bounded*, so $\sigma_m^2=\sigma_m(0)^2e^{\int g}>0$ never reaches $0$ ⇒ sign of $v_m$ is preserved; then $v_m>0,\ \phi\geq0\Rightarrow h\geq0$, so a negative label is unreachable.

**⚠️ Watch out:** (c) run the argument on $[0,t_0)$ up to the *first* vanishing time and get the contradiction from $g$ being bounded (needs $\theta(t)$ continuous on a compact, normalized $w_m$); (b) requires $v_m\neq0$ (balancedness then forces $w_m\neq0$ too); (d) the loss floor $y_{\bar n}^2$ is an *optimization* failure from sign-locked init, not a landscape/expressiveness obstruction.

## Q3 (33 pts) — Implicit bias of GD toward minimum norm & a complexity-adaptive generalization bound
**Topics:** implicit-bias, min-norm, gradient-descent, implicit-regularization, uniform-convergence, norm-bounds | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_09_generalization_4, lecture_06_generalization_1
**Statement (English translation):**
For input space $X = \mathbb{R}^D$ and output space $Y = \mathbb{R}$, let $S = \{(x_n,y_n)\}_{n=1}^N \subset (X\times Y)^N$ be a training sample of $N$ examples drawn i.i.d. from an (unknown) distribution $D$ over $X \times Y$.

**a. (15 pts)** For this sub-part only, assume $D > N$ and that the inputs $\{x_n\}_{n=1}^N$ are linearly independent. Given a differentiable and **invertible** function $\ell:\mathbb{R}\to\mathbb{R}_{\ge0}$, suppose we learn a linear classifier by running gradient descent over the following loss function:

$$\mathcal{L}: \mathbb{R}^D \to \mathbb{R}_{\ge0}\ ,\quad \mathcal{L}(w) = \frac{1}{N}\sum_{n=1}^N \ell(\langle x_n, w\rangle - y_n)$$

Denote by $w(t) \in \mathbb{R}^D$ the parameter vector at iteration $t \in \{0,1,\dots\}$ of gradient descent, and assume $w(0) = 0$. For some arbitrary fixed $\bar t \in \{0,1,\dots\}$, define $c_n := \ell(\langle x_n, w(\bar t)\rangle - y_n)$ for every $n \in \{1,\dots,N\}$. Prove that:

$$w(\bar t) \in \operatorname{argmin}_{w \in \mathbb{R}^D\ s.t.\ \forall n\in\{1,\dots,N\}:\ \ell(\langle x_n,w\rangle - y_n) = c_n} \|w\|$$

Let $\mathcal{H} \subset Y^X$ be an arbitrary hypothesis class. In this part of the question, for an arbitrary function $\ell:\mathbb{R}\to\mathbb{R}_{\ge0}$ (not necessarily invertible) and a hypothesis $h \in \mathcal{H}$, we define $\mathcal{L}_D(h) := \mathbb{E}_{(x,y)\sim D}[\ell(h(x) - y)]$ as the true (population) loss and $\mathcal{L}_S(h) := \frac{1}{N}\sum_{n=1}^N \ell(h(x_n) - y_n)$ as the sample loss.

Let $R: \mathcal{H} \to \mathbb{R}_{\ge0}$ be some complexity measure, and suppose we use a learning algorithm $A$ that tends to return hypotheses $h$ with low complexity $R(h)$. Moreover, assume that for every $r \in \mathbb{R}_{\ge0}$ and $\delta \in (0,1)$, with probability at least $1-\delta$ over the sample $S$:

$$\forall h \in \mathcal{H} \text{ with } R(h) \le r:\quad \mathcal{L}_D(h) - \mathcal{L}_S(h) \le \sqrt{\frac{r + \ln(1/\delta)}{N}}$$

**b. (10 pts)** Develop a generalization bound suited to using algorithm $A$. That is, develop an expression $\Delta(N,\delta,r)$ satisfying the following conditions:
1. For every $\delta \in (0,1)$ and $r \in \mathbb{R}_{\ge0}$: $\ \lim_{N\to\infty} \Delta(N,\delta,r) = 0$;
2. For every $\delta \in (0,1)$ and $N \in \mathbb{N}$, $\Delta(N,\delta,r)$ is monotonically increasing in $r$; that is, $\Delta(N,\delta,r_1) > \Delta(N,\delta,r_2)$ if $r_1 > r_2$;
3. For every $\delta \in (0,1)$, with probability at least $1-\delta$ over $S$:
$$\forall h \in \mathcal{H}:\quad \mathcal{L}_D(h) - \mathcal{L}_S(h) \le \Delta(N,\delta,R(h))$$

Make sure to define $\Delta(N,\delta,r)$ explicitly in your answer.

**c. (8 pts)** Suppose we ran algorithm $A$ on a training sample of size $N = 10^9$ and got back a hypothesis $h \in \mathcal{H}$ with complexity measure $R(h) = 1$. Are we guaranteed that the true loss $\mathcal{L}_D(h)$ will be low with high probability (e.g. above $0.9$)? Justify your answer.

**Solution sketch:**
**a.** $\nabla\mathcal{L}(w) = \frac{1}{N}\sum_n \ell'(\langle x_n,w\rangle - y_n)\,x_n \in \mathrm{span}\{x_1,\dots,x_N\}$. Since $w(0) = 0$, induction over GD updates gives $w(\bar t) \in \mathrm{span}\{x_n\}_{n=1}^N$. Because $\ell$ is invertible, the constraint $\ell(\langle x_n,w\rangle - y_n) = c_n$ is equivalent to the linear constraint $\langle x_n,w\rangle = y_n + \ell^{-1}(c_n)$. So the feasible set is an affine subspace $\{w: Xw = b\}$ ($X$ = matrix with rows $x_n^\top$), nonempty since it contains $w(\bar t)$. Decompose any feasible $w = w_\parallel + w_\perp$ (span of $\{x_n\}$ vs. its orthogonal complement). The constraints determine $w_\parallel$ uniquely (linear independence of $\{x_n\}$ makes $X$ restricted to the span invertible), and $\|w\|^2 = \|w_\parallel\|^2 + \|w_\perp\|^2$. Hence the unique norm minimizer is the feasible point with $w_\perp = 0$, which is exactly $w(\bar t)$.

**b.** Stratify complexity levels: for $k \in \mathbb{N}$ apply the assumed bound with $r = k$ and confidence $\delta_k := \delta\,2^{-k}$ ($\sum_k \delta_k = \delta$). A union bound makes all levels hold simultaneously w.p. $\ge 1-\delta$. For any $h$, use level $k = \max\{\lceil R(h)\rceil, 1\}\le R(h)+1$. Explicit choice satisfying (1)-(3): $\Delta(N,\delta,r) := \sqrt{\dfrac{(r+1)(1+\ln 2) + \ln(1/\delta)}{N}}$ — it dominates the level-$k$ bound $\sqrt{(k + k\ln2 + \ln(1/\delta))/N}$ since $k \le r+1$, is strictly increasing in $r$, and tends to $0$ as $N \to \infty$. (Any summable allocation, e.g. $\delta_k \propto k^{-2}$, gives a variant.)

**c.** No. The assumed bound (and $\Delta$) controls only the generalization **gap** $\mathcal{L}_D(h) - \mathcal{L}_S(h)$: with $N = 10^9$ and $R(h) = 1$ we get $\mathcal{L}_D(h) \le \mathcal{L}_S(h) + \text{(tiny)}$ w.h.p., but nothing in the assumptions guarantees that the empirical loss $\mathcal{L}_S(h)$ itself is small — algorithm $A$ is only assumed to return low-complexity, not low-loss, hypotheses. If $\mathcal{L}_S(h)$ is large, $\mathcal{L}_D(h)$ can be large. Hence low true loss is not guaranteed.

**💡 Useful tricks:** GD from $0$ stays in $\mathrm{span}\{x_n\}$; an *invertible* $\ell$ turns each level constraint $\ell(\cdot)=c_n$ into a linear one, so the feasible set is affine and the min-norm point is the in-span solution (Pythagoras); for the adaptive bound, stratify $r=k$ with $\delta_k=\delta2^{-k}$ and plug $k=\lceil R(h)\rceil$.

**⚠️ Watch out:** (a) invertibility is exactly what linearizes the level set — don't skip it; (b) give an *explicit* $\Delta$ that is increasing in $r$ AND $\to0$; (c) the trap — the bound controls only the *gap*; $A$ returns low-*complexity*, not low-*loss*, so $\mathcal L_S$ (hence $\mathcal L_D$) can still be large.
