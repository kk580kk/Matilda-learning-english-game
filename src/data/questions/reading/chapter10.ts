import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 10: Throwing the Hammer - 阅读理解题
 * 来源: Matilda.md 第X-XX行
 * 
 * 原文引用规范:
 * - 所有阅读短文必须直接引用原著原文
 * - 禁止任何形式的改写或创作
 * - 必须标注来源章节和段落位置
 * 
 * PRD v1.0 / SRS v1.0 规范
 */

// ============================================
// 段落 1: Tales of the Trunchbull
// 词数: 210 词
// 难度: Level 3
// ============================================
export const PASSAGE_10_1 = `Before the first week of term was up, awesome tales about the Headmistress, Miss Trunchbull, began to filter through to the newcomers. Matilda and Lavender, standing in a corner of the playground during morning-break on the third day, were approached by a rugged ten-year-old with a boil on her nose, called Hortensia.

"You've got a treat coming to you," Hortensia said. "She hates very small children. She therefore loathes the bottom class and everyone in it. She thinks five-year-olds are grubs that haven't yet hatched out."

"I suppose you know the Trunchbull has a lockup cupboard in her private quarters called The Chokey? Have you heard about The Chokey?"

"The Chokey", Hortensia went on, "is a very tall but very narrow cupboard. The floor is only ten inches square so you can't sit down or squat in it. You have to stand. And three of the walls are made of cement with bits of broken glass sticking out all over, so you can't lean against them. You have to stand more or less at attention all the time when you get locked up in there."

"Can't you lean against the door?" Matilda asked.

"Don't be daft," Hortensia said. "The door's got thousands of sharp spikey nails sticking out of it."`;

// ============================================
// 段落 2: Throwing Amanda Thripp
// 词数: 205 词
// 难度: Level 3
// ============================================
export const PASSAGE_10_2 = `Suddenly the playground became silent as the grave. Matilda and Lavender glanced round and saw the gigantic figure of Miss Trunchbull advancing through the crowd of boys and girls with menacing strides. A formidable figure she was too, in her belted smock and green breeches. Below the knees her calf muscles stood out like grapefruits inside her stockings.

"Amanda Thripp!" she was shouting. "You, Amanda Thripp, come here!"

Miss Trunchbull had now reached the victim and stood towering over her. "I want those filthy pigtails off before you come back to school tomorrow!" she barked.

"Your mummy's a twit!" the Trunchbull bellowed. "You look like a rat with a tail coming out of its head!"

The Trunchbull lunged forward and grabbed hold of Amanda's pigtails in her right fist and lifted the girl clear off the ground. Then she started swinging her round and round her head, faster and faster. And now the Trunchbull was leaning back against the weight of the whirling girl and pivoting expertly on her toes, spinning round and round. Suddenly, with a mighty grunt, the Trunchbull let go of the pigtails and Amanda went sailing like a rocket right over the wire fence of the playground.

The Trunchbull stood in the playground dusting off her hands. "Not bad," she said, "considering I'm not in strict training. Not bad at all."`;

// ============================================
// 段落定义（用于关卡渲染）
// ============================================
export interface Passage {
  id: string;
  title: string;
  titleZh: string;
  text: string;
  wordCount: number;
  difficulty: number;
  chapterNumber: number;
  chapterTitle: string;
}

