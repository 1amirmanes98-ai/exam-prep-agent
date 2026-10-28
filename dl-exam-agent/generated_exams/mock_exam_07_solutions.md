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

## Q2 — Learning a $k$-step memory with a scalar linear RNN (35)

**Hint:** Unroll the recursion once and the loss becomes a function of the single product
$c\lambda^k$. Weight sharing makes $\lambda$ behave like $k$ tied layers, so ask how
$\frac{d}{dt}\lambda^2$ and $\frac{d}{dt}c^2$ compare. Then look for a line in parameter
space that the flow cannot leave (or enter). For convergence, write an ODE for the residual
itself and ask which way $\lambda$ and $c$ move while the sign of the residual is frozen.

**Full solution:**

**1. (6) Unrolling the RNN and the gradient flow**

**What is asked.** Prove the closed form of $s_L$, deduce the loss for the one-hot input, and derive the two flow equations. The answer is an induction and a derivative computation.

**Tool and why.** Induction on $t$ for the recursion, then the chain rule and the definition of gradient flow (cheat sheet §7). The recursion is linear, so unrolling it gives a polynomial in $\lambda$, and the one-hot input keeps a single term.

**Definitions.** As in the statement, $r:=c\lambda^k-y$ is the residual; we use it as a function of $(\lambda,c)$ as well as along the trajectory.

**Solution.**

**Claim.** For every $t\in[L]$, $s_t=\sum_{\tau=1}^{t}\lambda^{t-\tau}x_\tau$. We prove it by induction on $t$, upward from $1$.

**Base.** For $t=1$: $s_1=\lambda\cdot0+x_1$, which is $x_1$, and the sum has the single term $\lambda^0x_1$, which is $x_1$ by the convention $\lambda^0:=1$.

**Hypothesis.** The formula holds for $t-1$.

**Step.** Substituting the hypothesis into the recursion,

$$\begin{aligned}
s_t&=\lambda s_{t-1}+x_t\\
&=\sum_{\tau=1}^{t-1}\lambda^{t-\tau}x_\tau+\lambda^{0}x_t\\
&=\sum_{\tau=1}^{t}\lambda^{t-\tau}x_\tau.
\end{aligned}$$

At $t=L$ this is the claimed formula for $s_L$.

Step 2, the one-hot input: $k\in\{2,\dots,L-1\}$ gives $L-k\in\{1,\dots,L-2\}$, a valid position. For $x=e_{L-k}$ only $\tau=L-k$ survives, with power $L-(L-k)$, which is $k$. So $s_L=\lambda^k$, the output is $c\lambda^k$, and

$$\ell(\lambda,c)=\tfrac12\big(c\lambda^k-y\big)^2.$$

Step 3, the partial derivatives: by the chain rule, the outer derivative is $r$ and the inner derivatives of $c\lambda^k$ are $kc\lambda^{k-1}$ and $\lambda^k$:

$$\partial_\lambda\ell=k\,c\,\lambda^{k-1}\,r,\qquad\partial_c\ell=\lambda^k\,r.$$

Step 4, the flow: gradient flow negates the gradient, which gives

$$\dot\lambda=-k\,c\,\lambda^{k-1}\,r,\qquad\dot c=-\lambda^k\,r.$$

**In words.** An impulse $k$ steps in the past passes through $k$ multiplications by the same $\lambda$ before it reaches the output. Weight sharing makes $\lambda$ act like $k$ tied layers, and that is where the factor $k$ in $\dot\lambda$ comes from.

**Sanity check.** At an interpolating point $r=0$ both derivatives vanish, as they must at a global minimum. Formally setting $k=1$ gives the two-layer scalar factorization $c\lambda$, whose flow is $\dot\lambda=-cr$ and $\dot c=-\lambda r$, the familiar form.

**What to write in the exam.**

- Closed form (2 pts): induction on $t$, with base $s_1=x_1$ and step $s_t=\lambda s_{t-1}+x_t$.
- Loss (1 pt): only $\tau=L-k$ survives, so $s_L=\lambda^k$ and $\ell=\tfrac12(c\lambda^k-y)^2$.
- Gradients (3 pts): $\partial_\lambda\ell=kc\lambda^{k-1}r$ and $\partial_c\ell=\lambda^kr$; negate them.

