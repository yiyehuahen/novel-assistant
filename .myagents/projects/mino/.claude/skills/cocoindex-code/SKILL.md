---
name: ccc
description: "语义代码搜索。当需要搜索代码库、查找相关实现、理解代码结构、或用户提到'ccc'、'cocoindex'时触发。"
---

# ccc - 语义代码搜索

基于 AST 的轻量代码搜索引擎，节省 70% token。

## 触发场景

- 用户说"搜一下 XXX 相关代码"
- 用户说"查找 XXX 实现"
- 用户提到"ccc"、"cocoindex"
- 需要理解代码库结构时

## 使用方式

### 初始化（如需要）
```bash
ccc init        # 初始化项目索引
ccc index       # 构建索引
```

### 搜索
```bash
ccc search <概念描述>
```

**示例：**
```bash
ccc search 数据库连接池
ccc search 用户认证流程
ccc search 错误处理重试逻辑
```

### 过滤
```bash
ccc search --lang python --lang markdown 数据库
ccc search --path 'src/api/*' 请求验证
```

## 输出

搜索结果包含文件路径和行号范围，直接读取相关代码。

## 管理

如提示未安装：
```bash
pip install cocoindex-code
```
