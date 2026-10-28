# Mock Exam 8 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_08.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-10-28 (Q1: closed form vs. direct recursion on random RNNs;
symmetric→diagonal re-parameterization exact to $10^{-11}$; Hankel ranks: random elements of
$\mathcal S(\mathcal H_d^{diag})$ have $\mathrm{rank}\,H_{d+1}=d$ and the witness
$\sum_{i\le d+1} i^k$ has rank $d+1$, $d=1,\dots,5$; best least-squares fit of $(-1)^k$ by
non-negative exponential sums has residual $\ge 1$ for $d=L-1$ and $\approx 10^{-13}$ for
$d=L$, $L=3,\dots,6$; rotation sequence equals $\cos(k\pi/3)$, has Hankel rank $2$, and its
real two-node fits on $c_0,\dots,c_3$ have residual $\ge0.2236$ (infimum, approached only as the two nodes merge at $1$); the recurrence system has $s=\tau=1$, discriminant $-3$. Q2: finite-difference
gradient check; Euler (step $10^{-5}$) on the matrix flow with random $Q$ and
$\mu=(3,1,0,-2)$: $Q^\top UQ$ stays diagonal to $10^{-14}$, eigenvalues match the closed forms
to $3\cdot10^{-5}$, limit $W^*_+$; random search never goes below $\sum_{\mu_r<0}\mu_r^2=4$;
small-init limits at $t_\alpha$ for $\alpha=10^{-2},\dots,10^{-16}$; direct flow converges to
$W^*$. Q3: Lipschitz-in-parameters lemma on 3000 random ReLU nets of depth $1$–$5$ — max ratio
$1.000$, attained on a scalar chain; cover-count arithmetic and $j(\theta)\le\log_2\max\{1,2M\}$).

## Q1 — Linear RNNs: exponential sums, Hankel rank and rotations (40)

**Hint:** Everything flows from the useful fact: the hypothesis is a *linear* functional, so
compare it with $|x_1|$ at two mirror-image points. For diagonal (and, after an orthogonal
change of basis, symmetric) transitions, ask what $C^\top A^k B$ looks like as a function of
$k$ — each eigenvalue contributes one geometric term. For the Hankel matrix, look for a
factorization through a $d$-dimensional space indexed by the eigenvalues. For the
non-negative case, think of $k$ as a continuous variable and count sign changes. For the
rotation, any two-term exponential sum obeys a two-term linear recurrence — what does that
recurrence's characteristic polynomial look like?

**Full solution:**

**1. (8) Quantitative non-universality**

**What is asked.** Show that every linear RNN, of every state dimension, is at sup-distance at least $1$ from $f(x)=|x_1|$ on the cube, that the value $1$ is attained, and conclude that the union of the classes is not universal. The answer is a proof.

**Tool and why.** The useful fact makes every $h$ a linear functional of $x$, and a linear functional is odd, while $|x_1|$ is even. Comparing the two at the mirror points $e_1$ and $-e_1$ forces an error. The conclusion is then read off the definition of universality (cheat sheet §4).

**Definitions.** Let $a_t$ be the coefficient of $x_t$:

$$a_t:=C^\top A^{L-t}B,\qquad t\in[L],$$

so that $h(x)=\sum_ta_tx_t$. Only $a_1$ will matter, because the mirror points move only the coordinate $x_1$.

**Solution.**

Step 1, the mirror points are admissible: all coordinates of $e_1$ and $-e_1$ lie in $\{-1,0,1\}$, so both points lie in $[-1,1]^L$.

Step 2, the values at the mirror points: by the useful fact, $h(e_1)=a_1$ and $h(-e_1)=-a_1$. By definition of $f$, $f(e_1)=1$ and $f(-e_1)=1$.

Step 3, the bound: the sup over the cube is at least the larger of the two errors at these points, a maximum is at least an average, and then the triangle inequality applies:

$$\begin{aligned}
\sup_{x\in[-1,1]^L}|h(x)-f(x)|&\ge\max\{|a_1-1|,\ |a_1+1|\}\\
&\ge\tfrac12\big(|1-a_1|+|1+a_1|\big)\\
&\ge\tfrac12\big|(1-a_1)+(1+a_1)\big|\\
&=1.
\end{aligned}$$

In the first line, the error at $-e_1$ is $|-a_1-1|$, which is $|a_1+1|$. Nothing about $d$, $A$, $B$ or $C$ was used except linearity, so the bound holds for every $d$ and every $h\in\mathcal H_d$.

Step 4, attainment: take $C=0$ and any $A$, $B$. Then $h\equiv0$, which is in $\mathcal H_d$, and

$$\sup_{x\in[-1,1]^L}\big|0-|x_1|\big|=1,$$

attained at $x=e_1$. So the constant $1$ cannot be improved.

Step 5, conclusion: universality (Lecture 2, Def 1) would require, for this continuous $f$ on the compact cube and for every $\epsilon>0$, some $h$ in the class with sup-error at most $\epsilon$. Every $h\in\bigcup_d\mathcal H_d$ lies in some $\mathcal H_d$, so by step 3 its error is at least $1$. With $\epsilon=\tfrac12$ no $h$ qualifies, so $\bigcup_d\mathcal H_d$ is not universal. In particular $f\notin\mathcal H_d$ for every $d$.

