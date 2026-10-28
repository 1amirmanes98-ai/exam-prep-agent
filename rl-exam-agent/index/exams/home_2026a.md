# Exam — Home Exam 2025/26 · Part A

**File:** materials/exams/exam_2026_home.pdf
**Date / semester:** 2025/26 Semester B home exam (take-home), due 19.8.2026 — lecturer Prof. Yishay Mansour, TA Orin Levy
**Total points:** 100
**Aid:** take-home (open material)
**Solutions available:** no (blank answer boxes only) — solution sketches derived by the tutor and numerically verified

## Q1 (25 pts) — Skip/Bet: a finite-horizon optimal-stopping game
**Topics:** finite-horizon MDP, optimal stopping, threshold policy, monotonicity in the horizon | **Pillar:** Planning | **Difficulty:** 4
**Maps to:** lecture_02, lecture_03, lecture_04
**Statement (English translation):**
A sequential decision problem over $T$ time points. At each time $t$ the player sees a number $x_t$ drawn uniformly from $\{1,\dots,k\}$ (with $k\ge 2$). Given $x_t$ the player chooses one of two actions:
- **Skip**: receive profit $0$ and move on to time $t+1$.
- **Bet**: the game ends; to compute the profit, another number $y_t$ is drawn uniformly from $\{1,\dots,k\}$, and the profit is $0$ if $x_t=y_t$, $+1$ if $x_t>y_t$, and $-1$ if $x_t<y_t$.

The player's value is finite-horizon with parameter $T$; let $V^*_{T,k}$ be the player's optimal initial value.

a. Write the MDP of the problem formally: $S,A,s_0,R,P$ (the initial state may be a distribution).

b. Compute the optimal policy for $k=5$ and $T=2$: $\pi^*(t{=}1,\text{ seeing }x_1)$ and $\pi^*(t{=}2,\text{ seeing }x_2)$. If more than one action is optimal, note all of them.

c. For all $k$ and $T$, is it possible that the optimal policy always plays Skip? (Are there values $x_1,\dots,x_T$ that make the optimal policy skip at every step?)

d. Show that for all $k$ the optimal value is monotone increasing in $T$: $T_1<T_2 \Rightarrow V^*_{T_1,k}<V^*_{T_2,k}$.

e. Show the optimal policy is a **threshold** policy: for every $t$ there is a parameter $\theta_t$ such that the player plays **Bet** at time $t$ only if $x_t>\theta_t$.

**Solution sketch:**

**(a) The MDP, formally**

**What is asked.** Translate the Skip/Bet game into the components $S,A,s_0,R,P$ of an MDP. The answer is a definition, not a number.

**Tool and why.** Modelling a story as an MDP: the state is exactly what you must know at the moment of decision to decide well (cheat sheet §12). The horizon is finite, $T$ steps, so no discounting is needed (cheat sheet §3).

**Definitions.** Let $g(x)$ be the expected payoff of Bet when the observed value is $x$. We introduce it because the Bet reward is random (it depends on the extra draw $y$), and only its expectation enters the Bellman equations. Let $\text{end}$ be an absorbing state that the game moves to once it is over.

**Solution.**

Step 1, states: the pairs $(t,x)$ with $t\in\{1,\dots,T\}$ and $x\in\{1,\dots,k\}$, plus the state $\text{end}$:

$$S=\{1,\dots,T\}\times\{1,\dots,k\}\ \cup\ \{\text{end}\}.$$

Both coordinates are needed: the reward of Bet depends on $x_t$, and how many chances remain depends on $t$.

Step 2, actions: $A=\{\text{Skip},\text{Bet}\}$ in every non-terminal state, by the rules of the game.

Step 3, initial state: $s_0$ is a distribution, state $(1,x)$ with probability $1/k$ for each $x\in\{1,\dots,k\}$, because the first number is drawn uniformly.

Step 4, rewards: Skip pays nothing; Bet pays the sign of $x-y$ for a fresh uniform $y$:

$$R\big((t,x),\text{Skip}\big)=0,$$

$$R\big((t,x),\text{Bet}\big)=\mathrm{sign}(x-y),\ \ y\sim\text{Unif}\{1,\dots,k\}.$$

Step 5, expected Bet reward: exactly $x-1$ values of $y$ are smaller than $x$ (payoff $+1$) and exactly $k-x$ are larger (payoff $-1$); the tie $y=x$ pays $0$. Each $y$ has probability $1/k$, so

$$\begin{aligned}
g(x)&=\frac{(x-1)-(k-x)}{k}\\
&=\frac{2x-1-k}{k}.
\end{aligned}$$

Step 6, transitions, by the rules of the game:

| state and action | next state | probability |
|---|---|---|
| $(t,x)$, Skip, with $t<T$ | $(t+1,x')$ | $1/k$ for each $x'$ |
| $(T,x)$, Skip | $\text{end}$ | $1$ |
| $(t,x)$, Bet | $\text{end}$ | $1$ |

The state $\text{end}$ is absorbing with reward $0$.

**In words.** The game has one decision per time step, the only reward comes when you Bet, and Skip just buys a fresh number for the next step (or ends the game with $0$ at the last step).

**Sanity check.** For $k=2$: with $x=2$ you win when $y=1$ and tie when $y=2$, so the expected payoff is $\tfrac12$. The formula agrees:

$$g(2)=\frac{4-1-2}{2}=\frac12.$$

**What to write in the exam.**

- States $(t,x)$ plus an absorbing $\text{end}$; actions Skip and Bet.
- Initial distribution: $(1,x)$ with probability $1/k$ each.
- Skip: reward $0$, move to $(t+1,x')$ with uniform $x'$, or to $\text{end}$ when $t=T$.
- Bet: reward $\mathrm{sign}(x-y)$ with uniform $y$, expected value $g(x)=\tfrac{2x-1-k}{k}$, then $\text{end}$.

*Verified: enumerating all $y$ for every $k$ from $2$ to $7$ gives an expected Bet payoff equal to $\tfrac{2x-1-k}{k}$ exactly (fractions).*

**(b) The optimal policy for k = 5, T = 2**

**What is asked.** For $k=5$ and $T=2$, the optimal action at each time for each observed value, listing every optimal action where there is a tie. The answer is a policy (two lists of values).

**Tool and why.** Backward induction in a finite horizon (cheat sheet §3): the last step is a one-shot comparison, and its value is what Skip is worth one step earlier. Each step is "Bet value against a constant", the optimal-stopping comparison of cheat sheet §4.

**Definitions.** Let $V_n$ be the optimal expected payoff when $n$ steps remain, *before* the number of the first of them is drawn; $V_0=0$ and $V^*_{T,k}=V_T$. Let $C_t$ be the value of Skip at time $t$, the optimal value of the remaining $T-t$ steps, so $C_t=V_{T-t}$. We introduce $C_t$ so that every decision is a comparison of two numbers: $g(x_t)$ against $C_t$.

**Solution.**

Step 1, Bet values for $k=5$, from $g(x)=\tfrac{2x-6}{5}$:

| $x$ | $g(x)$ |
|---|---|
| $1$ | $-0.8$ |
| $2$ | $-0.4$ |
| $3$ | $0$ |
| $4$ | $0.4$ |
| $5$ | $0.8$ |

Step 2, last step $t=2$: Skip ends the game with $0$, so $C_2=0$. Bet is optimal when $g(x_2)\ge0$, that is $x_2\in\{3,4,5\}$. At $x_2=3$ we have $g(3)=0$, so both actions are optimal there.

Step 3, the value of reaching step $2$ before its draw: average the better action over the five equally likely values.

$$\begin{aligned}
V_1&=\tfrac15\sum_{x=1}^{5}\max\big(g(x),0\big)\\
&=\tfrac15\,(0+0+0+0.4+0.8)\\
&=\tfrac{6}{25}\\
&=0.24.
\end{aligned}$$

Step 4, first step $t=1$: Skip is worth $C_1=V_1$, that is $0.24$. Bet is optimal when $g(x_1)\ge0.24$. From the table, $g(3)=0$ is smaller and $g(4)=0.4$ is larger, so Bet exactly when $x_1\in\{4,5\}$. No $g$ value equals $0.24$, so there is no tie at $t=1$.

Step 5, the optimal value: at $t=1$ take the better of $g(x_1)$ and $0.24$.

$$\begin{aligned}
V^*_{2,5}&=\tfrac15\,(0.24+0.24+0.24+0.4+0.8)\\
&=\tfrac15\cdot1.92\\
&=\tfrac{48}{125}\\
&=0.384.
\end{aligned}$$

Answer:

$$\boxed{\pi^*(1,x_1)=\begin{cases}\text{Bet}, & x_1\in\{4,5\},\\ \text{Skip}, & x_1\in\{1,2,3\},\end{cases}}$$

$$\boxed{\pi^*(2,x_2)=\begin{cases}\text{Bet}, & x_2\in\{4,5\},\\ \text{Bet or Skip}, & x_2=3,\\ \text{Skip}, & x_2\in\{1,2\}.\end{cases}}$$

**In words.** At the last step you Bet whenever you do not lose in expectation, since there is nothing to wait for. At the first step a second chance is worth $0.24$, so a $3$ (worth $0$) is not good enough and you Bet only on $4$ or $5$.

**Sanity check.** Reusing the last-step rule at both steps means betting on $x_1\ge3$ at the first step, which gives

$$\begin{aligned}
\tfrac15(0+0.4+0.8)+\tfrac25\cdot0.24&=\tfrac{42}{125}\\
&=0.336,
\end{aligned}$$

less than $0.384$. Always betting at $t=1$ gives $\tfrac15\sum_x g(x)=0$. The optimal policy beats both.

**What to write in the exam.**

- Expected Bet payoffs for $x=1,\dots,5$: $-0.8,-0.4,0,0.4,0.8$.
- Step $2$: Bet iff $g(x_2)\ge0$, so $x_2\in\{3,4,5\}$, with a tie at $x_2=3$.
- Value of step $2$: $V_1=\tfrac15(0.4+0.8)$, which is $0.24$.
- Step $1$: Bet iff $g(x_1)\ge0.24$, so $x_1\in\{4,5\}$; the value is $V^*_{2,5}=0.384$.

*Verified: exact backward induction in fractions gives $V_1=\tfrac{6}{25}$ and $V_2=\tfrac{48}{125}$, and a Monte-Carlo run of $10^6$ games with this policy averages $0.3842$.*

**(c) Can the optimal policy skip at every step?**

**What is asked.** A yes/no verdict: is there, for every $k$ and $T$, a sequence $x_1,\dots,x_T$ on which the optimal policy skips at every step? The answer is a verdict with a concrete example.

**Tool and why.** The comparison "Bet value against Skip value" from part (b) (cheat sheet §4): it suffices to find a value whose Bet payoff is below every possible Skip value.

**Definitions.** No new notation; $g$, $V_n$ and $C_t=V_{T-t}$ are from parts (a) and (b).

**Solution.**

Verdict: **yes**. The constant sequence in which $x_t=1$ at every step $t$ works for every $k\ge2$ and every $T$.

Step 1, the Bet value of $x=1$ is negative: $g(1)=\tfrac{1-k}{k}$, and $1-k<0$ because $k\ge2$. This makes sense: with $x=1$ no $y$ is smaller, so you can only tie or lose.

Step 2, every Skip value is non-negative: $C_t\ge0$ for every $t$, because the policy "always Skip" earns exactly $0$, and the optimal value is at least the value of any particular policy.

Step 3, comparison: at every step with $x_t=1$,

$$g(1)\ <\ 0\ \le\ C_t,$$

so Skip is *strictly* better than Bet, and Skip is the unique optimal action. Hence on this sequence the optimal policy skips at all $T$ steps and ends with payoff $0$. The sequence has probability $k^{-T}$, which is positive.

More generally, the optimal policy skips throughout on every sequence with $g(x_t)<C_t$ at each $t$; part (e) describes these as $x_t\le\theta_t$.

**In words.** The lowest number can never win a Bet, so no rational player bets on it, and if only lowest numbers show up the player never bets.

**Sanity check.** For $k=5$ and $T=2$, part (b) says Skip at $t=1$ for $x_1\le3$ and at $t=2$ for $x_2\le2$; the sequence $(1,1)$ falls in both, so the policy skips twice, with probability $\tfrac{1}{25}$.

**What to write in the exam.**

- Yes. Take $x_t=1$ for every $t$.
- Bet is worth $g(1)=\tfrac{1-k}{k}$, which is negative.
- Skip is worth $C_t$, which is at least $0$ since always skipping earns $0$.
- So Skip is strictly optimal at every step.

*Verified: exact fractions show $g(1)<0$ and $V_n\ge0$ for every $k$ from $2$ to $29$ and $n\le40$.*

**(d) The optimal value is strictly increasing in T**

**What is asked.** A proof that for every $k$, $T_1<T_2$ implies $V^*_{T_1,k}<V^*_{T_2,k}$ (strict inequality).

**Tool and why.** The finite-horizon Bellman recursion in the number of remaining steps (cheat sheet §3), plus an induction on $n$ for an upper bound. Monotonicity is easy; the induction is what makes it *strict*.

**Definitions.** $V_n$ as in part (b), so $V^*_{T,k}=V_T$. Write $z^+=\max(z,0)$ for the positive part; we use it to write the gain of one extra step as an expectation of a non-negative quantity.

**Solution.**

Step 1, the recursion: with $n$ steps remaining, after seeing $x$ you either Bet (worth $g(x)$) or Skip (worth $V_{n-1}$), so

$$V_n=\mathbb{E}_x\big[\max\big(g(x),\,V_{n-1}\big)\big],\qquad V_0=0.$$

Step 2, the gap: since $\max(a,b)=b+(a-b)^+$ for all numbers $a,b$,

$$V_n-V_{n-1}=\mathbb{E}_x\big[(g(x)-V_{n-1})^+\big]\ \ge\ 0.$$

Step 3, an upper bound. **Claim.** For every $n\ge0$,

$$0\ \le\ V_n\ <\ \frac{k-1}{k}.$$

The proof is by induction on $n$, from $0$ upward.

**Base.** $V_0=0$, and $\tfrac{k-1}{k}>0$ because $k\ge2$.

**Hypothesis.** For some $n\ge1$, $V_{n-1}$ is non-negative and smaller than $\tfrac{k-1}{k}$.

**Step.** Non-negativity: $V_n\ge V_{n-1}$ by Step 2, and $V_{n-1}\ge0$ by the hypothesis. Upper bound: each term $\max(g(x),V_{n-1})$ is at most $\tfrac{k-1}{k}$, because $g(x)\le g(k)$, with $g(k)=\tfrac{k-1}{k}$, and, by the hypothesis, $V_{n-1}<\tfrac{k-1}{k}$. For $x=1$ the term is strictly smaller: $g(1)$ is negative and $V_{n-1}\ge0$, so the term equals $V_{n-1}$, which is strictly below $\tfrac{k-1}{k}$ by the hypothesis. This is where the hypothesis is used. An average of $k$ terms that are all at most $\tfrac{k-1}{k}$, one of them strictly less, is strictly less than $\tfrac{k-1}{k}$.

Step 4, the gap is strictly positive: in the expectation of Step 2, the term $x=k$ has probability $\tfrac1k$ and value $(g(k)-V_{n-1})^+$, which is positive by the claim. All other terms are non-negative, so

$$V_n-V_{n-1}\ \ge\ \tfrac1k\big(g(k)-V_{n-1}\big)\ >\ 0.$$

Step 5, conclusion: for $T_1<T_2$, write the difference as a sum of one-step gaps; each is positive by Step 4.

$$V^*_{T_2,k}-V^*_{T_1,k}=\sum_{n=T_1+1}^{T_2}\big(V_n-V_{n-1}\big)>0.$$

For $k=5$:

| $n$ | $V_n$ exact | $V_n$ decimal |
|---|---|---|
| $1$ | $\tfrac{6}{25}$ | $0.24$ |
| $2$ | $\tfrac{48}{125}$ | $0.384$ |
| $3$ | $\tfrac{294}{625}$ | $0.4704$ |
| $4$ | $\tfrac{1676}{3125}$ | $0.53632$ |
| $5$ | $\tfrac{9204}{15625}$ | $0.589056$ |
| $6$ | $\tfrac{49316}{78125}$ | $0.6312448$ |

**In words.** An extra step is an extra option, and you can always ignore it, so the value cannot fall. It rises strictly because the extra step lets you wait for the top value $k$, which beats any continuation value that is still below the best possible payoff.

**Sanity check.** The values in the table increase strictly and stay below $\tfrac{k-1}{k}=0.8$, as the claim says; with $n=8$ the value is about $0.692$, still below $0.8$. As $n$ grows the player can wait longer and longer for a $5$, so the limit $0.8$ makes sense.

**What to write in the exam.**

- Recursion: $V_n=\mathbb{E}_x[\max(g(x),V_{n-1})]$, so the gap is $\mathbb{E}_x[(g(x)-V_{n-1})^+]$, at least $0$.
- Induction: $V_n<\tfrac{k-1}{k}$, since every term is at most that and the term $x=1$ equals $V_{n-1}$, which is strictly less.
- Hence $x=k$ gives a positive term, so every gap is positive.
- Sum the gaps from $T_1+1$ to $T_2$.

*Verified: exact fractions for every $k$ from $2$ to $29$ and $n\le40$ confirm strict increase, the bound below $\tfrac{k-1}{k}$, and the gap identity of Step 2.*

**(e) The optimal policy is a threshold policy**

**What is asked.** A proof that for each $t$ there is a number $\theta_t$ such that the optimal player Bets at time $t$ exactly when $x_t>\theta_t$.

**Tool and why.** Threshold structure in optimal stopping (cheat sheet §4): the stopping value increases in the observation while the continuation value does not depend on it, so the set where stopping wins is an upper interval.

**Definitions.** $C_t=V_{T-t}$, the value of Skip at time $t$, from part (b). Define

$$\theta_t=\max\big\{x\in\{1,\dots,k\}:\ g(x)<C_t\big\}.$$

This is the largest value on which Bet loses to Skip. The set is not empty because $g(1)$ is negative while $C_t\ge0$, as shown in part (c), so $\theta_t$ exists.

**Solution.**

Step 1, Skip does not depend on $x_t$: after Skip the next number is drawn afresh, independent of $x_t$, so the value of Skip at $(t,x_t)$ is the constant $C_t$.

Step 2, Bet increases strictly in $x_t$: the difference $g(x+1)-g(x)$ equals $\tfrac{2}{k}$, which is positive.

Step 3, the comparison: Bet is optimal iff $g(x_t)\ge C_t$. Multiply by $k$, add $1+k$, and divide by $2$:

$$\begin{aligned}
\frac{2x_t-1-k}{k}&\ge C_t\\
2x_t-1-k&\ge kC_t\\
x_t&\ge\frac{kC_t+1+k}{2}.
\end{aligned}$$

Step 4, the threshold form. **Claim.** $g(x)\ge C_t$ holds exactly when $x>\theta_t$.

If $x>\theta_t$, then $x$ is not in the set that defines $\theta_t$ (it is larger than its maximum), so $g(x)\ge C_t$. If $x\le\theta_t$, then by Step 2 we get $g(x)\le g(\theta_t)$, and $g(\theta_t)<C_t$ by the definition. So the optimal player Bets iff $x_t>\theta_t$ (at a tie $g(x_t)=C_t$ both actions are optimal, and this rule Bets).

$$\boxed{\text{Bet at time }t\ \iff\ x_t>\theta_t}$$

Step 5, an example with $k=5$ and $T=4$, using the table of part (d):

| $t$ | $C_t$ | $\theta_t$ |
|---|---|---|
| $1$ | $0.4704$ | $4$ |
| $2$ | $0.384$ | $3$ |
| $3$ | $0.24$ | $3$ |
| $4$ | $0$ | $2$ |

For instance at $t=1$, $g(4)=0.4$ is below $0.4704$, so $\theta_1=4$ and only a $5$ is bet on.

**In words.** Bet against a constant, with Bet increasing, is always a cutoff. Because $C_t=V_{T-t}$ shrinks as $t$ grows (part (d)), the thresholds can only go down as the deadline approaches: you become less picky.

**Sanity check.** With $T=2$ the definition gives $\theta_1=3$ and $\theta_2=2$, exactly the policy of part (b).

**What to write in the exam.**

- Skip is worth $C_t=V_{T-t}$, which does not depend on $x_t$.
- Bet is worth $g(x_t)=\tfrac{2x_t-1-k}{k}$, strictly increasing.
- Bet iff $g(x_t)\ge C_t$; with $\theta_t$ the largest $x$ where $g(x)<C_t$, this is $x_t>\theta_t$.

*Verified: exact backward induction for $k=5$, $T=4$ gives the thresholds $4,3,3,2$, and the cutoff formula of Step 3 agrees with them.*

**Common mistakes.**

- Using only $x$ as the state. Without $t$ the value of Skip is not determined, and the optimal action really does depend on $t$.
- Reusing the last-step threshold at every step: for $k=5$, $T=2$ it earns $0.336$ instead of $0.384$.
- In (d), proving only $V_n\ge V_{n-1}$. Strictness needs the bound $V_{n-1}<\tfrac{k-1}{k}$, so that $x=k$ makes the gap positive.

**💡 Trick.** The Bet payoff has expectation $g(x)=\tfrac{2x-1-k}{k}$, strictly increasing in $x$, while Skip's value $C_t$ is a constant independent of $x$ — so "Bet vs. Skip" is exactly "$g(x)$ vs. a constant", which is a threshold, and (b), (c), (e) all fall out of that.

**⚠️ Watch out.** The threshold is *not* the same at every step: at the last step you compare Bet against $0$, but earlier you compare against the larger continuation value $C_t=V_{T-t}$, so you get pickier (higher threshold) further from the horizon. Don't reuse the last-step threshold for all $t$.

## Q2 (25 pts) — Two-state MDP: optimal value, policy value, PI and VI
**Topics:** MDP, optimal policy, policy evaluation, policy iteration, value iteration | **Pillar:** Planning | **Difficulty:** 3
**Maps to:** lecture_04, recitation_04
**Statement (English translation):**
An MDP with two states $\{s_1,s_2\}$, initial state $s_1$, discount $\gamma=0.5$ (discounted). In $s_1$ there are two actions:
- $a_1$: reward $0$, transitions to $s_2$ w.p. $0.5$ and stays in $s_1$ w.p. $0.5$.
- $a_2$: reward $0$, transitions to $s_2$ w.p. $1$.

In $s_2$ there is one action $a_3$: reward $1$, transitions to $s_1$ w.p. $0.5$ and stays in $s_2$ w.p. $0.5$. Define the stochastic policy $\pi_x$ by $\pi_x(a_1\mid s_1)=x$, $\pi_x(a_2\mid s_1)=1-x$ (and $\pi_x(a_3\mid s_2)=1$).

a. What is the optimal policy $\pi^*$ and its value $V^*$? (First write the value as a function of $\gamma$, then compute the number.)

b. Compute the value function of $\pi_x$ as a function of $x$. (First as a function of $\gamma$ and $x$, then as a function of $x$ only.)

c. Run **policy iteration** starting from $\pi_x$ with $x=1$. What is the policy $\pi'$ after one PI iteration? After how many PI iterations does it converge?

d. Run **value iteration** starting from $V_0(s_1)=1,\ V_0(s_2)=0$. What is $V_i$ after each of the first three iterations?

**Solution sketch:**

**(a) The optimal policy and its value**

**What is asked.** The optimal action in $s_1$ and the optimal values of both states, first as a formula in $\gamma$ and then as numbers for $\gamma=\tfrac12$.

**Tool and why.** Bellman optimality equations with guess-and-verify (cheat sheet §2): only $s_1$ has a choice, so guess the action, solve the resulting $2\times2$ linear system, and check that no other action does better.

**Definitions.** $Q(s,a)$ is the value of taking $a$ in $s$ and acting optimally afterwards; we use it to verify the guess.

**Solution.**

Step 1, the guess: both actions in $s_1$ pay $0$, so they differ only in how fast they reach the rewarding state $s_2$. Action $a_2$ gets there surely, $a_1$ only with probability $\tfrac12$, so we guess $\pi^*(s_1)=a_2$.

Step 2, Bellman equations for the guess: from $s_1$ we move to $s_2$ with reward $0$; from $s_2$ we collect $1$ and move to each state with probability $\tfrac12$.

$$V^*(s_1)=\gamma V^*(s_2),$$

$$V^*(s_2)=1+\gamma\Big(\tfrac12V^*(s_1)+\tfrac12V^*(s_2)\Big).$$

Step 3, substitute the first equation into the second: the term $\tfrac12\gamma V^*(s_1)$ becomes $\tfrac12\gamma^2V^*(s_2)$, so

$$V^*(s_2)\Big(1-\tfrac12\gamma-\tfrac12\gamma^2\Big)=1.$$

Step 4, factor: $2-\gamma-\gamma^2=(1-\gamma)(2+\gamma)$, so

$$\begin{aligned}
V^*(s_2)&=\frac{1}{1-\tfrac12\gamma-\tfrac12\gamma^2}\\
&=\frac{2}{(1-\gamma)(2+\gamma)},
\end{aligned}$$

$$\begin{aligned}
V^*(s_1)&=\gamma V^*(s_2)\\
&=\frac{2\gamma}{(1-\gamma)(2+\gamma)}.
\end{aligned}$$

Step 5, the numbers for $\gamma=\tfrac12$: the denominator is

$$\begin{aligned}
(1-\tfrac12)(2+\tfrac12)&=\tfrac12\cdot\tfrac52\\
&=\tfrac54,
\end{aligned}$$

so $V^*(s_2)=2\cdot\tfrac45$ and $V^*(s_1)=\tfrac12V^*(s_2)$.

$$\boxed{\begin{aligned}\pi^*(s_1)&=a_2\\ V^*(s_1)&=0.8\\ V^*(s_2)&=1.6\end{aligned}}$$

Step 6, verify the guess with $Q$ values in $s_1$:

$$\begin{aligned}
Q(s_1,a_1)&=\gamma\Big(\tfrac12\cdot0.8+\tfrac12\cdot1.6\Big)\\
&=\tfrac12\cdot1.2\\
&=0.6,
\end{aligned}$$

$$\begin{aligned}
Q(s_1,a_2)&=\gamma\cdot1.6\\
&=0.8.
\end{aligned}$$

Since $0.8>0.6$, action $a_2$ is the greedy action with respect to these values, so they satisfy the Bellman optimality equation, and the guess is optimal (uniquely, since the inequality is strict).

**In words.** All reward is earned in $s_2$, so the only goal in $s_1$ is to leave it as fast as possible, and $a_2$ does that in one step for sure.

**Sanity check.** Substituting back: $1+\tfrac12(0.4+0.8)$ is $1.6$, as it should be. As $\gamma\to0$ the formulas give $V^*(s_2)\to1$ (only the immediate reward counts) and $V^*(s_1)\to0$.

**What to write in the exam.**

- In $s_1$ both actions pay $0$ and $a_2$ reaches $s_2$ surely, so guess $\pi^*(s_1)=a_2$.
- Solve the two equations: $V^*(s_2)=\tfrac{2}{(1-\gamma)(2+\gamma)}$ and $V^*(s_1)=\gamma V^*(s_2)$.
- With $\gamma=\tfrac12$: $V^*(s_1)=0.8$ and $V^*(s_2)=1.6$.
- Check: $Q(s_1,a_2)=0.8$ beats $Q(s_1,a_1)=0.6$.

*Verified: sympy solves the system symbolically and gives $\tfrac{2}{(1-\gamma)(2+\gamma)}$, and exact fractions give the $Q$ values $0.6$ and $0.8$.*

**(b) The value of the mixed policy**

**What is asked.** The value function of $\pi_x$ in both states, first as a formula in $\gamma$ and $x$, then for $\gamma=\tfrac12$ as a formula in $x$ only.

**Tool and why.** Policy evaluation (cheat sheet §2): for a fixed policy the Bellman equations are linear, with the action probabilities as weights, so two equations in two unknowns give the answer.

**Definitions.** Write $u_1=V^{\pi_x}(s_1)$ and $u_2=V^{\pi_x}(s_2)$, to keep the algebra short.

**Solution.**

Step 1, equation for $s_1$: with probability $x$ play $a_1$ (stay or move, each with probability $\tfrac12$), with probability $1-x$ play $a_2$ (move to $s_2$):

$$\begin{aligned}
u_1&=x\gamma\Big(\tfrac12u_1+\tfrac12u_2\Big)+(1-x)\gamma u_2\\
&=\tfrac{\gamma x}{2}\,u_1+\gamma\Big(1-\tfrac{x}{2}\Big)u_2.
\end{aligned}$$

Step 2, equation for $s_2$, the same as in part (a):

$$u_2=1+\tfrac{\gamma}{2}u_1+\tfrac{\gamma}{2}u_2.$$

Step 3, express $u_2$ through $u_1$: multiply the equation of Step 1 by $2$ and collect $u_1$, which gives $u_1(2-\gamma x)=\gamma(2-x)\,u_2$.

Step 4, Step 2 multiplied by $2$ reads $(2-\gamma)u_2=2+\gamma u_1$. Multiply the identity of Step 3 by $(2-\gamma)$ and replace $(2-\gamma)u_2$ by $2+\gamma u_1$; then move the $u_1$ terms to the left:

$$\begin{aligned}
(2-\gamma)(2-\gamma x)\,u_1&=\gamma(2-x)(2+\gamma u_1)\\
\big[(2-\gamma)(2-\gamma x)-\gamma^2(2-x)\big]\,u_1&=2\gamma(2-x).
\end{aligned}$$

Step 5, simplify the bracket: expanding gives $4-2\gamma-2\gamma x-2\gamma^2+2\gamma^2x$, which factors as $2(1-\gamma)(2+\gamma-\gamma x)$. Hence, using Step 3 for $u_2$,

$$\boxed{V^{\pi_x}(s_1)=\frac{\gamma(2-x)}{(1-\gamma)(2+\gamma-\gamma x)}}$$

$$\boxed{V^{\pi_x}(s_2)=\frac{2-\gamma x}{(1-\gamma)(2+\gamma-\gamma x)}}$$

Step 6, set $\gamma=\tfrac12$: the denominator is $\tfrac12\cdot\tfrac{5-x}{2}=\tfrac{5-x}{4}$, and the numerators are $\tfrac{2-x}{2}$ and $\tfrac{4-x}{2}$, so

$$\boxed{V^{\pi_x}(s_1)=\frac{4-2x}{5-x}}$$

$$\boxed{V^{\pi_x}(s_2)=\frac{8-2x}{5-x}}$$

**In words.** The more often the policy plays the slow action $a_1$ (larger $x$), the longer it lingers in the reward-free state $s_1$, so both values fall as $x$ grows.

**Sanity check.** With $x=0$ we get $(0.8,1.6)$, which is $V^*$ from part (a), as it must be since $\pi_0$ is the optimal policy. With $x=1$ we get $(0.5,1.5)$, and with $x=\tfrac12$ we get $(\tfrac23,\tfrac{14}{9})$, about $(0.667,1.556)$.

**What to write in the exam.**

- Equations: $u_2=1+\tfrac{\gamma}{2}(u_1+u_2)$, and for $s_1$

$$u_1=\tfrac{\gamma x}{2}u_1+\gamma\big(1-\tfrac{x}{2}\big)u_2.$$

- Solution, with the common denominator $(1-\gamma)(2+\gamma-\gamma x)$: the numerators are $\gamma(2-x)$ for $u_1$ and $2-\gamma x$ for $u_2$.
- For $\gamma=\tfrac12$: $u_1=\tfrac{4-2x}{5-x}$ and $u_2=\tfrac{8-2x}{5-x}$.

*Verified: sympy solves the linear system symbolically and its result reduces to these formulas; exact values at $x=0$, $\tfrac12$ and $1$ match.*

**(c) Policy iteration from x = 1**

**What is asked.** The policy after one iteration of policy iteration started at $\pi_1$, and the number of iterations until it converges.

**Tool and why.** Policy iteration (cheat sheet §3): evaluate the current policy exactly, then act greedily on its $Q$ values; it stops when the greedy policy does not change. Part (b) already gives exact evaluations.

**Definitions.** $\pi_1$ is $\pi_x$ with $x=1$ (always $a_1$ in $s_1$). $Q^{\pi}(s,a)$ is the value of taking $a$ once and then following $\pi$.

**Solution.**

Step 1, evaluation: by part (b) with $x=1$, $V^{\pi_1}(s_1)=0.5$ and $V^{\pi_1}(s_2)=1.5$.

Step 2, improvement in $s_1$ (in $s_2$ there is only $a_3$):

$$\begin{aligned}
Q^{\pi_1}(s_1,a_1)&=\gamma\Big(\tfrac12\cdot0.5+\tfrac12\cdot1.5\Big)\\
&=\tfrac12\cdot1\\
&=0.5,
\end{aligned}$$

$$\begin{aligned}
Q^{\pi_1}(s_1,a_2)&=\gamma\cdot1.5\\
&=0.75.
\end{aligned}$$

Since $0.75>0.5$, the greedy action is $a_2$, so after one iteration $\pi'=\pi_0$: play $a_2$ in $s_1$.

Step 3, second iteration: evaluate $\pi_0$, which by part (b) gives $(0.8,1.6)$. Its $Q$ values in $s_1$ are $0.6$ for $a_1$ and $0.8$ for $a_2$ (part (a), Step 6), so the greedy action is again $a_2$. The policy did not change, so policy iteration stops.

$$\boxed{\pi'(s_1)=a_2\ \text{(optimal)},\qquad \text{2 iterations}}$$

The first iteration changes the policy; the second one is needed to *detect* that nothing changes any more.

**In words.** One exact evaluation already shows that from $s_1$ the state $s_2$ is worth much more than $s_1$, so the greedy step jumps straight to the action that reaches $s_2$ fastest.

**Sanity check.** The policy improvement theorem says $V^{\pi'}\ge V^{\pi_1}$ in every state: indeed $0.8\ge0.5$ and $1.6\ge1.5$.

**What to write in the exam.**

- Evaluate $\pi_1$: $V^{\pi_1}=(0.5,1.5)$.
- Greedy in $s_1$: $Q(s_1,a_1)=0.5$ and $Q(s_1,a_2)=0.75$, so $\pi'(s_1)=a_2$.
- Evaluate $\pi'$: $(0.8,1.6)$; greedy again picks $a_2$, so it has converged.
- Answer: $\pi'$ is optimal, and policy iteration stops after $2$ iterations.

*Verified: exact fractions for both evaluations and both greedy steps.*

**(d) Three iterations of value iteration**

**What is asked.** The vectors $V_1,V_2,V_3$ produced by value iteration from $V_0=(1,0)$. The answer is six numbers.

**Tool and why.** Value iteration (cheat sheet §3): apply the Bellman optimality operator, using the previous vector $V_i$ on the right-hand side, three times.

**Definitions.** To keep the arithmetic visible, let $A_i$ be the value of $a_1$ and $B_i$ the value of $a_2$ computed from $V_i$:

$$A_i=\gamma\Big(\tfrac12V_i(s_1)+\tfrac12V_i(s_2)\Big),$$

$$B_i=\gamma V_i(s_2).$$

**Solution.**

Step 1, the update: $s_1$ takes the better action, and $s_2$ moves to each state with probability $\tfrac12$, exactly like $a_1$, so its update reuses $A_i$:

$$V_{i+1}(s_1)=\max\{A_i,B_i\},\qquad V_{i+1}(s_2)=1+A_i.$$

Step 2, from $V_0=(1,0)$: $A_0=\tfrac12\cdot\tfrac12(1+0)$, which is $\tfrac14$, and $B_0=\tfrac12\cdot0$, which is $0$, so $V_1(s_1)=\tfrac14$ (here $a_1$ wins) and $V_1(s_2)=\tfrac54$.

Step 3, from $V_1$: $A_1=\tfrac14\big(\tfrac14+\tfrac54\big)$, which is $\tfrac38$, and $B_1=\tfrac12\cdot\tfrac54$, which is $\tfrac58$, so $V_2(s_1)=\tfrac58$ and $V_2(s_2)=\tfrac{11}{8}$.

Step 4, from $V_2$: $A_2=\tfrac14\big(\tfrac58+\tfrac{11}{8}\big)$, which is $\tfrac12$, and $B_2=\tfrac12\cdot\tfrac{11}{8}$, which is $\tfrac{11}{16}$, so $V_3(s_1)=\tfrac{11}{16}$ and $V_3(s_2)=\tfrac32$.

| $i$ | $A_i$ | $B_i$ | $V_{i+1}$ |
|---|---|---|---|
| $0$ | $0.25$ | $0$ | $(0.25,\,1.25)$ |
| $1$ | $0.375$ | $0.625$ | $(0.625,\,1.375)$ |
| $2$ | $0.5$ | $0.6875$ | $(0.6875,\,1.5)$ |

$$\boxed{\begin{aligned}V_1&=(0.25,\,1.25)\\ V_2&=(0.625,\,1.375)\\ V_3&=(0.6875,\,1.5)\end{aligned}}$$

**In words.** The initial guess wrongly says $s_1$ is the good state, so the first iterate prefers $a_1$ and $V(s_1)$ drops; once the reward of $s_2$ has propagated, $a_2$ wins and the values climb toward $V^*=(0.8,1.6)$.

**Sanity check.** The sup-norm distance to $V^*$ is $1.6$, $0.55$, $0.225$, $0.1125$ for $i=0,1,2,3$; each step shrinks it by at least the factor $\gamma=\tfrac12$, as the contraction property guarantees.

**What to write in the exam.**

- Update: $V_{i+1}(s_1)=\max\{A_i,B_i\}$ and $V_{i+1}(s_2)=1+A_i$, with $A_i$ and $B_i$ as above.
- Iterates: $V_1=(0.25,1.25)$, $V_2=(0.625,1.375)$, $V_3=(0.6875,1.5)$.

*Verified: exact fractions for seven iterations, including the distances to $V^*$.*

**Common mistakes.**

- In (a), an algebra slip in the $2\times2$ system. Always substitute back: $\tfrac{1}{1-\frac34\gamma-\frac14\gamma^2}$, for example, gives $\tfrac{16}{9}$ at $\gamma=\tfrac12$, not $1.6$.
- In (c), forgetting the self-loop of $a_1$ when computing $Q(s_1,a_1)$, or stopping after the first improvement without the confirming iteration.
- In (d), updating $V(s_1)$ with the already-updated $V_{i+1}(s_2)$ (an in-place sweep); it gives different numbers, for instance $\tfrac58$ and $\tfrac54$ after the first sweep.

**💡 Trick.** In $s_1$ both actions earn $0$, so the only thing that matters is *how fast you reach the rewarding state* $s_2$ — $a_2$ (sure) beats $a_1$ (coin flip), which pins $\pi^*(s_1)=a_2$ without solving anything, and one PI step from $x=1$ lands there.

**⚠️ Watch out.** Policy iteration evaluates each policy **exactly** (solve the linear system) before improving — don't confuse its one-step jump to $V^{\pi'}$ with value iteration's slow geometric climb; and "converges after 1 improvement" still costs a second iteration to *detect* stability.

## Q3 (25 pts) — Fitting the value function with a softplus, via MC-SGD
**Topics:** function approximation, gradient descent, Monte-Carlo return, unbiased estimator, SGD | **Pillar:** Approximation | **Difficulty:** 3
**Maps to:** lecture_08, lecture_06, recitation_08
**Statement (English translation):**
An MDP where every state $s$ has a feature vector $\phi(s)\in\mathbb{R}^d$. A value function is parameterized by $\theta\in\mathbb{R}^d$ via

$$\hat V(s;\theta)=\log\big(1+\exp(\phi(s)\cdot\theta)\big).$$

For a policy $\pi$ we minimize the weighted squared error

$$J^\pi(\theta)=\frac12\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta)\big)^2,$$

where $\mu(s)$ is the stationary probability that $\pi$ visits $s$ (assume every state is reachable and revisited under $\pi$). We minimize $J^\pi(\theta)$ by gradient updates.

a. Write the gradient-descent update $\theta^{t+1}$ for minimizing $J^\pi(\theta)$ (as a function of $\phi(s)$, $\mu(s)$, $V^\pi(s)$ and a learning rate $\alpha$).

b. Propose an unbiased estimator of $V^\pi(s)$ for a state $s$ that appears in an episode of $\pi$, using Monte-Carlo.

c. Write the Monte-Carlo SGD update for minimizing $J^\pi(\theta)$.

**Solution sketch:**

**(a) The gradient-descent update**

**What is asked.** The full-gradient descent step for $J^\pi(\theta)$, written with $\phi(s)$, $\mu(s)$, $V^\pi(s)$ and $\alpha$. The answer is a formula.

**Tool and why.** Gradient descent on a weighted squared loss with a non-linear model (cheat sheet §8): differentiate the loss by the chain rule, through the softplus.

**Definitions.** Let $z_s=\phi(s)\cdot\theta$ be the linear score of state $s$, and $\sigma(z)=\tfrac{1}{1+e^{-z}}$ the sigmoid. We name $z_s$ because the model is a function of $\theta$ only through it, and $\sigma$ because it will turn out to be the derivative of the softplus.

**Solution.**

Step 1, derivative of the softplus: by the chain rule,

$$\begin{aligned}
\frac{d}{dz}\log(1+e^{z})&=\frac{e^{z}}{1+e^{z}}\\
&=\frac{1}{1+e^{-z}}\\
&=\sigma(z).
\end{aligned}$$

Step 2, gradient of the model: since $\nabla_\theta z_s=\phi(s)$,

$$\nabla_\theta\hat V(s;\theta)=\sigma(\phi(s)\cdot\theta)\,\phi(s).$$

Step 3, gradient of the loss: the derivative of $\tfrac12(V^\pi(s)-\hat V)^2$ with respect to $\hat V$ is $-(V^\pi(s)-\hat V)$; the $\tfrac12$ cancels the $2$ of the square, and $V^\pi(s)$ does not depend on $\theta$. Summing with weights $\mu(s)$,

$$\nabla_\theta J^\pi(\theta)=-\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta)\big)\,\sigma(\phi(s)\cdot\theta)\,\phi(s).$$

