# FODL Exam — Moed B 2023
**Date / semester:** 22.08.2023 — Semester B 2022/23 (תשפ"ג), Moed B; lecturer Dr. Nadav Cohen, TA Noam Razin; 3-hour exam
**Total points:** 105

## Q1 (32 pts) — Exponential expressive efficiency via VC dimension; unreachable outputs of sign networks
**Topics:** depth-separation, vc-dimension, hypothesis-class, expressive-efficiency | **Pillar:** Expressiveness | **Difficulty:** 4
**Maps to:** lecture_02_expressiveness, lecture_07_generalization_2 (VC dimension)
**Statement (English translation):**
For an input space $X=\mathbb{R}^d$ and a binary output space $Y=\{0,1\}$, let $\{H'_C\}_{C=1,2,\dots}$ and $\{H_B\}_{B=1,2,\dots}$ be two families of hypothesis classes, monotone with respect to their size parameters $C$ and $B$, respectively. That is, for every $C_1\le C_2$ it holds that $H'_{C_1}\subseteq H'_{C_2}$, and likewise for every $B_1\le B_2$ it holds that $H_{B_1}\subseteq H_{B_2}$.

1. **(6 pts)** Define the phrase "$H_B$ is exponentially expressively efficient with respect to $H'_C$".

*Reminder:* the VC dimension of a hypothesis class $H\subseteq\{0,1\}^X$ is defined as the maximal size of a set of inputs that the class shatters. Namely, it is the maximal $M\in\mathbb{N}$ for which there exists a set of inputs $\{x_1,\dots,x_M\}\subseteq X$ such that for every possible labeling $(y_1,\dots,y_M)\in Y^M$ there exists a hypothesis $h\in H$ that labels the inputs accordingly: $h(x_1)=y_1,\dots,h(x_M)=y_M$.

2. **(15 pts)** Assume that $VC(H'_C)=C$ for every $C\in\mathbb{N}$ and that $VC(H_B)=\exp(B)$ for every $B\in\mathbb{N}$, and in addition that for every $B\ge C$ it holds that $H'_C\subseteq H_B$. Prove that $H_B$ is exponentially expressively efficient with respect to $H'_C$.

3. **(6 pts)** Is the claim from sub-part 2 also correct in the case where $H'_C\subseteq H_B$ does not hold for every $B\ge C$, but instead $H'_C\subseteq H_B$ holds only for every $B\ge 5C$? Explain your answer.

Now, consider the function $f:\mathbb{R}^d\to\{0,1\}^k$ defined by $f(x)=\operatorname{sign}(Wx)$ for $W\in\mathbb{R}^{k\times d}$, where the sign function acts on each coordinate of $Wx$ separately, as follows:
$$\operatorname{sign}(z)=\begin{cases}1, & z\ge0\\ 0, & z<0\end{cases}$$
In other words, $f$ is a function implemented by a network with a single hidden layer, without biases and with sign activation on the hidden-layer neurons, whose last-layer weights are fixed to be the identity matrix.

4. **(5 pts)** Assume that $k>d$. Prove that for every $W\in\mathbb{R}^{k\times d}$ there exists an output $y\in\{0,1\}^k$ that the network does not output for any input; that is, there is no $x\in\mathbb{R}^d$ for which $f(x)=y$.
*Hint:* use the fact that the VC dimension of homogeneous (bias-free) $d$-dimensional linear separators is $d$ (no need to prove this). Do so while treating the rows of $W$ as a given set of inputs, and the set of all inputs $X=\mathbb{R}^d$ as a class of linear separators.

**Solution sketch:**
**1.** Course definition (lecture-2 formalization; exact phrasing unverified): $\{H_B\}$ is exponentially expressively efficient w.r.t. $\{H'_C\}$ if (i) every $H'_C$ is contained in some $H_B$ with $B$ polynomial (e.g., linear) in $C$, while (ii) containing $H_B$ inside $H'_C$ forces $C$ exponential in $B$, i.e., $\min\{C:\,H_B\subseteq H'_C\}=2^{\Omega(B)}$.

**2.** Condition (i): by assumption $H'_C\subseteq H_B$ already with $B=C$ (linear). Condition (ii): VC dimension is monotone under inclusion. So $H_B\subseteq H'_C$ implies $\exp(B)=VC(H_B)\le VC(H'_C)=C$. Thus any $C$ realizing the containment satisfies $C\ge e^B$ — exponential in $B$. Both conditions hold, giving exponential expressive efficiency.

**3.** Yes, the claim still holds: replacing $B\ge C$ by $B\ge 5C$ keeps requirement (i) with $B=5C$, still linear (in particular polynomial) in $C$. Expressive efficiency is defined up to polynomial overhead, and requirement (ii) is unaffected.

**4.** Duality trick: every input $x\in\mathbb{R}^d$ induces a homogeneous linear separator $g_x(w):=\operatorname{sign}(w^\top x)$ over "inputs" $w\in\mathbb{R}^d$, and $\{g_x:x\in\mathbb{R}^d\}$ is exactly the class of homogeneous $d$-dimensional linear separators, whose VC dimension is $d$. The set of achievable outputs $\{f(x):x\in\mathbb{R}^d\}$ equals the set of labelings this class produces on the $k$ points $w_1,\dots,w_k$ (the rows of $W$). Since $k>d=$ VC dimension, no set of $k$ points is shattered. So some labeling $y\in\{0,1\}^k$ of the rows is not realized — i.e., no $x$ satisfies $f(x)=y$.

**💡 Useful tricks:** VC monotonicity under inclusion turns containments into size bounds; input–parameter duality — treat rows of $W$ as data, inputs as separators; "some output unreachable" + a VC hint cues a shattering argument (Lecture 2 efficiency; Lecture 7 VC).

**⚠️ Watch out:** The definition needs both directions — polynomial containment one way AND exponential blow-up back; stating one loses points. Justify VC monotonicity before using it; in (3) $5C$ is still polynomial; in (4) strict $k>d$ is what forbids shattering.

## Q2 (39 pts) — Gradient flow on a Hadamard-product (diagonal linear network) overparameterization
**Topics:** linear-nn, gradient-flow, balancedness, conservation-laws, convexity, matrix-factorization | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_04_optimization_2, lecture_05_optimization_3, fodl_recitation_gradient_flow
**Statement (English translation):**
Let $L:\mathbb{R}^d\to\mathbb{R}$ be a convex, continuously differentiable loss function. For $N\ge2$ we define the following objective function:
$$\phi:\underbrace{\mathbb{R}^d\times\cdots\times\mathbb{R}^d}_{N\text{ times}}\to\mathbb{R},\qquad \phi(u_1,\dots,u_N)=L(u_1\odot\cdots\odot u_N),$$
where $\odot$ denotes the Hadamard product; that is, for $a,b\in\mathbb{R}^d$ it holds that $(a\odot b)_i=a_ib_i$ for every $i\in\{1,\dots,d\}$. This model is equivalent to a linear neural network whose weight matrices are constrained to be diagonal. For convenience, denote $\odot_{n=1}^N u_n:=u_1\odot\cdots\odot u_N$, as well as the "end-to-end" vector realized by $u_1,\dots,u_N$: $w:=\odot_{n=1}^N u_n$.

1. **(7 pts)** Prove that for every $j\in\{1,\dots,N\}$:
$$\frac{\partial}{\partial u_j}\phi(u_1,\dots,u_N)=\Big(\odot_{n\ne j}\,u_n\Big)\odot\nabla L(w),$$
where $\odot_{n\ne j}\,u_n$ denotes the Hadamard product of all the vectors $u_1,\dots,u_N$ except $u_j$.

2. **(8 pts)** Assume that $L$ attains its minimal value at a point $w^*\in\mathbb{R}^d$ and that $L(0)>L(w^*)$. Prove that $\phi$ is **not** convex.

Now assume that gradient flow is run over $\phi$ with initialization $u_1(0),\dots,u_N(0)\in\mathbb{R}^d$, and denote by $w(t)$ the end-to-end vector at time $t\ge0$, i.e., $w(t)=\odot_{n=1}^N u_n(t)$.

3. **(8 pts)** Prove that
$$\frac{d}{dt}\big[u_i^2(t)\big]=\frac{d}{dt}\big[u_j^2(t)\big]=-2\,w(t)\odot\nabla L(w(t))$$
holds for every $i,j\in\{1,\dots,N\}$, where the squaring denotes squaring each entry separately (entry-wise).

4. **(8 pts)** Prove that if at initialization $u_1(0)=\cdots=u_N(0)$ and all entries of $u_1(0)$ are positive, then:
$$\frac{d}{dt}w(t)=-N\,\nabla L(w(t))\odot w(t)^{\,2-\frac{2}{N}},$$
where the power $2-\frac2N$ in $w^{\,2-\frac2N}(t)$ denotes raising all entries of the vector to this power (or more precisely, squaring and then raising to the power $1-\frac1N$).

We focus on the loss function $L(w)=\frac12\|w-\mathbf1\|^2$, where $\mathbf1\in\mathbb{R}^d$ is the all-ones vector, and assume that at initialization $u_1(0)=\cdots=u_N(0)$ and all entries of $u_1(0)$ are positive.

5. **(8 pts)** Suppose that for every $t\ge0$ it holds that $w(t)\ge c\cdot\mathbf1$ **for some $c\in(0,1)$, where the inequality holds entry-wise**. Under this assumption, use sub-part 4 in order to prove that for every $t\ge0$:
$$L(w(t))\le L(w(0))\cdot\exp\Big(-2Nc^{\,2-\frac{2}{N}}\cdot t\Big),$$
i.e., the loss function converges to $0$ at an exponential rate.
*Hint:* first show that $\frac{d}{dt}L(w(t))\le-2Nc^{\,2-\frac{2}{N}}\cdot L(w(t))$.

**Solution sketch:**
**1.** Entry-wise chain rule: $w_i=\prod_n (u_n)_i$. So $\frac{\partial\phi}{\partial (u_j)_i}=(\nabla L(w))_i\cdot\frac{\partial w_i}{\partial (u_j)_i}=(\nabla L(w))_i\prod_{n\ne j}(u_n)_i$. Stacking coordinates gives $(\odot_{n\ne j}u_n)\odot\nabla L(w)$.

**2.** At the origin $(0,\dots,0)$, every block gradient contains a Hadamard product of $N-1\ge1$ zero vectors. Hence $\nabla\phi=0$: the origin is a critical point. But $\phi(0)=L(0)>L(w^*)=\phi(w^*,\mathbf1,\dots,\mathbf1)$. So the origin is not a global minimum. A differentiable convex function has every critical point a global minimum. Therefore $\phi$ is not convex.

**3.** $\frac{d}{dt}u_j^2=2\,u_j\odot\dot u_j=-2\,u_j\odot\big(\odot_{n\ne j}u_n\big)\odot\nabla L(w)=-2\,w\odot\nabla L(w)$ — the same expression for every $j$ (this is the balancedness conservation law: $u_i^2(t)-u_j^2(t)$ is invariant under gradient flow).

**4.** By (3) and the balanced positive initialization, $u_i^2(t)-u_j^2(t)\equiv0$, and by continuity the entries stay of the same sign. So $u_1(t)=\cdots=u_N(t)=:u(t)$ for all $t$. Then $w=u^{\,N}$ (entry-wise), and $\dot w=N\,u^{N-1}\odot\dot u=-N\,u^{2N-2}\odot\nabla L(w)=-N\,w^{2-\frac2N}\odot\nabla L(w)$.

**5.** $\frac{d}{dt}L(w(t))=\langle\nabla L(w),\dot w\rangle=-N\sum_i w_i^{2-\frac2N}\,(\nabla L(w))_i^2\le-N\,c^{2-\frac2N}\,\|\nabla L(w)\|^2$, using $w_i(t)\ge c>0$ and $2-\frac2N\ge1>0$. For $L(w)=\frac12\|w-\mathbf1\|^2$: $\nabla L(w)=w-\mathbf1$ and $\|\nabla L(w)\|^2=2L(w)$. Hence $\frac{d}{dt}L\le-2Nc^{2-\frac2N}L$. Grönwall's inequality then yields $L(w(t))\le L(w(0))e^{-2Nc^{2-2/N}t}$.

**💡 Useful tricks:** Entry-wise chain rule for each block gradient; the origin is critical because every block gradient hides a product of $N-1$ zero vectors ⇒ non-convex via "critical but not global"; balancedness $u_i^2-u_j^2$ is conserved *entry-wise*; balanced positive init ⇒ all $u_n$ stay equal ⇒ $w=u^N$ ⇒ the $-N\,\nabla L\odot w^{2-2/N}$ dynamics; then $\|\nabla L\|^2=2L$ closes the Grönwall.

**⚠️ Watch out:** (2) exhibit the strictly-better point $w^*$ — a critical point alone is not non-convexity; (4) justify "$u_1(t)=\cdots=u_N(t)$ for all $t$" from conservation + sign continuity, not just at $t=0$; (5) the *entry-wise* barrier $w_i\geq c$ is what lets you factor out $c^{2-2/N}$; use $\nabla L=w-\mathbf1$.

## Q3 (34 pts) — Finite-bit networks: uniform convergence bound and its failure under interpolation
**Topics:** uniform-convergence, hoeffding, concentration, interpolation | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1, lecture_08_generalization_3, lecture_09_generalization_4
**Statement (English translation):**
For an input space $X$ and output space $Y$, let $H$ be the hypothesis class of a neural network with some architecture, all of whose parameters together are represented by $b\in\mathbb{N}$ bits. Let $D$ be an (unknown) distribution over $X\times Y$, let $S=\{(x_i,y_i)\}_{i=1}^m$ be a training sample of $m$ examples drawn i.i.d. from $D$, and let $\ell:Y\times Y\to[0,1]$ be a loss function. For a hypothesis $h\in H$, denote by $L_D(h):=\mathbb{E}_{(x,y)\sim D}[\ell(h(x),y)]$ the generalization error and by $L_S(h):=\frac1m\sum_{i=1}^m\ell(h(x_i),y_i)$ the sample (empirical) error.

1. **(11 pts)** Prove that with probability greater than or equal to $1-\delta$:
$$\forall h\in H:\quad L_D(h)-L_S(h)\le\sqrt{\frac{\ln\!\big(\frac{2}{\delta}\big)+b\cdot\ln(2)}{2m}}.$$
*Reminder (Hoeffding bound):* let $A_1,\dots,A_m$ be independent, identically distributed random variables bounded in the interval $[0,1]$. For every $\epsilon\ge0$:
$$P\Big(\Big|\tfrac1m\textstyle\sum_{i=1}^m A_i-\mathbb{E}[A_1]\Big|\ge\epsilon\Big)\le 2\exp(-2m\epsilon^2).$$

Assume now that $X=\mathbb{R}^d$ and $Y=\{0,1\}$, and that the network can correctly classify **every training sample of size $m$**. That is, for every $(x_1,y_1),\dots,(x_m,y_m)\in X\times Y$ for which $x_i\ne x_j$ whenever $i\ne j$, there exists a hypothesis $h\in H$ such that $h(x_1)=y_1,\dots,h(x_m)=y_m$.

2. **(6 pts)** Prove that $b\ge m$.

3. **(5 pts)** Explain why the "uniform convergence" bound from sub-part 1 would give a trivial guarantee on the generalization error in this case.

4. **(6 pts)** Define a distribution $D$ over $X\times Y$ such that no matter which hypothesis $h\in H$ is chosen, it will hold that $L_D(h)=0.5$. [Context implies the 0–1 loss, $\ell(\hat y,y)=\mathbb{1}[\hat y\ne y]$.]

5. **(6 pts)** Show that there exists a distribution $D$ over $X\times Y$, and a way to return a hypothesis $h\in H$ that correctly classifies every training sample drawn from $D$ (i.e., for which $h(x_1)=y_1,\dots,h(x_m)=y_m$ holds), such that the generalization error of $h$ is zero, i.e., $L_D(h)=0$.

**Solution sketch:**
**1.** $b$ bits represent all parameters. So $|H|\le2^b$. For a fixed $h$, Hoeffding on the i.i.d. losses gives tail $2e^{-2m\epsilon^2}$. A union bound with confidence $\delta/|H|$ per hypothesis gives $\sqrt{\ln(2|H|/\delta)/(2m)}\le\sqrt{(\ln(2/\delta)+b\ln2)/(2m)}$.

**2.** Fix any $m$ distinct inputs. The interpolation property realizes all $2^m$ labelings, and distinct labelings require distinct hypotheses. So $2^b\ge|H|\ge2^m$, hence $b\ge m$.

**3.** Plugging $b\ge m$ into the bound gives at least $\sqrt{(m\ln2)/(2m)}=\sqrt{\ln2/2}\approx0.59$ — a constant that does not shrink as $m$ grows. Since the loss lies in $[0,1]$, a guaranteed gap of $\approx0.59$ is essentially vacuous (trivial).

**4.** Choose any marginal over $x$ (e.g., a point mass at some $x_0$) with $y\sim\mathrm{Bernoulli}(1/2)$ independent of $x$: for the 0–1 loss, $L_D(h)=\mathbb{E}_x\big[\tfrac12\ell(h(x),0)+\tfrac12\ell(h(x),1)\big]=\tfrac12$ for every $h$ — the label is pure noise.

**5.** Let $D$ be a point mass on a single pair $(x_0,y_0)$. Every sample consists of copies of $(x_0,y_0)$. The interpolation property yields some $h$ with $h(x_0)=y_0$ (e.g., apply it to $m$ distinct inputs that include $x_0$ with label $y_0$). Returning it classifies the sample correctly, and $L_D(h)=\ell(y_0,y_0)=0$.

**💡 Useful tricks:** $b$ bits ⇒ $|H|\leq2^b$ ⇒ Hoeffding + union gives the stated $\sqrt{(\ln(2/\delta)+b\ln2)/2m}$; "correctly classifies every sample" ⇒ all $2^m$ labelings realizable ⇒ $2^b\geq2^m$ ⇒ $b\geq m$; a pure-noise label ($y\sim\mathrm{Bernoulli}(\tfrac12)$) forces $L_D=\tfrac12$ for every $h$; a point-mass $D$ makes interpolation give $L_D=0$.

**⚠️ Watch out:** (2) the counting needs *distinct labelings ⇒ distinct hypotheses*; (3) with $b\geq m$ the $b\ln2/2m$ term is $\Omega(1)$ and never shrinks — this is the Zhang-et-al. "uniform convergence fails for DL" moral, not a computational slip; (4)/(5) the punchline is that the SAME class $H$ has both a vacuous (noise) and a perfect (realizable) case — generalization is not a property of $H$ alone.

Takeaway: for interpolating (memorizing) classes, uniform convergence cannot distinguish chance-level generalization ($0.5$) from perfect generalization ($0$) — generalization depends on the distribution and algorithm, not on capacity alone.
