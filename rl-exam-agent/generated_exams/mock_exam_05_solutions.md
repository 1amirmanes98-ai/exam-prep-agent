# Mock Exam 5 — Solutions

Every numeric answer was verified with a python3 computation (exact policy iteration with rational
arithmetic and value iteration for Q1, plus 2000 random instances for the threshold claim; value
iteration / policy enumeration on every Q2 counterexample and 500 random MDPs for the shaping identity;
finite differences and 4·10⁶-sample Monte-Carlo for the Q3 scores and gradients; random contraction-ratio
tests and fixed-point iteration for Q4).

## Q1 — Battery-charging robot: model, policy iteration, threshold

**Hint:** The state is just the battery level; level $0$ has a single forced action. For a fixed policy,
every Work state satisfies $V(b)=1+\gamma\big(qV(b-1)+(1-q)V(b)\big)$, which you can solve for $V(b)$ in
terms of $V(b-1)$ — so each evaluation is a chain of substitutions closed by the equation of level $0$.
Charge is worth $\gamma V(3)$ at **every** level: what does that say about where it can win?

**Full solution:**

**(a)** $S=\{0,1,2,3\}$ (battery level), $\gamma=0.9$. Actions: $A(0)=\{\text{rescue}\}$,
$A(b)=\{\text{W},\text{Ch}\}$ for $b\ge1$. Rewards: $r(0,\text{rescue})=-C=-5$, $r(b,\text{W})=1$,
$r(b,\text{Ch})=0$. Transitions:
$P(3\mid 0,\text{rescue})=1$; $P(b-1\mid b,\text{W})=q=\tfrac12$, $P(b\mid b,\text{W})=1-q=\tfrac12$;
$P(3\mid b,\text{Ch})=1$. The objective is $\mathbb{E}\big[\sum_t\gamma^t r_t\big]$; finite $S$, $A$ and
$\gamma<1$, so a deterministic stationary optimal policy exists.

**(b)**

$$\begin{aligned}
V^*(0)&=-5+0.9\,V^*(3),\\
V^*(b)&=\max\Big\{\underbrace{1+0.45\,V^*(b-1)+0.45\,V^*(b)}_{\text{Work}},\ \underbrace{0.9\,V^*(3)}_{\text{Charge}}\Big\},\quad b=1,2,3.
\end{aligned}$$

**(c)** *Evaluation of $\pi_0$ (always Work).* $V(0)=-5+0.9V(3)$ and for $b\ge1$:
$V(b)=1+0.45V(b-1)+0.45V(b)\Rightarrow V(b)=\tfrac{20}{11}+\tfrac{9}{11}V(b-1)$. Substituting up the chain,

$$V(3)=\tfrac{20}{11}\Big(1+\tfrac{9}{11}+\tfrac{81}{121}\Big)+\tfrac{729}{1331}V(0)=4.5229+0.5477\,V(0),$$

and with $V(0)=-5+0.9V(3)$: $0.5071\,V(0)=-0.9294$, so

$$V^{\pi_0}=(-1.8329,\ 0.3186,\ 2.0788,\ 3.5190)\quad\Big(=\tfrac{1}{6749}(-12370,\,2150,\,14030,\,23750)\Big).$$

*Improvement.* $Q(b,\text{Ch})=0.9\cdot3.5190=3.1671$ at every $b$; $Q(b,\text{W})=1+0.45(V(b-1)+V(b))$
$=0.3186,\ 2.0788,\ 3.5190$ for $b=1,2,3$. So $\pi_1$ = **Charge at $b\in\{1,2\}$, Work at $b=3$**.

*Evaluation of $\pi_1$.* $V(1)=V(2)=0.9V(3)$, $V(0)=-5+0.9V(3)$,
$V(3)=1+0.45V(2)+0.45V(3)=1+0.855V(3)$, so $V(3)=\tfrac{1}{0.145}=\tfrac{200}{29}$:

$$V^{\pi_1}=(1.2069,\ 6.2069,\ 6.2069,\ 6.8966)=\tfrac{1}{29}(35,\,180,\,180,\,200).$$

*Improvement.* $Q(b,\text{Ch})=6.2069$; $Q(1,\text{W})=1+0.45(1.2069+6.2069)=4.3362$,
$Q(2,\text{W})=1+0.45(6.2069+6.2069)=6.5862$, $Q(3,\text{W})=6.8966$. So $\pi_2$ = **Charge only at $b=1$**.

