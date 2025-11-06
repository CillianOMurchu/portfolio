import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React vendors
          'react-vendor': ['react', 'react-dom'],
          
          // Heavy animation library
          'framer-motion': ['framer-motion'],
          
          // Supabase vendor chunk
          'supabase-vendor': ['@supabase/supabase-js', '@supabase/auth-ui-react', '@supabase/auth-ui-shared'],
          
          // 3D and graphics libraries (when added)
          'graphics-vendor': ['three', '@react-three/fiber'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@supabase/auth-ui-react'] // Don't pre-bundle heavy auth component
  }
})
