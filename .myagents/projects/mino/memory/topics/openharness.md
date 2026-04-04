# OpenHarness 专题记忆

## 基本信息

- **定位**：轻量级 Agent Harness，用 Python（11,733行）复现 Claude Code 核心能力
- **底层**：基于 Anthropic Claude Code 架构设计，兼容 Claude Code Skills 和 Plugins
- **仓库**：https://github.com/HKUDS/OpenHarness
- **安装路径**：`C:\Users\Administrator\workspace\OpenHarness`
- **调用命令**：`cd C:/Users/Administrator/workspace/OpenHarness && unset NO_PROXY && uv run oh -p "指令"`
- **配置文件**：`.env`（已配置 MiniMax API）

## 核心优势（对比 MyAgents）

| 能力 | OpenHarness | MyAgents |
|------|-------------|----------|
| 工具集 | 43+ 工具，原生 MCP 集成 | 依赖配置的 Provider |
| 持久会话 | ❌ 每次独立 | ✅ 持久 Session |
| Skills 系统 | 完整兼容 anthropics/skills | 自定义 Skills |
| 交互模式 | CLI + 非交互管道 | 飞书/微信/钉钉 IM |
| 权限控制 | 多级权限 + 路径规则 + PreTool Hook | Provider 权限模式 |
| 多 Agent | Team/Swarm 原生支持 | 单 Agent |

**OpenHarness 更强的场景**：
- 代码审查、Debug、Commit 规范化（内置 skill）
- 复杂文件系统操作（glob/grep/edit 多工具协同）
- MCP 工具接入（原生 MCP 协议支持）
- 多 Agent 协作（team_create/send_message）
- 任务系统（task_create/list/stop）
- 定时任务（cron_create/list/delete）
- 非交互管道（CI/CD 嵌入）

## 内置工具清单（共37个）

### 文件操作
- `Bash` - 执行 shell 命令
- `FileRead` - 读取文件
- `FileWrite` - 写入文件
- `FileEdit` - 编辑文件（grep + write 组合）
- `Glob` - 文件模式匹配
- `Grep` - 内容搜索
- `NotebookEdit` - Jupyter notebook 编辑
- `LspTool` - LSP 语言服务

### Agent 协作
- `Agent` - 创建子 Agent
- `SendMessage` - Agent 间消息发送
- `TeamCreate` - 创建 Agent 团队
- `TeamDelete` - 删除团队

### 任务管理
- `TaskCreate` - 创建任务
- `TaskList` - 列出任务
- `TaskGet` - 获取任务详情
- `TaskOutput` - 获取任务输出
- `TaskStop` - 停止任务
- `TaskUpdate` - 更新任务

### 定时任务
- `CronCreate` - 创建定时任务
- `CronList` - 列出定时任务
- `CronDelete` - 删除定时任务

### Web 能力
- `WebFetch` - 获取网页内容
- `WebSearch` - 网络搜索
- `ToolSearch` - 搜索可用工具

### 权限与配置
- `Config` - 读写 OpenHarness 配置
- `EnterPlanMode` - 进入只读模式
- `ExitPlanMode` - 退出只读模式
- `EnterWorktree` - 进入 git worktree
- `ExitWorktree` - 退出 git worktree

### MCP
- `McpToolAdapter` - MCP 工具适配器
- `ListMcpResources` - 列出 MCP 资源
- `ReadMcpResource` - 读取 MCP 资源
- `McpAuth` - MCP 认证配置

### 其他
- `Skill` - 加载 Skill
- `TodoWrite` - 写 TODO 清单
- `Brief` - 文本压缩
- `AskUserQuestion` - 提问用户
- `Sleep` - 延时

## Skills

**内置 Skills（6个）：** commit、debug、review、plan、simplify、test

**已安装自定义 Skills（共15个）：**
- `github-code-interpreter.md` - GitHub 源码解读
- `mermaid.md` - 图表绘制
- `paper-interpreter.md` - 论文解读
- `deep-research` - 深度研究（多源网页搜索+综合报告）
- `codebase-onboarding` - 代码库快速上手
- `security-scan` - 安全扫描
- `architecture-decision-records` - 架构决策记录
- `context-budget` - 上下文预算管理
- `continuous-learning` - 持续学习（从会话提取模式）
- `token-budget-advisor` - Token 预算优化
- `tdd-workflow` - TDD 工作流
- `git-workflow` - Git 工作流
- `api-design` - API 设计
- `cost-aware-llm-pipeline` - LLM 成本感知管道
- `benchmark` - 基准测试

