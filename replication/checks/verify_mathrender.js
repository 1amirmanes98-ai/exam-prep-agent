/* Verify that EVERY math span in the site's content actually renders in KaTeX.
   The other checks only count `.katex` nodes on a couple of views, so a formula that
   fails to parse (unsupported environment like psmallmatrix, an invalid `\*`, a double
   subscript) renders as raw red source and slips through. This walks the embedded DATA
   — notes, topics, exam/mock statements+solutions+hints, cheat sheet, archetypes — and
   runs each `$…$`/`$$…$$` span through katex.renderToString with throwOnError:true,
   reporting every span that fails. Course-agnostic. */
const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const p = await b.newPage();
  const errs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' });
  await p.waitForTimeout(400);
  const bad = await p.evaluate(() => {
    const texts = [];
    (DATA.notes || []).forEach(n => (n.sections || []).forEach(s => texts.push([n.name + ' §' + s.h, s.b])));
    (DATA.topics || []).forEach(t => texts.push(['topic ' + t.topic, t.topic]));
    [...(DATA.exams || []), ...(DATA.mocks || [])].forEach(e => (e.questions || []).forEach(q => {
      texts.push([e.id + ' Q' + q.n + ' statement', q.statement || '']);
      texts.push([e.id + ' Q' + q.n + ' solution', q.sketch || '']);
      if (q.hint) texts.push([e.id + ' Q' + q.n + ' hint', q.hint]);
    }));
    (DATA.cheatsheet ? DATA.cheatsheet.sections : []).forEach(s => s.items.forEach(it =>
      texts.push(['cheat ' + it.name, [it.name, it.statement, it.use, it.watch].filter(Boolean).join(' ')])));
    (DATA.archetypes || []).forEach(a => texts.push(['archetype ' + a.name, a.desc || '']));
    const out = [];
    const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
    for (const [where, body] of texts) {
      let m;
      while ((m = re.exec(body || ''))) {
        const tex = m[1] || m[2], disp = !!m[1];
        try { katex.renderToString(tex, { displayMode: disp, throwOnError: true }); }
        catch (e) { out.push({ where, tex: tex.slice(0, 70), err: (e.message || '').slice(0, 90) }); }
      }
    }
    return out;
  });
  await b.close();
  console.log('console errors:', errs.length ? errs : 'none');
  console.log('math spans that fail to render:', bad.length);
  bad.slice(0, 30).forEach(r => console.log(`  ✗ [${r.where}] ${r.tex}  ⟶  ${r.err}`));
  const fail = bad.length || errs.length;
  console.log(fail ? 'FAIL: broken math on the site' : 'ALL MATH RENDERS ✓');
  process.exit(fail ? 1 : 0);
})();
