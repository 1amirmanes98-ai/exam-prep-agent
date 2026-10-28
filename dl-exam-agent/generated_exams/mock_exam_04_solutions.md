# Mock Exam 4 — solutions & grading rubric

**⚠️ Spoilers. Attempt `mock_exam_04.md` first.** Tutor: grade against this rubric;
verified numerically on 2026-07-06 (Q1: matrix-power identities and least-squares
realizability fits — misfit of the all-ones sequence by the anti-symmetric class
$\ge 1$ uniformly in $\omega$; Q2 flow on the part-4 dataset: $v^2 - \|w\|^2$ drift
$\sim 5\text{e-}6$ at Euler step $10^{-5}$, loss plateaus at exactly $0.5$;
Q3: Gaussian-KL Monte-Carlo agrees with $\|w\|^2/(2\sigma^2)$ to $10^{-3}$).

## Q1 — Linear RNNs: scalar state and anti-symmetric transitions (40)

**Full solution:**

**1. (10) Closed form, uniqueness and non-universality**

**What is asked.** Three things: prove by induction that a linear RNN computes $h(x) = \sum_t a_t x_t$ with $a_t = C^\top A^{L-t} B$; prove that no other coefficient sequence describes the same $h$; and exhibit one continuous $f$ that lies outside $\mathcal{H}_d$ for every $d$. The answer is three short proofs and an explicit $f$.

**Tool and why.** The recursion is first order in $t$, so induction on $t$ unrolls it. Uniqueness follows by plugging in the unit inputs. Non-universality is shown by a single witness (cheat sheet §4), and linearity is the property every hypothesis has and a product of coordinates lacks.

**Definitions.** For weights $A, B, C$ let

$$a_t := C^\top A^{L-t} B, \qquad t \in [L].$$

We introduce these numbers because they will turn out to be the coefficients of $h$. Let $e_t \in \mathbb{R}^L$ be the input with $1$ in position $t$ and $0$ elsewhere; it isolates one coefficient. The witness is $f(x) := x_1 x_2$, a product of two coordinates.

**Solution.**

Step 1, the claim to prove: for every $t \in \{0, \dots, L\}$ and every input $x$,

$$s_t(x) = \sum_{\tau=1}^{t} A^{t-\tau} B\, x_\tau .$$

For $t = 0$ the sum is empty and equals $0$. We prove the claim by induction on $t$, from $0$ upwards.

**Base.** For $t = 0$: $s_0(x) = 0$ by definition, and the empty sum is $0$.

**Hypothesis.** For some $t \in [L]$ the claim holds at $t-1$.

**Step.** Using the recursion and then the hypothesis on $s_{t-1}$ (the only place it is used):

$$\begin{aligned}
s_t(x) &= A\, s_{t-1}(x) + B\, x_t \\
&= A \sum_{\tau=1}^{t-1} A^{t-1-\tau} B\, x_\tau + B\, x_t \\
&= \sum_{\tau=1}^{t-1} A^{t-\tau} B\, x_\tau + A^{0} B\, x_t \\
&= \sum_{\tau=1}^{t} A^{t-\tau} B\, x_\tau .
\end{aligned}$$

The third row multiplies $A$ into each term, and uses $A^0 := I_d$ for the new term.

Step 2, the output: apply $C^\top$ to the claim at $t = L$.

$$h(x) = C^\top s_L(x) = \sum_{t=1}^{L} C^\top A^{L-t} B\, x_t = \sum_{t=1}^{L} a_t x_t .$$

So $h$ realizes $a$, and in particular $h$ is a linear function of $x$.

Step 3, uniqueness: suppose $h$ also realizes some $a'$. Plug in $x = e_t$. Every term but the $t$-th vanishes, so $h(e_t) = a_t$ and also $h(e_t) = a'_t$. Hence $a'_t = a_t$ for every $t$.

Step 4, the witness is continuous: $f(x) = x_1 x_2$ is a polynomial. Both coordinates exist since $L \ge 3$.

Step 5, the witness is not a hypothesis: suppose $f \in \mathcal{H}_d$ for some $d$. By Step 2, $f(x) = \sum_t c_t x_t$ for some coefficients $c$. Evaluate at three inputs:

$$\begin{aligned}
c_1 &= f(e_1) = 1 \cdot 0 = 0, \\
c_2 &= f(e_2) = 0 \cdot 1 = 0, \\
c_1 + c_2 &= f(e_1 + e_2) = 1 \cdot 1 = 1 .
\end{aligned}$$

The first two rows give $c_1 + c_2 = 0$, contradicting the third. Since $d$ was arbitrary, $f \notin \mathcal{H}_d$ for every $d \in \mathbb{N}$.

**In words.** A linear RNN has no non-linearity anywhere: the state is a weighted sum of the inputs, and so is the output. A weighted sum is additive, while a product of two inputs is not.

**Sanity check.** Take $d = 1$, $L = 3$ and all three weights equal to $1$. The formula gives $a = (1, 1, 1)$, so $h(x) = x_1 + x_2 + x_3$. Running the recursion by hand on $x = (2, 0, 5)$ gives states $2, 2, 7$ and output $7$, which equals $2 + 0 + 5$.

**What to write in the exam.**

- Induction on $t$: $s_t = \sum_{\tau \le t} A^{t-\tau} B x_\tau$, base $t = 0$, step via the recursion (4 pts).
- Hence $h(x) = \sum_t a_t x_t$ with $a_t = C^\top A^{L-t} B$.
- Uniqueness: $h(e_t) = a_t$ (2 pts).
- Witness $f = x_1 x_2$: linearity would force $f(e_1 + e_2)$ to equal $f(e_1) + f(e_2)$, which is $0$, but it is $1$; this holds for every $d$ (4 pts).

*Verified: for 300 random $(d, L, A, B, C, x)$ the recursion matches $\sum_t a_t x_t$ and $h(e_t) = a_t$ to $10^{-12}$; the best linear least-squares fit of $x_1 x_2$ on Gaussian inputs has mean squared error $1.01$, not $0$ (NumPy).*

**2. (9) The scalar-state class is the backwards-geometric sequences**

**What is asked.** Prove that $\mathcal{S}_1$ is exactly the set of sequences of the form $p\,\lambda^{L-t}$, in both directions, and see that the degenerate patterns are included. The answer is a two-direction proof.

**Tool and why.** Part 1 gives the coefficients of every hypothesis. With $d = 1$ all weights are numbers, so $A^{L-t}$ is an ordinary power (cheat sheet §3, matrix powers). For the reverse direction we pick weights that realize a given $(p, \lambda)$.

**Definitions.** With $d = 1$ write the weights as numbers $A = \lambda$, $B = b$, $C = c$. Let $G$ denote the right-hand set of the claim, the set of all sequences $p\,\lambda^{L-t}$ with $p, \lambda \in \mathbb{R}$.

**Solution.**

Step 1, $\mathcal{S}_1 \subseteq G$: take any $h \in \mathcal{H}_1$. By part 1 its sequence is

$$a_t = c\, \lambda^{L-t}\, b = (cb)\, \lambda^{L-t} .$$

Numbers commute, which moves $b$ next to $c$. With $p := cb$ this is in $G$. The convention $\lambda^0 := 1$ is what gives $a_L = cb$ also when $\lambda = 0$.

Step 2, $G \subseteq \mathcal{S}_1$: given $p, \lambda$, choose $A = \lambda$, $B = 1$, $C = p$. By part 1,

$$a_t = p \cdot \lambda^{L-t} \cdot 1 = p\, \lambda^{L-t} .$$

So every sequence of $G$ is realized by some $h \in \mathcal{H}_1$.

Step 3, the degenerate patterns: they need no separate argument, since Steps 1 and 2 hold for all real $p, \lambda$. Concretely, $p = 0$ gives the zero sequence; $\lambda = 0$ gives $(0, \dots, 0, p)$ because $0^{L-t} = 0$ for $t < L$ and $0^0 = 1$; and $\lambda < 0$ gives alternating signs.

