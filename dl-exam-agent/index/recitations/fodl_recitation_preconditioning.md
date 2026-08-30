# Recitation: Preconditioning (Recitation 7)
- **File:** materials/recitations/fodl_recitation_preconditioning.pdf
- **Related lectures:** lecture_03_optimization_1 (GD, conditioning, linear regression), lecture_04_optimization_2, lecture_05_optimization_3; complements fodl_recitation_whitening (condition number, one-step convergence)
- **Summary:** Introduces preconditioning: multiplying GD/GF updates by (possibly time-dependent) PSD matrices $\{P_t\}$ to improve conditioning, i.e., convergence guarantees/speed. Gives two interpretations — $P_t$ stretches the gradient along its eigenvector directions, and preconditioning with $P_t = QQ^\top$ is equivalent to running plain GD on the reparametrized objective $g(\theta) = f(Q\theta)$ (rescaling the underlying space). Proves that preconditioned gradient flow still monotonically decreases the objective (since $P_t$ is PSD). Surveys common schemes — Newton's method, (full and diagonal) Adagrad — and works out Newton-preconditioned GD on linear regression, showing convergence to the unique minimizer $(XX^\top)^{-1}Xy$ in a single step, which resembles the effect of whitening.

## Topics covered
- Definition of preconditioned GD ($w_{t+1} = w_t - \eta P_t \nabla f(w_t)$) and preconditioned GF ($\dot w(t) = -P_t \nabla f(w(t))$), $P_t$ PSD ("preconditioners")
- Interpretation 1: $P_t$ stretches $\nabla f$ in the directions of $P_t$'s eigenvectors (EVD computation)
- Interpretation 2: preconditioning $\equiv$ GD in a rescaled space, $P_t = QQ^\top$ for $g(\theta) = f(Q\theta)$
- Monotonicity: $f(w(t))$ non-increasing under preconditioned GF (chain rule + PSD)
- Common schemes: Newton's method, Adagrad, diagonal Adagrad
- Example: Newton-preconditioned GD on linear regression converges in one step; link to whitening

## Worked problems / derivations
**P1.** Eigen-stretching interpretation: with orthogonal EVD $P_t = \sum_{i=1}^d \lambda_i u_i u_i^\top$ and $\nabla f(w_t) = \sum_{i=1}^d \alpha_i u_i$, show what $P_t \nabla f(w_t)$ does.
Technique: expand and use orthonormality, $P_t \nabla f(w_t) = \sum_{i,j} \lambda_i \alpha_j u_i u_i^\top u_j = \sum_{i=1}^d \lambda_i \alpha_i u_i$ — each gradient component along $u_i$ is scaled by the eigenvalue $\lambda_i$.

**P2.** Space-rescaling interpretation: show GD on $g(\theta) = f(Q\theta)$, $Q \in \mathbb{R}^{d,d}$, equals preconditioned GD on $f$ with $P = QQ^\top$.
Technique: chain rule gives $\theta_{t+1} = \theta_t - \eta Q^\top \nabla f(Q\theta_t)$; left-multiply by $Q$ and set $w_t := Q\theta_t$ to get $w_{t+1} = w_t - \eta\, QQ^\top \nabla f(w_t)$.

**P3.** Monotonicity theorem: under preconditioned GF, $f(w(t))$ is non-increasing.
Technique: $\frac{d}{dt} f(w(t)) = \nabla f(w(t))^\top \dot w(t) = -\nabla f(w(t))^\top P_t \nabla f(w(t)) \le 0$ since $P_t$ is PSD (quadratic form nonnegative).

**P4.** Linear regression $f(w) = \tfrac12\|X^\top w - y\|_2^2$, $X \in \mathbb{R}^{d,n}$, $n \ge d$, $\operatorname{rank}(XX^\top) = d$; run preconditioned GD with $\eta = 1$, $P_t = (\nabla^2 f(w_t))^{-1}$ (Newton).
Technique: $\nabla f(w) = XX^\top w - Xy$, $\nabla^2 f(w) = XX^\top$; then $w_1 = w_0 - (XX^\top)^{-1}(XX^\top w_0 - Xy) = (XX^\top)^{-1}Xy$ — the unique minimizer, reached in one step regardless of $w_0$.

## Key formulas & facts
- Preconditioned GD: $w_{t+1} = w_t - \eta P_t \nabla f(w_t)$; preconditioned GF: $\dot w(t) = -P_t \nabla f(w(t))$, with $P_t$ PSD.
- Eigen-stretching: $P_t \nabla f(w_t) = \sum_{i=1}^d \lambda_i \alpha_i u_i$ where $P_t = \sum_i \lambda_i u_i u_i^\top$, $\nabla f(w_t) = \sum_i \alpha_i u_i$.
- Equivalence: preconditioning with $P = QQ^\top$ $\Leftrightarrow$ plain GD on $g(\theta) = f(Q\theta)$, via $w_t = Q\theta_t$.
- Monotone descent: $\frac{d}{dt}f(w(t)) = -\nabla f(w(t))^\top P_t \nabla f(w(t)) \le 0$.
- Newton's method: $P_t = (\nabla^2 f(w_t))^{-1}$.
- Adagrad: $P_t = \big(\sum_{s=1}^t \nabla f(w_s)\nabla f(w_s)^\top\big)^{-1/2}$.
- Diagonal Adagrad (cheaper): $P_t = \operatorname{diag}\Big(\big(\sum_{s=1}^t (\nabla f(w_s))_1^2\big)^{-1/2}, \dots, \big(\sum_{s=1}^t (\nabla f(w_s))_d^2\big)^{-1/2}\Big)$.
- Linear regression: $\nabla f(w) = XX^\top w - Xy$, $\nabla^2 f(w) = XX^\top$; Newton step with $\eta=1$ lands on $w^* = (XX^\top)^{-1}Xy$ in one iteration.

## Exam-relevant nuggets
- The monotonicity proof is a one-line chain-rule + PSD argument — a classic "prove descent" exam item; the PSD assumption is exactly what makes $-\nabla f^\top P_t \nabla f \le 0$.
- Be able to reproduce the reparametrization equivalence ($P = QQ^\top \Leftrightarrow$ GD on $f(Q\theta)$) — it is the formal statement of "preconditioning = rescaling the space," and connects to why whitening the data has the same effect as preconditioning.
- Newton on a quadratic converges in exactly one step ($\eta = 1$): know the full computation for linear regression, including why $\operatorname{rank}(XX^\top) = d$ is needed (invertibility of the Hessian, uniqueness of minimizer).
- Know the three named preconditioners (Newton, Adagrad, diagonal Adagrad) and why diagonal Adagrad is used in practice (avoids forming/inverting a $d \times d$ matrix).
- Contrast with the whitening recitation: whitening transforms the data so $K=1$; Newton preconditioning transforms the updates — both yield one-step convergence on least squares.