export const CHAPTER10_PASSAGES: Passage[] = [
  {
    id: 'c10-p1',
    title: "Tales of the Trunchbull",
    titleZh: 'Trunchbull的恐怖故事',
    text: PASSAGE_10_1,
    wordCount: 210,
    difficulty: 3,
    chapterNumber: 10,
    chapterTitle: 'Throwing the Hammer'
  },
  {
    id: 'c10-p2',
    title: "Throwing Amanda Thripp",
    titleZh: 'Amanda被扔出去',
    text: PASSAGE_10_2,
    wordCount: 205,
    difficulty: 3,
    chapterNumber: 10,
    chapterTitle: 'Throwing the Hammer'
  }
];

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER10_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目
  // ----------------------------------------------------
  {
    id: 'c10-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 10: Throwing the Hammer】\n" + PASSAGE_10_1 + "\n\n【细节理解】What is \"The Chokey\"?",
    options: [
      'A. A game played in the playground.',
      'B. A narrow punishment cupboard with sharp objects on the walls.',
      'C. A classroom for difficult students.',
      'D. A special chair in the Headmistress\'s office.'
    ],
    correctAnswer: 'B',
    explanation: 'The Chokey is described as "a very tall but very narrow cupboard" with cement walls "with bits of broken glass sticking out" and a door with "thousands of sharp spikey nails."',
    chineseExplanation: 'The Chokey被描述为一个"又高又窄的柜子"，水泥墙上"嵌着碎玻璃片"，门上"伸出成千上万的尖钉"。',
    relatedWords: ['The Chokey', 'cupboard', 'punishment'],
    relatedGrammar: ['description-of-objects'],
    usageCount: 0
  },
  {
    id: 'c10-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 10: Throwing the Hammer】\n" + PASSAGE_10_1 + "\n\n【推理判断】Why did Hortensia say the school was like a borstal?",
    options: [
      'A. Because the school was actually a prison.',
      'B. Because the school was run as strictly as a reform school.',
      'C. Because she was being friendly.',
      'D. Because she was the head girl.'
    ],
    correctAnswer: 'B',
    explanation: 'Hortensia compares the school to a borstal (a reform school for young offenders) because Miss Trunchbull runs it with extreme cruelty and strictness.',
    chineseExplanation: 'Hortensia把学校比作borstal（少年管教所），因为Trunchbull校长以极端残忍和严格的方式管理学校。',
    relatedWords: ['borstal', 'strict', 'reform school'],
    relatedGrammar: ['comparison-figurative'],
    usageCount: 0
  },
  {
    id: 'c10-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 10: Throwing the Hammer】\n" + PASSAGE_10_1 + "\n\n【细节理解】How did Hortensia describe Trunchbull's attitude towards small children?",
    options: [
      'A. She loved them like her own.',
      'B. She hated them and thought they were like unhatched grubs.',
      'C. She was indifferent to them.',
      'D. She was afraid of them.'
    ],
    correctAnswer: 'B',
    explanation: 'Hortensia says the Trunchbull "hates very small children" and "thinks five-year-olds are grubs that haven\'t yet hatched out."',
    chineseExplanation: 'Hortensia说Trunchbull"讨厌非常小的孩子"，认为五岁小孩是"还没孵化的幼虫"。',
    relatedWords: ['hates', 'grubs', 'hatched'],
    relatedGrammar: ['opinion-expressions'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目
  // ----------------------------------------------------
  {
    id: 'c10-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 10: Throwing the Hammer】\n" + PASSAGE_10_2 + "\n\n【细节理解】Why did the Trunchbull attack Amanda Thripp?",
    options: [
      'A. Because Amanda was eating in class.',
      'B. Because Amanda had pigtails which the Trunchbull hated.',
      'C. Because Amanda was fighting with another student.',
      'D. Because Amanda was late for school.'
    ],
    correctAnswer: 'B',
    explanation: 'The Trunchbull demanded Amanda cut off her "filthy pigtails" and said she looked "like a rat with a tail coming out of its head," then grabbed her by the pigtails.',
    chineseExplanation: 'Trunchbull命令Amanda剪掉"肮脏的辫子"，说她看起来像"头上长着尾巴的老鼠"，然后抓住她的辫子把她扔了出去。',
    relatedWords: ['pigtails', 'filthy', 'twit'],
    relatedGrammar: ['cause-and-effect'],
    usageCount: 0
  },
  {
    id: 'c10-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 10: Throwing the Hammer】\n" + PASSAGE_10_2 + "\n\n【推理判断】What does the Trunchbull's comment \"Not bad, considering I'm not in strict training\" reveal about her character?",
    options: [
      'A. She was humble about her athletic skills.',
      'B. She took pride in her strength and considered throwing children as practice.',
      'C. She was disappointed with her performance.',
      'D. She was joking and didn\'t mean to hurt anyone.'
    ],
    correctAnswer: 'B',
    explanation: 'She casually evaluates her violent act of throwing a child as if it were a sporting performance, showing she feels no remorse and even takes pride in her cruelty.',
    chineseExplanation: '她把自己扔孩子的暴力行为当作运动表现来评价，完全不带任何悔意，甚至引以为傲，这展现了她的冷酷无情。',
    relatedWords: ['training', 'not bad', 'pride'],
    relatedGrammar: ['inference-from-dialogue'],
    usageCount: 0
  },
  {
    id: 'c10-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 10: Throwing the Hammer】\n" + PASSAGE_10_2 + "\n\n【细节理解】How did the playground become before Trunchbull appeared?",
    options: [
      'A. It became noisier.',
      'B. It became silent as the grave.',
      'C. Children started cheering.',
      'D. Everyone ran away.'
    ],
    correctAnswer: 'B',
    explanation: 'The passage states "Suddenly the playground became silent as the grave" before the Trunchbull appeared.',
    chineseExplanation: '原文说在Trunchbull出现之前"Suddenly the playground became silent as the grave"（操场突然变得像坟墓一样安静）。',
    relatedWords: ['silent as the grave', 'silence', 'fear'],
    relatedGrammar: ['simile-comparison'],
    usageCount: 0
  },
  {
    id: 'c10-p2-q4',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 10: Throwing the Hammer】\n" + PASSAGE_10_2 + "\n\n【主旨大意】What is the main purpose of this passage?",
    options: [
      'A. To show how much fun playground time was.',
      'B. To illustrate the Trunchbull\'s cruel and dangerous nature.',
      'C. To describe Amanda\'s love for her hair.',
      'D. To explain the rules of hammer throwing.'
    ],
    correctAnswer: 'B',
    explanation: 'The passage vividly depicts the Trunchbull physically assaulting a child by swinging her by her pigtails and throwing her over the fence, demonstrating her dangerous cruelty.',
    chineseExplanation: '这段文字生动地描写了Trunchbull抓住一个孩子的辫子把她甩起来扔过围栏的暴力行为，充分展现了她的危险和残忍。',
    relatedWords: ['cruel', 'dangerous', 'violent'],
    relatedGrammar: ['main-idea'],
    usageCount: 0
  }
];

// ============================================
// 工具函数
// ============================================

/**
 * 根据段落ID获取对应的题目
 */
export function getQuestionsByPassageId(passageId: string): Question[] {
  const passage = CHAPTER10_PASSAGES.find(p => p.id === passageId);
  if (!passage) return [];
  
  return CHAPTER10_QUESTIONS.filter(q => q.id.startsWith(passageId));
}

/**
 * 获取指定难度的题目
 */
export function getQuestionsByDifficulty(difficulty: number): Question[] {
  return CHAPTER10_QUESTIONS.filter(q => q.difficulty === difficulty);
}

/**
 * 获取所有段落
 */
export function getAllPassages(): Passage[] {
  return CHAPTER10_PASSAGES;
}
