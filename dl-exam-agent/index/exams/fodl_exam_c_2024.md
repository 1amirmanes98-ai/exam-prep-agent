# FODL Exam — Moed C 2024
**Date / semester:** 09.10.2024 — Semester B 2023/24 (תשפ"ד), Moed C; School of CS, Tel Aviv University; lecturer: Dr. Nadav Cohen, TA: Yonatan Ariel Slutzky; 3 hours; 3 questions, max possible score 105
**Total points:** 105

## Q1 (40 pts) — Width-$B$ sign networks = piecewise-constant functions with $\leq B+1$ pieces; universal approximation of continuous functions
**Topics:** universality, hypothesis-class, sign-activation, piecewise-constant | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_B$ be the hypothesis class of neural networks with a single hidden layer of width $B$, one-dimensional input and output (i.e. $\mathcal{X} = \mathcal{Y} = \mathbb{R}$, where $\mathcal{X}$ is the input space and $\mathcal{Y}$ the output space), and sign activation on the hidden-layer neurons; namely:

$$\mathcal{H}_B = \left\{ x \mapsto b' + \sum_{i=1}^{B} v_i\, \sigma(w_i x + b_i)\ :\ w_1, \ldots, w_B,\, b_1, \ldots, b_B,\, v_1, \ldots, v_B,\, b' \in \mathbb{R} \right\}$$

where $\sigma(z)$ equals one if $z \geq 0$ and zero otherwise. For simplicity, assume that $w_1, \ldots, w_B \geq 0$.

We say that $g: \mathbb{R} \to \mathbb{R}$ is *piecewise constant* if there exist scalars $\alpha_1, \ldots, \alpha_N$ and $c_0 := -\infty < c_1 < \cdots < c_{N-1} < c_N := \infty$ such that $g(x) = \alpha_j$ on every interval $[c_{j-1}, c_j)$ (of course, for $j = 1$ the interval is open on its left side as well). The minimal $N$ for which such scalars exist is called the *number of constant pieces* of $g$.

**(1) (11 pts)** For $B \in \mathbb{N}$, prove that every function in $\mathcal{H}_B$ is piecewise constant with at most $B + 1$ constant pieces.

**(2) (11 pts)** For $B \in \mathbb{N}$, prove that every piecewise-constant function with at most $B + 1$ constant pieces is contained in $\mathcal{H}_B$.

Now, we define the following distance measure between functions from $\mathbb{R}$ to $\mathbb{R}$:

$$d(f_1, f_2) = \sup_{x \in [0,1]} |f_1(x) - f_2(x)|$$

and denote by $F$ the class of continuous functions from $\mathbb{R}$ to $\mathbb{R}$.

**(3) (6 pts)** Define formally the following expression: "$\mathcal{H}_B$ is universal in the sense of $d(\cdot,\cdot)$ with respect to the class $F$."

**(4) (12 pts)** Prove that $\mathcal{H}_B$ is universal in the sense of $d(\cdot,\cdot)$ with respect to the class $F$.
*Hint:* if $f: [0,1] \to \mathbb{R}$ is continuous then it is uniformly continuous; that is, for every $\epsilon > 0$ there exists $\delta > 0$ such that if $x_1, x_2 \in [0,1]$ satisfy $|x_1 - x_2| < \delta$ then necessarily $|f(x_1) - f(x_2)| < \epsilon$.

**Solution sketch:**

(Cross-reference: Moed B 2021 Q1 used these same piecewise-constant facts as given lemmas — here they are proven.)

**1. Every network in $\mathcal{H}_B$ has at most $B+1$ constant pieces**

**What is asked.** A proof that every $h\in\mathcal{H}_B$ can be written in the piecewise-constant form of the statement with at most $B+1$ intervals.

**Tool and why.** Describe each hidden unit separately as a function of $x$, then collect the points where some unit can switch (cheat sheet §5, sign-activation nets are piecewise constant). The assumption $w_i\ge0$ makes every unit a single upward step, so each unit adds at most one switching point.

**Definitions.** Fix $h\in\mathcal{H}_B$ with parameters as in the statement. Let $I_+$ be the set of indices $i$ with $w_i>0$. For $i\in I_+$ let $t_i=-b_i/w_i$, the point where unit $i$ switches on. Let $c_1,\dots,c_m$ be the distinct values among the $t_i$, sorted in increasing order, and set $c_0=-\infty$ and $c_{m+1}=\infty$. These are the only places where $h$ can jump, which is why we name them.

**Solution.**

Step 1, units with $w_i=0$: then $\sigma(w_ix+b_i)=\sigma(b_i)$ for every $x$. Such a unit only adds the constant $v_i\sigma(b_i)$ to $h$.

Step 2, units with $w_i>0$: dividing by $w_i>0$ does not flip an inequality, so

$$w_ix+b_i\ge0\iff x\ge t_i.$$

Hence, by the definition of $\sigma$,

$$\sigma(w_ix+b_i)=\mathbb{1}[x\ge t_i].$$

The unit is $0$ to the left of $t_i$ and $1$ from $t_i$ on, including $t_i$ itself, because $\sigma(0)=1$. It is a left-closed step, the same kind of interval the statement uses.

Step 3, counting switching points: there are at most $B$ indices in $I_+$, and equal thresholds are merged, so $m\le B$.

Step 4, $h$ is constant on each interval: fix $j$ from $1$ to $m+1$ and take $x\in[c_{j-1},c_j)$. Every threshold $t_i$ equals some $c_k$. If $k\le j-1$ then $x\ge t_i$ and the unit equals $1$. If $k\ge j$ then $x<t_i$ and the unit equals $0$. So no unit changes inside the interval, and for every such $x$

$$h(x)=b'+\sum_{i\notin I_+}v_i\sigma(b_i)+\sum_{i\in I_+:\,t_i\le c_{j-1}}v_i,$$

a number that does not depend on $x$. Call it $\alpha_j$.

Step 5, conclusion: $h$ has the form of the definition with breakpoints $c_1,\dots,c_m$ and values $\alpha_1,\dots,\alpha_{m+1}$. The number of constant pieces is the minimal such count, so it is at most $m+1$. Writing $P(h)$ for the number of constant pieces of $h$:

$$\boxed{P(h)\le m+1\le B+1}$$

If $m=0$ the function is constant, one piece, which is still at most $B+1$.

**In words.** As $x$ grows, a unit with positive weight can switch on once and never switches off. $B$ units give at most $B$ switching points, and $B$ points cut the line into at most $B+1$ intervals.

**Sanity check.** Take $B=1$, $w_1=1$, $b_1=0$, $v_1=1$ and $b'=0$. Then $h$ is the step $\mathbb{1}[x\ge0]$, with the two pieces $(-\infty,0)$ and $[0,\infty)$: exactly $B+1$. With $w_1=0$ instead, $h$ is constant: one piece.

**What to write in the exam.**

- Units with $w_i=0$ are constant in $x$.
- Units with $w_i>0$ equal $\mathbb{1}[x\ge t_i]$ with $t_i=-b_i/w_i$, a left-closed step.
- Sorting the at most $B$ distinct thresholds gives $c_1,\dots,c_m$; on each $[c_{j-1},c_j)$ every unit is fixed, so $h$ is constant there.
- Hence $h$ has at most $m+1\le B+1$ constant pieces.

*Verified: 3000 random networks in NumPy (width up to 7, about 20% zero weights), evaluated at every threshold and between thresholds; the number of constant pieces never exceeded $B+1$.*

**2. Every piecewise-constant function with at most $B+1$ pieces is in $\mathcal{H}_B$**

**What is asked.** A proof by construction: given such a $g$, explicit parameters of a width-$B$ network that equals $g$ everywhere.

**Tool and why.** The telescoping construction (cheat sheet §5): write $g$ as its leftmost value plus one step per breakpoint, each step carrying the jump at that breakpoint. A sign unit with $w=1$ is exactly a left-closed step, so the intervals match the definition including their endpoints.

**Definitions.** Let $g$ have values $\alpha_1,\dots,\alpha_N$ and breakpoints $c_1,\dots,c_{N-1}$ in increasing order, with $N\le B+1$. For $k$ from $1$ to $N-1$ let $J_k=\alpha_{k+1}-\alpha_k$, the jump of $g$ at $c_k$. Each unit of the network will be responsible for exactly one jump.

**Solution.**

Step 1, the candidate network:

$$h(x)=\alpha_1+\sum_{k=1}^{N-1}J_k\,\sigma(x-c_k).$$

Step 2, it belongs to $\mathcal{H}_B$: take $b'=\alpha_1$ and, for $k$ from $1$ to $N-1$, take $w_k=1$, $b_k=-c_k$ and $v_k=J_k$. This uses $N-1$ units, and $N-1\le B$. For the remaining units, if any, take $w_k=0$, $b_k=0$ and $v_k=0$, so they contribute $0$. All weights satisfy $w_k\ge0$, as the statement assumes.

Step 3, which steps are on: by the definition of $\sigma$, unit $k$ is on exactly when $x\ge c_k$. Take $x\in[c_{j-1},c_j)$. Because the breakpoints increase, $x\ge c_k$ for every $k\le j-1$. Also $x<c_j$, and $c_j\le c_k$ for every $k\ge j$, so units $j,\dots,N-1$ are off. Exactly units $1,\dots,j-1$ are on.

Step 4, the sum telescopes:

$$\begin{aligned}
h(x)&=\alpha_1+\sum_{k=1}^{j-1}(\alpha_{k+1}-\alpha_k)\\
&=\alpha_1+(\alpha_j-\alpha_1)\\
&=\alpha_j.
\end{aligned}$$

For $j=1$ the sum is empty and $h=\alpha_1$ on $(-\infty,c_1)$. So $h$ equals $g$ on every interval, that is, everywhere, and therefore $g\in\mathcal{H}_B$.

**In words.** Start at the leftmost level and, every time you cross a breakpoint, add exactly the jump needed to land on the next level.

**Sanity check.** Let $g$ equal $2$ on $(-\infty,0)$, $-1$ on $[0,3)$ and $5$ on $[3,\infty)$, so $N=3$ and we need $B\ge2$. The construction gives

$$h(x)=2-3\,\sigma(x)+6\,\sigma(x-3).$$

At the breakpoints themselves $h(0)=-1$ and $h(3)=5$, the values of the pieces that start there, as left-closed intervals require; and $h(-1)=2$.

**What to write in the exam.**

- Set $b'=\alpha_1$, and for each breakpoint $w_k=1$, $b_k=-c_k$, $v_k=\alpha_{k+1}-\alpha_k$; unused units get $v_k=0$.
- On $[c_{j-1},c_j)$ exactly the first $j-1$ units are on, since unit $k$ is on exactly when $x\ge c_k$.
- The sum telescopes to $\alpha_j$, so the network equals $g$; it uses $N-1\le B$ units.

*Verified: 3000 random step functions with up to 8 pieces, compared at random points and $10^{-9}$ to either side of every breakpoint; the construction matched exactly. The example values were computed directly.*

**3. Formal definition of universality**

**What is asked.** A definition, with the quantifiers in the right order.

**Tool and why.** Definition 1 of lecture 2 (cheat sheet §4). The order of the quantifiers is the whole content: the width $B$ is chosen after $f$ and $\epsilon$.

**Definitions.** No new notation; $\mathcal{H}_B$, $d$ and $F$ are from the statement.

**Solution.**

Step 1, the definition: $\mathcal{H}_B$ is universal in the sense of $d(\cdot,\cdot)$ with respect to $F$ if

$$\forall f\in F,\ \forall\epsilon>0,\ \exists B\in\mathbb{N},\ \exists h\in\mathcal{H}_B:\ d(f,h)\le\epsilon.$$

Step 2, strict or weak inequality: the class writes $d(f,h)<\epsilon$. The two versions are equivalent: if the weak version holds for every $\epsilon$, apply it with $\epsilon/2$ to get a distance at most $\epsilon/2$, which is below $\epsilon$; the other direction is immediate.

Step 3, what $d$ measures: only the values on $[0,1]$ enter $d$, so $h$ may do anything outside that interval.

**In words.** Whatever continuous target and tolerance you choose, some width is enough to get within that tolerance on $[0,1]$.

**Sanity check.** The swapped order, one fixed $B$ for all $f$ and $\epsilon$, is false. By part 1 a fixed $B$ gives at most $B+1$ pieces, so some piece covers a sub-interval of $[0,1]$ of length at least $\tfrac{1}{B+1}$. On it the function $f(x)=x$ varies by that length, so no constant is within less than half of it:

$$d(f,h)\ge\frac{1}{2(B+1)}.$$

So for $\epsilon$ below this value no $h$ of that width works.

**What to write in the exam.**

- For every $f\in F$ and every $\epsilon>0$ there exist $B\in\mathbb{N}$ and $h\in\mathcal{H}_B$ with $d(f,h)\le\epsilon$.
- Note that $B$ may depend on $f$ and on $\epsilon$.

*Verified: for $f(x)=x$ and widths 1 to 5, 20000 random partitions in NumPy never beat the equal partition, whose error is exactly $\tfrac{1}{2(B+1)}$.*

**4. Proof of universality**

**What is asked.** A proof that for every continuous $f$ and every $\epsilon>0$ there are a width $B$ and a network $h\in\mathcal{H}_B$ with $d(f,h)\le\epsilon$.

**Tool and why.** Uniform continuity, as in the hint, followed by part 2 (cheat sheet §5, density of step functions). Uniform continuity gives a single $\delta$ that works everywhere on $[0,1]$, so one uniform grid of cell width below $\delta$ suffices; part 2 then turns the resulting step function into a network.

**Definitions.** Fix $f\in F$ and $\epsilon>0$, and let $\delta$ be the number the hint gives for $f$ on $[0,1]$. Let $m=\lfloor1/\delta\rfloor+1$, the number of grid cells. We take this $m$ because $m>1/\delta$, so the cell width $1/m$ is strictly below $\delta$. Let $g$ be the step function with breakpoints $c_k=k/m$ for $k$ from $1$ to $m-1$ and values $\alpha_k=f(\tfrac{k-1}{m})$ for $k$ from $1$ to $m$: each cell takes the value of $f$ at its left end.

**Solution.**

Step 1, choosing $\delta$: $f$ is continuous on the closed interval $[0,1]$, so by the hint it is uniformly continuous there. There is $\delta>0$ such that $|x_1-x_2|<\delta$ implies $|f(x_1)-f(x_2)|<\epsilon$ for all $x_1,x_2\in[0,1]$.

Step 2, the grid: since $m>1/\delta$, the cell width satisfies $1/m<\delta$.

Step 3, the error at one point: take $x\in[0,1]$ and let $k$ be the index of the piece of $g$ that contains $x$. Its sample point $s_k=\tfrac{k-1}{m}$ lies in $[0,1]$, and $x$ lies between $s_k$ and $s_k+\tfrac1m$. For the last piece this uses $x\le1$. Hence

$$0\le x-s_k\le\tfrac1m<\delta,$$

and by Step 1

$$|f(x)-g(x)|=|f(x)-f(s_k)|<\epsilon.$$

Step 4, the supremum: every value $|f(x)-g(x)|$ with $x\in[0,1]$ is below $\epsilon$, so their supremum is at most $\epsilon$, that is $d(f,g)\le\epsilon$.

Step 5, $g$ is a network: $g$ has $m$ constant pieces, and $m\le m+1$, so part 2 with $B=m$ gives $g\in\mathcal{H}_m$.

Step 6, conclusion: $B=m$ and $h=g$ satisfy the definition of part 3. Since $f$ and $\epsilon$ were arbitrary, $\mathcal{H}_B$ is universal in the sense of $d(\cdot,\cdot)$ with respect to $F$, with $B$ depending on $\epsilon$ as the definition allows.

**In words.** A continuous function on a closed interval cannot move by $\epsilon$ or more within a short enough sub-interval, so freezing it at one value per sub-interval costs less than $\epsilon$; and step functions are exactly what these sign networks compute.

**Sanity check.** Take $f(x)=x$ and $\epsilon=0.1$; then $\delta=0.1$ works. Our rule gives $m=11$ cells of width $\tfrac{1}{11}\approx0.091$, and the largest error is $\tfrac{1}{11}$, below $0.1$. With $\lceil1/\delta\rceil=10$ cells the width would be exactly $\delta$, and the hint, which needs a distance strictly below $\delta$, could not be applied to $x=1$ and its sample point $0.9$.

**What to write in the exam.**

- By uniform continuity on $[0,1]$ take $\delta$; let $m=\lfloor1/\delta\rfloor+1$, so $1/m<\delta$.
- Let $g$ take the value $f(\tfrac{k-1}{m})$ on the $k$-th cell, with breakpoints $k/m$.
- Each $x\in[0,1]$ is within $1/m<\delta$ of its sample point, so $|f(x)-g(x)|<\epsilon$ and $d(f,g)\le\epsilon$.
- The function $g$ has $m$ pieces, so $g\in\mathcal{H}_m$ by part 2; $B=m$ depends on $\epsilon$, which the definition allows.

*Verified: four test functions with three values of $\epsilon$ each, on a grid of 200001 points in NumPy; the error stayed below $\epsilon$ every time and $1/m<\delta$ held. The case $\delta=0.25$ confirms that $\lceil1/\delta\rceil$ cells have width exactly $\delta$.*

**Common mistakes.**

- Forgetting the units with $w_i=0$, or treating a step as open at its threshold. Since $\sigma(0)=1$ the step is left-closed, which is what matches the intervals $[c_{j-1},c_j)$.
- Writing the definition with $B$ fixed before $f$ and $\epsilon$. That statement is false, as the sanity check of part 3 shows.
- Using $\lceil1/\delta\rceil$ cells. When $1/\delta$ is an integer the cells have width exactly $\delta$, and the hint, which needs a strict inequality, no longer applies at the cell ends.

**💡 Useful tricks:** With $w_i\geq0$ each sign unit is a single left-closed step, so $\leq B$ thresholds ⇒ $\leq B+1$ pieces; to *realize* a target step function, telescope with jump weights $v_j=\alpha_{j+1}-\alpha_j$ and $b_j=-c_j$; universality of continuous functions runs through *uniform continuity* → partition $[0,1]$ into $<\delta$ pieces → step-approximate.

**⚠️ Watch out:** (1) handle the $w_i=0$ (constant unit) case, not just the step case; (2) give the *explicit* construction and verify the sum telescopes to $\alpha_j$ on each interval; (3) the formal definition needs "$\exists B$ (depending on $\epsilon$)"; (4) it's fine that $B$ grows with $1/\delta$ — the definition allows $B$ to depend on $\epsilon$.

## Q2 (35 pts) — Gradient flow on a depth-$N$ scalar linear network: balancedness and exponential convergence
**Topics:** gradient-flow, linear-nn, balancedness, conservation-laws, matrix-factorization | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_04_optimization_2, fodl_recitation_gradient_flow, fodl_recitation_optimization_1
**Statement (English translation):**
Let $y > 0$. Define the following loss function:

$$L: \mathbb{R} \to \mathbb{R}, \quad L(w) = \frac{1}{2}(w - y)^2$$

Denote by $\phi(\cdot)$ the objective function obtained when we over-parameterize $w$ with a linear network of depth $N \geq 2$ and width $1$ in all hidden layers:

$$\phi: \mathbb{R}^N \to \mathbb{R}, \quad \phi(w_1, \ldots, w_N) = L\big(\Pi_{i=1}^{N} w_i\big)$$

Suppose gradient flow is run over $\phi(\cdot)$ with initialization $w_1(0), \ldots, w_N(0) \in \mathbb{R}$, and denote by $w(t)$ the "end-to-end" scalar at time $t \geq 0$, i.e. $w(t) = \Pi_{i=1}^{N} w_i(t)$.

**(1) (10 pts)** Prove that $w_i(t)^2 - w_j(t)^2 = w_i(0)^2 - w_j(0)^2$ for all $i, j \in \{1, \ldots, N\}$ and all $t \geq 0$. Do not use claims from class during the solution.

Now assume that $w_i(0)^2 = w_j(0)^2$ for all $i, j \in \{1, \ldots, N\}$.

**(2) (10 pts)** Prove that $\frac{d}{dt} w(t) = -N\big(w(t) - y\big)\, w(t)^{2 - \frac{2}{N}}$. Do not use claims from class during the solution.

Let $w(0) = c$ and assume $c \in (0, y)$.

**(3) (5 pts)** Prove that $w(t) \geq c$ for all $t \geq 0$. You may use the fact that, in general, under gradient flow the objective function is monotonically non-increasing (as a function of $t$).

**(4) (10 pts)** Prove that:

$$\forall t \geq 0: \quad L(w(t)) \leq L(w(0)) \exp\left(-2N c^{2 - \frac{2}{N}} \cdot t\right)$$

i.e., the loss function converges to $0$ at an exponential rate. Do not use claims from class during the solution.
*Hint:* first show that $\frac{d}{dt} L(w(t)) = -L(w(t)) \cdot 2N w(t)^{2 - \frac{2}{N}}$.

**Solution sketch:**

(Identical to Moed B 2021 Q2 — see index/exams/fodl_exam_b_2021.md; only the point split differs: 10/10/5/10 instead of 12/12/6/12.)

**1. Conservation of $w_i^2-w_j^2$**

**What is asked.** A proof, from scratch, that the difference between the squares of any two layers stays constant along gradient flow.

**Tool and why.** The chain rule applied to $w_i(t)^2$. This is the scalar balancedness law (cheat sheet §8), but the question forbids citing it, so we derive it. The idea is to show that the time derivative of $w_i^2$ does not depend on $i$.

**Definitions.** We write $w=\prod_{k=1}^Nw_k$ for the end-to-end scalar, as in the statement, and $L'(w)=w-y$ for the derivative of $L$. Gradient flow means $\dot w_i(t)=-\frac{\partial\phi}{\partial w_i}$, evaluated at the current weights.

**Solution.**

Step 1, the partial derivative: $w$ depends on $w_i$ through the factor $w_i$, and the derivative of $w$ by $w_i$ is the product of the other factors. By the chain rule,

$$\frac{\partial\phi}{\partial w_i}=L'(w)\prod_{k\ne i}w_k.$$

Step 2, the flow: by the definition of gradient flow,

$$\dot w_i=-L'(w)\prod_{k\ne i}w_k.$$

Step 3, the derivative of the square, using Step 2 and then that $w_i$ times the product of the other factors is the full product $w$:

$$\begin{aligned}
\frac{d}{dt}w_i^2&=2w_i\dot w_i\\
&=-2L'(w)\,w_i\prod_{k\ne i}w_k\\
&=-2L'(w)\,w.
\end{aligned}$$

Step 4, independence of $i$: the right side is the same for every layer. Subtracting the formulas for $i$ and $j$ gives

$$\frac{d}{dt}\big(w_i^2-w_j^2\big)=0.$$

Step 5, integrating: a differentiable function on $[0,\infty)$ with zero derivative is constant, so for all $t\ge0$

$$w_i(t)^2-w_j(t)^2=w_i(0)^2-w_j(0)^2.$$

**In words.** Every layer's square changes at the same rate at every moment, so whatever gaps there were between the squares at the start never change.

**Sanity check.** For $N=2$ we have $\phi=\tfrac12(w_1w_2-y)^2$. Then $\frac{d}{dt}w_1^2=-2(w-y)w_1w_2$ and $\frac{d}{dt}w_2^2=-2(w-y)w_2w_1$, the same expression.

**What to write in the exam.**

- Chain rule: $\frac{\partial\phi}{\partial w_i}=L'(w)\prod_{k\ne i}w_k$.
- Hence $\frac{d}{dt}w_i^2=2w_i\dot w_i$, which equals $-2L'(w)\,w$ for every $i$.
- So $\frac{d}{dt}(w_i^2-w_j^2)=0$, and the difference keeps its initial value.

*Verified: in SymPy for $N=4$ the four derivatives of $w_i^2$ are identical; numerical gradient-flow runs for $N=2,3,5$ from random initializations keep every difference of squares constant to within $5\cdot10^{-11}$.*

**2. The end-to-end dynamics**

**What is asked.** A proof, from scratch, that under a balanced initialization the product $w(t)$ obeys the stated differential equation.

**Tool and why.** The product rule on $w=\prod_kw_k$, and then part 1 to replace every squared factor by a power of $w$ (cheat sheet §8, end-to-end dynamics, derived here because citing it is forbidden). Balancedness is what makes all the squared factors equal.

**Definitions.** Let $a(t)=w_1(t)^2$. By Step 1 below all squares are equal to it, so it is the common squared size of a layer.

**Solution.**

Step 1, balanced stays balanced: by part 1 and the assumption on the initialization,

$$w_i(t)^2-w_j(t)^2=w_i(0)^2-w_j(0)^2=0.$$

So $w_i(t)^2=a(t)$ for every $i$ and every $t$.

Step 2, $a$ in terms of $w$: squaring the product,

$$w^2=\prod_{k=1}^Nw_k^2=a^N.$$

Since $a\ge0$, taking the nonnegative $N$-th root gives $a=|w|^{2/N}$.

Step 3, the product rule:

$$\dot w=\sum_{i=1}^N\Big(\prod_{k\ne i}w_k\Big)\dot w_i.$$

Step 4, substituting the flow from part 1, Step 2:

$$\begin{aligned}
\dot w&=-L'(w)\sum_{i=1}^N\Big(\prod_{k\ne i}w_k\Big)^2\\
&=-L'(w)\sum_{i=1}^N\prod_{k\ne i}w_k^2\\
&=-L'(w)\cdot N\,a^{N-1}.
\end{aligned}$$

The last line holds because each product has $N-1$ factors, each equal to $a$ by Step 1, and there are $N$ equal terms.

Step 5, back to $w$: by Step 2,

$$a^{N-1}=|w|^{\frac{2(N-1)}{N}}=|w|^{2-\frac2N}.$$

With $L'(w)=w-y$ this gives

$$\dot w=-N\,(w-y)\,|w|^{2-\frac2N}.$$

In the regime $w\ge0$, which is the one of parts 3 and 4, the absolute value can be dropped, and this is exactly the stated formula.

We never divided by $w_i$, so the argument also covers the case where some $w_i$ is $0$: then all of them are $0$ by balancedness, $w=0$, and both sides vanish.

**In words.** The product rule produces $N$ terms, each equal to the gradient times the squared product of the other layers. Balancedness makes all $N$ terms equal, and each squared product is a power of $|w|$. So depth acts as a speed factor: the end-to-end scalar moves fast when $|w|$ is large and slowly near $0$.

**Sanity check.** For $N=2$ the formula reads $\dot w=-2(w-y)|w|$. Directly, with $w_1$ and $w_2$ both equal to $s$, we get $w=s^2$ and $\dot s=-(w-y)s$, so $\dot w=2s\dot s$, which is $-2(w-y)s^2$, the same thing.

**What to write in the exam.**

- By part 1, balanced initialization gives $w_i^2=a$ for all $i$, and $w^2=a^N$, so $a=|w|^{2/N}$.
- Product rule and the flow: $\dot w=-L'(w)\sum_i\prod_{k\ne i}w_k^2$.
- Each of the $N$ terms equals $a^{N-1}$, which is $|w|^{2-2/N}$.
- Hence $\dot w=-N(w-y)w^{2-2/N}$ for $w\ge0$.

*Verified: SymPy for $N=4$ with equal positive weights gives the formula exactly; numerical gradient-flow runs for $N=2,3,5$ with balanced initializations, including sign flips, match the formula to $10^{-15}$.*

**3. The barrier $w(t)\ge c$**

**What is asked.** A proof that the end-to-end scalar never drops below its starting value $c$.

**Tool and why.** Monotone descent of gradient flow, which the question allows (cheat sheet §7). The loss can only go down, and every point below $c$ has a higher loss than $c$ itself, so the trajectory cannot reach it.

**Definitions.** No new notation. Note that $\phi(w_1(t),\dots,w_N(t))=L(w(t))$ by the definition of $\phi$.

**Solution.**

Step 1, monotonicity: the objective $\phi$ is non-increasing along the flow, and it equals $L(w(t))$, so

$$L(w(t))\le L(w(0))=L(c).$$

Step 2, unpacking the loss: multiplying by $2$ gives $(w(t)-y)^2\le(c-y)^2$. Taking square roots,

$$|w(t)-y|\le|c-y|=y-c,$$

where the last equality uses $c<y$.

Step 3, the lower side: the inequality says in particular $w(t)-y\ge-(y-c)$, which is $w(t)\ge c$. The upper side gives $w(t)\le2y-c$, which we do not need.

**In words.** Every point below $c$ is farther from $y$ than $c$ is, so reaching it would raise the loss, and gradient flow never raises the loss.

**Sanity check.** The hypothesis $c<y$ is used exactly once, in $|c-y|=y-c$. If instead $c>y$, the allowed set is the interval from $2y-c$ to $c$, and $w(t)$ does move below $c$, toward $y$. So the assumption is needed.

**What to write in the exam.**

- Gradient flow does not increase the objective, so $L(w(t))\le L(c)$.
- Hence $|w(t)-y|\le y-c$, using $c<y$.
- The lower side of this is $w(t)\ge c$.

*Verified: in all nine numerical runs ($N=2,3,5$, three values of $c$ each) the minimum of $w(t)$ over time equals $c$, attained at $t=0$.*

**4. Exponential convergence of the loss**

**What is asked.** A proof, without claims from class, of the stated exponential bound on $L(w(t))$.

**Tool and why.** A differential inequality of the form $\dot\ell\le-\kappa\ell$, integrated with an integrating factor (cheat sheet §9, the PL-type pattern). We prove the integration inline, since claims from class are forbidden. Part 3 supplies the lower bound on the speed factor $w^{2-2/N}$.

**Definitions.** Let $\ell(t)=L(w(t))$, the loss along the trajectory, and let $\kappa=2Nc^{2-2/N}$, the rate we want to prove.

**Solution.**

Step 1, the chain rule:

$$\dot\ell=L'(w)\,\dot w=(w-y)\,\dot w.$$

Step 2, the hint: by part 3, $w(t)\ge c$, and $c>0$, so part 2 applies without absolute values. Substituting it,

$$\begin{aligned}
\dot\ell&=-N(w-y)^2\,w^{2-\frac2N}\\
&=-2N\cdot\tfrac12(w-y)^2\,w^{2-\frac2N}\\
&=-2N\,\ell\,w^{2-\frac2N}.
\end{aligned}$$

Step 3, the lower bound on the speed: since $N\ge2$, the exponent $2-2/N$ is at least $1$, so it is positive. The map $z\mapsto z^p$ with $p>0$ is increasing on $(0,\infty)$, and $w(t)\ge c$, so $w^{2-2/N}\ge c^{2-2/N}$. Multiplying by $-2N\ell$, which is not positive, flips the inequality:

$$\dot\ell\le-2Nc^{2-\frac2N}\,\ell=-\kappa\,\ell.$$

Step 4, the integrating factor: let $u(t)=e^{\kappa t}\ell(t)$. By the product rule and Step 3,

$$\begin{aligned}
\dot u&=e^{\kappa t}\big(\dot\ell+\kappa\ell\big)\\
&\le0.
\end{aligned}$$

So $u$ is non-increasing, and $u(t)\le u(0)$, which is $\ell(0)$.

Step 5, conclusion: dividing by $e^{\kappa t}>0$,

$$\boxed{L(w(t))\le L(w(0))\,e^{-2Nc^{2-\frac2N}t}}$$

This route avoids dividing by $\ell$ (as taking $\ln\ell$ would), so it needs no separate argument that the loss stays positive.

**In words.** The loss shrinks at a rate proportional to itself, and the constant is at least $2Nc^{2-2/N}$ because $w$ never falls below $c$. Starting farther from $0$, or with more layers, guarantees a faster rate.

**Sanity check.** At $t=0$ the bound is an equality. As $c\to0$ the rate tends to $0$, which fits: near $w=0$ every layer is near $0$ and the gradient almost vanishes, so training starts slowly.

**What to write in the exam.**

- Chain rule and part 2: $\dot\ell=(w-y)\dot w$, which equals $-2N\ell\,w^{2-2/N}$.
- By part 3, $w\ge c$ with $c>0$, so $w^{2-2/N}\ge c^{2-2/N}$ and $\dot\ell\le-\kappa\ell$.
- Then $\frac{d}{dt}(e^{\kappa t}\ell)\le0$, so $\ell(t)\le\ell(0)e^{-\kappa t}$.

*Verified: in the nine numerical runs the ratio of $L(w(t))$ to the bound never exceeds $1$, with equality only at $t=0$.*

**Common mistakes.**

- Citing the balancedness law or the end-to-end formula from class. The question forbids it, so both must be derived.
- Dividing by $w_i$ or by the loss without arguing that it is nonzero. The product form in part 2 and the integrating factor in part 4 avoid this.
- Skipping the barrier of part 3. Without $w(t)\ge c$ there is no lower bound on $w^{2-2/N}$, and no rate follows.

**💡 Useful tricks:** "Do not use claims from class" ⇒ derive balancedness from scratch: $\frac{d}{dt}w_i^2=-2L'(w)\,w$ is *identical for all $i$*, so differences are conserved; balanced init ⇒ $w_i^2=w^{2/N}$; the loss-monotonicity fact gives the barrier $w(t)\geq c$, which is what lets you lower-bound $w^{2-2/N}\geq c^{2-2/N}$; finish with $\frac{d}{dt}\ln L\leq -2Nc^{2-2/N}$ + Grönwall.

**⚠️ Watch out:** you may NOT cite the conservation law — prove it; the barrier from part 3 is essential (without $w(t)\geq c$ the exponential rate doesn't follow); mind signs — $c\in(0,y)$ keeps $w(t)\geq c$ with $c>0$, so the power $w^{2-2/N}$ is well-defined and bounded below.

## Q3 (30 pts) — Generalization via a finite $\epsilon$-cover: Hoeffding on the cover, Lipschitz discretization transfer, and index-weighted bounds over a partition
**Topics:** covering-numbers, uniform-convergence, hoeffding, concentration, probability-tools, structural-risk-minimization | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2, lecture_08_generalization_3
**Statement (English translation):**
For an input space $\mathcal{X}$ and output space $\mathcal{Y}$, let $\mathcal{H} \subseteq \mathcal{Y}^{\mathcal{X}}$ be a hypothesis class and let $\mathcal{F} \subseteq \mathcal{H}$ be a *finite* subset of $\mathcal{H}$. Let $\epsilon > 0$. Assume that for every $h \in \mathcal{H}$ there exists $f \in \mathcal{F}$ such that:

$$|h(x) - f(x)| \leq \epsilon$$

(for every $x \in \mathcal{X}$; i.e., $\mathcal{F}$ is an $\epsilon$-cover of $\mathcal{H}$ in the sup metric).

Let $\mathcal{D}$ be a distribution (unknown) over $\mathcal{X} \times \mathcal{Y}$, let $S = \{(x_n, y_n)\}_{n=1}^{N}$ be a training sample of $N$ examples drawn i.i.d. from $\mathcal{D}$, and let $l: \mathcal{Y} \times \mathcal{Y} \to [0,1]$ be a loss function. For a hypothesis $h \in \mathcal{H}$, denote by $L_\mathcal{D}(h)$ the generalization error (i.e. $L_\mathcal{D}(h) := E_{(x,y) \sim \mathcal{D}}[l(h(x), y)]$) and by $L_S(h)$ the sample error (i.e. $L_S(h) := \frac{1}{N} \sum_{n=1}^{N} l(h(x_n), y_n)$).

**(1) (8 pts)** Derive a generalization bound based on uniform convergence for the class $\mathcal{F}$. That is, derive an expression $\Delta(N, \delta, |\mathcal{F}|)$ (whose dependence on the hypothesis class is only through $|\mathcal{F}|$) satisfying $\lim_{N \to \infty} \Delta(N, \delta, |\mathcal{F}|) = 0$, such that for every $\delta \in (0,1)$, with probability at least $1 - \delta$:

$$\forall f \in \mathcal{F}:\ L_\mathcal{D}(f) - L_S(f) \leq \Delta(N, \delta, |\mathcal{F}|)$$

*Reminder (Hoeffding bound):* let $A_1, \ldots, A_N$ be i.i.d. (independent, identically distributed) random variables bounded in the interval $[0,1]$. For every $\epsilon \geq 0$:

$$P\left(\left|\frac{1}{N}\sum_{i=1}^{N} A_i - E[A_1]\right| \geq \epsilon\right) \leq 2\exp(-2N\epsilon^2)$$

**(2) (11 pts)** Assume the loss function $l$ is $\rho$-Lipschitz with respect to its first variable, for some fixed $\rho > 0$. Derive a generalization bound for the class $\mathcal{H}$ based on the "discretization (compression) technique" learned in class. That is, using the previous part, prove that for every $\delta \in (0,1)$, with probability at least $1 - \delta$:

$$\forall h \in \mathcal{H}:\ L_\mathcal{D}(h) - L_S(h) \leq \Delta(N, \delta, |\mathcal{F}|) + 2\rho\epsilon$$

**(3) (11 pts)** Denote by $\mathcal{F}_1, \ldots, \mathcal{F}_R \subset \mathcal{F}$ an arbitrary partition of $\mathcal{F}$ into disjoint subsets; that is, $\mathcal{F}_1 \cup \cdots \cup \mathcal{F}_R = \mathcal{F}$ and $\mathcal{F}_i \cap \mathcal{F}_j = \emptyset$ for all $i \neq j \in \{1, \ldots, R\}$. Suppose we have at our disposal a learning algorithm which tends to return hypotheses $h \in \mathcal{H}$ for which $f \in \arg\min_{f \in \mathcal{F}} \|h - f\|_\infty$ lies in a set $\mathcal{F}_i$ with a relatively small index $i$. Derive a generalization bound similar to the bound of part 2, but suited to the use of this algorithm. That is, for $h \in \mathcal{H}$: the smaller the index $i$ of the set $\mathcal{F}_i$ in which the hypothesis of $\mathcal{F}$ closest to $h$ lies, the smaller the bound for $h$ should be.

**Solution sketch:**

**1. Uniform convergence over the finite cover**

**What is asked.** An explicit expression $\Delta(N,\delta,|\mathcal{F}|)$ that tends to $0$ as $N$ grows, together with a proof that with probability at least $1-\delta$ it bounds the gap of every $f\in\mathcal{F}$ at once.

**Tool and why.** Hoeffding for one fixed $f$, then a union bound over the finite set $\mathcal{F}$ (cheat sheet §2 and §10). The set $\mathcal{F}$ is finite and fixed before the sample is drawn, so Hoeffding applies to each member, and the union bound costs only a factor $|\mathcal{F}|$ in the probability, which becomes $\ln|\mathcal{F}|$ in the bound.

**Definitions.** For a fixed $f\in\mathcal{F}$ let $A_n=l(f(x_n),y_n)$, the loss of $f$ on the $n$-th example. For a threshold $\eta>0$, to be chosen later, let $E_f$ be the bad event that $|L_S(f)-L_\mathcal{D}(f)|\ge\eta$. We call the threshold $\eta$ because $\epsilon$ is already the cover radius.

**Solution.**

Step 1, the variables fit Hoeffding: the pairs $(x_n,y_n)$ are i.i.d. and $f$ is fixed, so $A_1,\dots,A_N$ are i.i.d. They lie in $[0,1]$ because $l$ takes values there. By the definitions, $E[A_1]=L_\mathcal{D}(f)$ and their average is $L_S(f)$.

Step 2, one hypothesis: by Hoeffding with $\eta$ in place of $\epsilon$, $P(E_f)\le2e^{-2N\eta^2}$.

Step 3, all of $\mathcal{F}$: by the union bound,

$$P\Big(\bigcup_{f\in\mathcal{F}}E_f\Big)\le\sum_{f\in\mathcal{F}}P(E_f)\le2|\mathcal{F}|e^{-2N\eta^2}.$$

Step 4, choosing $\eta$: set the right side equal to $\delta$ and solve, taking logarithms in the second row:

$$\begin{aligned}
2|\mathcal{F}|e^{-2N\eta^2}&=\delta\\
\eta^2&=\frac{\ln(2|\mathcal{F}|/\delta)}{2N}.
\end{aligned}$$

The logarithm is positive because $2|\mathcal{F}|/\delta>2$, so $\eta$ is a real positive number.

Step 5, conclusion: with probability at least $1-\delta$ no bad event occurs, and then every $f\in\mathcal{F}$ has $|L_S(f)-L_\mathcal{D}(f)|<\eta$, in particular $L_\mathcal{D}(f)-L_S(f)\le\eta$. So we may take

$$\boxed{\Delta(N,\delta,|\mathcal{F}|)=\sqrt{\frac{\ln(2|\mathcal{F}|/\delta)}{2N}}}$$

Step 6, the limit: for fixed $\delta$ and $|\mathcal{F}|$ the numerator is a constant and the denominator grows without bound, so $\Delta\to0$ as $N\to\infty$. The class enters only through $|\mathcal{F}|$, as required.

**In words.** For each fixed member of the cover the sample error concentrates around the true error; demanding this for all members at once costs only a logarithm of their number.

**Sanity check.** With $|\mathcal{F}|=100$, $\delta=0.05$ and $N=1000$ we get $\ln4000\approx8.294$, divided by $2000$ and square-rooted: $\Delta\approx0.0644$. With $|\mathcal{F}|=1$ the bound is plain two-sided Hoeffding solved for $\eta$.

**What to write in the exam.**

- For fixed $f$, the losses $A_n=l(f(x_n),y_n)$ are i.i.d. in $[0,1]$ with mean $L_\mathcal{D}(f)$, so Hoeffding gives $P(E_f)\le2e^{-2N\eta^2}$.
- A union bound over $\mathcal{F}$ gives failure probability at most $2|\mathcal{F}|e^{-2N\eta^2}$; set it to $\delta$.
- Hence $\Delta=\sqrt{\ln(2|\mathcal{F}|/\delta)/(2N)}$, which tends to $0$.

*Verified: SymPy solves the equation and gives limit $0$; a Monte-Carlo toy problem ($|\mathcal{F}|=11$, $N=200$, $\delta=0.1$, 2000 samples) had no failures of the bound.*

**2. Transfer to all of $\mathcal{H}$ through the cover**

**What is asked.** A proof that on the same high-probability event every $h\in\mathcal{H}$, not only the members of $\mathcal{F}$, satisfies the bound with the extra term $2\rho\epsilon$.

**Tool and why.** The Lipschitz transfer of the discretization technique (cheat sheet §10). The class $\mathcal{H}$ may be infinite, so part 1 cannot be applied to it directly. But every $h$ is within $\epsilon$ of some $f\in\mathcal{F}$, and a Lipschitz loss turns close predictions into close losses.

**Definitions.** For $h\in\mathcal{H}$ let $f_h\in\mathcal{F}$ be a cover point with $\sup_x|h(x)-f_h(x)|\le\epsilon$, which exists by the assumption. Let $G$ be the event of part 1, which has probability at least $1-\delta$. Lipschitz in the first variable means $|l(a,y)-l(b,y)|\le\rho|a-b|$ for all $a,b,y$.

**Solution.**

Step 1, pointwise: for every pair $(x,y)$, by the Lipschitz property and the cover,

$$|l(h(x),y)-l(f_h(x),y)|\le\rho|h(x)-f_h(x)|\le\rho\epsilon.$$

Step 2, the population side: taking expectation over $\mathcal{D}$ of a pointwise bound keeps it, so $L_\mathcal{D}(h)\le L_\mathcal{D}(f_h)+\rho\epsilon$.

Step 3, the sample side: averaging Step 1 over the $N$ examples gives $|L_S(h)-L_S(f_h)|\le\rho\epsilon$, in particular $L_S(h)\ge L_S(f_h)-\rho\epsilon$.

Step 4, combining on $G$, using Step 2 for the first term, Step 3 for the second, and part 1 for $f_h$:

$$\begin{aligned}
L_\mathcal{D}(h)-L_S(h)&\le\big(L_\mathcal{D}(f_h)+\rho\epsilon\big)-\big(L_S(f_h)-\rho\epsilon\big)\\
&=L_\mathcal{D}(f_h)-L_S(f_h)+2\rho\epsilon\\
&\le\Delta(N,\delta,|\mathcal{F}|)+2\rho\epsilon.
\end{aligned}$$

Step 5, uniformity: the event $G$ does not depend on $h$, and on $G$ the bound of part 1 holds for every member of $\mathcal{F}$ simultaneously, in particular for $f_h$, whichever it is. So on $G$ the bound holds for all $h\in\mathcal{H}$ at once, with probability at least $1-\delta$.

**In words.** The infinite class behaves like its finite skeleton, up to the price of moving each $h$ to its cover point and back: $\rho\epsilon$ on the true error and $\rho\epsilon$ on the sample error.

**Sanity check.** If $\mathcal{H}$ is itself finite we may take $\mathcal{F}=\mathcal{H}$ and $f_h=h$, so the inequality holds with $\epsilon=0$ and we recover part 1.

**What to write in the exam.**

- For $h$ take $f_h\in\mathcal{F}$ with $\|h-f_h\|_\infty\le\epsilon$; Lipschitz gives a pointwise loss difference of at most $\rho\epsilon$.
- Hence $L_\mathcal{D}(h)\le L_\mathcal{D}(f_h)+\rho\epsilon$ and $L_S(f_h)\le L_S(h)+\rho\epsilon$.
- On the event of part 1 this gives $\Delta(N,\delta,|\mathcal{F}|)+2\rho\epsilon$ for every $h$ at once.

*Verified: in the Monte-Carlo toy problem (linear predictors with slopes in $[0,1]$, a clipped absolute loss that is 1-Lipschitz, $\epsilon=0.05$) the bound never failed over 2000 samples, and $|L_\mathcal{D}(h)-L_\mathcal{D}(f_h)|\le\rho\epsilon$ held for all 401 tested $h$.*

**3. A bound that favours low-index cells**

**What is asked.** A bound for each $h\in\mathcal{H}$ that is smaller when the cell containing the cover point nearest to $h$ has a smaller index.

**Tool and why.** Structural risk minimization, that is, a weighted union bound (cheat sheet §2). We split the failure budget $\delta$ unequally over the cells, giving more of it to low-index cells, apply part 1 inside each cell, and then transfer to $h$ as in part 2.

**Definitions.** Let $\delta_i=\delta2^{-i}$, the share of the failure budget given to cell $i$. For $h\in\mathcal{H}$ let $f_h$ be a nearest cover point, an element of the argmin in the statement (ties broken, say, by the smallest index), and let $i(h)$ be the index of the cell that contains it. Since some cover point is within $\epsilon$ of $h$, the nearest one is too: $\|h-f_h\|_\infty\le\epsilon$.

**Solution.**

Step 1, one cell: $\mathcal{F}_i$ is a finite set, so part 1 applies to it with confidence $\delta_i$. With probability at least $1-\delta_i$,

$$\forall f\in\mathcal{F}_i:\ L_\mathcal{D}(f)-L_S(f)\le\Delta(N,\delta_i,|\mathcal{F}_i|).$$

Step 2, the budget: the shares sum to less than $\delta$,

$$\sum_{i=1}^R\delta_i=\delta\sum_{i=1}^R2^{-i}=\delta(1-2^{-R})<\delta.$$

By the union bound over the $R$ cells, with probability at least $1-\delta$ all cell bounds of Step 1 hold together.

Step 3, the transfer: on this event take $h\in\mathcal{H}$. Its cover point $f_h$ lies in $\mathcal{F}_{i(h)}$ and is within $\epsilon$ of $h$, so Steps 1 to 4 of part 2, with the cell bound in place of part 1, give

$$\boxed{L_\mathcal{D}(h)-L_S(h)\le\Delta\big(N,\delta2^{-i(h)},|\mathcal{F}_{i(h)}|\big)+2\rho\epsilon}$$

Step 4, the explicit form: since $\ln(1/2^{-i})=i\ln2$,

$$\Delta\big(N,\delta2^{-i},|\mathcal{F}_i|\big)=\sqrt{\frac{\ln(2|\mathcal{F}_i|/\delta)+i\ln2}{2N}}.$$

Step 5, dependence on the index: the term $i\ln2$ grows by $\ln2$ per index, which is the required preference. The cell size $|\mathcal{F}_i|$, however, depends on the partition. With $N=200$, $\delta=0.1$ and sizes $1$, $1000$, $1$ for the first three cells, the bound is about $0.096$, $0.168$ and $0.113$, not monotone. To guarantee the requirement for every partition, use $|\mathcal{F}_i|\le|\mathcal{F}|$, since $\Delta$ increases in its third argument:

$$L_\mathcal{D}(h)-L_S(h)\le\sqrt{\frac{\ln(2|\mathcal{F}|/\delta)+i(h)\ln2}{2N}}+2\rho\epsilon.$$

This version strictly increases with $i(h)$.

**In words.** The algorithm tends to land near low-index cells, so we bet more of our confidence there. Landing in cell $i$ costs an extra $i\ln2$ inside the logarithm, a small price that grows with the index.

**Sanity check.** At $i(h)=1$ the version with $|\mathcal{F}|$ has $\ln(2|\mathcal{F}|/\delta)+\ln2$ under the root, only $\ln2$ worse than the uniform bound of part 2. A uniform split $\delta_i=\delta/R$ would put the same $\ln R$ into every cell and express no preference at all.

**What to write in the exam.**

- Give cell $i$ the confidence $\delta_i=\delta2^{-i}$; the shares sum to $\delta(1-2^{-R})$, below $\delta$.
- Part 1 in each cell plus a union bound: with probability at least $1-\delta$ all cells satisfy their bounds.
- Transfer as in part 2 through the nearest cover point, in cell $i(h)$: the gap is at most $\Delta(N,\delta2^{-i(h)},|\mathcal{F}_{i(h)}|)+2\rho\epsilon$.
- Replace $|\mathcal{F}_{i(h)}|$ by $|\mathcal{F}|$ to make the bound strictly increasing in $i(h)$ for every partition.

*Verified: the exact sum of $2^{-i}$ for $i$ from 1 to 10 is $\tfrac{1023}{1024}$; the bound with $|\mathcal{F}|$ is strictly increasing in $i$; the non-monotone example values were computed in NumPy.*

**Common mistakes.**

- Applying Hoeffding directly to a hypothesis chosen using the sample, or to the infinite class $\mathcal{H}$. Hoeffding needs a fixed function; the union over the finite $\mathcal{F}$ is what makes it legal.
- Paying $\rho\epsilon$ only once. The transfer costs $\rho\epsilon$ on the population side and again on the sample side.
- In part 3, splitting $\delta$ uniformly over the cells, which expresses no preference, or choosing weights whose sum exceeds $\delta$.

**💡 Useful tricks:** A finite $\epsilon$-cover ⇒ Hoeffding + union on $\mathcal F$ only; transfer to *all* of $\mathcal H$ via the $2\rho\epsilon$ Lipschitz bridge; "algorithm prefers low-index cells" ⇒ SRM weight $\delta_i=\delta 2^{-i}$ per cell of the partition.

**⚠️ Watch out:** the transfer factor is $2\rho\epsilon$ — you pay $\rho\epsilon$ *twice* (once on $L_D$, once on $L_S$); the cover assumption is what guarantees a nearest $f$ within $\epsilon$; to force monotonicity in $i$ irrespective of cell sizes, put $|\mathcal F|$ (not $|\mathcal F_i|$) inside the log.
