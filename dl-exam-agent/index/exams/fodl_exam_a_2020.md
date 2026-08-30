# FODL Exam — Moed A 2020
**Date / semester:** July 12th, 2020 — 2019–2020 Spring Semester, Exam Term A
**Total points:** 101

## Q1 (28 pts) — Exponential depth separation for ReLU networks (1D)
**Topics:** depth-separation, hypothesis-class, relu, piecewise-linear | **Pillar:** Expressiveness | **Difficulty:** 4
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_B$ be the hypotheses space corresponding to a fully-connected shallow (2 layer) neural network with 1D input, 1D output, hidden width $B \in \mathbb{N}$, and ReLU activation. Given $L \geq 3$, let $\bar{\mathcal{H}}_{\bar{B}}$ be a hypotheses space corresponding to a similar model but with $L$ layers and hidden widths $\bar{B} \in \mathbb{N}$.

- **(5 pts)** Provide explicit expressions for $\mathcal{H}_B$ and $\bar{\mathcal{H}}_{\bar{B}}$.
- **(15 pts)** Prove that $\bar{\mathcal{H}}_{\bar{B}}$ is exponentially (in $L$) expressively efficient w.r.t. $\mathcal{H}_B$.
- **(8 pts)** If we omit biases from both models, does the expressive efficiency still hold? Prove your answer.

**Solution sketch:**
**i.** $\mathcal{H}_B = \{x \mapsto \sum_{i=1}^{B} w^{(2)}_i\, [\,w^{(1)}_i x + b^{(1)}_i\,]_+ + b^{(2)}\}$ with all parameters real. $\bar{\mathcal{H}}_{\bar B} = \{x \mapsto W_L\,\sigma(W_{L-1}\,\sigma(\cdots \sigma(W_1 x + b_1)\cdots) + b_{L-1}) + b_L\}$ with hidden widths $\bar B$ and $\sigma = $ entrywise ReLU $[\cdot]_+$.

**ii.** Piece-counting argument: a shallow width-$B$ ReLU net is piecewise linear with at most $B + 1$ linear pieces (each hidden unit contributes one breakpoint). Separation construction: a small constant-width hat/triangle layer $\varphi$ (realizable with 2–3 ReLU units) doubles the number of oscillations under composition. Composing over $L-1$ hidden layers yields a "sawtooth" function with $2^{\Omega(L)}$ linear pieces (Telgarsky-style). Replicating it in the shallow family forces $B \geq 2^{\Omega(L)}$, i.e., exponential width. Also verify the containment direction of expressive efficiency: any shallow net is realized by a depth-$L$ net of comparable width by passing values forward with the ReLU identity trick $x = [x]_+ - [-x]_+$ (two channels per value).

**iii.** No. Without biases every layer is positively homogeneous, so the whole network satisfies $f(\lambda x) = \lambda f(x)$ for $\lambda \geq 0$. On $\mathbb{R}$ such $f$ is determined by two slopes: $f(x) = \alpha [x]_+ - \beta[-x]_+$ (single breakpoint at 0). Every such function is realized by a bias-free *shallow* net of width 2, so deep bias-free nets are replicated with constant width — expressive efficiency (in particular exponential) fails.

**💡 Useful tricks:** Shallow width-$B$ ReLU = piecewise linear with $\leq B+1$ pieces (each unit adds one breakpoint); composing a hat/triangle *doubles* oscillations ⇒ a sawtooth with $2^{\Omega(L)}$ pieces (Telgarsky); the containment direction uses the forward-pass identity $x=[x]_+-[-x]_+$; without biases, positive homogeneity collapses everything to two slopes.

**⚠️ Watch out:** prove BOTH directions of expressive efficiency (poly containment AND exponential hardness); state the piece bound exactly ($\leq B+1$); (iii) the answer *flips* without biases — homogeneous $f$ has a single breakpoint at $0$, so a width-2 shallow net suffices and no separation survives.

