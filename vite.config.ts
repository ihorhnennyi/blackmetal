import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
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
  server: { proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true, secure: false } } },
  preview:{ proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true, secure: false } } }
})
