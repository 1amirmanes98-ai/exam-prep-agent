#!/usr/bin/env bash
# Fetch the exact front-end libraries build_site.py inlines: KaTeX 0.16.11 (js/css +
# auto-render), marked 12, and the 13 woff2 fonts the KaTeX CSS references. Idempotent.
#
# Usage: bash replication/fetch_libs.sh [dest_dir]     (default: /tmp/site-libs)
set -euo pipefail
L="${1:-/tmp/site-libs}"
mkdir -p "$L/fonts"

for f in katex.min.js katex.min.css contrib/auto-render.min.js; do
  curl -sL "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/$f" -o "$L/$(basename "$f")"
done
curl -sL "https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js" -o "$L/marked.min.js"

FONTS="KaTeX_Main-Regular KaTeX_Main-Bold KaTeX_Main-Italic KaTeX_Main-BoldItalic \
KaTeX_Math-Italic KaTeX_Math-BoldItalic KaTeX_Size1-Regular KaTeX_Size2-Regular \
KaTeX_Size3-Regular KaTeX_Size4-Regular KaTeX_AMS-Regular KaTeX_Caligraphic-Regular \
KaTeX_Typewriter-Regular"
for f in $FONTS; do
  curl -sL "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/fonts/$f.woff2" -o "$L/fonts/$f.woff2"
done

# sanity: the quirks-mode guard the build patches must exist, no zero-byte downloads
grep -q 'CSS1Compat' "$L/katex.min.js" || { echo "ERROR: KaTeX guard missing — version drift?"; exit 1; }
if find "$L" -type f -size 0 | grep -q .; then echo "ERROR: zero-byte download(s):"; find "$L" -type f -size 0; exit 1; fi
echo "libs OK in $L ($(ls "$L"/*.js "$L"/*.css | wc -l) core files, $(ls "$L/fonts" | wc -l) fonts)"