**In words.** A one-dimensional state is multiplied by the same number $\lambda$ at every step. An input that entered $L-t$ steps before the end was multiplied $L-t$ times, so its weight is $\lambda^{L-t}$ times a fixed factor.

**Sanity check.** With $L = 3$, $p = 1$, $\lambda = 2$ the formula gives $a = (4, 2, 1)$: the sequence is geometric when read backwards from $a_3 = 1$. With $L = 4$, $p = 3$, $\lambda = 0$ it gives $(0, 0, 0, 3)$. Both agree with running the recursion.

**What to write in the exam.**

- Inclusion one way: $a_t = c\lambda^{L-t} b$, which is $(cb)\lambda^{L-t}$, so $p := cb$ (4 pts).
- Inclusion the other way: weights $A = \lambda$, $B = 1$, $C = p$ realize $p\lambda^{L-t}$ (4 pts).
- Remark: $p = 0$, $\lambda = 0$ (with $\lambda^0 = 1$) and $\lambda < 0$ are all covered (1 pt).

*Verified: for 200 random $(L, \lambda, b, c)$, a fifth of them with $\lambda = 0$, the coefficients of the recursion equal $cb\,\lambda^{L-t}$ to $10^{-14}$; the two examples above were reproduced exactly (NumPy).*

**3. (9) Strict inclusion of $\mathcal{H}_1$ in $\mathcal{H}_2$**

**What is asked.** Two claims: $\mathcal{S}_1 \subseteq \mathcal{S}_2$, and one sequence in $\mathcal{S}_2$ that is not in $\mathcal{S}_1$. The answer is a proof with an explicit witness.

**Tool and why.** The inclusion is zero padding: an unused extra state coordinate changes nothing (cheat sheet §4). For strictness we need a property that every sequence in $\mathcal{S}_1$ has; by part 2 they are geometric, and a geometric sequence satisfies the three-term identity of the hint (cheat sheet §3, geometric-sequence trick). A sum of two geometric sequences with different ratios breaks it.

**Definitions.** Given scalar weights $(\lambda, b, c)$, the padded weights are

$$A' := \begin{pmatrix} \lambda & 0 \\ 0 & 0 \end{pmatrix}, \qquad B' := \begin{pmatrix} b \\ 0 \end{pmatrix}, \qquad C' := \begin{pmatrix} c \\ 0 \end{pmatrix}.$$

The witness is the sequence $a_t := 1 + 2^{L-t}$, a sum of two backwards-geometric sequences with ratios $1$ and $2$.

**Solution.**

Step 1, inclusion: $A'$ is diagonal, so $A'^k$ is diagonal with entries $\lambda^k$ and $0^k$. The second coordinate has $0$ in both $B'$ and $C'$, so it contributes nothing:

$$C'^\top A'^{k} B' = c\, \lambda^k\, b + 0 \cdot 0^k \cdot 0 = c\, \lambda^k\, b .$$

With $k = L-t$ the padded network has the same coefficients as the scalar one. By part 1 it computes the same function, so $\mathcal{H}_1 \subseteq \mathcal{H}_2$.

Step 2, the identity: let $a \in \mathcal{S}_1$, so $a_t = p\,\lambda^{L-t}$ by part 2. For $t \in \{2, \dots, L-1\}$ both neighbours exist, and adding the exponents gives

$$\begin{aligned}
a_{t+1}\, a_{t-1} &= p\,\lambda^{L-t-1} \cdot p\,\lambda^{L-t+1} \\
&= p^2\, \lambda^{2(L-t)} \\
&= a_t^2 .
\end{aligned}$$

All exponents are non-negative here, so this also holds when $p = 0$ or $\lambda = 0$.

Step 3, the witness is in $\mathcal{S}_2$: take $A = \mathrm{diag}(1, 2)$, $B = (1, 1)^\top$ and $C = (1, 1)^\top$. Then $A^{L-t} = \mathrm{diag}(1, 2^{L-t})$, so

$$C^\top A^{L-t} B = 1 \cdot 1^{L-t} + 1 \cdot 2^{L-t} = 1 + 2^{L-t} .$$

Step 4, the witness violates the identity: use $t = L-1$, which lies in $\{2, \dots, L-1\}$ because $L \ge 3$. The three entries involved are

| entry | value |
|---|---|
| $a_L$ | $1 + 2^0 = 2$ |
| $a_{L-1}$ | $1 + 2^1 = 3$ |
| $a_{L-2}$ | $1 + 2^2 = 5$ |

so

$$a_L\, a_{L-2} = 10 \ne 9 = a_{L-1}^2 .$$

Step 5, conclusion: by Step 2 the witness is not in $\mathcal{S}_1$, and by Step 3 it is in $\mathcal{S}_2$. Together with Step 1, $\mathcal{S}_1 \subsetneq \mathcal{S}_2$, which means $\mathcal{H}_1 \subsetneq \mathcal{H}_2$.

**In words.** One state coordinate can remember the past with one decay rate. Two coordinates can mix two decay rates, and a mixture of two rates is no longer a single geometric sequence.

**Sanity check.** Other witnesses work the same way. The Jordan block $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ with $B = (0, 1)^\top$ and $C = (1, 0)^\top$ gives the arithmetic sequence $a_t = L - t$; for $L = 5$ it is $(4, 3, 2, 1, 0)$, and $a_5 a_3 = 0$ while $a_4^2 = 1$.

**What to write in the exam.**

- Zero padding: $C'^\top A'^k B' = c\lambda^k b$, so $\mathcal{H}_1 \subseteq \mathcal{H}_2$ (2 pts).
- Identity for $t \in \{2, \dots, L-1\}$: $a_{t+1}a_{t-1} = a_t^2$, by adding the exponents of $p\lambda^{L-t}$ (3 pts).
- Witness $a_t = 1 + 2^{L-t}$, realized by $A = \mathrm{diag}(1,2)$ and $B$, $C$ both equal to $(1,1)^\top$ (3 pts).
- Violation at $t = L-1$: $a_L a_{L-2} = 10$ but $a_{L-1}^2 = 9$, hence strict inclusion (1 pt).

*Verified: for $L = 3, \dots, 8$ the recursion with these weights gives $1 + 2^{L-t}$, with $a_L a_{L-2} = 10$ and $a_{L-1}^2 = 9$; padding reproduces the scalar coefficients exactly on 100 random instances; SymPy simplifies the identity residual to $0$.*

**4.a (3) Anti-symmetric matrices and the powers of $J$**

**What is asked.** Show that a $2 \times 2$ anti-symmetric matrix is a multiple of $J$, and prove the formula for $J^k$ for every $k \ge 0$. The answer is a short computation plus an induction.

**Tool and why.** Anti-symmetry is four scalar equations, so we solve them entry by entry. For the powers, $J^2 = -I_2$ makes the sequence of powers repeat every four steps, so an induction on $k$ with step $4$ (or step $1$) closes the formula.

**Definitions.** Write the entries of $A$ as $A_{ij}$, and let $\omega := A_{12}$. For each $k \ge 0$ let $R_k$ denote the right-hand side of the claimed formula, $\cos(k\pi/2)\, I_2 + \sin(k\pi/2)\, J$.

**Solution.**

Step 1, the form of $A$: $A^\top = -A$ compares entry $(i, j)$ with entry $(j, i)$. On the diagonal $A_{11} = -A_{11}$, so $A_{11} = 0$, and likewise $A_{22} = 0$. Off the diagonal $A_{21} = -A_{12}$. Hence

$$A = \begin{pmatrix} 0 & \omega \\ -\omega & 0 \end{pmatrix} = \omega J .$$

Step 2, the first powers: a direct product gives

$$J^2 = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix} \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix} = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix} = -I_2 .$$

Therefore

$$J^3 = J^2 J = -J, \qquad J^4 = (J^2)^2 = I_2 .$$

