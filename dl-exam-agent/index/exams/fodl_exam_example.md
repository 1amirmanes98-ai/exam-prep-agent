# FODL Example Exam
**Date / semester:** July 1st, 2020 — 2019–2020 Spring Semester ("Exemplar Exam")
**Total points:** 100

## Q1 (25 pts) — Universality of shallow leaky-ReLU networks for piecewise linear functions
**Topics:** universality, hypothesis-class, leaky-relu, piecewise-linear | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
(Original is in English; reproduced faithfully.)

Let $\mathcal{H}_B$ be the hypotheses space corresponding to a fully-connected shallow (2 layer) neural network with 1D input, 1D output, hidden width $B\in\mathbb{N}$, and leaky ReLU activation with negative slope $\alpha>0$ (i.e. an activation $\sigma(z)$ equal to $z$ when $z>0$ and to $\alpha\cdot z$ otherwise). Denote by $\mathcal{F}$ the set of piecewise linear functions from $\mathbb{R}$ to $\mathbb{R}$, and suppose we measure distance between functions through $\|\cdot\|_\infty$, i.e. $d(f_1,f_2):=\sup_{x\in\mathbb{R}}|f_1(x)-f_2(x)|$.

- **(5 pts)** Provide an explicit expression for $\mathcal{H}_B$.
- **(5 pts)** Define what it means for $\mathcal{H}_B$ to be $\mathcal{F}$-universal in the sense of $d(\cdot,\cdot)$.
- **(15 pts)** Prove that this universality holds.

**Solution sketch:**
**a.** Explicit expression:

$$\mathcal{H}_B=\big\{x\mapsto\sum_{i=1}^B v_i\,\sigma(w_ix+b_i)+c\ :\ w_i,b_i,v_i,c\in\mathbb{R}\big\}$$

with $\sigma(z)=z$ for $z>0$ and $\alpha z$ otherwise (whether the output bias $c$ is included depends on the course convention — unverified; constants are realizable via a $w_i=0$ neuron anyway).

**b.** Universality definition: for every $f\in\mathcal{F}$ and every $\epsilon>0$ there exist $B\in\mathbb{N}$ and $h\in\mathcal{H}_B$ with $d(f,h)\le\epsilon$ (equivalently, $\bigcup_{B\in\mathbb{N}}\mathcal{H}_B$ is dense in $\mathcal{F}$ w.r.t. $d$).

**c.** Key identities: $\sigma(z)-\sigma(-z)=(1+\alpha)z$ and $\sigma(z)+\sigma(-z)=(1-\alpha)|z|$. So two leaky-ReLU neurons implement the identity map and $|z|$. Hence $\mathrm{ReLU}(z)=\tfrac{z+|z|}{2}$ is implementable with 2 leaky-ReLU neurons.

**d.** Any piecewise linear $f$ with finitely many breakpoints $t_1<\dots<t_k$ can be written

$$f(x)=ax+b+\sum_{i=1}^k c_i\,\mathrm{ReLU}(x-t_i)$$

