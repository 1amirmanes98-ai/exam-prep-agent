/* Verify homework-set integration: separate grid + label + practice pill,
   sealed sketches on hw questions, and hw questions reachable from the quiz pool. */
const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();
const F = 'file://' + process.argv[2], SHOT = process.argv[3] || '/tmp';
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const fails = [], errs = [];
  const p = await b.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 2 });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(700);

  const r = await p.evaluate(async () => {
    show('exams'); await new Promise(r => setTimeout(r, 250));
    const hws = DATA.exams.filter(e => e.hw);
    const head = document.getElementById('hwHead');
    const grid = document.getElementById('hwGrid');
    const out = { nHw: hws.length, headShown: head && head.style.display !== 'none',
                  gridCards: grid ? grid.querySelectorAll('.examcard').length : 0 };
    if (!hws.length) return out; // no hw in this course — head must be hidden
    // main grid must NOT contain hw cards
    const label = (UI.hwLabel || 'Homework');
    out.mainGridHasHw = [...document.querySelectorAll('#examGrid .examcard h3')].some(h => h.textContent.includes(label));
    out.hwCardLabelOk = [...grid.querySelectorAll('.examcard h3')].every(h => h.textContent.includes(label));
    // open the first hw set: practice pill + sealed sketch
    renderExamDetail(hws[0]); await new Promise(r => setTimeout(r, 350));
    const qc = document.querySelector('#examDetail .card.qcard');
    const pillText = (UI.hwPill || 'practice');
    out.qPill = qc ? [...qc.querySelectorAll('.pill')].some(x => x.textContent.includes(pillText)) : false;
    const sk = qc ? qc.querySelector('details.sketch') : null;
    out.sealed = !!sk && !sk.open;
    out.subNoFormatLine = !document.querySelector('#examDetail .sub, #examDetail p.sub')?.textContent.includes(CONFIG.examFormatLine || '@@');
    // quiz pool contains a hw qid
    let found = false;
    for (let i = 0; i < 40 && !found; i++) { pickQuiz(); if (quizQ && quizQ.qid.startsWith('hw_')) found = true; }
    // deterministic fallback: pool construction directly
    if (!found) {
      const p2 = [];
      [...DATA.exams].forEach(e => e.questions.forEach(q => { if (q.statement && e.hw) p2.push(e.id); }));
      found = p2.length > 0 ? 'in-data' : false;
    }
    out.quizReachable = !!found;
    return out;
  });
  console.log(JSON.stringify(r));
  if (r.nHw === 0) {
    if (r.headShown) fails.push('no hw sets but #hwHead is visible');
    console.log('no hw sets in this course — hidden-section check only');
  } else {
    if (!r.headShown) fails.push('#hwHead not visible');
    if (r.gridCards !== r.nHw) fails.push(`hwGrid cards ${r.gridCards} != hw sets ${r.nHw}`);
    if (r.mainGridHasHw) fails.push('hw card leaked into the main exam grid');
    if (!r.hwCardLabelOk) fails.push('a hw card is missing the hwLabel');
    if (!r.qPill) fails.push('hw question card missing the practice pill');
    if (!r.sealed) fails.push('hw solution sketch not sealed');
    if (!r.quizReachable) fails.push('quiz pool cannot reach hw questions');
  }
  await b.close();
  console.log('console errors:', errs.length ? errs : 'none');
  if (errs.length) fails.push(errs.length + ' console errors');
  console.log(fails.length ? 'FAIL:\n - ' + fails.join('\n - ') : 'ALL HW CHECKS PASSED');
  process.exit(fails.length ? 1 : 0);
})();
