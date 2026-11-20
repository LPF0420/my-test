import type {
  ExperienceItem,
  NavItem,
  Profile,
  SectionCopy,
  SiteConfig,
  SkillGroup,
} from './types'

/**
 * 全站文案的唯一来源。
 *
 * 填写方法：把每一处 `TODO:` 换成你的真实内容即可，不需要改任何组件。
 * 更详细的逐字段说明见仓库根目录的 CONTENT.md。
 */

export const site = {
  // 站点名，用于页脚版权与 404 页
  name: 'TODO: 你的名字',
  // 上线后填真实域名（不带结尾斜杠），如 'https://example.com'
  url: '',
} satisfies SiteConfig

export const profile = {
  name: 'TODO: 你的名字',
  initials: 'TBD',
  headline: 'TODO: 你的岗位，如「前端工程师 / 设计工程师」',
  subheadline:
    'TODO: 用一到两句话说明你做什么、擅长什么、做出过什么。「擅长把复杂交互做得又快又稳」这类具体描述，比「热爱技术」有效得多。',
  location: 'TODO: 城市（可写「远程」）',
  email: 'todo@example.com',
  // 换成 public/ 下的图片路径（如 '/avatar.jpg'），或直接填外链
  avatarUrl: null,
  // 简历 PDF 放进 public/ 后填 '/resume.pdf'；没有就留 null，按钮会自动隐藏
  resumeUrl: null,
  // 如「可接 2026 Q1 的新项目」；没有就留 null，徽标会自动隐藏
  availability: null,
  facts: [
    { label: 'TODO: 经验', value: 'X 年' },
    { label: 'TODO: 项目', value: 'X 个' },
    { label: 'TODO: 领域', value: 'TODO' },
  ],
  bio: [
    'TODO: 第一段 —— 你现在在做什么、关注什么方向。两三句话，讲清楚你的位置。',
    'TODO: 第二段 —— 你的技术偏好和判断标准。比如你如何权衡交付速度与可维护性，偏好哪类架构。',
    'TODO: 第三段 —— 工作之外。可选：写作、开源、演讲、兴趣。没有就删掉这一项。',
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/TODO', handle: '@TODO' },
    { label: 'TODO: 社交平台', href: 'https://example.com/TODO', handle: null },
    { label: 'Email', href: 'mailto:todo@example.com', handle: 'todo@example.com' },
  ],
} satisfies Profile

export const nav = [
  { label: '首页', to: '/' },
  { label: '项目', to: '/projects' },
  { label: '关于', to: '/about' },
] satisfies NavItem[]

export const sections = {
  featuredProjects: {
    eyebrow: 'Selected Work',
    title: '精选项目',
    description: 'TODO: 一句话说明你挑选这几个项目的标准，如「能体现从 0 到 1 与规模化演进的项目」。',
  },
  aboutSummary: {
    eyebrow: 'About',
    title: '关于我',
    description: 'TODO: 一句整体概括，与 /about 页正文呼应但不重复。',
  },
  skills: {
    eyebrow: 'Capabilities',
    title: '技术能力',
    description: 'TODO: 说明你的技术栈倾向，以及最擅长的一两类工作。',
  },
  experience: {
    eyebrow: 'Experience',
    title: '工作经历',
    description: 'TODO: 可写「按时间倒序，只保留与你目标岗位相关的经历」。',
  },
  contact: {
    eyebrow: 'Contact',
    title: '合作与联系',
    description: 'TODO: 说明你希望收到什么样的联系，如「全职机会、技术咨询、开源协作」。',
  },
  projectsIndex: {
    eyebrow: 'All Projects',
    title: '全部项目',
    description: 'TODO: 说明这里的项目范围，如「含个人项目与可公开的项目复盘」。',
  },
  projectDetail: {
    eyebrow: 'Case Study',
    title: '项目详情',
    description: '',
  },
} satisfies Record<string, SectionCopy>

export const skillGroups = [
  {
    title: 'TODO: 分组名，如「语言与框架」',
    description: null,
    items: ['TODO: 技能', 'TODO: 技能', 'TODO: 技能', 'TODO: 技能'],
  },
  {
    title: 'TODO: 分组名，如「工程化与质量」',
    description: 'TODO: 可选的分组说明，说明你在这方面的具体做法。',
    items: ['TODO: 技能', 'TODO: 技能', 'TODO: 技能'],
  },
  {
    title: 'TODO: 分组名，如「可视化与交互」',
    description: null,
    items: ['TODO: 技能', 'TODO: 技能', 'TODO: 技能'],
  },
  {
    title: 'TODO: 分组名，如「协作与流程」',
    description: null,
    items: ['TODO: 技能', 'TODO: 技能'],
  },
] satisfies SkillGroup[]

export const experiences = [
  {
    kind: 'work',
    period: 'TODO: 2023.04 — 至今',
    role: 'TODO: 职位名称',
    organization: 'TODO: 公司名称',
    summary: 'TODO: 一句话说明你负责的业务范围与团队规模。',
    highlights: [
      'TODO: 一条可量化的成果，如「将首屏 LCP 从 3.2s 降到 1.4s」。',
      'TODO: 一条体现职责范围的事，如「主导 4 人小组完成组件库迁移」。',
      'TODO: 一条技术决策，说清为什么这么做。',
    ],
    techStack: ['TODO', 'TODO', 'TODO'],
  },
  {
    kind: 'work',
    period: 'TODO: 2021.07 — 2023.03',
    role: 'TODO: 职位名称',
    organization: 'TODO: 公司名称',
    summary: 'TODO: 一句话说明团队与业务背景。',
    highlights: [
      'TODO: 主要产出，尽量带数字。',
      'TODO: 你解决的难点问题。',
    ],
    techStack: ['TODO', 'TODO'],
  },
  {
    kind: 'education',
    period: 'TODO: 2017.09 — 2021.06',
    role: 'TODO: 学位与专业',
    organization: 'TODO: 学校名称',
    summary: 'TODO: 一句话，可选写相关课程、竞赛或毕设方向。',
    highlights: [],
    techStack: [],
  },
] satisfies ExperienceItem[]
