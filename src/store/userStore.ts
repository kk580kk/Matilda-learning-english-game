/**
 * 用户数据 Store
 * 管理用户档案、能力、学习进度等
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getStorage } from '../utils/storage';
import {  
  UserProfile, 
  ExamType, 
  CEFRLevel, 
  UserAbilities,
  VocabularyProgress,
  GrammarProgress,
  ReviewCard,
  ReviewSession,
  CardStatus,
  AbilityDimension
} from '../types';

interface UserState {
  profile: UserProfile;
  
  // Actions - 用户信息
  setUserName: (name: string) => void;
  setTargetExam: (exam: ExamType | null) => void;
  resetProgress: () => void;
  
  // Actions - 能力
  updateAbility: (dimension: keyof UserAbilities, score: number) => void;
  updateAbilities: (abilities: Partial<UserAbilities>) => void;
  
  // Actions - 关卡进度
  setCurrentLevel: (levelId: string) => void;
  completeLevel: (levelId: string) => void;
  
  // Actions - 词汇进度
  updateVocabularyProgress: (wordId: string, progress: Partial<VocabularyProgress>) => void;
  markWordReviewed: (wordId: string, isCorrect: boolean) => void;
  
  // Actions - 语法进度
  updateGrammarProgress: (grammarId: string, progress: Partial<GrammarProgress>) => void;
  
  // Actions - 错题本
  addWrongQuestion: (questionId: string) => void;
  removeWrongQuestion: (questionId: string) => void;
  markQuestionMastered: (questionId: string) => void;
  
  // Actions - 复习
  addReviewCards: (cards: ReviewCard[]) => void;
  updateReviewCard: (cardId: string, updates: Partial<ReviewCard>) => void;
  addReviewSession: (session: ReviewSession) => void;
  
  // Actions - 统计
  addPlayTime: (seconds: number) => void;
  incrementWordsLearned: (count?: number) => void;
  incrementQuestionsAnswered: (count?: number) => void;
  updateStreak: () => void;
  resetStreak: () => void;
}

const createInitialProfile = (): UserProfile => ({
  id: crypto.randomUUID(),
  name: 'Matilda',
  targetExam: null,
  targetLevel: CEFRLevel.B1,
  abilities: {
    vocabulary: { dimension: AbilityDimension.VOCABULARY, score: 0, level: 'beginner' },
    grammar: { dimension: AbilityDimension.GRAMMAR, score: 0, level: 'beginner' },
    reading: { dimension: AbilityDimension.READING, score: 0, level: 'beginner' },
    listening: { dimension: AbilityDimension.LISTENING, score: 0, level: 'beginner' },
    writing: { dimension: AbilityDimension.WRITING, score: 0, level: 'beginner' },
    speaking: { dimension: AbilityDimension.SPEAKING, score: 0, level: 'beginner' },
    overall: 0,
    cefrLevel: CEFRLevel.A1,
    targetExam: null,
  },
  currentLevelId: 'L1',
  completedLevels: [],
  vocabularyProgress: {},
  grammarProgress: {},
  wrongBook: [],
  reviewSessions: [],
  pendingReviews: [],
  totalStudyTime: 0,
  totalWordsLearned: 0,
  totalQuestionsAnswered: 0,
  streakDays: 0,
  createdAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
});

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: createInitialProfile(),
      
      // Actions - 用户信息
      setUserName: (name) => set((state) => ({
        profile: { ...state.profile, name }
      })),
      
      setTargetExam: (exam) => set((state) => ({
        profile: {
          ...state.profile,
          targetExam: exam,
          targetLevel: exam === ExamType.ZHONGKAO ? CEFRLevel.B1 : CEFRLevel.B2,
          abilities: {
            ...state.profile.abilities,
            targetExam: exam,
          }
        }
      })),
      
      resetProgress: () => set({ profile: createInitialProfile() }),
      
      // Actions - 能力
      updateAbility: (dimension, score) => set((state) => {
        const currentScore = (state.profile.abilities as any)[dimension];
        if (!currentScore) return state;
        
        return {
          profile: {
            ...state.profile,
            abilities: {
              ...state.profile.abilities,
              [dimension]: {
                ...currentScore,
                score: Math.min(100, Math.max(0, score)),
                level: score >= 80 ? 'advanced' : 
                       score >= 60 ? 'intermediate' : 
                       score >= 40 ? 'elementary' : 'beginner'
              }
            }
          }
        };
      }),
      
      updateAbilities: (abilities) => set((state) => ({
        profile: {
          ...state.profile,
          abilities: { ...state.profile.abilities, ...abilities }
        }
      })),
      
      // Actions - 关卡进度
      setCurrentLevel: (levelId) => set((state) => ({
        profile: {
          ...state.profile,
          currentLevelId: levelId,
          lastActiveAt: new Date().toISOString(),
        }
      })),
      
      completeLevel: (levelId) => set((state) => {
        const completedLevels = state.profile.completedLevels.includes(levelId)
          ? state.profile.completedLevels
          : [...state.profile.completedLevels, levelId];
        
        return {
          profile: {
            ...state.profile,
            completedLevels,
            lastActiveAt: new Date().toISOString(),
          }
        };
      }),
      
      // Actions - 词汇进度
      updateVocabularyProgress: (wordId, progress) => set((state) => ({
        profile: {
          ...state.profile,
          vocabularyProgress: {
            ...state.profile.vocabularyProgress,
            [wordId]: {
              ...state.profile.vocabularyProgress[wordId],
              wordId,
              status: CardStatus.NEW,
              easeFactor: 2.5,
              interval: 0,
              repetitions: 0,
              nextReviewDate: new Date().toISOString(),
              ...progress,
            }
          }
        }
      })),
      
      markWordReviewed: (wordId, isCorrect) => set((state) => {
        const current = state.profile.vocabularyProgress[wordId];
        if (!current) return state;
        
        return {
          profile: {
            ...state.profile,
            vocabularyProgress: {
              ...state.profile.vocabularyProgress,
              [wordId]: {
                ...current,
                lastReviewDate: new Date().toISOString(),
                lastReviewResult: isCorrect ? 'correct' : 'incorrect',
              }
            }
          }
        };
      }),
      
      // Actions - 语法进度
      updateGrammarProgress: (grammarId, progress) => set((state) => ({
        profile: {
          ...state.profile,
          grammarProgress: {
            ...state.profile.grammarProgress,
            [grammarId]: {
              ...state.profile.grammarProgress[grammarId],
              grammarId,
              masteryLevel: 0,
              learnedAt: new Date().toISOString(),
              ...progress,
            }
          }
        }
      })),
      
      // Actions - 错题本
      addWrongQuestion: (questionId) => set((state) => {
        const existing = state.profile.wrongBook.find(w => w.questionId === questionId);
        if (existing) {
          return {
            profile: {
              ...state.profile,
              wrongBook: state.profile.wrongBook.map(w =>
                w.questionId === questionId
                  ? { ...w, wrongCount: w.wrongCount + 1, lastWrongAt: new Date().toISOString() }
                  : w
              )
            }
          };
        }
        
        return {
          profile: {
            ...state.profile,
            wrongBook: [
              ...state.profile.wrongBook,
              {
                questionId,
                wrongCount: 1,
                lastWrongAt: new Date().toISOString(),
              }
            ]
          }
        };
      }),
      
      removeWrongQuestion: (questionId) => set((state) => ({
        profile: {
          ...state.profile,
          wrongBook: state.profile.wrongBook.filter(w => w.questionId !== questionId)
        }
      })),
      
      markQuestionMastered: (questionId) => set((state) => ({
        profile: {
          ...state.profile,
          wrongBook: state.profile.wrongBook.map(w =>
            w.questionId === questionId
              ? { ...w, masteredAt: new Date().toISOString() }
              : w
          )
        }
      })),
      
      // Actions - 复习
      addReviewCards: (cards) => set((state) => ({
        profile: {
          ...state.profile,
          pendingReviews: [...state.profile.pendingReviews, ...cards]
        }
      })),
      
      updateReviewCard: (cardId, updates) => set((state) => ({
        profile: {
          ...state.profile,
          pendingReviews: state.profile.pendingReviews.map(c =>
            c.cardId === cardId ? { ...c, ...updates } : c
          )
        }
      })),
      
      addReviewSession: (session) => set((state) => ({
        profile: {
          ...state.profile,
          reviewSessions: [...state.profile.reviewSessions, session]
        }
      })),
      
      // Actions - 统计
      addPlayTime: (seconds) => set((state) => ({
        profile: {
          ...state.profile,
          totalStudyTime: state.profile.totalStudyTime + seconds,
          lastActiveAt: new Date().toISOString(),
        }
      })),
      
      incrementWordsLearned: (count = 1) => set((state) => ({
        profile: {
          ...state.profile,
          totalWordsLearned: state.profile.totalWordsLearned + count,
          lastActiveAt: new Date().toISOString(),
        }
      })),
      
      incrementQuestionsAnswered: (count = 1) => set((state) => ({
        profile: {
          ...state.profile,
          totalQuestionsAnswered: state.profile.totalQuestionsAnswered + count,
          lastActiveAt: new Date().toISOString(),
        }
      })),
      
      updateStreak: () => set((state) => {
        const lastActive = new Date(state.profile.lastActiveAt);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
        
        // 如果上次活跃是昨天，连续；如果是今天，不变；否则重置
        let newStreak = state.profile.streakDays;
        if (daysDiff === 1) {
          newStreak += 1;
        } else if (daysDiff > 1) {
          newStreak = 1;
        }
        
        return {
          profile: {
            ...state.profile,
            streakDays: newStreak,
            lastActiveAt: now.toISOString(),
          }
        };
      }),
      
      resetStreak: () => set((state) => ({
        profile: {
          ...state.profile,
          streakDays: 0,
        }
      })),
    }),
    {
      name: 'matilda-user-storage',
      storage: getStorage() as any as any,
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
