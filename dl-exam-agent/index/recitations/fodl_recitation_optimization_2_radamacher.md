# Recitation: Optimization Exercises 2 + Rademacher Complexity (Recitation 9)
- **File:** materials/recitations/fodl_recitation_optimization_2_radamacher.pdf
- **Related lectures:** lecture_04_optimization_2, lecture_06_generalization_1 (setting also in lecture_01_three_pillars)
- **Summary:** Two-part recitation bridging the optimization and generalization halves of the course. Part 1 analyzes 1-D linear regression overparameterized by a depth-$N$ linear network of hidden width 1, $\phi(w_1,\dots,w_N)=L_S(\prod_i w_i)$: it is non-convex, has infinitely many global minima, for $N=2$ has no bad local minima and only strict saddles, and under gradient flow the "unbalancedness" $w_1^2-w_2^2$ is conserved, yielding a closed form for the limit point. Part 2 defines Rademacher complexity (slides spell it "Radamacher"), interprets it as the ability to fit random signs, computes it for extreme examples, and proves the high-probability generalization bound $L_D(h)-L_S(h)\le 2R(\ell\circ\mathcal{H}\circ S) + 3\sqrt{2\ln(4/\delta)/m}$ via Lemma 26.2 of Shalev-Shwartz & Ben-David plus McDiarmid's inequality, including verification of the bounded-differences condition.

## Topics covered
- Overparameterized linear regression: $\ell_2$ loss $L_S(w)=\frac1m\|wx-\mathbf{y}\|^2$ over scalar linear models, overparameterized by a depth-$N\ge2$, width-1 linear NN
- Non-convexity via a critical point that is not a global minimum; infinitely many global minima via rescaling symmetry
- Landscape for $N=2$: no bad (non-global) local minima, no non-strict saddles; Hessian analysis of the saddle at the origin
- Conservation law under GF (balancedness) and closed-form limit of the flow
- Generalization setting: $\mathcal{X},\mathcal{Y},\mathcal{D},S\sim\mathcal{D}^m,\mathcal{H}$, loss bounded by 1, population loss $L_\mathcal{D}$, empirical loss $L_S$
- Rademacher complexity of a set $A\subseteq\mathbb{R}^m$; the loss-composition set $\ell\circ\mathcal{H}\circ S$
- Interpretation (fit a random subset while "anti-fitting" the rest) and examples (singleton, full cube $\{\pm1\}^m$)
- Rademacher-based generalization bound; McDiarmid's inequality; bounded-differences verification

## Worked problems / derivations
**P1.** Explicit expression for the overparameterized objective.
Technique: direct substitution: $\phi(w_1,\dots,w_N) = L_S\big(\prod_{i=1}^N w_i\big) = \frac1m\big\|\big(\prod_{i=1}^N w_i\big)x - \mathbf{y}\big\|^2$, with $x,\mathbf{y}\in\mathbb{R}^m$, $x\ne0$, $\langle x,\mathbf{y}\rangle>0$.

**P2.** $\phi$ is non-convex.
Technique: exhibit a critical point that is not a global minimum: chain rule gives $\frac{\partial\phi}{\partial w_j} = \nabla L_S\big(\prod_i w_i\big)\prod_{k\ne j}w_k$, so $\nabla\phi(0)=0$ (for $N\ge2$); but $L_S$ is convex with unique minimizer $w^* = \frac{\langle x,\mathbf{y}\rangle}{\|x\|^2} > 0$, so $\phi(0)=L_S(0) > L_S(w^*) = \phi(w^*,1,\dots,1)$.

**P3.** $\phi$ has infinitely many global minima.
Technique: rescaling symmetry of the product parameterization: for every $c>0$, $\theta_c := (cw^*, \tfrac1c, 1,\dots,1)^\top$ satisfies $\phi(\theta_c) = L_S(w^*)$, hence a continuum of global minimizers.

