# FODL Exam — Moed A 2020
**Date / semester:** July 12th, 2020 — 2019–2020 Spring Semester, Exam Term A
**Total points:** 101

## Q1 (28 pts) — Exponential depth separation for ReLU networks (1D)
**Topics:** depth-separation, hypothesis-class, relu, piecewise-linear | **Pillar:** Expressiveness | **Difficulty:** 4
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_B$ be the hypotheses space corresponding to a fully-connected shallow (2 layer) neural network with 1D input, 1D output, hidden width $B \in \mathbb{N}$, and ReLU activation. Given $L \geq 3$, let $\bar{\mathcal{H}}_{\bar{B}}$ be a hypotheses space corresponding to a similar model but with $L$ layers and hidden widths $\bar{B} \in \mathbb{N}$.

- **(5 pts)** Provide explicit expressions for $\mathcal{H}_B$ and $\bar{\mathcal{H}}_{\bar{B}}$.
- **(15 pts)** Prove that $\bar{\mathcal{H}}_{\bar{B}}$ is exponentially (in $L$) expressively efficient w.r.t. $\mathcal{H}_B$.
- **(8 pts)** If we omit biases from both models, does the expressive efficiency still hold? Prove your answer.

**Solution sketch:**

**1. Explicit expressions for the two classes**

**What is asked.** Write both hypothesis spaces as sets of functions from $\mathbb{R}$ to $\mathbb{R}$, with the shape of every weight stated. The answer is two formulas.

**Tool and why.** A hypothesis class is the set of all functions an architecture computes as its weights range over all real values (cheat sheet §4). Writing the shapes explicitly is what makes "width" and "number of layers" precise, and part 2 counts exactly these.

**Definitions.** $[z]_+ := \max\{z, 0\}$ is the ReLU, and $\sigma$ applies it entrywise to a vector. In the shallow network, hidden unit $i \in [B]$ has input weight $w^{(1)}_i$, bias $b^{(1)}_i$ and output weight $w^{(2)}_i$, and $b^{(2)}$ is the output bias. In the deep network, layer $l \in [L]$ has weight matrix $W_l$ and bias vector $b_l$.

**Solution.**

Step 1, the shallow class: one hidden layer of $B$ ReLU units followed by a linear output unit, so

$$\mathcal{H}_B = \{x \mapsto \sum_{i=1}^{B} w^{(2)}_i\, [\,w^{(1)}_i x + b^{(1)}_i\,]_+ + b^{(2)}\}$$

with all parameters real: $w^{(1)}, b^{(1)}, w^{(2)} \in \mathbb{R}^B$ and $b^{(2)} \in \mathbb{R}$.

Step 2, the deep class: $L$ layers means $L-1$ hidden ReLU layers of width $\bar B$ and one linear output layer, so

$$\bar{\mathcal{H}}_{\bar B} = \{x \mapsto W_L\,\sigma(W_{L-1}\,\sigma(\cdots \sigma(W_1 x + b_1)\cdots) + b_{L-1}) + b_L\}$$

Step 3, the shapes in the deep class, read off from the input dimension $1$, the hidden width $\bar B$ and the output dimension $1$:

$$\begin{aligned}
W_1 &\in \mathbb{R}^{\bar B \times 1}, & b_1 &\in \mathbb{R}^{\bar B},\\
W_l &\in \mathbb{R}^{\bar B \times \bar B}, & b_l &\in \mathbb{R}^{\bar B}, \quad 2 \le l \le L-1,\\
W_L &\in \mathbb{R}^{1 \times \bar B}, & b_L &\in \mathbb{R}.
\end{aligned}$$

**In words.** A shallow network is a sum of $B$ bent lines plus a constant. A deep network alternates an affine map and a ReLU $L-1$ times and ends with an affine map.

**Sanity check.** With $L = 2$ the deep formula has a single hidden layer and becomes the shallow one with $B = \bar B$: take $W_1 = w^{(1)}$, $b_1 = b^{(1)}$, $W_2 = (w^{(2)})^\top$ and $b_2 = b^{(2)}$.

**What to write in the exam.**

- Shallow: $x \mapsto \sum_{i=1}^{B} w^{(2)}_i [w^{(1)}_i x + b^{(1)}_i]_+ + b^{(2)}$, all parameters real.
- Deep: $x \mapsto W_L \sigma(\cdots \sigma(W_1 x + b_1) \cdots) + b_L$ with $\sigma$ the entrywise ReLU.
- Shapes: $W_1$ is $\bar B \times 1$, the middle $W_l$ are $\bar B \times \bar B$, and $W_L$ is $1 \times \bar B$.

*Verified: both formulas were implemented in NumPy and reused in part 2 (the width-3 sawtooth network and the identity-layer embedding).*

**2. Exponential expressive efficiency of depth**

**What is asked.** By the definition of expressive efficiency, two things: (1) containment, every shallow function is realized by a deep network of width $\bar B \in O(B)$; (2) separation, some deep network of small width realizes a function that a shallow network realizes only if $B$ is exponential in $L$. The answer is a proof.

**Tool and why.** Definition 2 of expressive efficiency, exponential version (cheat sheet §4), and piece counting for ReLU networks (cheat sheet §5). A shallow network has few linear pieces, while composing a tent map doubles the number of pieces at every layer. So a function with exponentially many pieces that a narrow deep network computes is the witness, and counting pieces is the whole lower bound.

**Definitions.** The tent map is

$$g(x) := [2x]_+ - [4x-2]_+ + [2x-2]_+,$$

the building block of the witness; it uses three ReLU units. We write $g^{\circ k}$ for $g$ composed with itself $k$ times. The number of pieces of a piecewise linear function is the smallest number of intervals that cover $\mathbb{R}$ such that the function is affine on each of them. We write $P(f)$ for the number of pieces of $f$. We also use $c := (1, -1, 1)^\top$, the output weights that turn the three units of $g$ into $g$.

**Solution.**

Step 1, containment with $\bar B = B$. Let $h \in \mathcal{H}_B$. Take $W_1 = w^{(1)}$ and $b_1 = b^{(1)}$; the first hidden layer outputs the vector $u$ of the $B$ hidden units of $h$, and every entry of $u$ is non-negative. For every middle layer $l$, from $2$ to $L-1$, take $W_l = I$ and $b_l = 0$: since $[t]_+ = t$ for $t \ge 0$, these layers pass $u$ through unchanged. Finally take $W_L = (w^{(2)})^\top$ and $b_L = b^{(2)}$. The deep network computes exactly $h$, so

$$\mathcal{H}_B \subseteq \bar{\mathcal{H}}_{B},$$

which is condition (1) with $\bar B = B$. (A value that may be negative is passed forward as the two channels $[x]_+$ and $[-x]_+$, using $x=[x]_+-[-x]_+$; this costs only a factor $2$ in width.)

Step 2, the tent map region by region, by checking which units are active:

| region | active units | $g(x)$ |
|---|---|---|
| $(-\infty, 0]$ | none | $0$ |
| $[0, \tfrac12]$ | first | $2x$ |
| $[\tfrac12, 1]$ | first two | $2x - (4x-2) = 2 - 2x$ |
| $[1, \infty)$ | all three | $2x - 4x + 2 + 2x - 2 = 0$ |

So $g$ maps $[0,1]$ onto $[0,1]$, rising on the left half and falling on the right half, and it is $0$ outside $[0,1]$.