*Evaluation of $\pi_2$.* $V(1)=0.9V(3)$, $V(0)=-5+0.9V(3)$, $V(2)=\tfrac{1+0.405V(3)}{0.55}$,
$V(3)=\tfrac{1+0.45V(2)}{0.55}$. Eliminating $V(2)$: $0.2186\,V(3)=1.8182$, so $V(3)=\tfrac{4000}{481}$ and

$$V^{\pi_2}=(2.4844,\ 7.4844,\ 7.9418,\ 8.3160)=\tfrac{1}{481}(1195,\,3600,\,3820,\,4000).$$

*Improvement.* $Q(b,\text{Ch})=7.4844$; $Q(1,\text{W})=1+0.45(2.4844+7.4844)=5.4860<7.4844$,
$Q(2,\text{W})=7.9418>7.4844$, $Q(3,\text{W})=8.3160>7.4844$. The policy is unchanged, so PI stops:

$$\boxed{\pi^*:\ \text{Charge at }b=1,\ \text{Work at }b=2,3},\qquad \boxed{V^*=(2.4844,\ 7.4844,\ 7.9418,\ 8.3160)}$$

after **3 policy evaluations** (2 improvements that changed the policy, 1 that confirmed it). Value
iteration to convergence gives the same $V^*$.

**(d)** Let $\mathcal{V}=\{V:\ V(0)\le V(1)\le\dots\le V(L)\}$ and let $T$ be the Bellman optimality operator.
Take $V\in\mathcal V$.
- $(TV)(0)=-C+\gamma V(L)<\gamma V(L)\le (TV)(1)$, because Charge is available at level $1$.
- For $1\le b<L$, the Charge term $\gamma V(L)$ is the same at $b$ and $b+1$, and the Work term
  $W_V(b)=1+\gamma\big(qV(b-1)+(1-q)V(b)\big)\le 1+\gamma\big(qV(b)+(1-q)V(b+1)\big)=W_V(b+1)$
  since $V$ is non-decreasing. A max of two non-decreasing sequences is non-decreasing.

So $T\mathcal V\subseteq\mathcal V$. Value iteration from $V_0\equiv0\in\mathcal V$ stays in $\mathcal V$ and
converges to $V^*$ ($T$ is a $\gamma$-contraction), and $\mathcal V$ is closed, so $V^*\in\mathcal V$:
$V^*$ is non-decreasing. Now let

$$D(b)=Q^*(b,\text{W})-Q^*(b,\text{Ch})=1+\gamma\big(qV^*(b-1)+(1-q)V^*(b)\big)-\gamma V^*(L).$$

$D$ is non-decreasing in $b$ (the first part is, the second is constant). Hence $\{b\ge1: D(b)<0\}$ —
the levels where Charge is strictly better — is an initial segment $\{1,\dots,\tau\}$ (empty when
$\tau=0$): a threshold policy. In (c), $\tau=1$. (Checked on 2000 random $(L,\gamma,q,C)$.)

**(e)** $V_1=(-5,\ 1,\ 1,\ 1)$ (Work's $1$ beats Charge's $0$). Then
$V_2(0)=-5+0.9\cdot1=-4.1$; $V_2(1)=\max\{1+0.45(-5+1),\,0.9\}=0.9$ (Charge);
$V_2(2)=V_2(3)=\max\{1+0.45\cdot2,\,0.9\}=1.9$:

$$V_2=(-4.1,\ 0.9,\ 1.9,\ 1.9).$$

Greedy w.r.t. $V_2$: Charge $=0.9\cdot1.9=1.71$; Work $=-0.44,\ 2.26,\ 2.71$ at $b=1,2,3$, so the greedy
policy is Charge at $1$, Work at $2,3$ — **already $\pi^*$**, although $V_2$ is still far from
$V^*=(2.48,7.48,7.94,8.32)$: the greedy policy converges long before the values do.

**💡 Trick.** Charge has the same value $\gamma V(3)$ at every level while Work's value grows with $b$, so the comparison is "increasing function vs. constant" — a threshold, exactly as in the maintenance and stopping problems.

**⚠️ Watch out.** Policy iteration needs an exact solve of each linear system (including the forced rescue equation at $b=0$); and "converged" is declared only after an improvement step that leaves the policy unchanged — that third evaluation counts.

## Q2 — Discounted reward transforms: which preserve the optimal policy

