# 玛蒂尔达英语学习游戏 - 产品需求文档 (PRD)

## 文档信息
- **版本**: v1.0
- **日期**: 2026-06-13
- **状态**: 初稿
- **作者**: 黄劼

---

## 1. 产品概述

### 1.1 产品名称
玛蒂尔达英语学习游戏 (Matilda Learning English Game)

### 1.2 产品定位
基于 Roald Dahl 经典儿童文学作品《Matilda》的交互式英语学习游戏，通过原著故事驱动英语学习，结合游戏化元素提升学习体验。

### 1.3 目标用户
- 主要用户：8-14 岁中小学生
- 次要用户：英语初学者、Roald Dahl 作品爱好者

---

## 2. 核心需求

### 2.1 内容来源规范 [重要]

#### 2.1.1 阅读理解题来源要求
**所有阅读理解题必须使用《Matilda》原著原文原句，不允许自行发挥创作。**

**具体要求：**
1. **原文引用**：所有阅读短文必须直接截取原著中的连续段落
2. **禁止改写**：不得对原文进行任何改写、扩写或缩写
3. **禁止创作**：不得根据原著情节自行创作新的阅读材料
4. **标注出处**：每篇阅读短文必须标注章节来源（如：选自 Chapter 1: The Reader of Books）

#### 2.1.2 原文使用范围
- **源文件**: `/book/Matilda.md` (Roald Dahl 原著)
- **章节数量**: 22 个章节
- **总词数**: 约 45,000 词
- **可提取题目数量**: 支持 1000+ 道阅读理解题

#### 2.1.3 分段截取规范
由于原文较长，阅读理解题按以下方式分段截取：

| 截取长度 | 适用难度 | 题目数量 |
|---------|---------|---------|
| 100-150 词 | Level 1-2 (简单) | 每段可出 3-5 题 |
| 150-250 词 | Level 3-5 (中等) | 每段可出 5-8 题 |
| 250-400 词 | Level 6-8 (较难) | 每段可出 8-12 题 |
| 400-600 词 | Level 9-10 (困难) | 每段可出 10-15 题 |

### 2.2 阅读理解题设计规范

#### 2.2.1 题目类型分布
每篇阅读短文必须包含以下题型：
- **细节理解题 (40%)**: 直接从原文找答案的事实性问题
- **推理判断题 (40%)**: 需要根据原文信息进行逻辑推理
- **主旨大意题 (20%)**: 理解段落或全文主旨

#### 2.2.2 题目设计原则
1. **答案必须在原文中有明确依据**
2. **干扰项必须与原文相关但表述错误**
3. **题目难度与文本难度匹配**
4. **每道题标注考查的词汇和语法点**

#### 2.2.3 原文引用格式
```typescript
// 示例：阅读理解题必须使用原著原文
const READING_PASSAGE = `Matilda was a little late in starting school. Most children begin Primary School at five or even just before, but Matilda's parents, who weren't very concerned one way or the other about their daughter's education, had forgotten to make the proper arrangements in advance. She was five and a half when she entered school for the first time.`;

