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

- workspace-audit 审计：字符数检查、重复检测、过时清理
- 最近审计：2026-04-02

---

*Update this file as you learn. It's how you persist.*
