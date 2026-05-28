const GAME_DATA = {
    levels: [
        { id: 1, name: '小试牛刀', difficulty: '简单', monster: '👹', boss: false, questions: 5 },
        { id: 2, name: '魔法初现', difficulty: '中等', monster: '👺', boss: false, questions: 7 },
        { id: 3, name: '怪物来袭', difficulty: '困难', monster: '🤖', boss: false, questions: 10 },
        { id: 4, name: '最终Boss', difficulty: 'Boss', monster: '👿', boss: true, questions: 12 }
    ],
    questions: {
        choice: [
            { question: 'I love reading books.', options: ['我喜欢读书。', '我喜欢看电视。', '我喜欢玩游戏。', '我喜欢画画。'], answer: 0 },
            { question: 'Matilda is very smart.', options: ['玛蒂尔达很可爱。', '玛蒂尔达很聪明。', '玛蒂尔达很调皮。', '玛蒂尔达很害羞。'], answer: 1 },
            { question: 'The teacher is kind.', options: ['老师很严厉。', '老师很和蔼。', '老师很年轻。', '老师很漂亮。'], answer: 1 },
            { question: 'She has special powers.', options: ['她有特殊能力。', '她有很多朋友。', '她有很多玩具。', '她有很多书。'], answer: 0 },
            { question: 'Knowledge is power.', options: ['知识就是力量。', '时间就是金钱。', '团结就是力量。', '实践出真知。'], answer: 0 },
            { question: 'Reading opens doors.', options: ['读书使人快乐。', '阅读开启大门。', '书中自有黄金屋。', '读万卷书行万里路。'], answer: 1 },
            { question: 'Magic is everywhere.', options: ['魔法在远方。', '魔法无处不在。', '魔法很神奇。', '魔法很危险。'], answer: 1 },
            { question: 'Brave girls can do anything.', options: ['勇敢的女孩无所不能。', '漂亮的女孩很可爱。', '聪明的女孩爱学习。', '快乐的女孩爱唱歌。'], answer: 0 }
        ],
        spelling: [
            { sentence: 'The ______ is very smart.', word: 'girl', hint: '一个小女孩的英文' },
            { sentence: 'I love reading ______.', word: 'books', hint: '读书的英文' },
            { sentence: 'Matilda has special ______.', word: 'powers', hint: '能力的复数形式' },
            { sentence: 'The ______ is kind.', word: 'teacher', hint: '老师的英文' },
            { sentence: 'Knowledge is ______.', word: 'power', hint: '力量的英文' },
            { sentence: 'She is very ______.', word: 'clever', hint: '聪明的英文' },
            { sentence: 'Reading ______ minds.', word: 'opens', hint: '开启的第三人称单数' },
            { sentence: 'Magic is ______.', word: 'wonderful', hint: '精彩的英文' }
        ],
        matching: [
            { pairs: [
                { left: 'I love reading', right: '我喜欢阅读' },
                { left: 'special powers', right: '特殊能力' },
                { left: 'kind teacher', right: '和蔼的老师' },
                { left: 'very smart', right: '非常聪明' }
            ]},
            { pairs: [
                { left: 'Magic book', right: '魔法书' },
                { left: 'Brave girl', right: '勇敢的女孩' },
                { left: 'Knowledge', right: '知识' },
                { left: 'Power', right: '力量' }
            ]},
            { pairs: [
                { left: 'Open the door', right: '开门' },
                { left: 'Read a book', right: '读书' },
                { left: 'Learn magic', right: '学习魔法' },
                { left: 'Help friends', right: '帮助朋友' }
            ]}
        ],
        speaking: [
            { sentence: 'I love reading books.', prompt: '请跟读这句话' },
            { sentence: 'Matilda is very smart.', prompt: '请跟读这句话' },
            { sentence: 'The teacher is kind.', prompt: '请跟读这句话' },
            { sentence: 'She has special powers.', prompt: '请跟读这句话' },
            { sentence: 'Knowledge is power.', prompt: '请跟读这句话' }
        ]
    },
    songs: [
        { id: 1, name: 'Revolting Children', duration: 180 },
        { id: 2, name: 'When I Grow Up', duration: 240 },
        { id: 3, name: 'Miracle', duration: 200 },
        { id: 4, name: 'School Song', duration: 160 }
    ]
};

