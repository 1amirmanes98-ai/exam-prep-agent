# Mock Exam 7 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_07.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-10-28 (Q1: chain lemma, i.e. at most $k+1$ codes and a monotone
switched set, on 3000 random integer-tied sign layers; the dense construction realizes
$x \bmod 2$ exactly for $n = 2, \dots, 10$; the shallow witness of width $2^{n-1}-1$ is
exact, and an exhaustive search over all threshold placements shows width $2^{n-1}-2$ is
infeasible for $n = 3, 4$, so the lower bound is tight; Q2 (replaced 2026-11-01): sympy gives
zero gradient and Hessian of $\phi$ at the origin and the end-to-end formula at random balanced
points for every sign pattern, numpy matches the general gradient formula to finite differences
with $\frac{d}{dt}(W_{j+1}^\top W_{j+1} - W_j W_j^\top)$ below $5\cdot10^{-13}$, RK4 keeps the
drift of $a_j^2 - \|u\|^2$ below $4\cdot10^{-11}$, $\|w(t)\| \ge c$ and the loss below the 4b
envelope on $18$ margin starts, and the anti-aligned start keeps the loss above
$\frac12\|\beta\|^2$; Q3: GD with $\eta = 1.9N/\mu_{\max}$ converges to $X^\top K^{-1}y$ to
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

**1.a (5) Limits, the monotone switched set, and the code**

**What is asked.** Explain why each limit $\varphi_i^-$ exists, prove that $S(x)$ can only grow as $x$ grows, and prove that the code is a function of $S(x)$. The answer is three short proofs.

**Tool and why.** On a line, one sign neuron is a step function with at most one jump (cheat sheet §5, sign-activation nets are piecewise constant). We split into cases by the sign of $w_i$: the statement puts no sign restriction on the weights, and for $w_i<0$ the step points the other way.

**Definitions.** For $w_i\ne0$ let $c_i:=-b_i/w_i$, the point where the pre-activation $w_ix+b_i$ vanishes. We introduce it because the neuron can change its value only there.

**Solution.**

Step 1, the limit for $w_i>0$: as $x\to-\infty$ also $w_ix+b_i\to-\infty$, so the pre-activation is negative for all small enough $x$ and the neuron equals $0$ there. Hence $\varphi_i^-=0$.

Step 2, the limit for $w_i<0$: now $w_ix+b_i\to+\infty$, so the pre-activation is eventually non-negative and $\varphi_i^-=1$.

Step 3, the limit for $w_i=0$: the neuron is the constant $\sigma(b_i)$ for every $x$, so the limit exists and $\varphi_i^-=\sigma(b_i)$.

Step 4, when neuron $i$ has switched, case $w_i>0$: dividing $w_ix+b_i\ge0$ by the positive $w_i$ keeps the direction, so the neuron equals $1$ exactly when $x\ge c_i$. Since $\varphi_i^-=0$,

$$i\in S(x)\iff x\ge c_i.$$

Step 5, case $w_i<0$: dividing by the negative $w_i$ flips the direction, so the neuron equals $1$ exactly when $x\le c_i$. Since $\varphi_i^-=1$, the neuron differs from $\varphi_i^-$ exactly when it equals $0$:

$$i\in S(x)\iff x>c_i.$$

Step 6, case $w_i=0$: the neuron always equals $\varphi_i^-$, so $i\notin S(x)$ for every $x$.

