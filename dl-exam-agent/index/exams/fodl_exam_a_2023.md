# FODL Exam — Moed A 2023
**Date / semester:** 13.07.2023 — Semester B 2022/23 (תשפ"ג), Moed A; lecturer Dr. Nadav Cohen, TA Noam Razin; 3-hour exam
**Total points:** 105

## Q1 (38 pts) — Local linearity regions of shallow bias-free ReLU networks
**Topics:** hypothesis-class, relu-networks, linear-regions | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
We say that $h:\mathbb{R}^d\to\mathbb{R}$ is *linear around* $x\in\mathbb{R}^d$ *according to a vector* $a\in\mathbb{R}^d$ if there exists $\epsilon>0$ such that for every $x'\in\mathbb{R}^d$ with $\|x'-x\|\le\epsilon$ it holds that $h(x')=a^\top x'$. That is, there exists a ball around $x$ on which $h$ is the linear function defined by $a$. Denote:
$$A_h=\big\{a\in\mathbb{R}^d:\ \exists\, x\in\mathbb{R}^d \text{ for which } h \text{ is linear around } x \text{ according to the vector } a\big\}.$$
In other words, $A_h$ contains, for every point around which $h$ is linear, the vector that defines $h$ in that point's neighborhood.

Let $H_M$ be the hypothesis class of neural networks with a single hidden layer of width $M$, without biases, with one-dimensional input and output (that is, $X=Y=\mathbb{R}$, where $X$ is the input space and $Y$ the output space), and ReLU activation on the hidden-layer neurons. Namely:
$$H_M=\Big\{x\mapsto \textstyle\sum_{i=1}^M v_i\,\sigma(w_i x)\ :\ w_1,\dots,w_M,\,v_1,\dots,v_M\in\mathbb{R}\Big\},\qquad \sigma(z)=\max\{0,z\}.$$

1. **(12 pts)** Prove that for every $h\in H_M$ it holds that $|A_h|\le 2$. Note that in this sub-part the input dimension in the definition of $A_h$ is $d=1$.

Now we focus on networks with multi-dimensional input. For $d\ge 2$, denote by $H_M^d$ the hypothesis class of neural networks with a single hidden layer of width $M$, without biases, $d$-dimensional input and one-dimensional output (that is, $X=\mathbb{R}^d$, $Y=\mathbb{R}$), and ReLU activation on the hidden-layer neurons. Namely:
$$H_M^d=\Big\{x\mapsto \textstyle\sum_{i=1}^M v_i\,\sigma(w_i^\top x)\ :\ w_1,\dots,w_M\in\mathbb{R}^d,\ v_1,\dots,v_M\in\mathbb{R}\Big\}.$$

2. **(13 pts)** Let $h\in H_M^d$ be defined by the weights $w_1,\dots,w_M\in\mathbb{R}^d$, $v_1,\dots,v_M\in\mathbb{R}$. For $x\in\mathbb{R}^d$ satisfying $w_i^\top x\neq 0$ for every $i\in\{1,\dots,M\}$, prove that $h$ is linear around $x$ according to some $a\in\mathbb{R}^d$. Write explicitly what the $a$ according to which $h$ is linear is (note that $a$ may depend on $x$).

3. **(13 pts)** Assume that $M\ge d$ (the network's width is not smaller than the input dimension). Prove or disprove the following claim: there exists $h\in H_M^d$ for which $|A_h|\ge 2^d$.

**Solution sketch:**
**1.** With no biases, each neuron $x\mapsto v_i\sigma(w_i x)$ is linear separately on $x>0$ and on $x<0$ (only possible breakpoint is $x=0$). Around any $x>0$:

$$h(x')=\big(\sum_{i:\,w_i>0}v_iw_i\big)x'$$

Around any $x<0$:

$$h(x')=\big(\sum_{i:\,w_i<0}v_iw_i\big)x'$$

Hence every local-linearity coefficient equals $a_+=\sum_{i:w_i>0}v_iw_i$ or $a_-=\sum_{i:w_i<0}v_iw_i$. Linearity around $x=0$ (if it holds) forces the coefficient to coincide with these, so $A_h\subseteq\{a_+,a_-\}$ and $|A_h|\le2$.

**2.** Set

$$\epsilon=\min_{i:\,w_i\ne0}\,|w_i^\top x|/\|w_i\|>0$$

For $\|x'-x\|\le\epsilon$, each $w_i^\top x'$ has the same sign as $w_i^\top x$ (Cauchy–Schwarz). So on this ball $h(x')=\sum_{i\in I_+}v_i\,w_i^\top x'$ with $I_+=\{i:\,w_i^\top x>0\}$, i.e., $h$ is linear around $x$ with

$$\boxed{\,a=\sum_{i\in I_+}v_i w_i\,}$$

**3.** The claim is TRUE. Take $w_i=e_i$ (standard basis) and $v_i=1$ for $i=1,\dots,d$, and $v_i=0$ (or $w_i=0$) for the remaining $M-d$ neurons, i.e., $h(x)=\sum_{i=1}^d\sigma(x_i)$. For every sign pattern $s\in\{+,-\}^d$, pick $x$ in the corresponding open orthant (all $w_i^\top x=x_i\ne0$). By sub-part 2, $h$ is linear around $x$ with $a_s=\sum_{i:\,s_i=+}e_i$. These are the indicator vectors of all $2^d$ subsets of $\{1,\dots,d\}$ — pairwise distinct — hence $|A_h|\ge2^d$.

**💡 Useful tricks:** Bias-free ReLU ⇒ every breakpoint hyperplane passes through the origin, so sign patterns of $\{w_i^\top x\}$ index the linear regions; the local coefficient is $a=\sum_{i\,:\,w_i^\top x>0}v_iw_i$; to reach $2^d$ regions choose $w_i=e_i,v_i=1$ so distinct orthants give distinct subset-indicator vectors.

**⚠️ Watch out:** (1) in $d=1$ there are only two sign regions, and the coefficient at $x=0$ (if linear there) must equal $a_+$ or $a_-$ — hence $|A_h|\leq2$; (2) exhibit an *explicit* $\epsilon$ (Cauchy–Schwarz keeps every sign fixed on the ball) and write $a$ explicitly; (3) the claim is TRUE — prove the $2^d$ vectors are pairwise distinct.

## Q2 (37 pts) — Gradient flow: PL-type convergence rate and a softmax conservation law
**Topics:** gradient-flow, pl-condition, conservation-laws, softmax-invariance | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_03_optimization_1, lecture_04_optimization_2, fodl_recitation_gradient_flow
**Statement (English translation):**
**Part One.** Let $f:\mathbb{R}^d\to\mathbb{R}$ be continuously differentiable, attaining its minimal value at a point $w^*\in\operatorname{argmin}_{w\in\mathbb{R}^d}f(w)$. Assume that for every $w\in\mathbb{R}^d$:
$$f(w)-f(w^*)\le\|\nabla f(w)\|^2.$$

1. **(10 pts)** Suppose we run gradient flow over $f$ with initialization $w_0\in\mathbb{R}^d$. Denote by $w(t)$ the parameters of $f$ at time $t\ge0$. Prove that for every $t\ge0$:
$$f(w(t))-f(w^*)\le e^{-t}\cdot\big(f(w_0)-f(w^*)\big).$$

**Part Two.** Let $f:\mathbb{R}^d\to\mathbb{R}$ be continuously differentiable. Assume there exists $v\in\mathbb{R}^d$ for which $f(w+c\cdot v)=f(w)$ for all $c\in\mathbb{R}$ and $w\in\mathbb{R}^d$.

2. **(6 pts)** Prove that $\nabla f(w)^\top v=0$ for every $w\in\mathbb{R}^d$. *Hint:* consider $g(c):=f(w+c\cdot v)$.

3. **(6 pts)** Denote by $S:\mathbb{R}^d\to\mathbb{R}^d$ the softmax function; that is, for every $z\in\mathbb{R}^d$ and index $i\in\{1,\dots,d\}$:
$$S(z)_i=\frac{\exp(z_i)}{\sum_{j=1}^d\exp(z_j)}.$$
Prove that $S(z+c\cdot\mathbf{1})=S(z)$ for every $z\in\mathbb{R}^d$ and $c\in\mathbb{R}$, where $\mathbf{1}\in\mathbb{R}^d$ is the vector all of whose entries equal one.

Let $h_\theta:\mathbb{R}^d\to\mathbb{R}^d$ be a fully-connected network with $L-1$ hidden layers, without biases, a differentiable activation function $\sigma$, and weights $\theta$; that is:
$$h_\theta(x)=W_L\,\sigma\big(W_{L-1}\,\sigma(\cdots\sigma(W_1x)\cdots)\big),$$
where $\theta:=(W_1,\dots,W_L)$ is a vector containing all entries of the network's weight matrices. For simplicity, assume the input dimension, the output dimension, and all hidden dimensions are $d$. Assume also that we possess a single training example $x\in\mathbb{R}^d$ with label $y\in\mathbb{R}$, and a continuously differentiable loss function $\ell:\mathbb{R}^d\times\mathbb{R}\to\mathbb{R}$ (the second variable of $\ell$ is the true label and the first is the network's prediction).

4. **(10 pts)** Consider the following loss function with respect to the parameters of the network's last layer:
$$\phi(W_L):=\ell\big(S(h_\theta(x)),\,y\big).$$
Suppose we run gradient flow over $\phi$ with initialization $W_L(0)\in\mathbb{R}^{d\times d}$ (that is, we train only the last layer of the network and "freeze" $W_1,\dots,W_{L-1}$ at arbitrary values). Denote by $W_L(t)$ the last layer's parameters at time $t\ge0$. Prove that for every $t\ge0$:
$$\langle W_L(t),\mathbf{1}\rangle=\langle W_L(0),\mathbf{1}\rangle,$$
where $\mathbf{1}\in\mathbb{R}^{d\times d}$ denotes the matrix all of whose entries equal one. In other words, prove that the sum of the weights in the last layer does not change under gradient flow.
*Hint:* use the claims from sub-parts 2 and 3.

5. **(5 pts)** If we were to run gradient flow with respect to all of the network's parameters, that is, over the function $\psi(\theta):=\ell\big(S(h_\theta(x)),y\big)$, would $\langle W_L(t),\mathbf{1}\rangle=\langle W_L(0),\mathbf{1}\rangle$ still hold for every time $t\ge0$? Prove your answer.

**Solution sketch:**
**1.** Under gradient flow $\dot w(t)=-\nabla f(w(t))$:

$$\frac{d}{dt}\big(f(w(t))-f(w^*)\big)=-\|\nabla f(w(t))\|^2\le-\big(f(w(t))-f(w^*)\big)$$

by the assumed PL-type inequality. Grönwall (or integrating $\frac{d}{dt}\ln(\cdot)\le-1$, handling the case where the gap hits $0$) gives the $e^{-t}$ decay.

**2.** $g(c)=f(w+cv)$ is constant and differentiable, so $0=g'(0)=\nabla f(w)^\top v$. Since $w$ was arbitrary, this holds everywhere.

**3.** Both numerator and denominator gain a factor $e^c$:

$$S(z+c\mathbf1)_i=\frac{e^{c}e^{z_i}}{e^{c}\sum_j e^{z_j}}=S(z)_i$$

**4.** Write $u:=\sigma(W_{L-1}\sigma(\cdots\sigma(W_1x)))$ so $\phi(W_L)=\ell(S(W_Lu),y)$. Since

$$(W_L+c\,\mathbf1_{d\times d})u=W_Lu+c\,(\mathbf1^\top u)\,\mathbf1_d$$

sub-part 3 gives $\phi(W_L+c\,\mathbf1_{d\times d})=\phi(W_L)$ for all $c$. By sub-part 2 (applied in $\mathbb{R}^{d\times d}$ with direction $v=\mathbf1_{d\times d}$): $\langle\nabla\phi(W_L),\mathbf1\rangle=0$ for every $W_L$. Hence

$$\frac{d}{dt}\langle W_L(t),\mathbf1\rangle=\langle-\nabla\phi(W_L(t)),\mathbf1\rangle=0$$

so the inner product is conserved.

**5.** Yes, it still holds: under full-network gradient flow $\dot W_L(t)=-\nabla_{W_L}\psi(\theta(t))$, and for *any* fixed values of $W_1,\dots,W_{L-1}$ the map $W_L\mapsto\psi(\theta)$ has the same invariance to adding $c\,\mathbf1_{d\times d}$. Therefore $\langle\nabla_{W_L}\psi(\theta),\mathbf1\rangle=0$ at every $\theta$, and $\langle W_L(t),\mathbf1\rangle$ remains constant.

**💡 Useful tricks:** PL inequality + GF ⇒ $\frac{d}{dt}(f-f^*)\leq-(f-f^*)$ ⇒ Grönwall gives $e^{-t}$; an invariance direction $v$ forces $\nabla f\perp v$ (differentiate $g(c)=f(w+cv)$ at $0$); softmax is shift-invariant because the $e^c$ cancels; chain them — adding $c\mathbf1$ to $W_L$ shifts the logits by a constant, softmax's exact null direction.

**⚠️ Watch out:** (1) handle the case where the gap reaches $0$ when dividing by it in Grönwall; (4) the crux is $(W_L+c\mathbf1)u=W_Lu+c(\mathbf1^\top u)\mathbf1$ — a *constant* logit shift, not an arbitrary one; (5) "yes" — the invariance holds in $W_L$ for ANY frozen lower layers, so the same $\nabla_{W_L}\perp\mathbf1$ argument survives.

## Q3 (30 pts) — Generalization via a finite cover: uniform convergence, Lipschitz discretization, index-weighted bounds
**Topics:** uniform-convergence, hoeffding, concentration, covering-numbers, implicit-regularization, probability-tools | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2, lecture_09_generalization_4
**Statement (English translation):**
For an input space $X$ and output space $Y$, let $H\subseteq Y^X$ be a hypothesis class and let $F\subseteq H$ be a **finite** subset of $H$. Let $\epsilon>0$. Assume that for every $h\in H$ there exists $f\in F$ such that
$$|h(x)-f(x)|\le\epsilon \quad\text{for every } x\in X$$
(i.e., $F$ is an $\epsilon$-cover of $H$ in the sup norm; quantification over $x$ per the use of $\|h-f\|_\infty$ in sub-part 3).

Let $D$ be an (unknown) distribution over $X\times Y$, let $S=\{(x_n,y_n)\}_{n=1}^N$ be a training sample of $N$ examples drawn i.i.d. from $D$, and let $\ell:Y\times Y\to[0,1]$ be a loss function. For a hypothesis $h\in H$, denote by $L_D(h)$ the generalization error (namely $L_D(h):=\mathbb{E}_{(x,y)\sim D}[\ell(h(x),y)]$) and by $L_S(h)$ the sample (empirical) error (namely $L_S(h):=\frac{1}{N}\sum_{n=1}^N\ell(h(x_n),y_n)$).

1. **(8 pts)** Derive a generalization bound based on uniform convergence for the class $F$. That is, derive an expression $\Delta(N,\delta)$ (which does not depend on the hypothesis), satisfying $\Delta(N,\delta)\xrightarrow[N\to\infty]{}0$ for every $\delta\in(0,1)$, such that with probability greater than or equal to $1-\delta$:
$$\forall f\in F:\quad L_D(f)-L_S(f)\le\Delta(N,\delta).$$
*Reminder (Hoeffding bound):* let $A_1,\dots,A_N$ be independent, identically distributed random variables bounded in the interval $[0,1]$. For every $\epsilon\ge0$:
$$P\Big(\Big|\tfrac{1}{N}\textstyle\sum_{i=1}^N A_i-\mathbb{E}[A_1]\Big|\ge\epsilon\Big)\le 2\exp(-2N\epsilon^2).$$

2. **(11 pts)** Assume the loss function $\ell$ is $\rho$-Lipschitz with respect to its first variable, for a constant $\rho>0$. Derive a generalization bound for the class $H$ based on the "bounding (covering) technique" taught in class. That is, for $\Delta(N,\delta)$ from the previous sub-part, prove that for every $\delta\in(0,1)$, with probability greater than or equal to $1-\delta$:
$$\forall h\in H:\quad L_D(h)-L_S(h)\le\Delta(N,\delta)+2\rho\epsilon.$$

3. **(11 pts)** Denote by $F_1,\dots,F_R\subseteq F$ an arbitrary partition of $F$ into disjoint subsets. That is, $F_i\cap F_j=\emptyset$ for every $i\neq j\in\{1,\dots,R\}$, and $F_1\cup\cdots\cup F_R=F$. Suppose we possess a learning algorithm which tends to return hypotheses $h\in H$ for which $f\in\operatorname{argmin}_{f\in F}\|h-f\|_\infty$ lies in a subset $F_i$ with relatively small index $i$. Derive a generalization bound similar to the bound from sub-part 2, but suited to the use of this algorithm. That is, for $h\in H$, the smaller the index $i$ of the subset $F_i$ in which the hypothesis of $F$ closest to $h$ lies, the smaller the bound for $h$ should be.

**Solution sketch:**
**1.** Fix $f\in F$: the variables $A_n=\ell(f(x_n),y_n)$ are i.i.d. in $[0,1]$ with mean $L_D(f)$. Hoeffding gives tail $2e^{-2N\epsilon^2}$. Union bound over the finite $F$ with per-hypothesis confidence $\delta/|F|$ yields

$$\Delta(N,\delta)=\sqrt{\ln(2|F|/\delta)/(2N)}\to0$$

**2.** Given $h\in H$, choose a cover element $f$ with $\|h-f\|_\infty\le\epsilon$. The $\rho$-Lipschitz property gives pointwise $|\ell(h(x),y)-\ell(f(x),y)|\le\rho\epsilon$. Hence $|L_D(h)-L_D(f)|\le\rho\epsilon$ and $|L_S(h)-L_S(f)|\le\rho\epsilon$. On the event of sub-part 1:

$$L_D(h)-L_S(h)\le\big(L_D(f)-L_S(f)\big)+2\rho\epsilon\le\Delta(N,\delta)+2\rho\epsilon$$

simultaneously for all $h\in H$.

**3.** Non-uniform (SRM-style) confidence allocation: set $\delta_i:=\delta\cdot2^{-i}$ (any summable split such as $\delta/(i(i+1))$ works, so $\sum_i\delta_i\le\delta$). Apply the sub-part-1 bound to each $F_i$ with confidence $\delta_i$ and take a union bound over $i$. W.p. $\ge1-\delta$, simultaneously for every $i$ and every $f\in F_i$:

$$L_D(f)-L_S(f)\le\Delta_i:=\sqrt{\big(\ln(2|F|/\delta)+i\ln2\big)/(2N)}$$

(Bound $|F_i|\le|F|$ inside the log so $\Delta_i$ is genuinely increasing in $i$; keeping $\ln|F_i|$ can violate the required monotonicity since the partition sizes $|F_i|$ are arbitrary.) Combining with the covering step as in (2): every $h\in H$ whose nearest cover element lies in $F_i$ satisfies

$$L_D(h)-L_S(h)\le\Delta_i+2\rho\epsilon$$

— a bound increasing with $i$, i.e., tighter for the low-index hypotheses the algorithm implicitly prefers.

**💡 Useful tricks:** Cover ⇒ Hoeffding + union on the finite $F$ only; bridge to all of $H$ with the $2\rho\epsilon$ Lipschitz transfer; "algorithm prefers small-index cells" ⇒ SRM weights $\delta_i=\delta 2^{-i}$ (or any summable split) per cell.

**⚠️ Watch out:** the transfer costs $2\rho\epsilon$ (paid on both $L_D$ and $L_S$); put $\ln|F|$ (not $\ln|F_i|$) inside the root so $\Delta_i$ is *genuinely increasing* in $i$ — arbitrary cell sizes $|F_i|$ can otherwise break the required monotonicity; the nearest cover point is guaranteed within $\epsilon$ by assumption.
