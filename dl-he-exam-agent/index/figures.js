/* Course figure registries (FODL) — injected verbatim into the site template at __FIGS__.
   Contract: define const FIGS (id -> {title, pillar, caption, draw}), FIG_EXAM
   ("<examid>_Q<n>" -> [figure ids]), FIG_TOPIC_MAP and FIG_MEMO_MAP
   ([[keyword-regex, figure id], ...]). Generators (figCanvas/cssVar/figNode...) are
   defined by the engine template before this point. */
const MOUNTED_FIGS = [];
const FIGS = {
  linnet: {
    title: "A deep linear network is a single matrix",
    pillar: "Optimization",
    caption: "Structure of a depth-3 linear network: every layer applies a weight matrix and there is no nonlinearity between them, so the whole map collapses to the single product W = W₃W₂W₁. Many parameters (the individual Wᵢ) realize one end-to-end matrix W — and gradient descent on the Wᵢ is what implicitly biases which W you reach. This composition-into-one-matrix is the object the course's deep-linear-network results analyse.",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const ink = cssVar("--ink"), muted = cssVar("--muted"), col = cssVar("--opt"), serif = cssVar("--serif");
      const widths = [3, 5, 4, 2];
      const cols = widths.length, xL = 82, xR = W - 82, gap = (xR - xL) / (cols - 1);
      const cy = 150, r = 8.5, vs = 24;
      const P = widths.map((n, i) => ({ x: xL + i * gap, ys: Array.from({ length: n }, (_, k) => cy + (k - (n - 1) / 2) * vs) }));
      // full-connectivity edges (faint)
      ctx.strokeStyle = muted; ctx.globalAlpha = .3; ctx.lineWidth = 1;
      for (let i = 0; i < cols - 1; i++) P[i].ys.forEach(y1 => P[i + 1].ys.forEach(y2 => { ctx.beginPath(); ctx.moveTo(P[i].x, y1); ctx.lineTo(P[i + 1].x, y2); ctx.stroke(); }));
      ctx.globalAlpha = 1;
      // neurons (input/output filled, hidden hollow)
      P.forEach((p, i) => { const edge = i === 0 || i === cols - 1; p.ys.forEach(y => { ctx.beginPath(); ctx.arc(p.x, y, r, 0, 2 * Math.PI); ctx.fillStyle = col; ctx.globalAlpha = edge ? .85 : .16; ctx.fill(); ctx.globalAlpha = 1; ctx.lineWidth = 1.6; ctx.strokeStyle = col; ctx.stroke(); }); });
      ctx.textAlign = "center";
      ctx.fillStyle = muted; ctx.font = "12px " + serif;
      ctx.fillText("input  x ∈ ℝ³", P[0].x, 26);
      ctx.fillText("output  y ∈ ℝ²", P[cols - 1].x, 26);
      // weight matrix names + shapes between layers
      const wl = ["W₁", "W₂", "W₃"];
      for (let i = 0; i < cols - 1; i++) { const xm = (P[i].x + P[i + 1].x) / 2; ctx.fillStyle = ink; ctx.font = "600 15px " + serif; ctx.fillText(wl[i], xm, 44); ctx.fillStyle = muted; ctx.font = "11px " + serif; ctx.fillText(widths[i + 1] + "×" + widths[i], xm, 60); }
      // layer dimensions
      ctx.fillStyle = muted; ctx.font = "12px " + serif;
      const yb = cy + ((Math.max(...widths) - 1) / 2) * vs + 26;
      P.forEach((p, i) => ctx.fillText("d" + "₀₁₂₃"[i] + " = " + widths[i], p.x, yb));
      // the collapse
      ctx.fillStyle = col; ctx.font = "600 16px " + serif;
      ctx.fillText("end-to-end map:   W = W₃ · W₂ · W₁   ∈ ℝ²ˣ³", W / 2, H - 18);
    }
  },
  factor: {
    title: "Symmetric factorization  W = UUᵀ",
    pillar: "Optimization",
    caption: "The object of the matrix-factorization problem: a d×k search matrix U is squared into W = UUᵀ, which is automatically symmetric and positive-semidefinite with rank ≤ k. Gradient descent optimises the factor U, not W directly, and among all factors giving the same fit it is biased toward small-norm, low-rank U — the implicit regularisation these questions probe.",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const ink = cssVar("--ink"), muted = cssVar("--muted"), col = cssVar("--opt"), serif = cssVar("--serif");
      function block(x, y, w, h, label, dim) {
        ctx.fillStyle = col; ctx.globalAlpha = .14; ctx.fillRect(x, y, w, h); ctx.globalAlpha = 1;
        ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.strokeRect(x, y, w, h);
        ctx.fillStyle = ink; ctx.font = "600 17px " + serif; ctx.textAlign = "center";
        ctx.fillText(label, x + w / 2, y + h / 2 + 6);
        ctx.fillStyle = muted; ctx.font = "11px " + serif; ctx.fillText(dim, x + w / 2, y + h + 15);
      }
      const cy = 100;
      ctx.textAlign = "center";
      block(80, cy - 55, 56, 110, "U", "d × k");
      ctx.fillStyle = ink; ctx.font = "600 20px " + serif; ctx.fillText("·", 158, cy + 6);
      block(176, cy - 28, 110, 56, "Uᵀ", "k × d");
      ctx.fillStyle = ink; ctx.font = "600 20px " + serif; ctx.fillText("=", 322, cy + 6);
      block(356, cy - 55, 110, 110, "W", "d × d");
      ctx.textAlign = "left";
      ctx.fillStyle = col; ctx.font = "600 15px " + serif; ctx.fillText("W = UUᵀ", 80, H - 66);
      ctx.fillStyle = muted; ctx.font = "13px " + serif;
      ctx.fillText("symmetric   ·   positive-semidefinite  (W ⪰ 0)   ·   rank ≤ k", 172, H - 66);
      ctx.fillStyle = ink; ctx.font = "13px " + serif;
      ctx.fillText("=  Σᵢ₌₁ᵏ  uᵢ uᵢᵀ      (a sum of k rank-1 outer products)", 80, H - 36);
    }
  },
  tensor: {
    title: "A tensor as a sum of rank-1 terms (CP)",
    pillar: "Expressiveness",
    caption: "The expressiveness pillar arranges a network's computation as a tensor and studies its rank. A CP decomposition writes that tensor as a sum of R rank-1 terms, each an outer product a∘b∘c of three vectors. Shallow nets realise only low CP-rank tensors; deep nets reach tensors of exponentially higher hierarchical (HT) rank — the algebraic source of depth separation (Lecture 2; Kronecker / expressiveness recitation).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const ink = cssVar("--ink"), muted = cssVar("--muted"), col = cssVar("--exp"), serif = cssVar("--serif");
      const cy = 128;
      (function cube(x, y, s) {
        const dx = s * .5, dy = s * .3;
        ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.fillStyle = col;
        ctx.globalAlpha = .16; ctx.fillRect(x, y, s, s); ctx.globalAlpha = 1; ctx.strokeRect(x, y, s, s);
        ctx.globalAlpha = .3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx, y - dy); ctx.lineTo(x + s + dx, y - dy); ctx.lineTo(x + s, y); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
        ctx.globalAlpha = .09; ctx.beginPath(); ctx.moveTo(x + s, y); ctx.lineTo(x + s + dx, y - dy); ctx.lineTo(x + s + dx, y + s - dy); ctx.lineTo(x + s, y + s); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; ctx.stroke();
      })(52, cy - 30, 60);
      ctx.fillStyle = ink; ctx.font = "600 15px " + serif; ctx.textAlign = "center"; ctx.fillText("tensor 𝒯", 92, cy + 62);
      ctx.font = "600 22px " + serif; ctx.fillText("=", 168, cy + 4);
      function tripod(x, label) {
        const L = 30, arms = [[0, -L], [L * .88, L * .5], [-L * .8, L * .48]];
        ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2;
        arms.forEach(([ax, ay]) => {
          ctx.beginPath(); ctx.moveTo(x, cy); ctx.lineTo(x + ax, cy + ay); ctx.stroke();
          const a = Math.atan2(ay, ax);
          ctx.beginPath(); ctx.moveTo(x + ax, cy + ay);
          ctx.lineTo(x + ax - 7 * Math.cos(a - .4), cy + ay - 7 * Math.sin(a - .4));
          ctx.lineTo(x + ax - 7 * Math.cos(a + .4), cy + ay - 7 * Math.sin(a + .4));
          ctx.closePath(); ctx.fill();
        });
        ctx.fillStyle = muted; ctx.font = "italic 12px " + serif; ctx.textAlign = "center"; ctx.fillText(label, x, cy + 52);
      }
      tripod(228, "a₁∘b₁∘c₁");
      ctx.fillStyle = ink; ctx.font = "600 20px " + serif; ctx.fillText("+", 292, cy + 4);
      tripod(352, "a₂∘b₂∘c₂");
      ctx.fillStyle = ink; ctx.font = "600 20px " + serif; ctx.fillText("+  ⋯  +", 424, cy + 4);
      tripod(504, "aᵣ∘bᵣ∘cᵣ");
      ctx.fillStyle = col; ctx.font = "600 14px " + serif; ctx.textAlign = "center";
      ctx.fillText("CP rank = smallest number R of rank-1 terms", W / 2, H - 16);
    }
  },
  sawtooth: {
    title: "Depth doubles the sawtooth",
    pillar: "Expressiveness",
    caption: "Computed: the width-3 tent map g and its self-compositions. Pieces double with every composition (2 → 4 → 8): an L-layer net oscillates ~2^L times while a shallow net needs width ~2^L to keep up (Telgarsky, Lecture 2).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const ink = cssVar("--ink"), muted = cssVar("--muted"), col = cssVar("--exp");
      const g = x => x < .5 ? 2 * x : 2 - 2 * x;
      for (let k = 1; k <= 3; k++) {
        const y0 = 8 + (k - 1) * 98, h = 78, x0 = 46, w = W - 66;
        ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.globalAlpha = .5;
        ctx.strokeRect(x0, y0, w, h); ctx.globalAlpha = 1;
        ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 0; i <= 600; i++) {
          let x = i / 600, y = x;
          for (let j = 0; j < k; j++) y = g(y);          // the actual composition
          const px = x0 + x * w, py = y0 + h - y * h;
          i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.stroke();
        ctx.fillStyle = ink; ctx.font = "13px " + cssVar("--serif");
        ctx.fillText(k === 1 ? "g — 2 pieces" : k === 2 ? "g∘g — 4 pieces" : "g∘g∘g — 8 pieces", x0 + 6, y0 + 14);
      }
    }
  },
  phase: {
    title: "Gradient flow rides the conserved hyperbolas",
    pillar: "Optimization",
    caption: "Computed trajectories (RK4) of gradient flow on L(w₁,w₂)=½(w₁w₂−1)². Solid teal paths are the real flow; dashed curves are the level sets w₁²−w₂²=const — balancedness (Lecture 4) says the flow can never leave its hyperbola. Green curve: the minima set w₁w₂=1.",
    draw(cv) {
      const W = 640, H = 340, ctx = figCanvas(cv, W, H);
      const muted = cssVar("--muted"), opt = cssVar("--opt"), good = cssVar("--good"), ink = cssVar("--ink");
      const R = 2.3, sx = v => (v + R) / (2 * R) * (W - 40) + 20, sy = v => H - 20 - (v + R) / (2 * R) * (H - 40);
      // dashed conserved hyperbolas w1^2 - w2^2 = c
      ctx.setLineDash([4, 4]); ctx.lineWidth = 1; ctx.strokeStyle = muted; ctx.globalAlpha = .6;
      [-3, -1.5, 0, 1.5, 3].forEach(c => {
        [-1, 1].forEach(sgn => {
          ctx.beginPath(); let started = false;
          for (let w2 = -R; w2 <= R; w2 += .01) {
            const v = w2 * w2 + c;
            if (v < 0) { started = false; continue; }
            const w1 = sgn * Math.sqrt(v);
            if (Math.abs(w1) > R) { started = false; continue; }
            const px = sx(w1), py = sy(w2);
            started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true);
          }
          ctx.stroke();
        });
      });
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      // minima curve w1*w2 = 1
      ctx.strokeStyle = good; ctx.lineWidth = 1.5;
      [[.44, R], [-R, -.44]].forEach(([a, b]) => {
        ctx.beginPath(); let st = false;
        for (let w1 = a; w1 <= b; w1 += .01) {
          const w2 = 1 / w1;
          if (Math.abs(w2) > R) { st = false; continue; }
          st ? ctx.lineTo(sx(w1), sy(w2)) : (ctx.moveTo(sx(w1), sy(w2)), st = true);
        }
        ctx.stroke();
      });
      // real GF trajectories, RK4 on -∇L
      const f = ([a, b]) => { const r = a * b - 1; return [-r * b, -r * a]; };
      ctx.strokeStyle = opt; ctx.lineWidth = 1.8;
      for (let i = 0; i < 18; i++) {
        const th = i / 18 * 2 * Math.PI;
        let p = [2.1 * Math.cos(th), 2.1 * Math.sin(th)];
        ctx.beginPath(); ctx.moveTo(sx(p[0]), sy(p[1]));
        for (let s = 0; s < 900; s++) {
          const h = .008, k1 = f(p), p2 = [p[0] + h / 2 * k1[0], p[1] + h / 2 * k1[1]],
            k2 = f(p2), p3 = [p[0] + h / 2 * k2[0], p[1] + h / 2 * k2[1]],
            k3 = f(p3), p4 = [p[0] + h * k3[0], p[1] + h * k3[1]], k4 = f(p4);
          p = [p[0] + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
               p[1] + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])];
          if (Math.abs(p[0]) > R || Math.abs(p[1]) > R) break;
          ctx.lineTo(sx(p[0]), sy(p[1]));
        }
        ctx.stroke();
      }
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("w₂", sx(0) + 6, 16); ctx.fillText("w₁", W - 34, sy(0) - 6);
    }
  },
  sigma: {
    title: "Rich get richer: singular-value dynamics",
    pillar: "Optimization",
    caption: "Computed σᵣ(t) for the depth-3 dynamics σ̇ᵣ = −3(σᵣ²)^(2/3)(σᵣ−σᵣ*) from tiny init σᵣ(0)=0.01, targets σ*=3, 2, 1, 0.4. Modes with large targets take off first and sequentially; small ones stall near zero — the implicit low-rank bias of deep matrix factorization (Lecture 8).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const muted = cssVar("--muted"), ink = cssVar("--ink");
      const cols = [cssVar("--opt"), cssVar("--exp"), cssVar("--gen"), muted];
      const T = 9, dt = .002, n = Math.round(T / dt);
      const targets = [3, 2, 1, .4], x0 = 44, y0 = 14, w = W - 64, h = H - 52;
      ctx.strokeStyle = muted; ctx.globalAlpha = .5; ctx.strokeRect(x0, y0, w, h); ctx.globalAlpha = 1;
      targets.forEach((s, r) => {
        let sig = .01;
        ctx.strokeStyle = cols[r]; ctx.lineWidth = 2; ctx.beginPath();
        ctx.moveTo(x0, y0 + h - sig / 3.2 * h);
        for (let i = 1; i <= n; i++) {
          sig += dt * (-3 * Math.pow(sig * sig, 2 / 3) * (sig - s)); // the actual ODE
          if (i % 25 === 0) ctx.lineTo(x0 + i / n * w, y0 + h - Math.min(sig, 3.2) / 3.2 * h);
        }
        ctx.stroke();
        ctx.fillStyle = cols[r]; ctx.font = "12px " + cssVar("--sans");
        ctx.fillText("σ*=" + s, x0 + w + 4 - 40, y0 + h - s / 3.2 * h - 4);
      });
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("t →", x0 + w - 24, y0 + h + 16); ctx.fillText("σᵣ(t)", x0 + 2, y0 + 12);
    }
  },
  minnorm: {
    title: "GD finds the minimum-norm solution",
    pillar: "Generalization",
    caption: "Computed GD iterates (dots) on ½(w·x−y)² for one equation w·x=1, x=(1, 0.6), from w=0. The trajectory never leaves the row space span{x} (dashed ray) and converges to the projection of 0 onto the solution line — the minimum-norm solution (ring). Any other point on the line (×) also fits the data but has larger norm (dotted circle = the min-norm radius). Lecture 7's implicit bias.",
    draw(cv) {
      const W = 640, H = 320, ctx = figCanvas(cv, W, H);
      const muted = cssVar("--muted"), opt = cssVar("--opt"), good = cssVar("--good"), bad = cssVar("--bad"), ink = cssVar("--ink");
      const R = 1.6, sx = v => (v + .55) / R * (W - 60) + 30, sy = v => H - 30 - (v + .35) / R * (H - 60);
      const X = [1, .6], y = 1, nrm2 = X[0] * X[0] + X[1] * X[1];
      // solution line w·x = 1
      ctx.strokeStyle = ink; ctx.lineWidth = 1.5; ctx.beginPath();
      const lineW2 = w1 => (y - X[0] * w1) / X[1];
      ctx.moveTo(sx(-.4), sy(lineW2(-.4))); ctx.lineTo(sx(1.05), sy(lineW2(1.05))); ctx.stroke();
      // row space ray
      ctx.setLineDash([5, 4]); ctx.strokeStyle = muted; ctx.beginPath();
      ctx.moveTo(sx(0), sy(0)); ctx.lineTo(sx(1.05), sy(.63)); ctx.stroke(); ctx.setLineDash([]);
      // min-norm point + its norm circle
      const mn = [X[0] * y / nrm2, X[1] * y / nrm2], rr = Math.hypot(mn[0], mn[1]);
      ctx.setLineDash([2, 4]); ctx.strokeStyle = good; ctx.beginPath();
      ctx.arc(sx(0), sy(0), (sx(rr) - sx(0)), 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([]);
      // GD iterates
      let wv = [0, 0]; ctx.fillStyle = opt;
      for (let k = 0; k < 14; k++) {
        ctx.beginPath(); ctx.arc(sx(wv[0]), sy(wv[1]), 3.2, 0, 2 * Math.PI); ctx.fill();
        const r = wv[0] * X[0] + wv[1] * X[1] - y;
        wv = [wv[0] - .35 * r * X[0], wv[1] - .35 * r * X[1]];   // the actual GD step
      }
      ctx.strokeStyle = good; ctx.lineWidth = 2; ctx.beginPath();
      ctx.arc(sx(mn[0]), sy(mn[1]), 6, 0, 2 * Math.PI); ctx.stroke();
      // a worse solution on the line
      const other = [-.25, lineW2(-.25)];
      ctx.strokeStyle = bad; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx(other[0]) - 5, sy(other[1]) - 5); ctx.lineTo(sx(other[0]) + 5, sy(other[1]) + 5);
      ctx.moveTo(sx(other[0]) + 5, sy(other[1]) - 5); ctx.lineTo(sx(other[0]) - 5, sy(other[1]) + 5); ctx.stroke();
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("w·x = 1 (all solutions)", sx(.62), sy(lineW2(.62)) - 8);
      ctx.fillText("span{x}", sx(.86), sy(.52));
      ctx.fillStyle = good; ctx.fillText("min-norm", sx(mn[0]) + 9, sy(mn[1]) + 4);
      ctx.fillStyle = bad; ctx.fillText("fits too, bigger ‖w‖", sx(other[0]) + 8, sy(other[1]) + 4);
    }
  },
  hoeffding: {
    title: "Hoeffding concentration, watched live",
    pillar: "Generalization",
    caption: "Computed: 40 simulated empirical means of fair coin flips (grey paths) against the Hoeffding envelope p ± √(ln(2/δ)/2N) for δ=0.05 (amber). The paths concentrate at rate 1/√N exactly as the bound promises — the engine inside every Q3 uniform-convergence argument.",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const muted = cssVar("--muted"), gen = cssVar("--gen"), ink = cssVar("--ink");
      const x0 = 44, y0 = 14, w = W - 64, h = H - 52, NMAX = 400;
      const sx = n => x0 + (n / NMAX) * w, sy = v => y0 + h - v * h;
      ctx.strokeStyle = muted; ctx.globalAlpha = .5; ctx.strokeRect(x0, y0, w, h); ctx.globalAlpha = 1;
      // simulated empirical means (fixed-seed LCG so the figure is reproducible)
      let seed = 42; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
      ctx.strokeStyle = muted; ctx.globalAlpha = .35; ctx.lineWidth = 1;
      for (let p = 0; p < 40; p++) {
        let sum = 0; ctx.beginPath();
        for (let n = 1; n <= NMAX; n++) {
          sum += rnd() < .5 ? 0 : 1;
          const px = sx(n), py = sy(sum / n);
          n === 1 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = gen; ctx.lineWidth = 2;
      [1, -1].forEach(s => {
        ctx.beginPath(); let st = false;
        for (let n = 2; n <= NMAX; n++) {
          const eps = Math.sqrt(Math.log(2 / .05) / (2 * n));
          const v = Math.min(1, Math.max(0, .5 + s * eps));
          st ? ctx.lineTo(sx(n), sy(v)) : (ctx.moveTo(sx(n), sy(v)), st = true);
        }
        ctx.stroke();
      });
      ctx.setLineDash([3, 4]); ctx.strokeStyle = ink; ctx.beginPath();
      ctx.moveTo(sx(1), sy(.5)); ctx.lineTo(sx(NMAX), sy(.5)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("N →", x0 + w - 26, y0 + h + 16);
      ctx.fillStyle = gen; ctx.fillText("±√(ln(2/δ)/2N)", x0 + 8, y0 + 16);
    }
  },
  ntkdecay: {
    title: "NTK modes decay at their own eigenvalue rates",
    pillar: "Optimization",
    caption: "Computed: |qᵢ(t)| = e^(−λᵢt) on a log scale for eigenvalues λ = 3, 1, 0.3, 0.05 — and λ = 0 (dashed): a singular kernel mode NEVER decays, which is exactly why zero-loss convergence needs H* non-singular (Lecture 5; Moed B 2020 Q2).",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H);
      const muted = cssVar("--muted"), ink = cssVar("--ink"), bad = cssVar("--bad");
      const cols = [cssVar("--opt"), cssVar("--exp"), cssVar("--gen"), muted, bad];
      const lams = [3, 1, .3, .05, 0], T = 8, x0 = 44, y0 = 14, w = W - 96, h = H - 52;
      ctx.strokeStyle = muted; ctx.globalAlpha = .5; ctx.strokeRect(x0, y0, w, h); ctx.globalAlpha = 1;
      const LOGMIN = -4;
      lams.forEach((lam, i) => {
        ctx.strokeStyle = cols[i]; ctx.lineWidth = 2;
        if (lam === 0) ctx.setLineDash([6, 4]);
        ctx.beginPath();
        for (let s = 0; s <= 300; s++) {
          const t = s / 300 * T;
          const lg = Math.max(LOGMIN, -lam * t / Math.LN10);
          const px = x0 + s / 300 * w, py = y0 + (0 - lg) / (0 - LOGMIN) * h;
          s ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = cols[i]; ctx.font = "12px " + cssVar("--sans");
        const yEnd = y0 + Math.min(1, (lam * T / Math.LN10) / -LOGMIN) * h;
        ctx.fillText("λ=" + lam, x0 + w + 6, Math.min(y0 + h - 2, yEnd + 4));
      });
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("t →", x0 + w - 22, y0 + h + 16); ctx.fillText("log₁₀|qᵢ(t)|", x0 + 2, y0 + 12);
    }
  },
  covering: {
    title: "An ε-cover of the parameter ball",
    pillar: "Generalization",
    caption: "Computed: the ℓ∞ ball [−1,1]² tiled by grid points (ε=0.25), each covering an ε-square. Any parameter w (teal) sits within ε of a cover point, so Hoeffding + union bound over the FINITE cover plus the 2ρε Lipschitz transfer controls the whole continuum — the Moed A 2023 / Moed C 2024 Q3 pattern. In d dimensions |C_ε| is exponential in d.",
    draw(cv) {
      const W = 640, H = 320, ctx = figCanvas(cv, W, H);
      const muted = cssVar("--muted"), gen = cssVar("--gen"), opt = cssVar("--opt"), ink = cssVar("--ink");
      const eps = .25, R = 1.15, cx = W / 2 - 60, cy = H / 2, sc = (H - 60) / (2 * R);
      const sx = v => cx + v * sc, sy = v => cy - v * sc;
      ctx.strokeStyle = ink; ctx.lineWidth = 2;
      ctx.strokeRect(sx(-1), sy(1), 2 * sc, 2 * sc);
      const k = Math.ceil(1 / eps);
      ctx.strokeStyle = gen; ctx.fillStyle = gen; ctx.lineWidth = 1;
      for (let i = 0; i <= k; i++) for (let j = 0; j <= k; j++) {
        const px = -1 + i * 2 * eps, py = -1 + j * 2 * eps;
        ctx.globalAlpha = .25;
        ctx.strokeRect(sx(px - eps), sy(py + eps), 2 * eps * sc, 2 * eps * sc);
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(sx(px), sy(py), 2.4, 0, 2 * Math.PI); ctx.fill();
      }
      const wpt = [.62, -.33], near = [.5, -.5];
      ctx.fillStyle = opt; ctx.beginPath(); ctx.arc(sx(wpt[0]), sy(wpt[1]), 5, 0, 2 * Math.PI); ctx.fill();
      ctx.strokeStyle = opt; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(sx(wpt[0]), sy(wpt[1])); ctx.lineTo(sx(near[0]), sy(near[1])); ctx.stroke();
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("w", sx(wpt[0]) + 8, sy(wpt[1]) - 6);
      ctx.fillText("‖w − w̃‖∞ ≤ ε", sx(1) + 14, sy(.1));
      ctx.fillStyle = gen; ctx.fillText("|C_ε| ≤ (⌈1/ε⌉+1)^d", sx(1) + 14, sy(-.1));
    }
  },
  pillars: {
    title: "The three-pillar decomposition",
    pillar: "Practices",
    caption: "The course's organizing identity (Lecture 1): the population loss of the learned predictor splits into training error (Optimization: did we minimize L_S?), estimation error (Generalization: does L_S track L_D?), and approximation error (Expressiveness: can the class express a good predictor at all?).",
    draw(cv) {
      const W = 640, H = 170, ctx = figCanvas(cv, W, H);
      const ink = cssVar("--ink"), segs = [["Training error", cssVar("--opt"), .24], ["Estimation error", cssVar("--gen"), .33], ["Approximation error", cssVar("--exp"), .43]];
      let x = 40; const y0 = 62, h = 30, w = W - 80;
      ctx.font = "13px " + cssVar("--sans");
      segs.forEach(([label, col, frac]) => {
        ctx.fillStyle = col; ctx.globalAlpha = .85;
        ctx.fillRect(x, y0, w * frac, h); ctx.globalAlpha = 1;
        ctx.fillStyle = col;
        ctx.fillText(label, x + 4, y0 + h + 18);
        ctx.font = "11px " + cssVar("--sans"); ctx.fillStyle = cssVar("--muted");
        ctx.fillText(label === "Training error" ? "Optimization" : label === "Estimation error" ? "Generalization" : "Expressiveness", x + 4, y0 + h + 34);
        ctx.font = "13px " + cssVar("--sans");
        x += w * frac;
      });
      ctx.fillStyle = ink; ctx.font = "14px " + cssVar("--serif");
      ctx.fillText("L_D(ĥ)  —  population loss of the learned predictor", 40, 30);
      ctx.strokeStyle = ink; ctx.beginPath(); ctx.moveTo(40, 40); ctx.lineTo(40 + w, 40); ctx.stroke();
    }
  }
};
const FIG_EXAM = {};
const FIG_TOPIC_MAP = [
  [/deep linear|linear network|linear-nn|end-to-end/i, "linnet"],
  [/matrix.?factoriz|symmetric.*matrix|positive.semidefinite|low-rank|\bUU/i, "factor"],
  [/tensor|cp.?decomp|hierarchical.?tucker|kronecker|matriciz/i, "tensor"],
  [/depth separation|piecewise-linear\/constant/i, "sawtooth"],
  [/balancedness|scalar linear|conservation/i, "phase"],
  [/singular.value|eigenvalue dynamics|matrix factorization/i, "sigma"],
  [/min-norm/i, "minnorm"],
  [/hoeffding/i, "hoeffding"],
  [/ntk/i, "ntkdecay"],
  [/covering|discretization/i, "covering"],
];
const FIG_MEMO_MAP = [
  [/sawtooth/i, "sawtooth"],
  [/balancedness conservation/i, "phase"],
  [/singular-value \/ eigenvalue dynamics/i, "sigma"],
  [/matrix factorization|symmetric.*factoriz|positive semidefinite/i, "factor"],
  [/tensor|cp decomposition|hierarchical tucker/i, "tensor"],
  [/min-norm implicit bias/i, "minnorm"],
  [/three-pillar/i, "pillars"],
  [/hoeffding's inequality/i, "hoeffding"],
  [/ntk prediction dynamics/i, "ntkdecay"],
  [/covering \+ lipschitz/i, "covering"],
];
