/**
 * 复习状态 Store
 * 管理SRS复习流程、会话状态、卡片进度
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getStorage } from '../utils/storage';
import {  
  ReviewCard, 
  ReviewSession,
  CardStatus,
  Word,
  VocabularyProgress
} from '../types';
import { srsEngine, ReviewResponse, ReviewStats } from '../services/srsEngine';

interface ReviewState {
  // 复习状态
  isReviewing: boolean;
  currentSession: ReviewSession | null;
  reviewQueue: ReviewCard[];
  currentCardIndex: number;
  todayStats: ReviewStats;
  
  // Actions - 会话管理
  startReviewSession: (cards: ReviewCard[]) => void;
  endReviewSession: () => void;
  
  // Actions - 卡片进度
  processCardResponse: (response: ReviewResponse) => void;
  nextCard: () => void;
  skipCard: () => void;
  
  // Actions - 卡片管理
  addCardsToQueue: (cards: ReviewCard[]) => void;
  removeCardFromQueue: (cardId: string) => void;
  clearQueue: () => void;
  
  // Actions - 统计
  refreshTodayStats: () => void;
  
  // Computed
  getCurrentCard: () => ReviewCard | null;
  getProgress: () => { current: number; total: number; percentage: number };
  isSessionComplete: () => boolean;
}

const initialState = {
  isReviewing: false,
  currentSession: null,
  reviewQueue: [],
  currentCardIndex: 0,
  todayStats: {
    total: 0,
    new: 0,
    learning: 0,
    review: 0,
    dueToday: 0,
  } as ReviewStats,
};

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      startReviewSession: (cards) => {
        const sessionId = `session-${Date.now()}`;
        
        const session: ReviewSession = {
          id: sessionId,
          date: new Date().toISOString().split('T')[0],
          cards: cards,
          completed: false,
          totalCards: cards.length,
          reviewedCards: 0,
          correctCards: 0,
          accuracy: 0,
          startTime: new Date().toISOString(),
        };
        
        set({
          isReviewing: true,
          currentSession: session,
          reviewQueue: cards,
          currentCardIndex: 0,
        });
      },
      
      endReviewSession: () => {
        const { currentSession, reviewQueue } = get();
        if (!currentSession) return;
        
        const completedSession: ReviewSession = {
          ...currentSession,
          completed: true,
          endTime: new Date().toISOString(),
          reviewedCards: reviewQueue.length - get().reviewQueue.length + get().currentCardIndex,
        };
        
        // 更新统计
        const reviewedCards = completedSession.reviewedCards;
        const correctCards = currentSession.correctCards;
        
        set({
          isReviewing: false,
          currentSession: {
            ...completedSession,
            accuracy: reviewedCards > 0 ? Math.round((correctCards / reviewedCards) * 100) : 0,
          },
        });
        
        get().refreshTodayStats();
      },
      
      processCardResponse: (response) => {
        const { reviewQueue, currentCardIndex, currentSession } = get();
        const currentCard = reviewQueue[currentCardIndex];
        
        if (!currentCard) return;
        
        // 使用SRS引擎处理复习
        const updatedCard = srsEngine.processReview(currentCard, response);
        
        // 更新队列中的卡片
        const newQueue = [...reviewQueue];
        newQueue[currentCardIndex] = updatedCard;
        
        // 更新会话中的统计
        const isCorrect = response.quality >= 3;
        
        set({
          reviewQueue: newQueue,
          currentSession: currentSession ? {
            ...currentSession,
            correctCards: currentSession.correctCards + (isCorrect ? 1 : 0),
            cards: newQueue,
          } : null,
        });
      },
      
      nextCard: () => {
        const { currentCardIndex, reviewQueue } = get();
        
        if (currentCardIndex < reviewQueue.length - 1) {
          set({ currentCardIndex: currentCardIndex + 1 });
        } else {
          // 复习完成
          get().endReviewSession();
        }
      },
      
      skipCard: () => {
        const { currentCardIndex, reviewQueue } = get();
        
        // 将当前卡片移到队尾
        const card = reviewQueue[currentCardIndex];
        const newQueue = [
          ...reviewQueue.slice(0, currentCardIndex),
          ...reviewQueue.slice(currentCardIndex + 1),
          card,
        ];
        
        set({ reviewQueue: newQueue });
      },
      
      addCardsToQueue: (cards) => set((state) => ({
        reviewQueue: [...state.reviewQueue, ...cards],
      })),
      
      removeCardFromQueue: (cardId) => set((state) => ({
        reviewQueue: state.reviewQueue.filter(c => c.cardId !== cardId),
      })),
      
      clearQueue: () => set({
        reviewQueue: [],
        currentCardIndex: 0,
      }),
      
      refreshTodayStats: () => {
        // 从localStorage获取所有卡片计算统计
        // 这里简化处理，实际应该从userStore获取
        const stats = srsEngine.calculateReviewStats([]);
        set({ todayStats: stats });
      },
      
      getCurrentCard: () => {
        const { reviewQueue, currentCardIndex } = get();
        return reviewQueue[currentCardIndex] || null;
      },
      
      getProgress: () => {
        const { reviewQueue, currentCardIndex } = get();
        const total = reviewQueue.length;
        const current = Math.min(currentCardIndex + 1, total);
        const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
        
        return { current, total, percentage };
      },
      
      isSessionComplete: () => {
        const { isReviewing, currentCardIndex, reviewQueue } = get();
        return !isReviewing || currentCardIndex >= reviewQueue.length;
      },
    }),
    {
      name: 'matilda-review-storage',
      storage: getStorage() as any,
      partialize: (state) => ({
        reviewQueue: state.reviewQueue,
        todayStats: state.todayStats,
      }),
    }
  )
);

// 便捷函数：从词汇创建复习卡片
export const createReviewCardsFromVocabulary = (
  vocabulary: Record<string, VocabularyProgress>,
  words: Word[],
  sourceLevel?: string
): ReviewCard[] => {
  const cards: ReviewCard[] = [];
  
  for (const word of words) {
    const progress = vocabulary[word.id];
    
    // 如果是新卡片或需要复习
    if (!progress || progress.status === CardStatus.NEW || 
        new Date(progress.nextReviewDate) <= new Date()) {
      cards.push(srsEngine.createWordCard(word, sourceLevel));
    }
  }
  
  return cards;
};

// 便捷函数：获取今日待复习卡片
export const getTodayReviewCards = (
  pendingReviews: ReviewCard[]
): ReviewCard[] => {
  return srsEngine.getTodayReviewCards(pendingReviews);
};
