# Mock Exam 2 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_02.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-07-06 (Q1.3: rank-$R$ error of $I_M$ $= M{-}R$ exactly for
$M \in \{3,5,8\}$, GD from random init never beats it; Q2: ODE vs spectral solution
agree to 1e-15, kernel components frozen to 1e-14, time-varying decay bound holds with
ratio $\le 0.9973$; Q3: Monte-Carlo $R(\mathcal{H}_B \circ S)$ $\approx$ 0.40–0.48 of
the Massart bound for $(d,N) \in \{(5,10),(20,15),(3,40)\}$).

## Q1 — Product-pooling networks and matrix rank (40)

**Full solution:**

**1. (10) The class is exactly the matrices of rank at most $R$**

**What is asked.** Prove that $\mathcal{H}_R$ is the set of all $M\times M$ matrices whose rank is at most $R$, by proving both inclusions. The answer is a proof.

**Tool and why.** Rank facts from linear algebra (cheat sheet §3), applied to the CP view of the shallow product-pooling network (cheat sheet §6). For $\subseteq$ we only need that an outer product has rank at most one plus the subadditivity reminder. For $\supseteq$ we must actually build a network, and the natural building blocks are the vectors of a basis of the column space: every column is a combination of them, and the combination coefficients become the second filter.

**Definitions.** For a matrix $F$, $F_{:,j}$ is its $j$-th column. Let $k:=\operatorname{rank}(F)$. When $k\ge1$, let $u_1,\dots,u_k$ be a basis of the column space of $F$, and let $\beta_{ij}$ be the coefficient of $u_i$ when column $j$ is written in this basis. We introduce them because they turn "rank $k$" into an explicit sum of $k$ outer products.

**Solution.**

Step 1, every term has rank at most one: the $j$-th column of $c_r\varphi^r(\psi^r)^\top$ is $c_r\psi^r_j\,\varphi^r$, a multiple of $\varphi^r$. So the column space of the term lies in the span of the single vector $\varphi^r$, whose dimension is at most one.

Step 2, subadditivity: applying the reminder repeatedly (once per added term),

$$\operatorname{rank}\Big(\sum_{r=1}^R c_r\varphi^r(\psi^r)^\top\Big)\le\sum_{r=1}^R\operatorname{rank}\big(c_r\varphi^r(\psi^r)^\top\big)\le R.$$

The second inequality is Step 1. Hence every matrix of $\mathcal{H}_R$ has rank at most $R$, which is the inclusion $\subseteq$.

Step 3, the inclusion $\supseteq$ when $k=0$: then $F=0$, and choosing all $c_r=0$ realizes it, so $F\in\mathcal{H}_R$.

Step 4, expanding the columns when $k\ge1$: each column of $F$ lies in the column space, so it is a combination of the basis,

$$F_{:,j}=\sum_{i=1}^k\beta_{ij}u_i,\qquad j\in[M].$$

Step 5, the second filters: set $\psi^i:=(\beta_{i1},\dots,\beta_{iM})^\top$. Entry $(p,j)$ of the sum of outer products is then

$$\begin{aligned}
\Big(\sum_{i=1}^k u_i(\psi^i)^\top\Big)_{pj}&=\sum_{i=1}^k(u_i)_p\,\psi^i_j\\
&=\sum_{i=1}^k\beta_{ij}(u_i)_p\\
&=(F_{:,j})_p\\
&=F_{pj}.
\end{aligned}$$

The first row is the definition of an outer product, the second the definition of $\psi^i$, the third is Step 4 read at coordinate $p$. So $F$ is a sum of $k$ outer products.

Step 6, padding to width exactly $R$: for $i\le k$ take $c_i=1$ and $\varphi^i=u_i$; for the remaining indices $i$, from $k+1$ to $R$, take $c_i=0$ and arbitrary filters. This uses $k\le R$, so that there are enough units. The network realizes $F$, so $F\in\mathcal{H}_R$. Together with Step 2:

$$\boxed{\mathcal{H}_R=\{F\in\mathbb{R}^{M\times M}:\operatorname{rank}(F)\le R\}}$$

An equally valid construction for $\supseteq$ is the SVD $F=\sum_{i=1}^k\sigma_iu_iv_i^\top$ with $c_i=\sigma_i$, $\varphi^i=u_i$, $\psi^i=v_i$.

**In words.** A width-$R$ product-pooling network writes its lookup table as $R$ rank-one patterns added together. A table of rank $k$ is built from exactly $k$ such patterns, one per direction of its column space, so the network can produce it if and only if it has at least $k$ units.

**Sanity check.** For $R=1$ the class is $\{c\,\varphi\psi^\top\}$. The matrix $\begin{pmatrix}1&2\\2&4\end{pmatrix}$ has rank one and indeed equals $(1,2)^\top(1,2)$, while $I_2$ has rank two and should not be in $\mathcal{H}_1$; part 2 confirms this.

**What to write in the exam.**

- Inclusion $\subseteq$: each $c_r\varphi^r(\psi^r)^\top$ has columns that are multiples of $\varphi^r$, so rank at most one; subadditivity gives rank at most $R$.
- Inclusion $\supseteq$: with $k:=\operatorname{rank}(F)$, expand $F_{:,j}=\sum_i\beta_{ij}u_i$ in a basis of the column space.
- Then $F=\sum_{i=1}^k u_i(\psi^i)^\top$ with $\psi^i_j:=\beta_{ij}$; take $c_i=1$, $\varphi^i=u_i$, and pad with $c_i=0$ up to width $R$.
- Case $F=0$: all $c_r=0$.

**Rubric.** $\subseteq$ 4 pts (rank one: 1, subadditivity: 3). $\supseteq$ 6 pts. The SVD construction earns full credit. Deduct 2 if padding to width exactly $R$ or absorbing scalars is never addressed; deduct all 6 if $\supseteq$ is only asserted ("rank at most $R$ means $R$ outer products") without a construction.

*Verified: in Python, random rank-$k$ matrices for $M\le7$ and every $k$ were rebuilt from a column-space basis to 1e-12, random width-$R$ sums never exceeded rank $R$, and one exact sympy example was reconstructed.*

**2. (10) Universal if and only if $R\ge M$**

**What is asked.** Two directions. (i) For $R\ge M$: every matrix is in $\mathcal{H}_R$, with an explicit width-$M$ assignment. (ii) For $R<M$: a concrete matrix outside $\mathcal{H}_R$, with proof. The answer is a proof plus an explicit construction and a witness.

**Tool and why.** Part 1 turns membership into a rank condition (cheat sheet §3), and universality is the definition from class (cheat sheet §4). For the explicit assignment we expand by rows with one-hot first filters, which needs no basis computation. The witness is the identity matrix, the standard full-rank example of the course (cheat sheet §6).

**Definitions.** $\mathbf{e}^i$ is the $i$-th standard basis vector of $\mathbb{R}^M$, as in the statement, and $F_{i,:}$ is the $i$-th row of $F$. No other new notation.

**Solution.**

Part (i).

Step 1, every matrix has rank at most $M$: $F$ has $M$ columns, so its column space is spanned by $M$ vectors and $\operatorname{rank}(F)\le M$. Since $M\le R$, also $\operatorname{rank}(F)\le R$, and part 1 gives $F\in\mathcal{H}_R$. Hence $\mathcal{H}_R$ is all of $\mathbb{R}^{M\times M}$.

Step 2, an explicit width-$M$ network: take $c_i=1$, $\varphi^i=\mathbf{e}^i$ and $\psi^i=(F_{i,1},\dots,F_{i,M})^\top$, the $i$-th row. Entry $(p,j)$ of $\mathbf{e}^i(\psi^i)^\top$ is $(\mathbf{e}^i)_p F_{ij}$, which is $F_{ij}$ when $p=i$ and $0$ otherwise. Summing over $i$ leaves only the term $i=p$:

$$\Big(\sum_{i=1}^M\mathbf{e}^i(\psi^i)^\top\Big)_{pj}=F_{pj}.$$

So the sum equals $F$. In network terms, unit $i$ fires only when $d_1=i$ and then outputs $F_{i,d_2}$. For $R>M$ pad with $c_i=0$.

Part (ii).

