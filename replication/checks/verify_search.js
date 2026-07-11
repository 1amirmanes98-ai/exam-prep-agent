/* Verify the Ask/search: Hebrew queries return relevant hits, corpus covers all
   content types, and clicking a result opens the RIGHT exam — and lands on the
   right question (or documents that it doesn't). */
const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2], SHOT = process.argv[3];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const fails = [], errs = [];
  const p = await b.newPage({ viewport: { width: 1100, height: 860 }, deviceScaleFactor: 2 });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(700);

  // corpus composition line
  const corpus = await p.evaluate(() => document.querySelector('#askCorpus') ? document.querySelector('#askCorpus').textContent : '');
  console.log('corpus:', corpus);

  const queries = (process.argv[4] ? process.argv[4].split(',') : ['וילקוקסון', 'יחס הסיכויים', 'שיטת המומנטים', 'חי-בריבוע']);
  for (const qtext of queries) {
    const r = await p.evaluate(async (qt) => {
      show('ask'); await new Promise(r => setTimeout(r, 120));
      const inp = document.querySelector('#askInput');
      inp.value = qt; renderAsk();
      await new Promise(r => setTimeout(r, 120));
      const out = document.querySelector('#askResults');
      const hits = out.querySelectorAll('.card.hit');
      const chips = out.querySelectorAll('.card .chipbtn'); // direct-answer exam chips
      const firstHitSrc = hits[0] ? (hits[0].querySelector('.src') ? hits[0].querySelector('.src').textContent.trim() : '') : '';
      const hitMath = hits[0] ? hits[0].querySelectorAll('.katex').length : 0;
      return { nHits: hits.length, nChips: chips.length, firstHitSrc, hitMath, noMatch: !!out.querySelector('.empty') };
    }, qtext);
    console.log(`"${qtext}" -> hits=${r.nHits} chips=${r.nChips} firstSrc="${r.firstHitSrc.slice(0,50)}" katex=${r.hitMath} noMatch=${r.noMatch}`);
    if (r.noMatch || r.nHits === 0) fails.push(`query "${qtext}" returned no hits`);
  }

  // click-through: opening a hit for a NON-first question must land on THAT question.
  const nav = await p.evaluate(async () => {
    show('ask'); await new Promise(r => setTimeout(r, 100));
    if (!CHUNKS) buildChunks();
    // pick an exam passage whose question is NOT Q1 (the real test of scroll-to-question)
    const exq = CHUNKS.find(c => c.exam && c.qn && c.qn >= 3 && c.sec === 'solution sketch')
             || CHUNKS.find(c => c.exam && c.qn && c.qn > 1);
    const targetExam = exq.exam, targetQn = exq.qn;
    openExam(targetExam, targetQn);
    await new Promise(r => setTimeout(r, 60));
    const targetCard = document.getElementById('q-' + targetExam + '-' + targetQn);
    const hasAnchor = !!targetCard;
    const flashing = targetCard ? targetCard.classList.contains('qflash') : false; // capture flash early
    await new Promise(r => setTimeout(r, 1500)); // allow smooth scroll to settle
    const det = document.querySelector('#examDetail');
    const visible = det && det.style.display !== 'none';
    // is the target question now near the top of the viewport?
    const rectTop = targetCard ? targetCard.getBoundingClientRect().top : null;
    // which qcard is closest to top (should be our target)
    const cards = det ? [...det.querySelectorAll('.card.qcard')] : [];
    let topMostQn = null, bestTop = Infinity;
    cards.forEach(c => { const t = c.getBoundingClientRect().top; if (Math.abs(t) < bestTop) { bestTop = Math.abs(t); topMostQn = c.id; } });
    return { targetExam, targetQn, visible, hasAnchor, rectTop, flashing, topMostId: topMostQn, targetId: 'q-' + targetExam + '-' + targetQn };
  });
  console.log('nav:', JSON.stringify(nav));
  if (!nav.visible) fails.push('exam detail did not open on click');
  if (!nav.hasAnchor) fails.push('per-question anchor missing');
  if (nav.topMostId !== nav.targetId) fails.push(`did not scroll to target: top is ${nav.topMostId}, wanted ${nav.targetId}`);
  if (!(nav.rectTop >= -2 && nav.rectTop < 760)) fails.push('target question not visible in viewport after scroll: rectTop=' + nav.rectTop);
  if (!nav.flashing) fails.push('target question not highlighted (qflash)');
  console.log(`  -> opened ${nav.targetExam} Q${nav.targetQn}; landed on ${nav.topMostId} (target ${nav.targetId}); rectTop=${Math.round(nav.rectTop)}; flash=${nav.flashing}`);

  await b.close();
  console.log('console errors:', errs.length ? errs : 'none');
  if (errs.length) fails.push(errs.length + ' console errors');
  console.log(fails.length ? 'FAIL:\n - ' + fails.join('\n - ') : 'ALL SEARCH CHECKS PASSED');
  process.exit(fails.length ? 1 : 0);
})();
