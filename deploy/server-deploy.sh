#!/usr/bin/env bash
# Деплой на сервері: git pull → build → перевірка новин.
# Запуск: cd /www/wwwroot/isi.gov.ua && bash deploy/server-deploy.sh
set -euo pipefail

SITE_DIR="${SITE_DIR:-/www/wwwroot/isi.gov.ua}"
BRANCH="${BRANCH:-main}"
ME="$(whoami)"

cd "$SITE_DIR" || {
	echo "Немає каталогу: $SITE_DIR"
	exit 1
}

fix_permissions() {
	if command -v sudo >/dev/null 2>&1; then
		echo "==> Права: chown -R $ME:$ME $SITE_DIR"
		sudo chown -R "$ME:$ME" "$SITE_DIR"
		return 0
	fi
	return 1
}

need_fix=false
[ -d .git ] && [ ! -w .git ] && need_fix=true
[ -d node_modules ] && [ ! -w node_modules ] 2>/dev/null && need_fix=true
[ ! -w . ] && need_fix=true

if $need_fix; then
	echo "==> Немає прав на запис"
	if ! fix_permissions; then
		echo "Один раз: sudo bash deploy/fix-permissions.sh"
		exit 1
	fi
fi

echo "==> git pull origin $BRANCH"
git pull origin "$BRANCH"

echo "==> npm ci"
rm -rf node_modules
npm ci

echo "==> npm run build"
npm run build

for f in dist/version.json dist/news-data.ua.json dist/index.html; do
	if [ ! -f "$f" ]; then
		echo "ПОМИЛКА: немає $f"
		exit 1
	fi
done

if ! grep -q '"id": 27' dist/news-data.ua.json; then
	echo "ПОПЕРЕДЖЕННЯ: у news-data.ua.json немає новини id 27 — перевірте git pull"
fi

echo ""
echo "==> Деплой OK"
echo "    $(cat dist/version.json)"
echo ""
echo "Nginx document root МАЄ бути: $SITE_DIR/dist"
echo ""
echo "Якщо /news/27/ після F5 дає 403 — додайте в nginx правила з:"
echo "  deploy/nginx-site.conf"
echo "(конфлікт URL /news/27/ і папки dist/news/27/ на диску)"
echo ""
echo "Перевірка:"
echo "  curl -sI https://isi.gov.ua/news/27/ | head -3   # має бути 200, не 403"
echo "  curl -sI https://isi.gov.ua/news/27/27-1.png | head -3"
