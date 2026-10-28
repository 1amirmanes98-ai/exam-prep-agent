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

**1. Definition of exponential expressive efficiency**

**What is asked.** To write the definition of "$H_B$ is exponentially expressively efficient with respect to $H'_C$". The answer is a definition with two conditions.

**Tool and why.** The course definition of expressive efficiency (lecture 1, Def 2) together with its "exponential" refinement (cheat sheet §4). The question asks for exactly this definition, with $H_B$ in the role of the efficient (deep) family and $H'_C$ in the role of the family it is compared to (shallow).

**Definitions.** No new notation: $B$ is the size parameter of the efficient family and $C$ the size parameter of the compared family.

**Solution.**

Step 1, containment in the cheap direction: the efficient family can imitate the compared family at comparable size. For every $C$ there is $B\in O(C)$ such that

$$H'_C\subseteq H_B$$

Step 2, separation in the expensive direction: the efficient family has a function that the compared family realizes only at a huge size. There is a moderate size $B$ (polynomial in the problem dimension) and a hypothesis $h\in H_B$ such that $h\notin H'_C$ unless $C$ is exponential in $B$. Formally:

$$h\in H'_C\ \Longrightarrow\ C\ge 2^{\Omega(B)}$$

Step 3, what the word "exponentially" adds: plain expressive efficiency only asks that $C$ be "prohibitively large". The exponential version fixes the size of the gap: the efficient family pays a polynomial size $B$, the compared family pays a size exponential in $B$.

Step 4, a class-level consequence: if all of $H_B$ is contained in $H'_C$, then in particular $h\in H'_C$, so step 2 gives

$$\min\{C:\,H_B\subseteq H'_C\}\ge 2^{\Omega(B)}$$

This is the form the VC argument of part 2 controls directly; part 2, step 4 shows how to pass from it back to a single hard function $h$.

**In words.** Efficiency is a two-sided comparison. The efficient family loses nothing, since it can imitate the other family at a constant-factor cost, and it gains a lot, since some of its functions cost the other family exponentially more.

**Sanity check.** The course's model example, deep versus shallow ReLU networks (lecture 2, Prop 2), has both pieces: shallow width $B$ fits inside a deep network of width $O(B)$ (passthrough layers), and the sawtooth with $2+2^{L-1}$ pieces needs shallow width at least $2^{L-1}+1$, exponential in the depth $L$.

**What to write in the exam.**

- Condition 1: for every $C$ there is $B\in O(C)$ with $H'_C\subseteq H_B$.
- Condition 2: for a moderate $B$ there is $h\in H_B$ with $h\notin H'_C$ unless $C$ is exponential in $B$.
- Both conditions are part of the definition; "exponential" means polynomial $B$ against $C$ exponential in $B$.

*Verified: definition checked against lecture 1, Def 2 and its "exponential" remark in the course index; there is nothing numeric to compute in this part.*

**2. Proof of exponential efficiency from the VC dimensions**

**What is asked.** To prove both conditions of part 1, using the given VC dimensions and the given containment. The answer is a proof.

**Tool and why.** The definition from part 1 (cheat sheet §4) together with monotonicity of the VC dimension under inclusion. The VC dimensions are what we are given, and monotonicity turns "one class is contained in another" into an inequality between two numbers.

**Definitions.** For a given $B$, let $C_0$ be the largest integer strictly smaller than $e^B$, that is

$$C_0=\lceil e^B\rceil-1$$

We introduce it because we need one specific size of the family $H'$ that is still too small to contain $H_B$.

**Solution.**

Step 1, condition 1: given $C$, take $B=C$. The assumption "$H'_C\subseteq H_B$ for every $B\ge C$" holds in particular with equality $B=C$, and $B=C$ is in $O(C)$.

Step 2, monotonicity of VC.

**Claim.** If $A\subseteq A'$ then $VC(A)\le VC(A')$.

Proof: let $M=VC(A)$ and let $\{x_1,\dots,x_M\}$ be a set that $A$ shatters. For each labeling of this set, the hypothesis of $A$ that realizes it also belongs to $A'$, because $A\subseteq A'$. So $A'$ shatters the same set, and therefore $VC(A')\ge M$.

Step 3, $H_B$ is not contained in $H'_{C_0}$. Suppose it were. By the claim of step 2 and the given VC values,

