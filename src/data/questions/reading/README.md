# 阅读理解题数据结构

## 文档信息
- **版本**: v1.0
- **日期**: 2026-06-13
- **规范**: PRD v1.0 / SRS v1.0

---

## 核心原则

### 原文引用规范 [重要]

**所有阅读理解题必须使用《Matilda》原著原文原句，不允许自行发挥。**

#### 必须遵守的规则：

1. **直接引用原文**
   - 阅读短文必须是原著中的连续段落
   - 禁止对原文进行任何改写、扩写或缩写
   - 禁止自行创作与原著类似的文本

2. **标注来源**
   - 每篇阅读短文必须标注章节来源
   - 格式：`选自 Chapter X: [章节标题]`
   - 可选：标注具体行号位置

3. **保持完整性**
   - 段落截取必须在句子边界处
   - 不能截断句子
   - 保持情节的连贯性

---

## 文件结构

```
src/data/questions/reading/
├── index.ts          # 索引文件，汇总所有章节
├── chapter1.ts       # Chapter 1: The Reader of Books
├── chapter2.ts       # Chapter 2: Mr Wormwood, the Great Car Dealer
├── chapter3.ts       # Chapter 3: The Hat and the Superglue
├── chapter4.ts       # [待添加]
├── ...
└── chapter21.ts      # [待添加]
```

---

## 数据结构

### 阅读段落定义

```typescript
// 原文段落常量
const PASSAGE_X_Y = "原著原文段落...";

// 段落元数据
interface PassageMetadata {
  chapterNumber: number;      // 章节编号
  chapterTitle: string;       // 章节标题
  wordCount: number;         // 词数
  difficulty: string;        // 难度等级
  sourceLines: string;       // 来源行号
}
```

### 题目数据结构

```typescript
interface Question {
  // 基础信息
  id: string;                    // 题目ID
  type: QuestionType;            // 题目类型
  difficulty: number;            // 难度等级 (1-10)
  examTypes: ExamType[];         // 考试类型
  
  // 题目内容
  stem: string;                  // 题干（包含阅读短文）
  options: string[];              // 选项
  correctAnswer: string;         // 正确答案
  explanation: string;          // 英文解析
  chineseExplanation: string;  // 中文解析
  
  // 关联知识点
  relatedWords: string[];        // 关联词汇
  relatedGrammar: string[];     // 关联语法
  usageCount: number;           // 使用次数
}
```

---

## 题目设计规范

### 题型分布

| 题型 | 比例 | 说明 |
|-----|-----|-----|
| 细节理解 | 40% | 直接从原文找答案 |
| 推理判断 | 40% | 需要逻辑推理 |
| 主旨大意 | 20% | 理解段落中心 |

### 难度分级

| 难度 | 词数范围 | 适用关卡 | 题目数量 |
|-----|---------|---------|---------|
| Level 1 | 100-150 | L1-L2 | 每段 3-4 题 |
| Level 2 | 150-200 | L2-L3 | 每段 4-5 题 |
| Level 3 | 200-300 | L4-L6 | 每段 5-7 题 |
| Level 4 | 300-400 | L7-L10 | 每段 7-10 题 |

---

## 使用示例

### 获取所有题目

```typescript
import { getAllReadingQuestions, getReadingStats } from './data/questions/reading';

// 获取所有题目
const allQuestions = getAllReadingQuestions();

// 获取统计信息
const stats = getReadingStats();
console.log(`总题目数: ${stats.totalQuestions}`);
```

### 获取指定章节题目

```typescript
import { getQuestionsByChapter } from './data/questions/reading';

// 获取 Chapter 1 的题目
const chapter1Questions = getQuestionsByChapter(1);
```

### 获取指定难度题目

```typescript
import { getQuestionsByDifficulty } from './data/questions/reading';

// 获取难度 1-2 的题目
const easyQuestions = getQuestionsByDifficulty(1, 2);
```

---

## 章节覆盖进度

| 章节 | 标题 | 状态 | 题目数 |
|-----|-----|-----|-------|
| 1 | The Reader of Books | ✅ 完成 | 11 |
| 2 | Mr Wormwood, the Great Car Dealer | ✅ 完成 | 6 |
| 3 | The Hat and the Superglue | ✅ 完成 | 6 |
| 4 | The Ghost | 📝 待添加 | - |
| 5 | Arithmetic | 📝 待添加 | - |
| 6 | The Platinum-Blond Man | 📝 待添加 | - |
| 7 | Miss Honey | 📝 待添加 | - |
| 8 | The Trunchbull | 📝 待添加 | - |
| 9 | The Parents | 📝 待添加 | - |
| 10-21 | [其他章节] | 📝 待添加 | - |

**总计**: 23 题 / 目标 1000+ 题

---

## 原文分段示例

### Chapter 1 分段示例

**段落 1 (119 词, Level 1-2):**
```
Nearly every weekday afternoon Matilda was left alone in the house. 
Her brother (five years older than her) went to school. Her father 
went to work and her mother went out playing bingo in a town eight 
miles away. Mrs Wormwood was hooked on bingo and played it five 
afternoons a week. On the afternoon of the day when her father had 
refused to buy her a book, Matilda set out all by herself to walk 
to the public library in the village.
```

**段落 2 (156 词, Level 2-3):**
```
When she arrived, she introduced herself to the librarian, Mrs Phelps. 
She asked if she might sit awhile and read a book. Mrs Phelps, 
slightly taken aback at the arrival of such a tiny girl unaccompanied 
by a parent, nevertheless told her she was very welcome...
```

---

## 题目生成策略

### 自动分段算法

1. **按章节读取**: 从 Matilda.md 读取各章节内容
2. **按句子分割**: 使用句号、问号、感叹号分割
3. **组合段落**: 根据目标词数组合句子
4. **验证完整性**: 确保段落有完整情节

### 题目生成规则

1. **细节题**: 提取 5W1H 信息
2. **推理题**: 基于人物行为和对话
3. **主旨题**: 总结段落中心思想
4. **词汇题**: 提取重点词汇和短语

---

## 质量控制

### 原文准确性检查
- [ ] 所有段落是否来自原著？
- [ ] 是否标注了章节来源？
- [ ] 是否保持了原文完整性？
- [ ] 题目答案是否在原文中有依据？

### 题目质量检查
- [ ] 难度分级是否合理？
- [ ] 题型分布是否符合 40:40:20？
- [ ] 干扰项设计是否科学？
- [ ] 解析是否引用原文？

---

## 参考文档

- [PRD.md](../../docs/PRD.md) - 产品需求文档
- [SRS.md](../../docs/SRS.md) - 软件需求规格
- [Matilda.md](../../book/Matilda.md) - 原著原文

---

## 变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|-----|------|---------|-----|
| v1.0 | 2026-06-13 | 初稿，定义原文引用规范 | 黄劼 |
