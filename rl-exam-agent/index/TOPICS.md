# Reinforcement Learning — Topic Map

The exam has a **very stable shape** (measured across all 18 indexed exams,
2018–2025 + the sample exam):

- **Q1 — Planning (100% of exams).** Model a story problem as an MDP ⟨S,A,R,P,s₀⟩,
  then compute the optimal policy / value (value iteration, closed form).
- **Q2 — the swing question.** Model-free **Learning** (5×), a second **Planning**
  question (8×), or **Bandits** (5×).
- **Q3 — Approximation (100% of exams).** Policy gradient / REINFORCE: derive the
  score ∇log π for a given parametric policy and write the update.
- **Q4 — Planning (17/18).** Prove a given Bellman-type operator is a γ-contraction,
  iterate it, and identify its fixed point (often: is it some policy's Vπ/Qπ?).

Points weight: **Planning ≈57%, Approximation ≈25%, Learning ≈9%, Bandits ≈7%.**
Q1 and Q3 are effectively guaranteed — master those archetypes first, then the Q4
contraction proof, then decide whether to prioritize Learning or Bandits for Q2.

Priority key: 🔴 core (nearly every exam) · 🟠 frequent · 🟡 seen at least once / taught.

## Pillar 1 — Planning

| topic | taught | examined | priority |
|---|---|---|---|
| MDP formalization (write ⟨S,A,R,P,s₀⟩ for a story) | lecture_03, recitation_03 | a2018_Q1, a2019_Q1, a2020_Q1, a2021_Q1, a2022_Q1, a2023_Q1, a2024_Q1, a2025_Q1, b2018_Q1, b2019_Q1, b2020_Q1, b2021_Q1, b2022_Q1, b2023_Q1, b2024_Q1, b2025_Q1, c2025_Q1, example_Q1 | 🔴 |
| Value iteration & optimal policy / value | lecture_04, recitation_04 | a2018_Q1, a2019_Q1, a2020_Q1, a2024_Q1, b2018_Q1, b2019_Q1, b2020_Q1, b2021_Q1, b2025_Q1, c2025_Q1, example_Q1 | 🔴 |
| Bellman operators & γ-contraction proofs (fixed point) | lecture_04, recitation_04 | a2018_Q4, a2019_Q4, a2020_Q4, a2021_Q4, a2022_Q4, a2023_Q4, a2024_Q4, a2025_Q4, b2018_Q4, b2020_Q4, b2021_Q4, b2022_Q4, b2023_Q4, b2024_Q4, b2025_Q4, c2025_Q4, example_Q4 | 🔴 |
| Policy evaluation (linear equations / Qπ algebra) | lecture_04, recitation_04 | a2021_Q1, a2022_Q1, b2018_Q4, b2022_Q1, b2025_Q4 | 🟠 |
| Threshold / structured optimal policies (monotonicity) | lecture_03, lecture_04 | a2021_Q1, a2022_Q1, a2023_Q1, a2024_Q1, b2023_Q1, c2025_Q1 | 🟠 |
| Finite-horizon & deterministic DP (backward induction) | lecture_02, recitation_02 | a2020_Q1, a2025_Q2, b2018_Q1, b2020_Q1, b2021_Q1, b2023_Q1, b2024_Q1, b2025_Q1, c2025_Q1 | 🟠 |
| Value linearity in reward & optimal-policy invariance | lecture_04, recitation_04 | a2023_Q2, a2025_Q2, b2021_Q2, b2022_Q2, b2024_Q2, b2025_Q2 | 🟠 |
| POMDP / belief-MDP (belief update, VI over beliefs) | recitation_11 | a2022_Q2, b2021_Q4 | 🟠 |
| Policy iteration | lecture_04, recitation_04 | b2021_Q1 | 🟡 |
| LQR (controllability, Riccati / DARE, linear feedback) | lecture_12, recitation_12 | b2019_Q2 | 🟡 |
| Model-based RL (Rmax, simulation lemma, model error) | lecture_05, recitation_05 | — | 🟡 |

## Pillar 2 — Learning

| topic | taught | examined | priority |
|---|---|---|---|
| Monte-Carlo prediction (first-visit vs every-visit) | lecture_06, recitation_06 | b2018_Q2, b2020_Q2 | 🟠 |
| TD(0) / TD(λ) & eligibility traces on a trajectory | lecture_07, recitation_07 | a2020_Q2, example_Q2 | 🟠 |
| Q-learning & SARSA (off- vs on-policy TD control) | lecture_06, recitation_06 | a2018_Q2 | 🟠 |
| Convergence: Robbins-Monro / stochastic approximation | lecture_06, lecture_07 | a2020_Q2 | 🟡 |
| Importance sampling & actor-critic | lecture_07, recitation_07 | — | 🟡 |
| Inverse RL / apprenticeship / RLHF (flagged optional) | lecture_11, lecture_13 | — | 🟡 |

## Pillar 3 — Approximation

| topic | taught | examined | priority |
|---|---|---|---|
| Policy gradient / REINFORCE (score ∇log π of a parametric policy) | lecture_09, recitation_09 | a2018_Q3, a2019_Q3, a2020_Q3, a2021_Q3, a2022_Q3, a2023_Q3, a2024_Q3, b2020_Q3, b2021_Q3, b2022_Q3, b2023_Q3, b2024_Q3, example_Q3 | 🔴 |
| Policy gradient theorem (statement & derivation) | lecture_09 | a2019_Q3, a2023_Q3 | 🟠 |
| Function approximation (linear, SGD; MC/TD targets) | lecture_08, recitation_08 | a2021_Q3, a2025_Q3, b2018_Q3, b2019_Q3, b2025_Q3, c2025_Q3 | 🟠 |
| Off-policy divergence & semi-gradient TD | lecture_08 | b2018_Q3 | 🟡 |

## Pillar 4 — Bandits

| topic | taught | examined | priority |
|---|---|---|---|
| Regret minimization (explore-exploit, Hoeffding, UCB regret) | lecture_10, recitation_10 | a2024_Q2, b2019_Q4, b2023_Q2 | 🟠 |
| Best-arm identification (UCB/LCB, successive elimination, PAC) | lecture_10, recitation_10 | a2019_Q2, a2021_Q2, c2025_Q2 | 🟠 |
| Median elimination & PAC sample bounds | lecture_10, recitation_10 | a2019_Q2 | 🟡 |
