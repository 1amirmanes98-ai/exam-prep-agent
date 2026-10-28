# FODL Mock Exam 8 (generated 2026-10-28)

**Format matches the real exam:** 3 hours · no aid material · 3 questions · 105 points
(max grade 100 — the 5 extra points are slack, as in recent years).
Every claim proved in class or recitation may be used if cited precisely; anything else
must be proved. Novel setups — variants of recent real exam patterns (2023–2024), not copies.

Solutions & grading rubric: `mock_exam_08_solutions.md` — **do not open before attempting.**

---

## Question 1 (40 pts) — Linear RNNs: exponential sums, Hankel rank and rotations

Fix $L \in \mathbb{N}_{\ge 3}$. For $d \in \mathbb{N}$, a *linear RNN hypothesis* with
state dimension $d$ receives $x = (x_1, \dots, x_L) \in \mathbb{R}^L$ and outputs
$h(x) \in \mathbb{R}$ via

$$s_0(x) = 0 \in \mathbb{R}^d, \qquad
  \forall t \in [L]:\; s_t(x) = A\, s_{t-1}(x) + B\, x_t, \qquad
  h(x) = C^\top s_L(x),$$

with weights $A \in \mathbb{R}^{d \times d}$ (the *transition matrix*) and
$B, C \in \mathbb{R}^d$. Denote by $\mathcal{H}_d$ the class of all such hypotheses. You may
use without proof the useful fact

$$h(x) = \sum_{t=1}^{L} C^\top A^{L-t} B\, x_t ,$$

with the convention $A^0 := I_d$ (in particular $\lambda^0 := 1$ for every scalar, including
$\lambda = 0$). It is convenient to read the coefficients **backwards**: for
$k \in \{0, \dots, L-1\}$ put $c_k := C^\top A^{k} B$ (the coefficient of $x_{L-k}$), and call
$c = (c_0, \dots, c_{L-1}) \in \mathbb{R}^L$ the *reversed coefficient sequence* of $h$. For a
sub-class $\mathcal{G} \subseteq \mathcal{H}_d$ let $\mathcal{S}(\mathcal{G}) \subseteq \mathbb{R}^L$
be the set of reversed coefficient sequences of hypotheses in $\mathcal{G}$ (two hypotheses
with the same sequence are the same function, so inclusions between classes are equivalent
to inclusions between their $\mathcal{S}$-sets). Define the sub-classes

- $\mathcal{H}_d^{diag}$: $A$ is diagonal;
- $\mathcal{H}_d^{diag+}$: $A$ is diagonal with all diagonal entries $\ge 0$;
- $\mathcal{H}_d^{sym}$: $A$ is symmetric.

*Reminder (Vandermonde):* if $\nu_1, \dots, \nu_m \in \mathbb{R}$ are pairwise distinct, the
matrix $V \in \mathbb{R}^{m \times m}$ with $V_{l,j} = \nu_l^{\,j}$ ($l \in [m]$,
$j \in \{0, \dots, m-1\}$) is invertible.

1. **(8 pts)** *Quantitative non-universality.* Let $f(x) := |x_1|$. Prove that for every
   $d \in \mathbb{N}$ and every $h \in \mathcal{H}_d$

   $$\sup_{x \in [-1,1]^L} \big| h(x) - f(x) \big| \;\ge\; 1 ,$$

   and that the value $1$ is attained by some $h \in \mathcal{H}_d$. Conclude that
   $\bigcup_{d \in \mathbb{N}} \mathcal{H}_d$ is not universal: a continuous function on the
   compact cube cannot even be approximated to accuracy $\tfrac12$.

