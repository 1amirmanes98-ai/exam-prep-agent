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

**1. (8)** *Linearity at mirror points (3 pts).* By the useful fact,
$h(x)=\sum_t a_t x_t$ with $a_t=C^\top A^{L-t}B$. The points $e_1$ and $-e_1$ lie in
$[-1,1]^L$, $f(\pm e_1)=1$, $h(e_1)=a_1$, $h(-e_1)=-a_1$.
*Inequality (2 pts):*

$$\begin{aligned}
\sup_{x\in[-1,1]^L}|h(x)-f(x)| &\ge \max\{|a_1-1|,\ |a_1+1|\} \\
&\ge \tfrac12\big(|1-a_1|+|1+a_1|\big) \ge \tfrac12\big|(1-a_1)+(1+a_1)\big| = 1 .
\end{aligned}$$

*Attained (1 pt):* $C=0$ gives $h\equiv0\in\mathcal H_d$ with
$\sup_{x}|0-|x_1||=1$.
*Conclusion (2 pts):* universality (Lecture 2) would require, for the continuous $f$ on the
compact cube and every $\epsilon>0$, some $h$ in the class with sup-error $\le\epsilon$. The
bound holds for every $h$ in every $\mathcal H_d$, hence for every
$h\in\bigcup_d\mathcal H_d$, so $\epsilon=\tfrac12$ already fails; in particular
$f\notin\mathcal H_d$ for all $d$. Deduct 2 if only "$h$ is linear, $f$ is not" is argued
(the question asks for the quantitative bound); deduct 1 if the bound is shown only for one
$d$ or the attainment is skipped.

**2. (8)**
**a. (4)** *($\subseteq$, 2 pts)* For $A=\mathrm{diag}(\lambda)$, $A^k=\mathrm{diag}(\lambda_1^k,\dots,\lambda_d^k)$
(including $k=0$ with $0^0=1$), so

$$c_k=C^\top A^kB=\sum_i C_iB_i\lambda_i^k \,;$$

put
$p_i:=C_iB_i$. *($\supseteq$, 2 pts)* Given $p,\lambda$, take $A=\mathrm{diag}(\lambda)$,
$B=\mathbf 1$, $C=p$. The same two arguments with $\lambda\in\mathbb R^d_{\ge0}$ prove the
$diag+$ statement (the transition matrix in the converse is $\mathrm{diag}(\lambda)$, which is
non-negative).
**b. (4)** *($\subseteq$, 1 pt)* Diagonal matrices are symmetric.
*($\supseteq$, 3 pts)* Write $A=VDV^\top$ with $V$ orthogonal, $D$ diagonal. Since
$V^\top V=I$, induction gives $A^k=VD^kV^\top$ (also $k=0$: $VV^\top=I$), hence

$$c_k=C^\top VD^kV^\top B=(V^\top C)^\top D^k(V^\top B)\qquad\forall k,$$

so

$$(D,V^\top B,V^\top C)\in\mathcal H_d^{diag}$$

realizes the same sequence, i.e. the same
function. Trap: claiming $A$ and $D$ give the same function without transforming $B,C$.

**3. (9)**
**a. (5)** Let $c_k=\sum_{l=1}^dp_l\lambda_l^k$ and let $V\in\mathbb R^{d\times m}$,
$V_{l,j}:=\lambda_l^{\,j}$ ($j=0,\dots,m-1$). For $i,j\in\{0,\dots,m-1\}$ we have
$i+j\le2m-2\le L-1$, so $c_{i+j}$ is defined, and (using $\lambda^i\lambda^j=\lambda^{i+j}$,
valid also for $\lambda=0$ with $0^0=1$)

$$\big(V^\top\mathrm{diag}(p)\,V\big)_{i,j}=\sum_{l=1}^d\lambda_l^{\,i}\,p_l\,\lambda_l^{\,j}=c_{i+j}=\big(H_m(c)\big)_{i,j}.$$

(3 pts for the factorization.) Hence

$$\mathrm{rank}\,H_m(c)\le\mathrm{rank}\,V\le d$$

