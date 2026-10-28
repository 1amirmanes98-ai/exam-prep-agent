# Mock Exam 4 — Reinforcement Learning

generated 2026-10-28 · 3 hours · one A4 double-sided aid sheet + calculator · 4 questions · 100 points

This mock follows the recent (2024–2026) exam template: Q1 Planning (a push-your-luck dice game:
MDP, Bellman equation, threshold policy), Q2 Bandits (pairwise-min feedback, explore-then-commit
regret with and without an anchor arm), Q3 Approximation (Monte-Carlo SGD for a saturating value
model), Q4 Planning (the soft log-sum-exp Bellman operator: contraction and distance to $V^*$).

## Question 1 (30 pts) — Skull dice: when to bank the pot

**Pillar:** Planning

A player has a **pot** that starts at $k=0$ and may roll a fair six-sided die **at most $N$ times**.
Before each roll the player chooses one of two actions:

- **Bank**: the game ends and the player receives the current pot $k$.
- **Roll** (allowed only if at least one roll is left): the die is rolled. If it shows a **skull**
  (face $1$ or $2$, probability $\tfrac13$) the player **busts**: the game ends and the player
  receives $0$. If it shows $d\in\{3,4,5,6\}$ (each with probability $\tfrac16$), the pot becomes
  $k+d$ and one roll is used up.

When no rolls are left the player must Bank. The objective is the expected final payoff
(undiscounted, $\gamma=1$). Tie-breaking: when Bank and Roll have equal value, the player Banks.

**(a) [6 pts]** Model the game as a finite-horizon MDP: states, actions, rewards (non-negative),
transitions, initial state and horizon.

**(b) [5 pts]** Let $V_n(k)$ be the optimal expected payoff when the pot is $k$ and $n$ rolls are
left. Write the Bellman equation for $V_n(k)$ ($n\ge1$) with its boundary condition, and give
$V_1(k)$ explicitly as a function of $k$.

**(c) [10 pts]** Prove that the optimal policy is a **threshold** policy whose threshold does
**not** depend on the number of remaining rolls: there is a single $\theta$ such that for every
$n\ge1$ the player Rolls iff $k<\theta$. Find $\theta$.
*Hint: show first that $V_n(k)=k$ for all $k\ge\theta$ and all $n$, and note that the pot never
decreases unless you bust.*

**(d) [6 pts]** For $N=3$ compute the optimal value $V_3(0)$ and the probability that the optimal
player ends the game with payoff $0$. Explain why $V_N(0)=V_3(0)$ for every $N\ge3$.

**(e) [3 pts]** Suppose now every roll costs $c\in[0,3)$ (paid whether or not you bust; the payoff
is the banked pot minus the total cost paid). How does the threshold change? Give it for $c=1$.

## Question 2 (30 pts) — Pairwise-min bandit: explore-then-commit with and without an anchor

**Pillar:** Bandits

A bandit has $k\ge3$ arms; arm $i$ gives a Bernoulli reward with unknown mean $p_i$, and
$p_1\ge p_2\ge\cdots\ge p_k$ (the labels are **not** known to the agent). In every round
$t=1,\dots,T$ the agent chooses a **pair** $S_t=\{i,j\}$ of two distinct arms; independent rewards
$R_i\sim\mathrm{Ber}(p_i)$, $R_j\sim\mathrm{Ber}(p_j)$ are drawn, and the agent receives and
observes **only** $R_{S}=\min\{R_i,R_j\}$. Write $\mu_S=\mathbb{E}[R_S]$, $S^*=\arg\max_S\mu_S$, and

$$\mathrm{Reg}(T)=T\,\mu_{S^*}-\sum_{t=1}^{T}\mathbb{E}\big[\mu_{S_t}\big].$$

**(a) [5 pts]** Compute $\mu_{\{i,j\}}$, identify $S^*$ and its expected reward.

**(b) [7 pts]** *Algorithm A (all pairs).* With a parameter $m$: explore each of the
$K=\binom{k}{2}$ pairs exactly $m$ times; let $\hat\mu_S$ be the empirical mean of pair $S$; commit
to $\hat S=\arg\max_S\hat\mu_S$ for the remaining $T-Km$ rounds. Find $\lambda_m$ (a function of
$m,K,\delta$) such that with probability at least $1-\delta$, $|\hat\mu_S-\mu_S|\le\lambda_m$
simultaneously for all pairs $S$.

**(c) [10 pts]** Prove $\mathrm{Reg}_A(T)\le Km+2T\lambda_m+T\delta$. Then choose $\delta$ and $m$
(up to constant factors) and show $\mathrm{Reg}_A(T)=\tilde O\big(k^{2/3}T^{2/3}\big)$.

