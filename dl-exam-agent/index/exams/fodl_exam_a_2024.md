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

**1. A continuous function outside every $\mathcal{H}_d$**

**What is asked.** Exhibit one continuous function $f$ that no linear RNN realizes, whatever the state-space dimension $d$. The answer is a concrete $f$ together with a proof.

**Tool and why.** Non-universality is shown by a single witness (cheat sheet §4). The useful fact in the statement says that every hypothesis is a linear function of the input, and a linear function always vanishes at the origin. So any continuous $f$ with $f(0) \neq 0$ is a witness.

**Definitions.** For weights $A, B, C$ we write

$$w_t := C^\top A^{L-t} B, \qquad t \in [L].$$

These numbers are the coefficients of $h$; we introduce them to see $h$ as a weighted sum of the inputs. The witness is the constant function $f(x) := 1$ for every $x \in \mathbb{R}^L$. Finally, $e_1$ denotes the input sequence with $x_1 = 1$ and all other entries $0$.

**Solution.**

Step 1, every hypothesis is linear: by the useful fact, $h(x) = \sum_{t=1}^{L} w_t x_t$. The coefficients $w_t$ depend only on the weights, not on $x$.

Step 2, every hypothesis vanishes at the origin: substituting the all-zero sequence $x = 0$ gives

$$h(0) = \sum_{t=1}^{L} w_t \cdot 0 = 0.$$

This holds for every $d$ and for every choice of $A, B, C$.

Step 3, the witness: $f$ is constant, hence continuous, and $f(0) = 1$. Every $h \in \mathcal{H}_d$ has $h(0) = 0$, so $f$ differs from every hypothesis at the input $x = 0$. Since this is true for every $d$:

$$\forall d \in \mathbb{N}:\ f \notin \mathcal{H}_d.$$

Step 4, a non-linear witness also works: take $f(x) = x_1^2$, which is continuous. Then $f(2e_1) = 4$ while $2 f(e_1) = 2$. Every hypothesis is linear, so $h(2e_1) = 2h(e_1)$. Hence $f$ is not a hypothesis either. This is the same idea seen through homogeneity instead of the value at $0$.

**In words.** A linear RNN has no biases and no non-linearities: it only reweights the inputs and adds them up. It can never output anything but $0$ on the all-zero input, and it can never bend.

**Sanity check.** With $d = 1$, $L = 3$ and all three weights equal to $1$ we get $h(x) = x_1 + x_2 + x_3$. Indeed $h(0) = 0$, while $f(0) = 1$.

**What to write in the exam.**

- By the useful fact, $h(x) = \sum_t w_t x_t$ with $w_t = C^\top A^{L-t} B$.
- Hence $h(0) = 0$ for every $d$ and every $h \in \mathcal{H}_d$.
- Take $f \equiv 1$: it is continuous and $f(0) = 1$, so $f \notin \mathcal{H}_d$ for every $d$.

*Verified: for 200 random $(d, L, A, B, C)$ the recursion gives $h(0) = 0$, agrees with $\sum_t w_t x_t$, and satisfies $h(2x+3y) = 2h(x)+3h(y)$ (NumPy).*

**2. Monotonicity in $d$ by zero padding**

**What is asked.** Show that $\mathcal{H}_d^{diag} \subseteq \mathcal{H}_{d+1}^{diag}$ for every $d$, and hence that the class can only grow as $d$ grows. The answer is a proof.

**Tool and why.** Embed a small network in a bigger one by zero padding (cheat sheet §4). The extra state coordinate is never written into (its entry of $B$ is $0$) and never read (its entry of $C$ is $0$), so it cannot change the output. Padding a diagonal matrix with a zero keeps it diagonal, so we stay inside the diagonal sub-class.

**Definitions.** Let $h \in \mathcal{H}_d^{diag}$ have weights $A, B, C$ with $A$ diagonal. The padded weights are

$$A' := \begin{pmatrix} A & 0 \\ 0 & 0 \end{pmatrix}, \quad B' := \begin{pmatrix} B \\ 0 \end{pmatrix}, \quad C' := \begin{pmatrix} C \\ 0 \end{pmatrix},$$

and $h'$ is the hypothesis in $\mathcal{H}_{d+1}$ with these weights. The matrix $A'$ is diagonal, so $h' \in \mathcal{H}_{d+1}^{diag}$.

**Solution.**

Step 1, powers of a block-diagonal matrix: for every integer $k \geq 0$,

$$A'^{k} = \begin{pmatrix} A^{k} & 0 \\ 0 & 0^{k} \end{pmatrix},$$

because multiplying block-diagonal matrices multiplies the blocks. For $k = 0$ the corner entry is $1$, since $A'^{0} = I$; it will not matter.

Step 2, the coefficients agree: the last coordinate contributes the product of its entries of $C'$, $A'^{k}$ and $B'$, so

$$\begin{aligned} C'^\top A'^{k} B' &= C^\top A^{k} B + 0 \cdot 0^{k} \cdot 0 \\ &= C^\top A^{k} B. \end{aligned}$$

Step 3, the same function: apply Step 2 with $k = L-t$ for every $t \in [L]$. By the useful fact $h'$ and $h$ have the same coefficients, so $h'(x) = h(x)$ for every $x$. Hence $h \in \mathcal{H}_{d+1}^{diag}$, that is,

$$\mathcal{H}_d^{diag} \subseteq \mathcal{H}_{d+1}^{diag}.$$

Step 4, any larger dimension: chaining Step 3 (formally, induction on the gap between the two dimensions) gives, for every $d'$ larger than $d$,

