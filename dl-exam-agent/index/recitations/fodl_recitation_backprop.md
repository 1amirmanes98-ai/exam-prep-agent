# Recitation: Backpropagation (Recitation 2)
- **File:** materials/recitations/fodl_recitation_backprop.pdf
- **Related lectures:** lecture_01_three_pillars, lecture_03_optimization_1
- **Summary:** Builds backpropagation from first principles. Starts with the Jacobian/gradient definitions and the multivariate chain rule, then walks through a concrete feed-forward network (linear layer → activation → linear layer → loss) written as a composition $\ell(W;x,y) = [f_{T+1}\circ\cdots\circ f_1](x)$. Defines the backward signals $\delta_t := J_{F_t}(h_t)$ (Jacobian of the "suffix" of the network w.r.t. the hidden state), derives the recursion $\delta_t = \delta_{t+1} J_{f_{t+1}}(h_t)$, computes the per-layer weight gradients $\nabla_{W_t}\ell = \delta_t^\top h_{t-1}^\top$, and ends with full forward/backward pseudocode.

## Topics covered
- Jacobian of $f:\mathbb{R}^n\to\mathbb{R}^m$; gradient as transposed Jacobian ($\nabla f := J_f^\top$)
- Jacobians of basic layers: linear map, elementwise activation
- Multivariate chain rule for Jacobians; gradient form of the chain rule
- FFNN written as a composition of layer functions (input / linear / activation / loss layers)
- Backward recursion for $\delta_t$ (loss Jacobian w.r.t. hidden state $h_t$)
- Gradient of the loss w.r.t. weight matrices (outer-product / rank-1 form)
- Backpropagation pseudocode: forward pass + backward pass

## Worked problems / derivations
**P1.** Compute Jacobians of elementary maps: $f(w)=Aw$ and $f(w)=\sigma(w)$ (elementwise).
Technique: apply the entrywise definition

$$[J_f(w)]_{ij}=\frac{\partial}{\partial w_j}f_i(w)$$

; get $J_f=A$ for linear maps and

$$J_f(w)=\mathrm{diag}(\sigma'(w_1),\dots,\sigma'(w_n))$$

for elementwise activations.

**P2.** Express a 4-layer FFNN with loss ($h_0=x$, $h_1=W_1h_0$, $h_2=\sigma(h_1)$, $h_3=W_3h_2$, $h_4=\ell_y(h_3)$) as a composition and derive the backward recursion for $\delta_t := J_{F_t}(h_t)$ where $F_t := f_{T+1}\circ\cdots\circ f_{t+1}$.
Technique: chain rule on the suffix composition:

$$\delta_t = J_{F_{t+1}\circ f_{t+1}}(h_t) = J_{F_{t+1}}(h_{t+1})\,J_{f_{t+1}}(h_t) = \delta_{t+1}J_{f_{t+1}}(h_t)$$

; the layer Jacobian is $W_{t+1}$ (linear) or $\mathrm{diag}(\sigma'(h_t))$ (activation).

**P3.** Gradient of the loss w.r.t. a weight matrix $W_t$.
Technique: treat $W_t$ as a concatenation of its rows; the Jacobian $J_{Wh_{t-1}}(W_t)$ is block-diagonal with blocks $h_{t-1}^\top$, so

$$J_{\ell}(W_t) = \delta_t\,\mathrm{blockdiag}(h_{t-1}^\top,\dots,h_{t-1}^\top)$$

; rearranging into matrix form gives

$$\nabla_{W_t}\ell(W;x,y) = \delta_t^\top h_{t-1}^\top$$

(rank-1 outer product).

**P4.** Backpropagation pseudocode.
Technique: forward pass stores all $h_t$; backward pass initializes $\delta_T = J_{\ell_y}(h_T)$ and recurses $\delta_t = \delta_{t+1}\cdot(W_{t+1}$ or $\mathrm{diag}(\sigma'(h_t)))$; weight gradients read off as $\delta_t^\top h_{t-1}^\top$.

## Key formulas & facts
- Jacobian: $[J_f(w)]_{ij} := \frac{\partial}{\partial w_j} f_i(w)$, $J_f(w)\in\mathbb{R}^{m,n}$ for $f:\mathbb{R}^n\to\mathbb{R}^m$
- Gradient convention: $\nabla_w f(w) := J_f(w)^\top \in \mathbb{R}^{n,m}$
- $f(w)=Aw \Rightarrow J_f(w)=A$;  $f(w)=\sigma(w)$ elementwise $\Rightarrow J_f(w)=\mathrm{diag}(\sigma'(w_1),\dots,\sigma'(w_n))$
- Chain rule: $J_{f\circ g}(w) = J_f(g(w))\,J_g(w)$
- Gradient form: $\nabla_w[f\circ g](w) = J_{f\circ g}(w)^\top = \nabla_w g(w)\,\nabla_{v=g(w)} f(v)$
- Network as composition: $\ell(W;x,y) := [f_{T+1}\circ f_T\circ\cdots\circ f_1](x)$ with loss layer $\ell_y(\cdot)$
- Backward signal: $\delta_t := J_{F_t}(h_t)\in\mathbb{R}^{1,\dim(h_t)}$ (a row vector); recursion $\delta_t = \delta_{t+1} J_{f_{t+1}}(h_t)$
- Weight gradient for linear layers: $\nabla_{W_t}\ell(W;x,y) = \delta_t^\top h_{t-1}^\top$
- Backward pass: $\delta_T = J_{\ell_y}(h_T)$, then $\delta_t = \delta_{t+1}\cdot\begin{cases} W_{t+1} & \text{linear layer}\\ \mathrm{diag}(\sigma'(h_t)) & \text{activation layer}\end{cases}$

## Exam-relevant nuggets
- Know the convention cold: gradient = Jacobian transposed; chain rule composes Jacobians as $J_f(g(w))J_g(w)$ (outer function's Jacobian on the left, evaluated at the inner value).
- The whole of backprop = "one chain-rule step per layer, accumulated right-to-left"; $\delta_t$ is reused so each layer costs one vector–matrix product.
- Classic exam task: rederive $\nabla_{W_t}\ell = \delta_t^\top h_{t-1}^\top$ for a small explicit network — the block-diagonal Jacobian w.r.t. rows of $W_t$ is the step people miss.
- Shape bookkeeping is the sanity check: $\delta_t$ is $1\times\dim(h_t)$; multiplying by $W_{t+1}\in\mathbb{R}^{\dim(h_{t+1}),\dim(h_t)}$ keeps it a row vector.
- Activation layers never have parameters; they only insert $\mathrm{diag}(\sigma'(h_t))$ into the backward product (this diagonal factor is the source of vanishing-gradient arguments).
