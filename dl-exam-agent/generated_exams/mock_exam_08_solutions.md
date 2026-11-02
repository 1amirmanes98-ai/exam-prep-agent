# Mock Exam 8 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_08.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-10-28 (Q1, replaced on 2026-11-01 and re-verified then: $\mathrm{rank}(A\odot B)=\mathrm{rank}A\cdot\mathrm{rank}B$ on 500
random low-rank pairs; the canonical matricization of $G^{\otimes N/2}$ equals $G^{\odot N/2}$, with rank $\rho^{N/2}$,
and its halving matricization has rank $1$; the width-$\rho$ HT assignment and a layer-by-layer
network evaluation reproduce $f_G$ up to $N=16$; the $\rho^{N/2}$-term CP tensor equals $f_G$, and random CP
tensors never exceed canonical rank $Z$; random HT nets never exceed halving rank $r_{L-1}$; the palindrome's
halving matricization is a permutation matrix of rank $M^{N/2}$, and the mirror re-ordering maps it to
$f_{I_M}$ exactly. Q2: finite-difference
gradient check; Euler (step $10^{-5}$) on the matrix flow with random $Q$ and
$\mu=(3,1,0,-2)$: $Q^\top UQ$ stays diagonal to $10^{-14}$, eigenvalues match the closed forms
to $3\cdot10^{-5}$, limit $W^*_+$; random search never goes below $\sum_{\mu_r<0}\mu_r^2=4$;
small-init limits at $t_\alpha$ for $\alpha=10^{-2},\dots,10^{-16}$; direct flow converges to
$W^*$. Q3: Lipschitz-in-parameters lemma on 3000 random ReLU nets of depth $1$–$5$ — max ratio
$1.000$, attained on a scalar chain; cover-count arithmetic and $j(\theta)\le\log_2\max\{1,2M\}$).

## Q1 — Deep versus shallow tensor decompositions: Kronecker ranks and pooling geometry (40)

**Hint:** Every rank question here becomes a question about a matricization: split the tensor into outer products, turn each outer product into a Kronecker product with Lemma 3, and count ranks. For part 1, invertible matrices do not change the rank, and a Kronecker product of invertible matrices is invertible, so you only need the rank of one very sparse 0/1 matrix. For part 2b, look at which coordinates each factor of $f_G$ reads. For part 3, copy the class assignment that produced the identity matricization, but let layer $0$ carry the rank-one pieces of $G$. For part 4b, expand a product of sums. For part 5, write down the matricization w.r.t. $I_{half}$ of the palindrome and ask how many ones each row has; then ask which positions should be pooled first.

**Full solution:**

**1. (7) Kronecker rank**

**What is asked.** Prove that the rank of a Kronecker product is the product of the ranks, for matrices of any sizes, without quoting Lemma 2. The answer is a proof.

**Tool and why.** The rank normal form together with the mixed-product property (cheat sheet §3 for rank, §6 for the Kronecker facts; Recitation: Kronecker product, P1–P2). The normal form replaces $A$ and $B$ by the simplest matrices of the same ranks, and the mixed-product property shows that this replacement can be done inside the Kronecker product without changing its rank.

**Definitions.** Let $r:=\mathrm{rank}\,A$ and $s:=\mathrm{rank}\,B$. By the rank normal form there are invertible $P\in\mathbb R^{m_1\times m_1}$, $Q\in\mathbb R^{m_2\times m_2}$, $P'\in\mathbb R^{n_1\times n_1}$ and $Q'\in\mathbb R^{n_2\times n_2}$ with

$$PAQ=J_r,\qquad P'BQ'=J_s,$$

where $J_r$ has the size of $A$ and $J_s$ has the size of $B$. They are introduced to move from $A$ and $B$ to the 0/1 matrices $J_r$ and $J_s$.

**Solution.**

Step 1, a Kronecker product of invertible matrices is invertible: by the mixed-product property and $I_m\odot I_n=I_{mn}$,

$$\begin{aligned}
(P\odot P')(P^{-1}\odot P'^{-1})&=(PP^{-1})\odot(P'P'^{-1})\\
&=I_{m_1}\odot I_{n_1}\\
&=I_{m_1n_1}.
\end{aligned}$$

So $P\odot P'$ is invertible, and in the same way $Q\odot Q'$ is invertible.

Step 2, moving to the normal forms: applying the mixed-product property twice,