**In words.** A linear map must give opposite answers at $e_1$ and $-e_1$, while $|x_1|$ gives the same answer $1$ at both. Whatever $h$ outputs at $e_1$, it misses $1$ by at least $1$ at one of the two points.

**Sanity check.** For $a_1=1$ the network is exact at $e_1$, but the error at $-e_1$ is $|-1-1|$, which is $2$. For $a_1=0$ both errors equal $1$. So the smallest possible value of $\max\{|a_1-1|,|a_1+1|\}$ is $1$, at $a_1=0$, which is the attained value of step 4.

**What to write in the exam.**

- Mirror points (3 pts): $h$ is linear, $h(\pm e_1)=\pm a_1$, while $f(\pm e_1)=1$.
- Inequality (2 pts): the error is at least $\max\{|a_1-1|,|a_1+1|\}$, which is at least $1$ by averaging and the triangle inequality.
- Attainment (1 pt): $C=0$ gives $h\equiv0$, with error exactly $1$.
- Conclusion (2 pts): the bound holds for every $h$ in every $\mathcal H_d$, so accuracy $\tfrac12$ is impossible and the union is not universal.

*Verified: 2000 random RNNs ($d\le4$, $L=5$): the closed form matches the recursion, and $\max\{|a_1-1|,|a_1+1|\}$ never drops below $1$ (smallest value found $1.000$).*

**2a. (4) Diagonal transitions give exponential sums**

**What is asked.** Prove that the reversed coefficient sequences of diagonal RNNs are exactly the sequences $c_k=\sum_ip_i\lambda_i^k$, in both directions, and the same with $\lambda\in\mathbb R^d_{\ge0}$ for $\mathcal H_d^{diag+}$. The answer is a two-sided set equality.

**Tool and why.** Powers of a diagonal matrix act entrywise (cheat sheet §3, matrix powers). This turns $C^\top A^kB$ into an explicit sum, and the converse is a direct construction.

**Definitions.** For $A=\mathrm{diag}(\lambda)$ put $p_i:=C_iB_i$, the weight with which the eigenvalue $\lambda_i$ enters. We introduce it because $B_i$ and $C_i$ only ever appear through this product.

**Solution.**

Step 1, powers of a diagonal matrix: by induction on $k$, $A^k=\mathrm{diag}(\lambda_1^k,\dots,\lambda_d^k)$. This includes $k=0$, where both sides are $I_d$ with the convention $0^0=1$.

Step 2, inclusion $\subseteq$: by step 1,

$$c_k=C^\top A^kB=\sum_{i=1}^dC_i\lambda_i^kB_i=\sum_{i=1}^dp_i\lambda_i^k,$$

so the sequence of any $h\in\mathcal H_d^{diag}$ has the stated form, with these $p$ and $\lambda$.

Step 3, inclusion $\supseteq$: given $p,\lambda\in\mathbb R^d$, choose $A=\mathrm{diag}(\lambda)$, $B=\mathbf 1$ and $C=p$. Then $C_iB_i$ is exactly the given $p_i$, and step 2 gives $c_k=\sum_ip_i\lambda_i^k$. The hypothesis is in $\mathcal H_d^{diag}$ because $A$ is diagonal.

Step 4, the non-negative class: step 2 applied to a diagonal $A$ with non-negative entries gives $\lambda\in\mathbb R^d_{\ge0}$. In step 3, if the given $\lambda$ is non-negative, then $A=\mathrm{diag}(\lambda)$ has a non-negative diagonal, so the construction stays in $\mathcal H_d^{diag+}$.

**In words.** In the eigenbasis each state coordinate evolves on its own and is multiplied by $\lambda_i$ at every step, so each coordinate contributes one geometric sequence to the coefficients.

**Sanity check.** For $d=1$ and $A=(a)$ the sequence is $c_k=CBa^k$, the geometric progression of the cheat sheet's geometric-sequence rank trick.

**What to write in the exam.**

- Inclusion $\subseteq$ (2 pts): $A^k=\mathrm{diag}(\lambda_i^k)$, so $c_k=\sum_iC_iB_i\lambda_i^k$; set $p_i=C_iB_i$.
- Inclusion $\supseteq$ (2 pts): take $A=\mathrm{diag}(\lambda)$, $B=\mathbf 1$, $C=p$.
- Non-negative class: the same two lines with $\lambda\in\mathbb R^d_{\ge0}$; the constructed $A$ has a non-negative diagonal.

*Verified: 500 random diagonal RNNs ($d=4$, $L=5$): $C^\top A^kB$ equals $\sum_iC_iB_i\lambda_i^k$ to machine precision.*

**2b. (4) Symmetric equals diagonal**

**What is asked.** Prove $\mathcal H_d^{sym}=\mathcal H_d^{diag}$ as classes of functions. The answer is two inclusions.

