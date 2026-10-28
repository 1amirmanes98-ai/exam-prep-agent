# Mock Exam 7 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_07.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-10-28 (Q1: chain lemma, i.e. at most $k+1$ codes and a monotone
switched set, on 3000 random integer-tied sign layers; the dense construction realizes
$x \bmod 2$ exactly for $n = 2, \dots, 10$; the shallow witness of width $2^{n-1}-1$ is
exact, and an exhaustive search over all threshold placements shows width $2^{n-1}-2$ is
infeasible for $n = 3, 4$, so the lower bound is tight; Q2: RK4 integration of the flow, with
drift of $\lambda^2 - k c^2$ below $3\cdot10^{-11}$, the loss below the 4b/4c envelopes on seven
initializations, the loss pinned at $\ge y^2/2$ in the trap regime and frozen at
$\lambda_0 = 0$; Q3: GD with $\eta = 1.9N/\mu_{\max}$ converges to $X^\top K^{-1}y$ to
$10^{-15}$ and diverges for $\eta = 2.1N/\mu_{\max}$, Monte-Carlo Rademacher
$1.719 \le 2.077$ (the bound), Basel weights sum to $1$, and $L_D(h_{w^*}) = 1 - N/(2d)$
exactly in the orthonormal example).

## Q1 — Sign networks on a line: monotone codes, the last bit, and skip connections (40)

**Hint:** Look at one neuron on its own. As $x$ increases, how many times can
$\sigma(w_i x + b_i)$ change its value, and does that hold whatever the sign of $w_i$? If
every neuron can switch at most once, the set of neurons that have already switched can only
grow. On the integers $0, 1, \dots, 2^n - 1$ the last bit changes at every step, so count
how many of those steps a network with few code changes can follow. For the deep part, think
of how long division by powers of $2$ peels off bits one at a time.

**Full solution:**

**1. (10)**
**a. (5)** *Limits (1 pt):* if $w_i > 0$ then $w_i x + b_i \to -\infty$, so
$\varphi_i^- = 0$; if $w_i < 0$ then $\varphi_i^- = 1$; if $w_i = 0$ the neuron is the
constant $\sigma(b_i)$ and $\varphi_i^- = \sigma(b_i)$.
*Monotonicity (3 pts):* let $c_i := -b_i / w_i$ when $w_i \ne 0$. Then

$$i \in S(x) \iff \begin{cases} x \ge c_i, & w_i > 0 \\ x > c_i, & w_i < 0 \\
\text{never}, & w_i = 0 \end{cases}$$

(for $w_i < 0$: $\sigma(w_i x + b_i) = 1 \iff x \le c_i$, so the value differs from
$\varphi_i^- = 1$ exactly when $x > c_i$). Each condition is upward closed in $x$, so
$x \le x'$ and $i \in S(x)$ give $i \in S(x')$.
*Determination (1 pt):* $\varphi_{w,b}(x)_i = \varphi_i^-$ if $i \notin S(x)$ and
$1 - \varphi_i^-$ if $i \in S(x)$. So the code is a fixed function of $S(x)$ (it is
$\varphi^-$ with the coordinates in $S(x)$ flipped).
Deduct 2 if only $w_i > 0$ is treated (c\_2024 assumed $w_i \ge 0$; here no sign restriction
is made, and the right-closed step for $w_i < 0$ is exactly the case to handle). Deduct 1 if
$w_i = 0$ is forgotten.

