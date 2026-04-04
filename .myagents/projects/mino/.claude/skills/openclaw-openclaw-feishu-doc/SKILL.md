---
name: feishu-doc
description: "飞书云文档读写。当用户提到飞书文档、云文档、或 docx 链接时触发。"
---

# Feishu Document Tool

飞书云文档的读写操作工具。

## 触发场景

- 用户说"飞书文档"、"云文档"
- 用户发来飞书 docx 链接
- 用户要求读取/写入飞书文档

## 工具

`feishu_doc` 单一工具，通过 action 参数区分操作类型。

## 能力

- 读取飞书文档内容
- 写入/创建飞书文档
- 支持 Docx 格式转换
