import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base 必须与 GitHub 仓库名一致（项目页地址为 用户名.github.io/仓库名/）。
// 改了仓库名就改这里。dev 用 '/' 方便本地预览，build 用子路径以适配 GitHub Pages。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/zhangxiaoyi-portfolio/' : '/',
  plugins: [react()],
}))