*Verified: sympy unrolls the recursion for $L=3,\dots,6$, confirms $s_L=\lambda^k$ for every admissible $k$, and differentiates $\ell$ for $k=2,\dots,6$.*

**2. (7) A line of critical points, non-convexity, and stagnation**

**What is asked.** Show that every $(0,c)$ is a critical point with loss $y^2/2$, that $\min\ell=0$, that $\ell$ is not convex, and that a flow started at $\lambda_0=0$ keeps the loss at $y^2/2$. The answer is four short proofs.

**Tool and why.** "Convex plus critical point gives a global minimum", used in the contrapositive (cheat sheet §7), and uniqueness of solutions of the flow for the stagnation claim.

**Definitions.** No new notation.

**Solution.**

Step 1, the gradient on the line $\lambda=0$: since $k\ge2$, the exponent $k-1$ is at least $1$, so $\lambda^{k-1}=0$ and $\lambda^k=0$ at $\lambda=0$. Both partial derivatives of part 1 carry one of these factors, so both vanish: every $(0,c)$ is critical.

Step 2, the loss there: $\ell(0,c)=\tfrac12(c\cdot0-y)^2$, which is $y^2/2$.

Step 3, the global minimum: $\ell\ge0$, and $\ell(1,y)=\tfrac12(y-y)^2$, which is $0$. So $\min\ell=0$.

Step 4, non-convexity: for a differentiable convex $f$ and a critical point $z_0$, the gradient inequality gives

$$f(z)\ge f(z_0)+\nabla f(z_0)^\top(z-z_0)=f(z_0)$$

for every $z$, so every critical point is a global minimum. The point $(0,c)$ is critical with value $y^2/2$, which is positive because $y>0$, while the minimum is $0$. So $\ell$ is not convex.

Step 5, stagnation: consider the constant curve $(\lambda(t),c(t))\equiv(0,c_0)$. Its derivative is $0$, and by step 1 the right-hand side of the flow at $(0,c_0)$ is also $0$, so it solves the flow from $(0,c_0)$. By uniqueness it is *the* solution, and the loss stays $y^2/2$ for all $t\ge0$.

**In words.** With no recurrence the impulse never reaches time $L$, so the output is $0$ whatever $c$ is. The derivative in $\lambda$ also vanishes there, because of the factor $\lambda^{k-1}$, so the flow has no reason to start moving: the line is a flat trap.

**Sanity check.** A direct midpoint test: $\ell(1,y)=0$, and the point $(-1,(-1)^ky)$ also has loss $0$, since its output is $(-1)^ky(-1)^k$, which is $y$. Their midpoint is $(0,(y+(-1)^ky)/2)$, on the critical line, with loss $y^2/2$, larger than the average $0$ of the endpoints, which a convex function cannot do.

**What to write in the exam.**

- Critical line (3 pts): at $\lambda=0$ both partials carry $\lambda^{k-1}$ or $\lambda^k$, so they vanish, and $\ell(0,c)=y^2/2$.
- Non-convexity (2 pts): $\ell(1,y)=0$; for a convex function every critical point would be a global minimum.
- Stagnation (2 pts): $(0,c_0)$ is a constant solution, so by uniqueness it is the flow, and $\ell\equiv y^2/2$.

*Verified: sympy confirms both partials vanish at $\lambda=0$ for $k=2,\dots,6$ and $\ell(1,y)=0$; python checks the midpoint example for $k=2,\dots,6$; RK4 from $(0,0.7)$ stays at its start.*

**3. (8) The conserved quantity, the sign of $\lambda$, and the trap**

**What is asked.** Prove that $\lambda^2-kc^2$ is constant, that $\lambda$ never vanishes and keeps its sign when $\lambda_0\ne0$, and deduce that in the stated regime the loss stays above $y^2/2$. The answer is three proofs.

**Tool and why.** A balancedness-type conservation law, obtained by differentiating along the flow (cheat sheet §8); uniqueness of solutions and the intermediate value theorem for the signs.

**Definitions.** Let $D:=\lambda_0^2-kc_0^2$, the value of the conserved quantity. We name it because the trap regime is exactly $D<0$ with $\lambda_0>0$ and $c_0<0$.