$$\begin{aligned}
(P\odot P')(A\odot B)(Q\odot Q')&=\big((PA)\odot(P'B)\big)(Q\odot Q')\\
&=(PAQ)\odot(P'BQ')\\
&=J_r\odot J_s.
\end{aligned}$$

Step 3, the rank is unchanged: multiplying a matrix on the left or on the right by an invertible matrix does not change its rank. By steps 1 and 2,

$$\mathrm{rank}(A\odot B)=\mathrm{rank}(J_r\odot J_s).$$

Step 4, the entries of $J_r\odot J_s$: by definition of the Kronecker product, the block in block-row $i\in[m_1]$ and block-column $k\in[m_2]$ is $(J_r)_{i,k}\,J_s$. It is nonzero only when $i=k$ and $i\le r$, and then it equals $J_s$, whose ones sit at the local positions $(t,t)$ with $t\in[s]$. So the ones of $J_r\odot J_s$ are exactly at the global positions

$$\big((i-1)n_1+t,\ (i-1)n_2+t\big),\qquad i\in[r],\ t\in[s],$$

and all other entries are $0$. There are exactly $rs$ such positions.

Step 5, distinct rows and columns: because $t\le s$ and $s\le n_1$, the row index $(i-1)n_1+t$ determines the pair $(i,t)$ uniquely (it is division with remainder by $n_1$). Likewise, because $s\le n_2$, the column index determines $(i,t)$. So no two ones share a row or a column.

Step 6, the rank: by step 5, each of the $rs$ nonzero rows is a distinct standard basis row vector, and these are linearly independent; all other rows are zero. Hence $\mathrm{rank}(J_r\odot J_s)=rs$, and by step 3

$$\mathrm{rank}(A\odot B)=rs=\mathrm{rank}(A)\cdot\mathrm{rank}(B).$$

If $r=0$ or $s=0$ there are no ones at all, and both sides are $0$, so this case is included.

**In words.** Up to invertible changes of basis on both sides, $A$ is "$r$ ones on the diagonal" and $B$ is "$s$ ones on the diagonal". The Kronecker product then places a copy of the $s$ ones in each of the $r$ diagonal blocks, which gives $rs$ independent ones.

**Sanity check.** Take $A=I_2$ (rank $2$) and $B$ the $2\times2$ all-ones matrix (rank $1$). Then $A\odot B$ is block-diagonal with two copies of $B$, of rank $2$, which is $2\cdot1$. In the other order, $B\odot A$ is the $2\times2$ block matrix with $I_2$ in every block, whose rows repeat in pairs, so its rank is also $2$, even though the two products are different matrices.

**What to write in the exam.**

- Normal form (2 pts): $PAQ=J_r$ and $P'BQ'=J_s$ with invertible $P,Q,P',Q'$.
- Reduction (2 pts): $P\odot P'$ and $Q\odot Q'$ are invertible by the mixed product, and $(P\odot P')(A\odot B)(Q\odot Q')=J_r\odot J_s$, so the ranks agree.
- Counting (3 pts): the ones of $J_r\odot J_s$ sit at $((i-1)n_1+t,(i-1)n_2+t)$, in distinct rows and columns, so the rank is $rs$.

*Verified: 500 random pairs of low-rank matrices with sizes up to $5\times5$ have $\mathrm{rank}(A\odot B)=\mathrm{rank}A\cdot\mathrm{rank}B$; for three size choices $J_r\odot J_s$ has exactly $rs$ ones at the listed positions, at most one per row and column; $(P\odot Q)(P^{-1}\odot Q^{-1})=I_4$ exactly in sympy.*

**2a. (5) Canonical matricization of $f_G$**

**What is asked.** Show that the canonical matricization of $\mathcal A_{f_G}$ is the $N/2$-fold Kronecker power of $G$, and deduce that the separation rank of $f_G$ w.r.t. $I_{odd}$ is $\rho^{N/2}$. The answer is a proof and the value $\rho^{N/2}$.

**Tool and why.** Lemma 3 for canonical matricizations, Prop 7 and part 1 (cheat sheet §6; Lecture 2, §2.4 and §2.7). The tensor $\mathcal A_{f_G}$ is an outer product of order-2 tensors, all of even order, which is exactly the case where Lemma 3 turns $\otimes$ into $\odot$.

**Definitions.** For $k\in\mathbb N$ let $G^{\otimes k}$ be the outer product of $k$ copies of $G$ (an order-$2k$ tensor) and $G^{\odot k}$ the Kronecker product of $k$ copies (an $M^k\times M^k$ matrix). So $\mathcal A_{f_G}=G^{\otimes N/2}$; the entry of $G^{\otimes N/2}$ at $(d_1,\dots,d_N)$ is $\prod_jG_{d_{2j-1},d_{2j}}$ by definition of the outer product, which is $f_G(d_1,\dots,d_N)$.

**Solution.**

Step 1, **Claim.** For every $k\in\mathbb N$,

$$[\![G^{\otimes k}]\!]=G^{\odot k}.$$

We prove it by induction on $k$, upwards from $k=1$.

**Base.** For $k=1$ the tensor $G$ has order $2$, and its canonical matricization puts mode $1$ in the rows and mode $2$ in the columns, so $[\![G]\!]=G$.

**Hypothesis.** For some $k\ge1$, $[\![G^{\otimes k}]\!]=G^{\odot k}$.

**Step.** Write $G^{\otimes(k+1)}=G\otimes G^{\otimes k}$, an outer product of tensors of orders $2$ and $2k$, both even. By Lemma 3 for canonical matricizations, and then by the base and the hypothesis (the only place it is used),

$$\begin{aligned}
[\![G^{\otimes(k+1)}]\!]&=[\![G]\!]\odot[\![G^{\otimes k}]\!]\\
&=G\odot G^{\odot k}\\
&=G^{\odot(k+1)}.
\end{aligned}$$

Step 2, the matricization of $f_G$: by step 1 with $k=N/2$, $[\![\mathcal A_{f_G}]\!]=G^{\odot N/2}$, as required.

Step 3, its rank: by part 1 applied $N/2-1$ times (induction on the number of factors, since $\mathrm{rank}(G\odot G^{\odot k})=\rho\cdot\mathrm{rank}\,G^{\odot k}$),

$$\mathrm{rank}\,G^{\odot N/2}=\rho^{N/2}.$$

Step 4, the separation rank: by Prop 7 and steps 2–3,

$$\mathrm{sep}(f_G;I_{odd})=\mathrm{rank}\,[\![\mathcal A_{f_G}]\!]=\rho^{N/2}.$$

**In words.** $f_G$ couples each odd position with the even position next to it through $G$, and the odd-versus-even split cuts all $N/2$ couplings at once. Each cut coupling costs a factor $\rho$, and the costs multiply.

**Sanity check.** For $G=I_M$ (so $\rho=M$) we get

$$[\![\mathcal A]\!]=I_M\odot\cdots\odot I_M=I_{M^{N/2}},$$

exactly the full-rank matricization of the class proof of Prop 6. For $\rho=1$ the function is a product of one-variable factors, and its separation rank is $1$.

**What to write in the exam.**

- Base (1 pt): $[\![G]\!]=G$.
- Induction (2 pts): $G^{\otimes(k+1)}=G\otimes G^{\otimes k}$, orders even, so Lemma 3 gives $[\![G^{\otimes(k+1)}]\!]=G\odot G^{\odot k}$.
- Rank (1 pt): part 1 repeatedly gives $\rho^{N/2}$.
- Separation rank (1 pt): by Prop 7, $\mathrm{sep}(f_G;I_{odd})=\rho^{N/2}$.

*Verified: for $(M,\rho,N)$ with $M\in\{2,3,4\}$, every $\rho\le M$ and $N\in\{2,4,8\}$, the canonical matricization computed by transpose-and-reshape equals the Kronecker power exactly, and its rank is $\rho^{N/2}$.*

**2b. (3) Separation rank w.r.t. the halving partition**

**What is asked.** Show that $f_G$ is a product of one function of the first half of the inputs and one function of the second half, and that it is not the zero function. The answer is the value $1$ with a proof.

**Tool and why.** The definition of separation rank directly (cheat sheet §6). An upper bound needs one explicit separable representation, and a lower bound needs only that $f_G\ne0$.

**Definitions.** Let $g:[M]^{N/2}\to\mathbb R$ be

$$g(c_1,\dots,c_{N/2}):=\prod_{j=1}^{N/4}G_{c_{2j-1},\,c_{2j}},$$

which is well defined because $N/2$ is even (as $N\ge4$). It is $f_G$ written for half as many inputs.

**Solution.**

Step 1, no pair is split: the pairs $\{2j-1,2j\}$ with $j\le N/4$ lie inside $I_{half}$, and those with $j>N/4$ lie inside its complement, because $N/2$ is even.

Step 2, the factorization: by step 1, the product defining $f_G$ splits into the factors with $j\le N/4$ and the factors with $j>N/4$, so

$$f_G(d_1,\dots,d_N)=g(d_1,\dots,d_{N/2})\cdot g(d_{N/2+1},\dots,d_N).$$

This is one separable term, so $\mathrm{sep}(f_G;I_{half})\le1$.

Step 3, $f_G\ne0$: since $\rho\ge1$, $G$ has an entry $G_{a,b}\ne0$. At the input $(a,b,a,b,\dots,a,b)$ every factor equals $G_{a,b}$, so

$$f_G(a,b,\dots,a,b)=G_{a,b}^{N/2}\ne0.$$

Step 4, conclusion: a separation rank of $0$ would mean $f_G$ is the empty sum, i.e. the zero function, which step 3 rules out. Hence $\mathrm{sep}(f_G;I_{half})=1$.

**In words.** The halving cut does not separate any of the coupled pairs, so the two halves of the input do not interact at all.

**Sanity check.** Through Prop 7 the same answer reads $\mathrm{rank}\,[\![\mathcal A_{f_G}]\!]_{I_{half}}=1$: by Lemma 3 this matricization is $\mathrm{vec}(G^{\otimes N/4})\,\mathrm{vec}(G^{\otimes N/4})^\top$, a nonzero rank-one matrix.

**What to write in the exam.**

- Factorization (2 pts): no pair crosses the middle, so $f_G=g(d_1,\dots,d_{N/2})\cdot g(d_{N/2+1},\dots,d_N)$, and the separation rank is at most $1$.
- Nonzero (1 pt): $f_G(a,b,\dots,a,b)$ equals $G_{a,b}^{N/2}$, which is not $0$.

*Verified: for the same grid of $(M,\rho,N)$ with $N\ge4$, the matricization w.r.t. $I_{half}$ has rank exactly $1$.*

**3. (8) A small deep network for $f_G$**

**What is asked.** Find explicit weights for the deep network, with every hidden width equal to $\rho$, whose tensor is $\mathcal A_{f_G}$, and prove it. The answer is an assignment plus an induction over the levels.

**Tool and why.** The HT recursion (Prop 4) and the passthrough assignment from the proof of Prop 6 (cheat sheet §6; Lecture 2, §2.4). In class, basis vectors at layer $0$ and an all-ones filter at layer $1$ produced $I_M$ in every pair; replacing the basis vectors by the rank-one pieces of $G$ produces $G$ in every pair instead.

**Definitions.** Let $\mathbf 1\in\mathbb R^\rho$ be the all-ones vector and $\mathbf e^1\in\mathbb R^\rho$ the first standard basis vector. The assignment, with $r_l=\rho$ for every $l$, is:

- layer $0$: $\mathbf a^{0,2j-1,\alpha}=\mathbf u^\alpha$ and $\mathbf a^{0,2j,\alpha}=\mathbf v^\alpha$, for $j\in[N/2]$ and $\alpha\in[\rho]$;
- layer $1$: $\mathbf a^{1,j,1}=\mathbf 1$ and $\mathbf a^{1,j,\gamma}=\mathbf 0$ for $\gamma\ge2$;
- layers $l\in\{2,\dots,L-1\}$: $\mathbf a^{l,j,1}=\mathbf e^1$ and $\mathbf a^{l,j,\gamma}=\mathbf 0$ for $\gamma\ge2$;
- output: $\mathbf a^L=\mathbf e^1$.

Only channel $1$ is used above layer $0$; the other channels are switched off.

**Solution.**

Step 1, **Claim.** For every $l\in[L-1]$ and $j\in[N/2^l]$,

$$\Phi^{l,j,1}=G^{\otimes2^{l-1}},$$

and $\Phi^{l,j,\gamma}=0$ for $\gamma\ge2$. We prove it by induction on $l$, upwards from $l=1$.

**Base.** For $l=1$ and $\gamma=1$ every coefficient $a^{1,j,1}_\alpha$ is $1$, so

$$\begin{aligned}
\Phi^{1,j,1}&=\sum_{\alpha=1}^{\rho}\mathbf u^\alpha\otimes\mathbf v^\alpha\\
&=\sum_{\alpha=1}^{\rho}\mathbf u^\alpha(\mathbf v^\alpha)^\top\\
&=G,
\end{aligned}$$

because the outer product of two vectors is the matrix $\mathbf u\mathbf v^\top$. For $\gamma\ge2$ all coefficients are $0$, so $\Phi^{1,j,\gamma}=0$.

**Hypothesis.** For some $l\in\{2,\dots,L-1\}$ the claim holds at level $l-1$.

**Step.** For $\gamma=1$ the coefficient vector $\mathbf e^1$ keeps only $\alpha=1$, and then the hypothesis (the only place it is used) gives

$$\begin{aligned}
\Phi^{l,j,1}&=\Phi^{l-1,2j-1,1}\otimes\Phi^{l-1,2j,1}\\
&=G^{\otimes2^{l-2}}\otimes G^{\otimes2^{l-2}}\\
&=G^{\otimes2^{l-1}}.
\end{aligned}$$

For $\gamma\ge2$ all coefficients are $0$, so $\Phi^{l,j,\gamma}=0$.

Step 2, the output: $\mathbf a^L=\mathbf e^1$ keeps only $\alpha=1$, and the claim at level $L-1$ gives

$$\begin{aligned}
\mathcal A&=\Phi^{L-1,1,1}\otimes\Phi^{L-1,2,1}\\
&=G^{\otimes2^{L-2}}\otimes G^{\otimes2^{L-2}}\\
&=G^{\otimes N/2},
\end{aligned}$$

since $2^{L-1}=N/2$. This is $\mathcal A_{f_G}$, so the network realizes $f_G$. When $L=2$ the middle layers do not exist and the claim is just the base, so the argument is unchanged.

Step 3, the size: every hidden width is $\rho$, and $\rho\le M$ because $G$ is $M\times M$. So $f_G$ lies in the deep class of width $\rho$, which is $O(M)$.

**In words.** Layer $0$ together with the first pooling builds $G$ on each adjacent pair, and every later layer just multiplies the results of neighbouring blocks. The network never has to hold more than the $\rho$ rank-one pieces of a single $G$.

**Sanity check.** For $G=I_M$ take $\mathbf u^\alpha$ and $\mathbf v^\alpha$ both equal to $\mathbf e^\alpha$, $\alpha\in[M]$: this is exactly the class assignment of Prop 6, and the network then realizes $f_{I_M}$, whose canonical matricization is $I_{M^{N/2}}$. For $N=4$ the deep network computes $\big(\sum_\alpha u^\alpha_{d_1}v^\alpha_{d_2}\big)\big(\sum_\alpha u^\alpha_{d_3}v^\alpha_{d_4}\big)=G_{d_1,d_2}G_{d_3,d_4}$.

**What to write in the exam.**

- Assignment (3 pts): layer $0$ gets $\mathbf u^\alpha$ on odd positions and $\mathbf v^\alpha$ on even ones; layer $1$ gets $\mathbf 1$ in channel $1$; higher layers and the output get $\mathbf e^1$ in channel $1$; all other channels are $\mathbf 0$.
- Base (2 pts): $\Phi^{1,j,1}=\sum_\alpha\mathbf u^\alpha(\mathbf v^\alpha)^\top$, which is $G$.
- Step and output (2 pts): $\Phi^{l,j,1}=\Phi^{l-1,2j-1,1}\otimes\Phi^{l-1,2j,1}$, which is $G^{\otimes2^{l-1}}$ by the hypothesis, hence $\mathcal A=G^{\otimes N/2}$.
- Size (1 pt): all widths are $\rho\le M$.

*Verified: the HT recursion with this assignment, and an independent layer-by-layer evaluation of the network (conv, then pairwise product pooling) on random inputs, both reproduce $f_G$ to machine precision for $(M,\rho,N)$ = (3,2,4), (3,2,8), (2,2,8), (4,3,4), (3,1,8), (2,1,4), (2,2,16).*

**4a. (5) Every shallow tensor has canonical rank at most $Z$**

**What is asked.** Prove that the canonical matricization of every CP tensor with $Z$ terms has rank at most $Z$, and deduce that the shallow network needs $Z\ge\rho^{N/2}$ to realize $f_G$. The answer is a proof.

**Tool and why.** Linearity of matricization, Lemma 3 and part 1, then subadditivity of the rank (cheat sheet §6; Lecture 2, proof of Prop 6). Each CP term is an outer product of vectors, which Lemma 3 turns into a Kronecker product of rank-one matrices.

**Definitions.** For one term write $\mathcal T_z:=\mathbf a^{z,1}\otimes\cdots\otimes\mathbf a^{z,N}$, so that $\mathcal A=\sum_za_z\mathcal T_z$.

**Solution.**

Step 1, group the factors in adjacent pairs: by associativity of the outer product,

$$\mathcal T_z=(\mathbf a^{z,1}\otimes\mathbf a^{z,2})\otimes(\mathbf a^{z,3}\otimes\mathbf a^{z,4})\otimes\cdots\otimes(\mathbf a^{z,N-1}\otimes\mathbf a^{z,N}),$$

an outer product of $N/2$ order-2 tensors.

Step 2, matricize one term: by Lemma 3 for canonical matricizations, applied repeatedly exactly as in part 2a (all orders are even),

$$[\![\mathcal T_z]\!]=\big(\mathbf a^{z,1}(\mathbf a^{z,2})^\top\big)\odot\big(\mathbf a^{z,3}(\mathbf a^{z,4})^\top\big)\odot\cdots\odot\big(\mathbf a^{z,N-1}(\mathbf a^{z,N})^\top\big),$$

because the canonical matricization of the order-2 tensor $\mathbf a\otimes\mathbf b$ is the matrix $\mathbf a\mathbf b^\top$.

Step 3, each term has rank at most $1$: every factor $\mathbf a\mathbf b^\top$ has rank at most $1$, so by part 1 the rank of $[\![\mathcal T_z]\!]$ is a product of numbers in $\{0,1\}$, hence at most $1$.

Step 4, sum over the terms: by linearity of matricization and subadditivity of the rank,

$$\begin{aligned}
\mathrm{rank}\,[\![\mathcal A]\!]&=\mathrm{rank}\sum_{z=1}^Za_z[\![\mathcal T_z]\!]\\
&\le\sum_{z=1}^Z\mathrm{rank}\,[\![\mathcal T_z]\!]\\
&\le Z.
\end{aligned}$$

Step 5, consequence for $f_G$: if the shallow network of width $Z$ realizes $f_G$, then its tensor is $\mathcal A_{f_G}$, and by part 2a and step 4

$$\rho^{N/2}=\mathrm{rank}\,[\![\mathcal A_{f_G}]\!]\le Z.$$

**In words.** Global product pooling multiplies one value per position, so each hidden unit computes a fully separable function, which has rank one under every cut. The width counts how many such pieces are added up, and a sum of $Z$ rank-one matrices has rank at most $Z$.

**Sanity check.** With $N=2$ the bound reads $\mathrm{rank}\le Z$ for $Z$ outer products of two vectors, which is the familiar fact about sums of rank-one matrices. Random CP tensors with $Z<M^{N/2}$ have canonical rank exactly $Z$, so the bound cannot be improved in general.

**What to write in the exam.**

- One term (2 pts): by Lemma 3, $[\![\mathcal T_z]\!]$ is a Kronecker product of the matrices $\mathbf a^{z,2j-1}(\mathbf a^{z,2j})^\top$, each of rank at most $1$.
- Part 1 (1 pt): so each term has rank at most $1$.
- Sum (1 pt): linearity and subadditivity give $\mathrm{rank}\,[\![\mathcal A]\!]\le Z$.
- Consequence (1 pt): realizing $f_G$ forces $Z\ge\rho^{N/2}$ by part 2a.

*Verified: random CP tensors with $(M,N,Z)$ = (3,4,5), (2,8,7), (3,4,9), (2,8,20) have canonical rank $5,7,9,16$ respectively, never above $Z$ (the last is capped by $2^4=16$).*

**4b. (4) Width $\rho^{N/2}$ suffices**

**What is asked.** Give explicit shallow weights with $Z=\rho^{N/2}$ that realize $f_G$, prove it, and compare with the deep network. The answer is a construction plus the conclusion.

**Tool and why.** Expanding a product of sums (distributivity), together with the CP form of the shallow network (cheat sheet §6). Each factor of $f_G$ is a sum of $\rho$ separable terms, and multiplying the $N/2$ factors out produces $\rho^{N/2}$ fully separable terms, which is exactly a CP decomposition.

**Definitions.** Index the hidden units by multi-indices $z=(\alpha_1,\dots,\alpha_{N/2})\in[\rho]^{N/2}$, so there are $\rho^{N/2}$ units. For unit $z$ set $a_z=1$, and for $j\in[N/2]$

$$\mathbf a^{z,2j-1}=\mathbf u^{\alpha_j},\qquad\mathbf a^{z,2j}=\mathbf v^{\alpha_j}.$$

**Solution.**

Step 1, each factor of $f_G$ is a sum: from $G=\sum_\alpha\mathbf u^\alpha(\mathbf v^\alpha)^\top$, entry by entry,

$$G_{d_{2j-1},d_{2j}}=\sum_{\alpha=1}^{\rho}u^\alpha_{d_{2j-1}}v^\alpha_{d_{2j}}.$$

Step 2, expand the product: multiplying the $N/2$ sums of step 1 and choosing one index $\alpha_j$ from each factor,

$$\begin{aligned}
f_G(d_1,\dots,d_N)&=\prod_{j=1}^{N/2}\sum_{\alpha=1}^{\rho}u^\alpha_{d_{2j-1}}v^\alpha_{d_{2j}}\\
&=\sum_{(\alpha_1,\dots,\alpha_{N/2})}\ \prod_{j=1}^{N/2}u^{\alpha_j}_{d_{2j-1}}v^{\alpha_j}_{d_{2j}}.
\end{aligned}$$

Step 3, this is the network output: with the assignment above, the term of unit $z$ is $\prod_j u^{\alpha_j}_{d_{2j-1}}v^{\alpha_j}_{d_{2j}}$, the entry of $\mathbf u^{\alpha_1}\otimes\mathbf v^{\alpha_1}\otimes\cdots\otimes\mathbf u^{\alpha_{N/2}}\otimes\mathbf v^{\alpha_{N/2}}$ at $(d_1,\dots,d_N)$. Summing over all $z$ with $a_z=1$ gives the right-hand side of step 2, so the network realizes $f_G$ with $Z=\rho^{N/2}$.

Step 4, the smallest shallow width: by part 4a no smaller $Z$ works, so the smallest width of a shallow network realizing $f_G$ is exactly $\rho^{N/2}$.

Step 5, comparison with the deep network: by part 3 the deep network realizes $f_G$ with all widths $\rho\le M$. For $\rho\ge2$ the shallow network needs

$$Z=\rho^{N/2}\ge2^{N/2},$$

which is exponential in $N$. In parameters (formula of class, Lecture 2, §2.2) the deep network has $MN\rho+(N-2)\rho^2+\rho$ parameters and the shallow one $(NM+1)\rho^{N/2}$.

**In words.** Without depth, the only way to build a product of $N/2$ coupled pairs is to multiply out every combination of the pieces of each pair. Depth lets the network form each pair once and then multiply the pairs, so the pieces never have to be combined explicitly.

**Sanity check.** For $\rho=1$ both networks need width $1$, and indeed $f_G$ is then a single product of one-variable factors, so there is no separation. For $(M,\rho,N)=(2,2,16)$ the deep network has $64+56+2=122$ parameters, while the shallow one has $33\cdot2^8=8448$.

**What to write in the exam.**

- Construction (2 pts): units indexed by $(\alpha_1,\dots,\alpha_{N/2})\in[\rho]^{N/2}$, filters $\mathbf u^{\alpha_j}$ at position $2j-1$ and $\mathbf v^{\alpha_j}$ at position $2j$, output weights $1$.
- Proof (1 pt): expanding $\prod_j\sum_\alpha u^\alpha_{d_{2j-1}}v^\alpha_{d_{2j}}$ gives exactly the sum of the units' products.
- Conclusion (1 pt): the minimal shallow width is $\rho^{N/2}$ against deep width $\rho$, exponential in $N$ for $\rho\ge2$.

*Verified: the $\rho^{N/2}$-term CP tensor equals $\mathcal A_{f_G}$ to machine precision for $(M,\rho,N)$ = (3,2,4), (2,2,8), (4,3,4), (3,3,4); the parameter counts 34, 74, 58, 69, 31, 11, 122 of the deep networks in part 3 match the formula $MN\rho+(N-2)\rho^2+\rho$.*

**5a. (5) The deep network and the palindrome**

**What is asked.** Prove that the deep network's tensors have rank at most $r_{L-1}$ under the halving partition, compute the separation rank of the palindrome under that partition, and deduce a lower bound on $r_{L-1}$. The answer is a proof and the value $M^{N/2}$.

**Tool and why.** The last line of the HT recursion with Lemma 3, then a direct look at the matricization of $P$ and Prop 7 (cheat sheet §6; Lecture 2, §2.7.1). The last pooling of the deep network joins the left half and the right half of the input only once, through $r_{L-1}$ channels, so the halving cut is exactly where its rank is limited.

**Definitions.** For a tensor $\mathcal T$ of order $n$, $\mathrm{vec}(\mathcal T)$ is the column vector $[\![\mathcal T]\!]_{[n]}$ (all modes in the rows). Write $n:=N/2$.

**Solution.**

Step 1, matricize one term of the last line: with $I=I_{half}$, which is $[n]$, and two tensors of order $n$, Lemma 3 has $I\cap[n]=[n]$ and $(I-n)\cap[n]=\emptyset$, so

$$[\![\Phi^{L-1,1,\alpha}\otimes\Phi^{L-1,2,\alpha}]\!]_{I_{half}}=\mathrm{vec}(\Phi^{L-1,1,\alpha})\odot\mathrm{vec}(\Phi^{L-1,2,\alpha})^\top.$$

Step 2, a column times a row: the Kronecker product of a column vector $\mathbf x$ and a row vector $\mathbf y^\top$ is the matrix $\mathbf x\mathbf y^\top$ (its $i$-th block is the row $x_i\mathbf y^\top$), whose rank is at most $1$.

Step 3, the bound: by linearity of matricization and subadditivity of the rank, summing the $r_{L-1}$ terms of the last line gives

$$\mathrm{rank}\,[\![\mathcal A]\!]_{I_{half}}\le r_{L-1}.$$

Step 4, the matricization of $P$: the row of $[\![\mathcal A_P]\!]_{I_{half}}$ is indexed by $(d_1,\dots,d_n)$ and the column by $(d_{n+1},\dots,d_N)$. Writing the condition $d_i=d_{N+1-i}$ with $i=n+1-k$ for $k\in[n]$, it says $d_{n+k}=d_{n+1-k}$, so the entry is $1$ exactly when the column tuple is the reversal of the row tuple,

$$(d_{n+1},\dots,d_N)=(d_n,d_{n-1},\dots,d_1),$$

and $0$ otherwise.

Step 5, its rank: reversal is a bijection of $[M]^n$, so every row has exactly one entry $1$ and every column has exactly one entry $1$. The matrix is therefore a permutation matrix of size $M^n$, which is invertible, and

$$\mathrm{rank}\,[\![\mathcal A_P]\!]_{I_{half}}=M^{N/2}.$$

Step 6, conclusion: by Prop 7, $\mathrm{sep}(P;I_{half})=M^{N/2}$, the largest possible value for an $M^{N/2}\times M^{N/2}$ matrix. If the deep network realizes $P$, then step 3 applied to $\mathcal A_P$ gives

$$M^{N/2}=\mathrm{rank}\,[\![\mathcal A_P]\!]_{I_{half}}\le r_{L-1}.$$

**In words.** The palindrome ties every position of the left half to its mirror image in the right half, so all of its dependence crosses the middle. The contiguous deep network sees the two halves interact only at the very last pooling, so all of that dependence has to pass through the $r_{L-1}$ channels there.

**Sanity check.** For $N=4$ and $M=2$,

$$P(d)=\mathbb 1[d_1=d_4]\,\mathbb 1[d_2=d_3],$$

and $[\![\mathcal A_P]\!]_{I_{half}}$ is the $4\times4$ permutation matrix sending $(d_1,d_2)$ to $(d_2,d_1)$, of rank $4$, which is $2^2$. The bound is also attainable in size: writing each indicator as $\sum_\alpha e^\alpha_{d_i}e^\alpha_{d_{N+1-i}}$ and expanding as in part 4b gives a shallow network of width $M^{N/2}$ for $P$, and by Prop 6(1) a deep network of width $M^{N/2}$ contains it.

**What to write in the exam.**

- Bound (2 pts): by Lemma 3 each term of the last HT line matricizes to $\mathrm{vec}(\Phi^{L-1,1,\alpha})\mathrm{vec}(\Phi^{L-1,2,\alpha})^\top$, of rank at most $1$, so the rank is at most $r_{L-1}$.
- Matricization of $P$ (2 pts): entry $1$ exactly when the column tuple is the reversal of the row tuple, so it is a permutation matrix of rank $M^{N/2}$.
- Conclusion (1 pt): $\mathrm{sep}(P;I_{half})=M^{N/2}$ by Prop 7, hence $r_{L-1}\ge M^{N/2}$.

*Verified: for random deep networks with $(M,N,r)$ = (2,8,2), (3,4,2), (2,8,1), (3,4,3) the halving rank never exceeds $r$; the halving matricization of $P$ is a permutation matrix of rank $M^{N/2}$ for $(M,N)$ = (2,4), (3,4), (2,8), (3,8).*

**5b. (3) Mirror pooling realizes the palindrome cheaply**

**What is asked.** Find a re-ordering $\pi$ of the input positions that turns $P$ into $f_{I_M}$, deduce that the deep network fed with the re-ordered input realizes $P$ with all widths $M$, and give a one-sentence interpretation. The answer is an explicit $\pi$, a short proof and one sentence.

**Tool and why.** Part 3 with $G=I_M$, and the inductive-bias discussion of class (cheat sheet §6; Lecture 2, §2.7.1). Feeding the network a re-ordered input is the same as choosing which positions are pooled together first.

**Definitions.** For $j\in[N/2]$ let $\pi(2j-1):=j$ and $\pi(2j):=N+1-j$, i.e. $\pi$ lists the positions in the order $1,N,2,N-1,\dots,N/2,N/2+1$.

**Solution.**

Step 1, $\pi$ is a permutation: the odd slots take the values $1,\dots,N/2$ and the even slots the values $N/2+1,\dots,N$, each exactly once.

Step 2, the identity: by the definition of $f_{I_M}$ and of $\pi$,

$$\begin{aligned}
f_{I_M}(d_{\pi(1)},\dots,d_{\pi(N)})&=\prod_{j=1}^{N/2}\mathbb 1\big[d_{\pi(2j-1)}=d_{\pi(2j)}\big]\\
&=\prod_{j=1}^{N/2}\mathbb 1\big[d_j=d_{N+1-j}\big]\\
&=P(d_1,\dots,d_N).
\end{aligned}$$

Step 3, the network: by part 3 with $G=I_M$ (so $\rho=M$, and $\mathbf u^\alpha$, $\mathbf v^\alpha$ both equal $\mathbf e^\alpha$), the deep network with all widths $M$ realizes $f_{I_M}$. Fed with $(d_{\pi(1)},\dots,d_{\pi(N)})$ it therefore outputs $P(d_1,\dots,d_N)$ by step 2. Its first pooling multiplies positions $j$ and $N+1-j$, i.e. it is the deep network with mirror pooling.

Step 4, interpretation: the dependencies a deep network models cheaply are those between positions pooled together early, so contiguous pooling favours local dependencies (part 5a: the palindrome costs width $M^{N/2}$) while mirror pooling favours mirror-symmetric ones (width $M$).

**In words.** Nothing about the palindrome is hard in itself; it is hard only for a network that pools the wrong positions together. Re-ordering the input changes which pairs meet first, and the same small network then suffices.

**Sanity check.** For $N=4$, $\pi$ lists $1,4,2,3$, and

$$f_{I_M}(d_1,d_4,d_2,d_3)=\mathbb 1[d_1=d_4]\,\mathbb 1[d_2=d_3],$$

which is $P$. This matches the class experiment, where mirror pooling won on the symmetry task and square pooling on the closedness task.

**What to write in the exam.**

- Permutation (1 pt): $\pi(2j-1)=j$, $\pi(2j)=N+1-j$, and then $f_{I_M}(d_{\pi(1)},\dots,d_{\pi(N)})=P(d)$.
- Network (1 pt): part 3 with $G=I_M$ gives width $M$ for the re-ordered input, i.e. mirror pooling.
- Interpretation (1 pt): positions pooled together early can be strongly dependent at low cost, so pooling geometry sets which dependencies are cheap.

*Verified: for $(M,N)$ = (2,4), (3,4), (2,8), (3,8), $P(d)=f_{I_M}(d_{\pi(1)},\dots,d_{\pi(N)})$ at every one of the $M^N$ inputs.*

**Common mistakes.**

- In part 1, quoting the SVD lemma that is being proved, or forgetting to show that $P\odot P'$ is invertible before saying that the rank is unchanged.
- In part 2b, writing only the factorization and not checking that $f_G\ne0$ (a separation rank can be $0$). In part 4a, bounding a single CP term and forgetting the subadditivity step, or bounding the rank of the Kronecker product by a sum instead of a product.
- In part 5a, using the canonical partition instead of $I_{half}$ (the deep network can have full canonical rank), or claiming the deep network is limited under every partition. In part 5b, applying $\pi$ in the wrong direction, which pairs $d_j$ with the wrong partner.

**💡 Useful tricks:** Rank of a Kronecker product: normal forms $PAQ=J_r$ plus the mixed product reduce everything to $J_r\odot J_s$, whose ones never share a row or column; canonical matricization of an outer product of even-order tensors is the Kronecker product of their matricizations, so $[\![G^{\otimes k}]\!]=G^{\odot k}$ with rank $\rho^k$; one explicit separable product plus "$f\ne0$" gives separation rank exactly $1$; the class assignment for $I_{M^{N/2}}$ works for any $G$ once layer $0$ carries its rank-one pieces; expanding a product of $N/2$ sums of $\rho$ terms gives the matching shallow upper bound $\rho^{N/2}$; the last HT line bounds the halving rank by $r_{L-1}$, and a permutation matrix has full rank.

**⚠️ Watch out:** in this course $\odot$ is the Kronecker product and $\otimes$ the outer product; Lemma 3's simple form $[\![\mathcal T\otimes\bar{\mathcal T}]\!]=[\![\mathcal T]\!]\odot[\![\bar{\mathcal T}]\!]$ needs both orders even; part 2b needs $N\ge4$ so that $N/2$ is even and no pair crosses the middle; the shallow bound holds under every partition, while the deep network's weakness is specific to $I_{half}$ — the part-3 network has rank $\rho^{N/2}$ under $I_{odd}$.

## Q2 — Symmetric factorization with an indefinite target (35)

**Hint:** The set $\{UU^\top\}$ is exactly the PSD cone, so part 1 asks for the PSD matrix
closest to an indefinite one — split $W^*$ into its positive and negative parts and ask which
cross-terms vanish and which have a sign. For the dynamics, guess that a commuting start keeps
$U$ diagonal in the basis $Q$, verify the guess solves the matrix ODE, and let uniqueness do
the rest. The resulting logistic-type scalar ODE can be solved or bounded with an integrating
factor; for small initialization, plug $t=c\ln(1/\alpha)$ into the closed form and watch which
power of $\alpha$ dominates.

**Full solution:**

**1. (7) The best the factorization can reach**

**What is asked.** Prove $\phi(U)\ge\sum_{\mu_r<0}\mu_r^2$ for every $U$, with equality exactly when $UU^\top=W^*_+$, and show that equality is attained. The answer is a proof.

**Tool and why.** Expand the squared Frobenius norm around $W^*_+$, as the hint suggests, and use the spectral decomposition and trace identities (cheat sheet §3). One cross term vanishes by orthogonality of eigenvectors; the other is non-negative because it is a trace against a PSD matrix.

**Definitions.** Let $W:=UU^\top$, and let $u_1,\dots,u_d$ be the columns of $U$. Write $\langle X,Y\rangle:=\mathrm{Tr}(X^\top Y)$ for the Frobenius inner product.

**Solution.**

Step 1, expansion: since $W^*=W^*_+-W^*_-$, the residual is $W-W^*_+$ plus $W^*_-$, and expanding the square gives

$$\begin{aligned}
\phi(U)&=\big\|(W-W^*_+)+W^*_-\big\|_F^2\\
&=\|W-W^*_+\|_F^2+2\langle W-W^*_+,W^*_-\rangle+\|W^*_-\|_F^2\\
&=\|W-W^*_+\|_F^2+2\langle W,W^*_-\rangle-2\langle W^*_+,W^*_-\rangle+\|W^*_-\|_F^2.
\end{aligned}$$

Step 2, the cross term between the two parts vanishes: using $\langle aa^\top,bb^\top\rangle=(a^\top b)^2$,

$$\langle W^*_+,W^*_-\rangle=-\sum_{\mu_r>0,\ \mu_s<0}\mu_r\mu_s\,(q_r^\top q_s)^2=0,$$

because in every term $r\ne s$ (their eigenvalues have opposite signs), so $q_r\perp q_s$.

Step 3, the other cross term is non-negative: by the cyclic property of the trace,

$$\langle W,W^*_-\rangle=\mathrm{Tr}(UU^\top W^*_-)=\mathrm{Tr}(U^\top W^*_-U)=\sum_{i=1}^du_i^\top W^*_-u_i\ge0,$$

each summand being non-negative because $W^*_-$ is PSD.

Step 4, the bound: drop the two non-negative terms of step 1,

$$\phi(U)\ge\|W^*_-\|_F^2=\boxed{\sum_{r:\,\mu_r<0}\mu_r^2}$$

The last equality holds because the squared Frobenius norm of a symmetric matrix is the sum of its squared eigenvalues, and the non-zero eigenvalues of $W^*_-$ are the numbers $-\mu_r$ with $\mu_r<0$.

Step 5, only if: if equality holds, both dropped terms are zero; in particular $\|W-W^*_+\|_F=0$, so $UU^\top=W^*_+$.

Step 6, if: if $UU^\top=W^*_+$, the first term is $0$, and $\langle W,W^*_-\rangle$ becomes $\langle W^*_+,W^*_-\rangle$, which is $0$ by step 2. So equality holds.

Step 7, attainment: the matrix

$$U^*:=\sum_{r:\,\mu_r>0}\sqrt{\mu_r}\,q_rq_r^\top$$

satisfies $U^*U^{*\top}=W^*_+$, because $q_r^\top q_s$ is $1$ when $r=s$ and $0$ otherwise. By step 6 the minimum is attained at $U^*$.

**In words.** $UU^\top$ ranges over PSD matrices only. The best PSD approximation keeps the positive part of $W^*$ and replaces the negative eigenvalues by $0$, and the price is exactly the sum of the squared negative eigenvalues. The loss $L$ itself has minimum $0$ at $W^*$, but $W^*$ is not PSD, so the factorization cannot reach it.

**Sanity check.** With $\mu=(3,1,0,-2)$ the bound is $(-2)^2$, which is $4$. The value $\phi(U^*)$ computes to exactly $4$, and $20000$ random matrices $U$ never go below $4$.

**What to write in the exam.**

- Expansion (2 pts): write $\phi$ as $\|W-W^*_+\|_F^2$ plus the cross and constant terms of step 1.
- Cross term (1 pt): $\langle W^*_+,W^*_-\rangle=0$ by orthogonality of the $q_r$.
- Sign (2 pts): $\langle W,W^*_-\rangle=\sum_iu_i^\top W^*_-u_i$, non-negative because $W^*_-$ is PSD.
- Equality (2 pts): equality forces $\|W-W^*_+\|_F=0$; conversely $W=W^*_+$ attains it, for example through $U^*=\sum_{\mu_r>0}\sqrt{\mu_r}q_rq_r^\top$.

*Verified: random orthogonal $Q$ and $\mu=(3,1,0,-2)$: $\phi(U^*)=4$ to $10^{-12}$, and a random search over $20000$ matrices $U$ stays above $4$ (best value $5.92$).*

**2a. (3) The gradient of $\phi$**

**What is asked.** Prove $\nabla\phi(U)=4(UU^\top-W^*)U$. The answer is a derivation.

**Tool and why.** Expand $\phi(U+E)$ to first order in a perturbation $E$ and read the gradient off the linear term (cheat sheet §7, gradient flow), using trace identities (cheat sheet §3).

**Definitions.** Let $R:=UU^\top-W^*$, the residual. It is symmetric because $W^*$ is symmetric, and this is what turns two different-looking terms into the same one.

**Solution.**

Step 1, perturb the product:

$$(U+E)(U+E)^\top=UU^\top+UE^\top+EU^\top+EE^\top.$$

Step 2, perturb the loss: put $\Delta:=UE^\top+EU^\top+EE^\top$. Then $L(W+\Delta)-L(W)$ equals $2\langle R,\Delta\rangle+\|\Delta\|_F^2$, and the parts with $EE^\top$ or $\|\Delta\|_F^2$ are $O(\|E\|_F^2)$. So

$$\phi(U+E)-\phi(U)=2\langle R,\ UE^\top+EU^\top\rangle+O(\|E\|_F^2).$$

Step 3, the first cross term, by the cyclic trace and $R^\top=R$:

$$\langle R,UE^\top\rangle=\mathrm{Tr}(R^\top UE^\top)=\mathrm{Tr}(E^\top RU)=\langle RU,E\rangle.$$

Step 4, the second cross term, by the cyclic trace:

$$\langle R,EU^\top\rangle=\mathrm{Tr}(R^\top EU^\top)=\mathrm{Tr}(U^\top R^\top E)=\langle RU,E\rangle.$$

Step 5, read off: the linear term is $2\cdot2\langle RU,E\rangle$, that is $\langle4RU,E\rangle$, so

$$\nabla\phi(U)=4RU=\boxed{4(UU^\top-W^*)U}$$

**In words.** $U$ appears twice in $UU^\top$, and each appearance contributes $2RU$; the symmetry of the residual makes the two contributions identical.

**Sanity check.** For $d=1$, $\phi(u)=(u^2-w)^2$ has derivative $2(u^2-w)\cdot2u$, which is $4(u^2-w)u$, the scalar version of the formula.

**What to write in the exam.**

- Expand to first order: the linear term is $2\langle R,UE^\top+EU^\top\rangle$, with $R=UU^\top-W^*$.
- Both inner products equal $\langle RU,E\rangle$, the first one because $R$ is symmetric.
- Hence $\nabla\phi(U)=4(UU^\top-W^*)U$.

*Verified: a central finite difference on a random $4\times4$ matrix $U$ in a random direction $E$ agrees with $\langle\nabla\phi(U),E\rangle$ to $5\cdot10^{-9}$.*

**2b. (6) A commuting start stays commuting**

**What is asked.** Prove that $U(t)$ keeps the form $Q\,\mathrm{diag}(u(t))\,Q^\top$ with the stated scalar ODEs, and that the eigenvalues $\lambda_r=u_r^2$ of $W(t)$ obey $\dot\lambda_r=8\lambda_r(\mu_r-\lambda_r)$. The answer is a proof.

**Tool and why.** Guess and verify, plus uniqueness of ODE solutions: build a candidate of the stated form, check that it solves the gradient-flow ODE, and uniqueness says it is the solution. This is the commuting case of the eigenvalue dynamics of matrix factorization (cheat sheet §8).

**Definitions.** Let $u_r(\cdot)$ solve $\dot u_r=-4(u_r^2-\mu_r)u_r$ from the given $u_r(0)$ (it exists by the standing assumption), and set

$$\tilde U(t):=Q\,\mathrm{diag}(u(t))\,Q^\top.$$

This is the candidate.

**Solution.**

Step 1, the residual of the candidate: since $Q^\top Q=I$, $\tilde U\tilde U^\top$ is $Q\,\mathrm{diag}(u_r^2)\,Q^\top$. Subtracting $W^*=Q\,\mathrm{diag}(\mu_r)\,Q^\top$,

$$\tilde U\tilde U^\top-W^*=Q\,\mathrm{diag}(u_r^2-\mu_r)\,Q^\top.$$

Step 2, the gradient at the candidate: by part 2a and $Q^\top Q=I$,

$$\begin{aligned}
\nabla\phi(\tilde U)&=4\,Q\,\mathrm{diag}\big((u_r^2-\mu_r)u_r\big)\,Q^\top\\
&=-Q\,\mathrm{diag}(\dot u_r)\,Q^\top\\
&=-\dot{\tilde U}.
\end{aligned}$$

The second line is the scalar ODE, and the third holds because $Q$ does not depend on $t$.

Step 3, uniqueness: $\tilde U$ solves $\dot U=-\nabla\phi(U)$ and $\tilde U(0)=U(0)$, so $U\equiv\tilde U$. This proves that the eigenbasis $Q$ stays fixed; it is not an assumption.

Step 4, the matrix $W$: by step 1 with $U\equiv\tilde U$, $W(t)=Q\,\mathrm{diag}(u_r^2)\,Q^\top$. So $W(t)$ has the eigenvectors $q_r$ and the eigenvalues $\lambda_r=u_r^2$.

Step 5, the eigenvalue ODE: by the chain rule and the scalar ODE,

$$\dot\lambda_r=2u_r\dot u_r=-8u_r^2(u_r^2-\mu_r)=8\lambda_r(\mu_r-\lambda_r).$$

**In words.** When $U(0)$ shares the eigenvectors of $W^*$, the gradient shares them too, so the flow only moves the eigenvalues. The $d$ directions decouple into $d$ independent scalar problems.

**Sanity check.** It agrees with the course's eigenvalue formula for symmetric factorization,

$$\dot\lambda_r=4\lambda_r\langle-\nabla L(W),q_rq_r^\top\rangle.$$

With $\nabla L=2(W-W^*)$ the inner product is $-2(\lambda_r-\mu_r)$, which gives $8\lambda_r(\mu_r-\lambda_r)$.

**What to write in the exam.**

- Candidate (2 pts): $\tilde U=Q\,\mathrm{diag}(u)\,Q^\top$, with each $u_r$ solving its scalar ODE.
- Verification (2 pts): by part 2a, $\nabla\phi(\tilde U)$ is diagonal in the basis $Q$ with entries $4(u_r^2-\mu_r)u_r$, that is, it equals $-\dot{\tilde U}$.
- Uniqueness (1 pt): same initial value, so $U\equiv\tilde U$.
- Eigenvalues (1 pt): $\dot\lambda_r=2u_r\dot u_r$, which gives $8\lambda_r(\mu_r-\lambda_r)$.

*Verified: Euler integration (step $10^{-5}$, up to $t=1$) of the matrix flow with random $Q$ and $\mu=(3,1,0,-2)$: $Q^\top UQ$ stays diagonal to $3\cdot10^{-15}$, and the eigenvalues of $W$ match the closed forms of part 3 to $10^{-6}$.*

**3a. (2) Zero stays zero, positive stays positive**

**What is asked.** Show $\lambda\equiv0$ when $\lambda_0=0$, and $\lambda(t)>0$ for all $t$ when $\lambda_0>0$. The answer is a proof.

**Tool and why.** Uniqueness for the first claim. For the second, an integrating factor shows that $\lambda$ is $\lambda_0$ times an exponential, so it keeps its sign; this is the sign preservation of multiplicative dynamics (cheat sheet §8).

**Definitions.** For the given solution $\lambda$, put

$$G(t):=8\int_0^t\big(\mu-\lambda(s)\big)\,ds,$$

the accumulated growth rate. Then $\dot G=8(\mu-\lambda)$ and $G(0)=0$.

**Solution.**

Step 1, the case $\lambda_0=0$: the constant function $0$ solves the ODE, because both sides vanish, and it has the right initial value. By uniqueness it is the solution.

Step 2, the integrating factor: by the product rule and the ODE,

$$\frac{d}{dt}\big[\lambda e^{-G}\big]=e^{-G}\big(\dot\lambda-8\lambda(\mu-\lambda)\big)=0.$$

Step 3, conclusion: $\lambda e^{-G}$ is constant, equal to its value $\lambda_0$ at $t=0$, so $\lambda(t)=\lambda_0e^{G(t)}$. If $\lambda_0>0$ this is positive for all $t$, since an exponential is positive.

**In words.** The rate of change of $\lambda$ is proportional to $\lambda$ itself, so $\lambda$ can approach $0$ but can never reach or cross it.

**Sanity check.** Step 3 with $\lambda_0=0$ gives $\lambda\equiv0$ again, consistent with step 1.

**What to write in the exam.**

- If $\lambda_0=0$: the function $\lambda\equiv0$ solves the ODE, so by uniqueness it is the solution.
- If $\lambda_0>0$: with $G=8\int_0^t(\mu-\lambda)$, the product $\lambda e^{-G}$ has zero derivative, so $\lambda(t)=\lambda_0e^{G(t)}$, which is positive.

*Verified: Euler runs for $\mu\in\{-2,-0.5,0,0.5,3\}$ and $\lambda_0$ from $10^{-8}$ to $5$: $\lambda$ stays positive, and $\lambda e^{-G}$ stays within $0.3\%$ of $\lambda_0$ (the Euler error).*

**3b. (4) Closed form for $\mu>0$**

**What is asked.** For $\mu>0$ and $\lambda_0>0$, prove the logistic closed form and deduce $\lambda(t)\to\mu$. The answer is a verification plus a limit.

**Tool and why.** Guess and verify again: check that the formula satisfies the ODE and the initial condition, and uniqueness does the rest (cheat sheet §8, scalar factorization dynamics). We must also check that the denominator never vanishes; otherwise the formula would not be a solution on all of $[0,\infty)$.

**Definitions.** The denominator and the candidate:

$$D(t):=\lambda_0+(\mu-\lambda_0)e^{-8\mu t},\qquad\Lambda(t):=\frac{\mu\lambda_0}{D(t)}.$$

**Solution.**

Step 1, $D$ is positive: if $\mu\ge\lambda_0$, the second term of $D$ is non-negative, so $D\ge\lambda_0$, which is positive. If $\mu<\lambda_0$, then $\mu-\lambda_0$ is negative and $e^{-8\mu t}\in(0,1]$ because $\mu t\ge0$, so

$$D(t)\ge\lambda_0+(\mu-\lambda_0)=\mu>0.$$

Step 2, the initial value: $D(0)=\mu$, so $\Lambda(0)=\lambda_0$.

Step 3, the derivative of the candidate: $\dot D=-8\mu(\mu-\lambda_0)e^{-8\mu t}$, so

$$\dot\Lambda=-\frac{\mu\lambda_0\dot D}{D^2}=\frac{8\mu^2\lambda_0(\mu-\lambda_0)e^{-8\mu t}}{D^2}.$$

Step 4, the right-hand side at the candidate: $\mu D-\mu\lambda_0$ equals $\mu(\mu-\lambda_0)e^{-8\mu t}$, so

$$8\Lambda(\mu-\Lambda)=\frac{8\mu\lambda_0}{D}\cdot\frac{\mu D-\mu\lambda_0}{D}=\frac{8\mu^2\lambda_0(\mu-\lambda_0)e^{-8\mu t}}{D^2}.$$

Step 5, uniqueness: by steps 2 to 4, $\Lambda$ solves the same initial-value problem as $\lambda$, so $\lambda=\Lambda$.

Step 6, the limit: $e^{-8\mu t}\to0$ because $\mu>0$, so $D(t)\to\lambda_0$, and $\lambda(t)\to\mu\lambda_0/\lambda_0$, which is $\mu$.

**In words.** This is logistic growth: $\lambda$ grows (or shrinks) toward the level $\mu$. Each eigenvalue of $W$ converges to the matching eigenvalue of the target.

**Sanity check.** If $\lambda_0=\mu$, then $D\equiv\mu$ and $\lambda\equiv\mu$: starting at the target, the flow stays there.

**What to write in the exam.**

- Positivity of $D$ (1 pt): $D\ge\min\{\lambda_0,\mu\}$, which is positive.
- Verification (2 pts): $\Lambda(0)=\lambda_0$, and both $\dot\Lambda$ and $8\Lambda(\mu-\Lambda)$ equal $8\mu^2\lambda_0(\mu-\lambda_0)e^{-8\mu t}/D^2$; uniqueness gives $\lambda=\Lambda$.
- Limit (1 pt): $e^{-8\mu t}\to0$, so $\lambda\to\mu$.

*Verified: sympy simplifies $\dot\Lambda-8\Lambda(\mu-\Lambda)$ to $0$ and gives $\Lambda(0)=\lambda_0$; the Euler flow of part 2b matches the formula to $10^{-6}$.*

**3c. (3) Decay for $\mu<0$ and for $\mu=0$**

**What is asked.** For $\lambda_0>0$, prove the exponential bound when $\mu<0$, the exact formula when $\mu=0$, and that $\lambda\to0$ in both cases. The answer is a proof.

**Tool and why.** For $\mu<0$, a comparison argument with an integrating factor: we only need an upper bound, so we may drop a non-positive term. For $\mu=0$, guess and verify with uniqueness (cheat sheet §8).

**Definitions.** No new notation.

**Solution.**

Step 1, the case $\mu<0$, dropping a term: by part 3a, $\lambda>0$, so $-8\lambda^2\le0$ and

$$\dot\lambda=8\mu\lambda-8\lambda^2\le8\mu\lambda.$$

Step 2, the integrating factor:

$$\frac{d}{dt}\big[\lambda e^{-8\mu t}\big]=e^{-8\mu t}\big(\dot\lambda-8\mu\lambda\big)\le0,$$

so $\lambda e^{-8\mu t}$ is non-increasing and stays at most its initial value $\lambda_0$.

Step 3, the bound:

$$\lambda(t)\le\lambda_0e^{8\mu t}=\lambda_0e^{-8|\mu|t}\to0.$$

Step 4, the case $\mu=0$: the ODE is $\dot\lambda=-8\lambda^2$. The candidate $\lambda_0/(1+8\lambda_0t)$ has initial value $\lambda_0$ and

$$\frac{d}{dt}\frac{\lambda_0}{1+8\lambda_0t}=-\frac{8\lambda_0^2}{(1+8\lambda_0t)^2}=-8\Big(\frac{\lambda_0}{1+8\lambda_0t}\Big)^2,$$

so by uniqueness it is the solution. Its denominator grows without bound, so it tends to $0$, but only like $\tfrac{1}{8t}$.

**In words.** A non-positive target eigenvalue pushes the direction toward $0$. With $\mu<0$ the push is linear in $\lambda$ and the decay is exponential; with $\mu=0$ only the quadratic term acts and the decay is slow.

**Sanity check.** In the simulation of part 2b: for $\mu=0$ and $\lambda_0=0.49$ the formula gives $\lambda(1)\approx0.0996$, as does the matrix flow; for $\mu=-2$ and $\lambda_0=0.16$ the flow gives $\lambda(1)\approx1.67\cdot10^{-8}$, below the bound $0.16e^{-16}$, which is about $1.80\cdot10^{-8}$.

**What to write in the exam.**

- Case $\mu<0$ (2 pts): $\lambda>0$ gives $\dot\lambda\le8\mu\lambda$; the integrating factor $e^{-8\mu t}$ then gives $\lambda(t)\le\lambda_0e^{-8|\mu|t}$.
- Case $\mu=0$ (1 pt): check that $\lambda_0/(1+8\lambda_0t)$ solves $\dot\lambda=-8\lambda^2$ with the right initial value, and invoke uniqueness.
- Both tend to $0$, the second only like $1/t$.

*Verified: sympy confirms the formula for $\mu=0$; Euler runs for $\mu\in\{-2,-0.5\}$ stay below $\lambda_0e^{-8|\mu|t}$ at every step.*

**3d. (2) Convergence to $W^*_+$, and why $u_r(0)\ne0$ matters**

**What is asked.** Show $W(t)\to W^*_+$ and $\phi(U(t))\to\min\phi$ when every $u_r(0)$ is non-zero, and that this assumption cannot be dropped. The answer is a proof plus a counterexample.

**Tool and why.** Combine parts 2b, 3b and 3c with the minimum value from part 1. For the necessity, part 3a (zero stays zero) produces a stationary point that is not a minimum (cheat sheet §7, critical points and saddles).

**Definitions.** No new notation.

**Solution.**

Step 1, a positive start: $\lambda_r(0)=u_r(0)^2$, so $u_r(0)\ne0$ gives $\lambda_r(0)>0$ for every $r$.

Step 2, the limit of each eigenvalue: by part 3b, $\lambda_r\to\mu_r$ when $\mu_r>0$; by part 3c, $\lambda_r\to0$ when $\mu_r\le0$.

Step 3, the limit of $W$: by part 2b,

$$W(t)=\sum_r\lambda_r(t)q_rq_r^\top\to\sum_{r:\,\mu_r>0}\mu_rq_rq_r^\top=W^*_+.$$

Step 4, the limit of $\phi$: $W(t)$ and $W^*$ share the eigenvectors $q_r$, so

$$\phi(U(t))=\sum_r(\lambda_r(t)-\mu_r)^2\to\sum_{r:\,\mu_r<0}\mu_r^2=\min\phi.$$

Positive directions contribute $0$ in the limit, the others contribute $\mu_r^2$, and the last equality is part 1.

Step 5, necessity: take $r$ with $\mu_r>0$ (one exists, because $W^*$ is indefinite) and $u_r(0)=0$. By part 3a, $\lambda_r\equiv0$. For every $s$ with $\mu_s<0$ we have $\lambda_s\ge0$, so $(\lambda_s-\mu_s)^2\ge\mu_s^2$. Hence for all $t$

$$\phi(U(t))\ge\mu_r^2+\sum_{s:\,\mu_s<0}\mu_s^2>\min\phi.$$

For example $U(0)=0$ is a stationary point, since $\nabla\phi(0)=0$, and the flow never leaves it.

**In words.** Each positive direction is learned as long as it starts with some mass. A direction that starts at exactly zero has no gradient along it and stays dead. The negative directions are switched off, because $UU^\top$ cannot become negative there.

**Sanity check.** From $u(0)=(0.5,-0.3,0.7,0.4)$ with $\mu=(3,1,0,-2)$, at $t=8$ the value of $\phi$ is $4.0002$ (the minimum is $4$), and the remaining distance to $W^*_+$ is $0.015$. That is the slow direction with $\mu=0$: $\lambda(8)=0.49/32.36$, about $0.0151$. With $u_1(0)=0$ the decoupled scalar ODEs keep $\phi\ge13$. In floating point the rotated matrix flow does escape this point, because round-off seeds the dead direction; this shows the point is an unstable saddle, which is not required.

**What to write in the exam.**

- Convergence (1 pt): all $\lambda_r(0)>0$, so by parts 3b and 3c $\lambda_r\to\max\{\mu_r,0\}$; hence $W(t)\to W^*_+$ and $\phi\to\sum_{\mu_r<0}\mu_r^2$, the minimum from part 1.
- Necessity (1 pt): if $\mu_r>0$ and $u_r(0)=0$, then $\lambda_r\equiv0$ and $\phi\ge\mu_r^2+\min\phi$ for all $t$; for example $U(0)=0$ is stationary.

*Verified: Euler flow up to $t=8$ gives $\phi=4.0002$ (minimum $4$); with $u_1(0)=0$, the decoupled scalar ODEs give $\phi(t)\ge13$ for all $t$ up to $20$.*

**4a. (5) Small initialization: one eigenvalue at a time**

**What is asked.** With $U(0)=\alpha I_d$ and $t_\alpha=c\ln(1/\alpha)$, show $\lambda_1(t_\alpha)\to\mu_1$ and $\lambda_2(t_\alpha)\to0$ as $\alpha\to0^+$, and $\lambda_r(t)\le\alpha^2$ whenever $\mu_r\le0$. The answer is a proof.

**Tool and why.** $\alpha I_d$ equals $Q(\alpha I_d)Q^\top$, a commuting start, so parts 2b and 3b apply. Substituting $t_\alpha$ turns the exponential into a power of $\alpha$, and the sign of that power decides the limit (cheat sheet §8, scalar factorization dynamics). For $\mu_r\le0$ a monotonicity argument is enough.

**Definitions.** For $\mu>0$ let

$$e_\mu:=8\mu c-2,$$

the exponent of $\alpha$ that will appear in the denominator. The two conditions on $c$ say exactly that $e_{\mu_1}>0$ and $e_{\mu_2}<0$.

**Solution.**

Step 1, the start: $U(0)=Q(\alpha I_d)Q^\top$, so $u_r(0)=\alpha$ and $\lambda_r(0)=\alpha^2$, which is positive.

Step 2, from exponential to power:

$$e^{-8\mu t_\alpha}=e^{-8\mu c\ln(1/\alpha)}=\alpha^{8\mu c}.$$

Step 3, the closed form at $t_\alpha$: apply part 3b with $\lambda_0=\alpha^2$ and $\mu=\mu_r$, then divide numerator and denominator by $\alpha^2$:

$$\lambda_r(t_\alpha)=\frac{\mu\alpha^2}{\alpha^2+(\mu-\alpha^2)\alpha^{8\mu c}}=\frac{\mu}{1+(\mu-\alpha^2)\alpha^{e_\mu}}.$$

As $\alpha\to0^+$, the factor $\mu-\alpha^2$ tends to $\mu$, which is positive.

Step 4, the index $r=1$: $c>\frac{1}{4\mu_1}$ gives $e_{\mu_1}>0$, so $\alpha^{e_{\mu_1}}\to0$, the denominator tends to $1$, and $\lambda_1(t_\alpha)\to\mu_1$.

Step 5, the index $r=2$: $c<\frac{1}{4\mu_2}$ gives $e_{\mu_2}<0$, so $\alpha^{e_{\mu_2}}\to\infty$. The denominator tends to $\infty$, since its factor $\mu_2-\alpha^2$ tends to $\mu_2$, which is positive. So $\lambda_2(t_\alpha)\to0$.

Step 6, the case $\mu_r\le0$: by part 3a, $\lambda_r\ge0$, so $\mu_r-\lambda_r\le0$ and, by the ODE, $\dot\lambda_r\le0$. Hence $\lambda_r$ is non-increasing, and $\lambda_r(t)\le\lambda_r(0)$, which is $\alpha^2$.

**In words.** Starting from $\alpha^2$, direction $r$ needs time about $\ln(1/\alpha)/(4\mu_r)$ to grow. At a time between the two thresholds, the larger eigenvalue has already been learned and the smaller one has not yet started.

**Sanity check.** With $\mu_1=3$, $\mu_2=1$ and $c$ the midpoint $\tfrac16$ of the allowed interval: at $\alpha=10^{-8}$, $\lambda_1(t_\alpha)\approx3.000$ and $\lambda_2(t_\alpha)\approx4.6\cdot10^{-6}$.

**What to write in the exam.**

- Positive $\mu$ (4 pts): by part 3b, $\lambda_r(t_\alpha)$ equals $\mu$ divided by $1+(\mu-\alpha^2)\alpha^{8\mu c-2}$; the exponent $8\mu_1c-2$ is positive and $8\mu_2c-2$ is negative, so the limits are $\mu_1$ and $0$.
- Non-positive $\mu$ (1 pt): $\lambda_r\ge0$ and $\mu_r\le0$ give $\dot\lambda_r\le0$, so $\lambda_r(t)\le\alpha^2$.

*Verified: the closed form at $t_\alpha$ with $\mu_1=3$, $\mu_2=1$, $c=\tfrac16$ and $\alpha=10^{-2},10^{-4},10^{-8},10^{-16}$: $\lambda_1$ tends to $3$, and $\lambda_2$ takes the values $0.044$, $0.0021$, $4.6\cdot10^{-6}$, $2.2\cdot10^{-11}$.*

**4b. (3) Low rank along the way, and the direct flow**

**What is asked.** Interpret part 4a through the rank of $W(t)$ along the trajectory and at its end, and contrast it with gradient flow run directly on $L$ from $W(0)=\alpha^2I_d$, solving that flow. The answer is an explanation plus an explicit solution.

**Tool and why.** The incremental-learning picture of matrix factorization (Lecture 8, Thm 1; cheat sheet §8 and §12): the factor $\lambda_r$ in $\dot\lambda_r$ makes small eigenvalues stall. The direct flow is a linear ODE, solved by an exponential.

**Definitions.** The half-time $t^{1/2}_r$ is the time at which $\lambda_r$ reaches $\mu_r/2$; it measures when direction $r$ is learned.

**Solution.**

Step 1, the half-time: in part 3b, $\lambda=\mu/2$ exactly when $D=2\lambda_0$, that is, when $(\mu-\lambda_0)e^{-8\mu t}=\lambda_0$. With $\lambda_0=\alpha^2$,

$$t^{1/2}_r=\frac{1}{8\mu_r}\ln\frac{\mu_r-\alpha^2}{\alpha^2}\approx\frac{\ln(1/\alpha)}{4\mu_r}.$$

Step 2, the picture along the trajectory: each positive eigenvalue sits on a plateau near $\alpha^2$ until about $t^{1/2}_r$, then rises sharply to $\mu_r$. A larger $\mu_r$ means an earlier rise, so with small $\alpha$ the directions are learned one at a time, largest first. $W(t)$ passes close to matrices of rank $1$, then rank $2$, and so on (incremental learning, the "rich get richer" mechanism of Lecture 8, Thm 1).

Step 3, the end point: directions with $\mu_r\le0$ never exceed $\alpha^2$ (part 4a), so the limit is $W^*_+$. Its rank is the number of positive $\mu_r$, which is less than $d$ because $W^*$ has a negative eigenvalue.

Step 4, the direct flow: $\nabla L(W)=2(W-W^*)$, so $\dot W=-2(W-W^*)$. The difference $W-W^*$ satisfies a linear ODE with rate $2$, so

$$\boxed{W(t)=W^*+e^{-2t}\big(\alpha^2I_d-W^*\big)}$$

Step 5, its eigenvalues: in the basis $Q$ they are $\mu_r+e^{-2t}(\alpha^2-\mu_r)$. All directions relax at the same rate $2$, whatever $\mu_r$ is: no plateau and no ordering. The limit is $W^*$ itself, negative eigenvalues included, so there is no low-rank bias (the depth-one case of Lecture 8).

**In words.** Factorizing $W=UU^\top$ makes the speed of each direction proportional to its current size, so tiny directions wait while large ones race ahead; this rich-get-richer effect is what produces low rank. Without the factorization every direction moves at the same speed.

**Sanity check.** With $\alpha=10^{-4}$ the half-times are $0.81$ for $\mu=3$ and $2.30$ for $\mu=1$, close to the approximations $0.77$ and $2.30$. The direct flow from $\alpha^2I_d$ is within $10^{-8}$ of $W^*$ by $t=10$.

**What to write in the exam.**

- Interpretation (2 pts): each $\lambda_r$ stays near $\alpha^2$ for time about $\ln(1/\alpha)/(4\mu_r)$ and then rises, so directions are learned one at a time, largest $\mu_r$ first; $W(t)$ passes near rank $1,2,\dots$ and ends at $W^*_+$, whose rank is below $d$.
- Contrast (1 pt): $\dot W=-2(W-W^*)$ gives $W(t)=W^*+e^{-2t}(\alpha^2I_d-W^*)$; all directions relax at rate $2$ and the limit is $W^*$, with no low-rank bias.

*Verified: half-times from the closed form ($0.81$ and $2.30$ at $\alpha=10^{-4}$, where $\lambda$ equals $\mu/2$ exactly); Euler on the direct flow reaches distance $8\cdot10^{-9}$ from $W^*$ at $t=10$.*

**Common mistakes.**

- In part 1, claiming $\langle W,W^*_-\rangle\ge0$ "because both matrices are positive" without the trace argument, or skipping the "only if" direction.
- In part 2b, assuming the eigenbasis stays fixed instead of proving it through uniqueness, or dropping the factor $2$ in $\frac{d}{dt}u^2$; in part 2a, not invoking the symmetry of $W^*$.
- In parts 3 and 4, verifying the closed form without showing that its denominator stays positive, claiming that the factorized flow converges to $W^*$, or getting the sign of the exponent $8\mu c-2$ wrong.

**💡 Useful tricks:** $\{UU^\top\}$ = PSD cone; split $W^*=W^*_+-W^*_-$: the cross-term vanishes by orthogonality and $\mathrm{Tr}(UU^\top P)=\sum_iu_i^\top Pu_i$, which is non-negative; guess a solution of the matrix ODE (diagonal in $Q$), verify it, invoke uniqueness; integrating factor $e^{-\int}$ for sign preservation and for the comparison bound when $\mu<0$; plug $t=c\ln(1/\alpha)$ into the logistic closed form and compare the exponent $8\mu c-2$ with $0$.

**⚠️ Watch out:** (1) prove the "only if" — equality forces $\|W-W^*_+\|_F=0$; (2) the factor $4$ needs symmetry of $W^*$, and the fixed eigenbasis must come from uniqueness, not be assumed; (3) verify the closed form *and* that its denominator never vanishes; $\mu=0$ decays only like $1/t$; (3d) a zero initial coordinate stays zero — the flow can stall at a saddle; (4) the factorized limit is the PSD projection $W^*_+$, not $W^*$; the direct flow has no plateau and no ordering.

## Q3 — Generalization of deep networks via per-layer covers and norm buckets (30)

**Hint:** Control the size of every hidden representation first — each layer multiplies the
norm by at most $M$ and the activation never increases it. Then walk from $\theta$ to $\theta'$
one layer at a time: changing one layer perturbs that layer's output by a bounded amount, and
the layers above it amplify it by a bounded factor. Covering each layer's ball with the right
resolution turns that into a sup-norm cover of the whole class; the finite-class reminder plus
the usual two-sided Lipschitz transfer gives part 2. For part 3, you cannot fix $M$ in advance
— so fix *all* the dyadic $M$'s in advance and pay for each with a summable share of $\delta$.

**Full solution:**

**1. (8) Lipschitzness in the parameters**

**What is asked.** Prove that for $\theta,\theta'\in\Theta_M$ the sup-distance between $f_\theta$ and $f_{\theta'}$ over $\mathcal X$ is at most $M^{K-1}\sum_k\|W_k-W'_k\|_F$. The answer is a proof.