**Tool and why.** The spectral theorem for symmetric matrices and matrix powers through the eigendecomposition (cheat sheet §3). The orthogonal change of basis can be absorbed into $B$ and $C$, which are free parameters.

**Definitions.** For a symmetric $A$, write $A=VDV^\top$ with $V$ orthogonal and $D$ real diagonal. We need $V$ to move the RNN into the eigenbasis of $A$.

**Solution.**

Step 1, inclusion $\mathcal H_d^{diag}\subseteq\mathcal H_d^{sym}$: every diagonal matrix is symmetric.

Step 2, powers: since $V^\top V=I$, induction on $k$ gives $A^k=VD^kV^\top$. The base $k=0$ holds because $VV^\top=I$, and the step is

$$A^{k+1}=VD^kV^\top VDV^\top=VD^{k+1}V^\top.$$

Step 3, absorb $V$: for every $k$,

$$c_k=C^\top VD^kV^\top B=(V^\top C)^\top D^k(V^\top B).$$

Step 4, inclusion $\mathcal H_d^{sym}\subseteq\mathcal H_d^{diag}$: the triple $(D,V^\top B,V^\top C)$ has a diagonal transition and, by step 3, the same reversed coefficient sequence as $(A,B,C)$, hence computes the same function.

**In words.** A symmetric RNN is a diagonal RNN written in rotated coordinates for the state. Rotating the input vector $B$ and the output vector $C$ back removes the difference.

**Sanity check.** Take $A=\begin{pmatrix}0&1\\1&0\end{pmatrix}$, with eigenvalues $1$ and $-1$, and $B=e_1$, $C=e_1$. The sequence $c_k=e_1^\top A^ke_1$ is $1,0,1,0,\dots$, and indeed it equals $\tfrac12\cdot1^k+\tfrac12(-1)^k$, a diagonal realization with two terms.

**What to write in the exam.**

- Inclusion $\mathcal H_d^{diag}\subseteq\mathcal H_d^{sym}$ (1 pt): diagonal matrices are symmetric.
- Inclusion $\mathcal H_d^{sym}\subseteq\mathcal H_d^{diag}$ (3 pts): $A=VDV^\top$, so $A^k=VD^kV^\top$ and $c_k=(V^\top C)^\top D^k(V^\top B)$.
- Hence $(D,V^\top B,V^\top C)$ is a diagonal RNN that computes the same function.

*Verified: 500 random symmetric $A$ with $d=4$: the re-parameterized triple reproduces $c_0,\dots,c_4$ to $10^{-11}$.*

**3a. (5) Hankel rank at most $d$**

**What is asked.** For an exponential sum with $d$ terms, show $\mathrm{rank}\,H_m(c)\le d$ for every $m$ with $2m-1\le L$. The answer is a proof.

**Tool and why.** The rank of a product is at most its inner dimension (cheat sheet §3, rank). Following the hint, we factor $H_m(c)$ through $\mathbb R^d$, with one coordinate per eigenvalue.

**Definitions.** By part 2a write $c_k=\sum_{l=1}^dp_l\lambda_l^k$. Let $V\in\mathbb R^{d\times m}$ be

$$V_{l,j}:=\lambda_l^{\,j},\qquad l\in[d],\ j\in\{0,\dots,m-1\}.$$

Row $l$ lists the first $m$ powers of $\lambda_l$. We introduce it because $c_{i+j}$ splits into a power $i$ times a power $j$.

**Solution.**

Step 1, the entries are defined: for $i,j\le m-1$ we have $i+j\le2m-2$, and $2m-2\le L-1$ by the assumption $2m-1\le L$. So $c_{i+j}$ is one of the given coefficients.

Step 2, the factorization: using $\lambda^{i+j}=\lambda^i\lambda^j$, valid also for $\lambda=0$ with $0^0=1$,

$$\big(V^\top\mathrm{diag}(p)\,V\big)_{i,j}=\sum_{l=1}^d\lambda_l^{\,i}\,p_l\,\lambda_l^{\,j}=c_{i+j}=\big(H_m(c)\big)_{i,j}.$$

So $H_m(c)=V^\top\mathrm{diag}(p)\,V$.

Step 3, the rank: a product has rank at most the rank of each factor, and $V$ has only $d$ rows, so

$$\mathrm{rank}\,H_m(c)\le\mathrm{rank}\,V\le d.$$

**In words.** Each eigenvalue contributes one rank-one matrix $p_l\,v_lv_l^\top$, where $v_l=(1,\lambda_l,\dots,\lambda_l^{m-1})$. Then $d$ eigenvalues give at most $d$ rank-one pieces.

**Sanity check.** For $d=1$, $c_k=pa^k$, and $H_2(c)$ has rows $(p,pa)$ and $(pa,pa^2)$. The second row is $a$ times the first, so the rank is $1$; the determinant is $p^2a^2-p^2a^2$, which is $0$.

**What to write in the exam.**

