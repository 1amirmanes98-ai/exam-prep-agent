# Lecture 1 - Three Pillars of Statistical Learning
- **File:** materials/lectures/lecture_01_three_pillars.pdf | **Text:** materials/text/lectures/lecture_01_three_pillars.txt
- **Pillar:** All three (course overview: Expressiveness, Optimization, Generalization)
- **One-paragraph summary:** Sets up the course's organizing framework: the population loss of a learned predictor decomposes into training error (Optimization), estimation error (Generalization) and approximation error (Expressiveness). In classical ML (soft-SVM with bounded-norm linear predictors and hinge loss) all three pillars are well understood: projected GD drives training error to 0 at rate $B\rho/\sqrt{T}$ (convex, Lipschitz objective), Rademacher-complexity bounds control the estimation error with an explicit bias–variance trade-off in $B$, while expressiveness is the weak point (only linear predictors; classically fixed via feature engineering / kernels — in DL the representation is learned). The lecture then surveys how each pillar behaves in DL: expressiveness is organized around universality, expressive efficiency and inductive bias; optimization is non-convex and its leading candidate explanations (stochasticity, benign landscapes, overparameterization) are each refuted, leaving trajectory/dynamics analysis as the modern view; generalization defies classic uniform-convergence bounds (Zhang et al.: nets fit random labels), forcing bounds $\Delta(m,\delta,\mathcal H,h,S)$ that depend on the returned hypothesis $h$ and the sample $S$, and motivating the study of implicit regularization and the volume hypothesis.

## Outline
1. **Classical Machine Learning** — soft-SVM setting (bounded instances, hinge loss, norm-bounded linear predictors); decomposition of population loss into the three pillars.
   1. *1.1 Optimization (training error)* — Projected Gradient Descent solves the convex 1-Lipschitz empirical problem; $B\rho/\sqrt T$ convergence (Thm 1).
   2. *1.2 Generalization (estimation error)* — Rademacher-complexity-based uniform convergence and estimation-error bounds (Thm 2); bias–variance trade-off in $B$.
   3. *1.3 Expressiveness (approximation error)* — the caveat of classical ML: only linear hypotheses; remedies: feature engineering, kernelizing; in DL the representation is learned.
2. **Deep Learning** — how the pillars behave differently.
   1. *2.1 Expressiveness* — monotone size-parameterized families $\mathcal H_B$; examples (linear, shallow/deep FCNN, CNN); 2.1.1 Universality (Def 1); 2.1.2 Expressive Efficiency (Def 2 + remarks: exponential/polynomial, inapproximability, complete); 2.1.3 Inductive Bias (compact realization of *useful* functions; little formally known).
   2. *2.2 Optimization* — everything non-convex, yet SGD works (ResNet example); candidate explanations: 2.2.1 Stochasticity (refuted by large-batch training); 2.2.2 Benign Landscapes (Ge et al. 2015 / Lee et al. 2016 result; fails for $\geq 3$-layer nets); 2.2.3 Overparameterization (not necessary); 2.2.4 Trajectories/dynamics (modern view).
   3. *2.3 Generalization* — target bound form $\mathcal L_{\mathcal D}(h)-\mathcal L_S(h)\le\Delta(m,\delta,\mathcal H,h,S)$; naive bit-counting bound and why it fails; Zhang et al. experiments; three thrusts: 2.3.1 Bounds on generalization gap (norms / compression / PAC-Bayes); 2.3.2 Implicit Regularization; 2.3.3 Volume of Generalizing Hypotheses.

## Key definitions
**Def (classical learning setting / soft-SVM).** Instance space $\mathcal X=\{\mathbf x\in\mathbb R^d:\|\mathbf x\|_2\le 1\}$; label space $\mathcal Y=\{-1,1\}$; unknown distribution $(\mathbf x,y)\sim\mathcal D$ over $\mathcal X\times\mathcal Y$; loss $\ell(y,\hat y)=\max\{0,\,1-y\cdot\hat y\}$ (hinge loss). Hypotheses class $\mathcal H_B:=\{\mathbf x\mapsto\langle\mathbf w,\mathbf x\rangle:\mathbf w\in\mathbb R^d,\ \|\mathbf w\|_2\le B\}$, parameterized by $B\in\mathbb R_{\ge0}$ (larger $B$ ⟹ larger $\mathcal H_B$). This is "soft-SVM" with regularization coefficient zero.