**P4.** For $N=2$: no bad local minima and no non-strict saddles.
Technique: critical points satisfy $\nabla L_S(w_1w_2)=0$ (then $(w_1,w_2)$ is a global min since $w_1w_2$ minimizes $L_S$) or $w_1=w_2=0$. At $(0,0)$ compute the Hessian: $\partial^2_{w_1}\phi(0,0)=\partial^2_{w_2}\phi(0,0)=0$, $\partial^2_{w_1w_2}\phi(0,0) = \nabla L_S(0) = -\frac2m\langle x,\mathbf{y}\rangle$; then $\nabla^2\phi(0,0)\binom{1}{1} = -\frac2m\langle x,\mathbf{y}\rangle\binom{1}{1}$ exhibits a negative eigenvalue $\Rightarrow$ strict saddle.

**P5.** GF limit with unbalanced init: $c := w_1(0)^2 - w_2(0)^2 > 0$, assuming convergence to a global minimizer with $w_1(\infty)>0$; derive the limit in closed form.
Technique: conservation law — chain rule gives $\frac{d}{dt}w_1(t)^2 = -2w_1w_2\nabla L_S(w_1w_2) = \frac{d}{dt}w_2(t)^2$, so $w_1(t)^2 - w_2(t)^2 \equiv c$ ("balancedness conservation"). Combine with $w_1(\infty)w_2(\infty) = w^*$: solve the quadratic in $w_2(\infty)^2$ to get $w_2(\infty) = \sqrt{\tfrac{-c+\sqrt{c^2+4(w^*)^2}}{2}}$, $w_1(\infty) = \sqrt{\tfrac{c+\sqrt{c^2+4(w^*)^2}}{2}}$.

**P6.** Rademacher complexity of extreme sets: (a) $A=\{a'\}\Rightarrow R(A)=0$; (b) $A=\{1,-1\}^m\Rightarrow R(A)=1$.
Technique: (a) linearity of expectation with $\mathbb{E}[\sigma_i]=0$; (b) upper bound $\sum_i\sigma_ia_i\le m$ and achieve it with $a=\sigma\in A$ (so the sup equals $m$ for every realization).

**P7.** Theorem 1 (generalization bound): for any $\delta\in(0,1)$, w.p. $\ge 1-\delta$ over $S\sim\mathcal{D}^m$, $\forall h\in\mathcal{H}:\ L_\mathcal{D}(h)-L_S(h) \le 2R(\ell\circ\mathcal{H}\circ S) + 3\sqrt{\frac{2\ln(4/\delta)}{m}}$.
Technique: work with $\Delta(S) := \sup_{h\in\mathcal{H}}[L_\mathcal{D}(h)-L_S(h)]$. (i) In-expectation step: $\mathbb{E}_S[\Delta(S)] \le 2\mathbb{E}_S[R(\ell\circ\mathcal{H}\circ S)]$ (Lemma 26.2, "Understanding ML"). (ii) Concentration: both $\Delta(S)$ and $R(\ell\circ\mathcal{H}\circ S)$ satisfy McDiarmid's bounded-differences condition with $c=\frac2m$, giving each $\sqrt{\frac2m\ln\frac{2}{\delta'}}$ deviations; take $\delta'=\delta/2$ and union bound. (iii) Chain the three inequalities; constants combine to $2R + 3\sqrt{\frac2m\ln\frac4\delta}$.

**P8.** Bounded-differences verification ($c=\frac2m$) for $\Delta(S)$ and $R(\ell\circ\mathcal{H}\circ S)$.
Technique: replace one example $(x_j,y_j)\to(x_j',y_j')$; use $\sup f - \sup g \le \sup(f-g)$, cancel the $m-1$ shared terms, and bound the remaining single term by $\frac2m$ using $|\ell|\le1$ (and $|\sigma_j|=1$ for the Rademacher case); symmetrize to get absolute value.

