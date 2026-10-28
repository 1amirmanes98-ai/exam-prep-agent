# Mock Exam 3 — Solutions

Every numeric answer was verified with a python3 computation: exact-fraction DP over the $(b,r)$ grid plus random policies for Q1, runs of TD(λ) and TD(0) for Q2, an exact sympy solve and operator iterations for Q3, and the bounds plus a simulation of successive elimination for Q4.

## Q1 — The red-card game

**Hint:** Guess the answer $W(b,r)=r/(b+r)$ and prove it by induction on $b+r$. For the
"continue" action, condition on the color of the discarded card and use the inductive
hypothesis — the two terms telescope back to $r/(b+r)$.

**Full solution:**

**(a) Modelling as a finite-horizon MDP**

**What is asked.** Translate the game into MDP components: state, actions, reward, transitions and horizon. The answer is a definition, not a number.

**Tool and why.** Modelling a story as an MDP (cheat sheet §12): ask what you must know at the moment of decision to decide correctly; that is the state. This is an optimal-stopping problem (§4), and the horizon is finite because the deck runs out, so $\gamma=1$ suffices (§3).

**Definitions.** Let $b$ and $r$ be the numbers of black and red cards not yet revealed. Add an absorbing state $\text{end}$ entered after the bet. The state is the pair of counts because only they determine the probability that the next card is red.

**Solution.**

Step 1, states: pairs $(b,r)$ of non-negative integers with $b+r\ge1$, plus $\text{end}$. This is enough because the deck is uniformly shuffled: given the remaining counts, every ordering of the remaining cards is equally likely, so the order of the cards already revealed adds no information. This is the Markov property.

Step 2, actions: $\text{stop}$, i.e. bet now that the next card is red, is always allowed. $\text{reveal}$, i.e. reveal a card and continue, is allowed only when $b+r\ge2$, because you must bet before the deck runs out. With one card left you must stop.

Step 3, transitions and rewards, by the rules of the game:

| State and action | Probability | Next state | Reward |
|---|---|---|---|
| stop, next card red | $\tfrac{r}{b+r}$ | $\text{end}$ | $1$ |
| stop, next card black | $\tfrac{b}{b+r}$ | $\text{end}$ | $0$ |
| reveal, black shown | $\tfrac{b}{b+r}$ | $(b-1,r)$ | $0$ |
| reveal, red shown | $\tfrac{r}{b+r}$ | $(b,r-1)$ | $0$ |

The probabilities hold because the next card is uniform among the $b+r$ remaining cards. In $\text{end}$ you stay forever with reward $0$.

Step 4, initial state and horizon: start at the given $(b,r)$. Each reveal lowers $b+r$ by one, and with one card left you must stop, so there are at most $b+r$ decisions. The horizon is finite and we work without discounting.

**In words.** The reward arrives only at the moment of the bet, and it is $1$ exactly when the next card is red. Revealing pays nothing; it only changes the counts.

**Sanity check.** With one card left you must stop, and you win exactly when it is red. So $W(0,1)=1$ and $W(1,0)=0$, as the rules say.

**What to write in the exam.**

- State $(b,r)$, the counts of remaining cards, plus an absorbing state $\text{end}$.
- Actions: stop and bet red, or reveal only when $b+r\ge2$.
- Stop: reward $1$ with probability $\tfrac{r}{b+r}$, otherwise $0$, and move to $\text{end}$.
- Reveal: reward $0$; move to $(b-1,r)$ with probability $\tfrac{b}{b+r}$ and to $(b,r-1)$ with probability $\tfrac{r}{b+r}$.
- Horizon of at most $b+r$ decisions, $\gamma=1$.

*Verified: an exact-fraction Python implementation of this MDP for all $b+r\le20$ reproduces the values in parts (b) and (c).*

**(b) Bellman equation and proof by induction**

**What is asked.** Write the Bellman equation for $W(b,r)$ and prove by induction on $b+r$ that $W(b,r)=\tfrac{r}{b+r}$. The answer is a formula and a proof.

**Tool and why.** The Bellman equation of a stopping problem (cheat sheet §2 and §4): the value is the maximum of the stop value and the continue value. The induction is on the number of cards, bottom-up, because revealing always leads to a state with one card fewer (§3, backward computation).

**Definitions.** Let $n=b+r$, the number of cards left. Let $S(b,r)$ be the stop value and $C(b,r)$ the value of revealing and then continuing optimally. They are introduced so that the decision becomes a comparison of two numbers.

**Solution.**

Step 1, stop value: the next card is uniform among the $n$ cards, so it is red with probability

$$S(b,r)=\tfrac{r}{b+r}.$$

Step 2, reveal value: condition on the color revealed. Black with probability $\tfrac{b}{n}$, then continue optimally from $(b-1,r)$; red with probability $\tfrac{r}{n}$, then continue from $(b,r-1)$:

$$C(b,r)=\tfrac{b}{b+r}W(b-1,r)+\tfrac{r}{b+r}W(b,r-1).$$

When $b=0$ the first term is multiplied by $0$ and is not needed; likewise the second when $r=0$.

Step 3, Bellman equation: take the better of the two actions; with one card left you must stop.

$$W(b,r)=\max\Big\{\underbrace{\tfrac{r}{b+r}}_{\text{stop, bet red}},\ \underbrace{\tfrac{b}{b+r}W(b-1,r)+\tfrac{r}{b+r}W(b,r-1)}_{\text{reveal one card, then continue}}\Big\},\qquad n\ge2,$$