**Tool and why.** As the hint says: first bound the hidden representations, then telescope through hybrid parameter vectors that change one layer at a time. This is the parameter-Lipschitz step behind every covering argument (cheat sheet §10).

**Definitions.** The hidden representations are $g_0(x):=x$ and $g_k(x):=\sigma(W_kg_{k-1}(x))$ for $k\le K-1$, so that $f_\theta=W_Kg_{K-1}$; $g'_k$ is the same with $\theta'$. The hybrids are

$$\theta^{(j)}:=(W'_1,\dots,W'_j,W_{j+1},\dots,W_K),\qquad j\in\{0,\dots,K\},$$

with the first $j$ layers taken from $\theta'$ and the rest from $\theta$. So $\theta^{(0)}=\theta$ and $\theta^{(K)}=\theta'$, and consecutive hybrids differ in one layer only. Every $\theta^{(j)}$ lies in $\Theta_M$, because each of its layers comes from $\theta$ or from $\theta'$.

**Solution.**

Step 1, two facts about $\sigma$: being $1$-Lipschitz entrywise gives $\|\sigma(z)-\sigma(z')\|_2\le\|z-z'\|_2$. Taking $z'=0$ and using $\sigma(0)=0$ also gives $\|\sigma(z)\|_2\le\|z\|_2$.

Step 2, hidden norms. **Claim.** $\|g_k(x)\|_2\le M^k$ for every $x\in\mathcal X$ and all parameters in $\Theta_M$. The induction is on $k$. The base $\|g_0(x)\|_2\le1$ is the definition of $\mathcal X$. The step uses step 1, the given norm inequality, and the hypothesis:

$$\|g_k(x)\|_2\le\|W_kg_{k-1}(x)\|_2\le\|W_k\|_F\|g_{k-1}(x)\|_2\le M\cdot M^{k-1}.$$

Step 3, telescoping:

$$f_\theta-f_{\theta'}=\sum_{j=1}^K\big(f_{\theta^{(j-1)}}-f_{\theta^{(j)}}\big).$$

Step 4, one layer, common input: $\theta^{(j-1)}$ and $\theta^{(j)}$ share layers $1,\dots,j-1$ (those of $\theta'$), so layer $j$ receives the same input $z:=g'_{j-1}(x)$ in both, and $\|z\|_2\le M^{j-1}$ by step 2.

Step 5, the case $j=K$: the outputs are $W_Kz$ and $W'_Kz$, so they differ by at most $\|W_K-W'_K\|_FM^{K-1}$.

Step 6, the case $j<K$: the post-activations $a:=\sigma(W_jz)$ and $a':=\sigma(W'_jz)$ satisfy, by step 1,

$$\|a-a'\|_2\le\|(W_j-W'_j)z\|_2\le\|W_j-W'_j\|_FM^{j-1}.$$

Both are fed into the same map, because the layers above $j$ come from $\theta$ in both hybrids:

$$F(v):=W_K\sigma\big(W_{K-1}\cdots\sigma(W_{j+1}v)\cdots\big).$$

$F$ applies $K-j$ linear maps, each of which moves two points apart by at most a factor $M$, interleaved with $1$-Lipschitz activations. So $F$ is $M^{K-j}$-Lipschitz, and

$$\big|f_{\theta^{(j-1)}}(x)-f_{\theta^{(j)}}(x)\big|\le M^{K-j}M^{j-1}\|W_j-W'_j\|_F=M^{K-1}\|W_j-W'_j\|_F.$$

Step 7, the sum: the triangle inequality over $j$ in step 3, followed by the sup over $x\in\mathcal X$, gives the claim.

**In words.** Changing layer $j$ by $\Delta$ moves its output by at most $\Delta$ times the size of its input, $M^{j-1}$, and the layers above amplify this by at most $M^{K-j}$. The two factors multiply to $M^{K-1}$, whatever $j$ is.

**Sanity check.** The constant is tight. Take a scalar chain (all widths $1$), ReLU, the input $x=1$, $W_k=M$ for every $k$, and change only the first layer to $W'_1=M-\Delta$. Then $f_\theta-f_{\theta'}=M^K-(M-\Delta)M^{K-1}$, which is $\Delta M^{K-1}$, exactly the bound.

