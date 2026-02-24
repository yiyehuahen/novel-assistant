// 小说写作助手 - 前端 JavaScript

// ==================== API 配置 ====================
// 注意：需要修改为你的后端地址
// GitHub Pages 部署时，填入你的 ModelScope 后端地址
// 例如: const API_BASE = 'https://xxxxxx.modelscope.cn';
const API_BASE = 'http://127.0.0.1:7860'; // 本地开发用

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
        return await response.json();
    } catch (error) {
        console.error('API调用失败:', error);
        throw error;
    }
}

// AI对话
async function chatWithAI(message, history, useSearch = false) {
    const result = await callAPI('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, history, use_search: useSearch })
    });
    return result.reply || result.error;
}

// 随机生成
async function generatePlot() {
    const result = await callAPI('/api/random/plot');
    return result.result;
}

async function generateName() {
    const result = await callAPI('/api/random/name');
    return result.result;
}

async function generatePlace() {
    const result = await callAPI('/api/random/place');
    return result.result;
}

async function generateDialogue() {
    const result = await callAPI('/api/random/dialogue');
    return result.result;
}

async function generateIdea() {
    const result = await callAPI('/api/random/idea');
    return result.result;
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

function getLocalName(type) {
    const data = {
        weapon: { pre: ['青云', '噬魂', '乾坤'], suf: ['剑', '刀', '枪'] },
        technique: { pre: ['九转', '太极'], suf: ['玄功', '心法'] }
    };
    const d = data[type] || data.weapon;
    return d.pre[Math.floor(Math.random() * d.pre.length)] + d.suf[Math.floor(Math.random() * d.suf.length)];
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
