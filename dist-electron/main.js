"use strict";
/**
 * Electron 主进程
 * 负责窗口管理、本地存储、自动更新等
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const fs_1 = require("fs");
// 开发模式标志
const isDev = process.env.NODE_ENV === 'development' || !electron_1.app.isPackaged;
let mainWindow = null;
// 用户数据目录
const userDataPath = electron_1.app.getPath('userData');
const savesDir = (0, path_1.join)(userDataPath, 'saves');
// 确保 saves 目录存在
function ensureSavesDir() {
    if (!(0, fs_1.existsSync)(savesDir)) {
        (0, fs_1.mkdirSync)(savesDir, { recursive: true });
    }
}
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        title: 'Matilda 学英语',
        webPreferences: {
            preload: (0, path_1.join)(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
        // macOS 专用设置
        ...(process.platform === 'darwin' ? {
            titleBarStyle: 'hiddenInset',
            trafficLightPosition: { x: 15, y: 15 },
        } : {}),
    });
    // 加载应用
    if (isDev) {
        // 开发模式：加载 Vite dev server
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    }
    else {
        // 生产模式：加载构建后的文件
        mainWindow.loadFile((0, path_1.join)(__dirname, '../dist/index.html'));
    }
    // 窗口关闭时清理
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // 打开外部链接
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        electron_1.shell.openExternal(url);
        return { action: 'deny' };
    });
}
// IPC 处理器：存储操作
function setupStorageHandlers() {
    // 读取存储
    electron_1.ipcMain.handle('storage:get', async (_event, key) => {
        try {
            const filePath = (0, path_1.join)(savesDir, `${key}.json`);
            if ((0, fs_1.existsSync)(filePath)) {
                const data = (0, fs_1.readFileSync)(filePath, 'utf-8');
                return JSON.parse(data);
            }
            return null;
        }
        catch (error) {
            console.error('Storage get error:', error);
            return null;
        }
    });
    // 写入存储
    electron_1.ipcMain.handle('storage:set', async (_event, key, value) => {
        try {
            ensureSavesDir();
            const filePath = (0, path_1.join)(savesDir, `${key}.json`);
            (0, fs_1.writeFileSync)(filePath, JSON.stringify(value, null, 2), 'utf-8');
            return true;
        }
        catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    });
    // 删除存储
    electron_1.ipcMain.handle('storage:remove', async (_event, key) => {
        try {
            const filePath = (0, path_1.join)(savesDir, `${key}.json`);
            if ((0, fs_1.existsSync)(filePath)) {
                const { unlinkSync } = await Promise.resolve().then(() => __importStar(require('fs')));
                unlinkSync(filePath);
            }
            return true;
        }
        catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    });
    // 获取所有存储的键
    electron_1.ipcMain.handle('storage:keys', async () => {
        try {
            ensureSavesDir();
            const { readdirSync } = await Promise.resolve().then(() => __importStar(require('fs')));
            const files = readdirSync(savesDir);
            return files
                .filter(f => f.endsWith('.json'))
                .map(f => f.replace('.json', ''));
        }
        catch (error) {
            console.error('Storage keys error:', error);
            return [];
        }
    });
    // 导出存档（用户选择路径）
    electron_1.ipcMain.handle('storage:export', async (_event, key) => {
        try {
            const filePath = (0, path_1.join)(savesDir, `${key}.json`);
            if (!(0, fs_1.existsSync)(filePath)) {
                return { success: false, error: '存档不存在' };
            }
            const { canceled, filePath: savePath } = await electron_1.dialog.showSaveDialog({
                title: '导出存档',
                defaultPath: `matilda-save-${key}.json`,
                filters: [{ name: 'JSON', extensions: ['json'] }],
            });
            if (canceled || !savePath) {
                return { success: false, error: '取消导出' };
            }
            const data = (0, fs_1.readFileSync)(filePath, 'utf-8');
            (0, fs_1.writeFileSync)(savePath, data, 'utf-8');
            return { success: true, path: savePath };
        }
        catch (error) {
            console.error('Storage export error:', error);
            return { success: false, error: String(error) };
        }
    });
    // 导入存档（用户选择文件）
    electron_1.ipcMain.handle('storage:import', async (_event, key) => {
        try {
            const { canceled, filePaths } = await electron_1.dialog.showOpenDialog({
                title: '导入存档',
                filters: [{ name: 'JSON', extensions: ['json'] }],
                properties: ['openFile'],
            });
            if (canceled || !filePaths.length) {
                return { success: false, error: '取消导入' };
            }
            const data = (0, fs_1.readFileSync)(filePaths[0], 'utf-8');
            const parsed = JSON.parse(data);
            ensureSavesDir();
            const targetPath = (0, path_1.join)(savesDir, `${key}.json`);
            (0, fs_1.writeFileSync)(targetPath, JSON.stringify(parsed, null, 2), 'utf-8');
            return { success: true, data: parsed };
        }
        catch (error) {
            console.error('Storage import error:', error);
            return { success: false, error: String(error) };
        }
    });
    // 获取版本号
    electron_1.ipcMain.handle('app:getVersion', () => {
        return electron_1.app.getVersion();
    });
    // 获取平台信息
    electron_1.ipcMain.handle('app:getPlatform', () => {
        return process.platform;
    });
    // 获取用户数据路径
    electron_1.ipcMain.handle('app:getUserDataPath', () => {
        return userDataPath;
    });
}
// 应用准备完成
electron_1.app.whenReady().then(() => {
    setupStorageHandlers();
    createWindow();
    // macOS：点击dock图标时重新创建窗口
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// 所有窗口关闭时退出（macOS 除外）
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// 开发模式下退出时清理
electron_1.app.on('before-quit', () => {
    // 清理操作
});
//# sourceMappingURL=main.js.map