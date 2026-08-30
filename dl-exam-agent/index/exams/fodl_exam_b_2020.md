# FODL Exam — Moed B 2020
**Date / semester:** August 13th, 2020 — 2019–2020 Spring Semester, Exam Term B
**Total points:** 100

## Q1 (45 pts) — Tensors as grid functions, CP decomposition as a network, and the symmetric constraint
**Topics:** tensor-methods, universality, hypothesis-class, cp-decomposition, symmetric-tensors, weight-sharing | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness, fodl_recitation_kronecker_expressiveness
**Statement (English translation):**
Let $M, N \in \mathbb{N}$, and consider the space of functions from $[M]^N$ to $\mathbb{R}$.

- **(5 pts)** Explain how this function space corresponds to the space of real tensors with order $N$ and dimension $M$ in each mode.

Consider the CP decomposition:

$$A = \sum_{z=1}^{Z} a_z \cdot \underline{a}^{z,1} \otimes \underline{a}^{z,2} \otimes \cdots \otimes \underline{a}^{z,N}\,,\quad Z \in \mathbb{N}\,,\ \{a_z \in \mathbb{R}\}_{z \in [Z]}\,,\ \{\underline{a}^{z,i} \in \mathbb{R}^M\}_{z \in [Z], i \in [N]} \tag{1}$$

- **(5 pts)** Draw a scheme of the neural network that (1) corresponds to, highlighting the role of $Z$, $\{a_z\}_z$ and $\{\underline{a}^{z,i}\}_{z,i}$.
- **(10 pts)** Prove that (1) is universal, i.e. with large enough $Z$, the parameters $\{a_z\}_z$ and $\{\underline{a}^{z,i}\}_{z,i}$ can be chosen to realize any tensor.

Assume now that (1) is constrained to meet: $\underline{a}^{z,1} = \underline{a}^{z,2} = \cdots = \underline{a}^{z,N}\,,\ \forall z \in [Z]$.

- **(5 pts)** How does the corresponding neural network need to be modified to account for this constraint?
- **(10 pts)** Are there $M, N \geq 2$ for which the constrained decomposition is universal? Prove your answer.
- **(10 pts)** For $N = 2$, characterize the class of tensors that can be expressed by the constrained decomposition (with $Z$ arbitrary large). Prove your answer.

**Solution sketch:**
**i.** Bijection $f \leftrightarrow A$ via $A_{d_1, \ldots, d_N} = f(d_1, \ldots, d_N)$: an order-$N$, dimension-$M$ tensor is exactly the lookup table of a function on the grid $[M]^N$.

**ii.** Shallow "CP network": $N$ input branches (one-hot encodings of $d_1,\ldots,d_N$); hidden layer of width $Z$, where unit $z$ computes the product $\prod_{i=1}^N \langle \underline a^{z,i}, e_{d_i}\rangle$ (product pooling of the per-mode linear maps $\underline a^{z,i}$); linear output layer with weights $\{a_z\}$. $Z$ = hidden width = CP-rank bound.

**iii.** Universality: with $Z = M^N$, enumerate all index tuples and take the terms $A_{d_1 \ldots d_N}\, e_{d_1} \otimes \cdots \otimes e_{d_N}$ (standard basis vectors, $a_z$ = the corresponding entry). The sum reproduces any prescribed $A$.

**iv.** The constraint is weight sharing: the same vector $\underline a^{z}$ is used in all $N$ input branches of hidden unit $z$ (à la convolutional weight sharing across modes).

**v.** No such $M, N \geq 2$: each constrained term $a_z (\underline a^z)^{\otimes N}$ is a symmetric tensor (invariant under any permutation of indices), and sums of symmetric tensors are symmetric. Since non-symmetric tensors exist whenever $M, N \geq 2$ (e.g. $A_{1,2,\ldots} \neq A_{2,1,\ldots}$), the constrained decomposition is never universal.

**vi.** $N = 2$: the expressible class is exactly the symmetric $M \times M$ matrices. ($\subseteq$) each term $a_z\, \underline a^z (\underline a^z)^\top$ is symmetric. ($\supseteq$) by the spectral theorem, any symmetric $A = \sum_{z=1}^{M} \lambda_z\, \underline v_z \underline v_z^\top$ — take $Z = M$, $a_z = \lambda_z$ (signs absorbed by $a_z$), $\underline a^z = \underline v_z$.

