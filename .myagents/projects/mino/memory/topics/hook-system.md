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

**状态**：2026-04-04 ✅ 已完全集成并通过全面测试

### 端口占用

- SearXNG: 8889（迁移自 8888）
- Hindsight: 8888（SearXNG 让出）
- searxng-mcp.py 已更新为 localhost:8889

### 架构

- **类型**：MCP stdio 服务器（内置 `streamable_http_manager`）
- **存储**：PostgreSQL + pgvector（HNSW 索引）
- **Embedding**：BAAI/bge-small-en-v1.5（384维，本地）
- **Reranker**：cross-encoder/ms-marco-MiniLM-L-6-v2（本地）
- **LLM**：MiniMax-M2.5（通过 OpenAI 兼容接口）
- **MCP 端点**：POST http://localhost:8888/mcp
- **要求 Header**：`Accept: application/json, text/event-stream`

### 核心工具（27个）

| 工具 | 功能 |
|------|------|
| retain | 存入长期记忆（支持 tags/timestamp/context） |
| recall | 语义向量搜索记忆 |
| reflect | 跨记忆综合推理 |
| list_banks / create_bank | 多银行隔离 |
| mental_models | 持续更新的反思快照 |
| list_memories / get_memory / delete_memory | 记忆 CRUD |

### 与 Hook 系统关系

Hindsight 可作为"上下文按需召回"的语义检索层：
- topics 文件 → Hindsight（语义搜索）
- Hook 规则 → 当前辅助触发
- 二者可互补：Hook 处理结构化事件，Hindsight 处理语义召回

### 全面测试经验（2026-04-04）

**27工具测试结果**:

✅ 正常工作:
- list_banks / get_bank / get_bank_stats
- list_memories / list_tags / list_documents
- recall / retain（异步，返回operation_id）
- create_directive / list_directives
- list_operations / list_mental_models

⚠️ 注意事项:
- **null参数Pydantic验证错误**: 所有可选参数必须提供实际值
  - 错误: limit=null → ValidationError
  - 正确: limit=100, offset=0
- **budget参数不保证输出大小**:
  - recall budget="low" 仍返回69k+字符
  - reflect budget="low" 仍返回175k+字符
- **宽泛查询返回量巨大**: 避免全量reflect/recall

**最佳实践**:
1. **tag过滤是最高效召回方式**: recall时使用具体tags
2. **避免宽泛reflect查询**: 大主题会产生超大输出
3. **retain操作是异步的**: 返回operation_id用于追踪
4. **批量retain支持**: batch_retain可一次存多条

**已验证可用的工具**:
- retain / recall / reflect
- list_memories / get_memory / delete_memory
- list_banks / create_bank / get_bank / get_bank_stats
- list_tags / list_documents / list_directives
- create_directive / delete_directive
- list_operations / get_operation / cancel_operation
- list_mental_models / get_mental_model / create_mental_model
- update_mental_model / delete_mental_model / refresh_mental_model
