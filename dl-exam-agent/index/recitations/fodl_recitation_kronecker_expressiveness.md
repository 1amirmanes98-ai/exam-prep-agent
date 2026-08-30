# Recitation: Kronecker Product + Expressiveness Exercises (Recitation 4)
- **File:** materials/recitations/fodl_recitation_kronecker_expressiveness.pdf
- **Related lectures:** lecture_02_expressiveness (tensor decompositions, universality, expressive efficiency, separation rank)
- **Summary:** Tooling and exercises supporting the expressiveness lectures. First half builds the Kronecker product toolbox: definition with a worked numeric example, bilinearity/associativity, the mixed-product property, transpose/inverse rules, the SVD of a Kronecker product, and multiplicativity of rank — the exact facts used to prove depth-efficiency lower bounds for convolutional arithmetic circuits (via matricizations). Second half has expressiveness exercises: ReLU and LeakyReLU neurons can each be written as linear combinations of the other (so all class results transfer between the activations), and an analysis of the CP tensor decomposition under the symmetry constraint $a^{z,1}=\dots=a^{z,N}$ — which corresponds to weight sharing in the associated network, destroys universality (only permutation-invariant tensors are expressible), and for $N=2$ yields exactly the symmetric matrices.

## Topics covered
- Kronecker product $A \odot B$: definition (block matrix $[a_{ij}B]$) and a $2\times3$-by-$2\times2$ numeric example (note: this course uses $\odot$ for Kronecker product and $\otimes$ for outer/tensor product)
- Properties: bilinearity, associativity, $A \odot 0 = 0$, mixed product, transpose, inverse
- SVD of $A \odot B$ and the resulting singular values; rank multiplicativity
- ReLU vs. LeakyReLU: mutual expressibility via linear combinations of 2 neurons
- CP tensor decomposition with shared (symmetric) factors: effect on the corresponding network, universality, and the $N=2$ characterization

## Worked problems / derivations
**P1.** Prove $(A \odot B)^{-1} = A^{-1} \odot B^{-1}$ for invertible $A, B$.
Technique: mixed product property: $(A\odot B)(A^{-1}\odot B^{-1}) = (AA^{-1})\odot(BB^{-1}) = I \odot I = I$.

**P2.** SVD and rank of a Kronecker product: given SVDs $A = U_A\Sigma_A V_A^\top$, $B = U_B\Sigma_B V_B^\top$, show the SVD of $A\odot B$ is $U = U_A \odot U_B$, $\Sigma = \Sigma_A \odot \Sigma_B$, $V = V_A \odot V_B$, and deduce $\operatorname{rank}(A\odot B) = \operatorname{rank}(A)\cdot\operatorname{rank}(B)$.
Technique: mixed product shows $U, V$ are orthogonal and the factorization holds; singular values are all products $\sigma_i(A)\sigma_j(B)$, so counting nonzero singular values gives the rank identity.

**P3.** Express a LeakyReLU neuron by ReLU neurons: for $f(x) = \sigma_a(\langle w,x\rangle + b)$, with $g_1(x) = \sigma(\langle w,x\rangle+b)$ and $g_2(x) = \sigma(-(\langle w,x\rangle+b))$, show $f = g_1 - a\, g_2$.
Technique: case analysis on the sign of $z = \langle w,x\rangle + b$ ($z>0$: $g_1 = z, g_2 = 0$; $z<0$: $g_1 = 0, -a g_2 = az$; $z=0$: both zero).

