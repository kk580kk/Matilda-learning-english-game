# 玛蒂尔达魔法书 - 项目结构规范

## 目录结构

```
Matilda-learning-english-game/
├── index.html              # 主入口文件
├── README.md               # 项目说明
├── LICENSE                 # 许可证文件
├── docs/                   # 文档目录
│   └── ...
├── css/                    # 样式文件目录
│   └── style.css           # 主样式文件
├── js/                     # JavaScript 文件目录
│   ├── game.js             # 游戏主逻辑
│   └── questions.js        # 题目数据
├── assets/                 # 静态资源目录（图片、音频等）
│   ├── images/
│   ├── audio/
│   └── fonts/
└── tests/                  # 测试文件目录
    └── ...
```

## 文件命名规则

1. **HTML 文件**: 小写，使用连字符分隔，如 `index.html`, `game-over.html`
2. **CSS 文件**: 小写，使用连字符分隔，如 `style.css`, `game-ui.css`
3. **JS 文件**: 小写，使用连字符分隔，如 `game.js`, `audio-player.js`
4. **资源文件**: 小写，使用连字符分隔，如 `background-music.mp3`, `matilda-avatar.png`

## 引用规则

### HTML 中引用 CSS
```html
<link rel="stylesheet" href="css/style.css">
```

### HTML 中引用 JS
```html
<script src="js/game.js"></script>
<script src="js/questions.js"></script>
```

### CSS 中引用资源
```css
background-image: url('../assets/images/background.png');
```

## 禁止事项

1. **不要在根目录存放 CSS/JS 文件** - 所有样式和脚本必须放在 `css/` 和 `js/` 目录
2. **不要创建重复文件** - 确保每个文件只有一份，避免版本混乱
3. **不要使用相对路径 `../` 引用同级目录文件** - 统一从根目录开始组织
4. **不要修改目录结构后忘记更新引用** - 移动文件时必须同步更新所有引用

## 版本控制

- 使用 Git 进行版本控制
- 重要修改前创建分支
- 提交信息要清晰描述修改内容

## 开发流程

1. 修改前确认文件位置符合本规范
2. 修改后测试所有功能正常
3. 提交前检查没有创建重复文件
4. 定期清理未使用的文件
