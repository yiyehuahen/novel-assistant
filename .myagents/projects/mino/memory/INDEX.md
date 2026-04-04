# 记忆索引

*按需召回，详细内容在 `memory/topics/` 下对应文件*

## 记忆维护规则（重要！）

**原则**：04-MEMORY.md 保持精简（<100行），详细内容外置到 topics/。

**写入时机**：
- 跨项目决策/原则 → 04-MEMORY.md
- 单话题详细信息 → `memory/topics/<topic>.md`
- 当天工作记录 → `memory/YYYY-MM-DD.md`

**外置检查**：04-MEMORY.md 某话题超过 20 行 → 外置到 topics/

**召回方式**：
```
# 召回搜索相关内容
Read: memory/topics/search-layer.md

# 召回OpenHarness详情
Read: memory/topics/openharness.md

# 召回微信公众号文章流程
Read: memory/topics/wechat-articles.md
```

---

## 话题索引

| 话题 | 存储文件 | 最后更新 | 摘要 |
|------|---------|---------|------|
| 搜索架构 | topics/search-layer.md | 2026-04-04 | 四层搜索架构、工具选择优先级 |
| OpenHarness | topics/openharness.md | 2026-04-04 | 37个工具、6个Skills、MCP配置 |
| 微信公众号 | topics/wechat-articles.md | 2026-04-03 | wewrite流程、排版主题 |
| Skill Market | topics/skill-market.md | 2026-04-03 | ZeroOne Skill Market、skill设计规范 |
| Hook系统 | topics/hook-system.md | 2026-04-04 | 触发时机、Hindsight集成 |
| 记忆维护 | topics/memory-maintenance.md | 2026-04-04 | 上下文按需召回法、UPDATE_MEMORY流程 |

---

## 每日日志

| 日期 | 文件 |
|------|------|
| 2026-04-04 | memory/2026-04-04.md |
| 2026-04-02 | memory/2026-04-02.md |

---

## 不在此索引的内容

- **身份/性格规则**：.claude/rules/01-IDENTITY.md, 02-SOUL.md — 始终加载
- **用户信息**：.claude/rules/03-USER.md — 始终加载
- **核心记忆**：.claude/rules/04-MEMORY.md — 始终加载，但已精简
