# Mock Exam 3 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_03.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-07-06 (Q1: exact breakpoint propagation — $g^{\circ k}$
has $2^k+2$ pieces with slopes $\pm 2^k$, and $(w+1)^L$ was never violated on random
deep nets; Q2: zero coordinates stay exactly $0$ along the flow, 1D trajectory
increases to $1$ with final loss $\sim 10^{-28}$, Jensen violation
$L(1/2)=49/128 > 1/4$; Q3: grid cover size/radius checked for $d\le3$, bound $\to 0$).

## Q1 — Linear pieces of deep ReLU networks (40)

**Full solution:**

**1. (8) Composition multiplies pieces**

**What is asked.** Prove that if $f$ has $p$ linear pieces and $g$ has $q$ linear pieces, then $f\circ g$ is PWL with at most $pq$ pieces. The answer is a proof.

**Tool and why.** Counting pieces through breakpoints (cheat sheet §5). Inside one affine piece of $g$, the function $f\circ g$ can bend only at points that $g$ sends to a breakpoint of $f$. An affine map with nonzero slope hits each value at most once, so these points can be counted exactly.

**Definitions.** Throughout this question $P(h)$ denotes the number of linear pieces of a PWL function $h$, that is, the minimal count of Def. 1. Let

$$-\infty=c_0<c_1<\dots<c_{q-1}<c_q=\infty$$

be a minimal partition for $g$, and let $d_1,\dots,d_{p-1}$ be the breakpoints of $f$, in increasing order. For $j\in[q]$ let $I_j:=[c_{j-1},c_j]$, and write $g(x)=\alpha x+\beta$ on $I_j$; the numbers $\alpha$ and $\beta$ depend on $j$. We name $I_j$ because the proof treats one piece of $g$ at a time.

**Solution.**

Step 1, the case $\alpha\neq0$, locating the possible bends: for $x\in I_j$ we have $g(x)=d_i$ only at the single point

$$x=\frac{d_i-\beta}{\alpha},$$

because an affine map with nonzero slope is one-to-one. So at most $p-1$ points of $I_j$ are mapped onto breakpoints of $f$.

Step 2, $f\circ g$ is affine between these points: the at most $p-1$ points split $I_j$ into at most $p$ closed subintervals. Let $J$ be one of them. On $J$ the map $g$ is continuous and monotone, and no interior point of $J$ is mapped onto a breakpoint of $f$. Hence $g(J)$ is an interval with no breakpoint of $f$ in its interior, so $g(J)$ lies inside one closed piece of $f$, where $f(u)=\gamma u+\eta$. On $J$ we then get

$$f(g(x))=\gamma(\alpha x+\beta)+\eta,$$

which is affine in $x$.

Step 3, the case $\alpha=0$: then $g$ is constant on $I_j$, so $f\circ g$ is constant on $I_j$, which is one piece.

Step 4, assembling: every $I_j$ is cut into at most $p$ subintervals on which $f\circ g$ is affine, and there are $q$ pieces $I_j$. This is a valid partition for $f\circ g$ with at most $pq$ intervals. Also $f\circ g$ is continuous, as a composition of continuous functions, so it is PWL. Since $P$ is the minimum over valid partitions, it is at most the size of this one:

$$\boxed{P(f\circ g)\le pq}$$

**In words.** Along one straight piece of $g$, the value $g(x)$ moves at constant speed and crosses each bend of $f$ at most once. So every piece of $g$ is split into at most $p$ parts, and the counts multiply.

**Sanity check.** The bound is attained, and it is larger than the additive guess $p+q$. Take $g(x)=|x|$, so $q=2$, and $f(u)=|u-1|+|u-2|$, so $p=3$. Then $f\circ g$ has breakpoints at $-2,-1,0,1,2$ and slopes $-2,0,2,-2,0,2$ on the six intervals, so it has $6$ pieces, equal to $pq$ and more than $p+q$.

**What to write in the exam.**

- Fix a piece $I_j$ of $g$, on which $g(x)=\alpha x+\beta$.
- If $\alpha\neq0$, only the at most $p-1$ points $(d_i-\beta)/\alpha$ can be bends, so $I_j$ splits into at most $p$ intervals, and on each one $f\circ g$ is affine of affine.
- If $\alpha=0$, the composition is constant on $I_j$.
- Continuity plus a partition into at most $pq$ intervals give $P(f\circ g)\le pq$, because Def. 1 takes the minimum.

*Credit:* 3 for restricting to one affine piece of $g$; 3 for the count of at most $p-1$ preimages per piece, including $\alpha=0$; 2 for assembling (continuity and minimality in Def. 1).

*Verified: exact rational PWL arithmetic in Python on 3000 random pairs $(f,g)$ never exceeded $pq$ pieces and attained it; the example above was recomputed and has $6$ pieces.*

**2. (4) Shallow upper bound**

**What is asked.** Prove that every $h\in\mathcal N_{w,1}$ is PWL with at most $w+1$ pieces. The answer is a proof.

**Tool and why.** One ReLU neuron bends at most once, and a sum of functions can bend only where one of the summands bends (cheat sheet §5). This is the converse half of Prop. 1 in Lecture 2.

**Definitions.** Write the network as

$$h(x)=\sum_{i=1}^{w} v_i\,[u_i x+b_i]_+ + b^{(2)},$$

where $u_i$ and $b_i$ are the first-layer weight and bias of neuron $i$, $v_i$ is its output weight and $b^{(2)}$ is the output bias. For a neuron with $u_i\neq0$ let $\tau_i:=-b_i/u_i$, the only point where its pre-activation is zero. Let $T$ be the set of all these $\tau_i$. We collect them in one set because they are the only candidates for breakpoints of $h$.

**Solution.**

Step 1, a neuron with $u_i\neq0$: the pre-activation $u_ix+b_i$ is affine and vanishes only at $\tau_i$, so it has one fixed sign on $(-\infty,\tau_i]$ and the opposite sign on $[\tau_i,\infty)$. On each side $[u_ix+b_i]_+$ is either $0$ or $u_ix+b_i$, so it is affine on both sides.

Step 2, a neuron with $u_i=0$: it outputs the constant $[b_i]_+$, with no breakpoint.

Step 3, the union: $T$ has at most $w$ points, because each neuron contributes at most one. Sort them in increasing order as $t_1,\dots,t_m$, with $m\le w$. On each of the $m+1$ closed intervals between consecutive points, no $\tau_i$ lies in the interior, so by Steps 1 and 2 every neuron is affine there. Then $h$, a linear combination of the neurons plus a constant, is affine there as well.

Step 4, conclusion: $h$ is continuous, as a sum of continuous functions, and affine on each of at most $m+1$ intervals. So $h$ is PWL and

$$\boxed{P(h)\le w+1}$$

**In words.** Each ReLU contributes at most one bend, so $w$ ReLUs give at most $w$ bends and therefore at most $w+1$ straight pieces.

**Sanity check.** With $w=1$ the network is a single hinge $v[ux+b]_++c$, which has at most $2$ pieces. The bound can be strict: two neurons with the same $\tau_i$, or a neuron with $v_i=0$, give fewer pieces, so the claim is only an upper bound.

**What to write in the exam.**

- Each neuron with $u_i\neq0$ is affine on both sides of $\tau_i=-b_i/u_i$, and each neuron with $u_i=0$ is constant.
- Outside the set $T$ of at most $w$ points every neuron is affine, hence so is $h$.
- Sorting $T$ gives at most $w+1$ intervals and $h$ is continuous, so $P(h)\le w+1$.

*Credit:* 2 for one breakpoint per neuron, including $u_i=0$; 2 for the union and the count.

*Verified: exact rational arithmetic on 150 random networks for each $w\in\{1,2,3,5\}$; the maximum number of pieces was exactly $w+1$.*

