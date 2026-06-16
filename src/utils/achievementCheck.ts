import { useAchievementStore } from '../store';

/**
 * 成就检查工具函数
 * 用于在关键事件触发点调用成就检查
 */

// 记录关卡完成
export const recordLevelComplete = (levelId: string, score: number) => {
  const store = useAchievementStore.getState();
  
  // 记录完成的关卡
  const newList = [...store.completedLevelsList];
  if (!newList.includes(levelId)) {
    newList.push(levelId);
    store.setStat('completedLevelsList', newList);
  }
  
  // 记录分数
  store.setStat('lastScore', score);
  
  // 满分连续
  store.setStat('perfectStreak', score === 100 ? store.perfectStreak + 1 : 0);
  
  // 检查成就 - 关卡完成数量
  store.checkAndUnlock({ type: 'count', target: newList.length });
  
  // 检查成就 - 具体关卡
  store.checkAndUnlock({ type: 'level_complete', target: levelId });
  
  // 检查满分成就
  if (score === 100) {
    store.checkAndUnlock({ type: 'threshold', target: 100 });
  }
};

// 记录答题
export const recordAnswer = () => {
  const store = useAchievementStore.getState();
  store.incrementStat('questionAnswered', 1);
};

// 记录分享
export const recordShare = () => {
  useAchievementStore.getState().recordShare();
};

// 记录学习时间
export const recordPlayTime = (seconds: number) => {
  useAchievementStore.getState().incrementStat('playTimeSeconds', seconds);
};

// 记录登录
export const recordLogin = () => {
  useAchievementStore.getState().checkLoginStreak();
};

// 获取成就解锁弹窗控制
export const useUnlockModalControls = () => {
  const { pendingUnlock, showUnlockModal, setShowUnlockModal, setPendingUnlock } = useAchievementStore();
  
  return {
    pendingUnlock,
    showUnlockModal,
    closeModal: () => {
      setShowUnlockModal(false);
      setPendingUnlock(null);
    }
  };
};
