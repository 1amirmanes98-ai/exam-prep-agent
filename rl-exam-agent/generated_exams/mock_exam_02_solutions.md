# Mock Exam 2 — Solutions

Every numeric answer was verified with python3: exact fractions for the fixed point of Q1 (every candidate acceptance set, plus value iteration and a contraction test), the Q-learning updates of Q2 in exact fractions over several passes, finite differences and a Monte-Carlo mean of the score for Q3, and for Q4 the exact bound values at neighbouring $\ell$, a Monte-Carlo check of Hoeffding, a randomized test of the $\varepsilon/2$ argument and a simulation of the algorithm.

## Q1 — Sequential job offers

**Hint:** The only thing that matters is the current offer. Compare "accept" ($s/(1-\gamma)$)
against "reject" ($\gamma W$, where $W$ is the pre-offer value). Since accept grows in $s$ and
reject doesn't, optimality is a threshold. Solve the fixed point $W=\mathbb{E}_s[\max(s/(1-\gamma),\gamma W)]$.

**Full solution:**

**(a) MDP model and the fixed-point equation for $W$**

**What is asked.** Translate the story into an MDP: the state, the two actions, the Bellman optimality equation, and the scalar equation that $W$ satisfies. The answer is a model and an equation, not a number.

**Tool and why.** Modelling a story as an MDP (cheat sheet §12): the state is exactly what we must know at the moment of the decision. Then the Bellman optimality equation (cheat sheet §2) in its optimal-stopping form, stop value against continuation value (cheat sheet §4).

**Definitions.** Let $s$ be the offer on the table in the current period. Add an absorbing state $\text{employed}$, entered after accepting, with no further decisions. Let $W$ be the value of entering a period before its offer is revealed. We introduce $W$ because the value of rejecting does not depend on the offer being rejected, so one number describes it.

**Solution.**

Step 1, state: the current offer $s\in\{10,20,30,40\}$. Earlier offers do not matter, because offers are independent and a rejected offer cannot be recalled. So $s$ is all the decision needs.

Step 2, actions: $\text{accept}$ or $\text{reject}$.

Step 3, the accept value: accepting pays $s$ now and in every later period, a geometric series:

$$s+\gamma s+\gamma^2 s+\dots=\frac{s}{1-\gamma}.$$

After that the process sits in $\text{employed}$ and nothing else happens.

Step 4, the reject value: rejecting pays $0$ now, and the next period starts before its new offer is seen, which is worth $W$ by definition. Discounting one period:

$$\text{reject}=0+\gamma\,\mathbb{E}_{s'}\big[V^*(s')\big]=\gamma W.$$

Step 5, Bellman optimality: take the better of the two actions.

$$V^*(s)=\max\Big\{\frac{s}{1-\gamma},\ \gamma W\Big\}.$$

Step 6, the equation for $W$: by definition $W$ is the average of $V^*$ over the uniform next offer, $W=\tfrac14\sum_{s'}V^*(s')$. Substituting Step 5:

$$W=\tfrac14\sum_{s\in\{10,20,30,40\}}\max\Big(\frac{s}{1-\gamma},\ \gamma W\Big).$$

**In words.** Because offers are fresh each period, rejecting always leads to the same situation, whatever was rejected. The whole problem therefore reduces to one unknown number $W$.

**Sanity check.** Accepting every offer is one feasible policy, worth $\tfrac14\sum_s 10s$ on average, which is $250$. So the right-hand side is at least $250$, and $W$ must be at least $250$. The solution in (c) satisfies this.

**What to write in the exam.**

- State: the current offer $s$; actions accept and reject; accepting moves to an absorbing state.
- Accept value $s/(1-\gamma)$; reject value $\gamma W$, where $W$ is the mean of $V^*$ over the next offer.
- Bellman: $V^*(s)=\max\{s/(1-\gamma),\gamma W\}$.
- Fixed point:

$$W=\tfrac14\sum_{s}\max\Big(\frac{s}{1-\gamma},\ \gamma W\Big).$$

*Verified: the fixed-point map was coded in Python and iterated from $W=0$; it converges to the value found in (c).*

**(b) Threshold structure**

**What is asked.** Prove that the set of offers where accepting is optimal has the form $\{s:s\ge s^*\}$, and explain why through monotonicity. The answer is a short proof.

**Tool and why.** Threshold structure in optimal stopping (cheat sheet §4): if "stop value minus continue value" is increasing in the state, the stopping region is an upper set. Here this difference is easy to write explicitly.

