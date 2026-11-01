# FODL Mock Exam 7 (generated 2026-10-28) (Q2 replaced 2026-11-01)

**Format matches the real exam:** 3 hours · no aid material · 3 questions · 105 points
(max grade 100 — the 5 extra points are slack, as in recent years).
Every claim proved in class or recitation may be used if cited precisely; anything else
must be proved. Novel setups — variants of recent real exam patterns (2023–2024), not copies.

Solutions & grading rubric: `mock_exam_07_solutions.md` — **do not open before attempting.**

---

## Question 1 (40 pts) — Sign networks on a line: monotone codes, the last bit, and skip connections

Throughout, the input is a scalar and $\sigma(z) := 1$ if $z \ge 0$ and $\sigma(z) := 0$
otherwise (applied entrywise to vectors). For $k \in \mathbb{N}$ and
$w = (w_1, \dots, w_k), b = (b_1, \dots, b_k) \in \mathbb{R}^k$, the *sign layer*
$\varphi_{w,b} : \mathbb{R} \to \{0,1\}^k$ is

$$\varphi_{w,b}(x) := \big( \sigma(w_1 x + b_1), \dots, \sigma(w_k x + b_k) \big)^\top .$$

Its value $\varphi_{w,b}(x)$ is called the *code* of $x$. No sign restriction is put on the
$w_i$ (they may be positive, negative or zero).

Fix $n \in \mathbb{N}_{\ge 2}$ and the finite input set
$X_n := \{0, 1, 2, \dots, 2^n - 1\} \subset \mathbb{R}$. The target is the *last bit*

$$\pi_n : X_n \to \{0,1\}, \qquad \pi_n(x) := x \bmod 2 .$$

We say that a function $h : \mathbb{R} \to \mathbb{R}$ *realizes* $\pi_n$ if $h(x) = \pi_n(x)$
for every $x \in X_n$. Two hypothesis classes, both sized by their number of hidden neurons:

- **Shallow sign networks with a linear skip**, for $B \in \mathbb{N}_0$:

  $$\mathcal{H}_B := \Big\{ x \mapsto \gamma + \alpha x + \sum_{i=1}^{B} v_i\,
  \sigma(w_i x + b_i) \;:\; \gamma, \alpha, v_i, w_i, b_i \in \mathbb{R} \Big\}.$$

- **Densely connected deep sign networks** with $L \in \mathbb{N}_0$ hidden neurons, one per
  layer: neuron $l \in [L]$ reads the input *and* all earlier neurons,

  $$z_l(x) := \sigma\Big( a_l\, x + \sum_{j=1}^{l-1} u_{l,j}\, z_j(x) + c_l \Big),
  \qquad l = 1, \dots, L,$$

  and the output reads everything: $h(x) := \gamma + \alpha x + \sum_{l=1}^{L} \beta_l\, z_l(x)$,
  with all $a_l, u_{l,j}, c_l, \beta_l, \gamma, \alpha \in \mathbb{R}$. Denote this class by
  $\mathcal{D}_L$.

1. **(10 pts)** *Codes move along a chain.* Fix $k$, $w$, $b$. For each $i \in [k]$ let
   $\varphi_i^- := \lim_{x \to -\infty} \sigma(w_i x + b_i)$ (explain why the limit exists),
   and for $x \in \mathbb{R}$ let

   $$S(x) := \{ i \in [k] : \sigma(w_i x + b_i) \neq \varphi_i^- \} .$$

   a. **(5 pts)** Prove that $x \le x'$ implies $S(x) \subseteq S(x')$, and that the code
      $\varphi_{w,b}(x)$ is determined by the set $S(x)$.

   b. **(3 pts)** Conclude that $\varphi_{w,b}$ takes at most $k + 1$ distinct values on
      $\mathbb{R}$, and moreover that along any increasing sequence
      $x_0 < x_1 < \dots < x_M$ the code changes (i.e.
      $\varphi_{w,b}(x_{j}) \ne \varphi_{w,b}(x_{j+1})$) for at most $k$ indices $j$.
      Exhibit $w, b$ for which $k + 1$ distinct codes are attained.

   c. **(2 pts)** *Unreachable outputs.* Deduce that for every $k \ge 2$ and every
      $w, b \in \mathbb{R}^k$, at least $2^k - k - 1$ codes $y \in \{0,1\}^k$ are output by
      **no** $x \in \mathbb{R}$.

