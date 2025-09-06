import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    fs: {
      strict: false,
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Add fallback for SPA routing
  preview: {
    // Vite preview does not support historyApiFallback, so use middleware
    // If deploying, configure your host (e.g. Netlify, Vercel) for SPA fallback
  },
})
