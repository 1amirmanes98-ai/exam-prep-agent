#!/usr/bin/env bash
# Run the headless verification suite against a built study site.
#
# Usage: run_all.sh <site.html> [--rtl] [--figs] [--examfigs] [--memo] [--hw] [--shots <dir>]
#   --rtl       course is RTL (Hebrew): run verify_dir (base-direction checks)
#   --figs      course registers concept figures: run verify_allfigs
#   --examfigs  course has per-question exam figures (FIG_EXAM): run verify_examfigs
#   --memo      course ships a cheat sheet (Memorize tab): run verify_memo
#   --hw        course has homework sets (exams/hw_NN.md): run verify_hw
#   --shots DIR where screenshots go (default: mktemp -d)
#
# Always runs: verify_site.mjs (generic smoke), verify_stmt, verify_mathrender
# (every math span parses in KaTeX), verify_callouts*, verify_mistakes, verify_search.
# (*callouts asserts document dir=rtl; it is skipped automatically for LTR courses
# unless --rtl is set.)
#
# Requires: `npm i playwright-core` somewhere NODE_PATH can see, and a Chromium
# at /opt/pw-browsers/chromium-*/ (or set CHROME_BIN).
set -u
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE="${1:?usage: run_all.sh <site.html> [--rtl] [--figs] [--examfigs] [--memo]}"
SITE="$(cd "$(dirname "$SITE")" && pwd)/$(basename "$SITE")"
shift
RTL=0; FIGS=0; EXAMFIGS=0; MEMO=0; HW=0; SHOTS=""
while [ $# -gt 0 ]; do case "$1" in
  --rtl) RTL=1;; --figs) FIGS=1;; --examfigs) EXAMFIGS=1;; --memo) MEMO=1;; --hw) HW=1;;
  --shots) SHOTS="$2"; shift;; *) echo "unknown flag $1"; exit 2;; esac; shift; done
[ -n "$SHOTS" ] || SHOTS="$(mktemp -d)"

PASS=0; FAIL=0; FAILED=""
run() { echo "=== $1 ==="; if "${@:2}"; then PASS=$((PASS+1)); else FAIL=$((FAIL+1)); FAILED="$FAILED $1"; fi; }

[ -f "$HERE/../verify_site.mjs" ] && run verify_site node "$HERE/../verify_site.mjs" "$SITE"
run verify_stmt      node "$HERE/verify_stmt.js" "$SITE" "$SHOTS"
run verify_mathrender node "$HERE/verify_mathrender.js" "$SITE"
[ "$RTL" = 1 ] && run verify_dir      node "$HERE/verify_dir.js" "$SITE" "$SHOTS"
[ "$RTL" = 1 ] && run verify_callouts node "$HERE/verify_callouts.js" "$SITE" "$SHOTS"
run verify_mistakes  node "$HERE/verify_mistakes.js" "$SITE" "$SHOTS"
run verify_search    node "$HERE/verify_search.js" "$SITE" "$SHOTS"
[ "$FIGS" = 1 ]     && run verify_allfigs  node "$HERE/verify_allfigs.js" "$SITE" "$SHOTS"
[ "$EXAMFIGS" = 1 ] && run verify_examfigs node "$HERE/verify_examfigs.js" "$SITE" "$SHOTS"
[ "$MEMO" = 1 ]     && run verify_memo     node "$HERE/verify_memo.js" "$SITE" "$SHOTS"
[ "$HW" = 1 ]       && run verify_hw       node "$HERE/verify_hw.js" "$SITE" "$SHOTS"

echo ""
echo "==================== $PASS passed, $FAIL failed${FAILED:+ (${FAILED# })} — shots: $SHOTS"
[ "$FAIL" = 0 ]