(2 pts).
**b. (4)** *Inclusion (1 pt):* by 2a, append $\lambda_{d+1}=0$, $p_{d+1}=0$.
*Witness (3 pts):* $c_k:=\sum_{i=1}^{d+1}i^k$ is in $\mathcal S(\mathcal H_{d+1}^{diag})$
($\lambda_i=i$, $p_i=1$). Since $L\ge2d+1$, $m:=d+1$ is admissible ($2m-1=2d+1\le L$), and
by the computation of part a, $H_{d+1}(c)=V^\top V$ with $V_{l,j}=l^{\,j}$ the square
Vandermonde matrix of the distinct nodes $1,\dots,d+1$ — invertible by the reminder. So
$\mathrm{rank}\,H_{d+1}(c)=d+1>d$ and by part a, $c\notin\mathcal S(\mathcal H_d^{diag})$.
(E.g. $d=1$: $c=(2,3,5,\dots)$, $\det\begin{pmatrix}2&3\\3&5\end{pmatrix}=1\ne0$.)
Trap: forgetting the length condition — for $L\le d$ every sequence is already an exponential
sum of $d$ terms (Vandermonde again), so some condition on $L$ is genuinely needed.

**4. (8)**
**a. (4)** Induction on $m$. *Base (1 pt):* $m=1$: $g=q_1e^{\mu_1s}$, $q_1\ne0$, has no zeros.
*Step (3 pts):* let $m\ge2$ and suppose $g$ has $m$ distinct zeros $s_1<\dots<s_m$. If
$q_2=\dots=q_m=0$ then $g=q_1e^{\mu_1s}$ with $q_1\ne0$, which has no zeros — contradiction.
Otherwise

$$\tilde g(s):=e^{-\mu_1s}g(s)=q_1+\sum_{j\ge2}q_je^{(\mu_j-\mu_1)s}$$

has the same
zeros (the factor is positive); by Rolle, $\tilde g'$ vanishes somewhere in each
$(s_i,s_{i+1})$, giving $m-1$ distinct zeros of

$$\tilde g'(s)=\sum_{j=2}^m q_j(\mu_j-\mu_1)\,e^{(\mu_j-\mu_1)s},$$

an exponential sum with $m-1$ strictly increasing exponents and coefficients
$q_j(\mu_j-\mu_1)$ not all zero (as $\mu_j>\mu_1$). The induction hypothesis allows at most
$m-2$ zeros — contradiction. Trap: applying Rolle to $g$ itself (its derivative still has
$m$ terms — the multiplication by $e^{-\mu_1s}$ is what kills one term).

**b. (4)** *$c^{alt}\in\mathcal S(\mathcal H_1^{diag})$ (½ pt):* $\lambda=-1$, $p=1$.
*($\Rightarrow$, 2½ pts — by contrapositive.)* We show that if $d\le L-1$ then
$c^{alt}\notin\mathcal S(\mathcal H_d^{diag+})$; equivalently, any non-negative realization
forces $d\ge L$.
Suppose $c^{alt}_k=\sum_{i=1}^dp_i\lambda_i^k$ with $\lambda_i\ge0$. Let $\nu_1<\dots<\nu_m$
be the distinct **positive** values among the $\lambda_i$, $q_j:=\sum_{i:\lambda_i=\nu_j}p_i$,
and $g(s):=\sum_jq_je^{s\ln\nu_j}$ (exponents $\ln\nu_j$ strictly increasing). Since $0^k=0$
for $k\ge1$, $c^{alt}_k=g(k)$ for every $k\ge1$, and also for $k=0$ if no $\lambda_i$ is $0$.
- *No $\lambda_i=0$:* then $m\le d$, $g(k)=(-1)^k$ for $k=0,\dots,L-1$, $q\ne0$ (since
  $g(0)=1$), and by the intermediate value theorem $g$ has a zero in each $(k,k+1)$,
  $k=0,\dots,L-2$: $L-1$ distinct zeros. Part a gives $L-1\le m-1$, so $d\ge m\ge L$.
- *Some $\lambda_i=0$:* then $m\le d-1$, $g(k)=(-1)^k$ for $k=1,\dots,L-1$, $q\ne0$ (since
  $g(1)=-1$), and $g$ has $L-2$ zeros in the intervals $(k,k+1)$, $k=1,\dots,L-2$. Part a
  gives $L-2\le m-1\le d-2$, so $d\ge L$.

