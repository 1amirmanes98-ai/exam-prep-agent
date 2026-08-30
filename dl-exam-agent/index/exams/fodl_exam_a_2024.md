# FODL Exam — Moed A 2024
**Date / semester:** 15.08.2024 — Semester B 2023/24 (תשפ"ד), Moed A; School of CS, Tel Aviv University; lecturer: Dr. Nadav Cohen, TA: Yonatan Ariel Slutzky; 3 hours; 3 questions, max possible score 105
**Total points:** 105

## Q1 (40 pts) — Linear RNNs: non-universality and the diagonal/symmetric transition-matrix hierarchy
**Topics:** linear-rnn, hypothesis-class, universality, expressiveness-hierarchy | **Pillar:** Expressiveness | **Difficulty:** 3
**Maps to:** lecture_02_expressiveness
**Statement (English translation):**
In this question we deal with neural networks of the Linear Recurrent Neural Network type. For an arbitrary $L \in \mathbb{N}_{\geq 3}$, we are interested in the hypothesis class $\mathcal{H}_d$ containing hypotheses $h$ that receive a sequence of $L$ real numbers denoted $x = (x_1, \cdots, x_L)$, where $x_1, \cdots, x_L \in \mathbb{R}$, output a single real number $y \in \mathbb{R}$, and satisfy the following recursive relation:

$$s_0(x) = 0$$
$$\forall t \in [L]:\ s_t(x) = A\, s_{t-1}(x) + B x_t$$
$$h(x) = C^\top s_L(x)$$

The vectors $s_0(x), \cdots, s_L(x) \in \mathbb{R}^d$ are called the *hidden states*, and $d \in \mathbb{N}$ is the *state-space dimension* of the hypothesis class. The weights defining the hypothesis are $A \in \mathbb{R}^{d \times d}$ (called the *transition matrix*) and $B, C \in \mathbb{R}^d$. A useful fact is that for every $h \in \mathcal{H}_d$ with weights $A, B, C$:

$$h(x) = \sum_{t=1}^{L} C^\top A^{L-t} B\, x_t$$

**(1) (10 pts)** Prove that the class $\mathcal{H}_d$ is not universal with respect to the set of continuous functions, in the sense that it does not include all continuous functions. That is, there exists a continuous function $f$ for which

$$\forall d \in \mathbb{N}:\ f \notin \mathcal{H}_d$$

For $d \in \mathbb{N}$ denote by $\mathcal{H}_d^{diag} \subseteq \mathcal{H}_d$ the sub-class of hypotheses whose transition matrix $A$ is a diagonal matrix.

**(2) (10 pts)** Prove that $\mathcal{H}_d^{diag}$ is monotonic (non-decreasing) with respect to $d$.

**(3) (10 pts)** Prove the following claim: $\mathcal{H}_1^{diag}$ is strictly contained in $\mathcal{H}_2^{diag}$.
*Hint:* for each of the classes, consider how the sum of the diagonal (trace) of the matrix $A^t$ behaves as a function of $t$.

For $d \in \mathbb{N}$ denote by $\mathcal{H}_d^{sym} \subseteq \mathcal{H}_d$ the sub-class of hypotheses whose transition matrix $A$ is a symmetric matrix.

**(4) (10 pts)** Prove that $\mathcal{H}_d^{diag} = \mathcal{H}_d^{sym}$.
*Hint:* consider the orthogonal eigendecomposition of the symmetric transition matrices.

**Solution sketch:**
**1.** Every $h \in \mathcal{H}_d$ is a *linear* functional of the input: $h(x) = \sum_t w_t x_t$ with $w_t = C^\top A^{L-t} B$. Hence $h(0) = 0$, and $h$ is additive/homogeneous. Any continuous non-linear function, e.g. $f(x) = x_1^2$ (or $f \equiv 1$, since every $h$ vanishes at $x = 0$), is in no $\mathcal{H}_d$.

**2.** Padding: given $(A, B, C)$ with $A$ diagonal of size $d$, take

$$A' = \mathrm{diag}(A, 0) \in \mathbb{R}^{(d+1)\times(d+1)}$$

and pad $B, C$ with a zero entry. Then $C'^\top A'^{L-t} B' = C^\top A^{L-t} B$ for all $t$, so the same function is realized, giving

$$\mathcal{H}_d^{diag} \subseteq \mathcal{H}_{d+1}^{diag}$$

**3.** Inclusion follows from (2). Strictness: for $d = 1$ the coefficient sequence $w_t = cb\,a^{L-t}$ is a geometric progression. In particular, if the middle coefficient $w_{L-1} = cb\,a = 0$ then $cb = 0$ or $a = 0$, forcing $w_L = 0$ or $w_{L-2} = 0$ as well. Take the target coefficients $(w_{L-2}, w_{L-1}, w_L) = (1, 0, 1)$ (uses $L \geq 3$): impossible in $\mathcal{H}_1^{diag}$ by the above, but realized in $\mathcal{H}_2^{diag}$ with $a_1 = 1, a_2 = -1$ and $c_1 b_1 = c_2 b_2 = \tfrac{1}{2}$, giving $w_t = \tfrac{1 + (-1)^{L-t}}{2}$ (the alternating $1, 0, 1$ pattern). This matches the hint: trace/coefficients of $A^t$ are a single geometric sequence for $d=1$ vs. a sum of two geometric sequences for $d=2$.

**4.** ($\subseteq$) Diagonal matrices are symmetric, so

$$\mathcal{H}_d^{diag} \subseteq \mathcal{H}_d^{sym}$$

($\supseteq$) Write symmetric $A = V D V^\top$ with $V$ orthogonal, $D$ diagonal. Then

$$C^\top A^{L-t} B = (V^\top C)^\top D^{L-t} (V^\top B)$$

so replacing $(A, B, C) \to (D, V^\top B, V^\top C)$ realizes the same function with a diagonal transition matrix. Both inclusions give equality.

**💡 Useful tricks:** Any "is this class universal?" collapses once you show $h$ is *linear* in the inputs ($h(x)=\sum_t w_t x_t$) — then a nonlinear witness or $h(0)=0$ kills universality; the geometric-sequence signature $w_{t+1}w_{t-1}=w_t^2$ separates $d=1$; diagonalize symmetric $A=VDV^\top$ and *absorb* $V$ into $B,C$.

**⚠️ Watch out:** (1) exhibit a concrete $f$ and prove $f\notin\mathcal H_d\ \forall d$, not just "it's nonlinear"; (3) prove BOTH the inclusion (from padding, part 2) AND strictness, and note the $(1,0,1)$ witness needs $L\geq 3$; (4) prove both directions — the key insight is $(V^\top B,V^\top C)$ realizes the *same* function.

## Q2 (35 pts) — Gradient flow on symmetric matrix factorization $W = UU^\top$: non-convexity, end-to-end and eigenvalue dynamics, low-rank bias
**Topics:** matrix-factorization, gradient-flow, convexity, implicit-regularization, linear-nn, conservation-laws | **Pillar:** Optimization | **Difficulty:** 4
**Maps to:** lecture_04_optimization_2, lecture_05_optimization_3, fodl_recitation_gradient_flow
**Statement (English translation):**
In this question we deal with the loss function $L$ defined as follows:

$$L: \mathbb{R}^{d \times d} \to \mathbb{R}, \quad L(W) := \|W - W^*\|^2$$

where $d \in \mathbb{N}$ and $W^* \in \mathbb{R}^{d \times d}$ is a symmetric positive semi-definite matrix which is not $0 \in \mathbb{R}^{d \times d}$, i.e. $L(0) > L(W^*)$. We define the objective function $\phi$ as follows:

$$\phi: \mathbb{R}^{d \times d} \to \mathbb{R}, \quad \phi(U) := L(U U^\top)$$

**(1) (7 pts)** Prove that $\phi$ is not convex.

Suppose gradient flow is run over $\phi$ with some initialization $U_0 \in \mathbb{R}^{d \times d}$. Denote by $W(t)$ the "end-to-end" matrix at time $t \in \mathbb{R}_{\geq 0}$, i.e. $W(t) = U(t) U(t)^\top$.

**(2) (13 pts)** Prove that

$$\frac{d}{dt} W(t) = -2\big[\,2(W(t) - W^*)W(t) + 2W(t)(W(t) - W^*)\,\big]$$

*Hint:* first compute $\frac{d}{dt} U(t)$ and then apply the product rule (Leibniz rule).

The matrix $W(t)$ is symmetric and hence diagonalizable for every $t \geq 0$. Assume there exists an analytic eigendecomposition of $W(t)$; that is, there exist functions $V: \mathbb{R}_{\geq 0} \to \mathbb{R}^{d \times d}$ and $\Lambda: \mathbb{R}_{\geq 0} \to \mathbb{R}^{d \times d}$ such that for every $t \geq 0$ the matrix $V(t)$ is orthonormal, the matrix $\Lambda(t)$ is diagonal, both are (infinitely many times) differentiable with respect to $t$, and $W(t) = V(t) \Lambda(t) V(t)^\top$.

**(3) (10 pts)** Prove that for every $r \in \{1, \cdots, d\}$:

$$\frac{d}{dt} \Lambda(t)_{r,r} = 4 \Lambda(t)_{r,r} \left\langle -2(W(t) - W^*),\ v_r(t) v_r(t)^\top \right\rangle$$

(where $v_r(t)$ denotes the $r$-th column of $V(t)$).
*Reminder:* for all real matrices $A, B, C$ the following hold:
- If the products $ABC$ and $CAB$ are defined, then $Tr(ABC) = Tr(CAB)$.
- If $A$ and $B$ have the same dimensions, then $\langle A, B \rangle = Tr(A B^\top)$.

**(4) (5 pts)** Explain why one may expect that running gradient flow over $\phi$ with an initialization close to the origin $0 \in \mathbb{R}^{d \times d}$ yields, at the end of optimization, an end-to-end matrix of approximately low rank (under the assumption that $L$ can be minimized with approximately low-rank matrices). The explanation may be qualitative.

**Solution sketch:**
**1.** Symmetry trick: $\phi(U) = \phi(-U)$ for all $U$. If $\phi$ were convex, then

$$\begin{aligned} \phi(0) &= \phi\big(\tfrac{1}{2}U + \tfrac{1}{2}(-U)\big) \\ &\leq \tfrac{1}{2}\phi(U) + \tfrac{1}{2}\phi(-U) \\ &= \phi(U) \end{aligned}$$

for every $U$, i.e. $0$ would be a global minimizer of $\phi$. But $W^*$ is PSD, so $U^* := (W^*)^{1/2}$ satisfies $U^* U^{*\top} = W^*$ and $\phi(U^*) = L(W^*) < L(0) = \phi(0)$ — contradiction.

**2.** Gradient:

$$\nabla \phi(U) = 2\big[(UU^\top - W^*) + (UU^\top - W^*)^\top\big]U = 4(W - W^*)U$$

using symmetry of $W = UU^\top$ and of $W^*$. Gradient flow: $\dot U(t) = -4(W(t) - W^*)U(t)$. Leibniz:

$$\begin{aligned} \dot W &= \dot U U^\top + U \dot U^\top \\ &= -4(W - W^*)UU^\top - 4UU^\top(W - W^*) \\ &= -2[2(W - W^*)W + 2W(W - W^*)] \end{aligned}$$

**3.** Write

$$\Lambda(t)_{r,r} = \lambda_r(t) = v_r(t)^\top W(t) v_r(t)$$

Differentiating, the $\dot v_r$ terms vanish because $W v_r = \lambda_r v_r$ and $v_r^\top v_r = 1 \Rightarrow \dot v_r^\top v_r = 0$, leaving $\dot \lambda_r = v_r^\top \dot W v_r$. Substitute (2):

$$\begin{aligned} v_r^\top \dot W v_r &= -4\big[v_r^\top (W - W^*) W v_r + v_r^\top W (W - W^*) v_r\big] \\ &= -8 \lambda_r\, v_r^\top (W - W^*) v_r \end{aligned}$$

By the trace identities this equals

$$4 \lambda_r \langle -2(W - W^*), v_r v_r^\top \rangle$$

**4.** The eigenvalue ODE $\dot \lambda_r \propto \lambda_r \cdot (\text{alignment with } -\nabla L)$ means each eigenvalue moves at a rate proportional to its own magnitude (multiplicative/exponential dynamics). With near-zero initialization all $\lambda_r \approx 0$. Eigenvalues get amplified essentially one at a time, only in directions needed to reduce $L$, while the rest remain stuck near $0$. Hence the final $W$ is approximately low-rank — implicit regularization / incremental (greedy) low-rank learning of gradient flow on matrix factorization.

**💡 Useful tricks:** $\phi(U)=\phi(-U)$ ⇒ non-convexity via the midpoint inequality at $0$; to differentiate an eigenvalue write $\lambda_r=v_r^\top W v_r$ and kill the $\dot v_r$ terms using $Wv_r=\lambda_r v_r$ and $v_r^\top v_r=1$; reshape the result with the trace identities $\langle A,B\rangle=\mathrm{Tr}(AB^\top)$, $\mathrm{Tr}(ABC)=\mathrm{Tr}(CAB)$ (Lecture 4/8).

**⚠️ Watch out:** (1) a convexity contradiction needs an *explicit* better point — $U^*=(W^*)^{1/2}$ beats $0$; asserting non-convexity is not enough; (2) the factor-$4$ gradient uses symmetry of both $W$ and $W^*$; (3) the vanishing of the $\dot v_r$ terms must be justified, not assumed; (4) the point is the *multiplicative* $\dot\lambda_r\propto\lambda_r$, which stalls small eigenvalues.

## Q3 (30 pts) — Finite hypothesis class: Hoeffding + union bound, rank-preferring SRM bound, and approximate-low-rank index bound
**Topics:** uniform-convergence, hoeffding, concentration, probability-tools, structural-risk-minimization, low-rank, implicit-regularization | **Pillar:** Generalization | **Difficulty:** 4
**Maps to:** lecture_06_generalization_1, lecture_07_generalization_2
**Statement (English translation):**
For an input space $\mathcal{X}$ and output space $\mathcal{Y} = \mathbb{R}$, let $\mathcal{H} \subseteq \mathcal{Y}^{\mathcal{X}}$ be a hypothesis class of neural networks with some architecture having a parameter matrix $W \in \mathbb{R}^{d \times d}$, for $d \in \mathbb{N}$ even. Let $D$ be a distribution (unknown) over $\mathcal{X} \times \mathcal{Y}$, let $S = \{(x_n, y_n)\}_{n=1}^{N}$ be a training set of $N$ examples drawn i.i.d. from $D$, and let $l: \mathcal{Y} \times \mathcal{Y} \to [0,1]$ be a loss function.

For every hypothesis $h \in \mathcal{H}$, denote by $L_D(h)$ the generalization error (i.e. $L_D(h) := E_{(x,y)\sim D}[l(h(x), y)]$) and by $L_S(h)$ the sample error (i.e. $L_S(h) := \frac{1}{N}\sum_{n=1}^{N} l(h(x_n), y_n)$). Assume that every entry of $W_h$ (the parameter matrix of hypothesis $h$) takes values in $\{1, \cdots, B\}$ (i.e., $\forall i, j \in \{1, \cdots, d\}:\ (W_h)_{ij} \in \{1, \cdots, B\}$).

**(1) (5 pts)** Prove that $|\mathcal{H}| \leq B^{d^2}$.

**(2) (8 pts)** Derive a generalization bound based on uniform convergence for the class $\mathcal{H}$. That is, derive an expression $\Delta_1(N, \delta, |\mathcal{H}|)$ (whose dependence on the hypothesis class is only through $|\mathcal{H}|$) satisfying $\lim_{N \to \infty} \Delta_1(N, \delta, |\mathcal{H}|) = 0$, such that for every $\delta \in (0,1)$, with probability at least $1 - \delta$:

$$\forall h \in \mathcal{H}:\ L_D(h) - L_S(h) \leq \Delta_1(N, \delta, |\mathcal{H}|)$$

**In this part you may not rely on claims proved in class during the solution, but you may use the Hoeffding bound (see reminder below).**

*Reminder (Hoeffding bound):* let $A_1, \ldots, A_N$ be i.i.d. (independent, identically distributed) random variables bounded in the interval $[0,1]$. For every $\epsilon \geq 0$:

$$P\left(\left|\frac{1}{N}\sum_{i=1}^{N} A_i - E[A_1]\right| \geq \epsilon\right) \leq 2\exp(-2N\epsilon^2)$$

**(3) (9 pts)** For every $i \in \{0, \cdots, d\}$ denote by $\mathcal{H}_i \subseteq \mathcal{H}$ the set of hypotheses associated with matrices of rank at most $i$; that is, for every $h \in \mathcal{H}$: $h \in \mathcal{H}_i$ if and only if $rank(W_h) \leq i$. Derive a generalization bound similar to that of part 2, which prefers hypotheses associated with low-rank matrices. That is, derive an expression $\Delta_2(N, \delta, i)$ satisfying the following conditions:

a. $\lim_{N \to \infty} \Delta_2(N, \delta, i) = 0$ for every $i \in \{0, \cdots, d\}$ and every $\delta \in (0,1)$.
b. For every $\delta \in (0,1)$, with probability at least $1 - \delta$:
$$\forall i \in \{0, \cdots, d\},\ \forall h \in \mathcal{H}_i:\ L_D(h) - L_S(h) \leq \Delta_2(N, \delta, i)$$
c. $\Delta_2(N, \delta, 0) < \Delta_2(N, \delta, 1) < \cdots < \Delta_2(N, \delta, d)$ for every $\delta \in (0,1)$.

**In this part you may use the previous part's bound $\Delta_1(N, \delta, |\mathcal{H}|)$ as a "black box", even if you did not derive an expression for it.**

**(4) (8 pts)** Let $\epsilon > 0$. Denote by $index: \mathcal{H} \to \{0, \cdots, d\}$ the function mapping a hypothesis $h$ to the minimal index of the sub-classes $\mathcal{H}_i$ in which there exists a hypothesis $\bar h$ whose distance from $h$ is no more than $\epsilon$. That is, for every $h \in \mathcal{H}$:

$$index(h) = \min\left\{ i \in \{0, \cdots, d\}:\ \exists \bar h \in \mathcal{H}_i\ s.t.\ \forall x \in \mathcal{X}:\ |h(x) - \bar h(x)| \leq \epsilon \right\}$$

Suppose the learning algorithm at our disposal tends to return hypotheses $h \in \mathcal{H}$ for which $index(h)$ is relatively small. Explain what is problematic about using the previous bound. In addition, assume that $l$ is $\rho$-Lipschitz with respect to its first variable, and propose a new bound based on the bound $\Delta_2(N, \delta, i)$ that favors the hypotheses returned by the algorithm. That is, derive an expression $\Delta_3(N, \delta, h)$ satisfying the following conditions:

a. $\lim_{N \to \infty} \Delta_3(N, \delta, h) = \mathcal{O}(\epsilon)$ for every $h \in \mathcal{H}$ and every $\delta \in (0,1)$.
b. For every $\delta \in (0,1)$, with probability at least $1 - \delta$:
$$\forall h \in \mathcal{H}:\ L_D(h) - L_S(h) \leq \Delta_3(N, \delta, h)$$
c. For every $h_1, h_2 \in \mathcal{H}$ and every $\delta \in (0,1)$: if $index(h_1) < index(h_2)$ then $\Delta_3(N, \delta, h_1) < \Delta_3(N, \delta, h_2)$.

*Hint:* find a constant $c > 0$ such that the conditions hold for the bound

$$\Delta_3(N, \delta, h) := \Delta_2(N, \delta, index(h)) + c \cdot \rho \cdot \epsilon$$

**In this part you may use the previous part's bound $\Delta_2(N, \delta, i)$ as a "black box", even if you did not derive an expression for it.**

**Solution sketch:**
**1.** Every hypothesis is determined by its parameter matrix $W_h$. There are at most $B^{d^2}$ such matrices ($d^2$ entries, each with at most $B$ possible values), and the map from matrices onto $\mathcal{H}$ is surjective, so $|\mathcal{H}| \leq B^{d^2}$.

**2.** Fix $h$: the variables $A_n := l(h(x_n), y_n)$ are i.i.d. in $[0,1]$ with $E[A_1] = L_D(h)$, so Hoeffding gives

$$P(|L_S(h) - L_D(h)| \geq \epsilon) \leq 2e^{-2N\epsilon^2}$$

Union bound over the (finite) class: failure probability $\leq 2|\mathcal{H}| e^{-2N\epsilon^2}$. Setting this to $\delta$ and solving yields

$$\Delta_1(N, \delta, |\mathcal{H}|) = \sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2N}} \to 0$$