**Solution.**

Step 1, the derivative of $\lambda^2$: by the flow of part 1,

$$\frac{d}{dt}\lambda^2=2\lambda\dot\lambda=-2k\,c\lambda^kr.$$

Step 2, the derivative of $kc^2$:

$$\frac{d}{dt}(kc^2)=2kc\,\dot c=-2k\,c\lambda^kr.$$

Step 3, conservation: the two derivatives are equal, so $\frac{d}{dt}(\lambda^2-kc^2)=0$ and $\lambda(t)^2-kc(t)^2$ equals $D$ for all $t$. (This is balancedness with the factor $k$ coming from the tied weights; the untied depth-$(k+1)$ version gives $w_i^2-w_j^2$, as in c\_2024 Q2.)

Step 4, $\lambda$ cannot reach $0$: suppose $\lambda(t_1)=0$ for some $t_1$. The constant curve $(0,c(t_1))$ solves the flow (part 2, step 5) and passes through the same point at time $t_1$. By uniqueness, forward and backward in time, the trajectory is that constant curve for all times, so $\lambda_0=0$. Hence $\lambda_0\ne0$ implies $\lambda(t)\ne0$ for all $t$.

Step 5, the sign of $\lambda$: $\lambda(t)$ is continuous and never $0$, so by the intermediate value theorem it keeps the sign of $\lambda_0$.

Step 6, $c$ keeps its sign in the trap regime: assume $\lambda_0>0$, $c_0<0$ and $D<0$. By conservation,

$$k\,c(t)^2=\lambda(t)^2-D\ge-D>0,$$

so $c$ never vanishes, and by the intermediate value theorem $c(t)<0$ for all $t$.

Step 7, the loss: $\lambda(t)>0$ by step 5 and $c(t)<0$ by step 6, so the output $c\lambda^k$ is negative. Hence $r=c\lambda^k-y$ is below $-y$, so $|r|>y$ and $\ell=r^2/2$ is above $y^2/2$ for every $t\ge0$. Gradient flow never reaches the global minimum, where $\ell=0$.

**In words.** The conserved quantity confines the trajectory to one branch of the hyperbola $\lambda^2-kc^2=D$. When $D<0$ that branch never crosses $c=0$, so with $\lambda>0$ and $c<0$ the network always outputs the wrong sign, which is worse than outputting $0$.

**Sanity check.** From $(\lambda_0,c_0)=(0.5,-0.8)$ with $k=2$, $y=1$: $D=0.25-1.28$, which is $-1.03$. Numerically the loss stays above $0.5$ (its minimum is $0.50000008$) while $\lambda\to0$ and $c$ tends to $-\sqrt{1.03/2}$, about $-0.718$. In contrast, from $(1.5,-0.5)$, where $D=1.75$ is positive, $c$ crosses $0$ and the loss reaches $8\cdot10^{-27}$.

**What to write in the exam.**

- Conservation (3 pts): $\frac{d}{dt}\lambda^2$ and $\frac{d}{dt}(kc^2)$ both equal $-2kc\lambda^kr$.
- Sign of $\lambda$ (2 pts): if $\lambda(t_1)=0$, uniqueness backward in time forces $\lambda_0=0$; then the intermediate value theorem.
- Trap (3 pts): $kc^2\ge-D$ and $-D>0$, so $c<0$ forever; with $\lambda>0$ the residual is below $-y$, so $\ell>y^2/2$.

*Verified: sympy confirms that the time derivative of $\lambda^2-kc^2$ vanishes for $k=2,\dots,6$; RK4 with step $10^{-4}$ keeps the drift below $3\cdot10^{-11}$ on seven runs, and three trap starts keep the loss above $y^2/2$.*

**4.a (2) The residual equation and its sign**

**What is asked.** Prove that $\dot r=-P(t)\,r$ with the given $P\ge0$, and that $r$ never changes sign. The answer is a computation and a short argument.

**Tool and why.** The chain rule on $r=c\lambda^k-y$, then the integrating factor for a scalar linear ODE (cheat sheet §9). A linear equation in $r$ with a non-negative coefficient can shrink $r$ but never push it through $0$.

