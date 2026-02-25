// 小说写作助手 - 前端 JavaScript（纯前端版本）

// ==================== 本地数据 ====================
const LOCAL_DATA = {
    // 随机情节
    plot: {
        all: [
            "主角在修炼时意外突破境界，却引来了强大的敌人追踪",
            "secret组织暗中操控着整个帝国的命脉，主角意外发现了他们的阴谋",
            "千年古墓现世，各方势力齐聚，主角能否在争夺中全身而退？",
            "主角的前世记忆突然觉醒，原来自己背负着重大的使命",
            "在最绝望的时刻，主角发现自己体内隐藏着古老血脉的力量",
            "一场意外的相遇，让主角与仇人之子结成了生死之交",
            "主角在历练中误入禁区，遇到了一位沉睡万年的存在",
            "天地大劫将至，主角必须在有限的时间内找到拯救苍生的方法",
            "主角的身份突然被揭开，原来他并不是普通人",
            "在比赛中遭遇黑幕，主角用实力证明自己的清白",
            "主角救下的流浪动物，竟然是上古神兽的后裔",
            "一次时空错位，主角来到了千年后的世界",
            "主角的武器突然觉醒灵智，开始指导他修炼",
            "在被追杀的途中，主角发现了一个与世隔绝的秘境",
            "主角的师门遭遇灭顶之灾，唯有他一人幸存",
            "主角在拍卖会上拍下的物品，竟然是上古魔器",
            "主角的恋人在大婚之日被人掳走，从此踏上了寻找之旅",
            "主角在深山中遇到一位神秘老人，传授给他失传已久的绝技",
            "主角意外吞下天地奇珍，身体发生了意想不到的变化",
            "主角在突破境界时心魔入侵，差点走火入魔"
        ],
        conflict: [
            "两大宗门爆发战争，主角被迫在夹缝中求存",
            "主角发现挚友背叛了自己，两人反目成仇",
            "主角的家族被人陷害，满门被灭，唯有他独自存活",
            "主角得罪了权贵，遭到全国通缉",
            "主角的身份被发现，原来他是魔道后裔",
            "主角被冤枉成凶手，必须证明自己的清白",
            "主角的师父是隐藏的叛徒，一切都只是一场阴谋",
            "主角所在的城市突然被怪物包围，生死存亡之际",
            "主角发现了皇帝的secret，面临着杀身之祸",
            "主角的好友为了救他而牺牲自己"
        ],
        romance: [
            "在花灯节上，主角与一位神秘女子相遇，一见钟情",
            "主角英雄救美，却被这位女子认定为命中注定之人",
            "主角与青梅竹马分离多年，再次重逢时已是物是人非",
            "主角在养伤期间，与照顾他的女子日久生情",
            "主角与敌对势力的千金相爱，却面临着家族仇恨",
            "主角在历练途中救下的狐狸精，决定以身相许",
            "主角与女扮男装的公主不打不相识，最终发现真相",
            "主角与师父的女儿日久生情，却不敢表白",
            "主角的前世情人转世相遇，却已不记得前缘",
            "主角在秘境中与一位女修结为道侣，共同面对危机"
        ],
        sad: [
            "主角深爱的人为了救他而牺牲自己",
            "主角的师父在渡劫时失败，身死道消",
            "主角的家族为了保护他，全部遇难",
            "主角被迫与恋人分离，此生再无相见之日",
            "主角的好友为了成全他，选择自我牺牲",
            "主角发现自己的身世真相，面临着艰难的选择",
            "主角的父母为了救他，献出了自己的生命",
            "主角的师父其实是幕后黑手，一切都只是利用",
            "主角的爱人中了无法解除的毒药，时日无多",
            "主角在最后时刻才明白，自己一直误解了最重要的人"
        ],
        adventure: [
            "主角发现一处上古遗迹，进去探索后发现巨大宝藏",
            "主角误入空间裂缝，来到一个陌生的修仙世界",
            "主角得到一张神秘地图，标注着成仙的秘密",
            "主角的宠物突然觉醒血脉，带他来到一处秘境",
            "主角在渡劫时意外飞升，来到仙界",
            "主角发现师门密室，里面藏着成神的秘密",
            "主角被传送到一个全是修仙者的遗迹大陆",
            "主角的武器进化成神器，引领他找到传承",
            "主角在幻境中经历千年，醒来后修为大增",
            "主角的灵魂穿越到异世界，开始新的冒险"
        ],
        mystery: [
            "主角发现自己身边的朋友都在暗中监视他",
            "主角每晚都会做一个相同的预知梦",
            "主角的身世之谜与一个secret组织有关",
            "主角意外发现一本神秘的日记，记录着未来的事情",
            "主角的师父隐藏着secret身份",
            "主角所在的世界其实是一个巨大的幻阵",
            "主角遇到的每一个人都似乎在引导他走向某个命运",
            "主角发现自己可以听到别人内心的secret",
            "主角的家族世代守护着一个secret不能让任何人知道",
            "主角在梦中看到了自己死亡的景象"
        ],
        turn: [
            "主角一直以为的敌人，实际上是暗中保护他的人",
            "主角修炼的功法实际上是魔功，只是被好人改造过",
            "主角一直追求的目标，其实只是一个谎言",
            "主角最信任的人，竟然是幕后黑手",
            "主角的仇人其实是他的亲身父亲",
            "主角一直想要成为强者，却发现自己只是棋子",
            "主角以为的奇遇，实际上是一个陷阱",
            "主角拯救的世界，其实并不需要他",
            "主角追求的成仙之路，竟然是错的",
            "主角一直在逃避的命运，最终还是找上了门"
        ]
    },

    // 随机名称 - 人物
    name: {
        person: {
            xuanhuan: {
                2: ['萧炎', '林动', '牧尘', '陆雪', '薰儿', '彩鳞', '云韵', '小医仙', '青鳞', '紫研'],
                3: ['萧炎', '林动', '牧尘', '周通', '吴通', '药尘', '古元', '烛坤', '魂天帝', '虚无吞炎'],
                4: ['萧熏儿', '彩鳞', '小医仙', '青鳞', '紫研', '云韵', '美杜莎', '药老']
            },
            qihuan: {
                2: ['叶凡', '庞博', '姜太虚', '狠人大帝', '无始大帝', '虚空大帝'],
                3: ['叶凡', '庞博', '姜神', '虚空', '无始', '狠人'],
                4: ['叶凡', '庞博']
            },
            lightnovel: {
                2: ['翔', '空', '雪', '风', '雷', '焰', '冰', '羽'],
                3: ['翔空', '雪风', '雷焰', '冰羽', '悠真', '美咲'],
                4: ['悠真', '美咲', '凛']
            },
            urban: {
                2: ['浩然', '子墨', '子轩', '欣怡', '雨晴', '思雨', '梦琪', '雅静'],
                3: ['浩然', '子墨', '子轩', '欣怡', '雨晴'],
                4: ['浩然', '子墨']
            },
            scifi: {
                2: ['零', '星', '光', '影', '风', '雷', '霆', '曜'],
                3: ['零星', '光影', '风雷', '霆曜', '天启', '星航'],
                4: ['天启', '星航']
            },
            history: {
                2: ['政', '羽', '邦', '彻', '彻', '武', '文', '景'],
                3: ['秦始皇', '楚霸王', '汉武帝', '唐太宗', '宋太祖', '成吉思汗'],
                4: ['秦始皇', '汉武帝']
            }
        },
        // 地名
        place: {
            xuanhuan: ['乌坦城', '加玛帝国', '黑角域', '中州', '星陨阁', '花宗', '丹塔', '焚炎谷', '天府', '魂殿', '天府联盟', '古界', '药界', '魂族', '古族'],
            qihuan: ['荒古禁地', '北域', '南域', '中州', '东荒', '西漠', '北斗星域', '紫微星', '荧惑', '火星'],
            lightnovel: ['樱花学园', '风见学园', '星藤学园', '清隆学园', '总武高', '丰之崎', '私立希望之峰'],
            urban: ['京城', '魔都', '海城', '江城', '山城', '星城市', '龙城', '凤城'],
            scifi: ['新地球', '火星基地', '月球城', '木星轨道站', '土星环', '半人马座', '三体星系'],
            history: ['长安', '洛阳', '金陵', '燕京', '姑苏', '蜀中', '塞外', '西域', '南洋', '东海']
        },
        // 门派
        faction: {
            xuanhuan: ['焚炎谷', '花宗', '星陨阁', '丹塔', '天府', '魂殿', '古族', '萧门', '炎盟', '蛇人部落', '天冥宗', '冰河谷', '慕骨门'],
            qihuan: ['太玄门', '摇光圣地', '瑶池圣地', '道一圣地', '姬家', '摇光', '太初古矿', '荒古禁地'],
            lightnovel: ['学生会的', '社团部的', '体育系的', '文艺部的'],
            urban: ['龙组的', '天组的', '地组的', '隐世家族的'],
            scifi: ['星际联邦', '银河帝国', '新人类联盟', '机械联邦'],
            history: ['少林', '武当', '华山', '峨眉', '昆仑', '天山', '丐帮', '明教', '日月神教']
        },
        // 武器
        weapon: {
            xuanhuan: ['玄重尺', '异火', '青莲地心火', '骨灵冷火', '三千焱炎火', '八荒破灭矛', '金帝焚天焰', '红莲业火', '琉璃心火', '阴阳双炎', '九龙雷罡火', '龟灵地火', '陨落心炎', '海心焰', '火云水炎', '火稚', '红粉真人', '太阳神火'],
            qihuan: ['万物母气鼎', '混沌青莲', '仙泪绿金剑', '龙纹黑金鼎', '凰血赤金铃', '神痕紫金剑', '龙骨', '圣印发', '仙钟', '河图洛书', '封神榜', '打神鞭', '杏黄旗', '戊己杏黄旗', '青莲宝色旗', '离地焰光旗', '真武皂雕旗', '中央戊己杏黄旗'],
            lightnovel: ['光剑', '冰剑', '雷鸣剑', '风之剑', '水之剑', '火之剑'],
            urban: ['赤手空拳', '君子剑', '湛卢剑', '干将莫邪', '太阿剑', '龙泉剑'],
            scifi: ['光剑', '量子剑', '等离子剑', '引力场', '立场盾'],
            history: ['倚天剑', '屠龙刀', '君子剑', '湛卢剑', '越王勾践剑', '唐刀', '苗刀']
        },
        // 功法
        technique: {
            xuanhuan: ['焚诀', '八极崩', '开山印', '翻海印', '毁灭火莲', '三色火莲', '佛怒火莲', '三千雷动', '三千雷幻身', '龙凤体', '金刚琉璃体', '天阶斗技', '地阶斗技'],
            qihuan: ['皆字秘', '者字秘', '行字秘', '坐字秘', '前字秘', '后字秘', '斗字秘', '兵字秘', '皆字秘', '组字秘', '数字秘'],
            lightnovel: ['天心流', '风之呼吸', '雷之呼吸', '冰之呼吸', '剑道', '刀道'],
            urban: ['九转玄功', '易筋经', '洗髓经', '北冥神功', '先天功', '九阴真经', '九阳真经'],
            scifi: ['基因锁', '念力', '虚空能', '暗能量'],
            history: ['易筋经', '洗髓经', '九阴真经', '九阳真经', '北冥神功', '吸星大法', '葵花宝典', '辟邪剑法']
        },
        // 法宝
        treasure: {
            xuanhuan: ['帝之本源', '陀舍古帝玉', '净莲妖火', '金帝焚天焰', '虚无吞炎', '净莲妖圣传承', '古帝传承', '帝品雏丹', '斗圣骸骨', '天墓之魂', '妖火本源', '菩提古树', '净莲妖火地图', '古图'],
            qihuan: ['万物母气', '混沌种青莲', '仙根', '不死药', '九转仙丹', '悟道古茶树', '圣果', '神泉'],
            lightnovel: ['魔法杖', '魔导书', '贤者之石', '精灵球', '光之玉'],
            urban: ['玉佩', '玉镯', '戒指', '项链', '吊坠'],
            scifi: ['空间戒指', '反重力装置', '曲率引擎', '量子计算机', '能量护盾'],
            history: ['和氏璧', '传国玉玺', '九鼎', '金箍棒', '紫金红葫芦', '幌金绳', '七星剑']
        }
    },

    // 随机对话
    dialogue: [
        "「三十年河东，三十年河西，莫欺少年穷！」",
        "「我命由我不由天！」",
        "「这天，遮不住我的眼；这地，埋不了我的心！」",
        "「凡是阻我者，皆可杀！」",
        "「，既然已无路可退，那便战吧！」",
        "「你以为躲起来就找不到你了吗？没有用的！你是那样拉风的男人，不管在什么地方，就像漆黑中的萤火虫一样，那样的鲜明，那样的出众。」",
        "「我这一剑，可搬山、断江、倒海、降妖、镇魔、敕神、摘星、摧城、开天！」",
        "「修仙之路，本就是与天争命，若是连这点勇气都没有，还修什么仙？」",
        "「大道至简，返璞归真。修为越高，返璞越深。」",
        "「天地不仁，以万物为刍狗；圣人不仁，以百姓为刍狗。」",
        "「剑道之路，一往无前，宁折不弯！」",
        "「拳破苍穹，脚碎星辰！」",
        "「我有一剑，可斩星辰，可断苍穹！」",
        "「修仙只是为了守护最重要的人。」",
        "「力量本身并不可怕，可怕的是使用力量的人。」",
        "「真正的强者，不是没有眼泪，而是含着眼泪继续奔跑。」",
        "「只要有你在，就算与全世界为敌又如何？」",
        "「别小看任何人，说不定他明天就超越你了。」",
        "「机遇与风险并存，想要获得力量，就要付出代价。」",
        "「修仙界没有永远的敌人，也没有永远的朋友。」"
    ],

    // 随机描写
    description: {
        environment: [
            "天空阴沉沉的，厚重的云层压在头顶，仿佛随时都会塌下来。远处的山脉轮廓模糊，只有偶尔划过的闪电才能短暂地照亮那陡峭的山崖。",
            "月光如水，静静地洒在湖面上，微风吹过，荡起层层涟漪。湖边的竹林沙沙作响，偶尔有夜鸟的啼鸣声从深处传来，更添几分幽静。",
            "山谷中弥漫着淡淡的雾气，将整个世界都笼罩在一片朦胧之中。四周生长着奇异的花草，散发着淡淡的荧光，将这个幽暗的世界点缀得如梦如幻。",
            "天空呈现出诡异的紫红色，远处的火山正在喷发，浓烟滚滚，遮天蔽日。大地被撕裂出一道道巨大的裂缝，炽热的岩浆从中涌出，将周围的一切都化为灰烬。",
            "这片森林仿佛已经存在了亿万年，古老而神秘。高达千丈的巨树遮天蔽日，阳光只能勉强从树叶的缝隙中洒落下来。空气中弥漫着湿润的草木香气，还有淡淡的神秘力量波动。"
        ],
        psychology: [
            "他的心中掀起了惊涛骇浪，那个名字如同魔咒一般在脑海中回荡。无数的记忆碎片蜂拥而至，让他头痛欲裂，却又有种拨开云雾见月明的明悟。",
            "她的眼眶微微泛红，泪水在眼眶中打转，却倔强地不肯落下。她不能哭，至少不能在这些人面前哭。她要让所有人知道，她不是好欺负的。",
            "一种难以言喻的孤独感涌上心头，仿佛整个世界都抛弃了他。没关系，习惯就好了，反正从一开始就只有他一个人不是吗？",
            "他的心跳不由自主地加快了，那是一种陌生的感觉，既紧张又期待。就像是等待考试成绩公布的那一刻，明知道可能会失望，却还是忍不住幻想最好的结果。",
            "此刻的他心中一片清明，多年来的困惑在这一刻终于烟消云散。原来这就是答案，一直都在眼前，只是他没有发现而已。"
        ],
        battle: [
            "他猛地睁开眼睛，眼中精光爆射。双手快速结印，体内的灵气如同决堤的洪水一般汹涌而出。天地间的元气疯狂地向他汇聚过来，形成了一个巨大的灵气旋涡。",
            "剑光如虹，划破长空。那一剑太快了，快到对手根本来不及反应，只能眼睁睁地看着剑锋逼近。剑身上附着着毁天灭地的威力，所过之处，空间都为之扭曲。",
            "她轻轻挥动手中的法杖，周围的元素力量顿时暴走。火焰、冰霜、雷电交织在一起，形成了一个毁天灭地的魔法风暴。敌人在这股力量面前，就像蝼蚁一般渺小。",
            "他的身体突然爆发出耀眼的光芒，整个人如同一尊金色佛像。身上的气息不断攀升，眨眼间便突破了境界的限制。只是一拳轰出，便有毁天灭地之威。",
            "两道强大的气息在空中碰撞，激起惊天动地的爆炸。周围的山峰在这股力量面前脆弱得像纸糊的一般，轰然倒塌。烟尘遮天蔽日，大地都在颤抖。"
        ]
    },

    // 随机灵感
    idea: [
        "一个看似普通的少年，实际上是某个古老势力的唯一传人",
        "主角的宠物其实是一个沉睡了万年的神兽，只是失去了记忆",
        "主角每做一个梦，现实中就会发生相应的事情",
        "主角生活的是一个虚拟世界，觉醒后发现了真相",
        "主角的前世是一个创造了世界的存在",
        "，主角其实是自己的后人穿越过来的",
        "主角一直在寻找的仇人，实际上是一直在暗中帮助他的人",
        "主角的武器有自我意识，而且是活的生命体",
        "主角修炼的功法会让他逐渐失去感情",
        "主角的身体里同时存在着两个灵魂",
        "主角所在的世界是一个巨大的轮回空间",
        "主角其实是某个实验中诞生的产物",
        "主角的师父是穿越者，带来了另一个世界的知识",
        "主角的血液有着特殊的力量，被各方势力争夺",
        "，主角能够看到别人剩余的寿命",
        "主角其实是天道的化身，正在体验人间",
        "主角的家族世代都被诅咒，每一代都活不过三十岁",
        "主角能够与动植物沟通，得知世界的secret",
        "，主角其实是另一个世界的入侵者",
        "主角身边的一切都是被安排好的剧本"
    ]
};

