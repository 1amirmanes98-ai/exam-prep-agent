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

**1. Upper bound: $\mathrm{sep}(f;I) \le \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$**

**What is asked.** Show that $f$ can be written as a sum of at most $R$ separated products, where $R$ is the rank of the matricization of $\mathcal{A}$. The answer is a proof by explicit construction.

**Tool and why.** A rank decomposition of a matrix (cheat sheet §3), read through the matricization (cheat sheet §6). A matrix of rank $R$ is a sum of $R$ outer products $u_r \bar u_r^\top$. Each outer product splits an entry of $\mathcal{A}$ into a factor that depends only on the indices in $I$ times a factor that depends only on the indices in $I^c$, which is exactly the shape a separated product needs.

**Definitions.** Write $n := |I|$, so $I = \{1,\dots,n\}$ and $I^c = \{n+1,\dots,N\}$. Let $R := \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$. Because the rank is $R$, there are vectors $u_1,\dots,u_R \in \mathbb{R}^{D^{n}}$ and $\bar u_1,\dots,\bar u_R \in \mathbb{R}^{D^{N-n}}$ (for example from the SVD) with

$$\mathrm{mat}(\mathcal{A};I) = \sum_{r=1}^{R} u_r \bar u_r^\top.$$

They will serve as the coefficients of the separated factors, which we define as

$$g_r\big((x^{(i)})_{i\in I}\big) := \sum_{d_1,\dots,d_n} \Big(\prod_{i=1}^{n} x^{(i)}_{d_i}\Big)(u_r)_{\mathrm{row}(d_1,\dots,d_n)},$$

$$\bar g_r\big((x^{(j)})_{j\in I^c}\big) := \sum_{d_{n+1},\dots,d_N} \Big(\prod_{j=n+1}^{N} x^{(j)}_{d_j}\Big)(\bar u_r)_{\mathrm{col}(d_{n+1},\dots,d_N)}.$$

By construction $g_r$ reads only the variables indexed by $I$, and $\bar g_r$ reads only those indexed by $I^c$.

**Solution.**

Step 1, entries of $\mathcal{A}$ from the decomposition: by definition of the matricization, the entry $\mathcal{A}_{d_1,\dots,d_N}$ sits in row $\mathrm{row}(d_1,\dots,d_n)$ and column $\mathrm{col}(d_{n+1},\dots,d_N)$ of $\mathrm{mat}(\mathcal{A};I)$. Reading that entry off the rank decomposition gives

$$\mathcal{A}_{d_1,\dots,d_N} = \sum_{r=1}^{R} (u_r)_{\mathrm{row}(d_1,\dots,d_n)}\,(\bar u_r)_{\mathrm{col}(d_{n+1},\dots,d_N)}.$$

Step 2, substitute into $f$: plug Step 1 into the definition of $f$, split the product of coordinates into the factors with $i \le n$ and the factors with $j > n$, and move the finite sum over $r$ outside:

$$\begin{aligned} f(x^{(1)},\dots,x^{(N)}) &= \sum_{d_1,\dots,d_N} \Big(\prod_{i=1}^{N} x^{(i)}_{d_i}\Big)\mathcal{A}_{d_1,\dots,d_N} \\ &= \sum_{r=1}^{R} \sum_{d_1,\dots,d_N} a_r(d_1,\dots,d_n)\, b_r(d_{n+1},\dots,d_N), \end{aligned}$$

where the two factors are

$$a_r(d_1,\dots,d_n) := \Big(\prod_{i=1}^{n} x^{(i)}_{d_i}\Big)(u_r)_{\mathrm{row}(d_1,\dots,d_n)},$$

$$b_r(d_{n+1},\dots,d_N) := \Big(\prod_{j=n+1}^{N} x^{(j)}_{d_j}\Big)(\bar u_r)_{\mathrm{col}(d_{n+1},\dots,d_N)}.$$

Step 3, the inner sum factorizes: $a_r$ depends only on the first $n$ indices and $b_r$ only on the last $N-n$. A sum over two independent groups of indices of a product $a \cdot b$ equals the product of the two separate sums (distributivity). The first sum is $g_r$ and the second is $\bar g_r$, so

$$f(x^{(1)},\dots,x^{(N)}) = \sum_{r=1}^{R} g_r\big((x^{(i)})_{i\in I}\big)\,\bar g_r\big((x^{(j)})_{j\in I^c}\big).$$

Step 4, conclude: this is a separated representation with $R$ terms. The separation rank is the minimum length over all such representations, hence

$$\boxed{\mathrm{sep}(f;I) \le \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)}$$

The case $R = 0$ is included: then $\mathcal{A} = 0$, so $f \equiv 0$, and the empty sum shows that the separation rank is $0$.

**In words.** $f$ is linear in the tensor $\mathcal{A}$. A tensor whose matricization has rank one "splits" between the two groups of modes, and so does the corresponding $f$. Cutting $\mathcal{A}$ into $R$ such pieces cuts $f$ into $R$ separated products.

**Sanity check.** Take $N = 2$, $D = 2$, $I = \{1\}$. Then $f(x,y) = x^\top A y$ and $\mathrm{mat}(\mathcal{A};I) = A$. For the all-ones matrix $A$, whose rank is $1$, we get $f = (x_1+x_2)(y_1+y_2)$: a single separated product, as the bound promises.

**What to write in the exam.**

- Rank decomposition $\mathrm{mat}(\mathcal{A};I) = \sum_{r=1}^{R} u_r \bar u_r^\top$, so every entry of $\mathcal{A}$ is $\sum_r (u_r)_{\mathrm{row}}(\bar u_r)_{\mathrm{col}}$.
- Define $g_r$ as the multilinear form with coefficients $u_r$ and $\bar g_r$ as the one with coefficients $\bar u_r$.
- Substituting into $f$, the sum over indices factorizes, giving $f = \sum_{r=1}^{R} g_r \bar g_r$.
- Hence $\mathrm{sep}(f;I) \le R$.

