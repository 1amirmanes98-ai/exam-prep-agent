# Recitation: Whitening (Recitation 5)
- **File:** materials/recitations/fodl_recitation_whitening.pdf
- **Related lectures:** lecture_03_optimization_1 (gradient descent, conditioning); background for lecture_01_three_pillars and the data-preprocessing part of dl_standard_practices
- **Summary:** Derives whitening — an affine transformation $Y = AX + b$ that maps a random vector $X$ with mean $\mu$ and covariance $\Sigma$ to zero mean and identity covariance. Solves the defining constraints to obtain PCA whitening $A_{\mathrm{PCA}} = D^{-1/2}U^\top$ via the eigendecomposition $\Sigma = UDU^\top$, shows the whitening matrix is unique only up to a left unitary factor, and defines ZCA whitening ($R = U$) as the choice that preserves the structure of the original data (essential for CNN inputs). Ends with a linear-regression example showing why whitening helps optimization: gradient descent converges at rate governed by the condition number $K = \lambda_{\max}/\lambda_{\min}$ of $XX^\top$, and whitened data gives $K = 1$, i.e., convergence in one step.

## Topics covered
- Whitening: definition and motivation (zero mean, unit/identity covariance preferred numerically)
- PCA whitening: derivation from $\mathbb{E}[Y]=0$, $\mathbb{E}[YY^\top]=I_d$; numerical stabilization with $\epsilon$; geometric interpretation (center → rotate/decorrelate → scale)
- Estimation of $\mu, \Sigma$ from a finite i.i.d. sample (unbiased estimators)
- ZCA whitening: non-uniqueness of $A$ up to unitary $R$, choice $R=U$, structure-preservation property
- Example — linear regression: condition number, linear convergence rate of GD, effect of whitening

## Worked problems / derivations
**P1.** Find $A \in \mathbb{R}^{d,d}, b \in \mathbb{R}^d$ such that $Y = AX + b$ satisfies $\mathbb{E}[Y]=0$ and $\mathbb{E}[YY^\top]=I_d$.
Technique: $0 = A\mu + b \Rightarrow Y = A(X-\mu)$; then $I_d = \mathbb{E}[A(X-\mu)(X-\mu)^\top A^\top] = A\Sigma A^\top$. Plug the EVD $\Sigma = UDU^\top$ (PSD) and pick $A_{\mathrm{PCA}} = D^{-1/2}U^\top$.

**P2.** Show the whitening matrix is not unique and derive ZCA.
Technique: if $A\Sigma A^\top = I$ then $(RA)\Sigma(RA)^\top = I$ for any unitary $R$. ZCA chooses $R = U$: $Y_{\mathrm{ZCA}} = UD^{-1/2}U^\top(X-\mu) = \Sigma^{-1/2}(X-\mu)$ — PCA whitening followed by undoing the decorrelating rotation. ZCA minimizes $\mathbb{E}\|Y-(X-\mu)\|_2^2$ over all whitened $Y$, i.e., stays closest to the (centered) original data.

**P3.** Linear regression $f(w) = \tfrac{1}{2}\|X^\top w - y\|_2^2$, $X \in \mathbb{R}^{d,n}$, $n \ge d$, $\operatorname{rank}(XX^\top) = d$: quantify GD convergence and the effect of whitening.
Technique: with step size $\eta = 1/\lambda_{\max}$, $\|w_t - w^*\|_2^2 \le (1 - \tfrac{1}{K})^t \|w_0 - w^*\|_2^2$ where $K = \lambda_{\max}(XX^\top)/\lambda_{\min}(XX^\top)$. Whitened data $\Rightarrow XX^\top = (n-1)I_d \Rightarrow K = 1 \Rightarrow$ convergence in a single step.

## Key formulas & facts
- Setup: $\mathbb{E}[X] = \mu$, $\mathbb{E}[(X-\mu)(X-\mu)^\top] = \Sigma$; want $Y = A(X-\mu)$ with $A\Sigma A^\top = I$.
- PCA whitening: $\Sigma = UDU^\top$, $\;Y_{\mathrm{PCA}} = D^{-1/2}U^\top(X-\mu)$, $\;D^{-1/2} = \operatorname{diag}(1/\sqrt{D_{11}},\dots,1/\sqrt{D_{dd}})$.
- Numerical stability: $D^{-1/2} := \operatorname{diag}\!\big(1/\sqrt{D_{11}+\epsilon},\dots,1/\sqrt{D_{dd}+\epsilon}\big)$ for small $\epsilon > 0$.
- Unbiased estimates: $\hat\mu = \tfrac{1}{n}\sum_{i=1}^n X_i$, $\;\hat\Sigma = \tfrac{1}{n-1}\sum_{i=1}^n (X_i-\hat\mu)(X_i-\hat\mu)^\top$.
- ZCA whitening: $Y_{\mathrm{ZCA}} = UD^{-1/2}U^\top(X-\mu)$; it is the whitening minimizing $\mathbb{E}\|Y-(X-\mu)\|_2^2$.
- Gaussian $X$: any whitening yields independent Gaussian coordinates; non-Gaussian $X$: the choice of whitening matters (higher-order statistics differ).
- Condition number: $K = \lambda_{\max}/\lambda_{\min} \ge 1$; GD with $\eta = 1/\lambda_{\max}$: $\|w_t - w^*\|_2^2 \le (1-\tfrac1K)^t\|w_0-w^*\|_2^2$.

## Exam-relevant nuggets
- The full PCA-whitening derivation (solve for $b$, then for $A$ via EVD) is a short, self-contained proof — classic quick exam question.
- Know *why* $A$ is not unique (left-multiply by unitary) and what distinguishes ZCA: $\arg\min \mathbb{E}\|Y-(X-\mu)\|_2^2$, structure preservation; CNNs assume high dependence between neighboring coordinates, so CNN inputs must be whitened with ZCA, not PCA (also stated in dl_standard_practices).
- The conditioning story is the bridge to optimization lectures: ill-conditioned $K \gg 1 \Rightarrow (1-\tfrac1K) \to 1$ (slow); well-conditioned $K \approx 1 \Rightarrow$ fast; whitening $\Rightarrow K=1 \Rightarrow$ one-step convergence. Be able to reproduce this chain.
- Remember the $\epsilon$-regularization of $D^{-1/2}$ (numerical stability with near-zero eigenvalues).