// ==================== 随机生成函数 ====================

// 随机获取数组中的一个元素
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// 随机情节
function generatePlot() {
    const typeSelect = document.getElementById('plotType');
    const type = typeSelect ? typeSelect.value : 'all';
    const plots = LOCAL_DATA.plot[type] || LOCAL_DATA.plot.all;
    const plot = getRandomItem(plots);
    
    document.getElementById('plotResult').innerHTML = `<div class="plot-content">${plot}</div>`;
    document.getElementById('plotActions').style.display = 'flex';
    currentPlot = plot;
    return plot;
}

function regeneratePlot() {
    generatePlot();
}

function saveToMaterial() {
    if (!currentPlot) return;
    const materials = getMaterials();
    materials.unshift({
        id: Date.now(),
        title: '随机情节',
        content: currentPlot,
        category: 'plot',
        date: new Date().toLocaleDateString('zh-CN')
    });
    saveMaterials(materials);
    alert('已保存到素材库！');
}

// 随机名称
function generateName(type) {
    const style = document.getElementById('nameStyle')?.value || 'xuanhuan';
    const length = document.getElementById('nameLength')?.value || '3';
    const prefix = document.getElementById('namePrefix')?.value || '';
    
    let name = '';
    
    if (type === 'person') {
        const names = LOCAL_DATA.name.person[style]?.[length] || LOCAL_DATA.name.person.xuanhuan[3];
        name = getRandomItem(names);
    } else if (type === 'place') {
        const places = LOCAL_DATA.name.place[style] || LOCAL_DATA.name.place.xuanhuan;
        name = getRandomItem(places);
    } else if (type === 'faction') {
        const factions = LOCAL_DATA.name.faction[style] || LOCAL_DATA.name.faction.xuanhuan;
        name = getRandomItem(factions);
    } else if (type === 'weapon') {
        const weapons = LOCAL_DATA.name.weapon[style] || LOCAL_DATA.name.weapon.xuanhuan;
        name = getRandomItem(weapons);
    } else if (type === 'technique') {
        const techniques = LOCAL_DATA.name.technique[style] || LOCAL_DATA.name.technique.xuanhuan;
        name = getRandomItem(techniques);
    } else if (type === 'treasure') {
        const treasures = LOCAL_DATA.name.treasure[style] || LOCAL_DATA.name.treasure.xuanhuan;
        name = getRandomItem(treasures);
    }
    
    // 添加前缀
    if (prefix) {
        name = prefix + name;
    }
    
    document.getElementById('nameResult').innerHTML = `<div class="name-content">${name}</div>`;
    return name;
}