**💡 Useful tricks:** Function on the grid ↔ tensor (lookup table); CP = shallow product-pooling net with width $Z$ = rank; universality by enumerating the $M^N$ standard-basis rank-1 terms; the symmetric constraint is *weight sharing* across modes; for $N=2$ the spectral theorem gives exactly the symmetric matrices (the scalar $a_z$ absorbs sign, so negative eigenvalues are fine).

**⚠️ Watch out:** (v) the obstruction is that a *sum* of symmetric tensors stays symmetric while non-symmetric tensors exist for $M,N\geq2$ — cite a concrete asymmetric entry; (vi) prove BOTH inclusions, and note the $\supseteq$ direction needs signs carried by $a_z$ (not by $\underline a^z$, whose outer product is always PSD).

## Q2 (35 pts) — Gradient flow prediction dynamics ($\dot{u} = -H(u-y)$) and convergence under a fixed kernel
**Topics:** gradient-flow, ntk, overparameterization, convergence-rate, linear-convergence | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_05_optimization_3, fodl_recitation_gradient_flow
**Statement (English translation):**
For $k, d \in \mathbb{N}$, let $f : \mathbb{R}^k \times \mathbb{R}^d \to \mathbb{R}$ be a continuously differentiable function representing a neural network, such that $f(\underline{w}, \underline{x})$ stands for network output when weights $= \underline{w}$ and input $= \underline{x}$. Given training set $\{(\underline{x}_i, y_i)\}_{i=1}^m \subseteq \mathbb{R}^d \times \mathbb{R}$, suppose we train by running gradient flow over $\ell_2$ loss:

$$\ell(\underline{w}) = \tfrac{1}{2}\sum\nolimits_{i=1}^m (f(\underline{w}, \underline{x}_i) - y_i)^2$$

Denote $\underline{y} := [y_1, y_2, \ldots, y_m]^\top \in \mathbb{R}^m$, and for $t \geq 0$, let $\underline{u}(t)$ hold the predictions on training instances at time $t$ of optimization, i.e. $\underline{u}(t) := [f(\underline{w}(t), \underline{x}_1), \ldots, f(\underline{w}(t), \underline{x}_m)]^\top \in \mathbb{R}^m$.

- **(10 pts)** Prove that $\underline{u}(t)$ follows the dynamics:
$$\underline{\dot{u}}(t) := \tfrac{d}{dt}\underline{u}(t) = -H(t)\,(\underline{u}(t) - \underline{y})\,,\ t \geq 0\,,$$
where $H(t) \in \mathbb{R}^{m \times m}$ is defined by $(H(t))_{i,j} = \left\langle \frac{\partial f(\underline{w}(t), \underline{x}_i)}{\partial \underline{w}}, \frac{\partial f(\underline{w}(t), \underline{x}_j)}{\partial \underline{w}} \right\rangle$.

Assume now that $H(t)$ is fixed ($H(t) = H(0)$, $\forall t \geq 0$) and let $\{\lambda_i \in \mathbb{R}\}_{i=1}^m$ be its eigenvalues.

- **(10 pts)** Prove that if $\lambda_i > 0$, $\forall i \in [m]$, then for any $\epsilon > 0$, it holds that $\ell(\underline{w}(t)) \leq \epsilon$ after time at most $\max_{i \in [m]} \frac{1}{2\lambda_i} \log\left(\frac{m \|\underline{u}(0) - \underline{y}\|^2}{2\epsilon}\right)$.
- **(8 pts)** Prove that if $k < m$ then there exists $i \in [m]$ for which $\lambda_i = 0$.
- **(7 pts)** Explain (qualitatively) why convergence to zero loss is unlikely to happen in this regime ($k < m$), but is likely under overparameterization, i.e. when $k \gg m$.

**Solution sketch:**
**i.** Gradient flow:

$$\begin{aligned} \underline{\dot w} &= -\nabla\ell(\underline w) \\ &= -\sum_j (u_j - y_j)\, \frac{\partial f(\underline w, \underline x_j)}{\partial \underline w} \end{aligned}$$

Chain rule per coordinate:

$$\begin{aligned} \dot u_i &= \big\langle \frac{\partial f(\underline w, \underline x_i)}{\partial \underline w}, \underline{\dot w}\big\rangle \\ &= -\sum_j H_{ij}(t)(u_j - y_j) \end{aligned}$$