Either way $d\ge L$.
*($\Leftarrow$, ½ pt):* if $d\ge L$, take nodes $\nu_l=l$ ($l\in[L]$); the $L\times L$
Vandermonde matrix $V_{l,k}=l^{\,k}$ is invertible, so $V^\top p=c^{alt}$ has a solution
$p\in\mathbb R^L$; pad with $d-L$ terms having $\lambda_i=0$, $p_i=0$.
*Conclusion (½ pt):* $\mathcal H_d^{diag+}\subseteq\mathcal H_d^{diag}$ trivially, and for
$1\le d\le L-1$ the sequence $c^{alt}$ lies in $\mathcal S(\mathcal H_d^{diag})$ (it lies in
$\mathcal S(\mathcal H_1^{diag})$; pad as in 3b) but not in $\mathcal S(\mathcal H_d^{diag+})$.
*(Remark: for $d\ge L$ the same Vandermonde argument shows both classes equal all of
$\mathbb R^L$, so the threshold $d\ge L$ is sharp in both senses.)*
Traps: merging only the cases and forgetting the $\lambda_i=0$ term, which acts **only** at
$k=0$ and costs exactly one sign change; forgetting to check $q\ne0$ before invoking part a.

**5. (7)**
**a. (2)** With $R_\theta$ the rotation by $\theta$, the angle-addition formulas give
$R_\theta R_\varphi=R_{\theta+\varphi}$, so by induction $R^k=R_{k\pi/3}$ ($R^0=I=R_0$).
Hence $c_k=e_1^\top R_{k\pi/3}e_1=\cos(k\pi/3)$: $c=(1,\tfrac12,-\tfrac12,-1,\dots)$.
**b. (4)** By 2b it suffices to exclude $\mathcal H_2^{diag}$. *Recurrence (2 pts):* if
$c_k=p_1\lambda_1^k+p_2\lambda_2^k$ with $\lambda_1,\lambda_2\in\mathbb R$, set
$s:=\lambda_1+\lambda_2$, $\tau:=\lambda_1\lambda_2$. Then for all $k\in\{0,\dots,L-3\}$

$$c_{k+2}-s\,c_{k+1}+\tau\,c_k=\sum_{i=1}^2p_i\lambda_i^k\big(\lambda_i^2-s\lambda_i+\tau\big)=0 ,$$

since $\lambda_1,\lambda_2$ are the roots of $z^2-sz+\tau$.
*Contradiction (2 pts):* $L\ge4$ allows $k=0,1$:

$$\begin{aligned}
k=0:&\quad -\tfrac12-\tfrac12 s+\tau=0,\\
k=1:&\quad -1+\tfrac12 s+\tfrac12\tau=0 .
\end{aligned}$$

The first gives $\tau=\tfrac12(1+s)$; substituting, $-1+\tfrac12s+\tfrac14+\tfrac14s=0$, so
$s=1$, $\tau=1$. But then $(\lambda_1-\lambda_2)^2=s^2-4\tau=-3<0$, impossible for real
$\lambda$'s. So $h^{rot}\notin\mathcal H_2^{diag}=\mathcal H_2^{sym}$, while
$h^{rot}\in\mathcal H_2$: $\mathcal H_2^{sym}\subsetneq\mathcal H_2$. (The "eigenvalues" the
sequence needs are $e^{\pm i\pi/3}$ — complex; a symmetric matrix has only real eigenvalues, while a rotation
supplies exactly this complex pair.)
**c. (1)** For **any** $(A,B,C)\in\mathcal H_2$, $c_{i+j}=(C^\top A^i)(A^jB)$, so
$H_m(c)=\mathcal O\,\Gamma$ with $\mathcal O\in\mathbb R^{m\times2}$, $\Gamma\in\mathbb R^{2\times m}$
and $\mathrm{rank}\le2$ — the Hankel rank only sees the state dimension, not whether the
eigenvalues are real (indeed $\mathrm{rank}\,H_3(c)=2$ here).
Traps: treating $R^k$ as a matrix exponential; using only $k=0$ (one equation, two unknowns);
not stating where $L\ge4$ is used.

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

**1. (7)** Let $W:=UU^\top$ and expand (2 pts):

