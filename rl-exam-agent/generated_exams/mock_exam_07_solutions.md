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

**(a)** States: $(k,x)$ with $k\in\{1,\dots,n\}$ the number of offers remaining **including** the
current one and $x\in[0,1]$ the current offer, plus a terminal state $\Delta$. Actions at $(k,x)$
with $k\ge2$: accept / reject; at $(1,x)$ only accept. Rewards: accept gives $x$ and moves to
$\Delta$; reject gives $0$ (or $-c$ in (d)) and moves to $(k-1,X')$ with $X'\sim U[0,1]$ independent
of everything. $\Delta$ is absorbing with reward $0$. Horizon $n$, $\gamma=1$, start
$(n,X_1)$ — a distribution over states. Because offers are i.i.d. and there is no recall, the
future (rewards and transitions) depends only on $(k,x)$: rejected offers can never be collected
and give no information about future offers, so the Markov property holds without history.

**(b)** With $a_{k}=\mathbb{E}\,V_{k}(X)$ (value of $k$ offers to come, next unseen):
$$\begin{aligned} V_1(x)&=x,\\ V_k(x)&=\max\{\,x,\ \mathbb{E}_{X'}V_{k-1}(X')\,\}\\ &=\max\{x,\ a_{k-1}\},\quad k\ge2. \end{aligned}$$
The continue-value $a_{k-1}$ is a constant independent of $x$, while the accept-value $x$ is
increasing in $x$; hence accept iff $x\ge a_{k-1}$ — a threshold policy (ties to accept). Now
$a_1=\mathbb{E}X=\tfrac12$, and for $b\in[0,1]$
$$\mathbb{E}\max(X,b)=b\cdot\Pr[X<b]+\int_b^1x\,dx=b^2+\frac{1-b^2}{2}=\frac{1+b^2}{2},$$
so $a_{k+1}=\mathbb{E}\max(X,a_k)=\tfrac12(1+a_k^2)$.
Induction: $a_1=\tfrac12\in[\tfrac12,1)$. If $\tfrac12\le a_k<1$, then
$a_{k+1}-a_k=\tfrac12(1-a_k)^2>0$ and $a_{k+1}<\tfrac12(1+1)=1$, so $\tfrac12\le a_k<a_{k+1}<1$. $\square$

**(c)** $a_1=\tfrac12,\ a_2=\tfrac58=0.625,\ a_3=\tfrac{89}{128}=0.6953,\ a_4=\tfrac{24305}{32768}=0.7417$, and
$$a_5=\frac{1+a_4^2}{2}=\frac{1664474849}{2147483648}\approx 0.7751.$$
On day $t$ there are $n-t$ offers after today, so the threshold is $a_{n-t}$:
$$\boxed{\text{day }1{:}\ 0.7417,\quad \text{day }2{:}\ 0.6953,\quad \text{day }3{:}\ 0.625,\quad \text{day }4{:}\ 0.5,\quad \text{day }5{:}\ \text{accept anything}}$$
$\boxed{a_5\approx0.7751}$ versus $0.5$ for accepting the first offer: a gain of $\approx0.275$
(55%). (Monte-Carlo of this policy: $0.7749$.)

**(d)** Rejecting now costs $c$ and leads to value $a_k$ with $k$ offers to come, so
$V_{k+1}(x)=\max\{x,\ a_k-c\}$: accept iff $x\ge a_k-c$, and with $b=a_k-c\in[0,1]$,
$$a_{k+1}=\mathbb{E}\max(X,a_k-c)=\frac{1+(a_k-c)^2}{2}.$$
For $c=0.02$: $a_1=0.5,\ a_2=0.6152,\ a_3=0.67713,\ a_4=0.71591,\ a_5=0.74215$. Thresholds:
$$\boxed{\text{day }1{:}\ 0.6959,\quad \text{day }2{:}\ 0.6571,\quad \text{day }3{:}\ 0.5952,\quad \text{day }4{:}\ 0.48,\quad \text{day }5{:}\ \text{accept anything}},\qquad \boxed{a_5\approx0.7421}.$$
Limit: $f(a)=\tfrac12(1+(a-c)^2)$ is increasing for $a\ge c$, $a_2>a_1$, and the smaller fixed point
$a^\star=1+c-\sqrt{2c}$ satisfies $a^\star\ge\tfrac12$ (since $a^\star-\tfrac12=(\sqrt c-\tfrac1{\sqrt2})^2$),
so $a_k$ increases to $a^\star$. Its threshold $t=a^\star-c$ solves $t+c=\tfrac12(1+t^2)$, i.e.
$(1-t)^2=2c$:
$$\boxed{t_\infty=1-\sqrt{2c}=1-\sqrt{0.04}=0.8}.$$
Interpretation: at the threshold, the expected gain of one more look,
$\mathbb{E}(X-t)^+=\tfrac12(1-t)^2$, exactly equals its cost $c$ (one-step look-ahead).

**💡 Trick.** The continue-value is a constant (independent of the current offer), so the policy is a threshold, and $\mathbb{E}\max(X,b)=\tfrac{1+b^2}{2}$ turns the Bellman equation into a scalar recursion.

**⚠️ Watch out.** Index carefully: on a day with $k$ offers *after* today the threshold is $a_k$ (not $a_{k+1}$), and with a cost the threshold is $a_k-c$ — the cost is paid on rejecting, not on accepting.

## Q2 — Thresholding bandit: which arms clear the bar?

**Hint:** Hoeffding for $r$ samples with deviation $c_r$ gives $2e^{-2rc_r^2}$; what does the
specific $c_r$ make this equal to, and is the sum over all $r$ finite? On the clean event, how
far can $\hat\mu_{i,r}\pm c_r$ be from $\mu_i$ — and when is that smaller than the gap to $\tau$?

**Full solution:**

**(a)** For fixed $i,r$, Hoeffding with $r$ i.i.d. $[0,1]$ samples:
$$\Pr\big[|\hat\mu_{i,r}-\mu_i|>c_r\big]\le2e^{-2rc_r^2}=2\cdot\frac{\delta}{4Kr^2}=\frac{\delta}{2Kr^2}.$$
(Think of each arm's rewards as an i.i.d. stack drawn in advance, $\hat\mu_{i,r}$ = mean of its first $r$
entries; this defines $\hat\mu_{i,r}$ for every $r$, even after deactivation.) Union bound over $K$ arms and all $r\ge1$:
$$\Pr[\mathcal{E}^c]\le\sum_{i=1}^K\sum_{r\ge1}\frac{\delta}{2Kr^2}=\frac{\delta}{2}\cdot\frac{\pi^2}{6}=\frac{\pi^2}{12}\,\delta\approx0.822\,\delta\le\delta.$$
The number of rounds is random and unbounded, so we need a bound valid **simultaneously for every
$r$**; a fixed $\ln(2K/\delta)$ would make the sum over $r$ diverge. Allocating $\delta/r^2$ to round
$r$ makes it summable at the cost of only a $\ln r$ term in the width.

**(b)** On $\mathcal{E}$, if $i$ is put in $\hat G$ at round $r$, then
$\mu_i\ge\hat\mu_{i,r}-c_r>\tau$, so $i\in G$. If $i$ is declared below, then
$\mu_i\le\hat\mu_{i,r}+c_r<\tau$, so $i\notin G$. Every classification is correct; once all arms
are classified (part (c)), $\hat G=G$. Hence $\Pr[\hat G=G]\ge\Pr[\mathcal{E}]\ge1-\delta$. $\square$

**(c)** Suppose $\mathcal{E}$ holds, $i$ is still active at round $r$ and $c_r<\Delta_i/2$. If
$\mu_i>\tau$ (so $\mu_i=\tau+\Delta_i$):
$$\hat\mu_{i,r}-c_r\ \ge\ \mu_i-2c_r\ >\ \mu_i-\Delta_i=\tau,$$
so $i$ is classified "above" at round $r$. Symmetrically if $\mu_i=\tau-\Delta_i$:
$\hat\mu_{i,r}+c_r\le\mu_i+2c_r<\tau$. So $i$ is deactivated by round $r_i=\min\{r:c_r<\Delta_i/2\}$
and receives at most $r_i$ samples. The condition is
$r>\tfrac{2}{\Delta_i^2}\ln(4Kr^2/\delta)$, which holds e.g. for
$$r=\frac{4}{\Delta_i^2}\Big(\ln\frac{4K}{\delta}+2\ln\frac{8}{\Delta_i^2}\Big)$$
(the $\ln r$ on the right is only logarithmic in the candidate), so
$$\text{total samples}\le\sum_{i}r_i=O\!\Big(\sum_{i=1}^K\frac{1}{\Delta_i^2}\ln\frac{K}{\delta\,\Delta_i}\Big).$$
Uniform sampling until the hardest arm is decided costs $K\cdot\max_i r_i\approx\tfrac{K}{\Delta_{\min}^2}\ln(\cdot)$:
every easy arm would be sampled as often as the hardest. Elimination lets each arm pay only for
its own gap.

**(d)** Gaps $\Delta=(0.4,\ 0.1,\ 0.05,\ 0.3)$. Iterating $r\leftarrow\tfrac{2}{\Delta^2}\ln(16r^2/0.1)$
converges to $195.3,\ 4367.8,\ 19897.5,\ 376.4$, so
$$\boxed{r=(196,\ 4368,\ 19898,\ 377)},\qquad \boxed{\textstyle\sum_ir_i=24839\ \text{ vs. }\ K\max_ir_i=79592}.$$
(Check: $c_{196}=0.1997<0.2$, $c_{4368}=0.04999<0.05$.) Elimination saves about a factor $3.2$;
the arm with $\mu=0.45$ dominates the cost.

**💡 Trick.** Spend $\delta/(2Kr^2)$ per arm per round: the $\pi^2/6$ sum keeps the total under $\delta$, and on the clean event an arm is decided as soon as $2c_r<\Delta_i$.

**⚠️ Watch out.** The union bound must cover all rounds, not just all arms — an anytime confidence width needs the $\ln r$ term, and the gap here is to the threshold $\tau$, not to the best arm.

## Q3 — Softmax policy gradient with a quadratic action feature

**Hint:** Write $\log\pi$ as "linear score minus log-partition"; the gradient of the log-partition
is an expectation of features under $\pi$. At $\theta=0$ the policy is uniform — what are
$\mathbb{E}[a]$ and $\mathbb{E}[a^2]$? For the baseline, how does $\sum_j\nabla\log\pi(a_j\mid x_j)$
over the batch enter?

**Full solution:**

**(a)** $\log\pi(a\mid x;\theta)=\theta^\top\phi(x,a)-\ln\sum_b e^{\theta^\top\phi(x,b)}$, so
$$\nabla_\theta\log\pi(a\mid x;\theta)=\phi(x,a)-\mathbb{E}_{b\sim\pi(\cdot\mid x;\theta)}\phi(x,b)=\begin{pmatrix}a\,x-x\,\mathbb{E}_\pi[b]\\ a^2-\mathbb{E}_\pi[b^2]\end{pmatrix}.$$
At $\theta=0$, $\pi$ is uniform: $\mathbb{E}[b]=0$, $\mathbb{E}[b^2]=\tfrac23$, so the score is
$(a x,\ a^2-\tfrac23)$:

| $(x,a)$ | score |
|---|---|
| $(+1,+1)$ | $(1,\tfrac13)$ |
| $(+1,0)$ | $(0,-\tfrac23)$ |
| $(+1,-1)$ | $(-1,\tfrac13)$ |
| $(-1,-1)$ | $(1,\tfrac13)$ |
| $(-1,0)$ | $(0,-\tfrac23)$ |
| $(-1,+1)$ | $(-1,\tfrac13)$ |

**(b)** $J(0)=\tfrac13(1+0.2+0)=\boxed{0.4}$. For each context (by symmetry identical):
$$\tfrac13\Big[1\cdot(1,\tfrac13)+0.2\cdot(0,-\tfrac23)+0\Big]=\tfrac13\,(1,\ 0.2),$$
so $\boxed{\nabla J(0)=(\tfrac13,\ \tfrac1{15})\approx(0.3333,\ 0.0667)}$ (matches finite differences).

**(c)** Without baseline: $\sum_jr_j\,\text{score}_j=(1,\tfrac13)+(1,\tfrac13)+0.2(0,-\tfrac23)+0=(2,\tfrac8{15})$,
$$\theta^{(1)}=\tfrac14(2,\tfrac8{15})=\boxed{(0.5,\ 0.1333)}.$$
With $b=0.4$: subtract $\tfrac{0.4}{4}\sum_j\text{score}_j=0.1\,(1,\tfrac13)$ (since
$\sum_j\text{score}_j=(1,\tfrac13)$), giving $\boxed{\theta^{(1)}_b=(0.4,\ 0.1)}$. The zero-reward sample
now actively pushes **down** the wrong action, and the single-sample variance drops from $0.261$
to $0.083$ while the expected gradient is unchanged ($\mathbb{E}_\pi\nabla\log\pi=0$).

**(d)** At $\theta=(0.5,\tfrac2{15})$, for $x=+1$: weights $e^{0.6333}=1.8838$ ($a=1$), $1$ ($a=0$),
$e^{-0.3667}=0.6930$ ($a=-1$); sum $3.5768$, so $\pi=(0.527,\ 0.280,\ 0.194)$ for $(+1,0,-1)$ and
$$J=\frac{1.8838+0.2}{3.5768}=\boxed{0.5826}>0.4$$
(by symmetry the same for $x=-1$; with the baseline step $J=0.5454$). Increasing $\theta_1$ adds
$\theta_1 a x$ to the logit, raising the probability of the action that **matches** the context
(reward $1$) and lowering the mismatched one. Increasing $\theta_2$ moves mass from $a=0$ to
$a=\pm1$: at uniform play the non-zero actions earn on average $\tfrac12>0.2$, so leaving the
"safe" action is profitable. The optimal policy ($a=x$ deterministically) needs
$\theta_1\to\infty$; no finite $\theta$ represents it — softmax is always stochastic.

**💡 Trick.** Softmax score $=$ observed feature $-$ expected feature; at $\theta=0$ that is just $(ax,\ a^2-\tfrac23)$, and the expected gradient is $\mathrm{Cov}_\pi(r,\phi)$.

**⚠️ Watch out.** A sample with reward $0$ contributes nothing without a baseline — only $r-b$ makes it push the bad action down; and the $a^2$ feature is centred at $\tfrac23$, not at $0$.

## Q4 — A robust Bellman operator with two models

**Hint:** Two non-expansiveness facts carry the contraction: $|\max_a f-\max_a g|\le\max_a|f-g|$
and the same for $\min_i$. For (b), compare $T_Rv$ with $T_iv$ for the same $v$, and use that
$T_i$ is monotone. For (c), guess which action and which model are "active" in each state, solve
the linear equations, then check the guess.

**Full solution:**

**(a)** Let $Q_i^v(s,a)=r(s,a)+\gamma\sum_{s'}P_i(s'\mid s,a)v(s')$. Then
$$|Q_i^u(s,a)-Q_i^w(s,a)|=\gamma\Big|\sum_{s'}P_i(s'\mid s,a)(u-w)(s')\Big|\le\gamma\|u-w\|_\infty.$$
Using $|\min_if_i-\min_ig_i|\le\max_i|f_i-g_i|$ and then the same for $\max_a$:
$$\begin{aligned}|(T_Ru)(s)-(T_Rw)(s)|&\le\max_a\Big|\min_iQ^u_i(s,a)-\min_iQ^w_i(s,a)\Big|\\&\le\max_a\max_i|Q^u_i(s,a)-Q^w_i(s,a)|\le\gamma\|u-w\|_\infty.\end{aligned}$$
Taking $\max_s$: $\|T_Ru-T_Rw\|_\infty\le\gamma\|u-w\|_\infty$. By Banach, a unique fixed point $v_R$
exists and value iteration converges to it. (Random tests: the ratio $\|T_Ru-T_Rw\|_\infty/\|u-w\|_\infty$ never exceeded $\gamma=0.9$.)

**(b)** For every $v$ and $(s,a)$, $\min_jQ_j^v(s,a)\le Q_i^v(s,a)$; taking $\max_a$ gives
$T_Rv\le T_iv$. Apply to $v_R$: $v_R=T_Rv_R\le T_iv_R$. Since $T_i$ is monotone, induction gives
$$v_R\le T_iv_R\le T_i^2v_R\le\dots\le T_i^kv_R\ \xrightarrow{k\to\infty}\ V^*_i.$$
Hence $v_R\le\min(V^*_1,V^*_2)$. $\square$
Game interpretation: $v_R(s)$ is the value of a zero-sum game in which the agent picks $a$, then
nature (an adversary) picks which model $P_i$ generates the next state — **separately at every
$(s,a)$ visit** — to minimize the agent's discounted return. The robust policy (the arg-max) is
the best worst-case policy. Because nature may switch models between states, $v_R$ can be
strictly below both $V^*_1$ and $V^*_2$.

**(c)** Guess: safe in $s_1$; in $s_2$ nature picks $P_1$ (slow recovery). Then
$v(s_1)=0.5+0.9\,v(s_1)\Rightarrow v(s_1)=5$, and
$v(s_2)=0.9(0.2\cdot5+0.8\,v(s_2))\Rightarrow v(s_2)=\tfrac{0.9}{0.28}=\tfrac{45}{14}\approx3.214$. Check with
$v=(5,\tfrac{45}{14})$:
- $s_2$: $P_1$: $0.9(1+0.8\cdot3.214)=3.214$; $P_2$: $0.9(4+0.2\cdot3.214)=4.179$; min $=3.214$ ✓.
- $s_1$, safe: $0.5+0.9\cdot5=5$ under both models.
- $s_1$, risky: $P_1$: $1+0.9(4.5+0.3214)=5.339$; $P_2$: $1+0.9(2.5+1.607)=4.696$; min $=4.696<5$.

So $T_Rv=v$, i.e. $\boxed{v_R=(5,\ 45/14)\approx(5,\ 3.214)}$, and the **robust policy plays safe**
in $s_1$. Compare $V^*_1=(7.568,\ 4.865)$, $V^*_2=(6.457,\ 5.669)$: $v_R$ is strictly below both.
"Always risky" against nature using $P_2$ in $s_1$ and $P_1$ in $s_2$:
$$\begin{aligned}v_1&=1+0.9(0.5v_1+0.5v_2),\\ v_2&=0.9(0.2v_1+0.8v_2)\ \Rightarrow\ v_2=\tfrac{9}{14}v_1,\end{aligned}$$
so $v_1=\tfrac{280}{73}\approx\boxed{3.836}$, $v_2=\tfrac{180}{73}\approx2.466$. Each model alone makes
risky look great ($7.57$ or $6.46$), but each model is bad in a **different** state ($P_2$ leaks
out of $s_1$ fast, $P_1$ recovers from $s_2$ slowly); the adversary combines the two weak spots and
risky collapses to $3.84<5$. That is why the robust policy chooses safe even though both
nominal optimal policies choose risky.

**💡 Trick.** $\min_i$ and $\max_a$ are both 1-Lipschitz in sup-norm, so the robust operator inherits the $\gamma$-contraction; $T_R\le T_i$ plus monotonicity gives $v_R\le V^*_i$.

**⚠️ Watch out.** $v_R$ is not $\min(V^*_1,V^*_2)$ — nature may switch models per state, so the worst case can be strictly worse than either model, and the robust policy can differ from both optimal policies.
