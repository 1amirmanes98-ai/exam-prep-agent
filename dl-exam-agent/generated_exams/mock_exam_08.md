# FODL Mock Exam 8 (generated 2026-10-28) (Q1 replaced 2026-11-01)

**Format matches the real exam:** 3 hours · no aid material · 3 questions · 105 points
(max grade 100 — the 5 extra points are slack, as in recent years).
Every claim proved in class or recitation may be used if cited precisely; anything else
must be proved. Novel setups — variants of recent real exam patterns (2023–2024), not copies.

Solutions & grading rubric: `mock_exam_08_solutions.md` — **do not open before attempting.**

---

## Question 1 (40 pts) — Deep versus shallow tensor decompositions: Kronecker ranks and pooling geometry

Notation as in class (Lecture 2, §2): $\otimes$ is the outer (tensor) product and $\odot$ is
the Kronecker product. Let $M \in \mathbb{N}_{\ge 2}$ and $N = 2^L$ with $L \in \mathbb{N}_{\ge 2}$
(so $N \ge 4$). A function $f : [M]^N \to \mathbb{R}$ is identified with the order-$N$ tensor
$\mathcal{A}_f$ defined by $(\mathcal{A}_f)_{d_1, \dots, d_N} := f(d_1, \dots, d_N)$. For
$I \subseteq [N]$, $[\![\mathcal{A}]\!]_I$ is the matricization of $\mathcal{A}$ (modes in $I$
index the rows), and $[\![\mathcal{A}]\!]$ is the canonical matricization, i.e.
$[\![\mathcal{A}]\!]_{I_{odd}}$ with $I_{odd} := \{1, 3, \dots, N-1\}$. Put
$I_{half} := \{1, 2, \dots, N/2\}$. The separation rank of $f$ w.r.t. $I$ is

$$\mathrm{sep}(f; I) := \min \Big\{ R \in \mathbb{N} \cup \{0\} :
f(d_1, \dots, d_N) = \sum_{\nu=1}^{R} g_\nu\big((d_i)_{i \in I}\big)\,
\bar g_\nu\big((d_i)_{i \notin I}\big) \Big\},$$

the minimum over all functions $g_\nu, \bar g_\nu$ (an empty sum is the zero function).

**The two networks.** The *shallow* network of width $Z$ (global product pooling) realizes
exactly the CP tensors

$$\mathcal{A} = \sum_{z=1}^{Z} a_z \cdot \mathbf{a}^{z,1} \otimes \mathbf{a}^{z,2} \otimes \cdots
\otimes \mathbf{a}^{z,N}$$

with $a_z \in \mathbb{R}$ and $\mathbf{a}^{z,i} \in \mathbb{R}^M$.

The *deep* network with hidden widths $r_0, \dots, r_{L-1}$ (size-2 product pooling over the
pairs $\{2j-1, 2j\}$, as in class) realizes exactly the tensors of the Hierarchical Tucker (HT)
recursion (Lecture 2, Prop 4):

$$\Phi^{1,j,\gamma} = \sum_{\alpha=1}^{r_0} a^{1,j,\gamma}_\alpha \cdot \mathbf{a}^{0,2j-1,\alpha} \otimes \mathbf{a}^{0,2j,\alpha}$$

for $j \in [N/2]$ and $\gamma \in [r_1]$; then, for $l \in \{2, \dots, L-1\}$ (no such $l$
when $L = 2$), $j \in [N/2^l]$ and $\gamma \in [r_l]$,

$$\Phi^{l,j,\gamma} = \sum_{\alpha=1}^{r_{l-1}} a^{l,j,\gamma}_\alpha \cdot \Phi^{l-1,2j-1,\alpha} \otimes \Phi^{l-1,2j,\alpha};$$

and finally

$$\mathcal{A} = \sum_{\alpha=1}^{r_{L-1}} a^{L}_\alpha \cdot \Phi^{L-1,1,\alpha} \otimes \Phi^{L-1,2,\alpha},$$

with $\mathbf{a}^{0,i,\alpha} \in \mathbb{R}^M$, $\mathbf{a}^{l,j,\gamma} \in \mathbb{R}^{r_{l-1}}$
and $\mathbf{a}^{L} \in \mathbb{R}^{r_{L-1}}$. Each $\Phi^{l,j,\gamma}$ has order $2^l$.

**You may use without proof:** linearity of matricization; Lemma 3 of class,

$$[\![\mathcal{T} \otimes \bar{\mathcal{T}}]\!]_I =
[\![\mathcal{T}]\!]_{I \cap [n]} \odot [\![\bar{\mathcal{T}}]\!]_{(I - n) \cap [\bar n]}$$

