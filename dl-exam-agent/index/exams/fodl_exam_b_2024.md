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

**1. The formal definition of exponential expressive efficiency**

**What is asked.** Write, with all quantifiers, what "$\overline{\mathcal{H}_{\bar d}^{L}}$ is exponentially expressively efficient with respect to $\mathcal{H}_d$" means. The answer is a definition.

**Tool and why.** The course definition of expressive efficiency, in the form of lecture 2 (Prop 2), has two conditions: the deep class contains the shallow one at comparable size, and some deep function is out of reach of the shallow class unless the shallow class is prohibitively large. "Exponential" says how large (cheat sheet §4).

**Definitions.** The shallow class is indexed by its size $d$, its number of parameters. The deep class is indexed by its width $\bar d$ and its depth $L$, and has $L\bar d$ parameters. We need both sizes because the definition compares them. Throughout $\bar d\ge2$, since $\sigma_{\bar d}$ is defined only for $\bar d\ge2$.

**Solution.**

Step 1, condition (i), containment at comparable size: the deep class loses nothing.

$$\forall d\in\mathbb{N}_{\ge2}\ \ \exists\bar d\in O(d):\quad \mathcal{H}_d\subseteq\overline{\mathcal{H}_{\bar d}^{L}}$$

Step 2, condition (ii), exponential hardness: some deep function of constant width can be realized by the shallow class only with exponentially many parameters.

$$\exists\bar d\in O(1)\ \ \exists\bar h\in\overline{\mathcal{H}_{\bar d}^{L}}:\quad \bar h\in\mathcal{H}_d\ \Longrightarrow\ d\in\exp(L)$$

Step 3, what $d\in\exp(L)$ means: there is a constant $c>1$, independent of $L$, such that $\bar h\in\mathcal{H}_d$ forces $d\ge c^L$. The deep network that realizes $\bar h$ has only $L\bar d$ parameters, which is linear in $L$.

**In words.** Depth is worth something if it loses nothing, condition (i), and gains a lot, condition (ii): a few deep parameters compute what costs the shallow class exponentially many.

**Sanity check.** Without condition (i), a deep class that simply misses most of $\mathcal{H}_d$ would also count as "efficient". Without the constant width in condition (ii), the exponential size could be hidden inside $\bar d$ itself.

**What to write in the exam.**

- Condition (i): for every $d$ there is $\bar d\in O(d)$ with $\mathcal{H}_d\subseteq\overline{\mathcal{H}_{\bar d}^{L}}$.
- Condition (ii): there are $\bar d\in O(1)$ and $\bar h\in\overline{\mathcal{H}_{\bar d}^{L}}$ such that $\bar h\notin\mathcal{H}_d$ unless $d\in\exp(L)$.
- Meaning of exponential: $\bar h\in\mathcal{H}_d$ forces $d\ge c^L$ for a constant $c>1$.

*Verified: definition part; the witnesses for both conditions are checked symbolically in part 2 (sympy).*

**2. Proof of exponential expressive efficiency**

**What is asked.** Prove the two conditions of part 1 for these classes. The answer is a proof.

**Tool and why.** Condition (i) by a passthrough construction, condition (ii) by a degree argument with a concrete witness (cheat sheet §4). Both fit because every function here is a polynomial, and a polynomial identity on $\mathbb{R}$ pins down every coefficient.

**Definitions.** Let $e_i$ be the $i$-th standard basis vector, of the dimension the context requires. Write $D:=\bar d^{L}$ for the degree of the witness; we name it because the hardness bound is stated in terms of it.

**Solution.**

Step 1, what one layer does: for a scalar $z$ and $a\in\mathbb{R}^{\bar d}$,

$$a^\top\sigma_{\bar d}(z)=\sum_{i=1}^{\bar d}a_i\,z^{\bar d+1-i}.$$

So $a=e_{\bar d}$ returns $z$ itself, because the last coordinate of $\sigma_{\bar d}(z)$ is $z$, and $a=e_1$ returns $z^{\bar d}$, the first coordinate.

Step 2, condition (i) by passthrough: take $\bar d=d$ and let $h(x)=a^\top\sigma_d(x)$ be any member of $\mathcal{H}_d$. In each of the first $L-1$ layers choose the weight $e_d$, and in the last layer choose $a$. By step 1 the first $L-1$ layers pass $x$ through unchanged, and the last one outputs $a^\top\sigma_d(x)$, which is $h(x)$. Hence

$$\mathcal{H}_d\subseteq\overline{\mathcal{H}_{d}^{L}},\qquad \bar d=d\in O(d).$$

Step 3, the witness: choose $a_\ell=e_1$ in every layer. By step 1 each layer raises its input to the power $\bar d$:

$$x\ \mapsto\ x^{\bar d}\ \mapsto\ \big(x^{\bar d}\big)^{\bar d}=x^{\bar d^{2}}\ \mapsto\ \cdots\ \mapsto\ x^{\bar d^{L}}.$$

So $\bar h(x):=x^{D}$ belongs to $\overline{\mathcal{H}_{\bar d}^{L}}$, and the deep network uses $L\bar d$ parameters.

Step 4, what membership in $\mathcal{H}_d$ would mean: suppose $\bar h\in\mathcal{H}_d$. Then some $a\in\mathbb{R}^d$ satisfies, for all real $x$,

$$x^{D}=\sum_{i=1}^{d}a_i\,x^{d+1-i}.$$

Step 5, comparing coefficients: the difference of the two sides is a polynomial that vanishes on all of $\mathbb{R}$. A nonzero polynomial has finitely many roots, so the difference is the zero polynomial and all its coefficients are $0$. The right-hand side has degree at most $d$. If $d<D$, the coefficient of $x^{D}$ in the difference is $1$, a contradiction. Hence

$$\bar h\in\mathcal{H}_d\ \Longrightarrow\ d\ge D=\bar d^{L}\ge2^{L}.$$

The last inequality uses $\bar d\ge2$.

Step 6, the bound is exact and exponential: with $d=D$ take $a=e_1\in\mathbb{R}^{D}$, so $\bar h\in\mathcal{H}_D$. The shallow class therefore needs exactly $\bar d^{L}$ parameters, against $L\bar d$ for the deep one. Taking $\bar d=2$, a constant, gives $d\ge2^L$, which is condition (ii) with $c=2$.

**In words.** Composition multiplies degrees, so depth $L$ reaches degree $\bar d^{L}$; a single layer of width $d$ reaches only degree $d$.

