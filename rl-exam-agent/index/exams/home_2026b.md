# Exam — Home Exam 2025/26 · Part B

**File:** materials/exams/exam_2026_home.pdf
**Date / semester:** 2025/26 Semester B home exam (take-home), due 19.8.2026 — lecturer Prof. Yishay Mansour, TA Orin Levy
**Total points:** 100
**Aid:** take-home (open material)
**Solutions available:** no (blank answer boxes only) — solution sketches derived by the tutor and numerically verified

## Q1 (25 pts) — Drawing balls from a box: an optimal-stopping MDP
**Topics:** MDP formalism, optimal stopping, Q-function, martingale value, policy-independent value | **Pillar:** Planning | **Difficulty:** 4
**Maps to:** lecture_03, lecture_04
**Statement (English translation):**
A sequential decision problem. A box contains $g$ green balls and $b-g$ blue balls (so $b$ balls in total). At each step $t$, while there are at least two balls, a ball is drawn uniformly at random. The player has two actions:
- **Stop**: gain $+1$ if the drawn ball is blue and $0$ if it is green. The game ends.
- **Continue**: gain $0$, see the color of the drawn ball; the drawn ball leaves the box and the game continues without it.

If the box has only one ball, the player gains $+1$ if it is blue and $0$ if it is green (forced, game ends). The objective is to maximize the sum of rewards until the game ends.

a. Write the MDP of the problem formally: $S,A,s_0,R,P$.

b. Let $\pi_{cont}$ be the policy that always plays **continue**. Compute $Q^{\pi_{cont}}(s_0,\text{stop})$ and $Q^{\pi_{cont}}(s_0,\text{continue})$ (recall the initial state has $g$ green and $b-g$ blue).

c. What is the optimal value $V^*\big((b',g')\big)$ when the box holds $b'$ blue and $g'$ green balls? (Hint: the recursion $f(x,y)=\tfrac{y}{x+y}f(x,y-1)+\tfrac{x}{x+y}f(x-1,y)$ with $f(n,0)=1,\ f(0,n)=0$ has solution $f(x,y)=\tfrac{x}{x+y}$.)

d. Change the **continue** action so the player also receives a reward $q>0$ for continuing. What is the optimal policy now, and $Q^*\big((b',g'),\text{stop}\big)$, $Q^*\big((b',g'),\text{continue}\big)$?

**Solution sketch:**

**(a) The MDP**

**What is asked.** Translate the box story into the components of an MDP: states $S$, actions $A$, initial state $s_0$, rewards $R$ and transitions $P$. The answer is a definition, not a number.

**Tool and why.** Modelling a story as an MDP (cheat sheet §12): the state is everything you need to know at the moment of decision. Here the future depends only on the contents of the box, so its composition is the state. The number of balls drops by one at every continue step, so the horizon is finite and we can work without discounting (§3).

**Definitions.** Let $b'$ be the number of blue balls left in the box, $g'$ the number of green balls left, and $n$ the total number of balls, i.e. $n=b'+g'$. Add an absorbing state $\text{end}$ that is entered when the game is over. Note: in the problem data $b$ is the **total** number of balls, whereas $b'$ counts only blue ones. So the initial state has $b-g$ blue balls.

**Solution.**

Step 1, states: every possible composition of the box, plus the absorbing state.

$$S=\{(b',g'):\ b'\le b-g,\ g'\le g,\ b'+g'\ge1\}\cup\{\text{end}\}$$

This is all the relevant information, because balls that have already left do not affect the future; only what remains in the box does.

Step 2, initial state and actions, from the problem data:

$$s_0=(b-g,\ g),\qquad A=\{\text{stop},\text{continue}\}.$$

When one ball is left the game ends by force. We model this by allowing only stop in a state with $n=1$; its reward will match the forced payment exactly (Step 3).