*Verified: for 200 random low-rank tensors with various $D$, $N$ and $|I|$, the SVD-built sum of $g_r \bar g_r$ equals $f$ at random inputs to relative error $10^{-8}$ (NumPy).*

**2. Lower bound on a grid: $\mathrm{sep}(h;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{V};I)$**

**What is asked.** For an arbitrary function $h$ and arbitrary vectors $v^{(1)},\dots,v^{(K)}$, show that the matricization of the grid tensor $\mathcal{V}$ has rank at most $\mathrm{sep}(h;I)$. The answer is a proof.

**Tool and why.** Evaluating functions on a finite grid turns them into tensors, so a separated representation of $h$ turns into a sum of outer products of tensors (the hint). The matricization of an outer product is a rank-one matrix (cheat sheet §6), and a product of matrices has rank at most its inner dimension (cheat sheet §3).

**Definitions.** Again $n := |I|$. Let $R' := \mathrm{sep}(h;I)$. If $h$ has no finite separated representation, $R'$ is infinite and there is nothing to prove, so assume $R'$ is finite and fix a representation of minimal length, $h = \sum_{r=1}^{R'} g_r \bar g_r$. The tables of values of $g_r$ and $\bar g_r$ on the grid are the tensor $\mathcal{Z}_r$ of order $n$ and the tensor $\bar{\mathcal{Z}}_r$ of order $N-n$:

$$(\mathcal{Z}_r)_{k_1,\dots,k_n} := g_r\big(v^{(k_1)},\dots,v^{(k_n)}\big),$$

$$(\bar{\mathcal{Z}}_r)_{k_{n+1},\dots,k_N} := \bar g_r\big(v^{(k_{n+1})},\dots,v^{(k_N)}\big).$$

Finally, $\mathrm{vec}(\mathcal{Z}_r)$ is the vector that lists the entries of $\mathcal{Z}_r$ in the row order $\mathrm{row}(\cdot)$, and $\mathrm{vec}(\bar{\mathcal{Z}}_r)$ lists those of $\bar{\mathcal{Z}}_r$ in the column order $\mathrm{col}(\cdot)$; here the indices run over $\{1,\dots,K\}$ instead of $\{1,\dots,D\}$.

**Solution.**

Step 1, $\mathcal{V}$ as a sum of outer products: for every index tuple, use the definition of $\mathcal{V}$, then the representation of $h$, then the definitions of $\mathcal{Z}_r$ and $\bar{\mathcal{Z}}_r$:

$$\begin{aligned} \mathcal{V}_{k_1,\dots,k_N} &= h\big(v^{(k_1)},\dots,v^{(k_N)}\big) \\ &= \sum_{r=1}^{R'} g_r\big(v^{(k_1)},\dots,v^{(k_n)}\big)\,\bar g_r\big(v^{(k_{n+1})},\dots,v^{(k_N)}\big) \\ &= \sum_{r=1}^{R'} (\mathcal{Z}_r)_{k_1,\dots,k_n}(\bar{\mathcal{Z}}_r)_{k_{n+1},\dots,k_N}. \end{aligned}$$

Each summand is, by definition of the outer product, an entry of $\mathcal{Z}_r \otimes \bar{\mathcal{Z}}_r$. Hence

