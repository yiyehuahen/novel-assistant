# 小说写作助手 - ModelScope 部署指南

## 文件说明

```
├── app.py           # Gradio后端应用（Python）
├── Dockerfile       # Docker镜像配置
├── requirements.txt # Python依赖
└── index.html       # 前端页面（静态资源）
```

## 部署步骤

### 1. 克隆仓库
```bash
git lfs install
git clone http://oauth2:ms-07366e59-4980-4aef-8fa3-357d48895cdd@www.modelscope.cn/studios/yiye001/xiaosuo.git
cd xiaosuo
```

### 2. 添加文件
将以下文件上传到仓库：
- `app.py`
- `Dockerfile`
- `requirements.txt`

### 3. 提交并推送
```bash
git add app.py Dockerfile requirements.txt
git commit -m "Add novel writing assistant"
git push
```

## 功能特性

### 🤖 AI对话
- 支持联网搜索
- 可配置多个AI模型
- 技能系统（保存/调用）

### 🎲 随机生成
- 随机情节（冲突/爱情/冒险等）
- 随机名称（人物/地名/武器等）
- 支持多种风格（玄幻/奇幻/都市等）

### 📖 技能系统
- GitHub Gist集成
- 技能保存和加载
- 跨智能体共享

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| API_URL | AI API地址 | https://api.qnaigc.com/v1 |
| API_KEY | AI API Key | 你的key |
| MODEL_ID | 模型ID | meituan/longcat-flash-lite |
| GITHUB_TOKEN | GitHub Token | 可选 |

## 本地测试

```bash
pip install -r requirements.txt
python app.py
```

访问 http://localhost:7860

## 部署到ModelScope

按照ModelScope Studios的部署流程操作即可。
