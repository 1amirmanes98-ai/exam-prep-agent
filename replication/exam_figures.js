/* replication/exam_figures.js — reusable per-question exam-figure engine
   ============================================================================
   Drop-in canvas generators for exam questions that hinge on a PLOT — histogram,
   scatter/regression, QQ-plot, boxplot, residuals. Proven in the Intro-to-Statistics
   course; copy the generators you need into your course's site_template.html (just
   above `const FIGS = {`), then wire the three hooks below.

   WHY SCHEMATIC: the index stores each plot's DESCRIBED shape plus the exam's exact
   printed parameters (a regression equation, R summary stats, axis ranges) but not
   the raw sample points. So these draw FAITHFUL RECONSTRUCTIONS — correct shape,
   trend, and line — captioned as illustrations, never pixel copies. When the exam
   prints exact numbers (Y=a+bX, or mean/sd/cor), pass them so the line/center is exact.

   ---- WIRING (three small edits to site_template.html) ----------------------
   1) figNode gains an `open` flag (exam figures render expanded; concept figures on
      topics/memo stay collapsed):
        function figNode(id, open) {
          ...existing body, ending with MOUNTED_FIGS.push(...)...
          if (open) { d.open = true; requestAnimationFrame(() => f.draw(cv)); }
          return d;
        }
   2) A per-question registry + map (course-specific — the ONE sanctioned template
      edit, exactly like FIGS). id convention = "ex_<examId>_Q<n>":
        Object.assign(FIGS, {
          "ex_a_2012_Q2": { title: "...", pillar: "Descriptive",
            caption: "Illustration: ...",
            draw: figScatter({ xr:[...], yr:[...], slope:..., xlab:"...", ylab:"..." }) },
          ...
        });
        const FIG_EXAM = { "a_2012_Q2": ["ex_a_2012_Q2"], ... };
   3) Mount under the statement in renderExamDetail (and questionCard), OPEN:
        setMd($(".mdslot", c), q.statement);
        (FIG_EXAM[e.id + "_Q" + q.n] || []).forEach(fid =>
          $(".mdslot", c).appendChild(figNode(fid, true)));

   ---- HOW TO POPULATE FIG_EXAM FAST -----------------------------------------
   Fan out one extraction agent per batch of exam files; each READS the statements
   and emits a tiny JSON spec { qid, type, title, caption, params } using the param
   fields each generator accepts (below). An assembler turns that JSON into the
   Object.assign(FIGS,...) + FIG_EXAM block — no agent writes canvas code, so the
   figures stay pre-tested. See REPLICATION.md Phase 7.

   ---- DEPENDENCIES already in the template ----------------------------------
   figCanvas(el, w, h) (dpr-aware) and cssVar(name) (theme colors). Each draw sets
   ctx.direction="ltr" so math/axis text stays LTR inside an RTL page; open figures
   redraw on theme toggle via the MOUNTED_FIGS list.

   ---- PARAM REFERENCE -------------------------------------------------------
   figScatter({ xr:[a,b], yr:[a,b], xlab, ylab, dir:"pos"|"neg",
                slope?, intercept?, eqn?, spread?(0.04-0.30), n?, seed? })
     - regression line printed  -> set slope/intercept/eqn (exact line);
       residuals plot           -> slope:0, yr symmetric about 0;
       R stats (mean/sd/cor)    -> xr=[mX-3sX,mX+3sX], yr=[mY-3sY,mY+3sY],
                                   slope=cor*sY/sX, intercept=mY-slope*mX,
                                   spread~=0.3*sqrt(1-cor^2).
   figHist({ panels:[{ shape:"sym"|"rskew"|"lskew", label, range }], ylab? })
   figQQ({ pattern:"heavy"|"light"|"rskew"|"lskew"|"linear", xlab?, ylab? })
   figBox({ boxes:[{ shape:"sym"|"rskew"|"lskew"|"rskewX", label }], ylab? })
   ============================================================================ */

