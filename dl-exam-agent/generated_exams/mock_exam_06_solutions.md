# Mock Exam 6 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_06.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-10-28 (Q1: homogeneity on random nets; $\inf_c\sup_{\lambda\in[0,1]}|c\lambda-\lambda^2| = 3-2\sqrt2 \approx 0.1716 \ge \tfrac16$
on a grid; $|A_h| \le 2B$ by dense angular sampling on 400 random planar nets (incl. parallel and zero rows) and $|A_h| = 2B$ for
$v>0$, pairwise non-parallel $w_i$, $B = 1..8$; the width-$m$ interpolant attains error exactly $1/(4m^2)$ for $m \in \{1,2,3,5,10,37\}$;
Q2: PL of least squares at 1000 random points, Euler GF ($dt = 10^{-4}$) obeys $f(t) \le e^{-2\mu t}f_0$, trajectory length
$3.00 \le 4.62$ = bound, limit = projection of $w_0$; 1-D instance length $= 1.000$ = bound; weight-normalized GF:
$\|v\|$ drift $1.3\text{e-}7$ (Euler $dt = 10^{-3}$, $T = 20$), $v^\top\nabla_v F \approx 10^{-17}$, GD norm identity exact;
Q3: brute-force count of $\{w \in G_p^d : \|w\|_0 \le k\}$ for $d \le 4$, $p \le 2$ against $(1+d2^{p+1})^k$; $\sum\pi = 1$;
rounding bound $\|w-\bar w\|_1 \le \sigma_k(w)+k2^{-(p+1)}$ on 20000 random cases; the choice $p = \lceil\log_2(s/\eta)\rceil$).

## Q1 — Bias-free ReLU networks: cones, sectors, and restoring biases (40)

**Hint:** Without biases every neuron's "kink" set $\{w_i^\top x = 0\}$ passes through the origin, so the whole picture is invariant under positive scaling — what does that force along a single ray, and what shape do the activation regions have? In the plane, count how many open pieces $m$ lines through the origin leave, and for the lower bound use that a sum of ReLUs with positive output weights is convex, so it lies above each of its linear pieces. For the biases, think of the bias as a weight on an extra input that is always $1$.

**Full solution:**

**1. (8)**
**a. (3)** For $\lambda \ge 0$ and $z \in \mathbb{R}$: $\sigma(\lambda z) = \max\{0, \lambda z\} = \lambda \max\{0, z\} = \lambda\sigma(z)$ (2 pts; the case $\lambda = 0$ gives $0 = 0$). Hence

$$h(\lambda x) = \sum_i v_i\, \sigma(\lambda\, w_i^\top x) = \lambda \sum_i v_i\, \sigma(w_i^\top x) = \lambda\, h(x)$$

(1 pt), and $h(0) = 0$ with $\lambda = 0$. Deduct 1 if the argument uses $\lambda > 0$ only and forgets $\lambda = 0$.

**b. (5)** Fix $u$ with $\|u\| = 1$ and put $c := h(u)$. By (a), $h(\lambda u) = c\lambda$, while $f(\lambda u) = \lambda^2$ (2 pts). Suppose the supremum were $< \tfrac16$. At $\lambda = 1$: $|c - 1| < \tfrac16$, so $c > \tfrac56$. At $\lambda = \tfrac12$: $|\tfrac c2 - \tfrac14| < \tfrac16$, i.e. $|c - \tfrac12| < \tfrac13$, so $c < \tfrac56$ — contradiction (2 pts). Since $B$, $h$ and $u$ were arbitrary, $\sup_{\|x\| \le 1} |h(x) - \|x\|^2| \ge \tfrac16$ for every $h \in \bigcup_B \mathcal{H}_B^D$: no width helps, so $\bigcup_B \mathcal{H}_B^D$ is not universal w.r.t. continuous functions in the sup-norm on the unit ball (1 pt).
*(Remark: the exact floor along a ray is $\min_c \max_{\lambda\in[0,1]} |c\lambda - \lambda^2| = 3 - 2\sqrt2 \approx 0.172$, at $c = 2(\sqrt2 - 1)$; not required.)*
Common traps: arguing only "$h(0) = 0 = f(0)$, so no contradiction there" and stopping; using $\lambda > 1$ (outside the unit ball); proving the bound for one fixed $B$ only.

**2. (8)** *Contains $x$, open (2 pts):* $x \in C(x)$ trivially. Each map $x' \mapsto w_i^\top x'$ is continuous, so $\{x' : \operatorname{sign}(w_i^\top x') = s_i\}$ with $s_i \in \{+, -\}$ is an open half-space; $C(x)$ is a finite intersection of open sets (all of $\mathbb{R}^D$ if $I = \emptyset$). *Convex cone (2 pts):* if $x', x'' \in C(x)$ and $\lambda, \mu > 0$, then $w_i^\top(\lambda x' + \mu x'') = \lambda w_i^\top x' + \mu w_i^\top x''$ is a positive combination of two numbers of sign $s_i$, hence has sign $s_i$, for each $i \in I$.
*Linearity (2 pts):* for $x' \in C(x)$ and $i \in I$: $\sigma(w_i^\top x') = w_i^\top x'$ if $w_i^\top x > 0$, and $= 0$ if $w_i^\top x < 0$; neurons with $w_i = 0$ contribute $\sigma(0) = 0$. So