Step 3, **Claim.** $J^k = R_k$ for every $k \in \mathbb{N}_0$. We prove it by induction on $k$, from $0$ upwards, in steps of $4$ after checking the first four values.

**Base.** For $k = 0, 1, 2, 3$ the cosine and sine values are listed below, and they match Step 2.

| $k$ | $\cos(k\pi/2)$ | $\sin(k\pi/2)$ | $R_k$ |
|---|---|---|---|
| $0$ | $1$ | $0$ | $I_2$ |
| $1$ | $0$ | $1$ | $J$ |
| $2$ | $-1$ | $0$ | $-I_2$ |
| $3$ | $0$ | $-1$ | $-J$ |

**Hypothesis.** For some $k \ge 0$, $J^k = R_k$.

**Step.** By Step 2, $J^4 = I_2$, so $J^{k+4} = J^k$, and by the hypothesis this equals $R_k$. Cosine and sine have period $2\pi$, and adding $4$ to $k$ adds $2\pi$ to the angle, so $R_{k+4} = R_k$. Hence $J^{k+4} = R_{k+4}$. Starting from each of the four base cases, this reaches every $k$.

**In words.** $J$ is a rotation by a quarter turn. Four quarter turns bring you back, and the cosine and sine simply record which of the four positions you are in.

**Sanity check.** $k = 5$: the formula gives $\cos(5\pi/2) I_2 + \sin(5\pi/2) J = J$, and indeed $J^5 = J^4 J$, which is $J$.

**What to write in the exam.**

- Anti-symmetry forces a zero diagonal and $A_{21} = -A_{12}$, so $A = \omega J$ (1 pt).
- Then $J^2 = -I_2$, $J^3 = -J$, $J^4 = I_2$.
- Formula checked for $k = 0, 1, 2, 3$; both sides are $4$-periodic in $k$, so it holds for all $k$ (2 pts).

*Verified: SymPy solves $A^\top + A = 0$ to $A = A_{12} J$, and checks $J^k = \cos(k\pi/2) I_2 + \sin(k\pi/2) J$ exactly for $k = 0, \dots, 40$.*

**4.b (5) Characterization of $\mathcal{S}_2^{anti}$**

**What is asked.** Prove both directions of the stated set equality: every anti-symmetric RNN gives a sequence of the form $\omega^k(\alpha\cos + \beta\sin)$, and every such triple $(\omega, \alpha, \beta)$ is realized by one. The answer is a two-direction proof.

**Tool and why.** Part 1 gives the coefficients, part 4.a gives $A = \omega J$ and the powers of $J$. A number commutes with matrices, so $A^k = \omega^k J^k$ (cheat sheet §3, matrix powers). For the reverse direction we choose $B$ and $C$ to produce any given pair $(\alpha, \beta)$.

**Definitions.** Index positions from the end: $k := L - t$, so $k = 0$ is the last position. For weights $B, C$ define the two numbers

$$\alpha := C^\top B, \qquad \beta := C^\top J B .$$

They are the two "readouts" that the formula of 4.a reduces everything to. Let $e_1 = (1, 0)^\top$.

**Solution.**

Step 1, one direction: let $h \in \mathcal{H}_2^{anti}$. By 4.a, $A = \omega J$ for some $\omega$, so $A^k = \omega^k J^k$, including $k = 0$ where both sides are $I_2$. By part 1 and the formula of 4.a,

$$\begin{aligned}
a_{L-k} &= C^\top A^k B \\
&= \omega^k\, C^\top J^k B \\
&= \omega^k \Big( \cos(\tfrac{k\pi}{2})\, C^\top B + \sin(\tfrac{k\pi}{2})\, C^\top J B \Big) \\
&= \omega^k \Big( \alpha \cos(\tfrac{k\pi}{2}) + \beta \sin(\tfrac{k\pi}{2}) \Big).
\end{aligned}$$

The third row distributes $C^\top \cdot B$ over the two terms of $J^k$. So $a$ is in the stated set.

Step 2, the other direction: given $(\omega, \alpha, \beta)$, choose

$$A := \omega J, \qquad B := e_1, \qquad C := (\alpha, -\beta)^\top .$$

$A$ is anti-symmetric because $J$ is. Now $C^\top B = \alpha$. Also $J e_1$ is the first column of $J$, namely $(0, -1)^\top$, so

$$C^\top J B = \alpha \cdot 0 + (-\beta)(-1) = \beta .$$

Step 3, closing the converse: Step 1 applies to these weights and gives exactly

$$a_{L-k} = \omega^k \Big( \alpha \cos(\tfrac{k\pi}{2}) + \beta \sin(\tfrac{k\pi}{2}) \Big)$$

with the prescribed $\alpha$ and $\beta$. So every sequence of the set is in $\mathcal{S}_2^{anti}$.

**In words.** An anti-symmetric step rotates the state by a quarter turn and scales it by $\omega$. Read backwards, the coefficients cycle through $\alpha, \beta, -\alpha, -\beta$ while being multiplied by $\omega$ each step: a geometric sequence with a period-$4$ sign pattern, not a smooth sinusoid.

**Sanity check.** With $\omega = 0$ we get $A = 0$, so only the last input reaches the output, with weight $C^\top B = \alpha$. The formula agrees: $k = 0$ gives $\omega^0 \alpha = \alpha$, and every $k \ge 1$ gives $0$.

**What to write in the exam.**

- One direction: $A^k = \omega^k J^k$, then 4.a gives the form with $\alpha = C^\top B$, $\beta = C^\top J B$ (3 pts).
- Other direction: $A = \omega J$, $B = e_1$, $C = (\alpha, -\beta)^\top$ give $C^\top B = \alpha$ and $C^\top J B = \beta$ (2 pts).
- Note: $A^{L-t}$ is a matrix power, not the exponential $e^{(L-t)A}$.

*Verified: for 300 random $(L, \omega, \alpha, \beta)$, a fifth with $\omega = 0$, the recursion with these weights matches the formula, and for random $B, C$ the forward direction matches with $\alpha = C^\top B$, $\beta = C^\top J B$, both to $10^{-13}$ (NumPy).*

**4.c (4) A sequence outside $\mathcal{S}_2^{anti}$**

**What is asked.** Find a sequence that $\mathcal{H}_1$ (hence $\mathcal{H}_2$) realizes but $\mathcal{H}_2^{anti}$ does not, prove both claims, and conclude strict inclusion. The answer is a witness plus two proofs.

**Tool and why.** By 4.b every sequence in $\mathcal{S}_2^{anti}$ has an explicit form. Two steps of the sign pattern flip the sign, which gives the relation $a_{t-2} = -\omega^2 a_t$ of the hint and therefore a sign constraint. A witness only has to break that constraint.

**Definitions.** The witness is the all-ones sequence $\mathbf{1} := (1, 1, \dots, 1)$. Throughout, let $a \in \mathcal{S}_2^{anti}$ have parameters $(\omega, \alpha, \beta)$ as in 4.b.

**Solution.**

Step 1, two steps back: let $k \in \{0, \dots, L-3\}$, so that both positions $L-k$ and $L-k-2$ lie in $[L]$. Adding $\pi$ to an angle flips the sign of both cosine and sine, and $\tfrac{(k+2)\pi}{2}$ is $\tfrac{k\pi}{2} + \pi$. Hence

$$\begin{aligned}
a_{L-k-2} &= \omega^{k+2} \Big( \alpha \cos\tfrac{(k+2)\pi}{2} + \beta \sin\tfrac{(k+2)\pi}{2} \Big) \\
&= -\,\omega^2\, \omega^{k} \Big( \alpha \cos\tfrac{k\pi}{2} + \beta \sin\tfrac{k\pi}{2} \Big) \\
&= -\,\omega^2\, a_{L-k} .
\end{aligned}$$

With $t := L - k$ this reads $a_{t-2} = -\omega^2 a_t$ for every $t \in \{3, \dots, L\}$.

