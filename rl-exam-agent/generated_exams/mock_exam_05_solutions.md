# Mock Exam 5 — Solutions

Every numeric answer was verified with a python3 computation (exact policy iteration with rational
arithmetic and value iteration for Q1, plus 2000 random instances for the threshold claim; value
iteration / policy enumeration on every Q2 counterexample and 500 random MDPs for the shaping identity;
finite differences and 4·10⁶-sample Monte-Carlo for the Q3 scores and gradients; random contraction-ratio
tests and fixed-point iteration for Q4).

## Q1 — Battery-charging robot: model, policy iteration, threshold

**Hint:** The state is just the battery level; level $0$ has a single forced action. For a fixed policy,
every Work state satisfies $V(b)=1+\gamma\big(qV(b-1)+(1-q)V(b)\big)$, which you can solve for $V(b)$ in
terms of $V(b-1)$ — so each evaluation is a chain of substitutions closed by the equation of level $0$.
Charge is worth $\gamma V(3)$ at **every** level: what does that say about where it can win?

**Full solution:**

**(a) The MDP**

**What is asked.** Translate the robot story into the parts of a discounted MDP: states, the actions of every state, rewards and transition probabilities. The answer is a definition, not a number.

**Tool and why.** Modelling a story as an MDP (cheat sheet §12): the state is whatever we must know at decision time to act well. Rewards and transitions depend only on the current battery level and the action, so the level alone is the state. The objective is an infinite-horizon discounted return (cheat sheet §1).

**Definitions.** We write $\mathrm{W}$ for Work, $\mathrm{Ch}$ for Charge and $\mathrm{R}$ for the forced rescue at level $0$. Giving the forced move a name lets level $0$ use the same notation as the other levels.

**Solution.**

Step 1, states: $S=\{0,1,2,3\}$, the battery level. Nothing else is needed, because the story's rewards and transitions are functions of the level and the action only.

Step 2, actions: $A(0)=\{\mathrm{R}\}$, because an empty robot must be rescued. For $b\ge1$ the robot chooses, so $A(b)=\{\mathrm{W},\mathrm{Ch}\}$.

Step 3, rewards and transitions, read off the story:

| state | action | next state, probability | reward |
|---|---|---|---|
| $0$ | rescue | $3$ w.p. $1$ | $-C$ |
| $b\ge1$ | Work | $b-1$ w.p. $q$; $b$ w.p. $1-q$ | $1$ |
| $b\ge1$ | Charge | $3$ w.p. $1$ | $0$ |

With the numbers: $-C=-5$ and $q=\tfrac12$.

Step 4, objective: maximise $\mathbb{E}\big[\sum_{t\ge0}\gamma^t r_t\big]$ with $\gamma=0.9$. The sets $S$ and $A(b)$ are finite and $\gamma<1$, so a deterministic stationary optimal policy exists (cheat sheet §3). We therefore look for one action per level.

**In words.** Work earns now but drains the battery; Charge earns nothing now but refills it; letting the battery reach $0$ costs $C$. The whole question is the trade-off between these three.

**Sanity check.** In every row the probabilities sum to $1$: for Work $q+(1-q)=1$, and the other two rows are deterministic.

**What to write in the exam.**

- States $S=\{0,1,2,3\}$; at level $0$ only the rescue, at $b\ge1$ Work or Charge.
- Rescue: reward $-5$, next level $3$.
- Work: reward $1$, next level $b-1$ or $b$, each with probability $\tfrac12$.
- Charge: reward $0$, next level $3$.
- Objective: expected discounted return with $\gamma=0.9$.

*Verified: the MDP was coded in Python with exact fractions; it reproduces every value in (b)–(e).*

**(b) Bellman optimality equations**

**What is asked.** The four equations for $V^*(0),\dots,V^*(3)$ with $\gamma=0.9$, $q=\tfrac12$ and $C=5$ substituted. The answer is a set of equations.

**Tool and why.** The Bellman optimality equation (cheat sheet §2): the optimal value of a state is the maximum over its actions of the immediate reward plus the discounted expected optimal value of the next state. It applies directly because (a) gave every reward and transition probability.

**Definitions.** No new notation.

**Solution.**

Step 1, level $0$: the only action is the rescue, with reward $-5$ and next level $3$ for sure, so there is no maximum to take:

$$V^*(0)=-5+0.9\,V^*(3).$$

Step 2, Work at $b\ge1$: reward $1$; the next level is $b-1$ with probability $\tfrac12$ and $b$ with probability $\tfrac12$. Each next value is therefore multiplied by $0.9\cdot\tfrac12=0.45$:

$$Q^*(b,\mathrm{W})=1+0.45\,V^*(b-1)+0.45\,V^*(b).$$

Step 3, Charge at $b\ge1$: reward $0$ and next level $3$ for sure:

$$Q^*(b,\mathrm{Ch})=0.9\,V^*(3).$$

Step 4, take the better action at each level:

$$\begin{aligned}
V^*(1)&=\max\{1+0.45V^*(0)+0.45V^*(1),\ 0.9V^*(3)\},\\
V^*(2)&=\max\{1+0.45V^*(1)+0.45V^*(2),\ 0.9V^*(3)\},\\
V^*(3)&=\max\{1+0.45V^*(2)+0.45V^*(3),\ 0.9V^*(3)\}.
\end{aligned}$$

**In words.** $V^*(b)$ appears on both sides of the Work term because half the time Work leaves the battery where it is (a self-loop). The Charge term is the same number at every level.

**Sanity check.** At $b=3$, Charge returns to level $3$ after a wasted step. If Charge were optimal there we would get $V^*(3)=0.9V^*(3)$, so $V^*(3)=0$; since Work earns at least $1$ now, this cannot happen, and Charge at a full battery is never optimal.

**What to write in the exam.**

- Level $0$: $V^*(0)=-5+0.9V^*(3)$.
- Levels $b=1,2,3$: $V^*(b)$ is the maximum of $1+0.45V^*(b-1)+0.45V^*(b)$ (Work) and $0.9V^*(3)$ (Charge).

*Verified: the exact $V^*$ of (c) satisfies all four equations exactly in fractions.*

**(c) Policy iteration**

**What is asked.** Run policy iteration from $\pi_0$ = always Work: write and solve the evaluation equations of each policy, compute both $Q$-values at $b=1,2,3$, improve, and stop when the policy does not change. Report $\pi^*$, $V^*$ and the number of evaluations.

**Tool and why.** Policy iteration (cheat sheet §3): evaluation solves the linear system of the current policy exactly, and improvement picks the greedy action of its $Q$-values. On a finite MDP it stops after finitely many rounds at an optimal policy; here there are only $2^3=8$ policies.

**Definitions.** $V^{\pi_k}$ is the value of the $k$-th policy and $Q^{\pi_k}(b,\cdot)$ its $Q$-values. Charge has the same value at every level, $Q^{\pi_k}(b,\mathrm{Ch})=0.9V^{\pi_k}(3)$, so it is computed once per round. When both actions tie we choose Work, as the statement says.

**Solution.**

Step 1, evaluation equations of $\pi_0$: level $0$ gives $V^{\pi_0}(0)=-5+0.9V^{\pi_0}(3)$, and each level $b=1,2,3$ works:

$$V^{\pi_0}(b)=1+0.45\,V^{\pi_0}(b-1)+0.45\,V^{\pi_0}(b).$$

Step 2, solve the Work equation for $V^{\pi_0}(b)$: move $0.45V^{\pi_0}(b)$ to the left and divide by $0.55=\tfrac{11}{20}$:

$$\begin{aligned}
0.55\,V^{\pi_0}(b)&=1+0.45\,V^{\pi_0}(b-1)\\
V^{\pi_0}(b)&=\tfrac{20}{11}+\tfrac{9}{11}\,V^{\pi_0}(b-1).
\end{aligned}$$

Step 3, substitute up the chain from $b=1$ to $b=3$; each step multiplies the previous level by $\tfrac{9}{11}$:

$$\begin{aligned}
V^{\pi_0}(3)&=\tfrac{20}{11}\Big(1+\tfrac{9}{11}+\tfrac{81}{121}\Big)+\tfrac{729}{1331}\,V^{\pi_0}(0)\\
&\approx4.5229+0.5477\,V^{\pi_0}(0).
\end{aligned}$$

Step 4, close the chain with the level-$0$ equation, using $0.9\cdot4.5229\approx4.0706$ and $0.9\cdot0.5477\approx0.4929$:

$$\begin{aligned}
V^{\pi_0}(0)&=-5+0.9\,\big(4.5229+0.5477\,V^{\pi_0}(0)\big)\\
&\approx-0.9294+0.4929\,V^{\pi_0}(0).
\end{aligned}$$

So $0.5071\,V^{\pi_0}(0)\approx-0.9294$, which gives $V^{\pi_0}(0)\approx-1.8329$. Substituting back through Step 2 gives the other levels; in exact fractions

$$V^{\pi_0}=\tfrac{1}{6749}(-12370,\,2150,\,14030,\,23750)\approx(-1.8329,\ 0.3186,\ 2.0788,\ 3.5190).$$

Step 5, improvement: Charge is worth $0.9\cdot3.5190\approx3.1671$ at every level. Since $\pi_0$ works everywhere, $Q^{\pi_0}(b,\mathrm{W})$ is exactly the right side of the evaluation equation, i.e. $V^{\pi_0}(b)$:

| $b$ | $Q^{\pi_0}(b,\mathrm{W})$ | $Q^{\pi_0}(b,\mathrm{Ch})$ | greedy |
|---|---|---|---|
| $1$ | $0.3186$ | $3.1671$ | Charge |
| $2$ | $2.0788$ | $3.1671$ | Charge |
| $3$ | $3.5190$ | $3.1671$ | Work |

So $\pi_1$ charges at $b=1,2$ and works at $b=3$.

Step 6, evaluation of $\pi_1$: levels $1$ and $2$ charge, so $V^{\pi_1}(1)$ and $V^{\pi_1}(2)$ both equal $0.9V^{\pi_1}(3)$, and $V^{\pi_1}(0)=-5+0.9V^{\pi_1}(3)$. Level $3$ works; substitute $V^{\pi_1}(2)$:

$$\begin{aligned}
V^{\pi_1}(3)&=1+0.45\cdot0.9\,V^{\pi_1}(3)+0.45\,V^{\pi_1}(3)\\
&=1+0.855\,V^{\pi_1}(3).
\end{aligned}$$

Hence

$$V^{\pi_1}(3)=\tfrac{1}{0.145}=\tfrac{200}{29}\approx6.8966.$$

Then $0.9\cdot\tfrac{200}{29}=\tfrac{180}{29}$ for levels $1,2$, and $\tfrac{180}{29}-5=\tfrac{35}{29}$ for level $0$:

$$V^{\pi_1}=\tfrac{1}{29}(35,\,180,\,180,\,200)\approx(1.2069,\ 6.2069,\ 6.2069,\ 6.8966).$$

Step 7, improvement: Charge is worth $0.9\cdot\tfrac{200}{29}$, i.e. $\tfrac{180}{29}\approx6.2069$, everywhere. Work, from the formula of (b):

$$\begin{aligned}
Q^{\pi_1}(1,\mathrm{W})&=1+0.45\,(1.2069+6.2069)\approx4.3362,\\
Q^{\pi_1}(2,\mathrm{W})&=1+0.45\,(6.2069+6.2069)\approx6.5862,\\
Q^{\pi_1}(3,\mathrm{W})&=1+0.45\,(6.2069+6.8966)\approx6.8966.
\end{aligned}$$

| $b$ | $Q^{\pi_1}(b,\mathrm{W})$ | $Q^{\pi_1}(b,\mathrm{Ch})$ | greedy |
|---|---|---|---|
| $1$ | $4.3362$ | $6.2069$ | Charge |
| $2$ | $6.5862$ | $6.2069$ | Work |
| $3$ | $6.8966$ | $6.2069$ | Work |

So $\pi_2$ charges only at $b=1$.

Step 8, evaluation of $\pi_2$: $V^{\pi_2}(1)=0.9V^{\pi_2}(3)$ and $V^{\pi_2}(0)=-5+0.9V^{\pi_2}(3)$. Level $2$ works; after substituting $V^{\pi_2}(1)$ and moving $0.45V^{\pi_2}(2)$ left, $0.55V^{\pi_2}(2)=1+0.405V^{\pi_2}(3)$. Level $3$ works: $0.55V^{\pi_2}(3)=1+0.45V^{\pi_2}(2)$. Substitute $V^{\pi_2}(2)$ from the level-$2$ equation into the level-$3$ one and collect $V^{\pi_2}(3)$:

$$\begin{aligned}
\Big(0.55-\tfrac{0.45\cdot0.405}{0.55}\Big)V^{\pi_2}(3)&=1+\tfrac{0.45}{0.55}\\
\tfrac{481}{2200}\,V^{\pi_2}(3)&=\tfrac{20}{11}\\
V^{\pi_2}(3)&=\tfrac{4000}{481}\approx8.3160.
\end{aligned}$$

Then level $1$ is $0.9\cdot\tfrac{4000}{481}=\tfrac{3600}{481}$, level $0$ is $\tfrac{3600}{481}-5=\tfrac{1195}{481}$, and level $2$ is $\tfrac{1+0.405\cdot4000/481}{0.55}=\tfrac{3820}{481}$:

$$V^{\pi_2}=\tfrac{1}{481}(1195,\,3600,\,3820,\,4000)\approx(2.4844,\ 7.4844,\ 7.9418,\ 8.3160).$$

Step 9, improvement: Charge is worth $\tfrac{3600}{481}\approx7.4844$ everywhere. Work at $b=1$ is $1+0.45(2.4844+7.4844)\approx5.4860$; at $b=2,3$ Work is what $\pi_2$ does, so its $Q$-value is $V^{\pi_2}(b)$:

| $b$ | $Q^{\pi_2}(b,\mathrm{W})$ | $Q^{\pi_2}(b,\mathrm{Ch})$ | greedy |
|---|---|---|---|
| $1$ | $5.4860$ | $7.4844$ | Charge |
| $2$ | $7.9418$ | $7.4844$ | Work |
| $3$ | $8.3160$ | $7.4844$ | Work |

The greedy policy is $\pi_2$ again, so policy iteration stops and $\pi_2$ is optimal:

$$\boxed{\pi^*(1)=\mathrm{Ch},\quad \pi^*(2)=\pi^*(3)=\mathrm{W}}$$

$$\boxed{V^*=\tfrac{1}{481}(1195,\,3600,\,3820,\,4000)\approx(2.4844,\ 7.4844,\ 7.9418,\ 8.3160)}$$

Step 10, count: $\pi_0$, $\pi_1$ and $\pi_2$ were each evaluated once, so there were $\boxed{3}$ policy evaluations (two improvements changed the policy, the third confirmed it).

**In words.** Always working drains the battery into costly rescues, so the first improvement over-reacts and charges at two levels. The second evaluation shows that level $2$ still has enough battery to keep working, and only level $1$, one bad step away from a rescue, is worth charging.

**Sanity check.** Value iteration run to convergence gives the same $V^*$. Also $V^*$ is increasing in $b$, as (d) predicts, and the Bellman equation at $b=1$ holds: the larger of $5.4860$ and $7.4844$ is $V^*(1)$.

**What to write in the exam.**

- Evaluation of $\pi_0$: chain $V(b)=\tfrac{20}{11}+\tfrac{9}{11}V(b-1)$, closed by level $0$; values $(-1.8329,0.3186,2.0788,3.5190)$.
- Improvement: Charge $3.1671$ beats Work at $b=1,2$, so $\pi_1$ charges at $1,2$.
- Evaluation of $\pi_1$: $\tfrac{1}{29}(35,180,180,200)$; Work wins at $b=2$ ($6.5862$ against $6.2069$), so $\pi_2$ charges only at $1$.
- Evaluation of $\pi_2$: $\tfrac{1}{481}(1195,3600,3820,4000)$; the improvement keeps $\pi_2$, so it is optimal after $3$ evaluations.

*Verified: each linear system was solved exactly with sympy; the policy-iteration loop stops after 3 evaluations, and 2000 rounds of value iteration agree with $V^*$ to $10^{-12}$.*

**(d) Monotone value and threshold policy (general case)**

**What is asked.** For $L\ge2$ levels and arbitrary $\gamma$, $q$, $C$, prove that $V^*$ is non-decreasing in $b$, and deduce that Charge is strictly better exactly at the levels $b\le\tau$ for some $\tau$. The answer is a proof.

**Tool and why.** A structural property through the Bellman operator (cheat sheet §6): if $T$ maps a closed set of vectors into itself, value iteration started inside the set stays there, and its limit $V^*$ lies in the set too. Then the threshold follows from comparing an increasing Work value with a constant Charge value (cheat sheet §4).

**Definitions.** The set of non-decreasing vectors, which is the property we want $V^*$ to have:

$$\mathcal V=\{V\in\mathbb{R}^{L+1}:\ V(0)\le V(1)\le\dots\le V(L)\}.$$

For a vector $V$, the Work value at level $b\ge1$, introduced because it is the only part of the operator that depends on $b$:

$$W_V(b)=1+\gamma\big(qV(b-1)+(1-q)V(b)\big).$$

The Bellman optimality operator $T$: $(TV)(0)=-C+\gamma V(L)$, and for $b\ge1$, $(TV)(b)$ is the maximum of $W_V(b)$ and $\gamma V(L)$.

**Solution.**

**Claim 1.** If $V\in\mathcal V$ then $TV\in\mathcal V$.

Step 1, level $0$ against level $1$: the first inequality holds because $C>0$, the second because $(TV)(1)$ is a maximum one of whose terms is $\gamma V(L)$:

$$\begin{aligned}
(TV)(0)&=-C+\gamma V(L)\\
&<\gamma V(L)\\
&\le(TV)(1).
\end{aligned}$$

Step 2, level $b$ against level $b+1$, for $b$ from $1$ to $L-1$: the Charge term $\gamma V(L)$ is the same at both levels. For the Work term use $V(b-1)\le V(b)$ and $V(b)\le V(b+1)$, which hold because $V\in\mathcal V$, together with $q\ge0$, $1-q\ge0$ and $\gamma>0$:

$$\begin{aligned}
W_V(b)&=1+\gamma\big(qV(b-1)+(1-q)V(b)\big)\\
&\le1+\gamma\big(qV(b)+(1-q)V(b+1)\big)\\
&=W_V(b+1).
\end{aligned}$$

Both terms of the maximum are at least as large at $b+1$ as at $b$, so their maximum is too: $(TV)(b)\le(TV)(b+1)$. With Step 1 this proves Claim 1.

