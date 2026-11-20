/**
 * 内容数据契约。
 *
 * 约定：可空字段一律 `T | null` 而不是 `?:`，逼迫填写者显式面对「这一项还没填」，
 * 而不是靠字段缺失静默跳过渲染。所有值在 `content.ts` / `projects.ts` 中用
 * `satisfies` 校验，漏字段会在 `pnpm typecheck` 阶段直接报错。
 */

export interface SocialLink {
  /** 平台名，如 GitHub / 掘金 / Email */
  label: string
  href: string
  /** 展示在平台名后的账号，可选，如 "@yourname" */
  handle: string | null
}

export interface ProfileFact {
  label: string
  value: string
}

export interface Profile {
  /** 显示名，出现在首页 Hero 与页脚 */
  name: string
  /** 头像占位用的 1–2 个字符（如姓名缩写），不要从 name 推导 */
  initials: string
  /** 一行定位，如「前端工程师 / 交互实现」 */
  headline: string
  /** Hero 副标题，一两句话说明你做什么、擅长什么 */
  subheadline: string
  location: string
  email: string
  /** null → 渲染 initials 圆形占位 */
  avatarUrl: string | null
  /** null → 不渲染「下载简历」按钮 */
  resumeUrl: string | null
  /** null → 不渲染「可接新项目」徽标 */
  availability: string | null
  /** Hero 下方的 3 条事实，建议 3 条以内 */
  facts: ProfileFact[]
  /** 关于页正文，每项一个段落 */
  bio: string[]
  socials: SocialLink[]
}

export interface NavItem {
  label: string
  /** 站内路径；带 hash 的锚点也可 */
  to: string
}

export interface SectionCopy {
  eyebrow: string
  title: string
  description: string
}

export interface SiteConfig {
  /** 站点名，用于页脚版权与 404 页 */
  name: string
  /** 生产域名（不含结尾斜杠），留空则不做 canonical 输出 */
  url: string
}

export interface SkillGroup {
  title: string
  /** null → 不渲染分组说明 */
  description: string | null
  items: string[]
}

export type ExperienceKind = 'work' | 'education'

export interface ExperienceItem {
  kind: ExperienceKind
  /** 时间区间，如「2023.04 — 至今」 */
  period: string
  role: string
  organization: string
  summary: string
  highlights: string[]
  techStack: string[]
}

export type ProjectStatus = 'shipped' | 'in-progress' | 'archived' | 'concept'

export interface ProjectLink {
  label: string
  href: string
  type: 'demo' | 'repo' | 'article' | 'other'
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface GalleryItem {
  src: string
  alt: string
  caption: string | null
}

export interface Project {
  /** URL 片段，手写英文小写连字符，全站唯一 */
  slug: string
  title: string
  /** 一句话摘要，用于卡片与列表 */
  summary: string
  /** 你的角色，如「前端负责人」 */
  role: string
  /** 年份或区间，字符串即可，避免 Date 的时区问题 */
  year: string
  tags: string[]
  status: ProjectStatus
  /** 是否出现在首页精选（建议 3 个） */
  featured: boolean
  /** null → 渲染确定性占位块 */
  coverImage: string | null
  coverAlt: string
  links: ProjectLink[]
  metrics: ProjectMetric[]
  /** 详情页概述，每项一个段落 */
  overview: string[]
  /** 详情页要点，建议 3–5 条 */
  highlights: string[]
  techStack: string[]
  gallery: GalleryItem[]
}
