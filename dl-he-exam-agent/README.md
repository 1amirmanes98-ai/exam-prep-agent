# יסודות הלמידה העמוקה — אתר לימוד (עברית)

גרסה עברית (RTL) של אתר הלימוד ליסודות הלמידה העמוקה (TAU 03683080).
אותו תוכן ואותם פיצ'רים כמו הגרסה האנגלית — מתורגם לעברית.

- **אתר:** https://1amirmanes98-ai.github.io/exam-prep-agent/dl-he/
- הגרסה האנגלית: https://1amirmanes98-ai.github.io/exam-prep-agent/

## מבנה

זהו עותק של `dl-exam-agent/` שבו:

- `index/SITE_CONFIG.json` — קונפיגורציה עברית (`dir:rtl`, `lang:he`, חבילת מחרוזות
  ה-UI המלאה ו-`slotLabels` בעברית), ו-`index/figures.js` עם כיתובים בעברית.
- `index/**` + `generated_exams/**` — תוכן הקורס המתורגם לעברית, **במעקב git**
  (רק `materials/` נשאר בחוץ).
- `scripts/` — מנוע האתר המשותף (זהה בייט-לבייט ל-`replication/engine/`), ללא שינויים.

הסמנים המבניים (`## Q`, `**Pillar:** <English>`, `**Def (...)**`, `## Key definitions`,
הפניות `a2023_Q1`, וכל ה-`$...$`) נשארים באנגלית/ASCII — רק הפרוזה תורגמה, כדי שהפרסר יעבוד.

## בנייה

```bash
python3 dl-he-exam-agent/scripts/build_site.py dl-he-exam-agent/index <libs> \
  dl-he-exam-agent/scripts/site_template.html /tmp/out.html docs/dl-he/index.html
bash replication/checks/run_all.sh docs/dl-he/index.html --rtl --figs --memo
```

התוכן (חומרי הקורס) שייך ליוצריו; האינדקס המתורגם נמצא ב-git.