**ii.** Let $\underline e := \underline u - \underline y$. With constant symmetric PSD $H$:

$$\underline{\dot e} = -H\underline e \Rightarrow \underline e(t) = e^{-Ht}\underline e(0)$$

In $H$'s orthonormal eigenbasis, the $i$-th component decays as $e^{-\lambda_i t}$.

$$\begin{aligned} \ell(\underline w(t)) &= \frac12\|\underline e(t)\|^2 \\ &= \frac12\sum_i e^{-2\lambda_i t}\,\langle \underline e(0), \underline v_i\rangle^2 \end{aligned}$$

Each summand is $\leq \epsilon/m$ once $t \geq \frac{1}{2\lambda_i}\log\big(\frac{m\,\|\underline e(0)\|^2}{2\epsilon}\big)$ (using $\langle \underline e(0), \underline v_i\rangle^2 \leq \|\underline e(0)\|^2$). Take the max over $i$ and sum — the $m$ inside the log pays for the $m$ summands.

**iii.** $H = JJ^\top$ where $J \in \mathbb{R}^{m \times k}$ is the Jacobian with rows $\frac{\partial f(\underline w, \underline x_i)}{\partial \underline w}^\top$. Hence

$$\mathrm{rank}(H) \leq \mathrm{rank}(J) \leq k < m$$

so the symmetric PSD matrix $H$ is singular — some eigenvalue equals 0.

**iv.** With $k < m$: residual components lying in $H$'s null space do not decay, and generically the $m$ labels cannot all be fit by $k < m$ parameters — training loss stalls above 0. With $k \gg m$: generically $J$ has full row rank so $H \succ 0$ ($\lambda_{\min} > 0$), giving exponential convergence to zero loss. Moreover in the ultra-wide (NTK) regime $H(t)$ indeed stays close to $H(0)$, justifying the fixed-kernel assumption.

**💡 Useful tricks:** The dynamics come from chain rule: $\dot u_i=\langle\partial_{\underline w}f_i,\dot{\underline w}\rangle$ with $\dot{\underline w}=-\nabla\ell$; a constant PSD $H$ ⇒ $\underline e(t)=e^{-Ht}\underline e(0)$, so work in $H$'s eigenbasis; the factor $m$ inside the log pays for the $m$ eigen-summands; $H=JJ^\top$ ⇒ $\mathrm{rank}(H)\leq k$.

**⚠️ Watch out:** (ii) bound $\langle\underline e(0),v_i\rangle^2\leq\|\underline e(0)\|^2$ and split the budget $\epsilon/m$ per mode before taking the max; (iii) $k<m$ ⇒ rank-deficient $H$ ⇒ a genuine zero eigenvalue whose null-space residual *never* decays; (iv) overparameterization gives both $H\succ0$ *and* (NTK) $H(t)\approx H(0)$ — mention both.

## Q3 (20 pts) — Generalization bound for all weights from zeroed-coordinate classes (Lipschitz + union bound)
**Topics:** uniform-convergence, probability-tools, norm-bounds, lipschitz, structural-risk-minimization | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2
**Statement (English translation):**
For $k, d \in \mathbb{N}$, let $f : \mathbb{R}^k \times \mathbb{R}^d \to \mathbb{R}$ be a function representing a neural network, such that $f(\underline{w}, \underline{x})$ stands for network output when weights $= \underline{w}$ and input $= \underline{x}$. Assume that for some $\rho > 0$, $f(\cdot, \cdot)$ is $\rho$-Lipschitz in its first argument, i.e. $|f(\underline{w}_1, \underline{x}) - f(\underline{w}_2, \underline{x})| \leq \rho \cdot |\underline{w}_1 - \underline{w}_2|$, $\forall \underline{w}_1, \underline{w}_2 \in \mathbb{R}^k$, $\underline{x} \in \mathbb{R}^d$ (here $|\cdot|$ denotes the Euclidean norm). Let $\mathcal{D}$ be a distribution over $\mathbb{R}^d \times \mathbb{R}$, $S = \{(\underline{x}_i, y_i)\}_{i=1}^m$ be a training set drawn i.i.d. per $\mathcal{D}$, and

