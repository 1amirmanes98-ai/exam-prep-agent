#!/usr/bin/env python3
"""Content-preservation gate for readability reflows.

A readability pass (promoting inline $...$ to display $$...$$, stacking chains
with aligned, boxing final results) must be PURE REFLOW: no math token may
change. This gate proves it mechanically — the manual "math spans identical to
baseline?" line in SESSION_CHECKLIST.md, automated.

Usage:
  python3 verify_content_preserved.py baseline <index_dir> <baseline.json>
      Extract the normalized per-file math signature and write it to json.
  python3 verify_content_preserved.py check <index_dir> <baseline.json> [file.md ...]
      Re-extract and compare against the baseline. With file args, check only
      those files (paths relative to index_dir, e.g. exams/a_2018.md).
      Exit 1 on any mismatch, printing the file and first divergence.

Normalization (applied to the concatenation of all math spans in file order):
strips $ signs, all whitespace, alignment markers (&, \\), aligned/gathered
environment wrappers, spacing macros (\, \; \: \! \quad \qquad), \boxed, and
curly braces. Removing braces lets a reflow wrap results in \boxed{...}
without tripping the gate; genuine syntax damage is still caught downstream by
verify_mathrender.js (KaTeX throwOnError). \left/\right and \big variants are
also stripped since sizing wrappers may legitimately change when stacking.

A file present in the baseline but missing at check time (or vice versa) is an
error — deleting a file must never pass silently.
"""
import json, os, re, sys

MATH = re.compile(r"\$\$.*?\$\$|\$[^\n$]+?\$", re.S)
STRIP = [
    (re.compile(r"\\begin\{(aligned|gathered|align\*?|cases)\}"), ""),
    (re.compile(r"\\end\{(aligned|gathered|align\*?|cases)\}"), ""),
    (re.compile(r"\\(?:boxed|left|right|[bB]ig[glr]?|quad|qquad|[,;:!])"), ""),
    (re.compile(r"\\\\"), ""),
    (re.compile(r"[&{}$\s]"), ""),
]


def signature(text: str) -> str:
    s = "".join(MATH.findall(text))
    for rx, rep in STRIP:
        s = rx.sub(rep, s)
    return s


def collect(index_dir: str) -> dict:
    sigs = {}
    for root, _dirs, files in os.walk(index_dir):
        for f in sorted(files):
            if f.endswith(".md"):
                p = os.path.join(root, f)
                rel = os.path.relpath(p, index_dir)
                sigs[rel] = signature(open(p, encoding="utf-8").read())
    return sigs


def first_divergence(a: str, b: str) -> str:
    n = min(len(a), len(b))
    for i in range(n):
        if a[i] != b[i]:
            return f"at char {i}: baseline …{a[max(0,i-25):i+25]}… vs now …{b[max(0,i-25):i+25]}…"
    return f"length {len(a)} -> {len(b)}: tail …{(a if len(a) > len(b) else b)[n:n+50]}…"


def main() -> int:
    if len(sys.argv) < 4 or sys.argv[1] not in ("baseline", "check"):
        print(__doc__)
        return 2
    mode, index_dir, path = sys.argv[1], sys.argv[2], sys.argv[3]
    if mode == "baseline":
        sigs = collect(index_dir)
        json.dump(sigs, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
        print(f"baseline written: {len(sigs)} files -> {path}")
        return 0
    base = json.load(open(path, encoding="utf-8"))
    now = collect(index_dir)
    only = set(sys.argv[4:])
    bad = 0
    keys = only if only else set(base) | set(now)
    for rel in sorted(keys):
        if rel not in base:
            print(f"ERROR: {rel}: not in baseline (new file — rebaseline if intended)"); bad += 1
        elif rel not in now:
            print(f"ERROR: {rel}: missing on disk"); bad += 1
        elif base[rel] != now[rel]:
            print(f"ERROR: {rel}: math content changed — {first_divergence(base[rel], now[rel])}"); bad += 1
    checked = len(keys)
    print(f"{checked} files checked, {bad} mismatches")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
