import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      // You can add other configurations here
      manifest: {
        name: 'ACCF IKOLE',
        short_name: 'ACCF IKOLE CHAPTER',
        description: 'A fellowship with a difference',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.jpg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})