Step 4, the descent step $\theta^{t+1}=\theta^t-\alpha\nabla_\theta J^\pi(\theta^t)$; the two minus signs give a plus:

$$\boxed{\theta^{t+1}=\theta^{t}+\alpha\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta^{t})\big)\,\sigma(\phi(s)\cdot\theta^{t})\,\phi(s)}$$

**In words.** Each state pushes $\theta$ along its own feature vector, in proportion to how often it is visited, to how wrong the current prediction is, and to how sensitive the softplus is at that point.

**Sanity check.** If $\hat V$ already equals $V^\pi$ in every state, every error is $0$ and the step is $0$. If a score $z_s$ is very negative, $\sigma(z_s)$ is close to $0$ and that state barely moves $\theta$: the softplus is flat there.

**What to write in the exam.**

- Softplus derivative: $\nabla_\theta\hat V(s;\theta)=\sigma(\phi(s)\cdot\theta)\phi(s)$.
- Gradient: minus the $\mu$-weighted sum of error times sigmoid times $\phi(s)$.
- Update: $\theta^{t+1}$ equals $\theta^t$ plus $\alpha$ times that weighted sum, as boxed above.

*Verified: central finite differences of $J^\pi$ on a random instance with $6$ states and $d=4$ match the analytic gradient to about $10^{-10}$, and the softplus derivative matches $\sigma$ to the same accuracy.*