Step 3, the witness has full rank: the columns of $I_M$ are $\mathbf{e}^1,\dots,\mathbf{e}^M$. A combination $\sum_i a_i\mathbf{e}^i$ is the vector $(a_1,\dots,a_M)^\top$, which is zero only if all $a_i=0$. So the columns are linearly independent and $\operatorname{rank}(I_M)=M$.

Step 4, the witness is outside the class: if $R<M$ then $\operatorname{rank}(I_M)>R$, so by part 1 $I_M\notin\mathcal{H}_R$. In function terms, the equality table $\mathbb{1}[d_1=d_2]$ is not realizable.

Step 5, conclusion: by (i) the class is universal when $R\ge M$, and by (ii) it is not when $R<M$:

$$\boxed{\mathcal{H}_R=\mathbb{R}^{M\times M}\iff R\ge M}$$

**In words.** Each hidden unit contributes one direction. The equality function needs $M$ independent directions, one per value of $d_1$, so no width below $M$ can serve every target. The class construction for universality (Prop 5, Lecture 2) uses $M^N=M^2$ one-hot terms; for $N=2$ the rank argument shows $M$ terms suffice and, by (ii), no fewer.

**Sanity check.** Take $M=2$ and $R=1$. Every rank-one matrix $\varphi\psi^\top$ has determinant

$$\varphi_1\psi_1\cdot\varphi_2\psi_2-\varphi_1\psi_2\cdot\varphi_2\psi_1=0,$$

while $\det I_2=1$, so indeed $I_2\notin\mathcal{H}_1$.

**What to write in the exam.**

- For $R\ge M$: every $F$ has rank at most $M$, hence at most $R$, so $F\in\mathcal{H}_R$ by part 1.
- Explicit: $c_i=1$, $\varphi^i=\mathbf{e}^i$, $\psi^i$ the $i$-th row of $F$; entry $(p,j)$ of the sum is $F_{pj}$.
- For $R<M$: the columns of $I_M$ are independent, so its rank is $M$, which exceeds $R$; by part 1 $I_M\notin\mathcal{H}_R$.
- Hence universal if and only if $R\ge M$.

**Rubric.** (i) 5 pts: rank argument 2, explicit assignment 3. (ii) 5 pts: $\operatorname{rank}(I_M)=M$ proved 2 (invertibility or $\det I_M=1$ also fine), $I_M\notin\mathcal{H}_R$ via part 1 2, explicit iff conclusion 1. Any other witness is accepted with a full-rank proof.

*Verified: in Python, the row assignment rebuilt random $F$ exactly for $M$ from $2$ to $8$, and $\operatorname{rank}(I_M)=M$ was checked numerically.*

**3. (10) Best rank-$R$ approximation of the identity**

**What is asked.** Show that the smallest squared Frobenius distance from $\mathcal{H}_R$ to $I_M$ is $M-R$, exhibit a minimizer, and deduce a lower bound on the width. The answer is a number with proof, a matrix, and an inequality.

**Tool and why.** Part 1 replaces the network class by the set of matrices of rank at most $R$, and then Eckart–Young–Mirsky gives the best low-rank error directly from singular values (cheat sheet §3). This is the inapproximability argument of Lecture 2 §2.5 with $M^{N/2}$ replaced by $M$ (cheat sheet §6).

**Definitions.** $\sigma_i(I_M)$ are the singular values of $I_M$. $F^\star$ is our candidate minimizer, defined in Step 4.

**Solution.**

Step 1, from networks to matrices: by part 1 the two sets coincide, so

$$\min_{F\in\mathcal{H}_R}\|F-I_M\|_F^2=\min_{\operatorname{rank}(W)\le R}\|W-I_M\|_F^2.$$

Step 2, singular values of $I_M$: they are the square roots of the eigenvalues of $I_M^\top I_M=I_M$, and all those eigenvalues are $1$. So $\sigma_i(I_M)=1$ for every $i$. (Equivalently, $I_M=I\cdot I\cdot I$ is already an SVD.)

Step 3, Eckart–Young–Mirsky with $A=I_M$, square size $M$ and $r=R$, which is allowed because $R\le M-1$:

$$\begin{aligned}
\min_{\operatorname{rank}(W)\le R}\|W-I_M\|_F^2&=\sum_{i=R+1}^{M}\sigma_i(I_M)\\
&=\sum_{i=R+1}^{M}1\\
&=M-R.
\end{aligned}$$

The course-printed form has $\sigma_i(A)$ where the classical theorem has $\sigma_i(A)^2$; here every $\sigma_i$ equals $1$, so both forms give $M-R$.

Step 4, a matrix that attains the minimum:

$$F^\star=\sum_{i=1}^R\mathbf{e}^i(\mathbf{e}^i)^\top$$

This is the diagonal matrix with $R$ ones followed by $M-R$ zeros. Its rank is $R$, so $F^\star\in\mathcal{H}_R$ (network: $c_i=1$, $\varphi^i=\mathbf{e}^i$ and $\psi^i=\mathbf{e}^i$). The difference $F^\star-I_M$ is diagonal with $M-R$ entries equal to $-1$ and zeros elsewhere, so $\|F^\star-I_M\|_F^2=M-R$, which is the minimum. Any $\sum_{i=1}^R w_iw_i^\top$ with orthonormal $w_i$ also works.

Step 5, consequence for the width: every $h\in\mathcal{H}_R$ satisfies $D(h,\mathrm{identity})^2\ge M-R$ by Steps 1 and 3. If moreover $D(h,\mathrm{identity})\le\epsilon$, then

$$\begin{aligned}
M-R&\le D(h,\mathrm{identity})^2\\
&\le\epsilon^2,
\end{aligned}$$

and rearranging gives

$$\boxed{R\ge M-\epsilon^2}$$

**In words.** The identity has $M$ equally strong directions. A rank-$R$ matrix can capture at most $R$ of them, and each direction it misses costs exactly $1$ in squared Frobenius distance.

**Sanity check.** For $R=0$ the only matrix is $0$, and $\|0-I_M\|_F^2=M$, matching $M-R$. For $\epsilon<1$ the bound forces $R>M-1$, that is $R=M$: no narrower network gets within distance $1$ of the equality table.

**What to write in the exam.**

- By part 1, minimizing over $\mathcal{H}_R$ is minimizing over matrices of rank at most $R$.
- All singular values of $I_M$ equal $1$, so EYM gives $\sum_{i=R+1}^M 1=M-R$.
- Minimizer: $F^\star=\sum_{i=1}^R\mathbf{e}^i(\mathbf{e}^i)^\top$, rank $R$, error $M-R$.
- If $D\le\epsilon$ then $M-R\le\epsilon^2$, so $R\ge M-\epsilon^2$.

**Rubric.** Singular values of $I_M$ 2 pts; part 1 plus EYM as stated 4 pts (no penalty for either the $\sigma_i$ or the $\sigma_i^2$ form here, but mishandling general $\sigma_i^2$ elsewhere is an error); explicit minimizer 2 pts; width conclusion 2 pts.

*Verified: in Python, the truncated SVD of $I_M$ and $F^\star$ both give error exactly $M-R$ for $M\in\{3,5,8\}$ and every $R$, gradient descent on random rank-$R$ factorizations never went below it, and sympy confirmed $\|F^\star-I_4\|_F^2=2$ for $R=2$.*

**4. (10) Weight sharing gives the symmetric matrices, and the PSD ones when $c\ge0$**

**What is asked.** (i) Show that the union over all widths of $\mathcal{H}^{\mathrm{sym}}_R$ is the set of symmetric matrices, and that width $M$ already gives all of them. (ii) Characterize the matrices expressible when all $c_r\ge0$, and prove it. The answer is two set equalities with proofs.

**Tool and why.** The spectral theorem for real symmetric matrices (cheat sheet §3) writes every symmetric matrix as exactly the kind of sum the network produces, $\sum\lambda_iv_iv_i^\top$. For (ii) the quadratic form $x^\top Fx$ is the natural test, because each term contributes $c_r\langle\varphi^r,x\rangle^2$.

**Definitions.** $\mathcal{S}_M$ is the set of symmetric $M\times M$ matrices, those with $F^\top=F$. A matrix is positive semidefinite (PSD) if it is symmetric and $x^\top Fx\ge0$ for every $x\in\mathbb{R}^M$; $\mathcal{S}_M^+$ is the set of PSD matrices. We introduce the two names only to state the results briefly.

