#!/usr/bin/env bash
# Один раз (або після sudo npm install): повертає власника каталогу сайту поточному користувачу.
set -euo pipefail

SITE_DIR="${1:-/www/wwwroot/isi.gov.ua}"
ME="$(whoami)"

if [ ! -d "$SITE_DIR" ]; then
	echo "Папки немає: $SITE_DIR"
	exit 1
fi

if ! command -v sudo >/dev/null 2>&1; then
	echo "Потрібен sudo. Попросіть адміна: chown -R $ME:$ME $SITE_DIR"
	exit 1
fi

echo "==> chown -R $ME:$ME $SITE_DIR"
sudo chown -R "$ME:$ME" "$SITE_DIR"

echo "==> OK. Далі: cd $SITE_DIR && bash deploy/server-deploy.sh"
