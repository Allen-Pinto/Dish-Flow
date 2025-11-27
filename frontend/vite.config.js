import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true, 
    rollupOptions: {
      output: {
        format: 'es', 
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },
  server: {
    port: 5173,
    host: true, 
    open: true, 
    cors: true, 
  },
  base: '',
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})