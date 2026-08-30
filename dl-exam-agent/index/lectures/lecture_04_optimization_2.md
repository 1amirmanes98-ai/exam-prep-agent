# Lecture 4 - Optimization 2
- **File:** materials/lectures/lecture_04_optimization_2.pdf | **Text:** materials/text/lectures/lecture_04_optimization_2.txt
- **Pillar:** Optimization
- **One-paragraph summary:** Introduces the **trajectory approach**: instead of separating optimizer from landscape, analyze the specific trajectories the optimizer traces on the objective. The technical vehicle is **gradient flow** (GF; GD with infinitesimal step size). Case study: GF over the overparameterized LNN objective $\phi(W_1,\dots,W_N) = \ell(W_{1:N})$. Three structural results are proven: (i) **balancedness** $W_{j+1}^\top W_{j+1} = W_j W_j^\top$ is conserved by GF (motivated by near-zero initialization); (ii) under balanced initialization the end-to-end matrix $W_{1:N}$ obeys autonomous closed-form dynamics — a **preconditioned gradient flow** over $\ell$ whose PSD preconditioner $P_{W_{1:N}(t)}$ has explicit eigenvectors $\mathrm{vec}(u_r v_{r'}^\top)$ and eigenvalues $\sum_j \sigma_r^{2(N-j)/N}\sigma_{r'}^{2(j-1)/N}$, i.e., depth promotes movement along directions already traversed; (iii) if the initial end-to-end matrix has a **deficiency margin** $c>0$ and $\ell$ is $\alpha$-strongly convex, GF converges to global minimum with a linear rate — time $\ln(\epsilon^{-1}(\phi(0)-\ell^*))\,c^{-2(N-1)/N}\alpha^{-1}$ — for **arbitrary depth**, something the landscape approach provably could not deliver (Lecture 3, Prop 3). A discrete-GD analogue with explicit constants (Arora et al. 2018) is stated without proof.

## Outline
1. **Trajectory Approach** — motivation: analyze optimizer and objective jointly via the trajectories taken.
   - 1.1 **Gradient Flow** — the ODE $\dot\theta(t) = -\nabla f(\theta(t))$ as infinitesimal-step GD; the analysis tool for trajectories.
   - 1.2 **Example: Linear Neural Networks** — GF over $\phi(W_1,\dots,W_N) = \ell(W_{1:N})$ (layerwise ODEs from Lecture 3's gradient formula).
     - 1.2.1 **Balancedness** — conserved differences $C_{j,j+1}$; balanced initialization (Def 1) is preserved for all time (Lemma 1).
     - 1.2.2 **End-to-End Dynamics** — E2E matrix (Def 2); closed-form ODE for $W_{1:N}(t)$ (Thm 1); vectorized form: preconditioned GF with explicit spectrum (Prop 1) and its interpretation.
     - 1.2.3 **Convergence to Global Minimum** — deficiency margin (Def 3) + fully worked squared-loss/whitened-data example; $\alpha$-strong convexity (Def 4) and gradient lower bound (Prop 2); GF convergence theorem (Thm 2); GD version with approximate balancedness (Thm 3, stated).

## Key definitions
**Def (Gradient Flow, GF).** For differentiable $f:\mathbb{R}^d\to\mathbb{R}$, the trajectory $\theta : [0,\infty) \to \mathbb{R}^d$ follows
$$\forall t \in \mathbb{R}_{\ge 0}:\quad \dot\theta(t) := \frac{d}{dt}\theta(t) = -\nabla f(\theta(t)).$$
GF corresponds to GD with an infinitesimally small step size (learning rate). GF over the LNN objective: $\forall t, \forall j\in[N]:\ \dot W_j(t) = -\frac{\partial}{\partial W_j}\phi(W_1(t),\dots,W_N(t))$.

**Def (conserved constants).** Along GF over an LNN, for $j \in [N-1]$ the difference $W_{j+1}(t)^\top W_{j+1}(t) - W_j(t)W_j(t)^\top$ is fixed in time and denoted
$$C_{j,j+1} := W_{j+1}(0)^\top W_{j+1}(0) - W_j(0)\,W_j(0)^\top \in \mathbb{R}^{d_j,d_j}.$$
Near-origin initialization ($\forall j: W_j(0) \approx 0$) makes the $C_{j,j+1}$ negligible; the setting is idealized by assuming $C_{j,j+1} = 0$ for all $j$.

**Def 1 (balanced weights).** For any $t \ge 0$, the weights $W_1(t),\dots,W_N(t)$ of a depth-$N$ LNN are *balanced* when
$$\forall j \in [N-1]:\quad W_{j+1}(t)^\top W_{j+1}(t) = W_j(t)\,W_j(t)^\top .$$

**Def 2 (end-to-end matrix).** For an LNN of depth $N$, $W_{1:N} := W_N \cdots W_1$ is the *end-to-end (E2E) matrix*; it represents the input-output mapping of the LNN.

**Def 3 (deficiency margin).** Let $\ell : \mathbb{R}^{d_N,d_0} \to \mathbb{R}$ be a loss function. A matrix $W \in \mathbb{R}^{d_N,d_0}$ has *deficiency margin* $c > 0$ when
$$\ell(W) < \ell(W')$$
for **every** $W' \in \mathbb{R}^{d_N,d_0}$ whose smallest singular value satisfies $\sigma_{\min}(W') \le c$.

**Def (squared loss for linear predictors; whitened data).** $\ell(W) = \frac{1}{2m}\|WX - Y\|_F^2$ with instances $X \in \mathbb{R}^{d_0,m}$, labels $Y \in \mathbb{R}^{d_N,m}$ as columns; empirical covariances
$$\Lambda_{xx} := \tfrac1m XX^\top,\qquad \Lambda_{yy} := \tfrac1m YY^\top,\qquad \Lambda_{yx} := \tfrac1m YX^\top .$$
Data is *whitened* when $\Lambda_{xx} = I_{d_0}$.

**Def 4 ($\alpha$-strong convexity).** A differentiable $f:\mathbb{R}^d\to\mathbb{R}$ is *$\alpha$-strongly convex* ($\alpha > 0$) when
$$\forall x, y \in \mathbb{R}^d:\quad f(y) \ge f(x) + \langle\nabla f(x), y - x\rangle + \frac{\alpha}{2}\|y - x\|_2^2 .$$
(The squared loss is $\alpha$-strongly convex, with $\alpha$ depending on the data.)

**Def (matrix power of a PSD matrix).** For PSD $A$ and $\alpha \in \mathbb{R}_{\ge0}$, $[A]^\alpha$ is defined via the eigendecomposition of $A$ ($\alpha = 0$ yielding the identity).

## Key theorems & results
**Result (GF layer dynamics; Eq. (2)).** Plugging Lecture 3's gradient formula into GF:
$$\forall t \ge 0,\ \forall j \in [N]:\quad \dot W_j(t) = -\,W_{j+1:N}(t)^\top\, \nabla\ell(W_{1:N}(t))\, W_{1:j-1}(t)^\top .$$

**Lem 1 (balancedness is conserved).** If GF over an LNN starts from a balanced initialization (Def 1 at $t=0$), the weights remain balanced for all $t \ge 0$.
*Proof idea:* From Eq. (2), $\dot W_j(t)W_j(t)^\top = W_{j+1}(t)^\top \dot W_{j+1}(t)$ for all $j \in [N-1]$; adding the transposed identity gives $\frac{d}{dt}\big(W_j W_j^\top\big) = \frac{d}{dt}\big(W_{j+1}^\top W_{j+1}\big)$; integrate from $0$ to $t$.
*Exam relevance:* The conservation-law derivation (multiply, symmetrize, integrate) is a standard exam computation.

**Thm 1 (end-to-end dynamics).** Let $\ell : \mathbb{R}^{d_N,d_0} \to \mathbb{R}$ be a continuously differentiable loss overparameterized by a depth-$N$ LNN, $\phi(W_1,\dots,W_N) := \ell(W_{1:N})$. Under GF from a balanced initialization, the E2E matrix obeys
$$\forall t \in \mathbb{R}_{\ge0}:\quad \dot W_{1:N}(t) = -\sum_{j=1}^{N} \Big[W_{1:N}(t)\,W_{1:N}(t)^\top\Big]^{\frac{j-1}{N}}\; \nabla\ell\big(W_{1:N}(t)\big)\; \Big[W_{1:N}(t)^\top\, W_{1:N}(t)\Big]^{\frac{N-j}{N}} ,$$
the *end-to-end dynamics* (matrix powers of PSD matrices as defined above). The dynamics depend only on $W_{1:N}$, not on the individual $W_j$.
*Proof idea:* (Given under removable assumptions: all dimensions equal $d$; some $W_j(t)$ has distinct singular values.) Balancedness forces consecutive SVDs to align: all $\Sigma_j$ equal a common $\Sigma$, and $U_j = V_{j+1}D_j$ with diagonal $D_j \in \mathrm{diag}\{\pm1\}$; hence $W_{j:N}W_{j:N}^\top = [W_{1:N}W_{1:N}^\top]^{\frac{N-j+1}{N}}$ and $W_{1:j}^\top W_{1:j} = [W_{1:N}^\top W_{1:N}]^{\frac{j}{N}}$; substitute into the product rule $\dot W_{1:N} = \sum_j W_{j+1:N}\dot W_j W_{1:j-1}$ with Eq. (2).
*Exam relevance:* Memorize the exponents $\frac{j-1}{N}$ (left) and $\frac{N-j}{N}$ (right) and the alignment lemma; the "exercise: prove this" step ($W_{1:j}^\top W_{1:j}$ formula) is a natural exam item.

**Prop 1 (vectorized form: preconditioned gradient flow).** The end-to-end dynamics can be written as
$$\forall t \in \mathbb{R}_{\ge0}:\quad \mathrm{vec}\big[\dot W_{1:N}(t)\big] = -\,P_{W_{1:N}(t)}\; \mathrm{vec}\big[\nabla\ell(W_{1:N}(t))\big],$$
where $\mathrm{vec}[\cdot]$ stacks columns and $P_{W_{1:N}(t)} \in \mathbb{R}^{d_Nd_0, d_Nd_0}$ is a PSD *preconditioning* matrix depending on $W_{1:N}(t)$. Denoting the singular values of $W_{1:N}(t) \in \mathbb{R}^{d_N,d_0}$ by $\sigma_1,\dots,\sigma_{\max\{d_N,d_0\}} \ge 0$ (convention $\sigma_r = 0$ for $r > \min\{d_N,d_0\}$), with left/right singular vectors $u_1,\dots,u_{d_N} \in \mathbb{R}^{d_N}$, $v_1,\dots,v_{d_0} \in \mathbb{R}^{d_0}$, the eigenvectors of $P_{W_{1:N}(t)}$ are
$$\mathrm{vec}\big(u_r v_{r'}^\top\big),\qquad r \in [d_N],\ r' \in [d_0],$$
with corresponding eigenvalues
$$\sum_{j=1}^{N} \sigma_r^{\frac{2(N-j)}{N}}\, \sigma_{r'}^{\frac{2(j-1)}{N}} .$$
*Proof idea:* Kronecker identities ($\mathrm{vec}[AB] = (B^\top \odot I)\mathrm{vec}[A] = (I \odot A)\mathrm{vec}[B]$; mixed product; $(A\odot B)^\top = A^\top\odot B^\top$; Kronecker of orthogonals is orthogonal) turn each summand into $\big([W^\top W]^{\frac{N-j}{N}} \odot [WW^\top]^{\frac{j-1}{N}}\big)$; with SVD $W_{1:N} = UDV^\top$, the sum diagonalizes as $Q = (V\odot U)\Lambda(V\odot U)^\top$.
*Exam relevance:* Interpretation matters: overparameterization by an LNN induces a location-dependent preconditioner that **stretches** the gradient along singular directions with large singular values of $W_{1:N}(t)$ and **attenuates** it along small ones — i.e., promotes movement in directions already traversed from (near-origin) initialization.

**Result (deficiency margin under whitened squared loss — worked example).** For the squared loss with whitened data:
$$\ell(W) = \tfrac12\mathrm{Tr}(W\Lambda_{xx}W^\top) - \mathrm{Tr}(W\Lambda_{yx}^\top) + \tfrac12\mathrm{Tr}(\Lambda_{yy}) \;\overset{\Lambda_{xx}=I}{=}\; \tfrac12\|W - \Lambda_{yx}\|_F^2 + \mathrm{const}.$$
Since $\min\{\|W' - \Lambda_{yx}\|_F : \sigma_{\min}(W') \le c\} = \max\{0,\ \sigma_{\min}(\Lambda_{yx}) - c\}$ (exercise in the notes),
$$W \text{ has deficiency margin } c > 0 \iff \|W - \Lambda_{yx}\|_F < \sigma_{\min}(\Lambda_{yx}) - c .$$
Special case $d_N = 1$ (linear regression, single output): a $(1,d_0)$ matrix has a single singular value equal to its Frobenius norm, so the condition becomes $\|W - \Lambda_{yx}\|_F < \|\Lambda_{yx}\|_F - c$; hence drawing $W$ from an isotropic distribution with standard deviation small relative to $\|\Lambda_{yx}\|_F$ yields a deficiency margin (some $c>0$) with probability approximately $1/2$.
*Exam relevance:* Both the $\frac12\|W-\Lambda_{yx}\|_F^2 + \text{const}$ rewriting and the probability-$\approx 1/2$ conclusion are quotable; the min-distance computation is flagged "exercise: prove this".

**Prop 2 ($\delta$-stationarity under strong convexity).** Let $f:\mathbb{R}^d\to\mathbb{R}$ be $\alpha$-strongly convex, attaining its global minimum $f^*$ at $x^*$. For any $\delta>0$, if $x$ is a $\delta$-stationary point ($\|\nabla f(x)\|_2 \le \delta$), then
$$f(x) \le f^* + \frac{\delta^2}{\alpha} .$$
*Proof idea:* Apply strong convexity twice (at $x$ toward $x^*$ and at $x^*$ toward $x$), use $\nabla f(x^*)=0$ and Cauchy-Schwarz to get $\|x^*-x\|_2 \le \delta/\alpha$; plug back into strong convexity.
*Exam relevance:* Used in Thm 2 in the equivalent (PL-type) form $\|\nabla f(x)\|_2^2 \ge \alpha\,(f(x) - f^*)$ (take $\delta := \|\nabla f(x)\|_2$).

**Thm 2 (GF convergence to global minimum, arbitrary depth).** Let $\ell:\mathbb{R}^{d_N,d_0}\to\mathbb{R}$ be continuously differentiable and $\alpha$-strongly convex, overparameterized by a depth-$N$ LNN, $\phi(W_1,\dots,W_N) := \ell(W_{1:N})$. Run GF over $\phi(\cdot)$ from a **balanced** initialization whose E2E matrix $W_{1:N}(0)$ has **deficiency margin** $c > 0$. Then for any $\epsilon > 0$, the objective $\phi(W_1(t),\dots,W_N(t))$ is within $\epsilon$ of the global minimum in time at most
$$\ln\!\big(\epsilon^{-1}\,(\phi(W_1(0),\dots,W_N(0)) - \ell^*)\big)\; c^{-\frac{2(N-1)}{N}}\,\alpha^{-1},$$
where $\ell^* := \min\{\ell(W) : W \in \mathbb{R}^{d_N,d_0}\}$.
*Proof idea:* With $g(t) := \ell(W_{1:N}(t))$, the chain rule and Prop 1 give $\dot g(t) = -\mathrm{vec}[\nabla\ell]^\top P\,\mathrm{vec}[\nabla\ell] \le -\lambda_{\min}(P)\|\nabla\ell\|_F^2$, and the spectrum yields $\lambda_{\min}(P_{W_{1:N}(t)}) \ge \sigma_{\min}(W_{1:N}(t))^{\frac{2(N-1)}{N}}$. Monotonic decrease of $g$ preserves the deficiency margin, so $\sigma_{\min}(W_{1:N}(t)) \ge c$ for all $t$; combining with $\|\nabla\ell\|_F^2 \ge \alpha(g - \ell^*)$ (Prop 2) gives $\dot g \le -\alpha c^{\frac{2N-2}{N}}(g-\ell^*)$; integrate $\dot g/(g-\ell^*)$ and exponentiate.
*Exam relevance:* This is the lecture's centerpiece: a **linear (exponential) convergence rate** to global minimum for arbitrarily deep LNNs — explicitly unobtainable via the landscape approach (Lecture 3, Prop 3). Know each ingredient: $\lambda_{\min}(P)$ bound, margin persistence, PL inequality, Gronwall-style integration.

**Thm 3 (GD version; Arora, Cohen, Golowich, Hu 2018 — stated without proof).** Let $\ell:\mathbb{R}^{d_N,d_0}\to\mathbb{R}$ be the squared loss for linear prediction with whitened data, $\phi$ its overparameterization by a depth-$N$ LNN. Run GD over $\phi(\cdot)$ from $W_1(0),\dots,W_N(0)$ whose E2E matrix $W_{1:N}(0)$ has deficiency margin $c>0$, and which are *approximately balanced*: for all $j\in[N-1]$,
$$\big\|W_{j+1}(0)^\top W_{j+1}(0) - W_j(0)W_j(0)^\top\big\|_F \;\le\; \frac{c^2}{256\cdot N^3\,\|\Lambda_{yx}\|_F^{\frac{2(N-1)}{N}}}\,.$$
Assume the step size satisfies
$$\eta \;\le\; \frac{c^{\frac{4N-2}{N}}}{6144\cdot N^3\,\|\Lambda_{yx}\|_F^{\frac{6N-4}{N}}}\,.$$
Then for any $\epsilon>0$, the objective is within $\epsilon$ of the global minimum in a number of steps no greater than
$$\frac{1}{\eta\, c^{\frac{2(N-1)}{N}}}\,\log\!\left(\frac{\phi(W_1(0),\dots,W_N(0)) - \ell^*}{\epsilon}\right),$$
with $\ell^* := \min\{\ell(W) : W\in\mathbb{R}^{d_N,d_0}\}$.
*Proof idea:* Discretization of the GF result "with considerable technical work"; not proven in the course.
*Exam relevance:* Know the qualitative shape: approximate balancedness tolerance $\propto c^2/(N^3\|\Lambda_{yx}\|_F^{2(N-1)/N})$, small-enough constant step size, and iteration count $\frac{1}{\eta c^{2(N-1)/N}}\log\frac{\phi(0)-\ell^*}{\epsilon}$ (linear rate).

## Techniques & tricks
- **Conservation laws from GF:** multiply the layer ODE by $W_j^\top$, compare adjacent layers, symmetrize (add transposes to form exact derivatives $\frac{d}{dt}(W_jW_j^\top)$), integrate over time. Balancedness = the idealized invariant for near-zero initialization.
- **SVD alignment under balancedness:** equate two orthogonal eigendecompositions $\Rightarrow$ equal singular value matrices ($\Sigma_{j+1} = \Sigma_j$); distinct eigenvalues force eigenvectors to match up to signs ($U_j = V_{j+1}D_j$, $D_j$ diagonal $\pm1$, $D_j^2 = I$); telescoping products give fractional powers: $W_{j:N}W_{j:N}^\top = [W_{1:N}W_{1:N}^\top]^{\frac{N-j+1}{N}}$.
- **Fractional matrix powers** of PSD matrices defined spectrally; $[A]^0 = I$ convention.
- **Kronecker/vectorization toolkit:** $\mathrm{vec}[AB] = (B^\top\odot I_{rA})\mathrm{vec}[A] = (I_{cB}\odot A)\mathrm{vec}[B]$; $(A_1\odot A_2)(B_1\odot B_2) = (A_1B_1)\odot(A_2B_2)$; $(A\odot B)^\top = A^\top\odot B^\top$; Kronecker product of orthogonal matrices is orthogonal — used to diagonalize the preconditioner in the basis $\mathrm{vec}(u_rv_{r'}^\top)$.
- **Lyapunov/monotonicity argument:** $\dot g \le -\lambda_{\min}(P)\|\nabla\ell\|_F^2 \le 0$; a quantity controlled by the loss level (here $\sigma_{\min}(W_{1:N}) \ge c$ via the deficiency margin) persists along the trajectory.
- **PL-type inequality from strong convexity:** $\|\nabla f(x)\|_2^2 \ge \alpha(f(x)-f^*)$, obtained from Prop 2 with $\delta := \|\nabla f(x)\|_2$.
- **Gronwall-style integration:** from $\dot g \le -\kappa(g-\ell^*)$, integrate $\frac{\dot g}{g-\ell^*}$, exponentiate to get $g(T)-\ell^* \le (g(0)-\ell^*)e^{-\kappa T}$.

## Exam-relevant nuggets
- Balancedness orientation is asymmetric — $W_{j+1}^\top W_{j+1} = W_j W_j^\top$ (input Gram of layer $j{+}1$ equals output Gram of layer $j$); writing it with the transposes flipped is wrong.
- The conserved quantity has a name and exact form: $C_{j,j+1} := W_{j+1}(0)^\top W_{j+1}(0) - W_j(0)W_j(0)^\top$, constant under GF for every $j \in [N-1]$ (Lemma 1 = the $C_{j,j+1}=0$ case).
- E2E dynamics exponents: left factor $[W_{1:N}W_{1:N}^\top]^{\frac{j-1}{N}}$, right factor $[W_{1:N}^\top W_{1:N}]^{\frac{N-j}{N}}$, summed over $j = 1,\dots,N$ (the two orderings of the sum are equivalent by $j \mapsto N{+}1{-}j$).
- Depth $N=1$ sanity check: dynamics reduce to plain GF $\dot W = -\nabla\ell(W)$; the preconditioner is nontrivial only for $N \ge 2$.
- Preconditioner spectrum: eigenpair $\big(\mathrm{vec}(u_rv_{r'}^\top),\ \sum_{j=1}^N\sigma_r^{2(N-j)/N}\sigma_{r'}^{2(j-1)/N}\big)$; key corollary $\lambda_{\min}(P_{W_{1:N}(t)}) \ge \sigma_{\min}(W_{1:N}(t))^{\frac{2(N-1)}{N}}$ (equality-style computation when $d_0 \neq d_N$, using a $\sigma_{\min}^0$ factor; inequality when $d_0 = d_N$).
- Deficiency margin (Def 3) uses a **strict** inequality against all $W'$ with $\sigma_{\min}(W') \le c$; its role: since $g(t)$ is non-increasing, $W_{1:N}(t)$ keeps margin $c$, hence $\sigma_{\min}(W_{1:N}(t)) \ge c$ for all $t \ge 0$ — this is what keeps the preconditioner uniformly positive definite along the trajectory.
- GF convergence time: $\ln(\epsilon^{-1}(\phi(0)-\ell^*))\, c^{-2(N-1)/N}\alpha^{-1}$. Note the depth dependence enters only through the exponent $\frac{2(N-1)}{N} \in [1, 2)$.
- Random small isotropic initialization gives a deficiency margin with probability $\approx 1/2$ (for $d_N=1$) — **not** w.h.p.; a trap when comparing to Lecture 3's w.h.p. saddle escape.
- Assumption bookkeeping: Thm 1 needs only continuously differentiable $\ell$ + balanced init (proof shown under square dimensions + a layer with distinct singular values, both removable); Thm 2 adds $\alpha$-strong convexity + deficiency margin; Thm 3 (GD) specializes to whitened squared loss and needs approximate balancedness + small step size with the exact constants $256$ and $6144$.
- Big picture for essays: trajectory approach succeeds exactly where the landscape approach failed — global-minimum convergence guarantees for arbitrarily deep LNNs; the mechanism is an implicit, location-dependent preconditioning induced by overparameterization.
