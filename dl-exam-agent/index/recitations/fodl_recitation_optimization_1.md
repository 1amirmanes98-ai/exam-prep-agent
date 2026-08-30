# Recitation: Optimization Exercises 1 (Recitation 8)
- **File:** materials/recitations/fodl_recitation_optimization_1.pdf
- **Related lectures:** lecture_03_optimization_1, lecture_04_optimization_2
- **Summary:** A problem-solving session with four fully worked exercises supporting the optimization lectures. Proves the $O(1/T)$ convergence rate of gradient flow on convex functions; establishes the closed-form of the deficiency-margin distance $\min\{\|W-\Lambda\|_F : \sigma_{\min}(W)\le c\} = \max\{0,\sigma_{\min}(\Lambda)-c\}$ (the quantity underlying convergence guarantees for deep linear networks in lecture 4); shows the smoothness constant of a PD quadratic is exactly $\lambda_{\max}(Q)$ and studies its overparameterization by a 2-layer linear network (non-convex, yet all critical points are global minima); and proves rigorously that if gradient flow converges, its limit is a critical point.

## Topics covered
- Convergence rate of GF on convex objectives: $f(w(T))-f(w^*) \le \frac{\|w_0-w^*\|^2}{2T}$
- Deficiency margin: distance in Frobenius norm from $\Lambda$ to the set of matrices with $\sigma_{\min}\le c$
- Singular-value inequalities: $\sigma_{\max}(A)\le\|A\|_F$, $\sigma_{\min}(A+B)\ge\sigma_{\min}(A)-\sigma_{\max}(B)$
- Smoothness of quadratics $f(w)=\frac12 w^\top Qw$ ($Q$ PD): $\beta$-smooth iff $\beta\ge\lambda_{\max}(Q)$
- Overparameterization of a quadratic by a 2-layer linear NN of hidden width 1: gradients and landscape ("no spurious critical points")
- GF finds critical points: limit of a converging GF trajectory is a critical point

## Worked problems / derivations
**P1.** Let $f$ be convex, $C^1$, and $w(t)$ a GF curve. Prove

$$f(w(T)) - f(w^*) \le \frac{\|w_0-w^*\|^2}{2T}$$

for any $T>0,\ w^*\in\mathbb{R}^d$.
Technique: FTC on the monitored quantity $\frac12\|w(t)-w^*\|^2$; chain rule gives integrand $\langle w(t)-w^*, -\nabla f(w(t))\rangle$; bound it via the convexity inequality

$$f(w^*)\ge f(w(t)) + \langle\nabla f(w(t)), w^*-w(t)\rangle$$

and GF monotonicity ($f(w(t))\ge f(w(T))$); rearrange and drop $-\frac{1}{2T}\|w(T)-w^*\|^2$.

