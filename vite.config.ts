import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// 检测是否构建 Electron 版本
const isElectronBuild = process.env.ELECTRON_BUILD === 'true';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Electron 构建使用相对路径（适配 file:// 协议），Web 构建使用 GitHub Pages 路径
  base: isElectronBuild ? './' : '/Matilda-learning-english-game/',
  build: {
    // Web 构建输出目录
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  // 解决 Electron 环境下的 __dirname 问题
  define: {
    '__dirname': 'import.meta.dirname',
  },
})
