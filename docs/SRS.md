# 玛蒂尔达英语学习游戏 - 软件需求规格 (SRS)

## 文档信息
- **版本**: v1.0
- **日期**: 2026-06-13
- **状态**: 初稿
- **作者**: 黄劼

---

## 1. 引言

### 1.1 目的
本文档详细定义玛蒂尔达英语学习游戏的技术实现规范，特别是阅读理解模块的原文引用标准和数据结构设计。

### 1.2 范围
- 阅读理解题数据结构设计
- 原著原文引用规范
- 题目生成算法规范
- 内容存储和读取规范

### 1.3 定义和缩写
- **原文**: 指 Roald Dahl《Matilda》原著中的英文文本
- **PRD**: Product Requirements Document (产品需求文档)
- **SRS**: Software Requirements Specification (软件需求规格)
- **CEFR**: Common European Framework of Reference for Languages

---

## 2. 总体描述

### 2.1 产品视角
本系统是一个基于 Web 的英语学习游戏，核心特色是使用《Matilda》原著原文作为学习内容。

### 2.2 核心约束
**所有阅读理解内容必须严格遵循以下约束：**
1. 必须来自 `/book/Matilda.md` 原著文件
2. 禁止任何形式的改写或创作
3. 必须保持原文的完整性和准确性
4. 必须标注内容来源章节

---

## 3. 功能需求

### 3.1 阅读理解模块 (FR-READING)

#### FR-READING-001: 原文引用规范 [关键]
**优先级**: 高
**描述**: 所有阅读短文必须直接引用原著原文

**具体要求：**
- 阅读短文必须是原著中的连续段落
- 禁止对原文进行任何修改（包括拼写、标点、格式）
- 禁止自行创作与原著类似的替代文本
- 每个阅读段落必须标注来源章节和段落位置

**验收标准：**
```typescript
// 正确的做法
const passage = `Matilda was a little late in starting school. Most children begin Primary School at five or even just before...`;
// 来源: Chapter 7, Paragraph 1

// 错误的做法 ❌
const passage = `Matilda started school late because her parents forgot to enroll her...`;  // 改写原文
```

#### FR-READING-002: 分段截取规范
**优先级**: 高
**描述**: 系统必须按照规范从原著中截取阅读段落

**分段规则：**

| 规则 ID | 规则描述 | 示例 |
|--------|---------|-----|
| SEG-001 | 按章节分段 | Chapter 1 分为 15-20 个段落 |
| SEG-002 | 按词数控制 | Level 1: 100-150 词 |
| SEG-003 | 保持情节完整 | 不在句子中间截断 |
| SEG-004 | 标注位置信息 | 记录章节、段落、行号 |

**数据结构：**
```typescript
interface ReadingPassage {
  // 内容标识
  id: string;                    // 段落唯一ID
  
  // 来源信息 [必须]
  sourceChapter: string;         // 章节名称
  sourceChapterNumber: number;   // 章节编号
  startLine: number;             // 起始行号
  endLine: number;               // 结束行号
  wordCount: number;             // 词数统计
  
  // 原文内容 [必须]
  text: string;                  // 原文段落
  
  // 元数据
  difficulty: 1-10;             // 难度等级
  suitableLevels: string[];      // 适用关卡
}
```

#### FR-READING-003: 题目生成规范
**优先级**: 高
**描述**: 基于原文自动生成阅读理解题

**题目生成规则：**

```typescript
interface QuestionGenerationRule {
  // 规则类型
  type: 'detail' | 'inference' | 'main_idea' | 'vocabulary';
  
  // 生成逻辑
  logic: {
    detail: '提取原文中的5W1H信息',
    inference: '基于人物行为和对话进行推断',
    main_idea: '总结段落中心思想',
    vocabulary: '提取重点词汇和短语'
  };
  
  // 答案必须基于原文
  answerSource: '必须在原文中有明确对应句子';
}
```

**题目数据结构：**
```typescript
interface ReadingQuestion {
  // 基础信息
  id: string;
  type: QuestionType.READING_CHOICE;
  difficulty: 1-10;
  examTypes: ExamType[];
  
  // 原文引用 [必须]
  passageId: string;             // 关联的原文段落ID
  passageText: string;            // 原文段落（完整引用）
  
  // 来源标注 [必须]
  sourceChapter: string;         // 章节名称
  sourceReference: string;       // 具体引用位置
  
  // 题目内容
  stem: string;                  // 题干
  options: string[];              // 选项
  correctAnswer: string;          // 正确答案
  
  // 解析 [必须引用原文]
  explanation: string;          // 英文解析
  chineseExplanation: string;   // 中文解析
  sourceEvidence: string;       // 原文证据句
  
  // 关联知识点
  relatedWords: string[];
  relatedGrammar: string[];
}
```

### 3.2 内容管理模块 (FR-CONTENT)