**b. (3)** *Chain (2 pts):* by (a), $\{S(x) : x \in \mathbb{R}\}$ is totally ordered by
inclusion. In a chain of subsets of $[k]$, distinct members have distinct sizes (if
$A \subsetneq A'$ then $|A| < |A'|$), and sizes lie in $\{0, \dots, k\}$, so there are at most
$k + 1$ members. Since the code is a function of $S(x)$, there are at most $k+1$ codes. Along
$x_0 < \dots < x_M$, each code change $\varphi(x_j) \ne \varphi(x_{j+1})$ forces
$S(x_j) \subsetneq S(x_{j+1})$, so $|S|$ grows by at least $1$. Since $|S| \in \{0,\dots,k\}$,
there are at most $k$ changes.
*Attained (1 pt):* $w_i = 1$, $b_i = -i$. At $x = 0, 1, \dots, k$ the code is
$(1, \dots, 1, 0, \dots, 0)$ with exactly $x$ ones, which gives $k+1$ distinct codes.

**c. (2)** $|\{0,1\}^k| = 2^k$ and at most $k+1$ codes are output, so at least
$2^k - k - 1 \ge 1$ codes (for $k \ge 2$) are unreachable, for every $w, b$. *(Contrast with
b\_2023 Q1(4): there the layer was bias-free on $\mathbb{R}^d$ and the argument went through
VC duality. Here biases are allowed but the input is a scalar, and the chain argument gives
a much stronger count: $k+1$ reachable codes out of $2^k$.)*

**2. (10)** Write $h(x) = \gamma + \alpha x + v^\top \varphi_{w,b}(x)$ with $k = B$.
*Equal codes force slope $\alpha$ (3 pts):* if $\varphi(j) = \varphi(j+1)$ then

$$h(j+1) - h(j) = \alpha .$$

*Target increments (2 pts):* $\pi_n(j+1) - \pi_n(j) = +1$ for $j$ even and $-1$ for $j$ odd.
Among $j \in \{0, \dots, 2^n - 2\}$ there are $2^{n-1}$ even and $2^{n-1} - 1$ odd indices.
*Counting (3 pts):* suppose $h$ realizes $\pi_n$. If $\alpha \ne 1$, every even $j$ must be a
code change, which gives at least $2^{n-1}$ changes. If $\alpha = 1$ (so $\alpha \ne -1$),
every odd $j$ must be a code change, which gives at least $2^{n-1} - 1$ changes. By 1b the
code changes at most $B$ times along $0 < 1 < \dots < 2^n - 1$, so

$$\boxed{B \ge 2^{n-1} - 1}$$

*Tightness (2 pts):* take $\alpha = 1$, $\gamma = 0$ and

$$h(x) = x - 2 \sum_{m=1}^{2^{n-1}-1} \sigma(x - 2m) .$$

For $x \in X_n$,

$$\sum_m \sigma(x - 2m) = \#\{m \ge 1 : 2m \le x\} = \lfloor x/2 \rfloor$$

(which is at most $2^{n-1} - 1$, so no term is missing). Hence
$h(x) = x - 2\lfloor x/2 \rfloor = x \bmod 2$.
Common traps: forgetting the skip term $\alpha x$. Without it the bound is $2^n - 1$ (part 5
with $F$ affine), and with it the answer is $2^{n-1} - 1$, not $2^n - 1$. Another trap is
claiming "at most $B+1$ pieces" by quoting c\_2024 Q1, which assumed $w_i \ge 0$ and had no
$\alpha x$. Here the count has to go through 1b.

**3. (10)** *Weights (4 pts):* for $l = 1, \dots, n-1$ set $a_l = 1$,
$u_{l,j} = -2^{n-j}$ ($j < l$) and $c_l = -2^{n-l}$, i.e.

$$z_l(x) = \sigma\Big( x - \sum_{j=1}^{l-1} 2^{n-j} z_j(x) - 2^{n-l} \Big),$$

and output $h(x) = x - \sum_{l=1}^{n-1} 2^{n-l} z_l(x)$ ($\alpha = 1$, $\gamma = 0$,
$\beta_l = -2^{n-l}$).
*Invariant (4 pts):* define $\rho_l(x) := x - \sum_{j=1}^{l} 2^{n-j} z_j(x)$. We claim that for
$x \in X_n$ and $l = 0, \dots, n-1$, $\rho_l$ is an integer with
$0 \le \rho_l < 2^{n-l}$ and $\rho_l \equiv x \pmod 2$.
Base: $\rho_0 = x \in [0, 2^n)$.
Step: by definition

