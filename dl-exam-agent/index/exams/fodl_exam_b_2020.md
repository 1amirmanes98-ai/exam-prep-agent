# FODL Exam — Moed B 2020
**Date / semester:** August 13th, 2020 — 2019–2020 Spring Semester, Exam Term B
**Total points:** 100

## Q1 (45 pts) — Tensors as grid functions, CP decomposition as a network, and the symmetric constraint
**Topics:** tensor-methods, universality, hypothesis-class, cp-decomposition, symmetric-tensors, weight-sharing | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness, fodl_recitation_kronecker_expressiveness
**Statement (English translation):**
Let $M, N \in \mathbb{N}$, and consider the space of functions from $[M]^N$ to $\mathbb{R}$.

- **(5 pts)** Explain how this function space corresponds to the space of real tensors with order $N$ and dimension $M$ in each mode.

Consider the CP decomposition:

$$A = \sum_{z=1}^{Z} a_z \cdot \underline{a}^{z,1} \otimes \underline{a}^{z,2} \otimes \cdots \otimes \underline{a}^{z,N}\,,\quad Z \in \mathbb{N}\,,\ \{a_z \in \mathbb{R}\}_{z \in [Z]}\,,\ \{\underline{a}^{z,i} \in \mathbb{R}^M\}_{z \in [Z], i \in [N]} \tag{1}$$

- **(5 pts)** Draw a scheme of the neural network that (1) corresponds to, highlighting the role of $Z$, $\{a_z\}_z$ and $\{\underline{a}^{z,i}\}_{z,i}$.
- **(10 pts)** Prove that (1) is universal, i.e. with large enough $Z$, the parameters $\{a_z\}_z$ and $\{\underline{a}^{z,i}\}_{z,i}$ can be chosen to realize any tensor.

Assume now that (1) is constrained to meet: $\underline{a}^{z,1} = \underline{a}^{z,2} = \cdots = \underline{a}^{z,N}\,,\ \forall z \in [Z]$.

- **(5 pts)** How does the corresponding neural network need to be modified to account for this constraint?
- **(10 pts)** Are there $M, N \geq 2$ for which the constrained decomposition is universal? Prove your answer.
- **(10 pts)** For $N = 2$, characterize the class of tensors that can be expressed by the constrained decomposition (with $Z$ arbitrary large). Prove your answer.

**Solution sketch:**

**1. Functions on the grid as tensors**

**What is asked.** To explain why the space of functions $f:[M]^N\to\mathbb{R}$ is "the same space" as the space of real tensors of order $N$ with dimension $M$ in each mode. The answer is an explicit bijection, together with the check that it is one.

**Tool and why.** A tensor as a lookup table (cheat sheet §6). The set $[M]^N$ is finite, so a function on it is fully determined by its list of values; a tensor is fully determined by its list of entries, and both lists are indexed by exactly the same set.

**Definitions.** Denote by $\mathcal{F}$ the space of functions from $[M]^N$ to $\mathbb{R}$, and by $\mathcal{T}$ the space of tensors $\mathbb{R}^{M\times\cdots\times M}$ with $N$ modes. We define a map $\Phi:\mathcal{F}\to\mathcal{T}$; it is what we must show to be the required correspondence.

**Solution.**

Step 1, defining the map: for every $f\in\mathcal{F}$ and every $(d_1,\ldots,d_N)\in[M]^N$ define

$$\Phi(f)_{d_1,\ldots,d_N}=f(d_1,\ldots,d_N)$$

The $i$-th tensor index runs over $[M]$, exactly like the $i$-th coordinate of the input, so this is a valid tensor of order $N$ and dimension $M$.

Step 2, injectivity: if $\Phi(f)=\Phi(g)$, then $f$ and $g$ agree at every point of $[M]^N$ by step 1, hence $f=g$.

Step 3, surjectivity: given a tensor $A\in\mathcal{T}$ define $f_A(d_1,\ldots,d_N):=A_{d_1,\ldots,d_N}$. By step 1, $\Phi(f_A)=A$.

Step 4, linear structure: the map acts entry by entry, so

$$\Phi(\alpha f+\beta g)=\alpha\Phi(f)+\beta\Phi(g)$$

that is, $\Phi$ is a linear isomorphism, and both spaces have dimension $M^N$.

**In words.** A tensor is a table with $N$ indices, and a function on the grid is a table with $N$ arguments. "Tensor" and "function on the grid" are two names for the same table, so every question about the expressiveness of functions is a question about tensors.

**Sanity check.** For $N=1$ this is the familiar correspondence between functions on $[M]$ and vectors in $\mathbb{R}^M$, and for $N=2$ the one between functions of two indices and $M\times M$ matrices. For $M=2$ and $N=3$ there are $8$ function values and $8$ tensor entries.

**What to write in the exam.**

- Definition: $A_{d_1,\ldots,d_N}=f(d_1,\ldots,d_N)$.
- The tensor is the lookup table of $f$, and every tensor is the lookup table of a unique function.
- The correspondence is linear, injective and surjective; both spaces have dimension $M^N$.

*Verified: q1.py computed all entries of random tensors for $(M,N)$ = (3,3) and (2,4), i.e. 27 and 16 entries, and compared them to the values of the corresponding function; maximum error 0.*

**2. Network scheme of the CP decomposition**

**What is asked.** To describe the network that computes the entries of the tensor in (1), and to show the role of $Z$, of $\{a_z\}_z$ and of $\{\underline{a}^{z,i}\}_{z,i}$. The answer is a description of the architecture, layer by layer.

**Tool and why.** The CP decomposition is a shallow network with product pooling (cheat sheet §6). By part 1 the network must take the indices $d_1,\ldots,d_N$ and return $A_{d_1,\ldots,d_N}$, so we start from an explicit formula for one entry of (1).

**Definitions.** Denote by $e_d\in\mathbb{R}^M$ the one-hot vector of index $d$, so that the network input is a vector. Denote by $h_z$ the output of the $z$-th hidden unit.

**Solution.**

Step 1, one entry of (1): by the definition of the outer product, the entry of $\underline{a}^{z,1}\otimes\cdots\otimes\underline{a}^{z,N}$ at $(d_1,\ldots,d_N)$ is the product of the matching components, so

$$A_{d_1,\ldots,d_N}=\sum_{z=1}^{Z}a_z\prod_{i=1}^{N}\big(\underline{a}^{z,i}\big)_{d_i}$$

Step 2, every factor is a linear projection: picking a component is an inner product with a one-hot vector, i.e. $(\underline{a}^{z,i})_{d_i}=\langle\underline{a}^{z,i},e_{d_i}\rangle$.

Step 3, the network layers, in computation order:

- Input layer: $N$ branches, and branch $i$ receives $e_{d_i}$.
- A linear representation layer in each branch: branch $i$ has $Z$ channels, and channel $z$ computes $\langle\underline{a}^{z,i},e_{d_i}\rangle$.
- A product-pooling layer: unit $z$ multiplies channel $z$ across all $N$ branches, giving the $h_z$ displayed below.
- A linear output layer: the output is $\sum_{z}a_z h_z$, which by step 1 is exactly $A_{d_1,\ldots,d_N}$.

