import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacidade: resolve(__dirname, 'privacidade.html'),
        suporte: resolve(__dirname, 'suporte.html'),
        termos: resolve(__dirname, 'termos.html'),
      }
    }
  }
})
