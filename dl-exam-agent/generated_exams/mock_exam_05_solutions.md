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

**1. (5)** With size parameters $L$ (deep, width fixed to $4$, so $O(L)$ parameters) and
$B$ (shallow):
(i) *(2 pts)* for every $B \in \mathbb{N}_0$ there is $L \in O(B)$ with
$\mathcal{P}_B \subseteq \mathcal{N}_L$;
(ii) *(3 pts)* there are $\epsilon > 0$ and $c > 1$ such that for every $L \in \mathbb{N}$
there is $\bar h \in \mathcal{N}_L$ with

$$\inf_{p \in \mathcal{P}_B} dist(\bar h, p) \;>\; \epsilon \quad \text{for every } B < c^L ,$$

i.e. a shallow network can get within $\epsilon$ of $\bar h$ only if its size is
exponential in $L$, while $\bar h$ has $O(L)$ parameters. Deduct 2 for a missing condition
(i); deduct 2 if (ii) says only "$\bar h \notin \mathcal{P}_B$" (that is plain
efficiency, not the inapproximability sense asked); deduct 1 for quantifiers in the wrong
order (e.g. $\epsilon$ chosen after $B$).

**2. (6)** Claim: every entry of $z^{(l)}$ is a polynomial in $x$ of degree
$\le 2^l$. *Base (1 pt):* $z^{(0)} = x$, degree $1 = 2^0$. *Step (3 pts):* the entries of
$W_l z^{(l-1)} + b_l$ are linear combinations of polynomials of degree $\le 2^{l-1}$ plus
constants, hence of degree $\le 2^{l-1}$; since $\deg(q^2) \le 2\deg q$, every entry of
$z^{(l)} = \sigma(\cdot)$ has degree $\le 2^l$. *Output (2 pts):* $h = a^\top z^{(L)} + c$
is again a linear combination plus a constant, so $\deg h \le 2^L$ and
$\mathcal{N}_L \subseteq \mathcal{P}_{2^L}$. (Degree "$\le$", not "$=$": cancellations
are possible.) Deduct 2 if the bias is ignored in the step (biases do not raise the degree,
but this must be said).

**3. (10)** Let $p(x) = \sum_{j=0}^B \alpha_j x^j$, $B \ge 1$. *Horner (1 pt):* $r_0 :=
\alpha_B$, $r_l := r_{l-1}\,x + \alpha_{B-l}$ for $l = 1, \dots, B$; by induction
$r_l = \sum_{j=0}^{l} \alpha_{B-l+j}\, x^j$, so $r_B = p$.
*Invariant (2 pts):* we build the network so that after every layer $l \in [B]$

$$r_l(x) = \rho^\top z^{(l)} + \alpha_{B-l}, \qquad x = \xi^\top z^{(l)},$$

with $\rho := (\tfrac14, -\tfrac14, 0, 0)^\top$, $\xi := (0, 0, \tfrac14, -\tfrac14)^\top$.
*Layers (5 pts):* layer $l$ has the four pre-activations
$r_{l-1} + x,\; r_{l-1} - x,\; x + 1,\; x - 1$. These are affine in $z^{(l-1)}$: for
$l = 1$, $r_0 = \alpha_B$ is a constant and $x = z^{(0)}$, so

$$W_1 = (1, -1, 1, 1)^\top, \qquad b_1 = (\alpha_B, \alpha_B, 1, -1)^\top ;$$

for $l \ge 2$, by the invariant at $l-1$, take the rows of $W_l$ to be
$\rho + \xi,\ \rho - \xi,\ \xi,\ \xi$ and $b_l = (\alpha_{B-l+1}, \alpha_{B-l+1}, 1,
-1)^\top$. Then

$$z^{(l)} = \big( (r_{l-1}+x)^2,\ (r_{l-1}-x)^2,\ (x+1)^2,\ (x-1)^2 \big),$$

so by the polarization identity

$$\begin{aligned}
\rho^\top z^{(l)} &= \tfrac14\big[ (r_{l-1}+x)^2 - (r_{l-1}-x)^2 \big] = r_{l-1}\, x, \\
\xi^\top z^{(l)} &= \tfrac14\big[ (x+1)^2 - (x-1)^2 \big] = x,
\end{aligned}$$