**Claim 2.** $V^*\in\mathcal V$. Let $V_0\equiv0$ and $V_{k+1}=TV_k$ (value iteration). We prove $V_k\in\mathcal V$ by induction on $k$, upward from $0$.

**Base.** $V_0\equiv0$ has all entries equal, so $V_0\in\mathcal V$.

**Hypothesis.** $V_k\in\mathcal V$ for some $k\ge0$.

**Step.** $V_{k+1}=TV_k$, and Claim 1 applied to $V_k$ (this is where the hypothesis is used) gives $V_{k+1}\in\mathcal V$.

Now $T$ is a $\gamma$-contraction in $\|\cdot\|_\infty$ (cheat sheet §6), so $V_k\to V^*$. Each inequality $V_k(b)\le V_k(b+1)$ is non-strict, so it survives the limit: $\mathcal V$ is closed and $V^*\in\mathcal V$.

Step 3, the threshold. Define the advantage of Work over Charge under $V^*$:

$$D(b)=Q^*(b,\mathrm{W})-Q^*(b,\mathrm{Ch})=W_{V^*}(b)-\gamma V^*(L).$$

By Step 2 applied to $V=V^*$ (allowed by Claim 2), $W_{V^*}$ is non-decreasing in $b$, and $\gamma V^*(L)$ does not depend on $b$. So $D$ is non-decreasing on $\{1,\dots,L\}$.

Step 4, the set where Charge wins: with ties going to Work, Charge is strictly better at $b$ exactly when $D(b)<0$. Let $\tau$ be the largest $b\ge1$ with $D(b)<0$, and $\tau=0$ if there is none. If $1\le b$ and $b\le\tau$, then $D(b)\le D(\tau)$ by monotonicity and $D(\tau)<0$, so Charge is strictly better. If $b>\tau$, then $D(b)\ge0$ by the choice of $\tau$, so Work is chosen. Hence Charge is strictly better at $b\ge1$ if and only if $b\le\tau$: a threshold policy.

**In words.** Charge always leads to the same place (a full battery), so it is worth the same at every level; Work is worth more the more battery is left. An increasing function crosses a constant at most once, and below the crossing Charge wins.

**Sanity check.** With the numbers of (c):

$$\begin{aligned}
D(1)&\approx5.4860-7.4844<0,\\
D(2)&\approx7.9418-7.4844>0,\\
D(3)&\approx8.3160-7.4844>0.
\end{aligned}$$

so $\tau=1$, which is exactly $\pi^*$.

**What to write in the exam.**

- Show $T$ maps non-decreasing vectors to non-decreasing vectors: level $0$ is below level $1$ because $C>0$; for $b\ge1$ the Charge term is constant and $W_V(b)\le W_V(b+1)$.
- Value iteration from $0$ stays in this closed set and converges to $V^*$, so $V^*$ is non-decreasing.
- $D(b)=W_{V^*}(b)-\gamma V^*(L)$ is non-decreasing, so $\{b: D(b)<0\}$ is an initial segment $\{1,\dots,\tau\}$.

*Verified: 2000 random instances of $(L,\gamma,q,C)$ with value iteration to convergence; $V^*$ was non-decreasing and the Charge set an initial segment every time.*

**(e) Two steps of value iteration**

**What is asked.** $V_1$ and $V_2$ from $V_0\equiv0$, the greedy policy with respect to $V_2$, whether it is optimal, and whether $V_2$ is close to $V^*$.

**Tool and why.** Value iteration $V_{k+1}=TV_k$ with the equations of (b) (cheat sheet §3), then greedy extraction: at each level pick the action with the larger one-step look-ahead value.

**Definitions.** Here $V_k$ denotes the $k$-th value-iteration iterate (not a policy value as in (c)).

**Solution.**

Step 1, $V_1$: substitute $V_0\equiv0$. Level $0$ gives $-5+0.9\cdot0=-5$. At $b\ge1$ Work gives $1$ and Charge gives $0$, so Work wins and $V_1(b)=1$:

$$V_1=(-5,\ 1,\ 1,\ 1).$$

Step 2, $V_2$: level $0$ gives $-5+0.9\cdot1=-4.1$. Charge gives $0.9\cdot V_1(3)=0.9$ at every level. Work:

| $b$ | Work | Charge | $V_2(b)$ |
|---|---|---|---|
| $1$ | $1+0.45(-5+1)=-0.8$ | $0.9$ | $0.9$ |
| $2$ | $1+0.45(1+1)=1.9$ | $0.9$ | $1.9$ |
| $3$ | $1+0.45(1+1)=1.9$ | $0.9$ | $1.9$ |

$$\boxed{V_1=(-5,\ 1,\ 1,\ 1),\qquad V_2=(-4.1,\ 0.9,\ 1.9,\ 1.9)}$$

Step 3, greedy with respect to $V_2$: Charge is worth $0.9\cdot1.9=1.71$ everywhere. Work:

$$\begin{aligned}
b=1:&\quad 1+0.45\,(-4.1+0.9)=-0.44,\\
b=2:&\quad 1+0.45\,(0.9+1.9)=2.26,\\
b=3:&\quad 1+0.45\,(1.9+1.9)=2.71.
\end{aligned}$$

So the greedy policy charges at $b=1$ and works at $b=2,3$: it is **already $\pi^*$**.

Step 4, distance to $V^*$: the gaps $V^*(b)-V_2(b)$ are about $6.58$, $6.58$, $6.04$ and $6.42$, so $\|V_2-V^*\|_\infty\approx6.58$. $V_2$ is still far from $V^*=(2.48,7.48,7.94,8.32)$.

**In words.** The greedy policy only needs the *ranking* of the two actions to be right, not the values. Charge loses at $b=2,3$ and wins at $b=1$ already with these rough values, so the policy converges long before the values do.

**Sanity check.** The contraction bound gives $\|V_2-V^*\|_\infty\le\gamma^2\|V_0-V^*\|_\infty$, and $0.81\cdot8.3160\approx6.74$, which is above the observed $6.58$, as it must be.

**What to write in the exam.**

- $V_1=(-5,1,1,1)$, because Work's $1$ beats Charge's $0$.
- $V_2=(-4.1,0.9,1.9,1.9)$; at $b=1$ Charge $0.9$ beats Work $-0.8$.
- Greedy for $V_2$: Charge $1.71$ against Work $-0.44$, $2.26$, $2.71$, so the policy is $\pi^*$, while $V_2$ is still about $6.6$ away from $V^*$.

*Verified: two exact value-iteration steps in fractions and the greedy step reproduce every number above.*

**Common mistakes.**

- Dropping the self-loop: Work keeps level $b$ with probability $1-q$, so $V(b)$ appears on both sides; forgetting it gives wrong values in every evaluation.
- Stopping after the second improvement: policy iteration is finished only after an improvement step that leaves the policy unchanged, so the count is $3$ evaluations, not $2$.
- In (d), asserting the threshold without first proving that $V^*$ is non-decreasing, or comparing actions at level $0$, where there is no choice.

**💡 Trick.** Charge has the same value $\gamma V(3)$ at every level while Work's value grows with $b$, so the comparison is "increasing function vs. constant" — a threshold, exactly as in the maintenance and stopping problems.

**⚠️ Watch out.** Policy iteration needs an exact solve of each linear system (including the forced rescue equation at $b=0$); and "converged" is declared only after an improvement step that leaves the policy unchanged — that third evaluation counts.

## Q2 — Discounted reward transforms: which preserve the optimal policy

**Hint:** For a fixed policy, write $V'^\pi$ as an expectation of a discounted sum and look for
telescoping. A transform is safe exactly when it changes the value of **every** policy at state $s$ by the
same amount (or by the same positive factor). To break a transform, build a two-action choice at $s_0$
whose two options the transform treats differently.

**Full solution:**

**(a) Potential-based shaping**

