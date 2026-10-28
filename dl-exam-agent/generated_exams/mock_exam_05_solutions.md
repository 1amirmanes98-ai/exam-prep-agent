# Mock Exam 5 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_05.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-10-28 (Q1: the width-4 Horner network reproduces random
polynomials of degree $\le 8$ to $10^{-13}$, the padded width-1 Chebyshev network equals
$\cos(2^L\theta)$ for $L \le 5$, a grid LP gives best uniform error $1.0000$ for
approximating $T_n$, $n \in \{2,3,4,8\}$, by degree $n-1$, and $1.0000$ for approximating
$x$ by $\gamma x^{2^L} + c$; Q2: LSODA integration of the $(u,v)$ flow — drift of
$u_iv_i$ $\sim 10^{-10}$, closed form and the $\dot w$ formula to $10^{-10}$, the loss
always below $\tfrac12\|y\|^2 e^{-16\alpha^2\lambda_0 t}$, $\operatorname{arcsinh}(w/2\alpha^2)
\in \operatorname{range}(X^\top)$ to $10^{-10}$, limits for $\alpha \in \{3, 1, 0.3, 0.1,
0.05\}$ match the closed form of 5c to 5 digits, and on a random $2 \times 4$ instance the
limit equals the constrained minimizer of $\Psi_\alpha$; Q3: $\sum_{P,k} 2^{-(P+k)} = 1$,
the numbers of part 5, and a lookup-table ERM on random labels — train error $0$, test
error $0.500$).

## Q1 — Deep squaring networks: Chebyshev depth separation and (non-)universality (40)

**Hint:** Track one number per layer: the largest possible degree of the polynomials
sitting in the neurons — what does squaring do to it? To run Horner's rule
$r \mapsto r\,x + \alpha$ inside the network you need two things in every layer: a product
(which squares can produce through a polarization identity) and a copy of $x$ (which
squares can also produce). For the lower bound, ask how many times a polynomial that stays
within distance less than $1$ of $T_n$ must change sign on $[-1,1]$, and how many roots a
polynomial of degree $n-1$ can have. For the bias-free class, think about symmetry.

**Full solution:**

**1. (5) Definition of exponential efficiency in the inapproximability sense**

**What is asked.** Write the course definition of "exponentially expressively efficient, in the inapproximability sense", instantiated for the deep family $\mathcal{N}_L$ against the shallow family $\mathcal{P}_B$. The answer is a definition with two conditions and explicit quantifiers.

**Tool and why.** The course definition of expressive efficiency (Def 2) with its two strengthenings, "exponential" and "inapproximability" (cheat sheet §4). Condition (i) says the deep family is never worse at comparable size; condition (ii) says some deep function is far from every shallow function unless the shallow size is exponential.

**Definitions.** The size parameter of the deep family is the depth $L$: the width is fixed at $4$, so $\mathcal{N}_L$ has $20L-7$ parameters, which is $O(L)$. The size parameter of the shallow family is the degree $B$, with $B+1$ parameters. We use $\epsilon>0$ for a fixed approximation accuracy and $c>1$ for the base of the exponential; both must be chosen before $L$.

**Solution.**

Step 1, condition (i), containment at comparable size (2 pts): for every $B \in \mathbb{N}_0$ there is $L \in O(B)$ with

$$\mathcal{P}_B \subseteq \mathcal{N}_L .$$

This says that whatever the shallow family can express, the deep family can express exactly, with a size of the same order.

Step 2, condition (ii), exponential inapproximability (3 pts): there exist $\epsilon > 0$ and $c > 1$ such that for every $L \in \mathbb{N}$ there is $\bar h \in \mathcal{N}_L$ with

$$\inf_{p \in \mathcal{P}_B} dist(\bar h, p) > \epsilon$$

for every $B$ with $B < c^L$.

Step 3, reading the quantifiers: $\epsilon$ and $c$ come first and do not depend on $L$. Then, for each depth $L$, one witness $\bar h$ is chosen. Finally the inequality must hold for all shallow sizes below $c^L$. So a shallow network can get within $\epsilon$ of $\bar h$ only if $B \ge c^L$, which is exponential in $L$, while $\bar h$ itself has $20L-7$ parameters.

**In words.** Depth never hurts (condition (i)), and for some targets depth helps exponentially, in a robust way: not only is $\bar h$ outside the small shallow classes, it is at a fixed positive distance from all of them, so even approximate representation needs exponential size.

**Sanity check.** The inapproximability condition implies the plain one. If $\bar h \in \mathcal{P}_B$, take $p = \bar h$; then the infimum is $0$, which is not larger than $\epsilon$. So condition (ii) forces $\bar h \notin \mathcal{P}_B$ for every $B$ with $B < c^L$, as the plain definition requires.

**What to write in the exam.**

- Condition (i): for every $B$ there is $L \in O(B)$ with $\mathcal{P}_B \subseteq \mathcal{N}_L$.
- Condition (ii): there are $\epsilon > 0$ and $c > 1$ such that for every $L$ there is $\bar h \in \mathcal{N}_L$ whose distance from $\mathcal{P}_B$ exceeds $\epsilon$ for every $B$ with $B < c^L$.
- Remark: $\bar h$ has $O(L)$ parameters, while approximating it needs $B \ge c^L$.
- Grading: deduct 2 for a missing condition (i); deduct 2 if (ii) only says $\bar h \notin \mathcal{P}_B$; deduct 1 if $\epsilon$ is chosen after $B$.

*Verified: no computation here; the parameter count $20L-7$ was recounted layer by layer in Python, and both conditions are checked numerically in parts 3 and 4.*

**2. (6) Every network is a polynomial of degree at most $2^L$**

**What is asked.** Prove that every $h \in \mathcal{N}_L$ is a polynomial in $x$ of degree at most $2^L$. The answer is a proof.

