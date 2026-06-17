# Mac App Store 上架指导

**编制**: 市场营销部
**日期**: 2026-06-17
**版本**: v1.0
**状态**: 待执行

---

## 一、概述

本文档为「玛蒂尔达英语学习游戏」上架 Mac App Store 提供完整的合规审查、技术准备和提交流程指导。

### 核心结论

| 维度 | 结论 |
|------|------|
| **可行性** | ✅ 可以上架 |
| **最佳时机** | M9+（PMF 验证后，商业模式跑通） |
| **主要风险** | 版权合规 + Guideline 4.2（已提供解决方案） |
| **开发成本** | 中等（需补充原生功能层 + 合规文档） |
| **年费成本** | $99/年（Apple Developer Program） |

---

## 二、审核风险与解决方案

### 2.1 Guideline 4.2 — "不只是网页打包"

**Apple 原文要求：**
> "Your app must provide more than a minimally useful experience and should not simply repackage a website."

**风险等级**: 🔴 高（Electron 应用最常见的拒绝原因）

**解决方案 — 四层防御：**

#### 第一层：功能差异化

| 能力 | Web 版 | Electron 客户端 | 审核加分 |
|------|--------|----------------|---------|
| 离线运行 | ❌ | ✅ 完全离线 | 核心 |
| 本地存档 | ❌（仅 localStorage） | ✅ 文件系统读写、导出/备份 | 核心 |
| 系统通知 | ❌ | ✅ macOS Notification Center | 加分 |
| 文件导入 | ❌ | ✅ 拖拽导入题库 | 加分 |
| 原生菜单 | ❌ | ✅ File/Help/About 菜单 | 加分 |

#### 第二层：原生菜单集成

在 `electron/main.ts` 中添加 macOS 原生菜单栏：

```typescript
import { Menu, MenuItem } from 'electron'

const menu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      { label: 'Open Question Pack...', accelerator: 'Cmd+O', click: openQuestionPack },
      { label: 'Export Save...', click: exportSave },
      { type: 'separator' },
      { role: 'close' }
    ]
  },
  {
    label: 'Help',
    submenu: [
      { label: 'About Matilda', click: showAbout }
    ]
  }
])
Menu.setApplicationMenu(menu)
```

#### 第三层：Dock 集成

```typescript
// macOS Dock 徽章显示连胜数
app.dock.setBadge('🔥')

// 原生通知
new Notification({
  title: '成就解锁！',
  body: '恭喜完成第 5 关！',
  hasReply: false
}).show()
```

#### 第四层：提审文档说明

在 **App Review Notes** 中主动声明：

> This is NOT a web app wrapper. It is a native desktop application built with Electron that provides:
> - Full offline functionality without internet connection
> - Local file system access for save data export/import
> - Native macOS menu bar integration
> - Native Notification Center integration
> - Dock badge integration for progress tracking
>
> The app provides significantly more functionality than any web version could offer.

---

### 2.2 版权合规 — 《Matilda》原著引用

**现状**: Matilda 出版于 1988 年，Roald Dahl 1990 年去世，版权保护期远未到期。

**风险等级**: 🟡 中（Apple 审核不主动审查版权，但版权方投诉会导致下架）

**解决方案 — 五层防御：**

| 层级 | 措施 | 状态 |
|------|------|------|
| 1. 最小引用 | 仅用于阅读理解题目中的短文片段（非传播原著） | ✅ 已有 |
| 2. 出处标注 | 每道题标注来源（书名、章节） | ✅ 已有 |
| 3. 教育声明 | App 内添加版权免责声明 | ⏳ 待添加 |
| 4. 原著不打包 | `.gitignore` 排除原著文件 | ✅ 已有 |
| 5. Plan B | 公版书替代题库（48 小时内可切换） | ⏳ 待准备 |

**待添加的教育声明（放在 App 内 About 页面）：**

> 本产品为教育学习工具，引用的原著片段属于合理使用范围（Fair Use），用于教育目的的评论、研究和教学。
> 《Matilda》版权归 Roald Dahl Estate 所有。本产品不包含原著完整内容。