**What to write in the exam.**

- Hidden norms (2 pts): $\|g_k(x)\|_2\le M^k$ by induction, using $\|\sigma(z)\|\le\|z\|$ and $\|Wz\|\le\|W\|_F\|z\|$.
- Hybrids (2 pts): $\theta^{(j)}$ takes the first $j$ layers from $\theta'$; all hybrids lie in $\Theta_M$ and telescope from $\theta$ to $\theta'$.
- One layer (3 pts): a common input of norm at most $M^{j-1}$, a change of at most $\|W_j-W'_j\|_FM^{j-1}$, amplified by at most $M^{K-j}$.
- Sum (1 pt): the triangle inequality over $j$, then the sup over $x$.

*Verified: 3000 random ReLU networks of depth $1$ to $5$, $20$ inputs each: the ratio of the left side to the right side is at most $0.9999$, the scalar chain gives ratio $1$, and the hidden norms never exceed $M^k$.*

**2. (8) A product cover, and the bound for a fixed $M$**

**What is asked.** Build an $\epsilon$-cover $\mathcal F_M\subseteq\mathcal H_M$ in sup norm with at most $(3KM^K/\epsilon)^P$ elements, and deduce the uniform bound over $\Theta_M$. The answer is a construction and a proof.

**Tool and why.** Cover each layer's Frobenius ball separately and take the product; part 1 converts parameter distance into sup distance. Then apply the finite-class bound on the cover and the Lipschitz transfer that costs $2\rho\epsilon$ (cheat sheet §10, covering and Lipschitz transfer; §2, finite class).

