/**
 * 费曼学习引擎
 * 
 * 将费曼学习法"学→教→查漏→简化"游戏化
 * 让用户在"教导"玛蒂尔达的过程中巩固知识
 */

import { 
  FeynmanStage, 
  FeynmanRubric, 
  Word, 
  GrammarPoint
} from '../types';

export interface FeynmanTask {
  stage: FeynmanStage;
  items: (Word | GrammarPoint)[];
  userOutput: string;
  score: number;
  feedback: string;
  nextStage: FeynmanStage | null;
}

export interface FeynmanOutput {
  stage: FeynmanStage;
  content: string;
  score: number;
  feedback: string;
}

export interface FeynmanEvaluation {
  score: number;
  feedback: string;
  breakdown: {
    completeness: number;
    accuracy: number;
    simplicity: number;
    creativity: number;
  };
}

class FeynmanEngine {
  // 简化版关键词列表（用于评估）
  private readonly accurateKeywords = [
    'means', 'meaning', 'definition', 'example', 'used to', 
    'refers to', 'describes', 'indicates'
  ];

  private readonly creativeMarkers = [
    'like', 'imagine', 'think of', 'for example', 'similar to',
    'imagine that', '比喻', '想象', '就好比'
  ];

  /**
   * 生成费曼学习任务
   */
  generateTask(
    stage: FeynmanStage,
    vocabulary: Word[],
    grammar: GrammarPoint[]
  ): FeynmanTask {
    switch (stage) {
      case FeynmanStage.LEARN:
        return this.createLearningTask(vocabulary, grammar);
      case FeynmanStage.TEACH:
        return this.createTeachingTask(vocabulary, grammar);
      case FeynmanStage.SIMPLIFY:
        return this.createSimplifyTask(vocabulary, grammar);
      case FeynmanStage.REVIEW:
        return this.createReviewTask(vocabulary, grammar);
      default:
        return this.createLearningTask(vocabulary, grammar);
    }
  }

  /**
   * 第一步：学习理解
   * - 展示词汇/语法
   * - 提供例句
   * - 用户跟读/理解
   */
  private createLearningTask(vocabulary: Word[], grammar: GrammarPoint[]): FeynmanTask {
    return {
      stage: FeynmanStage.LEARN,
      items: [...vocabulary, ...grammar],
      userOutput: '',
      score: 0,
      feedback: '',
      nextStage: FeynmanStage.TEACH,
    };
  }

  /**
   * 第二步：教授他人（核心）
   * - 用户用简单语言解释词汇/语法
   * - AI/预设引导评估
   */
  private createTeachingTask(vocabulary: Word[], grammar: GrammarPoint[]): FeynmanTask {
    const allItems = [...vocabulary, ...grammar];
    const targetItem = this.pickRandom(allItems);
    
    return {
      stage: FeynmanStage.TEACH,
      items: [targetItem],
      userOutput: '',
      score: 0,
      feedback: '',
      nextStage: FeynmanStage.SIMPLIFY,
    };
  }

  /**
   * 第三步：简化理解
   * - 用更简单的比喻/例子解释
   * - 检测是否有 jargon/术语
   */
  private createSimplifyTask(vocabulary: Word[], grammar: GrammarPoint[]): FeynmanTask {
    const allItems = [...vocabulary, ...grammar];
    const teachingContent = this.pickRandom(allItems);
    
    return {
      stage: FeynmanStage.SIMPLIFY,
      items: [teachingContent],
      userOutput: '',
      score: 0,
      feedback: '',
      nextStage: FeynmanStage.REVIEW,
    };
  }

  /**
   * 第四步：查漏补缺
   * - 基于前三步表现，生成针对性练习
   */
  private createReviewTask(vocabulary: Word[], grammar: GrammarPoint[]): FeynmanTask {
    // 找出用户表现不好的知识点
    const weakItems = this.identifyWeakPoints(vocabulary, grammar);
    
    return {
      stage: FeynmanStage.REVIEW,
      items: weakItems,
      userOutput: '',
      score: 0,
      feedback: '',
      nextStage: null, // 费曼循环完成
    };
  }

  /**
   * 获取费曼学习的引导语
   */
  getStagePrompt(stage: FeynmanStage): string {
    switch (stage) {
      case FeynmanStage.LEARN:
        return '请认真学习以下词汇和语法内容，准备好用自己的话解释它们。';
      case FeynmanStage.TEACH:
        return '现在请你扮演老师，用简单易懂的语言向别人解释这些内容。';
      case FeynmanStage.SIMPLIFY:
        return '试着用更简单的比喻或例子来解释，让不懂的人也能明白。';
      case FeynmanStage.REVIEW:
        return '回顾一下刚才的学习，找出还不太清楚的地方重点复习。';
      default:
        return '';
    }
  }