$$h_z=\prod_{i=1}^{N}\langle\underline{a}^{z,i},e_{d_i}\rangle$$

Step 4, the roles of the parameters: $Z$ is the width of the hidden layer, i.e. the number of channels and the number of rank-1 terms, so it upper-bounds the CP rank of the tensor the network realizes. The vectors $\underline{a}^{z,i}$ are the weights of the representation layer in branch $i$, and the scalars $a_z$ are the output-layer weights.

**In words.** Each hidden unit realizes one rank-1 term: it projects each input on its own vector and multiplies, which is exactly an outer product read at one entry. The output layer sums the terms with weights $a_z$.

**Sanity check.** For $Z=1$ the network computes a single product, so it realizes only tensors of rank at most 1, as expected. The number of parameters is $Z(NM+1)$; for $M=3$, $N=3$ and $Z=4$ this is $40$ parameters against $27$ entries.

**What to write in the exam.**

- Input: $N$ one-hot vectors, one per index.
- In each branch a linear layer with $Z$ channels and weights $\underline{a}^{z,i}$.
- Unit $z$ multiplies channel $z$ across the branches, i.e. product pooling.
- Linear output with weights $a_z$; the width $Z$ bounds the CP rank.

*Verified: q1.py evaluated the network on all index tuples with random parameters for $(M,N,Z)$ = (3,3,4) and (2,4,5), and compared with the entries of the tensor from (1); maximum error 0.*

**3. Universality of the CP decomposition**

**What is asked.** To prove that for large enough $Z$ every tensor $A$ is obtained from (1) by a suitable choice of parameters. The answer is a proof with an explicit choice of $Z$ and of the parameters.

**Tool and why.** Expansion in the standard basis (cheat sheet §6). Every tensor is a linear combination of basis tensors, and every basis tensor is an outer product of basis vectors, i.e. a rank-1 term of the form in (1).

**Definitions.** Enumerate all $M^N$ index tuples: for every $z\in[M^N]$ denote by $(d^z_1,\ldots,d^z_N)$ the $z$-th tuple, so that every tuple appears exactly once. The enumeration gives every tensor entry its own hidden unit.

**Solution.**

Step 1, a basis tensor: consider $E=e_{d_1}\otimes\cdots\otimes e_{d_N}$. Its entry at $(c_1,\ldots,c_N)$ is $\prod_i(e_{d_i})_{c_i}$, which equals $1$ if $c_i=d_i$ for every $i$, and $0$ otherwise.

Step 2, choosing the parameters: take $Z=M^N$, and for every $z$ choose

$$\underline{a}^{z,i}=e_{d^z_i}$$

for every $i\in[N]$, and also $a_z=A_{d^z_1,\ldots,d^z_N}$.

Step 3, entry-by-entry check: fix $(c_1,\ldots,c_N)$. By step 1 only the term whose $z$-th tuple equals $(c_1,\ldots,c_N)$ contributes, and it contributes $a_z$. Since that tuple appears exactly once,

$$\Big(\sum_{z=1}^{Z}a_z\,e_{d^z_1}\otimes\cdots\otimes e_{d^z_N}\Big)_{c_1,\ldots,c_N}=A_{c_1,\ldots,c_N}$$

Step 4, conclusion: the entries agree everywhere, so the sum is $A$. For any larger $Z$ add terms with $a_z=0$. Hence (1) is universal.

**In words.** Every tensor entry gets its own hidden unit: the unit "fires" only on its own tuple and returns the desired value. This is the tensor version of a lookup table with one unit per row.

**Sanity check.** For $N=2$ the construction writes a matrix as a sum of $M^2$ matrices with a single nonzero entry. The construction is sufficient but not necessary: by the SVD $M$ terms suffice, since the rank of an $M\times M$ matrix is at most $M$. For $M=2$ and $N=2$ the construction uses $4$ terms.

**What to write in the exam.**

- Claim: with $Z=M^N$ every tensor is expressible.
- Choice: for every tuple $(d_1,\ldots,d_N)$ one term with basis vectors $e_{d_i}$ and coefficient $A_{d_1,\ldots,d_N}$.
- The basis tensor is $1$ at its own entry and $0$ elsewhere, so the sum reproduces $A$.

*Verified: q1.py reconstructed random tensors for $(M,N)$ = (2,2), (3,3), (2,5) with 4, 27 and 32 terms respectively; maximum error 0.*

**4. The constraint as weight sharing**

**What is asked.** How the network of part 2 changes when we require $\underline{a}^{z,1}=\underline{a}^{z,2}$ and so on up to $\underline{a}^{z,N}$, for every $z$. The answer is a description of the change in the architecture.

**Tool and why.** Weight sharing (cheat sheet §6), as in a convolution. The constraint says that the same weights are used in several places in the network, which is exactly the definition of weight sharing.

**Definitions.** Denote by $\underline{a}^{z}\in\mathbb{R}^M$ the shared vector of unit $z$, i.e. $\underline{a}^{z,i}=\underline{a}^{z}$ for every $i$.

**Solution.**

Step 1, substituting into the hidden unit: by part 2, step 3, unit $z$ now computes

$$h_z=\prod_{i=1}^{N}\langle\underline{a}^{z},e_{d_i}\rangle$$

Step 2, the change in the architecture: instead of $N$ separate representation layers, one per branch, there is a single linear layer with $Z$ channels applied to all $N$ branches. This is one $1\times1$ convolution slid over the $N$ positions.

Step 3, what does not change: the product pooling and the output layer with $a_z$ stay as they are.

Step 4, a consequence: multiplication is commutative, so $h_z$, and the whole output, do not change when the order of the inputs $d_1,\ldots,d_N$ is permuted. This fact is the basis of part 5.

**In words.** Without the constraint each input position has its own filter; with it the same filter scans all positions, as in a convolutional network. The price is that the network no longer knows which input came from which position.

**Sanity check.** The number of parameters drops from $Z(NM+1)$ to $Z(M+1)$. For $M=3$, $N=3$ and $Z=4$: from $40$ to $16$.

**What to write in the exam.**

- The same vector $\underline{a}^{z}$ in all branches of unit $z$.
- That is, the representation layer is weight-shared across modes, like a $1\times1$ convolution.
- Pooling and output layers unchanged; the output is symmetric in the order of the inputs.

*Verified: q1.py computed random constrained sums and checked invariance under all permutations of the modes; maximum deviation $4.4\cdot10^{-16}$; the parameter counts 40 and 16 were computed directly.*

**5. Is the constrained decomposition universal?**

**What is asked.** Whether there exist $M,N\ge2$ for which the constrained decomposition expresses every tensor. The answer is a yes/no verdict with a proof.

**Tool and why.** An invariant argument (cheat sheet §6): find a property every constrained term has and that is preserved under sums; then a single tensor without the property rules out universality for every $Z$.