$$W(b,r)=\tfrac{r}{b+r},\qquad n=1.$$

Step 4, the proof.

**Claim.** For all non-negative integers $b,r$ with $b+r\ge1$, $W(b,r)=\tfrac{r}{b+r}$.

The proof is by induction on $n=b+r$, from $1$ upward.

**Base.** For $n=1$ only stopping is allowed. In $(0,1)$ the card is red and $W=1$; in $(1,0)$ it is black and $W=0$. The formula gives $\tfrac11=1$ and $\tfrac01=0$, respectively.

**Hypothesis.** For some $n\ge2$, the claim holds for every state with $n-1$ cards.

**Step.** Take a state with $b+r=n$. The two states a reveal leads to, $(b-1,r)$ and $(b,r-1)$, have $n-1$ cards. So by the hypothesis, and this is the only place it is used:

$$W(b-1,r)=\tfrac{r}{n-1},\qquad W(b,r-1)=\tfrac{r-1}{n-1}.$$

Substitute into the reveal value from Step 2:

$$\begin{aligned}
C(b,r)&=\tfrac{b}{n}\cdot\tfrac{r}{n-1}+\tfrac{r}{n}\cdot\tfrac{r-1}{n-1}\\
&=\tfrac{br+r(r-1)}{n(n-1)}\\
&=\tfrac{r(b+r-1)}{n(n-1)}\\
&=\tfrac{r(n-1)}{n(n-1)}\\
&=\tfrac{r}{n}.
\end{aligned}$$

The second line is a common denominator, the third factors out $r$, and the fourth uses $b+r=n$. If $b=0$ or $r=0$ the corresponding term vanishes in both forms, so the computation holds then too. Hence

$$W(b,r)=\max\Big\{\tfrac{r}{n},\ \tfrac{r}{n}\Big\}=\tfrac{r}{n}.$$

This completes the step. $\square$

$$\boxed{W(b,r)=\tfrac{r}{b+r}}$$

Step 5, every policy is equal: in every state stopping and revealing give exactly the same value, so every action is optimal in every state. The very same induction, with $V^\pi$ of an arbitrary policy $\pi$ in place of $W$, shows $V^\pi(b,r)=\tfrac{r}{b+r}$: in each state $\pi$ picks one of the two actions, and both give $\tfrac{r}{n}$ by the computation above. So every policy wins with the same probability.

**In words.** Revealing a card does not change the fraction of red cards remaining on average: if a black shows, the fraction goes up; if a red shows, it goes down; and the expected new fraction is exactly $\tfrac{r}{n}$. That is precisely the computation in the step. Such a process is a martingale, so there is no better moment to stop.

**Sanity check.** If all cards are red, $W(0,r)=1$; if there are no reds, $W(b,0)=0$; and for a balanced deck $W(r,r)=\tfrac12$. All three cases make sense.

**What to write in the exam.**

- Bellman: $W$ is the max of the stop value $\tfrac{r}{b+r}$ and the reveal value, and at $n=1$ you must stop.
- Base: $W(0,1)=1$ and $W(1,0)=0$, matching the formula.
- Step: substitute the hypothesis into the reveal value and get $\tfrac{r(n-1)}{n(n-1)}$, i.e. $\tfrac{r}{n}$.
- Conclusion: both actions are equal, $W(b,r)=\tfrac{r}{b+r}$, and every policy attains this value.

*Verified: exact-fraction DP for all $b+r\le20$ gives stop equal to reveal in every state, and $200$ random policies at $(2,3)$ all give exactly $\tfrac35$.*

**(c) The value $W(2,3)$ and its meaning**

**What is asked.** A number, $W(2,3)$, and its interpretation for "wait for a good moment" strategies.

**Tool and why.** Substitution into the formula from part (b) (cheat sheet §4), plus a direct check against a concrete waiting strategy to see that it indeed does not help.

**Definitions.** Let $A$ be the strategy "reveal one card, then stop". It is introduced to test the claim on an actual waiting strategy.

**Solution.**

Step 1, substitute $b=2$ and $r=3$:

$$W(2,3)=\tfrac{3}{2+3}=\tfrac35=0.6.$$

$$\boxed{W(2,3)=\tfrac35=0.6}$$

Step 2, value of strategy $A$: the first card is black with probability $\tfrac25$, leaving $(1,3)$, and you then win with probability $\tfrac34$. It is red with probability $\tfrac35$, leaving $(2,2)$, and you then win with probability $\tfrac24$. Hence

$$\begin{aligned}
V^{A}&=\tfrac25\cdot\tfrac34+\tfrac35\cdot\tfrac24\\
&=\tfrac{6}{20}+\tfrac{6}{20}\\
&=\tfrac35.
\end{aligned}$$

Exactly the same as betting immediately.

Step 3, interpretation: a strategy like "wait until reds are over-represented" does sometimes reach a good state, such as $(1,3)$, but it only gets there when a black is revealed, and the probability of that exactly offsets the gain. By part (b) this holds for every strategy, however clever: no strategy achieves more than $\tfrac35$, and none achieves less.

**In words.** Waiting adds no useful information about the next card beyond what the counts already say, and the expected future chance equals the chance now.

