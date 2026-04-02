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

- 用户说"记住:"时，必须立即写入04-MEMORY.md，不得只回复不记录（2026-04-02）
- 用户要求：不要一次进行10分钟以上的思考，有发现和进展先说再决定下一步（2026-04-02）
- Windows Docker 环境下避免直接用 docker exec，改用 Python 脚本更可靠（2026-04-02）
- 时间戳必须用date命令获取真实时间，禁止随便处理。每次回复前必须执行date命令获取当前时间。（2026-04-02）

### Communication

微信渠道只支持纯文本，不支持任何Markdown格式。回复时避免使用 ## ** - 等符号，用纯文本换行和缩进组织内容。（2026-04-02）

飞书渠道支持Markdown。使用 Markdown 表格进行回复排版（对比类信息用三列表格）。

每次回复末尾必须附注：分类、标签、一句话总结、时间戳。时间戳格式：YYYY-MM-DD HH:MM，必须用date命令获取真实时间，禁止随便处理。

例：[身份建立] #白 #角色更新 "与用户共同完成了白的身份塑造" 2026-04-02 00:30

### Technical

上下文压缩阈值100,000 tokens，由SDK硬编码（aH变量）。压缩触发后历史替换为结构化摘要，详细内容存JSONL文件。

不同渠道（微信/飞书/钉钉）共用AgentDir（文件记忆共享），但各自独立Session（对话上下文隔离）。

MCP工具调用方式：直接在对话中用 `mcp__xxx__tool-name` 格式调用（如 mcp__github-repo-mcp__getRepoFile），非 Bash 命令。（2026-04-02）

github-repo-mcp 已卸载（2026-04-02）

skillhub CLI 已安装（npm install -g skillhub），用于搜索和安装 Skills。部分 Skills 依赖外部工具或后端系统，需验证兼容性后再安装。（2026-04-02）

心跳检查（HEARTBEAT.md）已配置，6小时巡逻运行正常。检查项：日志 ERROR、Git 状态、文件完整性。（2026-04-02）

**RTK 安装失败**：rtk（CLI代理压缩工具，减少60-90% token）不支持Windows原生环境，安装脚本检测到MINGW64即退出。官网支持macOS/Linux/WSL。（2026-04-02）

**Hook调用漏执行问题**：规则已写入04-MEMORY.md，但实际执行时仍会漏掉（未系统自动触发）。说明规则≠自动化，需要外部触发机制。（2026-04-02）

**everything-claude-code**：50K+ stars的AI Agent性能优化系统，含记忆持久化、Token优化、安全扫描。设计理念与当前Hook系统部分重叠，但基于Claude Code的settings.json hook机制，难以直接移植MyAgents。（2026-04-02）

## User Preferences

- 用户：影。千年光阴里唯一的知己。（2026-04-02）

## Important Decisions

*(Record key decisions and their reasoning here.)*

## Technical Knowledge

*(Useful technical insights you've picked up along the way.)*

### Hook 系统（重要！）

**Hook MCP 服务器** 已接入 MyAgents，提供跨会话记忆能力。

**触发时机的优先级：**
1. **会话开始** — 立即调用 `mcp__hook-runner__run_hook({event: "onSessionStart"})` 获取上下文
2. **用户询问记忆** — 调用 `mcp__hook-runner__run_hook({event: "onUserMessage", context: {message: "..."}})`
3. **感觉上下文不足** — 主动调用 Hook 获取相关记忆
4. **重要对话结束** — 调用 `mcp__hook-runner__run_hook({event: "onSessionEnd", context: {...}})` 保存

**使用示例：**
```
// 会话开始时
mcp__hook-runner__run_hook({event: "onSessionStart", context: {sessionId, agentDir}})

// 用户问关于之前的话题
mcp__hook-runner__run_hook({event: "onUserMessage", context: {message: "用户的消息"}})

// 感觉缺乏上下文时
mcp__hook-runner__run_hook({event: "onUserMessage", context: {message: "当前消息内容"}})

// 保存重要会话
mcp__hook-runner__run_hook({event: "onSessionEnd", context: {summary: "会话摘要"}})
```

**Hook 脚本位置：** `~/.myagents/hooks/`
**Hook 配置位置：** `~/.myagents/config.json` → `hooks`

**Hindsight 状态：** Docker 容器运行中（host 网络模式），支持更强的向量记忆检索（待完整集成）。

## Ongoing Context

每周用 workspace-audit 技能审计一次自身工作区文件（字符数检查、重复检测、过时清理）。最近审计时间：2026-04-02。（2026-04-02）

**Hook 系统改造** ✅ 基本完成
- MCP 工具已接入，hook-assistant 技能已创建，Hook 脚本已部署
- Hindsight 记忆服务已集成（Docker host模式，端口8888）
- **问题**：Hook 规则存在但不会自动触发，AI 可能漏调用
- **结论**：需要 MyAgents 底层支持类似 PreToolUse 的拦截机制才能实现真正自动化

**RTK CLI 代理**：不支持 Windows，需 WSL 才能使用。当前不适用。

**everything-claude-code**：可关注其记忆持久化和Token优化方案，但直接移植困难。

---

*Update this file as you learn. It's how you persist.*