**Definitions.** Let $D(s)$ be the advantage of accepting over rejecting:

$$D(s)=\frac{s}{1-\gamma}-\gamma W.$$

Accepting is optimal exactly when $D(s)\ge0$, which is why we introduce it. Let $s^*$ be the point where $D$ vanishes.

**Solution.**

**Claim.** There is a number $s^*$ such that accepting is optimal if and only if $s\ge s^*$.

Step 1, the reject value does not depend on $s$: $\gamma W$ is an average over the next offer, which is independent of the current one.

Step 2, $D$ is strictly increasing: for two offers $s_1<s_2$,

$$D(s_2)-D(s_1)=\frac{s_2-s_1}{1-\gamma}>0,$$

because $1-\gamma>0$ and the $\gamma W$ terms cancel.

Step 3, the accept set is an upper set: if accepting is optimal at $s_1$ and $s_2>s_1$, then by Step 2

$$D(s_2)>D(s_1)\ge0,$$

so accepting is optimal at $s_2$ too.

Step 4, the threshold: solving $D(s^*)=0$ gives

$$s^*=(1-\gamma)\gamma W,$$

and the rule is: accept if and only if $s\ge s^*$. At equality both actions are optimal; we accept.

**In words.** A better offer makes accepting more attractive and leaves rejecting unchanged. So once an offer is good enough, every better offer is good enough as well.

**Sanity check.** The top offer is always accepted. Each $V^*(s)$ is at most $\max\{400,\gamma W\}$, so $W$ is at most $400$, hence $\gamma W$ is at most $360$, which is below the accept value $400$. So the accept set is never empty.

**What to write in the exam.**

- The reject value $\gamma W$ is the same for every $s$, since offers are independent.
- The accept value $s/(1-\gamma)$ is strictly increasing in $s$.
- Hence $D(s)$ is increasing and the accept set is $\{s\ge s^*\}$, with $s^*=(1-\gamma)\gamma W$.

*Verified: for 1000 random values of $W$ between $0$ and $400$, Python checked that the set where $D(s)\ge0$ is an upper set of the four offers.*

**(c) Solving for $W$ and the acceptance set**

**What is asked.** The number $W$ and the list of accepted offers.

**Tool and why.** Guess-and-verify on the threshold (cheat sheet §4): by (b) the accept set is one of four upper sets, and for a fixed set the equation for $W$ is linear. Uniqueness comes from the contraction property of the Bellman map (cheat sheet §6).

**Definitions.** Let $T(W)$ denote the right-hand side of the fixed-point equation from (a), so we are looking for $T(W)=W$.

**Solution.**

Step 1, accept values: $1/(1-\gamma)=10$, so accepting $10,20,30,40$ is worth $100,200,300,400$.

Step 2, guess the accept set $\{30,40\}$: offers $10$ and $20$ contribute $\gamma W$ each, and $30$ and $40$ contribute $300$ and $400$:

$$\begin{aligned}
W&=\tfrac14\big(\gamma W+\gamma W+300+400\big)\\
&=\tfrac14\,(1.8W+700).
\end{aligned}$$

Step 3, solve the linear equation: multiply by $4$ and collect $W$.

$$\begin{aligned}
4W&=1.8W+700\\
2.2W&=700\\
W&=\tfrac{3500}{11}\approx318.18.
\end{aligned}$$

Step 4, check the guess: the reject value is

$$\gamma W=\tfrac{9}{10}\cdot\tfrac{3500}{11}=\tfrac{3150}{11}\approx286.36,$$

and it lies between the accept values of $20$ and $30$:

$$200<286.36<300.$$

So rejecting $10$ and $20$ and accepting $30$ and $40$ is indeed optimal at this $W$; the guess is consistent.

Step 5, the other upper sets fail the same check (each $W$ is solved exactly as in Steps 2 and 3):

| accept set | $W$ | $\gamma W$ | consistent? |
|---|---|---|---|
| $\{40\}$ | $\tfrac{4000}{13}\approx307.69$ | $276.92$ | no: $300>276.92$ |
| $\{30,40\}$ | $\tfrac{3500}{11}\approx318.18$ | $286.36$ | yes |
| $\{20,30,40\}$ | $\tfrac{9000}{31}\approx290.32$ | $261.29$ | no: $200<261.29$ |
| all four | $250$ | $225$ | no: $100<225$ |