$$z_{l+1} = \sigma(\rho_l - 2^{n-l-1}) = \mathbb{1}[\rho_l \ge 2^{n-l-1}]$$

and $\rho_{l+1} = \rho_l - 2^{n-l-1} z_{l+1}$. If $\rho_l < 2^{n-l-1}$ nothing is subtracted.
Otherwise $\rho_{l+1} = \rho_l - 2^{n-l-1} \in [0, 2^{n-l-1})$. In both cases
$\rho_{l+1} \in [0, 2^{n-(l+1)})$, and parity is kept because $2^{n-l-1}$ is even for
$l \le n-2$.
*Conclusion (2 pts):* $h(x) = \rho_{n-1}(x)$ is an integer in $\{0, 1\}$ with the parity of
$x$, so $h(x) = x \bmod 2$. Thus $\pi_n \in \mathcal{D}_{n-1}$ ($z_l$ is bit $n-l$ of $x$).
Deduct 3 if the construction is given without a proof that it works (an invariant or an
induction is required). Deduct 2 if the neurons do not read $x$ (that is impossible by part 5).
*(Remark: the weights are as large as $2^{n-1}$. Size is measured by neurons, as in class;
the exam does not ask about weight magnitude.)*

**4. (5)** *Definition (3 pts; Lecture 1, Def 2 + "exponential" remark):*
$\mathcal{D}_{\bar B}$ is exponentially expressively efficient w.r.t. $\mathcal{H}_B$ (on
$X_n$) if
(1) for every $B$ there is $\bar B \in O(B)$ with $\mathcal{H}_B \subseteq \mathcal{D}_{\bar B}$;
and (2) there exist $\bar B$ polynomial in $n$ and $\bar h \in \mathcal{D}_{\bar B}$ such
that $\bar h \in \mathcal{H}_B$ only if $B$ is exponential in $n$.
*Proof (2 pts):* (1) with $\bar B = B$: put $a_l = w_l$, $c_l = b_l$, $u_{l,j} = 0$ and
$\beta = v$, so each dense neuron ignores the earlier ones. (2) $\bar h := $ the network of
part 3 is in $\mathcal{D}_{n-1}$, so $\bar B = n - 1$, which is linear in $n$. Agreeing with
$\pi_n$ on $X_n$, it lies in $\mathcal{H}_B$ only if $B \ge 2^{n-1} - 1$ by part 2.
Deduct 2 if condition (1) is omitted. As in b\_2023 and b\_2024 it is graded.

**5. (5)** *(3 pts)* $\pi_n$ changes value at all $2^n - 1$ consecutive pairs of $X_n$.
$F \circ \varphi_{w,b}$ can change value only where the code changes, which happens at most
$k$ times by 1b. Hence $k \ge 2^n - 1$, and this holds for every depth and width after the
first layer, because they act only through $F$.
*(2 pts)* The skip connections did it: every neuron of $\mathcal{D}_L$ re-reads the real
input $x$, so it can threshold a new affine function of $x$ shifted by the earlier bits. A
plain sign stack only sees the at most $k+1$ codes of its first layer (cf. b\_2021 Q1: in
1-D, depth without such access adds nothing).

**💡 Useful tricks:** A sign neuron on a line switches at most once, whatever the sign of $w_i$, so the switched set $S(x)$ is monotone. A chain of subsets of $[k]$ has at most $k+1$ members, which gives at most $k+1$ codes and at most $k$ changes on any increasing sequence. Where the code does not change, the shallow output moves by exactly $\alpha$, so count the forced changes. Peel off bits with dense skip connections and prove it with the remainder invariant $0 \le \rho_l < 2^{n-l}$.