**Definitions.** Let $I(t):=\int_0^tP(s)\,ds$, the accumulated rate. We introduce it as the exponent of the integrating factor.

**Solution.**

Step 1, the chain rule: $\dot r=\lambda^k\dot c+kc\lambda^{k-1}\dot\lambda$.

Step 2, substitute the flow of part 1 and factor out $\lambda^{2k-2}$:

$$\begin{aligned}
\dot r&=\lambda^k(-\lambda^kr)+kc\lambda^{k-1}(-kc\lambda^{k-1}r)\\
&=-\lambda^{2k}r-k^2c^2\lambda^{2k-2}r\\
&=-\lambda^{2k-2}\big(\lambda^2+k^2c^2\big)r\\
&=-P\,r.
\end{aligned}$$

Step 3, $P\ge0$: $2k-2$ is even, so $\lambda^{2k-2}\ge0$, and $\lambda^2+k^2c^2$ is a sum of squares.

Step 4, the sign: by the product rule and step 2,

$$\frac{d}{dt}\big(r\,e^{I(t)}\big)=(\dot r+Pr)\,e^{I(t)}=0,$$

so $r(t)=r(0)\,e^{-I(t)}$. The exponential is positive, so $r(t)$ has the sign of $r(0)$ for all $t$ (and $r\equiv0$ if $r(0)=0$).

**In words.** The residual decays at the instantaneous rate $P(t)$, but the decay is multiplicative, so it can never overshoot through zero.

**Sanity check.** On the line $\lambda=0$ we get $P=0$, so $r$ is frozen at $-y$, which matches the stagnation of part 2.

**What to write in the exam.**

- Chain rule: $\dot r=\lambda^k\dot c+kc\lambda^{k-1}\dot\lambda$, which simplifies to $-Pr$.
- Sign: $P\ge0$ and $r(t)=r(0)e^{-\int_0^tP}$.

*Verified: sympy confirms $\dot r+Pr=0$ identically for $k=2,\dots,6$.*

**4.b (5) Under-fitting start**

**What is asked.** For $c_0\lambda_0^k<y$, prove that $\lambda$ and $c$ are non-decreasing and that the loss decays at least like $e^{-2P_0t}$. The answer is a proof.

**Tool and why.** The frozen signs of $r$ (part 4.a) and of $\lambda$ (part 3) fix the direction of motion of both parameters; then a lower bound on $P$ gives an exponential rate, as in PL-type arguments (cheat sheet §9).

**Definitions.** $P_0$ and $I(t)$ as above; note that $P_0$ is $P$ evaluated at time $0$.

**Solution.**

Step 1, the sign of $r$: $r(0)=c_0\lambda_0^k-y$ is negative, so $r(t)<0$ for all $t$ by 4.a.

Step 2, the sign of $\lambda$: $\lambda_0>0$, so $\lambda(t)>0$ for all $t$ by part 3.

Step 3, $c$ increases: $\dot c=-\lambda^kr$, and both $\lambda^k$ and $-r$ are positive, so $\dot c>0$ and $c(t)\ge c_0$, which is positive.

Step 4, $\lambda$ increases: $\dot\lambda=-kc\lambda^{k-1}r$, and $c>0$ (step 3), $\lambda^{k-1}>0$ and $-r>0$, so $\dot\lambda>0$ and $\lambda(t)\ge\lambda_0$.

Step 5, the rate is at least $P_0$: for positive $\lambda,c$ both factors $\lambda^{2k-2}$ and $\lambda^2+k^2c^2$ are non-decreasing in $\lambda$ and in $c$, so steps 3 and 4 give $P(t)\ge P_0$, hence $I(t)\ge P_0t$.

Step 6, the loss: by 4.a,

$$\begin{aligned}
\ell(t)&=\tfrac12r(t)^2\\
&=\tfrac12r(0)^2e^{-2I(t)}\\
&\le\ell(\lambda_0,c_0)\,e^{-2P_0t}.
\end{aligned}$$

**In words.** Once both parameters move up, the problem only becomes better conditioned, because $P$ grows with $\lambda$ and $c$. So the rate at the start is a guaranteed worst case for the whole run.