**Plan B — 公版书替代方案：**

| 公版书 | 出版年份 | 版权状态 |
|--------|----------|----------|
| Alice's Adventures in Wonderland | 1865 | ✅ 已进入公版 |
| The Wonderful Wizard of Oz | 1900 | ✅ 已进入公版 |
| Peter Pan (原著) | 1911 | ⚠️ 部分国家仍受保护 |
| The Secret Garden | 1911 | ⚠️ 部分国家仍受保护 |

建议优先准备 Alice 题库作为备选。

---

### 2.3 儿童隐私合规

**目标用户 10-13 岁，属于儿童保护范围。**

**风险等级**: 🟡 中

| 要求 | Apple 规定 | 我们的应对 |
|------|-----------|-----------|
| 隐私政策 | 必须有 | ⏳ 待编写 |
| 个人信息收集 | 需家长同意 | ✅ 当前不收集任何个人信息 |
| COPPA 合规 | 13 岁以下需家长同意 | ✅ 匿名模式，不收集数据 |
| 广告追踪 | 禁止向儿童投放定向广告 | ✅ 无广告 |

**当前状态**: 客户端本地存储、匿名模式、无外部数据收集，**天然符合 COPPA 要求**。

**待完成**: App Store 页面需添加隐私政策链接（可放在官网）。

---

### 2.4 内容适龄评级

| 评级 | 说明 | 推荐 |
|------|------|------|
| **4+** | 无令人反感的内容 | ✅ 推荐（覆盖面最广） |
| **9+** |  mild/infrequent cartoon violence | 备选 |
| **12+** |  mild/infrequent mature themes | 不推荐 |

玛蒂尔达内容温和，无暴力、无成人内容，**推荐评级 4+**。

---

## 三、技术准备清单

### 3.1 构建管线

```
npm run build          → dist/（Web 产物）
npm run electron:build → releases/（桌面安装包）
                         ├── .dmg（macOS）
                         └── .exe / .msi（Windows）
```

### 3.2 App Store 专用构建

```bash
# 1. 安装 electron-builder
npm install --save-dev electron-builder

# 2. 配置 package.json 中的 build 字段
# 3. 构建 Mac App Store 版本
npm run build:mas

# 4. 用 Xcode 的 Application Loader 上传
xcrun altool --upload-app -f Matilda.pkg -u <apple_id> -p <app_password>
```

### 3.3 package.json 必需配置

```json
{
  "build": {
    "appId": "com.matilda.learning.english",
    "productName": "Matilda English Learning Game",
    "mac": {
      "category": "public.app-category.education",
      "entitlements": "build/entitlements.mac.plist",
      "entitlementsInherit": "build/entitlements.mac.inherit.plist",
      "hardenedRuntime": true,
      "gatekeeperAssess": false
    },
    "mas": {
      "entitlements": "build/entitlements.mas.plist",
      "entitlementsInherit": "build/entitlements.mas.inherit.plist",
      "provisioningProfile": "Matilda.provisionprofile",
      "hardenedRuntime": false
    }
  }
}
```

### 3.4 必需文件

| 文件 | 用途 |
|------|------|
| 应用图标 1024×1024 | App Store 展示 + Dock 图标 |
| 截图（1920×1080 / 2560×1600） | App Store 页面展示 |
| 隐私政策 | App Store 必填项 |
| 教育免责声明 | App 内 About 页面 |
| 预览视频（可选） | App Store 可上传 30-120s 视频 |

---

## 四、提交流程

### 4.1 准备工作（预计 2-3 周）

```
Week 1: 原生功能开发
├── 本地存档系统（save/load/export）
├── macOS 原生菜单栏
├── Notification Center 集成
├── Dock 徽章集成
└── 教育免责声明页面

Week 2: 构建与测试
├── 配置 electron-builder MAS 构建
├── 申请 Apple Developer Program（$99/年）
├── 创建 App Store Connect 应用记录
├── 准备隐私政策页面
├── 准备截图和文案
└── 准备 Plan B 公版书题库

Week 3: 审核预检
├── 内部测试 MAS 构建版本
├── 检查所有 App Review Guidelines
├── 编写 App Review Notes
├── 填写合规问卷（儿童隐私、数据收集）
└── 提交 TestFlight 内测（可选）
```