**Sanity check.** For $\bar d=2$ and $L=3$ the deep network has $6$ parameters and computes $x^{8}$, while the shallow class needs $d\ge8$. In the other direction no deep function needs more than $\bar d^{L}$: each layer is a polynomial of degree at most $\bar d$ with zero constant term, and composing such polynomials keeps the constant term zero and multiplies the degree bounds, so $\overline{\mathcal{H}_{\bar d}^{L}}\subseteq\mathcal{H}_{\bar d^{L}}$.

**What to write in the exam.**

- Condition (i): with $\bar d=d$, layers $1$ to $L-1$ use $e_d$ and pass $x$ through, the last layer uses $a$, so $\mathcal{H}_d\subseteq\overline{\mathcal{H}_{d}^{L}}$.
- Witness: all weights $e_1$ give $\bar h(x)=x^{\bar d^{L}}$ with $L\bar d$ parameters.
- Hardness: if $x^{D}=\sum_i a_i x^{d+1-i}$ on $\mathbb{R}$, comparing coefficients gives $d\ge\bar d^{L}$.
- Conclusion: the shallow size is at least $2^{L}$, exponential in $L$, against $L\bar d$ for the deep size.

*Verified: sympy composes 200 random deep networks with $\bar d\in\{2,3\}$ and $L\le3$ (degree at most $\bar d^L$, zero constant term), confirms the all-$e_1$ witness and the passthrough, and solves the coefficient system to confirm that $x^{D}\in\mathcal{H}_d$ exactly when $d\ge D$, for $D\in\{4,8,9\}$.*

**3. The formal definition of universality**

**What is asked.** Write, with quantifiers, what "$\mathcal{H}_d$ is universal in the sense of $dist(\cdot,\cdot)$ with respect to $\mathcal{H}_{exp}$" means. The answer is a definition.

**Tool and why.** Definition 1 of the course (cheat sheet §4): every target is approximated to every accuracy, and the size $d$ may depend on both the target and the accuracy.

**Definitions.** No new notation.

**Solution.**

Step 1, the quantifiers, in this order:

$$\forall f\in\mathcal{H}_{exp}\ \ \forall\epsilon>0\ \ \exists d\in\mathbb{N}_{\ge2}\ \ \exists h\in\mathcal{H}_d:\quad dist(f,h)<\epsilon$$

Step 2, why the order matters: $d$ comes after $f$ and $\epsilon$, so it may grow as $\epsilon$ shrinks. Putting $\exists d$ first would demand one fixed $d$ for all targets and all accuracies, a different and much stronger statement.

Step 3, strict or weak inequality: requiring $dist(f,h)\le\epsilon$ instead gives an equivalent definition, because the condition is demanded for every $\epsilon$; apply the weak version with $\epsilon/2$.

**In words.** Universality says that the union of all the classes $\mathcal{H}_d$ is dense in the target class, with distance measured by $dist$.

**Sanity check.** The negation, which part 4 proves, reads: there are $f\in\mathcal{H}_{exp}$ and $\epsilon_0>0$ such that $dist(f,h)\ge\epsilon_0$ for every $d$ and every $h\in\mathcal{H}_d$. Negating the definition flips each quantifier, as it should.

**What to write in the exam.**

- Definition: for every $f\in\mathcal{H}_{exp}$ and every $\epsilon>0$ there are $d$ and $h\in\mathcal{H}_d$ with $dist(f,h)<\epsilon$.
- Remark: $d$ may depend on both $f$ and $\epsilon$.

*Verified: definition part; its negation is the statement checked numerically in part 4.*

**4. $\mathcal{H}_d$ is not universal with respect to $\mathcal{H}_{exp}$**

**What is asked.** Prove the negation of the definition of part 3: one target and one accuracy that no $h$, in any $\mathcal{H}_d$, reaches. The answer is a proof.

**Tool and why.** The standard non-universality pattern (cheat sheet §4): every $h$ vanishes at $0$ while every target equals $1$ there. The supremum in $dist$ sees points arbitrarily close to $0$, even though $0\notin(0,1)$.

**Definitions.** Fix any $b\in\mathbb{R}$, let $f(x):=e^{bx}$ be the target, and let $\epsilon_0:=1$ be the accuracy. These are the two objects the negation asks for.

**Solution.**

Step 1, every $h\in\mathcal{H}_d$ vanishes at $0$: we have $h(x)=\sum_{i=1}^{d}a_i x^{d+1-i}$, and every exponent $d+1-i$ is at least $1$, so $h(0)=0$. Also $h$ is continuous, being a polynomial.

Step 2, the gap at $0$: let $g(x):=|f(x)-h(x)|$, a continuous function. Then

$$g(0)=|e^{0}-h(0)|=|1-0|=1.$$

Step 3, from the point $0$ to the open interval: let $\eta\in(0,1)$. By continuity of $g$ at $0$ there is $x_\eta\in(0,1)$ with $g(x_\eta)>1-\eta$. Hence

$$dist(f,h)=\sup_{x\in(0,1)}g(x)\ \ge\ g(x_\eta)\ >\ 1-\eta.$$

This holds for every $\eta$, so $dist(f,h)\ge1$.

Step 4, conclusion: for every $d$ and every $h\in\mathcal{H}_d$ we get $dist(f,h)\ge1$, so no $h$ reaches accuracy $\epsilon_0$. The definition of part 3 fails for this $f$, and $\mathcal{H}_d$ is not universal with respect to $\mathcal{H}_{exp}$.

**In words.** Polynomials without a constant term are pinned to $0$ at the origin, while every exponential starts at $1$. Removing the point $0$ from the interval does not help, because the supremum approaches it.

**Sanity check.** The simplest target is $b=0$, i.e. $f\equiv1$. The zero function $h\equiv0$ lies in every $\mathcal{H}_d$ and has distance exactly $1$ from it, so the bound $1$ is attained and cannot be improved.

**What to write in the exam.**

- Observation: every $h\in\mathcal{H}_d$ has no constant term, so $h(0)=0$, while $e^{b\cdot0}=1$.
- Continuity: $|e^{bx}-h(x)|\to1$ as $x\to0^+$, hence $dist(e^{bx},h)\ge1$.
- Conclusion: with $\epsilon_0=1$ no $d$ and no $h$ work, so $\mathcal{H}_d$ is not universal.

*Verified: for random $b$ and random polynomials without constant term, $|e^{bx}-h(x)|$ at $x=10^{-k}$, $k\le8$, approaches a value of at least $1$ (numpy).*

**5. $\mathcal{H}_d$ is universal with respect to $\overline{\mathcal{H}_{exp}}$**

**What is asked.** Prove the definition of part 3 for the targets $\bar h_b(x)=e^{bx}-1$: for every $b$ and every $\epsilon$, exhibit $d$ and $h\in\mathcal{H}_d$. The answer is a proof.

