#!/usr/bin/env bash
# Restore the Hebrew Reinforcement Learning tutor's translated study index from the
# content zip kept locally (rl-he-tutor-content.zip). This course is site-only: the
# zip carries the translated index/ (course materials are not part of it).
#
# Usage: bash rl-he-exam-agent/scripts/restore_content.sh <path-to-rl-he-tutor-content.zip>
set -euo pipefail
ZIP="${1:?usage: restore_content.sh <rl-he-tutor-content.zip>}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
unzip -o -q "$ZIP" -d "$DIR"
echo "Restored into $DIR:"
echo "  Index files:  $(find "$DIR/index" \( -name '*.md' -o -name '*.json' -o -name '*.js' \) 2>/dev/null | wc -l)"
echo "  Mock exams:   $(find "$DIR/generated_exams" -name '*.md' 2>/dev/null | wc -l)"
