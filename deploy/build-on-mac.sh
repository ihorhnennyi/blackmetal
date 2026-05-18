#!/usr/bin/env bash
# Збірка на Mac + викладка dist на сервер (npm на сервері не потрібен).
# Перед першим запуском: export REMOTE="isi_gov@ВАШ_ХОСТ"
set -euo pipefail

REMOTE="${REMOTE:-isi_gov@mail}"
REMOTE_DIR="${REMOTE_DIR:-/www/wwwroot/isi.gov.ua}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> npm ci && npm run build"
npm ci
npm run build

echo "==> rsync dist/ -> $REMOTE:$REMOTE_DIR/dist/"
rsync -avz --delete \
	--rsync-path="mkdir -p $REMOTE_DIR/dist && rsync" \
	"$ROOT/dist/" "$REMOTE:$REMOTE_DIR/dist/"

echo "==> rsync public/news/ (картинки новин)"
rsync -avz \
	"$ROOT/public/news/" "$REMOTE:$REMOTE_DIR/public/news/"

echo "==> OK. Перевірте: https://isi.gov.ua/version.json"
