# FODL Example Exam
**Date / semester:** July 1st, 2020 — 2019–2020 Spring Semester ("Exemplar Exam")
**Total points:** 100

## Q1 (25 pts) — Universality of shallow leaky-ReLU networks for piecewise linear functions
**Topics:** universality, hypothesis-class, leaky-relu, piecewise-linear | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
(Original is in English; reproduced faithfully.)

Let $\mathcal{H}_B$ be the hypotheses space corresponding to a fully-connected shallow (2 layer) neural network with 1D input, 1D output, hidden width $B\in\mathbb{N}$, and leaky ReLU activation with negative slope $\alpha>0$ (i.e. an activation $\sigma(z)$ equal to $z$ when $z>0$ and to $\alpha\cdot z$ otherwise). Denote by $\mathcal{F}$ the set of piecewise linear functions from $\mathbb{R}$ to $\mathbb{R}$, and suppose we measure distance between functions through $\|\cdot\|_\infty$, i.e. $d(f_1,f_2):=\sup_{x\in\mathbb{R}}|f_1(x)-f_2(x)|$.

- **(5 pts)** Provide an explicit expression for $\mathcal{H}_B$.
- **(5 pts)** Define what it means for $\mathcal{H}_B$ to be $\mathcal{F}$-universal in the sense of $d(\cdot,\cdot)$.
- **(15 pts)** Prove that this universality holds.

**Solution sketch:**

**1. An explicit expression for $\mathcal{H}_B$**

**What is asked.** Write down the set of all functions that a 2-layer, width-$B$ leaky-ReLU network with scalar input and scalar output can compute. The answer is a formula describing a set.

**Tool and why.** The hypothesis class of a network architecture (cheat sheet §4): one hypothesis is the input–output map for one choice of weights, and the class collects these maps over all real weights. A shallow network has a single hidden layer, so each hidden neuron applies $\sigma$ to an affine function of $x$, and the output neuron takes an affine combination of the hidden neurons.

**Definitions.** For the hidden neuron $i\in[B]$ we write $w_i$ for its input weight, $b_i$ for its bias and $v_i$ for its output weight; $c$ is the bias of the output neuron. The activation, written out, is

$$\sigma(z)=\begin{cases} z, & z>0,\\ \alpha z, & z\le 0.\end{cases}$$

**Solution.**

Step 1, one hidden neuron: neuron $i$ receives $w_ix+b_i$ and outputs $\sigma(w_ix+b_i)$, by the definition of a fully-connected layer with activation $\sigma$.

Step 2, the output neuron: the output is a real number, so the last layer has no activation; it returns the weighted sum of the hidden outputs plus its bias, $\sum_i v_i\sigma(w_ix+b_i)+c$.

Step 3, collect all weight choices: letting every weight range over $\mathbb{R}$ gives

$$\boxed{\mathcal{H}_B=\Big\{x\mapsto\sum_{i=1}^{B}v_i\,\sigma(w_ix+b_i)+c\ :\ w_i,b_i,v_i,c\in\mathbb{R}\Big\}}$$

Step 4, the output bias is harmless: under a convention without $c$, a constant is still available from a neuron with $w_i=0$ and $b_i=1$, because $\sigma(1)=1$. This costs one extra neuron and changes nothing in part 3.

**In words.** A hypothesis is a weighted sum of $B$ shifted and rescaled copies of the activation, plus a constant.

**Sanity check.** With $B=1$, $w_1=1$, $b_1=0$, $v_1=1$ and $c=0$ the hypothesis is $\sigma$ itself, as it should be. Every member is continuous and piecewise linear, with a kink only where some $w_ix+b_i$ crosses $0$, so at most $B$ kinks.

**What to write in the exam.**

- The formula of Step 3.
- The activation: $\sigma(z)=z$ for $z>0$, and $\alpha z$ otherwise.
- All weights $w_i,b_i,v_i,c$ range over $\mathbb{R}$.

*Verified: this exact formula is the network implemented in NumPy for the 300 random tests of part 3.*

**2. Definition of $\mathcal{F}$-universality**

**What is asked.** A formal definition, with all quantifiers in the right order. The answer is a definition.

**Tool and why.** Definition 1 of the course, universality (cheat sheet §4). The whole point of the definition is the order of the quantifiers: the width is chosen after the target function and the accuracy.

**Definitions.** No new notation; $d$ is the sup-distance from the statement.

**Solution.**

Step 1, the definition: the family $\{\mathcal{H}_B\}_{B\in\mathbb{N}}$ is $\mathcal{F}$-universal in the sense of $d$ if

$$\forall f\in\mathcal{F},\ \forall\epsilon>0,\ \exists B\in\mathbb{N},\ \exists h\in\mathcal{H}_B:\ d(f,h)<\epsilon.$$

Step 2, reading the quantifiers: $B$ is chosen after $f$ and $\epsilon$, so the width may depend on both. Swapping the order, one width for all $f$, would be a far stronger statement and is not what is asked.

Step 3, an equivalent form: the definition says that the union $\bigcup_{B}\mathcal{H}_B$ is dense in $\mathcal{F}$ with respect to $d$. Writing $\le\epsilon$ instead of $<\epsilon$ gives the same notion, because $\epsilon$ is arbitrary: apply the version with $\le$ to $\epsilon/2$.

**In words.** Every target can be approximated as well as we like, provided we may make the network as wide as needed.

**Sanity check.** Exact realization, $d(f,h)=0$, satisfies the condition for every $\epsilon>0$. This is exactly what part 3 will produce.

**What to write in the exam.**

- For all $f\in\mathcal{F}$ and $\epsilon>0$ there exist $B\in\mathbb{N}$ and $h\in\mathcal{H}_B$ with $d(f,h)<\epsilon$.
- The width $B$ may depend on $f$ and on $\epsilon$.

*Verified: definitional part; the order of quantifiers is the one used in part 3, where each sampled $f$ gets its own width $B$ in NumPy.*

