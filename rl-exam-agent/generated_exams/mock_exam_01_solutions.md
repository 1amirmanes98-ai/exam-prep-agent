# Mock Exam 1 — Solutions

All numeric answers below were verified with a python3 computation: value iteration and policy evaluation in exact fractions for Q1, TD(0) and Monte-Carlo run on the episode for Q2, finite-difference gradients and the REINFORCE step for Q3, and an explore-then-commit simulation plus a numeric minimization of the bound for Q4.

## Q1 — Machine maintenance MDP

**Hint:** Only the current machine state matters. Write the two Bellman optimality equations,
run value iteration a couple of steps from $V_0\equiv0$, then solve the $2\times2$ linear system
for the (run, repair) policy.

**Full solution:**

**(a) Modelling as an MDP**

**What is asked.** Translate the machine story into the components of an MDP: states, actions per state, the reward function and the transition kernel. The answer is a definition, not a number.

**Tool and why.** Modelling a story as an MDP (cheat sheet §12): the state is everything you need to know at decision time. Here the future depends only on whether the machine works, so two states suffice. The horizon is infinite with discounting, so we work with $\gamma=0.9$ (§1).

**Definitions.** Let $W$ denote the state "working" and $B$ the state "broken". We write the actions as $\text{run}$, $\text{service}$ and $\text{repair}$.

**Solution.**

Step 1, states: $S=\{W,B\}$. This is all the relevant information, because rewards and probabilities depend only on the current machine state, not on the history.

Step 2, actions per state, by the rules of the problem: in the working state there are two options, in the broken state only one.

$$A(W)=\{\text{run},\text{service}\},\qquad A(B)=\{\text{repair}\}$$

Step 3, rewards and transitions, straight from the data:

| state and action | $R(s,a)$ | to $W$ | to $B$ |
|---|---|---|---|
| $(W,\text{run})$ | $10$ | $0.7$ | $0.3$ |
| $(W,\text{service})$ | $4$ | $1$ | $0$ |
| $(B,\text{repair})$ | $-3$ | $1$ | $0$ |

In every row the transition probabilities sum to $1$, as a transition kernel requires.

Step 4, objective: maximize $\mathbb{E}\sum_{t\ge0}\gamma^t r_t$ with $\gamma=0.9$.

**In words.** Running earns a lot but risks a breakdown. Servicing earns little and keeps the machine safe. Repair is a penalty that brings the machine back to work.

**Sanity check.** There is no absorbing state and no action leading to an undefined state, so the MDP is closed. Every row of the table is a distribution.

**What to write in the exam.**

- States $S=\{W,B\}$.
- Actions: in $W$ run or service, in $B$ only repair.
- Rewards $10$, $4$ and $-3$ respectively.
- Transitions: run stays in $W$ with probability $0.7$ and goes to $B$ with probability $0.3$; service and repair lead to $W$ with certainty.
- Objective: discounted return with $\gamma=0.9$.

*Verified: an exact-fraction Python implementation of this MDP reproduces all values in the following parts.*

**(b) Bellman optimality equations**

**What is asked.** Two equations, one for $V^*(W)$ and one for $V^*(B)$. The answer is a formula.

**Tool and why.** The Bellman optimality equation (cheat sheet §2): the optimal value is the maximum over actions of the immediate reward plus $\gamma$ times the expected value of the next state. It is the right tool because for every action the reward and the next-state distribution are known.

**Definitions.** $V^*(s)$ is the largest discounted return achievable starting from state $s$.

**Solution.**

Step 1, the general formula from the cheat sheet:

$$V^*(s)=\max_{a\in A(s)}\Big\{R(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\,V^*(s')\Big\}$$

Step 2, state $W$: plug in the first two rows of the table from part (a).

$$V^*(W)=\max\Big\{10+\gamma\big(0.7\,V^*(W)+0.3\,V^*(B)\big),\ 4+\gamma V^*(W)\Big\}$$

Step 3, state $B$: there is a single action, so there is no maximum.

$$V^*(B)=-3+\gamma V^*(W)$$

**In words.** In $W$ we compare running, which pays $10$ but with probability $0.3$ moves us to the bad state, with servicing, which pays $4$ and stays in the good state. In $B$ there is no choice.

**Sanity check.** Setting $\gamma=0$, the equations give $V^*(W)=10$ and $V^*(B)=-3$, i.e. we pick the larger immediate reward. This is exactly $V_1$ in part (c).

**What to write in the exam.**

- Equation for the working state:

$$V^*(W)=\max\Big\{10+\gamma\big(0.7\,V^*(W)+0.3\,V^*(B)\big),\ 4+\gamma V^*(W)\Big\}$$

- Equation for the broken state: $V^*(B)=-3+\gamma V^*(W)$.

*Verified: the solution of part (d) plugged into these equations satisfies them exactly, in fractions.*

**(c) Two iterations of value iteration**

**What is asked.** Four numbers, $V_1(W)$, $V_1(B)$, $V_2(W)$, $V_2(B)$, and the greedy action in $W$ at each iteration.

**Tool and why.** Value iteration (cheat sheet §3): apply the Bellman optimality operator to the previous values, $V_n=TV_{n-1}$. The operator is a contraction (§6), so the sequence converges to $V^*$, but here only two steps are asked.

**Definitions.** Let $Q_n(s,a)$ be the value of action $a$ in state $s$ looking one step ahead with $V_{n-1}$:

$$Q_n(s,a)=R(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\,V_{n-1}(s')$$

We introduce it so that at each iteration $V_n(s)$ is simply the maximum of $Q_n(s,\cdot)$, and the greedy action is the one attaining it.

**Solution.**

Step 1, iteration 1: all previous values are $0$, so only the immediate reward remains.

$$Q_1(W,\text{run})=10+0.9\cdot0=10$$

$$Q_1(W,\text{service})=4+0.9\cdot0=4$$

The maximum is $10$, so $V_1(W)=10$ and the greedy action is run. In state $B$:

$$V_1(B)=-3+0.9\cdot0=-3$$

Step 2, iteration 2, run in $W$: plug in $V_1(W)=10$ and $V_1(B)=-3$.

$$\begin{aligned}
Q_2(W,\text{run})&=10+0.9\big(0.7\cdot10+0.3\cdot(-3)\big)\\
&=10+0.9\,(7-0.9)\\
&=10+0.9\cdot6.1\\
&=15.49
\end{aligned}$$

Step 3, iteration 2, service in $W$: we stay in $W$ with certainty.

$$Q_2(W,\text{service})=4+0.9\cdot10=13$$

The maximum is $15.49$, so $V_2(W)=15.49$ and the greedy action is again run.

Step 4, iteration 2 in state $B$: repair leads to $W$, which is now worth $10$.

$$V_2(B)=-3+0.9\cdot10=6$$

Summary:

| $n$ | $V_n(W)$ | $V_n(B)$ | greedy in $W$ |
|---|---|---|---|
| $1$ | $10$ | $-3$ | run |
| $2$ | $15.49$ | $6$ | run |

$$\boxed{V_1(W)=10,\ V_1(B)=-3,\ V_2(W)=15.49,\ V_2(B)=6}$$

**In words.** $V_n$ is the optimal value when exactly $n$ steps remain. After one step the broken machine is worth only the penalty; after two steps it is worth the penalty plus one working day.

**Sanity check.** A third iteration gives $V_3(W)=21.3787$ and $V_3(B)=10.941$. The value in $W$ rises at every step towards $72.36$ from part (d). In $B$ the sequence $0$, $-3$, $6$, $10.941$ first drops and only then rises, so the iterates are not monotone in every state, because $TV_0\ge V_0$ fails: repair is negative.

**What to write in the exam.**

- Iteration 1: $Q_1(W,\cdot)$ is $10$ for run and $4$ for service, so $V_1(W)=10$ with run, and $V_1(B)=-3$.
- Iteration 2: run gives $10+0.9\cdot6.1=15.49$, service gives $4+0.9\cdot10=13$.
- Hence $V_2(W)=15.49$ with run, and $V_2(B)=6$ because repair gives $-3+0.9\cdot10$.

*Verified: three exact-fraction iterations give $10,\tfrac{1549}{100},\tfrac{213787}{10000}$ in $W$, and $-3,6,\tfrac{10941}{1000}$ in $B$.*

**(d) Evaluating the optimal policy**

**What is asked.** Solve a $2\times2$ linear system for the value of the policy (run, repair), report two numbers to two decimals, and confirm that in $W$ run is at least as good as service.

**Tool and why.** Policy evaluation (cheat sheet §2 and §3): for a fixed policy the Bellman equation is linear, since there is no maximum, so we solve it directly instead of iterating. The check uses the policy improvement theorem: a policy that is greedy with respect to its own value is optimal.

**Definitions.** Let $V(W)$ and $V(B)$ be the value of the policy $\pi(W)=\text{run}$, $\pi(B)=\text{repair}$.

**Solution.**

Step 1, the system: the Bellman equations of the policy, without a maximum.

$$V(W)=10+0.9\big(0.7\,V(W)+0.3\,V(B)\big)$$

$$V(B)=-3+0.9\,V(W)$$

Step 2, expand the first equation: $0.9\cdot0.7=0.63$ and $0.9\cdot0.3=0.27$.

$$V(W)=10+0.63\,V(W)+0.27\,V(B)$$

Step 3, substitute the second equation into this one and expand: $0.27\cdot(-3)=-0.81$ and $0.27\cdot0.9=0.243$.

$$\begin{aligned}
V(W)&=10+0.63\,V(W)+0.27\big(-3+0.9\,V(W)\big)\\
&=10-0.81+0.63\,V(W)+0.243\,V(W)\\
&=9.19+0.873\,V(W)
\end{aligned}$$

Step 4, collect terms: $1-0.873=0.127$.

$$\begin{aligned}
0.127\,V(W)&=9.19\\
V(W)&=\tfrac{9.19}{0.127}=\tfrac{9190}{127}\approx72.36
\end{aligned}$$

Step 5, plug into the equation for $B$:

$$\begin{aligned}
V(B)&=-3+0.9\cdot\tfrac{9190}{127}\\
&=\tfrac{-381+8271}{127}\\
&=\tfrac{7890}{127}\approx62.13
\end{aligned}$$

$$\boxed{V^*(W)\approx72.36,\qquad V^*(B)\approx62.13}$$

Step 6, the check in $W$: evaluate both actions with the values just found.

$$\begin{aligned}
Q(W,\text{run})&=10+0.9\,(0.7\cdot72.36+0.3\cdot62.13)\approx72.36\\
Q(W,\text{service})&=4+0.9\cdot72.36\approx69.13
\end{aligned}$$

Run is better by about $3.24$. In $B$ there is a single action. So the policy is greedy with respect to its own value, i.e. it satisfies the optimality equation of part (b), and by the policy improvement theorem it is optimal.

**In words.** Despite the breakdown risk, running pays: it earns $10$ on average, and even when the machine breaks the penalty is only $3$ and it is back at work the next day.

**Sanity check.** Always servicing is worth $\tfrac{4}{1-0.9}=40$, far below $72.36$. Value iteration run to convergence also reaches $72.36$ and $62.13$. Also the gap $V(W)-V(B)\approx10.24$ is positive, as expected: it is better to be in the state where the machine works.

**What to write in the exam.**

- System: $V(W)=10+0.63V(W)+0.27V(B)$ and $V(B)=-3+0.9V(W)$.
- Substitution: $0.127\,V(W)=9.19$, so $V^*(W)\approx72.36$.
- Then $V^*(B)\approx-3+0.9\cdot72.36$, i.e. $V^*(B)\approx62.13$.
- Check: run gives $72.36$ and service $69.13$, so the policy is greedy with respect to itself and optimal.

*Verified: solving the system in fractions gives $\tfrac{9190}{127}$ and $\tfrac{7890}{127}$; numpy.linalg.solve and 2000 value iterations give the same values.*

**Common mistakes.**

- Forgetting $V_1(B)=-3$ in iteration 2, i.e. treating it as zero, which gives $Q_2(W,\text{run})=16.3$ instead of $15.49$.
- Reporting $V_2$ as if it were $V^*$. Two iterations are very far from convergence.
- Substituting wrongly in step 3 of part (d), e.g. multiplying $-3$ by $0.9$ instead of $0.27$, which gives a wrong coefficient.

**💡 Trick.** Only the state matters — a 2-state MDP is a $2\times2$ linear system; solve it directly rather than iterating VI to the limit.

**⚠️ Watch out.** Value iteration never reaches $V^*$ in finitely many steps; for the exact value of a fixed policy, solve $(I-\gamma P^\pi)V=r^\pi$.

## Q2 — TD(0) vs first-visit MC

**Hint:** TD(0) bootstraps off the current (still-zero) next-state estimates, so on the first
pass only immediate rewards move the values; first-visit MC uses the full observed return from
each state.

**Full solution:**

**(a) TD(0) over the episode**

**What is asked.** Run three TD(0) updates, one per state in visit order, and report three numbers.

**Tool and why.** The TD(0) update rule (cheat sheet §7): after each transition move $V(s)$ by a step $\alpha$ towards the target $r+\gamma V(s')$. This is exactly what is asked, and no model is needed because the transition and the reward were observed.

**Definitions.** Let $\delta$ be the TD error of a transition, i.e. the distance between the target and the current value:

$$\delta=r+\gamma V(s')-V(s),\qquad V(s)\leftarrow V(s)+\alpha\,\delta$$

The terminal value is always $0$ by definition, since no rewards follow it: $V(\text{terminal})=0$.

**Solution.**

Step 1, the first transition, $s_1$ to $s_2$ with reward $2$: $V(s_2)$ is still $0$.

$$\begin{aligned}
\delta_1&=2+1\cdot V(s_2)-V(s_1)=2+0-0=2\\
V(s_1)&=0+0.5\cdot2=1
\end{aligned}$$

Step 2, the second transition, $s_2$ to $s_3$ with reward $1$: the update of $s_1$ changes nothing here, because the target uses $V(s_3)$, which is still $0$.

$$\begin{aligned}
\delta_2&=1+V(s_3)-V(s_2)=1+0-0=1\\
V(s_2)&=0+0.5\cdot1=0.5
\end{aligned}$$

Step 3, the third transition, $s_3$ to the terminal state with reward $5$:

$$\begin{aligned}
\delta_3&=5+V(\text{terminal})-V(s_3)=5+0-0=5\\
V(s_3)&=0+0.5\cdot5=2.5
\end{aligned}$$

$$\boxed{V(s_1)=1,\quad V(s_2)=0.5,\quad V(s_3)=2.5}$$

**In words.** In every transition the target is the immediate reward plus zero, so each value moves halfway towards its immediate reward only. The large reward $5$ has not yet reached $s_1$ and $s_2$.

**Sanity check.** Order matters: had you updated from the end backwards, $s_2$ would have seen $V(s_3)=2.5$ and got $1.75$, and $s_1$ would have got $1.875$. In visit order, which is how TD actually runs, this does not happen.

**What to write in the exam.**

- Update rule: $V(s)\leftarrow V(s)+\alpha\big(r+\gamma V(s')-V(s)\big)$.
- For $s_1$ the target is $2+0$, so $V(s_1)=1$.
- For $s_2$ the target is $1+0$, so $V(s_2)=0.5$.
- For $s_3$ the target is $5+0$, so $V(s_3)=2.5$.

*Verified: running the three updates in Python gives $1$, $0.5$, $2.5$.*

**(b) First-visit Monte-Carlo**

**What is asked.** Three numbers: the MC estimate of each state from the same episode.

**Tool and why.** Monte-Carlo evaluation (cheat sheet §7): the value of a state is estimated by the average of the returns observed from its first visit. There is one episode and each state is visited once, so the average is a single return.

**Definitions.** Let $G(s)$ be the return observed from the first visit to $s$: the sum of rewards from that moment to the end of the episode, with $\gamma=1$.

**Solution.**

Step 1, compute from the end backwards using $G_t=r_{t+1}+\gamma G_{t+1}$, so each return reuses the next one:

$$\begin{aligned}
G(s_3)&=5\\
G(s_2)&=1+G(s_3)=6\\
G(s_1)&=2+G(s_2)=8
\end{aligned}$$

Step 2, the MC estimate is the average of the returns for each state. There is one return per state, so:

$$\boxed{V(s_1)=8,\quad V(s_2)=6,\quad V(s_3)=5}$$

**In words.** MC guesses nothing: it waits for the end of the episode and records what actually happened from each state.

**Sanity check.** Each state is visited once, so first-visit and every-visit MC agree here. Also $G(s_1)$ equals the sum of all rewards, $2+1+5$.

**What to write in the exam.**

- With $\gamma=1$ the return is the sum of rewards to the end.
- Hence $G(s_1)=8$, $G(s_2)=6$, $G(s_3)=5$.
- There is one episode, so these are the MC estimates.

*Verified: computing the returns of the episode in Python gives $8$, $6$, $5$.*

**(c) Why the methods disagree**

**What is asked.** An explanation in words, in terms of bootstrapping and bias, of why TD gives $(1,0.5,2.5)$ and MC gives $(8,6,5)$.

**Tool and why.** Comparing the update targets (cheat sheet §7): the whole difference lies in what each method uses as its target. So we compare the targets and look at their expectations.

**Definitions.** The bias of a target is its expectation minus the true value $V^\pi(s)$. An unbiased target is one whose expectation is exactly $V^\pi(s)$.

**Solution.**

Step 1, the TD target is $r+\gamma V(s')$: a real reward plus a guess of the next value. This is bootstrapping: an estimate is used to update an estimate.

Step 2, the bias of TD: the guess $V(s')$ is still $0$ after initialization, while the true value of the next state is positive. So the target is biased downwards, towards the initialization. Moreover, with $\alpha=0.5$ we only move halfway to the target.

Step 3, the MC target is the actually observed return $G$. Its expectation is exactly $V^\pi(s)$, by the definition of the value function, so it is unbiased.

Step 4, the price of MC: $G$ is a sum of many random rewards and transitions, so it has high variance. The TD target depends on a single transition, so its variance is low, and one can update right after each step without waiting for the end.

Step 5, if the chain is deterministic the true values are $8$, $6$, $5$, and TD converges to them with more episodes: after the second episode we get $(1.75,2,3.75)$, after the third $(2.875,3.375,4.375)$, and so on. In each episode the reward information travels one more step backwards.

**In words.** TD learns fast and with low variance, but at first it "believes" the initialization. MC believes no estimate, and pays for it in variance.

**Sanity check.** Had we initialized $V$ to the true values $8$, $6$, $5$, the TD errors would be zero and the two methods would agree. So the whole gap comes from the initialization, through bootstrapping.

**What to write in the exam.**

- TD bootstraps: the target $r+\gamma V(s')$ uses the estimate $V(s')$, which is still $0$.
- So TD is biased towards the initialization and the reward has not propagated back yet; its variance is low.
- MC uses the real return $G$, whose expectation is $V^\pi(s)$: unbiased, but high variance.
- With more episodes TD converges to the same values.

*Verified: running TD(0) on the same episode repeatedly gives $(1.75,2,3.75)$, then $(2.875,3.375,4.375)$, and after 60 episodes $(8,6,5)$ to within $10^{-14}$.*

**Common mistakes.**

- Updating $s_2$ with the target $1+V(s_3)$ after $s_3$ was already updated, i.e. working from the end backwards, and getting $1.75$ instead of $0.5$.
- Reporting the one-episode TD values as an estimate of the true value.
- Mixing up bias and variance: MC is unbiased but noisy; TD is biased early but stable.

**💡 Trick.** On the first pass every bootstrap target is still $0$, so TD(0) just does $\alpha r$ — the reward hasn't propagated back yet.

**⚠️ Watch out.** Don't report the one-episode TD values as the true values; TD is biased early, MC uses the full return.

## Q3 — Softmax policy gradient

**Hint:** Write $\log\pi(a\mid s)=\theta^\top\phi(s,a)-\log\sum_{a'}e^{\theta^\top\phi(s,a')}$ and
differentiate to get $\phi(s,a)-\mathbb{E}_\pi[\phi]$. Then evaluate at $\theta=(0.5,0)$ and take
one REINFORCE step.

**Full solution:**

**(a) The softmax score function**

**What is asked.** Prove an identity: the gradient of $\log\pi(a\mid s;\theta)$ with respect to $\theta$ is the action's feature minus the mean feature under the policy. The answer is a proof.

**Tool and why.** The score table of Policy Gradient (cheat sheet §9). We take the log because it turns the ratio into a difference: the numerator gives a term linear in $\theta$, and the denominator gives the log of a sum, whose gradient is easy by the chain rule.

**Definitions.** Let $Z(\theta)$ be the softmax denominator, i.e. the normalizing constant:

$$Z(\theta)=\sum_{a'}e^{\theta^\top\phi(s,a')}$$

We introduce it to write the policy compactly, $\pi(a\mid s;\theta)=e^{\theta^\top\phi(s,a)}/Z(\theta)$.

**Solution.**

Step 1, the log of the policy: the log of a ratio is the difference of logs, and $\log e^x=x$.

$$\log\pi(a\mid s;\theta)=\theta^\top\phi(s,a)-\log Z(\theta)$$

Step 2, gradient of the first term: it is linear in $\theta$, so $\nabla_\theta\,\theta^\top\phi(s,a)=\phi(s,a)$.

Step 3, gradient of the second term, by the chain rule: the derivative of $\log Z$ is $\nabla Z/Z$, and the gradient of each summand $e^{\theta^\top\phi(s,a')}$ is the summand itself times $\phi(s,a')$.

$$\begin{aligned}
\nabla_\theta\log Z(\theta)&=\frac{1}{Z(\theta)}\sum_{a'}e^{\theta^\top\phi(s,a')}\,\phi(s,a')\\
&=\sum_{a'}\frac{e^{\theta^\top\phi(s,a')}}{Z(\theta)}\,\phi(s,a')\\
&=\sum_{a'}\pi(a'\mid s;\theta)\,\phi(s,a')\\
&=\mathbb{E}_{a'\sim\pi(\cdot\mid s)}\big[\phi(s,a')\big]
\end{aligned}$$

The third equality is the definition of the softmax, the fourth the definition of expectation.

Step 4, combine steps 2 and 3:

$$\boxed{\nabla_\theta\log\pi(a\mid s;\theta)=\phi(s,a)-\mathbb{E}_{a'\sim\pi(\cdot\mid s)}\big[\phi(s,a')\big]}$$

**In words.** The score points from the "average" feature to the feature of the chosen action. A step along it raises the probability of that action at the expense of the others.

**Sanity check.** The expected score under the policy is zero, as it must be for any score function: $\sum_a\pi(a)\big(\phi(s,a)-\mathbb{E}_\pi[\phi]\big)$ equals $\mathbb{E}_\pi[\phi]-\mathbb{E}_\pi[\phi]$, i.e. zero.

**What to write in the exam.**

- Log: $\log\pi(a\mid s)=\theta^\top\phi(s,a)-\log Z(\theta)$.
- Gradient of the first term: $\phi(s,a)$.
- Gradient of $\log Z$: $\sum_{a'}\pi(a'\mid s)\phi(s,a')$, i.e. $\mathbb{E}_\pi[\phi]$.
- The difference of the two gradients is the identity.

*Verified: a finite-difference gradient at 5 random $\theta$, for both actions, matches the formula to $10^{-6}$.*

**(b) Probabilities and score at $\theta=(0.5,0)$**

**What is asked.** Two numbers, $\pi(a_1\mid s)$ and $\pi(a_2\mid s)$, and the score vector of $a_1$.

**Tool and why.** Direct substitution into the softmax definition and the formula of part (a) (cheat sheet §9).

**Definitions.** The logit of an action is $\theta^\top\phi(s,a)$, the exponent in the softmax numerator.

**Solution.**

Step 1, logits: the features are unit vectors, so each logit is one component of $\theta$.

$$\theta^\top\phi(s,a_1)=0.5,\qquad \theta^\top\phi(s,a_2)=0$$

Step 2, probabilities: $e^{0.5}\approx1.6487$ and $e^0=1$, so the denominator is $2.6487$.

$$\begin{aligned}
\pi(a_1\mid s)&=\frac{e^{0.5}}{e^{0.5}+1}\approx\frac{1.6487}{2.6487}\approx0.6225\\
\pi(a_2\mid s)&=\frac{1}{e^{0.5}+1}\approx0.3775
\end{aligned}$$

Step 3, the mean feature: weight the two unit vectors by the probabilities.

$$\mathbb{E}_\pi[\phi]=0.6225\,(1,0)+0.3775\,(0,1)=(0.6225,\,0.3775)$$

Step 4, the score of $a_1$, by part (a):

$$\nabla_\theta\log\pi(a_1\mid s)=(1,0)-(0.6225,0.3775)=(0.3775,\,-0.3775)$$

$$\boxed{\pi(a_1\mid s)\approx0.6225,\quad \pi(a_2\mid s)\approx0.3775}$$

$$\boxed{\nabla_\theta\log\pi(a_1\mid s)\approx(0.3775,-0.3775)}$$

**In words.** Action $a_1$ is already preferred, so its score is relatively small: it is $1-\pi(a_1)$ in the first component. The likelier an action, the less room there is to raise it.

**Sanity check.** The score components sum to $0$, because the features are unit vectors and the probabilities sum to $1$. Also $\pi(a_1)$ is the sigmoid of the logit difference, $\sigma(0.5)\approx0.6225$.

**What to write in the exam.**

- Logits $0.5$ and $0$, so $\pi(a_1)=e^{0.5}/(e^{0.5}+1)$, i.e. $\pi(a_1)\approx0.6225$.
- Accordingly $\pi(a_2)\approx0.3775$.
- Mean feature $(0.6225,0.3775)$, so the score is $(0.3775,-0.3775)$.

*Verified: numpy gives $\pi\approx(0.62246,0.37754)$, and a finite-difference gradient of $\log\pi(a_1)$ gives $(0.37754,-0.37754)$.*

**(c) One REINFORCE step**

**What is asked.** The new vector $\theta$ after one update with $G=3$ and $\eta=0.1$.

**Tool and why.** REINFORCE (cheat sheet §9): the step is the step size times the return times the score of the sampled action. We already computed the score in part (b).

**Definitions.** No new notation.

**Solution.**

Step 1, the coefficient: $\eta\,G=0.3$, because $\eta=0.1$ and $G=3$.

Step 2, the step: multiply the score from part (b) by the coefficient.

$$0.3\cdot(0.3775,-0.3775)\approx(0.1133,\,-0.1133)$$

Step 3, the update:

$$\begin{aligned}
\theta_{\text{new}}&=(0.5,0)+(0.1133,-0.1133)\\
&\approx(0.6133,\,-0.1133)
\end{aligned}$$

$$\boxed{\theta_{\text{new}}\approx(0.6133,\,-0.1133)}$$

**In words.** The return is positive, so the step goes along the score of $a_1$: the logit of $a_1$ goes up and that of $a_2$ goes down, so $a_1$ will be chosen with higher probability.

**Sanity check.** After the update $\pi(a_1\mid s)\approx0.6740$, more than $0.6225$, as expected from a positive return.

**What to write in the exam.**

- Update: $\theta\leftarrow\theta+\eta\,G\,\nabla_\theta\log\pi(a_1\mid s)$.
- The step is $0.3\cdot(0.3775,-0.3775)$, i.e. $(0.1133,-0.1133)$.
- Hence $\theta_{\text{new}}\approx(0.6133,-0.1133)$.

*Verified: numpy gives $\theta_{\text{new}}\approx(0.61326,-0.11326)$ and $\pi(a_1)\approx0.67404$ after the update.*

**Common mistakes.**

- Dropping the $-\mathbb{E}_\pi[\phi]$ term and using $\phi(s,a_1)$ itself as the score, which gives a step $(0.3,0)$ instead of $(0.1133,-0.1133)$.
- Differentiating $\log Z$ as if it were $\sum_{a'}\theta^\top\phi(s,a')$, i.e. forgetting the weights $\pi(a')$.
- Using the gradient of $\pi$ itself instead of the gradient of $\log\pi$ in the REINFORCE update.

**💡 Trick.** The score is always $\phi(a)-\mathbb{E}_\pi[\phi]$ — the 'minus the mean feature' term falls out of the log-partition automatically.

**⚠️ Watch out.** Normalize the policy first; dropping the $-\mathbb{E}_\pi[\phi]$ term is the classic lost point.

## Q4 — Explore-then-commit regret

**Hint:** Split the regret into the forced exploration ($m$ pulls of the worse arm) plus the
commit phase weighted by the probability of committing to the wrong arm (bound it with
Hoeffding). Then choose $m$ to balance the two terms.

**Full solution:**

**(a) Regret of the exploration phase**

**What is asked.** Show that the regret accumulated over the $2m$ exploration pulls is exactly $m\Delta$. The answer is a short proof.

**Tool and why.** Regret as a sum of gaps (cheat sheet §10): each pull contributes the gap between the best arm and the arm pulled. In the exploration phase the number of pulls of each arm is fixed in advance, so there is no randomness here.

**Definitions.** Call the arm with mean $\mu^\star$ "the good arm" and the other "the other arm", with mean $\mu_{\text{other}}$.

**Solution.**

Step 1, a pull of the good arm contributes $\mu^\star-\mu^\star$, i.e. $0$.

Step 2, a pull of the other arm contributes $\mu^\star-\mu_{\text{other}}$, i.e. $\Delta$, by the definition of $\Delta$.

Step 3, in the exploration phase each arm is pulled exactly $m$ times, by the algorithm, regardless of the observed rewards. So the regret of the phase is:

$$m\cdot0+m\cdot\Delta=\boxed{m\Delta}$$

**In words.** Exploration is a fixed price: you pay $\Delta$ for each of the $m$ pulls of the other arm in order to learn which arm is good.

**Sanity check.** With $m=0$ there is no exploration and no regret in this phase. The regret grows linearly in $m$, so exploring too long is expensive.

**What to write in the exam.**

- A pull of the good arm costs $0$, a pull of the other costs $\Delta$.
- Each arm is pulled $m$ times, deterministically.
- So the exploration regret is exactly $m\Delta$.

*Verified: a simulation with Bernoulli arms, $\mu^\star=0.6$ and $\mu_{\text{other}}=0.5$, gives exploration regret exactly $m\Delta$ in every run.*

**(b) Probability of committing to the wrong arm**

**What is asked.** Prove that the probability that the other arm's empirical mean is not below the good arm's is at most $\exp(-m\Delta^2/4)$. The answer is a proof.

**Tool and why.** Hoeffding's inequality (cheat sheet §10): it bounds the probability that a sum of independent bounded variables deviates from its mean. A wrong commitment is exactly such a deviation of the difference of sums, so we apply it to that difference.

**Definitions.** Let $X_1,\dots,X_m$ be the rewards from the good arm and $Y_1,\dots,Y_m$ the rewards from the other arm during exploration; all are independent and in $[0,1]$. Define the difference of sums $S=\sum_iX_i-\sum_iY_i$, since the decision depends only on its sign. Let $\mathcal{E}$ be the event of a wrong commitment, and count ties in it, to be on the safe side.

**Solution.**

Step 1, translating the event: we commit wrongly only if $\hat\mu^\star\le\hat\mu_{\text{other}}$. Multiplying by $m$ does not change the sign, so $\mathcal{E}$ is contained in the event $\{S\le0\}$.

Step 2, the mean of $S$: by linearity of expectation, $\mathbb{E}[S]=m\mu^\star-m\mu_{\text{other}}$, i.e. $\mathbb{E}[S]=m\Delta$.

Step 3, phrasing it as a deviation: the event $\{S\le0\}$ is the event that $S$ falls below its mean by at least $m\Delta$.

$$\{S\le0\}=\{S-\mathbb{E}[S]\le-m\Delta\}$$

Step 4, Hoeffding: $S$ is a sum of $2m$ independent variables, each in an interval of length $1$; the $X_i$ lie in $[0,1]$ and the $-Y_i$ in $[-1,0]$. Hoeffding says that for every $t>0$:

$$\Pr\big(S-\mathbb{E}[S]\le-t\big)\le\exp\Big(-\frac{2t^2}{\sum_j(b_j-a_j)^2}\Big)$$

Here the sum in the denominator is $2m\cdot1^2$, i.e. $2m$. Plug in $t=m\Delta$:

$$\begin{aligned}
\Pr(\mathcal{E})&\le\exp\Big(-\frac{2m^2\Delta^2}{2m}\Big)\\
&=\exp(-m\Delta^2)\\
&\le\exp(-m\Delta^2/4)
\end{aligned}$$

The last step holds because $m\Delta^2\ge0$, so $-m\Delta^2\le-m\Delta^2/4$, and the exponential is increasing.

$$\boxed{\Pr(\mathcal{E})\le\exp(-m\Delta^2/4)}$$

**A note on the constant.** The sub-Gaussian route gives the same bound: each mean is $\tfrac12$-sub-Gaussian with variance proxy $\tfrac{1}{4m}$, the difference has proxy $\tfrac{1}{2m}$, and the tail is $\exp\big(-\Delta^2/(2\cdot\tfrac{1}{2m})\big)$, i.e. $\exp(-m\Delta^2)$. The bound $\exp(-m\Delta^2/4)$ in the question is weaker; it is exactly what one gets for 1-sub-Gaussian rewards, so it holds here too.

**In words.** The empirical difference concentrates around $\Delta$ with width of order $1/\sqrt m$. To err it must fall to $0$, i.e. deviate by $\Delta$, and the probability of that decays exponentially in $m\Delta^2$.

**Sanity check.** A simulation with Bernoulli arms, $\mu^\star=0.6$, $\mu_{\text{other}}=0.5$ and $m=200$: the wrong-commit rate, ties included, is about $0.025$, below $e^{-2}\approx0.135$ and below $e^{-0.5}\approx0.607$.

**What to write in the exam.**

- Define $S=\sum_iX_i-\sum_iY_i$, with mean $m\Delta$; an error implies $S\le0$.
- Hoeffding on $2m$ variables of range $1$:

$$\Pr(S\le0)\le\exp\Big(-\frac{2(m\Delta)^2}{2m}\Big)=e^{-m\Delta^2}$$

- Since $e^{-m\Delta^2}\le e^{-m\Delta^2/4}$, the requested bound holds.

*Verified: a simulation of $200{,}000$ runs for each of four triples $(\mu^\star,\mu_{\text{other}},m)$ gives an error rate below $e^{-m\Delta^2}$ in all of them.*

**(c) The total regret bound**

**What is asked.** Deduce the bound $\mathrm{Reg}(T)\le m\Delta+T\Delta\exp(-m\Delta^2/4)$ from the two previous parts. The answer is a short proof.

**Tool and why.** Decomposing the regret by phase and by the event $\mathcal{E}$ (cheat sheet §10). Exploration is deterministic and the commit phase depends on a single event, so the expectation splits into two simple terms.

**Definitions.** As usual in regret bounds, $\mathrm{Reg}(T)$ here is the expected regret. $\mathcal{E}$ is the wrong-commitment event from part (b).

**Solution.**

Step 1, exploration contributes exactly $m\Delta$, by part (a).

Step 2, the commit phase consists of $T-2m$ pulls of the same arm. If $\mathcal{E}$ did not happen, that is the good arm and the contribution is $0$. If $\mathcal{E}$ happened, each pull costs $\Delta$, $(T-2m)\Delta$ in total.

Step 3, expectation: add the two phases, then plug in part (b) and enlarge $T-2m$ to $T$.

$$\begin{aligned}
\mathrm{Reg}(T)&=m\Delta+(T-2m)\Delta\Pr(\mathcal{E})\\
&\le m\Delta+(T-2m)\Delta\,e^{-m\Delta^2/4}\\
&\le m\Delta+T\Delta\,e^{-m\Delta^2/4}
\end{aligned}$$

$$\boxed{\mathrm{Reg}(T)\le m\Delta+T\Delta\,e^{-m\Delta^2/4}}$$

**In words.** There are two sources of regret: a fixed price for exploration, plus a small risk of wasting the whole remainder on the wrong arm.

**Sanity check.** If $T=2m$ there is no commit phase and the regret is exactly $m\Delta$, as the first line gives. If $m$ grows very large, the second term vanishes and the first dominates.

**What to write in the exam.**

- Exploration: $m\Delta$, by part (a).
- Commit: $0$ if we were right, $(T-2m)\Delta$ if we were wrong.
- Expectation: $m\Delta+(T-2m)\Delta\Pr(\mathcal{E})$; plug in part (b) and enlarge to $T$.

*Verified: a simulation with $T=10^5$, $\Delta=0.1$ and $m=2209$ gives mean regret $220.9$, below the bound $260.86$.*

**(d) Choosing $m$**

**What is asked.** Find the $m$ that minimizes the bound of part (c), and show that the resulting regret is $O\big(\tfrac1\Delta\log(T\Delta^2)\big)$.

**Tool and why.** Balancing exploration against exploitation (cheat sheet §10): treat $m$ as continuous, differentiate and set to zero. The function is convex, so the critical point is the minimum.

**Definitions.** Let $f(m)$ be the bound of part (c):

$$f(m)=m\Delta+T\Delta\,e^{-m\Delta^2/4}$$

**Solution.**

Step 1, derivative: the derivative of $e^{-m\Delta^2/4}$ in $m$ is $-\tfrac{\Delta^2}{4}e^{-m\Delta^2/4}$.

$$f'(m)=\Delta-\frac{T\Delta^3}{4}\,e^{-m\Delta^2/4}$$

Step 2, convexity: $f''(m)=\tfrac{T\Delta^5}{16}e^{-m\Delta^2/4}$, which is positive, so a point where the derivative vanishes is a minimum.

Step 3, set to zero, assuming $T\Delta^2>4$:

$$\begin{aligned}
e^{-m\Delta^2/4}&=\frac{4}{T\Delta^2}\\
m^\star&=\frac{4}{\Delta^2}\log\Big(\frac{T\Delta^2}{4}\Big)
\end{aligned}$$

and for integers take $\lceil m^\star\rceil$.

Step 4, the bound at $m^\star$: the exploration term is $m^\star\Delta$, and the tail term is $T\Delta$ times $\tfrac{4}{T\Delta^2}$ from step 3, i.e. $\tfrac{4}{\Delta}$.

$$\begin{aligned}
f(m^\star)&=\frac{4}{\Delta}\log\Big(\frac{T\Delta^2}{4}\Big)+\frac{4}{\Delta}\\
&=\frac{4}{\Delta}\Big(1+\log\frac{T\Delta^2}{4}\Big)
\end{aligned}$$

Rounding up adds at most $\Delta$ to the exploration term and only shrinks the tail term, so the bound with $\lceil m^\star\rceil$ is at most $f(m^\star)+\Delta$.

Step 5, order of magnitude: when $T\Delta^2\ge4e$, the logarithm $\log\tfrac{T\Delta^2}{4}$ is at least $1$, so

$$1+\log\frac{T\Delta^2}{4}\le2\log\frac{T\Delta^2}{4}\le2\log(T\Delta^2)$$

and we get

$$\boxed{\mathrm{Reg}(T)=O\Big(\frac{1}{\Delta}\log(T\Delta^2)\Big)}$$

When $T\Delta^2\le4$ the derivative is positive for every $m$, so $m=0$ minimizes, and anyway $\mathrm{Reg}(T)\le T\Delta$, which is at most $4/\Delta$.

Step 6, numbers, for $T=10^5$ and $\Delta=0.1$: $T\Delta^2/4=250$ and $\log250\approx5.5215$, so $m^\star\approx400\cdot5.5215$, i.e. $m^\star\approx2208.6$, and in integers $m=2209$. The bound is $40\cdot6.5215\approx260.86$: exploration $220.86$ plus tail $40$.

**In words.** Explore exactly until the risk of error, times the whole horizon, drops to order $1/\Delta$. Beyond that every extra exploration pull costs more than it saves.

**Sanity check.** $m^\star$ is always below $T/2$, so there is room for a commit phase: with $x=T\Delta^2/4$ we have $m^\star=T\log x/x$, and $\log x/x$ never exceeds $1/e$. Also a numeric minimization of $f$ over all integers gives $m=2209$, exactly the rounding of $m^\star$.

**What to write in the exam.**

- Derivative: $f'(m)=\Delta-\tfrac{T\Delta^3}{4}e^{-m\Delta^2/4}$, and the function is convex.
- Setting it to zero: $m^\star=\tfrac{4}{\Delta^2}\log\tfrac{T\Delta^2}{4}$.
- Substituting: the tail term equals $4/\Delta$, so $f(m^\star)=\tfrac4\Delta\big(1+\log\tfrac{T\Delta^2}{4}\big)$.
- Conclusion: the regret is $O\big(\tfrac1\Delta\log(T\Delta^2)\big)$.

*Verified: minimizing over every integer $m$ up to $50{,}000$ for $T=10^5$ and $\Delta=0.1$ gives $m=2209$ and bound $260.86$; the formulas for $m^\star$ and $f(m^\star)$ were checked on 1000 random pairs $(T,\Delta)$.*

**Common mistakes.**

- Computing the variance proxy $\tfrac{1}{2m}$ correctly and then plugging it into the tail with a spurious factor $2$: the expression $\exp\big(-\Delta^2/(2\cdot\tfrac{1}{2m}\cdot2)\big)$ equals $e^{-m\Delta^2/2}$, not $e^{-m\Delta^2/4}$, and the correct tail is $e^{-m\Delta^2}$.
- Multiplying the error probability by a constant instead of by the horizon $T-2m$, which gives a bound independent of $T$.
- Forgetting the tail term $4/\Delta$ in the value at the minimum, or claiming the bound is only $m^\star\Delta$.

**💡 Trick.** Balance the two regret terms: set the exponential tail to $e^{-m\Delta^2/4}=4/(T\Delta^2)$, giving $m=(4/\Delta^2)\ln(T\Delta^2/4)$.

**⚠️ Watch out.** The commit-phase regret is (prob wrong)$\times T\times\Delta$ — multiply by the whole remaining horizon, not a constant.
