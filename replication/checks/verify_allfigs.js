const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2], SHOT = process.argv[3];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const errs = [];
  const p = await b.newPage({ viewport: { width: 1000, height: 1600 }, deviceScaleFactor: 2 });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(800);
  const qids = await p.evaluate(() => Object.keys(FIG_EXAM));
  const byExam = {};
  qids.forEach(q => { const ex = q.replace(/_Q\d+$/, ''); (byExam[ex] = byExam[ex] || []).push(q); });
  let painted = 0, blank = [];
  const shots = { 'a_2022': 1, 'a_2012': 1, 'b_2012': 1 };
  for (const ex of Object.keys(byExam)) {
    const res = await p.evaluate(async (ex) => {
      show('exams'); renderExamDetail(examById[ex]);
      await new Promise(r => setTimeout(r, 400));
      const out = [];
      document.querySelectorAll('#examDetail .figd[open] canvas').forEach(cv => {
        let nz = 0; try { const d = cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data; for (let i=3;i<d.length;i+=40) if (d[i]!==0) nz++; } catch(e){}
        out.push(nz);
      });
      return out;
    }, ex);
    res.forEach((nz, i) => { if (nz > 30) painted++; else blank.push(ex + '#' + i + '(' + nz + ')'); });
    if (shots[ex]) { await p.screenshot({ path: SHOT + '/allfig-' + ex + '.png' }); }
  }
  await b.close();
  console.log('figures painted:', painted, '/ expected', qids.length);
  if (blank.length) console.log('BLANK:', blank.join(', '));
  console.log('console errors:', errs.length ? errs : 'none');
  process.exit(blank.length || errs.length ? 1 : 0);
})();
