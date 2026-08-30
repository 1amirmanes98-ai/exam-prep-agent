# Homework: Assignment 1 — Standard Practices in Supervised Deep Learning
- **File:** materials/homework/hw_practices.pdf
- **Related lectures:** dl_standard_practices (companion recitation deck — architectures, optimizers, regularization, initialization, preprocessing), lecture_01_three_pillars; preprocessing item connects to fodl_recitation_whitening, optimizer items to lecture_03_optimization_1
- **Note:** Fully experimental assignment (PyTorch/TensorFlow, no high-level APIs — own training/evaluation loops; off-the-shelf layers like `torch.nn.Conv2d`/`torch.nn.Linear` allowed). Dataset throughout: CIFAR-10 subsampled to 10% (5000 train / 1000 test images, $32\times32$ RGB, 10 classes). Each experiment item modifies the tuned baseline of its part *in isolation* (e.g., Xavier used in item 3 is not carried into items 4+). For every item: plot train+test loss vs. epoch (one graph) and train+test accuracy vs. epoch (one graph), and report final values.

## Problems
**P1 (20 pts). Setup and baseline.**
(a) Download CIFAR-10, subsample 10%, normalize inputs to $[0,1]$ (min intensity $\to 0$, max $\to 1$).
(b) SVM baseline via sklearn: report train/test accuracies for both linear and RBF kernels.
Key ideas:
- Establishes a classical-ML reference point; RBF typically beats linear SVM on raw pixels, and both bound what the NN must exceed.
- Performance won't match state-of-the-art since only 10% of data is used.

**P2 (40 pts). Feed-forward fully connected network — 7 experiments.**
1. *Baseline:* 2-layer network (single hidden layer, width 256), ReLU, cross-entropy loss, no regularization; SGD + momentum, constant LR, zero-mean Gaussian init, batch size 64. Grid search over momentum coefficient, learning rate, initialization std; report search grid, best hyperparameters, and results.
2. *Optimization:* best SGD-momentum config vs. Adam — effects on accuracy and convergence time; explain.
3. *Initialization:* Xavier initialization — effect on accuracy and convergence time.
4. *Regularization:* weight decay and dropout — effect on accuracy and runtime.
5. *Preprocessing:* PCA whitening before training (sklearn PCA allowed) — effect on results and convergence time.
6. *Width:* single hidden layer of width $2^i$, $i \in \{6, 10, 12\}$; all configurations' curves on shared plots; explain.
7. *Depth:* fix width 64, vary depth $\in \{3, 4, 10\}$; shared plots; explain.
Key ideas:
- Adam converges faster / needs less tuning than SGD+momentum (normalized, adaptive updates); final accuracy may be comparable or slightly worse.
- Xavier ($\propto 1/\sqrt{\text{fan\_in}}$) keeps activation/gradient scales homogeneous across layers $\Rightarrow$ faster, more stable convergence than naive Gaussian init.
- Weight decay/dropout: lower train accuracy, reduced train–test gap (less overfitting on 5k samples); dropout slows convergence.
- Whitening improves conditioning of the input covariance $\Rightarrow$ faster optimization (ties to $K = \lambda_{\max}/\lambda_{\min}$ story).
- Width: larger width $\Rightarrow$ easier fit, usually better test accuracy with diminishing returns (overparameterization generalizes — cf. generalization pillar); depth without normalization/skip connections eventually hurts trainability (depth 10 trains poorly).

**P3 (40 pts + 5 bonus). Convolutional neural network — same experiment suite on a fixed CNN.**
1. *Baseline architecture (input $32\times32$ RGB):* $3\times3$ conv, 64 filters, stride 1 $\to$ ReLU $\to$ $2\times2$ max-pool, stride 2 $\to$ $3\times3$ conv, 16 filters, stride 1 $\to$ ReLU $\to$ $2\times2$ max-pool, stride 2 $\to$ FC layer of dimension 784 $\to$ output layer of dimension 10. Cross-entropy, SGD+momentum, constant LR, Gaussian init, batch 64; grid search over momentum, LR, init std; report grid, best config, results.
2. *Optimization:* SGD+momentum vs. Adam (accuracy, convergence time; explain).
3. *Initialization:* Xavier.
4. *Regularization:* weight decay and dropout.
5. *Preprocessing:* PCA whitening.
6. *Width:* filter counts (64, 16) $\to$ (256, 64) and (512, 256); shared plots; explain.
7. *Depth:* replace the 2 conv layers with $k \in \{3,4,5\}$ conv layers; shared plots; explain.
8. *(Bonus 5 pts) Residual connections:* repeat item 7 with skip connections (ResNet, He et al. 2015); report and explain changes.
Key ideas:
- CNN beats the FC net at comparable size: weight sharing + locality = the right inductive bias for images.
- Same optimizer/init/regularization/whitening stories as Part 2; note the recitation's caveat that CNN inputs should be whitened with ZCA (spatial coherence) — PCA whitening scrambles spatial structure, so observe/discuss its effect here.
- Deeper plain CNNs get harder to train (degradation); skip connections restore trainability by improving gradient flow (identity path) — expected bonus finding.

**P4 (Bonus 10 pts). Sequence models.** On any dataset, compare RNN vs. GRU vs. modern SSM (e.g., S4), each with hidden state size 100 (parameter counts differ). Demonstrate the vanishing/exploding gradient problem with empirical evidence and explanation.
Key ideas:
- Vanilla RNN gradients w.r.t. distant inputs decay/explode like $w_{hh}^{t-t'}$ (cf. dl_standard_practices scalar analysis); measure gradient norms vs. lag to show it.
- GRU gating mitigates vanishing gradients; linear SSMs with stable parameterization handle long-range dependencies best.

## Exam-relevant nuggets
- The assignment operationalizes the dl_standard_practices deck; exams test the *reasons* behind each experiment: why Xavier scaling ($1/\sqrt{\text{fan\_in}}$, homogeneous activation distributions), why Adam needs less tuning (adaptive normalized updates), why weight decay appears as $-\lambda W$ in the update, why dropout reduces overfitting (ensemble/noise-injection interpretations, test-time scaling by $p$).
- PCA vs. ZCA whitening for CNNs is a known conceptual trap (spatial coherence $\Rightarrow$ ZCA) — asked alongside the whitening derivation; this homework's item 5 (PCA on CNN inputs) is the setup for that discussion.
- Width/depth experiments feed the standard exam narratives: wider $\Rightarrow$ better trainability and generalization despite overparameterization (three-pillars framing); deeper plain nets degrade, residual connections fix gradient flow.
- P4's vanishing/exploding demonstration matches the recitation's scalar RNN analysis ($w_{hh}$ regimes: $>1$ unstable, $<1$ oblivious, $\approx1$ meaningful) — a recurring short-answer/exam item, including why gating (LSTM/GRU) and stable SSM parameterizations solve it.
- Grid-search methodology (coarse random $\to$ fine grid, cross-validation) from the practices deck can appear as a "describe how you'd tune" item; this assignment is the worked example.