// 随机对话
function generateDialogue() {
    const dialogue = getRandomItem(LOCAL_DATA.dialogue);
    document.getElementById('dialogueResult').innerHTML = `<div class="plot-content">${dialogue}</div>`;
    document.getElementById('dialogueActions').style.display = 'flex';
    currentDialogue = dialogue;
    return dialogue;
}

let currentDialogue = '';

function saveDialogue() {
    if (!currentDialogue) return;
    const materials = getMaterials();
    materials.unshift({
        id: Date.now(),
        title: '随机对话',
        content: currentDialogue,
        category: 'dialogue',
        date: new Date().toLocaleDateString('zh-CN')
    });
    saveMaterials(materials);
    alert('已保存到素材库！');
}

// 随机描写
function generateDescription() {
    const typeSelect = document.getElementById('descType');
    const type = typeSelect ? typeSelect.value : 'environment';
    const descriptions = LOCAL_DATA.description[type] || LOCAL_DATA.description.environment;
    const desc = getRandomItem(descriptions);
    
    document.getElementById('descResult').innerHTML = `<div class="plot-content">${desc}</div>`;
    document.getElementById('descActions').style.display = 'flex';
    currentDescription = desc;
    return desc;
}

let currentDescription = '';

function saveDescription() {
    if (!currentDescription) return;
    const materials = getMaterials();
    materials.unshift({
        id: Date.now(),
        title: '随机描写',
        content: currentDescription,
        category: 'description',
        date: new Date().toLocaleDateString('zh-CN')
    });
    saveMaterials(materials);
    alert('已保存到素材库！');
}

