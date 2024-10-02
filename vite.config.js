import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/output_table/',  // Replace 'your-repo-name' with the actual GitHub repo name
  plugins: [react()],
})