$$\mathcal{V} = \sum_{r=1}^{R'} \mathcal{Z}_r \otimes \bar{\mathcal{Z}}_r.$$

Step 2, matricization of one outer product: the entry of $\mathrm{mat}(\mathcal{Z}_r \otimes \bar{\mathcal{Z}}_r;I)$ in row $\mathrm{row}(k_1,\dots,k_n)$ and column $\mathrm{col}(k_{n+1},\dots,k_N)$ is the product of the $\mathrm{row}$-th entry of $\mathrm{vec}(\mathcal{Z}_r)$ and the $\mathrm{col}$-th entry of $\mathrm{vec}(\bar{\mathcal{Z}}_r)$. That is exactly an outer product of two vectors:

$$\mathrm{mat}(\mathcal{Z}_r\otimes\bar{\mathcal{Z}}_r;I) = \mathrm{vec}(\mathcal{Z}_r)\,\mathrm{vec}(\bar{\mathcal{Z}}_r)^\top.$$

Step 3, linearity: matricization only rearranges entries, so the matricization of a sum is the sum of the matricizations. Stack the vectors $\mathrm{vec}(\mathcal{Z}_r)$ as the $R'$ columns of a matrix $U$, and the vectors $\mathrm{vec}(\bar{\mathcal{Z}}_r)$ as the $R'$ columns of a matrix $\bar U$. Then

$$\mathrm{mat}(\mathcal{V};I) = \sum_{r=1}^{R'} \mathrm{vec}(\mathcal{Z}_r)\,\mathrm{vec}(\bar{\mathcal{Z}}_r)^\top = U\bar U^\top.$$

Step 4, rank bound: every column of $U\bar U^\top$ is a linear combination of the $R'$ columns of $U$, so its rank is at most $R'$:

$$\boxed{\mathrm{rank}\,\mathrm{mat}(\mathcal{V};I) \le R' = \mathrm{sep}(h;I)}$$

**In words.** The separation rank counts how many product terms $h$ needs. Sampling $h$ on a grid cannot create new independent terms; it can only lose some, for instance when the grid is too coarse. So the sampled matrix has at most that many independent rank-one pieces.

**Sanity check.** Take $D = 2$, $N = 2$, $I = \{1\}$ and $h(a,b) = \langle a,b\rangle$, which is the sum of the two products $a_1 b_1$ and $a_2 b_2$, so its separation rank is at most $2$. With the $K = 3$ grid vectors $e_1$, $e_2$, $e_1+e_2$, the matrix $\mathrm{mat}(\mathcal{V};I)$ is their Gram matrix, with rows $(1,0,1)$, $(0,1,1)$, $(1,1,2)$. Its determinant is $0$ and its rank is $2$, within the bound.

**What to write in the exam.**

- Take a minimal representation $h = \sum_{r=1}^{R'} g_r \bar g_r$; if none is finite, there is nothing to prove.
- Let $\mathcal{Z}_r$ and $\bar{\mathcal{Z}}_r$ be the values of $g_r$ and $\bar g_r$ on the grid; then $\mathcal{V} = \sum_r \mathcal{Z}_r \otimes \bar{\mathcal{Z}}_r$.
- Matricization is linear, and $\mathrm{mat}(\mathcal{Z}_r\otimes\bar{\mathcal{Z}}_r;I)$ is the outer product of the two vec's, of rank at most $1$.
- Hence the matricization of $\mathcal{V}$ is $U\bar U^\top$ with inner dimension $R'$, and its rank is at most $R'$.

*Verified: in 200 random trials with nonlinear separable $h$ (sine, cube, exponential and cosine factors, up to $3$ terms) and up to $5$ grid vectors, the rank of the matricized grid tensor never exceeded the number of terms; the Gram example has rank $2$ (NumPy).*

**3. Lower bound for $f$ via the standard basis, and equality**

**What is asked.** Show that $\mathrm{sep}(f;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$, and conclude, together with part 1, that the two are equal. The answer is a proof.

**Tool and why.** Part 2 holds for every function and every grid, so it suffices to pick a grid on which the tensor $\mathcal{V}$ of $f$ is $\mathcal{A}$ itself. Multilinearity of $f$ (cheat sheet §6) makes the standard basis the right grid: plugging basis vectors into $f$ picks out a single entry of $\mathcal{A}$.

**Definitions.** Take $K := D$ and $v^{(k)} := e_k$, the $k$-th standard basis vector of $\mathbb{R}^D$: its $k$-th coordinate is $1$ and all its other coordinates are $0$.

**Solution.**

Step 1, $f$ on basis vectors: by the definition of $f$,

$$f(e_{d_1},\dots,e_{d_N}) = \sum_{d'_1,\dots,d'_N} (e_{d_1})_{d'_1}\cdots(e_{d_N})_{d'_N}\,\mathcal{A}_{d'_1,\dots,d'_N}.$$

Step 2, only one term survives: the product of coordinates is $1$ when $d'_i$ equals $d_i$ for every $i$, and $0$ otherwise. Hence

$$f(e_{d_1},\dots,e_{d_N}) = \mathcal{A}_{d_1,\dots,d_N}.$$

Step 3, the grid tensor is $\mathcal{A}$: with this grid and $h = f$, the definition of $\mathcal{V}$ in part 2 and Step 2 give, for every index tuple,

$$\mathcal{V}_{d_1,\dots,d_N} = f(e_{d_1},\dots,e_{d_N}) = \mathcal{A}_{d_1,\dots,d_N}.$$

So $\mathcal{V} = \mathcal{A}$, and in particular the two matricizations coincide.

Step 4, apply part 2: part 2 holds for any function, in particular for $h = f$:

$$\mathrm{sep}(f;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{V};I) = \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I).$$

Step 5, combine with part 1: the two opposite inequalities give

$$\boxed{\mathrm{sep}(f;I) = \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)}$$

**In words.** A multilinear $f$ is completely determined by its values on basis vectors, and those values are exactly the entries of $\mathcal{A}$. So the grid of part 2 loses nothing here, and the lower bound meets the upper bound from part 1.

**Sanity check.** Take $N = 2$, $D = 2$, $I = \{1\}$ and $\mathcal{A}$ the identity matrix, so $f(x,y) = x_1y_1 + x_2y_2$. The rank is $2$, so the separation rank is exactly $2$: the inner product cannot be written as a single product $g(x)\bar g(y)$. Indeed, on the basis grid $\mathcal{V}$ is the identity, whose rank is $2$.

**What to write in the exam.**

- Take $K = D$ and $v^{(k)} = e_k$.
- By multilinearity, $f(e_{d_1},\dots,e_{d_N})$ is the entry $\mathcal{A}_{d_1,\dots,d_N}$, so $\mathcal{V} = \mathcal{A}$.
- Part 2 with $h = f$ gives $\mathrm{sep}(f;I) \ge \mathrm{rank}\,\mathrm{mat}(\mathcal{A};I)$.
- Together with part 1, equality.

*Verified: for 100 random tensors with $D$ and $N$ in $\{2,3\}$, the grid tensor of $f$ on $e_1,\dots,e_D$ equals $\mathcal{A}$ entry by entry (NumPy).*

**Common mistakes.**

- Mixing up the directions: part 1 is the upper bound, parts 2 and 3 are the lower bound, and the equality needs both.
- In part 1, letting $g_r$ depend on variables outside $I$: the result is not a separated representation.
- In part 3, using an arbitrary grid: then $\mathcal{V}$ is only a compressed image of $\mathcal{A}$, its rank can drop, and the bound obtained is weaker than needed.

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

**1. Balancedness: $\frac{d}{dt} v_m^2 = \frac{d}{dt}\|w_m\|^2$**

**What is asked.** Show that along gradient flow, for every hidden neuron $m$, the squared output weight $v_m(t)^2$ and the squared norm of the input weights $\|w_m(t)\|^2$ change at the same rate. The answer is a proof.

**Tool and why.** Conservation laws of gradient flow (cheat sheet §8). ReLU is positively homogeneous: multiplying $w_m$ by $c > 0$ and dividing $v_m$ by $c$ leaves $h_\theta$ unchanged. Such a rescaling symmetry produces a conserved quantity, and technically it enters through the chain rule plus the identity $z\,\sigma'(z) = \sigma(z)$.

**Definitions.** For neuron $m$ and example $n$, let $z_{m,n} := \langle w_m, x_n\rangle$ be the pre-activation. Let $\ell'_n$ be the derivative of $\ell$ with respect to its first argument (the prediction), evaluated at $(h_\theta(x_n), y_n)$. Gradient flow means $\dot\theta(t) = -\nabla L(\theta(t))$, where a dot is a time derivative.

**Solution.**

Step 1, derivative with respect to $v_m$: $h_\theta(x_n)$ is linear in $v_m$ with coefficient $\sigma(z_{m,n})$, so by the chain rule

$$\frac{\partial L}{\partial v_m} = \sum_{n=1}^{N} \ell'_n\,\sigma(z_{m,n}).$$

Step 2, derivative with respect to $w_m$: only the $m$-th term of $h_\theta$ depends on $w_m$, and the gradient of $\sigma(\langle w, x\rangle)$ in $w$ is $\sigma'(\langle w,x\rangle)\,x$. Hence

$$\nabla_{w_m} L = \sum_{n=1}^{N} \ell'_n\, v_m\, \sigma'(z_{m,n})\, x_n.$$

Step 3, the flow equations: by definition of gradient flow, $\dot v_m$ is minus Step 1 and $\dot w_m$ is minus Step 2.

Step 4, rate of $v_m^2$: by the chain rule and Step 3,

$$\frac{d}{dt} v_m^2 = 2 v_m \dot v_m = -2\sum_{n=1}^{N} \ell'_n\, v_m\, \sigma(z_{m,n}).$$

Step 5, rate of $\|w_m\|^2$: by the chain rule, Step 3, and $\langle w_m, x_n\rangle = z_{m,n}$,

$$\begin{aligned} \frac{d}{dt}\|w_m\|^2 &= 2\langle w_m, \dot w_m\rangle \\ &= -2\sum_{n=1}^{N} \ell'_n\, v_m\, \sigma'(z_{m,n})\, z_{m,n}. \end{aligned}$$

Step 6, the homogeneity identity. **Claim.** For every real $z$, $z\,\sigma'(z) = \sigma(z)$. For $z > 0$ both sides equal $z$, since $\sigma'(z) = 1$. For $z < 0$ both sides are $0$, since $\sigma$ and $\sigma'$ vanish there. For $z = 0$ both sides are $0$ by the convention $\sigma'(0) := 0$.

Step 7, conclude: applying the claim to every $z_{m,n}$ turns the sum in Step 5 into the sum in Step 4, so

$$\boxed{\frac{d}{dt} v_m(t)^2 = \frac{d}{dt}\|w_m(t)\|^2}$$

Integrating in time, $v_m(t)^2 - \|w_m(t)\|^2$ stays equal to its value at initialization.

**In words.** A ReLU neuron can shift scale between its input vector and its output weight without changing the function it computes. Gradient flow never moves along this "free" direction, so it grows (or shrinks) both sides at the same rate and their difference is conserved.

**Sanity check.** With $M = 1$, $D = 1$, one example $x = 1$ and $w > 0$, the network is $h = vw$ and $\ell'$ is $2(vw - y)$. Then $\dot w = -2(vw-y)v$ and $\dot v = -2(vw-y)w$, so both $\frac{d}{dt}v^2$ and $\frac{d}{dt}w^2$ equal $-4(vw-y)vw$: the familiar balancedness of a two-layer linear net.

**What to write in the exam.**

- Chain rule: $\partial L/\partial v_m$ is $\sum_n \ell'_n \sigma(z_{m,n})$ and $\nabla_{w_m} L$ is $\sum_n \ell'_n v_m \sigma'(z_{m,n}) x_n$.
- Then $\frac{d}{dt}v_m^2 = 2v_m\dot v_m$ and $\frac{d}{dt}\|w_m\|^2 = 2\langle w_m,\dot w_m\rangle$.
- Identity $z\,\sigma'(z) = \sigma(z)$ for all $z$, including $z = 0$ by the convention.
- Both rates equal $-2\sum_n \ell'_n v_m \sigma(z_{m,n})$.

*Verified: for 300 random networks and samples, the gradients matched central finite differences and $v_m \dot v_m$ equalled $\langle w_m, \dot w_m\rangle$ for every neuron; along Euler-integrated flow the drift of $v_m^2 - \|w_m\|^2$ shrank in proportion to the step (NumPy).*

**2. $\theta = 0$ is a critical point**

**What is asked.** Show that the gradient of $L$ at $\theta = 0$ is the zero vector. The answer is a proof.

**Tool and why.** Critical points (cheat sheet §7): plug $\theta = 0$ into the partial derivatives of part 1. Every partial derivative carries a factor that vanishes at the origin. As a check that does not lean on the convention for $\sigma'(0)$, we also show directly that $L$ changes only quadratically near $0$.

**Definitions.** Now $N = 1$ and $\ell(\hat y, y) = (\hat y - y)^2$, so $\ell'$ equals $2(h_\theta(x) - y)$. The parameter norm is $\|\theta\|^2 = \sum_m \|w_m\|^2 + \sum_m v_m^2$.

**Solution.**

Step 1, value at the origin: all $w_m$ are $0$, so each pre-activation is $\langle 0, x\rangle = 0$ and $\sigma(0) = 0$. Hence $h_0(x) = 0$ and $L(0) = y^2$.

Step 2, the $v$-derivatives: by Step 1 of part 1, $\partial L/\partial v_m$ equals $2(0 - y)\,\sigma(0)$, which is $0$.

Step 3, the $w$-derivatives: by Step 2 of part 1, $\nabla_{w_m} L$ equals $2(0-y)\,v_m\,\sigma'(0)\,x$, which is $0$ because $v_m = 0$.

Step 4, a direct check: since $|\sigma(z)| \le |z|$, Cauchy–Schwarz and $ab \le \tfrac12(a^2+b^2)$ give

$$|h_\theta(x)| \le \sum_{m=1}^{M} |v_m|\,\|w_m\|\,\|x\| \le \tfrac12\|\theta\|^2\|x\|.$$

Expanding the square, $L(\theta) - L(0)$ equals $h_\theta(x)^2 - 2y\,h_\theta(x)$, so

$$|L(\theta) - L(0)| \le \tfrac14\|\theta\|^4\|x\|^2 + y\,\|\theta\|^2\|x\|.$$

The right side divided by $\|\theta\|$ tends to $0$, so $L$ is differentiable at $0$ with zero gradient:

$$\boxed{\nabla L(0) = 0}$$

**In words.** At the origin every neuron is "doubly off": it has no input weights to produce a signal and no output weight to pass one on. Moving only one of the two changes nothing; only moving both changes $h_\theta$, and that is a second-order effect.

**Sanity check.** With $x = (3,4)$, $y = 1$, $M = 2$, the largest ratio of $|L(\theta) - L(0)|$ to $\|\theta\|$ over random $\theta$ is about $0.48$, $0.049$ and $0.0049$ at radii $0.1$, $0.01$ and $0.001$. It shrinks linearly with the radius, as a zero gradient requires, and matches the leading term $y\|\theta\|\|x\|/2$ of the bound.

**What to write in the exam.**

- At the origin $h_0(x) = 0$, so $L(0) = y^2$.
- Each $\partial L/\partial v_m$ carries the factor $\sigma(\langle 0,x\rangle) = 0$.
- Each $\nabla_{w_m} L$ carries the factor $v_m = 0$.
- Hence $\nabla L(0) = 0$.

*Verified: for $x = (3,4)$, $y = 1$, $M = 2$ and 2000 random directions per radius, the bound on $|h_\theta(x)|$ held and the ratio above shrank linearly with the radius (NumPy).*

**3. $\theta = 0$ is a saddle point**

**What is asked.** For every $\epsilon > 0$, exhibit two points within distance $\epsilon$ of the origin, one with loss above $L(0)$ and one with loss below it. The answer is an explicit construction with a proof.

**Tool and why.** A perturbation of a single neuron (cheat sheet §7, saddles). With only neuron $1$ active, $h_\theta(x)$ is the product $v_1\,\sigma(\langle w_1,x\rangle)$, so the sign of $v_1$ decides whether the output moves toward $y$ or away from it. The size must be capped so that the "downhill" point does not overshoot past $y$.

**Definitions.** Let $u := x/\|x\|$, the unit vector along $x$; it exists because $x \neq 0$. Let the step size be

$$t := \min\Big\{\frac{\epsilon}{2},\ \sqrt{y/\|x\|}\Big\},$$

where the second entry prevents overshooting past $y$, and let $c := t^2\|x\|$. Let $\theta_1$ have $w_1 = tu$ and $v_1 = -t$, let $\theta_2$ have $w_1 = tu$ and $v_1 = t$, and let all other neurons of both be zero.

**Solution.**

Step 1, both points are within $\epsilon$: each has exactly two nonzero blocks, so its squared norm is $t^2\|u\|^2 + t^2$, which is $2t^2$. Since $t \le \epsilon/2$,

$$\|\theta_1\| = \|\theta_2\| = \sqrt2\,t \le \frac{\epsilon}{\sqrt2} < \epsilon.$$

Step 2, the outputs: $\langle w_1, x\rangle = t\|x\|$, which is positive, so $\sigma$ passes it unchanged. The other neurons contribute $0$. Hence $h_{\theta_1}(x) = -c$ and $h_{\theta_2}(x) = c$.

Step 3, the higher point: since $y > 0$ and $c > 0$,

$$L(\theta_1) = (-c-y)^2 = y^2 + 2yc + c^2 > y^2.$$

Step 4, the lower point: expanding,

$$L(\theta_2) = (c-y)^2 = y^2 - c\,(2y - c).$$

Because $t^2 \le y/\|x\|$, we have $c \le y$, so $2y - c$ is at least $y$, hence positive. Together with $c > 0$ this gives $L(\theta_2) < y^2$.

Step 5, conclude: both points are within $\epsilon$ of the origin and

$$\boxed{L(\theta_2) < L(0) < L(\theta_1)}$$

**In words.** Along the direction "switch on one neuron and pick the sign of its output weight", the network output moves either toward $y$, which lowers the loss, or away from it, which raises the loss. The gradient is zero (part 2), so the change is second order, but it takes both signs: the origin is neither a minimum nor a maximum.

**Sanity check.** With $x = (3,4)$, $y = 1$ and $\epsilon = 0.1$: $t = 0.05$, $c = 0.0125$, and the two losses are $1.02515625$ and $0.97515625$ around $L(0) = 1$. With $\epsilon = 10$ the cap is active: $t = 1/\sqrt5$, $c = 1$, and the losses are $4$ and $0$. Without the cap, $t = 5$ would give $c = 125$ and the "lower" point would have loss $15376$.

**What to write in the exam.**

- Take $u = x/\|x\|$, set $w_1 = tu$ and $v_1 = \pm t$, all else $0$, with $t$ as above.
- The norm is $\sqrt2\,t$, which is below $\epsilon$.
- The output is $\pm c$ with $c = t^2\|x\|$, and $c$ is positive and at most $y$.
- With the minus sign the loss is $(y+c)^2$, above $y^2$; with the plus sign it is $(y-c)^2$, below $y^2$.

*Verified: for $x = (3,4)$, $y = 1$ and $\epsilon$ in $\{0.1, 1, 10\}$ the two losses and norms above were computed exactly as stated, and the uncapped step was confirmed to overshoot past $y$ (NumPy).*

**4. A "bad" local minimum**

**What is asked.** Find a point $\bar\theta$ that is a local minimum of $L$, together with a point $\theta^*$ of strictly smaller loss. The answer is two explicit points with a proof.

**Tool and why.** The dead-ReLU region from the hint (cheat sheet §7, local minima). If every pre-activation is strictly negative, it stays negative under small perturbations, so $h_\theta \equiv 0$ near the point and $L$ is constant there. A neighborhood on which $L$ is constant makes the point a local minimum.

**Definitions.** Let $\bar\theta$ have $w_m = -x$ for every $m$ and $v_m = 0$ for every $m$ (any $v$ would do). Let $\theta^*$ have $w_1 = x$ and $v_1 = y/\|x\|^2$, with all other neurons zero. The radius of the dead neighborhood is $r := \|x\|$, which is positive since $x \neq 0$.

**Solution.**

Step 1, the loss at $\bar\theta$: every pre-activation is $\langle -x, x\rangle = -\|x\|^2$, which is negative, so every $\sigma$ outputs $0$. Hence $h_{\bar\theta}(x) = 0$ and $L(\bar\theta) = y^2$.

Step 2, the neighborhood stays dead: let $\theta'$ satisfy $\|\theta' - \bar\theta\| < r$. Each block is no farther than the whole vector, so $\|w'_m + x\| < \|x\|$ for every $m$. By Cauchy–Schwarz,

$$\begin{aligned} \langle w'_m, x\rangle &= -\|x\|^2 + \langle w'_m + x, x\rangle \\ &\le -\|x\|^2 + \|w'_m + x\|\,\|x\| \\ &< -\|x\|^2 + \|x\|^2 = 0. \end{aligned}$$

Step 3, the loss is constant there: all activations are $0$ whatever $v'$ is, so $h_{\theta'}(x) = 0$ and $L(\theta') = y^2$. Thus $L(\theta') \ge L(\bar\theta)$ on the whole ball, and $\bar\theta$ is a local minimum (not a strict one).

Step 4, a better point: $\langle x, x\rangle = \|x\|^2$ is positive, so

$$h_{\theta^*}(x) = \frac{y}{\|x\|^2}\,\|x\|^2 = y,$$

and therefore $L(\theta^*) = 0$.

Step 5, the minimum is bad: since $y > 0$,

$$\boxed{L(\theta^*) = 0 < y^2 = L(\bar\theta)}$$

**In words.** Once every neuron is off on the training point, small changes keep them off: the gradient is zero, the loss sits at $y^2$, and gradient flow started there never moves. Yet a network that switches one neuron on fits the point perfectly. This is the "dead ReLU" failure mode.

**Sanity check.** With $x = (3,4)$, $y = 1$, $M = 2$: random perturbations of $\bar\theta$ with norm below $5$ all give loss exactly $1$, while $\theta^*$, with $w_1 = (3,4)$ and $v_1 = 1/25$, gives output $1$ and loss $0$. Contrast with the origin (part 3): there the pre-activations are exactly $0$, so a perturbation can switch a neuron on and lower the loss.

**What to write in the exam.**

- Take $\bar\theta$ with $w_m = -x$ for all $m$ and $v = 0$.
- If $\|\theta'-\bar\theta\| < \|x\|$, then $\langle w'_m,x\rangle < 0$ for all $m$ by Cauchy–Schwarz.
- So $h \equiv 0$ and $L \equiv y^2$ on that ball: a local minimum.
- Take $\theta^*$ with $w_1 = x$ and $v_1 = y/\|x\|^2$, rest zero: its loss is $0$, below $y^2$.

*Verified: for $x = (3,4)$, $y = 1$, $M = 2$, 20000 random perturbations of norm below $\|x\|$ left the loss at exactly $1$, and $\theta^*$ gave output $1$ and loss $0$ (NumPy).*

**Common mistakes.**

- In part 1, skipping the case $z = 0$ of the identity: the convention $\sigma'(0) := 0$ is exactly what makes it hold there.
- In part 3, using a fixed step such as $\epsilon/2$ for every $\epsilon$: once $c$ exceeds $2y$, the "lower" point overshoots and its loss is above $y^2$.
- In part 4, choosing a point where some pre-activation is exactly $0$ (for example the origin, or $w_m$ orthogonal to $x$): a tiny perturbation switches that neuron on, so the point need not be a local minimum.

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

**1. A bound for every $h_m$ with confidence $\delta_m$**

**What is asked.** Starting from the PAC-Bayes bound, show that with probability at least $1-\delta$ the bound with confidence $\delta_m$ holds for every hypothesis $h_m$ simultaneously. The answer is a proof.

**Tool and why.** PAC-Bayes with point-mass prior and posterior (cheat sheet §11), followed by a union bound (cheat sheet §2). A point mass makes the KL term vanish and collapses the expectations to the values of a single hypothesis; the union bound then pays for using a different prior for each $m$. Alternatively, one prior with weights $\delta_m/\delta$ does everything in a single application.

**Definitions.** Let $P_m$ be the point mass on $h_m$: it gives probability $1$ to $h_m$ and $0$ to every other hypothesis (the callouts below write it $\delta_{h_m}$). For a confidence level $\delta'$, write the right-hand side of the target bound as

$$\varepsilon(\delta') := \sqrt{\frac{\ln(2N/\delta')}{2(N-1)}}.$$