// 随机灵感
function generateIdea() {
    const idea = getRandomItem(LOCAL_DATA.idea);
    document.getElementById('ideaResult').innerHTML = `<div class="plot-content">${idea}</div>`;
    document.getElementById('ideaActions').style.display = 'flex';
    currentIdea = idea;
    return idea;
}

let currentIdea = '';

function saveIdea() {
    if (!currentIdea) return;
    const materials = getMaterials();
    materials.unshift({
        id: Date.now(),
        title: '随机灵感',
        content: currentIdea,
        category: 'idea',
        date: new Date().toLocaleDateString('zh-CN')
    });
    saveMaterials(materials);
    alert('已保存到素材库！');
}

// ==================== 以下是未实现的功能（需要后端） ====================

// AI生成函数 - 提示用户需要配置API
function generatePlotWithAI() { alert('AI生成需要配置API，请在设置中配置AI模型'); }
function generateDialogueWithAI() { alert('AI生成需要配置API，请在设置中配置AI模型'); }
function generateDescriptionWithAI() { alert('AI生成需要配置API，请在设置中配置AI模型'); }
function generateIdeaWithAI() { alert('AI生成需要配置API，请在设置中配置AI模型'); }

// AI聊天 - 需要API
async function chatWithAI(message, history, useSearch = false) {
    // 这里可以以后接入其他免费API
    throw new Error('请配置API后才能使用AI聊天功能');
}