**Definitions.** A tensor $A$ is called symmetric if its entries do not change under any permutation $\pi$ of $[N]$, i.e. for every $\pi$ and every index tuple

$$A_{d_{\pi(1)},\ldots,d_{\pi(N)}}=A_{d_1,\ldots,d_N}$$

Denote by $\mathcal{S}$ the set of symmetric tensors. Denote by $e_1,e_2$ the first two basis vectors of $\mathbb{R}^M$, which exist since $M\ge2$.

**Solution.**

Verdict: no. For no $M,N\ge2$ is the constrained decomposition universal.

**Claim.** Every tensor of the form $\sum_z a_z(\underline{a}^{z})^{\otimes N}$ lies in $\mathcal{S}$, for every $Z$.

Step 1, a single term is symmetric: the entry of $a_z(\underline{a}^{z})^{\otimes N}$ at $(d_1,\ldots,d_N)$ is $a_z\prod_i(\underline{a}^{z})_{d_i}$. Permuting the indices only reorders the factors of the product, and multiplication is commutative, so the entry does not change.

Step 2, closure under sums: the symmetry condition is a linear equality between entries. If $A,B\in\mathcal{S}$, every entry of $A+B$ satisfies the same equality, and so does $cA$. Hence $\mathcal{S}$ is a linear subspace.

Step 3, consequence of the claim: by steps 1 and 2, every tensor the constrained decomposition expresses is symmetric, whatever $Z$ is.

Step 4, a non-symmetric tensor: define $B=e_1\otimes e_2\otimes e_1\otimes\cdots\otimes e_1$, where $N\ge2$ guarantees at least two positions. By part 3, step 1, $B_{1,2,1,\ldots,1}=1$ and $B_{2,1,1,\ldots,1}=0$. The permutation swapping the first two indices changes the entry, so $B\notin\mathcal{S}$.

Step 5, finish: $B$ is not symmetric, so by step 3 it is not expressible with any $Z$. The constrained decomposition is not universal for any $M,N\ge2$.

**In words.** Weight sharing makes the network blind to the order of its inputs, and every function it computes is symmetric. A function that distinguishes "1 then 2" from "2 then 1" stays out of reach, and no width helps.

**Sanity check.** The condition $M,N\ge2$ is necessary: for $N=1$ every vector $A$ is obtained with $Z=1$, $a_1=1$ and $\underline{a}^{1}=A$, and for $M=1$ every tensor is a scalar. In both cases every tensor is trivially symmetric. Moreover, for $N=2$ the tensor $B$ is the matrix $e_1e_2^\top$, and the nearest symmetric matrix is at distance $1/\sqrt2\approx0.707$ in Frobenius norm, so not even approximation is possible.

**What to write in the exam.**

- Answer: no, for no $M,N\ge2$.
- Every term $a_z(\underline{a}^{z})^{\otimes N}$ is symmetric, since multiplication is commutative.
- A sum of symmetric tensors is symmetric, for every $Z$.
- The tensor $e_1\otimes e_2\otimes e_1\otimes\cdots\otimes e_1$ is not symmetric: the entries $1$ and $0$ swap when the first two indices are swapped.

*Verified: in q1.py random constrained sums with $Z=7$ for $(M,N)$ = (2,2), (2,3), (3,4) were symmetric up to $4.4\cdot10^{-16}$, the entries of $B$ came out 1 and 0, and the distance of $B$ from the symmetric tensors for $N=2$ came out $0.7071$.*

**6. For $N=2$: exactly the symmetric matrices**

**What is asked.** For $N=2$, characterize the set of matrices the constrained decomposition expresses when $Z$ is free, and prove it. The answer is a description of the class and a proof of both inclusions.

**Tool and why.** The spectral theorem (cheat sheet §3). It writes every symmetric matrix as a sum of terms $\lambda\underline{v}\underline{v}^\top$, which is exactly the form of a constrained term for $N=2$.

**Definitions.** For $N=2$ we have $\underline{a}\otimes\underline{a}=\underline{a}\,\underline{a}^\top$. Denote by $\mathcal{C}$ the set of matrices the constrained decomposition expresses with some $Z$, and by $\mathbb{S}^M$ the symmetric $M\times M$ matrices.

**Solution.**

**Claim.** $\mathcal{C}=\mathbb{S}^M$.

Step 1, the inclusion $\mathcal{C}\subseteq\mathbb{S}^M$: every term satisfies

$$\big(a_z\underline{a}^{z}\underline{a}^{z\top}\big)^\top=a_z\underline{a}^{z}\underline{a}^{z\top}$$

and a sum of symmetric matrices is symmetric. This is part 5 for $N=2$.

Step 2, the spectral theorem: let $A\in\mathbb{S}^M$. There are orthonormal eigenvectors $\underline{v}_1,\ldots,\underline{v}_M$ with real eigenvalues $\lambda_1,\ldots,\lambda_M$, and

$$A=\sum_{z=1}^{M}\lambda_z\,\underline{v}_z\underline{v}_z^\top$$

Step 3, the inclusion $\mathbb{S}^M\subseteq\mathcal{C}$: take $Z=M$, $a_z=\lambda_z$ and $\underline{a}^{z}=\underline{v}_z$. By step 2 this is exactly (1) with the constraint, so $A\in\mathcal{C}$.

Step 4, the role of the sign: eigenvalues may be negative, and that is fine because $a_z$ is any real number. If the coefficient had to live inside the vector, i.e. $a_z=1$, we would get only positive semidefinite matrices, since $\underline{v}\underline{v}^\top\succeq0$.

Step 5, conclusion: by steps 1 and 3 the class is exactly $\mathbb{S}^M$. Already $Z=M$ suffices, and a larger $Z$ adds nothing.

**In words.** The constraint forces symmetry, and the spectral theorem says symmetry is the only price: every symmetric matrix is a sum of $M$ "vector times itself" products with real coefficients.

**Sanity check.** For $M=2$ take the swap matrix, with eigenvalues $1$ and $-1$:

$$\begin{pmatrix}0&1\\1&0\end{pmatrix}=\tfrac12\begin{pmatrix}1\\1\end{pmatrix}\begin{pmatrix}1&1\end{pmatrix}-\tfrac12\begin{pmatrix}1\\-1\end{pmatrix}\begin{pmatrix}1&-1\end{pmatrix}$$

At entry $(1,2)$: $\tfrac12+\tfrac12$ gives $1$; at entry $(1,1)$: $\tfrac12-\tfrac12$ gives $0$. The negative coefficient $a_2=-\tfrac12$ is necessary, since the matrix is not positive semidefinite.

**What to write in the exam.**

- Answer: exactly the symmetric $M\times M$ matrices.
- First inclusion: every term $a_z\underline{a}^{z}\underline{a}^{z\top}$ is symmetric, and so is the sum.
- Second inclusion: by the spectral theorem, $Z=M$, $a_z=\lambda_z$, $\underline{a}^{z}=\underline{v}_z$.
- The signs of the eigenvalues are carried by $a_z$.