Step 3, a width-3 deep network computes $g^{\circ (L-1)}$. Take

$$W_1 = (2, 4, 2)^\top, \qquad b_1 = (0, -2, -2)^\top,$$

and for every middle layer $l$, from $2$ to $L-1$, take $W_l = W_1 c^\top$, a $3 \times 3$ matrix, and $b_l = b_1$. The output layer is $W_L = c^\top$ and $b_L = 0$. Let $h_l$ be the output of hidden layer $l$.

**Claim.** For every $l \in [L-1]$, $c^\top h_l = g^{\circ l}(x)$.

The proof is by induction on $l$, upward.

**Base.** $h_1 = \sigma(W_1 x + b_1)$ holds the three units of $g$ at $x$, so $c^\top h_1 = g(x)$ by the definition of $g$.

**Hypothesis.** For some $l \ge 2$, $c^\top h_{l-1} = g^{\circ (l-1)}(x)$.

**Step.** By the choice of $W_l$,

$$h_l = \sigma\big(W_1 (c^\top h_{l-1}) + b_1\big) = \sigma\big(W_1\, g^{\circ (l-1)}(x) + b_1\big),$$

where the second equality is the hypothesis. These are the three units of $g$ at the point $g^{\circ (l-1)}(x)$, so $c^\top h_l = g^{\circ l}(x)$.

The output is $c^\top h_{L-1}$, which by the claim is $g^{\circ (L-1)}(x)$. Hence $g^{\circ (L-1)} \in \bar{\mathcal{H}}_3$: the width is the constant $3$.

Step 4, the pieces of $g^{\circ k}$.

**Claim.** For every $k \ge 1$, on $[0,1]$ the function $g^{\circ k}$ has exactly $2^k$ pieces, namely the intervals $I_j := [\tfrac{j}{2^k}, \tfrac{j+1}{2^k}]$ for $j = 0, \dots, 2^k - 1$; each is mapped affinely onto $[0,1]$ with slope $\pm 2^k$, and the signs alternate. Outside $[0,1]$, $g^{\circ k}$ is $0$.

The proof is by induction on $k$, upward.

**Base.** For $k = 1$ this is the table of Step 2.

**Hypothesis.** The claim holds for some $k \ge 1$.

**Step.** On one interval $I_j$ of length $2^{-k}$, $g^{\circ k}$ is an affine bijection onto $[0,1]$ by the hypothesis. By Step 2, $g$ is affine on $[0, \tfrac12]$ and on $[\tfrac12, 1]$, each mapped onto $[0,1]$ with slope $\pm 2$. So $g^{\circ (k+1)} = g \circ g^{\circ k}$ is affine on each of the two halves of $I_j$, the preimages of $[0, \tfrac12]$ and $[\tfrac12, 1]$, and maps each half onto $[0,1]$ with slope $\pm 2 \cdot 2^k$. The two halves have opposite signs, so they do not merge, and the $2^k$ intervals give $2^{k+1}$ pieces. Outside $[0,1]$ the hypothesis gives $g^{\circ k}(x) = 0$, so $g^{\circ (k+1)}(x)$ equals $g(0)$, which is $0$.

Counting on all of $\mathbb{R}$: the two outer rays have slope $0$ and their neighbours have slope $\pm 2^k$, so nothing merges and

$$P\big(g^{\circ (L-1)}\big) = 2^{L-1} + 2.$$

Step 5, a shallow network has at most $B+1$ pieces. In $h \in \mathcal{H}_B$, unit $i$ is affine on each side of the single point $t_i := -b^{(1)}_i / w^{(1)}_i$; if $w^{(1)}_i = 0$ the unit is constant and has no breakpoint. Between two consecutive points $t_i$ every unit is affine, so $h$ is affine. At most $B$ points cut $\mathbb{R}$ into at most $B+1$ intervals, so $h$ has at most $B+1$ pieces.

Step 6, the lower bound. If $g^{\circ (L-1)} \in \mathcal{H}_B$, Steps 4 and 5 give

$$2^{L-1} + 2 \le B + 1,$$

that is,

$$\boxed{B \ge 2^{L-1} + 1}$$

So the shallow network needs width exponential in $L$, while the deep network uses width $3$. Together with Step 1, $\bar{\mathcal{H}}_{\bar B}$ is exponentially (in $L$) expressively efficient with respect to $\mathcal{H}_B$.

**In words.** Every extra layer folds $[0,1]$ in half once more and doubles the number of teeth. A shallow network gets one bend per neuron, so it has to pay one neuron per tooth.

**Sanity check.** For $L = 3$, $g \circ g$ is a double tent with $4$ pieces on $[0,1]$ plus the two rays, $6 = 2^2 + 2$ pieces, so a shallow network needs $B \ge 5$. Five units do suffice: one ReLU at each breakpoint $0, \tfrac14, \tfrac12, \tfrac34, 1$ with coefficients $4, -8, 8, -8, 4$. So the bound is tight for $L = 3$.

**What to write in the exam.**

- Containment: first layer computes the shallow units, middle layers are the identity (the units are non-negative), output layer is the shallow output; so $\bar B = B$.
- Witness: the tent map $g$ (three units); a width-3 network of depth $L$ computes $g^{\circ (L-1)}$.
- Induction: $g^{\circ k}$ has $2^k$ pieces on $[0,1]$, so $g^{\circ (L-1)}$ has $2^{L-1}+2$ pieces on $\mathbb{R}$.
- Shallow width $B$ gives at most $B+1$ pieces (one breakpoint per unit), so $B \ge 2^{L-1}+1$.

*Verified: exact rational piece count of $g^{\circ (L-1)}$ equals $2^{L-1}+2$ with slopes $\pm 2^{L-1}$ for $L$ from $3$ to $9$; the width-3 network matches $g^{\circ (L-1)}$ on 20001 grid points; the identity-layer embedding matches 200 random shallow networks; the 5-unit network equals $g \circ g$ (Python, fractions and NumPy).*

**3. Removing the biases**

**What is asked.** Decide whether the efficiency survives when every bias is removed from both models, and prove the answer. The answer is "no", with a proof.

**Tool and why.** Positive homogeneity of the ReLU (cheat sheet §5): $[\lambda t]_+ = \lambda [t]_+$ for $\lambda \ge 0$. Without biases every layer is positively homogeneous, so the whole network is; and on a one-dimensional input a positively homogeneous function is determined by two numbers. A width-2 shallow network already realizes all of them, so the separation condition (2) cannot hold.

**Definitions.** $\mathcal{H}^0_B$ and $\bar{\mathcal{H}}^0_{\bar B}$ are the two classes with all biases set to $0$. For a function $f$ in either class we set $\alpha := f(1)$ and $\beta := -f(-1)$; they will turn out to be the two slopes of $f$.

**Solution.**

Step 1, every bias-free network is positively homogeneous. For $\lambda \ge 0$ and any vector $z$, $\sigma(\lambda W z) = \lambda \sigma(W z)$, because the ReLU commutes with non-negative scaling entrywise. The output layer is linear. Applying this layer by layer (induction on the layers) gives

$$f(\lambda x) = \lambda f(x), \qquad \lambda \ge 0,\ x \in \mathbb{R}.$$

Step 2, two slopes. For $x \ge 0$ apply Step 1 with $\lambda = x$ to the point $1$; for $x < 0$ apply it with $\lambda = -x$ to the point $-1$:

