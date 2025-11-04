declare module 'pdfjs-dist/legacy/build/pdf' {
	export interface PDFDocumentProxy {
		numPages: number
		getPage(pageNumber: number): Promise<PDFPageProxy>
	}

	export interface PDFPageProxy {
		getViewport(params: { scale: number; rotation: number }): PDFPageViewport
		render(params: { canvasContext: CanvasRenderingContext2D; viewport: PDFPageViewport }): void
	}

	export interface PDFPageViewport {
		width: number
		height: number
	}

	export interface GlobalWorkerOptions {
		workerSrc: string
	}

	export const GlobalWorkerOptions: GlobalWorkerOptions

	export function getDocument(source: string): {
		promise: Promise<PDFDocumentProxy>
	}
}