**(b) An unbiased Monte-Carlo estimator of the value**

**What is asked.** A quantity, computable from one episode of $\pi$, whose expectation is $V^\pi(s)$. The answer is an estimator with a one-line justification.

**Tool and why.** The Monte-Carlo return (cheat sheet §7): the value is defined as an expected return, so an observed return is a sample of it, with no need for the transition model.

**Definitions.** In an episode generated by $\pi$ that visits $s$, let $t(s)$ be the time of the first visit to $s$, and let $\hat G(s)$ be the discounted sum of rewards from that time on. We use the first visit so that each episode contributes one sample per state.

**Solution.**

Step 1, the estimator:

$$\hat G(s)=\sum_{k\ge t(s)}\gamma^{\,k-t(s)}r_k.$$

Step 2, why its conditional law is right: $t(s)$ is decided by the past only (a stopping time), so by the Markov property, given that the state at time $t(s)$ is $s$, the rest of the episode is distributed exactly like an episode of $\pi$ started at $s$.

Step 3, take the expectation: by Step 2 and the definition of $V^\pi$ as the expected discounted return from $s$,

$$\mathbb{E}\big[\hat G(s)\mid s_{t(s)}=s\big]=V^\pi(s).$$

So $\hat G(s)$ is unbiased.

**In words.** The value of a state is the average return from it, so one actual return from it is an honest, if noisy, guess.

