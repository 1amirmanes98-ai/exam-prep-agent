# FODL Exam — Moed B 2024
**Date / semester:** 10.09.2024 — Semester B 2023/24 (תשפ"ד), Moed B; School of CS, Tel Aviv University; lecturer: Dr. Nadav Cohen, TA: Yonatan Ariel Slutzky; 3 hours; 3 questions, max possible score 105
**Total points:** 105

## Q1 (40 pts) — Deep polynomial-feature networks: exponential expressive efficiency and universality w.r.t. exponential functions
**Topics:** depth-separation, universality, hypothesis-class, expressiveness-hierarchy, polynomial-networks | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
For every $d \in \mathbb{N}_{\geq 2}$ denote by $\sigma_d$ the following function:

$$\sigma_d: \mathbb{R} \to \mathbb{R}^d, \quad \forall x \in \mathbb{R}:\ \sigma_d(x) := (x^d, x^{d-1}, \ldots, x^2, x)^\top \in \mathbb{R}^d$$

Denote by $\mathcal{H}_d$ the following hypothesis class:

$$\mathcal{H}_d := \{\, h(x) := a^\top \sigma_d(x)\ :\ a \in \mathbb{R}^d \,\}$$

Finally, for every $\bar d \in \mathbb{N}$ and every $L \in \mathbb{N}$ denote by $\overline{\mathcal{H}_{\bar d}^{L}}$ the following hypothesis class:

$$\overline{\mathcal{H}_{\bar d}^{L}} := \left\{\, h(x) := a_L^\top \sigma_{\bar d}\Big(a_{L-1}^\top \sigma_{\bar d}\big(\ldots\, a_1^\top \sigma_{\bar d}(x)\, \ldots\big)\Big)\ :\ a_L, \ldots, a_1 \in \mathbb{R}^{\bar d} \,\right\}$$

**(1) (5 pts)** Write formally the definition of the expression: "$\overline{\mathcal{H}_{\bar d}^{L}}$ is exponentially expressively efficient with respect to $\mathcal{H}_d$."

**(2) (12 pts)** Prove that $\overline{\mathcal{H}_{\bar d}^{L}}$ is exponentially expressively efficient with respect to $\mathcal{H}_d$.

Denote by $\mathcal{H}_{exp}$ the following class of functions:

$$\mathcal{H}_{exp} := \{\, h(x) := e^{bx}\ :\ b \in \mathbb{R} \,\}$$

In addition, for any two functions $f_1, f_2: \mathbb{R} \to \mathbb{R}$ define $dist(f_1, f_2)$ to be the following distance metric:

$$dist(f_1, f_2) := \sup_{x \in (0,1)} |f_1(x) - f_2(x)|$$

**(3) (5 pts)** Write formally the definition of the expression: "$\mathcal{H}_d$ is universal in the sense of $dist(\cdot,\cdot)$ with respect to the class $\mathcal{H}_{exp}$."

**(4) (9 pts)** Prove that $\mathcal{H}_d$ is **not** universal in the sense of $dist(\cdot,\cdot)$ with respect to the class $\mathcal{H}_{exp}$.
*Hint:* consider what happens as $x \to 0$.

Denote by $\overline{\mathcal{H}_{exp}}$ the following hypothesis class:

$$\overline{\mathcal{H}_{exp}} := \{\, \bar h(x) := h(x) - 1\ :\ h \in \mathcal{H}_{exp} \,\}$$

**(5) (9 pts)** Prove that $\mathcal{H}_d$ **is** universal in the sense of $dist(\cdot,\cdot)$ with respect to the class $\overline{\mathcal{H}_{exp}}$.
*Hint:* use the fact that for every $b \in \mathbb{R}$ the function $e^{bx}$ has a Taylor expansion around the point $x_0 = 0$ with radius of convergence $\infty$, given by

$$\sum_{n=0}^{\infty} \frac{(bx)^n}{n!}$$

**Solution sketch:**
**1.** Two-condition course definition (exponential variant of expressive efficiency): (i) every function of the shallow family is realizable in the deep family with comparable size (here trivially, $\mathcal{H}_d = \overline{\mathcal{H}_d^1}$); (ii) there exists $h \in \overline{\mathcal{H}_{\bar d}^{L}}$ such that any $d$ with $h \in \mathcal{H}_d$ must be at least exponential in the deep network's size (its depth $L$), i.e. $d \geq c^L$ for some constant $c > 1$. (Exact quantifier phrasing per the course definition — (unverified).)

**2.** Membership of every $h \in \mathcal{H}_d$: each $h \in \overline{\mathcal{H}_{\bar d}^{L}}$ is a composition of polynomials with zero constant term, hence a polynomial with zero constant term of degree $\leq \bar d^L$, i.e.

$$\overline{\mathcal{H}_{\bar d}^{L}} \subseteq \mathcal{H}_{\bar d^L}$$

Hardness:

$$h^*(x) = x^{\bar d^L} \in \overline{\mathcal{H}_{\bar d}^{L}}$$

— take every $a_i = e_1$ (select the top coordinate $x^{\bar d}$ of $\sigma_{\bar d}$), giving $((x^{\bar d})^{\bar d})^{\cdots} = x^{\bar d^L}$. A polynomial identity on $\mathbb{R}$ forces equal coefficients. So $h^* \in \mathcal{H}_d$ requires

$$d \geq \deg h^* = \bar d^L \geq 2^L$$

— exponential in $L$. Together with the containment this gives exponential expressive efficiency.

**3.** Definition: for every $f \in \mathcal{H}_{exp}$ and every $\epsilon > 0$ there exist $d \in \mathbb{N}$ and $h \in \mathcal{H}_d$ such that $dist(f, h) \leq \epsilon$.

**4.** Every $h \in \mathcal{H}_d$ is a polynomial with zero constant term, so $\lim_{x \to 0^+} h(x) = h(0) = 0$, while $\lim_{x \to 0^+} e^{bx} = 1$. Hence

$$dist(e^{bx}, h) = \sup_{x \in (0,1)} |e^{bx} - h(x)| \geq \lim_{x \to 0^+} |e^{bx} - h(x)| = 1$$

for every $d$ and every $h \in \mathcal{H}_d$. So no $f \in \mathcal{H}_{exp}$ can be approximated to accuracy $\epsilon < 1$. Not universal.

**5.** For

$$\bar h_b(x) = e^{bx} - 1 = \sum_{n=1}^{\infty} \frac{(bx)^n}{n!}$$

(zero constant term), take the degree-$d$ truncation

$$p_d(x) := \sum_{n=1}^{d} \frac{b^n}{n!} x^n \in \mathcal{H}_d$$

For $x \in (0,1)$:

$$|\bar h_b(x) - p_d(x)| \leq \sum_{n=d+1}^{\infty} \frac{|b|^n}{n!}$$

— the tail of the convergent series for $e^{|b|}$, which $\to 0$ as $d \to \infty$. Given $\epsilon$, choose $d$ with tail $\leq \epsilon$; then $dist(\bar h_b, p_d) \leq \epsilon$. Universal.

**💡 Useful tricks:** "Write the formal definition" wants the exact 2-condition course form (containment + super-polynomial hardness) — memorize it; composing zero-constant-term polynomials stays zero-constant-term of degree $\leq\bar d^L$ (containment), and a polynomial identity lets you equate coefficients for the degree/hardness bound; the $x\to0^+$ gap ($h(0)=0$ vs $e^{bx}\to1$) is the universality obstruction, and subtracting the constant ($e^{bx}-1$) + Taylor truncation removes it.

**⚠️ Watch out:** (1),(3) formal definitions need correct quantifier order and BOTH conditions — a vague sentence scores little; (2) hardness needs the concrete witness $x^{\bar d^L}$ AND the "degree forces $d\geq\bar d^L$" argument; (4) quantify the obstruction as $dist\geq1$, don't just say "differs at 0"; (5) bound the Taylor *tail* on $(0,1)$ and show it $\to0$.

## Q2 (35 pts) — Gradient flow on a diagonal linear-RNN loss: gradients, one-hot inputs, global convergence vs. (non-)convexity
**Topics:** gradient-flow, convexity, linear-rnn, linear-nn, overparameterization | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_03_optimization_1, fodl_recitation_gradient_flow
**Statement (English translation):**
In this question we deal with the loss function $l$ defined as follows:

$$l: \mathbb{R}^d \to \mathbb{R}, \quad l(a) := \left( \sum_{t=1}^{k} \sum_{j=1}^{d} a_j^{k-t} x_t - y \right)^2$$

for some given $(x, y) \in \mathbb{R}^k \times \mathbb{R}$. Suppose gradient flow is run over $l$ with some initialization $a^{(0)} \in \mathbb{R}^d$.

**(1) (7 pts)** Prove that for every $i \in [d]$:

$$\dot a_i(t) := -\frac{\partial}{\partial a_i} l\big(a(t)\big) = 2\left( y - \sum_{t=1}^{k} \sum_{j=1}^{d} a_j(t)^{k-t} x_t \right) \sum_{t=1}^{k-1} (k-t)\, a_i(t)^{k-t-1} x_t$$

Suppose now that $x = e_{k-1}$ and $y = -1$, where $e_{k-1} \in \mathbb{R}^k$ is a one-hot vector with $1$ in entry $k-1$.

**(2) (5 pts)** Write the explicit (simplified) expressions for $l(a(t))$ and for $\dot a_i(t)$, for every $i \in [d]$.

**(3) (8 pts)** Prove that running gradient flow from any initialization $a^{(0)}$ converges to a global minimum.
*Note (שימו לב):* you may use the fact that gradient flow converges to a critical point.

Suppose now that $x = e_1$ and $y = -1$, where $e_1 \in \mathbb{R}^k$ is a one-hot vector with $1$ in entry $1$.

**(4) (5 pts)** Write the explicit expressions for $l(a(t))$ and $\dot a_i(t)$, for every $i \in [d]$.

**(5) (10 pts)** Prove/disprove the following claim: $l(a(t))$ is not convex (i.e., $l$ as a function of $a$, in the current $x = e_1$, $y = -1$ setting).

**Solution sketch:**
Setup remark: $\sum_t \sum_j a_j^{k-t} x_t$ is the end-to-end map of a *diagonal linear RNN* with transition matrix $\mathrm{diag}(a)$ (cf. Moed A 2024 Q1). The one-hot position of $x$ controls the effective "depth" (power of $a$) seen by the input.

**1.** Chain rule on $l(a) = (h(a) - y)^2$ with $h(a) = \sum_t \sum_j a_j^{k-t} x_t$:

$$\frac{\partial h}{\partial a_i} = \sum_t (k-t) a_i^{k-t-1} x_t$$

The $t = k$ term has exponent $0$ (a constant) so its derivative vanishes and the sum runs only to $k-1$. Negating gives the stated $\dot a_i(t)$.

**2.** $x = e_{k-1}$ keeps only $t = k-1$ (exponent $1$):

$$l(a(t)) = \big(\sum_{j=1}^d a_j(t) + 1\big)^2$$

and

$$\dot a_i(t) = -2\big(\sum_{j=1}^d a_j(t) + 1\big)$$

— identical for all $i$.

**3.** Here $l$ is convex (square of an affine function of $a$). Its critical points:

$$\nabla l(a) = 2(\sum_j a_j + 1)\mathbb{1} = 0 \iff \sum_j a_j = -1 \iff l(a) = 0$$

— every critical point is a global minimum. Combined with the given fact that gradient flow converges to a critical point, it converges to a global minimum from any initialization. (Explicit alternative: $s(t) := \sum_j a_j(t) + 1$ satisfies $\dot s = -2d\, s$, so $s(t) = s(0)e^{-2dt} \to 0$ and $l = s^2 \to 0$.)

**4.** $x = e_1$ keeps only $t = 1$ (exponent $k-1$):

$$l(a(t)) = \big(\sum_{j=1}^d a_j(t)^{k-1} + 1\big)^2$$

and

$$\dot a_i(t) = -2(k-1)\, a_i(t)^{k-2} \big(\sum_{j=1}^d a_j(t)^{k-1} + 1\big)$$

**5.** The answer depends on the parity of $k$ (the complete case analysis; the exam gives general $k$ — which case was intended for full credit is (unverified)):

- $k$ even (odd exponent $k-1 \geq 3$): **not convex**. Restrict to the line $a = (s, 0, \ldots, 0)$: $g(s) = (s^{k-1} + 1)^2$; e.g. for $k = 4$, $g''(s) = 6(5s^4 + 2s) < 0$ at $s = -0.1$. A convex function restricted to a line is convex — contradiction, so $l$ is not convex.
- $k$ odd (even exponent $k-1$): **convex**, disproving the claim: $u(a) := \sum_j a_j^{k-1} + 1$ is convex (sum of even powers) and $u \geq 1 > 0$; $t \mapsto t^2$ is convex and non-decreasing on $[0, \infty)$, so $l = u^2$ is convex. (For $k = 2$, $l$ is a convex quadratic and the two settings coincide.)

**💡 Useful tricks:** In the chain rule the $t=k$ term has exponent $0$ and drops out (sum stops at $k-1$); a one-hot input $x=e_j$ selects a single power and collapses the loss to one term; square-of-affine ⇒ convex ⇒ every critical point is global (combine with the given "GF reaches a critical point"); to test convexity, restrict to a *line* and inspect $g''$.

**⚠️ Watch out:** (1) don't forget that the constant ($t=k$) term contributes zero derivative; (3) you're told GF converges to a critical point — you must add "critical $\Rightarrow$ global for this convex $l$"; (5) the answer is *parity-dependent* — $k$ even gives odd exponent ⇒ **not** convex, $k$ odd gives even exponent ⇒ convex; one line restriction with $g''<0$ suffices to break convexity.

## Q3 (30 pts) — Finite linear hypothesis class: bit-counting, Hoeffding uniform convergence, norm-preferring SRM over $k \in \mathbb{N}$, exact recovery under Gaussian realizability
**Topics:** uniform-convergence, hoeffding, concentration, norm-bounds, probability-tools, erm, structural-risk-minimization, realizability | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2
**Statement (English translation):**
For input space $\mathcal{X} = \mathbb{R}^d$ and output space $\mathcal{Y} = \mathbb{R}$, let $\mathcal{H} \subseteq \mathcal{Y}^{\mathcal{X}}$ be a hypothesis class of linear functions, namely

$$\mathcal{H} = \{\, x \mapsto w^\top x\ :\ w \in \mathbb{R}^d \,\}$$

Let $D$ be a distribution (unknown) over $\mathcal{X} \times \mathcal{Y}$, let $S = \{(x_n, y_n)\}_{n=1}^{N}$ be a training sample of $N$ examples drawn i.i.d. from $D$, and let $l: \mathcal{Y} \times \mathcal{Y} \to [0,1]$ be a loss function satisfying, for all $y_1, y_2 \in \mathcal{Y}$:

$$l(y_1, y_2) = 0 \iff y_1 = y_2$$

For every hypothesis $h \in \mathcal{H}$, denote by $w_h$ the corresponding weight vector, by $L_D(h)$ the generalization error (i.e. $L_D(h) := E_{(x,y)\sim D}[l(h(x), y)]$) and by $L_S(h)$ the sample error (i.e. $L_S(h) := \frac{1}{N}\sum_{n=1}^{N} l(h(x_n), y_n)$). Assume that every entry of $w_h$ can be represented by $B$ bits.

**(1) (5 pts)** Find the tightest upper bound (i.e., the minimal upper bound that necessarily holds) for $|\mathcal{H}|$.

**(2) (6 pts)** Derive a generalization bound based on uniform convergence for the class $\mathcal{H}$. That is, derive an expression $\Delta_1(N, \delta, |\mathcal{H}|)$ (whose dependence on the hypothesis class is only through $|\mathcal{H}|$) satisfying $\lim_{N \to \infty} \Delta_1(N, \delta, |\mathcal{H}|) = 0$, such that for every $\delta \in (0,1)$, with probability at least $1 - \delta$:

$$\forall h \in \mathcal{H}:\ L_D(h) - L_S(h) \leq \Delta_1(N, \delta, |\mathcal{H}|)$$

**In this part you may not rely on claims proved in class during the solution, but you may use the Hoeffding bound (see reminder below).**

*Reminder (Hoeffding bound):* let $A_1, \ldots, A_N$ be i.i.d. (independent, identically distributed) random variables bounded in the interval $[0,1]$. For every $\epsilon \geq 0$:

$$P\left(\left|\frac{1}{N}\sum_{i=1}^{N} A_i - E[A_1]\right| \geq \epsilon\right) \leq 2\exp(-2N\epsilon^2)$$

**(3) (6 pts)** For every $k \in \mathbb{N}$ denote by $\mathcal{H}_k \subseteq \mathcal{H}$ the set of hypotheses with norm at most $k$; that is, for every $h \in \mathcal{H}$: $h \in \mathcal{H}_k$ if and only if $\|w_h\| \leq k$. Derive a generalization bound similar to that of part 2, which prefers hypotheses with low norm. That is, derive an expression $\Delta_2(N, \delta, k)$ satisfying the following conditions:

a. $\lim_{N \to \infty} \Delta_2(N, \delta, k) = 0$ for every $k \in \mathbb{N}$ and every $\delta \in (0,1)$.
b. For every $\delta \in (0,1)$, with probability at least $1 - \delta$:
$$\forall k \in \mathbb{N},\ \forall h \in \mathcal{H}_k:\ L_D(h) - L_S(h) \leq \Delta_2(N, \delta, k)$$
c. $\Delta_2(N, \delta, k) < \Delta_2(N, \delta, k+1)$ for every $k \in \mathbb{N}$ and every $\delta \in (0,1)$.

**In this part you may use the previous part's bound $\Delta_1(N, \delta, |\mathcal{H}|)$ as a "black box", even if you did not derive an expression for it.**

**(4) (8 pts)** Suppose the marginal distribution of $x$ is standard normal, i.e. $x \sim N(0_d, I_{d\times d})$. Additionally, suppose that given an example $x$, the output $y$ is deterministic and realizable by $\mathcal{H}$; that is, there exists $w^* \in \mathcal{H}$ (unknown) for which $P(y = (w^*)^\top x \mid x) = 1$. Suppose we use a learning algorithm that performs ERM. Determine the minimal sample size for which it can be guaranteed with probability $1$ that the returned hypothesis $\hat h_S$ satisfies

$$L_D(\hat h_S) = 0$$

*Reminder (normal vectors are linearly independent):* for all $Z_1, \ldots, Z_m \sim N(0_d, I_{d \times d})$ such that $m \leq d$:

$$P(Z_1, \ldots, Z_m \text{ are linearly independent}) = 1$$

**(5) (5 pts)** Does the result of the previous question mean that there exists a large enough $N \in \mathbb{N}$ for which the bound obtained in part 2 equals $0$? Explain.
*Hint:* note the different assumptions between the two questions.

**Solution sketch:**
**1.** Each of the $d$ entries of $w_h$ takes at most $2^B$ values ($B$ bits), so there are at most $(2^B)^d$ weight vectors, and distinct functions require distinct vectors: $|\mathcal{H}| \leq 2^{Bd}$ (attained when all bit patterns give distinct values — hence tightest).

**2.** Fix $h$: $A_n := l(h(x_n), y_n)$ are i.i.d. in $[0,1]$ with $E[A_1] = L_D(h)$. Hoeffding gives

$$P(|L_S(h) - L_D(h)| \geq \epsilon) \leq 2e^{-2N\epsilon^2}$$

Union bound over the finite $\mathcal{H}$ and solve $2|\mathcal{H}|e^{-2N\epsilon^2} = \delta$:

$$\Delta_1(N, \delta, |\mathcal{H}|) = \sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2N}} \to 0$$

