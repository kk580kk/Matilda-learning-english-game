/**
 * 学习进度 Store
 * 管理当前关卡学习流程、答题、阶段进度
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getStorage } from '../utils/storage';
import {  
  LevelLearningProgress,
  LearningPhase,
  LevelReport,
  AssessmentResult,
  Question,
  LevelConfig,
  FeynmanStage,
  FeynmanOutput
} from '../types';
import { assessmentEngine } from '../services/assessmentEngine';

interface LearningState {
  // 当前学习
  currentLevelId: string | null;
  currentPhase: LearningPhase;
  levelProgress: Record<string, LevelLearningProgress>;
  
  // 当前答题
  currentQuestionIndex: number;
  currentQuestions: Question[];
  answers: Record<string, { answer: string; timeSpent: number }>;
  
  // 费曼输出
  feynmanOutputs: FeynmanOutput[];
  currentFeynmanStage: FeynmanStage;
  
  // 报告
  currentReport: LevelReport | null;
  
  // Actions
  startLevel: (levelId: string) => void;
  setPhase: (phase: LearningPhase) => void;
  nextPhase: () => void;
  
  // Question Actions
  setQuestions: (questions: Question[]) => void;
  submitAnswer: (questionId: string, answer: string, timeSpent?: number) => void;
  
  // Feynman Actions
  addFeynmanOutput: (output: FeynmanOutput) => void;
  setFeynmanStage: (stage: FeynmanStage) => void;
  nextFeynmanStage: () => void;
  
  // Level Actions
  finishLevel: (config: LevelConfig, userAbilities: any) => void;
  resetLevel: () => void;
}

const initialState = {
  currentLevelId: null,
  currentPhase: LearningPhase.STORY_INTRO,
  levelProgress: {},
  currentQuestionIndex: 0,
  currentQuestions: [],
  answers: {},
  feynmanOutputs: [],
  currentFeynmanStage: FeynmanStage.LEARN,
  currentReport: null,
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      startLevel: (levelId) => set({
        currentLevelId: levelId,
        currentPhase: LearningPhase.STORY_INTRO,
        currentQuestionIndex: 0,
        currentQuestions: [],
        answers: {},
        feynmanOutputs: [],
        currentFeynmanStage: FeynmanStage.LEARN,
        currentReport: null,
      }),
      
      setPhase: (phase) => set({ currentPhase: phase }),
      
      nextPhase: () => {
        const phases = Object.values(LearningPhase);
        const current = get().currentPhase;
        const index = phases.indexOf(current);
        if (index < phases.length - 1) {
          set({ currentPhase: phases[index + 1] });
        }
      },
      
      setQuestions: (questions) => set({
        currentQuestions: questions,
        currentQuestionIndex: 0,
        answers: {},
      }),
      
      submitAnswer: (questionId, answer, timeSpent = 0) => set((state) => ({
        answers: { 
          ...state.answers, 
          [questionId]: { answer, timeSpent } 
        },
        currentQuestionIndex: state.currentQuestionIndex + 1,
      })),
      
      addFeynmanOutput: (output) => set((state) => ({
        feynmanOutputs: [...state.feynmanOutputs, output],
      })),
      
      setFeynmanStage: (stage) => set({ currentFeynmanStage: stage }),
      
      nextFeynmanStage: () => {
        const stages = Object.values(FeynmanStage);
        const current = get().currentFeynmanStage;
        const index = stages.indexOf(current);
        if (index < stages.length - 1) {
          set({ currentFeynmanStage: stages[index + 1] });
        }
      },
      
      finishLevel: (config, userAbilities) => {
        const { answers, currentLevelId, currentQuestions, feynmanOutputs } = get();
        
        if (!currentLevelId) return;
        
        // 评分所有答案
        const results: AssessmentResult[] = [];
        
        for (const question of currentQuestions) {
          const answerRecord = answers[question.id];
          if (!answerRecord) continue;
          
          const result = assessmentEngine.grade(
            question, 
            answerRecord.answer, 
            answerRecord.timeSpent
          );
          results.push(result);
        }
        
        // 生成报告
        const assessmentConfig: any = {
          questionCount: config.learningFlow.find(
            f => f.phase === LearningPhase.ASSESSMENT
          )?.assessment?.questionCount || 10,
          questionTypes: config.learningFlow.find(
            f => f.phase === LearningPhase.ASSESSMENT
          )?.assessment?.questionTypes || [],
          passingScore: config.learningFlow.find(
            f => f.phase === LearningPhase.ASSESSMENT
          )?.assessment?.passingScore || 60,
          levelId: currentLevelId,
        };
        
        const report = assessmentEngine.generateLevelReport(
          currentLevelId,
          results,
          assessmentConfig,
          userAbilities
        );
        
        // 更新关卡进度
        const progress: LevelLearningProgress = {
          levelId: currentLevelId,
          completedPhases: Object.values(LearningPhase),
          currentPhase: LearningPhase.ASSESSMENT,
          phaseScores: report.phaseScores,
          totalScore: report.totalScore,
          startedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          questions: results.map(r => ({
            questionId: r.questionId,
            answer: r.userAnswer,
            isCorrect: r.isCorrect,
            timeSpent: r.timeSpent,
          })),
          feynmanOutputs,
          wrongQuestions: report.wrongQuestionIds,
        };
        
        set((state) => ({
          currentReport: report,
          levelProgress: {
            ...state.levelProgress,
            [currentLevelId]: progress,
          },
        }));
      },
      
      resetLevel: () => set(initialState),
    }),
    {
      name: 'matilda-learning-storage',
      storage: getStorage() as any,
      partialize: (state) => ({
        currentLevelId: state.currentLevelId,
        currentPhase: state.currentPhase,
        levelProgress: state.levelProgress,
      }),
    }
  )
);

// Selectors
export const selectCurrentPhase = (state: LearningState) => state.currentPhase;
export const selectCurrentLevel = (state: LearningState) => state.currentLevelId;
export const selectCurrentReport = (state: LearningState) => state.currentReport;
export const selectAnsweredQuestions = (state: LearningState) => Object.keys(state.answers);
export const selectTotalQuestions = (state: LearningState) => state.currentQuestions.length;
export const selectCurrentQuestion = (state: LearningState) => {
  const { currentQuestions, currentQuestionIndex } = state;
  return currentQuestions[currentQuestionIndex] || null;
};
