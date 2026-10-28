# Mock Exam 4 — Solutions

Every numeric answer was verified with a python3 computation: exact rational DP for Q1 (all $n\le 11$, with and without roll cost), the regret bounds of Q2 minimized numerically over $m$ plus a simulation of both algorithms and a random test of the $4\varepsilon$ loss lemma, finite-difference gradients and exact-fraction SGD steps for Q3, and random MDPs (contraction ratio, $0\le V_\tau-V^*\le\tau\log|A|/(1-\gamma)$) plus the one-state example for Q4.

## Q1 — Skull dice: when to bank the pot

**Hint:** What does one extra roll gain on average, and what does it risk? Write the continue value minus the bank value as "one-step gain" plus "future option value". The option value is never negative, so where does that leave the states with a small pot? For a large pot, can you ever leave the stopping region once you are in it?

**Full solution:**

**(a)** States $(n,k)$: $n\in\{0,\dots,N\}$ rolls left and pot $k\in\mathbb{Z}_{\ge0}$, plus an absorbing state $\text{end}$. Initial state $(N,0)$. Actions: $\{\text{Bank},\text{Roll}\}$ ($\text{Roll}$ only when $n\ge1$). Rewards (all $\ge0$): $R((n,k),\text{Bank})=k$, then go to $\text{end}$; $R((n,k),\text{Roll})=0$. Transitions of Roll: to $\text{end}$ with probability $\tfrac13$ (bust, payoff $0$), to $(n-1,k+d)$ with probability $\tfrac16$ for each $d\in\{3,4,5,6\}$. At $n=0$ only Bank is allowed. $\text{end}$ is absorbing with reward $0$. Horizon $N+1$ decisions, $\gamma=1$ (finite because the game ends after at most $N$ rolls).

**(b)** Boundary $V_0(k)=k$, and for $n\ge1$

$$V_n(k)=\max\Big\{\underbrace{k}_{\text{Bank}},\ \underbrace{C_n(k)}_{\text{Roll}}\Big\},\qquad C_n(k)=\tfrac13\cdot0+\tfrac16\sum_{d=3}^{6}V_{n-1}(k+d).$$

For $n=1$: $C_1(k)=\tfrac16\sum_{d=3}^6(k+d)=\tfrac{4k+18}{6}=\tfrac23k+3$, so

$$V_1(k)=\max\big\{k,\ \tfrac23k+3\big\}=\begin{cases}\tfrac23k+3,&k<9\\ k,&k\ge9.\end{cases}$$

**(c)** Write $g_n(k)=V_n(k)-k\ge0$ (the value of the option to keep playing). Then

$$\begin{aligned}C_n(k)-k&=\tfrac16\sum_{d=3}^{6}\big(k+d+g_{n-1}(k+d)\big)-k\\ &=\frac{18-2k}{6}+\frac16\sum_{d=3}^{6}g_{n-1}(k+d)=\frac{9-k}{3}+\frac16\sum_{d=3}^{6}g_{n-1}(k+d).\end{aligned}$$

*Claim 1: $V_n(k)=k$ for all $k\ge9$ and all $n\ge0$.* Induction on $n$. $n=0$ is the boundary. If it holds for $n-1$, then for $k\ge9$ also $k+d\ge9$, so $g_{n-1}(k+d)=0$ and $C_n(k)-k=\tfrac{9-k}{3}\le0$: Bank is optimal and $V_n(k)=k$.

*Claim 2: for $k<9$ Roll is strictly better, for every $n\ge1$.* Since $g_{n-1}\ge0$, $C_n(k)-k\ge\tfrac{9-k}{3}>0$.

Hence for every $n\ge1$: Roll iff $k<\theta$, with $\boxed{\theta=9}$ (at $k=9$ the two actions tie and the player Banks). The threshold is the **myopic** one ("a single extra roll does not pay"): this is a monotone stopping problem — the stopping set $\{k\ge9\}$ is closed, because the pot only grows while you keep playing, so one-step look-ahead is optimal.

**(d)** Backward with $\theta=9$. Needed values of $V_1$: $V_1(6)=7,\ V_1(7)=\tfrac{23}{3},\ V_1(8)=\tfrac{25}{3},\ V_1(k)=k$ for $k\ge9$. After the first roll $k\in\{3,4,5,6\}$ with two rolls left:

$$\begin{aligned}V_2(3)&=\tfrac16\big(7+\tfrac{23}{3}+\tfrac{25}{3}+9\big)=\tfrac{16}{3},\qquad V_2(4)=\tfrac16\big(\tfrac{23}{3}+\tfrac{25}{3}+9+10\big)=\tfrac{35}{6},\\ V_2(5)&=\tfrac16\big(\tfrac{25}{3}+9+10+11\big)=\tfrac{115}{18},\qquad V_2(6)=\tfrac16(9+10+11+12)=7.\end{aligned}$$

