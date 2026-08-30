# Lecture 3 - Optimization 1
- **File:** materials/lectures/lecture_03_optimization_1.pdf | **Text:** materials/text/lectures/lecture_03_optimization_1.txt
- **Pillar:** Optimization
- **One-paragraph summary:** Establishes that deep-learning training objectives are inherently non-convex (a permutation-symmetry argument that works for *any* activation, even linear), then develops the **landscape approach**: if a non-convex objective has no bad local minima and no non-strict saddles, GD should reach a global minimum. The two supporting principles are proven quantitatively: (i) on any $\beta$-smooth objective, GD with step size $\eta \le 1/\beta$ reaches an $\epsilon$-stationary point within $2(f(w_0)-f^*)/(\eta\epsilon^2)$ steps; (ii) on the second-order Taylor (quadratic) model of a strict saddle, GD escapes in logarithmic time w.h.p. over a random perturbation. These are combined in the Perturbed GD (PGD) theorem of Jin et al. (convergence to $\epsilon$-second-order stationary points). The landscape approach is then tested on linear neural networks (LNNs): the gradient and Hessian of $\phi(W_1,\dots,W_N)=\ell(W_N\cdots W_1)$ are computed, "no bad local minima" is proven for any depth (Laurent & Brecht), all non-global stationary points are strict saddles at depth 2 (Nouiehed & Razaviyayn), **but** at depth $N\ge 3$ non-strict saddles exist (at the origin) — so the landscape approach fails already for the simplest deep models, motivating the trajectory approach of Lecture 4.

## Outline
1. **Optimization in Deep Learning Is Non-Convex** — any loss depending on parameters only through the network's input-output map is non-convex (Prop 1 via permutation symmetry; Prop 2 variant with different mild assumptions).
2. **Landscape Approach** — premise: no bad local minima + no non-strict saddles $\Rightarrow$ GD/SGD reach global minima; built on two principles (reach stationary points; escape strict saddles).
   - 2.1 **Convergence to Stationary Point** — $\beta$-smoothness (Def 1), Hessian bilinear operator (Def 2), $\epsilon$-stationarity (Def 3); descent lemma (Lem 1-2); GD reaches an $\epsilon$-stationary point in $O(1/\epsilon^2)$ steps (Thm 1).
   - 2.2 **Escaping Strict Saddle Points** — strict saddle (Def 4), $\epsilon$-escape (Def 5); GD on the quadratic model escapes a strict saddle in logarithmic time, w.h.p. under random isotropic initialization around the saddle.
   - 2.3 **Putting It All Together** — $\rho$-Hessian Lipschitz and $\epsilon$-second-order stationary points (Def 6); Perturbed Gradient Descent (PGD) algorithm and its guarantee (Thm 2, Jin et al.).
   - 2.4 **Example: Linear Neural Networks** — 2.4.1 gradient and Hessian of the overparameterized objective (Eqs. (2)-(3)); 2.4.2 no bad local minima (Thm 3); 2.4.3 depth 2: every non-global stationary point is a strict saddle (Thm 4); depth $\ge 3$: non-strict saddles exist (Prop 3), so the landscape approach is unsuitable for deep networks.