2. **(10 pts)** *Shallow lower bound.* Prove that if $h \in \mathcal{H}_B$ realizes $\pi_n$
   then $B \ge 2^{n-1} - 1$. Then show that this is tight: exhibit an explicit
   $h \in \mathcal{H}_{2^{n-1}-1}$ realizing $\pi_n$, and verify it.
   *Hint:* compare $h(j+1) - h(j)$ with $\pi_n(j+1) - \pi_n(j)$ at the indices
   $j \in \{0, \dots, 2^n - 2\}$ where the code of the hidden layer does **not** change.

3. **(10 pts)** *Deep construction.* Prove that $\pi_n \in \mathcal{D}_{n-1}$, i.e. some
   densely connected sign network with only $n - 1$ hidden neurons realizes $\pi_n$.
   Give all weights explicitly.
   *Hint:* binary expansion — let neuron $l$ output bit number $n - l$ of $x$ (bit $0$ being
   the last bit), and track the remainder $x - \sum_{j \le l} 2^{n-j} z_j(x)$.

4. **(5 pts)** Write the formal definition (as in class, Lecture 1) of
   "$\mathcal{D}_{\bar B}$ is *exponentially* expressively efficient with respect to
   $\mathcal{H}_B$" for hypothesis classes over the input space $X_n$, with $n$ playing the
   role of the problem dimension. Then prove that this holds, using parts 2–3.

