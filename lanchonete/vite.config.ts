import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api/webhook': {
        target: 'https://n8n.foliumdev.com.br',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          if (path.startsWith('/api/webhook/login')) return '/webhook/login'
          if (path.startsWith('/api/webhook/order')) return '/webhook-test/order'
          return path.replace(/^\/api\/webhook/, '/webhook/app')
        }
      }
    }
  }
})
