# Mock Exam 4 — Solutions

Every numeric answer was verified with a python3 computation: exact rational DP for Q1 (all $n\le 11$, with and without roll cost), the regret bounds of Q2 minimized numerically over $m$ plus a simulation of both algorithms and a random test of the $4\varepsilon$ loss lemma, finite-difference gradients and exact-fraction SGD steps for Q3, and random MDPs (contraction ratio, $0\le V_\tau-V^*\le\tau\log|A|/(1-\gamma)$) plus the one-state example for Q4.

## Q1 — Skull dice: when to bank the pot

**Hint:** What does one extra roll gain on average, and what does it risk? Write the continue value minus the bank value as "one-step gain" plus "future option value". The option value is never negative, so where does that leave the states with a small pot? For a large pot, can you ever leave the stopping region once you are in it?

**Full solution:**

**(a) Modelling as a finite-horizon MDP**

**What is asked.** Translate the story of the game into the parts of an MDP: states, actions, rewards, transitions, initial state and horizon. The answer is a definition, not a number.

**Tool and why.** Modelling a story as an MDP: ask what you must know at the moment of the decision to decide correctly, and that is the state (cheat sheet §12). The horizon is finite because the number of rolls is bounded by $N$, so $\gamma=1$ is enough (§3).

**Definitions.** Let $n$ be the number of rolls still left and $k$ the current pot. Add an absorbing state called $\text{end}$, entered when the game is over. We put $n$ into the state because the same pot is worth more when more rolls remain, so the decision depends on it.

**Solution.**

Step 1, states: the pairs $(n,k)$ with $n\in\{0,\dots,N\}$ and $k\in\mathbb{Z}_{\ge0}$, plus the state $\text{end}$. This is all the relevant information, because the past affects the future only through the pot and through the number of rolls already used.

Step 2, initial state: $(N,0)$, because the pot starts at zero and all rolls are available.

Step 3, actions: $\text{Bank}$ is always allowed, and $\text{Roll}$ is allowed only when $n\ge1$, by the rules of the game. In state $(0,k)$ you must bank.

Step 4, transitions and rewards, by the rules of the game:

| State and action | Probability | Next state | Reward |
|---|---|---|---|
| $(n,k)$, Bank | $1$ | $\text{end}$ | $k$ |
| $(n,k)$, Roll, skull | $\tfrac13$ | $\text{end}$ | $0$ |
| $(n,k)$, Roll, face $d\in\{3,4,5,6\}$ | $\tfrac16$ for each $d$ | $(n-1,k+d)$ | $0$ |

In state $\text{end}$ you stay forever with reward $0$. All rewards are non-negative, as required.

Step 5, horizon: at most $N+1$ decisions, because every roll lowers $n$ by one and at $n=0$ you must bank. So we can work without discounting.

**In words.** The reward arrives only at the moment of banking. A roll itself pays nothing; it only grows the pot or loses it.

**Sanity check.** If $N=0$, the game starts at $(0,0)$, you must bank and you get $0$. That is exactly what the rules say.

**What to write in the exam.**

- States $(n,k)$ plus an absorbing state $\text{end}$; start at $(N,0)$.
- Actions: Bank, and Roll only when $n\ge1$.
- Bank: reward $k$ and move to $\text{end}$.
- Roll: reward $0$; with probability $\tfrac13$ move to $\text{end}$, and with probability $\tfrac16$ move to $(n-1,k+d)$ for each $d\in\{3,4,5,6\}$.
- Finite horizon, $\gamma=1$.

*Verified: implementing this MDP in Python with exact fractions reproduces every value in the following parts.*

**(b) Bellman equation and $V_1$**

**What is asked.** A recursive formula for $V_n(k)$, its boundary condition, and an explicit formula for $V_1(k)$. The answer is a formula.

**Tool and why.** The finite-horizon Bellman equation (cheat sheet §2 and §3): the optimal value is the maximum over actions of the immediate reward plus the expected value of the next state. It is the right tool because each action has a known immediate outcome and a next state with known probabilities.

**Definitions.** Let $C_n(k)$ be the expected payoff if you roll now and continue optimally afterwards. We define it so that the decision becomes a comparison of two numbers: $k$ against $C_n(k)$.

**Solution.**

Step 1, boundary condition: with no rolls left you must bank, so $V_0(k)=k$.

Step 2, the value of rolling: with probability $\tfrac13$ you bust and get $0$, and in each of the other four outcomes you move to $(n-1,k+d)$ and continue optimally from there. Hence

$$C_n(k)=\tfrac13\cdot0+\tfrac16\sum_{d=3}^{6}V_{n-1}(k+d).$$

Step 3, Bellman equation: take the better of the two actions.

$$V_n(k)=\max\big\{k,\ C_n(k)\big\},\qquad n\ge1.$$

Step 4, the case $n=1$: substitute the boundary condition into $C_1$.

$$\begin{aligned}
C_1(k)&=\tfrac16\sum_{d=3}^{6}V_0(k+d)\\
&=\tfrac16\sum_{d=3}^{6}(k+d)\\
&=\tfrac16\,(4k+18)\\
&=\tfrac23k+3.
\end{aligned}$$

The second step uses $V_0(j)=j$. In the third, $k$ appears four times in the sum, and $3+4+5+6=18$.

Step 5, comparison with banking: subtract the bank value.

$$\begin{aligned}
C_1(k)-k&=\tfrac23k+3-k\\
&=3-\tfrac13k\\
&=\tfrac{9-k}{3}.
\end{aligned}$$

The expression is positive exactly when $k<9$, zero when $k=9$, and negative when $k>9$. Hence

$$V_1(k)=\begin{cases}\tfrac23k+3, & k<9,\\ k, & k\ge9.\end{cases}$$

At $k=9$ both branches equal $9$, and the tie-breaking rule says bank.

The values we will need in part (d):

| $k$ | $V_1(k)$ | Action |
|---|---|---|
| $6$ | $7$ | Roll |
| $7$ | $\tfrac{23}{3}$ | Roll |
| $8$ | $\tfrac{25}{3}$ | Roll |
| $9$ | $9$ | Bank |
| $10,11,12$ | $10,11,12$ | Bank |

**In words.** One roll adds on average $\tfrac23\cdot4.5=3$ to the pot, and with probability $\tfrac13$ it loses the whole pot, an average loss of $\tfrac{k}{3}$. Rolling pays as long as the gain $3$ is larger than the loss $\tfrac{k}{3}$, that is, as long as $k<9$.

**Sanity check.** At $k=0$ there is nothing to lose, and indeed $V_1(0)=3$, exactly the average gain of one roll.

**What to write in the exam.**

- Boundary condition $V_0(k)=k$, and for every $n\ge1$:

$$V_n(k)=\max\Big\{k,\ \tfrac16\sum_{d=3}^{6}V_{n-1}(k+d)\Big\}.$$

- For $n=1$ the roll value is $\tfrac23k+3$, so $V_1(k)=\tfrac23k+3$ when $k<9$, and $V_1(k)=k$ when $k\ge9$.

*Verified: exact-fraction DP gives $V_1(k)$ for every $k$ from $0$ to $10$, and the identity $C_1(k)=\tfrac23k+3$ was checked for every $k<30$.*

**(c) A threshold structure that does not depend on $n$**

**What is asked.** Prove that for every $n\ge1$ the optimal policy is "roll if and only if $k<\theta$" with the same $\theta$, and find it. The answer is a proof and a number.

**Tool and why.** Threshold structure in an optimal stopping problem (cheat sheet §4), with induction on $n$ (§3). Split "continue value minus bank value" into two parts: the gain of one roll, plus an option value that is never negative. We already computed the first part in part (b), and we control the second by induction.

**Definitions.** Let $g_n(k)$ be the option value:

$$g_n(k)=V_n(k)-k.$$

It is how much the right to keep playing is worth beyond banking now. We define it because the sign of the difference $C_n(k)-k$ decides the action, and with $g$ the difference takes a clean form. We have $g_n(k)\ge0$, because $V_n(k)$ is a maximum one of whose terms is $k$.

**Solution.**

Step 1, splitting the difference: substitute $V_{n-1}(j)=j+g_{n-1}(j)$, by the definition of $g$.

$$\begin{aligned}
C_n(k)-k&=\tfrac16\sum_{d=3}^{6}V_{n-1}(k+d)-k\\
&=\tfrac16\sum_{d=3}^{6}\big(k+d+g_{n-1}(k+d)\big)-k\\
&=\tfrac{4k+18}{6}-k+\tfrac16\sum_{d=3}^{6}g_{n-1}(k+d)\\
&=\tfrac{9-k}{3}+\tfrac16\sum_{d=3}^{6}g_{n-1}(k+d).
\end{aligned}$$

The last step is the same algebra as in part (b), step 5.