**Sanity check.** An extreme strategy, betting on the last card, wins if the last card is red. In a uniformly shuffled deck every position is red with probability $\tfrac35$, so again we get $\tfrac35$.

**What to write in the exam.**

- Substitution: $W(2,3)=\tfrac35$.
- Example: revealing one card and then stopping gives $\tfrac25\cdot\tfrac34+\tfrac35\cdot\tfrac24$, i.e. $\tfrac35$.
- Conclusion: every strategy, including waiting for a good moment, wins with probability exactly $\tfrac35$, because the red fraction is a martingale.

*Verified: exact-fraction computation of $W(2,3)$ and of $V^{A}$, and $200$ random policies that all give $\tfrac35$.*

**Common mistakes.**

- Allowing a reveal with one card left, i.e. defining a state with no cards. The rules force a bet before the deck runs out, and that is the induction base.
- In the induction step, applying the hypothesis at the same $n$, or forgetting the cases $b=0$ and $r=0$, where one of the successor states does not exist.
- Concluding that waiting helps because you sometimes reach a state with a high red fraction, without weighting by the probability of reaching it.

**💡 Trick.** Guess $W=\tfrac{r}{b+r}$ and induct on $b+r$; the two continue-terms telescope back to $\tfrac{r}{b+r}$.

**⚠️ Watch out.** Every policy is optimal here — 'wait for a good moment' cannot beat betting immediately (a martingale).

## Q2 — TD(λ) with eligibility traces

**Hint:** Keep a trace vector. At each step compute $\delta$, bump the current state's trace to
$1$, then update **every** state by $\alpha\delta e(x)$ and decay all traces by $\gamma\lambda=0.5$.

**Full solution:**

**(a) The three steps**

**What is asked.** Carry out the three TD(λ) updates and show $\delta$ and the full $V$ vector after each step. The answer is a table of numbers.

**Tool and why.** Backward-view TD(λ) with accumulating eligibility traces (cheat sheet §7). The traces remember which states were visited recently, so each TD error is shared with the states that preceded it.

**Definitions.** Let $\delta_t$ be the TD error at step $t$. Write $V$ and $e$ as vectors in the order $s_1,s_2,s_3$. The terminal state's value is always $0$. The decay factor is

$$\gamma\lambda=1\cdot0.5=0.5,$$

and $\alpha=0.5$.

**Solution.**

Step 1, the transition $s_1\to s_2$: all values are still $0$, so

$$\delta_1=1+V(s_2)-V(s_1)=1+0-0=1.$$

Bump $e(s_1)$ to get $e=(1,0,0)$. The update is $\alpha\delta_1 e=(0.5,0,0)$, so $V=(0.5,0,0)$. After decay $e=(0.5,0,0)$.

Step 2, the transition $s_2\to s_3$: $V(s_2)$ is still $0$, because in Step 1 the trace of $s_2$ was $0$. So

$$\delta_2=1+V(s_3)-V(s_2)=1+0-0=1.$$

Bump $e(s_2)$ to get $e=(0.5,1,0)$. The update is $\alpha\delta_2 e=(0.25,0.5,0)$, so

$$V=(0.5+0.25,\ 0+0.5,\ 0)=(0.75,0.5,0).$$

After decay $e=(0.25,0.5,0)$.

Step 3, the transition $s_3\to\text{terminal}$: the terminal value is $0$ and $V(s_3)$ is still $0$, so

$$\delta_3=1+0-V(s_3)=1-0=1.$$

Bump $e(s_3)$ to get $e=(0.25,0.5,1)$. The update is $\alpha\delta_3 e=(0.125,0.25,0.5)$, so

$$V=(0.75+0.125,\ 0.5+0.25,\ 0+0.5)=(0.875,0.75,0.5).$$

The final decay changes nothing, since the episode is over.

Summary:

| Step | $\delta$ | $e$ before the update | $V$ after the update |
|---|---|---|---|
| $1$ | $1$ | $(1,0,0)$ | $(0.5,0,0)$ |
| $2$ | $1$ | $(0.5,1,0)$ | $(0.75,0.5,0)$ |
| $3$ | $1$ | $(0.25,0.5,1)$ | $(0.875,0.75,0.5)$ |

**In words.** Each TD error is shared among all states visited so far, with a weight that shrinks by a factor of $2$ for every step back. Here all three errors equal $1$, so the differences between states come only from how many errors each state received and with what weight.

**Sanity check.** The final value of $s_1$ can be written directly as a weighted sum of the three errors:

$$V(s_1)=\alpha\big(\delta_1+\gamma\lambda\,\delta_2+(\gamma\lambda)^2\delta_3\big)=0.5\,(1+0.5+0.25)=0.875,$$

matching the table.

**What to write in the exam.**

- Step 1: $\delta_1=1$, $e=(1,0,0)$, and $V=(0.5,0,0)$.
- Step 2: $\delta_2=1$, $e=(0.5,1,0)$, and $V=(0.75,0.5,0)$.
- Step 3: $\delta_3=1$, $e=(0.25,0.5,1)$, and $V=(0.875,0.75,0.5)$.
- Between steps all traces are multiplied by $\gamma\lambda=0.5$.

*Verified: a numpy run of the algorithm exactly as specified, printing $\delta$, $e$ and $V$ at each step.*

**(b) Final values and comparison with TD(0)**

