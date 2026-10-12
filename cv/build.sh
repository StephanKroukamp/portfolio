#!/usr/bin/env bash
# Renders cv.html to ../Stephan_Kroukamp_CV.pdf (A4) with headless Chrome or Edge.
set -euo pipefail
cd "$(dirname "$0")"

for b in \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
  "$(command -v google-chrome || true)" \
  "$(command -v chromium || true)"; do
  [ -n "$b" ] && [ -x "$b" ] && BROWSER="$b" && break
done
: "${BROWSER:?No Chrome/Edge/Chromium found}"

SRC="$(pwd)/cv.html"
OUT="$(pwd)/../Stephan_Kroukamp_CV.pdf"
if command -v cygpath >/dev/null; then SRC="$(cygpath -m "$SRC")"; OUT="$(cygpath -w "$OUT")"; fi

"$BROWSER" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf-no-header \
  --print-to-pdf="$OUT" "file:///$SRC"
echo "Wrote $OUT"
