# FODL Topic Coverage Map
Every topic taught in the course, cross-referenced against where it was examined. Built by parsing `index/exams/*.md`.

## Pillar 1 — Expressiveness

| Topic | Taught | Examined | Priority |
|---|---|---|---|
| Piecewise-linear/constant characterization of ReLU / leaky-ReLU / sign nets | lecture_02 §1; hw_expressiveness | example_Q1, a2020_Q1, a2021_Q1, b2021_Q1, b2022_Q1, a2023_Q1, c2024_Q1 | 🔴 |
| Universality (incl. proving NON-universality) | lecture_02 (Heine–Cantor $L^1$ argument) | example_Q1, a2021_Q1, b2020_Q1, b2022_Q1, a2024_Q1, b2024_Q1, c2024_Q1 | 🔴 |
| Depth separation / expressive efficiency (Telgarsky sawtooth; counting/VC arguments) | lecture_02 §1.2; hw_expressiveness | a2020_Q1, b2021_Q1(neg.), a2022_Q1, b2022_Q1, b2023_Q1, b2024_Q1 | 🔴 |
| Tensor methods: CP/HT decompositions, Kronecker, matricization rank, separation rank | lecture_02 §2; recitation kronecker_expressiveness | b2020_Q1, a2022_Q1 | 🟠 |
| Linear RNNs / state-space hypothesis classes (diagonal ⊂ symmetric ⊂ general) | recitations + hw (SSM material); lecture_01 framing | a2024_Q1, b2024_Q2 — **new 2024 trend** | 🟠 |
| VC dimension as an efficiency-counting tool | lecture_06 (context); b2023 exam | b2023_Q1 | 🟡 |

## Pillar 2 — Optimization

| Topic | Taught | Examined | Priority |
|---|---|---|---|
| Gradient flow: definition, loss monotonicity, working with $\dot w = -\nabla L(w)$ | lecture_04 §1; recitation gradient_flow | 11 of 12 exams' Q2 | 🔴 |
| Deep linear networks: balancedness / conservation laws, end-to-end dynamics | lecture_04 §2 | a2020_Q2, b2021_Q2, a2022_Q2, a2023_Q2, b2022_Q2, b2023_Q2, a2024_Q2, c2024_Q2 | 🔴 |
| Scalar linear nets: exponential convergence via conserved quantities | lecture_04; recitation gradient_flow | a2020_Q2, b2021_Q2, c2024_Q2 (b2021≡c2024) | 🔴 |
| Matrix factorization ($W=UU^\top$, Hadamard/diagonal): dynamics, low-rank bias | lecture_08 (dynamics), lecture_04 | a2021_Q2, b2023_Q2, a2024_Q2 | 🔴 |
| Non-convexity proofs (permutation symmetry, explicit counterexamples) | lecture_03 §1 | a2021_Q2, a2024_Q2, b2024_Q2, example_Q2 | 🟠 |
| Landscape: stationary points, strict saddles, spurious minima, overparam. critical pts | lecture_03 §3–4 | a2020_Q2, a2022_Q2, example_Q2 | 🟠 |
| Smoothness, descent lemma, GD convergence to stationarity | lecture_03 §2; recitation optimization_1 | example_Q2 (+ implicit prerequisite everywhere) | 🟠 |
| PL condition → linear rate | lecture_04 §3 | a2023_Q2 | 🟡 |
| NTK regime: $\dot u = -H(t)(u-y)$, spectral decoupling, kernel regression equivalence | lecture_05 | b2020_Q2 | 🟡 |
| Shallow ReLU nets: GF sign preservation, conservation, unreachable loss levels | lecture_03/04 + exams | a2022_Q2, b2022_Q2 | 🟠 |

## Pillar 3 — Generalization

| Topic | Taught | Examined | Priority |
|---|---|---|---|
| Hoeffding + union bound → uniform convergence for finite/quantized classes | lecture_06 §2 (Prop 1); lecture_01 | a2021_Q3, a2022_Q3, a2023_Q3, b2023_Q3, a2024_Q3, b2024_Q3, c2024_Q3, example_Q3 | 🔴 |
| SRM / weighted ("black box") bounds over nested or indexed sub-classes | lecture_06; hw_optimization | b2020_Q3, a2023_Q3, a2024_Q3, b2024_Q3, c2024_Q3 | 🔴 |
| Covering / $\epsilon$-discretization + Lipschitz transfer | lecture_06 (Prop 1 proof); a2023/c2024 | a2023_Q3, c2024_Q3 (nearly identical) | 🟠 |
| Implicit regularization narrative (Zhang et al.; why UC alone fails; interpolation) | lecture_06 §1, lecture_07 | a2021_Q3, b2023_Q3, example_Q3 (+ flavors everywhere) | 🔴 |
| Implicit bias of GD → min-norm solution ($X(X^\top X)^{-1}y$; GD stays in row space) | lecture_07 §1 | a2020_Q3, b2022_Q3 | 🟠 |
| Norm-based bounds; norm-adaptive union over radii | lecture_06 (Neyshabur), lecture_07 | a2020_Q3, b2020_Q3, b2021_Q3, b2022_Q3, b2024_Q3 | 🟠 |
| Rademacher complexity (definition, main theorem, linear classes) | lecture_06 §4; recitation optimization_2_radamacher | a2020_Q3, b2021_Q3 | 🟠 |
| PAC-Bayes (KL bound, Gaussian priors/posteriors, data-dependent-prior pitfalls) | lecture_06 §5 | a2022_Q3, example_Q3 | 🟡 |
| Deep matrix factorization: singular-value dynamics, nuclear-norm conjecture refuted | lecture_08 | a2024_Q2/Q3 (low-rank SRM flavor) | 🟠 |
| Volume hypothesis (width kills it, depth validates it) | lecture_09 | not yet examined — plausible new-question source | 🟡 |