**Definitions.** The per-layer resolution is

$$\eta:=\frac{\epsilon}{KM^{K-1}},$$

chosen so that $K$ layers, each off by $\eta$, move the output by at most $M^{K-1}K\eta$, which is $\epsilon$. For each $k$ let $C_k$ be the cover from the reminder of the Frobenius ball of radius $M$ in $\mathbb R^{n_k\times n_{k-1}}$, at resolution $\eta$.

**Solution.**

Step 1, the resolution is allowed: the reminder needs $\eta\in(0,M]$, and $\eta\le M$ is equivalent to $\epsilon\le KM^K$, which is assumed.

Step 2, the cover:

$$\mathcal F_M:=\{f_{\tilde\theta}:\tilde\theta\in C_1\times\dots\times C_K\}.$$

It lies in $\mathcal H_M$, because each $C_k$ lies inside the ball of radius $M$.

Step 3, its size: the reminder gives $|C_k|\le(3M/\eta)^{n_kn_{k-1}}$, and the exponents add up to $P$:

$$|\mathcal F_M|\le\prod_{k=1}^K\Big(\frac{3M}{\eta}\Big)^{n_kn_{k-1}}=\Big(\frac{3M}{\eta}\Big)^{P}=\boxed{\Big(\frac{3KM^K}{\epsilon}\Big)^{P}}$$

