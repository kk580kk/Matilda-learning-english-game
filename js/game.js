// 玛蒂尔达的魔法书 - 游戏主逻辑

// ========== V1.0: 用户系统 (F-007) ==========
class UserManager {
    constructor() {
        this.STORAGE_KEYS = {
            USER: 'matilda_user',
            PROGRESS: 'matilda_progress',
            SETTINGS: 'matilda_settings',
            ACCOUNTS: 'matilda_accounts'
        };
        
        // 当前登录用户
        this.currentUser = null;
        
        // 加载当前用户
        this.loadCurrentUser();
    }

    // 生成 UUID
    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // 获取默认用户数据结构
    getDefaultUser() {
        return {
            id: this.generateId(),
            nickname: '',
            avatar: '🧙‍♀️',
            level: 1,
            exp: 0,
            gold: 0,
            completedLevels: [],
            unlockedLevels: [1],
            inventory: { freeze: 3, skip: 2, eliminate: 2 },
            settings: { sound: true, music: true },
            createdAt: new Date().toISOString(),
            isGuest: true
        };
    }

    // 获取默认进度
    getDefaultProgress() {
        return {
            currentLevel: 1,
            completedLevels: [],
            unlockedLevels: [1],
            coins: 0,
            inventory: { freeze: 3, skip: 2, remove: 2 },
            totalExp: 0,
            playCount: 0,
            lastPlayDate: null
        };
    }

    // 获取所有已注册账户
    getAllAccounts() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.ACCOUNTS);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    // 保存账户列表
    saveAccounts(accounts) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
            return true;
        } catch (e) {
            console.error('保存账户列表失败:', e);
            return false;
        }
    }

    // 注册新用户
    register(nickname, password) {
        const accounts = this.getAllAccounts();
        
        // 检查昵称是否已存在
        if (accounts.some(acc => acc.nickname === nickname)) {
            return { success: false, message: '昵称已存在' };
        }
        
        // 创建新用户
        const newUser = this.getDefaultUser();
        newUser.nickname = nickname;
        newUser.isGuest = false;
        newUser.password = this.hashPassword(password);
        
        accounts.push(newUser);
        this.saveAccounts(accounts);
        
        // 自动登录
        this.setCurrentUser(newUser);
        
        return { success: true, user: newUser };
    }

    // 简单密码哈希
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(16);
    }

    // 登录
    login(nickname, password) {
        const accounts = this.getAllAccounts();
        const user = accounts.find(acc => 
            acc.nickname === nickname && acc.password === this.hashPassword(password)
        );
        
        if (user) {
            this.setCurrentUser(user);
            return { success: true, user: user };
        }
        
        return { success: false, message: '昵称或密码错误' };
    }

    // 登出
    logout() {
        this.currentUser = null;
        localStorage.removeItem(this.STORAGE_KEYS.USER);
        
        // 重置为游客模式
        const guestProgress = this.getDefaultProgress();
        this.saveProgress(guestProgress);
    }

    // 设置当前用户
    setCurrentUser(user) {
        this.currentUser = user;
        try {
            localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
        } catch (e) {
            console.error('保存当前用户失败:', e);
        }
    }

    // 加载当前用户
    loadCurrentUser() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.USER);
            if (data) {
                this.currentUser = JSON.parse(data);
            }
        } catch (e) {
            console.error('加载当前用户失败:', e);
            this.currentUser = null;
        }
    }

    // 检查是否已登录（非游客）
    isLoggedIn() {
        return this.currentUser && !this.currentUser.isGuest;
    }

    // 获取当前用户信息
    getUserInfo() {
        return this.currentUser || this.getDefaultUser();
    }

    // 更新用户信息
    updateUserInfo(updates) {
        if (!this.currentUser) return false;
        
        Object.assign(this.currentUser, updates);
        this.setCurrentUser(this.currentUser);
        
        // 同时更新账户列表中的数据
        const accounts = this.getAllAccounts();
        const index = accounts.findIndex(acc => acc.id === this.currentUser.id);
        if (index !== -1) {
            accounts[index] = this.currentUser;
            this.saveAccounts(accounts);
        }
        
        return true;
    }

    // 保存进度
    saveProgress(progressData) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.PROGRESS, JSON.stringify(progressData));
            return true;
        } catch (e) {
            console.error('保存进度失败:', e);
            return false;
        }
    }

    // 加载进度
    loadProgress() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.PROGRESS);
            return data ? JSON.parse(data) : this.getDefaultProgress();
        } catch (e) {
            console.error('加载进度失败:', e);
            return this.getDefaultProgress();
        }
    }

    // 保存设置
    saveSettings(settings) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
            return true;
        } catch (e) {
            console.error('保存设置失败:', e);
            return false;
        }
    }

    // 加载设置
    loadSettings() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
            return data ? JSON.parse(data) : { sound: true, music: true };
        } catch (e) {
            return { sound: true, music: true };
        }
    }

    // 玩家升级所需经验值
    getExpForLevel(level) {
        return level * 100;
    }

    // 添加经验值并检查升级
    addExp(exp) {
        if (!this.currentUser) return;
        
        this.currentUser.exp += exp;
        const expNeeded = this.getExpForLevel(this.currentUser.level);
        
        while (this.currentUser.exp >= expNeeded) {
            this.currentUser.exp -= expNeeded;
            this.currentUser.level++;
        }
        
        this.setCurrentUser(this.currentUser);
    }

    // 添加金币
    addGold(amount) {
        if (!this.currentUser) return;
        this.currentUser.gold = (this.currentUser.gold || 0) + amount;
        this.setCurrentUser(this.currentUser);
    }

    // 扣除金币
    subtractGold(amount) {
        if (!this.currentUser) return false;
        if (this.currentUser.gold < amount) return false;
        
        this.currentUser.gold -= amount;
        this.setCurrentUser(this.currentUser);
        return true;
    }
}

// ========== V1.0: 语音识别管理器 ==========
class SpeechRecognitionManager {
    constructor() {
        this.recognition = null;
        this.isSupported = this.checkSupport();
    }

    checkSupport() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    }

    // 计算编辑距离（Levenshtein Distance）
    levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    // 计算相似度分数 (0-100)
    calculateScore(spoken, target) {
        // 转换为小写，去除标点和多余空格
        const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
        const spokenNorm = normalize(spoken);
        const targetNorm = normalize(target);

        if (spokenNorm === targetNorm) return 100;
        if (!spokenNorm) return 0;

        const distance = this.levenshteinDistance(spokenNorm, targetNorm);
        const maxLength = Math.max(spokenNorm.length, targetNorm.length);
        const similarity = ((maxLength - distance) / maxLength) * 100;
        return Math.round(Math.max(0, Math.min(100, similarity)));
    }

    startRecognition(targetSentence, onResult, onError) {
        if (!this.isSupported) {
            onError({ error: 'not-supported' });
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const score = this.calculateScore(transcript, targetSentence);
            onResult({ transcript, score });
        };

        this.recognition.onerror = (event) => {
            onError({ error: event.error, message: event.message });
        };

        this.recognition.onend = () => {
            // 自动结束
        };

        try {
            this.recognition.start();
        } catch (e) {
            onError({ error: 'start-failed', message: e.message });
        }
    }

    stop() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (e) {
                // 忽略停止时的错误
            }
        }
    }
}

