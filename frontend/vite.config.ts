import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
    allowedHosts: ['.ngrok-free.dev'], // allow any *.ngrok-free.dev tunnel
    proxy: {
      '/api': {
        target: 'http://repsy_api:8000',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react", // enables the '?react' suffix in SVG imports
      exclude: "", // SVGs to skip from processing (none)

      svgrOptions: {
        // optional settings, e.g. plugins
      },
    })
  ],
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})