Step 2, the sign constraint: multiply by $a_t$.

$$a_t\, a_{t-2} = -\,\omega^2\, a_t^2 \le 0 .$$

So two entries that are two steps apart are never both strictly positive.

Step 3, the witness is in $\mathcal{S}_2$: by part 2 with $p = 1$ and $\lambda = 1$, $\mathbf{1} \in \mathcal{S}_1$. By the padding of part 3, $\mathbf{1} \in \mathcal{S}_2$. Directly: $A = I_2$, $B = e_1$ and $C = e_1$ give $C^\top A^{L-t} B = 1$ for every $t$.

Step 4, the witness is not in $\mathcal{S}_2^{anti}$: since $L \ge 3$, position $L-2$ exists, and $\mathbf{1}$ has $a_L\, a_{L-2} = 1$, which is positive. This contradicts Step 2. Equivalently, $\alpha = a_L$, which is $1$, and Step 1 would force $1 = -\omega^2$, which has no real solution.

Step 5, conclusion: $\mathcal{S}_2^{anti} \subseteq \mathcal{S}_2$ by definition, and $\mathbf{1}$ lies in the difference. Hence $\mathcal{H}_2^{anti} \subsetneq \mathcal{H}_2$.

**In words.** Two quarter turns make a half turn, which is multiplication by $-1$. So whatever an anti-symmetric RNN does to an input, it does the opposite to an input two steps earlier (up to the positive factor $\omega^2$). It cannot even give all inputs the same weight.

**Sanity check.** The restriction does not go the other way: the two classes $\mathcal{S}_1$ and $\mathcal{S}_2^{anti}$ are incomparable. For $L = 3$ the parameters $(\omega, \alpha, \beta) = (1, 1, 0)$ give $(-1, 0, 1)$, which is anti-realizable, yet $a_2^2 = 0$ while $a_1 a_3 = -1$, so it is not in $\mathcal{S}_1$ by part 3. Also, for $L = 3, 4, 6$ the best anti-symmetric fit to $\mathbf{1}$ has squared error $1, 2, 4$, never $0$.

**What to write in the exam.**

- From 4.b with the angle shift by $\pi$: $a_{t-2} = -\omega^2 a_t$ for $t \in \{3, \dots, L\}$ (2 pts).
- Hence $a_t a_{t-2} \le 0$.
- Witness $\mathbf{1}$: in $\mathcal{S}_1$ with $p = 1$ and $\lambda = 1$, hence in $\mathcal{S}_2$; but $a_L a_{L-2} = 1$ (2 pts).
- Conclude $\mathcal{H}_2^{anti} \subsetneq \mathcal{H}_2$.

*Verified: on 300 random anti-symmetric instances $a_{t-2} + \omega^2 a_t$ is below $10^{-13}$ and $a_t a_{t-2}$ never exceeds $0$; numerical minimization of the squared distance from $\mathbf{1}$ over $(\omega, \alpha, \beta)$ gives exactly $1, 2, 4$ for $L = 3, 4, 6$ (NumPy, SciPy).*

**Common mistakes.**

- Quoting the closed form of part 1 without the induction. Here proving it is the task (in a\_2024 it was given), which costs 3 points; arguing non-universality with "linear functions are not all continuous functions" and no explicit $f$ costs 2.
- Proving only one direction of a set equality in part 2 or 4.b (capped at half the points), or reading the geometric ratio forwards instead of backwards: $a_t = \lambda\, a_{t+1}$.
- Checking the three-term identity at $t = 1$ or $t = L$, where it is not defined, or claiming a witness is in $\mathcal{S}_2$ without explicit weights. In part 4, treating $A^{L-t}$ as the exponential $e^{(L-t)A}$, which gives a bounded sinusoid instead of a scaled period-$4$ pattern.

**💡 Useful tricks:** Induct for the closed form $a_t=C^\top A^{L-t}B$; linear-in-$x$ ⇒ non-universal (witness $x_1x_2$); $d=1$ gives a *backwards* geometric $a_t=p\lambda^{L-t}$ with signature $a_{t+1}a_{t-1}=a_t^2$; anti-symmetric $A=\omega J$ has $J^k$ period-$4$, forcing $a_{t-2}=-\omega^2a_t$ ⇒ a sign constraint.

**⚠️ Watch out:** (1) here you must PROVE the closed form (a_2024 gave it) and prove non-membership for *all* $d$; (3) apply the three-term identity only at interior $t\in\{2,\dots,L-1\}$, and verify the witness is realizable in $\mathcal H_2$; (4) $A^{L-t}$ is a matrix *power* (rotation by $k\cdot90°$ scaled by $\omega^k$) — NOT the exponential $e^{(L-t)A}$; it's a period-4 geometric, not a bounded sinusoid.

## Q2 — Gradient flow on a single ReLU neuron (35)

**Full solution:**

**1. (8) The gradient flow equations**

**What is asked.** Compute $\partial \mathcal{L} / \partial v$ and $\nabla_w \mathcal{L}$ with the chain rule, and negate them to get the two flow equations. The answer is a derivation of the two displayed formulas.

**Tool and why.** The loss is a sum of squares of residuals, and each residual is a composition: a linear map $w \mapsto w^\top x_n$, then the ReLU, then multiplication by $v$. The chain rule handles such compositions term by term (cheat sheet §7). The ReLU derivative is fixed by the stated convention, so no case analysis at $0$ is needed.

**Definitions.** Write $z_n := w^\top x_n$ for the pre-activation on example $n$; we name it because the ReLU acts on it. The residual is $r_n = v\,[z_n]_+ - y_n$, as in the statement. The convention is

$$\frac{d}{dz}[z]_+ = \mathbb{1}[z > 0] .$$

**Solution.**

Step 1, the loss as a sum: $\mathcal{L} = \tfrac12 \sum_n r_n^2$, so by the chain rule each term contributes $r_n$ times the derivative of $r_n$.

Step 2, derivative in $v$: $[z_n]_+$ does not depend on $v$, so $\partial r_n / \partial v = [z_n]_+$. Hence

$$\frac{\partial \mathcal{L}}{\partial v} = \sum_{n=1}^{N} r_n\, [w^\top x_n]_+ .$$

Step 3, derivative in $w$: $v$ and $y_n$ do not depend on $w$. The ReLU derivative is $\mathbb{1}[z_n > 0]$ by the convention, and $\nabla_w z_n = x_n$ because $z_n$ is linear in $w$. So

$$\nabla_w r_n = v\, \mathbb{1}[z_n > 0]\, x_n ,$$

and

$$\nabla_w \mathcal{L} = \sum_{n=1}^{N} r_n\, v\, \mathbb{1}[w^\top x_n > 0]\, x_n .$$

Step 4, the flow: gradient flow is $\dot v = -\partial \mathcal{L} / \partial v$ and $\dot w = -\nabla_w \mathcal{L}$. Negating Steps 2 and 3 and pulling the common factor $v$ out of the sum gives exactly the two displayed equations.

**In words.** The output weight $v$ is pushed by how wrong each prediction is, times the neuron's activation. The input weight $w$ is pushed the same way, but only through examples where the neuron is active, and scaled by $v$, because $v$ is the path from the neuron to the output.

**Sanity check.** In the setting of part 4 ($D = 1$, one example $x_1 = 1$, $y_1 = -1$) the loss is $\tfrac12 (v[w]_+ + 1)^2$. Differentiating it directly in $v$ gives $(v[w]_+ + 1)\,[w]_+$, which is $r_1 [w x_1]_+$, as Step 2 says.

**What to write in the exam.**

- Chain rule on $\mathcal{L} = \tfrac12 \sum_n r_n^2$: $\partial r_n / \partial v = [w^\top x_n]_+$ (4 pts).
- Next, $\nabla_w r_n$ is $v\, \mathbb{1}[w^\top x_n > 0]\, x_n$ by the convention and $\nabla_w (w^\top x_n) = x_n$ (4 pts).
- Finally, negate both to get $\dot v$ and $\dot w$.

