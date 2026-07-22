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

**(a)** The state must carry the time step and the observed value (the reward of Bet depends on $x_t$ and the horizon depends on $t$):

$$S=\{1,\dots,T\}\times\{1,\dots,k\}\ \cup\ \{\text{end}\},\qquad A=\{\text{Skip},\text{Bet}\},$$

$s_0$ is a distribution: state $(1,x)$ with probability $1/k$ for each $x\in\{1,\dots,k\}$ (the first draw is uniform).

$$R\big((t,x),\text{Skip}\big)=0,\qquad R\big((t,x),\text{Bet}\big)=\mathrm{sign}(x-y),\ \ y\sim\text{Unif}\{1,\dots,k\},$$

whose expectation is $g(x):=\dfrac{(x-1)-(k-x)}{k}=\dfrac{2x-1-k}{k}$. Transitions: from $(t,x)$, **Skip** $\to(t+1,x')$ with $x'\sim\text{Unif}\{1,\dots,k\}$ for $t<T$ (and $\to\text{end}$ at $t=T$); **Bet** $\to\text{end}$. State $\text{end}$ is absorbing with reward $0$.

**(b)** The expected Bet payoff is

$$g(x)=\frac{2x-1-k}{k},\qquad\text{for }k=5:\quad g=(-0.8,\,-0.4,\,0,\,0.4,\,0.8)\ \text{for }x=1,\dots,5.$$

Backward induction. At the **last** step $t=2$, Bet gives $g(x_2)$ and Skip gives $0$, so the player Bets iff $g(x_2)\ge0$, i.e. $x_2\ge3$. The value of entering step $2$ (before the draw) is

$$C_2=\mathbb{E}_x[\max(g(x),0)]=\tfrac15(0+0+0+0.4+0.8)=\tfrac{6}{25}=0.24.$$

At $t=1$, Bet gives $g(x_1)$ and Skip gives $C_2=0.24$, so the player Bets iff $g(x_1)\ge0.24$, i.e. $x_1\ge4$. Hence

- $\pi^*(t{=}1,x_1)=\textbf{Bet}$ if $x_1\in\{4,5\}$, else **Skip**.
- $\pi^*(t{=}2,x_2)=\textbf{Bet}$ if $x_2\in\{3,4,5\}$ (at $x_2=3$ both actions are optimal), **Skip** if $x_2\in\{1,2\}$.

($V^*_{2,5}=\mathbb{E}_x[\max(g(x),0.24)]=0.384$, python-verified.)

**(c)** **Yes.** The optimal policy is a threshold rule (part e), so on any realization where every $x_t$ falls below that step's threshold — e.g. $x_1=\dots=x_T=1$, the smallest value, for which $g(1)=\tfrac{1-k}{k}<0$ is below every continuation value — the optimal action is Skip at each step. So such observation sequences make the optimal policy skip throughout.

**(d)** Let $V_n$ be the optimal value with $n$ steps remaining, so $V_0=0$ and

$$V_n=\mathbb{E}_x\big[\max\big(g(x),\,V_{n-1}\big)\big],\qquad V^*_{T,k}=V_T.$$

Since $\max(g(x),V_{n-1})\ge V_{n-1}$ we get $V_n\ge V_{n-1}$, and the gap is

$$V_n-V_{n-1}=\mathbb{E}_x\big[(g(x)-V_{n-1})^+\big]>0,$$

strict because $x=k$ has $g(k)=\tfrac{k-1}{k}>V_{n-1}$ for every finite $n$ (so $\Pr[g(x)>V_{n-1}]\ge\tfrac1k$). Hence $T_1<T_2\Rightarrow V^*_{T_1,k}<V^*_{T_2,k}$. (For $k=5$: $V_{1..6}=0.24,0.384,0.470,0.536,0.589,0.631$ — strictly increasing, python-verified.)

**(e)** At time $t$ the value of Skip is the continuation value $C_t=V_{T-t}$, which does **not** depend on $x_t$, whereas the value of Bet, $g(x_t)=\tfrac{2x_t-1-k}{k}$, is **strictly increasing** in $x_t$. Therefore Bet is optimal iff $g(x_t)\ge C_t$, i.e.

$$x_t\ \ge\ \frac{kC_t+1+k}{2},$$

so with $\theta_t$ the largest integer with $g(\theta_t)<C_t$ the player Bets iff $x_t>\theta_t$ — a threshold policy.

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

**(a)** In $s_1$ both actions have reward $0$, but $a_2$ reaches the rewarding state $s_2$ for sure while $a_1$ only with probability $\tfrac12$, so $\pi^*(s_1)=a_2$. Solving $V^*(s_1)=\gamma V^*(s_2)$ and $V^*(s_2)=1+\gamma\big(\tfrac12V^*(s_1)+\tfrac12V^*(s_2)\big)$ with $\gamma=\tfrac12$,

$$V^*(s_2)=\frac{1}{1-\tfrac34\gamma-\tfrac14\gamma^2}\ \Big|_{\gamma=1/2}=\frac{1}{0.625}=1.6,\qquad V^*(s_1)=\gamma V^*(s_2)=0.8.$$

So $\pi^*=(a_2\text{ in }s_1),\ V^*(s_1)=0.8,\ V^*(s_2)=1.6$. (Check: $Q(s_1,a_2)=0.8>Q(s_1,a_1)=0.6$.)

**(b)** Writing the two policy-evaluation equations for $\pi_x$ and solving (with $\gamma=\tfrac12$),

$$V^{\pi_x}(s_1)=\frac{4-2x}{5-x},\qquad V^{\pi_x}(s_2)=\frac{8-2x}{5-x}.$$

(Sanity: $x=0\Rightarrow(0.8,1.6)=V^*$; $x=1\Rightarrow(0.5,1.5)$; $x=\tfrac12\Rightarrow(0.667,1.556)$ — python-verified.)

**(c)** Start from $\pi_x$ with $x=1$ (always $a_1$ in $s_1$), whose value is $V^{\pi_1}=(0.5,1.5)$. Greedy improvement in $s_1$:

$$Q(s_1,a_1)=\gamma\big(\tfrac12V^{\pi_1}(s_1)+\tfrac12V^{\pi_1}(s_2)\big)=0.5,\qquad Q(s_1,a_2)=\gamma V^{\pi_1}(s_2)=0.75,$$

so the greedy action is $a_2$: $\pi'=(a_2\text{ in }s_1)$, which is already optimal. Policy iteration therefore **converges in 2 iterations** (one improvement to $a_2$, then a second iteration that re-selects $a_2$ and detects no change).

**(d)** Value iteration $V_{i+1}(s_1)=\max\{\gamma(\tfrac12V_i(s_1)+\tfrac12V_i(s_2)),\ \gamma V_i(s_2)\}$, $V_{i+1}(s_2)=1+\gamma(\tfrac12V_i(s_1)+\tfrac12V_i(s_2))$, from $V_0=(1,0)$:

$$V_1=(0.25,\,1.25),\qquad V_2=(0.625,\,1.375),\qquad V_3=(0.6875,\,1.5).$$

(python-verified; the values climb toward $V^*=(0.8,1.6)$.)

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

**(a)** The derivative of softplus is the sigmoid, $\nabla_\theta\hat V(s;\theta)=\sigma(\phi(s)\cdot\theta)\,\phi(s)$ with $\sigma(z)=\tfrac{1}{1+e^{-z}}$. Hence $\nabla_\theta J^\pi=-\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta)\big)\sigma(\phi(s)\cdot\theta)\phi(s)$ and the descent step is