$$\mathcal{H}_d^{diag} \subseteq \mathcal{H}_{d+1}^{diag} \subseteq \cdots \subseteq \mathcal{H}_{d'}^{diag}.$$

**In words.** A bigger hidden state can always imitate a smaller one: keep the extra coordinates disconnected from both the input and the output.

**Sanity check.** For $d = 1$ the hypothesis has coefficients $cb\,a^{L-t}$. Padding gives $A' = \mathrm{diag}(a, 0)$, $B' = (b, 0)^\top$, $C' = (c, 0)^\top$, whose coefficients are $cb\,a^{L-t} + 0$: the same.

**What to write in the exam.**

- Pad: $A' = \mathrm{diag}(A, 0)$, and $B', C'$ get an extra entry $0$.
- Then $A'^{k} = \mathrm{diag}(A^{k}, 0^{k})$, so $C'^\top A'^{k} B' = C^\top A^{k} B$ for every $k$.
- Same coefficients, same function, and $A'$ is diagonal, so $\mathcal{H}_d^{diag} \subseteq \mathcal{H}_{d+1}^{diag}$.
- Induction on the dimension gives inclusion for every larger $d'$.

*Verified: 200 random diagonal instances, some with a zero diagonal entry, give identical coefficient vectors before and after padding (NumPy).*

**3. Strict inclusion of $\mathcal{H}_1^{diag}$ in $\mathcal{H}_2^{diag}$**

**What is asked.** Two things: the inclusion, and one function that lies in $\mathcal{H}_2^{diag}$ but not in $\mathcal{H}_1^{diag}$. The answer is a proof with an explicit witness.

**Tool and why.** The inclusion is part 2 with $d = 1$. For strictness we use matrix powers of diagonal matrices (cheat sheet §3): with $d = 1$ the coefficients $w_t$ form one geometric sequence, which cannot switch off and on again; with $d = 2$ they are a sum of two geometric sequences, and $1^{k}$ plus $(-1)^{k}$ alternates. This is exactly the hint: for $d = 1$ the trace $\mathrm{Tr}(A^{t}) = a^{t}$ is geometric, while for $A = \mathrm{diag}(1, -1)$ the trace is $2, 0, 2, 0, \dots$

**Definitions.** The witness is the linear function

$$f(x) := \sum_{t=1}^{L} u_t x_t, \qquad u_t := \frac{1 + (-1)^{L-t}}{2}.$$

So $u_t = 1$ when $L-t$ is even and $u_t = 0$ when $L-t$ is odd. The last three coefficients are $u_L = 1$, $u_{L-1} = 0$, $u_{L-2} = 1$; they exist because $L \geq 3$. We also write $e_t$ for the input sequence with $x_t = 1$ and all other entries $0$; we use it to read off coefficients.

**Solution.**

Step 1, inclusion: part 2 with $d = 1$ gives $\mathcal{H}_1^{diag} \subseteq \mathcal{H}_2^{diag}$.

Step 2, the witness is in $\mathcal{H}_2^{diag}$: take $A = \mathrm{diag}(1, -1)$, $B = (1, 1)^\top$, $C = (\tfrac12, \tfrac12)^\top$. For every $k \geq 0$,

$$C^\top A^{k} B = \tfrac12 \cdot 1^{k} \cdot 1 + \tfrac12 \cdot (-1)^{k} \cdot 1 = \frac{1 + (-1)^{k}}{2}.$$

With $k = L-t$ this is $u_t$, so by the useful fact this network computes exactly $f$.

Step 3, coefficients determine the function: suppose some $h \in \mathcal{H}_1^{diag}$ equals $f$, with coefficients $w_t$. Evaluating at $e_t$ gives $h(e_t) = w_t$ and $f(e_t) = u_t$, so $w_t = u_t$ for every $t$.

Step 4, a $d = 1$ network has geometric coefficients: its weights are scalars $a, b, c$, so $w_t = cb\,a^{L-t}$. In particular

$$w_L = cb, \qquad w_{L-1} = cb\,a, \qquad w_{L-2} = cb\,a^{2}.$$

Step 5, contradiction: since $u_L = 1$, Step 3 gives $w_L = 1$, that is $cb = 1$. Then $w_{L-1}$ equals $a$, and $u_{L-1} = 0$ forces $a = 0$. Then $w_{L-2} = cb\,a^{2}$ is $0$, but $u_{L-2} = 1$. So no $d = 1$ network computes $f$, and with Step 1 and Step 2:

$$\boxed{\mathcal{H}_1^{diag} \subsetneq \mathcal{H}_2^{diag}}$$

**In words.** One state coordinate means one decay rate $a$: the past inputs are weighted by the powers of $a$, and such weights cannot vanish at one lag and come back at the next. Two coordinates give two rates, and the rates $1$ and $-1$ interfere to produce on, off, on.

**Sanity check.** For $L = 3$ the witness is $f(x) = x_1 + x_3$. The $d = 2$ network above has coefficients $(1, 0, 1)$. A geometric sequence satisfies $w_{L-2} w_L = w_{L-1}^{2}$, but here

$$w_{L-2}\, w_L = 1 \neq 0 = w_{L-1}^{2}.$$

**What to write in the exam.**

- Inclusion: part 2 with $d = 1$.
- Witness: $f(x) = \sum_t u_t x_t$ with $u_t = \tfrac{1 + (-1)^{L-t}}{2}$; its last three coefficients are $1, 0, 1$ (this needs $L \geq 3$).
- It is in $\mathcal{H}_2^{diag}$ with $A = \mathrm{diag}(1, -1)$, $B = (1, 1)^\top$, $C = (\tfrac12, \tfrac12)^\top$.
- It is not in $\mathcal{H}_1^{diag}$: there $w_t = cb\,a^{L-t}$; $w_L = 1$ forces $cb = 1$, then $w_{L-1} = 0$ forces $a = 0$, and then $w_{L-2}$ is $0$, not $1$.

*Verified: NumPy confirms the $d = 2$ realization for every $L$ from $3$ to $11$; SymPy shows that the system $cb = 1$, $cb\,a = 0$, $cb\,a^{2} = 1$ has no solution.*

**4. Diagonal and symmetric transition matrices give the same class**

**What is asked.** Prove the two inclusions $\mathcal{H}_d^{diag} \subseteq \mathcal{H}_d^{sym}$ and $\mathcal{H}_d^{sym} \subseteq \mathcal{H}_d^{diag}$. The answer is a proof.

**Tool and why.** The spectral theorem (cheat sheet §3): every real symmetric matrix is orthogonally diagonalizable, and its powers act only on the eigenvalues. The orthogonal factors can then be absorbed into $B$ and $C$, which are free parameters.

**Definitions.** For a symmetric $A$ write $A = V D V^\top$, where $V$ is orthogonal (its columns are eigenvectors, $V^\top V = I$) and $D$ is diagonal (the eigenvalues). We set $\tilde B := V^\top B$ and $\tilde C := V^\top C$: the input and output vectors written in the eigenbasis.

**Solution.**

Step 1, the easy inclusion: a diagonal matrix equals its transpose, so it is symmetric. Hence every hypothesis with a diagonal transition matrix also has a symmetric one, and $\mathcal{H}_d^{diag} \subseteq \mathcal{H}_d^{sym}$.

Step 2, powers: **Claim.** For every integer $k \geq 0$, $A^{k} = V D^{k} V^\top$. The proof is by induction on $k$, upwards from $0$.

**Base.** For $k = 0$:

$$A^{0} = I = V V^\top = V D^{0} V^\top,$$

because $V$ is orthogonal.

**Hypothesis.** For some $k \geq 0$, $A^{k} = V D^{k} V^\top$.

**Step.** Using the hypothesis in the second row and $V^\top V = I$ in the third:

$$\begin{aligned} A^{k+1} &= A^{k} A \\ &= V D^{k} V^\top V D V^\top \\ &= V D^{k+1} V^\top. \end{aligned}$$

Step 3, absorbing $V$: for every $k \geq 0$,

$$\begin{aligned} C^\top A^{k} B &= C^\top V D^{k} V^\top B \\ &= (V^\top C)^\top D^{k} (V^\top B) \\ &= \tilde C^\top D^{k} \tilde B. \end{aligned}$$

The second row uses $(V^\top C)^\top = C^\top V$.

Step 4, the other inclusion: apply Step 3 with $k = L-t$ for every $t$. The hypothesis with weights $(D, \tilde B, \tilde C)$ has the same coefficients as the one with weights $(A, B, C)$, so by the useful fact it is the same function. Its transition matrix $D$ is diagonal, so $\mathcal{H}_d^{sym} \subseteq \mathcal{H}_d^{diag}$.

Step 5, conclusion: both inclusions together give

$$\boxed{\mathcal{H}_d^{diag} = \mathcal{H}_d^{sym}}$$

**In words.** A symmetric transition matrix is a diagonal one seen in rotated coordinates of the hidden state. Rotating the hidden state does not change the output, as long as $B$ and $C$ are rotated with it.

**Sanity check.** For $d = 1$ every $1 \times 1$ matrix is both diagonal and symmetric, and the equality is trivial. For $d = 2$, $A = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ has eigenvalues $1$ and $-1$, so it gives the same coefficients as a network with $D = \mathrm{diag}(1, -1)$, the matrix of part 3.

**What to write in the exam.**

- Diagonal matrices are symmetric, so $\mathcal{H}_d^{diag} \subseteq \mathcal{H}_d^{sym}$.
- For symmetric $A$ write $A = V D V^\top$ with $V$ orthogonal and $D$ diagonal; then $A^{k} = V D^{k} V^\top$.
- Hence $(D, V^\top B, V^\top C)$ has the same coefficients as $(A, B, C)$, so $\mathcal{H}_d^{sym} \subseteq \mathcal{H}_d^{diag}$.

*Verified: for 200 random symmetric $A$ (NumPy `eigh`) the weights $(A, B, C)$ and $(D, V^\top B, V^\top C)$ give identical coefficient vectors.*

**Common mistakes.**

- In part 1, writing "every hypothesis is linear, so the class is not universal" without naming a concrete continuous $f$ and checking that it fails for every $d$.
- In part 3, proving only that one particular $d = 1$ network misses the witness, instead of all $d = 1$ networks; or forgetting the inclusion half of "strictly contained".
- In part 4, rotating $A$ into $D$ but keeping the old $B$ and $C$: the function changes, and the proof breaks.

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

**1. $\phi$ is not convex**

**What is asked.** Prove that $\phi$ is not a convex function. The answer is a proof by contradiction with explicit points.

**Tool and why.** Symmetry plus the convexity inequality at a midpoint (cheat sheet §7, non-convexity of over-parameterized objectives). Since $\phi(U) = \phi(-U)$ and the midpoint of $U$ and $-U$ is $0$, convexity would make $0$ a global minimizer. A square root of the PSD matrix $W^*$ (cheat sheet §3) gives a point strictly better than $0$.

**Definitions.** Let $U^* := (W^*)^{1/2}$ be the PSD square root of $W^*$: write $W^* = Q S Q^\top$ with $Q$ orthogonal and $S$ diagonal with non-negative entries (spectral theorem; the entries are non-negative because $W^*$ is PSD), and set $U^* := Q S^{1/2} Q^\top$. We need it because it is a factor whose product is exactly the target. The norm is the Frobenius norm.

**Solution.**

Step 1, symmetry: for every $U$,

$$\phi(-U) = L\big((-U)(-U)^\top\big) = L(UU^\top) = \phi(U).$$

Step 2, convexity would make $0$ a global minimizer: suppose $\phi$ is convex. For every $U$, the point $0$ is the midpoint of $U$ and $-U$, so

$$\begin{aligned} \phi(0) &= \phi\big(\tfrac{1}{2}U + \tfrac{1}{2}(-U)\big) \\ &\leq \tfrac{1}{2}\phi(U) + \tfrac{1}{2}\phi(-U) \\ &= \phi(U). \end{aligned}$$

The second row is the definition of convexity with weight $\tfrac12$; the third row is Step 1.

Step 3, a point better than $0$: $U^*$ is symmetric, so

$$U^* U^{*\top} = Q S^{1/2} Q^\top Q S^{1/2} Q^\top = Q S Q^\top = W^*,$$

using $Q^\top Q = I$. Hence

$$\begin{aligned} \phi(U^*) &= \|W^* - W^*\|^2 = 0, \\ \phi(0) &= \|0 - W^*\|^2 = \|W^*\|^2 > 0, \end{aligned}$$

where the last inequality holds because $W^* \neq 0$.

Step 4, contradiction: Step 2 with $U = U^*$ says $\phi(0) \leq \phi(U^*)$, that is $\|W^*\|^2 \leq 0$, which contradicts Step 3. Written as a violated midpoint inequality:

$$\phi\big(\tfrac{1}{2}U^* + \tfrac{1}{2}(-U^*)\big) = \phi(0) > 0 = \tfrac{1}{2}\phi(U^*) + \tfrac{1}{2}\phi(-U^*).$$

Hence $\phi$ is not convex.

**In words.** The objective has two equally good minimizers, $U^*$ and $-U^*$, with a strictly worse point, the origin, exactly between them. A convex function cannot have a hill between two of its minimizers.

**Sanity check.** For $d = 1$ and $W^* = 1$ we get $\phi(u) = (u^2 - 1)^2$: $\phi(1) = 0$, $\phi(-1) = 0$, but $\phi(0) = 1$. This is the classic double well.

**What to write in the exam.**

- Symmetry: $\phi(U) = \phi(-U)$, because $(-U)(-U)^\top = UU^\top$.
- If $\phi$ were convex, the midpoint inequality at $0$ would give $\phi(0) \leq \phi(U)$ for every $U$.
- But $U^* = (W^*)^{1/2}$ gives $\phi(U^*) = 0$, while $\phi(0) = \|W^*\|^2$ is positive. Contradiction.

*Verified: for 100 random PSD $W^*$ (SciPy `sqrtm`): $\phi(U) = \phi(-U)$, $\phi(U^*)$ is numerically $0$, and the midpoint inequality at $0$ fails.*

**2. The end-to-end dynamics**

**What is asked.** Derive the differential equation of $W(t)$ given in the statement. The answer is a derivation.

**Tool and why.** Gradient flow is $\dot U = -\nabla\phi(U)$ (cheat sheet §7); the end-to-end matrix then follows from the product rule, as in the end-to-end dynamics of linear networks (cheat sheet §8). First we need $\nabla\phi$; since $\phi$ is a composition, the cleanest way is to expand $\phi(U+H)$ and keep the terms that are linear in $H$.

**Definitions.** $E := W - W^*$ is the residual. It is symmetric, because both $W = UU^\top$ and $W^*$ are. The inner product is $\langle X, Y\rangle = \mathrm{Tr}(XY^\top)$, and $\|X\|^2 = \langle X, X\rangle$. A dot means $\frac{d}{dt}$, and we drop the argument $t$.

**Solution.**

Step 1, expand around $U$ in a direction $H$:

$$(U+H)(U+H)^\top = UU^\top + HU^\top + UH^\top + HH^\top,$$

so $\phi(U+H)$ is the squared norm of $E + \Delta$ with $\Delta := HU^\top + UH^\top + HH^\top$.

Step 2, the linear part: expanding the square,

$$\|E + \Delta\|^2 = \|E\|^2 + 2\langle E, \Delta\rangle + \|\Delta\|^2.$$

The term $\|\Delta\|^2$ and the piece $HH^\top$ are quadratic in $H$, so the part linear in $H$ is

$$2\langle E, HU^\top\rangle + 2\langle E, UH^\top\rangle.$$

Step 3, each term is an inner product with $H$: by the trace identities,

$$\begin{aligned} \langle E, HU^\top\rangle &= \mathrm{Tr}(EUH^\top) \\ &= \langle EU, H\rangle, \\ \langle E, UH^\top\rangle &= \mathrm{Tr}(EHU^\top) \\ &= \mathrm{Tr}(HU^\top E) \\ &= \langle H, E^\top U\rangle. \end{aligned}$$

Step 4, the gradient: $E$ is symmetric, so $E^\top U = EU$ and the linear part is $4\langle EU, H\rangle$. Hence

$$\nabla\phi(U) = 4(W - W^*)U.$$

Step 5, gradient flow: $\dot U = -4(W - W^*)U$.

Step 6, the product rule for $W = UU^\top$:

$$\begin{aligned} \dot W &= \dot U U^\top + U \dot U^\top \\ &= -4(W - W^*)UU^\top - 4UU^\top(W - W^*)^\top \\ &= -4(W - W^*)W - 4W(W - W^*) \\ &= -2\big[2(W - W^*)W + 2W(W - W^*)\big]. \end{aligned}$$

The second row substitutes Step 5 and its transpose; the third uses $UU^\top = W$ and the symmetry of $W - W^*$; the fourth factors out $-2$.

**In words.** Since $\nabla L(W) = 2(W - W^*)$, the result reads

$$\dot W = -2\big[\nabla L(W)\, W + W\, \nabla L(W)\big]:$$

So the end-to-end matrix moves against the gradient of $L$, but pre-multiplied and post-multiplied by $W$ itself. Directions in which $W$ is small move slowly; this is what part 3 makes precise.

**Sanity check.** For $d = 1$: $\phi(u) = (u^2 - w^*)^2$, so $\phi'(u) = 4(u^2 - w^*)u$, as Step 4 says. With $w = u^2$,

$$\dot w = 2u\dot u = -8u^2(u^2 - w^*) = -8w(w - w^*),$$

and the formula gives $-2[2(w - w^*)w + 2w(w - w^*)]$, which is the same. Also $\dot W = 0$ at $W = W^*$, as it should.

**What to write in the exam.**

- Gradient: the part of $\phi(U+H)$ linear in $H$ is $4\langle (W - W^*)U, H\rangle$, using the symmetry of $W$ and $W^*$; so $\nabla\phi(U) = 4(W - W^*)U$.
- Gradient flow: $\dot U = -4(W - W^*)U$.
- Product rule: $\dot W = \dot U U^\top + U \dot U^\top$; substitute and use $UU^\top = W$ and symmetry to get the claimed formula.

*Verified: on 50 random instances, central finite differences match $\nabla\phi(U) = 4(W - W^*)U$ and the formula for $\dot W$ to within $10^{-5}$ (NumPy).*

**3. The eigenvalue dynamics**

**What is asked.** Prove the formula for $\frac{d}{dt}\Lambda(t)_{r,r}$. The answer is a derivation.

**Tool and why.** Write the eigenvalue as a quadratic form, $\lambda_r = v_r^\top W v_r$, and differentiate (cheat sheet §8, eigenvalue dynamics of matrix factorization). The derivative $\dot v_r$ is unknown, but its terms cancel because $v_r$ has unit norm. The trace identities of the reminder (cheat sheet §3) turn the result into the requested inner product.

**Definitions.** $\lambda_r := \Lambda_{r,r}$, and $v_r$ is the $r$-th column of $V$. From $W = V\Lambda V^\top$ and $V^\top V = I$ we get $WV = V\Lambda$, whose $r$-th column is $Wv_r = \lambda_r v_r$; and $v_r^\top v_r = 1$. As in part 2, $E := W - W^*$, a dot means $\frac{d}{dt}$, and we drop $t$.

**Solution.**

Step 1, the eigenvalue as a quadratic form: multiply $Wv_r = \lambda_r v_r$ on the left by $v_r^\top$ and use $v_r^\top v_r = 1$:

$$\lambda_r = v_r^\top W v_r.$$

Step 2, differentiate with the product rule (three factors):

$$\dot\lambda_r = \dot v_r^\top W v_r + v_r^\top \dot W v_r + v_r^\top W \dot v_r.$$

Step 3, the outer terms vanish: $Wv_r = \lambda_r v_r$, and by symmetry of $W$ also $v_r^\top W = \lambda_r v_r^\top$. So the first and third terms are both $\lambda_r v_r^\top \dot v_r$, and

$$\dot v_r^\top W v_r + v_r^\top W \dot v_r = 2\lambda_r\, v_r^\top \dot v_r.$$

Differentiating $v_r^\top v_r = 1$ gives $2 v_r^\top \dot v_r = 0$. Hence $\dot\lambda_r = v_r^\top \dot W v_r$.

Step 4, substitute part 2, using $Wv_r = \lambda_r v_r$ in the first term and $v_r^\top W = \lambda_r v_r^\top$ in the second:

$$\begin{aligned} v_r^\top \dot W v_r &= -4\big[v_r^\top E W v_r + v_r^\top W E v_r\big] \\ &= -4\big[\lambda_r v_r^\top E v_r + \lambda_r v_r^\top E v_r\big] \\ &= -8\lambda_r\, v_r^\top E v_r. \end{aligned}$$

Step 5, the quadratic form as an inner product:

$$\begin{aligned} v_r^\top E v_r &= \mathrm{Tr}(v_r^\top E v_r) \\ &= \mathrm{Tr}(E v_r v_r^\top) \\ &= \langle E, v_r v_r^\top\rangle. \end{aligned}$$

The first row holds because a scalar is its own trace; the second is the cyclic rule $\mathrm{Tr}(ABC) = \mathrm{Tr}(CAB)$, applied twice; the third uses $\langle A, B\rangle = \mathrm{Tr}(AB^\top)$ with $(v_r v_r^\top)^\top = v_r v_r^\top$.

Step 6, combine Steps 3 to 5 and move the factor $-2$ into the inner product:

$$\frac{d}{dt}\Lambda_{r,r} = -8\lambda_r\langle E, v_r v_r^\top\rangle = 4\lambda_r\big\langle -2(W - W^*),\, v_r v_r^\top\big\rangle.$$

**In words.** $-2(W - W^*)$ is $-\nabla L(W)$, the direction that decreases the loss. Its component along $v_r v_r^\top$ says whether the $r$-th eigenvalue should grow or shrink, and the speed is multiplied by $\lambda_r$ itself: an eigenvalue at $0$ stays at $0$.

**Sanity check.** For $d = 1$: $v = \pm 1$ and $\lambda = w$, so the formula gives $4w \cdot (-2)(w - w^*) = -8w(w - w^*)$, exactly the $\dot w$ of the sanity check of part 2.

**What to write in the exam.**

- Write $\lambda_r = v_r^\top W v_r$, from $Wv_r = \lambda_r v_r$ and $v_r^\top v_r = 1$.
- Differentiate: the two terms with $\dot v_r$ sum to $2\lambda_r v_r^\top \dot v_r$, which is $0$ because $v_r^\top v_r = 1$.
- So $\dot\lambda_r = v_r^\top \dot W v_r$; plug in part 2 and use $Wv_r = \lambda_r v_r$ to get $-8\lambda_r v_r^\top (W - W^*) v_r$.
- The trace identities turn $v_r^\top E v_r$ into $\langle E, v_r v_r^\top\rangle$.

*Verified: on 50 random instances, finite differences of the eigenvalues of $W + h\dot W$ match the formula to relative accuracy $10^{-4}$ (NumPy).*

**4. Why a near-zero initialization gives approximately low rank**

**What is asked.** Explain, qualitatively, why gradient flow from near the origin ends at an end-to-end matrix of approximately low rank. The answer is an argument, not a proof.

**Tool and why.** The eigenvalue equation of part 3 (cheat sheet §8) and the implicit-regularization picture (cheat sheet §12). The key feature is that the growth rate of $\lambda_r$ is proportional to $\lambda_r$: multiplicative dynamics, which learn one direction at a time.

**Definitions.** $g_r(t) := \langle -2(W(t) - W^*), v_r(t) v_r(t)^\top\rangle$ measures how strongly the loss pushes the $r$-th eigenvalue up. Let $\alpha$ be the scale of the initialization: $U_0$ has entries of order $\alpha$, so every $\lambda_r(0)$ is of order $\alpha^2$ and tiny.

**Solution.**

Step 1, closed form: part 3 reads $\dot\lambda_r = 4 g_r \lambda_r$, a linear scalar equation, so

$$\lambda_r(t) = \lambda_r(0)\exp\Big(4\int_0^t g_r(s)\,ds\Big).$$

An eigenvalue changes only by a multiplicative factor. It never changes sign, and it can only become large through a long stretch of positive $g_r$.

Step 2, the early phase: at first $W$ is almost $0$, so $g_r$ is close to $2 v_r^\top W^* v_r$. Eigenvalues whose directions align with large eigenvalues of $W^*$ grow exponentially, at a rate proportional to that alignment. Starting from order $\alpha^2$, an eigenvalue needs time of order $\ln(1/\alpha)$ divided by its rate to become of order $1$. So the strongest direction is learned first, the next one later, and the gap in time grows as $\alpha$ shrinks.

Step 3, saturation: once $\lambda_r$ matches the target in its direction, the residual $W - W^*$ in that direction vanishes, $g_r$ drops to about $0$, and $\lambda_r$ stops. Directions where $W^*$ is zero or tiny have $g_r$ zero, tiny or negative, so their eigenvalues stay of order $\alpha^2$ for a very long time.

Step 4, conclusion: at every time, $W$ is the sum of the few components learned so far plus a remainder of order $\alpha^2$. If $L$ can be made small by an approximately low-rank matrix, then gradient flow reaches small loss after learning only those few components, while all other eigenvalues are still tiny. The end-to-end matrix is therefore approximately low rank: incremental, greedy low-rank learning.

Step 5, a numerical illustration: $d = 5$, $W^*$ with eigenvalues $1, 0.25, 0.01, 0, 0$ in a random orthonormal basis, and $U_0$ with entries $10^{-3}$ times standard normal (so every $\lambda_r(0)$ is below $1.5 \cdot 10^{-5}$). We record the time at which each eigenvalue reaches half of its target:

| target eigenvalue | time to reach half of it |
|---|---|
| $1$ | $1.6$ |
| $0.25$ | $5.4$ |
| $0.01$ | $109$ |

At $t = 10$ the eigenvalues of $W$ are about $1$, $0.25$, $4 \cdot 10^{-6}$, $3.6 \cdot 10^{-6}$, $4 \cdot 10^{-7}$: numerically rank $2$.

**In words.** The rich get richer: a direction that is already large moves fast, a direction that is still tiny barely moves. Starting from almost nothing, the flow therefore adds rank one at a time, in order of importance, and stops adding once the loss is small.

**Sanity check.** Compare with gradient flow directly on $W$, without factorization: then $\dot W = -2(W - W^*)$, every direction moves at the same rate regardless of its size, and there is no low-rank bias. The factor $\lambda_r$ in part 3, which comes from the factorization, is what creates the bias. Likewise, with a large initialization all $\lambda_r(0)$ are of order $1$ and all directions move together.

**What to write in the exam.**

- Part 3 gives $\dot\lambda_r = 4 g_r \lambda_r$, so $\lambda_r(t) = \lambda_r(0) e^{4\int_0^t g_r}$: growth is multiplicative.
- Near-zero initialization: all eigenvalues start tiny; those aligned with strong target directions grow exponentially first, the others wait.
- A fitted direction has $g_r$ near $0$ and stops; unneeded directions stay near $0$.
- Hence when the loss is small only a few eigenvalues are large: approximately low rank (incremental learning).

*Verified: an Euler simulation of the gradient flow (step sizes $5 \cdot 10^{-4}$ and $2 \cdot 10^{-3}$ agree) gives the half-times and the spectrum at $t = 10$ quoted above (NumPy).*

**Common mistakes.**

- In part 1, taking $U^* = W^*$ instead of the square root: then $U^* U^{*\top}$ is $(W^*)^2$, not $W^*$, and $\phi(U^*)$ need not be $0$.
- In part 2, keeping only one of the two linear terms of the expansion: this gives the factor $2$ instead of $4$ in $\nabla\phi$.
- In part 3, assuming $\dot v_r = 0$ instead of showing that its terms cancel; or forgetting that $v_r^\top W = \lambda_r v_r^\top$ needs the symmetry of $W$.

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

**1. The size of $\mathcal{H}$**

**What is asked.** Prove the bound $|\mathcal{H}| \leq B^{d^2}$. The answer is a counting proof.

**Tool and why.** Counting a quantized class (cheat sheet §10): hypotheses are images of parameter assignments, so there are at most as many hypotheses as assignments. This is the right tool because each hypothesis is fixed by its parameter matrix, and the matrix has finitely many possible values.

**Definitions.** $\mathcal{W} := \{1, \dots, B\}^{d \times d}$ is the set of allowed parameter matrices, and $\Psi: \mathcal{W} \to \mathcal{H}$ maps a matrix $W$ to the network $h_W$ with that parameter matrix. We introduce $\Psi$ to compare the two sets.

**Solution.**

Step 1, count the matrices: a matrix in $\mathcal{W}$ has $d^2$ entries, and each entry is chosen independently among $B$ values. By the product rule of counting, $|\mathcal{W}| = B^{d^2}$.

Step 2, $\Psi$ is onto: every $h \in \mathcal{H}$ has a parameter matrix $W_h \in \mathcal{W}$, and $\Psi(W_h) = h$.

Step 3, an onto map cannot increase the size: for each $h$ choose one matrix $W_h$ with $\Psi(W_h) = h$. Distinct hypotheses get distinct chosen matrices, because applying $\Psi$ recovers the hypothesis. So $h \mapsto W_h$ is one-to-one from $\mathcal{H}$ into $\mathcal{W}$, and

$$\boxed{|\mathcal{H}| \leq |\mathcal{W}| = B^{d^2}}$$

**In words.** There may be fewer hypotheses than matrices, because different matrices can compute the same function, but never more.

**Sanity check.** For $d = 2$ and $B = 2$ there are $2^4 = 16$ matrices. If $\Psi$ is one-to-one the bound is tight.

**What to write in the exam.**

- Each $h$ is determined by $W_h$, which has $d^2$ entries with at most $B$ values each.
- So there are at most $B^{d^2}$ parameter matrices, and the map from matrices onto $\mathcal{H}$ is surjective.
- Hence $|\mathcal{H}| \leq B^{d^2}$.

*Verified: enumerating all matrices for $(d, B)$ equal to $(2, 2)$, $(2, 3)$, $(3, 2)$ gives $16$, $81$, $512$ matrices, which is $B^{d^2}$ in each case.*

**2. The uniform-convergence bound $\Delta_1$**

**What is asked.** An explicit $\Delta_1(N, \delta, |\mathcal{H}|)$ that tends to $0$ as $N$ grows and bounds the gap of every hypothesis simultaneously with probability at least $1 - \delta$. Only Hoeffding may be used. The answer is a formula with its derivation.

**Tool and why.** Hoeffding for one fixed hypothesis, then a union bound over the finite class (cheat sheet §2 and §10). Hoeffding controls a single hypothesis that does not depend on the sample; the union bound makes the statement hold for all hypotheses at once, which is what "uniform" means; and part 1 says the class is finite.

**Definitions.** For a fixed $h$ let $A_n := l(h(x_n), y_n)$ for $n \in [N]$, the losses of $h$ on the sample. For $\epsilon > 0$ let

$$F_h(\epsilon) := \big\{|L_S(h) - L_D(h)| \geq \epsilon\big\}$$

be the bad event for $h$: its empirical and population losses are far apart.

**Solution.**

Step 1, the conditions of Hoeffding: the pairs $(x_n, y_n)$ are i.i.d. and $h$ is fixed in advance, so $A_1, \dots, A_N$ are i.i.d. They lie in $[0,1]$ because $l$ takes values in $[0,1]$. Their mean is $E[A_1] = L_D(h)$ by the definition of $L_D$, and their average is $\frac1N \sum_n A_n = L_S(h)$ by the definition of $L_S$.

Step 2, Hoeffding for one hypothesis:

$$P\big(F_h(\epsilon)\big) \leq 2e^{-2N\epsilon^2}.$$

Step 3, union bound over the class: the probability that some hypothesis is bad is at most the sum of the individual probabilities,

$$P\Big(\bigcup_{h \in \mathcal{H}} F_h(\epsilon)\Big) \leq \sum_{h \in \mathcal{H}} 2e^{-2N\epsilon^2} = 2|\mathcal{H}|e^{-2N\epsilon^2}.$$

Step 4, choose $\epsilon$: set the right-hand side equal to $\delta$ and solve, taking logarithms:

$$\begin{aligned} 2|\mathcal{H}|e^{-2N\epsilon^2} &= \delta \\ \ln(2|\mathcal{H}|) - 2N\epsilon^2 &= \ln\delta \\ \epsilon^2 &= \frac{\ln(2|\mathcal{H}|/\delta)}{2N}. \end{aligned}$$

Step 5, conclusion: with this $\epsilon$, with probability at least $1 - \delta$ no hypothesis is bad, so every $h$ satisfies $|L_S(h) - L_D(h)| < \epsilon$, and in particular $L_D(h) - L_S(h) < \epsilon$. Therefore

$$\boxed{\Delta_1(N, \delta, |\mathcal{H}|) = \sqrt{\frac{\ln(2|\mathcal{H}|/\delta)}{2N}}}$$

It depends on the class only through $|\mathcal{H}|$, as required.

Step 6, the limit: for fixed $\delta$ and $|\mathcal{H}|$ the numerator is a constant and the denominator grows, so $\Delta_1 \to 0$ as $N \to \infty$.

**In words.** The price of a guarantee for all hypotheses at once is only the term $\ln|\mathcal{H}|$, which with part 1 is at most $d^2 \ln B$: roughly the number of bits needed to describe a hypothesis.

**Sanity check.** With $|\mathcal{H}| = 1$ the bound becomes $\sqrt{\ln(2/\delta)/(2N)}$, plain Hoeffding. Numerically, for $|\mathcal{H}| = 50$, $N = 200$ and $\delta = 0.1$ we get $\Delta_1 \approx 0.1314$; a simulation of 50 hypotheses with Bernoulli losses fails in a fraction $0.0014$ of $20000$ samples, well below $\delta$.

**What to write in the exam.**

- Fix $h$; the losses $l(h(x_n), y_n)$ are i.i.d. in $[0,1]$ with mean $L_D(h)$ and average $L_S(h)$.
- Hoeffding bounds the probability of $|L_S(h) - L_D(h)| \geq \epsilon$ by $2e^{-2N\epsilon^2}$.
- Union bound over $\mathcal{H}$: failure probability at most $2|\mathcal{H}|e^{-2N\epsilon^2}$; set it to $\delta$ and solve for $\epsilon$.
- Result: $\Delta_1 = \sqrt{\ln(2|\mathcal{H}|/\delta)/(2N)}$, which tends to $0$.

*Verified: the closed form solves the equation of Step 4 exactly (Python); a Monte-Carlo run with 50 hypotheses, $N = 200$, $\delta = 0.1$ and $20000$ samples gives failure frequency $0.0014$.*

**3. A bound $\Delta_2$ that prefers low rank**

**What is asked.** A formula $\Delta_2(N, \delta, i)$ that tends to $0$, holds for all ranks and all hypotheses of that rank with probability at least $1 - \delta$, and is strictly increasing in $i$. The answer is a formula with its proof.

**Tool and why.** Structural risk minimization, that is, a weighted union bound (cheat sheet §2): give each sub-class $\mathcal{H}_i$ its own confidence $\delta_i$ with total at most $\delta$. Choosing $\delta_i$ decreasing in $i$ makes $\ln(1/\delta_i)$ grow with $i$, which is what makes the bound prefer low rank.

**Definitions.** The confidence of rank level $i$ is $\delta_i := \delta \cdot 2^{-(i+1)}$, for $i$ from $0$ to $d$. The proposed bound is

$$\Delta_2(N, \delta, i) := \sqrt{\frac{\ln\big(2 \cdot 2^{i+1} B^{d^2} / \delta\big)}{2N}},$$

which is the formula of part 2 with $|\mathcal{H}|$ replaced by $B^{d^2}$ and $\delta$ replaced by $\delta_i$. Let $G_i$ be the event that every $h \in \mathcal{H}_i$ satisfies $L_D(h) - L_S(h) \leq \Delta_2(N, \delta, i)$.

**Solution.**

Step 1, each sub-class is finite and not larger than the whole class: $\mathcal{H}_i \subseteq \mathcal{H}$, so by part 1

$$|\mathcal{H}_i| \leq |\mathcal{H}| \leq B^{d^2}.$$

Step 2, each level holds with probability at least $1 - \delta_i$: apply part 2 to the finite class $\mathcal{H}_i$ with confidence $\delta_i$. With probability at least $1 - \delta_i$, every $h \in \mathcal{H}_i$ satisfies

$$\begin{aligned} L_D(h) - L_S(h) &\leq \sqrt{\frac{\ln(2|\mathcal{H}_i|/\delta_i)}{2N}} \\ &\leq \sqrt{\frac{\ln(2B^{d^2}/\delta_i)}{2N}} \\ &= \Delta_2(N, \delta, i). \end{aligned}$$

The second row uses Step 1 and the fact that the logarithm and the square root are increasing; the third row substitutes $\delta_i$, since $2B^{d^2}/\delta_i$ equals $2 \cdot 2^{i+1} B^{d^2}/\delta$. If $\mathcal{H}_i$ is empty the event $G_i$ holds trivially. So the probability that $G_i$ fails is at most $\delta_i$.

Step 3, condition (b), a union bound over the levels:

$$\begin{aligned} P\Big(\bigcup_{i=0}^{d} G_i^c\Big) &\leq \sum_{i=0}^{d} \delta\, 2^{-(i+1)} \\ &= \delta\big(1 - 2^{-(d+1)}\big) \\ &< \delta. \end{aligned}$$

So with probability at least $1 - \delta$ all the events $G_0, \dots, G_d$ hold together, which is condition (b).

Step 4, condition (a): for fixed $i$, $\delta$, $B$, $d$ the numerator is a constant and the denominator grows, so $\Delta_2 \to 0$ as $N \to \infty$.

Step 5, condition (c): split the logarithm,

$$\Delta_2(N, \delta, i) = \sqrt{\frac{\ln\big(2B^{d^2}/\delta\big) + (i+1)\ln 2}{2N}}.$$

The numerator grows by $\ln 2$, a positive amount, each time $i$ grows by $1$, and the square root is strictly increasing, so

$$\Delta_2(N, \delta, 0) < \Delta_2(N, \delta, 1) < \cdots < \Delta_2(N, \delta, d).$$

For example, with $N = 100$, $\delta = 0.05$, $B = 3$, $d = 4$:

| $i$ | $\Delta_2(N, \delta, i)$ |
|---|---|
| $0$ | $0.3314$ |
| $1$ | $0.3365$ |
| $2$ | $0.3417$ |
| $3$ | $0.3467$ |
| $4$ | $0.3517$ |

**In words.** Each rank level is paid for from a separate slice of the confidence budget; the slices shrink as the rank grows, so a hypothesis of low rank pays less. The price of this preference is only the term $(i+1)\ln 2$.

**Sanity check.** All entries are at least $1$, so $W_h$ is never the zero matrix and $\mathcal{H}_0$ is empty; condition (b) at $i = 0$ is then vacuous, which is consistent. Enumeration confirms that no matrix with entries in $\{1, \dots, B\}$ has rank $0$. A Monte-Carlo check with four nested classes of sizes $5$, $10$, $20$, $40$, $N = 200$ and $\delta = 0.2$ fails in a fraction $0.0003$ of $20000$ samples.

**What to write in the exam.**

- Set $\delta_i = \delta\, 2^{-(i+1)}$; then $\sum_{i=0}^{d} \delta_i < \delta$.
- Apply part 2 to $\mathcal{H}_i$ with confidence $\delta_i$, and bound $|\mathcal{H}_i|$ by $B^{d^2}$.
- This gives $\Delta_2 = \sqrt{\ln(2^{i+2} B^{d^2}/\delta)/(2N)}$; a union bound over $i$ gives (b).
- The term $(i+1)\ln 2$ makes it strictly increasing in $i$, and it tends to $0$ as $N$ grows.

*Verified: exact fractions confirm the sum of the $\delta_i$ for $d$ up to $11$; the $\Delta_2$ values above and their strict increase were computed in Python; Monte-Carlo as in the sanity check.*

**4. The index bound $\Delta_3$**

**What is asked.** First, explain why $\Delta_2$ does not reward an algorithm that returns hypotheses with small $index(h)$. Second, find a constant $c$ such that

$$\Delta_3(N, \delta, h) := \Delta_2(N, \delta, index(h)) + c\rho\epsilon$$

satisfies conditions (a), (b), (c). The answer is an explanation, the value of $c$, and a proof.

**Tool and why.** A Lipschitz transfer to a nearby hypothesis, the cover pattern that costs $2\rho\epsilon$ (cheat sheet §10), combined with the event of part 3. The implicit bias of the algorithm (cheat sheet §12) is towards hypotheses that are only close to low rank, so the bound must pay for the distance to a low-rank hypothesis instead of the true rank.

**Definitions.** For each $h \in \mathcal{H}$ choose $\bar h \in \mathcal{H}_{index(h)}$ with $|h(x) - \bar h(x)| \leq \epsilon$ for every $x$. It exists by the definition of $index$; the set inside the minimum is not empty, because $h$ itself lies in $\mathcal{H}_{rank(W_h)}$ at distance $0$. For a hypothesis $g$ write $\mathrm{gap}(g) := L_D(g) - L_S(g)$.

**Solution.**

Step 1, what goes wrong with $\Delta_2$: part 3 applies to $h$ only through the levels $i$ with $h \in \mathcal{H}_i$, so the best it gives is $\Delta_2$ at the rank of the matrix behind $h$. An algorithm with a low-rank bias returns hypotheses that are only close to low rank: a matrix close to a low-rank one is typically of full rank, so the rank of $W_h$ may be $d$ while $index(h)$ is small. Then part 3 gives only $\Delta_2(N, \delta, d)$, the largest value, and the bias of the algorithm is not rewarded.

Step 2, transfer pointwise: for every $(x, y)$, by the Lipschitz property of $l$ in its first argument and the choice of $\bar h$,

$$\begin{aligned} \big|l(h(x), y) - l(\bar h(x), y)\big| &\leq \rho\,|h(x) - \bar h(x)| \\ &\leq \rho\epsilon. \end{aligned}$$

Step 3, transfer to the averages: the absolute value of an average is at most the average of absolute values. Averaging Step 2 over $D$ and over the sample gives

$$\big|L_D(h) - L_D(\bar h)\big| \leq \rho\epsilon, \qquad \big|L_S(h) - L_S(\bar h)\big| \leq \rho\epsilon.$$

Step 4, split the gap of $h$ into three pieces and bound the outer two by Step 3:

$$\begin{aligned} \mathrm{gap}(h) &= \big[L_D(h) - L_D(\bar h)\big] + \mathrm{gap}(\bar h) + \big[L_S(\bar h) - L_S(h)\big] \\ &\leq \rho\epsilon + \mathrm{gap}(\bar h) + \rho\epsilon. \end{aligned}$$

Step 5, use the event of part 3: on that event, which has probability at least $1 - \delta$, every hypothesis of every level $\mathcal{H}_i$ satisfies its bound. Since $\bar h \in \mathcal{H}_{index(h)}$, we get $\mathrm{gap}(\bar h) \leq \Delta_2(N, \delta, index(h))$. This is legitimate even though $\bar h$ depends on $h$, which depends on the sample, because the event of part 3 covers all hypotheses simultaneously. Hence

$$L_D(h) - L_S(h) \leq \Delta_2(N, \delta, index(h)) + 2\rho\epsilon,$$

so

$$\boxed{c = 2}$$

Step 6, the three conditions. (a): $\Delta_2 \to 0$ by part 3, so $\Delta_3$ tends to $2\rho\epsilon$, which is $\mathcal{O}(\epsilon)$. (b): Step 5 holds for all $h$ at once on the single event of part 3, whose probability is at least $1 - \delta$. (c): if $index(h_1) < index(h_2)$, then by condition (c) of part 3 the first $\Delta_2$ term is strictly smaller, and the term $2\rho\epsilon$ is the same for both, so

$$\Delta_3(N, \delta, h_1) < \Delta_3(N, \delta, h_2).$$

**In words.** We charge $h$ the price of the simplest hypothesis it is close to, plus a fixed fee for the distance. The fee is paid twice, once on the population side and once on the sample side.

**Sanity check.** With $\epsilon = 0$ the hypothesis $\bar h$ computes exactly $h$, and the bound reduces to part 3 applied to the lowest-rank matrix that computes $h$. A randomized test on $20000$ instances (random $D$ on $30$ points, a random sample, and a loss $\min\{1, \rho|u - y|\}$) found no violation of $\mathrm{gap}(h) \leq \mathrm{gap}(\bar h) + 2\rho\epsilon$.

**What to write in the exam.**

- Problem: $\Delta_2$ sees only the actual rank of $W_h$, which can be $d$ even when $h$ is $\epsilon$-close to low rank; then the bound is the largest one.
- Take $\bar h \in \mathcal{H}_{index(h)}$ that is $\epsilon$-close to $h$; Lipschitz gives a loss difference of at most $\rho\epsilon$ pointwise.
- So $L_D$ and $L_S$ each move by at most $\rho\epsilon$, and the gap of $h$ is at most the gap of $\bar h$ plus $2\rho\epsilon$.
- On the event of part 3 the gap of $\bar h$ is at most $\Delta_2(N, \delta, index(h))$, so $c = 2$; (a), (b), (c) follow from part 3.

*Verified: a randomized test in NumPy on $20000$ instances of the inequality in Step 4, with no violations.*

**Common mistakes.**

- Applying Hoeffding directly to the learned hypothesis, which depends on the sample; Hoeffding needs a fixed $h$, and the union bound is what makes the learned one covered.
- In part 3, splitting $\delta$ uniformly as $\delta/(d+1)$ while bounding every $|\mathcal{H}_i|$ by the same $B^{d^2}$: the bound is then equal for all $i$ and condition (c) fails.
- In part 4, transferring only once and taking $c = 1$, or applying part 3 to $h$ itself instead of to $\bar h$.

**💡 Useful tricks:** Finite class ⇒ Hoeffding per-hypothesis then union bound; "prefers low-rank/low-index" cues SRM — split the budget as $\delta_i=\delta\,2^{-(i+1)}$ (summable ⇒ still valid, and the $2^{i+1}$ makes it strictly increasing in $i$); "returned hypotheses are *close* to low-rank" cues a Lipschitz transfer $|L(h)-L(\bar h)|\leq\rho\epsilon$ to the nearest cover member.

**⚠️ Watch out:** Hoeffding needs $h$ FIXED before seeing $S$ — never apply it to the learned $\hat h$; union over ALL of $\mathcal H$; the SRM split must both sum to $\leq\delta$ AND increase in $i$; in (4) the whole point is $index(h)\ll\mathrm{rank}(W_h)$, and $c=2$ because you transfer twice (on $L_D$ and $L_S$).
