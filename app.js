// 小说写作助手 - 前端 JavaScript

// ==================== API 配置 ====================
// 注意：需要修改为你的后端地址
// GitHub Pages 部署时，填入你的 ModelScope 后端地址
const API_BASE = 'https://modelscope.cn/studios/yiye001/tongyon';

// ==================== 本地数据后备 ====================
const LOCAL_DATA = {
    plots: {
        all: [
            "主角在拍卖会上发现一枚神秘戒指，触发了一段被封印的记忆",
            "门派大比中，一直被视为废物的弟子突然爆发惊人实力",
            "主角救下的普通少女，竟然是消失已久的上古种族后裔",
            "山洞避雨时发现刻在石壁上的功法，竟是失传的绝学",
            "主角的灵宠突然退化，却在关键时刻进化成神兽",
            "外出历练时救了一名老者，送予的玉佩中藏着惊天秘密",
            "平日交好的同门突然翻脸，声称掌握了你通敌的证据",
            "在古遗迹中发现一面镜子，映照出的不是自己的脸",
            "主角的父母留下遗物，多年后发现其中隐藏着复活之法",
            "一直被追赶的仇家找上门来，却跪下恳求主角救命"
        ],
        conflict: [
            "两大门派决战，主角成为决定胜负的关键",
            "曾经的朋友在利益面前背叛了自己",
            "修炼资源被抢夺，险些丧命",
            "被陷害入狱，在牢中意外获得功法",
            "生死攸关之际，体内封印的力量突然觉醒"
        ],
        romance: [
            "桃花树下的一次偶遇，注定了一段刻骨铭心的缘分",
            "在危险时刻被神秘女子所救，心生情愫",
            "两家是世仇，却无法阻挡年轻人的心",
            "从小订下的婚约，对方却是自己最讨厌的人",
            "一起出生入死后，感情悄然生长"
        ],
        adventure: [
            "误入上古遗迹，发现惊天宝藏",
            "海底宫殿探险，遭遇海兽围攻",
            "秘境开启，各路强者齐聚",
            "登山求药，遇见守护灵兽",
            "穿越沙漠，发现消失的文明"
        ],
        mystery: [
            "身边最亲近的人，竟然是敌人派来的卧底",
            "每任掌门都会在特定日子失踪，真相是...",
            "镜子中的自己说出了警告",
            "门派禁地里关着的，不是怪物而是...",
            "那本日记，记录着谁也不该知道的秘密"
        ]
    },
    names: {
        person: [
            "萧云逸", "叶无痕", "苏墨白", "夜寒星", "楚惊天",
            "轩辕澈", "洛尘风", "龙傲天", "欧阳雪", "端木磊",
            "顾清辞", "沈寒衣", "东方曜", "北冥雪", "西门吹雪"
        ],
        place: [
            "青云山", "凌霄殿", "万寿园", "落日森林", "幽冥谷",
            "天机阁", "逍遥派", "锦绣城", "无尽海", "白云观"
        ],
        faction: [
            "青云宗", "天剑门", "万花谷", "逍遥宫", "凌云殿",
            "七星派", "隐世家族", "幽冥殿", "神机营", "玄冰阁"
        ],
        weapon: [
            "青云剑", "噬魂刀", "乾坤圈", "捆仙绳", "打神鞭",
            "阴阳镜", "混天绫", "火尖枪", "金砖", "风火轮"
        ],
        technique: [
            "九转玄功", "太乙真经", "北冥神功", "天外飞仙",
            "排云掌", "风神腿", "三分归元气", "六脉神剑"
        ],
        treasure: [
            "储物戒指", "护身玉佩", "招魂幡", "聚灵阵图",
            "炼丹炉", "炼器鼎", "悟道茶", "神农药典"
        ]
    },
    dialogues: [
        "「师父，我一定会变强的！」\n「傻孩子，真正的强者，需要的是一颗仁心。」",
        "「为什么要帮我？」\n「因为你是值得我帮的人，这就够了。」",
        "「我们还能再见面吗？」\n「若有缘，千山万水也会重逢。」",
        "「这就是你的全部实力？」\n「不，这只是让你看看我们之间的差距。」",
        "「师兄，你为什么对我这么好？」\n「因为你是我的责任，也是我的骄傲。」",
        "「前辈，这功法我真的能练成吗？」\n「功法在其次，关键在于人。」",
        "「你终究还是来了。」\n「我别无选择。」",
        "「小心！」\n「砰——」",
        "「对不起，我来晚了。」\n「不，你来得刚刚好。」",
        "「这个仇，我一定会报！」\n「好，我陪你一起。」
    ],
    ideas: [
        "主角的真实身份是上古大能转世，前世敌人今世依然在追踪",
        "宠物店里买的小动物，其实是神兽后裔，需要特定条件才能觉醒",
        "修炼体系不是靠吸收灵气，而是靠理解'道'的真理",
        "阵法不是固定的，而是需要根据使用者的'心'来调整",
        "炼丹最重要的不是药材，而是炼丹时的心情和意念",
        "每个修士都有自己的'道'，选择不同，结局也不同",
        "所谓的'天材地宝'其实是被封印的古代修士",
        "主角的每一世轮回都在收集散落的灵魂碎片",
        "修仙界的法则其实是由几位远古大能制定的",
        "主角最信任的伙伴体内封印着另一个意识"
    ],
    descriptions: {
        environment: [
            "天空阴沉沉的，仿佛一块巨大的灰色幕布笼罩在整个世界上。空气中弥漫着压抑的气息，让人不自觉地感到心悸。",
            "月光如水，静静地洒在湖面上，波光粼粼。湖畔的垂柳轻轻摇曳，投下斑驳的树影。",
            "山峰直插云霄，山顶被终年不化的积雪覆盖。凛冽的山风呼啸而过，带着刺骨的寒意。",
            "古遗迹中弥漫着神秘的气息，石壁上刻满了古老的符文，隐隐有光芒流转。",
            "火焰在洞穴中跳动，投下摇曳的火光。洞壁上生长的晶石折射出七彩的光芒，如梦如幻。"
        ],
        psychology: [
            "他的心中掀起了惊涛骇浪，那个名字，那段回忆，明明已经被尘封多年，却在此刻如潮水般涌来。",
            "恐惧、愤怒、不甘...种种情绪在心中交织，她的拳头紧握，指甲深深陷入掌心。",
            "一股暖流从心底升起，那是久违的感觉——被人在乎、被关心的温暖。",
            "他的眼神变得坚定，既然选择了这条路，便再无退路。哪怕前方是刀山火海，也要闯上一闯。",
            "望着远方的天空，她心中涌起一股说不清道不明的情绪，那是思念，还是别的什么？"
        ],
        battle: [
            "剑光如虹，撕裂长空。两道身影在空中交织碰撞，每一次交锋都激起剧烈的能量波动。",
            "灵气在经脉中奔涌，他猛地睁开眼睛，眼中精光四射。气势不断提升，周围的空气都为之震颤。",
            "雷霆万钧之势从天而降，她不退反进，手中法诀变换，一道更加璀璨的光芒迎了上去。",
            "刀锋与剑刃相撞，激起无数火花。两人擦肩而过的时间仿佛永恒，最后的对视中包含了太多无法言说的东西。",
            "天地色变，风云突起。恐怖的威压从天而降，所有人都在这股力量面前感到自己的渺小。"
        ]
    }
};

