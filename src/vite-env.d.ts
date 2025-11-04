/// <reference types="vite/client" />

interface ImportMeta {
	readonly glob: <T = unknown>(
		pattern: string
	) => Record<string, () => Promise<T>>
}
