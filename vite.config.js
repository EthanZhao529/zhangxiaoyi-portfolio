import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base 必须与 GitHub 仓库名一致（项目页地址为 用户名.github.io/仓库名/）。
// 改了仓库名就改这里。
export default defineConfig({
  base: '/zhangxiaoyi-portfolio/',
  plugins: [react()],
})