#### FR-CONTENT-001: 原著文件管理
**优先级**: 高
**描述**: 系统必须正确管理和读取原著文件

**文件规范：**
```
/book/
  └── Matilda.md              # 唯一内容源文件
      ├── 格式: Markdown
      ├── 编码: UTF-8
      ├── 章节: 22 个
      ├── 总行数: ~140 行
      └── 总词数: ~45,000 词
```

**读取规范：**
```typescript
class MatildaBookReader {
  // 读取原著文件
  async loadBook(): Promise<BookContent>;
  
  // 按章节读取
  async getChapter(chapterNumber: number): Promise<Chapter>;
  
  // 按行号读取段落
  async getParagraph(startLine: number, endLine: number): Promise<string>;
  
  // 验证原文完整性
  verifyIntegrity(): boolean;
}
```

#### FR-CONTENT-002: 段落提取算法
**优先级**: 中
**描述**: 自动从原著中提取适合各难度级别的段落

**算法规范：**
```typescript
class PassageExtractor {
  /**
   * 提取段落
   * @param chapterNumber 章节编号
   * @param difficulty 目标难度
   * @param wordCount 目标词数
   * @returns 提取的段落
   */
  extractPassage(
    chapterNumber: number,
    difficulty: number,
    wordCount: number
  ): ReadingPassage {
    // 1. 读取章节内容
    // 2. 按句子分割
    // 3. 根据词数要求组合段落
    // 4. 确保情节完整性
    // 5. 返回段落对象
  }
}
```

---

## 4. 非功能需求

### 4.1 性能需求

#### NF-PERF-001: 内容加载性能
- 原著文件加载时间 < 500ms
- 段落提取时间 < 100ms
- 题目生成时间 < 200ms

#### NF-PERF-002: 存储需求
- 原著文件大小: ~220KB
- 题目数据大小: ~2MB (1000+ 道题)
- 总存储需求: < 5MB

### 4.2 质量需求

#### NF-QUAL-001: 原文准确性
- 原文引用准确率: 100%
- 禁止任何形式的文本修改
- 必须保持原著的拼写和标点

#### NF-QUAL-002: 题目质量
- 答案准确率: 100%
- 每道题必须有明确的原文依据
- 干扰项设计必须科学合理

### 4.3 可维护性需求

#### NF-MAINT-001: 内容更新
- 原著文件更新时，题目必须重新验证
- 提供内容一致性检查工具
- 支持题目批量重新生成

---

## 5. 接口规范

### 5.1 数据接口

#### 5.1.1 阅读理解题接口
```typescript
// 获取阅读段落
interface GetReadingPassageRequest {
  chapterNumber?: number;      // 指定章节
  difficulty?: number;         // 指定难度
  wordCount?: number;          // 指定词数
}

interface GetReadingPassageResponse {
  passage: ReadingPassage;
  questions: ReadingQuestion[];
  metadata: {
    totalChapters: 22;
    totalPassages: number;
    totalQuestions: number;
  };
}

// 获取指定章节的题目
interface GetChapterQuestionsRequest {
  chapterNumber: number;
  questionCount?: number;      // 题目数量
}

interface GetChapterQuestionsResponse {
  chapter: string;
  passages: ReadingPassage[];
  questions: ReadingQuestion[];
}
```

### 5.2 文件接口

#### 5.2.1 原著文件格式
```markdown
# MATILDA

*by Roald Dahl*

---

## The Reader of Books

[段落内容]

## Mr Wormwood, the Great Car Dealer

[段落内容]

[...其他章节...]
```

---

## 6. 数据模型

### 6.1 实体关系图

```
+----------------+       +------------------+       +------------------+
|     Book       |       |  ReadingPassage  |       | ReadingQuestion  |
+----------------+       +------------------+       +------------------+
| id             |<----->| id               |<----->| id               |
| title          |       | bookId           |       | passageId        |
| author         |       | chapterNumber    |       | type             |
| totalChapters  |       | startLine        |       | difficulty       |
| totalWords     |       | endLine          |       | stem             |
+----------------+       | text             |       | options          |
                         | wordCount        |       | correctAnswer    |
                         | difficulty       |       | explanation      |
                         +------------------+       +------------------+
```

### 6.2 数据字典

#### 6.2.1 Book 表
| 字段 | 类型 | 说明 |
|-----|-----|-----|
| id | string | 书籍ID |
| title | string | 书名 |
| author | string | 作者 |
| filePath | string | 文件路径 |
| totalChapters | number | 总章节数 |
| totalWords | number | 总词数 |

#### 6.2.2 ReadingPassage 表
| 字段 | 类型 | 说明 |
|-----|-----|-----|
| id | string | 段落ID |
| bookId | string | 关联书籍ID |
| chapterNumber | number | 章节编号 |
| chapterTitle | string | 章节标题 |
| startLine | number | 起始行号 |
| endLine | number | 结束行号 |
| text | string | 原文内容 |
| wordCount | number | 词数 |
| difficulty | number | 难度等级 |