**⚠️ Watch out:** (1) handle $w_i < 0$ (the step is right-closed) and $w_i = 0$, since no sign restriction is given here. (2) The linear skip $\alpha x$ halves the bound to $2^{n-1}-1$; prove tightness with an explicit witness. (3) Prove the construction works with an invariant or induction; a weight list alone is not enough. (4) State and prove both conditions of the definition. (5) Arbitrary $F$ after the first layer cannot beat $k \ge 2^n - 1$; the input re-read is what matters.

## Q2 — Learning a $k$-step memory with a scalar linear RNN (35)

**Hint:** Unroll the recursion once and the loss becomes a function of the single product
$c\lambda^k$. Weight sharing makes $\lambda$ behave like $k$ tied layers, so ask how
$\frac{d}{dt}\lambda^2$ and $\frac{d}{dt}c^2$ compare. Then look for a line in parameter
space that the flow cannot leave (or enter). For convergence, write an ODE for the residual
itself and ask which way $\lambda$ and $c$ move while the sign of the residual is frozen.

**Full solution:**

**1. (6)** *Closed form (2 pts):* by induction,
$s_t = \sum_{\tau=1}^{t} \lambda^{t-\tau} x_\tau$. The base is $s_1 = x_1$. The step is
$s_t = \lambda \sum_{\tau < t} \lambda^{t-1-\tau} x_\tau + x_t$. For $x = e_{L-k}$
(a valid position since $1 \le L-k \le L-2$), $s_L = \lambda^{k}$, so
$\ell = \tfrac12 (c\lambda^k - y)^2$ (1 pt).
*Gradients (3 pts):* $\partial_\lambda \ell = r \cdot k c \lambda^{k-1}$ and
$\partial_c \ell = r \cdot \lambda^k$; negate them to get the flow.
Deduct 1 for a missing factor $k$ (weight sharing: $\lambda$ appears $k$ times).

**2. (7)** *Critical line (3 pts):* at $\lambda = 0$, $\lambda^{k-1} = 0$ (as $k \ge 2$) and
$\lambda^k = 0$, so both partials vanish, and $\ell(0, c) = \tfrac12 y^2$.
*Non-convexity (2 pts):* $\ell(1, y) = 0 = \min \ell$ (as $\ell \ge 0$). A differentiable
convex function has every critical point a global minimum, but $(0, c)$ is critical with
$\ell = y^2/2 > 0$, so $\ell$ is not convex.
*Stagnation (2 pts):* $(\lambda, c) \equiv (0, c_0)$ solves the flow (both right-hand sides
vanish), so by uniqueness it is *the* solution and $\ell \equiv y^2/2$.
Trap: exhibiting the minimum but not the critical point (or vice versa). Both are needed.

**3. (8)** *Conservation (3 pts):*

$$\frac{d}{dt}\lambda^2 = 2\lambda\dot\lambda = -2k\, c\lambda^k r, \qquad
\frac{d}{dt}(k c^2) = 2kc\,\dot c = -2k\, c\lambda^k r ,$$

so $\frac{d}{dt}(\lambda^2 - kc^2) = 0$. (This is balancedness with the factor $k$ coming
from the tied weights. The untied depth-$(k+1)$ version gives $w_i^2 - w_j^2$, as in c\_2024
Q2.)
*Sign of $\lambda$ (2 pts):* if $\lambda(t_1) = 0$ for some $t_1$, the constant
$(0, c(t_1))$ is a solution through the same point (part 2). By uniqueness backward in
time, $\lambda(0) = 0$. So $\lambda_0 \ne 0$ implies $\lambda(t) \ne 0$ for all $t$, and by
continuity (IVT) $\lambda(t)$ keeps its sign.
*Trap (3 pts):* let $D := \lambda_0^2 - kc_0^2 < 0$. Then

$$k\, c(t)^2 = \lambda(t)^2 - D \ \ge\ -D > 0$$

