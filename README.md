# 个人作品集网站

React + TypeScript + Vite + Tailwind CSS 构建的单页应用作品集，内容与代码完全分离，改文案不需要碰组件。

当前状态：**内容骨架已就绪，文案全部是 `TODO:` 占位符**。填写方式见 [CONTENT.md](./CONTENT.md)。

## 技术栈

| 项 | 版本 | 说明 |
|---|---|---|
| React | 19.3 | 函数组件 + StrictMode |
| React Router | 8.5 | 声明式路由，`react-router` 单包 |
| TypeScript | 5.9 | `strict` + `noUncheckedIndexedAccess` |
| Vite | 8.3 | 构建与开发服务器 |
| Tailwind CSS | 4.3 | `@tailwindcss/vite` 插件，**无 `tailwind.config.js`** |
| ESLint | 10 | flat config |

> TypeScript 锁在 5.9 而不是 7.x：`typescript-eslint` 目前只支持 `<6.1`，升到 7 会让 lint 失效。

## 快速开始

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

| 命令 | 作用 |
|---|---|
| `pnpm dev` | 开发服务器，HMR |
| `pnpm build` | `tsc -b` 类型检查 + Vite 生产构建，输出到 `dist/` |
| `pnpm preview` | 本地预览生产构建 |
| `pnpm typecheck` | 只跑类型检查 |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier 格式化（含 Tailwind 类名排序） |

## 目录结构

```
src/
├── data/               # ★ 全部文案与项目数据都在这里，改内容只动这个目录
│   ├── types.ts        #   内容契约（字段类型）
│   ├── content.ts      #   站点信息、个人简介、技能、经历、各区块标题
│   └── projects.ts     #   项目列表（含详情页正文）
├── lib/
│   ├── projects.ts     # 按 slug 查项目、标签筛选、开发期数据校验
│   ├── seo.ts          # usePageMeta：标题/描述/canonical/noindex
│   ├── projectStatus.ts# 项目状态的中文标签与配色
│   └── cn.ts           # 类名拼接
├── components/
│   ├── layout/         # SiteLayout / Header / Footer / ScrollManager
│   ├── ui/             # 原子组件：Button / Card / Badge / Section / Container …
│   └── sections/       # 业务区块：Hero / 精选项目 / 技能 / 经历 / 联系 …
├── pages/              # 路由页面
├── App.tsx             # 唯一的路由定义处
└── index.css           # ★ 全部设计 token（色板/字号/圆角/阴影）
```

## 改样式

**色板、字号、圆角、阴影、字体全部在 `src/index.css` 的 `@theme` 块里**，组件里只用语义类名（`bg-canvas`、`text-ink-700`、`bg-brand-600`）。

换主色：把 `--color-brand-*` 改成你的品牌色，注意 `brand-600` 要保证与白色文字对比度 ≥ 4.5:1。

改完不要忘了 Tailwind v4 不需要也不应该创建 `tailwind.config.js` —— 建了也不会被读取。这是「自定义颜色不生效」最常见的原因。

## 部署到 Vercel

### 1. 推到 GitHub

```bash
git init
git add .
git commit -m "feat: portfolio site"
git branch -M main
git remote add origin git@github.com:<你的账号>/<仓库名>.git
git push -u origin main
```

### 2. 导入 Vercel

1. 打开 [vercel.com/new](https://vercel.com/new)，选择该仓库
2. Framework Preset 选 **Vite**（通常会自动识别）
3. **Node.js Version 选 22.x** —— Vite 8 要求 ≥ 20.19 / 22.12，用 18 会构建失败
4. 其余保持默认（`vercel.json` 已声明构建命令与输出目录），点 Deploy

`vercel.json` 的关键是这条 rewrite：

```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

没有它，直接访问 `/projects/xxx` 会 404；刷新任意子页面也会 404。

### 3. 上线后验收

依次直接访问（不是从首页点进去，要在地址栏输入）：

- `/`
- `/projects`
- `/projects/todo-project-one`
- `/projects/not-a-real-slug` → 应显示「这个页面不存在」，且 URL 不变
- `/random-path` → 同上

### 4. 常见故障排查

| 现象 | 原因 |
|---|---|
| 首页就 404 | `outputDirectory` 与实际不符（应为 `dist`） |
| 只有子页面 404，首页正常 | rewrite 缺失，或写成了 `routes` 而不是 `rewrites` |
| 页面白屏，控制台报 `Unexpected token '<'` | 静态资源被 rewrite 吞掉（用了 `routes` 且没加 `{"handle":"filesystem"}`） |
| 本地能构建、Vercel 构建失败 | 导入路径大小写不一致（Linux 大小写敏感，macOS 不敏感） |
| 构建报 Node 版本错误 | Vercel 项目设置里把 Node 改成 22.x |

## SEO 现状与升级路径

当前是纯客户端渲染（CSR）。`usePageMeta` 会更新标题、描述、canonical 和 robots，但**社交平台抓取器不执行 JS**，所以分享卡片只会读 `index.html` 里的静态 OG 标签。

两个必须手动处理的点：

1. `index.html` 里的 `og:image` 目前是相对路径 `/og-cover.png`。社交平台要求**绝对 URL**，上线后改成 `https://你的域名/og-cover.png`
2. 每篇文章/项目的分享卡片无法按页区分 —— 这是 CSR 的固有限制

如果你的主要流量来自搜索引擎或社交分享，建议升级为预渲染：

1. 轻量方案：`vite-plugin-prerender` / `react-snap`，把 4 个路由提前渲染成静态 HTML
2. 彻底方案：迁移到 Next.js / Astro，保留现有 `data/` 与 `components/`

在决定之前，先确认你确实需要 —— 作品集的主要入口通常是简历里的链接，CSR 完全够用。

## 已验证项

在 360 / 390 / 768 / 1024 / 1440 五个宽度、5 条路由下自动化检查过：

- 无横向溢出（`scrollWidth === clientWidth`）
- 每个页面有且仅有一个 `<h1>`
- 无控制台错误与 React key 警告
- 生产构建下深链直访正常，无效 slug 原地 404 且不改 URL
- 标签筛选、移动端菜单（含 Escape 关闭）、skip link、路由切换后焦点移交 `#main`
- 锚点跳转不被 sticky header 遮挡

## 已知限制

- 无深色模式、无 i18n、无博客（有意不做，见需求范围）
- 无联系表单后端，使用 `mailto:` + 社交链接
- `public/projects/*.svg` 是占位封面，需替换为真实截图
- `public/og-cover.png` 是占位分享图，需替换
- 站点 `url` 留空时不输出 canonical，填了真实域名后自动生效
