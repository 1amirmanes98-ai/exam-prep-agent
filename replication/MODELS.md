# Model playbook — which Claude model for which job

**תקציר בעברית:** חלוקת העבודה שהוכיחה את עצמה: **פייבל** לתכנון, ארכיטקטורה
וסקירת עבודה; **אופוס** לביצוע — עריכת מנוע, תוכן שדורש שיקול דעת (פתרונות,
תרגומים), ודיבוג; **סונט** לפריסת האינדוקס המקבילית של שלב 1 (העבודה המכנית
היקרה — שם נחסך רוב הכסף); **הייקו** רק לסריקות זולות, לא לתוכן. במעבר מודלים
באמצע עבודה: כתבו מסמך handoff קצר ל-scratchpad ותנו למבצע לקרוא אותו.

The repo's build cost is dominated by a few very different kinds of work. Using
one model for everything either overpays (frontier model doing mechanical
extraction) or underdelivers (small model translating Hebrew math). This split
is what actually worked across three course builds:

## The split

| Job | Model | Why |
|---|---|---|
| Planning, architecture, scoping, reviewing diffs/PRs, writing handoff specs | **Fable** | Highest-leverage thinking per token; produces the plan the executor follows |
| Engine/template edits, build-script changes, debugging regressions | **Opus** | Surgical edits in a 1800-line template; one wrong selector costs a whole verify cycle |
| Content requiring judgment: solution sketches, translations, 💡/⚠️ callouts, cheat-sheet entries, readability passes | **Opus** | Math fidelity + natural Hebrew; cheaper models mistranslate (real case: MAD → "המדד המשוגע") |
| **Phase-1 indexing fan-out** (3–4 files per agent, extraction against `replication/INDEX_FORMAT.md`) | **Sonnet** | The ~250–500k-token cost center; the format contract makes it mechanical, so Sonnet ≈ Opus quality at a fraction of the cost |
| Text-mirror summarization, validate_index runs, count checks | **Sonnet** | Mechanical against a spec |
| Grep-style scouting, "where does X live" searches | **Haiku / Explore agents** | Cheap; conclusions only |
| Tutoring sessions (/teach, /quiz, /exam grading) | **Opus** (or Sonnet for flashcard drills) | Grading nuance and proof checking need the stronger model |

**Not recommended:** Haiku for any content that ends up in `index/` or on the
site — Hebrew phrasing and LaTeX fidelity degrade, and fixing bad content costs
more than generating it well once.

## Mechanics

- **Subagent/Workflow model override:** pass `model:`/`opts.model` per agent
  call. Default = inherit the session model; override *down* to Sonnet for the
  Phase-1 fleet, never for the synthesis steps (TOPICS.md / EXAM_MAP.md — do
  those yourself in the main loop).
- **Effort tiers:** `effort: 'low'` for mechanical slices, default for
  everything else; reserve high effort for adversarial verification passes.
- **Escalation rule:** if a fan-out slice comes back wrong-shaped, do not
  re-prompt the same model in a loop — re-run that slice one model tier up.
  Real incident: a batch agent classified Hebrew exam files as "English" and
  silently skipped them; the fix was re-running those two files with a stronger
  model plus a per-file diff-vs-backup check.
- **Credit/model errors mid-fleet:** relaunch only the failed slices with an
  explicit `model:` override (see REPLICATION.md Phase 1) — never rerun the
  whole fleet.
- **Model handoffs (Fable → Opus):** when planning and execution are split
  across sessions/models, write the plan to a file (scratchpad `HANDOFF-*.md`
  or the plan file) with exact file paths, greppable anchors, and a
  verification list. The executor starts by reading it. This repo's RTL fix
  shipped exactly this way.

## Session-type cheat sheet

| Session | Model to start with |
|---|---|
| "Plan the next course build" | Fable |
| "Index 19 exams" (the fan-out itself) | Sonnet agents, Opus orchestrating |
| "Build + verify the site" | Opus (mostly tooling; Sonnet works if budget-tight) |
| "Polish/translate content" | Opus |
| "Study with me" (tutor mode) | Opus; Sonnet for rapid drills |
| "Where is/how does X work?" | Haiku/Explore |
