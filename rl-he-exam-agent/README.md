# למידה מחיזוקים — אתר לימוד (עברית)

גרסה עברית (RTL) של אתר הלימוד ללמידה מחיזוקים (TAU 0368.3075, פרופ׳ ישי מנצור).
אותו תוכן ואותם פיצ'רים כמו הגרסה האנגלית — מתורגם לעברית.

- **אתר:** https://1amirmanes98-ai.github.io/exam-prep-agent/rl-he/
- הגרסה האנגלית: https://1amirmanes98-ai.github.io/exam-prep-agent/rl/

## מבנה

זהו עותק של `rl-exam-agent/` שבו:

- `index/SITE_CONFIG.json` — קונפיגורציה עברית (`dir:rtl`, `lang:he`, חבילת מחרוזות
  ה-UI המלאה ו-`slotLabels` בעברית). **הקובץ היחיד שמעקב git**.
- `index/**` + `generated_exams/**` — תוכן הקורס המתורגם לעברית (**לא במעקב git**;
  מסופק ב-`rl-he-tutor-content.zip`).
- `scripts/` — מנוע האתר המשותף (זהה בייט-לבייט ל-`replication/engine/`), ללא שינויים.

הסמנים המבניים (`## Q`, `**Pillar:** <English>`, `**Def(...)**`, `## Key definitions`,
הפניות `a2023_Q1`, וכל ה-`$...$`) נשארים באנגלית/ASCII — רק הפרוזה תורגמה, כדי שהפרסר יעבוד.

## שחזור תוכן ובנייה

```bash
bash rl-he-exam-agent/scripts/restore_content.sh <path-to-rl-he-tutor-content.zip>
python3 rl-he-exam-agent/scripts/build_site.py rl-he-exam-agent/index <libs> \
  rl-he-exam-agent/scripts/site_template.html /tmp/out.html docs/rl-he/index.html
bash replication/checks/run_all.sh docs/rl-he/index.html --rtl --figs --memo
```

התוכן (חומרי הקורס והאינדקס) שייך ליוצריו ונשמר מחוץ ל-git.