**What is asked.** The three final values, and why earlier states end up with larger values than under TD(0). The answer is numbers plus an explanation.

**Tool and why.** Comparison with the TD(0) update (cheat sheet §7): run TD(0) on the same episode and compare how many TD errors each state receives under each method.

**Definitions.** Let $V^{0}$ be the values after one episode of TD(0) with the same $\alpha$, i.e. TD(λ) with $\lambda=0$.

**Solution.**

Step 1, the final values from part (a):

$$\boxed{V(s_1)=0.875,\quad V(s_2)=0.75,\quad V(s_3)=0.5}$$

Step 2, TD(0) on the same episode: each state is updated only at the step that leaves it. At every step the next state's value is still $0$, since it is updated only later. So for each of the three states

$$V^{0}(s)=0+0.5\,(1+0-0)=0.5.$$

Step 3, where the difference comes from: under TD(λ) state $s_k$ receives all errors from step $k$ onward, with weight $(\gamma\lambda)^{t-k}$ on the error of step $t$:

$$V(s_k)=\alpha\sum_{t=k}^{3}(\gamma\lambda)^{t-k}\delta_t.$$

So $s_1$ receives three errors, $s_2$ two, and $s_3$ one. Under TD(0) each state receives only its own error. Since all errors here are positive, each extra error raises the value, so the state visited first gains the most.

**In words.** Traces carry later rewards back to earlier states within the same episode. Under TD(0) the third step's reward would reach $s_1$ only after several more episodes, one step back each time.

**Sanity check.** The true returns with $\gamma=1$ are $3$, $2$ and $1$ for $s_1$, $s_2$ and $s_3$, and the TD(λ) values are ordered the same way. In the extreme $\lambda=1$ the same computation gives $V=(1.5,1,0.5)$, which is exactly $\alpha$ times the returns, i.e. a Monte-Carlo update; and $\lambda=0$ recovers TD(0). Our values sit between the two extremes.

**What to write in the exam.**

- Final values: $0.875$, $0.75$ and $0.5$.
- TD(0) after one episode gives every state $0.5$, because each state receives only its own error.
- Under TD(λ) state $s_k$ receives all errors from step $k$ on with weight $(\gamma\lambda)^{t-k}$, so earlier states accumulate more.

*Verified: numpy runs of TD(0), of TD(λ) with $\lambda=0.5$, and of the case $\lambda=1$, which gave $(1.5,1,0.5)$.*

**Common mistakes.**

- Decaying the traces before the update instead of after. Then $s_1$ gets only half the update at the first step, and the whole table shifts.
- Using $V(s_2)=0.5$ in Step 2, as if $s_2$ had been updated in Step 1. Its trace was $0$, so it is still $0$.
- Updating only the current state, as in TD(0). That loses exactly what the question asks you to show.

**💡 Trick.** Keep the trace vector: bump the current state to $1$, update all states by $\alpha\delta e$, then decay by $\gamma\lambda$.

**⚠️ Watch out.** Earlier states getting more credit than plain TD(0) after one episode is the eligibility trace working — not an error.

## Q3 — A two-step Bellman operator

**Hint:** For contraction, subtract two applications: $T^{\pi,2}u-T^{\pi,2}v=\gamma^2P^2(u-v)$ and
$\|P^2 x\|_\infty\le\|x\|_\infty$ (rows of $P^2$ are probability vectors). For the fixed point,
note $V^\pi=r+\gamma P V^\pi$, apply twice.

**Full solution:**

**(a) Contraction and fixed point**

**What is asked.** Prove that $T^{\pi,2}$ is a contraction with factor $\gamma^2$ in the max-norm, deduce that it has a unique fixed point, and show that this point is $V^\pi$. The answer is a proof.

**Tool and why.** Operators, contraction and Banach's fixed-point theorem (cheat sheet §6). This is the right tool because the difference of two applications of the operator is a matrix times the difference, and that matrix can be bounded in the max-norm.

**Definitions.** The max-norm is $\|x\|_\infty=\max_s|x(s)|$. A matrix is row-stochastic if all its entries are non-negative and every row sums to $1$. Let $\mathbf 1$ denote the all-ones vector.

**Solution.**

Step 1, difference of two applications: the terms $r$ and $\gamma Pr$ do not depend on the vector, so they cancel.

$$\begin{aligned}
T^{\pi,2}u-T^{\pi,2}v&=\big(r+\gamma Pr+\gamma^2P^2u\big)-\big(r+\gamma Pr+\gamma^2P^2v\big)\\
&=\gamma^2P^2(u-v).
\end{aligned}$$

Step 2, $P^2$ is row-stochastic: its entries are sums of products of non-negative numbers, hence non-negative. Its row sums are

$$P^2\mathbf 1=P(P\mathbf 1)=P\mathbf 1=\mathbf 1.$$

Step 3, a row-stochastic matrix does not increase the max-norm. Let $Q$ be such a matrix. For every state $s$:

$$\begin{aligned}
|(Qx)(s)|&=\Big|\sum_j Q_{sj}x_j\Big|\\
&\le\sum_j Q_{sj}|x_j|\\
&\le\|x\|_\infty\sum_j Q_{sj}\\
&=\|x\|_\infty.
\end{aligned}$$

The first inequality is the triangle inequality with $Q_{sj}\ge0$, the second holds because each $|x_j|$ is at most the maximum, and the last equality because the row sums to $1$. Taking the max over $s$ gives $\|Qx\|_\infty\le\|x\|_\infty$.

