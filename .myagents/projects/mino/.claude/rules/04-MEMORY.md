# MEMORY.md - Long-Term Memory

*核心记忆，始终加载。详细内容见 `memory/INDEX.md`*

---

## 核心原则（内联，不延迟）

- 用户说"记住:"时必须立即写入文件
- 微信渠道只发纯文本，飞书支持Markdown
- 所有工具调用必须设超时
- 回复末尾附注：分类、标签、一句话、时间戳

---

## 记忆索引

| 话题 | 存储位置 | 最后更新 |
|------|---------|---------|
| 搜索架构/引擎 | memory/topics/search-layer.md | 2026-04-04 |
| OpenHarness | memory/topics/openharness.md | 2026-04-04 |
| 微信公众号文章 | memory/topics/wechat-articles.md | 2026-04-03 |
| Skill Market | memory/topics/skill-market.md | 2026-04-03 |
| Hook系统 | memory/topics/hook-system.md | 2026-04-04 |

---

## 关键决策（按需召回）

| 决策 | 结论 | 日期 |
|------|------|------|
| RTK CLI | 不支持Windows，需WSL | 2026-04-02 |
| Hook自动化 | 需要SDK底层支持，当前无法自动触发 | 2026-04-02 |
| SearXNG MCP | 需实现resources/list方法 | 2026-04-04 |

---

## 技术要点（精简版）

**上下文压缩**：100k tokens硬编码阈值，触发后历史替换为摘要。

**渠道隔离**：微信/飞书/钉钉共用AgentDir，独立Session。

**Hook系统**：MCP工具已接入，规则不会自动触发。

**GitHub访问**：优先 `gh api` / `curl raw.githubusercontent.com`，比浏览器省token。

**工具超时**：
- 快速检查：15s
- 一般操作：30-60s
- 网络请求：90s
- 复杂/Git：120s+

详见：`memory/topics/search-layer.md`（搜索架构）、`memory/topics/openharness.md`（工具详情）

---

## 每周维护

### 记忆维护标准流程

**原则**：04-MEMORY.md 保持精简（<100行），详细内容外置到 topics/。

**维护步骤：**

1. **评估内容归属**
   - 跨项目/跨话题的决策/原则 → 04-MEMORY.md
   - 单个话题的详细信息 → `memory/topics/<topic>.md`
   - 当天工作记录 → `memory/YYYY-MM-DD.md`

2. **写入时机**
   - 新学到的技术细节 → 立即写入对应 topics 文件
   - 跨话题经验/决策 → 立即更新 04-MEMORY.md
   - 日常记录 → 每日日志

3. **外置检查**（每次记忆维护时执行）
   - 如果 04-MEMORY.md 某话题超过 20 行 → 考虑外置到 topics/
   - 如果 topics 文件增长过快 → 考虑拆分

4. **召回方式**
   - 问到此话题时：`Read: memory/topics/<topic>.md`
   - 索引始终在 `memory/INDEX.md` 保持最新

### 审计

- workspace-audit 审计：字符数检查、重复检测、过时清理
- 最近审计：2026-04-02

---

*Update this file as you learn. It's how you persist.*