$$\begin{aligned}
f(x) &= x f(1) = \alpha x, & x &\ge 0,\\
f(x) &= (-x) f(-1) = \beta x, & x &< 0.
\end{aligned}$$

Both cases together:

$$f(x) = \alpha [x]_+ - \beta [-x]_+.$$

Step 3, a width-2 shallow network realizes $f$: take input weights $(1, -1)$ and output weights $(\alpha, -\beta)$, with no biases. Hence $f \in \mathcal{H}^0_2$.

Step 4, conclusion. Step 3 holds for every deep bias-free network, for every $\bar B$ and every $L$, so

$$\bar{\mathcal{H}}^0_{\bar B} \subseteq \mathcal{H}^0_2.$$

No deep function needs a shallow width larger than $2$, so condition (2) fails: there is no expressive efficiency at all, and in particular no exponential one. Containment (1) still holds (Step 1 of part 2 never used the biases), but the separation is what breaks.

$$\boxed{\text{No: without biases depth gives no expressive efficiency}}$$

**In words.** Without biases every neuron bends only at the origin, and so does every composition of such neurons. Depth cannot create new breakpoints, and two ReLUs already capture both slopes.

**Sanity check.** The tent map loses all its structure without biases: $[2x]_+ - [4x]_+ + [2x]_+$ is $0$ for $x \ge 0$ and $0$ for $x < 0$, so the sawtooth of part 2 collapses to the zero function.

**What to write in the exam.**

- No biases: $[\lambda t]_+ = \lambda [t]_+$ for $\lambda \ge 0$, so $f(\lambda x) = \lambda f(x)$ for the whole network.
- Hence $f(x) = \alpha [x]_+ - \beta [-x]_+$ with $\alpha = f(1)$ and $\beta = -f(-1)$.
- A width-2 bias-free shallow network realizes this, so every deep function lies in $\mathcal{H}^0_2$ and the separation fails.

*Verified: 200 random bias-free deep networks satisfy $f(\lambda x) = \lambda f(x)$ and coincide with $\alpha [x]_+ - \beta [-x]_+$ on 100 points; the bias-free tent is identically $0$ (NumPy).*

**Common mistakes.**

- Proving only the separation and forgetting the containment condition (1); both are part of the definition and both are graded.
- Using "at most $B$ pieces" for a shallow network (it is $B+1$), or counting the sawtooth as $2^L$ pieces and forgetting the two outer rays.
- In part 3, answering "yes" because the sawtooth is built from ReLUs: its breakpoints at $\tfrac12$ and $1$ come from the biases, and without them it is identically $0$.

**💡 Useful tricks:** Shallow width-$B$ ReLU = piecewise linear with $\leq B+1$ pieces (each unit adds one breakpoint); composing a hat/triangle *doubles* oscillations ⇒ a sawtooth with $2^{\Omega(L)}$ pieces (Telgarsky); the containment direction uses the forward-pass identity $x=[x]_+-[-x]_+$; without biases, positive homogeneity collapses everything to two slopes.

**⚠️ Watch out:** prove BOTH directions of expressive efficiency (poly containment AND exponential hardness); state the piece bound exactly ($\leq B+1$); (iii) the answer *flips* without biases — homogeneous $f$ has a single breakpoint at $0$, so a width-2 shallow net suffices and no separation survives.

## Q2 (45 pts) — Landscape and gradient flow of a depth-$N$ width-1 linear network on 1D regression
**Topics:** linear-nn, convexity, gradient-flow, balancedness, conservation-laws, strict-saddle, matrix-factorization | **Pillar:** Optimization | **Difficulty:** 3
**Maps to:** lecture_03_optimization_1, lecture_04_optimization_2, fodl_recitation_gradient_flow
**Statement (English translation):**
Let $\underline{x} = (x_1, x_2, \ldots, x_m) \in \mathbb{R}^m$ and $\underline{y} = (y_1, y_2, \ldots, y_m) \in \mathbb{R}^m$ be vectors holding 1D training instances and labels, respectively. Assume $\underline{x} \neq 0$, $\langle \underline{x}, \underline{y} \rangle > 0$, and consider the empirical $\ell_2$ loss over linear models:

$$L_S : \mathbb{R} \to \mathbb{R}_{\geq 0}\,,\ L_S(w) = \frac{1}{m}\sum\nolimits_{i=1}^m (x_i \cdot w - y_i)^2 = \frac{1}{m}\|\underline{x} \cdot w - \underline{y}\|^2$$

Define $\phi(\cdot)$ to be an overparameterization of $L_S(\cdot)$ with a depth $N \geq 2$ linear neural network having hidden widths 1.

- **(5 pts)** Provide an explicit expression for $\phi(\cdot)$.
- **(8 pts)** Prove that $\phi(\cdot)$ is non-convex.
- **(8 pts)** Prove that $\phi(\cdot)$ has infinitely many global minima.

Assume hereafter that $N = 2$.

- **(8 pts)** Prove that $\phi(\cdot)$ admits the strict saddle property (all of its saddles are strict).
- **(8 pts)** Prove that $\phi(\cdot)$ has no bad local minimum (all of its local minima are global).
- **(8 pts)** Suppose we minimize $\phi(\cdot)$ by running gradient flow starting from an initialization $(w_1(0), w_2(0))$ that meets $w_1(0)^2 - w_2(0)^2 = c$ for some $c > 0$. Suppose also that gradient flow converges to a global minimum $(w_1(\infty), w_2(\infty))$ for which $w_1(\infty) > 0$. Derive closed-form expressions for $w_1(\infty)$ and $w_2(\infty)$.

**Solution sketch:**

**1. Explicit expression for the overparameterized objective**

**What is asked.** Write $\phi$ as an explicit function of the $N$ layer weights. The answer is a formula.

**Tool and why.** A linear network of width $1$ computes the product of its weights times the input, the end-to-end map (cheat sheet §8). Overparameterizing $L_S$ means feeding this product into $L_S$ in place of the single weight $w$.

**Definitions.** $w_i \in \mathbb{R}$ is the weight of layer $i \in [N]$; since every width is $1$, every weight is a scalar.

**Solution.**

Step 1, the network function: layer $i$ multiplies its scalar input by $w_i$, so after $N$ layers the input $x$ becomes $w_N \cdots w_1 x$.

Step 2, substitute the product for $w$ in $L_S$. So $\phi : \mathbb{R}^N \to \mathbb{R}_{\geq 0}$ is

$$\phi(w_1, \ldots, w_N) = L_S\big(\prod_{i=1}^N w_i\big) = \frac{1}{m}\big\|\underline{x}\cdot \prod_{i=1}^N w_i - \underline{y}\big\|^2$$

**In words.** The deep network computes the same linear functions as $L_S$; only the way the single slope is parameterized changes.

**Sanity check.** With $N = 1$ the formula is $L_S(w_1)$, the original objective, as it should be.

**What to write in the exam.**

- A width-1 linear network computes $x \mapsto (\prod_i w_i)\, x$.
- Hence $\phi(w_1, \ldots, w_N) = L_S(\prod_i w_i)$, written out with the norm as above.

*Verified: sympy expansion of $\phi$ for $N = 2$ gives the gradient $L_S'(w_1 w_2)\,(w_2, w_1)$ used in part 4.*

**2. $\phi$ is not convex**

**What is asked.** Prove that $\phi$ is not a convex function. The answer is a counterexample: two points whose midpoint violates the convexity inequality.