// ========== 排行榜管理器 (F-009) ==========
class LeaderboardManager {
    static STORAGE_KEY = 'matilda_leaderboard';

    constructor() {
        this.currentType = 'level'; // level | gold | rank
        this.leaderboardData = [];
        this.initMockData();
    }

    // 初始化模拟数据
    initMockData() {
        const mockPlayers = [
            { id: 'mock_1', nickname: '魔法小天才', avatar: '🧙‍♀️', completedLevels: 4, gold: 500, level: 5 },
            { id: 'mock_2', nickname: '英语大神', avatar: '🦸', completedLevels: 4, gold: 450, level: 4 },
            { id: 'mock_3', nickname: '冒险王', avatar: '🐉', completedLevels: 3, gold: 380, level: 4 },
            { id: 'mock_4', nickname: '小巫师', avatar: '🧝', completedLevels: 3, gold: 320, level: 3 },
            { id: 'mock_5', nickname: '单词达人', avatar: '📚', completedLevels: 3, gold: 280, level: 3 },
            { id: 'mock_6', nickname: '勇敢的心', avatar: '⚔️', completedLevels: 2, gold: 250, level: 3 },
            { id: 'mock_7', nickname: '星光之路', avatar: '✨', completedLevels: 2, gold: 200, level: 2 },
            { id: 'mock_8', nickname: '魔法少女', avatar: '👸', completedLevels: 2, gold: 180, level: 2 },
            { id: 'mock_9', nickname: '龙的传人', avatar: '🐲', completedLevels: 1, gold: 150, level: 2 },
            { id: 'mock_10', nickname: '森林精灵', avatar: '🧚', completedLevels: 1, gold: 120, level: 1 },
            { id: 'mock_11', nickname: '独角兽', avatar: '🦄', completedLevels: 1, gold: 100, level: 1 },
            { id: 'mock_12', nickname: '小水滴', avatar: '💧', completedLevels: 1, gold: 80, level: 1 },
            { id: 'mock_13', nickname: '火焰之心', avatar: '🔥', completedLevels: 1, gold: 60, level: 1 },
            { id: 'mock_14', nickname: '风之翼', avatar: '🪶', completedLevels: 1, gold: 50, level: 1 },
            { id: 'mock_15', nickname: '月亮之上', avatar: '🌙', completedLevels: 1, gold: 30, level: 1 }
        ];
        this.leaderboardData = mockPlayers;
        this.saveLeaderboard();
    }

    // 保存排行榜数据到本地存储
    saveLeaderboard() {
        try {
            localStorage.setItem(LeaderboardManager.STORAGE_KEY, JSON.stringify(this.leaderboardData));
            return true;
        } catch (e) {
            console.error('保存排行榜数据失败:', e);
            return false;
        }
    }

    // 从本地存储加载排行榜数据
    loadLeaderboard() {
        try {
            const data = localStorage.getItem(LeaderboardManager.STORAGE_KEY);
            if (data) {
                this.leaderboardData = JSON.parse(data);
            }
        } catch (e) {
            console.error('加载排行榜数据失败:', e);
        }
    }

    // 获取排序后的排行榜数据
    getSortedLeaderboard(type = 'level') {
        this.currentType = type;
        const sorted = [...this.leaderboardData];

        switch (type) {
            case 'level':
                sorted.sort((a, b) => b.completedLevels - a.completedLevels);
                break;
            case 'gold':
                sorted.sort((a, b) => b.gold - a.gold);
                break;
            case 'rank':
                sorted.sort((a, b) => b.level - a.level);
                break;
        }

        return sorted;
    }

    // 获取当前玩家的排名
    getMyRank(userInfo) {
        if (!userInfo) return -1;

        const sorted = this.getSortedLeaderboard(this.currentType);
        const myIndex = sorted.findIndex(p => p.id === userInfo.id);

        return myIndex !== -1 ? myIndex + 1 : -1;
    }

    // 更新玩家数据
    updatePlayerData(userInfo) {
        if (!userInfo) return false;

        // 查找现有玩家
        let player = this.leaderboardData.find(p => p.id === userInfo.id);

        if (player) {
            // 更新现有玩家
            player.nickname = userInfo.nickname || player.nickname;
            player.avatar = userInfo.avatar || player.avatar;
            player.completedLevels = Math.max(player.completedLevels, userInfo.completedLevels || 0);
            player.gold = Math.max(player.gold, userInfo.gold || 0);
            player.level = Math.max(player.level, userInfo.level || 1);
        } else {
            // 添加新玩家
            this.leaderboardData.push({
                id: userInfo.id,
                nickname: userInfo.nickname || '小巫师',
                avatar: userInfo.avatar || '🧙‍♀️',
                completedLevels: userInfo.completedLevels || 0,
                gold: userInfo.gold || 0,
                level: userInfo.level || 1
            });
        }

        return this.saveLeaderboard();
    }
}

// ========== 商店数据 ==========
const shopItems = [
    { id: 'freeze', name: '时间冻结', price: 30, desc: '暂停倒计时 10 秒', icon: '⏱️' },
    { id: 'skip', name: '跳过题目', price: 50, desc: '跳过当前题目', icon: '⏭️' },
    { id: 'remove', name: '去掉错误', price: 40, desc: '去掉 2 个错误选项', icon: '❌' },
    { id: 'heart', name: '生命药水', price: 20, desc: '恢复 30 生命值', icon: '❤️' },
    { id: 'coin_pack', name: '金币包', price: 10, desc: '获得 100 金币', icon: '🪙' }
];

// ========== 主游戏类 ==========
class MatildaGame {
    constructor() {
        // V1.0: 用户管理器
        this.userManager = new UserManager();
        const savedProgress = this.userManager.loadProgress();

        this.currentLevel = savedProgress.currentLevel || 1;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.coins = savedProgress.coins || 0;
        this.currentQuestion = 0;
        this.questions = [];
        this.timer = null;
        this.timeLeft = 30;
        this.items = savedProgress.inventory || {
            freeze: 3,
            skip: 2,
            remove: 2
        };
        this.unlockedLevels = savedProgress.unlockedLevels || [1];
        this.completedLevels = savedProgress.completedLevels || [];

        // V1.0: 语音识别
        this.speechManager = new SpeechRecognitionManager();

        // F-009: 排行榜
        this.leaderboardManager = new LeaderboardManager();

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadLevelSelect();
        this.updateStatusBar();
    }