**Sanity check.** On a small two-state chain with $\gamma=0.9$ and random termination, the average of $10^5$ simulated returns from the start state is $4.300$, against the exact value $4.293$ from solving the linear Bellman system.

**What to write in the exam.**

- Estimator: the return-to-go from the first visit to $s$, $\hat G(s)=\sum_{k\ge t(s)}\gamma^{k-t(s)}r_k$.
- Unbiased: by the Markov property its conditional expectation is the expected return from $s$, which is $V^\pi(s)$ by definition.

*Verified: Monte-Carlo simulation of $10^5$ episodes on a two-state chain against the exact linear-system value.*

**(c) The Monte-Carlo SGD update**

**What is asked.** A stochastic-gradient step for $J^\pi$ that uses only one sampled state and its observed return. The answer is a formula.

**Tool and why.** SGD with a Monte-Carlo target (cheat sheet §8): write the gradient as an expectation, replace the expectation by one sample, and replace the unknown $V^\pi(s)$ by its unbiased estimate from part (b).

**Definitions.** $s$ is a state sampled along an episode of $\pi$; $\hat G(s)$ is its return from part (b).

**Solution.**

Step 1, the gradient as an expectation: the weighted sum of part (a) is an average over $s\sim\mu$:

$$\nabla_\theta J^\pi(\theta)=-\mathbb{E}_{s\sim\mu}\Big[\big(V^\pi(s)-\hat V(s;\theta)\big)\,\sigma(\phi(s)\cdot\theta)\,\phi(s)\Big].$$

