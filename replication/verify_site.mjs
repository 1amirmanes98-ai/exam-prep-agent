// Verify a built study-hub page in headless Chromium — the once-per-phase check.
// Runs the checks that actually catch regressions: zero console/page errors; KaTeX renders
// in BOTH standards mode (the docs page) and quirks mode (the raw fragment — proves the
// KaTeX guard patch); at least one hero pillar card; an exam page renders math; localStorage
// survives reload; and (when CONFIG.figures is on) every computed figure draws without
// throwing, with a warning for any pillar that has no figure. Exits non-zero on any failure.
//
// Figures are drawn in the REAL page context on purpose: a scratch harness that does
// `document.body.innerHTML = …` detaches the canvases from the :root CSS variables, so
// cssVar() returns empty and every figure paints black — a phantom bug. Draw in-page.
//
// Usage:
//   node replication/verify_site.mjs <docs/xx/index.html> [<standalone-fragment.html>]
// Playwright resolution: pass PLAYWRIGHT env or rely on a global install. Chromium path via
// PW_CHROMIUM (default the pre-installed /opt/pw-browsers path used in this environment).
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pwPath = process.env.PLAYWRIGHT || "/opt/node22/lib/node_modules/playwright";
const { chromium } = require(pwPath);

const [docsPage, fragPage] = process.argv.slice(2);
if (!docsPage) { console.error("usage: verify_site.mjs <docs.html> [fragment.html]"); process.exit(2); }
const url = p => "file://" + require("path").resolve(p);
const exe = process.env.PW_CHROMIUM || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const fails = [];
const browser = await chromium.launch({ executablePath: exe });

async function openExam(p) {
  await p.evaluate(() => window.show && window.show("exams"));
  await p.waitForTimeout(250);
  await p.evaluate(() => { const s = document.querySelector("#view-exams"); const c = s && s.querySelector("button,[role=button]"); c && c.click(); });
  await p.waitForTimeout(500);
}

// --- standards-mode docs page ---
{
  const p = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  const errs = []; p.on("console", m => m.type() === "error" && errs.push(m.text())); p.on("pageerror", e => errs.push("PE:" + e.message));
  await p.goto(url(docsPage), { waitUntil: "networkidle" }); await p.waitForTimeout(400);
  const compat = await p.evaluate(() => document.compatMode);
  const cards = await p.evaluate(() => document.querySelectorAll("#pillarCards .pillarcard").length);
  await openExam(p);
  const katex = await p.evaluate(() => document.querySelectorAll(".katex").length);
  await p.evaluate(() => { try { localStorage.setItem("__t", "1"); } catch (e) {} });
  await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(300);
  const persisted = await p.evaluate(() => localStorage.getItem("__t") === "1");
  console.log(`docs: compat=${compat} pillarCards=${cards} examKaTeX=${katex} lsPersist=${persisted} consoleErrors=${errs.length}`);
  if (errs.length) fails.push("docs console/page errors:\n  " + errs.slice(0, 5).join("\n  "));
  if (compat !== "CSS1Compat") fails.push(`docs not standards mode (compat=${compat})`);
  if (cards < 1) fails.push("docs: no hero pillar cards");
  if (katex === 0) fails.push("docs: 0 KaTeX on an exam page");
  if (!persisted) fails.push("docs: localStorage did not survive reload");
  // --- computed figures (when enabled): each must draw without throwing; warn on gaps ---
  const figReport = await p.evaluate(() => {
    // CONFIG/FIGS are global *lexical* bindings (const in a classic script), reachable by
    // bare name but NOT as window.* — probe with typeof, not window.CONFIG.
    if (typeof CONFIG === "undefined" || !CONFIG.figures || typeof FIGS === "undefined") return null;
    const out = { errs: [], pillars: {}, total: 0 };
    for (const [id, f] of Object.entries(FIGS)) {
      const cv = document.createElement("canvas"); document.body.appendChild(cv);
      try { f.draw(cv); } catch (e) { out.errs.push(id + ": " + e.message); }
      out.pillars[f.pillar] = (out.pillars[f.pillar] || 0) + 1; out.total++; cv.remove();
    }
    const heroSlots = (CONFIG.slots || []).filter(s => (CONFIG.slotRoles || {})[s]);
    out.uncovered = heroSlots.filter(s => !out.pillars[s]);
    return out;
  });
  if (figReport) {
    console.log(`figs: count=${figReport.total} drawErrors=${figReport.errs.length} uncoveredPillars=${figReport.uncovered.join(",") || "none"}`);
    if (figReport.errs.length) fails.push("figure draw errors:\n  " + figReport.errs.join("\n  "));
    if (figReport.uncovered.length) console.log("  ⚠️  pillars with no figure (consider adding one): " + figReport.uncovered.join(", "));
  }
  await p.close();
}

// --- quirks-mode fragment (optional but recommended) ---
if (fragPage) {
  const p = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  const errs = []; p.on("console", m => m.type() === "error" && errs.push(m.text())); p.on("pageerror", e => errs.push("PE:" + e.message));
  await p.goto(url(fragPage), { waitUntil: "networkidle" }); await p.waitForTimeout(400);
  const compat = await p.evaluate(() => document.compatMode);
  await openExam(p);
  const katex = await p.evaluate(() => document.querySelectorAll(".katex").length);
  console.log(`frag: compat=${compat} examKaTeX=${katex} consoleErrors=${errs.length}`);
  if (errs.length) fails.push("frag console/page errors:\n  " + errs.slice(0, 5).join("\n  "));
  if (katex === 0) fails.push("frag (quirks mode): 0 KaTeX — the guard patch failed");
  await p.close();
}

await browser.close();
if (fails.length) { console.log("\n❌ FAILURES:\n" + fails.join("\n")); process.exit(1); }
console.log("\n✅ all verification checks passed");