// ==================== 数据存储 ====================
const STORAGE_KEYS = {
    materials: 'novel_materials',
    theme: 'novel_theme'
};

// ==================== 云端API调用 ====================
async function callAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options
        });
        const data = await response.json();
        // 检查是否返回的是HTML而非JSON
        if (typeof data !== 'object' || data === null) {
            throw new Error('API返回格式错误');
        }
        return data;
    } catch (error) {
        console.error('API调用失败:', error);
        throw error;
    }
}

// 检查API是否可用
let apiAvailable = true;

async function checkAPI() {
    try {
        await callAPI('/health');
        return true;
    } catch {
        return false;
    }
}

// AI对话
async function chatWithAI(message, history, useSearch = false) {
    if (!apiAvailable) return 'AI服务暂不可用，请检查网络连接或后端服务。';
    try {
        const result = await callAPI('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message, history, use_search: useSearch })
        });
        return result.reply || result.error;
    } catch (e) {
        return 'AI服务暂时不可用。';
    }
}

// 随机生成 - 带本地后备
async function generatePlot() {
    if (!apiAvailable) return getLocalPlot();
    try {
        const result = await callAPI('/api/random/plot');
        return result.result || getLocalPlot();
    } catch {
        apiAvailable = false;
        return getLocalPlot();
    }
}

async function generateName() {
    if (!apiAvailable) return getLocalName('person');
    try {
        const result = await callAPI('/api/random/name');
        return result.result || getLocalName('person');
    } catch {
        return getLocalName('person');
    }
}

async function generatePlace() {
    if (!apiAvailable) return getLocalName('place');
    try {
        const result = await callAPI('/api/random/place');
        return result.result || getLocalName('place');
    } catch {
        return getLocalName('place');
    }
}

async function generateDialogue() {
    if (!apiAvailable) return getLocalDialogue();
    try {
        const result = await callAPI('/api/random/dialogue');
        return result.result || getLocalDialogue();
    } catch {
        return getLocalDialogue();
    }
}

async function generateIdea() {
    if (!apiAvailable) return getLocalIdea();
    try {
        const result = await callAPI('/api/random/idea');
        return result.result || getLocalIdea();
    } catch {
        return getLocalIdea();
    }
}

