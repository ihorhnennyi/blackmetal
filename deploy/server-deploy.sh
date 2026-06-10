#!/usr/bin/env bash
# Оновлення сайту: git pull + build + перевірка PDF/статики.
# cd /www/wwwroot/isi.gov.ua && bash deploy/server-deploy.sh
set -euo pipefail

SITE_DIR="${SITE_DIR:-/www/wwwroot/isi.gov.ua}"
BRANCH="${BRANCH:-main}"
ME="$(whoami)"

cd "$SITE_DIR" || exit 1

needs_sudo_chown() {
	local path="$1"
	[ -e "$path" ] && [ ! -w "$path" ]
}

fix_ownership() {
	if needs_sudo_chown "$SITE_DIR" || needs_sudo_chown "$SITE_DIR/.npm-cache" || needs_sudo_chown "$SITE_DIR/node_modules"; then
		if command -v sudo >/dev/null 2>&1; then
			echo "==> sudo chown -R $ME:$ME $SITE_DIR"
			sudo chown -R "$ME:$ME" "$SITE_DIR"
		else
			echo "Немає прав на .npm-cache або node_modules."
			echo "Запустіть: sudo chown -R $ME:$ME $SITE_DIR"
			exit 1
		fi
	fi
}

fix_ownership

echo "==> git pull origin $BRANCH"
git pull --ff-only origin "$BRANCH"
echo "    commit: $(git log -1 --oneline)"

fix_ownership

echo "==> PDF permissions (public/)"
find public -type f \( -name '*.pdf' -o -name '*.PDF' \) -exec chmod 644 {} \; 2>/dev/null || true

echo "==> clean + install + build"
rm -rf node_modules dist .npm-cache
export npm_config_cache="$SITE_DIR/.npm-cache"
mkdir -p "$npm_config_cache"

fix_ownership

npm ci
npm run build

# Старі каталоги dist/news/* конфліктували з URL /news/27/
rm -rf dist/news public/news

if [ -f deploy/verify-static-assets.mjs ]; then
	echo "==> verify static assets (JSON links → dist/)"
	node deploy/verify-static-assets.mjs
else
	echo "WARN: deploy/verify-static-assets.mjs not found — git pull may be incomplete"
fi

echo "==> syllabus132:"
ls -lh dist/syllabus132/*.pdf 2>/dev/null | tail -5 || true

echo "OK: $(cat dist/version.json 2>/dev/null || echo 'built')"
echo "Nginx root: $SITE_DIR/dist"
