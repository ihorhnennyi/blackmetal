#!/usr/bin/env bash
# Оновлення сайту: git pull + build + перевірка PDF/статики.
# cd /www/wwwroot/isi.gov.ua && bash deploy/server-deploy.sh
# або: sudo bash deploy/one-shot-deploy.sh
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
			echo "Запустіть: sudo bash deploy/one-shot-deploy.sh"
			exit 1
		fi
	fi
}

fix_ownership

if [ -f "$SITE_DIR/.git/index.lock" ] && [ ! -w "$SITE_DIR/.git/index.lock" ]; then
	if command -v sudo >/dev/null 2>&1; then
		echo "==> remove stale .git/index.lock (wrong owner)"
		sudo rm -f "$SITE_DIR/.git/index.lock"
	fi
fi

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

if ! npm ci; then
	echo ""
	echo "ERROR: npm ci failed (часто через права root на .npm-cache)."
	echo "Виправлення: cd $SITE_DIR && sudo bash deploy/one-shot-deploy.sh"
	exit 1
fi

if ! npm run build; then
	echo ""
	echo "ERROR: npm run build failed"
	exit 1
fi

rm -rf dist/news public/news

if [ -f deploy/verify-static-assets.mjs ]; then
	echo "==> verify static assets"
	node deploy/verify-static-assets.mjs
fi

echo "==> key files in dist:"
for f in \
	"dist/version.json" \
	"dist/syllabus132/З2Іноземна-мова.pdf" \
	"dist/surveys/Рейтинг викладачів.pdf"
do
	if [ -f "$f" ]; then
		ls -lh "$f"
	else
		echo "MISSING: $f"
	fi
done

echo ""
echo "OK: buildId=$(node -e "console.log(JSON.parse(require('fs').readFileSync('dist/version.json')).buildId)" 2>/dev/null || echo '?')"
echo "Nginx document root must be: $SITE_DIR/dist"
