import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 6: The Platinum-Blond Man - 阅读理解题
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
// 段落 1: Matilda's Revenge Plan
// 词数: 218 词
// 难度: Level 2
// ============================================
export const PASSAGE_6_1 = `There was no doubt in Matilda's mind that this latest display of foulness by her father deserved severe punishment, and as she sat eating her awful fried fish and fried chips and ignoring the television, her brain went to work on various possibilities. By the time she went up to bed her mind was made up.

The next morning she got up early and went into the bathroom and locked the door. As we already know, Mrs Wormwood's hair was dyed a brilliant platinum blonde, very much the same glistening silvery colour as a female tightrope-walker's tights in a circus. The big dyeing job was done twice a year at the hairdresser's, but every month or so in between, Mrs Wormwood used to freshen it up by giving it a rinse in the washbasin with something called PLATINUM BLONDE HAIR-DYE EXTRA STRONG. This also served to dye the nasty brown hairs that kept growing from the roots underneath. The bottle of PLATINUM BLONDE HAIR-DYE EXTRA STRONG was kept in the cupboard in the bathroom, and underneath the title on the label were written the words Caution, this is peroxide. Keep away from children. Matilda had read it many times with fascination.

Matilda's father had a fine crop of black hair which he parted in the middle and of which he was exceedingly proud. "Good strong hair," he was fond of saying, "means there's a good strong brain underneath." Anyway, Mr Wormwood kept his hair looking bright and strong, or so he thought, by rubbing into it every morning large quantities of a lotion called OIL OF VIOLETS HAIR TONIC. Now, in the early morning privacy of the bathroom, Matilda unscrewed the cap of her father's oil of violets and tipped three-quarters of the contents down the drain. Then she filled the bottle up with her mother's PLATINUM BLONDE HAIR-DYE EXTRA STRONG.`;

// ============================================
// 段落 2: The Hair Disaster
// 词数: 200 词
// 难度: Level 2
// ============================================
export const PASSAGE_6_2 = `At breakfast time Matilda sat quietly at the dining-room table eating her cornflakes. At this point Mr Wormwood came noisily into the room. He was incapable of entering any room quietly, especially at breakfast time. He always had to make his appearance felt immediately by creating a lot of noise and clatter.

The mother came sweeping out from the kitchen carrying a huge plate piled high with eggs and sausages and bacon and tomatoes. She looked up. She caught sight of her husband. She stopped dead. Then she let out a scream that seemed to lift her right up into the air and she dropped the plate with a crash and a splash on to the floor.

"Your hair!" the mother was shrieking, pointing a quivering finger at her husband. "Look at your hair! What've you done to your hair?"

Mr Wormwood's fine crop of black hair was now a dirty silver. "You've dyed it!" shrieked the mother. "It looks horrendous! You look like a freak!"

"Get me a mirror!" the father yelled. He grabbed the mirror and stared into it. "Oh my gawd! What's happened to me! How could it have happened?"

"I imagine, daddy," Matilda said quietly, "that you weren't looking very hard and you simply took mummy's bottle of hair stuff off the shelf instead of your own."`;

// ============================================
// 段落 3: [段落标题]（可选）
// 词数: XXX 词
// 难度: Level 2-3
// ============================================
export const PASSAGE_6_3 = "";

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

