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

**1. One-dimensional input: at most two local vectors**

**What is asked.** Prove that every shallow bias-free ReLU network with one-dimensional input has at most two distinct local coefficients, i.e. $|A_h|\le2$. The answer is a proof.

**Tool and why.** Counting the pieces of a piecewise-linear network (cheat sheet §5): a ReLU neuron breaks only where its input vanishes. Without a bias the input of neuron $i$ is $w_ix$, which vanishes only at the origin, or everywhere if $w_i=0$. So the line splits into just two rays, and on each of them $h$ is a straight line through the origin.

**Definitions.** Group the neurons' contributions by the sign of the weight:

$$\begin{aligned}
a_+&=\sum_{i:\,w_i>0}v_iw_i,\\
a_-&=\sum_{i:\,w_i<0}v_iw_i.
\end{aligned}$$

These are the slopes of $h$ to the right and to the left of the origin. We introduce them because we will show that every vector in $A_h$ equals one of them.

**Solution.**

Step 1, the right ray: let $x'>0$. If $w_i>0$ then $w_ix'>0$, so $\sigma(w_ix')=w_ix'$. If $w_i\le0$ then $w_ix'$ is not positive, so $\sigma(w_ix')=0$. Hence for every $x'>0$:

$$h(x')=\sum_{i:\,w_i>0}v_iw_ix'=a_+x'.$$

Step 2, the left ray: let $x'<0$. Now $w_ix'>0$ exactly when $w_i<0$, and by the same reasoning, for every $x'<0$:

$$h(x')=\sum_{i:\,w_i<0}v_iw_ix'=a_-x'.$$

Step 3, a point $x>0$: suppose $h$ is linear around $x$ according to $a$. The point $x$ itself lies in the ball, so $h(x)=ax$. By Step 1 also $h(x)=a_+x$. Dividing by $x$, which is nonzero, gives $a=a_+$.

Step 4, a point $x<0$: the same argument with Step 2 gives $a=a_-$.

Step 5, the origin: suppose $h$ is linear around $0$ according to $a$ with radius $\epsilon$. The point $x'=\epsilon$ lies in the ball and is positive, so by Step 1 we get $a\epsilon=a_+\epsilon$, i.e. $a=a_+$. Likewise the point $x'=-\epsilon$ gives $a=a_-$. So linearity at the origin is possible only when the two slopes coincide, and even then the vector is $a_+$.

Step 6, conclusion: in each of the three cases the vector is $a_+$ or $a_-$. Hence $A_h\subseteq\{a_+,a_-\}$, and therefore

$$\boxed{|A_h|\le2}$$

**In words.** Without biases every breakpoint of every neuron sits at the same point, the origin. The line splits into two rays, and on each ray the network is a straight line through the origin, so only two slopes are possible.

**Sanity check.** For $h(x)=\sigma(x)$ we get $a_+=1$ and $a_-=0$, and indeed $A_h=\{0,1\}$: the bound is tight. For $h(x)=\sigma(x)-\sigma(-x)$ we get $a_+=1$ and also $a_-=(-1)\cdot(-1)$, which is $1$. So $h(x)=x$, then $|A_h|=1$ and $h$ is linear at the origin too, as Step 5 allows.

**What to write in the exam.**

- Define $a_+$ and $a_-$ as the sums of $v_iw_i$ over the neurons with $w_i$ positive and with $w_i$ negative.
- Show that $h(x')=a_+x'$ for every $x'>0$, and that $h(x')=a_-x'$ for every $x'<0$.
- At a point $x\ne0$ the point itself is in the ball, so $a=a_+$ or $a=a_-$. At the origin substitute $x'=\epsilon$.
- Conclusion: $A_h\subseteq\{a_+,a_-\}$, hence $|A_h|\le2$.

*Verified: 2,000 random networks with up to $7$ neurons, some with $w_i=0$: a numerical check at random points and at the origin found every local vector inside $\{a_+,a_-\}$, and at most two per network.*

**2. The local vector in dimension $d$**

**What is asked.** Prove that if no neuron vanishes at the point $x$, then $h$ is linear around $x$, and write the vector $a$ explicitly. The answer is a proof and a formula.

**Tool and why.** The same idea as in part 1, in higher dimension (cheat sheet §5): neuron $i$ breaks only on the hyperplane $w_i^\top x=0$, and $x$ lies on none of them. It suffices to find a ball around $x$ that crosses no such hyperplane, because on it every neuron's activation state is fixed. The radius comes from the Cauchy–Schwarz inequality.

**Definitions.** Let $I_+$ be the set of neurons active at $x$:

$$I_+=\{i:\ w_i^\top x>0\}.$$

We introduce it because near $x$ only these neurons contribute to $h$. We also define a radius:

$$\epsilon=\tfrac12\min_{1\le i\le M}\frac{|w_i^\top x|}{\|w_i\|}.$$

This is half the smallest distance from $x$ to the breakpoint hyperplanes. The half guarantees that signs are preserved strictly, not just up to zero.

**Solution.**

Step 1, the radius is well defined and positive: for every $i$ we have $w_i^\top x\ne0$, so $w_i\ne0$ and the ratio is defined. It is a minimum of $M$ positive numbers, so $\epsilon>0$.

Step 2, the signs are constant on the ball: let $x'$ satisfy $\|x'-x\|\le\epsilon$. By Cauchy–Schwarz and by the definition of $\epsilon$:

$$\begin{aligned}
|w_i^\top x'-w_i^\top x|&=|w_i^\top(x'-x)|\\
&\le\|w_i\|\,\|x'-x\|\\
&\le\|w_i\|\,\epsilon\\
&\le\tfrac12|w_i^\top x|.
\end{aligned}$$

So $w_i^\top x'$ is within half its own magnitude of $w_i^\top x$, hence has exactly the same sign.

Step 3, splitting the sum: for $i\in I_+$ we have $w_i^\top x'>0$, so $\sigma(w_i^\top x')=w_i^\top x'$. For $i\notin I_+$ we have $w_i^\top x'<0$, so $\sigma(w_i^\top x')=0$. Substituting:

$$\begin{aligned}
h(x')&=\sum_{i\in I_+}v_i\,w_i^\top x'+\sum_{i\notin I_+}v_i\cdot0\\
&=\Big(\sum_{i\in I_+}v_iw_i\Big)^{\!\top}x'.
\end{aligned}$$

Step 4, conclusion: for every $x'$ in the ball, $h(x')=a^\top x'$, with

$$\boxed{\,a=\sum_{i\in I_+}v_i w_i\,}$$

so $h$ is linear around $x$ according to $a$. The vector depends on $x$ only through the set $I_+$.

**In words.** Near $x$ every neuron is in a fixed state, on or off, and a small move does not change it. An active neuron acts as the linear function $v_iw_i^\top x'$, an inactive one contributes zero, and a sum of linear functions is linear.

**Sanity check.** For $d=1$ and $x>0$, the set $I_+$ is exactly the neurons with $w_i>0$, and the formula returns $a_+$ from part 1. Also, $a$ is the gradient of $h$ at $x$, as it must be for a linear function.

**What to write in the exam.**

- Define $I_+$, and $\epsilon$ as half the minimum of $|w_i^\top x|/\|w_i\|$.
- By Cauchy–Schwarz, on the ball every $w_i^\top x'$ keeps the sign of $w_i^\top x$.
- Hence on the ball $h(x')=\sum_{i\in I_+}v_iw_i^\top x'$.
- Conclusion: $a=\sum_{i\in I_+}v_iw_i$.

*Verified: 2,000 random networks with $d$ between $2$ and $5$ and up to $8$ neurons: at each of 20 random points in the ball of radius $\epsilon$, $h(x')=a^\top x'$ to within $10^{-9}$.*

**3. A construction with $2^d$ local vectors**

**What is asked.** Decide whether, when $M\ge d$, there exists $h\in H_M^d$ with $|A_h|\ge2^d$. The answer is a verdict followed by an explicit construction or a refutation.

**Tool and why.** To prove existence one example suffices (cheat sheet §4 and §5). We build a network in which every orthant activates a different set of neurons, and read off the local vector in each orthant from the formula of part 2.

**Definitions.** Let $e_1,\dots,e_d$ be the standard basis. For every sign vector $s\in\{+1,-1\}^d$ let $x^{(s)}$ be the point with entries $s_1,\dots,s_d$; it lies in the open orthant of $s$. Let $P(s)$ be the set of indices $j$ with $s_j=+1$. These symbols enumerate the orthants and the activation patterns.

**Solution.**

**Verdict: the claim is TRUE.**

Step 1, the network: for $i\le d$ take $w_i=e_i$ and $v_i=1$. For the remaining $M-d$ neurons take $w_i=e_1$ and $v_i=0$. This is possible because $M\ge d$, and the result is

$$h(x)=\sum_{i=1}^d\sigma(x_i).$$

The extra neurons are switched off through $v_i=0$ rather than $w_i=0$, because part 2 requires $w_i^\top x\ne0$ for every $i$.

Step 2, the hypothesis of part 2: at the point $x^{(s)}$, for $i\le d$ we have $w_i^\top x^{(s)}=s_i$, and for the extra neurons $w_i^\top x^{(s)}=s_1$. All of these are nonzero, so part 2 applies.

Step 3, the local vector: by part 2, $h$ is linear around $x^{(s)}$ according to $\sum_{i\in I_+}v_iw_i$. The extra neurons contribute zero since $v_i=0$, and among the first ones $i$ is active exactly when $s_i=+1$. Hence

$$a_s=\sum_{j\in P(s)}e_j.$$

This is the indicator vector of $P(s)$: its entry $j$ is $1$ if $s_j=+1$, and $0$ otherwise.

Step 4, the vectors are distinct: if $s\ne s'$, there is an index $j$ with $s_j\ne s'_j$. In entry $j$ one of the vectors $a_s,a_{s'}$ has $1$ and the other $0$, so $a_s\ne a_{s'}$.

Step 5, counting: there are $2^d$ sign vectors, and each contributes a different element of $A_h$. Therefore

$$\boxed{|A_h|\ge2^d}$$

**In words.** Each neuron cuts the space in two along a different axis. $d$ independent cuts create $2^d$ orthants, each activating a different set of neurons, hence a different slope. A network of width only $d$ already reaches a number of regions exponential in the dimension.

**Sanity check.** For $d=2$ the network is $h(x)=\sigma(x_1)+\sigma(x_2)$, and the four quadrants give the vectors $(1,1)$, $(1,0)$, $(0,1)$ and $(0,0)$, i.e. $2^2$ vectors. For $d=1$ the same construction gives two vectors, exactly the bound of part 1.

**What to write in the exam.**

- Verdict: the claim is true.
- Construction: $w_i=e_i$ and $v_i=1$ for $i\le d$, and $w_i=e_1$ and $v_i=0$ for the other neurons.
- In every open orthant, by part 2, $a_s=\sum_{j:\,s_j=+1}e_j$.
- These are the indicator vectors of $2^d$ different subsets, so they are pairwise distinct and $|A_h|\ge2^d$.

*Verified: for $d\in\{2,3,5\}$ with two extra neurons, a finite-difference gradient at a random point of every orthant gives $2^d$ distinct vectors, and $h(x)=a^\top x$ at each such point.*

**Common mistakes.**

- Forgetting the origin in part 1: $h$ may be linear there too, and one must show that its vector equals $a_+$ or $a_-$.
- In part 2, not giving an explicit radius, or choosing one that ignores $\|w_i\|$; then nothing proves that the signs are preserved on the ball.
- In part 3, switching off spare neurons with $w_i=0$ and then invoking part 2, which requires $w_i^\top x\ne0$ for every $i$. Switch them off through $v_i=0$.

**💡 Useful tricks:** Bias-free ReLU ⇒ every breakpoint hyperplane passes through the origin, so sign patterns of $\{w_i^\top x\}$ index the linear regions; the local coefficient is $a=\sum_{i\,:\,w_i^\top x>0}v_iw_i$; to reach $2^d$ regions choose $w_i=e_i$, $v_i=1$ so distinct orthants give distinct subset-indicator vectors.

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

**1. Exponential convergence rate under a PL inequality**

**What is asked.** Prove that along gradient flow the gap to the minimum shrinks at least like $e^{-t}$ times the initial gap. The answer is a proof.

**Tool and why.** Gradient flow and the PL condition (cheat sheet §7 and §9). Along gradient flow the function decreases at rate $\|\nabla f\|^2$, and the PL inequality bounds this rate from below by the gap itself. This yields a differential inequality, which we solve with an integrating factor, so there is no need to divide by the gap, which might vanish.

**Definitions.** Gradient flow is the trajectory satisfying $\dot w(t)=-\nabla f(w(t))$ with $w(0)=w_0$. Let $u(t)$ be the gap to the minimum at time $t$:

$$u(t)=f(w(t))-f(w^*).$$

We have $u(t)\ge0$ because $w^*$ is a global minimizer. We also define the integrating factor $q(t)=e^tu(t)$; we multiply by $e^t$ so that the derivative of the product contains exactly the sum $u+u'$, which PL controls.

**Solution.**

Step 1, derivative of the gap: by the chain rule, and since $f(w^*)$ is a constant:

$$\begin{aligned}
u'(t)&=\nabla f(w(t))^\top\dot w(t)\\
&=-\|\nabla f(w(t))\|^2.
\end{aligned}$$

Step 2, plugging in PL: the assumption at the point $w(t)$ says that $\|\nabla f(w(t))\|^2$ is at least $u(t)$. Substituting into Step 1 gives

$$u'(t)\le-u(t).$$

Step 3, derivative of the integrating factor: by the product rule,

$$\begin{aligned}
q'(t)&=e^tu(t)+e^tu'(t)\\
&=e^t\big(u(t)+u'(t)\big)\\
&\le0.
\end{aligned}$$

The last step holds because $e^t>0$, and by Step 2 the sum $u+u'$ is not positive.

Step 4, monotonicity: $q$ is differentiable with a non-positive derivative, so $q$ is non-increasing. Hence $q(t)\le q(0)$ for every $t\ge0$, i.e. $e^tu(t)\le u(0)$. Multiplying by $e^{-t}$, which is positive:

$$\boxed{f(w(t))-f(w^*)\le e^{-t}\big(f(w_0)-f(w^*)\big)}$$

**In words.** The PL condition says there are no flat plateaus above the minimum: as long as the gap is large, the gradient is large too, so the descent is fast. The descent is at least proportional to the gap, and that is exactly exponential decay.

**Sanity check.** For $f(w)=\tfrac14\|w\|^2$ we have $\nabla f(w)=\tfrac12w$, so $\|\nabla f(w)\|^2=f(w)$, and the PL condition holds with equality. Then $w(t)=e^{-t/2}w_0$, and we get $f(w(t))=e^{-t}f(w_0)$: the bound is tight. For $f(w)=\tfrac12\|w\|^2$ the decay is $e^{-2t}$, faster than the bound, as expected.

**What to write in the exam.**

- Define $u(t)=f(w(t))-f(w^*)$. By the chain rule $u'=-\|\nabla f\|^2$.
- By PL, $u'\le-u$.
- Hence the derivative of $e^tu$ is $e^t(u+u')$, which is not positive.
- Therefore $e^tu(t)\le u(0)$, which is the required bound.

*Verified: numerical integration of gradient flow, step $10^{-4}$ up to time $3$: for $\tfrac14\|w\|^2$ the ratio $u(3)/u(0)$ comes out $0.04978$ versus $e^{-3}\approx0.04979$, and for $\tfrac12\|w\|^2$ it is $0.00248$, below the bound.*

**2. An invariant direction is orthogonal to the gradient**

**What is asked.** Prove that if $f$ does not change under shifts in direction $v$, then its gradient is orthogonal to $v$ at every point. The answer is a proof.

**Tool and why.** Restricting a function to a line, plus the chain rule (cheat sheet §7): the directional derivative $\nabla f(w)^\top v$ is the derivative of $f$ along the line through $w$ in direction $v$. The assumption says that $f$ is constant along this line, and the derivative of a constant function is zero.

**Definitions.** Fix any $w$ and define the function of one real variable

$$g(c)=f(w+c\cdot v).$$

This is the value of $f$ along the line through $w$ in direction $v$. We introduce it because the assumption says precisely that $g$ is constant.

**Solution.**

Step 1, $g$ is constant: by the assumption, for every $c$ we have $g(c)=f(w)$. Hence $g$ is differentiable and $g'(0)=0$.

Step 2, chain rule: $f$ is continuously differentiable, and the map $c\mapsto w+cv$ is linear with derivative $v$. Hence

$$g'(c)=\nabla f(w+cv)^\top v.$$

Step 3, evaluating at $c=0$: combining Steps 1 and 2,

$$\nabla f(w)^\top v=g'(0)=0.$$

Since $w$ was arbitrary, $\nabla f(w)^\top v=0$ for every $w$.

**In words.** If $f$ does not change when we move in direction $v$, its slope in that direction is zero. The slope in direction $v$ is exactly the inner product of the gradient with $v$.

**Sanity check.** For $f(w)=(w_1-w_2)^2$ and $v=(1,1)$ we have $f(w+cv)=f(w)$. The gradient is $2(w_1-w_2)\cdot(1,-1)$, and its inner product with $(1,1)$ is indeed zero.

**What to write in the exam.**

- Define $g(c)=f(w+cv)$; by assumption $g$ is constant, so $g'(0)=0$.
- By the chain rule $g'(0)=\nabla f(w)^\top v$.
- Hence $\nabla f(w)^\top v=0$, and $w$ is arbitrary.

*Verified: in sympy, for $f(w)=F(w_1-w_2)$ with a generic $F$, the sum of the partial derivatives vanishes identically.*

**3. Shift invariance of softmax**

**What is asked.** Prove that adding the same constant to all logits does not change the softmax output. The answer is a direct computation.

**Tool and why.** The identity $e^{a+b}=e^ae^b$: the constant comes out as a common factor of the numerator and the denominator and cancels. This is the symmetry that will produce the conservation law in part 4 (cheat sheet §8).

**Definitions.** No new notation.

**Solution.**

Step 1, the numerator: entry $i$ of $z+c\mathbf1$ is $z_i+c$, so the numerator is $e^{z_i+c}$, i.e. $e^ce^{z_i}$.

Step 2, the denominator: in the same way every term of the sum is multiplied by $e^c$, so the denominator is $e^c\sum_je^{z_j}$.

Step 3, cancelling: $e^c$ is positive, in particular nonzero, so

$$\begin{aligned}
S(z+c\mathbf1)_i&=\frac{e^{z_i+c}}{\sum_{j=1}^de^{z_j+c}}\\
&=\frac{e^{c}e^{z_i}}{e^{c}\sum_{j=1}^de^{z_j}}\\
&=S(z)_i.
\end{aligned}$$

This holds for every $i$, hence

$$\boxed{S(z+c\mathbf1)=S(z)}$$

**In words.** Softmax only sees differences between logits. Adding the same number to all of them changes no difference, so it does not change the distribution.

**Sanity check.** For $d=2$ we have $S(z)_1=1/(1+e^{z_2-z_1})$, which depends only on the difference. Numerically, $S(1,2,3)$ and $S(6,7,8)$ are both $(0.090,0.245,0.665)$.

**What to write in the exam.**

- Factor $e^c$ out of the numerator and out of every term of the denominator.
- The factor $e^c$ cancels, so $S(z+c\mathbf1)_i=S(z)_i$ for every $i$.

*Verified: 1,000 random pairs of $z\in\mathbb{R}^5$ and $c$: the largest difference between $S(z+c\mathbf1)$ and $S(z)$ is $3.3\cdot10^{-16}$.*

**4. Conservation of the weight sum when only the last layer is trained**

**What is asked.** Prove that when gradient flow runs on $W_L$ only, the sum of the entries of $W_L$ is constant in time. The answer is a proof.

**Tool and why.** A conservation law that comes from a symmetry (cheat sheet §8): find a direction in which the loss is constant; by part 2 the gradient is orthogonal to it, so gradient flow never moves along it. Part 3 supplies the direction: adding a multiple of the all-ones matrix shifts all logits by the same number.

**Definitions.** Let $u$ be the output of the last hidden layer:

$$u=\sigma\big(W_{L-1}\,\sigma(\cdots\sigma(W_1x)\cdots)\big).$$

It does not change in time, because $W_1,\dots,W_{L-1}$ are frozen, and with this notation $\phi(W_L)=\ell(S(W_Lu),y)$. We also write $\mathbf1_d$ for the all-ones vector in $\mathbb{R}^d$, and $\mathbf1_{d\times d}$ for the all-ones matrix, which the question denotes $\mathbf1$. We distinguish the two because both appear in the same computation. The inner product between matrices is the sum of entrywise products, so $\langle W,\mathbf1_{d\times d}\rangle$ is the sum of the entries of $W$.

**Solution.**

Step 1, shifting the logits: the all-ones matrix is an outer product, $\mathbf1_{d\times d}=\mathbf1_d\mathbf1_d^\top$. Hence

$$\begin{aligned}
(W_L+c\,\mathbf1_{d\times d})u&=W_Lu+c\,\mathbf1_d(\mathbf1_d^\top u)\\
&=W_Lu+\big(c\,\mathbf1_d^\top u\big)\mathbf1_d.
\end{aligned}$$

The quantity $c\,\mathbf1_d^\top u$ is a scalar, which we call $c'$. So all logits move by the same number $c'$.

Step 2, the loss is invariant: by part 3 with $z=W_Lu$ and shift $c'$:

$$\begin{aligned}
\phi(W_L+c\,\mathbf1_{d\times d})&=\ell\big(S(W_Lu+c'\mathbf1_d),y\big)\\
&=\ell\big(S(W_Lu),y\big)\\
&=\phi(W_L).
\end{aligned}$$

This holds for every $W_L$ and every $c$.

Step 3, the gradient is orthogonal: $\phi$ is continuously differentiable, as a composition of $\ell$, softmax and the linear map $W_L\mapsto W_Lu$. Identify $\mathbb{R}^{d\times d}$ with $\mathbb{R}^{d^2}$, where the inner product is the sum of entrywise products. By part 2 with direction $v=\mathbf1_{d\times d}$:

$$\langle\nabla\phi(W_L),\mathbf1_{d\times d}\rangle=0\quad\text{for every }W_L.$$

Step 4, the derivative along the trajectory: gradient flow is $\dot W_L(t)=-\nabla\phi(W_L(t))$, and the inner product with a fixed matrix is linear. Hence

$$\begin{aligned}
\tfrac{d}{dt}\langle W_L(t),\mathbf1_{d\times d}\rangle&=\langle\dot W_L(t),\mathbf1_{d\times d}\rangle\\
&=-\langle\nabla\phi(W_L(t)),\mathbf1_{d\times d}\rangle\\
&=0.
\end{aligned}$$

The last step is Step 3 at the point $W_L(t)$.

Step 5, conclusion: a function whose derivative is zero for every $t\ge0$ is constant, hence

$$\boxed{\langle W_L(t),\mathbf1\rangle=\langle W_L(0),\mathbf1\rangle}$$

**In words.** Adding the same number to every entry of $W_L$ only shifts all logits by the same amount, and softmax ignores that. So the loss is flat in this direction, the gradient has no component along it, and gradient flow never moves along it. The sum of the entries is exactly the component of $W_L$ in this direction, so it is frozen.

**Sanity check.** For $d=1$ softmax always returns $1$, the loss is constant and the gradient is zero: $W_L$ does not move at all, consistent with the result. Beyond that, the same argument with $W_L+\mathbf1_db^\top$ for any $b\in\mathbb{R}^d$ shows that even every column sum of $W_L$ is conserved, which is stronger than required.

**What to write in the exam.**

- Let $u$ be the fixed output of the frozen layers, so that $\phi(W_L)=\ell(S(W_Lu),y)$.
- Adding $c\mathbf1_{d\times d}$ to $W_L$ shifts every logit by $c\,\mathbf1_d^\top u$, and by part 3 the loss does not change.
- By part 2, $\langle\nabla\phi(W_L),\mathbf1_{d\times d}\rangle=0$ for every $W_L$.
- Hence the time derivative of $\langle W_L,\mathbf1\rangle$ is zero, and the sum is constant.

*Verified: 5,000 gradient-descent steps on the last layer only, with $d=3$, tanh activation and cross-entropy loss: the largest value of $|\langle\nabla\phi,\mathbf1\rangle|$ is $3.7\cdot10^{-16}$, and the weight sum drifts by at most $2.3\cdot10^{-14}$.*

**5. Training the whole network: the conservation survives**

**What is asked.** Decide whether the sum of the entries of $W_L$ is still constant when gradient flow trains all layers, and prove it. The answer is a verdict and a proof.

**Tool and why.** The same symmetry-based conservation law (cheat sheet §8), now in the full parameter space: we need a direction in $\theta$-space in which $\psi$ is constant and which changes only $W_L$. The key point is that the invariance of part 4 holds for every value of the lower layers, not just for one frozen value.

**Definitions.** Let $V$ be the direction in parameter space that is zero in the blocks $W_1,\dots,W_{L-1}$ and the all-ones matrix in the block $W_L$. We introduce it because the inner product of $\nabla\psi(\theta)$ with $V$ is exactly $\langle\nabla_{W_L}\psi(\theta),\mathbf1_{d\times d}\rangle$, the quantity that drives the change of the sum.

**Solution.**

**Verdict: yes, the conservation survives.**

Step 1, $\psi$ is invariant along $V$: fix $\theta$ and $c$. In $\theta+cV$ the layers $W_1,\dots,W_{L-1}$ are those of $\theta$, so $u$ is the same, and the last layer is $W_L+c\mathbf1_{d\times d}$. Steps 1 and 2 of part 4 hold for every $u$, hence

$$\psi(\theta+cV)=\psi(\theta)\quad\text{for every }\theta,c.$$

Step 2, part 2 in parameter space: $\psi$ is differentiable, as a composition of differentiable maps, because $\sigma$ is differentiable by assumption. The proof of part 2 uses only the chain rule at $c=0$, so it applies here too. Since $V$ is nonzero only in the block $W_L$:

$$\nabla\psi(\theta)^\top V=\langle\nabla_{W_L}\psi(\theta),\mathbf1_{d\times d}\rangle=0.$$

This holds for every $\theta$.

Step 3, gradient flow in the block $W_L$: the component of gradient flow in this block is $\dot W_L(t)=-\nabla_{W_L}\psi(\theta(t))$. Hence

$$\begin{aligned}
\tfrac{d}{dt}\langle W_L(t),\mathbf1_{d\times d}\rangle&=-\langle\nabla_{W_L}\psi(\theta(t)),\mathbf1_{d\times d}\rangle\\
&=0,
\end{aligned}$$

by Step 2 at the point $\theta(t)$. A zero derivative for every $t$ means the quantity is constant:

$$\boxed{\langle W_L(t),\mathbf1\rangle=\langle W_L(0),\mathbf1\rangle}$$

**In words.** The lower layers do change $u$ during training, but whatever $u$ is, a uniform shift of $W_L$ shifts all logits by the same amount. The symmetry holds at every point of parameter space, so it is conserved even when the whole network moves.

**Sanity check.** In a numerical run where all layers train, the loss drops from $1.19$ to $0.010$, and the sum drifts by at most $3.6\cdot10^{-14}$. By contrast, if we remove the softmax and train with a squared loss on $h_\theta(x)$ directly, there is no symmetry, and the sum changes by $0.36$. So it is the softmax that creates the conservation law.

**What to write in the exam.**

- Verdict: yes.
- For any value of the lower layers, adding $c\mathbf1_{d\times d}$ to $W_L$ shifts all logits by the same constant, so $\psi(\theta+cV)=\psi(\theta)$.
- By part 2 in parameter space, $\langle\nabla_{W_L}\psi(\theta),\mathbf1\rangle=0$ at every $\theta$.
- The $W_L$ block of gradient flow gives a zero derivative, so the sum is constant.

*Verified: 20,000 gradient-descent steps on all parameters, with $L=3$, $d=4$, tanh and cross-entropy: maximal drift of the sum $3.6\cdot10^{-14}$; in the variant without softmax and with a squared loss the sum moves by $0.36$.*

**Common mistakes.**

- In part 1, dividing by $u(t)$ and passing to $\ln u$ without handling the case where the gap vanishes. The integrating factor $e^t$ avoids the issue.
- In part 4, claiming that every logit moves by $c$. It moves by $c\,\mathbf1_d^\top u$; what matters is that the shift is equal in all coordinates, not its size.
- In part 5, answering "no" because $u$ changes in time. The invariance holds for every $u$, so the conservation survives.

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

**1. Uniform convergence over the finite class $F$**

**What is asked.** Find an expression $\Delta(N,\delta)$ that does not depend on the hypothesis and tends to zero as $N$ grows, such that with probability at least $1-\delta$ every $f\in F$ satisfies $L_D(f)-L_S(f)\le\Delta(N,\delta)$. The answer is a formula with its derivation.

**Tool and why.** Hoeffding's bound for a fixed hypothesis, followed by a union bound over the finite class (cheat sheet §2 and §10). Hoeffding holds only for one hypothesis fixed before sampling; the union bound makes it hold simultaneously for all of $F$, at the price of $\ln|F|$ inside the root.

**Definitions.** We write $\tau$ for the deviation threshold, not $\epsilon$, because $\epsilon$ is already taken by the cover radius. For each $f\in F$ let $B_f$ be the bad event that $L_D(f)-L_S(f)\ge\tau$. We introduce it because the required bound holds exactly when no bad event occurs.

**Solution.**

Step 1, Hoeffding for a fixed hypothesis: fix $f\in F$ and set $A_n=\ell(f(x_n),y_n)$. Since $f$ is fixed and does not depend on the sample, and the pairs $(x_n,y_n)$ are i.i.d., the $A_n$ are i.i.d. as well. Their values lie in $[0,1]$ because $\ell$ takes values there. The mean is $\mathbb{E}[A_1]=L_D(f)$, and the average is $L_S(f)$. The event $B_f$ is contained in the two-sided event, hence

$$\begin{aligned}
\Pr(B_f)&\le\Pr\big(|L_S(f)-L_D(f)|\ge\tau\big)\\
&\le2e^{-2N\tau^2}.
\end{aligned}$$

Step 2, union bound: the probability that at least one bad event occurs is at most the sum of the probabilities, and there are $|F|$ terms:

$$\begin{aligned}
\Pr\Big(\bigcup_{f\in F}B_f\Big)&\le\sum_{f\in F}\Pr(B_f)\\
&\le2|F|e^{-2N\tau^2}.
\end{aligned}$$

Step 3, choosing $\tau$: require the bound to equal $\delta$ and solve:

$$\begin{aligned}
2|F|e^{-2N\tau^2}&=\delta\\
2N\tau^2&=\ln\frac{2|F|}{\delta}\\
\tau&=\sqrt{\frac{\ln(2|F|/\delta)}{2N}}.
\end{aligned}$$

Step 4, the complementary event: with probability at least $1-\delta$ no $B_f$ occurs, i.e. $L_D(f)-L_S(f)$ is below $\tau$ for every $f\in F$. So we may take

$$\boxed{\Delta(N,\delta)=\sqrt{\frac{\ln(2|F|/\delta)}{2N}}}$$

The expression does not depend on $f$, and since $|F|$ and $\delta$ are fixed the numerator is constant while the denominator grows, so $\Delta(N,\delta)$ tends to zero as $N$ grows.

**In words.** Each single hypothesis is concentrated around its mean. To get this for all of $F$ at once we split the failure budget $\delta$ into $|F|$ shares, which costs only the logarithm of the class size.

**Sanity check.** For $|F|=1$ the formula is plain Hoeffding, $\sqrt{\ln(2/\delta)/(2N)}$. Numerical example: with $|F|=100$, $N=1000$ and $\delta=0.05$ we get $\Delta\approx0.0644$, versus $0.0429$ for a single hypothesis.

**What to write in the exam.**

- For each fixed $f\in F$, the $A_n=\ell(f(x_n),y_n)$ are independent in $[0,1]$ with mean $L_D(f)$, and Hoeffding gives the tail $2e^{-2N\tau^2}$.
- A union bound over $F$ gives $2|F|e^{-2N\tau^2}$.
- Setting it equal to $\delta$ gives $\Delta(N,\delta)=\sqrt{\ln(2|F|/\delta)/(2N)}$, which tends to zero.

*Verified: Python computation of $\Delta$ for $|F|=100$, $N=1000$ and $\delta=0.05$; and in a simulation with $|F|=21$, $N=200$ and $\delta=0.1$, the bound was not violated in any of 2,000 samples.*

**2. Extending to all of $H$ through the cover**

**What is asked.** Prove that on the same event as in part 1, every $h\in H$ satisfies $L_D(h)-L_S(h)\le\Delta(N,\delta)+2\rho\epsilon$. The answer is a proof.

**Tool and why.** The covering technique and the Lipschitz transfer (cheat sheet §10). The bound of part 1 holds only on the finite $F$. Every $h$ is within $\epsilon$ of some element of $F$, and a Lipschitz loss turns closeness of outputs into closeness of losses, so the bound transfers to $h$ at a small price.

**Definitions.** For each $h\in H$ let $f_h$ be an element of $F$ with $|h(x)-f_h(x)|\le\epsilon$ for every $x$; it exists by assumption. The Lipschitz property in the first variable means $|\ell(a,y)-\ell(b,y)|\le\rho|a-b|$. Let $E$ be the good event of part 1, on which $L_D(f)-L_S(f)\le\Delta(N,\delta)$ for every $f\in F$; its probability is at least $1-\delta$.

**Solution.**

Step 1, pointwise comparison: for every pair $(x,y)$, by Lipschitz and by the definition of $f_h$:

$$\begin{aligned}
|\ell(h(x),y)-\ell(f_h(x),y)|&\le\rho\,|h(x)-f_h(x)|\\
&\le\rho\epsilon.
\end{aligned}$$

Step 2, comparing the means: $L_D$ is an expectation, and the absolute value of an expectation is at most the expectation of the absolute value. Hence

$$\begin{aligned}
|L_D(h)-L_D(f_h)|&\le\mathbb{E}\,|\ell(h(x),y)-\ell(f_h(x),y)|\\
&\le\rho\epsilon.
\end{aligned}$$

In the same way $L_S$ is an average of $N$ terms, each of which changes by at most $\rho\epsilon$, so also $|L_S(h)-L_S(f_h)|\le\rho\epsilon$. Both bounds are deterministic and hold for every sample.

Step 3, splitting into three differences: add and subtract $L_D(f_h)$ and $L_S(f_h)$:

$$\begin{aligned}
L_D(h)-L_S(h)&=\big(L_D(h)-L_D(f_h)\big)\\
&\quad+\big(L_D(f_h)-L_S(f_h)\big)\\
&\quad+\big(L_S(f_h)-L_S(h)\big)\\
&\le\rho\epsilon+\Delta(N,\delta)+\rho\epsilon.
\end{aligned}$$

The first and third terms are bounded by Step 2. The middle term is bounded on the event $E$, because $f_h\in F$.

Step 4, conclusion: on the event $E$, whose probability is at least $1-\delta$, simultaneously for every $h\in H$:

$$\boxed{L_D(h)-L_S(h)\le\Delta(N,\delta)+2\rho\epsilon}$$

It does not matter that $h$ is chosen based on the sample: the event $E$ covers all of $F$ at once, and Steps 1 to 3 are deterministic.

**In words.** An infinite class costs only as much as its finite cover, plus an approximation price $2\rho\epsilon$: once on the true error and once on the sample error.

**Sanity check.** If $H=F$ we can take $\epsilon=0$, and we recover part 1. There is also a trade-off: a smaller $\epsilon$ shrinks $2\rho\epsilon$ but enlarges $|F|$ and hence $\Delta$. In a simulation with $h(x)=\theta x$, the loss $|a-y|$, which is Lipschitz with constant $1$, a cover of step $0.05$, i.e. $|F|=21$ and $\epsilon=0.025$, $N=200$ and $\delta=0.1$: the bound is $0.173$, and the largest gap over $H$ across 2,000 samples was $0.060$.

**What to write in the exam.**

- For every $h$ pick $f_h\in F$ with $\|h-f_h\|_\infty\le\epsilon$.
- By Lipschitz, the losses are pointwise within $\rho\epsilon$, so both $L_D$ and $L_S$ move by at most $\rho\epsilon$.
- Split $L_D(h)-L_S(h)$ into three differences and use part 1 on $f_h$.
- Result: $\Delta(N,\delta)+2\rho\epsilon$, for all $h$ simultaneously, with probability at least $1-\delta$.

*Verified: Python simulation of 2,000 samples with the class $\theta x$ and a finite cover: zero violations of the bound, and maximal gap $0.060$ against a bound of $0.173$.*

**3. A bound weighted by the cell index**

**What is asked.** Derive a bound in the style of part 2 in which a hypothesis $h$ whose nearest element of $F$ lies in cell $F_i$ gets a bound that grows with $i$. The answer is a formula and a proof.

**Tool and why.** A weighted union bound in SRM style (cheat sheet §2), followed by the cover transfer (§10). Each cell gets its own share $\delta_i$ of the failure budget, decreasing in $i$. A cell with a larger share gets a tighter bound, so we favour the cells the algorithm tends to return.

**Definitions.** Let $\delta_i=\delta\,2^{-i}$ for each $i$ between $1$ and $R$: this is cell $i$'s share of the failure budget. Let $\Delta_i$ be the bound for cell $i$, derived in Step 3:

$$\Delta_i=\sqrt{\frac{\ln(2|F|/\delta)+i\ln2}{2N}}.$$

For each $h\in H$ let $f_h$ be an element of $\operatorname{argmin}_{f\in F}\|h-f\|_\infty$, and $i(h)$ the index of the cell containing it. If several such elements lie in different cells, take the smallest index. These symbols let us speak of "the cell of $h$".

**Solution.**

Step 1, the budget suffices: a geometric sum,

$$\begin{aligned}
\sum_{i=1}^R\delta_i&=\delta\sum_{i=1}^R2^{-i}\\
&=\delta\,(1-2^{-R})\\
&\le\delta.
\end{aligned}$$

Step 2, part 1 on every cell: $F_i$ is a finite subset of $F$, so part 1 applies to it with confidence $\delta_i$. With probability at least $1-\delta_i$, for every $f\in F_i$:

$$L_D(f)-L_S(f)\le\sqrt{\frac{\ln(2|F_i|/\delta_i)}{2N}}.$$

Step 3, a bound increasing in $i$: we have $|F_i|\le|F|$, and $\ln(1/\delta_i)$ equals $\ln(1/\delta)+i\ln2$. Hence

$$\begin{aligned}
\ln\frac{2|F_i|}{\delta_i}&\le\ln\frac{2|F|}{\delta_i}\\
&=\ln\frac{2|F|}{\delta}+i\ln2,
\end{aligned}$$

so the right-hand side of Step 2 is at most $\Delta_i$.

Step 4, union over the cells: the probability that the bound fails in some cell is at most $\sum_i\delta_i$, which by Step 1 is at most $\delta$. So with probability at least $1-\delta$, simultaneously for every $i$ and every $f\in F_i$, we have $L_D(f)-L_S(f)\le\Delta_i$.

Step 5, transfer to $H$: some element of $F$ is within $\epsilon$ of $h$, so the nearest element $f_h$ is also within $\epsilon$. It lies in the cell $F_{i(h)}$. The same decomposition as in part 2, with $\Delta_{i(h)}$ in place of $\Delta(N,\delta)$, gives, with probability at least $1-\delta$, simultaneously for every $h\in H$:

$$\boxed{L_D(h)-L_S(h)\le\Delta_{i(h)}+2\rho\epsilon}$$

Step 6, monotonicity: the numerator of $\Delta_i$ grows by $\ln2$ with each step in $i$, so $\Delta_i$ is strictly increasing in $i$. The smaller the cell index, the smaller the bound, as required.

**Remark.** The bound with $|F_i|$ from Step 2 is also valid, and tighter for small cells, but it need not increase with $i$, because the cell sizes are arbitrary. Replacing $|F_i|$ by $|F|$ guarantees the monotonicity the question demands. Any summable split of $\delta$ works too, for example $\delta_i=6\delta/(\pi^2i^2)$.

**In words.** The algorithm usually lands in the first cells, so we give them most of the failure budget. The price for cell $i$ is only an extra $i\ln2$ inside the root, so the bound grows slowly with the index.

**Sanity check.** With $R=1$, i.e. one cell that is all of $F$, we get part 2 with $\delta/2$ instead of $\delta$: slightly looser, because half of the budget is unused. Numerical example with $|F|=100$, $N=1000$ and $\delta=0.05$, versus $0.0644$ in part 1:

| $i$ | $\Delta_i$ |
|---|---|
| $1$ | $0.0670$ |
| $2$ | $0.0696$ |
| $5$ | $0.0767$ |
| $10$ | $0.0873$ |

**What to write in the exam.**

- Allocate $\delta_i=\delta2^{-i}$; their sum is at most $\delta$.
- Apply part 1 to each $F_i$ with $\delta_i$, and bound $|F_i|$ by $|F|$.
- A union over $i$ gives, with probability at least $1-\delta$, $L_D(f)-L_S(f)\le\Delta_i$ for every $f\in F_i$ and every $i$.
- The cover transfer as in part 2 gives $\Delta_{i(h)}+2\rho\epsilon$, which increases with $i$.

*Verified: in exact fractions, $\sum_{i=1}^R2^{-i}$ equals $1-2^{-R}$ for $R$ equal to $1$, $3$ and $10$; the values $\Delta_i$ were computed in Python, and $\Delta_i$ is strictly increasing for $i$ up to $10$.*

**Common mistakes.**

- Applying Hoeffding directly to the learned hypothesis $h$, which depends on the sample. Hoeffding holds only for fixed hypotheses of $F$; $h$ is handled through the cover transfer.
- Paying $\rho\epsilon$ only once. Moving from $h$ to $f_h$ costs $\rho\epsilon$ both in $L_D$ and in $L_S$, so the price is $2\rho\epsilon$.
- In part 3, splitting $\delta$ equally among the cells: then every cell gets the same bound and small indices are not favoured. Or keeping $\ln|F_i|$ and claiming monotonicity without checking it.

**💡 Useful tricks:** Cover ⇒ Hoeffding + union on the finite $F$ only; bridge to all of $H$ with the $2\rho\epsilon$ Lipschitz transfer; "algorithm prefers small-index cells" ⇒ SRM weights $\delta_i=\delta 2^{-i}$ (or any summable split) per cell.

**⚠️ Watch out:** the transfer costs $2\rho\epsilon$ (paid on both $L_D$ and $L_S$); put $\ln|F|$ (not $\ln|F_i|$) inside the root so $\Delta_i$ is *genuinely increasing* in $i$ — arbitrary cell sizes $|F_i|$ can otherwise break the required monotonicity; the nearest cover point is guaranteed within $\epsilon$ by assumption.