Step 4, it covers: given $\theta\in\Theta_M$, pick $\tilde W_k\in C_k$ with $\|W_k-\tilde W_k\|_F\le\eta$ for each $k$. Both $\theta$ and $\tilde\theta$ lie in $\Theta_M$, so part 1 gives

$$\sup_{x\in\mathcal X}|f_\theta(x)-f_{\tilde\theta}(x)|\le M^{K-1}K\eta=\epsilon.$$

Step 5, the finite class: $\mathcal F_M$ depends only on $M$, $\epsilon$ and the architecture, not on $S$, so the reminder applies. With probability at least $1-\delta$, every $\tilde\theta$ in the product satisfies

$$L_D(\tilde\theta)-L_S(\tilde\theta)\le\sqrt{\frac{\ln(2|\mathcal F_M|/\delta)}{2N}},$$

and by step 3,

$$\ln(2|\mathcal F_M|/\delta)\le P\ln(3KM^K/\epsilon)+\ln(2/\delta).$$

Step 6, the transfer: $\ell$ is $\rho$-Lipschitz in its first argument, so pointwise

$$\big|\ell(f_\theta(x),y)-\ell(f_{\tilde\theta}(x),y)\big|\le\rho\epsilon.$$

Averaging over $D$ and over $S$ gives $|L_D(\theta)-L_D(\tilde\theta)|\le\rho\epsilon$ and $|L_S(\theta)-L_S(\tilde\theta)|\le\rho\epsilon$. So on the event of step 5, for every $\theta\in\Theta_M$,

