import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Ajustar se necessário
  build: {
    outDir: 'dist' // Diretório de saída do build
  }
})