## Q2 (45 pts) — Landscape and gradient flow of a depth-$N$ width-1 linear network on 1D regression
**Topics:** linear-nn, convexity, gradient-flow, balancedness, conservation-laws, strict-saddle, matrix-factorization | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_03_optimization_1, lecture_04_optimization_2, fodl_recitation_gradient_flow
**Statement (English translation):**
Let $\underline{x} = (x_1, x_2, \ldots, x_m) \in \mathbb{R}^m$ and $\underline{y} = (y_1, y_2, \ldots, y_m) \in \mathbb{R}^m$ be vectors holding 1D training instances and labels, respectively. Assume $\underline{x} \neq 0$, $\langle \underline{x}, \underline{y} \rangle > 0$, and consider the empirical $\ell_2$ loss over linear models:

$$L_S : \mathbb{R} \to \mathbb{R}_{\geq 0}\,,\ L_S(w) = \frac{1}{m}\sum\nolimits_{i=1}^m (x_i \cdot w - y_i)^2 = \frac{1}{m}\|\underline{x} \cdot w - \underline{y}\|^2$$

Define $\phi(\cdot)$ to be an overparameterization of $L_S(\cdot)$ with a depth $N \geq 2$ linear neural network having hidden widths 1.

- **(5 pts)** Provide an explicit expression for $\phi(\cdot)$.
- **(8 pts)** Prove that $\phi(\cdot)$ is non-convex.
- **(8 pts)** Prove that $\phi(\cdot)$ has infinitely many global minima.

Assume hereafter that $N = 2$.

- **(8 pts)** Prove that $\phi(\cdot)$ admits the strict saddle property (all of its saddles are strict).
- **(8 pts)** Prove that $\phi(\cdot)$ has no bad local minimum (all of its local minima are global).
- **(8 pts)** Suppose we minimize $\phi(\cdot)$ by running gradient flow starting from an initialization $(w_1(0), w_2(0))$ that meets $w_1(0)^2 - w_2(0)^2 = c$ for some $c > 0$. Suppose also that gradient flow converges to a global minimum $(w_1(\infty), w_2(\infty))$ for which $w_1(\infty) > 0$. Derive closed-form expressions for $w_1(\infty)$ and $w_2(\infty)$.

**Solution sketch:**
**i.** $\phi : \mathbb{R}^N \to \mathbb{R}_{\geq 0}$, $\phi(w_1, \ldots, w_N) = L_S\big(\prod_{i=1}^N w_i\big) = \frac{1}{m}\big\|\underline{x}\cdot \prod_{i=1}^N w_i - \underline{y}\big\|^2$.

**ii.** $L_S$ is a strictly convex parabola with unique minimizer $w^* = \langle \underline x, \underline y\rangle / \|\underline x\|^2 > 0$. Pick two global minimizers of $\phi$ with product $w^*$, e.g. $(2, w^*/2, 1, \ldots, 1)$ and $(w^*/2, 2, 1, \ldots, 1)$. Their midpoint has end-to-end product $\big(\frac{2 + w^*/2}{2}\big)^2 \neq w^*$ (for suitable/generic choice), hence a strictly larger $\phi$ value than the endpoints' common (minimal) value — Jensen violated $\Rightarrow$ non-convex. (Equivalently: a convex function's minimizer set is convex, while $\{\prod_i w_i = w^*\}$ is not.)

**iii.** $\phi \geq L_S(w^*)$ everywhere with equality iff $\prod_i w_i = w^*$. The solution set contains $\{(\alpha, w^*/\alpha, 1, \ldots, 1) : \alpha \neq 0\}$ — infinitely many global minima.

