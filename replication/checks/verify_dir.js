/* Verify RTL direction is now rtl (not auto-flipped-LTR) on Latin-first content. */
const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2], SHOT = process.argv[3];
const EXAM_ID = process.argv[4] || '';  // default: first exam in DATA
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const fails = [], errs = [];
  const p = await b.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 2 });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(900);

  // a_2025 Q1 solution OPENS with "**a. לא נכון.**" (Latin 'a') — was flipping to LTR.
  const r = await p.evaluate(async (EXAM_ID) => {
    show('exams'); const _eid = EXAM_ID || (DATA.exams.find(e => !e.hw) || DATA.exams[0]).id; renderExamDetail(examById[_eid]);
    await new Promise(r => setTimeout(r, 500));
    const sk = document.querySelectorAll('#examDetail details.sketch')[0]; // Q1
    sk.open = true; await new Promise(r => setTimeout(r, 250));
    const inner = sk.querySelector('.inner');
    const ps = inner.querySelectorAll('p');
    const firstP = ps[0];
    const h3 = document.querySelector('#examDetail .qhead h3');
    const stmt = document.querySelector('#examDetail .qbody.mdslot');
    return {
      sketchDir: getComputedStyle(inner).direction,
      firstPDir: firstP ? getComputedStyle(firstP).direction : 'n/a',
      pCount: ps.length,
      h3Dir: h3 ? getComputedStyle(h3).direction : 'n/a',
      stmtDir: stmt ? getComputedStyle(stmt).direction : 'n/a',
      firstPText: firstP ? firstP.textContent.slice(0, 30) : ''
    };
  }, EXAM_ID);
  console.log('a_2025 Q1 (opens **a.**):', JSON.stringify(r));
  if (r.firstPDir !== 'rtl') fails.push('sketch first <p> not rtl: ' + r.firstPDir);
  if (r.h3Dir !== 'rtl') fails.push('question h3 not rtl: ' + r.h3Dir);
  if (r.stmtDir !== 'rtl') fails.push('statement not rtl: ' + r.stmtDir);
  if (r.pCount < 5) fails.push('sketch not split into steps: ' + r.pCount);

  // Topics tab meta + a flashcard prompt direction
  const t = await p.evaluate(async () => {
    show('topics'); await new Promise(r => setTimeout(r, 300));
    const meta = document.querySelector('#topicList .meta');
    show('flash'); await new Promise(r => setTimeout(r, 250));
    const kind = document.querySelector('#flashArea .kind');
    const front = document.querySelector('#flashArea .front');
    return {
      metaDir: meta ? getComputedStyle(meta).direction : 'n/a',
      kindDir: kind ? getComputedStyle(kind).direction : 'n/a',
      frontDir: front ? getComputedStyle(front).direction : 'n/a'
    };
  });
  console.log('topics/flash:', JSON.stringify(t));
  if (t.metaDir !== 'rtl') fails.push('topics meta not rtl: ' + t.metaDir);
  if (t.kindDir !== 'rtl') fails.push('flash prompt not rtl: ' + t.kindDir);
  if (t.frontDir !== 'rtl') fails.push('flash front not rtl: ' + t.frontDir);

  await p.evaluate(async (EXAM_ID) => { show('exams'); const _eid = EXAM_ID || (DATA.exams.find(e => !e.hw) || DATA.exams[0]).id; renderExamDetail(examById[_eid]);
    await new Promise(r => setTimeout(r, 300));
    const sk = document.querySelectorAll('#examDetail details.sketch')[0]; sk.open = true; sk.scrollIntoView({block:'start'}); }, EXAM_ID);
  await p.waitForTimeout(400);
  await p.screenshot({ path: SHOT + '/dir-sketch.png' });

  await b.close();
  console.log('console errors:', errs.length ? errs : 'none');
  if (errs.length) fails.push(errs.length + ' console errors');
  console.log(fails.length ? 'FAIL:\n - ' + fails.join('\n - ') : 'ALL DIR CHECKS PASSED');
  process.exit(fails.length ? 1 : 0);
})();
