# Lecture 2 - Expressiveness 1
- **File:** materials/lectures/lecture_02_expressiveness.pdf | **Text:** materials/text/lectures/lecture_02_expressiveness.txt
- **Pillar:** Expressiveness
- **One-paragraph summary:** Makes the three expressiveness concepts of Lecture 1 (universality, expressive efficiency, inductive bias) fully rigorous on two concrete architectures. (i) Fully connected ReLU networks with scalar input (Telgarsky): the shallow class realizes exactly the piecewise linear functions (width $B$ ⟹ $\le B+1$ pieces), which yields $L^1([0,1])$-universality for continuous targets; composing the width-3 "tent" map $g(x)=[2x]_+-[4x-2]_+ +[2x-2]_+$ gives an $L$-layer, width-3 sawtooth function with $2+2^{L-1}$ pieces that a shallow network cannot even *approximate* unless $B>2^{L+2}(\tfrac18-\epsilon)-6$ — exponential expressive efficiency of depth, with inapproximability. (ii) Convolutional arithmetic circuits on $\mathcal X=[M]^N$: functions ≡ order-$N$ tensors; the shallow (global product pooling) network computes a CP decomposition and the deep ($L=\log_2N$ layers, pairwise pooling) network a Hierarchical Tucker decomposition. Matricization rank arguments (Kronecker rank multiplicativity + Eckart–Young–Mirsky) show the deep network with width $O(M)$ attains canonical-matricization rank $M^{N/2}$ — for *almost all* parameter values (zero-set-of-polynomial argument ⟹ **complete** exponential expressive efficiency, with inapproximability $B\ge M^{N/2}-\epsilon^2$). Finally, separation rank $\mathrm{sep}[f;I]=\mathrm{rank}[\![\mathcal A]\!]_I$ quantifies modeled dependencies: the shallow network's separation ranks are $\le Z$ under *every* partition, while the deep network supports maximal (exponential) separation rank under the checkerboard partition but only $\le r_{L-1}$ under halving — an inductive bias toward local dependencies, tunable via pooling geometry.

## Outline
1. **Fully Connected ReLU Networks With Scalar Input** (based on Telgarsky [4]); $\mathcal X=\mathcal Y=\mathbb R$.
   1. *1.1 Shallow Network* — 2-layer width-$B$ ReLU class $\mathcal H_B$; monotone in $B$.
   2. *1.2 Deep Network* — $L(\ge3)$-layer width-$\bar B$ class $\bar{\mathcal H}_{\bar B}$; monotone; contains $\mathcal H_{B}$ via passthrough (identity) layers.
   3. *1.3 Universality* — piecewise linear functions (Def 1) approximate continuous functions in $d(f_1,f_2)=\int_0^1|f_1-f_2|$; Prop 1 + Lemma 1 ⟹ $\mathcal F$-universality of shallow (hence deep).
   4. *1.4 Expressive Efficiency* — sawtooth $g^{\circ L-1}$ realizable at depth $L$ width 3; a shallow net needs $B\in\exp(L)$ to realize (Prop 2) or even approximate it (interval-missing argument).
2. **Convolutional Arithmetic Circuits** — $\mathcal X=[M]^N$ ($N$ a power of 2), $\mathcal Y=\mathbb R$; functions identified with order-$N$ tensors $\mathcal A_{d_1,\dots,d_N}:=f(d_1,\dots,d_N)$.
   1. *2.1 Shallow Network* — one-hot representation → $1\times1$ conv (width $Z$) → global product pooling → linear output; computes CP decomposition (Prop 3).
   2. *2.2 Deep Network* — $L=\log_2 N$ hidden layers of $1\times1$ conv + size-2 product pooling; computes Hierarchical Tucker decomposition (Prop 4).
   3. *2.3 Universality* — CP with $Z=M^N$ realizes any tensor (Prop 5); deep universality follows from expressive efficiency.
   4. *2.4 Expressive Efficiency* — $\mathrm{rank}[\![\mathcal A^{\mathrm{CP}}]\!]\le Z$ vs. deep assignment achieving $[\![\mathcal A^{\mathrm{HT}}]\!]=I_{M^{N/2}}$ (Prop 6; uses Kronecker product, matricization, Lemmas 2–3).
   5. *2.5 Inapproximability* — Frobenius distance $D(h,\bar h)\ge\sqrt{M^{N/2}-B}$ via Eckart–Young–Mirsky (Thm 1).
   6. *2.6 Completeness* — $\det[\![\mathcal A^{\mathrm{HT}}]\!]$ is a nonzero polynomial in the parameters ⟹ full rank for almost all parameters (Thm 2, zero set of a polynomial) ⟹ complete (exponential) expressive efficiency.
   7. *2.7 Inductive Bias* — separation rank (Def 7) = matricization rank (Prop 7); *2.7.1 Dependencies Modeled by Networks* — shallow: $\le Z$ for all partitions; deep: maximal under $I_{\mathrm{check}}$, $\le r_{L-1}$ under $I_{\mathrm{half}}$; pooling geometry shapes the bias (square vs. mirror pooling experiment).

## Key definitions
### Section 1 (ReLU networks, scalar input)

**Def (shallow ReLU class $\mathcal H_B$).** With $\mathcal X=\mathcal Y=\mathbb R$, hidden activation $[z]_+:=\max\{0,z\}$ (ReLU):
$$\mathcal H_B:=\Big\{x\mapsto y=W^{(2)}\big[W^{(1)}x+\mathbf b^{(1)}\big]_+ +b^{(2)}\ :\ W^{(1)}\in\mathbb R^{B,1},\ \mathbf b^{(1)}\in\mathbb R^B,\ W^{(2)}\in\mathbb R^{1,B},\ b^{(2)}\in\mathbb R\Big\}.$$
Monotone w.r.t. $B$ (zero out output weights of excess neurons).