**3. Proof that universality holds**

**What is asked.** Prove that for every piecewise linear $f$ and every $\epsilon>0$ there are a width $B$ and a hypothesis $h\in\mathcal{H}_B$ with $d(f,h)<\epsilon$. The answer is a proof; we show even more, an exact representation.

**Tool and why.** Write $f$ as an affine function plus a sum of ReLUs at its breakpoints, then build each ReLU and the affine part from leaky-ReLU neurons (cheat sheet §5). An exact representation gives $d(f,h)=0$, which beats every $\epsilon$, so no approximation argument is needed.

**Definitions.** As in the course, $f\in\mathcal{F}$ is continuous and affine on each of finitely many closed pieces. Let $k$ be the number of breakpoints and $t_1,\dots,t_k$ the breakpoints in increasing order. Let $s_0$ be the slope of $f$ to the left of $t_1$, and $s_i$ its slope to the right of $t_i$ (up to $t_{i+1}$, or to $+\infty$ when $i=k$). The slope jump at $t_i$ is

$$c_i:=s_i-s_{i-1},\qquad i\in[k].$$

We write $[z]_+:=\max\{z,0\}$ for the ReLU. If $k=0$, then $f$ is affine and Step 5 below handles it alone. Throughout we assume $\alpha\ne1$; Step 7 shows that this is necessary.

**Solution.**

Step 1, two identities for pairs of neurons. For $z>0$ we have $\sigma(z)=z$ and $\sigma(-z)=-\alpha z$; for $z\le0$ we have $\sigma(z)=\alpha z$ and $\sigma(-z)=-z$. Adding and subtracting in each case gives

$$\sigma(z)-\sigma(-z)=(1+\alpha)z,$$

$$\sigma(z)+\sigma(-z)=(1-\alpha)|z|.$$

In the second identity, for $z\le0$ the sum is $(\alpha-1)z$, and this equals $(1-\alpha)|z|$ because $|z|=-z$.

Step 2, a ReLU from one neuron and a linear term: the function $\sigma(z)-\alpha z$ equals $(1-\alpha)z$ for $z>0$ and $0$ for $z\le0$. Dividing by $1-\alpha$, which is allowed since $\alpha\ne1$:

$$[z]_+=\frac{\sigma(z)-\alpha z}{1-\alpha}.$$

The linear leftover $\alpha z$ is affine in $x$ and will be absorbed into the affine part.

Step 3, the decomposition. **Claim.** For every $x\in\mathbb{R}$,

$$f(x)=f(t_1)+s_0(x-t_1)+\sum_{i=1}^{k}c_i\,[x-t_i]_+.$$

Call the right-hand side $g$. It is continuous, and it is affine on every piece of $f$, because each $[x-t_i]_+$ bends only at a breakpoint of $f$. On the piece to the right of $t_j$, the terms with $i\le j$ have slope $1$ and the others slope $0$, so the slope of $g$ there telescopes:

$$s_0+\sum_{i=1}^{j}(s_i-s_{i-1})=s_j.$$

To the left of $t_1$ every ReLU term is $0$, so the slope of $g$ is $s_0$. We now show that $f$ and $g$ coincide, by induction on the number $j$ of breakpoints already passed, moving from left to right. Set $t_{k+1}:=+\infty$.

**Base.** On the piece left of $t_1$ both functions are affine with slope $s_0$. At $t_1$ every term $[t_1-t_i]_+$ vanishes, because $t_i\ge t_1$, so $g(t_1)=f(t_1)$. Two affine functions with the same slope and one common value are equal, so $f=g$ up to $t_1$.

**Hypothesis.** For some $j\in[k]$ we have $f=g$ up to the point $t_j$.

**Step.** On the piece from $t_j$ to $t_{j+1}$ both functions are affine with slope $s_j$, by the slope computation above. By the hypothesis they agree at $t_j$; this is the only place where the hypothesis is used. Same slope and one common value, so they agree on the whole piece, hence up to $t_{j+1}$. After $j=k$ we have covered all of $\mathbb{R}$.

Step 4, from ReLUs to leaky neurons: substitute Step 2 into every term of Step 3, with $z=x-t_i$. Each term splits into one neuron and an affine leftover:

$$c_i[x-t_i]_+=\frac{c_i}{1-\alpha}\,\sigma(x-t_i)-\frac{\alpha c_i}{1-\alpha}\,(x-t_i).$$

Collecting all affine pieces of $f$ gives $f(x)=\sum_i\frac{c_i}{1-\alpha}\sigma(x-t_i)+px+q$, with slope and intercept

$$p:=s_0-\frac{\alpha}{1-\alpha}\sum_{i=1}^{k}c_i,$$

$$q:=f(t_1)-s_0t_1+\frac{\alpha}{1-\alpha}\sum_{i=1}^{k}c_i t_i.$$

Step 5, the affine part from two neurons: by the first identity of Step 1, $x=\frac{\sigma(x)-\sigma(-x)}{1+\alpha}$, and $1+\alpha>0$. So $px$ is computed by two neurons with output weights $\pm\frac{p}{1+\alpha}$, and $q$ is the output bias. The full network has $B=k+2$ neurons:

| neuron | $w$ | $b$ | $v$ |
|---|---|---|---|
| $i\in[k]$ | $1$ | $-t_i$ | $\frac{c_i}{1-\alpha}$ |
| $k+1$ | $1$ | $0$ | $\frac{p}{1+\alpha}$ |
| $k+2$ | $-1$ | $0$ | $-\frac{p}{1+\alpha}$ |

with output bias $c=q$. By Steps 3 to 5 this $h$ satisfies $h(x)=f(x)$ for every $x$.

Step 6, conclusion: given $f\in\mathcal{F}$ and $\epsilon>0$, take $B=k+2$ and the $h$ above. Then

$$\boxed{d(f,h)=0<\epsilon}$$