*Verified: in q1.py a random symmetric $4\times4$ matrix with eigenvalues $-4.242$, $-0.593$, $1.893$, $4.801$ was reconstructed from 4 constrained terms with error $6.7\cdot10^{-16}$, and the decomposition of the swap matrix was reproduced exactly.*

**Common mistakes.**

- In part 5, showing only that a single term is symmetric and forgetting closure under sums; without it the argument does not cover arbitrary $Z$.
- In part 6, proving only one inclusion, or requiring positive coefficients, which yields only the positive semidefinite matrices.
- In part 3, claiming that $Z=M^N$ is necessary; it is only sufficient, and for $N=2$ already $M$ terms suffice.

**💡 Useful tricks:** Function on the grid ↔ tensor (lookup table); CP = shallow product-pooling net with width $Z$ = rank; universality by enumerating the $M^N$ standard-basis rank-1 terms; the symmetric constraint is *weight sharing* across modes; for $N=2$ the spectral theorem gives exactly the symmetric matrices (the scalar $a_z$ absorbs sign, so negative eigenvalues are fine).

**⚠️ Watch out:** (v) the obstruction is that a *sum* of symmetric tensors stays symmetric while non-symmetric tensors exist for $M,N\geq2$ — cite a concrete asymmetric entry; (vi) prove BOTH inclusions, and note the $\supseteq$ direction needs signs carried by $a_z$ (not by $\underline a^z$, whose outer product is always PSD).

## Q2 (35 pts) — Gradient flow prediction dynamics ($\dot{u} = -H(u-y)$) and convergence under a fixed kernel
**Topics:** gradient-flow, ntk, overparameterization, convergence-rate, linear-convergence | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_05_optimization_3, fodl_recitation_gradient_flow
**Statement (English translation):**
For $k, d \in \mathbb{N}$, let $f : \mathbb{R}^k \times \mathbb{R}^d \to \mathbb{R}$ be a continuously differentiable function representing a neural network, such that $f(\underline{w}, \underline{x})$ stands for network output when weights $= \underline{w}$ and input $= \underline{x}$. Given training set $\{(\underline{x}_i, y_i)\}_{i=1}^m \subseteq \mathbb{R}^d \times \mathbb{R}$, suppose we train by running gradient flow over $\ell_2$ loss:

$$\ell(\underline{w}) = \tfrac{1}{2}\sum\nolimits_{i=1}^m (f(\underline{w}, \underline{x}_i) - y_i)^2$$

Denote $\underline{y} := [y_1, y_2, \ldots, y_m]^\top \in \mathbb{R}^m$, and for $t \geq 0$, let $\underline{u}(t)$ hold the predictions on training instances at time $t$ of optimization, i.e. $\underline{u}(t) := [f(\underline{w}(t), \underline{x}_1), \ldots, f(\underline{w}(t), \underline{x}_m)]^\top \in \mathbb{R}^m$.

- **(10 pts)** Prove that $\underline{u}(t)$ follows the dynamics:
$$\underline{\dot{u}}(t) := \tfrac{d}{dt}\underline{u}(t) = -H(t)\,(\underline{u}(t) - \underline{y})\,,\ t \geq 0\,,$$
where $H(t) \in \mathbb{R}^{m \times m}$ is defined by $(H(t))_{i,j} = \left\langle \frac{\partial f(\underline{w}(t), \underline{x}_i)}{\partial \underline{w}}, \frac{\partial f(\underline{w}(t), \underline{x}_j)}{\partial \underline{w}} \right\rangle$.

Assume now that $H(t)$ is fixed ($H(t) = H(0)$, $\forall t \geq 0$) and let $\{\lambda_i \in \mathbb{R}\}_{i=1}^m$ be its eigenvalues.

- **(10 pts)** Prove that if $\lambda_i > 0$, $\forall i \in [m]$, then for any $\epsilon > 0$, it holds that $\ell(\underline{w}(t)) \leq \epsilon$ after time at most $\max_{i \in [m]} \frac{1}{2\lambda_i} \log\left(\frac{m \|\underline{u}(0) - \underline{y}\|^2}{2\epsilon}\right)$.
- **(8 pts)** Prove that if $k < m$ then there exists $i \in [m]$ for which $\lambda_i = 0$.
- **(7 pts)** Explain (qualitatively) why convergence to zero loss is unlikely to happen in this regime ($k < m$), but is likely under overparameterization, i.e. when $k \gg m$.

**Solution sketch:**

**1. The prediction dynamics**

**What is asked.** To prove that the prediction vector $\underline{u}(t)$ satisfies $\underline{\dot{u}}=-H(t)(\underline{u}-\underline{y})$, where $H(t)$ is the Gram matrix of the gradients. The answer is a proof.

**Tool and why.** The chain rule together with the definition of gradient flow (cheat sheet §9). The prediction $u_i(t)$ depends on time only through the weights $\underline{w}(t)$, and gradient flow gives $\underline{\dot{w}}$ explicitly, so it suffices to differentiate a composition.

**Definitions.** Write $f_i(\underline{w}):=f(\underline{w},\underline{x}_i)$, and denote by $\nabla f_i\in\mathbb{R}^k$ its gradient with respect to $\underline{w}$, to shorten the notation. Denote by $J\in\mathbb{R}^{m\times k}$ the Jacobian whose $i$-th row is $\nabla f_i^\top$; it gives a matrix form of $H$.

**Solution.**

Step 1, the gradient of the loss: by the chain rule, the gradient of $\tfrac12(f_j-y_j)^2$ is $(f_j-y_j)\nabla f_j$, so

$$\nabla\ell(\underline{w})=\sum_{j=1}^{m}\big(f_j(\underline{w})-y_j\big)\nabla f_j(\underline{w})$$

Step 2, gradient flow: by definition, $\underline{\dot{w}}(t)=-\nabla\ell(\underline{w}(t))$.

Step 3, the chain rule for a prediction: $f$ is continuously differentiable and $u_i(t)=f_i(\underline{w}(t))$, so

$$\dot{u}_i(t)=\big\langle\nabla f_i(\underline{w}(t)),\underline{\dot{w}}(t)\big\rangle$$

Step 4, substitution: plug in steps 1 and 2 and pull the sum out of the inner product, which is linear:

$$\begin{aligned}\dot{u}_i&=-\sum_{j=1}^{m}(u_j-y_j)\,\langle\nabla f_i,\nabla f_j\rangle\\&=-\sum_{j=1}^{m}H_{ij}(t)\,(u_j-y_j)\end{aligned}$$

The second equality is the definition of $H(t)$.

Step 5, vector form: collecting step 4 over all $i\in[m]$ gives $\underline{\dot{u}}=-H(t)(\underline{u}-\underline{y})$, as required.

Step 6, the structure of $H$, for later use: by the definition of $J$, $H=JJ^\top$. Hence $H$ is symmetric, and for every $\underline{z}\in\mathbb{R}^m$

$$\underline{z}^\top H\underline{z}=\|J^\top\underline{z}\|^2\ge0$$

that is, $H$ is positive semidefinite.