$$V_3(0)=\tfrac16\Big(\tfrac{16}{3}+\tfrac{35}{6}+\tfrac{115}{18}+7\Big)=\boxed{\tfrac{221}{54}\approx4.093}$$

(compare: always rolling three times gives $(\tfrac23)^3\cdot13.5=4$). Payoff $0$ means a bust: bust on roll 1 ($\tfrac13$), or on roll 2 ($\tfrac23\cdot\tfrac13$), or reach roll 3 with pot $<9$ (two non-skull faces summing to $6,7,8$: $6$ of $16$ pairs) and bust:

$$\Pr[\text{payoff }0]=\tfrac13+\tfrac29+\tfrac49\cdot\tfrac{6}{16}\cdot\tfrac13=\boxed{\tfrac{11}{18}\approx0.611}.$$

For $N\ge3$: after three successful rolls the pot is at least $3+3+3=9\ge\theta$, so the optimal player always Banks before a 4th roll; extra rolls are never used and $V_N(0)=V_3(0)$ (exact DP: $V_1(0)=3,\ V_2(0)=4,\ V_n(0)=\tfrac{221}{54}$ for $n=3,\dots,11$).

**(e)** With cost $c$ the continue value drops by $c$: $C_n(k)-k=\tfrac{9-k}{3}-c+\tfrac16\sum_d g_{n-1}(k+d)$, and the same two claims go through with $9$ replaced by $9-3c$. So Roll iff $k<\boxed{\theta_c=9-3c}$; for $c=1$, $\theta=6$ (Roll iff $k\le5$; tie at $k=6$). (DP-verified for $n\le7$.)

**💡 Trick.** Write Roll minus Bank as $\tfrac{9-k}{3}$ plus a non-negative option value: below $9$ rolling wins outright, and above $9$ the option value is zero by induction because the pot can only grow.

**⚠️ Watch out.** The threshold is the same for every $n$ only because the stopping region is closed under continuing (a monotone problem); do not assume horizon-independence in general (in Skip/Bet the threshold moves with $t$), and remember a bust pays $0$, not the current pot.

## Q2 — Pairwise-min bandit: explore-then-commit with and without an anchor

**Hint:** The min of two Bernoullis is $1$ only when both are $1$ — what is its mean, and is it monotone in each arm? Treat every pair as one "super-arm" for Algorithm A: how many super-arms must the union bound cover? For Algorithm B, dividing by $q$ rescales the confidence width — by how much? Then balance exploration cost against the $T\times$(width) exploitation cost.

**Full solution:**

**(a)** By independence $\mu_{\{i,j\}}=\Pr[R_i=1,R_j=1]=p_ip_j$. It is non-decreasing in each of $p_i,p_j\ge0$, so the best pair takes the two largest means: $\boxed{S^*=\{1,2\},\ \mu_{S^*}=p_1p_2}$.

**(b)** Each $\hat\mu_S$ averages $m$ i.i.d. $\{0,1\}$ samples with mean $\mu_S$. Hoeffding: $\Pr[|\hat\mu_S-\mu_S|>\lambda]\le2e^{-2m\lambda^2}$. Union bound over the $K=\binom k2$ pairs, total failure $\le2Ke^{-2m\lambda^2}=\delta$:

$$\lambda_m=\sqrt{\frac{\ln(2K/\delta)}{2m}}.$$

**(c)** Exploration: $Km$ rounds, each losing at most $\mu_{S^*}-\mu_S\le1$. On the good event $G$ (probability $\ge1-\delta$),

$$\mu_{\hat S}\ \ge\ \hat\mu_{\hat S}-\lambda_m\ \ge\ \hat\mu_{S^*}-\lambda_m\ \ge\ \mu_{S^*}-2\lambda_m,$$

so each of the $\le T$ exploitation rounds loses $\le2\lambda_m$; off $G$ (probability $\le\delta$) each round loses $\le1$. Hence $\mathrm{Reg}_A(T)\le Km+2T\lambda_m+T\delta$. Take $\delta=1/T$ and $L=\ln(2KT)$:

$$\mathrm{Reg}_A(T)\le Km+T\sqrt{\tfrac{2L}{m}}+1.$$

Minimizing $f(m)=Km+Am^{-1/2}$ with $A=T\sqrt{2L}$: $f'(m)=K-\tfrac A2m^{-3/2}=0$ gives $m^*=\big(\tfrac{A}{2K}\big)^{2/3}$, and at $m^*$ the second term equals $2Km^*$, so