Step 2, Claim 1: for every $n\ge0$ and every $k\ge9$ we have $V_n(k)=k$, that is, $g_n(k)=0$.

The proof is by induction on $n$, from $0$ upwards.

**Base, $n=0$.** By the boundary condition, $V_0(k)=k$ for every $k$.

**Hypothesis.** For some $n\ge1$, $g_{n-1}(j)=0$ for every $j\ge9$.

**Step.** Let $k\ge9$. For every $d\in\{3,4,5,6\}$ we have $k+d\ge12$, and in particular $k+d\ge9$. So by the induction hypothesis $g_{n-1}(k+d)=0$. This is the only place the hypothesis is used. Substitute into step 1:

$$C_n(k)-k=\tfrac{9-k}{3}+0\le0,$$

because $k\ge9$. So banking is at least as good as rolling, and

$$V_n(k)=\max\{k,\ C_n(k)\}=k.$$

That is, banking is optimal. At $k=9$ there is a tie, and the rule says bank.

Step 3, Claim 2: for every $n\ge1$ and every $k<9$, rolling is strictly better than banking.

Since $g_{n-1}\ge0$, the sum in step 1 is non-negative, so

$$C_n(k)-k\ \ge\ \tfrac{9-k}{3}\ \ge\ \tfrac13\ >\ 0.$$

The middle inequality holds because the pot is always an integer, so $k<9$ means $k\le8$.

Step 4, conclusion: by the two claims, for every $n\ge1$ you roll if and only if $k<9$.

$$\boxed{\theta=9}$$

**A note on the wording.** Since the pot is always an integer, every $\theta$ between $8$ and $9$ (excluding $8$) describes the same policy. The standard answer is $\theta=9$, and it is unique if $\theta$ is required to be an integer.

**In words.** Below $9$ a single roll on its own already gains on average, and continuing only adds. Above $9$ even a run of rolls does not help: the pot only grows while you do not bust, so from every state you can reach you will also want to stop. Such a problem is called monotone, and in it one step of look-ahead is enough.

**Sanity check.** For $n=1$ the result coincides with part (b), where we found the same threshold $9$.

**What to write in the exam.**

- Define $g_n(k)=V_n(k)-k$, which is non-negative. Then $C_n(k)-k=\tfrac{9-k}{3}+\tfrac16\sum_d g_{n-1}(k+d)$.
- Claim 1, by induction on $n$: if $k\ge9$ then $k+d\ge9$, so $g_{n-1}(k+d)=0$, the difference is $\tfrac{9-k}{3}$, which is not positive, and so $V_n(k)=k$.
- Claim 2: if $k<9$, the difference is at least $\tfrac{9-k}{3}>0$, so you roll.
- Conclusion: $\theta=9$ for every $n$.

*Verified: exact DP gives the roll region $\{k<9\}$ for every $n$ from $1$ to $8$, with a tie exactly at $k=9$.*

**(d) Computing for $N=3$**

**What is asked.** Two numbers, $V_3(0)$ and the probability of ending with payoff $0$, plus an explanation of why $V_N(0)=V_3(0)$ for every $N\ge3$.

**Tool and why.** Backward computation with the threshold from part (c) (cheat sheet §3 and §4): the threshold already tells us what to do in every state, and all that is left is to compute expectations. The probability is computed by splitting on the roll at which you bust.

**Definitions.** No new notation. We use the table of $V_1$ from part (b).

**Solution.**

Step 1, after the first roll the pot is $k\in\{3,4,5,6\}$ and two rolls remain. All these values are below $9$, so you roll, and $V_2(k)=\tfrac16\sum_{d=3}^{6}V_1(k+d)$. Substitute from the table and bring to the common denominator $3$:

$$\begin{aligned}
V_2(3)&=\tfrac16\big(7+\tfrac{23}{3}+\tfrac{25}{3}+9\big)=\tfrac16\cdot\tfrac{21+23+25+27}{3}=\tfrac16\cdot\tfrac{96}{3}=\tfrac{16}{3},\\
V_2(4)&=\tfrac16\big(\tfrac{23}{3}+\tfrac{25}{3}+9+10\big)=\tfrac16\cdot\tfrac{23+25+27+30}{3}=\tfrac16\cdot\tfrac{105}{3}=\tfrac{35}{6},\\
V_2(5)&=\tfrac16\big(\tfrac{25}{3}+9+10+11\big)=\tfrac16\cdot\tfrac{25+27+30+33}{3}=\tfrac16\cdot\tfrac{115}{3}=\tfrac{115}{18},\\
V_2(6)&=\tfrac16\,(9+10+11+12)=\tfrac{42}{6}=7.
\end{aligned}$$

Step 2, the first roll: at $(3,0)$ the pot is $0<9$, so you roll. Bring to the common denominator $18$:

$$\begin{aligned}
V_3(0)&=\tfrac16\big(V_2(3)+V_2(4)+V_2(5)+V_2(6)\big)\\
&=\tfrac16\cdot\tfrac{96+105+115+126}{18}\\
&=\tfrac16\cdot\tfrac{442}{18}\\
&=\tfrac{221}{54}\approx4.093.
\end{aligned}$$

$$\boxed{V_3(0)=\tfrac{221}{54}\approx4.093}$$

Step 3, comparison with the naive policy of always rolling three times: the probability of surviving three rolls is $\big(\tfrac23\big)^3=\tfrac{8}{27}$, and the average pot given survival is $3\cdot4.5=13.5$. So the value is $\tfrac{8}{27}\cdot13.5=4$, below $4.093$.

Step 4, probability of payoff $0$: the optimal player gets $0$ only by busting. Split by the roll at which that happens:

| Bust on roll | When you reach this roll | Probability |
|---|---|---|
| $1$ | always | $\tfrac13$ |
| $2$ | the first roll succeeded, and the pot $3$ to $6$ is below $9$ | $\tfrac23\cdot\tfrac13=\tfrac29$ |
| $3$ | two successes with sum below $9$: $6$ of the $16$ pairs | $\tfrac49\cdot\tfrac{6}{16}\cdot\tfrac13=\tfrac{1}{18}$ |

The six pairs are $(3,3),(3,4),(4,3),(3,5),(5,3),(4,4)$. Let $P_0$ be the probability that the optimal player ends with payoff $0$, and add the three rows:

$$P_0=\tfrac{6}{18}+\tfrac{4}{18}+\tfrac{1}{18}=\boxed{\tfrac{11}{18}\approx0.611}$$

Step 5, why $V_N(0)=V_3(0)$ for every $N\ge3$: every successful roll adds at least $3$, so after three successful rolls the pot is at least $9$. By the threshold of part (c) you bank. So the optimal player never rolls a fourth time, and the extra rolls change nothing.

**In words.** On average you get a little more than $4$, even though in most games, about $61\%$, you walk away with nothing. The reason is that when you succeed, the pot is large.

**Sanity check.** Exact DP gives $V_1(0)=3$, $V_2(0)=4$ and $V_n(0)=\tfrac{221}{54}$ for every $n$ from $3$ to $11$: the value grows with $N$ up to $3$, then stops, as explained in step 5.

**What to write in the exam.**

- Backward computation with $\theta=9$: the values $V_2(3),\dots,V_2(6)$ are $\tfrac{16}{3},\tfrac{35}{6},\tfrac{115}{18},7$, and their sum divided by $6$ gives $V_3(0)$:

$$V_3(0)=\tfrac16\cdot\tfrac{442}{18}=\tfrac{221}{54}.$$

- Probability of payoff $0$: $\tfrac13+\tfrac29+\tfrac{1}{18}=\tfrac{11}{18}$.
- After three successes the pot is at least $9$ and you bank, so $V_N(0)=V_3(0)$.

*Verified: exact-fraction DP, and a Monte-Carlo simulation of one million games gives a mean of $4.087$ and a zero-payoff rate of $0.612$.*

**(e) A cost per roll**

**What is asked.** How the threshold changes when every roll costs $c$, and the threshold for $c=1$. The answer is a formula and a number.

**Tool and why.** The same split as in part (c) (cheat sheet §4). The cost simply subtracts $c$ from the continue value at every roll, so the whole argument goes through with a different constant.

**Definitions.** Let $V^c_n(k)$ be the optimal expected future payoff from state $(n,k)$, without the costs already paid. We ignore the costs already paid because they do not change with the decision from here on; they are a sunk cost. Accordingly, $g^c_n(k)=V^c_n(k)-k$.

**Solution.**

Step 1, the roll value including the cost, which is paid even when you bust:

$$C^c_n(k)=-c+\tfrac16\sum_{d=3}^{6}V^c_{n-1}(k+d).$$

Step 2, the same algebra as in part (c), step 1, with the extra term $-c$:

$$\begin{aligned}
C^c_n(k)-k&=\tfrac{9-k}{3}-c+\tfrac16\sum_{d=3}^{6}g^c_{n-1}(k+d)\\
&=\tfrac{9-3c-k}{3}+\tfrac16\sum_{d=3}^{6}g^c_{n-1}(k+d).
\end{aligned}$$

Step 3, the two claims of part (c) go through word for word, with $9$ replaced by $9-3c$. Claim 1 uses that if $k\ge9-3c$ then also $k+d\ge9-3c$, because $d>0$. Claim 2 uses $g^c\ge0$. So you roll if and only if $k<9-3c$:

$$\boxed{\theta_c=9-3c}$$

Step 4, for $c=1$:

$$\theta_1=9-3=\boxed{6}$$

That is, you roll if and only if $k\le5$, and at $k=6$ there is a tie and you bank.

**In words.** Every roll now gains on average $3-c$ instead of $3$, so it pays only as long as the expected loss $\tfrac{k}{3}$ is smaller than $3-c$.

**Sanity check.** When $c=0$ we are back to $\theta=9$. The condition $c<3$ guarantees $\theta_c>0$, that is, at $k=0$ rolling still pays.

**What to write in the exam.**

- Roll value minus bank value is $\tfrac{9-3c-k}{3}+\tfrac16\sum_d g^c_{n-1}(k+d)$.
- The same two claims with $9-3c$ in place of $9$, so $\theta_c=9-3c$, and for $c=1$ we get $\theta=6$.

*Verified: exact DP for $c\in\{\tfrac12,1,2,\tfrac52\}$ and $n\le7$ gives the roll region $\{k<9-3c\}$ for every $n$, with a tie at $k=6$ when $c=1$.*

**Common mistakes.**

- Computing the roll value as if a bust pays the pot. A bust pays $0$, and that is exactly the term $-\tfrac{k}{3}$ that sets the threshold.
- Claiming the threshold does not depend on $n$ without proving that the stopping region is closed. The proof is Claim 1, and it is necessary.
- In part (e), including the costs already paid in the decision, or forgetting that the cost is paid even on a bust.

**💡 Trick.** Write Roll minus Bank as $\tfrac{9-k}{3}$ plus a non-negative option value: below $9$ rolling wins outright, and above $9$ the option value is zero by induction because the pot can only grow.

**⚠️ Watch out.** The threshold is the same for every $n$ only because the stopping region is closed under continuing (a monotone problem); do not assume horizon-independence in general (in Skip/Bet the threshold moves with $t$), and remember a bust pays $0$, not the current pot.

## Q2 — Pairwise-min bandit: explore-then-commit with and without an anchor

**Hint:** The min of two Bernoullis is $1$ only when both are $1$ — what is its mean, and is it monotone in each arm? Treat every pair as one "super-arm" for Algorithm A: how many super-arms must the union bound cover? For Algorithm B, dividing by $q$ rescales the confidence width — by how much? Then balance exploration cost against the $T\times$(width) exploitation cost.

**Full solution:**

**(a) The mean of a pair and the best pair**

**What is asked.** A formula for the expected reward $\mu_{\{i,j\}}$ of a pair, which pair $S^*$ is best, and its mean.

**Tool and why.** Independence plus monotonicity (cheat sheet §10). The min of two $\{0,1\}$ variables is the indicator of an "and" event, so its mean is the probability of an intersection, and independence turns that into a product.

**Definitions.** No new notation; $\mu_S$ and $S^*$ are defined in the statement.

**Solution.**

Step 1, rewrite the min: both rewards are in $\{0,1\}$, so $\min\{R_i,R_j\}$ equals $1$ exactly when both rewards equal $1$, and equals $0$ otherwise. So the min is the indicator of the event that both arms succeed.

Step 2, take expectations: the mean of an indicator is the probability of its event, and the two draws are independent.

$$\begin{aligned}
\mu_{\{i,j\}}&=\Pr[R_i=1,R_j=1]\\
&=\Pr[R_i=1]\,\Pr[R_j=1]\\
&=p_ip_j.
\end{aligned}$$

Step 3, the best pair: for fixed $p_j\ge0$ the product $p_ip_j$ is non-decreasing in $p_i$, and symmetrically in $p_j$. Take any pair $\{i,j\}$ with $i<j$. Then $p_i\le p_1$ always, and $p_j\le p_2$ because $j\ge2$ and the means are sorted. Changing one factor at a time:

$$\begin{aligned}
p_ip_j&\le p_1p_j\\
&\le p_1p_2.
\end{aligned}$$

The first step uses $p_j\ge0$, the second uses $p_1\ge0$. So no pair beats $\{1,2\}$:

$$\boxed{S^*=\{1,2\},\ \mu_{S^*}=p_1p_2}$$

**In words.** A pair pays only when both of its arms succeed, so it pays like a product of success rates, and a product of non-negative numbers is largest when both factors are largest.

**Sanity check.** With $p=(0.9,0.8,0.1)$ the three pairs pay $0.72$, $0.09$ and $0.08$, and the top pair $\{1,2\}$ wins. With all means equal to $1$, every pair pays $1$ every round, matching $p_ip_j=1$.

**What to write in the exam.**

- The min of two Bernoullis is $1$ only when both are $1$, so by independence $\mu_{\{i,j\}}=p_ip_j$.
- The product is non-decreasing in each factor, so $S^*=\{1,2\}$ and $\mu_{S^*}=p_1p_2$.

*Verified: Monte-Carlo with $10^6$ draws for three random pairs of means matched $p_ip_j$ to within $3\cdot10^{-4}$.*

**(b) Confidence width for Algorithm A**

**What is asked.** A formula for $\lambda_m$ in terms of $m$, $K$ and $\delta$ such that, with probability at least $1-\delta$, all $K$ estimates are within $\lambda_m$ of their means at the same time.

**Tool and why.** Hoeffding's inequality for one pair, then a union bound over all pairs (cheat sheet §10). Hoeffding fits because each pair's samples are independent and lie in $[0,1]$; the union bound fits because we need all pairs to be accurate together.

**Definitions.** Let $\delta$ be the total failure probability we allow. Let $G$ be the good event that every pair satisfies $|\hat\mu_S-\mu_S|\le\lambda_m$; we name it because part (c) splits the regret on it.

**Solution.**

Step 1, one pair: the $m$ samples of pair $S$ are independent, take values in $\{0,1\}$, and have mean $\mu_S$, because every round draws fresh independent rewards. Hoeffding for an average of $m$ such samples gives

$$\Pr\big[|\hat\mu_S-\mu_S|>\lambda\big]\le2e^{-2m\lambda^2}.$$

Step 2, all pairs: the probability that at least one of the $K$ pairs is off by more than $\lambda$ is at most the sum of the $K$ separate probabilities (union bound):

$$\Pr\big[\exists S:\ |\hat\mu_S-\mu_S|>\lambda\big]\le2Ke^{-2m\lambda^2}.$$

Step 3, solve for the width: set the right-hand side equal to $\delta$ and take logarithms.

$$\begin{aligned}
2Ke^{-2m\lambda^2}&=\delta\\
2m\lambda^2&=\ln(2K/\delta)\\
\lambda&=\sqrt{\frac{\ln(2K/\delta)}{2m}}.
\end{aligned}$$

$$\boxed{\lambda_m=\sqrt{\frac{\ln(2K/\delta)}{2m}}}$$

Step 4, conclusion: with this width the failure probability in step 2 is at most $\delta$, so $\Pr[G]\ge1-\delta$.

**In words.** Each estimate concentrates at rate $1/\sqrt m$. Asking all $K$ of them to be accurate at once costs only a $\ln K$ inside the root, because the union bound adds failure probabilities and Hoeffding makes each of them exponentially small.

**Sanity check.** With $K=1$ this is the usual one-arm Hoeffding width $\sqrt{\ln(2/\delta)/(2m)}$. The width shrinks as $m$ grows and grows as $\delta$ shrinks, as it should. With $K=1225$, $\delta=10^{-8}$ and $m=4437$ the width is $\lambda_m\approx0.0544$.

**What to write in the exam.**

- Hoeffding for one pair: the deviation probability is at most $2e^{-2m\lambda^2}$.
- Union bound over the $K$ pairs: at most $2Ke^{-2m\lambda^2}$, set equal to $\delta$.
- Solving gives $\lambda_m=\sqrt{\ln(2K/\delta)/(2m)}$.

*Verified: for $k=6$, $m=200$ and $\delta=0.1$, $2\cdot10^4$ simulated explorations had all $15$ pairs within $\lambda_m$ in $99.7\%$ of runs, above the guaranteed $90\%$.*

**(c) The regret of Algorithm A**

**What is asked.** A proof of $\mathrm{Reg}_A(T)\le Km+2T\lambda_m+T\delta$, then a choice of $\delta$ and $m$ and a proof of the rate $\tilde O\big(k^{2/3}T^{2/3}\big)$.