**3.** SRM-style confidence splitting: allocate $\delta_i := \delta \cdot 2^{-(i+1)}$ to sub-class $\mathcal{H}_i$ (so $\sum_{i=0}^{d} \delta_i < \delta$) and apply part 2 to each $\mathcal{H}_i$ (using $|\mathcal{H}_i| \leq |\mathcal{H}| \leq B^{d^2}$):

$$\Delta_2(N, \delta, i) := \sqrt{\frac{\ln(2 \cdot 2^{i+1} B^{d^2} / \delta)}{2N}}$$

Union bound over $i$ gives (b); the $2^{i+1}$ factor makes the bound strictly increasing in $i$ (c); and it still vanishes as $N \to \infty$ (a). (Alternative: uniform split $\delta/(d+1)$ combined with a strictly-increasing counting bound $|\mathcal{H}_i| \lesssim B^{2di}$ via a skeleton/CUR-type argument — counting constant (unverified).)

**4.** The problem: $\Delta_2$ helps $h$ only through the actual rank of $W_h$ (the smallest $i$ with $h \in \mathcal{H}_i$). A hypothesis returned by the algorithm is typically only *close* to a low-rank hypothesis ($index(h)$ small) while $rank(W_h)$ itself can be as large as $d$, so the $\Delta_2$ bound stays large and does not reward the algorithm's low-rank bias. Fix: let $\bar h \in \mathcal{H}_{index(h)}$ be $\epsilon$-close to $h$. $\rho$-Lipschitzness of $l$ in its first argument gives