$$\mathrm{Reg}_A(T)\le3Km^*+1=3K^{1/3}T^{2/3}\Big(\tfrac L2\Big)^{1/3}+1=\tilde O\big(k^{2/3}T^{2/3}\big)\quad(K\approx k^2/2).$$

**(d)** *Loss lemma.* Let $\varepsilon$ bound all $|\hat p_i-p_i|$ and let $a\ge b$ be the true means of the committed arms. If arm $1$ is not chosen, both chosen arms have $\hat p\ge\hat p_1\ge p_1-\varepsilon$, so their true means are $\ge p_1-2\varepsilon$; hence $a\ge p_1-2\varepsilon$ always. If $\{1,2\}$ is not the chosen pair, some $x\in\{1,2\}$ is not chosen and both chosen arms have true mean $\ge p_x-2\varepsilon\ge p_2-2\varepsilon$; hence $b\ge p_2-2\varepsilon$. If $p_2\ge2\varepsilon$:

$$p_1p_2-ab\le p_1p_2-(p_1-2\varepsilon)(p_2-2\varepsilon)=2\varepsilon(p_1+p_2)-4\varepsilon^2\le4\varepsilon,$$

and if $p_2<2\varepsilon$ then $p_1p_2-ab\le p_2<2\varepsilon$. (A random test over $2\cdot10^5$ instances gave a worst ratio of $2.17\varepsilon$.)

*Width.* The pair $\{i,k\}$ has mean $qp_i$; with $\lambda_m=\sqrt{\ln(2(k-1)/\delta)/(2m)}$ (union over $k-1$ pairs) we get $|\hat p_i-p_i|\le\varepsilon=\lambda_m/q$ for all $i$ with probability $\ge1-\delta$. So

$$\mathrm{Reg}_B(T)\le(k-1)m+\frac{4T\lambda_m}{q}+T\delta.$$

With $\delta=1/T$, $L'=\ln(2(k-1)T)$, $A'=\tfrac{4T}{q}\sqrt{L'/2}$, the same balancing gives $m^*=\big(\tfrac{A'}{2(k-1)}\big)^{2/3}$ and

