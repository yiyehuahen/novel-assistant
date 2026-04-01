---
name: workspace-audit
description: Use when auditing or optimizing the OpenMino workspace files — CLAUDE.md, .claude/rules/ (SOUL.md, IDENTITY.md, USER.md, MEMORY.md), memory/ daily logs, and .claude/commands/. Covers file size analysis, redundancy detection, memory distillation, and cross-file consistency reviews. Triggers when workspace files feel bloated, stale, or contradictory.
---

# Workspace Audit Skill

## Overview

OpenMino 工作区文件构成 Agent 的"灵魂与记忆"——每次对话时注入系统提示词，赋予身份认同、行为规则、环境知识和长期记忆。文件管理不当会导致：Token 浪费、内容重复、决策质量下降。

**Token 预算（参考）：**

- 单文件软上限：15,000 字符
- 硬上限：20,000 字符（超出可能被截断）
- 所有启动文件总计：约 80,000 字符

## 文件清单

| 文件 | 用途 | 每次加载？ | 子 Agent 可见？ |
|------|------|-----------|---------------|
| `CLAUDE.md` | 工作区主入口、操作总览 | 是 | 是 |
| `.claude/rules/01-IDENTITY.md` | 身份：名字、起源、emoji | 是 | 是 |
| `.claude/rules/02-SOUL.md` | 人格、语气、价值观 | 是 | 是 |
| `.claude/rules/03-USER.md` | 用户画像、偏好 | 是 | 仅主会话 |
| `.claude/rules/04-MEMORY.md` | 长期记忆精华、铁律规则 | 是 | **不** |
| `.claude/commands/*.md` | 快捷命令定义 | 按需 | 否 |
| `memory/YYYY-MM-DD.md` | 每日会话日志 | 按启动序列 | 否 |
| `.claude/skills/*/SKILL.md` | 技能定义 | 按需 | 视情况 |

**安全规则：** 04-MEMORY.md 不得在群聊或子 Agent 会话中加载——包含私密上下文。

## 工作流：审计现有工作区

### 触发时机

- 用户要求"审计工作区"
- 工作区文件超过 15,000 字符
- 发现决策质量下降、规则冲突、内容过时
- 每月定期审计

### Step 1：读取所有活跃文件

```
CLAUDE.md
.claude/rules/01-IDENTITY.md
.claude/rules/02-SOUL.md
.claude/rules/03-USER.md
.claude/rules/04-MEMORY.md
memory/YYYY-MM-DD.md（最近30天）
```

### Step 2：检查字符数

```bash
wc -c CLAUDE.md .claude/rules/*.md memory/*.md
```

| 字符数 | 状态 |
|--------|------|
| < 5,000 | 健康 |
| 5,000–10,000 | 可接受，观察增长 |
| 10,000–15,000 | 建议精简 |
| > 15,000 | 需优化 |
| > 20,000 | 危险，可能被截断 |

### Step 3：检测重复内容

| 来源A | 来源B | 检查项 |
|--------|--------|--------|
| SOUL.md | IDENTITY.md | 身份描述重复？SOUL 写人格，IDENTITY 写事实 |
| USER.md | MEMORY.md | 用户偏好重复？保留在 USER.md |
| MEMORY.md | 技能 SKILL.md | 规则重复？稳定规则移至技能文档 |

### Step 4：检测过时内容

- 30 天以上的每日日志：考虑归档或删除
- 已完成的任务记录：移到归档或删除
- 过时的配置信息：更新或删除

### Step 5：输出审计报告

给出：
1. 各文件字符数及状态
2. 发现的问题（重复、过时、超限）
3. 具体优化建议

---

## 工作流：记忆精炼

当 04-MEMORY.md 超过 10,000 字符，或积累新经验时执行。

### Step 1：收集每日日志

读取 memory/ 下最近 30 天的日志，寻找：
- 重复犯的错误（同一问题出现多次）
- 硬学到的环境事实
- 总是以相同方式做出的决策（值得写成铁律）

### Step 2：提炼至 04-MEMORY.md

每个候选条目：
1. 检查是否已存在于 MEMORY.md（避免重复）
2. 判断是否属于技能文档（工具相关规则优先放 SKILL.md）
3. 写成铁律格式：一句话、行动导向、无歧义

### Step 3：归档旧日志

```bash
# 归档30天以上日志
mkdir -p memory/archive
find memory/ -name "*.md" -mtime +30 ! -path "memory/archive/*" -exec mv {} memory/archive/ \;
```

---

## 工作流：新建工作区（从零开始）

当需要为新项目或新 Agent 创建工作区时：

1. 创建目录结构
2. 填入 CLAUDE.md 主入口
3. 创建 .claude/rules/ 四个核心文件
4. 初始化 memory/ 目录
5. 运行 /BOOTSTRAP 完成身份建立

详见 references/workspace-files.md