**Tool and why.** Taylor truncation (cheat sheet §4). Subtracting $1$ removes the constant term, which was the only obstruction in part 4, and what remains is a power series without constant term, whose partial sums are exactly members of $\mathcal{H}_d$.

**Definitions.** For $d\ge2$ let $p_d$ be the degree-$d$ Taylor truncation, our approximator, and $R_d$ the tail of the series of $e^{|b|}$, which will bound its error:

$$p_d(x):=\sum_{n=1}^{d}\frac{b^n}{n!}\,x^n,\qquad R_d:=\sum_{n=d+1}^{\infty}\frac{|b|^n}{n!}.$$

**Solution.**

Step 1, the target as a series: by the hint, for every real $x$,

$$\begin{aligned}
\bar h_b(x)&=e^{bx}-1\\
&=\sum_{n=0}^{\infty}\frac{(bx)^n}{n!}-1\\
&=\sum_{n=1}^{\infty}\frac{b^n}{n!}\,x^n.
\end{aligned}$$

The $n=0$ term equals $1$ and cancels the $-1$.

Step 2, the approximator is in $\mathcal{H}_d$: choose

$$a=\Big(\frac{b^d}{d!},\ \frac{b^{d-1}}{(d-1)!},\ \dots,\ \frac{b}{1!}\Big)^\top\in\mathbb{R}^d.$$

Then $a^\top\sigma_d(x)=p_d(x)$, because the $i$-th coordinate of $\sigma_d(x)$ is $x^{d+1-i}$ and the $i$-th coordinate of $a$ is $b^{d+1-i}/(d+1-i)!$.

Step 3, the error on $(0,1)$: subtracting the two series leaves the tail, and $|x|^n\le1$ there:

$$\begin{aligned}
|\bar h_b(x)-p_d(x)|&=\Big|\sum_{n=d+1}^{\infty}\frac{b^n}{n!}x^n\Big|\\
&\le\sum_{n=d+1}^{\infty}\frac{|b|^n}{n!}|x|^n\\
&\le R_d.
\end{aligned}$$

The first inequality is the triangle inequality, valid because the series converges absolutely. Taking the supremum over $x\in(0,1)$ gives $dist(\bar h_b,p_d)\le R_d$.

Step 4, the tail vanishes: the series $\sum_{n\ge0}|b|^n/n!$ converges to $e^{|b|}$ (radius of convergence $\infty$), and the tails of a convergent series tend to $0$. So $R_d\to0$ as $d\to\infty$.

Step 5, choosing $d$: given $\epsilon>0$, pick $d\ge2$ with $R_d<\epsilon$. Then $p_d\in\mathcal{H}_d$ and $dist(\bar h_b,p_d)<\epsilon$. Since $b$ and $\epsilon$ were arbitrary, $\mathcal{H}_d$ is universal with respect to $\overline{\mathcal{H}_{exp}}$.

**In words.** Once the constant is gone, the target is a power series without constant term, and its partial sums live in $\mathcal{H}_d$. On a bounded interval the tail is uniformly small, so a higher degree gives a better uniform fit.

**Sanity check.** For $b=3$: $R_8\approx0.0764$, $R_9\approx0.0221$ and $R_{10}\approx0.0059$, so this bound needs $d=8$ for $\epsilon=0.1$ and $d=10$ for $\epsilon=0.01$. The true supremum on a fine grid of $(0,1)$ agrees with $R_d$ to within $10^{-4}$, because the error is largest as $x\to1$.

**What to write in the exam.**

- Series: $e^{bx}-1=\sum_{n\ge1}\frac{b^n}{n!}x^n$, with no constant term.
- Approximator: $p_d=\sum_{n=1}^{d}\frac{b^n}{n!}x^n$, which is in $\mathcal{H}_d$ with the coefficient vector of step 2.
- Error: on $(0,1)$ we have $|\bar h_b-p_d|\le R_d$, the tail of $e^{|b|}$, and $R_d\to0$.
- Conclusion: pick $d$ with $R_d<\epsilon$, so $\mathcal{H}_d$ is universal.

*Verified: numerically, $R_d$ and the supremum of $|\bar h_b-p_d|$ over $10^4$ grid points of $(0,1)$ for $b\in\{1,3\}$, including the minimal $d$ for $\epsilon\in\{0.1,0.01\}$.*

**Common mistakes.**

- Writing only condition (ii) in parts 1 and 2. The containment $\mathcal{H}_d\subseteq\overline{\mathcal{H}_{\bar d}^{L}}$ at comparable size is graded too, and the passthrough weight $e_d$ proves it in one line.
- Saying "$x^{D}$ has degree $D$, so it is not in $\mathcal{H}_d$" without the coefficient comparison. The fact that a polynomial vanishing on $\mathbb{R}$ is the zero polynomial is the actual proof.
- In part 4, evaluating at $x=0$ although $dist$ is a supremum over the open interval $(0,1)$. The limit $x\to0^+$ and continuity are what close the gap.

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

**1. The gradient-flow equation**

**What is asked.** Prove the stated formula for $\dot a_i(t)$, that is, compute $-\partial l/\partial a_i$ along the trajectory. The answer is a derivation.

**Tool and why.** The chain rule for the square of a smooth function, and the gradient-flow equation $\dot a=-\nabla l(a)$ (cheat sheet §7). The loss is a square of the model output minus the label, so one application of the chain rule does the job.

**Definitions.** Let $h(a)$ be the model output, so that $l(a)=(h(a)-y)^2$:

$$h(a):=\sum_{t=1}^{k}\sum_{j=1}^{d}a_j^{k-t}x_t.$$

We name it so that the chain rule has a single inner function. The statement uses the letter $t$ both for time and for the summation index; inside a sum, $t$ is always the summation index.

**Solution.**

Step 1, the outer derivative: by the chain rule,

$$\frac{\partial l}{\partial a_i}(a)=2\big(h(a)-y\big)\,\frac{\partial h}{\partial a_i}(a).$$

Step 2, the inner derivative: in $h$ only the terms with $j=i$ depend on $a_i$, so

$$\frac{\partial h}{\partial a_i}(a)=\sum_{t=1}^{k}x_t\,\frac{d}{da_i}a_i^{k-t}.$$

Step 3, the term $t=k$ drops: its power is $a_i^{0}$, the constant $1$, so its derivative is $0$. For $t\le k-1$ the exponent $k-t$ is at least $1$, and the power rule gives $(k-t)a_i^{k-t-1}$. Hence

$$\frac{\partial h}{\partial a_i}(a)=\sum_{t=1}^{k-1}(k-t)\,a_i^{k-t-1}x_t.$$

