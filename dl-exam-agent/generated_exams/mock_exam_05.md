# FODL Mock Exam 5 (generated 2026-10-28)

**Format matches the real exam:** 3 hours · no aid material · 3 questions · 105 points
(max grade 100 — the 5 extra points are slack, as in recent years).
Every claim proved in class or recitation may be used if cited precisely; anything else
must be proved. Novel setups — variants of recent real exam patterns (2023–2024), not copies.

Solutions & grading rubric: `mock_exam_05_solutions.md` — **do not open before attempting.**

---

## Question 1 (40 pts) — Deep squaring networks: Chebyshev depth separation and (non-)universality

Throughout, inputs and outputs are scalars, $\mathcal{X} = \mathcal{Y} = \mathbb{R}$, and
$\sigma(u) := u^2$ is the *squaring activation*, applied entry-wise to vectors. For two
functions $f_1, f_2 : \mathbb{R} \to \mathbb{R}$ define

$$dist(f_1, f_2) := \sup_{x \in [-1, 1]} |f_1(x) - f_2(x)| .$$

*Deep squaring networks.* For a depth $L \in \mathbb{N}$, the class $\mathcal{N}_L$
consists of all functions $h : \mathbb{R} \to \mathbb{R}$ of the form

$$z^{(0)} := x, \qquad z^{(l)} := \sigma\big( W_l\, z^{(l-1)} + b_l \big) \in \mathbb{R}^4
\;\; (l = 1, \dots, L), \qquad h(x) := a^\top z^{(L)} + c,$$

with weights $W_1 \in \mathbb{R}^{4 \times 1}$, $W_l \in \mathbb{R}^{4 \times 4}$ for
$l \ge 2$, biases $b_l \in \mathbb{R}^4$, and output weights $a \in \mathbb{R}^4$,
$c \in \mathbb{R}$ (width $4$; in total $20L - 7$ parameters).

*Polynomial-feature networks.* For $B \in \mathbb{N}_0$ let

$$\mathcal{P}_B := \Big\{\, h(x) = \sum_{j=0}^{B} \alpha_j x^j \;:\; \alpha_0, \dots,
\alpha_B \in \mathbb{R} \,\Big\}$$

(a linear layer on top of the $B+1$ fixed features $1, x, \dots, x^B$), i.e. the
polynomials of degree at most $B$.

*Reminders (may be used without proof).* **(Weierstrass)** for every continuous
$f : [-1,1] \to \mathbb{R}$ and every $\epsilon > 0$ there is a polynomial $p$ with
$\sup_{x \in [-1,1]} |f(x) - p(x)| < \epsilon$. **(Chebyshev)** for every $n \in \mathbb{N}$
there is a polynomial $T_n$ of degree exactly $n$ such that
$T_n(\cos\theta) = \cos(n\theta)$ for all $\theta \in \mathbb{R}$; e.g. $T_1(x) = x$,
$T_2(x) = 2x^2 - 1$.

1. **(5 pts)** Write formally the definition of the expression: "the family
   $(\mathcal{N}_L)_{L \in \mathbb{N}}$ is *exponentially expressively efficient* with
   respect to $(\mathcal{P}_B)_{B \in \mathbb{N}_0}$, in the inapproximability sense with
   respect to $dist(\cdot,\cdot)$." Both conditions of the course definition must appear,
   with explicit quantifiers.

2. **(6 pts)** Prove that every $h \in \mathcal{N}_L$ is a polynomial of degree at most
   $2^L$, i.e. $\mathcal{N}_L \subseteq \mathcal{P}_{2^L}$.

3. **(10 pts)** *Horner in a squaring network.* Prove that for every $B \in \mathbb{N}$,
   $\mathcal{P}_B \subseteq \mathcal{N}_B$ (and $\mathcal{P}_0 \subseteq \mathcal{N}_1$).
   Conclude that the family $(\mathcal{N}_L)_{L \in \mathbb{N}}$ is universal in the sense
   of $dist(\cdot,\cdot)$ with respect to the class of continuous functions on $[-1,1]$
   (state the definition you are verifying).
   *Hint:* $\;r\,x = \tfrac14\big[ (r+x)^2 - (r-x)^2 \big]$, and the network must also
   "carry" $x$ itself from layer to layer.

