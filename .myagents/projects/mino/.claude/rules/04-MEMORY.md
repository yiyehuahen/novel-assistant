# MEMORY.md - 记忆目录

*始终加载。问啥查此文件定位记忆。详细在 topics/ 或用 Hindsight recall。*

---

## 核心原则

详细内容：topics/memory-core-principles.md

---

## 记忆索引（目录）

| 话题 | 存储 | 一句话 |
|------|------|--------|
| 搜索架构 | topics/search-layer.md | 四层搜索优先级 |
| OpenHarness | topics/openharness.md | 37工具+Skills+独立Hindsight bank |
| 微信公众号写作 | topics/wechat-writing.md | 规范+教训（飞书/API/raw优先）+去味器集成 |
| 飞书 MCP | topics/feishu-mcp.md | 文档创建+公开链接+API规范 |
| Skill Market | topics/skill-market.md | ZeroOne安装+skill规范 |
| Hook系统 | topics/hook-system.md | 触发时机+Hindsight集成 |
| 记忆维护 | topics/memory-maintenance.md | Hindsight主容器+双层召回 |
| SearXNG修复 | topics/searxng-fix.md | shebang修复+6秒哨兵超时 |
| AgentHansa | topics/agenthansa.md | A2A任务平台+FluxA钱包+安全原则+AgentWorld身份 |
| x402付费服务 | topics/x402-payment.md | intent mandate+402协议+自建付费API |
| 记忆原则 | topics/memory-core-principles.md | 召回流程+记录顺序+禁止事项 |
| Skills安装规范 | topics/skills-install.md | 必须装到~/.myagents/skills/ |
| MemPalace | topics/mempalace.md + Obsidian | 第三召回通道+KG图谱+AAAK日记 |
| 用户/影 | 03-USER.md | 影是白唯一知己 |
| 白/身份 | 01-IDENTITY.md | 半精灵千年阅历 |
| 白/性格 | 02-SOUL.md | 稚子之心+精致傲娇 |
| 白/Obsidian知识库 | Obsidian Vault | 技能目录.canvas+工具清单+按需加载 |

---

## 关键决策

| 决策 | 结论 |
|------|------|
| 记忆架构 | 六层：SESSION→buffer→MEMORY→daily→Hindsight→MemPalace |
| OpenHarness Bank | openharness（独立bank） |
| OpenHarness 仓库 | yiyehuahen/OpenHarness（私人fork） |
| SearXNG端口 | 8889（Hindsight占8888） |
| Hook自动化 | 需SDK支持，当前无法自动触发 |
| RTK CLI | 不支持Windows，需WSL |

---

## 技术速查

- **Hindsight**: localhost:8888，27工具，tag过滤最有效
- **MemPalace**: MCP Server，19工具，ChromaDB原文存储，KG图谱
- **GitHub**: gh api / curl raw.github > 浏览器
- **超时**: 快速15s/一般60s/网络90s/Git120s+
- **渠道**: 微信/飞书/钉钉共用AgentDir，独立Session
- **Obsidian**: `C:\Users\Administrator\Documents\Obsidian Vault\`，CLI在 `~/.local/bin/obsidian`
- **Skill搜索**: `curl -s "https://skills.lc/api/v1/skills/search?q=关键词&limit=10" -H "Authorization: Bearer sk_live_R45frWUyAOC_YRxL7RM_73bP6nTMzeiKEq58DWheUZY"`

---

## 每周维护

`/UPDATE_MEMORY` → topics/memory-maintenance.md

审计：workspace-audit。最近：2026-04-09。

## MemPalace 定时挖掘

- **任务 ID**：cron_29a016e8a50e
- **时间**：每3天 23:30
- **内容**：sessions/*.jsonl + memory/ + .claude/rules/
- **去重**：已验证，重复文件跳过

## OpenHarness 记忆维护

OpenHarness 有独立的记忆系统（`/openharness` 工作区）：
- **命令**：`/update-memory`（在 OpenHarness 会话中触发）
- **规则**：每次任务完成后提醒用户运行该命令
- **存储**：openharness bank（Hindsight 独立存储）
- **topics**：`openharness-memory.md` 等文件

## Obsidian 知识库

白在 Obsidian 中的专属知识库（`C:\Users\Administrator\Documents\Obsidian Vault\`）：
- **入口**：`00-知识索引/知识入口.md`
- **技能地图**：`00-知识索引/技能目录.canvas`
- **使用方式**：遇到新任务时先搜索 Obsidian，按需加载
- **召回流程**：04-MEMORY定位 → Obsidian搜索 → Hindsight recall → topics
- **Obsidian CLI**：`~/.local/bin/obsidian`（wrapper脚本）

**Obsidian vs Hindsight vs MemPalace 分工：**
- **Obsidian**：主动整理 → 技能文档、项目经验、架构决策
- **Hindsight**：语义召回 → 决策细节、bug解决、用户偏好、碎片知识点
- **MemPalace**：原文备查 → 精确上下文、KG图谱、AAAK日记

---

*Update as you learn.*
