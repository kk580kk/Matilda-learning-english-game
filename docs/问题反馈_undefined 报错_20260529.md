# 问题反馈：GET /undefined 报错

**报告日期**: 2026-05-29  
**报告人**: QA 测试工程师  
**严重性**: 🔴 高

---

## 问题描述

访问 https://kk580kk.github.io/Matilda-learning-english-game/ 时，浏览器控制台出现：
```
GET https://kk580kk.github.io/Matilda-learning-english-game/undefined 404
```

---

## 问题定位

### 根本原因：showScreen 参数错误

**文件**: `js/game.js`  
**行号**: 第 152 行

**问题代码**:
```javascript
startLevel(levelId) {
    // ...
    this.showScreen('gameScreen');  // ❌ 错误：使用了驼峰命名
    // ...
}
```

**showScreen 函数检查**:
```javascript
showScreen(screenId) {
    // ...
    if (screenId === 'game-screen') {  // ✅ 期望：连字符命名
        // 显示游戏界面
    }
    // ...
}
```

### 影响

1. 界面状态切换失败
2. 可能导致后续资源加载路径错误
3. 用户无法正常进入游戏界面

---

## 修复方案

### 方案 1：修复调用参数（推荐）

```javascript
// js/game.js 第 152 行
this.showScreen('game-screen');  // 使用连字符
```

### 方案 2：统一命名规范

如果希望使用驼峰命名，需要同时修改：
1. showScreen 函数中的判断条件
2. HTML 中的 id 属性
3. 所有调用 showScreen 的地方

---

## 验证步骤

1. 修复代码后推送 GitHub
2. 等待 GitHub Pages 自动部署（约 1-2 分钟）
3. 刷新页面 https://kk580kk.github.io/Matilda-learning-english-game/
4. 打开浏览器开发者工具 → Network 面板
5. 确认没有 /undefined 请求
6. 确认界面切换正常

---

## 相关问题分析

此问题与之前 QA 验收报告中的"界面叠加严重"问题相关：
- 界面状态管理失效导致所有界面同时显示
- 修复 showScreen 参数后，界面切换逻辑应恢复正常

---

**状态**: ⏳ 待开发修复  
**指派**: 开发团队
