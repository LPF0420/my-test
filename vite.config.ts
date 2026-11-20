import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages 项目站部署在 /<repo>/ 子路径；本地开发与 Vercel 仍用根路径。
// 仓库名从 Actions 自带的 GITHUB_REPOSITORY 推导，改名无需回来改这里。
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isProjectSite = Boolean(repoName) && !repoName?.endsWith('.github.io')
const base = process.env.GITHUB_PAGES === 'true' && isProjectSite ? `/${repoName}/` : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