5. **(5 pts)** *Depth without skip connections does not help.* Let $k \in \mathbb{N}$,
   $w, b \in \mathbb{R}^k$, and let $F : \{0,1\}^k \to \mathbb{R}$ be **any** function (for
   instance, any stack of further sign layers of any width and depth followed by any output
   layer, which only sees the first layer's code). Prove: if $F(\varphi_{w,b}(x)) = \pi_n(x)$
   for every $x \in X_n$, then $k \ge 2^n - 1$. In one sentence: which feature of
   $\mathcal{D}_L$ made depth exponentially useful in part 3?

---

## Question 2 (35 pts) — Gradient flow on a deep linear network with a vector input: balancedness, end-to-end dynamics and a margin

Fix $d \in \mathbb{N}$, a depth $N \ge 3$ and a vector $\beta \in \mathbb{R}^d \setminus \{0\}$, and let

$$\ell : \mathbb{R}^d \to \mathbb{R}_{\ge 0}, \qquad \ell(w) := \tfrac12 \|w - \beta\|^2 .$$

(By Lecture 4 this is, up to an additive constant, the squared loss of a linear predictor
$x \mapsto \langle w, x \rangle$ on whitened data, with $\beta^\top = \Lambda_{yx}$.) We
overparameterize $w$ by a linear neural network of depth $N$ with input dimension $d$, output
dimension $1$ and **all hidden widths equal to $1$**: the first layer is
$W_1 = u^\top \in \mathbb{R}^{1 \times d}$ and the other layers are scalars
$W_j = a_j \in \mathbb{R}$, $j = 2, \dots, N$. The parameters are
$\theta := (u, a_2, \dots, a_N) \in \mathbb{R}^{d + N - 1}$, the end-to-end vector is

$$w := a_N a_{N-1} \cdots a_2\, u \in \mathbb{R}^d ,$$

so that $W_{1:N} = w^\top$, and the objective is $\phi(\theta) := \ell(w)$. Gradient flow
$\dot\theta(t) = -\nabla\phi(\theta(t))$ is run from $\theta(0)$, and $w(t)$ denotes the end-to-end vector at time $t$. You may assume
that the flow exists for all $t \ge 0$ and that through every point of $\mathbb{R}^{d+N-1}$
passes exactly one solution (forward and backward in time). Write $\pi := a_2 a_3 \cdots a_N$
and $\pi_{-j} := \prod_{i \in \{2, \dots, N\} \setminus \{j\}} a_i$.

1. **(7 pts)** *The landscape.*

   a. **(4 pts)** Prove that $\nabla_u \phi = \pi\, \nabla\ell(w)$ and
      $\partial_{a_j}\phi = \pi_{-j} \langle \nabla\ell(w), u \rangle$. Deduce that $\theta = 0$
      is a critical point of $\phi$ with $\phi(0) > \min\phi$, and conclude that $\phi$ is
      **not** convex.

   b. **(3 pts)** Prove that the Hessian of $\phi$ at $\theta = 0$ is the zero matrix, and that
      $\theta = 0$ is neither a local minimum nor a local maximum. In one sentence: what does
      this say about the landscape approach of Lecture 3?

2. **(8 pts)** *Conservation laws.*

   a. **(5 pts)** Consider a **general** depth-$N$ linear network
      $\psi(W_1, \dots, W_N) := L(W_N \cdots W_1)$ with a continuously differentiable $L$, and
      recall from Lecture 3 that
      $\nabla_{W_j}\psi = W_{j+1:N}^\top\, \nabla L(W_{1:N})\, W_{1:j-1}^\top$, where
      $W_{i:k} := W_k \cdots W_i$ and an empty product is the identity. Prove that along gradient
      flow over $\psi$, for every $j \in [N-1]$, the matrix
      $W_{j+1}(t)^\top W_{j+1}(t) - W_j(t)\, W_j(t)^\top$ does not depend on $t$. Do not use
      Lemma 1 of Lecture 4.

   b. **(3 pts)** Back to our network. Deduce that $a_j(t)^2 - \|u(t)\|^2$ is constant in $t$
      for every $j \in \{2, \dots, N\}$, and verify directly that
      $\frac{d}{dt} a_j^2 = \frac{d}{dt} \|u\|^2 = -2 \langle \nabla\ell(w), w \rangle$.

3. **(9 pts)** *End-to-end dynamics.* Assume from now on a **balanced** initialization:
   $a_j(0)^2 = \|u(0)\|^2$ for every $j \in \{2, \dots, N\}$.

   a. **(6 pts)** Prove that for every $t \ge 0$ with $w(t) \ne 0$, writing $w = w(t)$,

      $$\dot w(t) = -\|w\|^{2 - \frac{2}{N}} \Big( \nabla\ell(w) + (N-1)\, \frac{\langle \nabla\ell(w), w \rangle}{\|w\|^2}\, w \Big),$$

      and that $\dot w(t) = 0$ whenever $w(t) = 0$. Do not use Theorem 1 of Lecture 4.

   b. **(3 pts)** Write part a as $\dot w = -P_w \nabla\ell(w)$ with a symmetric matrix $P_w$.
      Find the eigenvalues and eigenvectors of $P_w$, check them against Lecture 4, Prop 1
      (applied to the $1 \times d$ matrix $w^\top$), and say in one sentence which directions of
      motion depth amplifies.

4. **(7 pts)** *Convergence from a margin.* Keep the balanced initialization and assume
   $\|w(0) - \beta\| < \|\beta\|$ (by Lecture 4, this means that $w(0)$ has a deficiency
   margin). Set $c := \|\beta\| - \|w(0) - \beta\| > 0$.

   a. **(3 pts)** Prove that $\|w(t)\| \ge c$ for all $t \ge 0$. You may use that gradient flow
      never increases the objective.

   b. **(4 pts)** Prove that for all $t \ge 0$

      $$\ell(w(t)) \;\le\; \ell(w(0))\, \exp\!\big( -2\, c^{\,2 - \frac{2}{N}}\, t \big) .$$

      Do not use Theorem 2 of Lecture 4.

5. **(4 pts)** *The margin cannot be dropped.* Keep the balanced initialization, but now let
   $w(0) = -\gamma\beta$ for some $\gamma > 0$. Prove that $\ell(w(t)) > \frac12\|\beta\|^2$ for
   every $t \ge 0$, i.e. gradient flow never even gets below the loss of the zero predictor.
   *Hint:* first show that $w(t) \ne 0$ for all $t$, then follow the component of $w(t)$
   orthogonal to $\beta$.

---

## Question 3 (30 pts) — Min-norm interpolation and a norm-adaptive bound with doubling radii

Let $N < d$, let $S = \{(x_n, y_n)\}_{n=1}^N \subset \mathbb{R}^d \times \mathbb{R}$ be a
training set drawn i.i.d. from an unknown distribution $D$, and let
$X \in \mathbb{R}^{N \times d}$ be the matrix whose $n$-th row is $x_n^\top$. Assume that
$x_1, \dots, x_N$ are linearly independent, so that $K := X X^\top \in \mathbb{R}^{N \times N}$
is positive definite; let $\mu_{\max}$ be its largest eigenvalue. Write
$y = (y_1, \dots, y_N)^\top$ and $X_S := \max_{n} \|x_n\|$ ($\|\cdot\|$ is the Euclidean
norm), and $h_w(x) := \langle w, x \rangle$.

1. **(8 pts)** Gradient descent is run on $F(w) := \frac{1}{2N} \|X w - y\|^2$ from
   $w_0 = 0$ with step size $\eta \in (0, 2N / \mu_{\max})$:
   $w_{t+1} = w_t - \eta \nabla F(w_t)$. Prove that $w_t \to w^* := X^\top K^{-1} y$, that
   $w^*$ is the **unique** minimizer of $\|w\|$ among all interpolators
   ($X w = y$), and that $\|w^*\|^2 = y^\top K^{-1} y$. (Unlike Lecture 7, convergence is
   not assumed here — prove it.)
   *Hint:* follow the residual $r_t := X w_t - y$.

For generalization we use the *clipped absolute loss*
$\ell(y, \hat y) := \min\{1, |y - \hat y|\} \in [0,1]$, with $L_D(h)$ and $L_S(h)$ its
population and empirical averages. For $r > 0$ let
$\mathcal{H}_r := \{ h_w : \|w\| \le r \}$, and for a class $\mathcal{H}$ let

$$\mathcal{H} \circ S := \{ (h(x_1), \dots, h(x_N)) : h \in \mathcal{H} \},$$

$$\ell \circ \mathcal{H} \circ S := \{ (\ell(y_1, h(x_1)), \dots, \ell(y_N, h(x_N))) :
h \in \mathcal{H} \}.$$

*Reminder (Lecture 6, Thm 1):* for every class $\mathcal{H}$ fixed before seeing $S$ and
$\delta \in (0,1)$, w.p. $\ge 1 - \delta$ over $S$:

$$\forall h \in \mathcal{H}:\quad L_D(h) - L_S(h) \le 2 R(\ell \circ \mathcal{H} \circ S) +
4 \sqrt{\frac{2 \ln(4/\delta)}{N}} ,$$

where, with $\xi_1, \dots, \xi_N$ i.i.d. uniform on $\{\pm 1\}$,

$$R(A) := \frac{1}{N} \mathbb{E}_\xi \Big[ \sup_{a \in A} \sum_{n} \xi_n a_n \Big] .$$

*Reminder (contraction, black box):* if $\ell(y, \cdot)$ is $\rho$-Lipschitz for every $y$,
then $R(\ell \circ \mathcal{H} \circ S) \le \rho\, R(\mathcal{H} \circ S)$.

2. **(8 pts)** Prove that $R(\mathcal{H}_r \circ S) \le r X_S / \sqrt{N}$, and deduce that for
   every fixed $r > 0$ and $\delta \in (0,1)$, w.p. $\ge 1 - \delta$:

   $$\forall h \in \mathcal{H}_r: \quad L_D(h) - L_S(h) \;\le\;
   \frac{2 r X_S}{\sqrt{N}} + 4 \sqrt{\frac{2 \ln(4/\delta)}{N}} .$$

   *Hint:* $\sup_{\|w\| \le r} \langle w, v \rangle = r \|v\|$; then Jensen.

3. **(8 pts)** *Doubling radii.* For $k \in \mathbb{N}_0$ use the class $\mathcal{H}_{2^k}$
   with confidence $\delta_k := \frac{6 \delta}{\pi^2 (k+1)^2}$. Prove: w.p. $\ge 1 - \delta$,
   for **every** $w \in \mathbb{R}^d$, with $B(w) := \max\{1, 2\|w\|\}$,

   $$L_D(h_w) \;\le\; L_S(h_w) + \frac{2 B(w) X_S}{\sqrt{N}} +
   4 \sqrt{\frac{2 \ln\!\big(\frac{2\pi^2}{3\delta}\big) + 4 \ln \log_2\!\big(2 B(w)\big)}{N}} .$$

   Instantiate it for the gradient-descent limit $w^*$ of part 1 (what is $L_S(h_{w^*})$?),
   and state in one sentence what this union over doubling radii gains and what it loses
   compared to the union over integer radii $r = 1, 2, 3, \dots$ from class (Lecture 6, Prop 3).
   You may use $\sum_{m \ge 1} m^{-2} = \pi^2/6$.

4. **(6 pts)** *When is it informative?*

   a. **(3 pts)** Suppose the labels are produced by a teacher: $y_n = \langle w^\circ, x_n \rangle$
      for all $n$, for some $w^\circ \in \mathbb{R}^d$. Prove $\|w^*\| \le \|w^\circ\|$, and
      write the resulting bound on $L_D(h_{w^*})$ — note that it does not depend on $d$.

   b. **(3 pts)** Suppose instead $x_n = e_{j_n}$ for distinct indices $j_1, \dots, j_N \in [d]$
      and $y_n \in \{\pm 1\}$. Compute $\|w^*\|$ and show that the bound of part 3 for $h_{w^*}$
      exceeds $1$ (vacuous) for every $N$. Then let $D$ be: $x$ uniform over
      $\{e_1, \dots, e_d\}$ and $y$ uniform on $\{\pm 1\}$ independently of $x$; compute
      $L_D(h_{w^*})$ exactly for such a sample, and explain in one sentence why the
      vacuity is deserved here.
