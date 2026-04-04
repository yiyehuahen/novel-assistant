---
name: diagnostic-workflow
description: "MyAgents 诊断工作流。当用户报告问题、排查错误、或进行故障诊断时触发。提供标准诊断步骤、日志分析、错误模式匹配。"
---

# Diagnostic Workflow

MyAgents 诊断的标准流程。遇到问题时按此流程排查。

## 标准诊断步骤

1. **先看 Boot Banner** `grep '\[boot\]' ~/.myagents/logs/unified-*.log`
   — 快速了解版本、Provider、运行时、Agent 配置
2. **读今天的统一日志** `~/.myagents/logs/unified-*.log`，用 grep 搜索关键错误
3. **读 config.json**（**脱敏后**）了解 Provider / MCP / Agent 详细配置
4. **按时间线重建事件**：从 `[REACT]` → `[RUST]` → `[BUN]`
5. **对照错误模式速查表** 定位根因
6. **区分用户可解决 vs 需要开发修复**

---

## 统一日志格式

### 日志行结构

```
时间戳                    来源    级别    内容
2026-03-21 13:47:54.055 [BUN  ] [INFO ] [agent] enqueue user message...
2026-03-21 13:47:54.056 [REACT] [ERROR] [configService] Failed to save...
2026-03-21 13:47:54.057 [RUST ] [INFO ] [sidecar] Session sidecar started...
```

日志时间戳统一使用**本地时间**（非 UTC）。诊断时以 `[BUN]` 时间戳为准。

### 三个来源

| 来源 | 模块 | 关注场景 |
|------|------|----------|
| `[REACT]` | 前端日志 | UI 交互、配置保存、SSE 事件接收 |
| `[BUN]` | Bun Sidecar 日志 | Agent 执行、MCP 工具调用、Provider 验证 |
| `[RUST]` | Rust 层日志 | Sidecar 进程管理、HTTP/SSE 代理、IM 适配器、定时任务 |

### 日志模块标签速查

| 标签 | 模块 | 关注场景 |
|------|------|----------|
| `[boot]` | 启动自检 | **首先看这个** — 版本、OS、Provider、MCP、Agent/Channel 数量 |
| `[sidecar]` | Sidecar 进程管理 | 启动失败、端口冲突、进程崩溃 |
| `[proxy]` | Rust HTTP 代理 | 请求路由、连接错误、404/502 |
| `[agent]` | Agent Session | AI 对话、pre-warm、超时、rewind/fork |
| `[provider/verify]` | 验证核心逻辑 | SDK 子进程、auth 错误 |
| `[bridge]` | Plugin Bridge | 社区插件启动、消息路由、健康检查 |
| `[feishu]` `[telegram]` `[dingtalk]` | 内置 IM 适配器 | 连接、消息、认证 |
| `[CronTask]` | 定时任务管理 | 创建、调度、执行、恢复 |

---

## 错误模式速查表

### Provider 验证错误

| 日志特征 | 根因 | 用户看到的 | 解决方案 |
|----------|------|-----------|----------|
| `auth error: ... 401 {"error":{"code":"invalid_api_key"}}` | API Key 无效或过期 | 验证超时/Key无效 | 重新获取正确的 API Key |
| `auth error: ... 401 {"error":{"message":"令牌已过期"}}` | API Key 过期（智谱等） | 验证超时 | 重新生成 API Key |
| `Integrity check failed for tarball` | Windows Bun 缓存问题 | 验证超时（首次 23s+ 延迟） | 已知 Windows 问题，重试通常恢复 |
| `验证超时` 但无 `auth error` | 网络问题/Provider 不可达 | 验证超时 | 检查网络、代理设置 |
| `ECONNREFUSED` | Provider 地址不可达 | 网络连接失败 | 检查 Base URL 是否正确 |

**验证超时隐藏机制**：使用 `Promise.race([verifyPromise, 30秒超时])`。即使 Provider 已返回 401 错误，如果处理耗时超过 30 秒，用户看到的是"验证超时"而非"API Key 无效"。诊断时务必搜索 `auth error` 和 `401`。

### Sidecar 启动错误