**Solution.**

Part (i).

Step 1, every network matrix is symmetric: since $(ab^\top)^\top=ba^\top$, each term satisfies

$$\big(c_r\varphi^r(\varphi^r)^\top\big)^\top=c_r\varphi^r(\varphi^r)^\top,$$

and a sum of symmetric matrices is symmetric. This holds for every width $R$, so the union over $R$ is contained in $\mathcal{S}_M$.

Step 2, spectral theorem: a symmetric $F$ can be written $F=\sum_{i=1}^M\lambda_iv_iv_i^\top$ with orthonormal $v_i$ and real $\lambda_i$.

Step 3, the network: take $c_i=\lambda_i$ and $\varphi^i=v_i$. Then $F\in\mathcal{H}^{\mathrm{sym}}_M$. Negative eigenvalues cause no problem, because $c\in\mathbb{R}^M$ may carry the sign; this is exactly where unconstrained output weights are needed.

Step 4, putting it together: Step 3 shows that $\mathcal{S}_M$ is contained in $\mathcal{H}^{\mathrm{sym}}_M$, which is one term of the union, and Step 1 shows that the union lies in $\mathcal{S}_M$. All three sets are therefore equal:

$$\boxed{\bigcup_{R}\mathcal{H}^{\mathrm{sym}}_R=\mathcal{H}^{\mathrm{sym}}_M=\mathcal{S}_M}$$

Part (ii).

Step 5, the claim: with $c_r\ge0$ and arbitrary width, the expressible matrices are exactly the PSD matrices $\mathcal{S}_M^+$.

Step 6, every such network matrix is PSD: it is symmetric by Step 1, and for every $x$,

$$x^\top\Big(\sum_r c_r\varphi^r(\varphi^r)^\top\Big)x=\sum_r c_r\langle\varphi^r,x\rangle^2\ge0,$$

because each $c_r\ge0$ and each square is non-negative.

Step 7, every PSD matrix is expressible: write the spectral decomposition of Step 2. For each $i$, using $Fv_i=\lambda_iv_i$ and $\|v_i\|=1$, we get $\lambda_i=v_i^\top Fv_i$, which is non-negative because $F$ is PSD. So the construction of Step 3 now has $c_i=\lambda_i$, and these weights are non-negative, with width $M$.

Step 8, conclusion: the class with non-negative output weights is

$$\boxed{\mathcal{S}_M^+=\{F:F^\top=F,\ x^\top Fx\ge0\ \forall x\}}$$

and width $M$ already suffices.

**In words.** Sharing one filter between the two positions makes the output unchanged when $d_1$ and $d_2$ are swapped, so the table is symmetric. A signed output weight lets the network subtract patterns; without subtraction it can only add squares, and sums of squares are exactly the PSD matrices.

**Sanity check.** The matrix $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ has non-negative entries but eigenvalues $1$ and $-1$; with $x=(1,-1)^\top$ its quadratic form is $-2$, so it is not expressible with $c\ge0$. Conversely

$$\begin{pmatrix}1&-1\\-1&1\end{pmatrix}=(1,-1)^\top(1,-1)$$

has negative entries yet is realized with $R=1$ and $c_1=1$. So "non-negative entries" is the wrong characterization in both directions.

**What to write in the exam.**

- Each term $c_r\varphi^r(\varphi^r)^\top$ is symmetric, so every network matrix is symmetric, for every width.
- Spectral theorem: $F=\sum_{i=1}^M\lambda_iv_iv_i^\top$; take $c_i=\lambda_i$, $\varphi^i=v_i$, width $M$; the sign of $\lambda_i$ goes into $c_i$.
- With $c_r\ge0$: the form $x^\top Fx$ equals $\sum_rc_r\langle\varphi^r,x\rangle^2$, which is non-negative, so the matrix is PSD.
- Conversely a PSD matrix has all $\lambda_i\ge0$, so the spectral construction has $c_i\ge0$; the class is the PSD matrices.

**Rubric.** (i) 6 pts: $\subseteq$ 2 (for every width), $\supseteq$ via the spectral theorem 4. (ii) 4 pts: correct characterization 1, $\subseteq$ 1.5, $\supseteq$ 1.5. Answering "matrices with non-negative entries" gets 0 for the characterization. (Mirrors the $N=2$ symmetric characterization of Exam 2020 Moed B, Q1.)

*Verified: in Python, the spectral construction rebuilt random symmetric and random PSD matrices for $M$ from $2$ to $6$, random networks with $c\ge0$ always gave a smallest eigenvalue at least $-10^{-10}$, and sympy gave the eigenvalues of both $2\times2$ examples.*

**Common mistakes.**

- Proving only one inclusion in part 1, or asserting $\supseteq$ without building the filters; the construction from a column-space basis (or the SVD) is the whole point.
- In part 3, forgetting to compute $\sigma_i(I_M)=1$ or to exhibit a matrix that attains the minimum; without the attaining matrix you only have a lower bound.
- In part 4(ii), answering "non-negative entries" instead of PSD; the $2\times2$ examples above refute it in both directions.

**💡 Useful tricks:** Product-pooling width-$R$ = rank-$\leq R$ matrices (rank subadditivity one way, column-space basis construction the other); universal iff $R\geq M$, with $I_M$ the full-rank witness; EYM gives $\min$ error $M-R$; the symmetric weight-sharing constraint yields exactly the symmetric matrices (spectral theorem, sign carried by $c_r\in\mathbb R$), and $c_r\geq0$ restricts to PSD.

**⚠️ Watch out:** (1) prove BOTH inclusions *with a construction* — "rank $\leq R$ means $R$ outer products" is not a proof; (3) here $\sigma_i(I_M)=1$ so the class-printed EYM ($\sigma_i$) and classical ($\sigma_i^2$) coincide — but mind $\sigma_i^2$ in general; (4) the answer is PSD (not "non-negative entries"), and allowing $c\in\mathbb R$ is what makes the symmetric case work.

## Q2 — Prediction dynamics under a (time-varying) kernel (35)

**Full solution:**

**1. (8) Linear model: a constant kernel $H=\Phi\Phi^\top$**

**What is asked.** Derive the gradient of the loss, show that the train predictions obey $\dot u=-H(u-y)$ with $H=\Phi\Phi^\top$ independent of time, and show that $H$ is a symmetric PSD Gram matrix. The answer is a derivation.

**Tool and why.** Gradient flow and the chain rule (cheat sheet §7), lifted from weight space to prediction space as in Lemma 1 of Lecture 5 (cheat sheet §9). The model is linear in $w$, so the Jacobian of the predictions is the constant matrix $\Phi$, and that is why the kernel cannot change.

**Definitions.** Let $r(w):=\Phi w-y$ be the residual vector, introduced only to shorten the loss to $\ell(w)=\tfrac12r^\top r$.

**Solution.**

Step 1, expanding the loss along a direction: for any direction $\delta\in\mathbb{R}^k$ and scalar $s$,

$$\ell(w+s\delta)=\tfrac12\|r+s\Phi\delta\|^2=\ell(w)+s\,(\Phi\delta)^\top r+\tfrac{s^2}{2}\|\Phi\delta\|^2.$$

Step 2, the gradient: the derivative at $s=0$ is $(\Phi\delta)^\top r$, which equals $\delta^\top\Phi^\top r$. Since this is $\langle\nabla\ell(w),\delta\rangle$ for every direction $\delta$,

$$\nabla\ell(w)=\Phi^\top(\Phi w-y).$$

Step 3, the prediction dynamics: $u(t)=\Phi w(t)$ and $\Phi$ does not depend on time, so

$$\begin{aligned}
\dot u&=\Phi\dot w\\
&=-\Phi\Phi^\top(\Phi w-y)\\
&=-H(u-y).
\end{aligned}$$

The second row is gradient flow with Step 2, the third uses $\Phi w=u$ and $H:=\Phi\Phi^\top$.

Step 4, $H$ is constant: it depends only on $\Phi$, that is on the training inputs, and not on $t$ or on $w$.

Step 5, symmetry: $(\Phi\Phi^\top)^\top=\Phi\Phi^\top$, because transposing a product reverses the order.

