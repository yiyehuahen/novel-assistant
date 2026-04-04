---
name: pdf
description: "PDF 处理工具。提取文本和表格、创建PDF、合并/拆分文档、填写表单。当用户提到 PDF、或要求处理 PDF 文档时触发。"
license: Proprietary. LICENSE.txt has complete terms
---

# PDF 处理

## 核心库

| 库 | 用途 |
|----|------|
| `pypdf` | 基本操作：读取、合并、拆分、旋转、元数据 |
| `pdfplumber` | 文本和表格提取 |
| `pymupdf` (fitz) | 高级处理、图像提取 |

## 常用操作

```python
from pypdf import PdfReader, PdfWriter

# 读取 + 页数
reader = PdfReader("document.pdf")
print(f"页数: {len(reader.pages)}")

# 合并
writer = PdfWriter()
for pdf in ["doc1.pdf", "doc2.pdf"]:
    writer.append(pdf)
writer.write("merged.pdf")

# 拆分
for i, page in enumerate(reader.pages):
    w = PdfWriter(); w.add_page(page)
    w.write(f"page_{i+1}.pdf")

# 提取文本（pdfplumber）
import pdfplumber
with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        print(page.extract_text())
        for table in page.extract_tables():
            print(table)
```

## 表单处理

填写 PDF 表单 → 阅读 `forms.md`，按其指示操作。

## 进阶参考

高级功能、JavaScript 库、详细示例 → 阅读 `reference.md`