### 4.2 提交流程

```
1. 创建 App Store Connect 应用记录
   ├── 名称：Matilda English Learning Game
   ├── 分类：Education
   ├── 主要语言：English
   └── 评级：4+

2. 构建 MAS 版本
   └── npm run build:mas

3. 上传到 App Store Connect
   └── xcrun altool --upload-app ...

4. 填写提交信息
   ├── 版本说明（What's New）
   ├── 营销文本
   ├── 关键词（education, english, learning, game, reading）
   ├── 支持网址
   ├── 隐私政策网址
   └── App Review Notes（关键！）

5. 提交审核
   └── 等待 1-2 周
```

### 4.3 审核可能遇到的问题

| 问题代码 | 说明 | 应对 |
|----------|------|------|
| 4.2 | 应用只是网页打包 | 提供 App Review Notes，强调原生能力 |
| 5.1.1 | 数据收集/隐私问题 | 确认不收集个人信息 |
| 3.1.1 | 需要订阅内购 | 确认无内购（如有，需走 IAP 流程） |
| 2.3 | 准确元数据 | 截图与功能一致，不夸大 |

---

## 五、商业影响

### 5.1 成本

| 项目 | 费用 |
|------|------|
| Apple Developer Program | $99/年（约 ¥700/年） |
| 开发人力 | 2-3 周（约 ¥5,000-8,000） |
| 每次更新审核 | 时间成本 1-2 周 |
| 内购抽成 | 15%（年营收 < $1M） |

### 5.2 收益预估

| 指标 | 估算 |
|------|------|
| App Store 教育类自然流量 | 500-2,000 下载/月 |
| 家长信任带来的转化提升 | +15-25% |
| 付费版/内购渗透率 | 3-5% |

### 5.3 与现有渠道的关系

```
┌─────────────────────────────────────────────────┐
│                   分发矩阵                       │
├──────────────┬──────────────┬───────────────────┤
│  渠道        │  定位        │  目标用户          │
├──────────────┼──────────────┼───────────────────┤
│ GitHub Pages │  零门槛入口  │  教师、技术用户     │
│ GitHub Rel.  │  内测/公测   │  家长、深度用户     │
│ Mac App Store│  正式商用    │  家长、大众用户     │
└──────────────┴──────────────┴───────────────────┘

三者并行，互不影响。App Store 是信任背书，不是替代品。
```

---

## 六、决策时间线

```
M1-M3  PMF 验证
       └── 专注 Web 版获客，不上 Store

M4-M5  Electron 客户端
       └── GitHub Releases 分发
       └── 验证离线功能、本地存档

M6     M6 决策门
       └── 如果 PMF 已验证 → 启动 Store 准备
       └── 如果未验证 → 推迟

M7-M8  Store 准备期
       └── 原生功能完善
       └── 合规文档、截图、隐私政策

M9     提交审核
       └── 1-2 周等待
       └── 首次提交建议预留修复时间

M10    正式上线 Mac App Store
```

---

## 七、附录

### 7.1 Apple Review Guidelines 关键条目

| 条目 | 内容 | 适用情况 |
|------|------|---------|
| 2.1 | App 完成度 | 确保无崩溃、无占位内容 |
| 2.3 | 准确元数据 | 截图与功能一致 |
| 3.1.1 | 内购 | 如有付费功能需走 IAP |
| 4.2 | 最小实用性 | 核心障碍，需重点应对 |
| 5.1.1 | 数据收集/隐私 | 儿童应用重点审查 |

### 7.2 Electron MAS 构建资源

- [electron-builder MAS 文档](https://www.electron.build/configuration/mas)
- [Apple Mac App Store 提交指南](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases)
- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

---

> **核心策略**：PMF 验证后再上 Store，提前准备好原生功能和合规文档，一次通过率 > 70%。