For $\{40\}$, the offer $30$ would beat waiting; for the larger sets, the offer $20$ (or $10$) would lose to waiting.

Step 6, uniqueness: for any number $c$, the map $W\mapsto\max(c,\gamma W)$ changes by at most $\gamma$ times the change in $W$:

$$\big|\max(c,\gamma W_1)-\max(c,\gamma W_2)\big|\le\gamma\,|W_1-W_2|.$$

Averaging over $s$ keeps this, so $T$ is a $\gamma$-contraction and has exactly one fixed point. The value found is therefore the answer.

Step 7, the threshold:

$$\begin{aligned}
s^*&=(1-\gamma)\gamma W\\
&=0.1\cdot\tfrac{3150}{11}\\
&=\tfrac{315}{11}\approx28.64.
\end{aligned}$$

$$\boxed{W^*=\tfrac{3500}{11}\approx318.18}$$

She **accepts $s\in\{30,40\}$** and rejects $\{10,20\}$.

**In words.** Waiting is worth about $286$: that beats locking in a salary of $20$ (worth $200$) but not a salary of $30$ (worth $300$).

**Sanity check.** $W$ lies between $250$ (accept everything, from (a)) and $400$ (from (b)). Value iteration from $W=0$ also converges to $318.18$.

**What to write in the exam.**

- Accept values $100,200,300,400$; guess the accept set $\{30,40\}$.
- Equation $W=\tfrac14(1.8W+700)$, whose solution is $\tfrac{3500}{11}\approx318.18$.
- Check: $\gamma W\approx286.36$ lies between $200$ and $300$, so the guess is consistent.
- Threshold $s^*\approx28.64$: accept $30$ and $40$, reject $10$ and $20$.

*Verified: exact fractions in Python for all four candidate accept sets, value iteration for 500 steps, and a randomized check that the Lipschitz ratio of $T$ is at most $0.9$.*

**(d) $V^*$ at every offer**

**What is asked.** Four numbers, $V^*(s)$ for $s\in\{10,20,30,40\}$.

**Tool and why.** The Bellman equation from (a) (cheat sheet §2), with $W$ from (c): every value is the larger of the two action values.

**Definitions.** No new notation.

**Solution.**

Step 1, rejected offers: for $s=10$ and $s=20$ the maximum is the reject value, $\gamma W\approx286.36$.

Step 2, accepted offers: for $s=30$ and $s=40$ the maximum is the accept value $10s$.

| $s$ | action | $V^*(s)$ |
|---|---|---|
| $10$ | reject | $\tfrac{3150}{11}\approx286.36$ |
| $20$ | reject | $\tfrac{3150}{11}\approx286.36$ |
| $30$ | accept | $300$ |
| $40$ | accept | $400$ |

Step 3, consistency: the average of the four values must equal $W$.

$$\begin{aligned}
\tfrac14\Big(2\cdot\tfrac{3150}{11}+700\Big)&=\tfrac14\cdot\tfrac{6300+7700}{11}\\
&=\tfrac{3500}{11}=W.
\end{aligned}$$

**In words.** Below the threshold the value is flat, because she waits and the waiting value does not depend on the rejected offer. Above it the value grows linearly with the salary.

**Sanity check.** Every $V^*(s)$ is at least its accept value (for example $286.36$ is above $100$), and $V^*$ is nondecreasing in $s$, as it must be.

**What to write in the exam.**

- Rejected offers: $V^*(10)$ and $V^*(20)$ both equal $\gamma W\approx286.36$.
- Accepted offers: $V^*(30)=300$ and $V^*(40)=400$.

*Verified: exact fractions in Python; the mean of the four values equals $\tfrac{3500}{11}$ exactly.*

**Common mistakes.**

- Writing the reject value as $\gamma V^*(s)$, as if the same offer returned next period. The next offer is a fresh draw, so the reject value is $\gamma W$.
- Guessing an accept set and not checking it: for example $\{20,30,40\}$ gives $\gamma W\approx261.29$, which beats the offer $20$, so that guess contradicts itself.
- Using $s$ instead of $s/(1-\gamma)$ as the accept value, which gives a completely different threshold.

**💡 Trick.** Collapse everything to one scalar $W$ (the pre-offer value); the optimal rule is just the threshold $s\ge(1-\gamma)\gamma W$.

**⚠️ Watch out.** The accept value is $s/(1-\gamma)$ (salary forever), not $s$ — a one-period reward gives the wrong threshold.