**iv.** $N=2$: $\nabla\phi(w_1,w_2) = L_S'(w_1w_2)\,(w_2, w_1)$. Critical points: either $w_1w_2 = w^*$ (global minima) or $(w_1,w_2) = (0,0)$. At the origin the Hessian is $\begin{pmatrix} 0 & L_S'(0) \\ L_S'(0) & 0\end{pmatrix}$ with $L_S'(0) = -\frac{2}{m}\langle \underline x, \underline y\rangle < 0$, so its eigenvalues are $\pm\frac{2}{m}\langle\underline x,\underline y\rangle$ — a strictly negative eigenvalue exists $\Rightarrow$ the only saddle is strict.

**v.** Every critical point is either the origin (a strict saddle, hence not a local minimum) or satisfies $w_1w_2 = w^*$ (global minimum) $\Rightarrow$ all local minima are global.

**vi.** Balancedness is conserved under gradient flow ($\frac{d}{dt}(w_1^2 - w_2^2) = 0$), so $w_1(\infty)^2 - w_2(\infty)^2 = c$ together with $w_1(\infty)\,w_2(\infty) = w^*$. Solving with $w_1(\infty) > 0$: $w_1(\infty) = \sqrt{\tfrac{c + \sqrt{c^2 + 4(w^*)^2}}{2}}$, $w_2(\infty) = w^* / w_1(\infty)$, where $w^* = \langle \underline x, \underline y\rangle/\|\underline x\|^2$.

**💡 Useful tricks:** Non-convexity is cleanest from the *minimizer set* $\{\prod_i w_i=w^*\}$ being non-convex (or Jensen at a midpoint); the same set gives infinitely many minima $\{(\alpha,w^*/\alpha,1,\dots)\}$; for $N=2$ the origin's Hessian has eigenvalues $\pm\frac2m\langle x,y\rangle$; conservation $w_1^2-w_2^2=c$ plus $w_1w_2=w^*$ solves the endpoint in closed form.

**⚠️ Watch out:** the strict-saddle sign needs $\langle x,y\rangle>0$ (given) so $L_S'(0)<0$; classify EVERY critical point (origin vs. the product manifold) to conclude "no bad local min"; in (vi) pick the correct root ($w_1(\infty)>0$) and recall $w^*=\langle x,y\rangle/\|x\|^2$.

## Q3 (28 pts) — Implicit bias of GD to the min-norm solution and norm-based generalization
**Topics:** implicit-bias, implicit-regularization, min-norm, gradient-descent, rademacher, norm-bounds, uniform-convergence | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_07_generalization_2, lecture_06_generalization_1, fodl_recitation_optimization_2_radamacher
**Statement (English translation):**
Let $\{\underline{x}_i \in \mathbb{R}^d\}_{i=1}^m$ and $\{y_i \in \mathbb{R}\}_{i=1}^m$ be training instances and labels, respectively. Assume that $d > m$, and that $\{\underline{x}_i \in \mathbb{R}^d\}_{i=1}^m$ are linearly independent. Suppose we train a linear predictor by minimizing the empirical loss:

$$L_S : \mathbb{R}^d \to \mathbb{R}_{\geq 0}\,,\ L_S(\underline{w}) = \frac{1}{m}\sum\nolimits_{i=1}^m \ell\,(y_i, \langle \underline{x}_i, \underline{w}\rangle)$$

where $\ell : \mathbb{R} \times \mathbb{R} \to [0,1]$ is $\rho$-Lipschitz in its second argument, and equal to zero if and only if its two arguments are equal.

- **(15 pts)** Prove that if we run gradient descent over $L_S(\cdot)$ starting from zero initialization, and converge to a global optimum, this global optimum will be the one with minimum Euclidean norm.

Assume now that the training set $S = \{(\underline{x}_i, y_i)\}_{i=1}^m$ is drawn i.i.d. from a distribution $\mathcal{D}$ over $\mathbb{R}^d \times \mathbb{R}$. For $r \in \mathbb{R}_{>0}$, denote $\mathcal{H}_r := \{\underline{x} \to \langle \underline{w}, \underline{x}\rangle : \underline{w} \in \mathbb{R}^d, \|\underline{w}\| \leq r\}$. It is known that the Rademacher complexity corresponding to $\mathcal{H}_r$ satisfies $R(\ell \circ \mathcal{H}_r \circ S) \leq (\rho \cdot r \cdot \max_{i \in [m]}\|\underline{x}_i\|)/\sqrt{m}$.

