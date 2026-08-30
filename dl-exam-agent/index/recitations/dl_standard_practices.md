# Recitation: Standard Practices in Supervised Deep Learning
- **File:** materials/recitations/dl_standard_practices.pdf
- **Related lectures:** lecture_01_three_pillars (practical DL framing); lecture_03_optimization_1, lecture_04_optimization_2, lecture_05_optimization_3 (SGD/conditioning theory behind the optimizers); complements fodl_recitation_whitening (data preprocessing) and fodl_recitation_backprop (mini-batch SGD's backprop step)
- **Summary:** A practical survey (based on Noam Razin's slides, with material from Li/Karpathy/Johnson/LeCun/He) of standard supervised DL practice in two parts. Part 1 — architectures: the artificial neuron and activations (sigmoid vs. ReLU), feed-forward fully connected (FFFC) networks with parameter counting, CNNs (convolutional layers, activation maps, $1\times1$ convolutions, pooling, LeNet), RNNs (recurrence formula, unrolling, the vanishing/exploding-gradient memorization problem, gating via LSTM/GRU), and contemporary models (Transformers/attention with its quadratic cost, State Space Models and their trade-offs vs. Transformers). Part 2 — training: cross-entropy/square losses, why large scale forces 1st-order stochastic methods, mini-batch SGD, momentum/Nesterov/Adam updates, learning-rate schedules, L2 weight decay, dropout (three intuitions, test-time scaling, Gaussian-noise variants), data preprocessing (normalization, PCA vs. ZCA whitening), weight initialization (zero/constant-init pathologies, Xavier), batch normalization, and coarse-to-fine hyperparameter search.

## Topics covered
- Artificial neuron: weighted sum $+$ bias, pointwise nonlinearity; sigmoid $\sigma(z)=\frac{1}{1+e^{-z}}$ (classic, smooth threshold approximation) vs. ReLU $\varphi(z)=\max(0,z)$ (most common for feed-forward nets)
- FFFC networks: $H_1=\varphi(W_0X+\theta_0)$, $H_{l+1}=\varphi(W_lH_l+\theta_l)$, $O=W_LH_L+\theta_L$; architectural params $D,K,M,L$; learnable params and their count
- CNNs: filters extend full depth of input volume, sliding dot product, activation maps ($32{\times}32{\times}3$ image, $5{\times}5{\times}3$ filter $\to 28{\times}28$ map; 6 filters $\to 28{\times}28{\times}6$), $1\times1$ convolutions, low/mid/high-level feature hierarchy, pooling (max pooling $2{\times}2$ stride 2), LeNet
- RNNs: recurrence $h_t=f_W(h_{t-1},x_t)$; shallow RNN $h_t=\tanh(W_{hh}h_{t-1}+W_{xh}x_t)$, $y_t=W_{hy}h_t$; unrolled computational graph; sequence tasks (one-to-many, many-to-one, many-to-many)
- Memorization problem = vanishing/exploding gradients; gating (LSTM [Hochreiter et al. 1997], GRU [Cho et al. 2014])
- Transformers [Vaswani et al. 2017]: attention instead of hidden state; State Space Models [Gu et al. 2021+]: linear recurrence, efficient training, sub-quadratic cost, strong long-range modeling; SSM vs. Transformer trade-offs
- Losses: cross-entropy for classification, square loss for regression
- Large-scale optimization: 1st-order (Hessian too expensive for $\sim10^8$ params) and stochastic (full objective too expensive for $\sim10^6$ examples); mini-batch SGD loop
- Updates: vanilla GD, momentum, Nesterov momentum, Adam [Kingma & Ba 2014]
- Learning-rate schedules: step decay, exponential decay, $1/t$ decay
- Regularization: L2 penalty (weight decay), dropout (+ multiplicative/additive Gaussian noise variants)
- Data preprocessing: coordinate-wise normalization; whitening (PCA for FC inputs, ZCA required for CNNs)
- Weight initialization: zero/constant init pathologies, fixed random ($0.01\cdot\mathcal N(0,1)$), Xavier [Glorot et al. 2010]
- Batch normalization [Ioffe & Szegedy 2015]: algorithm, learnable $\gamma,\beta$, benefits, test-time behavior, placement
- Hyperparameter search: architecture vs. training hyperparameters; grid vs. random; coarse-to-fine cross-validation

## Worked problems / derivations
**P1.** Parameter count of an FFFC network with input dim $D$, output dim $K$, width $M$, depth $L$.
Technique: count per layer including biases, $(D+1)M + (M+1)M(L-1) + (M+1)K$ — first layer, $L-1$ hidden-to-hidden layers, output layer; the "$+1$" is the bias.

**P2.** Convolution output sizes: $32{\times}32{\times}3$ input with a $5{\times}5{\times}3$ filter gives a $28{\times}28{\times}1$ activation map; with 6 such filters, a $28{\times}28{\times}6$ volume; stacking CONV+ReLU layers shrinks spatial dims ($32\to28\to24$ with $5{\times}5$ filters).
Technique: filter always spans full input depth; output spatial size $= (n - k)/\text{stride} + 1$ per dimension; #output channels $=$ #filters. A $1{\times}1$ conv is a per-pixel dot product across channels (e.g., $56{\times}56{\times}64 \to 56{\times}56{\times}32$ with 32 filters of size $1{\times}1{\times}64$).

**P3.** RNN memorization / vanishing-exploding gradients (scalar case, no activation).
Technique: unroll to $y_t = w_{hy}\sum_{t'\le t} w_{hh}^{\,t-t'-1} w_{xh}\, x_{t'}$; the coefficient $c_{tt'}$ of $x_{t'}$ for $t'\ll t$ satisfies $w_{hh}>1 \Rightarrow c_{tt'}\to\infty$ (unstable), $w_{hh}<1 \Rightarrow c_{tt'}\to0$ (oblivious), $w_{hh}\approx1 \Rightarrow$ finite (meaningful dependence). Gating (LSTM/GRU) is the architectural fix.

**P4.** Dropout at test time — why scale activations by $p$ (keep probability), and exactness in the linear case.
Technique: ideal test-time prediction integrates out the mask noise (Monte-Carlo: average many masked forward passes). Single-pass approximation: keep all neurons, multiply activations by $p$. Linear neuron $a = w_0x + w_1y$ with $p=\tfrac12$: $\mathbb{E}[a] = \tfrac14(0 + w_1y + w_0x + w_0x + w_1y) = \tfrac12(w_0x + w_1y)$ — expectation over the 4 masks equals the $p$-scaled full pass, so the approximation is exact for linear layers.

**P5.** What happens with bad weight initialization: all weights $0$ (with ReLU / in general), or all equal?
Technique: with all-zero weights and ReLU, all activations (and gradients) are zero — no learning ever happens; in general zero/equal initialization makes all hidden neurons compute identical functions and receive identical gradients, so symmetry is never broken. Hence random init; naive $W = 0.01\cdot\mathcal N(0,1)$ causes non-homogeneous activation distributions across layers in deep nets, fixed by Xavier scaling.

**P6.** Weight-decay gradient: show the L2 penalty becomes a decay term in the update.
Technique: $f = \frac{1}{|S|}\sum_{(X,y)\in S} L(X,y) + \frac{\lambda}{2}\sum_{W}\|W\|_{\mathrm{Fro}}^2$ gives $-\nabla_W f = -\frac{1}{|S|}\sum \nabla_W L(X,y) - \lambda W$ — each step shrinks $W$ by factor proportional to $\lambda$ ("weight decay").

## Key formulas & facts
- Activations: $\sigma(z) = \frac{1}{1+e^{-z}}$; $\mathrm{ReLU}(z) = \max(0,z)$.
- FFFC forward pass: $H_1 = \varphi(W_0X+\theta_0),\ H_{l+1} = \varphi(W_lH_l+\theta_l),\ O = W_LH_L+\theta_L$; #params $=(D+1)M+(M+1)M(L-1)+(M+1)K$.
- Cross-entropy loss: $L(X,y) = \log\big(\sum_r \exp(o_r(X))\big) - o_y(X)$; square loss: $L(X,y) = (o(X)-y)^2$.
- Shallow RNN: $h_t = \tanh(W_{hh}h_{t-1} + W_{xh}x_t)$, $y_t = W_{hy}h_t$; scalar unroll $y_t = w_{hy}\sum_{t'\le t}w_{hh}^{\,t-t'-1}w_{xh}x_{t'}$.
- Attention: $\mathrm{Attention}(x_t, X; W^Q, W^K, W^V) = \mathrm{softmax}\!\Big(\frac{x_tW^Q (XW^K)^\top}{\sqrt{d_K}}\Big) XW^V$; cost is quadratic in sequence length (posed as a question in the slides).
- SSMs: linear recurrence (no state activation) $\Rightarrow$ training without unrolling, sub-quadratic complexity, strong long-range modeling; competitive with (but cheaper than) Transformers on some tasks.
- Mini-batch SGD loop: sample batch $\to$ forward (loss) $\to$ backprop (gradients) $\to$ update.
- Momentum: $v \leftarrow \mu v - \eta\, dx$, $x \leftarrow x + v$; typical $\mu \in \{0.9, 0.95, 0.99\}$; builds velocity along shallow directions, cancels jitter along steep ones.
- Nesterov momentum: $v_t = \mu v_{t-1} - \epsilon \nabla f(\theta_{t-1} + \mu v_{t-1})$, $\theta_t = \theta_{t-1} + v_t$ — the only difference is the "lookahead" gradient evaluation point.
- Adam: $m \leftarrow \beta_1 m + (1-\beta_1)dx$, $v \leftarrow \beta_2 v + (1-\beta_2)dx^2$, $x \leftarrow x - \eta\, m/(\sqrt{v}+10^{-7})$; in practice $m,v$ are bias-corrected for zero initialization; often works well with less tuning.
- LR schedules: step decay (drop by constant factor on plateau/epochs); exponential $\eta = \eta_0 e^{-kt}$; $1/t$ decay $\eta = \eta_0/(1+kt)$.
- Weight decay: $f(\text{weights}) = \frac{1}{|S|}\sum_{(X,y)\in S}L(X,y) + \frac{\lambda}{2}\sum_W \|W\|_{\mathrm{Fro}}^2 \Rightarrow -\nabla_W f$ contains $-\lambda W$.
- Dropout variants: multiplicative Gaussian $h \to h\cdot r,\ r\sim\mathcal N(1,\sigma^2)$; additive Gaussian $h \to h+r,\ r\sim\mathcal N(0,\sigma^2)$ — these admit only the noise-injection interpretation (no redundant-representation or ensemble story).
- Preprocessing: coordinate-wise normalization ($X \mathrel{-}= \mathrm{mean},\ X \mathrel{/}= \mathrm{std}$); whitening $\Rightarrow$ identity covariance; FC inputs may use PCA whitening, CNNs must use ZCA (spatial coherence).
- Xavier init: $W = \mathcal N(0,1)^{\text{fan\_in}\times\text{fan\_out}} / \sqrt{\text{fan\_in}}$ — keeps activation distributions homogeneous across layers.
- BatchNorm (per activation $k$, over mini-batch $\mathcal B = \{x_{1..m}\}$): $\mu_{\mathcal B} = \frac1m\sum_i x_i$, $\sigma^2_{\mathcal B} = \frac1m\sum_i(x_i-\mu_{\mathcal B})^2$, $\hat x_i = \frac{x_i-\mu_{\mathcal B}}{\sqrt{\sigma^2_{\mathcal B}+\epsilon}}$, $y_i = \gamma\hat x_i + \beta$; learning $\gamma = \sqrt{\mathrm{Var}[x]},\ \beta = \mathbb{E}[x]$ recovers identity. Benefits: better gradient flow, higher LRs, less init sensitivity. Test time: $\mu,\sigma$ frozen from training data. Placement: after FC/conv layers (before nonlinearity).
- Hyperparameter search: architecture (depth, breadth, layer types, window sizes, strides) + training (optimizer, LR, weight decay, init, loss); most popular: grid & random; preferred procedure: coarse (random search, short runs) $\to$ fine (grid around good settings, long runs) with cross-validation.

## Exam-relevant nuggets
- Parameter counting for FFFC nets — $(D+1)M+(M+1)M(L-1)+(M+1)K$ — and conv output-size arithmetic are quick computational questions; know that CNN filters span the full input depth and #maps = #filters.
- The RNN vanishing/exploding gradient derivation (scalar unroll, three regimes of $w_{hh}$) is the classic "why RNNs fail at long-term memory" question; the fix is gating (LSTM/GRU) — architectural, not an optimizer trick.
- Dropout test-time scaling by $p$ and its exactness for linear layers is a favorite short proof; also know the three intuitions (redundant representations, ensemble of masks with shared weights, noise injection) and that Gaussian-noise variants keep only the noise interpretation.
- Zero/constant initialization questions ("what goes wrong?") recur: ReLU + zero init $\Rightarrow$ zero activations and zero gradients (nothing trains); equal init $\Rightarrow$ permanent symmetry. Xavier $1/\sqrt{\text{fan\_in}}$ scaling is the standard fix.
- BatchNorm: be able to write the full algorithm including $\epsilon$, explain the role of learnable $\gamma,\beta$ (can undo normalization / recover identity), and the train-vs-test difference (batch statistics vs. frozen statistics).
- PCA vs. ZCA for preprocessing: CNNs require ZCA because convolution assumes spatial coherence of neighboring coordinates — cross-links to the whitening recitation.
- Momentum vs. Nesterov: the only difference is where the gradient is evaluated ($\theta_{t-1}$ vs. lookahead $\theta_{t-1}+\mu v_{t-1}$); Adam = momentum on the gradient + momentum on the squared gradient + normalized update. Adagrad-style normalization ties to the preconditioning recitation.
- Why deep learning uses 1st-order stochastic methods: $\sim10^8$ params rules out Hessians, $\sim10^6$ examples rules out full-batch objectives — a standard "justify SGD" exam blurb.