Let $B_m$ be the event, over the draw of $S$, that $L_D(h_m) - L_S(h_m)$ exceeds $\varepsilon(\delta_m)$: the bound for $h_m$ fails.

**Solution.**

Step 1, KL of two equal point masses: with $P = P_m$ and $Q = P_m$, the expectation in the KL is over $h \sim Q$, which is always $h_m$. So

$$KL(Q\|P) = \ln\frac{Q(h_m)}{P(h_m)} = \ln\frac{1}{1} = 0.$$

Step 2, the expectations collapse: $\mathbb{E}_{h\sim Q}[L_D(h)]$ equals $L_D(h_m)$, and likewise $\mathbb{E}_{h\sim Q}[L_S(h)]$ equals $L_S(h_m)$.

Step 3, one hypothesis at a time: apply the reminder with prior $P_m$ and confidence $\delta_m$. This is legal: $P_m$ depends only on the index $m$, not on $S$, and $\delta_m$ lies in $(0,1)$ because it is positive and at most $\delta$. With probability at least $1-\delta_m$ the inequality holds for every $Q$, in particular for $Q = P_m$, where by Steps 1 and 2 it reads $L_D(h_m) - L_S(h_m) \le \varepsilon(\delta_m)$. Hence $\Pr(B_m) \le \delta_m$.

