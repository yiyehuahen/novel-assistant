# Skill Market 与技能系统

*最后更新：2026-04-06*

## MCP 工具

| 工具 | 用途 |
|------|------|
| prompts-chat | 143k+ 提示词库搜索 |
| searxng | 本地元搜索 |
| hindsight | 向量记忆 |
| playwright | 浏览器自动化 |
| feishu-mcp | 飞书文档 |
| tavily-search | 全网搜索 |

---

## find-skills

**已安装**：`~/.agents/skills/find-skills/SKILL.md`

**用途**：帮用户发现和安装其他 skill。当用户问"有没有能做 X 的 skill"时使用。

**搜索**：`npx skills find [query]`
**安装**：`npx skills add <owner/repo@skill> -g -y`

---

## Skills.lc API

**API Key**: `sk_live_R45frWUyAOC_YRxL7RM_73bP6nTMzeiKEq58DWheUZY`

**搜索 skill**:
```bash
curl -s "https://skills.lc/api/v1/skills/search?q=关键词&limit=10" \
  -H "Authorization: Bearer sk_live_R45frWUyAOC_YRxL7RM_73bP6nTMzeiKEq58DWheUZY"
```

**安装 skill**:
```bash
bun x skills-lc-cli add <owner/repo>
```

---

## ZeroOne Skill Market

**安装位置**：
- OpenHarness：`~/.openharness/skills/skill-market`
- OpenClaw：`~/.openclaw/skills/skill-market`

**支持框架**：claude/codex/cursor/openclaw/opencode/qoder

**注意**：openharness 框架不被支持，使用 openclaw 框架代替。

**已安装 Skills**：
- minimax-skills（16个子技能，通过符号链接解决嵌套结构问题）
- wewrite、wechat-article-typeset、wechat-article-preset-preview
- skill-creator、humanizer-zh、playwright-skill

## skillhub CLI

已安装（npm install -g skillhub），用于搜索和安装 Skills。

**注意**：部分 Skills 依赖外部工具或后端系统，需验证兼容性后再安装。

## Skill 设计规范（from everything-claude-code）

**好技能的构成要素：**
1. **name** — 简洁，一听就懂
2. **description** — 高信号触发语言，不是营销文案
3. **whenToUse** — 明确什么时候触发，不是模糊的使用建议
4. **execution mode** — 清楚是inline还是fork执行

**技能触发原则：**
- `whenToUse` 要写成高信号触发词，不是泛泛的"当需要XX时使用"
- 示例 ❌："当需要写代码时使用" → ✅："搜索代码库、查找相关实现、理解代码结构"

**Listing 预算：**
- 技能描述要短，保留匹配质量，不要浪费 turn-zero 的预算
- 发现文本太大会消耗主任务预算

**执行模式选择：**
- Inline：简单任务、token预算充足
- Fork（独立子Agent）：复杂工作流、隔离执行、防止污染主推理路径

## 验证工作流（from verification-agent）

**原则：**
- 验证者的价值在于**打破信心**，不是加强信心
- 独立运行命令、探测边缘情况、以证据结尾

**标准验证流程：**
1. 读原始任务、修改文件、实现方案、项目规范
2. 先跑通用基线：build、test、linter、type check
3. 做类型特定策略：前端/后端/CLI/基础设施等
4. **直接操作真实系统**，不要只靠读代码
5. 至少一个对抗性探测：并发、边界值、幂等性、孤儿操作、错误路径
6. 声明 FAIL 前先检查：是否已处理、是否故意、是否可操作

**输出格式：**
```
### Check: [验证内容]
**Command run:** [精确命令]
**Output observed:** [实际输出]
**Result: PASS/FAIL**
```

**最终裁定：** `VERDICT: PASS` / `VERDICT: FAIL` / `VERDICT: PARTIAL`

**约束：**
- 不修改项目目录文件
- 不安装依赖或执行git写操作
- PASS必须有真实命令和真实输出支撑

## everything-claude-code

50K+ stars 的 AI Agent 性能优化系统。

**结论**：90%是给"构建Agent平台"的人看的，对我参考价值有限。

**有价值的**：
- skill-workflow-packaging（技能设计规范）
- verification-agent（验证工作流）

**源码**：`~/Desktop/SKILL/` 含12个架构层面技能
