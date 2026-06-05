# 玛蒂尔达英语学习游戏 - 软件需求规格说明书 (SRS)

**版本**: v1.0  
**日期**: 2026-06-04  
**编写**: 产品规划部  
**目标读者**: 开发团队  
**状态**: 待评审

---

## 1. 引言

### 1.1 目的
本文档详细描述玛蒂尔达英语学习游戏的软件需求，为开发团队提供技术实现指导。

### 1.2 范围
本文档涵盖随机题库系统、题库生成工具、SPA 架构重构三个核心模块。

### 1.3 定义与缩写
| 缩写 | 全称 | 说明 |
|------|------|------|
| SPA | Single Page Application | 单页应用 |
| PRD | Product Requirements Document | 产品需求文档 |
| SRS | Software Requirements Specification | 软件需求规格说明书 |
| CSV | Comma-Separated Values | 逗号分隔值文件 |
| CLI | Command Line Interface | 命令行界面 |

---

## 2. 系统概述

### 2.1 系统架构

```
┌─────────────────────────────────────────────────────────┐
│                    用户界面层 (UI)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  练习页面   │  │  设置页面   │  │  题库管理页面   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    业务逻辑层 (Logic)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ 随机抽题引擎 │  │ 答题评分器  │  │ 进度追踪器      │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    数据层 (Data)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ 题库 JSON   │  │ localStorage│  │  IndexedDB      │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 2.2 技术约束
- **无服务器端**: 禁止任何后端 API 调用
- **静态部署**: 必须支持 GitHub Pages 纯静态托管
- **浏览器存储**: 所有用户数据必须存储在客户端

---

## 3. 详细功能需求

### 3.1 模块一：随机题库系统

#### 3.1.1 功能描述
实现从题库中随机抽取题目的功能，支持按条件筛选和防重复机制。

#### 3.1.2 输入/输出

**输入参数**:
```typescript
interface QuestionFilter {
  difficulty?: ('easy' | 'medium' | 'hard')[];
  tags?: string[];
  excludeIds?: string[];  // 已抽取的题目ID
  limit: number;          // 抽取数量
}
```

**输出结果**:
```typescript
interface QuestionSet {
  questions: Question[];
  totalAvailable: number;
  metadata: {
    difficultyDistribution: Record<string, number>;
    tagDistribution: Record<string, number>;
  };
}
```

#### 3.1.3 处理逻辑

**随机抽题算法**:
```
算法: RandomQuestionPicker
输入: QuestionBank, QuestionFilter
输出: Question[]

1. 根据 filter 条件过滤题库
2. 如果 excludeIds 存在，从候选集中排除
3. 如果候选集数量 < limit，返回全部候选
4. 使用 Fisher-Yates 洗牌算法打乱顺序
5. 返回前 limit 个题目

Fisher-Yates 洗牌:
for i from n-1 down to 1:
    j = random integer in [0, i]
    swap array[i] with array[j]
```

#### 3.1.4 性能要求
- 题库加载: ≤ 100ms (1000 题)
- 抽题响应: ≤ 10ms
- 内存占用: ≤ 5MB (题库 + 状态)

---

### 3.2 模块二：题库生成工具

#### 3.2.1 功能描述
提供命令行工具用于题库文件的生成、验证和转换。

#### 3.2.2 命令行接口

```bash
# 验证题库
matilda-tool validate --input questions.csv

# 生成题库 JSON
matilda-tool build --input questions.csv --output dist/questions.json

# 合并多个题库
matilda-tool merge --inputs a.csv b.csv c.csv --output merged.json

# 统计题库信息
matilda-tool stats --input questions.json
```

#### 3.2.3 题库验证规则

| 字段 | 必填 | 类型 | 验证规则 |
|------|------|------|----------|
| id | 是 | string | 唯一，格式 qXXX 或自定义 |
| question | 是 | string | 非空，长度 ≤ 500 |
| options | 是 | string[] | 至少 2 个选项 |
| correctAnswer | 是 | string/string[] | 必须在 options 中 |
| difficulty | 是 | enum | easy/medium/hard |
| tags | 否 | string[] | 标签列表 |

#### 3.2.4 错误处理

| 错误代码 | 描述 | 处理建议 |
|----------|------|----------|
| E001 | 重复 ID | 报错并列出重复项 |
| E002 | 选项数量不足 | 报错，要求至少 2 个选项 |
| E003 | 正确答案不在选项中 | 报错并指出具体题目 |
| E004 | 必填字段缺失 | 报错并列出缺失字段 |

---

### 3.3 模块三：SPA 架构与数据存储

#### 3.3.1 路由设计

| 路由 | 页面 | 功能 |
|------|------|------|
| / | Home | 首页，展示开始练习入口 |
| /practice | Practice | 练习页面，随机抽题答题 |
| /practice/:id | PracticeSession | 指定练习会话 |
| /settings | Settings | 设置页面，难度/标签选择 |
| /stats | Statistics | 学习统计页面 |
| /about | About | 关于页面 |

#### 3.3.2 数据存储方案

**localStorage Schema**:
```typescript
// 键: matilda_user_settings
interface UserSettings {
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionsPerSession: number;
  theme: 'light' | 'dark';
  version: string;
}

// 键: matilda_current_session
interface CurrentSession {
  sessionId: string;
  questionIds: string[];
  currentIndex: number;
  answers: Record<string, string>;
  startTime: string;
}
```

**IndexedDB Schema**:
```typescript
// 数据库: MatildaDB
// 版本: 1

