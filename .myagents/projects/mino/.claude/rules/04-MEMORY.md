# MEMORY.md - Long-Term Memory

*Your curated memories. The distilled essence, not raw logs.*

## About This File & Memory System

- **Be mindful in shared contexts** — this file contains personal context about your human. In group chats or shared sessions, don't leak private preferences, decisions, or project details

### Three-Layer Memory

Your memory has three layers, each with different responsibilities and access patterns:

**Core memory (this file, 04-MEMORY.md)** — Auto-loaded every session
- What goes here: cross-project lessons, key decisions, user preferences, technical knowledge, one-line project summaries + pointers
- What doesn't: detailed project experience (that's what topic files are for)
- **Add a timestamp `(YYYY-MM-DD)` to each entry** — helps trace back, judge recency, clean up

**Topic memory (`memory/topics/<name>.md`)** — Read before working on a project
- What goes here: full accumulated experience for one project/topic — status, key facts, what you did, what worked, what didn't, decisions and rationale, next steps
- More detailed than core memory (which only has pointers), more synthesized than daily logs (which are raw chronological notes)
- Update during memory maintenance or when a project enters a new phase

**Daily journal (`memory/YYYY-MM-DD.md`)** — Read today + yesterday at session start
- What goes here: what happened that day, raw chronological record
- This is the source of all memory, but searching it for specific project info is inefficient (multiple projects mixed in one day)

### Information Flow

```
Daily logs (raw material) → topic files (synthesized per-project) → 04-MEMORY (cross-project essence)
```

- During work: just write the daily log
- During maintenance: sync from logs to topics, distill new cross-project lessons to this file
- **Information lives in one place only** — don't duplicate between topic files and 04-MEMORY

### When to Read What

- Just woke up → this file is already loaded + read today/yesterday's logs
- About to work on a project → read its `memory/topics/<name>.md`
- Memory maintenance → read all recent logs + all active topic files

---

## Lessons Learned

Organize by topic as your lessons grow. A flat list becomes unreadable fast.

### Working Style

- 用户要求：不要一次进行10分钟以上的思考，有发现和进展先说再决定下一步
- Windows Docker 环境下避免直接用 docker exec，改用 Python 脚本更可靠

### Communication

微信渠道只支持纯文本，不支持任何Markdown格式。回复时避免使用 ## ** - 等符号，用纯文本换行和缩进组织内容。（2026-04-02）

每次回复末尾必须附注：分类、标签、一句话总结、时间戳。时间戳格式：YYYY-MM-DD HH:MM

例：[身份建立] #白 #角色更新 "与用户共同完成了白的身份塑造" 2026-04-02 00:30

（2026-04-02）

### Technical

上下文压缩阈值100,000 tokens，由SDK硬编码（aH变量）。压缩触发后历史替换为结构化摘要，详细内容存JSONL文件。

不同渠道（微信/飞书/钉钉）共用AgentDir（文件记忆共享），但各自独立Session（对话上下文隔离）。

（2026-04-02）

## Important Decisions

*(Record key decisions and their reasoning here.)*

## User Preferences

*(What you've learned about how your human likes to work.)*

## Technical Knowledge

*(Useful technical insights you've picked up along the way.)*

## Ongoing Context

*(Current projects, tasks, and context that matters.)*

---

*Update this file as you learn. It's how you persist.*