**3. (8) Deep upper bound by induction**

**What is asked.** Prove that every $h\in\mathcal N_{w,L}$ is PWL with at most $(w+1)^L$ pieces, by induction. The answer is a proof.

**Tool and why.** Induction on the layer index with one common breakpoint set for all neurons of a layer (cheat sheet §5). Inside each interval of that set, the counting of parts 1 and 2 applies: an affine function changes sign at most once, so each new ReLU adds at most one point per interval.

**Definitions.** Let $x^{(0)}(x):=x$, and for $k\in[L]$ let $x^{(k)}(x)\in\mathbb R^w$ be the vector of post-activations of layer $k$, viewed as functions of the network input $x$. Call a finite set $B\subset\mathbb R$ good for layer $k$ if every coordinate of $x^{(k)}$ is affine on every closed interval delimited by consecutive points of $B$, including the two unbounded intervals. A set with $m$ points delimits $m+1$ intervals. We use one set for the whole layer so that each step counts intervals only once.

**Solution.**

**Claim.** For every $k\in\{0,1,\dots,L\}$ there is a set $B_k$ that is good for layer $k$ and satisfies

$$|B_k|\le(w+1)^k-1.$$

The proof is by induction on $k$, upward from $0$.

**Base.** For $k=0$ the only neuron is $x^{(0)}=x$, which is affine on all of $\mathbb R$, so $B_0:=\emptyset$ is good and

$$|B_0|=0=(w+1)^0-1.$$

**Hypothesis.** For some $k\in\{0,\dots,L-1\}$, the set $B_k$ is good for layer $k$ and has at most $(w+1)^k-1$ points.

**Step.** The pre-activations of layer $k+1$ are

$$z_j=\sum_{i} W^{(k+1)}_{ji}\,x^{(k)}_i+b^{(k+1)}_j,\qquad j\in[w].$$

Each $z_j$ is a fixed affine combination of layer-$k$ neurons, so by the hypothesis it is affine on each of the at most $|B_k|+1$ intervals delimited by $B_k$. This is the only place where the hypothesis is used. Fix such an interval $I$ and a neuron $j$. Since $z_j$ is affine on $I$, there are two cases. If $z_j$ does not change sign inside $I$, then $[z_j]_+$ is either $0$ or $z_j$ on all of $I$, so it is affine on $I$ and adds no point. Otherwise $z_j$ has nonzero slope and vanishes at exactly one interior point $s$ of $I$, and $[z_j]_+$ is affine on each of the two halves of $I$, so it adds the single point $s$. Hence the at most $w$ neurons of layer $k+1$ add at most $w$ points inside $I$.

Let $B_{k+1}$ be $B_k$ together with all the added points. Every interval delimited by $B_{k+1}$ lies inside one interval $I$ of $B_k$ and contains no added point in its interior, so every neuron of layer $k+1$ is affine on it: $B_{k+1}$ is good for layer $k+1$. Counting the points:

$$\begin{aligned}
|B_{k+1}|&\le|B_k|+w\,\big(|B_k|+1\big)\\
&=(w+1)|B_k|+w\\
&\le(w+1)\big((w+1)^k-1\big)+w\\
&=(w+1)^{k+1}-1.
\end{aligned}$$

The third line uses the hypothesis, and the last line is the algebra $(w+1)^{k+1}-(w+1)+w$. This proves the claim.

**Conclusion.** The output $W^{(L+1)}x^{(L)}+b^{(L+1)}$ is an affine combination of layer-$L$ neurons, with no ReLU, so it adds no breakpoint and is affine on each of the at most $|B_L|+1$ intervals delimited by $B_L$. By the claim this number is at most $(w+1)^L$. The network is continuous, as a composition of continuous maps, so it is PWL and

$$\boxed{P(h)\le(w+1)^L}$$

A layer with fewer than $w$ neurons only adds fewer points, so the bound covers width at most $w$.

**In words.** Each layer can at most multiply the number of intervals by $w+1$: inside each existing interval, each of its $w$ neurons bends at most once.

**Sanity check.** For $L=1$ the bound is $w+1$, which is part 2. The sawtooth $g^{\circ L}$ lies in $\mathcal N_{3,L}$ and has $2^L+2$ pieces (part 4), which is at most $4^L$; for $L=1$ the two numbers are equal to $4$, so the bound is attained there.

**What to write in the exam.**

- State the claim for a common set $B_k$ that is good for all neurons of layer $k$, with $|B_k|\le(w+1)^k-1$.
- Base: $B_0$ is the empty set, since $x$ is affine.
- Step: each $z_j$ is affine on each interval of $B_k$, so each ReLU adds at most one point per interval, which gives $|B_{k+1}|\le(w+1)|B_k|+w$.
- Output layer adds no breakpoint, so $P(h)\le|B_L|+1$, which is at most $(w+1)^L$.

*Credit:* 2 for a correct inductive statement over a common breakpoint set for all neurons of a layer; 4 for the step (at most $w$ new points per interval and the recursion $(w+1)|B_k|+w$); 2 for base, output layer and conclusion. A correct proof of a weaker exponential bound such as $(2w)^L$ earns at most 4 of 8.

*Verified: exact breakpoint propagation on 150 random networks for each of $(w,L)=(2,2),(3,2),(4,2),(2,3)$ gave at most $7,10,11,11$ pieces, below $(w+1)^L$; sympy confirms the identity in the last line of the count.*

**4. (4) The sawtooth has at least $2^L$ pieces**

**What is asked.** Prove that $g^{\circ L}$ has at least $2^L$ linear pieces. The answer is a lower-bound proof.

**Tool and why.** A strict local extremum forces a breakpoint (cheat sheet §5). Since $P$ is a minimum over partitions, a lower bound must hold for every valid partition; the extremum lemma gives exactly that, because it holds for every partition.

**Definitions.** Let $x_j:=j\,2^{-L}$ for $j\in\{0,\dots,2^L\}$, the grid points of $[0,1]$, and let $J_j:=[x_{j-1},x_j]$ be the $j$-th grid interval. A point $x^*$ is a strict local maximum of $h$ if $h(x)<h(x^*)$ for every $x\neq x^*$ in some neighborhood of $x^*$; a strict local minimum is defined in the same way with the opposite inequality.

**Solution.**

Step 1, **Claim** (the lemma): if $x^*$ is a strict local extremum of a PWL function $h$, then every valid partition $c_0,\dots,c_P$ of $h$ has $x^*$ among $c_1,\dots,c_{P-1}$.

Proof by contradiction. If not, $x^*$ lies in the open interior of some piece $[c_{i-1},c_i]$, so $h$ is affine on a neighborhood of $x^*$, say $h(x)=ax+e$ there. If $a\neq0$, $h$ is larger than $h(x^*)$ on one side and smaller on the other, so $x^*$ is not an extremum. If $a=0$, $h$ is constant near $x^*$, so the inequality is not strict. Both cases contradict the assumption.

Step 2, every interior grid point is a strict local extremum: for $j\in[2^L-1]$, the given slope on $J_j$ is $(-1)^{j-1}2^L$ and on $J_{j+1}$ it is $(-1)^{j}2^L$. These have opposite signs. For odd $j$ the slope goes from $+2^L$ to $-2^L$, so near $x_j$

$$g^{\circ L}(x)=g^{\circ L}(x_j)-2^L|x-x_j|,$$

a strict peak. For even $j$ the slope goes from $-2^L$ to $+2^L$, so near $x_j$

$$g^{\circ L}(x)=g^{\circ L}(x_j)+2^L|x-x_j|,$$

a strict valley.

Step 3, counting: by Steps 1 and 2, every valid partition of $g^{\circ L}$, in particular a minimal one, contains the $2^L-1$ distinct points $x_1,\dots,x_{2^L-1}$ among $c_1,\dots,c_{P-1}$. So $P-1\ge2^L-1$, that is

