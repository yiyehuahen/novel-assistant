# Hindsight 运维记录

*创建：2026-07-21*

## 基础信息

- **容器**：`hs`，`ghcr.io/vectorize-io/hindsight:latest`
- **版本**：v0.4.18
- **端口**：8888（API+MCP），9999（Control Plane）
- **数据卷**：`/f/docker-data/hindsight:/home/hindsight`（当前为空，模型未持久化）
- **重启策略**：`--restart unless-stopped`

## 当前环境变量

| 变量 | 值 | 说明 |
|------|-----|------|
| `HINDSIGHT_API_LLM_PROVIDER` | `openai` | OpenAI 兼容协议 |
| `HINDSIGHT_API_LLM_MODEL` | `deepseek-chat` | DeepSeek flash |
| `HINDSIGHT_API_LLM_BASE_URL` | `https://api.deepseek.com/v1` | DeepSeek API |
| `HINDSIGHT_API_SKIP_LLM_VERIFICATION` | `true` | 绕过启动 LLM 校验 |
| `HF_ENDPOINT` | `https://hf-mirror.com` | HuggingFace 镜像 |

## 已知问题

1. **MiniMax 配额用完**（2026-07-21）：HTTP 429，原 LLM 从 MiniMax-M2.5 切换到 DeepSeek flash
2. **httpx client closed 启动崩溃**：v0.4.18 在 `memory_engine.initialize()` 中 `asyncio.gather` 执行 `verify_llm()` 时 httpx 客户端被提前关闭。workaround：设 `HINDSIGHT_API_SKIP_LLM_VERIFICATION=true`
3. **HuggingFace 国内不可达**：容器内无法下载 `BAAI/bge-small-en-v1.5` 和 `cross-encoder/ms-marco-MiniLM-L-6-v2`。workaround：`HF_ENDPOINT=https://hf-mirror.com`
4. **Shell 中文编码**：curl 直接传中文 JSON body 会解析失败，需写文件再 `-d @file`

## 生态位：实际使用评估

- 语义召回对"模糊记得讨论过什么"有用
- 日常快速执行中，文件系统搜索（grep/topic 文件）比 Hindsight recall 更本能
- 服务层（Hindsight+MemPalace）是安全网，不是核心依赖
- 为其他 AI 搭建时，文件层优先于服务层