so $c$ never vanishes and, by IVT, $c(t) < 0$ for all $t$. With $\lambda(t) > 0$ we get
$c\lambda^k < 0$, so $r < -y$ and $\ell = r^2/2 > y^2/2$.
*(Remark: if instead $D > 0$, $c$ may cross $0$ at $\lambda = \sqrt D$ and the flow
converges, as checked numerically. For $D = 0$ the trajectory tends to the origin.)*
Traps: claiming $c^2$ or $\lambda^2$ is conserved; skipping the uniqueness argument for
"$\lambda$ cannot cross $0$" (it is not just "the gradient is small near $0$").

**4. (10)**
**a. (2)** By the chain rule,

$$\dot r = \lambda^k \dot c + k c \lambda^{k-1} \dot\lambda
= -\lambda^{2k} r - k^2 c^2 \lambda^{2k-2} r = -P\, r .$$

Then $\frac{d}{dt}\big( r\, e^{\int_0^t P} \big) = 0$, so
$r(t) = r(0) e^{-\int_0^t P}$, which never changes sign (and $r \equiv 0$ if $r(0) = 0$).

**b. (5)** Here $r(0) < 0$, so $r(t) < 0$ for all $t$ (by a). By part 3, $\lambda(t) > 0$.
Then $\dot c = -\lambda^k r > 0$, so $c(t) \ge c_0 > 0$, and
$\dot\lambda = -k c \lambda^{k-1} r > 0$, so $\lambda(t) \ge \lambda_0$ (2 pts). Hence
$P(t) \ge P_0$ (both factors are increasing in $\lambda, c > 0$) (1 pt), and

$$\ell(t) = \tfrac12 r(t)^2 = \ell(0)\, e^{-2\int_0^t P} \le \ell(0)\, e^{-2P_0 t}$$

(2 pts). Deduct 2 if positivity of $\lambda, c$ is used without justification (that is where
part 3 or a continuity argument enters).

**c. (3)** Now $r > 0$ throughout, $\dot c = -\lambda^k r < 0$, so $c(t) \le c_0$. Also
$c\lambda^k = y + r > y > 0$ with $\lambda > 0$ gives $c > 0$ and
$\lambda^k > y/c \ge y/c_0$. Then $P \ge \lambda^{2k} \ge y^2/c_0^2$ (drop the
non-negative $k^2c^2\lambda^{2k-2}$), and part a gives the bound.
Trap: trying to reuse 4b's monotonicity. Here $\lambda, c$ *decrease*, and the lower bound
on $P$ comes from $c\lambda^k \ge y$ instead.

**5. (4)** $r_0 = \varepsilon^{k+1} - y \in (-y, 0)$ because $\varepsilon^{k+1} < 1 \le y$,
so 4b applies. Then

$$\|\nabla \ell(\varepsilon, \varepsilon)\| = |r_0|\,\varepsilon^k \sqrt{k^2 + 1}
\le (k+1)\, y\, \varepsilon^k$$

and

$$2P_0 = 2\varepsilon^{2k-2}(\varepsilon^2 + k^2 \varepsilon^2) = 2(1 + k^2)\varepsilon^{2k}$$

(3 pts). *Interpretation (1 pt):* both are exponentially small in the lag $k$. With small
recurrent weights the gradient signal from an impulse $k$ steps back decays like
$\varepsilon^k$ (vanishing gradients), so long-range memory is learned slowly. This is
consistent with the stagnation at $\lambda_0 = 0$ in part 2, which is the limit
$\varepsilon \to 0$.

**💡 Useful tricks:** Unroll to $s_L = \sum\lambda^{L-t}x_t$, so a one-hot input picks out the single power $\lambda^k$. Weight sharing gives the conservation law $\lambda^2 - kc^2$ (note the factor $k$). The line $\{\lambda = 0\}$ is invariant, so by uniqueness the sign of $\lambda$ is frozen. The residual obeys a linear ODE $\dot r = -Pr$, so its sign is frozen too. Lower-bound $P$ via monotonicity (under-fit) or via $c\lambda^k \ge y$ (over-fit) to get the exponential rates.

