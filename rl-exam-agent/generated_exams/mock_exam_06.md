# Mock Exam 6 — Reinforcement Learning

generated 2026-10-28 · 3 hours · one A4 double-sided aid sheet + calculator · 4 questions · 100 points

This mock follows the recent (2024–2026) exam template: Q1 Planning (finite-horizon control on the
permutation group — sorting tiles with costly swaps), Q2 Planning (mixing two discount factors:
per-step random discount vs. per-episode random discount), Q3 Approximation (Monte-Carlo SGD with a
quadratic-in-features value model), Q4 Planning (contraction of an operator mixing $T^*$ and $T^\pi$).

## Question 1 (30 pts) — Sorting tiles with costly swaps

**Pillar:** Planning

$n$ distinct numbered tiles lie in a row and form a permutation $\sigma=(\sigma_1,\dots,\sigma_n)$ of
$\{1,\dots,n\}$. The **disorder** of $\sigma$ is its number of inversions,
$$\mathrm{inv}(\sigma)=\big|\{(i,j):\ i<j,\ \sigma_i>\sigma_j\}\big|.$$
The game lasts $T$ rounds $t=0,1,\dots,T-1$. In round $t$, in state $\sigma_t$, you choose one action:
$a_*$ (do nothing), or $a_i$ for $i\in\{1,\dots,n-1\}$ (swap the tiles in positions $i$ and $i+1$).
The reward of round $t$ is
$$r(\sigma_t,a_t)=-\,\mathrm{inv}(\sigma_t)\;-\;c\cdot\mathbb{1}[a_t\neq a_*],$$
i.e. you pay the current disorder, plus a swap fee $c>0$ if you swap. There is no terminal reward after
round $T-1$, and no discounting. Throughout, $c$ is **not an integer** (so no ties occur). Write
$h=T-t$ for the number of rounds still to be played (including the current one), and
$\Phi_h(\sigma)=-V^*_t(\sigma)$ for the optimal total cost-to-go.

**(a) [6 pts]** Write the problem formally as a finite-horizon MDP (states, actions, transitions, rewards,
horizon). Prove that an adjacent swap $a_i$ changes $\mathrm{inv}(\sigma)$ by exactly $\pm1$ (by $-1$ iff
$\sigma_i>\sigma_{i+1}$), and that every $\sigma$ with $\mathrm{inv}(\sigma)>0$ has such an adjacent
descent. Conclude that $\Phi_h(\sigma)$ depends on $\sigma$ only through $k=\mathrm{inv}(\sigma)$; write
$\Phi_h(k)$, and write the Bellman (backward-induction) equation for $\Phi_h(k)$ with $\Phi_0\equiv0$.

**(b) [12 pts]** For $0\le j\le\min(k,h)$ let
$$C_h(k,j)=\sum_{i=0}^{j-1}(k-i)\;+\;j\,c\;+\;(h-j)(k-j)$$
(the cost of swapping a descent in each of the first $j$ rounds and then doing nothing). Prove by
induction on $h$ that
$$\Phi_h(k)=\min_{0\le j\le \min(k,h)} C_h(k,j)\qquad\text{for all }h\ge0,\ k\ge0.$$
(You will need, and should prove, that $\Phi_h(k)$ is nondecreasing in $k$.)

**(c) [6 pts]** Compute $C_h(k,j+1)-C_h(k,j)$ and deduce the optimal number of swaps $j^*(h,k)$ in closed
form. State an optimal policy (for **every** state and round), and identify exactly the (state, round)
pairs at which $a_*$ is optimal.

**(d) [6 pts]** Let $n=4$, $\sigma_0=(4,3,2,1)$, $T=6$. Compute $V^*_0(\sigma_0)$ and the rounds in which the
optimal policy swaps, for $c=2.5$ and for $c=0.5$. In the case $c=0.5$, is the row sorted at the end?
Explain.

## Question 2 (30 pts) — Mixing two discount factors

**Pillar:** Planning

Let $M=(S,A,P,r,s_0)$ be a finite MDP with bounded rewards $r(s,a)\in\mathbb{R}$. For $\gamma\in[0,1)$
let $V^\pi_\gamma$ and $V^*_\gamma$ denote the value of policy $\pi$ and the optimal value under the
ordinary $\gamma$-discounted criterion. Fix $\gamma_1=0.5$, $\gamma_2=0.9$ and $\bar\gamma=\tfrac12(\gamma_1+\gamma_2)=0.7$.
We consider two ways of "mixing" the two discount factors; in both, the random discounts are independent
of the trajectory and are **not observed** by the agent.

- **Per-step mixing:** before every transition an independent fair coin draws $\Gamma_t\in\{\gamma_1,\gamma_2\}$
  (i.i.d., probability $\tfrac12$ each), and the return is
  $G=\sum_{t\ge0}\big(\prod_{i=1}^{t}\Gamma_i\big)\,r(s_t,a_t)$ (empty product $=1$).
  Let $U^\pi(s)=\mathbb{E}^\pi[G\mid s_0=s]$ and $U^*(s)=\sup_\pi U^\pi(s)$.
- **Per-episode mixing:** a single $\Gamma\in\{\gamma_1,\gamma_2\}$ is drawn once (probability $\tfrac12$ each)
  and the return is $G'=\sum_{t\ge0}\Gamma^t\,r(s_t,a_t)$. Let $W^\pi(s)=\mathbb{E}^\pi[G'\mid s_0=s]$.