$$\boxed{P(g^{\circ L})\ge2^L}$$

Remark: the exact count is $2^L+2$. Outside $[0,1]$ the tent is $0$, so $g^{\circ L}$ is $0$ there as well, and the endpoints $0$ and $1$ are also breakpoints, where the slope jumps between $0$ and $\pm2^L$. This matches Lecture 2's count $2+2^L$ for the sawtooth $g^{\circ L}$.

**In words.** Every tip and every valley of the sawtooth is a corner, and a corner cannot sit inside a straight piece.

**Sanity check.** For $L=1$ the tent $g$ has the pieces $x\le0$ with value $0$, slope $2$ on $[0,\tfrac12]$, slope $-2$ on $[\tfrac12,1]$ and value $0$ for $x\ge1$: four pieces, at least $2^1$, and exactly $2^1+2$.

**What to write in the exam.**

- Lemma: a strict local extremum cannot lie inside an affine piece, since an affine function has no strict extremum, so it is a breakpoint of every valid partition.
- Each $x_j=j2^{-L}$ with $j\in[2^L-1]$ separates slopes of opposite signs, so it is a strict peak or valley.
- Hence every partition has at least $2^L-1$ inner points, so $P(g^{\circ L})\ge2^L$.

*Credit:* 2 for the lemma; 2 for applying it to the $2^L-1$ grid points and counting.

*Verified: exact rational composition of the tent for $L=1,\dots,7$: the breakpoints inside the open interval $(0,1)$ are exactly the points $j2^{-L}$, the slopes are $(-1)^{j-1}2^L$, and the total number of pieces is $2^L+2$.*

**5. (6) Depth–width tradeoff**

**What is asked.** Two inequalities, one for a shallow and one for a deep network that realize $g^{\circ L}$, and one sentence on trading depth for width.

**Tool and why.** A sandwich (cheat sheet §4 and §5): the number of pieces belongs to the function, not to the network that computes it. Parts 2 and 3 bound it from above through the network, and part 4 bounds it from below through the function.

**Definitions.** No new notation.

**Solution.**

Step 1, the shallow case: let $h\in\mathcal N_{B,1}$ with $h\equiv g^{\circ L}$. By part 2, $P(h)\le B+1$. Since $h$ and $g^{\circ L}$ are the same function, part 4 gives $P(h)\ge2^L$. Together $B+1\ge2^L$, so

$$\boxed{B\ge2^L-1}$$