Step 4, the contraction: combine Steps 1 to 3 with $Q=P^2$:

$$\|T^{\pi,2}u-T^{\pi,2}v\|_\infty=\gamma^2\|P^2(u-v)\|_\infty\le\gamma^2\|u-v\|_\infty.$$

Since $\gamma<1$ also $\gamma^2<1$, so this is a contraction with factor $\gamma^2$. By Banach's theorem it has a unique fixed point, and iterates from any starting vector converge to it.

Step 5, the fixed point is $V^\pi$: by the Bellman equation of a fixed policy (§2), $V^\pi=r+\gamma PV^\pi$. Substitute the right-hand side for the $V^\pi$ inside it:

$$\begin{aligned}
V^\pi&=r+\gamma P\big(r+\gamma PV^\pi\big)\\
&=r+\gamma Pr+\gamma^2P^2V^\pi\\
&=T^{\pi,2}V^\pi.
\end{aligned}$$

So $V^\pi$ is a fixed point, and by the uniqueness from Step 4 it is the unique one. $\square$

**In words.** $T^{\pi,2}$ is simply two applications of the ordinary Bellman operator $T^\pi v=r+\gamma Pv$. Each application contracts by $\gamma$, so two contract by $\gamma^2$, and the only point that does not move under both is the one that does not move under one.

**Sanity check.** Direct substitution gives

$$T^\pi(T^\pi v)=r+\gamma P(r+\gamma Pv)=T^{\pi,2}v,$$

so the operator really is the square of $T^\pi$. The factor $\gamma^2$ is smaller than $\gamma$, but each application is worth two discount steps, so the rate per discount step is the same.

**What to write in the exam.**

- Difference: $T^{\pi,2}u-T^{\pi,2}v=\gamma^2P^2(u-v)$.
- The matrix $P^2$ is row-stochastic, so $\|P^2x\|_\infty\le\|x\|_\infty$, because each row is a weighted average.
- Hence a contraction with factor $\gamma^2$, and a unique fixed point by Banach.
- Substituting $V^\pi=r+\gamma PV^\pi$ into itself gives $V^\pi=T^{\pi,2}V^\pi$.

*Verified: sympy confirms symbolically that $T^\pi(T^\pi v)$ equals $T^{\pi,2}v$ for a general matrix, and $10^5$ random differences in the example of part (b) give a maximal ratio of $0.81$.*

**(b) Numerical computation and the contraction ratio**

**What is asked.** Compute $V^\pi$, confirm it is the fixed point of $T^{\pi,2}$, and report the contraction ratio observed in practice. The answer is a vector and a number.

**Tool and why.** Solving a linear system (cheat sheet §2) by back-substitution, since $P$ is upper-triangular and state 3 is absorbing. Then substitution into the operator, and a check of the ratio from part (a).

**Definitions.** Let $c$ be the constant part of the operator, $c=r+\gamma Pr$, so that $T^{\pi,2}v=c+\gamma^2P^2v$. Let $v_k$ be the $k$-th iterate of the operator from $v_0=0$. They are introduced so that the check becomes a short computation.

**Solution.**

Step 1, solve $V=r+\gamma PV$ row by row from the bottom. State 3:

$$V_3=0+0.9\,V_3,$$

so $0.1\,V_3=0$, i.e. $V_3=0$. State 2, with $V_3=0$:

$$\begin{aligned}
V_2&=2+0.9\,(0.5\,V_2+0.5\,V_3)\\
&=2+0.45\,V_2,
\end{aligned}$$

so $0.55\,V_2=2$, i.e.

$$V_2=\tfrac{2}{0.55}=\tfrac{40}{11}\approx3.6364.$$

State 1:

$$\begin{aligned}
0.55\,V_1&=1+0.45\,V_2\\
&=1+0.45\cdot\tfrac{40}{11}\\
&=1+\tfrac{18}{11}\\
&=\tfrac{29}{11}.
\end{aligned}$$

Hence

$$V_1=\tfrac{29}{11\cdot0.55}=\tfrac{580}{121}\approx4.7934.$$

$$\boxed{V^\pi=\Big(\tfrac{580}{121},\ \tfrac{40}{11},\ 0\Big)\approx(4.7934,\ 3.6364,\ 0)}$$

Step 2, the constant part: $Pr=(1.5,\,1,\,0)$, because row 1 averages $1$ and $2$, and row 2 averages $2$ and $0$. So

$$c=r+0.9\,Pr=(1+1.35,\ 2+0.9,\ 0)=(2.35,\ 2.9,\ 0).$$

Step 3, the squared matrix:

$$P^2=\begin{pmatrix}0.25&0.5&0.25\\0&0.25&0.75\\0&0&1\end{pmatrix}.$$

Step 4, fixed-point check: compute $P^2V^\pi$ row by row.

$$\begin{aligned}
(P^2V^\pi)_1&=0.25\cdot\tfrac{580}{121}+0.5\cdot\tfrac{40}{11}=\tfrac{145+220}{121}=\tfrac{365}{121},\\
(P^2V^\pi)_2&=0.25\cdot\tfrac{40}{11}=\tfrac{10}{11},\\
(P^2V^\pi)_3&=0.
\end{aligned}$$

Multiply by $0.81$ and add $c$:

$$\begin{aligned}
(T^{\pi,2}V^\pi)_1&=2.35+0.81\cdot\tfrac{365}{121}=\tfrac{5687}{2420}+\tfrac{5913}{2420}=\tfrac{580}{121},\\
(T^{\pi,2}V^\pi)_2&=2.9+0.81\cdot\tfrac{10}{11}=\tfrac{319}{110}+\tfrac{81}{110}=\tfrac{40}{11},\\
(T^{\pi,2}V^\pi)_3&=0.
\end{aligned}$$

We get exactly $V^\pi$, so it is the fixed point. Iterating from $v_0=0$ indeed converges to it: $v_1=(2.35,\,2.9,\,0)$, $v_2\approx(4.000,\,3.487,\,0)$, $v_3\approx(4.572,\,3.606,\,0)$.

Step 5, the contraction ratio: the worst-case ratio, i.e. the proved bound, is $\gamma^2$, and it is attained in this example. If $u-w=\mathbf 1$ then $P^2\mathbf 1=\mathbf 1$, so

$$\frac{\|T^{\pi,2}u-T^{\pi,2}w\|_\infty}{\|u-w\|_\infty}=0.81\cdot\frac{\|\mathbf 1\|_\infty}{\|\mathbf 1\|_\infty}=0.81.$$

$$\boxed{\gamma^2=0.81}$$

Step 6, what you see along the iteration from $v_0=0$: there the ratio is smaller. The error in state 3 is always $0$, and from the other two states some mass leaks into the absorbing state. The ratios between successive errors are about $0.510$, $0.325$ and $0.279$, and they decrease toward $0.81\cdot0.25=0.2025$, because on the block of states 1 and 2 the eigenvalue of $P^2$ is $0.25$. This does not contradict the proof: $\gamma^2$ is an upper bound, not the rate in every direction.

**In words.** The proof guarantees that each application of the operator shrinks every difference by a factor of at least $0.81$. The worst difference is a constant shift of all values, on which the averaging by $P^2$ shrinks nothing, so only the discount remains.

**Sanity check.** State 3 is absorbing with reward $0$, so $V_3=0$ makes sense. State 2 earns $2$ on every step it stays put, and stays two steps on average, so a value a bit below $4$ is reasonable with discounting; state 1 earns $1$ and then sometimes moves to $2$, so its value is above that of state 2.

**What to write in the exam.**

- Back-substitution: $V_3=0$, then $V_2=\tfrac{40}{11}$, then $V_1=\tfrac{580}{121}$.
- Check: $c=(2.35,\,2.9,\,0)$ and $c+0.81P^2V^\pi$ returns $V^\pi$.
- Worst-case contraction ratio $\gamma^2=0.81$, attained on a constant difference $u-w=\mathbf 1$.
- Along the iteration from $0$ the ratios are smaller, because state 3 is absorbing.

*Verified: sympy gives the exact $(I-\gamma P)^{-1}r$ and checks $T^{\pi,2}V^\pi=V^\pi$ in fractions; exact fractions give the iteration ratios $\tfrac{5913}{11600}$, $\tfrac{9477}{29200}$, $\tfrac{1449}{5200}$; $10^5$ random differences give a maximal ratio of $0.81$.*

**Common mistakes.**

- Claiming the factor is $\gamma$ rather than $\gamma^2$, by forgetting that the vector-dependent part is $\gamma^2P^2$.
- Using $\|P^2x\|_\infty\le\|x\|_\infty$ without justifying it. The reason is that every row of $P^2$ is a distribution, and that must be shown.
- Reporting that the actual iteration error shrinks by exactly $0.81$ each step. That is only the bound; in this example it shrinks faster.

**💡 Trick.** Subtract two applications: the $v$-dependent part is $\gamma^2P^2$, so the contraction factor is $\gamma^2$, not $\gamma$.

**⚠️ Watch out.** $P^2$ is row-stochastic, so $\|P^2x\|_\infty\le\|x\|_\infty$ — the contraction rides that non-expansion.

## Q4 — Successive elimination regret

**Hint:** After $m$ pulls each, Hoeffding gives confidence width $\sqrt{\tfrac{2\log T}{m}}$ (up to
constants). Arm $i$ is safely eliminated once this width shrinks below $\Delta_i/2$, i.e.
$m=\Theta(\log T/\Delta_i^2)$. Each such pull costs $\Delta_i$ regret.

**Full solution:**

**(a) Number of pulls until elimination**

**What is asked.** Show that with high probability a suboptimal arm $i$ is eliminated after $O(\log T/\Delta_i^2)$ pulls, and state the Hoeffding width. The answer is a proof.

**Tool and why.** Hoeffding's inequality and the union bound (cheat sheet §10). Hoeffding gives a confidence width for each empirical mean, and the union bound lets us assume all intervals are correct simultaneously. On that event the algorithm behaves deterministically and is easy to analyze.

**Definitions.** After round $m$ every surviving arm has been pulled $m$ times; let $\hat\mu_j(m)$ be the empirical mean of arm $j$. The confidence width is

$$c_m=\sqrt{\tfrac{2\ln T}{m}}.$$

The bounds are $\mathrm{UCB}_j=\hat\mu_j(m)+c_m$ and $\mathrm{LCB}_j=\hat\mu_j(m)-c_m$. Let $G$ be the clean event: for every arm and every $m\le T$, $|\hat\mu_j(m)-\mu_j|\le c_m$. Let $\star$ denote the best arm.