| 日志特征 | 根因 | 解决方案 |
|----------|------|----------|
| `[sidecar] Starting global sidecar` 反复出现 | 应用多次重启 | 正常现象 |
| `Connection error - cannot establish connection` | Sidecar 重启期间的请求 | 等待几秒即可 |
| `[agent] Startup timeout: no system_init in 60s` | SDK 子进程未响应 | 检查网络、API Key、磁盘空间 |
| `[agent] pre-warm failed` | MCP 或 SDK 初始化失败 | 检查 MCP 配置，或网络问题 |

### MCP 服务器错误

| 日志特征 | 根因 | 解决方案 |
|----------|------|----------|
| `MCP failed to start` | MCP 服务器启动失败 | 检查命令/参数是否正确 |
| `command not found` | 运行时缺失 | 检查 MCP 配置中的 command；若是 npx，确认 Node.js 可用 |
| `连接超时（15秒）` | 远程 MCP 不可达 | 检查 URL 或服务器状态 |

### Agent Channel 错误

| 日志特征 | 根因 | 解决方案 |
|----------|------|----------|
| `[feishu] WebSocket disconnected` | 飞书连接断开 | 检查 AppId/AppSecret，确认应用权限 |
| `[telegram] polling error` | Telegram 轮询失败 | 检查 Bot Token、网络/代理 |
| `[dingtalk] Stream error` | 钉钉连接失败 | 检查 ClientId/ClientSecret |
| `[im] Stream timeout` | AI 回复超时 | 检查 Provider 配置和网络 |
| `Bridge plugin not ready after 15s` | 社区插件启动失败 | 检查插件是否安装、配置是否正确 |
| `npm install failed ... Class extends` | Windows npm 崩溃 | 正常——看后续是否有 `Bun fallback succeeded` |
| `Bun fallback install succeeded` | npm 失败但 Bun 兜底成功 | **无需处理**，插件安装成功 |

### 定时任务错误

| 日志特征 | 根因 | 解决方案 |
|----------|------|----------|
| `[CronTask] Task xxx execution failed` | 定时任务执行出错 | 查看 `cron_runs/` 对应 JSONL 获取详细错误 |
| `[CronTask] Session not available` | Sidecar 不可用 | Sidecar 可能已停止，检查 Sidecar 状态 |

### Rewind / Fork 错误

| 日志特征 | 根因 | 解决方案 |
|----------|------|----------|
| `[agent] rewindFiles error: No file checkpoint` | AI 该回复没有修改过文件 | 正常 |
| `[agent] rewind: skipping resumeSessionAt — UUID not in current session` | 旧消息的 UUID 不属于当前 SDK session | 正常——系统会新建 session |
| `SDK UUID 已过期` | Fork 目标消息来自已过期的 session | 建议用户重新发送消息后再 fork |

---

## Provider 认证速查

### 认证类型

| authType | 含义 | 环境变量 |
|----------|------|---------|
| `auth_token` | Auth Token 认证 | `ANTHROPIC_AUTH_TOKEN` = key |
| `api_key` | API Key 认证 | `ANTHROPIC_API_KEY` = key |
| `both` | 两者同时 | 两个都 = key |
| `auth_token_clear_api_key` | Token 认证 + 清除 API Key | `ANTHROPIC_AUTH_TOKEN` = key, `ANTHROPIC_API_KEY` = '' |

### 内置 Provider 清单

| Provider | authType | 常见问题 |
|----------|----------|----------|
| Anthropic 订阅 | _(subscription)_ | 需 `claude --login` 登录 |
| Anthropic API | `both` | Key 格式 `sk-ant-...` |
| DeepSeek | `auth_token` | |
| Moonshot | `auth_token` | |
| 智谱 AI | `auth_token` | Key 含 `.` 分隔符 |
| MiniMax | `auth_token` | |
| Google Gemini | `api_key` | OpenAI 兼容格式，需代理 |
| 火山方舟 API | `auth_token` | 需创建推理接入点 |
| 硅基流动 | `api_key` | **注意 authType 不同** |
| 阿里云百炼 Coding | `auth_token` | **必须用 Coding Plan Key** |
| OpenRouter | `auth_token_clear_api_key` | |

### 用户常见错误