- Indices: $i+j\le2m-2$, which is at most $L-1$, so $H_m(c)$ is defined.
- Factorization (3 pts): $H_m(c)=V^\top\mathrm{diag}(p)\,V$ with $V_{l,j}=\lambda_l^{\,j}$.
- Rank (2 pts): $V$ has $d$ rows, so the rank is at most $d$.

*Verified: for $d=1,\dots,5$ with $L=2d+1$ and random $p,\lambda$: $H_{d+1}(c)$ equals $V^\top\mathrm{diag}(p)\,V$ and has rank $d$.*

**3b. (4) A strict hierarchy when $L\ge2d+1$**

**What is asked.** Prove $\mathcal H_d^{diag}\subseteq\mathcal H_{d+1}^{diag}$, and that the inclusion is strict when $L\ge2d+1$. The answer is a proof with an explicit witness.

**Tool and why.** The inclusion is zero padding. Strictness uses the Hankel test of part 3a, with a Vandermonde matrix making the witness's Hankel matrix invertible (cheat sheet §3, rank; §4, strict hierarchies).

**Definitions.** The witness from the hint is

$$c_k:=\sum_{i=1}^{d+1}i^{\,k},\qquad k\in\{0,\dots,L-1\},$$

and $m:=d+1$ is the size of the Hankel matrix we test.

**Solution.**

Step 1, inclusion: given $c_k=\sum_{i=1}^dp_i\lambda_i^k$, append $\lambda_{d+1}=0$ and $p_{d+1}=0$. The extra term is $0$ for every $k$, including $k=0$, because $p_{d+1}=0$. By part 2a the same sequence lies in $\mathcal S(\mathcal H_{d+1}^{diag})$.

Step 2, the witness is in the bigger class: it is an exponential sum with the $d+1$ nodes $\lambda_i=i$ and weights $p_i=1$, so by part 2a it lies in $\mathcal S(\mathcal H_{d+1}^{diag})$.

Step 3, $m=d+1$ is admissible: $2m-1=2d+1$, and $2d+1\le L$ by assumption.

Step 4, the Hankel matrix is invertible: by the computation of part 3a, with nodes $1,\dots,d+1$ and $p=\mathbf 1$,

$$H_{d+1}(c)=V^\top V,\qquad V_{l,j}=l^{\,j}.$$

Here $V$ is the square Vandermonde matrix of the pairwise distinct nodes $1,\dots,d+1$, invertible by the reminder. So $V^\top V$ is invertible and $\mathrm{rank}\,H_{d+1}(c)$ equals $d+1$.

Step 5, strictness: if $c$ were in $\mathcal S(\mathcal H_d^{diag})$, part 3a would give $\mathrm{rank}\,H_{d+1}(c)\le d$, contradicting step 4. So $c$ is in the bigger class but not the smaller one, and

$$\boxed{\mathcal H_d^{diag}\subsetneq\mathcal H_{d+1}^{diag}}$$

**In words.** The Hankel rank counts how many geometric sequences are really needed. Here $d+1$ distinct nodes with non-zero weights need all $d+1$ terms, provided the sequence is long enough to show it.

**Sanity check.** For $d=1$, $c=(2,3,5,\dots)$ and

$$\det\begin{pmatrix}2&3\\3&5\end{pmatrix}=10-9=1,$$

which is non-zero, so the rank is $2$. The length condition is genuinely needed: if $L\le d$, the $L\times L$ Vandermonde system with nodes $1,\dots,L$ realizes every $c\in\mathbb R^L$ with $L$ terms, so both classes are all of $\mathbb R^L$ and no inclusion can be strict.

**What to write in the exam.**

- Inclusion (1 pt): pad with $\lambda_{d+1}=0$ and $p_{d+1}=0$.
- Witness (3 pts): $c_k=\sum_{i\le d+1}i^k$ is in the bigger class, and $m=d+1$ is admissible since $2d+1\le L$.
- Then $H_{d+1}(c)=V^\top V$ with $V$ an invertible Vandermonde matrix, so its rank is $d+1$, and part 3a excludes $\mathcal H_d^{diag}$.

*Verified: exact ranks in sympy for $d=1,\dots,5$: the witness has rank $d+1$ (determinants $1$ and $4$ for $d=1,2$), while random sums with $d$ terms have rank $d$.*

**4a. (4) An exponential sum with $m$ terms has at most $m-1$ zeros**

**What is asked.** Prove that $g(s)=\sum_jq_je^{\mu_js}$ with strictly increasing exponents and $q\ne0$ has at most $m-1$ distinct real zeros. The answer is a proof by induction.

**Tool and why.** Induction on $m$ with Rolle's theorem, as the hint says. Multiplying by $e^{-\mu_1s}$ turns the first term into a constant, which differentiation then removes, so the derivative has one term fewer. This is a calculus lemma; it feeds the separation of part 4b (cheat sheet §4).

**Definitions.** For the induction step put

$$\tilde g(s):=e^{-\mu_1s}g(s)=q_1+\sum_{j=2}^mq_je^{(\mu_j-\mu_1)s}.$$

It has the same zeros as $g$, because $e^{-\mu_1s}$ is positive.

**Solution.**