$$\theta^{t+1}=\theta^{t}+\alpha\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta^{t})\big)\,\sigma(\phi(s)\cdot\theta^{t})\,\phi(s).$$

**(b)** The **return-to-go** from the first visit to $s$ in an episode generated by $\pi$,

$$\hat G(s)=\sum_{k\ge t(s)}\gamma^{\,k-t(s)}r_k,$$

is an unbiased estimator: $\mathbb{E}[\hat G(s)\mid s_{t(s)}=s]=V^\pi(s)$ by definition of the value function.

**(c)** Sampling a state $s$ along an episode of $\pi$ realizes the distribution $\mu$, so a single-sample stochastic gradient replaces the $\sum_s\mu(s)$ average and $V^\pi(s)$ by the return $\hat G(s)$:

$$\theta^{t+1}=\theta^{t}+\alpha\big(\hat G(s)-\hat V(s;\theta^{t})\big)\,\sigma(\phi(s)\cdot\theta^{t})\,\phi(s).$$

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

**(a)** $H$ is $0.01$-contracting in $\|\cdot\|_\infty$ if

$$\|HU-HV\|_\infty\le 0.01\,\|U-V\|_\infty\qquad\text{for all }U,V.$$

**(b)** For every $s$, the $r(s,a)$ terms are identical for $U$ and $V$, so

$$\big|(TU-TV)(s)\big|\le\tfrac12|U(s)-V(s)|+\tfrac12\Big|\max_a\mathbb{E}_{s'}\gamma U(s')-\max_a\mathbb{E}_{s'}\gamma V(s')\Big|\le\tfrac12\|U-V\|_\infty+\tfrac{\gamma}{2}\|U-V\|_\infty,$$

using $|\max f-\max g|\le\max|f-g|$ and $|\mathbb{E}X|\le\mathbb{E}|X|$. Taking the max over $s$,

$$\|TU-TV\|_\infty\le\frac{1+\gamma}{2}\,\|U-V\|_\infty,\qquad\boxed{\ \beta=\frac{1+\gamma}{2}\ }<1\ \text{for }\gamma<1.$$

**(c)** At the fixed point $U^*=TU^*$, the $\tfrac12U^*(s)$ terms cancel:

$$U^*(s)=\tfrac12U^*(s)+\tfrac12\max_a\mathbb{E}_{s'}[r(s,a)+\gamma U^*(s')]\ \Longrightarrow\ U^*(s)=\max_a\ \mathbb{E}_{s'\sim p(\cdot\mid s,a)}[r(s,a)+\gamma U^*(s')].$$

This is exactly the Bellman optimality equation, so $U^*=V^*_M$ — the **optimal value function of the MDP $M$**.

**💡 Trick.** The extra $\tfrac12U(s)$ term looks like it should break the contraction, but it only relaxes the rate to $\beta=\tfrac{1+\gamma}{2}$; and at the fixed point the two $\tfrac12U^*(s)$ cancel, leaving the ordinary Bellman optimality equation — so $U^*=V^*$.

**⚠️ Watch out.** $\beta=\tfrac{1+\gamma}{2}$, **not** $\gamma$ — the identity part slows the contraction (as $\gamma\to1$, $\beta\to1$), yet it is still $<1$, so Banach still gives a unique fixed point; don't claim the rate is $\gamma$.
