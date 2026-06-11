# 玛蒂尔达英语学习游戏 (Matilda) - Copilot 自定义指令

## 项目概述

- **项目名称**: 玛蒂尔达英语学习游戏 (Matilda Adventure)
- **类型**: 教育类网页游戏（React + TypeScript + Vite）
- **在线地址**: https://kk580kk.github.io/Matilda-learning-english-game/
- **语言**: 中文界面，英语学习内容

## 技术栈

- React 18 + TypeScript
- Vite 5 (构建工具)
- Zustand (状态管理)
- React Router (路由)
- CSS Modules / 标准 CSS

## 构建与验证命令

### 本地开发
```bash
npm run dev    # 启动开发服务器 (localhost:5173)
```

### 构建
```bash
npm run build  # 构建生产版本到 dist/ 目录
```

### 代码检查
```bash
npm run lint   # 运行 ESLint
```

## GitHub Pages 部署

- **部署源**: `docs/` 目录（而非 dist/，因为 dist/ 在 .gitignore 中）
- **base 路径**: `/Matilda-learning-english-game/`
- **部署方式**: 每次 push 到 main 分支自动触发 GitHub Actions

**发布流程**:
1. 本地运行 `npm run build`
2. 复制 `dist/*` 到 `docs/`
3. 提交并推送到 main 分支

## 验证检查清单（每次提交前必做）

### 1. 编译检查
- [ ] `npm run build` 必须成功，无任何 error
- [ ] TypeScript 编译无错误

### 2. 本地预览
- [ ] 开发服务器 `npm run dev` 能正常启动
- [ ] 浏览器打开 http://localhost:5173/Matilda-learning-english-game/ 无白屏
- [ ] 页面内容正常渲染，无控制台报错

### 3. GitHub Pages 验证（PR/合并后）
- [ ] 访问 https://kk580kk.github.io/Matilda-learning-english-game/ 无白屏
- [ ] 页面正常加载，JS/CSS 资源返回 200
- [ ] 打开浏览器控制台无 Critical Error
- [ ] 核心功能可点击/交互

### 常见问题排查

**白屏问题**:
- 检查浏览器控制台是否有 JS 加载 404
- 检查 vite.config.ts 的 base 配置是否正确
- 检查 docs/index.html 路径是否与 assets 匹配

**构建失败**:
- 确保 node 版本 >= 18
- 运行 `npm install` 更新依赖

**GitHub Pages 404**:
- 确认 docs/ 目录已提交到 GitHub
- 检查 base 路径是否以 `/` 开头和结尾