// 题目必须基于原文内容
{
  stem: `【阅读短文】\n${READING_PASSAGE}\n\n【细节理解】Why was Matilda late in starting school?`,
  correctAnswer: 'A',
  explanation: '根据原文"Matilda's parents...had forgotten to make the proper arrangements in advance"',
  sourceChapter: 'Chapter 7: Miss Honey'  // 必须标注章节来源
}
```

---

## 3. 功能需求

### 3.1 关卡设计

#### 3.1.1 关卡与原著章节对应

| 关卡 | 对应章节 | 主题 | 原文段落 |
|-----|---------|-----|---------|
| L1 | Chapter 1 | 阅读天才 | Matilda 去图书馆 |
| L2 | Chapter 2 | 家庭的秘密 | 爸爸的二手车生意 |
| L3 | Chapter 3 | 帽子与强力胶 | Superglue 恶作剧 |
| L4 | Chapter 4 | 鬼把戏 | 鹦鹉恶作剧 |
| L5 | Chapter 5 | 算术天才 | 心算能力展示 |
| L6 | Chapter 6 | 金发男人 | 染发恶作剧 |
| L7 | Chapter 7 | 蜜糖老师 | 初识 Miss Honey |
| L8 | Chapter 8 | 川奇布尔校长 | 校长的恐怖 |
| L9 | Chapter 9 | 父母的态度 | Miss Honey 家访 |
| L10 | Chapter 10-22 | 奇迹时刻 | 超能力与结局 |

### 3.2 题型设计

#### 3.2.1 阅读理解题 (Reading Comprehension)
- **来源**: 必须来自原著原文
- **长度**: 100-600 词（根据难度）
- **题量**: 每篇 5-15 题
- **分值**: 每题 10-20 分

#### 3.2.2 词汇题 (Vocabulary)
- **来源**: 从原文中提取重点词汇
- **题型**: 选择题、填空题、配对题
- **难度**: 中考词汇 + 原著拓展词汇

#### 3.2.3 语法题 (Grammar)
- **来源**: 基于原文句子结构
- **重点**: 时态、从句、非谓语动词
- **题型**: 改错题、填空题、选择题

#### 3.2.4 完形填空 (Cloze)
- **来源**: 改编原著段落（保持原意）
- **空格**: 10-15 个
- **考查**: 词汇、语法、上下文理解

---

## 4. 内容需求

### 4.1 原著内容分段示例

#### Chapter 1: The Reader of Books - 分段示例

**段落 1 (适合 L1 简单难度):**
```
Nearly every weekday afternoon Matilda was left alone in the house. Her brother (five years older than her) went to school. Her father went to work and her mother went out playing bingo in a town eight miles away. Mrs Wormwood was hooked on bingo and played it five afternoons a week. On the afternoon of the day when her father had refused to buy her a book, Matilda set out all by herself to walk to the public library in the village.
```
- 词数: 78 词
- 难度: Level 1-2
- 可出题: 3-4 道

**段落 2 (适合 L3-4 中等难度):**
```
"Daddy," she said, "do you think you could buy me a book?" "A book?" he said. "What d'you want a flaming book for?" "To read, Daddy." "What's wrong with the telly, for heaven's sake? We've got a lovely telly with a twelve-inch screen and now you come asking for a book! You're getting spoiled, my girl!"
```
- 词数: 56 词（对话形式，适合听力/口语题）
- 难度: Level 3-4
- 可出题: 2-3 道

**段落 3 (适合 L5-6 较难难度):**
```
From then on, every afternoon, as soon as her mother had left for bingo, Matilda would toddle down to the library. The walk took only ten minutes and this allowed her two glorious hours sitting quietly by herself in a cosy corner devouring one book after another. When she had read every single children's book in the place, she started wandering round in search of something else.
```
- 词数: 62 词
- 难度: Level 5-6
- 可出题: 3-4 道

### 4.2 题目生成策略

#### 4.2.1 自动分段算法
1. **按章节分段**: 每个章节划分为 10-20 个段落
2. **按词数控制**: 每个段落 100-600 词
3. **按情节分割**: 在情节转折处分割
4. **保留完整性**: 每个段落必须包含完整的情节单元

#### 4.2.2 题目生成规则
1. **细节题**: 从每段中提取 5W1H (Who, What, When, Where, Why, How)
2. **推理题**: 基于人物对话和行为进行推断
3. **主旨题**: 理解段落中心思想
4. **词汇题**: 提取段落中的重点词汇

---

## 5. 技术要求

### 5.1 数据结构

#### 5.1.1 阅读理解题数据结构
```typescript
interface ReadingQuestion {
  id: string;
  type: 'READING_CHOICE';
  difficulty: 1-10;
  
  // 原文信息
  sourceChapter: string;      // 章节来源
  sourceParagraph: number;    // 段落编号
  passageText: string;         // 原文段落
  
  // 题目信息
  stem: string;              // 题干
  options: string[];          // 选项
  correctAnswer: string;      // 正确答案
  explanation: string;       // 英文解析（必须引用原文）
  chineseExplanation: string; // 中文解析
  
  // 关联知识点
  relatedWords: string[];     // 关联词汇
  relatedGrammar: string[];   // 关联语法
}
```

### 5.2 文件结构

```
project/
├── book/
│   └── Matilda.md              # 原著原文（唯一内容源）
├── src/
│   └── data/
│       └── questions/
│           └── reading/        # 按章节组织的阅读题
│               ├── chapter1.ts
│               ├── chapter2.ts
│               └── ...
├── docs/
│   ├── PRD.md                  # 本文档
│   └── SRS.md                  # 软件需求规格
└── README.md
```

---

## 6. 验收标准

### 6.1 内容验收标准

#### 6.1.1 原文使用检查清单
- [ ] 所有阅读短文是否来自原著原文？
- [ ] 是否对原文进行了任何改写？
- [ ] 是否标注了章节来源？
- [ ] 段落截取是否保持完整性？
- [ ] 题目答案是否在原文中有依据？

#### 6.1.2 题目质量检查清单
- [ ] 每篇阅读是否有 5-15 题？
- [ ] 题目类型分布是否符合 40:40:20？
- [ ] 难度分级是否合理？
- [ ] 干扰项设计是否科学？
- [ ] 解析是否引用原文？

### 6.2 数量验收标准
- [ ] 总题目数量 >= 1000 道
- [ ] 覆盖全部 22 个章节
- [ ] 每个章节 >= 40 道题
- [ ] 难度分布: 简单 30%, 中等 40%, 困难 30%

---

## 7. 附录

### 7.1 原著章节列表

1. The Reader of Books
2. Mr Wormwood, the Great Car Dealer
3. The Hat and the Superglue
4. The Ghost
5. Arithmetic
6. The Platinum-Blond Man
7. Miss Honey
8. The Trunchbull
9. The Parents
10. Throwing the Hammer
11. Bruce Bogtrotter and the Cake
12. Lavender
13. The Weekly Test
14. The First Miracle
15. The Second Miracle
16. Miss Honey's Cottage
17. Miss Honey's Story
18. The Names
19. The Practice
20. The Third Miracle
21. A New Home

### 7.2 参考文档
- 《Matilda》原著 (Roald Dahl)
- 中考英语考试大纲
- CEFR 语言能力标准

---

## 8. 变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|-----|------|---------|-----|
| v1.0 | 2026-06-13 | 初稿，明确原文引用要求 | 黄劼 |