**Hint:** For a fixed policy, write $V'^\pi$ as an expectation of a discounted sum and look for
telescoping. A transform is safe exactly when it changes the value of **every** policy at state $s$ by the
same amount (or by the same positive factor). To break a transform, build a two-action choice at $s_0$
whose two options the transform treats differently.

**Full solution:**

**(a) Yes.** Fix any $\pi$ and $s_0=s$. By the tower property
$\mathbb{E}\big[\sum_{s'}P(s'\mid s_t,a_t)\Phi(s')\big]=\mathbb{E}[\Phi(s_{t+1})]$, so

$$\begin{aligned}
V'^\pi(s)&=V^\pi(s)+\mathbb{E}^\pi\Big[\sum_{t\ge0}\big(\gamma^{t+1}\Phi(s_{t+1})-\gamma^t\Phi(s_t)\big)\Big]\\
&=V^\pi(s)-\Phi(s),
\end{aligned}$$

because the sum telescopes and $\gamma^{T}\Phi(s_T)\to0$ ($\Phi$ is bounded on finite $S$). Hence
$\boxed{V'^\pi=V^\pi-\Phi}$ for **every** $\pi$ (similarly $Q'^\pi(s,a)=Q^\pi(s,a)-\Phi(s)$). For every $s$
and $\pi$, $V'^{\pi^*}(s)=V^*(s)-\Phi(s)\ge V^\pi(s)-\Phi(s)=V'^\pi(s)$, so $\pi^*$ is optimal in $M'$, and
$V'^*=V^*-\Phi$. (Checked on 500 random MDPs, all policies.)

**(b) No.** Here $r'=\big[r+\gamma\mathbb{E}\Phi(s')-\Phi(s)\big]+(1-\gamma)\mathbb{E}[\Phi(s')\mid s,a]$: on
top of a harmless shaping term there is a genuine bonus for moving to high-$\Phi$ states, which does not
telescope. Counterexample: $S=\{s_0,s_1\}$; in $s_0$, *stay* gives $r=1$ and stays in $s_0$, *go* gives
$r=0$ and moves to $s_1$; $s_1$ is absorbing with $r=0$. In $M$: $Q^*(s_0,\text{stay})=\tfrac{1}{1-0.9}=10$,
$Q^*(s_0,\text{go})=0$, so $\pi^*(s_0)=\text{stay}$. Take $\Phi(s_0)=0$, $\Phi(s_1)=20$: then
$r'(s_0,\text{stay})=1$, $r'(s_0,\text{go})=0+20-0=20$, $r'(s_1,\cdot)=0+20-20=0$, so

$$Q'^*(s_0,\text{go})=20,\qquad Q'^*(s_0,\text{stay})=1+0.9\cdot20=19,$$

and staying forever is worth only $10$. The optimal action becomes **go**: $\pi^*$ is not optimal in $M'$.
(With the $\gamma$, part (a) gives $Q'^*(s_0,\cdot)=(10,0)$ — unchanged ranking.)

**(c) No** for state-dependent $c(s)$; **yes** for a constant $c>0$ (then $V'^\pi=cV^\pi$ for every $\pi$
by linearity in the reward, and a positive factor keeps every comparison). Counterexample:
$S=\{s_0,s_1,z\}$, $z$ absorbing with reward $0$; in $s_0$, *L* gives $0.5$ and goes to $z$, *R* gives
$0$ and goes to $s_1$; in $s_1$ (any action) reward $1$ and go to $z$. In $M$:
$Q^*(s_0,L)=0.5<Q^*(s_0,R)=0.9\cdot1=0.9$, so $\pi^*(s_0)=R$. With $c(s_1)=0.1$, $c(s_0)=c(z)=1$:
$Q'^*(s_0,R)=0.9\cdot0.1=0.09<0.5=Q'^*(s_0,L)$, so the optimal action becomes **L**.

**(d)** (i) **Yes.** In a continuing MDP every policy collects one reward per step forever, so
$V'^\pi(s)=V^\pi(s)+\sum_t\gamma^t\beta=V^\pi(s)+\tfrac{\beta}{1-\gamma}$ — the same shift for all $\pi$, so
$\pi^*$ stays optimal (and $Q'^*=Q^*+\tfrac{\beta}{1-\gamma}$; checked on 300 random MDPs). In fact this is
the special case $\Phi\equiv-\tfrac{\beta}{1-\gamma}$ of (a).
(ii) **No.** Now the number of rewarded steps depends on the policy, so adding $\beta$ rewards **delaying**
termination. Counterexample: $S=\{s_0,z\}$; in $s_0$, *finish* gives $1$ and moves to $z$, *wait* gives
$0$ and stays in $s_0$. In $M$: $Q^*(s_0,\text{finish})=1>Q^*(s_0,\text{wait})=0.9\cdot1=0.9$. With
$\beta=1$: $Q'^*(s_0,\text{finish})=2$, while waiting forever is worth $\tfrac{1}{1-0.9}=10$, so
$Q'^*(s_0,\text{wait})=1+0.9\cdot10=10>2$. The optimal action becomes **wait**, and the agent never
finishes.

**(e) No.** Squaring is convex, so it favors concentrated over spread-out rewards. Counterexample:
$S=\{s_0,s_A,z\}$, $z$ absorbing with reward $0$; in $s_0$, *spread* gives $0.6$ and goes to $s_A$, *spike*
gives $1$ and goes to $z$; in $s_A$ reward $0.6$ and go to $z$. In $M$:
$Q^*(s_0,\text{spread})=0.6+0.9\cdot0.6=1.14>Q^*(s_0,\text{spike})=1$. After squaring:
$Q'^*(s_0,\text{spread})=0.36+0.9\cdot0.36=0.684<1=Q'^*(s_0,\text{spike})$. The optimal action flips to
**spike**.

**💡 Trick.** A transform is safe exactly when $V'^\pi=\kappa V^\pi+g(s)$ with the same $\kappa>0$ and $g$ for all policies — potential shaping ($g=-\Phi$), a global positive scale, and a constant shift in a continuing task all have this form; everything else gets a two-action counterexample at $s_0$.

**⚠️ Watch out.** The $\gamma$ in $\gamma\Phi(s')-\Phi(s)$ is what makes the sum telescope — drop it and you pay a real bonus for reaching high-$\Phi$ states; and "add a constant" is safe only when every policy collects the same number of rewards (no policy-dependent termination).

## Q3 — Policy gradient for a logistic-distributed continuous action

**Hint:** Write $\log f=-z-\log\sigma-2\log(1+e^{-z})$ with $z=(a-\mu)/\sigma$, and differentiate in $z$
first — the result simplifies to a $\tanh$. Then use the chain rule $\partial z/\partial\mu=-1/\sigma$,
$\partial\sigma/\partial w=\sigma$. For (d) you never need the score: $\mathbb{E}[(a-c)^2]$ is
variance plus squared bias.

**Full solution:**

**(a)** With $z=(a-\mu)/\sigma$, $\ell(z):=\log f=-z-\log\sigma-2\log(1+e^{-z})$, so

$$\ell'(z)=-1+\frac{2e^{-z}}{1+e^{-z}}=-\frac{1-e^{-z}}{1+e^{-z}}=-\tanh(z/2),\qquad \ell''(z)=-\tfrac12\,\mathrm{sech}^2(z/2)<0.$$

Since $z$ is an increasing affine function of $a$, $\log f$ is strictly concave in $a$, and its unique
stationary point is $z=0$. Symmetry: multiplying numerator and denominator by $e^{2z}$ gives
$\frac{e^{-z}}{(1+e^{-z})^2}=\frac{e^{z}}{(1+e^{z})^2}$, so $f(\mu+u)=f(\mu-u)$. Hence the mode (= mean)
is $\boxed{a^*=\mu=\theta\cdot\phi(s)}$.

**(b)** From (a), $\partial\log f/\partial\mu=\ell'(z)\cdot(-1/\sigma)=\tanh(z/2)/\sigma$ and
$\nabla_\theta\mu=\phi(s)$, so

$$\nabla_\theta\log\pi(a\mid s;\theta,w)=\frac{1}{\sigma}\tanh\!\Big(\frac{z}{2}\Big)\phi(s)=\frac{2\,\mathrm{sgm}(z)-1}{\sigma}\,\phi(s),\qquad z=\frac{a-\theta\cdot\phi(s)}{e^w},$$

with $\mathrm{sgm}(z)=1/(1+e^{-z})$. For $w$: $\partial\log f/\partial\sigma=-\tfrac1\sigma+\ell'(z)\cdot\big(-\tfrac{z}{\sigma}\big)=\tfrac{z\tanh(z/2)-1}{\sigma}$ and $\partial\sigma/\partial w=\sigma$, so

$$\frac{\partial}{\partial w}\log\pi(a\mid s;\theta,w)=z\tanh\!\Big(\frac z2\Big)-1.$$

Because $|\tanh|<1$, $\|\nabla_\theta\log\pi\|\le\|\phi(s)\|/\sigma$ for every $a$: a far-out action
cannot produce a huge update. For a Gaussian the score is $\tfrac{a-\mu}{\sigma^2}\phi(s)$, unbounded in
$a$ (heavier-variance gradient estimates). REINFORCE, with $G_t=\sum_{t'\ge t}\gamma^{t'-t}r_{t'}$:

$$\theta\leftarrow\theta+\alpha\,\gamma^t\,G_t\,\frac{1}{e^{w}}\tanh\!\Big(\frac{a_t-\theta\cdot\phi(s_t)}{2e^{w}}\Big)\phi(s_t).$$

(The class estimator $\sum_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)\,G_t$ omits the factor $\gamma^t$; either form is accepted.)

**(c)** Here $\mu=\theta=0$, $\sigma=1$, so the score is $\tanh(a/2)$. Rewards $r_1=-(0.5)^2=-0.25$,
$r_2=-(-1.5)^2=-2.25$; scores $\tanh(0.75)=0.6351$, $\tanh(-0.25)=-0.2449$.
(i) $\hat g=\tfrac12\big(-0.25\cdot0.6351+(-2.25)(-0.2449)\big)=\tfrac12(-0.1588+0.5511)=0.1961$, so
$\boxed{\theta\leftarrow0+0.1\cdot0.1961=0.0196}$.
(ii) $b=\tfrac12(-0.25-2.25)=-1.25$, so $r_1-b=1$, $r_2-b=-1$:
$\hat g=\tfrac12\big(1\cdot0.6351+(-1)(-0.2449)\big)=0.4400$, $\boxed{\theta\leftarrow0.0440}$.
Both move $\theta$ toward the best action $a=1$; the baseline version is larger and cleaner: without it
both rewards are negative, so the good sample $a_1$ is **pushed down** and only the larger push-down of the
bad sample nets out positive. (The exact gradient at $\theta=0$ is $2$, confirmed by Monte-Carlo.)

**(d)** $\mathbb{E}[(a-c)^2]=\mathrm{Var}(a)+(\mathbb{E}a-c)^2$, so

$$J(\theta,w)=-(\theta-c)^2-\frac{\pi^2}{3}e^{2w},\qquad \frac{\partial J}{\partial\theta}=-2(\theta-c),\qquad \frac{\partial J}{\partial w}=-\frac{2\pi^2}{3}e^{2w}<0.$$

$\partial J/\partial\theta=0$ iff $\theta=c$, but $\partial J/\partial w$ never vanishes, so $J$ has **no
stationary point** with $\sigma>0$. Gradient ascent sets $\theta\to c$ and keeps decreasing $w$, i.e.
$\sigma\to0$: the policy becomes deterministic at $a=c$ (the supremum $J=0$ is not attained). For fixed
$\sigma$ the unique stationary point is $\boxed{\theta=c}$. (Monte-Carlo with the score-function
estimator reproduces $\partial J/\partial\theta=2$ and $\partial J/\partial w=-6.58$ at $\theta=0,w=0,c=1$.)

**💡 Trick.** For a location family the $\theta$-score is (derivative of $-\log f$ at $z$)$\times\phi(s)/\sigma$; for the logistic that derivative is $\tanh(z/2)$, a bounded "soft sign" of how far the sample is from the mode.

**⚠️ Watch out.** The chain rule through $z=(a-\mu)/\sigma$ gives a factor $-1/\sigma$ (and $\sigma$ for $w=\log\sigma$) — sign errors here flip the update; and with all-negative rewards, REINFORCE without a baseline lowers the probability of even the good samples.

## Q4 — A capped Q-operator: contraction and fixed point

**Hint:** "Take the minimum with a fixed number" is 1-Lipschitz, so the cap cannot spoil the usual
$\gamma$-contraction of $Q\mapsto r+\gamma P\max Q$. For (c), compare $T_c$ with the Bellman optimality
operator $T^*$: $T_c\le T^*$ and both are monotone. For (d), compute the values of the self-loops first;
the cap acts *inside* the recursion.

**Full solution:**

**(a)** $H$ is a $\gamma$-contraction in $\|\cdot\|_\infty$ if $\|HQ-HQ'\|_\infty\le\gamma\|Q-Q'\|_\infty$
for all $Q,Q'$.

**(b)** Lemma: for reals $x,y,c$, $|\min\{x,c\}-\min\{y,c\}|\le|x-y|$ (if both $\ge c$ the left side is
$0$; if both $<c$ it equals $|x-y|$; if $x<c\le y$ it equals $c-x\le y-x$). Apply it at $(s,a)$ with
$x=r(s,a)+\gamma\mathbb{E}_{s'}\max_{a'}Q(s',a')$, $y$ the same with $Q'$:

$$\begin{aligned}
|(T_cQ)(s,a)-(T_cQ')(s,a)|&\le\gamma\,\Big|\mathbb{E}_{s'\sim P(\cdot\mid s,a)}\big[\max_{a'}Q(s',a')-\max_{a'}Q'(s',a')\big]\Big|\\
&\le\gamma\,\mathbb{E}_{s'}\max_{a'}|Q(s',a')-Q'(s',a')|\le\gamma\|Q-Q'\|_\infty,
\end{aligned}$$

using $|\max_a u_a-\max_a v_a|\le\max_a|u_a-v_a|$. Taking the max over $(s,a)$ gives the
$\gamma$-contraction; by Banach's fixed-point theorem there is a unique $\bar Q$ and $T_c^kQ\to\bar Q$
from any $Q$. (Random tests: the ratio never exceeded $0.998\gamma$.)

**(c)** $\bar Q=T_c\bar Q$ is a minimum with $c$, so $\bar Q\le c$. Next, $T_cQ\le T^*Q$ for every $Q$ and
both operators are monotone. So $T_cQ^*\le T^*Q^*=Q^*$; applying the monotone $T_c$ repeatedly gives
$T_c^{k+1}Q^*\le T_c^kQ^*\le\dots\le Q^*$, and letting $k\to\infty$, $\bar Q\le Q^*$.
*If* $c\ge\max_{s,a}Q^*(s,a)$: $T_cQ^*=\min\{T^*Q^*,c\}=\min\{Q^*,c\}=Q^*$, so $Q^*$ is a fixed point and by
uniqueness $\bar Q=Q^*$. *Only if*: if $\bar Q=Q^*$ then $Q^*=\bar Q\le c$ everywhere. Since rewards lie in
$[0,1]$, $Q^*\le\tfrac{1}{1-\gamma}$, so $\boxed{c\ge\tfrac{1}{1-\gamma}}$ is sufficient.
(600 random MDPs: $\bar Q=Q^*$ exactly when $c\ge\max Q^*$.)

**(d)** $Q^*$: $x_2$: $\tfrac{1}{1-0.9}=10$; $x$: $0.9\cdot10=9$; $y$: $\tfrac{0.8}{0.1}=8$;
$Q^*(s_0,A)=0.9\cdot9=8.1$, $Q^*(s_0,B)=0.9\cdot8=7.2$, so $\pi^*(s_0)=A$.
$\bar Q$ with $c=5$: $x_2$: $\bar Q=\min\{1+0.9\bar Q,5\}$; the uncapped solution $10$ exceeds $5$, and
$\bar Q=5$ checks ($1+4.5=5.5$, capped to $5$). $y$: likewise $\min\{0.8+4.5,5\}=5$. $x$:
$\min\{0+0.9\cdot5,5\}=4.5$. Then

$$\bar Q(s_0,A)=0.9\cdot4.5=\boxed{4.05},\qquad \bar Q(s_0,B)=0.9\cdot5=\boxed{4.5}.$$

$\min\{Q^*,c\}=5$ at every state, so $\bar Q\neq\min\{Q^*,c\}$ (e.g. at $x$: $4.5$ vs $5$; at $s_0$) — the cap
propagates backwards through the recursion. The greedy policy w.r.t. $\bar Q$ picks **B** at $s_0$, which is
**not** optimal in $M$ ($7.2<8.1$): capping erased the difference between $x_2$ (worth $10$) and $y$
(worth $8$), and the one-step delay on the way to $x_2$ is then all that remains.

**💡 Trick.** $|\min\{x,c\}-\min\{y,c\}|\le|x-y|$ makes the cap invisible to the contraction proof; for the fixed point, test the candidate $Q^*$ directly — it is a fixed point exactly when the cap never binds on it.

**⚠️ Watch out.** The fixed point is not $\min\{Q^*,c\}$ and its greedy policy can be strictly suboptimal: the cap is applied at every step of the recursion, so a capped downstream state lowers every value upstream of it.