Step 4, gradient flow: $\dot a_i(t)$ is $-\partial l/\partial a_i$ evaluated at $a(t)$. Moving the minus sign into the first factor turns $h-y$ into $y-h$:

$$\dot a_i(t)=2\Big(y-\sum_{t=1}^{k}\sum_{j=1}^{d}a_j(t)^{k-t}x_t\Big)\sum_{t=1}^{k-1}(k-t)\,a_i(t)^{k-t-1}x_t.$$

This is the claimed formula.

**In words.** Each $a_i$ moves in proportion to the residual $y-h$ times the sensitivity of the output to $a_i$. The input entry $x_k$ is not multiplied by any $a_j$, so it has no sensitivity.

**Sanity check.** If $h(a)=y$ the residual is zero and $\dot a=0$: a zero-loss point is a fixed point of gradient flow, as it must be.

**What to write in the exam.**

- Chain rule: $\partial l/\partial a_i=2(h-y)\,\partial h/\partial a_i$.
- Inner derivative: only $j=i$ survives, and the $t=k$ term is constant, so the sum stops at $k-1$.
- Gradient flow: negate, which gives the stated formula.

*Verified: sympy differentiates $l$ for $k=4$, $d=3$ with symbolic $x$ and $y$ and matches the formula for every $i$.*

**2. The one-hot input $x=e_{k-1}$**

**What is asked.** Simplify $l(a(t))$ and $\dot a_i(t)$ when $x=e_{k-1}$ and $y=-1$. The answer is two formulas.

**Tool and why.** Substitution into part 1 (cheat sheet §7): a one-hot input keeps a single term in each sum over $t$. We assume $k\ge2$, so that $e_{k-1}$ exists.

**Definitions.** No new notation.

**Solution.**

Step 1, which term survives: $x_t=0$ unless $t=k-1$, and $x_{k-1}=1$. The surviving power is $k-(k-1)$, which is $1$.

Step 2, the loss: $h(a)=\sum_j a_j$, and with $y=-1$,

$$l\big(a(t)\big)=\Big(\sum_{j=1}^{d}a_j(t)+1\Big)^2.$$

Step 3, the dynamics: in the second sum of part 1 only $t=k-1$ survives, with factor $1\cdot a_i^{0}$, which is $1$. The residual is $y-h=-1-\sum_j a_j$. Hence, for every $i\in[d]$,

$$\dot a_i(t)=-2\Big(\sum_{j=1}^{d}a_j(t)+1\Big).$$

**In words.** With the input at position $k-1$ the network output is just the sum of the $a_j$, and every coordinate receives the same push.

**Sanity check.** Differentiating the loss of step 2 directly gives $\partial l/\partial a_i=2(\sum_j a_j+1)$, the same expression up to the sign of gradient flow.

**What to write in the exam.**

- Loss: $l=(\sum_j a_j+1)^2$.
- Dynamics: $\dot a_i=-2(\sum_j a_j+1)$, the same for every $i$.

*Verified: sympy substitution for $k=4$, $d=3$ reproduces both expressions.*

**3. Convergence to a global minimum**

**What is asked.** Prove that gradient flow converges to a global minimum of $l$ from every initialization $a^{(0)}$. The answer is a proof; we may use that gradient flow converges to a critical point.

**Tool and why.** "Convex plus critical point gives a global minimum" (cheat sheet §7). The given fact supplies a critical point, so it remains to show that every critical point is a global minimum. Here the gradient formula shows it directly, and we also solve the ODE explicitly as a check.

**Definitions.** Let $s(a):=\sum_{j=1}^{d}a_j+1$, the negative of the residual, and let $\mathbb{1}\in\mathbb{R}^d$ be the all-ones vector. Then $l=s^2$ and $\nabla l=2s\mathbb{1}$. We introduce $s$ because both the loss and its gradient depend on $a$ only through it.

**Solution.**

Step 1, the global minimum value: $l=s^2$ is non-negative, and the value $0$ is attained, for example at $a=-e_1$. So the global minimum value is $0$, attained exactly where $s(a)=0$.

Step 2, every critical point is a global minimum:

$$\nabla l(a)=0\iff 2s(a)\mathbb{1}=0\iff s(a)=0\iff l(a)=0.$$

The same follows from convexity: $l$ is the square of an affine function of $a$, hence convex, and for a convex differentiable function every critical point is a global minimum.

Step 3, conclusion from the given fact: gradient flow converges to some critical point $a^{\infty}$. By step 2, $l(a^{\infty})=0$, the global minimum. This holds for every initialization.

Step 4, explicit solution: summing $\dot a_i=-2s$ over $i$ gives $\dot s=-2ds$, so

$$s(t)=s(0)\,e^{-2dt}\xrightarrow[t\to\infty]{}0.$$

All $\dot a_i$ are equal, so every coordinate moves by the same amount:

$$a(t)=a^{(0)}-\frac{s(0)}{d}\big(1-e^{-2dt}\big)\mathbb{1}.$$

The limit $a^{(0)}-\frac{s(0)}{d}\mathbb{1}$ has coordinate sum $\sum_j a^{(0)}_j-s(0)$, which is $-1$, so it is a global minimizer, and along the way $l(a(t))=s(0)^2e^{-4dt}$.

**In words.** The loss sees only one direction, $\mathbb{1}$. Along it the problem is a one-dimensional quadratic that gradient flow solves exponentially fast, while the orthogonal directions never move.

**Sanity check.** If $s(0)=0$ the initialization is already optimal, and the formula of step 4 gives $a(t)=a^{(0)}$ for all $t$.

**What to write in the exam.**

- Gradient: $\nabla l=2s\mathbb{1}$ with $s=\sum_j a_j+1$.
- Critical points: $\nabla l=0$ exactly when $s=0$, that is when $l=0$, the global minimum.
- Conclusion: the given fact supplies a critical point, which is therefore a global minimum.
- Optional check: $s(t)=s(0)e^{-2dt}$ tends to $0$.

*Verified: Euler integration with step $10^{-5}$ up to $t=3$ from a random $a^{(0)}$ in $d=3$ matches the closed form, and the limit has coordinate sum $-1$ (numpy).*

**4. The one-hot input $x=e_1$**

**What is asked.** Simplify $l(a(t))$ and $\dot a_i(t)$ when $x=e_1$ and $y=-1$. The answer is two formulas.

**Tool and why.** The same substitution into part 1 (cheat sheet §7), now keeping the term $t=1$.

**Definitions.** No new notation.

**Solution.**

Step 1, which term survives: only $t=1$, with power $k-1$.