$$\begin{aligned}
\phi(U)&=\big\|(W-W^*_+)+W^*_-\big\|_F^2\\
&=\|W-W^*_+\|_F^2+2\langle W,W^*_-\rangle-2\langle W^*_+,W^*_-\rangle+\|W^*_-\|_F^2 .
\end{aligned}$$

*Cross-term (1 pt):*

$$\langle W^*_+,W^*_-\rangle=-\sum_{\mu_r>0,\ \mu_s<0}\mu_r\mu_s\,(q_r^\top q_s)^2=0 \,,$$

since $r\ne s$ in every term and $q_r\perp q_s$.
*Sign (2 pts):* with $u_1,\dots,u_d$ the columns of $U$,

$$\langle W,W^*_-\rangle=\mathrm{Tr}(UU^\top W^*_-)=\mathrm{Tr}(U^\top W^*_-U)=\sum_iu_i^\top W^*_-u_i\ge0$$

because $W^*_-$ is PSD. Hence

$$\phi(U)\ge\|W^*_-\|_F^2=\sum_{\mu_r<0}\mu_r^2 \,.$$

*Equality (2 pts):* equality forces $\|W-W^*_+\|_F=0$, i.e. $W=W^*_+$; conversely at
$W=W^*_+$ both extra terms vanish ($\langle W^*_+,W^*_-\rangle=0$). It is attained by

$$U^*:=\sum_{\mu_r>0}\sqrt{\mu_r}\,q_rq_r^\top \,,$$

for which $U^*U^{*\top}=W^*_+$.
(Contrast: $\min L=0$ at $W^*$, but $W^*$ is not reachable — the factorization only
produces PSD matrices.) Trap: claiming $\langle W,W^*_-\rangle\ge0$ "because both are
positive" without proof; forgetting the "only if".

**2. (9)**
**a. (3)** With $R:=UU^\top-W^*$ (symmetric) and a perturbation $E$:

$$\phi(U+E)-\phi(U)=2\langle R,\ UE^\top+EU^\top\rangle+O(\|E\|_F^2),$$

and

$$\langle R,UE^\top\rangle=\mathrm{Tr}(REU^\top)=\mathrm{Tr}(U^\top RE)=\langle RU,E\rangle$$

(using $R^\top=R$), likewise

$$\langle R,EU^\top\rangle=\mathrm{Tr}(RUE^\top)=\langle RU,E\rangle \,.$$

So the linear term is $\langle4RU,E\rangle$ and $\nabla\phi(U)=4(UU^\top-W^*)U$. Deduct 1 if
the symmetry of $R$ (which uses $W^*=W^{*\top}$) is not invoked.
**b. (6)** *Candidate (2 pts):* let $u_r(\cdot)$ solve
$\dot u_r=-4(u_r^2-\mu_r)u_r$ from $u_r(0)$ (exists by assumption) and

$$\tilde U(t):=Q\,\mathrm{diag}(u(t))\,Q^\top \,.$$

*Verification (2 pts):* since $Q^\top Q=I$,

$$\begin{aligned}
\tilde U\tilde U^\top-W^*&=Q\,\mathrm{diag}(u_r^2-\mu_r)\,Q^\top,\\
\nabla\phi(\tilde U)&=4\,Q\,\mathrm{diag}\big((u_r^2-\mu_r)u_r\big)\,Q^\top=-Q\,\mathrm{diag}(\dot u_r)\,Q^\top=-\dot{\tilde U}.
\end{aligned}$$

*Uniqueness (1 pt):* $\tilde U$ solves the gradient-flow ODE with $\tilde U(0)=U(0)$, so
$U\equiv\tilde U$.
*Eigenvalues (1 pt):* $W=Q\,\mathrm{diag}(u_r^2)\,Q^\top$, and

$$\dot\lambda_r=2u_r\dot u_r=-8u_r^2(u_r^2-\mu_r)=8\lambda_r(\mu_r-\lambda_r) \,.$$

This is consistent with the a\_2024 eigenvalue formula
$\dot\lambda_r=4\lambda_r\langle-\nabla L(W),v_rv_r^\top\rangle$, taking $v_r=q_r$ and
$\nabla L=2(W-W^*)$. Traps: "differentiating the eigendecomposition" without
justifying that $Q$ stays fixed — the uniqueness argument is what proves it; dropping the
factor $2$ from $\frac{d}{dt}u^2$.

