# FODL Cheat Sheet — know these cold
The exam allows no aid material: every statement below must be reproducible from memory, with all quantifiers and assumptions. Statements follow the course's notation (lectures/recitations indexed in this repo); "Seen in" points to past-exam questions (see `index/exams/`) where the item was needed.

## Probability & concentration toolbox

### Hoeffding's inequality (course form)
**Statement:** Let $A_1,\dots,A_N$ be i.i.d. random variables bounded in $[0,1]$. For every $\epsilon\ge 0$:

$$P\big(\big|\tfrac{1}{N}\sum_{i=1}^N A_i-\mathbb{E}[A_1]\big|\ge\epsilon\big)\le 2\exp(-2N\epsilon^2)$$

Applied with $A_n:=\ell(h(x_n),y_n)\in[0,1]$ for a **fixed** ($S$-independent) $h$, so $\mathbb{E}[A_1]=L_D(h)$.
**Use it when:** any "derive a generalization bound" question — fix one hypothesis, bound $P(|L_S(h)-L_D(h)|\ge\epsilon)$, then union-bound.
**Seen in:** example_Q3, a2021_Q3, a2023_Q3, b2023_Q3, a2024_Q3, b2024_Q3, c2024_Q3
**Watch out:** it requires $h$ fixed before seeing $S$ — never apply it directly to the learned $\hat h$; the factor 2 (two-sided) and the 2 in $e^{-2N\epsilon^2}$ both matter for constants.

### Union bound + finite-class recipe
**Statement:** $P(\bigcup_i E_i)\le\sum_i P(E_i)$. Finite class: failure prob $\le 2|\mathcal H|e^{-2N\epsilon^2}$; setting this to $\delta$ and solving gives

$$\Delta_1(N,\delta,|\mathcal H|)=\sqrt{\ln(2|\mathcal H|/\delta)/(2N)}$$

valid simultaneously $\forall h\in\mathcal H$ w.p. $\ge 1-\delta$.
**Use it when:** every finite/quantized/covered class question; also to combine per-level events in SRM constructions.
**Seen in:** example_Q3, a2021_Q3, a2023_Q3, b2023_Q3, a2024_Q3, b2024_Q3, c2024_Q3, b2020_Q3

### Massart's finite-class lemma ⧉ external
**Statement:** For a finite $A\subset\mathbb{R}^m$:

$$R(A)\le\max_{a\in A}\|a\|_2\cdot\frac{\sqrt{2\ln|A|}}{m}$$

