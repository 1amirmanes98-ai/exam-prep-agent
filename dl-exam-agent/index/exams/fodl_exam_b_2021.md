# FODL Exam — Moed B 2021
**Date / semester:** 10.08.2021 — Semester B 2020/21 (תשפ"א), Moed B; School of CS, Tel Aviv University; lecturer: Dr. Nadav Cohen, TA: Noam Razin; 3 hours; 3 questions, max possible score 106
**Total points:** 106

## Q1 (42 pts) — Depth adds no expressiveness: sign networks with non-negative weights
**Topics:** depth-separation, hypothesis-class, sign-activation, piecewise-constant, non-negative-weights | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_B^L$ be the hypothesis class of a neural network with $L \geq 1$ hidden layers of width $B$, one-dimensional input and output (i.e. $X = Y = \mathbb{R}$, where $X$ is the input space and $Y$ the output space), sign activation function on the neurons of the hidden layers, and **non-negative weight matrices**. That is:

$$\mathcal{H}_B^L = \left\{ x \mapsto W_{L+1}\,\sigma\!\big(W_L\,\sigma(\cdots \sigma(W_1 x + b_1)\cdots) + b_L\big) + b_{L+1} \;:\; W_1 \in \mathbb{R}_{\geq 0}^{B,1},\, W_2,\ldots,W_L \in \mathbb{R}_{\geq 0}^{B,B},\, W_{L+1} \in \mathbb{R}_{\geq 0}^{1,B},\, b_1,\ldots,b_L \in \mathbb{R}^B,\, b_{L+1} \in \mathbb{R} \right\}$$

where $\sigma(z)_i$ equals one if $z_i > 0$ and zero otherwise, for every $z \in \mathbb{R}^B$ and $i \in \{1,\ldots,B\}$.

**(a) (7 pts)** Formally define the following expression: "$\mathcal{H}_B^L$ is expressively efficient with respect to $\mathcal{H}_B^1$."

**(b) (12 pts)** Prove that $\mathcal{H}_B^1 \subset \mathcal{H}_B^L$ for $B, L \in \mathbb{N}$.

We say that $g : \mathbb{R} \to \mathbb{R}$ is *piecewise constant* if there exist scalars $\alpha_1, \ldots, \alpha_N$ and $c_0 := -\infty < c_1 < \cdots < c_{N-1} < c_N := \infty$ such that $g(x) = \alpha_j$ on each interval $(c_{j-1}, c_j]$ (of course, for $j = N$ the interval is open on its right side as well). The minimal $N$ for which such scalars exist is called the *number of constant pieces* of $g$.

In the following sub-parts you may use the following facts:
- $\mathcal{H}_B^1$ equals the class of piecewise constant functions with at most $B+1$ constant pieces.
- For any $h_1, \ldots, h_B \in \mathcal{H}_B^1$ sharing the same first-layer parameter values ($W_1$ and $b_1$), there exist scalars $c_0 := -\infty < c_1 < \cdots < c_B < c_{B+1} := \infty$ for which $h_1, \ldots, h_B$ are all constant on each interval $(c_{j-1}, c_j]$ (again, for $j = B+1$ the interval is open on its right side as well).

**(c) (16 pts)** Prove that every function in $\mathcal{H}_B^L$ is piecewise constant with at most $B+1$ constant pieces.

*Hint:* First prove that, for any values of $W_1, W_2, b_1, b_2$, the vector-valued function defined by $g(x) := W_2\,\sigma(W_1 x + b_1) + b_2$ is piecewise constant with at most $B+1$ constant pieces, i.e. there exist scalars $c_0 := -\infty < c_1 < \cdots < c_B < c_{B+1} := \infty$ for which the (vector) output $g(x)$ is constant on each interval $(c_{j-1}, c_j]$.

**(d) (7 pts)** Is $\mathcal{H}_B^L$ expressively efficient with respect to $\mathcal{H}_B^1$? Explain.

**Solution sketch:**

**1. Part (a): formal definition of expressive efficiency**

**What is asked.** To write formally what it means that the family $\{\mathcal{H}_B^L\}_B$ is expressively efficient with respect to $\{\mathcal{H}_B^1\}_B$. The answer is a definition with two conditions.

**Tool and why.** The course definition of expressive efficiency (lecture 1, Def 2; cheat sheet §4). Both families are indexed by the width, so the definition compares the width the deep family needs with the width the shallow family needs for the same function.

**Definitions.** We write $B$ for the width of the deep family and $B'$ for the width of the shallow family. Two letters are needed because the definition compares two different widths.

**Solution.**

Step 1, containment in the cheap direction: the deep family can imitate the shallow one at comparable width. For every $B'$ there is $B\in O(B')$ such that