**Def (deep ReLU class $\bar{\mathcal H}_{\bar B}$).** For $L\ge3$ layers, width $\bar B$:
$$\bar{\mathcal H}_{\bar B}:=\Big\{x\mapsto y=W^{(L)}\Big[W^{(L-1)}\big[\cdots\big[W^{(1)}x+\mathbf b^{(1)}\big]_+\cdots\big]_+ +\mathbf b^{(L-1)}\Big]_+ +b^{(L)}\ :\ W^{(1)}\in\mathbb R^{\bar B,1},\ \mathbf b^{(1)}\in\mathbb R^{\bar B},\ \forall l=2,\dots,L-1:\ W^{(l)}\in\mathbb R^{\bar B,\bar B},\ \mathbf b^{(l)}\in\mathbb R^{\bar B},\ W^{(L)}\in\mathbb R^{1,\bar B},\ b^{(L)}\in\mathbb R\Big\}.$$
Monotone w.r.t. $\bar B$; moreover $\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B=B}$ — layers $2,\dots,L-1$ become "passthrough" by setting their weight matrices to identity and biases to zero (valid since ReLU is identity on nonnegative activations).

**Def (distance for universality, Section 1).** $\mathcal F\subseteq\mathcal Y^{\mathcal X}$ = continuous functions; distance = absolute difference integrated over a closed bounded interval, w.l.o.g. $[0,1]$:
$$d(f_1,f_2):=\int_0^1|f_1(x)-f_2(x)|\,dx.$$

