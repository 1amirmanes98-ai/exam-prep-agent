#!/usr/bin/env bash
# Sync the canonical engine (this dir) to every course's scripts/ copy, byte-identically.
# The engine is the ONLY place to edit site_template.html / build_site.py; course
# specifics live in <course>/index/SITE_CONFIG.json and <course>/index/figures.js.
# Usage: bash replication/engine/sync.sh   (from anywhere; add --check to verify only)
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
CHECK="${1:-}"
rc=0
for course in "$ROOT"/*-exam-agent; do
  [ -d "$course/scripts" ] || continue
  for f in site_template.html build_site.py; do
    if [ "$CHECK" = "--check" ]; then
      diff -q "$HERE/$f" "$course/scripts/$f" >/dev/null || { echo "DRIFT: $course/scripts/$f"; rc=1; }
    else
      cp "$HERE/$f" "$course/scripts/$f"
    fi
  done
done
if [ "$CHECK" = "--check" ]; then
  [ $rc = 0 ] && echo "all course copies identical to engine ✓"; exit $rc
fi
bash "$0" --check