**Def (empirical / population loss, empirically optimal hypothesis).** Given $S=\{(\mathbf x_i,y_i)\}_{i=1}^m\overset{iid}{\sim}\mathcal D$: $\mathcal L_S(h):=\frac1m\sum_{i=1}^m\ell(y_i,h(\mathbf x_i))$, $h_S^*\in\operatorname{argmin}_{h\in\mathcal H_B}\mathcal L_S(h)$, and $\mathcal L_{\mathcal D}(h):=\mathbb E_{(\mathbf x,y)\sim\mathcal D}\big[\ell(y,h(\mathbf x))\big]$.

**Def (three-pillar error decomposition).** For the returned predictor $\bar h$:
$$\mathcal L_{\mathcal D}(\bar h)=\underbrace{\mathcal L_{\mathcal D}(\bar h)-\mathcal L_{\mathcal D}(h_S^*)}_{\text{training error}}+\underbrace{\mathcal L_{\mathcal D}(h_S^*)-\min_{h\in\mathcal H_B}\mathcal L_{\mathcal D}(h)}_{\text{estimation error}}+\underbrace{\min_{h\in\mathcal H_B}\mathcal L_{\mathcal D}(h)}_{\text{approximation error}}.$$
Optimization ↔ training error, Generalization ↔ estimation error, Expressiveness ↔ approximation error.

**Def (Projected Gradient Descent, PGD).** Receive learning rate $\eta>0$; initialize $\mathbf w^{(1)}=\mathbf 0$; for $t=0,2,\dots,T-1$ (as printed in the notes; the loop runs $T$ gradient steps): gradient update

$$\mathbf w^{(t+\frac12)}=\mathbf w^{(t)}-\eta\nabla\mathcal L_S(\mathbf w^{(t)})$$

projection
$$\mathbf w^{(t+1)}=\operatorname*{argmin}_{\mathbf w\in\mathbb R^d,\|\mathbf w\|_2\le B}\big\|\mathbf w-\mathbf w^{(t+\frac12)}\big\|_2=\begin{cases}\mathbf w^{(t+\frac12)}, & \|\mathbf w^{(t+\frac12)}\|_2\le B\\[2pt] \mathbf w^{(t+\frac12)}\cdot\frac{B}{\|\mathbf w^{(t+\frac12)}\|_2}, & \text{otherwise}\end{cases}$$
Return $\bar{\mathbf w}:=\frac1T\sum_{t=1}^T\mathbf w^{(t)}$ (average of iterates, not last iterate).

**Def (classical fixes for expressiveness).** *Feature engineering*: each coordinate of $\mathbf x$ holds a measurement designed by domain experts. *Kernelizing*: off-the-shelf non-linear map $\phi:\mathbb R^d\to\mathbb R^{d'}$ (typically $d'\gg d$) applied to all instances at train and test time. Conventional view: **with DL the representation is learned**.

**Def (monotone size-parameterized hypotheses space).** $\mathcal H_B\subseteq\mathcal Y^{\mathcal X}$ parameterized by $B\in\mathbb R_{\ge0}$, required to be monotonic w.r.t. $B$:

$$B_1<B_2\implies\mathcal H_{B_1}\subseteq\mathcal H_{B_2}$$

$B$ is called the "size" of $\mathcal H_B$. Examples:
- Linear, norm bounded: $\mathcal H_B=\{\mathbf x\mapsto\langle\mathbf w,\mathbf x\rangle:\mathbf w\in\mathbb R^d,\|\mathbf w\|_2\le B\}$.
- Shallow (2-layer) FCNN, hidden width $B\in\mathbb N$: $\mathcal H_B=\{\mathbf x\mapsto W_2\,\sigma(W_1\mathbf x):W_1\in\mathbb R^{B,d},\,W_2\in\mathbb R^{k,B}\}$.
- Deep ($L$-layer) FCNN, hidden width $B\in\mathbb N$: $\mathcal H_B=\{\mathbf x\mapsto W_L\,\sigma(W_{L-1}\cdots\sigma(W_1\mathbf x)\cdots):W_1\in\mathbb R^{B,d},\ \forall l\in\{2,\dots,L-1\},W_l\in\mathbb R^{B,B},\ W_L\in\mathbb R^{k,B}\}$.
- CNN with hidden conv width $B$ and hidden fully connected widths $5B$ (illustrated by a LeNet-style figure in the notes).