**(d) [8 pts]** *Algorithm B (anchor).* Now suppose arm $k$ is an **anchor**: its mean
$p_k=q\in(0,1]$ is **known**, and $q\le p_i$ for all $i$. Algorithm B explores only the $k-1$ pairs
$\{i,k\}$, $i<k$, $m$ times each, sets $\hat p_i=\tfrac1q\cdot(\text{empirical mean of }\{i,k\})$,
and commits to the two arms with the largest $\hat p_i$.
Show that, on the event that $|\hat p_i-p_i|\le\varepsilon$ for all $i<k$, the committed pair
loses at most $4\varepsilon$ per round, and derive
$\mathrm{Reg}_B(T)=\tilde O\big(k^{1/3}T^{2/3}q^{-2/3}\big)$. For which $q$ (in terms of $k$, ignoring
constants and logs) is B better than A? Why does a small anchor mean $q$ hurt?

## Question 3 (20 pts) — Monte-Carlo SGD for a saturating value model

**Pillar:** Approximation

States are positive numbers $s>0$ (e.g. an inventory level). For a fixed policy $\pi$ we
approximate $V^\pi$ by the saturating model

$$\hat V(s;a,b)=\frac{a\,s}{b+s},\qquad \theta=(a,b),\ b>0,$$

and minimize $J^\pi(\theta)=\tfrac12\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta)\big)^2$, where
$\mu(s)$ is the probability that $\pi$ visits $s$ (no state is visited twice in an episode).

**(a) [5 pts]** Compute $\nabla_\theta\hat V(s;\theta)$ and write the (full) gradient-descent update
for $J^\pi$ with step size $\alpha$.

**(b) [4 pts]** Write the Monte-Carlo SGD update from a visited state $s_t$ with return $G_t$, and
explain why it is a valid stochastic gradient step on $J^\pi$.

**(c) [6 pts]** Start from $\theta_0=(a,b)=(2,1)$, $\alpha=0.1$, $\gamma=1$. One episode is observed:
$s_0=1\xrightarrow{r=1}s_1=3\xrightarrow{r=2}\text{terminal}$. Compute the returns and perform the
two MC-SGD updates **in time order** ($s_0$ first, each update using the current parameters).
Give $\theta_1$ and $\theta_2$ (exact fractions or 4 decimals).

**(d) [5 pts]** Write the two equations a stationary point of $J^\pi$ satisfies. Independently of
(c), suppose $\mu$ puts mass $\tfrac12$ on each of $s=1$ and $s=3$, with $V^\pi(1)=1$, $V^\pi(3)=2$.
Find a parameter $\theta$ with $b>0$ that minimizes $J^\pi$, and verify it satisfies your
equations. What does MC-SGD with small step sizes converge to (in expectation) here?

## Question 4 (20 pts) — The soft (log-sum-exp) Bellman operator

**Pillar:** Planning

Let $M=(S,A,P,r,\gamma)$ be a finite discounted MDP, $0<\gamma<1$, $|A|\ge2$, and let $\tau>0$ be
a temperature. For $V\in\mathbb{R}^{|S|}$ write $Q_V(s,a)=r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)V(s')$
and define

$$(T_\tau V)(s)=\tau\log\sum_{a\in A}\exp\!\Big(\frac{Q_V(s,a)}{\tau}\Big),\qquad (TV)(s)=\max_a Q_V(s,a).$$

Let $V^*$ be the fixed point of $T$ (the optimal value function).

**(a) [4 pts]** For $x\in\mathbb{R}^{|A|}$ let $f_\tau(x)=\tau\log\sum_a e^{x_a/\tau}$. Prove
$\max_a x_a\le f_\tau(x)\le\max_a x_a+\tau\log|A|$, and $|f_\tau(x)-f_\tau(y)|\le\max_a|x_a-y_a|$.

**(b) [6 pts]** Prove that $T_\tau$ is a $\gamma$-contraction in $\|\cdot\|_\infty$; conclude it has
a unique fixed point $V_\tau$.

**(c) [6 pts]** Prove
$$V^*(s)\ \le\ V_\tau(s)\ \le\ V^*(s)+\frac{\tau\log|A|}{1-\gamma}\qquad\text{for all }s.$$

**(d) [4 pts]** Show the upper bound in (c) is tight: give a one-state MDP in which
$V_\tau-V^*=\tfrac{\tau\log|A|}{1-\gamma}$ exactly. Evaluate $V^*$ and $V_\tau$ for $|A|=2$, all
rewards $r=1$, $\gamma=0.9$, $\tau=0.1$.
