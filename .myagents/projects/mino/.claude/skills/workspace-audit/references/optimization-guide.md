# Workspace Optimization Guide

保持 OpenMino 工作区文件精简、无重复、在 Token 预算内的策略。

## 审计文件大小

检查所有工作区文件的字符数：

```bash
wc -c CLAUDE.md .claude/rules/*.md memory/*.md
```

**阈值：**

| 字符数 | 状态 |
|--------|------|
| < 5,000 | 健康 |
| 5,000–10,000 | 可接受；观察增长 |
| 10,000–15,000 | 审查精简机会 |
| > 15,000 | 需优化 |
| > 20,000 | 危险，可能被截断——立即修复 |

---

## 何时将内容移出主文件

以下情况考虑将内容移到 references/ 或具体文件中：

**移出主文件当：**
- 内容只在特定操作类型时才需要
- 内容是参考资料而非规则/事实
- 内容是长篇叙述解释而非原则
- 内容与过去任务或历史背景相关

**保留在主文件当：**
- 内容影响每个对话轮次（人格、安全规则）
- 内容足够短（< 200 字符）
- 内容必须在 Agent 收到消息前就已加载（启动序列文件）

---

## 重复内容审计

常见重复来源：

| 来源A | 来源B | 检查项 |
|--------|--------|--------|
| SOUL.md | IDENTITY.md | 安全规则重复？SOUL 写人格，IDENTITY 写事实 |
| USER.md | MEMORY.md | 用户偏好重复？保留在 USER.md |
| MEMORY.md | 技能 SKILL.md | 规则重复？稳定规则移至技能文档 |
| CLAUDE.md | rules/ 文件 | 操作说明重复？CLAUDE 写结构，rules 写内容 |

---

## 记忆提炼流程

### Step 1：收集每日日志

```bash
ls memory/ | sort
```

读取最近 30 天日志，寻找：
- 重复犯的错误（同一问题出现多次）
- 硬学到的环境事实
- 总是以相同方式做出的决策（好候选写成铁律）

### Step 2：提炼至 04-MEMORY.md

每个候选：
1. 检查是否已存在于 MEMORY.md（避免重复）
2. 判断是否属于技能 SKILL.md（工具相关规则优先放技能文档）
3. 写成铁律格式：短、行动导向、无歧义

**铁律格式：**
```
N. **规则名称（类别）**：一句话规则。必要时在同一句中补充背景。
```

### Step 3：归档旧日志

```bash
# 归档30天以上日志
mkdir -p memory/archive
find memory/ -name "*.md" -mtime +30 ! -path "memory/archive/*" -exec mv {} memory/archive/ \;
```

### Step 4：审查 MEMORY.md 降级候选

定期检查是否有条目：
- 已过时不适用
- 太详细应移至每日日志
- 与其他文件重复

---

## 精简 CLAUDE.md 的方法

CLAUDE.md 过长时：

1. 详细架构说明 → 移至 references/architecture.md
2. 错误处理流程 → 移至 checklists/error-handling.md
3. 示例代码 → 移至 references/examples.md

CLAUDE.md 只保留：目录结构总览、文件加载优先级、Git 使用规范摘要（详细版在 references/）

---

## 安全性检查

定期确认：

1. 04-MEMORY.md 从未在群聊或子 Agent 会话中加载
2. 敏感信息（API Key、Token）在文件中有脱敏处理
3. USER.md 不包含不应共享的私密上下文
