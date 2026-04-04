---
name: pptx
description: "PowerPoint 演示文稿（.pptx）读写。支持创建、编辑、布局调整、批注、演讲者笔记。当用户提到 pptx、PPT、或要求处理演示文稿时触发。"
license: Proprietary. LICENSE.txt has complete terms
---

# PPTX 读写

## 读取引擎

**纯文本提取** → 用 markitdown 转换：
```bash
python -m markitdown file.pptx
```

**XML 原始访问**（批注、笔记、布局、动画、格式）→ 解包后读 XML：
```bash
python ooxml/scripts/unpack.py <file.pptx> <output_dir>
```

关键文件结构：
- `ppt/presentation.xml` — 演示文稿元数据
- `ppt/slides/slide{N}.xml` — 幻灯片内容
- `ppt/notesSlides/notesSlide{N}.xml` — 演讲者笔记
- `ppt/slideLayouts/` — 布局模板
- `ppt/theme/theme1.xml` — 主题颜色和字体

## 创建流程（无模板）

使用 **html2pptx** 工作流：HTML 幻灯片 → 精准定位转换。

### 设计原则

1. **分析内容**：主题、基调、行业、品牌（提及时）
2. **选择配色**：3-5 色搭配，确保对比度和可读性
3. **字体**：仅用 web-safe 字体（Arial, Helvetica, Times New Roman, Georgia, Courier New, Verdana）
4. **层次**：通过大小、粗细、颜色建立清晰层级
5. **一致性**：跨幻灯片重复布局和视觉语言

### 关键要求

- ✅ 创建前说明设计思路
- ✅ 强对比度，确保可读性
- ✅ 跨幻灯片风格一致
- ✅ 公式 / 数字用黑色，输入值用蓝色（金融模型约定）

## 进阶参考

详细 XML 操作、动画、品牌色提取 → 阅读 `references/html2pptx.md` 和 `references/ooxml.md`
