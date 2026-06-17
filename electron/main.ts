/**
 * Electron 主进程
 * 负责窗口管理、本地存储、自动更新等
 */

import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

// 开发模式标志
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow: BrowserWindow | null = null;

// 用户数据目录
const userDataPath = app.getPath('userData');
const savesDir = join(userDataPath, 'saves');

// 确保 saves 目录存在
function ensureSavesDir() {
  if (!existsSync(savesDir)) {
    mkdirSync(savesDir, { recursive: true });
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Matilda 学英语',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
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
  } else {
    // 生产模式：加载构建后的文件
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }

  // 窗口关闭时清理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 打开外部链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// IPC 处理器：存储操作
function setupStorageHandlers() {
  // 读取存储
  ipcMain.handle('storage:get', async (_event, key: string) => {
    try {
      const filePath = join(savesDir, `${key}.json`);
      if (existsSync(filePath)) {
        const data = readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  });

  // 写入存储
  ipcMain.handle('storage:set', async (_event, key: string, value: unknown) => {
    try {
      ensureSavesDir();
      const filePath = join(savesDir, `${key}.json`);
      writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  });

  // 删除存储
  ipcMain.handle('storage:remove', async (_event, key: string) => {
    try {
      const filePath = join(savesDir, `${key}.json`);
      if (existsSync(filePath)) {
        const { unlinkSync } = await import('fs');
        unlinkSync(filePath);
      }
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  });

  // 获取所有存储的键
  ipcMain.handle('storage:keys', async () => {
    try {
      ensureSavesDir();
      const { readdirSync } = await import('fs');
      const files = readdirSync(savesDir);
      return files
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace('.json', ''));
    } catch (error) {
      console.error('Storage keys error:', error);
      return [];
    }
  });

  // 导出存档（用户选择路径）
  ipcMain.handle('storage:export', async (_event, key: string) => {
    try {
      const filePath = join(savesDir, `${key}.json`);
      if (!existsSync(filePath)) {
        return { success: false, error: '存档不存在' };
      }

      const { canceled, filePath: savePath } = await dialog.showSaveDialog({
        title: '导出存档',
        defaultPath: `matilda-save-${key}.json`,
        filters: [{ name: 'JSON', extensions: ['json'] }],
      });

      if (canceled || !savePath) {
        return { success: false, error: '取消导出' };
      }

      const data = readFileSync(filePath, 'utf-8');
      writeFileSync(savePath, data, 'utf-8');
      return { success: true, path: savePath };
    } catch (error) {
      console.error('Storage export error:', error);
      return { success: false, error: String(error) };
    }
  });

  // 导入存档（用户选择文件）
  ipcMain.handle('storage:import', async (_event, key: string) => {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        title: '导入存档',
        filters: [{ name: 'JSON', extensions: ['json'] }],
        properties: ['openFile'],
      });

      if (canceled || !filePaths.length) {
        return { success: false, error: '取消导入' };
      }

      const data = readFileSync(filePaths[0], 'utf-8');
      const parsed = JSON.parse(data);

      ensureSavesDir();
      const targetPath = join(savesDir, `${key}.json`);
      writeFileSync(targetPath, JSON.stringify(parsed, null, 2), 'utf-8');

      return { success: true, data: parsed };
    } catch (error) {
      console.error('Storage import error:', error);
      return { success: false, error: String(error) };
    }
  });

  // 获取版本号
  ipcMain.handle('app:getVersion', () => {
    return app.getVersion();
  });

  // 获取平台信息
  ipcMain.handle('app:getPlatform', () => {
    return process.platform;
  });

  // 获取用户数据路径
  ipcMain.handle('app:getUserDataPath', () => {
    return userDataPath;
  });
}

// 应用准备完成
app.whenReady().then(() => {
  setupStorageHandlers();
  createWindow();

  // macOS：点击dock图标时重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出（macOS 除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 开发模式下退出时清理
app.on('before-quit', () => {
  // 清理操作
});
