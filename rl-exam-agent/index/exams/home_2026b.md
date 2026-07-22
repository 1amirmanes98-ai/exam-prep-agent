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

**(a)** The state is the current composition of the box, $(b',g')=$ ($b'$ blue, $g'$ green):

$$S=\{(b',g'):b'+g'\le b\}\cup\{\text{end}\},\qquad A=\{\text{stop},\text{continue}\},\qquad s_0=(b-g,\ g).$$

Rewards: $R((b',g'),\text{stop})=\dfrac{b'}{b'+g'}$ (expected: $+1$ w.p. the drawn ball is blue), $R((b',g'),\text{continue})=0$, and the forced one-ball states give $R((1,0))=1,\ R((0,1))=0$. Transitions for **continue**:

$$(b',g')\ \to\ (b'-1,g')\ \text{w.p.}\ \tfrac{b'}{b'+g'},\qquad (b',g')\ \to\ (b',g'-1)\ \text{w.p.}\ \tfrac{g'}{b'+g'};$$

**stop** $\to\text{end}$ (absorbing, reward $0$).

**(b)** Stopping now pays the probability the drawn ball is blue, $\tfrac{b-g}{b}$. Under always-continue the balls are removed uniformly at random until one remains, and that last ball is uniform over the original $b$, so it is blue with probability $\tfrac{b-g}{b}$ as well. Hence

$$Q^{\pi_{cont}}(s_0,\text{stop})=Q^{\pi_{cont}}(s_0,\text{continue})=\frac{b-g}{b}.$$

**(c)** The hinted recursion is exactly the value of continuing, so continuing from $(b',g')$ is worth $f(b',g')=\tfrac{b'}{b'+g'}$, which equals the stop value $\tfrac{b'}{b'+g'}$. Both actions have the same value in every state, so the value is **policy-independent**:

$$V^*\big((b',g')\big)=\frac{b'}{b'+g'}.$$

(The blue-fraction of the surviving sub-box is a martingale — removing a uniformly random ball leaves the expected blue-probability unchanged — so no strategy can beat simply stopping.)

**(d)** Now **continue** pays $q>0$ immediately *and* preserves the same terminal blue-probability, while **stop** forgoes all future $q$'s. So continuing dominates whenever the box still has $\ge2$ balls, and the optimal policy always continues:

$$\pi^*\big((b',g')\big)=\text{continue},\qquad Q^*\big((b',g'),\text{stop}\big)=\frac{b'}{b'+g'},$$
$$Q^*\big((b',g'),\text{continue}\big)=(b'+g'-1)\,q+\frac{b'}{b'+g'}.$$

(the box empties over $b'+g'-1$ continue steps, each paying $q$, plus the preserved terminal blue-probability $\tfrac{b'}{b'+g'}$.)

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

**(a)** **No (not necessarily).** Scaling by $\alpha>0$ keeps the argmax, but $\alpha\in[-1,+1]$ allows $\alpha<0$, which negates every return and turns maximization into minimization, so the optimal first action can flip. Counterexample: at $s_0$, $a_0^*$ leads to reward $+1$ and another action $a$ to $-1$ (so $a_0^*$ is optimal); with $\alpha=-1$ these become $-1$ and $+1$, so $a$ becomes optimal and $a_0^*$ is not.

**(b)** **Yes.** Over a finite horizon $T$ every trajectory collects exactly $T$ rewards, so adding $\beta$ to each reward raises **every** policy's return by the same constant $\beta T$. The ranking of policies — hence the optimal action at $s_0$ — is unchanged, so $a_0^*$ stays optimal.

**(c)** **No (not necessarily).** The optimal first action depends on the horizon: an action whose payoff arrives only after many steps can be worthless at $T$ but optimal at $2T$. Counterexample: from $s_0$, $a_0^*$ gives $+1$ now then a dead-end paying $0$, while action $a$ gives $0$ now but reaches a state paying $+1$ at every later step; at $T=1$ $a_0^*$ wins, at $2T=2$ action $a$ wins.

**(d)** **No (not necessarily).** The reset action loops back to $s_0$ at reward $0$, so if all of $M$'s rewards are negative, repeatedly resetting earns $0$ — better than any negative action. Counterexample: an MDP whose every reward is negative (so $a_0^*$, the least negative, is optimal in $M$); after adding reset, the optimal action at $s_0$ is **reset**, not $a_0^*$.

**(e)** **Yes.** We *lower* the reward of an action $a$ that is **not** optimal at $s$. Since $a$ was already dominated, $Q(s,a)<\max_{a'}Q(s,a')$ (or tied), and halving $r(s,a)\ge0$ only lowers $Q(s,a)$ further, leaving $V^*(s)=\max_{a'}Q(s,a')$ unchanged. Unchanged $V^*(s)$ propagates to every upstream value, so $a_0^*$ remains optimal at $s_0$.

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

**(a)** The exponential is its own derivative, $\nabla_\theta\hat V(s;\theta)=\exp(\phi(s)\cdot\theta)\,\phi(s)=\hat V(s;\theta)\,\phi(s)$, so $\nabla_\theta J^\pi=-\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta)\big)\hat V(s;\theta)\phi(s)$ and the descent step is

$$\theta^{t+1}=\theta^{t}+\alpha\sum_s\mu(s)\big(V^\pi(s)-\hat V(s;\theta^{t})\big)\,\hat V(s;\theta^{t})\,\phi(s).$$

**(b)** The **return-to-go** from the first visit to $s$ in an episode generated by $\pi$,

$$\hat G(s)=\sum_{k\ge t(s)}\gamma^{\,k-t(s)}r_k,$$

is unbiased: $\mathbb{E}[\hat G(s)\mid s_{t(s)}=s]=V^\pi(s)$ by definition of the value function.

**(c)** Sampling a state $s$ along an episode of $\pi$ realizes the distribution $\mu$, so a single-sample stochastic gradient replaces $\sum_s\mu(s)$ and $V^\pi(s)$ by the return $\hat G(s)$:

$$\theta^{t+1}=\theta^{t}+\alpha\big(\hat G(s)-\hat V(s;\theta^{t})\big)\,\hat V(s;\theta^{t})\,\phi(s).$$

**💡 Trick.** With $\hat V=\exp(\phi\cdot\theta)$ the gradient is just $\hat V\cdot\phi$ (the model reappears as its own derivative), so the update is $\alpha(\text{target}-\hat V)\,\hat V\,\phi$; sampling a visited state and plugging the unbiased Monte-Carlo return $\hat G(s)$ turns it into the SGD step.

**⚠️ Watch out.** Keep the $\hat V(s;\theta)$ factor from the chain rule (the gradient is *not* just $(\hat G-\hat V)\phi$), and remember this is a regression/semi-gradient fit of $V^\pi$ — the visitation weight $\mu$ comes for free from sampling states along the trajectory, so don't multiply it in again.

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

**(a)** $H$ is $\gamma$-contracting in $\|\cdot\|_\infty$ if

$$\|HU-HV\|_\infty\le\gamma\,\|U-V\|_\infty\qquad\text{for all }U,V.$$

**(b)** The term $\max_{\bar s}U(\bar s)$ is a single global number, independent of $s'$, and $r(s,a)$ does not depend on $s'$ either, so the expectation is trivial and

$$(TU)(s)=\max_a r(s,a)+\gamma\max_{\bar s}U(\bar s).$$

The $\max_a r(s,a)$ term is identical for $U$ and $V$, so it cancels:

$$(TU-TV)(s)=\gamma\Big(\max_{\bar s}U(\bar s)-\max_{\bar s}V(\bar s)\Big)\ \Longrightarrow\ \|TU-TV\|_\infty=\gamma\Big|\max_{\bar s}U-\max_{\bar s}V\Big|\le\gamma\|U-V\|_\infty,$$

using $|\max f-\max g|\le\max|f-g|$. Hence $T$ is a $\gamma$-contraction (and by Banach has a unique fixed point).

**(c)** Write $R(s)=\max_a r(s,a)$ and $M=\max_{\bar s}U^*(\bar s)$. The fixed-point equation $U^*(s)=R(s)+\gamma M$ gives, taking the max over $s$, $M=\max_s R(s)+\gamma M$, so $M=\dfrac{\max_s R(s)}{1-\gamma}$ and

$$\boxed{\ U^*(s)=\max_a r(s,a)+\frac{\gamma}{1-\gamma}\,\max_{s'}\max_{a}r(s',a)\ }.$$

**💡 Trick.** Because the future term is $\max_{\bar s}U(\bar s)$ — a global max, not $\mathbb{E}_{s'}[\cdots]$ — the expectation and the transition $p$ drop out entirely: $(TU)(s)=\max_a r(s,a)+\gamma\max_{\bar s}U(\bar s)$. That collapses both the contraction proof and the fixed point to a one-line calculation.

**⚠️ Watch out.** This is **not** the Bellman optimality operator: the max is taken **outside** the expectation and over **all** states, so $U^*$ ignores the dynamics and just tracks the single best reward in the whole MDP — do not identify $U^*$ with $V^*$ here (contrast with Part A's $\tfrac12$-smoothed operator, whose fixed point *is* $V^*$).
