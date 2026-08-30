# Lecture 8 – Generalization 3
- **File:** materials/lectures/lecture_08_generalization_3.pdf | **Text:** materials/text/lectures/lecture_08_generalization_3.txt
- **Pillar:** Generalization
- **One-paragraph summary:** Continues implicit regularization in the canonical testbed of **matrix sensing / matrix completion**: recover a low-rank ground truth $W^*\in\mathbb{R}^{d,d'}$ from $m<d\cdot d'$ linear measurements. Classically one relaxes the (hard) rank-minimization program to nuclear-norm minimization, which under RIP and $m\in\Omega(r(d+d')\log(d+d'))$ recovers $W^*$ (Recht et al.). The DL route — **(deep) matrix factorization (MF)**: overparameterize $L_S$ with a linear neural network with non-restrictive hidden dimensions and run gradient-based optimization — empirically biases toward low rank under small learning rate and near-zero initialization. The lecture (i) presents Gunasekar et al.'s conjecture that depth-2 MF implicitly minimizes nuclear norm (proven in special cases, false in general); (ii) develops **trajectory analysis**: along GF from balanced initialization, the E2E matrix admits an analytic SVD and its signed singular values obey $\dot\sigma_r=-N(\sigma_r^2)^{1-1/N}\langle\nabla L_S(W_{1:N}),u_rv_r^\top\rangle$ — a depth-driven "rich get richer" dynamic (large singular values accelerate, small ones stall, sharper with larger $N$) that promotes approximately low-rank solutions; and (iii) **refutes norm minimization**: on the completion problem $\begin{pmatrix}?&1\\1&0\end{pmatrix}$, GF with $\det(W_{1:N}(0))>0$ drives the unobserved entry (hence every norm) to $\infty$ while the distance to rank 1 tends to 0 — so the implicit bias of MF is rank (not norm) minimization. Extensions: tensor factorizations (convolutional arithmetic circuits) show implicit bias toward low tensor rank.

## Outline
1. **Implicit Regularization (cont')**
   - 1.1 **Matrix Factorization.** Matrix sensing/completion setting; rank minimization and its convex nuclear-norm surrogate; deep MF as overparameterization with a linear neural network; empirical low-rank bias.
     - 1.1.1 **Norm Minimization?** Gunasekar et al.'s conjecture (depth-2 MF = nuclear-norm minimization): proven in special cases, empirically false in general.
     - 1.1.2 **Trajectory Analysis.** Analytic SVD of the E2E matrix along GF (Lem 1); dynamics of signed singular values (Thm 1); interpretation: depth sharpens the low-rank bias; experiments (depth 1/2/3).
     - 1.1.3 **No Norm Minimization.** The $\begin{pmatrix}?&1\\1&0\end{pmatrix}$ completion problem where norm and rank minimization conflict; Prop 1: all norms $\to\infty$ while rank $\to1$.
   - **Extensions.** Tensor sensing via tensor factorizations (= convolutional arithmetic circuits) ⇒ implicit bias toward low tensor rank.

## Key definitions
**Def (matrix sensing setting).** Instance space $X\in\mathbb{R}^{d,d'}$ (sensing matrices); label space $Y=\mathbb{R}$; loss $\ell(y,\hat y)=\frac12(y-\hat y)^2$; hypotheses space $H=\{X\mapsto\langle X,W\rangle\in\mathbb{R} : W\in\mathbb{R}^{d,d'}\}$. **Realizability:** $\exists W^*\in\mathbb{R}^{d,d'}$ s.t. $(X,y)\sim D\Rightarrow y=\langle X,W^*\rangle$ w.p. 1; $W^*$ has low rank. Task: recover $W^*$ from $m$ linear measurements; interesting regime $m<d\cdot d'$ (underdetermined). **Matrix completion** = the special case where sensing matrices are indicators (one 1, rest 0s); cf. recommender systems / Netflix Prize.

**Def (rank minimization & nuclear-norm surrogate).** Ideal: $\hat W=\operatorname{argmin}_{W\in\mathbb{R}^{d,d'}}\ \mathrm{rank}(W)$ s.t. $\langle X_i,W\rangle=y_i\ \forall i\in[m]$ — worst-case computationally hard. Convex surrogate (Equation (1) of the lecture):
$$\hat W=\operatorname{argmin}_{W\in\mathbb{R}^{d,d'}}\ \|W\|_{nuclear}\quad\text{s.t. }\forall i\in[m]:\langle X_i,W\rangle=y_i,$$
$\|\cdot\|_{nuclear}$ = sum of singular values. If $\{X_i\}$ satisfy a "restricted isometry" property and $m\in\Omega(r(d+d')\cdot\log(d+d'))$ ($r=\mathrm{rank}(W^*)$), the surrogate's solution optimally solves the original problem (Recht et al. [5]).

**Def ((deep) matrix factorization).** Overparameterize $L_S(W)=\frac{1}{2m}\sum_{i=1}^m(\langle X_i,W\rangle-y_i)^2$ by a linear neural network:
$$\phi:\mathbb{R}^{d_1,d'}\times\mathbb{R}^{d_2,d_1}\times\cdots\times\mathbb{R}^{d_{N-1},d_{N-2}}\times\mathbb{R}^{d,d_{N-1}}\to\mathbb{R}_{\ge0},\qquad \phi(W_1,\dots,W_N)=L_S(W_NW_{N-1}\cdots W_1),$$
and run gradient-based optimization on $\phi$. Hidden dimensions can explicitly cap the rank; the interesting (implicit-regularization) regime is **non-restrictive** hidden dimensions: $\min\{d_1,\dots,d_{N-1}\}\ge\min\{d,d'\}$. E2E matrix: $W_{1:N}(t):=W_N(t)W_{N-1}(t)\cdots W_1(t)$.

**Def (balanced initialization).** $W_{j+1}(0)^\top W_{j+1}(0)=W_j(0)W_j(0)^\top$ for every $j\in[N-1]$.

**Def (analytic SVD; from Lem 1).** Along GF, $W_{1:N}(t)=U(t)S(t)V(t)^\top$ where $U(t)\in\mathbb{R}^{d,\min\{d,d'\}}$, $S(t)\in\mathbb{R}^{\min\{d,d'\},\min\{d,d'\}}$, $V(t)\in\mathbb{R}^{d',\min\{d,d'\}}$ are **analytic** in $t$ (infinitely differentiable, Taylor series converges around every point); for every $t$, $U(t),V(t)$ have orthonormal columns and $S(t)$ is diagonal — its diagonal entries $\sigma_1(t),\dots,\sigma_{\min\{d,d'\}}(t)$ are the **signed singular values** (may be negative, in any order); columns $u_r(t)$ of $U(t)$ / $v_r(t)$ of $V(t)$ are the left/right singular vectors.

## Key theorems & results
**Lem 1 (analytic SVD; stated without proof).** For GF on $\phi(\cdot)$, the E2E matrix $W_{1:N}(t)$ admits an analytic SVD as defined above (no balancedness needed for this lemma).

**Thm 1 (singular-value dynamics).** For GF on $\phi(\cdot)$ from a **balanced initialization**:
$$\forall t\in\mathbb{R}_{\ge0},\ \forall r\in[\min\{d,d'\}]:\qquad \dot\sigma_r(t)=-N\big(\sigma_r(t)^2\big)^{1-\frac1N}\cdot\big\langle\nabla L_S(W_{1:N}(t)),\,u_r(t)v_r(t)^\top\big\rangle .$$
Proof idea: differentiate the analytic SVD: $\dot W_{1:N}=\dot USV^\top+U\dot SV^\top+US\dot V^\top$; multiply by $U^\top(\cdot)V$ and take the $r$-th diagonal entry — the $\dot U,\dot V$ terms vanish since $\langle u_r,\dot u_r\rangle=\frac{d}{dt}\frac12\|u_r\|^2=0=\langle\dot v_r,v_r\rangle$; plug the balanced-init E2E dynamics $\dot W_{1:N}=-\sum_{j=1}^N[W_{1:N}W_{1:N}^\top]^{\frac{j-1}{N}}\nabla L_S(W_{1:N})[W_{1:N}^\top W_{1:N}]^{\frac{N-j}{N}}$ and use orthonormality of $U,V$ columns: each of the $N$ summands contributes $(\sigma_r^2)^{\frac{j-1}{N}}(\sigma_r^2)^{\frac{N-j}{N}}=(\sigma_r^2)^{1-\frac1N}$.
Exam relevance: the most quotable formula of the lecture; proof was given in full and is a natural exam question.

**Interpretation of Thm 1 (results).** Given a value of $W_{1:N}(t)$, depth $N$ affects the velocity $\dot\sigma_r(t)$ **only** through the factor $N(\sigma_r(t)^2)^{1-\frac1N}$; for $N=1$ (classic linear predictor) the factor reduces to 1; for $N\ge2$ it **speeds up large** singular values and **slows down small** ones, more potently for larger $N$. Consequence: with depth $\ge2$, GD (small LR, near-zero init) yields singular values that barely move near zero, then move rapidly past a threshold — a sharper slow-to-rapid transition for deeper MF — promoting solutions with few large and many small singular values, i.e., **approximately low rank**. Empirics (figure + handwritten note): reconstruction errors for depth 1/2/3 were 8e-01 / 6e-02 / 3e-05; "adding depth makes small singular vals move slow and large ones move fast, resulting in lower rank solution (stronger implicit bias towards low rank)." Further support: Li et al. [4]; practical use: implicit rank-minimizing autoencoder (Jing et al. [2]).

**Conjecture (Gunasekar et al. [1]; refuted in general).** GD (small LR, near-zero init) over **depth-2** MF returns $\hat W=\arg\min_{W}\|W\|_{nuclear}$ s.t. $\langle X_i,W\rangle=y_i\ \forall i$ — i.e., implicitly solves the convex surrogate. Status: proven in certain special cases (Gunasekar et al. [1], Li et al. [3]); empirical evidence says it does **not** hold in general.

**Exercise (norm–rank conflict on the completion problem (2)).** For $\begin{pmatrix}?&1\\1&0\end{pmatrix}$ (unseen entry $?$), solution set $S=\{W\in\mathbb{R}^{2,2}:(W)_{1,2}=1,(W)_{2,1}=1,(W)_{2,2}=0\}$: (1) for **any** norm $\|\cdot\|_*$ on $\mathbb{R}^{2,2}$, $\min_{S}\|\cdot\|_*$ is attained at finite $?$, and $\big\|\begin{pmatrix}?&1\\1&0\end{pmatrix}\big\|_*\to\infty$ as $|?|\to\infty$; (2) every $W\in S$ has rank 2, but as $|?|\to\infty$ the distance of $\begin{pmatrix}?&1\\1&0\end{pmatrix}$ to the closest rank-1 matrix tends to 0. Hence norm minimization requires finite $?$ while rank minimization requires $|?|\to\infty$ — MF's implicit bias must choose.

**Prop 1 (no norm minimization).** Train a depth $N\ge2$ MF on completion problem (2) via GF from a balanced initialization with $\det(W_{1:N}(0))>0$. If optimization converges to a global minimizer, $\lim_{t\to\infty}\phi(W_1(t),\dots,W_N(t))=0$, then necessarily $\lim_{t\to\infty}(W_{1:N}(t))_{1,1}=\infty$; hence $\lim_{t\to\infty}\|W_{1:N}(t)\|_*=\infty$ for **every** norm $\|\cdot\|_*$, while the distance between $W_{1:N}(t)$ and the closest rank-1 matrix tends to 0.
Proof idea: w.l.o.g. $\sigma_r(0)>0$ (flip signs of $\sigma_r,u_r$); solving Thm 1's ODE gives, with $g(t):=-N\langle\nabla L_S(W_{1:N}(t)),u_r(t)v_r(t)^\top\rangle$,
$$\sigma_r(t)=\begin{cases}\sigma_r(0)\cdot\exp\big(\int_0^t g(t')dt'\big), & N=2\\[2pt] \Big(\sigma_r(0)^{\frac2N-1}+\big(\frac2N-1\big)\int_0^t g(t')dt'\Big)^{\frac{1}{\frac2N-1}}, & N\ge3\end{cases}$$
so $\sigma_r(t)>0$ for all $t$ ⇒ $\det(W_{1:N}(t))\neq0$, and by continuity the determinant keeps its positive sign ⇒ $(W_{1:N})_{1,1}(W_{1:N})_{2,2}-(W_{1:N})_{1,2}(W_{1:N})_{2,1}>0$ (Eq. (3)); global convergence forces $(W_{1:N})_{1,2},(W_{1:N})_{2,1}\to1$, $(W_{1:N})_{2,2}\to0$, so $(W_{1:N})_{1,1}\to\infty$.
Exam relevance: refutes "implicit regularization in MF = minimization of some norm" — there exist settings where the bias drives **all norms to $\infty$ while minimizing rank**; holds empirically and in more general settings.

**Extensions (stated).** MF = matrix (2D array) sensing via linear neural networks, biased toward low rank. Generalizing to **tensor sensing via tensor factorizations**, which correspond to convolutional arithmetic circuits, yields an implicit bias toward **low tensor rank** (rank notion determined by the factorization type).

## Techniques & tricks
- Convex relaxation of rank: replace $\mathrm{rank}(W)$ by $\|W\|_{nuclear}$; RIP conditions transfer surrogate optimality back to the original problem.
- **Trajectory (dynamical) analysis** as an alternative to characterizing implicit bias as minimization of a static complexity measure — analyze the course of learning under GF.
- Differentiating a (time-)analytic SVD; extracting diagonal ODEs by sandwiching with $U^\top(\cdot)V$; killing $\dot U,\dot V$ terms via constancy of singular-vector norms ($\langle u_r,\dot u_r\rangle=0$).
- Balanced initialization ⇒ E2E gradient-flow dynamics with fractional matrix powers $[W_{1:N}W_{1:N}^\top]^{\frac{j-1}{N}}$, evaluated on singular directions to become scalar powers $(\sigma_r^2)^{1-\frac1N}$.
- Solving the separable ODE $\dot\sigma=g(t)\,\sigma^{2-\frac2N}$: exponential solution for $N=2$; power-law form with exponent $\frac{1}{\frac2N-1}$ for $N\ge3$; positivity of solutions from the closed form.
- Sign-preservation argument: a continuous, never-vanishing $\det(W_{1:N}(t))$ cannot change sign — turns an initialization condition ($\det>0$) into an invariant along the trajectory.
- Constructing minimal counterexamples where two candidate complexity measures (norm vs rank) provably conflict, then letting the dynamics reveal which one the bias follows.
- w.l.o.g. sign-flips $(\sigma_r,u_r)\to(-\sigma_r,-u_r)$ exploiting the sign ambiguity of the (signed) SVD.

## Exam-relevant nuggets
- The singular-value dynamics formula $\dot\sigma_r(t)=-N(\sigma_r(t)^2)^{1-\frac1N}\langle\nabla L_S(W_{1:N}(t)),u_r(t)v_r(t)^\top\rangle$ — know it cold, including where balancedness enters (E2E dynamics; Lem 1's analytic SVD itself needs no balancedness).
- $N=1$ ⇒ factor is 1 (no bias from the factor); $N\ge2$ ⇒ movement of large (small) singular values sped up (slowed down); effect stronger with depth. This is *the* mechanism for approximate low rank.
- Interesting regime declarations: $m<d\cdot d'$ (underdetermined sensing) and $\min\{d_1,\dots,d_{N-1}\}\ge\min\{d,d'\}$ (hidden dims non-restrictive — otherwise rank is *explicitly* constrained).
- Nuclear norm = sum of singular values; recovery guarantee needs RIP + $m\in\Omega(r(d+d')\log(d+d'))$.
- Gunasekar conjecture: depth-2 MF ⇒ nuclear-norm minimization — proven only in special cases, **false in general**; the lecture's Prop 1 is the refutation vehicle.
- Prop 1's hypotheses checklist: depth $N\ge2$, GF, balanced init, $\det(W_{1:N}(0))>0$, convergence to zero loss. Conclusion: $(W_{1:N})_{1,1}\to\infty$, all norms $\to\infty$, distance to rank-1 $\to0$.
- The ODE closed forms (exponential for $N=2$; $\big(\sigma_r(0)^{\frac2N-1}+(\frac2N-1)\int_0^tg\big)^{1/(\frac2N-1)}$ for $N\ge3$) and their use: positivity of $\sigma_r(t)$ ⇒ determinant never vanishes.
- $2\times2$ determinant inequality (Eq. (3)) + fitted entries $(W)_{1,2},(W)_{2,1}\to1$, $(W)_{2,2}\to0$ force the blow-up — a short, self-contained argument examiners like.
- Slogan: in MF, implicit regularization is **not** norm minimization; it is (approximate) **rank minimization** — "drives all norms toward infinity while minimizing rank."
- Empirical anchors: depth-1/2/3 reconstruction errors 8e-01/6e-02/3e-05; unobserved entry $|?|$ grows as training loss decreases (det>0 setting), matching theory.
- Extension keyword pairing: tensor factorization ↔ convolutional arithmetic circuits ↔ low **tensor** rank (rank type depends on factorization).