## Q2 — Q-learning by hand

**Hint:** Apply the update transition-by-transition. Because every $Q$ starts at $0$, each
$\max_{a'}Q(s',\cdot)$ term is $0$ on the first pass, so only the immediate reward drives the update.

**Full solution:**

**(a) The three updates of the first pass**

**What is asked.** Apply the Q-learning update to the three transitions in order, show each one, and give the resulting table of all six entries.

**Tool and why.** Q-learning (cheat sheet §7): an off-policy TD update that bootstraps from the maximum over next actions. Each observed transition triggers one update of one entry, using the table as it is at that moment, so the order matters.

**Definitions.** For a transition $(s,a,r,s')$ let the TD target be $y=r+\gamma\max_{a'}Q(s',a')$. We introduce $y$ because the update moves $Q(s,a)$ a fraction $\alpha$ of the way to $y$. For a terminal next state the maximum is taken as $0$, since no reward follows.

**Solution.**

Step 1, transition $(A,x,5,B)$: all of $Q(B,\cdot)$ is still $0$, so

$$y=5+0.9\cdot0=5,$$

$$Q(A,x)=0+0.5\,(5-0)=2.5.$$

Step 2, transition $(B,y,0,C)$: all of $Q(C,\cdot)$ is still $0$, because $C$ is updated only in the next step, so

$$y=0+0.9\cdot0=0,$$

$$Q(B,y)=0+0.5\,(0-0)=0.$$

Step 3, transition $(C,x,10)$ into the terminal state: no reward follows, so the maximum is $0$:

$$y=10+0.9\cdot0=10,$$

$$Q(C,x)=0+0.5\,(10-0)=5.$$

The table after the first pass:

| state | $Q(\cdot,x)$ | $Q(\cdot,y)$ |
|---|---|---|
| $A$ | $2.5$ | $0$ |
| $B$ | $0$ | $0$ |
| $C$ | $5$ | $0$ |

**In words.** With everything starting at $0$, the bootstrap terms vanish on the first pass, and each visited entry moves halfway to its immediate reward.

**Sanity check.** With $\alpha=0.5$ each updated entry is exactly half its target: $2.5$ is half of $5$ and $5$ is half of $10$.

**What to write in the exam.**

