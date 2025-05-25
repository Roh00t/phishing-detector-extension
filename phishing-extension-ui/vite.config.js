import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from 'vite-plugin-crx'
import manifest from './manifest.json'

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: 'index.html'
      }
    }
  }
})