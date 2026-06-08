import { LevelData } from '../types';

export const LEVELS: LevelData[] = [
  {
    levelId: 'L1',
    chapter: 1,
    title: '阅读天才',
    titleEn: 'The Reader',
    description: '帮助玛蒂尔达在限定时间内阅读书籍，获得知识积分',
    sceneComponent: 'SpeedReading',
    objectives: ['完成速读挑战', '达到目标分数', '避免被父母发现'],
    miniGames: ['SpeedReading'],
    nextLevel: 'L2',
    unlockCondition: null,
    difficulty: 1,
    storyBackground: '2岁的玛蒂尔达已经能自己阅读报纸，父母却完全不关心。她渴望通过阅读来探索世界的奥秘。'
  },
  {
    levelId: 'L2',
    chapter: 2,
    title: '家庭的秘密',
    titleEn: 'The Secret',
    description: '在父亲办公室寻找欺诈证据，决定如何处理这个秘密',
    sceneComponent: 'HiddenObject',
    objectives: ['找到所有隐藏证据', '做出道德选择', '设计恶作剧'],
    miniGames: ['HiddenObject'],
    nextLevel: 'L3',
    unlockCondition: { levelId: 'L1', condition: 'completed' },
    difficulty: 2,
    storyBackground: '玛蒂尔达发现父亲在二手车生意中欺骗顾客。她面临着艰难的道德抉择。'
  },
  {
    levelId: 'L3',
    chapter: 3,
    title: '图书馆大冒险',
    titleEn: 'The Library',
    description: '阅读经典文学作品，通过知识测试',
    sceneComponent: 'Reading',
    objectives: ['选择并阅读书籍', '回答知识问题', '获得Mrs. Phelps的推荐'],
    miniGames: ['Quiz'],
    nextLevel: 'L4',
    unlockCondition: { levelId: 'L2', condition: 'completed' },
    difficulty: 2,
    storyBackground: '玛蒂尔达独自前往图书馆，遇见善良的Mrs. Phelps，开始了她的阅读之旅。'
  },
  {
    levelId: 'L4',
    chapter: 4,
    title: '新学校挑战',
    titleEn: 'The School',
    description: '适应学校生活，找到朋友，避免惹麻烦',
    sceneComponent: 'Social',
    objectives: ['熟悉校园环境', '与同学建立友谊', '通过能力测试'],
    miniGames: ['Dialogue'],
    nextLevel: 'L5',
    unlockCondition: { levelId: 'L3', condition: 'completed' },
    difficulty: 2,
    storyBackground: '5岁的玛蒂尔达第一天上学，面对全新的环境。她遇到了各种性格的同学。'
  },
  {
    levelId: 'L5',
    chapter: 5,
    title: '蜂蜜老师的友谊',
    titleEn: 'Miss Honey',
    description: '建立与Miss Honey的信任关系，展现真实能力',
    sceneComponent: 'Relationship',
    objectives: ['完成对话选择', '展示数学能力', '建立信任'],
    miniGames: ['MathChallenge', 'Dialogue'],
    nextLevel: 'L6',
    unlockCondition: { levelId: 'L4', condition: 'completed' },
    difficulty: 2,
    storyBackground: '玛蒂尔达遇到了理解她的Miss Honey老师，两人建立了深厚的友谊。'
  },
  {
    levelId: 'L6',
    chapter: 6,
    title: '意念觉醒',
    titleEn: 'The Power',
    description: '学习控制新获得的超能力',
    sceneComponent: 'Telepathy',
    objectives: ['意念训练三阶段', '管理精神力', '精准控制物体'],
    miniGames: ['Telepathy'],
    nextLevel: 'L7',
    unlockCondition: { levelId: 'L5', condition: 'completed' },
    difficulty: 3,
    storyBackground: '玛蒂尔达发现自己在极度愤怒时能用意念移动物体。她的超能力觉醒 了！'
  },
  {
    levelId: 'L7',
    chapter: 7,
    title: '对抗川奇布校长',
    titleEn: 'The Trunchbull',
    description: '设计恶作剧让校长出丑，保护同学',
    sceneComponent: 'Prank',
    objectives: ['研究校长习惯', '设计恶作剧方案', '成功执行并逃脱'],
    miniGames: ['Stealth', 'Telepathy'],
    nextLevel: 'L8',
    unlockCondition: { levelId: 'L6', condition: 'completed' },
    difficulty: 3,
    storyBackground: '川奇布校长是学校的暴君，玛蒂尔达决定用智慧对抗她，保护同学们。'
  },
  {
    levelId: 'L8',
    chapter: 8,
    title: '拯救朋友',
    titleEn: 'The Champion',
    description: '帮助Bruce吃完巨大的巧克力蛋糕',
    sceneComponent: 'Rhythm',
    objectives: ['节奏点击保持士气', '团队协作', '必要时使用超能力'],
    miniGames: ['RhythmGame', 'Telepathy'],
    nextLevel: 'L9',
    unlockCondition: { levelId: 'L7', condition: 'completed' },
    difficulty: 3,
    storyBackground: 'Bruce Bogtrotter被校长强迫吃巨大的巧克力蛋糕，玛蒂尔达决定帮助他。'
  },
  {
    levelId: 'L9',
    chapter: 9,
    title: '小屋探险',
    titleEn: 'The Cottage',
    description: '探索小屋，发现Miss Honey的秘密',
    sceneComponent: 'Exploration',
    objectives: ['探索小屋环境', '找到关键证据', '拼凑真相'],
    miniGames: ['HiddenObject', 'Puzzle'],
    nextLevel: 'L10',
    unlockCondition: { levelId: 'L8', condition: 'completed' },
    difficulty: 4,
    storyBackground: 'Miss Honey带玛蒂尔达去她的小屋，揭露她与川奇布校长的关系。'
  },
  {
    levelId: 'L10',
    chapter: 10,
    title: '最终对决',
    titleEn: 'The Final Battle',
    description: '执行计划，让校长承认罪行并离开学校',
    sceneComponent: 'BossBattle',
    objectives: ['收集证据', '幽灵恐吓', '超能力对决', '获得胜利'],
    miniGames: ['BossBattle'],
    nextLevel: null,
    unlockCondition: { levelId: 'L9', condition: 'completed' },
    difficulty: 5,
    storyBackground: '玛蒂尔达决定用超能力彻底击败川奇布校长，揭露她的罪行。'
  }
];

export const getLevelById = (id: string): LevelData | undefined => {
  return LEVELS.find(level => level.levelId === id);
};

export const getNextLevel = (currentLevelId: string): LevelData | undefined => {
  const currentIndex = LEVELS.findIndex(level => level.levelId === currentLevelId);
  if (currentIndex >= 0 && currentIndex < LEVELS.length - 1) {
    return LEVELS[currentIndex + 1];
  }
  return undefined;
};