**P2.** (Deficiency margin) For $\Lambda\in\mathbb{R}^{d,d'}$, $c>0$:

$$M_c := \min\{\|W-\Lambda\|_F : W\in\mathbb{R}^{d,d'},\ \sigma_{\min}(W)\le c\} = \max\{0,\sigma_{\min}(\Lambda)-c\}$$

Technique: if $\sigma_{\min}(\Lambda)\le c$ take $W=\Lambda$. Otherwise, achievability by "SVD surgery": from

$$\Lambda=\sum_{i=1}^k \sigma_i(\Lambda)u_iv_i^\top$$

define

$$W = \sum_{i=1}^{k-1}\sigma_i(\Lambda)u_iv_i^\top + c\,u_kv_k^\top$$

, so $\sigma_{\min}(W)=c$ and

$$\|W-\Lambda\|_F = \sigma_{\min}(\Lambda)-c$$

. Optimality by contradiction: if

$$\|W'-\Lambda\|_F < \sigma_{\min}(\Lambda)-c$$

then

$$\sigma_{\min}(W') \ge \sigma_{\min}(\Lambda) - \sigma_{\max}(W'-\Lambda) \ge \sigma_{\min}(\Lambda) - \|W'-\Lambda\|_F > c$$

**P3.** $f(w)=\frac12 w^\top Qw$ with $Q$ PD: (Q1) $f$ is $\beta$-smooth for every $\beta\ge\lambda_{\max}(Q)$; (Q2) not $\beta$-smooth for any $\beta<\lambda_{\max}(Q)$.
Technique: $\nabla f(w)=Qw$, so

$$\|\nabla f(w)-\nabla f(w')\| = \|Q(w-w')\| \le \lambda_{\max}(Q)\|w-w'\|$$

; for tightness take $v$ a unit top eigenvector:

$$\|\nabla f(v)-\nabla f(0)\| = \lambda_{\max}(Q)\|v\| > \beta\|v-0\|$$

**P4.** Overparameterize $f$ with a 2-layer linear NN of hidden width 1:

$$\phi(\mathbf{w},u) := f(u\mathbf{w}) = \frac{u^2}{2}\mathbf{w}^\top Q\mathbf{w}$$

. (Q3) Compute $\nabla_\mathbf{w}\phi = u^2Q\mathbf{w}$, $\nabla_u\phi = u\,\mathbf{w}^\top Q\mathbf{w}$; (Q4) all critical points of $\phi$ are global minima.
Technique: from

$$\nabla_\mathbf{w}\phi = u^2Q\mathbf{w}=0$$

and $Q$ PD, either $u=0$ or $\mathbf{w}=0$, i.e. $u\mathbf{w}=0$; then

$$\phi(\mathbf{w}^*,u^*) = f(0) = 0 \le f(u'\mathbf{w}') = \phi(\mathbf{w}',u')$$

since $f\ge0$ ($Q$ PD) — so every critical point attains the global minimum $0$.

**P5.** (GF finds critical points) If $f\in C^1$ and the GF curve satisfies $\lim_{t\to\infty}w(t)=w^*$, then $\nabla f(w^*)=0$.
Technique: contradiction. If $c:=\nabla f(w^*)_i > 0$ (WLOG), continuity gives an open $U\ni w^*$ with $\nabla f(w)_i \ge c/2$ on $U$; for $t\ge t_0$ the trajectory stays in $U$, so by FTC

$$w(t)_i - w(t_0)_i = -\int_{t_0}^t \nabla f(w(s))_i\,ds \le -(t-t_0)\frac{c}{2} \to -\infty$$

, contradicting convergence.

## Key formulas & facts
- GF setup: $w(0)=w_0$, $\dot w(t) = -\nabla f(w(t))$
- Convex GF rate: $f(w(T)) - f(w^*) \le \frac{\|w_0 - w^*\|^2}{2T}$ (continuous analogue of GD's $O(1/T)$ rate)
- Deficiency margin: $\min\{\|W-\Lambda\|_F:\sigma_{\min}(W)\le c\} = \max\{0,\ \sigma_{\min}(\Lambda)-c\}$
- Matrix facts: $\sigma_{\max}(A)\le\|A\|_F$; $\sigma_{\min}(A+B)\ge\sigma_{\min}(A)-\sigma_{\max}(B)$ (Weyl-type perturbation bound)
- Quadratic $f(w)=\frac12 w^\top Qw$, $Q$ PD: $\nabla f(w)=Qw$, exact smoothness constant $\beta = \lambda_{\max}(Q)$
- Overparameterized quadratic: $\phi(\mathbf{w},u) = \frac{u^2}{2}\mathbf{w}^\top Q\mathbf{w}$, $\nabla_\mathbf{w}\phi = u^2 Q\mathbf{w}$, $\nabla_u\phi = u\,\mathbf{w}^\top Q\mathbf{w}$; non-convex but every critical point is a global minimum
- Convexity first-order condition used: $f(w^*) \ge f(w) + \langle\nabla f(w), w^*-w\rangle$
- Limit of a convergent GF trajectory is a critical point (proof only needs $f\in C^1$, not the stated convexity)

## Exam-relevant nuggets
- Master the "monitor $\frac12\|w(t)-w^*\|^2$ + FTC + convexity" proof — it is the continuous-time template for essentially every convex-GF rate question.
- Deficiency margin is exactly the quantity from lecture 4's deep-linear-network convergence guarantee; the SVD-surgery construction (replace $\sigma_{\min}$ by $c$) plus the perturbation bound $\sigma_{\min}(A+B)\ge\sigma_{\min}(A)-\sigma_{\max}(B)$ is a recurring exam combo.
- "Smoothness constant of a quadratic $=\lambda_{\max}(Q)$, proved tight with the top eigenvector" — a standard short question; the same eigenvector trick shows any claimed constant below $\lambda_{\max}$ fails.
- Overparameterization theme: composing layers destroys convexity but can keep the landscape benign (no bad critical points). Here width-1 depth-2; Recitation 9 extends to depth $N$ and classifies saddles.
- In P5, spot that convexity is never used — a good conceptual check; the argument is purely local (continuity + integrating a bounded-below gradient coordinate).