**3. (11)**
**a. (2)** If $\lambda_0=0$, $\lambda\equiv0$ is a solution, hence the solution (uniqueness).
If $\lambda_0>0$, let $G(t):=8\int_0^t(\mu-\lambda(s))\,ds$; then

$$\frac{d}{dt}\big[\lambda e^{-G}\big]=e^{-G}\big(\dot\lambda-8\lambda(\mu-\lambda)\big)=0 \,,$$

so
$\lambda(t)=\lambda_0e^{G(t)}>0$.
**b. (4)** Let $D(t):=\lambda_0+(\mu-\lambda_0)e^{-8\mu t}$. *$D>0$ (1 pt):* if
$\mu\ge\lambda_0$, $D\ge\lambda_0>0$; if $\mu<\lambda_0$, $e^{-8\mu t}\in(0,1]$ gives
$D\ge\lambda_0+(\mu-\lambda_0)=\mu>0$. *Verification (2 pts):* $\Lambda:=\mu\lambda_0/D$ has
$\Lambda(0)=\lambda_0$ and

$$\begin{aligned}
\dot\Lambda&=-\frac{\mu\lambda_0\dot D}{D^2}=\frac{8\mu^2\lambda_0(\mu-\lambda_0)e^{-8\mu t}}{D^2},\\
8\Lambda(\mu-\Lambda)&=\frac{8\mu\lambda_0}{D}\cdot\frac{\mu D-\mu\lambda_0}{D}=\frac{8\mu^2\lambda_0(\mu-\lambda_0)e^{-8\mu t}}{D^2},
\end{aligned}$$

so by uniqueness $\lambda=\Lambda$. *Limit (1 pt):* $e^{-8\mu t}\to0$, $D\to\lambda_0$,
$\lambda\to\mu$.
**c. (3)** *$\mu<0$ (2 pts):* by a, $\lambda>0$, so

$$\dot\lambda=8\mu\lambda-8\lambda^2\le8\mu\lambda \,,$$

i.e. $\frac{d}{dt}\big[\lambda e^{-8\mu t}\big]\le0$, giving

$$\lambda(t)\le\lambda_0e^{8\mu t}=\lambda_0e^{-8|\mu|t}\to0 \,.$$

*$\mu=0$ (1 pt):*

$$\frac{d}{dt}\frac{\lambda_0}{1+8\lambda_0t}=-\frac{8\lambda_0^2}{(1+8\lambda_0t)^2}=-8\Big(\frac{\lambda_0}{1+8\lambda_0t}\Big)^2$$

with the right initial value, so by uniqueness it is the solution; it tends to $0$ (only
like $1/t$ — sublinearly).
**d. (2)** *Convergence (1 pt):* $u_r(0)\ne0\Rightarrow\lambda_r(0)>0$, so by b, c:
$\lambda_r\to\mu_r$ if $\mu_r>0$ and $\lambda_r\to0$ if $\mu_r\le0$. Thus

$$W(t)=\sum_r\lambda_r(t)q_rq_r^\top\to W^*_+$$

and

$$\phi(U(t))=\sum_r(\lambda_r(t)-\mu_r)^2\to\sum_{\mu_r<0}\mu_r^2=\min\phi$$

(part 1) —
the limit is the PSD projection of $W^*$.
*Necessity (1 pt):* if $\mu_r>0$ and $u_r(0)=0$, then $\lambda_r\equiv0$ by a, and since
$\lambda_s\ge0>\mu_s$ for $\mu_s<0$,

$$\phi(U(t))\ge\mu_r^2+\sum_{\mu_s<0}\mu_s^2>\min\phi$$

for all $t$ (e.g. $U(0)=0$ is a
stationary point). *(Numerically this equilibrium is unstable: round-off in a rotated basis
escapes it — it is a saddle, consistent with Lecture 3's strict-saddle discussion; not
required.)*

**4. (8)**
**a. (5)** Here $u_r(0)=\alpha$, $\lambda_r(0)=\alpha^2>0$. *Positive $\mu$ (4 pts):* by 3b,
for $\mu=\mu_r>0$ and $t_\alpha=c\ln(1/\alpha)$, $e^{-8\mu t_\alpha}=\alpha^{8\mu c}$, so

