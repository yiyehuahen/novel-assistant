# MEMORY.md - 记忆目录

*始终加载。问啥查此文件定位记忆。详细在 topics/ 或用 Hindsight recall。*

---

## 核心原则

### 被问问题时（本能反应）

**第一时间判断**：上下文有没有？够清楚吗？

**不确定时** → 触发召回流程：

```
Step 1：04-MEMORY（已加载，最快）→ 定位话题指针
Step 2：Hindsight recall → 语义兜底（适合久远记忆）
Step 3：topics 文件 → 精准补充
```

**禁止**：上来就用 Hindsight recall 漫搜 / 不查 04-MEMORY 直接读文件

### 记忆记录流程（本能顺序）

```
Step 1 → 04-MEMORY（索引）⭐ 最先做
Step 2 → Hindsight retain（主容器）
Step 3 → topics 文件（备份）
```

**禁止**：先 retain 再更新索引 / 只记 topics 不记 Hindsight

### 其他
- 微信纯文本，飞书Markdown
- 工具必设超时

---

## 记忆索引（目录）

| 话题 | 存储 | 一句话 |
|------|------|--------|
| 搜索架构 | topics/search-layer.md | 四层搜索优先级 |
| OpenHarness | topics/openharness.md | 37工具+Skills+独立Hindsight bank |
| 微信公众号 | topics/wechat-articles.md | wewrite流程+排版主题 |
| Skill Market | topics/skill-market.md | ZeroOne安装+skill规范 |
| Hook系统 | topics/hook-system.md | 触发时机+Hindsight集成 |
| 记忆维护 | topics/memory-maintenance.md | Hindsight主容器+双层召回 |
| 用户/影 | 03-USER.md | 影是白唯一知己 |
| 白/身份 | 01-IDENTITY.md | 半精灵千年阅历 |
| 白/性格 | 02-SOUL.md | 稚子之心+精致傲娇 |

---

## 关键决策

| 决策 | 结论 |
|------|------|
| 记忆架构 | Hindsight主容器 + topics精准层 |
| OpenHarness Bank | openharness（独立bank） |
| SearXNG端口 | 8889（Hindsight占8888） |
| Hook自动化 | 需SDK支持，当前无法自动触发 |
| RTK CLI | 不支持Windows，需WSL |

---

## 技术速查

- **Hindsight**: localhost:8888，27工具，tag过滤最有效
- **GitHub**: gh api / curl raw.github > 浏览器
- **超时**: 快速15s/一般60s/网络90s/Git120s+
- **渠道**: 微信/飞书/钉钉共用AgentDir，独立Session

---

## 每周维护

`/UPDATE_MEMORY` → topics/memory-maintenance.md

审计：workspace-audit。最近：2026-04-05。

## OpenHarness 记忆维护

OpenHarness 有独立的记忆系统（`/openharness` 工作区）：
- **命令**：`/update-memory`（在 OpenHarness 会话中触发）
- **规则**：每次任务完成后提醒用户运行该命令
- **存储**：openharness bank（Hindsight 独立存储）
- **topics**：`openharness-memory.md` 等文件

---

*Update as you learn.*