    bindEvents() {
        // 打开魔法书按钮
        const openBookBtn = document.getElementById('openBookBtn');
        if (openBookBtn) {
            openBookBtn.addEventListener('click', () => {
                this.showScreen('level-select');
            });
        }

        // 返回按钮
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.showScreen('start-screen');
            });
        }

        // 道具按钮 - 需要添加ID到HTML
        const freezeBtn = document.getElementById('freezeBtn');
        if (freezeBtn) {
            freezeBtn.addEventListener('click', () => {
                this.useItem('freeze');
            });
        }

        const skipQuestionBtn = document.getElementById('skipQuestionBtn');
        if (skipQuestionBtn) {
            skipQuestionBtn.addEventListener('click', () => {
                this.useItem('skip');
            });
        }

        const hintBtn = document.getElementById('hintBtn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => {
                this.useItem('remove');
            });
        }

        // 结果画面按钮
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                this.nextLevel();
            });
        }

        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.retryLevel();
            });
        }

        // V1.0: 商店按钮
        const openShopBtn = document.getElementById('openShopBtn');
        if (openShopBtn) {
            openShopBtn.addEventListener('click', () => {
                this.openShop();
            });
        }

        // F-009: 排行榜按钮
        const leaderboardBtn = document.getElementById('leaderboardBtn');
        if (leaderboardBtn) {
            leaderboardBtn.addEventListener('click', () => {
                this.openLeaderboard();
            });
        }

        // 排行榜关闭按钮
        const leaderboardClose = document.getElementById('leaderboardClose');
        if (leaderboardClose) {
            leaderboardClose.addEventListener('click', () => {
                this.closeLeaderboard();
            });
        }

        // 排行榜点击外部关闭
        const leaderboardModal = document.getElementById('leaderboardModal');
        if (leaderboardModal) {
            leaderboardModal.addEventListener('click', (e) => {
                if (e.target === leaderboardModal) {
                    this.closeLeaderboard();
                }
            });
        }

        // 排行榜标签切换
        const leaderboardTabs = document.querySelectorAll('.leaderboard-tab');
        leaderboardTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const type = tab.dataset.type;
                this.switchLeaderboardType(type);
            });
        });
    }

    showScreen(screenId) {
        // 隐藏所有主要区域
        const gameContainer = document.getElementById('gameContainer');
        const gameScreen = document.getElementById('gameScreen');
        const magicBook = document.getElementById('magicBook');
        const bookCover = document.querySelector('.book-cover');
        const bookPages = document.getElementById('bookPages');
        
        if (screenId === 'start-screen' || screenId === 'level-select') {
            // 显示主界面（魔法书）
            if (magicBook) magicBook.style.display = 'block';
            if (gameScreen) gameScreen.style.display = 'none';
            // 隐藏封面，激活书页内容
            if (bookCover) bookCover.style.display = 'none';
            if (bookPages) bookPages.classList.add('active');
        } else if (screenId === 'game-screen') {
            // 显示游戏界面
            if (magicBook) magicBook.style.display = 'none';
            if (gameScreen) gameScreen.style.display = 'block';
            // 停用书页内容
            if (bookPages) bookPages.classList.remove('active');
        }
    }

    loadLevelSelect() {
        const container = document.getElementById('levelsContainer');
        if (!container) return;
        container.innerHTML = '';

        GAME_DATA.levels.forEach(level => {
            const levelCard = document.createElement('div');
            levelCard.className = 'level-card';
            
            if (this.completedLevels.includes(level.id)) {
                levelCard.classList.add('completed');
            } else if (this.unlockedLevels.includes(level.id)) {
                levelCard.classList.add('current');
            } else {
                levelCard.classList.add('locked');
            }

            levelCard.innerHTML = `
                <div class="level-number">${level.id}</div>
                <div class="level-name">${level.name}</div>
                <div class="level-song">🎵 ${level.song}</div>
            `;

            if (this.unlockedLevels.includes(level.id)) {
                levelCard.addEventListener('click', () => {
                    this.startLevel(level.id);
                });
            }

            container.appendChild(levelCard);
        });
    }

    startLevel(levelId) {
        this.currentLevel = levelId;
        const levelData = GAME_DATA.levels.find(l => l.id === levelId);
        this.questions = [...levelData.questions];
        this.currentQuestion = 0;
        
        // 设置怪物
        const monsterIndex = (levelId - 1) % GAME_DATA.monsters.length;
        const monster = GAME_DATA.monsters[monsterIndex];
        const monsterEmoji = document.getElementById('monsterEmoji');
        if (monsterEmoji) monsterEmoji.textContent = monster.emoji;
        
        // 重置血量
        this.playerHealth = GAME_DATA.gameConfig.playerHealth;
        this.monsterHealth = GAME_DATA.gameConfig.monsterHealth;
        this.updateHealthBars();
        
        this.showScreen('game-screen');
        this.showQuestion();
        this.updateStatusBar();
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.levelComplete();
            return;
        }

        const question = this.questions[this.currentQuestion];
        
        // 获取各个区域
        const questionArea = document.getElementById('questionArea');
        const spellingArea = document.getElementById('spellingArea');
        const matchingArea = document.getElementById('matchingArea');
        const speakingArea = document.getElementById('speakingArea');
        
        // 隐藏所有题型区域
        if (questionArea) questionArea.style.display = 'none';
        if (spellingArea) spellingArea.style.display = 'none';
        if (matchingArea) matchingArea.style.display = 'none';
        if (speakingArea) speakingArea.style.display = 'none';
        
        // 根据题型显示对应区域
        switch(question.type) {
            case 'multiple_choice':
                if (questionArea) {
                    questionArea.style.display = 'block';
                    // 设置题目文本
                    const questionText = document.getElementById('questionText');
                    if (questionText) questionText.textContent = question.question || question.context;
                    const questionType = document.getElementById('questionType');
                    if (questionType) questionType.textContent = this.getQuestionTypeText(question.type);
                    // 清空答题区
                    const questionOptions = document.getElementById('questionOptions');
                    if (questionOptions) questionOptions.innerHTML = '';
                    this.renderMultipleChoice(question);
                }
                break;
            case 'spelling':
                if (spellingArea) {
                    spellingArea.style.display = 'block';
                    this.renderSpelling(question);
                }
                break;
            case 'matching':
                if (matchingArea) {
                    matchingArea.style.display = 'block';
                    this.renderMatching(question);
                }
                break;
            case 'read_along':
                if (speakingArea) {
                    speakingArea.style.display = 'block';
                    this.renderReadAlong(question);
                }
                break;
        }

        // 暂时注释掉音频播放（待实现语音合成）
        // if (question.audioText) {
        //     this.playAudioText(question.audioText);
        // }

        // 启动计时器
        this.startTimer();
    }

    getQuestionTypeText(type) {
        const typeNames = {
            'multiple_choice': '选择题',
            'spelling': '拼写题',
            'matching': '连线题',
            'read_along': '跟读题'
        };
        return typeNames[type] || type;
    }

    renderMultipleChoice(question) {
        const container = document.createElement('div');
        container.className = 'options-grid';

        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
            btn.addEventListener('click', () => {
                this.checkAnswer(index === question.correct, btn);
            });
            container.appendChild(btn);
        });

        document.getElementById('questionOptions').appendChild(container);
    }

    renderSpelling(question) {
        const spellingArea = document.getElementById('spellingArea');
        if (!spellingArea) return;
        
        // 清空拼写区域
        spellingArea.innerHTML = '';
        
        // 创建题目类型标签
        const typeDiv = document.createElement('div');
        typeDiv.className = 'question-type';
        typeDiv.textContent = '✏️ 拼写题';
        spellingArea.appendChild(typeDiv);
        
        // 创建题目文本
        const textDiv = document.createElement('div');
        textDiv.className = 'question-text';
        textDiv.textContent = question.question || question.context;
        spellingArea.appendChild(textDiv);
        
        // 创建容器
        const container = document.createElement('div');
        container.className = 'spelling-container';

        // 创建填空槽
        const slotsArea = document.createElement('div');
        slotsArea.className = 'spelling-slots';
        
        const wordLength = question.word.length;
        const slots = [];
        
        for (let i = 0; i < wordLength; i++) {
            const slot = document.createElement('div');
            slot.className = 'letter-slot';
            slot.dataset.index = i;
            // 添加点击事件，可以删除已填的字母
            slot.addEventListener('click', () => {
                this.handleSlotClick(slot, slots);
            });
            slots.push(slot);
            slotsArea.appendChild(slot);
        }
        
        container.appendChild(slotsArea);

        // 创建字母池
        const poolArea = document.createElement('div');
        poolArea.className = 'letter-pool';
        
        // 打乱字母顺序
        const shuffledLetters = [...question.letters].sort(() => Math.random() - 0.5);
        
        shuffledLetters.forEach((letter, index) => {
            const tile = document.createElement('div');
            tile.className = 'letter-tile';
            tile.textContent = letter.toUpperCase();
            tile.dataset.letter = letter;
            
            tile.addEventListener('click', () => {
                this.handleLetterClick(tile, slots);
            });
            
            poolArea.appendChild(tile);
        });
        
        container.appendChild(poolArea);

        // 提交按钮
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = '提交答案';
        submitBtn.style.marginTop = '20px';
        submitBtn.addEventListener('click', () => {
            this.checkSpellingAnswer(slots, question.word);
        });
        
        container.appendChild(submitBtn);
        spellingArea.appendChild(container);
    }

    handleLetterClick(tile, slots) {
        if (tile.classList.contains('used')) return;

        // 找到第一个空的槽
        const emptySlot = slots.find(slot => !slot.textContent);
        if (emptySlot) {
            emptySlot.textContent = tile.textContent;
            emptySlot.dataset.letter = tile.dataset.letter;
            emptySlot.classList.add('filled');
            tile.classList.add('used');
        }
    }

    handleSlotClick(slot, slots) {
        // 如果槽中有字母，删除它并恢复对应的字母池中的字母
        if (slot.textContent) {
            const letter = slot.dataset.letter;
            
            // 找到字母池中对应的字母（恢复使用状态）
            const poolTiles = document.querySelectorAll('.letter-tile');
            poolTiles.forEach(tile => {
                if (tile.dataset.letter === letter && tile.classList.contains('used')) {
                    tile.classList.remove('used');
                }
            });
            
            // 清空槽
            slot.textContent = '';
            slot.dataset.letter = '';
            slot.classList.remove('filled');
        }
    }

    checkSpellingAnswer(slots, correctWord) {
        const answer = slots.map(slot => slot.dataset.letter || '').join('').toLowerCase();
        const isCorrect = answer === correctWord.toLowerCase();
        
        if (isCorrect) {
            slots.forEach(slot => slot.style.borderColor = '#00b894');
        } else {
            slots.forEach(slot => slot.style.borderColor = '#e74c3c');
        }
        
        setTimeout(() => {
            this.checkAnswer(isCorrect);
        }, 500);
    }

    renderMatching(question) {
        const matchingArea = document.getElementById('matchingArea');
        if (!matchingArea) return;
        
        // 清空连线区域
        matchingArea.innerHTML = '';
        
        // 创建题目类型标签
        const typeDiv = document.createElement('div');
        typeDiv.className = 'question-type';
        typeDiv.textContent = '🔗 连线题';
        matchingArea.appendChild(typeDiv);
        
        // 创建题目文本
        const textDiv = document.createElement('div');
        textDiv.className = 'question-text';
        textDiv.textContent = question.question || '将英文单词与对应的中文意思连线';
        matchingArea.appendChild(textDiv);
        
        const container = document.createElement('div');
        container.className = 'matching-container';

        // 打乱右侧顺序（中文），左侧保持原顺序
        const shuffledRight = question.right.map((item, index) => ({ item, index }))
            .sort(() => Math.random() - 0.5);

        // 左侧（英文）
        const leftCol = document.createElement('div');
        leftCol.className = 'match-column';
        question.left.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'match-item';
            div.textContent = item;
            div.dataset.index = index;
            div.dataset.side = 'left';
            div.addEventListener('click', () => this.handleMatchClick(div));
            leftCol.appendChild(div);
        });

        // 右侧（中文）- 打乱后的顺序
        const rightCol = document.createElement('div');
        rightCol.className = 'match-column';
        shuffledRight.forEach(({ item, index }) => {
            const div = document.createElement('div');
            div.className = 'match-item';
            div.textContent = item;
            div.dataset.index = index;  // 保持原始索引用于配对验证
            div.dataset.side = 'right';
            div.addEventListener('click', () => this.handleMatchClick(div));
            rightCol.appendChild(div);
        });

        container.appendChild(leftCol);
        container.appendChild(rightCol);

        matchingArea.appendChild(container);

        // 确认按钮 - 放在 container 外面，使用包装器居中
        const btnWrapper = document.createElement('div');
        btnWrapper.style.cssText = 'display: flex; justify-content: center; margin-top: 20px;';
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = '确认连线';
        submitBtn.addEventListener('click', () => {
            this.checkMatchingAnswer(question.correctPairs);
        });
        
        btnWrapper.appendChild(submitBtn);
        matchingArea.appendChild(btnWrapper);

        this.selectedMatch = null;
        this.currentMatches = [];
    }

    handleMatchClick(item) {
        if (item.classList.contains('matched')) return;

        if (!this.selectedMatch) {
            this.selectedMatch = item;
            item.classList.add('selected');
        } else {
            if (this.selectedMatch.dataset.side !== item.dataset.side) {
                // 配对成功
                const leftIndex = this.selectedMatch.dataset.side === 'left' ? 
                    parseInt(this.selectedMatch.dataset.index) : parseInt(item.dataset.index);
                const rightIndex = this.selectedMatch.dataset.side === 'right' ? 
                    parseInt(this.selectedMatch.dataset.index) : parseInt(item.dataset.index);

                this.currentMatches.push([leftIndex, rightIndex]);
                this.selectedMatch.classList.add('matched');
                item.classList.add('matched');
            }
            
            this.selectedMatch.classList.remove('selected');
            this.selectedMatch = null;
        }
    }

    checkMatchingAnswer(correctPairs) {
        let correctCount = 0;
        this.currentMatches.forEach(match => {
            if (correctPairs.some(pair => 
                pair[0] === match[0] && pair[1] === match[1]
            )) {
                correctCount++;
            }
        });

        const isCorrect = correctCount >= correctPairs.length;
        this.checkAnswer(isCorrect);
    }

    renderReadAlong(question) {
        const speakingArea = document.getElementById('speakingArea');
        if (!speakingArea) return;
        
        // 清空并重新构建跟读区域
        speakingArea.innerHTML = '';
        
        // 检查语音识别支持
        const isSpeechSupported = this.speechManager && this.speechManager.isSupported;
        
        // 创建题目类型标签
        const typeDiv = document.createElement('div');
        typeDiv.className = 'question-type';
        typeDiv.textContent = '🎤 跟读题';
        speakingArea.appendChild(typeDiv);
        
        // 创建题目文本
        const textDiv = document.createElement('div');
        textDiv.className = 'question-text';
        textDiv.textContent = '请跟读下面的英文句子';
        speakingArea.appendChild(textDiv);
        
        // 创建内容容器
        const container = document.createElement('div');
        container.className = 'read-along-area';

        // 原文
        const readTextDiv = document.createElement('div');
        readTextDiv.className = 'read-text';
        readTextDiv.style.cssText = 'font-size: 1.5em; margin-bottom: 15px; line-height: 1.6; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;';
        readTextDiv.innerHTML = `"${question.text}"`;
        container.appendChild(readTextDiv);

        // 翻译
        const transDiv = document.createElement('div');
        transDiv.className = 'translation';
        transDiv.style.cssText = 'color: #fd79a8; margin-bottom: 30px;';
        transDiv.textContent = question.translation;
        container.appendChild(transDiv);

        // 按钮区域
        const buttonArea = document.createElement('div');
        buttonArea.className = 'read-along-buttons';
        buttonArea.style.cssText = 'display: flex; gap: 20px; justify-content: center; margin: 20px 0; flex-wrap: wrap;';

        // 播放标准发音按钮
        const playBtn = document.createElement('button');
        playBtn.className = 'play-audio-btn';
        playBtn.innerHTML = '🔊 播放示例';
        playBtn.title = '播放标准发音';
        playBtn.style.cssText = 'padding: 12px 24px; border-radius: 25px; background: linear-gradient(145deg, #3b82f6, #1d4ed8); border: none; color: white; font-size: 1em; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;';
        playBtn.addEventListener('click', () => {
            this.playSentenceAudio(question.text);
        });
        buttonArea.appendChild(playBtn);

        // 录音按钮（仅在支持语音识别时显示）
        if (isSpeechSupported) {
            const micBtn = document.createElement('button');
            micBtn.className = 'mic-btn';
            micBtn.textContent = '🎤 开始录音';
            micBtn.title = '按住说话';
            micBtn.style.cssText = 'padding: 12px 30px; border-radius: 25px; background: linear-gradient(145deg, #8B5CF6, #7C3AED); border: none; color: white; font-size: 1em; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;';
            
            let recording = false;
            
            const startRecord = () => {
                recording = true;
                micBtn.textContent = '⏹️ 松开停止';
                micBtn.style.background = 'linear-gradient(145deg, #EF4444, #DC2626)';
                micBtn.style.animation = 'recording-pulse 1s infinite';
                this.startRecording();
            };
            
            const stopRecord = () => {
                if (recording) {
                    recording = false;
                    micBtn.textContent = '🎤 开始录音';
                    micBtn.style.background = 'linear-gradient(145deg, #8B5CF6, #7C3AED)';
                    micBtn.style.animation = '';
                    this.stopRecording(question);
                }
            };
            
            micBtn.addEventListener('mousedown', startRecord);
            micBtn.addEventListener('mouseup', stopRecord);
            micBtn.addEventListener('mouseleave', stopRecord);

            // 触摸设备支持
            micBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                startRecord();
            });

            micBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                stopRecord();
            });

            buttonArea.appendChild(micBtn);
        } else {
            // 浏览器不支持时显示提示
            const warningDiv = document.createElement('div');
            warningDiv.className = 'speech-warning';
            warningDiv.style.cssText = 'background: rgba(245, 158, 11, 0.2); border: 1px solid #F59E0B; border-radius: 10px; padding: 15px; margin: 15px 0; color: #FCD34D; text-align: center; width: 100%;';
            warningDiv.innerHTML = '⚠️ 您的浏览器不支持语音识别功能。<br>请使用 Chrome、Edge 或 Safari 浏览器获得最佳体验。';
            container.appendChild(warningDiv);
            
            // 添加模拟评分按钮（用于不支持的浏览器）
            const simBtn = document.createElement('button');
            simBtn.textContent = '🎲 试试运气';
            simBtn.title = '由于浏览器不支持语音识别，随机评分';
            simBtn.style.cssText = 'padding: 12px 30px; border-radius: 25px; background: linear-gradient(145deg, #6B7280, #4B5563); border: none; color: white; font-size: 1em; cursor: pointer; transition: all 0.3s ease;';
            simBtn.addEventListener('click', () => {
                this.simulateSpeechScore(question);
            });
            buttonArea.appendChild(simBtn);
        }

        container.appendChild(buttonArea);

        // 提示文字
        const hint = document.createElement('p');
        hint.textContent = isSpeechSupported ? '按住麦克风跟读，然后松开' : '点击"试试运气"完成本题';
        hint.style.cssText = 'color: #636e72; margin-top: 10px;';
        container.appendChild(hint);

        speakingArea.appendChild(container);
    }

    // 播放句子标准发音（使用语音合成）
    playSentenceAudio(text) {
        if ('speechSynthesis' in window) {
            // 停止之前正在播放的内容
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.8; // 放慢一点，方便听清
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            // 尝试选择一个合适的语音
            const voices = speechSynthesis.getVoices();
            const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) ||
                                 voices.find(v => v.lang.startsWith('en'));
            if (englishVoice) {
                utterance.voice = englishVoice;
            }
            
            speechSynthesis.speak(utterance);
        } else {
            this.showFloatingText('您的浏览器不支持语音合成', '#F59E0B');
        }
    }

    // 模拟语音评分（用于不支持语音识别的浏览器）
    simulateSpeechScore(question) {
        const difficulties = { 'easy': 0.9, 'medium': 0.7, 'hard': 0.5 };
        const difficulty = question.difficulty || 'medium';
        const baseRate = difficulties[difficulty] || 0.7;
        
        // 添加随机因素
        const randomFactor = Math.random() * 0.4 - 0.2; // -0.2 到 +0.2
        const score = Math.round(Math.min(100, Math.max(0, (baseRate + randomFactor) * 100)));
        
        const mockResult = {
            transcript: '[模拟识别: ' + question.text + ']',
            score: score
        };
        
        this.handleSpeechResult(mockResult, question);
    }

    startRecording() {
        console.log('Recording started...');
    }

    stopRecording(question) {
        console.log('Recording stopped, processing with speech recognition...');
        const targetSentence = question.text;
        const micBtn = document.querySelector('.mic-btn');

        // 使用语音识别
        this.speechManager.startRecognition(
            targetSentence,
            (result) => {
                console.log('Recognition result:', result);
                this.handleSpeechResult(result, question);
            },
            (error) => {
                console.error('Speech recognition error:', error);
                this.handleSpeechError(error, question);
            }
        );
    }

    handleSpeechResult(result, question) {
        const { transcript, score } = result;
        
        // 显示评分
        this.showSpeechScore(score, transcript);
        
        // 根据评分判定
        let isCorrect = false;
        let damageMultiplier = 1;
        
        if (score >= 80) {
            isCorrect = true;
            damageMultiplier = 1.5; // 完美攻击
        } else if (score >= 60) {
            isCorrect = true;
            damageMultiplier = 1; // 普通攻击
        } else {
            isCorrect = false; // 失败
        }
        
        // 延迟后执行判定，让用户看到评分
        setTimeout(() => {
            if (isCorrect) {
                this.playerAttack(damageMultiplier);
            } else {
                this.monsterAttack();
            }
        }, 1500);
    }

    handleSpeechError(error, question) {
        // 语音识别不支持或失败时，回退到模拟评分
        console.log('Falling back to simulated scoring...', error);
        
        // 显示错误提示
        const errorMessage = error.error === 'not-supported' ? 
            '🎤 语音识别不支持此浏览器' : 
            '🎤 语音识别出错，使用模拟评分';
        this.showFloatingText(errorMessage, '#F59E0B');
        
        // 使用模拟评分（根据难度）
        const difficulties = { 'easy': 85, 'medium': 70, 'hard': 55 };
        const baseScore = difficulties[question.difficulty] || 70;
        const randomFactor = Math.floor(Math.random() * 30) - 15; // -15 到 +15
        const score = Math.max(0, Math.min(100, baseScore + randomFactor));
        
        const mockResult = {
            transcript: '[语音识别不可用]',
            score: score
        };
        
        this.handleSpeechResult(mockResult, question);
    }

    showSpeechScore(score, transcript) {
        const speakingArea = document.getElementById('speakingArea');
        if (!speakingArea) return;
        
        // 移除之前的评分显示
        const existingScore = speakingArea.querySelector('.speech-score');
        if (existingScore) existingScore.remove();
        
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'speech-score';
        
        let scoreClass = 'score-low';
        let scoreText = '不合格';
        if (score >= 80) {
            scoreClass = 'score-perfect';
            scoreText = '完美！';
        } else if (score >= 60) {
            scoreClass = 'score-good';
            scoreText = '不错！';
        }
        
        scoreDiv.innerHTML = `
            <div class="score-label">你的得分</div>
            <div class="score-value ${scoreClass}">${score}</div>
            <div class="score-text">${scoreText}</div>
            <div class="score-transcript">"${transcript}"</div>
        `;
        
        scoreDiv.style.cssText = `
            text-align: center;
            padding: 20px;
            background: rgba(0,0,0,0.5);
            border-radius: 10px;
            margin-top: 15px;
        `;
        
        speakingArea.appendChild(scoreDiv);
    }

    // V1.0: 攻击伤害倍数（用于完美跟读）
    playerAttack(damageMultiplier = 1) {
        const baseDamage = GAME_DATA.gameConfig.damagePerHit;
        const damage = Math.round(baseDamage * damageMultiplier);
        this.monsterHealth -= damage;
        this.updateHealthBars();

        // 播放攻击动画
        const matilda = document.getElementById('playerCharacter');
        if (matilda) {
            matilda.classList.add('attack');
            setTimeout(() => matilda.classList.remove('attack'), 500);
        }

        // 播放击中动画
        const monster = document.getElementById('monster');
        if (monster) {
            monster.classList.add('hit');
            setTimeout(() => monster.classList.remove('hit'), 300);
            this.showEffect(monster, `-${damage}`, 'damage-number');
        }

        if (this.monsterHealth <= 0) {
            setTimeout(() => this.questionComplete(true), 500);
        } else {
            setTimeout(() => {
                this.currentQuestion++;
                this.showQuestion();
            }, 1000);
        }
    }

    startTimer() {
        this.timeLeft = GAME_DATA.gameConfig.timeLimit;
        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.checkAnswer(false);
            }
        }, 1000);
    }

    updateTimerDisplay() {
        // 可以在界面上显示倒计时
        const progress = (this.timeLeft / GAME_DATA.gameConfig.timeLimit) * 100;
        // audio-progress 元素不存在，暂时跳过
        // const audioProgress = document.getElementById('audio-progress');
        // if (audioProgress) audioProgress.style.width = progress + '%';
    }

    checkAnswer(isCorrect, element = null) {
        clearInterval(this.timer);

        if (element) {
            element.classList.add(isCorrect ? 'correct' : 'wrong');
        }

        setTimeout(() => {
            if (isCorrect) {
                this.playerAttack(1); // 默认普通攻击
            } else {
                this.monsterAttack();
            }
        }, 800);
    }

    monsterAttack() {
        const damage = GAME_DATA.gameConfig.damagePerHit;
        this.playerHealth -= damage;
        this.updateHealthBars();

        // 怪物攻击动画
        const monster = document.getElementById('monster');
        if (monster) {
            monster.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                monster.style.transform = 'translateX(0)';
            }, 300);
        }

        // 玛蒂尔达受击动画
        const matilda = document.getElementById('playerCharacter');
        if (matilda) {
            matilda.classList.add('hit');
            setTimeout(() => matilda.classList.remove('hit'), 300);
            this.showEffect(matilda, `-${damage}`, 'damage-number');
        }

        if (this.playerHealth <= 0) {
            setTimeout(() => this.levelFailed(), 500);
        } else {
            setTimeout(() => {
                this.currentQuestion++;
                this.showQuestion();
            }, 1000);
        }
    }

    showEffect(element, text, className) {
        const effect = document.createElement('div');
        effect.className = `effect ${className}`;
        effect.textContent = text;
        
        const rect = element.getBoundingClientRect();
        effect.style.left = rect.left + rect.width / 2 + 'px';
        effect.style.top = rect.top + 'px';
        effect.style.position = 'fixed';
        effect.style.zIndex = '9999';
        
        const gameScreen = document.getElementById('gameScreen');
        if (gameScreen) {
            gameScreen.appendChild(effect);
        } else {
            document.body.appendChild(effect);
        }
        
        setTimeout(() => effect.remove(), 1000);
    }

    updateHealthBars() {
        const playerPercent = Math.max(0, this.playerHealth);
        const monsterPercent = Math.max(0, this.monsterHealth);
        
        const playerHealthEl = document.getElementById('playerHealth');
        if (playerHealthEl) playerHealthEl.style.width = playerPercent + '%';
        
        const monsterHealthEl = document.getElementById('monsterHealth');
        if (monsterHealthEl) monsterHealthEl.style.width = monsterPercent + '%';
        
        // 更新血量文本
        const playerHealthText = document.getElementById('playerHealthText');
        if (playerHealthText) playerHealthText.textContent = `${this.playerHealth}/100`;
        
        const monsterHealthText = document.getElementById('monsterHealthText');
        if (monsterHealthText) monsterHealthText.textContent = `${this.monsterHealth}/100`;
    }

    updateStatusBar() {
        // 更新金币
        const goldAmount = document.getElementById('goldAmount');
        if (goldAmount) goldAmount.textContent = this.coins;
        
        // 更新当前关卡
        const gameTitle = document.getElementById('gameTitle');
        if (gameTitle) gameTitle.textContent = `关卡 ${this.currentLevel}`;
    }

    questionComplete(success) {
        // 继续下一题或结束
        this.currentQuestion++;
        if (this.currentQuestion >= this.questions.length) {
            this.levelComplete();
        } else {
            this.showQuestion();
        }
    }

    levelComplete() {
        const reward = GAME_DATA.gameConfig.coinReward;
        this.coins += reward;
        
        if (!this.completedLevels.includes(this.currentLevel)) {
            this.completedLevels.push(this.currentLevel);
        }
        
        if (!this.unlockedLevels.includes(this.currentLevel + 1)) {
            this.unlockedLevels.push(this.currentLevel + 1);
        }

        // V1.0: 自动保存进度
        this.saveProgress();

        this.showResult(true, reward);
    }

    levelFailed() {
        // 确保计时器已停止
        clearInterval(this.timer);
        this.timer = null;
        this.showResult(false, 0);
    }

    showResult(isWin, reward) {
        // 确保停止所有游戏逻辑
        clearInterval(this.timer);
        this.timer = null;
        
        const resultModal = document.getElementById('resultModal');
        if (resultModal) resultModal.style.display = 'flex';
        
        const resultIcon = document.getElementById('resultIcon');
        const resultTitle = document.getElementById('resultTitle');
        const coinsEarned = document.getElementById('coinsEarned');
        const damageDealt = document.getElementById('damageDealt');
        const continueBtn = document.getElementById('continueBtn');

        if (isWin) {
            if (resultIcon) resultIcon.textContent = '🎉';
            if (resultTitle) resultTitle.textContent = '胜利！';
            if (coinsEarned) coinsEarned.textContent = `+${reward}`;
            if (damageDealt) damageDealt.textContent = '100';
            if (continueBtn) continueBtn.style.display = 'inline-block';
        } else {
            if (resultIcon) resultIcon.textContent = '😢';
            if (resultTitle) resultTitle.textContent = '失败...';
            if (coinsEarned) coinsEarned.textContent = '0';
            if (damageDealt) damageDealt.textContent = '0';
            if (continueBtn) continueBtn.style.display = 'none';
        }
    }

    nextLevel() {
        // 隐藏结果弹窗
        const resultModal = document.getElementById('resultModal');
        if (resultModal) resultModal.style.display = 'none';
        
        if (this.currentLevel < GAME_DATA.levels.length) {
            this.startLevel(this.currentLevel + 1);
        } else {
            this.showScreen('level-select');
            alert('恭喜你通关了所有关卡！');
        }
    }

    retryLevel() {
        // 确保清理所有状态再重新开始
        clearInterval(this.timer);
        this.timer = null;
        
        // 隐藏结果弹窗
        const resultModal = document.getElementById('resultModal');
        if (resultModal) resultModal.style.display = 'none';
        
        this.startLevel(this.currentLevel);
    }

    confirmQuit() {
        if (confirm('确定要退出当前关卡吗？进度将不会保存。')) {
            this.showScreen('level-select');
        }
    }

    useItem(itemType) {
        if (this.items[itemType] <= 0) return;

        this.items[itemType]--;
        this.updateStatusBar();

        switch(itemType) {
            case 'freeze':
                this.freezeTime();
                break;
            case 'skip':
                this.skipQuestion();
                break;
            case 'remove':
                this.removeWrongAnswers();
                break;
        }
    }

    freezeTime() {
        clearInterval(this.timer);
        this.timeLeft += 10;
        this.startTimer();
        this.showFloatingText('⏰ 时间冻结 +10秒！', '#00cec9');
    }

    skipQuestion() {
        this.currentQuestion++;
        this.showQuestion();
        this.showFloatingText('⏭️ 跳过本题', '#fd79a8');
    }

    removeWrongAnswers() {
        const question = this.questions[this.currentQuestion];
        if (question.type !== 'multiple_choice') return;

        const options = document.querySelectorAll('.option-btn');
        const wrongOptions = [];
        
        options.forEach((btn, index) => {
            if (index !== question.correct) {
                wrongOptions.push(btn);
            }
        });

        // 随机去掉2个错误答案
        const toRemove = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
        toRemove.forEach(btn => {
            btn.style.opacity = '0.3';
            btn.disabled = true;
        });

        this.showFloatingText('❌ 已去掉2个错误答案', '#e74c3c');
    }

    showFloatingText(text, color) {
        const div = document.createElement('div');
        div.textContent = text;
        div.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${color};
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.2em;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInOut 2s ease forwards;
        `;
        
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 2000);
    }

    playAudioText(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
        }
    }

    // ========== V1.0: 商店系统 ==========
    openShop() {
        const shopModal = document.createElement('div');
        shopModal.id = 'shopModal';
        shopModal.className = 'modal';
        shopModal.style.cssText = `
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            justify-content: center;
            align-items: center;
        `;

        const shopContent = document.createElement('div');
        shopContent.className = 'shop-content';
        shopContent.style.cssText = `
            background: linear-gradient(145deg, #2d3436, #1a1a2e);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        shopContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #ffd93d;">🛒 魔法商店</h2>
                <button id="closeShopBtn" style="background: none; border: none; font-size: 1.5em; cursor: pointer;">✕</button>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 20px; padding: 10px; background: rgba(255,217,61,0.1); border-radius: 10px;">
                <span style="font-size: 1.5em; margin-right: 10px;">🪙</span>
                <span id="shopGold" style="color: #ffd93d; font-size: 1.2em; font-weight: bold;">${this.coins}</span>
            </div>
            <div id="shopItems"></div>
        `;

        shopModal.appendChild(shopContent);
        document.body.appendChild(shopModal);

        // 渲染商品
        const itemsContainer = document.getElementById('shopItems');
        shopItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'shop-item';
            itemDiv.style.cssText = `
                display: flex;
                align-items: center;
                padding: 15px;
                margin-bottom: 10px;
                background: rgba(255,255,255,0.05);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s;
            `;
            itemDiv.innerHTML = `
                <span style="font-size: 2em; margin-right: 15px;">${item.icon}</span>
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: white;">${item.name}</div>
                    <div style="color: #636e72; font-size: 0.9em;">${item.desc}</div>
                </div>
                <div style="text-align: right;">
                    <div style="color: #ffd93d; font-weight: bold;">${item.price} 🪙</div>
                </div>
            `;
            itemDiv.addEventListener('click', () => this.buyItem(item));
            itemsContainer.appendChild(itemDiv);
        });

        // 关闭按钮
        document.getElementById('closeShopBtn').addEventListener('click', () => {
            shopModal.remove();
        });

        shopModal.addEventListener('click', (e) => {
            if (e.target === shopModal) shopModal.remove();
        });
    }

    buyItem(item) {
        if (this.coins < item.price) {
            this.showFloatingText('💰 金币不足！', '#e74c3c');
            return;
        }

        this.coins -= item.price;

        // 根据商品类型添加道具
        if (item.id === 'coin_pack') {
            this.coins += 100;
            this.showFloatingText('🪙 +100 金币！', '#ffd93d');
        } else if (item.id === 'heart') {
            this.playerHealth = Math.min(100, this.playerHealth + 30);
            this.updateHealthBars();
            this.showFloatingText('❤️ +30 生命值！', '#e74c3c');
        } else if (this.items[item.id] !== undefined) {
            this.items[item.id]++;
            this.showFloatingText(`${item.icon} ${item.name} +1`, '#4CAF50');
        }

        this.updateStatusBar();
        document.getElementById('shopGold').textContent = this.coins;
        this.saveProgress();
    }

    // ========== V1.0: 进度保存 ==========
    saveProgress() {
        const progressData = {
            currentLevel: this.currentLevel,
            completedLevels: this.completedLevels,
            unlockedLevels: this.unlockedLevels,
            coins: this.coins,
            inventory: this.items,
            totalExp: this.totalExp || 0,
            playCount: (this.playCount || 0) + 1,
            lastPlayDate: new Date().toISOString()
        };
        this.userManager.saveProgress(progressData);
    }

    // 每题完成后自动保存
    autoSave() {
        this.saveProgress();
    }

    // ========== F-009: 排行榜功能 ==========
    openLeaderboard() {
        const modal = document.getElementById('leaderboardModal');
        if (!modal) return;

        // 更新玩家数据
        const userInfo = this.userManager.getUserInfo();
        const progress = this.userManager.loadProgress();
        this.leaderboardManager.updatePlayerData({
            id: userInfo.id,
            nickname: userInfo.nickname || '小巫师',
            avatar: userInfo.avatar || '🧙‍♀️',
            completedLevels: progress.completedLevels ? progress.completedLevels.length : 0,
            gold: this.coins,
            level: userInfo.level || 1
        });

        // 显示默认排行榜（关卡数）
        this.renderLeaderboard('level');

        modal.classList.add('active');
    }

    closeLeaderboard() {
        const modal = document.getElementById('leaderboardModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    switchLeaderboardType(type) {
        // 更新标签状态
        const tabs = document.querySelectorAll('.leaderboard-tab');
        tabs.forEach(tab => {
            if (tab.dataset.type === type) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // 重新渲染排行榜
        this.renderLeaderboard(type);
    }

    renderLeaderboard(type) {
        const listContainer = document.getElementById('leaderboardList');
        if (!listContainer) return;

        const sortedData = this.leaderboardManager.getSortedLeaderboard(type);
        const userInfo = this.userManager.getUserInfo();
        const myId = userInfo.id;

        // 渲染排行榜列表
        listContainer.innerHTML = '';

        sortedData.forEach((player, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';

            // 判断是否是自己
            if (player.id === myId) {
                item.classList.add('highlight');
            }

            // 获取排名样式
            let rankClass = 'normal';
            if (index === 0) rankClass = 'gold';
            else if (index === 1) rankClass = 'silver';
            else if (index === 2) rankClass = 'bronze';

            // 获取数值和标签
            let valueLabel = '';
            let valueClass = '';
            switch (type) {
                case 'level':
                    valueLabel = `${player.completedLevels} 关`;
                    break;
                case 'gold':
                    valueLabel = `${player.gold} 🪙`;
                    break;
                case 'rank':
                    valueLabel = `Lv.${player.level}`;
                    valueClass = 'level';
                    break;
            }

            item.innerHTML = `
                <div class="leaderboard-rank ${rankClass}">${index + 1}</div>
                <div class="leaderboard-avatar">${player.avatar}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">${player.nickname}</div>
                    <div class="leaderboard-level">Lv.${player.level}</div>
                </div>
                <div class="leaderboard-value">
                    <div class="leaderboard-value-label">${type === 'level' ? '关卡' : type === 'gold' ? '金币' : '等级'}</div>
                    <div class="leaderboard-value-number ${valueClass}">${valueLabel}</div>
                </div>
            `;

            listContainer.appendChild(item);
        });

        // 更新我的排名
        const myRankSection = document.getElementById('myRankSection');
        const myRankValue = document.getElementById('myRankValue');
        if (myRankSection && myRankValue) {
            const myRank = this.leaderboardManager.getMyRank(userInfo);
            if (myRank > 0) {
                myRankValue.textContent = `#${myRank}`;
                myRankSection.style.display = 'flex';
            } else {
                myRankSection.style.display = 'none';
            }
        }
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MatildaGame();
});

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);