async function sendChat() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    addChatMessage('user', message);
    input.value = '';
    
    const loadingId = addChatMessage('bot', '正在思考...');
    
    try {
        const response = await chatWithAI(message, [], false);
        document.getElementById(loadingId)?.remove();
        addChatMessage('bot', response);
    } catch (error) {
        document.getElementById(loadingId)?.remove();
        addChatMessage('bot', error.message);
    }
}

function addChatMessage(sender, content) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    div.innerHTML = `
        <div class="message-avatar"><i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i></div>
        <div class="message-content">${content.replace(/\n/g, '<br>')}</div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div.id = 'msg-' + Date.now();
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') sendChat();
}

// ==================== 数据存储 ====================
const STORAGE_KEYS = {
    materials: 'novel_materials',
    theme: 'novel_theme',
    settings: 'novel_settings'
};

// 素材管理
function getMaterials() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.materials) || '[]');
}

function saveMaterials(materials) {
    localStorage.setItem(STORAGE_KEYS.materials, JSON.stringify(materials));
}

// ==================== 页面导航 ====================
function navigateTo(pageId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) item.classList.add('active');
    });
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'material') renderMaterials();
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(item.dataset.page);
    });
});

// ==================== 素材库 ====================
let currentMaterialFilter = 'all';

function addMaterial() {
    const title = document.getElementById('materialTitle')?.value?.trim() || '';
    const content = document.getElementById('materialContent')?.value?.trim() || '';
    const category = document.getElementById('materialCategory')?.value || 'idea';
    
    if (!content) { alert('请输入素材内容'); return; }
    
    const materials = getMaterials();
    materials.unshift({
        id: Date.now(),
        title: title || '未命名',
        content,
        category,
        date: new Date().toLocaleDateString('zh-CN')
    });
    saveMaterials(materials);
    
    document.getElementById('materialTitle').value = '';
    document.getElementById('materialContent').value = '';
    renderMaterials();
}

function deleteMaterial(id) {
    if (!confirm('确定删除此素材吗？')) return;
    const materials = getMaterials().filter(m => m.id !== id);
    saveMaterials(materials);
    renderMaterials();
}

function renderMaterials() {
    const materials = getMaterials();
    const container = document.getElementById('materialList');
    if (!container) return;
    
    const filtered = currentMaterialFilter === 'all' ? materials : materials.filter(m => m.category === currentMaterialFilter);
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-muted)">暂无素材</p>';
        return;
    }
    
    const categoryNames = { plot: '情节', name: '名称', dialogue: '对话', description: '描写', idea: '灵感' };
    
    container.innerHTML = filtered.map(m => `
        <div class="material-item">
            <div style="display:flex;justify-content:space-between;align-items:center;width:100%">
                <div>
                    <h3>${m.title}</h3>
                    <span class="material-category">${categoryNames[m.category] || m.category}</span>
                </div>
                <button class="delete-btn" onclick="deleteMaterial(${m.id})"><i class="fas fa-trash"></i></button>
            </div>
            <p class="material-content">${m.content}</p>
            <small style="color:var(--text-muted)">${m.date}</small>
        </div>
    `).join('');
}

// 素材筛选
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMaterialFilter = btn.dataset.filter;
        renderMaterials();
    });
});

// ==================== 主题切换 ====================
const themeBtn = document.getElementById('themeBtn');
let isDarkMode = false;

if (localStorage.getItem(STORAGE_KEYS.theme) === 'dark') {
    isDarkMode = true;
    document.body.classList.add('dark-mode');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i><span>白天模式</span>';
}

themeBtn?.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    themeBtn.innerHTML = isDarkMode 
        ? '<i class="fas fa-sun"></i><span>白天模式</span>' 
        : '<i class="fas fa-moon"></i><span>夜间模式</span>';
    localStorage.setItem(STORAGE_KEYS.theme, isDarkMode ? 'dark' : 'light');
});

// ==================== 设置页面 ====================
function saveGitHubToken() {
    const token = document.getElementById('githubToken')?.value?.trim();
    if (!token) { alert('请输入Token'); return; }
    localStorage.setItem('github_token', token);
    alert('GitHub Token 已保存！');
}

function addModelConfig() {
    alert('设置功能需要后端API支持，目前仅支持本地随机生成功能');
}

function switchModel() {
    // 暂时不需要操作
}

function testApi() {
    alert('测试功能需要后端API支持');
}

// ==================== 技能库 ====================
function learnSkill() {
    const gistUrl = document.getElementById('gistUrl')?.value?.trim();
    if (!gistUrl) { alert('请输入Gist URL'); return; }
    alert('技能学习功能需要后端API支持');
}

// ==================== 联网搜索 ====================
let webSearchEnabled = false;

function toggleWebSearch() {
    webSearchEnabled = !webSearchEnabled;
    const toggle = document.getElementById('webSearchToggle');
    const label = document.getElementById('webSearchLabel');
    if (toggle) toggle.checked = webSearchEnabled;
    if (label) {
        label.textContent = webSearchEnabled ? '联网搜索已启用' : '联网搜索已关闭';
        label.style.color = webSearchEnabled ? '#27ae60' : '#7f8c8d';
    }
}

// ==================== 初始化 ====================
let currentPlot = '';

document.addEventListener('DOMContentLoaded', () => {
    console.log('小说写作助手已加载（纯前端版本）');
});