Step 3, rewards: the objective is the expected sum of rewards, so it is enough to record the expected reward of each state–action pair. On stop the drawn ball is uniform over the $n$ balls, so it is blue with probability $\tfrac{b'}{n}$:

$$R\big((b',g'),\text{stop}\big)=\frac{b'}{n},\qquad R\big((b',g'),\text{continue}\big)=0.$$

When $n=1$ the formula gives $b'$: payment $1$ in state $(1,0)$ and payment $0$ in state $(0,1)$, exactly the forced payment.

Step 4, transitions, by the rules of the game:

| State and action | Probability | Next state | Reward |
|---|---|---|---|
| stop at $(b',g')$ | $1$ | $\text{end}$ | $\tfrac{b'}{n}$ |
| continue, blue drawn | $\tfrac{b'}{n}$ | $(b'-1,g')$ | $0$ |
| continue, green drawn | $\tfrac{g'}{n}$ | $(b',g'-1)$ | $0$ |

The state $\text{end}$ is absorbing, with reward $0$.

Step 5, horizon: each continue lowers $n$ by one, so there are at most $b-1$ continue steps before the game ends. The horizon is finite, and $\gamma=1$.

**In words.** The state is "what is left in the box". Stopping is a bet on the current ball; continuing gives up the current ball and bets later on a smaller box.

**Sanity check.** For $b=2$ and $g=1$ we start at $(1,1)$. Stopping pays $\tfrac12$. Continuing leads to $(0,1)$ or to $(1,0)$, each with probability $\tfrac12$, where the forced payment is $0$ or $1$. The value is again $\tfrac12$, as we will see in part (c).

**What to write in the exam.**

- States $(b',g')$ plus an absorbing state $\text{end}$; start at $(b-g,g)$.
- Actions $\text{stop}$ and $\text{continue}$; with one ball left only stop is allowed.
- Stop: expected reward $\tfrac{b'}{n}$ and move to $\text{end}$.
- Continue: reward $0$, move to $(b'-1,g')$ with probability $\tfrac{b'}{n}$ and to $(b',g'-1)$ with probability $\tfrac{g'}{n}$.
- Finite horizon, $\gamma=1$.

*Verified: an exact-fraction Python implementation of this MDP, for every box with up to $11$ blue and $11$ green balls, reproduces all values in the following parts.*

**(b) $Q^{\pi_{cont}}$ at the initial state**

**What is asked.** Two numbers: $Q^{\pi_{cont}}(s_0,\text{stop})$ and $Q^{\pi_{cont}}(s_0,\text{continue})$, as functions of $b$ and $g$.

**Tool and why.** The definition of $Q^\pi$ (cheat sheet §1): take the given action once, then follow $\pi$. Under $\pi_{cont}$ the only payment is the forced payment on the last ball, and the probability that it is blue follows from a symmetry argument.

**Definitions.** Let $L$ be the last ball left in the box when we always continue. We introduce it because under $\pi_{cont}$ only its color determines the payment.

**Solution.**

Step 1, stop: stopping ends the game at once, so the value is the expected reward of stopping at $s_0$. By part (a), with $b-g$ blue out of $b$ balls:

$$Q^{\pi_{cont}}(s_0,\text{stop})=\frac{b-g}{b}.$$

Step 2, continue: the first action pays $0$, and then $\pi_{cont}$ keeps continuing until one ball is left. All continue steps pay $0$, and the final forced payment is $1$ if and only if $L$ is blue. So $Q^{\pi_{cont}}(s_0,\text{continue})$ equals the probability that $L$ is blue.

Step 3, symmetry: draws are uniform and without replacement, so the order in which balls leave is a uniform permutation of the $b$ balls, and $L$ is the ball in the last position. In a uniform permutation each ball is in the last position with probability $\tfrac1b$. There are $b-g$ blue balls, so

$$\begin{aligned}
Q^{\pi_{cont}}(s_0,\text{continue})&=(b-g)\cdot\tfrac1b\\
&=\tfrac{b-g}{b}.
\end{aligned}$$

Step 4, conclusion:

$$\boxed{\begin{aligned}Q^{\pi_{cont}}(s_0,\text{stop})&=\tfrac{b-g}{b}\\ Q^{\pi_{cont}}(s_0,\text{continue})&=\tfrac{b-g}{b}\end{aligned}}$$

**In words.** Stopping now means betting on one random ball. Always continuing means betting on the last ball, which is also one random ball. The two bets are equivalent.

**Sanity check.** For $b=5$ and $g=2$ both values are $\tfrac35$, and a simulation of $200{,}000$ shuffles gives the last ball blue with frequency $0.5996$. In the edge case $g=0$ all balls are blue and both values are $1$, as expected.

**What to write in the exam.**

- Stop: the immediate expected reward, $\tfrac{b-g}{b}$.
- Always continue: the only payment is on the last ball.
- The draw order is a uniform permutation, so the last ball is blue with probability $\tfrac{b-g}{b}$.
- Hence both $Q$ values equal $\tfrac{b-g}{b}$.

*Verified: an exact-fraction DP of $\pi_{cont}$ for every box with up to $11$ blue and $11$ green balls gives $\tfrac{b'}{n}$, and a Monte-Carlo simulation of the case $b=5$, $g=2$ gives $0.5996$ against $0.6$.*

**(c) The optimal value $V^*$**

**What is asked.** A formula for $V^*\big((b',g')\big)$ for every composition of the box, with a proof.

**Tool and why.** The finite-horizon Bellman optimality equation (cheat sheet §2 and §3), with induction on the number of balls $n$: every state moves to a state with $n-1$ balls, so the value at $n$ balls depends only on the values at $n-1$. This is an optimal-stopping problem (§4), and the hinted recursion is exactly the value of continuing.

**Definitions.** $n$ as in part (a). Let $s$ denote the state $(b',g')$, and write $V^*(b',g')$ for short instead of $V^*\big((b',g')\big)$. Let $Q^*(s,a)$ be the value of action $a$ when we act optimally afterwards.

**Solution.**

Step 1, Bellman equation: for every state with $n\ge2$,

$$\begin{aligned}
Q^*(s,\text{stop})&=\tfrac{b'}{n},\\
Q^*(s,\text{continue})&=\tfrac{b'}{n}V^*(b'-1,g')+\tfrac{g'}{n}V^*(b',g'-1),
\end{aligned}$$

and $V^*(s)$ is the larger of the two. When $b'=0$ or $g'=0$ the corresponding term is multiplied by $0$ and is not needed.

Step 2, **Claim.** For every state with $n\ge1$ we have $V^*(b',g')=\tfrac{b'}{n}$, and for every state with $n\ge2$ the two actions have equal value. The proof is by induction on $n$, upward from $1$.

**Base.** When $n=1$ the game ends by force and pays $b'$, which is $\tfrac{b'}{1}$.

**Hypothesis.** For some $n\ge2$, in every state with $n-1$ balls $V^*$ equals the number of blue balls divided by $n-1$.

**Step.** Let $s$ be a state with $n$ balls. Both next states of continue have $n-1$ balls, and there, by the induction hypothesis:

$$V^*(b'-1,g')=\frac{b'-1}{n-1},\qquad V^*(b',g'-1)=\frac{b'}{n-1}.$$

This is the only place the hypothesis is used. Substitute into Step 1:

$$\begin{aligned}
Q^*(s,\text{continue})&=\frac{b'}{n}\cdot\frac{b'-1}{n-1}+\frac{g'}{n}\cdot\frac{b'}{n-1}\\
&=\frac{b'\,(b'-1+g')}{n(n-1)}\\
&=\frac{b'\,(n-1)}{n(n-1)}\\
&=\frac{b'}{n}.
\end{aligned}$$

The second move factors out $b'$, and the third uses $b'+g'=n$. So the value of continuing equals the value of stopping, $\tfrac{b'}{n}$, and their maximum is $\tfrac{b'}{n}$.

Step 3, conclusion:

$$\boxed{V^*\big((b',g')\big)=\frac{b'}{b'+g'}}$$

This is exactly $f(b',g')$ from the hint, with $x=b'$ blue and $y=g'$ green. Since the two actions tie in every state, **every** policy is optimal and the value is policy-independent.

**In words.** The blue fraction of the box is a martingale: removing a random ball does not change the expected blue fraction of what remains. So at every moment what you get from stopping equals in expectation what you get from continuing, and no strategy can exploit the observed colors.

**Sanity check.** At $(1,1)$ stopping pays $\tfrac12$. When continuing, with probability $\tfrac12$ the blue ball is drawn and a green one remains, paying $0$, and with probability $\tfrac12$ the green ball is drawn and a blue one remains, paying $1$. In total $\tfrac12$. At the initial state the formula gives $\tfrac{b-g}{b}$, consistent with part (b).

**What to write in the exam.**

- Bellman: stop is worth $\tfrac{b'}{n}$, and continue is the weighted average of $V^*$ at the two next states.
- Induction on $n$ with base $n=1$: substituting $\tfrac{b'-1}{n-1}$ and $\tfrac{b'}{n-1}$ gives $\tfrac{b'(b'-1+g')}{n(n-1)}$, i.e. $\tfrac{b'}{n}$.
- Hence $V^*$ equals $\tfrac{b'}{b'+g'}$, and the two actions tie in every state.

*Verified: an exact-fraction DP for all $b'$ and $g'$ up to $11$ gives $V^*$ equal to $\tfrac{b'}{n}$, and an exact tie between stop and continue in every state.*

**(d) A bonus $q$ for continuing**

**What is asked.** The optimal policy when continuing also pays $q>0$, and two formulas: $Q^*(s,\text{stop})$ and $Q^*(s,\text{continue})$.

**Tool and why.** The same induction on $n$ as in part (c) (cheat sheet §2 and §3), in guess-and-verify form: guess a formula for $V^*$ and prove that it satisfies the Bellman equation. The guess comes from the fact that every continue pays $q$ and does not change the final chance of winning.

**Definitions.** $s$ and $n$ as in part (c). Let $W(b',g')$ be the guess:

$$W(b',g')=(n-1)\,q+\frac{b'}{n}.$$

The first term is $q$ for each of the $n-1$ continue steps still possible, and the second is the final winning chance from part (c).

**Solution.**

Step 1, the new Bellman equation: for every state with $n\ge2$,

$$\begin{aligned}
Q^*(s,\text{stop})&=\tfrac{b'}{n},\\
Q^*(s,\text{continue})&=q+\tfrac{b'}{n}V^*(b'-1,g')+\tfrac{g'}{n}V^*(b',g'-1).
\end{aligned}$$

Step 2, **Claim.** For every state with $n\ge1$ we have $V^*=W$, and for every state with $n\ge2$ continuing is strictly better than stopping. The proof is by induction on $n$, upward from $1$.

**Base.** When $n=1$ the forced payment is $b'$, and the guess gives $0\cdot q+\tfrac{b'}{1}$, i.e. also $b'$.

**Hypothesis.** For some $n\ge2$, $V^*=W$ in every state with $n-1$ balls.

**Step.** By the hypothesis, at both next states $V^*$ equals $(n-2)\,q$ plus the number of blue balls divided by $n-1$. This is where the hypothesis is used. Substitute into Step 1:

$$\begin{aligned}
Q^*(s,\text{continue})&=q+(n-2)\,q\Big(\tfrac{b'}{n}+\tfrac{g'}{n}\Big)\\
&\quad+\tfrac{b'}{n}\cdot\tfrac{b'-1}{n-1}+\tfrac{g'}{n}\cdot\tfrac{b'}{n-1}\\
&=q+(n-2)\,q+\tfrac{b'}{n}\\
&=(n-1)\,q+\tfrac{b'}{n}.
\end{aligned}$$

In the second move, the sum $\tfrac{b'}{n}+\tfrac{g'}{n}$ equals $1$, and the pair of fractions on the second line equals $\tfrac{b'}{n}$, exactly as in the step of part (c).

Step 3, comparison: the difference between continuing and stopping is

$$Q^*(s,\text{continue})-Q^*(s,\text{stop})=(n-1)\,q,$$

and the difference is strictly positive, because $n\ge2$ and $q>0$. So continuing is strictly better, and $V^*=W$ also in states with $n$ balls. This completes the induction.

Step 4, conclusion: in every state with at least two balls left, continue.

$$\boxed{\begin{aligned}\pi^*(s)&=\text{continue}\quad(n\ge2)\\ Q^*(s,\text{stop})&=\tfrac{b'}{b'+g'}\\ Q^*(s,\text{continue})&=(b'+g'-1)\,q+\tfrac{b'}{b'+g'}\end{aligned}}$$

**In words.** Every continue pays $q$ and does not change the final winning chance, which stays $\tfrac{b'}{n}$ by part (c). So it pays to collect all $n-1$ possible bonuses and only then take the forced payment.

**Sanity check.** At $(1,1)$ continuing is worth $q+\tfrac12$ and stopping $\tfrac12$. At $(3,2)$ with $q=\tfrac1{10}$ continuing is worth $4\cdot\tfrac1{10}+\tfrac35$, i.e. $1$, against $\tfrac35$ for stopping. As $q$ tends to $0$ we return to the tie of part (c).

**What to write in the exam.**

- Guess: $V^*(s)$ equals $(n-1)\,q+\tfrac{b'}{n}$.
- Verify by induction on $n$: continuing is worth $q+(n-2)\,q+\tfrac{b'}{n}$, because the probabilities sum to $1$ and the fractions simplify as in part (c).
- Continue minus stop is $(n-1)\,q$, positive, so always continue.
- Answer: $Q^*(s,\text{stop})$ equals $\tfrac{b'}{b'+g'}$, and $Q^*(s,\text{continue})$ equals $(b'+g'-1)\,q+\tfrac{b'}{b'+g'}$.

*Verified: an exact-fraction DP for $q$ equal to $\tfrac17$, $\tfrac12$ and $3$, for every box with up to $11$ blue and $11$ green balls, gives continue strictly better and value $(n-1)\,q+\tfrac{b'}{n}$ in every state.*

**Common mistakes.**

- Confusing $b$, the total number of balls, with $b'$, the number of blue balls. The initial state is $(b-g,g)$, not $(b,g)$.
- Trying to prove in part (c) that one action is strictly better. The two actions tie in every state, and that is exactly the answer.
- In part (d), writing the continue value as $q+\tfrac{b'}{n}$ and forgetting the $n-2$ bonuses that come later.

**💡 Trick.** The blue-probability of the box is a **martingale** under random removal, so every stopping rule gives the same value $\tfrac{b'}{b'+g'}$ — that single fact answers (b) and (c). Adding $q>0$ to continue then makes stalling strictly profitable, so the optimum flips to "always continue".

**⚠️ Watch out.** In (c) don't try to prove one action beats the other — they *tie* at every state, so the value is policy-independent. In (d) the extra $q$ breaks the tie in favour of continue everywhere; it does **not** change the terminal blue-reward $\tfrac{b'}{b'+g'}$.

## Q2 (25 pts) — Reward transformations that preserve (or break) the optimal first action
**Topics:** finite-horizon MDP, reward shaping, optimal-policy invariance, horizon dependence | **Pillar:** Planning | **Difficulty:** 4
**Maps to:** lecture_02, lecture_04
**Statement (English translation):**
A finite-horizon MDP $M=(s_0,S,A,R,P)$ with horizon $T$; all rewards lie in $[-1,+1]$ (note: they may be **negative**). For $M$ there is an optimal policy $\pi^*$ that takes action $a_0^*$ at the initial state $s_0$. In each part we change $M$'s definition and ask: is it **necessarily** true that there is still an optimal policy taking $a_0^*$ at $s_0$? If yes, give a short proof/explanation; if no, give a counterexample.

a. Multiply all rewards by a constant $\alpha\in[-1,+1]$.

b. Add a constant $\beta\in[-1,+1]$ to all rewards.

c. Enlarge the horizon to $T'=2T$.

d. In every state $s$ add a **reset** action with $r(s,\text{reset})=0$ whose next state is $s_0$.

e. In some state $s$ and action $a\neq\pi^*(s)$ with $r(s,a)\ge0$, halve that reward: $r'(s,a)=r(s,a)/2$.

**Solution sketch:**

**(a) Scaling by $\alpha$**

**What is asked.** Whether, after multiplying all rewards by $\alpha$, there is necessarily still an optimal policy taking $a_0^*$ at $s_0$. The answer is a verdict, followed by a proof or a counterexample.

**Tool and why.** Reward transformations (cheat sheet §5): multiplying by a positive constant preserves the order of policies. Here the constant may be negative, so we look for a counterexample, and one small one is enough.

**Definitions.** Let $V^\pi_M$ be the expected sum of the $T$ rewards of policy $\pi$ in $M$, starting from $s_0$. An optimal policy is one that maximizes it. Let $\alpha M$ be the MDP in which every reward is multiplied by $\alpha$.

**Solution.**

Verdict: **No, not necessarily.**

Step 1, linearity: every reward is multiplied by $\alpha$ and expectation is linear, so for every policy $V^\pi_{\alpha M}=\alpha V^\pi_M$.

Step 2, when $\alpha$ is positive: for every policy $\pi$ we have $V^{\pi^*}_M\ge V^\pi_M$, and multiplying by a positive number keeps the inequality. So $\pi^*$ stays optimal. When $\alpha=0$ all values are $0$, every policy is optimal, and in particular $\pi^*$.

Step 3, when $\alpha$ is negative: multiplying by a negative number reverses the inequality, so the worst policy in $M$ becomes the best. A complete counterexample:

- Horizon $T=1$ and a single state $s_0$ that loops to itself.
- Two actions: $a_0^*$ with reward $+1$, and $a$ with reward $-1$.
- In $M$ the values are $1$ and $-1$, so $a_0^*$ is the unique optimal action.
- With $\alpha=-1$ the values flip to $-1$ and $+1$, so $a$ is the unique optimal action.

So after the change no optimal policy takes $a_0^*$ at $s_0$.

**In words.** Multiplying by a negative number turns the problem from maximizing gain into maximizing loss.

**Sanity check.** In the example all rewards stay in the range $[-1,+1]$ and $\alpha=-1$ is allowed. For $\alpha=\tfrac12$ in the same example the values are $\tfrac12$ and $-\tfrac12$, and $a_0^*$ stays optimal, as in Step 2.

**What to write in the exam.**

- Answer: not necessarily.
- Linearity: $V^\pi_{\alpha M}=\alpha V^\pi_M$, so a negative $\alpha$ reverses the order.
- Example: single state, $T=1$, rewards $+1$ for $a_0^*$ and $-1$ for $a$; with $\alpha=-1$ only $a$ is optimal.

*Verified: DP on the example gives the values $(1,-1)$ and after scaling $(-1,1)$, and in another $3000$ random MDPs with positive $\alpha$ the set of optimal first actions did not change.*

**(b) Adding $\beta$**

**What is asked.** Whether $a_0^*$ stays optimal after adding $\beta$ to every reward. A verdict and a proof.

**Tool and why.** Reward transformations (cheat sheet §5): adding a constant is safe when every trajectory collects the same number of rewards, which is exactly the case with a fixed finite horizon.

**Definitions.** $V^\pi_M$ as in part (a). Let $M+\beta$ be the MDP in which $\beta$ is added to every reward, and $r_t$ the reward at step $t$.

**Solution.**

Verdict: **Yes.**

Step 1, every trajectory collects exactly $T$ rewards, so by linearity of expectation:

$$\begin{aligned}
V^\pi_{M+\beta}&=\mathbb{E}\Big[\sum_{t=0}^{T-1}(r_t+\beta)\Big]\\
&=\mathbb{E}\Big[\sum_{t=0}^{T-1}r_t\Big]+T\beta\\
&=V^\pi_M+T\beta.
\end{aligned}$$

Step 2, the same shift for everyone: for every policy $\pi$ we have $V^{\pi^*}_M\ge V^\pi_M$. Add $T\beta$ to both sides:

$$V^{\pi^*}_{M+\beta}\ \ge\ V^\pi_{M+\beta}.$$

So $\pi^*$ is optimal in $M+\beta$ too, and it takes $a_0^*$ at $s_0$.

**In words.** Every policy receives the same "fixed bonus" $T\beta$, so the ranking among them does not move.

**Sanity check.** The argument relies on every trajectory having exactly $T$ rewards. In an episodic MDP with a terminal state and variable length, a positive $\beta$ would reward long episodes and a negative $\beta$ short ones, and the order could change. Here the horizon is fixed, so there is no problem.

**What to write in the exam.**

- Answer: yes.
- Every trajectory collects $T$ rewards, so $V^\pi_{M+\beta}=V^\pi_M+T\beta$ for every $\pi$.
- An identical shift for all policies preserves the order, so $\pi^*$ stays optimal.

*Verified: $3000$ random finite-horizon MDPs, with random $\beta$ in the range $[-1,1]$: the set of optimal first actions is the same before and after the shift.*

**(c) Doubling the horizon**

**What is asked.** Whether $a_0^*$ stays optimal when the horizon grows to $T'=2T$. A verdict, and if not, a counterexample with all numbers.

**Tool and why.** Finite-horizon backward induction (cheat sheet §3): the optimal action depends on how many steps remain. An action whose payoff comes only later can lose at a short horizon and win at a long one.

**Definitions.** The example has three states: $s_0$, a "dead-end" state $d$, and a "good" state $h$.

**Solution.**

Verdict: **No, not necessarily.**

Step 1, the example, with $T=1$ and hence $T'=2$:

- From $s_0$: $a_0^*$ pays $\tfrac12$ and moves to $d$, and $a$ pays $0$ and moves to $h$.
- In $d$ every action pays $0$ and stays in $d$.
- In $h$ every action pays $+1$ and stays in $h$.

All rewards lie in the range $[-1,+1]$.

Step 2, the action values at $s_0$ at both horizons, by backward induction:

| Action at $s_0$ | Value with $T=1$ | Value with $T'=2$ |
|---|---|---|
| $a_0^*$ | $\tfrac12$ | $\tfrac12$ |
| $a$ | $0$ | $1$ |

With $T=1$ there is a single step, so $a_0^*$ is the unique optimal action. With $T'=2$, action $a_0^*$ gives $\tfrac12$ and then $0$, and action $a$ gives $0$ and then $1$.

Step 3, conclusion: at $T'=2$ we have $1>\tfrac12$, so $a$ is the unique optimal action and no optimal policy takes $a_0^*$.

**In words.** With a short horizon you take what pays now; with a long horizon it is worth investing in reaching a state that pays for a long time.

**Sanity check.** If $a_0^*$ paid $+1$ instead of $\tfrac12$, at $T'=2$ both actions would be worth $1$. A tie is not a counterexample, because then there is still an optimal policy taking $a_0^*$. So the immediate payment of $a_0^*$ must be strictly less than $1$.

**What to write in the exam.**

- Answer: not necessarily.
- Example: $a_0^*$ pays $\tfrac12$ and enters a dead end, $a$ pays $0$ and enters a state that pays $1$ every step.
- With $T=1$ the values are $\tfrac12$ against $0$; with $T'=2$ the values are $\tfrac12$ against $1$.

*Verified: finite-horizon DP on the example gives values $(\tfrac12,0)$ with $T=1$ and $(\tfrac12,1)$ with $T'=2$; with payment $1$ for $a_0^*$ one gets the tie $(1,1)$.*

**(d) A reset action**

**What is asked.** Whether $a_0^*$ stays optimal after adding, in every state, a $\text{reset}$ action with reward $0$ that returns to $s_0$. A verdict and an example.

**Tool and why.** The finite-horizon Bellman equation (cheat sheet §2 and §3) and modelling (§12): the new action is a new option, and when rewards may be negative, an option that pays $0$ can dominate everything else.

**Definitions.** Let $M'$ be the MDP with the reset action, and $Q'$ and $V'$ the optimal values in it.

**Solution.**

Verdict: **No, not necessarily.**

Step 1, the example: a single state $s_0$, a single action $a_0^*$ with reward $-1$ that returns to $s_0$, and any horizon $T$. In $M$ this is the only action, so it is optimal.

Step 2, the value of reset in $M'$: the policy "always reset" pays $0$ at every step, so $V'(s_0)\ge0$. On the other hand, no reward in $M'$ is positive, so also $V'\le0$. Hence $V'=0$ at every step, and $Q'(s_0,\text{reset})=0$.

Step 3, the value of $a_0^*$ in $M'$: the immediate reward is $-1$, followed by at most $0$:

$$\begin{aligned}
Q'(s_0,a_0^*)&=-1+V'(s_0)\\
&=-1.
\end{aligned}$$

For $T=1$ the term $V'(s_0)$ is simply absent, and the value is again $-1$.

Step 4, conclusion: $-1$ is less than $0$, so $\text{reset}$ is the unique optimal action at $s_0$, and no optimal policy takes $a_0^*$.

**In words.** In a world where every reward is negative, the best thing is not to play at all, and a reset action with reward $0$ allows exactly that.

**Sanity check.** If $a_0^*$ paid $+1$, with $T=1$ it would beat reset, $1$ against $0$. So the example works because rewards may be negative, as the question stresses.

**What to write in the exam.**

- Answer: not necessarily.
- Example: a single state and a single action $a_0^*$ with reward $-1$.
- In $M'$ always-reset achieves $0$, and $a_0^*$ achieves $-1$, so reset is the unique optimal action.

*Verified: DP on the example with $T$ equal to $1$, $2$ and $3$ gives in $M'$ the values $-1$ for $a_0^*$ and $0$ for reset.*

**(e) Halving the reward of a non-optimal action**

**What is asked.** Whether $a_0^*$ stays optimal after halving a nonnegative reward $r(s,a)$ of an action that $\pi^*$ does not choose at $s$. A verdict and a proof.

**Tool and why.** Comparing policy values (cheat sheet §1 and §5): show that $\pi^*$ is unaffected by the change, and every other policy can only lose from it. That proves $\pi^*$ is still optimal without solving the new MDP.

**Definitions.** Let $M'$ be the MDP after the change. We read the condition $a\neq\pi^*(s)$ as: $\pi^*$ never chooses $a$ in state $s$ (if $\pi^*$ is time-dependent, then at no step). $V^\pi_M$ as in part (a).

**Solution.**

Verdict: **Yes.**

Step 1, no policy gains: since $r(s,a)\ge0$, we have $\tfrac12r(s,a)\le r(s,a)$. Every reward in $M'$ is at most the corresponding reward in $M$, and the transitions did not change, so for every policy $V^\pi_{M'}\le V^\pi_M$.

Step 2, $\pi^*$ is unaffected: $\pi^*$ never chooses $a$ at $s$, so its trajectories and the rewards it collects are identical in both MDPs, i.e. $V^{\pi^*}_{M'}=V^{\pi^*}_M$.

Step 3, chaining, for every policy $\pi$:

$$\begin{aligned}
V^\pi_{M'}&\le V^\pi_M\\
&\le V^{\pi^*}_M\\
&=V^{\pi^*}_{M'}.
\end{aligned}$$

The first line is Step 1, the second holds because $\pi^*$ is optimal in $M$, and the third is Step 2. So $\pi^*$ is optimal in $M'$, and it takes $a_0^*$ at $s_0$.

**In words.** We only lowered the reward of an action the optimal policy never uses anyway. The optimal policy does not feel the change, and no other policy improved.

**Sanity check.** The condition $r(s,a)\ge0$ is necessary. If the reward is negative, halving raises it. For example, with a single state and $T=1$, where $a_0^*$ pays $-\tfrac35$ and $a$ pays $-1$: after halving $a$ pays $-\tfrac12$, which is larger than $-\tfrac35$, and $a_0^*$ is no longer optimal.

**What to write in the exam.**

- Answer: yes.
- Since $r(s,a)\ge0$, halving only lowers rewards, so $V^\pi_{M'}\le V^\pi_M$ for every $\pi$.
- The policy $\pi^*$ does not use $(s,a)$, so its value did not change.
- Hence $\pi^*$ is still optimal and takes $a_0^*$.

*Verified: in $2989$ random finite-horizon MDPs, halving a nonnegative reward of a pair the optimal policy never uses left $V^*$ unchanged in every state and $a_0^*$ optimal.*

**Common mistakes.**

- In part (b), claiming that adding a constant is always safe. It is safe here only because every trajectory collects exactly $T$ rewards; with episodes of variable length it can change the policy.
- In part (c), giving a "counterexample" in which the actions only tie. A tie leaves an optimal policy taking $a_0^*$, so it refutes nothing.
- In part (e), ignoring the condition $r(s,a)\ge0$. Halving a negative reward raises it and can make $a$ optimal.

**💡 Trick.** Ask what each change does to the *ranking* of policy returns: a positive affine map of all rewards ((b): add a constant) preserves the ranking, but a sign flip ((a): negative $\alpha$), a horizon change ((c)), or a new dominating option ((d): a zero-reward reset in an all-negative world) can reorder it. Only lowering an already-losing action ((e)) never reorders anything.

**⚠️ Watch out.** "Rewards may be negative" is the whole point: negative $\alpha$ inverts the objective, and a $0$-reward reset beats negative rewards — both would be harmless if rewards were guaranteed positive. And "$T$ rewards per trajectory" is why adding a constant is safe in finite horizon but scaling by a negative number is not.

## Q3 (25 pts) — Fitting the value function with an exponential, via MC-SGD
**Topics:** function approximation, gradient descent, Monte-Carlo return, unbiased estimator, SGD | **Pillar:** Approximation | **Difficulty:** 3
**Maps to:** lecture_08, lecture_06, recitation_08
**Statement (English translation):**
An MDP where every state $s$ has a feature vector $\phi(s)\in\mathbb{R}^d$. A value function is parameterized by $\theta\in\mathbb{R}^d$ via

$$\hat V(s;\theta)=\exp\big(\phi(s)\cdot\theta\big).$$

For a policy $\pi$ we minimize the weighted squared error

$$J^\pi(\theta)=\frac12\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta)\big)^2,$$

where $\mu(s)$ is the stationary probability that $\pi$ visits $s$ (assume every state is reachable and revisited under $\pi$). We minimize $J^\pi(\theta)$ by gradient updates.

a. Write the gradient-descent update $\theta^{t+1}$ for minimizing $J^\pi(\theta)$ (as a function of $\phi(s)$, $\mu(s)$, $V^\pi(s)$ and a learning rate $\alpha$).

b. Propose an unbiased estimator of $V^\pi(s)$ for a state $s$ that appears in an episode of $\pi$, using Monte-Carlo.

c. Write the Monte-Carlo SGD update for minimizing $J^\pi(\theta)$.

**Solution sketch:**

**(a) Gradient-descent update**

**What is asked.** A formula for $\theta^{t+1}$ in one gradient-descent step on $J^\pi$, as a function of $\phi(s)$, $\mu(s)$, $V^\pi(s)$ and $\alpha$.

**Tool and why.** Gradient descent on a weighted squared error (cheat sheet §8) with the chain rule: $J^\pi$ is a sum of squares of functions of $\theta$, and the model $\hat V$ is not linear in $\theta$, so we need its derivative.

**Definitions.** Let $\delta(s)$ be the error at state $s$:

$$\delta(s)=V^\pi(s)-\hat V(s;\theta).$$

We introduce it because it is the factor that recurs in every term of the gradient.

**Solution.**

Step 1, gradient of the model: the gradient of $\phi(s)\cdot\theta$ with respect to $\theta$ is $\phi(s)$, and the derivative of $\exp$ is $\exp$. So by the chain rule:

$$\begin{aligned}
\nabla_\theta\hat V(s;\theta)&=\exp\big(\phi(s)\cdot\theta\big)\,\phi(s)\\
&=\hat V(s;\theta)\,\phi(s).
\end{aligned}$$

Step 2, gradient of one term: the derivative of $\tfrac12\delta^2$ is $\delta\,\nabla\delta$. In $\delta(s)$ only $\hat V$ depends on $\theta$, so $\nabla_\theta\delta(s)=-\nabla_\theta\hat V(s;\theta)$.

Step 3, gradient of $J^\pi$: sum over states with the weights $\mu(s)$, which do not depend on $\theta$, and substitute Step 1:

$$\nabla_\theta J^\pi(\theta)=-\sum_s\mu(s)\,\delta(s)\,\hat V(s;\theta)\,\phi(s).$$

Step 4, descent step: $\theta^{t+1}$ is obtained from $\theta^t$ by subtracting $\alpha$ times the gradient, and that minus cancels the minus in Step 3:

$$\boxed{\theta^{t+1}=\theta^{t}+\alpha\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta^{t})\big)\,\hat V(s;\theta^{t})\,\phi(s)}$$

**In words.** This is an ordinary regression update, "error times features", with an extra factor $\hat V(s;\theta)$: it says how much a change in $\theta$ moves the prediction at state $s$. States with a large prediction move faster.

**Sanity check.** If $\hat V$ equals $V^\pi$ in every state, every $\delta(s)$ is $0$ and the step vanishes, as it should at a minimum. In addition, the analytic gradient agrees with central finite differences.

**What to write in the exam.**

- Chain rule: $\nabla_\theta\hat V$ equals $\hat V(s;\theta)\,\phi(s)$.
- Gradient: $-\sum_s\mu(s)\,\delta(s)\,\hat V(s;\theta)\,\phi(s)$.
- Step: $\theta^{t+1}$ equals $\theta^t$ plus $\alpha\sum_s\mu(s)\,\delta(s)\,\hat V\,\phi(s)$.

*Verified: central finite differences on a random instance with $4$ states and $3$ features agree with the analytic gradient to $1.4\cdot10^{-10}$, and a step with $\alpha=0.05$ lowers $J$ from $0.7864$ to $0.7806$.*

**(b) Monte-Carlo estimator**

**What is asked.** An unbiased estimator of $V^\pi(s)$ from trajectories of $\pi$, with a reason why it is unbiased.

**Tool and why.** Monte-Carlo policy evaluation (cheat sheet §7): $V^\pi(s)$ is defined as the expected return from $s$, so the return actually observed is a direct sample of that quantity, with no need for the transition model.

**Definitions.** In an episode of $\pi$, let $t(s)$ be the first step at which $s$ is visited, and $r_k$ the reward at step $k$. The return from that moment, with discount factor $\gamma$:

$$\hat G(s)=\sum_{k\ge t(s)}\gamma^{\,k-t(s)}r_k.$$

**Solution.**

Step 1, the definition of $V^\pi$: by definition (cheat sheet §1), $V^\pi(s)$ is the expected sum of discounted rewards when starting at $s$ and acting by $\pi$.

Step 2, the Markov property: the time $t(s)$ is determined only by what happened up to it. Given that at this step we are at $s$, the rest of the episode is distributed exactly like a fresh run of $\pi$ starting at $s$.

Step 3, conclusion: hence the expectation of $\hat G(s)$ is exactly the expected return from $s$:

$$\boxed{\mathbb{E}\big[\hat G(s)\,\big|\,s_{t(s)}=s\big]=V^\pi(s)}$$

So $\hat G(s)$ is unbiased. An average of such estimates from independent episodes stays unbiased, and its variance is smaller.

**In words.** To find out what a state is worth, enter it, play by $\pi$ until the end, and record how much you earned.

**Sanity check.** In a small chain with $3$ non-terminal states and $\gamma=0.9$, the exact value at the start state is $2.0524$, and the average of $100{,}000$ returns gives $2.0552$.

**What to write in the exam.**

- Estimator: the return $\hat G(s)$ from the first visit to $s$.
- Reason: by the Markov property, the continuation from $t(s)$ is a run of $\pi$ from $s$.
- Hence its expectation is $V^\pi(s)$, by the definition of the value function.

*Verified: a simulation of $100{,}000$ episodes in a chain with $4$ states against the exact solution of the Bellman equations: $2.0552$ against $2.0524$.*

**(c) MC-SGD update**

**What is asked.** A stochastic update that uses one sampled state and its return, instead of the sum over all states and the unknown value $V^\pi$.

**Tool and why.** SGD with a Monte-Carlo target (cheat sheet §7 and §8): $J^\pi$ is an expectation under $\mu$, so sampling one state is enough; and $V^\pi(s)$ is replaced by the unbiased estimator from part (b).

**Definitions.** $\delta(s)$ as in part (a), and $\hat G(s)$ as in part (b).

**Solution.**

Step 1, write $J^\pi$ as an expectation: $\mu$ is a distribution over states, so

$$J^\pi(\theta)=\mathbb{E}_{s\sim\mu}\Big[\tfrac12\big(V^\pi(s)-\hat V(s;\theta)\big)^2\Big].$$

By part (a), the gradient is the expectation under $s\sim\mu$ of $-\delta(s)\,\hat V(s;\theta)\,\phi(s)$.

Step 2, sample a state: states collected along a trajectory of $\pi$ are distributed by $\mu$, so one such state gives a sample of the term inside the expectation, without the sum and without the weight $\mu(s)$.

Step 3, replace $V^\pi(s)$: the unknown value is replaced by $\hat G(s)$. The expression is linear in $\hat G(s)$, and $\hat G(s)$ does not depend on $\theta$, so by part (b):

$$\mathbb{E}\Big[\big(\hat G(s)-\hat V(s;\theta)\big)\hat V(s;\theta)\,\phi(s)\,\Big|\,s\Big]=\delta(s)\,\hat V(s;\theta)\,\phi(s).$$

That is, in expectation the stochastic step is exactly the descent step of part (a).

Step 4, the update:

$$\boxed{\theta^{t+1}=\theta^{t}+\alpha\big(\hat G(s)-\hat V(s;\theta^{t})\big)\,\hat V(s;\theta^{t})\,\phi(s)}$$

**In words.** Every time a state is visited, move its prediction toward the return actually observed, with a step proportional to the error and to the slope of the model.

**Sanity check.** With a single feature $\phi(s)=1$, $\theta^t=0$, return $\hat G(s)=3$ and $\alpha=0.1$: the prediction is $1$, and the step is $0.1\cdot2\cdot1\cdot1$, i.e. $\theta^{t+1}=0.2$. The new prediction $e^{0.2}\approx1.2214$ has moved toward $3$, as expected.

**What to write in the exam.**

- Sample a state $s$ along the trajectory; this realizes $\mu$.
- Replace $V^\pi(s)$ by $\hat G(s)$, which is unbiased and does not depend on $\theta$.
- Update: $\theta$ increases by $\alpha\big(\hat G(s)-\hat V\big)\,\hat V\,\phi(s)$.

*Verified: the exact expectation of the SGD direction under $\mu$ equals minus the full gradient to $6\cdot10^{-17}$, and the single-step example was computed directly.*

**Common mistakes.**

- Forgetting the $\hat V(s;\theta)$ factor from the chain rule and writing the update of a linear model.
- Multiplying again by $\mu(s)$ in the stochastic update. Sampling along the trajectory already realizes this weight.
- Using a target that depends on $\theta$, e.g. $r+\gamma\hat V(s')$, and claiming it is unbiased. That is a TD target, and it is biased.

**💡 Trick.** With $\hat V=\exp(\phi\cdot\theta)$ the gradient is just $\hat V\cdot\phi$ (the model reappears as its own derivative), so the update is $\alpha(\text{target}-\hat V)\,\hat V\,\phi$; sampling a visited state and plugging the unbiased Monte-Carlo return $\hat G(s)$ turns it into the SGD step.

**⚠️ Watch out.** Keep the $\hat V(s;\theta)$ factor from the chain rule (the gradient is *not* just $(\hat G-\hat V)\phi$), and remember that the visitation weight $\mu$ comes for free from sampling states along the trajectory, so don't multiply it in again. Because the target $\hat G(s)$ does not depend on $\theta$, this is an unbiased stochastic gradient of $J^\pi$ itself, not a semi-gradient as in TD.

## Q4 (25 pts) — "Max-over-all-states" operator: contraction and fixed point
**Topics:** contraction mapping, sup-norm, Bellman-type operator, fixed point | **Pillar:** Planning | **Difficulty:** 4
**Maps to:** lecture_04, lecture_03
**Statement (English translation):**
An MDP $M=(S,A,p,s_0,r)$. For $U\in\mathbb{R}^{|S|}$ and $0<\gamma<1$ define

$$(TU)(s)=\max_a\ \mathbb{E}_{s'\sim p(\cdot\mid s,a)}\Big[r(s,a)+\gamma\max_{\bar s}U(\bar s)\Big].$$

a. State the definition of what it means for an operator $H$ to be $\gamma$-contracting in $\|\cdot\|_\infty$.

b. Prove that $T$ is $\gamma$-contracting in $\|\cdot\|_\infty$.

c. Let $U^*$ be the fixed point of $T$ for the given MDP $M$. Write $U^*(s)$ for every state. (Hint: start from the $(s,a)$ that maximizes $r(s,a)$.)

**Solution sketch:**

**(a) Definition of a contraction**

**What is asked.** State the definition of a $\gamma$-contraction in the norm $\|\cdot\|_\infty$. The answer is a definition.

**Tool and why.** Operators and contraction (cheat sheet §6): this is the definition that Banach's theorem rests on, giving a unique fixed point and convergence of iteration.

**Definitions.** For every function $U$ on the states, $\|U\|_\infty$ is its largest absolute value, $\max_s|U(s)|$. Assume $\gamma\in(0,1)$.

**Solution.**

Step 1, the definition: $H$ is a $\gamma$-contraction in $\|\cdot\|_\infty$ if for every two functions $U$ and $V$:

$$\boxed{\|HU-HV\|_\infty\le\gamma\,\|U-V\|_\infty}$$

Step 2, an equivalent form: for every state $s$, the difference $|(HU)(s)-(HV)(s)|$ is bounded by $\gamma\|U-V\|_\infty$. This is the form one actually checks, state by state.

**In words.** Applying $H$ brings any two functions closer to each other by at least a factor $\gamma$ in the worst-case distance.

**Sanity check.** The requirement $\gamma<1$ is essential: with $\gamma=1$ even the identity satisfies the inequality, but it has no unique fixed point.

**What to write in the exam.**

- Definition: for all $U$ and $V$, $\|HU-HV\|_\infty$ is at most $\gamma\|U-V\|_\infty$.
- With $\gamma\in(0,1)$.

*Verified: we tested this inequality for the $T$ of part (b) on $5000$ random pairs.*

**(b) $T$ is a contraction**

**What is asked.** A proof that $T$ satisfies the definition from part (a).

**Tool and why.** Proving a contraction (cheat sheet §6): simplify $(TU)(s)$, subtract, and bound the difference of maxima. Here the future term is a single global number, so the simplification is especially strong.

**Definitions.** Let $R(s)$ be the best immediate reward at state $s$, and $m_U$ the maximum of $U$:

$$R(s)=\max_a r(s,a),\qquad m_U=\max_{\bar s}U(\bar s).$$

**Solution.**

Step 1, simplify: inside the expectation, $r(s,a)$ and $m_U$ do not depend on $s'$, and the expectation of a constant is the constant. So the expectation is $r(s,a)+\gamma m_U$. The term $\gamma m_U$ is the same for every $a$, so it can be taken out of the maximum:

$$(TU)(s)=R(s)+\gamma\,m_U.$$

Step 2, difference: $R(s)$ is the same for $U$ and for $V$ and cancels, so for every $s$:

$$(TU)(s)-(TV)(s)=\gamma\,(m_U-m_V).$$

Step 3, **Claim.** $|m_U-m_V|\le\|U-V\|_\infty$.

Let $\bar s$ be a state where $U$ attains its maximum. Then

$$\begin{aligned}
m_U&=U(\bar s)\\
&\le V(\bar s)+\|U-V\|_\infty\\
&\le m_V+\|U-V\|_\infty.
\end{aligned}$$

The second line is by the definition of the norm, and the third because $V(\bar s)\le m_V$. Swapping the roles of $U$ and $V$ gives the same bound on $m_V-m_U$.

Step 4, combine: by Step 2 the difference is the same at every state, so

$$\begin{aligned}
\|TU-TV\|_\infty&=\gamma\,|m_U-m_V|\\
&\le\gamma\,\|U-V\|_\infty.
\end{aligned}$$

So $T$ is a $\gamma$-contraction, and by Banach's theorem it has a unique fixed point.

**In words.** $T$ "forgets" $U$ almost entirely: it remembers only its maximum, and multiplies it by $\gamma$. That is why it contracts.

**Sanity check.** If $V$ is $U$ plus a constant $c$, then $m_V-m_U$ equals $c$ and $\|U-V\|_\infty$ equals $|c|$, so the ratio is exactly $\gamma$. The bound is tight.

**What to write in the exam.**

- Simplification: $(TU)(s)$ equals $R(s)+\gamma\,m_U$, because the expectation of a constant is the constant.
- Difference: $\gamma(m_U-m_V)$ at every state.
- Lemma: $|m_U-m_V|\le\|U-V\|_\infty$.
- Hence $\|TU-TV\|_\infty\le\gamma\|U-V\|_\infty$.

*Verified: $5000$ random MDPs and pairs $U,V$: the ratio $\|TU-TV\|_\infty/\|U-V\|_\infty$ is always at most $\gamma$ and equals $\gamma|m_U-m_V|/\|U-V\|_\infty$, and for $V=U+c$ it is exactly $\gamma$.*

**(c) The fixed point $U^*$**

**What is asked.** An explicit formula for $U^*(s)$ at every state, for the fixed point of $T$.

**Tool and why.** Fixed point of a contraction (cheat sheet §6): by part (b) it exists and is unique, so it is enough to find one solution of $U^*=TU^*$. By Step 1 of part (b), the equation depends on $U^*$ only through its maximum, so it becomes a scalar equation.

**Definitions.** $R(s)$ as in part (b). Let $M$ be the maximum of $U^*$, and $R_{\max}$ the best immediate reward in the whole MDP:

$$M=\max_{\bar s}U^*(\bar s),\qquad R_{\max}=\max_{s'}\max_a r(s',a).$$

**Solution.**

Step 1, the fixed-point equation, by Step 1 of part (b):

$$U^*(s)=R(s)+\gamma M.$$

Step 2, take the maximum over $s$ on both sides. $\gamma M$ does not depend on $s$, and the maximum of $R(s)$ is $R_{\max}$:

$$M=R_{\max}+\gamma M.$$

This is the hint: the state where $R_{\max}$ is attained is also the state where $U^*$ is maximal.

Step 3, solve the scalar equation: move terms across and divide by $1-\gamma$, which is positive:

$$M=\frac{R_{\max}}{1-\gamma}.$$

Step 4, substitute into Step 1, with $\gamma M$ equal to $\tfrac{\gamma}{1-\gamma}R_{\max}$:

$$\boxed{U^*(s)=\max_a r(s,a)+\frac{\gamma}{1-\gamma}\,\max_{s'}\max_{a}r(s',a)}$$

**In words.** Every state gets its own best reward once, and afterwards, as if it could "jump" to the best place in the MDP, $R_{\max}$ at every step, discounted. The dynamics $p$ play no role.

**Sanity check.** Two states, $\gamma=\tfrac12$, rewards $1$ and $0$ in the first state and $\tfrac12$ and $-1$ in the second. Then $R_{\max}=1$, and the formula gives $U^*$ equal to $2$ in the first state and $\tfrac32$ in the second. Substituting back: $1+\tfrac12\cdot2$ equals $2$, and $\tfrac12+\tfrac12\cdot2$ equals $\tfrac32$. Also the maximum, $2$, equals $R_{\max}/(1-\gamma)$.

**What to write in the exam.**

- Fixed point: $U^*(s)$ equals $R(s)+\gamma M$.
- Maximum over $s$: $M=R_{\max}+\gamma M$, so $M=\tfrac{R_{\max}}{1-\gamma}$.
- Answer: $U^*(s)$ equals $\max_a r(s,a)+\tfrac{\gamma}{1-\gamma}R_{\max}$.

*Verified: iterating $T$ from $0$ on $5000$ random MDPs converges to the formula, and the formula is an exact fixed point; the two-state example was computed directly.*

**Common mistakes.**

- Identifying $T$ with the Bellman optimality operator and answering that $U^*$ is $V^*$. Here the maximum is over **all** states, so the transitions disappear from the answer.
- Answering $\tfrac{R(s)}{1-\gamma}$, as if every state repeated its own reward. The future term uses the global maximum, not the state's own reward.
- Bounding the difference of maxima without the lemma $|m_U-m_V|\le\|U-V\|_\infty$; it is the only step of the proof that needs a reason.

**💡 Trick.** Because the future term is $\max_{\bar s}U(\bar s)$ — a global max, not $\mathbb{E}_{s'}[\cdots]$ — the expectation and the transition $p$ drop out entirely: $(TU)(s)=\max_a r(s,a)+\gamma\max_{\bar s}U(\bar s)$. That collapses both the contraction proof and the fixed point to a one-line calculation.

**⚠️ Watch out.** This is **not** the Bellman optimality operator: the max is taken **outside** the expectation and over **all** states, so $U^*$ ignores the dynamics and just tracks the single best reward in the whole MDP — do not identify $U^*$ with $V^*$ here (contrast with Part A's $\tfrac12$-smoothed operator, whose fixed point *is* $V^*$).