*Verified: on 200 random datasets and parameters, both formulas agree with central finite differences of $\mathcal{L}$ to $6 \cdot 10^{-9}$ (NumPy).*

**2. (9) Balancedness: $v^2 - \|w\|^2$ is conserved**

**What is asked.** Show that the time derivative of $v(t)^2 - \|w(t)\|^2$ is zero along the flow. The answer is a calculation.

**Tool and why.** Differentiate along the flow with the chain rule, substitute the flow equations of part 1, and compare the two terms. They match thanks to the positive homogeneity of the ReLU, $z\, \mathbb{1}[z > 0]$ equals $[z]_+$ (cheat sheet §8, balancedness).

**Definitions.** No new notation; $z_n$ and $r_n$ are as in part 1.

**Solution.**

Step 1, differentiate: $\tfrac{d}{dt} v^2 = 2 v \dot v$, and $\tfrac{d}{dt} \|w\|^2 = 2 w^\top \dot w$ because $\|w\|^2 = w^\top w$. So

$$\frac{d}{dt}\big(v^2 - \|w\|^2\big) = 2 v \dot v - 2 w^\top \dot w .$$

Step 2, substitute part 1: multiply $\dot v$ by $2v$, and take the inner product of $\dot w$ with $2w$, using $w^\top x_n = z_n$.

$$2 v \dot v = -2 v \sum_{n} r_n\, [z_n]_+ , \qquad 2 w^\top \dot w = -2 v \sum_{n} r_n\, \mathbb{1}[z_n > 0]\, z_n .$$

Step 3, the homogeneity identity: for every real $z$, $z\, \mathbb{1}[z > 0]$ equals $[z]_+$. Check two cases. If $z > 0$, both sides equal $z$. If $z \le 0$, the left side is $z \cdot 0$ and the right side is $\max\{z, 0\}$, both $0$; this includes $z = 0$, where the convention makes the indicator $0$.

Step 4, conclude: by Step 3 the two sums of Step 2 are term by term equal, so the difference in Step 1 is $0$. Integrating from $0$ to $t$,

$$v(t)^2 - \|w(t)\|^2 = v(0)^2 - \|w(0)\|^2 \quad \text{for all } t \ge 0 .$$

This is the single-neuron case of the balancedness conservation law (Lecture 4, Lemma 1).

**In words.** Scaling $w$ up by a factor and $v$ down by the same factor does not change the network. Gradient flow is "blind" in that direction, and the conserved quantity is exactly the record of that blindness.

**Sanity check.** In the part 4 example started at $(w, v) = (1, 2)$, the conserved value is $4 - 1 = 3$. The simulated flow ends at $w = 0$, $v = 1.73205$, and $1.73205^2$ is $3.0000$.

**What to write in the exam.**

- Setup: $\tfrac{d}{dt}(v^2 - \|w\|^2) = 2v\dot v - 2w^\top \dot w$ (3 pts).
- Substitution of part 1: both terms carry the factor $-2v$, and they sum $r_n [z_n]_+$ and $r_n \mathbb{1}[z_n > 0]\, z_n$ respectively (3 pts).
- Identity: $z\,\mathbb{1}[z > 0]$ equals $[z]_+$, checked for $z > 0$ and $z \le 0$, so the derivative is $0$ (3 pts).

*Verified: at 200 random points $2v\dot v - 2w^\top \dot w$ is below $10^{-8}$; RK4 runs on 5 random datasets keep $v^2 - \|w\|^2$ constant to $10^{-4}$ (NumPy).*

**3. (8) Strict imbalance freezes the sign of $v$**

**What is asked.** Assuming $v(0)^2 > \|w(0)\|^2$, prove that $v(t)$ never vanishes and keeps the sign of $v(0)$. The answer is a proof.

**Tool and why.** Part 2 gives a conserved quantity, and here it is strictly positive. Since $\|w\|^2 \ge 0$, it bounds $v^2$ away from $0$ (cheat sheet §8). The sign then cannot change because $v$ is continuous: the intermediate value theorem would produce a zero.

**Definitions.** Let $c_0 := v(0)^2 - \|w(0)\|^2$, the conserved value; by assumption $c_0 > 0$.

**Solution.**

Step 1, a lower bound on $v^2$: by part 2, $v(t)^2 = \|w(t)\|^2 + c_0$ for every $t \ge 0$. A squared norm is non-negative, so

$$v(t)^2 \ge c_0 > 0 .$$

Only the difference is conserved, not $v^2$ itself, but the difference is enough.

Step 2, no zeros: from Step 1, $|v(t)| \ge \sqrt{c_0}$, so $v(t) \ne 0$ for every $t \ge 0$. In particular $v(0) \ne 0$, so $v(0)$ has a definite sign.

Step 3, **Claim.** $v(t)$ has the sign of $v(0)$ for every $t \ge 0$. The proof is by contradiction. Suppose $v(t_1)$ has the sign of $v(0)$ but $v(t_2)$ has the opposite sign, for some $t_2 > 0$ (take $t_1 = 0$). The flow is differentiable by assumption, so $v$ is continuous on $[0, t_2]$. By the intermediate value theorem there is a time $t^*$ strictly between $0$ and $t_2$ with $v(t^*) = 0$. This contradicts Step 2.

**In words.** The output weight starts "bigger" than the input weight, and the gap $c_0$ never closes. So $|v|$ can shrink only down to $\sqrt{c_0}$ and never passes through zero. This is simpler than the balanced case ($c_0 = 0$, as in b\_2022 Q2), which needs an integrating-factor argument.

**Sanity check.** Five RK4 runs on random data with $c_0$ between $0.37$ and $0.58$ keep the sign of $v$, and the smallest $|v|$ seen is always above $\sqrt{c_0}$ (for example $0.716$ against $0.698$).

**What to write in the exam.**

- Bound: by part 2, $v(t)^2 = \|w(t)\|^2 + c_0$, which is at least $c_0$, and $c_0 > 0$ (3 pts).
- Hence $|v(t)| \ge \sqrt{c_0}$ and $v(t) \ne 0$ for all $t$ (2 pts).
- Sign change plus continuity would give a zero by the intermediate value theorem, a contradiction (3 pts).

*Verified: RK4 with step $10^{-3}$ up to $t = 5$ on five random datasets: the sign of $v$ is kept and the minimum of $|v|$ stays above $\sqrt{c_0}$ (NumPy).*

**4. (10) An unreachable infimum**

**What is asked.** For $\mathcal{L}(w, v) = \tfrac12 (v[w]_+ + 1)^2$: (i) the infimum is $0$ and is attained; (ii) from $v(0) > |w(0)|$ the loss stays at least $\tfrac12$ forever; (iii) conclude and contrast with linear networks. The answer is a minimizer, a lower bound, and one sentence of comparison.

**Tool and why.** For (i) a square is at least $0$, so exhibiting one zero suffices. For (ii) part 3 freezes the sign of $v$ (cheat sheet §8, ReLU sign preservation); with $v > 0$ the network output is never negative, while the label is $-1$. For (iii) the relevant class result is convergence of gradient flow over deep linear networks (cheat sheet §9; Lecture 4, Thm 2).

**Definitions.** No new notation. Note that here $r_1 = v[w]_+ + 1$, since $x_1 = 1$ and $y_1 = -1$.

**Solution.**

Step 1, (i) the infimum: $\mathcal{L} \ge 0$ as half a square. At $(w, v) = (1, -1)$ the output is $(-1)[1]_+ = -1$, so $r_1 = 0$ and $\mathcal{L}(1, -1) = 0$. Hence $\inf \mathcal{L} = 0$, attained at $(1, -1)$. Any minimizer needs $v[w]_+ = -1$, which forces $v < 0$ because $[w]_+ \ge 0$.

