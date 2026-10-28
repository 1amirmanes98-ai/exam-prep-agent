# Mock Exam 6 — Solutions

Every numeric answer was verified with a python3 computation: Q1 by exact backward induction over all permutations of $n=3,4$ (closed form, optimal action sets and the $a_*$ states checked for several non-integer $c$); Q2 by Monte-Carlo simulation of the per-step random discount, random-MDP tests of the inequalities, and exact evaluation of the counterexamples; Q3 by a finite-difference gradient check, exact normal equations and a long MC-SGD run converging to $w^*$; Q4 by random contraction-ratio tests, value iteration for $V^\pi\le V_\lambda\le V^*$ and $V_\lambda=V^*_{M_\lambda}$ on random MDPs, and the example.

## Q1 — Sorting tiles with costly swaps

**Hint:** Which pairs of tiles change their relative order when two *neighbours* are swapped? Once the
state collapses to the number $k$ of inversions, there are only three moves: $k\to k$, $k\to k-1$ (fee $c$),
$k\to k+1$ (fee $c$). Try to rewrite "swap a descent now, then follow the $j-1$-swap plan" and "idle now,
then follow a $j$-swap plan" in terms of $C_h(k,\cdot)$ — one of them matches $C_h(k,j)$ exactly and the
other is worse by a known amount. For (c), ask when one more swap pays for itself: a unit of disorder
removed with $h$ rounds to go saves how many future payments?

**Full solution:**
**(a)** MDP: states $S=$ all $n!$ permutations; actions $A=\{a_*,a_1,\dots,a_{n-1}\}$; deterministic
transitions $\sigma\xrightarrow{a_*}\sigma$, $\sigma\xrightarrow{a_i}\sigma\circ(i\ i{+}1)$ (positions $i,i+1$
exchanged); reward $r(\sigma,a)=-\mathrm{inv}(\sigma)-c\,\mathbb{1}[a\ne a_*]$; horizon $T$, terminal value $0$,
criterion = total (undiscounted) reward.

*Swap lemma.* Swapping positions $i,i+1$ does not change the relative order of any pair of values except
$\{\sigma_i,\sigma_{i+1}\}$: pairs not touching positions $i,i+1$ are untouched, and a value at position
$p\notin\{i,i+1\}$ is on the same side of both positions before and after, so its pairs with the two
swapped values contribute the same number of inversions. The pair $\{\sigma_i,\sigma_{i+1}\}$ flips, so
$\mathrm{inv}$ changes by $-1$ if $\sigma_i>\sigma_{i+1}$ and by $+1$ otherwise. If $\mathrm{inv}(\sigma)>0$
there is an adjacent descent: otherwise $\sigma_1<\dots<\sigma_n$, which has $0$ inversions. Likewise if
$\mathrm{inv}(\sigma)<K:=\binom n2$ there is an adjacent ascent (otherwise $\sigma$ is the reversal, with $K$ inversions).

So from any $\sigma$ with $k$ inversions the reachable disorder values are exactly $k$ (idle), $k-1$ (if
$k\ge1$) and $k+1$ (if $k<K$), and the reward depends only on $k$ and the action type. By backward
induction on $h$, $\Phi_h$ depends only on $k$, and
$$\Phi_h(k)=k+\min\Big\{\Phi_{h-1}(k),\ \ c+\Phi_{h-1}(k-1)\ [k\ge1],\ \ c+\Phi_{h-1}(k+1)\ [k<K]\Big\},\qquad \Phi_0\equiv0.$$

**(b)** Write $F_h(k)=\min_{0\le j\le\min(k,h)}C_h(k,j)$.

*Two identities* (direct expansion):
$$\begin{aligned}
C_h(k,j+1)&=k+c+C_{h-1}(k-1,j)\qquad(0\le j\le\min(k-1,h-1)),\\
k+C_{h-1}(k,j)&=C_h(k,j)+j\qquad\qquad\ \ (0\le j\le\min(k,h-1)).
\end{aligned}$$
(For the first, peel off the $i=0$ term $k$ and one fee $c$; the remaining sum is $\sum_{i=1}^{j}(k-i)=\sum_{i=0}^{j-1}((k-1)-i)$.
For the second, $k+(h-1-j)(k-j)=(h-j)(k-j)+j$.)

