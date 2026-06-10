import { GrammarPoint, ExamType, CEFRLevel } from '../../types';

/**
 * 定语从句 - L2关卡用
 * 包含：基本定语从句、关系代词和关系副词
 */
export const GRAMMAR_POINTS: GrammarPoint[] = [
  // ============================================================
  // 基本定语从句
  // ============================================================
  {
    id: 'attributive-clause-basic',
    title: '定语从句',
    titleEn: 'Attributive Clause',
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.B1,
    description: '定语从句是用于修饰名词或代词的从句，放在被修饰词（先行词）后面。',
    rules: [
      '基本结构：先行词 + 关系词 + 从句',
      '关系代词用法：',
      '  - who / whom: 指人，在从句中作主语/宾语',
      '  - which: 指物，在从句中作主语/宾语',
      '  - that: 指人或物，在从句中作主语/宾语',
      '  - whose: 指人/物的所有格',
      '关系副词用法：',
      '  - when: 表示时间，在从句中作时间状语',
      '  - where: 表示地点，在从句中作地点状语',
      '  - why: 表示原因，在从句中作原因状语',
      '限制性定语从句和非限制性定语从句：',
      '  - 限制性：没有逗号，是句子必要组成部分',
      '  - 非限制性：有逗号，补充说明性'
    ],
    examples: [
      {
        sentence: 'The girl who is wearing a red dress is my sister.',
        chinese: '穿红色连衣裙的女孩是我妹妹。',
        analysis: 'who指人，作主语'
      },
      {
        sentence: 'The book which I bought yesterday is very interesting.',
        chinese: '我昨天买的那本书很有趣。',
        analysis: 'which指物，作宾语，可省略'
      },
      {
        sentence: 'This is the factory that produces cars.',
        chinese: '这是生产汽车的工厂。',
        analysis: 'that可指人或物'
      },
      {
        sentence: 'I will never forget the day when I met you.',
        chinese: '我永远不会忘记遇见你的那天。',
        analysis: 'when指时间'
      },
      {
        sentence: 'This is the city where I was born.',
        chinese: '这是我出生的城市。',
        analysis: 'where指地点'
      },
      {
        sentence: 'The student whose name is Tom is very clever.',
        chinese: '那个叫Tom的学生很聪明。',
        analysis: 'whose表示所有关系'
      },
      {
        sentence: 'My mother, who is a teacher, works very hard.',
        chinese: '我妈妈是老师，她工作很努力。',
        analysis: '非限制性定语从句，有逗号'
      }
    ],
    commonMistakes: [
      {
        wrong: 'The book which I bought it is interesting.',
        correct: 'The book which I bought is interesting. / The book I bought is interesting.',
        explanation: '定语从句中关系词已经充当成分，后面不能再加宾语'
      },
      {
        wrong: 'The man who I talked is my teacher.',
        correct: 'The man whom I talked to is my teacher. / The man I talked to is my teacher.',
        explanation: 'whom在从句中作宾语时可用who，也可用whom，或省略'
      },
      {
        wrong: 'This is the reason because why he was late.',
        correct: 'This is the reason why he was late.',
        explanation: 'reason后用why引导定语从句，不需要because'
      }
    ],
    relatedWords: ['w118', 'w119', 'w120'],
    relatedGrammar: ['tense-present-simple']
  }
];

export default GRAMMAR_POINTS;