  /**
   * 评估用户输出
   */
  evaluateOutput(
    task: FeynmanTask,
    userOutput: string,
    rubric: FeynmanRubric = { completeness: 0.4, accuracy: 0.3, simplicity: 0.2, creativity: 0.1 }
  ): FeynmanEvaluation {
    const scores: number[] = [];
    const feedbackParts: string[] = [];

    // 1. 完整性评估 (占40%)
    const completenessScore = this.evaluateCompleteness(task.items, userOutput);
    scores.push(completenessScore * rubric.completeness);
    if (completenessScore < 0.6) {
      feedbackParts.push('解释不够完整，尝试覆盖所有关键点');
    }

    // 2. 准确性评估 (占30%)
    const accuracyScore = this.evaluateAccuracy(task.items, userOutput);
    scores.push(accuracyScore * rubric.accuracy);
    if (accuracyScore < 0.7) {
      feedbackParts.push('有些解释不够准确，建议参考例句');
    }

    // 3. 简洁性评估 (占20%)
    const simplicityScore = this.evaluateSimplicity(userOutput);
    scores.push(simplicityScore * rubric.simplicity);
    if (simplicityScore < 0.5) {
      feedbackParts.push('可以尝试用更简单的语言');
    }

    // 4. 创造力评估 (占10%)
    const creativityScore = this.evaluateCreativity(userOutput, task.items);
    scores.push(creativityScore * rubric.creativity);

    const totalScore = scores.reduce((a, b) => a + b, 0);
    
    return {
      score: Math.round(totalScore * 100),
      feedback: feedbackParts.length > 0 
        ? feedbackParts.join('；') + '。继续加油！' 
        : '很好！继续加油！',
      breakdown: {
        completeness: Math.round(completenessScore * 100),
        accuracy: Math.round(accuracyScore * 100),
        simplicity: Math.round(simplicityScore * 100),
        creativity: Math.round(creativityScore * 100),
      }
    };
  }

  /**
   * 完整性评估
   * 检查用户是否解释了所有关键点
   */
  private evaluateCompleteness(items: (Word | GrammarPoint)[], output: string): number {
    if (items.length === 0) return 1;
    
    let coveredCount = 0;
    
    for (const item of items) {
      const keyword = 'word' in item ? item.word.toLowerCase() : item.titleEn.toLowerCase();
      if (output.toLowerCase().includes(keyword)) {
        coveredCount++;
      }
    }
    
    return coveredCount / items.length;
  }

  /**
   * 准确性评估
   * 简单实现：检查是否包含定义的关键词
   */
  private evaluateAccuracy(items: (Word | GrammarPoint)[], output: string): number {
    const outputLower = output.toLowerCase();
    
    // 检查是否使用了准确的关键词
    const hasAccurate = this.accurateKeywords.some(kw => 
      outputLower.includes(kw.toLowerCase())
    );
    
    // 检查是否提到了词性或语法术语（针对词汇）
    let hasPartOfSpeech = false;
    const partOfSpeechTerms = ['noun', 'verb', 'adjective', 'adverb', '名词', '动词', '形容词'];
    for (const item of items) {
      if ('meanings' in item) {
        hasPartOfSpeech = partOfSpeechTerms.some(term => 
          outputLower.includes(term.toLowerCase())
        );
        if (hasPartOfSpeech) break;
      }
    }
    
    return hasAccurate || hasPartOfSpeech ? 0.85 : 0.6;
  }

  /**
   * 简洁性评估
   * 检查是否避免重复、冗余
   */
  private evaluateSimplicity(output: string): number {
    const words = output.split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return 0.5;
    
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    
    // 词汇多样性
    const diversity = uniqueWords.size / words.length;
    
    // 长度适中 (20-300词最佳)
    let lengthScore = 0.5;
    if (words.length >= 20 && words.length <= 100) {
      lengthScore = 1;
    } else if (words.length > 100 && words.length <= 200) {
      lengthScore = 0.8;
    } else if (words.length > 200 && words.length <= 300) {
      lengthScore = 0.7;
    } else if (words.length < 20) {
      lengthScore = 0.4;
    }
    
    return (diversity * 0.6 + lengthScore * 0.4);
  }

  /**
   * 创造力评估
   * 检查是否使用了比喻、例子
   */
  private evaluateCreativity(output: string, _items: (Word | GrammarPoint)[]): number {
    const outputLower = output.toLowerCase();
    
    const hasCreativity = this.creativeMarkers.some(marker =>
      outputLower.includes(marker.toLowerCase())
    );
    
    return hasCreativity ? 1 : 0.5;
  }

  /**
   * 识别薄弱点
   */
  private identifyWeakPoints(vocabulary: Word[], grammar: GrammarPoint[]): (Word | GrammarPoint)[] {
    // 从词汇中筛选错误率高的
    const weakVocab = vocabulary
      .filter(w => {
        const total = w.correctCount + w.incorrectCount;
        return total > 0 && w.incorrectCount / total > 0.3;
      })
      .slice(0, 3);
    
    // 随机选一些作为薄弱点（简化版）
    const weakGrammar = [...grammar]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    const result = [...weakVocab, ...weakGrammar];
    
    // 如果没有薄弱点，随机返回一些
    if (result.length === 0) {
      return vocabulary.slice(0, 3);
    }
    
    return result;
  }

  /**
   * 生成费曼输出记录
   */
  createFeynmanOutput(
    stage: FeynmanStage,
    content: string,
    evaluation: FeynmanEvaluation
  ): FeynmanOutput {
    return {
      stage,
      content,
      score: evaluation.score,
      feedback: evaluation.feedback,
    };
  }

  /**
   * 获取下一阶段的引导
   */
  getNextStageGuidance(currentStage: FeynmanStage): string {
    switch (currentStage) {
      case FeynmanStage.LEARN:
        return '你已经学习了这些内容，现在试着把它们教给别人吧！';
      case FeynmanStage.TEACH:
        return '讲得不错！现在试试用更简单的比喻来解释，让小朋友也能听懂。';
      case FeynmanStage.SIMPLIFY:
        return '很好！现在回顾一下，看看有没有什么地方还不太清楚。';
      case FeynmanStage.REVIEW:
        return '费曼学习法完成！记得经常复习这些内容哦。';
      default:
        return '';
    }
  }

  private pickRandom<T>(arr: T[]): T {
    if (arr.length === 0) {
      throw new Error('Cannot pick from empty array');
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

export const feynmanEngine = new FeynmanEngine();