so $\{\mathcal{H}_B\}$ is $\mathcal{F}$-universal. Here $B$ depends on $f$ only, which part 2 allows.

Step 7, why $\alpha\ne1$ is needed: for $\alpha=1$ the activation is the identity, so every hypothesis is affine, $h(x)=px+q$. Take $f(x)=|x|$, which is in $\mathcal{F}$. For every $R>0$ the two errors at $x=R$ and $x=-R$ add up to

$$(R-pR-q)+(R+pR-q)=2R-2q,$$

which grows without bound, so $d(f,h)=\infty$ for every affine $h$. Hence the claim holds exactly for $\alpha\ne1$, the usual leaky-ReLU range.

**In words.** Every kink of $f$ needs one neuron placed at that kink; the leaky slope $\alpha$ only adds a linear term, and two neurons can produce any linear term. So a piecewise linear function with $k$ kinks is not just approximated but reproduced exactly by $k+2$ neurons.

**Sanity check.** Take the hat function $f(x)=[1-|x|]_+$ and $\alpha=\tfrac12$. Its breakpoints are $-1,0,1$, its slopes are $0,1,-1,0$, so the jumps are $1,-2,1$, and $f(t_1)=0$, $s_0=0$. The sums $\sum_i c_i$ and $\sum_i c_it_i$ are both $0$, so $p$ and $q$ vanish and three neurons suffice:

$$f(x)=2\sigma(x+1)-4\sigma(x)+2\sigma(x-1).$$

At $x=0$ the right-hand side is $2\cdot1-0+2\cdot(-\tfrac12)$, which is $1$, the peak of the hat.

**What to write in the exam.**

- Identities: $\sigma(z)-\sigma(-z)=(1+\alpha)z$, and $[z]_+=\frac{\sigma(z)-\alpha z}{1-\alpha}$ for $\alpha\ne1$.
- Decomposition: $f(x)=f(t_1)+s_0(x-t_1)+\sum_i c_i[x-t_i]_+$ with $c_i$ the slope jumps; proof by matching slopes piece by piece and the value at $t_1$.
- Replace each ReLU by one leaky neuron plus a linear term, and the total linear term by two neurons.
- Width $k+2$ gives $h=f$ exactly, so $d(f,h)=0$, below every $\epsilon$; for $\alpha=1$ the class is affine and fails.

*Verified: SymPy proves the three identities; for 300 random continuous piecewise linear $f$ (1 to 7 breakpoints, $\alpha$ from 0.01 to 5) the width-$(k+2)$ network matches $f$ to relative error $1.4\cdot10^{-14}$ on a grid of $[-50,50]$ and at $\pm10^4$; the hat example is exact; for $\alpha=1$ the best affine fit to $|x|$ on $[-R,R]$ has error growing like $R/2$ (NumPy).*

**Common mistakes.**

- Writing $f$ as a sum of ReLUs only and dropping the affine part $f(t_1)+s_0(x-t_1)$: then any $f$ with a nonzero slope at $-\infty$ is missed.
- Treating $\sigma$ as a ReLU: $\sigma(x-t)$ still has slope $\alpha$ to the left of $t$, and this linear term must be cancelled or absorbed, otherwise the construction is off by a linear function and $d(f,h)=\infty$.
- Claiming the result for every $\alpha>0$ or for discontinuous "piecewise linear" functions: at $\alpha=1$ the class is affine, and a jump of size $J$ keeps the sup distance from any continuous $h$ at least $J/2$.

**💡 Useful tricks:** Pair leaky-ReLU neurons: $\sigma(z)-\sigma(-z)=(1+\alpha)z$ and $\sigma(z)+\sigma(-z)=(1-\alpha)|z|$ give identity and ReLU; decompose piecewise linear $f$ as $ax+b+\sum_i c_i\,\mathrm{ReLU}(x-t_i)$ (Lecture 2); "universal for piecewise linear" cues exact width-$O(k)$ realization, not approximation.

**⚠️ Watch out:** Quantifier order in the definition ($\forall f,\epsilon\ \exists B,h$ — width may depend on $f,\epsilon$); don't treat $\sigma$ as plain ReLU ($\alpha>0$ changes constants); justify the affine part $ax+b$ and that slope jumps determine the $c_i$.

## Q2 (42 pts) — Smoothness of a quadratic objective; overparameterized critical points are global minima
**Topics:** smoothness, convexity, gradient-descent, linear-nn, spurious-minima | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_03_optimization_1, lecture_04_optimization_2
**Statement (English translation):**
(Original is in English; reproduced faithfully.)

Consider the quadratic objective $f:\mathbb{R}^d\to\mathbb{R}$, $f(w)=\frac12 w^\top Qw$, where $Q\in\mathbb{R}^{d,d}$ is positive definite.

- **(5 pts)** Define what it means for $f(\cdot)$ to be $\beta$-smooth for $\beta>0$.
- **(8 pts)** Prove that $f(\cdot)$ is $\beta$-smooth for all $\beta\ge\lambda_{max}$, where $\lambda_{max}$ is the max eigenvalue of $Q$.
- **(8 pts)** Prove that $f(\cdot)$ is not $\beta$-smooth for any $\beta<\lambda_{max}$.

Suppose we overparameterize $f(\cdot)$ with a shallow (2 layer) linear neural network of hidden width 1.

- **(8 pts)** Compute the gradient of the overparameterized objective w.r.t. network weights.
- **(5 pts)** Define what a critical point of the overparameterized objective is.
- **(8 pts)** Prove that all such critical points are global minima.

**Solution sketch:**

**1. Definition of $\beta$-smoothness**

**What is asked.** The formal definition of a $\beta$-smooth function. The answer is a definition.

**Tool and why.** The course definition of smoothness (cheat sheet §7): smoothness bounds how fast the gradient can change, which is what makes a gradient step with step size about $1/\beta$ safe.

**Definitions.** No new notation; $\|\cdot\|$ is the Euclidean norm.