*Monotonicity of $F_h$ in $k$.* Each $C_h(k,j)$ is nondecreasing in $k$ for fixed $j\le k$. For
$j\le k$: $C_h(k+1,j)\ge C_h(k,j)\ge F_h(k)$. For the extra index $j=k+1\le h$:
$C_h(k+1,k+1)=\sum_{m=1}^{k+1}m+(k+1)c\ge\sum_{m=1}^{k}m+kc=C_h(k,k)\ge F_h(k)$. Hence $F_h(k+1)\ge F_h(k)$.

*Induction on $h$.* Base $h=0$: only $j=0$ is allowed and $C_0(k,0)=0=\Phi_0(k)$. Step: assume
$\Phi_{h-1}=F_{h-1}$ (hence nondecreasing). The three Bellman options:
- **swap a descent:** $k+c+\Phi_{h-1}(k-1)=\min_{j'}\big[k+c+C_{h-1}(k-1,j')\big]=\min_{1\le j\le\min(k,h)}C_h(k,j)$ by the first identity;
- **idle:** $k+\Phi_{h-1}(k)=\min_{j\le\min(k,h-1)}\big[C_h(k,j)+j\big]$, which is $\ge F_h(k)$ and, taking $j=0$, $\le C_h(k,0)=hk$;
- **swap an ascent:** $k+c+\Phi_{h-1}(k+1)>k+\Phi_{h-1}(k)$ by monotonicity and $c>0$, so it is dominated by idling.

Therefore $\Phi_h(k)=\min\{\text{idle},\text{swap-down}\}$ lies between $F_h(k)$ (both options are $\ge F_h(k)$)
and $\min\{C_h(k,0),\min_{j\ge1}C_h(k,j)\}=F_h(k)$. So $\Phi_h(k)=F_h(k)$. $\square$

**(c)**
$$C_h(k,j+1)-C_h(k,j)=(k-j)+c+(h-j-1)(k-j-1)-(h-j)(k-j)=c-(h-1-j).$$
This increases in $j$ ($C_h(k,\cdot)$ is convex), so we keep adding swaps while $c<h-1-j$, i.e. while
$j\le h-2-\lfloor c\rfloor$ ($c$ non-integer). Hence
$$j^*(h,k)=\min\big\{k,\ (h-1-\lfloor c\rfloor)^+\big\},\qquad V^*_t(\sigma)=-C_h\big(k,j^*(h,k)\big),\quad h=T-t,\ k=\mathrm{inv}(\sigma).$$
Interpretation: removing one inversion in a round with $h$ rounds to go saves $h-1$ future payments and costs $c$.

**Optimal policy:** in round $t$ (so $h=T-t$), if $\mathrm{inv}(\sigma)>0$ **and** $h\ge\lfloor c\rfloor+2$, swap
**any** adjacent descent ($\sigma_i>\sigma_{i+1}$); otherwise play $a_*$. From $(h,k)$ it swaps in exactly
$\min\{k,h-1-\lfloor c\rfloor\}^+=j^*$ consecutive rounds and then idles, so it realizes $C_h(k,j^*)=\Phi_h(k)$
from every state — it is optimal everywhere.

