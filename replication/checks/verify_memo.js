const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2], SHOT = process.argv[3];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const errs = [];
  const p = await b.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 2 });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(800);
  await p.click('.navbtn[data-v="memo"]'); await p.waitForTimeout(300);
  const info = await p.evaluate(async () => {
    const secs = [...document.querySelectorAll('#memoList details')];
    // open first two sections to build items
    secs.slice(0,2).forEach(d => d.open = true);
    await new Promise(r => setTimeout(r, 400));
    const items = document.querySelectorAll('#memoList .memoitem');
    const useLabels = [...document.querySelectorAll('#memoList .use b')].map(b => b.textContent);
    const count = [...document.querySelectorAll('#memoList .seccount')].map(s => s.textContent);
    const secColors = secs.slice(0,4).map(d => (d.className.match(/p-\w+/)||['?'])[0]);
    return { sections: secs.length, itemsBuilt: items.length,
             useLabelSample: useLabels[0] || '(none)', countSample: count[0] || '',
             secColors };
  });
  console.log(JSON.stringify(info, null, 0));
  await p.evaluate(() => document.querySelector('#memoList details').scrollIntoView({block:'start'}));
  await p.waitForTimeout(200);
  await p.screenshot({ path: SHOT + '/memo-tab.png' });
  await b.close();
  const fails = [];
  // course-agnostic: the Memorize tab renders its pillar sections (>=3; a cheat sheet
  // may add extra toolbox sections — FODL has 6), items, a non-empty "use it when"
  // label, and an "n/m" section count — with no console errors.
  if (info.sections < 3) fails.push('too few memo sections: ' + info.sections);
  if (!info.itemsBuilt) fails.push('no memo items rendered');
  if (!info.useLabelSample || info.useLabelSample === '(none)') fails.push('use-when label missing on memo items');
  if (!/\d+\s*\/\s*\d+/.test(info.countSample)) fails.push('section count not "n/m": ' + info.countSample);
  if (errs.length) fails.push(errs.length + ' console errors');
  console.log('console errors:', errs.length ? errs : 'none');
  console.log(fails.length ? 'FAIL: ' + fails.join('; ') : 'MEMO OK');
  process.exit(fails.length ? 1 : 0);
})();