**Claim.** For every $m\in\mathbb N$, every such $g$ with $q\ne0$ has at most $m-1$ distinct real zeros. The induction is on the number of terms $m$, upward from $m=1$.

**Base.** For $m=1$, $g(s)=q_1e^{\mu_1s}$ with $q_1\ne0$, which never vanishes. So it has $0$ zeros, and $0$ is $m-1$.

**Hypothesis.** For some $m\ge2$, every exponential sum with $m-1$ strictly increasing exponents and a non-zero coefficient vector has at most $m-2$ distinct real zeros.

**Step.** Suppose, for contradiction, that $g$ has $m$ distinct zeros, listed in increasing order as $s_1,\dots,s_m$.

Case 1, the coefficients $q_2,\dots,q_m$ are all zero: then $q_1\ne0$ and $g=q_1e^{\mu_1s}$ has no zeros at all, a contradiction.

Case 2, some $q_j$ with $j\ge2$ is non-zero: $\tilde g$ has the same $m$ zeros. By Rolle's theorem, $\tilde g'$ vanishes somewhere strictly between $s_i$ and $s_{i+1}$, for each $i\in[m-1]$. These open intervals are disjoint, so $\tilde g'$ has at least $m-1$ distinct zeros. Differentiating removes the constant $q_1$:

$$\tilde g'(s)=\sum_{j=2}^mq_j(\mu_j-\mu_1)\,e^{(\mu_j-\mu_1)s}.$$

This is an exponential sum with the $m-1$ strictly increasing exponents $\mu_j-\mu_1$. Its coefficients $q_j(\mu_j-\mu_1)$ are not all zero, because each $\mu_j-\mu_1$ is positive and some $q_j$ is non-zero. Here we use the hypothesis: $\tilde g'$ has at most $m-2$ zeros, contradicting the $m-1$ zeros found above.

So $g$ has at most $m-1$ distinct zeros.

**In words.** Each term of an exponential sum buys at most one sign change, just as a polynomial of degree $m-1$ has at most $m-1$ roots. Dividing by the smallest exponential and differentiating peels off one term at a time.

**Sanity check.** The bound is attained. The sum with $m=3$ terms

$$g(s)=e^{2s}-3e^s+2=(e^s-1)(e^s-2)$$

has exactly the $2$ zeros $s=0$ and $s=\ln2$.

**What to write in the exam.**

- Base (1 pt): a single term $q_1e^{\mu_1s}$ with $q_1\ne0$ has no zeros.
- Step (3 pts): if $g$ had $m$ zeros, so would $e^{-\mu_1s}g$; by Rolle its derivative, a sum of $m-1$ exponentials with coefficients $q_j(\mu_j-\mu_1)$, has $m-1$ zeros, contradicting the hypothesis.
- Treat separately the case where only $q_1$ is non-zero.

*Verified: 3000 random sums with at most $4$ terms, sign changes counted on a fine grid over $[-15,15]$: never more than $m-1$; the example above has exactly $2$.*

**4b. (4) The alternating sequence needs $L$ non-negative nodes**

**What is asked.** Show $c^{alt}\in\mathcal S(\mathcal H_1^{diag})$, that $c^{alt}\in\mathcal S(\mathcal H_d^{diag+})$ exactly when $d\ge L$, and conclude the strict inclusion for $d\in\{1,\dots,L-1\}$. The answer is a proof.

**Tool and why.** Part 2a reduces membership to an exponential-sum identity. With non-negative nodes, $\lambda^k=e^{k\ln\lambda}$ extends to a function of a continuous variable $s$; the intermediate value theorem turns sign changes into zeros, and part 4a caps their number (cheat sheet §4, separation by counting). The converse is a Vandermonde system.

**Definitions.** Suppose $c^{alt}_k=\sum_{i=1}^dp_i\lambda_i^k$ with all $\lambda_i\ge0$. Let $\nu_1,\dots,\nu_m$ be the distinct positive values among the $\lambda_i$, in increasing order, and merge equal nodes:

$$q_j:=\sum_{i:\,\lambda_i=\nu_j}p_i,\qquad g(s):=\sum_{j=1}^mq_je^{s\ln\nu_j}.$$

The exponents $\ln\nu_j$ are strictly increasing, so $g$ has the form of part 4a. The zero nodes are left out of $g$ on purpose: $0^k$ is $1$ at $k=0$ and $0$ afterwards, which no exponential reproduces.

**Solution.**

Step 1, membership in $\mathcal H_1^{diag}$: $\lambda=-1$ and $p=1$ give $c_k=(-1)^k$, by part 2a.

Step 2, $g$ matches the sequence: since $0^k=0$ for $k\ge1$, we have $g(k)=c^{alt}_k$ for every $k\ge1$, and also for $k=0$ when no $\lambda_i$ is $0$.