$$\lambda_r(t_\alpha)=\frac{\mu\alpha^2}{\alpha^2+(\mu-\alpha^2)\,\alpha^{8\mu c}}
=\frac{\mu}{1+(\mu-\alpha^2)\,\alpha^{8\mu c-2}} .$$

As $\alpha\to0^+$, $\mu-\alpha^2\to\mu>0$. For $r=1$:

$$c>\frac1{4\mu_1}\Rightarrow8\mu_1c-2>0 \Rightarrow\alpha^{8\mu_1c-2}\to0\Rightarrow\lambda_1(t_\alpha)\to\mu_1 \,.$$

For $r=2$:

$$c<\frac1{4\mu_2}\Rightarrow8\mu_2c-2<0\Rightarrow\alpha^{8\mu_2c-2}\to\infty\Rightarrow\lambda_2(t_\alpha)\to0 \,.$$

*Non-positive $\mu$ (1 pt):* $\lambda_r\ge0$ and $\mu_r-\lambda_r\le0$ give $\dot\lambda_r\le0$,
so $\lambda_r(t)\le\alpha^2$.
**b. (3)** *Interpretation (2 pts):* the multiplicative factor $\lambda_r$ in $\dot\lambda_r$
makes each positive eigenvalue sit on a plateau near $\alpha^2$ for time
$\approx\frac{\ln(1/\alpha)}{4\mu_r}$ (half-time
$\frac1{8\mu_r}\ln\frac{\mu_r-\alpha^2}{\alpha^2}$) and then rise sharply: with small
$\alpha$, eigen-directions are learned **one at a time, largest $\mu_r$ first**, so $W(t)$
passes close to rank-$1$, rank-$2$, … matrices (incremental learning — the "rich get richer"
mechanism of Lecture 8, Thm 1). Negative directions never exceed $\alpha^2$, so the end point
is $\approx W^*_+$, of rank $\#\{r:\mu_r>0\}<d$.
*Contrast (1 pt):* gradient flow on $L$ itself is $\dot W=-2(W-W^*)$, so

$$W(t)=W^*+e^{-2t}\big(\alpha^2I_d-W^*\big),\qquad
\text{eigenvalues } \mu_r+e^{-2t}(\alpha^2-\mu_r),$$

all directions relax at the same rate $2$ regardless of $\mu_r$ (no plateau, no ordering),
and $W(t)\to W^*$, including its negative eigenvalues — no low-rank bias (the "$N=1$"
case of Lecture 8). Traps: claiming eigenvalues of the factorized flow can turn negative
(3a forbids it); saying the factorized limit is $W^*$.

**💡 Useful tricks:** $\{UU^\top\}$ = PSD cone; split $W^*=W^*_+-W^*_-$: the cross-term vanishes by orthogonality and $\mathrm{Tr}(UU^\top P)=\sum_iu_i^\top Pu_i\ge0$; guess a solution of the matrix ODE (diagonal in $Q$), verify it, invoke uniqueness; integrating factor $e^{-\int}$ for sign preservation and for the comparison bound when $\mu<0$; plug $t=c\ln(1/\alpha)$ into the logistic closed form and compare the exponent $8\mu c-2$ with $0$.

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

