import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/Archub/',
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'ArchHub Workspace',
        short_name: 'ArchHub',
        description: '건축 전용 맞춤형 브라우저 플랫폼',
        start_url: '/Archub/',
        scope: '/Archub/',
        theme_color: '#1B263B',
        background_color: '#F4F5F7',
        display: 'standalone',
        icons: [
          {
            src: '/Archub/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
})