## Key definitions
**Def (network family for the non-convexity result).** Feed-forward fully connected NN with activation $\sigma(\cdot)$:
$$\mathcal{H} = \left\{\, x \mapsto y = W_N\,\sigma\big(W_{N-1}\,\sigma(\dots W_2\,\sigma(W_1 x)\dots)\big) \;:\; \forall n \in [N],\ W_n \in \mathbb{R}^{d_n,d_{n-1}} \right\}.$$
(The notes' prose says "depth 2" but the displayed family and Props 1-2 are for general depth $N$.)

**Def 1 ($\beta$-smoothness).** Let $\beta > 0$. A differentiable $f:\mathbb{R}^d \to \mathbb{R}$ is *$\beta$-smooth* when its gradient is $\beta$-Lipschitz: for any $w_1, w_2 \in \mathbb{R}^d$,
$$\|\nabla f(w_1) - \nabla f(w_2)\| \le \beta\,\|w_1 - w_2\|,$$
where $\|\cdot\|$ on vectors is the Euclidean norm.

**Def 2 (Hessian as a bilinear operator).** For twice continuously differentiable $f:\mathbb{R}^d\to\mathbb{R}$ and $w \in \mathbb{R}^d$, the bilinear symmetric operator corresponding to the Hessian of $f$ at $w$ is $\nabla^2 f(w)[\cdot,\cdot] : \mathbb{R}^d \times \mathbb{R}^d \to \mathbb{R}$,
$$\nabla^2 f(w)[u,v] := u^\top \nabla^2 f(w)\, v ,$$
where $\nabla^2 f(w) \in \mathbb{R}^{d,d}$ is the Hessian matrix of second derivatives.

**Def 3 ($\epsilon$-stationary point).** Let $\epsilon \ge 0$ and $f:\mathbb{R}^d \to \mathbb{R}$ differentiable. A point $w \in \mathbb{R}^d$ is an *$\epsilon$-stationary point* of $f(\cdot)$ when $\|\nabla f(w)\| \le \epsilon$. "Stationary point" is the case $\epsilon = 0$.

**Def 4 (strict saddle).** Let $f:\mathbb{R}^d \to \mathbb{R}$ be twice continuously differentiable and let $w$ be a stationary point of $f(\cdot)$. $w$ is a *strict saddle* when
$$\lambda_{\min}\big(\nabla^2 f(w)\big) < 0,$$
i.e., the Hessian at $w$ has at least one negative eigenvalue. (This definition can apply to a local maximum.)

**Def 5 (GD $\epsilon$-escaped $w_s$ at step $t$).** Let $\epsilon>0$ and let $\tilde f$ be the second-order Taylor approximation of $f$ around a strict saddle $w_s$. GD *$\epsilon$-escaped* $w_s$ in step $t$ if
$$\tilde f(w_t) \le \tilde f(w_s) = f(w_s) \quad\text{and}\quad \|\nabla\tilde f(w_t)\| > \epsilon ,$$
i.e., GD reached a non-$\epsilon$-stationary point whose objective value is lower than that of $w_s$.

**Def 6 ($\rho$-Hessian Lipschitz; $\epsilon$-second-order stationary point).** Twice continuously differentiable $f:\mathbb{R}^d\to\mathbb{R}$ is *$\rho$-Hessian Lipschitz* ($\rho>0$) when for any $w_1,w_2 \in \mathbb{R}^d$
$$\big\|\nabla^2 f(w_1) - \nabla^2 f(w_2)\big\|_{\mathrm{spectral}} \le \rho\,\|w_1 - w_2\| .$$
For such $f(\cdot)$ and any $\epsilon > 0$, $w \in \mathbb{R}^d$ is an *$\epsilon$-second-order stationary point* when
$$\|\nabla f(w)\| \le \epsilon \quad\text{and}\quad \lambda_{\min}\big(\nabla^2 f(w)\big) \ge -\sqrt{\rho\epsilon}\,.$$

**Def (linear neural network, LNN).** A depth-$N$ LNN with input dimension $d_0$, hidden dimensions $d_1,\dots,d_{N-1}$ and output dimension $d_N$ is the parametric family
$$\{\, x \mapsto y = W_N W_{N-1}\cdots W_1 x \;:\; x\in\mathbb{R}^{d_0},\, y\in\mathbb{R}^{d_N},\, \forall n\in[N],\, W_n \in \mathbb{R}^{d_n,d_{n-1}} \,\}.$$

**Def (partial products $W_{j:j'}$).** For $1 \le j \le j' \le N$: $W_{j:j'} := W_{j'}W_{j'-1}\cdots W_j$; if $j > j'$ then $W_{j:j'} := Id$ (dimensions from context).

**Def (overparameterized objective).** For a twice continuously differentiable convex loss $\ell : \mathbb{R}^{d_N,d_0} \to \mathbb{R}$ (e.g., logistic regression over linear models), the LNN induces $\phi : \mathbb{R}^{d_1,d_0}\times\mathbb{R}^{d_2,d_1}\times\dots\times\mathbb{R}^{d_N,d_{N-1}} \to \mathbb{R}$,
$$\phi(W_1,\dots,W_N) := \ell(W_N W_{N-1}\cdots W_1) = \ell(W_{1:N}).$$

## Key theorems & results
**Prop 1 (non-convexity of DL training).** Let $L(W_1,\dots,W_N)$ be a loss that depends on $W_1,\dots,W_N$ only through the input-output mapping of the network. Assume the global minimum of $L(\cdot)$ is attained at some $W_1^*,\dots,W_N^*$, and that this global minimum is *strictly smaller* than the loss attainable with a network of hidden widths $d_1 = d_2 = \dots = d_{N-1} = 1$. Then $L(\cdot)$ is non-convex.
*Proof idea:* Permuting hidden neurons preserves the input-output map: $L(PW_1^*, W_2^*P^\top,\dots,W_N^*) = L^*$ for every permutation matrix $P \in \mathbb{R}^{d_1,d_1}$. If $L$ were convex, averaging over all $d_1!$ permutations (Jensen + optimality) shows $Q := \frac{1}{d_1!}\sum_{P\in\mathcal P}P = \frac{1}{d_1}\mathbf{1}\mathbf{1}^\top$ gives an optimal point $(QW_1^*, W_2^*Q^\top,\dots)$ where $QW_1^*$ has identical rows; iterating layer-by-layer yields optimal weights all of identical rows — effectively width-1 hidden layers, contradicting the strict-gap assumption.
*Exam relevance:* Canonical proof; note it can be extended to networks with biases and holds for **any** activation $\sigma$, including linear.

**Prop 2 (non-convexity, variant assumptions).** Same dependence-through-the-map assumption. Assume the global minimum of $L(\cdot)$ is *not* attained at $W_1 = \dots = W_N = 0$, that $\sigma(\cdot)$ is continuously differentiable, and $\sigma(0)=0$. Then $L(\cdot)$ is non-convex. *Proof:* Home assignment 3.
*Exam relevance:* Know both sets of "mild technical assumptions" and which proposition uses which.

**Lem 1 (Hessian bounded by smoothness).** For twice continuously differentiable, $\beta$-smooth $f$ and any $w,v \in \mathbb{R}^d$:
$$\big|\nabla^2 f(w)[v,v]\big| \le \beta\,\|v\|^2 .$$
*Proof idea:* Set $h(t) := \langle v, \nabla f(w+tv) - \nabla f(w)\rangle$; chain rule gives $h'(0) = \nabla^2 f(w)[v,v]$, while Cauchy-Schwarz + $\beta$-smoothness give $|h(t)| \le \beta|t|\|v\|^2$; conclude via the difference quotient at $0$.
*Exam relevance:* Also yields: every Hessian eigenvalue of a $\beta$-smooth function satisfies $|\lambda| \le \beta$.

**Lem 2 (quadratic upper/lower bound; "descent lemma").** For twice continuously differentiable, $\beta$-smooth $f$ and any $w_1,w_2$:
$$\big|f(w_2) - f(w_1) - \langle\nabla f(w_1), w_2 - w_1\rangle\big| \le \frac{\beta}{2}\,\|w_1 - w_2\|^2 ,$$
where $f(w_1) + \langle\nabla f(w_1), w_2-w_1\rangle$ is the first-order approximation of $f$ around $w_1$.
*Proof idea:* Taylor with Lagrange remainder on $g(t) := f(w_1 + t(w_2-w_1))$: $g(1) = g(0) + g'(0) + \frac12 g''(\xi)$ for some $\xi\in(0,1)$; bound the second-order term via Lem 1.

**Thm 1 (GD reaches an $\epsilon$-stationary point; Folklore, see Nesterov).** Let $f:\mathbb{R}^d\to\mathbb{R}$ be twice continuously differentiable, $\beta$-smooth, attaining a global minimum $f^* := \min_{w} f(w)$. Run GD with step size $\eta \le \frac{1}{\beta}$ from any $w_0$. Then for any $\epsilon > 0$, an $\epsilon$-stationary point is reached within no more than
$$\frac{2\,(f(w_0) - f^*)}{\eta\,\epsilon^2} \ \text{ steps.}$$
*Proof idea:* Lem 2 with $w_{t+1}-w_t = -\eta\nabla f(w_t)$ and $\eta \le 1/\beta$ gives the per-step decrease $f(w_{t+1}) \le f(w_t) - \frac{\eta}{2}\|\nabla f(w_t)\|^2$; if $\|\nabla f(w_t)\| > \epsilon$ for all $t < T$, telescoping gives $f(w_T) < f(w_0) - \eta T\epsilon^2/2$, contradicting $f^* \le f(w_T)$ once $T$ exceeds the bound.
*Exam relevance:* Memorize the descent inequality and the $2(f(w_0)-f^*)/(\eta\epsilon^2)$ bound; polynomial-time convergence to stationarity on ANY smooth (non-convex) objective.

**Result (GD escapes strict saddles on the quadratic model).** Let $w_s$ be a strict saddle, $H := \nabla^2 f(w_s)$, and consider GD on the second-order Taylor approximation $\tilde f(w) = f(w_s) + \frac12 (w-w_s)^\top H (w-w_s)$ (using $\nabla f(w_s) = 0$), whose dynamics are $w_{t+1} = w_t - \eta H(w_t - w_s)$. With the orthogonal eigendecomposition $H = U\Lambda U^\top$ and the change of variables $\theta^{(t)} := U^\top(w_t - w_s)$, the dynamics decouple:
$$\theta_i^{(t+1)} = (1 - \eta\lambda_i)\,\theta_i^{(t)} \quad\Longrightarrow\quad \theta_i^{(t)} = (1-\eta\lambda_i)^t\,\theta_i^{(0)} .$$
$\epsilon$-escape (Def 5) amounts to $\sum_{i=1}^d \lambda_i(\theta_i^{(t)})^2 < 0$ and $\sum_{i=1}^d \lambda_i^2(\theta_i^{(t)})^2 > \epsilon^2$. Assume w.l.o.g. $-\alpha := \lambda_1 < 0$ and $\eta \le \frac1\beta$ (so $|\lambda_i| \le \beta$ and $1-\eta\lambda_i \in (0,1)$ for $\lambda_i > 0$, while $(1+\eta\alpha)^t$ grows). Then both conditions hold (assuming $\theta_1^{(0)} \neq 0$) whenever
$$t > \left\lceil \frac{\log\!\left(\frac{\max\left\{\sum_{i\in[d]:\lambda_i>0}\lambda_i\big(\theta_i^{(0)}\big)^2,\ \frac{\epsilon^2}{\alpha}\right\}}{\alpha\big(\theta_1^{(0)}\big)^2}\right)}{2\log(1+\eta\alpha)} \right\rceil .$$
*Proof idea:* Bound the negative-curvature term $-\alpha(1+\eta\alpha)^{2t}(\theta_1^{(0)})^2$ against the (shrinking) positive-curvature contributions; each condition reduces to $(1+\eta\alpha)^{2t}$ exceeding an explicit ratio.
*Exam relevance:* Escape time is logarithmic; the "w.h.p." qualifier is because the bound depends on $|\theta_1^{(0)}|$ (initial distance from $w_s$ along negative curvature) — an appropriately scaled isotropic random initialization centered at $w_s$ makes all coordinates of $\theta^{(0)}$ large enough w.h.p., with **no need to know which directions have negative curvature**.

**Algorithm (Perturbed Gradient Descent, PGD; Jin et al.).** Input $w_0 \in \mathbb{R}^d$ and $\beta,\rho,\epsilon,c,\delta,\Delta f \in \mathbb{R}_{>0}$. Set
$$\chi := 3\max\left\{\log\!\left(\tfrac{d\beta\Delta f}{c\epsilon^2\delta}\right),\,4\right\},\quad \eta := \tfrac{c}{\beta},\quad r := \tfrac{\sqrt{r}}{\chi^2}\cdot\tfrac{\epsilon}{\beta},$$
$$g_{\text{thresh}} := \tfrac{\sqrt{r}}{\chi^2}\cdot\epsilon,\quad f_{\text{thresh}} := \tfrac{c}{\chi^3}\sqrt{\tfrac{\epsilon^3}{\rho}},\quad t_{\text{thresh}} := \tfrac{\chi}{c}\cdot\tfrac{\beta}{\sqrt{\rho\epsilon}},\quad t_{\text{noise}} := -t_{\text{thresh}} - 1.$$
(Transcribed as printed; the $\sqrt{r}$ in $r$ and $g_{\text{thresh}}$ is self-referential — a typo in the notes; in Jin et al. these read $\sqrt{c}$, and $t_{\text{thresh}}$ has $\chi/c^2$.) For $t=0,1,\dots$: if $\|\nabla f(w_t)\| \le g_{\text{thresh}}$ and $t - t_{\text{noise}} > t_{\text{thresh}}$, set $\tilde w_t := w_t$, $t_{\text{noise}} := t$, and perturb $w_t := \tilde w_t + \xi_t$ with $\xi_t \sim \mathrm{Unif}\{w' : \|w'\| \le r\}$; if $t - t_{\text{noise}} = t_{\text{thresh}}$ and $f(w_t) - f(\tilde w_{t_{\text{noise}}}) > -f_{\text{thresh}}$, **return** $\tilde w_{t_{\text{noise}}}$; else GD step $w_{t+1} := w_t - \eta\nabla f(w_t)$.

**Thm 2 (PGD guarantee; Jin et al.).** Let $f:\mathbb{R}^d\to\mathbb{R}$ be $\beta$-smooth and $\rho$-Hessian Lipschitz (Def 6) with global minimum $f^*$. There exists an absolute constant $c_{\max}$ such that for any $\delta > 0$, $\epsilon \le \frac{\beta^2}{\rho}$, $\Delta f \ge f(w_0) - f^*$ and constant $c \le c_{\max}$, running $\mathrm{PGD}(w_0,\beta,\rho,\epsilon,c,\delta,\Delta f)$ outputs an $\epsilon$-second-order stationary point, w.p. $1-\delta$, after a number of steps no larger than
$$O\!\left(\frac{\beta\,(f(w_0) - f^*)}{\epsilon^2}\,\log^4\!\left(\frac{d\beta\Delta f}{\epsilon^2\delta}\right)\right).$$
*Proof idea:* Stated without proof (formalizing Sections 2.1-2.2 together is highly technical, mainly handling the discrepancy between the quadratic Taylor model and the true objective).
*Exam relevance:* Know the statement precisely: conditions ($\epsilon \le \beta^2/\rho$, $\Delta f \ge f(w_0)-f^*$), conclusion ($\epsilon$-2nd-order stationarity w.p. $1-\delta$), and that dimension enters only through $\log^4 d$.

**Result (gradient and Hessian of the LNN objective; Eqs. (1)-(3)).** Second-order expansion of $\phi(W_1{+}\Delta_1,\dots,W_N{+}\Delta_N)$ yields, for all $j \in [N]$:
$$\nabla\phi(W_1,\dots,W_N) = \Big(W_{2:N}^\top\nabla\ell(W_{1:N}),\ \dots,\ W_{j+1:N}^\top\,\nabla\ell(W_{1:N})\,W_{1:j-1}^\top,\ \dots,\ \nabla\ell(W_{1:N})\,W_{1:N-1}^\top\Big), \tag{2}$$
$$\nabla^2\phi(W_1,\dots,W_N)[(\Delta_1,\dots,\Delta_N),(\Delta_1,\dots,\Delta_N)] = \nabla^2\ell(W_{1:N})\Big[\textstyle\sum_{j=1}^N W_{j+1:N}\Delta_j W_{1:j-1},\ \sum_{j=1}^N W_{j+1:N}\Delta_j W_{1:j-1}\Big] + 2\Big\langle \nabla\ell(W_{1:N}),\ \textstyle\sum_{1\le j<j'\le N} W_{j'+1:N}\,\Delta_{j'}\,W_{j+1:j'-1}\,\Delta_j\,W_{1:j-1} \Big\rangle. \tag{3}$$
*Proof idea:* Expand the product $(W_N+\Delta_N)\cdots(W_1+\Delta_1)$ to second order in $(\Delta_j)_j$, compose with the second-order Taylor expansion of $\ell$, and collect first/second-order terms; the gradient form uses trace identities (inner product as trace + cyclic property).
*Exam relevance:* Both formulas are reused verbatim in Thm 4, Prop 3, and throughout Lecture 4.

**Thm 3 (no bad local minima for LNNs; Laurent & Brecht).** Let $\ell:\mathbb{R}^{d_N,d_0}\to\mathbb{R}$ be a differentiable **convex** loss inducing $\phi(W_1,\dots,W_N) := \ell(W_N\cdots W_1)$. Assume no bottleneck: $\min_{i\in[N-1]} d_i \ge \min\{d_0, d_N\}$. Then any local minimizer $(\hat W_1,\dots,\hat W_N)$ of $\phi(\cdot)$ is a global minimizer.
*Proof idea:* W.l.o.g. $d_N \ge d_0$. If $\ker(\hat W_{1:N-1}) = \{0\}$, first-order optimality $\nabla\ell(\hat W_{1:N})\hat W_{1:N-1}^\top = 0$ forces $\nabla\ell(\hat W_{1:N}) = 0$ (convexity finishes). Otherwise take the first $k^*$ with $\ker(\hat W_{1:k^*}) \neq \{0\}$ (kernels are nested), and perturb layers $k > k^*$ to $\tilde W_k := \hat W_k + w_k\hat u_{k-1}^\top$ with $\hat u_k$ a singular vector of $\hat W_{1:k}$ for the zero singular value — this preserves $\tilde W_{1:N} = \hat W_{1:N}$ and (for small $\|w_k\|$) local minimality; applying first-order optimality at $j = k^*{+}1$ for all admissible $\{w_k\}$ and peeling factors iteratively yields $\nabla\ell(\hat W_{1:N}) = 0$.
*Exam relevance:* Know the exact assumption $\min_{i\in[N-1]}d_i \ge \min\{d_0,d_N\}$ and the trick of perturbations that leave the end-to-end matrix invariant.

**Thm 4 (depth 2: non-global stationary points are strict saddles; Nouiehed & Razaviyayn).** Let $\ell:\mathbb{R}^{d,d}\to\mathbb{R}$ be a twice continuously differentiable convex loss; consider a depth $N=2$ LNN with $d_0=d_1=d_2=d$ and $\phi(W_1,W_2) = \ell(W_2W_1)$. Then any stationary point $(\hat W_1,\hat W_2)$ of $\phi(\cdot)$ which is not a global minimizer is a strict saddle (Def 4).
*Proof idea:* Stationarity: $\hat W_2^\top\nabla\ell(\hat W_{1:2}) = 0$, $\nabla\ell(\hat W_{1:2})\hat W_1^\top = 0$. Non-global + convexity $\Rightarrow \nabla\ell(\hat W_{1:2}) \neq 0$, so some entry $c := (\nabla\ell(\hat W_{1:2}))_{i,j} \neq 0$, and both $\hat W_1,\hat W_2$ are singular. Choose $v \neq 0$ with $\hat W_2 v = 0$ and set $\Delta_1 = \beta v e_j^\top$, $\Delta_2 = e_i v^\top$; then Eq. (3) gives $\nabla^2\phi[(\Delta_1,\Delta_2),(\Delta_1,\Delta_2)] = \nabla^2\ell(\hat W_{1:2})[\Delta_2\hat W_1, \Delta_2\hat W_1] + 2\beta\|v\|^2 c$ — linear in $\beta$ with nonzero slope, hence negative for a suitable $\beta$.
*Exam relevance:* The rank-one perturbation construction ($\hat W_2\Delta_1 = 0$, $\Delta_2\Delta_1 = \beta\|v\|^2 e_ie_j^\top$) is a favorite; note the square-matrix assumption.

**Prop 3 (depth $\ge 3$: non-strict saddles exist).** Let $\ell:\mathbb{R}^{d_N,d_0}\to\mathbb{R}$ be twice continuously differentiable and convex; consider an LNN of depth $N \ge 3$ with $\min_{i\in[N-1]} d_i \ge \min\{d_0,d_N\}$ and $\phi(W_1,\dots,W_N) = \ell(W_{1:N})$. Assume $\ell(\cdot)$ does not attain its global minimum at $0$. Then $\phi(\cdot)$ has non-strict saddles (Def 4 fails: stationary, not a minimum, yet $\lambda_{\min}(\nabla^2\phi) \ge 0$).
*Proof idea:* At $(\hat W_1,\dots,\hat W_N) = (0,\dots,0)$: every term of the gradient (Eq. 2) contains a zero factor, so it is stationary; it is not a global minimum, and by Thm 3 not a local minimum, hence a saddle. In the Hessian quadratic form (Eq. 3), for $N \ge 3$ every summand contains at least one factor $\hat W_k = 0$, so $\nabla^2\phi[\Delta,\Delta] = 0$ for all $\Delta$ — no negative eigenvalue.
*Exam relevance:* The punchline of the lecture: landscape approach (in current form) cannot establish GD convergence for deep LNNs — the simplest deep NNs — so "a different perspective is needed" (trajectory approach, Lecture 4).

## Techniques & tricks
- **Symmetry + Jensen against convexity:** average an optimum over a symmetry group (permutations of hidden neurons); convexity would make the average optimal, but the averaged point is degenerate (identical rows), contradicting expressiveness assumptions.
- **1-D auxiliary functions** to prove smoothness consequences: $h(t) := \langle v, \nabla f(w+tv)-\nabla f(w)\rangle$ (Lem 1) and $g(t) := f(w_1 + t(w_2-w_1))$ with Taylor-Lagrange (Lem 2).
- **Telescoping the descent inequality** $f(w_{t+1}) \le f(w_t) - \frac{\eta}{2}\|\nabla f(w_t)\|^2$ to get iteration complexity.
- **Quadratic-model + eigenbasis decoupling:** replace $f$ near a saddle by $\tilde f$, change variables $\theta = U^\top(w - w_s)$, get scalar geometric recursions $\theta_i^{(t)} = (1-\eta\lambda_i)^t\theta_i^{(0)}$ (power-iteration flavor); negative eigenvalue $\Rightarrow$ geometric growth $(1+\eta\alpha)^t$.
- **Random isotropic perturbation** to guarantee w.h.p. a non-negligible component along (unknown) escape directions.
- **Second-order perturbation expansion of matrix products** + trace/cyclic-property manipulations to read off $\nabla\phi$ and $\nabla^2\phi$.
- **End-to-end-invariant perturbations** built from zero-singular-value directions (SVD) to generate extra first-order optimality conditions at a local minimum (Thm 3).
- **Explicit negative-curvature certificates** via rank-one $\Delta$'s adapted to kernels of the weight matrices (Thm 4); at the origin with $N\ge3$, every Hessian term vanishes (Prop 3).

## Exam-relevant nuggets
- Non-convexity is **not** caused by nonlinear activations: Prop 1 holds for any $\sigma$, including linear; the driver is permutation symmetry + the loss depending on parameters only through the input-output map.
- Prop 2's assumption set: global min not at $0$, $\sigma \in C^1$, $\sigma(0)=0$ (proof is HW3 — plausible exam question).
- Memorize: $\eta \le 1/\beta$; per-step decrease $\frac{\eta}{2}\|\nabla f(w_t)\|^2$; iteration bound $2(f(w_0)-f^*)/(\eta\epsilon^2)$.
- $\beta$-smoothness $\Rightarrow$ all Hessian eigenvalues in $[-\beta,\beta]$ (via Lem 1 on unit eigenvectors).
- Strict saddle definition covers local maxima — stated explicitly in the notes.
- $\epsilon$-second-order stationarity couples the two tolerances: $\|\nabla f(w)\|\le\epsilon$ **and** $\lambda_{\min}(\nabla^2 f(w)) \ge -\sqrt{\rho\epsilon}$ (not $-\epsilon$) — a classic trap.
- PGD guarantee: $O\big(\frac{\beta(f(w_0)-f^*)}{\epsilon^2}\log^4\frac{d\beta\Delta f}{\epsilon^2\delta}\big)$ steps, w.p. $1-\delta$, requiring $\epsilon \le \beta^2/\rho$; dimension $d$ appears only inside the $\log^4$.
- Saddle-escape time is logarithmic in the ratio $\max\{\sum_{\lambda_i>0}\lambda_i(\theta_i^{(0)})^2, \epsilon^2/\alpha\}/(\alpha(\theta_1^{(0)})^2)$, with rate $2\log(1+\eta\alpha)$; escape is only "w.h.p." because $\theta_1^{(0)}$ could be arbitrarily small.
- LNN gradient $\frac{\partial\phi}{\partial W_j} = W_{j+1:N}^\top\,\nabla\ell(W_{1:N})\,W_{1:j-1}^\top$ — reused as the starting point of Lecture 4's balancedness derivation.
- Assumption bookkeeping: Thm 3 needs $\ell$ convex differentiable + no bottleneck ($\min_i d_i \ge \min\{d_0,d_N\}$); Thm 4 needs depth exactly 2 + square dimensions; Prop 3 needs $N\ge3$ + global min of $\ell$ not at $0$.
- The non-strict saddle of Prop 3 is the **origin** — precisely the region where standard small initializations start; this is the lecture's argument for why a trajectory-based (not landscape-based) analysis is necessary for deep networks.
- Notes' typos to not be thrown by: PGD's $r, g_{\text{thresh}}$ printed with $\sqrt{r}$ (self-referential; Jin et al. have $\sqrt{c}$), $t_{\text{thresh}}$ printed $\frac{\chi}{c}\cdot\frac{\beta}{\sqrt{\rho\epsilon}}$ (Jin et al.: $\chi/c^2$); prose "depth 2" before the general depth-$N$ family $\mathcal H$.