**(a) [6 pts]** Prove that $W^\pi=\tfrac12V^\pi_{\gamma_1}+\tfrac12V^\pi_{\gamma_2}$ and that
$U^\pi=V^\pi_{\bar\gamma}$ for every policy $\pi$. Conclude that $U^*=V^*_{\bar\gamma}$ and that the
per-step problem has a stationary deterministic optimal policy.

**(b) [8 pts]** Fix a policy $\pi$. **(i)** Prove that if all rewards are nonnegative then
$U^\pi(s)\le W^\pi(s)$ for every $s$. **(ii)** Without the sign assumption, show by two explicit numerical
examples that neither $U^\pi\le W^\pi$ nor $U^\pi\ge W^\pi$ holds in general.

**(c) [8 pts]** Assume all rewards are nonnegative. Prove that
$U^*(s)\le\tfrac12V^*_{\gamma_1}(s)+\tfrac12V^*_{\gamma_2}(s)$ for every $s$, and give an example where the
inequality is strict (with numbers).

**(d) [8 pts]** Suppose a deterministic stationary policy $\pi$ is optimal both for $\gamma_1$ and for
$\gamma_2$. Must $\pi$ be optimal for the per-step mixed criterion? Prove it, or give an explicit MDP
(with all numbers) as a counterexample.

## Question 3 (20 pts) — MC-SGD with a quadratic-in-features value model

**Pillar:** Approximation

An episodic MDP with $\gamma=1$ and a fixed policy $\pi$; every state $s$ has a **scalar** feature
$\phi(s)\in\mathbb{R}$. We approximate the value with parameter $w=(w_1,w_2)\in\mathbb{R}^2$:
$$V_w(s)=w_1\,\phi(s)+w_2\,\phi(s)^2,$$
and minimize
$$J(w)=\frac12\sum_s\mu(s)\big(V^\pi(s)-V_w(s)\big)^2,$$
where $\mu(s)$ is the probability that an episode of $\pi$ visits $s$ (no state is visited twice in an
episode).

**(a) [5 pts]** Compute $\nabla_w V_w(s)$ and $\nabla_w J(w)$, and write the (full) gradient-descent update
with step size $\alpha$. Is $J$ convex in $w$? Justify.

**(b) [4 pts]** Write the Monte-Carlo SGD update performed at a visited state $s_t$, and explain why the
quantity you substitute for $V^\pi(s_t)$ is unbiased.

**(c) [5 pts]** Concrete chain: every episode starts at $A$. States $A,B,C$ have features
$\phi(A)=1,\ \phi(B)=2,\ \phi(C)=3$ and rewards $r(A)=1,\ r(B)=2,\ r(C)=4$ (collected on leaving the
state). After $A$ the episode moves to $B$ with probability $\tfrac12$ and otherwise terminates; after
$B$ it moves to $C$ with probability $\tfrac12$ and otherwise terminates; after $C$ it terminates.
Start from $w=(0,0)$ with $\alpha=0.1$. The observed episode is $A\to B\to\text{end}$. Perform the
MC-SGD updates at $A$ and then at $B$ (each using the current $w$) and report $w$ after each update.

**(d) [6 pts]** For the chain of (c), compute $V^\pi$ and $\mu$. Find the point $w^*$ at which the
**expected** MC-SGD update is zero, show it is the unique minimizer of $J$, and give $w^*$ exactly together
with the fitted values $V_{w^*}(A),V_{w^*}(B),V_{w^*}(C)$. Does $V_{w^*}$ equal $V^\pi$? Explain.

## Question 4 (20 pts) — An operator mixing evaluation and optimality

**Pillar:** Planning

Let $M=(S,A,P,r)$ be a finite MDP with bounded rewards, $\gamma\in(0,1)$, $\pi$ a fixed deterministic
policy and $\lambda\in[0,1]$. For $V\in\mathbb{R}^{|S|}$ write
$Q_V(s,a)=r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)V(s')$, and define
$$(T^*V)(s)=\max_a Q_V(s,a),\qquad (T^\pi V)(s)=Q_V(s,\pi(s)),\qquad T_\lambda=\lambda\,T^*+(1-\lambda)\,T^\pi.$$

**(a) [6 pts]** Prove that $T_\lambda$ is a $\gamma$-contraction in $\|\cdot\|_\infty$, so it has a unique
fixed point $V_\lambda$. What are $V_0$ and $V_1$?

**(b) [6 pts]** Prove that $V^\pi\le V_\lambda\le V^*$ pointwise.

**(c) [4 pts]** Show that $T_\lambda$ is exactly the Bellman optimality operator of another MDP
$M_\lambda$ on the same $S,A$ (give $r_\lambda$ and $P_\lambda$), and interpret $M_\lambda$ in words. What is
$V_\lambda$ in terms of $M_\lambda$?

**(d) [4 pts]** Example: two states $\{1,2\}$, $\gamma=0.9$, $\lambda=0.5$. In state $1$ there are two
actions: *stay* (reward $0$, remain in $1$) and *go* (reward $0$, move to $2$). State $2$ is absorbing with
reward $1$ per step (every action). $\pi$ always plays *stay* in state $1$. Compute $V^\pi(1)$, $V^*(1)$
and $V_\lambda(1)$. Is $V_\lambda=\lambda V^*+(1-\lambda)V^\pi$?