**What is asked.** Is $\pi^*$ necessarily optimal in $M'$ when $r'$ adds $\gamma\,\mathbb{E}\Phi(s')-\Phi(s)$? Also express $V'^\pi$ through $V^\pi$ and $\Phi$. The answer is yes or no with a proof, plus a formula.

**Tool and why.** Reward transforms (cheat sheet §5) together with the definition of $V^\pi$ as an expected discounted sum (cheat sheet §1). The added term is a difference of potentials one step apart, so the discounted sum should telescope.

**Definitions.** $(s_t,a_t)_{t\ge0}$ is the trajectory of $\pi$ started at $s_0=s$, and $\mathbb{E}^\pi_s$ is the expectation over it. $\|\Phi\|_\infty$ is the largest $|\Phi(s)|$; it is finite because $S$ is finite, and we need it to make the tail of the sum vanish.

**Solution.** Verdict: **yes**.

Step 1, replace the expected next potential by the actual one. Given $(s_t,a_t)$, the next state is drawn from $P(\cdot\mid s_t,a_t)$, so by the tower property

$$\mathbb{E}^\pi_s\Big[\sum_{s'}P(s'\mid s_t,a_t)\Phi(s')\Big]=\mathbb{E}^\pi_s\big[\Phi(s_{t+1})\big].$$

Step 2, write $V'^\pi$ by definition and split $r'$ into $r$ plus the shaping term:

$$\begin{aligned}
V'^\pi(s)&=\mathbb{E}^\pi_s\Big[\sum_{t\ge0}\gamma^t r'(s_t,a_t)\Big]\\
&=V^\pi(s)+\mathbb{E}^\pi_s\Big[\sum_{t\ge0}\big(\gamma^{t+1}\Phi(s_{t+1})-\gamma^t\Phi(s_t)\big)\Big].
\end{aligned}$$

Step 3, telescope. In the partial sum up to $T-1$ every middle term appears once with a plus sign and once with a minus sign:

$$\sum_{t=0}^{T-1}\big(\gamma^{t+1}\Phi(s_{t+1})-\gamma^t\Phi(s_t)\big)=\gamma^T\Phi(s_T)-\Phi(s_0).$$

The first term is at most $\gamma^T\|\Phi\|_\infty$ in absolute value, which tends to $0$, and the partial sums are bounded by $2\|\Phi\|_\infty$, so the limit can be taken inside the expectation. Since $s_0=s$, the bracket equals $-\Phi(s)$:

$$\boxed{V'^\pi(s)=V^\pi(s)-\Phi(s)}$$

for every policy $\pi$ and every state $s$. The same computation started from $(s,a)$ gives $Q'^\pi(s,a)=Q^\pi(s,a)-\Phi(s)$.

Step 4, optimality. For every $s$ and every $\pi$, using that $\pi^*$ is optimal in $M$ in the middle step:

$$\begin{aligned}
V'^{\pi^*}(s)&=V^*(s)-\Phi(s)\\
&\ge V^\pi(s)-\Phi(s)\\
&=V'^\pi(s).
\end{aligned}$$

So $\pi^*$ is optimal in $M'$, and $V'^*=V^*-\Phi$.

**In words.** Shaping is a loan: arriving at $s'$ pays $\gamma\Phi(s')$ and leaving it charges $\Phi(s')$ back one step later, which is the same amount after discounting. Every policy ends up with the same net change, $-\Phi$ of the start state.

**Sanity check.** Take $\Phi\equiv k$ constant. Then $r'=r-(1-\gamma)k$ every step, and summing $-(1-\gamma)k\gamma^t$ gives $-k$, which is exactly $V^\pi-\Phi$.

**What to write in the exam.**

- Yes. By the tower property the added terms are $\gamma^{t+1}\Phi(s_{t+1})-\gamma^t\Phi(s_t)$.
- The sum telescopes to $-\Phi(s)$, because $\gamma^T\Phi(s_T)\to0$, so $V'^\pi=V^\pi-\Phi$ for every $\pi$.
- All policies shift by the same $-\Phi(s)$, so the order is kept and $\pi^*$ is optimal in $M'$.

*Verified: 500 random 3-state MDPs with random $\Phi$; for all 8 deterministic policies $V'^\pi=V^\pi-\Phi$ to $10^{-8}$.*

**(b) Shaping with the $\gamma$ forgotten**

**What is asked.** The same question when the shaping term is $\mathbb{E}\Phi(s')-\Phi(s)$ without $\gamma$. The answer is yes with a proof or no with a counterexample.

**Tool and why.** Split the new reward into the safe shaping of (a) plus a leftover (cheat sheet §5); the leftover does not telescope, so we look for a two-action counterexample at $s_0$.

**Definitions.** Two states $s_0,s_1$. At $s_0$ action $K$ (keep) gives reward $1$ and stays at $s_0$; action $G$ (go) gives reward $0$ and moves to $s_1$. State $s_1$ is absorbing with reward $0$.

**Solution.** Verdict: **no**.

Step 1, where the harm comes from:

$$r'(s,a)=\underbrace{r(s,a)+\gamma\,\mathbb{E}[\Phi(s')\mid s,a]-\Phi(s)}_{\text{shaping}}+(1-\gamma)\,\mathbb{E}[\Phi(s')\mid s,a].$$

The first part is harmless by (a). The second is a genuine bonus for moving to states with high $\Phi$; it does not telescope, so it can change the ranking.

Step 2, $Q^*$ in $M$: keeping forever is worth $\tfrac{1}{1-0.9}=10$, and going earns $0$ now and $0$ forever after, so $Q^*(s_0,G)=0$. So $\pi^*(s_0)=K$.

Step 3, the new rewards with $\Phi(s_0)=0$ and $\Phi(s_1)=20$:

$$\begin{aligned}
r'(s_0,K)&=1+0-0=1,\\
r'(s_0,G)&=0+20-0=20,\\
r'(s_1,\cdot)&=0+20-20=0.
\end{aligned}$$

Step 4, $Q'^*$: $s_1$ still pays $0$ forever, so $V'^*(s_1)=0$ and $Q'^*(s_0,G)=20$. If the agent goes, $V'^*(s_0)=20$, and keeping once and then going is worth

$$Q'^*(s_0,K)=1+0.9\cdot20=19.$$

These satisfy the Bellman equation, and keeping forever would be worth only $10$:

| action at $s_0$ | $Q^*$ in $M$ | $Q'^*$ in $M'$ |
|---|---|---|
| $K$ | $10$ | $19$ |
| $G$ | $0$ | $20$ |

The optimal action becomes $G$, so $\pi^*$ is not optimal in $M'$.

**In words.** Without the $\gamma$, the bonus $\Phi(s_1)$ collected on arrival is never fully paid back: the self-loop at $s_1$ pays $20$ and charges back $20$ every step, so the agent keeps the $20$ for ever.

**Sanity check.** With the $\gamma$ (part (a)) we get $r'(s_0,G)=18$ and $r'(s_1,\cdot)=-2$, so $V'^*(s_1)=-20$ and $Q'^*(s_0,G)=18-0.9\cdot20$, which is $0$, while $Q'^*(s_0,K)=10$: the ranking is unchanged, as (a) promises.

**What to write in the exam.**

- No. The leftover $(1-\gamma)\mathbb{E}\Phi(s')$ is a real bonus that does not telescope.
- Counterexample: keep ($r=1$, stay) or go ($r=0$, to absorbing $s_1$); $Q^*$ is $10$ against $0$.
- With $\Phi(s_1)=20$: $Q'^*(s_0,G)=20$ and $Q'^*(s_0,K)=19$, so the optimal action flips to go.

*Verified: value iteration on $M$, on $M'$ without $\gamma$, and on $M'$ with $\gamma$ gives $(10,0)$, $(19,20)$ and $(10,0)$.*

**(c) State-dependent positive scaling**

**What is asked.** Whether multiplying the reward by $c(s)>0$, possibly different in each state, keeps $\pi^*$ optimal, and what happens for one constant $c$. The answer is yes or no for each case.

**Tool and why.** Linearity of $V^\pi$ in the reward (cheat sheet §1, §5): a common factor comes out of the sum, but different factors in different states weigh policies that visit different states differently.

**Definitions.** Three states $s_0,s_1,z$; $z$ is absorbing with reward $0$. At $s_0$, action $L$ gives $0.5$ and moves to $z$, action $R$ gives $0$ and moves to $s_1$. At $s_1$ every action gives $1$ and moves to $z$.

**Solution.** Verdict: **no** for state-dependent $c(s)$; **yes** for a constant $c>0$.

Step 1, constant $c$: every term of the discounted sum is multiplied by $c$, so $V'^\pi=cV^\pi$ for every $\pi$. Multiplying the inequality $V^{\pi^*}\ge V^\pi$ by $c>0$ keeps it, so $\pi^*$ stays optimal.

Step 2, $Q^*$ in $M$: $Q^*(s_0,L)=0.5$ and $Q^*(s_0,R)=0.9\cdot1$, which is $0.9$, so $\pi^*(s_0)=R$.

Step 3, scale with $c(s_1)=0.1$, $c(s_0)=1$ and $c(z)=1$. Now $s_1$ pays $0.1$, so

$$Q'^*(s_0,R)=0.9\cdot0.1=0.09,\qquad Q'^*(s_0,L)=0.5.$$

| action at $s_0$ | $Q^*$ in $M$ | $Q'^*$ in $M'$ |
|---|---|---|
| $L$ | $0.5$ | $0.5$ |
| $R$ | $0.9$ | $0.09$ |

The optimal action becomes $L$.

**In words.** A state-dependent factor makes the reward of some states cheaper than others, so a policy that earns its reward in a down-weighted state loses against one that earns it elsewhere.

**Sanity check.** $R$ stays optimal exactly when $0.9\,c(s_1)>0.5$, i.e. for $c(s_1)$ above $\tfrac59$; with $c(s_1)=1$ nothing changes, as expected.

**What to write in the exam.**

- Constant $c>0$: $V'^\pi=cV^\pi$, so yes.
- State-dependent: no. Counterexample: $L$ pays $0.5$ now; $R$ pays $1$ one step later; $Q^*$ is $0.5$ against $0.9$.
- With $c(s_1)=0.1$: $Q'^*(s_0,R)=0.09$, below $0.5$, so the optimal action flips to $L$.

*Verified: value iteration on $M$ and $M'$ gives $(0.5,0.9)$ and $(0.5,0.09)$ at $s_0$.*

**(d) Adding a constant $\beta>0$**

**What is asked.** Case (i): a continuing MDP with $r'=r+\beta$ everywhere. Case (ii): an episodic MDP with terminal $z$, where $\beta$ is added only at non-terminal states. For each case, yes with a proof or no with a counterexample.

**Tool and why.** A constant per-step bonus adds $\beta$ times the discounted number of rewarded steps (cheat sheet §5). That number is the same for every policy in a continuing task, but depends on the policy when termination is a choice.

**Definitions.** For case (ii): two states $s_0,z$. At $s_0$, action $F$ (finish) gives $1$ and moves to $z$; action $W$ (wait) gives $0$ and stays at $s_0$.

**Solution.** Verdict: (i) **yes**, (ii) **no**.

Step 1, case (i): every policy collects $\beta$ at every step forever, so for every $\pi$ and $s$

$$\begin{aligned}
V'^\pi(s)&=V^\pi(s)+\sum_{t\ge0}\gamma^t\beta\\
&=V^\pi(s)+\tfrac{\beta}{1-\gamma}.
\end{aligned}$$

All policies are shifted by the same amount, so $\pi^*$ stays optimal and $Q'^*=Q^*+\tfrac{\beta}{1-\gamma}$. This is also the special case $\Phi\equiv-\tfrac{\beta}{1-\gamma}$ of (a), because then $\gamma\Phi-\Phi=-(1-\gamma)\Phi$, which equals $\beta$.

Step 2, case (ii), $Q^*$ in $M$: $Q^*(s_0,F)=1$, and waiting once and then finishing gives $Q^*(s_0,W)=0.9\cdot1$, which is $0.9$, so $\pi^*(s_0)=F$.

Step 3, case (ii) with $\beta=1$: $r'(s_0,F)=2$, $r'(s_0,W)=1$, and $z$ still pays $0$. Finishing is worth $Q'^*(s_0,F)=2$. Waiting forever is worth $\tfrac{1}{1-0.9}=10$, so

$$Q'^*(s_0,W)=1+0.9\cdot10=10.$$

| action at $s_0$ | $Q^*$ in $M$ | $Q'^*$ in $M'$ |
|---|---|---|
| $F$ | $1$ | $2$ |
| $W$ | $0.9$ | $10$ |

The optimal action becomes $W$: the agent never finishes.

**In words.** In an episodic task a bonus per living step pays the agent for staying alive; when the episode length is a choice, the bonus changes the choice.

**Sanity check.** In the counterexample, waiting forever is worth $10\beta$ and finishing $1+\beta$, so the flip happens exactly for $\beta$ above $\tfrac19$; with a negative $\beta$ (a cost per step) the bonus would instead push towards finishing early.

**What to write in the exam.**

- Case (i), yes: $V'^\pi=V^\pi+\tfrac{\beta}{1-\gamma}$ for every $\pi$, the same shift.
- Case (ii), no: the number of rewarded steps depends on the policy.
- Counterexample: finish ($1$) against wait ($0$); $Q^*$ is $1$ against $0.9$; with $\beta=1$, $Q'^*$ is $2$ against $10$.

*Verified: 300 random continuing MDPs give $Q'^*=Q^*+\tfrac{\beta}{1-\gamma}$ to $10^{-6}$; value iteration on the counterexample gives $(1,0.9)$ and $(2,10)$.*

**(e) Squaring the rewards**

**What is asked.** Whether $r'=r^2$ keeps $\pi^*$ optimal. The answer is yes with a proof or no with a counterexample.

**Tool and why.** Squaring is not affine, so values are not shifted or scaled uniformly (cheat sheet §5). It is convex, so it favours one large reward over several medium ones; a two-action counterexample at $s_0$ exploits that.

**Definitions.** Three states $s_0,s_A,z$; $z$ is absorbing with reward $0$. At $s_0$, action $D$ (spread) gives $0.6$ and moves to $s_A$; action $H$ (spike) gives $1$ and moves to $z$. At $s_A$ every action gives $0.6$ and moves to $z$.

**Solution.** Verdict: **no**.

Step 1, $Q^*$ in $M$:

$$Q^*(s_0,D)=0.6+0.9\cdot0.6=1.14,\qquad Q^*(s_0,H)=1.$$

So $\pi^*(s_0)=D$.

Step 2, after squaring, $0.6^2=0.36$ and $1^2=1$:

$$Q'^*(s_0,D)=0.36+0.9\cdot0.36=0.684,\qquad Q'^*(s_0,H)=1.$$

| action at $s_0$ | $Q^*$ in $M$ | $Q'^*$ in $M'$ |
|---|---|---|
| $D$ | $1.14$ | $0.684$ |
| $H$ | $1$ | $1$ |

The optimal action flips to $H$.

**In words.** Squaring keeps $0$ and $1$ in place but shrinks medium rewards much more than large ones, so a policy that collects several medium rewards loses against one large reward.

**Sanity check.** If every reward were $0$ or $1$, squaring would change nothing; that is why a counterexample needs rewards strictly between $0$ and $1$.

**What to write in the exam.**

- No. Squaring is convex, so it favours concentrated rewards.
- Counterexample: spread ($0.6$ twice) against spike ($1$ once); $Q^*$ is $1.14$ against $1$.
- After squaring: $0.684$ against $1$, so the optimal action flips.

*Verified: value iteration on $M$ and $M'$ gives $(1.14,1)$ and $(0.684,1)$ at $s_0$.*

**Common mistakes.**

- Answering "yes" after checking one example: "necessarily" requires a proof for every MDP, while "no" requires one explicit counterexample with all numbers.
- In (b), assuming the sum still telescopes: without $\gamma$ the arrival bonus is not repaid after discounting.
- In (d)(ii), forgetting that the terminal state receives no $\beta$, which is exactly why the number of rewarded steps depends on the policy.

**💡 Trick.** A transform is safe exactly when $V'^\pi=\kappa V^\pi+g(s)$ with the same $\kappa>0$ and $g$ for all policies — potential shaping ($g=-\Phi$), a global positive scale, and a constant shift in a continuing task all have this form; everything else gets a two-action counterexample at $s_0$.

**⚠️ Watch out.** The $\gamma$ in $\gamma\Phi(s')-\Phi(s)$ is what makes the sum telescope — drop it and you pay a real bonus for reaching high-$\Phi$ states; and "add a constant" is safe only when every policy collects the same number of rewards (no policy-dependent termination).

## Q3 — Policy gradient for a logistic-distributed continuous action

**Hint:** Write $\log f=-z-\log\sigma-2\log(1+e^{-z})$ with $z=(a-\mu)/\sigma$, and differentiate in $z$
first — the result simplifies to a $\tanh$. Then use the chain rule $\partial z/\partial\mu=-1/\sigma$,
$\partial\sigma/\partial w=\sigma$. For (d) you never need the score: $\mathbb{E}[(a-c)^2]$ is
variance plus squared bias.

**Full solution:**

**(a) Concavity, symmetry and the most likely action**

**What is asked.** Show that $\log f$ is strictly concave in $a$ and that $f$ is symmetric around $\mu$, and conclude that the most likely action is $\theta\cdot\phi(s)$. The answer is a proof.

**Tool and why.** A second-derivative test in the standardized variable $z$, where the formulas are simplest; this is the same computation that later gives the score (cheat sheet §9).

**Definitions.** $z=(a-\mu)/\sigma$, the standardized action, and $\ell(z)$ for $\log f$ written as a function of $z$.

**Solution.**

Step 1, the log-density, by taking the log of each factor of $f$:

$$\ell(z)=-z-\log\sigma-2\log\big(1+e^{-z}\big).$$

Step 2, first derivative in $z$: the derivative of $\log(1+e^{-z})$ is $-\tfrac{e^{-z}}{1+e^{-z}}$; then bring to a common denominator and use the given $\tanh$ formula with $u=z/2$:

$$\begin{aligned}
\ell'(z)&=-1+\frac{2e^{-z}}{1+e^{-z}}\\
&=-\frac{1-e^{-z}}{1+e^{-z}}\\
&=-\tanh(z/2).
\end{aligned}$$

Step 3, second derivative: the derivative of $\tanh(z/2)$ is $\tfrac12\mathrm{sech}^2(z/2)$, which is positive, so

$$\ell''(z)=-\tfrac12\,\mathrm{sech}^2(z/2)<0.$$

Step 4, back to $a$: $z$ is an increasing affine function of $a$ with slope $\tfrac1\sigma$, so the second derivative of $\log f$ in $a$ is $\ell''(z)/\sigma^2$, which is negative. Hence $\log f$ is strictly concave in $a$.

Step 5, symmetry: $f$ depends on $a$ only through $\tfrac{e^{-z}}{(1+e^{-z})^2}$. Multiply numerator and denominator by $e^{2z}$:

$$\frac{e^{-z}}{(1+e^{-z})^2}=\frac{e^{-z}\,e^{2z}}{\big(e^{z}(1+e^{-z})\big)^2}=\frac{e^{z}}{(1+e^{z})^2}.$$

The expression is unchanged when $z$ is replaced by $-z$, so $f(\mu+u)=f(\mu-u)$ for every $u$.

Step 6, the mode: a strictly concave function has at most one maximiser, and $\ell'(z)=0$ exactly when $\tanh(z/2)=0$, i.e. at $z=0$, i.e. at $a=\mu$:

$$\boxed{a^*=\mu=\theta\cdot\phi(s)}$$

By symmetry this is also the mean.

**In words.** The logistic density is bell-shaped like a Gaussian, but its log is linear rather than quadratic in the tails ($\ell'(z)$ tends to $\mp1$), so its tails are exponential and heavier.

**Sanity check.** At $z=0$ the density is $\tfrac{1}{4\sigma}$, the largest value, and $\ell'(0)=0$, as a maximum must have.

**What to write in the exam.**

- With $z=(a-\mu)/\sigma$: $\ell'(z)=-\tanh(z/2)$ and $\ell''(z)=-\tfrac12\mathrm{sech}^2(z/2)$, which is negative, so $\log f$ is strictly concave in $a$.
- Multiplying by $e^{2z}$ shows the density is even in $z$, so $f(\mu+u)=f(\mu-u)$.
- The unique stationary point is $z=0$, so $a^*=\theta\cdot\phi(s)$.

*Verified: sympy confirms $\ell'$, the sign of $\ell''$ at random points, and that $f(\mu+z)-f(\mu-z)$ simplifies to $0$; numerical integration gives variance $\pi^2/3$.*

**(b) The score, its bound and the REINFORCE update**

**What is asked.** $\nabla_\theta\log\pi$ and $\tfrac{\partial}{\partial w}\log\pi$ in terms of $z$, the bound $\|\nabla_\theta\log\pi\|\le\|\phi(s)\|/\sigma$, a comparison with the Gaussian, and the REINFORCE update of $\theta$.

**Tool and why.** The chain rule for the score function (cheat sheet §9): $\theta$ enters only through $\mu$, and $w$ only through $\sigma$, and both reach $\log f$ through $z$, and part (a) already gives the derivative in that variable.

**Definitions.** $\mathrm{sgm}(z)=1/(1+e^{-z})$, the logistic sigmoid, used for an equivalent form of the score. $G_t=\sum_{t'\ge t}\gamma^{t'-t}r_{t'}$ is the return from time $t$.

**Solution.**

Step 1, derivative in $\mu$: $\partial z/\partial\mu=-1/\sigma$, and the term $-\log\sigma$ does not depend on $\mu$:

$$\frac{\partial\log f}{\partial\mu}=\ell'(z)\cdot\Big(-\frac1\sigma\Big)=\frac{\tanh(z/2)}{\sigma}.$$

Step 2, gradient in $\theta$: $\mu=\theta\cdot\phi(s)$, so $\nabla_\theta\mu=\phi(s)$. Also $\tanh(z/2)=2\,\mathrm{sgm}(z)-1$, because $\tfrac{2}{1+e^{-z}}-1=\tfrac{1-e^{-z}}{1+e^{-z}}$:

$$\nabla_\theta\log\pi(a\mid s;\theta,w)=\frac{1}{\sigma}\tanh\!\Big(\frac{z}{2}\Big)\phi(s)=\frac{2\,\mathrm{sgm}(z)-1}{\sigma}\,\phi(s).$$

Step 3, derivative in $\sigma$: $\sigma$ appears in the term $-\log\sigma$ and inside $z$, with $\partial z/\partial\sigma=-z/\sigma$:

$$\begin{aligned}
\frac{\partial\log f}{\partial\sigma}&=-\frac1\sigma+\ell'(z)\cdot\Big(-\frac{z}{\sigma}\Big)\\
&=\frac{z\tanh(z/2)-1}{\sigma}.
\end{aligned}$$

Step 4, derivative in $w$: $\sigma=e^w$, so $\partial\sigma/\partial w=\sigma$, which cancels the $\tfrac1\sigma$:

$$\frac{\partial}{\partial w}\log\pi(a\mid s;\theta,w)=z\tanh\!\Big(\frac z2\Big)-1.$$

Step 5, the bound: $|\tanh(z/2)|<1$ for every real $z$, so for every action $a$

$$\|\nabla_\theta\log\pi\|=\frac{|\tanh(z/2)|}{\sigma}\,\|\phi(s)\|\le\frac{\|\phi(s)\|}{\sigma}.$$

Step 6, the Gaussian: there the score is $\tfrac{a-\mu}{\sigma^2}\phi(s)$, which grows linearly in $|a-\mu|$ and is unbounded. A far-out sample then produces a huge update, so Gaussian gradient estimates have heavier variance; the logistic score saturates instead.

Step 7, REINFORCE: at time $t$ of an episode, with $G_t$ as defined,

$$\theta\leftarrow\theta+\alpha\,\gamma^t\,G_t\,\frac{1}{e^{w}}\tanh\!\Big(\frac{a_t-\theta\cdot\phi(s_t)}{2e^{w}}\Big)\phi(s_t).$$

(The class estimator $\sum_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)\,G_t$ omits the factor $\gamma^t$; either form is accepted.)

**In words.** The $\theta$-score is a "soft sign" of where the sample fell: it pushes the mean towards samples above it and away from samples below it, but never by more than $\|\phi(s)\|/\sigma$.

**Sanity check.** A score must have mean $0$. Here $\tanh(z/2)$ is odd and $z$ is symmetric, so the $\theta$-score has mean $0$; for the $w$-score this requires the mean of $z\tanh(z/2)$ to be $1$, and numerical integration gives exactly $1$.

**What to write in the exam.**

- Chain rule with $\partial z/\partial\mu=-1/\sigma$: $\nabla_\theta\log\pi=\tfrac1\sigma\tanh(z/2)\phi(s)$.
- With $\partial z/\partial\sigma=-z/\sigma$ and $\partial\sigma/\partial w=\sigma$: $\tfrac{\partial}{\partial w}\log\pi=z\tanh(z/2)-1$.
- Bound from $|\tanh|<1$; the Gaussian score $\tfrac{a-\mu}{\sigma^2}\phi(s)$ is unbounded.
- Update: $\theta$ plus $\alpha\gamma^tG_t$ times the score at $(s_t,a_t)$.

*Verified: the sympy derivatives of $\log f$ in $\mu$ and $\sigma$ match the formulas at three random points; numerical integration gives mean $0$ for $\tanh(z/2)$ and mean $1$ for $z\tanh(z/2)$.*

**(c) Two REINFORCE updates by hand**

**What is asked.** From $a_1=1.5$ and $a_2=-0.5$ at $\theta=0$: the averaged REINFORCE gradient and the new $\theta$, first without and then with the average-reward baseline; which update is larger and where both move $\theta$.

**Tool and why.** One-step REINFORCE (cheat sheet §9): the estimate is the average of reward times score. A baseline subtracts a constant from each reward, which keeps the expectation and can reduce the variance.

**Definitions.** $r_i$ is the reward of episode $i$, $\psi_i$ the score of $a_i$, $\hat g$ the estimate without baseline and $\hat g_b$ the estimate with baseline $b$. Here $\theta=0$, so $\mu=0$; also $\sigma=1$ and $\phi\equiv1$, so $z=a$ and $\psi_i=\tanh(a_i/2)$.

**Solution.**

Step 1, rewards, from $r(a)=-(a-1)^2$:

$$r_1=-(1.5-1)^2=-0.25,\qquad r_2=-(-0.5-1)^2=-2.25.$$

Step 2, scores, from $\psi_i=\tanh(a_i/2)$:

$$\psi_1=\tanh(0.75)\approx0.6351,\qquad \psi_2=\tanh(-0.25)\approx-0.2449.$$

Step 3, case (i), without baseline:

$$\begin{aligned}
\hat g&=\tfrac12\big(r_1\psi_1+r_2\psi_2\big)\\
&=\tfrac12\big(-0.25\cdot0.6351+(-2.25)(-0.2449)\big)\\
&=\tfrac12\,(-0.1588+0.5511)\\
&\approx0.1961.
\end{aligned}$$

$$\theta\leftarrow0+0.1\cdot0.1961\approx\boxed{0.0196}$$

Step 4, case (ii), with baseline, the average of the two rewards:

$$b=\tfrac12(-0.25-2.25)=-1.25,$$

so $r_1-b=1$ and $r_2-b=-1$:

$$\begin{aligned}
\hat g_b&=\tfrac12\big((r_1-b)\psi_1+(r_2-b)\psi_2\big)\\
&=\tfrac12\big(1\cdot0.6351+(-1)(-0.2449)\big)\\
&\approx0.4400.
\end{aligned}$$

$$\theta\leftarrow0+0.1\cdot0.4400\approx\boxed{0.0440}$$

Step 5, comparison: both estimates are positive, so both move $\theta$ up, towards the best action $a=1$. The baseline update is larger, about $0.0440$ against $0.0196$. The exact gradient at $\theta=0$ is $2$ (from (d) with $c=1$), so both have the right sign.

**In words.** Without the baseline both rewards are negative, so even the good sample $a_1$ is pushed down, and only the larger push-down of the bad sample makes the net step positive. With the baseline the good sample counts as $+1$ and the bad one as $-1$, and both push in the right direction.

**Sanity check.** The baseline does not bias the expected update, because the score has mean $0$ (part (b)); here it only changes how the two samples share the work.

**What to write in the exam.**

- Rewards $-0.25$ and $-2.25$; scores $\tanh(0.75)\approx0.6351$ and $\tanh(-0.25)\approx-0.2449$.
- Without baseline: $\hat g\approx0.1961$, new $\theta\approx0.0196$.
- With $b=-1.25$: $\hat g_b\approx0.4400$, new $\theta\approx0.0440$; both move up, towards $a=1$, and the baseline step is larger.

*Verified: Python with math.tanh gives $\hat g=0.19614$ and $\hat g_b=0.44003$.*

**(d) Exact objective, gradients and stationary points**

**What is asked.** $J(\theta,w)$ in closed form for $r(a)=-(a-c)^2$, its partial derivatives, all stationary points, and what gradient ascent does to $\sigma$.

**Tool and why.** No score is needed: the expected squared distance is variance plus squared bias, and the variance of the logistic is given. Then ordinary calculus (cheat sheet §9 for what the gradient means).

**Definitions.** No new notation.

**Solution.**

Step 1, closed form: $\mathbb{E}[(a-c)^2]=\mathrm{Var}(a)+(\mathbb{E}a-c)^2$, with mean $\theta$ and variance $\tfrac{\pi^2}{3}\sigma^2$, where $\sigma^2=e^{2w}$:

$$J(\theta,w)=-(\theta-c)^2-\frac{\pi^2}{3}e^{2w}.$$

Step 2, partial derivatives:

$$\frac{\partial J}{\partial\theta}=-2(\theta-c),\qquad \frac{\partial J}{\partial w}=-\frac{2\pi^2}{3}e^{2w}.$$

Step 3, stationary points: $\partial J/\partial\theta=0$ exactly when $\theta=c$. But $e^{2w}>0$, so $\partial J/\partial w<0$ everywhere and never vanishes. Hence $J$ has **no stationary point** with $\sigma>0$. For a fixed $\sigma$ the unique stationary point is

$$\boxed{\theta=c}$$

Step 4, gradient ascent: the $\theta$-step adds $-2\alpha(\theta-c)$, so the distance to $c$ shrinks by the factor $1-2\alpha$ each step and $\theta\to c$. The $w$-step is always negative, so $w$ decreases forever and $\sigma=e^w$ tends to $0$. $J$ increases towards its supremum $0$, which is not attained; the policy becomes deterministic at $a=c$.

**In words.** In this problem noise only costs reward and there is nothing to explore, so the best thing the policy can do is to aim exactly at $c$ and shrink its noise to zero.

**Sanity check.** At $\theta=0$, $w=0$, $c=1$: $\partial J/\partial\theta=2$, the exact gradient quoted in (c), and $\partial J/\partial w\approx-6.580$. A Monte-Carlo score-function estimate with $4\cdot10^6$ samples gives $2.002$ and $-6.586$.

**What to write in the exam.**

- Variance plus squared bias: $J=-(\theta-c)^2-\tfrac{\pi^2}{3}e^{2w}$.
- $\partial J/\partial\theta=-2(\theta-c)$ and $\partial J/\partial w=-\tfrac{2\pi^2}{3}e^{2w}$, always negative.
- No stationary point; ascent drives $\theta\to c$ and $\sigma\to0$; for fixed $\sigma$ the stationary point is $\theta=c$.

*Verified: Monte-Carlo with the score-function estimator ($4\cdot10^6$ logistic samples) reproduces $J$, $\partial J/\partial\theta$ and $\partial J/\partial w$ at $\theta=0$, $w=0$, $c=1$ to within $0.01$.*

**Common mistakes.**

- Losing the factor $-1/\sigma$ from $\partial z/\partial\mu$, which flips the sign of the score and sends $\theta$ the wrong way.
- Forgetting the explicit $-\log\sigma$ term when differentiating in $\sigma$, which loses the $-1$ in $z\tanh(z/2)-1$.
- In (c), reading the negative rewards as "both samples are bad": without a baseline the sign of each contribution reflects the reward's sign, not how good the action was.

**💡 Trick.** For a location family the $\theta$-score is (derivative of $-\log f$ at $z$)$\times\phi(s)/\sigma$; for the logistic that derivative is $\tanh(z/2)$, a bounded "soft sign" of how far the sample is from the mode.

**⚠️ Watch out.** The chain rule through $z=(a-\mu)/\sigma$ gives a factor $-1/\sigma$ (and $\sigma$ for $w=\log\sigma$) — sign errors here flip the update; and with all-negative rewards, REINFORCE without a baseline lowers the probability of even the good samples.

## Q4 — A capped Q-operator: contraction and fixed point

**Hint:** "Take the minimum with a fixed number" is 1-Lipschitz, so the cap cannot spoil the usual
$\gamma$-contraction of $Q\mapsto r+\gamma P\max Q$. For (c), compare $T_c$ with the Bellman optimality
operator $T^*$: $T_c\le T^*$ and both are monotone. For (d), compute the values of the self-loops first;
the cap acts *inside* the recursion.

**Full solution:**

**(a) Definition of a contraction**

**What is asked.** The definition of a $\gamma$-contraction in $\|\cdot\|_\infty$. The answer is a definition.

**Tool and why.** Operators and contraction (cheat sheet §6); this is the property that the Banach fixed-point theorem needs in (b).

**Definitions.** $\|Q\|_\infty$ is the largest $|Q(s,a)|$ over all pairs $(s,a)$.

**Solution.**

Step 1, the definition: an operator $H$ on $\mathbb{R}^{|S|\cdot|A|}$ is a $\gamma$-contraction in $\|\cdot\|_\infty$, for a constant $\gamma<1$, if

$$\|HQ-HQ'\|_\infty\le\gamma\,\|Q-Q'\|_\infty\qquad\text{for all }Q,Q'.$$

Step 2, why it matters: by the Banach fixed-point theorem such an $H$ has exactly one fixed point, and $H^kQ$ converges to it from every starting $Q$.

**In words.** One application of $H$ brings any two vectors closer, by at least the factor $\gamma$, in the worst coordinate.

**Sanity check.** The Bellman optimality operator $T^*$ is the standard example, with the discount as the factor.

**What to write in the exam.**

- $H$ is a $\gamma$-contraction if $\|HQ-HQ'\|_\infty\le\gamma\|Q-Q'\|_\infty$ for all $Q,Q'$, with $\gamma<1$.

*Verified: definition only; the random tests of (b) check this inequality numerically for $T_c$.*

**(b) $T_c$ is a $\gamma$-contraction**

**What is asked.** Prove that $T_c$ is a $\gamma$-contraction for every $c$, and conclude that it has a unique fixed point $\bar Q$. The answer is a proof.

**Tool and why.** The usual contraction proof for $T^*$ (cheat sheet §6), plus one lemma: taking the minimum with a fixed $c$ never increases distances, so the cap cannot spoil the contraction.

**Definitions.** For fixed $(s,a)$, $x$ is the uncapped value for $Q$ and $y$ the same for $Q'$:

$$x=r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\max_{a'}Q(s',a').$$

Then $(T_cQ)(s,a)=\min\{x,c\}$ and $(T_cQ')(s,a)=\min\{y,c\}$.

**Solution.**

Step 1, **Claim** (lemma): for all real $x,y,c$, $|\min\{x,c\}-\min\{y,c\}|\le|x-y|$. By symmetry assume $x\le y$; there are three cases.

- Case one, both at least $c$: both minima equal $c$, and the left side is $0$.
- Case two, both below $c$: the minima are $x$ and $y$, and the left side equals $|x-y|$.
- Case three, $x<c$ and $c\le y$: the minima are $x$ and $c$, and the left side is $c-x$, which is at most $y-x$.

Step 2, the max inequality $|\max_a u_a-\max_a v_a|\le\max_a|u_a-v_a|$: let $a_1$ maximise $u$. Then $\max u-\max v\le u_{a_1}-v_{a_1}$, which is at most $\max_a|u_a-v_a|$; swapping $u$ and $v$ gives the other direction.

Step 3, the chain. Row 1 is the lemma; in row 2 the reward cancels; row 3 uses the triangle inequality and Step 2; row 4 bounds each maximum by the sup-norm and uses that the probabilities sum to $1$:

$$\begin{aligned}
|(T_cQ)(s,a)-(T_cQ')(s,a)|&\le|x-y|\\
&=\gamma\,\Big|\sum_{s'}P(s'\mid s,a)\big(\max_{a'}Q(s',a')-\max_{a'}Q'(s',a')\big)\Big|\\
&\le\gamma\sum_{s'}P(s'\mid s,a)\max_{a'}|Q(s',a')-Q'(s',a')|\\
&\le\gamma\,\|Q-Q'\|_\infty.
\end{aligned}$$

Step 4, conclusion: the bound holds at every $(s,a)$, so taking the maximum over $(s,a)$ gives $\|T_cQ-T_cQ'\|_\infty\le\gamma\|Q-Q'\|_\infty$. By the Banach fixed-point theorem on the complete space $\mathbb{R}^{|S|\cdot|A|}$, $T_c$ has a unique fixed point $\bar Q$, and $T_c^kQ\to\bar Q$ from every $Q$.

**In words.** Capping can only bring two numbers closer together, never push them apart, so it inherits the contraction of the uncapped Bellman operator.

**Sanity check.** For very large $c$ the cap never binds and $T_c$ is $T^*$, a known $\gamma$-contraction. For $c$ below every possible value, $T_cQ\equiv c$ for every $Q$, and the distance after one step is $0$.

**What to write in the exam.**

- Lemma: $|\min\{x,c\}-\min\{y,c\}|\le|x-y|$, by the three cases.
- So $|T_cQ-T_cQ'|$ at $(s,a)$ is at most $\gamma\sum_{s'}P\,|\max Q-\max Q'|$, which is at most $\gamma\|Q-Q'\|_\infty$.
- Maximum over $(s,a)$ gives the contraction; Banach gives a unique $\bar Q$.

*Verified: 3000 random pairs on 600 random MDPs with random $c$; the ratio never exceeded $0.982\gamma$.*

**(c) Comparison with $Q^*$**

**What is asked.** Prove $\bar Q\le Q^*$ and $\bar Q\le c$ pointwise, prove that $\bar Q=Q^*$ exactly when $c\ge\max_{s,a}Q^*(s,a)$, and give a sufficient condition on $c$ that depends only on $\gamma$.

**Tool and why.** Monotone operators and uniqueness of the fixed point (cheat sheet §6): $T_c$ is never above $T^*$, both preserve order, and iterating $T_c$ from $Q^*$ can only go down.

**Definitions.** $T^*$ is the Bellman optimality operator on $Q$-functions, so that $T_cQ=\min\{T^*Q,c\}$ and $T^*Q^*=Q^*$. $Q\le Q'$ means $Q(s,a)\le Q'(s,a)$ at every pair.

**Solution.**

Step 1, $\bar Q\le c$: $\bar Q=T_c\bar Q$, and every entry of $T_c\bar Q$ is a minimum with $c$.

Step 2, $T_c$ is monotone: if $Q\le Q'$ then $\max_{a'}Q(s',a')\le\max_{a'}Q'(s',a')$ for every $s'$, so $T^*Q\le T^*Q'$ (the probabilities are non-negative and $\gamma>0$), and taking the minimum with the same $c$ keeps the order: $T_cQ\le T_cQ'$.

Step 3, **Claim**: $T_c^kQ^*\le Q^*$ for every $k\ge1$; induction on $k$, upward from $1$.

**Base.** $T_cQ^*=\min\{T^*Q^*,c\}$, which is at most $T^*Q^*=Q^*$.

**Hypothesis.** $T_c^kQ^*\le Q^*$ for some $k\ge1$.

**Step.** Apply the monotone $T_c$ to the hypothesis (this is where it is used), then the base:

$$\begin{aligned}
T_c^{k+1}Q^*&=T_c\big(T_c^kQ^*\big)\\
&\le T_cQ^*\\
&\le Q^*.
\end{aligned}$$

By (b), $T_c^kQ^*\to\bar Q$, and a non-strict inequality survives the limit, so $\bar Q\le Q^*$.

Step 4, "if": suppose $c\ge\max_{s,a}Q^*(s,a)$. Then the cap does not bind on $Q^*$:

$$\begin{aligned}
T_cQ^*&=\min\{T^*Q^*,\ c\}\\
&=\min\{Q^*,\ c\}\\
&=Q^*.
\end{aligned}$$

So $Q^*$ is a fixed point of $T_c$, and by uniqueness $\bar Q=Q^*$.

Step 5, "only if": if $\bar Q=Q^*$, then by Step 1 every entry of $Q^*$ is at most $c$, i.e. $c\ge\max_{s,a}Q^*(s,a)$.

Step 6, a condition on $\gamma$ only: rewards lie in $[0,1]$, so every discounted return is at most $\sum_t\gamma^t=\tfrac{1}{1-\gamma}$, and $Q^*\le\tfrac{1}{1-\gamma}$. Therefore

$$\boxed{c\ge\tfrac{1}{1-\gamma}}$$

is sufficient for $\bar Q=Q^*$.

**In words.** The cap can only remove value, never add it, so the capped fixed point sits below $Q^*$; it equals $Q^*$ exactly when the cap is never active on $Q^*$ itself.

**Sanity check.** In (d), $\gamma=0.9$ gives $\tfrac{1}{1-\gamma}=10$, which equals $\max Q^*$ there (at $x_2$), so the sufficient condition is tight in that example; $c=5$ is below it, and indeed $\bar Q\ne Q^*$.

**What to write in the exam.**

- $\bar Q=T_c\bar Q$ is a minimum with $c$, so $\bar Q\le c$.
- $T_c\le T^*$ and $T_c$ is monotone, so $T_c^kQ^*\le Q^*$ by induction, and in the limit $\bar Q\le Q^*$.
- If $c\ge\max Q^*$, then $T_cQ^*=Q^*$, so $\bar Q=Q^*$ by uniqueness; conversely $\bar Q=Q^*$ forces $Q^*\le c$.
- Sufficient: $c\ge\tfrac{1}{1-\gamma}$, because $Q^*\le\tfrac{1}{1-\gamma}$.

*Verified: 600 random MDPs with random $c$; in every one $\bar Q\le Q^*$, $\bar Q\le c$, and $\bar Q=Q^*$ exactly when $c\ge\max Q^*$.*

**(d) A concrete example**

**What is asked.** $Q^*$ and $\bar Q$ at every state for the given MDP with $\gamma=0.9$ and $c=5$; whether $\bar Q=\min\{Q^*,c\}$; whether the greedy policy of $\bar Q$ is optimal in $M$.

**Tool and why.** Solve the fixed-point equations backwards from the self-loops (cheat sheet §2, §6): at $x_2$ and $y$ the equation involves only the state itself, and the other states follow in one step each.

**Definitions.** At $x$, $x_2$ and $y$ both actions behave identically, so we write $Q^*(x)$ for the common value of both actions, and similarly for $\bar Q$.

**Solution.**

Step 1, $Q^*$ at the self-loops: $Q^*(x_2)=1+0.9Q^*(x_2)$ gives $\tfrac{1}{0.1}=10$, and $Q^*(y)=0.8+0.9Q^*(y)$ gives $\tfrac{0.8}{0.1}=8$.

Step 2, $Q^*$ at the other states, one step back each:

$$\begin{aligned}
Q^*(x)&=0+0.9\cdot10=9,\\
Q^*(s_0,A)&=0+0.9\cdot9=8.1,\\
Q^*(s_0,B)&=0+0.9\cdot8=7.2.
\end{aligned}$$

So $\pi^*(s_0)=A$.

Step 3, $\bar Q(x_2)$: it solves $\bar Q(x_2)=\min\{1+0.9\bar Q(x_2),5\}$. Try $5$: $1+0.9\cdot5=5.5$, capped to $5$, so $5$ is a solution, and by (b) it is the only one.

Step 4, $\bar Q(y)$: try $5$ again: $0.8+0.9\cdot5=5.3$, capped to $5$. So $\bar Q(y)=5$.

Step 5, $\bar Q(x)$: $0+0.9\cdot5=4.5$, which is below the cap, so $\bar Q(x)=4.5$.

Step 6, $\bar Q$ at $s_0$:

$$\bar Q(s_0,A)=0.9\cdot4.5=\boxed{4.05},\qquad \bar Q(s_0,B)=0.9\cdot5=\boxed{4.5}.$$

| state, action | $Q^*$ | $\bar Q$ | $\min\{Q^*,c\}$ |
|---|---|---|---|
| $s_0$, $A$ | $8.1$ | $4.05$ | $5$ |
| $s_0$, $B$ | $7.2$ | $4.5$ | $5$ |
| $x$ | $9$ | $4.5$ | $5$ |
| $x_2$ | $10$ | $5$ | $5$ |
| $y$ | $8$ | $5$ | $5$ |

Step 7, comparison: $\min\{Q^*,c\}$ equals $5$ everywhere, but $\bar Q(x)=4.5$ and $\bar Q$ at $s_0$ is $4.05$ or $4.5$. So $\bar Q\ne\min\{Q^*,c\}$: the cap propagates backwards through the recursion.

Step 8, greedy policy: $\bar Q(s_0,B)=4.5$ is larger than $\bar Q(s_0,A)=4.05$, so the greedy policy picks $B$. In $M$, $B$ is worth $7.2$ and $A$ is worth $8.1$, so the greedy policy of $\bar Q$ is **not** optimal.

**In words.** Capping erased the difference between $x_2$ (worth $10$) and $y$ (worth $8$): both became $5$. What remains is only that $x_2$ is one step further away, so the capped values prefer $y$.

**Sanity check.** Every entry of the table satisfies $\bar Q\le Q^*$ and $\bar Q\le c$, as (c) requires, and $c=5$ is below $\max Q^*=10$, so $\bar Q\ne Q^*$ is consistent with (c).

**What to write in the exam.**

- $Q^*$: $x_2$ gives $10$, $y$ gives $8$, $x$ gives $9$; at $s_0$, $A$ gives $8.1$ and $B$ gives $7.2$.
- $\bar Q$: $x_2$ and $y$ give $5$ (the cap binds), $x$ gives $4.5$; at $s_0$, $A$ gives $4.05$ and $B$ gives $4.5$.
- Not $\min\{Q^*,c\}$, since that is $5$ everywhere; the greedy choice $B$ is suboptimal in $M$.

*Verified: 3000 iterations of $T_c$ and of $T^*$ in numpy reproduce the table exactly.*

**Common mistakes.**

- Claiming $\bar Q=\min\{Q^*,c\}$: the cap acts inside the recursion, so a capped downstream state lowers every upstream value.
- In the lemma of (b), checking only the cases where both values are on the same side of $c$ and forgetting the mixed case.
- In (c), using $c\ge\max r$ instead of $c\ge\max Q^*$: the cap is compared with $Q$-values, which accumulate many rewards.

**💡 Trick.** $|\min\{x,c\}-\min\{y,c\}|\le|x-y|$ makes the cap invisible to the contraction proof; for the fixed point, test the candidate $Q^*$ directly — it is a fixed point exactly when the cap never binds on it.

**⚠️ Watch out.** The fixed point is not $\min\{Q^*,c\}$ and its greedy policy can be strictly suboptimal: the cap is applied at every step of the recursion, so a capped downstream state lowers every value upstream of it.