for tensors of orders $n, \bar n$ (in particular
$[\![\mathcal{T} \otimes \bar{\mathcal{T}}]\!] = [\![\mathcal{T}]\!] \odot [\![\bar{\mathcal{T}}]\!]$
when $n, \bar n$ are even); Prop 7 of class, $\mathrm{sep}(f; I) = \mathrm{rank}\,[\![\mathcal{A}_f]\!]_I$;
the mixed-product property $(A \odot B)(C \odot D) = (AC) \odot (BD)$; $I_m \odot I_n = I_{mn}$;
$\mathrm{rank}(X + Y) \le \mathrm{rank}\,X + \mathrm{rank}\,Y$; and the *rank normal form*: if
$A \in \mathbb{R}^{m_1 \times m_2}$ has rank $r$, there are invertible $P, Q$ with
$PAQ = J_r$, where $J_r \in \mathbb{R}^{m_1 \times m_2}$ has $(J_r)_{i,i} = 1$ for $i \in [r]$
and all other entries $0$. **Do not** quote Lemma 2 (rank multiplicativity) — part 1 asks
you to prove it.

Throughout, fix $G \in \mathbb{R}^{M \times M}$ with $\rho := \mathrm{rank}\,G \ge 1$, and define

$$f_G(d_1, \dots, d_N) := \prod_{j=1}^{N/2} G_{d_{2j-1},\, d_{2j}},$$

i.e. ($G$ viewed as an order-2 tensor)

$$\mathcal{A}_{f_G} = \underbrace{G \otimes G \otimes \cdots \otimes G}_{N/2 \text{ factors}}.$$

For example, $G = I_M$ gives
$f_{I_M}(d) = \prod_j \mathbb{1}[d_{2j-1} = d_{2j}]$.

1. **(7 pts)** *Kronecker rank.* Prove that for all $A \in \mathbb{R}^{m_1 \times m_2}$ and
   $B \in \mathbb{R}^{n_1 \times n_2}$

   $$\mathrm{rank}(A \odot B) = \mathrm{rank}(A) \cdot \mathrm{rank}(B).$$

   *Hint:* reduce to $J_r \odot J_s$, and show that its nonzero entries lie in distinct rows
   and distinct columns.

2. **(8 pts)** *Separation ranks of $f_G$.* You may use part 1.

   a. **(5 pts)** Prove that
      $[\![\mathcal{A}_{f_G}]\!] = G \odot G \odot \cdots \odot G$ ($N/2$ factors), and deduce
      that $\mathrm{sep}(f_G; I_{odd}) = \rho^{N/2}$.

   b. **(3 pts)** Prove that $\mathrm{sep}(f_G; I_{half}) = 1$.

3. **(8 pts)** *A small deep network.* Write $G = \sum_{\alpha=1}^{\rho} \mathbf{u}^\alpha (\mathbf{v}^\alpha)^\top$
   with $\mathbf{u}^\alpha, \mathbf{v}^\alpha \in \mathbb{R}^M$ (possible since
   $\mathrm{rank}\,G = \rho$). Give an explicit assignment of the deep network with all hidden
   widths equal to $\rho$ that realizes $f_G$, and prove that it does (induction over the
   levels of the HT recursion).

4. **(9 pts)** *The shallow network needs exactly $\rho^{N/2}$.* You may use that
   $\mathrm{rank}\,[\![\mathcal{A}_{f_G}]\!] = \rho^{N/2}$ (part 2a) and part 1.

   a. **(5 pts)** Prove that every tensor $\mathcal{A}$ realized by the shallow network of width
      $Z$ satisfies $\mathrm{rank}\,[\![\mathcal{A}]\!] \le Z$. Deduce that the shallow network
      realizes $f_G$ only if $Z \ge \rho^{N/2}$.

   b. **(4 pts)** Give an explicit assignment of the shallow network of width $Z = \rho^{N/2}$
      that realizes $f_G$, and prove it. Conclude, together with part 3, that for $\rho \ge 2$
      the deep network realizes $f_G$ with width $\rho \le M$ while the shallow network needs
      width exponential in $N$.

5. **(8 pts)** *Pooling geometry.* Let $P : [M]^N \to \mathbb{R}$ be the *palindrome*
   indicator

   $$P(d_1, \dots, d_N) := \prod_{i=1}^{N/2} \mathbb{1}\big[d_i = d_{N+1-i}\big].$$

   a. **(5 pts)** Prove that every tensor $\mathcal{A}$ realized by the deep network satisfies
      $\mathrm{rank}\,[\![\mathcal{A}]\!]_{I_{half}} \le r_{L-1}$. Compute
      $\mathrm{sep}(P; I_{half})$, and deduce that the deep network realizes $P$ only if
      $r_{L-1} \ge M^{N/2}$.

   b. **(3 pts)** Find a permutation $\pi$ of $[N]$ such that
      $P(d_1, \dots, d_N) = f_{I_M}(d_{\pi(1)}, \dots, d_{\pi(N)})$ for all
      $d \in [M]^N$. Deduce that the deep network with the *re-ordered pooling geometry* (the
      same network fed with $(d_{\pi(1)}, \dots, d_{\pi(N)})$) realizes $P$ with all hidden
      widths equal to $M$, and explain in one sentence what this says about the inductive bias
      set by the pooling geometry.

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