2. **(8 pts)** *Exponential sums.*
   a. **(4 pts)** Prove that

      $$\mathcal{S}(\mathcal{H}_d^{diag}) = \Big\{ c \in \mathbb{R}^L :
      \exists\, p, \lambda \in \mathbb{R}^d \ \ \forall k \in \{0, \dots, L-1\}:\;
      c_k = \sum_{i=1}^{d} p_i \lambda_i^{k} \Big\}$$

      (both directions), and that $\mathcal{S}(\mathcal{H}_d^{diag+})$ is the same set with the
      extra requirement $\lambda \in \mathbb{R}_{\ge 0}^d$.

   b. **(4 pts)** Prove that $\mathcal{H}_d^{sym} = \mathcal{H}_d^{diag}$.

3. **(9 pts)** *A Hankel-rank hierarchy.* For $c \in \mathbb{R}^L$ and
   $m \in \mathbb{N}$ with $2m - 1 \le L$, let $H_m(c) \in \mathbb{R}^{m \times m}$ be the
   Hankel matrix $\big(H_m(c)\big)_{i,j} := c_{i+j}$, $i, j \in \{0, \dots, m-1\}$.

   a. **(5 pts)** Prove: if $c \in \mathcal{S}(\mathcal{H}_d^{diag})$ then
      $\mathrm{rank}\, H_m(c) \le d$ for every $m$ with $2m - 1 \le L$.
      *Hint:* write $H_m(c)$ as a product of three matrices.

   b. **(4 pts)** Prove that if $L \ge 2d + 1$ then
      $\mathcal{H}_d^{diag} \subsetneq \mathcal{H}_{d+1}^{diag}$ (both the inclusion and the
      strictness). *Hint:* try $c_k := \sum_{i=1}^{d+1} i^{\,k}$.

4. **(8 pts)** *Non-negative versus general diagonal transitions.*

   a. **(4 pts)** Let $m \in \mathbb{N}$, let $\mu_1 < \mu_2 < \dots < \mu_m$ be real, and
      let $q \in \mathbb{R}^m$ with $q \ne 0$. Prove that

      $$g(s) := \sum_{j=1}^{m} q_j\, e^{\mu_j s}, \qquad s \in \mathbb{R},$$

      has at most $m - 1$ distinct real zeros. *Hint:* induction on $m$ and Rolle's theorem,
      after multiplying $g$ by a suitable positive function.

   b. **(4 pts)** Let $c^{alt}$ be the alternating sequence $c^{alt}_k := (-1)^k$,
      $k \in \{0, \dots, L-1\}$. Prove that $c^{alt} \in \mathcal{S}(\mathcal{H}_1^{diag})$,
      and that

      $$c^{alt} \in \mathcal{S}(\mathcal{H}_d^{diag+}) \iff d \ge L .$$

      Conclude that $\mathcal{H}_d^{diag+} \subsetneq \mathcal{H}_d^{diag}$ for every
      $d \in \{1, \dots, L-1\}$ — a single negative eigenvalue cannot be emulated by $L-1$
      non-negative ones.

5. **(7 pts)** *Rotations.* Assume in this part $L \ge 4$. Let

   $$R := \begin{pmatrix} \tfrac12 & -\tfrac{\sqrt3}{2} \\ \tfrac{\sqrt3}{2} & \tfrac12 \end{pmatrix}$$

   (rotation by $\pi/3$), and let $h^{rot} \in \mathcal{H}_2$ have weights $A = R$,
   $B = C = e_1$.

   a. **(2 pts)** Prove that the reversed coefficient sequence of $h^{rot}$ is
      $c_k = \cos(k\pi/3)$, i.e. $c = (1, \tfrac12, -\tfrac12, -1, \dots)$.

   b. **(4 pts)** Prove that $h^{rot} \notin \mathcal{H}_2^{sym}$ (equivalently, by part 2,
      $h^{rot} \notin \mathcal{H}_2^{diag}$). Conclude that
      $\mathcal{H}_2^{sym} \subsetneq \mathcal{H}_2$.

   c. **(1 pt)** Explain in one or two sentences why the Hankel-rank test of part 3 cannot
      be used to prove part b.

---

## Question 2 (35 pts) — Symmetric factorization with an indefinite target

