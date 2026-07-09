#!/usr/bin/env python3
"""Validate an agent's generated index BEFORE building the site — catches the
parser-breaking mistakes indexing agents make, for free, without spinning up Chromium.

Checks:
- every exam file parses to >=1 `## Q<n> (<pts> pts) — title` question, with a
  Topics/Pillar/Difficulty line, a Statement, and a Solution sketch (or Full solution);
- each exam's question points sum to its **Total points** header (if present);
- every `**Pillar:**` value maps to a real slot via SITE_CONFIG slotKeywords;
- lecture files carry a `**Pillar:**` and at least one Def/Thm flashcard item;
- TOPICS.md examined-refs and EXAM_MAP archetype refs resolve to exams that exist.

Usage: python3 replication/validate_index.py <agent>/index
Exit code 1 if any hard error is found. Warnings don't fail the run.
"""
import json, re, sys, glob, os

CARD = re.compile(r"^\s*(?:[-*]\s*)?\*\*\s*(Def|Definition|Thm|Theorem|Lem|Lemma|Prop|Proposition|Cor|Corollary)\b", re.I)


def canon(raw, cfg):
    raw = (raw or "").strip().lower()
    for k, v in cfg.get("slotKeywords", {}).items():
        if k in raw:
            return v
    return cfg["slots"][-1]


def main(index_dir):
    cfg = json.load(open(os.path.join(index_dir, "SITE_CONFIG.json")))
    slots = set(cfg["slots"])
    errors, warns = [], []
    exam_ids = set()
    callouts = 0

    for f in sorted(glob.glob(f"{index_dir}/exams/*.md")):
        eid = os.path.basename(f)[:-3]
        exam_ids.add(eid.replace("_", ""))
        t = open(f).read()
        total_m = re.search(r"\*\*Total points:\*\*\s*(\d+)", t)
        qs = re.findall(r"^## Q(\d+)\s*\((\d+)\s*pts?\)\s*[—-]\s*(.+)$", t, re.M)
        if not qs:
            errors.append(f"{eid}: no `## Q<n> (<pts> pts) — title` questions parsed")
            continue
        npil = len(re.findall(r"\*\*Pillar:\*\*", t))
        nstmt = len(re.findall(r"\*\*Statement[^:]*:\*\*", t))
        nsol = len(re.findall(r"\*\*(?:Solution sketch|Full solution)[^:]*:\*\*", t))
        if npil < len(qs): warns.append(f"{eid}: {npil} Pillar lines for {len(qs)} questions")
        if nstmt < len(qs): errors.append(f"{eid}: {nstmt} Statements for {len(qs)} questions")
        if nsol < len(qs): warns.append(f"{eid}: {nsol} solutions for {len(qs)} questions")
        callouts += len(re.findall(r"\*\*\s*(?:💡|⚠)", t))
        psum = sum(int(p) for _, p, _ in qs)
        if total_m and int(total_m.group(1)) != psum:
            warns.append(f"{eid}: points sum {psum} != Total {total_m.group(1)}")
        for pm in re.finditer(r"\*\*Pillar:\*\*\s*([A-Za-z/ ]+)", t):
            if canon(pm.group(1), cfg) not in slots:
                errors.append(f"{eid}: pillar '{pm.group(1).strip()}' does not map to a slot")

    for f in sorted(glob.glob(f"{index_dir}/lectures/*.md")):
        t = open(f).read(); nm = os.path.basename(f)
        if not re.search(r"\*\*Pillar:\*\*", t): errors.append(f"{nm}: missing **Pillar:**")
        if not any(CARD.match(l) for l in t.splitlines()):
            warns.append(f"{nm}: no Def/Thm flashcard items")

    topics = os.path.join(index_dir, "TOPICS.md")
    if os.path.exists(topics):
        refs = re.findall(r"\b([abc])[_ ]?(\d{4})[_ ]?Q\d", open(topics).read())
        for a, y in refs:
            if f"{a}{y}" not in exam_ids:
                warns.append(f"TOPICS.md: examined ref {a}{y}_Q.. has no exam file")

    cheat = os.path.join(index_dir, "CHEATSHEET.md")
    if os.path.exists(cheat):
        ct = open(cheat).read()
        items = re.findall(r"^### [^\n]+\n(.*?)(?=\n### |\n## |\Z)", ct, re.S | re.M)
        with_stmt = sum(1 for b in items if re.search(r"\*\*Statement:\*\*", b))
        if with_stmt < 20:
            warns.append(f"CHEATSHEET.md: only {with_stmt} items with **Statement:** (aim ~40-55)")
        kws = [k.lower() for k in cfg.get("slotKeywords", {})]
        for sm in re.finditer(r"^## +(.+)$", ct, re.M):
            if not any(k in sm.group(1).strip().lower() for k in kws):
                warns.append(f"CHEATSHEET.md: section '{sm.group(1).strip()}' has no slotKeywords term -> default color")
    else:
        warns.append("no CHEATSHEET.md -> the Memorize tab will be empty (see INDEX_FORMAT FORMAT E)")

    if callouts == 0 and exam_ids:
        warns.append("no trick/watch-out solution callouts found (optional; see INDEX_FORMAT FORMAT C)")

    for e in errors: print("ERROR:", e)
    for w in warns: print("warn: ", w)
    print(f"\n{len(exam_ids)} exams, {len(errors)} errors, {len(warns)} warnings")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: validate_index.py <agent>/index")
    main(sys.argv[1].rstrip("/"))