#### 6.2.3 ReadingQuestion 表
| 字段 | 类型 | 说明 |
|-----|-----|-----|
| id | string | 题目ID |
| passageId | string | 关联段落ID |
| type | enum | 题目类型 |
| difficulty | number | 难度等级 |
| stem | string | 题干 |
| options | array | 选项 |
| correctAnswer | string | 正确答案 |
| explanation | string | 解析 |
| sourceEvidence | string | 原文证据 |

---

## 7. 验证和验收

### 7.1 单元测试规范

#### 7.1.1 原文引用测试
```typescript
describe('ReadingQuestion', () => {
  it('必须使用原著原文', () => {
    const question = getQuestion('r1-001');
    const originalText = getOriginalText(
      question.sourceChapter,
      question.startLine,
      question.endLine
    );
    expect(question.passageText).toBe(originalText);
  });
  
  it('必须标注来源章节', () => {
    const question = getQuestion('r1-001');
    expect(question.sourceChapter).toBeDefined();
    expect(question.sourceReference).toBeDefined();
  });
  
  it('答案必须在原文中有依据', () => {
    const question = getQuestion('r1-001');
    expect(question.sourceEvidence).toContain(question.correctAnswer);
  });
});
```

### 7.2 验收测试

#### 7.2.1 内容验收清单
- [ ] 所有阅读段落是否来自原著？
- [ ] 是否标注了来源章节和行号？
- [ ] 题目答案是否在原文中有明确依据？
- [ ] 是否保持了原文的完整性？
- [ ] 是否达到 1000+ 道题的要求？

#### 7.2.2 质量验收清单
- [ ] 原文引用准确率 100%
- [ ] 题目答案准确率 100%
- [ ] 难度分级是否合理？
- [ ] 是否覆盖全部 22 个章节？

---

## 8. 附录

### 8.1 原著章节索引

| 编号 | 章节标题 | 起始行 | 词数估算 |
|-----|---------|-------|---------|
| 1 | The Reader of Books | 13 | ~4,000 |
| 2 | Mr Wormwood, the Great Car Dealer | 29 | ~3,500 |
| 3 | The Hat and the Superglue | 35 | ~3,000 |
| 4 | The Ghost | 49 | ~2,500 |
| 5 | Arithmetic | 53 | ~2,000 |
| 6 | The Platinum-Blond Man | 57 | ~2,500 |
| 7 | Miss Honey | 61 | ~3,500 |
| 8 | The Trunchbull | 73 | ~3,000 |
| 9 | The Parents | 77 | ~2,500 |
| 10 | Throwing the Hammer | 81 | ~2,500 |
| 11 | Bruce Bogtrotter and the Cake | 85 | ~3,000 |
| 12 | Lavender | 89 | ~2,000 |
| 13 | The Weekly Test | 95 | ~3,500 |
| 14 | The First Miracle | 105 | ~2,500 |
| 15 | The Second Miracle | 109 | ~2,000 |
| 16 | Miss Honey's Cottage | 113 | ~3,000 |
| 17 | Miss Honey's Story | 121 | ~2,500 |
| 18 | The Names | 125 | ~2,000 |
| 19 | The Practice | 129 | ~2,000 |
| 20 | The Third Miracle | 133 | ~2,500 |
| 21 | A New Home | 137 | ~2,000 |

### 8.2 代码示例

#### 8.2.1 原文读取示例
```typescript
import { readFile } from 'fs/promises';

class MatildaBookReader {
  private bookPath = '/book/Matilda.md';
  
  async loadChapter(chapterNumber: number): Promise<string> {
    const content = await readFile(this.bookPath, 'utf-8');
    // 解析章节内容
    const chapters = this.parseChapters(content);
    return chapters[chapterNumber - 1];
  }
  
  private parseChapters(content: string): string[] {
    // 按 ## 分割章节
    return content.split(/##\s+/).filter(c => c.trim());
  }
}
```

#### 8.2.2 题目生成示例
```typescript
class QuestionGenerator {
  generateDetailQuestion(passage: ReadingPassage): ReadingQuestion {
    // 1. 从原文中提取关键信息
    const keyInfo = this.extractKeyInfo(passage.text);
    
    // 2. 生成题干
    const stem = `【细节理解】${keyInfo.question}`;
    
    // 3. 生成选项
    const options = this.generateOptions(keyInfo);
    
    // 4. 标注原文证据
    const evidence = this.findEvidence(passage.text, keyInfo.answer);
    
    return {
      id: this.generateId(),
      passageId: passage.id,
      sourceChapter: passage.chapterTitle,
      sourceEvidence: evidence,
      stem,
      options,
      // ...其他字段
    };
  }
}
```

---

## 9. 变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|-----|------|---------|-----|
| v1.0 | 2026-06-13 | 初稿，定义原文引用规范 | 黄劼 |