Let $d \in \mathbb{N}_{\ge 2}$ and let $W^* \in \mathbb{R}^{d \times d}$ be a symmetric matrix
with orthogonal eigendecomposition

$$W^* = Q\, \mathrm{diag}(\mu_1, \dots, \mu_d)\, Q^\top = \sum_{r=1}^{d} \mu_r\, q_r q_r^\top ,$$

where $Q \in \mathbb{R}^{d \times d}$ is orthogonal with columns $q_1, \dots, q_d$. Assume $W^*$
is **indefinite**: $\mu_r > 0$ for some $r$ and $\mu_{r'} < 0$ for some $r'$. Define

$$W^*_+ := \sum_{r:\, \mu_r > 0} \mu_r\, q_r q_r^\top \qquad \text{and} \qquad
W^*_- := -\sum_{r:\, \mu_r < 0} \mu_r\, q_r q_r^\top ,$$

so that $W^* = W^*_+ - W^*_-$ with $W^*_+, W^*_-$ PSD. Let
$L(W) := \|W - W^*\|_F^2$ for $W \in \mathbb{R}^{d \times d}$, and

$$\phi : \mathbb{R}^{d \times d} \to \mathbb{R}, \qquad \phi(U) := L(UU^\top).$$

Gradient flow is run over $\phi$: $\dot U(t) = -\nabla \phi(U(t))$, and
$W(t) := U(t) U(t)^\top$. As in class, you may assume that every ODE in this question (matrix
or scalar) has a unique solution, defined and differentiable for all $t \ge 0$.

1. **(7 pts)** *What the factorization can reach.* Prove that for every
   $U \in \mathbb{R}^{d \times d}$

   $$\phi(U) \;\ge\; \sum_{r:\, \mu_r < 0} \mu_r^2 ,$$

   with equality **if and only if** $UU^\top = W^*_+$ (and that equality is attainable).
   *Hint:* expand $\|(W - W^*_+) + W^*_-\|_F^2$, and show $\mathrm{Tr}(UU^\top P) \ge 0$
   for every PSD $P$.

2. **(9 pts)** *Commuting initialization.*

   a. **(3 pts)** Prove that $\nabla \phi(U) = 4\,(UU^\top - W^*)\, U$.

   b. **(6 pts)** Assume $U(0) = Q\, \mathrm{diag}(u_1(0), \dots, u_d(0))\, Q^\top$ for some
      $u(0) \in \mathbb{R}^d$. Prove that for all $t \ge 0$

      $$U(t) = Q\, \mathrm{diag}\big(u_1(t), \dots, u_d(t)\big)\, Q^\top, \qquad
      \dot u_r(t) = -4\big(u_r(t)^2 - \mu_r\big)\, u_r(t) \;\; (r \in [d]),$$

      and deduce that $W(t) = Q\, \mathrm{diag}(\lambda_1(t), \dots, \lambda_d(t))\, Q^\top$
      with $\lambda_r(t) := u_r(t)^2$ satisfying

      $$\dot \lambda_r(t) = 8\, \lambda_r(t)\, \big(\mu_r - \lambda_r(t)\big).$$

3. **(11 pts)** *Solving the eigenvalue ODE.* Let $\lambda(\cdot)$ solve
   $\dot \lambda = 8 \lambda (\mu - \lambda)$ with $\lambda(0) = \lambda_0 \ge 0$, for some
   $\mu \in \mathbb{R}$.

   a. **(2 pts)** Prove that if $\lambda_0 = 0$ then $\lambda \equiv 0$, and if
      $\lambda_0 > 0$ then $\lambda(t) > 0$ for all $t \ge 0$.

   b. **(4 pts)** Let $\mu > 0$ and $\lambda_0 > 0$. Prove that

      $$\lambda(t) = \frac{\mu\, \lambda_0}{\lambda_0 + (\mu - \lambda_0)\, e^{-8\mu t}}
      \qquad \forall t \ge 0,$$

      and deduce $\lambda(t) \to \mu$ as $t \to \infty$.

   c. **(3 pts)** Let $\lambda_0 > 0$. Prove that if $\mu < 0$ then
      $\lambda(t) \le \lambda_0\, e^{-8|\mu| t}$, and if $\mu = 0$ then
      $\lambda(t) = \lambda_0 / (1 + 8 \lambda_0 t)$; in both cases $\lambda(t) \to 0$.

   d. **(2 pts)** Back to part 2b. Prove that if $u_r(0) \ne 0$ for every $r$, then
      $W(t) \to W^*_+$ and $\phi(U(t)) \to \min \phi$. Show that the assumption
      $u_r(0) \ne 0$ cannot be dropped.

4. **(8 pts)** *Small initialization.* Let $U(0) = \alpha I_d$ with $\alpha \in (0, 1)$ (a
   commuting initialization for every $W^*$), and suppose (after relabeling) that
$\mu_1 > \mu_2 > 0$ are two of the eigenvalues of $W^*$.

   a. **(5 pts)** Fix $c$ with $\frac{1}{4\mu_1} < c < \frac{1}{4\mu_2}$ and set
      $t_\alpha := c \ln(1/\alpha)$. Prove that

      $$\lim_{\alpha \to 0^+} \lambda_1(t_\alpha) = \mu_1, \qquad
      \lim_{\alpha \to 0^+} \lambda_2(t_\alpha) = 0,$$

      and that $\lambda_r(t) \le \alpha^2$ for all $t \ge 0$ whenever $\mu_r \le 0$.

   b. **(3 pts)** Interpret part a in terms of the rank of $W(t)$ along the trajectory and
      at its end (cf. the low-rank bias of matrix factorization discussed in class, Lecture 8).
      Contrast with gradient flow run directly on $L$ over $W$ from $W(0) = \alpha^2 I_d$:
      solve that flow explicitly and state its limit.

---

## Question 3 (30 pts) — Generalization of deep networks via per-layer covers and norm buckets

Let $K \in \mathbb{N}$ (depth) and widths $n_0, n_1, \dots, n_K \in \mathbb{N}$ with
$n_K = 1$. A parameter vector is $\theta = (W_1, \dots, W_K)$ with
$W_k \in \mathbb{R}^{n_k \times n_{k-1}}$; let $P := \sum_{k=1}^{K} n_k n_{k-1}$ be the number
of parameters. Let $\sigma : \mathbb{R} \to \mathbb{R}$ be $1$-Lipschitz with $\sigma(0) = 0$
(e.g. ReLU), applied entrywise. The network is

$$f_\theta(x) := W_K\, \sigma\big(W_{K-1}\, \sigma( \cdots \sigma(W_1 x) \cdots )\big)
\qquad (\text{for } K = 1:\ f_\theta(x) = W_1 x),$$

on the input domain $\mathcal{X} := \{ x \in \mathbb{R}^{n_0} : \|x\|_2 \le 1 \}$. For
$M > 0$ let

$$\Theta_M := \big\{ \theta : \|W_k\|_F \le M \ \ \forall k \in [K] \big\}, \qquad
\mathcal{H}_M := \{ f_\theta : \theta \in \Theta_M \}.$$

Let $D$ be an unknown distribution over $\mathcal{X} \times \mathcal{Y}$,
$S = \{(x_n, y_n)\}_{n=1}^{N}$ i.i.d. from $D$, and
$\ell : \mathbb{R} \times \mathcal{Y} \to [0,1]$ a loss that is $\rho$-Lipschitz in its first
argument. Write $L_D(\theta) := \mathbb{E}_{(x,y) \sim D}[\ell(f_\theta(x), y)]$ and
$L_S(\theta) := \frac1N \sum_{n=1}^{N} \ell(f_\theta(x_n), y_n)$. You may use that
$\|Wz\|_2 \le \|W\|_F \|z\|_2$ for every matrix $W$ and vector $z$.

*Reminder (finite class, as proved in class, Lecture 6):* if $\mathcal{F}$ is a finite set of
predictors chosen independently of $S$, then for every $\delta \in (0,1)$, with probability at
least $1 - \delta$,

$$\forall f \in \mathcal{F}: \quad L_D(f) - L_S(f) \;\le\;
\sqrt{\frac{\ln(2|\mathcal{F}|/\delta)}{2N}} .$$

*Reminder (covering a Euclidean ball):* for every $p \in \mathbb{N}$, $R > 0$ and
$\eta \in (0, R]$ there is a finite set $C \subseteq \{v \in \mathbb{R}^p : \|v\|_2 \le R\}$
with $|C| \le (3R/\eta)^p$ such that every $v \in \mathbb{R}^p$ with $\|v\|_2 \le R$ satisfies
$\|v - v'\|_2 \le \eta$ for some $v' \in C$. (Apply it to matrices through the Frobenius
norm, which is the Euclidean norm of the flattened matrix.)

1. **(8 pts)** *Lipschitzness in the parameters.* Prove that for every $M > 0$ and all
   $\theta = (W_1, \dots, W_K)$, $\theta' = (W_1', \dots, W_K') \in \Theta_M$:

   $$\sup_{x \in \mathcal{X}} \big| f_\theta(x) - f_{\theta'}(x) \big|
   \;\le\; M^{K-1} \sum_{k=1}^{K} \big\| W_k - W_k' \big\|_F .$$

   *Hint:* first bound the norms of the hidden representations; then change one layer at a
   time.

2. **(8 pts)** *A cover of the product of per-layer balls.* Let $M > 0$ and
   $\epsilon \in (0, K M^K]$. Prove that there is a finite $\mathcal{F}_M \subseteq \mathcal{H}_M$
   with

   $$|\mathcal{F}_M| \le \Big( \frac{3 K M^K}{\epsilon} \Big)^{P}$$

   that is an $\epsilon$-cover of $\mathcal{H}_M$ in the sup norm over $\mathcal{X}$, and
   deduce that for every $\delta \in (0,1)$, with probability at least $1 - \delta$,

   $$\forall \theta \in \Theta_M: \quad L_D(\theta) - L_S(\theta) \;\le\;
   \sqrt{\frac{P \ln\!\big(3 K M^K / \epsilon\big) + \ln(2/\delta)}{2N}} \;+\; 2\rho\epsilon .$$

3. **(8 pts)** *Norm buckets.* Fix $\epsilon \in (0, 1]$. For an arbitrary parameter vector
   $\theta$ (no norm constraint) let $M(\theta) := \max_{k} \|W_k\|_F$ and

   $$j(\theta) := \min\big\{ j \in \mathbb{N}_0 : M(\theta) \le 2^j \big\} .$$

   Prove that for every $\delta \in (0,1)$, with probability at least $1 - \delta$,
   simultaneously for **every** $\theta$ (with $j := j(\theta)$):

   $$L_D(\theta) - L_S(\theta) \;\le\;
   \sqrt{\frac{P \ln(3K/\epsilon) + jKP \ln 2 + (j+1)\ln 2 + \ln(2/\delta)}{2N}}
   \;+\; 2\rho\epsilon ,$$

   and show that $j(\theta) \le \log_2 \max\{1, 2M(\theta)\}$.

4. **(6 pts)** *Reading the bound.*

   a. **(3 pts)** Take $\epsilon := 1/\sqrt{N}$. Prove that for every fixed $\theta$ (and
      fixed $K, P, \rho, \delta$) the bound of part 3 tends to $0$ as $N \to \infty$, and
      state how it scales with the depth $K$ and with the learned norm $M(\theta)$.

   b. **(3 pts)** In at most four sentences: why is part 3 preferable to applying part 2
      with a single $M$, when $\theta = \hat\theta$ is the output of training? And why is the
      bound nevertheless uninformative for the overparameterized networks used in practice
      (connect to the discussion in class on what a meaningful generalization bound should
      depend on)?
