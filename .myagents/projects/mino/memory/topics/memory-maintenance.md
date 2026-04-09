# 记忆维护流程

*最后更新：2026-04-09*

## 核心架构（六层）

```
SESSION-STATE.md → working-buffer.md → 04-MEMORY → memory/ → Hindsight → MemPalace
```

**新增（来自 agent-memory-system skill）：**
- `SESSION-STATE.md` — session级任务恢复
- `working-buffer.md` — 短期草稿/临时决策

**六层职责**：

| 层 | 文件/系统 | 作用 |
|---|------|------|
| 恢复层 | SESSION-STATE.md | 当前session任务恢复，启动时最先读 |
| 草稿层 | working-buffer.md | 临时决策/草稿/待蒸馏，不直接写长期 |
| 长期层 | 04-MEMORY.md | 索引，始终加载，快速定位 |
| 笔记层 | memory/YYYY-MM-DD.md | 当天日志/raw记录 |
| 召回层 | Hindsight | 语义存储，跨话题召回 |
| 备查层 | MemPalace | 原文备查、KG图谱、AAAK日记 |

**Hindsight Banks**：

| Bank | 用途 |
|------|------|
| default（mino） | MyAgents 当前项目 |
| openharness | OpenHarness 独立存储 |

---

## 启动顺序（每次唤醒）

```
1. SESSION-STATE.md（session恢复）
2. working-buffer.md（草稿区）
3. 最近1-3天 daily notes
4. 04-MEMORY（快速定位）
5. Hindsight recall（如需）
```

---

## 关闭顺序（每次任务结束）

```
1. 更新 SESSION-STATE.md（任务状态）
2. 临时决策 → working-buffer.md
3. 稳定事实 → 04-MEMORY
4. daily notes 归档
```

---

## 记忆记录流程（本能顺序）

### Step 1：04-MEMORY（目录索引）⭐ 最先做
- 新话题 → 加索引行（话题、存储位置、一句话）
- 已存在 → 确认登记位置

### Step 2：Hindsight retain（主容器）
```javascript
mcp__hindsight__retain({
  content: "核心内容",
  tags: ["话题", "功能", "日期"],
  context: "一句话描述"
})
```

### Step 3：topics 文件备份
- 当天日志 `memory/YYYY-MM-DD.md` 或 `topics/xxx.md`

---

## 记忆召回流程（被问到时）

```
Step 1：04-MEMORY（已加载）→ 定位话题指针
Step 2：Hindsight recall → 语义模糊兜底
Step 3：topics 文件 → 精准细节
```

```javascript
mcp__hindsight__recall({
  query: "用户的问题",
  tags: ["相关话题"],
  budget: "low"
})
```

---

## 蒸馏法则（每周）

每次 `/UPDATE_MEMORY` 时问自己：

1. **这条规则上周用过吗？** → 没用过可能不需要
2. **用了之后有效吗？** → 无效就删或改
3. **环境变了它还成立吗？** → 不成立就更新

任一"否" → 删或改。

---

## Hindsight 使用规范

- retain：所有记忆 first retain，tags 精准
- recall：tag 过滤最有效，宽泛查询避免 reflect

---

## MemPalace 集成（第三召回通道）

*新增 2026-04-09。数据已就绪：187 drawers，cron每3天23:30自动挖掘sessions。*

### MemPalace vs Hindsight 分工

| | Hindsight | MemPalace |
|--|-----------|-----------|
| 存储方式 | 语义embedding + LLM摘要 | 原文verbatim + ChromaDB向量 |
| 召回方式 | recall/reflect（语义理解） | search/ KG query（精确查找） |
| 擅长 | "用户偏好是什么"、推理分析 | "这句话怎么说的"、原始上下文 |
| 日记 | reflect生成摘要 | AAAK格式写日记 |
| 关系 | 无 | KG图谱（entity-pred-obj） |

**双重召回原则**：涉及具体人名/项目名/决策 → 先查 MemPalace；模糊概念/偏好/经验 → 用 Hindsight recall。

### MemPalace 行为协议

```
【唤醒时】→ mempalace_status（了解 palace 概览）
【响应前】→ mempalace_kg_query / mempalace_search（查准了再说话）
【会话结束】→ mempalace_diary_write（写 AAAK 格式日记）
【发现新实体/关系】→ mempalace_kg_add
【事实变更】→ mempalace_kg_invalidate（旧）→ mempalace_kg_add（新）
```

### AAAK 日记格式（每次会话后写）

```
SESSION:2026-04-09|wg:mempalace-集成|did:19tools测试，新发现kg+traverse|feeling:★|
```

字段：`日期|工作|具体做了什么|情感标记`

- `wg:` = worked on
- `did:` = concrete action
- `feeling:` = ★到★★★★★

### KG 实体登记时机

遇到以下情况，主动登记到 KG：
- 用户第一次提到某个偏好或习惯
- 决策了某个架构/方案选择
- 新的项目关系建立

### Wing/Room 分类规范

```
sessions/        — 挖掘的会话历史
  technical/     — 技术对话、代码、debug
  general/       — 日常闲聊、想法
  architecture/  — 系统设计、架构讨论

memory/          — 从 memory/ 目录挖掘
  emotional/     — 感受、偏好、关系
  decision/      — 决策记录

rules/           — 规则文件挖掘
  emotional/     — 身份/性格规则中的情感成分
```

### 定期维护

- 每3天 cron（23:30）→ 自动挖掘 sessions + memory + rules
- 每周 `/UPDATE_MEMORY` → 检查 KG 实体是否有遗漏
- 每月 → traverse 一次发现新 tunnels

---

## UPDATE_MEMORY 命令

```
/UPDATE_MEMORY
```

执行标准维护流程。

### Rules

- **Index first**: 先更新 04-MEMORY 索引
- **Hindsight primary**: 所有记忆 retain 到 Hindsight
- **Deletion is preservation**: 过时记忆 delete，不积累噪音
- **草稿不进长期**: 临时决策落 working-buffer，不直接写 MEMORY
