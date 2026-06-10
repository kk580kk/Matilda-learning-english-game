import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_book',
    category: 'level',
    name: '小书虫',
    description: '完成第一本书的阅读',
    icon: '📚',
    condition: {
      type: 'level_complete',
      target: 'L1'
    },
    reward: {
      type: 'badge',
      value: 'first_book'
    }
  },
  {
    id: 'speed_reader',
    category: 'level',
    name: '速读高手',
    description: '在速读游戏中获得100分',
    icon: '⚡',
    condition: {
      type: 'score_reach',
      target: 100
    },
    reward: {
      type: 'badge',
      value: 'speed_reader'
    }
  },
  {
    id: 'combo_master',
    category: 'level',
    name: '连击大师',
    description: '在游戏中达成20连击',
    icon: '🔥',
    condition: {
      type: 'combo_reach',
      target: 20
    },
    reward: {
      type: 'badge',
      value: 'combo_master'
    }
  },
  {
    id: 'telekinetic',
    category: 'level',
    name: '意念大师',
    description: '完成意念觉醒关卡',
    icon: '✨',
    condition: {
      type: 'level_complete',
      target: 'L6'
    },
    reward: {
      type: 'badge',
      value: 'telekinetic'
    }
  },
  {
    id: 'hero_of_hall',
    category: 'level',
    name: '校园英雄',
    description: '完成最终对决，击败川奇布校长',
    icon: '🏆',
    condition: {
      type: 'level_complete',
      target: 'L10'
    },
    reward: {
      type: 'badge',
      value: 'hero_of_hall'
    }
  },
  {
    id: 'perfect_score',
    category: 'level',
    name: '完美通关',
    description: '以满分完成任意关卡',
    icon: '💯',
    condition: {
      type: 'score_reach',
      target: 100
    },
    reward: {
      type: 'badge',
      value: 'perfect_score'
    }
  },
  {
    id: 'bookworm',
    category: 'level',
    name: '阅读达人',
    description: '阅读5本以上书籍',
    icon: '🦋',
    condition: {
      type: 'level_complete',
      target: 'L3'
    },
    reward: {
      type: 'badge',
      value: 'bookworm'
    }
  },
  {
    id: 'friend_of_honey',
    category: 'level',
    name: '蜂蜜之友',
    description: '与Miss Honey建立信任关系',
    icon: '🐝',
    condition: {
      type: 'level_complete',
      target: 'L5'
    },
    reward: {
      type: 'badge',
      value: 'friend_of_honey'
    }
  }
];
