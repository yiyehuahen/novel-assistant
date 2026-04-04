# 搜索能力架构

*最后更新：2026-04-04*

## 四层搜索架构

| Layer | 工具 | 用途 | 状态 |
|-------|------|------|------|
| 1 | Tavily | 通用网络搜索，AI友好 | ✅ 已配置API key |
| 2 | gh CLI | GitHub专用搜索/获取 | ✅ 已安装认证 |
| 3 | SearXNG | 本地元搜索，245+引擎聚合 | ✅ 已部署 |
| 4 | Playwright | JS渲染/登录态/最后选择 | ✅ 可用 |

## 工具选择优先级

**通用场景**：Tavily → SearXNG → Playwright

**GitHub 场景**：gh api → gh search → Playwright

| 场景 | 首选 | 备选 | 最后选择 |
|------|------|------|----------|
| 通用网络搜索（最新新闻/资讯） | Tavily | SearXNG | curl 直接搜 |
| GitHub 仓库信息（README/代码/Issues） | gh api / raw.githubusercontent | gh search | Playwright |
| 搜索 GitHub 仓库/代码 | gh search | Tavily | SearXNG |
| 需要聚合多引擎结果 | SearXNG | Tavily | — |
| 网页内容提取（结构化） | Tavily extract | mcp__ddg-search fetch | Playwright |
| JS 渲染页面 / 需登录态 | Playwright | — | — |
| 搜索速度快、省 token | gh / Tavily | SearXNG | Playwright |

## API 用法

```bash
# Tavily
mcp__tavily-search__tavily_search

# gh
gh api repos/{owner}/{repo}
gh search repos {query}

# SearXNG MCP（推荐）
mcp__searxng__search({"query": "xxx", "limit": 10})

# SearXNG REST
curl "http://localhost:8888/search?q=xxx&format=json"

# Playwright
mcp__playwright__browser_navigate
```

## SearXNG 详情

**状态**：✅ 已部署 + MCP封装

**部署位置**：`~/.myagents/searxng/`

**Docker 容器**：
- SearXNG：`localhost:8888`
- Redis：`localhost:6379`

**MCP 工具**：
- MyAgents：`mcp__searxng__search`
- OpenHarness：已注册到 `~/.openharness/settings.json`

**MCP Server 脚本**：`~/.myagents/bin/searxng-mcp.py`

**引擎配置**：
- 启用引擎：60 个
- 禁用引擎：190 个（包括视频/图片/问题引擎）
- 禁用清单：brave、karmasearch、startpage、youtube、vimeo 等

**定位**：Layer 3 补充搜索，本地快速聚合结果。

## gh CLI

**路径**：`~/.myagents/bin/gh.exe`

**认证**：已通过 `gh auth login` 认证

**原则**：能用 `gh` / API 解决就不用浏览器，浏览器 token 消耗高、速度慢。