4. **(12 pts)** *A depth-$L$ witness.* Let $\bar h_L := T_2 \circ T_2 \circ \cdots \circ T_2$
   ($L$-fold composition).

   a. **(4 pts)** Prove that $\bar h_L \in \mathcal{N}_L$ and that
      $\bar h_L(\cos\theta) = \cos(2^L \theta)$ for every $\theta \in \mathbb{R}$.

   b. **(6 pts)** Prove that for every $n \in \mathbb{N}$ and every polynomial $p$ of
      degree at most $n - 1$:

      $$dist(T_n, p) \;\ge\; 1,$$

      and that equality is attained (so $\inf_{p \in \mathcal{P}_{n-1}} dist(T_n, p) = 1$).
      *Hint:* evaluate at $x_k := \cos(k\pi / n)$, $k = 0, 1, \dots, n$.

   c. **(2 pts)** Conclude, using parts 3–4, that the family $(\mathcal{N}_L)_L$ is
      exponentially expressively efficient with respect to $(\mathcal{P}_B)_B$ in the
      inapproximability sense of part 1. Compare the numbers of parameters.

5. **(7 pts)** *Two ways to lose universality.*

   a. **(2 pts)** Prove that for every **fixed** $L \in \mathbb{N}$, the single class
      $\mathcal{N}_L$ is not universal: exhibit a continuous $f$ with
      $dist(f, h) \ge 1$ for every $h \in \mathcal{N}_L$.

   b. **(5 pts)** Let $\mathcal{N}^0_L \subseteq \mathcal{N}_L$ be the *bias-free*
      sub-class, in which $b_1 = \cdots = b_L = 0$ (the output bias $c$ is kept). Prove
      that every $h \in \mathcal{N}^0_L$ has the form $h(x) = \gamma\, x^{2^L} + c$ for some
      $\gamma \in \mathbb{R}$, and deduce that $(\mathcal{N}^0_L)_{L \in \mathbb{N}}$ is
      **not** universal with respect to the continuous functions on $[-1,1]$ — not even
      with unbounded depth: show that $dist(f, h) \ge 1$ for $f(x) = x$ and every
      $h \in \bigcup_{L} \mathcal{N}^0_L$.

---

## Question 2 (35 pts) — Gradient flow on a difference-of-squares (diagonal) reparameterization

Let $X \in \mathbb{R}^{N \times d}$ and $y \in \mathbb{R}^N$, and consider linear regression
with the squared loss $L(w) := \frac12 \|X w - y\|^2$, $w \in \mathbb{R}^d$. Instead of
optimizing over $w$ directly, we write the predictor as a *difference of Hadamard
squares* (a depth-2 diagonal linear network with a "positive" and a "negative" branch):

$$\phi(u, v) := L\big( u \odot u - v \odot v \big), \qquad u, v \in \mathbb{R}^d ,$$

where $\odot$ is the entry-wise (Hadamard) product. Gradient flow is run over $\phi$:
$\dot u(t) = -\nabla_u \phi(u(t), v(t))$, $\dot v(t) = -\nabla_v \phi(u(t), v(t))$, from
some initialization $(u(0), v(0))$. Denote

$$w(t) := u(t) \odot u(t) - v(t) \odot v(t), \qquad r(t) := X w(t) - y, \qquad
g(t) := \nabla L(w(t)) = X^\top r(t).$$

You may assume the flow exists, is unique and is defined for all $t \ge 0$. Functions of
vectors such as $\sqrt{\cdot}$, $\sinh$, $\operatorname{arcsinh}$ act entry-wise.

1. **(5 pts)** Prove that $\nabla_u \phi(u, v) = 2\, u \odot \nabla L(w)$ and
   $\nabla_v \phi(u, v) = -2\, v \odot \nabla L(w)$, so that the flow reads
   $\dot u = -2\, u \odot g$, $\;\dot v = 2\, v \odot g$.

2. **(7 pts)** *Conservation and closed form.*
   (i) Prove that $u_i(t)\, v_i(t) = u_i(0)\, v_i(0)$ for every $i \in [d]$ and $t \ge 0$.
   (ii) With $G(t) := \int_0^t g(s)\, ds \in \mathbb{R}^d$, prove that

   $$u(t) = u(0) \odot e^{-2G(t)}, \qquad v(t) = v(0) \odot e^{2G(t)} .$$

   (iii) Deduce that every entry of $u(t)$ and of $v(t)$ keeps the sign it had at $t = 0$
   (zero entries stay zero). In particular, if $v(0) = 0$ then $w(t) \ge 0$ entry-wise
   for all $t$; explain in one sentence why the model uses the difference
   $u \odot u - v \odot v$ rather than $u \odot u$ alone.

