# 工具超时参考

> 所有工具调用必须有超时设置。本文档为各工具的默认超时提供参考。

## Bash 命令超时

| 场景 | 超时 | 说明 |
|------|------|------|
| 快速检查 | 15s | `ls`, `echo`, `date`, `pwd` |
| 一般文件操作 | 30s | `wc`, `head`, `tail`, `cat` (小文件) |
| 搜索操作 | 60s | `grep`, `find` (限定范围), `rg` |
| Git 操作 | 60s | `status`, `diff`, `add`, `commit`, `log` |
| 网络请求 | 90s | `curl`, `wget` |
| 深度搜索 | 120s | `find` (全盘), `rg -l` |
| 大文件操作 | 120s | 大文件读取、处理 |
| Git push/pull | 90s | 网络依赖 |
| Git clone | 300s | 按仓库大小，大仓库更长 |
| 复杂构建 | 300s+ | `docker build`, 编译任务 |

## Git 命令超时

| 命令 | 超时 | 理由 |
|------|------|------|
| `git status` | 15s | 通常秒级完成 |
| `git diff` | 30s | 文件数量决定 |
| `git add` | 30s | 本地操作 |
| `git commit` | 30s | 本地操作 |
| `git push` | 90s | 网络上传 |
| `git pull` | 90s | 网络下载 |
| `git log` | 60s | 大仓库历史长 |
| `git clone` | 300s+ | 按仓库大小 |
| `git fetch` | 90s | 网络操作 |

## MCP 工具超时

| 工具 | 超时 | 说明 |
|------|------|------|
| `ddg-search` | 90s | 搜索引擎请求 |
| `github` | 60s | GitHub API 请求 |
| `playwright` | 60s | 浏览器操作 |
| `hook-runner` | 30s | 本地文件/记忆操作 |
| `im-cron` | 60s | 任务调度 |
| 通用远程 MCP | 90s | 网络依赖 |

## 内置工具超时

| 工具 | 超时 | 说明 |
|------|------|------|
| Read | 30s | 小文件读取 |
| Write | 30s | 文件写入 |
| Edit | 30s | 文件修改 |
| Glob | 30s | 文件搜索 |
| Grep | 60s | 内容搜索 |
| TodoWrite | 15s | 任务列表操作 |
| AskUserQuestion | 60s | 用户交互（等待响应） |
| Agent | 120s | 子Agent任务 |

## Agent 子进程超时（oh/Agent）

AI Agent 子进程（如 OpenHarness `oh`）执行时间差异大，需单独评估：

| 场景 | 超时 | 说明 |
|------|------|------|
| 简单查询 | 60s | 单次搜索/读取 |
| 中等任务 | 120s | 代码审查、多文件分析 |
| 复杂任务 | 300s | 重构、多步骤流程 |
| 深度研究 | 600s | 大量源码分析 |

**注**：Agent 子进程有内置 Session 机制，不受主超时影响。外部超时仅用于防止子进程失控。

## 重试策略

**可重试**（幂等操作）：
- 读取类：`Read`、`Glob`、`Grep`、搜索
- 网络类：`curl`、`ddg-search`（偶发超时）
- 状态查询：`git status`

**不可重试**（非幂等/有状态）：
- 写入类：`Write`、`Edit`、`git add`
- 破坏性：`rm`、`trash`
- 有状态操作：定时任务触发、消息发送

**重试参数**：
| 参数 | 值 | 说明 |
|------|-----|------|
| 最大次数 | 2次 | 超过则报告用户 |
| 重试间隔 | 3s | 简单等待 |
| 指数退避 | 不建议 | 增加复杂度 |

## MCP 超时配置示例

在 `~/.myagents/config.json` 中配置：

```json
{
  "mcpServers": {
    "ddg-search": {
      "command": "npx",
      "args": ["-y", "ddg-search-mcp"],
      "timeout": 90
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"],
      "timeout": 60
    },
    "hook-runner": {
      "command": "node",
      "args": ["/path/to/hook-runner.js"],
      "timeout": 30
    }
  }
}
```

**配置位置**：`config.json` → `mcpServers` → 每个 server 的 `timeout` 字段。

## 超时设置原则

1. **永远显式设置超时** — 不依赖默认值
2. **按任务复杂度选择超时** — 简单操作短，复杂操作长
3. **网络操作留足余量** — 至少 60s
4. **大文件操作提前评估** — >10MB 的文件可能需要更长时间

## 超时错误处理

**Step 1: 判断类型**
| 类型 | 特征 | 处理 |
|------|------|------|
| 超时合理 | 命令正常执行但耗时超预期 | 调整阈值 |
| 命令hung | 无响应、进程僵死 | 检查进程、终止 |
| 部分完成 | 有可用结果 | 提取结果、继续 |

**Step 2: 标准输出**
```
[超时] 工具名 - 任务描述
预期耗时: Xs
实际耗时: >Xs
原因: (判断)
建议: (重试/拆分任务/延长超时/检查进程)
```

**Step 3: 重试判断**
- 幂等操作：等待3s后重试，最多2次
- 非幂等/破坏性：直接报告用户，不重试
