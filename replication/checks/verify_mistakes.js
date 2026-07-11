/* Verify the "My mistakes" flashcard toggle: restricts deck to miss/almost cards,
   composes with existing state, and shows a friendly empty-state; existing fixes intact. */
const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2], SHOT = process.argv[3];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const fails = [], errs = [];
  const p = await b.newPage({ viewport: { width: 1000, height: 1400 }, deviceScaleFactor: 2 });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(700);

  const r = await p.evaluate(async () => {
    show('flash'); await new Promise(r => setTimeout(r, 200));
    // clean slate
    store.data.cards = {}; store.save(); buildDeck(); renderFlashFilters(); renderFlash();
    const fullLen = deck.length;

    // toggle mistakes ON with zero mistakes -> empty deck + friendly message
    flashMistakes = true; buildDeck(); renderFlashFilters(); renderFlash();
    const emptyLen = deck.length;
    const emptyMsg = document.querySelector('#flashArea .empty') ? document.querySelector('#flashArea .empty').textContent : '';

    // back OFF, grade first 3 cards: miss, half, got
    flashMistakes = false; buildDeck();
    const graded = [];
    ['miss','half','got'].forEach((g,i) => { const c = deck[i]; const id = cardId(c); store.data.cards[id] = { seen:1, last:g }; graded.push({id,g}); });
    store.save();

    // toggle mistakes ON -> only miss + half survive (2), not got
    flashMistakes = true; buildDeck(); renderFlashFilters(); renderFlash();
    const mistLen = deck.length;
    const mistIds = deck.map(cardId);
    const hasMiss = mistIds.includes(graded[0].id);
    const hasHalf = mistIds.includes(graded[1].id);
    const hasGot  = mistIds.includes(graded[2].id);
    const missFirst = deck.length ? cardId(deck[0]) === graded[0].id : false; // miss ranks before half

    // toggle chip reflects state
    const chip = [...document.querySelectorAll('#flashFilters .chipbtn')].find(x => x.textContent.includes('הטעויות') || x.textContent.toLowerCase().includes('mistake'));
    const chipOn = chip ? chip.className.includes('on') : false;

    // reset button still present (recent fix intact)
    const resetBtn = !!document.querySelector('#flashFilters .chipbtn.danger');

    flashMistakes = false; buildDeck(); renderFlashFilters(); renderFlash();
    return { fullLen, emptyLen, emptyMsg, mistLen, hasMiss, hasHalf, hasGot, missFirst, chipOn, resetBtn };
  });
  console.log(JSON.stringify(r, null, 0));
  if (r.fullLen < 10) fails.push('full deck too small: ' + r.fullLen);
  if (r.emptyLen !== 0) fails.push('mistakes-mode with no mistakes should be empty, got ' + r.emptyLen);
  if (!/🎉|תרגלו|practice/.test(r.emptyMsg)) fails.push('empty-state message missing: ' + r.emptyMsg);
  if (r.mistLen !== 2) fails.push('mistakes deck should be 2 (miss+half), got ' + r.mistLen);
  if (!r.hasMiss) fails.push('miss card not in mistakes deck');
  if (!r.hasHalf) fails.push('half card not in mistakes deck');
  if (r.hasGot) fails.push('got card should NOT be in mistakes deck');
  if (!r.missFirst) fails.push('miss should rank before half');
  if (!r.chipOn) fails.push('toggle chip not showing on-state');
  if (!r.resetBtn) fails.push('reset button (recent fix) missing');

  await b.close();
  console.log('console errors:', errs.length ? errs : 'none');
  if (errs.length) fails.push(errs.length + ' console errors');
  console.log(fails.length ? 'FAIL:\n - ' + fails.join('\n - ') : 'ALL MISTAKES-TOGGLE CHECKS PASSED');
  process.exit(fails.length ? 1 : 0);
})();