class Game {
    constructor() {
        this.currentLevel = 1;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.gold = 0;
        this.attackPower = 10;
        this.defense = 5;
        this.currentQuestionIndex = 0;
        this.currentQuestionType = 'choice';
        this.score = 0;
        this.matchingPairs = [];
        this.matchedCount = 0;
        this.freezeActive = false;
        this.freezeCount = 1;
        this.skipCount = 1;
        this.hintCount = 1;
        this.totalDamageDealt = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadGameState();
    }

    bindEvents() {
        document.getElementById('openBookBtn').addEventListener('click', () => this.openBook());
        document.getElementById('backBtn').addEventListener('click', () => this.backToBook());
        document.getElementById('openShopBtn').addEventListener('click', () => this.openShop());
        document.getElementById('closeShopBtn').addEventListener('click', () => this.closeShop());
        document.getElementById('continueBtn').addEventListener('click', () => this.continueGame());
        document.getElementById('retryBtn').addEventListener('click', () => this.retryLevel());
        document.getElementById('skipSongBtn').addEventListener('click', () => this.skipSong());
        document.getElementById('freezeBtn').addEventListener('click', () => this.useFreeze());
        document.getElementById('skipQuestionBtn').addEventListener('click', () => this.useSkip());
        document.getElementById('hintBtn').addEventListener('click', () => this.useHint());
        document.getElementById('speakBtn').addEventListener('click', () => this.startSpeaking());
        document.getElementById('playBtn').addEventListener('click', () => this.playSentence());
        
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', () => {
                const level = parseInt(card.dataset.level);
                const status = card.querySelector('.level-status');
                if (status.classList.contains('completed') || level === this.getNextUnlockedLevel()) {
                    this.startLevel(level);
                }
            });
        });
        
        document.querySelectorAll('.shop-buy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.dataset.item;
                this.buyItem(item);
            });
        });
    }

    loadGameState() {
        const saved = localStorage.getItem('matilda_game');
        if (saved) {
            const state = JSON.parse(saved);
            this.gold = state.gold || 0;
            this.attackPower = state.attackPower || 10;
            this.defense = state.defense || 5;
            this.freezeCount = state.freezeCount || 1;
            this.skipCount = state.skipCount || 1;
            this.hintCount = state.hintCount || 1;
            this.updateGoldDisplay();
            this.updateEquipmentDisplay();
            this.updatePowerUpButtons();
        }
    }

    saveGameState() {
        const state = {
            gold: this.gold,
            attackPower: this.attackPower,
            defense: this.defense,
            freezeCount: this.freezeCount,
            skipCount: this.skipCount,
            hintCount: this.hintCount
        };
        localStorage.setItem('matilda_game', JSON.stringify(state));
    }

    openBook() {
        document.querySelector('.book-cover').style.display = 'none';
        document.getElementById('bookPages').style.display = 'flex';
    }

    backToBook() {
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('magicBook').style.display = 'block';
    }

    startLevel(level) {
        this.currentLevel = level;
        const levelData = GAME_DATA.levels[level - 1];
        this.monsterHealth = levelData.boss ? 200 : 100;
        this.playerHealth = 100;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalDamageDealt = 0;
        
        document.getElementById('magicBook').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'flex';
        
        document.getElementById('gameTitle').textContent = `关卡 ${level} - ${levelData.name}`;
        document.getElementById('monsterEmoji').textContent = levelData.monster;
        document.getElementById('monsterName').textContent = levelData.boss ? 'Boss怪物' : '怪物';
        
        this.updateHealthBars();
        this.playSong();
        this.showNextQuestion();
    }

    playSong() {
        const songIndex = (this.currentLevel - 1) % GAME_DATA.songs.length;
        const song = GAME_DATA.songs[songIndex];
        document.getElementById('songInfo').textContent = `🎵 ${song.name}`;
        
        setTimeout(() => {
            this.showNextQuestion();
        }, 2000);
    }

    skipSong() {
        this.showNextQuestion();
    }

    showNextQuestion() {
        if (this.currentQuestionIndex >= GAME_DATA.levels[this.currentLevel - 1].questions) {
            this.levelComplete();
            return;
        }
        
        const types = ['choice', 'spelling', 'matching', 'speaking'];
        this.currentQuestionType = types[this.currentQuestionIndex % types.length];
        
        document.getElementById('questionArea').style.display = 'none';
        document.getElementById('spellingArea').style.display = 'none';
        document.getElementById('matchingArea').style.display = 'none';
        document.getElementById('speakingArea').style.display = 'none';
        
        switch (this.currentQuestionType) {
            case 'choice':
                this.showChoiceQuestion();
                break;
            case 'spelling':
                this.showSpellingQuestion();
                break;
            case 'matching':
                this.showMatchingQuestion();
                break;
            case 'speaking':
                this.showSpeakingQuestion();
                break;
        }
    }

    showChoiceQuestion() {
        const questions = GAME_DATA.questions.choice;
        const question = questions[this.currentQuestionIndex % questions.length];
        
        document.getElementById('questionArea').style.display = 'block';
        document.getElementById('questionType').textContent = '选择题';
        document.getElementById('questionText').textContent = question.question;
        
        const optionsContainer = document.getElementById('questionOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.dataset.index = index;
            btn.addEventListener('click', () => this.checkChoiceAnswer(index));
            optionsContainer.appendChild(btn);
        });
        
        document.getElementById('questionFeedback').style.display = 'none';
    }

    checkChoiceAnswer(index) {
        const questions = GAME_DATA.questions.choice;
        const question = questions[this.currentQuestionIndex % questions.length];
        const feedback = document.getElementById('questionFeedback');
        
        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
        
        if (index === question.answer) {
            feedback.textContent = '🎉 答对了！玛蒂尔达发动攻击！';
            feedback.className = 'question-feedback correct';
            this.attackMonster();
        } else {
            feedback.textContent = '😢 答错了！自己掉血了！';
            feedback.className = 'question-feedback wrong';
            this.playerDamage();
        }
        
        feedback.style.display = 'block';
        
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.showNextQuestion();
        }, 1500);
    }

    showSpellingQuestion() {
        const questions = GAME_DATA.questions.spelling;
        const question = questions[this.currentQuestionIndex % questions.length];
        
        document.getElementById('spellingArea').style.display = 'block';
        document.getElementById('spellingHint').textContent = question.hint;
        document.getElementById('spellingSentence').textContent = question.sentence;
        
        const letters = question.word.split('');
        this.shuffleArray(letters);
        
        const dragArea = document.getElementById('spellingDragArea');
        dragArea.innerHTML = '';
        
        letters.forEach((letter, index) => {
            const tile = document.createElement('div');
            tile.className = 'letter-tile';
            tile.textContent = letter.toUpperCase();
            tile.draggable = true;
            tile.dataset.index = index;
            tile.addEventListener('dragstart', (e) => this.dragStart(e));
            tile.addEventListener('dragend', (e) => this.dragEnd(e));
            dragArea.appendChild(tile);
        });
        
        const dropArea = document.getElementById('spellingDropArea');
        dropArea.innerHTML = '';
        
        for (let i = 0; i < question.word.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'drop-slot';
            slot.dataset.position = i;
            slot.addEventListener('dragover', (e) => this.dragOver(e));
            slot.addEventListener('dragleave', (e) => this.dragLeave(e));
            slot.addEventListener('drop', (e) => this.drop(e));
            dropArea.appendChild(slot);
        }
    }

    dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.target.classList.add('dragging');
    }

    dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    dragOver(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    dragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    drop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        
        const letter = e.dataTransfer.getData('text/plain');
        e.target.textContent = letter;
        e.target.classList.add('filled');
        
        this.checkSpellingAnswer();
    }

    checkSpellingAnswer() {
        const slots = document.querySelectorAll('.drop-slot');
        const answer = Array.from(slots).map(slot => slot.textContent).join('');
        
        const questions = GAME_DATA.questions.spelling;
        const question = questions[this.currentQuestionIndex % questions.length];
        
        if (answer.toLowerCase() === question.word.toLowerCase() && answer.length === question.word.length) {
            setTimeout(() => {
                this.showSpellingFeedback(true);
            }, 500);
        }
    }

    showSpellingFeedback(correct) {
        const feedback = document.createElement('div');
        feedback.className = `question-feedback ${correct ? 'correct' : 'wrong'}`;
        feedback.textContent = correct ? '🎉 拼写正确！玛蒂尔达发动攻击！' : '😢 拼写错误！自己掉血了！';
        document.getElementById('spellingArea').appendChild(feedback);
        
        if (correct) {
            this.attackMonster();
        } else {
            this.playerDamage();
        }
        
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.showNextQuestion();
        }, 1500);
    }

    showMatchingQuestion() {
        const questions = GAME_DATA.questions.matching;
        const question = questions[this.currentQuestionIndex % questions.length];
        
        document.getElementById('matchingArea').style.display = 'block';
        
        this.matchingPairs = question.pairs;
        this.matchedCount = 0;
        
        const leftItems = [...this.matchingPairs.map(p => p.left)];
        const rightItems = [...this.matchingPairs.map(p => p.right)];
        
        this.shuffleArray(leftItems);
        this.shuffleArray(rightItems);
        
        const leftContainer = document.getElementById('matchingLeft');
        const rightContainer = document.getElementById('matchingRight');
        
        leftContainer.innerHTML = '';
        rightContainer.innerHTML = '';
        
        leftItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'matching-item';
            div.textContent = item;
            div.dataset.side = 'left';
            div.dataset.index = index;
            div.addEventListener('click', () => this.selectMatchingItem(div, 'left', index));
            leftContainer.appendChild(div);
        });
        
        rightItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'matching-item';
            div.textContent = item;
            div.dataset.side = 'right';
            div.dataset.index = index;
            div.addEventListener('click', () => this.selectMatchingItem(div, 'right', index));
            rightContainer.appendChild(div);
        });
        
        this.selectedLeft = null;
        this.selectedRight = null;
    }

    selectMatchingItem(element, side, index) {
        if (element.classList.contains('matched')) return;
        
        if (side === 'left') {
            if (this.selectedLeft) {
                this.selectedLeft.classList.remove('selected');
            }
            this.selectedLeft = element;
            this.selectedLeftIndex = index;
            element.classList.add('selected');
        } else {
            if (this.selectedRight) {
                this.selectedRight.classList.remove('selected');
            }
            this.selectedRight = element;
            this.selectedRightIndex = index;
            element.classList.add('selected');
        }
        
        if (this.selectedLeft && this.selectedRight) {
            this.checkMatchingAnswer();
        }
    }

    checkMatchingAnswer() {
        const leftText = this.selectedLeft.textContent;
        const rightText = this.selectedRight.textContent;
        
        const correctMatch = this.matchingPairs.some(pair => pair.left === leftText && pair.right === rightText);
        
        if (correctMatch) {
            this.selectedLeft.classList.add('matched');
            this.selectedRight.classList.add('matched');
            this.selectedLeft.classList.remove('selected');
            this.selectedRight.classList.remove('selected');
            this.matchedCount++;
            
            if (this.matchedCount === this.matchingPairs.length) {
                setTimeout(() => {
                    this.showMatchingFeedback(true);
                }, 500);
            }
        } else {
            setTimeout(() => {
                this.selectedLeft.classList.remove('selected');
                this.selectedRight.classList.remove('selected');
                this.selectedLeft = null;
                this.selectedRight = null;
            }, 500);
        }
        
        this.selectedLeft = null;
        this.selectedRight = null;
    }

    showMatchingFeedback(correct) {
        const feedback = document.createElement('div');
        feedback.className = `question-feedback ${correct ? 'correct' : 'wrong'}`;
        feedback.textContent = correct ? '🎉 全部连对了！玛蒂尔达发动攻击！' : '😢 连线错误！';
        document.getElementById('matchingArea').appendChild(feedback);
        
        if (correct) {
            this.attackMonster();
        }
        
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.showNextQuestion();
        }, 1500);
    }

    showSpeakingQuestion() {
        const questions = GAME_DATA.questions.speaking;
        const question = questions[this.currentQuestionIndex % questions.length];
        
        document.getElementById('speakingArea').style.display = 'block';
        document.getElementById('speakingSentence').textContent = `"${question.sentence}"`;
        document.getElementById('speakingScore').textContent = '';
    }

    playSentence() {
        const text = document.getElementById('speakingSentence').textContent.replace(/"/g, '');
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }

    startSpeaking() {
        const btn = document.getElementById('speakBtn');
        btn.textContent = '🎤 录音中...';
        
        setTimeout(() => {
            const score = Math.floor(Math.random() * 30) + 70;
            document.getElementById('speakingScore').textContent = `发音得分: ${score}分`;
            
            if (score >= 80) {
                document.getElementById('speakingScore').style.color = '#4caf50';
                this.attackMonster();
            } else {
                document.getElementById('speakingScore').style.color = '#ff6b6b';
                this.playerDamage();
            }
            
            btn.textContent = '🎤 开始录音';
            
            setTimeout(() => {
                this.currentQuestionIndex++;
                this.showNextQuestion();
            }, 1500);
        }, 3000);
    }

    attackMonster() {
        const damage = this.attackPower + Math.floor(Math.random() * 10);
        this.monsterHealth -= damage;
        this.totalDamageDealt += damage;
        
        this.showAttackEffect();
        this.showDamageNumber(damage);
        
        const monsterEmoji = document.getElementById('monsterEmoji');
        monsterEmoji.classList.add('hurt');
        setTimeout(() => monsterEmoji.classList.remove('hurt'), 300);
        
        this.updateHealthBars();
        
        if (this.monsterHealth <= 0) {
            this.monsterHealth = 0;
            this.updateHealthBars();
            this.levelComplete();
        }
    }

    playerDamage() {
        const damage = Math.max(5, 15 - this.defense);
        this.playerHealth -= damage;
        
        this.updateHealthBars();
        
        if (this.playerHealth <= 0) {
            this.playerHealth = 0;
            this.updateHealthBars();
            this.gameOver();
        }
    }

    showAttackEffect() {
        const effect = document.getElementById('attackEffect');
        effect.textContent = '✨💫';
        effect.style.display = 'block';
        
        setTimeout(() => {
            effect.style.display = 'none';
        }, 500);
    }

    showDamageNumber(damage) {
        const number = document.getElementById('damageNumber');
        number.textContent = `-${damage}`;
        number.style.left = '60%';
        number.style.top = '30%';
        number.style.display = 'block';
        
        setTimeout(() => {
            number.style.display = 'none';
        }, 1000);
    }

    updateHealthBars() {
        const playerHealth = document.getElementById('playerHealth');
        const playerText = document.getElementById('playerHealthText');
        const monsterHealth = document.getElementById('monsterHealth');
        const monsterText = document.getElementById('monsterHealthText');
        
        playerHealth.style.width = `${this.playerHealth}%`;
        playerText.textContent = `${this.playerHealth}/100`;
        
        const maxMonsterHealth = GAME_DATA.levels[this.currentLevel - 1].boss ? 200 : 100;
        monsterHealth.style.width = `${(this.monsterHealth / maxMonsterHealth) * 100}%`;
        monsterText.textContent = `${this.monsterHealth}/${maxMonsterHealth}`;
    }

    updateGoldDisplay() {
        document.getElementById('goldAmount').textContent = this.gold;
    }

    updateEquipmentDisplay() {
        document.querySelector('#weapon .equip-level').textContent = `Lv.${Math.floor(this.attackPower / 10)}`;
        document.querySelector('#weapon .equip-stat').textContent = `攻击力 +${this.attackPower}`;
        document.querySelector('#armor .equip-level').textContent = `Lv.${Math.floor(this.defense / 5)}`;
        document.querySelector('#armor .equip-stat').textContent = `防御力 +${this.defense}`;
    }

    updatePowerUpButtons() {
        document.getElementById('freezeBtn').disabled = this.freezeCount <= 0;
        document.getElementById('skipQuestionBtn').disabled = this.skipCount <= 0;
        document.getElementById('hintBtn').disabled = this.hintCount <= 0;
    }

    useFreeze() {
        if (this.freezeCount <= 0) return;
        
        this.freezeCount--;
        this.freezeActive = true;
        this.updatePowerUpButtons();
        
        setTimeout(() => {
            this.freezeActive = false;
        }, 3000);
    }

    useSkip() {
        if (this.skipCount <= 0) return;
        
        this.skipCount--;
        this.updatePowerUpButtons();
        this.currentQuestionIndex++;
        this.showNextQuestion();
    }

    useHint() {
        if (this.hintCount <= 0) return;
        
        this.hintCount--;
        this.updatePowerUpButtons();
        
        if (this.currentQuestionType === 'choice') {
            const options = document.querySelectorAll('.option-btn');
            const questions = GAME_DATA.questions.choice;
            const question = questions[this.currentQuestionIndex % questions.length];
            
            options.forEach((opt, index) => {
                if (index !== question.answer && Math.random() > 0.5) {
                    opt.style.opacity = '0.3';
                }
            });
        }
    }

    levelComplete() {
        const coins = this.currentLevel * 20 + Math.floor(Math.random() * 30);
        this.gold += coins;
        
        document.getElementById('coinsEarned').textContent = `+${coins}`;
        document.getElementById('damageDealt').textContent = this.totalDamageDealt;
        document.getElementById('resultIcon').textContent = '🎉';
        document.getElementById('resultTitle').textContent = '胜利！';
        document.getElementById('resultModal').style.display = 'flex';
        
        this.unlockNextLevel();
        this.saveGameState();
        this.updateGoldDisplay();
    }

    gameOver() {
        document.getElementById('coinsEarned').textContent = '+0';
        document.getElementById('damageDealt').textContent = this.totalDamageDealt;
        document.getElementById('resultIcon').textContent = '💔';
        document.getElementById('resultTitle').textContent = '失败了...';
        document.getElementById('resultModal').style.display = 'flex';
    }

    continueGame() {
        document.getElementById('resultModal').style.display = 'none';
        
        if (this.currentLevel < GAME_DATA.levels.length) {
            this.backToBook();
        } else {
            this.backToBook();
        }
    }

    retryLevel() {
        document.getElementById('resultModal').style.display = 'none';
        this.startLevel(this.currentLevel);
    }

    unlockNextLevel() {
        const nextLevel = this.currentLevel + 1;
        if (nextLevel <= GAME_DATA.levels.length) {
            const card = document.querySelector(`.level-card[data-level="${nextLevel}"]`);
            if (card) {
                const status = card.querySelector('.level-status');
                status.classList.remove('locked');
                status.classList.add('completed');
                status.textContent = '✓';
            }
        }
    }

    getNextUnlockedLevel() {
        for (let i = 1; i <= GAME_DATA.levels.length; i++) {
            const card = document.querySelector(`.level-card[data-level="${i}"]`);
            const status = card.querySelector('.level-status');
            if (!status.classList.contains('completed')) {
                return i;
            }
        }
        return 1;
    }

    openShop() {
        document.getElementById('shopModal').style.display = 'flex';
    }

    closeShop() {
        document.getElementById('shopModal').style.display = 'none';
    }

    buyItem(item) {
        let cost = 0;
        
        switch (item) {
            case 'weapon':
                cost = 50;
                if (this.gold >= cost) {
                    this.gold -= cost;
                    this.attackPower += 10;
                }
                break;
            case 'armor':
                cost = 50;
                if (this.gold >= cost) {
                    this.gold -= cost;
                    this.defense += 5;
                }
                break;
            case 'freeze':
                cost = 30;
                if (this.gold >= cost) {
                    this.gold -= cost;
                    this.freezeCount++;
                }
                break;
            case 'skip':
                cost = 30;
                if (this.gold >= cost) {
                    this.gold -= cost;
                    this.skipCount++;
                }
                break;
        }
        
        this.saveGameState();
        this.updateGoldDisplay();
        this.updateEquipmentDisplay();
        this.updatePowerUpButtons();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game();
});