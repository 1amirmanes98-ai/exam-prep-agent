/* Course figure registries — injected verbatim into the site template at __FIGS__.
   Contract: define const FIGS (id -> {title, pillar, caption, draw}), FIG_EXAM
   ("<examid>_Q<n>" -> [figure ids]), FIG_TOPIC_MAP and FIG_MEMO_MAP
   ([[keyword-regex, figure id], ...]). Generators (figScatter/figHist/figQQ/
   figBox/figCanvas...) are defined by the engine template before this point. */
const FIGS = {
  // id "pillars" is the dashboard mount slot (the template inserts figNode("pillars")
  // under the exam-template bar). Statistics' most exam-relevant picture lives there.
  pillars: {
    title: "ההתפלגות הנורמלית ואזור הדחייה של 5%",
    pillar: "Testing",
    caption: "מחושב: צפיפות N(0,1) עם אזור הדחייה הדו-צדדי ברמת מובהקות α=0.05 — כלומר |Z| ≥ 1.96 (הקווצים המקווקווים: הסף החד-צדדי 1.645). שני המספרים האלה נושאים את רוב שאלות ה-Z ורווחי הסמך במבחן.",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
      const ink = cssVar("--ink"), muted = cssVar("--muted"), col = cssVar("--gen"), bad = cssVar("--bad");
      const x0 = 40, y0 = 16, w = W - 80, h = H - 66;
      const R = 3.6, sx = z => x0 + (z + R) / (2 * R) * w;
      const pdf = z => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
      const sy = d => y0 + h - d / 0.42 * h;
      ctx.fillStyle = bad; ctx.globalAlpha = .30;
      [[-R, -1.96], [1.96, R]].forEach(([a, b]) => {
        ctx.beginPath(); ctx.moveTo(sx(a), sy(0));
        for (let z = a; z <= b + 1e-9; z += .01) ctx.lineTo(sx(z), sy(pdf(z)));
        ctx.lineTo(sx(b), sy(0)); ctx.closePath(); ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath();
      for (let i = 0; i <= 640; i++) {
        const z = -R + i / 640 * 2 * R, px = sx(z), py = sy(pdf(z));
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.stroke();
      ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.beginPath();
      ctx.moveTo(x0, sy(0)); ctx.lineTo(x0 + w, sy(0)); ctx.stroke();
      ctx.setLineDash([4, 4]);
      [-1.645, 1.645].forEach(z => {
        ctx.beginPath(); ctx.moveTo(sx(z), sy(0)); ctx.lineTo(sx(z), sy(pdf(z)) - 12); ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans"); ctx.textAlign = "center";
      [[-1.96, "-1.96"], [1.96, "1.96"], [0, "0"], [-1.645, "-1.645"], [1.645, "1.645"]].forEach(([z, t2]) =>
        ctx.fillText(t2, sx(z), sy(0) + 16));
      ctx.fillStyle = bad; ctx.fillText("2.5%", sx(-2.55), sy(0) - 26); ctx.fillText("2.5%", sx(2.55), sy(0) - 26);
      ctx.fillStyle = muted; ctx.fillText("אזור אי-דחייה (דו-צדדי, α=5%)", sx(0), y0 + 12);
      ctx.textAlign = "left";
    }
  },
  clt: {
    title: "משפט הגבול המרכזי: התפלגות הממוצע מתכווצת כמו 1/√n",
    pillar: "Estimation",
    caption: "מחושב: צפיפויות הממוצע המדגמי X̄ עבור n = 1, 4, 16 (סטיית תקן באוכלוסייה σ = 1): N(μ, σ²/n) נעשית גבוהה וצרה — שגיאת התקן σ/√n נחתכת בחצי בכל הכפלת n פי 4. התמונה הזאת מסבירה למה בכל רווח סמך יש √n במכנה.",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
      const ink = cssVar("--ink"), muted = cssVar("--muted");
      const cols = [muted, cssVar("--exp"), cssVar("--opt")];
      const x0 = 40, y0 = 14, w = W - 80, h = H - 60;
      const R = 3.2, sx = v => x0 + (v + R) / (2 * R) * w;
      const ns = [1, 4, 16], maxd = Math.sqrt(16) * 0.3989;
      const sy = d => y0 + h - d / (maxd * 1.06) * h;
      ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.beginPath();
      ctx.moveTo(x0, sy(0)); ctx.lineTo(x0 + w, sy(0)); ctx.stroke();
      ns.forEach((n, k) => {
        const sd = 1 / Math.sqrt(n);
        const pdf = v => Math.exp(-v * v / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
        ctx.strokeStyle = cols[k]; ctx.lineWidth = 2.1; ctx.beginPath();
        for (let i = 0; i <= 640; i++) {
          const v = -R + i / 640 * 2 * R, px = sx(v), py = sy(pdf(v));
          i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.stroke();
        ctx.fillStyle = cols[k]; ctx.font = "12.5px " + cssVar("--sans");
        ctx.fillText("n=" + n + "  (SE=" + sd.toFixed(2) + ")", sx(0.62 + 0.42 * (2 - k)), sy(pdf(0)) + (k === 0 ? -6 : 14));
      });
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("μ", sx(0) - 3, sy(0) + 16);
    }
  },
  ci_coverage: {
    title: "מה באמת אומר \"רווח סמך 95%\": 40 רווחים, ~2 מחמיצים",
    pillar: "Estimation",
    caption: "מחושב (סימולציה עם זרע קבוע): 40 מדגמים בגודל n=25 מ-N(50,10²); לכל אחד רווח סמך 95% לתוחלת: X̄ ± 1.96·σ/√n. הקו האנכי הוא μ=50 האמיתי. רווחים שמחמיצים את μ צבועים באדום — בממוצע 5% מהם (כאן בדיוק כמה שיצא בסימולציה). הרמה 95% היא תכונה של השיטה, לא של רווח בודד: כל רווח נתון או מכסה או לא.",
    draw(cv) {
      const W = 640, H = 340, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
      const ink = cssVar("--ink"), muted = cssVar("--muted"), good = cssVar("--opt"), bad = cssVar("--bad");
      const MU = 50, SIG = 10, N = 25, M = 40, half = 1.96 * SIG / Math.sqrt(N);
      let seed = 20260709; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
      const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
      const x0 = 44, y0 = 14, w = W - 70, h = H - 52;
      const lo = MU - 3.4 * SIG / Math.sqrt(N), hi = MU + 3.4 * SIG / Math.sqrt(N);
      const sx = v => x0 + (v - lo) / (hi - lo) * w;
      ctx.strokeStyle = ink; ctx.lineWidth = 1.6; ctx.beginPath();
      ctx.moveTo(sx(MU), y0); ctx.lineTo(sx(MU), y0 + h); ctx.stroke();
      let miss = 0;
      for (let i = 0; i < M; i++) {
        let s = 0; for (let j = 0; j < N; j++) s += MU + SIG * gauss();
        const xbar = s / N, y = y0 + 6 + (i + 0.5) / M * (h - 12);
        const covers = Math.abs(xbar - MU) <= half; if (!covers) miss++;
        ctx.strokeStyle = covers ? good : bad; ctx.lineWidth = covers ? 1.6 : 2.4; ctx.globalAlpha = covers ? .75 : 1;
        ctx.beginPath(); ctx.moveTo(sx(xbar - half), y); ctx.lineTo(sx(xbar + half), y); ctx.stroke();
        ctx.beginPath(); ctx.arc(sx(xbar), y, 1.8, 0, 2 * Math.PI); ctx.fillStyle = ctx.strokeStyle; ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.fillStyle = ink; ctx.font = "12.5px " + cssVar("--sans"); ctx.textAlign = "center";
      ctx.fillText("μ = 50", sx(MU), y0 + h + 16);
      ctx.textAlign = "left"; ctx.fillStyle = bad;
      ctx.fillText(miss + "/40 מחמיצים", x0 + 4, y0 + 12);
    }
  },
  regression: {
    title: "ריבועים פחותים: הקו שממזער את סכום ריבועי השאריות",
    pillar: "Descriptive",
    caption: "מחושב על 10 נקודות קבועות: קו הריבועים הפחותים ŷ = a + bx עם b = r·s_y/s_x ו-a = ȳ − b·x̄, יחד עם קטעי השאריות (באדום). השיפוע, החותך ו-r מחושבים חיים מהנקודות שעל המסך — שום דבר לא מצויר ביד.",
    draw(cv) {
      const W = 640, H = 320, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
      const ink = cssVar("--ink"), muted = cssVar("--muted"), col = cssVar("--exp"), bad = cssVar("--bad");
      const X = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const Y = [2.1, 2.5, 3.4, 3.2, 4.4, 4.6, 5.6, 5.4, 6.5, 6.6];
      const n = X.length, mx = X.reduce((a, b) => a + b) / n, my = Y.reduce((a, b) => a + b) / n;
      let sxx = 0, syy = 0, sxy = 0;
      for (let i = 0; i < n; i++) { sxx += (X[i] - mx) ** 2; syy += (Y[i] - my) ** 2; sxy += (X[i] - mx) * (Y[i] - my); }
      const b = sxy / sxx, a = my - b * mx, r = sxy / Math.sqrt(sxx * syy);
      const x0 = 46, y0 = 14, w = W - 76, h = H - 64;
      const sx = v => x0 + (v - 0) / 11 * w, sy = v => y0 + h - (v - 1) / 7 * h;
      ctx.strokeStyle = muted; ctx.globalAlpha = .5; ctx.strokeRect(x0, y0, w, h); ctx.globalAlpha = 1;
      ctx.strokeStyle = bad; ctx.lineWidth = 1.4;
      for (let i = 0; i < n; i++) {
        ctx.beginPath(); ctx.moveTo(sx(X[i]), sy(Y[i])); ctx.lineTo(sx(X[i]), sy(a + b * X[i])); ctx.stroke();
      }
      ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.beginPath();
      ctx.moveTo(sx(0.5), sy(a + b * 0.5)); ctx.lineTo(sx(10.5), sy(a + b * 10.5)); ctx.stroke();
      ctx.fillStyle = ink;
      for (let i = 0; i < n; i++) { ctx.beginPath(); ctx.arc(sx(X[i]), sy(Y[i]), 3.4, 0, 2 * Math.PI); ctx.fill(); }
      ctx.fillStyle = col; ctx.font = "12.5px " + cssVar("--sans");
      ctx.fillText("ŷ = " + a.toFixed(2) + " + " + b.toFixed(2) + "x   (r = " + r.toFixed(3) + ", R² = " + (r * r).toFixed(3) + ")", x0 + 10, y0 + 18);
      ctx.fillStyle = bad; ctx.fillText("שאריות", sx(8.7), sy(5.15));
    }
  },
  qq: {
    title: "קריאת תרשים QQ-norm: ישר, קמור, או בצורת S",
    pillar: "Descriptive",
    caption: "מחושב (ללא אקראיות): לכל התפלגות מצוירים הקוונטילים התקנוניים שלה מול קוונטילי הנורמלית — F⁻¹(p) מול Φ⁻¹(p) על סריג p. נורמלית → קו ישר (מקווקו); מעריכית (צולעת ימינה) → קימור כלפי מעלה; לפלס (זנבות כבדים) → צורת S שחורגת מהקו בשני הקצוות. אלה בדיוק שלוש הצורות שצריך לזהות בשאלות QQ במבחן.",
    draw(cv) {
      const W = 640, H = 320, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
      const ink = cssVar("--ink"), muted = cssVar("--muted");
      const cExp = cssVar("--gen"), cLap = cssVar("--two") || cssVar("--exp");
      const Phi = z => {
        const t2 = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
        const e = 1 - (((((1.061405429 * t2 - 1.453152027) * t2) + 1.421413741) * t2 - 0.284496736) * t2 + 0.254829592) * t2 * Math.exp(-z * z / 2);
        return z >= 0 ? 0.5 * (1 + e) : 0.5 * (1 - e);
      };
      const x0 = 46, y0 = 14, w = W - 76, h = H - 64, R = 2.8;
      const sx = v => x0 + (v + R) / (2 * R) * w, sy = v => y0 + h - (v + R) / (2 * R) * h;
      ctx.strokeStyle = muted; ctx.globalAlpha = .5; ctx.strokeRect(x0, y0, w, h); ctx.globalAlpha = 1;
      // identity = normal
      ctx.setLineDash([5, 4]); ctx.strokeStyle = muted; ctx.lineWidth = 1.6; ctx.beginPath();
      ctx.moveTo(sx(-R), sy(-R)); ctx.lineTo(sx(R), sy(R)); ctx.stroke(); ctx.setLineDash([]);
      // standardized quantile functions: exp(1): F^-1(p) = -ln(1-p), mean 1, sd 1 -> q-1
      // Laplace(0,1): F^-1(p) = ln(2p) / -ln(2(1-p)), sd = sqrt(2) -> q/sqrt2
      const qExp = p => (-Math.log(1 - p)) - 1;
      const qLap = p => (p < 0.5 ? Math.log(2 * p) : -Math.log(2 * (1 - p))) / Math.SQRT2;
      [[qExp, cExp, "מעריכית (צולעת ימינה)"], [qLap, cLap, "לפלס (זנבות כבדים)"]].forEach(([q, col, label], k) => {
        ctx.strokeStyle = col; ctx.lineWidth = 2.1; ctx.beginPath(); let started = false;
        for (let z = -R; z <= R; z += 0.02) {
          const y = q(Phi(z));
          if (Math.abs(y) > R) { started = false; continue; }
          const px = sx(z), py = sy(y);
          started ? ctx.lineTo(px, py) : (ctx.moveTo(px, py), started = true);
        }
        ctx.stroke();
        ctx.fillStyle = col; ctx.font = "12.5px " + cssVar("--sans");
        ctx.fillText(label, x0 + 8, y0 + 18 + k * 17);
      });
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("קוונטילי הנורמלית ←", x0 + w - 130, y0 + h + 16);
      ctx.save(); ctx.translate(x0 - 30, y0 + h / 2); ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center"; ctx.fillText("קוונטילי המדגם", 0, 0); ctx.restore();
    }
  },
  power: {
    title: "עוצמה גדלה עם גודל האפקט ועם n",
    pillar: "Testing",
    caption: "מחושב: עוצמת מבחן Z חד-צדדי (H₀: μ = 0 מול H₁: μ > 0, σ = 1, α = 0.05): power(μ) = 1 − Φ(1.645 − μ√n). בנקודה μ = 0 העקומה מתחילה בדיוק ב-α = 0.05; הכפלת n פי 4 (מ-25 ל-100) מכפילה את √n ומקדימה את הטיפוס ל-1. זו תמונת העוצמה האהובה על המבחן.",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
      const ink = cssVar("--ink"), muted = cssVar("--muted");
      const cols = [cssVar("--gen"), cssVar("--opt")];
      const Phi = z => {
        const t2 = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
        const e = 1 - (((((1.061405429 * t2 - 1.453152027) * t2) + 1.421413741) * t2 - 0.284496736) * t2 + 0.254829592) * t2 * Math.exp(-z * z / 2);
        return z >= 0 ? 0.5 * (1 + e) : 0.5 * (1 - e);
      };
      const x0 = 46, y0 = 14, w = W - 76, h = H - 64;
      const MU = 0.8, sx = m => x0 + m / MU * w, sy = p => y0 + h - p * h;
      ctx.strokeStyle = muted; ctx.globalAlpha = .5; ctx.strokeRect(x0, y0, w, h); ctx.globalAlpha = 1;
      ctx.setLineDash([4, 4]); ctx.strokeStyle = muted; ctx.beginPath();
      ctx.moveTo(x0, sy(.05)); ctx.lineTo(x0 + w, sy(.05)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x0, sy(.8)); ctx.lineTo(x0 + w, sy(.8)); ctx.stroke(); ctx.setLineDash([]);
      [25, 100].forEach((n, k) => {
        ctx.strokeStyle = cols[k]; ctx.lineWidth = 2.2; ctx.beginPath();
        for (let i = 0; i <= 600; i++) {
          const m = i / 600 * MU, p = 1 - Phi(1.645 - m * Math.sqrt(n));
          const px = sx(m), py = sy(p);
          i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.stroke();
        ctx.fillStyle = cols[k]; ctx.font = "12.5px " + cssVar("--sans");
        const mlab = k ? 0.28 : 0.52;
        ctx.fillText("n = " + n, sx(mlab) + 6, sy(1 - Phi(1.645 - mlab * Math.sqrt(n))) - 8);
      });
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans");
      ctx.fillText("α = 0.05", x0 + 6, sy(.05) - 6);
      ctx.fillText("עוצמה 0.8", x0 + 6, sy(.8) - 6);
      ctx.fillText("μ האמיתי ←", x0 + w - 70, sy(0) + 16);
      ctx.save(); ctx.translate(x0 - 30, y0 + h / 2); ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center"; ctx.fillText("עוצמה", 0, 0); ctx.restore();
    }
  },
  ranksum: {
    title: "וילקוקסון: ההתפלגות המדויקת תחת H₀ (n = m = 4)",
    pillar: "Testing",
    caption: "מחושב במנייה מלאה: כל C(8,4) = 70 הקצאות הדרגות השוות-הסתברות תחת H₀ נותנות את ההתפלגות המדויקת של W = סכום דרגות קבוצה 1 (תוחלת n(N+1)/2 = 18, שונות nm(N+1)/12 = 12). העקומה המקווקווה היא הקירוב הנורמלי שהקורס משתמש בו למדגמים גדולים — כבר קרוב ב-n = m = 4.",
    draw(cv) {
      const W = 640, H = 300, ctx = figCanvas(cv, W, H); ctx.direction = "ltr";
      const ink = cssVar("--ink"), muted = cssVar("--muted"), col = cssVar("--two") || cssVar("--gen");
      const counts = {};
      let total = 0;
      for (let a = 1; a <= 5; a++) for (let b = a + 1; b <= 6; b++)
        for (let c = b + 1; c <= 7; c++) for (let d = c + 1; d <= 8; d++) {
          const wsum = a + b + c + d; counts[wsum] = (counts[wsum] || 0) + 1; total++;
        }
      const ws = Object.keys(counts).map(Number).sort((x, y) => x - y);
      const pmax = Math.max(...ws.map(v => counts[v])) / total;
      const x0 = 46, y0 = 14, w = W - 76, h = H - 64;
      const lo = ws[0] - 1, hi = ws[ws.length - 1] + 1;
      const sx = v => x0 + (v - lo) / (hi - lo) * w, sy = p => y0 + h - p / (pmax * 1.12) * h;
      ctx.strokeStyle = muted; ctx.lineWidth = 1; ctx.beginPath();
      ctx.moveTo(x0, sy(0)); ctx.lineTo(x0 + w, sy(0)); ctx.stroke();
      const bw = w / (hi - lo) * 0.72;
      ws.forEach(v => {
        const p = counts[v] / total;
        ctx.fillStyle = col; ctx.globalAlpha = .85;
        ctx.fillRect(sx(v) - bw / 2, sy(p), bw, sy(0) - sy(p));
      });
      ctx.globalAlpha = 1;
      const mu = 18, sd = Math.sqrt(12);
      ctx.setLineDash([5, 4]); ctx.strokeStyle = ink; ctx.lineWidth = 1.6; ctx.beginPath();
      for (let i = 0; i <= 600; i++) {
        const v = lo + i / 600 * (hi - lo);
        const p = Math.exp(-((v - mu) ** 2) / (2 * 12)) / (sd * Math.sqrt(2 * Math.PI));
        const px = sx(v), py = sy(p);
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = ink; ctx.font = "12px " + cssVar("--sans"); ctx.textAlign = "center";
      [10, 14, 18, 22, 26].forEach(v => ctx.fillText(v, sx(v), sy(0) + 16));
      ctx.fillText("W", sx(hi) + 6, sy(0) + 16); ctx.textAlign = "left";
      ctx.fillText("P(W=w) מדויק · מקווקו: N(18, 12)", x0 + 8, y0 + 12);
    }
  }
};
/* exam-specific schematic figures (mounted per question via FIG_EXAM) */
Object.assign(FIGS, {
  ex_b2022_grades: {
    title: "תרשים פיזור: ציון סמסטר ב׳ כנגד סמסטר א׳",
    pillar: "Descriptive",
    caption: "איור להמחשה (שחזור סכמטי): ענן נקודות עולה ולינארי של ציון סמסטר ב׳ (Y) כנגד ציון סמסטר א׳ (X) עבור 88 תלמידים, עם קו הרגרסיה. הנקודות ממחישות את המגמה המתוארת — לא ערכי המדגם המקוריים.",
    draw: figScatter({ xr: [58, 80], yr: [68, 88], n: 88, dir: "pos", spread: 0.14, seed: 22, xlab: "ציון סמסטר א׳ (X)", ylab: "ציון סמסטר ב׳ (Y)" })
  },
  ex_a2013_hists: {
    title: "שלוש היסטוגרמות: X, Y, Z",
    pillar: "Descriptive",
    caption: "איור להמחשה: X אסימטרית ימינה (טווח ~40–180), Y סימטרית בצורת פעמון (~0–100), Z אסימטרית שמאלה (~-80–60). הצורות נאמנות לתיאור בשאלה; גובה העמודות סכמטי.",
    draw: figHist({ panels: [{ shape: "rskew", label: "X", range: "~40–180" }, { shape: "sym", label: "Y", range: "~0–100" }, { shape: "lskew", label: "Z", range: "~-80–60" }] })
  },
  ex_a2020_qq: {
    title: "QQ-plot מול ההתפלגות הנורמלית",
    pillar: "Descriptive",
    caption: "איור להמחשה: הנקודות בשני הקצוות סוטות מהקו הישר כלפי חוץ — כלומר זנבות כבדים (עבים) יותר מהנורמלי, סימטרית סביב המרכז, כפי שמתואר בשאלה.",
    draw: figQQ({ pattern: "heavy", seed: 5 })
  }
});
const FIG_EXAM = {
  "b_2022_Q2": ["ex_b2022_grades"],
  "a_2013_Q1": ["ex_a2013_hists"],
  "a_2020_Q1": ["ex_a2020_qq"]
};
/* exam figures — generated from figspec_*.json (schematic reconstructions) */
Object.assign(FIGS, {
  "ex_a_2012_Q1": { title: "היסטוגרמת תשואות יומיות", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): היסטוגרמה של תשואות יומיות באחוזים ל-2000 ימי מסחר, פעמונית בקירוב וממורכזת סביב 0, עיקר הנתונים בין כ-1- ל-1 (עמודת השיא ≈300) וכמעט כולם בין 2- ל-2, עם עמודה קטנה ומבודדת ליד 3-. סכמטי בלבד, אינו נתוני המקור.", draw: figHist({"panels": [{"shape": "sym", "label": "תשואות (X)", "range": "~-3–2"}], "ylab": "שכיחות"}) },
  "ex_a_2012_Q2": { title: "מכירת פחיות מול גודל הקהל", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של מספר פחיות השתייה (Y, אלפים) מול גודל הקהל (X, אלפים) ב-40 משחקים, עם קו רגרסיה עולה Y=0.49X+0.87 (r=0.90). הנקודות נועדו להמחשה בלבד.", draw: figScatter({"xr": [4, 40], "yr": [0, 23], "xlab": "גודל הקהל באלפים (X)", "ylab": "פחיות שתייה באלפים (Y)", "dir": "pos", "slope": 0.488, "intercept": 0.874, "eqn": "Y=0.49X+0.87", "spread": 0.13, "n": 40}) },
  "ex_a_2012_Q5": { title: "זמן עד כשל לפי סוג החלק", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשימי קופסה זה-לצד-זה של הזמן עד כשל המנוע (מיליוני סיבובים) לפי סוג החלק — סוג I עם חציון גבוה יותר (≈11) וקופסה כ-5.6–15.2, וסוג II מוטה ימינה עם חציון ≈4.7 קרוב לתחתית הקופסה. סכמטי בלבד.", draw: figBox({"boxes": [{"shape": "sym", "label": "סוג I"}, {"shape": "rskew", "label": "סוג II"}], "ylab": "זמן עד כשל (מיליוני סיבובים)"}) },
  "ex_b_2012_Q1": { title: "תרשים QQ נורמלי", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים QQ נורמלי (שברוני המדגם מול שברוני הנורמלית) המדגים את המדגם הנכון — ענן לינארי בקירוב המעיד על נורמליות. ארבעת התרשימים המקוריים דומים בצורתם ונבדלים במיקום ובסקאלה; זהו שחזור סכמטי בלבד.", draw: figQQ({"pattern": "linear", "xlab": "שברוני הנורמלית", "ylab": "שברוני המדגם"}) },
  "ex_b_2012_Q2": { title: "גיל עץ מול קוטר", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של גיל העץ (Y, שנים) מול הקוטר (X, ס\"מ) ל-27 עצים, עם קו הרגרסיה Y=-0.97+0.88X (r≈0.88). סכמטי בלבד.", draw: figScatter({"xr": [5, 45], "yr": [0, 42], "xlab": "קוטר (X, ס\"מ)", "ylab": "גיל (Y, שנים)", "dir": "pos", "slope": 0.882, "intercept": -0.974, "eqn": "Y=0.88X-0.97", "spread": 0.14, "n": 27}) },
  "ex_a_2013_Q2": { title: "תפוקת אורז מול חנקן", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של תפוקת האורז (Y, oz) מול כמות החנקן (X, oz, בטווח 0–16) עם קו רגרסיה עולה Y=20X+240 (r=0.95). הקשר לינארי; סכמטי בלבד.", draw: figScatter({"xr": [0, 16], "yr": [190, 610], "xlab": "כמות חנקן (X, oz)", "ylab": "תפוקת אורז (Y, oz)", "dir": "pos", "slope": 20, "intercept": 240, "eqn": "Y=20X+240", "spread": 0.09}) },
  "ex_a_2013_Q5": { title: "חלבון לפני/אחרי טיפול והפרשים", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשימי קופסה של רמות החלבון לפני ואחרי הטיפול (שתיהן מוטות ימינה) ושל ההפרשים — ההפרשים הגולמיים סימטריים בקירוב והפרשי הלוג עם חריג נמוך. סכמטי בלבד; הסקאלות אינן זהות בין הקופסאות.", draw: figBox({"boxes": [{"shape": "rskew", "label": "לפני"}, {"shape": "rskew", "label": "אחרי"}, {"shape": "sym", "label": "הפרשים (גולמי)"}, {"shape": "lskew", "label": "הפרשי לוג"}]}) },
  "ex_b_2013_Q1": { title: "תרשים פיזור (קשר חיובי חלש)", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור המדגים ענן יחיד עם קשר חיובי חלש (כמו תרשימים I ו-II בשאלה). בשאלה מופיעים שלושה תרשימים, ואחד (III) מציג שני אשכולות נפרדים שאינם ניתנים לשחזור בסכמה זו. סכמטי בלבד.", draw: figScatter({"xr": [0, 10], "yr": [0, 10], "xlab": "X", "ylab": "Y", "dir": "pos", "slope": 0.5, "intercept": 2, "spread": 0.25, "n": 11}) },
  "ex_b_2013_Q2": { title: "log10(שרתי אינטרנט) מול שנים", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של log10(מספר שרתי האינטרנט) מול שנים מאז ינואר 97, עם קו רגרסיה כמעט מושלם log10=5.8+0.4·Yrs (R²=0.996). הנקודות צמודות מאוד לקו; סכמטי בלבד.", draw: figScatter({"xr": [0, 4], "yr": [5.6, 7.6], "xlab": "שנים מאז ינואר 97", "ylab": "log10(שרתי אינטרנט)", "dir": "pos", "slope": 0.4, "intercept": 5.8, "eqn": "log10(servers)=5.8+0.4·Yrs", "spread": 0.04, "n": 45}) },
  "ex_a_2014_Q2": { title: "זמני ריצת 100 מטר אולימפיים", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של זמני הריצה הזוכים בריצת 100 מטר במשחקים האולימפיים (שניות, כ-9.8 עד 10.8) כנגד שנת האולימפיאדה (כ-1928 עד 2004). המגמה יורדת לאורך השנים, עם כמה זמנים איטיים חריגים בשנים המוקדמות. אין זו הגרסה המקורית מן הבחינה אלא שחזור סכמטי בלבד.", draw: figScatter({"xr": [1928, 2004], "yr": [9.8, 10.8], "xlab": "שנה", "ylab": "זמן ריצה (שניות)", "dir": "neg", "spread": 0.12, "n": 18}) },
  "ex_a_2018_Q2": { title: "משקל סוף השנה כנגד תחילת השנה", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של משקל התלמידים בסוף השנה (יוני, ק\"ג) כנגד המשקל בתחילת השנה (ספטמבר, ק\"ג) עבור 500 תלמידים, עם מגמה לינארית חיובית ברורה (r≈0.71, קו רגרסיה Y=1.02X+8.94). שחזור סכמטי בלבד, ולא הנתונים המקוריים.", draw: figScatter({"xr": [18.97, 80.57], "yr": [15.62, 104.13], "xlab": "משקל בתחילת השנה (ק\"ג)", "ylab": "משקל בסוף השנה (ק\"ג)", "dir": "pos", "slope": 1.0235, "intercept": 8.94, "eqn": "Y=1.02X+8.94", "spread": 0.21, "n": 120}) },
  "ex_b_2018_Q2": { title: "עלות משלוח כנגד משקל האריזה", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של עלות המשלוח (דולר) כנגד משקל האריזה (פאונד) עבור 20 משלוחים, עם קשר לינארי חיובי חזק (r≈0.98, קו רגרסיה Y=5.17X+15.19). שחזור סכמטי בלבד.", draw: figScatter({"xr": [4.44, 17.58], "yr": [37.45, 106.75], "xlab": "משקל האריזה (פאונד)", "ylab": "עלות המשלוח (דולר)", "dir": "pos", "slope": 5.17, "intercept": 15.19, "eqn": "Y=5.17X+15.19", "spread": 0.06, "n": 20}) },
  "ex_a_2021_Q3": { title: "גבהי אמהות מול בנות", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של גובה האם (X) מול גובה הבת (Y) ביחידות inch, כ-1100 זוגות, ענן מפוזר בעל שיפוע חיובי מתון (מתאם r≈0.5).", draw: figScatter({"xr": [55.3, 69.7], "yr": [56.0, 71.6], "xlab": "גובה האם (inch)", "ylab": "גובה הבת (inch)", "dir": "pos", "slope": 0.542, "intercept": 29.95, "eqn": "Y=29.95+0.542X", "spread": 0.26}) },
  "ex_a_2022_Q2": { title: "תרשימי קופסה — אורך גב של תמנונים", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): ארבעה תרשימי קופסה של אורך הגב (במ\"מ) בארבעה תתי-סוגים של תמנונים. (i) קופסה נמוכה בטווח עם זקן עליון ארוך וערך חריג — עקמומיות ימנית מתונה; (ii) קופסה דחוסה סמוך לתחתית עם ערכים חריגים גבוהים — עקמומיות ימנית קיצונית; (iii) קופסה גדולה במרכז הטווח, זקנים קצרים וללא חריגים — סימטרית עם זנבות קצרים; (iv) קופסה גבוהה עם השתרעות ארוכה כלפי מטה — עקמומיות שמאלית עם ערכים חריגים נמוכים.", draw: figBox({"boxes": [{"shape": "rskew", "label": "i"}, {"shape": "rskewX", "label": "ii"}, {"shape": "sym", "label": "iii"}, {"shape": "lskew", "label": "iv"}], "ylab": "אורך הגב (מ\"מ)"}) },
  "ex_b_2023_Q1": { title: "תרשים Q-Q נורמלי (qqnorm)", pillar: "Descriptive", caption: "איור לשחזור סכמטי של תרשים ה-Q-Q הנורמלי שבשאלה: הנקודות יוצרות תבנית קמורה העולה כלפי מעלה — מתחת לישר הייחוס באמצע ומעליו בקצה, כאשר האחוזונים הדגומים הגבוהים ביותר גבוהים במידה ניכרת מעל הישר, המעיד על זנב ימני כבד (הטיה ימנית).", draw: figQQ({"pattern": "rskew", "xlab": "שברוני הנורמלית", "ylab": "שברוני המדגם"}) },
  "ex_a_2024_Q2": { title: "תרשים Q-Q: מדגם מול ההתפלגות f(x)=2x", pillar: "Descriptive", caption: "איור להמחשה סכמטית של תרשים ה-Q-Q שבשאלה: ארבעת סטטיסטי הסדר של המדגם (0.213, 0.500, 0.900, 0.995) על ציר ה-Y מול האחוזונים התיאורטיים F⁻¹(p)=√p (0.447, 0.632, 0.775, 0.894) על ציר ה-X, הנופלים בקירוב על הישר y=x לבדיקת ההתאמה להתפלגות בעלת הצפיפות f(x)=2x.", draw: figScatter({"xr": [0, 1], "yr": [0, 1], "xlab": "אחוזון תיאורטי (שברון ההתפלגות)", "ylab": "סטטיסטי הסדר של המדגם", "dir": "pos", "slope": 1, "intercept": 0, "eqn": "Y=X", "spread": 0.04, "n": 4}) },
  "ex_b_2024_Q1": { title: "תרשים פיזור — בדיקת התאמה מעריכית", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים פיזור של התצפיות הסדורות של מדגם מעריכי מול כמותוני ההתפלגות המעריכית התיאורטיים (‎−log(1−i/1001)‎). הנקודות שוכנות בקירוב על ישר, המעיד על קשר לינארי — כפי שנטען בסעיף א.", draw: figScatter({"xr": [0, 7], "yr": [0, 7], "xlab": "כמותוני ההתפלגות המעריכית", "ylab": "התצפיות הסדורות", "dir": "pos", "spread": 0.04, "n": 50}) },
  "ex_b_2025_Q2": { title: "תרשים QQ — התאמה להתפלגות מעריכית", pillar: "Descriptive", caption: "איור להמחשה (שחזור סכמטי): תרשים QQ של ארבע התצפיות המסודרות (0.3, 0.7, 1.2, 2.1) מול שברוני ההתפלגות המעריכית. הנקודות שוכנות בקירוב על ישר, המעיד על התאמה טובה להתפלגות מעריכית.", draw: figQQ({"pattern": "linear", "xlab": "שברוני ההתפלגות המעריכית", "ylab": "התצפיות המסודרות"}) }
});
Object.assign(FIG_EXAM, {
  "a_2012_Q1": ["ex_a_2012_Q1"],
  "a_2012_Q2": ["ex_a_2012_Q2"],
  "a_2012_Q5": ["ex_a_2012_Q5"],
  "b_2012_Q1": ["ex_b_2012_Q1"],
  "b_2012_Q2": ["ex_b_2012_Q2"],
  "a_2013_Q2": ["ex_a_2013_Q2"],
  "a_2013_Q5": ["ex_a_2013_Q5"],
  "b_2013_Q1": ["ex_b_2013_Q1"],
  "b_2013_Q2": ["ex_b_2013_Q2"],
  "a_2014_Q2": ["ex_a_2014_Q2"],
  "a_2018_Q2": ["ex_a_2018_Q2"],
  "b_2018_Q2": ["ex_b_2018_Q2"],
  "a_2021_Q3": ["ex_a_2021_Q3"],
  "a_2022_Q2": ["ex_a_2022_Q2"],
  "b_2023_Q1": ["ex_b_2023_Q1"],
  "a_2024_Q2": ["ex_a_2024_Q2"],
  "b_2024_Q1": ["ex_b_2024_Q1"],
  "b_2025_Q2": ["ex_b_2025_Q2"]
});
const MOUNTED_FIGS = [];
const FIG_TOPIC_MAP = [
  [/נורמלי|רגיש[הת]? לנורמלי|התפלגות נורמלית|normal distribution|critical value|אזור דחייה|רמת מובהקות/i, "pillars"],
  [/גבול המרכזי|clt|central limit|התפלגות הדגימה|שגיאת תקן|sampling distribution|standard error|אמידה נקודתית|point estimation/i, "clt"],
  [/רווח[יי]? סמך|confidence interval|רמת סמך|coverage/i, "ci_coverage"],
  [/רגרסיה|ריבועים פחותים|מתאם|regression|least squares|correlation/i, "regression"],
  [/qq|q-q|קוונטיל|quantile plot/i, "qq"],
  [/עוצמה|power|גודל מדגם|sample size/i, "power"],
  [/וילקוקסון|wilcoxon|rank[- ]?sum|סכום דרגות|פרמוטצי|permutation/i, "ranksum"],
];
const FIG_MEMO_MAP = [
  [/1\.96|נורמלית|רמת מובהקות|z_\{?0?\.?9/i, "pillars"],
  [/גבול המרכזי|שגיאת תקן|clt|central limit/i, "clt"],
  [/רווח סמך|confidence/i, "ci_coverage"],
  [/רגרסיה|ריבועים פחותים|מתאם|regression|least[- ]squares/i, "regression"],
  [/qq|קוונטיל/i, "qq"],
  [/עוצמה|power|גודל מדגם/i, "power"],
  [/וילקוקסון|wilcoxon|סכום דרגות/i, "ranksum"],
];