1. **阿里云百炼**：普通 DashScope API Key（`sk-xxx`）不能用于百炼 Coding Plan
2. **火山方舟 API**：需要先创建"推理接入点"，获取的是接入点 ID 而非 API Key
3. **智谱 AI**：Key 格式是 `xxx.yyy`，用户可能只复制了一半
4. **Anthropic 订阅**：不需要 API Key，需通过 `claude --login` 登录

---

## 插件安装链路

```
[bridge] npm install: node=v24.14.0, npm=11.12.0
    │
    ├── 成功: [bridge] npm install xxx succeeded
    │
    └── 失败: [bridge] npm install xxx failed (exit 1): Class extends...
                 │
                 ▼ 尝试系统 npm
              [bridge] Trying system npm: "C:\...\npm.cmd"
                 │
                 ├── 成功: [bridge] System npm install xxx succeeded
                 │
                 └── 失败: [bridge] Falling back to Bun for plugin install
                              │
                              ├── 成功: [bridge] Bun fallback install xxx succeeded
                              └── 失败: [bridge] Bun fallback also failed...
```

**Windows 常见问题**：Node.js v24 的 npm 内部依赖在 Windows 上崩溃（`Class extends value undefined`），自动降级到 Bun。如果日志显示 `Bun fallback succeeded`，**插件安装成功**，无需担心。

---

## 平台特有问题（Windows）

### npm 插件安装崩溃

**现象**：`Class extends value undefined is not a constructor or null`

**判断**：搜索 `[bridge]`：
- `npm install xxx failed` + `Falling back to Bun` + `Bun fallback succeeded` → **成功**
- `Bun fallback also failed` → 真正的失败，建议用户安装系统 Node.js

### Integrity check failed（影响首次验证）

**现象**：首次验证 Provider 时超时，日志出现 `Integrity check failed for tarball`

**本质**：Bun 对内置 SDK 包的完整性校验在 Windows 上偶发失败，不影响实际功能。

**建议**：第二次验证通常正常。

---

## config.json 结构（参考）

脱敏规则：API Key 前4后4位，中间 `****` 替代。

```jsonc
{
  "defaultProviderId": "anthropic-sub",
  "defaultPermissionMode": "auto",
  "providerApiKeys": { "deepseek": "sk-a****789" },
  "providerVerifyStatus": { "deepseek": { "status": "valid", "verifiedAt": "..." } },
  "mcpServers": [{ "id": "playwright", "name": "Playwright", "type": "stdio", "command": "npx", "args": [...] }],
  "mcpEnabledServers": ["playwright"],
  "mcpServerEnv": { "mcp-id": { "KEY": "val" } },
  "proxySettings": { "enabled": true, "protocol": "http", "host": "127.0.0.1", "port": 7897 },
  "agents": [{ "id": "...", "name": "...", "workspacePath": "...", "providerId": "...", "channels": [...] }],
  "providerModelAliases": { "deepseek": { "sonnet": "deepseek-chat", "opus": "deepseek-reasoner" } }
}
```

---

## Boot Banner

应用启动和 Sidecar 创建时会输出 `[boot]` 标签的集中诊断信息。

```
# 应用启动（Rust 层）
[boot] v=0.1.53 build=release os=macos-aarch64 provider=deepseek mcp=2 agents=3 channels=5 cron=12 proxy=false dir=/Users/xxx/.myagents

# Sidecar 启动（Bun 层）
[boot] pid=12345 port=31415 bun=1.2.8 workspace=/Users/xxx/project/my-app session=abc-123 resume=true model=deepseek-chat bridge=yes mcp=playwright,im-cron
```

用法：`grep '\[boot\]' ~/.myagents/logs/unified-*.log`

---

## 定时任务诊断

1. 检查 `cron_tasks.json` 中对应任务的 `enabled` 字段
2. 搜索日志 `[CronTask]` 看调度器状态
3. 检查 `cron_runs/` 对应 JSONL 文件的最近执行记录

---

## 诊断时禁止事项

- 不要暴露 "Sidecar"、"SDK subprocess"、"Tauri invoke" 等内部术语给用户
- 告知用户问题时用通俗语言，给出具体操作步骤
- config.json 必须脱敏后展示