**Sanity check.** For $k=2$, $y=1$ and $(\lambda_0,c_0)=(0.5,0.5)$: $P_0=0.25\cdot(0.25+4\cdot0.25)$, which is $0.3125$, so the guaranteed rate $2P_0$ is $0.625$. This is also the value of part 5's formula $2(1+k^2)\varepsilon^{2k}$ at $\varepsilon=0.5$, as it should be.

**What to write in the exam.**

- Monotonicity (2 pts): $r<0$ by 4.a and $\lambda>0$ by part 3, so $\dot c>0$ and then $\dot\lambda>0$.
- Rate (1 pt): $P(t)\ge P_0$ because $P$ is non-decreasing in positive $\lambda$ and $c$.
- Bound (2 pts): $\ell(t)=\ell(0)e^{-2\int_0^tP}$, at most $\ell(0)e^{-2P_0t}$.

*Verified: RK4 on four under-fitting starts with $k\in\{2,3,4\}$ shows $\lambda$ and $c$ non-decreasing on the whole grid and the loss below the envelope $\ell(0)e^{-2P_0t}$.*

**4.c (3) Over-fitting start**

**What is asked.** For $c_0\lambda_0^k>y$, prove that the loss decays at least like $e^{-2y^2t/c_0^2}$. The answer is a proof.

**Tool and why.** Part 4.a again (cheat sheet §9), but the lower bound on $P$ must now come from the output $c\lambda^k$ staying above $y$, because both parameters decrease.

**Definitions.** No new notation.

**Solution.**

Step 1, the signs: $r(0)>0$, so $r(t)>0$ for all $t$ by 4.a, and $\lambda(t)>0$ by part 3.

Step 2, $c$ decreases: $\dot c=-\lambda^kr$ is negative, so $c(t)\le c_0$.

Step 3, $c$ stays positive: $c\lambda^k=y+r$, which exceeds $y$ because $r>0$, so it is positive; since $\lambda^k>0$, this forces $c>0$. (Then also $\dot\lambda=-kc\lambda^{k-1}r$ is negative: both parameters decrease.)

Step 4, a lower bound on $\lambda^k$: dividing $c\lambda^k>y$ by $c>0$ and using $c\le c_0$,

$$\lambda(t)^k>\frac{y}{c(t)}\ge\frac{y}{c_0}.$$

Step 5, a lower bound on $P$: drop the non-negative term $k^2c^2\lambda^{2k-2}$ from $P$:

$$P=\lambda^{2k}+k^2c^2\lambda^{2k-2}\ge\lambda^{2k}>\frac{y^2}{c_0^2}.$$

Step 6, the loss: as in 4.b, $\ell(t)=\ell(0)e^{-2I(t)}$ with $I(t)\ge y^2t/c_0^2$, which gives the stated bound.

**In words.** Here the parameters shrink, so the monotonicity of 4.b cannot be reused. But the output never drops below the target, which keeps $\lambda^k$ bounded away from $0$ and the rate bounded below.

**Sanity check.** For $k=2$, $y=1$ and $(\lambda_0,c_0)=(1.5,1.2)$ the guaranteed rate $2y^2/c_0^2$ is about $1.39$, and the numerical loss stays below the envelope and reaches $9\cdot10^{-23}$ by $t=5$.

**What to write in the exam.**

- Signs (1 pt): $r>0$ by 4.a, $\lambda>0$ by part 3, so $c$ decreases.
- Lower bound (1 pt): $c\lambda^k>y$ gives $c>0$ and $\lambda^k>y/c_0$.
- Rate (1 pt): $P\ge\lambda^{2k}$ and $\lambda^{2k}>y^2/c_0^2$, then 4.a.

*Verified: RK4 on three over-fitting starts shows $\lambda$ and $c$ non-increasing and the loss below the envelope $\ell(0)e^{-2y^2t/c_0^2}$.*

**5. (4) Vanishing gradients**

**What is asked.** At the initialization $(\lambda_0,c_0)=(\varepsilon,\varepsilon)$ bound the gradient norm, compute the rate of 4.b, and interpret the result for long memories. The answer is two formulas and an interpretation.

**Tool and why.** Substitution into the gradient of part 1 and into $P_0$ of 4.b (cheat sheet §9).

