# 微信公众号文章

*最后更新：2026-04-03*

## 工具组合

wewrite + wechat-article-typeset + wechat-article-preset-preview

## 标准流程

1. wewrite 生成文章（全自动模式，跳过 Step 2 选题）
2. 主题按内容风格随机选择
3. **不上传草稿箱**
4. 用 wechat-article-typeset 处理生成预览链接

## 文章要求

- 标题下方插入 16:9 手绘简约风格图片
- 文章末尾不出现相关链接版块
- 代码块用 \`\`\` 包裹关键指令

## 排版主题

wewrite 自有主题（非 wenyan）：

| 类别 | 主题名 |
|------|--------|
| 墨色系 | ink-seri, ink-bamboo |
| 暖色系 | coral-warm, amber-paper, cream-apricot, sakura-soft |
| 科技感 | teal-fresh, smartblue, mist-blue |
| 简约系 | minimal-bw, dark-calm |

## 旧版流程（wenyan 模式）

- 用户**指定主题** → 用 wenyan-cli（markdown + 主题转换）
- 用户**未指定主题** → 直接调微信 API 上传原始 HTML

## 直接 API 上传 HTML 流程

1. 获取 access_token：
   ```
   curl "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd0f5e881877a3212&secret=f78b28f19885ba07a858f6e9be60df3e"
   ```
2. 上传封面图获取 thumb_media_id：
   ```
   POST https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=xxx&type=image
   ```
3. 提取 HTML 内容（title、body），构建 JSON，上传草稿：
   ```
   POST https://api.weixin.qq.com/cgi-bin/draft/add?access_token=xxx
   ```