Step 4, union bound over all $m$: by countable subadditivity of probability,

$$\Pr\Big(\bigcup_{m=1}^{\infty} B_m\Big) \le \sum_{m=1}^{\infty} \Pr(B_m) \le \sum_{m=1}^{\infty} \delta_m = \delta.$$

Outside this union none of the bounds fails, so with probability at least $1-\delta$, for every $m \in \mathbb{N}$,

$$\boxed{L_D(h_m) - L_S(h_m) \le \sqrt{\frac{\ln(2N/\delta_m)}{2(N-1)}}}$$

Step 5, a one-shot alternative: take the single prior $P(h_m) := \delta_m/\delta$; it is positive and sums to $1$ because the $\delta_m$ sum to $\delta$. For $Q = P_m$, the KL is $\ln(1/P(h_m))$, which is $\ln(\delta/\delta_m)$. Then

$$\ln(\delta/\delta_m) + \ln(2N/\delta) = \ln(2N/\delta_m),$$

so a single application of the reminder, which already holds for all $Q$ at once, gives the same bound for every $m$ with probability at least $1-\delta$.

**In words.** A point mass turns PAC-Bayes into an ordinary single-hypothesis concentration bound. Spending a share $\delta_m$ of the failure budget on each hypothesis and adding up gives the classic countable-class bound: $\ln(1/\delta_m)$ is the "price" of hypothesis $h_m$.

