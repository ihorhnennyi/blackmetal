#!/usr/bin/env bash
# Повна перевстановка сайту з GitHub (одна команда після sudo).
# Запуск на сервері:
#   curl -sSL https://raw.githubusercontent.com/ihorhnennyi/blackmetal/main/deploy/fresh-install.sh | bash
# або після git clone:
#   sudo bash deploy/fresh-install.sh
set -euo pipefail

SITE_DIR="${SITE_DIR:-/www/wwwroot/isi.gov.ua}"
REPO="${REPO:-https://github.com/ihorhnennyi/blackmetal.git}"
BRANCH="${BRANCH:-main}"
RUN_USER="${RUN_USER:-isi_gov}"

if [ "$(id -u)" -ne 0 ]; then
	echo "Запустіть з sudo: sudo bash deploy/fresh-install.sh"
	exit 1
fi

echo "==> Зупинка: старий каталог $SITE_DIR"
rm -rf "$SITE_DIR"

echo "==> Клонування $REPO"
mkdir -p "$(dirname "$SITE_DIR")"
git clone --branch "$BRANCH" --depth 1 "$REPO" "$SITE_DIR"

echo "==> Права для $RUN_USER"
chown -R "$RUN_USER:$RUN_USER" "$SITE_DIR"

echo "==> Збірка"
sudo -u "$RUN_USER" bash -lc "cd '$SITE_DIR' && npm ci && npm run build"

echo "==> Прибрати старі папки news/ (403 на /news/27/)"
rm -rf "$SITE_DIR/dist/news" "$SITE_DIR/public/news"

echo ""
echo "=============================================="
echo " ГОТОВО"
echo " Nginx root: $SITE_DIR/dist"
echo " Перевірка:  curl -sI https://isi.gov.ua/news/27/ | head -1"
echo "=============================================="