hence $r_l = \rho^\top z^{(l)} + \alpha_{B-l}$ and the invariant holds at $l$.
*Output (1 pt):* $a := \rho$, $c := \alpha_0$ give $h = r_B = p$, so $p \in \mathcal{N}_B$.
For $B = 0$: $a = 0$, $c = \alpha_0$ realizes the constant in $\mathcal{N}_1$. (Remark, not
required: $\mathcal{N}_L \subseteq \mathcal{N}_{L+1}$ — append a layer with pre-activations
$h + 1, h - 1, 0, 0$ and read out $\tfrac14[(h+1)^2 - (h-1)^2] = h$.)
*Universality (1 pt):* definition — for every continuous $f$ on $[-1,1]$ and every
$\epsilon > 0$ there are $L \in \mathbb{N}$ and $h \in \mathcal{N}_L$ with
$dist(f, h) < \epsilon$. Proof: Weierstrass gives $p$ of some degree $B$ with
$dist(f, p) < \epsilon$, and $p \in \mathcal{N}_{\max\{B, 1\}}$.
Common traps: forgetting to carry $x$ forward (after one squaring layer $x$ is no longer
available unless re-created by $(x+1)^2 - (x-1)^2$); a construction whose pre-activations
are not affine in the previous layer (e.g. using $r_{l-1}$ "directly" without expressing it
through $z^{(l-1)}$); using width $> 4$ is fine if it is still constant in $B$.

**4. (12)**
**a. (4)** *Realization (2 pts):* $T_2(u) = \sigma(\sqrt2\,u) - 1$. Use only neuron $1$:
$W_1 = (\sqrt2, 0, 0, 0)^\top$, $b_1 = 0$; for $l \ge 2$, $W_l$ has $(W_l)_{11} = \sqrt2$
and zeros elsewhere, $b_l = (-\sqrt2, 0, 0, 0)^\top$; output $a = e_1$, $c = -1$. By
induction $z^{(l)}_1 - 1 = \bar h_l(x)$: indeed $z^{(1)}_1 = 2x^2$, and

$$\begin{aligned}
z^{(l)}_1 &= \big( \sqrt2\,(z^{(l-1)}_1 - 1) \big)^2 = 2\,\bar h_{l-1}(x)^2, \\
z^{(l)}_1 - 1 &= T_2(\bar h_{l-1}(x)) = \bar h_l(x).
\end{aligned}$$

 The bias $-\sqrt2$ is how the "$-1$"
of $T_2$ is passed to the next layer.
*Identity (2 pts):* by induction on $l$, with $\cos 2\beta = 2\cos^2\beta - 1$:

$$\begin{aligned}
\bar h_1(\cos\theta) &= 2\cos^2\theta - 1 = \cos 2\theta, \\
\bar h_l(\cos\theta) &= 2\cos^2(2^{l-1}\theta) - 1 = \cos(2^l\theta),
\end{aligned}$$

using the hypothesis $\bar h_{l-1}(\cos\theta) = \cos(2^{l-1}\theta)$ in the second line. (Hence $\bar h_L$
and $T_{2^L}$ agree on $[-1,1]$, so they are the same polynomial.)

**b. (6)** Let $\deg p \le n - 1$ and suppose, for contradiction, $dist(T_n, p) < 1$.
*Alternation (2 pts):* at $x_k = \cos(k\pi/n)$, $k = 0, \dots, n$ (points of $[-1,1]$ with
$1 = x_0 > x_1 > \dots > x_n = -1$), $T_n(x_k) = \cos(k\pi) = (-1)^k$, so
$|p(x_k) - (-1)^k| < 1$, which forces $(-1)^k p(x_k) > 0$: $p$ is strictly positive at
even $k$ and strictly negative at odd $k$.
*Root counting (3 pts):* by the intermediate value theorem $p$ has a root in each of the
$n$ disjoint open intervals $(x_{k+1}, x_k)$, i.e. $n$ distinct roots. A nonzero polynomial
of degree $\le n-1$ has at most $n-1$ roots, and $p \not\equiv 0$ because $p(x_0) > 0$ —
contradiction. So $dist(T_n, p) \ge 1$.
*Attained (1 pt):* $p \equiv 0 \in \mathcal{P}_{n-1}$ gives
$dist(T_n, 0) = \sup_\theta |\cos n\theta| = 1$. Hence
$\inf_{p \in \mathcal{P}_{n-1}} dist(T_n, p) = 1$.
Traps: concluding from "$|p(x_k) - (-1)^k| < 1$" only $p(x_k) \ne 0$ (one needs the sign);
counting $n+1$ roots (there are $n$ gaps between $n+1$ points); forgetting the case
$p \equiv 0$.

