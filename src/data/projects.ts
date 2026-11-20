import type { Project } from './types'

/**
 * 项目列表。首页只展示 `featured: true` 的前三个，/projects 展示全部。
 *
 * 这里用显式 `Project[]` 标注而不是 `satisfies`：空数组字段（tags: []）在
 * satisfies 下会被推断成 never[]，导致 filter 里 tags.includes() 报错。
 * 显式标注同样能在漏字段时立即报错。
 *
 * 这 3 条占位数据刻意覆盖了不同形态，方便你看出各分支的渲染效果：
 *   1. 有封面 + 有图集 + 有指标 + 多链接
 *   2. 无封面（走占位块）+ 无图集 + 无指标
 *   3. 有封面 + 无图集 + 标签为空
 * 填真实项目时，把不需要的可选内容留成空数组 / null 即可，界面会自动收起对应区块。
 */
export const projects: Project[] = [
  {
    slug: 'todo-project-one',
    title: 'TODO: 项目一标题',
    summary:
      'TODO: 一句话说清这个项目解决了什么问题、你的角色是什么。控制在 40–60 字，卡片上只显示两行。',
    role: 'TODO: 你的角色，如「前端负责人」',
    year: 'TODO: 2025',
    tags: ['TODO: 标签 1', 'TODO: 标签 2', 'TODO: 标签 3'],
    status: 'shipped',
    featured: true,
    coverImage: '/projects/cover-1.svg',
    coverAlt: 'TODO: 描述封面图内容，供读屏软件朗读',
    links: [
      { label: '在线演示', href: 'https://example.com', type: 'demo' },
      { label: '源码仓库', href: 'https://github.com/TODO', type: 'repo' },
    ],
    metrics: [
      { label: 'TODO: 指标名 1', value: 'TODO' },
      { label: 'TODO: 指标名 2', value: 'TODO' },
      { label: 'TODO: 指标名 3', value: 'TODO' },
    ],
    overview: [
      'TODO: 背景 —— 这个项目为什么存在？原来的方案差在哪？读者需要先理解上下文，才会关心你的技术选择。',
      'TODO: 我的职责 —— 你负责哪部分，团队多大，有没有协作方。',
      'TODO: 结果 —— 上线后发生了什么变化，用数字说话。',
    ],
    highlights: [
      'TODO: 一个关键技术决策，以及你当时的取舍理由。',
      'TODO: 一个你亲手解决的难点，说明卡在哪、怎么定位、最后怎么解。',
      'TODO: 一个可量化的结果。',
    ],
    techStack: ['TODO', 'TODO', 'TODO', 'TODO'],
    gallery: [
      {
        src: '/projects/gallery-1.svg',
        alt: 'TODO: 描述这张图，如「工作台主界面」',
        caption: 'TODO: 图注，说明这张图要展示什么',
      },
      {
        src: '/projects/gallery-2.svg',
        alt: 'TODO: 描述这张图',
        caption: null,
      },
    ],
  },
  {
    slug: 'todo-project-two',
    title: 'TODO: 项目二标题（无封面示例）',
    summary:
      'TODO: 这条数据故意没有封面图，用来检查占位块效果。真实项目如果没有合适的截图，也可以留空。',
    role: 'TODO: 你的角色',
    year: 'TODO: 2024',
    tags: ['TODO: 标签 1', 'TODO: 标签 2'],
    status: 'in-progress',
    featured: true,
    coverImage: null,
    coverAlt: '',
    links: [{ label: '源码仓库', href: 'https://github.com/TODO', type: 'repo' }],
    metrics: [],
    overview: [
      'TODO: 背景与目标。',
      'TODO: 你的职责与关键决策。',
    ],
    highlights: [
      'TODO: 一条进展或成果。',
      'TODO: 一条技术要点。',
    ],
    techStack: ['TODO', 'TODO', 'TODO'],
    gallery: [],
  },
  {
    slug: 'todo-project-three',
    title: 'TODO: 项目三标题（无标签示例）',
    summary:
      'TODO: 这条数据没有标签，用来检查标签为空时卡片布局是否仍然对齐。',
    role: 'TODO: 你的角色',
    year: 'TODO: 2023',
    tags: [],
    status: 'concept',
    featured: true,
    coverImage: '/projects/cover-2.svg',
    coverAlt: 'TODO: 描述封面图内容',
    links: [{ label: '设计稿', href: 'https://example.com', type: 'other' }],
    metrics: [
      { label: 'TODO: 指标名 1', value: 'TODO' },
      { label: 'TODO: 指标名 2', value: 'TODO' },
    ],
    overview: ['TODO: 背景与目标。', 'TODO: 你的职责与关键决策。'],
    highlights: ['TODO: 一条要点。'],
    techStack: ['TODO', 'TODO'],
    gallery: [],
  },
]
