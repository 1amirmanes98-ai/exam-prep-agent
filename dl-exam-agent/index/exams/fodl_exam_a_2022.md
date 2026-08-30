# FODL Exam — Moed A 2022
**Date / semester:** 15.07.2022, Semester B 2021/22 (תשפ"ב); lecturer Dr. Nadav Cohen, TA Noam Razin; 3 hours, no aid material
**Total points:** 110

## Q1 (37 pts) — Separation rank equals rank of matricization
**Topics:** tensor-methods, kronecker, depth-separation, hypothesis-class | **Pillar:** Expressiveness | **Difficulty:** 4
**Maps to:** lecture_02_expressiveness, fodl_recitation_kronecker_expressiveness
**Statement (English translation):**
Let $f:(\mathbb{R}^D)^N \to \mathbb{R}$ be a function defined over $N \in \mathbb{N}$ variables, each $D \in \mathbb{N}$-dimensional, as follows:

$$f(x^{(1)},\dots,x^{(N)}) := \langle x^{(1)} \otimes \cdots \otimes x^{(N)}, \mathcal{A}\rangle = \sum_{d_1=1}^{D}\cdots\sum_{d_N=1}^{D} x^{(1)}_{d_1}\cdots x^{(N)}_{d_N}\cdot \mathcal{A}_{d_1,\dots,d_N}$$

where $\mathcal{A} \in \mathbb{R}^{D\times\cdots\times D}$ is a tensor of order $N$, $\otimes$ denotes the outer (tensor) product between two vectors/tensors, and $\langle\cdot,\cdot\rangle$ is the standard inner product between two tensors. Let $I \subset \{1,\dots,N\}$. For simplicity, assume $I = \{1,\dots,|I|\}$.

Notation:
- Denote $I^c := \{1,\dots,N\}\setminus I = \{|I|+1,\dots,N\}$.
- Denote by $\mathrm{mat}(\mathcal{A};I) \in \mathbb{R}^{D^{|I|}\times D^{|I^c|}}$ the matricization of $\mathcal{A}$ with respect to $I$: the matrix obtained by rearranging the entries of $\mathcal{A}$ so that the modes (axes) in $I$ are mapped to rows and the remaining modes to columns. Denote by $\mathrm{row}(d_1,\dots,d_{|I|})$ the row index in $\mathrm{mat}(\mathcal{A};I)$ corresponding to $d_1,\dots,d_{|I|} \in \{1,\dots,D\}\times\cdots\times\{1,\dots,D\}$, and similarly by $\mathrm{col}(d_{|I|+1},\dots,d_N)$ the column index in $\mathrm{mat}(\mathcal{A};I)$ corresponding to $d_{|I|+1},\dots,d_N \in \{1,\dots,D\}\times\cdots\times\{1,\dots,D\}$.

Reminder (תזכורת): the *separation rank* of $f$ with respect to $I$ is defined as:

$$\mathrm{sep}(f;I) := \min\left\{ R\in\mathbb{N}\cup\{0\} : \exists\, g_1,\dots,g_R:(\mathbb{R}^D)^{|I|}\to\mathbb{R},\ \bar g_1,\dots,\bar g_R:(\mathbb{R}^D)^{|I^c|}\to\mathbb{R} \ \ s.t.\ \ f(x^{(1)},\dots,x^{(N)}) = \sum_{r=1}^{R} g_r\big((x^{(i)})_{i\in I}\big)\cdot \bar g_r\big((x^{(j)})_{j\in I^c}\big)\right\}$$

**a. (15 pts)** Prove that $\mathrm{sep}(f;I) \le \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$.

**b. (15 pts)** Let $h:(\mathbb{R}^D)^N \to \mathbb{R}$ be an arbitrary function. For arbitrary vectors $v^{(1)},\dots,v^{(K)} \in \mathbb{R}^D$, denote by $\mathcal{V} \in \mathbb{R}^{K\times\cdots\times K}$ the order-$N$ tensor defined by:
$$\mathcal{V}_{k_1,\dots,k_N} = h\big(v^{(k_1)},\dots,v^{(k_N)}\big) \quad \text{for all } k_1,\dots,k_N \in \{1,\dots,K\}\times\cdots\times\{1,\dots,K\}.$$
In words, $\mathcal{V}$ is the tensor holding the outputs of $h$ over every possible combination of $N$ vectors taken from $\{v^{(1)},\dots,v^{(K)}\}$ (with repetitions). Prove that $\mathrm{sep}(h;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{V};I)$.

*Hint (רמז):* Show that $\mathcal{V} = \sum_{r=1}^{\mathrm{sep}(h;I)} \mathcal{Z}_r \otimes \bar{\mathcal{Z}}_r$ for tensors $\mathcal{Z}_1,\dots,\mathcal{Z}_{\mathrm{sep}(h;I)} \in \mathbb{R}^{K\times\cdots\times K}$ of order $|I|$ and $\bar{\mathcal{Z}}_1,\dots,\bar{\mathcal{Z}}_{\mathrm{sep}(h;I)} \in \mathbb{R}^{K\times\cdots\times K}$ of order $|I^c|$.

**c. (7 pts)** Prove that $\mathrm{sep}(f;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$.

*Hint:* Use sub-part b. That is, find vectors $v^{(1)},\dots,v^{(D)} \in \mathbb{R}^D$ such that the tensor $\mathcal{V}$ corresponding to them equals $\mathcal{A}$.

**Solution sketch:**
**a.** Let $R := \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$ and write a rank decomposition $\mathrm{mat}(\mathcal{A};I) = \sum_{r=1}^R u_r \bar u_r^\top$. Define

$$g_r((x^{(i)})_{i\in I}) := \sum_{d_1,\dots,d_{|I|}} \big(\prod_{i\le|I|} x^{(i)}_{d_i}\big)(u_r)_{\mathrm{row}(d_1,\dots,d_{|I|})}$$

and $\bar g_r$ analogously with $\bar u_r$ and column indices. Expanding $f$ entrywise and substituting $\mathcal{A}_{d_1,\dots,d_N} = \sum_r (u_r)_{\mathrm{row}(\cdot)}(\bar u_r)_{\mathrm{col}(\cdot)}$ splits the sum into $\sum_{r=1}^R g_r \cdot \bar g_r$, so $\mathrm{sep}(f;I)\le R$.

**b.** If $\mathrm{sep}(h;I) = R'$ with $h = \sum_{r=1}^{R'} g_r\bar g_r$, define

$$(\mathcal{Z}_r)_{k_1,\dots,k_{|I|}} := g_r(v^{(k_1)},\dots,v^{(k_{|I|})})$$

and

$$(\bar{\mathcal{Z}}_r)_{k_{|I|+1},\dots,k_N} := \bar g_r(v^{(k_{|I|+1})},\dots,v^{(k_N)})$$

Evaluating $h$ on the grid gives

$$\mathcal{V} = \sum_{r=1}^{R'} \mathcal{Z}_r \otimes \bar{\mathcal{Z}}_r$$

(the hint). Matricizing is linear and

$$\mathrm{mat}(\mathcal{Z}_r\otimes\bar{\mathcal{Z}}_r;I) = \mathrm{vec}(\mathcal{Z}_r)\,\mathrm{vec}(\bar{\mathcal{Z}}_r)^\top$$

is rank $\le 1$, so

$$\mathrm{rank}\,\mathrm{mat}(\mathcal{V};I) \le R' = \mathrm{sep}(h;I)$$

(sub-additivity of rank).

**c.** Choose $K = D$ and $v^{(k)} := e_k$ (standard basis). By multilinearity,

$$f(e_{d_1},\dots,e_{d_N}) = \mathcal{A}_{d_1,\dots,d_N}$$

so $\mathcal{V} = \mathcal{A}$. Apply (b) with $h = f$ to get

$$\mathrm{sep}(f;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$$

Together with (a), this yields the classic identity

$$\boxed{\,\mathrm{sep}(f;I) = \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)\,}$$

used in depth-separation analyses of tensor/convolutional models.

**💡 Useful tricks:** Upper bound: a rank decomposition of $\mathrm{mat}(\mathcal A;I)$ *is* a separating sum; lower bound: evaluate $h$ on a grid to get $\mathcal V=\sum_r\mathcal Z_r\otimes\bar{\mathcal Z}_r$, and $\mathrm{mat}(\mathcal Z\otimes\bar{\mathcal Z})=\mathrm{vec}(\mathcal Z)\mathrm{vec}(\bar{\mathcal Z})^\top$ is rank $\leq1$; close the gap with $v^{(k)}=e_k$ so $\mathcal V=\mathcal A$ (multilinearity).

**⚠️ Watch out:** (a) and (b)/(c) are the two *opposite* inequalities — keep them straight; the lower bound leans on matricization being *linear* and rank being sub-additive; in (c) the standard-basis choice is the entire trick — justify $f(e_{d_1},\dots,e_{d_N})=\mathcal A_{d_1\dots d_N}$.

## Q2 (40 pts) — Gradient flow conservation & loss landscape of one-hidden-layer ReLU nets
**Topics:** gradient-flow, balancedness, conservation-laws, initialization, saddle-points, local-minima | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_03_optimization_1, lecture_04_optimization_2, fodl_recitation_gradient_flow
**Statement (English translation):**
Let $\mathcal{H}$ be the hypothesis class of neural networks with one hidden layer of width $M \in \mathbb{N}$, $D \in \mathbb{N}$-dimensional input, one-dimensional output (i.e. $X = \mathbb{R}^D$, $Y = \mathbb{R}$ where $X$ is the input space and $Y$ the output space), ReLU activation on the hidden-layer neurons, and no biases. Formally:

$$\mathcal{H} = \left\{ x \mapsto \sum_{m=1}^{M} v_m\,\sigma(\langle w_m, x\rangle) \ :\ w_1,\dots,w_M \in \mathbb{R}^D,\ v_1,\dots,v_M \in \mathbb{R} \right\}$$

where $\sigma(z) := \max\{0,z\}$. Denote by $\theta := (w_1,\dots,w_M,v_1,\dots,v_M) \in \mathbb{R}^{MD+M}$ the network's parameter vector, and by $h_\theta:\mathbb{R}^D\to\mathbb{R}$ the mapping it realizes, i.e. $h_\theta(x) := \sum_{m=1}^M v_m\sigma(\langle w_m,x\rangle)$.

Given a differentiable loss function $\ell:\mathbb{R}\times\mathbb{R}\to\mathbb{R}$ and a training sample $\{(x_1,y_1),\dots,(x_N,y_N)\} \subset (X\times Y)^N$, we define the empirical loss over the network parameters as:

$$L(\theta) = \sum_{n=1}^{N} \ell(h_\theta(x_n), y_n)$$

**a. (12 pts)** Suppose gradient flow is run over $L$ with initialization $\theta_0 \in \mathbb{R}^{MD+M}$. Denote by $\theta(t)$, and correspondingly $\{w_m(t), v_m(t)\}_{m=1}^M$, the network parameters at time $t \ge 0$. For simplicity, you may assume the flow exists and is well-defined, and that $\frac{d}{dz}\sigma(0) := 0$, i.e. the non-differentiability of ReLU at $0$ does not "disturb". Prove that for every $m \in \{1,\dots,M\}$: $\ \frac{d}{dt} v_m(t)^2 = \frac{d}{dt} \|w_m(t)\|^2$.

Now assume $L(\theta) = (h_\theta(x) - y)^2$ for $x \in \mathbb{R}^D,\ y \in \mathbb{R}$ with $x \neq 0,\ y > 0$. That is, assume the training sample contains a single example, which is nonzero and has a positive label, and the loss is quadratic.

**b. (6 pts)** Prove that $\theta = 0$ is a critical point of $L$.

**c. (11 pts)** Prove that $\theta = 0$ is a saddle point of $L$, in the sense that for every $\epsilon > 0$ there exist $\theta_1, \theta_2 \in \mathbb{R}^{MD+M}$ with $\|\theta_1\| < \epsilon,\ \|\theta_2\| < \epsilon$, for which $L(\theta_2) < L(0) < L(\theta_1)$.

**d. (11 pts)** Prove that $L$ has a "bad" local minimum. That is, find $\theta \in \mathbb{R}^{MD+M}$ that is on the one hand a local minimum, while on the other hand there exists $\theta^* \in \mathbb{R}^{MD+M}$ satisfying $L(\theta^*) < L(\theta)$.

*Hint:* Look at regions of parameter space where the ReLU activation zeroes out all the neurons in the hidden layer.

**Solution sketch:**
**a.** Gradient flow:

$$\dot v_m = -\sum_n \ell'(h_\theta(x_n),y_n)\,\sigma(\langle w_m,x_n\rangle)$$

and

$$\dot w_m = -\sum_n \ell'(h_\theta(x_n),y_n)\,v_m\,\sigma'(\langle w_m,x_n\rangle)x_n$$

($\ell'$ = derivative in first argument). Then $\frac{d}{dt}v_m^2 = 2v_m\dot v_m$ and $\frac{d}{dt}\|w_m\|^2 = 2\langle w_m,\dot w_m\rangle$. The 1-homogeneity identity $z\,\sigma'(z) = \sigma(z)$ (valid at $z=0$ under the convention) makes both equal $-2\sum_n \ell'(\cdot)\,v_m\,\sigma(\langle w_m,x_n\rangle)$. This is the balancedness conservation law: $v_m(t)^2 - \|w_m(t)\|^2$ is constant.

**b.** At $\theta=0$: $\partial L/\partial v_m \propto \sigma(\langle 0,x\rangle) = 0$ and $\partial L/\partial w_m \propto v_m = 0$, so $\nabla L(0)=0$. Note $L(0) = y^2$.

**c.** Take $u := x/\|x\|$ and the perturbation with only $w_1 = \tfrac{\epsilon}{2}u$, $v_1 = \pm\tfrac{\epsilon}{2}$: then $h_\theta(x) = \pm\tfrac{\epsilon^2}{4}\|x\|=: \pm c$. With $v_1<0$: $L = (y+c)^2 > y^2$ (gives $\theta_1$). With $v_1>0$ and $\epsilon$ small enough that $c < 2y$: $L = (y-c)^2 < y^2$ (gives $\theta_2$). Both have norm $<\epsilon$.

**d.** Take $\bar\theta$ with $w_m := -x$ for all $m$ (so $\langle w_m,x\rangle = -\|x\|^2 < 0$) and arbitrary $v$ (e.g. $v=0$). For any small perturbation, $\langle w_m',x\rangle$ stays negative, so all ReLUs output $0$, $h\equiv 0$ on the neighborhood, and $L \equiv y^2$: $\bar\theta$ is a local minimum. It is "bad": $\theta^*$ with $w_1 = x$, $v_1 = y/\|x\|^2$ (rest zero) gives $h_{\theta^*}(x) = y$, i.e.

$$L(\theta^*) = 0 < y^2 = L(\bar\theta)$$

**💡 Useful tricks:** The homogeneity identity $z\,\sigma'(z)=\sigma(z)$ drives balancedness $v_m^2-\|w_m\|^2=\mathrm{const}$; $\theta=0$ is critical because both partial gradients carry a $\sigma(0)$ or a $v_m=0$ factor; build a saddle with a rank-1 bump giving $h=\pm c$ (pick the sign); a "bad" local min lives in the *all-ReLUs-off* region ($w_m=-x$) where $h\equiv0$ locally so $L\equiv y^2$ while the global is $0$.

**⚠️ Watch out:** (a) the $\sigma'(0):=0$ convention plus $z\sigma'(z)=\sigma(z)$ is what equates the two derivatives; (c) exhibit BOTH a higher point $\theta_1$ and a lower point $\theta_2$ within $\epsilon$; (d) the flat dead-ReLU neighborhood is the local min — the perturbation must keep *every* activation off, else $h\not\equiv0$.

## Q3 (33 pts) — PAC-Bayes: countable-class bounds, algorithm-adapted priors, and a data-dependent-prior pitfall
**Topics:** pac-bayes, concentration, uniform-convergence, probability-tools, standard-practices | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1
**Statement (English translation):**
For an input space $X$ and output space $Y$, let $\mathcal{H} = \{h_m\}_{m=1}^{\infty} \subset Y^X$ be a countable hypothesis class. Let $D$ be an (unknown) distribution over $X \times Y$, let $S = \{(x_n,y_n)\}_{n=1}^N$ be a training sample of $N$ examples drawn i.i.d. from $D$, and let $\ell: Y\times Y \to [0,1]$ be a loss function. For a hypothesis $h \in \mathcal{H}$, denote by $L_D(h)$ the generalization (population) loss (i.e. $L_D(h) := \mathbb{E}_{(x,y)\sim D}[\ell(h(x),y)]$) and by $L_S(h)$ the sample (empirical) loss (i.e. $L_S(h) := \frac{1}{N}\sum_{n=1}^N \ell(h(x_n),y_n)$).

Reminder (PAC-Bayes bound): Let $P$ be a prior distribution over $\mathcal{H}$ and let $\delta \in (0,1)$. Then, with probability at least $1-\delta$ over the sample $S$, for every distribution $Q$ over $\mathcal{H}$:

$$\mathbb{E}_{h\sim Q}[L_D(h)] - \mathbb{E}_{h\sim Q}[L_S(h)] \le \sqrt{\frac{KL(Q\|P) + \ln(2N/\delta)}{2(N-1)}}$$

where $KL(Q\|P) := \mathbb{E}_{h\sim Q}[\ln(Q(h)/P(h))]$ is the Kullback-Leibler divergence between $Q$ and $P$.

**a. (13 pts)** Let $\delta \in (0,1)$. Prove, based on the PAC-Bayes bound from the reminder, that for every positive $\{\delta_m\}_{m=1}^\infty$ satisfying $\sum_{m=1}^\infty \delta_m = \delta$, with probability at least $1-\delta$ over the sample $S$, for every $m \in \mathbb{N}$:

$$L_D(h_m) - L_S(h_m) \le \sqrt{\frac{\ln(2N/\delta_m)}{2(N-1)}}$$

*Hint:* Think of the case where $P$ and $Q$ are concentrated on a single hypothesis.

**b. (6 pts)** Suppose we have a learning algorithm $A$ that always returns a hypothesis from some finite pre-specified subset $\mathcal{H}' \subset \mathcal{H}$ (i.e. $|\mathcal{H}'| < \infty$). Use the bound from sub-part a to obtain a generalization bound suited to using algorithm $A$. That is, the bound should be smaller for hypotheses in $\mathcal{H}'$ than for hypotheses in $\mathcal{H}\setminus\mathcal{H}'$ (it is even desirable that it promise nothing at all for hypotheses not in $\mathcal{H}'$).

**c. (6 pts)** Suppose we have a learning algorithm $B$ that tends to return hypotheses $h_m \in \mathcal{H}$ with lower index $m \in \mathbb{N}$. Use the bound from sub-part a to obtain a generalization bound suited to using algorithm $B$. That is, the bound should be smaller for hypotheses with lower index.

**d. (8 pts)** "Suppose I use my favorite learning algorithm to learn a hypothesis for the CIFAR10 dataset. I get back a hypothesis $h$ with low empirical 0-1 loss. I wish to estimate how well my hypothesis generalizes without using a validation set. To that end, I use the PAC-Bayes bound from the reminder and choose distributions $P$ and $Q$ that assign probability $1$ to $h$ and $0$ to all other hypotheses. I observe that the bound is small with high probability. Is my estimation method valid? If not, justify."

**Solution sketch:**
**a.** For each $m$, invoke the PAC-Bayes reminder with prior $P := \delta_{h_m}$ (point mass) and confidence parameter $\delta_m$, then pick $Q := \delta_{h_m}$: the KL term vanishes and the expectations collapse, giving

$$L_D(h_m)-L_S(h_m) \le \sqrt{\ln(2N/\delta_m)/(2(N-1))}$$

with failure probability $\le \delta_m$. Union bound over $m \in \mathbb{N}$: total failure probability $\le \sum_m \delta_m = \delta$, so all bounds hold simultaneously w.p. $\ge 1-\delta$. (Alternative single-shot proof: prior $P(h_m) = \delta_m/\delta$, $Q = \delta_{h_m}$, so $KL = \ln(\delta/\delta_m)$ and $\ln(\delta/\delta_m) + \ln(2N/\delta) = \ln(2N/\delta_m)$.)

**b.** Allocate the confidence budget only to $\mathcal{H}'$: $\delta_m := \delta/|\mathcal{H}'|$ for $h_m \in \mathcal{H}'$ and $\delta_m := 0$ otherwise (interpreting the bound as vacuous/$+\infty$ outside $\mathcal{H}'$). Result: w.p. $\ge 1-\delta$, $\forall h \in \mathcal{H}'$:

$$L_D(h)-L_S(h) \le \sqrt{\ln(2N|\mathcal{H}'|/\delta)/(2(N-1))}$$

— the finite-class uniform bound. Nothing is promised outside $\mathcal{H}'$. (If strict positivity of all $\delta_m$ is insisted on, give $\mathcal{H}'$ budget $(1-\lambda)\delta$ and spread $\lambda\delta$ geometrically outside, $\lambda$ small.)

**c.** Choose a decreasing positive schedule, e.g. $\delta_m := \delta\,2^{-m}$: bound

$$\sqrt{(\ln(2N/\delta) + m\ln 2)/(2(N-1))}$$

monotonically increasing in $m$, hence tighter for low-index (algorithm-preferred) hypotheses. Any summable decreasing schedule (e.g. $\delta\frac{6}{\pi^2 m^2}$) works.

**d.** The method is invalid. In PAC-Bayes the prior $P$ must be fixed **before** seeing the sample $S$. Here $h$ is the output of a learning algorithm trained on $S$, so $P$ (and $Q$) depend on $S$. The theorem's probabilistic guarantee (over draws of $S$ for a fixed $P$) therefore does not apply. The $KL=0$ "free lunch" is exactly the illegal data-dependent prior. Correct alternatives: fix a prior in advance and pay $KL$/$\ln(1/\delta_m)$ as in (a)-(c), or estimate generalization with held-out (validation) data.

**💡 Useful tricks:** Point-mass $P=Q=\delta_{h_m}$ kills the $KL$ term ⇒ per-hypothesis bound; union over $m$ with any $\sum\delta_m=\delta$ (or single-shot prior $P(h_m)=\delta_m/\delta$ so $KL=\ln(\delta/\delta_m)$); algorithm-adapted priors = concentrate the budget on $\mathcal H'$ (finite-class bound) or use a decreasing schedule $\delta_m=\delta2^{-m}$ for low-index preference.

**⚠️ Watch out:** (d) is the classic trap — the PAC-Bayes prior $P$ must be fixed *before* seeing $S$; putting $P=Q=\delta_h$ on the *trained* $h$ is an illegal data-dependent prior, so the guarantee is void; the only fixes are a pre-committed prior (pay $KL$) or a held-out validation set.
