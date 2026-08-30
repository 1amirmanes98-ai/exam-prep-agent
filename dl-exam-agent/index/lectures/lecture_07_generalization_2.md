# Lecture 7 – Generalization 2
- **File:** materials/lectures/lecture_07_generalization_2.pdf | **Text:** materials/text/lectures/lecture_07_generalization_2.txt
- **Pillar:** Generalization
- **One-paragraph summary:** Introduces **implicit regularization (implicit bias)**: in overparametrized DL there are many empirical-loss minimizers, and gradient-based optimization tends to select ones that are "simple" under some complexity measure, which under natural distributions correlates with generalization (Occam's razor). Rather than postulating complexity measures for bounds (Lecture 6), this lecture characterizes the bias directly in three settings. (i) Overparametrized linear regression ($d>m$, $\mathrm{rank}(X)=m$, $\ell_2$ loss): any iterative method initialized at $w^{(0)}=0$ whose updates lie in the span of sample gradients (GD/SGD ± momentum) that reaches zero loss converges to $X(X^\top X)^{-1}y$ — the **minimal Euclidean norm** interpolator. (ii) Ultra-wide networks in the NTK regime inherit this: the learned predictor is the minimal-RKHS-norm interpolator, independent of which feature map realizes the kernel. (iii) Binary classification of linearly separable data with the exponential loss: gradient flow on a linear predictor — and on a **linear neural network of any depth** from balanced initialization — has $\|w(t)\|\to\infty$ with the direction $w(t)/\|w(t)\|$ converging to the hard-SVM **maximum margin** solution $u^*$ (Ji–Telgarsky). Notably the result is depth-oblivious; extensions where depth does matter (linear convolutional networks) and homogeneous networks (margin maximization, Lyu–Li) close the lecture.

## Outline
1. **Implicit Regularization.** The concept: gradient-based optimization selects "simple" minimizers among the many zero-training-loss solutions; complementary route to Lecture 6's bounds.
   - 1.1 **Linear Regression.** Zero-initialized span-of-gradients methods converge to the minimum $\ell_2$-norm global minimizer $X(X^\top X)^{-1}y$ (Prop 1, Lem 1, Cor 1).
   - 1.2 **Ultra-Wide Neural Networks.** NTK regime ⇒ learned predictor is the kernel interpolator $x\mapsto [K_{NTK}(x,x_1),\dots,K_{NTK}(x,x_m)](H^*)^{-1}y$; implicit regularization = minimal RKHS norm.
   - 1.3 **Classification of Linearly Separable Data** (Ji–Telgarsky [2]). Exponential loss, GF.
     - 1.3.1 **Preliminaries.** Hard-SVM facts, support vectors, the constant $\delta>0$ (Lem 2).
     - 1.3.2 **Linear predictors.** Lem 3 (perpendicular component self-corrects) and Thm 1: $w(t)/\|w(t)\|\to u^*$.
     - 1.3.3 **Linear Neural Networks.** End-to-end dynamics; Thm 2: under balanced init, $W_{1:N}(t)/\|W_{1:N}(t)\|\to u^*$ for any depth $N$.
     - 1.3.4 **Extensions.** Depth-obliviousness limitation; linear convolutional networks (depth matters); homogeneous networks maximize a normalized margin.

## Key definitions
**Def (implicit regularization / implicit bias).** The tendency of gradient-based optimization, among the many empirical-loss minimizers of an overparametrized model, to select solutions that are "simple" per some complexity measure; under natural data distributions such simplicity is often associated with better generalization.

**Def (overparametrized linear regression setting).** $X=\mathbb{R}^d$, $Y=\mathbb{R}$, $H=\{x\mapsto\langle x,w\rangle : w\in\mathbb{R}^d\}$, $\ell_{(x,y)}(w):=\frac{1}{2}(y-\langle x,w\rangle)^2$. With $X:=[x_1,\dots,x_m]\in\mathbb{R}^{d\times m}$ (instances as columns) and $y=[y_1,\dots,y_m]\in\mathbb{R}^m$: $L_S(w)=\frac{1}{2m}\|X^\top w-y\|^2$. Overparametrized regime: $d>m$ and $\mathrm{rank}(X)=m$ (instances linearly independent) ⇒ multiple global minima for any $y$.

**Def (NTK objects).** For an ultra-wide network in the NTK regime, the output on input $x$ with learned weights $w$ is $\langle\phi(x),w\rangle$, where $\phi$ is the feature map defining the NTK: $K_{NTK}(x,x'):=\langle\phi(x),\phi(x')\rangle$; $\Phi:=[\phi(x_1),\dots,\phi(x_m)]$; Gram matrix $H^*:=\Phi^\top\Phi\in\mathbb{R}^{m\times m}$, $(H^*)_{i,j}=K_{NTK}(x_i,x_j)$. A feature map $\psi$ "realizes" the NTK if $K_{NTK}(x,x')=\langle\psi(x),\psi(x')\rangle$ for all $x,x'$.

**Def (separable classification setting).** $X=\{x\in\mathbb{R}^d:\|x\|\le 1\}$, $Y=\{+1,-1\}$, exponential loss $\ell(y,\hat y)=e^{-y\hat y}$. $S=\{(x_i,y_i)\}_{i=1}^m$ is **linearly separable**: $\exists u\in\mathbb{R}^d$ with $y_i\langle u,x_i\rangle>0\ \forall i\in[m]$. For linear predictors the training loss is $L_S(w)=\frac{1}{m}\sum_{i=1}^m e^{-\langle w,z_i\rangle}$ with $z_i:=y_ix_i$.

**Def (maximum margin & max-margin solution).** $\gamma:=\max_{u\in\mathbb{R}^d,\|u\|=1}\min_{i\in[m]} y_i\langle u,x_i\rangle$ (separability $\iff\gamma>0$); $u^*:=\operatorname{argmax}_{u\in\mathbb{R}^d,\|u\|=1}\min_{i\in[m]} y_i\langle u,x_i\rangle$ — the hard-SVM solution.

**Hard-SVM facts (from intro ML, used as given).** $u^*$ exists and is unique; $\exists\,\alpha_1^*,\dots,\alpha_m^*\in\mathbb{R}_{\ge0}$ with $u^*=\sum_{i=1}^m\alpha_i^* y_i x_i=\sum_i \alpha_i^* z_i$; if $\alpha_i^*>0$ then $y_i\langle u^*,x_i\rangle=\gamma$ (margin attained).

**Def 1 (support vectors).** $z_i:=y_ix_i$; $I:=\{i\in[m]:\alpha_i^*>0\}$; the examples $\{z_i\}_{i\in I}$ are the support vectors. **Standing assumption:** $\mathrm{span}(\{z_i\}_{i\in I})=\mathbb{R}^d$.

**Def ($\delta$ and $\Pi^\perp$).** $\delta:=\min_{\xi\in\mathbb{R}^d,\|\xi\|=1,\xi\perp u^*}\max_{i\in I}\langle\xi,z_i\rangle$ (Lem 2: $\delta>0$). $\Pi^\perp:\mathbb{R}^d\to\mathbb{R}^d$ is the projection onto the orthogonal complement of $\mathrm{span}(\{u^*\})$: $\Pi^\perp w=w-\langle w,u^*\rangle u^*$.

**Def (linear neural network overparameterization).** Depth $N$, hidden widths $d_1,\dots,d_{N-1}$: $\phi(W_1,\dots,W_N)=L_S(W_N W_{N-1}\cdots W_1)$ with $W_{1:N}:=W_N\cdots W_1\in\mathbb{R}^{1,d}$ the **end-to-end (E2E) matrix**; GF: $\dot W_j(t)=-\frac{\partial}{\partial W_j}\phi(W_1(t),\dots,W_N(t))$ for all $j\in[N]$.

**Def (balanced initialization).** $\forall j\in[N-1]:\ W_{j+1}(0)^\top W_{j+1}(0)=W_j(0)W_j(0)^\top$.

**Def (homogeneous networks & their margin).** Models where scaling parameters $\Theta$ by $c>0$ scales the output by $c^N$ ($N$ = order of homogeneity; captures ReLU architectures without biases). Margin: $\gamma(\Theta):=\min_{i\in[m]} y_i\, h_{\Theta/\|\Theta\|_{Fro}}(x_i)=\frac{\min_{i\in[m]} y_i\, h_\Theta(x_i)}{\|\Theta\|_{Fro}^N}$.

## Key theorems & results
**Prop 1 (linear regression: where span-of-gradients methods land).** Minimize $L_S(w)$ with $w^{(0)}=0$ and iterates satisfying $w^{(t+1)}-w^{(t)}\in\mathrm{span}(\{\nabla\ell_{(x_i,y_i)}(w):i\in[m],w\in\mathbb{R}^d\})$ (includes GD and SGD, with/without momentum). If the iterates converge to a global minimizer (zero loss), that limit is $X(X^\top X)^{-1}y$.

**Proof idea:** $\nabla\ell_{(x_i,y_i)}(w)=(y_i-x_i^\top w)\cdot x_i\in\mathrm{span}(\{x_i\})$ ⇒ all iterates (and the limit — spans are topologically closed) lie in $\mathrm{span}(\{x_i\}_{i=1}^m)$, so $w^{(\infty)}=Xr$; zero loss ⇒ $X^\top Xr=y$ with $X^\top X$ invertible ($\mathrm{rank}(X)=m$) ⇒ $r=(X^\top X)^{-1}y$.

**Exam relevance:** cite exactly which algorithms are covered and why the limit stays in the span.

**Lem 1 (minimal-norm characterization).** Among all zero-loss solutions of $L_S$, $X(X^\top X)^{-1}y$ is the one with minimal Euclidean norm.

**Proof idea:** decompose a minimal-norm global minimizer $w^*=w_\parallel^*+w_\perp^*$ w.r.t. $\mathrm{span}(\{x_i\})$; $X^\top w^*=X^\top w_\parallel^*$ so $w_\parallel^*$ is also a global minimizer; Pythagoras forces $\|w_\perp^*\|=0$; in-span zero-loss solution is unique $=X(X^\top X)^{-1}y$.

**Cor 1.** Under Prop 1's conditions, optimization converges to the minimal Euclidean norm solution. (Implicit regularization of gradient-based optimization in linear regression, zero init = $\ell_2$-norm minimization.)

**Result (NTK regime).** Learned weights converge to $\Phi(\Phi^\top\Phi)^{-1}y$; prediction rule

$$x\mapsto\big\langle\phi(x),\Phi(\Phi^\top\Phi)^{-1}y\big\rangle=[K_{NTK}(x,x_1),\dots,K_{NTK}(x,x_m)]^\top (H^*)^{-1}y .$$

For **any** feature map $\psi$ realizing the NTK (with $\Psi:=[\psi(x_1),\dots,\psi(x_m)]$) the same rule equals $x\mapsto\langle\psi(x),\Psi(\Psi^\top\Psi)^{-1}y\rangle$ — the minimal-Euclidean-norm interpolating linear predictor in $\psi$'s feature space. Hence: implicit regularization of ultra-wide networks in the NTK regime = **norm minimization in the RKHS**.

**Exam relevance:** the rule depends on the kernel only, not on the feature-map realization.

**Lem 2 ($\delta>0$).** $\delta:=\min_{\xi:\|\xi\|=1,\xi\perp u^*}\max_{i\in I}\langle\xi,z_i\rangle>0$.

**Proof idea:** if some unit $\xi\perp u^*$ had $\max_{i\in I}\langle\xi,z_i\rangle\le0$, then $0=\langle\xi,u^*\rangle=\sum_{i\in I}\alpha_i^*\langle\xi,z_i\rangle$ with nonpositive summands and $\alpha_i^*>0$ forces $\langle\xi,z_i\rangle=0\ \forall i\in I$; since $\{z_i\}_{i\in I}$ spans $\mathbb{R}^d$, $\xi=0$ — contradiction.

**Lem 3 (gradient pushes the perpendicular part back).** Let $w\in\mathbb{R}^d$ with $\langle w,u^*\rangle\ge0$ and $\|\Pi^\perp w\|\ge\frac{1+\ln(m)}{\delta}$. Then $\langle\Pi^\perp w,\nabla L_S(w)\rangle\ge 0$.

**Proof idea:** pick support vector $z'\in\operatorname{argmax}_{z\in\{z_i\}_{i\in I}}\langle-\Pi^\perp w,z\rangle$, so $\langle-\Pi^\perp w,z'\rangle\ge\delta\|\Pi^\perp w\|$; split $\langle\Pi^\perp w,\nabla L_S(w)\rangle=\frac1m\sum_i e^{-\langle w,z_i\rangle}\langle-\Pi^\perp w,\Pi^\perp z_i\rangle$ into the $z'$ term, lower-bounded by $\frac1m e^{-\gamma\langle w,u^*\rangle}e^{\delta\|\Pi^\perp w\|}\delta\|\Pi^\perp w\|$ (using $z'=\Pi^\perp z'+\gamma u^*$), and the terms with $\langle\Pi^\perp w,\Pi^\perp z_i\rangle\ge0$, each lower-bounded by $-e^{-\gamma\langle w,u^*\rangle}\cdot\frac1e$ via $-\beta e^{-\beta}\ge-e^{-1}$; the threshold $\|\Pi^\perp w\|\ge\frac{1+\ln m}{\delta}$ makes the positive term dominate.

**Exam relevance:** the exact threshold $\frac{1+\ln(m)}{\delta}$ and the role of the assumption $\langle w,u^*\rangle\ge 0$.

**Thm 1 (GF on linear predictors → max margin).** Let $w(t)$ be a GF trajectory, $\dot w(t)=-\nabla L_S(w(t))$, with $\lim_{t\to\infty}L_S(w(t))=0$. Then

$$\lim_{t\to\infty}\frac{w(t)}{\|w(t)\|}=u^*.$$

**Proof idea:** loss $\to0$ ⇒ every $e^{-\langle w(t),z_i\rangle}\to0$ ⇒ $\|w(t)\|\to\infty$ and $\exists t_0$: $\langle w(t),z_i\rangle\ge0\ \forall i,t\ge t_0$ ⇒ $\langle w(t),u^*\rangle=\sum_i\alpha_i^*\langle w(t),z_i\rangle\ge0$; $\frac{d}{dt}\|\Pi^\perp w(t)\|^2=-2\langle\Pi^\perp w(t),\nabla L_S(w(t))\rangle\le0$ whenever $\|\Pi^\perp w(t)\|\ge\frac{1+\ln m}{\delta}$ (Lem 3) ⇒ $\|\Pi^\perp w(t)\|\le R:=\max\{\|\Pi^\perp w(t_0)\|,\frac{1+\ln m}{\delta}\}$ for all $t\ge t_0$ (else a mean-value-theorem contradiction at the last crossing of $R$); bounded $\|\Pi^\perp w\|$ + $\|w\|\to\infty$ ⇒ $w/\|w\|\to u^*$.

**Exam relevance:** proof given in full — canonical exam material; note the loss infimum is not attained, only the direction converges.

**Thm 2 (GF on deep linear networks → max margin).** Let $(W_1(t),\dots,W_N(t))$ be a GF trajectory of $\phi(\cdot)$ from a **balanced initialization**, with $\lim_{t\to\infty}\phi(W_1(t),\dots,W_N(t))=0$. Then, viewing $W_{1:N}(t)\in\mathbb{R}^{1,d}$ as a vector,

$$\lim_{t\to\infty}\frac{W_{1:N}(t)}{\|W_{1:N}(t)\|}=u^*.$$

**Proof idea:** balancedness gives the E2E dynamics $\dot W_{1:N}=-\sum_{j=1}^N[W_{1:N}W_{1:N}^\top]^{\frac{j-1}{N}}\nabla\ell(W_{1:N})[W_{1:N}^\top W_{1:N}]^{\frac{N-j}{N}}$, which for a row vector $w(t):=W_{1:N}(t)$ becomes $\dot w=-\|w\|^{\frac{2(N-1)}{N}}\nabla L_S(w)-(N-1)\|w\|^{-\frac2N}\langle\nabla L_S(w),w\rangle w$; suffices to show $\frac{\|\Pi^\perp w(t)\|^2}{\|w(t)\|^2}\to0$; via the quotient rule, when the ratio $\ge\epsilon$ and $\|w\|^2\ge\frac{(1+\ln m)^2}{\delta^2\epsilon}$, $\frac{d}{dt}\frac{\|\Pi^\perp w\|^2}{\|w\|^2}\le 2\|w\|^{-\frac2N}\langle\nabla L_S(w),w\rangle\epsilon=-\frac{\epsilon}{N}\frac{d}{dt}\ln(\|w\|^2)<0$ (using Lem 3 and $\langle\nabla L_S(w),w\rangle=-\frac1m\sum_ie^{-\langle w,z_i\rangle}\langle w,z_i\rangle<0$); integrating, if the ratio stayed $\ge\epsilon$ the RHS drop would be $-\frac{\epsilon}{N}[\ln\|w(t')\|^2-\ln\|w(t)\|^2]\to-\infty$ — contradiction, so the ratio eventually drops below any $\epsilon$ and stays there.

**Exam relevance:** statement + role of balanced initialization; the result holds for **any depth $N$** — same limit $u^*$.

**Exercise (E2E dynamics in vector form).** Given the E2E dynamics above with $W_{1:N}(t)\in\mathbb{R}^{1,d}$, prove

$$\frac{d}{dt}W_{1:N}(t)=-\|W_{1:N}(t)\|_{Fro}^{\frac{2(N-1)}{N}}\cdot\nabla L_S(W_{1:N}(t))-(N-1)\|W_{1:N}(t)\|_{Fro}^{-\frac2N}\cdot\big\langle\nabla L_S(W_{1:N}(t)),W_{1:N}(t)\big\rangle\cdot W_{1:N}(t).$$

**Extensions (1.3.4, stated results).** (i) The above is depth-oblivious — depths $1$, $2$, $\ge3$ give the same implicit bias, unlike practice; with certain "convolutional" variants of linear networks depth does change the implicit bias (Gunasekar et al. [1]). (ii) For homogeneous networks of order $N$, under certain conditions GD returns an approximate solution to $\max_\Theta\gamma(\Theta)$, i.e., maximizes the normalized margin (Lyu–Li [3]). (iii) Thm 2 extends to GD with decreasing learning rate and arbitrary (non-balanced) initialization; verified empirically (figure: GD on synthetic 2D separable data, depth-4 LNN and depth-1 predictor both converge to the max-margin direction; from Ji–Telgarsky, "GD Aligns the Layers of Deep Linear Networks").

## Techniques & tricks
- **Span invariance:** updates built from sample gradients stay in $\mathrm{span}(\{x_i\})$; subspaces are topologically closed, so limits stay there too; then solve the zero-loss linear system in the span coordinates.
- **Orthogonal decomposition + Pythagoras** to prove minimal-norm claims ($w^*=w_\parallel^*+w_\perp^*$; kill the perpendicular part).
- **Kernel-only dependence:** rewriting $\langle\phi(x),\Phi(\Phi^\top\Phi)^{-1}y\rangle$ purely via $K_{NTK}$ and the Gram matrix $H^*$, showing independence of the feature-map realization.
- **Dual/support-vector expansion** $u^*=\sum_i\alpha_i^*z_i$ to convert statements about $u^*$ into statements about support vectors (Lem 2, positivity of $\langle w,u^*\rangle$).
- **Support-vector decomposition** $z'=\Pi^\perp z'+\gamma u^*$ (valid since $\langle u^*,z'\rangle=\gamma$ on the support) to factor $e^{-\langle w,z'\rangle}=e^{-\gamma\langle w,u^*\rangle}e^{-\langle\Pi^\perp w,z'\rangle}$.
- **Scalar inequality** $-\beta e^{-\beta}\ge-e^{-1}$ for $\beta\ge0$, to uniformly bound "bad" summands.
- **Projection identity** $\langle v_1,\Pi v_2\rangle=\langle\Pi v_1,\Pi v_2\rangle=\langle\Pi v_1,v_2\rangle$ for orthogonal projections.
- **Lyapunov/threshold arguments:** show a quantity ($\|\Pi^\perp w\|^2$, or the ratio $\|\Pi^\perp w\|^2/\|w\|^2$) is non-increasing above a threshold; conclude boundedness via a last-crossing/mean-value-theorem contradiction.
- **Converting radial motion to a log-derivative:** $2\|w\|^{-2/N}\langle\nabla L_S(w),w\rangle=-\frac1N\frac{d}{dt}\ln(\|w\|^2)$, then integrate to force a contradiction (bounded quantity vs $-\infty$).
- **Directional convergence** phrased via boundedness of the perpendicular component (linear case) or vanishing of the normalized perpendicular ratio (deep case).

## Exam-relevant nuggets
- Prop 1's exact hypotheses: $w^{(0)}=0$; updates in $\mathrm{span}(\{\nabla\ell_{(x_i,y_i)}(w): i\in[m], w\in\mathbb{R}^d\})=\mathrm{span}(\{x_i\}_{i=1}^m)$; **assumed** convergence to zero loss. Covered: GD, SGD, with and without momentum.
- The limit is $X(X^\top X)^{-1}y$ — note it is $X^\top X\in\mathbb{R}^{m\times m}$ (invertible since $\mathrm{rank}(X)=m$, $d>m$), not $XX^\top$.
- Punchline sentences to quote: linear regression + zero init ⇒ implicit regularization = minimal Euclidean norm; NTK regime ⇒ minimal RKHS norm; separable classification + exponential loss ⇒ maximum margin (hard SVM).
- Exponential loss specifics: $L_S(w)=\frac1m\sum_ie^{-\langle w,z_i\rangle}$; zero loss is approached but never attained; $\|w(t)\|\to\infty$; only **directional** convergence is meaningful.
- Hard-SVM facts are used as black boxes: existence/uniqueness of $u^*$; $u^*=\sum_i\alpha_i^*z_i$, $\alpha_i^*\ge0$; $\alpha_i^*>0\Rightarrow y_i\langle u^*,x_i\rangle=\gamma$.
- The standing assumption $\mathrm{span}(\{z_i\}_{i\in I})=\mathbb{R}^d$ is what makes $\delta>0$ (Lem 2) — a favorite "where is this assumption used?" question.
- Threshold constant in Lem 3: $\frac{1+\ln(m)}{\delta}$; in Thm 1 the bound $R=\max\{\|\Pi^\perp w(t_0)\|,\frac{1+\ln m}{\delta}\}$.
- Balanced initialization: $W_{j+1}(0)^\top W_{j+1}(0)=W_j(0)W_j(0)^\top$ — mind the transpose placement (Gram of rows vs columns).
- E2E dynamics powers: $\|W_{1:N}\|_{Fro}^{2(N-1)/N}$ on the gradient term, $-(N-1)\|W_{1:N}\|_{Fro}^{-2/N}$ on the radial term; setting $N=1$ recovers plain GF.
- Depth-obliviousness is an explicit **limitation**: depths $1,2,\ge3$ all give $u^*$, yet depth matters empirically; contrast with linear convolutional networks (Gunasekar et al.) and with matrix factorization (Lecture 8).
- Homogeneous margin normalization: $\gamma(\Theta)=\min_i y_i h_\Theta(x_i)/\|\Theta\|_{Fro}^N$ — the exponent is the order of homogeneity $N$ (ReLU nets without biases are homogeneous).
- Sign computation trap: $\langle\nabla L_S(w),w\rangle=-\frac1m\sum_ie^{-\langle w,z_i\rangle}\langle w,z_i\rangle<0$ once all margins are positive — this drives $\|w(t)\|$ growth.