Step 2, (ii) the initialization satisfies part 3: from the assumption,

$$v(0) > |w(0)| \ge 0 .$$

So $v(0) > 0$, and squaring two non-negative numbers keeps the strict order, so $v(0)^2 > w(0)^2$. With $D = 1$ this is the assumption $v(0)^2 > \|w(0)\|^2$ of part 3.

Step 3, the sign stays positive: by part 3, $v(t) > 0$ for every $t \ge 0$.

Step 4, the output is never negative: $[w(t)]_+ \ge 0$ and $v(t) > 0$, so $v(t)[w(t)]_+ \ge 0$. Hence the residual satisfies $r_1(t) \ge 1$, and

$$\mathcal{L}(w(t), v(t)) = \tfrac12\, r_1(t)^2 \ge \tfrac12 .$$

Squaring keeps the inequality because both sides of $r_1(t) \ge 1$ are positive.

Step 5, (iii) conclusion: the flow stays at loss at least $\tfrac12$ forever, while the infimum is $0$, so gradient flow over ReLU networks does not always converge to the global infimum. Contrast: for deep linear networks, gradient flow from a balanced initialization whose end-to-end matrix has a deficiency margin provably reaches the global minimum at a linear rate (Lecture 4, Thm 2), whereas a single ReLU neuron already admits no such unconditional guarantee.

**In words.** To output $-1$ the network needs $v < 0$, but the conserved gap keeps $v$ away from $0$, so $v$ can never cross from positive to negative. The flow is trapped on the wrong side.

**Sanity check.** Start at $(w, v) = (1, 2)$, so $c_0 = 3$. Simulating the flow, $w$ reaches $0$ at about $t = 0.316$; from then on both gradients vanish (the ReLU is inactive), so the flow freezes with $v = \sqrt{3}$ and $\mathcal{L} = \tfrac12$ exactly. The bound of Step 4 is tight. Also, on a grid with $v > 0$ the smallest loss is $0.5$.

**What to write in the exam.**

- (i) $\mathcal{L} \ge 0$ and $\mathcal{L}(1, -1) = 0$, so the infimum $0$ is attained; minimizers need $v < 0$ (3 pts).
- (ii) $v(0) > |w(0)|$ gives $v(0) > 0$ and $v(0)^2 > w(0)^2$; part 3 gives $v(t) > 0$ (3 pts).
- Then $v[w]_+ \ge 0$, the residual is at least $1$, and $\mathcal{L} \ge \tfrac12$ (2 pts).
- (iii) No convergence to the infimum; contrast with linear-network convergence, Lecture 4, Thm 2 (2 pts).

*Verified: RK4 from $(1, 2)$, $(0.5, 0.6)$, $(0.9, 1)$ and $(-0.3, 1)$ ends with loss $0.500000$ and $v$ equal to $\sqrt{c_0}$ when $w$ reaches $0$; Euler with step $10^{-5}$ from $(1, 2)$ never goes below $\tfrac12$; $\mathcal{L}(1, -1) = 0$ exactly (NumPy).*

**Common mistakes.**

- Dropping the factor $v$ in $\dot w$, or a sign error in the flow (costs 2 points); using $\mathbb{1}[z \ge 0]$ against the stated convention.
- Claiming that $v^2$ itself is conserved, or citing balancedness from class instead of deriving it here; skipping continuity and the intermediate value theorem in part 3 ("$v$ cannot jump" must be justified).
- Exhibiting a minimizer with $v > 0$ (impossible), or contrasting part 4 with the wrong class result: the relevant one is convergence of linear networks, not saddle avoidance.

**💡 Useful tricks:** Chain rule with the $\mathbb 1[z>0]$ convention; homogeneity $z\,\mathbb 1[z>0]$ equals $[z]_+$ ⇒ balancedness $v^2-\|w\|^2$ conserved; *strict* imbalance $c_0>0$ ⇒ $v(t)^2\geq c_0$ ⇒ sign of $v$ frozen (simpler than the balanced case); $v>0$ and $[w]_+\geq0$ ⇒ a negative label is unreachable ⇒ loss floor $\tfrac12$.

**⚠️ Watch out:** (1) don't drop the factor $v$ in $\dot w$; (2) derive balancedness in *this* setting — don't cite class; (3) sign preservation needs continuity + IVT, and strict imbalance hands you $|v(t)|\geq\sqrt{c_0}$ for free; (4) the global min needs $v<0$, and the contrast is with *linear-network convergence* (Thm 2), not saddle avoidance.

## Q3 — PAC-Bayes with Gaussian priors and posteriors (30)

**Full solution:**

**1. (8) KL between two Gaussians with the same variance**

**What is asked.** Compute $KL(Q \| P)$ for $Q = N(w, \sigma^2 I_d)$ and $P = N(0, \sigma^2 I_d)$ from the definition, and show it equals $\|w\|^2 / (2\sigma^2)$. The answer is a derivation.

**Tool and why.** KL is the expectation under $Q$ of the log density ratio (cheat sheet §2, KL between Gaussians). The two densities share the same normalization, so it cancels in the ratio, and the log of an exponential leaves a quadratic in $\theta$ whose expectation needs only the mean of $Q$.

**Definitions.** Let $q, p$ be the densities of $Q$ and $P$. We use $\langle \theta, w \rangle$ for the inner product and the expansion $\|\theta - w\|^2 = \|\theta\|^2 - 2\langle \theta, w \rangle + \|w\|^2$.

**Solution.**

Step 1, the ratio of densities: both densities carry the factor $(2\pi\sigma^2)^{-d/2}$, which cancels. What is left is a ratio of exponentials, so its log is the difference of exponents:

$$\ln \frac{q(\theta)}{p(\theta)} = \frac{ -\|\theta - w\|^2 + \|\theta\|^2 }{2\sigma^2} .$$

Step 2, expand the square: by the expansion in Definitions the $\|\theta\|^2$ terms cancel, and

$$\ln \frac{q(\theta)}{p(\theta)} = \frac{ 2\langle \theta, w\rangle - \|w\|^2 }{2\sigma^2} .$$

Step 3, take the expectation under $Q$: the expression is affine in $\theta$, and $\mathbb{E}_{\theta \sim Q}[\theta] = w$ because $w$ is the mean of $Q$. So $\mathbb{E}_Q \langle \theta, w \rangle$ equals $\|w\|^2$, and

$$\begin{aligned}
KL(Q \| P) &= \frac{2\|w\|^2 - \|w\|^2}{2\sigma^2} \\
&= \frac{\|w\|^2}{2\sigma^2} .
\end{aligned}$$

Step 4, the lecture formula as a cross-check: Lecture 6, Lemma 1 with both covariances equal to $\sigma^2 I_d$ has trace term $d$, mean term $\|w\|^2 / \sigma^2$, dimension term $-d$ and log-determinant term $\ln 1 = 0$. Half their sum is again $\|w\|^2 / (2\sigma^2)$. This route earns full credit too if all four terms are computed.

**In words.** Moving a Gaussian without changing its shape costs, in KL, the squared distance moved measured in units of the variance. A wider prior makes the same move cheaper.

**Sanity check.** At $w = 0$ the two distributions coincide and the formula gives $0$, as KL must. Expanding the second moments separately also works: $\mathbb{E}_Q \|\theta\|^2$ is $\|w\|^2 + d\sigma^2$ and $\mathbb{E}_Q \|\theta - w\|^2$ is $d\sigma^2$, and their difference is again $\|w\|^2$.

**What to write in the exam.**

- Normalizations $(2\pi\sigma^2)^{-d/2}$ cancel in $q / p$ (2 pts).
- Log ratio: $(2\langle \theta, w \rangle - \|w\|^2) / (2\sigma^2)$ after expanding the square (3 pts).
- Expectation with $\mathbb{E}_Q[\theta] = w$ gives $\|w\|^2 / (2\sigma^2)$ (3 pts).