**⚠️ Watch out:** (1) don't drop the factor $k$ in $\dot\lambda$. (2) Non-convexity needs a critical point that is *not* a global minimum, so exhibit both. (3) Conserved is $\lambda^2 - kc^2$, not $\lambda^2$ or $c^2$; "$\lambda$ cannot cross $0$" needs backward uniqueness. (4) Justify positivity before lower-bounding $P$, and in the over-fit case the parameters *decrease*. (5) The rate $\propto\varepsilon^{2k}$ is exponentially small in the memory length: this is the vanishing-gradient phenomenon.

## Q3 — Min-norm interpolation and a norm-adaptive bound with doubling radii (30)

**Hint:** GD's updates are combinations of the rows of $X$, so where do the iterates live?
Write the residual recursion and ask what the step-size condition says about the eigenvalues
of the iteration matrix. For the Rademacher complexity, the supremum of a linear functional
over a ball has a closed form, and the expected norm of a random signed sum is easier to
handle once squared. For the adaptive bound, every $w$ should fall into some ball of radius
$2^k$ that is not much larger than $\|w\|$, and the weights $\delta_k$ have to sum to at
most $\delta$.

**Full solution:**

**1. (8)** *Span (2 pts):* $\nabla F(w) = \frac{1}{N} X^\top (Xw - y)$, so by induction
$w_t = X^\top \alpha_t$ for some $\alpha_t \in \mathbb{R}^N$ (true at $w_0 = 0$).
*Residual recursion (3 pts):*

$$r_{t+1} = X w_{t+1} - y = r_t - \tfrac{\eta}{N} K r_t
= \big( I - \tfrac{\eta}{N} K \big) r_t$$

$K$ is symmetric with eigenvalues $\mu_i \in (0, \mu_{\max}]$, so the eigenvalues
$1 - \eta\mu_i/N$ of $I - \tfrac{\eta}{N}K$ lie in $(-1, 1)$ exactly because
$0 < \eta < 2N/\mu_{\max}$. Hence $\|r_t\| \le q^t \|r_0\| \to 0$ with
$q := \max_i |1 - \eta\mu_i/N| < 1$.
*Limit (1 pt):* $K\alpha_t = X X^\top \alpha_t = X w_t = y + r_t$, so
$\alpha_t = K^{-1}(y + r_t) \to K^{-1}y$, and $w_t \to X^\top K^{-1} y = w^*$.
*Min norm (2 pts):* $Xw^* = KK^{-1}y = y$. Any interpolator $w$ splits as
$w = w^* + u$ with $Xu = 0$, i.e. $u \perp \mathrm{rowspan}(X) \ni w^*$. Pythagoras gives
$\|w\|^2 = \|w^*\|^2 + \|u\|^2$, which is minimal iff $u = 0$, hence unique. Also

$$\|w^*\|^2 = y^\top K^{-1} X X^\top K^{-1} y = y^\top K^{-1} y$$

(the Lecture 7, Prop 1 / Lem 1 argument; here convergence is proved rather than assumed).
Deduct 3 if convergence is assumed. Deduct 1 if uniqueness is not argued.

**2. (8)** *Closed-form supremum (3 pts):* for $v \ne 0$, Cauchy–Schwarz gives
$\langle w, v\rangle \le r\|v\|$ on the ball, with equality at $w = rv/\|v\|$. So

$$R(\mathcal{H}_r \circ S) = \frac{1}{N}\mathbb{E}_\xi \sup_{\|w\| \le r}
\Big\langle w, \sum_n \xi_n x_n \Big\rangle = \frac{r}{N}\,
\mathbb{E}_\xi \Big\| \sum_n \xi_n x_n \Big\| .$$

*Jensen + independence (3 pts):*

