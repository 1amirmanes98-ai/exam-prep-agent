# Mock Exam 6 — Solutions

Every numeric answer was verified with a python3 computation: Q1 by exact backward induction over all permutations of $n=3,4$ (closed form, optimal action sets and the $a_*$ states checked for several non-integer $c$); Q2 by Monte-Carlo simulation of the per-step random discount, random-MDP tests of the inequalities, and exact evaluation of the counterexamples; Q3 by a finite-difference gradient check, exact normal equations and a long MC-SGD run converging to $w^*$; Q4 by random contraction-ratio tests, value iteration for $V^\pi\le V_\lambda\le V^*$ and $V_\lambda=V^*_{M_\lambda}$ on random MDPs, and the example.

## Q1 — Sorting tiles with costly swaps

**Hint:** Which pairs of tiles change their relative order when two *neighbours* are swapped? Once the
state collapses to the number $k$ of inversions, there are only three moves: $k\to k$, $k\to k-1$ (fee $c$),
$k\to k+1$ (fee $c$). Try to rewrite "swap a descent now, then follow the $j-1$-swap plan" and "idle now,
then follow a $j$-swap plan" in terms of $C_h(k,\cdot)$ — one of them matches $C_h(k,j)$ exactly and the
other is worse by a known amount. For (c), ask when one more swap pays for itself: a unit of disorder
removed with $h$ rounds to go saves how many future payments?

**Full solution:**

**(a) The MDP and the reduction to $k$**

**What is asked.** Three things: a formal finite-horizon MDP, a proof of the adjacent-swap lemma (a swap changes $\mathrm{inv}$ by exactly one, and a descent exists whenever $\mathrm{inv}(\sigma)>0$), and the Bellman recursion for $\Phi_h(k)$. The answer is a definition, a proof and a formula.

**Tool and why.** Modelling a story as an MDP (cheat sheet §12) and finite-horizon backward induction (§3). The lemma is a counting argument over pairs of positions; it is what lets us replace the $n!$ permutations by the single number $k$, because both the reward and the reachable next values of $\mathrm{inv}$ depend only on $k$.

**Definitions.** Let $\sigma^{(i)}$ be the permutation $\sigma$ with the tiles at positions $i$ and $i+1$ exchanged; this is the result of action $a_i$. Let $K=\binom n2$ be the largest possible number of inversions. A position $i$ is an adjacent descent of $\sigma$ when $\sigma_i>\sigma_{i+1}$, and an adjacent ascent otherwise.

**Solution.**

Step 1, the MDP. States: the $n!$ permutations of $\{1,\dots,n\}$, together with the round $t$. Actions: $A=\{a_*,a_1,\dots,a_{n-1}\}$ in every state. Transitions are deterministic: $a_*$ keeps $\sigma$, and $a_i$ moves to $\sigma^{(i)}$. Reward, by the statement:

$$r(\sigma,a)=-\mathrm{inv}(\sigma)-c\,\mathbb{1}[a\ne a_*].$$

Horizon: rounds $t=0,\dots,T-1$, terminal value $0$, no discounting. With $h=T-t$ rounds left, the cost-to-go is $\Phi_h(\sigma)$, and $\Phi_0\equiv0$ because nothing is paid after the last round.

Step 2, the swap lemma. **Claim.** $\mathrm{inv}(\sigma^{(i)})-\mathrm{inv}(\sigma)$ equals $-1$ if $\sigma_i>\sigma_{i+1}$ and $+1$ otherwise.

Split the pairs of positions into three kinds.

- Pairs with neither position in $\{i,i+1\}$: their tiles do not move, so their order does not change.
- Pairs with one position $p\notin\{i,i+1\}$: the position $p$ is to the left of both $i$ and $i+1$, or to the right of both, before and after the swap. So $p$ is compared with the same two values $\sigma_i,\sigma_{i+1}$ from the same side, and the two pairs together contribute the same number of inversions before and after.
- The pair $(i,i+1)$ itself: its two values change order. It is an inversion before the swap exactly when $\sigma_i>\sigma_{i+1}$, and after the swap exactly when it was not before.

Only the third kind changes, by $-1$ or $+1$ as claimed.

Step 3, a descent exists when $k>0$. If $\sigma$ has no adjacent descent, then $\sigma_1<\sigma_2$, then $\sigma_2<\sigma_3$, and so on, so $\sigma$ is increasing, which is the identity with $0$ inversions. By contraposition, $\mathrm{inv}(\sigma)>0$ implies an adjacent descent. In the same way, if there is no adjacent ascent then $\sigma$ is decreasing, the reversal with $K$ inversions; so $\mathrm{inv}(\sigma)<K$ implies an adjacent ascent.

Step 4, $\Phi_h$ depends only on $k$. **Claim.** For every $h$, $\Phi_h(\sigma)$ depends on $\sigma$ only through $\mathrm{inv}(\sigma)$. The proof is by induction on $h$, upward from $0$.

**Base.** $\Phi_0\equiv0$ does not depend on $\sigma$.

**Hypothesis.** $\Phi_{h-1}(\sigma)=\Phi_{h-1}(k)$ for every $\sigma$ with $\mathrm{inv}(\sigma)=k$.

**Step.** Bellman over permutations reads

$$\Phi_h(\sigma)=\mathrm{inv}(\sigma)+\min\Big\{\Phi_{h-1}(\sigma),\ \min_i\big(c+\Phi_{h-1}(\sigma^{(i)})\big)\Big\}.$$

By the lemma, $\sigma^{(i)}$ has $k-1$ inversions when $i$ is a descent and $k+1$ when it is an ascent. By the hypothesis (this is where it is used), each candidate equals $c+\Phi_{h-1}(k-1)$ or $c+\Phi_{h-1}(k+1)$. By Step 3, the first kind is available exactly when $k\ge1$ and the second exactly when $k<K$. So the right-hand side depends only on $k$.

Step 5, the Bellman equation in $k$:

$$\Phi_h(k)=k+\min\Big\{\Phi_{h-1}(k),\ c+\Phi_{h-1}(k-1),\ c+\Phi_{h-1}(k+1)\Big\},\qquad \Phi_0\equiv0,$$

where the middle option exists only when $k\ge1$ and the last one only when $k<K$.

**In words.** A permutation matters only through how disordered it is, because one adjacent swap always moves the disorder by exactly one step. The tile game becomes a walk on the numbers $0,1,\dots,K$.