**Solution.**

Step 1, Hoeffding for a mean of $m$ rewards in $[0,1]$:

$$\begin{aligned}
\Pr\big(|\hat\mu_j(m)-\mu_j|>c_m\big)&\le2e^{-2mc_m^2}\\
&=2e^{-4\ln T}\\
&=2T^{-4}.
\end{aligned}$$

The first line is Hoeffding, the second uses $mc_m^2=2\ln T$.

Step 2, union bound over $K$ arms and at most $T$ values of $m$:

$$\Pr(G^c)\le K\cdot T\cdot2T^{-4}=\tfrac{2K}{T^3}.$$

Step 3, on $G$ the best arm is never eliminated. For every arm $j$:

$$\begin{aligned}
\mathrm{UCB}_\star&\ge\mu^\star\\
&\ge\mu_j\\
&\ge\mathrm{LCB}_j.
\end{aligned}$$

The first and last steps are by $G$, the middle one because $\star$ is the best arm. Elimination needs the strict inequality the other way, which never happens.

Step 4, when arm $i$ is certainly eliminated: on $G$ we have $\mathrm{UCB}_i\le\mu_i+2c_m$ and $\mathrm{LCB}_\star\ge\mu^\star-2c_m$. Hence

$$\begin{aligned}
\mathrm{LCB}_\star-\mathrm{UCB}_i&\ge(\mu^\star-2c_m)-(\mu_i+2c_m)\\
&=\Delta_i-4c_m.
\end{aligned}$$

By Step 3 the best arm still survives, so the best LCB among survivors is at least $\mathrm{LCB}_\star$. If $4c_m<\Delta_i$ the difference is positive and arm $i$ is eliminated.

Step 5, solve the condition:

$$\begin{aligned}
4\sqrt{\tfrac{2\ln T}{m}}<\Delta_i&\iff\tfrac{32\ln T}{m}<\Delta_i^2\\
&\iff m>\tfrac{32\ln T}{\Delta_i^2}.
\end{aligned}$$

So on $G$, i.e. with probability at least $1-2K/T^3$, arm $i$ is pulled at most

$$n_i\le\tfrac{32\ln T}{\Delta_i^2}+1=O\Big(\tfrac{\log T}{\Delta_i^2}\Big)$$

times. The $1$ is the last round before the check eliminates it.

$$\boxed{n_i=O\Big(\tfrac{\log T}{\Delta_i^2}\Big)}$$

Step 6, the link to the constant $8$: the condition $4c_m<\Delta_i$ is the worst case, where both means err to the edge in opposite directions. When the means are close to the true values, elimination already happens once $2c_m<\Delta_i$, i.e. after about $\tfrac{8\ln T}{\Delta_i^2}$ pulls. That is the width $\Delta_i/2$ from the hint and the constant $8$ of part (c).

**In words.** You need enough pulls that the two arms' confidence intervals no longer overlap. The width shrinks like one over the square root of the number of pulls, so separating a gap $\Delta_i$ takes a number of pulls proportional to $1/\Delta_i^2$. The $\ln T$ is the price of requiring the intervals to be right throughout the whole game.

**Sanity check.** As $\Delta_i$ tends to $0$ the bound blows up, as expected: nearly equal arms are hard to separate. And as $T$ grows the width at each $m$ grows only slowly, like $\sqrt{\ln T}$, so separation needs only a $\log$ factor more pulls.

**What to write in the exam.**

- Hoeffding width $c_m=\sqrt{2\ln T/m}$, and each interval fails with probability at most $2T^{-4}$.
- Union bound: the clean event $G$ holds with probability at least $1-2K/T^3$.
- On $G$ the best arm survives, and $\mathrm{LCB}_\star-\mathrm{UCB}_i\ge\Delta_i-4c_m$.
- Hence $i$ is eliminated once $m>32\ln T/\Delta_i^2$, i.e. after $O(\log T/\Delta_i^2)$ pulls.

*Verified: a numeric check that $2e^{-2mc_m^2}$ equals $2T^{-4}$; a simulation of $200$ runs with two arms, $\Delta=0.2$ and $T=10^5$ gives a mean of $2289$ pulls of the worse arm and a maximum of $3377$, all below the bound $9210$.*

**(b) The gap-dependent regret bound**

**What is asked.** Deduce from part (a) that the total regret is $O\big(\sum_{i:\Delta_i>0}\log T/\Delta_i\big)$. The answer is a short proof.

**Tool and why.** Decomposing regret by arms (cheat sheet §10): regret is the sum over arms of the gap times the number of pulls. Bound the pulls on $G$ by part (a), and bound $G^c$ crudely.

**Definitions.** Let $n_i(T)$ be the number of pulls of arm $i$ up to time $T$, and $\mathrm{Reg}(T)$ the expected regret.

**Solution.**

Step 1, regret decomposition: each pull of arm $i$ loses $\Delta_i$ in expectation relative to the best arm, so

$$\mathrm{Reg}(T)=\sum_{i:\Delta_i>0}\Delta_i\,\mathbb E\big[n_i(T)\big].$$

Step 2, split on the clean event: on $G$ use the bound from part (a). On $G^c$ the regret is at most $T$, because every gap is at most $1$. So

