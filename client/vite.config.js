import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url' // Import the necessary Node.js modules

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use the modern URL syntax to resolve the path
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