function figRng(seed) { let s = (seed || 1) >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function figGauss(R) { return (R() + R() + R() + R() - 2) / 2; } // approx N(0,~0.33)
function figFrame(ctx, x0, y0, w, h, xlab, ylab) {
  const muted = cssVar("--muted"), ink = cssVar("--ink");
  ctx.strokeStyle = muted; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 + h); ctx.lineTo(x0 + w, y0 + h); ctx.stroke();
  ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
  if (xlab) { ctx.textAlign = "center"; ctx.fillText(xlab, x0 + w / 2, y0 + h + 24); }
  if (ylab) { ctx.save(); ctx.translate(x0 - 32, y0 + h / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.fillText(ylab, 0, 0); ctx.restore(); }
  ctx.textAlign = "left";
}
function figScatter(cfg) {
  return function (cv) {
    const W = cfg.W || 560, H = cfg.H || 320, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
    const acc = cssVar("--pc") || cssVar("--opt"), ink = cssVar("--ink");
    const x0 = 52, y0 = 16, w = W - 78, h = H - 54;
    const [xa, xb] = cfg.xr, [ya, yb] = cfg.yr;
    const sx = x => x0 + (x - xa) / (xb - xa) * w, sy = y => y0 + h - (y - ya) / (yb - ya) * h;
    figFrame(ctx, x0, y0, w, h, cfg.xlab, cfg.ylab);
    const b = cfg.slope != null ? cfg.slope : (cfg.dir === "neg" ? -1 : 1) * (yb - ya) / (xb - xa) * 0.78;
    const a = cfg.intercept != null ? cfg.intercept : (ya + yb) / 2 - b * (xa + xb) / 2;
    const line = x => a + b * x, R = figRng(cfg.seed || 7), n = cfg.n || 32;
    const spread = (cfg.spread != null ? cfg.spread : 0.16) * (yb - ya);
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip();
    ctx.fillStyle = acc; ctx.globalAlpha = .68;
    for (let i = 0; i < n; i++) {
      const x = xa + (i + 0.5) / n * (xb - xa) + (R() - 0.5) * (xb - xa) / n * 1.4;
      const y = line(x) + figGauss(R) * spread * 2;
      ctx.beginPath(); ctx.arc(sx(x), sy(y), 3, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = cssVar("--bad") || "#c0392b"; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(sx(xa), sy(line(xa))); ctx.lineTo(sx(xb), sy(line(xb))); ctx.stroke();
    ctx.restore();
    if (cfg.eqn) { ctx.fillStyle = ink; ctx.font = "12.5px " + cssVar("--mono"); ctx.fillText(cfg.eqn, x0 + 10, y0 + 15); }
  };
}
function figHist(cfg) {
  const shapeH = (shape, t) => { // t in [0,1] across bins -> relative height
    if (shape === "sym") return Math.exp(-Math.pow((t - 0.5) * 3.1, 2));
    if (shape === "rskew") return Math.pow(Math.max(0, 1 - t), 0.6) * Math.exp(-Math.pow((t - 0.12) * 3.0, 2)) + 0.75 * Math.exp(-Math.pow((t - 0.14) * 4.2, 2));
    if (shape === "lskew") return shapeH("rskew", 1 - t);
    return Math.exp(-Math.pow((t - 0.5) * 3.1, 2));
  };
  return function (cv) {
    const panels = cfg.panels, W = cfg.W || (panels.length > 1 ? 640 : 520), H = cfg.H || 260;
    const ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
    const acc = cssVar("--pc") || cssVar("--opt"), ink = cssVar("--ink");
    const gap = 30, pw = (W - 40 - gap * (panels.length - 1)) / panels.length, y0 = 14, h = H - 52;
    panels.forEach((p, pi) => {
      const x0 = 30 + pi * (pw + gap), nb = p.bins || 13, pwi = pw - 8;
      figFrame(ctx, x0, y0 + 14, pwi, h - 14, "", pi === 0 ? (cfg.ylab || "שכיחות") : "");
      let hs = []; for (let i = 0; i < nb; i++) hs.push(shapeH(p.shape, (i + 0.5) / nb));
      const mx = Math.max(...hs), bw = pwi / nb, base = y0 + h;
      ctx.fillStyle = acc; ctx.globalAlpha = .78;
      hs.forEach((v, i) => { const bh = v / mx * (h - 22); ctx.fillRect(x0 + i * bw + 1, base - bh, bw - 2, bh); });
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      if (p.label) { ctx.fillStyle = ink; ctx.font = "600 13px " + cssVar("--sans"); ctx.fillText(p.label, x0 + pwi / 2, y0 + 10); }
      if (p.range) { ctx.fillStyle = cssVar("--muted"); ctx.font = "11px " + cssVar("--sans"); ctx.fillText(p.range, x0 + pwi / 2, y0 + h + 20); }
      ctx.textAlign = "left";
    });
  };
}
function figQQ(cfg) {
  const mapq = (pat, t) => { // t = theoretical (normal) quantile -> sample quantile
    if (pat === "heavy") return t * (1 + 0.42 * t * t);
    if (pat === "light") return Math.sign(t) * Math.pow(Math.abs(t), 0.62) * 1.15;
    if (pat === "rskew") return t + 0.34 * (t * t - 1);
    if (pat === "lskew") return t - 0.34 * (t * t - 1);
    return t;
  };
  return function (cv) {
    const W = cfg.W || 380, H = cfg.H || 320, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
    const acc = cssVar("--pc") || cssVar("--opt"), muted = cssVar("--muted");
    const x0 = 46, y0 = 16, w = W - 66, h = H - 54, R = 2.9;
    const sx = v => x0 + (v + R) / (2 * R) * w, sy = v => y0 + h - (v + R) / (2 * R) * h;
    figFrame(ctx, x0, y0, w, h, cfg.xlab || "שברוני הנורמלית", cfg.ylab || "שברוני המדגם");
    ctx.strokeStyle = muted; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(sx(-R), sy(-R)); ctx.lineTo(sx(R), sy(R)); ctx.stroke(); ctx.setLineDash([]);
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip();
    ctx.fillStyle = acc; ctx.globalAlpha = .8;
    const n = cfg.n || 22;
    for (let i = 0; i < n; i++) { const t = -2.3 + (i + 0.5) / n * 4.6, s = mapq(cfg.pattern, t); ctx.beginPath(); ctx.arc(sx(t), sy(s), 3, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1; ctx.restore();
  };
}
function figBox(cfg) {
  const q = { sym: [.5, .28, .72, .12, .88], rskew: [.32, .2, .52, .1, .86], lskew: [.68, .48, .8, .14, .9], rskewX: [.22, .13, .38, .06, .8] };
  return function (cv) {
    const boxes = cfg.boxes, W = cfg.W || Math.max(300, boxes.length * 120 + 60), H = cfg.H || 300;
    const ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
    const acc = cssVar("--pc") || cssVar("--opt"), ink = cssVar("--ink"), muted = cssVar("--muted");
    const x0 = 40, y0 = 16, h = H - 52, slot = (W - x0 - 20) / boxes.length;
    figFrame(ctx, x0, y0, W - x0 - 20, h, "", cfg.ylab || "");
    boxes.forEach((bx, i) => {
      const p = q[bx.shape] || q.sym, cx = x0 + slot * (i + 0.5), bw = Math.min(46, slot * 0.5);
      const Y = v => y0 + h - v * h;
      ctx.strokeStyle = ink; ctx.fillStyle = acc; ctx.globalAlpha = .5; ctx.lineWidth = 1.4;
      ctx.fillRect(cx - bw / 2, Y(p[2]), bw, Y(p[1]) - Y(p[2])); ctx.globalAlpha = 1;
      ctx.strokeRect(cx - bw / 2, Y(p[2]), bw, Y(p[1]) - Y(p[2]));
      ctx.beginPath(); ctx.moveTo(cx - bw / 2, Y(p[0])); ctx.lineTo(cx + bw / 2, Y(p[0])); ctx.stroke(); // median
      ctx.strokeStyle = muted; ctx.beginPath();
      ctx.moveTo(cx, Y(p[1])); ctx.lineTo(cx, Y(p[3])); ctx.moveTo(cx, Y(p[2])); ctx.lineTo(cx, Y(p[4])); ctx.stroke();
      ctx.moveTo(cx - bw / 4, Y(p[3])); ctx.lineTo(cx + bw / 4, Y(p[3])); ctx.moveTo(cx - bw / 4, Y(p[4])); ctx.lineTo(cx + bw / 4, Y(p[4])); ctx.stroke();
      if (bx.out) bx.out.forEach(o => { ctx.strokeStyle = cssVar("--bad"); ctx.beginPath(); ctx.arc(cx, Y(o), 2.4, 0, 7); ctx.stroke(); });
      if (bx.label) { ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans"); ctx.textAlign = "center"; ctx.fillText(bx.label, cx, y0 + h + 22); ctx.textAlign = "left"; }
    });
  };
}
