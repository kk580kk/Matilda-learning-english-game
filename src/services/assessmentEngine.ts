/**
 * 测评引擎
 * 对标中考/四级评分标准，提供多维度评估
 */

import { 
  Question, 
  QuestionType, 
  AssessmentResult, 
  LevelReport,
  ExamType,
  AbilityDimension,
  LearningPhase,
  UserAbilities
} from '../types';

export interface AssessmentConfig {
  questionCount: number;
  questionTypes: QuestionType[];
  timeLimit?: number;
  passingScore: number;
  levelId: string;
}

export interface ExamScoreResult {
  rawScore: number;
  score: number;
  percentile: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
}

class AssessmentEngine {
  
  /**
   * 生成测验
   */
  generateAssessment(
    config: AssessmentConfig,
    questionBank: Question[]
  ): Question[] {
    const { questionCount, questionTypes } = config;
    
    if (questionBank.length === 0) return [];
    if (questionTypes.length === 0) return this.shuffle(questionBank).slice(0, questionCount);
    
    // 按题型分组
    const grouped = this.groupByType(questionBank, questionTypes);
    
    // 每个题型等量分配
    const questionsPerType = Math.floor(questionCount / questionTypes.length);
    const questions: Question[] = [];
    
    for (const type of questionTypes) {
      const typeQuestions = grouped[type] || [];
      const selected = this.selectQuestions(typeQuestions, questionsPerType);
      questions.push(...selected);
    }
    
    // 如果不够，补充随机题
    while (questions.length < questionCount && questions.length < questionBank.length) {
      const remaining = questionBank.filter(q => !questions.includes(q));
      if (remaining.length === 0) break;
      questions.push(this.pickRandom(remaining));
    }
    
    // 打乱顺序
    return this.shuffle(questions).slice(0, questionCount);
  }

  /**
   * 评分
   */
  grade(question: Question, userAnswer: string, timeSpent: number = 0): AssessmentResult {
    const isCorrect = this.checkAnswer(question, userAnswer);
    
    return {
      questionId: question.id,
      userAnswer,
      correctAnswer: Array.isArray(question.correctAnswer) 
        ? question.correctAnswer.join(' / ') 
        : String(question.correctAnswer),
      isCorrect,
      score: isCorrect ? this.getQuestionScore(question) : 0,
      timeSpent,
      feedback: isCorrect ? '正确！' : question.explanation,
    };
  }

  /**
   * 生成关卡报告
   */
  generateLevelReport(
    levelId: string,
    results: AssessmentResult[],
    config: AssessmentConfig,
    abilityScores: UserAbilities
  ): LevelReport {
    const correctCount = results.filter(r => r.isCorrect).length;
    const incorrectCount = results.filter(r => !r.isCorrect).length;
    const totalQuestions = results.length;
    
    // 计算总分
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    
    // 按能力维度统计
    const abilityBreakdown = this.calculateAbilityBreakdown(results, abilityScores);
    
    // 生成错题列表
    const wrongQuestionIds = results
      .filter(r => !r.isCorrect)
      .map(r => r.questionId);
    
    // 生成建议
    const suggestions = this.generateSuggestions(results, abilityBreakdown);
    
    return {
      levelId,
      totalScore,
      passingScore: config.passingScore,
      passed: totalScore >= config.passingScore,
      phaseScores: {
        [LearningPhase.STORY_INTRO]: 0,
        [LearningPhase.SITUATION_INPUT]: 0,
        [LearningPhase.FEYNMAN_OUTPUT]: 0,
        [LearningPhase.STORY_PROGRESS]: 0,
        [LearningPhase.ASSESSMENT]: totalScore,
      },
      abilityScores: abilityBreakdown,
      totalQuestions,
      correctCount,
      incorrectCount,
      accuracy: totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0,
      wrongQuestionIds,
      newWordsLearned: config.questionCount,
      wordsToReview: wrongQuestionIds,
      abilityImprovement: this.calculateImprovement(abilityBreakdown, abilityScores),
      suggestions,
      completedAt: new Date().toISOString(),
    };
  }