**Def 1 (universality).** Let $\mathcal F\subseteq\mathcal Y^{\mathcal X}$ be a set of desired target functions (e.g., continuous functions) and $d(\cdot,\cdot):\mathcal Y^{\mathcal X}\times\mathcal Y^{\mathcal X}\to\mathbb R_{\ge0}$ a distance over functions (e.g., $d(f_1,f_2)=\sup_{\mathbf x\in\mathcal X}|f_1(\mathbf x)-f_2(\mathbf x)|$). $\mathcal H_B$ is **$\mathcal F$-universal in the sense of $d(\cdot,\cdot)$** when
$$\forall\epsilon>0,\ f\in\mathcal F,\ \exists B\in\mathbb R_{\ge0},\ h\in\mathcal H_B\ \text{s.t.}\ d(f,h)<\epsilon.$$

**Def 2 (expressive efficiency).** Let $\mathcal H_B,\bar{\mathcal H}_{\bar B}\subseteq\mathcal Y^{\mathcal X}$ with size parameters $B,\bar B\in\mathbb R_{\ge0}$. $\bar{\mathcal H}_{\bar B}$ is **expressively efficient w.r.t.** $\mathcal H_B$ if:
1. $\forall B,\ \exists\bar B\in O(B)$ s.t. $\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B}$; and
2. $\exists\bar h\in\bar{\mathcal H}_{\bar B}$ for "reasonable" $\bar B$ s.t. $\bar h\notin\mathcal H_B$ unless $B$ is "prohibitively large".

Refinements (Remarks): **exponentially expressively efficient** — $B$ must be exponential in problem dimensions while $\bar B$ is polynomial; **polynomially expressively efficient** — $B\in\mathrm{poly}(\bar B)$ with super-linear $\mathrm{poly}(\cdot)$; **inapproximability strengthening** — replace "$\bar h\notin\mathcal H_B$" by "$d(\bar h,\mathcal H_B):=\inf_{h\in\mathcal H_B}d(\bar h,h)>\epsilon$" for some $\epsilon>0$; **complete expressive efficiency** — almost all (in the measure-theoretic sense) $\bar h\in\bar{\mathcal H}_{\bar B}$ lie outside the reach of $\mathcal H_B$ (unless $B$ is prohibitive).

**Def (inductive bias — expressiveness context).** The ability of NNs to represent, **with compact size**, functions that are useful for real-world tasks. Even if $\bar{\mathcal H}_{\bar B}$ is universal and expressively efficient w.r.t. $\mathcal H_B$, that does not imply it gives access to useful functions when $\bar B$ is limited to practical size.

**Def (strict saddle; margin note in 2.2.2).** A saddle point is *strict* if the Hessian there has eigenvalues $<0$ (at least one strictly negative eigenvalue), and *non-strict* otherwise.

**Def (overparameterization).** The situation where a NN has far more learnable parameters (weights) than training constraints (examples).

**Def (DL generalization bound, target form).** $\forall\delta\in(0,1)$, w.p. $\ge1-\delta$ over $S\overset{iid}{\sim}\mathcal D^m$:
$$\mathcal L_{\mathcal D}(h)-\mathcal L_S(h)\le\Delta(m,\delta,\mathcal H,h,S),$$
where $\mathcal D$ = unknown distribution, $S$ = training set of size $m$, $\mathcal H$ = hypotheses space realizable by the architecture, $h\in\mathcal H$ = hypothesis returned by training, $\mathcal L_{\mathcal D}(h)$/$\mathcal L_S(h)$ = population/empirical loss, and $\Delta$ may depend on all arguments (and constants). Desiderata: tight (accurate) *and* insightful. (A held-out validation set gives a tight but non-insightful "bound".) In classic bounds $\Delta$ depends only on $(m,\delta,\mathcal H)$ — uniform convergence, data-independent.

**Def (volume hypothesis).** The conjecture that generalizing hypotheses have large "volume" within the hypotheses that fit the training data, i.e., most hypotheses fitting the training data generalize well; if true, convergence to generalizing solutions is due to architecture + data distribution (generalization likely under *any* non-adversarial fitting method), not special properties of the algorithm.

## Key theorems & results
**Prop 1.** $\mathcal L_S(\mathbf w):\mathbb R^d\to\mathbb R$ (hinge-loss empirical objective of soft-SVM) is convex and 1-Lipschitz:

$$|\mathcal L_S(\mathbf w_1)-\mathcal L_S(\mathbf w_2)|\le\|\mathbf w_1-\mathbf w_2\|_2$$

for all $\mathbf w_1,\mathbf w_2\in\mathbb R^d$.

**Proof idea:** hinge loss is convex and, with $\|\mathbf x_i\|_2\le1$, 1-Lipschitz in $\mathbf w$; both properties survive max, composition with linear maps, and averaging.

**Exam relevance:** supplies exactly the hypotheses of Thm 1 with $\rho=1$.

