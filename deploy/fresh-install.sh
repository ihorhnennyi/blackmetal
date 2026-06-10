#!/usr/bin/env bash
# Повна перевстановка з GitHub.
# ВАЖЛИВО: спочатку cd ~  (не стояти в папці сайту!)
#   cd ~
#   sudo bash /www/wwwroot/isi.gov.ua/deploy/fresh-install.sh
# або після clone вручну — див. команди в README нижче в echo.
set -euo pipefail

SITE_DIR="${SITE_DIR:-/www/wwwroot/isi.gov.ua}"
REPO="${REPO:-https://github.com/ihorhnennyi/blackmetal.git}"
BRANCH="${BRANCH:-main}"
RUN_USER="${RUN_USER:-isi_gov}"

if [ "$(id -u)" -ne 0 ]; then
	echo "Запустіть: cd ~ && sudo bash deploy/fresh-install.sh"
	exit 1
fi

cd /

echo "==> Видалення $SITE_DIR"
rm -rf "$SITE_DIR"

echo "==> Клонування $REPO"
mkdir -p "$(dirname "$SITE_DIR")"
git clone --branch "$BRANCH" --depth 1 "$REPO" "$SITE_DIR"

echo "==> Права $RUN_USER"
chown -R "$RUN_USER:$RUN_USER" "$SITE_DIR"

echo "==> npm ci && build (локальний кеш, без root)"
if [ -d /www/server/nodejs/cache ]; then
	chown -R "$RUN_USER:$RUN_USER" /www/server/nodejs/cache 2>/dev/null || true
fi
sudo -u "$RUN_USER" bash -lc "
	cd '$SITE_DIR'
	export npm_config_cache='$SITE_DIR/.npm-cache'
	mkdir -p \"\$npm_config_cache\"
	npm ci
	npm run build
	rm -rf dist/news public/news 2>/dev/null || true
"

echo ""
echo "=============================================="
echo " ГОТОВО"
echo " Nginx document root: $SITE_DIR/dist"
echo "=============================================="
