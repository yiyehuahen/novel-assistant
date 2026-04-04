---
name: workspace-audit
description: "审计或优化工作区文件。当感觉文件臃肿、过时、矛盾，或用户要求审计工作区时触发。检查 CLAUDE.md、.claude/rules/、memory/ 等文件的大小、重复和一致性。"
---

# Workspace Audit

审计工作区文件，保持 Agent 记忆系统健康。

## 触发场景

- 用户要求"审计工作区"
- 文件超过 15,000 字符
- 决策质量下降、规则冲突
- 每月定期审计

## 审计清单

1. **读取核心文件**
   - CLAUDE.md
   - .claude/rules/01-IDENTITY.md
   - .claude/rules/02-SOUL.md
   - .claude/rules/03-USER.md
   - .claude/rules/04-MEMORY.md
   - memory/YYYY-MM-DD.md（最近30天）

2. **检查字符数**
   - < 5,000：健康
   - 5,000-10,000：可接受
   - 10,000-15,000：建议精简
   - > 15,000：需优化
   - > 20,000：危险，可能被截断

3. **检测重复内容**
   - SOUL.md vs IDENTITY.md
   - USER.md vs MEMORY.md
   - 技能文档 vs MEMORY.md

4. **检测过时内容**
   - 30天以上的日志考虑归档
   - 已完成的任务记录移除

## 输出

给出：
1. 各文件字符数及状态
2. 发现的问题
3. 具体优化建议
