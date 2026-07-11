const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const fails = [], errs = [];
  const p = await b.newPage({ viewport: { width: 1000, height: 1400 }, deviceScaleFactor: 2 });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(800);
  const r = await p.evaluate(async () => {
    show('exams'); renderExamDetail(examById[Object.keys(examById).includes('a_2025') ? 'a_2025' : DATA.exams[0].id]); // stats: Q1 has a template box
    await new Promise(r => setTimeout(r, 500));
    const cards = [...document.querySelectorAll('#examDetail .qcard')];
    const out = cards.map(c => {
      const hasTmpl = !!c.querySelector('details.tmpl');
      const qbody = c.querySelector('.qbody.mdslot');
      const stmtLen = qbody ? qbody.textContent.trim().length : -1;
      const tmplBody = c.querySelector('details.tmpl .tmplbody');
      const tmplHasStmt = tmplBody ? tmplBody.textContent.trim().length : 0;
      return { q: c.querySelector('h3').textContent.slice(0,12), hasTmpl, stmtLen, tmplLeak: tmplHasStmt };
    });
    return out;
  });
  console.log(JSON.stringify(r, null, 0));
  r.forEach(c => {
    if (c.stmtLen < 30) fails.push(c.q + ' statement EMPTY (' + c.stmtLen + ')');
    if (c.tmplLeak > 0) fails.push(c.q + ' statement leaked into template box');
  });
  // also check a_2023 shows 4 questions in the exam detail
  const n2023 = await p.evaluate(async () => {
    if (!examById['a_2023']) return -1; // course-specific regression check (stats)
    renderExamDetail(examById['a_2023']); await new Promise(r=>setTimeout(r,300));
    return document.querySelectorAll('#examDetail .qcard').length;
  });
  console.log('a_2023 question cards:', n2023);
  if (n2023 !== -1 && n2023 !== 4) fails.push('a_2023 shows ' + n2023 + ' questions, expected 4');
  await b.close();
  console.log('console errors:', errs.length ? errs : 'none');
  if (errs.length) fails.push(errs.length + ' console errors');
  console.log(fails.length ? 'FAIL:\n - ' + fails.join('\n - ') : 'STATEMENTS OK');
  process.exit(fails.length ? 1 : 0);
})();