Step 6, PSD: for every $v\in\mathbb{R}^N$,

$$v^\top Hv=(\Phi^\top v)^\top(\Phi^\top v)=\|\Phi^\top v\|^2\ge0.$$

Step 7, the entries: row $n$ of $\Phi$ is $\phi(x_n)^\top$, and entry $(n,n')$ of $\Phi\Phi^\top$ is row $n$ of $\Phi$ times column $n'$ of $\Phi^\top$, so

$$(H)_{n,n'}=\sum_{i=1}^k\Phi_{n,i}\Phi_{n',i}=\langle\phi(x_n),\phi(x_{n'})\rangle.$$

So $H$ is the Gram (kernel) matrix of the features.

**In words.** For a model that is linear in its weights, a gradient step moves every prediction along fixed feature directions, and how much one prediction moves when another is corrected is the fixed inner product of their features. This is Lemma 1 of Lecture 5 in the special case $\frac{\partial f}{\partial w}=\phi(x)$, which is why here $H(t)\equiv H(0)$ exactly.

**Sanity check.** With a single example, $N=1$, the dynamics read $\dot u=-\|\phi(x_1)\|^2(u-y_1)$: plain exponential decay of the error at rate $\|\phi(x_1)\|^2$. With fewer features than examples, $k<N$, the matrix $H$ has rank at most $k$ and is singular, so some error directions cannot decay; part 2 makes this precise.

**What to write in the exam.**

- The directional derivative of $\ell$ along $\delta$ is $\delta^\top\Phi^\top(\Phi w-y)$, so $\nabla\ell(w)=\Phi^\top(\Phi w-y)$.
- Then $\dot u=\Phi\dot w$, which equals $-\Phi\Phi^\top(u-y)$, and $H=\Phi\Phi^\top$ involves neither $t$ nor $w$.
- Symmetric: $(\Phi\Phi^\top)^\top=\Phi\Phi^\top$. PSD: $v^\top Hv=\|\Phi^\top v\|^2$.
- Entries: $(H)_{n,n'}=\langle\phi(x_n),\phi(x_{n'})\rangle$, the Gram matrix.

**Rubric.** Gradient 3 pts (must be derived, not quoted); dynamics 3 pts; symmetry, PSD and entries 2 pts.

*Verified: in Python, a finite-difference gradient matched $\Phi^\top(\Phi w-y)$ to 5e-10, $H$ was symmetric with smallest eigenvalue $0$ up to rounding, and integrating gradient flow on $w$ reproduced the solution of $\dot u=-H(u-y)$ to 1e-12.*

**2. (10) Constant kernel: the solution mode by mode**

**What is asked.** (i) Prove the formula for the component of $u(t)-y$ along each eigenvector, and the resulting expansion. (ii) Deduce which components decay and which stay constant, identify the limit as a projection onto $\ker H$, and give the condition for $u(t)\to y$. The answer is a proof.

**Tool and why.** The spectral decomposition of a symmetric matrix (cheat sheet §3) decouples the system into $N$ scalar equations, which is the spectral solution of the NTK dynamics (cheat sheet §9). Each scalar equation is solved with an integrating factor, as the hint suggests, so we never divide by a quantity that might be zero.

**Definitions.** Let $q_n(t):=\langle v_n,u(t)-y\rangle$, the coordinate of the error along the $n$-th eigenvector; in these coordinates the system decouples. $P_{\ker H}$ is the orthogonal projection onto the kernel of $H$.

**Solution.**

Part (i).

Step 1, the $v_n$ are eigenvectors: by orthonormality, $v_m^\top v_n$ is $1$ for $m=n$ and $0$ otherwise, so

$$Hv_n=\sum_m\lambda_mv_m(v_m^\top v_n)=\lambda_nv_n.$$

Step 2, the derivative of $q_n$: $y$ is constant, so the derivative of $u-y$ is $\dot u$, and

$$\begin{aligned}
\dot q_n&=\langle v_n,\dot u\rangle\\
&=-\langle v_n,H(u-y)\rangle\\
&=-\langle Hv_n,u-y\rangle\\
&=-\lambda_nq_n.
\end{aligned}$$

The second row is the dynamics, the third uses $H^\top=H$ to move $H$ to the other side, the fourth is Step 1.

Step 3, integrating factor: by the product rule and Step 2,

$$\frac{d}{dt}\big(e^{\lambda_nt}q_n(t)\big)=e^{\lambda_nt}\big(\lambda_nq_n+\dot q_n\big)=0.$$

So $e^{\lambda_nt}q_n(t)$ is constant and equals its value at $t=0$, which is $q_n(0)$. Multiplying by $e^{-\lambda_nt}$:

$$\langle v_n,u(t)-y\rangle=e^{-\lambda_nt}\langle v_n,u(0)-y\rangle.$$

This applies to any solution of the equation, with no division by $q_n$.

Step 4, the expansion: $N$ orthonormal vectors in $\mathbb{R}^N$ form a basis, and every $z$ satisfies $z=\sum_n\langle v_n,z\rangle v_n$. With $z=u(t)-y$ and Step 3,

$$u(t)-y=\sum_{n=1}^Ne^{-\lambda_nt}\langle v_n,u(0)-y\rangle\,v_n.$$

Part (ii).

Step 5, positive eigenvalues: if $\lambda_n>0$ then $|q_n(t)|=e^{-\lambda_nt}|q_n(0)|$, which tends to $0$ exponentially at rate $\lambda_n$.

Step 6, zero eigenvalues: if $\lambda_n=0$ then $e^{-\lambda_nt}=1$, so $q_n(t)=q_n(0)$ for every $t$; this component never changes.

Step 7, the kernel of $H$: write any $v$ as $\sum_na_nv_n$. Then $Hv=\sum_n\lambda_na_nv_n$, which is zero exactly when $a_n=0$ for every $n$ with $\lambda_n>0$. So $\ker H$ is the span of the eigenvectors with $\lambda_n=0$, and

$$P_{\ker H}z=\sum_{n:\lambda_n=0}\langle v_n,z\rangle v_n.$$

Step 8, the limit: the sum in Step 4 is finite, so we may take $t\to\infty$ term by term. By Steps 5 and 6 only the zero-eigenvalue terms survive:

$$\lim_{t\to\infty}\big(u(t)-y\big)=\sum_{n:\lambda_n=0}q_n(0)\,v_n=P_{\ker H}\big(u(0)-y\big).$$

Step 9, when $u(t)\to y$: exactly when this projection is zero, that is when $u(0)-y\perp\ker H$. If $H$ is non-singular then $\ker H=\{0\}$, the condition always holds, and since $\|u(t)-y\|^2=\sum_nq_n(t)^2$ with every term decaying at least at rate $2\lambda_{\min}$,

$$\|u(t)-y\|\le e^{-\lambda_{\min}t}\|u(0)-y\|.$$

**In words.** Each eigenvector of the kernel is an independent mode of the error. Strong directions are fitted fast, weak ones slowly, and directions the kernel cannot see are never touched by gradient flow: whatever error starts there stays there forever.

**Sanity check.** If $H=0$ nothing moves, and indeed the formula gives $P_{\ker H}=I$, so the limit is $u(0)-y$. If $H=\lambda I$ with $\lambda>0$, the formula gives $u(t)-y=e^{-\lambda t}(u(0)-y)$, the scalar solution in every direction.

**What to write in the exam.**

- Let $q_n:=\langle v_n,u-y\rangle$. Using $H^\top=H$ and $Hv_n=\lambda_nv_n$, we get $\dot q_n=-\lambda_nq_n$.
- Hence the derivative of $e^{\lambda_nt}q_n$ is $0$, so $q_n(t)=e^{-\lambda_nt}q_n(0)$; expand $u(t)-y$ in the orthonormal basis.
- Modes with $\lambda_n>0$ decay at rate $\lambda_n$; modes with $\lambda_n=0$ are frozen.
- The kernel of $H$ is spanned by the frozen modes, so the limit is $P_{\ker H}(u(0)-y)$, and $u(t)\to y$ if and only if $u(0)-y\perp\ker H$; always when $H$ is non-singular.

**Rubric.** (i) 6 pts: $\dot q_n=-\lambda_nq_n$ with justification 3, integrating factor 2 (dividing by $q_n$ without treating $q_n=0$ loses 1), expansion 1. (ii) 4 pts: decay and freezing 1.5, $\ker H$ as the span of zero modes 1, limit, iff condition and the non-singular case 1.5.

*Verified: in Python, the spectral formula matched the matrix exponential solution to 1e-12, the components along $\ker H$ changed by at most 3e-14 up to $t=50$, and the distance of $u(t)-y$ to the predicted limit fell to 2e-14.*

**3. (10) Time-varying kernel: exponential decay with no closed form**

**What is asked.** Assuming only that $H(t)$ is symmetric, continuous, and uniformly at least $\lambda I_N$, prove that the squared error decays like $e^{-2\lambda t}$, and derive the time after which the loss is at most $\epsilon$. The answer is a proof and a time bound.

**Tool and why.** An energy argument with an integrating factor (a Grönwall-type step), the alternative rate proof of the NTK dynamics (cheat sheet §9). A closed-form solution is not available, because matrices $H(t)$ at different times need not commute, so we track the single number $\|u(t)-y\|^2$ instead of the vector.

**Definitions.** Let $e(t):=u(t)-y$, the residual, and $g(t):=e^{2\lambda t}\|e(t)\|^2$, the squared error rescaled by the claimed rate; $g$ would be constant if the error decayed at exactly that rate, so proving it does not increase proves the claim.

**Solution.**

Step 1, derivative of the squared norm: $\|e\|^2=e^\top e$, its derivative is $2e^\top\dot e$, and $\dot e=-H(t)e$ because $\dot e$ is just $\dot u$, so

$$\tfrac{d}{dt}\|e(t)\|^2=2\langle e(t),\dot e(t)\rangle=-2\,e(t)^\top H(t)\,e(t).$$

Step 2, the PSD floor: $H(t)-\lambda I_N$ is PSD, so $e^\top(H(t)-\lambda I)e\ge0$, that is $e^\top H(t)e\ge\lambda\|e\|^2$. Substituting into Step 1:

$$\frac{d}{dt}\|e\|^2\le-2\lambda\|e\|^2$$

Step 3, $g$ does not increase: by the product rule and Step 2,

$$g'(t)=e^{2\lambda t}\Big(\tfrac{d}{dt}\|e\|^2+2\lambda\|e\|^2\Big)\le0.$$

A function with non-positive derivative on $[0,\infty)$ is non-increasing (mean value theorem), so $g(t)\le g(0)$, and $g(0)=\|e(0)\|^2$. Dividing by $e^{2\lambda t}>0$:

$$\|e(t)\|^2\le e^{-2\lambda t}\|e(0)\|^2$$

Step 4, the time bound: by Step 3,

$$\ell(t)=\tfrac12\|e(t)\|^2\le\tfrac12e^{-2\lambda t}\|e(0)\|^2.$$

The right side is at most $\epsilon$ exactly when $e^{2\lambda t}\ge\frac{\|e(0)\|^2}{2\epsilon}$. Taking logarithms and dividing by $2\lambda$, this holds for all

$$\boxed{\,t \ge \frac{1}{2\lambda} \ln \frac{\|u(0) - y\|^2}{2 \epsilon}\,}$$

If $\|e(0)\|^2\le2\epsilon$ the logarithm is not positive and the claim holds for every $t\ge0$, since then already $\ell(0)\le\epsilon$ and $\ell$ does not increase.

Step 5, why not a matrix exponential: the formula $e(t)=e^{-\int_0^tH}e(0)$ solves the equation only when the matrices $H(t)$ commute with each other, which is not assumed. The argument above uses only the floor $H(t)\succeq\lambda I$ at each moment, never an eigenbasis.

**In words.** At every instant the kernel pulls the residual toward zero with strength at least $\lambda$, whatever its eigen-directions are doing. The squared error therefore shrinks at least as fast as in the worst constant case, $H=\lambda I$.

**Sanity check.** If $H(t)\equiv\lambda I$ then $e(t)=e^{-\lambda t}e(0)$ and the bound holds with equality, so it cannot be improved. For a constant $H$ with smallest eigenvalue $\lambda$, it reproduces the rate of part 2.

**What to write in the exam.**

- With $e:=u-y$: the derivative of $\|e\|^2$ is $-2e^\top H(t)e$.
- The floor $H(t)\succeq\lambda I$ gives $e^\top H(t)e\ge\lambda\|e\|^2$, so that derivative is at most $-2\lambda\|e\|^2$.
- Hence $g'\le0$ for $g=e^{2\lambda t}\|e\|^2$, so $g(t)\le g(0)$, which is the claim.
- Loss: $\ell(t)\le\tfrac12e^{-2\lambda t}\|e(0)\|^2$, which is at most $\epsilon$ for every $t$ beyond the boxed time.
- Do not write $e^{-\int H}$: the $H(t)$ need not commute.

**Rubric.** Derivative of the squared norm 3 pts; PSD floor 3 pts; integrating factor 2 pts; time bound 2 pts. Traps: $e^{-\int_0^tH}$ (invalid), differentiating $\|e\|$ instead of $\|e\|^2$ (not differentiable at $0$), using an eigenbasis of "the" $H$ (it changes with $t$).

*Verified: in Python, an ODE solve with the non-commuting kernel $H(t)=0.7I+A(t)A(t)^\top$ kept the ratio of $\|e(t)\|^2$ to $e^{-2\lambda t}\|e(0)\|^2$ at most $0.9992$, and at the time bound the loss was $9\cdot10^{-10}$, below $\epsilon=10^{-3}$.*

**4. (7) Ultra-wide networks: why the kernel stays put**

**What is asked.** In at most four sentences: why $H(t)$ stays close to $H(0)$ for an ultra-wide network, and what that implies for the training loss, citing the quantitative results from class. The answer is a short explanation.

**Tool and why.** Lecture 5: Lemma 1 (exact dynamics), Prop 1 (concentration at initialization) and Prop 2 (kernel stability during training) (cheat sheet §9). Together they say that the true time-varying system is close to the constant-kernel system of part 2, and part 3 turns "close" into a rate.

**Definitions.** $n$ is the width, as in the lecture, so in this part examples are indexed by $i,j\in[N]$. $H^*$ is the deterministic NTK Gram matrix, with entries $K_s(x_i,x_j)$. $c$ bounds $|y_i|$ and the predictions $|u_i|$ along training, as in Prop 2. The number of examples is $N$, written $m$ in the lecture.

**Solution.**

Step 1, the equation is exact: $\dot u=-H(t)(u-y)$ holds for any architecture, with $H(t)$ the Gram matrix of the Jacobians (Lemma 1); only $H(t)$ depends on the architecture.

Step 2, lazy weights: with the $1/\sqrt n$ output scaling, each neuron's gradient is of order $1/\sqrt n$, so over time $t$ it moves by at most $\frac{2cNt}{\sqrt n}$. Since $\dot\sigma$ is $1$-Lipschitz, each entry of $H$ changes by at most $\frac{4cNt}{\sqrt n}$, and summing over the $N^2$ entries (Prop 2):

$$\|H(t)-H(0)\|_{\mathrm{spectral}}\le\frac{4cN^3t}{\sqrt n}.$$

Step 3, concentration at initialization: each entry of $H(0)$ is an average of $n$ independent bounded terms with mean $(H^*)_{i,j}$. Hoeffding per entry and a union bound over the $N^2$ entries give (Prop 1): with probability at least $1-\delta$,

$$n\ge\frac{2N^4}{\epsilon^2}\ln\frac{N^2}{\delta}\ \Rightarrow\ \|H(0)-H^*\|_{\mathrm{spectral}}\le\epsilon.$$

Step 4, the consequence: suppose $H^*\succ0$ with smallest eigenvalue $\lambda^*$, and the width is large enough that both deviations are at most $\lambda^*/4$ on a time horizon $[0,T]$. For a unit vector $x$, the Rayleigh quotient gives $x^\top H(t)x\ge\lambda^*-\|H(t)-H^*\|$, which is at least $\lambda^*/2$. So $H(t)\succeq\frac{\lambda^*}{2}I$, and part 3 gives exponential decay of the loss at rate set by the NTK spectrum.

**In words.** Width spreads the work over many neurons, so each one barely moves, the Jacobian is nearly frozen, and the network trains like its linearization around the initialization. That is kernel regression with the NTK, which reaches zero training loss even though the original objective is non-convex.

**Sanity check.** The linear model of part 1 is the extreme case: its Jacobian is exactly constant, so $H(t)\equiv H(0)$ for any width. In the other direction, both deviation bounds tend to $0$ as $n\to\infty$; the widths they require are very large, and Prop 2 holds over a fixed horizon $t$, which is the stated caveat of the theory.

**What to write in the exam.**

- The equation $\dot u=-H(t)(u-y)$ is exact for any architecture, and in the ultra-wide regime the $1/\sqrt{n}$ output scaling makes every neuron's weights move only $O(1/\sqrt{n})$ during training ($\|w_r(t) - w_r(0)\| \le 2cNt/\sqrt{n}$, Lecture 5 Prop 2), so the Jacobian, hence the Gram matrix, is nearly frozen: $\|H(t) - H(0)\|$ is at most $4cN^3 t / \sqrt{n}$, which tends to $0$ as $n \to \infty$ (lazy training).
- Moreover, at initialization $H(0)$ concentrates around a deterministic NTK Gram matrix $H^*$ (Hoeffding plus a union bound, Lecture 5 Prop 1, $n \gtrsim N^4/\epsilon^2$).
- Therefore for large width the true dynamics are approximately the constant-kernel linear system of part 2; equivalently part 3 applies with $\lambda$ slightly below $\lambda_{\min}(H^*)$.
- Consequently, if $H^* \succ 0$, the training loss of the non-convex problem converges to zero, a global minimum, at an exponential rate set by the NTK spectrum.

**Rubric.** 2 pts lazy-weights and kernel-stability mechanism ($O(1/\sqrt n)$ movement, Prop 2); 2 pts concentration at initialization, $H(0)\approx H^*$ (Prop 1); 2 pts the implication, approximately linear dynamics with exponential convergence to zero loss when $\lambda_{\min}(H^*)>0$; 1 pt naming the regime (NTK, lazy training) or the global-minimum-despite-non-convexity point. Content over length, but deduct 1 if substantially over four sentences.

*Verified: sympy confirmed that $\frac{4cN^3t}{\sqrt n}\le\epsilon$ is equivalent to Prop 2's width condition $n\ge\frac{16c^2N^6t^2}{\epsilon^2}$, and 2000 random symmetric perturbations $E$ never lowered the smallest eigenvalue of $H^*$ by more than $\|E\|$.*

**Common mistakes.**

- Quoting $\nabla\ell=\Phi^\top(\Phi w-y)$ without deriving it, or dividing by $q_n$ in part 2 without handling $q_n=0$; the integrating factor avoids the division.
- In part 3, writing $e(t)=e^{-\int H}e(0)$ or diagonalizing a single $H$; for a time-varying kernel only the energy argument on $\|e\|^2$ is valid.
- In part 4, giving only one of the two ingredients: both the $O(1/\sqrt n)$ weight movement and the concentration $H(0)\approx H^*$ are needed.

**💡 Useful tricks:** Derive $\nabla\ell=\Phi^\top(\Phi w-y)$ then $\dot u=-H(u-y)$ with $H=\Phi\Phi^\top$ constant; solve each eigenmode with the integrating factor $e^{\lambda_n t}q_n$ (no dividing by $q_n$); for time-varying $H(t)\succeq\lambda I$, differentiate $\|e\|^2$ and use the integrating factor $e^{2\lambda t}\|e\|^2$; lazy training is what justifies treating the kernel as constant.

**⚠️ Watch out:** for time-varying $H(t)$ you may NOT write $e^{-\int H}e(0)$ (the $H(t)$ don't commute — that's the whole point) or use a single fixed eigenbasis; differentiate $\|e\|^2$, not $\|e\|$ (non-differentiable at $0$); the conceptual part needs BOTH the $O(1/\sqrt n)$ weight movement AND the init concentration $H(0)\approx H^*$.

## Q3 — Rademacher complexity of ℓ1-bounded linear predictors (30)

**Full solution:**

**1. (8) The definition and the dual-norm identity**

**What is asked.** State the definition of the empirical Rademacher complexity, then prove that for the $\ell_1$ ball it equals $\frac BN$ times the expected $\ell_\infty$ norm of a random signed sum of the inputs. The answer is a definition and a proof.

**Tool and why.** The definition from class (Lecture 6, Def 1; cheat sheet §11), and the duality between the $\ell_1$ and $\ell_\infty$ norms. The sum inside the definition is linear in $w$, and a linear function on the $\ell_1$ ball is largest at one of its corners, the signed coordinate vectors.

**Definitions.** $\sigma_1,\dots,\sigma_N$ are i.i.d. signs, each equal to $+1$ or $-1$ with probability $\frac12$. For a vector $v\in\mathbb{R}^d$, $j^\star$ is an index where $|v_j|$ is largest, and $w^\star$ is the candidate maximizer defined in Step 3.

**Solution.**

Step 1, the definition: for $A\subseteq\mathbb{R}^N$,

$$R(A)=\frac{1}{N}\,\mathbb{E}_{\sigma}\Big[\sup_{a\in A}\sum_{n=1}^N\sigma_na_n\Big].$$

Step 2, the upper bound in the dual-norm identity: for every $w$ with $\|w\|_1\le B$,

$$\begin{aligned}
\langle w,v\rangle&\le\sum_{j=1}^d|w_j|\,|v_j|\\
&\le\|v\|_\infty\sum_{j=1}^d|w_j|\\
&\le B\|v\|_\infty.
\end{aligned}$$

The first row bounds each product by its absolute value, the second bounds each $|v_j|$ by the largest one, the third is the constraint on $w$.

Step 3, the bound is attained: let $w^\star:=B\operatorname{sign}(v_{j^\star})\,\mathbf{e}^{j^\star}$. Its $\ell_1$ norm is $B$, so it is feasible, and

$$\langle w^\star,v\rangle=B\operatorname{sign}(v_{j^\star})\,v_{j^\star}=B|v_{j^\star}|=B\|v\|_\infty.$$

(If $v=0$ both sides are $0$.) So for every $v$,

$$\sup_{\|w\|_1\le B}\langle w,v\rangle=B\|v\|_\infty,$$

and the supremum is a maximum, attained at a scaled signed coordinate vector.

Step 4, assembly: an element of $\mathcal{H}_B\circ S$ has entries $a_n=\langle w,x_n\rangle$, and by linearity $\sum_n\sigma_n\langle w,x_n\rangle$ equals $\langle w,\sum_n\sigma_nx_n\rangle$. For each fixed realization of $\sigma$ we apply Steps 2 and 3 with $v=\sum_n\sigma_nx_n$, and then take the expectation:

$$\begin{aligned}
R(\mathcal{H}_B\circ S)&=\frac1N\,\mathbb{E}_\sigma\Big[\sup_{\|w\|_1\le B}\sum_n\sigma_n\langle w,x_n\rangle\Big]\\
&=\frac1N\,\mathbb{E}_\sigma\Big[\sup_{\|w\|_1\le B}\Big\langle w,\sum_n\sigma_nx_n\Big\rangle\Big]\\
&=\frac{B}{N}\,\mathbb{E}_\sigma\Big\|\sum_n\sigma_nx_n\Big\|_\infty.
\end{aligned}$$

**In words.** A linear function on the diamond-shaped $\ell_1$ ball peaks at a corner. So the whole class correlates with random signs exactly as well as its best single signed coordinate, scaled by $B$.

**Sanity check.** For $d=1$ the class is $\{x\mapsto wx:|w|\le B\}$, and directly $\sup_{|w|\le B}w\sum_n\sigma_nx_n$ is $B|\sum_n\sigma_nx_n|$, which is the formula. For $N=1$ the formula gives $B\|x_1\|_\infty$, the largest value $|\langle w,x_1\rangle|$ can take.

**What to write in the exam.**

- Definition, with i.i.d. uniform signs:

$$R(A)=\frac1N\mathbb{E}_\sigma\Big[\sup_{a\in A}\sum_n\sigma_na_n\Big]$$

- Duality: $\langle w,v\rangle\le\|w\|_1\|v\|_\infty$, and $w^\star=B\operatorname{sign}(v_{j^\star})\mathbf{e}^{j^\star}$ attains $B\|v\|_\infty$.
- For each fixed $\sigma$, $\sum_n\sigma_n\langle w,x_n\rangle$ is $\langle w,\sum_n\sigma_nx_n\rangle$; apply duality with $v=\sum_n\sigma_nx_n$, then take the expectation.

**Rubric.** Definition 2 pts; dual-norm step 3 pts (including the attaining point); assembly 3 pts, where the per-$\sigma$ application of duality must be visible.

*Verified: in Python, 20000 random points of the $\ell_1$ ball never exceeded $B\|v\|_\infty$ and the signed vertex attained it, and for three data sets an exact enumeration over all $2^N$ sign vectors gave the same value from the supremum over vertices and from the formula.*

**2. (8) Massart's lemma on $2d$ points**

**What is asked.** Prove the upper bound $B\sqrt{2\ln(2d)/N}$ on the Rademacher complexity. The answer is a proof.

**Tool and why.** Massart's lemma (cheat sheet §2, §11) needs a finite set, while the $\ell_1$ ball is infinite. Part 1 already replaced the ball by an $\ell_\infty$ norm, which is a maximum over $d$ coordinates; absorbing the absolute value doubles that to $2d$ linear functions of $\sigma$, which is the finite set we need.

**Definitions.** For $j\in[d]$ let $v^j:=(x_{1,j},\dots,x_{N,j})^\top\in\mathbb{R}^N$, the $j$-th coordinate of all $N$ inputs, and let $V:=\{+v^j,-v^j:j\in[d]\}$. $V$ is finite with $|V|\le2d$.

**Solution.**

Step 1, each coordinate is an inner product with $\sigma$: the $j$-th coordinate of $\sum_n\sigma_nx_n$ is $\sum_n\sigma_nx_{n,j}$, which is $\langle\sigma,v^j\rangle$.

Step 2, the absolute value by a $\pm$ pair: since $|a|=\max\{a,-a\}$,

$$\begin{aligned}
\Big\|\sum_n\sigma_nx_n\Big\|_\infty&=\max_{j\in[d]}\big|\langle\sigma,v^j\rangle\big|\\
&=\max_{v\in V}\langle\sigma,v\rangle.
\end{aligned}$$

Step 3, the norms of the points: every input entry satisfies $|x_{n,j}|\le1$, because $\|x_n\|_\infty\le1$, so

$$\|\pm v^j\|_2^2=\sum_{n=1}^Nx_{n,j}^2\le N,$$

and therefore $\max_{v\in V}\|v\|_2\le\sqrt N$.

Step 4, Massart: by the lemma, Step 3, and $|V|\le2d$ (the logarithm is increasing),

$$\mathbb{E}_\sigma\Big[\max_{v\in V}\langle\sigma,v\rangle\Big]\le\sqrt N\cdot\sqrt{2\ln(2d)}.$$

Step 5, combining with part 1 and Step 2:

$$\begin{aligned}
R(\mathcal{H}_B\circ S)&=\frac BN\,\mathbb{E}_\sigma\Big[\max_{v\in V}\langle\sigma,v\rangle\Big]\\
&\le\frac BN\sqrt{2N\ln(2d)}\\
&=B\sqrt{\frac{2\ln(2d)}{N}}.
\end{aligned}$$

$$\boxed{R(\mathcal{H}_B\circ S)\le B\sqrt{\frac{2\ln(2d)}{N}}}$$

**In words.** The $\ell_1$ ball has only $2d$ corners, and by part 1 only corners matter. So the class is as complex as a set of $2d$ predictors, and the price of the dimension is only $\ln(2d)$.

**Sanity check.** Take $d=1$ and all $x_n=1$. Then $\mathbb{E}|\sum_n\sigma_n|$ is about $\sqrt{2N/\pi}$, roughly $0.80\sqrt N$, while the Massart bound used above is $\sqrt{2\ln2}\cdot\sqrt N$, roughly $1.18\sqrt N$: the bound holds with a modest constant to spare.

**What to write in the exam.**

- Let $v^j$ be the $j$-th coordinate across the sample and $V=\{\pm v^j\}$, so $|V|\le2d$.
- Then $\|\sum_n\sigma_nx_n\|_\infty$ equals $\max_{v\in V}\langle\sigma,v\rangle$; the $\pm$ pair absorbs the absolute value.
- Each $\|v^j\|_2^2$ is at most $N$, because the entries are in $[-1,1]$.
- Massart gives at most $\sqrt N\sqrt{2\ln(2d)}$; multiplying by $\frac BN$ gives $B\sqrt{2\ln(2d)/N}$.

**Rubric.** Construction of $V$ 3 pts; rewriting as a maximum 2 pts; norm bound 1 pt; Massart 1 pt; combination 1 pt. Traps: Massart applied to the infinite ball (0 for that step); forgetting the $\pm$ doubling, giving $\ln d$ (deduct 1); norm bound $N$ instead of $\sqrt N$.

*Verified: exact enumeration over all $2^N$ sign vectors gave complexity between 0.42 and 0.45 of the bound for uniform inputs with $(d,N)$ equal to $(5,10)$, $(20,15)$, $(3,12)$, and between 0.67 and 0.77 for $\pm1$ inputs; for $d=1$, $N=100$ the exact $\mathbb{E}|\sum_n\sigma_n|/\sqrt N$ is 0.796.*

**3. (7) The generalization bound for a fixed $B$**

**What is asked.** Derive the uniform bound over $\mathcal{H}_B$ with complexity term $2\rho B\sqrt{2\ln(2d)/N}$. The answer is a derivation from the two reminders.

**Tool and why.** The Rademacher generalization theorem and the contraction lemma (cheat sheet §11). The theorem is stated for the loss class $\ell\circ\mathcal{H}\circ S$; contraction removes the loss at the cost of the factor $\rho$, and part 2 bounds what is left.

**Definitions.** No new notation.

**Solution.**

Step 1, contraction and part 2: $\ell(y,\cdot)$ is $\rho$-Lipschitz for every $y$, so

$$\begin{aligned}
R(\ell\circ\mathcal{H}_B\circ S)&\le\rho\,R(\mathcal{H}_B\circ S)\\
&\le\rho B\sqrt{\frac{2\ln(2d)}{N}}.
\end{aligned}$$

This holds for every sample $S$, because part 2 used only $\|x_n\|_\infty\le1$.

Step 2, the theorem for the class $\mathcal{H}_B$: with probability at least $1-\delta$ over $S$, for every $h\in\mathcal{H}_B$,

$$L_D(h)-L_S(h)\le2R(\ell\circ\mathcal{H}_B\circ S)+3\sqrt{\frac{2\ln(4/\delta)}{N}}.$$

Step 3, substituting: on the same event, replace the complexity by its bound from Step 1. Since Step 1 holds for every $S$, the probability is still at least $1-\delta$. Adding $L_S(h)$ to both sides:

$$\boxed{L_D(h)\le L_S(h)+2\rho B\sqrt{\frac{2\ln(2d)}{N}}+3\sqrt{\frac{2\ln(4/\delta)}{N}}}$$

**In words.** The complexity term grows with the norm budget $B$ but only logarithmically with the dimension $d$, and it depends on the data only through the assumption that inputs lie in $[-1,1]^d$.

**Sanity check.** With $\rho=1$, $B=1$, $d=1000$, $N=10^4$ and $\delta=0.05$, the complexity term is about $0.078$ and the confidence term about $0.089$: a meaningful bound even though $d$ is large. The lecture-notes version of the theorem has constant $4$ instead of the recitation's $3$, which changes only the last term.

**What to write in the exam.**

- Contraction: $R(\ell\circ\mathcal{H}_B\circ S)\le\rho R(\mathcal{H}_B\circ S)$, then part 2.
- Plug into the theorem for $\mathcal{H}_B$; the substitution is valid for every $S$, so the probability stays at least $1-\delta$.
- Rearrange to get the stated bound.

**Rubric.** Contraction plus part 2 3 pts; plugging into the quoted theorem for $\mathcal{H}_B$ 3 pts; rearranging 1 pt. Either constant ($3$ or the lecture's $4$) is accepted if used consistently.

*Verified: in Python, the two terms for $\rho=1$, $B=1$, $d=1000$, $N=10^4$, $\delta=0.05$ evaluate to $0.0780$ and $0.0888$.*

**4. (7) A norm-adaptive bound by a union over dyadic radii**

**What is asked.** Prove a bound that holds simultaneously for every $w$, with the budget $B$ replaced by $B(w)$ computed from the learned weights, and say in one or two sentences which predictors it favors and why that matters when $d\gg N$. The answer is a proof plus a short conclusion.

**Tool and why.** The weighted union bound with confidence levels $\delta_j$ (SRM; cheat sheet §2) applied to the nested classes $\mathcal{H}_{2^j}$, the norm-adaptive pattern of cheat sheet §11. Part 3 works only for a budget fixed in advance; spending a summable share $\delta_j$ of the failure probability on each radius $2^j$ makes all radii hold at once, and then each $w$ uses the smallest radius that contains it.

**Definitions.** $\delta_j:=\delta\cdot2^{-(j+1)}$ for $j=0,1,2,\dots$. $E_j$ is the event that the bound of part 3 holds for the class $\mathcal{H}_{2^j}$ at confidence $\delta_j$. For a weight vector $w$, $j(w)$ is the radius index chosen in Step 3.

**Solution.**

Step 1, each radius separately: by part 3 with $B=2^j$ and confidence $\delta_j$, the event $E_j$ fails with probability at most $\delta_j$. Its confidence term uses

$$\ln\frac4{\delta_j}=\ln\frac4\delta+(j+1)\ln2.$$

Step 2, union bound: the failure probabilities sum to

$$\sum_{j\ge0}\delta_j=\delta\sum_{j\ge0}2^{-(j+1)}=\delta.$$

So with probability at least $1-\delta$ all events $E_j$ hold simultaneously: for every $j$ and every $h\in\mathcal{H}_{2^j}$,

$$L_D(h)\le L_S(h)+2\rho\,2^j\sqrt{\frac{2\ln(2d)}{N}}+3\sqrt{\frac{2\big(\ln(4/\delta)+(j+1)\ln2\big)}{N}}.$$

Step 3, choosing the radius: given $w$, let $j(w)=0$ if $\|w\|_1\le1$, and otherwise $j(w)=\lceil\log_2\|w\|_1\rceil$.

Step 4, three properties of this choice.

(a) Membership: $2^{j(w)}\ge\|w\|_1$, because rounding up the exponent only increases the power (and $2^0=1$ in the first case). So $h_w\in\mathcal{H}_{2^{j(w)}}$.

(b) The radius is at most $B(w)$: if $\|w\|_1\le1$ then $2^0=1$, which is at most $B(w)$. Otherwise $\lceil a\rceil<a+1$ gives

$$2^{j(w)}<2^{\log_2\|w\|_1+1}=2\|w\|_1\le B(w).$$

(c) The logarithm: $(j(w)+1)\ln2$ equals $\ln\big(2\cdot2^{j(w)}\big)$, which by (b) is at most $\ln(2B(w))$.

Step 5, monotonicity and conclusion: both terms of the bound in Step 2 increase with $2^j$ and with the argument of the logarithm. On the event of Step 2, apply it with $j=j(w)$, allowed by (a), and replace $2^{j(w)}$ by the larger $B(w)$ using (b), and $(j(w)+1)\ln2$ by the larger $\ln(2B(w))$ using (c). This gives, for every $w$ at once,

$$\boxed{L_D(h_w)\le L_S(h_w)+2\rho\,B(w)\sqrt{\frac{2\ln(2d)}{N}}+3\sqrt{\frac{2\big(\ln(4/\delta)+\ln(2B(w))\big)}{N}}}$$

Step 6, the conclusion asked for: the bound grows linearly with $\|w\|_1$ but only logarithmically with $d$, so it favors predictors of small $\ell_1$ norm (effectively sparse ones) and stays meaningful even when $d\gg N$. It therefore explains generalization exactly when gradient training's implicit bias selects such low-norm solutions: generalization is a property of the algorithm and the class together (Lectures 6–7, the same weighting pattern as the norm-adaptive bound of Exam 2021 Moed B, Q3).

**In words.** Not knowing the norm in advance costs almost nothing: we prepare one bound per dyadic radius, pay for the radius in the confidence term only through $\ln(2B(w))$, and lose at most a factor $2$ by rounding the norm up to a power of two.

**Sanity check.** For $\|w\|_1=0.3$ we get $j=0$ and $B(w)=1$; for $\|w\|_1=3$, $j=2$, radius $4$ and $B(w)=6$; for $\|w\|_1=4$, $j=2$, radius $4$ and $B(w)=8$. In each case the radius contains $w$ and is at most $B(w)$. When $\|w\|_1\le\frac12$ the bound is part 3 with $B=1$, except for the extra $\ln2$ inside the logarithm: that is the whole price of adaptivity.

**What to write in the exam.**

- Apply part 3 to $\mathcal{H}_{2^j}$ with $\delta_j=\delta2^{-(j+1)}$; since $\sum_j\delta_j=\delta$, all bounds hold at once with probability at least $1-\delta$.
- Use $\ln(4/\delta_j)=\ln(4/\delta)+(j+1)\ln2$.
- For $w$ take $j(w)=\lceil\log_2\|w\|_1\rceil$, or $0$ when $\|w\|_1\le1$; then $h_w\in\mathcal{H}_{2^{j(w)}}$ and $2^{j(w)}\le B(w)$.
- Both terms increase in $2^j$, so substitute $B(w)$ and $\ln(2B(w))$.
- Conclusion: favors small $\ell_1$ norm, only $\ln d$ dependence, relevant when the implicit bias of training finds low-norm solutions with $d\gg N$.

**Rubric.** Union step 3 pts (a non-summable choice of $\delta_j$ gets at most 1); instantiation 3 pts, including the monotonicity remark; conclusion 1 pt.

*Verified: sympy confirmed $\sum_j\delta_j=\delta$ and the identity for $\ln(4/\delta_j)$, and properties (a), (b), (c) held for 6004 norms in $(0,1001)$, including exact powers of two.*

**Common mistakes.**

- In part 1, applying duality to the expectation instead of to each fixed $\sigma$, or never naming the point where the supremum is attained.
- In part 2, applying Massart to the infinite ball, forgetting the $\pm$ doubling (which gives $\ln d$ instead of $\ln(2d)$), or bounding $\|v^j\|_2$ by $N$ instead of $\sqrt N$.
- In part 4, a non-summable choice of $\delta_j$, or replacing $2^{j(w)}$ by $B(w)$ without proving $2^{j(w)}\le B(w)$ and noting that the bound increases in the radius.

**💡 Useful tricks:** Dual norm — $\sup_{\|w\|_1\leq B}\langle w,v\rangle=B\|v\|_\infty$, attained at a signed coordinate vector; reduce $\|\sum\sigma_n x_n\|_\infty$ to a $\max$ over the $2d$ points $\pm v^j$ and apply Massart; peel the loss off with contraction ($\rho$); make it norm-adaptive by a union over dyadic radii $2^j$ with $\delta_j=\delta2^{-(j+1)}$.

**⚠️ Watch out:** apply duality *per $\sigma$-realization* (make it visible); the $\pm$ doubling gives $\ln(2d)$, not $\ln d$; Massart is for the FINITE set $V$, never the infinite ball; the coordinate norm bound is $\sqrt N$, not $N$; the dyadic split must be summable.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1 proving only one inclusion, or asserting the
  $\supseteq$ construction; Q1.2 not proving $\operatorname{rank}(I_M) = M$; Q1.3
  skipping $\sigma_i(I_M) = 1$ or omitting an attaining matrix; Q1.4(ii) "non-negative
  entries" instead of PSD; Q2.1 quoting $\nabla\ell$ without derivation; Q2.2 dividing
  by $q_n$ without handling zeros; Q2.3 using $e^{-\int H}$ or a fixed eigenbasis for
  time-varying $H(t)$; Q3.1 missing the attainment point or the per-$\sigma$
  application of duality; Q3.2 Massart on an infinite set, or $\ln d$ vs $\ln(2d)$;
  Q3.4 non-summable $\delta_j$ or unjustified replacement of $2^j$ by $B(w)$.