$$e^B=VC(H_B)\le VC(H'_{C_0})=C_0$$

This contradicts $C_0<e^B$, the definition of $C_0$.

Step 4, one hard function. By step 3 we may pick $h\in H_B$ with $h\notin H'_{C_0}$. For every $C\le C_0$ the family $H'$ is monotone, so $H'_C\subseteq H'_{C_0}$, and hence also $h\notin H'_C$. Therefore $h$ can belong to $H'_C$ only if $C\ge C_0+1$. Since $C_0+1=\lceil e^B\rceil$, we get

$$h\in H'_C\ \Longrightarrow\ C\ge e^B$$

Step 5, conclusion: condition 1 holds with $B=C$ (linear overhead, step 1), and condition 2 holds with the size $C$ at least $e^B$, exponential in $B$ (step 4). So $H_B$ is exponentially expressively efficient with respect to $H'_C$.

**In words.** The VC dimension is a size measure that cannot shrink when a class grows. The family $H_B$ has VC dimension $e^B$ while $H'_C$ has only $C$, so before $C$ reaches $e^B$ the class $H'_C$ is simply too small to contain $H_B$, and some function of $H_B$ is left out.

**Sanity check.** For $B=1$: $e\approx2.718$ and $C_0=2$. The class $H'_2$ has VC dimension $2$, smaller than $2.718$, so it cannot contain $H_1$, and the smallest admissible size is $C=3$. For $B=3$: $e^3\approx20.09$, so $C$ must be at least $21$. The required $C$ grows like $e^B$, as claimed.

**What to write in the exam.**

- Condition 1: $B=C$ gives $H'_C\subseteq H_B$, so $B\in O(C)$.
- Monotonicity: if $A\subseteq A'$ then a set shattered by $A$ is shattered by $A'$, so $VC(A)\le VC(A')$.
- If $H_B\subseteq H'_C$ then $e^B\le C$.
- Take $C_0$ the largest integer below $e^B$ and $h\in H_B$ outside $H'_{C_0}$; by monotonicity of $H'$, $h\in H'_C$ forces $C\ge e^B$.

*Verified: brute-force check of VC monotonicity on 300 random nested pairs of classes over a 5-point domain (0 violations), and $C_0$ computed for $B=1,\dots,5$ (2, 7, 20, 54, 148).*

**3. Containment only from $B\ge5C$**

**What is asked.** Whether the claim of part 2 still holds when the containment $H'_C\subseteq H_B$ is guaranteed only for $B\ge5C$. The answer is yes or no with a justification.

**Tool and why.** Go through the two conditions of the definition (cheat sheet §4) and check which assumption each one used in part 2. That shows exactly what the change affects.

**Definitions.** No new notation.

**Solution.**

Verdict: yes, the claim still holds.

Step 1, condition 1: given $C$, take $B=5C$. The new assumption gives $H'_C\subseteq H_B$, and $B=5C$ is in $O(C)$, since the definition allows a constant factor.

Step 2, condition 2: the proof in part 2, steps 2 to 4, used only the VC values and the monotonicity of the families. It never used the containment assumption. So it holds unchanged: there is $h\in H_B$ with $h\in H'_C$ only if $C\ge e^B$.

Step 3, conclusion: both conditions hold, so $H_B$ is still exponentially expressively efficient with respect to $H'_C$.

**In words.** Paying five times more in the cheap direction is a constant factor, and the definition ignores constant (even polynomial) overheads; the exponential gap in the other direction is untouched.

**Sanity check.** What would break the claim is an exponential cost in the cheap direction: if containment were guaranteed only for $B\ge e^C$, condition 1 would fail. The factor $5$ is far from that.

**What to write in the exam.**

- Yes.
- Condition 1 with $B=5C$, which is $O(C)$.
- Condition 2 is proved from the VC values alone, exactly as in part 2.

*Verified: the part-2 checks (VC monotonicity, the values of $C_0$) do not use the containment assumption, so they carry over unchanged; nothing else to compute.*

**4. Unreachable outputs when $k>d$**

**What is asked.** To prove that for $k>d$ and every $W$ some output $y\in\{0,1\}^k$ is never produced by $f$. The answer is a proof.

**Tool and why.** Input–parameter duality together with the given VC dimension $d$ of homogeneous linear separators (cheat sheet §5, sign networks). Each input $x$ acts as one homogeneous separator on the rows of $W$, so "all outputs reachable" would mean "$k$ points shattered", which VC dimension $d$ forbids.

**Definitions.** Let $w_1,\dots,w_k\in\mathbb{R}^d$ be the rows of $W$, so that $(Wx)_i=\langle w_i,x\rangle$. For an input $x$ let $g_x$ be the separator on $\mathbb{R}^d$ given by

$$g_x(v)=\operatorname{sign}(\langle x,v\rangle)$$

and let $G=\{g_x:\ x\in\mathbb{R}^d\}$. This is exactly the class of homogeneous linear separators in dimension $d$, so $VC(G)=d$. We introduce $g_x$ to swap roles: the rows become the data points and the inputs become the classifiers.

**Solution.**

Step 1, rewriting $f$: by the definition of $g_x$, the $i$-th output is $f(x)_i=g_x(w_i)$. So

$$f(x)=\big(g_x(w_1),\dots,g_x(w_k)\big)$$

The set of reachable outputs is exactly the set of labelings that $G$ produces on the list $w_1,\dots,w_k$.

Step 2, case of two equal rows: suppose $w_i=w_j$ for some $i\ne j$. Then $f(x)_i=f(x)_j$ for every $x$, so any $y$ with $y_i\ne y_j$ is unreachable, and we are done.

Step 3, case of distinct rows: now $P=\{w_1,\dots,w_k\}$ is a set of $k$ points. Suppose, for contradiction, that every $y\in\{0,1\}^k$ is reachable. Then for every labeling $y$ there is $x$ with $g_x(w_i)=y_i$ for all $i$, that is, $G$ shatters $P$. Hence $VC(G)\ge k$, and since $k>d$ this contradicts $VC(G)=d$.

Step 4, conclusion: in both cases some $y\in\{0,1\}^k$ is not of the form $f(x)$, for every $W$.

**In words.** Every input is one hyperplane through the origin that labels the $k$ rows. Hyperplanes through the origin in $\mathbb{R}^d$ cannot produce every labeling of more than $d$ points, so with more output neurons than input dimensions some on/off pattern is impossible.

**Sanity check.** Take $d=1$, $k=2$ and

$$W=\begin{pmatrix}1\\-1\end{pmatrix}$$

Then $f(x)=(\operatorname{sign}(x),\operatorname{sign}(-x))$. For every $x$ at least one of $x$ and $-x$ is nonnegative, so the output $(0,0)$ never occurs. The reachable outputs are $(1,0)$, $(0,1)$ and $(1,1)$: three out of four.

**What to write in the exam.**

- Duality: $f(x)_i=\operatorname{sign}(\langle x,w_i\rangle)$, so input $x$ is a homogeneous separator applied to the rows.
- Reachable outputs are the labelings of the rows by homogeneous separators.
- Equal rows: a $y$ with different values on them is unreachable.
- Distinct rows: all $2^k$ outputs reachable would mean $k$ points shattered, but $k>d$ and the VC dimension is $d$.

*Verified: for 20 random $W$ in each of $(d,k)$ = (1,2), (2,3), (2,4), (3,4), (3,6), 200,000 random inputs gave at most 2, 6, 8, 14, 32 distinct outputs, always below $2^k$ (and equal to Cover's count); the equal-row, zero-row and $d=1$ examples were checked the same way.*

**Common mistakes.**

- Writing only the separation condition in part 1 and forgetting the containment with $B\in O(C)$; graders deduct for the missing direction.
- Using VC monotonicity in the wrong direction: $H'_C\subseteq H_B$ says nothing about how large $C$ must be; it is $H_B\subseteq H'_C$ that forces $C\ge e^B$.
- In part 4, treating the inputs as data points and the rows as classifiers: there are infinitely many inputs, so nothing follows; the duality must put the $k$ rows in the role of points.

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

**1. Gradient of the Hadamard objective**

**What is asked.** To prove the formula for the gradient of $\phi$ with respect to one block $u_j$. The answer is a derivation.

**Tool and why.** The multivariate chain rule, applied entry by entry (cheat sheet §7). The Hadamard product acts on each coordinate separately, so each coordinate of $w$ is an ordinary product of $N$ scalars, and the chain rule is easy to apply coordinatewise.

**Definitions.** We write $(u_j)_i$ for the $i$-th entry of $u_j$ and $(\nabla L(w))_i$ for the $i$-th entry of the gradient of $L$. By the definition of the Hadamard product, the $i$-th entry of the end-to-end vector is

$$w_i=\prod_{n=1}^N(u_n)_i$$

**Solution.**

Step 1, which entries of $w$ depend on $(u_j)_i$: the entry $w_k$ contains only $k$-th entries, so it does not depend on $(u_j)_i$ when $k\ne i$. The entry $w_i$ is linear in $(u_j)_i$, with coefficient the product of the other factors. Hence

$$\frac{\partial w_k}{\partial (u_j)_i}=\begin{cases}\prod_{n\ne j}(u_n)_i, & k=i\\ 0, & k\ne i\end{cases}$$

Step 2, chain rule for $\phi=L\circ w$: summing over all entries of $w$ and using step 1, only the term $k=i$ survives:

$$\begin{aligned}
\frac{\partial\phi}{\partial (u_j)_i}&=\sum_{k=1}^d(\nabla L(w))_k\,\frac{\partial w_k}{\partial (u_j)_i}\\
&=(\nabla L(w))_i\prod_{n\ne j}(u_n)_i
\end{aligned}$$

Step 3, stacking the entries: the $i$-th entry of the vector $\big(\odot_{n\ne j}u_n\big)\odot\nabla L(w)$ is, by the definition of $\odot$, exactly the right-hand side of step 2. Since this holds for every $i$,

$$\frac{\partial\phi}{\partial u_j}=\Big(\odot_{n\ne j}\,u_n\Big)\odot\nabla L(w)$$

**In words.** Coordinate $i$ is a small scalar network: a product of $N$ numbers fed into $L$. The derivative of a product with respect to one factor is the product of the remaining factors, and the chain rule multiplies it by the slope of $L$ in that coordinate.

**Sanity check.** For $N=2$ and $d=1$ we have $\phi=L(u_1u_2)$, and ordinary differentiation gives

$$\frac{\partial\phi}{\partial u_1}=u_2\,L'(u_1u_2)$$

which is the formula with $\odot_{n\ne1}u_n=u_2$.

**What to write in the exam.**

- Entrywise, $w_i=\prod_n(u_n)_i$, so $w_k$ does not depend on $(u_j)_i$ for $k\ne i$.
- The derivative of $w_i$ by $(u_j)_i$ is $\prod_{n\ne j}(u_n)_i$.
- Chain rule: the derivative of $\phi$ by $(u_j)_i$ is $(\nabla L(w))_i\prod_{n\ne j}(u_n)_i$; stacking over $i$ gives the claim.

*Verified: central finite differences at a random point with $N=3$, $d=4$ and a convex loss (log-sum-exp plus a quadratic) matched the formula to within $3\cdot10^{-10}$.*

**2. $\phi$ is not convex**

**What is asked.** To prove that $\phi$ is not convex when $L(0)>L(w^*)$. The answer is a proof by contradiction.

**Tool and why.** For a differentiable convex function every critical point is a global minimum (cheat sheet §7). So it is enough to find a critical point of $\phi$ that is not a global minimum. The origin is the natural candidate, because by part 1 every block gradient there contains a zero factor.

**Definitions.** We write $\mathbf0$ for the origin $(0,\dots,0)$ of the parameter space, and $\mathbf1$ for the all-ones vector in $\mathbb{R}^d$. We use $\mathbf1$ because Hadamard multiplication by it changes nothing.

**Solution.**

Step 1, $\phi$ is differentiable: $L$ is continuously differentiable and $w$ is a polynomial in the parameters, so $\phi$ is continuously differentiable by the chain rule, with the gradient of part 1.

Step 2, the origin is a critical point: by part 1, block $j$ of the gradient at $\mathbf0$ is $\big(\odot_{n\ne j}u_n\big)\odot\nabla L(0)$. Because $N\ge2$, the product over $n\ne j$ has at least one factor, and every factor is the zero vector. So every block is zero, and $\nabla\phi(\mathbf0)=0$.

Step 3, a strictly better point: at the origin $w=0$, so $\phi(\mathbf0)=L(0)$. At the point $(w^*,\mathbf1,\dots,\mathbf1)$ the end-to-end vector is $w^*\odot\mathbf1\odot\cdots\odot\mathbf1=w^*$. Hence, using the assumption,

$$\phi(w^*,\mathbf1,\dots,\mathbf1)=L(w^*)<L(0)=\phi(\mathbf0)$$

so the origin is not a global minimum of $\phi$.

Step 4, the convexity fact.

**Claim.** If $F$ is convex and differentiable and $\nabla F(x)=0$, then $x$ is a global minimum of $F$.

Proof: the first-order characterization of convexity gives, for every $y$,

$$F(y)\ge F(x)+\langle\nabla F(x),y-x\rangle=F(x)$$

Step 5, conclusion: if $\phi$ were convex, the claim of step 4 applied to the critical point of step 2 would make $\mathbf0$ a global minimum, contradicting step 3. So $\phi$ is not convex.

**In words.** Overparameterizing $w$ as a product creates a bad stationary point at zero: every factor is switched off by the others, so no single block feels any gradient, even though the loss there is not minimal. A convex function never has such a point.

**Sanity check.** An explicit violation of convexity: $N=2$, $d=1$ and $L(w)=\frac12(w-1)^2$, which satisfies $L(0)=\frac12$ and $L(1)=0$. Then $\phi(u_1,u_2)=\frac12(u_1u_2-1)^2$ takes the value $0$ at both $(1,1)$ and $(-1,-1)$, but the value $\frac12$ at their midpoint $(0,0)$, above the average $0$ of the endpoint values.

**What to write in the exam.**

- By part 1 each block gradient at the origin contains a product of $N-1\ge1$ zero vectors, so the origin is critical.
- The point $(w^*,\mathbf1,\dots,\mathbf1)$ gives $\phi=L(w^*)$, smaller than $\phi(\mathbf0)=L(0)$.
- A differentiable convex function has every critical point a global minimum, so $\phi$ is not convex.

*Verified: gradient at the origin computed numerically (all blocks zero for $N=3$, $d=4$), and the midpoint example evaluated: values 0, 0 and 0.5.*

**3. The conserved quantity $u_i^2-u_j^2$**

**What is asked.** To prove that the time derivative of the entrywise square $u_j^2(t)$ equals $-2\,w\odot\nabla L(w)$ for every $j$. The answer is a derivation.

**Tool and why.** The definition of gradient flow together with the gradient of part 1 (cheat sheet §8, balancedness). Multiplying the flow of $u_j$ by $u_j$ completes the missing factor and turns the partial product into the full product $w$.

**Definitions.** $\dot u_j$ denotes the time derivative of $u_j(t)$; squares and products of vectors are entrywise, and we drop the argument $t$.

**Solution.**

Step 1, the flow equation: gradient flow means $\dot u_j=-\frac{\partial\phi}{\partial u_j}$, so by part 1

$$\dot u_j=-\Big(\odot_{n\ne j}u_n\Big)\odot\nabla L(w)$$

Step 2, derivative of an entrywise square: for each entry, the ordinary chain rule gives

$$\frac{d}{dt}(u_j)_i^2=2\,(u_j)_i\,(\dot u_j)_i$$

so in vector form the derivative of $u_j^2$ is $2\,u_j\odot\dot u_j$.

Step 3, substituting step 1: the second row uses $u_j\odot\big(\odot_{n\ne j}u_n\big)=w$, the product of all $N$ blocks.

$$\begin{aligned}
\frac{d}{dt}u_j^2&=-2\,u_j\odot\Big(\odot_{n\ne j}u_n\Big)\odot\nabla L(w)\\
&=-2\,w\odot\nabla L(w)
\end{aligned}$$

Step 4, conclusion: the right-hand side does not depend on $j$, so it is the same for every $i$ and $j$, which is the claim. In particular the derivative of $u_i^2-u_j^2$ is zero, so $u_i^2(t)-u_j^2(t)$ is constant in time (balancedness).

**In words.** Each block is pushed by the gradient times the product of the other blocks. Multiplying by its own value gives every block the same "push" $-2\,w\odot\nabla L(w)$, so all squared blocks change at the same rate and their differences are frozen.

**Sanity check.** For $N=2$, $d=1$ and $L(w)=\frac12(w-1)^2$, the flow is $\dot u_1=-u_2(u_1u_2-1)$, so the derivative of $u_1^2$ is $-2u_1u_2(u_1u_2-1)$. By symmetry the derivative of $u_2^2$ is the same expression, $-2w(w-1)$.

**What to write in the exam.**

- Flow: $\dot u_j=-(\odot_{n\ne j}u_n)\odot\nabla L(w)$ by part 1.
- Entrywise square: its derivative is $2\,u_j\odot\dot u_j$.
- Multiplying $u_j$ by the product of the others gives $w$, so the result is $-2\,w\odot\nabla L(w)$ for every $j$.

*Verified: RK4 integration of the gradient flow ($N=3$, $d=4$, random initialization, convex non-quadratic loss) kept $u_1^2-u_2^2$ constant to within $7\cdot10^{-11}$ over $t\in[0,3]$.*

**4. End-to-end dynamics under balanced positive initialization**

**What is asked.** To prove that, starting from equal blocks with positive entries, the end-to-end vector follows $\dot w=-N\,\nabla L(w)\odot w^{2-\frac2N}$. The answer is a derivation.

**Tool and why.** The conservation law of part 3 shows that the blocks keep equal absolute values (cheat sheet §8); a positivity argument shows that they stay equal; then the chain rule on $w=v^N$ gives the dynamics. Part 3 is exactly the tool for "the blocks stay balanced".

**Definitions.** Let $v(t):=u_1(t)$, and let $g(t):=\nabla L(w(t))$ with entries $g_i$. All powers are entrywise. We name $v$ because we will show that all blocks equal it.

**Solution.**

Step 1, equal absolute values: by part 3, $u_n^2-u_1^2$ has zero derivative, and it is zero at $t=0$ because the blocks start equal. Hence $u_n^2(t)=u_1^2(t)$ for all $t$, that is, $|(u_n)_i|=|v_i|$ for every $n$ and $i$.

Step 2, no entry ever reaches zero.

**Claim.** Every entry $v_i(t)$ stays positive for all $t\ge0$.

Proof: suppose not. All entries are positive at $t=0$ and continuous, so there is a first time $\tau$ at which some entry $v_i(\tau)=0$. On $[0,\tau)$ every $(u_n)_i$ is continuous, never zero (by step 1) and positive at $t=0$, hence positive; together with step 1 this gives $(u_n)_i=v_i$ on $[0,\tau)$. By step 1 of part 3, there $\dot v_i=-v_i^{N-1}g_i$. On the closed interval $[0,\tau]$ the continuous functions $|g_i|$ and $v_i$ are bounded, say by $G$ and $V$. Since $v_i>0$ on $[0,\tau)$, we have $v_i^{N-2}\le V^{N-2}$, and with $a:=V^{N-2}G$,

$$\dot v_i=-v_i^{N-2}g_i\,v_i\ge -a\,v_i$$

So the derivative of $e^{at}v_i(t)$, which is $e^{at}(\dot v_i+a\,v_i)$, is nonnegative, and $v_i(t)\ge e^{-at}v_i(0)$ on $[0,\tau)$. Letting $t\to\tau$ gives $v_i(\tau)\ge e^{-a\tau}v_i(0)$, which is positive, a contradiction.

Step 3, all blocks are equal: by the claim and step 1, each $(u_n)_i$ is continuous, never zero and positive at $t=0$, so it stays positive and equals $|v_i|=v_i$. Hence $u_n(t)=v(t)$ for every $n$ and every $t$.

Step 4, the end-to-end vector and the flow of $v$: the product of $N$ copies of $v$ gives $w=v^N$. The flow of part 3, step 1, with the $N-1$ other blocks equal to $v$, gives

$$\dot v=-v^{N-1}\odot\nabla L(w)$$

Step 5, differentiating $w=v^N$: the first row is the chain rule entrywise, the second substitutes step 4, and the third uses $v=w^{1/N}$ (entries positive), so that

$$v^{2N-2}=w^{\frac{2N-2}{N}}=w^{2-\frac2N}$$

$$\begin{aligned}
\dot w&=N\,v^{N-1}\odot\dot v\\
&=-N\,v^{2N-2}\odot\nabla L(w)\\
&=-N\,\nabla L(w)\odot w^{2-\frac2N}
\end{aligned}$$

**In words.** A balanced start stays balanced, so the $N$ blocks act like one vector raised to the power $N$. In terms of $w$ this is plain gradient flow with an entrywise preconditioner $N\,w^{2-\frac2N}$: entries that are already large move fast, entries near zero barely move.

**Sanity check.** Formally putting $N=1$ gives exponent $0$ and $\dot w=-\nabla L(w)$, plain gradient flow on $L$, as it should for a one-block "network". For $N=2$ the preconditioner is $2w$.

**What to write in the exam.**

- By part 3, $u_n^2-u_1^2$ is constant and zero at $t=0$, so all blocks have equal absolute values.
- No entry reaches zero: before the first zero, $\dot v_i\ge-a\,v_i$, so $v_i(t)\ge e^{-at}v_i(0)$, which stays positive; hence all $u_n$ equal $v$ for all $t$.
- Then $w=v^N$ and $\dot v=-v^{N-1}\odot\nabla L(w)$.
- Chain rule: $\dot w=N\,v^{N-1}\odot\dot v$; substituting $\dot v$ and $v=w^{1/N}$ gives $\dot w=-N\,\nabla L(w)\odot w^{2-\frac2N}$.

*Verified: RK4 integration for $N=2,3,5$ from equal positive blocks with $L(w)=\frac12\|w-\mathbf1\|^2$ kept the blocks identical, and a finite-difference $\dot w$ matched the formula to within $1.4\cdot10^{-6}$.*

**5. Exponential convergence of the loss**

**What is asked.** To prove that $L(w(t))\le L(w(0))\,e^{-2Nc^{2-2/N}t}$, assuming every entry of $w(t)$ is at least $c$. The answer is a proof.

**Tool and why.** The chain rule for $L(w(t))$, the dynamics of part 4, and an integrating factor, as in a PL-type rate argument (cheat sheet §9). The lower bound $c$ turns the preconditioner of part 4 into a constant, and for the quadratic loss the squared gradient norm is a multiple of the loss itself.

**Definitions.** We write $\Lambda(t):=L(w(t))$ for the loss along the flow, and $\kappa:=2Nc^{2-\frac2N}$ for the claimed rate. Then the goal reads $\Lambda(t)\le\Lambda(0)e^{-\kappa t}$.

**Solution.**

Step 1, chain rule: $\dot\Lambda=\langle\nabla L(w),\dot w\rangle$.

Step 2, substituting part 4: entry $i$ of $\dot w$ is $-N\,w_i^{2-\frac2N}(\nabla L(w))_i$, so

$$\dot\Lambda=-N\sum_{i=1}^d w_i^{2-\frac2N}\,(\nabla L(w))_i^2$$

Step 3, bounding each weight from below: $w_i\ge c$ with $c>0$, and the exponent $2-\frac2N$ is at least $1$ for $N\ge2$, in particular positive, so $x\mapsto x^{2-\frac2N}$ is increasing on the positive reals and $w_i^{2-\frac2N}\ge c^{2-\frac2N}$. Each $(\nabla L(w))_i^2$ is nonnegative and the sum carries a minus sign, so

$$\dot\Lambda\le-N\,c^{2-\frac2N}\,\|\nabla L(w)\|^2$$

Step 4, the gradient of this loss: for $L(w)=\frac12\|w-\mathbf1\|^2$ we have $\nabla L(w)=w-\mathbf1$, so $\|\nabla L(w)\|^2=\|w-\mathbf1\|^2$, which is $2L(w)$.

Step 5, the differential inequality of the hint: substituting step 4 into step 3,

$$\dot\Lambda\le-2N\,c^{2-\frac2N}\,\Lambda=-\kappa\,\Lambda$$

Step 6, integrating: the derivative of $e^{\kappa t}\Lambda(t)$ is $e^{\kappa t}(\dot\Lambda+\kappa\Lambda)$, which is at most $0$ by step 5. So $e^{\kappa t}\Lambda(t)$ is non-increasing, $e^{\kappa t}\Lambda(t)\le\Lambda(0)$, and

$$\boxed{\,L(w(t))\le L(w(0))e^{-2Nc^{2-2/N}t}\,}$$

**In words.** As long as every entry of $w$ stays at least $c$, the preconditioner of part 4 is at least $c^{2-\frac2N}$, so the flow is never slower than a fixed multiple of plain gradient flow on a quadratic, and plain gradient flow on a quadratic converges exponentially. The rate degrades as $c\to0$, which matches part 2: near the origin the flow stalls.

**Sanity check.** For $N=2$ the rate is $\kappa=4c$. When every entry of $w(0)$ lies in $(0,1)$, each entry of $w$ increases toward $1$, so the assumption holds with $c$ the smallest entry of $w(0)$; a simulation confirms that the loss stays below the bound.

**What to write in the exam.**

- Chain rule and part 4: $\dot\Lambda=-N\sum_i w_i^{2-\frac2N}(\nabla L(w))_i^2$.
- Since $w_i\ge c$, $c>0$ and the exponent is positive, each weight is at least $c^{2-\frac2N}$, so $\dot\Lambda\le-Nc^{2-\frac2N}\|\nabla L(w)\|^2$.
- For this loss $\nabla L(w)=w-\mathbf1$, so $\|\nabla L(w)\|^2=2L(w)$ and $\dot\Lambda\le-\kappa\Lambda$.
- Integrating factor: $e^{\kappa t}\Lambda(t)$ is non-increasing, which gives the bound.

*Verified: RK4 runs for $N=2,3,5$ with all entries of $w(0)$ in $(0,1)$: $c$ taken as the smallest entry of $w(t)$ over the run (equal to that of $w(0)$), and $L(w(t))$ stayed below the bound at every step; the identity $\|w-\mathbf1\|^2=2L(w)$ was checked numerically.*

**Common mistakes.**

- In part 2, showing only that the origin is critical: a critical point alone proves nothing; the strictly better point $(w^*,\mathbf1,\dots,\mathbf1)$ is what contradicts convexity.
- In part 4, claiming the blocks stay equal "because they start equal": that needs the conservation law of part 3 and an argument that no entry crosses zero; otherwise the signs of different blocks could split.
- In part 5, flipping the inequality when bounding $w_i^{2-\frac2N}$ from below (the sum has a minus sign), or using $\|\nabla L\|^2=L$ instead of $2L$, which halves the rate.

**💡 Useful tricks:** Entry-wise chain rule for each block gradient; the origin is critical because every block gradient hides a product of $N-1$ zero vectors ⇒ non-convex via "critical but not global"; balancedness $u_i^2-u_j^2$ is conserved *entry-wise*; balanced positive init ⇒ all $u_n$ stay equal ⇒ $w=u^N$ ⇒ the $-N\,\nabla L\odot w^{2-2/N}$ dynamics; then $\|\nabla L\|^2=2L$ closes the Grönwall.

**⚠️ Watch out:** (2) exhibit the strictly-better point $w^*$ — a critical point alone is not non-convexity; (4) justify "all $u_n(t)$ are equal for all $t$" from conservation plus the fact that no entry reaches zero, not just at $t=0$; (5) the *entry-wise* barrier $w_i\geq c$ is what lets you factor out $c^{2-2/N}$; use $\nabla L=w-\mathbf1$.

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

**1. Uniform convergence bound for a $b$-bit network**

**What is asked.** To prove that with probability at least $1-\delta$ the gap $L_D(h)-L_S(h)$ is at most the given square root, simultaneously for all $h\in H$. The answer is a proof.

**Tool and why.** Hoeffding's inequality for one fixed hypothesis, a union bound over the class, and counting the class through its bits (cheat sheet §2 and §10). Hoeffding only applies to a hypothesis fixed before the sample is drawn; the union bound upgrades it to all hypotheses at once, which is what "for all $h$" requires, and $b$ bits make the class finite.

**Definitions.** Let $\epsilon$ denote the right-hand side of the claim:

$$\epsilon=\sqrt{\frac{\ln(2/\delta)+b\ln2}{2m}}$$

For a fixed $h$, let $A_i:=\ell(h(x_i),y_i)$ be its loss on the $i$-th example, and let $E_h$ be the "bad event" that $|L_S(h)-L_D(h)|\ge\epsilon$. We name the bad events so that the union bound has something to add up.

**Solution.**

Step 1, size of the class: every hypothesis in $H$ is produced by at least one assignment of the $b$ bits, and there are $2^b$ assignments. So $|H|\le2^b$.

Step 2, one fixed hypothesis: the examples are i.i.d., so $A_1,\dots,A_m$ are i.i.d.; they lie in $[0,1]$ because $\ell$ does. Their average is $L_S(h)$ and their mean is $\mathbb{E}[A_1]=L_D(h)$. Hoeffding gives

$$P(E_h)\le2e^{-2m\epsilon^2}$$

Step 3, union bound over the class: by steps 1 and 2,

$$\begin{aligned}
P\Big(\bigcup_{h\in H}E_h\Big)&\le\sum_{h\in H}P(E_h)\\
&\le2|H|e^{-2m\epsilon^2}\\
&\le2^{b+1}e^{-2m\epsilon^2}
\end{aligned}$$

Step 4, choosing $\epsilon$: set the last bound equal to $\delta$ and solve. Taking logarithms gives $(b+1)\ln2-2m\epsilon^2=\ln\delta$, so

$$\begin{aligned}
2m\epsilon^2&=\ln2-\ln\delta+b\ln2\\
&=\ln(2/\delta)+b\ln2
\end{aligned}$$

which is exactly the $\epsilon$ of the definitions.

Step 5, the complement: with probability at least $1-\delta$ no bad event happens, so every $h\in H$ has $|L_S(h)-L_D(h)|<\epsilon$, and in particular $L_D(h)-L_S(h)\le\epsilon$. This is the claim.

**In words.** Each single network is unlikely to look much better on the sample than it really is. There are at most $2^b$ networks, so we pay a factor $2^b$ in the failure probability, which becomes the additive $b\ln2$ under the square root.

**Sanity check.** With $b=0$ the class has a single hypothesis and the bound reduces to plain Hoeffding:

$$\epsilon=\sqrt{\frac{\ln(2/\delta)}{2m}}$$

as expected.

**What to write in the exam.**

- Bits: $|H|\le2^b$.
- Fixed $h$: the losses are i.i.d. in $[0,1]$ with mean $L_D(h)$, so Hoeffding gives $P(E_h)\le2e^{-2m\epsilon^2}$.
- Union bound: failure probability at most $2^{b+1}e^{-2m\epsilon^2}$; setting it to $\delta$ gives the stated $\epsilon$.
- With probability at least $1-\delta$: $L_D(h)-L_S(h)\le\epsilon$ for all $h\in H$.

*Verified: sympy confirms $2^{b+1}e^{-2m\epsilon^2}=\delta$ at this $\epsilon$; a Monte-Carlo run with 8 threshold classifiers ($b=3$), $m=200$, $\delta=0.1$ violated the bound in 0.37% of 20,000 samples, below $\delta$.*

**2. Memorization forces $b\ge m$**

**What is asked.** To prove that the number of bits is at least the sample size when the network can fit every sample of size $m$ with distinct inputs. The answer is a proof.

**Tool and why.** Counting hypotheses (cheat sheet §10): the memorization property forces many distinct hypotheses, and $b$ bits allow at most $2^b$ of them.

**Definitions.** Let $x_1,\dots,x_m$ be distinct points of $\mathbb{R}^d$; they exist because $\mathbb{R}^d$ is infinite. For each labeling $y\in\{0,1\}^m$, let $h_y\in H$ be a hypothesis with $h_y(x_i)=y_i$ for all $i$; it exists by the assumption.

**Solution.**

Step 1, distinct labelings give distinct hypotheses: let $y\ne y'$. Then they differ in some coordinate $i$, so

$$h_y(x_i)=y_i\ne y'_i=h_{y'}(x_i)$$

and therefore $h_y\ne h_{y'}$.

Step 2, counting: there are $2^m$ labelings, and by step 1 they give $2^m$ different hypotheses in $H$. So $|H|\ge2^m$.

Step 3, combining with part 1, step 1:

$$2^m\le|H|\le2^b$$

Since $\log_2$ is increasing, $b\ge m$.

**In words.** Storing $m$ arbitrary bits of labels requires at least $m$ bits of memory. A network that can memorize any labeling of $m$ points is such a memory.

**Sanity check.** For $m=1$: the network must output both $0$ and $1$ on a point, so it needs at least two hypotheses, and $b\ge1$. One bit indeed suffices (the two constant functions), so the bound is tight there.

**What to write in the exam.**

- Fix distinct $x_1,\dots,x_m$; for each of the $2^m$ labelings take a realizing $h_y$.
- Different labelings differ at some $x_i$, so their hypotheses differ.
- Hence $2^m\le|H|$, together with $|H|\le2^b$ this gives $b\ge m$.

*Verified: enumerated all $2^m$ labelings for $m$ up to 10 and confirmed that their restrictions to the points are pairwise distinct, so any realizing family has at least $2^m$ members.*

**3. Why the bound becomes trivial**

**What is asked.** To explain why the bound of part 1 gives no useful guarantee for such a network. The answer is an explanation backed by a computation.

**Tool and why.** Substitute part 2 into part 1 and look at the size of the result (cheat sheet §12, interpolation makes uniform convergence vacuous). The bound grows with $b$, and part 2 says $b$ grows at least like $m$.

**Definitions.** No new notation.

**Solution.**

Step 1, lower bound on the bound: $b\ge m$ by part 2, and $\ln(2/\delta)>0$ because $\delta<1$. Hence the numerator is larger than $m\ln2$, and

$$\sqrt{\frac{\ln(2/\delta)+b\ln2}{2m}}>\sqrt{\frac{\ln2}{2}}\approx0.589$$

Step 2, it does not decrease with $m$: the right-hand side does not depend on $m$. For example, with $b=m$ and $\delta=0.05$:

| $m$ | bound |
|---|---|
| $10$ | $0.729$ |
| $100$ | $0.604$ |
| $10^4$ | $0.589$ |
| $10^8$ | $0.589$ |

Step 3, the bound is worse than guessing: a network that fits the sample has $L_S(h)=0$, so the best the bound can say is that $L_D(h)$ is at most about $0.59$. A fair coin flip already has error $0.5$ under the 0–1 loss. So the guarantee cannot even certify that the network beats random guessing, no matter how much data we have: it is trivial.

**In words.** The bound charges for the capacity of the class, and a class that can memorize any $m$ labels has capacity of order $m$. The penalty $b\ln2/(2m)$ then stays of constant size and never shrinks, exactly the regime of modern networks that fit random labels.

**Sanity check.** If $b$ were fixed while $m$ grows, the bound would tend to $0$; the failure comes only from $b$ growing with $m$. Note also that the bound is not false: it is a true statement that happens to say nothing useful.

**What to write in the exam.**

- By part 2, $b\ge m$, so the bound is at least $\sqrt{\ln2/2}\approx0.59$ for every $m$.
- It does not shrink with $m$, and it is above $0.5$, the error of random guessing.
- So uniform convergence gives no meaningful guarantee for interpolating networks.

*Verified: computed the bound with $b=m$ and $\delta=0.05$ for $m$ from 10 to $10^8$: it decreases to $\sqrt{\ln2/2}\approx0.5887$ and never goes below it.*

**4. A distribution with $L_D(h)=0.5$ for every $h$**

**What is asked.** To construct a distribution $D$ under which every hypothesis has error exactly $0.5$ (0–1 loss). The answer is a construction plus a computation.

**Tool and why.** Make the label pure noise, independent of the input (cheat sheet §1, definition of $L_D$, and §12, random labels). Then no function of $x$ can predict $y$ better than chance.

**Definitions.** Fix a point $x_0\in\mathbb{R}^d$. Let $D$ put $x=x_0$ with probability $1$ and draw $y\sim\mathrm{Bernoulli}(1/2)$ independently of $x$.

**Solution.**

Step 1, the error of one hypothesis: $h(x_0)$ is a fixed value in $\{0,1\}$, and $y$ equals $0$ or $1$ with probability $\frac12$ each, so

$$L_D(h)=\tfrac12\,\ell(h(x_0),0)+\tfrac12\,\ell(h(x_0),1)=\tfrac12$$

Step 2, why it equals $\frac12$: under the 0–1 loss exactly one of the two losses is $1$ (the one whose label differs from $h(x_0)$) and the other is $0$.

Step 3, conclusion: this holds for every $h\in H$, whichever one the learner returns.

**In words.** If the label is a coin flip that ignores the input, every predictor is wrong half of the time. Any marginal on $x$ works equally well; a single point is the simplest choice.

**Sanity check.** This is the random-labels experiment of Zhang et al.: networks still fit the training sample perfectly, yet their test error is at chance level, $0.5$.

**What to write in the exam.**

- $D$: $x=x_0$ always, $y\sim\mathrm{Bernoulli}(1/2)$ independent of $x$.
- For every $h$ exactly one of the two labels is misclassified, so $L_D(h)=\frac12$.

*Verified: computed $L_D$ for both possible values of $h(x_0)$: 0.5 in each case.*

**5. A distribution where interpolation gives $L_D(h)=0$**

**What is asked.** To show a distribution $D$ and a way of returning an $h\in H$ that fits every sample from $D$ and has $L_D(h)=0$. The answer is a construction.

**Tool and why.** A point-mass distribution together with the memorization assumption (cheat sheet §12). With all the mass on one example, fitting the sample means fitting the whole distribution.

**Definitions.** Fix $x_0\in\mathbb{R}^d$ and a label $y_0\in\{0,1\}$. Let $D$ be the point mass on the pair $(x_0,y_0)$.

**Solution.**

Step 1, what the samples look like: every example drawn from $D$ is $(x_0,y_0)$, so every training sample is $m$ copies of it.

Step 2, finding a suitable $h$: the memorization assumption covers only distinct inputs, so it cannot be applied to the sample itself. Instead, choose $m-1$ further distinct points $x'_2,\dots,x'_m$, all different from $x_0$, with arbitrary labels (say $0$). The assumption gives $h\in H$ with $h(x_0)=y_0$.

Step 3, the returning rule: return this $h$, whatever the sample. It classifies every sample from $D$ correctly, since each example is $(x_0,y_0)$.

Step 4, its error: $D$ has a single atom, so $L_D(h)=\ell(h(x_0),y_0)$, and this is $\ell(y_0,y_0)=0$.

**In words.** The same class $H$, with the same memorization ability, generalizes perfectly here (error $0$) and at chance level in part 4 (error $0.5$). The bound of part 1 depends only on $H$ (through $b$), so it cannot tell these two cases apart: for interpolating classes, generalization depends on the distribution and the algorithm, not on capacity alone.

**Sanity check.** The bound of part 1 is still valid in both cases: it allows error up to at least $0.589$, and the true errors are $0$ here and $0.5$ in part 4. It is consistent, just uninformative.

**What to write in the exam.**

- $D$: point mass on $(x_0,y_0)$, so every sample is $m$ copies of it.
- Apply memorization to $x_0$ and $m-1$ other distinct points to get $h$ with $h(x_0)=y_0$; return it.
- It fits every sample, and $L_D(h)=\ell(y_0,y_0)$, which is $0$.

*Verified: $L_D$ of the returned $h$ computed exactly as an expectation over the single atom (0), and compared with the part-1 bound (at least 0.5887): consistent with both 0 here and 0.5 in part 4.*

**Common mistakes.**

- Applying Hoeffding directly to the learned hypothesis: it depends on the sample, so the losses are not independent of it; fix $h$ first and then take the union bound.
- In part 2, counting parameters or networks instead of distinct functions, or skipping the step "distinct labelings force distinct hypotheses".
- In part 5, applying the memorization property directly to a sample with repeated inputs; the assumption covers only distinct inputs, so add other distinct points first.

**💡 Useful tricks:** $b$ bits ⇒ $|H|\leq2^b$ ⇒ Hoeffding + union gives the stated $\sqrt{(\ln(2/\delta)+b\ln2)/2m}$; "correctly classifies every sample" ⇒ all $2^m$ labelings realizable ⇒ $2^b\geq2^m$ ⇒ $b\geq m$; a pure-noise label ($y\sim\mathrm{Bernoulli}(\tfrac12)$) forces $L_D=\tfrac12$ for every $h$; a point-mass $D$ makes interpolation give $L_D=0$.

**⚠️ Watch out:** (2) the counting needs *distinct labelings ⇒ distinct hypotheses*; (3) with $b\geq m$ the $b\ln2/2m$ term is $\Omega(1)$ and never shrinks — this is the Zhang-et-al. "uniform convergence fails for DL" moral, not a computational slip; (4)/(5) the punchline is that the SAME class $H$ has both a vacuous (noise) and a perfect (realizable) case — generalization is not a property of $H$ alone.
