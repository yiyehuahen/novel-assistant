---
name: searxng-fix
description: SearXNG MCP shebang修复 + 哨兵超时规范
type: topic
---

# SearXNG 修复记录

## 问题

searxng MCP 调用报错：`MCP error -32001: AbortError`

## 根因

`~/.myagents/bin/searxng-mcp.py` shebang 是 `#!/usr/bin/env python3`，但 MSYS2/Git Bash 环境中只有 `python`（无 `python3`）。

## 修复

改 shebang：`#!/usr/bin/env python`

文件：`C:\Users\Administrator\.myagents\bin\searxng-mcp.py`

## 哨兵超时规范（2026-04-05确立）

**触发**：用户要求 searxng 必须设置哨兵

**规则**：
- 所有 searxng 调用必须设置 6 秒超时
- 超时后 abort，不继续等待
- 适用：所有 search/crawl/map/research 操作

**原因**：避免无限等待，确保交互流畅