- **(8 pts)** Derive a generalization bound that takes the implicit regularization of gradient descent into account, i.e. by which a lower Euclidean norm of the learned hypothesis yields a tighter bound on generalization gap.
- **(5 pts)** If $\mathcal{D}$ was such that a label $y_i$ is independent of its instance $\underline{x}_i$, what would you expect from the Euclidean norm of the learned hypothesis? Explain your answer (qualitatively).

**Solution sketch:**
**i.** $\nabla L_S(\underline w) = \frac{1}{m}\sum_i \partial_2\ell(y_i, \langle \underline x_i, \underline w\rangle)\, \underline x_i \in V := \mathrm{span}\{\underline x_i\}$. With zero initialization, every GD iterate — hence the limit $\hat{\underline w}$ — lies in $V$. Global optimum $\Leftrightarrow$ $L_S = 0$ $\Leftrightarrow$ $\langle \underline x_i, \underline w\rangle = y_i\ \forall i$ (by the $\ell = 0$ iff equal-arguments property). Feasible since $d > m$ and the $\underline x_i$ are linearly independent. Orthogonal decomposition: any solution $\underline w = \underline w_V + \underline w_\perp$ satisfies the constraints through $\underline w_V$ alone, and $\|\underline w\|^2 = \|\underline w_V\|^2 + \|\underline w_\perp\|^2$. The solution lying in $V$ is unique (invertible $m \times m$ Gram matrix from linear independence) and hence has minimal norm. GD's limit is that solution.

**ii.** Combine the reminder-style Rademacher bound with the given complexity estimate: w.p. $\geq 1 - \delta$, $\forall h \in \mathcal{H}_r$: $L_{\mathcal D}(h) - L_S(h) \leq \frac{2\rho\, r\, \max_i \|\underline x_i\|}{\sqrt m} + O\big(\sqrt{\ln(1/\delta)/m}\big)$. Make it norm-adaptive by a union bound over integer radii $r = 1, 2, \ldots$ with $\delta_r = \frac{6\delta}{\pi^2 r^2}$ and instantiate $r = \lceil\|\hat{\underline w}\|\rceil \leq \|\hat{\underline w}\| + 1$, giving a gap bound scaling with $\rho(\|\hat{\underline w}\|+1)\max_i\|\underline x_i\|/\sqrt m$ — smaller learned norm $\Rightarrow$ tighter bound.

**iii.** With labels independent of instances there is no low-norm linear rule correlating $\underline x$ with $y$. Interpolating $m$ effectively random labels forces the min-norm interpolator to have a *large* norm (growing with $m$/noise), so the bound above becomes loose — consistent with the fact that no generalization is possible in this setting.

**💡 Useful tricks:** GD from $0$ stays in $V=\mathrm{span}\{x_i\}$ (every gradient lives there); global optimum ⇔ interpolation (from $\ell=0$ iff equal); Pythagoras ($\|w\|^2=\|w_V\|^2+\|w_\perp\|^2$) shows the in-span solution is min-norm; make the bound norm-adaptive by a union over radii $r$ with $\delta_r=\frac{6\delta}{\pi^2r^2}$, then set $r=\lceil\|\hat w\|\rceil$.

**⚠️ Watch out:** (i) needs BOTH facts — iterates stay in $V$ AND the in-span interpolant is the unique min-norm one (invertible Gram from linear independence); (ii) infinitely many radii ⇒ summable weights; (iii) the answer is a *large* norm — random labels blow up $\|\hat w\|$ and loosen the bound (the Zhang-et-al. moral again).