**In words.** A step of the weights along the gradient moves all predictions together. How much prediction $i$ moves because of the error on example $j$ is set by how aligned the gradients of the two examples are, which is exactly the entry $H_{ij}$, the kernel.

**Sanity check.** For a linear model $f(\underline{w},\underline{x})=\langle\underline{w},\underline{x}\rangle$ the gradient is $\nabla f_i=\underline{x}_i$, so $H$ is the Gram matrix $XX^\top$ of the inputs, constant in time. We recover the familiar linear-regression dynamics.

**What to write in the exam.**

- By gradient flow, $\underline{\dot{w}}=-\sum_j(u_j-y_j)\nabla f_j$.
- By the chain rule, $\dot{u}_i=\langle\nabla f_i,\underline{\dot{w}}\rangle$.
- Substituting: $\dot{u}_i=-\sum_j H_{ij}(u_j-y_j)$, which in vector form is the required dynamics.

*Verified: in q2.py, for a small tanh network with $k=16$ and $m=5$, the derivative of the predictions along a gradient step was computed by central differences and compared to $-H(\underline{u}-\underline{y})$; maximum deviation $1.9\cdot10^{-9}$.*

**2. Convergence time when all eigenvalues are positive**

**What is asked.** To prove that if all eigenvalues of the fixed $H$ are positive, then $\ell(\underline{w}(t))\le\epsilon$ from the time given in the question on. The answer is a proof.

**Tool and why.** Diagonalizing a linear system in the eigenbasis (cheat sheet §3 and §9). When $H$ is fixed, the residual equation is linear with constant coefficients, and in the eigenbasis it splits into $m$ independent scalar equations, each solved explicitly.

**Definitions.** Denote by $\underline{e}(t):=\underline{u}(t)-\underline{y}$ the residual, since the loss is $\tfrac12\|\underline{e}\|^2$. Since $H$ is symmetric, it has orthonormal eigenvectors $\underline{v}_1,\ldots,\underline{v}_m$ with $H\underline{v}_i=\lambda_i\underline{v}_i$. Write $c_i(t):=\langle\underline{e}(t),\underline{v}_i\rangle$, the component of the residual along eigendirection $i$. Denote by $T_\epsilon$ the time in the question:

$$T_\epsilon=\max_{i\in[m]}\frac{1}{2\lambda_i}\log\Big(\frac{m\|\underline{e}(0)\|^2}{2\epsilon}\Big)$$

**Solution.**

Step 1, the residual equation: $\underline{y}$ is constant, so by part 1, $\underline{\dot{e}}=\underline{\dot{u}}$, i.e. $\underline{\dot{e}}=-H\underline{e}$.

Step 2, one equation per component: differentiate $c_i$ and use the symmetry of $H$ to move it onto $\underline{v}_i$:

$$\begin{aligned}\dot{c}_i&=\langle\underline{\dot{e}},\underline{v}_i\rangle\\&=-\langle H\underline{e},\underline{v}_i\rangle\\&=-\langle\underline{e},H\underline{v}_i\rangle\\&=-\lambda_i c_i\end{aligned}$$

Step 3, solution: this is a linear scalar equation, so $c_i(t)=e^{-\lambda_i t}c_i(0)$.

Step 4, the loss in the eigenbasis: the basis is orthonormal, so the squared norm is the sum of the squared components:

$$\begin{aligned}\ell(\underline{w}(t))&=\tfrac12\|\underline{e}(t)\|^2\\&=\tfrac12\sum_{i=1}^{m}e^{-2\lambda_i t}c_i(0)^2\end{aligned}$$

Step 5, a bound on each coefficient: by Cauchy–Schwarz and $\|\underline{v}_i\|=1$, $c_i(0)^2\le\|\underline{e}(0)\|^2$.

Step 6, a budget of $\epsilon/m$ per term: by step 5 it suffices to require that the bound on term $i$ be at most $\epsilon/m$. Rearrange, take logarithms (both sides positive) and divide by $2\lambda_i$, which is positive by assumption:

$$\begin{aligned}\tfrac12e^{-2\lambda_i t}\|\underline{e}(0)\|^2\le\tfrac{\epsilon}{m}&\iff e^{2\lambda_i t}\ge\frac{m\|\underline{e}(0)\|^2}{2\epsilon}\\&\iff t\ge\frac{1}{2\lambda_i}\log\Big(\frac{m\|\underline{e}(0)\|^2}{2\epsilon}\Big)\end{aligned}$$

Step 7, summing up: if $t\ge T_\epsilon$, then $t$ exceeds each of the $m$ thresholds of step 6, so every term in step 4 is at most $\epsilon/m$, and a sum of $m$ terms is at most $\epsilon$. Every term decreases in $t$, so the loss stays below $\epsilon$ at all later times. If the expression inside the logarithm is below $1$, the threshold is negative and already at $t=0$ the loss is at most $\epsilon$.

**In words.** In the eigenbasis each direction of the error decays on its own, at its own rate $\lambda_i$. The slowest direction, with the smallest $\lambda_i$, decides when all are small, hence the maximum. The factor $m$ inside the logarithm is the price of splitting the budget $\epsilon$ among the $m$ terms.

**Sanity check.** Take $H=\mathrm{diag}(1,2)$, $\underline{e}(0)=(1,1)$ and $\epsilon=0.01$, so $m=2$ and $\|\underline{e}(0)\|^2=2$. The expression inside the logarithm is $2\cdot2/0.02$, i.e. $200$, so $T_\epsilon=\tfrac12\log200$, i.e. about $2.649$. At that time

$$\ell=\tfrac12\big(\tfrac{1}{200}+\tfrac{1}{40000}\big)\approx0.00251$$

which is indeed at most $0.01$. The bound is not tight: since $\sum_i c_i(0)^2=\|\underline{e}(0)\|^2$, already the threshold $\tfrac12\log100$, i.e. about $2.303$, suffices.

**What to write in the exam.**

- Residual equation: $\underline{\dot{e}}=-H\underline{e}$, and in the eigenbasis $c_i(t)=e^{-\lambda_i t}c_i(0)$.
- Loss: $\ell=\tfrac12\sum_i e^{-2\lambda_i t}c_i(0)^2$, with $c_i(0)^2\le\|\underline{e}(0)\|^2$.
- Require every term to be at most $\epsilon/m$, which gives the threshold for each $i$.
- Take the maximum over $i$ and sum $m$ terms.

*Verified: q2.py checked 2000 random positive definite matrices with $m$ between 2 and 6, random initial residuals and random $\epsilon$; at $T_\epsilon$ and later, with an exact matrix exponential, the loss was always at most $\epsilon$; the example numbers were recomputed.*

**3. If $k<m$ there is a zero eigenvalue**

**What is asked.** To prove that when the number of parameters $k$ is smaller than the number of examples $m$, at least one eigenvalue of $H$ equals $0$. The answer is a proof.

**Tool and why.** The rank of a matrix product (cheat sheet §3). By part 1, step 6, $H=JJ^\top$, and the inner dimension of the product is $k$, so the rank cannot exceed $k$.