**Tool and why.** The explore-then-commit decomposition (cheat sheet §10): split the rounds into exploration and commitment, and split the commitment on the good event $G$ of part (b) and its complement. Then balance the two main terms by minimizing over $m$, because more exploration lowers the width but costs rounds.

**Definitions.** Let $\hat S$ be the committed pair. After choosing $\delta$, let $L=\ln(2KT)$ be the log factor, $A=T\sqrt{2L}$ the coefficient of $m^{-1/2}$ in the bound, $f(m)$ the bound as a function of $m$, and $m^*$ its minimizer.

**Solution.**

Step 1, exploration: there are $Km$ exploration rounds, and each loses $\mu_{S^*}-\mu_{S_t}\le1$, because every mean lies in $[0,1]$. Total at most $Km$.

Step 2, commitment on $G$: the committed pair is nearly optimal.

$$\begin{aligned}
\mu_{\hat S}&\ge\hat\mu_{\hat S}-\lambda_m\\
&\ge\hat\mu_{S^*}-\lambda_m\\
&\ge\mu_{S^*}-2\lambda_m.
\end{aligned}$$

The first row holds on $G$ for the pair $\hat S$. The second holds because $\hat S$ maximizes the empirical mean. The third holds on $G$ for the pair $S^*$. So each of the at most $T$ commitment rounds loses at most $2\lambda_m$, a total of at most $2T\lambda_m$.

Step 3, commitment off $G$: this happens with probability at most $\delta$, and then each round loses at most $1$, so its contribution to the expected regret is at most $T\delta$.

Step 4, add up: the regret is the expected total loss, and splitting the expectation on $G$ and its complement gives

$$\mathrm{Reg}_A(T)\le Km+2T\lambda_m+T\delta.$$

Step 5, choosing $\delta$: take $\delta=1/T$, so that the last term is $1$. A constant $\delta$ would leave a term linear in $T$. Then $\ln(2K/\delta)=L$ and $2T\lambda_m=T\sqrt{2L/m}$, so

$$\mathrm{Reg}_A(T)\le Km+T\sqrt{\tfrac{2L}{m}}+1.$$

Step 6, choosing $m$: the bound is $f(m)=Km+Am^{-1/2}$, plus $1$. Differentiate:

$$f'(m)=K-\tfrac A2m^{-3/2}.$$

Setting it to zero gives $m^{3/2}=\tfrac{A}{2K}$, that is, $m^*=\big(\tfrac{A}{2K}\big)^{2/3}$. Since $f''(m)=\tfrac34Am^{-5/2}$ is positive, this is the minimum. At $m^*$ we have $A=2K(m^*)^{3/2}$, so the second term $A(m^*)^{-1/2}$ equals $2Km^*$, and $f(m^*)=3Km^*$.

Step 7, the rate: substitute $m^*$. The middle row uses $3K\big(\tfrac{A}{2K}\big)^{2/3}=3K^{1/3}\big(\tfrac A2\big)^{2/3}$ and $\big(\tfrac A2\big)^{2/3}=T^{2/3}\big(\tfrac L2\big)^{1/3}$.

$$\begin{aligned}
\mathrm{Reg}_A(T)&\le3Km^*+1\\
&=3K^{1/3}T^{2/3}\Big(\tfrac L2\Big)^{1/3}+1\\
&=\tilde O\big(k^{2/3}T^{2/3}\big).
\end{aligned}$$

The last row holds because $K=\tfrac{k(k-1)}{2}$ is at most $\tfrac{k^2}{2}$, so $K^{1/3}=O(k^{2/3})$, and $L$ is only logarithmic.

**In words.** Exploring more shrinks the width like $m^{-1/2}$ but costs linearly in $m$; balancing the two gives $T^{2/3}$. Treating every pair as a separate arm means about $k^2/2$ arms, and that is where $k^{2/3}$ comes from.

**Sanity check.** For $k=50$ and $T=10^8$: $K=1225$, $L\approx26.22$, $m^*\approx4437$, and the bound is about $1.63\cdot10^7$, which is sublinear (about $16\%$ of $T$). The exploration uses $Km^*\approx5.4\cdot10^6$ rounds, which fits inside $T$.

**What to write in the exam.**

- Exploration: $Km$ rounds, at most $1$ each.
- On $G$: $\mu_{\hat S}\ge\mu_{S^*}-2\lambda_m$ by the three-step chain, so at most $2T\lambda_m$; off $G$: at most $T\delta$.
- Take $\delta=1/T$ and minimize $Km+T\sqrt{2L/m}$ over $m$: $m^*=\big(\tfrac{A}{2K}\big)^{2/3}$ and the bound is $3Km^*+1$.
- With $K$ of order $k^2$ this is $\tilde O\big(k^{2/3}T^{2/3}\big)$.

*Verified: the closed form and a search over integer $m$ agree ($m^*=4437$, bound $1.631\cdot10^7$), the second term equals $2Km^*$ there, and a simulation with $k=10$, $T=10^6$ gave average regret $2.3\cdot10^4$, below the bound $2.2\cdot10^5$.*

**(d) Algorithm B with an anchor**

**What is asked.** Four things: a proof that on the event $|\hat p_i-p_i|\le\varepsilon$ the committed pair loses at most $4\varepsilon$ per round; the regret rate of B; the range of $q$ for which B beats A; and why a small $q$ hurts.

**Tool and why.** The same explore-then-commit decomposition as in part (c) (cheat sheet §10), but now each exploration pair estimates a single arm: by part (a) the pair $\{i,k\}$ has mean $qp_i$, and $q$ is known, so dividing by $q$ estimates $p_i$. The loss lemma uses only the fact that the committed arms have the two largest estimates.