**Solution.**

Step 1, the definition: a differentiable $f$ is $\beta$-smooth if its gradient is $\beta$-Lipschitz, that is, for all $w,w'\in\mathbb{R}^d$,

$$\|\nabla f(w)-\nabla f(w')\|\le\beta\|w-w'\|.$$

Step 2, the consequence used in class: for a twice continuously differentiable $f$ that is $\beta$-smooth, a Taylor expansion gives the quadratic upper bound (descent lemma)

$$f(w')\le f(w)+\nabla f(w)^\top(w'-w)+\frac\beta2\|w'-w\|^2.$$

Step 3, a monotonicity remark: if $f$ is $\beta$-smooth, it is also $\beta'$-smooth for every $\beta'$ larger than $\beta$, since the right-hand side only grows. So the valid constants form a ray, and parts 2 and 3 show that the ray starts exactly at $\lambda_{max}$.

**In words.** The gradient never turns faster than $\beta$ times the distance travelled.

**Sanity check.** For $Q=I$ we get $\nabla f(w)=w$, so the gradient difference has exactly the norm $\|w-w'\|$: $f$ is $\beta$-smooth precisely for $\beta\ge1$, which matches $\lambda_{max}=1$.

**What to write in the exam.**

- A differentiable $f$ is $\beta$-smooth if $\|\nabla f(w)-\nabla f(w')\|\le\beta\|w-w'\|$ for all $w,w'$.
- In words: $\nabla f$ is $\beta$-Lipschitz.

*Verified: definitional part; the Lipschitz ratio itself is sampled numerically in parts 2 and 3.*

**2. Smoothness for every $\beta\ge\lambda_{max}$**

**What is asked.** Prove the Lipschitz inequality of part 1 for every $\beta\ge\lambda_{max}$. The answer is a proof.

**Tool and why.** Compute the gradient of a quadratic, then bound the norm of $Qu$ with the spectral decomposition of $Q$ (cheat sheet §3 and §7). The gradient is linear in $w$, so the whole question reduces to how much $Q$ can stretch a vector.

**Definitions.** Positive definite means here, as in the course, symmetric with positive eigenvalues. Let $Q=\sum_{i=1}^{d}\lambda_iv_iv_i^\top$ be its spectral decomposition, with orthonormal eigenvectors $v_i$ and eigenvalues $\lambda_i$, all positive and at most $\lambda_{max}$. For a pair $w,w'$ we write $u:=w-w'$.

**Solution.**

Step 1, the gradient: differentiating $\frac12\sum_{a,b}w_aQ_{ab}w_b$ by $w_j$ gives $\frac12(Qw+Q^\top w)_j$, and $Q$ is symmetric, so

$$\nabla f(w)=Qw.$$

Step 2, the difference of gradients: by linearity, $\nabla f(w)-\nabla f(w')=Qu$.

Step 3, how much $Q$ stretches $u$: expand $u=\sum_ia_iv_i$ with $a_i:=v_i^\top u$. Then $Qu=\sum_i\lambda_ia_iv_i$, and by orthonormality

$$\begin{aligned}
\|Qu\|^2&=\sum_{i=1}^{d}\lambda_i^2a_i^2\\
&\le\lambda_{max}^2\sum_{i=1}^{d}a_i^2\\
&=\lambda_{max}^2\|u\|^2.
\end{aligned}$$

The second row holds because every $\lambda_i$ lies in the interval from $0$ to $\lambda_{max}$, so $\lambda_i^2\le\lambda_{max}^2$. The third row is Parseval's identity for an orthonormal basis.

Step 4, conclusion: taking square roots and using $\beta\ge\lambda_{max}$,

$$\|\nabla f(w)-\nabla f(w')\|\le\lambda_{max}\|w-w'\|\le\beta\|w-w'\|.$$

This holds for all $w,w'$, so $f$ is $\beta$-smooth.

**In words.** The gradient map is multiplication by $Q$, and $Q$ never stretches a vector by more than its largest eigenvalue.

**Sanity check.** For $Q=\mathrm{diag}(1,3)$ and $u=(1,1)^\top$ we get $Qu=(1,3)^\top$, of norm $\sqrt{10}\approx3.16$, below $3\sqrt2\approx4.24$, which is $\lambda_{max}\|u\|$.

**What to write in the exam.**

- Since $Q$ is symmetric, $\nabla f(w)=Qw$, so the gradient difference is $Q(w-w')$.
- Spectral decomposition: $\|Qu\|^2=\sum_i\lambda_i^2a_i^2$, and this is at most $\lambda_{max}^2\|u\|^2$.
- Hence the gradient difference has norm at most $\lambda_{max}\|w-w'\|$, which is at most $\beta\|w-w'\|$.

*Verified: for random positive definite $Q$ with $d$ from 2 to 6, the ratio $\|Qu\|/\|u\|$ over 20000 random directions never exceeds $\lambda_{max}$ and equals it at the top eigenvector (NumPy).*

**3. No smoothness for $\beta<\lambda_{max}$**

**What is asked.** Show that for each $\beta<\lambda_{max}$ the Lipschitz inequality fails for at least one pair $w,w'$. The answer is an explicit counterexample.

**Tool and why.** Tightness of the bound of part 2 along the top eigenvector (cheat sheet §3): in that direction $Q$ stretches by exactly $\lambda_{max}$, so no smaller constant can work.

**Definitions.** Let $v$ be a unit eigenvector of $Q$ for $\lambda_{max}$, so $Qv=\lambda_{max}v$ and $\|v\|=1$.

**Solution.**

Step 1, the pair: take $w=v$ and $w'=0$.

Step 2, the left-hand side: by part 2, Step 1, the difference $\nabla f(v)-\nabla f(0)$ equals $Qv$, which is $\lambda_{max}v$, and its norm is $\lambda_{max}$ because $\|v\|=1$.

Step 3, the right-hand side: $\beta\|v-0\|=\beta$.

Step 4, the violation: since $\beta<\lambda_{max}$,

$$\|\nabla f(v)-\nabla f(0)\|=\lambda_{max}>\beta=\beta\|v-0\|.$$

So the inequality of part 1 fails for this pair, and $f$ is not $\beta$-smooth.

Step 5, the same failure under the quadratic-bound form: for $t\ne0$, $f(tv)=\frac12\lambda_{max}t^2$, while the bound of part 1, Step 2, at $w=0$ allows only $\frac\beta2t^2$. So that form fails too. Together with part 2, the smallest smoothness constant, which we denote $\beta^*$, is

$$\boxed{\beta^*=\lambda_{max}}$$

**In words.** Along the top eigenvector the gradient grows at rate exactly $\lambda_{max}$, so any smaller constant underestimates it.

**Sanity check.** For $Q=\mathrm{diag}(1,3)$ and $\beta=2$, take $v=e_2$: $\|Qe_2\|=3$, larger than $2$. With $t=1.7$ the function value $\frac32t^2\approx4.34$ exceeds the allowed $t^2\approx2.89$.

**What to write in the exam.**

- Let $v$ be a unit top eigenvector, and take $w=v$ and $w'=0$.
- Then the gradient difference is $Qv$, of norm $\lambda_{max}$.
- This is larger than $\beta\|v-0\|=\beta$, so $f$ is not $\beta$-smooth.

*Verified: for each random $Q$ the top eigenvector attains the ratio $\lambda_{max}$; the numbers $3$, $4.34$ and $2.89$ were computed in NumPy.*

**4. Gradient of the overparameterized objective**

**What is asked.** Write the overparameterized objective as a function of the two layers' weights and compute its gradient with respect to each. The answer is two formulas.

**Tool and why.** End-to-end view of a linear network plus the chain rule (cheat sheet §8). The objective depends on the weights only through the end-to-end vector, so its gradient is the gradient of $f$ pulled back through the product.

**Definitions.** The network $x\mapsto w_2\,(w_1^\top x)$ has a first layer $w_1\in\mathbb{R}^d$ (a $1\times d$ matrix, hidden width $1$) and a second layer $w_2\in\mathbb{R}$. Its end-to-end vector is $w=w_2w_1$. The overparameterized objective is

$$g(w_1,w_2):=f(w_2w_1).$$

**Solution.**

Step 1, write $g$ out: substituting $w=w_2w_1$ into $f$ and pulling out the scalar,

$$g(w_1,w_2)=\frac12 w_2^2\,w_1^\top Qw_1.$$

Step 2, gradient in $w_1$: the factor $w_2^2$ is a constant for $w_1$, and the gradient of $\frac12w_1^\top Qw_1$ is $Qw_1$ by part 2, Step 1.

Step 3, derivative in $w_2$: the factor $w_1^\top Qw_1$ is a constant for $w_2$, and the derivative of $\frac12w_2^2$ is $w_2$. Together:

$$\boxed{\nabla_{w_1}g=w_2^2\,Qw_1,\qquad \frac{\partial g}{\partial w_2}=w_2\,w_1^\top Qw_1}$$

Step 4, check by the chain rule: $\nabla_{w_1}g=w_2\nabla f(w_2w_1)$, which is $w_2Q(w_2w_1)$, the same as Step 2; and $\frac{\partial g}{\partial w_2}=w_1^\top\nabla f(w_2w_1)$, which is $w_2w_1^\top Qw_1$, the same as Step 3.

**In words.** Each layer's gradient is the end-to-end gradient $Qw$ multiplied by the other layer.

**Sanity check.** For $d=1$ and $Q=q$ we get $g=\frac12qw_2^2w_1^2$, whose partial derivatives $qw_2^2w_1$ and $qw_2w_1^2$ match the boxed formulas.

**What to write in the exam.**

- End-to-end: $w=w_2w_1$, so $g(w_1,w_2)=\frac12w_2^2\,w_1^\top Qw_1$.
- Gradients: $\nabla_{w_1}g=w_2^2Qw_1$ and $\partial_{w_2}g=w_2\,w_1^\top Qw_1$.

*Verified: central finite differences agree with both formulas to $3\cdot10^{-8}$ for five random $(Q,w_1,w_2)$ with $d$ up to 6 (NumPy).*

**5. Definition of a critical point**

**What is asked.** Define a critical point of $g$. The answer is a definition.

**Tool and why.** First-order stationarity (cheat sheet §7): a critical point is where gradient flow stands still.

**Definitions.** No new notation.

**Solution.**

Step 1, the definition: $(w_1,w_2)$ is a critical point of $g$ if the full gradient vanishes there, that is, both

$$w_2^2\,Qw_1=0,$$

$$w_2\,w_1^\top Qw_1=0.$$

Step 2, what it does not say: a critical point may be a minimum, a maximum or a saddle; part 6 decides which.

**In words.** No infinitesimal change of either layer changes the objective to first order.

**Sanity check.** The origin $(0,0)$ is critical, and so is every $(w_1,0)$: with $w_2=0$ both expressions are $0$.

**What to write in the exam.**

- A critical point is $(w_1,w_2)$ with $\nabla_{w_1}g=0$ and $\partial_{w_2}g=0$.
- That is, $w_2^2Qw_1=0$ and $w_2\,w_1^\top Qw_1=0$.

*Verified: at $w_2=0$ with $Q=\mathrm{diag}(1,3)$ and $w_1=(5,-2)^\top$ both gradient components are exactly $0$ (NumPy).*

**6. All critical points are global minima**

**What is asked.** Prove that at every critical point of $g$ the value of $g$ equals its global minimum. The answer is a proof.

**Tool and why.** Find the global minimum value first, then case-split on the scalar layer $w_2$ (cheat sheet §7): the first critical-point equation is a product of $w_2^2$ and $Qw_1$, so one of the two must vanish.

**Definitions.** No new notation.

**Solution.**

Step 1, a lower bound: $Q$ is positive definite, so $u^\top Qu\ge0$ for every $u$. With $u=w_2w_1$ this gives $g(w_1,w_2)\ge0$ everywhere.

Step 2, the minimum value: $g(0,0)=0$, so the global minimum of $g$ is $0$, and a point is a global minimum exactly when $g$ is $0$ there.

Step 3, case $w_2=0$: then $g$ is $\frac12\cdot0\cdot w_1^\top Qw_1$, which is $0$, a global minimum.

Step 4, case $w_2\ne0$: the first equation of part 5 is $w_2^2Qw_1=0$. Dividing by $w_2^2\ne0$ gives $Qw_1=0$. A positive definite $Q$ has only positive eigenvalues, so it is invertible, and $w_1=0$. Then $g=0$, again a global minimum.

Step 5, conclusion: the two cases cover all critical points, so every critical point of $g$ is a global minimum. The second equation of part 5 was not even needed.

$$\boxed{\nabla g(w_1,w_2)=0\ \Rightarrow\ g(w_1,w_2)=0=\min g}$$

**In words.** Overparameterization creates new critical points (the whole set $w_2=0$ and the line $w_1=0$), but all of them sit at the bottom: it creates no spurious minima and no saddles above the minimum here.

**Sanity check.** If $Q$ were indefinite, for instance $\mathrm{diag}(1,-1)$, the origin would still be critical but $g$ would take negative values, so it would not be a minimum. Positive definiteness is exactly what Step 1 uses.

**What to write in the exam.**

- Since $Q\succ0$, $g\ge0$, and $g(0,0)=0$, so the minimum value is $0$.
- If $w_2=0$ then $g=0$.
- If $w_2\ne0$ then $Qw_1=0$, so $w_1=0$ because $Q$ is invertible, and $g=0$.
- Hence every critical point is a global minimum.

*Verified: SymPy solves $\nabla g=0$ exactly for $Q=\mathrm{diag}(1,3)$ and $Q=\mathrm{diag}(1,2,5)$ and finds only $w_2=0$ or $w_1=0$, all with $g=0$; gradient descent from 250 random initializations ends near $0$ (NumPy).*

**Common mistakes.**

- Using the Frobenius norm of $Q$ instead of its operator norm: it is a valid constant but larger than $\lambda_{max}$, so it cannot prove that $\lambda_{max}$ is the smallest one.
- In part 3, arguing "the bound of part 2 is not tight" without an explicit pair $w,w'$, or picking a direction that is not the top eigenvector, where the ratio is smaller than $\lambda_{max}$.
- In part 6, treating only the case $w_2\ne0$, or concluding $w_1=0$ from $Qw_1=0$ without invoking invertibility.

**💡 Useful tricks:** For quadratics $\nabla f(w)=Qw$, so smoothness reduces to $\|Q\|_2=\lambda_{max}$ (Lecture 3, Def 1); "prove not $\beta$-smooth" cues an explicit witness pair along the top eigenvector; overparameterized critical points: case-split on the scalar factor ($w_2=0$ vs. $w_2\neq0$).

**⚠️ Watch out:** $\nabla f(w)=Qw$ uses symmetry of $Q$ (else $\tfrac12(Q+Q^\top)w$); prove both regimes, $\beta\ge\lambda_{max}$ works and $\beta<\lambda_{max}$ strictly fails; a critical point requires *all* partials to vanish; $w_1=0$ needs $Q$ invertible ($Q\succ0$).

## Q3 (33 pts) — Finite/countable classes: uniform convergence, PAC-Bayes, and implicit-regularization-aware bounds
**Topics:** hoeffding, uniform-convergence, concentration, pac-bayes, implicit-regularization | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_06_generalization_1, lecture_08_generalization_3, lecture_09_generalization_4
**Statement (English translation):**
(Original is in English; reproduced faithfully.)

Let $\mathcal{H}$ be a finite hypotheses space.

- **(11 pts)** Using Hoeffding's inequality, derive a generalization bound for $\mathcal{H}$ based on uniform convergence.
- **(11 pts)** Derive a similar bound using PAC-Bayes, where the prior is the uniform distribution over $\mathcal{H}$ and the posterior is a deterministic distribution (probability 1 for learned hypothesis, 0 for all the rest). You may use the convention $0\cdot\ln 0=0$.

Assume that $\mathcal{H}$ is countably infinite, i.e. we may write $\mathcal{H}=\{h_k:k\in\mathbb{N}\}$. Suppose that in learning, optimization exhibits an implicit regularization towards hypotheses with low index $k$.

- **(11 pts)** Derive a generalization bound that takes this implicit regularization into account, i.e. in which hypotheses with lower index have tighter guarantee for gap between population and empirical losses.

**Solution sketch:**

**1. Uniform-convergence bound from Hoeffding**

**What is asked.** A bound of the form: with probability at least $1-\delta$ over the sample, every $h\in\mathcal{H}$ has a generalization gap at most some explicit $\epsilon(m,\delta,|\mathcal{H}|)$. The answer is a formula with its derivation.

**Tool and why.** Hoeffding's inequality for one fixed hypothesis, then a union bound over the finite class (cheat sheet §2 and §10). Hoeffding needs the hypothesis fixed before the sample is drawn; the union bound removes that restriction for all of $\mathcal{H}$ at once, and so covers the learned hypothesis too.

**Definitions.** The sample $S=(z_1,\dots,z_m)$ is drawn i.i.d. from $D$, and the loss $\ell(h,z)$ lies in $[0,1]$. The empirical and population losses are $L_S(h)=\frac1m\sum_i\ell(h,z_i)$ and $L_D(h)=\mathbb{E}_{z\sim D}\ell(h,z)$. For a hypothesis $h$ we call $E_h$ the bad event that $|L_D(h)-L_S(h)|\ge\epsilon$. Finally $\delta\in(0,1)$ is the allowed failure probability.

**Solution.**

Step 1, one fixed hypothesis: the numbers $A_i:=\ell(h,z_i)$ are i.i.d., lie in $[0,1]$, have mean $L_D(h)$ and average $L_S(h)$. Hoeffding's inequality (course form) gives

$$P(E_h)\le2e^{-2m\epsilon^2}.$$

Step 2, union over the class: the probability that some bad event happens is at most the sum of their probabilities, so

$$P\Big(\bigcup_{h\in\mathcal{H}}E_h\Big)\le2|\mathcal{H}|e^{-2m\epsilon^2}.$$

Step 3, solve for $\epsilon$: set the right-hand side equal to $\delta$ and take logarithms.

$$\begin{aligned}
2|\mathcal{H}|e^{-2m\epsilon^2}&=\delta\\
-2m\epsilon^2&=\ln\frac{\delta}{2|\mathcal{H}|}\\
\epsilon&=\sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2m}}.
\end{aligned}$$

Step 4, the complement: with probability at least $1-\delta$ no bad event happens, so for every $h$ the gap is below $\epsilon$:

$$\boxed{\forall h\in\mathcal{H}:\ L_D(h)-L_S(h)\le\sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2m}}}$$

Step 5, one-sided variant: the one-sided Hoeffding inequality has no factor $2$, and the same steps give $\ln(|\mathcal{H}|/\delta)$ inside the root. Both answers are accepted; the course form is the one above.

**In words.** Each hypothesis alone is unlikely to fool us; paying a factor $|\mathcal{H}|$ in probability makes this hold for all of them simultaneously, and that factor enters the bound only through its logarithm.

**Sanity check.** With $m=10000$, $\delta=0.05$ and $|\mathcal{H}|=1000$: $\ln40000\approx10.60$, so the gap is at most about $0.0230$ (one-sided: $0.0223$). Doubling $|\mathcal{H}|$ only adds $\ln2$ inside the root.

**What to write in the exam.**

- Fixed $h$: Hoeffding gives $P(E_h)\le2e^{-2m\epsilon^2}$.
- Union bound: failure probability at most $2|\mathcal{H}|e^{-2m\epsilon^2}$; set it to $\delta$.
- With probability at least $1-\delta$, every $h$ has gap at most $\sqrt{\ln(2|\mathcal{H}|/\delta)/(2m)}$.

*Verified: the numbers above in NumPy; a Monte-Carlo run with 50 hypotheses (independent Bernoulli losses, $m=200$, $\delta=0.1$, so $\epsilon\approx0.131$) violated the bound in a fraction $0.0028$ of 20000 samples, below $\delta$.*

**2. The same kind of bound from PAC-Bayes**

**What is asked.** Instantiate the PAC-Bayes theorem with a uniform prior and a point-mass posterior on the learned hypothesis, and compare with part 1. The answer is a formula.

**Tool and why.** The course's PAC-Bayes theorem (cheat sheet §11). All the work is computing the KL divergence of a point mass from the uniform prior, which turns out to be $\ln|\mathcal{H}|$, the same complexity term as in part 1.

**Definitions.** The prior is $P(h)=1/|\mathcal{H}|$ for every $h$; it does not depend on $S$, as the theorem requires. Let $\hat h$ be the learned hypothesis and $Q$ the posterior with $Q(\hat h)=1$ and $Q(h')=0$ for every other $h'$. For a distribution $Q$, $L_D(Q)$ and $L_S(Q)$ are the losses averaged over $h\sim Q$.

**Solution.**

Step 1, the theorem: with probability at least $1-\delta$ over $S$, simultaneously for all posteriors $Q$,

$$L_D(Q)-L_S(Q)\le\sqrt{\frac{\mathrm{KL}(Q\|P)+\ln(2m/\delta)}{2(m-1)}}.$$

Step 2, losses of a point mass: averaging over $h\sim Q$ picks $\hat h$ with probability $1$, so $L_D(Q)=L_D(\hat h)$ and $L_S(Q)=L_S(\hat h)$.

Step 3, the KL divergence: every $h'\ne\hat h$ contributes $0\cdot\ln0=0$ by the convention, and $\hat h$ contributes

$$\begin{aligned}
\mathrm{KL}(Q\|P)&=1\cdot\ln\frac{1}{1/|\mathcal{H}|}\\
&=\ln|\mathcal{H}|.
\end{aligned}$$

Step 4, substitute Steps 2 and 3 into Step 1: with probability at least $1-\delta$,

$$\boxed{L_D(\hat h)-L_S(\hat h)\le\sqrt{\frac{\ln|\mathcal{H}|+\ln(2m/\delta)}{2(m-1)}}}$$

Step 5, comparison with part 1: the complexity term is the same $\ln|\mathcal{H}|$. The constants are slightly worse, $\ln(2m/\delta)$ instead of $\ln(2/\delta)$ and $2(m-1)$ instead of $2m$. The bound is valid for the learned $\hat h$, because PAC-Bayes holds for all posteriors at once, including those chosen after seeing $S$.

**In words.** A point mass that is far from the prior pays in KL; under a uniform prior every hypothesis is equally "far", namely $\ln|\mathcal{H}|$ nats, which is the number of nats needed to name one hypothesis.

**Sanity check.** With the numbers of part 1 the PAC-Bayes gap bound is about $0.0315$, a bit larger than $0.0230$, as Step 5 predicts.

**What to write in the exam.**

- Prior $P(h)=1/|\mathcal{H}|$, posterior a point mass on $\hat h$.
- $\mathrm{KL}(Q\|P)=\ln|\mathcal{H}|$, using $0\cdot\ln0=0$.
- Plug in: the gap of $\hat h$ is at most $\sqrt{(\ln|\mathcal{H}|+\ln(2m/\delta))/(2(m-1))}$.

*Verified: SymPy gives $\mathrm{KL}=\ln n$ for a point mass against the uniform prior on $n$ hypotheses; the value $0.0315$ was computed in NumPy.*

**3. A bound that rewards low index**

**What is asked.** For a countable class $\{h_k\}$, a bound that holds for all $k$ simultaneously and is smaller for smaller $k$. The answer is a formula with its derivation.

**Tool and why.** A non-uniform union bound with confidence weights, as in SRM (cheat sheet §2), or equivalently PAC-Bayes with a non-uniform prior (§11). A plain union bound is impossible, since $|\mathcal{H}|$ is infinite; instead each $h_k$ gets its own share of the failure budget $\delta$, larger for small $k$, so that the shares still sum to $\delta$.

**Definitions.** For $k\in\mathbb{N}$, starting at $1$, let $p_k:=2^{-k}$, the "prior" weight that encodes the preference for low index; these weights sum to $1$. Let $\delta_k:=\delta p_k$ be the failure budget of $h_k$, and $\epsilon_k$ the gap bound we will guarantee for $h_k$.

**Solution.**

Step 1, one fixed $h_k$: as in part 1, Step 1, Hoeffding bounds the probability that $|L_D(h_k)-L_S(h_k)|\ge\epsilon_k$ by $2e^{-2m\epsilon_k^2}$. Setting this to $\delta_k$ and solving as in part 1, Step 3:

$$\epsilon_k=\sqrt{\frac{\ln(2/\delta_k)}{2m}}.$$

Step 2, substitute the budget: since $\delta_k=\delta2^{-k}$,

$$\begin{aligned}
\ln\frac{2}{\delta_k}&=\ln\frac{2\cdot2^k}{\delta}\\
&=k\ln2+\ln\frac2\delta.
\end{aligned}$$

Step 3, union over all $k$: the union bound holds for countably many events, and the geometric series gives

$$\sum_{k=1}^{\infty}\delta_k=\delta\sum_{k=1}^{\infty}2^{-k}=\delta.$$

Step 4, conclusion: with probability at least $1-\delta$, simultaneously for all $k$,

$$\boxed{\forall k\in\mathbb{N}:\ L_D(h_k)-L_S(h_k)\le\sqrt{\frac{k\ln2+\ln(2/\delta)}{2m}}}$$

Step 5, why this captures the implicit regularization: the bound grows with $k$, so if the optimizer returns a hypothesis of low index, its guarantee is tight. The bound holds for all $k$ at once, so it also applies to the index chosen by the algorithm after seeing $S$.

Step 6, the same through PAC-Bayes: take the prior $P(h_k)=2^{-k}$, which is fixed before $S$, and a point mass on the learned $h_k$. As in part 2, Step 3, $\mathrm{KL}=\ln(1/2^{-k})$, which is $k\ln2$, and the gap is at most $\sqrt{(k\ln2+\ln(2m/\delta))/(2(m-1))}$.

Step 7, other weights: if $\mathbb{N}$ starts at $0$, use $2^{-(k+1)}$. Any weights with $\sum_kp_k\le1$ work; for instance $p_k=\frac{6}{\pi^2k^2}$ gives a penalty growing like $2\ln k$ instead of $k\ln2$.

**In words.** We spend more of our confidence on the hypotheses the optimizer is likely to return. Hypothesis $h_k$ costs $k$ bits, so it is treated like a member of a finite class of size $2^k$.

**Sanity check.** With $m=10000$ and $\delta=0.05$ the bound is about $0.0148$ for $k=1$, $0.0230$ for $k=10$, $0.0296$ for $k=20$ and $0.0604$ for $k=100$. At $k=10$ it essentially equals the part 1 bound for $|\mathcal{H}|=1000$, because $2^{10}=1024$.

**What to write in the exam.**

- Weights $p_k=2^{-k}$ with $\sum_kp_k=1$; give $h_k$ confidence $\delta_k=\delta2^{-k}$.
- Hoeffding for each $h_k$, union bound over $k$: total failure probability at most $\delta$.
- With probability at least $1-\delta$, for all $k$, the gap of $h_k$ is at most $\sqrt{(k\ln2+\ln(2/\delta))/(2m)}$.
- Equivalently, PAC-Bayes with prior $2^{-k}$ gives $\mathrm{KL}=k\ln2$.

*Verified: SymPy gives $\sum_k2^{-k}=1$ and $\mathrm{KL}=k\ln2$; a Monte-Carlo run with the first 60 hypotheses ($m=200$, $\delta=0.1$) violated the bound for some $k$ in a fraction $0.0085$ of 20000 samples; the four numbers were computed in NumPy.*

**Common mistakes.**

- Applying Hoeffding directly to the learned $\hat h$: it depends on $S$, so its losses on $S$ are not i.i.d. draws with mean $L_D(\hat h)$; the union bound (or PAC-Bayes) is what makes this legal.
- In part 2, computing the KL as $\ln(1/|\mathcal{H}|)$, a negative number, or quoting PAC-Bayes with $\ln(1/\delta)$ and $2m$ instead of the course constants $\ln(2m/\delta)$ and $2(m-1)$.
- In part 3, giving every $h_k$ the same budget $\delta$, or weights such as $1/k$ whose sum diverges: then the total failure probability is not bounded by $\delta$.

**💡 Useful tricks:** Finite class: fixed-$h$ Hoeffding + union bound at confidence $\delta/|\mathcal{H}|$ (Lecture 6); deterministic posterior collapses $KL(Q\|P)$ to $\ln(1/P(h))$; "tighter for lower index" cues a non-uniform confidence split $\delta p_k$ with $\sum_k p_k\le1$ (e.g. $p_k=2^{-k}$).

**⚠️ Watch out:** Hoeffding needs losses in $[0,1]$ and $h$ fixed before seeing $S$; track the one- vs. two-sided factor 2; PAC-Bayes constants $\ln(2m/\delta)$ and $2(m-1)$ (Lecture 6, Thm 2); state $0\cdot\ln0=0$; verify $\sum_k p_k\le1$.