**Skills 目录：** `~/.openharness/skills/`

**来源：** `everything-claude-code`（156个 Skills 选装，兼容 OpenHarness 格式）

## MCP 支持

支持接入任何 MCP 服务器（通过 `--mcp-config` 或配置文件）。

**已接入的 MCP：**
1. **ddg-search**（DuckDuckGo 搜索）
   - 工具：`mcp__ddg-search__search`、`mcp__ddg-search__fetch_content`
2. **github**（GitHub MCP，官方 @modelcontextprotocol/server-github）
   - GitHub Token：`REDACTED_TOKEN`
   - 能力：搜索仓库、查看 commits/issues/PR 等

**配置位置：** `~/.openharness/settings.json`

## 权限模式

| 模式 | 行为 |
|------|------|
| `default` | 执行写操作前确认 |
| `plan` | 只读不写 |
| `full_auto` | 全部自动执行 |

路径规则：可配置 glob 模式允许/拒绝特定路径。

## 输出格式

```bash
# 纯文本
uv run oh -p "指令"

# JSON（程序化调用）
uv run oh -p "指令" --output-format json

# 流式 JSON（实时监控）
uv run oh -p "指令" --output-format stream-json
```

## 使用场景建议

**适合交给 OpenHarness 的任务**：
1. 复杂代码审查（多层文件 grep/glob/分析）
2. 系统性 Debug（Reproduce→Locate→Fix→Test）
3. Commit 规范检查和生成
4. 多文件重构和修改任务
5. 接入外部 MCP 工具
6. 多 Agent 协作任务
7. 需要 `--output-format json` 程序化输出的任务

**仍然用 MyAgents 处理**：
1. IM 消息交互
2. 持久上下文对话
3. 飞书/微信文档操作
4. 记忆管理和跨会话上下文
5. 定时任务调度

## 调用注意事项

1. **必须 unset NO_PROXY**：`unset NO_PROXY && uv run oh -p "..."`
2. **每次独立执行**：无持久会话，无上下文继承
3. **Windows asyncio bug**：traceback 不影响结果，忽略即可
4. **环境变量**：`.env` 已配置，无需每次传 `--api-key --base-url`

## 安装信息

- Python 3.11.4 ✅
- uv 0.10.10 ✅
- Node.js 24.14.0 ✅
- MiniMax API（ANTHROPIC_BASE_URL + ANTHROPIC_API_KEY）已配置

## 扩展原则

因为它底层是 Claude Code 架构，**Claude Code 的 Skills 生态可以直接移植**。

**安装来源优先级：**
1. anthropics/skills（官方）
2. chujianyun/skills（已探索，部分已装）
3. GitHub 上任何 Claude Code 兼容 Skill

**发现新 Skill 时判断标准：**
- 需要复杂文件操作、多工具协同 → 给 OpenHarness
- 需要 IM 交互、持久上下文 → 给 MyAgents
- 需要记忆/跨会话 → 给 MyAgents

## 参考学习资源

**Claude How To 教程**：`C:\Users\Administrator\workspace\claude-howto`
- 117 个 Claude Code 功能特性速查表
- 适合我深入学习 OpenHarness 的高级用法

**everything-claude-code**：`C:\Users\Administrator\workspace\everything-claude-code`
- **156 个 Skills，50K+ stars，Anthropic 黑客马拉松获胜者作品**
- 以后有需要 → 从这里挑 Skill 扩展 OpenHarness
- 安装命令：`cp -r skills/<name> ~/.openharness/skills/`

## ZeroOne Skill Market（OpenClaw 框架）

**地址**：https://api.zerone.market/api/skills/skill-market/install

**安装位置**：`~/.openclaw/skills/skill-market`（符号链接）

**已安装脚本**：`~/.openclaw/agent-use-skills/awesome-skills/skills/skill-market/scripts/market.py`

**使用方法**：
```bash
python ~/.openclaw/agent-use-skills/awesome-skills/skills/skill-market/scripts/market.py list      # 列出所有技能
python ~/.openclaw/agent-use-skills/awesome-skills/skills/skill-market/scripts/market.py info <name>  # 查看技能详情
python ~/.openclaw/agent-use-skills/awesome-skills/skills/skill-market/scripts/market.py install <name> <framework>  # 获取安装教程
```

**注意**：OpenHarness 不直接支持 ZeroOne Skill Market（框架名为 `openharness`），但 Skill Market 脚本可独立运行。

## minimax-skills 安装（2026-04-03）

**安装方式**：通过 ZeroOne Skill Market 安装

