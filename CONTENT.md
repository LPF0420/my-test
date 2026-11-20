# 内容填写指南

全站文案集中在两个文件，**不需要修改任何组件**：

| 文件 | 内容 |
|---|---|
| `src/data/content.ts` | 站点信息、个人简介、技能分组、工作经历、各区块标题 |
| `src/data/projects.ts` | 项目列表与详情页正文 |

填写完运行 `pnpm dev`，肉眼检查一遍。开发模式下如果 slug 重复、格式错误，浏览器控制台会直接报错。

---

## 1. 先读这一节（三个最容易踩的坑）

**坑一：可空字段用 `null`，不要用 `undefined`，也不要删字段。**
`avatarUrl: null`、`resumeUrl: null` —— 界面会自动隐藏对应元素。删掉字段会触发 TypeScript 报错（这是故意的，防止你漏填）。

**坑二：`slug` 只能小写字母、数字、单连字符，且全站唯一。**
`my-project` ✅ ｜ `My Project` ❌ ｜ `my_project` ❌ ｜ 两个项目都用 `demo` ❌

**坑三：图片路径必须放在 `public/` 下，路径以 `/` 开头。**
文件放 `public/avatar.jpg` → 写 `'/avatar.jpg'`（不是 `'public/avatar.jpg'`，也不是 `'./avatar.jpg'`）。

---

## 2. `content.ts`

### `site`

| 字段 | 说明 |
|---|---|
| `name` | 站点名，出现在页脚版权、404 页标题 |
| `url` | 生产域名，如 `'https://yourname.com'`，不要结尾斜杠。留空则不做 canonical |

### `profile`

| 字段 | 必填 | 说明 |
|---|---|---|
| `name` | ✅ | 显示名，Hero 的 `<h1>` 与页脚 |
| `initials` | ✅ | 没头像时的圆形占位文字，1–2 个字符，如 `'ZS'` |
| `headline` | ✅ | 一行定位，如「前端工程师 / 设计工程师」 |
| `subheadline` | ✅ | Hero 副标题，1–2 句。**写具体做过什么**，不要写「热爱技术」 |
| `location` | ✅ | 城市，可写「远程」 |
| `email` | ✅ | 联系邮箱，`mailto:` 链接会用这个 |
| `avatarUrl` | ✅ | `null` 或 `'/avatar.jpg'`。建议 400×400 以上正方形 |
| `resumeUrl` | ✅ | `null` 或 `'/resume.pdf'`。`null` 时不显示「下载简历」按钮 |
| `availability` | ✅ | `null` 或 `'可接 2026 Q1 新项目'`。`null` 时不显示徽标 |
| `facts` | ✅ | Hero 下方 3 条事实，建议恰好 3 条（移动端单列）。`label` 是灰色小字，`value` 是粗体 |
| `bio` | ✅ | 关于页正文，每项一个段落。**数组第 1–2 段会出现在首页**，所以首段要能独立成立 |
| `socials` | ✅ | 社交链接。`handle` 是显示在平台名后的账号，可填 `null` |

> `bio` 建议 3 段：① 你现在在做什么 ② 你的技术偏好与判断标准 ③ 工作之外。第 ③ 段不想要就删掉整个数组项。

### `nav`

导航项，默认「首页 / 项目 / 关于」。改文案可以，但 `to` 必须是真实存在的路由（`/`、`/projects`、`/about`）或锚点（`/#contact`）。

### `sections`

各区块的 `eyebrow`（英文小标题）、`title`（中文大标题）、`description`（一句话说明）。

- `eyebrow` 全部大写显示，用英文效果最好
- `description` 留空字符串 `''` 则不显示
- `title` 留空字符串则整个标题块不渲染

### `skillGroups`

| 字段 | 说明 |
|---|---|
| `title` | 分组名，如「语言与框架」 |
| `description` | `null` 或一句说明，说明你在这方面的具体做法 |
| `items` | 技能名数组。4 组 × 3–4 项观感最好，超过 6 项会挤 |

### `experiences`

