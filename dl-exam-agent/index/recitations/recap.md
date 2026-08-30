# Recitation: Recap Material Q&A (Recitation 3)
- **File:** materials/recitations/recap.pdf
- **Related lectures:** math background used throughout the course — lecture_02_expressiveness (SVD, rank, Frobenius norm), lecture_03_optimization_1 / lecture_04_optimization_2 / lecture_05_optimization_3 (eigenvalues, Rayleigh-quotient bounds, curvature/critical points, convexity), lecture_06_generalization_1+ (norms)
- **Summary:** A Q&A-style recap of the mathematical prerequisites: linear algebra (rank via SVD, trace = sum of eigenvalues, Frobenius norm identities, Rayleigh-quotient bounds on quadratic forms), multivariate calculus (second-order condition: a critical point where the Hessian has a negative eigenvalue is not a local minimum — proved by restricting to a line along the most-negative-curvature eigenvector), and norms (every norm is convex, no norm is strictly convex). Each of the six questions is a short, fully worked proof; these tools ($A^\top A$ spectra, $\mathrm{Tr}$ cyclicity, $\lambda_{\min}\|x\|^2 \le x^\top Ax \le \lambda_{\max}\|x\|^2$, restriction-to-a-line arguments) are the workhorse steps in the course's optimization and expressiveness proofs.

## Topics covered
- SVD $A = U\Sigma V^\top = \sum_{i=1}^r \sigma_i u_i v_i^\top$ and rank: $\operatorname{rank}(A) = \operatorname{rank}(A^\top A) = \operatorname{rank}(AA^\top)$
- Trace of a symmetric matrix = sum of eigenvalues (cyclic property of trace + orthogonal EVD)
- Frobenius norm: singular-value definition vs. entrywise definition; $\|A\|_F^2 = \operatorname{Tr}(A^\top A) = \langle A, A\rangle$
- Rayleigh-quotient bounds for symmetric $A$: $\lambda_{\min}(A)\|x\|_2^2 \le x^\top Ax \le \lambda_{\max}(A)\|x\|_2^2$
- Second-order optimality: critical point + $\lambda_{\min}(\nabla^2 g(w_0)) < 0$ $\Rightarrow$ not a local minimum (strict saddle direction)
- Norms: convexity (triangle inequality + homogeneity); failure of strict convexity (collinear points)

## Worked problems / derivations
**P1 (Q1).** For $A \in \mathbb{R}^{m,n}$, prove

$$\operatorname{rank}(A) = \operatorname{rank}(A^\top A) = \operatorname{rank}(AA^\top)$$

Technique: SVD

$$A = \sum_{i=1}^r \sigma_i u_i v_i^\top$$

with $r = \operatorname{rank}(A)$; orthogonality of $U$ gives

$$A^\top A = V\Sigma^\top\Sigma V^\top = \sum_{i=1}^r \sigma_i^2 v_i v_i^\top$$

(rank $r$), and symmetrically

$$AA^\top = \sum_{i=1}^r \sigma_i^2 u_i u_i^\top$$

**P2 (Q2).** For symmetric $A \in \mathbb{R}^{n,n}$, prove

$$\operatorname{Tr}(A) = \sum_{i=1}^n \lambda_i(A)$$

Technique: orthogonal EVD $A = UDU^\top$; cyclic property:

$$\operatorname{Tr}(UDU^\top) = \operatorname{Tr}(U^\top UD) = \operatorname{Tr}(D) = \sum_i \lambda_i(A)$$

**P3 (Q3).** With

$$\|A\|_F := \sqrt{\sum_{i=1}^{\min\{m,n\}} \sigma_i^2(A)}$$

, prove

$$\|A\|_F = \sqrt{\sum_{i=1}^m\sum_{j=1}^n A_{ij}^2}$$

Technique: $\sigma_1^2(A),\dots$ are the eigenvalues of $A^\top A$; by P2,

$$\sum_i \sigma_i^2(A) = \operatorname{Tr}(A^\top A) = \langle A, A\rangle = \sum_{ij} A_{ij}^2$$

, using $\operatorname{Tr}(X^\top Y) = \langle X, Y\rangle$.

**P4 (Q4).** For symmetric $A$ and $x \in \mathbb{R}^n$, prove

$$\|x\|_2^2\,\lambda_{\min}(A) \le x^\top Ax \le \|x\|_2^2\,\lambda_{\max}(A)$$

Technique: EVD $A = UDU^\top$, substitute $q := U^\top x$:

$$x^\top Ax = q^\top Dq = \sum_i q_i^2\lambda_i(A) \le \lambda_{\max}(A)\|q\|_2^2$$

; orthogonality preserves norms,

$$\|q\|_2^2 = x^\top UU^\top x = \|x\|_2^2$$

; lower bound analogous.

