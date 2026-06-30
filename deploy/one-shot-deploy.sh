#!/usr/bin/env bash
# Надійний деплой однією командою (виправляє права + pull + build).
# На сервері:
#   cd /www/wwwroot/isi.gov.ua && sudo bash deploy/one-shot-deploy.sh
set -euo pipefail

SITE_DIR="${SITE_DIR:-/www/wwwroot/isi.gov.ua}"
RUN_USER="${RUN_USER:-isi_gov}"
BRANCH="${BRANCH:-main}"

if [ "$(id -u)" -ne 0 ]; then
	echo "Запустіть з sudo:"
	echo "  cd $SITE_DIR && sudo bash deploy/one-shot-deploy.sh"
	exit 1
fi

if [ ! -d "$SITE_DIR/.git" ]; then
	echo "Немає git-репозиторію в $SITE_DIR"
	exit 1
fi

echo "==> chown -R $RUN_USER:$RUN_USER $SITE_DIR"
chown -R "$RUN_USER:$RUN_USER" "$SITE_DIR"

# Stale lock from a previous failed git command (often created as root)
if [ -f "$SITE_DIR/.git/index.lock" ]; then
	echo "==> remove stale .git/index.lock"
	rm -f "$SITE_DIR/.git/index.lock"
fi

if [ -d /www/server/nodejs/cache ]; then
	chown -R "$RUN_USER:$RUN_USER" /www/server/nodejs/cache 2>/dev/null || true
fi

echo "==> deploy as $RUN_USER"
sudo -u "$RUN_USER" env SITE_DIR="$SITE_DIR" BRANCH="$BRANCH" bash "$SITE_DIR/deploy/server-deploy.sh"

echo ""
echo "=============================================="
echo " ДЕПЛОЙ ЗАВЕРШЕНО"
echo " Перевірте: https://isi.gov.ua/version.json"
echo " Nginx root має бути: $SITE_DIR/dist"
echo "=============================================="