Step 2, the loss: $h(a)=\sum_j a_j^{k-1}$, so

$$l\big(a(t)\big)=\Big(\sum_{j=1}^{d}a_j(t)^{k-1}+1\Big)^2.$$

Step 3, the dynamics: in the second sum of part 1 only $t=1$ survives, with factor $(k-1)a_i^{k-2}$, and the residual is $-1-\sum_j a_j^{k-1}$. Hence

$$\dot a_i(t)=-2(k-1)\,a_i(t)^{k-2}\Big(\sum_{j=1}^{d}a_j(t)^{k-1}+1\Big).$$

**In words.** The input now passes through $k-1$ multiplications by $a_j$, so the loss is a polynomial of degree $2(k-1)$, and the push on $a_i$ is damped by the factor $a_i^{k-2}$ near $0$.

**Sanity check.** For $k=2$ we have $e_1=e_{k-1}$, and both formulas reduce to those of part 2.

**What to write in the exam.**

- Loss: $l=(\sum_j a_j^{k-1}+1)^2$.
- Dynamics: $\dot a_i=-2(k-1)a_i^{k-2}(\sum_j a_j^{k-1}+1)$.

*Verified: sympy substitution for $k=4$, $d=3$ reproduces both expressions.*

**5. Is $l$ convex for $x=e_1$?**

**What is asked.** Prove or disprove that $l$ is not convex. The answer depends on $k$, so each case needs a proof or a counterexample.

**Tool and why.** Convexity along lines (cheat sheet §7): a convex function is convex on every line, so one violated midpoint inequality on one line disproves convexity. For the convex cases, composing a convex function that is at least $1$ with $z\mapsto z^2$, which is convex and non-decreasing on $[0,\infty)$.

**Definitions.** Let $m:=k-1$ be the exponent and let $u(a):=\sum_{j=1}^{d}a_j^{m}+1$, so that $l=u^2$. Everything depends on the parity of $m$, which is why we name it.

**Solution.**

Verdict: the claim "$l$ is not convex" is true exactly when $k$ is even and $k\ge4$. For $k=2$ and for odd $k$ the function $l$ is convex, and the claim is false.

Step 1, even $k\ge4$, so $m\ge3$ is odd: restrict to the line $a=se_1$ and set $g(s):=l(se_1)$. The other coordinates are $0$, so $g(s)=(s^m+1)^2$. Take the points $s=-1$ and $s=0$ and their midpoint:

$$g(-1)=\big((-1)^m+1\big)^2=0,\qquad g(0)=1,\qquad g\big(-\tfrac12\big)=\big(1-2^{-m}\big)^2.$$

Here $(-1)^m=-1$ because $m$ is odd. Convexity of $g$ would require

$$g\big(-\tfrac12\big)\le\tfrac12\big(g(-1)+g(0)\big)=\tfrac12.$$

But $m\ge3$ gives

$$g\big(-\tfrac12\big)=\big(1-2^{-m}\big)^2\ \ge\ \big(\tfrac78\big)^2=\tfrac{49}{64}\ >\ \tfrac12.$$

So $l$ is not convex on this line, hence not convex: the claim holds.

Step 2, odd $k\ge3$, so $m\ge2$ is even. **Claim.** $l$ is convex on $\mathbb{R}^d$.

Each map $a_j\mapsto a_j^m$ is convex, since its second derivative $m(m-1)a_j^{m-2}$ is non-negative for even $m$. So $u$ is convex, as a sum of convex functions plus a constant, and $u\ge1$. Let $a,b\in\mathbb{R}^d$, $\lambda\in[0,1]$, and $c:=\lambda a+(1-\lambda)b$. Then

$$\begin{aligned}
l(c)=u(c)^2&\le\big(\lambda u(a)+(1-\lambda)u(b)\big)^2\\
&\le\lambda u(a)^2+(1-\lambda)u(b)^2\\
&=\lambda l(a)+(1-\lambda)l(b).
\end{aligned}$$

The first inequality: convexity of $u$ gives $u(c)\le\lambda u(a)+(1-\lambda)u(b)$, both sides are at least $1$, and squaring preserves order between non-negative numbers. The second inequality is convexity of $z\mapsto z^2$. So the claim is false for odd $k$.

Step 3, $k=2$, so $m=1$: now $u$ is affine and may be negative, so step 2 does not apply verbatim. But affinity gives $u(c)=\lambda u(a)+(1-\lambda)u(b)$ exactly, so the first line of the chain holds with equality and the second is again convexity of $z\mapsto z^2$. So $l$ is convex, as already used in part 3.

Step 4, summary:

| $k$ | exponent $m$ | $l$ convex? | claim |
|---|---|---|---|
| $2$ | $1$ | yes | false |
| odd, $k\ge3$ | even | yes | false |
| even, $k\ge4$ | odd, $m\ge3$ | no | true |

**In words.** An odd power $s^m$ with $m\ge3$ is flat at $0$ and changes sign, so $(s^m+1)^2$ drops to $0$ at $s=-1$ and has a concave stretch between $-1$ and $0$. An even power is convex and keeps $u\ge1$, so squaring keeps convexity.

**Sanity check.** For $k=4$ the second derivative on the line is $g''(s)=6s(5s^3+2)$, and $g''(-0.1)=-1.197$: negative curvature, consistent with step 1. For $k=2$ the midpoint test gives $g(-\tfrac12)=\tfrac14$, below $\tfrac12$, consistent with step 3.

**What to write in the exam.**

- Verdict: it depends on $k$; $l$ is not convex exactly for even $k\ge4$.
- Even $k\ge4$: on the line $se_1$, $g(-1)=0$ and $g(0)=1$, but $g(-\tfrac12)=(1-2^{-m})^2$, which exceeds $\tfrac12$.
- Odd $k$: $u$ is convex with $u\ge1$, and squaring a convex function that is at least $1$ keeps convexity.
- Case $k=2$: $l$ is the square of an affine function, hence convex.

*Verified: exact fractions give the midpoint values for $k$ from $2$ to $11$ (a violation exactly for even $k\ge4$, e.g. $\tfrac{49}{64}$ for $k=4$), sympy gives $g''$, and $20000$ random Jensen tests in $d=3$ find no violation for $k\in\{2,3,5,7\}$.*

**Common mistakes.**

- Keeping the $t=k$ term in the inner derivative. It is a constant and contributes $0$, which is why the sum stops at $k-1$.
- In part 3, quoting "gradient flow converges to a critical point" without showing that every critical point is a global minimum. That step is the whole proof.
- In part 5, arguing "even $k$ means an odd exponent, so $l$ is not convex" and forgetting $k=2$: the exponent is then $1$ and $l$ is a convex square of an affine function.