**1. (8)** Let $g_0(x):=x$ and $g_k(x):=\sigma(W_kg_{k-1}(x))$ for $k\le K-1$, so
$f_\theta=W_Kg_{K-1}$; write $g'_k$ for the same with $\theta'$. Since $\sigma$ is 1-Lipschitz
entrywise, $\|\sigma(z)-\sigma(z')\|_2\le\|z-z'\|_2$, and with $\sigma(0)=0$,
$\|\sigma(z)\|_2\le\|z\|_2$.
*Hidden norms (2 pts):* by induction

$$\|g_k(x)\|_2\le\|W_k\|_F\|g_{k-1}(x)\|_2\le M^k$$

for
$x\in\mathcal X$, $\theta\in\Theta_M$ (same for $g'_k$).
*Hybrids (2 pts):* $\theta^{(j)}:=(W'_1,\dots,W'_j,W_{j+1},\dots,W_K)\in\Theta_M$, so
$\theta^{(0)}=\theta$, $\theta^{(K)}=\theta'$ and

$$f_\theta-f_{\theta'}=\sum_{j=1}^K\big(f_{\theta^{(j-1)}}-f_{\theta^{(j)}}\big).$$

*One layer (3 pts):* $\theta^{(j-1)},\theta^{(j)}$ share layers $1,\dots,j-1$ (those of
$\theta'$), so the input to layer $j$ is the same $z:=g'_{j-1}(x)$, $\|z\|_2\le M^{j-1}$. If
$j=K$ the outputs differ by $|(W_K-W'_K)z|\le\|W_K-W'_K\|_FM^{K-1}$. If $j<K$, the
post-activations $a=\sigma(W_jz)$, $a'=\sigma(W'_jz)$ satisfy

$$\|a-a'\|_2\le\|(W_j-W'_j)z\|_2\le\|W_j-W'_j\|_FM^{j-1} \,,$$

and both are fed into the same map
$F(v):=W_K\sigma(W_{K-1}\cdots\sigma(W_{j+1}v)\cdots)$, which is $M^{K-j}$-Lipschitz ($K-j$
linear maps of operator norm $\le M$ interleaved with 1-Lipschitz $\sigma$'s). Hence

$$\big|f_{\theta^{(j-1)}}(x)-f_{\theta^{(j)}}(x)\big|\le M^{K-j}\cdot M^{j-1}\|W_j-W'_j\|_F=M^{K-1}\|W_j-W'_j\|_F .$$

*Sum (1 pt):* triangle inequality over $j$, then sup over $x$. (Same recursion as the rank-1
compression example of Lecture 6; tight for the scalar chain $W_k=M$.) Traps: using
$\|W\|_F\le$ spectral norm (wrong direction — the given fact $\|Wz\|\le\|W\|_F\|z\|$ is the
right one); forgetting that the hybrid must lie in $\Theta_M$ for the hidden-norm bound;
getting $M^K$ instead of $M^{K-1}$ (the changed layer contributes $\|\Delta W_j\|_F$, not $M$).

**2. (8)** *Resolution (1 pt):* $\eta:=\epsilon/(KM^{K-1})\in(0,M]$ by the assumption
$\epsilon\le KM^K$. *Cover (3 pts):* for each $k$ take a cover $C_k$ of the Frobenius ball of
radius $M$ in $\mathbb R^{n_k\times n_{k-1}}$ at resolution $\eta$, and

$$\mathcal F_M:=\{f_{\tilde\theta}:\tilde\theta\in C_1\times\dots\times C_K\}\subseteq\mathcal H_M$$

(as $C_k$ lies in the ball). Then

$$|\mathcal F_M|\le\prod_{k=1}^K\Big(\frac{3M}{\eta}\Big)^{n_kn_{k-1}}=\Big(\frac{3M}{\eta}\Big)^{P}=\Big(\frac{3KM^K}{\epsilon}\Big)^{P}.$$

Given $\theta\in\Theta_M$ pick $\tilde W_k\in C_k$ with $\|W_k-\tilde W_k\|_F\le\eta$; both
$\theta,\tilde\theta\in\Theta_M$, so part 1 gives

$$\sup_x|f_\theta-f_{\tilde\theta}|\le M^{K-1}K\eta=\epsilon \,.$$

*Finite class (2 pts):* $\mathcal F_M$ depends only on $(M,\epsilon,$ architecture$)$, not on
$S$, so the reminder gives, w.p. $\ge1-\delta$, for all $\tilde\theta$ in the product,

$$L_D(\tilde\theta)-L_S(\tilde\theta)\le\sqrt{\ln(2|\mathcal F_M|/\delta)/(2N)} \,,$$

and
$\ln(2|\mathcal F_M|/\delta)\le P\ln(3KM^K/\epsilon)+\ln(2/\delta)$.
*Transfer (2 pts):* $|\ell(f_\theta(x),y)-\ell(f_{\tilde\theta}(x),y)|\le\rho\epsilon$
pointwise, so $|L_D(\theta)-L_D(\tilde\theta)|\le\rho\epsilon$ and
$|L_S(\theta)-L_S(\tilde\theta)|\le\rho\epsilon$; on the same event, for every
$\theta\in\Theta_M$,

$$L_D(\theta)-L_S(\theta)\le\big[L_D(\tilde\theta)-L_S(\tilde\theta)\big]+2\rho\epsilon ,$$

which is the claim. Traps: resolution $\epsilon$ per layer (loses the factor $KM^{K-1}$);
building the cover from $\hat\theta$ (data-dependent); paying $\rho\epsilon$ once.

**3. (8)** *Grid of radii (2 pts):* for $j\in\mathbb N_0$ let $M_j:=2^j$ and
$\delta_j:=\delta\,2^{-(j+1)}$, so $\sum_{j\ge0}\delta_j=\delta$. Since $\epsilon\le1\le K\le KM_j^K$,
part 2 applies to $(M_j,\delta_j)$: with probability $\ge1-\delta_j$, for all
$\theta\in\Theta_{2^j}$,

$$L_D(\theta)-L_S(\theta)\le\sqrt{\frac{P\ln(3K2^{jK}/\epsilon)+\ln(2/\delta_j)}{2N}}+2\rho\epsilon .$$

*Union (2 pts):* all these events hold simultaneously with probability $\ge1-\sum_j\delta_j=1-\delta$
— the radii are fixed before seeing $S$, so this is legitimate.
*Instantiation (2 pts):* every $\theta$ lies in $\Theta_{2^{j(\theta)}}$ ($j(\theta)$ exists
since $M(\theta)<\infty$), and $P\ln(3K2^{jK}/\epsilon)=P\ln(3K/\epsilon)+jKP\ln2$,
$\ln(2/\delta_j)=\ln(2/\delta)+(j+1)\ln2$, giving the stated bound for all $\theta$ at once.
*Bucket index (2 pts):* if $M(\theta)\le1$ then $j(\theta)=0\le\log_2\max\{1,2M\}$; otherwise

$$j(\theta)=\lceil\log_2M(\theta)\rceil<\log_2M(\theta)+1=\log_2(2M(\theta)) \,.$$

(Any summable
schedule works, e.g. Lecture 6, Prop 3's $\frac{6\delta}{\pi^2(j+1)^2}$, replacing
$(j+1)\ln2$ by $\ln\frac{\pi^2(j+1)^2}{6}$.) Traps: a uniform split over infinitely many
buckets (impossible); forgetting that part 2 needs $\epsilon\le KM_j^K$.

**4. (6)**
**a. (3)** With $\epsilon=1/\sqrt N\in(0,1]$ the bound reads

$$\sqrt{\frac{P\ln(3K\sqrt N)+jKP\ln2+(j+1)\ln2+\ln(2/\delta)}{2N}}+\frac{2\rho}{\sqrt N},\qquad j=j(\theta).$$

For fixed $\theta$, $j$ is fixed and the numerator is $O(\ln N)$, so the first term is
$O(\sqrt{\ln N/N})\to0$ and the second $\to0$ (2 pts). Scaling (1 pt): by part 3,
$jKP\ln2\le KP\ln\max\{1,2M(\theta)\}$, so the bound is of order

$$\sqrt{\frac{P\big(K\ln\max\{1,2M(\theta)\}+\ln(K\sqrt N)\big)}{N}}$$

— depth enters linearly (inside the root) through the $M^{K}$ Lipschitz constant, and the
learned norm only logarithmically.
**b. (3)** Model answer: part 2 needs $M$ fixed before the data, so one must either guess an
$M$ that might be smaller than $\|\hat W_k\|_F$ (then the bound does not apply to
$\hat\theta$) or take $M$ huge and pay $PK\ln M$ for norms training never used; part 3 lets
the data pick the bucket at an additive $(j+1)\ln2$ price, adapting to the learned norm (SRM,
Lecture 6). Still, the bound is $\gtrsim\sqrt{P/N}$, which exceeds $1$ — vacuous — whenever
$P\gg N$, exactly the overparameterized regime. As discussed in class (Lectures 6–7: networks
that fit random labels; uniform convergence over a fixed class cannot explain
generalization), a meaningful bound must depend on properties of the *trained* network and
data induced by the algorithm (implicit regularization, compressibility, flatness/PAC-Bayes),
not on parameter counts. Credit: 1 for the fixed-$M$ dilemma, 1 for $P\gg N$ ⇒ vacuous, 1 for
the class connection. Deduct 1 if over four sentences.

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
