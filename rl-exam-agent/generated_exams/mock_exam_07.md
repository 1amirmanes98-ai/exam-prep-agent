# Mock Exam 7 — Reinforcement Learning

generated 2026-10-28 · 3 hours · one A4 double-sided aid sheet + calculator · 4 questions · 100 points

This mock follows the recent (2024–2026) exam template: Q1 Planning (keep-the-best-of-$n$
optimal stopping, with and without a holding cost), Q2 Bandits (thresholding-bandit
identification by elimination), Q3 Approximation (softmax policy gradient with action-quadratic
features in a contextual problem), Q4 Planning (a robust two-model Bellman operator).

## Question 1 (30 pts) — Keep the best of n uniform offers

**Pillar:** Planning

You are selling a car and will receive at most $n$ offers, one per day. The offers
$X_1,X_2,\dots,X_n$ are i.i.d. **Uniform$[0,1]$** and you see $X_t$ on day $t$. On seeing an
offer you either **accept** it (you receive $X_t$ and the process ends) or **reject** it (it is
lost forever, no recall). If you reach day $n$, you must accept $X_n$. There is no discounting
($\gamma=1$). Up to part (d) there is no cost for waiting. Ties ($X_t$ exactly equal to a
threshold) have probability $0$; break them toward **accept**.

Let $a_k$ denote the optimal expected payoff when $k$ offers are still to come and the next one
has **not yet been seen** ($a_0$ is undefined; you may not run out of offers).

**(a) [8 pts]** Model the problem as a finite-horizon MDP: states (including a terminal state),
actions, rewards, transitions and horizon. Explain why the state needs the current offer and the
number of remaining offers, but not the history of rejected offers.

**(b) [10 pts]** Write the Bellman optimality equation for $V_k(x)$, the optimal value when the
current offer is $x$ and $k$ offers remain **including** the current one. Prove that the optimal
policy is a **threshold** policy — accept $x$ iff $x\ge a_{k-1}$ — and show that $a_1=\tfrac12$ and
$$a_{k+1}=\frac{1+a_k^2}{2},\qquad k\ge1.$$
Then prove by induction that $\tfrac12\le a_k<a_{k+1}<1$ for all $k\ge1$.

**(c) [6 pts]** Take $n=5$. Give the thresholds used on days $1,\dots,5$ and the optimal expected
payoff $a_5$ (exact fraction or 4 decimals). How much better is this than accepting the first
offer?

**(d) [6 pts]** Now every **rejection** costs $c\ge0$ (a parking fee for one more day). Show that the
recursion becomes $a_{k+1}=\tfrac12\big(1+(a_k-c)^2\big)$ (as long as $0\le a_k-c\le1$) and that on a
day with $k$ offers still to come after today you accept iff $x\ge a_k-c$. For $c=0.02$ and $n=5$
give the five thresholds and $a_5$. Finally, show that as $n\to\infty$ the first-day threshold
tends to $1-\sqrt{2c}$, and evaluate it for $c=0.02$.

## Question 2 (30 pts) — Thresholding bandit: which arms clear the bar?

**Pillar:** Bandits

A stochastic bandit has $K$ arms; pulling arm $i$ returns an i.i.d. reward in $[0,1]$ with unknown
mean $\mu_i$. A known threshold $\tau\in(0,1)$ is given, and no arm has mean exactly $\tau$. Define
the gap $\Delta_i=|\mu_i-\tau|>0$. The goal is to output the set $G=\{i:\mu_i>\tau\}$ exactly, with
probability at least $1-\delta$, using as few samples as possible.

**Algorithm (sample-and-classify).** Keep an active set, initially all $K$ arms. In round
$r=1,2,\dots$ pull **every** active arm once; let $\hat\mu_{i,r}$ be arm $i$'s empirical mean after its
$r$ pulls and
$$c_r=\sqrt{\frac{\ln\!\big(4Kr^2/\delta\big)}{2r}}.$$
If $\hat\mu_{i,r}-c_r>\tau$, put $i$ in $\hat G$ and deactivate it; if $\hat\mu_{i,r}+c_r<\tau$, declare
$i$ "below" and deactivate it. Stop when no arm is active and output $\hat G$.

**(a) [8 pts]** Using Hoeffding's inequality and a union bound over arms **and rounds**, prove that
the "clean event"
$$\mathcal{E}=\big\{\,|\hat\mu_{i,r}-\mu_i|\le c_r\ \ \text{for all arms }i\text{ and all rounds }r\ge1\,\big\}$$
has probability at least $1-\delta$. (You may use $\sum_{r\ge1}1/r^2=\pi^2/6$.) Why does the width
need the $r^2$ inside the logarithm?

**(b) [7 pts]** Prove that on $\mathcal{E}$ every arm the algorithm classifies is classified
**correctly**; conclude $\Pr[\hat G=G]\ge1-\delta$ (assuming the algorithm stops, shown in (c)).

**(c) [9 pts]** Prove that on $\mathcal{E}$ arm $i$ is deactivated no later than the first round
$r_i$ with $c_{r_i}<\Delta_i/2$. Deduce that the total number of samples is
$$O\!\Big(\sum_{i=1}^K\frac{1}{\Delta_i^2}\,\ln\frac{K}{\delta\,\Delta_i}\Big),$$
and explain why this is better than sampling all arms uniformly until the hardest one is decided.

