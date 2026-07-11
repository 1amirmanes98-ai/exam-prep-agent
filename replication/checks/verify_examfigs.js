const { chromium } = require('playwright-core');
const CHROME = process.env.CHROME_BIN ||
  (() => { const fs = require('fs'), base = '/opt/pw-browsers';
    try { for (const d of fs.readdirSync(base)) { const p = base + '/' + d + '/chrome-linux/chrome'; if (d.startsWith('chromium') && fs.existsSync(p)) return p; } } catch (e) {}
    throw new Error('Chromium not found — set CHROME_BIN'); })();

const F = 'file://' + process.argv[2], SHOT = process.argv[3];
(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const errs = [];
  const p = await b.newPage({ viewport: { width: 1000, height: 1500 }, deviceScaleFactor: 2 });
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(900);
  for (const id of ['b_2022','a_2013','a_2020']) {
    const known = await p.evaluate((x) => !!examById[x], id);
    if (!known) { console.log(id + ': not in this course, skipped'); continue; }
    const info = await p.evaluate(async (id) => {
      show('exams'); renderExamDetail(examById[id]);
      await new Promise(r => setTimeout(r, 600));
      const fig = document.querySelector('#examDetail details.figd[open]');
      if (fig) fig.scrollIntoView({ block: 'center' });
      const cvs = [...document.querySelectorAll('#examDetail canvas')];
      let painted = 0; cvs.forEach(cv => { try { const c = cv.getContext('2d'); const d = c.getImageData(0,0,cv.width, cv.height).data; let nz=0; for (let i=3;i<d.length;i+=4) if (d[i]!==0) nz++; if (nz>200) painted++; } catch(e){} });
      return { canvases: cvs.length, painted, capOk: !!(fig && /להמחשה|סכמט/.test(fig.textContent)) };
    }, id);
    console.log(id, JSON.stringify(info));
    await p.waitForTimeout(250);
    await p.screenshot({ path: SHOT + '/examfig-' + id + '.png' });
  }
  await b.close();
  console.log('console errors:', errs.length ? errs : 'none');
})();