*Verified: SymPy integrates the one-dimensional case exactly to $w^2 / (2\sigma^2)$; Monte-Carlo in $d = 5$ with $4 \cdot 10^5$ samples gives $8.130$ against the formula's $8.122$ (NumPy, SymPy).*

**2. (7) The Gaussian PAC-Bayes bound and what it covers**

**What is asked.** Derive the bound for $N(w, \sigma^2 I_d)$ that holds for all $w$ at once, then explain (i) why $w_S$ may depend on $S$ and (ii) which predictor the bound is about. The answer is a short derivation and two sentences.

**Tool and why.** The PAC-Bayes theorem of the reminder (cheat sheet §11) with the data-independent prior $P = N(0, \sigma^2 I_d)$, plus part 1 for its KL term. The theorem's event does not depend on $Q$, which is the whole point of (i).

**Definitions.** Write $Q_w := N(w, \sigma^2 I_d)$ for the posterior centred at $w$.

**Solution.**

Step 1, the theorem applies: $P$ is fixed before seeing the data, so it is independent of $S$, as the reminder requires.

Step 2, one event for all posteriors: the reminder gives a single event of probability at least $1 - \delta$ over $S$ on which the bound holds for every $Q$ simultaneously. In particular it holds for every member of the family $\{ Q_w : w \in \mathbb{R}^d \}$.

Step 3, substitute part 1: on that event, $KL(Q_w \| P) = \|w\|^2 / (2\sigma^2)$, so for every $w$

$$L_D(Q_w) \le L_S(Q_w) + \sqrt{\frac{\frac{\|w\|^2}{2\sigma^2} + \ln\!\big(\frac{2N}{\delta}\big)}{2(N-1)}} .$$

Since this holds for every $w$ on the same event, it holds for $w = w_S$ whatever value training produced.

Step 4, (i) legitimacy: the quantifier over $Q$ sits inside the high-probability event, so the event is the same whichever posterior is used afterwards. Hence the posterior may be chosen after seeing $S$; only the prior must be data-independent. No union bound over $w$ is needed, and none would work over an uncountable family.

Step 5, (ii) which predictor: the guarantee is for the stochastic ("noisy") predictor that draws $\theta \sim N(w_S, \sigma^2 I_d)$ and predicts with $h_\theta$. It bounds $L_D(Q_{w_S})$, not $L_D(h_{w_S})$; the latter needs an additional argument (Lecture 6).

**In words.** The prior is the commitment you make before seeing data; the posterior is free. PAC-Bayes charges you only for how far the posterior moved from the prior.

**Sanity check.** At $w = 0$ the KL term vanishes and the bound reduces to $\sqrt{\ln(2N/\delta) / (2(N-1))}$, the price of using a single fixed distribution.

**What to write in the exam.**

- Prior $N(0, \sigma^2 I_d)$ is data-independent, so the reminder holds on one event for all $Q$ (3 pts).
- Plug in $KL = \|w\|^2 / (2\sigma^2)$ from part 1, for all $w$, in particular $w_S$.
- (i) The "for all $Q$" is inside the event, so $Q$ may depend on $S$; no union bound over $w$ (2 pts).
- (ii) The bound is for the stochastic predictor $Q_{w_S}$, not for $h_{w_S}$ itself (2 pts).

*Verified: the bound is the reminder with the KL of part 1, which was checked symbolically and by Monte-Carlo; at $w = 0$ the KL term is $0$ (SymPy).*

**3.a (5) Why a prior centred at $w_S$ is illegal**

**What is asked.** Name the violated hypothesis of the theorem, and the step of the class proof that breaks when $P$ depends on $S$. The answer is an explanation that points at a specific proof step.

**Tool and why.** Recall the structure of the class proof of PAC-Bayes (cheat sheet §11; Lecture 6, Thm 2): change of measure, a swap of two expectations, Hoeffding for a fixed hypothesis, and Markov. We locate which of these uses the independence of $P$ from $S$.

**Definitions.** For a hypothesis $\theta$ let $\Delta(\theta) := L_D(h_\theta) - L_S(h_\theta)$, its generalization gap. Let

$$f(S) := \sup_Q \Big[ 2(N-1)\, \mathbb{E}_{\theta \sim Q}[\Delta(\theta)^2] - KL(Q\|P) \Big],$$

the quantity whose exponential the proof bounds in expectation.

**Solution.**

Step 1, the violated hypothesis: the prior must be chosen independently of $S$. The prior $N(w_S, \sigma^2 I_d)$ is a function of $S$, so the theorem simply does not cover it. Its probability statement is over draws of $S$ for a fixed $P$.

Step 2, the proof outline: change of measure gives

$$f(S) \le \ln \mathbb{E}_{\theta \sim P}\big[ e^{2(N-1)\Delta(\theta)^2} \big] .$$

Then the proof takes $\mathbb{E}_S$ of $e^{f(S)}$ and swaps $\mathbb{E}_S$ with $\mathbb{E}_{\theta \sim P}$. Then, for each fixed $\theta$, Hoeffding on the i.i.d. losses gives

$$\mathbb{E}_S\big[ e^{2(N-1)\Delta(\theta)^2} \big] \le 2N .$$

Markov's inequality on $e^{f(S)}$ finishes.

Step 3, the broken step: the swap is valid only because $P$ does not depend on $S$, so that the inner expectation is over a fixed distribution. Likewise Hoeffding applies only to a hypothesis fixed before drawing $S$. With $P = P(S)$ the swap is illegal, and the hypotheses that $P(S)$ favours are selected using $S$. Training centres $P(S)$ exactly on parameters whose empirical loss is atypically small relative to $L_D$, so $\Delta(\theta)$ is large there. Then $\mathbb{E}_S \mathbb{E}_{\theta \sim P(S)}[e^{2(N-1)\Delta(\theta)^2}]$ need not be at most $2N$, and the failure probability is no longer at most $\delta$.

**In words.** The "free" bound with $KL = 0$ is the same fallacy as reading generalization off the training loss: the prior was allowed to look at the answers.

**Sanity check.** The shortcut bound has no dependence on $w_S$ at all; for $N = 10^4$ and $\delta = 0.05$ it is $0.0254$ for any network, even one that memorized random labels, which by the Zhang et al. experiments can have test error near chance. A bound that cannot tell these apart cannot be valid.

**What to write in the exam.**

- Violated hypothesis: $P$ must be independent of $S$, and $N(w_S, \sigma^2 I_d)$ is not (2 pts).
- Broken step: swapping $\mathbb{E}_S$ and $\mathbb{E}_{\theta \sim P}$, and Hoeffding for a fixed $\theta$, both need $P$ independent of $S$ (3 pts).
- Without them $\mathbb{E}_S[e^{f(S)}]$ is not bounded by $2N$, so the $\delta$ guarantee is lost.

*Verified: the numeric value $\sqrt{\ln(2 \cdot 10^4 / 0.05) / (2 \cdot 9999)}$ equals $0.0254$; the proof steps were checked against the lecture's proof outline (NumPy).*

**3.b (5) Adapting the prior's scale by a weighted union bound**

**What is asked.** Prove a bound that holds with probability at least $1 - \delta$ for all $j$ and all $Q$ at once, with the extra term $(j+1)\ln 2$, and write it for $Q_j = N(w_S, 2^j \sigma_0^2 I_d)$. The answer is a proof and the final bound.

**Tool and why.** Each prior $P_j$ is data-independent, so the reminder applies to it at its own confidence $\delta_j$. Countably many events are combined by a weighted union bound with summable weights (cheat sheet §2, SRM and the $\delta_k$ trick). Part 1 then gives each KL term.

**Definitions.** $P_j = N(0, 2^j \sigma_0^2 I_d)$ and $\delta_j = \delta\, 2^{-(j+1)}$, as in the statement. Let $E_j$ be the event on which the reminder's bound holds for $P_j$ at level $\delta_j$, for all $Q$.

**Solution.**

