---
name: feishu-mcp
description: 飞书MCP配置 + 文档创建/权限设置规范
type: topic
---

# 飞书 MCP 配置

## 凭证

- App ID: `cli_a9f74478d0f99cc0`
- App Secret: `KyWo5DPHnNPbif82ifTFdgDPYYrmIe2G`
- Tenant Token: 每次调用前重新获取

## 文档创建后必做（2026-04-05确立）

**所有上传飞书的文档，一律设置为公开链接。**

```bash
# 1. 创建文档
POST https://open.feishu.cn/open-apis/docx/v1/documents
Body: {"title": "xxx"}

# 2. 设置公开链接
PATCH https://open.feishu.cn/open-apis/drive/v1/permissions/{doc_id}/public?type=docx
Body: {"link_share_entity": "anyone_readable", "external_access": true}
```

**注意**：不要包 `permission_public` 外层，直接传字段。

## API 规范

### 修复的参数格式（2026-04-05）

- `link_share_entity` 取值：`tenant_readable | tenant_editable | anyone_readable | anyone_editable | closed`
- PATCH 权限接口：不包外层 `{"permission_public": ...}`，直接 `{"link_share_entity": "xxx", ...}`

### 创建文档
```
POST https://open.feishu.cn/open-apis/docx/v1/documents
Authorization: Bearer {tenant_token}
Body: {"title": "文档标题"}
```

### 获取 Tenant Token
```
POST https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal
Body: {"app_id": "cli_a9f74478d0f99cc0", "app_secret": "..."}
```

## 已知限制

- **添加成员**（member API）：tenant token 始终返回 invalid param，应用缺少对应 scope
- **隐藏头像**：display_setting 创建后不支持通过 API 修改
- **公开链接**：必须用 `anyone_readable`（非 `anyone`）
