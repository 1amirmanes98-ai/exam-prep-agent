# Lecture 5 - Optimization 3
- **File:** materials/lectures/lecture_05_optimization_3.pdf | **Text:** materials/text/lectures/lecture_05_optimization_3.txt
- **Pillar:** Optimization
- **One-paragraph summary:** Extends the trajectory approach to **non-linear** networks via the **Neural Tangent Kernel (NTK)** regime of ultra-wide networks (based on Arora et al.). For GF on the $\ell_2$ loss, the training predictions $u(t)$ obey the exact dynamics $\dot u(t) = -H(t)(u(t)-y)$, where $H(t)$ is the (always PSD) Gram matrix of network Jacobians. If the network is wide enough, $H(t) \approx H(0) \approx H^*$, a deterministic matrix with a closed form — so training is approximately a linear ODE: in $H^*$'s eigenbasis, error coordinates decay as $e^{-\lambda_i t}$, giving **exponential convergence of the training loss to zero (a global minimum of a non-convex objective) whenever $H^*$ is non-singular**. Moreover, in the regime where the Jacobian is constant (output affine in weights), the function learned is **exactly kernel regression** with the NTK $K(x,x') = \langle\phi(x),\phi(x')\rangle$. Quantitative width bounds are proven for a shallow network — Hoeffding concentration at initialization ($n \gtrsim m^4/\epsilon^2$) and kernel stability during training ($n \gtrsim c^2m^6t^2/\epsilon^2$, via the $1/\sqrt n$ "lazy" weight-movement bound) — and the deep-network NTK is given by an explicit layerwise Gaussian recursion. Caveat emphasized by the notes: the required widths are prohibitive; analysis is for GF but adaptable to GD.

## Outline
1. **Trajectory Approach (continued)**
   - 1.1 **Ultra-Wide Neural Networks** — abstract network $f(w,x)$, $\ell_2$ loss; exact prediction-space dynamics $\dot u(t) = -H(t)(u(t)-y)$ (Lemma 1); wide networks: $H(t) \approx H(0) \approx H^*$ deterministic, hence approximately linear dynamics, exponential convergence to zero loss when $H^* \succ 0$.
     - 1.1.1 **Equivalence to Kernel Regression** — constant-Jacobian (affine) regime: learned predictor $= $ kernel regression with the NTK.
     - 1.1.2 **Shallow Network** — one trained hidden layer, fixed $\pm1$ output weights; NTK $K_s(x,x') = x^\top x'\,\mathbb{E}_w[\dot\sigma(w^\top x)\dot\sigma(w^\top x')]$; Prop 1 (concentration at init), Prop 2 (kernel stays put during training).
     - 1.1.3 **Deep Network** — $\sqrt{c_\sigma/d}$-scaled deep architecture; recursive definitions $\Sigma^{(n)}, \dot\Sigma^{(n)}$; closed-form deep NTK $K_d$ (stated without proof, infinite-width limit).

## Key definitions
**Def (abstract NN and training setup).** A (possibly non-linear) NN architecture is a differentiable $f : \mathbb{R}^k \times \mathbb{R}^d \to \mathbb{R}$, where $f(w,x)$ is the output on input $x \in \mathbb{R}^d$ with weights $w \in \mathbb{R}^k$. Given training data $\{(x_i,y_i)\}_{i=1}^m \subseteq \mathbb{R}^d\times\mathbb{R}$, train by GF on the $\ell_2$ loss
$$\ell(w) = \frac12\sum_{i=1}^m \big(f(w,x_i) - y_i\big)^2 .$$

**Def (prediction curve and labels).** $u : \mathbb{R}_{\ge0} \to \mathbb{R}^m$, $u(t) := [f(w(t),x_1),\dots,f(w(t),x_m)]^\top$; $y := [y_1,\dots,y_m]^\top \in \mathbb{R}^m$.

**Def (time-varying kernel matrix $H(t)$).** $H(t) \in \mathbb{R}^{m,m}$ is the PSD matrix
$$(H(t))_{i,j} = \left\langle \frac{\partial}{\partial w} f(w(t),x_i),\ \frac{\partial}{\partial w} f(w(t),x_j) \right\rangle .$$

**Def (spectral coordinates).** $H^*$ PSD with orthogonal eigendecomposition $H^* = V\Lambda V^\top$, $\Lambda = \mathrm{diag}(\lambda_1,\dots,\lambda_m) \ge 0$; change of variables

$$q(t) := V^\top(u(t) - y) \iff u(t) = Vq(t) + y$$

**Def (features and NTK, affine regime).** When $\frac{\partial}{\partial w}f(w(t),x)$ is independent of $w(t)$ (NN output affine in $w$), define $\phi(x) := \frac{\partial}{\partial w}f(w(t),x) \in \mathbb{R}^k$; then $f(w,x) = \langle\phi(x),w\rangle + b_x$, and $b_x = 0$ in the common setting where zero weights give zero output. $\Phi \in \mathbb{R}^{k,m}$ has $i$-th column $\phi(x_i)$. The kernel
$$K : \mathbb{R}^d\times\mathbb{R}^d \to \mathbb{R},\qquad K(x,x') := \langle\phi(x), \phi(x')\rangle$$
is the **Neural Tangent Kernel (NTK)**; it depends on the architecture. $H^* = \Phi^\top\Phi$ is its Gram matrix: $(H^*)_{i,j} = K(x_i,x_j)$.

**Def (shallow network).** Input $x \in \mathbb{R}^d$ with $\|x\| = 1$. Activation $\sigma(\cdot)$: non-linear, twice continuously differentiable, with $\big|\frac{d}{dz}\sigma(z)\big| \le 1$ and $\big|\frac{d^2}{dz^2}\sigma(z)\big| \le 1$. Hidden weights $\{w_r\}_{r=1}^n$ initialized i.i.d. $w_r(0) \sim \mathcal{N}(0,I)$ ($d$-dimensional), optimized via GF over the $\ell_2$ loss. Output weights $\{a_r\}_{r=1}^n$ initialized i.i.d. $a_r(0) = +1$ w.p. $0.5$, $-1$ w.p. $0.5$, **fixed during training**. With $W := [w_1,\dots,w_n]\in\mathbb{R}^{d,n}$, $a := [a_1,\dots,a_n]^\top$:
$$f_a : \mathbb{R}^{d,n}\times\mathbb{R}^d \to \mathbb{R},\qquad f_a(W,x) = \frac{1}{\sqrt n}\sum_{r=1}^n a_r\,\sigma(w_r^\top x) .$$
The objective $\ell(W) = \frac12\sum_i (f_a(W,x_i)-y_i)^2$ is non-convex (due to $\sigma$), despite only one layer being trained.

**Def (shallow NTK).** With $\dot\sigma(z) := \frac{d}{dz}\sigma(z)$:
$$K_s(x,x') := x^\top x' \cdot \mathbb{E}_{w\sim\mathcal N(0,I)}\big[\dot\sigma(w^\top x)\,\dot\sigma(w^\top x')\big] .$$
$H^* \in \mathbb{R}^{m,m}$ is its Gram matrix, $(H^*)_{i,j} = K_s(x_i,x_j)$.

**Def (deep network).** 
$$f((W_1,\dots,W_N),x) := W_N \sqrt{\tfrac{c_\sigma}{d_{N-1}}}\,\sigma\!\left(W_{N-1}\sqrt{\tfrac{c_\sigma}{d_{N-2}}}\,\sigma\!\left(W_{N-2}\cdots\sqrt{\tfrac{c_\sigma}{d_1}}\,\sigma(W_1x)\cdots\right)\right),$$
where $W_n \in \mathbb{R}^{d_n,d_{n-1}}$, $n\in[N-1]$, and $W_N \in \mathbb{R}^{1,d_N}$ (as printed; the final layer maps the last hidden layer to a scalar) are the optimized weights, entries initialized i.i.d. $\mathcal N(0,1)$; $\sigma(\cdot)$ is a point-wise activation; and
$$c_\sigma := \big(\mathbb{E}_{z\sim\mathcal N(0,1)}[\sigma(z)^2]\big)^{-1}.$$
The NTK is presented in the limit of large hidden widths $d_1,\dots,d_N \to \infty$.

**Def (deep NTK recursions).** Recursively define, for $n \in [N]$:
$$\Sigma^{(0)}(x,x') := x^\top x',\qquad \Lambda^{(n)}(x,x') := \begin{pmatrix}\Sigma^{(n-1)}(x,x) & \Sigma^{(n-1)}(x,x')\\ \Sigma^{(n-1)}(x',x) & \Sigma^{(n-1)}(x',x')\end{pmatrix}\in\mathbb{R}^{2,2},$$
$$\Sigma^{(n)}(x,x') := c_\sigma\,\mathbb{E}\big[\sigma(u)\sigma(v)\big],\qquad (u,v)\sim\mathcal N\big(0,\Lambda^{(n)}(x,x')\big).$$
Additionally (as written in the notes, a parallel recursion built from $\dot\Sigma$ itself):
$$\dot\Sigma^{(0)}(x,x') := x^\top x',\qquad \dot\Lambda^{(n)}(x,x') := \begin{pmatrix}\dot\Sigma^{(n-1)}(x,x) & \dot\Sigma^{(n-1)}(x,x')\\ \dot\Sigma^{(n-1)}(x',x) & \dot\Sigma^{(n-1)}(x',x')\end{pmatrix}\in\mathbb{R}^{2,2},$$
$$\dot\Sigma^{(n)}(x,x') := c_\sigma\,\mathbb{E}\big[\dot\sigma(u)\dot\sigma(v)\big],\qquad (u,v)\sim\mathcal N\big(0,\dot\Lambda^{(n)}(x,x')\big).$$

## Key theorems & results
**Lem 1 (prediction-space dynamics — exact).** Under GF on the $\ell_2$ loss, $u(t)$ follows
$$\forall t \in \mathbb{R}_{\ge0}:\quad \dot u(t) = -H(t)\,\big(u(t) - y\big),$$
with $H(t)$ as defined above (PSD).

**Proof idea:**

$$\dot w(t) = -\nabla\ell(w(t)) = -\sum_{j=1}^m (f(w(t),x_j)-y_j)\frac{\partial}{\partial w}f(w(t),x_j)$$

apply the chain rule to $\frac{d}{dt}f(w(t),x_i)$ and recognize the inner products as $(H(t))_{i,j}$.

**Exam relevance:** This derivation is short, exact (no width assumption), and highly likely to be asked; know that PSD-ness is automatic (Gram matrix).

**Result (convergence under the idealized dynamics).** If the NN is wide enough then $H(t) \approx H(0)$ throughout training, and under suitable random initialization $H(0) \approx H^*$ deterministic, giving $\dot u(t) \approx -H^*(u(t)-y)$. Treating this as exact and diagonalizing ($q := V^\top(u-y)$):
$$\forall i \in [m]:\quad (q(t))_i = (q(0))_i\,e^{-\lambda_i t},\qquad \|q(t)\|_2^2 = \|u(t)-y\|_2^2 = 2\,\ell(w(t)).$$
If $H^*$ is non-singular ($\lambda_i > 0\ \forall i$), the training loss converges to the global minimum (zero) exponentially fast; specifically $\ell(w(t)) < \epsilon$ for any
$$t > \max_{i\in[m]} \frac{1}{2\lambda_i}\,\log\!\left(\frac{m\,(q(0))_i^2}{2\epsilon}\right).$$

**Proof idea:** $\dot q = -\Lambda q$ decouples into scalar ODEs $\dot q_i = -\lambda_i q_i$; integrate $\frac{\dot q_i}{q_i}$.

**Exam relevance:** Global-minimum convergence for a non-convex objective; each error mode decays at its own rate $\lambda_i$ (eigenvalues of the NTK Gram matrix set the speed).

**Result (equivalence to kernel regression).** In the regime $H(t) \approx H^*$ with $\frac{\partial}{\partial w}f$ independent of $w$ (affine outputs, $b_x = 0$):

$$\dot w(t) = -\Phi(\Phi^\top w(t) - y)$$

so with $w(0) \approx 0$, $w(t)$ stays in the column space of $\Phi$, i.e., $w(t) = \Phi r(t)$; then

$$u(t) = \Phi^\top w(t) = \Phi^\top\Phi\, r(t) = H^* r(t)$$

Assuming $H^*$ full-rank, $u(t) \to y$ forces $r(t) \to (H^*)^{-1}y$ and
$$w(t) \xrightarrow{t\to\infty} \Phi\,(H^*)^{-1}y,$$
so the prediction function returned by training is
$$x \mapsto f\big(\Phi(H^*)^{-1}y,\ x\big) = \big[K(x,x_1),\dots,K(x,x_m)\big]^\top (H^*)^{-1}\, y$$
— **precisely kernel regression** with the NTK $K(\cdot,\cdot)$.

**Proof idea:** Substitute $f(w,x) = \langle\phi(x),w\rangle$ everywhere; the limit predictor is $\langle\phi(x), \Phi(H^*)^{-1}y\rangle$, whose entries are kernel evaluations.

**Exam relevance:** The punchline identity "trained ultra-wide NN $=$ NTK kernel regression"; be able to reproduce the full chain

$$w(t)=\Phi r(t) \Rightarrow u = H^*r \Rightarrow w_\infty = \Phi(H^*)^{-1}y$$

**Result (shallow NTK formula).** For the shallow architecture, if $n$ is sufficiently large then for any $t \ge 0$, $H(t)$ is approximately the Gram matrix of
$$K_s(x,x') = x^\top x'\cdot\mathbb{E}_{w\sim\mathcal N(0,I)}\big[\dot\sigma(w^\top x)\,\dot\sigma(w^\top x')\big].$$
Established via Prop 1 (at $t=0$) + Prop 2 (for $t>0$).

**Prop 1 (concentration at initialization).** Let $\epsilon > 0$, $\delta \in (0,1)$. If
$$n \ \ge\ \frac{2m^4}{\epsilon^2}\,\log\!\left(\frac{m^2}{\delta}\right),$$
then w.p. $\ge 1-\delta$ over the initialization of $w_1,\dots,w_n$:

$$\|H(0) - H^*\|_{\mathrm{spectral}} \le \epsilon$$

(spectral norm = max singular value), where $(H^*)_{i,j} = K_s(x_i,x_j)$.

**Proof idea:**

$$(H(0))_{i,j} = \frac1n\sum_{r=1}^n x_i^\top x_j\,\dot\sigma(w_r(0)^\top x_i)\,\dot\sigma(w_r(0)^\top x_j)$$

is an average of $n$ i.i.d. copies of $\gamma := x_i^\top x_j\dot\sigma(w^\top x_i)\dot\sigma(w^\top x_j) \in [-1,1]$ (using $a_r^2 = 1$, $|\dot\sigma|\le1$, $\|x_i\|=1$) with $\mathbb{E}[\gamma] = K_s(x_i,x_j)$; Hoeffding at accuracy $\epsilon/m^2$ per entry, union bound over $m^2$ entries, then

$$\|A\|_{\mathrm{spectral}} \le \|A\|_F \le \sum_{i,j}|A_{i,j}|$$

**Exam relevance:** Standard concentration pipeline (Hoeffding + union bound + norm domination) — reproducible on demand.

**Prop 2 (kernel stability during training).** Let $t \ge 0$. Assume $|y_i| \le c$ and $\max_{\tau\in[0,t]}|(u(\tau))_i| \le c$ for all $i \in [m]$, for some $c > 0$. If
$$n \ \ge\ \frac{16\,c^2 m^6 t^2}{\epsilon^2},$$
then $\|H(t) - H(0)\|_{\mathrm{spectral}} \le \epsilon$.

**Proof idea:** Integrate GF for a single neuron:

$$\|w_r(t) - w_r(0)\| \le \int_0^t\|\dot w_r\| \le \frac{2cmt}{\sqrt n}$$

(triangle inequality; $|u_i - y_i| \le 2c$, $|\dot\sigma| \le 1$, $\|x_i\| = 1$, $1/\sqrt n$ scaling). Mean value theorem with $|\ddot\sigma| \le 1$:

$$|\dot\sigma(w_r(t)^\top x) - \dot\sigma(w_r(0)^\top x)| \le \|w_r(t)-w_r(0)\|$$

giving the entrywise bound $|(H(t))_{i,j} - (H(0))_{i,j}| \le \frac{4cmt}{\sqrt n}$; finish with

$$\|H(t)-H(0)\|_{\mathrm{spectral}} \le m^2\max_{i,j}|(H(t))_{i,j}-(H(0))_{i,j}| \le \frac{4cm^3t}{\sqrt n}$$

**Exam relevance:** The "lazy training" mechanism: per-neuron movement is $O(1/\sqrt n)$, so the kernel is nearly frozen; know the three intermediate bounds $\frac{2cmt}{\sqrt n}$, $\frac{4cmt}{\sqrt n}$, $\frac{4cm^3t}{\sqrt n}$.

**Result (deep NTK; stated without proof).** In the infinite-width limit, the NTK of the deep network $K_d : \mathbb{R}^{d_0}\times\mathbb{R}^{d_0} \to \mathbb{R}$ is
$$K_d(x,x') = \sum_{n=1}^{N}\left(\Sigma^{(n-1)}(x,x') \prod_{n'=n}^{N} \dot\Sigma^{(n')}(x,x')\right),$$
with $\Sigma^{(n)}, \dot\Sigma^{(n)}$ as in the recursive definitions above.

**Exam relevance:** Know the structure — sum over layers of (layer-$(n{-}1)$ covariance) $\times$ (product of derivative-kernels from layer $n$ to $N$) — and the roles of $c_\sigma$ and the 2-by-2 Gaussian covariances $\Lambda^{(n)}$.

## Techniques & tricks
- **Lifting parameter dynamics to function space:** chain rule on $\frac{d}{dt}f(w(t),x_i)$ converts GF on weights into kernel dynamics on predictions; $H(t)$ is a Gram matrix of Jacobians, hence PSD for free.
- **Diagonalize a linear ODE:** orthogonal change of variables $q = V^\top(u-y)$ decouples $\dot u = -H^*(u-y)$ into $\dot q_i = -\lambda_iq_i$; solve by integrating $\dot q_i/q_i$; orthogonality preserves norms ($\|q\|_2^2 = 2\ell$).
- **Affine/linear-regime reasoning:** constant Jacobian $\Rightarrow$ $f(w,x)=\langle\phi(x),w\rangle$; GF from $w(0)\approx0$ stays in $\mathrm{col}(\Phi)$ — parametrize $w(t) = \Phi r(t)$ to identify the limit as the minimum-norm/kernel-regression solution.
- **Concentration pipeline for random kernels:** write each entry as an i.i.d. average, bound the summand range, Hoeffding, union bound over entries, then pass to spectral norm via $\|A\|_{\mathrm{spectral}} \le \|A\|_F \le \sum_{i,j}|A_{i,j}|$.
- **Lazy-training displacement bound:** integrate the single-neuron ODE, use the $\frac{1}{\sqrt n}$ output scaling and bounded residuals to show each $w_r$ moves $O(1/\sqrt n)$ — width buys trajectory stability.
- **Mean value theorem transfer:** bounded $\ddot\sigma$ converts weight displacement into kernel-entry displacement.
- **Layerwise Gaussian recursion:** infinite-width kernels computed by propagating 2-by-2 covariance matrices $\Lambda^{(n)}$ through Gaussian expectations of $\sigma$ (and $\dot\sigma$), normalized by $c_\sigma$.

## Exam-relevant nuggets
- $\dot u(t) = -H(t)(u(t)-y)$ is **exact** for GF on the $\ell_2$ loss — no width or architecture assumption; approximations enter only via $H(t)\approx H(0)\approx H^*$.
- $H(t)$ is PSD always; **non-singularity of $H^*$** is the condition for exponential convergence to **zero** training loss — global optimality despite non-convexity of $\ell$.
- Useful identity: $\|q(t)\|_2^2 = \|u(t)-y\|_2^2 = 2\,\ell(w(t))$; convergence time $t > \max_i\frac{1}{2\lambda_i}\log\frac{m(q(0))_i^2}{2\epsilon}$ — the **smallest** eigenvalue of $H^*$ dominates.
- The shallow model's objective is non-convex even though only the hidden layer is trained — the non-linearity of $\sigma$ suffices.
- Shallow NTK: $K_s(x,x') = x^\top x'\,\mathbb{E}_{w\sim\mathcal N(0,I)}[\dot\sigma(w^\top x)\dot\sigma(w^\top x')]$ — note it involves $\dot\sigma$, not $\sigma$; assumptions: $\|x\|=1$, $|\dot\sigma|\le1$, $|\ddot\sigma|\le1$, $w_r\sim\mathcal N(0,I)$, $a_r \in \{\pm1\}$ fixed.
- Width bounds to memorize: $n \ge \frac{2m^4}{\epsilon^2}\log\frac{m^2}{\delta}$ (init concentration, w.p. $1-\delta$) and $n \ge \frac{16c^2m^6t^2}{\epsilon^2}$ (stability up to time $t$, assuming $|y_i|\le c$ and $|(u(\tau))_i|\le c$ on $[0,t]$). The $t^2$ dependence means the guarantee is on a finite time horizon; overall widths are "prohibitive" — the stated caveat of the NTK framework.
- Kernel-regression equivalence needs: constant Jacobian (affine regime), zero-weights-give-zero-output (so $b_x=0$), $w(0)\approx0$, $H^*$ full rank; learned predictor $x \mapsto [K(x,x_1),\dots,K(x,x_m)]^\top(H^*)^{-1}y$.
- Deep NTK ingredients: scaling factors $\sqrt{c_\sigma/d_n}$ inside the architecture, $c_\sigma = (\mathbb{E}_{z\sim\mathcal N(0,1)}[\sigma(z)^2])^{-1}$, i.i.d. $\mathcal N(0,1)$ weights, limit $d_1,\dots,d_N\to\infty$; formula $K_d(x,x') = \sum_{n=1}^N\big(\Sigma^{(n-1)}(x,x')\prod_{n'=n}^N\dot\Sigma^{(n')}(x,x')\big)$.
- Caution on the notes' $\dot\Sigma$ recursion: as printed, $\dot\Lambda^{(n)}$ is built from $\dot\Sigma^{(n-1)}$ (a self-contained recursion); in the published NTK literature (e.g., Arora et al. 2019) the $\dot\sigma$-expectation is usually taken w.r.t. $\Lambda^{(n)}$ built from $\Sigma^{(n-1)}$. For the exam, follow the notes' version but don't be confused when cross-referencing.
- The NTK analysis is presented for GF; the notes state it "can be adapted to account for GD as well" — and the framework's stated purpose is proving convergence for **non-linear** NNs, completing the arc: landscape (L3) $\to$ trajectories for LNNs (L4) $\to$ trajectories for non-linear ultra-wide NNs (L5).