Step 3, case A, no $\lambda_i$ equals $0$: then $m\le d$, and $g(k)=(-1)^k$ for $k=0,\dots,L-1$. Since $g(0)=1$, $g$ is not identically zero, so $q\ne0$. Consecutive values $g(k)$ and $g(k+1)$ have opposite signs, so by the intermediate value theorem $g$ has a zero in each interval $(k,k+1)$, for $k=0,\dots,L-2$. These are $L-1$ distinct zeros. Part 4a gives $L-1\le m-1$, so $m\ge L$, and hence $d\ge L$ because $d\ge m$.

Step 4, case B, some $\lambda_i$ equals $0$: then at most $d-1$ nodes are positive, so $m\le d-1$, and $g(k)=(-1)^k$ for $k=1,\dots,L-1$. Since $g(1)=-1$, again $q\ne0$. The intermediate value theorem gives a zero in each interval $(k,k+1)$ for $k=1,\dots,L-2$, that is, $L-2$ distinct zeros. Part 4a gives $L-2\le m-1$, and together with $m-1\le d-2$ we get $d\ge L$.

Step 5, direction $\Rightarrow$: in both cases $d\ge L$.

Step 6, direction $\Leftarrow$: let $d\ge L$. Take the nodes $\nu_l=l$ for $l\in[L]$ and the $L\times L$ Vandermonde matrix $V_{l,k}=l^{\,k}$, with $k\in\{0,\dots,L-1\}$. It is invertible by the reminder, so the system $V^\top p=c^{alt}$ has a solution $p\in\mathbb R^L$, which says $\sum_lp_l\,l^k=(-1)^k$ for every $k$. Pad with $d-L$ terms having $\lambda_i=0$ and $p_i=0$. All nodes are non-negative, so $c^{alt}\in\mathcal S(\mathcal H_d^{diag+})$.

Step 7, conclusion: $\mathcal H_d^{diag+}\subseteq\mathcal H_d^{diag}$ trivially. For $d\in\{1,\dots,L-1\}$, the sequence $c^{alt}$ lies in $\mathcal S(\mathcal H_1^{diag})$, hence in $\mathcal S(\mathcal H_d^{diag})$ after padding as in part 3b, but not in $\mathcal S(\mathcal H_d^{diag+})$ by step 5, since $d<L$. So

$$\boxed{\mathcal H_d^{diag+}\subsetneq\mathcal H_d^{diag}},\qquad d\in\{1,\dots,L-1\}.$$

**In words.** A positive node gives a sequence that never changes sign, and part 4a says that $m$ such terms produce at most $m-1$ sign changes. The alternating sequence changes sign $L-1$ times, so it needs $L$ non-negative terms, while a single negative eigenvalue does it alone.

**Sanity check.** For $L=3$, the Vandermonde solution with nodes $1,2,3$ is $p=(6,-8,3)$. Indeed $6-8+3=1$, then $6-16+9=-1$, then $6-32+27=1$. It uses $3$ nodes, exactly the threshold $L$.

**What to write in the exam.**

- Membership in $\mathcal H_1^{diag}$ (½ pt): $\lambda=-1$, $p=1$.
- Direction $\Rightarrow$ (2½ pts): merge the positive nodes into $g(s)=\sum_jq_je^{s\ln\nu_j}$; the intermediate value theorem gives $L-1$ zeros, or $L-2$ when a zero node exists, which itself uses up one node; part 4a then forces $d\ge L$.
- Direction $\Leftarrow$ (½ pt): an invertible Vandermonde system with nodes $1,\dots,L$, padded with zero terms.
- Conclusion (½ pt): $c^{alt}$ separates the two classes for every $d\in\{1,\dots,L-1\}$.

*Verified: exact Vandermonde solutions in sympy for $L=3,\dots,7$ (for example $p=(6,-8,3)$ when $L=3$); a grid search over non-negative nodes gives a best least-squares residual of at least $1.04$ with $L-1$ nodes and $0$ with $L$ nodes, for $L=3,4,5$.*

**5a. (2) The coefficients of the rotation RNN**

**What is asked.** Show that $A=R$, $B=e_1$, $C=e_1$ give $c_k=\cos(k\pi/3)$. The answer is a short computation.

**Tool and why.** Powers of a rotation are rotations by multiples of the angle (matrix powers, cheat sheet §3). The coefficient is then a single matrix entry.

**Definitions.** Let $R_\theta$ be the rotation by angle $\theta$:

$$R_\theta:=\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix},$$

so that $R=R_{\pi/3}$.

**Solution.**

Step 1, composition: multiplying out and using the angle-addition formulas,

$$R_\theta R_\varphi=R_{\theta+\varphi}.$$

Step 2, powers: by induction on $k$, $R^k=R_{k\pi/3}$. The base is $R^0=I$, which is $R_0$, and the step is $R^{k+1}=R_{k\pi/3}R_{\pi/3}$, which is $R_{(k+1)\pi/3}$ by step 1.

Step 3, the coefficient: $c_k=e_1^\top R^ke_1$ is the top-left entry of $R_{k\pi/3}$, which is $\cos(k\pi/3)$. So $c=(1,\tfrac12,-\tfrac12,-1,\dots)$.

**In words.** The state starts at $e_1$ and turns by $60$ degrees at each step; reading its first coordinate gives the cosine of the accumulated angle.