// 本地数据获取函数
function getLocalPlot() {
    const type = document.getElementById('plotType')?.value || 'all';
    const plots = LOCAL_DATA.plots[type] || LOCAL_DATA.plots.all;
    return plots[Math.floor(Math.random() * plots.length)];
}

function getLocalName(type) {
    const names = LOCAL_DATA.names[type] || LOCAL_DATA.names.person;
    return names[Math.floor(Math.random() * names.length)];
}

function getLocalDialogue() {
    return LOCAL_DATA.dialogues[Math.floor(Math.random() * LOCAL_DATA.dialogues.length)];
}

function getLocalIdea() {
    return LOCAL_DATA.ideas[Math.floor(Math.random() * LOCAL_DATA.ideas.length)];
}

// 技能管理
async function saveSkill(name, content) {
    return await callAPI('/api/save_skill', {
        method: 'POST',
        body: JSON.stringify({ name, content })
    });
}

async function getSkills() {
    const result = await callAPI('/api/skills');
    return result.skills || [];
}

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

// ==================== 随机情节 ====================
let currentPlot = '';

async function generatePlotAndSave() {
    const type = document.getElementById('plotType')?.value || 'all';
    const plot = await generatePlot();
    currentPlot = plot;
    document.getElementById('plotResult').innerHTML = `<div class="plot-content">${plot}</div>`;
    document.getElementById('plotActions').style.display = 'flex';
}

function regeneratePlot() {
    generatePlotAndSave();
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

// ==================== 随机名称 ====================
async function generateNameAndShow(type) {
    let name;
    if (type === 'person' || type === 'place') {
        if (type === 'person') name = await generateName();
        else name = await generatePlace();
    } else {
        // 其他类型使用本地数据
        name = getLocalName(type);
    }
    document.getElementById('nameResult').innerHTML = `<div class="name-content">${name}</div>`;
}

// 本地描述生成
function generateLocalDescription(type) {
    const descs = LOCAL_DATA.descriptions[type] || LOCAL_DATA.descriptions.environment;
    return descs[Math.floor(Math.random() * descs.length)];
}

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

// ==================== AI 助手对话 ====================
let chatHistory = [];

async function sendChat() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    addChatMessage('user', message);
    chatHistory.push({ role: 'user', content: message });
    input.value = '';
    
    const loadingId = addChatMessage('bot', '正在思考...');
    const useSearch = document.getElementById('webSearchToggle')?.checked || false;
    
    try {
        const response = await chatWithAI(message, chatHistory.map(h => [h.content, '']), useSearch);
        document.getElementById(loadingId)?.remove();
        addChatMessage('bot', response);
        chatHistory.push({ role: 'assistant', content: response });
    } catch (error) {
        document.getElementById(loadingId)?.remove();
        addChatMessage('bot', '抱歉，发生了错误：' + error.message);
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
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') sendChat();
}

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

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('小说写作助手已加载');
});

// ==================== 技能库 ====================
let skillsLibrary = {};

// 加载技能库（从云端）
async function loadSkills() {
    try {
        const skills = await getSkills();
        skills.forEach(s => {
            const key = s.name.toLowerCase().replace(/\s+/g, '-');
            skillsLibrary[key] = s;
        });
    } catch(e) {
        console.log('加载技能失败，使用默认');
    }
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

// ==================== 随机描写 ====================
async function generateDescription() {
    const type = document.getElementById('descType')?.value || 'environment';
    let desc;
    if (!apiAvailable) {
        desc = generateLocalDescription(type);
    } else {
        try {
            const result = await callAPI('/api/random/description', {
                method: 'POST',
                body: JSON.stringify({ type })
            });
            desc = result.result || generateLocalDescription(type);
        } catch {
            desc = generateLocalDescription(type);
        }
    }
    document.getElementById('descResult').innerHTML = `<div class="plot-content">${desc}</div>`;
    document.getElementById('descActions').style.display = 'flex';
}

function saveDescription() {
    const content = document.getElementById('descResult')?.textContent;
    if (!content) return;
    const materials = getMaterials();
    materials.unshift({
        id: Date.now(),
        title: '随机描写',
        content: content,
        category: 'description',
        date: new Date().toLocaleDateString('zh-CN')
    });
    saveMaterials(materials);
    alert('已保存到素材库！');
}

// ==================== 设置页功能 ====================
async function testApi() {
    const statusEl = document.getElementById('apiStatus');
    const textEl = document.getElementById('statusText');
    if (statusEl) {
        statusEl.style.display = 'flex';
        textEl.textContent = '测试中...';
    }
    
    try {
        await callAPI('/health');
        if (textEl) textEl.textContent = '连接成功！';
    } catch {
        if (textEl) textEl.textContent = '连接失败';
    }
}

function switchModel() {
    const select = document.getElementById('currentModel');
    localStorage.setItem('currentModel', select.value);
}