**Definitions.** $J\in\mathbb{R}^{m\times k}$ is the Jacobian of part 1, evaluated at $\underline{w}(0)$, so that $H=JJ^\top$.

**Solution.**

Step 1, the rank bound: the columns of $JJ^\top$ are linear combinations of the columns of $J$, and $J$ has only $k$ columns. Hence

$$\begin{aligned}\mathrm{rank}(H)&\le\mathrm{rank}(J)\\&\le k\\&<m\end{aligned}$$

Step 2, a null-space vector: the matrix $J^\top$ is $k\times m$ with $k<m$, so it has a nontrivial null space: there is $\underline{z}\ne0$ with $J^\top\underline{z}=0$.

Step 3, a zero eigenvalue: for this $\underline{z}$ we have $H\underline{z}=J(J^\top\underline{z})$, i.e. $H\underline{z}=0$ with $\underline{z}\ne0$. Hence $0$ is an eigenvalue of $H$, i.e. $\lambda_i=0$ for some $i$. By step 1 and the diagonalization of the symmetric $H$, at least $m-k$ of the eigenvalues equal $0$.

**In words.** There are $m$ error directions but only $k$ gradients, and $k$ vectors cannot span an $m$-dimensional space. In a direction the gradients do not see, the kernel is zero.

**Sanity check.** For $k=1$ and $m=2$ the Jacobian is a column $(g_1,g_2)$, and $H$ is the matrix with rows $(g_1^2,g_1g_2)$ and $(g_1g_2,g_2^2)$. Its determinant is $g_1^2g_2^2-(g_1g_2)^2$, i.e. $0$, so there is a zero eigenvalue, as expected.

**What to write in the exam.**

- Writing $H=JJ^\top$ with $J\in\mathbb{R}^{m\times k}$.
- Hence $\mathrm{rank}(H)\le k$, which is less than $m$.
- There is $\underline{z}\ne0$ with $J^\top\underline{z}=0$, so $H\underline{z}=0$ and $0$ is an eigenvalue.

*Verified: in q2.py, for random Jacobians with $(k,m)$ = (3,5) and (10,20), the rank of $H$ came out 3 and 10, and the smallest eigenvalue was of order $10^{-15}$.*

**4. Why no convergence to zero when $k<m$, and why there is when $k\gg m$**

**What is asked.** To explain qualitatively why zero loss is not expected when $k<m$ but is expected under overparameterization. The answer is an explanation, which we back with a short computation.

**Tool and why.** Parts 2 and 3 together with the NTK regime (cheat sheet §9). Part 3 says there are error directions with $\lambda=0$, and part 2 shows each direction decays at the rate of its eigenvalue; it remains to see what happens to a direction whose rate is zero.

**Definitions.** Denote by $P_0$ the orthogonal projection onto the null space of $H$. $H$ is fixed, so $P_0$ is fixed too; we define it to isolate the part of the residual that does not decay.

**Solution.**

Step 1, the frozen component: $H$ is symmetric, so $P_0H=0$. By part 2, step 1, the derivative of $P_0\underline{e}$ is $-P_0H\underline{e}$, i.e. $0$, so $P_0\underline{e}(t)=P_0\underline{e}(0)$ for every $t$.

Step 2, a floor on the loss: a projection does not increase the norm, so for every $t$

$$\begin{aligned}\ell(\underline{w}(t))&=\tfrac12\|\underline{e}(t)\|^2\\&\ge\tfrac12\|P_0\underline{e}(0)\|^2\end{aligned}$$

Step 3, what this means when $k<m$: by part 3 the null space has dimension at least $m-k$, in particular it is nontrivial. For "generic" labels the initial residual has a nonzero component in it, so the loss gets stuck above zero. Put differently, the predictions can only move within the column space of $J$, of dimension at most $k$, and $k$ parameters are not enough to fit $m$ generic labels.

Step 4, what this means when $k\gg m$: $J$ has many more columns than rows, so generically it has full row rank, i.e. rank $m$. Then $H\succ0$ and $\lambda_{\min}>0$, and part 2 gives exponential decay to zero loss, within time of order $\log(1/\epsilon)/\lambda_{\min}$.

Step 5, the assumption that $H$ is fixed: in a general network $H(t)$ changes. In the wide (NTK) regime the weights move little relative to their size, so $H(t)\approx H(0)$ throughout training; there the assumption of the previous parts is justified, and $\lambda_{\min}(H(t))$ stays positive. For $k<m$ there is no such justification, and $H$ is rank-deficient anyway.

**In words.** Without enough parameters there are error directions that no small change of the weights moves, and the error in them stays forever. With excess parameters every error direction is visible to the gradients, and the wide network barely changes its kernel during training, so the analysis of part 2 applies and gives convergence to zero.

**Sanity check.** In a linear model $f(\underline{w},\underline{x})=\langle\underline{w},\phi(\underline{x})\rangle$ the kernel is exactly fixed. With $k=3$ and $m=8$ the loss at time $200$ was $2.6717$, exactly the floor $\tfrac12\|P_0\underline{e}(0)\|^2$ of step 2; with $k=40$ and $m=8$ the loss went to $0$. In a one-hidden-layer tanh network, the relative change of $H$ during training was $0.95$, $0.29$, $0.066$ and $0.0089$ for widths $10$, $100$, $1000$ and $10000$: the wider the network, the closer $H$ is to fixed.

**What to write in the exam.**

- The residual component in the null space of $H$ does not change, so the loss is at least $\tfrac12\|P_0\underline{e}(0)\|^2$.
- When $k<m$ the null space is nontrivial, and for generic labels the floor is positive.
- When $k\gg m$, generically $J$ has full row rank, $H\succ0$, and part 2 gives zero loss.
- In the NTK regime $H(t)\approx H(0)$, so the fixed-kernel assumption is reasonable.

*Verified: in q2.py a linear model with $(k,m)$ = (3,8) and (40,8) was solved with a matrix exponential, and the final loss matched the predicted floor to $10^{-12}$; the relative change of $H$ was measured under gradient descent on a tanh network at four widths.*

**Common mistakes.**

- In part 2, diagonalizing without mentioning that $H$ is symmetric; without an orthonormal eigenbasis the loss cannot be written as a sum of squared components. Dropping the factor $\tfrac12$ gives a wrong constant inside the logarithm.
- In part 3, claiming $\mathrm{rank}(H)\le k$ without writing $H=JJ^\top$, or stopping at "$H$ is singular" without concluding that there is a zero eigenvalue.
- In part 4, mentioning only $H\succ0$ when $k\gg m$ and forgetting $H(t)\approx H(0)$ in the NTK regime, which is what justifies the fixed-kernel assumption.

**💡 Useful tricks:** The dynamics come from chain rule: $\dot u_i=\langle\partial_{\underline w}f_i,\dot{\underline w}\rangle$ with $\dot{\underline w}=-\nabla\ell$; a constant PSD $H$ ⇒ $\underline e(t)=e^{-Ht}\underline e(0)$, so work in $H$'s eigenbasis; the factor $m$ inside the log pays for the $m$ eigen-summands; $H=JJ^\top$ ⇒ $\mathrm{rank}(H)\leq k$.