**Definitions.** Let $\varepsilon$ be a common bound on all $|\hat p_i-p_i|$. Let $a\ge b$ be the true means of the two committed arms, so by part (a) the committed pair has mean $ab$. Let $\hat\nu_i$ be the empirical mean of the pair $\{i,k\}$, so that $\hat p_i=\hat\nu_i/q$. After choosing $\delta$, let $L'=\ln(2(k-1)T)$ and $A'=\tfrac{4T}{q}\sqrt{L'/2}$.

**Solution.**

Step 1, Claim 1: $a\ge p_1-2\varepsilon$. If arm $1$ is committed, then $a=p_1$, because $p_1$ is the largest mean. Otherwise both committed arms have estimates at least $\hat p_1$, because they are the two largest. For such an arm $j$:

$$\begin{aligned}
p_j&\ge\hat p_j-\varepsilon\\
&\ge\hat p_1-\varepsilon\\
&\ge p_1-2\varepsilon.
\end{aligned}$$

Step 2, Claim 2: $b\ge p_2-2\varepsilon$. If the committed pair is $\{1,2\}$, then $b=p_2$. Otherwise some arm $x\in\{1,2\}$ is not committed, both committed arms have estimates at least $\hat p_x$, and the chain of step 1 gives each of them a true mean at least $p_x-2\varepsilon$. Since $p_x\ge p_2$, also $b\ge p_2-2\varepsilon$.

Step 3, the loss when $p_2\ge2\varepsilon$: both lower bounds are then non-negative, so they can be multiplied, $ab\ge(p_1-2\varepsilon)(p_2-2\varepsilon)$. Hence

$$\begin{aligned}
p_1p_2-ab&\le p_1p_2-(p_1-2\varepsilon)(p_2-2\varepsilon)\\
&=2\varepsilon(p_1+p_2)-4\varepsilon^2\\
&\le4\varepsilon.
\end{aligned}$$

The last row uses $p_1+p_2\le2$ and drops $-4\varepsilon^2$.

Step 4, the loss when $p_2<2\varepsilon$: since $ab\ge0$ and $p_1\le1$,

$$\begin{aligned}
p_1p_2-ab&\le p_1p_2\\
&\le p_2\\
&<2\varepsilon.
\end{aligned}$$

In both cases the loss per round is at most $4\varepsilon$, which proves the lemma.

Step 5, the width: the pair $\{i,k\}$ has mean $qp_i$ by part (a). Hoeffding and a union bound over the $k-1$ explored pairs, exactly as in part (b), give, with probability at least $1-\delta$, $|\hat\nu_i-qp_i|\le\lambda_m$ for every $i<k$, where now

$$\lambda_m=\sqrt{\frac{\ln(2(k-1)/\delta)}{2m}}.$$

Divide by $q$:

$$|\hat p_i-p_i|=\frac{|\hat\nu_i-qp_i|}{q}\le\frac{\lambda_m}{q}.$$

So the event of the lemma holds with $\varepsilon=\lambda_m/q$.

Step 6, the regret bound: as in part (c), exploration costs at most $(k-1)m$, commitment on the event costs at most $4\varepsilon$ per round, and the failure event costs at most $T\delta$:

$$\mathrm{Reg}_B(T)\le(k-1)m+\frac{4T\lambda_m}{q}+T\delta.$$

Step 7, balancing: take $\delta=1/T$. Then $\tfrac{4T\lambda_m}{q}=A'm^{-1/2}$, and step 6 of part (c) with $K$ replaced by $k-1$ and $A$ by $A'$ gives $m^*=\big(\tfrac{A'}{2(k-1)}\big)^{2/3}$ and a bound of $3(k-1)m^*+1$. Since $\big(\tfrac{A'}{2}\big)^{2/3}=T^{2/3}q^{-2/3}(2L')^{1/3}$:

$$\begin{aligned}
\mathrm{Reg}_B(T)&\le3(k-1)m^*+1\\
&=3(k-1)^{1/3}T^{2/3}\frac{(2L')^{1/3}}{q^{2/3}}+1\\
&=\tilde O\big(k^{1/3}T^{2/3}q^{-2/3}\big).
\end{aligned}$$

Step 8, when B beats A: ignoring constants and logs, compare the two rates.

$$\begin{aligned}
k^{1/3}q^{-2/3}&<k^{2/3}\\
q^{2/3}&>k^{-1/3}\\
q&>k^{-1/2}.
\end{aligned}$$

$$\boxed{q\gtrsim1/\sqrt k}$$

With this proof's constants, dividing the bound of B by that of A (without the $+1$) and using $\tfrac{k-1}{K}=\tfrac2k$ gives the ratio $\big(\tfrac{8L'}{kL}\big)^{1/3}q^{-2/3}$, so B wins exactly when $kq^2>8L'/L$, roughly $kq^2>8$. For example, $k=50$, $T=10^8$, $q=\tfrac12$: A has $m_A^*\approx4437$ and bound $\approx1.63\cdot10^7$; B has $m_B^*\approx9.15\cdot10^4$ and bound $\approx1.35\cdot10^7$.

Step 9, why a small $q$ hurts: $\min\{R_i,R_k\}$ is almost always $0$ when the anchor rarely succeeds. The signal $qp_i$ shrinks every gap between arms by the factor $q$, since $qp_1-qp_2=q(p_1-p_2)$, while the Hoeffding noise $\lambda_m$ does not shrink. So the width on $p_i$ is $\lambda_m/q$, and resolving the same gap needs about $q^{-2}$ times more samples.

**In words.** The anchor replaces about $k^2/2$ super-arms by $k-1$ single-arm estimates, which is why $k^{2/3}$ drops to $k^{1/3}$. The price is that every estimate is blurred by the factor $1/q$, which costs $q^{-2/3}$ after balancing.

**Sanity check.** For $q=1$ the anchor always pays $1$, so $\min\{R_i,R_k\}=R_i$ and B is plain explore-then-commit on single arms; B then beats A once $k>8L'/L$, for example at $k=10$. The lemma is tight: with $p=(1,1,1-2\varepsilon,1-2\varepsilon)$, estimates all equal to $1-\varepsilon$ and an unlucky tie-break, the loss is $4\varepsilon-4\varepsilon^2$.

**What to write in the exam.**

- Lemma: the largest committed mean is at least $p_1-2\varepsilon$ and the smaller one at least $p_2-2\varepsilon$, so the loss is at most $2\varepsilon(p_1+p_2)$, at most $4\varepsilon$ (and below $2\varepsilon$ if $p_2<2\varepsilon$).
- Width: pair $\{i,k\}$ has mean $qp_i$, so $\varepsilon=\lambda_m/q$ with a union bound over $k-1$ pairs.
- Regret: $(k-1)m+4T\lambda_m/q+T\delta$; with $\delta=1/T$ and the best $m$ this is $\tilde O\big(k^{1/3}T^{2/3}q^{-2/3}\big)$.
- B beats A when $q\gtrsim1/\sqrt k$; a small $q$ shrinks the signal but not the noise.

*Verified: a random test over $2\cdot10^5$ instances never exceeded $4\varepsilon$ (worst ratio $2.97\varepsilon$), the tight example gives $3.996\varepsilon$ at $\varepsilon=10^{-3}$, the closed form and an integer search agree ($m_B^*=91519$, bound $1.345\cdot10^7$), and the A/B comparison over $k\in\{10,50,200\}$ and six values of $q$ matched $kq^2>8L'/L$.*

**Common mistakes.**

- Taking the union bound over the $k$ arms in Algorithm A instead of the $\binom k2$ pairs, or skipping it: the width is then too small and the guarantee is false.
- Keeping $\delta$ constant: the term $T\delta$ is then linear in $T$ and the bound says nothing.
- Using the width $\lambda_m$ on $p_i$ in Algorithm B instead of $\lambda_m/q$: the factor $q^{-2/3}$ disappears and the comparison with A comes out wrong.

**💡 Trick.** Min-feedback of independent Bernoullis is a product, $p_ip_j$ — monotone in each arm, so ETC over pairs works as is; an anchor with known $q$ turns each pair into a rescaled single-arm estimate, trading $\binom k2$ super-arms for $k-1$ at the price of a $1/q$ wider interval.

**⚠️ Watch out.** The union bound must cover every estimated quantity ($\binom k2$ pairs in A, $k-1$ in B), $\delta$ must be $1/T$ (not a constant), and in B the width on $p_i$ is $\lambda_m/q$, not $\lambda_m$ — forgetting the $1/q$ hides why a weak anchor is useless.

## Q3 — Monte-Carlo SGD for a saturating value model

**Hint:** Differentiate $\tfrac{as}{b+s}$ separately in $a$ and in $b$ (quotient rule for $b$). The MC-SGD step is "learning rate times (return minus prediction) times gradient of the prediction". For (d), can the model hit both target values exactly?

**Full solution:**

**(a) The gradient of the model and the full GD update**

**What is asked.** The vector $\nabla_\theta\hat V(s;\theta)$ as a formula, and the full gradient-descent update for $J^\pi$ with step size $\alpha$.

**Tool and why.** Partial derivatives and the chain rule for a squared loss (cheat sheet §8). The parameter $a$ enters linearly, and $b$ enters through a quotient, so each partial derivative is one line.

**Definitions.** No new notation; $\theta=(a,b)$, $\mu$ and $\alpha$ are from the statement.

**Solution.**

Step 1, derivative in $a$: the model is $a$ times $\tfrac{s}{b+s}$, which does not depend on $a$, so

$$\frac{\partial\hat V}{\partial a}=\frac{s}{b+s}.$$

Step 2, derivative in $b$: write the model as $as\,(b+s)^{-1}$; the derivative of $(b+s)^{-1}$ in $b$ is $-(b+s)^{-2}$, so

$$\frac{\partial\hat V}{\partial b}=-\frac{a\,s}{(b+s)^2}.$$

Step 3, the gradient: put the two components together.

$$\nabla_\theta\hat V(s;\theta)=\Big(\frac{s}{b+s},\ -\frac{as}{(b+s)^2}\Big).$$

Step 4, the gradient of the loss: by the chain rule, the derivative of $\tfrac12\big(V^\pi(s)-\hat V\big)^2$ is $\big(V^\pi(s)-\hat V\big)$ times $-\nabla_\theta\hat V$. Summing with weights $\mu(s)$:

$$\nabla J^\pi(\theta)=\sum_s\mu(s)\big(\hat V(s;\theta)-V^\pi(s)\big)\nabla_\theta\hat V(s;\theta).$$

Step 5, the update: step against the gradient.

$$\theta_{t+1}=\theta_t-\alpha\sum_s\mu(s)\big(\hat V(s;\theta_t)-V^\pi(s)\big)\nabla_\theta\hat V(s;\theta_t).$$

**In words.** Raising $a$ scales the whole curve up. Raising $b$ delays the saturation and so lowers the prediction at every $s$, which is why the $b$-component has the opposite sign to the $a$-component when $a>0$.

**Sanity check.** At $\theta=(2,1)$ the gradient is $(\tfrac12,-\tfrac12)$ at $s=1$ and $(\tfrac34,-\tfrac38)$ at $s=3$, and central finite differences give the same numbers.

**What to write in the exam.**

- Partial derivatives $\tfrac{s}{b+s}$ in $a$ and $-\tfrac{as}{(b+s)^2}$ in $b$.
- Gradient of $J^\pi$: the weighted sum of (prediction minus target) times $\nabla_\theta\hat V$.
- Update: $\theta_{t+1}$ is $\theta_t$ minus $\alpha$ times that sum.

*Verified: sympy differentiation and central finite differences at $(2,1)$ for $s=1$ and $s=3$ agree to $10^{-9}$.*

**(b) The MC-SGD update**

**What is asked.** The update formula from one visited state $s_t$ with return $G_t$, and an argument that its expectation is a gradient step on $J^\pi$.

**Tool and why.** Monte-Carlo SGD (cheat sheet §8): replace the unknown target $V^\pi(s)$ by an unbiased sample of it, the return, and replace the weighted sum over $\mu$ by the states actually visited.

**Definitions.** Let $G_t=\sum_{j\ge t}\gamma^{j-t}r_j$ be the discounted return from the visit at time $t$.

**Solution.**

Step 1, the update: take step 5 of part (a), drop the sum, and replace $V^\pi(s_t)$ by $G_t$ (the sign flips because we write target minus prediction).

$$\theta_{t+1}=\theta_t+\alpha\big(G_t-\hat V(s_t;\theta_t)\big)\nabla_\theta\hat V(s_t;\theta_t).$$

Step 2, the states have law $\mu$: following $\pi$, state $s$ is visited with probability $\mu(s)$, and at most once per episode, so summing over the visits of an episode is the same as summing over $s$ with weight $\mu(s)$.

Step 3, the return is unbiased: by the definition of $V^\pi$, given $s_t=s$ the return $G_t$ has conditional mean $V^\pi(s)$.

Step 4, the expected update: with $\theta_t$ fixed, combine steps 2 and 3.

$$\begin{aligned}
\mathbb{E}\Big[\sum_t\big(G_t-\hat V(s_t)\big)\nabla\hat V(s_t)\Big]&=\sum_s\mu(s)\big(V^\pi(s)-\hat V(s)\big)\nabla\hat V(s)\\
&=-\nabla J^\pi(\theta_t).
\end{aligned}$$

The last row is step 4 of part (a). So the expected step is $-\alpha\nabla J^\pi(\theta_t)$: a valid stochastic gradient step.

**In words.** We do not know the target $V^\pi(s)$, but the return is a noisy version of it with the right mean, and the noise averages out over many updates.

**Sanity check.** If $G_t$ equals the prediction, the update is zero. If $G_t$ is larger, the step moves along $\nabla_\theta\hat V$, which raises the prediction at $s_t$ to first order, as it should.

**What to write in the exam.**

- Update: $\theta_{t+1}=\theta_t+\alpha\big(G_t-\hat V(s_t)\big)\nabla_\theta\hat V(s_t)$.
- Visited states have law $\mu$, and given $s_t=s$ the return has mean $V^\pi(s)$.
- So the expected step is $-\alpha\nabla J^\pi$.

*Verified: with the data of part (d), sympy gives the $\mu$-weighted expected update plus $\nabla J^\pi$ equal to zero identically in $(a,b)$.*

**(c) Two MC-SGD steps**

**What is asked.** The returns, and the numbers $\theta_1$ and $\theta_2$ after the two updates done in time order.

**Tool and why.** The update of part (b) applied twice in sequence (cheat sheet §8); with $\gamma=1$ a return is the plain sum of the remaining rewards.

**Definitions.** Let $e_t=G_t-\hat V(s_t;\theta_t)$ be the residual of update $t$.

**Solution.**

Step 1, returns: from $s_0$ both rewards follow, so $G_0$ is $1+2=3$. From $s_1$ only the last reward follows, so $G_1=2$.

Step 2, first update, at $s_0=1$ with $\theta_0=(2,1)$:

$$\hat V(1;\theta_0)=\frac{2\cdot1}{1+1}=1.$$

So $e_0=3-1$, which is $2$. The gradient at $s=1$ is $(\tfrac12,-\tfrac12)$ from part (a). Then

$$\begin{aligned}
\theta_1&=(2,1)+0.1\cdot2\cdot\big(\tfrac12,-\tfrac12\big)\\
&=(2,1)+(0.1,-0.1)\\
&=(2.1,\ 0.9).
\end{aligned}$$

$$\boxed{\theta_1=(2.1,\ 0.9)}$$

Step 3, second update, at $s_1=3$ with the new parameters $\theta_1$. Each quantity, with where it comes from:

| Quantity | Formula | Value |
|---|---|---|
| prediction | $\tfrac{2.1\cdot3}{0.9+3}=\tfrac{6.3}{3.9}$ | $\tfrac{21}{13}\approx1.6154$ |
| residual $e_1$ | $2-\tfrac{21}{13}$ | $\tfrac5{13}\approx0.3846$ |
| $a$-component | $\tfrac{3}{3.9}$ | $\tfrac{10}{13}\approx0.7692$ |
| $b$-component | $-\tfrac{2.1\cdot3}{3.9^2}=-\tfrac{6.3}{15.21}$ | $-\tfrac{70}{169}\approx-0.4142$ |

Step 4, the increment: $\alpha e_1=0.1\cdot\tfrac5{13}$, which is $\tfrac1{26}$. Multiply the gradient by it:

$$\tfrac1{26}\Big(\tfrac{10}{13},-\tfrac{70}{169}\Big)=\Big(\tfrac{5}{169},-\tfrac{35}{2197}\Big).$$

Step 5, add to $\theta_1$, writing $2.1$ as $\tfrac{3549}{1690}$ and $0.9$ as $\tfrac{19773}{21970}$:

$$\begin{aligned}
\theta_2&=\Big(\tfrac{3549}{1690}+\tfrac{50}{1690},\ \tfrac{19773}{21970}-\tfrac{350}{21970}\Big)\\
&=\Big(\tfrac{3599}{1690},\ \tfrac{19423}{21970}\Big).
\end{aligned}$$

$$\theta_2=\Big(\tfrac{3599}{1690},\ \tfrac{19423}{21970}\Big)\approx\boxed{(2.1296,\ 0.8841)}$$

**In words.** Both returns were above the predictions, so both updates raised the predictions: $a$ went up (the curve scales up) and $b$ went down (the curve saturates later, which also raises it). The second step is smaller because its residual is smaller.

**Sanity check.** The prediction at $s=3$ moves toward its return $2$: it is $1.5$ under $\theta_0$, $\tfrac{21}{13}\approx1.615$ under $\theta_1$, and about $1.645$ under $\theta_2$.

**What to write in the exam.**

- Returns $G_0=3$ and $G_1=2$.
- Step 1: prediction $1$, residual $2$, gradient $(\tfrac12,-\tfrac12)$, so $\theta_1=(2.1,0.9)$.
- Step 2, with $\theta_1$: prediction $\tfrac{21}{13}$, residual $\tfrac5{13}$, gradient $(\tfrac{10}{13},-\tfrac{70}{169})$.
- Result: $\theta_2\approx(2.1296,0.8841)$.

*Verified: the two updates were recomputed with exact Python fractions, giving $\tfrac{3599}{1690}$ and $\tfrac{19423}{21970}$.*

**(d) Stationary points and the minimizer**

**What is asked.** The two equations of a stationary point; for the given data a minimizer with $b>0$ and a check that it solves the equations; and the limit of MC-SGD with small steps.

**Tool and why.** Set $\nabla J^\pi=0$ (cheat sheet §8). Since $J^\pi$ is a weighted sum of squares it is never negative, so any $\theta$ with zero residuals is a global minimizer: guess such a $\theta$ and verify it.

**Definitions.** No new notation; the residual at $s$ is $V^\pi(s)-\hat V(s)$.

**Solution.**

Step 1, the equations: the two components of $\nabla J^\pi$ from part (a), set to zero.

$$\sum_s\mu(s)\big(V^\pi(s)-\hat V(s)\big)\frac{s}{b+s}=0,$$

$$\sum_s\mu(s)\big(V^\pi(s)-\hat V(s)\big)\frac{a\,s}{(b+s)^2}=0.$$

Step 2, zero residuals: with the data, $J^\pi$ is $\tfrac14$ times the sum of the two squared residuals, so $J^\pi=0$ exactly when both residuals vanish:

$$\frac{a}{b+1}=1,\qquad\frac{3a}{b+3}=2.$$

Step 3, solve: the first equation gives $a=b+1$. Substitute it into the second:

$$\begin{aligned}
3(b+1)&=2(b+3)\\
3b+3&=2b+6\\
b&=3.
\end{aligned}$$

So $a=4$, and $b>0$ as required.

$$\boxed{(a,b)=(4,3)}$$

Step 4, verify: $\hat V(1)$ is $\tfrac44=1$ and $\hat V(3)$ is $\tfrac{12}{6}=2$, so both residuals are zero, every term of both sums in step 1 is zero, and $J^\pi=0$. Since $J^\pi\ge0$, this is a global minimizer.

Step 5, the limit of MC-SGD: by part (b) the expected step is $-\alpha\nabla J^\pi$, so with small (decreasing) steps MC-SGD follows the gradient flow of $J^\pi$. From the start $(2,1)$ that flow reaches $(4,3)$, and the minimizer is strict (the Hessian there has eigenvalues about $0.0018$ and $0.24$, both positive). So in expectation MC-SGD converges to $(4,3)$.

**In words.** Two visited states and two parameters: the model can pass exactly through both target points, and the saturating curve through $(1,1)$ and $(3,2)$ is the one with $a=4$, $b=3$. Since $J^\pi$ is not convex, this convergence is a fact about this start, not a general guarantee.

**Sanity check.** For fixed $b$ the model is linear in $a$ (feature $\tfrac{s}{b+s}$), so the first equation alone is least squares in $a$. Let $a^*(1)$ be the best $a$ when $b=1$; the features are $\tfrac12$ and $\tfrac34$:

$$a^*(1)=\frac{\tfrac12\cdot\tfrac12\cdot1+\tfrac12\cdot\tfrac34\cdot2}{\tfrac12\cdot\tfrac14+\tfrac12\cdot\tfrac{9}{16}}=\frac{32}{13}.$$

That is below $4$, as expected: with $b$ stuck at $1$ the curve cannot fit both points.

**What to write in the exam.**

- Stationarity: the two sums of $\mu$-weighted residuals times $\tfrac{s}{b+s}$ and times $\tfrac{as}{(b+s)^2}$ are zero.
- Zero residuals: $a=b+1$ and $3a=2(b+3)$, so $(a,b)=(4,3)$.
- There $J^\pi=0$, so it is a global minimizer and both equations hold.
- MC-SGD follows $-\nabla J^\pi$ in expectation, so from $(2,1)$ it converges to $(4,3)$.

*Verified: sympy finds the unique zero-residual point $(4,3)$ with zero gradient and positive Hessian; gradient descent from $(2,1)$ reaches $(4,3)$ with $b$ never below $0.90$; $20$ noisy MC-SGD runs ended at mean $(4.008,3.009)$.*

**Common mistakes.**

- Using $\theta_0$ for both updates in part (c) instead of $\theta_1$ for the second one: this gives a different $\theta_2$.
- Dropping the minus sign of $\tfrac{\partial\hat V}{\partial b}$: then $b$ moves the wrong way.
- Taking $G_0=1$ (only the immediate reward) instead of the full return $3$.

**💡 Trick.** Same MC-SGD template as every recent Q3 — only $\nabla_\theta\hat V$ changes: $a$ enters linearly (gradient $=\tfrac{s}{b+s}$), $b$ through the quotient rule (gradient $=-\tfrac{as}{(b+s)^2}$, always opposite in sign to $a$).

**⚠️ Watch out.** Do the two updates sequentially — step 2 uses $\theta_1$, not $\theta_0$ — and keep $b>0$: the model has a pole at $b=-s$, so a big step that drives $b$ negative breaks it; $J^\pi$ is non-convex in $(a,b)$, so in general SGD only reaches a stationary point.

## Q4 — The soft (log-sum-exp) Bellman operator

**Hint:** Log-sum-exp is a "soft max": compare $\sum_ae^{x_a/\tau}$ with its largest term and with $|A|$ times its largest term. For the Lipschitz part, adding the same constant to every coordinate shifts $f_\tau$ by exactly that constant, and $f_\tau$ is monotone. For (c), write $V_\tau-V^*=(T_\tau V_\tau-TV_\tau)+(TV_\tau-TV^*)$.

**Full solution:**

**(a) Bounds and the Lipschitz property of log-sum-exp**

**What is asked.** Two proofs: the sandwich $\max_ax_a\le f_\tau(x)$ and $f_\tau(x)\le\max_ax_a+\tau\log|A|$, and the bound $|f_\tau(x)-f_\tau(y)|\le\max_a|x_a-y_a|$.

**Tool and why.** Compare the sum with its largest term, then use two properties of $f_\tau$, monotonicity and shifting by constants (cheat sheet §6). These are the same two properties that make the ordinary max a non-expansion, so the proof for max carries over.

**Definitions.** Let $x_{\max}=\max_ax_a$. For the Lipschitz part let $c=\max_a|x_a-y_a|$ be the largest coordinate gap, and let $\mathbf 1$ be the all-ones vector in $\mathbb{R}^{|A|}$.

**Solution.**

Step 1, sandwich the sum: all terms are positive, the largest is $e^{x_{\max}/\tau}$, and each of the $|A|$ terms is at most the largest one.

$$e^{x_{\max}/\tau}\le\sum_ae^{x_a/\tau}\le|A|e^{x_{\max}/\tau}.$$

Step 2, apply $\tau\log$, which is increasing because $\tau>0$; on the right, $\tau\log\big(|A|e^{x_{\max}/\tau}\big)$ splits into $\tau\log|A|+x_{\max}$.

$$x_{\max}\le f_\tau(x)\le x_{\max}+\tau\log|A|.$$

Step 3, shifting by a constant: for a number $c$, the factor $e^{c/\tau}$ comes out of the sum.

$$\begin{aligned}
f_\tau(y+c\mathbf1)&=\tau\log\sum_ae^{(y_a+c)/\tau}\\
&=\tau\log\Big(e^{c/\tau}\sum_ae^{y_a/\tau}\Big)\\
&=f_\tau(y)+c.
\end{aligned}$$

Step 4, monotonicity: if $x\le z$ in every coordinate, every exponential term for $x$ is at most the one for $z$, so $f_\tau(x)\le f_\tau(z)$.

Step 5, the Lipschitz bound: by the definition of $c$, $x\le y+c\mathbf 1$ in every coordinate. By step 4 and then step 3:

$$f_\tau(x)\le f_\tau(y+c\mathbf1)=f_\tau(y)+c.$$

The definition of $c$ is symmetric in $x$ and $y$, so the same argument gives $f_\tau(y)\le f_\tau(x)+c$. Together:

$$|f_\tau(x)-f_\tau(y)|\le\max_a|x_a-y_a|.$$

An equivalent route: $\nabla f_\tau=\mathrm{softmax}(x/\tau)$ has non-negative entries summing to $1$, and the mean value theorem gives the same bound.

**In words.** Log-sum-exp is a max that may overestimate by a bounded amount, at most $\tau\log|A|$. And like the max, if every input moves by at most $c$, the output moves by at most $c$.

**Sanity check.** If all coordinates equal $v$, then $f_\tau(x)=v+\tau\log|A|$, so the upper bound is attained. As $\tau\to0$ the gap $\tau\log|A|$ vanishes and $f_\tau$ becomes the max.

**What to write in the exam.**

- Bound the sum between its largest term and $|A|$ times it, then apply $\tau\log$.
- Shift: $f_\tau(y+c\mathbf1)=f_\tau(y)+c$; and $f_\tau$ is monotone.
- With $c=\max_a|x_a-y_a|$: $x\le y+c\mathbf1$, so $f_\tau(x)$ is at most $f_\tau(y)+c$, and by symmetry the Lipschitz bound follows.

*Verified: $2\cdot10^4$ random $(x,y,\tau)$ satisfied both bounds, and the largest ratio of $|f_\tau(x)-f_\tau(y)|$ to $c$ was $1.0000$.*

**(b) $T_\tau$ is a $\gamma$-contraction**

**What is asked.** A proof that $\|T_\tau U-T_\tau W\|_\infty\le\gamma\|U-W\|_\infty$, and the conclusion that $T_\tau$ has a unique fixed point.

**Tool and why.** Part (a) state by state, plus the fact that $P(\cdot\mid s,a)$ is a probability vector; then Banach's fixed-point theorem (cheat sheet §6).

**Definitions.** No new notation; $Q_V$ is from the statement and $\|\cdot\|_\infty$ is the maximum over states.

**Solution.**

Step 1, one state: $(T_\tau V)(s)$ is $f_\tau$ applied to the vector $Q_V(s,\cdot)$. By the Lipschitz bound of part (a):

$$|(T_\tau U)(s)-(T_\tau W)(s)|\le\max_a|Q_U(s,a)-Q_W(s,a)|.$$

Step 2, the difference of the $Q$-values: the rewards cancel.

$$Q_U(s,a)-Q_W(s,a)=\gamma\sum_{s'}P(s'\mid s,a)\big(U(s')-W(s')\big).$$

Step 3, bound it: the sum is an average with non-negative weights summing to $1$, so its absolute value is at most the largest $|U(s')-W(s')|$:

$$\Big|\sum_{s'}P(s'\mid s,a)\big(U(s')-W(s')\big)\Big|\le\|U-W\|_\infty.$$

Step 4, combine steps 1 to 3 and take the maximum over $s$:

$$\|T_\tau U-T_\tau W\|_\infty\le\gamma\|U-W\|_\infty.$$

Step 5, the fixed point: $\gamma<1$ and $\mathbb{R}^{|S|}$ with $\|\cdot\|_\infty$ is complete, so by Banach's fixed-point theorem $T_\tau$ has a unique fixed point $V_\tau$, and $T_\tau^nV_0\to V_\tau$ from any start $V_0$.

**In words.** The soft max is as non-expanding as the hard max, so the discount $\gamma$ alone produces the contraction, exactly as for the ordinary Bellman operator.

**Sanity check.** Replacing $f_\tau$ by the max gives, word for word, the standard proof that $T$ is a $\gamma$-contraction.

**What to write in the exam.**

- Per state, by part (a): the gap is at most $\max_a|Q_U(s,a)-Q_W(s,a)|$.
- Rewards cancel, and an average of $U-W$ is at most $\|U-W\|_\infty$ in absolute value, so the gap is at most $\gamma\|U-W\|_\infty$.
- Banach: a unique fixed point $V_\tau$, reached from any start.

*Verified: $400$ random MDPs with $5$ random pairs $(U,W)$ each; the largest observed ratio was $0.9992\gamma$.*

**(c) Sandwich bounds on $V_\tau$**

**What is asked.** A proof of the two inequalities, for every state.

**Tool and why.** Compare the operators through part (a); for the upper bound use that $T$ is a $\gamma$-contraction with the triangle inequality, and for the lower bound use that $T_\tau$ is monotone and iterate it from $V^*$ (cheat sheet §6).

**Definitions.** Let $\beta=\tau\log|A|$ be the largest overestimate of one soft step, and $\Delta=\|V_\tau-V^*\|_\infty$ the distance we want to bound.

**Solution.**

Step 1, comparing the operators: apply part (a) to $x=Q_V(s,\cdot)$ at every state. In every coordinate:

$$TV\le T_\tau V\le TV+\beta.$$

Step 2, a decomposition: use $V_\tau=T_\tau V_\tau$ and $V^*=TV^*$, and add and subtract $TV_\tau$.

$$V_\tau-V^*=(T_\tau V_\tau-TV_\tau)+(TV_\tau-TV^*).$$

Step 3, the two brackets: by step 1, every coordinate of the first bracket lies in $[0,\beta]$, so its norm is at most $\beta$. The second bracket has norm at most $\gamma\Delta$, because $T$ is a $\gamma$-contraction.

Step 4, the upper bound: by the triangle inequality, then solving for $\Delta$:

$$\begin{aligned}
\Delta&\le\beta+\gamma\Delta\\
(1-\gamma)\Delta&\le\beta\\
\Delta&\le\frac{\tau\log|A|}{1-\gamma}.
\end{aligned}$$

In particular $V_\tau(s)-V^*(s)$ is at most this bound for every $s$.

Step 5, $T_\tau$ is monotone: if $U\le W$ in every coordinate, then $Q_U\le Q_W$, because $\gamma>0$ and $P\ge0$, and so $T_\tau U\le T_\tau W$ by step 4 of part (a).

Step 6, **Claim.** For every $n\ge0$, $T_\tau^nV^*\ge V^*$. The proof is by induction on $n$, upwards.

**Base.** For $n=0$ both sides are $V^*$.

**Hypothesis.** For some $n\ge1$, $T_\tau^{n-1}V^*\ge V^*$.

**Step.** Apply $T_\tau$ to both sides of the hypothesis; by step 5 the inequality is kept. This is where the hypothesis is used. Then use step 1 and the fixed-point property of $V^*$:

$$\begin{aligned}
T_\tau^nV^*&\ge T_\tau V^*\\
&\ge TV^*\\
&=V^*.
\end{aligned}$$

Step 7, the lower bound: by part (b), $T_\tau^nV^*\to V_\tau$, and a coordinate-wise inequality survives the limit, so $V_\tau\ge V^*$.

Step 8, together:

$$\boxed{V^*\le V_\tau\le V^*+\frac{\tau\log|A|}{1-\gamma}}$$

**In words.** Each soft Bellman step overestimates by at most $\beta$, and future steps are discounted, so the overestimates add up to at most $\beta(1+\gamma+\gamma^2+\cdots)$, which is $\tfrac{\beta}{1-\gamma}$. The soft value never falls below $V^*$, because the soft max is never below the max.

**Sanity check.** As $\tau\to0$ the bound goes to $0$ and $V_\tau\to V^*$. Part (d) shows an MDP where the upper bound is attained.

**What to write in the exam.**

- From part (a): $TV\le T_\tau V$ and $T_\tau V\le TV+\tau\log|A|$.
- Upper: write $V_\tau-V^*=(T_\tau V_\tau-TV_\tau)+(TV_\tau-TV^*)$, so $\Delta\le\beta+\gamma\Delta$ and $\Delta\le\tfrac{\beta}{1-\gamma}$.
- Lower: $T_\tau$ is monotone and $T_\tau V^*\ge V^*$, so by induction $T_\tau^nV^*\ge V^*$, and the limit gives $V_\tau\ge V^*$.

*Verified: on $400$ random MDPs the smallest coordinate of $V_\tau-V^*$ was $0$ up to rounding ($-2\cdot10^{-16}$), and the largest gap was $0.943$ of the bound.*

**(d) The bound is tight**

**What is asked.** A one-state MDP with $V_\tau-V^*=\tfrac{\tau\log|A|}{1-\gamma}$ exactly, and the numbers $V^*$ and $V_\tau$ for $|A|=2$, $r=1$, $\gamma=0.9$, $\tau=0.1$.

**Tool and why.** With one state both fixed-point equations are scalar equations that can be solved by hand (cheat sheet §6). For the bound to be attained, the upper inequality of part (a) must be an equality at every step, which happens when all actions tie.

**Definitions.** One state; every action gives reward $r$ and returns to that state. Then $V^*$ and $V_\tau$ are numbers.

**Solution.**

Step 1, the optimal value: every action has $Q$-value $r+\gamma V^*$, so

$$V^*=r+\gamma V^*\ \Longrightarrow\ V^*=\frac{r}{1-\gamma}.$$

Step 2, the soft value: all $|A|$ terms of the sum are equal, so the sum is $|A|$ times one term.

$$\begin{aligned}
V_\tau&=\tau\log\big(|A|e^{(r+\gamma V_\tau)/\tau}\big)\\
&=\tau\log|A|+r+\gamma V_\tau.
\end{aligned}$$

Move $\gamma V_\tau$ to the left and divide by $1-\gamma$:

$$V_\tau=\frac{r+\tau\log|A|}{1-\gamma}.$$

Step 3, the gap: subtracting step 1 gives $V_\tau-V^*=\tfrac{\tau\log|A|}{1-\gamma}$ exactly, so the bound of part (c) is attained. The reason is that all actions tie, so the upper inequality of part (a) is an equality at every step.

Step 4, the numbers, with $r=1$, $\gamma=0.9$, $\tau=0.1$ and $|A|=2$:

$$V^*=\frac{1}{0.1}=\boxed{10}$$

$$\begin{aligned}
V_\tau&=\frac{1+0.1\ln2}{0.1}\\
&=10+\ln2\\
&\approx\boxed{10.693}.
\end{aligned}$$

The gap is $\ln2\approx0.693$, which equals the bound $\tfrac{0.1\ln2}{0.1}$.

**In words.** With identical actions, the soft max adds its full bonus $\tau\log|A|$ at every step and never uses it to pick a better action, so the whole bonus accumulates through the discounting.

**Sanity check.** With $|A|=1$ the gap would be $\tau\log1=0$, as it should be, since then the soft max of one number is that number.

**What to write in the exam.**

- One state, all actions reward $r$: $V^*=\tfrac{r}{1-\gamma}$.
- Soft: $V_\tau=\tau\log|A|+r+\gamma V_\tau$, so $V_\tau=\tfrac{r+\tau\log|A|}{1-\gamma}$ and the gap equals the bound.
- Numbers: $V^*=10$ and $V_\tau=10+\ln2$, about $10.693$.

*Verified: iterating both operators $5000$ times on this MDP gives $10.000000$ and $10.693147$, and the gap equals $\ln2$ to $10^{-14}$.*

**Common mistakes.**

- Claiming $V_\tau\le V^*$ because the soft max is "smoother": the direction is the opposite, since $f_\tau$ is never below the max.
- Stopping at a gap of $\tau\log|A|$ and forgetting that the per-step bias accumulates through the discounting into $\tfrac{\tau\log|A|}{1-\gamma}$.
- In part (b), bounding $\big|\sum_{s'}P(s'\mid s,a)(U-W)(s')\big|$ by a sum of absolute values without using that the weights sum to $1$: the factor $\gamma$ alone is then not justified.

**💡 Trick.** Log-sum-exp is a soft max: it is monotone, shifts with constants, and over-estimates the max by at most $\tau\log|A|$ — so every max-operator contraction proof goes through unchanged, and the per-step bias $\tau\log|A|$ accumulates geometrically into $\tfrac{\tau\log|A|}{1-\gamma}$.

**⚠️ Watch out.** The soft value is **above** $V^*$, not below ($f_\tau\ge\max$); and the gap is $\tfrac{\tau\log|A|}{1-\gamma}$, not $\tau\log|A|$ — the per-step bias is paid at every step of the discounted future.