**P5 (Q5).** Let $g \in C^2(\mathbb{R}^d)$, $\nabla g(w_0) = 0$, and $\lambda_{\min}(\nabla^2 g(w_0)) < 0$. Prove $w_0$ is not a local minimum.
Technique: take unit eigenvector $v$ of $\lambda_{\min}$ and restrict to the line $f(t) := g(w_0 + tv)$. Then $f'(t) = \nabla g(w_0+tv)^\top v$, $f''(t) = v^\top\nabla^2 g(w_0+tv)v$, so $f'(0) = 0$ and

$$f''(0) = \lambda_{\min}(\nabla^2 g(w_0))\|v\|_2^2 < 0$$

. Continuity of $f''$ gives $\delta > 0$ with $f'' < 0$ on $(-\delta,\delta)$ $\Rightarrow$ $f'$ decreasing $\Rightarrow$ $f'(t) < f'(0) = 0$ on $(0,\delta)$ $\Rightarrow$ $f$ strictly decreasing on $[0,\delta)$ $\Rightarrow$ $0$ is not a local min of $f$, hence $w_0$ is not a local min of $g$.

**P6 (Q6).** Prove every norm $\|\cdot\|$ on $\mathbb{R}^d$ is convex but not strictly convex.
Technique: convexity — triangle inequality then absolute homogeneity:

$$\|\lambda x + (1-\lambda)y\| \le \|\lambda x\| + \|(1-\lambda)y\| = \lambda\|x\| + (1-\lambda)\|y\|$$

. Not strict — pick collinear $y = 2x$ with $x \ne 0$:

$$\|\lambda x + (1-\lambda)2x\| = (\lambda + 2(1-\lambda))\|x\| = \lambda\|x\| + (1-\lambda)\|2x\|$$

, i.e., equality holds for $\lambda \in (0,1)$.

## Key formulas & facts
- SVD: $A = U\Sigma V^\top = \sum_{i=1}^r \sigma_i u_i v_i^\top$, $r = \operatorname{rank}(A)$; $A^\top A = \sum_i \sigma_i^2 v_i v_i^\top$, $AA^\top = \sum_i \sigma_i^2 u_i u_i^\top$ — so $\sigma_i^2(A)$ are the nonzero eigenvalues of both Gram matrices.
- $\operatorname{rank}(A) = \operatorname{rank}(A^\top A) = \operatorname{rank}(AA^\top)$.
- Symmetric $A$: $\operatorname{Tr}(A) = \sum_{i=1}^n \lambda_i(A)$; cyclic property $\operatorname{Tr}(XYZ) = \operatorname{Tr}(ZXY)$.
- $\|A\|_F^2 = \sum_i \sigma_i^2(A) = \operatorname{Tr}(A^\top A) = \langle A,A\rangle = \sum_{ij}A_{ij}^2$; identity $\operatorname{Tr}(X^\top Y) = \langle X,Y\rangle$.
- Rayleigh bounds (symmetric $A$): $\lambda_{\min}(A)\|x\|_2^2 \le x^\top Ax \le \lambda_{\max}(A)\|x\|_2^2$; multiplication by an orthogonal matrix preserves $\ell_2$ norm.
- Second-order necessary condition: local min $\Rightarrow$ $\nabla g(w_0) = 0$ and $\nabla^2 g(w_0) \succeq 0$; contrapositive proved here via 1-D restriction $f(t) = g(w_0 + tv)$ with $f'(t) = \nabla g(w_0+tv)^\top v$, $f''(t) = v^\top \nabla^2 g(w_0+tv)v$.
- Norm properties used: triangle inequality, absolute homogeneity $\|\alpha x\| = |\alpha|\|x\|$; every norm is convex; no norm is strictly convex (equality along rays through the origin).

## Exam-relevant nuggets
- These six proofs are the standard toolbox invoked inside longer FODL exam solutions: rank of Gram matrices and $\sigma_i^2(A) = \lambda_i(A^\top A)$ appear in matrix-factorization/expressiveness questions; the Rayleigh bound is used constantly in GD convergence analyses (bounding $x^\top H x$ by extreme eigenvalues).
- P5 is exactly the "strict saddle" argument used in the optimization pillar (why negative curvature at a critical point means escape directions exist); reproducing the restriction-to-a-line proof is classic exam material.
- Know both definitions of the Frobenius norm (singular values vs. entries) and the bridging identity $\|A\|_F^2 = \operatorname{Tr}(A^\top A)$ — often a one-line step in balancedness/gradient-flow questions.
- The "norms are convex but never strictly convex" fact (counterexample: collinear points $x, 2x$) is a quick true/false-style item; remember the equality case of the triangle inequality along rays.
- Master the substitution $q = U^\top x$ and the fact that orthogonal changes of basis preserve $\ell_2$ norms — it silently powers P4 and countless conditioning arguments.