**⚠️ Watch out:** (ii) bound $\langle\underline e(0),v_i\rangle^2\leq\|\underline e(0)\|^2$ and split the budget $\epsilon/m$ per mode before taking the max; (iii) $k<m$ ⇒ rank-deficient $H$ ⇒ a genuine zero eigenvalue whose null-space residual *never* decays; (iv) overparameterization gives both $H\succ0$ *and* (NTK) $H(t)\approx H(0)$ — mention both.

## Q3 (20 pts) — Generalization bound for all weights from zeroed-coordinate classes (Lipschitz + union bound)
**Topics:** uniform-convergence, probability-tools, norm-bounds, lipschitz, structural-risk-minimization | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2
**Statement (English translation):**
For $k, d \in \mathbb{N}$, let $f : \mathbb{R}^k \times \mathbb{R}^d \to \mathbb{R}$ be a function representing a neural network, such that $f(\underline{w}, \underline{x})$ stands for network output when weights $= \underline{w}$ and input $= \underline{x}$. Assume that for some $\rho > 0$, $f(\cdot, \cdot)$ is $\rho$-Lipschitz in its first argument, i.e. $|f(\underline{w}_1, \underline{x}) - f(\underline{w}_2, \underline{x})| \leq \rho \cdot |\underline{w}_1 - \underline{w}_2|$, $\forall \underline{w}_1, \underline{w}_2 \in \mathbb{R}^k$, $\underline{x} \in \mathbb{R}^d$ (here $|\cdot|$ denotes the Euclidean norm). Let $\mathcal{D}$ be a distribution over $\mathbb{R}^d \times \mathbb{R}$, $S = \{(\underline{x}_i, y_i)\}_{i=1}^m$ be a training set drawn i.i.d. per $\mathcal{D}$, and

$$L_{\mathcal{D}}(\underline{w}) = \mathbb{E}_{(\underline{x}, y) \sim \mathcal{D}}\big[\,|y - f(\underline{w}, \underline{x})|\,\big] \quad\text{and}\quad L_S(\underline{w}) = \frac{1}{m}\sum\nolimits_{i=1}^m |y_i - f(\underline{w}, \underline{x}_i)|$$

be the corresponding population and empirical $\ell_1$ losses, respectively. For every $r \in [k]$, let $W_r := \{\underline{w} \in \mathbb{R}^k : (\underline{w})_r = 0\}$, and let $\Delta_r : \mathbb{N} \times (0,1) \to \mathbb{R}_{\geq 0}$ be a function for which $\forall \delta \in (0,1)$, w.p. $\geq 1 - \delta$ over $S$:

$$\forall \underline{w} \in W_r : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \Delta_r(m, \delta)$$

- **(10 pts)** For fixed $r \in [k]$, prove that $\forall \delta \in (0,1)$, w.p. $\geq 1 - \delta$ over $S$:
$$\forall \underline{w} \in \mathbb{R}^k : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \Delta_r(m, \delta) + 2\rho \cdot |(\underline{w})_r|$$
(the exam prints "$\Delta(m,\delta)$" here; from context this is $\Delta_r(m,\delta)$).
- **(10 pts)** Prove that $\forall \delta \in (0,1)$, w.p. $\geq 1 - \delta$ over $S$:
$$\forall \underline{w} \in \mathbb{R}^k : L_{\mathcal{D}}(\underline{w}) - L_S(\underline{w}) \leq \min_{r \in [k]}\left\{\Delta_r\left(m, \tfrac{\delta}{k}\right) + 2\rho \cdot |(\underline{w})_r|\right\}$$

**Solution sketch:**

**1. From $W_r$ to all weights**

**What is asked.** We are given a generalization bound $\Delta_r$ that holds only for weights whose $r$-th coordinate is zero. To prove that with the same probability a bound holds for all weights, with an added penalty $2\rho|(\underline{w})_r|$. The answer is a proof.

**Tool and why.** Projection onto the subclass and Lipschitz transfer (cheat sheet §10). Every $\underline{w}$ is close to a point of $W_r$, at distance exactly $|(\underline{w})_r|$, and Lipschitzness turns closeness of weights into closeness of losses, both for $L_{\mathcal D}$ and for $L_S$.

**Definitions.** For every $\underline{w}\in\mathbb{R}^k$ denote by $\tilde{\underline{w}}$ the vector obtained from $\underline{w}$ by zeroing coordinate $r$; this is the point of $W_r$ to which we transfer the bound. Denote by $E_r$ the event, of probability at least $1-\delta$, on which for every $\underline{w}'\in W_r$

$$L_{\mathcal D}(\underline{w}')-L_S(\underline{w}')\le\Delta_r(m,\delta)$$

Importantly, $E_r$ depends only on the sample $S$, not on $\underline{w}$.

**Solution.**

Step 1, the distance to the projection: $\tilde{\underline{w}}\in W_r$, and the difference $\underline{w}-\tilde{\underline{w}}$ is a vector with a single nonzero component, $(\underline{w})_r$ in position $r$. Hence

$$\|\underline{w}-\tilde{\underline{w}}\|=|(\underline{w})_r|$$

Step 2, Lipschitzness of the network: by assumption, for every $\underline{x}$

$$|f(\underline{w},\underline{x})-f(\tilde{\underline{w}},\underline{x})|\le\rho\,|(\underline{w})_r|$$

Step 3, the $\ell_1$ loss is 1-Lipschitz in the prediction: by the reverse triangle inequality, for every $y$ and any two numbers $a,b$ we have $\big||y-a|-|y-b|\big|\le|a-b|$. Plugging in the two predictions of step 2 gives, for every pair $(\underline{x},y)$:

$$\big|\,|y-f(\underline{w},\underline{x})|-|y-f(\tilde{\underline{w}},\underline{x})|\,\big|\le\rho\,|(\underline{w})_r|$$

Step 4, passing to the losses: an average, and also an expectation, of differences each bounded by $\rho|(\underline{w})_r|$ is bounded by the same number. Hence

$$|L_S(\underline{w})-L_S(\tilde{\underline{w}})|\le\rho|(\underline{w})_r|$$

and

$$|L_{\mathcal D}(\underline{w})-L_{\mathcal D}(\tilde{\underline{w}})|\le\rho|(\underline{w})_r|$$

Step 5, the bound on $W_r$: on the event $E_r$, and since $\tilde{\underline{w}}\in W_r$, we have

$$L_{\mathcal D}(\tilde{\underline{w}})-L_S(\tilde{\underline{w}})\le\Delta_r(m,\delta)$$

Step 6, chaining: bound $L_{\mathcal D}(\underline{w})$ from above and $L_S(\underline{w})$ from below by step 4, then use step 5:

$$\begin{aligned}L_{\mathcal D}(\underline{w})-L_S(\underline{w})&\le\big(L_{\mathcal D}(\tilde{\underline{w}})+\rho|(\underline{w})_r|\big)-\big(L_S(\tilde{\underline{w}})-\rho|(\underline{w})_r|\big)\\&=L_{\mathcal D}(\tilde{\underline{w}})-L_S(\tilde{\underline{w}})+2\rho|(\underline{w})_r|\\&\le\Delta_r(m,\delta)+2\rho|(\underline{w})_r|\end{aligned}$$

Step 7, "for every $\underline{w}$" with one probability: the event $E_r$ is fixed before $\underline{w}$ is chosen, and steps 1 to 6 hold on $E_r$ for every $\underline{w}$. Hence with probability at least $1-\delta$ the bound holds for all $\underline{w}\in\mathbb{R}^k$ simultaneously.

**In words.** Every weight vector is "a weight vector of $W_r$ plus a small shift in one coordinate". The shift changes each loss by at most $\rho|(\underline{w})_r|$, and we pay for it twice: once on the population loss and once on the empirical loss.

**Sanity check.** If $\underline{w}\in W_r$, then $(\underline{w})_r=0$, the penalty vanishes, and we recover exactly the assumption on $\Delta_r$. The penalty grows linearly in $|(\underline{w})_r|$, as expected from Lipschitzness.

**What to write in the exam.**

- Define $\tilde{\underline{w}}$ by zeroing coordinate $r$; then $\tilde{\underline{w}}\in W_r$ and the distance is $|(\underline{w})_r|$.
- Lipschitzness of $f$ and the reverse triangle inequality give a difference of at most $\rho|(\underline{w})_r|$ in every pointwise loss.
- Hence both $L_S$ and $L_{\mathcal D}$ move by at most $\rho|(\underline{w})_r|$.
- On the bound event of $W_r$, chain and obtain $\Delta_r(m,\delta)+2\rho|(\underline{w})_r|$, for every $\underline{w}$.

*Verified: in q3.py, over 5000 random trials with $f=\rho\sin(\langle\underline{w},\underline{x}\rangle/\|\underline{x}\|)$, the difference $|L_S(\underline{w})-L_S(\tilde{\underline{w}})|$ never exceeded $\rho|(\underline{w})_r|$ (maximum ratio 0.498), and over 300 trials of the chain, with $L_{\mathcal D}$ estimated from 20000 samples, no violation was found.*

**2. Union over the coordinates and a minimum**

**What is asked.** To prove that with probability at least $1-\delta$ the generalization gap of every $\underline{w}$ is bounded by the minimum over $r$ of the bounds of part 1, each computed with $\delta/k$. The answer is a proof.

**Tool and why.** A union bound (cheat sheet §2), in the spirit of SRM. Part 1 gives $k$ bounds, each on a different event; to pick the best bound for every $\underline{w}$, all $k$ events must hold together, and the union bound guarantees this if $\delta$ is split among them.

**Definitions.** For every $r\in[k]$ denote by $E'_r$ the event of part 1 with confidence parameter $\delta/k$. On this event, for every $\underline{w}$, the gap is bounded by

$$B_r(\underline{w}):=\Delta_r\big(m,\tfrac{\delta}{k}\big)+2\rho|(\underline{w})_r|$$

Denote by $E$ the intersection of $E'_1,\ldots,E'_k$, the event on which all the bounds hold together.

**Solution.**

Step 1, applying part 1: $\delta/k\in(0,1)$ since $k\ge1$, so part 1 applies with $\delta/k$ and gives, for every $r$, $\Pr\big((E'_r)^c\big)\le\delta/k$.

Step 2, union bound: the complement of $E$ is the union of the complements, so

$$\begin{aligned}\Pr\Big(\bigcup_{r=1}^{k}(E'_r)^c\Big)&\le\sum_{r=1}^{k}\Pr\big((E'_r)^c\big)\\&\le k\cdot\frac{\delta}{k}\\&=\delta\end{aligned}$$

that is, $\Pr(E)\ge1-\delta$.

Step 3, a minimum on the joint event: on $E$, for every $\underline{w}$, the gap $L_{\mathcal D}(\underline{w})-L_S(\underline{w})$ is bounded by each of the $k$ numbers $B_r(\underline{w})$, hence also by the smallest of them.

Step 4, why $r$ may be chosen after seeing $\underline{w}$: the minimizing $r$ depends on $\underline{w}$, and through $\underline{w}$ possibly on $S$. This is allowed only because on $E$ all $k$ bounds hold simultaneously; so the choice never "uses" an event that may not have occurred.

Step 5, conclusion: with probability at least $1-\delta$, for every $\underline{w}\in\mathbb{R}^k$, the gap is bounded by $\min_{r\in[k]}B_r(\underline{w})$, as required.

**In words.** We pay a small price, confidence $\delta/k$ instead of $\delta$ in each of the $k$ bounds, and in return we get the right to pick, for every hypothesis, the coordinate that is cheapest to zero out. This is exactly the idea of nonuniform learning and SRM.

**Sanity check.** For $k=1$ the bound is exactly the bound of part 1. For example, if $k=2$, $\rho=1$, $\underline{w}=(0.01,3)$ and both $\Delta_r$ equal the same $\Delta$, then the two bounds are $\Delta+0.02$ and $\Delta+6$, and the minimum chooses to zero out the first, small coordinate.

**What to write in the exam.**

- Apply part 1 to every $r\in[k]$ with $\delta/k$.
- By a union bound, all $k$ events hold together with probability at least $1-\delta$.
- On the joint event all the bounds hold for every $\underline{w}$, hence so does their minimum.

*Verified: in q3.py, with $k=4$ and $\delta=0.1$ and disjoint failure events, the worst case for the union bound, a million draws gave probability 0.89999 that all events hold, i.e. the bound $1-\delta$ is attained and not violated.*

**Common mistakes.**

- Writing $|L(\underline{w})-L(\tilde{\underline{w}})|\le\rho|(\underline{w})_r|$ without arguing that the $\ell_1$ loss is 1-Lipschitz in the prediction; Lipschitzness of the network alone is not enough.
- Counting the penalty only once, $\rho$ instead of $2\rho$, forgetting that both $L_{\mathcal D}$ and $L_S$ move.
- In part 2, taking the minimum over $r$ with each bound computed at $\delta$, without a union bound; then the probability that all hold can drop to $1-k\delta$.

**💡 Useful tricks:** Project $\underline w$ into $W_r$ by zeroing coordinate $r$ (distance $=|(\underline w)_r|$), then Lipschitz-transfer; the $\ell_1$ loss is $1$-Lipschitz in the prediction (reverse triangle inequality), so it composes with the network's $\rho$-Lipschitzness to give $2\rho|(\underline w)_r|$; union over the $k$ coordinate-classes with $\delta/k$ each ⇒ take $\min_r$.

**⚠️ Watch out:** the transfer is $2\rho|(\underline w)_r|$ — paid on both $L_D$ and $L_S$; you must invoke that $|y-\cdot|$ is $1$-Lipschitz to chain the losses; (ii) the union costs $\delta/k$ per class, and only *afterwards* may you minimize over $r$ (the min is over a simultaneously-valid family).
