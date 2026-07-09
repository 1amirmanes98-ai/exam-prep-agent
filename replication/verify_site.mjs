// Verify a built study-hub page in headless Chromium — the once-per-phase check.
// Runs the checks that actually catch regressions: zero console/page errors; KaTeX renders
// in BOTH standards mode (the docs page) and quirks mode (the raw fragment — proves the
// KaTeX guard patch); at least one hero pillar card; an exam page renders math; localStorage
// survives reload. Exits non-zero on any failure.
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