$$\mathrm{Reg}(T)\le\sum_{i:\Delta_i>0}\Delta_i\Big(\tfrac{32\ln T}{\Delta_i^2}+1\Big)+T\cdot\Pr(G^c).$$

Step 3, simplify each term: $\Delta_i\cdot\tfrac{32\ln T}{\Delta_i^2}$ is $\tfrac{32\ln T}{\Delta_i}$, and $\Delta_i\cdot1$ is at most $1$. Bound the last term by Step 2 of part (a):

$$T\cdot\Pr(G^c)\le T\cdot\tfrac{2K}{T^3}=\tfrac{2K}{T^2}.$$

Step 4, add up:

$$\mathrm{Reg}(T)\le\sum_{i:\Delta_i>0}\Big(\tfrac{32\ln T}{\Delta_i}+1\Big)+\tfrac{2K}{T^2}.$$

The extra terms are at most $K+2K/T^2$, i.e. $O(K)$, independent of $T$. Hence

$$\boxed{\mathrm{Reg}(T)=O\Big(\sum_{i:\Delta_i>0}\tfrac{1}{\Delta_i}\log T\Big)}$$

**In words.** A small gap causes many pulls, about $1/\Delta_i^2$, but each pull costs little, $\Delta_i$. The product is $1/\Delta_i$: the arms that are hard to separate cost the most, but only by a factor $1/\Delta_i$ and not $1/\Delta_i^2$.

**Sanity check.** Compared with pulling all arms uniformly for the whole game, which costs regret linear in $T$, here the regret is logarithmic in $T$. For a very small gap the bound is large, but then an arm's regret never exceeds $\Delta_iT$ anyway.

**What to write in the exam.**

- Decomposition: $\mathrm{Reg}(T)=\sum_i\Delta_i\,\mathbb E[n_i(T)]$.
- On $G$: $n_i\le32\ln T/\Delta_i^2+1$, so each arm contributes at most $32\ln T/\Delta_i+1$.
- On $G^c$: at most $T\cdot2K/T^3$, i.e. $O(1)$.
- Sum: $O(\sum_i\log T/\Delta_i)$.

*Verified: in the simulation of part (a) the mean regret of the worse arm is $457.7$, below the bound $1842.3$ given by the formula with constant $32$.*

**(c) Computation for $T=10^5$ and $\Delta_i=0.2$**

**What is asked.** The approximate number of pulls of the arm and its regret contribution, with the constant $8$ from the question. The answer is two numbers.

**Tool and why.** Substitution into the pull formula $\tfrac{8}{\Delta_i^2}\log T$ and into the regret decomposition from part (b) (cheat sheet §10). The logarithm is natural, as in Hoeffding.

**Definitions.** No new notation.

**Solution.**

Step 1, the logarithm:

$$\ln(10^5)=5\ln10\approx5\cdot2.3026\approx11.513.$$

Step 2, the coefficient: $\Delta_i^2=0.04$, so $\tfrac{8}{0.04}=200$.

Step 3, the number of pulls:

$$n_i\approx\tfrac{8}{\Delta_i^2}\ln T=200\cdot11.513\approx2302.6.$$

$$\boxed{n_i\approx2303}$$

Step 4, the regret contribution is the gap times the number of pulls:

$$\begin{aligned}
\Delta_i\,n_i&\approx0.2\cdot2302.6\\
&=\tfrac{8}{\Delta_i}\ln T\\
&=40\cdot11.513\\
&\approx460.5.
\end{aligned}$$

$$\boxed{\Delta_i\,n_i\approx460}$$

Step 5, comparison with the rigorous bound from part (a): with the constant $32$ you get about $9210$ pulls and a regret of about $1842$, a factor of $4$ larger. The constant $8$ describes the typical case, and the simulation confirms it.

**In words.** The worse arm is pulled in about $2.3\%$ of the $10^5$ rounds and then discarded for good. So the total regret grows not with $T$ but like $\ln T$.

**Sanity check.** In a simulation of $200$ runs the arm was pulled $2289$ times on average and the mean regret was $457.7$, very close to $2303$ and $460$.

**What to write in the exam.**

- Logarithm and coefficient: $\ln(10^5)\approx11.51$ and $8/0.04=200$.
- Pulls: $200\cdot11.51\approx2303$.
- Regret: $0.2\cdot2303$, i.e. $40\cdot11.51\approx460$.

*Verified: Python gives $2302.59$ pulls and $460.52$ regret; the simulation gives $2289$ and $457.7$.*

**Common mistakes.**

- Claiming that on the clean event $c_m<\Delta_i/2$ suffices for elimination. In the worst case both means err in opposite directions, and you need $4c_m<\Delta_i$.
- Forgetting the bad event. Without the union bound and the regret bound $T\cdot\Pr(G^c)$ the proof is incomplete.
- Multiplying the number of pulls by $\Delta_i^2$, or not multiplying at all. The regret contribution is pulls times $\Delta_i$, hence $1/\Delta_i$.

**💡 Trick.** An arm survives until its width $\sqrt{2\ln T/m}$ drops below $\Delta/2$, i.e. $m\approx(8/\Delta^2)\ln T$ pulls.

**⚠️ Watch out.** Regret per arm is $\Delta\times$pulls $=(8/\Delta)\ln T$: small gaps cost more pulls but less each — the $1/\Delta$ remains.
