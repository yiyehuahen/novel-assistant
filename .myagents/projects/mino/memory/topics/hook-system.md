# Hook 系统

*最后更新：2026-04-04*

## 状态

MCP 工具已接入，hook-assistant 技能已创建，Hook 脚本已部署。

**问题**：Hook 规则存在但不会自动触发，AI 可能漏调用。

**结论**：需要 MyAgents 底层支持类似 PreToolUse 的拦截机制才能实现真正自动化。

## 触发时机优先级

1. **会话开始** — 立即调用 `mcp__hook-runner__run_hook({event: "onSessionStart"})` 获取上下文
2. **用户询问记忆** — 调用 `mcp__hook-runner__run_hook({event: "onUserMessage", context: {message: "..."}})`
3. **感觉上下文不足** — 主动调用 Hook 获取相关记忆
4. **重要对话结束** — 调用 `mcp__hook-runner__run_hook({event: "onSessionEnd", context: {...}})` 保存

## 使用示例

```javascript
// 会话开始时
mcp__hook-runner__run_hook({event: "onSessionStart", context: {sessionId, agentDir}})

// 用户问关于之前的话题
mcp__hook-runner__run_hook({event: "onUserMessage", context: {message: "用户的消息"}})

// 感觉缺乏上下文时
mcp__hook-runner__run_hook({event: "onUserMessage", context: {message: "当前消息内容"}})

// 保存重要会话
mcp__hook-runner__run_hook({event: "onSessionEnd", context: {summary: "会话摘要"}})
```

## Hook 脚本位置

`~/.myagents/hooks/`

## Hindsight 集成

Docker 容器运行中（host 网络模式），支持更强的向量记忆检索。

**状态**：待完整集成。