Step 2, sample the state: states visited along trajectories of $\pi$ are distributed according to $\mu$, its visitation distribution, so taking a visited state $s$ replaces the outer expectation; the weight $\mu(s)$ disappears from the step because the sampling supplies it.

Step 3, replace $V^\pi(s)$ by $\hat G(s)$: given $s$ and the current $\theta$, the factors $\hat V(s;\theta)$, $\sigma(\phi(s)\cdot\theta)$ and $\phi(s)$ are fixed, and $\hat G(s)$ has conditional mean $V^\pi(s)$ by part (b). So the expected step is exactly $-\alpha\nabla_\theta J^\pi$.

Step 4, the update:

$$\boxed{\theta^{t+1}=\theta^{t}+\alpha\big(\hat G(s)-\hat V(s;\theta^{t})\big)\,\sigma(\phi(s)\cdot\theta^{t})\,\phi(s)}$$

**In words.** The full gradient needs every state and every true value; SGD uses one visited state and one observed return, and is right on average.

**Sanity check.** Averaging the single-sample direction over $s\sim\mu$ and over noisy unbiased returns reproduces minus the full gradient of part (a) up to sampling error ($6\cdot10^{-4}$ with $2\cdot10^5$ returns per state).

**What to write in the exam.**

- Sample a visited state $s$ from an episode of $\pi$, which realizes $s\sim\mu$.
- Replace $V^\pi(s)$ by the return $\hat G(s)$ from part (b), which is unbiased.
- Update: add to $\theta^t$ the step $\alpha$ times the error $\hat G(s)-\hat V(s;\theta^t)$, times the sigmoid, times $\phi(s)$, as boxed above.

