# 记忆索引

*详细在 `memory/topics/` 下对应文件。快速定位用 04-MEMORY。*

---

## 话题文件

| 话题 | 文件 | 最后更新 | 摘要 |
|------|------|---------|------|
| 搜索架构 | topics/search-layer.md | 2026-04-04 | 四层搜索架构、工具选择优先级 |
| OpenHarness | topics/openharness.md | 2026-04-04 | 37个工具、6个Skills、MCP配置 |
| 微信公众号 | topics/wechat-writing.md | 2026-04-07 | 规范+教训+去味器集成 |
| Skill Market | topics/skill-market.md | 2026-04-03 | ZeroOne Skill Market、skill设计规范 |
| Hook系统 | topics/hook-system.md | 2026-04-04 | 触发时机、Hindsight集成、27工具详解 |
| 记忆维护 | topics/memory-maintenance.md | 2026-04-07 | 五层架构+蒸馏三问法则 |
| SearXNG修复 | topics/searxng-fix.md | 2026-04-05 | shebang修复+哨兵超时规范 |
| AgentHansa | topics/agenthansa.md | 2026-04-06 | A2A任务平台+FluxA钱包+安全原则 |
| x402付费服务 | topics/x402-payment.md | 2026-04-06 | intent mandate+402协议+自建付费API |

---

## 每日日志

| 日期 | 文件 |
|------|------|
| 2026-04-07 | memory/2026-04-07.md |
| 2026-04-06 | memory/2026-04-06.md |
| 2026-04-05 | memory/2026-04-05.md |
| 2026-04-04 | memory/2026-04-04.md |
| 2026-04-02 | memory/2026-04-02.md |

---

## 记忆架构（2026-04-04 更新）

```
记录 → Hindsight retain（主容器）
     → topics 文件（备份）

召回 → 04-MEMORY 定位（第一）
     → topics 文件精准补充
     → Hindsight recall 语义兜底
```

详见：`topics/memory-maintenance.md`

---

## 不在此索引的内容

- **身份/性格规则**：.claude/rules/01-IDENTITY.md, 02-SOUL.md — 始终加载
- **用户信息**：.claude/rules/03-USER.md — 始终加载
- **核心记忆目录**：.claude/rules/04-MEMORY.md — 始终加载
- **Hindsight 记忆**：不在此索引，通过 recall 语义召回
