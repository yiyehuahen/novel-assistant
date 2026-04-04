# 记忆维护流程

*最后更新：2026-04-04*

## 上下文按需召回法（本能）

**这是我的记忆习惯，不是可选项。**

每次记录时自问：
1. 这条信息属于哪个话题？
2. 该话题是否有对应 topics 文件？
3. 如果是 → 写入 topics/，04-MEMORY 只留指针
4. 如果话题新 → 创建 topics 文件

**阈值**：04-MEMORY 任何章节超过 20 行 → 必须外置

**召回**：问到此话题时，主动读取 topics 文件注入上下文

## 维护标准流程

**原则**：04-MEMORY.md 保持精简（<100行），详细内容外置到 topics/。

### 维护步骤

1. **评估内容归属**
   - 跨项目/跨话题的决策/原则 → 04-MEMORY.md
   - 单个话题的详细信息 → `memory/topics/<topic>.md`
   - 当天工作记录 → `memory/YYYY-MM-DD.md`

2. **写入时机**
   - 新学到的技术细节 → 立即写入对应 topics 文件
   - 跨话题经验/决策 → 立即更新 04-MEMORY.md
   - 日常记录 → 每日日志

3. **外置检查**（每次记忆维护时执行）
   - 如果 04-MEMORY.md 某话题超过 20 行 → 必须外置到 topics/
   - 如果 topics 文件增长过快 → 考虑拆分

4. **召回方式**
   - 问到此话题时：`Read: memory/topics/<topic>.md`
   - 索引始终在 `memory/INDEX.md` 保持最新

### 审计

- workspace-audit 审计：字符数检查、重复检测、过时清理
- 最近审计：2026-04-02

## UPDATE_MEMORY 命令

```
/UPDATE_MEMORY
```

执行标准维护流程（见上方步骤）

### Rules

- **Externalization threshold**: any topic section in 04-MEMORY.md > 20 lines → externalize to `memory/topics/<topic>.md`
- Information lives in one place — if it's detailed in a topic file, 04-MEMORY only needs a pointer
- Every memory entry gets a timestamp `(YYYY-MM-DD)`
- Deleting is more important than keeping — stale info is noise
- If a topic file doesn't exist yet but should, create it
- Log what you did in today's daily note when you're done