$$\mathrm{Reg}_B(T)\le3(k-1)^{1/3}T^{2/3}\frac{(2L')^{1/3}}{q^{2/3}}+1=\tilde O\big(k^{1/3}T^{2/3}q^{-2/3}\big).$$

*Comparison.* $k^{1/3}q^{-2/3}<k^{2/3}\iff q>k^{-1/2}$: the anchor pays off when $q\gtrsim1/\sqrt k$ (with this proof's constants, roughly $kq^2>8$; e.g. $k=50$, $T=10^8$, $q=\tfrac12$: $m_A^*\approx4437$, bound $\approx1.63\cdot10^7$; $m_B^*\approx9.15\cdot10^4$, bound $\approx1.35\cdot10^7$). A small $q$ hurts because $\min\{R_i,R_k\}$ is almost always $0$ when the anchor rarely succeeds: the signal $qp_i$ shrinks the gaps between arms by a factor $q$, while the Hoeffding noise does not shrink, so the width on $p_i$ is $\lambda_m/q$.

**💡 Trick.** Min-feedback of independent Bernoullis is a product, $p_ip_j$ — monotone in each arm, so ETC over pairs works as is; an anchor with known $q$ turns each pair into a rescaled single-arm estimate, trading $\binom k2$ super-arms for $k-1$ at the price of a $1/q$ wider interval.

**⚠️ Watch out.** The union bound must cover every estimated quantity ($\binom k2$ pairs in A, $k-1$ in B), $\delta$ must be $1/T$ (not a constant), and in B the width on $p_i$ is $\lambda_m/q$, not $\lambda_m$ — forgetting the $1/q$ hides why a weak anchor is useless.

## Q3 — Monte-Carlo SGD for a saturating value model

**Hint:** Differentiate $\tfrac{as}{b+s}$ separately in $a$ and in $b$ (quotient rule for $b$). The MC-SGD step is "learning rate times (return minus prediction) times gradient of the prediction". For (d), can the model hit both target values exactly?

**Full solution:**

**(a)**

$$\frac{\partial\hat V}{\partial a}=\frac{s}{b+s},\qquad \frac{\partial\hat V}{\partial b}=-\frac{a\,s}{(b+s)^2},\qquad \nabla_\theta\hat V(s;\theta)=\Big(\frac{s}{b+s},\ -\frac{as}{(b+s)^2}\Big).$$

Since $\nabla J^\pi=\sum_s\mu(s)\big(\hat V(s;\theta)-V^\pi(s)\big)\nabla_\theta\hat V(s;\theta)$,

$$\theta_{t+1}=\theta_t-\alpha\sum_s\mu(s)\big(\hat V(s;\theta_t)-V^\pi(s)\big)\nabla_\theta\hat V(s;\theta_t).$$

(Finite differences at $\theta=(2,1)$ confirm $(0.5,-0.5)$ at $s=1$ and $(0.75,-0.375)$ at $s=3$.)

**(b)** With the Monte-Carlo return $G_t=\sum_{j\ge t}\gamma^{j-t}r_j$ from the visit at $s_t$:

$$\theta_{t+1}=\theta_t+\alpha\big(G_t-\hat V(s_t;\theta_t)\big)\nabla_\theta\hat V(s_t;\theta_t).$$

It is a stochastic gradient: states drawn on-policy have law $\mu$, and $\mathbb{E}[G_t\mid s_t=s]=V^\pi(s)$, so the expected step equals $-\alpha\nabla J^\pi(\theta_t)$.

**(c)** Returns ($\gamma=1$): $G_0=1+2=3$ at $s=1$, $G_1=2$ at $s=3$.

*Step 1* ($s=1$, $\theta_0=(2,1)$): $\hat V=\tfrac{2}{2}=1$, residual $3-1=2$, gradient $(\tfrac12,-\tfrac12)$:

$$\theta_1=(2,1)+0.1\cdot2\cdot\big(\tfrac12,-\tfrac12\big)=\boxed{(2.1,\ 0.9)}.$$

*Step 2* ($s=3$): $\hat V=\tfrac{2.1\cdot3}{3.9}=\tfrac{21}{13}\approx1.6154$, residual $2-\tfrac{21}{13}=\tfrac5{13}\approx0.3846$, gradient $\big(\tfrac{3}{3.9},-\tfrac{2.1\cdot3}{3.9^2}\big)=\big(\tfrac{10}{13},-\tfrac{70}{169}\big)\approx(0.7692,-0.4142)$:

$$\theta_2=\Big(\tfrac{3599}{1690},\ \tfrac{19423}{21970}\Big)\approx\boxed{(2.1296,\ 0.8841)}.$$

**(d)** A stationary point has $\nabla J^\pi=0$:

$$\sum_s\mu(s)\big(V^\pi(s)-\hat V(s)\big)\frac{s}{b+s}=0,\qquad \sum_s\mu(s)\big(V^\pi(s)-\hat V(s)\big)\frac{a\,s}{(b+s)^2}=0.$$

With the given data, $J^\pi\ge0$ and $J^\pi=0$ iff $\tfrac{a}{b+1}=1$ and $\tfrac{3a}{b+3}=2$: $a=b+1$, $3b+3=2b+6$, so $\boxed{(a,b)=(4,3)}$ ($b>0$), a global minimizer. Both residuals vanish there, so both equations hold. MC-SGD with small (decreasing) steps follows the expected gradient $-\nabla J^\pi$, so from a nearby start such as $(2,1)$ it converges to $(4,3)$ (a simulation with noisy returns ends at $\approx(4.03,2.97)$). Note that for fixed $b$ the model is linear in $a$ (feature $\tfrac{s}{b+s}$), so the first equation alone is a least-squares problem in $a$, e.g. $a^*(b{=}1)=\tfrac{32}{13}$.

**💡 Trick.** Same MC-SGD template as every recent Q3 — only $\nabla_\theta\hat V$ changes: $a$ enters linearly (gradient $=\tfrac{s}{b+s}$), $b$ through the quotient rule (gradient $=-\tfrac{as}{(b+s)^2}$, always opposite in sign to $a$).

**⚠️ Watch out.** Do the two updates sequentially — step 2 uses $\theta_1$, not $\theta_0$ — and keep $b>0$: the model has a pole at $b=-s$, so a big step that drives $b$ negative breaks it; $J^\pi$ is non-convex in $(a,b)$, so in general SGD only reaches a stationary point.

## Q4 — The soft (log-sum-exp) Bellman operator

**Hint:** Log-sum-exp is a "soft max": compare $\sum_ae^{x_a/\tau}$ with its largest term and with $|A|$ times its largest term. For the Lipschitz part, adding the same constant to every coordinate shifts $f_\tau$ by exactly that constant, and $f_\tau$ is monotone. For (c), write $V_\tau-V^*=(T_\tau V_\tau-TV_\tau)+(TV_\tau-TV^*)$.

**Full solution:**

**(a)** Let $x_{\max}=\max_ax_a$. Then $e^{x_{\max}/\tau}\le\sum_ae^{x_a/\tau}\le|A|e^{x_{\max}/\tau}$; taking $\tau\log$ gives $x_{\max}\le f_\tau(x)\le x_{\max}+\tau\log|A|$. For the Lipschitz bound let $c=\max_a|x_a-y_a|$. Then $x\le y+c\mathbf 1$ coordinate-wise, $f_\tau$ is monotone and $f_\tau(y+c\mathbf1)=f_\tau(y)+c$, so $f_\tau(x)\le f_\tau(y)+c$; by symmetry $|f_\tau(x)-f_\tau(y)|\le c$. (Equivalently: $\nabla f_\tau=\mathrm{softmax}(x/\tau)$ has non-negative entries summing to $1$, and apply the mean value theorem.)

**(b)** For each $s$, $(T_\tau V)(s)=f_\tau\big(Q_V(s,\cdot)\big)$. By (a),

$$\begin{aligned}|(T_\tau U)(s)-(T_\tau W)(s)|&\le\max_a|Q_U(s,a)-Q_W(s,a)|=\gamma\max_a\Big|\sum_{s'}P(s'\mid s,a)\big(U(s')-W(s')\big)\Big|\\ &\le\gamma\|U-W\|_\infty.\end{aligned}$$

Taking the max over $s$: $\|T_\tau U-T_\tau W\|_\infty\le\gamma\|U-W\|_\infty$. By Banach's fixed-point theorem $T_\tau$ has a unique fixed point $V_\tau$, and $T_\tau^nV_0\to V_\tau$ from any start. (Random MDPs: the observed ratio never exceeded $\gamma$.)

**(c)** By (a), for every $V$: $TV\le T_\tau V\le TV+\tau\log|A|$.

*Upper bound.* $V_\tau-V^*=(T_\tau V_\tau-TV_\tau)+(TV_\tau-TV^*)$; the first bracket lies in $[0,\tau\log|A|]$ and the second has sup-norm $\le\gamma\|V_\tau-V^*\|_\infty$, since $T$ is a $\gamma$-contraction. So $\|V_\tau-V^*\|_\infty\le\tau\log|A|+\gamma\|V_\tau-V^*\|_\infty$, i.e.

$$\|V_\tau-V^*\|_\infty\le\frac{\tau\log|A|}{1-\gamma}.$$

*Lower bound.* $T_\tau V^*\ge TV^*=V^*$, and $T_\tau$ is monotone ($U\le W\Rightarrow T_\tau U\le T_\tau W$, since $f_\tau$ is monotone and $P\ge0$). Inductively $T_\tau^nV^*\ge V^*$, and letting $n\to\infty$ gives $V_\tau\ge V^*$. Together, $V^*\le V_\tau\le V^*+\tfrac{\tau\log|A|}{1-\gamma}$. (Checked on 400 random MDPs: $\min(V_\tau-V^*)\ge0$ and the largest gap stayed below the bound.)

**(d)** One state, every action has reward $r$ and returns to the same state. Then $V^*=r+\gamma V^*\Rightarrow V^*=\tfrac{r}{1-\gamma}$, and

$$V_\tau=\tau\log\big(|A|e^{(r+\gamma V_\tau)/\tau}\big)=\tau\log|A|+r+\gamma V_\tau\ \Longrightarrow\ V_\tau=\frac{r+\tau\log|A|}{1-\gamma},$$

so $V_\tau-V^*=\tfrac{\tau\log|A|}{1-\gamma}$ exactly — the bound is attained (all $|A|$ actions tie, so the upper inequality of (a) is an equality at every step). Numbers: $V^*=\tfrac{1}{0.1}=\boxed{10}$, $V_\tau=\tfrac{1+0.1\ln2}{0.1}=10+\ln2\approx\boxed{10.693}$, gap $\ln2\approx0.693=\tfrac{0.1\ln2}{0.1}$.

**💡 Trick.** Log-sum-exp is a soft max: it is monotone, shifts with constants, and over-estimates the max by at most $\tau\log|A|$ — so every max-operator contraction proof goes through unchanged, and the per-step bias $\tau\log|A|$ accumulates geometrically into $\tfrac{\tau\log|A|}{1-\gamma}$.

**⚠️ Watch out.** The soft value is **above** $V^*$, not below ($f_\tau\ge\max$); and the gap is $\tfrac{\tau\log|A|}{1-\gamma}$, not $\tau\log|A|$ — the per-step bias is paid at every step of the discounted future.