按时间倒序排列。

| 字段 | 说明 |
|---|---|
| `kind` | `'work'` 或 `'education'`，决定徽标显示「工作」还是「教育」 |
| `period` | 时间区间字符串，如 `'2023.04 — 至今'` |
| `role` | 职位 / 学位 |
| `organization` | 公司 / 学校 |
| `summary` | 一句话说明职责范围与团队规模 |
| `highlights` | 3 条左右。**尽量带数字**：延迟从多少降到多少、覆盖多少用户 |
| `techStack` | 技术栈标签，`[]` 则不显示 |

---

## 3. `projects.ts`

每个项目一个对象。首页只展示 `featured: true` 的前 3 个，`/projects` 展示全部。

| 字段 | 说明 |
|---|---|
| `slug` | URL 片段，规则见上文 |
| `title` | 项目名 |
| `summary` | 一句话摘要，40–60 字。卡片上最多显示 3 行 |
| `role` | 你的角色，如「前端负责人」。太长会被省略号截断 |
| `year` | 年份或区间，字符串，如 `'2024'` 或 `'2023–2024'` |
| `tags` | 标签数组，会用于列表页筛选。`[]` 则不显示 |
| `status` | `'shipped'` 已上线 / `'in-progress'` 进行中 / `'archived'` 已归档 / `'concept'` 概念设计 |
| `featured` | `true` 时进首页精选 |
| `coverImage` | `null` 或 `'/projects/xxx.png'`。`null` 会渲染占位块 |
| `coverAlt` | 封面图的文字描述。有图时必须填，供读屏软件使用 |
| `links` | 外链数组，`type` 可选 `'demo' \| 'repo' \| 'article' \| 'other'`，第一项显示为主按钮 |
| `metrics` | 指标数组，`[]` 则不显示。如 `{ label: '首屏 LCP', value: '1.4s' }` |
| `overview` | 详情页概述，每项一段。建议 3 段：背景 / 你的职责 / 结果 |
| `highlights` | 详情页要点，3–5 条，每条一个技术决策或难点 |
| `techStack` | 技术栈标签 |
| `gallery` | 详情页图集，`[]` 则整块不渲染。`caption` 可为 `null` |

### 删掉示例项目

`projects.ts` 里现有 3 条 `TODO:` 占位数据，覆盖了不同形态（有封面 / 无封面 / 无标签）。填真实内容时：

- 想保留 3 个以上项目，直接往后追加对象
- 想只留 2 个项目，删掉多余对象，并确保至少 2 个 `featured: true`（否则首页精选会空一格）
- `projects` 数组不能为空 —— 至少留一个

---

## 4. 替换静态资源

| 文件 | 用途 | 建议规格 |
|---|---|---|
| `public/avatar.jpg` | 头像 | 正方形，≥ 400×400，JPG/WebP |
| `public/resume.pdf` | 简历 | 单页优先 |
| `public/projects/cover-1.svg` | 项目封面占位 | 换成 1600×1000 的 PNG/JPG |
| `public/projects/gallery-*.svg` | 详情页图集占位 | 同上 |
| `public/og-cover.png` | 社交分享卡片 | **1200×630**，改完保持此文件名 |
| `public/favicon.svg` | 站点图标 | 方形 SVG |

替换封面后，记得同步改 `projects.ts` 里的 `coverImage` 路径与 `coverAlt`。

`public/robots.txt` 里有行注释掉的 `Sitemap:`，上线并确定域名后再取消注释。

---

## 5. 改完自检

```bash
pnpm typecheck   # 漏字段、类型不匹配会在这里报错
pnpm build       # 生产构建
pnpm dev         # 打开浏览器，看控制台有没有 [content] 开头的警告
```

开发模式的校验会检查：slug 格式、slug 重复、有封面但 `coverAlt` 为空、没有任何精选项目。

最后用搜索确认没有遗漏占位符：

```bash
grep -rn "TODO" src/
```

结果应该只剩你故意保留的部分 —— 正文里出现 `TODO` 字样说明还没填完。
