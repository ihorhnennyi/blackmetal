#!/usr/bin/env bash
# Оновлення сайту: git pull + build.
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

git pull origin "$BRANCH"
rm -rf node_modules
npm ci
npm run build

# Старі каталоги dist/news/* конфліктували з URL /news/27/
rm -rf dist/news public/news

echo "OK: $(cat dist/version.json 2>/dev/null || echo 'built')"
echo "Nginx root: $SITE_DIR/dist"