*Verified: the sample average of the stochastic step over $\mu$ and over noisy returns matches minus the analytic gradient on a random instance.*

**Common mistakes.**

- Dropping the sigmoid factor and writing the linear-model update $\alpha(\hat G-\hat V)\phi(s)$; that is the gradient of a different model.
- Keeping $\mu(s)$ inside the SGD step. Sampling states along the trajectory already weights them by $\mu$, so it would be counted twice.
- Using the return from the start of the episode instead of from the visit to $s$; that estimates the value of the start state, not of $s$.

**💡 Trick.** Two facts do all the work: the softplus gradient is the sigmoid ($\nabla\log(1+e^z)=\sigma(z)$), and the Monte-Carlo return is an *unbiased* draw of $V^\pi(s)$ — so sampling a visited state $s\sim\mu$ and plugging $\hat G(s)$ turns the full gradient into the SGD step for free.

**⚠️ Watch out.** This is a **semi-gradient / regression** target, not a policy gradient: differentiate only $\hat V$, keep the sigmoid factor $\sigma(\phi\cdot\theta)$ (don't drop it), and remember the visitation weight $\mu(s)$ is supplied automatically by sampling states along the trajectory — don't double-count it.

## Q4 (25 pts) — A half-smoothed Bellman operator: contraction and fixed point
**Topics:** contraction mapping, sup-norm, Bellman operator, fixed point | **Pillar:** Planning | **Difficulty:** 4
**Maps to:** lecture_04, lecture_03
**Statement (English translation):**
An MDP $M=(S,A,p,s_0,r)$. For $U\in\mathbb{R}^{|S|}$ define the operator

$$(TU)(s)=\tfrac12 U(s)+\tfrac12\max_a\ \mathbb{E}_{s'\sim p(\cdot\mid s,a)}\big[r(s,a)+\gamma U(s')\big].$$

a. State the definition of what it means for an operator $H$ to be $0.01$-contracting in the norm $\|\cdot\|_\infty$.

b. Prove that $T$ is $\beta$-contracting in $\|\cdot\|_\infty$. What is $\beta$ (as a function of $\gamma$)?

c. Let $U^*$ be the fixed point of $T$ for the given MDP $M$. What is $U^*(s)$?

**Solution sketch:**

**(a) Definition of a 0.01-contraction**

**What is asked.** The definition of "$H$ is $0.01$-contracting in $\|\cdot\|_\infty$". The answer is a definition.

**Tool and why.** The definition of a contraction in the sup-norm (cheat sheet §6), with the given factor $0.01$ in place of the generic $\beta$.

**Definitions.** For a vector $U\in\mathbb{R}^{|S|}$, $\|U\|_\infty=\max_s|U(s)|$, the largest absolute entry; it measures the distance between two value functions by their worst state.

**Solution.**

Step 1, the definition: $H$ is $0.01$-contracting in $\|\cdot\|_\infty$ if for **every** pair $U,V\in\mathbb{R}^{|S|}$

$$\|HU-HV\|_\infty\le 0.01\,\|U-V\|_\infty.$$