**💡 Useful tricks:** In the chain rule the $t=k$ term has exponent $0$ and drops out (sum stops at $k-1$); a one-hot input $x=e_j$ selects a single power and collapses the loss to one term; square-of-affine ⇒ convex ⇒ every critical point is global (combine with the given "GF reaches a critical point"); to test convexity, restrict to a *line* and inspect $g''$.

**⚠️ Watch out:** (1) don't forget that the constant ($t=k$) term contributes zero derivative; (3) you're told GF converges to a critical point — you must add "critical $\Rightarrow$ global for this convex $l$"; (5) the answer depends on $k$ — even $k\ge4$ gives an odd exponent ⇒ **not** convex, while $k=2$ (exponent $1$) and odd $k$ (even exponent) give a convex $l$; one line restriction with $g''<0$ suffices to break convexity.

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

**1. The size of $\mathcal{H}$**

**What is asked.** The smallest upper bound on $|\mathcal{H}|$ that necessarily holds when every entry of $w_h$ is stored in $B$ bits. The answer is a formula.

**Tool and why.** Counting parameter assignments (cheat sheet §10): the map from weight vectors to hypotheses is onto, so there are at most as many hypotheses as representable weight vectors.

**Definitions.** Let $W_B\subset\mathbb{R}$ be the set of numbers representable with $B$ bits. We need it to count the weight vectors.

**Solution.**

Step 1, one entry: $B$ bits have $2^B$ patterns, so $|W_B|\le2^B$.

Step 2, all entries: $w_h\in W_B^{d}$, and the $d$ entries are chosen independently, so there are at most $(2^B)^d$ weight vectors. Each hypothesis is $x\mapsto w^\top x$ for one of them, hence

$$|\mathcal{H}|\le|W_B|^{d}\le2^{Bd}.$$

Step 3, why this is the tightest bound: different weight vectors give different functions, because $h(e_i)=w_i$ recovers every entry. So when the $B$-bit code is injective, as in any standard fixed-point code, $|\mathcal{H}|=2^{Bd}$ exactly. No smaller number bounds $|\mathcal{H}|$ for every representation.

$$\boxed{|\mathcal{H}|\le2^{Bd}}$$

**In words.** A hypothesis is described by $Bd$ bits, and $Bd$ bits can name at most $2^{Bd}$ different objects.

**Sanity check.** For $B=2$ and $d=2$ with the two's-complement values $\{-2,-1,0,1\}$ there are exactly $16$ distinct functions, which is $2^{4}$.

**What to write in the exam.**

- Count: each entry takes at most $2^B$ values, so there are at most $2^{Bd}$ weight vectors.
- Bound: $|\mathcal{H}|\le2^{Bd}$.
- Tightness: $w\mapsto w^\top x$ is injective, so an injective code attains the bound.

*Verified: enumerating all $16$ weight vectors for $B=2$, $d=2$ gives $16$ distinct functions (numpy).*

**2. A uniform-convergence bound from Hoeffding**

**What is asked.** An explicit $\Delta_1(N,\delta,|\mathcal{H}|)$ that tends to $0$ as $N\to\infty$, such that with probability at least $1-\delta$ every $h$ satisfies $L_D(h)-L_S(h)\le\Delta_1$ simultaneously. The answer is a derivation that uses only Hoeffding.

**Tool and why.** Hoeffding for one fixed hypothesis, then the union bound over the finite class (cheat sheet §2 and §10). Hoeffding needs a hypothesis fixed before the sample is drawn; the union bound turns "each fixed $h$" into "all $h$ at once".

**Definitions.** For a fixed $h$ let $A_n:=l(h(x_n),y_n)$, the loss on the $n$-th example, and let $E_h$ be the bad event that $L_D(h)-L_S(h)\ge\epsilon$. We name the event so that the union bound can be written over it.

**Solution.**

Step 1, Hoeffding's conditions: the pairs $(x_n,y_n)$ are i.i.d. and $h$ is fixed, so $A_1,\dots,A_N$ are i.i.d.; they lie in $[0,1]$ because $l$ does. Their average is $L_S(h)$, and $E[A_1]=L_D(h)$.

Step 2, one hypothesis: by Hoeffding,

$$P(E_h)\le P\big(|L_S(h)-L_D(h)|\ge\epsilon\big)\le2e^{-2N\epsilon^2}.$$

Step 3, all hypotheses: by the union bound over the finite class,

$$P\Big(\bigcup_{h\in\mathcal{H}}E_h\Big)\le\sum_{h\in\mathcal{H}}P(E_h)\le2|\mathcal{H}|e^{-2N\epsilon^2}.$$

Step 4, solving for $\epsilon$: set the right-hand side equal to $\delta$.

$$\begin{aligned}
2|\mathcal{H}|e^{-2N\epsilon^2}&=\delta\\
\iff\ 2N\epsilon^2&=\ln\frac{2|\mathcal{H}|}{\delta}\\
\iff\ \epsilon&=\sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2N}}.
\end{aligned}$$

Step 5, the complement: with probability at least $1-\delta$ no bad event occurs, so every $h$ simultaneously satisfies $L_D(h)-L_S(h)<\epsilon$. Hence

$$\boxed{\Delta_1(N,\delta,|\mathcal{H}|)=\sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2N}}}$$

and it tends to $0$ as $N\to\infty$, because the numerator does not depend on $N$.

**In words.** Each hypothesis deviates rarely. With finitely many of them, asking all of them to behave at once costs only $\ln|\mathcal{H}|$, the number of bits.

**Sanity check.** With $|\mathcal{H}|=2^{Bd}$, $B=32$, $d=10$ and $\delta=0.05$: $\Delta_1\approx0.336$ at $N=10^3$, $0.106$ at $N=10^4$ and $0.034$ at $N=10^5$, the $1/\sqrt N$ rate.

**What to write in the exam.**

- Fixed hypothesis: $A_n=l(h(x_n),y_n)$ are i.i.d. in $[0,1]$ with mean $L_D(h)$, and Hoeffding gives $2e^{-2N\epsilon^2}$.
- Union bound: the failure probability is at most $2|\mathcal{H}|e^{-2N\epsilon^2}$.
- Solving: $\Delta_1=\sqrt{\ln(2|\mathcal{H}|/\delta)/(2N)}$, which tends to $0$.

*Verified: a Monte-Carlo run of $2\cdot10^5$ samples for one Bernoulli loss with $N=200$, $\epsilon=0.1$ gives deviation frequency $0.0025$, below the Hoeffding bound $0.037$; the values of $\Delta_1$ were computed directly.*