Step 2, the deep case: let $h\in\mathcal N_{w,L'}$ with $h\equiv g^{\circ L}$. By part 3, $P(h)\le(w+1)^{L'}$, and by part 4, $P(h)\ge2^L$. Hence $(w+1)^{L'}\ge2^L$. The logarithm is increasing and $\ln(w+1)>0$ because $w\ge1$, so

$$\begin{aligned}
L'\ln(w+1)&\ge L\ln2\\
L'&\ge L\cdot\frac{\ln2}{\ln(w+1)}.
\end{aligned}$$

Step 3, the sentence: since $g^{\circ L}\in\mathcal N_{3,L}$, depth $L$ with width $3$ suffices, while depth $1$ needs width at least $2^L-1$, and even unbounded width can shorten the depth only by the factor $\ln(w+1)/\ln2$; so replacing depth by width costs exponentially, and depth is exponentially more efficient for this family (Lecture 2, Prop. 2, Telgarsky).

**In words.** Width adds pieces additively, one per neuron, while depth multiplies them. A function with exponentially many pieces is therefore cheap for a deep network and expensive for a shallow one.

**Sanity check.** For $L=10$: a shallow network needs $B\ge1023$, while depth $10$ with width $3$, that is $30$ hidden neurons, suffices. With width $w=3$ the depth must be at least $10\cdot\ln2/\ln4=5$, and with $w=1$ it must be at least $10$.

**What to write in the exam.**

- Shallow: $P(h)\le B+1$ by part 2 and $P(h)\ge2^L$ by part 4, so $B\ge2^L-1$.
- Deep: $(w+1)^{L'}\ge2^L$ by parts 3 and 4; take logarithms.
- Sentence: depth to width costs exponentially, width to depth saves at most a logarithmic factor.

*Credit:* 3 for the shallow bound; 2 for the deep bound; 1 for the sentence.

*Verified: the numbers $1023$, $5$ and $10$ were recomputed in Python; the inequality chains are direct consequences of parts 2 to 4.*

**6. (10) PWL equals affine plus ReLUs, and universality**

**What is asked.** First, show that a PWL $f$ with breakpoints $t_1,\dots,t_{p-1}$, in increasing order, equals $ax+b+\sum_i c_i[x-t_i]_+$ and conclude $f\in\mathcal N_{p+1,1}$. Second, conclude that one-hidden-layer ReLU networks are universal in the distance $d$. Both answers are proofs.

**Tool and why.** Slope-jump decomposition (cheat sheet §5): a ReLU $[x-t_i]_+$ is zero to the left of $t_i$ and adds slope $1$ to the right, so it is exactly a slope jump at $t_i$. For universality, Lemma 1 of Lecture 2 (density of PWL functions, cheat sheet §4) plus exact realization.

**Definitions.** Set $t_0:=-\infty$ and $t_p:=\infty$. For $j\in[p]$ let $a_j$ be the slope of $f$ on its $j$-th piece $[t_{j-1},t_j]$. Let $a:=a_1$, and let $b$ be the intercept on the first piece, so that $f(x)=ax+b$ for $x\le t_1$. Let $c_i:=a_{i+1}-a_i$, the slope jump at $t_i$. The candidate is

$$\varphi(x):=ax+b+\sum_{i=1}^{p-1}c_i[x-t_i]_+.$$

**Solution.**

Step 1, agreement on the first piece: for $x\le t_1$ every $x-t_i$ is at most $0$, so all ReLU terms vanish and $\varphi(x)=ax+b$, which is $f(x)$.

Step 2, equal slopes on every piece: fix $j\in[p-1]$ and $x$ in the open interval $(t_j,t_{j+1})$. Then $[x-t_i]_+=x-t_i$ for $i\le j$, and $[x-t_i]_+=0$ for $i>j$. So $\varphi$ is differentiable there and

$$\begin{aligned}
\varphi'(x)&=a+\sum_{i=1}^{j}c_i\\
&=a_1+\sum_{i=1}^{j}(a_{i+1}-a_i)\\
&=a_{j+1}.
\end{aligned}$$

The last line is a telescoping sum. This is the slope of $f$ on its $(j+1)$-st piece.

Step 3, gluing: let $\psi:=f-\varphi$. It is continuous, and on each piece it is affine with slope $0$ by Steps 1 and 2, so it is constant on each closed piece. On the first piece the constant is $0$ by Step 1. Consecutive closed pieces share the endpoint $t_j$, so the constant on piece $j+1$ equals $\psi(t_j)$, which is the constant on piece $j$. By induction on $j$ every constant is $0$, so $f\equiv\varphi$.

Step 4, realization: for every real $x$, $ax=a[x]_+-a[-x]_+$, checking $x\ge0$ and $x<0$ separately. Hence

$$f(x)=a[x]_+-a[-x]_++\sum_{i=1}^{p-1}c_i[x-t_i]_++b.$$

This is a one-hidden-layer ReLU network: the hidden neurons have pre-activations $x$, $-x$ and $x-t_i$ for $i\in[p-1]$, the output weights are $a$, $-a$ and $c_i$, and the output bias is $b$. There are $(p-1)+2=p+1$ neurons, so $f\in\mathcal N_{p+1,1}$. For $p=1$ the sum is empty and two neurons suffice. Remark: writing the affine part with ReLUs at $t_1$ and merging the two $[x-t_1]_+$ terms gives width $p$, the sharp constant of Prop. 1; width $p+1$ earns full credit.

Step 5, universality: let $f$ be continuous and $\epsilon>0$. By Lemma 1 there is a PWL $\tilde g$ with $d(f,\tilde g)<\epsilon$; let it have $p$ pieces. By Step 4 there is $h\in\mathcal N_{p+1,1}$ with $h\equiv\tilde g$ on all of $\mathbb R$. Hence, with $B:=p+1$,

$$\boxed{d(f,h)=d(f,\tilde g)<\epsilon}$$

We wrote $\tilde g$ for the PWL function of Lemma 1 to avoid a clash with the tent $g$.

**In words.** A PWL function is a straight line that changes direction at a few points. Start with the line of the first piece and add one ReLU per bend, with height equal to the slope change; the straight line itself costs two ReLUs.

**Sanity check.** For $f(x)=|x|$: $p=2$, $t_1=0$, $a=-1$, $b=0$ and $c_1=2$, so $\varphi(x)=-x+2[x]_+$, which is $x$ for $x\ge0$ and $-x$ for $x<0$, that is $|x|$.

**What to write in the exam.**

- Define $a,b$ from the first piece and the jumps $c_i=a_{i+1}-a_i$.
- On the first piece $\varphi=f$; on piece $j+1$ the slope of $\varphi$ telescopes to $a_{j+1}$.
- Then $f-\varphi$ is continuous, piecewise constant and $0$ on the first piece, so it is $0$.
- Realize $ax$ as $a[x]_+-a[-x]_+$: $p+1$ neurons.
- Universality: Lemma 1 gives a PWL $\tilde g$ within $\epsilon$, realize it exactly, so $d(f,h)<\epsilon$.

*Credit:* 4 for the representation; 3 for the realization with $p+1$ neurons; 3 for universality.

*Verified: with exact fractions, on 2000 random PWL functions with 1 to 6 pieces, both $\varphi$ and the $(p+1)$-neuron network equal $f$ at all breakpoints and at 40 random rational points each.*

**Common mistakes.**

- Counting pieces of a composition additively, $p+q$, or forgetting the constant case $\alpha=0$; the example $|\,|x|-1|+|\,|x|-2|$ has $6$ pieces, more than $p+q$.
- In part 3, bounding pieces neuron by neuron without a common partition of the layer; this gives only bounds like $(2w)^L$ and caps the part at half credit. Also forgetting that the output layer adds no breakpoints.
- In part 4, counting monotone swings, which forces only about $2^{L-1}$ pieces, or lower-bounding the minimum $P$ with one particular partition. In part 6, dropping the $ax+b$ term, or concluding $f\equiv\varphi$ from equal slopes without the gluing step.

**💡 Useful tricks:** Composition *multiplies* pieces (breakpoints of $f\circ g$ = preimages of $f$'s breakpoints under $g$'s affine pieces); a shared per-layer partition gives the clean $(w+1)^L$ bound; a strict extremum forces a breakpoint, which lower-bounds the sawtooth at $2^L$; decompose PWL as $ax+b+\sum_i c_i[x-t_i]_+$ and realize the affine part with $a[x]_+-a[-x]_+$.

**⚠️ Watch out:** pieces multiply, they don't add ($p+q$ is wrong); use a *common* partition for all neurons of a layer — per-neuron bookkeeping only gives a weak $(2w)^L$; the lower bound needs the strict-extremum argument (swing-counting yields just $\sim2^{L-1}$); never drop the $ax+b$ term (it costs two neurons).

## Q2 — Gradient flow on a cubic reparameterization of linear regression (35)

**Full solution:**

**1. (7) The gradient of the cubic objective**

**What is asked.** Derive $\nabla L(z)=3\,z^{\odot2}\odot(X^\top r)$ with $r=Xz^{\odot3}-y$, by an actual computation. The answer is a formula with its derivation.

**Tool and why.** The chain rule with indices (cheat sheet §7, the definition of gradient flow). The loss is a square of an affine function of $z^{\odot3}$, so each partial derivative is one application of the chain rule.

**Definitions.** Let $r:=Xz^{\odot3}-y$ be the residual vector, with entries

$$r_n=\sum_{j=1}^d X_{nj}z_j^3-y_n,\qquad n\in[N].$$

We name $r$ because it appears in every partial derivative.

**Solution.**

Step 1, coordinates: by definition of the norm, $L(z)=\tfrac12\sum_{n=1}^N r_n^2$.

Step 2, inner derivative: in $r_n$ only the term with $j=i$ depends on $z_i$, so

$$\frac{\partial r_n}{\partial z_i}=3X_{ni}z_i^2.$$

Step 3, chain rule:

$$\begin{aligned}
\frac{\partial L}{\partial z_i}&=\sum_{n=1}^N r_n\,\frac{\partial r_n}{\partial z_i}\\
&=\sum_{n=1}^N r_n\cdot3X_{ni}z_i^2\\
&=3z_i^2\sum_{n=1}^N X_{ni}r_n\\
&=3z_i^2\,(X^\top r)_i.
\end{aligned}$$

The third line takes out the factor $3z_i^2$, which does not depend on $n$, and the last line is the definition of $(X^\top r)_i$.

Step 4, stacking the coordinates:

$$\boxed{\nabla L(z)=3\,z^{\odot2}\odot\big(X^\top(Xz^{\odot3}-y)\big)}$$

and gradient flow reads $\dot z=-3\,z^{\odot2}\odot(X^\top r)$.

An equivalent full-credit route uses a directional derivative: expand $(z+su)^{\odot3}$ to first order in $s$,

$$(z+su)^{\odot3}=z^{\odot3}+3s\,z^{\odot2}\odot u+O(s^2),$$

so the derivative of $L(z+su)$ at $s=0$ is $\langle X(3z^{\odot2}\odot u),r\rangle$, which equals $\langle u,3z^{\odot2}\odot(X^\top r)\rangle$ by the identity $\langle a\odot b,c\rangle=\langle b,a\odot c\rangle$.

**In words.** The cube acts like a coordinate-wise gate: the usual least-squares gradient $X^\top r$ is multiplied by $3z_i^2$, so coordinates near zero barely move.

**Sanity check.** For $d=1$, $N=1$, $X=1$ and $y=1$ the formula gives $3z^2(z^3-1)$, which is the derivative of $\tfrac12(z^3-1)^2$; this is the function of part 3.

**What to write in the exam.**

- Write $L=\tfrac12\sum_n r_n^2$ with $r_n=\sum_j X_{nj}z_j^3-y_n$.
- Inner derivative $3X_{ni}z_i^2$; chain rule gives $3z_i^2(X^\top r)_i$.
- Stack the coordinates: $\nabla L=3z^{\odot2}\odot(X^\top r)$, and the flow is minus this.

*Credit:* 4 for a genuine derivation (indices or directional); 3 for the correct vector assembly.

*Verified: central finite differences on 50 random $(X,y,z)$ agree with the formula up to relative error $4\cdot10^{-10}$.*

**2. (10) Zero coordinates stay zero**

**What is asked.** Prove that a coordinate that starts at $0$ stays at $0$ forever, deduce the support inclusion, and explain in one sentence why this is implicit regularization.

**Tool and why.** Uniqueness for a scalar ODE (the granted Picard–Lindelöf fact) along the given trajectory, and the notion of implicit regularization from Lecture 7 (cheat sheet §7 and §12). The derivative of $z_i$ is $0$ when $z_i=0$, but that alone proves nothing; uniqueness is what forbids leaving $0$.

**Definitions.** Fix $i$ with $z_i(0)=0$ and let $z(\cdot)$ be the unique solution of the flow. Define along this trajectory

$$a(t):=-3\big(X^\top r(t)\big)_i,\qquad\psi(t):=z_i(t).$$

The function $a$ is continuous, because $z(\cdot)$ is continuous and $r$ is a polynomial in $z$. We freeze $a$ along the true trajectory so that coordinate $i$ obeys a scalar ODE of its own.

**Solution.**

Step 1, the scalar ODE: by part 1, coordinate $i$ of the flow is $\dot z_i=-3z_i^2(X^\top r)_i$, so

$$\dot\psi(t)=a(t)\,\psi(t)^2,\qquad\psi(0)=0.$$

Step 2, uniqueness applies: the right-hand side $F(t,\psi):=a(t)\psi^2$ is continuous in $t$ and continuously differentiable in $\psi$, with $\partial F/\partial\psi=2a(t)\psi$. By the granted fact this ODE has at most one solution with $\psi(0)=0$.

Step 3, the zero function is that solution: $\psi\equiv0$ satisfies the ODE, because both sides vanish. By Step 2 it is the only solution, so $z_i(t)=0$ for every $t\ge0$.

This is not circular: $a(t)$ was defined from the actual trajectory, whatever it is, before we knew anything about $z_i$.

Step 4, support: if $i\notin\operatorname{supp}(z_0)$ then $z_i(t)=0$, so $z_i(t)^3=0$. Hence for every $t\ge0$

$$\operatorname{supp}\big(z(t)^{\odot3}\big)\subseteq\operatorname{supp}(z_0).$$

The predictors supported in a fixed set form a closed set, so the same holds for any limit point.

Step 5, the sentence: without any explicit penalty, the pair of optimizer and parameterization restricts which minimizers gradient flow can reach — here it implicitly controls the sparsity, the support size, of the learned predictor $w=z^{\odot3}$, which never exceeds that of the initialization; this is implicit regularization in the sense of Lecture 7, with "simple" meaning sparse rather than minimal $\ell_2$ norm or maximal margin.

**In words.** The speed of coordinate $i$ is proportional to $z_i^2$. At $0$ the coordinate has no speed, and because the speed grows only quadratically, smoothly, it can never get started.

**Sanity check.** Why uniqueness is essential: the ODE $\dot\psi=3\psi^{2/3}$ with $\psi(0)=0$ has the solution $\psi\equiv0$ and also $\psi=t^3$. Its right-hand side also vanishes at $0$, but it is not differentiable there, so the given fact does not apply. Numerically, a flow with $d=4$ started at $z_0=(0.7,0,-0.5,0)$ kept coordinates $2$ and $4$ exactly at $0$.

**What to write in the exam.**

- Freeze $a(t)=-3(X^\top r(t))_i$ along the trajectory, so $\dot\psi=a(t)\psi^2$ with $\psi(0)=0$.
- The right-hand side is continuous in $t$ and continuously differentiable in $\psi$, so the solution is unique, and $\psi\equiv0$ is a solution.
- Hence $z_i\equiv0$ and $\operatorname{supp}(z(t)^{\odot3})\subseteq\operatorname{supp}(z_0)$.
- Implicit regularization: the flow implicitly controls sparsity, without any explicit penalty.

*Credit:* 6 for zero preservation (alternatively: solve the reduced flow on $\operatorname{supp}(z_0)$, extend by zeros, check that it solves the full ODE and invoke uniqueness of the full flow); 2 for the support conclusion; 2 for the sentence.

*Verified: numerical integration in Python with $d=4$, $N=5$ up to $t=50$ kept the two zero coordinates at exactly $0$; sympy confirms that $t^3$ solves $\dot\psi=3\psi^{2/3}$.*

**3. (8) Non-convexity and a degenerate critical point**

**What is asked.** For $L(z)=\tfrac12(z^3-1)^2$, prove that $L$ is not convex and that $L''(0)=0$.

**Tool and why.** For a differentiable convex function every critical point is a global minimum (cheat sheet §7). So one critical point that is not a global minimum proves non-convexity. The curvature at $0$ is a direct second derivative, compared with the strict-saddle definition (cheat sheet §7).

**Definitions.** No new notation.

**Solution.**

Step 1, the derivative, by the chain rule, or by part 1 with $X=1$ and $y=1$:

$$L'(z)=3z^2(z^3-1)=3z^5-3z^2.$$

Step 2, critical points: $L'(z)=0$ when $z^2=0$ or $z^3=1$, so the real critical points are $z=0$ and $z=1$.

Step 3, a critical point that is not a global minimum: $L\ge0$ everywhere and $L(1)=0$, so $z=1$ is a global minimum. But $L(0)=\tfrac12$, which is positive, so $z=0$ is a critical point that is not a global minimum. If $L$ were convex, the reminder would make $z=0$ a global minimum. Hence $L$ is not convex.

An equivalent full-credit route is an explicit chord violation. At the midpoint of $0$ and $1$,

$$L\big(\tfrac12\big)=\tfrac12\big(\tfrac18-1\big)^2=\tfrac{49}{128},$$

while the average of the endpoint values is

$$\frac{L(0)+L(1)}{2}=\frac14=\frac{32}{128}.$$

Since $\tfrac{49}{128}>\tfrac{32}{128}$, the graph lies above the chord.

Step 4, the second derivative: differentiating $3z^5-3z^2$,

$$L''(z)=15z^4-6z,$$

so $L''(0)=0$: there is no negative curvature at the origin.

Step 5, the type of the origin: expanding the square,

$$L(z)-L(0)=\tfrac12z^6-z^3=-z^3\big(1-\tfrac12z^3\big).$$

For small $z>0$ this is negative and for small $z<0$ it is positive, so $0$ is neither a local minimum nor a local maximum. It is a saddle-type critical point with vanishing second derivative, so it is not a strict saddle. This is the analogue of Prop. 3 of Lecture 3 for linear networks of depth at least $3$: here $w=z^3$ is a depth-$3$ scalar product $z\cdot z\cdot z$. That is why a landscape argument fails and part 4 analyzes the trajectory instead.

**In words.** Cubing flattens the landscape around $0$: the loss starts to drop only at third order, so there is a critical point that is not a minimum yet offers no curvature to escape along.

**Sanity check.** At the global minimum $L''(1)=9$, which is positive: a strict minimum, as expected. Numerically, $L(0.1)-L(0)\approx-0.0010$ and $L(-0.1)-L(0)\approx+0.0010$, opposite signs as Step 5 says.

**What to write in the exam.**

- Compute $L'(z)=3z^2(z^3-1)$; the critical points are $0$ and $1$.
- Since $L(1)=0$ and $L(0)=\tfrac12$, the critical point $0$ is not a global minimum, so $L$ is not convex.
- Second derivative $L''(z)=15z^4-6z$ gives $L''(0)=0$: a degenerate, non-strict critical point.

*Credit:* 5 for non-convexity; 3 for the degeneracy.

*Verified: sympy gives $L'$, $L''$, the critical points $\{0,1\}$, $L(\tfrac12)=\tfrac{49}{128}$ and the chord average $\tfrac14$.*

**4. (10) Convergence from $z(0)=\alpha\in(0,1)$**

**What is asked.** Prove that $z(t)$ is strictly increasing, that $z(t)\to1$, and that $L(z(t))\to0$.

**Tool and why.** A one-dimensional phase-line argument (cheat sheet §7): the sign of the velocity, a barrier at the equilibrium $1$ by uniqueness, monotone convergence, and the fact that the limit must be an equilibrium.

**Definitions.** Let

$$\varphi(z):=-L'(z)=-3z^2(z^3-1),$$

so the flow is $\dot z=\varphi(z)$. Let $T$ be the supremum of the times $t\ge0$ such that $z(s)\in(0,1)$ for all $s\in[0,t]$. We introduce $T$ to show that the trajectory never leaves $(0,1)$.

**Solution.**

Step 1, sign: for $z\in(0,1)$ we have $z^2>0$ and $z^3-1<0$, so $\varphi(z)>0$.

Step 2, barrier: the constant $\hat z\equiv1$ solves the ODE, because $\varphi(1)=0$. Suppose $z(t^*)=1$ for some $t^*>0$. Run time backward: $\chi(s):=z(t^*-s)$ solves $\dot\chi=-\varphi(\chi)$ with $\chi(0)=1$, and so does the constant $1$. The right-hand side is continuously differentiable, so by uniqueness $\chi\equiv1$ on $[0,t^*]$, which gives $z(0)=1$. This contradicts $\alpha<1$. So $z(t)\neq1$ for every $t$.

Step 3, confinement: $T>0$ because $z(0)=\alpha\in(0,1)$ and $z$ is continuous. On $[0,T)$, Step 1 gives $\dot z>0$, so $z$ is strictly increasing there and $z(t)\ge\alpha$. Suppose $T<\infty$. By continuity $z(T)\in[\alpha,1]$. If $z(T)<1$, then $z(T)\in(0,1)$ and by continuity $z$ stays in $(0,1)$ a little beyond $T$, which contradicts the definition of $T$. So $z(T)=1$, which contradicts Step 2. Hence $T=\infty$: for all $t\ge0$, $z$ is strictly increasing with $z(t)\in[\alpha,1)$.

Step 4, the limit is an equilibrium: a monotone bounded function converges, so $z(t)\uparrow z_\infty$ with $z_\infty\in(\alpha,1]$. By continuity of $\varphi$,

$$\dot z(t)=\varphi(z(t))\to\varphi(z_\infty),$$

and $\varphi(z_\infty)\ge0$ on $(\alpha,1]$. Suppose $c:=\varphi(z_\infty)$ is positive. Then there is $t_0$ with $\dot z(t)\ge c/2$ for all $t\ge t_0$, so

$$z(t)\ge z(t_0)+\tfrac c2(t-t_0)\to\infty,$$

which contradicts boundedness. So $\varphi(z_\infty)=0$.

Step 5, identification: the zeros of $\varphi$ are $z=0$ and $z=1$. Since $z_\infty>\alpha$ and $\alpha>0$, we get $z_\infty=1$. Finally $L$ is continuous, so

$$\boxed{L(z(t))=\tfrac12\big(z(t)^3-1\big)^2\to L(1)=0}$$

**In words.** On $(0,1)$ the flow always pushes upward, it can never jump past the resting point $1$, and a motion that keeps going up but stays bounded has to settle at a point where the push vanishes, which is $1$.

**Sanity check.** Numerical integration from $\alpha\in\{0.05,0.3,0.9\}$: the trajectory is strictly increasing, within $10^{-9}$ of $1$ by $t=10$, and the loss at $t=2000$ is about $10^{-25}$. A small $\alpha$ starts slowly, since the speed is about $3z^2$ near $0$; this is the flat saddle of part 3 at work.

**What to write in the exam.**

- Sign: $\varphi(z)>0$ on $(0,1)$.
- Barrier: $\hat z\equiv1$ is a solution, so by uniqueness the trajectory cannot reach $1$; hence it stays in $[\alpha,1)$ and is strictly increasing.
- Monotone and bounded, so $z(t)\to z_\infty$; if $\varphi(z_\infty)>0$ then $z\to\infty$, a contradiction, so $z_\infty$ is an equilibrium.
- Since $z_\infty>0$, $z_\infty=1$ and $L(z(t))\to0$.

*Credit:* 2 for the sign; 3 for the confinement; 3 for the limit being an equilibrium; 2 for the identification.

*Verified: numerical integration (scipy, tolerance $10^{-12}$) from three initial values in $(0,1)$; the trajectories are strictly increasing until $1-z<10^{-9}$ and the final loss is below $10^{-24}$.*

**Common mistakes.**

- In part 1, losing the factor $3$, writing $Xr$ instead of $X^\top r$, or flipping the sign of $r$.
- In part 2, arguing "the derivative at $0$ is $0$, so the coordinate never moves" without uniqueness; the ODE $\dot\psi=3\psi^{2/3}$ shows this is false in general. Using $z_i\equiv0$ to compute $\dot z_i$ is circular.
- In parts 3 and 4, trying to disprove convexity from $L''(0)=0$ alone, keeping $z$ below $1$ without the uniqueness barrier, asserting without proof that the limit is a critical point, or forgetting to rule out $z_\infty=0$.

**💡 Useful tricks:** Chain rule gives $\dot z=-3\,z^{\odot2}\odot(X^\top r)$ — note the factor $3$; zero coordinates stay zero by *scalar uniqueness* of $\dot\psi=a(t)\psi^2$, $\psi(0)=0$ ⇒ implicit sparsity ($\mathrm{supp}(w(t))\subseteq\mathrm{supp}(z_0)$); non-convexity via a critical-but-not-global point ($z=0$); 1D convergence by sign + confinement + monotone-bounded.

**⚠️ Watch out:** "$\dot\psi=0$ at $0$ ⇒ never moves" is FALSE without uniqueness (counterexample $\dot\psi=3\psi^{2/3}$ has $\psi=t^3$); $L''(0)=0$ is a *flat non-strict* degeneracy — you cannot disprove convexity from the Hessian alone, exhibit a non-global critical point or a chord violation; confining $z<1$ needs the uniqueness barrier; rule out $z_\infty=0$.

## Q3 — Generalization via a cover of the parameter ball (30)

**Full solution:**

**1. (7) An $\epsilon$-cover of the cube**

**What is asked.** Construct a finite $C_\epsilon\subseteq\mathcal B$ with at most $(\lceil1/\epsilon\rceil+1)^d$ points such that every $w\in\mathcal B$ is within $\epsilon$ of it in the $\ell_\infty$ norm. Both properties must be proved.

**Tool and why.** A one-dimensional grid and a product (cheat sheet §10, covering). The $\ell_\infty$ distance is a maximum over coordinates, so a cover of $[-1,1]$ in each coordinate gives a cover of the cube.

**Definitions.** Let $k:=\lceil1/\epsilon\rceil$. Define the uncapped grid points $\gamma_j:=-1+2\epsilon j$ for $j\in\{0,\dots,k\}$, the capped set

$$T:=\big\{\min(\gamma_j,1)\ :\ j=0,1,\dots,k\big\},$$

and $C_\epsilon:=T^d$. The spacing is $2\epsilon$ because a point covers $\epsilon$ on each side; the cap keeps the points inside $[-1,1]$.

**Solution.**

Step 1, $T$ lies in $[-1,1]$ and is small: every $\gamma_j\ge-1$, and taking the minimum with $1$ keeps it at most $1$. There are $k+1$ indices, so $|T|\le k+1$.

Step 2, the uncapped grid reaches $1$: since $k\ge1/\epsilon$,

$$\gamma_k=-1+2\epsilon k\ge-1+2=1.$$

Step 3, one-dimensional covering: let $\alpha\in[-1,1]$. The points $\gamma_0,\dots,\gamma_k$ have spacing $2\epsilon$ and run from $-1$ to at least $1$, so $\alpha$ lies between two consecutive points, and the nearer one, call it $\gamma$, satisfies $|\alpha-\gamma|\le\epsilon$. If $\gamma\le1$, then $\gamma\in T$. If $\gamma>1$, then $1=\min(\gamma,1)\in T$, and because $\alpha\le1$ and $1<\gamma$,

$$|\alpha-1|<|\alpha-\gamma|\le\epsilon.$$

Either way $\alpha$ is within $\epsilon$ of a point of $T$.

Step 4, the product: $C_\epsilon=T^d$ lies in $[-1,1]^d$, and

$$|C_\epsilon|=|T|^d\le(\lceil1/\epsilon\rceil+1)^d,$$

which is property (i). For $w\in\mathcal B$ choose each coordinate $\tilde w_i\in T$ within $\epsilon$ of $w_i$, by Step 3. Then $\tilde w\in C_\epsilon$ and

$$\|w-\tilde w\|_\infty=\max_i|w_i-\tilde w_i|\le\epsilon,$$

which is property (ii).

**In words.** The $\ell_\infty$ ball of radius $\epsilon$ is a cube of side $2\epsilon$, so about $1/\epsilon$ such cubes per axis cover $[-1,1]$, and $(1/\epsilon)^d$ cover the whole cube.

**Sanity check.** For $\epsilon=1$: $k=1$ and $T=\{-1,1\}$, and every point of $[-1,1]$ is within $1$ of an endpoint. For $\epsilon=0.3$: $k=4$, the uncapped points are $-1,-0.4,0.2,0.8,1.4$, the last is capped to $1$, so $|T|=5$, which is $k+1$.

**What to write in the exam.**

- Grid $\gamma_j=-1+2\epsilon j$ for $j=0,\dots,k$ with $k=\lceil1/\epsilon\rceil$, capped at $1$; spacing $2\epsilon$.
- Every point of $[-1,1]$ is within $\epsilon$ of a grid point; if that point exceeds $1$, the cap $1$ is even closer.
- Take $C_\epsilon=T^d$: size at most $(k+1)^d$, and coordinatewise rounding gives $\ell_\infty$ distance at most $\epsilon$.

*Credit:* 4 for the one-dimensional cover; 3 for the product.

*Verified: for nine values of $\epsilon$ from $0.033$ to $1$, the size and radius were checked on a fine grid of $[-1,1]$ and on 20000 random points of $[-1,1]^d$ for $d=1,2,3$; the worst radius equals $\epsilon$.*

**2. (8) Uniform convergence on the cover**

**What is asked.** Prove that with probability at least $1-\delta$, every $\tilde w\in C_\epsilon$ simultaneously has $|L_D(\tilde w)-L_S(\tilde w)|\le\Delta_\epsilon(N,\delta)$.

**Tool and why.** Hoeffding for each fixed cover point, then a union bound over the finite cover (cheat sheet §2 and §10). Hoeffding is legitimate because the cover is fixed before the sample is drawn.

**Definitions.** Let $K:=\lceil1/\epsilon\rceil+1$, so that $|C_\epsilon|\le K^d$, and let $t:=\Delta_\epsilon(N,\delta)$. For a fixed $\tilde w$ let $A_n:=\ell(h_{\tilde w}(x_n),y_n)$ for $n\in[N]$.

**Solution.**

Step 1, one fixed point: $C_\epsilon$ depends only on $\epsilon$ and $d$, not on $S$. So for a fixed $\tilde w\in C_\epsilon$ the variables $A_n$ are i.i.d., as functions of the i.i.d. pairs $(x_n,y_n)$, they lie in $[0,1]$, their mean is $\mathbb E[A_1]=L_D(\tilde w)$, and their average is $L_S(\tilde w)$.

Step 2, Hoeffding with this $t$: by the definition of $\Delta_\epsilon$, $2Nt^2=d\ln K+\ln(2/\delta)$. Hence

$$\begin{aligned}
P\big(|L_S(\tilde w)-L_D(\tilde w)|\ge t\big)&\le2\exp(-2Nt^2)\\
&=2\exp\big(-d\ln K-\ln(2/\delta)\big)\\
&=2\cdot K^{-d}\cdot\tfrac{\delta}{2}\\
&=\delta K^{-d}.
\end{aligned}$$

Step 3, union bound: the probability that some $\tilde w\in C_\epsilon$ has a deviation of at least $t$ is at most the sum of the separate probabilities,

$$|C_\epsilon|\cdot\delta K^{-d}\le K^d\cdot\delta K^{-d}=\delta.$$

Step 4, the complement: with probability at least $1-\delta$, every $\tilde w\in C_\epsilon$ has a deviation smaller than $t$, and in particular at most $\Delta_\epsilon(N,\delta)$.

**In words.** Each fixed cover point concentrates like a single coin, and paying for all $K^d$ points together costs only $d\ln K$ inside the square root.

**Sanity check.** For $d=1$ and $\epsilon=1$ the cover is $\{-1,1\}$, $K=2$, and the bound becomes $\sqrt{\ln(4/\delta)/(2N)}$, exactly Hoeffding with a union over two points. Only $|C_\epsilon|\le K^d$ is needed, not equality, because the failure probability grows with the number of points.

**What to write in the exam.**

- The cover is data-independent, so for fixed $\tilde w$ the losses are i.i.d. in $[0,1]$ with mean $L_D(\tilde w)$.
- Hoeffding with $t=\Delta_\epsilon$ gives failure probability $2e^{-2Nt^2}=\delta K^{-d}$.
- Union over at most $K^d$ points: total failure at most $\delta$.

*Credit:* 3 for the setup with a fixed, data-independent point; 2 for Hoeffding; 3 for the union bound.

*Verified: sympy simplifies $2\exp(-2Nt^2)-\delta K^{-d}$ to $0$ for this $t$.*

**3. (8) Transfer to the whole ball**

**What is asked.** Prove that on one event of probability at least $1-\delta$, every $w\in\mathcal B$ satisfies $L_D(w)-L_S(w)\le\Delta_\epsilon(N,\delta)+2\rho\epsilon$.

**Tool and why.** Lipschitz transfer from the nearest cover point, the $2\rho\epsilon$ pattern (cheat sheet §10): once all cover points are good, every parameter is within $\epsilon$ of a good one, and the Lipschitz condition moves the bound over at a cost of $\rho\epsilon$ on each side.

**Definitions.** Let $E$ be the event of part 2. For $w\in\mathcal B$ let $\tilde w\in C_\epsilon$ be a cover point with $\|w-\tilde w\|_\infty\le\epsilon$, which exists by part 1. Write $\ell_w(x,y):=\ell(h_w(x),y)$ for short.

**Solution.**

Step 1, pointwise: for every $(x,y)$, by the Lipschitz assumption and the choice of $\tilde w$,

$$|\ell_w(x,y)-\ell_{\tilde w}(x,y)|\le\rho\|w-\tilde w\|_\infty\le\rho\epsilon.$$

Step 2, the empirical side: $L_S(w)-L_S(\tilde w)$ is the average of $\ell_w-\ell_{\tilde w}$ over the sample, so by the triangle inequality and Step 1, $|L_S(w)-L_S(\tilde w)|\le\rho\epsilon$.

Step 3, the population side: moving the absolute value inside the expectation and using Step 1,

$$\begin{aligned}
|L_D(w)-L_D(\tilde w)|&=\big|\mathbb E[\ell_w-\ell_{\tilde w}]\big|\\
&\le\mathbb E\big|\ell_w-\ell_{\tilde w}\big|\\
&\le\rho\epsilon.
\end{aligned}$$

Step 4, combine on $E$: on the event $E$, for every $w\in\mathcal B$ at once,

$$\begin{aligned}
L_D(w)-L_S(w)&=\big[L_D(w)-L_D(\tilde w)\big]+\big[L_D(\tilde w)-L_S(\tilde w)\big]+\big[L_S(\tilde w)-L_S(w)\big]\\
&\le\rho\epsilon+\Delta_\epsilon(N,\delta)+\rho\epsilon\\
&=\Delta_\epsilon(N,\delta)+2\rho\epsilon.
\end{aligned}$$

The first bracket uses Step 3, the middle one uses $E$ for the cover point $\tilde w$, and the last uses Step 2. The event $E$ refers only to cover points and was fixed once, so the bound holds for all $w$ simultaneously, which is the required quantifier.

**In words.** The cover is a finite skeleton of the ball. Concentration is paid once for the skeleton, and every other parameter inherits the bound of its nearest skeleton point, up to a Lipschitz error on each side.

**Sanity check.** If $\rho$ tends to $0$, all parameters give the same loss and the bound reduces to the bound of part 2. In a toy family $\ell=\tfrac12+\tfrac12\sin(w\cdot x+y)$ with $d=2$, $\rho=1$, $N=400$, $\epsilon=0.2$ and $\delta=0.1$, the bound is $0.491$, and over 300 samples the largest gap over a grid of parameters was $0.058$.

**What to write in the exam.**

- Pick $\tilde w\in C_\epsilon$ within $\epsilon$; pointwise the losses differ by at most $\rho\epsilon$.
- Averaging gives $|L_S(w)-L_S(\tilde w)|\le\rho\epsilon$, and expectation gives $|L_D(w)-L_D(\tilde w)|\le\rho\epsilon$.
- On the single event of part 2, telescope through $\tilde w$: $\Delta_\epsilon+2\rho\epsilon$, for all $w$ at once.

*Credit:* 2 for the pointwise Lipschitz step; 3 for the two transfers; 3 for combining on one event.

*Verified: Monte-Carlo in Python on the toy family above, with $L_D$ estimated from $2\cdot10^5$ fresh points; no violation of the bound in 300 samples.*

**4. (7) Choosing $\epsilon$**

**What is asked.** Choose $\epsilon\in(0,1]$ as an explicit function of $N$ and $\rho$, write the resulting bound without $\epsilon$, and prove that it tends to $0$ as $N\to\infty$.

**Tool and why.** Balancing the two terms (cheat sheet §10): a smaller $\epsilon$ shrinks the transfer term $2\rho\epsilon$ but enlarges the cover, which costs only $d\ln(1/\epsilon)$ inside the square root. Taking $\epsilon$ of order $1/(\rho\sqrt N)$ makes both terms vanish.

**Definitions.** Let

$$\epsilon:=\min\big\{1,\ \tfrac{1}{\rho\sqrt N}\big\}.$$

**Solution.**

Step 1, validity: $\epsilon>0$, and $\epsilon\le1$ because of the minimum.

Step 2, the case $N\ge1/\rho^2$: then $\rho\sqrt N\ge1$, so $\epsilon=1/(\rho\sqrt N)$, $1/\epsilon=\rho\sqrt N$ and $2\rho\epsilon=2/\sqrt N$. Substituting into part 3,

$$\Delta(N,\delta)=\sqrt{\frac{d\,\ln\!\big(\lceil\rho\sqrt N\rceil+1\big)+\ln(2/\delta)}{2N}}+\frac{2}{\sqrt N}.$$

Step 3, the case $N<1/\rho^2$: then $\epsilon=1$, so $\lceil1/\epsilon\rceil+1=2$ and

$$\Delta(N,\delta)=\sqrt{\frac{d\ln2+\ln(2/\delta)}{2N}}+2\rho.$$

Step 4, the limit: for $N\ge1/\rho^2$ Step 2 applies. Since $\lceil\rho\sqrt N\rceil+1\le\rho\sqrt N+2$, the first term is at most

$$\sqrt{\frac{d\ln(\rho\sqrt N+2)+\ln(2/\delta)}{2N}}.$$

With $d$, $\rho$ and $\delta$ fixed, $\ln(\rho\sqrt N+2)/N\to0$ because a logarithm grows slower than $N$, and $\ln(2/\delta)/N\to0$. So the first term tends to $0$, and $2/\sqrt N\to0$ as well. Hence

$$\boxed{\Delta(N,\delta)=O\Big(\sqrt{\tfrac{d\ln(\rho\sqrt N+2)+\ln(2/\delta)}{N}}\Big)\xrightarrow[N\to\infty]{}0}$$

Any $\epsilon(N)\in(0,1]$ with $\rho\epsilon(N)\to0$ and $d\ln(1/\epsilon(N))/N\to0$, for example $\epsilon=1/\sqrt N$, also earns full credit, provided the limit is proved and not only asserted.

**In words.** Shrinking the grid as $1/\sqrt N$ makes the discretization error match the statistical error, and the price of a finer grid is only logarithmic, so the total rate is about $\sqrt{d\ln N/N}$.

**Sanity check.** With $d=3$, $\delta=0.05$ and $\rho=1$: $N=100$ gives $\epsilon=0.1$ and $\Delta\approx0.433$; $N=10^4$ gives $\epsilon=0.01$ and $\Delta\approx0.0496$; $N=10^6$ gives $\Delta\approx0.0055$. With $\rho=5$ and $N=10^6$, $\Delta\approx0.0058$, almost the same, because $\rho$ enters only through a logarithm.

**What to write in the exam.**

- Choose $\epsilon=\min\{1,1/(\rho\sqrt N)\}$, which lies in $(0,1]$.
- For $N\ge1/\rho^2$: $\Delta=\sqrt{(d\ln(\lceil\rho\sqrt N\rceil+1)+\ln(2/\delta))/(2N)}+2/\sqrt N$.
- Bound the ceiling by $\rho\sqrt N+2$; logarithm over $N$ tends to $0$, and so does $2/\sqrt N$.

*Credit:* 3 for any valid explicit choice with an explicit bound; 4 for proving the limit.

*Verified: the values of $\Delta$ above were computed in Python for $N$ from $10$ to $10^6$ and decrease to $0$.*

**Common mistakes.**

- Using grid spacing $\epsilon$ instead of $2\epsilon$, which gives about $(2/\epsilon)^d$ points and misses the required size, or letting cover points fall outside $[-1,1]^d$.
- Applying Hoeffding to a data-dependent $w$, or forgetting the union bound; the whole point of the cover is that its points are fixed before the sample.
- Paying only one $\rho\epsilon$ in part 3, or in part 4 choosing a constant $\epsilon$ or leaving $\epsilon$ in the final bound, so the transfer term never vanishes.

**💡 Useful tricks:** Grid spacing $2\epsilon$ (a radius-$\epsilon$ ball covers a length-$2\epsilon$ interval), clamped into $[-1,1]$; product cover $|C_\epsilon|\leq(\lceil1/\epsilon\rceil+1)^d$; Hoeffding on the *data-independent* cover + union; $2\rho\epsilon$ Lipschitz transfer to the whole ball; balance $\epsilon\sim1/(\rho\sqrt N)$ to make everything vanish.

**⚠️ Watch out:** use spacing $2\epsilon$, not $\epsilon$ (else the size blows up); keep cover points *inside* the ball (clamp); Hoeffding needs the FIXED cover, never a data-dependent $w$; pay $2\rho\epsilon$ (both $L_D$ and $L_S$ transfer); choose $\epsilon(N)\to0$ or the transfer term never vanishes.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during the attempt: −20%
  of that sub-part.
- Common traps to check: Q1.1 additive piece counting; Q1.3 no common partition
  (weaker $(2w)^L$-type bound caps at half credit); Q1.4 swing-counting instead of the
  strict-extremum argument; Q1.6 missing affine term or ungrounded $f\equiv\varphi$;
  Q2.1 quoting the gradient without derivation; Q2.2 zero-preservation without a
  uniqueness argument; Q2.4 barrier at $1$ or "limit is an equilibrium" asserted
  without proof; Q3.1 cover of the wrong radius/size or points outside the ball;
  Q3.2 Hoeffding on a data-dependent hypothesis or missing union bound; Q3.3 a single
  $\rho\epsilon$; Q3.4 non-vanishing or non-explicit $\epsilon$.
- Cross-references for review after grading: Q1 ↔ Lecture 2 §1 (Prop. 1, Prop. 2,
  Lemma 1); Q2 ↔ Lecture 3 (Prop. 3), Lecture 7 (implicit regularization) and the
  gradient-flow recitation; Q3 ↔ Lecture 6 §2.1 and Exam 2023 Moed A Q3 (function-class
  covering — compare the two discretizations).