Step 1, each event: $P_j$ does not depend on $S$, so by the reminder $E_j$ has probability at least $1 - \delta_j$, that is, its complement has probability at most $\delta_j$.

Step 2, the weights sum to $\delta$: a geometric series,

$$\sum_{j \ge 0} \delta_j = \delta \sum_{j \ge 0} 2^{-(j+1)} = \delta \Big( \tfrac12 + \tfrac14 + \cdots \Big) = \delta .$$

Step 3, union bound: the probability that some $E_j$ fails is at most $\sum_j \delta_j$, which is $\delta$. So with probability at least $1 - \delta$ all events $E_j$ hold together.

Step 4, the log term: on $E_j$ the bound has $\ln(2N/\delta_j)$, and since $1/\delta_j$ is $2^{j+1}/\delta$,

$$\ln\frac{2N}{\delta_j} = \ln\frac{2N}{\delta} + (j+1)\ln 2 .$$

This is exactly the displayed bound, for every $j$ and every $Q$ simultaneously. Hence $j$, like $Q$, may be chosen after seeing $S$.

Step 5, instantiate: part 1 with variance $2^j \sigma_0^2$ in place of $\sigma^2$ gives

$$KL(Q_j \| P_j) = \frac{\|w_S\|^2}{2 \cdot 2^j \sigma_0^2} = \frac{\|w_S\|^2}{2^{j+1} \sigma_0^2} .$$

So with probability at least $1 - \delta$, for every $j$:

$$L_D(Q_j) \le L_S(Q_j) + \sqrt{ \frac{ \frac{\|w_S\|^2}{2^{j+1}\sigma_0^2} + \ln\!\big(\tfrac{2N}{\delta}\big) + (j+1)\ln 2 }{ 2(N-1) } } ,$$

and one may pick the $j$ that minimizes the right-hand side.

**In words.** Instead of guessing one prior scale in advance, we commit in advance to a list of scales, doubling each time, and pay only $\ln 2$ per step down the list. The scale is tuned within a factor $2$ of any target at a logarithmic price, and only the scale, never the mean.

**Sanity check.** Take $\|w_S\|^2 = 100$, $\sigma_0^2 = 1$, $N = 10^4$, $\delta = 0.05$, and look at the square-root term alone. It is $0.0564$ at $j = 0$, falls to $0.0304$ at $j = 6$ (KL $0.78$), and rises again to $0.0316$ at $j = 9$, because the $(j+1)\ln 2$ penalty takes over. In practice $L_S(Q_j)$ also grows with $j$, since the noise is wider.

**What to write in the exam.**

- Each $P_j$ is data-independent; apply the reminder at level $\delta_j$.
- Weights sum to $\delta$, so by the union bound all events hold together with probability at least $1 - \delta$ (2 pts).
- Rewrite $\ln(2N/\delta_j)$ as $\ln(2N/\delta) + (j+1)\ln 2$; holds for all $j$ and $Q$, so $j$ may depend on $S$ (2 pts).
- Part 1 at variance $2^j\sigma_0^2$: $KL(Q_j \| P_j) = \|w_S\|^2 / (2^{j+1}\sigma_0^2)$ (1 pt).

*Verified: SymPy sums $\sum_{j \ge 0} 2^{-(j+1)}$ to $1$, simplifies the log identity and the KL at variance $2^j\sigma_0^2$; the table of square-root terms for $j = 0, \dots, 9$ was computed in NumPy.*

**4. (5) Flat minima and low norm**

**What is asked.** In at most four sentences, explain why the bound of part 2 favours flat, low-norm solutions, and tie this to the class discussion on what a meaningful bound should depend on. The answer is a short paragraph.

**Tool and why.** Read the two terms of the bound of part 2 separately (cheat sheet §11, PAC-Bayes instantiations; Lecture 6). The bound is small only if both terms are small, and each term measures one property.

**Definitions.** No new notation; $L_S(N(w_S, \sigma^2 I_d))$ is the training loss averaged over Gaussian noise added to the weights.

**Solution.**

Step 1, the noisy training loss: this term stays close to $L_S(h_{w_S})$ exactly when the loss barely changes under random perturbations of the weights, that is, when $w_S$ is a **flat** minimum.

Step 2, the KL term: $\|w_S\|^2 / (2\sigma^2)$ is small exactly when the learned weights have **low norm**.

Step 3, the model answer (four sentences): "The bound is small only if both of its terms are small. The first term is the training loss averaged over Gaussian weight noise, which stays near the training loss of $h_{w_S}$ exactly when the minimum is flat, while the KL term $\|w_S\|^2 / (2\sigma^2)$ is small exactly when the weights have low norm. So PAC-Bayes rewards flat, low-norm solutions. Unlike uniform convergence or the norm-only Rademacher bound, it depends on both the learned hypothesis and the sample, which is what the class discussion requires of a bound that could explain the observed generalization phenomena."

**In words.** A flat minimum can be described coarsely (noise does not hurt), and a low-norm one is close to the prior; both mean the solution is "simple" relative to the prior, which is what the bound pays for.

**Sanity check.** A larger $\sigma^2$ shrinks the KL term but widens the noise ball, raising the noisy training loss; part 3.b tunes this trade-off legitimately.

**What to write in the exam.**

- Noisy training loss term is small iff the minimum is flat (2 pts).
- KL term $\|w_S\|^2 / (2\sigma^2)$ is small iff the norm is low (2 pts).
- Tie to class: the bound depends on both $w_S$ and $S$, as a meaningful bound must (1 pt); stay within four sentences (otherwise lose 1).

*Verified: the KL term was computed in part 1; the claim about the noisy term is qualitative and matches Lecture 6's interpretation, so there is no number to check.*

**Common mistakes.**

- A sign error in the exponent difference of part 1, or leaving the second moments uncancelled.
- Re-invoking the theorem for each $w$ with fresh $\delta$'s and union-bounding in part 2, or claiming the bound holds for $h_{w_S}$ itself.
- In 3.a, a vague "overfitting" remark without naming the broken step (only 2 of 5 points); in 3.b, non-summable $\delta_j$, a KL left at variance $\sigma_0^2$, or letting the prior's mean depend on $w_S$.

**💡 Useful tricks:** Gaussian KL: normalizations cancel and $\mathbb E_Q[\theta]=w$ ⇒ $KL=\|w\|^2/2\sigma^2$; the "$\forall Q$" sits *inside* the high-probability event, so the posterior may be picked after seeing $S$ (no union over $w$); tune the prior *scale* with a grid $P_j=N(0,2^j\sigma_0^2)$, $\delta_j=\delta2^{-(j+1)}$; a small bound ⇔ flat + low-norm minimum.

**⚠️ Watch out:** (1) watch the exponent sign; the second moments cancel; (2) do NOT union-bound over $w$ — the free $\forall Q$ is the point; (3a) name the *broken step* — the $\mathbb E_S\leftrightarrow\mathbb E_{\theta\sim P}$ swap needs $P\perp S$, and Hoeffding fails on $S$-selected hypotheses — not a vague "overfitting"; (3b) keep $\delta_j$ summable, recompute $KL$ at variance $2^j\sigma_0^2$, and tune only the scale, never the prior mean.

## Grading notes
- Total 105; per-part partial credit as marked. Hints used during attempt: −20% of
  that sub-part.
- Common traps to check: Q1.1 closed form quoted without induction; Q1.2/Q1.4b only
  one direction of a characterization; Q1.3 witness not verified realizable in
  $\mathcal{H}_2$; Q1.4 matrix power confused with matrix exponential; Q2.1
  missing factor $v$; Q2.3 claiming $v^2$ (rather than the difference) conserved,
  or skipping the IVT step; Q2.4 wrong class result cited in the contrast; Q3.1
  exponent sign; Q3.2 spurious union bound over $w$; Q3.3a vague "overfitting"
  answer without naming the broken step; Q3.3b non-summable weights or stale KL.