**P4.** Express a ReLU neuron by LeakyReLU neurons: with $g_1(x)=\sigma_a(\langle w,x\rangle+b)$, $g_2(x)=\sigma_a(-(\langle w,x\rangle+b))$, find $\beta,\gamma$ with $\sigma(\langle w,x\rangle+b) = \beta g_1 + \gamma g_2$.
Technique: matching coefficients on $z>0$ gives $\beta - \gamma a = 1$; on $z<0$ gives $\beta a - \gamma = 0$; solving yields $\gamma = \frac{a}{1-a^2}$, $\beta = 1 + \frac{a^2}{1-a^2} = \frac{1}{1-a^2}$. (The slide's printed $\beta$ has a sign typo; these values satisfy both equations.)

**P5.** CP decomposition $\mathcal{A} = \sum_{z=1}^{Z} a_z \cdot \otimes_{n=1}^{N} a^{z,n}$ under the constraint $a^{z,1} = \dots = a^{z,N}$ for all $z$:
- (Q1) Effect on the corresponding network: the (1×1 conv) layers have weight sharing — filters in the same channel are equal.
- (Q2) Universality: fails for every $M, N \ge 2$; only tensors invariant under mode permutations ($\mathcal{A}_{i_1,\dots,i_N} = \mathcal{A}_{\pi(i_1),\dots,\pi(i_N)}$) are expressible, so e.g. $e_2 \otimes e_1 \otimes \dots \otimes e_1$ cannot be represented or approximated.
- (Q3) For $N=2$ and unconstrained $Z$: the expressible class is exactly the symmetric matrices $\mathcal{S} = \{A \in \mathbb{R}^{M,M} : A = A^\top\}$.
Technique: symmetry of the summands forces permutation invariance; conversely for $N=2$ use the eigendecomposition $A = UDU^\top = \sum_{i=1}^M \lambda_i U_i \otimes U_i$ (a constrained CP decomposition), and any $\sum_z a_z\, a^z (a^z)^\top$ is symmetric.

## Key formulas & facts
- Definition: for $A \in \mathbb{R}^{m,n}, B \in \mathbb{R}^{p,q}$: $A \odot B := \begin{pmatrix} a_{11}B & \cdots & a_{1n}B \\ \vdots & \ddots & \vdots \\ a_{m1}B & \cdots & a_{mn}B\end{pmatrix} \in \mathbb{R}^{mp,nq}$.
- Bilinearity/associativity: $A\odot(B+C) = A\odot B + A\odot C$; $(\alpha A)\odot B = A\odot(\alpha B) = \alpha(A\odot B)$; $(A\odot B)\odot C = A\odot(B\odot C)$; $A \odot 0 = 0$.
- Mixed product: $(A\odot B)(C\odot D) = (AC)\odot(BD)$ (dimensions compatible).
- Transpose / inverse: $(A\odot B)^\top = A^\top \odot B^\top$; $(A\odot B)^{-1} = A^{-1}\odot B^{-1}$.
- SVD: $A\odot B = (U_A\odot U_B)(\Sigma_A\odot\Sigma_B)(V_A\odot V_B)^\top$; singular values $\{\sigma_i(A)\sigma_j(B)\}$.
- Rank multiplicativity: $\operatorname{rank}(A\odot B) = \operatorname{rank}(A)\cdot\operatorname{rank}(B)$.
- Activations: $\operatorname{ReLU}(z) = \sigma(z) = \max\{0,z\}$; $\operatorname{LeakyReLU}(z;a) = \sigma_a(z) = \max\{a z, z\}$, $a \in (0,1)$.
- Conversions: $\sigma_a(z) = \sigma(z) - a\,\sigma(-z)$; $\;\sigma(z) = \frac{1}{1-a^2}\sigma_a(z) + \frac{a}{1-a^2}\sigma_a(-z)$.
- CP decomposition: $\mathcal{A} = \sum_{z=1}^Z a_z \cdot \otimes_{n=1}^N a^{z,n}$, $a_z \in \mathbb{R}$, $a^{z,n} \in \mathbb{R}^M$.

## Exam-relevant nuggets
- Rank multiplicativity of the Kronecker product is *the* engine behind depth-efficiency lower bounds for convolutional arithmetic circuits (via the "matricization of outer product = Kronecker product of matricizations" lemma, proved in hw_expressiveness) — expect to cite or reuse it.
- ReLU$\leftrightarrow$LeakyReLU conversion is directly exam-tested: past exams (Term B 2022, example exam) ask to redo class results with leaky ReLU; hw_expressiveness P1.3 does the same. Memorize both two-neuron identities.
- Symmetric/shared-factor CP decomposition connects weight sharing to loss of universality — a compact conceptual question; separation-rank material of this lecture block appeared in exam Term A 2022.
- Watch notation: in this course $\odot$ = Kronecker product, $\otimes$ = outer (tensor) product; many textbooks use $\otimes$ for Kronecker.
- The SVD-of-Kronecker fact gives instant answers to questions about singular values/norms of $A \odot B$ (e.g., $\|A\odot B\|_{2} = \|A\|_2\|B\|_2$).
