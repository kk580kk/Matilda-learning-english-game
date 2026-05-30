// 玛蒂尔达的魔法书 - 游戏主逻辑

class MatildaGame {
    constructor() {
        this.currentLevel = 1;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.coins = 0;
        this.currentQuestion = 0;
        this.questions = [];
        this.timer = null;
        this.timeLeft = 30;
        this.items = {
            freeze: 3,
            skip: 2,
            remove: 2
        };
        this.unlockedLevels = [1];
        this.completedLevels = [];
        
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
        const container = document.createElement('div');
        container.className = 'matching-area';

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

        // 右侧（中文）
        const rightCol = document.createElement('div');
        rightCol.className = 'match-column';
        question.right.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'match-item';
            div.textContent = item;
            div.dataset.index = index;
            div.dataset.side = 'right';
            div.addEventListener('click', () => this.handleMatchClick(div));
            rightCol.appendChild(div);
        });

        container.appendChild(leftCol);
        container.appendChild(rightCol);

        // 确认按钮
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn-primary';
        submitBtn.textContent = '确认连线';
        submitBtn.style.marginTop = '20px';
        submitBtn.style.gridColumn = '1 / -1';
        submitBtn.addEventListener('click', () => {
            this.checkMatchingAnswer(question.correctPairs);
        });

        const wrapper = document.createElement('div');
        wrapper.appendChild(container);
        wrapper.appendChild(submitBtn);
        
        document.getElementById('questionOptions').appendChild(wrapper);

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
        const container = document.createElement('div');
        container.className = 'read-along-area';

        // 原文
        const textDiv = document.createElement('div');
        textDiv.className = 'read-text';
        textDiv.style.cssText = 'font-size: 1.5em; margin-bottom: 15px; line-height: 1.6; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px;';
        textDiv.innerHTML = `"${question.text}"`;
        container.appendChild(textDiv);

        // 翻译
        const transDiv = document.createElement('div');
        transDiv.className = 'translation';
        transDiv.style.cssText = 'color: #fd79a8; margin-bottom: 30px;';
        transDiv.textContent = question.translation;
        container.appendChild(transDiv);

        // 录音按钮
        const micBtn = document.createElement('button');
        micBtn.className = 'mic-btn';
        micBtn.textContent = '🎤';
        micBtn.title = '按住说话';
        
        let recording = false;
        micBtn.addEventListener('mousedown', () => {
            recording = true;
            micBtn.classList.add('recording');
            this.startRecording();
        });

        micBtn.addEventListener('mouseup', () => {
            if (recording) {
                recording = false;
                micBtn.classList.remove('recording');
                this.stopRecording(question);
            }
        });

        // 触摸设备支持
        micBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            recording = true;
            micBtn.classList.add('recording');
            this.startRecording();
        });

        micBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (recording) {
                recording = false;
                micBtn.classList.remove('recording');
                this.stopRecording(question);
            }
        });

        container.appendChild(micBtn);

        // 提示文字
        const hint = document.createElement('p');
        hint.textContent = '按住麦克风跟读，然后松开';
        hint.style.cssText = 'color: #636e72;';
        container.appendChild(hint);

        document.getElementById('questionOptions').appendChild(container);
    }

    startRecording() {
        // 模拟录音开始
        console.log('Recording started...');
    }

    stopRecording(question) {
        // 模拟语音识别和评分
        console.log('Recording stopped...');
        
        // 模拟评分（随机成功率，根据难度调整）
        const difficulties = { 'easy': 0.8, 'medium': 0.6, 'hard': 0.4 };
        const successRate = difficulties[question.difficulty] || 0.6;
        const isCorrect = Math.random() < successRate;
        
        setTimeout(() => {
            this.checkAnswer(isCorrect);
        }, 1000);
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
                this.playerAttack();
            } else {
                this.monsterAttack();
            }
        }, 800);
    }

    playerAttack() {
        const damage = GAME_DATA.gameConfig.damagePerHit;
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
            // 显示伤害数字
            this.showEffect(monster, `-${damage}`, 'damage-number');
        }

        // 检查怪物是否被击败
        if (this.monsterHealth <= 0) {
            setTimeout(() => {
                this.questionComplete(true);
            }, 500);
        } else {
            setTimeout(() => {
                this.currentQuestion++;
                this.showQuestion();
            }, 1000);
        }
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
            // 显示伤害数字
            this.showEffect(matilda, `-${damage}`, 'damage-number');
        }

        // 检查玩家是否失败
        if (this.playerHealth <= 0) {
            setTimeout(() => {
                this.levelFailed();
            }, 500);
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

        this.showResult(true, reward);
    }

    levelFailed() {
        this.showResult(false, 0);
    }

    showResult(isWin, reward) {
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
        if (this.currentLevel < GAME_DATA.levels.length) {
            this.startLevel(this.currentLevel + 1);
        } else {
            this.showScreen('start-screen');
            alert('恭喜你通关了所有关卡！');
        }
    }

    retryLevel() {
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
        // 使用 Web Speech API 朗读文本
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            speechSynthesis.speak(utterance);
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
