# Homework: Assignment 3 — Optimization 2 + Generalization 1
- **File:** materials/homework/hw_optimization.pdf
- **Related lectures:** lecture_04_optimization_2 (trajectory approach, end-to-end dynamics of linear networks), lecture_05_optimization_3 (ultra-wide networks / NTK), lecture_06_generalization_1 (empirical phenomena in generalization), lecture_07_generalization_2 and lecture_08_generalization_3 (compression, Rademacher, PAC-Bayes bounds); complements fodl_recitation_gradient_flow

## Problems
### Part 1: Trajectory Approach — Linear Neural Networks

**P1.1 (5 pts).** Complete the class proof sketch of the end-to-end dynamics: under the theorem's conditions (GF on a depth-$N$ linear net with balanced initialization), show

$$W_{1:j}(t)^\top W_{1:j}(t) = \big[W_{1:N}(t)^\top W_{1:N}(t)\big]^{\frac{j}{N}} \quad \forall t \in \mathbb{R}_{\ge0},\ j \in [N],$$

where $W_{1:j} := W_j W_{j-1}\cdots W_1$.
Key ideas:
- Balancedness $W_{j+1}^\top W_{j+1} = W_j W_j^\top$ is conserved under GF; propagate it through products.
- Use SVDs of consecutive factors: balancedness aligns singular vectors and equalizes singular values, so the product's Gram matrix is a power of the end-to-end Gram matrix (fractional power $j/N$).

**P1.2 (6 pts).** Extend the end-to-end dynamics to a depth-2 *symmetric* linear network: for $C^1$ loss $\ell:\mathbb{R}^{d,d}\to\mathbb{R}$ and $\phi(U) = \ell(UU^\top)$, derive the dynamics of $W(t) := U(t)U(t)^\top$ induced by GF $\dot U(t) = -\nabla\phi(U(t))$.
Key ideas:
- Chain rule: $\nabla\phi(U) = \big(\nabla\ell(UU^\top) + \nabla\ell(UU^\top)^\top\big)U$; then $\dot W = \dot U U^\top + U\dot U^\top$.
- Substituting gives a preconditioned flow of the form $\dot W = -\big[\nabla\ell(W)_{\mathrm{sym}} W + W \nabla\ell(W)_{\mathrm{sym}}\big]$ (gradient multiplied by $W$ on each side) — the PSD factor $W$ plays the preconditioner role.

**P1.3 (6 pts).** Simplify the end-to-end dynamics

$$\dot W(t) = -\sum_{j=1}^N [W W^\top]^{\frac{j-1}{N}}\,\nabla\ell(W)\,[W^\top W]^{\frac{N-j}{N}}$$

for output dimension $d_N = 1$ (row vector $W$), and explain how the result resonates with "promoting movement in directions already taken".
Key ideas:
- With $d_N = 1$, $WW^\top = \|W\|_2^2$ is scalar; the dynamics collapse to $\dot W = -\|W\|_2^{2-\frac2N}\big(\nabla\ell + (N-1)\,P_{W}\,\nabla\ell\big)$-type form, i.e., $\dot W^\top = -\|W(t)\|^{2-\frac{2}{N}}\Big(I + (N-1)\,\frac{W^\top W}{\|W\|^2}\Big)\nabla\ell(W(t))^\top$ (projection onto the current direction amplified by factor $N$).
- Interpretation: the gradient component along the current $W$ direction is boosted ($\times N$) and the overall rate scales with $\|W\|^{2-2/N}$ — depth induces momentum-like acceleration along directions already taken (implicit bias toward low-rank / aligned solutions).

**P1.4 (Experiment, 8 pts).** Scalar regression, $\ell_2$ loss, full-batch GD, small LR, near-zero init: train a depth-$N$ linear network (hidden widths $\ge \min\{d_{\text{in}}, d_{\text{out}}\}$) and compare the end-to-end matrix's trajectory to directly iterating the discretized end-to-end dynamics on a linear model:

$$W_{t+1} \leftarrow W_t - \eta\sum_{j=1}^N \big[W_tW_t^\top\big]^{\frac{j-1}{N}}\,\nabla\ell(W_t)\,\big[W_t^\top W_t\big]^{\frac{N-j}{N}}.$$

Repeat for $N = 2, 3$.
Key ideas:
- With small LR and near-zero (approximately balanced) init the two trajectories should coincide, validating the end-to-end dynamics theorem; deviations grow with LR (discretization) and unbalancedness.

### Part 1 (cont.): Ultra-Wide Neural Networks

**P1.5 (6 pts).** For the idealized NTK dynamics $\dot u(t) = -H^*(u(t)-y)$ with $H^* \succ 0$, $\lambda_{\min}(H^*) \ge \lambda > 0$ ($u(t)$ = network predictions on the $m$ training points, $y$ = labels): class showed $u(t) \to y$ exponentially fast via eigendecomposition change of variables. Re-derive the result *without* change of variables. Hint: compute $\tfrac{d}{dt}\|u(t)-y\|^2$.
Key ideas:
- $\tfrac{d}{dt}\|u-y\|^2 = -2(u-y)^\top H^*(u-y) \le -2\lambda\|u-y\|^2$ by the Rayleigh-quotient bound.
- Grönwall/integrating factor: $\|u(t)-y\|^2 \le e^{-2\lambda t}\|u(0)-y\|^2$.

**P1.6 (Bonus 10 pts).** Realistic dynamics $\dot u(t) = -H(t)(u(t)-y)$ with $\|H(t) - H^*\|_{\text{spectral}} \le \epsilon$ and same $u(0)$: show $u(t)$ is at most $O(\sqrt{t}\,\epsilon)$ (Euclidean) away from the idealized solution of (1).
Key ideas:
- Let $\delta(t) = u_{(2)}(t) - u_{(1)}(t)$; $\dot\delta = -H^*\delta + (H^*-H(t))(u_{(2)}-y)$, so $\tfrac{d}{dt}\|\delta\| \le \epsilon\,\|u_{(2)}(t)-y\|$ (the $-H^*\delta$ term only shrinks $\|\delta\|$).
- $\|u_{(2)}(t)-y\|$ stays bounded by $\|u(0)-y\|$ (residual non-increasing); integrate — with the decaying residual bound one gets the $O(\sqrt t\,\epsilon)$ growth (Cauchy–Schwarz over $\int_0^t e^{-\lambda s}$-type factors).

**P1.7 (Experiment, 8 pts).** With the class NTK formula for a shallow network,