**Tool and why.** A convex function satisfies the midpoint inequality $\phi(\tfrac{p+q}{2}) \le \tfrac12\phi(p) + \tfrac12\phi(q)$ (cheat sheet §7). The global minima of $\phi$ lie on a curved set with two sign branches (cheat sheet §8), so two minima on opposite branches have a midpoint that is not a minimum.

**Definitions.** We set

$$w^* := \frac{\langle \underline x, \underline y\rangle}{\|\underline x\|^2},$$

the minimizer of $L_S$. Since $\langle \underline x, \underline y\rangle > 0$ we have $w^* > 0$, so $s := \sqrt{w^*}$ is a real number. The two test points are $p := (s, s, 1, \ldots, 1)$ and $q := (-s, -s, 1, \ldots, 1)$.

**Solution.**

Step 1, expand $L_S$ by opening the square in each term of the sum:

$$L_S(w) = \frac{1}{m}\big(\|\underline x\|^2 w^2 - 2\langle \underline x, \underline y\rangle w + \|\underline y\|^2\big).$$

Step 2, complete the square around $w^*$:

$$L_S(w) = L_S(w^*) + \frac{\|\underline x\|^2}{m}(w - w^*)^2.$$

Since $\underline x \neq 0$, the last term is positive for $w \neq w^*$, so $w^*$ is the unique minimizer of $L_S$.

Step 3, $p$ and $q$ are global minima of $\phi$. Their products are $s \cdot s = w^*$ and $(-s)(-s) = w^*$. Since $\phi(w) = L_S(\prod_i w_i)$ is never below $L_S(w^*)$, both points attain the minimum value $L_S(w^*)$ of $\phi$.

Step 4, the midpoint: $\tfrac{p+q}{2} = (0, 0, 1, \ldots, 1)$, whose product is $0$, so its value is $L_S(0)$. Step 2 with $w = 0$ gives

$$L_S(0) - L_S(w^*) = \frac{\|\underline x\|^2 (w^*)^2}{m} = \frac{\langle \underline x, \underline y\rangle^2}{m\|\underline x\|^2} > 0.$$

Step 5, the violation: by Steps 3 and 4,

$$\phi\Big(\tfrac{p+q}{2}\Big) = L_S(0) > L_S(w^*) = \tfrac12\phi(p) + \tfrac12\phi(q),$$

so the midpoint inequality fails and $\phi$ is not convex.

**Remark.** Not every pair of minima works. For $(2, \tfrac{w^*}{2}, 1, \ldots, 1)$ and $(\tfrac{w^*}{2}, 2, 1, \ldots, 1)$ the midpoint has product $(1 + \tfrac{w^*}{4})^2$, and this equals $w^*$ exactly when $w^* = 4$; then the midpoint is also a minimum and nothing is violated. The $\pm s$ pair has midpoint product $0$ whatever the data.

**In words.** The set of minima is a hyperbola-like surface with a positive and a negative branch. The segment between the branches passes through product $0$, where the loss is worse, which a convex function never allows.

**Sanity check.** Take $m = 1$ and $x_1 = 1$, $y_1 = 1$, so $w^* = 1$. For $N = 2$, $p = (1, 1)$ and $q = (-1, -1)$ give $\phi = 0$, while the midpoint $(0, 0)$ gives $\phi = 1$.

**What to write in the exam.**

- $L_S(w) = L_S(w^*) + \frac{\|\underline x\|^2}{m}(w-w^*)^2$ with $w^* > 0$.
- Points $(\pm\sqrt{w^*}, \pm\sqrt{w^*}, 1, \ldots, 1)$ both have product $w^*$, so both are global minima.
- Their midpoint has product $0$, and $L_S(0) > L_S(w^*)$ because $\langle \underline x, \underline y\rangle > 0$.
- So $\phi$ at the midpoint exceeds the average of the endpoint values: not convex.

*Verified: sympy confirms the completed square and the gap $\langle \underline x, \underline y\rangle^2/(m\|\underline x\|^2)$, finds that the old midpoint pair degenerates exactly at $w^* = 4$, and random data with $N \in \{2, 3, 5\}$ give a strict violation for the $\pm s$ pair.*

**3. Infinitely many global minima**

**What is asked.** Show that the set of global minimizers of $\phi$ is infinite. The answer is an explicit infinite family.

**Tool and why.** $\phi$ is $L_S$ composed with the product map (cheat sheet §8), so its minimum is attained exactly where the product equals $w^*$, and that set is infinite because one layer can be scaled up while another is scaled down.

**Definitions.** For $\alpha \neq 0$ let $u(\alpha) := (\alpha, \tfrac{w^*}{\alpha}, 1, \ldots, 1)$.

**Solution.**

Step 1, a lower bound: by Step 2 of part 2, for every $w$,

$$\phi(w) = L_S\big(\prod_i w_i\big) \ge L_S(w^*),$$

with equality if and only if $\prod_i w_i = w^*$.

Step 2, the bound is attained, for example at $u(1)$, so the minimum value of $\phi$ is $L_S(w^*)$ and the global minimizers are exactly the points with $\prod_i w_i = w^*$.

Step 3, the family: the product of the entries of $u(\alpha)$ is $\alpha \cdot \tfrac{w^*}{\alpha} = w^*$, so every $u(\alpha)$ is a global minimizer. Different values of $\alpha$ give different first coordinates, hence different points, and $\alpha$ ranges over the infinite set $\mathbb{R} \setminus \{0\}$.

$$\boxed{\{(\alpha, w^*/\alpha, 1, \ldots, 1) : \alpha \neq 0\} \text{ are all global minima}}$$

**In words.** Multiplying one layer by $\alpha$ and dividing another by $\alpha$ leaves the end-to-end map, and hence the loss, unchanged. This rescaling symmetry alone produces a continuum of minima.

**Sanity check.** With $N = 2$ and $w^* = 1$: the points $(1, 1)$, $(2, \tfrac12)$ and $(-1, -1)$ all have product $1$ and the same minimal loss.

**What to write in the exam.**

- $\phi \ge L_S(w^*)$, with equality exactly when $\prod_i w_i = w^*$.
- For every $\alpha \neq 0$ the point $(\alpha, w^*/\alpha, 1, \ldots, 1)$ attains it, giving infinitely many minima.

*Verified: for random data, $\phi(u(\alpha))$ equals $L_S(w^*)$ up to $10^{-12}$ for many values of $\alpha$, and $\phi$ never falls below it on random points (NumPy).*

**4. The strict saddle property for $N = 2$**

**What is asked.** Show that every critical point of $\phi$ that is not a local minimum has a Hessian with a strictly negative eigenvalue. The answer is a list of the critical points and the Hessian at the non-minima.

**Tool and why.** Critical points and second-order classification (cheat sheet §7): find all zeros of the gradient, discard the global minima, and compute the eigenvalues of the Hessian at what remains. For $N = 2$ the chain rule gives everything in closed form.

**Definitions.** Now $\phi(w_1, w_2) = L_S(w_1 w_2)$. From Step 1 of part 2, the derivatives of $L_S$ are

$$L_S'(w) = \frac{2}{m}\big(\|\underline x\|^2 w - \langle \underline x, \underline y\rangle\big), \qquad L_S'' = \frac{2\|\underline x\|^2}{m}.$$

Note that $L_S'(w) = 0$ only at $w = w^*$.

**Solution.**

Step 1, the gradient, by the chain rule:

$$\nabla\phi(w_1,w_2) = L_S'(w_1w_2)\,(w_2, w_1)$$

Step 2, the critical points. The gradient vanishes when $L_S'(w_1 w_2) = 0$, which means $w_1 w_2 = w^*$; or otherwise when $w_2 = 0$ and $w_1 = 0$. The second case is consistent, since the product there is $0$ and $L_S'(0) \neq 0$. So the critical points are the curve $w_1 w_2 = w^*$ and the origin.

Step 3, the curve consists of global minima (part 3), so these points are not saddles.

Step 4, the Hessian. Differentiating Step 1 once more with the product and chain rules:

$$\nabla^2\phi(w_1,w_2) = L_S''\begin{pmatrix} w_2^2 & w_1w_2 \\ w_1w_2 & w_1^2\end{pmatrix} + L_S'(w_1w_2)\begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}.$$

At the origin the first matrix is $0$, so the Hessian is

$$\begin{pmatrix} 0 & L_S'(0) \\ L_S'(0) & 0\end{pmatrix}$$

Step 5, the sign. Substituting $w = 0$ in $L_S'$ gives $L_S'(0) = -\frac{2}{m}\langle \underline x, \underline y\rangle$, which is negative because $\langle \underline x, \underline y\rangle > 0$.

Step 6, the eigenvalues. The matrix with $0$ on the diagonal and $1$ off it has eigenvalues $+1$ and $-1$, with eigenvectors $(1, 1)$ and $(1, -1)$. Multiplying by $L_S'(0)$, the Hessian at the origin has eigenvalues

$$\pm\frac{2}{m}\langle\underline x,\underline y\rangle,$$

and the negative one, $-\frac{2}{m}\langle\underline x,\underline y\rangle$, belongs to the direction $(1, 1)$. The Hessian is indefinite, so the origin is a saddle, and it has a strictly negative eigenvalue, so the saddle is strict. It is the only saddle, so $\phi$ has the strict saddle property.

**In words.** From the origin, moving along $w_1 = w_2$ makes the product positive and moves it toward $w^*$, so the loss drops; moving along $w_1 = -w_2$ makes the product negative and the loss rises. That is a saddle with a genuine descent direction.

**Sanity check.** With $m = 1$ and $x_1 = 1$, $y_1 = 1$, $\phi = (w_1 w_2 - 1)^2$. Its Hessian at the origin has off-diagonal entries $-2$ and eigenvalues $\pm 2$, matching $\pm\frac{2}{m}\langle \underline x, \underline y\rangle$.

**What to write in the exam.**

- Gradient $L_S'(w_1 w_2)\,(w_2, w_1)$; it vanishes on the curve $w_1 w_2 = w^*$ (global minima) and at the origin.
- At the origin the Hessian is $L_S'(0)$ times the swap matrix, with $L_S'(0) = -\frac{2}{m}\langle \underline x, \underline y\rangle$.
- Its eigenvalues are $\pm\frac{2}{m}\langle\underline x,\underline y\rangle$; the negative one makes the only saddle strict.

*Verified: sympy computes the gradient, the Hessian at the origin and its eigenvalues $\pm 2\langle \underline x, \underline y\rangle/m$ symbolically.*

**5. No bad local minima for $N = 2$**

**What is asked.** Show that every local minimum of $\phi$ is a global minimum. The answer is a proof.

**Tool and why.** A local minimum of a differentiable function is a critical point (first-order condition, cheat sheet §7). Part 4 lists all critical points, so it remains to rule out the origin.

**Definitions.** No new notation.

**Solution.**

Step 1, a local minimum has zero gradient, so by Step 2 of part 4 it is either on the curve $w_1 w_2 = w^*$ or at the origin.

Step 2, the origin is not a local minimum. Along the direction $(1, 1)$, by Step 1 of part 2,

$$\phi(t,t) - \phi(0,0) = L_S(t^2) - L_S(0) = \frac{t^2}{m}\big(\|\underline x\|^2 t^2 - 2\langle \underline x, \underline y\rangle\big).$$

The bracket is negative whenever $t^2 < 2w^*$, so every neighbourhood of the origin contains points with a smaller value. (This is also immediate from the negative eigenvalue of part 4.)

Step 3, the remaining critical points, the curve $w_1 w_2 = w^*$, are global minima by part 3. Hence every local minimum is global.

$$\boxed{\text{every local minimum of } \phi \text{ is global}}$$

**In words.** The only critical point that is not a global minimum is the origin, and it has a descent direction. Nothing else is left to trap a local search.

**Sanity check.** With $m = 1$ and $x_1 = 1$, $y_1 = 1$, $\phi(t, t) - \phi(0, 0)$ equals $t^4 - 2t^2$, negative for $t \neq 0$ with $|t| < \sqrt2$, in agreement with $2w^* = 2$.

**What to write in the exam.**

- Local minimum implies critical point, so it is on the curve or at the origin.
- At the origin, $\phi(t,t) < \phi(0,0)$ for small $t \neq 0$ (or: negative Hessian eigenvalue), so it is not a local minimum.
- Points on the curve are global minima, so every local minimum is global.

*Verified: sympy confirms the expansion of $\phi(t,t) - \phi(0,0)$, and the sign check holds for random data.*

**6. The limit of gradient flow from an unbalanced start**

**What is asked.** Closed-form expressions for $w_1(\infty)$ and $w_2(\infty)$, given the initial imbalance $c > 0$ and that the limit is a global minimum with $w_1(\infty) > 0$. The answer is two formulas.

**Tool and why.** Conservation of balancedness under gradient flow (cheat sheet §8): the difference $w_1^2 - w_2^2$ does not change along the flow. Together with the product condition of a global minimum this gives two equations in two unknowns.

**Definitions.** Gradient flow is $\dot w(t) = -\nabla\phi(w(t))$. We write $\delta(t) := w_1(t)^2 - w_2(t)^2$ for the imbalance, introduced because it is the conserved quantity. We write $a := w_1(\infty)^2$, introduced to turn the two equations into one quadratic.

**Solution.**

Step 1, the flow equations, from the gradient of part 4: $\dot w_1 = -L_S'(w_1 w_2)\, w_2$ and $\dot w_2 = -L_S'(w_1 w_2)\, w_1$.

Step 2, the imbalance is conserved:

$$\begin{aligned}
\tfrac{d}{dt}\delta &= 2w_1\dot w_1 - 2w_2\dot w_2\\
&= -2L_S'(w_1w_2)\,w_1w_2 + 2L_S'(w_1w_2)\,w_1w_2\\
&= 0.
\end{aligned}$$

So $\delta(t) = c$ for all $t$, and by continuity also in the limit: $w_1(\infty)^2 - w_2(\infty)^2 = c$.

Step 3, the limit is a global minimum, so by part 3 it satisfies $w_1(\infty)\,w_2(\infty) = w^*$.

Step 4, eliminate $w_2$. Since $w_1(\infty) > 0$, Step 3 gives $w_2(\infty) = w^*/w_1(\infty)$. Substituting into Step 2 and multiplying by $a$:

$$a - \frac{(w^*)^2}{a} = c, \qquad a^2 - c\,a - (w^*)^2 = 0.$$

Step 5, choose the root. The quadratic has roots

$$a = \frac{c \pm \sqrt{c^2 + 4(w^*)^2}}{2}.$$

Their product is $-(w^*)^2 < 0$, so exactly one root is positive, the one with $+$; and $a = w_1(\infty)^2$ must be positive.