**c. (2)** Condition (i) is part 3 with $L = B \in O(B)$. Condition (ii): take
$\bar h := \bar h_L \in \mathcal{N}_L$ (part 4a), which equals $T_{2^L}$ on $[-1,1]$; for
$B < 2^L$ we have $\mathcal{P}_B \subseteq \mathcal{P}_{2^L - 1}$, so by part 4b, for any
$\epsilon \in (0,1)$,

$$\inf_{p \in \mathcal{P}_B} dist(\bar h_L, p) \;\ge\; 1 \;>\; \epsilon ;$$

this is condition (ii) with $c = 2$. The deep network has $20L - 7$ parameters
(only $2L + 1$ of them non-zero), while a polynomial-feature network needs at least
$2^L + 1$ parameters to come within distance $<1$ (1 pt definitions combined, 1 pt
parameter comparison).

**5. (7)**
**a. (2)** $f := T_{2^L + 1}$ is continuous. By part 2 every $h \in \mathcal{N}_L$ lies in
$\mathcal{P}_{2^L}$, so part 4b with $n = 2^L + 1$ gives $dist(f, h) \ge 1$. (Universality
needs depth that grows with the target, as in part 3.)

**b. (5)** *Form (3 pts):* by induction every entry of $z^{(l)}$ equals $\gamma^{(l)}_i
x^{2^l}$ with $\gamma^{(l)}_i \ge 0$: for $l = 1$, $z^{(1)}_i = (W_1)_i^2\, x^2$; if it
holds at $l-1$, then

$$z^{(l)}_i = \Big( \sum_j (W_l)_{ij}\, \gamma^{(l-1)}_j\, x^{2^{l-1}} \Big)^2
= \Big( \sum_j (W_l)_{ij}\, \gamma^{(l-1)}_j \Big)^2 x^{2^l} .$$

Hence $h(x) = a^\top z^{(L)} + c = \gamma\, x^{2^L} + c$ with
$\gamma := \sum_i a_i \gamma^{(L)}_i$.
*Non-universality (2 pts):* every such $h$ is even, so $h(1) = h(-1) =: \eta$. For
$f(x) = x$,

$$2 = |f(1) - f(-1)| \le |f(1) - \eta| + |\eta - f(-1)| \le 2\, dist(f, h),$$

so $dist(f, h) \ge 1$ for every $h \in \bigcup_L \mathcal{N}^0_L$ (and $h \equiv 0$ shows it
is tight). So no depth rescues the bias-free class; compare part 4a, where the bias
$-\sqrt2$ is essential. Trap: arguing only "$h(0) = c$" or "$h$ is not linear" without a
quantitative bound that holds uniformly over all depths.

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

**1. (5)** $\phi$ depends on $(u_i, v_i)$ only through $w_i = u_i^2 - v_i^2$, so by the
chain rule (3 pts)

$$\frac{\partial \phi}{\partial u_i} = \frac{\partial L}{\partial w_i}(w) \cdot 2 u_i,
\qquad
\frac{\partial \phi}{\partial v_i} = \frac{\partial L}{\partial w_i}(w) \cdot (-2 v_i),$$

i.e. $\nabla_u \phi = 2 u \odot \nabla L(w)$, $\nabla_v \phi = -2 v \odot \nabla L(w)$, with
$\nabla L(w) = X^\top (X w - y)$ (1 pt). Negating gives $\dot u = -2 u \odot g$,
$\dot v = 2 v \odot g$ (1 pt). Deduct 2 for a sign error in the $v$-equation (this sign is
what makes the two branches move in opposite directions).

**2. (7)**
*(i) (2 pts)*

$$\frac{d}{dt}(u_i v_i) = \dot u_i v_i + u_i \dot v_i = -2 g_i u_i v_i + 2 g_i u_i v_i = 0 .$$

(This is the analogue of balancedness from Lecture 4 for this
parameterization: here a *product*, not a difference of squares, is conserved.)
*(ii) (3 pts)* $g$ is continuous, so $G$ is differentiable with $\dot G = g$ and
$G(0) = 0$. Then

$$\frac{d}{dt}\big[ u_i(t)\, e^{2G_i(t)} \big] = e^{2G_i}\big( \dot u_i + 2 g_i u_i \big)
= 0,$$