$$\mathcal{H}_{B'}^1\subseteq\mathcal{H}_B^L$$

Step 2, separation in the expensive direction: the deep family has a function that the shallow family realizes only at a huge width. There is a moderate width $B$ and a function $h\in\mathcal{H}_B^L$ such that $h\notin\mathcal{H}_{B'}^1$ unless $B'$ is prohibitively large, that is, super-polynomial in $B$ (exponential, in the course's examples).

Step 3, both together: $\mathcal{H}_B^L$ is expressively efficient with respect to $\mathcal{H}_B^1$ exactly when the conditions of step 1 and step 2 both hold. In step 1 the overhead is $O(B')$, a constant factor, as in Def 2; writing $\mathrm{poly}(B')$ there is a different (weaker) definition.

**In words.** The deep family loses nothing, since it copies the shallow family at the price of a constant factor in width, and it gains a lot, since some of its functions cost the shallow family an enormous width.

**Sanity check.** The course's model example, deep versus shallow ReLU networks, meets both conditions: a shallow ReLU network of width $B'$ fits in a deep one of width $O(B')$, and the sawtooth needs a shallow width exponential in the depth. Part (d) shows that the sign networks of this question fail the second condition.

**What to write in the exam.**

- Condition 1: for every $B'$ there is $B\in O(B')$ with $\mathcal{H}_{B'}^1\subseteq\mathcal{H}_B^L$.
- Condition 2: for a moderate $B$ there is $h\in\mathcal{H}_B^L$ with $h\notin\mathcal{H}_{B'}^1$ unless $B'$ is super-polynomial in $B$.
- Both conditions are part of the definition; the overhead in condition 1 is $O(B')$, not $\mathrm{poly}(B')$.

*Verified: definition checked against lecture 1, Def 2 in the course index; there is nothing numeric to compute in this part.*

**2. Part (b): depth $1$ is contained in depth $L$**

**What is asked.** To prove that every function of $\mathcal{H}_B^1$ is also in $\mathcal{H}_B^L$, for all $B$ and $L$. The symbol $\subset$ in the statement means inclusion, not necessarily strict (part (d) shows the two classes are in fact equal). The answer is a construction with a check.

**Tool and why.** Inclusion between architectures through pass-through layers (cheat sheet §4). With sign activation the hidden values are bits, the activation leaves bits unchanged, so an identity layer passes them on untouched, and the identity matrix is non-negative, as the class demands.

**Definitions.** Let $I_B$ be the $B\times B$ identity matrix; it is the weight matrix of the pass-through layers.

**Solution.**

Step 1, the function to imitate: take any $h\in\mathcal{H}_B^1$. By the definition of the class there are $W_1\in\mathbb{R}_{\geq0}^{B,1}$, $W_2\in\mathbb{R}_{\geq0}^{1,B}$, $b_1\in\mathbb{R}^B$ and $b_2\in\mathbb{R}$ such that

$$h(x)=W_2\,\sigma(W_1x+b_1)+b_2$$

Step 2, the activation fixes bit vectors: let $v\in\{0,1\}^B$. A coordinate with $v_i=1$ is positive, so $\sigma(v)_i=1$; a coordinate with $v_i=0$ is not positive, so $\sigma(v)_i=0$. Hence $\sigma(v)=v$, and because $I_Bv+0$ is $v$,

$$\sigma(I_Bv+0)=v$$

Step 3, the deep network: define the depth-$L$ parameters as follows.

- First layer: $W'_1=W_1$ and $b'_1=b_1$.
- Middle layers: $W'_l=I_B$ and $b'_l=0$ for every $l$ from $2$ to $L$.
- Output layer: $W'_{L+1}=W_2$ and $b'_{L+1}=b_2$.

Step 4, the constraints hold: $W_1$ and $W_2$ are non-negative by assumption, and $I_B$ has entries $0$ and $1$. The shapes are $B\times1$, $B\times B$ and $1\times B$, as required. So the new network belongs to $\mathcal{H}_B^L$.

Step 5, it computes $h$: the first hidden layer outputs $v=\sigma(W_1x+b_1)$, a bit vector. By step 2 each of the $L-1$ middle layers maps $v$ to $v$. The output layer then returns $W_2v+b_2$, which is $h(x)$. So $h\in\mathcal{H}_B^L$, and since $h$ was arbitrary, $\mathcal{H}_B^1\subseteq\mathcal{H}_B^L$. For $L=1$ there are no middle layers and the claim is trivial.

**In words.** Extra layers can be made to do nothing: once a sign layer has produced bits, an identity layer copies them, so a deeper network of the same width always simulates a shallower one.

**Sanity check.** Take $B=1$ with $W_1=1$, $b_1=-2$, $W_2=3$ and $b_2=0$, so $h$ is $3$ for $x$ above $2$ and $0$ otherwise. With one middle layer the deep network computes $3\sigma(\sigma(x-2))$, which is $3\sigma(x-2)$ by step 2. A middle layer with weight $-1$ would not even be allowed, and it would also give $\sigma(-v)$, which is $0$ for every bit $v$ and destroys the function.

**What to write in the exam.**

- Hidden values lie in $\{0,1\}^B$, and $\sigma(v)=v$ for every such $v$.
- Keep the first layer, insert $L-1$ layers with weight $I_B$ and bias $0$, keep the output layer.
- The identity matrix is non-negative, so the new network is in $\mathcal{H}_B^L$, and it computes the same $h$.

*Verified: for $B$ from $1$ to $5$ and $L$ from $2$ to $5$, 2,000 random depth-1 networks with non-negative weights were padded with identity layers; the outputs agreed exactly on 500 random inputs each.*

**3. Part (c): at most $B+1$ constant pieces at any depth**

**What is asked.** To prove that every $h\in\mathcal{H}_B^L$ is piecewise constant with at most $B+1$ constant pieces. The answer is a proof.

**Tool and why.** Counting pieces through a composition (cheat sheet §5). With a one-dimensional input, $x$ enters the network only in the first layer, so on an interval where the first hidden layer is constant everything computed after it is constant too. The hint asks for this for the first two layers; we prove it and then pass through the remaining layers.

**Definitions.** Let $a_i$ and $\beta_i$ be the $i$-th entries of $W_1$ and $b_1$, so neuron $i$ of the first layer receives $z_i(x)=a_ix+\beta_i$, and $a_i\geq0$. For a neuron with $a_i>0$ let $t_i=-\beta_i/a_i$, the point where $z_i$ crosses $0$. Let $v(x)=\sigma(W_1x+b_1)$ be the first hidden layer, and let $F$ be the map that layers $2$ to $L+1$ apply to it, so that $h(x)=F(v(x))$. We name $v$ and $F$ to separate the only place where $x$ enters from everything that follows.

**Solution.**

Step 1, each first-layer neuron switches on at most once: if $a_i=0$ then $z_i$ is the constant $\beta_i$, so $v_i$ is constant. If $a_i>0$ then $z_i(x)>0$ exactly when $x>t_i$, so

$$v_i(x)=\begin{cases}0, & x\le t_i\\ 1, & x>t_i\end{cases}$$

This is where $a_i\geq0$ is used: a neuron with $a_i<0$ would equal $1$ for $x<t_i$ and $0$ from $t_i$ on, a piece closed on the left, not of the form $(c_{j-1},c_j]$.

Step 2, the breakpoints: collect the distinct values $t_i$ over the neurons with $a_i>0$. There are at most $B$ of them; sort them increasingly as $c_1,\dots,c_K$, where $K\le B$, and set $c_0=-\infty$ and $c_{K+1}=\infty$.

Step 3, the first layer is constant on each interval: fix $j$ and $x\in(c_{j-1},c_j]$, and a neuron with $a_i>0$. Its $t_i$ is one of the breakpoints, so there are two cases.

- Either $t_i\le c_{j-1}$, and then $x>t_i$, so $v_i(x)=1$.
- Or $t_i\geq c_j$, and then $x\le t_i$, so $v_i(x)=0$.

In both cases $v_i(x)$ does not depend on where $x$ lies in the interval, and neurons with $a_i=0$ are constant everywhere. So $v(x)$ is one fixed vector on all of $(c_{j-1},c_j]$.

Step 4, the hint: $g(x)=W_2v(x)+b_2$ is a fixed function of $v(x)$, so it is constant on the same $K+1$ intervals. If $K<B$ we may add arbitrary extra breakpoints to get exactly the $B+1$ intervals of the hint, since a function constant on an interval is constant on each part of it.

Step 5, the whole network: $h(x)=F(v(x))$, and $F$ has fixed weights and sees $x$ only through $v(x)$. Since $v$ is constant on each $(c_{j-1},c_j]$, so is $h$. Therefore $h$ is piecewise constant with at most $K+1$ pieces, and $K+1\le B+1$. No later layer can create a new breakpoint, because a new breakpoint would need $h$ to change while $v$ stays fixed.

Step 6, a by-product needed in part (d), $h$ is non-decreasing: each $v_i$ is non-decreasing in $x$ by step 1. If $u\le u'$ coordinate-wise and $W\geq0$, then $Wu+b\le Wu'+b$ coordinate-wise, and $\sigma$ is non-decreasing in each coordinate, so every hidden layer preserves the coordinate-wise order; the non-negative output layer does too. Hence $x\le x'$ implies $h(x)\le h(x')$.

**In words.** In one dimension the input reaches the network only through at most $B$ thresholds of the first layer. Everything deeper is a function of $B$ bits that change at those thresholds and nowhere else, so depth cannot add breakpoints.

**Sanity check.** Take $B=1$ and $L=3$: first layer $\sigma(x)$, second and third layers $\sigma(2u-1)$, output $5u$. The second and third layers map the bit $1$ to $\sigma(1)$, which is $1$, and the bit $0$ to $\sigma(-1)$, which is $0$. There is one threshold, $c_1=0$, and the network outputs $0$ for $x\le0$ and $5$ for $x>0$: two pieces, which is $B+1$.

**What to write in the exam.**

- Neuron $i$ of the first layer is $\sigma(a_ix+\beta_i)$ with $a_i\geq0$, so it is $0$ up to its threshold $t_i$ and $1$ after it (or constant).
- At most $B$ thresholds give at most $B+1$ intervals $(c_{j-1},c_j]$ on which $\sigma(W_1x+b_1)$ is constant.
- Hence $W_2\sigma(W_1x+b_1)+b_2$ is constant there (the hint), and so is every later layer, which sees $x$ only through the first layer.
- Conclusion: at most $B+1$ constant pieces for every $L$.

*Verified: 5,000 random networks ($B$ and $L$ from $1$ to $5$, non-negative integer first-layer weights) evaluated on 3,000 random inputs plus all thresholds: never more than $B+1$ pieces, the value at each $c_j$ equal to the value just left of it, and the output never decreasing.*

**4. Part (d): depth gives no expressive efficiency here**

**What is asked.** Whether $\mathcal{H}_B^L$ is expressively efficient with respect to $\mathcal{H}_B^1$, with an explanation. The answer is no, with a proof.

**Tool and why.** The definition of part (a) (cheat sheet §4): efficiency needs a deep function that costs the shallow family a prohibitive width. We show the strongest possible failure, $\mathcal{H}_B^L=\mathcal{H}_B^1$ at the same width, from parts (b) and (c).

**Definitions.** Fix $h\in\mathcal{H}_B^L$. By part (c) there are breakpoints $c_1,\dots,c_K$ in increasing order, with $K\le B$, and values $\alpha_1,\dots,\alpha_{K+1}$ such that $h$ equals $\alpha_j$ on $(c_{j-1},c_j]$. Let $\Delta_j=\alpha_{j+1}-\alpha_j$ be the jump of $h$ at $c_j$. We name the jumps because they become the output weights of the shallow network.

**Solution.**

Verdict: no. In fact $\mathcal{H}_B^L=\mathcal{H}_B^1$.

Step 1, the easy inclusion: part (b) gives $\mathcal{H}_B^1\subseteq\mathcal{H}_B^L$.

Step 2, the jumps are non-negative: by part (c), step 6, $h$ is non-decreasing, so $\alpha_{j+1}\geq\alpha_j$, that is $\Delta_j\geq0$.

Step 3, $h$ as a sum of steps: for every $x$,

$$h(x)=\alpha_1+\sum_{j=1}^{K}\Delta_j\,\sigma(x-c_j)$$

Indeed, for $x\in(c_{i-1},c_i]$ the step $\sigma(x-c_j)$ is on exactly when $j\le i-1$, and the sum telescopes to $\alpha_i$.

Step 4, a depth-1 network of width $B$: neuron $j$, for $j$ from $1$ to $K$, has first-layer weight $1$, bias $-c_j$ and output weight $\Delta_j$; the remaining $B-K$ neurons get output weight $0$; the output bias is $\alpha_1$. All weights are $1$, $\Delta_j$ or $0$, non-negative by step 2, so this network is in $\mathcal{H}_B^1$, and by step 3 it computes $h$. Hence $\mathcal{H}_B^L\subseteq\mathcal{H}_B^1$.

Step 5, efficiency fails: by steps 1 and 4 every $h\in\mathcal{H}_B^L$ already lies in $\mathcal{H}_{B'}^1$ with $B'=B$, which is not prohibitively large. So condition 2 of part (a) fails (condition 1 holds with $B=B'$ by part (b)), and $\mathcal{H}_B^L$ is not expressively efficient with respect to $\mathcal{H}_B^1$.

A remark on the given fact: it says that $\mathcal{H}_B^1$ equals all piecewise constant functions with at most $B+1$ pieces. With non-negative weights every function in $\mathcal{H}_B^1$ is non-decreasing (part (c), step 6), so for example the two-piece function that is $1$ on $(-\infty,0]$ and $0$ after it is not in $\mathcal{H}_B^1$. The fact is correct for non-decreasing functions, and steps 2 to 4 prove exactly that version, so the conclusion stands.

**In words.** Non-negative weights and a one-dimensional input make every network, of any depth, a non-decreasing staircase with at most $B$ steps, and one hidden layer of width $B$ builds any such staircase. Depth adds nothing, so there is no depth separation here.

**Sanity check.** The part (c) example, $0$ for $x\le0$ and $5$ after, is rebuilt with one neuron: $K=1$, $c_1=0$, $\alpha_1=0$ and $\Delta_1=5$, so $h(x)=5\sigma(x)$, a network in $\mathcal{H}_1^1$.

**What to write in the exam.**

- No: $\mathcal{H}_B^L=\mathcal{H}_B^1$.
- Part (b) gives one inclusion.
- By part (c), $h\in\mathcal{H}_B^L$ is a non-decreasing staircase with at most $B$ jumps $\Delta_j\geq0$, so it is a sum of at most $B$ non-negative steps $\Delta_j\sigma(x-c_j)$ plus a constant: a depth-1 network of width $B$.
- Every deep function costs the shallow family the same width $B$, so the separation condition of the definition fails.

*Verified: for 2,500 random depth-$L$ networks ($B$ and $L$ from $1$ to $5$) the width-$B$ depth-1 network of step 4 was built from the breakpoints and jumps; all jumps were non-negative and the outputs agreed on 500 random inputs plus all breakpoints.*

**Common mistakes.**

- Inserting middle layers with arbitrary or negative weights in part (b): a negative weight violates the constraint and $\sigma(-v)$ kills the bits; only $W=I_B$ with a bias in $(-1,0]$ copies them.
- Arguing in part (c) that each layer may add up to $B$ new breakpoints, which gives a bound growing with $L$; later layers see $x$ only through the first layer and add none.
- Answering part (d) with a bare "no", or with a parameter count; the full-credit answer proves $\mathcal{H}_B^L=\mathcal{H}_B^1$ at the same width.

**💡 Useful tricks:** Constrained weights + sign activation cue a depth-collapse result: non-negative weights make pre-activations monotone in $x$, so each neuron adds $\leq 1$ breakpoint; identity pass-through layers ($\sigma(v)=v$ on $\{0,1\}^B$) give inclusions (Lecture 1 Def 2, Lecture 2).

**⚠️ Watch out:** (a) write $\bar B \in O(B)$, not $\mathrm{poly}(B)$; (b) verify inserted layers satisfy $W_i \geq 0$; (c) explicitly argue later layers add no breakpoints; (d) prove equality $\mathcal{H}_B^L = \mathcal{H}_B^1$ — a bare "No" scores little.

## Q2 (42 pts) — Gradient flow on a depth-$N$ scalar linear network: balancedness and exponential convergence
**Topics:** gradient-flow, linear-nn, balancedness, conservation-laws, matrix-factorization | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_04_optimization_2, fodl_recitation_gradient_flow, fodl_recitation_optimization_1
**Statement (English translation):**
Let $y > 0$. Define the loss function:

$$L : \mathbb{R} \to \mathbb{R}, \quad L(w) = \frac{1}{2}(w - y)^2$$

Denote by $\phi(\cdot)$ the objective obtained when we overparameterize $w$ with a linear network of depth $N \geq 2$ and width 1 in all hidden layers:

$$\phi : \mathbb{R}^N \to \mathbb{R}, \quad \phi(w_1, \ldots, w_N) = L\big(\Pi_{i=1}^N w_i\big)$$

Suppose gradient flow is run over $\phi(\cdot)$ with initialization $w_1(0), \ldots, w_N(0) \in \mathbb{R}$, and denote by $w(t)$ the "end-to-end" scalar at time $t \geq 0$, i.e. $w(t) = \Pi_{i=1}^N w_i(t)$.

**(a) (12 pts)** Prove that $w_i(t)^2 - w_j(t)^2 = w_i(0)^2 - w_j(0)^2$ for all $i, j \in \{1, \ldots, N\}$ and $t \geq 0$. Do not use claims from class in the solution.

Now assume that $w_i(0)^2 = w_j(0)^2$ for all $i, j \in \{1, \ldots, N\}$.

**(b) (12 pts)** Prove that $\frac{d}{dt} w(t) = -N\big(w(t) - y\big)\, w(t)^{2 - \frac{2}{N}}$. Do not use claims from class in the solution.

Let $w(0) = c$ and assume $c \in (0, y)$.

**(c) (6 pts)** Prove that $w(t) \geq c$ for all $t \geq 0$. You may use the fact that, in general, under gradient flow the objective function is monotonically non-increasing (as a function of $t$).

**(d) (12 pts)** Prove that:

$$\forall t \geq 0: \quad L(w(t)) \leq L(w(0)) \exp\left(-2N c^{2-\frac{2}{N}} \cdot t\right)$$

i.e., the loss converges to 0 at an exponential rate. Do not use claims from class in the solution.

*Hint:* First show that $\frac{d}{dt} L(w(t)) = -L(w(t)) \cdot 2N w(t)^{2-\frac{2}{N}}$.

**Solution sketch:**

**1. Part (a): the conservation law for $w_i^2-w_j^2$**

**What is asked.** To prove that $w_i(t)^2-w_j(t)^2$ does not change in time, without citing results from class. The answer is a proof.

**Tool and why.** Gradient flow and the chain rule (cheat sheet §7 and §8): compute the time derivative of $w_i^2$ directly and see that it does not depend on $i$. A difference whose time derivative is zero is constant.

**Definitions.** Write $w=\prod_{k=1}^Nw_k$ for the end-to-end scalar and $L'(w)=w-y$ for the derivative of the loss. Gradient flow means $\dot w_i=-\frac{\partial\phi}{\partial w_i}$ for every $i$, where the dot is the derivative in $t$.

**Solution.**

Step 1, the partial derivative: $w$ is linear in $w_i$ with coefficient $\prod_{k\neq i}w_k$, the product of the other factors. By the chain rule for $\phi=L(w)$,

$$\frac{\partial\phi}{\partial w_i}=L'(w)\prod_{k\neq i}w_k$$

Step 2, the derivative of $w_i^2$: by the chain rule in $t$ and the gradient-flow equation,

$$\begin{aligned}
\frac{d}{dt}w_i^2&=2w_i\dot w_i\\
&=-2w_iL'(w)\prod_{k\neq i}w_k\\
&=-2L'(w)\,w
\end{aligned}$$

The last line holds because $w_i$ times the product of all other factors is the full product $w$.

Step 3, the difference: the right-hand side of step 2 is the same for every index, so for all $i,j$

$$\frac{d}{dt}\big(w_i^2-w_j^2\big)=-2L'(w)\,w+2L'(w)\,w=0$$

Step 4, conclusion: a differentiable function of $t$ with zero derivative on $[0,\infty)$ is constant, so for every $t\geq0$

$$w_i(t)^2-w_j(t)^2=w_i(0)^2-w_j(0)^2$$

**In words.** Gradient flow moves every layer's square at the same speed $-2L'(w)w$, so the squared magnitudes of the layers stay the same distance apart.

**Sanity check.** For $N=2$: $\dot w_1=-(w-y)w_2$ and $\dot w_2=-(w-y)w_1$, so

$$\frac{d}{dt}(w_1^2-w_2^2)=-2(w-y)w_1w_2+2(w-y)w_2w_1=0$$

**What to write in the exam.**

- Gradient: $\partial\phi/\partial w_i=(w-y)\prod_{k\neq i}w_k$.
- Then $\frac{d}{dt}w_i^2$ equals $2w_i\dot w_i$, which is $-2(w-y)w$, the same for every $i$.
- Hence the derivative of $w_i^2-w_j^2$ is $0$, and the difference keeps its initial value.

*Verified: sympy confirmed for $N=4$ that $2w_i\dot w_i$ is the same expression for all $i$; numerical gradient flow (60 runs, $N$ in $\{2,3,5\}$, random unbalanced initializations) kept every $w_i^2-w_j^2$ constant to $5\cdot10^{-11}$.*

**2. Part (b): the end-to-end dynamics**

**What is asked.** Under balanced initialization, to prove $\frac{d}{dt}w=-N(w-y)w^{2-2/N}$ without citing class results. The answer is a derivation.

**Tool and why.** The product rule for $w=\prod_kw_k$ together with the conservation law of part (a) (cheat sheet §8). Balancedness lets us write every $w_k^2$ through $w$ itself, so the sum of $N$ terms collapses to $N$ equal terms.

**Definitions.** Let $s(t)$ be the common value of the squares $w_i(t)^2$; step 1 shows that they stay equal, so $s$ is well defined. We introduce it to replace each $w_k^2$ by one quantity that depends on $w$ only.

**Solution.**

Step 1, balancedness persists: by part (a) and $w_i(0)^2=w_j(0)^2$, we get $w_i(t)^2=w_j(t)^2$ for all $t$ and all $i,j$.

Step 2, $s$ through $w$: multiplying the $N$ squares,

$$w^2=\prod_{k=1}^Nw_k^2=s^N$$

so $s=|w|^{2/N}$, the non-negative $N$-th root of $w^2$.

Step 3, the product rule:

$$\begin{aligned}
\dot w&=\sum_{i=1}^N\Big(\prod_{k\neq i}w_k\Big)\dot w_i\\
&=-L'(w)\sum_{i=1}^N\Big(\prod_{k\neq i}w_k\Big)^2\\
&=-L'(w)\sum_{i=1}^N\prod_{k\neq i}w_k^2\\
&=-L'(w)\sum_{i=1}^Ns^{N-1}\\
&=-N\,L'(w)\,|w|^{2-2/N}
\end{aligned}$$

The second line substitutes $\dot w_i=-L'(w)\prod_{k\neq i}w_k$ from part (a), step 1. The fourth line uses that each product has $N-1$ factors, each equal to $s$. The last line uses step 2: $s^{N-1}$ equals $|w|^{2-2/N}$ because $\frac2N(N-1)=2-\frac2N$.

Step 4, substitute $L'(w)=w-y$:

$$\dot w=-N\,(w-y)\,|w|^{2-2/N}$$

Step 5, the power in the statement: when $w(t)\geq0$ we have $|w|^{2-2/N}=w^{2-2/N}$, which is the stated formula. This is the regime of parts (c) and (d), where $w(t)$ stays at least $c$, a positive number. For $w<0$ the absolute value matters: with $N=2$, $y=1$, $w_1=0.5$ and $w_2=-0.5$ we get $w=-0.25$, the true $\dot w$ is $0.625$, while $w$ in place of $|w|$ would give $-0.625$.

**In words.** Depth turns the plain gradient flow $\dot w=-(w-y)$ into the same direction multiplied by a preconditioner $N|w|^{2-2/N}$: the farther $w$ is from $0$, the faster it moves.

**Sanity check.** For $N=2$, directly from the gradient-flow equations,

$$\dot w=\dot w_1w_2+w_1\dot w_2=-(w-y)(w_1^2+w_2^2)$$

and balancedness gives $w_1^2+w_2^2=2|w|$, so $\dot w=-2(w-y)|w|$, which is step 4 with $N=2$.

**What to write in the exam.**

- Balanced at $t=0$, so by part (a) all $w_i(t)^2$ are equal, namely to $|w|^{2/N}$.
- Product rule: $\dot w=\sum_i\big(\prod_{k\neq i}w_k\big)\dot w_i$, and $\dot w_i=-(w-y)\prod_{k\neq i}w_k$.
- So $\dot w=-(w-y)\sum_i\prod_{k\neq i}w_k^2$, and each product equals $|w|^{2-2/N}$.
- Result: $\dot w=-N(w-y)w^{2-2/N}$ whenever $w\geq0$.

*Verified: numerical gradient flow from balanced initializations (60 runs, $N$ in $\{2,3,5\}$, sign patterns with positive product included) matched $\dot w$ from finite differences against $-N(w-y)|w|^{2-2/N}$ to relative error $5\cdot10^{-7}$; the $N=2$, $w=-0.25$ example was computed directly.*

**3. Part (c): the barrier $w(t)\geq c$**

**What is asked.** With $w(0)=c$ and $c\in(0,y)$, to prove that $w(t)\geq c$ for every $t\geq0$. The answer is a proof.

**Tool and why.** Monotonicity of the objective under gradient flow, which the statement allows us to use (cheat sheet §7). The loss $\frac12(w-y)^2$ measures the distance from $w$ to $y$; if it cannot grow, $w$ stays among the points no farther from $y$ than $c$ is.

**Definitions.** No new notation. Note that $\phi(w_1(t),\dots,w_N(t))$ is $L(w(t))$ by the definition of $\phi$, so the given monotonicity applies to $L(w(t))$.

**Solution.**

Step 1, the loss does not increase: by the given fact, for every $t\geq0$,

$$L(w(t))\le L(w(0))=L(c)$$

Step 2, unpack: multiply by $2$ and take square roots,

$$|w(t)-y|\le|c-y|=y-c$$

where the last equality holds because $c<y$.

Step 3, the lower end: $|w(t)-y|\le y-c$ means that $w(t)\in[c,2y-c]$. In particular

$$w(t)\geq y-(y-c)=c$$

**In words.** Gradient flow can only move $w$ to points where the loss is no larger, that is, no farther from $y$. All such points lie between $c$ and its mirror image $2y-c$, so $w$ never drops below its starting value.

**Sanity check.** For $N=2$, $y=1$ and $c=\frac12$, the solution is $w(t)=\frac{1}{1+e^{-2t}}$: it solves $\dot w=-2(w-1)w$ with $w(0)=\frac12$. It increases from $\frac12$ toward $1$ and never drops below $c$.

**What to write in the exam.**

- Gradient flow does not increase the loss: $L(w(t))\le L(c)$.
- Then $|w(t)-y|\le y-c$, because $c<y$.
- Hence $w(t)\geq c$, and also $w(t)\le 2y-c$.

*Verified: in the 60 balanced gradient-flow runs of part (b), $w(t)-c$ never went below $-10^{-15}$ (rounding); sympy confirmed the logistic solution of the sanity check.*

**4. Part (d): exponential convergence**

**What is asked.** To prove that $L(w(t))\le L(w(0))\,e^{-2Nc^{2-2/N}t}$ for every $t\geq0$, without class results. The answer is a proof.

**Tool and why.** A linear differential inequality for the loss, closed by Grönwall's argument (cheat sheet §9, PL-type rates). The hint gives a time derivative proportional to the loss, and part (c) bounds the proportionality coefficient from below by a constant.

**Definitions.** Let $\lambda=2Nc^{2-2/N}$ be the target rate and $\ell(t)=L(w(t))$ the loss along the trajectory. Let $F(t)=\ell(t)e^{\lambda t}$; we introduce it because the inequality to prove says exactly that $F(t)\le F(0)$.

**Solution.**

Step 1, the hint: the chain rule, then part (b), which applies because $w(t)$ is positive by part (c):

$$\begin{aligned}
\dot\ell&=L'(w)\,\dot w\\
&=(w-y)\cdot\big(-N(w-y)w^{2-2/N}\big)\\
&=-N(w-y)^2w^{2-2/N}\\
&=-2N\,w^{2-2/N}\,\ell
\end{aligned}$$

The last line uses $(w-y)^2=2\ell$.

Step 2, a constant rate: by part (c), $w(t)\geq c$, and $c$ is positive. The power $2-\frac2N$ is positive since $N\geq2$, so $u\mapsto u^{2-2/N}$ is increasing on $[0,\infty)$ and $w(t)^{2-2/N}\geq c^{2-2/N}$. Since $\ell\geq0$, step 1 gives

$$\dot\ell\le-2Nc^{2-2/N}\,\ell=-\lambda\,\ell$$

Step 3, Grönwall: differentiate $F$ and use step 2,

$$\dot F=(\dot\ell+\lambda\ell)e^{\lambda t}\le0$$

So $F$ is non-increasing and $F(t)\le F(0)$, that is,

$$L(w(t))\le L(w(0))\,e^{-\lambda t}=L(w(0))\exp\big(-2Nc^{2-2/N}t\big)$$

This route avoids taking $\ln\ell$, which would need $\ell>0$.

**In words.** The depth preconditioner $N|w|^{2-2/N}$ stays at least $Nc^{2-2/N}$ along the whole trajectory, because $w$ never falls below $c$. So the loss shrinks at least at a fixed exponential rate, as for gradient descent on a strongly convex function.

**Sanity check.** For $N=2$, $y=1$ and $c=\frac12$: $\lambda=2$ and $L(w(0))=\frac18$. At $t=1$ the exact loss from the logistic solution of part (c) is about $0.0071$, and the bound $\frac18e^{-2}$ is about $0.0169$, so the bound holds. It is not tight: as $w$ approaches $y$ the true rate approaches $2Ny^{2-2/N}$, here $4$.

**What to write in the exam.**

- Hint: $\frac{d}{dt}L(w)=(w-y)\dot w$, which equals $-2Nw^{2-2/N}L(w)$ by part (b).
- Part (c): $w(t)\geq c$ and the power is positive, so $\frac{d}{dt}L\le-2Nc^{2-2/N}L$.
- Grönwall: $L(w(t))e^{2Nc^{2-2/N}t}$ has a non-positive derivative, hence stays at most $L(w(0))$.

*Verified: in the 60 balanced runs the ratio of $L(w(t))$ to the bound never exceeded $1+10^{-14}$; sympy and the closed form gave $0.0071$ and $0.0169$ for the sanity check.*

**Common mistakes.**

- Citing the balancedness theorem from class in part (a) or (b): the statement forbids it; the short derivative computation is what earns the points.
- Writing $w_i^2=w^{2/N}$ without the absolute value, or dividing by $w_i$, which may be $0$; use $\prod_{k\neq i}w_k^2=s^{N-1}$ instead.
- Skipping part (c) in part (d): without $w(t)\geq c$ the coefficient $w^{2-2/N}$ could approach $0$ and no fixed rate follows.

**💡 Useful tricks:** "Do not use claims from class" ⇒ derive balancedness directly: $\frac{d}{dt}w_i^2=-2L'(w)w$ is identical for all $i$; balanced init ⇒ $w_i^2=|w|^{2/N}$; loss-monotonicity gives the barrier $w(t)\geq c$, which lower-bounds $w^{2-2/N}\geq c^{2-2/N}$; finish with $\frac{d}{dt}\ln L\leq-2Nc^{2-2/N}$ + Grönwall. (Identical to Moed C 2024 Q2.)

**⚠️ Watch out:** prove the conservation law — you may not cite it; the part-(c) barrier is essential to the exponential rate; keep $w(t)\geq c$, with $c>0$, so the power is well-defined; the factor is $2N$ (from $\frac{d}{dt}L=-2L\cdot Nw^{2-2/N}$), not $N$.

## Q3 (22 pts) — Norm-adaptive Rademacher generalization bound via union over radii
**Topics:** rademacher, uniform-convergence, norm-bounds, probability-tools, implicit-regularization | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2, fodl_recitation_optimization_2_radamacher
**Statement (English translation):**
Let $\mathcal{H} = \{h_\theta : \theta \in \mathbb{R}^p\}$ be the hypothesis class of a neural network with some architecture, where $\theta$ represents the concatenation of the network's parameter values as a vector. Denote the network's input space by $X$ and its output space by $Y$. Let $D$ be an (unknown) distribution over $X \times Y$, let $S = \{(x_i, y_i)\}_{i=1}^m$ be a training sample of $m$ examples drawn i.i.d. from $D$, and let $l : Y \times Y \to [0,1]$ be a loss function. For $h_\theta \in \mathcal{H}$, denote by $L_D(h_\theta)$ the generalization error (i.e. $L_D(h_\theta) := \mathbb{E}_{(x,y)\sim D}[l(h_\theta(x), y)]$) and by $L_S(h_\theta)$ the sample error (i.e. $L_S(h_\theta) := \frac{1}{m}\sum_{i=1}^m l(h_\theta(x_i), y_i)$).

**(a) (12 pts)** For every $r \in \mathbb{R}$ define $\mathcal{H}_r = \{h_\theta \in \mathcal{H} : \|\theta\| \leq r,\ \theta \in \mathbb{R}^p\} \subset \mathcal{H}$ (the notation $\|\cdot\|$ stands for the Euclidean norm). It is given that for every $r \in \mathbb{R}$: $R(l \circ \mathcal{H}_r \circ S) \leq \frac{r}{\sqrt{m}}$, where $R(l \circ \mathcal{H}_r \circ S)$ is the Rademacher complexity of the set:

$$l \circ \mathcal{H}_r \circ S := \{(l(h_\theta(x_1), y_1), \ldots, l(h_\theta(x_m), y_m)) : h_\theta \in \mathcal{H}_r\}$$

Prove that for every $\delta \in (0,1)$, with probability greater than or equal to $1 - \delta$:

$$\forall h_\theta \in \mathcal{H}: \quad L_D(h_\theta) - L_S(h_\theta) \leq \frac{2(\|\theta\| + 1)}{\sqrt{m}} + 4\sqrt{\frac{2 \cdot \ln\left(\frac{2\pi^2(\|\theta\|+1)^2}{3\delta}\right)}{m}}$$

During the solution you may use the reminder below and the fact $\sum_{k=1}^\infty \frac{1}{k^2} = \frac{\pi^2}{6}$; beyond that, do not use claims from class.

*Reminder (Rademacher-complexity-based generalization bound):* for a hypothesis class $\mathcal{H}$, for every $\delta \in (0,1)$, with probability greater than or equal to $1-\delta$:

$$\forall h \in \mathcal{H}: \quad L_D(h) - L_S(h) \leq 2R(l \circ \mathcal{H} \circ S) + 4\sqrt{\frac{2 \cdot \ln(4/\delta)}{m}}$$

**(b) (10 pts)** Denote by $GD(S) \in \mathcal{H}$ the hypothesis obtained from running gradient descent to minimize the sample error $L_S(\cdot)$. For the learned hypothesis, when the number of examples in the sample is increased, does the bound proven in the previous sub-part necessarily become smaller? That is, for a sample $S'$ with $|S'| > |S| = m$, will the bound for $GD(S')$ necessarily be smaller than the one obtained for $GD(S)$? Justify your answer.

**Solution sketch:**

**1. Part (a): a bound that adapts to $\|\theta\|$**

**What is asked.** To prove that with probability at least $1-\delta$, simultaneously for all $h_\theta\in\mathcal{H}$, the gap $L_D(h_\theta)-L_S(h_\theta)$ is at most the stated expression in $\|\theta\|$. The answer is a proof that uses only the reminder and the Basel sum.

**Tool and why.** Structural risk minimization: a union bound over a countable family of classes with confidence budgets that sum to $\delta$ (cheat sheet §2 and §11). The reminder works for one class fixed in advance, while the target depends on the norm of the hypothesis, which is not known in advance. Splitting the parameters into balls $\mathcal{H}_k$ of integer radius and paying a little confidence on each one solves this.

**Definitions.** For each integer $k\geq1$ let

$$\delta_k=\frac{6\delta}{\pi^2k^2}$$

be the confidence budget of the ball $\mathcal{H}_k$, and let $E_k$ be the event that the reminder's inequality holds for the class $\mathcal{H}_k$ with confidence $\delta_k$. For a real $r\geq1$ let

$$G(r)=\frac{2r}{\sqrt m}+4\sqrt{\frac{2\ln\big(\frac{2\pi^2r^2}{3\delta}\big)}{m}}$$

so that the target bound is $G(\|\theta\|+1)$. We name $G$ so that the last step becomes "$G$ is increasing".

**Solution.**

Step 1, the budgets are legal: each $\delta_k$ is positive and at most $\delta_1$, which is $\frac{6}{\pi^2}\delta\approx0.61\delta$, so $\delta_k\in(0,1)$ and the reminder applies. By the Basel sum,

$$\sum_{k=1}^{\infty}\delta_k=\frac{6\delta}{\pi^2}\sum_{k=1}^{\infty}\frac1{k^2}=\frac{6\delta}{\pi^2}\cdot\frac{\pi^2}{6}=\delta$$

Step 2, one ball: the class $\mathcal{H}_k$ is fixed before the sample is drawn, so the reminder with $\delta_k$ gives $\Pr(E_k)\geq1-\delta_k$. On $E_k$,

$$\forall h\in\mathcal{H}_k:\ L_D(h)-L_S(h)\le2R(l\circ\mathcal{H}_k\circ S)+4\sqrt{\frac{2\ln(4/\delta_k)}{m}}$$

Step 3, all balls at once, by the union bound and step 1:

$$\Pr\Big(\bigcap_{k\geq1}E_k\Big)\geq1-\sum_{k=1}^{\infty}\Pr(E_k^c)\geq1-\sum_{k=1}^{\infty}\delta_k=1-\delta$$

From here on we work on the event $\bigcap_kE_k$.

Step 4, plug in the given complexity and the budget: by assumption $R(l\circ\mathcal{H}_k\circ S)\le k/\sqrt m$, and

$$\frac{4}{\delta_k}=\frac{4\pi^2k^2}{6\delta}=\frac{2\pi^2k^2}{3\delta}$$

So on $E_k$, for every $h_\theta\in\mathcal{H}_k$, the gap is at most $G(k)$.

Step 5, choosing the ball for a given $h_\theta$: let $k=\max\{1,\lceil\|\theta\|\rceil\}$. Then $\|\theta\|\le k$, so $h_\theta\in\mathcal{H}_k$. Also $k\le\|\theta\|+1$: if $\|\theta\|=0$ then $k=1$, which equals $\|\theta\|+1$; otherwise $k=\lceil\|\theta\|\rceil$, and a ceiling is less than its argument plus $1$.

Step 6, monotonicity: for $r\geq1$ the argument of the logarithm is at least $\frac{2\pi^2}{3\delta}$, which is larger than $1$, so the square root is defined, and both terms of $G(r)$ increase with $r$. Since $k$ and $\|\theta\|+1$ are both at least $1$, step 5 gives

$$L_D(h_\theta)-L_S(h_\theta)\le G(k)\le G(\|\theta\|+1)$$

This holds for every $h_\theta\in\mathcal{H}$ on an event of probability at least $1-\delta$, which is the claim.

**In words.** We cannot apply the reminder to the ball of radius $\|\theta\|$ directly, because that radius depends on the sample through the learned $\theta$. Instead we prepare one bound for every integer radius in advance and pay for all of them with a summable sequence of confidences; the price is the $k^2$ inside the logarithm, a small cost for not knowing the radius.

**Sanity check.** For $\delta=0.05$ the first ball gets $\delta_1\approx0.030$. For $\|\theta\|=1$ and $m=100$ the log argument is about $526.4$ and the bound is $0.4+1.416\approx1.816$. A larger norm costs linearly in the first term and only logarithmically in the second.

**What to write in the exam.**

- Budgets $\delta_k=\frac{6\delta}{\pi^2k^2}$ for $k\geq1$; they sum to $\delta$ by the Basel sum.
- Reminder on each fixed $\mathcal{H}_k$ with $\delta_k$, then a union bound: all hold together with probability at least $1-\delta$.
- Plug in $R\le k/\sqrt m$ and $4/\delta_k=\frac{2\pi^2k^2}{3\delta}$.
- For $h_\theta$ take $k=\max\{1,\lceil\|\theta\|\rceil\}$: then $h_\theta\in\mathcal{H}_k$ and $k\le\|\theta\|+1$, and the bound increases in $k$.

*Verified: sympy confirmed $\sum_k\delta_k=\delta$ and $4/\delta_k=\frac{2\pi^2k^2}{3\delta}$; for 100,004 norms (random plus 0, 1, 2, 2.5) the choice of $k$ satisfied both inequalities; $G$ was increasing on a grid of 1,001 radii in $[1,51]$; the sanity numbers were computed directly.*

**2. Part (b): does more data always shrink the bound?**

**What is asked.** Whether, for a larger sample $S'$, the bound of part (a) evaluated at $GD(S')$ must be smaller than the one at $GD(S)$. The answer is yes or no, with a justification.

**Tool and why.** Read the bound as a function of two quantities, the sample size and the learned norm (cheat sheet §11 and §12): it decreases in the sample size but increases in the norm, and the norm that gradient descent reaches depends on the sample.

**Definitions.** Let $\theta$ and $\theta'$ be the parameters of $GD(S)$ and $GD(S')$, and $m'=|S'|$. Let $G_m(r)$ be the function $G$ of part (a) with the sample size written explicitly; the two bounds being compared are $G_m(\|\theta\|+1)$ and $G_{m'}(\|\theta'\|+1)$.

**Solution.**

Verdict: not necessarily.

Step 1, two opposite effects: for a fixed norm, $G_m$ decreases in $m$, since both terms are divided by $\sqrt m$. For a fixed $m$, $G_m(r)$ increases in $r$ (part (a), step 6).

Step 2, the norm is not under our control: $\theta'$ is whatever gradient descent returns on $S'$, and nothing forces $\|\theta'\|\le\|\theta\|$. Fitting more examples typically needs a larger norm. For example, on an under-determined least-squares problem, gradient descent from $0$ converges to the minimum-norm interpolator (cheat sheet §12). Adding examples adds constraints, so this minimum norm can only grow, and with noisy labels it grows quickly as $m$ approaches the number of parameters.

Step 3, a numeric instance: with $\delta=0.05$, $m=100$ and $\|\theta\|=1$, the bound is $G_{100}(2)\approx1.816$. With four times more data, $m'=400$, and $\|\theta'\|=9$,

$$G_{400}(10)=1.000+0.871\approx1.871$$

which is larger. More data together with a larger learned norm gave a worse bound.

Step 4, conclusion: the bound is a posteriori, since it depends on $m$ and on the hypothesis the algorithm returns, so it is not monotone in $m$ alone, and the answer is no.

**In words.** A norm-based bound rewards a small learned norm, not a large sample as such. More data helps only if the algorithm does not have to grow the norm much in order to fit it.

**Sanity check.** A simulation of the minimum-norm example: $p=200$ parameters, inputs with i.i.d. $N(0,\frac1p)$ entries, random labels $\pm1$, median norm over 50 draws. At $m=100$ the median norm is $14.19$ and the bound at it is $4.85$; at $m=150$ the norm is $24.17$ and the bound $5.66$. The bound grew although the sample grew. Both values exceed $1$, so the bound is vacuous here, but the question is only about its monotonicity.

**What to write in the exam.**

- Not necessarily.
- The bound decreases in $m$ but increases in $\|\theta\|$, and $\|\theta\|$ is the norm that gradient descent reaches on the given sample.
- More data can force a larger norm (the minimum-norm interpolator grows as constraints are added), and the norm term can outweigh the $1/\sqrt m$ gain.
- Example: $m=100$ with norm $1$ gives about $1.82$; $m=400$ with norm $9$ gives about $1.87$.

*Verified: the bound values were computed in Python; 200 random nested least-squares problems confirmed that adding rows never decreased the minimum norm; the simulation numbers are medians over 50 draws with a fixed seed.*

**Common mistakes.**

- Splitting $\delta$ evenly over the balls: with infinitely many balls each would get $0$; the budgets must be summable, as $\frac{6\delta}{\pi^2k^2}$ is.
- Applying the reminder directly to the ball of radius $\|\theta\|$, which depends on the sample, or forgetting the case $\|\theta\|=0$, where $\lceil\|\theta\|\rceil$ is not a valid index and $k=1$ must be taken.
- Answering part (b) with "yes, the bound decreases like $1/\sqrt m$" while ignoring that the learned norm changes with the sample.

**💡 Useful tricks:** "Make the bound depend on the learned norm $\|\theta\|$" ⇒ union over radius shells $\mathcal H_k$ ($k\in\mathbb N$) with Basel weights $\delta_k=\frac{6\delta}{\pi^2k^2}$ (sum to $\delta$); then pick $k=\lceil\|\theta\|\rceil$ so $h_\theta\in\mathcal H_k$ and $k\leq\|\theta\|+1$; substitute $4/\delta_k$ into the log to hit the target expression.

**⚠️ Watch out:** the shell index runs over infinite $\mathbb N$, so weights must be *summable* (uniform split is impossible); handle the $\lceil\|\theta\|\rceil=0$ edge case (take $k=1$); (b) the answer is "NOT necessarily" — more data can push $\|\theta(GD(S'))\|$ up, and the bound isn't monotone in $m$ alone (this a-posteriori nature is the point).