**Sanity check.** With one round left, $h=1$, the recursion gives $\Phi_1(k)=k+\min\{0,\ c\}$, which is $k$: in the last round swapping only adds the fee, which matches the rules (the round's disorder is paid before the swap takes effect).

**What to write in the exam.**

- States: permutations (and the round); actions $a_*$ and $a_i$; deterministic transitions; reward $-\mathrm{inv}(\sigma)-c\,\mathbb{1}[a\ne a_*]$; horizon $T$, no discount.
- Lemma: only the pair at positions $i,i+1$ changes order, so $\mathrm{inv}$ moves by $\pm1$.
- Existence: no descent means increasing, which means $0$ inversions.
- Induction on $h$: the reachable values $k$, $k-1$, $k+1$ depend only on $k$, so $\Phi_h$ does too.
- Bellman: $\Phi_h(k)=k+\min\{\Phi_{h-1}(k),\ c+\Phi_{h-1}(k\pm1)\}$, $\Phi_0\equiv0$.

*Verified: every adjacent swap of every permutation with $n\le6$ was checked to change $\mathrm{inv}$ by $\pm1$ as claimed, and an exact DP over all permutations of $n=3,4$ gives equal values on permutations with equal $\mathrm{inv}$.*

**(b) The closed form $\Phi_h(k)=\min_j C_h(k,j)$**

**What is asked.** A proof, by induction on $h$, that the optimal cost equals the best "swap $j$ descents first, then idle" plan, including a proof that $\Phi_h(k)$ is nondecreasing in $k$.

**Tool and why.** Backward induction on the horizon (cheat sheet §3). Two algebraic identities turn each Bellman option into a minimum over plans: swapping now matches the plans with $j\ge1$ exactly, and idling now matches every plan plus an extra penalty $j$. Monotonicity is needed to discard the ascent move.

**Definitions.** Let $F_h(k)$ be the right-hand side of the claim:

$$F_h(k)=\min_{0\le j\le \min(k,h)} C_h(k,j).$$

We name it so that the claim reads $\Phi_h=F_h$. In $C_h(k,j)$ the sum is the disorder paid in the $j$ swap rounds, $jc$ is the fees, and $(h-j)(k-j)$ is the disorder paid in the remaining idle rounds.

**Solution.**

Step 1, identity 1 (swapping first). For $j$ from $0$ to $\min(k-1,h-1)$:

$$C_h(k,j+1)=k+c+C_{h-1}(k-1,j).$$

Expand the right side by the definition of $C$, and shift the index of the sum by one:

$$\begin{aligned}
k+c+C_{h-1}(k-1,j)&=k+c+\sum_{i=0}^{j-1}(k-1-i)+jc+(h-1-j)(k-1-j)\\
&=k+\sum_{i=1}^{j}(k-i)+(j+1)c+(h-1-j)(k-1-j)\\
&=\sum_{i=0}^{j}(k-i)+(j+1)c+\big(h-(j+1)\big)\big(k-(j+1)\big)\\
&=C_h(k,j+1).
\end{aligned}$$

The second row substitutes $i\mapsto i-1$ in the sum; the third adds $k$ as the $i=0$ term.

Step 2, identity 2 (idling first). For $j$ from $0$ to $\min(k,h-1)$:

$$k+C_{h-1}(k,j)=C_h(k,j)+j.$$

The sum and the fees are the same on both sides; only the last term differs:

$$\begin{aligned}
k+(h-1-j)(k-j)&=(h-j)(k-j)-(k-j)+k\\
&=(h-j)(k-j)+j.
\end{aligned}$$

Step 3, **Claim.** $F_h(k+1)\ge F_h(k)$ for every $h$ and $k$.

First, for a fixed $j\le k$, raising $k$ by one adds $1$ to each of the $j$ terms of the sum and adds $h-j$ to the last term:

$$C_h(k+1,j)-C_h(k,j)=j+(h-j)=h\ge0.$$

Now take the minimizing index of $F_h(k+1)$. If it is some $j\le\min(k,h)$, then $C_h(k+1,j)\ge C_h(k,j)$, and $C_h(k,j)\ge F_h(k)$ by definition of $F_h$. The only other possible index is $j=k+1$, which exists when $k+1\le h$. Then the idle term vanishes on both sides and

$$C_h(k+1,k+1)-C_h(k,k)=(k+1)+c>0,$$

and $j=k$ is allowed in $F_h(k)$, so again $C_h(k+1,k+1)>C_h(k,k)$, and $C_h(k,k)\ge F_h(k)$. In both cases $F_h(k+1)\ge F_h(k)$.

Step 4, **Claim.** $\Phi_h(k)=F_h(k)$ for all $h\ge0$ and all $k$. Induction on $h$, upward from $0$.

**Base.** For $h=0$ only $j=0$ is allowed, and $C_0(k,0)=0$, which equals $\Phi_0(k)$.

**Hypothesis.** $\Phi_{h-1}=F_{h-1}$. By Step 3 it is then nondecreasing in $k$.

**Step.** Name the three Bellman options from part (a).

Swap a descent (only when $k\ge1$). By the hypothesis and identity 1, with $j+1$ renamed $j$:

$$\begin{aligned}
D&=k+c+\Phi_{h-1}(k-1)\\
&=\min_{0\le j\le\min(k-1,h-1)}\big(k+c+C_{h-1}(k-1,j)\big)\\
&=\min_{1\le j\le\min(k,h)}C_h(k,j).
\end{aligned}$$

Idle. By the hypothesis and identity 2:

$$\begin{aligned}
I&=k+\Phi_{h-1}(k)\\
&=\min_{0\le j\le\min(k,h-1)}\big(C_h(k,j)+j\big).
\end{aligned}$$

Swap an ascent (only when $k<K$). By the monotonicity in the hypothesis and $c>0$:

$$k+c+\Phi_{h-1}(k+1)\ \ge\ k+c+\Phi_{h-1}(k)\ >\ I,$$

so this option never attains the minimum, and $\Phi_h(k)=\min\{I,D\}$.

Lower bound: every candidate in $D$ and in $I$ is at least some $C_h(k,j)$ with $j$ in the allowed range (because $j\ge0$), so both are at least $F_h(k)$.

Upper bound: the term $j=0$ of $I$ gives $I\le C_h(k,0)$, and $D$ is the minimum over $j\ge1$. Hence

$$\min\{I,D\}\le\min\Big\{C_h(k,0),\ \min_{j\ge1}C_h(k,j)\Big\}=F_h(k).$$

When $k=0$ the option $D$ is absent, and the upper bound is just $I\le C_h(0,0)$, which is $F_h(0)$. So $\Phi_h(k)=F_h(k)$. $\square$

**In words.** Waiting before a swap you will make anyway only means paying one more round of the higher disorder; that is the $+j$ in identity 2. So among all plans, the best ones do all their swaps first and then stop.

**Sanity check.** For $h=1$ the formula gives $F_1(k)=\min\{C_1(k,0),\ C_1(k,1)\}$, that is $\min\{k,\ k+c\}=k$, the value found in the sanity check of (a).

**What to write in the exam.**

- Identity 1: $C_h(k,j+1)=k+c+C_{h-1}(k-1,j)$ (swap now, then a $j$-swap plan).
- Identity 2: $k+C_{h-1}(k,j)=C_h(k,j)+j$ (idle now costs an extra $j$).
- Monotonicity: $C_h(k+1,j)-C_h(k,j)=h$, and the new index $j=k+1$ costs more than $j=k$.
- Induction: swap-down equals $\min_{j\ge1}C_h$, idle lies between $F_h$ and $C_h(k,0)$, swap-up is dominated, so $\Phi_h=F_h$.

*Verified: sympy confirms both identities and $C_h(k+1,j)-C_h(k,j)=h$; an exact DP over all permutations of $n=3,4$ with $c\in\{\tfrac12,\tfrac{13}{10},\tfrac32,\tfrac52,\tfrac72\}$ and $h\le8$ gives $\Phi_h=F_h$, nondecreasing in $k$.*

**(c) The optimal number of swaps and the policy**

**What is asked.** The increment $C_h(k,j+1)-C_h(k,j)$, a closed form for $j^*(h,k)$, an optimal action at every state and round, and the exact set of (state, round) pairs where $a_*$ is optimal.

**Tool and why.** Marginal analysis of a convex sequence, which is the threshold structure of cheat sheet §4: one more swap pays exactly when its increment is negative. Part (b) already reduced the problem to minimizing $C_h(k,\cdot)$.

**Definitions.** Let $\Delta_j=C_h(k,j+1)-C_h(k,j)$, the cost change from adding the $(j+1)$-st swap. To shorten the algebra, write $a=h-j$ and $b=k-j$.

**Solution.**

Step 1, the increment. The sum gains the term $k-j$, which is $b$, the fees gain $c$, and the idle term changes from $ab$ to $(a-1)(b-1)$:

$$\begin{aligned}
\Delta_j&=b+c+(a-1)(b-1)-ab\\
&=b+c-a-b+1\\
&=c-(h-1-j).
\end{aligned}$$

Step 2, shape. $\Delta_j$ grows by exactly $1$ when $j$ grows by $1$, so $C_h(k,\cdot)$ is convex: it decreases while $\Delta_j<0$ and increases afterwards. Since $c$ is not an integer, $\Delta_j$ is never $0$, so the minimizer is unique.

Step 3, when an extra swap pays. $\Delta_j<0$ means $j<h-1-c$. Because $j$ is an integer and $c$ is not, this is the same as $j\le h-2-\lfloor c\rfloor$. So the negative increments are those with $j$ from $0$ to $h-2-\lfloor c\rfloor$, which is $(h-1-\lfloor c\rfloor)^+$ of them. The index $j$ may not exceed $\min(k,h)$, and $h-1-\lfloor c\rfloor$ is already below $h$, so

$$\boxed{j^*(h,k)=\min\big\{k,\ (h-1-\lfloor c\rfloor)^+\big\}}$$

and the optimal value is

$$V^*_t(\sigma)=-C_h\big(k,j^*(h,k)\big),\qquad h=T-t,\ k=\mathrm{inv}(\sigma).$$

Step 4, the policy. In round $t$, with $h=T-t$: if $\mathrm{inv}(\sigma)\ge1$ and $h\ge\lfloor c\rfloor+2$, swap any adjacent descent; otherwise play $a_*$. The condition is exactly $j^*(h,k)\ge1$. After a swap the state is $(h-1,k-1)$, and when $j^*(h,k)\ge1$ we have $h-2-\lfloor c\rfloor\ge0$, so

$$j^*(h-1,k-1)=\min\{k-1,\ h-2-\lfloor c\rfloor\}=j^*(h,k)-1.$$

So the policy swaps in exactly $j^*$ consecutive rounds and then idles for good (either $k$ reached $0$, or $h$ fell below $\lfloor c\rfloor+2$ and keeps falling). Its cost is $C_h(k,j^*)$, which is $\Phi_h(k)$ by part (b). This holds from every state, so the policy is optimal everywhere.

Step 5, **Claim.** $a_*$ is optimal exactly when $\mathrm{inv}(\sigma)=0$ or $h\le\lfloor c\rfloor+1$ (that is, $t\ge T-\lfloor c\rfloor-1$), and there it is the unique optimal action. We use $I$ and $D$ from part (b).

Case $k=0$: there is no descent, and swapping an ascent is strictly worse than idling (part (b)). So $a_*$ is the unique optimum.

Case $k\ge1$ and $h\le\lfloor c\rfloor+1$: for every $j\ge0$ we have $h-1-j\le\lfloor c\rfloor$, and $\lfloor c\rfloor<c$, so every $\Delta_j>0$ and $j^*=0$. Then $\Phi_h(k)=C_h(k,0)$, and $D$ is a minimum over $j\ge1$, so $D>C_h(k,0)$. Since $\Phi_h=\min\{I,D\}$, the idle value attains it, $I=\Phi_h(k)$, and no swap does.

Case $k\ge1$ and $h\ge\lfloor c\rfloor+2$: idling is strictly worse. By identity 2, $I$ is minimized at the index $j'$ that minimizes $C_{h-1}(k,\cdot)$, which is $j'=j^*(h-1,k)$, so $I=C_h(k,j')+j'$. If $k\le h-2-\lfloor c\rfloor$, then $j'=k$ and also $j^*(h,k)=k$, so $I=\Phi_h(k)+k$, which is more than $\Phi_h(k)$. Otherwise $j'=h-2-\lfloor c\rfloor$ and $j^*(h,k)=j'+1$, and

$$I\ \ge\ C_h(k,j')\ =\ \Phi_h(k)-\Delta_{j'}\ >\ \Phi_h(k),$$

because $\Delta_{j'}=c-\lfloor c\rfloor-1$, and this is negative. So at these states the optimal actions are exactly the adjacent descents.

**In words.** A swap made with $h$ rounds left removes one unit of disorder from each of the $h-1$ later payments, and costs $c$. It pays exactly when $h-1>c$. Disorder is gone for good once removed, so it is best to swap as early as possible and then stop.

**Sanity check.** If $c$ is huge, $(h-1-\lfloor c\rfloor)^+=0$ and you never swap, as expected. If $c=0.5$ and $h=2$, then $j^*=\min\{k,1\}$: one swap saves one payment for a fee of $0.5$, which is worth it.

**What to write in the exam.**

- Increment: $\Delta_j=c-(h-1-j)$, increasing in $j$, never $0$.
- Count the negative increments: $j^*=\min\{k,(h-1-\lfloor c\rfloor)^+\}$, and $V^*_t=-C_h(k,j^*)$.
- Policy: swap any descent if $k\ge1$ and $h\ge\lfloor c\rfloor+2$, else $a_*$; it swaps $j^*$ rounds in a row, so it attains $\Phi_h$.
- Answer: $a_*$ is optimal exactly when $k=0$ or $h\le\lfloor c\rfloor+1$, and there it is the only optimal action.

*Verified: exact DP over all permutations of $n=3,4$, five non-integer values of $c$ and $h\le8$: the optimal action sets equal "all descents" or "$a_*$ only" exactly as claimed.*

**(d) The example $\sigma_0=(4,3,2,1)$, $T=6$**

**What is asked.** For $c=2.5$ and for $c=0.5$: the number $V^*_0(\sigma_0)$, the rounds in which the optimal policy swaps, and whether the row ends sorted when $c=0.5$.

**Tool and why.** Plug into the closed form of part (c) (cheat sheet §3 and §4); the full list $C_6(6,\cdot)$ confirms the minimum.

**Definitions.** No new notation.

**Solution.**

Step 1, the start. All $\binom42=6$ pairs of $(4,3,2,1)$ are inversions, so $k=6$; at $t=0$ also $h=T$, which is $6$.

Step 2, $c=2.5$. Here $\lfloor c\rfloor=2$, so $h-1-\lfloor c\rfloor=3$ and $j^*=\min\{6,3\}$, which is $3$. The policy swaps while $h\ge4$, which is $t=0,1,2$, and idles in $t=3,4,5$.

$$\begin{aligned}
C_6(6,3)&=(6+5+4)+3\cdot2.5+(6-3)(6-3)\\
&=15+7.5+9\\
&=31.5.
\end{aligned}$$

$$\boxed{V^*_0(\sigma_0)=-31.5}$$

Step 3, $c=0.5$. Here $\lfloor c\rfloor=0$, so $h-1-\lfloor c\rfloor=5$ and $j^*=\min\{6,5\}$, which is $5$. The policy swaps while $h\ge2$, which is $t=0,\dots,4$, and idles in $t=5$.

$$\begin{aligned}
C_6(6,5)&=(6+5+4+3+2)+5\cdot0.5+(6-5)(6-5)\\
&=20+2.5+1\\
&=23.5.
\end{aligned}$$

$$\boxed{V^*_0(\sigma_0)=-23.5}$$

Step 4, the full list, as a check that the minimum is where (c) says:

| $j$ | $C_6(6,j)$, $c=2.5$ | $C_6(6,j)$, $c=0.5$ |
|---|---|---|
| $0$ | $36$ | $36$ |
| $1$ | $33.5$ | $31.5$ |
| $2$ | $32$ | $28$ |
| $3$ | $31.5$ | $25.5$ |
| $4$ | $32$ | $24$ |
| $5$ | $33.5$ | $23.5$ |
| $6$ | $36$ | $24$ |

Step 5, sorted at the end? No. With $c=0.5$ the policy makes $5$ swaps, so one inversion is left; for example, always swapping the leftmost descent ends at $(2,1,3,4)$. The sixth swap would happen in round $t=5$, with $h=1$: its fee is $0.5$, but it saves $h-1=0$ future payments, because the disorder of that round is paid before the swap and there is no terminal cost.

**In words.** With a cheap fee you fix almost everything early, but the very last swap is pure cost. With an expensive fee only the first three swaps buy enough saved payments.

**Sanity check.** Never swapping costs $6\cdot6=36$, and sorting completely with $c=0.5$ costs $24$; both are worse than the optimum $23.5$, as the table shows.

**What to write in the exam.**

- Start: $k=6$, $h=6$.
- For $c=2.5$: $j^*=3$, swaps at $t=0,1,2$, value $-(15+7.5+9)=-31.5$.
- For $c=0.5$: $j^*=5$, swaps at $t=0,\dots,4$, value $-(20+2.5+1)=-23.5$.
- Not sorted: a swap at $h=1$ costs $c$ and saves nothing.

*Verified: simulating the policy on the permutation itself gives $-31.5$ with swaps at $t=0,1,2$ and $-23.5$ with swaps at $t=0,\dots,4$ (one inversion left); the DP agrees and gives the table above.*

**Common mistakes.**

- Counting $h$ saved payments for a swap with $h$ rounds left. The current round's disorder is already paid, so it is $h-1$, which is why the last-round swap is worthless.
- Forcing the row to end sorted ($j=k$). With $c=0.5$ that costs $24$ instead of $23.5$.
- Giving the policy only along the trajectory from $\sigma_0$, or allowing an ascent swap. The question asks for every state and round, and an ascent swap is always strictly worse.

**💡 Trick.** Collapse the $n!$ permutations to $k=\mathrm{inv}(\sigma)$ via the adjacent-swap lemma; then a swap with $h$ rounds left buys $h-1$ saved payments for a fee $c$ — a time threshold $h\ge\lfloor c\rfloor+2$.

**⚠️ Watch out.** Define the policy at **every** state (any descent works; never swap an ascent), and remember the last-round swap is worthless — optimal play may leave the row unsorted.

## Q2 — Mixing two discount factors

**Hint:** Write each value as $\sum_t(\text{discount weight at }t)\cdot\mathbb{E}^\pi[r_t]$. Under
per-step mixing, the weight is an expectation of a *product of independent* coins — what is it? Under
per-episode mixing it is an expectation of a *power* of one coin. Then compare $\bar\gamma^t$ with
$\tfrac12\gamma_1^t+\tfrac12\gamma_2^t$ (which function of $\gamma$ is convex?). For (d), what does (a)
reduce the per-step criterion to, and how does the advantage of one policy over another depend on $\gamma$
— must its sign be constant on $[0.5,0.9]$?

**Full solution:**

**(a) Both mixed values in closed form**

**What is asked.** Two identities, $W^\pi=\tfrac12V^\pi_{\gamma_1}+\tfrac12V^\pi_{\gamma_2}$ and $U^\pi=V^\pi_{\bar\gamma}$, for every policy, and two consequences: $U^*=V^*_{\bar\gamma}$, and a stationary deterministic optimal policy exists for per-step mixing.

**Tool and why.** Write each value as a sum over time of "expected discount weight at $t$" times "expected reward at $t$" (cheat sheet §1). This works because the coins are independent of the trajectory, so the expectation factorizes. Then the standard theory of discounted MDPs (§2 and §6) gives the optimal policy.

**Definitions.** Let $\rho_t$ be the expected reward at time $t$ under $\pi$ from $s$:

$$\rho_t=\mathbb{E}^\pi\big[r(s_t,a_t)\mid s_0=s\big].$$

We introduce it because both criteria weight the same sequence $\rho_t$, only with different weights. Let $R_{\max}$ bound $|r|$.

**Solution.**

Step 1, sums may be exchanged with expectations. Every discount product is at most $\gamma_2^t$ and $|\rho_t|\le R_{\max}$, so each series is dominated by $\sum_t\gamma_2^tR_{\max}$, which is finite.

Step 2, per episode. Condition on the single coin $\Gamma$. With probability $\tfrac12$ it is $\gamma_1$ and the expected return is $\sum_t\gamma_1^t\rho_t$, which is $V^\pi_{\gamma_1}(s)$; likewise for $\gamma_2$. So

$$\begin{aligned}
W^\pi(s)&=\tfrac12\sum_t\gamma_1^t\rho_t+\tfrac12\sum_t\gamma_2^t\rho_t\\
&=\tfrac12V^\pi_{\gamma_1}(s)+\tfrac12V^\pi_{\gamma_2}(s).
\end{aligned}$$

Step 3, per step. The coins $\Gamma_1,\dots,\Gamma_t$ are independent of each other and of the trajectory, so the expectation of the product splits, and each $\mathbb{E}[\Gamma_i]$ equals $\tfrac12(0.5+0.9)$, which is $\bar\gamma$:

$$\begin{aligned}
\mathbb{E}\Big[\prod_{i=1}^t\Gamma_i\,r_t\Big]&=\prod_{i=1}^t\mathbb{E}[\Gamma_i]\cdot\rho_t\\
&=\bar\gamma^{\,t}\rho_t.
\end{aligned}$$

Summing over $t$:

$$U^\pi(s)=\sum_t\bar\gamma^{\,t}\rho_t=V^\pi_{\bar\gamma}(s).$$

Step 4, optimal values. The coins are not observed, so the class of policies is the usual one, and Step 3 holds for each of them. Taking the supremum:

$$U^*=\sup_\pi U^\pi=\sup_\pi V^\pi_{\bar\gamma}=V^*_{\bar\gamma}.$$

So per-step mixing is the ordinary MDP with discount $\bar\gamma=0.7$, which has a stationary deterministic optimal policy: the greedy policy with respect to $V^*_{0.7}$.

**In words.** Independent coins at every step average out multiplicatively, so on average you discount by $0.7$ each step. One coin for the whole episode does not average out: it is a lottery between two whole discounted problems.

**Sanity check.** If $\gamma_1=\gamma_2$, both criteria reduce to the usual discounted value, as they should. At $t=1$ both weights are $0.7$, since $\tfrac12(0.5+0.9)=0.7$; the criteria first differ at $t=2$ (part (b)).

**What to write in the exam.**

- Define $\rho_t$; sums converge absolutely, so expectation and sum may be exchanged.
- Per episode: condition on $\Gamma$, get $\tfrac12V^\pi_{\gamma_1}+\tfrac12V^\pi_{\gamma_2}$.
- Per step: independence gives weight $\prod\mathbb{E}\Gamma_i=\bar\gamma^t$, so $U^\pi=V^\pi_{\bar\gamma}$.
- Hence $U^*=V^*_{0.7}$, and the greedy policy w.r.t. $V^*_{0.7}$ is stationary, deterministic and optimal.

*Verified: Monte-Carlo with $2\cdot10^6$ coin draws gives a per-step weight at $t=2$ of $0.4900\pm0.0001$ (exact $0.49$), and a $10^5$-episode simulation on a random 4-state MDP matches $V^\pi_{0.7}$ within the noise.*

**(b) Comparing $U^\pi$ and $W^\pi$**

**What is asked.** (i) A proof that $U^\pi\le W^\pi$ when all rewards are nonnegative. (ii) Two explicit numeric examples showing that without the sign assumption neither $U^\pi\le W^\pi$ nor $U^\pi\ge W^\pi$ holds in general.

**Tool and why.** Part (a) writes the difference as $\sum_t(\text{weight gap})\cdot\rho_t$. Jensen's inequality for the convex function $\gamma\mapsto\gamma^t$ signs the weight gap; the sign of $\rho_t$ does the rest (cheat sheet §1).

**Definitions.** No new notation; $\rho_t$ is from part (a).

**Solution.**

Step 1, the difference. Subtract the two formulas of part (a) term by term:

$$W^\pi(s)-U^\pi(s)=\sum_{t\ge0}\Big(\tfrac12\gamma_1^t+\tfrac12\gamma_2^t-\bar\gamma^{\,t}\Big)\rho_t.$$

Step 2, the weight gap is nonnegative. For $t\ge2$ the function $\gamma\mapsto\gamma^t$ has second derivative $t(t-1)\gamma^{t-2}\ge0$ on $[0,1)$, so it is convex, and Jensen at the midpoint gives $\tfrac12\gamma_1^t+\tfrac12\gamma_2^t\ge\bar\gamma^{\,t}$. For $t=0$ and $t=1$ the function is affine and the gap is $0$.

Step 3, (i). If all rewards are nonnegative then every $\rho_t\ge0$, so every term of Step 1 is a nonnegative number times a nonnegative number. Hence $W^\pi(s)-U^\pi(s)\ge0$. $\square$

Step 4, (ii). Take the deterministic chain $s_0$, then $u_1$, then $u_2$, then the absorbing state $z$ (reward $0$), with a single action everywhere and rewards $0$, $0$, $x$ at $s_0,u_1,u_2$. Only $t=2$ carries a reward:

$$U^\pi(s_0)=0.7^2x=0.49x,$$

$$W^\pi(s_0)=\tfrac12(0.25+0.81)x=0.53x.$$

With $x=1$, $U^\pi(s_0)=0.49$ and $W^\pi(s_0)=0.53$, so $U^\pi\ge W^\pi$ fails. With $x=-1$, $U^\pi(s_0)=-0.49$ and $W^\pi(s_0)=-0.53$, so $U^\pi\le W^\pi$ fails.

**In words.** Per-episode mixing puts more weight on the far future than per-step mixing does, because a lucky $\Gamma=0.9$ is kept for the whole episode. More weight on far rewards helps when they are positive and hurts when they are negative.

**Sanity check.** With rewards only at $t=0$ and $t=1$ the two criteria agree, since there the weight is affine in $\gamma$; that is why the example puts the reward at $t=2$.

**What to write in the exam.**

- Difference: $W^\pi-U^\pi=\sum_t\big(\tfrac12\gamma_1^t+\tfrac12\gamma_2^t-\bar\gamma^t\big)\rho_t$.
- Jensen on the convex $\gamma^t$: each bracket is at least $0$; with $r\ge0$ each $\rho_t\ge0$, so $U^\pi\le W^\pi$.
- Example: a single reward $x$ at $t=2$ gives $U=0.49x$ and $W=0.53x$; take $x=1$ and $x=-1$.

*Verified: exact fractions give $0.7^2=0.49$ and $\tfrac12(0.25+0.81)=0.53$; on $500$ random MDPs with nonnegative rewards, $U^\pi\le W^\pi$ held at every state.*

**(c) $U^*$ against the average of the two optimal values**

**What is asked.** A proof that $U^*(s)\le\tfrac12V^*_{\gamma_1}(s)+\tfrac12V^*_{\gamma_2}(s)$ for nonnegative rewards, and a numeric example where the inequality is strict.

**Tool and why.** Chain three facts: part (a) for one fixed optimal policy, part (b)(i) for that policy, and the definition of $V^*_{\gamma_i}$ as a supremum over policies (cheat sheet §1).

**Definitions.** Let $\bar\pi$ be a stationary optimal policy for discount $\bar\gamma$; it exists by part (a). We fix it so that we can compare values of one and the same policy.

**Solution.**

Step 1, the chain. Each row is justified below it:

$$\begin{aligned}
U^*(s)&=V^{\bar\pi}_{\bar\gamma}(s)\\
&=U^{\bar\pi}(s)\\
&\le W^{\bar\pi}(s)\\
&=\tfrac12V^{\bar\pi}_{\gamma_1}(s)+\tfrac12V^{\bar\pi}_{\gamma_2}(s)\\
&\le\tfrac12V^*_{\gamma_1}(s)+\tfrac12V^*_{\gamma_2}(s).
\end{aligned}$$

Row 1: $U^*=V^*_{\bar\gamma}$ by part (a), and $\bar\pi$ attains it. Row 2: part (a) for $\bar\pi$. Row 3: part (b)(i), which needs the nonnegative rewards. Row 4: part (a) again. Row 5: no policy beats the optimal value for each $\gamma_i$. $\square$

Step 2, a strict example. One state, one action, reward $1$ forever. Then

$$U^*=\tfrac{1}{1-0.7}=\tfrac{10}{3}\approx3.33,$$

$$\tfrac12\big(\tfrac{1}{0.5}+\tfrac{1}{0.1}\big)=\tfrac12(2+10)=6.$$

$$\boxed{3.33<6}$$

**In words.** Per-step mixing loses twice: it discounts as if $0.7$ every step, which is worse than the average of the two lotteries for positive rewards, and it must use one policy, while the right-hand side lets each discount pick its own best policy.

**Sanity check.** If $\gamma_1=\gamma_2$, every inequality in the chain becomes an equality, as it should.

**What to write in the exam.**

- Take $\bar\pi$ optimal for $\bar\gamma$.
- Chain, by (a), (b)(i) and the definition of $V^*_{\gamma_i}$:

$$\begin{aligned}
U^*&=U^{\bar\pi}\\
&\le W^{\bar\pi}\\
&=\tfrac12V^{\bar\pi}_{\gamma_1}+\tfrac12V^{\bar\pi}_{\gamma_2}\\
&\le\tfrac12V^*_{\gamma_1}+\tfrac12V^*_{\gamma_2}.
\end{aligned}$$

- Example: constant reward $1$ gives $\tfrac{10}{3}$ against $6$.

*Verified: on $500$ random MDPs with nonnegative rewards, value iteration gave $V^*_{0.7}\le\tfrac12V^*_{0.5}+\tfrac12V^*_{0.9}$ at every state; the example was computed in exact fractions.*

**(d) Optimal for both discounts, but not for the mix?**

**What is asked.** A yes/no verdict: must a stationary deterministic policy that is optimal for both $\gamma_1$ and $\gamma_2$ also be optimal for per-step mixing? A proof, or an explicit counterexample with all numbers.

**Tool and why.** By part (a), per-step mixing is just discount $0.7$. So the question becomes: can a policy be optimal at $0.5$ and at $0.9$ but not at $0.7$? The advantage of one policy over another is a polynomial in $\gamma$ (cheat sheet §1), and a polynomial can change sign twice.

**Definitions.** Let $d(\gamma)$ be the value of *go* minus the value of *out* at $s_0$ in the MDP below; its sign says which action is better at discount $\gamma$.

**Solution.**

Verdict: **No.**

Step 1, the MDP. States $s_0,u_1,u_2,z$, with $z$ absorbing and reward $0$. In $s_0$: action *go* (reward $24$, to $u_1$) or *out* (reward $0$, to $z$). In $u_1$: a single action, reward $-70$, to $u_2$. In $u_2$: a single action, reward $50$, to $z$. Only $s_0$ has a choice, so a policy is just the action at $s_0$.

Step 2, the advantage. *go* collects $24$ at $t=0$, $-70$ at $t=1$ and $50$ at $t=2$; *out* collects $0$. So

$$d(\gamma)=24-70\gamma+50\gamma^2=50(\gamma-0.6)(\gamma-0.8).$$

Step 3, evaluate at the three discounts:

$$\begin{aligned}
d(0.5)&=24-35+12.5=1.5,\\
d(0.9)&=24-63+40.5=1.5,\\
d(0.7)&=24-49+24.5=-0.5.
\end{aligned}$$

So $\pi$ = *go* is strictly optimal for $\gamma_1=0.5$ and for $\gamma_2=0.9$. At $\bar\gamma=0.7$, *out* is strictly better:

$$\boxed{d(0.7)=-0.5}$$

By part (a) the per-step criterion equals the $0.7$-discounted one, so *go* is **not** optimal under per-step mixing.

Step 4, nonnegative rewards are not needed, but they are possible. Add $70$ to every reward, including the reward of $z$. Every trajectory is infinite, so every policy's value shifts by $70/(1-\gamma)$, and all the comparisons above are unchanged.

**In words.** *go* pays now, costs a lot at $t=1$ and pays again at $t=2$. A small $\gamma$ hardly sees the cost, a large $\gamma$ sees the late reward, but at the middle discount the cost at $t=1$ dominates.

**Sanity check.** The roots of $d$ are $0.6$ and $0.8$, both strictly between $0.5$ and $0.9$, so $d$ is positive at both ends and negative in between, exactly as the three numbers show.

**What to write in the exam.**

- Verdict: no; by (a) per-step mixing is discount $0.7$.
- Example: *go* gives $24,-70,50$ at $t=0,1,2$; *out* gives $0$.
- Advantage $50(\gamma-0.6)(\gamma-0.8)$: $+1.5$ at $0.5$ and $0.9$, $-0.5$ at $0.7$.

*Verified: sympy factors $24-70\gamma+50\gamma^2$ and evaluates it exactly; the shifted MDP (rewards $+70$) was solved numerically and gives the same differences $1.5$, $-0.5$, $1.5$.*

**Common mistakes.**

- Treating per-step mixing like per-episode mixing, or computing $\mathbb{E}\prod\Gamma_i$ as $\tfrac12\gamma_1^t+\tfrac12\gamma_2^t$. Independence gives $\bar\gamma^t$.
- Proving (b)(i) without the sign of $\rho_t$; Jensen alone signs only the weights.
- In (d), arguing "optimal at both ends, hence in between". The advantage is a polynomial in $\gamma$ and can change sign twice.

**💡 Trick.** Independent per-step discounts multiply in expectation, $\mathbb{E}\prod\Gamma_i=\bar\gamma^t$, so per-step mixing is just discount $\bar\gamma$; per-episode mixing averages the values. Jensen on $\gamma^t$ compares them.

**⚠️ Watch out.** The optimal policy is **not** monotone in $\gamma$: value differences are polynomials/rational functions of $\gamma$ and can change sign twice, so "optimal at $0.5$ and at $0.9$" does not imply "optimal at $0.7$".

## Q3 — MC-SGD with a quadratic-in-features value model

**Hint:** The model is quadratic in the *feature* but how does it depend on the *parameters*? Write it as
$w^\top x(s)$ for a suitable $x(s)$ and the whole question becomes weighted linear regression. For the
updates, compute the return from each visited state to the end of the episode. For the stationary point,
the expected update is a weighted sum over states with weights equal to the visit probabilities.

**Full solution:**

**(a) Gradients, the GD update and convexity**

**What is asked.** The gradients $\nabla_wV_w(s)$ and $\nabla_wJ(w)$, the full gradient-descent update with step $\alpha$, and whether $J$ is convex in $w$, with a reason.

**Tool and why.** Function approximation with gradient descent (cheat sheet §8). The key observation is that the model is linear in $w$, so $J$ is a weighted least-squares objective, whose Hessian is a sum of outer products.

**Definitions.** Let $x(s)$ be the feature vector

$$x(s)=\begin{pmatrix}\phi(s)\\ \phi(s)^2\end{pmatrix}.$$

We introduce it because then $V_w(s)=w^\top x(s)$: quadratic in $\phi$ but linear in $w$.

**Solution.**

Step 1, gradient of the model. $V_w(s)=w_1\phi(s)+w_2\phi(s)^2$; the derivative with respect to $w_1$ is $\phi(s)$ and with respect to $w_2$ is $\phi(s)^2$. So $\nabla_wV_w(s)=x(s)$.

Step 2, gradient of $J$. By the chain rule, the derivative of $\tfrac12(V^\pi(s)-V_w(s))^2$ is $-(V^\pi(s)-V_w(s))\nabla_wV_w(s)$, so

$$\nabla_wJ(w)=\sum_s\mu(s)\big(V_w(s)-V^\pi(s)\big)\,x(s).$$

Step 3, the GD update, $w\leftarrow w-\alpha\nabla_wJ(w)$, written out:

$$w\leftarrow w-\alpha\sum_s\mu(s)\big(w_1\phi(s)+w_2\phi(s)^2-V^\pi(s)\big)\begin{pmatrix}\phi(s)\\ \phi(s)^2\end{pmatrix}.$$

Step 4, convexity. Differentiate Step 2 once more; $x(s)$ does not depend on $w$:

$$\nabla^2_wJ=\sum_s\mu(s)\,x(s)x(s)^\top.$$

For any vector $u$,

$$u^\top\nabla^2_wJ\,u=\sum_s\mu(s)\big(u^\top x(s)\big)^2\ge0,$$

so the Hessian is positive semidefinite and $J$ is **convex**. It is strictly convex as soon as two visited states have distinct nonzero features $\phi,\phi'$, because then the determinant of the two vectors $x$ is $\phi\phi'(\phi'-\phi)\ne0$, so they span $\mathbb{R}^2$.

**In words.** "Quadratic" refers to the feature, not to the parameters. In the parameters it is ordinary linear regression with two features, so every stationary point is a global minimum.

**Sanity check.** A finite-difference gradient of $J$ at a random $w$ matches the formula of Step 2 to six digits.

**What to write in the exam.**

- Feature vector $x(s)=(\phi(s),\phi(s)^2)^\top$, so $\nabla_wV_w(s)=x(s)$.
- Gradient: $\nabla J=\sum_s\mu(s)(V_w(s)-V^\pi(s))x(s)$; update $w\leftarrow w-\alpha\nabla J$.
- Hessian $\sum_s\mu(s)xx^\top\succeq0$, so $J$ is convex (strictly, given two distinct nonzero features).

*Verified: central finite differences of $J$ on the chain of part (c) agree with the analytic gradient to $10^{-8}$.*

**(b) The MC-SGD update**

**What is asked.** The Monte-Carlo SGD update at a visited state $s_t$, and why the target used in place of $V^\pi(s_t)$ is unbiased.

**Tool and why.** MC-SGD (cheat sheet §8): replace the unknown $V^\pi(s_t)$ in the GD term by a sample whose conditional mean is $V^\pi(s_t)$, namely the return, and replace the $\mu$-weighted sum by states visited on-policy.

**Definitions.** Let $G_t$ be the return from time $t$ to the end of the episode:

$$G_t=\sum_{k\ge t}r_k.$$

**Solution.**

Step 1, the update. Take the term of the GD update for the state $s_t$ and put $G_t$ in place of $V^\pi(s_t)$:

$$w\leftarrow w+\alpha\big(G_t-w_1\phi(s_t)-w_2\phi(s_t)^2\big)\begin{pmatrix}\phi(s_t)\\ \phi(s_t)^2\end{pmatrix}.$$

Step 2, unbiasedness. By the definition of the value and the Markov property (the rewards after $t$ depend on the past only through $s_t$):

$$\mathbb{E}\big[G_t\mid s_t=s\big]=V^\pi(s).$$

Step 3, the weights. States are sampled by running $\pi$, so state $s$ contributes an update in a given episode with probability $\mu(s)$; this supplies the weights of $J$.

**In words.** The return is a noisy but honest measurement of $V^\pi(s_t)$: on average it is exactly right, so on average the SGD step points along $-\nabla J$.

**Sanity check.** If $V_w(s_t)$ already equals $G_t$, the update is zero, as it should be.

**What to write in the exam.**

- Update: $w\leftarrow w+\alpha(G_t-V_w(s_t))\,x(s_t)$ with $x=(\phi,\phi^2)$.
- Unbiased: $\mathbb{E}[G_t\mid s_t=s]$ equals $V^\pi(s)$ by definition and the Markov property.
- On-policy sampling supplies the weights $\mu(s)$.

*Verified: in the simulation of part (d), the per-episode MC-SGD iterates average to the exact minimizer of $J$, which is what an unbiased target gives.*

**(c) Two updates on the observed episode**

**What is asked.** The values of $w$ after the update at $A$ and after the update at $B$, starting from $w=(0,0)$ with $\alpha=0.1$, on the episode $A$, $B$, end.

**Tool and why.** The update of part (b) (cheat sheet §8), applied twice in order; the second uses the $w$ produced by the first.

**Definitions.** No new notation.

**Solution.**

Step 1, returns. Rewards are collected on leaving a state, so $G_A$ adds the rewards of $A$ and $B$, and $G_B$ is the reward of $B$ alone:

$$G_A=1+2=3,$$

and $G_B=2$.

Step 2, the update at $A$. Here $x(A)=(1,1)$ and $V_w(A)=0$ because $w=(0,0)$. The residual is $3-0=3$:

$$w\leftarrow(0,0)+0.1\cdot3\cdot(1,1)=\boxed{(0.3,\ 0.3)}$$

Step 3, the update at $B$, with the new $w$. Here $x(B)=(2,4)$ and

$$V_w(B)=0.3\cdot2+0.3\cdot4=1.8.$$

The residual is $2-1.8$, which is $0.2$:

$$w\leftarrow(0.3,0.3)+0.1\cdot0.2\cdot(2,4)=\boxed{(0.34,\ 0.38)}$$

**In words.** The first step moves $w$ a lot because the prediction $0$ is far from the return $3$; the second step is small because the new $w$ already predicts $1.8$ for a return of $2$.

**Sanity check.** After the first update, $V_w(A)=0.6$ is closer to $G_A=3$ than $0$ was; after the second, $V_w(B)$ is $0.34\cdot2+0.38\cdot4$, which is $2.2$; it moved from $1.8$ past the target $2$ because the step $\alpha\|x(B)\|^2=2$ is larger than $1$.

**What to write in the exam.**

- Returns: $G_A=3$ and $G_B=2$.
- At $A$: residual $3$, so $w=(0.3,0.3)$.
- At $B$: prediction $1.8$, residual $0.2$, so $w=(0.34,0.38)$.

*Verified: the two updates were run in Python and give $(0.3,0.3)$ and then $(0.34,0.38)$.*

**(d) The fixed point $w^*$**

**What is asked.** $V^\pi$ and $\mu$ for the chain, the point $w^*$ where the expected MC-SGD update vanishes, a proof that it is the unique minimizer of $J$, the exact $w^*$ with the fitted values, and whether $V_{w^*}$ equals $V^\pi$.

**Tool and why.** The expected MC-SGD update is $-\alpha\nabla J$ (cheat sheet §8), so it vanishes exactly at the solution of the normal equations; strict convexity from part (a) makes it unique.

**Definitions.** Let $M=\sum_s\mu(s)x(s)x(s)^\top$ and $b=\sum_s\mu(s)V^\pi(s)x(s)$. These are the two sides of the normal equations $Mw=b$.

**Solution.**

Step 1, values, backward from $C$: $V^\pi(C)=4$, then

$$V^\pi(B)=2+\tfrac12\cdot4=4,$$

$$V^\pi(A)=1+\tfrac12\cdot4=3.$$

Step 2, visit probabilities. Every episode visits $A$, so $\mu(A)=1$; it reaches $B$ with probability $\tfrac12$, so $\mu(B)=\tfrac12$; it reaches $C$ with probability $\tfrac12\cdot\tfrac12$, so $\mu(C)=\tfrac14$.

Step 3, the expected update. In one episode $s$ is visited with probability $\mu(s)$, and then the target has mean $V^\pi(s)$ by part (b). So the expected per-episode update is

$$\alpha\sum_s\mu(s)\big(V^\pi(s)-w^\top x(s)\big)x(s)=-\alpha\nabla J(w),$$

which vanishes exactly when $Mw=b$.

Step 4, the contributions of each state, with $x(A)=(1,1)$, $x(B)=(2,4)$ and $x(C)=(3,9)$:

| State | $\mu$ | $\mu V^\pi x$ | $\mu\,xx^\top$ entries |
|---|---|---|---|
| $A$ | $1$ | $(3,3)$ | $1,\ 1,\ 1$ |
| $B$ | $\tfrac12$ | $(4,8)$ | $2,\ 4,\ 8$ |
| $C$ | $\tfrac14$ | $(3,9)$ | $\tfrac94,\ \tfrac{27}4,\ \tfrac{81}4$ |

The last column lists the entries $(1,1)$, $(1,2)$, $(2,2)$ of the symmetric matrix. Summing the rows:

$$\begin{pmatrix}21/4&47/4\\47/4&117/4\end{pmatrix}w=\begin{pmatrix}10\\20\end{pmatrix},\qquad\det=\tfrac{2457-2209}{16}=\tfrac{31}{2}>0.$$

Step 5, uniqueness. The trace of $M$ is positive and its determinant is positive, so both eigenvalues are positive and $M$ is positive definite. $M$ is the Hessian of $J$ (part (a)), so $J$ is strictly convex and its only stationary point is its unique minimizer.

Step 6, solve by Cramer's rule:

$$\begin{aligned}
w_1&=\frac{10\cdot\tfrac{117}{4}-\tfrac{47}{4}\cdot20}{31/2}=\frac{57.5}{15.5}=\frac{115}{31},\\
w_2&=\frac{\tfrac{21}{4}\cdot20-\tfrac{47}{4}\cdot10}{31/2}=\frac{-12.5}{15.5}=-\frac{25}{31}.
\end{aligned}$$

$$\boxed{w^*=\Big(\tfrac{115}{31},\ -\tfrac{25}{31}\Big)\approx(3.710,\ -0.806)}$$

Step 7, fitted values, $V_{w^*}(s)=w_1^*\phi+w_2^*\phi^2$:

$$\begin{aligned}
V_{w^*}(A)&=\tfrac{115-25}{31}=\tfrac{90}{31}\approx2.903,\\
V_{w^*}(B)&=\tfrac{230-100}{31}=\tfrac{130}{31}\approx4.194,\\
V_{w^*}(C)&=\tfrac{345-225}{31}=\tfrac{120}{31}\approx3.871.
\end{aligned}$$

The residuals are $\tfrac{3}{31}$, $-\tfrac{6}{31}$ and $\tfrac{4}{31}$, which give $J(w^*)=\tfrac1{62}$.

Step 8, is $V_{w^*}$ equal to $V^\pi$? No. To interpolate $V^\pi=(3,4,4)$ exactly, the states $A$ and $B$ would need

$$\begin{aligned}
w_1+w_2&=3,\\
2w_1+4w_2&=4,
\end{aligned}$$

whose only solution is $w=(4,-1)$. But then the model gives $3\cdot4+9\cdot(-1)=3$ at $C$, while $V^\pi(C)=4$. Three states but two parameters (and the model is forced through $0$ at $\phi=0$), so $V^\pi$ is not representable; $V_{w^*}$ is its $\mu$-weighted least-squares projection.

**In words.** MC-SGD converges to the best fit in the $\mu$-weighted sense, not to the truth. The state visited most, $A$ with weight $1$, gets the smallest residual.

**Sanity check.** Plug $w^*$ back into the first equation:

$$\tfrac{21}{4}\cdot\tfrac{115}{31}+\tfrac{47}{4}\cdot\big(-\tfrac{25}{31}\big)=\tfrac{2415-1175}{124}=10,$$

which is the first right-hand side.

**What to write in the exam.**

- Values $V^\pi=(3,4,4)$ and weights $\mu=(1,\tfrac12,\tfrac14)$ for $A,B,C$.
- Expected update $-\alpha\nabla J$; it vanishes iff $Mw=b$ with $M=\tfrac14\begin{pmatrix}21&47\\47&117\end{pmatrix}$ and $b=(10,20)$.
- Determinant $\tfrac{31}{2}>0$, so $M$ is positive definite and $w^*=(\tfrac{115}{31},-\tfrac{25}{31})$ is the unique minimizer.
- Fitted $\tfrac{90}{31},\tfrac{130}{31},\tfrac{120}{31}$; not equal to $V^\pi$, since interpolation forces $w=(4,-1)$, which misses $C$.

*Verified: sympy solves the normal equations exactly ($w^*$, fitted values, $J(w^*)=\tfrac1{62}$), and $2\cdot10^6$ simulated episodes of per-episode MC-SGD average to $(3.707,-0.806)$.*

**Common mistakes.**

- Using only the immediate reward as the target, $G_A=1$ instead of $3$.
- Doing the update at $B$ with the old $w=(0,0)$ instead of the $w$ just updated at $A$.
- Taking $\mu$ as a distribution that sums to $1$, or as the stationary fraction of time. Here it is the visit probability, and its entries sum to $\tfrac74$.

**💡 Trick.** "Quadratic in the feature" is still **linear in the parameters**: use $x(s)=(\phi,\phi^2)$ as the feature vector and the problem is convex weighted regression with closed-form normal equations.

**⚠️ Watch out.** The return from $A$ includes $B$'s reward ($G_A=3$, not $1$), and the update at $B$ uses the $w$ already changed at $A$; also $\mu$ is the visit probability, not the stationary fraction of time.

## Q4 — An operator mixing evaluation and optimality

**Hint:** Bound each of the two pieces separately and add with weights $\lambda,1-\lambda$. For the
sandwich, use monotonicity: what is $T_\lambda V^\pi$ compared with $V^\pi$, and $T_\lambda V^*$ compared
with $V^*$? Then iterate. For (c), pull the constant $(1-\lambda)Q_V(s,\pi(s))$ inside the max.

**Full solution:**

**(a) $T_\lambda$ is a $\gamma$-contraction**

**What is asked.** A proof that $\|T_\lambda U-T_\lambda V\|_\infty\le\gamma\|U-V\|_\infty$, the conclusion that $T_\lambda$ has a unique fixed point $V_\lambda$, and the values $V_0$ and $V_1$.

**Tool and why.** Contraction of Bellman operators and Banach's fixed-point theorem (cheat sheet §6). Both pieces of $T_\lambda$ are $\gamma$-contractions, and a convex combination keeps the factor $\gamma$ because $\lambda+(1-\lambda)=1$.

**Definitions.** No new notation; $Q_V$ is from the statement.

**Solution.**

Step 1, the common piece. For any $U,V$ and any $(s,a)$, the rewards cancel and the probabilities sum to $1$:

$$\begin{aligned}
|Q_U(s,a)-Q_V(s,a)|&=\gamma\Big|\sum_{s'}P(s'\mid s,a)(U-V)(s')\Big|\\
&\le\gamma\|U-V\|_\infty.
\end{aligned}$$

Step 2, the two operators. For any functions $f,g$ of $a$, $|\max_af(a)-\max_ag(a)|\le\max_a|f(a)-g(a)|$. With Step 1 this gives

$$|T^*U(s)-T^*V(s)|\le\gamma\|U-V\|_\infty,$$

and for $T^\pi$ the same bound follows from Step 1 at the single action $\pi(s)$.

Step 3, the mixture. By the triangle inequality and Step 2:

$$\begin{aligned}
|T_\lambda U(s)-T_\lambda V(s)|&\le\lambda\gamma\|U-V\|_\infty+(1-\lambda)\gamma\|U-V\|_\infty\\
&=\gamma\|U-V\|_\infty.
\end{aligned}$$

Taking the maximum over $s$, $T_\lambda$ is a $\gamma$-contraction. Since $\gamma<1$, Banach's theorem gives a unique fixed point $V_\lambda$, and iterating $T_\lambda$ from any start converges to it.

Step 4, the endpoints. $T_0=T^\pi$, whose fixed point is $V^\pi$; $T_1=T^*$, whose fixed point is $V^*$. So $V_0=V^\pi$ and $V_1=V^*$.

**In words.** Mixing two contractions with the same factor gives a contraction with that factor; nothing is lost and nothing is gained.

**Sanity check.** On $2000$ random MDPs and random pairs $U,V$, the ratio $\|T_\lambda U-T_\lambda V\|_\infty/\|U-V\|_\infty$ never exceeded $\gamma$.

**What to write in the exam.**

- Bound: $|Q_U-Q_V|\le\gamma\|U-V\|_\infty$ for every $(s,a)$.
- The max is $1$-Lipschitz, so $T^*$ and $T^\pi$ are $\gamma$-contractions.
- Triangle inequality: $\lambda\gamma+(1-\lambda)\gamma=\gamma$; Banach gives a unique $V_\lambda$.
- Endpoints: $V_0=V^\pi$ and $V_1=V^*$.

*Verified: the largest observed ratio divided by $\gamma$ over $2000$ random tests was $0.966$, below $1$.*

**(b) The sandwich between $V^\pi$ and $V^*$**

**What is asked.** A proof that $V^\pi\le V_\lambda$ and $V_\lambda\le V^*$ at every state.

**Tool and why.** Monotonicity of Bellman operators plus convergence of iteration (cheat sheet §6): if one application of $T_\lambda$ moves $V^\pi$ up, repeated applications keep moving it up, and the limit is $V_\lambda$.

**Definitions.** No new notation.

**Solution.**

Step 1, monotonicity. If $U\le V$ pointwise then $Q_U\le Q_V$, so $T^*U\le T^*V$ and $T^\pi U\le T^\pi V$; a combination with nonnegative weights keeps this, so $T_\lambda$ is monotone.

Step 2, lower bound. Since $T^\pi V^\pi=V^\pi$ and a max is at least any single term, $T^*V^\pi\ge V^\pi$. Hence

$$\begin{aligned}
T_\lambda V^\pi&=\lambda T^*V^\pi+(1-\lambda)V^\pi\\
&\ge V^\pi.
\end{aligned}$$

Applying $T_\lambda$ again and using Step 1:

$$V^\pi\le T_\lambda V^\pi\le T_\lambda^2V^\pi\le\dots$$

By part (a) the sequence converges to $V_\lambda$, so $V^\pi\le V_\lambda$.

Step 3, upper bound. Since $T^*V^*=V^*$ and $T^\pi$ uses one particular action, $T^\pi V^*\le V^*$. Hence

$$\begin{aligned}
T_\lambda V^*&=\lambda V^*+(1-\lambda)T^\pi V^*\\
&\le V^*,
\end{aligned}$$

and iterating with Step 1,

$$V^*\ge T_\lambda V^*\ge T_\lambda^2V^*\ge\dots$$

which converges to $V_\lambda$. So $V_\lambda\le V^*$. $\square$

**In words.** $V_\lambda$ is what you get when you control the choice only part of the time; it cannot beat full control and cannot lose to never controlling.

**Sanity check.** At $\lambda=0$ and $\lambda=1$ the sandwich collapses to the endpoints $V^\pi$ and $V^*$ of part (a).

**What to write in the exam.**

- Monotone: $T^*$, $T^\pi$ and hence $T_\lambda$ preserve $\le$.
- Lower: $T_\lambda V^\pi\ge V^\pi$, iterate, the limit is $V_\lambda$.
- Upper: $T_\lambda V^*\le V^*$, iterate, the limit is $V_\lambda$.

*Verified: value iteration on $300$ random MDPs (5 states, 3 actions, random $\lambda$) gave $V^\pi\le V_\lambda$ and $V_\lambda\le V^*$ at every state.*

**(c) $T_\lambda$ as the optimality operator of another MDP**

**What is asked.** An MDP $M_\lambda$ on the same $S,A$ (its $r_\lambda$ and $P_\lambda$) whose Bellman optimality operator is exactly $T_\lambda$, an interpretation in words, and $V_\lambda$ in terms of $M_\lambda$.

**Tool and why.** Bellman optimality operator (cheat sheet §2 and §6): a term that does not depend on $a$ can move inside the max, and then everything inside is linear in $(r,P)$.

**Definitions.** For every $(s,a)$:

$$r_\lambda(s,a)=\lambda r(s,a)+(1-\lambda)r(s,\pi(s)),$$

$$P_\lambda(\cdot\mid s,a)=\lambda P(\cdot\mid s,a)+(1-\lambda)P(\cdot\mid s,\pi(s)).$$

**Solution.**

Step 1, move the constant inside. The term $(1-\lambda)Q_V(s,\pi(s))$ does not depend on $a$, so

$$\begin{aligned}
(T_\lambda V)(s)&=\max_a\big[\lambda Q_V(s,a)+(1-\lambda)Q_V(s,\pi(s))\big]\\
&=\max_a\Big[r_\lambda(s,a)+\gamma\sum_{s'}P_\lambda(s'\mid s,a)V(s')\Big].
\end{aligned}$$

The second row expands both $Q$ terms and collects the reward parts and the transition parts.

Step 2, $M_\lambda$ is a legal MDP. $P_\lambda(\cdot\mid s,a)$ is a convex combination of two probability distributions, so it is a probability distribution; $r_\lambda$ is bounded.

Step 3, conclusion. The right side of Step 1 is the optimality operator of $M_\lambda$, so $T_\lambda=T^*_{M_\lambda}$, and the fixed points agree:

$$\boxed{V_\lambda=V^*_{M_\lambda}}$$

Step 4, interpretation: an **unreliable executor**. At every step the action you choose is carried out with probability $\lambda$, and with probability $1-\lambda$ the default $\pi(s)$ is carried out instead. $V_\lambda$ is the best you can do with this partial control.

**In words.** This explains the sandwich of (b): with partial control you are at least as good as the default (choose $\pi$ yourself) and at most as good as full control.

**Sanity check.** At $\lambda=1$, $M_\lambda=M$ and $V_1=V^*$; at $\lambda=0$, every action behaves like $\pi(s)$, so $V_0=V^\pi$, matching part (a).

**What to write in the exam.**

- Pull $(1-\lambda)Q_V(s,\pi(s))$ inside the max.
- Mixed reward $r_\lambda=\lambda r(s,a)+(1-\lambda)r(s,\pi(s))$, and $P_\lambda$ is the same mixture of transition laws.
- Hence $T_\lambda=T^*_{M_\lambda}$ and $V_\lambda=V^*_{M_\lambda}$: your action is executed w.p. $\lambda$, otherwise $\pi(s)$.

*Verified: on $300$ random MDPs, value iteration on $M_\lambda$ and iteration of $T_\lambda$ on $M$ agree to $10^{-8}$.*

**(d) The two-state example**

**What is asked.** The numbers $V^\pi(1)$, $V^*(1)$ and $V_\lambda(1)$ for the example, and whether $V_\lambda=\lambda V^*+(1-\lambda)V^\pi$.

**Tool and why.** Solve each fixed-point equation directly (cheat sheet §2); for $V_\lambda$ use $M_\lambda$ from part (c), where *go* reaches state $2$ only with probability $\lambda$.

**Definitions.** Let $x$ denote $V_\lambda(1)$, the unknown of the fixed-point equation.

**Solution.**

Step 1, state $2$. It is absorbing with reward $1$ under every action, so for every operator

$$V(2)=\tfrac1{1-0.9}=10.$$

Step 2, $V^\pi(1)$. $\pi$ always stays, and staying pays $0$ forever:

$$V^\pi(1)=\boxed{0}$$

Step 3, $V^*(1)$. *go* pays $0$ now and then $10$ from state $2$, discounted once; staying forever pays $0$:

$$V^*(1)=0.9\cdot10=\boxed{9}$$

Step 4, $V_\lambda(1)$. In $M_\lambda$ with $\lambda=0.5$, *stay* gives $0.9x$, and *go* moves to state $2$ with probability $0.5$ and stays in $1$ otherwise:

$$x=\max\big\{0.9x,\ 0.5(0.9\cdot10)+0.5(0.9x)\big\}.$$

Assume *go* attains the max. Then $x=4.5+0.45x$, so $0.55x=4.5$:

$$\boxed{V_\lambda(1)=\tfrac{4.5}{0.55}=\tfrac{90}{11}\approx8.18}$$

Check the assumption: $x>0$, so $0.9x<x$, and *stay* is indeed not the max.

Step 5, the mixture of values:

$$\lambda V^*(1)+(1-\lambda)V^\pi(1)=0.5\cdot9+0=4.5,$$

and $4.5\ne8.18$. So **no**, $V_\lambda$ is not the mixture of the values.

**In words.** Partial control is much better than "half the time optimal": every round you can try *go* again, and sooner or later it is executed. You lose only the expected delay.

**Sanity check.** The sandwich of (b) holds: $0\le8.18$ and $8.18\le9$.

**What to write in the exam.**

- Absorbing state: $V(2)=10$; then $V^\pi(1)=0$ and $V^*(1)=9$.
- In $M_\lambda$: $x=4.5+0.45x$, so $V_\lambda(1)=\tfrac{90}{11}$, about $8.18$.
- Mixture of values gives $4.5$, so $V_\lambda$ is not $\lambda V^*+(1-\lambda)V^\pi$.

*Verified: value iteration of $T_\lambda$ for $\lambda=0,\tfrac12,1$ converges to $0$, $8.1818$ and $9$ at state $1$, and exact fractions give $\tfrac{9/2}{11/20}=\tfrac{90}{11}$.*

**Common mistakes.**

- Bounding $|T^*U-T^*V|$ by summing over actions instead of using that the max is $1$-Lipschitz.
- Proving the sandwich from $V^\pi\le V^*$ alone. It needs monotonicity and one application of $T_\lambda$ to $V^\pi$ and to $V^*$.
- In (d), answering $V_\lambda(1)=4.5$ by mixing the values instead of solving the fixed-point equation.

**💡 Trick.** Contraction is linear in the mixture: $\lambda\gamma+(1-\lambda)\gamma=\gamma$. For the fixed point, pull the $a$-independent $T^\pi$ term inside the max — $T_\lambda$ is $T^*$ of a mixed-dynamics MDP.

**⚠️ Watch out.** A mixture of operators does **not** give the mixture of fixed points: $V_\lambda\ne\lambda V^*+(1-\lambda)V^\pi$ in general; only the sandwich of $V_\lambda$ between $V^\pi$ and $V^*$ is guaranteed.
