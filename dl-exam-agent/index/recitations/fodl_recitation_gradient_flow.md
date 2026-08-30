# Recitation: Gradient Flow (Recitation 6)
- **File:** materials/recitations/fodl_recitation_gradient_flow.pdf
- **Related lectures:** lecture_03_optimization_1, lecture_04_optimization_2
- **Summary:** Introduces gradient flow (GF) $\dot\theta(t) = -\nabla f(\theta(t))$ as the continuous-time surrogate for gradient descent with infinitesimal step size — the central technical tool of the trajectory approach in the optimization lectures. Covers existence/uniqueness of the flow, the two-way relation to GD (GD's limit as $\eta\to 0$; GD as first-order Euler discretization of GF), motivation for studying GF, a fully worked closed-form solution for 1-dimensional linear regression via separation of variables, and GF's basic properties: monotone descent of the objective, a time bound for reaching an $\epsilon$-stationary point, and the fact that limits of the flow are critical points.

## Topics covered
- Reminder: GD iterates $\theta_{t+1}=\theta_t-\eta\nabla f(\theta_t)$
- Definition of gradient flow as an ODE; GF as GD with infinitesimal $\eta$
- Existence & uniqueness of the GF curve when $f$ is locally smooth ($\nabla f$ locally Lipschitz)
- From GD to GF (finite-difference limit) and from GF to GD (first-order Taylor / Euler discretization)
- Why study GF: simpler analysis, closed-form trajectories, results often transfer to small-$\eta$ GD
- Worked example: closed-form GF trajectory for 1-D linear regression (exponential convergence)
- Monotonicity of $f(\theta(t))$ under GF (vs. GD, which needs smoothness + small $\eta$)
- Convergence rate to an $\epsilon$-stationary point
- Limit points of GF are critical points (for $f\in C^1$)

## Worked problems / derivations
**P1.** Show GF is the small-step limit of GD.
Technique: view GD iterates "sampled" at multiples of $\eta$:

$$\frac{\theta_{t+\eta}-\theta_t}{\eta} = -\nabla f(\theta_t)$$

; taking $\eta\to 0$ turns the difference quotient into

$$\frac{d}{dt}\theta(t) = -\nabla f(\theta(t))$$

**P2.** Show GD is a first-order discretization of GF.
Technique: Taylor-expand the flow:

$$\theta(t+\eta) = \theta(t) + \dot\theta(t)\eta + o(\eta) = \theta(t) - \eta\nabla f(\theta(t)) + o(\eta)$$

; dropping $o(\eta)$ gives the GD update (forward Euler).

**P3.** Closed-form GF solution for 1-D linear regression with one sample $x\in\mathbb{R}\setminus\{0\}$, $f(\theta)=\tfrac12(\theta x-y)^2$ (slide displays a $\tfrac1x$ prefactor, but the derivation uses $\nabla f(\theta)=(\theta x-y)x$).
Technique: the ODE is linear:

$$\dot\theta(t) = -\theta(t)x^2 + xy$$

; separate variables

$$\frac{\dot\theta(t)}{\theta(t)x^2-xy}=-1$$

, integrate to

$$\frac{1}{x^2}\big(\ln|\theta(t)x^2-xy| - \ln|\theta(0)x^2-xy|\big) = -t$$

, exponentiate:

$$\theta(t) = \frac{y}{x} + \big(\theta(0)-\frac{y}{x}\big)e^{-x^2 t}$$

— exponential convergence to the global minimizer $y/x$ at rate $x^2$. (The final slide's printed formula drops the "$+$"; the line above it is correct.)

**P4.** Monotonicity: $f(\theta(t))$ is non-increasing under GF.
Technique: one-line chain rule:

$$\frac{d}{dt}f(\theta(t)) = \nabla f(\theta(t))^\top\dot\theta(t) = -\|\nabla f(\theta(t))\|_2^2 \le 0$$

**P5.** GF reaches an $\epsilon$-stationary point by time $T \ge \frac{f(\theta(0))-f^*}{\epsilon^2}$ (assuming $f^*:=\min_\theta f(\theta)\in\mathbb{R}$).
Technique: fundamental theorem of calculus:

$$f(\theta(T))-f(\theta(0)) = -\int_0^T\|\nabla f(\theta(t))\|_2^2\,dt \le -T\min_{t\in[0,T]}\|\nabla f(\theta(t))\|_2^2$$

; rearrange to

$$\min_{t\in[0,T]}\|\nabla f(\theta(t))\|_2 \le \sqrt{\frac{f(\theta(0))-f^*}{T}}$$

and set the RHS $\le\epsilon$.

**P6.** Proposition: if $f\in C^1$ and $\lim_{t\to\infty}\theta(t)=\theta^*$, then $\theta^*$ is a critical point of $f$.
Technique: stated as an exercise here ("straightforward"); proved in full in Recitation 8 (contradiction via continuity + fundamental theorem of calculus).

## Key formulas & facts
- GD: $\theta_{t+1} = \theta_t - \eta\nabla f(\theta_t)$, $\eta>0$
- GF: $\dot\theta(t) := \frac{d}{dt}\theta(t) = -\nabla f(\theta(t)),\quad t\in\mathbb{R}_{\ge 0}$
- Uniqueness: if $f$ is locally smooth ($\nabla f$ locally Lipschitz), for every $\theta_0$ there is a unique curve $\theta:\mathbb{R}_{\ge0}\to\mathbb{R}^d$ with $\theta(0)=\theta_0$ solving the ODE
- Euler view: $\theta(t+\eta) = \theta(t) - \eta\nabla f(\theta(t)) + o(\eta)$
- Descent identity: $\frac{d}{dt}f(\theta(t)) = -\|\nabla f(\theta(t))\|_2^2 \le 0$ (GF is always monotone; GD is monotone only for smooth $f$ with small enough $\eta$)
- Stationarity rate: $\min_{t\in[0,T]}\|\nabla f(\theta(t))\|_2 \le \sqrt{\frac{f(\theta(0))-f^*}{T}}$; hence $\epsilon$-stationary by $T\ge\frac{f(\theta(0))-f^*}{\epsilon^2}$
- 1-D linear regression trajectory: $\theta(t) = \frac{y}{x} + \big(\theta(0)-\frac{y}{x}\big)e^{-x^2t}$
- If GF converges, its limit is a critical point ($f\in C^1$)

## Exam-relevant nuggets
- The one-line descent proof $\frac{d}{dt}f(\theta(t)) = -\|\nabla f\|^2 \le 0$ is the single most reusable identity — it also powers the $\epsilon$-stationarity bound and reappears (with $P_t$) in the preconditioning recitation.
- The proof pattern "FTC on a monitored quantity, then bound the integrand" recurs in Recitations 7–9; internalize it.
- Know both directions of the GD↔GF dictionary: limit $\eta\to0$ vs. first-order Taylor/Euler discretization, and *why* GF is studied (closed forms, transferable results).
- Separation of variables on $\dot\theta = -x^2\theta + xy$ is the standard trick for closed-form GF trajectories; the convergence rate is the curvature $x^2$ (exponential/linear convergence for this strongly convex objective).
- Distinguish guarantees: GF descent needs nothing beyond differentiability; GD descent needs $\beta$-smoothness and small $\eta$ — a favorite true/false discriminator.