so $u_i(t) e^{2G_i(t)} = u_i(0)$; similarly

$$\frac{d}{dt}\big[ v_i(t)\, e^{-2G_i(t)} \big] = e^{-2G_i}\big( \dot v_i - 2 g_i v_i \big) = 0$$

gives $v_i(t) = v_i(0) e^{2G_i(t)}$. (Note the
product of the two closed forms re-proves (i).)
*(iii) (2 pts)* $e^{\pm 2G_i(t)} > 0$, so $\operatorname{sign} u_i(t) = \operatorname{sign}
u_i(0)$ and $\operatorname{sign} v_i(t) = \operatorname{sign} v_i(0)$; zeros stay zero. If
$v(0) = 0$ then $v \equiv 0$ and $w = u \odot u \ge 0$: the plain Hadamard-square model can
only reach non-negative predictors, whereas $u \odot u - v \odot v$ reaches all of
$\mathbb{R}^d$ (take $u = \sqrt{w_+}$, $v = \sqrt{w_-}$), so the "negative branch" is what
makes the model as expressive as plain linear regression.
Trap: claiming $u_i$ and $v_i$ are each conserved, or deriving sign preservation only from
"the flow is continuous" without showing $u_i$ cannot reach $0$ (the closed form gives it).

**3. (6)** By 2(i), $u_i(t) v_i(t) = \alpha^2$ for all $t$ (1 pt). Product rule and part 1
(2 pts):

$$\dot w_i = 2 u_i \dot u_i - 2 v_i \dot v_i = -4 u_i^2 g_i - 4 v_i^2 g_i
= -4\,(u_i^2 + v_i^2)\, g_i .$$

Eliminate $u, v$ (3 pts):

$$(u_i^2 + v_i^2)^2 = (u_i^2 - v_i^2)^2 + 4 u_i^2 v_i^2 = w_i^2 + 4\alpha^4 ,$$

and $u_i^2 + v_i^2 \ge 0$, so $u_i^2 + v_i^2 = \sqrt{w_i^2 + 4\alpha^4}$, which
gives the claim. This is a *preconditioned* gradient flow on $L$ (cf. the end-to-end
dynamics of Lecture 4): coordinates that are already large move faster. Deduct 2 for
taking the square root without noting $u_i^2 + v_i^2 \ge 0$ (or for writing it as
$|w_i| + 2\alpha^2$, which is wrong).

**4. (6)** Chain rule and part 3 (2 pts):

$$\frac{d}{dt} L(w(t)) = \nabla L(w)^\top \dot w
= -4 \sum_i \sqrt{w_i^2 + 4\alpha^4}\; g_i^2 \;\le\; -8\alpha^2 \|g\|^2 ,$$

using $\sqrt{w_i^2 + 4\alpha^4} \ge 2\alpha^2$ (1 pt). Full row rank (2 pts):

$$\|g\|^2 = r^\top X X^\top r \ge \lambda_0 \|r\|^2 = 2\lambda_0 L(w),$$

so

$$\frac{d}{dt} L(w(t)) \le -16\alpha^2 \lambda_0\, L(w(t)) .$$

Hence $\frac{d}{dt}\big[ L(w(t))\, e^{16\alpha^2\lambda_0 t} \big] \le 0$, and with
$L(w(0)) = L(0) = \tfrac12\|y\|^2$ we get the bound (1 pt). *Small initialization:* the
guaranteed rate is proportional to $\alpha^2$, so it degrades as $\alpha \to 0$ — the flow
starts next to the saddle at the origin and leaves it slowly (the cost of the sparsity
bias of part 5). Unlike b\_2023 Q2(5), no lower barrier on $w$ has to be *assumed*: the
conserved product $u_iv_i = \alpha^2$ keeps the preconditioner $\ge 2\alpha^2$ for free.
Trap: using $\lambda_{\min}(X^\top X)$, which is $0$ when $N < d$; the right matrix is
$XX^\top$.

**5. (11)**
**a. (4)** *Mirror identity (2 pts):* with $c := 2\alpha^2$,

$$\frac{d}{dt} \operatorname{arcsinh}\Big( \frac{w_i}{c} \Big)
= \frac{\dot w_i / c}{\sqrt{1 + w_i^2 / c^2}} = \frac{\dot w_i}{\sqrt{w_i^2 + 4\alpha^4}}
= -4 g_i ,$$

