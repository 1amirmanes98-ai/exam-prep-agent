# Mock Exam 5 — Reinforcement Learning

generated 2026-10-28 · 3 hours · one A4 double-sided aid sheet + calculator · 4 questions · 100 points

This mock follows the recent (2024–2026) exam template: Q1 Planning (model a battery-charging robot
as a discounted MDP, policy iteration by hand, threshold structure), Q2 Planning (which discounted
reward transforms preserve $\pi^*$), Q3 Approximation (policy gradient for a logistic-distributed
continuous action), Q4 Planning (contraction and fixed point of a capped $Q$-operator).

## Question 1 (30 pts) — Battery-charging robot: model, policy iteration, threshold

**Pillar:** Planning

A cleaning robot has a battery level $b\in\{0,1,2,3\}$ ($3$ = full, $0$ = empty). Time is discrete.
At every step:

- If $b=0$ the robot is stranded and **must be rescued**: this step gives reward $-C$ and the robot
  is brought back fully charged, i.e. the next level is $3$. (No other action is possible.)
- If $b\ge 1$ the robot chooses one of two actions:
  - **Work**: reward $+1$ (it cleans a room); the next level is $b-1$ with probability $q$ and stays
    $b$ with probability $1-q$.
  - **Charge**: reward $0$ (the step is spent at the dock); the next level is $3$ with certainty.

The objective is the expected **discounted** total reward with discount $\gamma$. Throughout use
$\gamma=0.9$, $q=\tfrac12$, $C=5$ (except in part (d)). In any improvement/greedy step, if both actions
attain the maximum, choose **Work**.

**(a) [5 pts]** Write the problem formally as a discounted MDP: the state space, the action set of every
state, the reward function and the transition probabilities.

**(b) [5 pts]** Write the Bellman optimality equations for $V^*(0),V^*(1),V^*(2),V^*(3)$ explicitly
(with the numbers $\gamma=0.9$, $q=\tfrac12$, $C=5$ substituted).

**(c) [12 pts]** Run **policy iteration** starting from $\pi_0$ = "always Work" (at every $b\ge1$).
For each policy write the policy-evaluation linear equations, solve them, compute the two
$Q$-values at every $b\in\{1,2,3\}$, and improve. Continue until the policy no longer changes.
Report the optimal policy $\pi^*$, $V^*$, and the number of policy evaluations performed.

**(d) [5 pts]** Now let $L\ge 2$ battery levels $\{0,1,\dots,L\}$ (Charge and rescue lead to level $L$)
and **arbitrary** $0<\gamma<1$, $0<q<1$, $C>0$. Prove that $V^*(b)$ is non-decreasing in $b$ and
deduce that the optimal policy is a **threshold** policy: there is $\tau\in\{0,1,\dots,L\}$ such that
Charge is strictly better than Work at level $b\ge 1$ if and only if $b\le\tau$.
*Hint:* show that one application of the Bellman optimality operator maps a non-decreasing vector to a
non-decreasing vector.

**(e) [3 pts]** Back to the numbers of (a)–(c). Run two steps of **value iteration** from $V_0\equiv 0$
and give $V_1$, $V_2$ and the greedy policy with respect to $V_2$. Is it already optimal? Is $V_2$ close
to $V^*$?

## Question 2 (30 pts) — Discounted reward transforms: which preserve the optimal policy

**Pillar:** Planning

Let $M=(S,A,P,r,\gamma)$ be a finite MDP with discount $\gamma=0.9$ (infinite-horizon discounted
return) and deterministic rewards $r(s,a)\in[0,1]$. Let $\pi^*$ be a deterministic stationary optimal
policy of $M$. In every part we build a new MDP $M'$ with the **same** $S,A,P,\gamma$ and a new reward
$r'$ (which may leave $[0,1]$). The question in every part is:

> Is $\pi^*$ **necessarily** (for every $M$ and every optimal $\pi^*$) an optimal policy of $M'$?

Answer **yes** with a proof, or **no** with an explicit counterexample: a concrete small MDP with all
numbers given, the relevant $Q$-values in $M$ and in $M'$, and the action that changes.

**(a) [8 pts]** *Potential-based shaping.* For an arbitrary function $\Phi:S\to\mathbb{R}$,
$$r'(s,a)=r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\,\Phi(s')-\Phi(s).$$
In your answer express $V'^{\pi}$ (the value of an arbitrary policy $\pi$ in $M'$) through $V^\pi$ and $\Phi$.

**(b) [5 pts]** *Shaping with the $\gamma$ forgotten.* For an arbitrary $\Phi:S\to\mathbb{R}$,
$$r'(s,a)=r(s,a)+\sum_{s'}P(s'\mid s,a)\,\Phi(s')-\Phi(s).$$

**(c) [5 pts]** *State-dependent positive scaling.* $r'(s,a)=c(s)\,r(s,a)$ where $c(s)>0$ for every
$s$ (possibly different constants in different states). Also state briefly what happens when
$c(s)\equiv c>0$ is the same constant everywhere.