Step 6, take the positive square root, since $w_1(\infty) > 0$, and then use Step 3:

$$\boxed{\,w_1(\infty) = \sqrt{\tfrac{c + \sqrt{c^2 + 4(w^*)^2}}{2}}\,}$$

$$\boxed{\,w_2(\infty) = w^* / w_1(\infty)\,}$$

where $w^* = \langle \underline x, \underline y\rangle/\|\underline x\|^2$. In particular $w_2(\infty) > 0$ as well.

**In words.** Gradient flow cannot change the imbalance between the two layers. Among all the minima on the curve $w_1 w_2 = w^*$ it lands on the single one with the same imbalance $c$ as the starting point.

**Sanity check.** As $c \to 0$ both formulas tend to $\sqrt{w^*}$: a balanced start ends balanced. For $c = 1$ and $w^* = 1$, $w_1(\infty)^2$ is $\tfrac{1+\sqrt5}{2} \approx 1.618$ and $w_2(\infty)^2 \approx 0.618$; their difference is $1$ and the product of $w_1(\infty) \approx 1.272$ and $w_2(\infty) \approx 0.786$ is $1$.

**What to write in the exam.**

- Along gradient flow, $\tfrac{d}{dt}(w_1^2 - w_2^2) = 0$, so $w_1(\infty)^2 - w_2(\infty)^2 = c$.
- At a global minimum, $w_1(\infty) w_2(\infty) = w^*$.
- Eliminate $w_2$: $a^2 - ca - (w^*)^2 = 0$ with $a = w_1(\infty)^2$; take the positive root and the positive square root.
- Then $w_2(\infty) = w^*/w_1(\infty)$, with $w^* = \langle \underline x, \underline y\rangle/\|\underline x\|^2$.

*Verified: sympy checks that the closed form satisfies both equations; an RK4 integration of gradient flow on 5 random datasets reaches the closed-form point to within $10^{-6}$, with drift of $\delta$ below $10^{-11}$.*

**Common mistakes.**

- In part 2, taking two minima such as $(2, \tfrac{w^*}{2}, \ldots)$ and $(\tfrac{w^*}{2}, 2, \ldots)$ and saying "for a generic choice": for $w^* = 4$ the midpoint is itself a minimum and the argument proves nothing.
- In part 4, listing only the curve of minima as critical points and forgetting the origin, or forgetting to check that $L_S'(0) < 0$ actually uses $\langle \underline x, \underline y\rangle > 0$.
- In part 6, treating $w_1^2 + w_2^2$ as conserved, or taking the negative root of the quadratic, which gives a negative $w_1(\infty)^2$.

**💡 Useful tricks:** Non-convexity is cleanest from the *minimizer set* $\{\prod_i w_i=w^*\}$ being non-convex (or Jensen at a midpoint); the same set gives infinitely many minima $\{(\alpha,w^*/\alpha,1,\dots)\}$; for $N=2$ the origin's Hessian has eigenvalues $\pm\frac2m\langle x,y\rangle$; conservation $w_1^2-w_2^2=c$ plus $w_1w_2=w^*$ solves the endpoint in closed form.

**⚠️ Watch out:** the strict-saddle sign needs $\langle x,y\rangle>0$ (given) so $L_S'(0)<0$; classify EVERY critical point (origin vs. the product manifold) to conclude "no bad local min"; in (vi) pick the correct root ($w_1(\infty)>0$) and recall $w^*=\langle x,y\rangle/\|x\|^2$.

## Q3 (28 pts) — Implicit bias of GD to the min-norm solution and norm-based generalization
**Topics:** implicit-bias, implicit-regularization, min-norm, gradient-descent, rademacher, norm-bounds, uniform-convergence | **Pillar:** Generalization | **Difficulty:** 3
**Maps to:** lecture_07_generalization_2, lecture_06_generalization_1, fodl_recitation_optimization_2_radamacher
**Statement (English translation):**
Let $\{\underline{x}_i \in \mathbb{R}^d\}_{i=1}^m$ and $\{y_i \in \mathbb{R}\}_{i=1}^m$ be training instances and labels, respectively. Assume that $d > m$, and that $\{\underline{x}_i \in \mathbb{R}^d\}_{i=1}^m$ are linearly independent. Suppose we train a linear predictor by minimizing the empirical loss:

$$L_S : \mathbb{R}^d \to \mathbb{R}_{\geq 0}\,,\ L_S(\underline{w}) = \frac{1}{m}\sum\nolimits_{i=1}^m \ell\,(y_i, \langle \underline{x}_i, \underline{w}\rangle)$$

where $\ell : \mathbb{R} \times \mathbb{R} \to [0,1]$ is $\rho$-Lipschitz in its second argument, and equal to zero if and only if its two arguments are equal.

- **(15 pts)** Prove that if we run gradient descent over $L_S(\cdot)$ starting from zero initialization, and converge to a global optimum, this global optimum will be the one with minimum Euclidean norm.

Assume now that the training set $S = \{(\underline{x}_i, y_i)\}_{i=1}^m$ is drawn i.i.d. from a distribution $\mathcal{D}$ over $\mathbb{R}^d \times \mathbb{R}$. For $r \in \mathbb{R}_{>0}$, denote $\mathcal{H}_r := \{\underline{x} \to \langle \underline{w}, \underline{x}\rangle : \underline{w} \in \mathbb{R}^d, \|\underline{w}\| \leq r\}$. It is known that the Rademacher complexity corresponding to $\mathcal{H}_r$ satisfies $R(\ell \circ \mathcal{H}_r \circ S) \leq (\rho \cdot r \cdot \max_{i \in [m]}\|\underline{x}_i\|)/\sqrt{m}$.

- **(8 pts)** Derive a generalization bound that takes the implicit regularization of gradient descent into account, i.e. by which a lower Euclidean norm of the learned hypothesis yields a tighter bound on generalization gap.
- **(5 pts)** If $\mathcal{D}$ was such that a label $y_i$ is independent of its instance $\underline{x}_i$, what would you expect from the Euclidean norm of the learned hypothesis? Explain your answer (qualitatively).

**Solution sketch:**

**1. Gradient descent from zero reaches the minimum-norm global optimum**

**What is asked.** Prove that if gradient descent from $\underline w = 0$ converges to a global optimum of $L_S$, then that optimum is the one with the smallest Euclidean norm. The answer is a proof.

**Tool and why.** The implicit bias of gradient descent in overparameterized linear models (cheat sheet §12): every gradient is a combination of the training inputs, so the iterates never leave their span. Linear algebra (cheat sheet §3) then shows that the span contains exactly one interpolating vector, and Pythagoras shows it is the shortest one.

**Definitions.** $X \in \mathbb{R}^{m \times d}$ is the matrix whose rows are $\underline x_1^\top, \ldots, \underline x_m^\top$, and $V := \mathrm{span}\{\underline x_i\}$ is its row space. We write $\partial_2\ell$ for the derivative of $\ell$ in its second argument (we assume it exists, otherwise gradient descent is not defined). The iterates are $\underline w_{t+1} = \underline w_t - \eta \nabla L_S(\underline w_t)$ with $\underline w_0 = 0$ and step size $\eta > 0$, and $\hat{\underline w}$ is their limit. Finally

$$\underline w^\circ := X^\top (X X^\top)^{-1} \underline y,$$

the candidate answer; Step 3 shows that it is well defined.