by part 3. Since $q(0) = \operatorname{arcsinh}(0) = 0$,

$$q(t) = -4 \int_0^t X^\top r(s)\, ds = X^\top \mu(t) \in \operatorname{range}(X^\top).$$

*Convergence (2 pts):* by part 4,

$$\|r(s)\| = \sqrt{2 L(w(s))} \le \|y\|\, e^{-8\alpha^2\lambda_0 s},$$

so for $t' > t$

$$\|\mu(t') - \mu(t)\| \le 4 \int_t^{t'} \|r(s)\|\, ds \le
\frac{\|y\|}{2\alpha^2\lambda_0}\, e^{-8\alpha^2\lambda_0 t} \xrightarrow[t \to \infty]{} 0 .$$

So $\mu(t)$ is Cauchy and converges to some $\mu_\infty$; by continuity of $\sinh$,

$$w(t) = 2\alpha^2 \sinh\big(X^\top \mu(t)\big) \;\longrightarrow\;
w_\infty := 2\alpha^2 \sinh\big(X^\top \mu_\infty\big).$$

Since $L(w(t)) \to 0$ and $L$ is continuous, $L(w_\infty) = 0$, i.e. $X w_\infty = y$, and

$$\operatorname{arcsinh}\big(w_\infty / 2\alpha^2\big) = X^\top \mu_\infty \in
\operatorname{range}(X^\top).$$

 Trap: concluding "$w(t)$ converges" from $L \to 0$ alone
(with $N < d$ the zero-loss set is an affine subspace, so this needs the integrability
argument).

**b. (3)** $\Psi_\alpha = \sum_i \psi(w_i)$ with

$$\psi'(w) = \operatorname{arcsinh}\Big( \frac{w}{2\alpha^2} \Big) + \frac{w}{\sqrt{w^2 +
4\alpha^4}} - \frac{w}{\sqrt{w^2 + 4\alpha^4}} = \operatorname{arcsinh}\Big(
\frac{w}{2\alpha^2} \Big), \qquad \psi''(w) = \frac{1}{\sqrt{w^2 + 4\alpha^4}} > 0,$$

so $\Psi_\alpha$ is strictly convex with $\nabla\Psi_\alpha(w_\infty) = X^\top \mu_\infty$
(1 pt). For any $w'$ with $X w' = y$, $w' \ne w_\infty$, strict convexity gives (2 pts)

$$\Psi_\alpha(w') > \Psi_\alpha(w_\infty) + \mu_\infty^\top X (w' - w_\infty)
= \Psi_\alpha(w_\infty),$$

since $X(w' - w_\infty) = y - y = 0$. So $w_\infty$ is the unique minimizer. (Equivalently:
the Lagrange/KKT condition $\nabla\Psi_\alpha(w) \in \operatorname{range}(X^\top)$ is
sufficient for a convex objective under linear constraints.)

**c. (4)** *Closed form (2 pts):* here $\operatorname{range}(X^\top) =
\{ (m, 2m) : m \in \mathbb{R} \}$, so by part a $w_\infty = 2\alpha^2 (\sinh m, \sinh 2m)$
for some $m$, and $X w_\infty = 2$ reads $2\alpha^2(\sinh m + 2\sinh 2m) = 2$. With
$\sinh 2m = 2\sinh m \cosh m$ this is $F(m) := \sinh m\,(1 + 4\cosh m) = \alpha^{-2}$. $F$
is odd, continuous, strictly increasing ($F'(m) = \cosh m (1 + 4\cosh m) + 4\sinh^2 m >
0$) and unbounded, so there is a unique solution $\mu$, and $\mu > 0$ because
$\alpha^{-2} > 0$. Substituting $2\alpha^2 = 2 / F(\mu)$:

$$w_{\infty,1} = \frac{2\sinh\mu}{\sinh\mu\,(1 + 4\cosh\mu)} = \frac{2}{1 + 4\cosh\mu},
\qquad
w_{\infty,2} = \frac{4\sinh\mu\cosh\mu}{\sinh\mu\,(1 + 4\cosh\mu)} =
\frac{4\cosh\mu}{1 + 4\cosh\mu}.$$