**Sanity check.** For a finite class of $k$ hypotheses and the equal split $\delta_m = \delta/k$, the bound becomes $\sqrt{\ln(2Nk/\delta)/(2(N-1))}$, the familiar finite-class bound (cheat sheet §10). With $N = 1000$, $\delta = 0.05$ and $\delta_m = \delta 2^{-m}$, the bound for $m = 1$ is $0.0752$.

**What to write in the exam.**

- For each $m$, apply PAC-Bayes with prior and posterior both equal to the point mass on $h_m$, and confidence $\delta_m$.
- Then $KL = 0$ and both expectations are the values at $h_m$, so the bound for $h_m$ fails with probability at most $\delta_m$.
- Union bound over $m$: the total failure probability is at most $\sum_m \delta_m = \delta$.
- Alternatively, one prior $P(h_m) = \delta_m/\delta$ gives KL equal to $\ln(\delta/\delta_m)$, and the logarithms combine.

*Verified: SymPy confirms $\ln(\delta/\delta_m) + \ln(2N/\delta) = \ln(2N/\delta_m)$ and that the weights $2^{-m}$ sum to $1$; the numeric bound was computed in Python.*

**2. A bound tailored to algorithm $A$ (finite $\mathcal{H}'$)**

**What is asked.** Choose the confidence split so that the bound is small on the finite set $\mathcal{H}'$ that $A$ can output, and weak or empty outside it. The answer is an explicit bound.

**Tool and why.** Budget allocation, as in structural risk minimization (cheat sheet §2). The bound for $h_m$ depends only on $\delta_m$, so the whole budget should go to the hypotheses that $A$ can actually return.

**Definitions.** Let $k := |\mathcal{H}'|$. The split is $\delta_m := \delta/k$ when $h_m \in \mathcal{H}'$ and $\delta_m := 0$ otherwise.

**Solution.**

Step 1, the budget adds up: exactly $k$ indices receive $\delta/k$, so the $\delta_m$ sum to $\delta$.

Step 2, why a zero share is allowed: in the union-bound proof of part 1, a hypothesis with $\delta_m = 0$ is simply left out of the union, and its "bound" is infinite, which holds trivially. The union over the $k$ members of $\mathcal{H}'$ has failure probability at most $k \cdot \delta/k$, which is $\delta$.

Step 3, the bound: substituting $\delta_m = \delta/k$ gives $\ln(2N/\delta_m) = \ln(2Nk/\delta)$. So with probability at least $1-\delta$, for every $h \in \mathcal{H}'$,

$$\boxed{L_D(h) - L_S(h) \le \sqrt{\frac{\ln(2N|\mathcal{H}'|/\delta)}{2(N-1)}}}$$

and nothing is promised for $h \notin \mathcal{H}'$, as the question prefers.

Step 4, a strictly positive version: if one insists on positive $\delta_m$ as in part 1, fix a small $\lambda \in (0,1)$. Give each member of $\mathcal{H}'$ the share $(1-\lambda)\delta/k$, and give the $j$-th hypothesis outside $\mathcal{H}'$ the share $\lambda\delta 2^{-j}$. The shares sum to $(1-\lambda)\delta + \lambda\delta$, which is $\delta$. On $\mathcal{H}'$ the logarithm becomes $\ln(2Nk/((1-\lambda)\delta))$, only slightly larger; outside it grows with $j$.

**In words.** The confidence budget is a currency. Algorithm $A$ never returns anything outside $\mathcal{H}'$, so paying for those hypotheses is wasted. Spending everything on $\mathcal{H}'$ gives the finite-class bound, which grows only like $\ln|\mathcal{H}'|$.

**Sanity check.** With $k = 1$ the bound is the single-hypothesis bound $\varepsilon(\delta)$. With $N = 1000$, $\delta = 0.05$ and $k = 100$ it is $0.0872$, small even though the full class is infinite.

**What to write in the exam.**

- Set $\delta_m = \delta/|\mathcal{H}'|$ on $\mathcal{H}'$ and $\delta_m = 0$ elsewhere; the shares sum to $\delta$.
- The union bound of part 1 over $\mathcal{H}'$ gives, with probability at least $1-\delta$, the boxed bound for all $h \in \mathcal{H}'$.
- Outside $\mathcal{H}'$ there is no guarantee, since a zero share means an infinite bound.

*Verified: SymPy confirms $\ln(2N/(\delta/k)) = \ln(2Nk/\delta)$; the numeric value was computed in Python.*

**3. A bound tailored to algorithm $B$ (low index preferred)**

**What is asked.** Choose the confidence split so that the bound grows with the index $m$, making it tightest for the low-index hypotheses that $B$ prefers. The answer is an explicit bound.

**Tool and why.** Same allocation idea (cheat sheet §2, SRM weights): a positive, decreasing, summable sequence $\delta_m$ gives larger shares, and hence tighter bounds, to small $m$.

**Definitions.** Take $\delta_m := \delta\,2^{-m}$.

**Solution.**

Step 1, the split is valid: every share is positive, and the geometric series gives

$$\sum_{m=1}^{\infty} \delta\,2^{-m} = \delta\Big(\tfrac12 + \tfrac14 + \cdots\Big) = \delta.$$

Step 2, substitute into part 1: $\ln(2N/(\delta 2^{-m}))$ equals $\ln(2N/\delta) + m\ln 2$. So with probability at least $1-\delta$, for every $m$,

$$\boxed{L_D(h_m) - L_S(h_m) \le \sqrt{\frac{\ln(2N/\delta) + m\ln 2}{2(N-1)}}}$$

Step 3, monotone in $m$: the numerator grows linearly in $m$ and the square root is increasing, so the bound increases with $m$ and is smallest for low indices.

Step 4, another valid choice: $\delta_m := 6\delta/(\pi^2 m^2)$ also sums to $\delta$, because $\sum_m 1/m^2$ is $\pi^2/6$. Its logarithm is $\ln(2N/\delta) + \ln(\pi^2 m^2/6)$, which grows only like $2\ln m$: a milder penalty for large indices.

**In words.** The share $\delta_m$ acts like a prior weight $\delta_m/\delta$ on $h_m$. Putting more weight where $B$ tends to land makes the bound tighter there, at the price of $\ln(\delta/\delta_m)$ for hypotheses that $B$ rarely picks.

**Sanity check.** With $N = 1000$ and $\delta = 0.05$, the bound is $0.0752$ at $m = 1$, $0.0774$ at $m = 2$, $0.0937$ at $m = 10$ and $0.2000$ at $m = 100$: increasing, as required.

**What to write in the exam.**

- Set $\delta_m = \delta 2^{-m}$; the shares are positive and sum to $\delta$.
- Part 1 gives the boxed bound with $\ln(2N/\delta) + m\ln 2$ under the root.
- It increases with $m$, so it is tighter for low-index hypotheses.

*Verified: SymPy sums both sequences to $\delta$ and expands the logarithm; the four numeric values were computed in Python.*

**4. Is a prior centred on the trained $h$ valid?**

**What is asked.** Decide whether choosing $P$ and $Q$ as the point mass on the trained hypothesis $h$ gives a valid generalization estimate, and justify. The answer is a verdict with an explanation.

**Tool and why.** The assumptions of the PAC-Bayes theorem (cheat sheet §11): the prior $P$ must be fixed before the sample is drawn, while the posterior $Q$ may depend on the sample. Data-dependent "bounds" that ignore this are exactly how bounds become meaningless (cheat sheet §12).

**Definitions.** Let $h_S$ be the hypothesis that the algorithm returns when trained on $S$, and let $P_S$ be the point mass on $h_S$.

**Solution.**

Step 1, verdict: the method is **not valid**.

Step 2, what the theorem guarantees: for one fixed prior $P$, the probability over the draw of $S$ that the inequality holds for all $Q$ is at least $1-\delta$. The probability is over $S$ while $P$ stays fixed.

Step 3, what was done: here $P = P_S$, which depends on $S$ through training. Each sample gets its own prior, chosen after looking at that sample, and the theorem says nothing about such a procedure. The "free" $KL = 0$ is exactly the information about $S$ smuggled into $P$.

Step 4, the "bound" is clearly wrong: the resulting value $\varepsilon(\delta)$ does not depend on the algorithm, on the class, or on the data. For CIFAR10, with $N = 50000$ and $\delta = 0.05$, it is about $0.012$. Now relabel CIFAR10 uniformly at random, independently of the images: a large network can still memorize the training set, giving empirical loss $0$, yet every hypothesis has population 0-1 loss exactly $0.9$ (ten classes). The claimed gap of at most $0.012$ is then false, so the method cannot be a valid guarantee.

Step 5, valid alternatives: fix a prior before seeing data, for example over a countable class as in parts 1 to 3, and pay $KL = \ln(1/P(h_S))$; or estimate the population loss on a held-out validation set.

**In words.** The PAC-Bayes guarantee covers only what was committed to before the data was seen. Centring the prior on the trained hypothesis is like grading your own exam after reading the answer key: the KL term is zero only because the prior already "knows" the sample.

**Sanity check.** The random-label example of Step 4 is a concrete case where the procedure reports a gap of about $0.012$ while the true gap is $0.9$. With a legitimate prior, as in part 1, a hypothesis $h_m$ with a large index pays $\ln(1/\delta_m)$ in the bound instead of getting it for free.

**What to write in the exam.**

- Not valid.
- PAC-Bayes requires $P$ to be independent of $S$; only $Q$ may depend on $S$.
- Here $P$ is the point mass on the trained $h$, which depends on $S$, so the theorem does not apply and $KL = 0$ is not free.
- Fix: a data-independent prior (paying the KL term) or a validation set.

*Verified: the value $\varepsilon(0.05)$ for $N = 50000$ was computed in Python as $0.01205$.*

**Common mistakes.**

- In part 1, applying PAC-Bayes with prior $P_m$ for each $m$ but forgetting that each application has its own failure probability $\delta_m$: without the union bound (or the single combined prior) the bounds do not hold simultaneously.
- In part 2, giving every hypothesis in $\mathcal{H}$ the share $\delta/|\mathcal{H}'|$: the shares then sum to infinity and the union bound collapses.
- In part 4, answering "invalid because $Q$ depends on the data": $Q$ is allowed to depend on $S$; the violation is that the prior $P$ does.

**💡 Useful tricks:** Point-mass prior and posterior, $P=\delta_{h_m}$ and $Q=\delta_{h_m}$, kill the $KL$ term ⇒ per-hypothesis bound; union over $m$ with any $\sum\delta_m=\delta$ (or single-shot prior $P(h_m)=\delta_m/\delta$ so $KL=\ln(\delta/\delta_m)$); algorithm-adapted priors = concentrate the budget on $\mathcal H'$ (finite-class bound) or use a decreasing schedule $\delta_m=\delta2^{-m}$ for low-index preference.

**⚠️ Watch out:** (d) is the classic trap — the PAC-Bayes prior $P$ must be fixed *before* seeing $S$; putting $P=\delta_h$ and $Q=\delta_h$ on the *trained* $h$ is an illegal data-dependent prior, so the guarantee is void; the only fixes are a pre-committed prior (pay $KL$) or a held-out validation set.
