import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_book',
    name: '小书虫',
    description: '完成第一本书的阅读',
    icon: '📚',
    requirement: {
      type: 'level_complete',
      target: 'L1'
    }
  },
  {
    id: 'speed_reader',
    name: '速读高手',
    description: '在速读游戏中获得100分',
    icon: '⚡',
    requirement: {
      type: 'score_reach',
      target: 100
    }
  },
  {
    id: 'combo_master',
    name: '连击大师',
    description: '在游戏中达成20连击',
    icon: '🔥',
    requirement: {
      type: 'combo_reach',
      target: 20
    }
  },
  {
    id: 'telekinetic',
    name: '意念大师',
    description: '完成意念觉醒关卡',
    icon: '✨',
    requirement: {
      type: 'level_complete',
      target: 'L6'
    }
  },
  {
    id: 'hero_of_hall',
    name: '校园英雄',
    description: '完成最终对决，击败川奇布校长',
    icon: '🏆',
    requirement: {
      type: 'level_complete',
      target: 'L10'
    }
  },
  {
    id: 'perfect_score',
    name: '完美通关',
    description: '以满分完成任意关卡',
    icon: '💯',
    requirement: {
      type: 'score_reach',
      target: 100
    }
  },
  {
    id: 'bookworm',
    name: '阅读达人',
    description: '阅读5本以上书籍',
    icon: '🦋',
    requirement: {
      type: 'level_complete',
      target: 'L3'
    }
  },
  {
    id: 'friend_of_honey',
    name: '蜂蜜之友',
    description: '与Miss Honey建立信任关系',
    icon: '🐝',
    requirement: {
      type: 'level_complete',
      target: 'L5'
    }
  }
];