**Thm 1 (projected GD on convex Lipschitz functions).** Let $f$ be convex and $\rho$-Lipschitz, and $\mathbf w^*\in\operatorname{argmin}_{\mathbf w\in\mathbb R^d,\|\mathbf w\|_2\le B}f(\mathbf w)$. Running projected GD on $f$ for $T$ steps with $\eta=\sqrt{\frac{B^2}{\rho^2T}}$ yields
$$f(\bar{\mathbf w})-f(\mathbf w^*)\le\frac{B\rho}{\sqrt T}.$$

**Proof idea:** standard convex-optimization telescoping of $\|\mathbf w^{(t)}-\mathbf w^*\|^2$; projection onto the convex ball only shrinks distance; see SSBD [2] ch. 14.

**Exam relevance:** with Prop 1 it shows training error of soft-SVM can be made arbitrarily small ⟹ "Optimization ≈ solved" in classical ML.

**Thm 2 (Rademacher-complexity generalization bounds for soft-SVM).** For any $\delta\in(0,1)$, w.p. $\ge1-\delta$ over $S$:
$$\forall h\in\mathcal H_B,\quad \mathcal L_{\mathcal D}(h)-\mathcal L_S(h)\le\frac{2B}{\sqrt m}+(B+1)\sqrt{\frac{2\ln(2/\delta)}{m}}\qquad\text{(Uniform convergence)}$$
and, w.p. $\ge1-\delta$ over $S$:
$$\mathcal L_{\mathcal D}(h_S^*)-\min_{h\in\mathcal H_B}\mathcal L_{\mathcal D}(h)\le\frac{2B}{\sqrt m}+5(B+1)\sqrt{\frac{2\ln(8/\delta)}{m}}\qquad\text{(Bound on estimation error)}$$

**Proof idea:** bound the Rademacher complexity of norm-bounded linear class composed with 1-Lipschitz hinge loss; see SSBD [2] ch. 26.

**Exam relevance:** holds for **any** distribution $\mathcal D$; uniform convergence holds for all $h$ **jointly**; exhibits the **bias–variance trade-off**: increasing $B$ (expanding $\mathcal H_B$) enlarges the estimation-error bound, decreasing $B$ shrinks it.

**Result (benign landscapes; cf. Ge et al. 2015, Lee et al. 2016 — from the figure box in 2.2.2).** If (1) there are no poor local minima, and (2) all saddle points are strict, then GD converges to a global minimum (also applies to SGD).

**Proof idea:** not proven in course; cited as the motivation for the critical-point-characterization research program.

**Exam relevance:** the approach **cannot** apply to $\ge3$-layer NNs: for an FCNN with no biases at the all-zero weights, both gradient and Hessian vanish, so (excluding the trivial global-min case) that point is either a bad local minimum or a **non-strict saddle** — violating the conditions. Hence benign-landscape analysis is no longer viewed as a promising avenue for DL optimization.

**Result (naive uniform-convergence bound for any NN).** If $b$ is the number of bits required to store the weights, then $|\mathcal H|\le 2^b$ and, by the classic finite-class uniform convergence bound, w.p. $\ge1-\delta$:
$$\mathcal L_{\mathcal D}(h)-\mathcal L_S(h)\le\sqrt{\frac{b+\log(2/\delta)}{2m}}.$$

**Proof idea:** union bound (Hoeffding + $|\mathcal H|\le2^b$).