**$a_*$ is optimal exactly when** $\mathrm{inv}(\sigma)=0$ (row sorted) **or** $h\le\lfloor c\rfloor+1$
(i.e. $t\ge T-\lfloor c\rfloor-1$), and there it is the unique optimal action (every increment
$c-(h-1-j)>0$, and swapping an ascent is strictly dominated). At every other state idling is strictly
worse: it costs $C_h(k,j')+j'$ with $j'=j^*(h-1,k)$, and either $j'=k\ge1$ (extra $+k>0$) or
$j^*=j'+1$ with a strictly negative increment. (Confirmed by DP over all permutations of $n=3,4$.)

**(d)** $\sigma_0=(4,3,2,1)$ has $k=6$, $h=T=6$.
- $c=2.5$, $\lfloor c\rfloor=2$: $j^*=\min\{6,\,6-1-2\}=3$, swaps in rounds $t=0,1,2$, idle in $t=3,4,5$.
  $$C_6(6,3)=(6+5+4)+3(2.5)+3\cdot3=15+7.5+9=31.5\ \Rightarrow\ \boxed{V^*_0(\sigma_0)=-31.5}$$
- $c=0.5$, $\lfloor c\rfloor=0$: $j^*=\min\{6,\,5\}=5$, swaps in rounds $t=0,\dots,4$, idle in $t=5$.
  $$C_6(6,5)=(6+5+4+3+2)+5(0.5)+1\cdot1=20+2.5+1=23.5\ \Rightarrow\ \boxed{V^*_0(\sigma_0)=-23.5}$$
  The row is **not** sorted at the end (one inversion is left): a swap in the last round ($h=1$) costs
  $c=0.5$ but saves $h-1=0$ future payments, since the round's disorder is paid before the swap and there is
  no terminal cost. (Full list $C_6(6,j)$, $j=0..6$: $36,31.5,28,25.5,24,23.5,24$ — minimum at $j=5$.)

**💡 Trick.** Collapse the $n!$ permutations to $k=\mathrm{inv}(\sigma)$ via the adjacent-swap lemma; then a swap with $h$ rounds left buys $h-1$ saved payments for a fee $c$ — a time threshold $h\ge\lfloor c\rfloor+2$.

**⚠️ Watch out.** Define the policy at **every** state (any descent works; never swap an ascent), and remember the last-round swap is worthless — optimal play may leave the row unsorted.

## Q2 — Mixing two discount factors

**Hint:** Write each value as $\sum_t(\text{discount weight at }t)\cdot\mathbb{E}^\pi[r_t]$. Under
per-step mixing, the weight is an expectation of a *product of independent* coins — what is it? Under
per-episode mixing it is an expectation of a *power* of one coin. Then compare $\bar\gamma^t$ with
$\tfrac12\gamma_1^t+\tfrac12\gamma_2^t$ (which function of $\gamma$ is convex?). For (d), what does (a)
reduce the per-step criterion to, and how does the advantage of one policy over another depend on $\gamma$
— must its sign be constant on $[0.5,0.9]$?

**Full solution:**
**(a)** Let $\rho_t=\mathbb{E}^\pi[r(s_t,a_t)\mid s_0=s]$; $|\rho_t|\le R_{\max}$, so all sums below
converge absolutely (terms $\le\gamma_2^tR_{\max}$) and expectation and sum may be exchanged.
*Per-episode:* conditioning on $\Gamma$,
$W^\pi(s)=\tfrac12\sum_t\gamma_1^t\rho_t+\tfrac12\sum_t\gamma_2^t\rho_t=\tfrac12V^\pi_{\gamma_1}(s)+\tfrac12V^\pi_{\gamma_2}(s)$.
*Per-step:* $\Gamma_1,\dots,\Gamma_t$ are independent of each other and of the trajectory, so
$$\mathbb{E}\Big[\prod_{i=1}^t\Gamma_i\,r_t\Big]=\prod_{i=1}^t\mathbb{E}[\Gamma_i]\cdot\rho_t=\bar\gamma^{\,t}\rho_t
\ \Rightarrow\ U^\pi(s)=\sum_t\bar\gamma^{\,t}\rho_t=V^\pi_{\bar\gamma}(s).$$
Since this holds for every policy (the coins are unobserved, so the policy class is the usual one),
$U^*=\sup_\pi V^\pi_{\bar\gamma}=V^*_{\bar\gamma}$: the per-step problem **is** the ordinary
$\bar\gamma=0.7$-discounted MDP, which has a stationary deterministic optimal policy (greedy w.r.t. $V^*_{0.7}$).

**(b)(i)** By (a),
$$W^\pi(s)-U^\pi(s)=\sum_{t\ge0}\Big(\tfrac12\gamma_1^t+\tfrac12\gamma_2^t-\bar\gamma^{\,t}\Big)\rho_t.$$
$\gamma\mapsto\gamma^t$ is convex on $[0,1)$ for every $t\ge0$, so by Jensen each bracket is $\ge0$; with
$r\ge0$ we have $\rho_t\ge0$, hence $W^\pi\ge U^\pi$. $\square$

**(ii)** Deterministic chain $s_0\to u_1\to u_2\to z$ ($z$ absorbing, reward $0$), single action, rewards
$0,0,x$ at $s_0,u_1,u_2$; only $t=2$ matters:
$U^\pi(s_0)=0.7^2x=0.49x$, $W^\pi(s_0)=\tfrac12(0.25+0.81)x=0.53x$.
With $x=1$: $U=0.49<0.53=W$. With $x=-1$: $U=-0.49>-0.53=W$. So neither inequality holds in general
(equality holds for rewards at $t\in\{0,1\}$ only, where $\gamma^t$ is affine).

**(c)** Let $\bar\pi$ be a stationary optimal policy for $\bar\gamma$. Using (a), (b)(i) and the definition of $V^*_{\gamma_i}$:
$$\begin{aligned}
U^*(s)=V^{\bar\pi}_{\bar\gamma}(s)=U^{\bar\pi}(s)&\le W^{\bar\pi}(s)=\tfrac12V^{\bar\pi}_{\gamma_1}(s)+\tfrac12V^{\bar\pi}_{\gamma_2}(s)\\
&\le\tfrac12V^*_{\gamma_1}(s)+\tfrac12V^*_{\gamma_2}(s).\qquad\square
\end{aligned}$$
Strict example: one state, one action, reward $1$ forever.
$U^*=\tfrac{1}{1-0.7}=\tfrac{10}{3}\approx3.33$ while $\tfrac12\big(\tfrac{1}{0.5}+\tfrac{1}{0.1}\big)=\tfrac12(2+10)=6$:
$\boxed{3.33<6}$.

**(d)** **No.** States $s_0,u_1,u_2,z$; $z$ absorbing with reward $0$. In $s_0$: action *go*
(reward $24$, to $u_1$) or *out* (reward $0$, to $z$). $u_1$: single action, reward $-70$, to $u_2$.
$u_2$: single action, reward $50$, to $z$. Only $s_0$ has a choice, and
$$V^{go}_\gamma(s_0)-V^{out}_\gamma(s_0)=24-70\gamma+50\gamma^2=50(\gamma-0.6)(\gamma-0.8).$$
At $\gamma_1=0.5$: $+1.5$; at $\gamma_2=0.9$: $+1.5$ — so $\pi=$ *go* is (strictly) optimal for both.
At $\bar\gamma=0.7$: $\boxed{-0.5}$ — *out* is strictly better, and by (a) the per-step criterion equals
the $0.7$-discounted one, so *go* is **not** optimal under per-step mixing. (Rewards can be made
nonnegative by adding $70$ to every reward, including $z$'s: every policy's value shifts by
$70/(1-\gamma)$, so all comparisons are unchanged.)

**💡 Trick.** Independent per-step discounts multiply in expectation, $\mathbb{E}\prod\Gamma_i=\bar\gamma^t$, so per-step mixing is just discount $\bar\gamma$; per-episode mixing averages the values. Jensen on $\gamma^t$ compares them.

**⚠️ Watch out.** The optimal policy is **not** monotone in $\gamma$: value differences are polynomials/rational functions of $\gamma$ and can change sign twice, so "optimal at $0.5$ and at $0.9$" does not imply "optimal at $0.7$".

## Q3 — MC-SGD with a quadratic-in-features value model

**Hint:** The model is quadratic in the *feature* but how does it depend on the *parameters*? Write it as
$w^\top x(s)$ for a suitable $x(s)$ and the whole question becomes weighted linear regression. For the
updates, compute the return from each visited state to the end of the episode. For the stationary point,
the expected update is a weighted sum over states with weights equal to the visit probabilities.

**Full solution:**
**(a)** Let $x(s)=(\phi(s),\phi(s)^2)^\top$, so $V_w(s)=w^\top x(s)$ and $\nabla_wV_w(s)=x(s)=(\phi(s),\phi(s)^2)^\top$. Then
$$\nabla_wJ(w)=\sum_s\mu(s)\big(V_w(s)-V^\pi(s)\big)\,x(s),\qquad
w\leftarrow w-\alpha\sum_s\mu(s)\big(w_1\phi(s)+w_2\phi(s)^2-V^\pi(s)\big)\begin{pmatrix}\phi(s)\\ \phi(s)^2\end{pmatrix}.$$
The Hessian is $\nabla^2J=\sum_s\mu(s)x(s)x(s)^\top\succeq0$, so $J$ is **convex** (a weighted least-squares
objective; strictly convex as soon as two visited states have distinct nonzero features, since then the
vectors $x(s)$ span $\mathbb{R}^2$). Unlike exp / squared-linear models, any stationary point is global.

**(b)** At a visited state $s_t$ with return $G_t=\sum_{k\ge t}r_k$ (to the end of the episode):
$$w\leftarrow w+\alpha\big(G_t-w_1\phi(s_t)-w_2\phi(s_t)^2\big)\begin{pmatrix}\phi(s_t)\\ \phi(s_t)^2\end{pmatrix}.$$
$G_t$ is unbiased: by the Markov property and the definition of the value, $\mathbb{E}[G_t\mid s_t=s]=V^\pi(s)$.
Sampling states on-policy supplies the weights $\mu(s)$.

**(c)** Returns: $G_A=1+2=3$, $G_B=2$.
- At $A$: $x(A)=(1,1)$, $V_w(A)=0$, $w\leftarrow(0,0)+0.1\cdot3\cdot(1,1)=\boxed{(0.3,\ 0.3)}$.
- At $B$: $x(B)=(2,4)$, $V_w(B)=0.3\cdot2+0.3\cdot4=1.8$, residual $2-1.8=0.2$,
  $w\leftarrow(0.3,0.3)+0.1\cdot0.2\cdot(2,4)=\boxed{(0.34,\ 0.38)}$.

**(d)** $V^\pi(C)=4$, $V^\pi(B)=2+\tfrac12\cdot4=4$, $V^\pi(A)=1+\tfrac12\cdot4=3$;
$\mu(A)=1,\ \mu(B)=\tfrac12,\ \mu(C)=\tfrac14$. In one episode $s$ is visited with probability $\mu(s)$ and
then $\mathbb{E}[G\mid s]=V^\pi(s)$, so the expected per-episode update is
$\alpha\sum_s\mu(s)(V^\pi(s)-w^\top x(s))x(s)=-\alpha\nabla J(w)$. It vanishes iff the normal equations
$\big(\sum_s\mu x x^\top\big)w=\sum_s\mu V^\pi x$ hold:
$$\begin{pmatrix}21/4&47/4\\47/4&117/4\end{pmatrix}w=\begin{pmatrix}10\\20\end{pmatrix},\qquad\det=\tfrac{2457-2209}{16}=\tfrac{31}{2}>0.$$
The matrix is positive definite, so $J$ is strictly convex and this is its unique minimizer:
$$\boxed{w^*=\Big(\tfrac{115}{31},\ -\tfrac{25}{31}\Big)\approx(3.710,\ -0.806)}$$
Fitted values: $V_{w^*}(A)=\tfrac{90}{31}\approx2.903$, $V_{w^*}(B)=\tfrac{130}{31}\approx4.194$,
$V_{w^*}(C)=\tfrac{120}{31}\approx3.871$, with $J(w^*)=\tfrac1{62}$.
$V_{w^*}\ne V^\pi=(3,4,4)$: interpolating would need $w_1+w_2=3$, $2w_1+4w_2=4$ (so $w=(4,-1)$) and then
$3w_1+9w_2=3\ne4$. Three states but two parameters (and the model is forced through $0$ at $\phi=0$), so
$V^\pi$ is not representable; $V_{w^*}$ is its $\mu$-weighted least-squares projection — note it fits $A$
(weight $1$) best. (A long MC-SGD run with per-episode updates averaged to $(3.708,-0.806)$.)

**💡 Trick.** "Quadratic in the feature" is still **linear in the parameters**: use $x(s)=(\phi,\phi^2)$ as the feature vector and the problem is convex weighted regression with closed-form normal equations.

**⚠️ Watch out.** The return from $A$ includes $B$'s reward ($G_A=3$, not $1$), and the update at $B$ uses the $w$ already changed at $A$; also $\mu$ is the visit probability, not the stationary fraction of time.

## Q4 — An operator mixing evaluation and optimality

**Hint:** Bound each of the two pieces separately and add with weights $\lambda,1-\lambda$. For the
sandwich, use monotonicity: what is $T_\lambda V^\pi$ compared with $V^\pi$, and $T_\lambda V^*$ compared
with $V^*$? Then iterate. For (c), pull the constant $(1-\lambda)Q_V(s,\pi(s))$ inside the max.

**Full solution:**
**(a)** For any $U,V$ and $(s,a)$: $|Q_U(s,a)-Q_V(s,a)|=\gamma\big|\sum_{s'}P(s'\mid s,a)(U-V)(s')\big|\le\gamma\|U-V\|_\infty$.
Since $|\max_af(a)-\max_ag(a)|\le\max_a|f(a)-g(a)|$, $\ |T^*U(s)-T^*V(s)|\le\gamma\|U-V\|_\infty$, and directly
$|T^\pi U(s)-T^\pi V(s)|\le\gamma\|U-V\|_\infty$. By the triangle inequality,
$$|T_\lambda U(s)-T_\lambda V(s)|\le\lambda\gamma\|U-V\|_\infty+(1-\lambda)\gamma\|U-V\|_\infty=\gamma\|U-V\|_\infty.$$
Max over $s$: $T_\lambda$ is a $\gamma$-contraction; by Banach it has a unique fixed point $V_\lambda$.
$V_0$ is the fixed point of $T^\pi$, i.e. $V^\pi$; $V_1$ is the fixed point of $T^*$, i.e. $V^*$.

**(b)** $T^*$ and $T^\pi$ are monotone ($U\le V\Rightarrow TU\le TV$), hence so is $T_\lambda$.
Since $T^*V^\pi\ge T^\pi V^\pi=V^\pi$,
$T_\lambda V^\pi=\lambda T^*V^\pi+(1-\lambda)V^\pi\ge V^\pi$; applying $T_\lambda$ repeatedly and using monotonicity,
$V^\pi\le T_\lambda V^\pi\le T_\lambda^2V^\pi\le\dots\to V_\lambda$ (convergence by (a)). So $V^\pi\le V_\lambda$.
Similarly $T^\pi V^*\le T^*V^*=V^*$ gives $T_\lambda V^*=\lambda V^*+(1-\lambda)T^\pi V^*\le V^*$, so
$V^*\ge T_\lambda V^*\ge\dots\to V_\lambda$. Hence $V^\pi\le V_\lambda\le V^*$. $\square$

**(c)** The term $(1-\lambda)Q_V(s,\pi(s))$ does not depend on $a$, so
$$\begin{aligned}
(T_\lambda V)(s)&=\max_a\big[\lambda Q_V(s,a)+(1-\lambda)Q_V(s,\pi(s))\big]\\
&=\max_a\Big[r_\lambda(s,a)+\gamma\sum_{s'}P_\lambda(s'\mid s,a)V(s')\Big],
\end{aligned}$$
with $r_\lambda(s,a)=\lambda r(s,a)+(1-\lambda)r(s,\pi(s))$ and
$P_\lambda(\cdot\mid s,a)=\lambda P(\cdot\mid s,a)+(1-\lambda)P(\cdot\mid s,\pi(s))$ (a convex combination of
distributions, hence legal). So $T_\lambda=T^*_{M_\lambda}$ and $\boxed{V_\lambda=V^*_{M_\lambda}}$.
In words: an **unreliable executor** — every step your chosen action is carried out with probability
$\lambda$, and with probability $1-\lambda$ the default $\pi(s)$ is executed instead. $V_\lambda$ is the best you can
do with this partial control, which explains the sandwich of (b).

**(d)** $V(2)=\tfrac1{1-0.9}=10$ for every operator. $V^\pi(1)=\boxed{0}$ (stay forever).
$V^*(1)=0+0.9\cdot10=\boxed{9}$ (go). For $V_\lambda(1)=:x$:
$x=\max\{\underbrace{0.9x}_{\text{stay}},\ \underbrace{0.5(0.9\cdot10)+0.5(0.9x)}_{\text{go}}\}$; *go* gives
$x=4.5+0.45x$, so
$$\boxed{V_\lambda(1)=\tfrac{4.5}{0.55}=\tfrac{90}{11}\approx8.18}$$
(and $0.9x<x$, so *go* is indeed the max). But $\lambda V^*(1)+(1-\lambda)V^\pi(1)=0.5\cdot9+0=4.5\ne8.18$:
**no**, $V_\lambda$ is not the mixture of the values — even partial control lets you keep retrying *go*
until it is executed.

**💡 Trick.** Contraction is linear in the mixture: $\lambda\gamma+(1-\lambda)\gamma=\gamma$. For the fixed point, pull the $a$-independent $T^\pi$ term inside the max — $T_\lambda$ is $T^*$ of a mixed-dynamics MDP.

**⚠️ Watch out.** A mixture of operators does **not** give the mixture of fixed points: $V_\lambda\ne\lambda V^*+(1-\lambda)V^\pi$ in general; only the sandwich $V^\pi\le V_\lambda\le V^*$ is guaranteed.