$$L_D(\theta)-L_S(\theta)\le\big[L_D(\tilde\theta)-L_S(\tilde\theta)\big]+2\rho\epsilon,$$

which together with step 5 is the claim.

**In words.** The infinite class is replaced by a finite grid whose functions are within $\epsilon$ of every network. The grid is uniformly good by the finite-class bound, and each network is within $\rho\epsilon$ in loss of its grid point, once in $L_D$ and once in $L_S$.

**Sanity check.** For $K=1$, a linear predictor, $\eta=\epsilon$ and the size is $(3M/\epsilon)^{n_0}$, the plain covering number of the ball. For $K=3$, $M=2$ and $\epsilon=0.1$: $\eta=\tfrac{1}{120}$, and $KM^{K-1}\eta$ is $0.1$, as designed.

**What to write in the exam.**

- Resolution (1 pt): $\eta=\epsilon/(KM^{K-1})$, which is at most $M$ because $\epsilon\le KM^K$.
- Cover (3 pts): the product of the per-layer covers has size at most $(3M/\eta)^P$, which is $(3KM^K/\epsilon)^P$; part 1 gives sup-distance at most $K\eta M^{K-1}$, which is $\epsilon$.
- Finite class (2 pts): the cover does not depend on $S$; apply the reminder, where $\ln(2|\mathcal F_M|/\delta)$ is at most $P\ln(3KM^K/\epsilon)+\ln(2/\delta)$.
- Transfer (2 pts): $\rho\epsilon$ for $L_D$ and $\rho\epsilon$ for $L_S$, in total $2\rho\epsilon$.

*Verified: the identities $(3M/\eta)^P=(3KM^K/\epsilon)^P$ and $KM^{K-1}\eta=\epsilon$ for several choices of $K$, $M$, $\epsilon$, $P$; part 1 was checked numerically above.*

**3. (8) Norm buckets**

**What is asked.** Prove the bound for all $\theta$ simultaneously, with the bucket index $j(\theta)$, and show $j(\theta)\le\log_2\max\{1,2M(\theta)\}$. The answer is a proof.

