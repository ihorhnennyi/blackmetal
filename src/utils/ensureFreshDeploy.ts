const DEPLOY_ID_KEY = 'isi-deploy-id'

/** Після деплою: порівнюємо /version.json (no-store) і один раз перезавантажуємо, якщо збірка змінилась. */
export async function ensureFreshDeploy(): Promise<void> {
	if (!import.meta.env.PROD) return

	try {
		const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')
		const res = await fetch(`${base}version.json`, { cache: 'no-store' })
		if (!res.ok) return

		const { buildId } = (await res.json()) as { buildId?: string }
		if (!buildId) return

		const prev = localStorage.getItem(DEPLOY_ID_KEY)
		if (prev === buildId) return

		localStorage.setItem(DEPLOY_ID_KEY, buildId)

		if (prev == null) return

		if ('caches' in window) {
			const names = await caches.keys()
			await Promise.all(names.map(name => caches.delete(name)))
		}

		const reloadFlag = `isi-reloaded-${buildId}`
		if (!sessionStorage.getItem(reloadFlag)) {
			sessionStorage.setItem(reloadFlag, '1')
			const url = new URL(window.location.href)
			url.searchParams.set('_deploy', buildId)
			window.location.replace(url.toString())
			await new Promise<void>(() => {})
		}
	} catch {
		/* офлайн / немає version.json — не блокуємо запуск */
	}
}
