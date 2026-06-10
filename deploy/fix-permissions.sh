#!/usr/bin/env bash
# Після sudo npm install або EACCES на .npm-cache / node_modules.
# bash deploy/fix-permissions.sh
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

echo "==> chown -R $ME:$ME $SITE_DIR (включно з .npm-cache і node_modules)"
sudo chown -R "$ME:$ME" "$SITE_DIR"

echo "==> видалення зламаного кешу npm"
rm -rf "$SITE_DIR/.npm-cache" "$SITE_DIR/node_modules"

echo "==> OK. Далі: cd $SITE_DIR && bash deploy/server-deploy.sh"