**(d) [7 pts]** *Adding a constant $\beta>0$.*
 (i) $M$ is a continuing MDP and $r'(s,a)=r(s,a)+\beta$ for all $(s,a)$.
 (ii) $M$ has an absorbing **terminal** state $z$ with $r(z,a)=0$ (the episode is over once $z$ is
 reached), and the constant is added only at non-terminal states: $r'(s,a)=r(s,a)+\beta$ for
 $s\neq z$, $r'(z,a)=0$.

**(e) [5 pts]** *Squaring the rewards.* $r'(s,a)=r(s,a)^2$ (recall $r\ge 0$).

## Question 3 (20 pts) — Policy gradient for a logistic-distributed continuous action

**Pillar:** Approximation

The **logistic distribution** with location $\mu\in\mathbb{R}$ and scale $\sigma>0$ has density
$$f(a;\mu,\sigma)=\frac{e^{-(a-\mu)/\sigma}}{\sigma\,\big(1+e^{-(a-\mu)/\sigma}\big)^2},\qquad a\in\mathbb{R}.$$
You may use without proof: its mean is $\mu$ and its variance is $\sigma^2\pi^2/3$; also
$\tanh(u)=\frac{1-e^{-2u}}{1+e^{-2u}}$.

Every state $s$ has a feature vector $\phi(s)\in\mathbb{R}^d$. The policy has parameters
$\theta\in\mathbb{R}^d$ and $w\in\mathbb{R}$, and in state $s$ draws a real action
$a\sim f(\,\cdot\,;\mu,\sigma)$ with $\mu=\theta\cdot\phi(s)$ and $\sigma=e^{w}$.

**(a) [4 pts]** Show that $\log f(a;\mu,\sigma)$ is strictly concave in $a$ and that the density is
symmetric around $\mu$. Conclude that the most likely action is $a^*=\theta\cdot\phi(s)$.

**(b) [6 pts]** Compute $\nabla_\theta\log\pi(a\mid s;\theta,w)$ and
$\frac{\partial}{\partial w}\log\pi(a\mid s;\theta,w)$, writing them with $z=(a-\mu)/\sigma$.
Show that $\|\nabla_\theta\log\pi\|\le\|\phi(s)\|/\sigma$ for **every** action $a$, and contrast this
with the Gaussian policy. Write the REINFORCE update of $\theta$ at time $t$ of an episode.

**(c) [5 pts]** One-step problem (every episode is a single action): one state with $\phi\equiv1$ (so
$\mu=\theta$), the scale is frozen at $w=0$ ($\sigma=1$), and the reward of action $a$ is
$r(a)=-(a-1)^2$. Currently $\theta=0$, the step size is $\alpha=0.1$, and two independent episodes
produced the actions $a_1=1.5$ and $a_2=-0.5$.
 (i) Compute the REINFORCE gradient estimate (the average over the two episodes) and the new $\theta$.
 (ii) Repeat with the baseline $b=$ average of the two observed rewards (treat $b$ as a constant).
 Which update is larger, and in which direction do both move $\theta$?

**(d) [5 pts]** Same one-step problem but with reward $r(a)=-(a-c)^2$ for a constant $c$, and both
$\theta$ and $w$ learnable. Compute $J(\theta,w)=\mathbb{E}_{a\sim\pi}[r(a)]$ in closed form, find
$\partial J/\partial\theta$ and $\partial J/\partial w$, and determine all stationary points. What does
gradient ascent do to $\sigma$?

## Question 4 (20 pts) — A capped Q-operator: contraction and fixed point

**Pillar:** Planning

Let $M=(S,A,P,r)$ be a finite MDP with $r(s,a)\in[0,1]$, $0<\gamma<1$, and let $Q^*$ be its optimal
$Q$-function. For a constant $c\in\mathbb{R}$ define the operator $T_c$ on $Q\in\mathbb{R}^{|S|\cdot|A|}$:
$$(T_cQ)(s,a)=\min\Big\{\,r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\max_{a'}Q(s',a'),\ c\,\Big\}.$$

**(a) [3 pts]** Define when an operator $H$ is a $\gamma$-contraction in $\|\cdot\|_\infty$.

**(b) [6 pts]** Prove that $T_c$ is a $\gamma$-contraction in $\|\cdot\|_\infty$ for every $c$, and
conclude that it has a unique fixed point $\bar Q$.

**(c) [6 pts]** Prove that $\bar Q\le Q^*$ and $\bar Q\le c$ pointwise, and that
$\bar Q=Q^*$ **if and only if** $c\ge\max_{s,a}Q^*(s,a)$. Give a sufficient condition on $c$ that
depends only on $\gamma$.

**(d) [5 pts]** Let $\gamma=0.9$, $c=5$, $S=\{s_0,x,x_2,y\}$, $A=\{A,B\}$. In $s_0$: action $A$ gives
reward $0$ and moves to $x$; action $B$ gives reward $0$ and moves to $y$. In $x$, $x_2$, $y$ both actions
behave identically: $x\to x_2$ with reward $0$; $x_2\to x_2$ with reward $1$; $y\to y$ with reward
$0.8$ (all deterministic). Compute $Q^*$ and $\bar Q$ at every state. Is $\bar Q=\min\{Q^*,c\}$?
Is the greedy policy with respect to $\bar Q$ optimal in $M$?
