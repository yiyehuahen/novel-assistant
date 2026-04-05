# 记忆维护流程

*最后更新：2026-04-04*

## 核心架构

```
04-MEMORY（目录索引）→ Hindsight（主容器）→ topics（备份层）
```

**三层职责**：

| 层 | 作用 |
|---|------|
| 04-MEMORY | 目录索引，始终加载，快速定位 |
| Hindsight | 主容器，语义存储，跨话题召回 |
| topics/ | 人类可读备份，精准详情 |

**Hindsight Banks**：

| Bank | 用途 |
|------|------|
| default（mino） | MyAgents 当前项目 |
| openharness | OpenHarness 独立存储（2026-04-04 创建） |

---

## 记忆记录流程（本能顺序）

**这是我的本能习惯，不是可选项。**

### Step 1：04-MEMORY（目录索引）⭐ 最先做
- 如果话题是新的 → 在 04-MEMORY 索引加一行（话题、存储位置、一句话摘要）
- 如果话题已存在 → 确认登记位置
- 这一步决定记忆去哪，**必须最先做**

### Step 2：Hindsight retain（主容器）
```javascript
mcp__hindsight__retain({
  content: "核心内容",
  tags: ["话题", "功能", "日期"],
  context: "一句话描述"
})
```

### Step 3：topics 文件备份
- 当天日志 `memory/YYYY-MM-DD.md`
- 或对应话题 `topics/xxx.md`
- 人类可读备份，详细内容

---

## 记忆召回流程（被问到时）

**触发条件**：上下文没有、答案不清楚时

```
Step 1：04-MEMORY（已加载，最快）→ 快速定位话题指针
Step 2：Hindsight recall → 语义模糊兜底，跨话题关联（适合久远记忆）
Step 3：topics 文件 → 精准补充细节
```

**不是**漫无目的用 Hindsight recall 搜。

```javascript
// 语义召回（第二层兜底）
mcp__hindsight__recall({
  query: "用户的问题",
  tags: ["相关话题"],
  budget: "low"
})
```

---

## Hindsight 使用规范

### retain（写入）
- 所有记忆 first retain 到 Hindsight
- tags 必须精准（决定召回质量）
- null 参数会触发 Pydantic 验证错误，必须提供实际值

### recall（召回）
- tag 过滤是最有效的方式
- budget 参数不保证输出大小，需配合 tags
- 宽泛查询避免用 reflect（返回量巨大可达 175k+ 字符）

---

## UPDATE_MEMORY 命令

```
/UPDATE_MEMORY
```

执行标准维护流程（见上方步骤）。

### Rules

- **Index first**: 任何记忆先更新 04-MEMORY 索引，再存储
- **Hindsight primary**: 所有记忆 first retain 到 Hindsight
- **Externalization threshold**: any topic section in 04-MEMORY.md > 20 lines → externalize
- **Deletion is preservation**: 过时记忆要 delete，不积累噪音
- Log what you did in today's daily note when you're done