**3.** $k$ ranges over the *countably infinite* $\mathbb{N}$, so a uniform confidence split is impossible. Use SRM weights $\delta_k := \frac{6\delta}{\pi^2 k^2}$ (so $\sum_{k=1}^{\infty} \delta_k = \delta$; a $\delta 2^{-k}$ split also works). Apply part 2 to each $\mathcal{H}_k$ (with $|\mathcal{H}_k| \leq |\mathcal{H}| \leq 2^{Bd}$):

$$\Delta_2(N, \delta, k) := \Delta_1(N, \delta_k, |\mathcal{H}|) = \sqrt{\frac{\ln(2|\mathcal{H}|\pi^2 k^2 / (6\delta))}{2N}}$$

Union bound over all $k$ gives (b); the $k^2$ inside the log gives strict monotonicity (c); and (a) holds since it is still $O(1/\sqrt{N})$.

**4.** Answer: $N = d$. Sufficiency: with $N = d$, the inputs $x_1, \ldots, x_d$ are almost surely linearly independent (reminder), hence span $\mathbb{R}^d$. Since $w^*$ attains $L_S = 0$, any ERM output $\hat w$ also attains $L_S(\hat h_S) = 0$; $l = 0 \iff$ equality forces $\hat w^\top x_n = (w^*)^\top x_n$ for all $n$, so $(\hat w - w^*) \perp$ a spanning set $\Rightarrow \hat w = w^* \Rightarrow L_D(\hat h_S) = 0$. Necessity: if $N \leq d - 1$, the inputs span a proper subspace; pick $0 \neq v$ orthogonal to it. Then $\hat w = w^* + v$ is also an empirical minimizer ($L_S = 0$), yet $v^\top x \sim N(0, \|v\|^2)$ is a.s. nonzero, so $l(\hat w^\top x, y) > 0$ a.s. and $L_D > 0$. ERM may return this $\hat w$, so the probability-1 guarantee fails. The minimal size is exactly $d$.

