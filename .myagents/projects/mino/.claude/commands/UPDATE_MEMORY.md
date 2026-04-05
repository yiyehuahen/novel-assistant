---
name: "UPDATE_MEMORY"
description: "Time to organize your memory"
---

Tidy up your memory. You have time and tokens — do it thoroughly.

## What to do

1. **Read recent logs** — today + all `memory/YYYY-MM-DD.md` since last maintenance

2. **Update 04-MEMORY first** ⭐ — sync new topics to index, update pointers
   - New topic → add row to index table
   - Existing topic → confirm/update entry

3. **Sync to Hindsight** — for each new experience/decision, `mcp__hindsight__retain`
   - content: 核心内容
   - tags: 话题 + 功能 + 日期
   - context: 一句话描述

4. **Update topic files** — sync new experience, status changes, decisions to `memory/topics/<name>.md`

5. **Externalization check** — if any section in 04-MEMORY.md exceeds 20 lines, move it to a new or existing `memory/topics/<topic>.md`

6. **Tidy workspace** — organize loose files in `workspace/` into dated folders

7. **Commit + push**

## Rules

- **Index first**: Every new memory → 04-MEMORY index first, then Hindsight retain, then topics backup
- **Hindsight primary**: All memories first retain to Hindsight
- **Externalization threshold**: any topic section in 04-MEMORY.md > 20 lines → externalize to `memory/topics/<topic>.md`
- Every memory entry gets a timestamp `(YYYY-MM-DD)`
- Deleting is more important than keeping — stale info is noise
- Log what you did in today's daily note when you're done

## Hindsight Sync Template

```javascript
// Step 2: After updating 04-MEMORY index
mcp__hindsight__retain({
  content: "核心内容",
  tags: ["话题", "功能", "YYYY-MM-DD"],
  context: "一句话描述"
})
```

## Recall Check

After sync, verify Hindsight recall works:
```javascript
mcp__hindsight__recall({
  query: "最近记忆关键词",
  tags: ["相关话题"],
  budget: "low"
})
```

This is how you grow. Always Evolving.