## Key formulas & facts
- $L_S(w) = \frac1m\sum_{i=1}^m (wx_i-y_i)^2 = \frac1m\|wx-\mathbf{y}\|^2$; unique minimizer $w^* = \frac{\langle x,\mathbf{y}\rangle}{\|x\|^2}$
- Product-parameterization gradient: $\frac{\partial\phi}{\partial w_j} = \nabla L_S\big(\prod_{i=1}^N w_i\big)\prod_{k\ne j}w_k$
- Balancedness conservation under GF (depth 2): $w_1(t)^2 - w_2(t)^2 = w_1(0)^2 - w_2(0)^2$ for all $t$
- Limit of GF: $w_{1,2}(\infty) = \sqrt{\frac{\pm c+\sqrt{c^2+4(w^*)^2}}{2}}$ with $w_1(\infty)w_2(\infty)=w^*$
- Hessian at origin (N=2): $\nabla^2\phi(0,0) = \begin{pmatrix}0 & -\frac2m\langle x,\mathbf{y}\rangle\\ -\frac2m\langle x,\mathbf{y}\rangle & 0\end{pmatrix}$, eigenvalues $\pm\frac2m\langle x,\mathbf{y}\rangle$ ⇒ strict saddle
- Rademacher variables: $\Pr(\sigma_i=1)=\Pr(\sigma_i=-1)=\frac12$, i.i.d.
- Rademacher complexity: $R(A) := \frac1m\,\mathbb{E}_\sigma\Big[\sup_{a\in A}\sum_{i=1}^m \sigma_i a_i\Big]$, typically applied to $\ell\circ\mathcal{H}\circ S := \{(\ell(y_1,h(x_1)),\dots,\ell(y_m,h(x_m))) : h\in\mathcal{H}\}$
- $R(\{a'\})=0$; $R(\{\pm1\}^m)=1$
- Lemma 26.2 (SSBD): $\mathbb{E}_{S\sim\mathcal{D}^m}[\Delta(S)] \le 2\,\mathbb{E}_{S\sim\mathcal{D}^m}[R(\ell\circ\mathcal{H}\circ S)]$
- McDiarmid: bounded differences $\le c$ ⇒ w.p. $\ge1-\delta$, $|f(X_1,\dots,X_m) - \mathbb{E}f| \le c\sqrt{\frac m2\ln\frac2\delta}$
- Theorem 1: w.p. $\ge1-\delta$, $\forall h\in\mathcal{H}$: $L_\mathcal{D}(h)-L_S(h) \le 2R(\ell\circ\mathcal{H}\circ S) + 3\sqrt{\frac{2\ln(4/\delta)}{m}}$

## Exam-relevant nuggets
- Standard recipe for proving non-convexity: find a critical point ($\nabla=0$) that is not a global minimum — here $0$ works for any depth $N\ge2$ because every partial derivative contains a product of the other weights.
- Balancedness conservation $\frac{d}{dt}(w_1^2-w_2^2)=0$ is *the* signature conservation law of linear networks under GF (matches lecture 4); expect a question asking to derive it and use it to pin down the limit point.
- Strict-saddle certification = compute the Hessian at the suspect critical point and exhibit one negative-eigenvalue direction (here $(1,1)$); no need for the full spectrum.
- Rademacher intuition to quote: measures $\mathcal{H}$'s ability to fit random labels/signs on $S$ ("fit the $\sigma_i=1$ part, anti-fit the rest"); $R=1$ for a class realizing all sign patterns means the bound is vacuous — connects to the random-label experiments motivating the generalization lectures.
- The Theorem-1 proof skeleton (in-expectation symmetrization lemma → McDiarmid twice → union bound with $\delta/2$ → constants $2$ and $3$) and the bounded-differences computation with $c=2/m$ are highly testable, self-contained arguments.
- Spelling note: slides write "Radamacher"; the standard spelling is Rademacher (Lemma 26.2 reference: Shalev-Shwartz & Ben-David, *Understanding Machine Learning*).
