# Mock Exam 7 — Solutions

Every numeric answer was verified with a python3 computation: exact-fraction recursions and a
grid DP plus $2\cdot10^6$-run Monte-Carlo of the threshold policies (Q1); the union-bound sum, the
fixed-point iteration for $r_i$ and a 2000-run simulation of the algorithm (Q2, zero
misclassifications); finite-difference gradients and exact $J$ values (Q3); value iteration of
$T_R$, $T_1$, $T_2$, exact $2\times2$ solves, and random contraction / $v_R\le\min_iV^*_i$ tests on
500 random MDPs (Q4).

## Q1 — Keep the best of n uniform offers

**Hint:** What do you need to know at the moment of decision — does the value of the offers you
already threw away affect anything in the future? Compare "take $x$ now" with "the value of
continuing", which does not depend on $x$. For the recursion, compute $\mathbb{E}\max(X,b)$ for
$X\sim U[0,1]$ by splitting at $b$.

**Full solution:**

**(a) Modelling as a finite-horizon MDP**

**What is asked.** Translate the selling story into the parts of an MDP: states (including a terminal state), actions, rewards, transitions and horizon, and explain why the state holds the current offer and the number of offers left but not the rejected offers. The answer is a definition plus a short argument.

**Tool and why.** Modelling a story as an MDP (cheat sheet §12): the state is whatever you must know at the moment of decision in order to decide well. The horizon is finite because there are at most $n$ offers, so no discounting is needed (cheat sheet §3).

**Definitions.** Let $k$ be the number of offers remaining **including** the current one, and let $x$ be the current offer. Let $\bot$ be an absorbing terminal state, reached once the car is sold. We put $k$ into the state because the same offer may be worth rejecting when many offers remain and worth accepting when few remain, so the decision depends on it.

**Solution.**

Step 1, states: the pairs $(k,x)$ with $k\in\{1,\dots,n\}$ and $x\in[0,1]$, plus $\bot$.

Step 2, initial state: $(n,X_1)$ with $X_1\sim U[0,1]$. The initial state is random, that is, a distribution over states, which an MDP allows.

Step 3, actions: at $(k,x)$ with $k\ge2$ you may accept or reject. At $(1,x)$ you may only accept, because on day $n$ you must accept.

Step 4, rewards and transitions, by the rules of the problem:

| state and action | reward | next state |
|---|---|---|
| $(k,x)$, accept | $x$ | $\bot$ |
| $(k,x)$, reject | $0$ (or $-c$ in part d) | $(k-1,X')$ |
| $\bot$ | $0$ | $\bot$ |

Here $X'\sim U[0,1]$ is the next offer, independent of everything seen so far.

Step 5, horizon: at most $n$ decisions, because every rejection lowers $k$ by one and at $k=1$ you must accept. So $\gamma=1$ is fine.

Step 6, why this state is enough (the Markov property): given $(k,x)$, the reward of each action and the distribution of the next state are fully determined. Accepting pays $x$. Rejecting leads to a fresh offer whose distribution is $U[0,1]$ whatever happened before, because the offers are i.i.d. A rejected offer can never be collected again (no recall), and by independence it carries no information about future offers. So the history adds nothing. On the other hand $x$ is needed, because it is the reward of accepting, and $k$ is needed, because it says whether rejecting is allowed and how many chances remain.

**In words.** The past does not matter because the seller cannot go back and the market has no memory: yesterday's offer neither returns nor predicts tomorrow's.

**Sanity check.** With $n=1$ the only state is $(1,X_1)$; you must accept and get $\mathbb{E}X_1=\tfrac12$, exactly what the rules say.

**What to write in the exam.**

- States $(k,x)$ plus a terminal state $\bot$; start at $(n,X_1)$.
- Actions accept or reject, and only accept when $k=1$.
- Accept: reward $x$, move to $\bot$. Reject: reward $0$ (or $-c$), move to $(k-1,X')$ with a fresh $X'\sim U[0,1]$.
- Horizon $n$, $\gamma=1$.
- History is irrelevant: there is no recall, and i.i.d. offers carry no information about the future.

*Verified: the same MDP coded in Python (exact-fraction recursion and a grid DP) reproduces all the values in parts (b)–(d).*

**(b) Bellman equation, threshold policy and the recursion for $a_k$**

**What is asked.** The Bellman optimality equation for $V_k(x)$, a proof that the optimal policy accepts iff $x\ge a_{k-1}$, the value $a_1$, the recursion for $a_{k+1}$, and an induction proof of the bounds on $a_k$. The answer is formulas and proofs.

**Tool and why.** The finite-horizon Bellman equation (cheat sheet §2 and §3) together with the threshold structure of optimal stopping (cheat sheet §4). It fits because the value of stopping is $x$, which grows with $x$, while the value of continuing does not depend on $x$ at all, since the next offer is independent of the current one. The recursion then comes from one integral, $\mathbb{E}\max(X,b)$.

**Definitions.** $V_k(x)$ is the optimal expected payoff in state $(k,x)$, as in the statement. Let $X\sim U[0,1]$ and

$$a_k=\mathbb{E}\,V_k(X).$$

This is exactly the statement's $a_k$: before the next offer is seen, the state is $(k,X)$ with $X$ still random. We introduce it because, as Step 2 shows, the value of rejecting is precisely this number.

**Solution.**

Step 1, boundary condition: with one offer left you must accept, so $V_1(x)=x$.

Step 2, value of rejecting at $(k,x)$ with $k\ge2$: the reward is $0$ and the next state is $(k-1,X')$ with a fresh $X'$. Continuing optimally from there is worth, by the definition of $a_{k-1}$,

$$\mathbb{E}_{X'}V_{k-1}(X')=a_{k-1}.$$

Step 3, Bellman equation: take the better of the two actions.

$$V_k(x)=\max\{x,\ a_{k-1}\},\qquad k\ge2.$$

Step 4, threshold structure.

**Claim.** For $k\ge2$, accepting is optimal iff $x\ge a_{k-1}$.

The value of accepting, $x$, is increasing in $x$. The value of rejecting, $a_{k-1}$, is a constant that does not depend on $x$ (Step 2). So the difference "accept minus reject", $x-a_{k-1}$, is non-negative exactly when $x\ge a_{k-1}$. At equality both actions are equally good and the tie rule says accept. This is a threshold policy.

Step 5, the first value:

$$a_1=\mathbb{E}V_1(X)=\mathbb{E}X=\tfrac12.$$

Step 6, the key integral: fix a constant $b\in[0,1]$ and split at $b$. When $X<b$ the maximum is $b$, and when $X\ge b$ the maximum is $X$:

$$\begin{aligned}
\mathbb{E}\max(X,b)&=b\cdot\Pr(X<b)+\int_b^1x\,dx\\
&=b\cdot b+\frac{1-b^2}{2}\\
&=\frac{1+b^2}{2}.
\end{aligned}$$

The second row uses that the event $X<b$ has probability $b$ for a uniform variable and $\int_b^1x\,dx=\tfrac{1-b^2}{2}$.

Step 7, the recursion: by Step 3 with $k+1$ in place of $k$, $V_{k+1}(X)=\max\{X,a_k\}$. Take the expectation and use Step 6 with $b=a_k$, which is allowed once we know $a_k\in[0,1]$ (Step 8 proves it):

$$a_{k+1}=\mathbb{E}\max(X,a_k)=\frac{1+a_k^2}{2},\qquad k\ge1.$$

Step 8, the bounds.

**Claim.** For every $k\ge1$,

$$\tfrac12\le a_k<a_{k+1}<1.$$

We prove by induction on $k$, upward from $k=1$, the statement $A_k$: "$a_k\in[\tfrac12,1)$", and on the way we get $a_k<a_{k+1}$.

**Base.** $a_1=\tfrac12$, so $A_1$ holds.

**Hypothesis.** For some $k\ge1$, $a_k\in[\tfrac12,1)$.

**Step.** By the hypothesis $a_k\in[0,1]$, so the recursion of Step 7 applies. Subtract $a_k$:

$$\begin{aligned}
a_{k+1}-a_k&=\frac{1+a_k^2}{2}-a_k\\
&=\frac{1-2a_k+a_k^2}{2}\\
&=\frac{(1-a_k)^2}{2}.
\end{aligned}$$

This is strictly positive because $a_k<1$ (hypothesis), so $a_k<a_{k+1}$. Also $a_k^2<1$ (hypothesis again), hence

$$a_{k+1}=\frac{1+a_k^2}{2}<\frac{1+1}{2}=1.$$

Together with $a_{k+1}>a_k$ and $a_k\ge\tfrac12$ this gives $A_{k+1}$, and with it the whole chain of the claim. $\square$

**In words.** With more offers to come you can afford to be pickier, so the value $a_k$ and the threshold grow with $k$. They stay below $1$ because no offer exceeds $1$.

**Sanity check.** For $k=2$ compute directly: with threshold $\tfrac12$ on the first of two offers, you get an offer with conditional mean $\tfrac34$ with probability $\tfrac12$, and otherwise the last offer, worth $\tfrac12$ on average:

$$\tfrac12\cdot\tfrac34+\tfrac12\cdot\tfrac12=\tfrac58.$$

The recursion gives the same, $\tfrac12\big(1+\tfrac14\big)=\tfrac58$.

**What to write in the exam.**

- Boundary $V_1(x)=x$, and for $k\ge2$, $V_k(x)=\max\{x,a_{k-1}\}$.
- Continue value is a constant in $x$, accept value increases in $x$, so accept iff $x\ge a_{k-1}$.
- Formula $\mathbb{E}\max(X,b)=\tfrac{1+b^2}{2}$, so $a_1=\tfrac12$ and $a_{k+1}=\tfrac{1+a_k^2}{2}$.
- Induction: $a_{k+1}-a_k=\tfrac12(1-a_k)^2$, positive because $a_k<1$, and $a_{k+1}<1$ because $a_k^2<1$.

*Verified: exact fractions for $a_1,\dots,a_5$; the identity for $\mathbb{E}\max(X,b)$ checked exactly at several $b$; the chain of bounds checked numerically for every $k\le200$.*

**(c) Numbers for $n=5$**

**What is asked.** The threshold used on each of days $1,\dots,5$, the optimal expected payoff $a_5$, and the gain over accepting the first offer. The answer is numbers.

**Tool and why.** The recursion from (b) iterated forward from $a_1$ (cheat sheet §3), plus the threshold rule (cheat sheet §4). The only care needed is the indexing: which $a$ belongs to which day.

**Definitions.** Let $t$ be the day number. No other new notation.

**Solution.**

Step 1, iterate the recursion in exact fractions:

$$\begin{aligned}
a_1&=\tfrac12,\\
a_2&=\tfrac12\big(1+\tfrac14\big)=\tfrac58,\\
a_3&=\tfrac12\big(1+\tfrac{25}{64}\big)=\tfrac{89}{128},\\
a_4&=\tfrac12\big(1+\tfrac{7921}{16384}\big)=\tfrac{24305}{32768}.
\end{aligned}$$

The squares are $\tfrac{25}{64}=\big(\tfrac58\big)^2$ and $\tfrac{7921}{16384}=\big(\tfrac{89}{128}\big)^2$. One more step:

$$a_5=\frac{1+a_4^2}{2}=\frac{1664474849}{2147483648}\approx0.7751.$$

Step 2, which threshold on which day: on day $t$ the current offer is the $t$-th, so $k=n-t+1$ offers remain including it. By (b) the threshold is $a_{k-1}$, that is $a_{n-t}$, the value of the offers still to come after today.

| day $t$ | offers after today | threshold |
|---|---|---|
| $1$ | $4$ | $a_4\approx0.7417$ |
| $2$ | $3$ | $a_3\approx0.6953$ |
| $3$ | $2$ | $a_2=0.625$ |
| $4$ | $1$ | $a_1=0.5$ |
| $5$ | $0$ | accept anything |

Step 3, the payoff and the gain: the optimal expected payoff is

$$\boxed{a_5\approx0.7751}$$

Accepting the first offer gives $\mathbb{E}X_1=\tfrac12$. The gain is $a_5-\tfrac12\approx0.2751$, about $55\%$ more.

**In words.** Being picky early and lowering the bar as the deadline approaches raises the expected price from $0.5$ to about $0.775$.

**Sanity check.** The thresholds decrease day by day, as they should. Also $a_5$ must be below the expected best of five offers, $\tfrac56\approx0.833$, which a seller with full recall could get; indeed $0.7751<0.833$. A Monte-Carlo run of this policy gives $0.7749$.

**What to write in the exam.**

- Values $a_2=\tfrac58$, $a_3=\tfrac{89}{128}$, $a_4\approx0.7417$, $a_5\approx0.7751$.
- On day $t$ use threshold $a_{n-t}$: $0.7417$, $0.6953$, $0.625$, $0.5$, and accept on day $5$.
- Gain over the first offer: $0.7751-0.5\approx0.275$, about $55\%$.

*Verified: exact-fraction recursion, and a $2\cdot10^6$-run Monte-Carlo of the threshold policy giving $0.7749$.*

**(d) A cost for each rejection**

**What is asked.** With a fee $c$ per rejection: derive the new recursion and threshold, give the five thresholds and $a_5$ for $c=0.02$ and $n=5$, and show that the first-day threshold tends to $1-\sqrt{2c}$ as $n\to\infty$, evaluated at $c=0.02$. The answer is a derivation, numbers and a limit proof.

**Tool and why.** The same Bellman equation and threshold argument as in (b) (cheat sheet §2–§4), now with reward $-c$ on rejection. The limit is a fixed point of the recursion, reached by a monotone bounded sequence; at the end we compare the gain of one more look with its cost.

**Definitions.** We keep the name $a_k$ for the optimal expected **net** payoff (offer received minus fees still to be paid) with $k$ offers to come and the next one unseen. Fees already paid are sunk and do not affect decisions. Let $f(a)=\tfrac12\big(1+(a-c)^2\big)$, so that the recursion reads $a_{k+1}=f(a_k)$; let $a^\star$ be its limit and $t_\infty$ the limit of the first-day threshold.

**Solution.**

Step 1, Bellman with a fee: today's offer is $x$ and $k$ offers come after today. Rejecting pays $-c$ now and then leads to the situation "$k$ offers to come, next unseen", worth $a_k$. So

$$V_{k+1}(x)=\max\{x,\ a_k-c\}.$$

Step 2, threshold: as in (b), the accept value $x$ grows with $x$ and the reject value $a_k-c$ is a constant, so accept iff $x\ge a_k-c$.

Step 3, recursion: take the expectation of Step 1 over $X$ and use (b), Step 6, with $b=a_k-c$, valid while $a_k-c\in[0,1]$:

$$a_{k+1}=\mathbb{E}\max(X,a_k-c)=\frac{1+(a_k-c)^2}{2}.$$

The start is unchanged, $a_1=\tfrac12$, because the last offer is accepted and no fee is paid.

Step 4, numbers for $c=0.02$: the first step is

$$a_2=\tfrac12\big(1+0.48^2\big)=0.6152,$$

and so on:

| $k$ | $a_k$ | $a_k-c$ |
|---|---|---|
| $1$ | $0.5$ | $0.48$ |
| $2$ | $0.6152$ | $0.5952$ |
| $3$ | $0.67713$ | $0.65713$ |
| $4$ | $0.71591$ | $0.69591$ |
| $5$ | $0.74215$ | not needed |

Step 5, thresholds for $n=5$: on day $t$ there are $n-t$ offers after today, so the threshold is $a_{n-t}-c$:

| day $t$ | threshold |
|---|---|
| $1$ | $0.6959$ |
| $2$ | $0.6571$ |
| $3$ | $0.5952$ |
| $4$ | $0.48$ |
| $5$ | accept anything |

$$\boxed{a_5\approx0.7421}$$

Step 6, the fixed points: write $t=a-c$ for the threshold that belongs to $a$. The equation $a=f(a)$ becomes

$$\begin{aligned}
t+c&=\tfrac12\big(1+t^2\big)\\
t^2-2t+1&=2c\\
(1-t)^2&=2c,
\end{aligned}$$

so $t=1\pm\sqrt{2c}$. The smaller fixed point is $a^\star=1+c-\sqrt{2c}$, with threshold $1-\sqrt{2c}$.

Step 7, convergence. We assume $c\le\tfrac12$, which is needed anyway for $a_1-c\ge0$.

**Claim.** For every $k\ge1$, $a_k\le a_{k+1}$ and $a_{k+1}\le a^\star$; hence $a_k$ increases to $a^\star$.

Two facts first. The map $f$ is increasing on $[c,\infty)$, because there

$$f'(a)=a-c\ge0.$$

And $a_1\le a^\star$, because

$$a^\star-\tfrac12=\tfrac12+c-\sqrt{2c}=\Big(\sqrt c-\tfrac1{\sqrt2}\Big)^2\ge0.$$

Induction on $k$, upward.

**Base.** For $k=1$, both parts:

$$\begin{aligned}
a_2-a_1&=\tfrac12\big(\tfrac12-c\big)^2\ge0,\\
a_2=f(a_1)&\le f(a^\star)=a^\star.
\end{aligned}$$

The second row uses that $f$ is increasing and $a_1\ge c$, since $a_1$ is $\tfrac12$.

**Hypothesis.** For some $k\ge2$, $a_{k-1}\le a_k$ and $a_k\le a^\star$.

**Step.** All these values are at least $\tfrac12\ge c$, where $f$ is increasing. Applying $f$ to the hypothesis gives $f(a_{k-1})\le f(a_k)$, that is $a_k\le a_{k+1}$, and $f(a_k)\le f(a^\star)$, that is $a_{k+1}\le a^\star$.

So the sequence is increasing and bounded, hence it converges to some $L$ with $f(L)=L$, because $f$ is continuous. Since $L\le a^\star$ and the other fixed point $1+c+\sqrt{2c}$ is larger than $a^\star$, we get $L=a^\star$.

Step 8, the first-day threshold: with $n$ offers it is $a_{n-1}-c$, which tends to $a^\star-c$:

$$\boxed{t_\infty=1-\sqrt{2c}=1-\sqrt{0.04}=0.8}$$

Step 9, interpretation as one-step look-ahead: at a threshold $t$, one more look gains on average $\mathbb{E}(X-t)^+=\tfrac12(1-t)^2$. Setting this equal to the cost $c$ gives $(1-t)^2=2c$, the same equation as Step 6. At the threshold $0.8$ the gain is $\tfrac12\cdot0.04=0.02$, exactly $c$.

**In words.** Without a fee the bar creeps up to $1$ as $n$ grows. With a fee every extra look has a price, so the bar stops rising where the expected improvement of one more look, $\tfrac12(1-t)^2$, drops to the fee $c$.

**Sanity check.** With $c=0$ the formula gives $t_\infty=1$, matching the limit $1$ of $a_k$ from (b). Every threshold with the fee is below the matching one without it, for example $0.6959$ against $0.7417$ on day $1$. Iterating the recursion 2000 times gives $a\approx0.82$ and threshold $0.80$.

**What to write in the exam.**

- Bellman with fee: $V_{k+1}(x)=\max\{x,a_k-c\}$, so accept iff $x\ge a_k-c$.
- Recursion $a_{k+1}=\tfrac12\big(1+(a_k-c)^2\big)$ from $\mathbb{E}\max(X,b)=\tfrac{1+b^2}{2}$.
- For $c=0.02$: thresholds $0.6959$, $0.6571$, $0.5952$, $0.48$, then accept; $a_5\approx0.7421$.
- Limit: $a_k$ increases to the smaller fixed point; its threshold solves $(1-t)^2=2c$, so $t_\infty$ is $1-\sqrt{2c}$, which is $0.8$.

*Verified: the recursion in floating point, a grid DP on $2\cdot10^6$ points agreeing to $10^{-6}$, a Monte-Carlo of the fee policy giving $0.7421$, and 2000 iterations converging to threshold $0.8$.*

**Common mistakes.**

- Off-by-one indexing: using $a_k$ instead of $a_{k-1}$ when $k$ counts the current offer. For $n=5$ this would put the day-1 threshold at $a_5\approx0.775$ instead of $a_4\approx0.742$.
- Replacing $\mathbb{E}\max(X,b)$ by $\max(\mathbb{E}X,b)$. This drops the option value and wrongly gives $a_k=\tfrac12$ for every $k$.
- In (d), charging the fee on acceptance, or claiming the threshold still tends to $1$; the fee caps it at $1-\sqrt{2c}$.

**💡 Trick.** The continue-value is a constant (independent of the current offer), so the policy is a threshold, and $\mathbb{E}\max(X,b)=\tfrac{1+b^2}{2}$ turns the Bellman equation into a scalar recursion.

**⚠️ Watch out.** Index carefully: on a day with $k$ offers *after* today the threshold is $a_k$ (not $a_{k+1}$), and with a cost the threshold is $a_k-c$ — the cost is paid on rejecting, not on accepting.

## Q2 — Thresholding bandit: which arms clear the bar?

**Hint:** Hoeffding for $r$ samples with deviation $c_r$ gives $2e^{-2rc_r^2}$; what does the
specific $c_r$ make this equal to, and is the sum over all $r$ finite? On the clean event, how
far can $\hat\mu_{i,r}\pm c_r$ be from $\mu_i$ — and when is that smaller than the gap to $\tau$?

**Full solution:**

**(a) The clean event has probability at least $1-\delta$**

**What is asked.** Prove $\Pr(\mathcal{E})\ge1-\delta$ with Hoeffding's inequality and a union bound over arms and rounds, and explain why the width has $r^2$ inside the logarithm. The answer is a proof plus an explanation.

**Tool and why.** Hoeffding's inequality for one arm and one round, then a union bound over all pairs $(i,r)$ (cheat sheet §10). A union bound works for countably many events as long as their failure probabilities add up to at most $\delta$; the choice of $c_r$ is made exactly for that.

**Definitions.** For the analysis, imagine each arm's rewards as a stack drawn in advance, and let $\hat\mu_{i,r}$ be the mean of the first $r$ entries of arm $i$'s stack. This defines $\hat\mu_{i,r}$ for every $r$, even after the arm is deactivated, which we need because $\mathcal{E}$ talks about all rounds. Let $B_{i,r}$ be the bad event $|\hat\mu_{i,r}-\mu_i|>c_r$; then $\mathcal{E}^c$ is the union of all $B_{i,r}$.

**Solution.**

Step 1, Hoeffding: for $r$ i.i.d. samples in $[0,1]$ and any deviation $\varepsilon>0$,

$$\Pr\big(|\hat\mu_{i,r}-\mu_i|>\varepsilon\big)\le2e^{-2r\varepsilon^2}.$$

Step 2, plug in $\varepsilon=c_r$: by the definition of $c_r$, $2rc_r^2=\ln(4Kr^2/\delta)$, so

$$\begin{aligned}
\Pr(B_{i,r})&\le2e^{-2rc_r^2}\\
&=2\cdot\frac{\delta}{4Kr^2}\\
&=\frac{\delta}{2Kr^2}.
\end{aligned}$$

Step 3, union bound over all arms and all rounds:

$$\begin{aligned}
\Pr(\mathcal{E}^c)&\le\sum_{i=1}^K\sum_{r\ge1}\frac{\delta}{2Kr^2}\\
&=K\cdot\frac{\delta}{2K}\cdot\frac{\pi^2}{6}\\
&=\frac{\pi^2}{12}\,\delta\approx0.822\,\delta.
\end{aligned}$$

So $\Pr(\mathcal{E})\ge1-0.822\,\delta$, and in particular

$$\boxed{\Pr(\mathcal{E})\ge1-\delta}$$

Step 4, why $r^2$: the algorithm runs a random, unbounded number of rounds and uses $c_r$ in every one of them, so the guarantee must hold for all $r$ at once. With a fixed width based on $\ln(2K/\delta)$, each pair $(i,r)$ would get failure probability $\delta/K$, and the sum over $r$ would be infinite, which proves nothing. With $r^2$ inside the logarithm, round $r$ gets a budget proportional to $1/r^2$, which is summable; the price is only an extra $\ln r$ term inside the width.

**In words.** We pay a little extra width in late rounds to buy a confidence guarantee that never expires.

**Sanity check.** Putting $r$ instead of $r^2$ inside the logarithm would give a budget proportional to $1/r$, whose sum diverges; $r^2$ is the simplest power that converges. In a 2000-run simulation the algorithm never misclassified an arm, consistent with $\delta=0.1$.

**What to write in the exam.**

- Hoeffding with $\varepsilon=c_r$ gives $\Pr(B_{i,r})\le\tfrac{\delta}{2Kr^2}$.
- Union bound over $K$ arms and all $r$: the total is $\tfrac{\pi^2}{12}\delta$, below $\delta$.
- The number of rounds is unbounded, so the bound must cover all $r$; a fixed width would give a divergent sum.

*Verified: $\pi^2/12\approx0.8225$ computed, and a 2000-run simulation of the algorithm on the instance of (d) with zero misclassifications.*

**(b) Correct classification on the clean event**

**What is asked.** Prove that on $\mathcal{E}$ every classification the algorithm makes is correct, and conclude that $\Pr(\hat G=G)$ is at least $1-\delta$. The answer is a proof.

**Tool and why.** The confidence-interval argument of bandits (cheat sheet §10): on $\mathcal{E}$ the true mean lies inside the interval around the empirical mean, and the algorithm decides only when the whole interval is on one side of $\tau$.

**Definitions.** No new notation.

**Solution.**

Step 1, unpack $\mathcal{E}$: for every arm $i$ and round $r$,

$$\hat\mu_{i,r}-c_r\le\mu_i\le\hat\mu_{i,r}+c_r.$$

Step 2, the "above" case: arm $i$ is put in $\hat G$ at round $r$ only if $\hat\mu_{i,r}-c_r>\tau$. With the left inequality of Step 1,

$$\mu_i\ge\hat\mu_{i,r}-c_r>\tau,$$

so $\mu_i>\tau$ and $i\in G$: correct.

Step 3, the "below" case: arm $i$ is declared below only if $\hat\mu_{i,r}+c_r<\tau$. With the right inequality of Step 1,

$$\mu_i\le\hat\mu_{i,r}+c_r<\tau,$$

so $i\notin G$: correct.

Step 4, conclusion: on $\mathcal{E}$ every arm is eventually classified (part (c)), and each classification is correct, so the arms placed in $\hat G$ are exactly those in $G$. Thus the event $\hat G=G$ contains $\mathcal{E}$, and by (a)

$$\boxed{\Pr(\hat G=G)\ge\Pr(\mathcal{E})\ge1-\delta}$$

**In words.** Decide about an arm only when its whole confidence interval is on one side of the bar; if the interval is honest, the decision is right.

**Sanity check.** For the instance of (d) the round-1 width is $c_1\approx1.59$, larger than the whole range $[0,1]$, so no arm can be classified after a single sample, which is what caution requires.

**What to write in the exam.**

- On $\mathcal{E}$: $\mu_i$ lies between $\hat\mu_{i,r}-c_r$ and $\hat\mu_{i,r}+c_r$.
- Above: $\mu_i\ge\hat\mu_{i,r}-c_r$, which exceeds $\tau$, so $i\in G$.
- Below: $\mu_i\le\hat\mu_{i,r}+c_r$, which is below $\tau$, so $i\notin G$.
- Hence $\mathcal{E}$ implies $\hat G=G$, and the probability of that is at least $1-\delta$.

*Verified: in the 2000-run simulation every output set equalled $G=\{1,2\}$.*

**(c) When each arm is decided, and the total sample count**

**What is asked.** Prove that on $\mathcal{E}$ arm $i$ is deactivated no later than the first round $r_i$ with $c_{r_i}<\Delta_i/2$, deduce the total-sample bound, and explain why it beats uniform sampling. The answer is a proof, a bound and an explanation.

**Tool and why.** The gap argument for elimination algorithms (cheat sheet §10), with the gap measured to the threshold $\tau$: once the width is below half the gap, the empirical interval cannot straddle $\tau$. Then we solve the width condition for $r$ up to constants.

**Definitions.** Let

$$r_i=\min\{r\ge1:\ c_r<\Delta_i/2\},$$

the first round at which the width is below half the gap of arm $i$. Let $N_i$ be the number of times arm $i$ is pulled.

**Solution.**

Step 1, **Claim.** On $\mathcal{E}$, if arm $i$ is still active at round $r$ and $c_r<\Delta_i/2$, it is deactivated at round $r$.

Case $\mu_i>\tau$, so $\mu_i=\tau+\Delta_i$:

$$\begin{aligned}
\hat\mu_{i,r}-c_r&\ge\mu_i-2c_r\\
&>\mu_i-\Delta_i\\
&=\tau.
\end{aligned}$$

The first row uses $\hat\mu_{i,r}\ge\mu_i-c_r$, which holds on $\mathcal{E}$, and the second uses $2c_r<\Delta_i$. So the arm is classified "above".

Case $\mu_i<\tau$, so $\mu_i=\tau-\Delta_i$, symmetrically:

$$\begin{aligned}
\hat\mu_{i,r}+c_r&\le\mu_i+2c_r\\
&<\mu_i+\Delta_i\\
&=\tau.
\end{aligned}$$

So the arm is declared "below".

Step 2, consequence: arm $i$ is deactivated at round $r_i$ at the latest, or earlier if it was already decided. It is pulled once per active round, so $N_i\le r_i$. In particular the algorithm stops by round $\max_ir_i$, which completes (b).

Step 3, the width condition: both sides of $c_r<\Delta_i/2$ are positive, so squaring is allowed:

$$\frac{\ln(4Kr^2/\delta)}{2r}<\frac{\Delta_i^2}{4}\iff r>\frac{2}{\Delta_i^2}\ln\frac{4Kr^2}{\delta}.$$

Step 4, an explicit $r$ that satisfies it: let $L=\ln(4K/\delta)$ and $u=\ln(8/\Delta_i^2)$, and

$$\bar r_i=\frac{4}{\Delta_i^2}\Big(\ln\frac{4K}{\delta}+2\ln\frac{8}{\Delta_i^2}\Big).$$

**Claim.** $\bar r_i$ satisfies the condition of Step 3. Write $w=L+2u$, so $\bar r_i=4w/\Delta_i^2$ and $\ln\bar r_i=u-\ln2+\ln w$. The condition $\bar r_i\Delta_i^2/2>L+2\ln\bar r_i$ becomes

$$\begin{aligned}
2w&>L+2u-2\ln2+2\ln w\\
w+2\ln2&>2\ln w,
\end{aligned}$$

which is equivalent to $4e^{w}>w^2$, true for every $w>0$ since $e^{w/2}>w/2$. Also $\bar r_i>4/\Delta_i^2$, and beyond that point the condition only gets easier as $r$ grows (the left side grows by $1$ per unit of $r$, the right side by less), so $r_i\le\lceil\bar r_i\rceil$.

Step 5, total samples: $\bar r_i$ is $\tfrac{1}{\Delta_i^2}$ times a constant multiple of $\ln\tfrac{K}{\delta}+\ln\tfrac{1}{\Delta_i}$, so

$$\sum_{i=1}^KN_i\le\sum_{i=1}^Kr_i=O\!\Big(\sum_{i=1}^K\frac{1}{\Delta_i^2}\ln\frac{K}{\delta\,\Delta_i}\Big).$$

Step 6, comparison with uniform sampling: sampling every arm until the hardest one is decided costs $K\max_ir_i$, about $\tfrac{K}{\Delta_{\min}^2}$ times the logarithm. Since every term satisfies $\tfrac{1}{\Delta_i^2}\le\tfrac{1}{\Delta_{\min}^2}$, the elimination sum is never larger and is much smaller when the gaps differ: each arm pays only for its own gap instead of the hardest arm's.

**In words.** Easy arms, far from the bar, leave early; only arms close to $\tau$ need many samples.

**Sanity check.** If all gaps are equal, both bounds coincide, as they should. On the instance of (d) the simulated mean total was about $5240$ samples, well below the bound $24839$, so the bound is valid but conservative.

**What to write in the exam.**

- On $\mathcal{E}$ with $2c_r<\Delta_i$: $\hat\mu_{i,r}-c_r$ is at least $\mu_i-2c_r$, which exceeds $\tau$ (or the mirror case), so the arm is decided.
- Hence $N_i\le r_i$, and $c_r<\Delta_i/2$ is equivalent to $r>\tfrac{2}{\Delta_i^2}\ln\tfrac{4Kr^2}{\delta}$.
- So $r_i=O\big(\Delta_i^{-2}\ln\tfrac{K}{\delta\Delta_i}\big)$, and the total is the sum over arms.
- Uniform sampling pays $K/\Delta_{\min}^2$; elimination pays $\sum_i1/\Delta_i^2$.

*Verified: the claim on $\bar r_i$ tested on $10^5$ random triples of $K$, $\delta$ and $\Delta$; the simulation mean of total samples was about $5240$.*

**(d) Numbers for four arms**

**What is asked.** For $K=4$, $\tau=0.5$, $\mu=(0.9,0.6,0.45,0.2)$, $\delta=0.1$: the gaps, the rounds $r_i$ from (c), and the comparison of $\sum_ir_i$ with $K\max_ir_i$. The answer is numbers.

**Tool and why.** The width condition from (c), Step 3, solved by fixed-point iteration as the hint suggests (cheat sheet §10). The iteration converges to the crossing point after which the condition holds.

**Definitions.** Let $r^*_i$ be the larger solution of $r=\tfrac{2}{\Delta_i^2}\ln(160\,r^2)$, the point after which the condition holds. Here $4K/\delta=160$.

**Solution.**

Step 1, gaps: $\Delta_i=|\mu_i-0.5|$, so

$$\Delta=(0.4,\ 0.1,\ 0.05,\ 0.3).$$

Step 2, the condition is $r>\tfrac{2}{\Delta^2}\ln(160\,r^2)$. The right side is concave in $r$, and at $r=1$ it equals $\tfrac{2}{\Delta^2}\ln160$, which is larger than $1$. So the condition fails for small $r$ and holds exactly for $r>r^*_i$, and $r_i$ is the first integer above $r^*_i$.

Step 3, iterate $r\leftarrow\tfrac{2}{\Delta^2}\ln(160\,r^2)$ from $r=1/\Delta^2$. For arm $1$ (gap $0.4$, factor $12.5$): start at $6.25$, then $109.25$, $180.78$, $193.37$, $195.06$, converging to $195.30$. All four arms:

| arm | $\Delta_i$ | $r^*_i$ | $r_i$ |
|---|---|---|---|
| $1$ | $0.4$ | $195.30$ | $196$ |
| $2$ | $0.1$ | $4367.84$ | $4368$ |
| $3$ | $0.05$ | $19897.50$ | $19898$ |
| $4$ | $0.3$ | $376.36$ | $377$ |

$$\boxed{r=(196,\ 4368,\ 19898,\ 377)}$$

Step 4, direct check at the boundary for arm $1$: $c_{195}\approx0.20014$, above $0.2$, and $c_{196}\approx0.19969$, below $0.2$. For arm $2$: $c_{4367}\approx0.050004$ and $c_{4368}\approx0.049999$.

Step 5, totals: elimination needs at most

$$\boxed{\textstyle\sum_ir_i=24839}$$

samples, against $K\max_ir_i=79592$ for uniform sampling. The ratio is $79592/24839\approx3.2$.

**In words.** Arm $3$, with mean $0.45$ only $0.05$ below the bar, dominates the cost; uniform sampling would force the three easy arms to pay as much as arm $3$.

**Sanity check.** $r_i$ scales roughly like $1/\Delta_i^2$: halving the gap from $0.1$ to $0.05$ multiplies $r_i$ by $19898/4368\approx4.56$, a bit more than $4$ because of the $\ln r$ term.

**What to write in the exam.**

- Gaps $0.4$, $0.1$, $0.05$, $0.3$.
- Iterating $r\leftarrow\tfrac{2}{\Delta^2}\ln(160r^2)$ gives $r_i$ equal to $196$, $4368$, $19898$, $377$.
- Total $24839$ against $4\cdot19898=79592$, a saving of about $3.2$ times.

*Verified: fixed-point iteration in Python and a direct search for the first $r$ with $c_r<\Delta_i/2$, which agree.*

**Common mistakes.**

- Union-bounding only over arms with a fixed $\ln(2K/\delta)$ width. The sum over rounds then diverges and nothing is proved.
- Requiring $c_r<\Delta_i$ instead of $c_r<\Delta_i/2$. The empirical mean can be off by $c_r$ and the interval adds another $c_r$, so the factor $2$ is needed.
- In (d), rounding $r^*_i$ down: $r_i$ is the first integer above the crossing point.

**💡 Trick.** Spend $\delta/(2Kr^2)$ per arm per round: the $\pi^2/6$ sum keeps the total under $\delta$, and on the clean event an arm is decided as soon as $2c_r<\Delta_i$.

**⚠️ Watch out.** The union bound must cover all rounds, not just all arms — an anytime confidence width needs the $\ln r$ term, and the gap here is to the threshold $\tau$, not to the best arm.

## Q3 — Softmax policy gradient with a quadratic action feature

**Hint:** Write $\log\pi$ as "linear score minus log-partition"; the gradient of the log-partition
is an expectation of features under $\pi$. At $\theta=0$ the policy is uniform — what are
$\mathbb{E}[a]$ and $\mathbb{E}[a^2]$? For the baseline, how does $\sum_j\nabla\log\pi(a_j\mid x_j)$
over the batch enter?

**Full solution:**

**(a) The score function**

**What is asked.** A general formula for $\nabla_\theta\log\pi(a\mid x;\theta)$, and its values at $\theta=0$ for all six pairs $(x,a)$. The answer is a formula and a table.

**Tool and why.** The gradient of a log-softmax is "feature minus expected feature" (cheat sheet §9, score table). It fits because the policy is a softmax of a linear function of the features.

**Definitions.** Let $Z(x;\theta)=\sum_be^{\theta^\top\phi(x,b)}$ be the normalizer of the softmax. We introduce it because $\log\pi$ splits into a linear part and $\ln Z$.

**Solution.**

Step 1, take the logarithm of the policy:

$$\log\pi(a\mid x;\theta)=\theta^\top\phi(x,a)-\ln Z(x;\theta).$$

Step 2, differentiate the normalizer by the chain rule:

$$\begin{aligned}
\nabla_\theta\ln Z(x;\theta)&=\frac{1}{Z}\sum_be^{\theta^\top\phi(x,b)}\phi(x,b)\\
&=\sum_b\pi(b\mid x;\theta)\,\phi(x,b)\\
&=\mathbb{E}_{b\sim\pi(\cdot\mid x;\theta)}\phi(x,b).
\end{aligned}$$

Step 3, combine: the gradient of the linear part is $\phi(x,a)$, so

$$\nabla_\theta\log\pi(a\mid x;\theta)=\phi(x,a)-\mathbb{E}_{b\sim\pi(\cdot\mid x;\theta)}\phi(x,b).$$

With $\phi(x,a)=(ax,a^2)$, and since $x$ is fixed inside the expectation,

$$\nabla_\theta\log\pi(a\mid x;\theta)=\begin{pmatrix}a\,x-x\,\mathbb{E}_\pi[b]\\ a^2-\mathbb{E}_\pi[b^2]\end{pmatrix}.$$

Step 4, at $\theta=0$ all logits are $0$, so the policy is uniform on the three actions. Hence

$$\begin{aligned}
\mathbb{E}[b]&=\tfrac{-1+0+1}{3}=0,\\
\mathbb{E}[b^2]&=\tfrac{1+0+1}{3}=\tfrac23,
\end{aligned}$$

and the score is $(ax,\ a^2-\tfrac23)$.

Step 5, the table:

| $(x,a)$ | score |
|---|---|
| $(+1,+1)$ | $(1,\tfrac13)$ |
| $(+1,0)$ | $(0,-\tfrac23)$ |
| $(+1,-1)$ | $(-1,\tfrac13)$ |
| $(-1,-1)$ | $(1,\tfrac13)$ |
| $(-1,0)$ | $(0,-\tfrac23)$ |
| $(-1,+1)$ | $(-1,\tfrac13)$ |

**In words.** The score says in which direction to move $\theta$ to make that action more likely: up in $\theta_1$ for the action that matches the context, up in $\theta_2$ for a non-zero action, down in $\theta_2$ for the action $0$.

**Sanity check.** The score has mean zero under the policy. For $x=+1$ the first components average to $\tfrac{1+0-1}{3}=0$ and the second components to $\tfrac{1/3-2/3+1/3}{3}=0$.

**What to write in the exam.**

- Formula: $\nabla\log\pi=\phi(x,a)-\mathbb{E}_\pi\phi(x,b)$.
- Components: $x(a-\mathbb{E}_\pi b)$ and $a^2-\mathbb{E}_\pi b^2$.
- At $\theta=0$: uniform policy, score $(ax,\ a^2-\tfrac23)$, then the six-row table.

*Verified: central finite differences of $\log\pi$ at $\theta=0$ match the table for all six pairs.*

**(b) The value and the exact gradient at $\theta=0$**

**What is asked.** $J(0)$ and $\nabla J(0)$, computed exactly from the policy-gradient formula. The answer is a number and a vector.

**Tool and why.** The policy-gradient theorem for a one-step problem, $\nabla J=\mathbb{E}[r\,\nabla\log\pi]$ (cheat sheet §9). With three actions and two contexts the expectation is a short finite sum.

**Definitions.** Let $g_+$ and $g_-$ be the contributions of the contexts $x=+1$ and $x=-1$ to the gradient, so that $\nabla J(0)=\tfrac12(g_++g_-)$.

**Solution.**

Step 1, the value: for $x=+1$ the rewards of the actions $+1$, $0$, $-1$ are $1$, $0.2$, $0$, each with probability $\tfrac13$, so the average is $\tfrac13(1+0.2+0)=0.4$. For $x=-1$ the matching action is $a=-1$ and the same three rewards appear. So

$$\boxed{J(0)=0.4}$$

Step 2, the context $x=+1$: weight each score from the table by its reward and by $\tfrac13$:

$$\begin{aligned}
g_+&=\tfrac13\Big(1\cdot(1,\tfrac13)+0.2\cdot(0,-\tfrac23)+0\Big)\\
&=\tfrac13\big(1,\ \tfrac13-\tfrac{2}{15}\big)\\
&=\tfrac13\,(1,\ 0.2).
\end{aligned}$$

Step 3, the context $x=-1$: the matching action $a=-1$ again has reward $1$ and score $(1,\tfrac13)$, the action $0$ is unchanged, and the mismatched action has reward $0$. So $g_-=g_+$.

Step 4, average over the two contexts:

$$\boxed{\nabla J(0)=(\tfrac13,\ \tfrac1{15})\approx(0.3333,\ 0.0667)}$$

**In words.** The gradient pushes hard toward matching the context through $\theta_1$, and gently toward leaving the action $0$ through $\theta_2$, because at uniform play a non-zero action earns $\tfrac12$ on average, more than $0.2$.

**Sanity check.** Since the score has mean zero, $\nabla J$ is the covariance of $r$ and $\phi$. Its second component is

$$\tfrac13\big(1\cdot\tfrac13+0.2\cdot(-\tfrac23)\big)=\tfrac1{15},$$

the same value.

**What to write in the exam.**

- Value: $J(0)$ is $\tfrac13(1+0.2)$, which is $0.4$.
- Per context: $\tfrac13$ times $(1,\tfrac13)+0.2(0,-\tfrac23)$, which is $\tfrac13(1,0.2)$, the same for both contexts.
- Hence $\nabla J(0)=(\tfrac13,\tfrac1{15})$.

*Verified: central finite differences of the exact $J$ with step $10^{-6}$ give $(0.33333,\ 0.06667)$.*

**(c) One REINFORCE step, with and without a baseline**

**What is asked.** The parameter after one batch-averaged REINFORCE step with $\alpha=1$ on the four given episodes, first with no baseline and then with $b=0.4$. The answer is two vectors.

**Tool and why.** The REINFORCE update with the score table from (a) (cheat sheet §9). A baseline subtracts $b$ times the sum of the scores of the batch, which we compute once.

**Definitions.** Let $s_j$ be the score of episode $j$ at $\theta=0$, read from the table of (a).

**Solution.**

Step 1, the four scores: $s_1=(1,\tfrac13)$ for $(+1,+1)$, $s_2=(1,\tfrac13)$ for $(-1,-1)$, $s_3=(0,-\tfrac23)$ for $(+1,0)$, and $s_4=(-1,\tfrac13)$ for $(-1,+1)$.

Step 2, weight by the rewards $1$, $1$, $0.2$, $0$:

$$\begin{aligned}
\sum_jr_js_j&=(1,\tfrac13)+(1,\tfrac13)+0.2\,(0,-\tfrac23)+0\\
&=\big(2,\ \tfrac23-\tfrac{2}{15}\big)\\
&=\big(2,\ \tfrac{8}{15}\big).
\end{aligned}$$

Step 3, the step without baseline, multiplying by $\alpha/4=\tfrac14$:

$$\theta^{(1)}=\tfrac14\big(2,\tfrac8{15}\big)=\boxed{(0.5,\ 0.1333)}$$

Step 4, the sum of the scores, needed for the baseline:

$$\sum_js_j=(1,\tfrac13)+(1,\tfrac13)+(0,-\tfrac23)+(-1,\tfrac13)=(1,\tfrac13).$$

Step 5, the step with $b=0.4$: since $\sum_j(r_j-b)s_j$ equals $\sum_jr_js_j-b\sum_js_j$, we subtract $\tfrac{0.4}{4}(1,\tfrac13)=(0.1,\tfrac1{30})$ from $\theta^{(1)}$. The second coordinate becomes $\tfrac2{15}-\tfrac1{30}=\tfrac1{10}$, so

$$\boxed{\theta^{(1)}_b=(0.4,\ 0.1)}$$

Step 6, what the baseline changes: the expected update is the same, because $\mathbb{E}_\pi\nabla\log\pi=0$. The zero-reward episode $4$ now contributes $(0-0.4)\,s_4=(0.4,-\tfrac{2}{15})$, which raises $\theta_1$ and so pushes the wrong action down. The total variance (trace of the covariance) of a single-sample estimate at $\theta=0$ drops from $\tfrac{176}{675}\approx0.261$ to $\tfrac{56}{675}\approx0.083$.

**In words.** With $b=0.4$, the average reward, each action is judged relative to the average: better-than-average actions are pushed up, worse ones down.

**Sanity check.** Both updates raise $\theta_1$ and $\theta_2$, in line with $\nabla J(0)$. They differ in this batch only because $\sum_js_j\ne0$ here; the scores sum to zero only in expectation.

**What to write in the exam.**

- Scores from the table; $\sum_jr_js_j=(2,\tfrac8{15})$, so $\theta^{(1)}=(0.5,\tfrac2{15})$.
- With baseline subtract $\tfrac{b}{4}\sum_js_j=0.1(1,\tfrac13)$, giving $(0.4,0.1)$.
- Baseline keeps the expectation (mean-zero score) and lowers the variance.

*Verified: exact fractions for both updates; the variance trace computed exactly as $\tfrac{176}{675}$ and $\tfrac{56}{675}$.*

**(d) The new value and the direction of improvement**

**What is asked.** $J$ at the parameter from (c) without baseline, the role of $\theta_1$ and $\theta_2$, and whether a finite $\theta$ can represent the optimal policy. The answer is a number plus explanations.

**Tool and why.** A direct softmax computation (cheat sheet §9), plus reading the logits: each coordinate of $\theta$ shifts specific logits, which tells what it does.

**Definitions.** No new notation; the logit of action $a$ in context $x$ is $\theta_1ax+\theta_2a^2$.

**Solution.**

Step 1, the logits for $x=+1$ at $\theta=(0.5,\tfrac2{15})$: for $a=+1$ it is $0.5+0.1333=0.6333$; for $a=0$ it is $0$; for $a=-1$ it is $-0.5+0.1333=-0.3667$.

Step 2, exponentiate: the weights are $e^{0.6333}\approx1.8839$, then $1$, then $e^{-0.3667}\approx0.6930$, with sum $3.5769$. So the probabilities of the actions $+1$, $0$, $-1$ are about $0.527$, $0.280$ and $0.194$.

Step 3, the value for $x=+1$, weighting each action by its reward:

$$J=\frac{1.8839+0.2}{3.5769}=\boxed{0.5826}$$

For $x=-1$ the value is the same: replacing $(x,a)$ by $(-x,-a)$ keeps $ax$, $a^2$ and the reward unchanged. So $J$ rose from $0.4$ to $0.5826$. After the baseline step instead, $J\approx0.5454$.

Step 4, the role of $\theta_1$: it adds $\theta_1ax$ to the logits, that is $+\theta_1$ for the action matching the context (reward $1$), $-\theta_1$ for the mismatched one (reward $0$), and nothing for the action $0$. Raising $\theta_1$ moves probability toward the matching action.

Step 5, the role of $\theta_2$: it adds $\theta_2$ to the logits of both non-zero actions and nothing to the action $0$, so it moves probability away from $a=0$. At uniform play a non-zero action earns $\tfrac12$ on average, more than the $0.2$ of the action $0$, so leaving the "safe" action pays and $\theta_2$ is pushed up; indeed $\partial J/\partial\theta_2$ is $\tfrac1{15}$ at $0$.

Step 6, the optimal policy plays $a=x$ deterministically and has $J=1$. For any finite $\theta$ every action has $\pi(a\mid x;\theta)>0$, so the action $0$ and the mismatched action keep positive probability and $J<1$. Letting $\theta_1\to\infty$ with $\theta_2$ fixed drives $J$ to $1$ (at $\theta=(20,0)$, $J\approx1-1.6\cdot10^{-9}$), but no finite $\theta$ reaches it.

**In words.** One gradient step already makes the agent match the context more and avoid the low-reward safe action; perfection would need infinite confidence, which a softmax never has.

**Sanity check.** A first-order prediction gives

$$J(0)+\nabla J(0)\cdot\theta^{(1)}=0.4+\tfrac13\cdot0.5+\tfrac1{15}\cdot\tfrac2{15}\approx0.5756,$$

close to the exact $0.5826$.

**What to write in the exam.**

- Logits $0.6333$, $0$, $-0.3667$; weights $1.8839$, $1$, $0.6930$.
- Value: $J$ is $\tfrac{1.8839+0.2}{3.5769}$, about $0.5826$, up from $0.4$.
- Parameter $\theta_1$ favours the matching action; $\theta_2$ moves mass from $a=0$ to the non-zero actions, which earn $\tfrac12$ on average.
- Softmax is always stochastic, so the optimum needs $\theta_1\to\infty$; no finite $\theta$.

*Verified: exact $J$ computed in Python at both parameters ($0.58259$ and $0.54542$), and at $\theta=(20,0)$.*

**Common mistakes.**

- Forgetting the gradient of $\ln Z$ and using the raw feature $\phi(x,a)$ as the score. The second component of the step comes out far too large, and the baseline argument breaks, because the raw feature does not have mean zero.
- Getting the sign of $ax$ wrong for $x=-1$: the action $a=-1$ matches that context and has $ax=+1$.
- Thinking the baseline changes the expected gradient, or that one baseline step must equal the step without it.

**💡 Trick.** Softmax score $=$ observed feature $-$ expected feature; at $\theta=0$ that is just $(ax,\ a^2-\tfrac23)$, and the expected gradient is $\mathrm{Cov}_\pi(r,\phi)$.

**⚠️ Watch out.** A sample with reward $0$ contributes nothing without a baseline — only $r-b$ makes it push the bad action down; and the $a^2$ feature is centred at $\tfrac23$, not at $0$.

## Q4 — A robust Bellman operator with two models

**Hint:** Two non-expansiveness facts carry the contraction: $|\max_a f-\max_a g|\le\max_a|f-g|$
and the same for $\min_i$. For (b), compare $T_Rv$ with $T_iv$ for the same $v$, and use that
$T_i$ is monotone. For (c), guess which action and which model are "active" in each state, solve
the linear equations, then check the guess.

**Full solution:**

**(a) $T_R$ is a $\gamma$-contraction**

**What is asked.** Prove that $T_R$ shrinks sup-norm distances by the factor $\gamma$, and conclude that it has a unique fixed point. The answer is a proof.

**Tool and why.** Operators, contraction and Banach's fixed-point theorem (cheat sheet §6). The robust operator is a linear look-ahead followed by a $\min$ and a $\max$; the linear part shrinks distances by $\gamma$, and we show that $\min$ and $\max$ do not enlarge them.

**Definitions.** Let

$$Q_i^v(s,a)=r(s,a)+\gamma\sum_{s'}P_i(s'\mid s,a)v(s'),$$

the one-step look-ahead value under model $i$. Then $(T_Rv)(s)=\max_a\min_iQ_i^v(s,a)$. We introduce it to separate the linear part from the $\max$ and $\min$.

**Solution.**

Step 1, **Claim** (non-expansiveness of $\min$): for finite families $f_i$ and $g_i$,

$$\Big|\min_if_i-\min_ig_i\Big|\le\max_i|f_i-g_i|.$$

Let $M=\max_i|f_i-g_i|$. For every $j$, $\min_if_i\le f_j$ and $f_j\le g_j+M$, so $\min_if_i\le g_j+M$; taking the minimum over $j$ gives $\min_if_i\le\min_ig_i+M$. Exchanging $f$ and $g$ gives the other direction. The same holds for $\max$, by applying the claim to $-f$ and $-g$.

Step 2, the linear part: the rewards cancel, and $P_i(\cdot\mid s,a)$ is a probability distribution, so

$$\begin{aligned}
|Q_i^u(s,a)-Q_i^w(s,a)|&=\gamma\Big|\sum_{s'}P_i(s'\mid s,a)(u-w)(s')\Big|\\
&\le\gamma\sum_{s'}P_i(s'\mid s,a)\,|u-w|(s')\\
&\le\gamma\|u-w\|_\infty.
\end{aligned}$$

Step 3, combine: the first row is Step 1 for $\max_a$, the second is Step 1 for $\min_i$, the third is Step 2.

$$\begin{aligned}
|(T_Ru)(s)-(T_Rw)(s)|&\le\max_a\Big|\min_iQ^u_i(s,a)-\min_iQ^w_i(s,a)\Big|\\
&\le\max_a\max_i|Q^u_i(s,a)-Q^w_i(s,a)|\\
&\le\gamma\|u-w\|_\infty.
\end{aligned}$$

Step 4, take the maximum over $s$:

$$\|T_Ru-T_Rw\|_\infty\le\gamma\|u-w\|_\infty.$$

Since $\gamma<1$ and $\mathbb{R}^{|S|}$ with the sup-norm is complete, Banach's theorem gives a unique fixed point $v_R$, and value iteration with $T_R$ converges to it from any start.

**In words.** Taking the best action or the worst model never stretches the distance between two value functions; only the look-ahead step acts on it, and that step shrinks it by $\gamma$.

**Sanity check.** If the two models coincide, the operator is the ordinary Bellman optimality operator, and the proof becomes the standard one.

**What to write in the exam.**

- Define $Q_i^v$; then $|Q_i^u-Q_i^w|\le\gamma\|u-w\|_\infty$ because $P_i$ is a distribution.
- Both $\min_i$ and $\max_a$ are non-expansive: $|\min f-\min g|\le\max|f-g|$.
- Chain them and take $\max_s$: contraction with factor $\gamma$; Banach gives a unique $v_R$.

*Verified: on 500 random MDPs with two models the ratio $\|T_Ru-T_Rw\|_\infty/\|u-w\|_\infty$ never exceeded $0.8992$, below $\gamma=0.9$.*

**(b) $v_R$ lies below both optimal values; the game interpretation**

**What is asked.** Prove $v_R\le V^*_1$ and $v_R\le V^*_2$ componentwise, and describe $v_R(s)$ as the value of a game. The answer is a proof plus an interpretation.

**Tool and why.** Comparison of operators plus monotonicity of the Bellman operator, then the limit of value iteration (cheat sheet §6 and §3). This is the standard way to compare fixed points without computing them.

**Definitions.** For vectors, $u\le w$ means componentwise. No other new notation.

**Solution.**

Step 1, **Claim.** $T_Rv\le T_iv$ for every $v$ and each $i$. For every $(s,a)$, $\min_jQ_j^v(s,a)\le Q_i^v(s,a)$, because a minimum is at most each of its terms. Taking $\max_a$ on both sides keeps the inequality.

Step 2, **Claim.** $T_i$ is monotone: if $u\le w$ then $T_iu\le T_iw$. Indeed $Q_i^u\le Q_i^w$ because the weights $P_i(s'\mid s,a)$ are non-negative, and $\max_a$ keeps the inequality.

Step 3, **Claim.** For every $k\ge1$, $v_R\le T_i^kv_R$. Induction on $k$, upward.

**Base.** For $k=1$: $v_R=T_Rv_R$ (fixed point), and $T_Rv_R\le T_iv_R$ by Step 1.

**Hypothesis.** For some $k\ge1$, $v_R\le T_i^kv_R$.

**Step.** Apply the monotone $T_i$ to the hypothesis (this is where it is used): $T_iv_R\le T_i^{k+1}v_R$. Together with the base, $v_R\le T_iv_R$, this gives $v_R\le T_i^{k+1}v_R$.

Step 4, limit: $T_i$ is a $\gamma$-contraction, so $T_i^kv_R\to V^*_i$; a componentwise inequality survives the limit. Hence

$$\boxed{v_R\le V^*_1}\qquad\boxed{v_R\le V^*_2}$$

Step 5, the game: at each step the agent, in state $s$, chooses an action $a$. Then nature, an adversary, sees $(s,a)$ and chooses which model $P_i$ generates the next state, separately at every visit. The agent maximizes and nature minimizes the discounted return, so $v_R(s)$ is the max-min value of this zero-sum game. The robust policy, the arg-max of $\min_iQ_i^{v_R}(s,a)$, is the best policy against the worst case. Because nature may use different models in different states, $v_R$ can be strictly below both $V^*_1$ and $V^*_2$, as (c) shows.

**In words.** An adversary who picks the dynamics can only hurt you, so the robust value is at most the value under any one fixed model.

**Sanity check.** If the two models coincide, then all three operators are equal and $v_R$ equals both optimal values, so the bound is tight in that case.

**What to write in the exam.**

- A minimum is at most each term, so $T_Rv\le T_iv$.
- Fixed point: $v_R=T_Rv_R$, which is at most $T_iv_R$; monotonicity gives $v_R\le T_i^kv_R$ by induction.
- Let $k\to\infty$: $v_R\le V^*_i$ for $i=1,2$.
- Game: agent picks $a$, then nature picks the model at every visit of $(s,a)$, to minimize the return.

*Verified: on 500 random two-model MDPs, value iteration gives $v_R\le V^*_1$ and $v_R\le V^*_2$ in every state.*

**(c) A two-state example**

**What is asked.** Show $v_R=(5,\tfrac{45}{14})$, find the robust policy, evaluate "always risky" against a nature that uses $P_2$ in $s_1$ and $P_1$ in $s_2$, and use it to explain why the robust policy differs from both models' optimal policies. The answer is numbers plus an explanation.

**Tool and why.** Guess-and-verify on the fixed point (cheat sheet §6): since $T_R$ is a contraction, any $v$ with $T_Rv=v$ is $v_R$, so a guessed policy and nature choice need only be checked. Policy evaluation is solving linear Bellman equations (cheat sheet §2).

**Definitions.** Write $v=(v(s_1),v(s_2))$ for the guess, and $v_1$, $v_2$ for the values of "always risky" against the stated nature.

**Solution.**

Step 1, the guess: play safe in $s_1$, and nature uses $P_1$ in $s_2$ (slow recovery).

Step 2, solve for the guess. In $s_1$, safe pays $0.5$ and stays:

$$v(s_1)=0.5+0.9\,v(s_1),$$

so $0.1\,v(s_1)=0.5$ and $v(s_1)=5$. In $s_2$ under $P_1$:

$$\begin{aligned}
v(s_2)&=0.9\big(0.2\cdot5+0.8\,v(s_2)\big)\\
&=0.9+0.72\,v(s_2),
\end{aligned}$$

so $0.28\,v(s_2)=0.9$, which gives

$$v(s_2)=\tfrac{45}{14}\approx3.214.$$

Step 3, check $T_Rv=v$ by computing every $Q_i^v$. For example, risky under $P_2$:

$$\begin{aligned}
1+0.9\big(0.5\cdot5+0.5\cdot\tfrac{45}{14}\big)&=1+0.9\cdot\tfrac{115}{28}\\
&=\tfrac{263}{56}.
\end{aligned}$$

All of them:

| state, action | under $P_1$ | under $P_2$ | min |
|---|---|---|---|
| $s_1$, risky | $\tfrac{299}{56}\approx5.339$ | $\tfrac{263}{56}\approx4.696$ | $4.696$ |
| $s_1$, safe | $5$ | $5$ | $5$ |
| $s_2$ | $\tfrac{45}{14}\approx3.214$ | $\tfrac{117}{28}\approx4.179$ | $3.214$ |

In $s_1$ the larger of the two minima is $\max(4.696,5)=5$, equal to $v(s_1)$, attained by safe. In $s_2$ the minimum is $\tfrac{45}{14}$, equal to $v(s_2)$. So $T_Rv=v$, and by uniqueness from (a)

$$\boxed{v_R=(5,\ 45/14)\approx(5,\ 3.214)}$$

The robust policy plays **safe** in $s_1$.

Step 4, compare: $V^*_1\approx(7.568,4.865)$ and $V^*_2\approx(6.457,5.669)$, so $v_R$ is strictly below both, in both states.

Step 5, "always risky" against nature using $P_2$ in $s_1$ and $P_1$ in $s_2$:

$$\begin{aligned}
v_1&=1+0.9(0.5v_1+0.5v_2),\\
v_2&=0.9(0.2v_1+0.8v_2).
\end{aligned}$$

The second equation gives $0.28\,v_2=0.18\,v_1$, so $v_2=\tfrac{9}{14}v_1$. Substituting into the first:

$$v_1\Big(1-0.45-0.45\cdot\tfrac{9}{14}\Big)=1,$$

and $1-0.45-\tfrac{81}{280}=\tfrac{73}{280}$, so

$$\boxed{v_1=\tfrac{280}{73}\approx3.836}$$

and $v_2=\tfrac{180}{73}$, about $2.466$. This nature is the worst response to "always risky": the robust evaluation of that policy gives the same values.

Step 6, the explanation: each model alone makes risky look great ($7.57$ under $P_1$, $6.46$ under $P_2$), but each model is bad in a **different** state: $P_2$ leaks out of $s_1$ fast, and $P_1$ recovers from $s_2$ slowly. The adversary combines the two weak spots and risky collapses to $3.84$, below the $5$ of safe. That is why the robust policy chooses safe, even though both nominal optimal policies choose risky.

**In words.** Safe is immune to the model choice, while risky is exposed to a nature that picks the worst model state by state; against such a nature immunity wins.

**Sanity check.** As (b) requires, $v_R(s_1)=5$ is below both $7.568$ and $6.457$. Also the robust value of risky, $3.836$, is below the value $5$ of safe, consistent with safe being the robust choice.

**What to write in the exam.**

- Guess safe in $s_1$ and $P_1$ in $s_2$: $v(s_1)=5$, $v(s_2)=\tfrac{45}{14}$.
- Check: risky gives $\min(5.339,4.696)=4.696$, below $5$; in $s_2$ the minimum is $\tfrac{45}{14}$; so $T_Rv=v$ and hence $v=v_R$.
- Always risky against $P_2$ in $s_1$ and $P_1$ in $s_2$: $v_1=\tfrac{280}{73}$, about $3.84$.
- Each model hurts risky in a different state; nature combines them, so robust plays safe.

*Verified: value iteration of $T_R$, $T_1$ and $T_2$ gives $(5,3.2143)$, $(7.5676,4.8649)$ and $(6.4567,5.6693)$; sympy solves the risky system exactly as $(\tfrac{280}{73},\tfrac{180}{73})$, matching robust evaluation of that policy.*

**Common mistakes.**

- Computing $v_R$ as the componentwise $\min(V^*_1,V^*_2)$, which is about $(6.457,4.865)$. Nature switches models state by state, so the true $v_R$ is $(5,3.214)$, much lower.
- Solving the equations for a guess and not checking $T_Rv=v$. Only the check, together with uniqueness, turns the guess into a proof.
- In (a), asserting that a max-min of contractions is a contraction without proving that $\min$ and $\max$ are non-expansive.

**💡 Trick.** $\min_i$ and $\max_a$ are both 1-Lipschitz in sup-norm, so the robust operator inherits the $\gamma$-contraction; $T_R\le T_i$ plus monotonicity gives $v_R\le V^*_i$.

**⚠️ Watch out.** $v_R$ is not $\min(V^*_1,V^*_2)$ — nature may switch models per state, so the worst case can be strictly worse than either model, and the robust policy can differ from both optimal policies.