$$|l(h(x), y) - l(\bar h(x), y)| \leq \rho\epsilon$$

pointwise. Hence $|L_D(h) - L_D(\bar h)| \leq \rho\epsilon$ and $|L_S(\bar h) - L_S(h)| \leq \rho\epsilon$. On part 3's event:

$$\begin{aligned} L_D(h) - L_S(h) &\leq \big(L_D(\bar h) - L_S(\bar h)\big) + 2\rho\epsilon \\ &\leq \Delta_2(N, \delta, index(h)) + 2\rho\epsilon \end{aligned}$$

— so $c = 2$ works. Conditions: (a) $\lim_N \Delta_3 = 0 + 2\rho\epsilon = \mathcal{O}(\epsilon)$; (b) holds on the same probability-$(1-\delta)$ event as part 3; (c) strict monotonicity of $\Delta_2$ in $i$ transfers to $\Delta_3$ through $index(h)$.

**💡 Useful tricks:** Finite class ⇒ Hoeffding per-hypothesis then union bound; "prefers low-rank/low-index" cues SRM — split the budget as $\delta_i=\delta\,2^{-(i+1)}$ (summable ⇒ still valid, and the $2^{i+1}$ makes it strictly increasing in $i$); "returned hypotheses are *close* to low-rank" cues a Lipschitz transfer $|L(h)-L(\bar h)|\leq\rho\epsilon$ to the nearest cover member.

**⚠️ Watch out:** Hoeffding needs $h$ FIXED before seeing $S$ — never apply it to the learned $\hat h$; union over ALL of $\mathcal H$; the SRM split must both sum to $\leq\delta$ AND increase in $i$; in (4) the whole point is $index(h)\ll\mathrm{rank}(W_h)$, and $c=2$ because you transfer twice (on $L_D$ and $L_S$).
