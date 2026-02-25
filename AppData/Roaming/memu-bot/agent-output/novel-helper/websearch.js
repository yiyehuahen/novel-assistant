// ==================== 联网搜索功能 ====================

// 联网搜索状态
let webSearchEnabled = false;

// 切换联网搜索
function toggleWebSearch() {
    webSearchEnabled = !webSearchEnabled;
    const toggle = document.getElementById('webSearchToggle');
    const label = document.getElementById('webSearchLabel');
    
    if (toggle) {
        toggle.checked = webSearchEnabled;
    }
    if (label) {
        label.textContent = webSearchEnabled ? '联网搜索已启用' : '联网搜索已关闭';
        label.style.color = webSearchEnabled ? '#27ae60' : '#7f8c8d';
    }
    
    console.log('联网搜索:', webSearchEnabled ? '开启' : '关闭');
}

// 联网搜索API
async function webSearch(query) {
    if (!webSearchEnabled) {
        return null; // 如果未启用，返回null
    }
    
    try {
        // 使用 DuckDuckGo Instant Answer API
        const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('搜索请求失败');
        }
        
        const data = await response.json();
        
        // 提取相关结果
        let results = [];
        
        if (data.AbstractText) {
            results.push({
                title: data.AbstractHeading || '相关答案',
                content: data.AbstractText,
                source: data.AbstractSource || 'DuckDuckGo'
            });
        }
        
        // 添加相关链接
        if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            data.RelatedTopics.slice(0, 3).forEach(topic => {
                if (topic.Text && topic.FirstURL) {
                    results.push({
                        title: topic.Text.substring(0, 50),
                        content: topic.Text,
                        url: topic.FirstURL,
                        source: 'Related'
                    });
                }
            });
        }
        
        return results;
    } catch (error) {
        console.error('搜索错误:', error);
        return null;
    }
}

// 在对话中自动搜索
async function searchIfNeeded(userMessage) {
    if (!webSearchEnabled) return null;
    
    // 需要联网的关键词
    const searchKeywords = ['搜索', '查找', '查询', '什么是', '怎么', '如何', '哪个', '谁', '什么时候', '最新', '新闻'];
    
    const shouldSearch = searchKeywords.some(keyword => userMessage.includes(keyword));
    
    if (shouldSearch) {
        // 提取搜索关键词
        let searchQuery = userMessage
            .replace(/搜索|查找|查询|什么是|怎么|如何/g, '')
            .trim();
        
        if (searchQuery) {
            console.log('正在搜索:', searchQuery);
            return await webSearch(searchQuery);
        }
    }
    
    return null;
}

// 格式化搜索结果
function formatSearchResults(results) {
    if (!results || results.length === 0) {
        return '';
    }
    
    let text = '\n\n🔍 搜索结果:\n';
    
    results.forEach((result, index) => {
        text += `\n${index + 1}. ${result.title}\n`;
        text += `${result.content.substring(0, 200)}...\n`;
    });
    
    return text;
}