**3. A bound that prefers low norm**

**What is asked.** An expression $\Delta_2(N,\delta,k)$ satisfying conditions a, b and c: it tends to $0$, it holds simultaneously for all $k$ and all $h\in\mathcal{H}_k$ with probability at least $1-\delta$, and it is strictly increasing in $k$.

**Tool and why.** The weighted union bound of SRM (cheat sheet §2). The index $k$ ranges over the infinite set $\mathbb{N}$, so $\delta$ cannot be split evenly; a summable schedule $\delta_k$ can, and its $\ln(1/\delta_k)$ term makes the bound grow with $k$.

**Definitions.** The confidence level assigned to level $k$:

$$\delta_k:=\frac{6\delta}{\pi^2k^2},\qquad k\in\mathbb{N}.$$

Each $\delta_k$ lies in $(0,1)$ because $\pi^2/6>1$, and by the Basel sum $\sum_{k\ge1}1/k^2=\pi^2/6$ they satisfy $\sum_{k}\delta_k=\delta$.

**Solution.**

Step 1, one level $k$: apply part 2 at confidence $\delta_k$. With probability at least $1-\delta_k$, every $h\in\mathcal{H}$, and in particular every $h\in\mathcal{H}_k$, satisfies

$$L_D(h)-L_S(h)\le\Delta_1(N,\delta_k,|\mathcal{H}|).$$

Applying part 2 to the whole class $\mathcal{H}$ avoids comparing $|\mathcal{H}_k|$ with $|\mathcal{H}|$ inside the black box.

Step 2, the definition:

$$\Delta_2(N,\delta,k):=\Delta_1(N,\delta_k,|\mathcal{H}|)=\sqrt{\frac{\ln\big(\pi^2k^2|\mathcal{H}|/(3\delta)\big)}{2N}}.$$

The second form substitutes $\delta_k$ into part 2, using that $2|\mathcal{H}|/\delta_k$ equals $\pi^2k^2|\mathcal{H}|/(3\delta)$.

Step 3, condition b: let $F_k$ be the event that step 1 fails at level $k$. By the union bound over $k$,

$$P\Big(\bigcup_{k\in\mathbb{N}}F_k\Big)\le\sum_{k=1}^{\infty}\delta_k=\delta.$$

So with probability at least $1-\delta$ no $F_k$ occurs, and the bound holds for all $k$ and all $h\in\mathcal{H}_k$ at once.

Step 4, condition a: for fixed $k$ and $\delta$ the numerator is a constant, so $\Delta_2\to0$ as $N\to\infty$.

Step 5, condition c: the argument of the logarithm is strictly increasing in $k$ and larger than $1$, because $\pi^2/3>1$, $|\mathcal{H}|\ge1$ and $\delta<1$. Both $\ln$ and the square root are strictly increasing, so $\Delta_2(N,\delta,k)<\Delta_2(N,\delta,k+1)$.

Step 6, a pure black-box version: if one refuses to use the formula of $\Delta_1$, strict monotonicity can be forced by a maximum and a small increasing term:

$$\Delta_2(N,\delta,k):=\max_{j\le k}\Delta_1(N,\delta_j,|\mathcal{H}|)+\frac{k}{(k+1)N}.$$

The maximum is non-decreasing in $k$ and the added term is strictly increasing, so c holds; both terms tend to $0$, so a holds; and the expression is at least $\Delta_1(N,\delta_k,|\mathcal{H}|)$, so b holds.

**In words.** Each norm level gets its own share of the failure budget. Higher levels get smaller shares, and a smaller share costs a larger $\ln(1/\delta_k)$: that is exactly the preference for low norm.

**Sanity check.** The extra cost of level $k$ over level $1$ is only $\ln k^2$ inside the root. For $|\mathcal{H}|=2^{24}$, $\delta=0.05$ and $N=1000$, $\Delta_2$ is $0.1020$ at $k=1$ and $0.1096$ at $k=5$.

**What to write in the exam.**

- Weights: $\delta_k=\frac{6\delta}{\pi^2k^2}$, which sum to $\delta$.
- Definition: $\Delta_2(N,\delta,k):=\Delta_1(N,\delta_k,|\mathcal{H}|)$.
- Condition b: union bound over $k$, total failure probability at most $\delta$.
- Conditions a and c: order $1/\sqrt N$ for fixed $k$, and the $k^2$ inside the logarithm makes it strictly increasing.

*Verified: the partial sum of $\delta_k/\delta$ up to $k=10^6$ is $0.9999994$, the two forms of $\Delta_2$ agree numerically, and $\Delta_2$ is strictly increasing for $k\le5$.*

**4. Exact recovery under Gaussian realizability**

**What is asked.** The smallest $N$ for which every ERM output satisfies $L_D(\hat h_S)=0$ with probability $1$. The answer is a number, with a proof that it suffices and that nothing smaller does.

**Tool and why.** Linear algebra (cheat sheet §3): zero empirical loss pins $\hat w$ on the span of the inputs, and the reminder says when Gaussian inputs span $\mathbb{R}^d$. The loss property, $l(y_1,y_2)=0$ only when $y_1=y_2$, turns zero loss into linear equations. As the reminder intends, the weights range over $\mathbb{R}^d$.

**Definitions.** Write $\hat w$ for the weight vector of $\hat h_S$, and $X\in\mathbb{R}^{N\times d}$ for the matrix whose rows are $x_1^\top,\dots,x_N^\top$. They turn the $N$ interpolation conditions into one matrix equation.

**Solution.**

Answer:

$$\boxed{N=d}$$

Step 1, ERM reaches zero empirical loss: $L_S(w^*)=0$, because $y_n=(w^*)^\top x_n$ with probability $1$ and $l(y,y)=0$. ERM minimizes $L_S$, which is non-negative, so $L_S(\hat h_S)=0$.

Step 2, zero empirical loss means interpolation: $L_S(\hat h_S)$ is an average of non-negative terms, so each term is $0$. By the property of $l$ this gives $\hat w^\top x_n=y_n$ for every $n$, that is $X(\hat w-w^*)=0$.

Step 3, $N=d$ suffices: by the reminder, $x_1,\dots,x_d$ are linearly independent with probability $1$, so $X$ is invertible and $X(\hat w-w^*)=0$ forces $\hat w=w^*$. Then $\hat h_S(x)=y$ for almost every example, so $L_D(\hat h_S)=0$. For $N>d$ the first $d$ inputs already span $\mathbb{R}^d$, so the same holds.

