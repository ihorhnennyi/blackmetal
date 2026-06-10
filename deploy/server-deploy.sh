#!/usr/bin/env bash
# Оновлення сайту: git pull + build + перевірка PDF/статики.
# cd /www/wwwroot/isi.gov.ua && bash deploy/server-deploy.sh
set -euo pipefail

SITE_DIR="${SITE_DIR:-/www/wwwroot/isi.gov.ua}"
BRANCH="${BRANCH:-main}"
ME="$(whoami)"

cd "$SITE_DIR" || exit 1

if [ ! -w . ] || { [ -d .git ] && [ ! -w .git ]; }; then
	if command -v sudo >/dev/null 2>&1; then
		sudo chown -R "$ME:$ME" "$SITE_DIR"
	else
		echo "Немає прав. Запустіть: sudo chown -R $ME:$ME $SITE_DIR"
		exit 1
	fi
fi

echo "==> git pull origin $BRANCH"
git pull --ff-only origin "$BRANCH"
echo "    commit: $(git log -1 --oneline)"

echo "==> PDF permissions (public/)"
find public -type f \( -name '*.pdf' -o -name '*.PDF' \) -exec chmod 644 {} \; 2>/dev/null || true

echo "==> clean + install + build"
rm -rf node_modules dist
export npm_config_cache="$SITE_DIR/.npm-cache"
mkdir -p "$npm_config_cache"
npm ci
npm run build

# Старі каталоги dist/news/* конфліктували з URL /news/27/
rm -rf dist/news public/news

echo "==> verify static assets (JSON links → dist/)"
node deploy/verify-static-assets.mjs

echo "==> syllabus132:"
ls -lh dist/syllabus132/*.pdf 2>/dev/null | tail -5 || true

echo "OK: $(cat dist/version.json 2>/dev/null || echo 'built')"
echo "Nginx root: $SITE_DIR/dist"
