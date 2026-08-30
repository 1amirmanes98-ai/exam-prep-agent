# Homework: Assignment 4 — Generalization 2 + Sequence Models
- **File:** materials/homework/hw_generalization.pdf
- **Related lectures:** lecture_07_generalization_2 and lecture_08_generalization_3 (implicit regularization: min-norm bias in linear regression, matrix factorization / deep linear dynamics), lecture_09_generalization_4 (volume hypothesis; sequence-model phenomena); architecture background in dl_standard_practices (Transformers, SSMs)

## Problems
### Part 1: Implicit Regularization

**P1.1 (13 pts). Linear regression, arbitrary initialization.** Class proposition: minimizing underdetermined $L_S(w)$ from $w^{(0)} = 0$ with any iterative algorithm whose updates satisfy $w^{(t+1)} - w^{(t)} \in \operatorname{span}\{\nabla\ell_{(x_i,y_i)}(w) : i\in[m], w\in\mathbb{R}^d\}$ (covers GD, SGD, momentum), assuming convergence to a zero-loss global optimum, yields the *minimum Euclidean norm* global optimum. Generalize: if instead $w^{(0)} = a \in \mathbb{R}^d$, prove the norm sub-optimality (excess over the min norm among global optima) is $\le \|P_\perp a\|$, where $P_\perp$ projects onto $\operatorname{span}\{x_i\}_{i=1}^m{}^\perp$.
Key ideas:
- All updates lie in $\operatorname{span}\{x_i\}$ (gradients of $\ell(w^\top x_i, y_i)$ are multiples of $x_i$), so $w^{(\infty)} = a + (\text{span component})$; decompose $w^{(\infty)} = P_\perp a + P_{\parallel}(\cdot)$.
- Any zero-loss solution has fixed parallel component determined by $Xw = y$; the min-norm solution $w^*$ is the one with zero orthogonal component. Triangle inequality / Pythagoras: $\|w^{(\infty)}\| \le \|w^*\| + \|P_\perp a\|$.