(Rademacher complexity of a finite set grows only logarithmically in $|A|$). **Audited: NOT in the course materials** (no finite-set Rademacher lemma appears anywhere in lectures/recitations) — on the exam, expect any needed Rademacher bound to be handed as a reminder; don't cite "Massart from class".
**Use it when:** bounding $R(\ell\circ\mathcal H\circ S)$ for a finite/discretized class inside a Rademacher-based bound — only if the exam hands it to you.
**Seen in:** external tool (exams hand Rademacher machinery as reminders: a2020_Q3, b2021_Q3)
**Watch out:** course-verified anchors you may always use: $R(\{a'\})=0$ and $R(\{\pm1\}^m)=1$ (recitation 9, P6).

### KL divergence of Gaussians (and the $\|\hat\theta\|^2/2\sigma^2$ collapse)
**Statement:** For PD $\Sigma_0,\Sigma_1$ over $\mathbb{R}^r$:

$$\mathrm{KL}\big(N(\mu_0,\Sigma_0)\,\|\,N(\mu_1,\Sigma_1)\big)=\frac12\big(\mathrm{Tr}(\Sigma_1^{-1}\Sigma_0)+(\mu_1-\mu_0)^\top\Sigma_1^{-1}(\mu_1-\mu_0)-r+\ln\frac{\det\Sigma_1}{\det\Sigma_0}\big)$$

With prior $P=N(0,\sigma^2 I)$, posterior $Q=N(\hat\theta,\bar\sigma^2 I)$: minimizing over $\bar\sigma^2$ gives $\bar\sigma^2=\sigma^2$ and

$$\mathrm{KL}(Q\|P)=\frac{\|\hat\theta\|^2}{2\sigma^2}$$
**Use it when:** instantiating PAC-Bayes with Gaussian prior/posterior (flat-minimum + low-norm bound); proving the lemma itself is HW3-style.
**Seen in:** core theory (not directly examined)
**Watch out:** the $-r$ and the $\ln\det$ ratio are the terms people drop; point-mass (not Gaussian) instantiations are what the exams actually used.

### SRM / weighted union bound (the $\delta_k$ trick)
**Statement:** To get a bound simultaneously over countably many sub-classes $\{\mathcal H_k\}$, allocate confidences $\delta_k>0$ with $\sum_k\delta_k\le\delta$ and apply the base bound to each $\mathcal H_k$ at level $\delta_k$. Standard schedules: $\delta_k=\delta\,2^{-k}$ ($k\ge1$), $\delta_i=\delta\,2^{-(i+1)}$ ($i\ge0$), or $\delta_k=\frac{6\delta}{\pi^2k^2}$ (Basel: $\sum_k\frac{6}{\pi^2k^2}=1$). The $\ln(1/\delta_k)$ term then grows with $k$ — the bound *prefers* small-index hypotheses.
**Use it when:** "derive a bound that prefers low-rank / low-norm / low-index hypotheses" — the standard Q3 part-3 twist.
**Seen in:** b2020_Q3, b2021_Q3, a2022_Q3, b2022_Q3, a2023_Q3, a2024_Q3, b2024_Q3, c2024_Q3, example_Q3
**Watch out:** over a *finite* range you may split $\delta$ uniformly, but over $k\in\mathbb{N}$ a uniform split is impossible — you must use a summable schedule; check strict monotonicity in $k$ if the question demands it.

### Binomial coefficient bound ⧉ external
**Statement:** $\binom{d}{k}\le\big(\frac{ed}{k}\big)^k$, i.e. $\ln\binom{d}{k}\le k\ln(ed/k)$. **Audited: NOT in the course materials** — real exams count sub-class sizes with direct forms instead ($k^p$, $2^{Bd}$, $B^{d^2}$, $2^b$-style), or hand you the count. Prefer a direct surjection/count (e.g. $|\mathcal H_k|\le(2d+1)^k$ by listing $k$ (position, sign) slots) — that style IS exam-grounded.
**Use it when:** a quick sanity bound while practicing; on the real exam prefer the direct counting style above.
**Seen in:** external tool (direct counting seen in: a2024_Q3, b2024_Q3, b2020_Q3)

### Gaussian & independence facts
**Statement:** (i) Linearity of expectation always; Rademacher signs have $\mathbb{E}[\xi_i]=0$. (ii) Projections of an i.i.d. zero-mean Gaussian vector onto **orthogonal** fixed directions are independent (drives Lecture 9's exact independence of $L_S$ and $L_{gen}$ for $W_{iid}$). (iii) For $Z_1,\dots,Z_m\sim N(0_d,I_d)$ with $m\le d$:

$$P(Z_1,\dots,Z_m\ \text{linearly independent})=1$$
**Use it when:** volume-hypothesis arguments; exact-recovery-at-$N=d$ questions; any expectation computation over random signs.
**Seen in:** b2024_Q3, core theory (lecture 9)

## Linear algebra toolbox

### Rank via SVD / Gram matrices
**Statement:**

$$A=U\Sigma V^\top=\sum_{i=1}^r\sigma_i u_iv_i^\top$$

with $r=\operatorname{rank}(A)$; $A^\top A=\sum_i\sigma_i^2v_iv_i^\top$, $AA^\top=\sum_i\sigma_i^2u_iu_i^\top$, so $\sigma_i^2(A)$ are the nonzero eigenvalues of both Gram matrices and

$$\operatorname{rank}(A)=\operatorname{rank}(A^\top A)=\operatorname{rank}(AA^\top)$$

Also

$$\operatorname{rank}(JJ^\top)\le\operatorname{rank}(J)$$

and rank of a sum $\le$ sum of ranks.
**Use it when:** any rank computation — NTK Gram singularity ($k<m\Rightarrow\lambda_i=0$), matricization ranks, factorization questions.
**Seen in:** b2020_Q2, a2022_Q1

### Eckart–Young–Mirsky (course form)
**Statement:** For $A\in\mathbb{R}^{m_1,m_2}$ with singular values

$$\sigma_1\ge\dots\ge\sigma_{\min\{m_1,m_2\}}\ge0$$

and any $r$:

$$\min_{\operatorname{rank}(W)\le r}\|W-A\|_F^2=\sum_{i=r+1}^{\min\{m_1,m_2\}}\sigma_i(A)$$

*as printed in the notes*; the classical statement has $\sigma_i(A)^2$ — they coincide in the course's application where all $\sigma_i\in\{0,1\}$ (verify exact form with tutor).
**Use it when:** converting a rank gap into a Frobenius-distance lower bound (inapproximability), e.g. $\|[\![\mathcal A^{CP}]\!]-I_{M^{N/2}}\|_F\ge\sqrt{M^{N/2}-B}$.
**Seen in:** core theory (lecture 2 §2.5; not directly examined)

### Trace identities
**Statement:** $\mathrm{Tr}(ABC)=\mathrm{Tr}(CAB)$ (cyclic; whenever both products are defined); $\langle A,B\rangle=\mathrm{Tr}(AB^\top)$, equivalently

$$\mathrm{Tr}(X^\top Y)=\langle X,Y\rangle$$

for symmetric $A$: $\mathrm{Tr}(A)=\sum_i\lambda_i(A)$;

$$\|A\|_F^2=\mathrm{Tr}(A^\top A)=\langle A,A\rangle=\sum_i\sigma_i^2(A)=\sum_{ij}A_{ij}^2$$
**Use it when:** extracting eigenvalue/singular-value ODEs ($v_r^\top\dot W v_r$ manipulations), balancedness computations, Frobenius-norm bookkeeping.
**Seen in:** a2024_Q2 (given as reminder), a2021_Q2

### Rayleigh quotient bounds
**Statement:** For symmetric $A$ and any $x$:

$$\lambda_{\min}(A)\|x\|_2^2\le x^\top Ax\le\lambda_{\max}(A)\|x\|_2^2$$

Proof: EVD $A=UDU^\top$, substitute $q=U^\top x$ (orthogonal maps preserve $\ell_2$ norm).
**Use it when:** GD/GF convergence rates ($\frac{d}{dt}\|u-y\|^2=-2(u-y)^\top H(u-y)\le-2\lambda_{\min}\|u-y\|^2$); smoothness constants of quadratics.
**Seen in:** b2020_Q2, example_Q2

### Spectral decomposition of symmetric matrices
**Statement:** Every symmetric $A\in\mathbb{R}^{d,d}$ has an orthogonal eigendecomposition $A=VDV^\top$ with $V$ orthogonal, $D$ diagonal real. Consequences: symmetric PSD $W^*$ has a square root $U^*=(W^*)^{1/2}$; a symmetric matrix class equals what its diagonal subclass realizes after rotating (

$$C^\top A^{L-t}B=(V^\top C)^\top D^{L-t}(V^\top B)$$

); any symmetric $M\times M$ matrix $=\sum_z\lambda_z v_zv_z^\top$ (a symmetric CP decomposition).
**Use it when:** $\mathcal H^{diag}=\mathcal H^{sym}$ questions; constructing $U^*$ with $U^*U^{*\top}=W^*$ in non-convexity proofs; characterizing symmetric-tensor classes at $N=2$.
**Seen in:** a2024_Q1, a2021_Q2, a2024_Q2, b2020_Q1

### Matrix powers via eigendecomposition
**Statement:** If $A=VDV^{-1}$ (e.g. symmetric: $V$ orthogonal) then $A^t=VD^tV^{-1}$ — powers act on eigenvalues only. For PSD $A$ this also defines fractional powers $[A]^\alpha$ spectrally ($[A]^0=I$), used throughout the end-to-end dynamics.
**Use it when:** linear-RNN coefficient computations $C^\top A^{L-t}B$; solving linear ODEs $\dot e=-He$ via $e(t)=e^{-Ht}e(0)$; fractional powers $[WW^\top]^{\frac{j-1}{N}}$.
**Seen in:** a2024_Q1, b2020_Q2

### Geometric-sequence rank trick
**Statement:** A $d=1$ diagonal linear RNN yields coefficients $w_t=cb\,a^{L-t}$ — a geometric progression, so $w_{t+1}w_{t-1}=w_t^2$; in particular a middle zero forces a neighbor zero (

$$w_{L-1}=0\Rightarrow cb=0$$

or

$$a=0\Rightarrow w_L=0$$

or $w_{L-2}=0$). With $d=2$, coefficients are sums of two geometric sequences: $(1,0,1)$ becomes realizable (

$$a_1=1,a_2=-1$$

$$c_1b_1=c_2b_2=\frac12$$

).
**Use it when:** proving strict hierarchy $\mathcal H_1^{diag}\subsetneq\mathcal H_2^{diag}$ or any "how does $\mathrm{Tr}(A^t)$ behave with $t$" hint.
**Seen in:** a2024_Q1

### Kronecker product & matricization rank facts
**Statement:** $A\odot B$ = block matrix $[a_{ij}B]$; mixed product $(A\odot B)(C\odot D)=(AC)\odot(BD)$; $(A\odot B)^\top=A^\top\odot B^\top$, $(A\odot B)^{-1}=A^{-1}\odot B^{-1}$; SVD:

$$A\odot B=(U_A\odot U_B)(\Sigma_A\odot\Sigma_B)(V_A\odot V_B)^\top$$

hence

$$\operatorname{rank}(A\odot B)=\operatorname{rank}(A)\operatorname{rank}(B)$$

Matricization is linear, and

$$[\![\mathcal T\otimes\bar{\mathcal T}]\!]_I=[\![\mathcal T]\!]_{I\cap[n]}\odot[\![\bar{\mathcal T}]\!]_{(I-n)\cap[\bar n]}$$
**Use it when:** every CAC/tensor rank bound: matricize, split outer products into Kroneckers, multiply ranks.
**Seen in:** a2022_Q1, b2020_Q1
**Watch out:** in this course $\odot$ = Kronecker, $\otimes$ = outer/tensor product (many books swap); $A\odot B\ne B\odot A$.

## Expressiveness

### Three-pillar error decomposition
**Statement:**

$$\mathcal L_{\mathcal D}(\bar h)=\underbrace{\mathcal L_{\mathcal D}(\bar h)-\mathcal L_{\mathcal D}(h_S^*)}_{\text{training error (Optimization)}}+\underbrace{\mathcal L_{\mathcal D}(h_S^*)-\min_{h\in\mathcal H_B}\mathcal L_{\mathcal D}(h)}_{\text{estimation error (Generalization)}}+\underbrace{\min_{h\in\mathcal H_B}\mathcal L_{\mathcal D}(h)}_{\text{approximation error (Expressiveness)}}$$

where

$$h_S^*\in\operatorname{argmin}_{h\in\mathcal H_B}\mathcal L_S(h)$$
**Use it when:** framing/essay parts — name each term and its pillar.
**Seen in:** core theory (not directly examined)

### Universality (Def 1)
**Statement:** $\mathcal H_B$ is **$\mathcal F$-universal in the sense of $d(\cdot,\cdot)$** when

$$\forall\epsilon>0,\ \forall f\in\mathcal F,\ \exists B,\ \exists h\in\mathcal H_B$$

s.t. $d(f,h)<\epsilon$. (Note the order: $B$ may depend on $f$ and $\epsilon$.) To prove NON-universality, exhibit one $f\in\mathcal F$ and $\epsilon_0>0$ with $d(f,h)\ge\epsilon_0$ for all $B,h$ (e.g. all $h$ vanish at $0$ while $f(0)=1$).
**Use it when:** "define formally" sub-questions (verbatim) and universality proofs/refutations.
**Seen in:** example_Q1, a2021_Q1, b2020_Q1, a2024_Q1, b2024_Q1, c2024_Q1

### Expressive efficiency (Def 2 + strengthenings)
**Statement:** $\bar{\mathcal H}_{\bar B}$ is expressively efficient w.r.t. $\mathcal H_B$ if (1) $\forall B\ \exists\bar B\in O(B)$ with

$$\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B}$$

and (2)

$$\exists\bar h\in\bar{\mathcal H}_{\bar B}$$

(reasonable $\bar B$) with $\bar h\notin\mathcal H_B$ unless $B$ is prohibitively large. **Exponential**: $B$ exponential in the problem dimension (e.g. depth $L$) while $\bar B$ polynomial. **Inapproximability**: replace $\bar h\notin\mathcal H_B$ by $d(\bar h,\mathcal H_B)>\epsilon$. **Complete**: almost all $\bar h$ are hard.
**Use it when:** "define X is (exponentially) expressively efficient w.r.t. Y" — asked verbatim, then proven.
**Seen in:** a2020_Q1, b2021_Q1, b2022_Q1, b2023_Q1, b2024_Q1
**Watch out:** condition (1) (containment with comparable size) is graded too — passthrough/padding constructions prove it; b2021_Q1 shows the answer can be NO (non-negative sign nets: depth adds nothing).

### Shallow ReLU nets = piecewise linear, piece counts
**Statement:** (Prop 1, lecture 2) A shallow width-$B$ ($B\ge2$) ReLU net realizes any piecewise linear $g$ with $\le B$ pieces; conversely every $h\in\mathcal H_B$ is piecewise linear with $\le B+1$ pieces (each neuron contributes $\le1$ breakpoint). Piecewise linear:

$$\exists\,{-\infty}=:c_0<c_1<\dots<c_N:=\infty$$

with $g$ affine on each $[c_{i-1},c_i]$; # pieces = minimal such $N$.
**Use it when:** any Q1 on ReLU/leaky-ReLU nets — characterization direction and width lower bounds via piece counting.
**Seen in:** example_Q1, a2020_Q1, b2022_Q1, a2023_Q1
**Watch out:** do not swap the two directions ($\le B$ realizable vs. $\le B+1$ realized); bias-free 1-D nets have their only breakpoint at $0$ (so $|A_h|\le2$, and depth efficiency dies without biases).

### Piecewise linear = affine + sum of ReLUs
**Statement:** Any piecewise linear $f$ with breakpoints $t_1<\dots<t_k$ can be written

$$f(x)=ax+b+\sum_{i=1}^k c_i\,[x-t_i]_+$$

(the $c_i$ are the slope changes); leaky-ReLU versions via $\sigma_a(z)=\sigma(z)-a\sigma(-z)$ and

$$\sigma(z)=\frac{1}{1-a^2}\sigma_a(z)+\frac{a}{1-a^2}\sigma_a(-z)$$

(two neurons per ReLU, width doubles).
**Use it when:** constructive direction of expressiveness proofs; transferring ReLU results to leaky-ReLU classes.
**Seen in:** example_Q1, b2022_Q1
**Watch out:** at $\alpha=1$ leaky-ReLU is the identity — the class collapses to affine functions and all depth separation fails (b2022_Q1e).

### Telgarsky sawtooth (definition, piece count, inapproximability)
**Statement:** Tent $g(x)=[2x]_+-[4x-2]_++[2x-2]_+$ (2 layers, width 3). $g^{\circ k}$ has $2^{k-1}$ teeth; the $L$-layer width-3 net realizes $g^{\circ L-1}$ with $2+2^{L-1}$ linear pieces $\Rightarrow$ shallow realization needs $B\ge2^{L-1}+1$. Inapproximability in $d(f_1,f_2)=\int_0^1|f_1-f_2|$: for all $h\in\mathcal H_B$,

$$d(g^{\circ L-1},h)\ge\frac18-B\cdot2^{-L-2}-3\cdot2^{-L-1}$$

so $d<\epsilon$ forces $B>2^{L+2}(\frac18-\epsilon)-6$.
**Use it when:** exponential depth separation for ReLU/leaky-ReLU nets — the canonical Q1 archetype.
**Seen in:** a2020_Q1, b2022_Q1
**Watch out:** the interval count is $2^{L-1}+1$ ($2^{L-2}$ in $S_>$, $2^{L-2}+1$ in $S_<$); a missed interval costs $[\text{length}]\cdot\frac12\cdot\frac12$; all but $\le2$ missed intervals have length $2^{-L+1}$.

### Density of piecewise linear/constant in continuous functions
**Statement:** (Lemma 1, lecture 2) $\forall\epsilon>0$ and continuous $f$ there is a piecewise linear $g$ with $\int_0^1|f-g|<\epsilon$: Heine–Cantor gives uniform continuity on $[0,1]$; interpolate $f$ on a mesh-$<\delta$ grid. Sup-norm variant (exams): with $B$ pieces of width $1/B<\delta$, the step function taking value $f(j/B)$ on each piece satisfies $\sup_{x\in[0,1]}|f(x)-h(x)|<\epsilon$.
**Use it when:** universality proofs — combine with the class-characterization (pieces ↔ width) to conclude.
**Seen in:** a2021_Q1, c2024_Q1
**Watch out:** always invoke uniform continuity (the hint they give); $B$ depends on $\epsilon$ — that is allowed by Def 1.

### Sign-activation nets = piecewise constant
**Statement:** With

$$\sigma(z)=\mathbb 1[z\ge0]$$

and $w_i\ge0$: each neuron is a single left-closed step $\mathbb 1[x\ge -b_i/w_i]$, so every $h\in\mathcal H_B$ is piecewise constant with $\le B+1$ pieces; conversely every piecewise constant $g$ with $\le B+1$ pieces is in $\mathcal H_B$ via the telescoping construction

$$h(x)=\alpha_1+\sum_j(\alpha_{j+1}-\alpha_j)\sigma(x-c_j)$$

With $k>d$ output sign neurons ($f(x)=\operatorname{sign}(Wx)$), some output pattern $y\in\{0,1\}^k$ is unreachable (VC of homogeneous linear separators is $d$; duality: inputs act as separators on the rows of $W$).
**Use it when:** sign-net Q1s — characterization, universality w.r.t. continuous $f$ in sup norm, unreachable outputs.
**Seen in:** a2021_Q1, b2021_Q1, c2024_Q1, b2023_Q1

### Composition multiplies pieces (and cannot create pieces from constants)
**Statement:** Composing piecewise functions multiplies piece counts: pieces$(f\circ g)\le$ pieces$(f)\cdot$pieces$(g)$. **Audited: the general rule is NOT stated in the course** — prove it if you use it (breakpoints of $f\circ g$ = breakpoints of $g$ ∪ preimages under $g$ of breakpoints of $f$; Mock 3 Q1.1 walks the proof). Course-grounded special cases you may cite: self-composing the tent multiplies linear pieces exponentially (Lecture 2, Prop 2), and composing anything after a piecewise-constant map adds **no** new breakpoints, so non-negative-weight sign nets stay at $\le B+1$ pieces for every depth $L$ (b2021_Q1c).
**Use it when:** upper-bounding pieces of deep nets (positive result: sawtooth; negative result: depth adds nothing).
**Seen in:** b2021_Q1, b2022_Q1, a2020_Q1

### CP/HT decompositions ↔ shallow/deep CACs + the $M^{N/2}$ separation
**Statement:** Shallow CAC (width $Z$, global product pooling) computes

$$\mathcal A=\sum_{z=1}^Z a_z^{out}\,\mathbf a^{z,1}\otimes\cdots\otimes\mathbf a^{z,N}$$

(CP); deep CAC ($L=\log_2N$ layers, size-2 pooling) computes the HT recursion

$$\Phi^{l,j,\gamma}=\sum_{\alpha=1}^{r_{l-1}}a^{l,j,\gamma}_\alpha\Phi^{l-1,2j-1,\alpha}\otimes\Phi^{l-1,2j,\alpha}$$

Ranks:

$$\operatorname{rank}[\![\mathcal A^{CP}]\!]_I\le Z$$

for **every** partition $I$; a deep assignment with $r_0\ge M$ gives $[\![\mathcal A^{HT}]\!]=I_{M^{N/2}}$ (rank $M^{N/2}$), and $\det[\![\mathcal A^{HT}]\!]\ne0$ for almost all parameters (zero-set-of-polynomial) — complete exponential efficiency; $\epsilon$-approx needs $B\ge M^{N/2}-\epsilon^2$ (EYM).

$$\mathrm{sep}[f;I]=\operatorname{rank}[\![\mathcal A]\!]_I$$

(Prop 7, both directions). Universality: $Z=M^N$ realizes any tensor exactly.
**Use it when:** tensor/CAC Q1s — separation rank via matricization, symmetric (weight-shared) CP loses universality (only permutation-invariant tensors; at $N=2$ exactly symmetric matrices).
**Seen in:** b2020_Q1, a2022_Q1
**Watch out:** function ↔ tensor is a lookup table $\mathcal A_{d_1..d_N}=f(d_1,..,d_N)$; canonical matricization = odd modes to rows; universality here is exact realization on a finite domain, not approximation.

## Optimization

### Gradient flow: definition + monotone descent
**Statement:** GF is the ODE $\dot\theta(t)=-\nabla f(\theta(t))$, $t\ge0$ (GD with infinitesimal step; GD

$$\theta_{t+1}=\theta_t-\eta\nabla f(\theta_t)$$

is its forward-Euler discretization). Chain rule:

$$\frac{d}{dt}f(\theta(t))=-\|\nabla f(\theta(t))\|_2^2\le0$$

— the loss is monotonically non-increasing. Also

$$\min_{t\in[0,T]}\|\nabla f(\theta(t))\|_2\le\sqrt{(f(\theta(0))-f^*)/T}$$

and if GF converges its limit is a critical point ($f\in C^1$).
**Use it when:** the opening move of essentially every Q2; monotonicity also proves trajectories stay in sublevel sets ($w(t)\ge c$ arguments).
**Seen in:** a2020_Q2, b2020_Q2, a2021_Q2, b2021_Q2, a2022_Q2, b2022_Q2, a2023_Q2, b2023_Q2, a2024_Q2, b2024_Q2, c2024_Q2
**Watch out:** GF descends with no assumptions beyond differentiability; GD needs $\beta$-smoothness and small $\eta$ — a favorite true/false discriminator.

### $\beta$-smoothness, descent lemma, GD rate to stationarity
**Statement:** $f$ is $\beta$-smooth if

$$\|\nabla f(w_1)-\nabla f(w_2)\|\le\beta\|w_1-w_2\|$$

For **twice continuously differentiable** $\beta$-smooth $f$ **attaining a global minimum $f^*$** (the course's standing assumptions — Lecture 3, Lem 2/Thm 1):

$$|f(w_2)-f(w_1)-\langle\nabla f(w_1),w_2-w_1\rangle|\le\frac\beta2\|w_1-w_2\|^2$$

all Hessian eigenvalues lie in $[-\beta,\beta]$, and GD with $\eta\le1/\beta$ gives per-step decrease

$$f(w_{t+1})\le f(w_t)-\frac\eta2\|\nabla f(w_t)\|^2$$

reaching an $\epsilon$-stationary point ($\|\nabla f(w)\|\le\epsilon$) within $\frac{2(f(w_0)-f^*)}{\eta\epsilon^2}$ steps. For $f(w)=\frac12w^\top Qw$ ($Q$ PD): exact smoothness constant $\beta=\lambda_{\max}(Q)$ (tightness via top eigenvector).
**Use it when:** "define $\beta$-smooth / prove the quadratic is smooth" (example_Q2) and any stationarity-rate derivation.
**Seen in:** example_Q2 (definition + smoothness proof; the iteration-complexity part is lecture theory, not on that exam)
**Watch out:** state the C² + attained-minimum assumptions (the course proof uses Taylor–Lagrange); telescope the descent inequality; the rate is to *stationarity*, not to a minimum — no convexity assumed.

### Convex + critical point ⇒ global minimum
**Statement:** For differentiable convex $f$, every critical point ($\nabla f(w)=0$) is a global minimizer (

$$f(w')\ge f(w)+\langle\nabla f(w),w'-w\rangle=f(w)$$

). Contrapositive is the standard non-convexity certificate: exhibit a critical point that is not a global minimum.
**Use it when:** proving non-convexity of overparameterized objectives (the origin is critical but suboptimal); concluding global convergence once GF reaches a critical point of a convex $l$.
**Seen in:** b2023_Q2, b2024_Q2, example_Q2

### Strict saddle
**Statement:** A stationary point $w$ of twice continuously differentiable $f$ is a **strict saddle** when $\lambda_{\min}(\nabla^2 f(w))<0$ (at least one negative Hessian eigenvalue; the definition covers local maxima). If $\nabla g(w_0)=0$ and $\lambda_{\min}(\nabla^2 g(w_0))<0$ then $w_0$ is not a local minimum (restrict to the line $f(t)=g(w_0+tv)$ along the eigenvector). Depth $N\ge3$ (Lecture 3, Prop 3 — with its hypotheses: $\ell$ twice continuously differentiable and **convex**, $\min_{i\in[N-1]}d_i\ge\min\{d_0,d_N\}$, and $\ell$ does **not** attain its global minimum at $0$): the origin of the LNN objective is a saddle but a **non-strict** one (every Hessian term contains a zero factor) — the landscape approach fails for deep nets.
**Use it when:** classify the critical points: exhibit one negative-curvature direction (e.g. $\nabla^2\phi(0,0)$ has eigenvalues $\pm\frac2m\langle x,y\rangle$ via direction $(1,1)$).
**Seen in:** a2020_Q2, a2022_Q2
**Watch out:** "strict saddle property" = ALL saddles strict; for width-1 depth-2 the only saddle is the origin — check it explicitly.

### Non-convexity of overparameterized objectives
**Statement:** (Prop 1, lecture 3) If $L(W_1,\dots,W_N)$ depends on the weights only through the network's input–output map, its global min is attained, and that min is strictly below what width-1 hidden layers achieve, then $L$ is non-convex (permute hidden neurons: averaging the $d_1!$ permuted optima via Jensen would give an optimal width-1-like point — contradiction). Exam recipes: (i) $\nabla\phi(0)=0$ but $\phi(0)>\phi_{\min}$ (products of $N\ge2$ factors kill every partial derivative at $0$); (ii) $\phi(U)=\phi(-U)$ + Jensen at the midpoint $0$; (iii) minimizer set $\{\prod_iw_i=w^*\}$ is non-convex.
**Use it when:** the standard "prove $\phi$ is not convex" opener of matrix-factorization / product-parameterization Q2s.
**Seen in:** a2020_Q2, a2021_Q2, b2023_Q2, a2024_Q2, b2024_Q2
**Watch out:** non-convexity holds for ANY activation, including linear — it comes from the parameterization, not the nonlinearity.

### Balancedness conservation (general + scalar + ReLU forms)
**Statement:** Under GF on $\phi(W_1,\dots,W_N)=\ell(W_N\cdots W_1)$:

$$\frac{d}{dt}\big(W_{j+1}^\top W_{j+1}-W_jW_j^\top\big)=0$$

i.e.

$$C_{j,j+1}:=W_{j+1}(0)^\top W_{j+1}(0)-W_j(0)W_j(0)^\top$$

is conserved; balanced init ($C_{j,j+1}=0$) stays balanced. Scalar width-1: $\frac{d}{dt}(w_i^2-w_j^2)=0$ since $\frac{d}{dt}w_i^2=-2L'(w)\,w$ for every $i$. Shallow ReLU (no biases):

$$\frac{d}{dt}v_m^2=\frac{d}{dt}\|w_m\|^2=-2\sum_n\ell'(h_\theta(x_n),y_n)\,v_m\,\phi(\langle w_m,x_n\rangle)$$

via the homogeneity identity $z\phi'(z)=\phi(z)$. Hadamard: $\frac{d}{dt}u_j^2=-2\,w\odot\nabla L(w)$ for every $j$.
**Use it when:** every "prove this quantity is conserved" sub-question; conservation + limit conditions pin down the GF limit (e.g. $w_1(\infty)=\sqrt{(c+\sqrt{c^2+4(w^*)^2})/2}$).
**Seen in:** a2020_Q2, b2021_Q2, a2022_Q2, b2022_Q2, b2023_Q2, c2024_Q2
**Watch out:** orientation is asymmetric — $W_{j+1}^\top W_{j+1}=W_jW_j^\top$ (input Gram of layer $j{+}1$ = output Gram of layer $j$); derivation = multiply layer ODE by $W_j^\top$, symmetrize, integrate.

### End-to-end dynamics of deep linear networks
**Statement:** (Thm 1, lecture 4) GF from balanced init:

$$\dot W_{1:N}=-\sum_{j=1}^N\big[W_{1:N}W_{1:N}^\top\big]^{\frac{j-1}{N}}\nabla\ell(W_{1:N})\big[W_{1:N}^\top W_{1:N}\big]^{\frac{N-j}{N}}$$

— a preconditioned GF whose PSD preconditioner has eigenvectors $\mathrm{vec}(u_rv_{r'}^\top)$ and eigenvalues

$$\sum_{j=1}^N\sigma_r^{2(N-j)/N}\sigma_{r'}^{2(j-1)/N}$$

(movement amplified along large singular directions). Scalar case: $\dot w=-N\,L'(w)\,w^{2-\frac2N}$; row-vector case:

$$\dot w=-\|w\|^{2(N-1)/N}\nabla L_S(w)-(N-1)\|w\|^{-2/N}\langle\nabla L_S(w),w\rangle w$$

Hadamard case:

$$\dot w=-N\,\nabla L(w)\odot w^{2-\frac2N}$$

symmetric $W=UU^\top$ ($\nabla L$ symmetric): $\dot W=-2[\nabla L(W)W+W\nabla L(W)]$.
**Use it when:** "prove $\dot w(t)=\dots$" — the single most recycled exam derivation (product rule + balancedness $w_i^2=|w|^{2/N}$).
**Seen in:** b2021_Q2, c2024_Q2, b2023_Q2, a2021_Q2, a2024_Q2
**Watch out:** memorize the exponents $\frac{j-1}{N}$ (left) / $\frac{N-j}{N}$ (right); $N=1$ reduces to plain GF; exam variants scale constants (e.g. $\dot U=-4(W-W^*)U$ for $L(W)=\|W-W^*\|^2$).

### PL condition ⇒ linear (exponential) rate
**Statement:** If $f(w)-f(w^*)\le\|\nabla f(w)\|^2$ (PL-type inequality), then under GF $f(w(t))-f(w^*)\le e^{-t}(f(w_0)-f(w^*))$:

$$\frac{d}{dt}(f-f^*)=-\|\nabla f\|^2\le-(f-f^*)$$

integrate (Grönwall). General pattern:

$$\dot g\le-\kappa(g-\ell^*)\Rightarrow g(t)-\ell^*\le(g(0)-\ell^*)e^{-\kappa t}$$

$\alpha$-strong convexity implies the PL form $\|\nabla f(w)\|^2\ge\alpha(f(w)-f^*)$ (lecture 4, Prop 2).
**Use it when:** any "prove exponential convergence" sub-question — establish $\dot L\le-\kappa L$ and integrate ($\kappa=2Nc^{2-2/N}$ in the scalar/Hadamard exams).
**Seen in:** a2023_Q2, b2021_Q2, b2023_Q2, c2024_Q2

### Deficiency margin
**Statement:** $W$ has deficiency margin $c>0$ w.r.t. loss $\ell$ when $\ell(W)<\ell(W')$ for **every** $W'$ with $\sigma_{\min}(W')\le c$. Since GF only decreases the loss, the margin persists, so $\sigma_{\min}(W_{1:N}(t))\ge c$ for all $t$; with $\alpha$-strongly convex $\ell$, GF from balanced init with margin $c$ is $\epsilon$-optimal by time

$$\ln(\epsilon^{-1}(\phi(0)-\ell^*))\,c^{-2(N-1)/N}\alpha^{-1}$$

Companion fact:

$$\min\{\|W-\Lambda\|_F:\sigma_{\min}(W)\le c\}=\max\{0,\sigma_{\min}(\Lambda)-c\}$$

(SVD surgery +

$$\sigma_{\min}(A+B)\ge\sigma_{\min}(A)-\sigma_{\max}(B)$$

).
**Use it when:** convergence-to-global-min guarantees for deep linear nets; the distance computation is a recurring recitation-style exercise.
**Seen in:** core theory (not directly examined)
**Watch out:** the inequality in the definition is strict and quantified over ALL $W'$ with small $\sigma_{\min}$; the "random small init achieves a margin with probability $\approx1/2$" fact is stated in the course only for the **single-output case $d_N=1$** (linear regression, where $\sigma_{\min}=\|\cdot\|_F$); Thm 2 also assumes $\ell$ continuously differentiable.

### NTK prediction dynamics + spectral solution
**Statement:** (Lem 1, lecture 5 — exact, no width assumption) GF on

$$\ell(w)=\frac12\sum_{i=1}^m(f(w,x_i)-y_i)^2$$

gives $\dot u(t)=-H(t)(u(t)-y)$, where

$$(H(t))_{i,j}=\big\langle\frac{\partial f(w(t),x_i)}{\partial w},\frac{\partial f(w(t),x_j)}{\partial w}\big\rangle$$

is PSD (Gram of Jacobians). If $H$ is fixed: $u(t)-y=e^{-Ht}(u(0)-y)$; in the eigenbasis $q:=V^\top(u-y)$, $q_i(t)=q_i(0)e^{-\lambda_it}$ and $\|q\|^2=2\ell$; if all $\lambda_i>0$, $\ell\le\epsilon$ by time

$$\max_i\frac{1}{2\lambda_i}\log\frac{m\,\|u(0)-y\|^2}{2\epsilon}$$

If #params $k<m$ then $H=JJ^\top$ is singular (rank $\le k$) — some mode never decays.
**Use it when:** "prove $\dot u=-H(u-y)$" + "prove linear convergence when $\lambda_i>0$" — b2020_Q2 verbatim; alternative rate proof: $\frac{d}{dt}\|u-y\|^2\le-2\lambda_{\min}\|u-y\|^2$ (Rayleigh).
**Seen in:** b2020_Q2
**Watch out:** PSD-ness is automatic; **non-singularity** of $H^*$ is the extra condition for zero-loss convergence; smallest eigenvalue dominates the time bound.

### Ultra-wide networks: $H(t)\approx H(0)\approx H^*$ (lazy training)
**Statement:** For the shallow model

$$f_a(W,x)=\frac{1}{\sqrt n}\sum_{r=1}^na_r\sigma(w_r^\top x)$$

($\|x\|=1$, $|\dot\sigma|,|\ddot\sigma|\le1$, $w_r(0)\sim N(0,I)$, $a_r=\pm1$ fixed):

$$n\ge\frac{2m^4}{\epsilon^2}\log\frac{m^2}{\delta}\Rightarrow\|H(0)-H^*\|_{spectral}\le\epsilon$$

w.p. $\ge1-\delta$ (Hoeffding per entry + union over $m^2$ entries). Kernel stability (Lecture 5, Prop 2 — assumes additionally $|y_i|\le c$ and $\max_{\tau\in[0,t]}|(u(\tau))_i|\le c$ for all $i$, which defines the constant $c$):

$$n\ge\frac{16c^2m^6t^2}{\epsilon^2}\Rightarrow\|H(t)-H(0)\|_{spectral}\le\epsilon$$

via the lazy-training bound

$$\|w_r(t)-w_r(0)\|\le\frac{2cmt}{\sqrt n}$$

NTK:

$$K_s(x,x')=x^\top x'\,\mathbb E_{w\sim N(0,I)}[\dot\sigma(w^\top x)\dot\sigma(w^\top x')]$$

in the affine regime (with $w(0)\approx0$ stay-in-span and $H^*$ full rank) the learned predictor is exactly kernel regression

$$x\mapsto[K(x,x_1),\dots,K(x,x_m)](H^*)^{-1}y$$
**Use it when:** "why is convergence to zero loss likely when $k\gg m$" / kernel-regime justification questions.
**Seen in:** b2020_Q2
**Watch out:** each neuron moves $O(1/\sqrt n)$ — width buys kernel stability; required widths are "prohibitive" (stated caveat); $K_s$ involves $\dot\sigma$, not $\sigma$.

### Singular-value / eigenvalue dynamics of deep matrix factorization
**Statement:** (Thm 1, lecture 8) GF on $\phi(W_1,\dots,W_N)=L_S(W_N\cdots W_1)$ from balanced init, with analytic SVD $W_{1:N}(t)=U(t)S(t)V(t)^\top$:

$$\dot\sigma_r(t)=-N\big(\sigma_r(t)^2\big)^{1-\frac1N}\big\langle\nabla L_S(W_{1:N}(t)),u_r(t)v_r(t)^\top\big\rangle$$

Symmetric variant $W=UU^\top$:

$$\frac{d}{dt}\lambda_r=4\lambda_r\langle-\nabla L(W),v_rv_r^\top\rangle$$

so

$$\lambda_r(t)=\lambda_r(0)\exp\big(4\int_0^t\langle-\nabla L,v_rv_r^\top\rangle\big)$$

— eigenvalues never change sign. $N=1$: factor $=1$ (no bias); $N\ge2$: large singular values accelerate, small ones stall (more sharply for larger $N$) ⇒ near-zero init yields approximately **low-rank** solutions (incremental/sequential learning).
**Use it when:** "prove the eigenvalue ODE" (differentiate $\lambda_r=v_r^\top Wv_r$; $\dot v_r$ terms die since $\langle v_r,\dot v_r\rangle=0$) + "explain the low-rank bias" (qualitative part).
**Seen in:** a2021_Q2, a2024_Q2
**Watch out:** balancedness enters through the E2E dynamics; the analytic SVD itself needs no balancedness; multiplicative dynamics ⇒ sign preservation ⇒ $\det\ne0$ invariants.

### Shallow ReLU under balanced GF: sign preservation + unreachable loss
**Statement:** (b2022_Q2) Balanced init $v_m(0)^2=\|w_m(0)\|^2$ persists; with $\sigma_m:=|v_m|\|w_m\|$,

$$\frac{d}{dt}\sigma_m^2=\sigma_m^2\cdot g(t)$$

with $g$ continuous and bounded on any $[0,t_0)$, so

$$\sigma_m(t)^2=\sigma_m(0)^2e^{\int_0^tg}>0$$

— hence

$$v_m(0)>0\Rightarrow v_m(t)>0$$

for all $t$ (first-zero contradiction). Consequence: all $v_m>0$ and $\phi\ge0$ give $h_{\theta(t)}(x)\ge0$ everywhere; if some label $y_{\bar n}<0$ then

$$\mathcal L(\theta(t))\ge y_{\bar n}^2=:\epsilon$$

for all $t$ — the loss level is unreachable.
**Use it when:** ReLU-net Q2s asking for sign invariance along the flow and loss floors; also bad-local-minimum constructions (all ReLUs dead: $w_m=-x$ ⇒ $h\equiv0$ locally, $L\equiv y^2$).
**Seen in:** b2022_Q2, a2022_Q2
**Watch out:** the mechanism is the exponential/multiplicative ODE — a quantity satisfying $\dot z=g\,z$ with bounded $g$ cannot reach $0$ in finite time; positive 1-homogeneity $\phi(\langle w,x\rangle)=\|w\|\phi(\langle w/\|w\|,x\rangle)$ is the normalization step.

## Generalization

### $L_D$, $L_S$, the gap, and the target bound
**Statement:**

$$L_D(h):=\mathbb E_{(x,y)\sim D}[\ell(y,h(x))]$$

(population loss),

$$L_S(h):=\frac1m\sum_{i=1}^m\ell(y_i,h(x_i))$$

(empirical loss), $S\sim D^m$ i.i.d., loss bounded in $[0,1]$ (and $\rho$-Lipschitz when needed). Goal: $\forall\delta\in(0,1)$, w.p. $\ge1-\delta$ over $S$:

$$L_D(\hat h)-L_S(\hat h)\le\Delta(m,\delta,\mathcal H,\hat h,S)$$

— tight AND insightful; classic uniform convergence has $\Delta$ depend only on $(m,\delta,\mathcal H)$.
**Use it when:** setting up any Q3; essay parts on why $\Delta$ must depend on $\hat h$ and $S$ in deep learning.
**Seen in:** all 12 exams' Q3

### Finite-class uniform convergence bound
**Statement:** If $|\mathcal H|<\infty$, then $\forall\delta\in(0,1)$, w.p. $\ge1-\delta$:

$$\forall h\in\mathcal H:\ L_D(h)-L_S(h)\le\sqrt{\frac{\ln(2|\mathcal H|/\delta)}{2m}}=\sqrt{\frac{\ln|\mathcal H|+\ln(2/\delta)}{2m}}$$

Proof: Hoeffding per fixed $h$ + union bound + solve $2|\mathcal H|e^{-2m\epsilon^2}=\delta$. Bit form: $b$ bits ⇒ $|\mathcal H|\le2^b$ ⇒ gap

$$\le\sqrt{\frac{\ln(2/\delta)+b\ln 2}{2m}}$$
**Use it when:** part 1–2 of virtually every Q3 ("you may use Hoeffding but no claims from class").
**Seen in:** example_Q3, a2021_Q3, a2023_Q3, b2023_Q3, a2024_Q3, b2024_Q3, c2024_Q3
**Watch out:** actually proves the two-sided version $\forall h:|L_D-L_S|\le\dots$; non-vacuous only when $m\gtrsim\ln|\mathcal H|$ (≈ #bits).

### Quantized / bit-counting class sizes
**Statement:** Count assignments: $p$ parameters, $k$ values each ⇒ $|\mathcal H|\le k^p$; $d$ entries, $B$ bits each ⇒ $|\mathcal H|\le 2^{Bd}$; matrix $W\in\{1,\dots,B\}^{d\times d}$ ⇒ $|\mathcal H|\le B^{d^2}$; all parameters in $b$ bits ⇒ $|\mathcal H|\le2^b$. The parameters→hypotheses map is surjective, so hypotheses count $\le$ assignments count. Conversely, if $\mathcal H$ can fit every labeling of every $m$-point sample, then $|\mathcal H|\ge2^m$, i.e. $b\ge m$.
**Use it when:** the "prove $|\mathcal H|\le\dots$" opener; the $b\ge m$ direction is the interpolation lower bound.
**Seen in:** a2021_Q3, b2023_Q3, a2024_Q3, b2024_Q3

### Covering + Lipschitz transfer ($+2\rho\epsilon$ pattern)
**Statement:** Let $F$ be a finite $\epsilon$-cover of $H$ in sup norm (

$$\forall h\ \exists f\in F:\ \sup_x|h(x)-f(x)|\le\epsilon$$

) and $\ell$ $\rho$-Lipschitz in its first argument. Then pointwise

$$|\ell(h(x),y)-\ell(f(x),y)|\le\rho\epsilon$$

hence $|L_D(h)-L_D(f)|\le\rho\epsilon$ and $|L_S(h)-L_S(f)|\le\rho\epsilon$, and on the cover's uniform-convergence event:

$$\forall h\in H:\ L_D(h)-L_S(h)\le\Delta(N,\delta,|F|)+2\rho\epsilon$$

Same mechanism as the compression bound $\Delta+2\rho\,d(\hat h,H')$ and the zeroed-coordinate bound $\Delta_r(m,\delta)+2\rho|(w)_r|$.
**Use it when:** infinite classes handled via a finite skeleton ("discretization/compression technique"); index-of-nearest-cover-point bounds.
**Seen in:** a2023_Q3, c2024_Q3, b2020_Q3, a2024_Q3
**Watch out:** the factor 2 — one $\rho\epsilon$ from the population side, one from the empirical side; dropping either loses points.

### Rademacher complexity: definition, main theorem, linear classes
**Statement:**

$$R(A):=\frac1m\mathbb E_\xi\big[\sup_{a\in A}\sum_{i=1}^m\xi_ia_i\big]$$

$\xi_i=\pm1$ w.p. $\frac12$ i.i.d., applied to

$$\ell\circ\mathcal H\circ S:=\{(\ell(y_1,h(x_1)),\dots,\ell(y_m,h(x_m))):h\in\mathcal H\}$$

Main theorem (course constants): w.p. $\ge1-\delta$,

$$\forall h\in\mathcal H:\ L_D(h)-L_S(h)\le 2R(\ell\circ\mathcal H\circ S)+4\sqrt{\frac{2\ln(4/\delta)}{m}}$$

. **Audited: use the 4-constant form** — it is what Lecture 6 Thm 1 states and what the exams hand as a reminder (b2021, a2020); the recitation's self-contained proof yields constant 3 — cite 3 only if you reproduce that proof. Anchors: $R(\{a'\})=0$, $R(\{\pm1\}^m)=1$. Linear-class bounds handed by exams:

$$R(\ell\circ\mathcal H_r\circ S)\le\frac{\rho\,r\,\max_i\|x_i\|}{\sqrt m}$$

($\|w\|\le r$, $\rho$-Lipschitz loss) or simply $\le\frac{r}{\sqrt m}$.
**Use it when:** norm-based generalization questions; interpret $R$ as ability to fit random signs (fit a random subset, anti-fit the rest) — $R\approx1$ for interpolating classes makes the bound vacuous.
**Seen in:** a2020_Q3, b2021_Q3
**Watch out:** proof skeleton (recitation): $\mathbb E_S[\sup_h(L_D-L_S)]\le2\mathbb E_S[R]$ (SSBD Lem 26.2) + McDiarmid twice with bounded differences $c=\frac2m$ + union bound with $\delta/2$.

### Norm-adaptive bound via union over radii
**Statement:** Apply the Rademacher (or given) bound to nested

$$\mathcal H_k=\{h_\theta:\|\theta\|\le k\}$$

$k\in\mathbb N$, with $\delta_k=\frac{6\delta}{\pi^2k^2}$; then for any $h_\theta$ pick

$$k=\lceil\|\theta\|\rceil\ (\le\|\theta\|+1$$

use $k=1$ if $\lceil\cdot\rceil=0$): w.p. $\ge1-\delta$,

$$\forall h_\theta\in\mathcal H:\ L_D(h_\theta)-L_S(h_\theta)\le\frac{2(\|\theta\|+1)}{\sqrt m}+4\sqrt{\frac{2\ln\big(\frac{2\pi^2(\|\theta\|+1)^2}{3\delta}\big)}{m}}$$
**Use it when:** "make the bound depend on the norm of the learned hypothesis" — pairs with GD's min-norm bias.
**Seen in:** b2021_Q3, a2020_Q3, b2022_Q3, b2024_Q3
**Watch out:** the bound is a-posteriori: more data can INCREASE it if $\|\theta(GD(S'))\|$ grows — it is not monotone in $m$ alone (b2021_Q3b).

### PAC-Bayes theorem + instantiations
**Statement:** (course form) For any prior $P$ over $\mathcal H$ fixed independently of $S$, w.p. $\ge1-\delta$ over $S$, **for all** posteriors $Q$ (even $S$-dependent):

$$L_D(Q)-L_S(Q)\le\sqrt{\frac{\mathrm{KL}(Q\|P)+\ln(2m/\delta)}{2(m-1)}}$$

where $L(Q)=\mathbb E_{h\sim Q}[L(h)]$,

$$\mathrm{KL}(Q\|P)=\mathbb E_{h\sim Q}[\ln\frac{Q(h)}{P(h)}]$$

Instantiations: uniform prior + point-mass posterior ⇒ $\mathrm{KL}=\ln|\mathcal H|$ (finite-class bound); prior $P(h_k)=2^{-k}$ over countable $\mathcal H$ ⇒ $\mathrm{KL}=k\ln2$ (index-preferring bound); Gaussian $P=N(0,\sigma^2I)$, $Q=N(\hat\theta,\sigma^2I)$ ⇒

$$\mathrm{KL}=\frac{\|\hat\theta\|^2}{2\sigma^2}$$

⇒ flat-minimum + low-norm criterion.
**Use it when:** countable-class bounds, algorithm-adapted priors ($\delta_m$ schedules), "is this estimation method valid?" traps.
**Seen in:** a2022_Q3, example_Q3
**Watch out:** $P$ must NOT depend on $S$ — centering the prior at the trained $h$ is the classic illegal move (a2022_Q3d); denominators are $2(m-1)$ and the log is $\ln(2m/\delta)$, not $\ln(1/\delta)$; the guarantee is for $L_D(Q)$ (stochastic network), not $L_D(h_{\hat\theta})$.

### Min-norm implicit bias of GD (linear regression)
**Statement:** (Prop 1 + Lem 1, lecture 7) Overparameterized linear regression ($d>m$, $\{x_i\}$ linearly independent,

$$X=[x_1,\dots,x_m]\in\mathbb R^{d\times m}$$

instances-as-columns): any iterative method with $w^{(0)}=0$ and updates in

$$\mathrm{span}\{\nabla\ell_{(x_i,y_i)}(w)\}=\mathrm{span}\{x_i\}$$

(GD/SGD ± momentum) that converges to zero loss converges to $X(X^\top X)^{-1}y$ — the **minimum Euclidean norm** interpolator. (Row convention $X\in\mathbb R^{m\times d}$: $w^*=X^\top(XX^\top)^{-1}y$ — same object.) Proof: iterates and limit stay in the span; zero loss in the span is unique (invertible Gram); Pythagoras kills any orthogonal component.
**Use it when:** "prove GD converges to the min-norm solution" + feeding the norm-adaptive bound; NTK version: min-RKHS-norm interpolator, kernel-only.
**Seen in:** a2020_Q3, b2022_Q3
**Watch out:** zero initialization and convergence-to-zero-loss are ASSUMPTIONS; invertibility is of the $m\times m$ Gram matrix ($X^\top X$ in the column convention) — check which convention the exam uses; b2022 variant: invertible $\ell$ makes level sets affine, so the argument works at any iterate $\bar t$.

### Zhang et al. random-label phenomena (what they refute)
**Statement:** (1) Standard overparameterized nets generalize well with NO explicit regularization; (2) the same nets perfectly fit arbitrary data — even random labels/instances; (3) with half the training set replaced by random data, test error is still far better than trivial; (4) adversarially corrupting half the labels significantly hurts test error (train error still ≈0). Consequences: $\Delta$ must depend on $\hat h$ (some zero-train-loss hypotheses generalize, others don't) and on $S$; distribution-oblivious, hypothesis-uniform bounds are refuted.
**Use it when:** "explain why uniform-convergence bounds are not tight in deep learning" — quote the phenomena and map each bound to the phenomenon it fails.
**Seen in:** a2021_Q3, b2023_Q3, example_Q3

### Interpolation makes uniform convergence vacuous
**Statement:** (b2023_Q3) If $\mathcal H$ (represented in $b$ bits) can fit every sample of size $m$, then $b\ge m$, so the UC bound is

$$\ge\sqrt{\frac{m\ln2}{2m}}=\sqrt{\ln2/2}\approx0.59$$

— a constant; with losses in $[0,1]$ this is trivial. Moreover the same class admits $D$ with $L_D(h)=0.5$ for every $h$ (labels = independent Bernoulli(1/2) noise) and another $D$ (point mass) where an interpolating $h$ has $L_D(h)=0$ — capacity alone cannot distinguish chance from perfect generalization.
**Use it when:** the "why is this guarantee trivial?" sub-question after a bit-counting bound.
**Seen in:** b2023_Q3

### Implicit regularization narrative
**Statement:** Among the many empirical-loss minimizers of an overparameterized model, gradient-based optimization tends to select "simple" ones per some complexity measure (min $\ell_2$-norm in linear regression from $w_0=0$; min RKHS norm in the NTK regime; max margin $u^*$ for separable classification with exponential loss; low rank in matrix factorization) — and under natural distributions such simplicity correlates with generalization.
**Use it when:** the one-line "why do networks generalize although UC fails" answer; justifying algorithm-adapted (SRM/index-weighted) bounds.
**Seen in:** a2021_Q3, b2021_Q3, example_Q3
**Watch out:** the bias is a property of the ALGORITHM (+ init + parameterization), not of the class — a bound exploiting it must be non-uniform.

### Deep matrix factorization ≠ nuclear norm minimization
**Statement:** (Prop 1, lecture 8) Gunasekar et al.'s conjecture — depth-2 MF with small LR and near-zero init returns $\arg\min\|W\|_{nuclear}$ s.t. $\langle X_i,W\rangle=y_i$ — is proven only in special cases and FALSE in general: on the completion problem $\begin{pmatrix}?&1\\1&0\end{pmatrix}$, GF from balanced init with $\det(W_{1:N}(0))>0$ that converges to zero loss forces $(W_{1:N})_{1,1}\to\infty$, so EVERY norm $\to\infty$ while the distance to rank 1 $\to0$: the implicit bias is (approximate) rank minimization, not norm minimization.
**Use it when:** "is MF's implicit regularization a norm?" discussion; contrast with the classical convex surrogate (nuclear norm + RIP + $m\in\Omega(r(d+d')\log(d+d'))$ recovers $W^*$).
**Seen in:** core theory (lecture 8; low-rank-bias flavor in a2024_Q2/Q3)
**Watch out:** mechanism: $\sigma_r(t)>0$ for all $t$ (closed-form ODE solutions) ⇒ $\det$ never vanishes ⇒ keeps its sign; fitted entries $\to(1,1,0)$ force $(W)_{1,1}=\frac{(W)_{1,2}(W)_{2,1}+\det}{(W)_{2,2}}\to\infty$.

## Canonical examples to have ready

### $-x^2$ against convex classes ⧉ external
**Statement:** A concave target like $f(x)=-x^2$ cannot be approximated by any class of convex functions in sup distance on an interval: for convex $h$, $h(\frac{a+b}{2})\le\frac{h(a)+h(b)}{2}$, so with $\epsilon:=\sup|f-h|$ the midpoint gives

$$f(\frac{a+b}{2})-\frac{f(a)+f(b)}{2}\le2\epsilon$$

— on $[0,1]$ with $f=-x^2$ this forces $\epsilon\ge\frac18$. **Audited: NOT in the course materials** — this is a Mock Exam 1 construction; the technique (structural obstruction ⇒ quantitative inapproximability) mirrors course-grounded arguments (value-at-a-point obstructions, b2024_Q1(4)).
**Use it when:** showing a hypothesis class with a structural property (convexity, monotonicity, boundedness) is not universal — the *pattern* is exam-relevant even though this instance is ours.
**Seen in:** Mock Exam 1 Q1.2 (generated); pattern relatives: b2024_Q1

### The sawtooth $g^{\circ L-1}$ (depth-separation witness)
**Statement:** $g(x)=[2x]_+-[4x-2]_++[2x-2]_+$; $g^{\circ L-1}$ is realized by an $L$-layer width-3 ReLU net and has $2+2^{L-1}$ linear pieces, so any shallow net realizing it needs width $\ge2^{L-1}+1$, and even $\epsilon$-approximating it in $\int_0^1|\cdot|$ needs $B>2^{L+2}(\frac18-\epsilon)-6$.
**Use it when:** any "show deep is exponentially more efficient than shallow" for piecewise-linear activations.
**Seen in:** a2020_Q1, b2022_Q1

### The identity matrix $I_{M^{N/2}}$ (rank-separation witness)
**Statement:** A deep CAC assignment with $r_0\ge M$ (basis filters at layer 0, all-ones filter at layer 1) yields $[\![\mathcal A^{HT}]\!]=I_{M^{N/2}}$, of full rank $M^{N/2}$; every shallow tensor has

$$\operatorname{rank}[\![\mathcal A^{CP}]\!]\le Z$$

and EYM gives

$$\|[\![\mathcal A^{CP}]\!]-I_{M^{N/2}}\|_F\ge\sqrt{M^{N/2}-B}$$

— so $\epsilon$-approximation forces $B\ge M^{N/2}-\epsilon^2$.
**Use it when:** exhibiting the hard function for CAC depth separation and its inapproximability strengthening.
**Seen in:** core theory (lecture 2; tensor machinery examined in b2020_Q1, a2022_Q1)

### Single-ReLU unreachable-loss dataset
**Statement:** Shallow bias-free ReLU net, balanced init with all $v_m(0)>0$: outputs satisfy

$$h_{\theta(t)}(x)=\sum_mv_m(t)\phi(\langle w_m(t),x\rangle)\ge0$$

forever (sign preservation). Hence one example with negative label $y_{\bar n}<0$ makes

$$\mathcal L(\theta(t))\ge y_{\bar n}^2>0$$

for all $t$: gradient flow can never reach loss below $\epsilon=y_{\bar n}^2$, although the class itself can fit the data.
**Use it when:** demonstrating that GF from a bad (sign-locked) init provably fails — optimization failure without a landscape obstruction.
**Seen in:** b2022_Q2

### Scalar factorization dynamics solved qualitatively
**Statement:** For $L(W)=$ squared distance to a target, the per-direction dynamics are cubic/logistic: symmetric $d{=}1$ case $\dot\lambda=8\lambda(\lambda^*-\lambda)$ (from

$$\dot\lambda_r=4\lambda_r\langle-\nabla L,v_rv_r^\top\rangle$$

), depth-$N$ singular values

$$\dot\sigma_i=-N\sigma_i^{2-\frac2N}\cdot\frac{1}{dd'}(\sigma_i-\sigma_i^*)$$

solutions linger exponentially long near $0$ (small init $\epsilon$), then rise sharply at time

$$\sim\frac{dd'}{2\sigma_i^*}\ln\frac1\epsilon$$

then saturate at $\sigma_i^*$ — larger true singular values are learned first, one at a time; $N=1$ gives plain exponential relaxation with NO such bias.
**Use it when:** the "explain qualitatively why near-zero init gives low rank" 5-point closer of MF questions.
**Seen in:** a2021_Q2, a2024_Q2
**Watch out:** sign preservation ($\lambda_r(t)=\lambda_r(0)e^{\int\cdots}$) means eigenvalues can never cross zero — growth must come through amplification, not sign flips.

### Diagonal / Hadamard overparameterization ⇒ sparsity bias
**Statement:** For

$$\phi(u_1,\dots,u_N)=L(u_1\odot\cdots\odot u_N)$$

(diagonal linear network) with balanced positive init:

$$\dot w=-N\,\nabla L(w)\odot w^{2-\frac2N}$$

entrywise. Each coordinate moves at rate $\propto|w_i|^{2-2/N}$: coordinates at $0$ have $\dot w_i=0$ (zero coords stay zero), near-zero coordinates barely move, large ones accelerate. (The dynamics and conservation are exam-grounded — b2023_Q2; calling this "a bias toward **sparse** vectors, the entrywise analogue of low-rank bias" is our interpretation — the course states the rich-get-richer dynamics but never uses the word "sparse". Present the dynamics, not the slogan, unless asked to interpret.)
**Use it when:** Hadamard/diagonal-network Q2s and "what is the implicit bias here?" follow-ups.
**Seen in:** b2023_Q2
**Watch out:** balancedness here is entrywise ($u_i^2(t)-u_j^2(t)$ conserved); the same-sign assumption at init is what keeps $u_1(t)=\dots=u_N(t)$.
