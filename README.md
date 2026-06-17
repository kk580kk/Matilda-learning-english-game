# 玛蒂尔达冒险游戏

> **用玛蒂尔达的故事，在故事里攻克中考/四级英语。**

一款开源免费的英语学习游戏，将《玛蒂尔达》原著剧情与中考/四级备考深度融合。

**双端支持**：Web 在线体验 + Electron 桌面客户端（推荐）

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.x-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6.svg)
![Electron](https://img.shields.io/badge/electron-28.x-47848F.svg)

---

## 🚀 快速开始

### 方式一：在线体验（零门槛）

访问 **[https://kk580kk.github.io/Matilda-learning-english-game](https://kk580kk.github.io/Matilda-learning-english-game)**

无需注册，打开即玩。支持前 2 关免费体验。

### 方式二：下载桌面版（推荐 ⭐）

| 平台 | 下载 | 特点 |
|------|------|------|
| macOS | [下载 .dmg](https://github.com/kk580kk/Matilda-learning-english-game/releases) | 完全离线，数据本地存储 |
| Windows | [下载 .exe](https://github.com/kk580kk/Matilda-learning-english-game/releases) | 自动更新，AI 辅助学习 |
| Linux | [下载 .AppImage](https://github.com/kk580kk/Matilda-learning-english-game/releases) | 开箱即用，跨发行版 |

**桌面版优势**：
- ✅ 完全离线使用，无需网络
- ✅ 学习进度本地持久化（SQLite）
- ✅ 本地 Ollama AI 辅助出题/评估
- ✅ 导入自定义题库（JSON/CSV）
- ✅ 导出学习报告
- ✅ 自动更新

### 方式三：本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/kk580kk/Matilda-learning-english-game.git
cd Matilda-learning-english-game

# 2. 安装依赖
npm install

# 3. 启动开发（Web 模式）
npm run dev

# 4. 启动开发（桌面模式）
npm run electron:dev
```

**环境要求：**
- Node.js >= 18.0
- npm >= 9.0 或 pnpm >= 8.0
- 现代浏览器（Chrome 90+/Firefox 88+/Safari 14+）

---

## 📦 技术栈

### 前端（Web + 桌面共用）
| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | ^18.0 | 前端框架 |
| **TypeScript** | ^5.0 | 类型安全 |
| **Vite** | ^5.0 | 构建工具 |
| **Zustand** | ^4.5 | 状态管理 |
| **Tailwind CSS** | ^3.4 | UI 样式 |

### 桌面端（Electron）
| 技术 | 版本 | 用途 |
|------|------|------|
| **Electron** | ^28.0 | 桌面应用壳 |
| **better-sqlite3** | ^9.0 | 本地数据库 |
| **electron-updater** | ^6.0 | 自动更新 |
| **electron-builder** | ^24.0 | 安装包构建 |

---

## ✨ 核心功能

### 🎮 游戏化学习
- **10个关卡**，跟随玛蒂尔达的故事推进
- **好感度系统**：与蜜糖老师建立信任关系
- **成就系统**：30个成就等你解锁
- **每日任务**：保持学习动力

### 📚 学习内容
- **2500+词汇**：中考核心1600词 + 四级核心2500词
- **核心语法**：时态、定语从句、被动语态、非谓语动词等
- **1000+题目**：全部来自《玛蒂尔达》原著原文

### 🎯 对标考试

| 关卡 | CEFR | 对标考试 | 核心内容 |
|------|------|----------|----------|
| L1-L3 | B1 | 中考基础 | 时态综合、定语从句 |
| L4-L6 | B1+ | 中考→四级过渡 | 被动语态、名词性从句 |
| L7-L10 | B2 | 四级冲刺 | 非谓语动词、长难句分析 |

---

## 📸 功能预览

> 🖼️ 截图占位 - 建议添加：首页截图、关卡界面、学习报告页

```
[首页截图]          [关卡界面]          [学习报告]
┌─────────┐       ┌─────────┐       ┌─────────┐
│         │       │         │       │         │
│  占位   │       │  占位   │       │  占位   │
│         │       │         │       │         │
└─────────┘       └─────────┘       └─────────┘
```

---

## 📁 项目结构

```
Matilda-learning-english-game/
├── src/
│   ├── components/     # UI 组件
│   ├── stores/         # Pinia 状态管理
│   ├── data/           # 题库数据
│   ├── types/          # TypeScript 类型定义
│   ├── utils/          # 工具函数
│   └── pages/          # 页面组件
├── public/             # 静态资源
├── dist/               # 构建输出
├── docs/               # 产品文档
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔧 开发指南

### 安装依赖

```bash
npm install
```

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 输出目录：dist/
# 已配置 GitHub Actions 自动部署到 GitHub Pages
```

---

## 🤝 参与贡献

我们欢迎社区贡献！

### 贡献方式
1. **提交题目**：补充更多基于原著的阅读理解题
2. **修复 Bug**：提交 Issue 或 PR
3. **分享反馈**：使用体验建议

### 提交 PR 流程

```bash
# 1. Fork 本仓库

# 2. 克隆你的 Fork
git clone https://github.com/YOUR_USERNAME/Matilda-learning-english-game.git

# 3. 创建功能分支
git checkout -b feature/your-feature-name

# 4. 提交更改
git add .
git commit -m "feat: add your feature"

# 5. 推送到远程
git push origin feature/your-feature-name

# 6. 在 GitHub 提交 Pull Request
```

---

## 📄 开源协议

本项目采用 **MIT License** 开源。

```
MIT License

Copyright (c) 2026 玛蒂尔达冒险游戏团队

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

**使用须知：**
- ✅ 可自由使用、修改、分发
- ✅ 可商业使用
- ⚠️ 需保留版权声明和 LICENSE 文件

---

## 📚 相关文档

- [产品需求文档 (PRD v3.3)](./docs/PRD_v3.3.md) - 产品功能详细说明
- [技术规格说明书 (SRS v3.1)](./docs/SRS_v3.1.md) - 技术实现细节

---

## 💬 联系我们

- **GitHub Issues**: [提交问题](https://github.com/kk580kk/Matilda-learning-english-game/issues)
- **在线体验**: [https://kk580kk.github.io/Matilda-learning-english-game](https://kk580kk.github.io/Matilda-learning-english-game)

---

<p align="center">
  <sub>Built with ❤️ for English learners everywhere.</sub>
</p>
