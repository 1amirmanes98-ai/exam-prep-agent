/* Callout verification. Usage: node verify_callouts.js <file> <shotDir> */
const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2];
const SHOT = process.argv[3] || '/tmp';
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const fails = [], errs = [];
  const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' });
  await p.waitForTimeout(1000);

  const dir = await p.evaluate(() => document.documentElement.dir);
  if (dir !== 'rtl') fails.push('document dir not rtl: ' + dir);

  // Open an exam and expand every solution sketch, then inspect callouts.
  await p.click('.navbtn[data-v="exams"]'); await p.waitForTimeout(300);
  await p.click('#examGrid .examcard'); await p.waitForTimeout(700);
  await p.evaluate(() => document.querySelectorAll('#examDetail details.sketch').forEach(d => d.open = true));
  await p.waitForTimeout(600);

  const info = await p.evaluate(() => {
    const trick = [...document.querySelectorAll('#examDetail .co-trick')];
    const warn = [...document.querySelectorAll('#examDetail .co-warn')];
    const heb = /[֐-׿]/;
    const sample = trick[0] || warn[0];
    let border = 'n/a', accentSide = 'n/a', firstChar = 'n/a', isHeb = false, tag = 'n/a';
    if (sample) {
      const cs = getComputedStyle(sample);
      border = cs.borderInlineStartWidth + ' ' + cs.borderInlineStartColor;
      // in RTL, inline-start is the RIGHT edge
      accentSide = cs.borderRightWidth !== '0px' ? 'right' : (cs.borderLeftWidth !== '0px' ? 'left' : 'none');
      const strong = sample.querySelector('strong');
      firstChar = strong ? strong.textContent.trim().slice(0, 2) : '(no strong)';
      isHeb = heb.test(sample.textContent);
      tag = sample.tagName;
    }
    // any KaTeX inside a callout still ltr?
    const kIn = document.querySelector('#examDetail .co-trick .katex, #examDetail .co-warn .katex');
    const kdir = kIn ? getComputedStyle(kIn).direction : 'none-in-callout';
    return { nTrick: trick.length, nWarn: warn.length, border, accentSide, firstChar, isHeb, tag, kdir };
  });
  console.log('callouts in this exam:', JSON.stringify(info, null, 0));
  if (info.nTrick === 0) fails.push('no .co-trick callouts rendered in exam detail');
  if (info.nWarn === 0) fails.push('no .co-warn callouts rendered in exam detail');
  if (info.border === 'n/a' || info.border.startsWith('0px')) fails.push('callout has no inline-start accent border: ' + info.border);
  if (info.accentSide !== 'right') fails.push('callout accent not on the right (RTL): ' + info.accentSide);
  if (!info.isHeb) fails.push('callout text not Hebrew');
  if (info.kdir === 'ltr' || info.kdir === 'none-in-callout') { /* ok */ } else fails.push('katex in callout not ltr: ' + info.kdir);

  await p.screenshot({ path: SHOT + '/callouts-exam.png', fullPage: false });

  // Also verify quiz reveal renders callouts (setMd path #2)
  await p.click('.navbtn[data-v="quiz"]'); await p.waitForTimeout(300);
  const revealBtn = await p.$('#quizCard .reveal, #quizReveal, #quizCard button');
  if (revealBtn) { await revealBtn.click().catch(()=>{}); await p.waitForTimeout(400); }
  const quizCo = await p.evaluate(() => document.querySelectorAll('#quiz .co-trick, #quiz .co-warn, #quizCard .co-trick, #quizCard .co-warn').length);
  console.log('callouts visible in quiz reveal:', quizCo);

  await b.close();
  console.log('console errors:', errs.length ? errs : 'none');
  if (errs.length) fails.push(errs.length + ' console errors');
  console.log(fails.length ? 'FAIL:\n - ' + fails.join('\n - ') : 'ALL CALLOUT CHECKS PASSED');
  process.exit(fails.length ? 1 : 0);
})();