- Update rule with target $y=r+\gamma\max_{a'}Q(s',a')$, terminal maximum $0$.
- Updates in order: $Q(A,x)=2.5$, then $Q(B,y)=0$, then $Q(C,x)=5$.
- All other entries stay $0$.

*Verified: the updates were replayed in Python with exact fractions.*

**(b) Zero entries and a second pass**

**What is asked.** Which entries are still $0$ and why, and what a second identical pass changes. The answer is a short explanation and three new numbers.

**Tool and why.** The same Q-learning update (cheat sheet §7). The key fact is that a reward travels backward one transition per pass when the transitions are processed in forward order.

**Definitions.** No new notation.

**Solution.**

Step 1, entries never visited: $Q(A,y)$, $Q(B,x)$ and $Q(C,y)$ stay $0$, because Q-learning only updates the pair that was actually taken.

Step 2, the visited entry that stays $0$: $Q(B,y)$ was updated, but its reward is $0$ and its bootstrap $\max_{a'}Q(C,a')$ was still $0$ at that moment, because $C$ is updated after $B$ in the pass. So its target was $0$.

Step 3, second pass, transition $(A,x)$: it comes first, so $Q(B,y)$ is still $0$ when it is used.

$$y=5+0.9\cdot0=5,$$

$$Q(A,x)=2.5+0.5\,(5-2.5)=3.75.$$

Step 4, second pass, transition $(B,y)$: now $\max_{a'}Q(C,a')$ is $5$, from the first pass.

$$y=0+0.9\cdot5=4.5,$$

$$Q(B,y)=0+0.5\,(4.5-0)=2.25.$$

Step 5, second pass, transition $(C,x)$:

$$y=10+0.9\cdot0=10,$$

$$Q(C,x)=5+0.5\,(10-5)=7.5.$$

| entry | after pass 1 | after pass 2 |
|---|---|---|
| $Q(A,x)$ | $2.5$ | $3.75$ |
| $Q(B,y)$ | $0$ | $2.25$ |
| $Q(C,x)$ | $5$ | $7.5$ |

Step 6, what changed: $Q(B,y)$ becomes positive, because the reward $10$ at $C$ has moved one step back. $Q(A,x)$ grows only toward its own reward $5$; the value of $B$ reaches $A$ only on a third pass, whose first update would use the target $5+0.9\cdot2.25=7.025$.

**In words.** Information flows backward one step per pass. Processing the transitions in reverse order would have carried the final reward all the way back in a single pass.

**Sanity check.** Repeating the pass forever drives the entries to the fixed point of this deterministic chain: $Q(C,x)$ tends to $10$, $Q(B,y)$ to $0.9\cdot10$, which is $9$, and $Q(A,x)$ to $5+0.9\cdot9$, which is $13.1$. The values after pass 2 move toward these limits.

**What to write in the exam.**

- Unvisited pairs stay $0$; $Q(B,y)$ stays $0$ because its reward and its bootstrap were both $0$.
- Pass 2 in order: $Q(A,x)=3.75$, using $Q(B,y)=0$ at that moment.
- Then $Q(B,y)=0.5\cdot4.5$, which is $2.25$, and $Q(C,x)=7.5$.
- The reward propagates one step back per pass.

*Verified: 60 passes replayed in Python with exact fractions; passes 2 and 3 give the values above, and the entries converge to $13.1$, $9$ and $10$.*

**Common mistakes.**

- In the second pass, updating $Q(A,x)$ with the new value $Q(B,y)=2.25$. That value does not exist yet when $(A,x)$ is processed; the correct result is $3.75$.
- Giving the terminal state a nonzero bootstrap value, which inflates $Q(C,x)$.
- Forgetting $\alpha$ and setting $Q(s,a)$ equal to the target, for example $Q(A,x)=5$.

**💡 Trick.** Process the transitions in order, and remember a terminal next-state contributes $\max_{a'}Q=0$.

**⚠️ Watch out.** $Q(B,y)$ staying $0$ on pass one is correct, not a slip — both its reward and its bootstrap were $0$.

## Q3 — Gaussian policy gradient

**Hint:** $\log\pi=-\tfrac{(a-\mu)^2}{2\sigma^2}+\text{const}$ with $\mu=\theta^\top\phi$;
differentiate w.r.t. $\theta$ via the chain rule ($\partial\mu/\partial\theta=\phi$).

**Full solution:**

**(a) The score of a Gaussian policy**

**What is asked.** A formula for the gradient of $\log\pi(a\mid s;\theta)$ with respect to $\theta$.

**Tool and why.** The score function used by policy gradient and REINFORCE (cheat sheet §9). The log of a Gaussian density is quadratic in the mean, and the mean is linear in $\theta$, so the chain rule gives the score in two short steps.

**Definitions.** Write $\mu$ for $\mu_\theta(s)$, which equals $\theta^\top\phi(s)$, to keep formulas short. The score is the vector $\nabla_\theta\log\pi(a\mid s;\theta)$.

**Solution.**

Step 1, the log-density: from the Gaussian density with mean $\mu$ and variance $\sigma^2$,

$$\log\pi(a\mid s;\theta)=-\tfrac12\log(2\pi\sigma^2)-\frac{(a-\mu)^2}{2\sigma^2}.$$

Step 2, only the second term depends on $\theta$, since $\sigma$ is fixed. So the first term has zero gradient.

Step 3, derivative with respect to the mean: by the chain rule on the square,

$$\frac{\partial}{\partial\mu}\Big(-\frac{(a-\mu)^2}{2\sigma^2}\Big)=\frac{a-\mu}{\sigma^2}.$$

Step 4, derivative of the mean with respect to $\theta$: $\mu$ is linear in $\theta$, so $\nabla_\theta\mu=\phi(s)$.

Step 5, combine by the chain rule:

$$\boxed{\nabla_\theta\log\pi(a\mid s;\theta)=\frac{a-\mu_\theta(s)}{\sigma^2}\,\phi(s)}$$

**In words.** The score points in the direction that moves the mean toward the sampled action, with strength proportional to the action error $a-\mu$.

**Sanity check.** Under the policy, $a-\mu$ has mean $0$, so the score has mean $0$, as every score function must.

**What to write in the exam.**

- Log-density: $\log\pi=-\frac{(a-\mu)^2}{2\sigma^2}+\text{const}$.
- Chain rule: the derivative in $\mu$ is $(a-\mu)/\sigma^2$, and $\nabla_\theta\mu=\phi$.
- Result: $\nabla_\theta\log\pi=\frac{a-\mu}{\sigma^2}\phi(s)$.

*Verified: central finite differences in Python at random $\theta$, $\phi$ and $a$ agree with the formula to $10^{-10}$; a Monte-Carlo mean of the score over a million actions is about $0$.*

**(b) Evaluating the score at $a=1$**

**What is asked.** The number $\mu_\theta(s)$ and the score vector at $a=1$.

**Tool and why.** Substitution into the formula from (a) (cheat sheet §9).

**Definitions.** No new notation.

**Solution.**

Step 1, the mean: an inner product.

$$\begin{aligned}
\mu_\theta(s)&=0.5\cdot1+(-0.5)\cdot2\\
&=0.5-1=-0.5.
\end{aligned}$$

Step 2, the action error, with $\sigma^2=1$:

$$a-\mu=1-(-0.5)=1.5.$$

Step 3, the score: multiply the feature vector by $1.5$.

$$\nabla_\theta\log\pi=1.5\cdot(1,2)=\mathbf{(1.5,\,3.0)}.$$

**In words.** The sampled action lies above the mean, so the score raises both parameters, the second more because its feature is larger.

**Sanity check.** Both components are positive, as they must be when $a>\mu$ and both features are positive.

**What to write in the exam.**

- Mean: $0.5\cdot1-0.5\cdot2$, which is $-0.5$.
- Error: $a-\mu=1.5$.
- Score: $1.5\cdot(1,2)=(1.5,3.0)$.

*Verified: finite differences of the log-density in Python at this $\theta$ give $(1.5,3.0)$.*

**(c) One REINFORCE step**

**What is asked.** The new $\theta$ after one update with $G=2$ and $\eta=0.1$.

**Tool and why.** The REINFORCE update (cheat sheet §9): step along the score, scaled by the return.

**Definitions.** No new notation.

**Solution.**

Step 1, the scale: $\eta G$ is $0.1\cdot2$, which is $0.2$.

Step 2, the step: $0.2\cdot(1.5,3.0)=(0.3,0.6)$.

Step 3, the update:

$$\theta\leftarrow(0.5,-0.5)+(0.3,0.6)=\mathbf{(0.8,\,0.1)}.$$

**In words.** A positive return reinforces the sampled action: the mean moves toward $a=1$.

**Sanity check.** The new mean is $0.8\cdot1+0.1\cdot2=1.0$, exactly the sampled action, and $\log\pi(a\mid s)$ rises from about $-2.04$ to about $-0.92$.

**What to write in the exam.**

- Update along $\eta G\,\nabla_\theta\log\pi$ with $\eta G=0.2$.
- Step $0.2\cdot(1.5,3.0)=(0.3,0.6)$.
- New $\theta=(0.8,0.1)$.

*Verified: the step, the new mean and both log-densities were computed in Python with numpy.*

**Common mistakes.**

- Dropping the factor $\phi(s)$ from the chain rule and writing the score as the scalar $(a-\mu)/\sigma^2$.
- A sign error, $(\mu-a)$ instead of $(a-\mu)$, which pushes the mean away from a rewarded action.
- Forgetting $G$ or $\eta$ in the update, which gives $(0.65,-0.2)$ or $(3.5,5.5)$ instead of $(0.8,0.1)$.

**💡 Trick.** For a Gaussian policy the score is $\frac{a-\mu}{\sigma^2}\phi$ — linear in the action error.

**⚠️ Watch out.** $\mu=\theta^\top\phi$, so $\partial\mu/\partial\theta=\phi$; don't drop the chain-rule $\phi$ factor.

## Q4 — PAC best-arm identification

**Hint:** Hoeffding for an average of $\ell$ samples in $[0,1]$:
$\Pr[|\hat\mu-\mu|>\varepsilon/2]\le 2e^{-\ell\varepsilon^2/2}$. Union-bound over $n$ arms and set
$\le\delta$, then solve for $\ell$.

**Full solution:**

**(a) Hoeffding for one arm**

**What is asked.** An upper bound, as a formula in $\ell$ and $\varepsilon$, on the probability that one arm's empirical mean misses its true mean by more than $\varepsilon/2$.

**Tool and why.** Hoeffding's inequality (cheat sheet §10): the rewards are independent and bounded in $[0,1]$, which is exactly its setting.

**Definitions.** For arm $i$ let $\mu_i$ be its true mean and $\hat\mu_i$ the average of its $\ell$ observed rewards.

**Solution.**

Step 1, Hoeffding for an average of $\ell$ independent values in $[0,1]$, at deviation $t$:

$$\Pr\big(|\hat\mu_i-\mu_i|>t\big)\le2e^{-2\ell t^2}.$$

Step 2, substitute $t=\varepsilon/2$, so that $t^2$ is $\varepsilon^2/4$:

$$\begin{aligned}
\Pr\big(|\hat\mu_i-\mu_i|>\tfrac{\varepsilon}{2}\big)&\le2e^{-2\ell\varepsilon^2/4}\\
&=2e^{-\ell\varepsilon^2/2}.
\end{aligned}$$

With $\varepsilon=0.1$ this is $2e^{-\ell/200}$.

**In words.** The chance of a large error decays exponentially in the number of pulls, and the rate is set by the square of the tolerance.

**Sanity check.** For a fair coin with $\ell=1199$, a simulation gives a deviation above $0.05$ in about $0.0005$ of the runs, below the bound $0.0050$, as it must be.

**What to write in the exam.**

- Hoeffding for rewards in $[0,1]$: bound $2e^{-2\ell t^2}$.
- At $t=\varepsilon/2$: $2e^{-\ell\varepsilon^2/2}$.

*Verified: two million Monte-Carlo runs in Python of a fair-coin arm with $\ell=1199$.*

**(b) Union bound and the smallest $\ell$**

**What is asked.** Choose $\ell$ so the algorithm is $(\varepsilon,\delta)$-PAC, as a formula and then as the smallest integer.

**Tool and why.** PAC analysis of a bandit (cheat sheet §10): first show that "every arm accurate to $\varepsilon/2$" forces an $\varepsilon$-good output, then bound the chance that some arm is inaccurate with a union bound.

**Definitions.** Let $E$ be the good event that every arm satisfies $|\hat\mu_i-\mu_i|\le\varepsilon/2$. Let $i^*$ be a best arm and $\hat\imath$ the arm the algorithm outputs. $E$ is introduced because on it the output is guaranteed to be good, so the failure probability is at most the probability of missing $E$.

**Solution.**

**Claim.** On $E$, the output satisfies $\mu_{i^*}-\mu_{\hat\imath}\le\varepsilon$.

Step 1, proof of the claim: chain three inequalities.

$$\begin{aligned}
\mu_{\hat\imath}&\ge\hat\mu_{\hat\imath}-\tfrac{\varepsilon}{2}\\
&\ge\hat\mu_{i^*}-\tfrac{\varepsilon}{2}\\
&\ge\mu_{i^*}-\varepsilon.
\end{aligned}$$

The first and third rows hold by $E$. The second holds because $\hat\imath$ has the highest empirical mean.

Step 2, union bound over the $n$ arms, each bounded by (a):

$$\Pr(E^c)\le\sum_{i=1}^{n}\Pr\big(|\hat\mu_i-\mu_i|>\tfrac{\varepsilon}{2}\big)\le2n\,e^{-\ell\varepsilon^2/2}.$$

Step 3, require this to be at most $\delta$ and solve for $\ell$: take logarithms and multiply by $2/\varepsilon^2$.

$$\begin{aligned}
2n\,e^{-\ell\varepsilon^2/2}&\le\delta\\
\tfrac{\ell\varepsilon^2}{2}&\ge\ln\tfrac{2n}{\delta}\\
\ell&\ge\frac{2}{\varepsilon^2}\ln\frac{2n}{\delta}.
\end{aligned}$$

Step 4, numbers: $2/\varepsilon^2=200$, $2n/\delta=400$, and $\ln400\approx5.9915$, so

$$\frac{2}{\varepsilon^2}\ln\frac{2n}{\delta}=200\cdot5.9915\approx1198.29.$$

$$\boxed{\ell=\Big\lceil\frac{2}{\varepsilon^2}\ln\frac{2n}{\delta}\Big\rceil=1199}$$

Step 5, why accuracy $\varepsilon$ per arm is not enough: with tolerance $\varepsilon$ the two errors in Step 1 add up to $2\varepsilon$. For example, arms with means $0.5$ and $0.31$ may have estimates $0.4$ and $0.41$, each within $0.1$ of the truth, and then the algorithm outputs an arm that is $0.19$ worse than the best. So the smaller value $\ell=300$ only certifies a $2\varepsilon$-optimal output.

**In words.** If all estimates are accurate to half the tolerance, no bad arm can overtake the best one by enough to matter. The union bound pays a factor $n$ inside the logarithm for asking this of all arms at once.

**Sanity check.** At $\ell=1198$ the bound is $20e^{-5.99}\approx0.0501$, just above $\delta$, so $1199$ is indeed the smallest integer that works.

**What to write in the exam.**

- On the event that all arms are $\varepsilon/2$-accurate, the chain in Step 1 gives an $\varepsilon$-optimal output.
- Union bound: failure probability at most $2n\,e^{-\ell\varepsilon^2/2}$.
- Solve: $\ell\ge\frac{2}{\varepsilon^2}\ln\frac{2n}{\delta}$, which is $200\ln400\approx1198.29$, so $\ell=1199$.

*Verified: Python evaluated the bound at $\ell=1198$ and $\ell=1199$, tested the chain of Step 1 on 100000 random instances with deviations up to $\varepsilon/2$ (no violations), and recomputed the $2\varepsilon$ example.*

**(c) Total sample complexity**

**What is asked.** The total number of pulls and its order in $n$, $\varepsilon$ and $\delta$.

**Tool and why.** Counting pulls: every arm is pulled $\ell$ times (cheat sheet §10).

**Definitions.** No new notation.

**Solution.**

Step 1, total pulls: $n\ell$ is $10\cdot1199$, which is $11990$.

Step 2, order: substituting the formula for $\ell$, and using $\ln\tfrac{2n}{\delta}=\ln2+\ln\tfrac{n}{\delta}$,

$$n\ell\approx\frac{2n}{\varepsilon^2}\ln\frac{2n}{\delta}=O\Big(\frac{n}{\varepsilon^2}\log\frac{n}{\delta}\Big).$$

**In words.** The cost is linear in the number of arms, quadratic in the precision, and only logarithmic in the confidence.

**Sanity check.** Halving $\varepsilon$ multiplies $\ell$ by $4$; halving $\delta$ adds only $200\ln2\approx139$ pulls per arm.

**What to write in the exam.**

- Total: $n\ell=11990$ pulls.
- Order: $O\big(\frac{n}{\varepsilon^2}\log\frac{n}{\delta}\big)$.

*Verified: computed in Python.*

**(d) Checking the bound at $\ell=1199$**

**What is asked.** Substitute $\ell=1199$ into the union bound and confirm it is at most $\delta$.

**Tool and why.** Direct substitution into the bound from (b) (cheat sheet §10).

**Definitions.** No new notation.

**Solution.**

Step 1, the exponent: $\ell\varepsilon^2/2$ is $1199\cdot0.01/2$, which is $5.995$.

Step 2, the bound:

$$\begin{aligned}
2n\,e^{-\ell\varepsilon^2/2}&=20\,e^{-5.995}\\
&\approx20\cdot0.0024912\\
&\approx0.0498\le0.05.
\end{aligned}$$

So the failure probability is at most $\delta$. ✓ The total is $11990$ pulls.

**In words.** The bound lands just under $\delta$, which is what choosing the smallest valid $\ell$ means.

**Sanity check.** A simulation of the algorithm with nine arms just over $\varepsilon$ worse than the best (means $0.5$ and $0.399$) fails in about $5\cdot10^{-6}$ of the runs, far below $\delta$; the union bound is conservative.

**What to write in the exam.**

- Exponent: $1199\cdot0.01/2=5.995$.
- Bound: $20e^{-5.995}\approx0.0498$, which is at most $0.05$.

*Verified: the bound in Python, and 200000 simulated runs of the algorithm with $\ell=1199$.*

**Common mistakes.**

- Asking each arm to be accurate to $\varepsilon$ instead of $\varepsilon/2$. The errors of the best arm and of the output add up, so this only gives a $2\varepsilon$ guarantee.
- Applying the bound to one arm only, which gives $\ln(2/\delta)$ instead of $\ln(2n/\delta)$.
- Rounding $\ell$ down: $\ell=1198$ gives a bound of about $0.0501$, above $\delta$.

**💡 Trick.** Hoeffding + union bound: $\ell=\frac{2}{\varepsilon^2}\ln\frac{2n}{\delta}$ makes every arm's estimate $\varepsilon/2$-accurate w.p. $1-\delta$, so the empirical best is $\varepsilon$-optimal.

**⚠️ Watch out.** The union bound is over all $n$ arms — the $\ln(n/\delta)$, not $\ln(1/\delta)$, is what earns the points.
