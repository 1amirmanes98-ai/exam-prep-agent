# Reinforcement Learning — Exam Map

Every question from all 18 indexed exams (2018–2025, both/all moadim, + the sample exam),
tagged by pillar. Full translated statements and solution sketches live in
`index/exams/<id>.md`. Refs are written `a2023_Q1` (Moed A 2023, Q1), `b2019_Q4`
(Moed B 2019, Q4), `example_Q2` (sample exam, Q2).

## Master table

| Exam | Q1 (≈30) | Q2 (≈20–30) | Q3 (≈20) | Q4 (≈20–30) |
|---|---|---|---|---|
| a_2018 | 🟦 Cycle MDP + VI | 🟩 Q-learning vs SARSA | 🟨 PG (exponential) | 🟦 Contraction (squared reward) |
| b_2018 | 🟦 Grid shortest-path MDP | 🟩 MC first/every-visit | 🟨 Off-policy TD + FA | 🟦 Contraction (uniform policy) |
| a_2019 | 🟦 MDP + Bellman eqs | 🟪 UCB/median-arm ID | 🟨 PG (Weibull) | 🟦 γ³ three-step contraction |
| b_2019 | 🟦 Walk/jump line MDP | 🟦 LQR (controllability, DARE) | 🟨 MC + linear FA | 🟪 Bandit regret (threshold) |
| a_2020 | 🟦 Binary-tree finite-horizon | 🟩 TD(0) on a ring | 🟨 REINFORCE (log-normal) | 🟦 Contraction (constant action) |
| b_2020 | 🟦 Hypercube bit-flip MDP | 🟩 MC first/every-visit | 🟨 REINFORCE (Rayleigh) | 🟦 Contraction (multiplicative) |
| a_2021 | 🟦 Queue admission (threshold) | 🟪 Bernoulli MAB (LCB) | 🟨 FA-SGD + REINFORCE (Laplace) | 🟦 Contraction (log-transition) |
| b_2021 | 🟦 Bidirectional cycle + PI | 🟦 Optimal-policy invariance | 🟨 REINFORCE (Laplace) | 🟦 POMDP observation-policy contraction |
| a_2022 | 🟦 Job-search (threshold) | 🟦 POMDP belief + VI | 🟨 Quadratic-linear PG | 🟦 Contraction (max-over-all) |
| b_2022 | 🟦 Recycling-robot MDP | 🟦 Value linearity r₃=r₁+r₂ | 🟨 Sigmoid PG | 🟦 Contraction (max-outside-𝔼) |
| a_2023 | 🟦 Optimal stopping (seller) | 🟦 Value linearity / ratio J | 🟨 Quadratic-softmax PG | 🟦 Contraction (rescaled Q) |
| b_2023 | 🟦 Casino stopping | 🟪 MAB top-n regret | 🟨 (inverse-)Gaussian PG | 🟦 Contraction (Bellman optimality) |
| a_2024 | 🟦 Optimal stopping (gambler) | 🟪 MAB-max-2 regret | 🟨 PG (Gumbel) | 🟦 Contraction (decoupled reward) |
| b_2024 | 🟦 Maintenance cost MDP | 🟦 min/max reward relations | 🟨 Softmax PG | 🟦 Contraction (Q-op max{r,·}) |
| a_2025 | 🟦 Urn stopping (martingale) | 🟦 Finite-horizon reward transforms | 🟨 Value FA MC-SGD (exp) | 🟦 Contraction (global max) |
| b_2025 | 🟦 Bit-cube finite-horizon | 🟦 Transition mixture | 🟨 Value FA MC-SGD (squared) | 🟦 Contraction (policy-eval Q) |
| c_2025 | 🟦 Seller stopping (inventory) | 🟪 k-statistic arm ID | 🟨 Value FA MC-SGD (bilinear) | 🟦 Contraction (min–min → 0) |
| example | 🟦 Line MDP + VI | 🟩 TD(0) and TD(λ) | 🟨 PG (Pareto) | 🟦 Contraction + counterexample |

🟦 Planning · 🟩 Learning · 🟨 Approximation · 🟪 Bandits

Positional summary: **Q1 = Planning 18/18**, **Q3 = Approximation 18/18**, **Q4 =
Planning 17/18** (Bandits once, b2019). **Q2 is the only variable slot**: Learning ×5,
a second Planning ×8, Bandits ×5.

## Recurring question archetypes