**Solution.**

Step 1, every gradient lies in $V$. By the chain rule,

$$\nabla L_S(\underline w) = \frac{1}{m}\sum_i \partial_2\ell(y_i, \langle \underline x_i, \underline w\rangle)\, \underline x_i \in V := \mathrm{span}\{\underline x_i\}$$

because the right-hand side is a linear combination of the $\underline x_i$.

Step 2, every iterate lies in $V$, by induction on $t$.

**Base.** $\underline w_0 = 0 \in V$.

**Hypothesis.** $\underline w_t \in V$ for some $t \ge 0$.

**Step.** $\underline w_{t+1}$ is $\underline w_t$ minus $\eta$ times a gradient; both are in $V$ (the hypothesis and Step 1), and $V$ is a subspace, so $\underline w_{t+1} \in V$.

A finite-dimensional subspace is closed, so the limit $\hat{\underline w}$ is also in $V$.

Step 3, a global optimum means interpolation. Since $\ell \ge 0$, $L_S \ge 0$. The rows of $X$ are linearly independent, so the $m \times m$ Gram matrix $X X^\top$ is invertible and $\underline w^\circ$ is well defined. It satisfies $X \underline w^\circ = \underline y$, so every term of $L_S(\underline w^\circ)$ is $\ell(y_i, y_i) = 0$. Hence the optimal value is $0$. A sum of non-negative terms is $0$ only if every term is $0$, and $\ell$ vanishes only when its two arguments are equal, so

$$L_S(\underline w) = 0 \iff \langle \underline x_i, \underline w\rangle = y_i \text{ for all } i.$$

Step 4, $V$ contains exactly one interpolating vector. A vector in $V$ has the form $X^\top \alpha$ with $\alpha \in \mathbb{R}^m$. It interpolates when $X X^\top \alpha = \underline y$, and since $X X^\top$ is invertible this forces $\alpha = (X X^\top)^{-1} \underline y$, that is, the vector $\underline w^\circ$. The limit $\hat{\underline w}$ lies in $V$ (Step 2) and is a global optimum (assumption), so $\hat{\underline w} = \underline w^\circ$.

Step 5, $\underline w^\circ$ has minimal norm. Let $\underline w$ be any global optimum and split it as $\underline w = \underline w_V + \underline w_\perp$ with $\underline w_V \in V$ and $\underline w_\perp$ orthogonal to $V$. Then $\langle \underline x_i, \underline w_\perp\rangle = 0$ for every $i$, so $\underline w_V$ interpolates as well, and by Step 4 $\underline w_V = \underline w^\circ$. By Pythagoras

$$\|\underline w\|^2 = \|\underline w^\circ\|^2 + \|\underline w_\perp\|^2 \ge \|\underline w^\circ\|^2,$$

with equality only when $\underline w_\perp = 0$, that is, when $\underline w = \underline w^\circ$. So

$$\boxed{\hat{\underline w} = X^\top (X X^\top)^{-1} \underline y = \arg\min\{\|\underline w\| : L_S(\underline w) = 0\}}$$

**In words.** Gradient descent only ever moves along directions spanned by the data. The component orthogonal to the data starts at $0$ and never changes, and such a component would only add length without improving the fit.

**Sanity check.** Take $m = 1$, $d = 2$, $\underline x_1 = (1, 0)$ and $y_1 = 3$. The interpolators are $(3, t)$ for any $t$. Gradient descent moves only along $(1, 0)$, so it ends at $(3, 0)$, whose norm $3$ is the smallest of all the norms $\sqrt{9 + t^2}$.

**What to write in the exam.**

- Each gradient is a combination of the $\underline x_i$, so by induction every iterate, and the limit, is in $V$.
- Global optimum means $L_S = 0$, which means $\langle \underline x_i, \underline w\rangle = y_i$ for all $i$; this is feasible since $X X^\top$ is invertible.
- In $V$ the only interpolator is $X^\top (X X^\top)^{-1} \underline y$, so the limit is this vector.
- Any other interpolator equals it plus an orthogonal part, so by Pythagoras it is longer.

*Verified: gradient descent with the bounded Lipschitz loss $1 - e^{-(y-z)^2}$ on 5 random problems with $m = 4$ and $d = 20$ keeps the iterates in $V$ to $10^{-10}$ and ends within $10^{-6}$ of $X^\top (X X^\top)^{-1} \underline y$; adding an orthogonal vector to it always increased the norm (NumPy).*

**2. A generalization bound that rewards a small norm**

**What is asked.** A bound on $L_{\mathcal D}(\hat{\underline w}) - L_S(\hat{\underline w})$, holding with probability at least $1 - \delta$, that gets smaller as $\|\hat{\underline w}\|$ gets smaller. The answer is an explicit inequality.

**Tool and why.** The Rademacher generalization theorem (cheat sheet §11) for a class of fixed radius, made norm-adaptive by a union bound over radii with summable weights (cheat sheet §2 and §11). We cannot simply plug $r = \|\hat{\underline w}\|$ into one application of the theorem, because $\hat{\underline w}$ depends on $S$ and the class must be fixed before the sample is drawn. The union bound makes every radius valid at once, and then we may choose the radius after seeing $\hat{\underline w}$.

**Definitions.** $M_S := \max_{i \in [m]}\|\underline x_i\|$, the largest input norm in the sample. For $k \in \mathbb{N}$ we use the class $\mathcal{H}_k$ of radius $k$ and the confidence share

$$\delta_k := \frac{6\delta}{\pi^2 k^2}.$$

Finally $\hat k := \max\{1, \lceil\|\hat{\underline w}\|\rceil\}$, the smallest integer radius whose class contains $\hat{\underline w}$.

**Solution.**

Step 1, the theorem for one fixed class (course form, valid since $\ell$ takes values in $[0,1]$): for any $\delta' > 0$, with probability at least $1 - \delta'$, for all $h \in \mathcal{H}$,