**Def 1 (piecewise linear function, # linear pieces).** A continuous $g\in\mathcal Y^{\mathcal X}$ is *piecewise linear* if there exist constants $-\infty=:c_0<c_1<\dots<c_{N-1}<c_N:=\infty$ such that for any $i\in[N]$, $g$ is affine on $[c_{i-1},c_i]$ (i.e., $\forall x\in[c_{i-1},c_i]:g(x)=\alpha_ix+\beta_i$ for some $\alpha_i,\beta_i\in\mathbb R$). The **number of linear pieces** of $g$ is the minimal $N$ for which this holds.

**Def (tent map $g$ and sawtooth $g^{\circ k}$).** $g:\mathbb R\to\mathbb R$ is the "tent": $0$ outside $[0,1]$, rising linearly from $g(0)=0$ to $g(1/2)=1$ and back to $g(1)=0$; realized exactly by a 2-layer width-3 network since
$$g(x)=[2x]_+-[4x-2]_+ +[2x-2]_+.$$
$g^{\circ k}:=\underbrace{g\circ\cdots\circ g}_{k\text{ times}}:\mathbb R\to\mathbb R$ is the "sawteeth" function with $2^{k-1}$ teeth on $[0,1]$.

**Def (the sets $S_>$, $S_<$ and "missing" an interval).**
$$S_>:=\Big\{x\in[0,1]:g^{\circ L-1}(x)>\tfrac12\Big\}=\bigcup_{i=1}^{2^{L-2}}\Big(2^{-L+2}(i-1)+\tfrac14\cdot2^{-L+2},\ 2^{-L+2}(i-1)+\tfrac34\cdot2^{-L+2}\Big),$$
$$S_<:=\Big\{x\in[0,1]:g^{\circ L-1}(x)<\tfrac12\Big\}=\bigcup_{i=1}^{2^{L-2}-1}\Big(2^{-L+2}i-\tfrac14\cdot2^{-L+2},\ 2^{-L+2}i+\tfrac14\cdot2^{-L+2}\Big)\cup\Big(0,\tfrac14\cdot2^{-L+2}\Big)\cup\Big(1-\tfrac14\cdot2^{-L+2},\,1\Big).$$
Both are disjoint unions of open intervals ($2^{L-1}+1$ intervals in total). A function $f:\mathbb R\to\mathbb R$ **misses** an interval of $S_>$ if its value along that interval is no greater than $\frac12$; it misses an interval of $S_<$ if its value along that interval is no lesser than $\frac12$. If $f$ misses an interval, then $\int_{\text{interval}}|f(x)-g^{\circ L-1}(x)|\,dx\ge[\text{interval length}]\cdot\frac12\cdot\frac12$ (triangle area above/below the $\tfrac12$ level).

### Section 2 (convolutional arithmetic circuits)

**Def (function ↔ tensor identification).** $\mathcal X=[M]^N$ ($N$ a power of 2; $N$ = # pixels/patches, $M$ = # values/templates), $\mathcal Y=\mathbb R$. A function $f:\mathcal X\to\mathcal Y$ is identified with the order-$N$ tensor $\mathcal A\in\mathbb R^{\overbrace{M,\dots,M}^{N\text{ times}}}$ ($N$ modes, dimension $M$ in each mode) defined by $\mathcal A_{d_1,\dots,d_N}:=f(d_1,\dots,d_N)$ — the "lookup table" of $f$.

**Def (shallow CAC).** Input $\mathbf x=(d_1,\dots,d_N)^\top\in[M]^N$ passes through: **representation** $(d_1,\dots,d_N)\xrightarrow{\mathrm{rep}(\cdot)}(\mathbf e^{d_1},\dots,\mathbf e^{d_N})\in(\mathbb R^M)^N$ (one-hot vectors, $\mathrm{rep}(i,d)=\mathbb 1[x_i=d]$); **$1\times1$ conv** of width $Z\in\mathbb N$ — locally connected with $Z$ filter sets $\{(\mathbf a^{z,1},\dots,\mathbf a^{z,N})\in(\mathbb R^M)^N\}_{z=1}^Z$, $\mathrm{conv}(i,z)=\langle\mathbf a^{z,i},\mathrm{rep}(i,:)\rangle$ (the *convolutional* case is when filters are shared across locations: $\mathbf a^{z,1}=\dots=\mathbf a^{z,N}$; the lecture focuses on the more general locally connected case); **global product pooling** $\mathrm{pool}(z)=\prod_{i=1}^N\mathrm{conv}(i,z)$; **dense output** $\mathrm{out}=\langle\mathbf a^{\mathrm{out}},\mathrm{pool}(:)\rangle=\sum_{z=1}^Z a^{\mathrm{out}}_z\prod_{i=1}^N\langle\mathbf a^{z,i},\mathbf e^{d_i}\rangle$ with $\mathbf a^{\mathrm{out}}\in\mathbb R^Z$. Learnable parameters: conv filters + output weights, $(NM+1)Z$ in total. $\mathcal H_B$ := hypotheses space of the shallow network with $Z=B$ ≡ tensors representable by CP decomposition with $Z=B$ terms; monotone in $B$.

**Def 2 (outer product of vectors).** For $\mathbf v^1,\dots,\mathbf v^N\in\mathbb R^M$, $\mathbf v^1\otimes\cdots\otimes\mathbf v^N$ is the order-$N$ tensor with dimension $M$ in each mode given by $(\mathbf v^1\otimes\mathbf v^2\otimes\cdots\otimes\mathbf v^N)_{d_1,\dots,d_N}:=\prod_{i=1}^N v^i_{d_i}$.

**Def (deep CAC).** $L=\log_2(N)$ hidden layers. Same one-hot representation; hidden layer $l\in\{0,1,\dots,L-1\}$ applies a $1\times1$ conv with filter sets $\big\{(\mathbf a^{l,1,\gamma},\dots,\mathbf a^{l,N\cdot2^{-l},\gamma})\in(\mathbb R^{r_{l-1}})^{N\cdot2^{-l}}\big\}_{\gamma=1}^{r_l}$ (convention $r_{-1}:=M$), $\mathrm{conv}_l(j,\gamma)=\langle\mathbf a^{l,j,\gamma},\cdot\rangle$, followed by **size-2 product pooling** over location pairs: $\mathrm{pool}_l(j,\gamma)=\prod_{j'\in\{2j-1,2j\}}\mathrm{conv}_l(j',\gamma)$ (halves the number of spatial locations). After $L$ layers the spatial extent collapses to a singleton, leaving an $r_{L-1}$-dimensional vector mapped to the scalar output by a dense linear layer: $\mathrm{out}=\langle\mathbf a^L,\mathrm{pool}_{L-1}(:)\rangle$, $\mathbf a^L\in\mathbb R^{r_{L-1}}$. Total # parameters: $\sum_{l=0}^{L-1}(r_{l-1}\cdot N\cdot2^{-l}\cdot r_l)+r_{L-1}$. $\bar{\mathcal H}_{\bar B}$ := hypotheses space of the deep network with $r_0=\dots=r_{L-1}=\bar B$ ≡ tensors representable by the HT decomposition with those widths; monotone in $\bar B$.

**Def 3 (outer product of tensors).** For tensors $\mathcal A,\bar{\mathcal A}$ of orders $k,\bar k$ with dimension $M$ in each mode, $\mathcal A\otimes\bar{\mathcal A}$ is the order-$(k+\bar k)$ tensor $(\mathcal A\otimes\bar{\mathcal A})_{d_1,\dots,d_k,d_{k+1},\dots,d_{k+\bar k}}:=\mathcal A_{d_1,\dots,d_k}\cdot\bar{\mathcal A}_{d_{k+1},\dots,d_{k+\bar k}}$.

**Def 4 (Kronecker product).** For $A\in\mathbb R^{m_1,m_2}$, $B\in\mathbb R^{n_1,n_2}$:
$$A\odot B:=\begin{pmatrix}a_{11}B & a_{12}B & \cdots\\ a_{21}B & a_{22}B & \cdots\\ \vdots & \vdots & \ddots\end{pmatrix}\in\mathbb R^{m_1n_1,\,m_2n_2}.$$
In general $A\odot B\ne B\odot A$.

**Def 5 (matricization; canonical matricization).** For a tensor $\mathcal T\in\mathbb R^{m_1,\dots,m_n}$ and ordered mode subset $I=\{i_1,\dots,i_{|I|}\}\subseteq[n]$ ($1\le i_1\le\dots\le i_{|I|}\le n$), with complement $I^c:=[n]\setminus I=\{j_1,\dots,j_{|I^c|}\}$: the matricization $[\![\mathcal T]\!]_I\in\mathbb R^{\prod_{t=1}^{|I|}m_{i_t},\ \prod_{t=1}^{|I^c|}m_{j_t}}$ unrolls the modes of $I$ as rows and those of $I^c$ as columns:
$$\big([\![\mathcal T]\!]_I\big)_{\,1+\sum_{t=1}^{|I|}(d_{i_t}-1)\prod_{s=t+1}^{|I|}m_{i_s},\ \ 1+\sum_{t=1}^{|I^c|}(d_{j_t}-1)\prod_{s=t+1}^{|I^c|}m_{j_s}}:=\mathcal T_{d_1,\dots,d_n}.$$
If $n$ is even, $[\![\mathcal T]\!]$ (no subscript) denotes the **canonical matricization** $[\![\mathcal T]\!]_I$ with $I=\{1,3,\dots,n-1\}$ (odd modes vs. even modes). Matricization is a **linear** operator:

$$[\![\sum_k\alpha_k\mathcal T_k]\!]_I=\sum_k\alpha_k[\![\mathcal T_k]\!]_I$$

**Def 6 (distance $D$ for CAC inapproximability).** For $f,\bar f:[M]^N\to\mathbb R$:
$$D(f,\bar f):=\sqrt{\sum_{d_1,\dots,d_N=1}^M\big(f(d_1,\dots,d_N)-\bar f(d_1,\dots,d_N)\big)^2}\,;\qquad D(f,\bar f)=\big\|[\![\mathcal A]\!]-[\![\bar{\mathcal A}]\!]\big\|_F=:\|\mathcal A-\bar{\mathcal A}\|_F,$$
where $\mathcal A,\bar{\mathcal A}$ are the corresponding tensors.

**Def 7 (separation rank).** For $f:[M]^N\to\mathbb R$ and $I=\{i_1,\dots,i_{|I|}\}\subseteq[n]$ with complement $I^c=\{j_1,\dots,j_{|I^c|}\}$, the separation rank of $f$ w.r.t. the input partition $I\,\dot\cup\,I^c$ ($\dot\cup$ = disjoint union) is
$$\mathrm{sep}[f;I]:=\min\Big\{R\in\mathbb N\cup\{0\}:\exists g_1,\dots,g_R:[M]^{|I|}\to\mathbb R,\ \bar g_1,\dots,\bar g_R:[M]^{|I^c|}\to\mathbb R\ \text{ s.t. }\ f(d_1,\dots,d_N)=\sum_{\nu=1}^R g_\nu\big(d_{i_1},\dots,d_{i_{|I|}}\big)\cdot\bar g_\nu\big(d_{j_1},\dots,d_{j_{|I^c|}}\big)\Big\},$$
i.e., the minimal # of summands, each separable w.r.t. $I\,\dot\cup\,I^c$, that together give $f$. **Interpretation:** $\mathrm{sep}[f;I]=1$ ⟺ $f$ separable ⟺ (when $f,g,\bar g$ are probability/density functions) the inputs of $I$ and of $I^c$ are statistically independent under $f$; higher $\mathrm{sep}[f;I]$ = "farther" from separability = stronger modeled dependence. Separation rank and its analogues are equivalent to types of **quantum entanglement** measures (historically invented independently, in numerical analysis).

**Def (representative partitions).** $I_{\mathrm{check}}=\{1,3,\dots,N-1\}$, $I^c_{\mathrm{check}}=\{2,4,\dots,N\}$ ("checkerboard": interleaved/odd–even); $I_{\mathrm{half}}=\{1,2,\dots,\frac N2\}$, $I^c_{\mathrm{half}}=\{\frac N2+1,\frac N2+2,\dots,N\}$ ("halving": left half vs. right half). For natural data (nearby elements correlate more), high $\mathrm{sep}[f;I_{\mathrm{check}}]$ is more important than high $\mathrm{sep}[f;I_{\mathrm{half}}]$.

## Key theorems & results
**Prop 1 (shallow ReLU ↔ piecewise linear).** A shallow network of width $B\ge2$ can realize any piecewise linear function with $\le B$ pieces: for any such $g$ there exists $h\in\mathcal H_B$ with $g\equiv h$. Conversely, any function realizable by a shallow network of width $B\ge2$ is piecewise linear with $\le B+1$ pieces: for any $h\in\mathcal H_B$ there is a piecewise linear $g$ with $\le B+1$ pieces s.t. $h\equiv g$.

**Proof idea:** deferred to Home Assignment 2 (each ReLU neuron contributes one breakpoint; conversely sums of $B$ ReLUs plus affine give $\le B+1$ pieces).

**Exam relevance:** the exact piece counts ($\le B$ realizable vs. $\le B+1$ for realized functions) drive both universality and the lower bound of Prop 2.

**Lemma 1 (piecewise linear approximation of continuous functions).** For any $\epsilon>0$ and any $f\in\mathcal F$ (continuous), there exists piecewise linear $g$ with $d(f,g)=\int_0^1|f(x)-g(x)|dx<\epsilon$.

**Proof idea:** $f$ is uniformly continuous on $[0,1]$ (Heine–Cantor); take a discretization $0=:c_0<c_1<\dots<c_N:=1$ with mesh $<\delta$ and let $g$ interpolate $f$ at the $c_i$'s; on each $[c_i,c_{i+1}]$, $g(x)$ lies between $g(c_i)=f(c_i)$ and $g(c_{i+1})=f(c_{i+1})$, both $\epsilon$-close to $f(x)$; integrate.

**Exam relevance:** combined with Prop 1 gives $\mathcal F$-universality of $\mathcal H_B$ in the sense of $d(\cdot,\cdot)$; universality of $\bar{\mathcal H}_{\bar B}$ follows since $\mathcal H_B\subset\bar{\mathcal H}_{\bar B=B}$.

**Prop 2 (exponential expressive efficiency of deep ReLU nets).** (1) For any $B\in\mathbb N$ there exists $\bar B\in O(B)$ s.t. $\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B}$; (2) there exist $\bar B\in\mathbb N$ (in fact $\bar B\in O(1)$, namely width 3) and $\bar h\in\bar{\mathcal H}_{\bar B}$ s.t. $\bar h\notin\mathcal H_B$ unless $B\in\exp(L)$ ($L$ = # layers of the deep network).

**Proof idea:** (1) passthrough layers. (2) An $L$-layer width-3 net realizes $\bar h=g^{\circ L-1}$ (contiguous affine operations blend when composing the width-3 block), a piecewise linear function with $2+2\cdot2^{L-2}=2+2^{L-1}$ linear pieces; by Prop 1 a shallow net realizing it needs width $\ge2^{L-1}+1$.

**Exam relevance:** canonical depth-separation proof; know the piece count $2+2^{L-1}$ and where each factor comes from.

**Result (inapproximability of the sawtooth; Section 1.4).** Let $h\in\mathcal H_B$. Across all $2^{L-1}+1$ intervals of $S_>$ and $S_<$, $h$ can avoid missing no more than $\big\lceil\frac12(2^{L-1}+1)+\frac12(B+1)\big\rceil$ intervals, i.e., misses at least $\big\lfloor\frac12(2^{L-1}+1)-\frac12(B+1)\big\rfloor$ intervals (proof of the counting claim: Exercise; note the notes' exercise text misprints the interval count as "$2^{L+1}+1$"). All but at most two missed intervals have length $2^{-L+1}$, hence
$$d\big(g^{\circ L-1},h\big)=\int_0^1\big|g^{\circ L-1}(x)-h(x)\big|dx\ \ge\ \Big(\Big\lfloor\tfrac12(2^{L-1}+1)-\tfrac12(B+1)\Big\rfloor-2\Big)\cdot2^{-L+1}\cdot\tfrac14\ \ge\ \tfrac18-B\cdot2^{-L-2}-3\cdot2^{-L-1}.$$
Requiring distance $<\epsilon$ forces
$$B>2^{L+2}\Big(\tfrac18-\epsilon\Big)-6.$$

**Proof idea:** a piecewise linear $h$ with $\le B+1$ pieces can cross level $\frac12$ only limitedly often, so it must "miss" most of the exponentially many alternating intervals; each miss costs $\ge\text{length}\cdot\frac14$ in $L^1$.

**Exam relevance:** upgrades Prop 2 from non-realizability to **inapproximability** (the stronger form of expressive efficiency from Lecture 1, Remark 2); the shallow width must be exponential in $L$ to get within fixed $\epsilon$.

**Prop 3 (shallow CAC ≡ CP decomposition).** The tensor generated by the shallow network is
$$\mathcal A=\sum_{z=1}^Z a^{\mathrm{out}}_z\cdot\mathbf a^{z,1}\otimes\mathbf a^{z,2}\otimes\cdots\otimes\mathbf a^{z,N}$$
— the CANDECOMP/PARAFAC (CP) decomposition.

**Proof idea:** on input $(d_1,\dots,d_N)$: $\mathrm{conv}(i,z)=\langle\mathbf a^{z,i},\mathbf e^{d_i}\rangle=a^{z,i}_{d_i}$; $\mathrm{pool}(z)=\prod_i a^{z,i}_{d_i}$; $\mathrm{out}=\sum_z a^{\mathrm{out}}_z\prod_i a^{z,i}_{d_i}$, which is entry $(d_1,\dots,d_N)$ of the CP sum (Def 2).

**Exam relevance:** the bridge from architecture to tensor analysis; $\mathcal H_B$ = tensors of CP-rank $\le B$ representation.

**Prop 4 (deep CAC ≡ Hierarchical Tucker (HT) decomposition).** The tensor generated by the deep network is given recursively by
$$\Phi^{1,j,\gamma}=\sum_{\alpha=1}^{r_0}a^{1,j,\gamma}_\alpha\cdot\mathbf a^{0,2j-1,\alpha}\otimes\mathbf a^{0,2j,\alpha},\qquad j\in[\tfrac N2],\ \gamma\in[r_1]$$
$$\Phi^{l,j,\gamma}=\sum_{\alpha=1}^{r_{l-1}}a^{l,j,\gamma}_\alpha\cdot\underbrace{\Phi^{l-1,2j-1,\alpha}}_{\text{order }2^{l-1}}\otimes\underbrace{\Phi^{l-1,2j,\alpha}}_{\text{order }2^{l-1}},\qquad j\in[\tfrac N{2^l}],\ \gamma\in[r_l]$$
$$\mathcal A=\sum_{\alpha=1}^{r_{L-1}}a^L_\alpha\cdot\underbrace{\Phi^{L-1,1,\alpha}}_{\text{order }\frac N2}\otimes\underbrace{\Phi^{L-1,2,\alpha}}_{\text{order }\frac N2}.$$

**Proof idea:** induction over $l\in[L-1]$: the neuron $\mathrm{conv}_l(j,\gamma)$ (which depends on input elements $(j-1)2^l+1$ to $j\cdot2^l$) corresponds to the order-$2^l$ tensor $\Phi^{l,j,\gamma}$; base case is a shallow network on 2 inputs (Prop 3); step uses $\mathrm{conv}_l(j,\gamma)=\sum_{\alpha}a^{l,j,\gamma}_\alpha\,\mathrm{conv}_{l-1}(2j-1,\alpha)\,\mathrm{conv}_{l-1}(2j,\alpha)$ and Def 3.

**Exam relevance:** know the recursion, the index ranges, and which halves of the input each factor covers.

**Prop 5 (universality of CAC).** For $\mathcal F=\mathcal Y^{\mathcal X}$ (all functions $[M]^N\to\mathbb R$), $\mathcal H_B$ is $\mathcal F$-universal: with $B=M^N$ it can realize **any** function/tensor. ($\mathcal F$-universality of $\bar{\mathcal H}_{\bar B}$ follows from its expressive efficiency w.r.t. $\mathcal H_B$, condition (1).)

**Proof idea:** index $z\in[M^N]$ by $(d_1,\dots,d_N)\in[M]^N$ in lexicographic order; set $\mathbf a^{z,i}=\mathbf e^{d_i}$, making $\mathbf a^{z,1}\otimes\cdots\otimes\mathbf a^{z,N}=\mathbb 1[d_1,\dots,d_N]$ (one-hot tensor); set $a^{\mathrm{out}}_z=\mathcal T_{d_1,\dots,d_N}$ to reproduce any target $\mathcal T$.

**Exam relevance:** universality here is *exact realization* (finite domain), not approximation; needs exponential width $M^N$.

**Lemma 2 (Kronecker rank multiplicativity).** For any $A\in\mathbb R^{m_1,m_2}$, $B\in\mathbb R^{n_1,n_2}$:

$$\mathrm{rank}(A\odot B)=\mathrm{rank}(A)\cdot\mathrm{rank}(B)$$

**Proof idea:** in recitation notes (via SVD of the factors).

**Lemma 3 (matricization of tensor outer product).** For tensors $\mathcal T,\bar{\mathcal T}$ of orders $n,\bar n$ and $I\subseteq[n+\bar n]$:
$$[\![\mathcal T\otimes\bar{\mathcal T}]\!]_I=[\![\mathcal T]\!]_{I\cap[n]}\odot[\![\bar{\mathcal T}]\!]_{(I-n)\cap[\bar n]}$$
($I-n$ = subtract $n$ from all elements of $I$). In particular, for $n,\bar n$ even:

$$[\![\mathcal T\otimes\bar{\mathcal T}]\!]=[\![\mathcal T]\!]\odot[\![\bar{\mathcal T}]\!]$$

**Proof idea:** Home Assignment 2 (index bookkeeping in Def 5).

**Exam relevance:** the workhorse of every rank computation in Section 2 (used with linearity of matricization).

**Prop 6 (exponential expressive efficiency of deep CAC).** (1) For any $B\in\mathbb N$ there exists $\bar B\in O(B)$ s.t. $\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B}$. (2) There exist $\bar B\in\mathbb N$ with $\bar B\in O(M)$ and $\bar h\in\bar{\mathcal H}_{\bar B}$ s.t. $\bar h\notin\mathcal H_B$ unless $B\in\exp(N)$.

**Proof idea:** (1) With $r_0=\dots=r_{L-1}=B=\bar B$ and filters $\mathbf a^{l,j,\gamma}=\mathbf e^\gamma$ for $l\in[L-1]$, the hidden convs 1..$L-1$ are passthrough and the pairwise poolings compose into global pooling — recovering the shallow network. (2) Canonical matricization of CP:

$$[\![\mathcal A^{\mathrm{CP}}]\!]=\sum_{z=1}^Z a^{\mathrm{out}}_z\cdot[\![\mathbf a^{z,1}\otimes\mathbf a^{z,2}]\!]\odot\cdots\odot[\![\mathbf a^{z,N-1}\otimes\mathbf a^{z,N}]\!]$$

each factor a rank-1 matrix, so $\mathrm{rank}[\![\mathcal A^{\mathrm{CP}}]\!]\le Z$. For the deep net, assume $r_0\ge M$ and assign: $\mathbf a^{0,j,\alpha}=\mathbf e^\alpha$ if $\alpha\in[M]$, else $\mathbf 0$; $\mathbf a^{1,j,\gamma}=\mathbf 1$ (all-ones) if $\gamma=1$, else $\mathbf 0$; for $l=2,\dots,L-1$: $\mathbf a^{l,j,\gamma}=\mathbf e^1$ if $\gamma=1$, else $\mathbf 0$; $\mathbf a^L=\mathbf e^1$. Then $[\![\Phi^{1,j,\gamma}]\!]=I_M$ for $\gamma=1$ (else $0$), and unrolling the recursion,

$$[\![\mathcal A^{\mathrm{HT}}]\!]=\underbrace{I_M\odot\cdots\odot I_M}_{N/2\text{ times}}=I_{M^{N/2}}$$

of rank $M^{N/2}$.

**Exam relevance:** the central depth-separation theorem for CACs — width-$O(M)$ deep vs. $\exp(N)$ shallow; be able to reproduce both the $\le Z$ rank bound and the identity-matricization assignment.

**Thm 1 (Eckart–Young–Mirsky).** Let $A\in\mathbb R^{m_1,m_2}$ with singular values

$$\sigma_1(A)\ge\sigma_2(A)\ge\dots\ge\sigma_{\min\{m_1,m_2\}}(A)\ge0$$

For any $r\in\{0,\dots,\min\{m_1,m_2\}\}$:
$$\min_{W\in\mathbb R^{m_1,m_2},\ \mathrm{rank}(W)\le r}\|W-A\|_F^2=\sum\nolimits_{i=r+1}^{\min\{m_1,m_2\}}\sigma_i(A)$$
(as printed in the notes; the classical statement has $\sigma_i(A)^2$ on the right — the two coincide in the application below, where all $\sigma_i\in\{0,1\}$).

**Proof idea:** classical low-rank approximation result [Eckart–Young 1936]; truncate the SVD.

**Result (inapproximability for CACs; Section 2.5).** Let $h\in\mathcal H_B$ with tensor $\mathcal A^{\mathrm{CP}}$, and let $\bar h\in\bar{\mathcal H}_{\bar B}$ be the Prop 6 deep function (canonical matricization $I_{M^{N/2}}$). Since $\mathrm{rank}[\![\mathcal A^{\mathrm{CP}}]\!]\le B$:
$$D(h,\bar h)=\big\|[\![\mathcal A^{\mathrm{CP}}]\!]-I_{M^{N/2}}\big\|_F\ \ge\ \sqrt{\min_{W:\,\mathrm{rank}(W)\le B}\|W-I_{M^{N/2}}\|_F^2}=\sqrt{\sum\nolimits_{i=B+1}^{M^{N/2}}\sigma_i\big(I_{M^{N/2}}\big)}=\sqrt{M^{N/2}-B}.$$
Hence for any $\epsilon>0$, $D(h,\bar h)\le\epsilon$ forces $B\ge M^{N/2}-\epsilon^2$: exponentially large.

**Proof idea:** EYM applied with $A=I_{M^{N/2}}$ (all singular values 1).

**Exam relevance:** inapproximability strengthening for CACs; note the distance is Frobenius/$\ell_2$ over all $M^N$ inputs (Def 6).

**Thm 2 (zero set of a polynomial; Caron–Traynor).** Let $p:\mathbb R^n\to\mathbb R$ be a polynomial. Then $p^{-1}(0):=\{\mathbf x\in\mathbb R^n:p(\mathbf x)=0\}$ is either all of $\mathbb R^n$ or has (Lebesgue) measure zero.

**Proof idea:** cited [Caron & Traynor 2005]; induction on dimension.

**Result (completeness; Section 2.6).** $\mathrm{rank}\big([\![\mathcal A^{\mathrm{HT}}]\!]\big)=M^{N/2}$ for **almost all** parameter assignments of the deep network (with $r_0\ge M$), establishing **complete (exponential) expressive efficiency** of the deep CAC w.r.t. the shallow one.

**Proof idea:** entries of $[\![\mathcal A^{\mathrm{HT}}]\!]$ are polynomials in the parameters, hence so is $\det([\![\mathcal A^{\mathrm{HT}}]\!])$; it is nonzero at the Prop 6 assignment, so it is not the zero polynomial; by Thm 2 its zero set has measure zero. Thus parameters drawn from any continuous distribution give $\det\ne0$ w.p. 1.

**Exam relevance:** standard genericity argument — memorize the chain "polynomial entries → nonzero at one point → not zero polynomial → measure-zero zero set".

**Prop 7 (separation rank = matricization rank).** For $f:[M]^N\to\mathbb R$ with tensor $\mathcal A$ and any $I\subseteq[N]$:
$$\mathrm{sep}[f;I]=\mathrm{rank}\big([\![\mathcal A]\!]_I\big).$$

**Proof idea:** w.l.o.g. $I=[|I|]$ (permutation preserves both sides). ($\le$): a sum of $R$ separable terms gives $\mathcal A=\sum_{\nu=1}^R\mathcal B^\nu\otimes\bar{\mathcal B}^\nu$; matricizing with linearity + Lemma 3 gives $[\![\mathcal A]\!]_I=\sum_\nu\mathrm{vec}[\mathcal B^\nu]\,\mathrm{vec}[\bar{\mathcal B}^\nu]^\top$, so rank $\le R$. ($\ge$): a rank-$r$ decomposition $[\![\mathcal A]\!]_I=\sum_{\nu=1}^r\mathbf v^\nu(\bar{\mathbf v}^\nu)^\top$ re-rolls into $\mathcal A=\sum_\nu\mathcal B^\nu\otimes\bar{\mathcal B}^\nu$, i.e., $r$ separable summands — contradiction if $r<R$.

**Exam relevance:** the two-directional proof (both inequalities) is a likely exam question; it converts inductive-bias questions into rank computations.

**Result (dependencies modeled; Section 2.7.1).**
- Shallow: matricizing the CP decomposition w.r.t. **any** $I\subseteq[N]$ (recursive Lemma 3) gives

$$[\![\mathcal A^{\mathrm{CP}}]\!]_I=\sum_{z=1}^Z a^{\mathrm{out}}_z\cdot[\![\mathbf a^{z,1}]\!]_{I\cap\{1\}}\odot[\![\mathbf a^{z,2}]\!]_{(I-1)\cap\{1\}}\odot\cdots\odot[\![\mathbf a^{z,N}]\!]_{(I-(N-1))\cap\{1\}}$$

(each factor a row/column vector), a sum of $Z$ rank-1 terms, hence $\mathrm{rank}([\![\mathcal A^{\mathrm{CP}}]\!]_I)\le Z$: the shallow network cannot model separation rank beyond its width **under any partition**.
- Deep, checkerboard: with $r_0\ge M$, $\mathrm{rank}([\![\mathcal A^{\mathrm{HT}}]\!]_{I_{\mathrm{check}}})=M^{N/2}$ (maximal) for almost all parameter assignments ⟹ $\mathrm{sep}[\,\cdot\,;I_{\mathrm{check}}]$ is exponential (maximal) for almost all functions realized.
- Deep, halving: matricizing the last HT line w.r.t. $I_{\mathrm{half}}$ and noting $I_{\mathrm{half}}\cap[\frac N2]=[\frac N2]$, $(I_{\mathrm{half}}-\frac N2)\cap[\frac N2]=\emptyset$, gives

$$[\![\mathcal A^{\mathrm{HT}}]\!]_{I_{\mathrm{half}}}=\sum_{\alpha=1}^{r_{L-1}}a^L_\alpha\cdot\mathrm{vec}[\Phi^{L-1,1,\alpha}]\,\mathrm{vec}[\Phi^{L-1,2,\alpha}]^\top$$

hence $\mathrm{rank}([\![\mathcal A^{\mathrm{HT}}]\!]_{I_{\mathrm{half}}})\le r_{L-1}$ and $\mathrm{sep}[\,\cdot\,;I_{\mathrm{half}}]\le$ width of hidden layer $L-1$, for **all** realizable functions.

**Proof idea:** linearity of matricization + Lemma 3 throughout.

**Exam relevance:** the punchline on inductive bias — deep CACs favor **local (interleaved) dependencies** over long-range ones; shallow CACs favor nothing (uniformly weak).

## Techniques & tricks
- **Passthrough constructions** to prove containment $\mathcal H_B\subseteq\bar{\mathcal H}_{\bar B}$: identity weight matrices + zero biases for ReLU nets; standard-basis filters $\mathbf a^{l,j,\gamma}=\mathbf e^\gamma$ for CACs (pairwise poolings then compose into global pooling). Monotonicity in width: zero out weights of excess neurons/feature maps.
- **Self-composition to multiply linear pieces** (Telgarsky): realize a tent $g$ with a small block, compose $L-1$ times, blend contiguous affine operations — linear pieces grow exponentially in depth while width stays 3.
- **Crossing/counting argument for $L^1$ inapproximability**: a $\le B+1$-piece function can fail to "miss" only $O(B)$ of the $2^{L-1}+1$ alternating level-$\frac12$ intervals; each missed interval contributes $\ge$ length$\cdot\frac14$ to the $L^1$ distance.
- **Function ↔ tensor identification** on discrete domains ($\mathcal A$ = lookup table), turning expressiveness of architectures into representational power of tensor decompositions (shallow ↔ CP, deep ↔ HT).
- **One-hot representation + product pooling** makes the network output multilinear in the filters — the reason arithmetic circuits are analyzable.
- **Induction over layers** to derive the tensor decomposition realized by a deep hierarchical model (each neuron ↔ an order-$2^l$ tensor on its receptive field).
- **Matricization-rank bounding**: linearity of $[\![\cdot]\!]_I$ + Lemma 3 ($[\![\mathcal T\otimes\bar{\mathcal T}]\!]_I=[\![\mathcal T]\!]_{I\cap[n]}\odot[\![\bar{\mathcal T}]\!]_{(I-n)\cap[\bar n]}$) + Lemma 2 ($\mathrm{rank}(A\odot B)=\mathrm{rank}A\cdot\mathrm{rank}B$); rank of a sum $\le$ sum of ranks.
- **Eckart–Young–Mirsky** to convert a rank gap into a Frobenius-distance (inapproximability) lower bound.
- **Genericity via zero sets of polynomials**: exhibit one parameter assignment where a polynomial (e.g., $\det$ of a matricization) is nonzero ⟹ property holds for almost all assignments (Thm 2) ⟹ "complete" expressive efficiency.
- **Separation rank ↔ matricization rank** (Prop 7): translate dependency-modeling (inductive bias) questions into linear algebra; choose revealing partitions ($I_{\mathrm{check}}$ vs. $I_{\mathrm{half}}$).
- **Pooling geometry as an inductive-bias dial**: locations pooled together in earlier layers can have stronger dependence modeled between them.

## Exam-relevant nuggets
- Exact piece counts: shallow width $B$ realizes any piecewise linear with $\le B$ pieces but every $h\in\mathcal H_B$ has $\le B+1$ pieces — do not swap the two directions. Definition of "# linear pieces" is the *minimal* $N$ in Def 1 (with $c_0=-\infty$, $c_N=\infty$).
- $g(x)=[2x]_+-[4x-2]_+ +[2x-2]_+$ (width 3, 2 layers); $g^{\circ k}$ has $2^{k-1}$ teeth; $L$-layer width-3 net realizes $g^{\circ L-1}$ with $2+2\cdot2^{L-2}=2+2^{L-1}$ pieces. Therefore shallow realization needs $B\ge2^{L-1}+1$, i.e., $B\in\exp(L)$.
- Inapproximability bound to memorize: $d(g^{\circ L-1},h)\ge\frac18-B\cdot2^{-L-2}-3\cdot2^{-L-1}$, so $d<\epsilon$ forces $B>2^{L+2}(\frac18-\epsilon)-6$. The interval count is $2^{L-1}+1$ ($2^{L-2}$ intervals in $S_>$, $2^{L-2}+1$ in $S_<$); a missed interval costs [length]$\cdot\frac12\cdot\frac12$; all but $\le2$ missed intervals have length $2^{-L+1}$. The counting claim ("$h$ avoids missing at most $\lceil\frac12(2^{L-1}+1)+\frac12(B+1)\rceil$") is left as an **Exercise** — a natural exam question.
- Universality proofs differ in kind: Section 1 is *approximation* of continuous functions in $\int_0^1|\cdot|$ (via Heine–Cantor uniform continuity + interpolation); Section 2 is *exact realization* of all functions on the finite domain $[M]^N$ (with $Z=M^N$, filters $\mathbf a^{z,i}=\mathbf e^{d_i}$, output weights $=\mathcal T_{d_1,\dots,d_N}$).
- Parameter counts: shallow CAC has $(NM+1)Z$ parameters; deep CAC has $\sum_{l=0}^{L-1}(r_{l-1}\cdot N\cdot2^{-l}\cdot r_l)+r_{L-1}$ with $r_{-1}:=M$; deep CAC depth is fixed at $L=\log_2N$ ($N$ a power of 2), pooling is over pairs $\{2j-1,2j\}$.
- "Convolutional" vs. "locally connected": convolution means shared filters $\mathbf a^{z,1}=\dots=\mathbf a^{z,N}$; the analysis is carried out for the more general locally connected case.
- CP ↔ shallow, HT ↔ deep; know Prop 4's recursion including index ranges $j\in[N/2^l]$, $\gamma\in[r_l]$, and orders of the $\Phi$'s ($2^{l-1}$ at level $l-1$... factors of order $2^{l-1}$ combine to order $2^l$).
- Key rank facts: $\mathrm{rank}[\![\mathcal A^{\mathrm{CP}}]\!]_I\le Z$ for **every** partition $I$ (not just canonical); the special deep assignment gives $[\![\mathcal A^{\mathrm{HT}}]\!]=I_{M^{N/2}}$ (needs $r_0\ge M$; uses all-ones filter $\mathbf a^{1,j,1}=\mathbf 1$ at layer 1 so that $[\![\Phi^{1,j,1}]\!]=\sum_{\alpha=1}^M\mathbf e^\alpha(\mathbf e^\alpha)^\top=I_M$). Deep needs only $\bar B\in O(M)$; shallow needs $B\in\exp(N)$, and even to $\epsilon$-approximate: $B\ge M^{N/2}-\epsilon^2$.
- Canonical matricization = rows indexed by **odd** modes $I=\{1,3,\dots,n-1\}$; defined only for even order; matricization is linear; know the small $2\times2\times2$ examples of $[\![\mathcal T]\!]_{\{1,2\}}$ vs. $[\![\mathcal T]\!]_{\{1,3\}}$.
- Lemma 2 ($\mathrm{rank}(A\odot B)=\mathrm{rank}(A)\,\mathrm{rank}(B)$, proof in recitation) and Lemma 3 (proof in HW2) are quotable; Kronecker product is **not** commutative.
- EYM as printed in the notes reads $\min_{\mathrm{rank}(W)\le r}\|W-A\|_F^2=\sum_{i=r+1}^{\min\{m_1,m_2\}}\sigma_i(A)$ — the classical theorem squares the singular values; for the identity-matrix application every $\sigma_i=1$ so the bound $\sqrt{M^{N/2}-B}$ is unaffected.
- Prop 7 ($\mathrm{sep}[f;I]=\mathrm{rank}[\![\mathcal A]\!]_I$) with its two-directional proof; interpretation: $\mathrm{sep}=1$ ⟺ separability ⟺ statistical independence (for densities); connection to quantum entanglement is an emphasized aside.
- Inductive-bias conclusions: shallow CAC of reasonable size models only weak dependence under **all** partitions; deep CAC models maximal dependence under $I_{\mathrm{check}}=\{1,3,\dots,N-1\}$ (for almost all parameters) but only $\le r_{L-1}$ under $I_{\mathrm{half}}=\{1,\dots,N/2\}$ — matches natural data where correlations are local. Contiguous pooling windows favor local dependencies; other pooling geometries retarget the bias (guideline: locations pooled together earlier can be modeled as more strongly dependent). Empirical demo: square (contiguous) pooling wins on the *closedness* task (local dependencies), mirror (reflection) pooling wins on the *symmetry* task (dependencies across distances); experiment used size-4 windows but the analysis carries over.
- Deferred proofs (fair game as exercises): Prop 1 (HW2), Lemma 3 (HW2), Lemma 2 (recitation), the interval-counting Exercise in 1.4.
- Notation traps: $[z]_+=\max\{0,z\}$; $g^{\circ k}$ = $k$-fold composition; $\otimes$ = outer product (vectors: Def 2, tensors: Def 3), $\odot$ = Kronecker product; $[\![\cdot]\!]_I$ = matricization, $[\![\cdot]\!]$ = canonical; $r_{-1}:=M$; $\dot\cup$ = disjoint union; the notes' Exercise misprints "$2^{L+1}+1$" for the interval count $2^{L-1}+1$, and Prop 1's converse misprints "$g\in\mathcal X^{\mathcal Y}$" for $g\in\mathcal Y^{\mathcal X}$.
