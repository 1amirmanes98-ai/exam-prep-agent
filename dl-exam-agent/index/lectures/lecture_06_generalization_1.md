# Lecture 6 – Generalization 1
- **File:** materials/lectures/lecture_06_generalization_1.pdf | **Text:** materials/text/lectures/lecture_06_generalization_1.txt
- **Pillar:** Generalization
- **One-paragraph summary:** Sets up the formal supervised-learning framework for the generalization pillar and poses the central goal: post-training bounds of the form $L_D(\hat h)-L_S(\hat h)\le \Delta(m,\delta,H,\hat h,S)$ holding w.p. $\ge 1-\delta$ over $S\sim D^m$, which should be both tight and insightful (the validation-error estimate is tight but insight-free). It records four empirical phenomena (Zhang et al.) about overparametrized networks — good generalization without explicit regularization, perfect fitting of arbitrary/random labels, partial-random-data settings, adversarial label corruption — and uses them as falsification tests for four families of bounds: uniform convergence via discretization (fails: needs $m\gtrsim$ #bits, distribution-oblivious, ignores $\hat h$), compression (inherit generalization of a small class $H'$ at the price of $2\rho\, d(\hat h,H')$; rank-1-compression example), Rademacher-complexity/norm-based bounds (data-dependent, but only through $\max_i\|x_i\|$, and exponential in depth), and PAC-Bayes (KL-to-prior bound; the Gaussian prior/posterior instantiation yields the "flat minimum + low norm" criterion and depends on both $\hat h$ and $S$, so it can in principle explain all four phenomena, though it is non-analytic and numerically loose). Recurring lesson: tight bounds must explicitly depend on the learned hypothesis $\hat h$ and on the training set $S$.

## Outline
0. **Setup (preamble, unnumbered).** Learning setting ($X,Y,D,S,H,\ell,L_D,L_S$), the target bound $\Delta(m,\delta,H,\hat h,S)$, and the validation-error example: tight (Hoeffding) but uninsightful.
1. **Empirical Phenomena.** Four facts (Zhang et al. [7]) about standard overparametrized networks that any candidate theory must reproduce.
2. **Generalization Bounds.** Four approaches:
   - 2.1 **Uniform Convergence.** Bound $L_D-L_S$ jointly over all $h\in H$; simplest derivation via discretization ($|H|\le 2^b$); why UC alone is insufficient.
   - 2.2 **Compression.** $\hat h$ approximable by $h'\in H'$ (small class) inherits $H'$'s generalization + Lipschitz residual; example: compressing weight matrices to rank 1, spectral-norm error recursion.
   - 2.3 **Radamacher Complexity and Norms** (notes' spelling; standard: Rademacher). Data-dependent complexity $R(\ell\circ H\circ S)$; generalization bound; union over nested subclasses $H_1\subseteq H_2\subseteq\cdots$; norm-based (product of Frobenius norms) bound and its shortcomings.
   - 2.4 **PAC-Bayes.** Bounds for distributions $Q$ over $H$ in terms of $\mathrm{KL}(Q\|P)$ to a data-independent prior $P$; Gaussian instantiation → flat minima & low parameter norm.

## Key definitions
**Def (learning setting).** $X\subseteq\mathbb{R}^d$ instance space; $Y\subseteq\mathbb{R}^k$ label space; $D$ the world's (unknown) distribution over $X\times Y$; $S=\{(x_i,y_i)\}_{i=1}^m\sim D^m$ i.i.d. training set; $H=\{h_\theta: X\to\mathbb{R}^k \,|\, \theta\in\Theta\}$ hypotheses space (predictors realizable by the architecture, parameter space $\Theta$); $\ell: Y\times\mathbb{R}^k\to\mathbb{R}_{\ge 0}$ loss, assumed **bounded (w.l.o.g. in $[0,1]$) and $\rho$-Lipschitz in its second argument**.

**Def (population / training loss).** $L_D(h):=\mathbb{E}_{(x,y)\sim D}[\ell(y,h(x))]$; $L_S(h):=\mathbb{E}_{(x,y)\sim S}[\ell(y,h(x))]=\frac{1}{m}\sum_{i=1}^m \ell(y_i,h(x_i))$.

**Def (goal: generalization bound).** For any $\delta\in(0,1)$, w.p. $\ge 1-\delta$ over $S\sim D^m$: $L_D(\hat h)-L_S(\hat h)\le \Delta(m,\delta,H,\hat h,S)$, where $\hat h\in H$ is the hypothesis returned by the training algorithm and $\Delta(\cdot)$ depends only on its arguments (and constants).

**Def (validation error).** Learn $\hat h$ on the first $m/2$ examples; $L_V(\hat h):=\frac{2}{m}\sum_{i=m/2+1}^{m}\ell(y_i,\hat h(x_i))$.

**Def (compression distance).** For $h\in H$ and a smaller class $H'$: $d(h,H'):=\min_{h'\in H'}\sup_{x\in X}\|h(x)-h'(x)\|$ (magnitude of the compression residual).

**Def 1 (Rademacher complexity).** For $\ell\circ H\circ S:=\{(\ell(y_1,h(x_1)),\dots,\ell(y_m,h(x_m))) : h\in H\}\subseteq\mathbb{R}^m$,

$$R(\ell\circ H\circ S):=\frac{1}{m}\,\mathbb{E}_{\xi}\Big[\sup_{v\in \ell\circ H\circ S}\sum_{i=1}^m \xi_i v_i\Big],$$

where $\xi_1,\dots,\xi_m$ are i.i.d. with $\Pr(\xi_i=1)=0.5=\Pr(\xi_i=-1)$. Interpretation: ability of $H$ to fit (low loss) a random subset of $S$ while "anti-fitting" (high loss) the remainder.

**Def (norm-bounded subclass $H_c$).** For the feed-forward fully connected ReLU net $H=\{x\mapsto W_N\sigma(W_{N-1}(\cdots\sigma(W_1x)\cdots))\}$ with $x\in\mathbb{R}^d$, $y\in\mathbb{R}$, $W_1\in\mathbb{R}^{d',d}$, $W_2,\dots,W_{N-1}\in\mathbb{R}^{d',d'}$, $W_N\in\mathbb{R}^{1,d'}$, $\sigma(z)=\max\{z,0\}$, no biases: for $c>0$,

$$H_c:=\Big\{h\in H : \exists\, W_1,\dots,W_N \text{ s.t. } \prod_{n=1}^N\|W_n\|_F\le c \,\wedge\, h(x)\equiv W_N\sigma(W_{N-1}(\cdots\sigma(W_1x)\cdots))\Big\}.$$

**Def (losses of a distribution over hypotheses).** For a distribution $Q$ over $H$: $L_D(Q):=\mathbb{E}_{h\sim Q}[L_D(h)]$, $L_S(Q):=\mathbb{E}_{h\sim Q}[L_S(h)]$.

**Def 2 (KL divergence).** $\mathrm{KL}(Q\|P):=\mathbb{E}_{h\sim Q}\big[\ln\frac{Q(h)}{P(h)}\big]$.

## Key theorems & results
**Empirical phenomena (Zhang et al. [7]).** (1) Standard NNs (e.g., AlexNet) trained by standard algorithms (SGD+momentum) on standard data (CIFAR-10) generalize well **without any explicit regularization**, even with #parameters $\gg$ #examples. (2) In that regime training error $\approx 0$, and this persists for essentially **any** training set of the same size — even random instances and/or labels are perfectly fit. (3) If **half** the training set is replaced by random data (random instances and labels), test error of the learned hypothesis (train error $\approx 0$) is **far better than trivial**. (4) **Adversarially** manipulating half the training labels can significantly deteriorate test error (train error still $\approx 0$). (Exercise: reproduce experimentally.)

**Exam relevance:** these are the yardsticks; know which bound fails which phenomenon.

**Fact (validation bound; Hoeffding).** Since $\ell\in[0,1]$: $\Pr\big(|L_V(\hat h)-L_D(\hat h)|\ge\epsilon\big)\le 2\exp(-m\epsilon^2)$, hence for any $\delta\in(0,1)$, w.p. $\ge 1-\delta$: $L_D(\hat h)-L_V(\hat h)\le\sqrt{\ln\frac{2}{\delta}\cdot\frac{1}{m}}$.

**Proof idea:** Hoeffding on the $m/2$ held-out i.i.d. losses; $\hat h$ is independent of them.

**Exam relevance:** prototype of "tight but uninsightful."

**Prop 1 (finite-class / discretization UC bound).** If $|H|\le 2^b$ ($b$ = #bits to represent the weights) then for any $\delta\in(0,1)$, w.p. $\ge 1-\delta$ over $S\sim D^m$:

$$L_D(\hat h)-L_S(\hat h)\le\sqrt{\frac{(b+1)\ln(2)+\ln\big(\frac{1}{\delta}\big)}{2m}}.$$

**Proof idea:** for fixed $h$, Hoeffding gives $\Pr(|L_D(h)-L_S(h)|\ge\epsilon)\le 2e^{-2m\epsilon^2}$; union bound over $|H|$ hypotheses; solve $2|H|e^{-2m\epsilon^2}=\delta$, use $|H|\le 2^b$. Actually proves the two-sided $\forall h\in H: |L_D(h)-L_S(h)|\le\sqrt{\frac{1}{2m}\ln\frac{2|H|}{\delta}}$.

**Exam relevance:** know the constants $(b+1)\ln 2$ and why non-vacuity needs $m\gtrsim b$ (practice has $b\gg m$).

**Prop 2 (compression bound).** If $|H'|\le 2^b$ then for any $\delta\in(0,1)$, w.p. $\ge 1-\delta$ over $S\sim D^m$:

$$L_D(\hat h)-L_S(\hat h)\le\sqrt{\frac{(b+1)\ln(2)+\ln\big(\frac{1}{\delta}\big)}{2m}}+2\rho\cdot d(\hat h,H'),$$

$\rho$ = Lipschitz constant of $\ell$. Proof idea: apply Prop 1 to $H'$; take $\hat h'\in\arg\min_{h'\in H'}\sup_x\|\hat h(x)-h'(x)\|$; bound $L_S(\hat h)-L_S(\hat h')\le\rho\, d(\hat h,H')$ via Lipschitzness, and $L_D(\hat h)-L_D(\hat h')\le\rho\, d(\hat h,H')$ via Jensen + Lipschitzness; decompose $L_D(\hat h)-L_S(\hat h)\le [L_D(\hat h')-L_S(\hat h')]+2\rho\, d(\hat h,H')$.

**Exam relevance:** factor $2\rho$ (one $\rho d$ from the train side, one from the population side); premise = knowledge distillation.

**Example (rank-1 compression of an FC network).** $H=\{x\mapsto W_N\sigma(W_{N-1}(\cdots\sigma(W_1x)\cdots)) : W_n\in\mathbb{R}^{d,d}\}$ (all dims $=d$, no biases), $\sigma$ pointwise $\gamma$-Lipschitz with $\sigma(0)=0$, $X=\{x:\|x\|\le 1\}$; $H'$ = same net with all $W_n$ constrained to rank 1 ($W_n=u_nv_n^\top$): $2Nd$ vs $Nd^2$ parameters. With $W_n'$ the best rank-1 approximation of $W_n$ and errors $e_n(x)$ defined layer-wise, one gets $e_1(x)\le\|W_1-W_1'\|_{\mathrm{spectral}}\|x\|$ and the recursion

$$e_n(x)\le \|W_n-W_n'\|_{\mathrm{spectral}}\cdot\gamma^{n-1}\prod_{j=1}^{n-1}\|W_j\|_{\mathrm{spectral}} + \|W_n\|_{\mathrm{spectral}}\cdot\gamma\cdot e_{n-1}(x),$$

(using $\|W_n'\|_{\mathrm{spectral}}=\|W_n\|_{\mathrm{spectral}}$, since best rank-1 approximation preserves spectral norm), which by induction gives

$$d(h,H')\le\sup_{x:\|x\|\le1} e_N(x)\le \gamma^{N-1}\sum_{n=1}^{N}\ \prod_{j\in[N]\setminus\{n\}}\|W_j\|_{\mathrm{spectral}}\cdot\|W_n-W_n'\|_{\mathrm{spectral}}.$$

**Proof idea:** triangle inequality splitting layer $n$'s difference into "change $W_n$" + "propagate lower-layer error"; $\|\sigma(v)\|\le\gamma\|v\|$ from $\sigma(0)=0$.

**Exam relevance:** learning near-rank-1 matrices ⇒ small compression term ⇒ small generalization bound.

**Thm 1 (Rademacher generalization bound; Thm 26.5 in Shalev-Shwartz–Ben-David [6]).** For any $\delta\in(0,1)$, w.p. $\ge 1-\delta$ over $S\sim D^m$:

$$\forall h\in H:\quad L_D(h)-L_S(h)\le 2\,R(\ell\circ H\circ S)+4\sqrt{\frac{2\ln\big(\frac{4}{\delta}\big)}{m}}.$$

**Proof idea:** in recitation (not in these notes).

**Exam relevance:** bare form insufficient — by phenomenon (2), overparametrized $H$ fits arbitrary labels ⇒ $R(\ell\circ H\circ S)$ high; must bound $R$ on meaningful subclasses.

**Prop 3 (union over nested subclasses).** Let $H_1\subseteq H_2\subseteq\cdots$ with $\bigcup_{k=1}^\infty H_k=H$. Then for any $\delta\in(0,1)$, w.p. $\ge 1-\delta$:

$$\forall k\in\mathbb{N},\ \forall h\in H_k:\quad L_D(h)-L_S(h)\le 2\,R(\ell\circ H_k\circ S)+4\sqrt{\frac{2\ln\big(\frac{2\pi^2}{3}\cdot k^2\cdot\frac{1}{\delta}\big)}{m}}.$$

**Proof idea:** set $\delta_k':=\frac{6}{\pi^2}\cdot\frac{1}{k^2}\cdot\delta$; apply Thm 1 per $k$ with $\delta_k'$; $\sum_k \delta_k'=\delta$ (Basel: $\sum_k\frac{6}{\pi^2 k^2}=1$); union bound. Note $\frac{4}{\delta_k'}=\frac{2\pi^2}{3}\cdot\frac{k^2}{\delta}$.

**Example (norm-based bound; Neyshabur et al. [4]).** For $H_c$ as defined above, it can be shown that

$$R(\ell\circ H_c\circ S)\le\frac{c\cdot\rho\cdot 2^{N-1}\cdot\max_{i\in[m]}\|x_i\|}{\sqrt{2m}}.$$

Combining with Prop 3 (subclasses $H_k$, $k\in\mathbb{N}$), w.p. $\ge 1-\delta$:

$$L_D(\hat h)-L_S(\hat h)\le\frac{\sqrt{2}\cdot 2^{N-1}\cdot\rho\cdot\max_{i\in[m]}\|x_i\|\cdot k+\sqrt{2\ln\big(\frac{2\pi^2}{3}\cdot k^2\cdot\frac{1}{\delta}\big)}}{\sqrt{m}},$$

where $k:=\min\{k'\in\mathbb{N}: \exists W_1,\dots,W_N \text{ s.t. } \prod_{n=1}^N\|W_n\|_F\le k' \wedge \hat h(x)\equiv W_N\sigma(W_{N-1}(\cdots\sigma(W_1x)\cdots))\}$. (As printed in the notes; a literal substitution of Prop 3 would carry a factor 4 before the second radical.) Shortcomings: (i) grows exponentially with depth $N$ (from the $R$ bound; alleviated by Golowich et al. [2]); (ii) depends on $S$ only through $\max_i\|x_i\|$ ⇒ **cannot explain phenomenon (3)**.

**Thm 2 (PAC-Bayes; Thm 31.1 in Shalev-Shwartz–Ben-David [6]).** Let $P$ be a prior over $H$ (chosen independently of $S$), $\delta\in(0,1)$. Then w.p. $\ge 1-\delta$ over $S\sim D^m$, **for all** distributions $Q$ over $H$ (even $S$-dependent):

$$L_D(Q)-L_S(Q)\le\sqrt{\frac{\mathrm{KL}(Q\|P)+\ln\big(\frac{2m}{\delta}\big)}{2(m-1)}}.$$

**Proof idea:** define $f(S):=\sup_{Q}\big[2(m-1)\mathbb{E}_{h\sim Q}[\Delta(h)^2]-\mathrm{KL}(Q\|P)\big]$ with $\Delta(h):=L_D(h)-L_S(h)$; change of measure + Jensen give $f(S)\le\ln\mathbb{E}_{h\sim P}[e^{2(m-1)\Delta(h)^2}]$; swapping $\mathbb{E}_S,\mathbb{E}_{h\sim P}$ (independence) and Hoeffding tail + tail-sum formula give $\mathbb{E}_S[e^{2(m-1)\Delta(h)^2}]\le 2m$; Markov on $e^{f(S)}$ with $\delta=2m/e^\epsilon$; finish with Jensen $(\mathbb{E}_Q[\Delta])^2\le\mathbb{E}_Q[\Delta^2]$.

**Exam relevance:** the full proof was given in class — a prime candidate for a proof question; know why $P$ must not depend on $S$ but $Q$ may.

**Lem 1 (KL between multivariate Gaussians).** For non-singular (PD) $\Sigma_0,\Sigma_1$ over $\mathbb{R}^r$:

$$\mathrm{KL}\big(N(\mu_0,\Sigma_0)\,\|\,N(\mu_1,\Sigma_1)\big)=\frac{1}{2}\Big(\mathrm{Tr}(\Sigma_1^{-1}\Sigma_0)+(\mu_1-\mu_0)^\top\Sigma_1^{-1}(\mu_1-\mu_0)-r+\ln\frac{\det(\Sigma_1)}{\det(\Sigma_0)}\Big).$$

(Exercise: prove.)

**Example (PAC-Bayes for NNs; Dziugaite–Roy [1], Neyshabur et al. [5]).** $\Theta=\mathbb{R}^r$; prior $P=N(0,\sigma^2 I)$ (matches conventional random init); posterior $Q=N(\hat\theta,\bar\sigma^2 I)$, $\hat\theta$ = trained parameters. By Lem 1: $\mathrm{KL}(Q\|P)=\frac{1}{2}\big(r\frac{\bar\sigma^2}{\sigma^2}+\frac{1}{\sigma^2}\|\hat\theta\|^2-r+r\ln(\sigma^2)-r\ln(\bar\sigma^2)\big)$, minimized over $\bar\sigma^2$ at $\bar\sigma^2=\sigma^2$, giving $\mathrm{KL}(Q\|P)=\frac{1}{2\sigma^2}\|\hat\theta\|^2$. Plugging into Thm 2:

$$L_D(Q)\le \mathbb{E}_{\theta\sim N(\hat\theta,\sigma^2 I)}[L_S(h_\theta)]+\sqrt{\frac{\frac{1}{2\sigma^2}\|\hat\theta\|^2+\ln\big(\frac{2m}{\delta}\big)}{2(m-1)}}.$$

Interpretation: low bound iff the solution (1) is a **flat minimum** (average training loss over a Gaussian neighborhood of $\hat\theta$ is low — cf. Keskar et al. [3]) and (2) has **low norm** $\|\hat\theta\|$. Guarantee applies to the distribution $Q$ (a stochastic network sampling weights from $Q$ per prediction), not to $\hat\theta$ itself, unless one additionally bounds $L_D(h_{\hat\theta})-\mathbb{E}_{\theta\sim N(\hat\theta,\sigma^2 I)}[L_S(h_\theta)]$. Caveats: neighborhood term non-analytic (estimable only by sampling); values on real networks far from tight (as with all known bounds).

## Techniques & tricks
- Hoeffding's inequality for bounded losses ($\ell\in[0,1]$): $\Pr(|L_D(h)-L_S(h)|\ge\epsilon)\le 2e^{-2m\epsilon^2}$ for a **fixed** ($S$-independent) $h$; then union bound over a finite class ("discretization": $b$ bits ⇒ $|H|\le 2^b$).
- Decompose the gap through a compressed hypothesis: $L_D(\hat h)-L_S(\hat h)\le[L_D(\hat h')-L_S(\hat h')]+[L_D(\hat h)-L_D(\hat h')]+[L_S(\hat h)-L_S(\hat h')]$; control the last two via $\rho$-Lipschitzness of $\ell$ (Jensen's inequality for the population term).
- Layer-peeling error recursion for deep nets: triangle inequality per layer + submultiplicativity of the spectral norm + $\|\sigma(v)\|=\|\sigma(v)-\sigma(0)\|\le\gamma\|v\|$; induction yields product-of-spectral-norms bounds.
- Best rank-1 approximation preserves the spectral norm: $\|W'\|_{\mathrm{spectral}}=\|W\|_{\mathrm{spectral}}$.
- Countable union bound with weights $\delta_k'=\frac{6}{\pi^2 k^2}\delta$ (so $\sum_k\delta_k'=\delta$) to get bounds simultaneously for all subclass indices $k$.
- PAC-Bayes machinery: Markov's inequality on $e^{f(S)}$; change of measure $\mathbb{E}_{h\sim Q}[\ln(e^{g(h)}\frac{P(h)}{Q(h)})]\le\ln\mathbb{E}_{h\sim P}[e^{g(h)}]$ via Jensen; swap $\mathbb{E}_S\mathbb{E}_{h\sim P}$ by independence; tail-sum formula $\mathbb{E}[V]=\int_0^\infty\Pr(V\ge\beta)d\beta$ with change of variables $\beta=e^{2(m-1)\alpha^2}$ to prove $\mathbb{E}_S[e^{2(m-1)\Delta(h)^2}]\le 1+2(m-1)\le 2m$; final Jensen step from second to first moment.
- KL between Gaussians as a closed-form computational tool; optimizing the posterior variance ($\bar\sigma^2=\sigma^2$).

## Exam-relevant nuggets
- Memorize the four empirical phenomena verbatim and the mapping: UC bounds are distribution-oblivious and hypothesis-uniform ⇒ contradicted by (1)+(2) (same $H,m$, different $D$ ⇒ wildly different gaps) and by (4) (there exist $h$ with small $L_S$, large $L_D$, e.g., built by appending adversarially-labeled examples); any $S$-independent $\Delta$ (including the compression bound) cannot explain (3); the norm-based bound sees $S$ only via $\max_i\|x_i\|$ ⇒ also fails (3); the PAC-Bayes example depends on both $\hat h$ and $S$ ⇒ can potentially explain (1)–(4).
- Non-vacuity of Prop 1 requires $m$ at least on the order of $b$ (bits); in practice $b\gg m$ yet networks generalize — the mismatch motivating everything after Section 2.1.
- Conclusion stated explicitly in the notes: tight bounds must take the learned $\hat h$ into account; "UC on its own is not enough."
- Compression bound's residual term is $2\rho\, d(\hat h,H')$ — the 2 (train + population sides) and the $\rho$ are easy to drop by mistake.
- Rank-1 example parameter counts: $2Nd$ (rank-1) vs $Nd^2$ (full) — compression factor $d$.
- The Rademacher interpretation sentence (fit a random subset, anti-fit the rest) and that phenomenon (2) ⇒ $R(\ell\circ H\circ S)$ large for the full class.
- Prop 3's constant: $\frac{2\pi^2}{3}k^2\frac{1}{\delta}$ arises from $4/\delta_k'$ with $\delta_k'=\frac{6}{\pi^2k^2}\delta$; trap: forgetting the $k^2$ inside the log or the $4$ outside the radical (and note the notes' final norm-based display omits that 4).
- In the norm-based bound, $k$ is the minimal **integer** upper bound on $\prod_n\|W_n\|_F$ over all representations of $\hat h$; the $2^{N-1}$ makes it exponential in depth (Golowich et al. remove this).
- PAC-Bayes: $P$ arbitrary but fixed before seeing $S$; the bound holds simultaneously for all $Q$, including $S$-dependent ones; denominators are $2(m-1)$, log term $\ln(2m/\delta)$ — not $\ln(1/\delta)$.
- $\bar\sigma^2=\sigma^2$ is optimal, collapsing KL to $\frac{\|\hat\theta\|^2}{2\sigma^2}$; the bound then couples flatness ($\mathbb{E}_{\theta\sim N(\hat\theta,\sigma^2 I)}[L_S(h_\theta)]$) with parameter norm.
- The PAC-Bayes guarantee is for $L_D(Q)$, not $L_D(h_{\hat\theta})$: realize via a stochastic network, or separately bound the gap to $\hat\theta$.
- All known generalization bounds are numerically far from tight on real networks — stated caveat, fair game as a discussion question.
