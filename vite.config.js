import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9090',  //this is to stop cookies origin issues in development, will have to investigate this for production
        changeOrigin: true,               
        secure: false,                    
        
      }
    }
  }
})
