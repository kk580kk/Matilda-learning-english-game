import { Achievement, AchievementCategory } from '../types';

/**
 * 玛蒂尔达英语游戏成就系统 (v3.1)
 * 
 * 分类：
 * - learning: 学习成就 (10个) - 关卡完成、刷题、正确率相关
 * - story: 剧情成就 (8个) - 好感度等级、剧情解锁相关
 * - social: 社交成就 (4个) - 分享、邀请好友相关
 * - special: 特殊成就/隐藏成就 (5个) - 连续完美、累计阅读、时间段等
 */

export const ACHIEVEMENTS: Achievement[] = [
  // ============================================================
  // 学习成就 (10个) - learning
  // ============================================================
  
  // 关卡完成类
  {
    id: 'first_step',
    category: 'learning',
    name: '初出茅庐',
    description: '完成第一个关卡',
    icon: '🎯',
    condition: { type: 'count', target: 1 },
    reward: { type: 'trust', value: 10 }
  },
  {
    id: 'chapter_hunter',
    category: 'learning',
    name: '章节猎人',
    description: '完成5个关卡',
    icon: '📖',
    condition: { type: 'count', target: 5 },
    reward: { type: 'trust', value: 25 }
  },
  {
    id: 'book_worm',
    category: 'learning',
    name: '小书虫',
    description: '完成10个关卡',
    icon: '🦋',
    condition: { type: 'count', target: 10 },
    reward: { type: 'trust', value: 50 }
  },
  {
    id: 'master_reader',
    category: 'learning',
    name: '阅读大师',
    description: '完成所有关卡',
    icon: '🏆',
    condition: { type: 'count', target: 10 },
    reward: { type: 'trust', value: 100 }
  },
  
  // 正确率类
  {
    id: 'perfect_start',
    category: 'learning',
    name: '完美开局',
    description: '首次获得满分',
    icon: '💯',
    condition: { type: 'threshold', target: 100 },
    reward: { type: 'trust', value: 15 }
  },
  {
    id: 'accuracy_master',
    category: 'learning',
    name: '准确大师',
    description: '正确率达到100%',
    icon: '🎯',
    condition: { type: 'threshold', target: 100 },
    reward: { type: 'trust', value: 30 }
  },
  {
    id: 'high_achiever',
    category: 'learning',
    name: '高分达人',
    description: '累计获得1000分',
    icon: '⭐',
    condition: { type: 'count', target: 1000 },
    reward: { type: 'trust', value: 40 }
  },
  
  // 答题类
  {
    id: 'question_answered',
    category: 'learning',
    name: '初试身手',
    description: '回答100道题',
    icon: '✏️',
    condition: { type: 'count', target: 100 },
    reward: { type: 'trust', value: 20 }
  },
  {
    id: 'quiz_wizard',
    category: 'learning',
    name: '答题 wizard',
    description: '回答500道题',
    icon: '🧙',
    condition: { type: 'count', target: 500 },
    reward: { type: 'trust', value: 50 }
  },
  {
    id: 'vocab_collector',
    category: 'learning',
    name: '词汇收集者',
    description: '学习100个新词汇',
    icon: '📚',
    condition: { type: 'count', target: 100 },
    reward: { type: 'trust', value: 30 }
  },

  // ============================================================
  // 剧情成就 (8个) - story
  // ============================================================
  
  // 好感度类
  {
    id: 'first_friend',
    category: 'story',
    name: '初识',
    description: '与角色达到"认识"好感度',
    icon: '👋',
    condition: { type: 'threshold', target: 10 },
    reward: { type: 'trust', value: 5 }
  },
  {
    id: 'friendly',
    category: 'story',
    name: '友好',
    description: '与角色达到"友好"好感度',
    icon: '🤝',
    condition: { type: 'threshold', target: 30 },
    reward: { type: 'trust', value: 15 }
  },
  {
    id: 'trusted_friend',
    category: 'story',
    name: '信任',
    description: '与角色达到"信任"好感度',
    icon: '💖',
    condition: { type: 'threshold', target: 50 },
    reward: { type: 'trust', value: 25 }
  },
  {
    id: 'best_friend',
    category: 'story',
    name: '挚友',
    description: '与角色达到"挚友"好感度',
    icon: '🌟',
    condition: { type: 'threshold', target: 75 },
    reward: { type: 'trust', value: 40 }
  },
  {
    id: 'soulmate',
    category: 'story',
    name: '心灵伴侣',
    description: '与角色达到"心灵伴侣"好感度',
    icon: '💕',
    condition: { type: 'threshold', target: 95 },
    reward: { type: 'trust', value: 60 }
  },
  
  // 剧情解锁类
  {
    id: 'telekinetic_awakening',
    category: 'story',
    name: '意念觉醒',
    description: '解锁L6超能力觉醒',
    icon: '✨',
    condition: { type: 'level_complete', target: 'L6' },
    reward: { type: 'trust', value: 30 }
  },
  {
    id: 'honey_friend',
    category: 'story',
    name: '蜂蜜之友',
    description: '与Miss Honey建立联系',
    icon: '🐝',
    condition: { type: 'level_complete', target: 'L5' },
    reward: { type: 'trust', value: 20 }
  },
  {
    id: 'school_hero',
    category: 'story',
    name: '校园英雄',
    description: '完成最终对决',
    icon: '🏅',
    condition: { type: 'level_complete', target: 'L10' },
    reward: { type: 'trust', value: 80 }
  },

  // ============================================================
  // 社交成就 (4个) - social
  // ============================================================
  
  {
    id: 'share_the_joy',
    category: 'social',
    name: '分享喜悦',
    description: '首次分享成就',
    icon: '📤',
    condition: { type: 'count', target: 1 },
    reward: { type: 'trust', value: 5 },
    hidden: false
  },
  {
    id: 'cheerleader',
    category: 'social',
    name: '啦啦队长',
    description: '分享5次成就',
    icon: '🎉',
    condition: { type: 'count', target: 5 },
    reward: { type: 'trust', value: 15 },
    hidden: false
  },
  {
    id: 'influencer',
    category: 'social',
    name: '影响力',
    description: '分享10次成就',
    icon: '🌟',
    condition: { type: 'count', target: 10 },
    reward: { type: 'trust', value: 30 },
    hidden: false
  },
  {
    id: 'word_spreader',
    category: 'social',
    name: '传播者',
    description: '分享20次成就',
    icon: '📢',
    condition: { type: 'count', target: 20 },
    reward: { type: 'trust', value: 50 },
    hidden: false
  },

  // ============================================================
  // 特殊成就/隐藏成就 (5个) - special
  // ============================================================
  
  {
    id: 'streak_starter',
    category: 'special',
    name: '习惯养成',
    description: '连续登录3天',
    icon: '🔥',
    condition: { type: 'streak', target: 3 },
    reward: { type: 'trust', value: 15 }
  },
  {
    id: 'week_warrior',
    category: 'special',
    name: '周末战士',
    description: '在周末完成学习',
    icon: '🌅',
    condition: { type: 'time_range', target: 'weekend' },
    reward: { type: 'trust', value: 10 }
  },
  {
    id: 'night_owl',
    category: 'special',
    name: '夜猫子',
    description: '在晚上10点后完成关卡',
    icon: '🦉',
    condition: { type: 'time_range', target: 'night' },
    reward: { type: 'trust', value: 10 }
  },
  {
    id: 'perfectionist',
    category: 'special',
    name: '完美主义者',
    description: '连续5次满分',
    icon: '💎',
    condition: { type: 'streak', target: 5 },
    reward: { type: 'trust', value: 50 }
  },
  {
    id: 'dedicated_learner',
    category: 'special',
    name: '学习达人',
    description: '累计学习时间超过10小时',
    icon: '⏰',
    condition: { type: 'count', target: 36000 }, // 10小时 = 36000秒
    reward: { type: 'trust', value: 100 }
  }
];

/**
 * 按分类获取成就
 */
export const getAchievementsByCategory = (category: AchievementCategory): Achievement[] => {
  return ACHIEVEMENTS.filter(a => a.category === category);
};

/**
 * 获取所有分类
 */
export const ACHIEVEMENT_CATEGORIES: { id: AchievementCategory; name: string; icon: string }[] = [
  { id: 'learning', name: '学习成就', icon: '📚' },
  { id: 'story', name: '剧情成就', icon: '📖' },
  { id: 'social', name: '社交成就', icon: '👥' },
  { id: 'special', name: '特殊成就', icon: '✨' }
];