  /**
   * 对标评分标准
   */
  calculateExamScore(
    examType: ExamType,
    rawScore: number,
    totalPossible: number
  ): ExamScoreResult {
    const percentage = totalPossible > 0 ? rawScore / totalPossible : 0;
    
    let score: number;
    let grade: 'A' | 'B' | 'C' | 'D' | 'E';
    let percentile: number;
    
    if (examType === ExamType.ZHONGKAO) {
      // 中考评分标准 (模拟)
      if (percentage >= 0.9) { score = 100; grade = 'A'; percentile = 95; }
      else if (percentage >= 0.8) { score = 90; grade = 'A'; percentile = 85; }
      else if (percentage >= 0.7) { score = 80; grade = 'B'; percentile = 70; }
      else if (percentage >= 0.6) { score = 70; grade = 'B'; percentile = 50; }
      else if (percentage >= 0.5) { score = 60; grade = 'C'; percentile = 30; }
      else { score = Math.round(percentage * 100); grade = 'D'; percentile = 15; }
    } else {
      // 四级评分标准 (模拟)
      if (percentage >= 0.9) { score = 100; grade = 'A'; percentile = 97; }
      else if (percentage >= 0.85) { score = 85; grade = 'A'; percentile = 90; }
      else if (percentage >= 0.75) { score = 75; grade = 'B'; percentile = 75; }
      else if (percentage >= 0.65) { score = 65; grade = 'B'; percentile = 55; }
      else if (percentage >= 0.55) { score = 55; grade = 'C'; percentile = 30; }
      else { score = Math.round(percentage * 100); grade = 'D'; percentile = 10; }
    }
    
    return { rawScore, score, percentile, grade };
  }

  /**
   * 获取题目关联的能力维度
   */
  getQuestionAbilityDimension(type: QuestionType): AbilityDimension {
    switch (type) {
      case QuestionType.VOCAB_CHOICE:
      case QuestionType.VOCAB_SPELLING:
        return AbilityDimension.VOCABULARY;
      case QuestionType.GRAMMAR_CHOICE:
      case QuestionType.GRAMMAR_TRANSFORM:
        return AbilityDimension.GRAMMAR;
      case QuestionType.READING_CHOICE:
      case QuestionType.READING_CLOZE:
      case QuestionType.READING_ORDER:
        return AbilityDimension.READING;
      case QuestionType.LISTENING_CHOICE:
      case QuestionType.LISTENING_DICTATION:
        return AbilityDimension.LISTENING;
      case QuestionType.TRANSLATION:
      case QuestionType.WRITING:
        return AbilityDimension.WRITING;
      default:
        return AbilityDimension.READING;
    }
  }

  // ========================================
  // 私有辅助方法
  // ========================================

  private groupByType(bank: Question[], types: QuestionType[]): Record<QuestionType, Question[]> {
    const grouped: Record<string, Question[]> = {};
    
    for (const q of bank) {
      if (!grouped[q.type]) grouped[q.type] = [];
      grouped[q.type].push(q);
    }
    
    const result: Record<QuestionType, Question[]> = {} as any;
    for (const type of types) {
      result[type] = grouped[type] || [];
    }
    
    return result;
  }

  private selectQuestions(questions: Question[], count: number): Question[] {
    if (questions.length === 0) return [];
    
    // 按难度分层抽取
    const easy = questions.filter(q => q.difficulty <= 2);
    const medium = questions.filter(q => q.difficulty === 3);
    const hard = questions.filter(q => q.difficulty >= 4);
    
    const selected: Question[] = [];
    
    // 简单40%，中等40%，困难20%
    const totalCount = Math.min(count, questions.length);
    const easyCount = Math.floor(totalCount * 0.4);
    const mediumCount = Math.floor(totalCount * 0.4);
    const hardCount = totalCount - easyCount - mediumCount;
    
    selected.push(...this.shuffle(easy).slice(0, easyCount));
    selected.push(...this.shuffle(medium).slice(0, mediumCount));
    selected.push(...this.shuffle(hard).slice(0, hardCount));
    
    return this.shuffle(selected);
  }

