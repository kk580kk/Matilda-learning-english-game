"use strict";
/**
 * Electron 预加载脚本
 * 在渲染进程中安全地暴露 API
 */
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// 创建 API 对象
const electronAPI = {
    storage: {
        get: (key) => electron_1.ipcRenderer.invoke('storage:get', key),
        set: (key, value) => electron_1.ipcRenderer.invoke('storage:set', key, value),
        remove: (key) => electron_1.ipcRenderer.invoke('storage:remove', key),
        keys: () => electron_1.ipcRenderer.invoke('storage:keys'),
        export: (key) => electron_1.ipcRenderer.invoke('storage:export', key),
        import: (key) => electron_1.ipcRenderer.invoke('storage:import', key),
    },
    app: {
        getVersion: () => electron_1.ipcRenderer.invoke('app:getVersion'),
        getPlatform: () => electron_1.ipcRenderer.invoke('app:getPlatform'),
        getUserDataPath: () => electron_1.ipcRenderer.invoke('app:getUserDataPath'),
    },
    isElectron: true,
};
// 暴露 API 到渲染进程
electron_1.contextBridge.exposeInMainWorld('electronAPI', electronAPI);
//# sourceMappingURL=preload.js.map