// Store: practice_history
interface PracticeRecord {
  id: string;           // 自增 ID
  sessionId: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  duration: number;     // 秒
  questionIds: string[];
}

// Store: question_stats
interface QuestionStats {
  questionId: string;
  timesSeen: number;
  timesCorrect: number;
  lastSeen: string;
}
```

#### 3.3.3 GitHub Pages 部署配置

**vite.config.ts**:
```typescript
export default {
  base: '/Matilda-learning-english-gam/',  // 仓库名
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
}
```

**404.html** (SPA fallback):
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Matilda</title>
  <script>
    // 将路径重定向到 index.html
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='/'">
</head>
<body>
</body>
</html>
```

---

## 4. 接口规范

### 4.1 内部模块接口

#### QuestionBankService
```typescript
class QuestionBankService {
  // 加载题库
  async loadBank(url: string): Promise<QuestionBank>;
  
  // 随机抽题
  pickQuestions(filter: QuestionFilter): Question[];
  
  // 获取题目详情
  getQuestionById(id: string): Question | null;
  
  // 获取统计信息
  getBankStats(): BankStatistics;
}
```

#### StorageService
```typescript
class StorageService {
  // Settings (localStorage)
  getSettings(): UserSettings;
  saveSettings(settings: UserSettings): void;
  
  // Session (localStorage)
  getCurrentSession(): CurrentSession | null;
  saveSession(session: CurrentSession): void;
  clearSession(): void;
  
  // History (IndexedDB)
  async savePracticeRecord(record: PracticeRecord): Promise<void>;
  async getPracticeHistory(limit?: number): Promise<PracticeRecord[]>;
  async getQuestionStats(questionId: string): Promise<QuestionStats>;
}
```

---

## 5. 数据需求

### 5.1 题库数据格式

**JSON Schema**:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["version", "questions"],
  "properties": {
    "version": { "type": "string" },
    "lastUpdated": { "type": "string", "format": "date-time" },
    "questions": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "question", "options", "correctAnswer", "difficulty"],
        "properties": {
          "id": { "type": "string" },
          "question": { "type": "string", "maxLength": 500 },
          "options": {
            "type": "array",
            "minItems": 2,
            "items": { "type": "string" }
          },
          "correctAnswer": { 
            "oneOf": [
              { "type": "string" },
              { "type": "array", "items": { "type": "string" } }
            ]
          },
          "explanation": { "type": "string" },
          "difficulty": { "enum": ["easy", "medium", "hard"] },
          "tags": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
}
```

### 5.2 示例数据

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-06-04T10:00:00Z",
  "questions": [
    {
      "id": "q001",
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "correctAnswer": "Paris",
      "explanation": "Paris has been the capital of France since 987 CE.",
      "difficulty": "easy",
      "tags": ["geography", "europe"]
    },
    {
      "id": "q002",
      "question": "Choose the correct past tense of 'go':",
      "options": ["go", "went", "gone", "going"],
      "correctAnswer": "went",
      "difficulty": "medium",
      "tags": ["grammar", "verbs", "past-tense"]
    }
  ]
}
```

---

## 6. 质量属性

### 6.1 可靠性
- 题库 JSON 损坏时显示友好错误提示
- localStorage 满时自动清理旧数据
- IndexedDB 降级到 localStorage 的降级方案

### 6.2 可维护性
- 题库版本控制，支持向后兼容
- 模块化代码结构，便于测试
- 完善的错误日志记录

### 6.3 可扩展性
- 题库支持热更新（不刷新页面）
- 插件式题型扩展架构
- 多语言支持预留

---

## 7. 验收测试用例

### TC-001: 随机抽题
**前置条件**: 题库已加载，包含 50 题  
**步骤**:
1. 进入练习页面
2. 设置抽取 10 题
3. 点击开始
4. 记录题目 ID 列表
5. 重复步骤 1-4 三次  
**预期结果**: 三次抽取的题目列表不完全相同

### TC-002: 题库生成工具
**前置条件**: 准备 test.csv 文件  
**步骤**:
1. 运行 `matilda-tool validate test.csv`
2. 运行 `matilda-tool build test.csv -o test.json`  
**预期结果**: 验证通过，成功生成 JSON 文件

### TC-003: 离线使用
**前置条件**: 应用已部署到 GitHub Pages  
**步骤**:
1. 断开网络连接
2. 刷新页面
3. 进行一轮练习  
**预期结果**: 页面正常加载，练习功能可用，数据保存到本地

---

## 8. 依赖与风险

### 8.1 技术依赖
| 依赖 | 版本 | 用途 |
|------|------|------|
| Node.js | ≥ 18 | 题库工具运行环境 |
| Modern Browser | - | 客户端运行环境 |

### 8.2 风险与缓解

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| 浏览器存储限制 | 高 | 中 | 实现数据压缩和自动清理 |
| 题库过大加载慢 | 中 | 低 | 实现分块加载和缓存 |
| 客户端路由兼容性问题 | 中 | 中 | 充分测试主流浏览器 |

---

## 9. 附录

### 9.1 参考文档
- [PRD v1.0](./玛蒂尔达需求文档_PRD_v1.0.md)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### 9.2 术语表
见第 1.3 节定义与缩写。

---

**文档历史**
| 版本 | 日期 | 作者 | 变更说明 |
|------|------|------|----------|
| v1.0 | 2026-06-04 | 产品规划部 | 初始版本 |
