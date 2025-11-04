import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@config': '/src/config',
      '@hooks': '/src/hooks',
      '@layouts': '/src/layouts',
      '@pages': '/src/pages',
      '@router': '/src/router',
      '@store': '/src/store',
      '@styles': '/src/styles',
      '@types': '/src/types',
      '@utils': '/src/utils'
    },
    dedupe: ['react', 'react-dom']
  },
  base: '/',
  plugins: [react()],
  server: {
    proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true, secure: false } }
  },
  preview: {
    proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true, secure: false } }
  }
})
