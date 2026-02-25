# 小说写作助手 - 云端API服务

from flask import Flask, request, jsonify, send_file, send_from_directory
import os
import random
import requests

app = Flask(__name__)

# ==================== 配置 ====================
API_CONFIG = {
    'api_url': os.environ.get('API_URL', 'https://api.qnaigc.com/v1'),
    'api_key': os.environ.get('API_KEY', 'sk-c82cf7246a528f2c9f327c85e49b865cb34442a30a7cbf75f66a26426ff7c687'),
    'model_id': os.environ.get('MODEL_ID', 'meituan/longcat-flash-lite')
}

# 技能库
SKILLS = {'github-share': {'name': 'GitHub Share', 'content': '用于保存和加载技能'}}

# 素材库
MATERIALS = []

# ==================== 首页 ====================
@app.route('/')
def index():
    try:
        return send_from_directory('static', 'index.html')
    except Exception as e:
        return f"Error: {str(e)}", 500

@app.route('/app.js')
def app_js():
    return send_from_directory('static', 'app.js')

@app.route('/style.css')
def style_css():
    return send_from_directory('static', 'style.css')

# ==================== AI对话 ====================
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    history = data.get('history', [])
    use_search = data.get('use_search', False)
    
    messages = [{'role': 'system', 'content': get_system_prompt()}]
    for h in history:
        if isinstance(h, list) and len(h) >= 2:
            messages.append({'role': 'user', 'content': h[0]})
            messages.append({'role': 'assistant', 'content': h[1]})
    messages.append({'role': 'user', 'content': message})
    
    try:
        url = f"{API_CONFIG['api_url']}/chat/completions"
        headers = {'Content-Type': 'application/json', 'Authorization': f"Bearer {API_CONFIG['api_key']}"}
        response = requests.post(url, json={
            'model': API_CONFIG['model_id'],
            'messages': messages,
            'temperature': 0.7,
            'max_tokens': 2000
        }, timeout=30)
        
        if response.status_code != 200:
            return jsonify({'error': f'API错误: {response.status_code}'})
        
        reply = response.json()['choices'][0]['message']['content']
        
        if use_search:
            search_result = web_search(message)
            if search_result:
                reply += f"\n\n🔍 搜索结果: {search_result}"
        
        return jsonify({'reply': reply})
    except Exception as e:
        return jsonify({'error': str(e)})

def web_search(query):
    keywords = ['什么是', '如何', '怎么', '哪个', '谁']
    if not any(k in query for k in keywords):
        return None
    try:
        url = f"https://api.duckduckgo.com/?q={query}&format=json&no_html=1"
        data = requests.get(url, timeout=10).json()
        if data.get('AbstractText'):
            return f"{data.get('AbstractHeading', '答案')}: {data['AbstractText'][:200]}"
    except:
        pass
    return None

def get_system_prompt():
    skills_info = '\n'.join([f"- {v['name']}: {v['content'][:50]}..." for v in SKILLS.values()])
    return f"你是一个专业的小说创作助手。\n=== 已学习技能 ===\n{skills_info}"

# ==================== 随机生成 ====================
PLOTS = ["主角意外发现挚友是间谍", "家族秘密被揭开", "两大势力威胁亲人", "危机时刻另一半共患难", "误入遗迹发现传承"]
NAMES = ['东方云', '欧阳天', '司马风', '诸葛雷', '慕容剑']
PLACES = ['青云城', '幽冥谷', '落日山', '凌云海', '天机宫']
DIALOGUES = ["只要你还在，我就不会放弃。", "这个世界不公平。", "我所做一切都是为了保护你。"]
IDEAS = ["普通学生是古老势力继承人", "死对头是失散多年的兄弟", "能力随情绪变化"]

@app.route('/api/random/plot')
def random_plot(): return jsonify({'result': random.choice(PLOTS)})

@app.route('/api/random/name')
def random_name(): return jsonify({'result': random.choice(NAMES)})

@app.route('/api/random/place')
def random_place(): return jsonify({'result': random.choice(PLACES)})

@app.route('/api/random/dialogue')
def random_dialogue(): return jsonify({'result': random.choice(DIALOGUES)})

@app.route('/api/random/idea')
def random_idea(): return jsonify({'result': random.choice(IDEAS)})

# ==================== 技能管理 ====================
@app.route('/api/skills')
def get_skills(): return jsonify({'skills': list(SKILLS.values())})

@app.route('/api/save_skill', methods=['POST'])
def save_skill():
    data = request.json
    name, content = data.get('name', ''), data.get('content', '')
    if not name: return jsonify({'error': '缺少参数'})
    key = name.lower().replace(' ', '-')
    SKILLS[key] = {'name': name, 'content': content}
    return jsonify({'success': True})

# ==================== 素材管理 ====================
@app.route('/api/materials')
def get_materials(): return jsonify({'materials': MATERIALS})

@app.route('/api/save_material', methods=['POST'])
def save_material():
    data = request.json
    MATERIALS.append({
        'id': len(MATERIALS)+1,
        'title': data.get('title',''),
        'content': data.get('content',''),
        'category': data.get('category','idea')
    })
    return jsonify({'success': True})

@app.route('/health')
def health(): return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860)