**Exam relevance:** meaningful only when $m\gtrsim b$ (∼# weights); in practice nets train with far fewer examples than weights, and increasing net size often *shrinks* the observed generalization gap while this bound *grows*.

**Result (Zhang et al. [3], empirical).** (i) Explicit regularization is not necessary for overparameterized NNs (trained via SGD or variants) to generalize well; (ii) overparameterized NNs can easily fit random data and/or random labels.

**Proof idea:** systematic experiments (train on true vs. randomized labels/inputs).

**Exam relevance:** implies some low-empirical-loss hypotheses generalize and others don't ⟹ $\Delta$ must depend on $h$; the same $h$ can have small gap on one task and large gap on another (e.g., training data supplemented with pure noise) ⟹ $\Delta$ should depend on $S$ too. Kills purely uniform-convergence, data-independent bounds for DL.

## Techniques & tricks
- **Add-and-subtract decomposition** of the population loss into training + estimation + approximation errors — the template for the whole course.
- **Projection step analysis**: projecting onto a convex set (the $B$-ball) as an $\operatorname{argmin}$, with the explicit rescaling formula; averaging the iterates $\bar{\mathbf w}=\frac1T\sum_t\mathbf w^{(t)}$ rather than returning the last iterate.
- **Rademacher complexity** as the tool to get distribution-free uniform convergence for bounded-norm linear classes (proofs referenced to SSBD ch. 26, not carried out).
- **Finite-class / bit-counting union bound**: $b$ bits ⟹ $|\mathcal H|\le2^b$ ⟹ $\sqrt{(b+\log(2/\delta))/(2m)}$ gap bound; standard first attempt at a NN generalization bound.
- **Counterexample at zero weights** (FCNN without biases, all weights $=0$: gradient and Hessian both vanish) to rule out landscape-based analyses for depth $\ge3$.
- **Refutation-by-practice pattern**: stochasticity refuted by large-batch training; overparameterization refuted by successful training with #examples ≫ #weights; sharp-minima implicit regularization weakened by large-batch generalization.

## Exam-relevant nuggets
- Be able to write the exact three-term decomposition of $\mathcal L_{\mathcal D}(\bar h)$ and name which pillar each term belongs to (training ↔ Optimization, estimation ↔ Generalization, approximation ↔ Expressiveness).
- Thm 1 constants: $\eta=\sqrt{B^2/(\rho^2T)}$, rate $B\rho/\sqrt T$; requires convexity + $\rho$-Lipschitzness + optimization over the $B$-ball; output is the *average* iterate. For soft-SVM, $\rho=1$ (Prop 1).
- Thm 2 exact constants differ between the two bounds: $(B+1)\sqrt{2\ln(2/\delta)/m}$ (uniform convergence) vs. $5(B+1)\sqrt{2\ln(8/\delta)/m}$ (estimation error) — both share the $\frac{2B}{\sqrt m}$ term. Both hold for any $\mathcal D$.
- Monotonicity requirement $B_1<B_2\Rightarrow\mathcal H_{B_1}\subseteq\mathcal H_{B_2}$ is part of the definition of a size-parameterized family — expect to verify it for concrete architectures.
- Def 1 (universality) and Def 2 (expressive efficiency) are verbatim exam material; know the three strengthenings: exponential vs. polynomial efficiency, inapproximability ($d(\bar h,\mathcal H_B)>\epsilon$), and complete expressive efficiency (almost all $\bar h$).
- Universality is the most theoretically established aspect of DL ("universal approximation theorems", late 80s); typically proven for shallow nets of width $B$, with deep universality following from shallow. Expressive efficiency results mostly concern depth (shallow vs. deep), are related to depth separation in circuit complexity, and some establish inapproximability / complete efficiency. About inductive bias of expressiveness little is formally known (defining "useful for real-world tasks" is outside classical learning theory).
- Optimization: every DL empirical loss minimization program is non-convex — **even a 2-layer linear (no activation) FCNN**. Know all four candidate explanations and precisely why the first three are discounted: stochasticity (large-batch works), benign landscapes (zero-weight counterexample for $\ge3$ layers), overparameterization (training succeeds even with #examples ≫ #weights). The modern view: analyze **trajectories/dynamics** (results exist for shallow nets, linear NNs, and prohibitively wide non-linear NNs; realistic deep nets open).
- Benign-landscape result conditions: (1) no poor local minima, (2) all saddles strict; conclusion: GD (and SGD) converges to global min. Definition of strict saddle (negative Hessian eigenvalue) is in a handwritten margin note.
- Generalization: memorize the bound form $\Delta(m,\delta,\mathcal H,h,S)$ and the argument for why dependence on $h$ (from Zhang et al. point (i)) and on $S$ (same hypothesis, different tasks) is necessary.
- Three thrusts of DL generalization theory: (1) tight+insightful bounds on the gap — norm-based, compression-based, PAC-Bayes ($\Delta$ decreasing in weight norms / compressed size / "distance" from prior); some can shrink as network size grows, but none are tight, and indirect dependence on $m$ (via $h$) can make $\Delta$ **grow** with more data — a known pathology; (2) implicit regularization — sharp-minima/stochasticity story weakened; norm (or quasinorm) minimization proven for simple models but provably not the general story ⟹ study trajectories; (3) volume hypothesis — evidence is mixed: demonstrated empirically and proven in certain settings, refuted (empirically and theoretically) in others, including natural ones.
- Common trap: the naive bit-bound is not vacuous mathematically — it just requires $m\sim b$; its failure in DL is that practice violates that regime and the bound moves in the wrong direction as width grows.
- Notation quirk of the notes: PGD loop is printed as "$t=0,2,\dots,T-1$" (evidently a typo; $T$ update steps with $\mathbf w^{(1)}=\mathbf 0$ and averaged output $\frac1T\sum_{t=1}^T\mathbf w^{(t)}$).