*Limits (1 pt):* $\mu = F^{-1}(\alpha^{-2})$ with $F^{-1}$ continuous and increasing. As
$\alpha \to 0^+$, $\mu \to \infty$, so $\cosh\mu \to \infty$ and
$\boxed{w_\infty \to (0, 1)}$. As $\alpha \to \infty$, $\mu \to 0^+$, so $\cosh\mu \to 1$
and $\boxed{w_\infty \to (\tfrac25, \tfrac45)}$.
*Identification (1 pt):* on $\{w_1 + 2w_2 = 2\}$,

$$\|w\|_1 \;\ge\; \tfrac12|w_1| + |w_2| \;\ge\; \tfrac12 |w_1 + 2 w_2| \;=\; 1,$$

with equality only if $w_1 = 0$, so $(0,1)$ is the unique minimum-$\ell_1$ interpolator. By Cauchy–Schwarz,
$2 = \langle (1,2), w \rangle \le \sqrt5\, \|w\|_2$, with equality iff $w \parallel (1,2)$,
so $(\tfrac25, \tfrac45) = X^\top (XX^\top)^{-1} y$ is the minimum-$\ell_2$ interpolator.
Small initialization therefore gives the sparse ($\ell_1$) solution and large
initialization the $\ell_2$ / kernel-regime solution (compare Lecture 7: minimum-norm
interpolation for linear regression from zero, and the NTK regime). (Numerically
$\alpha = 0.1$ gives $(0.097, 0.952)$ and $\alpha = 3$ gives $(0.400, 0.800)$.)
Traps: swapping the two limits; asserting "small init $\Rightarrow \ell_1$" as a known fact
instead of computing the limit; forgetting to prove that $\mu$ is unique and positive.

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

**1. (7)** *Counting (2 pts):* $\theta \mapsto h^{(P)}_\theta$ maps $Q_k^P$ onto
$\mathcal{H}_{P,k}$, so $|\mathcal{H}_{P,k}| \le |Q_k|^P = 2^{Pk}$ (different $\theta$ may
give the same function, hence "$\le$").
*Fixed $h$ (2 pts):* for $h$ fixed independently of $S$, $A_n := \ell(h(x_n), y_n)$ are
i.i.d. in $[0,1]$ with $\mathbb{E}[A_1] = L_D(h)$, so Hoeffding gives
$P(|L_S(h) - L_D(h)| \ge \epsilon) \le 2e^{-2N\epsilon^2}$.
*Union bound (3 pts):*

$$P\big( \exists h \in \mathcal{H}_{P,k} : |L_S(h) - L_D(h)| \ge \epsilon \big) \le
2\,|\mathcal{H}_{P,k}|\, e^{-2N\epsilon^2} \le 2^{Pk+1} e^{-2N\epsilon^2} .$$

Setting the right-hand side to $\delta$ gives
$\epsilon = \sqrt{(Pk\ln 2 + \ln(2/\delta)) / (2N)}$; on the complementary event
(probability $\ge 1 - \delta$) every $h$ has $L_D(h) - L_S(h) < \epsilon$. Deduct 3 if
Hoeffding is applied to an $S$-dependent hypothesis (e.g. "the trained network") without
the union bound; deduct 1 for a wrong factor $2$.

**2. (8)** *Weights (2 pts):* $\delta_{P,k} := \delta\, 2^{-(P+k)}$, so

$$\sum_{P, k \ge 1} \delta_{P,k} = \delta \Big( \sum_{P \ge 1} 2^{-P} \Big)
\Big( \sum_{k \ge 1} 2^{-k} \Big) = \delta .$$

*Union over $(P,k)$ (3 pts):* apply part 1 to each $\mathcal{H}_{P,k}$ with confidence
$\delta_{P,k}$ (each class is fixed before the data). By the union bound over the countably
many failure events, with probability $\ge 1 - \sum \delta_{P,k} = 1 - \delta$ all hold at
once. Since $\ln(2/\delta_{P,k}) = \ln(2/\delta) + (P + k)\ln 2$:

$$\Delta(N, \delta, P, k) = \sqrt{\frac{(Pk + P + k)\ln 2 + \ln(2/\delta)}{2N}}
= \sqrt{\frac{\big[(P+1)(k+1) - 1\big]\ln 2 + \ln(2/\delta)}{2N}} .$$