3. **(6 pts)** From now on $u(0) = v(0) = \alpha \mathbf{1}$ for a scalar $\alpha > 0$
   (so $w(0) = 0$). Prove that

   $$\dot w(t) = -4\, \sqrt{w(t) \odot w(t) + 4\alpha^4 \mathbf{1}} \;\odot\; \nabla L(w(t)) .$$

4. **(6 pts)** *Convergence.* Assume $X$ has full row rank and let
   $\lambda_0 := \lambda_{\min}(X X^\top) > 0$. Prove that for every $t \ge 0$

   $$L(w(t)) \;\le\; \tfrac12 \|y\|^2\, e^{-16 \alpha^2 \lambda_0 t} .$$

   In one sentence: what does this rate say about small initialization?

5. **(11 pts)** *Implicit bias.* Keep the assumptions of parts 3–4.

   a. **(4 pts)** Let $q(t) := \operatorname{arcsinh}\big( w(t) / (2\alpha^2) \big)$. Prove
      that $\dot q(t) = -4 X^\top r(t)$, hence $q(t) = X^\top \mu(t)$ with
      $\mu(t) := -4 \int_0^t r(s)\, ds$. Using part 4, prove that $\mu(t)$ converges as
      $t \to \infty$, and deduce that $w(t) \to w_\infty$ for some $w_\infty$ satisfying

      $$X w_\infty = y \qquad \text{and} \qquad
      \operatorname{arcsinh}\big( w_\infty / (2\alpha^2) \big) \in
      \operatorname{range}(X^\top) .$$

   b. **(3 pts)** Let

      $$\Psi_\alpha(w) := \sum_{i=1}^d \Big[ w_i \operatorname{arcsinh}\Big(
      \frac{w_i}{2\alpha^2} \Big) - \sqrt{w_i^2 + 4\alpha^4} \Big] .$$

      Prove that $w_\infty$ is the **unique** minimizer of $\Psi_\alpha$ over
      $\{ w \in \mathbb{R}^d : X w = y \}$.

   c. **(4 pts)** Take $d = 2$, $N = 1$, $X = (1 \;\; 2)$, $y = 2$. Prove that

      $$w_\infty = \frac{1}{1 + 4\cosh\mu} \begin{pmatrix} 2 \\ 4\cosh\mu \end{pmatrix}$$

      where $\mu > 0$ is the unique solution of $\sinh\mu\, (1 + 4\cosh\mu) = \alpha^{-2}$.
      Compute $\lim_{\alpha \to 0^+} w_\infty$ and $\lim_{\alpha \to \infty} w_\infty$, and
      identify each limit as the minimum-$\ell_1$-norm or the minimum-$\ell_2$-norm
      interpolator (prove the identification).

---

## Question 3 (30 pts) — Bit-counting with data-chosen width and precision

Let $\mathcal{X} = \mathbb{R}^D$, $\mathcal{Y} = \{0, 1\}$, let $\ell(\hat y, y) :=
\mathbb{1}[\hat y \ne y]$ be the zero-one loss, let $D$ be an (unknown) distribution over
$\mathcal{X} \times \mathcal{Y}$ and $S = \{(x_n, y_n)\}_{n=1}^N$ a training set of $N$
examples drawn i.i.d. from $D$. As usual $L_D(h) := \mathbb{E}_{(x,y) \sim D}[\ell(h(x), y)]$
and $L_S(h) := \frac1N \sum_{n=1}^N \ell(h(x_n), y_n)$.

Fix, *before seeing data*, a sequence of architectures: for every $P \in \mathbb{N}$, a map
$\theta \mapsto h^{(P)}_\theta$ from $\mathbb{R}^P$ to (measurable) classifiers
$\mathcal{X} \to \{0, 1\}$ — a network with $P$ parameters. Fix also, for every
$k \in \mathbb{N}$, a set $Q_k \subset \mathbb{R}$ of exactly $2^k$ numbers (the values
representable with $k$ bits). For $P, k \in \mathbb{N}$ define the class of $P$-parameter
networks quantized to $k$ bits per parameter:

$$\mathcal{H}_{P,k} := \big\{ h^{(P)}_\theta \;:\; \theta \in Q_k^P \big\} .$$

*Reminder (Hoeffding).* If $A_1, \dots, A_N$ are i.i.d. random variables in $[0,1]$, then
for every $\epsilon \ge 0$:

$$P\Big( \Big| \frac1N \sum_{n=1}^N A_n - \mathbb{E}[A_1] \Big| \ge \epsilon \Big) \le
2 e^{-2N\epsilon^2} .$$

1. **(7 pts)** Prove that $|\mathcal{H}_{P,k}| \le 2^{Pk}$ and that, for fixed $P, k$ and
   every $\delta \in (0,1)$, with probability at least $1 - \delta$:

   $$\forall h \in \mathcal{H}_{P,k}: \quad L_D(h) - L_S(h) \;\le\;
   \sqrt{\frac{Pk \ln 2 + \ln(2/\delta)}{2N}} .$$

   Do not rely on bounds proved in class here — only on the Hoeffding reminder.

2. **(8 pts)** In practice both the size $P$ and the precision $k$ are chosen *after*
   training (e.g. by pruning and quantizing). Derive an explicit expression
   $\Delta(N, \delta, P, k)$ such that:
   (a) for every $\delta \in (0,1)$, with probability at least $1 - \delta$,
   simultaneously for all $P, k \in \mathbb{N}$ and all $h \in \mathcal{H}_{P,k}$:
   $L_D(h) - L_S(h) \le \Delta(N, \delta, P, k)$;
   (b) $\Delta$ is strictly increasing in $P$ and in $k$;
   (c) $\lim_{N \to \infty} \Delta(N, \delta, P, k) = 0$ for all fixed $P, k, \delta$.
   Explain in one sentence why (a) legitimizes choosing $(P, k)$ from the data.

3. **(5 pts)** Suppose that for some $P, k$ there exist $N$ distinct inputs
   $x_1, \dots, x_N$ such that **every** labeling $(y_1, \dots, y_N) \in \{0,1\}^N$ is
   realized by some $h \in \mathcal{H}_{P,k}$. Prove that $Pk \ge N$ and deduce that your
   $\Delta(N, \delta, P, k)$ from part 2 exceeds $\sqrt{\ln 2 / 2} \approx 0.589$. Why is
   this useless for a hypothesis with $L_S(h) = 0$?

4. **(6 pts)** Assume now that $\mathcal{H}_{P,k}$ fits every labeling of **every** $N$
   distinct inputs, and let $\hat h_S$ be the output of any ERM rule over
   $\mathcal{H}_{P,k}$. Let $D^{\mathrm{rand}}$ be the distribution in which
   $x \sim \mathrm{Uniform}([0,1]^D)$ and, independently, $y \sim \mathrm{Bernoulli}(1/2)$.
   (i) Prove that $L_{D^{\mathrm{rand}}}(h) = \frac12$ for every classifier $h$, and that
   $L_S(\hat h_S) = 0$ with probability $1$ when $S \sim (D^{\mathrm{rand}})^N$.
   (ii) Let $\Delta'(N, \delta, P, k)$ be **any** quantity, depending only on
   $N, \delta, P, k$, such that for **every** distribution $D$, with probability at least
   $1 - \delta$: $L_D(\hat h_S) - L_S(\hat h_S) \le \Delta'(N, \delta, P, k)$. Prove that
   $\Delta' \ge \frac12$. What does this say about bounds of the type derived in
   parts 1–2, and what must a meaningful bound depend on (as discussed in class)?

5. **(4 pts)** *Numbers.* Use $\ln 2 \approx 0.693$, $\ln 40 \approx 3.689$, and the
   fixed-$(P,k)$ bound of part 1 (i.e. even *ignoring* the price paid in part 2 for
   choosing $P, k$ from the data), with $\delta = 0.05$ and $N = 5 \cdot 10^4$
   (CIFAR-10 size). (i) Evaluate the bound for a network with $P = 10^6$ parameters
   quantized to $k = 1$ bit each, and say whether it is informative. (ii) Find the
   largest $P$ for which $k = 1$ gives a bound $\le 0.1$, and compare it with $N$.
