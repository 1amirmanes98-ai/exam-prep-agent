# FODL Exam — Moed B 2022
**Date / semester:** 17.08.2022, Semester B 2021/22 (תשפ"ב); lecturer Dr. Nadav Cohen, TA Noam Razin; 3 hours, no aid material
**Total points:** 110

## Q1 (37 pts) — Leaky-ReLU networks: piecewise-linear expressiveness and depth separation
**Topics:** depth-separation, hypothesis-class, universality, piecewise-linear | **Pillar:** Expressiveness | **Difficulty:** 4
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
Let $\mathcal{H}_M^L$ be the hypothesis class of neural networks with $L \ge 1$ hidden layers of width $M \in \mathbb{N}$, one-dimensional input and output ($X = Y = \mathbb{R}$, where $X$ is the input space and $Y$ the output space), and Leaky-ReLU activation with parameter $\alpha \in (0,1)$ on the hidden-layer neurons. That is:

$$\mathcal{H}_M^L = \left\{ x \mapsto W_{L+1}\,\phi_\alpha\big(W_L\,\phi_\alpha(\cdots \phi_\alpha(W_1 x + b_1)\cdots) + b_L\big) + b_{L+1} \ :\ W_1 \in \mathbb{R}^{M,1},\ W_2,\dots,W_L \in \mathbb{R}^{M,M},\ W_{L+1} \in \mathbb{R}^{1,M},\ b_1,\dots,b_L \in \mathbb{R}^M,\ b_{L+1} \in \mathbb{R} \right\}$$

where $\phi_\alpha(z)_m = \max\{z_m,\ \alpha\cdot z_m\}$ for every $z \in \mathbb{R}^M$ and $m \in \{1,\dots,M\}$.

**a. (5 pts)** Define what a "piecewise linear" function from $\mathbb{R}$ to $\mathbb{R}$ is, and what "the number of its linear segments" is.

**b. (5 pts)** Prove that every $h \in \mathcal{H}_M^1$ is piecewise linear with at most $M+1$ linear segments.

Denote by $\widehat{\mathcal{H}}_M^L$ the hypothesis class obtained from $\mathcal{H}_M^L$ by replacing the activation function in the networks from Leaky-ReLU to ReLU.

**c. (10 pts)** For $M \ge 2$, let $f: \mathbb{R} \to \mathbb{R}$ be a piecewise linear function with at most $M$ linear segments. Prove that $f \in \mathcal{H}_{2M}^L$ for every $L \in \mathbb{N}$. You may use without proof the fact that $f \in \widehat{\mathcal{H}}_M^L$ for every $L \in \mathbb{N}$, but other claims from the lectures or recitations must be proven.

**d. (10 pts)** For $L \ge 2$, prove that $\mathcal{H}_M^L$ is expressively exponentially more efficient in $L$ relative to $\mathcal{H}_M^1$. That is, show that:
1. For every $M \in \mathbb{N}$ there exists $\bar M \in \mathbb{N}$ with $\bar M = O(M)$ such that $\mathcal{H}_M^1 \subset \mathcal{H}_{\bar M}^L$;
2. There exist $\bar M \in \mathbb{N}$, a constant independent of $L$, and $h \in \mathcal{H}_{\bar M}^L$ such that $h \notin \mathcal{H}_M^1$ unless $M = \Omega(2^L)$.

**e. (7 pts)** If we were to set the parameter $\alpha$ of the Leaky-ReLU activation to be equal to $1$, would the expressive efficiency proven in sub-part d still hold? Prove your answer.

**Solution sketch:**

**1. Part a: piecewise linear functions and their number of segments**

**What is asked.** Two definitions: when a function from $\mathbb{R}$ to $\mathbb{R}$ is piecewise linear, and what its number of linear segments is. The answer is a definition.

**Tool and why.** The definition from the depth-separation lecture (cheat sheet §5). Parts b and d count segments, so the count must be well defined; taking the minimum over all partitions guarantees that.

**Definitions.** An affine function is a function of the form $x\mapsto ax+b$. A partition of $\mathbb{R}$ into $K$ intervals is given by $K-1$ points

$$t_1<t_2<\dots<t_{K-1}$$

and consists of the intervals $(-\infty,t_1]$, $[t_1,t_2]$, …, $[t_{K-1},\infty)$. We introduce them because "piecewise" means "on each interval of such a partition".

**Solution.**

Step 1, piecewise linear: a function $f$ is piecewise linear if it is continuous and there is a partition of $\mathbb{R}$ into finitely many intervals such that $f$ is affine on each interval.

Step 2, number of segments: among all such partitions, take one with the smallest $K$. This $K$ is the number of linear segments of $f$. The minimum exists because $K$ ranges over positive integers.

Step 3, an equivalent description: in a minimal partition, two neighbouring intervals have different slopes. Otherwise we could merge them into one interval on which $f$ is still affine (continuity glues the two pieces), and get a partition with $K-1$ intervals. So the number of segments equals the number of points where the slope changes, plus one.

**In words.** A piecewise linear function is a broken line drawn without lifting the pen, and the number of segments counts its straight pieces after merging neighbours that lie on the same line.

**Sanity check.** For $|x|$ the partition at $0$ gives two pieces with slopes $-1$ and $1$, which differ, so $|x|$ has 2 segments. An affine function has 1 segment: adding a fake breakpoint does not change the count, because the count is a minimum.

**What to write in the exam.**

- Definition: $f$ is continuous and $\mathbb{R}$ splits into finitely many intervals with $f$ affine on each.
- Number of segments: the smallest number of intervals in such a split.
- Equivalently: the number of slope changes plus one.

*Verified: the slope-change counter used in parts 2 to 5 returns 2 for $|x|$ and 1 for an affine function (NumPy, grid of $2\cdot10^6$ points).*

**2. Part b: a depth-1 network has at most $M+1$ segments**

**What is asked.** Prove that every $h\in\mathcal{H}_M^1$ is piecewise linear with at most $M+1$ segments. The answer is a proof.

**Tool and why.** Write the network as a sum of $M$ single neurons and count breakpoints (cheat sheet §5). Each neuron bends at most once, and a sum can bend only where one of its summands bends.

**Definitions.** For $L=1$ we write $w_m$, $b_m$ for the $m$-th entries of $W_1$ and $b_1$, $u_m$ for the $m$-th entry of $W_2$, and $c$ for $b_2$. Then

$$h(x)=\sum_{m=1}^M u_m\,\phi_\alpha(w_m x+b_m)+c$$

Let $P$ be the set of points $-b_m/w_m$ over the neurons with $w_m\ne0$. These are the candidate breakpoints.

**Solution.**

Step 1, the scalar activation: $\phi_\alpha(z)$ equals $z$ for $z\ge0$ and $\alpha z$ for $z<0$. It is continuous and affine on each side of $0$.

Step 2, one neuron: if $w_m\ne0$, the argument $w_mx+b_m$ changes sign only at $-b_m/w_m$. So the neuron is affine on each side of this point and continuous. If $w_m=0$ the neuron is the constant $u_m\phi_\alpha(b_m)$.

Step 3, the sum: $P$ has at most $M$ points, so sorting them splits $\mathbb{R}$ into at most $M+1$ intervals. Inside each interval no argument $w_mx+b_m$ changes sign, so every summand is affine there. A sum of affine functions plus the constant $c$ is affine. A sum of continuous functions is continuous.

Step 4, conclusion: $h$ is continuous and affine on each of at most $M+1$ intervals, so it is piecewise linear. The number of segments is the minimum over partitions, so it is at most $M+1$.

**In words.** Each neuron contributes at most one kink, and adding neurons only adds their kinks together. A one-hidden-layer network of width $M$ has at most $M$ kinks.

**Sanity check.** With $M=1$ and $h(x)=\phi_\alpha(x)$ there are exactly 2 segments, which equals $M+1$: the bound is tight. If several neurons share a breakpoint, there are fewer segments, still within the bound.

**What to write in the exam.**

- Write $h(x)=\sum_m u_m\phi_\alpha(w_mx+b_m)+c$.
- Each neuron is continuous and bends only at $-b_m/w_m$ (or is constant if $w_m=0$).
- At most $M$ breakpoints split $\mathbb{R}$ into at most $M+1$ intervals, on each of which $h$ is a sum of affine functions.
- Hence $h$ is piecewise linear with at most $M+1$ segments.

*Verified: 300 random depth-1 networks with $M$ from 1 to 5 and random $\alpha$; the counted number of segments never exceeded $M+1$ (NumPy).*

**3. Part c: Leaky-ReLU simulates ReLU at width $2M$**

**What is asked.** For $M\ge2$ and a piecewise linear $f$ with at most $M$ segments, prove $f\in\mathcal{H}_{2M}^L$ for every $L$. The answer is a construction with a proof. We may use $f\in\widehat{\mathcal{H}}_M^L$.

**Tool and why.** Simulate each ReLU unit by two Leaky-ReLU units (cheat sheet §5). The allowed fact already gives a ReLU network for $f$, so all that is left is to translate it, layer by layer, without changing the computed function.

**Definitions.** Fix $L$ and a ReLU network of width $M$ that computes $f$, with weights $W_1,\dots,W_{L+1}$ and biases $b_1,\dots,b_{L+1}$. Its hidden activations are $a_0:=x$ and

$$a_\ell=\mathrm{ReLU}(W_\ell a_{\ell-1}+b_\ell)$$

for $\ell$ from $1$ to $L$, and $f(x)=W_{L+1}a_L+b_{L+1}$. Let $I$ be the $M\times M$ identity matrix, and define the $M\times 2M$ matrix

$$C:=\frac{1}{1-\alpha^2}\begin{pmatrix} I & \alpha I\end{pmatrix}$$

It recombines a pair of Leaky-ReLU outputs into one ReLU output. It exists because $\alpha<1$.

**Solution.**

Step 1, the scalar identity.

**Claim.** For every real $z$:

$$\mathrm{ReLU}(z) = \frac{1}{1-\alpha^2}\big(\phi_\alpha(z) + \alpha\,\phi_\alpha(-z)\big)$$

Case $z\ge0$: $\phi_\alpha(z)=z$, and $\phi_\alpha(-z)=-\alpha z$ because $-z\le0$. The bracket is $z-\alpha^2z$, that is $(1-\alpha^2)z$. Dividing gives $z$, which is $\mathrm{ReLU}(z)$.

Case $z<0$: $\phi_\alpha(z)=\alpha z$, and $\phi_\alpha(-z)=-z$ because $-z>0$. The bracket is $\alpha z-\alpha z$, which is $0$, and $\mathrm{ReLU}(z)$ is $0$ too.

Applied coordinate by coordinate, for every $z\in\mathbb{R}^M$:

$$\mathrm{ReLU}(z)=C\,\phi_\alpha\begin{pmatrix} z\\ -z\end{pmatrix}$$

Step 2, the new weights: duplicate every incoming row with a sign flip, and absorb $C$ into the next layer:

$$\tilde W_1:=\begin{pmatrix}W_1\\-W_1\end{pmatrix},\quad \tilde W_\ell:=\begin{pmatrix}W_\ell\\-W_\ell\end{pmatrix}C$$

for $\ell$ from $2$ to $L$, with biases $\tilde b_\ell:=(b_\ell,-b_\ell)$, and output layer $\tilde W_{L+1}:=W_{L+1}C$, $\tilde b_{L+1}:=b_{L+1}$. Let $g_0:=x$ and $g_\ell:=\phi_\alpha(\tilde W_\ell g_{\ell-1}+\tilde b_\ell)$ be the new hidden activations.

Step 3, the new network tracks the old one.

**Claim.** For every $\ell$ from $1$ to $L$: $a_\ell=Cg_\ell$. The induction is on the layer index $\ell$, upwards.

**Base.** For $\ell=1$ the pre-activation of the new layer is $(W_1x+b_1,\,-(W_1x+b_1))$. By step 1, $C$ applied to its Leaky-ReLU gives $\mathrm{ReLU}(W_1x+b_1)$, which is $a_1$.

**Hypothesis.** $a_{\ell-1}=Cg_{\ell-1}$ for some $\ell\ge2$.

**Step.** Using the hypothesis in the second row:

$$\begin{aligned} \tilde W_\ell g_{\ell-1}+\tilde b_\ell &= \begin{pmatrix}W_\ell Cg_{\ell-1}+b_\ell\\ -(W_\ell Cg_{\ell-1}+b_\ell)\end{pmatrix} \\ &= \begin{pmatrix}W_\ell a_{\ell-1}+b_\ell\\ -(W_\ell a_{\ell-1}+b_\ell)\end{pmatrix} \end{aligned}$$

By step 1, $C$ applied to the Leaky-ReLU of this vector is $\mathrm{ReLU}(W_\ell a_{\ell-1}+b_\ell)$, which is $a_\ell$.

Step 4, the output: by the claim with $\ell=L$,

$$\begin{aligned} \tilde W_{L+1}g_L+\tilde b_{L+1} &= W_{L+1}Cg_L+b_{L+1} \\ &= W_{L+1}a_L+b_{L+1} \\ &= f(x) \end{aligned}$$

Step 5, the shapes: $\tilde W_1$ is $2M\times1$, every middle $\tilde W_\ell$ is $2M\times 2M$, and $\tilde W_{L+1}$ is $1\times 2M$. This is exactly the format of $\mathcal{H}_{2M}^L$ with $L$ hidden layers. So $f\in\mathcal{H}_{2M}^L$, and $L$ was arbitrary.

**In words.** A Leaky-ReLU unit leaks a fraction $\alpha$ on the negative side. Feeding a second unit with $-z$ and taking the right combination cancels the leak exactly. The price is two units per ReLU unit; depth does not change.

**Sanity check.** At $\alpha\to0$ the matrix $C$ tends to $(I\ \ 0)$ and $\phi_0$ is ReLU: the construction copies the original network and ignores the mirrored copy, as it should. At $\alpha=1$ the factor $\frac{1}{1-\alpha^2}$ blows up; this matches part 5, where an activation with $\alpha=1$ cannot create any kink.

**What to write in the exam.**

- Identity of step 1: ReLU is a fixed combination of two Leaky units fed with $z$ and $-z$; check both signs of $z$.
- Take the width-$M$ ReLU network of $f$; replace each unit by two Leaky units fed with $z$ and $-z$.
- Absorb the coefficients into the next layer's weights; by induction every layer reproduces the old activations.
- Width $2M$, depth $L$ unchanged, same function, so $f\in\mathcal{H}_{2M}^L$.

*Verified: the identity in SymPy for both signs; 200 random ReLU networks ($M$ from 2 to 4, $L$ from 1 to 4, random $\alpha$) converted to width-$2M$ Leaky networks, maximal output difference $7.5\cdot10^{-14}$ (NumPy).*

**4a. Part d, condition 1: a shallow network fits into a deep one of width $O(M)$**

**What is asked.** For every $M$, a width $\bar M=O(M)$ with $\mathcal{H}_M^1\subseteq\mathcal{H}_{\bar M}^L$. The answer is a proof.

**Tool and why.** The definition of expressive efficiency (cheat sheet §4) asks for this containment first. Part 2 turns a shallow network into a segment bound, and part 3 turns a segment bound into a deep network, so chaining them gives the containment.

**Definitions.** $\bar M:=2M+2$.

**Solution.**

Step 1, segment bound: let $h\in\mathcal{H}_M^1$. By part 2, $h$ is piecewise linear with at most $M+1$ segments.

Step 2, deep realisation: apply part 3 with $M+1$ in place of $M$. This is allowed because $M+1\ge2$ for every $M\ge1$. So $h\in\mathcal{H}_{2(M+1)}^L$ for every $L$.

Step 3, the width is linear in $M$: $\bar M=2M+2$, and $2M+2\le4M$ for $M\ge1$, so $\bar M=O(M)$. Since $h$ was arbitrary, $\mathcal{H}_M^1\subseteq\mathcal{H}_{\bar M}^L$. (The statement's $\subset$ means containment.)

**In words.** A shallow network can be rewritten as a deep one at the price of a constant factor in width; depth never hurts.

**Sanity check.** A direct construction gives the same order: keep the $M$ shallow units in layer 1, and carry the scalar output through the remaining layers with the pass-through identity $z=\frac{1}{1+\alpha}(\phi_\alpha(z)-\phi_\alpha(-z))$, two units per layer. The width is $\max\{M,2\}$, also $O(M)$.

**What to write in the exam.**

- By part b, every $h\in\mathcal{H}_M^1$ has at most $M+1$ segments.
- By part c with $M+1$ (which is at least 2), $h\in\mathcal{H}_{2M+2}^L$.
- So $\bar M=2M+2$, which is $O(M)$.

*Verified: the two ingredients are checked numerically in parts 2 and 3; the pass-through identity checked in SymPy for both signs of $z$.*

**4b. Part d, condition 2: the composed tent needs shallow width $\Omega(2^L)$**

**What is asked.** A constant width $\bar M$ and a deep network $h\in\mathcal{H}_{\bar M}^L$ that lies in $\mathcal{H}_M^1$ only if $M=\Omega(2^L)$. The answer is a construction and a proof.

**Tool and why.** Telgarsky's sawtooth (cheat sheet §5). Composing a tent with itself doubles the number of teeth with every layer, while part 2 says a shallow network gains only one segment per unit. Counting segments is therefore the lower bound.

**Definitions.** The tent function

$$\Delta(x):=2\,\mathrm{ReLU}(x)-4\,\mathrm{ReLU}(x-\tfrac12)$$

It equals $0$ for $x\le0$, $2x$ on $[0,\frac12]$, and $2-2x$ for $x\ge\frac12$: three segments, and it maps $[0,1]$ onto $[0,1]$. We write $\Delta^{\circ L}$ for its $L$-fold composition and set $\bar M:=4$.

**Solution.**

Step 1, $\Delta$ as a width-4 Leaky network: apply the identity of part 3 to both ReLU terms:

$$\Delta(x)=\frac{2\big(\phi_\alpha(x)+\alpha\phi_\alpha(-x)\big)-4\big(\phi_\alpha(x-\frac12)+\alpha\phi_\alpha(\frac12-x)\big)}{1-\alpha^2}$$

So $\Delta(y)=u^\top\phi_\alpha(wy+b)$ with $w:=(1,-1,1,-1)$, $b:=(0,0,-\frac12,\frac12)$ and $u:=\frac{1}{1-\alpha^2}(2,2\alpha,-4,-4\alpha)$. (Part 3 applied to the 3 segments would give width 6, also a constant.)

Step 2, stacking $L$ tents into one network of depth $L$: let $g_1:=\phi_\alpha(wx+b)$. Block $i$ receives the scalar $u^\top g_{i-1}$, so its hidden layer is

$$g_i=\phi_\alpha\big(wu^\top g_{i-1}+b\big)$$

The matrix $wu^\top$ is $4\times4$: the output layer of one block and the input layer of the next merge into one weight matrix. The output is $u^\top g_L$, which is $\Delta^{\circ L}(x)$. So $\Delta^{\circ L}\in\mathcal{H}_4^L$.

Step 3, the teeth on $[0,1]$.

**Claim.** For every $L\ge1$, on each interval $I_j:=[j2^{-L},(j+1)2^{-L}]$, $j$ from $0$ to $2^L-1$, the function $\Delta^{\circ L}$ is affine with slope $\pm2^L$ and maps $I_j$ onto $[0,1]$; the signs alternate, starting with $+$. The induction is on $L$, upwards.

**Base.** $L=1$: $\Delta$ rises from $0$ to $1$ on $[0,\frac12]$ with slope $2$ and falls from $1$ to $0$ on $[\frac12,1]$ with slope $-2$.

**Hypothesis.** The claim holds for $L$.

**Step.** Write $\Delta^{\circ(L+1)}=\Delta\circ\Delta^{\circ L}$. By the hypothesis, $\Delta^{\circ L}$ maps $I_j$ onto $[0,1]$ by a monotone affine map with slope $\pm2^L$. On $[0,1]$, $\Delta$ rises on the first half and falls on the second. So on $I_j$ the composition rises over the half of $I_j$ that is sent to $[0,\frac12]$ and falls over the other half: two pieces of length $2^{-(L+1)}$, each mapped onto $[0,1]$, with slope $\pm2^L\cdot2$ by the chain rule. Across the border of $I_j$ and $I_{j+1}$ a falling piece meets a rising one (both touch $0$ there), so the signs keep alternating.

Step 4, outside $[0,1]$, for $L\ge2$: for $x\le0$, $\Delta(x)=0$ and $\Delta(0)=0$, so $\Delta^{\circ L}(x)=0$. For $x\ge1$, $\Delta(x)=2-2x$, which is at most $0$, and $\Delta$ sends non-positive numbers to $0$; so again $\Delta^{\circ L}(x)=0$.

Step 5, the count: neighbouring pieces on $[0,1]$ have slopes $2^L$ and $-2^L$, so none of them merge. At $0$ the slope jumps from $0$ to $2^L$, at $1$ from $-2^L$ to $0$. The number of segments is

$$2^L+2$$

Step 6, the lower bound: if $\Delta^{\circ L}\in\mathcal{H}_M^1$, part 2 gives $2^L+2\le M+1$, that is $M\ge2^L+1$. So $M=\Omega(2^L)$, while $\bar M=4$ does not depend on $L$.

**In words.** Each tent folds $[0,1]$ onto itself, and every fold doubles the number of teeth: depth multiplies segments, while width in a shallow network only adds them.

**Sanity check.** For $L=2$, $\Delta\circ\Delta$ is a "W" on $[0,1]$: 4 pieces inside and 2 flat pieces outside, 6 in total, which equals $2^2+2$. For $L=10$ a shallow network would need width at least $1025$, against 10 layers of width 4.

**What to write in the exam.**

- Take the tent $\Delta$ with 3 segments; by part c it is a Leaky network of constant width (4, or 6 via part c directly).
- Stack $L$ copies, merging $u$ and $w$ into $wu^\top$: $\Delta^{\circ L}\in\mathcal{H}_4^L$.
- By induction $\Delta^{\circ L}$ has $2^L$ alternating teeth on $[0,1]$, so $2^L+2$ segments for $L\ge2$.
- By part b, membership in $\mathcal{H}_M^1$ needs $M+1\ge2^L+2$, so $M=\Omega(2^L)$.

*Verified: the width-4 Leaky formula equals $\Delta$ to $1.8\cdot10^{-15}$; counted segments of $\Delta^{\circ L}$ for $L$ from 1 to 6 are 3, 6, 10, 18, 34, 66, matching $2^L+2$ for $L\ge2$ (NumPy).*

**5. Part e: the case $\alpha=1$**

**What is asked.** Whether the efficiency of part d still holds when $\alpha=1$. The answer is yes or no with a proof.

**Tool and why.** Look at what the activation becomes; a composition of affine maps is affine (cheat sheet §5). The definition of efficiency (cheat sheet §4) needs both conditions, so it is enough to break one.

**Definitions.** $\mathcal{A}$ denotes the set of affine functions $x\mapsto ax+b$ from $\mathbb{R}$ to $\mathbb{R}$.

**Solution.**

Verdict: no. Condition 2 fails.

Step 1, the activation: $\phi_1(z)_m=\max\{z_m,z_m\}$, which is $z_m$. So $\phi_1$ is the identity.

Step 2, every network is affine: each layer becomes $z\mapsto W_\ell z+b_\ell$, and a composition of affine maps is affine. Explicitly, every network computes $x\mapsto W_{L+1}\cdots W_1x+c$ for a constant $c$. So $\mathcal{H}_M^L\subseteq\mathcal{A}$ for every $M$ and $L$.

Step 3, every affine function is a width-1 network: $x\mapsto ax+b$ is realised with $W_1=a$, $b_1=0$, $W_2=1$, $b_2=b$. Adding neurons with zero output weights keeps it in $\mathcal{H}_M^1$ for every $M$. Together with step 2, every class $\mathcal{H}_M^L$ equals $\mathcal{A}$.

Step 4, condition 2 fails: every $h\in\mathcal{H}_{\bar M}^L$ is affine, so it already lies in $\mathcal{H}_M^1$ with $M=1$, which is not $\Omega(2^L)$. Condition 1 holds trivially, but the definition needs both.

Step 5, where the proof of part d breaks: the identity of part 3 divides by $1-\alpha^2$, which is $0$ at $\alpha=1$, and the tent of part 4b cannot be built.

**In words.** Without a non-linearity, depth is only a product of matrices and collapses into one affine map.

**Sanity check.** A random network with two hidden layers and $\alpha=1$ has exactly one segment, while with $\alpha=0.3$ the composed tent has $2^L+2$ segments.

**What to write in the exam.**

- No.
- With $\alpha=1$, $\phi_1(z)=z$, so every network is a composition of affine maps, hence affine.
- Every affine function is already in $\mathcal{H}_1^1$, so no deep $h$ needs shallow width $\Omega(2^L)$; condition 2 fails.

*Verified: counted segments of a random depth-2 network with $\alpha=1$: 1 (NumPy).*

**Common mistakes.**

- In part c, replacing each ReLU by a single Leaky unit, or forgetting to multiply the next layer's weights by the recombination matrix: the computed function changes.
- In part d, calling the hat that is zero outside $[0,1]$ a 3-segment function (it has 4), or stacking blocks without merging the output and input layers, which doubles the depth.
- Proving only the hardness half of part d, or answering in part e that depth still helps.

**💡 Useful tricks:** Depth-1 = PWL with $\leq M+1$ segments (one breakpoint per unit); the identity $\mathrm{ReLU}(z)=\frac1{1-\alpha^2}(\phi_\alpha(z)+\alpha\phi_\alpha(-z))$ simulates each ReLU with *two* leaky units (width doubles to $2M$); a hat function composed $L$ times is a sawtooth with $\Omega(2^L)$ segments; segment-counting is the separation lower bound.

**⚠️ Watch out:** (c) duplicate each pre-activation with a sign flip and absorb the $\frac1{1-\alpha^2}$ constants downstream; (d) prove BOTH the $O(M)$ containment and the $\Omega(2^L)$ hardness; (e) the answer *flips* at $\alpha=1$ — leaky-ReLU becomes the identity, everything is affine, and all depth efficiency vanishes.

## Q2 (40 pts) — Balanced gradient flow on one-hidden-layer ReLU nets: sign preservation and an unreachable loss level
**Topics:** gradient-flow, balancedness, conservation-laws, initialization, implicit-bias | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_04_optimization_2, fodl_recitation_gradient_flow, fodl_recitation_optimization_1
**Statement (English translation):**
Let $\mathcal{H}$ be a hypothesis class of neural networks with one hidden layer of width $M \in \mathbb{N}$, $D \in \mathbb{N}$-dimensional input, one-dimensional output (i.e. $X = \mathbb{R}^D$, $Y = \mathbb{R}$), ReLU activation on the hidden-layer neurons, and no biases. Formally:

$$\mathcal{H} = \left\{ x \mapsto \sum_{m=1}^{M} v_m\,\phi(\langle w_m, x\rangle)\ :\ w_1,\dots,w_M \in \mathbb{R}^D,\ v_1,\dots,v_M \in \mathbb{R} \right\}$$

where $\phi:\mathbb{R}\to\mathbb{R}$ is the ReLU activation. Denote by $\theta := (w_1,\dots,w_M,v_1,\dots,v_M) \in \mathbb{R}^{MD+M}$ the network's parameter vector and by $h_\theta:\mathbb{R}^D\to\mathbb{R}$ the mapping it realizes, i.e. $h_\theta(x) := \sum_{m=1}^M v_m\phi(\langle w_m,x\rangle)$.

Given a continuously differentiable loss $\ell:\mathbb{R}\times\mathbb{R}\to\mathbb{R}_{\ge0}$ and a sample $\{(x_n,y_n)\}_{n=1}^N \subset (X\times Y)^N$, define the empirical loss over the network parameters:

$$\mathcal{L}(\theta) := \sum_{n=1}^{N} \ell(h_\theta(x_n), y_n)$$

Suppose gradient flow is run over $\mathcal{L}$ with initialization $\theta(0) \in \mathbb{R}^{MD+M}$. Denote by $\theta(t)$, and correspondingly $\{w_m(t), v_m(t)\}_{m=1}^M$, the network parameters at time $t \ge 0$. For simplicity, you may assume the flow exists and is unique, and that $\frac{d}{dz}\phi(0) := 0$, i.e. the non-differentiability of ReLU at $0$ does not "disturb".

**a. (6 pts)** Prove that for every $m \in \{1,\dots,M\}$:
$$\frac{d}{dt}\big(v_m(t)^2\big) = \frac{d}{dt}\big(\|w_m(t)\|^2\big) = -2\sum_{n=1}^N \ell'\big(h_{\theta(t)}(x_n), y_n\big)\cdot v_m(t)\cdot \phi(\langle w_m(t), x_n\rangle)$$
where $\ell'$ is the derivative of $\ell$ with respect to its first argument.

**b. (12 pts)** Assume the initialization $\theta(0)$ is balanced in the sense that $v_m(0)^2 = \|w_m(0)\|^2$ for every $m \in \{1,\dots,M\}$. For $m \in \{1,\dots,M\}$, denote $\sigma_m(t) := |v_m(t)|\cdot\|w_m(t)\|$. Prove that if $v_m(t) \neq 0$ then:
$$\frac{d}{dt}\big(\sigma_m(t)^2\big) = \sigma_m(t)^2\left[-4\sum_{n=1}^N \ell'\big(h_{\theta(t)}(x_n), y_n\big)\cdot \frac{v_m(t)}{|v_m(t)|}\cdot \phi\left(\left\langle \frac{w_m(t)}{\|w_m(t)\|},\, x_n\right\rangle\right)\right]$$
and otherwise, if $v_m(t) = 0$, then $\frac{d}{dt}(\sigma_m(t)^2) = 0$.

**c. (14 pts)** Assume the initialization $\theta(0)$ is balanced as in the previous sub-part. In addition, for $m \in \{1,\dots,M\}$, assume $v_m(0) > 0$. Prove that $v_m(t)$ does not change sign throughout the optimization, i.e. $v_m(t) > 0$ for all $t \ge 0$.

*Guidance (הדרכה):* Assume by contradiction that there exists a time $\bar t$ at which $v_m(\bar t) \le 0$. For the first time point at which $v_m(t)$ vanishes, $t_0 := \min\{t \in \mathbb{R}_{\ge0} : v_m(t) = 0\}$, consider the interval $[0, t_0)$. Use the expression for $\frac{d}{dt}(\sigma_m(t)^2)$ from the previous sub-part to show that over this time interval there exists a continuous and **bounded** $g:[0,t_0)\to\mathbb{R}$ such that $\sigma_m(t)^2 = \sigma_m(0)^2\cdot\exp\big(\int_0^t g(z)\,dz\big)$. Deduce from this that it cannot be that $v_m(t_0) = 0$, and therefore $v_m(t) > 0$ for all $t \ge 0$. Every step of the proof must be justified.

Now assume $\mathcal{L}(\theta) = \sum_{n=1}^N (h_\theta(x_n) - y_n)^2$, that the initialization $\theta(0)$ is balanced as in sub-parts b and c, and that $v_m(0) > 0$ for every $m \in \{1,\dots,M\}$.

**d. (8 pts)** Prove that if there exists an example with a negative label, i.e. $\bar n \in \{1,\dots,N\}$ with $y_{\bar n} < 0$, then there exists $\epsilon > 0$ for which gradient flow cannot reach an empirical loss smaller than $\epsilon$; namely, there is no $t \ge 0$ for which $\mathcal{L}(\theta(t)) < \epsilon$.

*Hint:* Use the result of sub-part c.

**Solution sketch:**

**1. Part a: both squared norms change at the same rate**

**What is asked.** Prove that $v_m^2$ and $\|w_m\|^2$ have the same time derivative, equal to the given sum. The answer is a proof.

**Tool and why.** Gradient flow $\dot\theta=-\nabla\mathcal{L}(\theta)$ and the chain rule (cheat sheet §7), plus the homogeneity identity of ReLU, which is the source of conservation laws (cheat sheet §8). The derivative of $\|w_m\|^2$ produces a factor $\phi'(z)z$, and homogeneity turns it into $\phi(z)$.

**Definitions.** We drop the time argument and abbreviate

$$\ell'_n:=\ell'\big(h_\theta(x_n),y_n\big),\qquad z_{mn}:=\langle w_m,x_n\rangle$$

$\ell'_n$ is the derivative of the loss on example $n$ with respect to the prediction, and $z_{mn}$ is the pre-activation of neuron $m$ on example $n$.

**Solution.**

Step 1, derivatives of the network: only the $m$-th term of $h_\theta$ depends on $v_m$ and $w_m$, so by the chain rule

$$\frac{\partial h_\theta(x)}{\partial v_m}=\phi(\langle w_m,x\rangle)$$

$$\nabla_{w_m}h_\theta(x)=v_m\,\phi'(\langle w_m,x\rangle)\,x$$

Step 2, derivatives of the loss, by the chain rule through $\ell$:

$$\frac{\partial\mathcal{L}}{\partial v_m}=\sum_{n=1}^N\ell'_n\,\phi(z_{mn})$$

$$\nabla_{w_m}\mathcal{L}=\sum_{n=1}^N\ell'_n\,v_m\,\phi'(z_{mn})\,x_n$$

Step 3, gradient flow: $\dot v_m=-\partial\mathcal{L}/\partial v_m$ and $\dot w_m=-\nabla_{w_m}\mathcal{L}$.

Step 4, the derivative of $v_m^2$:

$$\begin{aligned} \frac{d}{dt}v_m^2 &= 2v_m\dot v_m \\ &= -2\sum_{n=1}^N\ell'_n\,v_m\,\phi(z_{mn}) \end{aligned}$$

Step 5, the derivative of $\|w_m\|^2$, using $\langle x_n,w_m\rangle=z_{mn}$ in the last row:

$$\begin{aligned} \frac{d}{dt}\|w_m\|^2 &= 2\langle w_m,\dot w_m\rangle \\ &= -2\sum_{n=1}^N\ell'_n\,v_m\,\phi'(z_{mn})\langle w_m,x_n\rangle \\ &= -2\sum_{n=1}^N\ell'_n\,v_m\,\phi'(z_{mn})\,z_{mn} \end{aligned}$$

Step 6, the homogeneity identity: $z\phi'(z)=\phi(z)$ for every real $z$. For $z>0$ both sides are $z$. For $z<0$ both sides are $0$. For $z=0$ both sides are $0$ (with the convention $\phi'(0):=0$). Substituting it into step 5 gives exactly the expression of step 4, which is the stated one.

**In words.** Scaling $w_m$ by $c>0$ and $v_m$ by $1/c$ does not change the network. The gradient is orthogonal to this rescaling direction, so neither of the two weights can grow faster than the other.

**Sanity check.** One neuron, $D=1$, $x=1$, $y=0$, square loss, $v=1$, $w=2$. The prediction is $2$, so $\ell'$ is $2(2-0)$, which is $4$. Then

$$\begin{aligned} \dot v &= -4\cdot2=-8 \\ \dot w &= -4\cdot1\cdot1=-4 \end{aligned}$$

So $2v\dot v$ and $2w\dot w$ are both $-16$, and the formula gives $-2\cdot4\cdot1\cdot2$, which is $-16$ as well.

**What to write in the exam.**

- Gradient flow: $\dot v_m=-\sum_n\ell'_n\phi(z_{mn})$ and $\dot w_m=-\sum_n\ell'_nv_m\phi'(z_{mn})x_n$.
- Then $\frac{d}{dt}v_m^2=2v_m\dot v_m$ and $\frac{d}{dt}\|w_m\|^2=2\langle w_m,\dot w_m\rangle$.
- Homogeneity $z\phi'(z)=\phi(z)$ (all three sign cases) makes both equal the given sum.

*Verified: at a random point ($D=3$, $M=4$, $N=6$, square loss) both derivatives match the formula to $4\cdot10^{-15}$; the hand example gives $-16$ three times (NumPy).*

**2. Part b: the dynamics of $\sigma_m^2$**

**What is asked.** Under balanced initialization, derive the stated ODE for $\sigma_m^2$ when $v_m\ne0$, and show the derivative is $0$ when $v_m=0$. The answer is a proof.

**Tool and why.** The conservation law that follows from part 1 (cheat sheet §8) keeps the neuron balanced for all time; then the product rule and the positive homogeneity of ReLU give the ODE.

**Definitions.** When $w_m\ne0$, $\hat w_m:=w_m/\|w_m\|$ is the unit direction of $w_m$. We write $A_m$ for the common value of the two derivatives of part 1:

$$A_m:=-2\sum_{n=1}^N\ell'_n\,v_m\,\phi(z_{mn})$$

**Solution.**

Step 1, balancedness is conserved: by part 1 the derivative of $v_m^2-\|w_m\|^2$ is $A_m-A_m$, that is $0$. So

$$\begin{aligned} v_m(t)^2-\|w_m(t)\|^2 &= v_m(0)^2-\|w_m(0)\|^2 \\ &= 0 \end{aligned}$$

Hence $\|w_m(t)\|=|v_m(t)|$ for every $t$.

Step 2, the product rule: $\sigma_m^2=v_m^2\|w_m\|^2$ is differentiable because $v_m$ and $w_m$ are. Using part 1 in the second row and step 1 in the third:

$$\begin{aligned} \frac{d}{dt}\sigma_m^2 &= \|w_m\|^2\frac{d}{dt}v_m^2+v_m^2\frac{d}{dt}\|w_m\|^2 \\ &= \big(\|w_m\|^2+v_m^2\big)A_m \\ &= 2v_m^2A_m \end{aligned}$$

Step 3, the case $v_m\ne0$: by step 1, $\|w_m\|=|v_m|$, which is positive, so $\hat w_m$ is defined. ReLU is positively homogeneous, $\phi(cz)=c\phi(z)$ for $c>0$, so $\phi(z_{mn})=\|w_m\|\,\phi(\langle\hat w_m,x_n\rangle)$. Substituting into step 2:

$$\frac{d}{dt}\sigma_m^2=-4\,v_m^3\|w_m\|\sum_{n=1}^N\ell'_n\,\phi(\langle\hat w_m,x_n\rangle)$$

Step 4, the prefactor: since $\|w_m\|=|v_m|$, we have $\sigma_m^2=v_m^4$, and

$$\begin{aligned} v_m^3\|w_m\| &= v_m^3|v_m| \\ &= v_m^4\,\frac{v_m}{|v_m|} \\ &= \sigma_m^2\,\frac{v_m}{|v_m|} \end{aligned}$$

Substituting into step 3 gives exactly the stated formula.

Step 5, the case $v_m=0$: step 2 gives $2v_m^2A_m$, which is $0$. (By step 1, $w_m=0$ as well.)

**In words.** The growth rate of $\sigma_m^2$ is proportional to $\sigma_m^2$ itself: the dynamics are multiplicative, so a small neuron moves slowly and a neuron at zero stays at zero.

**Sanity check.** Degrees match: $\sigma_m^2$ has degree 4 in the parameters, and the bracket has degree 0, because it uses only the direction $\hat w_m$ and the sign of $v_m$. Numerically, along a balanced flow the formula agrees with a finite-difference derivative of $\sigma_m^2$.

**What to write in the exam.**

- By part a, $v_m^2-\|w_m\|^2$ is constant, so it stays $0$ and $\|w_m\|=|v_m|$.
- Product rule: the derivative of $\sigma_m^2$ equals $2v_m^2A_m$.
- For $v_m\ne0$ use $\phi(z_{mn})=\|w_m\|\phi(\langle\hat w_m,x_n\rangle)$ and $v_m^3\|w_m\|=\sigma_m^2\frac{v_m}{|v_m|}$.
- For $v_m=0$ the factor $v_m^2$ gives derivative $0$.

*Verified: along a balanced flow integrated by Euler steps ($D=3$, $M=4$, $N=6$), the stated right-hand side matched a finite-difference derivative of $\sigma_m^2$ to relative error $7\cdot10^{-7}$ (NumPy).*

**3. Part c: $v_m$ never changes sign**

**What is asked.** With balanced initialization and $v_m(0)>0$, prove $v_m(t)>0$ for all $t\ge0$. The answer is a proof by contradiction along the given guidance.

**Tool and why.** On the interval before the first zero, part 2 is a linear ODE in $\sigma_m^2$; solving it with an integrating factor (cheat sheet §7) shows that $\sigma_m^2$ is an exponential of a bounded integral, and such a quantity cannot reach $0$ in finite time.

**Definitions.** $t_0$ is the first zero of $v_m$, as in the guidance. On $[0,t_0)$ we define

$$g(t):=-4\sum_{n=1}^N\ell'_n(t)\,\phi\big(\langle\hat w_m(t),x_n\rangle\big)$$

which is the bracket of part 2 with sign $+1$. $K_n$ is a bound on $|\ell'_n(t)|$ over $[0,t_0]$, and $G$ a bound on $|g|$; both are introduced to make "bounded" explicit.

**Solution.**

Step 1, the assumption: suppose some $\bar t$ has $v_m(\bar t)\le0$.

Step 2, a zero exists: $v_m$ is continuous (the flow is differentiable), $v_m(0)>0$ and $v_m(\bar t)\le0$. By the intermediate value theorem $v_m$ vanishes somewhere in $(0,\bar t]$.

Step 3, the first zero exists: the set $Z$ of zeros of $v_m$ in $[0,\infty)$ is non-empty, closed (the preimage of $\{0\}$ under a continuous map) and bounded below by $0$, so it contains its infimum. Let $t_0:=\min Z$. Then $t_0>0$, because $v_m(0)>0$.

Step 4, positivity before $t_0$: for $s<t_0$, $v_m(s)\ne0$ by minimality. If $v_m(s)<0$, the intermediate value theorem would give a zero in $(0,s)$, before $t_0$. So $v_m>0$ on $[0,t_0)$, and $\frac{v_m}{|v_m|}=1$ there.

Step 5, the ODE: on $[0,t_0)$, part 2 applies and reads

$$\frac{d}{dt}\sigma_m^2=g(t)\,\sigma_m^2$$

Here $g$ is well defined because $\|w_m\|=v_m$ by balancedness, and $v_m>0$.

Step 6, $g$ is continuous: $\theta(t)$ is continuous; $h_\theta(x_n)$ is continuous in $\theta$; $\ell'$ is continuous because $\ell$ is continuously differentiable; $\hat w_m$ is continuous where $w_m\ne0$; and $\phi$ is continuous.

Step 7, $g$ is bounded: $t\mapsto\ell'_n(t)$ is continuous on the closed interval $[0,t_0]$ (the flow exists at $t_0$ too), so it is bounded there by some $K_n$. By Cauchy–Schwarz, $|\phi(\langle\hat w_m,x_n\rangle)|\le\|x_n\|$, because $\|\hat w_m\|=1$. Hence

$$|g(t)|\le G:=4\sum_{n=1}^NK_n\|x_n\|$$

Step 8, solving the ODE: let $F(t):=\sigma_m(t)^2\exp(-\int_0^tg)$. By the product rule and step 5,

$$F'(t)=\big(g\sigma_m^2-g\sigma_m^2\big)\exp\Big(-\int_0^tg\Big)$$

which is $0$. So $F$ is constant, equal to $F(0)$, and

$$\sigma_m(t)^2=\sigma_m(0)^2\exp\Big(\int_0^tg(z)\,dz\Big)$$

Step 9, a positive lower bound: by balancedness $\sigma_m(0)^2=v_m(0)^4$, which is positive. By step 7 the integral is at least $-Gt_0$. So for every $t\in[0,t_0)$:

$$\begin{aligned} \sigma_m(t)^2 &\ge \sigma_m(0)^2e^{-Gt_0} \\ &> 0 \end{aligned}$$

Step 10, the contradiction: $\sigma_m^2$ is continuous on $[0,\infty)$, so $\sigma_m(t_0)^2$ is the limit from the left and is at least $\sigma_m(0)^2e^{-Gt_0}$, which is positive. But $v_m(t_0)=0$ gives $\sigma_m(t_0)=0$. So no such $\bar t$ exists, and $v_m(t)>0$ for all $t\ge0$.

**In words.** To flip its sign, $v_m$ must pass through $0$, and balancedness then forces $w_m=0$ too: the whole neuron must die. But its size follows multiplicative dynamics with a bounded rate, and the exponential of a finite number is never $0$.

**Sanity check.** The bound on $g$ is where balancedness matters. With an unbalanced start, $v_m(0)=0.05$ and $w_m(0)=2$ (one neuron, $x=1$, label $-1$), the flow drives $v_m$ below zero at about $t=0.012$. With a balanced start and a negative label, the simulated $v_m(t)$ stayed above $0.027$ up to $t=20$.

**What to write in the exam.**

- Suppose $v_m(\bar t)\le0$; by continuity there is a first zero $t_0>0$, and $v_m>0$ on $[0,t_0)$.
- On $[0,t_0)$, part b gives $\frac{d}{dt}\sigma_m^2=g\sigma_m^2$ with $g$ continuous.
- The function $g$ is bounded: $\ell'_n$ is continuous on the compact $[0,t_0]$, and $|\phi(\langle\hat w_m,x_n\rangle)|\le\|x_n\|$.
- Hence $\sigma_m(t)^2=\sigma_m(0)^2e^{\int_0^tg}$, which is at least $v_m(0)^4e^{-Gt_0}$; by continuity $\sigma_m(t_0)>0$.
- This contradicts $v_m(t_0)=0$.

*Verified: Euler simulation of the flow (balanced start, a negative label): minimal $v_m$ over $t\in[0,20]$ is $0.027$; unbalanced start $v=0.05$, $w=2$: sign flip at $t\approx0.012$ (NumPy).*

**4. Part d: a loss level that gradient flow never reaches**

**What is asked.** With square loss, balanced initialization, all $v_m(0)>0$, and one negative label $y_{\bar n}$, find $\epsilon>0$ such that $\mathcal{L}(\theta(t))\ge\epsilon$ for every $t$. The answer is a proof with an explicit $\epsilon$.

**Tool and why.** Part 3 keeps all output weights positive, and ReLU outputs are non-negative, so the network output is non-negative for all time (cheat sheet §7). A non-negative prediction is at distance at least $|y_{\bar n}|$ from a negative label.

**Definitions.** $\epsilon:=y_{\bar n}^2$.

**Solution.**

Step 1, part 3 applies to every neuron: the square loss $\ell(a,y)=(a-y)^2$ is non-negative and continuously differentiable, the initialization is balanced, and $v_m(0)>0$ for every $m$. So $v_m(t)>0$ for all $m$ and $t$.

Step 2, the output is non-negative: $\phi\ge0$ and $v_m(t)>0$, so every term of

$$h_{\theta(t)}(x)=\sum_{m=1}^Mv_m(t)\,\phi(\langle w_m(t),x\rangle)$$

is non-negative, for every $x$ and $t$.

Step 3, the bad example: since $h_{\theta(t)}(x_{\bar n})\ge0$ and $y_{\bar n}<0$,

$$\begin{aligned} h_{\theta(t)}(x_{\bar n})-y_{\bar n} &\ge -y_{\bar n} \\ &= |y_{\bar n}| \end{aligned}$$

Both sides are positive, so squaring keeps the inequality.

Step 4, the loss: every term of $\mathcal{L}$ is non-negative, so keeping only the term $\bar n$:

$$\begin{aligned} \mathcal{L}(\theta(t)) &\ge \big(h_{\theta(t)}(x_{\bar n})-y_{\bar n}\big)^2 \\ &\ge y_{\bar n}^2 \end{aligned}$$

Step 5, conclusion: $\epsilon=y_{\bar n}^2$ is positive, and $\mathcal{L}(\theta(t))\ge\epsilon$ for every $t\ge0$, so no $t$ gives a loss below $\epsilon$. (Summing $y_n^2$ over all negative labels gives a larger valid $\epsilon$.)

**In words.** A network whose output weights stay positive can only output non-negative numbers, so it can never fit a negative label. This is an optimization failure caused by the initialization: the class itself contains networks with $v_m<0$ that output negative values.

**Sanity check.** In the simulation with $y_{\bar n}=-1.5$ the floor is $2.25$, and the smallest loss reached along the flow was $2.39$, above the floor.

**What to write in the exam.**

- By part c, $v_m(t)>0$ for every $m$ and $t$, and $\phi\ge0$, so $h_{\theta(t)}\ge0$.
- For the negative label, $h_{\theta(t)}(x_{\bar n})-y_{\bar n}\ge|y_{\bar n}|$.
- So $\mathcal{L}(\theta(t))\ge y_{\bar n}^2$; take $\epsilon=y_{\bar n}^2$.

*Verified: Euler simulation with $y_{\bar n}=-1.5$: minimal loss $2.39$, above the floor $2.25$ (NumPy).*

**Common mistakes.**

- In part a, dropping the factor $v_m$ in $\nabla_{w_m}h_\theta$, or not checking $z\phi'(z)=\phi(z)$ at $z=0$, where the convention $\phi'(0)=0$ is needed.
- In part c, taking a logarithm of $\sigma_m^2$ before knowing it is positive, or not explaining why the first zero $t_0$ exists (a closed non-empty set) and why $g$ is bounded up to $t_0$.
- In part d, claiming that the class cannot output negative values: it can, with $v_m<0$; the obstruction comes from the sign preserved by the flow.

**💡 Useful tricks:** Homogeneity $z\phi'(z)=\phi(z)$ ⇒ balancedness $v_m^2-\|w_m\|^2$ conserved; write $\sigma_m^2$'s ODE as $\frac{d}{dt}\sigma_m^2=g(t)\sigma_m^2$ with $g$ *bounded*, so $\sigma_m^2=\sigma_m(0)^2e^{\int g}$ stays positive and never reaches $0$ ⇒ sign of $v_m$ is preserved; then $v_m>0$ and $\phi\geq0$ give $h\geq0$, so a negative label is unreachable.

**⚠️ Watch out:** (c) run the argument on $[0,t_0)$ up to the *first* vanishing time and get the contradiction from $g$ being bounded (needs $\theta(t)$ continuous on a compact, normalized $w_m$); (b) requires $v_m\neq0$ (balancedness then forces $w_m\neq0$ too); (d) the loss floor $y_{\bar n}^2$ is an *optimization* failure from sign-locked init, not a landscape/expressiveness obstruction.

## Q3 (33 pts) — Implicit bias of GD toward minimum norm & a complexity-adaptive generalization bound
**Topics:** implicit-bias, min-norm, gradient-descent, implicit-regularization, uniform-convergence, norm-bounds | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_09_generalization_4, lecture_06_generalization_1
**Statement (English translation):**
For input space $X = \mathbb{R}^D$ and output space $Y = \mathbb{R}$, let $S = \{(x_n,y_n)\}_{n=1}^N \subset (X\times Y)^N$ be a training sample of $N$ examples drawn i.i.d. from an (unknown) distribution $D$ over $X \times Y$.

**a. (15 pts)** For this sub-part only, assume $D > N$ and that the inputs $\{x_n\}_{n=1}^N$ are linearly independent. Given a differentiable and **invertible** function $\ell:\mathbb{R}\to\mathbb{R}_{\ge0}$, suppose we learn a linear classifier by running gradient descent over the following loss function:

$$\mathcal{L}: \mathbb{R}^D \to \mathbb{R}_{\ge0}\ ,\quad \mathcal{L}(w) = \frac{1}{N}\sum_{n=1}^N \ell(\langle x_n, w\rangle - y_n)$$

Denote by $w(t) \in \mathbb{R}^D$ the parameter vector at iteration $t \in \{0,1,\dots\}$ of gradient descent, and assume $w(0) = 0$. For some arbitrary fixed $\bar t \in \{0,1,\dots\}$, define $c_n := \ell(\langle x_n, w(\bar t)\rangle - y_n)$ for every $n \in \{1,\dots,N\}$. Prove that:

$$w(\bar t) \in \operatorname{argmin}_{w \in \mathbb{R}^D\ s.t.\ \forall n\in\{1,\dots,N\}:\ \ell(\langle x_n,w\rangle - y_n) = c_n} \|w\|$$

Let $\mathcal{H} \subset Y^X$ be an arbitrary hypothesis class. In this part of the question, for an arbitrary function $\ell:\mathbb{R}\to\mathbb{R}_{\ge0}$ (not necessarily invertible) and a hypothesis $h \in \mathcal{H}$, we define $\mathcal{L}_D(h) := \mathbb{E}_{(x,y)\sim D}[\ell(h(x) - y)]$ as the true (population) loss and $\mathcal{L}_S(h) := \frac{1}{N}\sum_{n=1}^N \ell(h(x_n) - y_n)$ as the sample loss.

Let $R: \mathcal{H} \to \mathbb{R}_{\ge0}$ be some complexity measure, and suppose we use a learning algorithm $A$ that tends to return hypotheses $h$ with low complexity $R(h)$. Moreover, assume that for every $r \in \mathbb{R}_{\ge0}$ and $\delta \in (0,1)$, with probability at least $1-\delta$ over the sample $S$:

$$\forall h \in \mathcal{H} \text{ with } R(h) \le r:\quad \mathcal{L}_D(h) - \mathcal{L}_S(h) \le \sqrt{\frac{r + \ln(1/\delta)}{N}}$$

**b. (10 pts)** Develop a generalization bound suited to using algorithm $A$. That is, develop an expression $\Delta(N,\delta,r)$ satisfying the following conditions:
1. For every $\delta \in (0,1)$ and $r \in \mathbb{R}_{\ge0}$: $\ \lim_{N\to\infty} \Delta(N,\delta,r) = 0$;
2. For every $\delta \in (0,1)$ and $N \in \mathbb{N}$, $\Delta(N,\delta,r)$ is monotonically increasing in $r$; that is, $\Delta(N,\delta,r_1) > \Delta(N,\delta,r_2)$ if $r_1 > r_2$;
3. For every $\delta \in (0,1)$, with probability at least $1-\delta$ over $S$:
$$\forall h \in \mathcal{H}:\quad \mathcal{L}_D(h) - \mathcal{L}_S(h) \le \Delta(N,\delta,R(h))$$

Make sure to define $\Delta(N,\delta,r)$ explicitly in your answer.

**c. (8 pts)** Suppose we ran algorithm $A$ on a training sample of size $N = 10^9$ and got back a hypothesis $h \in \mathcal{H}$ with complexity measure $R(h) = 1$. Are we guaranteed that the true loss $\mathcal{L}_D(h)$ will be low with high probability (e.g. above $0.9$)? Justify your answer.

**Solution sketch:**

**1. Part a: gradient descent from zero finds the minimum-norm point of its own level set**

**What is asked.** Prove that $w(\bar t)$ has the smallest norm among all $w$ that give every example the same loss $c_n$ as $w(\bar t)$. The answer is a proof.

**Tool and why.** The implicit bias of gradient descent from zero (cheat sheet §12): the iterates never leave the span of the inputs. Invertibility of $\ell$ turns the level set into an affine subspace, and on an affine subspace the in-span point is the shortest one, by Pythagoras.

**Definitions.** $X\in\mathbb{R}^{N\times D}$ is the matrix whose rows are $x_n^\top$, and $V:=\mathrm{span}\{x_1,\dots,x_N\}$. $\eta>0$ is the step size (the argument works for any step sizes, even changing ones). $F$ is the feasible set of the minimisation: all $w$ with $\ell(\langle x_n,w\rangle-y_n)=c_n$ for every $n$. Finally $b_n:=y_n+\ell^{-1}(c_n)$.

**Solution.**

Step 1, the gradient lies in $V$: by the chain rule

$$\nabla\mathcal{L}(w) = \frac{1}{N}\sum_n \ell'(\langle x_n,w\rangle - y_n)\,x_n \in \mathrm{span}\{x_1,\dots,x_N\}$$

because it is a linear combination of the $x_n$.

Step 2, the iterates stay in $V$.

**Claim.** $w(t)\in V$ for every $t$. The induction is on the iteration $t$, upwards.

**Base.** $w(0)=0$, and $0\in V$.

**Hypothesis.** $w(t)\in V$.

**Step.** $w(t+1)=w(t)-\eta\nabla\mathcal{L}(w(t))$. The first term is in $V$ by the hypothesis, the second by step 1, and $V$ is a subspace, so $w(t+1)\in V$. In particular

$$w(\bar t) \in \mathrm{span}\{x_n\}_{n=1}^N$$

Step 3, the constraints become linear: $\ell$ is invertible, hence one-to-one, and $c_n$ is a value of $\ell$ (it is attained at $w(\bar t)$), so $\ell^{-1}(c_n)$ is defined. Therefore the constraint $\ell(\langle x_n,w\rangle - y_n) = c_n$ holds exactly when

$$\langle x_n,w\rangle = y_n + \ell^{-1}(c_n)$$

So $F$ is the affine set $\{w: Xw = b\}$, and $w(\bar t)\in F$.

Step 4, the difference from $w(\bar t)$ is orthogonal to $V$: for $w\in F$, $X(w-w(\bar t))=0$, so $\langle x_n,w-w(\bar t)\rangle=0$ for every $n$. Hence $w-w(\bar t)\in V^\perp$.

Step 5, Pythagoras: write $w=w(\bar t)+(w-w(\bar t))$, a vector of $V$ plus a vector of $V^\perp$. Then

$$\begin{aligned} \|w\|^2 &= \|w(\bar t)\|^2+\|w-w(\bar t)\|^2 \\ &\ge \|w(\bar t)\|^2 \end{aligned}$$

So $w(\bar t)$ minimises the norm over $F$, which is the claim. Equality holds only for $w=w(\bar t)$, so the minimiser is unique.

Remark: the proof does not use $D>N$ or the linear independence of the inputs; with them every right-hand side $b$ is reachable, but the claim holds without them.

**In words.** Directions orthogonal to all inputs do not change any prediction, so they only add norm. Gradient descent from zero never moves in those directions, so whatever losses it reaches, it reaches them with the shortest possible vector.

**Sanity check.** At $\bar t=0$ the iterate is $w(0)=0$, which trivially has the smallest norm. Numerically, with $\ell(z)=e^z$ (invertible from $\mathbb{R}$ onto the positive reals), the GD iterate coincides with the minimum-norm solution of $Xw=b$ computed by the pseudo-inverse.

**What to write in the exam.**

- The gradient is a combination of the $x_n$, so by induction from $w(0)=0$ every iterate is in $\mathrm{span}\{x_n\}$.
- Invertibility of $\ell$: the constraints become $\langle x_n,w\rangle=y_n+\ell^{-1}(c_n)$, an affine set containing $w(\bar t)$.
- For a feasible $w$, $w-w(\bar t)$ is orthogonal to every $x_n$.
- Pythagoras gives $\|w\|^2\ge\|w(\bar t)\|^2$, so $w(\bar t)$ is the minimiser.

*Verified: 50 random instances ($N$ from 2 to 5, $D$ from 6 to 11, $\ell(z)=e^z$, up to 300 GD steps): distance between the GD iterate and the pseudo-inverse solution at most $1.4\cdot10^{-14}$; 1000 random feasible points, none shorter (NumPy).*

**2. Part b: a complexity-adaptive bound $\Delta(N,\delta,r)$**

**What is asked.** An explicit $\Delta(N,\delta,r)$ that tends to $0$ in $N$, increases strictly in $r$, and bounds the gap of every $h$ at level $R(h)$ simultaneously with probability at least $1-\delta$. The answer is a formula with a proof.

**Tool and why.** Structural risk minimisation (cheat sheet §2): apply the assumed bound at countably many complexity levels, give level $k$ a confidence budget $\delta_k$ with $\sum_k\delta_k=\delta$, and take a union bound. The assumed bound holds for one fixed $r$ at a time, while the learned $h$ has a complexity that is not known in advance.

**Definitions.** Levels $k=1,2,\dots$ with budgets $\delta_k:=\delta\,2^{-k}$. $E_k$ is the event that the assumed bound holds with $r=k$ and confidence $\delta_k$. For a hypothesis $h$, its level is $k(h):=\max\{\lceil R(h)\rceil,1\}$.

**Solution.**

Step 1, one level: the assumption with $r=k$ and $\delta_k\in(0,1)$ says $E_k$ fails with probability at most $\delta_k$. On $E_k$, every $h$ with $R(h)\le k$ has gap at most $\sqrt{(k+\ln(1/\delta_k))/N}$. Since $\ln(1/\delta_k)=\ln(1/\delta)+k\ln2$, this level bound is

$$\sqrt{\frac{k(1+\ln 2)+\ln(1/\delta)}{N}}$$

Step 2, union bound over levels:

$$\begin{aligned} \Pr\big(\text{some } E_k \text{ fails}\big) &\le \sum_{k\ge1}\delta\,2^{-k} \\ &= \delta \end{aligned}$$

So with probability at least $1-\delta$ all the events $E_k$ hold together.

Step 3, the level of a hypothesis: $k(h)\ge R(h)$, so $h$ is covered by level $k(h)$. Also $k(h)\le R(h)+1$, because $\lceil R(h)\rceil<R(h)+1$ and $1\le R(h)+1$.

Step 4, the bound: define

$$\Delta(N,\delta,r) := \sqrt{\dfrac{(r+1)(1+\ln 2) + \ln(1/\delta)}{N}}$$

On the event of step 2, the level-$k(h)$ bound holds for $h$, and it increases in $k$; replacing $k(h)$ by the larger $R(h)+1$ gives, for every $h$ at once,

$$\mathcal{L}_D(h)-\mathcal{L}_S(h)\le\Delta(N,\delta,R(h))$$

This is condition 3.

Step 5, conditions 1 and 2: for fixed $\delta$ and $r$ the numerator is a fixed number, so dividing by $N$ and taking the root tends to $0$. The numerator is strictly increasing in $r$ (its coefficient $1+\ln2$ is positive) and the square root is strictly increasing, so $\Delta$ is strictly increasing in $r$.

Remark: any summable budget works, for example $\delta_k\propto k^{-2}$, which gives a $\ln k$ term instead of $k\ln2$.

**In words.** We do not know in advance how complex the returned hypothesis will be, so we buy a guarantee for every level at once. The price of this adaptivity is the extra $(r+1)\ln2$ in the numerator, small next to $r$ itself.

**Sanity check.** At $r=1$, $\delta=0.05$, $N=100$: the fixed-level bound is $\sqrt{(1+\ln20)/100}$, about $0.200$, and $\Delta$ is about $0.253$, slightly larger, as the price of adaptivity. For $N=10^4$ and $N=10^6$, $\Delta$ is about $0.0253$ and $0.00253$: it decays like $1/\sqrt N$.

**What to write in the exam.**

- Apply the assumption with $r=k$ and $\delta_k=\delta2^{-k}$ for every $k\ge1$; a union bound costs $\sum_k\delta_k=\delta$.
- For $h$ use the level $k=\max\{\lceil R(h)\rceil,1\}$, which satisfies $k\le R(h)+1$.
- Define $\Delta$ by the formula of step 4: the level bound with $k$ replaced by $r+1$.
- It tends to $0$ in $N$, increases strictly in $r$, and bounds the gap of every $h$ with probability at least $1-\delta$.

*Verified: on a grid of 2001 values of $r$ in $[0,20]$, the level $k$ lies between $r$ and $r+1$ and the level bound never exceeds $\Delta$; $\sum_k2^{-k}$ equals $1$; the values $0.200$, $0.253$, $0.0253$, $0.00253$ computed in Python.*

**3. Part c: a small gap does not mean a small loss**

**What is asked.** With $N=10^9$ and a returned $h$ with $R(h)=1$, is a low true loss guaranteed with probability above $0.9$? The answer is yes or no with a justification.

**Tool and why.** The decomposition of the true loss into the empirical loss plus the generalization gap (cheat sheet §1). The bound controls only the gap, so the question is whether anything controls $\mathcal{L}_S(h)$.

**Definitions.** $\delta:=0.1$, so that the confidence is $0.9$. In the counterexample, $h_0$ is the zero function.

**Solution.**

Verdict: no.

Step 1, what the bound gives: with probability at least $0.9$,

$$\begin{aligned} \mathcal{L}_D(h) &\le \mathcal{L}_S(h)+\Delta(10^9,0.1,1) \\ &\approx \mathcal{L}_S(h)+7.5\cdot10^{-5} \end{aligned}$$

since the numerator is $2(1+\ln2)+\ln10$, about $5.69$, and $\sqrt{5.69\cdot10^{-9}}$ is about $7.5\cdot10^{-5}$.

Step 2, what is missing: nothing in the assumptions bounds $\mathcal{L}_S(h)$. The algorithm $A$ is only known to return low-complexity hypotheses, not low-loss ones.

Step 3, a concrete counterexample: let $\mathcal{H}$ contain only $h_0$, with $R(h_0)=1$; let $\ell(z)=\min\{z^2,1\}$, and let the distribution put the label $y=5$ on every input. Then $\ell(h_0(x)-y)$ is $\ell(-5)$, which is $1$, for every example, so

$$\mathcal{L}_S(h_0)=\mathcal{L}_D(h_0)=1$$

The gap is $0$, so the assumption holds for every $r$ and $\delta$. The algorithm must return $h_0$, which has complexity $1$, and yet its true loss is $1$, the largest value the loss can take.

Step 4, what can be said: if in addition $\mathcal{L}_S(h)$ is small, then $\mathcal{L}_D(h)$ is small with probability at least $0.9$. The low true loss needs a low training loss as well.

**In words.** True loss is training loss plus gap. A simple model generalizes, meaning its training loss is an honest estimate of its true loss, but the estimate can be honest and bad: simple models can underfit.

**Sanity check.** In the opposite case, if $A$ also returned $\mathcal{L}_S(h)=0$, the true loss would be at most about $7.5\cdot10^{-5}$ with probability $0.9$. The answer depends entirely on $\mathcal{L}_S(h)$.

**What to write in the exam.**

- No.
- The bound controls only the gap: $\mathcal{L}_D(h)\le\mathcal{L}_S(h)+\Delta$, with $\Delta$ tiny for $N=10^9$.
- Nothing guarantees a small $\mathcal{L}_S(h)$: $A$ returns low complexity, not low loss.
- Example: a single constant hypothesis with $R=1$ and loss $1$ on every example.

*Verified: $\Delta(10^9,0.1,1)$ computed as $7.54\cdot10^{-5}$ (numerator $5.689$); the counterexample loss $\ell(-5)$ evaluated as $1$ (Python).*

**Common mistakes.**

- In part a, claiming that $w(\bar t)$ is the minimum-norm interpolating solution; it is the minimum-norm point among those with the same losses $c_n$, which need not be zero. Another mistake is skipping invertibility, without which the level set is not affine.
- In part b, using $\delta_k=\delta$ for every level (the union then costs more than $\delta$), or defining $\Delta$ through $\lceil r\rceil$, which is constant between integers and so not strictly increasing.
- In part c, answering "yes, because $\Delta$ is tiny": a tiny gap says nothing about the training loss.

**💡 Useful tricks:** GD from $0$ stays in $\mathrm{span}\{x_n\}$; an *invertible* $\ell$ turns each level constraint $\ell(\cdot)=c_n$ into a linear one, so the feasible set is affine and the min-norm point is the in-span solution (Pythagoras); for the adaptive bound, stratify $r=k$ with $\delta_k=\delta2^{-k}$ and plug $k=\lceil R(h)\rceil$.

**⚠️ Watch out:** (a) invertibility is exactly what linearizes the level set — don't skip it; (b) give an *explicit* $\Delta$ that is increasing in $r$ AND $\to0$; (c) the trap — the bound controls only the *gap*; $A$ returns low-*complexity*, not low-*loss*, so $\mathcal L_S$ (hence $\mathcal L_D$) can still be large.