Step 7, monotonicity: in the three cases the set of $x$ with $i\in S(x)$ is $[c_i,\infty)$, $(c_i,\infty)$ or empty. Each of these is upward closed, so if $x\le x'$ and $i\in S(x)$, then $i\in S(x')$. This holds for every $i$, so $S(x)\subseteq S(x')$.

Step 8, the code is a function of $S(x)$: each coordinate is $0$ or $1$. If $i\notin S(x)$ it equals $\varphi_i^-$ by definition of $S$; if $i\in S(x)$ it differs from $\varphi_i^-$, and the only other value is $1-\varphi_i^-$. So

$$\varphi_{w,b}(x)_i=\begin{cases}\varphi_i^-, & i\notin S(x)\\ 1-\varphi_i^-, & i\in S(x)\end{cases}$$

and the right-hand side depends on $x$ only through $S(x)$: the code is $\varphi^-$ with the coordinates in $S(x)$ flipped.

**In words.** Walking right along the line, each neuron can flip at most once away from its value at $-\infty$ and never flips back. So the set of flipped neurons only grows, and knowing which neurons have flipped is the same as knowing the code.

**Sanity check.** Take $k=1$, $w_1=-1$, $b_1=0$: the neuron is $1$ for $x\le0$ and $0$ for $x>0$. Then $\varphi_1^-=1$, $S(x)$ is empty for $x\le0$ and equals $\{1\}$ for $x>0$. It is monotone, and the step at $c_1=0$ is closed on the right, as in step 5.

**What to write in the exam.**

- Limits (1 pt): $\varphi_i^-$ is $0$ if $w_i>0$, $1$ if $w_i<0$, and $\sigma(b_i)$ if $w_i=0$.
- Switched sets (3 pts): $i\in S(x)$ iff $x\ge c_i$ (for $w_i>0$), iff $x>c_i$ (for $w_i<0$), never (for $w_i=0$); each set is upward closed, so $S(x)\subseteq S(x')$.
- Code (1 pt): coordinate $i$ is $\varphi_i^-$ off $S(x)$ and $1-\varphi_i^-$ on $S(x)$.

*Verified: numpy on 3000 random layers with $k\le6$ and integer weights in $\{-3,\dots,3\}$ (negative and zero included) checks on a fine grid that $S$ is monotone and that flipping $\varphi^-$ on $S(x)$ reproduces the code.*

**1.b (3) At most $k+1$ codes and at most $k$ changes**

**What is asked.** Prove that $\varphi_{w,b}$ takes at most $k+1$ values, that along an increasing sequence the code changes at most $k$ times, and give $w,b$ that attain $k+1$ codes. The answer is two proofs and an example.

**Tool and why.** Part 1.a turns the codes into a chain of sets, and a chain of subsets of $[k]$ is short because sizes strictly increase along it (cheat sheet §5).

**Definitions.** A *chain* is a family of sets in which any two members are comparable by inclusion. We introduce the word because, by 1.a, the family $\{S(x):x\in\mathbb{R}\}$ is a chain.

**Solution.**

Step 1, the sets $S(x)$ form a chain: for any $x,x'$ either $x\le x'$ or $x'\le x$, and 1.a gives the inclusion in that direction.

Step 2, distinct members have distinct sizes: if $A\ne A'$ in a chain, then one is strictly inside the other, say $A\subsetneq A'$, and then $|A|<|A'|$.

Step 3, counting the sets: sizes lie in $\{0,\dots,k\}$, which has $k+1$ values, and distinct members have distinct sizes, so the chain has at most $k+1$ members.

Step 4, counting the codes: by 1.a the code is a function of $S(x)$, so there are at most $k+1$ codes.

Step 5, one change raises $|S|$: let $x_0,x_1,\dots,x_M$ be increasing. If the code at $x_j$ differs from the code at $x_{j+1}$, then $S(x_j)\ne S(x_{j+1})$ (equal sets give equal codes). By 1.a, $S(x_j)\subseteq S(x_{j+1})$, so the inclusion is strict and $|S|$ grows by at least $1$.

Step 6, counting the changes: along the sequence $|S|$ never decreases and stays in $\{0,\dots,k\}$, so its total growth is at most $k$. Each change uses at least $1$ of it, so there are at most $k$ changes.

Step 7, a layer with $k+1$ codes: take $w_i=1$ and $b_i=-i$. Neuron $i$ is $\sigma(x-i)$, which is $1$ exactly when $x\ge i$. At $x=m$ with $m\in\{0,\dots,k\}$ neurons $1,\dots,m$ are on and the rest are off, so the code is $(1,\dots,1,0,\dots,0)$ with exactly $m$ ones. Different $m$ give different numbers of ones, so the $k+1$ codes are distinct.

**In words.** Each neuron contributes one possible switch point, so $k$ neurons cut the line into at most $k+1$ regions of constant code.

**Sanity check.** For $k=2$ the witness gives $(0,0)$, $(1,0)$ and $(1,1)$ at $x=0,1,2$, three codes. The fourth code $(0,1)$ is never reached, as part 1.c predicts.

**What to write in the exam.**

- Chain (2 pts): by 1.a the sets $S(x)$ form a chain; distinct members have distinct sizes in $\{0,\dots,k\}$, so at most $k+1$ sets and at most $k+1$ codes.
- Changes: a change forces $S(x_j)\subsetneq S(x_{j+1})$, so $|S|$ grows by at least $1$, hence at most $k$ changes.
- Witness (1 pt): $w_i=1$, $b_i=-i$; at $x=m$ the code has exactly $m$ ones.

*Verified: the same numpy run never finds more than $k+1$ codes or more than $k$ changes on a sorted grid, and the witness gives $k+1$ codes for $k=1,\dots,7$.*

**1.c (2) Unreachable outputs**

**What is asked.** Show that for every $k\ge2$ and every $w,b$ at least $2^k-k-1$ codes are never output. The answer is a counting argument.

**Tool and why.** Counting against the bound of 1.b (cheat sheet §5): the cube $\{0,1\}^k$ is exponentially large, while the reachable codes are at most linear in $k$.

**Definitions.** Let $\mathcal{R}:=\{\varphi_{w,b}(x):x\in\mathbb{R}\}$, the set of reachable codes.

**Solution.**

Step 1, all codes: $|\{0,1\}^k|=2^k$.

Step 2, reachable codes: $|\mathcal{R}|\le k+1$ by 1.b.

Step 3, unreachable codes: their number is $2^k-|\mathcal{R}|$, which is at least $2^k-k-1$, for every $w,b$.

Step 4, the count is positive: we show $2^k\ge k+2$ for $k\ge2$ by induction on $k$. For $k=2$ both sides equal $4$. If it holds for $k$, then $2^{k+1}\ge2k+4$, and $2k+4\ge k+3$. So at least one code is unreachable.

**In words.** On a line a sign layer can only walk along a single monotone path through the cube $\{0,1\}^k$, flipping one or more coordinates at a time and never flipping back, so it visits at most $k+1$ of the $2^k$ corners. (Contrast with b\_2023 Q1(4): there the layer was bias-free on $\mathbb{R}^d$ and the argument went through VC duality; here biases are allowed but the input is a scalar, and the chain argument gives a much stronger count.)

**Sanity check.** For $k=3$ there are $8$ codes and at most $4$ reachable ones, so at least $4$ are unreachable, and $2^3-3-1$ is indeed $4$. For $k=1$ the formula gives $0$, consistent with the exclusion of $k=1$: both codes of a single neuron can be reached.

**What to write in the exam.**

- Count (2 pts): $2^k$ codes in total and at most $k+1$ reachable by 1.b, so at least $2^k-k-1$ unreachable.
- Positivity: $2^k\ge k+2$ for $k\ge2$.

*Verified: the values of $2^k-k-1$ for $k=2,\dots,6$ are $1,4,11,26,57$ (python), and the $k=2$ witness misses exactly the code $(0,1)$.*

**2. (10) Shallow lower bound and a matching construction**

**What is asked.** Prove that every $h\in\mathcal{H}_B$ realizing $\pi_n$ has $B\ge2^{n-1}-1$, and give an explicit $h$ with $B=2^{n-1}-1$ that realizes $\pi_n$. The answer is a proof and a verified construction.

**Tool and why.** Counting forced code changes against the bound of 1.b (cheat sheet §5). The skip term makes $h$ an affine function of slope $\alpha$ wherever the code is constant, so every step that the target takes with a different slope forces a code change. The construction builds the staircase $\lfloor x/2\rfloor$ from shifted steps.

**Definitions.** Put $k=B$ and write $h(x)=\gamma+\alpha x+v^\top\varphi_{w,b}(x)$ with $v=(v_1,\dots,v_B)$. Call $j\in\{0,\dots,2^n-2\}$ a *change gap* if $\varphi_{w,b}(j)\ne\varphi_{w,b}(j+1)$, and let $C$ be the number of change gaps. We need $C$ because 1.b bounds it by $B$.

**Solution.**

Step 1, slope on gaps without a change: if $\varphi_{w,b}(j)=\varphi_{w,b}(j+1)$, the terms $v^\top\varphi_{w,b}$ cancel and

$$h(j+1)-h(j)=\alpha.$$

Step 2, the target increments: $\pi_n$ goes from $0$ to $1$ after an even $j$ and from $1$ to $0$ after an odd $j$, so $\pi_n(j+1)-\pi_n(j)$ is $+1$ for even $j$ and $-1$ for odd $j$.

Step 3, how many gaps of each kind: the gaps are $j=0,\dots,2^n-2$, that is $2^n-1$ of them. The even ones $0,2,\dots,2^n-2$ are $2^{n-1}$ in number, and the odd ones $1,3,\dots,2^n-3$ are $2^{n-1}-1$.

Step 4, the case $\alpha\ne1$: suppose $h$ realizes $\pi_n$. At every even gap the target moves by $+1$, which is not $\alpha$, so by step 1 the gap must be a change gap. Hence $C\ge2^{n-1}$.

Step 5, the case $\alpha=1$: at every odd gap the target moves by $-1$, which is not $1$, so every odd gap is a change gap. Hence $C\ge2^{n-1}-1$.

Step 6, combining with 1.b: along the increasing sequence $0,1,\dots,2^n-1$ the code changes at most $B$ times, so $B\ge C$. In both cases $C\ge2^{n-1}-1$, and therefore

$$\boxed{B\ge2^{n-1}-1}$$

Step 7, the construction: take $\alpha=1$, $\gamma=0$ and $2^{n-1}-1$ neurons with $w_m=1$, $b_m=-2m$, $v_m=-2$:

$$h(x)=x-2\sum_{m=1}^{2^{n-1}-1}\sigma(x-2m).$$

Step 8, the sum is $\lfloor x/2\rfloor$: for $x\in X_n$, the term $\sigma(x-2m)$ is $1$ exactly when $m\le x/2$. The number of positive integers $m$ with $m\le x/2$ is $\lfloor x/2\rfloor$, which is at most $\lfloor(2^n-1)/2\rfloor$, that is $2^{n-1}-1$, so the upper limit of the sum cuts none of them:

$$\sum_{m=1}^{2^{n-1}-1}\sigma(x-2m)=\lfloor x/2\rfloor.$$

Step 9, the output: hence on $X_n$

$$h(x)=x-2\lfloor x/2\rfloor=x\bmod2,$$

so $h$ realizes $\pi_n$ with exactly $2^{n-1}-1$ hidden neurons, and the bound is tight.

**In words.** Between code changes the shallow network is a line of slope $\alpha$. The last bit zigzags up and down, so a single slope can follow only one direction of the zigzag; the skip term with $\alpha=1$ pays for all the up-steps for free, and every down-step costs a neuron. That halves the count compared with a network without the skip.

**Sanity check.** For $n=2$: $X_2=\{0,1,2,3\}$, the target is $0,1,0,1$ and the bound is $1$. The witness $h(x)=x-2\sigma(x-2)$ gives $0,1,0,1$. Without the skip term ($\alpha=0$) all three gaps would be forced, which is the count $2^n-1$ of part 5.

**What to write in the exam.**

- Equal codes (3 pts): if the code does not change at $j$, then $h(j+1)-h(j)=\alpha$.
- Target increments (2 pts): $+1$ at the $2^{n-1}$ even gaps and $-1$ at the $2^{n-1}-1$ odd gaps.
- Counting (3 pts): $\alpha\ne1$ forces at least $2^{n-1}$ changes, $\alpha=1$ forces at least $2^{n-1}-1$; by 1.b there are at most $B$ changes.
- Tightness (2 pts): $h(x)=x-2\sum_m\sigma(x-2m)$, whose sum equals $\lfloor x/2\rfloor$ on $X_n$.

*Verified: numpy confirms the witness equals $x\bmod2$ on $X_n$ for $n=2,\dots,12$, the forced-change counts ($\alpha=1$ gives $2^{n-1}-1$, $\alpha=-1$ gives $2^{n-1}$, any other $\alpha$ gives $2^n-1$) for $n=2,\dots,7$, and a least-squares search over all placements of $2^{n-1}-2$ thresholds finds no realization for $n=3,4$.*

**3. (10) Deep construction with $n-1$ neurons**

**What is asked.** Give all weights of a densely connected network with $n-1$ hidden neurons that realizes $\pi_n$, and prove that it works. The answer is a construction plus a proof by induction.

**Tool and why.** Binary long division (cheat sheet §5, composition of sign layers): neuron $l$ tests whether the current remainder is at least $2^{n-l}$, that is, it reads off bit $n-l$ of $x$. The dense skip connections let each neuron see $x$ and all earlier bits, which is exactly what it needs to form the remainder. The proof is an induction on $l$.

**Definitions.** For $l=0,\dots,n-1$ let

$$\rho_l(x):=x-\sum_{j=1}^{l}2^{n-j}z_j(x),$$

the part of $x$ left after removing the top $l$ bits found so far (so $\rho_0=x$). We introduce it because every pre-activation of the network is a remainder minus a power of $2$.

**Solution.**

Step 1, the weights: for $l=1,\dots,n-1$ set $a_l=1$, $u_{l,j}=-2^{n-j}$ for $j<l$, and $c_l=-2^{n-l}$; at the output set $\gamma=0$, $\alpha=1$ and $\beta_l=-2^{n-l}$. Explicitly,

$$z_l(x)=\sigma\Big(x-\sum_{j=1}^{l-1}2^{n-j}z_j(x)-2^{n-l}\Big),$$

$$h(x)=x-\sum_{l=1}^{n-1}2^{n-l}z_l(x).$$

Step 2, each neuron thresholds a remainder: the pre-activation of neuron $l+1$ is $\rho_l(x)-2^{n-l-1}$ by the definition of $\rho_l$, so

$$z_{l+1}(x)=\sigma\big(\rho_l(x)-2^{n-l-1}\big),\qquad\rho_{l+1}=\rho_l-2^{n-l-1}z_{l+1}.$$

Step 3, the output is the last remainder: comparing the formula for $h$ with the definition gives $h(x)=\rho_{n-1}(x)$.

**Claim.** For every $x\in X_n$ and every $l=0,\dots,n-1$, the remainder $\rho_l(x)$ is an integer with the parity of $x$, and

$$0\le\rho_l(x)<2^{n-l}.$$

We prove it by induction on $l$, upward from $0$ to $n-1$.

**Base.** For $l=0$, $\rho_0=x$ is an integer in $X_n$, so it lies in $[0,2^n)$, and it trivially has the parity of $x$.

**Hypothesis.** For some $l\le n-2$, $\rho_l$ is an integer with the parity of $x$ and lies in $[0,2^{n-l})$.

**Step.** By step 2 there are two cases. If $\rho_l<2^{n-l-1}$, then $z_{l+1}=0$ and $\rho_{l+1}=\rho_l$, which lies in $[0,2^{n-l-1})$. If $\rho_l\ge2^{n-l-1}$, then $z_{l+1}=1$ (recall that $\sigma(0)=1$) and $\rho_{l+1}=\rho_l-2^{n-l-1}$. This is non-negative, and by the upper bound of the hypothesis

$$\rho_{l+1}<2^{n-l}-2^{n-l-1}=2^{n-l-1}.$$

In both cases $\rho_{l+1}$ lies in $[0,2^{n-(l+1)})$. It is an integer because we subtract an integer. Its parity is that of $\rho_l$, which by the hypothesis is that of $x$, because we subtract $0$ or $2^{n-l-1}$, and the latter is even since $n-l-1\ge1$ for $l\le n-2$.

Step 4, conclusion: at $l=n-1$ the claim says that $\rho_{n-1}$ is an integer in $[0,2)$, so it is $0$ or $1$, and it has the parity of $x$. Hence $\rho_{n-1}(x)=x\bmod2$, and by step 3 $h=\pi_n$ on $X_n$. The network has $n-1$ hidden neurons, so $\pi_n\in\mathcal{D}_{n-1}$; along the way $z_l$ equals bit $n-l$ of $x$.

**In words.** Neuron $1$ reads the most significant bit and subtracts it, neuron $2$ reads the next bit from the remainder, and so on. After $n-1$ bits only bit $0$ is left, which is the answer. The weights grow to $2^{n-1}$, but size is measured by neurons, as in class.

**Sanity check.** Take $n=3$ and $x=5$, binary $101$: $z_1$ is $\sigma(5-4)$, which is $1$, and the remainder is $1$; $z_2$ is $\sigma(5-4-2)$, which is $0$; the output is $5-4-0=1$, the last bit. For $x=6$: $z_1=1$, then $z_2$ is $\sigma(0)$, which is $1$, and the output is $6-4-2=0$. The second example uses the convention $\sigma(0)=1$.

**What to write in the exam.**

- Weights (4 pts): $a_l=1$, $u_{l,j}=-2^{n-j}$, $c_l=-2^{n-l}$, and output $\alpha=1$, $\gamma=0$, $\beta_l=-2^{n-l}$.
- Invariant (4 pts): $\rho_l$ is an integer in $[0,2^{n-l})$ with the parity of $x$; induction on $l$ with the two cases of $z_{l+1}$.
- Conclusion (2 pts): $h=\rho_{n-1}$ is $0$ or $1$ with the parity of $x$, so it equals $\pi_n$.

*Verified: numpy evaluates the network on all of $X_n$ for $n=2,\dots,14$: the output equals $x\bmod2$, the invariant holds at every layer, and $z_l$ equals bit $n-l$ of $x$.*

**4. (5) Exponential expressive efficiency: definition and proof**

**What is asked.** Write the formal definition of exponential expressive efficiency of $\mathcal{D}_{\bar B}$ with respect to $\mathcal{H}_B$ on $X_n$, and prove that it holds. The answer is a definition and a two-part proof.

**Tool and why.** Lecture 1, Def 2 with the "exponential" remark (cheat sheet §4). Condition 1 needs an embedding of each shallow net into a dense one of the same size; condition 2 is exactly parts 2 and 3 together.

**Definitions.** No new notation: $\bar B$ is the size parameter of the dense class, and two functions are identified when they agree on $X_n$.

**Solution.**

Step 1, the definition: $\mathcal{D}_{\bar B}$ is exponentially expressively efficient with respect to $\mathcal{H}_B$ (on $X_n$) if both hold:

- Containment: for every $B$ there is $\bar B\in O(B)$ with $\mathcal{H}_B\subseteq\mathcal{D}_{\bar B}$.
- Separation: there are $\bar B$ polynomial in $n$ and $\bar h\in\mathcal{D}_{\bar B}$ such that $\bar h\in\mathcal{H}_B$ only if $B$ is exponential in $n$.

Step 2, containment with $\bar B=B$: given $h\in\mathcal{H}_B$ with parameters $\gamma,\alpha,v,w,b$, take $L=B$ dense neurons with $a_l=w_l$, $c_l=b_l$, $u_{l,j}=0$, output weights $\beta_l=v_l$ and the same $\gamma,\alpha$. Then $z_l(x)=\sigma(w_lx+b_l)$, because each neuron ignores the earlier ones, and the dense output equals $h(x)$. Since $B\in O(B)$, condition 1 holds.

Step 3, separation: let $\bar h$ be the network of part 3. It lies in $\mathcal{D}_{n-1}$, so $\bar B=n-1$, which is linear in $n$. It agrees with $\pi_n$ on $X_n$, so if $\bar h\in\mathcal{H}_B$ then some $h\in\mathcal{H}_B$ realizes $\pi_n$, and part 2 gives $B\ge2^{n-1}-1$, exponential in $n$.

Step 4, conclusion: both conditions hold, so the dense class is exponentially expressively efficient with respect to the shallow class.

**In words.** Dense deep networks can do everything shallow ones do at the same size, and there is a function they compute with $n-1$ neurons for which shallow networks need $2^{n-1}-1$.

**Sanity check.** For $n=5$ the dense network uses $4$ neurons and every shallow one needs at least $15$; for $n=10$ the numbers are $9$ and $511$.

**What to write in the exam.**

- Definition (3 pts): containment with $\bar B\in O(B)$, and separation with $\bar B$ polynomial and $B$ exponential in $n$.
- Containment: put $u_{l,j}=0$, $a_l=w_l$, $c_l=b_l$, $\beta=v$.
- Separation (2 pts with containment): the part-3 network has $n-1$ neurons, and part 2 forces $B\ge2^{n-1}-1$.

*Verified: numpy checks on 200 random shallow networks that the dense network with $u_{l,j}=0$ gives the same outputs, and tabulates $n-1$ against $2^{n-1}-1$ for $n=2,\dots,7$.*

**5. (5) Depth without skip connections does not help**

**What is asked.** Prove that if $F(\varphi_{w,b}(x))=\pi_n(x)$ on $X_n$ for some arbitrary $F$, then $k\ge2^n-1$, and name in one sentence the feature of $\mathcal{D}_L$ that made depth useful. The answer is a proof and a sentence.

**Tool and why.** The change count of 1.b (cheat sheet §5, composition cannot create pieces from constants): whatever comes after the first layer sees only its code, so the whole network can change value only where the code changes.

**Definitions.** Let $g(x):=F(\varphi_{w,b}(x))$, the whole network as a function of $x$.

**Solution.**

Step 1, the target changes at every gap: $\pi_n(j)\ne\pi_n(j+1)$ for every $j=0,\dots,2^n-2$, which is $2^n-1$ gaps.

Step 2, $g$ changes only where the code changes: if $\varphi_{w,b}(j)=\varphi_{w,b}(j+1)$, then $g(j)$ and $g(j+1)$ are $F$ of the same code, so they are equal.

Step 3, every gap is a code change: by steps 1 and 2, if $g$ realizes $\pi_n$, the code changes at all $2^n-1$ gaps of the sequence $0,1,\dots,2^n-1$.

Step 4, the bound: by 1.b the code changes at most $k$ times along this sequence, so $k\ge2^n-1$. Since $F$ is arbitrary, this holds for every depth and width after the first layer.

Step 5, the feature that helped: the skip connections. Every neuron of $\mathcal{D}_L$ re-reads the real input $x$, so it can threshold a new affine function of $x$ shifted by the earlier bits, while a plain stack sees only the at most $k+1$ codes of its first layer (cf. b\_2021 Q1: in 1-D, depth without such access adds nothing).

**In words.** Everything a plain stack ever learns about $x$ passes through the first layer's code, which takes at most $k+1$ values along the line. Later layers can relabel those values but cannot split them.

**Sanity check.** The bound is tight: with $k=2^n-1$ neurons $w_i=1$, $b_i=-i$ from 1.b, the code at $x$ has exactly $x$ ones, and $F$ equal to the parity of the number of ones realizes $\pi_n$. Compare the three architectures: $2^n-1$ neurons without skips, $2^{n-1}-1$ with the single skip $\alpha x$ (part 2), and $n-1$ with dense skips (part 3).

**What to write in the exam.**

- Target (3 pts): $\pi_n$ changes at all $2^n-1$ gaps; $F\circ\varphi_{w,b}$ can change only where the code does; by 1.b that is at most $k$ times, so $k\ge2^n-1$.
- Feature (2 pts): the skip connections let every neuron re-read $x$.

*Verified: numpy confirms that $\pi_n$ changes at all $2^n-1$ gaps for $n=2,\dots,6$, and that the 1.b witness with $k=2^n-1$ and $F$ the parity of the number of ones realizes $\pi_n$ for $n=2,\dots,8$.*

**Common mistakes.**

- Treating only $w_i>0$, as in c\_2024 where $w_i\ge0$ was assumed. Then the right-closed step for $w_i<0$ and the constant neuron for $w_i=0$ are missed (costs 2 points, and 1 more if $w_i=0$ is forgotten).
- Forgetting the skip term $\alpha x$ in part 2 and answering $2^n-1$, or quoting c\_2024's "at most $B+1$ pieces" outside its hypotheses (there $w_i\ge0$ and no $\alpha x$). The count must go through 1.b.
- Listing the weights in part 3 without the invariant or an induction (costs 3 points), or omitting the containment condition of the definition in part 4 (costs 2 points; as in b\_2023 and b\_2024 it is graded).

**💡 Useful tricks:** A sign neuron on a line switches at most once, whatever the sign of $w_i$, so the switched set $S(x)$ is monotone. A chain of subsets of $[k]$ has at most $k+1$ members, which gives at most $k+1$ codes and at most $k$ changes on any increasing sequence. Where the code does not change, the shallow output moves by exactly $\alpha$, so count the forced changes. Peel off bits with dense skip connections and prove it with the remainder invariant $\rho_l \in [0, 2^{n-l})$.

**⚠️ Watch out:** (1) handle $w_i < 0$ (the step is right-closed) and $w_i = 0$, since no sign restriction is given here. (2) The linear skip $\alpha x$ halves the bound to $2^{n-1}-1$; prove tightness with an explicit witness. (3) Prove the construction works with an invariant or induction; a weight list alone is not enough. (4) State and prove both conditions of the definition. (5) Arbitrary $F$ after the first layer cannot beat $k \ge 2^n - 1$; the input re-read is what matters.

## Q2 — Gradient flow on a deep linear network with a vector input: balancedness, end-to-end dynamics and a margin (35)

**Hint:** Every parameter enters $w$ through one product, so write each partial derivative as "the product of the other factors times $\nabla\ell(w)$", and ask what happens to it when all parameters are $0$. For the conservation law, multiply the flow of layer $j$ by $W_j^\top$ on the right and the flow of layer $j+1$ by $W_{j+1}^\top$ on the left and compare. Under balancedness every squared layer equals one number $s$, so try to express $s$, $\pi^2$ and $\langle \nabla\ell, u\rangle u$ through $w$ alone. For convergence, ask what the monotone loss says about how close $w(t)$ can come to the origin, and drop the non-negative extra term in $\frac{d}{dt}\ell$.

**Full solution:**

**1.a (4) Gradients, a critical point at the origin, and non-convexity**

**What is asked.** Compute the partial derivatives of $\phi$, show that the origin is a critical point whose value is above the minimum, and conclude that $\phi$ is not convex. The answer is a computation and a short proof.

**Tool and why.** The chain rule for $\phi=\ell(w)$ with $w=\pi u$, and the fact that for a differentiable convex function every critical point is a global minimum (cheat sheet §7). The product structure makes every partial derivative carry a factor that vanishes at the origin.

**Definitions.** $\nabla\ell(w)=w-\beta$, the gradient of $\ell$. As in the statement, $\pi=a_2\cdots a_N$ and $\pi_{-j}$ is the same product with $a_j$ left out, so $\pi=a_j\pi_{-j}$.

**Solution.**

Step 1, the $u$-gradient: $w=\pi u$ is linear in $u$ with coefficient $\pi$, so for a direction $v\in\mathbb{R}^d$ the derivative of $\phi$ along $v$ is $\langle\nabla\ell(w),\pi v\rangle$. Hence

$$\nabla_u\phi=\pi\,\nabla\ell(w).$$

Step 2, the $a_j$-derivative: $w=a_j\,\pi_{-j}u$ is linear in $a_j$ with coefficient $\pi_{-j}u$, so by the chain rule

$$\partial_{a_j}\phi=\pi_{-j}\,\langle\nabla\ell(w),u\rangle.$$

Step 3, the gradient at the origin: at $\theta=0$ we have $\pi=0$, and $\pi_{-j}$ is a product of $N-2$ zeros, which is $0$ because $N-2\ge1$. So both formulas give $0$: $\nabla\phi(0)=0$, and the origin is a critical point.

Step 4, the values: at the origin $w=0$, so $\phi(0)=\tfrac12\|\beta\|^2$, which is positive because $\beta\ne0$. At $\theta^*:=(\beta,1,\dots,1)$ we get $w=\beta$ and $\phi(\theta^*)=0$. Since $\phi\ge0$, $\min\phi=0$, and

$$\phi(0)=\tfrac12\|\beta\|^2>0=\min\phi.$$

Step 5, non-convexity: if $\phi$ were convex, the gradient inequality at the critical point $0$ would give, for every $\theta$,

$$\phi(\theta)\ge\phi(0)+\langle\nabla\phi(0),\theta\rangle=\phi(0),$$

so $0$ would be a global minimum. Step 4 shows it is not, so $\phi$ is not convex.

**In words.** At the origin every layer is switched off, so moving any single parameter changes nothing to first order: the gradient vanishes although the predictor $w=0$ is far from $\beta$. A convex function cannot have such a flat spot above its minimum.

**Sanity check.** With $d=1$, $N=3$, $\beta=1$ the three partials of $\phi=\tfrac12(a_3a_2u-1)^2$ are $(a_3a_2u-1)a_3a_2$, $(a_3a_2u-1)a_3u$ and $(a_3a_2u-1)a_2u$, all $0$ at the origin, while $\phi(0)=\tfrac12$ and $\phi(1,1,1)=0$.

**What to write in the exam.**

- Gradients (2 pts): $\nabla_u\phi=\pi\nabla\ell(w)$ and $\partial_{a_j}\phi=\pi_{-j}\langle\nabla\ell(w),u\rangle$ by the chain rule.
- Critical point (1 pt): at $\theta=0$ both $\pi$ and $\pi_{-j}$ vanish since $N\ge3$.
- Non-convexity (1 pt): $\phi(0)=\tfrac12\|\beta\|^2$ but $\phi(\beta,1,\dots,1)=0$; a convex function has only global minima as critical points.

*Verified: sympy differentiates $\phi$ for $N=3,4,5$ and $d=2,3$, and confirms the gradient vanishes at the origin with $\phi(0)=\tfrac12\|\beta\|^2$.*

**1.b (3) A non-strict saddle at the origin**

**What is asked.** Show that the Hessian of $\phi$ at the origin is zero and that the origin is neither a local minimum nor a local maximum, then interpret this for the landscape approach. The answer is two short proofs and a sentence.

**Tool and why.** A polynomial's gradient and Hessian at $0$ are read off from its terms of degree $1$ and $2$; strict saddles (cheat sheet §7, Lecture 3 Def 4) need a negative Hessian eigenvalue. Here $\phi$ is a polynomial whose non-constant terms all have degree at least $N\ge3$.

**Definitions.** Let $\hat\beta:=\beta/\|\beta\|$, the unit vector along $\beta$. For $\varepsilon>0$ let $\theta_\varepsilon^{\pm}:=(\varepsilon\hat\beta,\pm\varepsilon,\varepsilon,\dots,\varepsilon)$, two points near the origin on either side of it.

**Solution.**

Step 1, expand $\phi$: opening the square,

$$\phi(\theta)=\tfrac12\|\beta\|^2-\pi\langle u,\beta\rangle+\tfrac12\pi^2\|u\|^2.$$

Step 2, degrees: $\pi\langle u,\beta\rangle$ is a sum of monomials with one factor from each of $a_2,\dots,a_N$ and one coordinate of $u$, so it has degree $N$. The last term has degree $2N$. Both are at least $3$ because $N\ge3$.

Step 3, the Hessian: every second partial derivative of a monomial of degree at least $3$ still contains a parameter as a factor, so it vanishes at $\theta=0$. The constant term has no second derivatives. Hence $\nabla^2\phi(0)=0$.

Step 4, values on both sides: at $\theta_\varepsilon^{\pm}$ we have $\pi=\pm\varepsilon^{N-1}$ and $u=\varepsilon\hat\beta$, so $w=\pm\varepsilon^N\hat\beta$ and

$$\phi(\theta_\varepsilon^{\pm})=\tfrac12\big(\|\beta\|\mp\varepsilon^N\big)^2.$$

For $\varepsilon^N$ positive and below $2\|\beta\|$ the "$+$" point has a value below $\tfrac12\|\beta\|^2$ and the "$-$" point a value above it. As $\varepsilon\to0$ both points tend to the origin, so the origin is neither a local minimum nor a local maximum: it is a saddle.

Step 5, not strict: a strict saddle needs $\lambda_{\min}(\nabla^2\phi(0))<0$, but the Hessian is $0$, so this saddle is non-strict. This is exactly Lecture 3, Prop 3 (non-strict saddles at depth $N\ge3$), so the landscape approach, which requires all saddles to be strict, cannot guarantee that gradient methods avoid it; this is why Lecture 4 analyses trajectories instead.

**In words.** Near the origin the loss changes only at order $\varepsilon^N$, far too weakly for any second-order test to see a direction of descent. A descent direction exists, but it is invisible to the Hessian.

**Sanity check.** With $d=1$, $N=3$, $\beta=1$ and $\varepsilon=0.1$: $\phi(\theta_\varepsilon^+)=\tfrac12(0.999)^2$, about $0.4990$, and $\phi(\theta_\varepsilon^-)=\tfrac12(1.001)^2$, about $0.5010$, on the two sides of $\phi(0)=0.5$.

**What to write in the exam.**

- Expansion (1 pt): $\phi=\tfrac12\|\beta\|^2-\pi\langle u,\beta\rangle+\tfrac12\pi^2\|u\|^2$, with non-constant terms of degree $N$ and $2N$.
- Hessian (1 pt): all monomials have degree at least $3$, so $\nabla^2\phi(0)=0$.
- Saddle (1 pt): $\theta_\varepsilon^{\pm}$ give values on both sides of $\phi(0)$; zero Hessian means non-strict, so the landscape approach fails here.

*Verified: sympy computes the full Hessian at the origin as the zero matrix for $N=3,4,5$ and $d=2,3$; python evaluates $\phi(\theta_\varepsilon^\pm)$ at $\varepsilon=0.1$.*

**2.a (5) The conservation law for a general linear network**

**What is asked.** Prove that $W_{j+1}^\top W_{j+1}-W_jW_j^\top$ is constant in time along gradient flow, for a general depth-$N$ linear network, without citing the lemma from class. The answer is a proof.

**Tool and why.** The layer-wise flow from Lecture 3's gradient formula, and the "multiply, symmetrize, integrate" technique (cheat sheet §8). Multiplying the flow of adjacent layers by the right transposes produces the same matrix twice.

**Definitions.** Write $G(t):=\nabla L(W_{1:N}(t))$ for the loss gradient at the current end-to-end matrix. Let $A_j(t):=W_{j+1:N}^\top\,G\,W_{1:j}^\top$; we introduce it because both derivatives below turn out to equal $A_j+A_j^\top$, up to sign.

**Solution.**

Step 1, the flow: by the reminder and the definition of gradient flow, for every $j$,

$$\dot W_j=-W_{j+1:N}^\top\,G\,W_{1:j-1}^\top.$$

Step 2, multiply layer $j$ on the right by $W_j^\top$: since $W_jW_{1:j-1}=W_{1:j}$, transposing gives $W_{1:j-1}^\top W_j^\top=W_{1:j}^\top$, and

$$\dot W_jW_j^\top=-W_{j+1:N}^\top\,G\,W_{1:j}^\top=-A_j.$$

Step 3, multiply layer $j+1$ on the left by $W_{j+1}^\top$: since $W_{j+2:N}W_{j+1}=W_{j+1:N}$, transposing gives $W_{j+1}^\top W_{j+2:N}^\top=W_{j+1:N}^\top$, and by step 1 with $j+1$ in place of $j$

$$W_{j+1}^\top\dot W_{j+1}=-W_{j+1}^\top W_{j+2:N}^\top\,G\,W_{1:j}^\top=-A_j.$$

Step 4, symmetrize: by the product rule and steps 2 and 3,

$$\begin{aligned}
\frac{d}{dt}\big(W_jW_j^\top\big)&=\dot W_jW_j^\top+W_j\dot W_j^\top\\
&=-A_j-A_j^\top,\\
\frac{d}{dt}\big(W_{j+1}^\top W_{j+1}\big)&=\dot W_{j+1}^\top W_{j+1}+W_{j+1}^\top\dot W_{j+1}\\
&=-A_j^\top-A_j.
\end{aligned}$$

Here $W_j\dot W_j^\top$ is the transpose of $\dot W_jW_j^\top$, and $\dot W_{j+1}^\top W_{j+1}$ is the transpose of $W_{j+1}^\top\dot W_{j+1}$.

Step 5, integrate: the two derivatives are equal, so the derivative of $W_{j+1}^\top W_{j+1}-W_jW_j^\top$ is $0$, and a matrix function with zero derivative on $[0,\infty)$ is constant:

$$\boxed{W_{j+1}(t)^\top W_{j+1}(t)-W_j(t)W_j(t)^\top=W_{j+1}(0)^\top W_{j+1}(0)-W_j(0)W_j(0)^\top}$$

**In words.** Layer $j$ and layer $j+1$ meet in the hidden space of dimension $d_j$, and gradient flow grows the "output Gram" of layer $j$ and the "input Gram" of layer $j+1$ at exactly the same rate. Rescaling one layer up and the next one down never changes $W_{1:N}$, and gradient flow never moves along that free direction.

**Sanity check.** Both matrices are $d_j\times d_j$: $W_j\in\mathbb{R}^{d_j\times d_{j-1}}$ gives $W_jW_j^\top\in\mathbb{R}^{d_j\times d_j}$, and $W_{j+1}\in\mathbb{R}^{d_{j+1}\times d_j}$ gives $W_{j+1}^\top W_{j+1}\in\mathbb{R}^{d_j\times d_j}$. Swapping the transposes would give matrices of the wrong sizes whenever $d_{j-1}\ne d_j$ or $d_{j+1}\ne d_j$.

**What to write in the exam.**

- Flow (1 pt): $\dot W_j=-W_{j+1:N}^\top GW_{1:j-1}^\top$.
- Products (2 pts): $\dot W_jW_j^\top$ and $W_{j+1}^\top\dot W_{j+1}$ both equal $-W_{j+1:N}^\top GW_{1:j}^\top$.
- Symmetrize (2 pts): add the transposes, so both Gram matrices have the same derivative; their difference is constant.

*Verified: numpy on 200 random networks with $N\in\{3,4,5\}$ and random widths $1$ to $4$ matches the gradient formula to central finite differences (relative error $8\cdot10^{-10}$) and gives $\frac{d}{dt}(W_{j+1}^\top W_{j+1}-W_jW_j^\top)$ below $5\cdot10^{-13}$.*

**2.b (3) The conservation law for our network**

**What is asked.** Specialize part 2.a to our network to get that $a_j^2-\|u\|^2$ is constant, and check directly that $a_j^2$ and $\|u\|^2$ both move at rate $-2\langle\nabla\ell(w),w\rangle$. The answer is a deduction and a short computation.

**Tool and why.** Part 2.a with the given widths, plus the gradients of part 1.a (cheat sheet §8).

**Definitions.** No new notation.

**Solution.**

Step 1, the layers: $W_1=u^\top$ is $1\times d$ and $W_j=a_j$ is $1\times1$ for $j\ge2$. So $W_1W_1^\top=\|u\|^2$ (it is $u^\top u$), $W_2^\top W_2=a_2^2$, and for $j\ge2$ we get $W_jW_j^\top=a_j^2$ and $W_{j+1}^\top W_{j+1}=a_{j+1}^2$.

Step 2, apply 2.a: the differences $a_2^2-\|u\|^2$ and $a_{j+1}^2-a_j^2$ (for $j=2,\dots,N-1$) are constant. Adding the first $j-1$ of them telescopes to $a_j^2-\|u\|^2$, a sum of constants, hence constant.

Step 3, direct check: by part 1.a and the flow,

$$\frac{d}{dt}\|u\|^2=2\langle u,\dot u\rangle=-2\pi\langle u,\nabla\ell(w)\rangle=-2\langle\nabla\ell(w),w\rangle,$$

because $\pi u=w$. Similarly, using $a_j\pi_{-j}=\pi$,

$$\frac{d}{dt}a_j^2=2a_j\dot a_j=-2a_j\pi_{-j}\langle\nabla\ell(w),u\rangle=-2\langle\nabla\ell(w),w\rangle.$$

**In words.** All $N$ layers grow or shrink their squared size at the same rate $-2\langle\nabla\ell(w),w\rangle$, so the gaps between them are frozen.

**Sanity check.** With $d=1$ this is the law $w_i^2-w_j^2$ constant of c\_2024 Q2(1) (equivalently b\_2021 Q2(a)). With $d\ge2$ only the norm $\|u\|$ is tied to the scalars; the direction of $u$ is free to rotate.

**What to write in the exam.**

- Specialization (2 pts): $W_1W_1^\top=\|u\|^2$, and both Gram matrices of a scalar layer equal $a_j^2$; then telescope 2.a.
- Direct rate (1 pt): $2\langle u,\dot u\rangle$ and $2a_j\dot a_j$ both equal $-2\langle\nabla\ell(w),w\rangle$.

*Verified: sympy confirms both rates equal $-2\langle\nabla\ell(w),w\rangle$ for $N=3,4,5$ and $d=2,3$; RK4 on $24$ runs (balanced and unbalanced starts) keeps the drift of $a_j^2-\|u\|^2$ below $4\cdot10^{-11}$.*

**3.a (6) End-to-end dynamics**

**What is asked.** Under a balanced initialization, derive the ODE for $w(t)$ in closed form, without citing the theorem from class. The answer is a derivation.

**Tool and why.** The product rule for $w=\pi u$, the flows of part 1.a, and balancedness from part 2.b to rewrite every parameter-dependent factor through $w$ (cheat sheet §8). This mirrors the proof of Lecture 4, Thm 1, but here it needs no SVD.

**Definitions.** Let $g:=\nabla\ell(w)$. Let $s(t):=\|u(t)\|^2$; by step 1 every $a_j(t)^2$ also equals $s(t)$, so $s$ is the common squared size of all layers.

**Solution.**

Step 1, balancedness persists: by part 2.b, $a_j(t)^2-\|u(t)\|^2$ equals its initial value, which is $0$. So $a_j(t)^2=s(t)$ for all $j$ and $t$.

Step 2, $s$ through $w$: $\pi^2$ is the product of the $N-1$ squares $a_j^2$, so $\pi^2=s^{N-1}$. Hence

$$\|w\|^2=\pi^2\|u\|^2=s^{N-1}s=s^N,$$

so $s=\|w\|^{2/N}$, $\pi^2=\|w\|^{2-\frac2N}$, and $\pi_{-j}^2=s^{N-2}$.

Step 3, the product rule:

$$\dot w=\dot\pi\,u+\pi\,\dot u.$$

Step 4, the second term: by part 1.a, $\dot u=-\pi g$, so $\pi\dot u=-\pi^2g$, which is $-\|w\|^{2-\frac2N}g$ by step 2.

Step 5, the derivative of $\pi$: by the product rule and part 1.a,

$$\begin{aligned}
\dot\pi&=\sum_{j=2}^{N}\pi_{-j}\,\dot a_j\\
&=-\langle g,u\rangle\sum_{j=2}^{N}\pi_{-j}^2\\
&=-(N-1)\,s^{N-2}\,\langle g,u\rangle.
\end{aligned}$$

The last line uses $\pi_{-j}^2=s^{N-2}$ from step 2 for each of the $N-1$ terms.

Step 6, the first term through $w$: since $w=\pi u$ and $\pi^2=s^{N-1}$,

$$\langle g,w\rangle w=\pi^2\langle g,u\rangle u=s^{N-1}\langle g,u\rangle u.$$

Assume $w\ne0$; then $s>0$ by step 2, and dividing by $s$,

$$s^{N-2}\langle g,u\rangle u=\frac{\langle g,w\rangle w}{s}=\frac{\langle g,w\rangle w}{\|w\|^{2/N}}.$$

So by step 5, $\dot\pi u=-(N-1)\|w\|^{-\frac2N}\langle g,w\rangle w$.

Step 7, combine: by steps 3, 4 and 6, and writing $\|w\|^{-\frac2N}$ as $\|w\|^{2-\frac2N}/\|w\|^2$,

$$\boxed{\dot w=-\|w\|^{2-\frac2N}\Big(g+(N-1)\frac{\langle g,w\rangle}{\|w\|^2}w\Big)}$$

Step 8, the case $w(t)=0$: then $s=0$ by step 2, so $u=0$ and every $a_j=0$, and the parameters sit at the origin, where $\nabla\phi=0$ (part 1.a). Hence $\dot u$ and all $\dot a_j$ vanish at time $t$, and so does $\dot w=\dot\pi u+\pi\dot u$.

**In words.** Balancedness ties the size of every layer to $\|w\|$, so the network's internal state is determined by $w$ up to signs, and the dynamics close on $w$. Depth multiplies the plain gradient by $\|w\|^{2-2/N}$ and adds an extra push of $(N-1)$ times the component of the gradient along $w$.

**Sanity check.** For $d=1$ we get $\frac{\langle g,w\rangle w}{w^2}=g$, so $\dot w=-N|w|^{2-\frac2N}(w-\beta)$, the scalar law of c\_2024 Q2(2) (there with $w>0$). For a concrete check take $N=3$, $\beta=(2,0)$, $w=(2,1)$: then $g=(0,1)$, $\langle g,w\rangle=1$ and $\|w\|^2=5$, so $\dot w=-5^{2/3}(0.8,1.4)$, about $(-2.339,-4.094)$, which matches the parameter flow for all sign patterns of the $a_j$.

**What to write in the exam.**

- Balancedness (1 pt): by 2.b, $a_j^2=\|u\|^2$ for all $t$; call it $s$.
- Size (1 pt): $\|w\|^2=s^N$, so $\pi^2=\|w\|^{2-2/N}$ and $\pi_{-j}^2=s^{N-2}$.
- Product rule (2 pts): $\pi\dot u=-\pi^2g$ and $\dot\pi=-(N-1)s^{N-2}\langle g,u\rangle$.
- Rewrite (2 pts): $s^{N-2}\langle g,u\rangle u=\|w\|^{-2/N}\langle g,w\rangle w$, then combine; $w=0$ forces the origin, a critical point.

*Verified: sympy compares $\dot\pi u+\pi\dot u$ with the boxed formula at random balanced points for $N=3,4,5$, $d=3$ and every sign pattern of $a_2,\dots,a_N$ (relative error below $10^{-12}$); numpy reproduces the concrete value.*

**3.b (3) The preconditioner**

**What is asked.** Write the dynamics as $\dot w=-P_w\nabla\ell(w)$, find the spectrum of $P_w$, compare with Lecture 4, Prop 1, and interpret. The answer is a matrix, its eigen-decomposition, and a sentence.

**Tool and why.** Rewrite $\langle g,w\rangle w$ as $ww^\top g$, then use the spectrum of identity plus a rank-one projection (cheat sheet §3 and §8).

**Definitions.** For $w\ne0$ let $\hat w:=w/\|w\|$, the unit vector along $w$.

**Solution.**

Step 1, the matrix: $\langle g,w\rangle w$ equals $ww^\top g$, so part 3.a reads $\dot w=-P_wg$ with

$$P_w:=\|w\|^{2-\frac2N}\big(I_d+(N-1)\hat w\hat w^\top\big),$$

which is symmetric.

Step 2, the direction $\hat w$: $\hat w\hat w^\top\hat w=\hat w$, so $P_w\hat w=N\|w\|^{2-\frac2N}\hat w$. The eigenvalue is $N\|w\|^{2-\frac2N}$.

Step 3, directions orthogonal to $w$: if $\langle v,w\rangle=0$ then $\hat w\hat w^\top v=0$, so $P_wv=\|w\|^{2-\frac2N}v$. This eigenvalue $\|w\|^{2-\frac2N}$ has multiplicity $d-1$.

Step 4, compare with Lecture 4, Prop 1: the $1\times d$ matrix $w^\top$ has the single singular value $\sigma_1=\|w\|$ with left vector $1$ and right vector $\hat w$, and $\sigma_{r'}=0$ for the other right vectors. Prop 1 gives the eigenvalue $\sum_{j=1}^N\sigma_1^{\frac{2(N-j)}{N}}\sigma_{r'}^{\frac{2(j-1)}{N}}$. For $r'=1$ every term equals $\sigma_1^{\frac{2(N-1)}{N}}$, so the sum is $N\|w\|^{2-\frac2N}$. For $r'\ge2$ only the $j=1$ term survives, with the convention $\sigma^0=1$, and equals $\|w\|^{2-\frac2N}$. Both agree with steps 2 and 3.

Step 5, interpretation: depth amplifies motion along the current direction of $w$, by the factor $N$ relative to rotations of $w$; so growing or shrinking the predictor along the direction it already points in is favoured over turning it.

**In words.** The deep network is plain gradient flow on $\ell$ seen through a lens that magnifies the radial component of the gradient $N$ times. The lens is set by where $w$ already is, which is the "depth promotes directions already traversed" picture of Lecture 4.

**Sanity check.** At $N=1$ the formula would give $P_w=I_d$, plain gradient flow. The eigenvalues are all positive when $w\ne0$, so $P_w$ is positive definite there, and the loss can only decrease.

**What to write in the exam.**

- Matrix (1 pt): $P_w=\|w\|^{2-2/N}(I_d+(N-1)\hat w\hat w^\top)$.
- Spectrum (1 pt): $N\|w\|^{2-2/N}$ on $\hat w$, and $\|w\|^{2-2/N}$ on $w^\perp$ ($d-1$ times); same as Prop 1 with $\sigma_1=\|w\|$.
- Interpretation (1 pt): depth speeds up radial motion along $w$ by the factor $N$ relative to rotation.

*Verified: numpy eigenvalues of $P_w$ for random $w\in\mathbb{R}^4$ and $N=3,4,7$ equal $\|w\|^{2-2/N}$ times $(1,1,1,N)$, and Prop 1's formula with $\sigma=(\|w\|,0,0,0)$ gives the same list.*

**4.a (3) The end-to-end vector stays away from the origin**

**What is asked.** Prove that $\|w(t)\|\ge c$ for all $t$. The answer is a short proof.

**Tool and why.** Gradient flow never increases the objective (Recitation: gradient flow, cheat sheet §7), and the objective equals $\ell(w(t))$, a function of the distance to $\beta$. A distance to $\beta$ that never grows keeps $w$ away from $0$ by the triangle inequality. This is the margin-persistence step of Lecture 4, Thm 2.

**Definitions.** No new notation.

**Solution.**

Step 1, the loss does not increase: $\phi(\theta(t))=\ell(w(t))$ is non-increasing, so $\ell(w(t))\le\ell(w(0))$.

Step 2, the distance to $\beta$: $\ell(w)=\tfrac12\|w-\beta\|^2$, so step 1 gives $\|w(t)-\beta\|\le\|w(0)-\beta\|$.

Step 3, the triangle inequality: $\|\beta\|\le\|w(t)\|+\|\beta-w(t)\|$, so by step 2

$$\begin{aligned}
\|w(t)\|&\ge\|\beta\|-\|w(t)-\beta\|\\
&\ge\|\beta\|-\|w(0)-\beta\|\\
&=c.
\end{aligned}$$

**In words.** The flow starts inside the ball of radius $\|\beta\|-c$ around $\beta$ and can never leave it, because leaving would increase the loss. That ball stays at distance $c$ from the origin, the dangerous saddle of part 1.

**Sanity check.** With $\beta=(2,0)$ and $w(0)=(2,1)$: $\|w(0)-\beta\|=1$, below $\|\beta\|=2$, so $c=1$. Numerically $\|w(t)\|$ starts at $\sqrt5$, about $2.236$, and settles at $\|\beta\|=2$; its smallest value is about $1.946$ for $N=3$ and $1.915$ for $N=5$, far above $c=1$.

**What to write in the exam.**

- Monotone loss (1 pt): $\ell(w(t))\le\ell(w(0))$, so $\|w(t)-\beta\|\le\|w(0)-\beta\|$.
- Triangle inequality (2 pts): $\|w(t)\|\ge\|\beta\|-\|w(t)-\beta\|$, and the right side is at least $c$.

*Verified: RK4 runs on $18$ random balanced starts with a margin ($N\in\{3,4,6\}$, $d\le4$, random signs of $a_j$) keep $\|w(t)\|/c\ge1$ on the whole grid.*

**4.b (4) A linear convergence rate**

**What is asked.** Prove that the loss decays at least like $\exp(-2c^{2-2/N}t)$. The answer is a proof.

**Tool and why.** The chain rule along the end-to-end dynamics of 3.a, a lower bound on the preconditioner, and an integrating factor (cheat sheet §9). This is Lecture 4, Thm 2 done by hand for this network.

**Definitions.** Let $L(t):=\ell(w(t))$ and $\kappa:=2c^{2-\frac2N}$, the claimed rate.

**Solution.**

Step 1, 3.a applies: by 4.a, $\|w(t)\|\ge c$, which is positive, so $w(t)\ne0$ for every $t$.

Step 2, the derivative of the loss: with $g=w-\beta$, the gradient of $\ell$, the chain rule and 3.a give

$$\begin{aligned}
\dot L&=\langle g,\dot w\rangle\\
&=-\|w\|^{2-\frac2N}\Big(\|g\|^2+(N-1)\frac{\langle g,w\rangle^2}{\|w\|^2}\Big)\\
&\le-\|w\|^{2-\frac2N}\|g\|^2.
\end{aligned}$$

The inequality drops a term that is non-negative because $N-1>0$.

Step 3, the gradient through the loss: $\|g\|^2$ is $\|w-\beta\|^2$, which equals $2L$.

Step 4, the lower bound on the size: the exponent $2-\frac2N$ is positive, so $x\mapsto x^{2-\frac2N}$ is increasing on $[0,\infty)$, and $\|w\|\ge c$ (4.a) gives $\|w\|^{2-\frac2N}\ge c^{2-\frac2N}$. With step 3,

$$\dot L\le-2c^{2-\frac2N}L=-\kappa L.$$

Step 5, integrating factor: by the product rule and step 4,

$$\frac{d}{dt}\big(e^{\kappa t}L(t)\big)=e^{\kappa t}\big(\dot L+\kappa L\big)\le0,$$

so $e^{\kappa t}L(t)\le L(0)$, that is

$$\boxed{\ell(w(t))\le\ell(w(0))\,e^{-2c^{2-\frac2N}t}}$$

**In words.** The margin keeps $\|w\|$ at least $c$, so the preconditioner never drops below $c^{2-2/N}$ times the identity, and the strongly convex loss then decays exponentially, at any depth. Without a margin, $\|w\|$ could approach $0$, where the preconditioner vanishes.

**Sanity check.** With $\beta=(2,0)$, $w(0)=(2,1)$ and $c=1$ the bound is $\tfrac12e^{-2t}$ for every $N$: at $t=1$ it is about $0.0677$, while the numerical loss is $0.0029$ for $N=3$ and $0.0011$ for $N=5$. Compared with Thm 2 of Lecture 4 (with $\alpha=1$), our rate is twice as large because $\|\nabla\ell\|^2=2(\ell-\ell^*)$ exactly here. The rate $c^{2-2/N}$ depends on depth: for $c=0.5$ it is $0.397$ at $N=3$ and $0.287$ at $N=10$, while for $c=2$ it grows with $N$.

**What to write in the exam.**

- Chain rule (1 pt): $\dot L=-\|w\|^{2-2/N}(\|g\|^2+(N-1)\langle g,\hat w\rangle^2)$, at most $-\|w\|^{2-2/N}\|g\|^2$.
- Bounds (2 pts): $\|g\|^2=2L$ and $\|w\|^{2-2/N}\ge c^{2-2/N}$ by 4.a.
- Integration (1 pt): $\frac{d}{dt}(e^{\kappa t}L)\le0$ with $\kappa=2c^{2-2/N}$.

*Verified: the same $18$ RK4 runs (step $2\cdot10^{-3}$ up to $t=6$) keep the ratio of the loss to the envelope at most $1$; the concrete example gives $0.00292$ ($N=3$) and $0.00108$ ($N=5$) against $0.0677$ at $t=1$.*

**5. (4) The margin cannot be dropped**

**What is asked.** For a balanced start with $w(0)=-\gamma\beta$, prove that the loss stays above $\tfrac12\|\beta\|^2$ forever. The answer is a proof.

**Tool and why.** Uniqueness of the flow at the critical origin (as in part 1.a) to keep $w(t)\ne0$; then the end-to-end ODE of 3.a gives a linear ODE for the component of $w$ orthogonal to $\beta$, solved by an integrating factor (cheat sheet §7 and §8); finally the intermediate value theorem for the sign.

**Definitions.** Let $Q:=I_d-\hat\beta\hat\beta^\top$, the orthogonal projection onto the complement of $\beta$; we introduce it to follow the part of $w$ that is not along $\beta$. Let $\rho(t):=\langle w(t),\hat\beta\rangle$, the coordinate of $w$ along $\beta$.

**Solution.**

Step 1, $w(t)$ never vanishes: suppose $w(t_1)=0$. By 3.a, step 8, the parameters are at the origin at time $t_1$. The origin is a critical point (part 1.a), so the constant curve $\theta\equiv0$ solves the flow through that point. By uniqueness, forward and backward in time, $\theta(t)=0$ for all $t$, so $w(0)=0$. This contradicts $w(0)=-\gamma\beta$, which is not $0$.

Step 2, the orthogonal part: since $Q\beta=0$, we get $Qg=Qw$ from $g=w-\beta$. Applying $Q$ to the boxed formula of 3.a (valid by step 1),

$$Q\dot w=-k(t)\,Qw,\qquad k(t):=\|w\|^{2-\frac2N}\Big(1+(N-1)\frac{\langle g,w\rangle}{\|w\|^2}\Big),$$

where $k$ is continuous because $w(t)\ne0$.

Step 3, solve it: let $K(t):=\int_0^tk$. By the product rule and step 2, $\frac{d}{dt}\big(e^{K(t)}Qw(t)\big)=0$, so $Qw(t)=e^{-K(t)}Qw(0)$. And $Qw(0)$ is $-\gamma Q\beta$, which is $0$, so $Qw(t)=0$ for all $t$: $w(t)=\rho(t)\hat\beta$.

Step 4, the sign of $\rho$: $\rho$ is continuous, $\rho(t)\ne0$ by steps 1 and 3, and $\rho(0)=-\gamma\|\beta\|$ is negative. By the intermediate value theorem $\rho(t)<0$ for all $t$.

Step 5, the loss: $w-\beta=(\rho-\|\beta\|)\hat\beta$, and $\rho-\|\beta\|<-\|\beta\|$, a negative number, so

$$\ell(w(t))=\tfrac12\big(\rho(t)-\|\beta\|\big)^2>\tfrac12\|\beta\|^2.$$

Interpretation: here $\|w(0)-\beta\|=(1+\gamma)\|\beta\|$, which is more than $\|\beta\|$, so part 4 does not apply. In Lecture 4, a small random initialization has a margin only with probability about $\tfrac12$; this is an extreme case of the other half.

**In words.** Pointing exactly against $\beta$, the predictor can only shrink towards $0$ along the same line, and it cannot pass through $0$ because the origin is a critical point of the parameters. So it creeps towards the non-strict saddle of part 1 and stalls there.

**Sanity check.** With $\beta=(1,0,0)$ and $w(0)=-\beta$, RK4 up to $t=200$ keeps the two orthogonal coordinates exactly $0$ and $\rho<0$, with the loss decreasing from $2$ towards $\tfrac12$ but staying above it (about $0.5000001$ at $t=200$ for $N=3$). A tilted start $w(0)=(-1,0.05)$ is not covered: it lingers near the saddle (loss $0.5001$ at $t=20$) and then escapes (loss $3\cdot10^{-6}$ at $t=80$).

**What to write in the exam.**

- Nonzero (1 pt): $w(t_1)=0$ means all parameters are $0$, a critical point, so uniqueness forces $w(0)=0$.
- Orthogonal part (2 pts): $Q\dot w=-k(t)Qw$ with $Qw(0)=0$, so $w(t)=\rho(t)\hat\beta$.
- Sign and loss (1 pt): $\rho$ stays negative, so $\ell=\tfrac12(\rho-\|\beta\|)^2$ exceeds $\tfrac12\|\beta\|^2$.

*Verified: RK4 (step $10^{-2}$ up to $t=200$) from $w(0)=-\beta$ for $N=3,4,5$ keeps the orthogonal part at $0$, $\rho<0$ and the minimum loss above $\tfrac12$ ($0.50000012$, $0.5000062$, $0.5000233$); the tilted run gives $0.500098$ at $t=20$ and $3\cdot10^{-6}$ at $t=80$.*

**Common mistakes.**

- Flipping the transposes in 2.a, writing $W_{j+1}W_{j+1}^\top-W_j^\top W_j$ (the matrices then have the wrong sizes), or stopping after step 3 without symmetrizing (costs 2 points).
- In 3.a, writing $\pi=s^{(N-1)/2}$ instead of $\pi^2=s^{N-1}$ (the sign of $\pi$ is free), or forgetting the factor $N-1$ in $\dot\pi$.
- In 4.b, using the bound $\|w\|\ge c$ without proving it (that is part 4.a), or applying the formula of 3.a without noting $w(t)\ne0$; in 5, claiming "$w$ cannot cross $0$" from continuity alone instead of uniqueness at the critical origin.

**💡 Useful tricks:** Each partial derivative is "product of the other factors times $\nabla\ell$", which vanishes at the origin for $N\ge3$, and all non-constant terms of $\phi$ have degree at least $N$. For conservation, compare $\dot W_jW_j^\top$ with $W_{j+1}^\top\dot W_{j+1}$ and add transposes. Under balancedness $\|w\|^2=s^N$, so every factor becomes a power of $\|w\|$. Monotone loss plus the triangle inequality keeps $\|w\|\ge c$, which lower-bounds the preconditioner.

**⚠️ Watch out:** (1) Non-convexity needs a critical point that is not a global minimum, so exhibit both. (2) Balancedness is $W_{j+1}^\top W_{j+1}=W_jW_j^\top$, not the transposed version. (3) $\pi$ can be negative; only $\pi^2=s^{N-1}$ is fixed. (4) The rate needs $\|w(t)\|\ge c$ for all $t$, proved from the margin, not just at $t=0$. (5) Without a margin, gradient flow can stall at the non-strict saddle at the origin.

## Q3 — Min-norm interpolation and a norm-adaptive bound with doubling radii (30)

**Hint:** GD's updates are combinations of the rows of $X$, so where do the iterates live?
Write the residual recursion and ask what the step-size condition says about the eigenvalues
of the iteration matrix. For the Rademacher complexity, the supremum of a linear functional
over a ball has a closed form, and the expected norm of a random signed sum is easier to
handle once squared. For the adaptive bound, every $w$ should fall into some ball of radius
$2^k$ that is not much larger than $\|w\|$, and the weights $\delta_k$ have to sum to at
most $\delta$.

**Full solution:**

**1. (8) Gradient descent converges to the minimum-norm interpolator**

**What is asked.** Prove that gradient descent from $w_0=0$ converges to $w^*=X^\top K^{-1}y$, that $w^*$ is the unique interpolator of minimal norm, and that $\|w^*\|^2=y^\top K^{-1}y$. Convergence must be proved, not assumed. The answer is a proof.

**Tool and why.** The residual recursion and the spectral decomposition of the symmetric matrix $K$ (cheat sheet §3) give convergence; the span argument and Pythagoras give the minimum-norm property (cheat sheet §12, Lecture 7, Prop 1 and Lem 1). The residual is the natural object because its recursion involves only $K$, whose eigenvalues the step-size condition controls.

**Definitions.** $r_t:=Xw_t-y$ is the residual (as in the hint). $\alpha_t\in\mathbb{R}^N$ denotes coefficients with $w_t=X^\top\alpha_t$; it exists by step 2. $\mu_1,\dots,\mu_N$ are the eigenvalues of $K$, and $q:=\max_i|1-\eta\mu_i/N|$ is the contraction factor of step 4.

**Solution.**

Step 1, the gradient: $\nabla F(w)=\frac1NX^\top(Xw-y)$, which is $\frac1NX^\top r$ at the point $w$.

Step 2, the iterates stay in the row space: by induction on $t$. At $t=0$, $w_0=0$, which is $X^\top0$. If $w_t=X^\top\alpha_t$, then $w_{t+1}=X^\top(\alpha_t-\frac{\eta}{N}r_t)$, so we may take $\alpha_{t+1}=\alpha_t-\frac{\eta}{N}r_t$.

Step 3, the residual recursion:

$$\begin{aligned}
r_{t+1}&=Xw_{t+1}-y\\
&=Xw_t-y-\tfrac{\eta}{N}XX^\top r_t\\
&=\big(I-\tfrac{\eta}{N}K\big)r_t.
\end{aligned}$$

Step 4, the eigenvalues of the iteration matrix: $K$ is symmetric positive definite, so its eigenvalues satisfy $\mu_i>0$ and $\mu_i\le\mu_{\max}$. The matrix $I-\frac{\eta}{N}K$ has eigenvalues $1-\eta\mu_i/N$. Each is below $1$ because $\eta\mu_i>0$, and each is above $-1$ because

$$\frac{\eta\mu_i}{N}\le\frac{\eta\mu_{\max}}{N}<2.$$

So $q<1$; this is exactly where $\eta<2N/\mu_{\max}$ is used.

Step 5, the residual converges to $0$: the iteration matrix is symmetric, so its operator norm is $q$, and $\|r_t\|\le q^t\|r_0\|$, which tends to $0$.

Step 6, the iterates converge: $K\alpha_t=XX^\top\alpha_t$, which is $Xw_t$, that is $y+r_t$. Hence $\alpha_t=K^{-1}(y+r_t)$, which tends to $K^{-1}y$, and $w_t=X^\top\alpha_t$ tends to $X^\top K^{-1}y$, that is to $w^*$.

Step 7, $w^*$ interpolates: $Xw^*=KK^{-1}y$, which is $y$.

Step 8, minimum norm and uniqueness: let $w$ be any interpolator and $u:=w-w^*$. Then $Xu=y-y$, that is $Xu=0$, so $u$ is orthogonal to every row $x_n$, hence to the row space, which contains $w^*=X^\top(K^{-1}y)$. By Pythagoras,

$$\|w\|^2=\|w^*\|^2+\|u\|^2\ge\|w^*\|^2,$$

with equality only for $u=0$. So $w^*$ is the unique interpolator of minimal norm.

Step 9, the norm: $K^{-1}$ is symmetric, so

$$\|w^*\|^2=y^\top K^{-1}XX^\top K^{-1}y=y^\top K^{-1}y.$$

**In words.** Gradient descent never leaves the row space of $X$. Inside the row space there is exactly one interpolator, and any component orthogonal to the data would only add norm, so the algorithm lands on the minimum-norm solution without being told to.

**Sanity check.** The step-size condition is sharp: numerically, $\eta=1.9N/\mu_{\max}$ converges to $w^*$ to $10^{-15}$, while $\eta=2.1N/\mu_{\max}$ diverges, since the eigenvalue $1-2.1$ lies outside $(-1,1)$. For $N=1$ the formula gives $w^*=y_1x_1/\|x_1\|^2$ with norm $|y_1|/\|x_1\|$, the obvious shortest solution of $\langle w,x_1\rangle=y_1$.

**What to write in the exam.**

- Span (2 pts): $w_t=X^\top\alpha_t$ by induction from $w_0=0$.
- Residual (3 pts): $r_{t+1}=(I-\frac{\eta}{N}K)r_t$; the eigenvalues $1-\eta\mu_i/N$ lie in $(-1,1)$ because $\eta<2N/\mu_{\max}$.
- Limit (1 pt): $\alpha_t=K^{-1}(y+r_t)$, which tends to $K^{-1}y$.
- Minimum norm (2 pts): $w=w^*+u$ with $Xu=0$; Pythagoras gives uniqueness; $\|w^*\|^2=y^\top K^{-1}y$.

*Verified: numpy with $N=5$, $d=12$: gradient descent with $\eta\in\{0.5,1,1.9\}\cdot N/\mu_{\max}$ reaches $w^*$ to within $10^{-15}$ and diverges for $2.1\cdot N/\mu_{\max}$; $\|w^*\|^2$ matches $y^\top K^{-1}y$; Pythagoras holds on 1000 random interpolators.*

**2. (8) Rademacher complexity of the ball and the resulting bound**

**What is asked.** Prove $R(\mathcal{H}_r\circ S)\le rX_S/\sqrt N$ and deduce the stated generalization bound. The answer is a proof.

**Tool and why.** Rademacher complexity of linear classes (cheat sheet §11): Cauchy–Schwarz gives the supremum over a ball in closed form, Jensen moves the expectation inside a square root, and independence of the $\xi_n$ kills the cross terms. The bound then follows from Thm 1 and the contraction lemma.

**Definitions.** Let $v_\xi:=\sum_{n}\xi_nx_n$, the random signed sum of the inputs. We introduce it because the supremum depends on $\xi$ only through this vector.

**Solution.**

Step 1, linearity: for $h_w$, $\sum_n\xi_nh_w(x_n)=\langle w,v_\xi\rangle$.

Step 2, the supremum: by Cauchy–Schwarz, $\langle w,v\rangle\le\|w\|\|v\|$, which is at most $r\|v\|$ on the ball. For $v\ne0$ equality holds at $w=rv/\|v\|$, and for $v=0$ both sides are $0$. So the supremum equals $r\|v_\xi\|$, and

$$R(\mathcal{H}_r\circ S)=\frac{r}{N}\,\mathbb{E}_\xi\|v_\xi\|.$$

Step 3, Jensen: the square root is concave, so

$$\mathbb{E}\|v_\xi\|=\mathbb{E}\sqrt{\|v_\xi\|^2}\le\sqrt{\mathbb{E}\|v_\xi\|^2}.$$

Step 4, the cross terms: $\mathbb{E}[\xi_n\xi_m]$ is $1$ for $n=m$ and $\mathbb{E}\xi_n\,\mathbb{E}\xi_m=0$ otherwise, by independence. So

$$\mathbb{E}\|v_\xi\|^2=\sum_{n,m}\mathbb{E}[\xi_n\xi_m]\langle x_n,x_m\rangle=\sum_n\|x_n\|^2\le NX_S^2.$$

Step 5, combining steps 2 to 4:

$$R(\mathcal{H}_r\circ S)\le\frac{r}{N}\sqrt N\,X_S=\frac{rX_S}{\sqrt N}.$$

Step 6, the loss is $1$-Lipschitz: the map $t\mapsto\min\{1,t\}$ is $1$-Lipschitz, and by the reverse triangle inequality

$$\big|\min\{1,|a|\}-\min\{1,|b|\}\big|\le\big||a|-|b|\big|\le|a-b|.$$

With $a=y-\hat y$ and $b=y-\hat y'$ this shows that $\ell(y,\cdot)$ is $1$-Lipschitz for every $y$.

Step 7, the bound: $\mathcal{H}_r$ depends only on $r$, so it is fixed before seeing $S$. Thm 1 and the contraction lemma with $\rho=1$ give $2R(\ell\circ\mathcal{H}_r\circ S)\le2rX_S/\sqrt N$, which is the stated display.

**In words.** A ball of linear predictors can correlate with random signs only as much as the longest direction of the signed data sum allows, and that sum grows like $\sqrt N$, not $N$, because the signs cancel on average.

**Sanity check.** Monte-Carlo with $N=20$, $d=8$, $r=1.5$ gives $R\approx0.883$, below $r\sqrt{\sum_n\|x_n\|^2}/N\approx0.906$, which is below $rX_S/\sqrt N\approx1.244$, as steps 3 and 4 predict. For $N=1$ the complexity is exactly $r\|x_1\|$ and the bound is tight.

**What to write in the exam.**

- Supremum (3 pts): $\sup_{\|w\|\le r}\langle w,v\rangle=r\|v\|$, so $R=\frac rN\mathbb{E}\|\sum_n\xi_nx_n\|$.
- Jensen and independence (3 pts): $\mathbb{E}\|v\|\le\sqrt{\mathbb{E}\|v\|^2}$, and the cross terms vanish.
- Deduction (2 pts): the clipped loss is $1$-Lipschitz; Thm 1 plus contraction with $\rho=1$.

*Verified: Monte-Carlo with $2\cdot10^5$ sign vectors (numpy) gives $0.8825$, $0.9064$ and $1.2440$ for the three quantities above; the Lipschitz inequality holds on $10^6$ random pairs.*

**3. (8) Doubling radii: a bound for every $w$ at once**

**What is asked.** Prove that with probability at least $1-\delta$ the stated bound holds simultaneously for every $w$, instantiate it at $w^*$, and say in one sentence what doubling radii gain and lose against integer radii. The answer is a proof, a formula and a sentence.

**Tool and why.** The weighted union bound (SRM) with Basel weights (cheat sheet §2), applied to part 2 on each class $\mathcal{H}_{2^k}$, then a choice of class for each $w$ (cheat sheet §11, norm-adaptive bounds). Doubling radii make the number of classes up to radius $\|w\|$ logarithmic in $\|w\|$.

**Definitions.** Let $E_k$ be the event that the conclusion of part 2 holds for $r=2^k$ with confidence $\delta_k$. For each $w$ let the *shell* $k(w)$ be $0$ if $\|w\|\le1$, and $\lceil\log_2\|w\|\rceil$ otherwise. We need $k(w)$ to point each $w$ to a class that contains it and is not much larger than its norm.

**Solution.**

Step 1, each event is likely: $\mathcal{H}_{2^k}$ depends only on $k$, so it is fixed before $S$, and part 2 says that $E_k$ fails with probability at most $\delta_k$.

Step 2, the weights sum to $\delta$: substituting $m=k+1$,

$$\sum_{k\ge0}\delta_k=\frac{6\delta}{\pi^2}\sum_{m\ge1}\frac1{m^2}=\delta.$$

Step 3, the union bound: the probability that some $E_k$ fails is at most $\sum_k\delta_k$, which is $\delta$. So with probability at least $1-\delta$ all events $E_k$ hold at once.

Step 4, the confidence term: $4/\delta_k=\frac{2\pi^2(k+1)^2}{3\delta}$, so

$$2\ln\frac4{\delta_k}=2\ln\frac{2\pi^2}{3\delta}+4\ln(k+1).$$

Step 5, the shell contains $w$: if $\|w\|\le1$, then $2^{k(w)}$ is $1$, at least $\|w\|$. Otherwise $\lceil\log_2\|w\|\rceil\ge\log_2\|w\|$, so $2^{k(w)}\ge\|w\|$. Either way $h_w\in\mathcal{H}_{2^{k(w)}}$.

Step 6, the shell is not too large: if $k(w)=0$, then $2^{k(w)}$ is $1$, at most $B(w)$. Otherwise $\lceil\log_2\|w\|\rceil<\log_2\|w\|+1$, so $2^{k(w)}<2\|w\|$, which is $B(w)$ because $\|w\|>1$. Either way $2^{k(w)}\le B(w)$; taking $\log_2$ and adding $1$ gives $k(w)+1\le\log_2(2B(w))$.

Step 7, assembling: on $E_{k(w)}$, using step 6 in both terms and the monotonicity of $\ln$,

$$\begin{aligned}
L_D(h_w)-L_S(h_w)&\le\frac{2\cdot2^{k(w)}X_S}{\sqrt N}+4\sqrt{\frac{2\ln\frac{2\pi^2}{3\delta}+4\ln(k(w)+1)}{N}}\\
&\le\frac{2B(w)X_S}{\sqrt N}+4\sqrt{\frac{2\ln\frac{2\pi^2}{3\delta}+4\ln\log_2(2B(w))}{N}}.
\end{aligned}$$

Since all $E_k$ hold together (step 3), this holds for every $w$ simultaneously, including weights that depend on $S$.

Step 8, the instantiation: $w^*$ interpolates (part 1), so every training loss is $\min\{1,0\}=0$ and $L_S(h_{w^*})=0$. With probability at least $1-\delta$,

$$L_D(h_{w^*})\le\frac{2B(w^*)X_S}{\sqrt N}+4\sqrt{\frac{2\ln\frac{2\pi^2}{3\delta}+4\ln\log_2(2B(w^*))}{N}},$$

with $\|w^*\|=\sqrt{y^\top K^{-1}y}$ inside $B(w^*)$.

Step 9, gain and loss: with integer radii (Lecture 6, Prop 3) the confidence term pays $\ln((\|w\|+1)^2)$, about $2\ln\|w\|$, while doubling radii pay only $4\ln\log_2(2B(w))$, a $\ln\log$ price; the cost is up to a factor $2$ in the leading complexity term, $B(w)$ up to $2\|w\|$ instead of $\|w\|+1$.

**In words.** We buy one guarantee per scale of norm rather than one per integer, so far fewer guarantees are needed up to a given norm and each one is cheaper; the price is that a norm just above a power of $2$ is rounded up to almost twice its size.

**Sanity check.** For $\|w\|=5$: $k(w)=3$, the class radius $8$ contains $w$, $B(w)=10$, and $k(w)+1$, which is $4$, is at most $\log_2 20$, about $4.32$. For $\|w\|=0.7$: $k(w)=0$ and $B(w)=1.4$. For $\|w\|=4$ exactly: $k(w)=2$ and the radius $4$ is attained.

**What to write in the exam.**

- Union (3 pts): part 2 on each $\mathcal{H}_{2^k}$ with $\delta_k$; the Basel sum gives total failure probability $\delta$; $4/\delta_k=\frac{2\pi^2(k+1)^2}{3\delta}$.
- Shell (3 pts): $k(w)=\lceil\log_2\|w\|\rceil$ (or $0$), so $\|w\|\le2^{k(w)}$ and $2^{k(w)}\le B(w)$.
- Assembly and instantiation (2 pts): substitute, $L_S(h_{w^*})=0$; gain $\ln\log$ in the confidence term, lose up to a factor $2$ in the complexity term.

*Verified: the Basel partial sum up to $10^6$ is $0.9999994$; the identity for $4/\delta_k$ holds for $k=0,\dots,4$; the shell inequalities hold on $11000$ random norms including exact powers of $2$ (numpy).*

**4.a (3) Teacher labels: a dimension-free bound**

**What is asked.** Prove $\|w^*\|\le\|w^\circ\|$ when the labels come from a teacher $w^\circ$, write the resulting bound on $L_D(h_{w^*})$, and note that it does not depend on $d$. The answer is a short proof and a formula.

**Tool and why.** The minimum-norm property of part 1 (cheat sheet §12) and the monotonicity of the part-3 bound in $B$.

**Definitions.** Let $B^\circ:=\max\{1,2\|w^\circ\|\}$, the value of $B$ at the teacher. We name it to keep the final formula short.

**Solution.**

Step 1, the teacher interpolates: $Xw^\circ=y$ by assumption, so $w^\circ$ is one of the interpolators of part 1, and $\|w^*\|\le\|w^\circ\|$.

Step 2, comparison of $B$: $t\mapsto\max\{1,2t\}$ is non-decreasing, so $B(w^*)\le B^\circ$.

Step 3, the bound: both terms of the part-3 bound are non-decreasing in $B$, and $L_S(h_{w^*})=0$, so with probability at least $1-\delta$

$$L_D(h_{w^*})\le\frac{2B^\circ X_S}{\sqrt N}+4\sqrt{\frac{2\ln\frac{2\pi^2}{3\delta}+4\ln\log_2(2B^\circ)}{N}}.$$

Step 4, no dimension: $d$ appears nowhere. The bound is meaningful once $N$ is much larger than $(B^\circ X_S)^2$, even when $d$ is far larger than $N$.

**In words.** The implicit bias of gradient descent toward small norm is what lets a norm-based bound control a heavily over-parameterized model: the learned norm is never larger than the norm of whatever produced the labels.

**Sanity check.** Numerically, with $N=6$, $d=30$ and a random teacher, $\|w^*\|\approx1.85$ while $\|w^\circ\|\approx5.57$. Equality would hold when $w^\circ$ already lies in the row space of $X$.

**What to write in the exam.**

- Comparison (2 pts): $w^\circ$ interpolates, so $\|w^*\|\le\|w^\circ\|$ by part 1.
- Bound (1 pt): substitute $B^\circ$ into part 3 with $L_S(h_{w^*})=0$; no $d$ appears.

*Verified: numpy with $N=6$, $d=30$ and a random teacher computes both norms.*

**4.b (3) Orthonormal inputs and random labels: a deserved vacuity**

**What is asked.** For $x_n=e_{j_n}$ with distinct indices and labels $\pm1$, compute $\|w^*\|$, show the part-3 bound exceeds $1$ for every $N$, compute $L_D(h_{w^*})$ exactly under the given $D$, and explain why the vacuity is deserved. The answer is two numbers, a formula and a sentence.

**Tool and why.** Part 1 with $K=I_N$, then a direct expectation over the test point; the random-label phenomenon of Zhang et al. explains the result (cheat sheet §12).

**Definitions.** Let $J:=\{j_1,\dots,j_N\}$, the set of coordinates seen in training.

**Solution.**

Step 1, the kernel: $\langle e_{j_n},e_{j_m}\rangle$ is $1$ for $n=m$ and $0$ otherwise, because the indices are distinct. So $K=I_N$.

Step 2, the interpolator: $w^*=X^\top y$, that is $\sum_ny_ne_{j_n}$, so $\|w^*\|^2=\sum_ny_n^2$, which is $N$, and $\|w^*\|=\sqrt N$.

Step 3, the constants: $B(w^*)=\max\{1,2\sqrt N\}$, which is $2\sqrt N$ because $N\ge1$, and $X_S=1$.

Step 4, vacuity: the complexity term alone is $2\cdot2\sqrt N\cdot1/\sqrt N$, which is $4$, and the other term is non-negative. The loss lies in $[0,1]$, so $L_D\le1$ always, and a bound above $4$ says nothing, for every $N$ and $\delta$.

Step 5, the prediction at a test point $(e_j,y)$: $h_{w^*}(e_j)$ is the $j$-th coordinate of $w^*$, that is $y_n$ if $j=j_n\in J$ and $0$ if $j\notin J$.

Step 6, a seen coordinate (probability $N/d$): the prediction is $y_n\in\{\pm1\}$ and the fresh label is independent and uniform. With probability $\frac12$ they agree (loss $0$); otherwise $|y-y_n|=2$ and the loss is $\min\{1,2\}=1$. The expected loss is $\frac12$.

Step 7, an unseen coordinate (probability $1-N/d$): the prediction is $0$ and the loss is $\min\{1,|y|\}=1$.

Step 8, the total:

$$L_D(h_{w^*})=\frac{N}{d}\cdot\frac12+\Big(1-\frac{N}{d}\Big)=1-\frac{N}{2d}.$$

Step 9, why the vacuity is deserved: for any prediction $p$, the two possible losses $\min\{1,|1-p|\}$ and $\min\{1,|1+p|\}$ sum to at least $1$ (if both are below $1$ they equal $|1-p|$ and $|1+p|$, whose sum is at least $2$). So every predictor has $L_D\ge\frac12$: the labels are pure noise and nothing can be learned. The interpolator does no better than chance, and its large norm $\sqrt N$, the cost of memorizing random labels, is exactly what the bound reports (Zhang et al.: the same algorithm on random labels gives a large norm and a loose bound).

**In words.** A bound that is valid for every distribution must be large when the algorithm memorizes noise; here it is large for the right reason, namely the norm that memorization requires.

**Sanity check.** With $d=10$ and $N=3$ the formula gives $\frac{17}{20}$; with $N=6$ and $d=6$ every coordinate is seen and the loss is $\frac12$, half the predictions being wrong. Exact enumeration agrees in both cases.

**What to write in the exam.**

- Norm (1 pt): $K=I_N$, $w^*=\sum_ny_ne_{j_n}$, $\|w^*\|=\sqrt N$, so the complexity term is $4$.
- Exact loss (1 pt): $\frac Nd\cdot\frac12+(1-\frac Nd)\cdot1=1-\frac N{2d}$.
- Deserved (1 pt): random labels, every predictor has $L_D\ge\frac12$; the norm $\sqrt N$ records memorization.

*Verified: exact enumeration with fractions for $(d,N)=(10,3),(6,6),(50,20)$ gives $1-N/(2d)$ and $\|w^*\|=\sqrt N$; a grid over $p$ confirms that the expected loss of any prediction is at least $\frac12$ (python).*

**Common mistakes.**

- Assuming that gradient descent converges, as Lecture 7 does, instead of proving it with the residual contraction (costs 3 points), or not arguing uniqueness (costs 1 point).
- Dropping the $\frac1N$ in $R$, or applying Jensen in the wrong direction; the correct direction is $\mathbb{E}\|v\|\le\sqrt{\mathbb{E}\|v\|^2}$.
- Choosing non-summable $\delta_k$ (for example the same $\delta$ for every $k$), or rounding $\log_2\|w\|$ down so that the shell does not contain $w$, or forgetting the case $\|w\|\le1$.

**💡 Useful tricks:** Iterates stay in $\mathrm{rowspan}(X)$; the residual contracts by $I - \frac{\eta}{N}K$, whose spectrum lies in $(-1,1)$ iff $\eta < 2N/\mu_{\max}$; then $\alpha_t = K^{-1}(y + r_t)$. For the ball, $\sup\langle w, v\rangle = r\|v\|$, Jensen on the square, and the cross terms vanish. Doubling radii $2^k$ with Basel weights $\frac{6\delta}{\pi^2(k+1)^2}$ give a $\ln\log$ price; choose the shell with $\|w\| \le 2^k$ and $2^k \le \max\{1, 2\|w\|\}$. Min-norm $\le$ teacher norm gives a dimension-free bound.

**⚠️ Watch out:** (1) prove convergence (step-size condition), don't assume it, and argue uniqueness via Pythagoras. (2) Keep the $\frac1N$ in $R$, apply Jensen as $\mathbb E\|\cdot\| \le \sqrt{\mathbb E\|\cdot\|^2}$, and check the clipped loss is $1$-Lipschitz. (3) $\delta_k$ must be summable, and the shell must *contain* $w$ (round $\log_2$ up); treat $\|w\| \le 1$ separately. (4b) vacuity is not a flaw here: with random labels $L_D = 1 - N/2d$, and the norm $\sqrt N$ honestly records memorization.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1 only $w_i > 0$ treated (right-closed steps and constant neurons
  missed); Q1.2 the skip term $\alpha x$ ignored, or c\_2024's $B+1$ pieces quoted outside its
  hypotheses; Q1.3 construction without an invariant proof; Q1.4 condition (1) omitted; Q1.5
  missing that $F$ is arbitrary; Q2.1 critical point without a strictly better point, or
  Hessian claimed zero without the degree argument; Q2.2 transposes flipped
  ($W_{j+1} W_{j+1}^\top$) or no symmetrization; Q2.3 $\pi = s^{(N-1)/2}$ instead of
  $\pi^2 = s^{N-1}$, or the factor $N-1$ in $\dot\pi$ missing; Q2.4 $\|w(t)\| \ge c$ used
  without proof; Q2.5 "cannot cross $0$" without the uniqueness argument at the origin;
  Q3.1 convergence assumed instead of proved; Q3.2
  missing $\frac1N$ or Jensen reversed; Q3.3 non-summable $\delta_k$ or a shell not containing
  $w$; Q3.4b calling the vacuity a weakness of the bound.