Step 2, what it implies: the factor is below $1$, so by Banach's fixed-point theorem $H$ has a unique fixed point, and iterating $H$ from any start reaches it, shrinking the distance by a factor of $100$ per application.

**In words.** Applying $H$ to any two vectors brings them at least $100$ times closer in their worst coordinate.

**Sanity check.** The map $HU=0.01\,U$ satisfies the definition with equality; the identity map does not, since it keeps every distance unchanged.

**What to write in the exam.**

- For all $U,V$: $\|HU-HV\|_\infty\le0.01\|U-V\|_\infty$.

*Verified: random pairs of vectors confirm the inequality for $HU=0.01\,U$, with equality.*

**(b) T is a contraction, with factor (1 + γ)/2**

**What is asked.** A proof that $T$ is a $\beta$-contraction in the sup-norm, and the value of $\beta$ as a function of $\gamma$.

**Tool and why.** The standard sup-norm proof for the Bellman operator (cheat sheet §6): split $T$ into its two halves, bound each by the triangle inequality, and use the fact that a maximum moves by at most the largest change of its arguments.

**Definitions.** For a vector $U$ let

$$M_U(s)=\max_a\ \mathbb{E}_{s'\sim p(\cdot\mid s,a)}\big[r(s,a)+\gamma U(s')\big],$$

so that $TU=\tfrac12U+\tfrac12M_U$. We name $M_U$ to handle the Bellman half separately from the identity half.

**Solution.**

Step 1, a lemma. **Claim.** For functions $f,g$ on a finite set, $|\max_a f(a)-\max_a g(a)|\le\max_a|f(a)-g(a)|$.

Let $a^*$ attain $\max_a f$. Then $\max_a f-\max_a g\le f(a^*)-g(a^*)$, which is at most $\max_a|f-g|$. Exchanging the roles of $f$ and $g$ bounds the other sign.

Step 2, the Bellman half: apply the lemma with $f(a)$ and $g(a)$ the expected values for $U$ and $V$. The rewards $r(s,a)$ are the same for both and cancel, so for each $a$

$$\begin{aligned}
|f(a)-g(a)|&=\gamma\,\big|\mathbb{E}_{s'}[U(s')-V(s')]\big|\\
&\le\gamma\,\mathbb{E}_{s'}|U(s')-V(s')|\\
&\le\gamma\,\|U-V\|_\infty.
\end{aligned}$$

Hence $|M_U(s)-M_V(s)|\le\gamma\|U-V\|_\infty$ for every $s$.

Step 3, the identity half: $|U(s)-V(s)|\le\|U-V\|_\infty$ by definition of the sup-norm.

Step 4, combine by the triangle inequality, for every $s$:

$$\begin{aligned}
\big|(TU-TV)(s)\big|&\le\tfrac12|U(s)-V(s)|+\tfrac12|M_U(s)-M_V(s)|\\
&\le\tfrac12\|U-V\|_\infty+\tfrac{\gamma}{2}\|U-V\|_\infty.
\end{aligned}$$

Step 5, take the maximum over $s$:

$$\|TU-TV\|_\infty\le\frac{1+\gamma}{2}\,\|U-V\|_\infty.$$

$$\boxed{\beta=\frac{1+\gamma}{2}}$$

For $\gamma<1$ we get $\beta<1$, so $T$ is a contraction.

**In words.** Half of $T$ is the Bellman operator, which shrinks distances by $\gamma$, and half is the identity, which does not shrink them at all; the average of the two factors is the factor of $T$.

**Sanity check.** The constant cannot be improved: if $V=U+c\mathbf{1}$ then $TV=TU+\tfrac{1+\gamma}{2}c\mathbf{1}$, so the inequality holds with equality. For $\gamma=0.6$ this ratio is $0.8$.

**What to write in the exam.**

- Lemma: $|\max f-\max g|\le\max|f-g|$.
- Rewards cancel, so the Bellman half moves by at most $\gamma\|U-V\|_\infty$.
- The identity half moves by at most $\|U-V\|_\infty$.
- Average the halves: $\beta=\tfrac{1+\gamma}{2}$, below $1$ when $\gamma<1$.

*Verified: $3000$ random MDPs with up to $5$ states, discount below $0.9$, and random pairs $U,V$ give a ratio at most $\tfrac{1+\gamma}{2}$ (maximum ratio over $\beta$ equal to $1$), and shifts by a constant attain it.*

**(c) The fixed point of T**

**What is asked.** An explicit description of the fixed point $U^*$ of $T$ in terms of the MDP $M$.

**Tool and why.** Fixed points of operators (cheat sheet §6): Banach gives existence and uniqueness, and substituting the fixed point into the definition identifies it with the solution of a known equation (cheat sheet §2).

**Definitions.** $V^*_M$ is the optimal value function of $M$, the unique solution of the Bellman optimality equation.

**Solution.**

Step 1, existence and uniqueness: by part (b), $T$ is a $\beta$-contraction with $\beta<1$, so by Banach it has exactly one fixed point $U^*$.

Step 2, write the fixed-point equation $U^*=TU^*$ at a state $s$:

$$U^*(s)=\tfrac12U^*(s)+\tfrac12\max_a\mathbb{E}_{s'}[r(s,a)+\gamma U^*(s')].$$

Step 3, subtract $\tfrac12U^*(s)$ from both sides and multiply by $2$:

$$U^*(s)=\max_a\ \mathbb{E}_{s'\sim p(\cdot\mid s,a)}[r(s,a)+\gamma U^*(s')].$$

Step 4, recognize the equation: this is exactly the Bellman optimality equation of $M$, whose unique solution is $V^*_M$. So

$$\boxed{U^*=V^*_M}$$

the **optimal value function of the MDP $M$**.

**In words.** $T$ is a "lazy" Bellman operator: it moves only halfway toward the Bellman update. Moving halfway changes the speed, not the destination.

**Sanity check.** Conversely, plugging $V^*_M$ into $T$ gives $\tfrac12V^*_M+\tfrac12V^*_M$, which is $V^*_M$, so it is indeed a fixed point.

**What to write in the exam.**

- At the fixed point, $U^*(s)=\tfrac12U^*(s)+\tfrac12M_{U^*}(s)$.
- Cancel the halves: $U^*(s)=M_{U^*}(s)$, the Bellman optimality equation.
- By uniqueness, $U^*=V^*_M$.

*Verified: on $3000$ random MDPs, iterating $T$ and running ordinary value iteration converge to the same vector, to within $10^{-6}$.*

**Common mistakes.**

- Claiming $\beta=\gamma$: the identity half contributes a factor $1$, so the rate is the average $\tfrac{1+\gamma}{2}$.
- Bounding $|\max f-\max g|$ by $\max|f|+\max|g|$, which is too loose to give a factor below $1$.
- In (c), cancelling incorrectly and getting $2V^*$ or $\tfrac12V^*$; subtract $\tfrac12U^*$ first, then multiply by $2$.

**💡 Trick.** The extra $\tfrac12U(s)$ term looks like it should break the contraction, but it only relaxes the rate to $\beta=\tfrac{1+\gamma}{2}$; and at the fixed point the two $\tfrac12U^*(s)$ cancel, leaving the ordinary Bellman optimality equation — so $U^*=V^*$.

**⚠️ Watch out.** $\beta=\tfrac{1+\gamma}{2}$, **not** $\gamma$ — the identity part slows the contraction (as $\gamma\to1$, $\beta\to1$), yet it is still $<1$, so Banach still gives a unique fixed point; don't claim the rate is $\gamma$.
