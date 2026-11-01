# FODL Mock Exam 4 (generated 2026-07-06) (Q1 replaced 2026-11-01)

**Format matches the real exam:** 3 hours · no aid material · 3 questions · 105 points
(max grade 100 — the 5 extra points are slack, as in recent years).
Every claim proved in class or recitation may be used if cited precisely; anything else
must be proved. Novel setups — variants of real exam patterns (2020–2024), not copies.

Solutions & grading rubric: `mock_exam_04_solutions.md` — **do not open before attempting.**

---

## Question 1 (40 pts) — Leaky-ReLU networks: exact representation, universality, and narrow deep nets

Throughout, inputs and outputs are scalars ($\mathcal{X} = \mathcal{Y} = \mathbb{R}$), a
constant $\alpha \in (0,1)$ is fixed, and

$$\sigma(z) := \max\{z,\ \alpha z\}$$

is the *leaky-ReLU* activation; $[z]_+ := \max\{0, z\}$ denotes the ReLU. For
$B \in \mathbb{N}$ let

$$\mathcal{H}_B := \Big\{\, x \mapsto c + \sum_{i=1}^{B} v_i\, \sigma(w_i x + b_i) \;:\;
w_i, b_i, v_i, c \in \mathbb{R} \,\Big\}$$

be the class of one-hidden-layer leaky-ReLU networks of width $B$. You may use freely that
$\mathcal{H}_B \subseteq \mathcal{H}_{B'}$ whenever $B \le B'$ (set the extra output weights
to $0$).

*Reminder (Lecture 2, Def. 1):* a continuous $g : \mathbb{R} \to \mathbb{R}$ is **piecewise
linear (PWL)** if there exist $-\infty =: c_0 < c_1 < \dots < c_{N-1} < c_N := \infty$ such
that $g$ is affine on every $[c_{j-1}, c_j]$; the **number of linear pieces** of $g$ is the
minimal such $N$. If $g$ has $p \ge 2$ pieces, a minimal partition has breakpoints
$t_1 < \dots < t_{p-1}$; write $s_0$ for the slope of $g$ on $(-\infty, t_1]$ and $s_i$ for
its slope on $[t_i, t_{i+1}]$, $i \in [p-1]$, with $t_p := \infty$. By minimality,
$s_i \ne s_{i-1}$ for every $i \in [p-1]$.

Distances are measured by $d(f_1, f_2) := \int_0^1 |f_1(x) - f_2(x)|\, dx$, and $\mathcal{F}$
denotes the set of continuous functions $\mathbb{R} \to \mathbb{R}$.

1. **(8 pts)** *Leaky-ReLU identities and the piece count.*

   a. **(3 pts)** Prove that for every $z \in \mathbb{R}$:

      $$\begin{aligned}
      \sigma(z) - \sigma(-z) &= (1+\alpha)\, z, \\
      \sigma(z) - \alpha z &= (1-\alpha)\, [z]_+, \\
      \sigma(z) + \sigma(-z) &= (1-\alpha)\, |z|.
      \end{aligned}$$

   b. **(5 pts)** Prove that every $h \in \mathcal{H}_B$ is PWL with at most $B + 1$ linear
      pieces.

2. **(10 pts)** *Exact representation with few neurons.*

   a. **(7 pts)** Let $f$ be PWL with $p \ge 2$ pieces (notation of the reminder). Prove
      that $f \in \mathcal{H}_p$, and that even $f \in \mathcal{H}_{p-1}$ whenever
      $s_0 = \alpha\, s_{p-1}$. Prove also that every affine function belongs to
      $\mathcal{H}_2$, and conclude, together with part 1b, that
      $\bigcup_{B \in \mathbb{N}} \mathcal{H}_B$ is **exactly** the set of PWL functions.
      You may use without proof the decomposition behind Prop. 1 of Lecture 2 (proved in
      Home Assignment 2): for every $x \in \mathbb{R}$,

      $$f(x) = f(t_1) + s_0\,(x - t_1) + \sum_{i=1}^{p-1} (s_i - s_{i-1})\, [x - t_i]_+ .$$

      *Hint:* part 1a turns each ReLU into one leaky neuron plus an affine term; collect
      all the affine terms and pay for them with a single extra neuron.

   b. **(3 pts)** Prove that every non-constant $h \in \mathcal{H}_1$ is PWL with exactly
      $2$ pieces, whose slopes $s_0, s_1$ are non-zero, have the same sign, and satisfy
      $s_0 = \alpha s_1$ or $s_1 = \alpha s_0$. Deduce that $[x]_+ \notin \mathcal{H}_1$ —
      so the width $p$ of part 2a cannot be lowered to $p - 1$ for every $f$ — although a
      single **ReLU** neuron computes $[x]_+$.

3. **(12 pts)** *Universality (Lecture 2, §1.3).*

   a. **(3 pts)** Define formally the expression: "the family
      $(\mathcal{H}_B)_{B \in \mathbb{N}}$ is $\mathcal{F}$-universal in the sense of
      $d(\cdot, \cdot)$."

   b. **(6 pts)** Prove that this universality holds. Do **not** cite Lemma 1 of
      Lecture 2 — prove the approximation step yourself; results of part 2 may be used.
      *Hint:* a continuous $f$ is uniformly continuous on $[0,1]$ (Heine–Cantor): for every
      $\epsilon > 0$ there is $\delta > 0$ such that $|f(x_1) - f(x_2)| < \epsilon$ for all
      $x_1, x_2 \in [0,1]$ with $|x_1 - x_2| < \delta$. Interpolate $f$ on a fine grid.

   c. **(3 pts)** *Width versus accuracy.* Assume moreover that $f$ is $K$-Lipschitz on
      $[0,1]$, i.e. $|f(x_1) - f(x_2)| \le K |x_1 - x_2|$ for all $x_1, x_2 \in [0,1]$.
      Prove that for every integer $n \ge 2$ there is $h \in \mathcal{H}_n$ with

      $$d(f, h) \le \frac{K}{3n},$$

      and deduce a width that guarantees $d(f, h) \le \epsilon$.

4. **(10 pts)** *Narrow deep networks are not universal.* For $L \in \mathbb{N}$ let
   $\mathcal{N}_L$ be the class of **width-1** leaky-ReLU networks with $L$ hidden layers:

   $$\mathcal{N}_L := \Big\{\, x \mapsto a_{L+1}\, z_L(x) + b_{L+1} \;:\;
   a_1, b_1, \dots, a_{L+1}, b_{L+1} \in \mathbb{R} \,\Big\},$$

   where $z_0(x) := x$ and $z_l(x) := \sigma\big(a_l\, z_{l-1}(x) + b_l\big)$ for
   $l \in [L]$. (In particular $\mathcal{N}_1 = \mathcal{H}_1$.)

   a. **(4 pts)** Prove that every $h \in \mathcal{N}_L$ is monotone on $\mathbb{R}$, i.e.
      non-decreasing or non-increasing.

   b. **(6 pts)** Let $f(x) := |2x - 1|$. Prove that for every $L \in \mathbb{N}$ and every
      $h \in \mathcal{N}_L$:

      $$d(f, h) \ge \frac18 .$$

      Conclude that $\bigcup_{L \in \mathbb{N}} \mathcal{N}_L$ is **not** $\mathcal{F}$-universal
      in the sense of $d(\cdot,\cdot)$, however deep the networks — whereas
      $f \in \mathcal{H}_2$ (show this). In one sentence: what does this say about trading
      width for depth?
      *Hint:* for a non-decreasing $h$, compare the errors at $x$ and at $x + \frac14$ for
      $x \in [0, \frac14]$.

---

## Question 2 (35 pts) — Gradient flow on a single ReLU neuron

Let $D, N \in \mathbb{N}$ and let $\{(x_n, y_n)\}_{n=1}^{N} \subset \mathbb{R}^D
\times \mathbb{R}$ be a training set. Consider a network consisting of a single ReLU
neuron,

$$h_{w,v}(x) := v\, \big[ w^\top x \big]_+, \qquad w \in \mathbb{R}^D,\;
v \in \mathbb{R},$$

where $[z]_+ := \max\{z, 0\}$, and the squared-loss objective

$$\mathcal{L}(w, v) := \frac{1}{2} \sum_{n=1}^{N}
\big( v\,[w^\top x_n]_+ - y_n \big)^2 .$$

Gradient flow is run over $\mathcal{L}$:
$\;\dot w(t) = -\nabla_w \mathcal{L}(w(t), v(t))$,
$\;\dot v(t) = -\frac{\partial}{\partial v} \mathcal{L}(w(t), v(t))$.
Throughout, use the convention $\frac{d}{dz}[z]_+ := \mathbb{1}[z > 0]$ (so the
derivative at $z = 0$ is $0$); as in class, you may assume the flow exists, is
unique and differentiable, and that the non-differentiability of the ReLU does not
"disturb". Denote the residuals $r_n(t) := v(t)\,[w(t)^\top x_n]_+ - y_n$.

1. **(8 pts)** Derive the gradient flow equations: prove that

   $$\dot v(t) = -\sum_{n=1}^{N} r_n(t)\, \big[ w(t)^\top x_n \big]_+ ,
   \qquad
   \dot w(t) = -\, v(t) \sum_{n=1}^{N} r_n(t)\,
   \mathbb{1}\big[ w(t)^\top x_n > 0 \big]\, x_n .$$

2. **(9 pts)** *Balancedness.* Prove that along the flow

   $$\frac{d}{dt} \Big( v(t)^2 - \| w(t) \|^2 \Big) = 0 .$$

   *Hint:* $z \cdot \mathbb{1}[z > 0] = [z]_+$ for every $z \in \mathbb{R}$.

3. **(8 pts)** *Sign preservation.* Assume $v(0)^2 > \|w(0)\|^2$. Prove that
   $v(t) \neq 0$ for every $t \ge 0$, and that $v(t)$ has the same sign as $v(0)$
   for every $t \ge 0$. (Justify carefully why $v(t)^2$ is bounded away from zero —
   note that only the *difference* $v^2 - \|w\|^2$ is conserved, not $v^2$ itself.)

4. **(10 pts)** *An unreachable infimum.* Set $D = 1$, $N = 1$ and
   $(x_1, y_1) = (1, -1)$, i.e.

   $$\mathcal{L}(w, v) = \tfrac{1}{2} \big( v\,[w]_+ + 1 \big)^2, \qquad
   w, v \in \mathbb{R}.$$

   (i) Show that $\inf_{w,v} \mathcal{L}(w, v) = 0$ and that the infimum is
   attained (exhibit a global minimizer; note its $v$ is negative).
   (ii) Assume the initialization satisfies $v(0) > |w(0)|$. Prove that

   $$\forall t \ge 0: \quad \mathcal{L}\big(w(t), v(t)\big) \;\ge\; \tfrac{1}{2}.$$

   (iii) Conclude that gradient flow over ReLU networks does **not** always converge
   to the global infimum of the loss, and contrast this in one sentence with the
   convergence guarantee proved in class for gradient flow over *linear* neural
   networks (Lecture 4).
   *Hint:* use part 3.

---

## Question 3 (30 pts) — PAC-Bayes with Gaussian priors and posteriors

Let $\mathcal{X}$ be an input space and $\mathcal{Y}$ an output space, let $D$ be an
(unknown) distribution over $\mathcal{X} \times \mathcal{Y}$, and let
$S = \{(x_n, y_n)\}_{n=1}^{N}$ be a training set of $N \ge 2$ examples drawn i.i.d.
from $D$. Hypotheses are parametrized by $\theta \in \mathbb{R}^d$:
$\mathcal{H} = \{ h_\theta : \theta \in \mathbb{R}^d \}$ (an arbitrary architecture),
and distributions over $\mathcal{H}$ are identified with distributions over
$\mathbb{R}^d$. The loss $\ell : \mathcal{Y} \times \mathcal{Y} \to [0, 1]$ is
bounded; $L_D(h) := \mathbb{E}_{(x,y) \sim D}[\ell(h(x), y)]$ and
$L_S(h) := \frac{1}{N} \sum_{n=1}^N \ell(h(x_n), y_n)$. For a distribution $Q$ over
$\mathbb{R}^d$ write $L_D(Q) := \mathbb{E}_{\theta \sim Q}[L_D(h_\theta)]$ and
$L_S(Q) := \mathbb{E}_{\theta \sim Q}[L_S(h_\theta)]$.

*Reminder (PAC-Bayes bound, as proved in class):* let $P$ be a prior distribution
over $\mathcal{H}$, **chosen independently of the sample $S$**, and let
$\delta \in (0,1)$. Then with probability at least $1 - \delta$ over $S$,
simultaneously for **every** distribution $Q$ over $\mathcal{H}$ (including
$S$-dependent ones):

$$L_D(Q) - L_S(Q) \;\le\; \sqrt{\frac{KL(Q \| P) + \ln\!\big(\frac{2N}{\delta}\big)}
{2(N-1)}} .$$

*Reminder (Gaussians and KL):* $N(\mu, \sigma^2 I_d)$ has density
$p(\theta) = (2\pi\sigma^2)^{-d/2} \exp\!\big( -\|\theta - \mu\|^2 / (2\sigma^2)
\big)$, and $KL(Q \| P) := \mathbb{E}_{\theta \sim Q}\big[ \ln \frac{q(\theta)}
{p(\theta)} \big]$ for densities $q, p$ of $Q, P$.

1. **(8 pts)** Prove that for every $w \in \mathbb{R}^d$ and $\sigma^2 > 0$:

   $$KL\Big( N(w, \sigma^2 I_d) \,\Big\|\, N(0, \sigma^2 I_d) \Big) \;=\;
   \frac{\|w\|^2}{2\sigma^2} .$$

2. **(7 pts)** Fix $\sigma^2 > 0$ and the prior $P := N(0, \sigma^2 I_d)$ *before*
   seeing the data, train on $S$, and let $w_S \in \mathbb{R}^d$ denote the learned
   weights. Derive: with probability at least $1 - \delta$ over $S$, for **every**
   $w \in \mathbb{R}^d$ — in particular for $w = w_S$ —

   $$L_D\big( N(w, \sigma^2 I_d) \big) \;\le\;
   L_S\big( N(w, \sigma^2 I_d) \big) +
   \sqrt{\frac{\frac{\|w\|^2}{2\sigma^2} + \ln\!\big(\frac{2N}{\delta}\big)}
   {2(N-1)}} .$$

   Explain in one or two sentences (i) why it is legitimate that $w_S$ depends on
   $S$, and (ii) to which predictor the guarantee applies (is it $h_{w_S}$ itself?).

3. **(10 pts)** A friend proposes the shortcut $P := N(w_S, \sigma^2 I_d)$ and
   $Q := N(w_S, \sigma^2 I_d)$, so that $KL(Q \| P) = 0$ and the reminder "yields"
   the bound $L_D(Q) - L_S(Q) \le \sqrt{\ln(2N/\delta) / (2(N-1))}$ — tiny for large
   $N$, with no dependence on $\|w_S\|$ whatsoever.

   a. **(5 pts)** Explain precisely why this is invalid: name the hypothesis of the
      theorem that is violated, and identify which step of the proof given in class
      breaks when $P$ depends on $S$ (state what that step needs and why it fails).

   b. **(5 pts)** The legitimate way to *adapt the prior's scale* to the data: fix
      $\sigma_0^2 > 0$ and, for every $j \in \mathbb{N}_0 = \{0, 1, 2, \dots\}$, set
      $P_j := N(0,\, 2^j \sigma_0^2\, I_d)$ and $\delta_j := \delta \cdot 2^{-(j+1)}$.
      Prove: with probability at least $1 - \delta$ over $S$, simultaneously for
      every $j \in \mathbb{N}_0$ and every distribution $Q$,

      $$L_D(Q) - L_S(Q) \;\le\; \sqrt{\frac{KL(Q \| P_j) +
      \ln\!\big(\frac{2N}{\delta}\big) + (j+1)\ln 2}{2(N-1)}} ,$$

      and write the resulting bound for $Q_j := N(w_S,\, 2^j \sigma_0^2\, I_d)$
      (using part 1), noting that $j$ may now be chosen *after* seeing the data.

4. **(5 pts)** In at most four sentences, explain why the bound of part 2 favors
   solutions lying at **flat minima** and having **low parameter norm**, and connect
   this to the discussion from class on which properties of trained networks a
   meaningful generalization bound should depend.
