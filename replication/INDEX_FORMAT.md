# Index output format — the exact contract for indexing agents

Hand this file to **every** indexing subagent (Phase 1). A Python build script
(`<agent>/scripts/build_site.py`) parses the Markdown you write with regexes, so the
**bold/heading markers below are a contract** — reproduce them verbatim. Prose between the
markers is yours to write well; the markers themselves must match exactly.

This file is course-agnostic. Before fanning out, fill in the two blanks for your course:
- **PILLARS** = the primary categories from `index/SITE_CONFIG.json` `slots` (the ones with a
  `slotRole`). A slot with no role is the catch-all bucket. Every `**Pillar:**` field below
  must be one of these exact single words.
- **LANGUAGE** = which materials are typeset-English (read the cheap text mirror) vs.
  Hebrew/scanned (read the PDF **visually** with the Read tool and translate).

## Grounding & verification rules (non-negotiable)

1. **Read the text mirror first** (`materials/text/<same-path>.txt`) — cheap. Open the PDF
   with Read (renders as images) only to resolve a formula, or when the source is
   **Hebrew/scanned** (its mirror is garbled — read the pages visually and translate).
2. **Never invent content.** Every definition/theorem/condition comes from the source.
   Preserve ALL hypotheses (assumptions, ranges, regularity/step-size conditions) — that is
   where exam marks live.
3. **Verify every number.** For any computational item, compute the actual answer with a quick
   `python3` snippet (numpy/scipy) and put the verified number in the solution. Never state a
   computed answer from memory.
4. Math in LaTeX: `$...$` inline, `$$...$$` display.
5. **Write each output file as soon as it is done** (crash/rate-limit resilience).

---

## FORMAT A — Lectures → `index/lectures/<name>.md`

```
# Lecture NN — <Title>

**File:** materials/lectures/<file>.pdf
**Pillar:** <one of the PILLARS>
**Summary:** one–two sentences: what this lecture establishes and why it matters for the exam.

## Outline
- bullet outline of the lecture's flow

## Key definitions
**Def (name).** Precise statement, all conditions.   ← one blank line between items

**Def (another name).** ...

## Key theorems & results
**Thm (name).** Statement with all hypotheses.
Proof idea: one–three sentences.
Exam relevance: where/how this is tested.

**Lem (name).** ...
Proof idea: ...
Exam relevance: ...

## Techniques & tricks
- computational recipes, "how to run X by hand" steps.

## Exam-relevant nuggets
- the specific facts, edge cases, and gotchas that show up on exams.
```

Parser contract: items under **Key definitions** must each start with `**Def (` (or
`**Definition (`); items under **Key theorems & results** must each start with `**Thm (`,
`**Lem (`, `**Prop (`, or `**Cor (`. These bold leads become auto-extracted flashcard fronts.

## FORMAT B — Recitations / homework → `index/recitations/<name>.md`

```
# Recitation NN — <Topic>

**File:** materials/recitations/<file>
**Pillar:** <one of the PILLARS>
**Summary:** one line.

## Worked problems
- per problem: setup, method used, key steps/answer.

## Key techniques
- reusable solution techniques demonstrated.

## Exam relevance
- which past-exam question types this rehearses.
```

## FORMAT C — Exams → `index/exams/<id>.md`

The **filename is the ref id** the site links topics to. Use the convention the build script
expects for your course — commonly `a_YYYY.md` / `b_YYYY.md` for the two sittings and
`example.md` for a sample exam (some courses prefix, e.g. `fodl_exam_a_2023.md`; match the
existing agent's convention).

```
# Exam — Moed A 2023        (or: Sample Exam)

**File:** materials/exams/<file>.pdf
**Date / semester:** 2023, Moed A
**Total points:** 100
**Aid:** <allowed aids for this exam>
**Solutions available:** yes/no (whether the PDF itself contains an official solution)

## Q1 (30 pts) — Short descriptive title
**Topics:** topic a, topic b | **Pillar:** <PILLAR> | **Difficulty:** 3
**Maps to:** lecture_04, lecture_03
**Statement (English translation):**
Full, faithful English translation — complete enough to re-administer (include the given
data/tables/figures, numbers, and exactly what each part asks).

**Solution sketch:**
Method + key steps. Computational parts: the VERIFIED numeric answer (python-checked). Proofs:
the argument skeleton with the crucial lemma/step. If a source is ambiguous, say so — don't bluff.
```

Parser contract for exams:
- One `## Q<n> (<pts> pts) — <title>` per question (em-dash `—` or hyphen `-` both OK).
- The `**Topics:** ... | **Pillar:** ... | **Difficulty:** ...` line is a single line
  (Difficulty 1–5). `**Maps to:**` on its own line lists `lecture_NN` / `recitation_NN` refs.
- `**Statement...:**` and `**Solution sketch:**` each start their text on the NEXT line.
- **Optional two-tier solution** (newer engine): a mock's solutions file may split a `## QN`
  block into `**Hint:**` (a brief nudge) and `**Full solution:**`; past-exam files just keep
  `**Solution sketch:**` (rendered as the full solution).
- **Optional trick/caution callouts** (newer engine): end a solution with a takeaway pair —
  a paragraph `**💡 Trick.** ...` (the one insight/shortcut that cracks it) and a paragraph
  `**⚠️ Watch out.** ...` (the specific mistake that loses points). The emoji must be **inside**
  the bold lead (the site keys on a paragraph/bullet whose leading `<strong>` starts with 💡/⚠️),
  each on its own line separated by blank lines. The site styles them into green/amber callout
  boxes automatically; math renders inside.

## FORMAT D — Exercise bank → `index/exercise_bank/<name>.md`

FORMAT B's shape, titled `# <Course> Exercise Booklet`, grouped into `## <Topic>` sections
each tagged with its pillar, listing the booklet's problems with a one-line method/answer per
problem. A discoverable practice-problem catalog, not full solutions.

---

## Then synthesize (the orchestrator does this, after indexing)

- `index/TOPICS.md` — `## Pillar N — <SlotName>` headings, then rows
  `| topic | taught | examined | 🔴/🟠/🟡 |`. The `taught` column lists `lecture_NN`/`recitation_NN`;
  the `examined` column lists `a2023_Q1`-style refs; priority 🔴 core / 🟠 frequent / 🟡 seen.
  Build these tables by **parsing the generated `index/exams/*.md`** for each question's
  pillar/topics — that yields real recurring-archetype **frequencies**.
- `index/EXAM_MAP.md` — a master table + a `## Recurring question archetypes` numbered list;
  each archetype names its exam refs inline (the site parses them out and makes them clickable).