$$h(x') = \sum_{i \in I:\, w_i^\top x > 0} v_i\, w_i^\top x' = a(x)^\top x' .$$

Since $C(x)$ is open, some ball $\{\|x' - x\| \le \epsilon\} \subseteq C(x)$: $h$ is linear around $x$ according to $a(x)$.
*$|A_h| \le 2^B$ (2 pts):* let $a \in A_h$, with $h = a^\top(\cdot)$ on a ball $\mathcal{B}$. The set $\bigcup_{i \in I}\{w_i^\top x = 0\}$ is a finite union of hyperplanes, so it has empty interior and $\mathcal{B}$ contains some $x$ off all of them. On the open non-empty set $\mathcal{B} \cap C(x)$ both $a^\top x'$ and $a(x)^\top x'$ equal $h(x')$, so $a = a(x)$ (a linear form vanishing on an open set is zero). Finally $a(x)$ depends only on the sign pattern $(\operatorname{sign} w_i^\top x)_{i \in I} \in \{+,-\}^{|I|}$, giving $|A_h| \le 2^{|I|} \le 2^B$.
Deduct 2 for no argument that a linearity point off the "generic" set (e.g. on a hyperplane, or the origin) still produces one of the cone vectors; deduct 1 for forgetting neurons with $w_i = 0$.

**3. (12)**
**a. (6)** If $I = \emptyset$ then $h \equiv 0$ and $A_h = \{0\}$, so $|A_h| = 1 \le 2B$. Otherwise let $\ell_1, \dots, \ell_m$ ($1 \le m \le |I| \le B$) be the **distinct** lines among $\{z : w_i^\top z = 0\}$, $i \in I$ (parallel $w_i$'s give the same line).
*Sector count (2 pts):* each $\ell_j$ meets the unit circle in two antipodal points; distinct lines give $2m$ distinct points, which cut the circle into $2m$ open arcs. The plane minus the lines is the disjoint union of the $2m$ open sectors $\{r u : r > 0,\ u \in \text{arc}\}$, each connected.
*Constant pattern per sector (2 pts):* on a sector $S$, every $w_i^\top z$ ($i \in I$) is continuous and never $0$, hence of constant sign (connectedness), so $S$ lies in a single cone $C(x)$ of part 2 and $h = a_S^\top(\cdot)$ on $S$ for a single vector $a_S$.
*Every element of $A_h$ is some $a_S$ (2 pts):* if $h = a^\top(\cdot)$ on a ball, the ball meets some open sector $S$ (the lines have empty interior), and on that open intersection $a^\top = a_S^\top$, so $a = a_S$. Hence $A_h \subseteq \{a_S\}$ and $|A_h| \le 2m \le 2B$.
Trap: bounding by the number of sign patterns ($2^B$) — true but not the asked bound; claiming $B$ lines always give $2B$ sectors (parallel weights give fewer lines — the bound is still $\le 2B$).

**b. (6)** Now $m = B$: the lines are distinct (pairwise independence), so there are $2B$ sectors, and each $a_S \in A_h$ ($h$ is linear around any point of the open $S$). It remains to show the $2B$ vectors $a_S$ are pairwise distinct (1 pt for this reduction).
*Convexity sandwich (2 pts):* $h$ is convex (each $z \mapsto v_i\sigma(w_i^\top z)$ is a non-negative multiple of a convex function composed with a linear map). On an open sector $S$, $h$ is differentiable with gradient $a_S$, so for $x \in S$ and every $y$: $h(y) \ge h(x) + a_S^\top(y - x) = a_S^\top y$. Suppose $S \ne S'$ but $a_S = a_{S'} =: a$. Pick $x \in S$ and $x' \in S'$ with $x' \notin \mathbb{R}x$ (possible: $S'$ is open, the line $\mathbb{R}x$ is not). Along $y(t) = (1-t)x + t x'$, convexity gives $h(y(t)) \le (1-t)a^\top x + t\, a^\top x' = a^\top y(t)$ and the support inequality gives $\ge$, so $h = a^\top(\cdot)$ on the whole segment; the segment avoids $0$ and lies on a line not through the origin.
*First crossing (2 pts):* let $z := y(t^*)$ with $t^* := \sup\{t : y([0,t]) \subseteq S\}$. Then $z \ne 0$ lies on the boundary of $S$, hence on some line $\ell_i$ — and on **only** that one, because distinct lines through the origin meet only at $0$. The segment is not contained in $\ell_i$ (it contains $x \notin \ell_i$), so it crosses $\ell_i$ at $z$, and for $t \in (t^*, t^* + \epsilon)$ the points $y(t)$ lie in the sector $S''$ on the other side of $\ell_i$ near $z$. Crossing $\ell_i$ flips only neuron $i$, so $a_{S''} = a_S \pm v_i w_i \ne a_S$ (as $v_i > 0$, $w_i \ne 0$).
*Contradiction (1 pt):* two distinct points $y(t_1), y(t_2)$ with $t_1, t_2 \in (t^*, t^*+\epsilon)$ lie in $S''$ and on a line not through the origin, so they are linearly independent; $a_{S''}^\top$ and $a^\top$ agree on both, hence $a_{S''} = a = a_S$ — contradicting the previous step. So $|A_h| = 2B$, and with part (a), $\max_{h \in \mathcal{H}_B^2} |A_h| = 2B$. Comparison: $2B$ grows linearly while the sign-pattern bound $2^B$ of part 2 is exponential — in the plane most sign patterns are geometrically unrealizable (a central line arrangement, not a product of independent choices). Contrast a\_2023 Q1(3), where $2^D$ regions needed $D$ input dimensions.
*(Not required: positivity matters. With $w_i$ at angles $0, \tfrac\pi3, \tfrac{2\pi}3$ and $v = (1,-1,1)$ one has $v_1w_1 + v_2w_2 + v_3w_3 = 0$, and only $5 < 6$ distinct coefficients occur — two opposite sectors share one.)*
Common traps: asserting "adjacent sectors differ, hence all differ" (non-adjacent sectors are the issue — that is what the convexity argument handles); a segment through the origin (it may jump from $S$ straight to the opposite sector); concluding $a = a_{S''}$ from agreement at a single point.

**4. (12)**
**a. (3)** Given $g(x) = \sum_{i=1}^B v_i\sigma(w_i^\top x + b_i) + c$, set $\tilde w_i := (w_i, b_i) \in \mathbb{R}^{D+1}$ for $i \le B$, and add neuron $B+1$ with $\tilde w_{B+1} := e_{D+1}$, $v_{B+1} := c$ (any sign of $c$ is fine). Then

$$h(x, 1) = \sum_{i=1}^B v_i\sigma(w_i^\top x + b_i) + c\,\sigma(1) = g(x)$$

(2 pts). Conversely, writing the hidden weights of $h \in \mathcal{H}_B^{D+1}$ as $\tilde w_i = (w_i, b_i)$ gives $h(x, 1) = \sum_i v_i\sigma(w_i^\top x + b_i)$, which is in $\mathcal{N}_B^D$ with $c = 0$ (1 pt). Trap: forgetting the output bias $c$ (it costs the extra neuron).

**b. (5)** *Upper bound (3 pts):* embed $g$ as in (a) into $h$ with weights $\tilde w_i = (w_i, b_i)$, $\tilde w_{B+1} = (0, 1)$, and restrict to the line $L := \{(x, 1) : x \in \mathbb{R}\}$, which does not pass through the origin. For $i \le B$ with $w_i \ne 0$, the line $\ell_i = \{\tilde w_i^\top z = 0\}$ is not parallel to $L$ and meets it at exactly one point, $x = -b_i/w_i$. If $w_i = 0$ (and $\tilde w_i \neq 0$) then $\ell_i = \{z_2 = 0\} \parallel L$ and is never met — that neuron is the constant $\sigma(b_i)$ on $L$; likewise neuron $B+1$ is the constant $\sigma(1) = 1$ on $L$, and a neuron with $\tilde w_i = 0$ vanishes identically. So $L$ meets the lines in at most $B$ points $t_1 < \dots < t_r$ ($r \le B$), and the $r + 1 \le B+1$ open intervals between them each lie inside a single open sector of the arrangement — on which, by part 2, $h$ is linear, so $g$ is affine. By continuity $g$ is affine on each closed interval $[t_{j-1}, t_j]$ ($t_0 = -\infty$, $t_{r+1} = \infty$), i.e. $g$ is piecewise linear with at most $B + 1$ pieces (Lecture 2, Def 1 — the number of pieces is a minimum, so exhibiting one partition suffices).
*Tightness (2 pts):* $g(x) := \sum_{i=1}^B \sigma(x - i) \in \mathcal{N}_B^1$ has slope $j$ on $(j, j+1)$ for $j = 0, \dots, B$ (with $(0,1)$ read as $(-\infty, 1)$ and $(B, B+1)$ as $(B, \infty)$). Any partition into affine pieces must place a breakpoint at every $i \in [B]$, since $g$ is not affine on any neighbourhood of $i$ (left slope $i-1 \ne i$ right slope); so it has at least $B$ breakpoints, hence exactly $B + 1$ pieces. This recovers the "$\le B+1$ pieces" half of Lecture 2, Prop 1 from the bias-free cone picture: an affine slice of a central arrangement of $B+1$ lines, one of which (the bias neuron) is parallel to the slice.
Deduct 2 if neurons with $w_i = 0$ or the bias neuron are miscounted as creating breakpoints (giving $B+2$); deduct 1 if the example's piece count is asserted, not proved.

**c. (4)** *Construction (2 pts):* let

$$h(z) := \frac1m\,\sigma(z_1) + \frac2m \sum_{i=1}^{m-1} \sigma\Big(z_1 - \frac im\, z_2\Big) \in \mathcal{H}_m^2 .$$

For $x \in [\tfrac{j-1}{m}, \tfrac jm]$ ($j \in [m]$), the active neurons are $i < j$ (and the first, since $x \ge 0$), so

$$h(x,1) = \frac{2j-1}{m}\,x - \frac{j(j-1)}{m^2},$$

which is the chord of $x^2$ through $(\tfrac{j-1}{m}, \tfrac{(j-1)^2}{m^2})$ and $(\tfrac jm, \tfrac{j^2}{m^2})$ (check both endpoints).
*Error (1 pt):* chord minus parabola on that interval equals

$$\Big(x - \frac{j-1}{m}\Big)\Big(\frac jm - x\Big) \;\in\; \Big[0,\, \frac{1}{4m^2}\Big]$$

(a product of two non-negative numbers summing to $\tfrac1m$), so the sup is $\le \tfrac{1}{4m^2}$. Alternatively: cite Lecture 2, Prop 1 for a width-$m$ net with biases realizing this $m$-piece interpolant, then part (a) — that costs width $m+1$; full credit if the width claim is adjusted and the error is computed (deduct 1 otherwise).
*No contradiction (1 pt):* part 1(b) constrains $h$ only along rays through the origin of the input space $\mathbb{R}^2$; the slice $\{(x,1)\}$ meets each ray at most once, so homogeneity ties $h(x,1)$ only to values $h(\lambda x, \lambda)$ off the slice, and the target $x^2$ lives on the slice. The constant coordinate is exactly a bias, and with biases (Lecture 2) universality returns.
Trap: using $\sigma(z_2)$ for the "bias" of the parabola — here $b = 0$, so width $m$ suffices; computing the error only at the midpoints without showing it is the maximum.

**💡 Useful tricks:** $\sigma(\lambda z)=\lambda\sigma(z)$ ⇒ along a ray every bias-free net is $c\lambda$, and two values of $\lambda$ already pin down a floor; activation regions are open convex cones $C(x)$ with coefficient $a(x)=\sum_{w_i^\top x>0}v_iw_i$; in $\mathbb R^2$, $m$ central lines give exactly $2m$ sectors; positive output weights ⇒ convex ⇒ $h\ge a_S^\top(\cdot)$ everywhere, so equal coefficients force linearity along a whole segment; a bias is a weight on a constant input, and an affine slice of a central arrangement meets each line at most once.

**⚠️ Watch out:** (1b) keep $\lambda\in[0,1]$ and quantify over all $B$; (2) a linearity point may sit on a hyperplane — pass to a generic nearby point; (3a) parallel weights share a line, so count *distinct* lines; (3b) non-adjacent sectors are the real issue, and the segment must avoid the origin; agreement at one point does not identify a vector; (4b) neurons with $w_i=0$ and the bias neuron create no breakpoint — the count is $B+1$, not $B+2$.

## Q2 — Gradient flow under a PL inequality, and weight normalization (35)

**Hint:** For the rate, look at how fast the gap $f(w(t)) - f^*$ changes and compare it with the gap itself; an integrating factor avoids dividing by zero. For the length, the PL inequality bounds $\|\nabla f\|$ from below by the square root of the gap — find a quantity whose time derivative is at most a negative multiple of the speed $\|\dot w\|$. For weight normalization, differentiate the invariance $c \mapsto q(cu)$ at $c = 1$; then ask what an orthogonal step does to a norm, and what scaling $u$ does to the size of the gradient.

**Full solution:**

**1. (5)** $f \ge 0$, and since $\operatorname{rank} X = N$ the map $w \mapsto Xw$ is onto $\mathbb{R}^N$, so some $w$ has $Xw = y$: $f^* = 0$ (1 pt). With $r := Xw - y$, $\nabla f(w) = X^\top r$ (1 pt) and

$$\|\nabla f(w)\|^2 = r^\top X X^\top r \;\ge\; \lambda_{\min}(XX^\top)\,\|r\|^2 = 2\mu\, f(w) = 2\mu\,(f(w) - f^*)$$

(2 pts), with $\mu > 0$ because $XX^\top \in \mathbb{R}^{N\times N}$ is PSD of rank $N$, hence PD. *Not strongly convex (1 pt):* for $N < d$ pick $0 \ne n \in \ker X$; $f(w + tn) = f(w)$ for all $t$, impossible for an $\alpha$-strongly convex function (which grows at least quadratically along every line). So PL is strictly weaker than the strong convexity used in Lecture 4 (Prop 2 there derives a PL-type bound *from* strong convexity). Deduct 1 for using $\lambda_{\min}(X^\top X)$, which is $0$ when $N < d$.

**2. (6)** Let $G(t) := f(w(t)) - f^* \ge 0$. Chain rule along GF (2 pts):

$$\dot G(t) = \nabla f(w(t))^\top \dot w(t) = -\|\nabla f(w(t))\|^2 \le -2\mu\, G(t).$$

Integrating factor (3 pts): $\frac{d}{dt}\big(e^{2\mu t}G(t)\big) = e^{2\mu t}(\dot G + 2\mu G) \le 0$, so $e^{2\mu t}G(t) \le G(0)$, i.e. the claim (1 pt). No division by $G$ is needed. Full credit also for Grönwall cited correctly, or $\frac{d}{dt}\ln G \le -2\mu$ **with** the case $G(t_1) = 0$ handled (then $G \equiv 0$ afterwards since $G \ge 0$ is non-increasing). Deduct 2 for dividing by $G$ without handling $G = 0$; deduct 1 for the rate $e^{-\mu t}$ (lost factor 2).

**3. (10)**
**a. (5)** *Case $G > 0$ on $[0, T]$ (3 pts):* $s(t) := \sqrt{G(t)}$ is differentiable there and, using PL in the form $\|\nabla f\| \ge \sqrt{2\mu G}$,

$$\dot s = \frac{\dot G}{2\sqrt G} = -\frac{\|\nabla f\|^2}{2\sqrt G} \le -\frac{\|\nabla f\|\sqrt{2\mu G}}{2\sqrt G} = -\sqrt{\frac\mu2}\,\|\dot w\| .$$

Integrating, $\int_0^T \|\dot w\|\, dt \le \sqrt{2/\mu}\,(s(0) - s(T)) \le \sqrt{2 G(0)/\mu}$.
*Case $G(t_1) = 0$ (1 pt):* take the first such $t_1$; $w(t_1)$ is a global minimizer of the $C^1$ function $f$, so $\nabla f(w(t_1)) = 0$, the constant curve is a solution from $w(t_1)$, and by uniqueness $\dot w \equiv 0$ on $[t_1, \infty)$; on $[0, t_1)$ the previous case applies for every $T < t_1$.
*Conclusion (1 pt):* letting $T \to \infty$ (monotone convergence) gives the bound. Trap: bounding $\int\|\nabla f\|^2$ (that only gives $\int\|\dot w\|^2 \le G(0)$, which does not bound the length).

**b. (3)** For $t < t'$: $\|w(t') - w(t)\| \le \int_t^{t'}\|\dot w\| \to 0$ as $t \to \infty$ (tail of a convergent integral), so $w(t)$ is Cauchy and converges to some $w_\infty$ (1 pt). By continuity and part 2, $f(w_\infty) = \lim f(w(t)) = f^*$: the infimum is **attained** (1 pt) — PL alone forces existence of a minimizer. By time-invariance and uniqueness, $t \mapsto w(t + \tau)$ is the GF from $w(\tau)$, so applying (a) from $w(\tau)$ and then part 2 (1 pt):

$$\|w(\tau) - w_\infty\| \le \int_\tau^\infty \|\dot w\| \le \sqrt{\frac{2G(\tau)}{\mu}} \le e^{-\mu\tau}\sqrt{\frac{2G(0)}{\mu}} .$$

**c. (2)** $N = d = 1$, $X = (1)$, $y = 1$, $w_0 = 0$: $f(w) = \tfrac12(w-1)^2$, $\mu = 1$, $G(0) = \tfrac12$, bound $= 1$. GF: $\dot w = 1 - w$, $w(t) = 1 - e^{-t}$, monotone, so the length is $\int_0^\infty e^{-t}dt = 1$ — equality. (More generally, whenever the initial residual is an eigenvector of $XX^\top$ for $\lambda_{\min}$, the path is a straight segment of length exactly $\sqrt{2G(0)/\mu}$; and $w_\infty$ is the projection of $w_0$ onto $\{Xw = y\}$, the min-norm interpolant when $w_0 = 0$ — Lecture 7, Prop 1.)

**4. (7)** *Orthogonality (3 pts):* fix $u \in U$; $\gamma(c) := q(cu)$ is constant on $(0, \infty)$ and differentiable, so $0 = \gamma'(1) = \nabla q(u)^\top u$ (as in a\_2023 Q2(2), but along a *ray* rather than a translation direction).
*Gradient scaling (2 pts):* for fixed $c > 0$, differentiate the identity $q(cu) = q(u)$ in $u$ (chain rule): $c\,\nabla q(cu) = \nabla q(u)$.
*Conservation (2 pts):* for fixed $g$, $q_g(v) := F(v, g)$ is scale invariant on $U = \mathbb{R}^m\setminus\{0\}$ since $h_{cv, g} = h_{v,g}$ for $c > 0$; and $\nabla_v F(v,g) = \nabla q_g(v)$. Hence along the joint GF

$$\frac{d}{dt}\|v(t)\|^2 = 2\, v^\top \dot v = -2\, v^\top \nabla_v F(v, g) = 0,$$

whatever $g(t)$ does — the invariance holds for **every** value of $g$, so training $g$ simultaneously does not break it (cf. a\_2023 Q2(5)). Trap: claiming $\|(v,g)\|$ or $g$ is conserved; differentiating at $c = 0$ (outside the domain).

**5. (7)**
**a. (3)** With $\gamma_k := \nabla_v F(v_k, g_k)$, part 4 gives $v_k^\top \gamma_k = 0$, so

$$\|v_{k+1}\|^2 = \|v_k\|^2 - 2\eta\, v_k^\top\gamma_k + \eta^2\|\gamma_k\|^2 = \|v_k\|^2 + \eta^2\|\gamma_k\|^2$$

(2 pts), strictly larger whenever $\gamma_k \ne 0$ (1 pt): a Pythagoras step, the $O(\eta^2)$ discretization effect that GF does not see. (Since $\|\nabla_v F\| \propto 1/\|v\|$, the growing norm shrinks the effective step $\eta/\|v\|^2$ on the direction $v/\|v\|$ — not required.)

**b. (4)** Fix $u \ne 0$. For every $c > 0$, by part 4 and scale invariance,

$$\frac{\|\nabla q(u)\|^2}{c^2} = \|\nabla q(cu)\|^2 \ge 2\mu\,\big(q(cu) - q^*\big) = 2\mu\,\big(q(u) - q^*\big)$$

(3 pts). Letting $c \to \infty$ gives $q(u) - q^* \le 0$, so $q(u) = q^*$ for every $u$: $q$ is constant (1 pt for this together with the conclusion: by part 4, $q_g = F(\cdot, g)$ is scale invariant on $\mathbb{R}^m\setminus\{0\}$, so it is PL only if constant). Hence the $v$-subproblem of a non-constant weight-normalized objective never satisfies PL with a uniform $\mu$ — far from the origin its gradients become arbitrarily small while the gap does not; one can at best hope for PL on a sphere $\{\|v\| = r\}$ with a constant degrading like $1/r^2$. *(Not required, but note the scope: the **joint** objective $F(v,g)$ is not scale invariant in $(v,g)$ and can be PL — e.g. $m = N = 1$, $\phi \equiv 1$, $y_1 = 1$, square loss: $F = \tfrac12(g\,\mathrm{sign}(v) - 1)^2$ has $|\partial_g F|^2 = 2F$; for $m \ge 2$, $\ell(\hat y, y) = \hat y^2$ with full-column-rank features gives $F = g^2 u^\top M u$, $M \succ 0$, PL with $\mu = 2\lambda_{\min}(M)$.)* Trap: taking $c \to 0$ (gives nothing); forgetting the scaling of the gradient and "proving" PL fails by an example only.

**💡 Useful tricks:** PL ⇒ $\dot G\leq-2\mu G$ ⇒ integrating factor $e^{2\mu t}$ (no division); $\frac{d}{dt}\sqrt G\leq-\sqrt{\mu/2}\,\|\dot w\|$ turns the rate into a finite path length, hence convergence of the iterates and attainment of the infimum; least squares with full row rank is PL with $\lambda_{\min}(XX^\top)$ without being strongly convex; scale invariance ⇒ $\nabla q(u)\perp u$ and $\nabla q(cu)=\nabla q(u)/c$ ⇒ GF conserves $\|v\|$, GD inflates it by Pythagoras, and no global PL in $v$ is possible.

**⚠️ Watch out:** (1) use $XX^\top$, not $X^\top X$; (2) don't divide by the gap without the $G=0$ case, and keep the factor $2$ in $e^{-2\mu t}$; (3a) bound $\int\|\dot w\|$, not $\int\|\dot w\|^2$ — use the square-root trick; (3b) the infimum's attainment is a *conclusion*, not an assumption; (4) the conserved quantity is $\|v\|$ only — not $g$, not $\|(v,g)\|$; (5b) send $c\to\infty$, using $\nabla q(cu)=\nabla q(u)/c$.

## Q3 — Generalization of quantized and approximately sparse linear predictors (30)

**Hint:** Count by encoding: a sparse quantized vector is a short list of (position, non-zero value) pairs, padded with blanks. For the uniform bound, fix a single hypothesis first, then pay for the whole class. To cover all $(k, p)$ at once, give each pair its own share of the confidence budget, proportional to a "prior" weight. For a real, dense, nearly sparse $w$, find a member of some $\mathcal{H}_{k,p}$ that is uniformly close to $h_w$ on $\mathcal{X}$ — what does Hölder's inequality say about $|w^\top x - \bar w^\top x|$ when $\|x\|_\infty \le 1$?

**Full solution:**

**1. (5)** $|G_p| = 2^{p+1} + 1$, so $G_p \setminus \{0\}$ has $2^{p+1}$ elements (1 pt). Encode each $w \in G_p^d$ with $\|w\|_0 = j \le k$ by the length-$k$ sequence whose first $j$ entries are the pairs $(i, w_i)$ over its non-zero coordinates in increasing order of $i$, followed by $k - j$ copies of a blank symbol $\varnothing$ (2 pts). Each entry lies in an alphabet of size $d \cdot 2^{p+1} + 1$, and the encoding is injective ($w$ is recovered from its list), so the number of such $w$ is at most $(1 + d2^{p+1})^k$ (1 pt). Since $w \mapsto h_w$ maps this set **onto** $\mathcal{H}_{k,p}$, $|\mathcal{H}_{k,p}| \le (1 + d2^{p+1})^k$ (1 pt; different $w$ may give the same $h$, which only helps). Exact count, not required:

$$\sum_{j=0}^k \binom dj 2^{(p+1)j} \le (1 + d2^{p+1})^k .$$

Deduct 1 for forgetting the zero value / blank slot (which would give $(d2^{p+1})^k$ and miss sparsity $< k$), or for counting $d^k$ ordered positions without justifying the inequality.

**2. (7)** Write $\mathcal{H} := \mathcal{H}_{k,p}$. *Fixed $h$ (3 pts):* $A_n := \ell(h(x_n), y_n)$ are i.i.d. in $[0,1]$ with $\mathbb{E}A_1 = L_D(h)$ and $\frac1N\sum_n A_n = L_S(h)$, so Hoeffding gives $P(|L_D(h) - L_S(h)| \ge \epsilon) \le 2e^{-2N\epsilon^2}$. This requires $h$ fixed independently of $S$ — fine, each member of the finite class is fixed in advance.
*Union bound (2 pts):*

$$P\big(\exists h \in \mathcal{H}: L_D(h) - L_S(h) \ge \epsilon\big) \le 2|\mathcal{H}|\, e^{-2N\epsilon^2} .$$

*Solve (2 pts):* setting the right side to $\delta$ gives $\epsilon = \sqrt{\ln(2|\mathcal{H}|/\delta)/(2N)}$; with probability $\ge 1 - \delta$ every $h \in \mathcal{H}$ has gap $< \epsilon$, and by part 1, $\ln(2|\mathcal{H}|/\delta) \le k\ln(1 + d2^{p+1}) + \ln(2/\delta)$. (This is Lecture 6, Prop 1 — but here it must be re-derived.) Deduct 3 for applying Hoeffding to the learned hypothesis directly; deduct 1 for a constant slip ($e^{-N\epsilon^2}$, missing factor 2).

**3. (8)**
**a. (4)** For each $(k, p)$ apply the part-2 argument to $\mathcal{H}_{k,p}$ at confidence $\delta_{k,p} := \pi(k,p)\,\delta \in (0, 1)$ (2 pts): the failure event $E_{k,p}$ has probability $\le \delta_{k,p}$, where on $E_{k,p}^c$ every $h \in \mathcal{H}_{k,p}$ has gap $\le \sqrt{(\ln|\mathcal{H}_{k,p}| + \ln(2/\delta_{k,p}))/(2N)}$. The **countable** union bound (2 pts):

$$P\Big(\bigcup_{k,p} E_{k,p}\Big) \le \sum_{k,p} \pi(k,p)\,\delta \le \delta .$$

On the complement all bounds hold at once, and $\ln(2/\delta_{k,p}) = \ln(2/(\pi(k,p)\delta))$. (Same weighted union as Lecture 6's $\delta_k = \tfrac{6}{\pi^2k^2}\delta$; a $p$-uniform split is impossible since $p$ ranges over an infinite set.)

**b. (4)** *Choice (1 pt):* $\pi(k,p) := 2^{-(k+1)}\,2^{-(p+1)}$, with $\sum_{k=0}^d\sum_{p\ge0}\pi(k,p) \le \big(\sum_{k\ge0}2^{-(k+1)}\big)\big(\sum_{p\ge0}2^{-(p+1)}\big) = 1$. With part 1,

$$\boxed{\;\Delta(N,\delta,k,p) := \sqrt{\frac{k\ln\!\big(1 + d\,2^{p+1}\big) + (k+p+2)\ln 2 + \ln(2/\delta)}{2N}}\;}$$

*Validity (1 pt):* part (a), as $\ln|\mathcal{H}_{k,p}| \le k\ln(1+d2^{p+1})$ and $\ln(1/\pi(k,p)) = (k+p+2)\ln 2$. *Strict monotonicity (1 pt):* the numerator is a sum of terms non-decreasing in $k$ and in $p$, plus $(k+p+2)\ln 2$, strictly increasing in each. *Limit (1 pt):* for fixed $(\delta,k,p)$ the numerator is a constant, so $\Delta = O(1/\sqrt N) \to 0$. Alternative weights (e.g. $\frac{6}{\pi^2(p+1)^2}\cdot 2^{-(k+1)}$) earn full credit if all three properties are proved. Trap: keeping only $\ln|\mathcal{H}_{k,p}|$ in the bound and dropping the $\ln(1/\pi)$ price; weights that do not sum to $\le 1$ over the infinite $p$-range.

**4. (10)**
**a. (2)** The part-3 bound applies only to hypotheses **in** some $\mathcal{H}_{k,p}$. A real-valued $w_S$ generally has non-dyadic entries, so $h_{w_S}$ lies in no $\mathcal{H}_{k,p}$ and nothing is guaranteed; and even after rounding, $\|w_S\|_0 = d$ forces $k = d$, where $\Delta \ge \sqrt{d\ln(1+2d)/(2N)}$ is vacuous ($>1$) when $d \gg N$ — the bound ignores that $w_S$ is *nearly* sparse (same issue as $index(h) \ll \operatorname{rank}(W_h)$ in a\_2024 Q3(4)).

**b. (5)** Work on the event of part 3(b) (probability $\ge 1 - \delta$); everything below is deterministic on it, so it holds for all $w, k, p$ simultaneously.
*Construction (2 pts):* given $w \in [-1,1]^d$, $k$, $p$, let $T$ be a set of $k$ largest-magnitude coordinates of $w$ (so $\sum_{i \notin T}|w_i| = \sigma_k(w)$: the best $k$-sparse $\ell_1$ approximation keeps the $k$ largest entries), and let $\bar w_i :=$ a nearest point of $G_p$ to $w_i$ for $i \in T$, $\bar w_i := 0$ otherwise. Since $G_p$ has spacing $2^{-p}$ and covers $[-1,1]$, $|\bar w_i - w_i| \le 2^{-(p+1)}$ on $T$. So $\bar w \in G_p^d$, $\|\bar w\|_0 \le k$, i.e. $h_{\bar w} \in \mathcal{H}_{k,p}$, and

$$\|w - \bar w\|_1 \le \sigma_k(w) + k\,2^{-(p+1)} =: \epsilon_{k,p}(w) .$$

*Uniform closeness (1 pt):* for $x \in \mathcal{X}$, Hölder gives $|h_w(x) - h_{\bar w}(x)| = |(w - \bar w)^\top x| \le \|w - \bar w\|_1\|x\|_\infty \le \epsilon_{k,p}(w)$.
*Lipschitz transfer (2 pts):* $|\ell(h_w(x), y) - \ell(h_{\bar w}(x), y)| \le \rho\,\epsilon_{k,p}(w)$ pointwise, hence $|L_D(h_w) - L_D(h_{\bar w})| \le \rho\epsilon_{k,p}(w)$ and $|L_S(h_w) - L_S(h_{\bar w})| \le \rho\epsilon_{k,p}(w)$, and

$$\begin{aligned}
L_D(h_w) - L_S(h_w) &\le \big(L_D(h_{\bar w}) - L_S(h_{\bar w})\big) + 2\rho\,\epsilon_{k,p}(w) \\
&\le \Delta(N,\delta,k,p) + 2\rho\big(\sigma_k(w) + k\,2^{-(p+1)}\big).
\end{aligned}$$

This is Lecture 6's compression argument (Prop 2 there), with the compressed class indexed by $(k, p)$. Deduct 2 for a transfer cost of $\rho\epsilon$ instead of $2\rho\epsilon$ (both $L_D$ and $L_S$ move); deduct 1 for rounding with error $2^{-p}$ (valid but then the stated constant is not obtained — accept if the student's final constant is consistent).

**c. (3)** *Instantiation (1 pt):* $\sigma_s(w_S) \le \eta$ by assumption (the given set of $s$ coordinates is one admissible support), and $s/\eta \ge 1$ gives $p = \lceil\log_2(s/\eta)\rceil \in \mathbb{N}_0$ with $2^{-p} \le \eta/s$, so $s\,2^{-(p+1)} \le \eta/2$ and the extra term is at most $2\rho(\eta + \eta/2) = 3\rho\eta$.
*Data-dependent choice (1 pt):* part (b) holds on **one** event simultaneously for all $(w, k, p)$ — the union over $(k,p)$ was paid for in part 3 — so $(s, p)$ and $w = w_S$ may be read off the trained weights; no new union bound is needed.
*Logarithmic in $d$ (1 pt):* $p < \log_2(s/\eta) + 1$ gives $2^{p+1} < 4s/\eta$, so

$$\Delta(N,\delta,s,p) \le \sqrt{\frac{s\ln\!\big(1 + 4ds/\eta\big) + (s + \log_2(s/\eta) + 3)\ln 2 + \ln(2/\delta)}{2N}} ,$$

of order $\sqrt{s\log(ds/\eta)/N}$: meaningful when $s\log d \ll N$ even if $d \gg N$ (e.g. $d = 10^6$, $N = 10^5$, $s = 20$, $\eta = 0.01$, $\delta = 0.01$ gives $\approx 0.049$, versus $\approx 8.7$ for $k = d$ even with $p = 0$). This is how an implicit bias toward (approximately) sparse solutions can be turned into a guarantee.
Trap: choosing $p$ after seeing the data *and* claiming a fresh $\delta$; forgetting $p \ge 0$ needs $\eta \le s$.

**💡 Useful tricks:** encode a $k$-sparse quantized vector as $k$ slots from an alphabet of size $1+d2^{p+1}$; Hoeffding per fixed $h$ + union bound, solved for $\epsilon$; a prior $\pi(k,p)=2^{-(k+1)}2^{-(p+1)}$ over a 2-D index costs $(k+p+2)\ln 2$ and buys simultaneity, hence data-dependent $(k,p)$; for approximate sparsity: keep the top $k$ entries, round them (error $\le 2^{-(p+1)}$ each), Hölder with $\|x\|_\infty\le1$, then the $2\rho\epsilon$ Lipschitz transfer.

**⚠️ Watch out:** (1) include the blank slot so sparsity $<k$ is counted; (2) Hoeffding only for fixed hypotheses — never on $h_{w_S}$; (3) the precision index is unbounded, so the weights must be summable — and keep the $\ln(1/\pi)$ term that makes $\Delta$ strictly increasing; (4) the transfer costs $2\rho\epsilon$ (on $L_D$ and $L_S$), the rounding error is $2^{-(p+1)}$ per kept coordinate, and $(s,p)$ may be chosen after training only because the bound is simultaneous over $(k,p)$.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1b using $\lambda>1$ or a single fixed $B$; Q1.2 ignoring
  linearity points on a hyperplane; Q1.3a counting $B$ lines when weights are parallel;
  Q1.3b comparing only adjacent sectors or using a segment through the origin; Q1.4b
  counting $B+2$ pieces (bias neuron or $w_i=0$ neurons as breakpoints); Q1.4c error
  checked only at midpoints; Q2.1 $\lambda_{\min}(X^\top X)$ instead of $XX^\top$; Q2.2
  dividing by a gap that may vanish, or rate $e^{-\mu t}$; Q2.3a bounding
  $\int\|\dot w\|^2$ instead of the length; Q2.3b assuming the infimum is attained; Q2.4
  claiming $g$ or $\|(v,g)\|$ conserved; Q2.5b letting $c\to0$; Q3.1 no blank slot;
  Q3.2 Hoeffding on the learned predictor; Q3.3 non-summable weights over $p$; Q3.4
  transfer cost $\rho\epsilon$ instead of $2\rho\epsilon$, or a fresh $\delta$ for the
  data-chosen $(s,p)$.