$$k(x,x') = x^\top x'\cdot\mathbb{E}_{W\sim\mathcal N(0,I)}\big[\dot\sigma(W^\top x)\dot\sigma(W^\top x')\big]$$

, which for ReLU is

$$k(x,x') = x^\top x'\cdot\frac{1}{2\pi}\Big(\pi - \arccos\Big(\frac{x^\top x'}{\|x\|\|x'\|}\Big)\Big),$$

compare $u(t)$ of GF over an actual shallow ReLU net to a direct implementation of the kernel dynamics (1) on a scalar regression dataset ($\ell_2$ loss, small LR); vary width — does the match improve with width?
Key ideas:
- Wider network $\Rightarrow$ empirical NTK closer to its infinite-width limit $H^*$ $\Rightarrow$ trajectories match more closely (the "lazy" / kernel regime).

### Part 2: Empirical Phenomena in Generalization

**P2.1 (Experiment, 25 pts).** Demonstrate the four empirical postulates used in class to reason about generalization in deep learning (à la Zhang et al., ICLR 2017 — "Understanding deep learning requires rethinking generalization"). Recommended: CIFAR10 + standard architecture (e.g., InceptionV3), GPU.
Key ideas:
- Postulates to reproduce: (i) large networks fit ("shatter") the training data, even with random labels; (ii) they nonetheless generalize on true labels; (iii) generalization degrades as label noise/randomization increases; (iv) explicit regularization is neither necessary nor sufficient — implicit regularization of the optimizer is at play.

### Part 3: Generalization Bounds

**P3.1 (9 pts). Compression.** FFFC network with all dims $= d$, $\gamma$-Lipschitz activation, $\sigma(0)=0$, inputs with $\|x\|\le1$; $\mathcal H_r$ = same architecture with every weight matrix factorized $W_n = U_nV_n^\top$, $U_n,V_n \in \mathbb{R}^{d,r}$ (rank $\le r$), each of the $2Ndr$ parameters stored in $b$ bits; loss $\ell:\mathbb{R}^d\times\mathbb{R}^d\to[0,1]$ that is $\rho$-Lipschitz in its 2nd argument.
(a) For fixed $r$, derive a generalization bound for $\mathcal H$ by compressing into $\mathcal H_r$.
(b) Derive a bound by simultaneously compressing into $\mathcal H_r$ for *all* $r \in [d]$.
Key ideas:
- $\mathcal H_r$ is a finite class of size $\le 2^{2Ndrb}$; finite-class bound gives gap $\lesssim \sqrt{\frac{2Ndrb\ln2 + \ln(1/\delta)}{2m}}$ for the compressed net.
- Compression error: rank-$r$ truncation of each layer perturbs the output; Lipschitz composition gives error $\rho\cdot\gamma^{N-1}\big(\sum_n \|W_n - W_n^{(r)}\|\prod_{k\ne n}\|W_k\|\big)$-style, controlled by discarded singular values.
- (b): union bound over $r \in [d]$ (extra $\ln d$ / $\delta \to \delta/d$), then pick the best trade-off $r$ per learned network — a "structural risk minimization over ranks" bound.

**P3.2 (9 pts). Rademacher complexity and norms.**

$$\mathcal H = \{h_\theta : \theta\in\mathbb{R}^p, \|\theta\|_\infty \le 0.5\}$$

; for $\Theta$ a subset of the cube,

$$\mathcal H_\Theta = \{h_\theta : \theta\in\Theta\}$$

, with Rademacher complexity

$$\mathcal R(\ell\circ\mathcal H_\Theta\circ S) = \frac1m\mathbb{E}_{\xi}\big[\sup_{v\in\ell\circ\mathcal H_\Theta\circ S}\sum_{i=1}^m\xi_iv_i\big]$$

($\xi_i = \pm1$ w.p. $\tfrac12$). *Assume*

$$\mathbb{E}_S[\mathcal R(\ell\circ\mathcal H_\Theta\circ S)] = \mathrm{Volume}(\Theta) = \int \mathbb{1}[\theta\in\Theta]d\theta$$

, and that implicit regularization returns

$$\hat\theta \in \arg\max_{\|\theta\|_\infty\le0.5}\|\theta\|_\infty$$

among training-loss minimizers. Derive a generalization bound for $\mathcal H$ exploiting this implicit regularization (high $\|\hat\theta\|_\infty$ $\Rightarrow$ small gap).
Key ideas:
- Stratify the cube into shells $\Theta_c := \{\theta : c \le \|\theta\|_\infty \le 0.5\}$ with $\mathrm{Volume}(\Theta_c) = 1 - (2c)^p$ — high-norm shells have exponentially small volume, hence small Rademacher complexity.
- Union-bound the standard Rademacher generalization theorem over a discretized family of shells; the learned high-$\|\cdot\|_\infty$ solution falls in a low-complexity shell, giving a small gap. Mirrors the course theme "implicit regularization $\to$ restricted effective hypothesis class $\to$ generalization."

**P3.3 (9 pts). PAC-Bayes: KL between Gaussians.** Prove the class lemma: for non-singular $\Sigma_0,\Sigma_1 \succ 0$,

$$\mathrm{KL}\big(\mathcal N(\mu_0,\Sigma_0)\,\|\,\mathcal N(\mu_1,\Sigma_1)\big) = \tfrac12\Big(\operatorname{tr}(\Sigma_1^{-1}\Sigma_0) + (\mu_1-\mu_0)^\top\Sigma_1^{-1}(\mu_1-\mu_0) - r + \ln\tfrac{\det\Sigma_1}{\det\Sigma_0}\Big).$$

Key ideas:
- Write $\mathrm{KL} = \mathbb{E}_{x\sim\mathcal N(\mu_0,\Sigma_0)}[\ln p_0(x) - \ln p_1(x)]$; expand log-densities of Gaussians.
- Use $\mathbb{E}[x^\top A x] = \operatorname{tr}(A\Sigma) + \mu^\top A\mu$ and $\mathbb{E}_{p_0}[(x-\mu_0)^\top\Sigma_0^{-1}(x-\mu_0)] = r$; collect terms.

**P3.4 (9 pts). PAC-Bayes with a finite set of anchors.** Class derived a PAC-Bayes bound favoring flat minima of low Euclidean norm. Now suppose implicit regularization finds flat minima that are close to at least one of finitely many points $\{\theta_1,\dots,\theta_k\}$ (not necessarily low norm). Derive a PAC-Bayes generalization bound reflecting this.
Key ideas:
- Choose the prior as a mixture $P = \frac1k\sum_{i=1}^k \mathcal N(\theta_i, \sigma^2I)$ (or run PAC-Bayes with $k$ priors and union-bound, $\delta \to \delta/k$).
- Posterior $Q = \mathcal N(\hat\theta, \sigma^2 I)$ centered at the learned flat minimum: flatness controls the perturbed empirical loss; $\mathrm{KL}(Q\|P) \le \ln k + \frac{\|\hat\theta - \theta_{i^*}\|^2}{2\sigma^2}$ for the nearest anchor $\theta_{i^*}$ (via P3.3's formula).
- Bound scales with distance-to-nearest-anchor instead of $\|\hat\theta\|$; the price of $k$ anchors is an additive $\ln k$.

## Exam-relevant nuggets
- **End-to-end dynamics is the single most recycled exam topic** — it appears (8 mentions) in exams a_2021, b_2021, b_2022, b_2023, a_2024, c_2024. P1.1 (balancedness $\Rightarrow$ Gram powers), P1.2 (symmetric $UU^\top$ variant), and P1.3 ($d_N=1$ simplification + "movement in directions already taken" interpretation) are precisely the styles of sub-questions asked. Know the discrete update in P1.4 by heart.
- The NTK exponential-convergence argument without change of variables (P1.5) — differentiate $\|u-y\|^2$, apply the Rayleigh bound $x^\top H^*x \ge \lambda\|x\|^2$, integrate — is a compact proof pattern exams love (ties to recap recitation P4); the perturbation variant (P1.6) matches "robustness of kernel regime" bonus questions.
- PAC-Bayes appears in 4 exam instances (a_2020, b_2020, a_2022, example exam): both the Gaussian-KL lemma (P3.3 — memorize the 4-term formula) and creative prior-selection questions like P3.4 (mixture prior / union over priors, $\ln k$ penalty) are classic.
- The compression bound machinery (finite hypothesis class of $2^{\#\text{bits}}$, Lipschitz error propagation $\gamma^{N-1}\rho$, union over compression levels) in P3.1 is the standard template for "derive a generalization bound for this compressed network" exam questions.
- P3.2's message — smaller effective volume/complexity of the reachable class $\Rightarrow$ better generalization, and implicit regularization is what selects that subclass — is the conceptual throughline of the generalization pillar; be ready to formalize it with a stratification + union bound.
- The four Zhang-et-al. postulates (P2.1) are frequent short "state and explain" items: perfect fit of random labels, generalization on real labels, degradation with noise, explicit regularization not the explanation.
