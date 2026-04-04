---
name: hook-assistant
description: "主动调用 Hook 系统获取跨会话记忆。当用户提到'记住'、'之前说过'、'上次'，或新会话开始、感觉上下文不足时触发。"
---

# Hook Assistant

主动调用 Hook 系统获取跨会话记忆和上下文。

## 触发时机

- 新会话开始
- 用户说"记住"、"记忆"、"之前说过"、"上次"
- 用户询问偏好、习惯、设置
- 感觉上下文不足

## 调用方式

```javascript
// 会话开始
mcp__hook-runner__run_hook({event: "onSessionStart", context: {sessionId, agentDir}})

// 用户询问记忆
mcp__hook-runner__run_hook({event: "onUserMessage", context: {message: "用户消息"}})

// 保存会话
mcp__hook-runner__run_hook({event: "onSessionEnd", context: {summary: "会话摘要"}})
```

## Event 类型

| Event | 时机 | 用途 |
|-------|------|------|
| `onSessionStart` | 会话开始 | 获取记忆、偏好、项目上下文 |
| `onUserMessage` | 用户消息 | 检测相关记忆 |
| `onSessionEnd` | 会话结束 | 保存摘要 |

## 原则

- 主动调用，不等用户明确要求
- 结果融入回复中
- 调用失败不阻止正常回复