$$L_{\mathcal{D}}(\underline{w}) = \mathbb{E}_{(\underline{x}, y) \sim \mathcal{D}}\big[\,|y - f(\underline{w}, \underline{x})|\,\big] \quad\text{and}\quad L_S(\underline{w}) = \frac{1}{m}\sum\nolimits_{i=1}^m |y_i - f(\underline{w}, \underline{x}_i)|$$

be the corresponding population and empirical $\ell_1$ losses, respectively. For every $r \in [k]$, let $W_r := \{\underline{w} \in \mathbb{R}^k : (\underline{w})_r = 0\}$, and let $\Delta_r : \mathbb{N} \times (0,1) \to \mathbb{R}_{\geq 0}$ be a function for which $\forall \delta \in (0,1)$, w.p. $\geq 1 - \delta$ over $S$:

$$\forall \underline{w} \in W_r : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \Delta_r(m, \delta)$$

- **(10 pts)** For fixed $r \in [k]$, prove that $\forall \delta \in (0,1)$, w.p. $\geq 1 - \delta$ over $S$:
$$\forall \underline{w} \in \mathbb{R}^k : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \Delta_r(m, \delta) + 2\rho \cdot |(\underline{w})_r|$$
(the exam prints "$\Delta(m,\delta)$" here; from context this is $\Delta_r(m,\delta)$).
- **(10 pts)** Prove that $\forall \delta \in (0,1)$, w.p. $\geq 1 - \delta$ over $S$:
$$\forall \underline{w} \in \mathbb{R}^k : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \min_{r \in [k]}\left\{\Delta_r\left(m, \tfrac{\delta}{k}\right) + 2\rho \cdot |(\underline{w})_r|\right\}$$

**Solution sketch:**
**i.** For arbitrary $\underline w$, define $\tilde{\underline w} \in W_r$ by zeroing coordinate $r$. Then

$$\|\underline w - \tilde{\underline w}\| = |(\underline w)_r|$$

Lipschitz transfer:

$$|f(\underline w, \underline x) - f(\tilde{\underline w}, \underline x)| \leq \rho\,|(\underline w)_r|$$

for every $\underline x$, and by the reverse triangle inequality the $\ell_1$ loss $|y - f(\cdot, \underline x)|$ is 1-Lipschitz in the prediction, so pointwise

$$\big|\,|y - f(\underline w,\underline x)| - |y - f(\tilde{\underline w},\underline x)|\,\big| \leq \rho\,|(\underline w)_r|$$

Averaging/taking expectation gives

$$|L_S(\underline w) - L_S(\tilde{\underline w})| \leq \rho|(\underline w)_r|$$

and

$$|L_{\mathcal D}(\underline w) - L_{\mathcal D}(\tilde{\underline w})| \leq \rho|(\underline w)_r|$$

Chain the three inequalities on the $1-\delta$ event for $W_r$:

$$\begin{aligned} L_{\mathcal D}(\underline w) - L_S(\underline w) &\leq \big[L_{\mathcal D}(\tilde{\underline w}) - L_S(\tilde{\underline w})\big] + 2\rho|(\underline w)_r| \\ &\leq \Delta_r(m,\delta) + 2\rho|(\underline w)_r| \end{aligned}$$

**ii.** Apply part (i) for each $r \in [k]$ with confidence parameter $\delta/k$. By a union bound all $k$ events hold simultaneously w.p. $\geq 1 - \delta$. On that joint event the bound of (i) holds for *every* $r$ simultaneously and for every $\underline w$, so one may take the minimum over $r \in [k]$ — yielding the stated bound (an SRM/nonuniform-learning flavor: the best coordinate to zero out per hypothesis).

**💡 Useful tricks:** Project $\underline w$ into $W_r$ by zeroing coordinate $r$ (distance $=|(\underline w)_r|$), then Lipschitz-transfer; the $\ell_1$ loss is $1$-Lipschitz in the prediction (reverse triangle inequality), so it composes with the network's $\rho$-Lipschitzness to give $2\rho|(\underline w)_r|$; union over the $k$ coordinate-classes with $\delta/k$ each ⇒ take $\min_r$.

**⚠️ Watch out:** the transfer is $2\rho|(\underline w)_r|$ — paid on both $L_D$ and $L_S$; you must invoke that $|y-\cdot|$ is $1$-Lipschitz to chain the losses; (ii) the union costs $\delta/k$ per class, and only *afterwards* may you minimize over $r$ (the min is over a simultaneously-valid family).
