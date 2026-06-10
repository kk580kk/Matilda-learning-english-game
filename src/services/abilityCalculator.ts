/**
 * 能力计算器
 * 计算用户各项英语能力，生成雷达图数据
 */

import { 
  UserAbilities, 
  AbilityScore, 
  AbilityDimension,
  CEFRLevel,
  ExamType,
  AbilityRadarData
} from '../types';

interface UserStats {
  vocabCount: number;
  grammarAccuracy: number;
  readingAccuracy: number;
  listeningAccuracy?: number;
  writingScore?: number;
  speakingScore?: number;
  targetExam?: ExamType | null;
}

interface AbilityConfig {
  targetExam: ExamType;
  targetLevel: CEFRLevel;
}

class AbilityCalculator {
  
  /**
   * 计算能力得分
   */
  calculateAbilities(stats: UserStats): UserAbilities {
    const { 
      vocabCount, 
      grammarAccuracy, 
      readingAccuracy, 
      listeningAccuracy = 50, 
      writingScore = 50,
      speakingScore = 50,
      targetExam = null 
    } = stats;
    
    return {
      vocabulary: this.createAbilityScore(
        AbilityDimension.VOCABULARY,
        this.calculateVocabScore(vocabCount)
      ),
      grammar: this.createAbilityScore(
        AbilityDimension.GRAMMAR,
        grammarAccuracy
      ),
      reading: this.createAbilityScore(
        AbilityDimension.READING,
        readingAccuracy
      ),
      listening: this.createAbilityScore(
        AbilityDimension.LISTENING,
        listeningAccuracy
      ),
      writing: this.createAbilityScore(
        AbilityDimension.WRITING,
        writingScore
      ),
      speaking: this.createAbilityScore(
        AbilityDimension.SPEAKING,
        speakingScore
      ),
      overall: this.calculateOverall([
        this.calculateVocabScore(vocabCount),
        grammarAccuracy,
        readingAccuracy,
        listeningAccuracy,
        writingScore,
        speakingScore
      ]),
      cefrLevel: this.estimateCEFRLevel(vocabCount, grammarAccuracy),
      targetExam,
    };
  }

  /**
   * 计算目标考试对应的能力要求
   */
  getTargetRequirements(config: AbilityConfig): Record<AbilityDimension, number> {
    const { targetExam } = config;
    
    if (targetExam === ExamType.ZHONGKAO) {
      return {
        vocabulary: 80,    // 掌握1600核心词
        grammar: 75,
        reading: 70,
        listening: 70,
        writing: 65,
        speaking: 0,        // 不考口语
      };
    }
    
    // CET-4
    return {
      vocabulary: 90,    // 掌握4500+词汇
      grammar: 80,
      reading: 75,
      listening: 75,
      writing: 70,
      speaking: 60,
    };
  }

  /**
   * 生成雷达图数据
   */
  generateRadarData(
    current: UserAbilities,
    target?: Record<AbilityDimension, number>
  ): AbilityRadarData {
    const labels = ['词汇', '语法', '阅读', '听力', '写作', '口语'];
    const currentScores = [
      current.vocabulary.score,
      current.grammar.score,
      current.reading.score,
      current.listening.score,
      current.writing.score,
      current.speaking.score,
    ];
    
    const datasets = [
      {
        label: '当前能力',
        scores: currentScores,
        color: '#9b7fc9',
      },
    ];
    
    if (target) {
      datasets.push({
        label: '目标能力',
        scores: [
          target[AbilityDimension.VOCABULARY],
          target[AbilityDimension.GRAMMAR],
          target[AbilityDimension.READING],
          target[AbilityDimension.LISTENING],
          target[AbilityDimension.WRITING],
          target[AbilityDimension.SPEAKING],
        ],
        color: '#f4a261',
      });
    }
    
    return { labels, datasets };
  }

  /**
   * 计算能力差距
   */
  calculateGap(
    current: UserAbilities,
    target: Record<AbilityDimension, number>
  ): Record<AbilityDimension, number> {
    const gap: Record<string, number> = {};
    
    for (const dim of Object.values(AbilityDimension)) {
      const currentScore = current[dim]?.score || 0;
      const targetScore = target[dim] || 0;
      gap[dim] = targetScore - currentScore;
    }
    
    return gap as Record<AbilityDimension, number>;
  }

  /**
   * 检查是否达到目标
   */
  hasReachedTarget(
    current: UserAbilities,
    target: Record<AbilityDimension, number>,
    threshold: number = 5 // 允许5分误差
  ): boolean {
    for (const dim of Object.values(AbilityDimension)) {
      const targetScore = target[dim];
      if (targetScore === undefined || targetScore === 0) continue; // 忽略不考核的
      
      const currentScore = current[dim]?.score || 0;
      if (currentScore < targetScore - threshold) {
        return false;
      }
    }
    return true;
  }

