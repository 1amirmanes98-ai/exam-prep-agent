#!/usr/bin/env python3
"""Check an EN/HE pair of exam or mock-solution files against replication/SOLUTION_STYLE.md.

usage: solution_style_check.py <en.md> <he.md> [--structure] [--questions 1,2]

Always:
  * parity   — identical ordered math spans ($…$ / $$…$$, \\text-like arguments masked) and equal
               counts of solution markers, part leaders, callouts and common-mistakes blocks
               (hint blocks are ignored: Hebrew past exams carry hints the English ones lack);
  * multirel — no inline formula with 2+ relation signs inside SOLUTION text (both files);
  * rtl      — no ⇒ ⇐ ⇔ → ← ≤ ≥ < > [ ] in Hebrew solution prose outside math;
  * hebmath  — no Hebrew mixed with other symbols inside one formula (a lone \\text{word} is fine).
With --structure (files already rewritten to the new style): every part of every checked question
carries the 8 labelled elements, a verification line, and each question ends with common mistakes,
then 💡, then ⚠️.
Exit 0 only if every check passes.
"""
import re, sys

MASK = re.compile(r"\\(text|operatorname|mathrm|mbox)\s*\{[^{}]*\}")
MATH = re.compile(r"\$\$(.+?)\$\$|\$([^$]+?)\$", re.S)
REL = re.compile(r"\\(?:le|ge|leq|geq|neq|ne|iff|Rightarrow|Leftarrow|Leftrightarrow|to|approx|equiv|sim|subset|subseteq|implies)(?![A-Za-z])|(?<![<>\\])(?:=|<|>)")
LABELS = {
    "he": ["**מה שואלים.**", "**הכלי ולמה.**", "**הגדרות.**", "**פתרון.**", "**במילים.**",
           "**בדיקת שפיות.**", "**מה לכתוב במבחן.**", "*אומת:"],
    "en": ["**What is asked.**", "**Tool and why.**", "**Definitions.**", "**Solution.**",
           "**In words.**", "**Sanity check.**", "**What to write in the exam.**", "*Verified:"],
}
MISTAKES = {"he": "**טעויות נפוצות.**", "en": "**Common mistakes.**"}
# part leaders: RL letters "**(a)", DL numbers "**1." (mocks: "**1. (10)")
LEAD = r"\*\*(?:\(([a-z])\)|(\d+(?:\.?[a-z])?)\.?(?=[\s(]))"


def spans(s):
    out = []
    for m in MATH.finditer(s):
        body = m.group(1) if m.group(1) is not None else m.group(2)
        out.append(re.sub(r"\s+", "", MASK.sub(lambda x: "\\" + x.group(1) + "{}", body)))
    return out


def question_blocks(s):
    """(qnum, solution_text) per question: text after the solution marker up to the next '## '."""
    out = []
    heads = list(re.finditer(r"^## Q(?:uestion)?\s*(\d+)\b", s, re.M))
    for i, h in enumerate(heads):
        end = heads[i + 1].start() if i + 1 < len(heads) else len(s)
        blk = s[h.start():end]
        m = re.search(r"\*\*(?:Solution sketch|Full solution)[^:]*:\*\*", blk)
        if m:
            sol = blk[m.end():]
            sol = re.split(r"^## (?!Q)", sol, flags=re.M)[0]      # stop at '## Grading notes' etc.
            out.append((int(h.group(1)), sol))
    return out


def counts(s):
    return {
        "solution markers": len(re.findall(r"\*\*(?:Solution sketch|Full solution)[^:]*:\*\*", s)),
        "part leaders": len(re.findall(r"^" + LEAD, s, re.M)),
        "tips": s.count("**💡"), "warnings": s.count("**⚠️"),
    }


def inline_multirel(text):
    bad = []
    t = re.sub(r"\$\$.*?\$\$", " ", text, flags=re.S)
    for m in re.finditer(r"\$([^$]+)\$", t):
        b = re.sub(r"\\begin\{(cases|aligned)\}.*?\\end\{\1\}", "", m.group(1), flags=re.S)
        b = re.sub(r"_\{[^{}]*\}|\^\{[^{}]*\}", "", b)
        if len(REL.findall(b)) >= 2:
            bad.append(m.group(1))
    return bad