**Definitions.** Let $r_0:=\varepsilon^{k+1}-y$, the residual at initialization.

**Solution.**

Step 1, 4.b applies: $\varepsilon^{k+1}$ is positive and below $1$, while $y\ge1$, so

$$-y<r_0<0.$$

In particular $c_0\lambda_0^k<y$ and $|r_0|<y$.

Step 2, the gradient: by part 1, $\partial_\lambda\ell=k\varepsilon\cdot\varepsilon^{k-1}r_0$, which is $k\varepsilon^kr_0$, and $\partial_c\ell=\varepsilon^kr_0$. So

$$\|\nabla\ell(\varepsilon,\varepsilon)\|=|r_0|\,\varepsilon^k\sqrt{k^2+1}.$$

Step 3, the bound: $\sqrt{k^2+1}\le k+1$ because $k^2+1\le k^2+2k+1$, and $|r_0|<y$ by step 1. Hence

$$\|\nabla\ell(\varepsilon,\varepsilon)\|\le(k+1)\,y\,\varepsilon^k.$$

Step 4, the rate: substituting $(\lambda_0,c_0)=(\varepsilon,\varepsilon)$ into $P_0$,

$$2P_0=2\varepsilon^{2k-2}(\varepsilon^2+k^2\varepsilon^2)=2(1+k^2)\varepsilon^{2k}.$$

Step 5, interpretation: both the gradient and the guaranteed rate are exponentially small in the lag $k$. With small recurrent weights the gradient signal from an impulse $k$ steps back decays like $\varepsilon^k$, so a long-range memory is learned slowly; this is the vanishing-gradient phenomenon.

**In words.** The learning signal travels back through the same $k$ multiplications by $\lambda$ as the forward signal, so a small $\lambda$ damps it $k$ times. The stagnation at $\lambda_0=0$ in part 2 is the limit $\varepsilon\to0$ of this picture.

**Sanity check.** At $\varepsilon=0.5$ the rate $2(1+k^2)\varepsilon^{2k}$ is $0.625$ for $k=2$, about $0.051$ for $k=5$ and about $1.9\cdot10^{-4}$ for $k=10$: a lag of $10$ already makes learning thousands of times slower than a lag of $2$.

**What to write in the exam.**

- Applicability: $r_0=\varepsilon^{k+1}-y$ lies in $(-y,0)$, so 4.b applies.
- Gradient (part of 3 pts): $|r_0|\varepsilon^k\sqrt{k^2+1}\le(k+1)y\varepsilon^k$.
- Rate (part of 3 pts): $2P_0=2(1+k^2)\varepsilon^{2k}$.
- Interpretation (1 pt): exponentially small in $k$, the vanishing-gradient phenomenon.

*Verified: sympy simplifies the squared gradient norm at $(\varepsilon,\varepsilon)$ to $(\varepsilon^{k+1}-y)^2\varepsilon^{2k}(k^2+1)$ and $2P_0$ to $2(1+k^2)\varepsilon^{2k}$ for $k=2,\dots,6$; python evaluates the rates at $\varepsilon=0.5$.*

**Common mistakes.**

- Dropping the factor $k$ in $\dot\lambda$ (costs 1 point). It also breaks part 3: one would "conserve" $\lambda^2-c^2$, which is false.
- Claiming that $\lambda^2$ or $c^2$ alone is conserved, or arguing that "$\lambda$ cannot cross $0$ because the gradient is small near $0$" instead of using uniqueness backward in time.
- In 4.b, using positivity of $\lambda$ and $c$ without justification (costs 2 points); in 4.c, reusing the monotonicity of 4.b although the parameters now decrease.

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
  missing that $F$ is arbitrary; Q2.1 missing factor $k$; Q2.2 critical point without a
  strictly better point; Q2.3 claiming $\lambda^2$ conserved, or no uniqueness argument for
  the sign of $\lambda$; Q2.4 positivity of $\lambda, c$ assumed without proof, or over-fit
  case treated like the under-fit one; Q3.1 convergence assumed instead of proved; Q3.2
  missing $\frac1N$ or Jensen reversed; Q3.3 non-summable $\delta_k$ or a shell not containing
  $w$; Q3.4b calling the vacuity a weakness of the bound.