**(d) [6 pts]** Take $K=4$, $\tau=0.5$, $\mu=(0.9,\ 0.6,\ 0.45,\ 0.2)$, $\delta=0.1$. Compute the gaps
and the bound $r_i$ from (c) for each arm. (Hint: $c_r<\Delta/2$ iff
$r>\tfrac{2}{\Delta^2}\ln(4Kr^2/\delta)$; iterate $r\leftarrow\tfrac{2}{\Delta^2}\ln(4Kr^2/\delta)$ a few
times from $r=1/\Delta^2$.) Compare the total $\sum_i r_i$ with $K\max_i r_i$.

## Question 3 (20 pts) — Softmax policy gradient with a quadratic action feature

**Pillar:** Approximation

A one-step contextual problem: a context $x\in\{+1,-1\}$ is drawn uniformly, the agent picks an
action $a\in\{-1,0,+1\}$, receives reward $r(x,a)$ and the episode ends. The rewards are
$$r(x,a)=\begin{cases}1 & a=x,\\ 0.2 & a=0,\\ 0 & a=-x.\end{cases}$$
The policy is a softmax over the features $\phi(x,a)=(a\,x,\ a^2)^\top\in\mathbb{R}^2$:
$$\pi(a\mid x;\theta)=\frac{\exp\big(\theta^\top\phi(x,a)\big)}{\sum_{b\in\{-1,0,1\}}\exp\big(\theta^\top\phi(x,b)\big)},\qquad \theta=(\theta_1,\theta_2)^\top,$$
and the objective is $J(\theta)=\mathbb{E}_{x}\,\mathbb{E}_{a\sim\pi(\cdot\mid x;\theta)}[r(x,a)]$.

**(a) [5 pts]** Derive $\nabla_\theta\log\pi(a\mid x;\theta)$ in general, and tabulate it at
$\theta=0$ for all six pairs $(x,a)$.

**(b) [6 pts]** At $\theta=0$ compute $J(0)$ and the exact gradient
$\nabla J(0)=\mathbb{E}_x\mathbb{E}_{a\sim\pi}\big[r(x,a)\,\nabla_\theta\log\pi(a\mid x;\theta)\big]$.

**(c) [5 pts]** Four episodes are sampled with $\theta=0$:
$(x,a,r)=(+1,+1,1)$, $(-1,-1,1)$, $(+1,0,0.2)$, $(-1,+1,0)$. Do one REINFORCE step with step size
$\alpha=1$, averaging over the batch:
$$\theta\leftarrow\theta+\frac{\alpha}{4}\sum_{j=1}^{4} r_j\,\nabla_\theta\log\pi(a_j\mid x_j;\theta).$$
Repeat with the baseline $b=0.4$ (replace $r_j$ by $r_j-b$).

**(d) [4 pts]** Compute $J$ at the parameter obtained **without** baseline, and explain the direction
of improvement: what does increasing $\theta_1$ do, and why is $\theta_2$ pushed up? Can any finite
$\theta$ represent the optimal policy?

## Question 4 (20 pts) — A robust Bellman operator with two models

**Pillar:** Planning

A finite MDP has states $S$, actions $A$, rewards $r(s,a)$ and discount $0<\gamma<1$, but the
transition kernel is only known to be one of two models $P_1,P_2$. For $v\in\mathbb{R}^{|S|}$ define
$$(T_Rv)(s)=\max_{a\in A}\ \min_{i\in\{1,2\}}\Big[r(s,a)+\gamma\sum_{s'}P_i(s'\mid s,a)\,v(s')\Big].$$
Let $T_i$ denote the ordinary Bellman optimality operator of model $P_i$, with fixed point $V^*_i$.

**(a) [7 pts]** Prove that $T_R$ is a $\gamma$-contraction in $\|\cdot\|_\infty$, so it has a unique
fixed point $v_R$.

**(b) [6 pts]** Prove that $v_R\le V^*_1$ and $v_R\le V^*_2$ componentwise. Interpret $v_R(s)$ as
the value of a game: who chooses what, and when?

**(c) [7 pts]** Two states, $\gamma=0.9$. In state $s_1$ there are two actions: **risky** (reward
$1$; stays in $s_1$ w.p. $0.9$ under $P_1$ and w.p. $0.5$ under $P_2$, otherwise moves to $s_2$) and
**safe** (reward $0.5$; stays in $s_1$ w.p. $1$ under both models). State $s_2$ has one action
(reward $0$; moves to $s_1$ w.p. $0.2$ under $P_1$ and w.p. $0.8$ under $P_2$, otherwise stays). You
may use $V^*_1=(280/37,\ 180/37)$ and $V^*_2=(820/127,\ 720/127)$ (both models' optimal policies
play risky).
Show that $v_R=(5,\ 45/14)$ and find the robust policy. Then compute the value of the policy
"always risky" when nature uses $P_2$ in $s_1$ and $P_1$ in $s_2$, and use it to explain why the
robust policy differs from both models' optimal policies.
