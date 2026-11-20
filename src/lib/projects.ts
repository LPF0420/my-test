import { projects } from '@/data/projects'
import type { Project } from '@/data/types'

/** slug 只允许小写字母、数字和单连字符，保证 URL 干净且大小写不敏感 */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((project) => project.featured).slice(0, limit)
}

/** 所有项目的标签去重，按中文拼音顺序排序（依赖 ICU，浏览器均已支持） */
export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const project of projects) {
    for (const tag of project.tags) {
      tags.add(tag)
    }
  }
  return [...tags].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}

/** tag 为 null 时返回全部，避免在组件里写两套分支 */
export function filterProjectsByTag(tag: string | null): Project[] {
  if (tag === null) {
    return projects
  }
  return projects.filter((project) => project.tags.includes(tag))
}

/**
 * 仅开发环境执行的数据校验。生产构建时整个代码块会被 tree-shake 掉。
 * 目标是让填写内容时的低级错误立刻暴露，而不是上线后才发现某个项目打不开。
 */
if (import.meta.env.DEV) {
  const seen = new Set<string>()
  for (const project of projects) {
    if (!SLUG_PATTERN.test(project.slug)) {
      console.error(
        `[content] 项目 slug "${project.slug}" 不合法：只能用小写字母、数字和单连字符，例如 my-project。`,
      )
    }
    if (seen.has(project.slug)) {
      console.error(`[content] 项目 slug "${project.slug}" 重复，详情页会互相覆盖。`)
    }
    seen.add(project.slug)

    if (project.coverImage !== null && project.coverAlt.trim() === '') {
      console.error(`[content] 项目 "${project.slug}" 有封面图但 coverAlt 为空，会影响无障碍。`)
    }
  }

  if (getFeaturedProjects(3).length === 0) {
    console.warn('[content] 没有任何 featured: true 的项目，首页精选区块会显示空状态。')
  }
}