export const CHAPTER6_PASSAGES: Passage[] = [
  {
    id: 'c6-p1',
    title: "Matilda's Revenge Plan",
    titleZh: 'Matilda的报复计划',
    text: PASSAGE_6_1,
    wordCount: 218,
    difficulty: 2,
    chapterNumber: 6,
    chapterTitle: 'The Platinum-Blond Man'
  },
  {
    id: 'c6-p2',
    title: 'The Hair Disaster',
    titleZh: '染发后果',
    text: PASSAGE_6_2,
    wordCount: 200,
    difficulty: 2,
    chapterNumber: 6,
    chapterTitle: 'The Platinum-Blond Man'
  }
];

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER6_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目
  // ----------------------------------------------------
  {
    id: 'c6-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 6: The Platinum-Blond Man】\n" + PASSAGE_6_1 + "\n\n【细节理解】What did Matilda do with her father's hair tonic?",
    options: [
      'A. She threw the whole bottle away.',
      'B. She poured most of it out and replaced it with hair dye.',
      'C. She hid it in the cupboard.',
      'D. She put water into the bottle.'
    ],
    correctAnswer: 'B',
    explanation: 'Matilda poured three-quarters of the hair tonic down the drain and filled the bottle with her mother\'s hair dye.',
    chineseExplanation: 'Matilda 把瓶子里四分之三的护发素倒掉了，然后灌满了妈妈的染发剂。',
    relatedWords: ['hair tonic', 'hair dye', 'drain'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c6-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 6: The Platinum-Blond Man】\n" + PASSAGE_6_1 + "\n\n【推理判断】Why did Matilda decide to punish her father?",
    options: [
      "A. Because her father didn't let her watch television.",
      "B. Because her father had done something very unpleasant.",
      "C. Because her father refused to buy her new books.",
      "D. Because her father shouted at her mother."
    ],
    correctAnswer: 'B',
    explanation: 'The passage begins with "this latest display of foulness by her father deserved severe punishment", indicating her father did something foul.',
    chineseExplanation: '原文开头说"this latest display of foulness by her father deserved severe punishment"，表明父亲做了某件恶劣的事情，需要惩罚。',
    relatedWords: ['foulness', 'punishment', 'deserved'],
    relatedGrammar: ['inference-from-context'],
    usageCount: 0
  },
  {
    id: 'c6-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 6: The Platinum-Blond Man】\n" + PASSAGE_6_1 + "\n\n【细节理解】What warning was written on the hair dye bottle?",
    options: [
      'A. For professional use only.',
      'B. Caution, this is peroxide. Keep away from children.',
      'C. Do not use on coloured hair.',
      'D. Shake well before using.'
    ],
    correctAnswer: 'B',
    explanation: 'The label clearly stated: "Caution, this is peroxide. Keep away from children."',
    chineseExplanation: '原文明确写了标签上的警告语："Caution, this is peroxide. Keep away from children."',
    relatedWords: ['caution', 'peroxide', 'warning'],
    relatedGrammar: ['imperative-mood'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目
  // ----------------------------------------------------
  {
    id: 'c6-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 6: The Platinum-Blond Man】\n" + PASSAGE_6_2 + "\n\n【推理判断】How did Mrs Wormwood react when she saw her husband?",
    options: [
      'A. She laughed at him.',
      'B. She screamed and dropped the plate of food.',
      'C. She quietly told him to wash his hair.',
      'D. She called the hairdresser immediately.'
    ],
    correctAnswer: 'B',
    explanation: 'Mrs Wormwood "let out a scream" and "dropped the plate with a crash", showing she was extremely shocked.',
    chineseExplanation: '母亲看到丈夫的头发后"let out a scream"并"dropped the plate"，反应非常震惊。',
    relatedWords: ['scream', 'shock', 'plate'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c6-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 6: The Platinum-Blond Man】\n" + PASSAGE_6_2 + "\n\n【细节理解】What did Matilda say when her father asked how it happened?",
    options: [
      "A. She said she didn't know.",
      'B. She said he must have used the wrong bottle by mistake.',
      'C. She admitted that she had done it.',
      'D. She blamed her brother.'
    ],
    correctAnswer: 'B',
    explanation: 'Matilda pretended her father had taken the wrong bottle, saying "you simply took mummy\'s bottle of hair stuff off the shelf instead of your own."',
    chineseExplanation: 'Matilda 假装是她父亲自己不小心拿错了瓶子，说"you simply took mummy\'s bottle of hair stuff off the shelf instead of your own."',
    relatedWords: ['imagine', 'bottle', 'shelf'],
    relatedGrammar: ['indirect-speech'],
    usageCount: 0
  },
  {
    id: 'c6-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 6: The Platinum-Blond Man】\n" + PASSAGE_6_2 + "\n\n【细节理解】What was the colour of Mr Wormwood's hair after the incident?",
    options: [
      'A. Purple.',
      'B. Black.',
      'C. Dirty silver.',
      'D. Green.'
    ],
    correctAnswer: 'C',
    explanation: 'The passage states: "Mr Wormwood\'s fine crop of black hair was now a dirty silver."',
    chineseExplanation: '原文说"Mr Wormwood\'s fine crop of black hair was now a dirty silver"——变成了脏兮兮的银色。',
    relatedWords: ['dirty silver', 'black', 'colour'],
    relatedGrammar: ['adjective-description'],
    usageCount: 0
  },
  {
    id: 'c6-p2-q4',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 6: The Platinum-Blond Man】\n" + PASSAGE_6_2 + "\n\n【词汇理解】The word \"horrendous\" in the sentence \"It looks horrendous!\" most nearly means...",
    options: [
      'A. funny',
      'B. terrible',
      'C. beautiful',
      'D. strange'
    ],
    correctAnswer: 'B',
    explanation: 'horrendous means extremely unpleasant or horrifying.',
    chineseExplanation: 'horrendous 意为"可怕的、骇人的"，母亲看到丈夫的银发后觉得非常难看。',
    relatedWords: ['horrendous', 'terrible', 'freak'],
    relatedGrammar: ['vocabulary-inference'],
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
  const passage = CHAPTER6_PASSAGES.find(p => p.id === passageId);
  if (!passage) return [];
  
  return CHAPTER6_QUESTIONS.filter(q => q.id.startsWith(passageId));
}

/**
 * 获取指定难度的题目
 */
export function getQuestionsByDifficulty(difficulty: number): Question[] {
  return CHAPTER6_QUESTIONS.filter(q => q.difficulty === difficulty);
}

/**
 * 获取所有段落
 */
export function getAllPassages(): Passage[] {
  return CHAPTER6_PASSAGES;
}
