# FODL Mock Exam 6 (generated 2026-10-28)

**Format matches the real exam:** 3 hours · no aid material · 3 questions · 105 points
(max grade 100 — the 5 extra points are slack, as in recent years).
Every claim proved in class or recitation may be used if cited precisely; anything else
must be proved. Novel setups — variants of recent real exam patterns (2023–2024), not copies.

Solutions & grading rubric: `mock_exam_06_solutions.md` — **do not open before attempting.**

---

## Question 1 (40 pts) — Bias-free ReLU networks: cones, sectors, and restoring biases

Throughout, $\sigma(z) := \max\{0, z\}$ (ReLU). For $D, B \in \mathbb{N}$ let
$\mathcal{H}_B^D$ be the class of networks with one hidden layer of width $B$,
**without biases**, input space $\mathbb{R}^D$ and scalar output:

$$\mathcal{H}_B^D := \Big\{ x \mapsto \sum_{i=1}^{B} v_i\, \sigma(w_i^\top x) \;:\;
w_1, \dots, w_B \in \mathbb{R}^D,\; v_1, \dots, v_B \in \mathbb{R} \Big\}.$$

As in class, $h : \mathbb{R}^D \to \mathbb{R}$ is *linear around* $x \in \mathbb{R}^D$
*according to* $a \in \mathbb{R}^D$ if there is $\epsilon > 0$ with $h(x') = a^\top x'$
for every $x'$ satisfying $\|x' - x\| \le \epsilon$, and

$$A_h := \big\{ a \in \mathbb{R}^D : \exists\, x \in \mathbb{R}^D \text{ such that } h
\text{ is linear around } x \text{ according to } a \big\}.$$

1. **(8 pts)** *Positive homogeneity and a uniform approximation floor.*
   a. **(3 pts)** Prove that every $h \in \mathcal{H}_B^D$ satisfies $h(\lambda x) =
      \lambda\, h(x)$ for all $x \in \mathbb{R}^D$ and all $\lambda \ge 0$ (in
      particular $h(0) = 0$).
   b. **(5 pts)** Let $f(x) := \|x\|^2$. Prove that for every $B \in \mathbb{N}$, every
      $h \in \mathcal{H}_B^D$ and every unit vector $u \in \mathbb{R}^D$:

      $$\sup_{\lambda \in [0,1]} \big| h(\lambda u) - f(\lambda u) \big| \;\ge\; \frac16 .$$

      Conclude that $\bigcup_{B} \mathcal{H}_B^D$ cannot approximate $f$ uniformly on the
      unit ball to accuracy better than $\tfrac16$, however large the width.
      *Hint:* compare $\lambda = 1$ with $\lambda = \tfrac12$.

2. **(8 pts)** *Activation cones.* Let $h \in \mathcal{H}_B^D$ with weights
   $(w_i, v_i)_{i=1}^B$, let $I := \{ i : w_i \ne 0 \}$, and let $x \in \mathbb{R}^D$
   satisfy $w_i^\top x \ne 0$ for every $i \in I$. Define

   $$C(x) := \big\{ x' \in \mathbb{R}^D : \operatorname{sign}(w_i^\top x') =
   \operatorname{sign}(w_i^\top x) \ \text{ for every } i \in I \big\},
   \qquad a(x) := \sum_{i \in I:\, w_i^\top x > 0} v_i\, w_i .$$

   Prove that $C(x)$ is an open convex cone (i.e. open, and $\lambda x' + \mu x'' \in
   C(x)$ for all $x', x'' \in C(x)$ and $\lambda, \mu > 0$) containing $x$, and that
   $h(x') = a(x)^\top x'$ for every $x' \in C(x)$; in particular $h$ is linear around
   $x$ according to $a(x)$. Deduce that $|A_h| \le 2^B$.

3. **(12 pts)** *Exact region count in the plane.* Let $D = 2$.
   a. **(6 pts)** Prove that $|A_h| \le 2B$ for every $h \in \mathcal{H}_B^2$.
      *Hint:* $m \ge 1$ distinct lines through the origin of $\mathbb{R}^2$ cut the plane minus
      those lines into exactly $2m$ open sectors; show that every element of $A_h$ is
      the linear coefficient of $h$ on one of them.
   b. **(6 pts)** Let $w_1, \dots, w_B \in \mathbb{R}^2$ be pairwise linearly independent
      (no two parallel, none zero) and $v_1, \dots, v_B > 0$. Prove that the network
      $h$ with these weights satisfies $|A_h| = 2B$. Conclude that
      $\max_{h \in \mathcal{H}_B^2} |A_h| = 2B$, and compare with the bound of part 2
      for large $B$.
      *Hint:* $h$ is convex. If two different sectors carried the same coefficient $a$,
      show that $h = a^\top(\cdot)$ along a segment joining them that avoids the origin,
      and look at the first sector boundary that segment crosses.

4. **(12 pts)** *Restoring biases with a constant input.* For $D, B \in \mathbb{N}$ let
   $\mathcal{N}_B^D$ be the class of one-hidden-layer ReLU networks **with** biases:

   $$\mathcal{N}_B^D := \Big\{ x \mapsto \sum_{i=1}^{B} v_i\, \sigma(w_i^\top x + b_i) + c
   \;:\; w_i \in \mathbb{R}^D,\; v_i, b_i, c \in \mathbb{R} \Big\}.$$

   a. **(3 pts)** Prove: for every $g \in \mathcal{N}_B^D$ there is
      $h \in \mathcal{H}_{B+1}^{D+1}$ with $h(x, 1) = g(x)$ for all $x \in \mathbb{R}^D$;
      and conversely, for every $h \in \mathcal{H}_B^{D+1}$ the map $x \mapsto h(x, 1)$
      belongs to $\mathcal{N}_B^D$.
   b. **(5 pts)** Let $D = 1$. Using the embedding of part (a) and the geometry of the
      lines $\{z \in \mathbb{R}^2 : \tilde w_i^\top z = 0\}$ (with $\tilde w_i$ the
      hidden weights of $h$), prove that every $g \in \mathcal{N}_B^1$ is piecewise
      linear with at most $B + 1$ linear pieces (in the sense of Lecture 2, Def 1), and
      exhibit $g \in \mathcal{N}_B^1$ with exactly $B + 1$ pieces (prove the count).
   c. **(4 pts)** Prove that for every $m \in \mathbb{N}$ there exists
      $h \in \mathcal{H}_m^2$ (bias-free, two inputs, width $m$) with

      $$\sup_{x \in [0,1]} \big| h(x, 1) - x^2 \big| \;\le\; \frac{1}{4m^2} .$$

      Explain in one or two sentences why this does not contradict part 1(b).

---

## Question 2 (35 pts) — Gradient flow under a PL inequality, and weight normalization

Throughout, gradient flow (GF) over a continuously differentiable $f$ means the curve
$w : [0, \infty) \to \mathbb{R}^d$ with $w(0) = w_0$ and $\dot w(t) = -\nabla f(w(t))$;
you may assume it exists for all $t \ge 0$, is unique given $w_0$, and is continuously
differentiable.

**Part One.** Let $f : \mathbb{R}^d \to \mathbb{R}$ be continuously differentiable with
$f^* := \inf_{w} f(w) > -\infty$ (the infimum is **not** assumed to be attained). We say
$f$ satisfies the *PL inequality with constant $\mu > 0$* if

$$\forall w \in \mathbb{R}^d: \quad \|\nabla f(w)\|^2 \;\ge\; 2\mu\, \big( f(w) - f^* \big).$$

1. **(5 pts)** Let $X \in \mathbb{R}^{N \times d}$ have rank $N$ (so $N \le d$), let
   $y \in \mathbb{R}^N$, and let $f(w) := \tfrac12 \|Xw - y\|^2$. Prove that $f^* = 0$
   and that $f$ satisfies the PL inequality with $\mu := \lambda_{\min}(X X^\top) > 0$.
   Is $f$ strongly convex when $N < d$? (Justify in one line.)

2. **(6 pts)** Let $f$ satisfy the PL inequality with constant $\mu$. Prove that GF
   satisfies, for every $t \ge 0$,

   $$f(w(t)) - f^* \;\le\; e^{-2\mu t} \big( f(w_0) - f^* \big).$$

3. **(10 pts)** *Trajectory length.* Same assumptions as part 2.
   a. **(5 pts)** Prove that

      $$\int_0^\infty \|\dot w(t)\|\, dt \;\le\; \sqrt{\frac{2\,(f(w_0) - f^*)}{\mu}} .$$

      *Hint:* differentiate $\sqrt{f(w(t)) - f^*}$ while it is positive; treat
      separately the case that $f(w(t_1)) = f^*$ at some finite $t_1$.
   b. **(3 pts)** Deduce that $w(t)$ converges to some $w_\infty$, that $f$ **attains**
      its infimum at $w_\infty$, and that for every $t \ge 0$

      $$\| w(t) - w_\infty \| \;\le\; e^{-\mu t} \sqrt{\frac{2\,(f(w_0) - f^*)}{\mu}} .$$

   c. **(2 pts)** Show that the bound of part (a) is attained with equality for some
      instance of part 1.

**Part Two.** A model with a *weight-normalized* last layer: fix a feature map
$\phi : \mathcal{X} \to \mathbb{R}^m$ and a training set $\{(x_n, y_n)\}_{n=1}^N$, and
for $v \in \mathbb{R}^m \setminus \{0\}$ and $g \in \mathbb{R}$ let

$$h_{v,g}(x) := g\, \frac{v^\top \phi(x)}{\|v\|}, \qquad
F(v, g) := \frac1N \sum_{n=1}^N \ell\big( h_{v,g}(x_n),\, y_n \big),$$

with $\ell$ continuously differentiable in its first argument. GF is run jointly over
$(v, g)$: $\dot v = -\nabla_v F(v, g)$, $\dot g = -\partial_g F(v, g)$, from
$v(0) \ne 0$ (assume the flow exists for all $t \ge 0$ with $v(t) \ne 0$).

4. **(7 pts)** Let $U \subseteq \mathbb{R}^m \setminus \{0\}$ be open with $cU = U$ for
   every $c > 0$, and let $q : U \to \mathbb{R}$ be continuously differentiable and
   *scale invariant*: $q(cu) = q(u)$ for all $u \in U$, $c > 0$. Prove that

   $$\nabla q(u)^\top u = 0 \qquad \text{and} \qquad \nabla q(cu) = \tfrac1c\, \nabla q(u)
   \qquad \text{for all } u \in U,\; c > 0 .$$

   Deduce that along the joint GF of Part Two, $\|v(t)\| = \|v(0)\|$ for every
   $t \ge 0$ (even though $g$ is trained too).

5. **(7 pts)** *Discrete steps and the failure of PL.*
   a. **(3 pts)** Gradient descent with step size $\eta > 0$ on Part Two's objective
      updates $v_{k+1} = v_k - \eta\, \nabla_v F(v_k, g_k)$. Prove that
      $\|v_{k+1}\|^2 = \|v_k\|^2 + \eta^2 \|\nabla_v F(v_k, g_k)\|^2$, so that, unlike
      under GF, the norm strictly grows at every step with a non-zero gradient.
   b. **(4 pts)** Let $q : \mathbb{R}^m \setminus \{0\} \to \mathbb{R}$ be continuously
      differentiable and scale invariant with $q^* := \inf q > -\infty$. Prove that if
      $q$ satisfies the PL inequality on $\mathbb{R}^m \setminus \{0\}$, i.e.
      $\|\nabla q(u)\|^2 \ge 2\mu (q(u) - q^*)$ for every $u \ne 0$ with some
      $\mu > 0$, then $q$ is constant. Conclude that, for each fixed $g$, the map
      $v \mapsto F(v, g)$ of Part Two satisfies the PL inequality on
      $\mathbb{R}^m \setminus \{0\}$ only if it is constant — so the linear-rate argument of
      part 2 can never be applied globally to the $v$-subproblem of a non-trivial
      weight-normalized objective.

---

## Question 3 (30 pts) — Generalization of quantized and approximately sparse linear predictors

Let $d \in \mathbb{N}$, $\mathcal{X} := \{ x \in \mathbb{R}^d : \|x\|_\infty \le 1 \}$, let
$\mathcal{Y}$ be a label space, $D$ an (unknown) distribution over
$\mathcal{X} \times \mathcal{Y}$, and $S = \{(x_n, y_n)\}_{n=1}^N$ a training set drawn
i.i.d. from $D$. The loss $\ell : \mathbb{R} \times \mathcal{Y} \to [0, 1]$ is bounded;
$L_D(h) := \mathbb{E}_{(x,y) \sim D}[\ell(h(x), y)]$ and
$L_S(h) := \frac1N \sum_{n=1}^N \ell(h(x_n), y_n)$. For $w \in \mathbb{R}^d$ write
$h_w(x) := w^\top x$ and $\|w\|_0 := |\{ i : w_i \ne 0 \}|$.

For a *precision* $p \in \mathbb{N}_0 = \{0, 1, 2, \dots\}$ let the grid be

$$G_p := \big\{ j\, 2^{-p} \;:\; j \in \mathbb{Z},\; |j| \le 2^p \big\} \subset [-1, 1],$$

and for a *sparsity level* $k \in \{0, 1, \dots, d\}$ let

$$\mathcal{H}_{k,p} := \big\{ h_w \;:\; w \in G_p^{\,d},\; \|w\|_0 \le k \big\}.$$

*Reminder (Hoeffding):* if $A_1, \dots, A_N$ are i.i.d. random variables bounded in
$[0,1]$, then for every $\epsilon \ge 0$,

$$P\Big( \Big| \tfrac1N \textstyle\sum_{n=1}^N A_n - \mathbb{E}[A_1] \Big| \ge \epsilon
\Big) \le 2 \exp(-2N\epsilon^2).$$

1. **(5 pts)** Prove that $|\mathcal{H}_{k,p}| \le \big( 1 + d\, 2^{p+1} \big)^k$.
   *Hint:* describe each admissible $w$ by a list of exactly $k$ "slots".

2. **(7 pts)** Prove — using only Hoeffding, not results from class — that for every
   fixed $(k, p)$ and every $\delta \in (0,1)$, with probability at least $1 - \delta$,

   $$\forall h \in \mathcal{H}_{k,p}: \quad L_D(h) - L_S(h) \;\le\;
   \sqrt{\frac{k \ln\!\big(1 + d\, 2^{p+1}\big) + \ln(2/\delta)}{2N}} .$$

3. **(8 pts)** *A bound over all sparsity levels and precisions at once.*
   a. **(4 pts)** Let $\pi : \{0, \dots, d\} \times \mathbb{N}_0 \to (0, 1]$ satisfy
      $\sum_{k,p} \pi(k,p) \le 1$. Prove that for every $\delta \in (0,1)$, with
      probability at least $1 - \delta$, simultaneously for all $(k, p)$ and all
      $h \in \mathcal{H}_{k,p}$:

      $$L_D(h) - L_S(h) \;\le\; \sqrt{\frac{\ln |\mathcal{H}_{k,p}| +
      \ln\!\big(2 / (\pi(k,p)\, \delta)\big)}{2N}} .$$

   b. **(4 pts)** Choose $\pi$ explicitly and derive an explicit
      $\Delta(N, \delta, k, p)$ such that: with probability at least $1 - \delta$,
      $L_D(h) - L_S(h) \le \Delta(N, \delta, k, p)$ for all $(k,p)$ and all
      $h \in \mathcal{H}_{k,p}$; $\Delta$ is strictly increasing in $k$ and in $p$; and
      $\Delta(N, \delta, k, p) \to 0$ as $N \to \infty$ for every fixed
      $(\delta, k, p)$. Prove all three properties.

4. **(10 pts)** *Approximately sparse learned predictors.* Training returns real weights
   $w_S \in [-1, 1]^d$ (not on any grid, typically with $\|w_S\|_0 = d$) that are only
   *approximately* sparse. For $w \in \mathbb{R}^d$ and $k \in \{0, \dots, d\}$ let

   $$\sigma_k(w) := \min_{u \in \mathbb{R}^d:\; \|u\|_0 \le k} \|w - u\|_1$$

   (the $\ell_1$ mass outside the $k$ largest-magnitude coordinates of $w$). Assume
   in addition that $\ell$ is $\rho$-Lipschitz in its first argument.
   a. **(2 pts)** Explain why the bound of part 3 says nothing useful about $h_{w_S}$.
   b. **(5 pts)** Prove that with probability at least $1 - \delta$, simultaneously for
      every $w \in [-1, 1]^d$, every $k \in \{0, \dots, d\}$ and every
      $p \in \mathbb{N}_0$,

      $$L_D(h_w) - L_S(h_w) \;\le\; \Delta(N, \delta, k, p) +
      2\rho \Big( \sigma_k(w) + k\, 2^{-(p+1)} \Big),$$

      with $\Delta$ from part 3(b).
   c. **(3 pts)** Suppose $w_S$ has $s \ge 1$ coordinates outside of which its entries
      have total absolute value at most $\eta \in (0, 1]$. Show that, on the same
      probability-$(1-\delta)$ event, with $p := \lceil \log_2(s/\eta) \rceil$,

      $$L_D(h_{w_S}) - L_S(h_{w_S}) \;\le\; \Delta(N, \delta, s, p) + 3\rho\eta ,$$

      explain why it is legitimate to pick $(s, p)$ **after** seeing $S$, and show that
      the first term depends on the ambient dimension $d$ only logarithmically.
