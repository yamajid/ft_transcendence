import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //   '/avatars': {
  //     target: 'http://167.99.138.209:80/avatars',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/avatars/, ''),
  //   },
  // },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