**Sanity check.** $R^6=I$, since six turns by $\pi/3$ make a full turn. So the sequence has period $6$: $c_6=c_0$, and both equal $1$.

**What to write in the exam.**

- Rotations compose by adding angles, so by induction $R^k=R_{k\pi/3}$.
- Hence $c_k$ is the top-left entry of $R_{k\pi/3}$, which is $\cos(k\pi/3)$.

*Verified: exact powers $R^k$ in sympy for $k=0,\dots,6$: the top-left entries are $1,\tfrac12,-\tfrac12,-1,-\tfrac12,\tfrac12,1$.*

**5b. (4) The rotation is not a symmetric RNN**

**What is asked.** Prove $h^{rot}\notin\mathcal H_2^{sym}$ and conclude $\mathcal H_2^{sym}\subsetneq\mathcal H_2$. The answer is a proof by contradiction.

**Tool and why.** By part 2b it suffices to exclude $\mathcal H_2^{diag}$. A two-term exponential sum satisfies a two-term linear recurrence whose characteristic roots are its nodes, which are real for a real diagonal RNN. We read the recurrence's coefficients off the data and find complex roots (cheat sheet §3, eigenvalues and matrix powers).

**Definitions.** Suppose $c_k=p_1\lambda_1^k+p_2\lambda_2^k$ with real $\lambda_1,\lambda_2$. Put

$$s:=\lambda_1+\lambda_2,\qquad\tau:=\lambda_1\lambda_2,$$

so that $\lambda_1$ and $\lambda_2$ are the two roots of $z^2-sz+\tau$. These are the unknowns that the data will determine.

**Solution.**

Step 1, the recurrence: for every $k\in\{0,\dots,L-3\}$,

$$c_{k+2}-s\,c_{k+1}+\tau\,c_k=\sum_{i=1}^2p_i\lambda_i^k\big(\lambda_i^2-s\lambda_i+\tau\big)=0,$$

because each bracket is the characteristic polynomial evaluated at one of its roots. This also holds for $\lambda_i=0$, with $0^0=1$.

Step 2, two equations: $L\ge4$ allows $k=0$ and $k=1$. With $c_0=1$, $c_1=\tfrac12$, $c_2=-\tfrac12$ and $c_3=-1$ from part 5a:

$$\begin{aligned}
k=0:&\quad -\tfrac12-\tfrac12 s+\tau=0,\\
k=1:&\quad -1+\tfrac12 s+\tfrac12\tau=0.
\end{aligned}$$

Step 3, solve: the first equation gives $\tau=\tfrac12(1+s)$. Substituting into the second,

$$\begin{aligned}
-1+\tfrac12s+\tfrac14(1+s)&=0\\
\tfrac34s-\tfrac34&=0\\
s&=1,
\end{aligned}$$

and then $\tau=1$.

Step 4, contradiction: real roots require a non-negative discriminant, but

$$(\lambda_1-\lambda_2)^2=s^2-4\tau=1-4=-3<0.$$

So no real $\lambda_1,\lambda_2$ exist, and $h^{rot}\notin\mathcal H_2^{diag}$. By part 2b, $h^{rot}\notin\mathcal H_2^{sym}$.

Step 5, conclusion: $h^{rot}\in\mathcal H_2$ by construction, since its weights have state dimension $2$. So $h^{rot}$ is in $\mathcal H_2$ but not in $\mathcal H_2^{sym}$, and $\mathcal H_2^{sym}\subsetneq\mathcal H_2$.

**In words.** The sequence $\cos(k\pi/3)$ equals $\tfrac12(\omega^k+\bar\omega^k)$ with $\omega=e^{i\pi/3}$, so it needs the complex eigenvalue pair $e^{\pm i\pi/3}$. A symmetric matrix has only real eigenvalues, while a rotation supplies exactly this pair.

**Sanity check.** The recovered polynomial $z^2-z+1$ has roots $\tfrac12\pm\tfrac{\sqrt3}{2}i$, which are exactly the eigenvalues of $R$. So the recurrence recovered the true dynamics.

**What to write in the exam.**

- By part 2b it suffices to exclude $\mathcal H_2^{diag}$.
- Recurrence (2 pts): two real nodes give $c_{k+2}-sc_{k+1}+\tau c_k=0$, with $s=\lambda_1+\lambda_2$ and $\tau=\lambda_1\lambda_2$.
- Contradiction (2 pts): the equations for $k=0$ and $k=1$ (this needs $L\ge4$) give $s=1$ and $\tau=1$, so the discriminant is $-3$ and the nodes are not real.
- Conclusion: $h^{rot}$ is in $\mathcal H_2$ but not in $\mathcal H_2^{sym}$.

*Verified: sympy solves the two recurrence equations to $s=1$ and $\tau=1$, with discriminant $-3$; the eigenvalues of $R$ are $\tfrac12\pm\tfrac{\sqrt3}{2}i$, and $R$ is not symmetric.*

**5c. (1) Why the Hankel test cannot help**

