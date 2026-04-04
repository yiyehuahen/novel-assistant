---
name: xlsx
description: "Excel 表格（.xlsx）读写。支持创建、编辑、公式、格式化、数据分析。当用户提到 xlsx、Excel、或要求处理电子表格时触发。"
license: Proprietary. LICENSE.txt has complete terms
---

# Excel 表格处理

## 核心原则

**零公式错误**：所有输出必须零错误（#REF! #DIV/0! #VALUE! #N/A #NAME?）

**公式优先**：用 Excel 公式而非 Python 计算后硬编码值。表格应在源数据变化时自动重算。

**保留模板**：修改现有文件时，严格匹配原有格式和约定，不强制标准化。

## 工具选择

| 工具 | 适用场景 |
|------|----------|
| `pandas` | 数据分析、批量操作、简单导出 |
| `openpyxl` | 复杂格式化、公式、Excel 特有功能 |

## 常用操作

```python
import pandas as pd
from openpyxl import Workbook, load_workbook

# 读取（pandas）
df = pd.read_excel('file.xlsx', sheet_name=None)  # 全部sheet

# 创建（openpyxl）
wb = Workbook(); s = wb.active
s['A1'] = '=SUM(B1:B10)'  # 公式，非硬编码
wb.save('output.xlsx')

# 编辑（保留公式）
wb = load_workbook('existing.xlsx')
wb.save('modified.xlsx')

# 重算（如使用公式，必须执行）
python recalc.py output.xlsx
```

## 金融模型配色规范

| 颜色 | 含义 |
|------|------|
| 蓝色字 | 硬编码输入值 |
| 黑色字 | 公式和计算 |
| 绿色字 | 同文件内跨工作表引用 |
| 红色字 | 外部文件链接 |
| 黄色背景 | 需关注的假设 |

## 数字格式化

- 年份：文本格式 "2024"（非 "2,024"）
- 货币：`$#,##0`，表头注明单位
- 零值：显示为 "-"（`$#,##0;($#,##0);-`）
- 负数：括号 `(123)` 而非 `-123`

## 重算与校验

使用 `recalc.py` 重算所有公式并检查错误：
```bash
python recalc.py output.xlsx
# 返回 JSON：status / error_summary / total_formulas
```

常见错误：`#REF!`（无效引用）、`#DIV/0!`（除零）、`#VALUE!`（类型错误）、`#NAME?`（公式名无法识别）