*Properties (2 pts):* $(P+1)(k+1)$ is strictly increasing in each argument, giving (b);
$\Delta = O(1/\sqrt N)$ for fixed $P, k, \delta$, giving (c).
*Legitimacy (1 pt):* the inequality holds on one event simultaneously for every $(P,k)$,
so it also holds for $(\hat P, \hat k)$ chosen as any function of $S$ (structural risk
minimization). Also full credit: $\delta_{P,k} = \frac{36\,\delta}{\pi^4 P^2 k^2}$, giving
$\ln(\pi^4 P^2 k^2/36)$ in place of $(P+k)\ln 2$. Traps: a "uniform" split over infinitely
many pairs (impossible); weights such as $\delta/(Pk)$ that do not sum to $\le \delta$;
unioning over $P$ but forgetting $k$.

**3. (5)** *Counting (3 pts):* distinct labelings of $x_1, \dots, x_N$ need distinct
hypotheses (two hypotheses that differ on some $x_n$ are different functions), so
$2^N \le |\mathcal{H}_{P,k}| \le 2^{Pk}$, i.e. $Pk \ge N$.
*Consequence (1 pt):*

$$\Delta(N, \delta, P, k)^2 \ge \frac{Pk \ln 2}{2N} + \frac{(P+k)\ln 2 + \ln(2/\delta)}{2N}
> \frac{\ln 2}{2},$$

so $\Delta > \sqrt{\ln 2 / 2} \approx 0.589$.
*Why useless (1 pt):* for $L_S(h) = 0$ the guarantee is $L_D(h) < 0.59$ (roughly), which is
worse than the $\tfrac12$ achieved by guessing a fair coin, for every $D$. It does not
shrink as $N$ grows, because the bit count has to grow with $N$.

**4. (6)** *(i) (3 pts)* $y$ is independent of $x$ and uniform on $\{0,1\}$, so for every
$h$

$$L_D(h) = \mathbb{E}_x\big[ P(y \ne h(x) \mid x) \big] = \mathbb{E}_x\big[\tfrac12\big] =
\tfrac12 .$$

 The inputs are i.i.d. uniform on $[0,1]^D$, which has no atoms, so
$P(x_n = x_m) = 0$ for $n \ne m$, and the $N$ inputs are distinct with probability $1$. On
that event some $h \in \mathcal{H}_{P,k}$ fits all labels, so the ERM output has
$L_S(\hat h_S) = 0$.
*(ii) (3 pts)* Under $D^{\mathrm{rand}}$, $L_D(\hat h_S) - L_S(\hat h_S) = \tfrac12$ with
probability $1$. The event $\{ \text{gap} \le \Delta' \}$ has probability $\ge 1 - \delta >
0$, so it meets this probability-$1$ event, and there $\tfrac12 \le \Delta'$. *Moral:* no
bound that depends only on the class (and $N, \delta$) can certify anything below chance
for an interpolating class; the $0.589$ of part 3 is not a loose estimate but close to the
best a class-only bound can do. Yet the same networks trained on real labels generalize
(Zhang et al., Lecture 6), so a meaningful bound must depend on the returned hypothesis
$\hat h$ and on the sample $S$ (equivalently, through $S$, on $D$):
$\Delta(N, \delta, \mathcal{H}, \hat h, S)$. Part 2 depends on $\hat h$ only through its
size and precision, so it helps only if the trained network really can be compressed to
$Pk \ll N$ bits. Grade: 2 for the probability argument, 1 for the moral; deduct 1 if the
answer says "the bound is wrong" (it is not: here it is simply $\ge \tfrac12$, as it must
be).

**5. (4)** *(i) (2 pts)*

$$\sqrt{\frac{10^6 \cdot 0.693 + 3.689}{2 \cdot 5 \cdot 10^4}} = \sqrt{6.93} \approx 2.63
> 1,$$

which is vacuous (the zero-one loss never exceeds $1$), even at $1$ bit per weight and
before the SRM price of part 2.
*(ii) (2 pts)* Need $(P \ln 2 + \ln 40)/10^5 \le 0.01$, i.e.
$P \ln 2 \le 1000 - 3.689 = 996.311$, so $P \le 996.311 / 0.693 \approx 1437.7$: $\boxed{P = 1437}$, about
$0.03\,N$. Bit-counting is informative only when the number of bits is a small fraction of
$N$, while modern networks have $P \gg N$ (here $P = 20N$). With the part-2 bound
($k = 1$, i.e. $(2P+1)\ln 2$ bits) the answer would be $P = 718$. Deduct 1 for an
off-by-one or rounding up.

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