  /**
   * 获取下一个能力提升建议
   */
  getNextImprovement(
    current: UserAbilities,
    target: Record<AbilityDimension, number>
  ): { dimension: AbilityDimension; currentScore: number; targetScore: number } | null {
    const gaps: { dim: AbilityDimension; gap: number }[] = [];
    
    for (const dim of Object.values(AbilityDimension)) {
      const targetScore = target[dim];
      if (targetScore === undefined || targetScore === 0) continue;
      
      const currentScore = current[dim]?.score || 0;
      const gap = targetScore - currentScore;
      
      if (gap > 0) {
        gaps.push({ dim, gap });
      }
    }
    
    // 排序：差距最大的优先
    gaps.sort((a, b) => b.gap - a.gap);
    
    if (gaps.length === 0) return null;
    
    const first = gaps[0];
    return {
      dimension: first.dim,
      currentScore: current[first.dim]?.score || 0,
      targetScore: target[first.dim],
    };
  }

  /**
   * 计算学习建议
   */
  generateLearningSuggestions(
    current: UserAbilities,
    target: Record<AbilityDimension, number>
  ): string[] {
    const suggestions: string[] = [];
    
    const vocabGap = (target[AbilityDimension.VOCABULARY] || 0) - (current.vocabulary?.score || 0);
    const grammarGap = (target[AbilityDimension.GRAMMAR] || 0) - (current.grammar?.score || 0);
    const readingGap = (target[AbilityDimension.READING] || 0) - (current.reading?.score || 0);
    const writingGap = (target[AbilityDimension.WRITING] || 0) - (current.writing?.score || 0);
    
    if (vocabGap > 20) {
      suggestions.push('词汇量是当前最大的短板，建议每天背30个新单词。');
    } else if (vocabGap > 10) {
      suggestions.push('词汇量需要加强，建议每天背20个新单词。');
    } else if (vocabGap > 0) {
      suggestions.push('词汇量有所进步，继续保持每天复习。');
    }
    
    if (grammarGap > 20) {
      suggestions.push('语法基础较弱，建议系统复习时态和语态。');
    } else if (grammarGap > 10) {
      suggestions.push('语法需要加强，建议每天练习10道语法题。');
    }
    
    if (readingGap > 20) {
      suggestions.push('阅读理解是薄弱项，建议每天精读一篇短文。');
    } else if (readingGap > 10) {
      suggestions.push('阅读理解需要提升，建议每天做一篇阅读练习。');
    }
    
    if (writingGap > 15) {
      suggestions.push('写作能力需要加强，建议每周写2-3篇作文。');
    }
    
    if (suggestions.length === 0) {
      suggestions.push('所有能力都在目标范围内！继续保持！');
    }
    
    return suggestions;
  }

  // ========================================
  // 私有方法
  // ========================================

  private createAbilityScore(
    dimension: AbilityDimension,
    score: number
  ): AbilityScore {
    const clampedScore = Math.min(100, Math.max(0, score));
    return {
      dimension,
      score: clampedScore,
      level: this.getLevelFromScore(clampedScore),
    };
  }

  private getLevelFromScore(score: number): AbilityScore['level'] {
    if (score >= 80) return 'advanced';
    if (score >= 60) return 'intermediate';
    if (score >= 40) return 'elementary';
    return 'beginner';
  }

  private calculateVocabScore(count: number): number {
    // 假设中考1600，四级4500
    const cet4Target = 4500;
    
    // 使用较高的目标
    const maxTarget = cet4Target;
    return Math.min(100, Math.round((count / maxTarget) * 100));
  }

  private calculateOverall(scores: number[]): number {
    // 排除0分项和低于10分的异常值
    const validScores = scores.filter(s => s >= 10);
    if (validScores.length === 0) return 0;
    
    return Math.round(
      validScores.reduce((a, b) => a + b, 0) / validScores.length
    );
  }

  private estimateCEFRLevel(vocabCount: number, grammarAccuracy: number): CEFRLevel {
    const vocabWeight = 0.7;
    const grammarWeight = 0.3;
    
    const normalizedVocab = Math.min(100, (vocabCount / 4000) * 100);
    const combinedScore = normalizedVocab * vocabWeight + grammarAccuracy * grammarWeight;
    
    if (combinedScore >= 80) return CEFRLevel.B2;
    if (combinedScore >= 60) return CEFRLevel.B1;
    if (combinedScore >= 40) return CEFRLevel.A2;
    return CEFRLevel.A1;
  }

  /**
   * 从词汇量推断CEFR等级
   */
  getCEFRFromVocabCount(vocabCount: number): CEFRLevel {
    if (vocabCount >= 4000) return CEFRLevel.B2;
    if (vocabCount >= 2500) return CEFRLevel.B1;
    if (vocabCount >= 1500) return CEFRLevel.A2;
    return CEFRLevel.A1;
  }

  /**
   * 获取等级描述
   */
  getLevelDescription(level: AbilityScore['level']): string {
    switch (level) {
      case 'advanced':
        return '高级';
      case 'intermediate':
        return '中级';
      case 'elementary':
        return '初级';
      case 'beginner':
        return '入门';
      default:
        return '未知';
    }
  }

  /**
   * 获取能力维度中文名称
   */
  getDimensionChineseName(dimension: AbilityDimension): string {
    switch (dimension) {
      case AbilityDimension.VOCABULARY:
        return '词汇量';
      case AbilityDimension.GRAMMAR:
        return '语法';
      case AbilityDimension.READING:
        return '阅读理解';
      case AbilityDimension.LISTENING:
        return '听力';
      case AbilityDimension.WRITING:
        return '写作';
      case AbilityDimension.SPEAKING:
        return '口语';
      default:
        return dimension;
    }
  }
}

export const abilityCalculator = new AbilityCalculator();
