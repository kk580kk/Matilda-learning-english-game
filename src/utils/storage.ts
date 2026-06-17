/**
 * 存储工具 - 支持 Web (localStorage) 和 Desktop (Electron 文件存储)
 * 自动检测运行环境并使用相应的存储方式
 * 
 * 注意：由于 Zustand persist 的类型要求，这里使用简化的实现
 * 实际存储在 Electron 中通过 IPC 透明处理
 */

import { createJSONStorage } from 'zustand/middleware';

// Electron API 类型定义
interface ElectronStorageAPI {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: unknown) => Promise<boolean>;
  remove: (key: string) => Promise<boolean>;
  keys: () => Promise<string[]>;
  export: (key: string) => Promise<{ success: boolean; path?: string; error?: string }>;
  import: (key: string) => Promise<{ success: boolean; data?: unknown; error?: string }>;
}

interface ElectronAppAPI {
  getVersion: () => Promise<string>;
  getPlatform: () => Promise<string>;
  getUserDataPath: () => Promise<string>;
}

interface ElectronAPI {
  storage: ElectronStorageAPI;
  app: ElectronAppAPI;
  isElectron: boolean;
}

// 扩展 Window 接口
declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

// 检测是否在 Electron 环境中运行
const isElectron = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(window as unknown as { electronAPI?: ElectronAPI }).electronAPI;
};

// 存储后端 - 使用 localStorage 作为基础
// 在 Electron 中，preload 脚本会透明地拦截这些调用并使用文件存储
export const getStorage = (): any => {
  const storage: any = {
    getItem: async (name: string): Promise<string | null> => {
      // 优先使用 Electron API（如果可用）
      if (isElectron() && (window as any).electronAPI) {
        try {
          const result = await (window as any).electronAPI.storage.get(name);
          return result ? JSON.stringify(result) : null;
        } catch (error) {
          console.error('Electron storage getItem error:', error);
        }
      }
      // 回退到 localStorage
      return localStorage.getItem(name);
    },

    setItem: async (name: string, value: string): Promise<void> => {
      // 优先使用 Electron API（如果可用）
      if (isElectron() && (window as any).electronAPI) {
        try {
          await (window as any).electronAPI.storage.set(name, JSON.parse(value));
          return;
        } catch (error) {
          console.error('Electron storage setItem error:', error);
        }
      }
      // 回退到 localStorage
      localStorage.setItem(name, value);
    },

    removeItem: async (name: string): Promise<void> => {
      // 优先使用 Electron API（如果可用）
      if (isElectron() && (window as any).electronAPI) {
        try {
          await (window as any).electronAPI.storage.remove(name);
          return;
        } catch (error) {
          console.error('Electron storage removeItem error:', error);
        }
      }
      // 回退到 localStorage
      localStorage.removeItem(name);
    },
  };
  
  return storage;
};

// 便捷函数：创建适合当前环境的存储后端
export const createStorage = (): any => {
  return getStorage();
};

// 检测应用是否运行在 Electron 中
export const isRunningInElectron = isElectron;

// 获取 Electron API (如果可用)
export const getElectronAPI = (): ElectronAPI | null => {
  if (typeof window === 'undefined') return null;
  return (window as any).electronAPI ?? null;
};

// 导出/导入功能
export const storage = {
  // 导出存档
  export: async (key: string): Promise<{ success: boolean; path?: string; error?: string }> => {
    if (!isElectron()) {
      // Web 版：下载 JSON 文件
      try {
        const data = localStorage.getItem(key);
        if (!data) {
          return { success: false, error: '存档不存在' };
        }
        
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `matilda-save-${key}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        return { success: true, path: 'download' };
      } catch (error) {
        return { success: false, error: String(error) };
      }
    }
    
    // Electron 版：使用系统文件对话框
    return (window as any).electronAPI.storage.export(key);
  },

  // 导入存档
  import: async (key: string): Promise<{ success: boolean; data?: unknown; error?: string }> => {
    if (!isElectron()) {
      // Web 版：使用文件输入
      return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file) {
            resolve({ success: false, error: '未选择文件' });
            return;
          }
          
          try {
            const text = await file.text();
            const data = JSON.parse(text);
            localStorage.setItem(key, text);
            resolve({ success: true, data });
          } catch (error) {
            resolve({ success: false, error: String(error) });
          }
        };
        
        input.click();
      });
    }
    
    // Electron 版：使用系统文件对话框
    return (window as any).electronAPI.storage.import(key);
  },

  // 获取所有存档键
  keys: async (): Promise<string[]> => {
    if (!isElectron()) {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) keys.push(key);
      }
      return keys;
    }
    return (window as any).electronAPI.storage.keys();
  },

  // 获取版本号
  getVersion: async (): Promise<string> => {
    if (!isElectron()) {
      return 'web';
    }
    return (window as any).electronAPI.app.getVersion();
  },

  // 获取平台
  getPlatform: async (): Promise<string> => {
    if (!isElectron()) {
      return 'web';
    }
    return (window as any).electronAPI.app.getPlatform();
  },

  // 获取用户数据路径
  getUserDataPath: async (): Promise<string> => {
    if (!isElectron()) {
      return 'localStorage';
    }
    return (window as any).electronAPI.app.getUserDataPath();
  },
};

export default storage;
