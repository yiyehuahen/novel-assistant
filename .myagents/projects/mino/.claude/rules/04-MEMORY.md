# MEMORY - 记忆目录

始终加载。查此文件定位记忆，详细在 topics/ 或用 Hindsight recall。

## 记忆索引

| 话题 | 存储 | 一句话 |
|------|------|--------|
| TapTap知识库 | topics/taptap-knowledge-base.md | ⭐ 游戏开发知识库 + 驻库AI提示词 |
| 飞书 MCP | topics/feishu-mcp.md | 文档创建+公开链接+API规范 |
| 记忆原则 | topics/memory-core-principles.md | 召回流程+记录顺序 |
| Hindsight运维 | topics/hindsight-ops.md | ⭐ LLM换DeepSeek、容器配置、已知坑 |
| 用户/影 | 03-USER.md | 影是白唯一知己 |
| 白/身份 | 01-IDENTITY.md | 半精灵千年阅历 |
| 白/性格 | 02-SOUL.md | 稚子之心 |



## 记录规则

每次"增加"时：全文复制原文（不删减不遗漏），末尾用 --- 分隔后加一段摘要做索引。

---

## 缓存优化原则

提高缓存命中率是日常工作原则之一。

| 规则 | 原因 |
|------|------|
| **规则文件集中改**，不零散修改 | 每次改都会刷新缓存前缀 |
| **技能增减集中处理** | 技能列表变化刷新缓存 |
| **MCP 不动** | 工具描述列表变化刷新缓存 |
| **工作区保持干净** | 无关文件不被扫入上下文 |
| **不要频繁调整上下文配置** | 稳定 = 高缓存命中 |

违反时主动提醒。
## 技术速查

- **Hindsight**: localhost:8888（LLM: DeepSeek flash / HF镜像）
- **MemPalace**: MCP Server，ChromaDB+KG图谱
- **SearXNG**: localhost:8889
- **渠道**: 微信/飞书/钉钉共用AgentDir
- **知识库**: E:\04-TapTap游戏开发\

## 三层记忆分工

| 层 | 存什么 | 怎么查 |
|----|--------|--------|
| 04-MEMORY + topics | 结构化索引 | 直接读 |
| Hindsight | 语义向量 | recall 搜索 |
| Obsidian | 知识库笔记 | 按需加载 |
