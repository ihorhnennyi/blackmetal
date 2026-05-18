const DEPLOY_ID_KEY = 'isi-deploy-id'

/** Після деплою: новий version.json → одне перезавантаження (усі браузери). */
export async function ensureFreshDeploy(): Promise<void> {
	if (!import.meta.env.PROD) return

	try {
		const origin = window.location.origin
		const base = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')
		const versionUrl = `${origin}${base}version.json?_=${Date.now()}`

		const res = await fetch(versionUrl, { cache: 'no-store' })
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
		/* version.json може бути відсутній на старому деплої */
	}
}
