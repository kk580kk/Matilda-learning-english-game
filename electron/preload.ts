/**
 * Electron 预加载脚本
 * 在渲染进程中安全地暴露 API
 */

import { contextBridge, ipcRenderer } from 'electron';

// 定义 API 类型
export interface ElectronAPI {
  storage: {
    get: (key: string) => Promise<unknown>;
    set: (key: string, value: unknown) => Promise<boolean>;
    remove: (key: string) => Promise<boolean>;
    keys: () => Promise<string[]>;
    export: (key: string) => Promise<{ success: boolean; path?: string; error?: string }>;
    import: (key: string) => Promise<{ success: boolean; data?: unknown; error?: string }>;
  };
  app: {
    getVersion: () => Promise<string>;
    getPlatform: () => Promise<string>;
    getUserDataPath: () => Promise<string>;
  };
  isElectron: boolean;
}

// 创建 API 对象
const electronAPI: ElectronAPI = {
  storage: {
    get: (key: string) => ipcRenderer.invoke('storage:get', key),
    set: (key: string, value: unknown) => ipcRenderer.invoke('storage:set', key, value),
    remove: (key: string) => ipcRenderer.invoke('storage:remove', key),
    keys: () => ipcRenderer.invoke('storage:keys'),
    export: (key: string) => ipcRenderer.invoke('storage:export', key),
    import: (key: string) => ipcRenderer.invoke('storage:import', key),
  },
  app: {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    getPlatform: () => ipcRenderer.invoke('app:getPlatform'),
    getUserDataPath: () => ipcRenderer.invoke('app:getUserDataPath'),
  },
  isElectron: true,
};

// 暴露 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// 声明全局类型
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