$$\mathbb{E}\Big\|\sum_n \xi_n x_n\Big\| \le
\sqrt{\mathbb{E}\Big\|\sum_n \xi_n x_n\Big\|^2}
= \sqrt{\sum_{n,m} \mathbb{E}[\xi_n\xi_m] \langle x_n, x_m\rangle}
= \sqrt{\sum_n \|x_n\|^2} \le \sqrt N X_S ,$$

so $R \le r X_S/\sqrt N$.
*Deduction (2 pts):* $\ell(y, \cdot)$ is $1$-Lipschitz, since

$$\big|\min\{1,|a|\} - \min\{1,|b|\}\big| \le \big||a| - |b|\big| \le |a - b| .$$

$\mathcal{H}_r$ is fixed before
$S$, so Thm 1 together with contraction ($\rho = 1$) gives the display.
Trap: dropping the $1/N$ normalization (the course defines $R$ with $\frac{1}{N}$). Another
trap is applying Jensen in the wrong direction.

**3. (8)** *Union (3 pts):* each $\mathcal{H}_{2^k}$ is data-independent. Apply part 2 with
$(r, \delta) = (2^k, \delta_k)$. Since

$$\sum_{k \ge 0} \delta_k = \frac{6\delta}{\pi^2} \sum_{m \ge 1} \frac{1}{m^2} = \delta ,$$

the union bound makes all conclusions hold at once w.p. $\ge 1 - \delta$, and
$4/\delta_k = \frac{2\pi^2(k+1)^2}{3\delta}$.
*Choosing the shell (3 pts):* let $k(w) := 0$ if $\|w\| \le 1$ and
$k(w) := \lceil \log_2 \|w\| \rceil$ otherwise. Then $\|w\| \le 2^{k(w)}$, so
$h_w \in \mathcal{H}_{2^{k(w)}}$. Also $2^{k(w)} \le B(w)$ (trivial if $k = 0$; otherwise
$2^{\lceil \log_2\|w\|\rceil} < 2\|w\|$), so $k(w) + 1 \le \log_2(2B(w))$.
*Assembling (2 pts):* the shell-$k(w)$ bound has leading term $2 \cdot 2^{k(w)} X_S/\sqrt N$,
which is at most $2B(w)X_S/\sqrt N$, and

$$\begin{aligned}
2\ln\frac{4}{\delta_{k(w)}} &= 2\ln\frac{2\pi^2}{3\delta} + 4\ln(k(w)+1) \\
&\le 2\ln\frac{2\pi^2}{3\delta} + 4\ln\log_2(2B(w)) ,
\end{aligned}$$

which gives the claim for every $w$ simultaneously. *Instantiation:* $w^*$ interpolates, so
$L_S(h_{w^*}) = 0$ and

$$L_D(h_{w^*}) \le \frac{2B(w^*)X_S}{\sqrt N} + 4\sqrt{\frac{2\ln\frac{2\pi^2}{3\delta}
+ 4\ln\log_2(2B(w^*))}{N}} ,$$