**结构问题**：minimax-skills 是嵌套目录结构（`minimax-skills/frontend-dev/SKILL.md`），OpenHarness 只扫描 `~/.openharness/skills/*.md`，不递归子目录

**解决方案**：创建符号链接扁平化
```bash
cd ~/.openharness/skills/minimax-skills
for dir in */; do name="${dir%/}"; ln -sf "$PWD/$dir/SKILL.md" "../${name}.md"; done
```

**已安装子技能（16个）**：
- android-native-dev, flutter-dev, frontend-dev, fullstack-dev
- gif-sticker-maker, ios-application-dev, react-native-dev
- minimax-docx, minimax-pdf, minimax-xlsx, pptx-generator
- shader-dev, vision-analysis, minimax-multimodal-toolkit

**调用方式**：`skill(name="frontend-dev")` 或直接描述任务让 OpenHarness 自动匹配

## 微信公众号文章发布流程（wenyan-cli）

**工具**：wenyan-cli（已安装）
- 路径：`/c/Users/Administrator/AppData/Local/MyAgents/nodejs/wenyan`
- 版本：2.0.1
- 主题列表：`default`, `orangeheart`, `rainbow`, `lapis`, `pie`, `maize`, `purple`, `phycat`

**标准流程**：
1. **写 Markdown 文章**（用代码块包裹关键指令，方便复制）
2. **渲染 HTML**：
   ```bash
   cat 文章.md | wenyan render -t orangeheart --no-footnote > 输出.html
   ```
3. **上传封面图**：获取 thumb_media_id
4. **构建 JSON**：提取 HTML 内容，拼装 draft JSON
5. **推送草稿箱**：调用微信 `/cgi-bin/draft/add` API

## 微信公众号文章发布流程（2026-04-03 更新）

**工具**：
- wewrite（文章生成）
- wechat-article-preset-preview（排版预览）
- wenyan-cli（备用渲染）

**标准流程（记住）**：
1. **用 wewrite 生成文章**（全自动模式，跳过 Step 2 选题）
   - 主题按内容风格随机选择
   - **不上传草稿箱**
2. **用 wechat-article-typeset 处理**
   - `node wechat-copy.js <文章.md> --theme <预设名>`
   - 生成预览链接
3. **用 wechat-article-preset-preview 排版预览**
   - 预设选择：根据内容气质选择（资讯→层级感、深度长文→段落节奏）
   - 生成预览链接

**文章要求（记住）**：
- **标题下方插入图片**：16:9，手绘简约风格（用 AI 图片生成）
- **文章末尾不要相关链接版块**
- 代码块用 \`\`\` 包裹关键指令

**wenyan 主题**（备用）：`default`, `orangeheart`, `rainbow`, `lapis`, `pie`, `maize`, `purple`, `phycat`

**wechat-article-typeset 预设**：
- 暖色系：coral-warm, amber-paper, cream-apricot, sakura-soft
- 科技感：teal-fresh, smartblue, mist-blue
- 墨色系：ink-seri, ink-bamboo（适合深度长文）
- 简约系：minimal-bw, dark-calm

**IP 白名单问题**：微信 API 需要出口 IP 在白名单内，当前出口 IP 可能不固定

## 工具超时治理同步（2026-04-04）

已同步超时治理方案至 OpenHarness CLAUDE.md（提交 `f11cf70`）。

**新增内容**：
1. 工具超时表（Bash/Git/内置工具，6档）
2. 重试策略（幂等判断）
3. 超时错误处理标准格式
4. 哨兵模式说明（按需使用后台+等待）

**OpenHarness 超时参考**：
| 工具类型 | 超时 |
|----------|------|
| 快速检查（ls/echo/date） | 15s |
| 一般操作（grep/wc） | 30s |
| 搜索（rg/find） | 60s |
| 网络请求（curl/ddg-search） | 90s |
| Git push/pull | 90s |
| Git clone | 300s+ |

## SearXNG MCP 修复（2026-04-04）

**问题**：SearXNG MCP 连接失败，报错 `Method not found: resources/list`

**原因**：OpenHarness 的 MCP 客户端在初始化时会调用 `resources/list` 获取资源列表，但 searxng-mcp.py 只实现了 `tools/list` 和 `tools/call`。

**修复**：在 `~/.myagents/bin/searxng-mcp.py` 中添加 `resources/list` 处理器：
```python
if method == "resources/list":
    return {
        "jsonrpc": "2.0",
        "id": req_id,
        "result": {"resources": []}
    }
```

**验证**：
- `searxng` 状态：connected，工具数：1
- 搜索功能正常

最后更新：2026-04-04