**Tool and why.** Structural risk minimization: apply part 2 to the fixed radii $2^j$ with confidence levels $\delta_j$ that sum to $\delta$, then take a union bound (cheat sheet §2, SRM and the weights $\delta_k$; §11, norm-adaptive bound via a union over radii). The radii are fixed before seeing the data, which is what makes the union legitimate.

**Definitions.** For $j\in\mathbb N_0$,

$$M_j:=2^j,\qquad\delta_j:=\delta\,2^{-(j+1)}.$$

The $\delta_j$ form a geometric series, so $\sum_{j\ge0}\delta_j=\delta$.

**Solution.**

Step 1, part 2 applies to every bucket: it needs $\epsilon\le KM_j^K$. Indeed $\epsilon\le1$, $1\le K$, and $K\le KM_j^K$ because $M_j\ge1$. So with probability at least $1-\delta_j$, for all $\theta\in\Theta_{2^j}$,

$$L_D(\theta)-L_S(\theta)\le\sqrt{\frac{P\ln(3K2^{jK}/\epsilon)+\ln(2/\delta_j)}{2N}}+2\rho\epsilon.$$

Step 2, the union bound: the probability that the event of some bucket fails is at most $\sum_j\delta_j$, which is $\delta$. So all the events hold together with probability at least $1-\delta$.

Step 3, rewriting the logarithms:

$$\begin{aligned}
P\ln\frac{3K2^{jK}}{\epsilon}&=P\ln\frac{3K}{\epsilon}+jKP\ln2,\\
\ln\frac{2}{\delta_j}&=\ln\frac{2}{\delta}+(j+1)\ln2.
\end{aligned}$$

Step 4, instantiation: every $\theta$ has a finite $M(\theta)$, so $j(\theta)$ exists, and $M(\theta)\le2^{j(\theta)}$ means $\theta\in\Theta_{2^{j(\theta)}}$. On the joint event, the bound of bucket $j(\theta)$ applies to $\theta$, and by step 3 it is exactly the stated bound. This holds for every $\theta$ at once.

Step 5, the bucket index: if $M(\theta)\le1$ then $j(\theta)=0$, and $0\le\log_2\max\{1,2M\}$ because the maximum is at least $1$. Otherwise $j(\theta)=\lceil\log_2M(\theta)\rceil$, the smallest integer $j$ with $2^j\ge M(\theta)$; since $2M(\theta)$ is then above $2$, the maximum is $2M(\theta)$, and

$$j(\theta)<\log_2M(\theta)+1=\log_2\big(2M(\theta)\big)=\log_2\max\{1,2M(\theta)\}.$$

**In words.** We cannot choose $M$ after seeing the trained network, so we prepare a bound for every dyadic radius in advance and pay for bucket $j$ with the share $2^{-(j+1)}$ of the failure probability. Inside the root this costs only $(j+1)\ln2$.

**Sanity check.** For $M(\theta)=2.5$: $j=2$, and $\log_25\approx2.32$, so the inequality holds. For $M(\theta)=4$: $j=2$, and $\log_28$ is $3$.

**What to write in the exam.**

- Grid (2 pts): radii $2^j$ with $\delta_j=\delta2^{-(j+1)}$, summing to $\delta$; part 2 applies since $\epsilon\le1$ and $K\le KM_j^K$.
- Union (2 pts): all bucket events hold together with probability at least $1-\delta$; the radii do not depend on $S$.
- Instantiation (2 pts): $\theta\in\Theta_{2^{j(\theta)}}$; expand the logarithms into $P\ln(3K/\epsilon)+jKP\ln2$ and $\ln(2/\delta)+(j+1)\ln2$.
- Bucket index (2 pts): $j=0$ if $M\le1$, and otherwise $j=\lceil\log_2M\rceil$, which is less than $\log_2(2M)$.

*Verified: the two logarithm identities for $j=0,\dots,5$ (to $10^{-9}$), $\sum_j\delta_j=\delta$ over $60$ terms, and $j(\theta)\le\log_2\max\{1,2M\}$ for $M\in\{0,0.3,1,1.0001,2,2.5,4,10^3,10^6\}$.*

**4a. (3) The bound vanishes as $N\to\infty$**

**What is asked.** With $\epsilon=1/\sqrt N$, show that the bound tends to $0$ for every fixed $\theta$, and describe how it depends on $K$ and on $M(\theta)$. The answer is a limit and a scaling statement.

**Tool and why.** Substitute and compare growth rates: a logarithm grows slower than any power (cheat sheet §11, norm-adaptive bounds). The bound on $j(\theta)$ from part 3 turns the dependence on $j$ into a dependence on $M(\theta)$.

**Definitions.** Write $j:=j(\theta)$, which is fixed when $\theta$ is fixed.

**Solution.**

Step 1, $\epsilon$ is admissible: $1/\sqrt N\in(0,1]$ for every $N\ge1$.

Step 2, substitution: $\ln(3K/\epsilon)$ becomes $\ln(3K\sqrt N)$, so the bound reads

$$\sqrt{\frac{P\ln(3K\sqrt N)+jKP\ln2+(j+1)\ln2+\ln(2/\delta)}{2N}}+\frac{2\rho}{\sqrt N}.$$

Step 3, the limit: with $\theta$, $K$, $P$, $\rho$ and $\delta$ fixed, the numerator is $\tfrac P2\ln N$ plus a constant, so it is $O(\ln N)$. The first term is therefore $O(\sqrt{\ln N/N})$ and the second is $2\rho/\sqrt N$; both tend to $0$.

Step 4, the dependence on $M(\theta)$: by part 3, $j\ln2\le\ln\max\{1,2M(\theta)\}$, so $jKP\ln2\le KP\ln\max\{1,2M(\theta)\}$. The bound is therefore of order

$$\sqrt{\frac{P\big(K\ln\max\{1,2M(\theta)\}+\ln(K\sqrt N)\big)}{N}}.$$

Step 5, reading it: the depth $K$ multiplies the log-norm term inside the root, so the bound grows like $\sqrt K$; this comes from the $M^K$ Lipschitz constant. The learned norm enters only logarithmically.

**In words.** For a fixed network the price of the data-dependent bucket is a constant, and the price of the cover grows only like $\ln N$, so dividing by $N$ wins.

**Sanity check.** With $P=100$, $K=3$, $M(\theta)=3$, $\rho=1$ and $\delta=0.05$, the bound is $0.77$ at $N=10^3$, $0.084$ at $N=10^5$ and $0.0091$ at $N=10^7$: it drops by roughly $\sqrt{100}$ for every factor $100$ in $N$, as predicted.

**What to write in the exam.**

- Substitution: $\epsilon=1/\sqrt N$ turns $P\ln(3K/\epsilon)$ into $P\ln(3K\sqrt N)$.
- Limit (2 pts): for fixed $\theta$ the numerator is $O(\ln N)$, so the bound is $O(\sqrt{\ln N/N})$, which tends to $0$.
- Scaling (1 pt): the bound is of the order shown in step 4, linear in $K$ inside the root and logarithmic in $M(\theta)$.

*Verified: the bound evaluated at $N=10^3,10^5,10^7,10^9$ for the values above: $0.766$, $0.084$, $0.0091$, $0.0010$.*

**4b. (3) Why buckets help, and why the bound is still uninformative**

**What is asked.** In at most four sentences: why part 3 is preferable to part 2 with a single $M$ for a trained $\hat\theta$, and why the bound is nevertheless uninformative for overparameterized networks. The answer is a short explanation.

**Tool and why.** The SRM logic of part 3 for the first question (cheat sheet §11), and the course's discussion of vacuous uniform-convergence bounds and random-label fitting for the second (cheat sheet §12).

**Definitions.** No new notation.

**Solution.**

Step 1, the fixed-$M$ dilemma: part 2 needs $M$ chosen before the data. A small $M$ may fall below $\|\hat W_k\|_F$, and then the bound says nothing about $\hat\theta$; a huge $M$ costs $PK\ln M$ for norms that training never used.

Step 2, what part 3 buys: the data choose the bucket, at the additive price $(j+1)\ln2$, so the bound adapts to the learned norm (SRM, Lecture 6).

Step 3, vacuity: the numerator contains $P\ln(3K\sqrt N)$, which is at least $P\ln3$, so the bound is at least $\sqrt{P\ln3/(2N)}$, about $0.74\sqrt{P/N}$. This exceeds $1$, and is therefore vacuous for a loss with values in $[0,1]$, as soon as $P$ is about twice $N$; overparameterized networks have $P\gg N$.

Step 4, the connection to class: such networks can fit random labels (Lectures 6–7), so no bound that depends only on the class and its parameter count can be small. A meaningful bound must depend on properties of the trained network and of the data, induced by the algorithm: implicit regularization, compressibility, flatness or PAC-Bayes.

**In words.** Bucketing solves the choice of $M$, but not the dependence on $P$; counting parameters is the wrong currency in the overparameterized regime.

**Sanity check.** With $P=10^6$, $N=5\cdot10^4$, $K=10$ and $M(\theta)=2$, the bound is about $12.6$, far above the trivial value $1$.

**What to write in the exam.**

- A fixed $M$ must be chosen before the data, so it is either too small to cover $\hat\theta$ or so large that it costs $PK\ln M$; part 3 lets the data choose the bucket at the price $(j+1)\ln2$ (SRM).
- The bound is at least of order $\sqrt{P/N}$, so it exceeds $1$ (vacuous) when $P\gg N$, which is exactly the overparameterized regime.
- As discussed in class (random labels are fitted), a meaningful bound must depend on the trained network and the algorithm's implicit bias, not on parameter counts.
- Grading: 1 point for each of the three ideas, minus 1 for more than four sentences.

*Verified: at $P=10^6$, $N=5\cdot10^4$, $K=10$, $M=2$ the bound evaluates to $12.56$, and the lower estimate $\sqrt{P\ln3/(2N)}$ to $3.31$.*

**Common mistakes.**

- In part 1, getting $M^K$ instead of $M^{K-1}$ (the changed layer contributes $\|W_j-W'_j\|_F$, not $M$), using the norm inequality in the wrong direction, or forgetting that the hybrids must lie in $\Theta_M$ for the hidden-norm bound.
- In part 2, covering each layer at resolution $\epsilon$ (this loses the factor $KM^{K-1}$), building the cover from $\hat\theta$ (data-dependent), or paying $\rho\epsilon$ only once.
- In part 3, splitting $\delta$ uniformly over infinitely many buckets (impossible) or forgetting to check $\epsilon\le KM_j^K$; in part 4b, not saying that the bound is vacuous when $P\gg N$.

**💡 Useful tricks:** Bound hidden norms by $M^k$ first, then telescope through hybrids changing one layer at a time ⇒ Lipschitz constant $M^{K-1}$ per layer; cover each layer at resolution $\epsilon/(KM^{K-1})$ and take the product ⇒ $(3KM^K/\epsilon)^P$; finite-class bound + $2\rho\epsilon$ transfer; dyadic radii $2^j$ with $\delta_j=\delta2^{-(j+1)}$ ⇒ a bound adapted to the learned norm at a $(j+1)\ln2$ price.

**⚠️ Watch out:** (1) use $\|Wz\|\le\|W\|_F\|z\|$ and keep the hybrid inside $\Theta_M$ — the exponent is $K-1$, not $K$; (2) the per-layer resolution must shrink with depth, and the cover must not depend on $S$; pay $\rho\epsilon$ twice; (3) infinitely many buckets need a summable $\delta_j$; check $\epsilon\le KM_j^K$; (4) the bound vanishes for fixed $\theta$ but is vacuous when $P\gg N$ — say why.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of that
  sub-part.
- Common traps to check: Q1.1 quoting the SVD lemma being proved, or not showing $P\odot P'$ invertible; Q1.2b not checking
  $f_G\ne0$; Q1.3 an assignment of the wrong width or no induction over the levels; Q1.4a no subadditivity
  step; Q1.4b missing the matching upper bound; Q1.5a using $I_{odd}$ instead of $I_{half}$; Q1.5b $\pi$
  applied in the wrong direction; Q2.1 missing "only if"; Q2.2b assuming the eigenbasis is fixed instead of proving
  it via uniqueness; Q2.3b closed form not verified or denominator not shown positive; Q2.3d
  claiming convergence to $W^*$; Q2.4 sign of the exponent $8\mu c-2$; Q3.1 exponent $K$
  instead of $K-1$ or wrong norm inequality; Q3.2 data-dependent cover or single
  $\rho\epsilon$; Q3.3 non-summable $\delta_j$; Q3.4b no mention of the $P\gg N$ vacuity.