**P1.2 (Bonus 10 pts). Matrix factorization / deep linear nets — singular values shoot up one by one.** Matrix completion observing *all* entries: $L_S(W) = \frac{1}{d\cdot d'}\cdot\frac12\|W - W^*\|_{\mathrm{Fro}}^2$ with SVD $W^* = U\Sigma V^\top$. Optimize via depth-$N$ linear network, gradient flow, balanced initialization with end-to-end matrix $W_{1:N}(0) = U E V^\top$, $E$ rectangular-diagonal with all diagonal entries $\epsilon > 0$ (much smaller than all $\sigma_i(W^*)$). Given that the SVD keeps the form $W_{1:N}(t) = U S(t) V^\top$ (fixed singular vectors), derive explicit $\sigma_1(t),\dots,\sigma_{\min\{d,d'\}}(t)$ for depths $N = 1$ and $N = 2$, and explain how depth makes singular values "shoot up" one at a time.
Key ideas:
- Singular values decouple: each obeys the end-to-end scalar ODE $\dot\sigma_i(t) = -N\,\sigma_i(t)^{2-\frac2N}\cdot\frac{1}{dd'}(\sigma_i(t) - \sigma_i^*)$.
- $N=1$: linear ODE $\Rightarrow$ exponential relaxation $\sigma_i(t) = \sigma_i^* + (\epsilon-\sigma_i^*)e^{-t/(dd')}$ — all singular values move at the same rate (no rank bias).
- $N=2$: $\dot\sigma_i \propto -\sigma_i(\sigma_i - \sigma_i^*)$ — logistic dynamics: $\sigma_i(t)$ lingers near $\epsilon \approx 0$, then rises sharply to $\sigma_i^*$ at a transition time $\sim \frac{dd'}{2\sigma_i^*}\ln\frac{1}{\epsilon}$, inversely related to $\sigma_i^*$ — larger true singular values are learned first, sequentially (incremental learning $\Rightarrow$ implicit low-rank bias).

### Part 2: Volume Hypothesis

**P2.1 (15 pts). Matrix factorization.** In class: if the width $k$ is large enough and the *convex distance* between the product matrix $W_NW_{N-1}\cdots W_1$ and $W_{\mathrm{iid}}$ is small enough, Lemma 2 can be invoked to prove Theorem 1. A cited Theorem characterizes the distribution of random vectors $\Gamma_1,\dots,\Gamma_{d'}$ and gives a condition on the prior distributions of factors $W_1,\dots,W_N$ guaranteeing the product matrix's columns are close (in convex distance) to the $\Gamma_\alpha$'s. Show the cited Theorem applies in our case and yields exactly the condition Lemma 2 requires.
Key ideas:
- Verify the Theorem's hypotheses for the factor priors used in class (i.i.d. entries, moment conditions) — a CLT-flavored statement: products of random matrices have approximately Gaussian columns as width $k \to \infty$.
- Chain the quantitative convex-distance bound into Lemma 2's smallness condition; this closes the gap in the volume-hypothesis proof of Theorem 1 (random deep factorizations behave like the "flat" i.i.d. parameterization, so low-loss regions with large volume dominate).

**P2.2 (10 pts). Guess & Check has min-norm bias — conditional distribution.** Least squares $f(w) = \frac1m\|Xw-y\|^2$, $X \in \mathbb{R}^{m,d}$, $d > m$, $\operatorname{rank}(X) = m$, solution set $\{w : Xw = y\} \ne \emptyset$, min-norm solution $w^* = X^\top(XX^\top)^{-1}y$. G&C draws $w \sim \mathcal N(0, \sigma^2I_d)$ and accepts iff $Xw = y$. With $e := w - w^*$, prove $e \mid Xw = y \sim \mathcal N(0, \Sigma)$, $\Sigma = \sigma^2\big(I - X^\top(XX^\top)^{-1}X\big)$. (May use: for $z \sim \mathcal N(0,\sigma^2I_d)$ and full-row-rank $A$: $z \mid Az = b \sim \mathcal N\big(A^\top(AA^\top)^{-1}b,\ \sigma^2(I - A^\top(AA^\top)^{-1}A)\big)$.)
Key ideas:
- Apply the given Gaussian-conditioning fact with $A = X$, $b = y$: the conditional mean is exactly $w^*$, so $e = w - w^*$ is zero-mean with the stated covariance.

**P2.3 (10 pts).** Prove $\frac{1}{\sigma^2}\Sigma$ is an orthogonal projector — $\big(\frac{1}{\sigma^2}\Sigma\big)^\top = \frac{1}{\sigma^2}\Sigma$ and $\big(\frac{1}{\sigma^2}\Sigma\big)^2 = \frac{1}{\sigma^2}\Sigma$ — and that $\operatorname{rank}(\Sigma) = d - m$. Hint: show $\operatorname{Im}(\Sigma) = \operatorname{Ker}(X)$.
Key ideas:
- Direct computation: $P := X^\top(XX^\top)^{-1}X$ is symmetric idempotent, hence so is $I - P$.
- $X(I-P) = 0$ gives $\operatorname{Im}(I-P) \subseteq \operatorname{Ker}(X)$; conversely $(I-P)w = w$ on $\operatorname{Ker}(X)$; rank–nullity with $\operatorname{rank}(X) = m$ gives $\operatorname{rank}(\Sigma) = d-m$.

**P2.4 (10 pts).** Prove $\frac{\|e\|^2}{\sigma^2} \,\big|\, Xw = y \sim \chi^2_{d-m}$. (May use: for $z\sim\mathcal N(0,I_d)$ and orthogonal projector $P$ of rank $r$, $\|Pz\|^2 \sim \chi^2_r$.)
Key ideas:
- Write $e = \sigma\,\big(\frac{1}{\sigma^2}\Sigma\big)^{1/2}$-transformed standard Gaussian; since $\frac{1}{\sigma^2}\Sigma$ is a rank-$(d-m)$ projector, $e \stackrel{d}{=} \sigma P z$ with $z \sim \mathcal N(0, I_d)$, so $\|e\|^2/\sigma^2 = \|Pz\|^2 \sim \chi^2_{d-m}$.

**P2.5 (8 pts).** Conclude: $\forall \epsilon, \delta > 0$ there exists $\sigma > 0$ such that with prior $\mathcal N(0,\sigma^2I_d)$, $\Pr\big(\|w - w^*\| \le \epsilon \mid Xw = y\big) \ge 1 - \delta$. (Hint: $\lim_{\epsilon\to\infty}\Pr(\chi^2_r \le \epsilon) = 1$.)
Key ideas:
- $\Pr(\|e\| \le \epsilon \mid \cdot) = \Pr\big(\chi^2_{d-m} \le \epsilon^2/\sigma^2\big)$; as $\sigma \to 0$, $\epsilon^2/\sigma^2 \to \infty$, so the probability $\to 1$ — G&C with a small-variance Gaussian prior concentrates on the min-norm solution, i.e., the same implicit bias as GD without any gradient dynamics (volume/G&C perspective).

### Part 3: Sequence Models (experiments)

**P3.1 (Experiment, 17 pts). In-context learning of linear regression.** Train a small causal transformer (2–4 layers, width 64–128, few heads) on synthetic in-context linear regression: per example, sample $w^* \in \mathbb{R}^d$; build $m$ demonstrations $(u_i, v_i)$, $u_i \sim \mathcal N(0, I_d)$, $v_i = (w^*)^\top u_i$ (optionally + small noise); append query $u_{m+1}$; train with MSE to predict $v_{m+1}$ (continuous embeddings, no tokenization). Measure test MSE vs. $m$ — show more demonstrations improve generalization — and compare against a least-squares baseline computed from the demonstrations.
Key ideas:
- Demonstrates in-context learning: the trained transformer implements a regression-like algorithm at inference time from the prompt alone (no weight updates); performance should approach the least-squares baseline as $m$ grows.

**P3.2 (Experiment, 17 pts). Length extrapolation with a linear SSM.** Generate data from a random stable linear teacher SSM $s_{t+1} = A^*s_t + Bx_t$, $y_t = C^*s_t$, with $x_t \sim \mathcal N(0,1)$ i.i.d., $A^*\in\mathbb{R}^{d^*,d^*}$, $B\in\mathbb{R}^{d^*,1}$, $C^*\in\mathbb{R}^{1,d^*}$, $\|A^*\|_{\mathrm{Fro}} \le 1$. Train a student linear SSM (state dimension $> d^*$ and $> H$) to predict $y_t$ from $x_1..x_t$ for $t \in [H]$ (MSE); evaluate on $y_{H+1},\dots,y_{H'}$ for $H' > H$.
Key ideas:
- Tests length extrapolation/generalization of SSMs beyond the training horizon; stability ($\|A^*\|_{\mathrm{Fro}} \le 1$) and overparameterized student state are the enabling conditions studied in class.

## Exam-relevant nuggets
- The min-norm implicit-regularization proposition (updates stay in $\operatorname{span}\{x_i\}$ $\Rightarrow$ converge to minimum-norm interpolator) is a cornerstone result of the generalization pillar; P1.1's arbitrary-initialization variant ($\|P_\perp a\|$ sub-optimality) is exactly the kind of twist exams add to the class theorem. Know the orthogonal-decomposition proof cold.
- P1.2 connects to the heavily-examined end-to-end dynamics (cf. hw_optimization P1.1–P1.3, exams 2021–2024): singular-value ODEs $\dot\sigma \propto -\sigma^{2-2/N}(\sigma - \sigma^*)$, exponential ($N{=}1$) vs. sigmoidal/sequential ($N{\ge}2$) trajectories, and the "depth $\Rightarrow$ incremental low-rank learning" interpretation — a favorite explain-the-phenomenon question.
- The G&C sequence (P2.2–P2.5) is a self-contained guided proof — precisely the structure of a multi-part exam question: Gaussian conditioning, projector algebra ($\operatorname{Im}(\Sigma) = \operatorname{Ker}(X)$, rank $d-m$), $\chi^2$ norms, then an $\epsilon$–$\delta$ conclusion. Also reuses recap-recitation tools (projections, rank, quadratic forms).
- Remember the closed form $w^* = X^\top(XX^\top)^{-1}y$ and *why* it is the min-norm interpolator — recurring lemma across optimization and generalization questions.
- Volume hypothesis (P2.1) is recent-lecture material (lecture_09): the logical chain "factor priors $\to$ (cited CLT-type theorem) $\to$ small convex distance $\to$ Lemma 2 $\to$ Theorem 1" is a plausible "reconstruct the argument" exam target.
- In-context learning and length extrapolation are the course's flagged modern phenomena for sequence models — likely short conceptual questions (define the phenomenon, describe the synthetic setup that demonstrates it).
