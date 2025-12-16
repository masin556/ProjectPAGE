import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ProjectPAGE/', // TODO: Update this to match your repository name (e.g., /my-repo/). If using a custom domain or user page (username.github.io), set this to '/'.
})
