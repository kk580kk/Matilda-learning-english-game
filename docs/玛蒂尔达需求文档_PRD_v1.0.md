# 玛蒂尔达英语学习游戏 - 产品需求文档 (PRD)

**版本**: v1.0  
**日期**: 2026-06-04  
**产品负责人**: 产品规划部  
**状态**: 待评审

---

## 1. 产品概述

### 1.1 产品背景
玛蒂尔达是一款面向英语学习者的互动游戏，通过趣味化的方式帮助用户记忆和掌握英语单词。

### 1.2 本次迭代目标
- 实现随机题库机制，提升学习趣味性和重复可玩性
- 提供题库生成工具，支持内容自定义
- 重构为纯客户端 SPA 架构，支持 GitHub Pages 部署

---

## 2. 用户故事

### US-001: 随机题库体验
**作为** 英语学习者  
**我希望** 每次练习时题目是随机抽取的  
**这样** 我可以多次练习而不感到重复枯燥

**验收标准**:
- [ ] 每次开始练习时从题库中随机抽取 N 道题
- [ ] 同一轮练习中不重复出现相同题目
- [ ] 题库耗尽后可选择重新开始或结束

### US-002: 自定义题库
**作为** 内容创作者/教师  
**我希望** 能够生成和管理自己的题库  
**这样** 我可以为特定学习目标定制内容

**验收标准**:
- [ ] 提供题库生成工具（脚本/Web 界面）
- [ ] 支持导入/导出题库文件
- [ ] 题库格式标准化，便于版本控制

### US-003: 离线使用
**作为** 用户  
**我希望** 应用无需联网即可使用  
**这样** 我可以在任何环境下学习

**验收标准**:
- [ ] 纯客户端运行，无后端依赖
- [ ] 数据存储在浏览器本地（localStorage/IndexedDB）
- [ ] 支持 GitHub Pages 静态部署

---

## 3. 功能需求

### 3.1 随机题库系统 (FR-001)

#### 3.1.1 题库数据结构
```typescript
interface Question {
  id: string;           // 唯一标识
  question: string;     // 题目内容
  options: string[];      // 选项（单选/多选）
  correctAnswer: string | string[];  // 正确答案
  explanation?: string; // 解析说明
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];         // 标签分类
}

interface QuestionBank {
  version: string;
  lastUpdated: string;
  questions: Question[];
  metadata: {
    totalCount: number;
    categories: string[];
    difficultyDistribution: Record<string, number>;
  };
}
```

#### 3.1.2 随机抽题算法
- 支持按难度、标签筛选后随机抽取
- 实现 Fisher-Yates 洗牌算法确保随机性
- 支持配置每轮题目数量（默认 10 题）

#### 3.1.3 防重复机制
- 使用 Set 记录已抽取题目 ID
- 本地存储用户练习历史，避免短期内重复

### 3.2 题库生成工具 (FR-002)

#### 3.2.1 工具形态
- **首选**: Node.js CLI 工具（便于自动化和 CI/CD）
- **备选**: 简单的 Web 界面（在开发模式下可用）

#### 3.2.2 功能清单
| 功能 | 优先级 | 说明 |
|------|--------|------|
| 从 CSV/Excel 导入 | P0 | 支持标准格式导入 |
| 题库验证 | P0 | 检查必填字段、选项完整性 |
| 导出 JSON | P0 | 生成应用可用的题库文件 |
| 题库合并 | P1 | 支持多来源题库合并 |
| 统计分析 | P1 | 难度分布、标签统计 |

#### 3.2.3 输入格式示例
```csv
id,question,options,correctAnswer,difficulty,tags
q001,What is the capital of France?,Paris|London|Berlin|Madrid,Paris,easy,geography
eq002,Choose the correct past tense,go|went|gone|going,went,medium,grammar
```

### 3.3 Single Page Application 架构 (FR-003)

#### 3.3.1 技术栈建议
- **框架**: React / Vue 3 / Svelte（团队熟悉度优先）
- **路由**: 客户端路由（react-router/vue-router）
- **状态管理**: 本地状态 + localStorage/IndexedDB
- **构建**: Vite / Webpack（输出静态文件）

#### 3.3.2 数据存储策略
| 数据类型 | 存储方式 | 说明 |
|----------|----------|------|
| 题库数据 | 静态 JSON 文件 | 构建时打包，版本控制 |
| 用户进度 | localStorage | 练习进度、得分记录 |
| 学习历史 | IndexedDB | 大量历史记录，支持查询 |
| 用户设置 | localStorage | 偏好设置 |

#### 3.3.3 部署方案
- **目标**: GitHub Pages
- **要求**: 
  - 所有资源使用相对路径
  - 支持客户端路由的 fallback 配置
  - 可选：GitHub Actions 自动部署

---

## 4. 非功能需求

### 4.1 性能要求
- 首屏加载时间 < 2s（3G 网络）
- 题库 JSON 文件支持懒加载/分块
- 动画流畅度 60fps

### 4.2 兼容性
- 浏览器: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- 移动端: iOS Safari, Chrome Android
- 响应式: 支持手机/平板/桌面

### 4.3 可访问性
- 支持键盘导航
- 符合 WCAG 2.1 AA 标准
- 支持屏幕阅读器

---

## 5. 验收标准汇总

| 需求 ID | 验收项 | 优先级 |
|---------|--------|--------|
| FR-001-1 | 随机抽题功能正常 | P0 |
| FR-001-2 | 防重复机制有效 | P0 |
| FR-002-1 | 题库生成工具可用 | P0 |
| FR-002-2 | CSV 导入功能正常 | P0 |
| FR-003-1 | 纯客户端运行，无后端依赖 | P0 |
| FR-003-2 | GitHub Pages 部署成功 | P0 |
| FR-003-3 | 数据持久化到本地存储 | P1 |

---

## 6. 附录

### 6.1 参考资源
- [Fisher-Yates Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
- [GitHub Pages SPA 配置](https://github.com/rafgraph/spa-github-pages)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### 6.2 待决策事项
- [ ] 确定前端框架（React/Vue/Svelte）
- [ ] 确定 UI 组件库
- [ ] 题库版权和内容审核流程

---

**文档历史**
| 版本 | 日期 | 作者 | 变更说明 |
|------|------|------|----------|
| v1.0 | 2026-06-04 | 产品规划部 | 初始版本 |