with $\|w^*\| = \sqrt{y^\top K^{-1}y}$.
*Gain/loss (part of the 2 pts):* the confidence price grows only like
$\ln\log\|w\|$ instead of $\ln \|w\|$ (Prop 3's $k^2$ over integer radii). The cost is up to
a factor $2$ in the leading complexity term ($B(w) \le 2\|w\|$ vs. $\|w\| + 1$).
Traps: non-summable $\delta_k$ (e.g. uniform); picking the shell with $2^k < \|w\|$, so that
$h_w$ is not in the class; forgetting the $\|w\| \le 1$ edge case (gives $B = 1$).

**4. (6)**
**a. (3)** $w^\circ$ is an interpolator, so $\|w^*\| \le \|w^\circ\|$ by part 1 (2 pts).
The bound of part 3 is increasing in $B(w)$, so w.p. $\ge 1-\delta$

$$L_D(h_{w^*}) \le \frac{2\max\{1, 2\|w^\circ\|\} X_S}{\sqrt N} +
4\sqrt{\frac{2\ln\frac{2\pi^2}{3\delta} + 4\ln\log_2(2\max\{1,2\|w^\circ\|\})}{N}}$$

(1 pt). This involves no $d$: it is meaningful whenever $N \gg \|w^\circ\|^2 X_S^2$, even
with $d \gg N$. The implicit min-norm bias is what lets a norm-based bound apply to a
heavily over-parameterized model.

**b. (3)** $K = I_N$, so $w^* = X^\top y = \sum_n y_n e_{j_n}$ and $\|w^*\| = \sqrt N \ge 1$,
which gives $B(w^*) = 2\sqrt N$ and $X_S = 1$. The complexity term alone is
$2 \cdot 2\sqrt N/\sqrt N = 4 > 1$, so the bound is vacuous for every $N$ (1 pt).
For the given $D$: with probability $N/d$ the test point $e_j$ was seen, the prediction is
$y_n$ and the fresh label disagrees w.p. $\frac12$ (loss $\min\{1, 2\} = 1$). Otherwise the
prediction is $0$ and the loss is $\min\{1, 1\} = 1$. So

$$L_D(h_{w^*}) = \frac{N}{d}\cdot\frac12 + \Big(1 - \frac{N}{d}\Big) = 1 - \frac{N}{2d}$$

(1 pt). *Why deserved (1 pt):* the labels are pure noise and the interpolator generalizes at
(worse than) chance, so no valid bound could be small. The large learned norm
$\sqrt N$, i.e. the cost of memorizing random labels, is exactly what the bound reports
(Zhang et al.: same algorithm, random labels lead to a large norm and a loose bound).

**💡 Useful tricks:** Iterates stay in $\mathrm{rowspan}(X)$; the residual contracts by $I - \frac{\eta}{N}K$, whose spectrum lies in $(-1,1)$ iff $\eta < 2N/\mu_{\max}$; then $\alpha_t = K^{-1}(y + r_t)$. For the ball, $\sup\langle w, v\rangle = r\|v\|$, Jensen on the square, and the cross terms vanish. Doubling radii $2^k$ with Basel weights $\frac{6\delta}{\pi^2(k+1)^2}$ give a $\ln\log$ price; choose the shell with $\|w\| \le 2^k \le \max\{1, 2\|w\|\}$. Min-norm $\le$ teacher norm gives a dimension-free bound.

**⚠️ Watch out:** (1) prove convergence (step-size condition), don't assume it, and argue uniqueness via Pythagoras. (2) Keep the $\frac1N$ in $R$, apply Jensen as $\mathbb E\|\cdot\| \le \sqrt{\mathbb E\|\cdot\|^2}$, and check the clipped loss is $1$-Lipschitz. (3) $\delta_k$ must be summable, and the shell must *contain* $w$ (round $\log_2$ up); treat $\|w\| \le 1$ separately. (4b) vacuity is not a flaw here: with random labels $L_D = 1 - N/2d$, and the norm $\sqrt N$ honestly records memorization.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1 only $w_i > 0$ treated (right-closed steps and constant neurons
  missed); Q1.2 the skip term $\alpha x$ ignored, or c\_2024's $B+1$ pieces quoted outside its
  hypotheses; Q1.3 construction without an invariant proof; Q1.4 condition (1) omitted; Q1.5
  missing that $F$ is arbitrary; Q2.1 missing factor $k$; Q2.2 critical point without a
  strictly better point; Q2.3 claiming $\lambda^2$ conserved, or no uniqueness argument for
  the sign of $\lambda$; Q2.4 positivity of $\lambda, c$ assumed without proof, or over-fit
  case treated like the under-fit one; Q3.1 convergence assumed instead of proved; Q3.2
  missing $\frac1N$ or Jensen reversed; Q3.3 non-summable $\delta_k$ or a shell not containing
  $w$; Q3.4b calling the vacuity a weakness of the bound.