Step 4, $N\le d-1$ does not suffice: the rows of $X$ span a subspace of dimension at most $d-1$, so some $v\ne0$ satisfies $Xv=0$. The vector $\hat w:=w^*+v$ has $L_S=0$, so it is an empirical risk minimizer and ERM may return it. For a fresh example,

$$\hat w^\top x-y=v^\top x\sim N\big(0,\|v\|^2\big),$$

a continuous random variable, so $v^\top x\ne0$ with probability $1$. Hence $l(\hat w^\top x,y)>0$ almost surely, and an almost surely positive variable has positive expectation: $L_D(\hat h_S)>0$. The guarantee fails.

Step 5, conclusion: $N=d$ suffices and no smaller $N$ does.

**Remark on the finite class.** If $\hat w$ must be one of the finitely many $B$-bit vectors, the answer changes. For each of the finitely many $w\ne w^*$, the variable $(w-w^*)^\top x_1$ is a nonzero Gaussian, hence nonzero with probability $1$, so already $N=1$ rules out every wrong $w$. The reminder about $m\le d$ Gaussian vectors shows that the intended reading is the real-valued class of the statement's definition, with answer $N=d$.

**In words.** Each example is one linear measurement of $w^*$. Recovering $d$ unknowns takes $d$ independent measurements; with fewer, a whole direction of $w$ is invisible to the sample but not to the distribution.

**Sanity check.** For $d=1$ the answer is $N=1$: a single input $x_1$, nonzero almost surely, determines $w^*=y_1/x_1$.

**What to write in the exam.**

- Answer: $N=d$.
- Sufficiency: ERM has $L_S=0$, so $\hat w^\top x_n=(w^*)^\top x_n$; the $d$ Gaussian inputs span $\mathbb{R}^d$ almost surely, so $\hat w=w^*$.
- Necessity: for $N\le d-1$ take $v\ne0$ orthogonal to all inputs; $w^*+v$ is an ERM solution, and $v^\top x\sim N(0,\|v\|^2)$ is nonzero almost surely, so $L_D>0$.

*Verified: numpy, $1000$ random trials in $d=5$: $d$ Gaussian inputs always have rank $5$, $d-1$ inputs always leave a null vector $v$, and $|v^\top x|$ never vanishes over $10^5$ fresh inputs; on a $2$-bit grid in $d=3$, a single Gaussian input separated $w^*$ from every other grid vector in all $2000$ trials.*

**5. Can the part-2 bound be $0$?**

**What is asked.** Whether part 4 implies that the bound $\Delta_1$ of part 2 equals $0$ for some large enough $N$. The answer is yes or no, with an explanation.

**Tool and why.** Compare the assumptions (cheat sheet §1 and §12): $\Delta_1$ must hold for every distribution and for every $h$ at once, while part 4 concerns one family of distributions and one learned hypothesis.

**Definitions.** Let $c:=l(0,1)$; then $c>0$ because $0\ne1$. We use it to build a distribution on which the gap is positive.

**Solution.**

Answer: no.

Step 1, the derived bound is never $0$: $2|\mathcal{H}|/\delta>2$ because $|\mathcal{H}|\ge1$ and $\delta<1$, so the logarithm exceeds $\ln2$. For every $N$,

$$\Delta_1(N,\delta,|\mathcal{H}|)>\sqrt{\frac{\ln2}{2N}}>0.$$

Step 2, no valid distribution-free bound can be $0$: fix $N$ and $\delta$, and let $p:=1-\delta^{1/(2N)}$. Take $D$ with $x=0$ always, and $y=1$ with probability $p$, $y=0$ otherwise. Every $h$ outputs $h(0)=0$, so $L_D(h)=cp$, which is positive. With probability $(1-p)^N=\sqrt\delta$, which is larger than $\delta$, all labels are $0$ and $L_S(h)=0$. On that event the gap is $cp$, so a bound valid with probability at least $1-\delta$ must satisfy $\Delta_1\ge cp$, a positive number.

Step 3, why part 4 does not contradict this: part 4 assumes realizable, deterministic labels and Gaussian inputs, it speaks only about the ERM output $\hat h_S$, and it holds with probability $1$ rather than $1-\delta$. Part 2 must cover every $D$, including noisy ones like the one in step 2, and every $h\in\mathcal{H}$ simultaneously.

**In words.** A uniform, distribution-free guarantee pays for the worst distribution and the worst hypothesis. Part 4 is a best-case statement about one kind of distribution and one learned hypothesis.

**Sanity check.** For $N=100$ and $\delta=0.05$: $p\approx0.0149$, all labels are $0$ with probability about $0.224$, more than $\delta$, and $\Delta_1>\sqrt{\ln2/200}$, about $0.059$.

**What to write in the exam.**

- Answer: no.
- Formula: $\Delta_1=\sqrt{\ln(2|\mathcal{H}|/\delta)/(2N)}$ is strictly positive for every finite $N$.
- Reason: $\Delta_1$ is uniform over $h$ and distribution-free, while part 4 uses realizability, Gaussian inputs and one ERM output.
- Bonus: a label-noise distribution forces every valid $\Delta_1$ to be positive.

*Verified: computed $p$, $(1-p)^N$ and the lower bound $\sqrt{\ln2/(2N)}$ for $N=100$, $\delta=0.05$ and for $N=10^6$, $\delta=0.01$ (Python).*

**Common mistakes.**

- Applying Hoeffding directly to the learned $\hat h_S$, which depends on $S$. Hoeffding needs a hypothesis fixed in advance, hence the union bound.
- Splitting $\delta$ evenly over $k\in\mathbb{N}$: each share would be $0$. A summable schedule such as $\frac{6\delta}{\pi^2k^2}$ is needed.
- In part 4, proving only that $N=d$ suffices. Minimality needs the null direction $v$ for $N\le d-1$.

**💡 Useful tricks:** $B$ bits/entry ⇒ $|\mathcal H|\leq 2^{Bd}$ ("tightest" = attained); finite class ⇒ Hoeffding + union; when the index ranges over *infinite* $\mathbb N$ use a summable weight $\delta_k=\frac{6\delta}{\pi^2 k^2}$ (Basel) or $\delta 2^{-k}$; realizable + Gaussian inputs ⇒ exact recovery once the inputs *span*, so $N=d$.

**⚠️ Watch out:** (2) Hoeffding needs $h$ fixed before $S$; (3) over infinite $k$ a *uniform* split is impossible — the weights must sum to $\leq\delta$ AND grow the bound in $k$; (4) prove BOTH sufficiency ($N=d$ spans a.s.) and necessity ($N\leq d-1$ leaves a null direction ERM can exploit); (5) the trap is conflating a distribution-free *uniform* bound (never $0$ at finite $N$) with realizable ERM error under extra assumptions.
