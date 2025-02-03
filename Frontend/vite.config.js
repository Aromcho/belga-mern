import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    exclude: ['express', 'path', 'url', 'http', 'buffer']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://belga.com.ar',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
