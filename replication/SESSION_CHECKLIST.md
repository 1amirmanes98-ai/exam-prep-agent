# Builder session checklist

**תקציר בעברית:** הצ'קליסט ההנדסי לסוף כל סשן בנייה (המקבילה הלימודית — פרוטוקול
progress.md ב-AGENT.md). כל שורה כאן נולדה מתקלה אמיתית: sync תבניות, בנייה
ב-5 ארגומנטים, סוויטת בדיקות ירוקה, ריענון zip כשה-index השתנה, ענף טרי מ-main,
ו-PR מוערם כש-docs מיוצר מתנגש. עברו עליו לפני שאומרים "סיימתי".

Run through this before ending ANY session that touched engine, content, or
docs. Every line traces to a real incident that cost tokens or broke the site.

## Engine & build
- [ ] Edited the engine only in `replication/engine/`? Ran `bash replication/engine/sync.sh`
      and got "all course copies identical ✓"? (Drift is how the rl/stats split happened.)
- [ ] Rebuilt every affected `docs/**/index.html` with the **5-arg** build
      (`build_site.py <index> <libs> <template> <out> <docs-out>`) — the 5-arg form
      emits the `<!doctype html>` wrapper; without it KaTeX renders in quirks mode.
- [ ] Never hand-edited anything under `docs/` (generated files only).

## Verification (non-negotiable)
- [ ] `bash replication/checks/run_all.sh <site> [--rtl] [--figs] [--examfigs] [--memo]`
      on every rebuilt site — all green, **zero console errors**.
- [ ] Build counts (questions/cards/cheat items printed by build_site.py) match
      expectations — a silently dropped question (e.g. the `(24 pts +7 bonus)`
      regex bug) shows up here first.
- [ ] Content prose passes: diffed vs backup, math spans identical to baseline?

## Content state
- [ ] If anything under `<course>/index/` or `materials/` changed: **regenerate the
      course content zip and hand it to the owner.** These dirs are gitignored —
      the zip is the only backup; a stale zip silently reverts your work on the
      next fresh clone.
- [ ] `progress.md` updated + pushed (study sessions).

## Git & PR hygiene
- [ ] Working on a fresh branch off **latest** `origin/main`? A merged PR is a dead
      branch — restart from main, never stack commits on merged history.
- [ ] Two open PRs both carrying generated `docs/` files? The last merge clobbers
      the first. Stack the second PR on the first branch and say so in the PR body
      ("merge #N, close #M" / merge order).
- [ ] Commit messages state what was verified, not just what changed.

## Handoff to the owner
- [ ] Tell them exactly: which PR(s) to merge, in what order, what auto-deploys
      (Pages redeploys on any push to `main` touching `docs/`), and anything they
      must do (provide a content zip, create a repo, flip a setting).
- [ ] New pitfalls discovered this session → add to REPLICATION.md's anti-patterns
      (paying for a lesson twice is the only real waste).