def rtl_bad(text):
    prose = re.sub(r"\$\$.*?\$\$", " ", text, flags=re.S)
    prose = re.sub(r"\$[^$]+\$", " ", prose)
    prose = re.sub(r"`[^`]*`", " ", prose)
    out = []
    for line in prose.split("\n"):
        if line.lstrip().startswith("|---"):
            continue
        for ch in re.findall(r"[⇒⇐⇔→←↔≤≥<>\[\]]", line):
            out.append((ch, line.strip()[:90]))
    return out


def heb_mixed(text):
    """Hebrew \\text{} that holds digits/Latin, or sits right next to a digit, renders reordered
    in RTL pages (the bidi algorithm glues the digit to the Hebrew run)."""
    bad = []
    for m in MATH.finditer(text):
        body = m.group(1) if m.group(1) is not None else m.group(2)
        for t in re.finditer(r"\\text\{([^{}]*)\}", body):
            arg = t.group(1)
            if not re.search(r"[\u0590-\u05FF]", arg):
                continue
            before = body[:t.start()].rstrip(" {\\,;:!")
            after = body[t.end():].lstrip(" }\\,;:!")
            if (re.search(r"[0-9A-Za-z]", arg) or (before[-1:].isdigit()) or (after[:1].isdigit())):
                bad.append(body[:90])
                break
    return bad


def structure(sol, lang):
    problems = []
    parts = re.split(r"(?m)^(?=\*\*(?:\([a-z]\)|\d+(?:\.?[a-z])?\.?[\s(]))", sol)
    parts = [p for p in parts if re.match(LEAD, p)]
    if not parts:
        problems.append("no part leaders (**(a)** or **1.**)")
    for p in parts:
        lm = re.match(LEAD, p)
        tag = lm.group(1) or lm.group(2)
        missing = [lab for lab in LABELS[lang] if lab not in p]
        if missing:
            problems.append(f"part ({tag}) missing: {', '.join(missing)}")
    paras = [x for x in sol.strip().split("\n\n") if x.strip()]
    if len(paras) < 3 or not paras[-2].startswith("**💡") or not paras[-1].startswith("**⚠️"):
        problems.append("question does not end with 💡 then ⚠️")
    if MISTAKES[lang] not in sol:
        problems.append("no common-mistakes block")
    elif sol.index(MISTAKES[lang]) > sol.rfind("**💡"):
        problems.append("common-mistakes block is after 💡")
    return problems


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    en_p, he_p = args[0], args[1]
    want = None
    if "--questions" in sys.argv:
        want = {int(x) for x in sys.argv[sys.argv.index("--questions") + 1].split(",")}
    en, he = open(en_p, encoding="utf-8").read(), open(he_p, encoding="utf-8").read()
    fails = []
    a, b = spans(en), spans(he)
    if a != b:
        i = next((k for k, (x, y) in enumerate(zip(a, b)) if x != y), min(len(a), len(b)))
        fails.append(f"parity: math differs at span #{i} (en {len(a)} spans, he {len(b)} spans)\n"
                     f"    en: {a[i][:120] if i < len(a) else '—'}\n    he: {b[i][:120] if i < len(b) else '—'}")
    ce, ch = counts(en), counts(he)
    for k in ce:
        if ce[k] != ch[k]:
            fails.append(f"parity: {k} en={ce[k]} he={ch[k]}")
    if en.count(MISTAKES["en"]) != he.count(MISTAKES["he"]):
        fails.append(f"parity: common-mistakes blocks en={en.count(MISTAKES['en'])} he={he.count(MISTAKES['he'])}")
    for lang, txt in (("en", en), ("he", he)):
        for q, sol in question_blocks(txt):
            if want and q not in want:
                continue
            for f in inline_multirel(sol):
                fails.append(f"multirel [{lang} Q{q}]: ${f}$")
            if lang == "he":
                for ch_, line in rtl_bad(sol):
                    fails.append(f"rtl [he Q{q}]: {ch_!r} in: {line}")
                for f in heb_mixed(sol):
                    fails.append(f"hebmath [he Q{q}]: ${f}$")
            if "--structure" in sys.argv:
                for pr in structure(sol, lang):
                    fails.append(f"structure [{lang} Q{q}]: {pr}")
    for f in fails:
        print("FAIL", f)
    print("STYLE CHECK", "OK" if not fails else f"FAILED ({len(fails)})", f"— {len(a)} math spans")
    return 0 if not fails else 1


if __name__ == "__main__":
    sys.exit(main())
