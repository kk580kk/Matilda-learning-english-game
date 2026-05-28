// 玛蒂尔达英语学习游戏 - 题目数据库
// 基于《玛蒂尔达》音乐剧和故事

const GAME_DATA = {
    levels: [
        {
            id: 1,
            name: "神奇的玛蒂尔达",
            song: "Miracle",
            description: "认识聪明勇敢的小玛蒂尔达",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "My mummy says I'm a miracle",
                    question: "玛蒂尔达说自己是'a miracle'，这个词的意思是？",
                    options: ["奇迹", "麻烦", "普通孩子", "淘气包"],
                    correct: 0,
                    hint: "Miracle 意思是奇迹、神奇的事情"
                },
                {
                    type: "spelling",
                    context: "玛蒂尔达非常聪明，她喜欢r_____（阅读）书籍。",
                    word: "reading",
                    letters: ["r", "e", "a", "d", "i", "n", "g", "s", "t", "o"],
                    hint: "看书的动作，动词+ing形式"
                },
                {
                    type: "matching",
                    left: ["Naughty", "Quiet", "Clever", "Magical"],
                    right: ["淘气的", "安静的", "聪明的", "有魔法的"],
                    correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]]
                },
                {
                    type: "read_along",
                    text: "Somewhere inside all of us is the power to change the world",
                    translation: "在我们每个人内心深处，都有改变世界的力量",
                    difficulty: "medium"
                }
            ]
        },
        {
            id: 2,
            name: "学校奇遇",
            song: "School Song",
            description: "来到可怕的川奇布尔学校",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "When I grow up, I will be brave enough to fight the creatures that you have to fight beneath the bed",
                    question: "歌词中'brave'的意思是？",
                    options: ["聪明的", "勇敢的", "善良的", "强壮的"],
                    correct: 1,
                    hint: "Brave 意思是勇敢、有勇气"
                },
                {
                    type: "spelling",
                    context: "川奇布尔校长很可怕，她总是s_____（尖叫）",
                    word: "scream",
                    letters: ["s", "c", "r", "e", "a", "m", "i", "n", "g", "t"],
                    hint: "大声喊叫，表达害怕或生气"
                },
                {
                    type: "multiple_choice",
                    audioText: "Revolting children, living in revolting schools",
                    question: "'Revolting'在这里的意思是？",
                    options: ["反抗的", "令人恶心的", "革命的", "旋转的"],
                    correct: 1,
                    hint: "校长用这个词形容孩子和学校，带有贬义"
                },
                {
                    type: "matching",
                    left: ["Teacher", "Headmistress", "Classroom", "Library"],
                    right: ["老师", "女校长", "教室", "图书馆"],
                    correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]]
                }
            ]
        },
        {
            id: 3,
            name: "蜂蜜爸爸",
            song: "Telly",
            description: "爸爸太爱看电视了！",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "All I know I learned from telly",
                    question: "爸爸说他从'telly'学到了一切，'telly'是？",
                    options: ["书籍", "电视", "老师", "朋友"],
                    correct: 1,
                    hint: "Telly 是英国英语，指电视机 television"
                },
                {
                    type: "spelling",
                    context: "玛蒂尔达在图书馆读了很多b_____（书）",
                    word: "books",
                    letters: ["b", "o", "o", "k", "s", "r", "e", "a", "d", "i"],
                    hint: "复数形式"
                },
                {
                    type: "multiple_choice",
                    question: "爸爸认为什么最重要？",
                    options: ["读书", "看电视", "学习", "运动"],
                    correct: 1,
                    hint: "爸爸说'All I know I learned from telly'"
                },
                {
                    type: "read_along",
                    text: "The more you read, the more things you will know",
                    translation: "你读的书越多，你知道的事情就越多",
                    difficulty: "easy"
                }
            ]
        },
        {
            id: 4,
            name: "布里奇特小姐",
            song: "This Little Girl",
            description: "温柔的布里奇特小姐发现玛蒂尔达的特别",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "This little girl is as sweet as can be",
                    question: "'Sweet as can be'的意思是玛蒂尔达？",
                    options: ["很甜", "非常可爱", "很聪明", "很淘气"],
                    correct: 1,
                    hint: "Sweet 在这里形容人可爱、讨人喜欢"
                },
                {
                    type: "spelling",
                    context: "布里奇特小姐很k_____（善良的）",
                    word: "kind",
                    letters: ["k", "i", "n", "d", "c", "r", "u", "e", "l", "s"],
                    hint: "对人友好、温和"
                },
                {
                    type: "matching",
                    left: ["Honey", "Trunchbull", "Matilda", "Lavender"],
                    right: ["蜂蜜老师", "川奇布尔校长", "玛蒂尔达", "拉文德"],
                    correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]]
                },
                {
                    type: "read_along",
                    text: "Even if you're little, you can do a lot",
                    translation: "即使你年纪小，你也能做很多事",
                    difficulty: "medium"
                }
            ]
        },
        {
            id: 5,
            name: "当我们长大",
            song: "When I Grow Up",
    description: "孩子们憧憬着长大",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "When I grow up, I will be tall enough to reach the branches that the trees grow up",
                    question: "孩子们长大想够到什么？",
                    options: ["天空", "树枝", "云朵", "星星"],
                    correct: 1,
                    hint: "歌词说 reach the branches that the trees grow up"
                },
                {
                    type: "spelling",
                    context: "长大可以变得s_____（更强壮）",
                    word: "stronger",
                    letters: ["s", "t", "r", "o", "n", "g", "e", "r", "a", "l"],
                    hint: "strong 的比较级"
                },
                {
                    type: "multiple_choice",
                    question: "孩子们长大后想做什么？",
                    options: ["永远玩耍", "吃糖果", "买玩具", "以上都是"],
                    correct: 3,
                    hint: "歌词提到 eat candy, go to bed late, buy toys"
                },
                {
                    type: "read_along",
                    text: "When I grow up, I will be brave enough to fight the creatures under the bed",
                    translation: "等我长大了，我要勇敢到能和床底下的怪物战斗",
                    difficulty: "hard"
                }
            ]
        },
        {
            id: 6,
            name: "川奇布尔的恐惧",
            song: "The Smell of Rebellion",
            description: "川奇布尔校长讨厌孩子们的反叛精神",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "The smell of rebellion is in the air",
                    question: "'Rebellion'的意思是？",
                    options: ["反叛", "香水", "花朵", "食物"],
                    correct: 0,
                    hint: "Rebellion 意思是反抗、反叛权威"
                },
                {
                    type: "spelling",
                    context: "川奇布尔校长非常s_____（严厉）",
                    word: "strict",
                    letters: ["s", "t", "r", "i", "c", "t", "e", "a", "s", "y"],
                    hint: "要求严格，不容易通融"
                },
                {
                    type: "matching",
                    left: ["Punishment", "Detention", "Exercise", "Discipline"],
                    right: ["惩罚", "留校", "运动", "纪律"],
                    correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]]
                },
                {
                    type: "multiple_choice",
                    question: "川奇布尔校长用什么惩罚学生？",
                    options: ["禁闭室", "抄写", "运动", "以上都是"],
                    correct: 3,
                    hint: "她用各种方法惩罚孩子"
                }
            ]
        },
        {
            id: 7,
            name: "玛蒂尔达的魔法",
            song: "Quiet",
            description: "玛蒂尔达发现自己有超能力！",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "Quiet, like silence, but not really silent",
                    question: "这首歌叫'Quiet'，意思是？",
                    options: ["吵闹", "安静", "快乐", "悲伤"],
                    correct: 1,
                    hint: "Quiet 意思是安静、宁静"
                },
                {
                    type: "spelling",
                    context: "玛蒂尔达可以用m_____（魔法）移动东西",
                    word: "magic",
                    letters: ["m", "a", "g", "i", "c", "p", "o", "w", "e", "r"],
                    hint: "超自然的神秘力量"
                },
                {
                    type: "multiple_choice",
                    question: "玛蒂尔达的超能力是什么？",
                    options: ["飞行", "用意念移动物体", "隐身", "穿墙"],
                    correct: 1,
                    hint: "她用意念把粉笔写在黑板上"
                },
                {
                    type: "read_along",
                    text: "The voices in my head keep telling me to be brave",
                    translation: "我脑海中的声音一直告诉我要勇敢",
                    difficulty: "hard"
                }
            ]
        },
        {
            id: 8,
            name: "复仇时刻",
            song: "Bruce",
            description: "孩子们反抗川奇布尔校长的恐怖统治",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "Bruce, you are invited to my party",
                    question: "川奇布尔校长让布鲁斯做什么？",
                    options: ["唱歌", "跳舞", "吃蛋糕", "读书"],
                    correct: 2,
                    hint: "她强迫布鲁斯吃巨大的蛋糕"
                },
                {
                    type: "spelling",
                    context: "孩子们一起c_____（欢呼）布鲁斯",
                    word: "cheer",
                    letters: ["c", "h", "e", "e", "r", "s", "c", "r", "y", "t"],
                    hint: "为某人加油、欢呼"
                },
                {
                    type: "matching",
                    left: ["Victory", "Celebrate", "Together", "Strong"],
                    right: ["胜利", "庆祝", "一起", "强壮"],
                    correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]]
                },
                {
                    type: "read_along",
                    text: "We are revolting children, living in revolting times",
                    translation: "我们是反抗的孩子，生活在反抗的时代",
                    difficulty: "hard"
                }
            ]
        },
        {
            id: 9,
            name: "我的家",
            song: "My House",
            description: "布里奇特小姐找到真正的家",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "My house, my house, my house, my house",
                    question: "这首歌表达了什么情感？",
                    options: ["悲伤", "愤怒", "温暖和幸福", "恐惧"],
                    correct: 2,
                    hint: "找到家的温暖感觉"
                },
                {
                    type: "spelling",
                    context: "家是一个s_____（安全）的地方",
                    word: "safe",
                    letters: ["s", "a", "f", "e", "w", "a", "r", "m", "c", "o"],
                    hint: "没有危险，让人感到安心"
                },
                {
                    type: "multiple_choice",
                    question: "最后谁收养了玛蒂尔达？",
                    options: ["川奇布尔校长", "布里奇特小姐", "玛蒂尔达的父母", "拉文德"],
                    correct: 1,
                    hint: "温柔的布里奇特小姐成为了她的家人"
                },
                {
                    type: "read_along",
                    text: "And home is where your heart is",
                    translation: "家就在你心之所在",
                    difficulty: "easy"
                }
            ]
        },
        {
            id: 10,
            name: "最终战役",
            song: "Revolting Children",
            description: "孩子们团结起来打败川奇布尔校长！",
            questions: [
                {
                    type: "multiple_choice",
                    audioText: "We are revolting children, living in revolting times",
                    question: "这里的'revolting'是什么意思？",
                    options: ["反抗的", "令人恶心的", "革命的", "旋转的"],
                    correct: 0,
                    hint: "孩子们用这个词表达反抗精神"
                },
                {
                    type: "spelling",
                    context: "孩子们f_____（战斗）邪恶的校长",
                    word: "fight",
                    letters: ["f", "i", "g", "h", "t", "s", "t", "a", "n", "d"],
                    hint: "与坏人斗争"
                },
                {
                    type: "matching",
                    left: ["Freedom", "Justice", "Friendship", "Courage"],
                    right: ["自由", "正义", "友谊", "勇气"],
                    correctPairs: [[0, 0], [1, 1], [2, 2], [3, 3]]
                },
                {
                    type: "read_along",
                    text: "Never again will children be slaves to the Trunchbull",
                    translation: "孩子们再也不会成为川奇布尔的奴隶",
                    difficulty: "hard"
                }
            ]
        }
    ],

    // 游戏配置
    gameConfig: {
        playerHealth: 100,
        monsterHealth: 100,
        damagePerHit: 20,
        healAmount: 15,
        coinReward: 50,
        timeLimit: 30, // 每题限时30秒
        items: {
            freeze: { name: "冻结时间", cost: 30, effect: "暂停计时10秒" },
            skip: { name: "跳过问题", cost: 50, effect: "跳过当前题目" },
            remove: { name: "去错", cost: 40, effect: "去掉2个错误答案" }
        }
    },

    // 怪物数据
    monsters: [
        { emoji: "👹", name: "讨厌鬼", health: 60 },
        { emoji: "🐲", name: "大怪兽", health: 80 },
        { emoji: "👻", name: "幽灵", health: 70 },
        { emoji: "🦹", name: "小坏蛋", health: 65 },
        { emoji: "🧟", name: "僵尸", health: 75 },
        { emoji: "🦂", name: "蝎子怪", health: 85 },
        { emoji: "🐍", name: "毒蛇", health: 90 },
        { emoji: "🦖", name: "霸王龙", health: 95 },
        { emoji: "👺", name: "恶魔", health: 100 },
        { emoji: "🎭", name: "川奇布尔BOSS", health: 150, isBoss: true }
    ]
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_DATA;
}
