# FODL Mock Exam 7 (generated 2026-10-28)

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

## Question 2 (35 pts) — Learning a $k$-step memory with a scalar linear RNN

Fix integers $L \ge 3$ and $k \in \{2, \dots, L-1\}$, and a target $y > 0$. A *scalar linear
RNN* with recurrence $\lambda \in \mathbb{R}$ and read-out $c \in \mathbb{R}$ receives
$x = (x_1, \dots, x_L) \in \mathbb{R}^L$ and computes

$$s_0 := 0, \qquad s_t := \lambda\, s_{t-1} + x_t \;\; (t \in [L]), \qquad
h_{\lambda,c}(x) := c\, s_L .$$

(Convention: $\lambda^0 := 1$, also for $\lambda = 0$.) The training set is the single
example $(x, y)$ with $x = e_{L-k}$, the one-hot sequence whose only nonzero entry is
$x_{L-k} = 1$: the network must output $y$ at time $L$ in response to an impulse it saw
$k$ steps earlier. The objective is the squared loss

$$\ell(\lambda, c) := \tfrac12 \big( h_{\lambda,c}(e_{L-k}) - y \big)^2 ,$$

and gradient flow
$\dot\lambda = -\partial_\lambda \ell$, $\dot c = -\partial_c \ell$ is run from
$(\lambda(0), c(0)) = (\lambda_0, c_0)$. You may assume that the flow exists for all
$t \ge 0$ and that through every point of $\mathbb{R}^2$ passes exactly one solution
(forward and backward in time). Write $r(t) := c(t)\lambda(t)^k - y$ for the residual.

1. **(6 pts)** Prove that $s_L = \sum_{t=1}^{L} \lambda^{L-t} x_t$ for every input, hence
   $\ell(\lambda, c) = \tfrac12 (c \lambda^k - y)^2$, and derive the flow

   $$\dot\lambda = -k\, c\, \lambda^{k-1}\, r, \qquad \dot c = -\lambda^k\, r .$$

2. **(7 pts)** Prove that every point $(0, c)$, $c \in \mathbb{R}$, is a critical point of
   $\ell$ with $\ell(0, c) = y^2/2$, while $\min \ell = 0$; conclude that $\ell$ is **not**
   convex. Prove further that if $\lambda_0 = 0$ then $\ell(\lambda(t), c(t)) = y^2/2$ for
   all $t \ge 0$ (an RNN initialized with no recurrence never learns this memory).

3. **(8 pts)** Prove that $\lambda(t)^2 - k\, c(t)^2$ is constant along the flow, and that
   if $\lambda_0 \neq 0$ then $\lambda(t)$ never vanishes and keeps the sign of
   $\lambda_0$. Deduce: if $\lambda_0 > 0$, $c_0 < 0$ and $\lambda_0^2 < k c_0^2$, then
   $\ell(\lambda(t), c(t)) > y^2/2$ for every $t \ge 0$ — gradient flow does not converge
   to the global minimum.

4. **(10 pts)** *Global convergence from positive initializations.* Assume
   $\lambda_0 > 0$ and $c_0 > 0$.

   a. **(2 pts)** Prove that $\dot r = -P(t)\, r$ with

      $$P(t) := \lambda(t)^{2k-2} \big( \lambda(t)^2 + k^2 c(t)^2 \big) \ge 0 ,$$

      and that $r(t)$ never changes sign.

   b. **(5 pts)** *Under-fitting start*, $c_0 \lambda_0^k < y$. Prove that $\lambda(t)$ and
      $c(t)$ are non-decreasing (in particular stay positive), and that

      $$\ell(\lambda(t), c(t)) \;\le\; \ell(\lambda_0, c_0)\, \exp\!\big( -2 P_0\, t \big),
      \qquad P_0 := \lambda_0^{2k-2} \big( \lambda_0^2 + k^2 c_0^2 \big).$$

   c. **(3 pts)** *Over-fitting start*, $c_0 \lambda_0^k > y$. Prove that

      $$\ell(\lambda(t), c(t)) \le \ell(\lambda_0, c_0) \exp\!\big( -2 y^2 t / c_0^2 \big) .$$

5. **(4 pts)** *Vanishing gradients.* Let $y \ge 1$ and initialize
   $\lambda_0 = c_0 = \varepsilon \in (0,1)$. Show that
   $\|\nabla \ell(\lambda_0, c_0)\| \le (k+1)\, y\, \varepsilon^k$ and that the rate
   guaranteed in part 4b equals $2(1 + k^2)\varepsilon^{2k}$. In one or two sentences,
   interpret this for learning long-range memory (large $k$) with a small recurrent
   initialization.

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