**5.** No. Part 4 relies on extra assumptions (realizable, deterministic labels; standard-normal marginal) and concerns the error of ERM's specific output, whereas part 2's $\Delta_1$ is distribution-free and must bound the gap $L_D(h) - L_S(h)$ *uniformly over all* $h \in \mathcal{H}$ and all distributions $D$ (agnostic, possibly noisy). For a worst-case $D$ the uniform gap is genuinely of order $\sqrt{\ln|\mathcal{H}|/N} > 0$. So no valid $\Delta_1$ can equal $0$ at any finite $N$ — indeed the derived $\Delta_1 > 0$ strictly and only tends to $0$ as $N \to \infty$ (also: probability $1-\delta$ vs. probability $1$).

**💡 Useful tricks:** $B$ bits/entry ⇒ $|\mathcal H|\leq 2^{Bd}$ ("tightest" = attained); finite class ⇒ Hoeffding + union; when the index ranges over *infinite* $\mathbb N$ use a summable weight $\delta_k=\frac{6\delta}{\pi^2 k^2}$ (Basel) or $\delta 2^{-k}$; realizable + Gaussian inputs ⇒ exact recovery once the inputs *span*, so $N=d$.

**⚠️ Watch out:** (2) Hoeffding needs $h$ fixed before $S$; (3) over infinite $k$ a *uniform* split is impossible — the weights must sum to $\leq\delta$ AND grow the bound in $k$; (4) prove BOTH sufficiency ($N=d$ spans a.s.) and necessity ($N\leq d-1$ leaves a null direction ERM can exploit); (5) the trap is conflating a distribution-free *uniform* bound (never $0$ at finite $N$) with realizable ERM error under extra assumptions.