**What is asked.** One or two sentences explaining why the Hankel-rank test of part 3 cannot prove part 5b. The answer is an explanation.

**Tool and why.** Factor the Hankel matrix of a general, not necessarily diagonal, RNN, as in part 3a (cheat sheet §3, rank of a product).

**Definitions.** For $(A,B,C)\in\mathcal H_2$, let $\mathcal O\in\mathbb R^{m\times2}$ have rows $C^\top A^i$ and $\Gamma\in\mathbb R^{2\times m}$ have columns $A^jB$, for $i,j\in\{0,\dots,m-1\}$.

**Solution.**

Step 1, a factorization for every RNN: for all $i,j$,

$$c_{i+j}=C^\top A^{i+j}B=(C^\top A^i)(A^jB),$$

so $H_m(c)=\mathcal O\,\Gamma$.

Step 2, the rank: the inner dimension is $2$, so $\mathrm{rank}\,H_m(c)\le2$ for every $h\in\mathcal H_2$, including $h^{rot}$.

Step 3, conclusion: the Hankel rank of $h^{rot}$ is at most $2$, exactly like that of every element of $\mathcal H_2^{diag}$, so the test cannot tell them apart. It sees the state dimension, not whether the eigenvalues are real.

**In words.** The Hankel rank counts how many modes a sequence uses, not what kind of modes. A complex-conjugate pair counts as two modes, just like two real ones.

**Sanity check.** For $h^{rot}$, $H_2(c)$ has rows $(1,\tfrac12)$ and $(\tfrac12,-\tfrac12)$, with determinant $-\tfrac12-\tfrac14=-\tfrac34$, so its rank is $2$. When $L\ge5$, $H_3(c)$ also has rank $2$. Both are within the bound of part 3a for $d=2$.

**What to write in the exam.**

- Every $h\in\mathcal H_2$ has $H_m(c)=\mathcal O\,\Gamma$ with inner dimension $2$, so its Hankel rank is at most $2$.
- So $h^{rot}$ passes the same test as the diagonal RNNs with $d=2$: the test sees the state dimension, not whether the eigenvalues are real.

*Verified: exact computation in sympy for the rotation sequence: $\det H_2(c)=-\tfrac34$ and $\mathrm{rank}\,H_3(c)=2$.*

**Common mistakes.**

- In part 1, arguing only that "$h$ is linear and $f$ is not". That shows $f\notin\mathcal H_d$, but not the quantitative bound and not the attainment, and loses 2 points.
- In part 2b, claiming that $A$ and $D$ give the same function without transforming $B$ and $C$ into $V^\top B$ and $V^\top C$. In part 4b, merging the two cases and forgetting the zero node, which acts only at $k=0$ and costs one sign change, or invoking part 4a without checking $q\ne0$.
- In part 5, trying the Hankel rank (it cannot separate, part 5c), using only the equation for $k=0$ (one equation, two unknowns), or not saying where $L\ge4$ is used.

**💡 Useful tricks:** A linear functional is pinned down by its values at $\pm e_1$ — mirror points give a quantitative non-approximation bound; diagonal/symmetric $A$ ⇒ reversed coefficients are exponential sums $\sum_ip_i\lambda_i^k$ (absorb $V$ into $B,C$); Hankel $=V^\top\mathrm{diag}(p)V$ ⇒ rank $\le d$, and a Vandermonde witness shows strictness; multiply by $e^{-\mu_1s}$ then Rolle ⇒ at most $m-1$ zeros, so many sign changes force many non-negative nodes; two real nodes ⇒ a recurrence with real characteristic roots.

**⚠️ Watch out:** (1) prove the bound for *every* $h$ and every $d$, and show it is attained; (3) the Hankel matrix needs $2m-1\le L$ — the strict hierarchy needs $L\ge2d+1$; (4) the $\lambda_i=0$ node only affects $c_0$ — handle it as a separate case and check $q\ne0$ before using the zero-count lemma; (5) the Hankel rank cannot separate real from complex eigenvalues at the same $d$ — use the two-term recurrence, which needs $L\ge4$.

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
- Common traps to check: Q1.1 only "linear vs. non-linear" without the quantitative bound or
  without attainment; Q1.2b forgetting to transform $B,C$; Q1.3 ignoring the condition
  $2m-1\le L$ / $L\ge2d+1$; Q1.4a Rolle applied to $g$ itself; Q1.4b the $\lambda_i=0$ case or
  the $q\ne0$ check skipped; Q1.5 using the Hankel rank (cannot work) or a single recurrence
  equation; Q2.1 missing "only if"; Q2.2b assuming the eigenbasis is fixed instead of proving
  it via uniqueness; Q2.3b closed form not verified or denominator not shown positive; Q2.3d
  claiming convergence to $W^*$; Q2.4 sign of the exponent $8\mu c-2$; Q3.1 exponent $K$
  instead of $K-1$ or wrong norm inequality; Q3.2 data-dependent cover or single
  $\rho\epsilon$; Q3.3 non-summable $\delta_j$; Q3.4b no mention of the $P\gg N$ vacuity.