  private checkAnswer(question: Question, userAnswer: string): boolean {
    const correct = question.correctAnswer;
    const userAnswerTrimmed = userAnswer.trim().toLowerCase();
    
    if (Array.isArray(correct)) {
      return correct.some(c => c.trim().toLowerCase() === userAnswerTrimmed);
    }
    
    if (typeof correct === 'number') {
      const userNum = parseFloat(userAnswer);
      return !isNaN(userNum) && userNum === correct;
    }
    
    // 忽略大小写和空格
    return userAnswerTrimmed === String(correct).trim().toLowerCase();
  }

  private getQuestionScore(question: Question): number {
    // 基础分 + 难度加成
    const baseScore = 10;
    const difficultyBonus = (question.difficulty - 1) * 3;
    return baseScore + difficultyBonus;
  }

  private calculateAbilityBreakdown(
    results: AssessmentResult[],
    currentScores: UserAbilities
  ): Record<AbilityDimension, number> {
    // 按能力维度分组统计
    const dimensionResults: Record<string, { correct: number; total: number }> = {};
    
    for (const result of results) {
      // 这里需要关联question获取type，暂时简化处理
      // 实际应该从questionBank获取type
      const dimension = AbilityDimension.READING; // 默认
      if (!dimensionResults[dimension]) {
        dimensionResults[dimension] = { correct: 0, total: 0 };
      }
      dimensionResults[dimension].total++;
      if (result.isCorrect) {
        dimensionResults[dimension].correct++;
      }
    }
    
    // 计算新分数
    const newScores: Record<string, number> = {};
    
    for (const dim of Object.values(AbilityDimension)) {
      const current = currentScores[dim];
      const dimResult = dimensionResults[dim] || { correct: 0, total: 0 };
      
      if (dimResult.total > 0) {
        const improvement = Math.round((dimResult.correct / dimResult.total) * 10);
        newScores[dim] = Math.min(100, (current?.score || 50) + improvement);
      } else {
        newScores[dim] = current?.score || 50;
      }
    }
    
    return newScores as Record<AbilityDimension, number>;
  }

  private generateSuggestions(
    results: AssessmentResult[],
    abilityBreakdown: Record<AbilityDimension, number>
  ): string[] {
    const suggestions: string[] = [];
    
    // 统计错题类型
    const typeCount: Record<string, number> = {};
    for (const r of results) {
      if (!r.isCorrect) {
        // 这里需要关联question获取type
        typeCount['general'] = (typeCount['general'] || 0) + 1;
      }
    }
    
    const wrongCount = results.filter(r => !r.isCorrect).length;
    const totalCount = results.length;
    const wrongRate = totalCount > 0 ? wrongCount / totalCount : 0;
    
    if (wrongRate > 0.5) {
      suggestions.push('本次正确率较低，建议先巩固基础词汇和语法知识。');
    }
    
    if (abilityBreakdown[AbilityDimension.VOCABULARY] < 60) {
      suggestions.push('词汇量需要加强，建议每天背20个新单词。');
    }
    
    if (abilityBreakdown[AbilityDimension.GRAMMAR] < 60) {
      suggestions.push('语法薄弱，建议复习时态和语态相关内容。');
    }
    
    if (abilityBreakdown[AbilityDimension.READING] < 60) {
      suggestions.push('阅读理解需要加强，建议每天做一篇阅读练习。');
    }
    
    if (suggestions.length === 0) {
      if (wrongRate > 0.2) {
        suggestions.push('整体表现不错，但还有一些细节需要注意。');
      } else {
        suggestions.push('太棒了！继续保持！');
      }
    }
    
    return suggestions;
  }

  private calculateImprovement(
    newScores: Record<AbilityDimension, number>,
    oldScores: UserAbilities
  ): Record<AbilityDimension, number> {
    const improvement: Record<string, number> = {};
    
    for (const key of Object.keys(newScores) as AbilityDimension[]) {
      const oldScore = oldScores[key]?.score || 50;
      improvement[key] = newScores[key] - oldScore;
    }
    
    return improvement as Record<AbilityDimension, number>;
  }

  private shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  private pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

export const assessmentEngine = new AssessmentEngine();