(slopes determine the $c_i$'s).

**e.** Implement each term via the identities above: width $B=O(k)$ suffices for an exact representation, i.e., $d(f,h)=0\le\epsilon$. Universality holds (in fact exactly, not just approximately) for piecewise linear functions with finitely many pieces.

**💡 Useful tricks:** Pair leaky-ReLU neurons: $\sigma(z)-\sigma(-z)=(1+\alpha)z$ and $\sigma(z)+\sigma(-z)=(1-\alpha)|z|$ give identity and ReLU; decompose piecewise linear $f$ as $ax+b+\sum_i c_i\,\mathrm{ReLU}(x-t_i)$ (Lecture 2); "universal for piecewise linear" cues exact width-$O(k)$ realization, not approximation.

**⚠️ Watch out:** Quantifier order in the definition ($\forall f,\epsilon\ \exists B,h$ — width may depend on $f,\epsilon$); don't treat $\sigma$ as plain ReLU ($\alpha>0$ changes constants); justify the affine part $ax+b$ and that slope jumps determine the $c_i$.

## Q2 (42 pts) — Smoothness of a quadratic objective; overparameterized critical points are global minima
**Topics:** smoothness, convexity, gradient-descent, linear-nn, spurious-minima | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_03_optimization_1, lecture_04_optimization_2
**Statement (English translation):**
(Original is in English; reproduced faithfully.)

Consider the quadratic objective $f:\mathbb{R}^d\to\mathbb{R}$, $f(w)=\frac12 w^\top Qw$, where $Q\in\mathbb{R}^{d,d}$ is positive definite.

- **(5 pts)** Define what it means for $f(\cdot)$ to be $\beta$-smooth for $\beta>0$.
- **(8 pts)** Prove that $f(\cdot)$ is $\beta$-smooth for all $\beta\ge\lambda_{max}$, where $\lambda_{max}$ is the max eigenvalue of $Q$.
- **(8 pts)** Prove that $f(\cdot)$ is not $\beta$-smooth for any $\beta<\lambda_{max}$.

Suppose we overparameterize $f(\cdot)$ with a shallow (2 layer) linear neural network of hidden width 1.

- **(8 pts)** Compute the gradient of the overparameterized objective w.r.t. network weights.
- **(5 pts)** Define what a critical point of the overparameterized objective is.
- **(8 pts)** Prove that all such critical points are global minima.

**Solution sketch:**
**a.** $\beta$-smoothness: $\nabla f$ is $\beta$-Lipschitz, i.e.,

$$\|\nabla f(w)-\nabla f(w')\|\le\beta\|w-w'\|$$

for all $w,w'$ (equivalent quadratic-upper-bound form: $f(w')\le f(w)+\nabla f(w)^\top(w'-w)+\frac\beta2\|w'-w\|^2$).

**b.** $\nabla f(w)=Qw$ (for symmetric $Q$), so

$$\|\nabla f(w)-\nabla f(w')\|=\|Q(w-w')\|\le\|Q\|_2\|w-w'\|=\lambda_{max}\|w-w'\|$$

Hence $\beta$-smooth for every $\beta\ge\lambda_{max}$.

**c.** For $\beta<\lambda_{max}$: choose $w-w'=v$, a top eigenvector. Then

$$\|Q(w-w')\|=\lambda_{max}\|w-w'\|>\beta\|w-w'\|$$

violating the Lipschitz condition.

**d.** Overparameterization with hidden width 1: end-to-end vector $w=w_2\,w_1$ with $w_1\in\mathbb{R}^d$, $w_2\in\mathbb{R}$. Objective

$$g(w_1,w_2)=f(w_2w_1)=\frac12 w_2^2\,w_1^\top Qw_1$$

Gradient: $\nabla_{w_1}g=w_2^2\,Qw_1$ and $\frac{\partial g}{\partial w_2}=w_2\,w_1^\top Qw_1$ (which factor is the scalar is a labeling choice — symmetric either way).

**e.** Critical point: a pair $(w_1,w_2)$ at which the entire gradient vanishes, $\nabla_{w_1}g=0$ and $\frac{\partial g}{\partial w_2}=0$.

**f.** All critical points are global minima: $Q\succ0$ gives $g\ge0$ with minimum value $0$. At a critical point, either $w_2=0$, whence $g=0$; or $w_2\ne0$, whence $Qw_1=0\Rightarrow w_1=0$ ($Q$ invertible) and again $g=0$. Every critical point attains the global minimum. Overparameterization introduces no spurious critical points here.

**💡 Useful tricks:** For quadratics $\nabla f(w)=Qw$, so smoothness reduces to $\|Q\|_2=\lambda_{max}$ (Lecture 3, Def 1); "prove not $\beta$-smooth" cues an explicit witness pair along the top eigenvector; overparameterized critical points: case-split on the scalar factor ($w_2=0$ vs. $w_2\neq0$).

**⚠️ Watch out:** $\nabla f(w)=Qw$ uses symmetry of $Q$ (else $\tfrac12(Q+Q^\top)w$); prove both regimes, $\beta\ge\lambda_{max}$ works and $\beta<\lambda_{max}$ strictly fails; a critical point requires *all* partials to vanish; $w_1=0$ needs $Q$ invertible ($Q\succ0$).

## Q3 (33 pts) — Finite/countable classes: uniform convergence, PAC-Bayes, and implicit-regularization-aware bounds
**Topics:** hoeffding, uniform-convergence, concentration, pac-bayes, implicit-regularization | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_06_generalization_1, lecture_08_generalization_3, lecture_09_generalization_4
**Statement (English translation):**
(Original is in English; reproduced faithfully.)

Let $\mathcal{H}$ be a finite hypotheses space.

- **(11 pts)** Using Hoeffding's inequality, derive a generalization bound for $\mathcal{H}$ based on uniform convergence.
- **(11 pts)** Derive a similar bound using PAC-Bayes, where the prior is the uniform distribution over $\mathcal{H}$ and the posterior is a deterministic distribution (probability 1 for learned hypothesis, 0 for all the rest). You may use the convention $0\cdot\ln 0=0$.

Assume that $\mathcal{H}$ is countably infinite, i.e. we may write $\mathcal{H}=\{h_k:k\in\mathbb{N}\}$. Suppose that in learning, optimization exhibits an implicit regularization towards hypotheses with low index $k$.

- **(11 pts)** Derive a generalization bound that takes this implicit regularization into account, i.e. in which hypotheses with lower index have tighter guarantee for gap between population and empirical losses.

**Solution sketch:**
**a.** For a fixed $h$, the sample losses are i.i.d. in $[0,1]$, so Hoeffding gives

$$P(L_D(h)-L_S(h)\ge\epsilon)\le e^{-2m\epsilon^2}$$

(factor 2 if two-sided). A union bound over $\mathcal{H}$ with $\delta/|\mathcal{H}|$ each yields: w.p. $\ge1-\delta$,

$$\boxed{\,\forall h\in\mathcal{H}:\ L_D(h)-L_S(h)\le\sqrt{\ln(|\mathcal{H}|/\delta)/(2m)}\,}$$

**b.** PAC-Bayes with uniform prior $P(h)=1/|\mathcal{H}|$ and deterministic posterior $Q=\delta_{h}$:

$$KL(Q\|P)=\sum_{h'}Q(h')\ln\frac{Q(h')}{P(h')}=\ln|\mathcal{H}|$$

(using $0\cdot\ln0=0$). Plugging into the course's PAC-Bayes theorem (Lecture 6, Thm 2: $\ln(2m/\delta)$ in the numerator) gives

$$L_D(h)\le L_S(h)+\sqrt{\big(\ln|\mathcal{H}|+\ln(2m/\delta)\big)/(2(m-1))}$$

— the same $\ln|\mathcal{H}|$ complexity as (a) up to constants (audited against the course statement).

**c.** Non-uniform bound aligned with the implicit bias: place a "prior" over indices $p_k$ with $\sum_k p_k\le1$ favoring small $k$, e.g. $p_k=2^{-k}$. Apply Hoeffding to each $h_k$ with confidence $\delta p_k$ and union bound over $k$. Result: w.p. $\ge1-\delta$,

$$\boxed{\,\forall k\in\mathbb{N}:\ L_D(h_k)-L_S(h_k)\le\sqrt{\big(k\ln2+\ln(1/\delta)\big)/(2m)}\,}$$

— the guarantee is tighter for lower indices, matching the optimizer's implicit regularization. Equivalently via PAC-Bayes: use prior $P(h_k)=2^{-k}$ (valid over countable $\mathcal{H}$) and deterministic posterior on the learned $h_k$, giving $KL=k\ln2$ inside the same square-root bound.

**💡 Useful tricks:** Finite class: fixed-$h$ Hoeffding + union bound at confidence $\delta/|\mathcal{H}|$ (Lecture 6); deterministic posterior collapses $KL(Q\|P)$ to $\ln(1/P(h))$; "tighter for lower index" cues a non-uniform confidence split $\delta p_k$ with $\sum_k p_k\le1$ (e.g. $p_k=2^{-k}$).

**⚠️ Watch out:** Hoeffding needs losses in $[0,1]$ and $h$ fixed before seeing $S$; track the one- vs. two-sided factor 2; PAC-Bayes constants $\ln(2m/\delta)$ and $2(m-1)$ (Lecture 6, Thm 2); state $0\cdot\ln0=0$; verify $\sum_k p_k\le1$.