**Tool and why.** Induction on the layer index, tracking the maximal degree in the neurons (cheat sheet §5, composition: each layer acts on the previous layer's functions). It fits because each layer does only two things: an affine map, which never raises the degree, and squaring, which at most doubles it.

**Definitions.** No new notation. We use $\deg q$ for the degree of a polynomial $q$, with constants of degree at most $0$.

**Solution.**

Step 1, the two degree facts: for polynomials $q_1, q_2$ and real numbers $\lambda_1, \lambda_2, \beta$,

$$\deg(\lambda_1 q_1 + \lambda_2 q_2 + \beta) \le \max\{\deg q_1, \deg q_2, 0\},$$

because a linear combination cannot create a monomial of higher degree. Also $\deg(q^2) \le 2\deg q$, because the highest monomial of $q^2$ is the square of the highest monomial of $q$.

**Claim.** For every $l \in \{0, \dots, L\}$, every entry of $z^{(l)}$ is a polynomial in $x$ of degree at most $2^l$. The induction is on $l$, upward from $0$.

**Base.** $z^{(0)} = x$ is a polynomial of degree $1$, and $2^0 = 1$ (1 pt).

**Hypothesis.** For some $l \ge 1$, every entry of $z^{(l-1)}$ has degree at most $2^{l-1}$.

**Step.** Each entry of $W_l z^{(l-1)} + b_l$ is a linear combination of entries of $z^{(l-1)}$ plus a constant bias. By the hypothesis and Step 1 it has degree at most $2^{l-1}$; the bias is a constant and does not raise the degree. Squaring it at most doubles the degree, so every entry of $z^{(l)}$ has degree at most $2 \cdot 2^{l-1}$, which is $2^l$ (3 pts). The hypothesis is used exactly once, to bound the degree of the pre-activation.

Step 2, the output (2 pts): $h = a^\top z^{(L)} + c$ is again a linear combination plus a constant, so by Step 1 and the claim for $l = L$, $\deg h \le 2^L$. Hence

$$\mathcal{N}_L \subseteq \mathcal{P}_{2^L} .$$

The degree is "at most", not "equal": cancellations are possible, for example $a = 0$ gives a constant.

**In words.** The only non-linear operation is squaring, and each squaring can at most double the degree. After $L$ layers the degree has been doubled at most $L$ times, starting from $1$.

**Sanity check.** For $L = 1$ the network is $h(x) = \sum_i a_i (W_{1,i}\, x + b_{1,i})^2 + c$, a quadratic, and $2^1 = 2$.

**What to write in the exam.**

- Claim: every neuron of layer $l$ is a polynomial of degree at most $2^l$; induction on $l$.
- Base: $z^{(0)} = x$ has degree $1$.
- Step: affine maps and biases do not raise the degree, and $\deg(q^2) \le 2\deg q$.
- Output: a linear combination plus a constant, so $\deg h \le 2^L$.
- Grading: deduct 2 if the bias is not mentioned in the step.

*Verified: sympy expansion of random integer-weight networks with $L = 1, 2, 3$ gives degrees $2, 4, 8$, never more than $2^L$.*

**3. (10) Horner's rule in a width-4 squaring network, and universality**

**What is asked.** Prove that every polynomial of degree at most $B$ is computed by some network of depth $B$ (and constants by depth $1$), then state the universality definition and prove that the family $(\mathcal{N}_L)_L$ satisfies it. The answer is an explicit construction plus a short proof.

**Tool and why.** Horner's rule evaluates a degree-$B$ polynomial with $B$ steps of the form "multiply by $x$, add a constant", so one layer per step gives depth $B$. Squaring networks cannot multiply directly, but the polarization identity turns a product into a difference of squares, and a second difference of squares re-creates $x$ in every layer. For universality we combine this with Weierstrass (cheat sheet §4).

**Definitions.** Let $p(x) = \sum_{j=0}^B \alpha_j x^j$ with $B \ge 1$. The Horner sequence is $r_0 := \alpha_B$ and, for $l = 1, \dots, B$,

$$r_l := r_{l-1}\,x + \alpha_{B-l} .$$

We also define two read-out vectors, chosen so that a linear read-out of a layer gives back $r_{l-1}x$ and $x$:

$$\rho := (\tfrac14, -\tfrac14, 0, 0)^\top, \qquad \xi := (0, 0, \tfrac14, -\tfrac14)^\top .$$

**Solution.**

Step 1, Horner computes $p$ (1 pt). **Claim.** For every $l$ from $0$ to $B$,

$$r_l = \sum_{j=0}^{l} \alpha_{B-l+j}\, x^j .$$

**Base.** For $l = 0$ the sum has the single term $\alpha_B$, which is $r_0$.

**Hypothesis.** The formula holds for $l-1$.

**Step.** Multiply the formula for $r_{l-1}$ by $x$ and add $\alpha_{B-l}$:

$$\begin{aligned}
r_l &= \sum_{j=0}^{l-1} \alpha_{B-l+1+j}\, x^{j+1} + \alpha_{B-l} \\
&= \sum_{j=1}^{l} \alpha_{B-l+j}\, x^{j} + \alpha_{B-l}\, x^0 \\
&= \sum_{j=0}^{l} \alpha_{B-l+j}\, x^j .
\end{aligned}$$

The first row uses the hypothesis; the second shifts the index by one. For $l = B$ this gives $r_B = \sum_j \alpha_j x^j$, which is $p$.

Step 2, the two polarization identities, checked by expanding the squares:

$$\begin{aligned}
\tfrac14\big[ (r+x)^2 - (r-x)^2 \big] &= r\,x, \\
\tfrac14\big[ (x+1)^2 - (x-1)^2 \big] &= x .
\end{aligned}$$

Step 3, the invariant (2 pts): we build the network so that after every layer $l \in [B]$

$$r_l(x) = \rho^\top z^{(l)} + \alpha_{B-l}, \qquad x = \xi^\top z^{(l)} .$$

The first equation says the current Horner value can be read linearly from the layer; the second says $x$ is still available.

Step 4, layer $1$ (part of the 5 pts for the layers): take

$$W_1 = (1, -1, 1, 1)^\top, \qquad b_1 = (\alpha_B, \alpha_B, 1, -1)^\top .$$

The pre-activations are $\alpha_B + x$, $\alpha_B - x$, $x+1$ and $x-1$. Since $r_0 = \alpha_B$, these are $r_0 + x$, $r_0 - x$, $x+1$, $x-1$.

Step 5, layer $l \ge 2$: take the four rows of $W_l$ to be $\rho + \xi$, $\rho - \xi$, $\xi$, $\xi$, and

$$b_l = (\alpha_{B-l+1}, \alpha_{B-l+1}, 1, -1)^\top .$$

By the invariant at $l-1$, $\rho^\top z^{(l-1)} + \alpha_{B-l+1}$ equals $r_{l-1}$ and $\xi^\top z^{(l-1)}$ equals $x$, so the pre-activations are

$$\begin{aligned}
(\rho+\xi)^\top z^{(l-1)} + \alpha_{B-l+1} &= r_{l-1} + x, \\
(\rho-\xi)^\top z^{(l-1)} + \alpha_{B-l+1} &= r_{l-1} - x, \\
\xi^\top z^{(l-1)} + 1 &= x + 1, \\
\xi^\top z^{(l-1)} - 1 &= x - 1 .
\end{aligned}$$

These are affine in $z^{(l-1)}$, as a layer requires. This is the only place the invariant at $l-1$ is used.

Step 6, the invariant at $l$: in both cases (Steps 4 and 5) squaring gives

$$z^{(l)} = \big( (r_{l-1}+x)^2,\ (r_{l-1}-x)^2,\ (x+1)^2,\ (x-1)^2 \big),$$

so by Step 2, $\rho^\top z^{(l)} = r_{l-1}\,x$ and $\xi^\top z^{(l)} = x$. Adding $\alpha_{B-l}$ to the first gives $r_l$ by the Horner recursion, so the invariant holds at $l$.

Step 7, the output (1 pt): take $a := \rho$ and $c := \alpha_0$. By the invariant at $l = B$, $h = \rho^\top z^{(B)} + \alpha_0$, which is $r_B$, which is $p$ by Step 1. So $p \in \mathcal{N}_B$.

Step 8, the case $B = 0$: a constant $\alpha_0$ is realized in $\mathcal{N}_1$ by $a = 0$ and $c = \alpha_0$, with any weights.

Step 9, universality (1 pt). The definition: the family is universal for the continuous functions on $[-1,1]$ in the sense of $dist$ if for every continuous $f$ and every $\epsilon > 0$ there are $L \in \mathbb{N}$ and $h \in \mathcal{N}_L$ with $dist(f, h) < \epsilon$. Proof: Weierstrass gives a polynomial $p$, of some degree $B$, with $dist(f, p) < \epsilon$. By Steps 7 and 8, $p \in \mathcal{N}_{\max\{B, 1\}}$, so $h := p$ works.

**In words.** Two squares make a product, and two more squares make a fresh copy of $x$. With four neurons per layer the network can therefore perform one Horner step per layer while carrying $x$ along, so depth $B$ suffices for degree $B$.

**Sanity check.** For $B = 1$, $p = \alpha_1 x + \alpha_0$: layer $1$ gives $\rho^\top z^{(1)} = \alpha_1 x$, and adding $c = \alpha_0$ returns $p$. Also, the width is $4$ for every $B$, so $L = B$ is in $O(B)$, which is condition (i) of part 1. (Remark, not required: $\mathcal{N}_L \subseteq \mathcal{N}_{L+1}$, by appending a layer with pre-activations $h+1$, $h-1$, $0$, $0$ and reading out $\tfrac14[(h+1)^2 - (h-1)^2]$, which is $h$.)

**What to write in the exam.**

- Horner: $r_0 = \alpha_B$ and $r_l = r_{l-1}x + \alpha_{B-l}$, so $r_B = p$.
- Invariant: $r_l = \rho^\top z^{(l)} + \alpha_{B-l}$ and $x = \xi^\top z^{(l)}$.
- Layer $l$: pre-activations $r_{l-1} \pm x$ and $x \pm 1$, affine in the previous layer; polarization gives $r_{l-1}x$ and $x$.
- Output $a = \rho$, $c = \alpha_0$; constants via $a = 0$.
- Universality: definition, then Weierstrass plus $p \in \mathcal{N}_{\max\{B,1\}}$.

*Verified: a numpy implementation of exactly these weights reproduces random polynomials of degrees $1$ to $8$ at $41$ points of $[-1,1]$ with maximal error $5 \cdot 10^{-15}$.*

**4a. (4) The witness $\bar h_L$ is a depth-$L$ squaring network**

**What is asked.** Show that $\bar h_L$, the $L$-fold composition of $T_2$, belongs to $\mathcal{N}_L$, and that $\bar h_L(\cos\theta) = \cos(2^L\theta)$. The answer is an explicit network plus an induction.

**Tool and why.** $T_2(u) = 2u^2 - 1$ is itself "a square minus one", so each layer can apply one $T_2$ if the "$-1$" is passed on through the next bias. The identity follows by induction from the double-angle formula (cheat sheet §5: composition of simple units, as for the sawtooth).

**Definitions.** We write $\bar h_l$ for the $l$-fold composition of $T_2$, so $\bar h_1 = T_2$ and $\bar h_l = T_2 \circ \bar h_{l-1}$.

**Solution.**

Step 1, $T_2$ as a square: $\sigma(\sqrt2\,u) = 2u^2$, so

$$T_2(u) = \sigma(\sqrt2\,u) - 1 .$$

Step 2, the weights (2 pts): only neuron $1$ is used. $W_1 = (\sqrt2, 0, 0, 0)^\top$ and $b_1 = 0$. For $l \ge 2$, $W_l$ has $(W_l)_{11} = \sqrt2$ and zeros elsewhere, and $b_l = (-\sqrt2, 0, 0, 0)^\top$. The output is $a = e_1$, $c = -1$. Neurons $2$ to $4$ have zero weights and zero biases, so they stay $0$.

**Claim.** For every $l \in [L]$, $z^{(l)}_1 - 1 = \bar h_l(x)$. The induction is on $l$, upward.

**Base.** $z^{(1)}_1 = (\sqrt2\,x)^2$, which is $2x^2$, so $z^{(1)}_1 - 1 = T_2(x)$, which is $\bar h_1(x)$.

**Hypothesis.** $z^{(l-1)}_1 - 1 = \bar h_{l-1}(x)$ for some $l \ge 2$.

**Step.** The pre-activation of neuron $1$ is $\sqrt2\, z^{(l-1)}_1 - \sqrt2$, which by the hypothesis is $\sqrt2\, \bar h_{l-1}(x)$. Hence

$$\begin{aligned}
z^{(l)}_1 &= \big( \sqrt2\,(z^{(l-1)}_1 - 1) \big)^2 = 2\,\bar h_{l-1}(x)^2, \\
z^{(l)}_1 - 1 &= T_2(\bar h_{l-1}(x)) = \bar h_l(x).
\end{aligned}$$

The bias $-\sqrt2$ is how the "$-1$" of $T_2$ is passed to the next layer. The output is $e_1^\top z^{(L)} - 1$, which is $\bar h_L(x)$, so $\bar h_L \in \mathcal{N}_L$.

Step 3, the identity (2 pts). **Claim.** $\bar h_l(\cos\theta) = \cos(2^l\theta)$ for every $l$ and every $\theta$; induction on $l$, using $\cos 2\beta = 2\cos^2\beta - 1$.

**Base.** $\bar h_1(\cos\theta) = 2\cos^2\theta - 1$, which is $\cos 2\theta$.

**Hypothesis.** $\bar h_{l-1}(\cos\theta) = \cos(2^{l-1}\theta)$ for all $\theta$.

**Step.** Apply $T_2$ to the hypothesis and use the double-angle formula with $\beta = 2^{l-1}\theta$:

$$\begin{aligned}
\bar h_l(\cos\theta) &= T_2\big(\cos(2^{l-1}\theta)\big) \\
&= 2\cos^2(2^{l-1}\theta) - 1 \\
&= \cos(2^l\theta).
\end{aligned}$$

Step 4, a consequence used in part 4c: $T_{2^L}(\cos\theta) = \cos(2^L\theta)$ too, so $\bar h_L$ and $T_{2^L}$ agree on all of $[-1,1]$. Two polynomials that agree on infinitely many points are equal, so $\bar h_L = T_{2^L}$.

**In words.** Each layer applies one doubling of the angle, so $L$ layers multiply the angle by $2^L$: the function oscillates $2^L$ times while the network has only $L$ layers.

**Sanity check.** For $L = 2$: $T_2(T_2(x)) = 2(2x^2-1)^2 - 1$, which expands to $8x^4 - 8x^2 + 1$, the known $T_4$.

**What to write in the exam.**

- $T_2(u) = \sigma(\sqrt2\,u) - 1$; one neuron per layer, weight $\sqrt2$, bias $-\sqrt2$ from layer $2$, output $e_1$ and $c = -1$.
- Induction: $z^{(l)}_1 - 1 = \bar h_l(x)$.
- Induction with $\cos 2\beta = 2\cos^2\beta - 1$: $\bar h_l(\cos\theta) = \cos(2^l\theta)$.

*Verified: the numpy network equals $\cos(2^L\theta)$ for $L \le 5$ on $101$ angles (error $9 \cdot 10^{-14}$), sympy confirms $\bar h_L = T_{2^L}$ for $L \le 4$, and the network has $2L+1$ non-zero parameters.*

**4b. (6) $T_n$ is at distance at least $1$ from every polynomial of degree $n-1$**

**What is asked.** Prove $dist(T_n, p) \ge 1$ for every polynomial $p$ of degree at most $n-1$, and that the value $1$ is attained. The answer is a proof by contradiction plus an example.

**Tool and why.** Equioscillation plus root counting: $T_n$ alternates between $+1$ and $-1$ at $n+1$ points, so anything uniformly closer than $1$ must alternate in sign too, which forces $n$ roots. A non-zero polynomial of degree $n-1$ cannot have that many. This is the polynomial analogue of the sawtooth inapproximability argument (cheat sheet §5).

**Definitions.** The alternation points are $x_k := \cos(k\pi/n)$ for $k = 0, 1, \dots, n$, as in the hint.

**Solution.**

Step 1, the points are ordered: $\cos$ is strictly decreasing on $[0,\pi]$ and $k\pi/n$ runs from $0$ to $\pi$, so

$$1 = x_0 > x_1 > \dots > x_n = -1 .$$

Step 2, the values of $T_n$: with $\theta = k\pi/n$, the Chebyshev reminder gives

$$T_n(x_k) = \cos(k\pi) = (-1)^k .$$

Step 3, assume for contradiction that $dist(T_n, p) < 1$. Then at every point of $[-1,1]$, in particular at each $x_k$, $|p(x_k) - (-1)^k| < 1$. For even $k$ this means $p(x_k) > 1 - 1$, so $p(x_k) > 0$. For odd $k$ it means $p(x_k) < -1 + 1$, so $p(x_k) < 0$. Together: $(-1)^k p(x_k) > 0$ for every $k$ (2 pts).

Step 4, root counting (3 pts): consecutive points have opposite signs of $p$, so by the intermediate value theorem $p$ has a root in each open interval $(x_{k+1}, x_k)$, for $k = 0, \dots, n-1$. These $n$ intervals are disjoint, so $p$ has at least $n$ distinct roots.

Step 5, the contradiction: $p$ is not the zero polynomial, because $p(x_0) > 0$. A non-zero polynomial of degree at most $n-1$ has at most $n-1$ roots, but we found $n$. Hence $dist(T_n, p) \ge 1$.

Step 6, attained (1 pt): $p \equiv 0$ is in $\mathcal{P}_{n-1}$, and

$$dist(T_n, 0) = \sup_\theta |\cos n\theta| = 1 .$$

So the infimum over $\mathcal{P}_{n-1}$ is exactly $1$:

$$\boxed{\inf_{p \in \mathcal{P}_{n-1}} dist(T_n, p) = 1}$$

**In words.** $T_n$ swings fully between $+1$ and $-1$ exactly $n$ times. To follow it within less than $1$ you must swing across $0$ the same number of times, and a polynomial of lower degree does not have enough roots to do that. The best a lower-degree polynomial can do is the trivial $0$.

**Sanity check.** For $n = 1$, $T_1 = x$ and $p$ is a constant $\eta$; at $x = \pm 1$ the errors are $|1 - \eta|$ and $|1 + \eta|$, whose sum is at least $2$, so one of them is at least $1$.

**What to write in the exam.**

- At $x_k = \cos(k\pi/n)$: $T_n(x_k) = (-1)^k$.
- If $dist < 1$ then $(-1)^k p(x_k) > 0$, so $p$ changes sign $n$ times.
- Intermediate value theorem: $n$ roots in the $n$ gaps; $p \not\equiv 0$ since $p(x_0) > 0$; contradiction with degree $n-1$.
- Equality: $p \equiv 0$ gives distance exactly $1$.

*Verified: a linear program on $2001$ Chebyshev-grid points gives best uniform error $1.0000$ for approximating $T_n$ by degree $n-1$, for $n \in \{1, 2, 3, 4, 8\}$; the values $T_n(x_k)$ alternate $\pm1$ exactly.*

**4c. (2) Exponential efficiency, and the parameter count**

**What is asked.** Combine parts 3 and 4 to verify both conditions of the definition in part 1, and compare the numbers of parameters. The answer is a short argument plus a comparison.

**Tool and why.** Plug the containment of part 3 into condition (i) and the witness of parts 4a–4b into condition (ii) (cheat sheet §4).

**Definitions.** No new notation; we choose $\epsilon := \tfrac12$ and $c := 2$.

**Solution.**

Step 1, condition (i) (1 pt): by part 3, $\mathcal{P}_B \subseteq \mathcal{N}_L$ with $L = \max\{B, 1\}$, which is in $O(B)$.

Step 2, condition (ii): fix $L$ and take $\bar h := \bar h_L \in \mathcal{N}_L$ (part 4a). On $[-1,1]$ it equals $T_{2^L}$, and $dist$ only looks at $[-1,1]$. If $B < 2^L$ then $\mathcal{P}_B \subseteq \mathcal{P}_{2^L - 1}$, so the infimum over the smaller set is at least the infimum over the larger one. By part 4b with $n = 2^L$:

$$\inf_{p \in \mathcal{P}_B} dist(\bar h_L, p) \;\ge\; 1 \;>\; \epsilon .$$

This is condition (ii) with $c = 2$; any $\epsilon \in (0,1)$ works.

Step 3, the parameter comparison (1 pt): the deep network has $20L - 7$ parameters, of which only $2L + 1$ are non-zero. A polynomial-feature network within distance less than $1$ of $\bar h_L$ needs $B \ge 2^L$, that is, at least $2^L + 1$ parameters.

**In words.** Depth $L$ produces $2^L$ oscillations at linear cost, while the shallow family pays one parameter per degree, and part 4b says it cannot cut corners: fewer than $2^L$ degrees leave an error of at least $1$.

**Sanity check.** The exponential gap appears quickly: with all $20L-7$ parameters counted, the deep network is already smaller for $L = 8$ ($153$ against $257$); counting only non-zero parameters, $2L+1$ against $2^L+1$, it is smaller from $L = 3$ ($7$ against $9$).

**What to write in the exam.**

- Condition (i): part 3 with $L = \max\{B,1\}$.
- Condition (ii): $\bar h_L = T_{2^L}$ on $[-1,1]$, and for $B < 2^L$ part 4b gives distance at least $1$; take $\epsilon = \tfrac12$ and $c = 2$.
- Parameters: $20L - 7$ (only $2L+1$ non-zero) against at least $2^L + 1$.

*Verified: the counts $20L-7$, $2L+1$ and $2^L+1$ were tabulated in Python for $L \le 11$, and the LP of part 4b gives error $1.0000$ for $n = 8$, which is $2^3$.*

**5a. (2) A fixed depth is not universal**

**What is asked.** For a fixed $L$, exhibit a continuous $f$ with $dist(f, h) \ge 1$ for every $h \in \mathcal{N}_L$. The answer is an explicit $f$ plus a two-line proof.

**Tool and why.** Combine the degree bound of part 2 with the lower bound of part 4b, using a Chebyshev polynomial one degree too high. To refute universality one $f$ and one $\epsilon$ suffice (cheat sheet §4).

**Definitions.** No new notation.

**Solution.**

Step 1, the target: $f := T_{2^L + 1}$, a polynomial, hence continuous on $[-1,1]$.

Step 2, every $h \in \mathcal{N}_L$ is a polynomial of degree at most $2^L$ (part 2).

Step 3, apply part 4b with $n = 2^L + 1$: $h$ has degree at most $n - 1$, so $dist(f, h) \ge 1$. Hence no $h \in \mathcal{N}_L$ is within $\epsilon = 1$ of $f$, and $\mathcal{N}_L$ alone is not universal.

**In words.** A fixed depth caps the degree, and a Chebyshev polynomial of the next degree oscillates once more than anything below that cap can follow. Universality in part 3 needed depth that grows with the target.

**Sanity check.** For $L = 1$: $\mathcal{N}_1$ contains only quadratics, and $f = T_3$ is the cubic $4x^3 - 3x$, which part 4b keeps at distance at least $1$ from every quadratic.

**What to write in the exam.**

- Take $f = T_{2^L+1}$, which is continuous.
- Part 2: $\mathcal{N}_L \subseteq \mathcal{P}_{2^L}$.
- Part 4b with $n = 2^L + 1$: $dist(f, h) \ge 1$ for every $h$.

*Verified: the LP of part 4b with $n = 3$ gives best quadratic error $1.0000$ for $T_3$.*

**5b. (5) Bias-free networks are even and cannot approximate $x$**

**What is asked.** Show that a bias-free squaring network computes $\gamma\, x^{2^L} + c$, and that the bias-free family stays at distance at least $1$ from $f(x) = x$ for every depth. The answer is an induction plus an inequality.

**Tool and why.** Induction on layers, as in part 2, but now tracking the exact form of each neuron (a single monomial). The resulting functions are even, and an even function cannot follow an odd one: comparing $x = 1$ with $x = -1$ gives a bound independent of $L$ (cheat sheet §4, non-universality by one $f$).

**Definitions.** We write $\gamma^{(l)}_i$ for the coefficient in neuron $i$ of layer $l$, and $\eta$ for the common value $h(1) = h(-1)$ introduced in Step 4.

**Solution.**

Step 1, the form (3 pts). **Claim.** For every $l \in [L]$ and every $i$, $z^{(l)}_i = \gamma^{(l)}_i x^{2^l}$ for some $\gamma^{(l)}_i \ge 0$. Induction on $l$, upward.

**Base.** With $b_1 = 0$, $z^{(1)}_i = \big((W_1)_i\, x\big)^2$, which is $(W_1)_i^2\, x^2$.

**Hypothesis.** $z^{(l-1)}_j = \gamma^{(l-1)}_j x^{2^{l-1}}$ for every $j$.

**Step.** With $b_l = 0$ the pre-activation of neuron $i$ is $\sum_j (W_l)_{ij}\, z^{(l-1)}_j$. Insert the hypothesis and pull out the common power:

$$\begin{aligned}
z^{(l)}_i &= \Big( \sum_j (W_l)_{ij}\, \gamma^{(l-1)}_j\, x^{2^{l-1}} \Big)^2 \\
&= \Big( \sum_j (W_l)_{ij}\, \gamma^{(l-1)}_j \Big)^2 x^{2^l} .
\end{aligned}$$

The squared sum is the new coefficient, which is non-negative.

Step 2, the output: the output bias $c$ is kept, so

$$\begin{aligned}
h(x) &= a^\top z^{(L)} + c \\
&= \gamma\, x^{2^L} + c,
\end{aligned}$$

where $\gamma := \sum_i a_i \gamma^{(L)}_i$ can be any real number.

Step 3, symmetry: $2^L$ is even, so $h(-x) = h(x)$ for every $x$.

Step 4, the lower bound (2 pts): let $\eta := h(1)$, which also equals $h(-1)$ by Step 3. For $f(x) = x$, the triangle inequality gives

$$\begin{aligned}
2 &= |f(1) - f(-1)| \\
&\le |f(1) - \eta| + |\eta - f(-1)| \\
&\le 2\, dist(f, h).
\end{aligned}$$

The last row holds because each of the two terms is a difference of $f$ and $h$ at a point of $[-1,1]$. So $dist(f, h) \ge 1$ for every $h \in \bigcup_L \mathcal{N}^0_L$, with a bound that does not depend on $L$.

Step 5, tightness: $h \equiv 0$ (all output weights and $c$ zero) is bias-free and has $dist(f, 0) = 1$.

**In words.** Without biases nothing breaks the symmetry $x \mapsto -x$, because squaring erases the sign of $x$ in the first layer. Every bias-free network is even, and no even function can be close to $x$ at both $+1$ and $-1$. Depth does not help; compare part 4a, where the bias $-\sqrt2$ was essential.

**Sanity check.** For $L = 1$, $h = \gamma x^2 + c$ takes the same value $\gamma + c$ at $\pm1$, while $f$ takes $+1$ and $-1$; one of the two errors is at least $1$.

**What to write in the exam.**

- Induction: $z^{(l)}_i = \gamma^{(l)}_i x^{2^l}$, because without biases the pre-activation is a multiple of $x^{2^{l-1}}$.
- Output: $h = \gamma x^{2^L} + c$, an even function.
- Triangle inequality at $\pm1$: $2 \le 2\,dist(f,h)$, so $dist \ge 1$ for all depths; $h \equiv 0$ shows it is tight.
- Grading: no credit for "$h(0) = c$" or "$h$ is not linear" without a bound uniform over depths.

*Verified: sympy expansion of random bias-free networks with $L = 1, 2, 3$ leaves only the monomials $x^{2^L}$ and $1$, with non-negative coefficients in every neuron; an LP gives best uniform error $1.0000$ for approximating $x$ by $\gamma x^{2^L} + c$, $L = 1, 2, 3$.*

**Common mistakes.**

- Writing condition (ii) of part 1 as "$\bar h \notin \mathcal{P}_B$". That is plain efficiency; the inapproximability sense needs a positive distance, and condition (i) is graded too.
- In part 3, using $r_{l-1}$ or $x$ "directly" in a later layer without expressing it as an affine function of $z^{(l-1)}$. After one squaring layer $x$ is gone unless it is re-created by $(x+1)^2 - (x-1)^2$.
- In part 4b, concluding only $p(x_k) \ne 0$ instead of the sign, counting $n+1$ roots instead of $n$, or forgetting to exclude $p \equiv 0$.

**💡 Useful tricks:** Squaring at most doubles the degree, so degree $\le 2^L$ after $L$ layers; polarization $rx = \tfrac14[(r+x)^2 - (r-x)^2]$ plus re-creating $x = \tfrac14[(x+1)^2 - (x-1)^2]$ runs Horner at width $4$; $T_2 \circ T_2 \circ \cdots = T_{2^L}$ by $\cos 2\theta = 2\cos^2\theta - 1$; equioscillation at $\cos(k\pi/n)$ plus root counting gives $dist \ge 1$; bias-free squaring networks are even, which kills odd targets.

**⚠️ Watch out:** (1) the *inapproximability* version needs $\inf_p dist > \epsilon$, not just non-membership, and condition (i) is graded too; (3) every pre-activation must be affine in the *previous layer's* outputs, and $x$ must be carried forward; (4b) use the *signs* at the $n+1$ alternation points to get $n$ roots, and handle $p \equiv 0$; (5) fixed depth is not universal, but growing depth is — keep the two quantifiers apart.

## Q2 — Gradient flow on a difference-of-squares (diagonal) reparameterization (35)

**Hint:** Work one coordinate at a time: $w_i$ depends only on $u_i$ and $v_i$. Once you
see that $\dot u_i$ and $\dot v_i$ are $\mp 2 g_i$ times themselves, ask which product of
the two is left unchanged, and what an equation of the form $\dot z = -2 g(t)\, z$
integrates to. For the $w$-dynamics, express $u_i^2 + v_i^2$ through $u_i^2 - v_i^2$ and the
conserved product. For convergence, bound the preconditioner from below. For the implicit
bias, look for a function of $w$ whose time derivative is exactly a multiple of
$\nabla L$ — then think about which subspace it can never leave.

**Full solution:**

**1. (5) The gradients of $\phi$**

**What is asked.** Compute $\nabla_u \phi$ and $\nabla_v \phi$ in terms of $\nabla L(w)$, and write the resulting gradient flow. The answer is two formulas.

**Tool and why.** The chain rule, one coordinate at a time (cheat sheet §7). It is easy here because $w_i$ depends only on $u_i$ and $v_i$, so the Jacobian of $(u,v) \mapsto w$ is diagonal.

**Definitions.** No new notation; $w$, $r$ and $g$ are as in the statement.

**Solution.**

Step 1, the partial derivatives of $w$: $w_j = u_j^2 - v_j^2$, so $\partial w_j / \partial u_i$ is $2u_i$ if $j = i$ and $0$ otherwise; likewise $\partial w_j / \partial v_i$ is $-2v_i$ if $j = i$ and $0$ otherwise.

Step 2, the chain rule (3 pts): only the term $j = i$ survives in $\sum_j \frac{\partial L}{\partial w_j} \frac{\partial w_j}{\partial u_i}$, so

$$\frac{\partial \phi}{\partial u_i} = \frac{\partial L}{\partial w_i}(w) \cdot 2 u_i,$$

$$\frac{\partial \phi}{\partial v_i} = \frac{\partial L}{\partial w_i}(w) \cdot (-2 v_i).$$

In vector form, $\nabla_u \phi = 2 u \odot \nabla L(w)$ and $\nabla_v \phi = -2 v \odot \nabla L(w)$.

Step 3, the gradient of $L$ (1 pt): differentiating $\tfrac12\|Xw - y\|^2$ gives $\nabla L(w) = X^\top (X w - y)$, which is $g$ along the flow.

Step 4, the flow (1 pt): negating the gradients,

$$\dot u = -2\, u \odot g, \qquad \dot v = 2\, v \odot g .$$

**In words.** Each branch is pushed by the same signal $g$, scaled by its own current value, but with opposite signs: the negative branch enters $w$ with a minus, so it moves the other way.

**Sanity check.** For $d = 1$, $N = 1$, $X = 1$ and $y = 0$: $\phi = \tfrac12(u^2 - v^2)^2$, and directly $\partial\phi/\partial u = 2u(u^2 - v^2)$, which is $2u \cdot w$, matching $2u \cdot \nabla L(w)$ since $\nabla L(w) = w$ here.

**What to write in the exam.**

- $\phi$ depends on $(u_i, v_i)$ only through $w_i = u_i^2 - v_i^2$.
- Chain rule: $\partial\phi/\partial u_i = 2u_i\,\partial_i L$ and $\partial\phi/\partial v_i = -2v_i\,\partial_i L$.
- Flow: $\dot u = -2u \odot g$ and $\dot v = 2v \odot g$.
- Grading: deduct 2 for a sign error in the $v$-equation.

*Verified: central finite differences of $\phi$ on a random $3 \times 5$ instance match both formulas to $4 \cdot 10^{-9}$.*

**2. (7) Conservation, closed form and sign preservation**

**What is asked.** (i) Show that each product $u_i v_i$ is constant in time; (ii) prove the exponential closed forms for $u(t)$ and $v(t)$; (iii) deduce sign preservation, the consequence for $v(0) = 0$, and explain why the model uses a difference of squares. The answers are proofs and one sentence.

**Tool and why.** Conservation laws of gradient flow (cheat sheet §8): differentiate the candidate quantity and show the derivative is $0$. For (ii), each coordinate satisfies a linear scalar ODE $\dot z = \mp 2 g_i(t) z$, which is solved by an integrating factor.

**Definitions.** $G(t) := \int_0^t g(s)\, ds$ as in the statement. We introduce it because the coefficient of the linear ODE is $g_i(t)$, and its antiderivative is what appears in the exponent.

**Solution.**

Step 1, (i) the product is conserved (2 pts): by the product rule and part 1,

$$\begin{aligned}
\frac{d}{dt}(u_i v_i) &= \dot u_i v_i + u_i \dot v_i \\
&= -2 g_i u_i v_i + 2 g_i u_i v_i \\
&= 0 .
\end{aligned}$$

So $u_i(t)\, v_i(t) = u_i(0)\, v_i(0)$. This is the analogue of balancedness for this parameterization: here a product, not a difference of squares, is conserved.

Step 2, (ii) the closed form for $u$ (3 pts with Step 3): $g$ is continuous along the flow, so $G$ is differentiable with $\dot G = g$ and $G(0) = 0$. Multiply $u_i$ by $e^{2G_i}$ and differentiate:

$$\frac{d}{dt}\big[ u_i(t)\, e^{2G_i(t)} \big] = e^{2G_i}\big( \dot u_i + 2 g_i u_i \big)
= 0,$$

because $\dot u_i = -2 g_i u_i$. At $t = 0$ the bracket equals $u_i(0)$, so $u_i(t) = u_i(0)\, e^{-2G_i(t)}$.

Step 3, the closed form for $v$, in the same way with the opposite sign:

$$\frac{d}{dt}\big[ v_i(t)\, e^{-2G_i(t)} \big] = e^{-2G_i}\big( \dot v_i - 2 g_i v_i \big) = 0 ,$$

so $v_i(t) = v_i(0)\, e^{2G_i(t)}$. Multiplying the two closed forms re-proves (i), since the exponentials cancel.

Step 4, (iii) signs (2 pts with Step 5): $e^{\pm 2G_i(t)} > 0$, so $u_i(t)$ is a positive multiple of $u_i(0)$ and keeps its sign; zero entries stay zero. The same holds for $v_i$. In particular, if $v(0) = 0$ then $v \equiv 0$, and $w = u \odot u$, so $w(t) \ge 0$ entry-wise for all $t$.

Step 5, why the difference: $u \odot u$ alone can only produce non-negative predictors. With the difference, every $w \in \mathbb{R}^d$ is reachable: take $u = \sqrt{w_+}$ and $v = \sqrt{w_-}$, where $w_+$ and $w_-$ are the positive and negative parts of $w$. So the negative branch is what makes the model as expressive as plain linear regression.

**In words.** Each coordinate is a pair of numbers being multiplied by opposite exponential factors: one grows exactly as fast as the other shrinks, so their product is frozen and neither can cross zero.

**Sanity check.** If $g_i(t) > 0$ throughout, $u_i$ shrinks and $v_i$ grows, so $w_i$ decreases, which is the right direction for gradient flow on $L$ since $\partial_i L > 0$.

**What to write in the exam.**

- (i) The derivative of $u_iv_i$ is $\dot u_i v_i + u_i \dot v_i$, which is $0$ by part 1.
- (ii) Integrating factor: $u_i e^{2G_i}$ and $v_i e^{-2G_i}$ have zero derivative.
- (iii) Positive exponential factors keep signs; with $v(0) = 0$, $w = u \odot u$, which is non-negative; the difference reaches every $w$.
- Grading: no credit for claiming that $u_i$ and $v_i$ are each conserved, or for sign preservation from "continuity" alone.

*Verified: LSODA integration of the $(u,v)$ flow from a random-sign initialization keeps $u_iv_i$ constant to $5 \cdot 10^{-11}$, matches both closed forms to $6 \cdot 10^{-11}$, and keeps every sign.*

**3. (6) The dynamics of $w$**

**What is asked.** With $u(0)$ and $v(0)$ both equal to $\alpha\mathbf{1}$, prove the closed $w$-dynamics $\dot w = -4\sqrt{w \odot w + 4\alpha^4} \odot \nabla L(w)$. The answer is a derivation.

**Tool and why.** End-to-end dynamics (cheat sheet §8): differentiate $w$, then eliminate $u$ and $v$ using the conservation law of part 2. The identity $(a+b)^2 = (a-b)^2 + 4ab$, applied to $a = u_i^2$ and $b = v_i^2$, links the needed sum to $w_i$ and the conserved product.

**Definitions.** No new notation.

**Solution.**

Step 1, the conserved value (1 pt): by part 2(i), $u_i(t)\, v_i(t) = \alpha \cdot \alpha$, so $u_i v_i = \alpha^2$ for all $t$.

Step 2, differentiate $w_i$ (2 pts): by the product rule and part 1,

$$\begin{aligned}
\dot w_i &= 2 u_i \dot u_i - 2 v_i \dot v_i \\
&= -4 u_i^2 g_i - 4 v_i^2 g_i \\
&= -4\,(u_i^2 + v_i^2)\, g_i .
\end{aligned}$$

Step 3, eliminate $u$ and $v$ (3 pts):

$$\begin{aligned}
(u_i^2 + v_i^2)^2 &= (u_i^2 - v_i^2)^2 + 4 u_i^2 v_i^2 \\
&= w_i^2 + 4\alpha^4 .
\end{aligned}$$

The second row uses Step 1 squared. Since $u_i^2 + v_i^2 \ge 0$, we may take the non-negative square root: $u_i^2 + v_i^2 = \sqrt{w_i^2 + 4\alpha^4}$. Substituting into Step 2 and using $g = \nabla L(w)$ gives

$$\dot w(t) = -4\, \sqrt{w(t) \odot w(t) + 4\alpha^4 \mathbf{1}} \;\odot\; \nabla L(w(t)) .$$

**In words.** This is a preconditioned gradient flow on $L$: each coordinate moves at a speed proportional to $\sqrt{w_i^2 + 4\alpha^4}$, so coordinates that are already large move faster, a rich-get-richer effect.

**Sanity check.** At $t = 0$, $w = 0$ and both $u_i$ and $v_i$ equal $\alpha$, so Step 2 gives $\dot w_i = -8\alpha^2 g_i$; the formula gives $-4\sqrt{4\alpha^4}\, g_i$, which is the same.

**What to write in the exam.**

- $u_iv_i = \alpha^2$ by part 2.
- $\dot w_i = -4(u_i^2 + v_i^2) g_i$.
- $(u_i^2+v_i^2)^2 = w_i^2 + 4\alpha^4$, and $u_i^2+v_i^2 \ge 0$, so take the root.
- Grading: deduct 2 for an unjustified square root, or for writing it as $|w_i| + 2\alpha^2$.

*Verified: along integrated flows with $\alpha \in \{1, 0.5, 0.2\}$ and random $2 \times 4$ matrices $X$, the formula matches $2u \odot \dot u - 2v \odot \dot v$ to $3 \cdot 10^{-12}$.*

**4. (6) Linear convergence of the loss**

**What is asked.** Prove $L(w(t)) \le \tfrac12\|y\|^2 e^{-16\alpha^2\lambda_0 t}$, and interpret the rate for small $\alpha$. The answer is a proof plus one sentence.

**Tool and why.** A PL-type argument (cheat sheet §9): bound $\frac{d}{dt}L$ by a negative multiple of $L$ and integrate. Two lower bounds are needed: one on the preconditioner from part 3, and one on $\|g\|^2$ in terms of $L$, which comes from full row rank of $X$.

**Definitions.** No new notation; $\lambda_0 = \lambda_{\min}(XX^\top)$ as in the statement.

**Solution.**

Step 1, the time derivative of the loss (2 pts): by the chain rule and part 3,

$$\begin{aligned}
\frac{d}{dt} L(w(t)) &= \nabla L(w)^\top \dot w \\
&= -4 \sum_i \sqrt{w_i^2 + 4\alpha^4}\; g_i^2 .
\end{aligned}$$

Step 2, the preconditioner (1 pt): $\sqrt{w_i^2 + 4\alpha^4} \ge \sqrt{4\alpha^4}$, which is $2\alpha^2$. So

$$\frac{d}{dt} L(w(t)) \le -8\alpha^2 \|g\|^2 .$$

Step 3, full row rank (2 pts): $g = X^\top r$, so by the Rayleigh quotient bound (cheat sheet §3)

$$\begin{aligned}
\|g\|^2 &= r^\top X X^\top r \\
&\ge \lambda_0 \|r\|^2 \\
&= 2\lambda_0 L(w).
\end{aligned}$$

The last row is the definition $L = \tfrac12\|r\|^2$. Combining with Step 2:

$$\frac{d}{dt} L(w(t)) \le -16\alpha^2 \lambda_0\, L(w(t)) .$$

Step 4, integrate (1 pt): the product $L(w(t))\, e^{16\alpha^2\lambda_0 t}$ has derivative $e^{16\alpha^2\lambda_0 t}\big(\dot L + 16\alpha^2\lambda_0 L\big)$, which is non-positive by Step 3, so it is non-increasing. At $t = 0$, $w(0) = 0$ and the product equals $L(0)$, which is $\tfrac12\|y\|^2$. Hence

$$L(w(t)) \;\le\; \tfrac12 \|y\|^2\, e^{-16 \alpha^2 \lambda_0 t} .$$

Step 5, small initialization: the guaranteed rate is proportional to $\alpha^2$, so it degrades as $\alpha \to 0$: the flow starts next to the saddle at the origin and leaves it slowly. This is the price of the sparsity bias of part 5.

**In words.** The conserved product keeps $u_i^2 + v_i^2$ at least $2\alpha^2$ forever, so the flow is never slower than plain gradient flow scaled by $8\alpha^2$, and full row rank turns that into exponential decay. No lower barrier on $w$ has to be assumed: the conservation law provides it.

**Sanity check.** At $t = 0$ both sides equal $\tfrac12\|y\|^2$. Using $\lambda_{\min}(X^\top X)$ instead would give $0$ when $N < d$ and no rate at all, which is why $XX^\top$ is the right matrix.

**What to write in the exam.**

- Chain rule: $\frac{d}{dt}L = -4\sum_i \sqrt{w_i^2 + 4\alpha^4}\, g_i^2$, which is at most $-8\alpha^2\|g\|^2$.
- Full row rank: $\|g\|^2 = r^\top XX^\top r$, which is at least $2\lambda_0 L$.
- Hence $\dot L \le -16\alpha^2\lambda_0 L$; integrate from $L(0) = \tfrac12\|y\|^2$.
- Small $\alpha$: the rate scales like $\alpha^2$, so convergence is slow.

*Verified: on integrated flows with $\alpha \in \{1, 0.5, 0.2\}$ the ratio of $L(w(t))$ to the bound never exceeds $1.0000$ (equality at $t = 0$), and the loss reaches $10^{-19}$ or less.*

**5a. (4) Mirror coordinates and convergence of $w(t)$**

**What is asked.** Show $\dot q = -4X^\top r$ for $q = \operatorname{arcsinh}(w/2\alpha^2)$, hence $q(t) = X^\top \mu(t)$; prove that $\mu(t)$ converges, and that the limit $w_\infty$ interpolates and has $\operatorname{arcsinh}(w_\infty/2\alpha^2) \in \operatorname{range}(X^\top)$. The answer is a proof.

**Tool and why.** Implicit bias through a mirror map (cheat sheet §12): find a coordinate change in which the flow is plain $-4\nabla L$, so the new coordinate only moves inside $\operatorname{range}(X^\top)$, exactly as in the min-norm argument for linear regression. Convergence of $\mu$ comes from integrating the exponential bound of part 4.

**Definitions.** $c := 2\alpha^2$, a shorthand for the scale inside $\operatorname{arcsinh}$; note $c^2 = 4\alpha^4$. $q$ and $\mu$ are as in the statement.

**Solution.**

Step 1, the mirror identity (2 pts): the derivative of $\operatorname{arcsinh}$ is $1/\sqrt{1 + s^2}$, so

$$\begin{aligned}
\frac{d}{dt} \operatorname{arcsinh}\Big( \frac{w_i}{c} \Big)
&= \frac{\dot w_i / c}{\sqrt{1 + w_i^2 / c^2}} \\
&= \frac{\dot w_i}{\sqrt{w_i^2 + 4\alpha^4}} \\
&= -4 g_i .
\end{aligned}$$

The second row multiplies numerator and denominator by $c$; the third is part 3.

Step 2, integrate: $q(0) = \operatorname{arcsinh}(0)$, which is $0$, and $g = X^\top r$, so

$$q(t) = -4 \int_0^t X^\top r(s)\, ds = X^\top \mu(t) \in \operatorname{range}(X^\top).$$

Step 3, $\|r\|$ decays (part of the 2 pts for convergence): by part 4,

$$\|r(s)\| = \sqrt{2 L(w(s))} \le \|y\|\, e^{-8\alpha^2\lambda_0 s} .$$

Step 4, $\mu$ is Cauchy: for $t' > t$,

$$\begin{aligned}
\|\mu(t') - \mu(t)\| &\le 4 \int_t^{t'} \|r(s)\|\, ds \\
&\le 4\|y\| \int_t^{\infty} e^{-8\alpha^2\lambda_0 s}\, ds \\
&= \frac{\|y\|}{2\alpha^2\lambda_0}\, e^{-8\alpha^2\lambda_0 t} .
\end{aligned}$$

The right-hand side tends to $0$ as $t \to \infty$, so $\mu(t)$ is Cauchy and converges to some $\mu_\infty$.

Step 5, $w$ converges: inverting Step 2, $w(t) = 2\alpha^2 \sinh(X^\top \mu(t))$. By continuity of $\sinh$,

$$w(t) \;\longrightarrow\; w_\infty := 2\alpha^2 \sinh\big(X^\top \mu_\infty\big).$$

Step 6, properties of the limit: $L(w(t)) \to 0$ by part 4, and $L$ is continuous, so $L(w_\infty) = 0$, that is, $X w_\infty = y$. Also

$$\operatorname{arcsinh}\big(w_\infty / 2\alpha^2\big) = X^\top \mu_\infty \in
\operatorname{range}(X^\top).$$

**In words.** In the coordinates $q$ the flow is ordinary gradient flow on a linear model, so $q$ is trapped in the row space of $X$, just as GD from zero stays in the span of the data. The residual decays fast enough to be integrable, so $q$, and with it $w$, settles down.

**Sanity check.** If $\alpha$ is large, $\operatorname{arcsinh}(s) \approx s$ near $0$, so $q \approx w / 2\alpha^2$ and the condition becomes $w_\infty \in \operatorname{range}(X^\top)$, the familiar min-$\ell_2$-norm condition.

**What to write in the exam.**

- Mirror identity: $\frac{d}{dt}\operatorname{arcsinh}(w_i/c)$ equals $\dot w_i / \sqrt{w_i^2 + 4\alpha^4}$, which is $-4g_i$ by part 3.
- So $q(t) = X^\top\mu(t)$ with $q(0) = 0$.
- $\|r(s)\| \le \|y\| e^{-8\alpha^2\lambda_0 s}$ is integrable, so $\mu(t)$ is Cauchy.
- $w = 2\alpha^2\sinh(X^\top\mu)$ converges, $Xw_\infty = y$, and the arcsinh condition holds.
- Grading: no credit for "$w(t)$ converges because $L \to 0$" alone.

*Verified: along integrated flows, the component of $q(t)$ orthogonal to $\operatorname{range}(X^\top)$ stays below $2 \cdot 10^{-11}$, and the loss of the limit is below $10^{-18}$.*

**5b. (3) $w_\infty$ is the unique minimizer of $\Psi_\alpha$ on the interpolating set**

**What is asked.** Prove that $w_\infty$ is the unique minimizer of $\Psi_\alpha$ over $\{w : Xw = y\}$. The answer is a proof.

**Tool and why.** Convex optimization under linear constraints: for a strictly convex function, the first-order (KKT) condition "gradient in $\operatorname{range}(X^\top)$" is sufficient and the minimizer is unique. Part 5a says exactly that $\nabla \Psi_\alpha(w_\infty) \in \operatorname{range}(X^\top)$.

**Definitions.** We write $\Psi_\alpha = \sum_i \psi(w_i)$, where $\psi$ is the one-dimensional summand of $\Psi_\alpha$.

**Solution.**

Step 1, the derivatives of $\psi$ (1 pt): by the product rule, the derivative of $w\operatorname{arcsinh}(w/2\alpha^2)$ is $\operatorname{arcsinh}(w/2\alpha^2) + w/\sqrt{w^2 + 4\alpha^4}$, and the derivative of $\sqrt{w^2 + 4\alpha^4}$ is $w/\sqrt{w^2 + 4\alpha^4}$. So

$$\begin{aligned}
\psi'(w) &= \operatorname{arcsinh}\Big( \frac{w}{2\alpha^2} \Big) + \frac{w}{\sqrt{w^2 + 4\alpha^4}} \\
&\quad - \frac{w}{\sqrt{w^2 + 4\alpha^4}} \\
&= \operatorname{arcsinh}\Big( \frac{w}{2\alpha^2} \Big),
\end{aligned}$$

$$\psi''(w) = \frac{1}{\sqrt{w^2 + 4\alpha^4}} > 0 .$$

So each $\psi$ is strictly convex, hence $\Psi_\alpha$ is strictly convex, and by part 5a

$$\nabla\Psi_\alpha(w_\infty) = \operatorname{arcsinh}\big(w_\infty / 2\alpha^2\big) = X^\top \mu_\infty .$$

Step 2, comparison with any other interpolator (2 pts): let $Xw' = y$ and $w' \ne w_\infty$. Strict convexity means the function lies strictly above its tangent plane away from the tangent point:

$$\begin{aligned}
\Psi_\alpha(w') &> \Psi_\alpha(w_\infty) + \nabla\Psi_\alpha(w_\infty)^\top (w' - w_\infty) \\
&= \Psi_\alpha(w_\infty) + \mu_\infty^\top X (w' - w_\infty) \\
&= \Psi_\alpha(w_\infty).
\end{aligned}$$

The last row holds because $X(w' - w_\infty) = y - y$, which is $0$. Since $w_\infty$ itself interpolates (part 5a), it is the unique minimizer.

**In words.** Gradient flow does not pick an arbitrary interpolator: it picks the one that minimizes the potential $\Psi_\alpha$, whose shape depends on the initialization scale $\alpha$. This is implicit regularization: no penalty was ever added to the loss.

**Sanity check.** For one coordinate, $\psi'(0) = 0$ and $\psi''(0) = 1/(2\alpha^2)$, so near $0$, $\psi(w) \approx \psi(0) + w^2/(4\alpha^2)$: for large $\alpha$ the potential is a scaled squared $\ell_2$ norm, consistent with the sanity check of part 5a.

**What to write in the exam.**

- $\psi' = \operatorname{arcsinh}(w/2\alpha^2)$ and $\psi'' > 0$: strictly convex.
- Part 5a: $\nabla\Psi_\alpha(w_\infty) = X^\top\mu_\infty$.
- Tangent-plane inequality plus $X(w' - w_\infty) = 0$ gives $\Psi_\alpha(w') > \Psi_\alpha(w_\infty)$.

*Verified: on three random $2 \times 4$ instances, the limit of the integrated flow equals the SLSQP minimizer of $\Psi_\alpha$ under $Xw = y$ to $10^{-7}$.*

**5c. (4) A two-dimensional example: $\ell_1$ versus $\ell_2$**

**What is asked.** For $X = (1\;2)$ and $y = 2$, derive the closed form of $w_\infty$ through the unique $\mu > 0$ solving $\sinh\mu\,(1 + 4\cosh\mu) = \alpha^{-2}$; compute the limits $\alpha \to 0^+$ and $\alpha \to \infty$, and prove which is the minimum-$\ell_1$ and which the minimum-$\ell_2$ interpolator. The answer is a formula, two limits and two short proofs.

**Tool and why.** The two conditions of part 5a pin $w_\infty$ down: the arcsinh condition gives a one-parameter family, and $Xw = y$ fixes the parameter. The double-angle identity $\sinh 2m = 2\sinh m\cosh m$ reduces it to one scalar equation. The identifications use elementary norm inequalities (cheat sheet §12).

**Definitions.** $m$ is the free parameter of $\operatorname{range}(X^\top)$, and $F(m) := \sinh m\,(1 + 4\cosh m)$ is the function whose level $\alpha^{-2}$ fixes it.

**Solution.**

Step 1, the family (part of 2 pts): here $\operatorname{range}(X^\top) = \{ (m, 2m) : m \in \mathbb{R} \}$, so by part 5a

$$w_\infty = 2\alpha^2 (\sinh m, \sinh 2m)$$

for some real $m$.

Step 2, the constraint: $X w_\infty = 2$ reads $2\alpha^2(\sinh m + 2\sinh 2m) = 2$. With $\sinh 2m = 2\sinh m\cosh m$ and dividing by $2\alpha^2$, this is $F(m) = \alpha^{-2}$.

Step 3, uniqueness and sign of the solution: $F$ is continuous, odd, and strictly increasing, because

$$F'(m) = \cosh m\, (1 + 4\cosh m) + 4\sinh^2 m > 0 .$$

$F$ is also unbounded in both directions, so $F(m) = \alpha^{-2}$ has a unique solution $\mu$. Since $F(0) = 0$ and $\alpha^{-2} > 0$, we get $\mu > 0$.

Step 4, the closed form: substitute $2\alpha^2 = 2 / F(\mu)$ into Step 1 and cancel $\sinh\mu \ne 0$:

$$w_{\infty,1} = \frac{2\sinh\mu}{\sinh\mu\,(1 + 4\cosh\mu)} = \frac{2}{1 + 4\cosh\mu},$$

$$w_{\infty,2} = \frac{4\sinh\mu\cosh\mu}{\sinh\mu\,(1 + 4\cosh\mu)} = \frac{4\cosh\mu}{1 + 4\cosh\mu}.$$

Step 5, the limits (1 pt): $\mu = F^{-1}(\alpha^{-2})$, with $F^{-1}$ continuous and increasing. As $\alpha \to 0^+$, $\alpha^{-2} \to \infty$, so $\mu \to \infty$ and $\cosh\mu \to \infty$:

$$\boxed{w_\infty \to (0, 1)}$$

As $\alpha \to \infty$, $\alpha^{-2} \to 0$, so $\mu \to 0^+$ and $\cosh\mu \to 1$:

$$\boxed{w_\infty \to (\tfrac25, \tfrac45)}$$

Step 6, the $\ell_1$ identification (part of 1 pt): on the line $w_1 + 2w_2 = 2$,

$$\begin{aligned}
\|w\|_1 &\ge \tfrac12|w_1| + |w_2| \\
&\ge \tfrac12 |w_1 + 2 w_2| \\
&= 1 .
\end{aligned}$$

The first inequality drops half of $|w_1|$ and is an equality only if $w_1 = 0$; the second is the triangle inequality. $(0,1)$ lies on the line with $\|(0,1)\|_1 = 1$, so it is the unique minimum-$\ell_1$ interpolator.

Step 7, the $\ell_2$ identification: by Cauchy–Schwarz, $\langle (1,2), w \rangle \le \sqrt5\, \|w\|_2$, and the left side is $2$ on the line, so $\|w\|_2 \ge 2/\sqrt5$, with equality only if $w$ is parallel to $(1,2)$. The only such point on the line is $(\tfrac25, \tfrac45)$, which is also $X^\top (XX^\top)^{-1} y$. So it is the minimum-$\ell_2$ interpolator.

**In words.** Small initialization gives the sparse ($\ell_1$) solution: the coordinate that is cheaper to use (here $w_2$, with coefficient $2$) wins completely. Large initialization gives the $\ell_2$, kernel-regime solution, as in the NTK picture.

**Sanity check.** Numerically $\alpha = 0.1$ gives $(0.097, 0.952)$ and $\alpha = 3$ gives $(0.400, 0.800)$. Both satisfy $w_1 + 2w_2 = 2$ up to rounding, and they sit close to the two limits, in the right order.

**What to write in the exam.**

- Part 5a: $w_\infty = 2\alpha^2(\sinh m, \sinh 2m)$; the constraint gives $F(m) = \alpha^{-2}$.
- $F' > 0$, $F$ odd and unbounded: unique $\mu$, positive.
- Closed form by substituting $2\alpha^2 = 2/F(\mu)$.
- Limits: $\alpha \to 0$ gives $(0,1)$, the min-$\ell_1$ interpolator; $\alpha \to \infty$ gives $(\tfrac25, \tfrac45)$, the min-$\ell_2$ interpolator; prove both.

*Verified: brentq solves $F(\mu) = \alpha^{-2}$ for $\alpha \in \{3, 1, 0.3, 0.1, 0.05\}$, and the closed form matches the integrated flow to 5 digits; a grid search confirms the $\ell_1$ minimizer $(0,1)$, and $F' \ge 5$ on $[-10, 10]$.*

**Common mistakes.**

- A sign error in the $v$-equation, or conserving $u_i^2 - v_i^2$ instead of the product $u_iv_i$. Everything after part 2 then breaks.
- Using $\lambda_{\min}(X^\top X)$ in part 4. It is $0$ when $N < d$, so no rate follows; the right matrix is $XX^\top$.
- Claiming that $w(t)$ converges just because $L \to 0$ (with $N < d$ the zero-loss set is a whole affine subspace), or swapping the two limits in part 5c.

**💡 Useful tricks:** Per-coordinate chain rule; $\dot u_i = -2g_iu_i$, $\dot v_i = 2g_iv_i$ ⇒ $u_iv_i$ conserved and $u_i = u_i(0)e^{-2G_i}$ (integrating factor); $(u^2+v^2)^2 = (u^2-v^2)^2 + 4u^2v^2$ removes $u, v$; the preconditioner is always $\ge 2\alpha^2$, so the loss decays at rate $16\alpha^2\lambda_0$; $\operatorname{arcsinh}(w/2\alpha^2)$ moves along $-4X^\top r$ and therefore stays in $\operatorname{range}(X^\top)$ — the KKT condition of $\min\Psi_\alpha$; $\sinh 2\mu = 2\sinh\mu\cosh\mu$ collapses the example.

**⚠️ Watch out:** (1) the $v$-equation has the opposite sign; (2) what is conserved is the product $u_iv_i$, not $u_i^2 - v_i^2$; (3) justify the square root ($u_i^2+v_i^2\ge0$); (4) use $\lambda_{\min}(XX^\top)$, not $\lambda_{\min}(X^\top X)$; (5a) $L \to 0$ does not by itself make $w(t)$ converge — integrate $\|r\|$; (5c) $\alpha\to0$ gives $\ell_1$, $\alpha\to\infty$ gives $\ell_2$, not the other way round.

## Q3 — Bit-counting with data-chosen width and precision (30)

**Hint:** Count parameter assignments, not functions. For one fixed hypothesis, the losses
on the sample are i.i.d. in $[0,1]$; how do you go from one hypothesis to all of them at
once? When an index ranges over an infinite set (here two indices), you cannot split
$\delta$ evenly — which summable weights would you use? For interpolation, ask how many
different hypotheses $2^N$ different labelings require. For the lower bound, think of a
distribution under which the training error is $0$ but nothing can be learned.

**Full solution:**

**1. (7) Counting the class and the fixed-$(P,k)$ bound**

**What is asked.** Prove $|\mathcal{H}_{P,k}| \le 2^{Pk}$, and derive from Hoeffding alone a bound on $L_D(h) - L_S(h)$ that holds simultaneously for all $h \in \mathcal{H}_{P,k}$ with probability at least $1 - \delta$. The answer is a counting argument plus a probability bound.

**Tool and why.** The finite-class recipe (cheat sheet §2 and §10): Hoeffding for one fixed hypothesis, then a union bound over the finitely many hypotheses. Counting parameter vectors bounds the number of hypotheses.

**Definitions.** For a fixed $h$, $A_n := \ell(h(x_n), y_n)$ is the loss on example $n$. We introduce it because $L_S(h)$ is the average of the $A_n$, which is exactly the form Hoeffding handles.

**Solution.**

Step 1, counting (2 pts): $\theta \mapsto h^{(P)}_\theta$ maps $Q_k^P$ onto $\mathcal{H}_{P,k}$, and $Q_k^P$ has $(2^k)^P$ elements. A map cannot have more values than arguments, so

$$|\mathcal{H}_{P,k}| \le |Q_k|^P = 2^{Pk} .$$

It is "$\le$" because different $\theta$ may give the same function.

Step 2, one fixed $h$ (2 pts): if $h$ is fixed independently of $S$, the $A_n$ are i.i.d. in $[0,1]$ (zero-one loss), with $\mathbb{E}[A_1] = L_D(h)$. Their average is $L_S(h)$, so Hoeffding gives

$$P\big(|L_S(h) - L_D(h)| \ge \epsilon\big) \le 2e^{-2N\epsilon^2} .$$

Step 3, union bound (3 pts): the event that some $h$ deviates is the union of the per-$h$ events, so

$$\begin{aligned}
P\big( \exists h \in \mathcal{H}_{P,k} : |L_S(h) - L_D(h)| \ge \epsilon \big)
&\le 2\,|\mathcal{H}_{P,k}|\, e^{-2N\epsilon^2} \\
&\le 2^{Pk+1} e^{-2N\epsilon^2} .
\end{aligned}$$

Step 4, solve for $\epsilon$: set the right-hand side equal to $\delta$ and take logarithms, $(Pk+1)\ln 2 - 2N\epsilon^2 = \ln\delta$. Since $\ln 2 - \ln\delta$ is $\ln(2/\delta)$,

$$\epsilon = \sqrt{\frac{Pk \ln 2 + \ln(2/\delta)}{2N}} .$$

On the complementary event, which has probability at least $1 - \delta$, every $h$ has $|L_S(h) - L_D(h)| < \epsilon$, and in particular $L_D(h) - L_S(h) \le \epsilon$.

**In words.** Each bit of description doubles the number of hypotheses, and the union bound charges $\ln 2$ per bit inside the square root. So the bound is small only when the total number of bits $Pk$ is small compared with $N$.

**Sanity check.** With $Pk = 10$, $N = 1000$ and $\delta = 0.05$, plugging this $\epsilon$ back into $2^{Pk+1} e^{-2N\epsilon^2}$ returns exactly $0.05$.

**What to write in the exam.**

- Counting: $|\mathcal{H}_{P,k}| \le |Q_k^P|$, which is $2^{Pk}$, since parameters map onto functions.
- Hoeffding for each fixed $h$, then a union bound: failure probability at most $2^{Pk+1}e^{-2N\epsilon^2}$.
- Set it to $\delta$ and solve for $\epsilon$.
- Grading: deduct 3 if Hoeffding is applied to a data-dependent $h$ without the union bound; deduct 1 for a wrong factor $2$.

*Verified: Python plugs the $\epsilon$ formula into $2^{Pk+1}e^{-2N\epsilon^2}$ and recovers $\delta$ to machine precision.*

**2. (8) A bound uniform over all $(P,k)$**

**What is asked.** Find an explicit $\Delta(N,\delta,P,k)$ that holds with probability at least $1-\delta$ simultaneously for all $P$, $k$ and all $h \in \mathcal{H}_{P,k}$, is strictly increasing in $P$ and in $k$, and tends to $0$ as $N \to \infty$; explain why this allows choosing $(P,k)$ from the data. The answer is a formula plus short proofs.

**Tool and why.** SRM, the weighted union bound (cheat sheet §2): give each sub-class $\mathcal{H}_{P,k}$ its own confidence $\delta_{P,k}$ with total at most $\delta$. The index set $\mathbb{N}^2$ is infinite, so a uniform split is impossible and the weights must be summable.

**Definitions.** $\delta_{P,k} := \delta\, 2^{-(P+k)}$, the confidence assigned to the class with $P$ parameters and $k$ bits. The geometric weights are chosen because they sum to exactly $\delta$ and cost only $(P+k)\ln 2$ in the bound.

**Solution.**

Step 1, the weights sum to $\delta$ (2 pts): the double sum factorizes into two geometric series,

$$\sum_{P, k \ge 1} \delta_{P,k} = \delta \Big( \sum_{P \ge 1} 2^{-P} \Big)
\Big( \sum_{k \ge 1} 2^{-k} \Big) = \delta .$$

Each series equals $1$.

Step 2, union over $(P,k)$ (3 pts): each $\mathcal{H}_{P,k}$ is fixed before the data, so part 1 applies to it at confidence $\delta_{P,k}$: its failure event has probability at most $\delta_{P,k}$. By the union bound over the countably many failure events, the probability that any of them happens is at most $\sum_{P,k} \delta_{P,k}$, which is $\delta$. So with probability at least $1 - \delta$ all the bounds hold at once.

Step 3, the formula: replace $\delta$ by $\delta_{P,k}$ in part 1. Since $\ln(2/\delta_{P,k}) = \ln(2/\delta) + (P + k)\ln 2$,

$$\begin{aligned}
\Delta(N, \delta, P, k) &= \sqrt{\frac{(Pk + P + k)\ln 2 + \ln(2/\delta)}{2N}} \\
&= \sqrt{\frac{\big[(P+1)(k+1) - 1\big]\ln 2 + \ln(2/\delta)}{2N}} .
\end{aligned}$$

Step 4, properties (2 pts): $(P+1)(k+1)$ is strictly increasing in each argument and the square root is strictly increasing, which gives (b). For fixed $P$, $k$, $\delta$ the numerator is a constant, so $\Delta$ is of order $1/\sqrt N$ and tends to $0$, which gives (c).

Step 5, legitimacy (1 pt): the inequality holds on one event simultaneously for every $(P,k)$, so it also holds for $(\hat P, \hat k)$ chosen as any function of $S$, for example after pruning and quantizing.

**In words.** Paying $(P+k)\ln 2$ extra "bits" buys the right to look at the data before choosing the architecture. The bound prefers small networks with few bits, which is the SRM principle.

**Sanity check.** The alternative weights $\delta_{P,k} = \frac{36\,\delta}{\pi^4 P^2 k^2}$ also sum to $\delta$ (two Basel sums, each $\pi^2/6$) and replace $(P+k)\ln 2$ by $\ln(\pi^4 P^2 k^2/36)$; that also earns full credit. Weights like $\delta/(Pk)$ do not work: their sum diverges.

**What to write in the exam.**

- Weights $\delta_{P,k} = \delta 2^{-(P+k)}$, summing to $\delta$.
- Part 1 for each class at level $\delta_{P,k}$, then a union bound over all $(P,k)$.
- The resulting $\Delta$ of Step 3 is strictly increasing in $P$ and $k$, and of order $1/\sqrt N$.
- One event for all $(P,k)$, so a data-dependent choice is covered.

*Verified: sympy sums $\sum_{P,k} 2^{-(P+k)}$ to exactly $1$ and the Basel weights to $1$; the identity $Pk + P + k = (P+1)(k+1) - 1$ and strict monotonicity on a $30 \times 30$ grid were checked in Python.*

**3. (5) Shattering $N$ points forces $Pk \ge N$**

**What is asked.** If $\mathcal{H}_{P,k}$ realizes every labeling of $N$ distinct inputs, prove $Pk \ge N$, deduce that $\Delta$ of part 2 exceeds $\sqrt{\ln 2/2}$, and explain why this is useless when $L_S(h) = 0$. The answer is two short proofs and one sentence.

**Tool and why.** Pigeonhole counting: $2^N$ labelings need $2^N$ different functions, and part 1 says there are at most $2^{Pk}$ of them. The consequence is the "interpolation makes uniform convergence vacuous" pattern (cheat sheet §12).

**Definitions.** No new notation.

**Solution.**

Step 1, counting (3 pts): two hypotheses that produce different labelings of $x_1, \dots, x_N$ differ at some $x_n$, so they are different functions. Hence the $2^N$ labelings need at least $2^N$ distinct hypotheses:

$$2^N \le |\mathcal{H}_{P,k}| \le 2^{Pk} .$$

Taking $\log_2$ gives $Pk \ge N$.

Step 2, the consequence (1 pt): split the numerator of $\Delta^2$ and use $Pk \ge N$ in the first term:

$$\begin{aligned}
\Delta(N, \delta, P, k)^2 &\ge \frac{Pk \ln 2}{2N} + \frac{(P+k)\ln 2 + \ln(2/\delta)}{2N} \\
&> \frac{\ln 2}{2},
\end{aligned}$$

because the second term is positive. So $\Delta > \sqrt{\ln 2 / 2}$, which is about $0.589$.

Step 3, why it is useless (1 pt): for $L_S(h) = 0$ the guarantee is only $L_D(h) < 0.59$ roughly, which is worse than the $\tfrac12$ achieved by guessing with a fair coin, for every $D$. It does not shrink as $N$ grows, because the bit count must grow with $N$.

**In words.** A class that can memorize anything must be large, and a bound that only counts the class size then charges at least one bit per training example, which eats the whole sample.

**Sanity check.** For $N = 1000$, $P = N$ and $k = 1$, the bound of part 2 is $0.834$, indeed above $0.589$.

**What to write in the exam.**

- Different labelings need different hypotheses, so $2^N \le |\mathcal{H}_{P,k}|$; with $|\mathcal{H}_{P,k}| \le 2^{Pk}$ this gives $Pk \ge N$.
- Then $\Delta^2 > N\ln 2 / (2N)$, so $\Delta > \sqrt{\ln 2/2}$, about $0.589$.
- This is above chance level $\tfrac12$, so it certifies nothing, and it does not improve with $N$.

*Verified: Python gives $\sqrt{\ln 2/2} = 0.5887$ and $\Delta = 0.834$ for $N = 1000$, $P = 1000$, $k = 1$ and $\delta = 0.05$.*

**4. (6) Random labels: no class-only bound can beat $\tfrac12$**

**What is asked.** (i) Under $D^{\mathrm{rand}}$, show $L_D(h) = \tfrac12$ for every $h$ and that ERM reaches $L_S(\hat h_S) = 0$ almost surely; (ii) show that any bound $\Delta'$ depending only on $N, \delta, P, k$ and valid for every $D$ must be at least $\tfrac12$, and draw the moral. The answers are proofs and a short discussion.

**Tool and why.** A lower-bound argument by one bad distribution: the labels are independent noise, so nothing generalizes, yet the class interpolates. This is the Zhang et al. random-label phenomenon in formal form (cheat sheet §12).

**Definitions.** We call the gap $L_D(\hat h_S) - L_S(\hat h_S)$ and write $E$ for the probability-$1$ event of (i) on which the gap equals $\tfrac12$.

**Solution.**

Step 1, (i) the population loss (part of 3 pts): $y$ is independent of $x$ and uniform on $\{0,1\}$, so given $x$, the probability that $y \ne h(x)$ is $\tfrac12$ whatever $h(x)$ is. Averaging over $x$:

$$L_D(h) = \mathbb{E}_x\big[ P(y \ne h(x) \mid x) \big] = \mathbb{E}_x\big[\tfrac12\big] =
\tfrac12 .$$

Step 2, (i) the training loss: the inputs are i.i.d. uniform on $[0,1]^D$, which has no atoms, so $P(x_n = x_m)$ is $0$ for $n \ne m$. A finite union of probability-zero events has probability zero, so the $N$ inputs are distinct with probability $1$. On that event some $h \in \mathcal{H}_{P,k}$ fits all labels, so the ERM output has training loss $0$.

Step 3, (ii) the lower bound (2 pts): by Steps 1–2, under $D^{\mathrm{rand}}$ the gap equals $\tfrac12$ on the event $E$, and $P(E) = 1$. The event that the gap is at most $\Delta'$ has probability at least $1 - \delta$, which is positive. Two events, one of probability $1$ and one of positive probability, must intersect. At a sample in the intersection, $\tfrac12$ equals the gap, which is at most $\Delta'$. So $\Delta' \ge \tfrac12$.

Step 4, the moral (1 pt): no bound that depends only on the class (and on $N$, $\delta$) can certify anything below chance for an interpolating class; the $0.589$ of part 3 is not a loose estimate but close to the best a class-only bound can do. Yet the same networks trained on real labels generalize (Zhang et al.), so a meaningful bound must depend on the returned hypothesis $\hat h$ and on the sample $S$, and through $S$ on $D$: $\Delta(N, \delta, \mathcal{H}, \hat h, S)$. Part 2 depends on $\hat h$ only through its size and precision, so it helps only if the trained network can really be compressed to $Pk \ll N$ bits.

**In words.** The class cannot tell pure noise from a learnable task, because it fits both perfectly. A bound that looks only at the class must therefore cover the noise case, where the gap is $\tfrac12$.

**Sanity check.** The bound of part 2 is not "wrong" here: by part 3 it exceeds $0.589$, which is consistent with $\Delta' \ge \tfrac12$.

**What to write in the exam.**

- Independent fair labels: $L_D(h) = \tfrac12$ for every $h$.
- Distinct inputs almost surely, so ERM interpolates and $L_S(\hat h_S) = 0$.
- The gap is $\tfrac12$ with probability $1$; the bound event has probability at least $1-\delta > 0$; they intersect, so $\Delta' \ge \tfrac12$.
- Moral: the bound must depend on $\hat h$ and $S$. Grading: deduct 1 for "the bound is wrong".

*Verified: a lookup-table ERM on $2000$ random-label points in $[0,1]^3$ has training error $0$ and error $0.5006$ on $200{,}000$ fresh points.*

**5. (4) Numbers for a CIFAR-10-sized sample**

**What is asked.** With the fixed-$(P,k)$ bound of part 1, $\delta = 0.05$ and $N = 5 \cdot 10^4$: (i) evaluate it for $P = 10^6$ and $k = 1$, and say whether it is informative; (ii) find the largest $P$ with $k = 1$ for which the bound is at most $0.1$, and compare with $N$. The answers are two numbers.

**Tool and why.** Direct substitution into the formula of part 1 (cheat sheet §10), with the given approximations $\ln 2 \approx 0.693$ and $\ln 40 \approx 3.689$; note $\ln(2/\delta) = \ln 40$ for $\delta = 0.05$.

**Definitions.** No new notation.

**Solution.**

Step 1, the denominator: $2N = 2 \cdot 5 \cdot 10^4$, which is $10^5$.

Step 2, (i) (2 pts): with $Pk = 10^6$,

$$\sqrt{\frac{10^6 \cdot 0.693 + 3.689}{2 \cdot 5 \cdot 10^4}} = \sqrt{6.93} \approx 2.63
> 1 .$$

Here $693{,}000 + 3.689$ divided by $10^5$ is $6.93004$, whose square root is $2.632$. This is vacuous, because the zero-one loss never exceeds $1$, even at $1$ bit per weight and before the SRM price of part 2.

Step 3, (ii) (2 pts): the bound is at most $0.1$ exactly when its square is at most $0.01$:

$$\begin{aligned}
\frac{P \ln 2 + \ln 40}{10^5} &\le 0.01 \\
P \ln 2 &\le 1000 - 3.689 \\
&= 996.311 \\
P &\le 996.311 / 0.693 \\
&\approx 1437.7 .
\end{aligned}$$

$P$ is an integer, so

$$\boxed{P = 1437}$$

which is about $0.03\,N$.

Step 4, comparison: bit-counting is informative only when the number of bits is a small fraction of $N$, while modern networks have $P \gg N$; here $P = 10^6$ is $20N$. With the part-2 bound and $k = 1$ (that is, $(2P+1)\ln 2$ in the numerator) the answer would be $P = 718$.

**In words.** To get a $10\%$ guarantee from $50{,}000$ examples you may spend only about $1{,}400$ bits in total, three orders of magnitude fewer than a million one-bit weights.

**Sanity check.** At $P = 1437$ the bound is $0.09998$, and at $P = 1438$ it is $0.10001$, so $1437$ is indeed the largest. With exact logarithms the threshold is $1437.4$, giving the same integer.

**What to write in the exam.**

- (i) The bound is $\sqrt{(693{,}000 + 3.689)/10^5}$, about $2.63$, larger than $1$: vacuous.
- (ii) $P\ln 2 \le 1000 - \ln 40$, so $P \le 1437.7$, giving $P = 1437$, about $0.03N$.
- Grading: deduct 1 for an off-by-one or for rounding up.

*Verified: Python evaluates both bounds with the given and with exact logarithms ($2.6325$ and $2.6328$; thresholds $1437.68$ and $1437.37$), checks the bound at $P = 1437$ and $1438$, and gives $718.3$ for the part-2 variant.*

**Common mistakes.**

- Applying Hoeffding directly to the trained network. Hoeffding needs $h$ fixed before $S$; the union bound is what covers a data-dependent $h$.
- Using weights that do not sum to at most $\delta$ (such as $\delta/(Pk)$), or weighting only one of the two indices, so the data-dependent choice of $(P,k)$ is not covered.
- Reading part 4 as "the bound is wrong". The bound is correct; it is simply at least $\tfrac12$ for any class that interpolates, which is the point.

**💡 Useful tricks:** $|\mathcal H_{P,k}| \le 2^{Pk}$ (parameters onto functions); Hoeffding per fixed $h$ + union bound; for an infinite index set use summable weights $\delta 2^{-(P+k)}$, which cost $(P+k)\ln 2$ inside the square root; shattering $N$ points ⇒ $2^N \le 2^{Pk}$ ⇒ $Pk \ge N$ ⇒ bound $> \sqrt{\ln2/2}$; independent fair-coin labels ⇒ $L_D \equiv \tfrac12$ while ERM has $L_S = 0$ ⇒ any class-only bound is $\ge \tfrac12$.

**⚠️ Watch out:** (1) Hoeffding applies only to $h$ fixed before $S$ — the union bound is what covers the trained network; (2) the weights must sum to $\le \delta$ over *both* indices, and the bound must strictly increase in each; (3) the bound exceeds chance level $\tfrac12$, so it says nothing; (4) the lower-bound argument needs $1 - \delta > 0$ and distinct inputs a.s.; (5) use the part-1 bound as instructed — $P \le 1437$, i.e. bits $\ll N$.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1 inapproximability condition written as mere
  non-membership, or condition (i) missing; Q1.3 $x$ not carried between layers or
  pre-activations not affine in the previous layer; Q1.4b signs at the alternation points
  not used, $n+1$ roots claimed, $p \equiv 0$ ignored; Q1.5 fixed-depth vs growing-depth
  quantifiers mixed up; Q2.1 sign of the $v$-equation; Q2.2 conserving the wrong quantity;
  Q2.3 unjustified square root; Q2.4 $\lambda_{\min}(X^\top X)$ instead of
  $\lambda_{\min}(XX^\top)$; Q2.5a convergence of $w(t)$ claimed from $L \to 0$ alone;
  Q2.5c limits swapped or not computed; Q3.1 Hoeffding on an $S$-dependent hypothesis;
  Q3.2 non-summable or one-index weights; Q3.3 "distinct labelings ⇒ distinct hypotheses"
  not stated; Q3.4 the moral stated as "the bound is wrong"; Q3.5 arithmetic or the wrong
  bound used.