$$L_{\mathcal D}(h) - L_S(h) \le 2R(\ell \circ \mathcal{H} \circ S) + 4\sqrt{\frac{2\ln(4/\delta')}{m}}.$$

Step 2, apply it to $\mathcal{H}_k$ with $\delta' = \delta_k$ and insert the given bound on the Rademacher complexity: with probability at least $1 - \delta_k$, for all $h \in \mathcal{H}_k$,

$$L_{\mathcal D}(h) - L_S(h) \le \frac{2\rho\, k\, M_S}{\sqrt m} + 4\sqrt{\frac{2\ln(4/\delta_k)}{m}}.$$

Step 3, the union bound over $k$. The failure probabilities add up to

$$\sum_{k=1}^{\infty} \delta_k = \frac{6\delta}{\pi^2}\sum_{k=1}^{\infty}\frac{1}{k^2} = \frac{6\delta}{\pi^2}\cdot\frac{\pi^2}{6} = \delta.$$

So with probability at least $1 - \delta$, the inequality of Step 2 holds for every $k$ simultaneously.

Step 4, choose the radius. On that event, take $k = \hat k$: then $\hat{\underline w} \in \mathcal{H}_{\hat k}$, and $\hat k \le \|\hat{\underline w}\| + 1$. Also $4/\delta_k$ equals $2\pi^2 k^2/(3\delta)$. Both terms of Step 2 increase with $k$, so we may replace $\hat k$ by $\|\hat{\underline w}\| + 1$. With probability at least $1 - \delta$:

$$\boxed{L_{\mathcal D}(\hat{\underline w}) - L_S(\hat{\underline w}) \le \frac{2\rho(\|\hat{\underline w}\|+1)M_S}{\sqrt m} + 4\sqrt{\frac{2\ln\big(2\pi^2(\|\hat{\underline w}\|+1)^2/(3\delta)\big)}{m}}}$$

Step 5, combine with part 1. Gradient descent interpolates, so $L_S(\hat{\underline w}) = 0$ and the bound controls $L_{\mathcal D}(\hat{\underline w})$ itself. Its leading term grows linearly in $\|\hat{\underline w}\|$, and part 1 says gradient descent returns the interpolator of smallest norm, so among all zero-loss solutions the bound is tightest for the one gradient descent actually returns.

**In words.** We pay for the size of the class the learned hypothesis actually lives in, not for a worst-case class chosen in advance. The price of not knowing the radius ahead of time is only a logarithmic term.

**Sanity check.** If $\|\hat{\underline w}\| \le 1$ then $\hat k = 1$, and the bound is the fixed-radius bound with $\delta$ replaced by $\tfrac{6}{\pi^2}\delta \approx 0.61\delta$: a mild cost. If $\|\hat{\underline w}\|$ stays bounded as $m$ grows, the bound tends to $0$ at rate $1/\sqrt m$.

**What to write in the exam.**

- For a fixed radius $k$: gap at most $2\rho k M_S/\sqrt m + 4\sqrt{2\ln(4/\delta_k)/m}$, with probability at least $1 - \delta_k$.
- Weights $\delta_k = 6\delta/(\pi^2 k^2)$ sum to $\delta$, so all radii hold together.
- Use $k = \max\{1, \lceil\|\hat{\underline w}\|\rceil\}$, at most $\|\hat{\underline w}\| + 1$, to get the boxed bound.
- Smaller learned norm gives a tighter bound, and gradient descent picks the smallest interpolating norm.

*Verified: the partial sums of $6/(\pi^2 k^2)$ up to $k = 2 \cdot 10^6$ give $0.9999997$; the identity $4/\delta_k = 2\pi^2k^2/(3\delta)$ was checked numerically (NumPy).*

**3. Labels independent of the instances**

**What is asked.** A qualitative prediction of $\|\hat{\underline w}\|$ when each label is independent of its instance, with an explanation. The answer is "large, growing with $m$", with a reason.

**Tool and why.** Read the bound of part 2 backwards (cheat sheet §12, random labels and vacuous bounds): if the test loss cannot be small while the training loss is $0$, then the bound must be large, and the only thing in it that can be large is the norm.

**Definitions.** We write $\varepsilon_0 > 0$ for a lower bound on the population loss of any predictor, explained in Step 2. $M_S$ is as in part 2.

**Solution.**

Step 1, the training loss is still $0$. Part 1 used only $d > m$ and the linear independence of the $\underline x_i$, not the labels, so gradient descent still interpolates: $L_S(\hat{\underline w}) = 0$.

Step 2, the population loss stays large. On a fresh pair $(\underline x, y)$ the label is independent of $\underline x$, and $\hat{\underline w}$ depends only on the training set, so the prediction $\langle \hat{\underline w}, \underline x\rangle$ carries no information about $y$. Unless $y$ is almost surely a constant, $\ell(y, \langle \hat{\underline w}, \underline x\rangle)$ is positive with positive probability, so $L_{\mathcal D}(\hat{\underline w})$ is at least some $\varepsilon_0 > 0$ that does not shrink as $m$ grows.

Step 3, the bound forces a large norm. The bound of part 2 still holds with probability at least $1 - \delta$, so

$$\varepsilon_0 \le \frac{2\rho(\|\hat{\underline w}\|+1)M_S}{\sqrt m} + 4\sqrt{\frac{2\ln\big(2\pi^2(\|\hat{\underline w}\|+1)^2/(3\delta)\big)}{m}}.$$

The second term goes to $0$ as $m$ grows (the norm enters only through a logarithm), so for large $m$ the first term must stay of order $\varepsilon_0$. This requires $(\|\hat{\underline w}\| + 1) M_S$ to be of order $\varepsilon_0 \sqrt m/(2\rho)$: the norm grows at least like $\sqrt m$, measured in units of $1/M_S$.

Step 4, the contrast with real labels. If $y = \langle \underline w_0, \underline x\rangle$ for a fixed $\underline w_0$, then $\underline w_0$ interpolates every training set, so the minimum-norm interpolator has $\|\hat{\underline w}\| \le \|\underline w_0\|$, which is bounded, and the bound tends to $0$.

Conclusion: with independent labels we expect a large norm that grows with $m$, so the bound of part 2 becomes loose (vacuous), which is consistent with the fact that no generalization is possible here.

**In words.** Memorizing noise requires a long, finely tuned weight vector; a real signal is explained by a short one. The norm is exactly the quantity that tells the two situations apart, and this is the moral of Zhang et al.

**Sanity check.** A simulation with $d = 4000$ and inputs of norm about $1$: with random $\pm 1$ labels the minimum-norm interpolator has norm $7.1$, $14.6$, $31.5$ and $50.5$ for $m = 50, 200, 800, 1600$, about $\sqrt m$ or more; with labels $\langle \underline w_0, \underline x\rangle$ and $\|\underline w_0\| = 1$ the norms are $0.10$, $0.23$, $0.45$ and $0.64$, all at most $1$.

**What to write in the exam.**

- Gradient descent still interpolates, so $L_S(\hat{\underline w}) = 0$, but $L_{\mathcal D}(\hat{\underline w})$ stays bounded away from $0$ because the labels carry no signal.
- The bound of part 2 is valid, so its norm term must be large: $\|\hat{\underline w}\|$ grows roughly like $\sqrt m$.
- Expect a large norm and a loose, vacuous bound; with real labels the norm stays bounded.

*Verified: NumPy simulation with $d = 4000$, $x$ drawn from $N(0, I/d)$, for $m$ from $50$ to $1600$, random $\pm 1$ labels against labels from a unit $\underline w_0$ (numbers in the sanity check).*

**Common mistakes.**

- In part 1, proving only that the iterates stay in $V$, without showing that the interpolator in $V$ is unique and has minimal norm (the Gram matrix and Pythagoras).
- In part 2, plugging $r = \|\hat{\underline w}\|$ into a single application of the Rademacher theorem: the radius depends on $S$, so a union bound over radii is needed.
- In part 3, answering "the norm is small because the labels are noise", or claiming that the bound still guarantees generalization.

**💡 Useful tricks:** GD from $0$ stays in $V=\mathrm{span}\{x_i\}$ (every gradient lives there); global optimum ⇔ interpolation (from $\ell=0$ iff equal); Pythagoras ($\|w\|^2=\|w_V\|^2+\|w_\perp\|^2$) shows the in-span solution is min-norm; make the bound norm-adaptive by a union over radii $r$ with $\delta_r=\frac{6\delta}{\pi^2r^2}$, then set $r=\lceil\|\hat w\|\rceil$.

**⚠️ Watch out:** (i) needs BOTH facts — iterates stay in $V$ AND the in-span interpolant is the unique min-norm one (invertible Gram from linear independence); (ii) infinitely many radii ⇒ summable weights; (iii) the answer is a *large* norm — random labels blow up $\|\hat w\|$ and loosen the bound (the Zhang-et-al. moral again).