1. **MDP modeling from a story (Q1).** — 🔴 Appears in every exam. Read a word problem
   (a seller, a queue, a grid, a casino, a recycling robot), define the state that makes
   it Markov, and write ⟨S, A, R, P, s₀⟩ — then give the optimal policy/value or run value
   iteration. The reliable points if you are disciplined about the state encoding.
   appeared in: a2018_Q1, a2019_Q1, a2020_Q1, a2021_Q1, a2022_Q1, a2023_Q1, a2024_Q1, a2025_Q1, b2018_Q1, b2019_Q1, b2020_Q1, b2021_Q1, b2022_Q1, b2023_Q1, b2024_Q1, b2025_Q1, c2025_Q1, example_Q1.

2. **Bellman-operator contraction proof (Q4).** — 🔴 12 of 13 exams. You are handed a
   non-standard operator T (squared reward, uniform policy, constant action, multiplicative,
   log-transition, max-outside-expectation, rescaled Q…). Prove it is a γ-contraction in the
   sup-norm, iterate it a few steps, and identify its unique fixed point — often ending with
   whether that fixed point equals some policy's Vπ/Qπ (frequently a counterexample: it does
   not). appeared in: a2018_Q4, a2019_Q4, a2020_Q4, a2021_Q4, a2022_Q4, a2023_Q4, a2024_Q4, a2025_Q4, b2018_Q4, b2020_Q4, b2021_Q4, b2022_Q4, b2023_Q4, b2024_Q4, b2025_Q4, c2025_Q4, example_Q4.

3. **Policy gradient / REINFORCE for a given policy family (Q3).** — 🔴 Appears in every exam.
   Given a parametric policy (softmax/energy-based, Gaussian, log-normal, Rayleigh, Laplace,
   Weibull, Pareto, sigmoid, quadratic-linear), check representability, derive the score
   ∇θ log π(a|s), and write the REINFORCE / policy-gradient update; sometimes combined with
   fitting a value function by SGD. appeared in: a2018_Q3, a2019_Q3, a2020_Q3, a2021_Q3, a2022_Q3, a2023_Q3, a2024_Q3, a2025_Q3, b2018_Q3, b2019_Q3, b2020_Q3, b2021_Q3, b2022_Q3, b2023_Q3, b2024_Q3, b2025_Q3, c2025_Q3, example_Q3.

4. **Model-free value estimation by hand (Q2 — Learning).** — 🟠 Run a model-free algorithm
   on a given short trajectory / set of episodes: Monte-Carlo (first-visit vs every-visit),
   TD(0)/TD(λ) with eligibility traces, Q-learning, or SARSA — filling the value table at each
   step. appeared in: a2018_Q2, a2020_Q2, b2018_Q2, b2020_Q2, example_Q2.

5. **Bandit regret & best-arm identification (Q2/Q4 — Bandits).** — 🟠 UCB/LCB confidence
   bounds, successive & median elimination, explore-then-exploit regret decomposition with
   Hoeffding concentration; derive and optimize a regret bound, or show why a pessimistic
   algorithm never explores. appeared in: a2019_Q2, a2021_Q2, a2024_Q2, b2019_Q4, b2023_Q2, c2025_Q2.

6. **Value-function linearity & optimal-policy invariance (Q2 — Planning).** — 🟠 How do V*
   and π* respond to transformations of the reward or discount: scaling r→cr, shaping
   r₃=r₁±ρr₂, ratio objectives J=V(r₁)/V(r₂), changing s₀, γ→cγ, or squaring the reward?
   Which leave the optimal policy unchanged, and counterexamples for those that do not.
   appeared in: a2023_Q2, b2021_Q2, b2022_Q2, b2024_Q2, a2025_Q2, b2025_Q2.

7. **Threshold-structured optimal policies (Planning).** — 🟠 Prove the optimal policy has a
   threshold form via monotonicity of the advantage / Q-gap in a scalar (price, queue length,
   offered reward). appeared in: a2021_Q1, a2022_Q1, a2023_Q1, a2024_Q1, b2023_Q1, c2025_Q1.

8. **POMDP belief-MDP (Planning).** — 🟡 Belief-state update (Bayesian filtering) and
   finite-horizon value iteration over beliefs; γ-contraction of an observation-based-policy
   Bellman operator. appeared in: a2022_Q2, b2021_Q4.

9. **LQR / continuous control (Planning).** — 🟡 Controllability test, the discrete-time
   Riccati / algebraic Riccati equation, and the optimal linear feedback gain. appeared in: b2019_Q2.

Note: the sample exam (`example`) and Moed A 2019 (`a_2019`) include official solutions in
their PDFs; all other solution sketches were derived by the tutor and numerically verified.
