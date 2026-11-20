import { Link } from 'react-router'
import type { Project } from '@/data/types'
import { cn } from '@/lib/cn'
import { STATUS_LABEL, STATUS_TONE } from '@/lib/projectStatus'
import { Badge } from './Badge'
import { Card } from './Card'
import { ProjectCover } from './ProjectCover'

interface ProjectCardProps {
  project: Project
  /** 列表页需要显示状态，首页精选可以更干净 */
  showStatus?: boolean
  className?: string
}

export function ProjectCard({ project, showStatus = true, className }: ProjectCardProps) {
  return (
    <Card as="article" interactive className={cn('group flex h-full flex-col overflow-hidden', className)}>
      <ProjectCover src={project.coverImage} alt={project.coverAlt} radius="none" />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs text-ink-600">
          <span className="shrink-0">{project.year}</span>
          <span aria-hidden="true" className="shrink-0">
            ·
          </span>
          {/* role 可能很长，truncate 保证状态徽标不被挤到下一行 */}
          <span className="min-w-0 flex-1 truncate">{project.role}</span>
          {showStatus ? (
            <Badge tone={STATUS_TONE[project.status]} className="shrink-0">
              {STATUS_LABEL[project.status]}
            </Badge>
          ) : null}
        </div>

        <h3 className="text-h3 font-semibold">
          {/* stretched link：整张卡片可点，但 DOM 里只有一个 <a>，不会出现嵌套链接 */}
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-brand-700"
          >
            {project.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm text-ink-600">{project.summary}</p>

        {project.tags.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="项目标签">
            {project.tags.map((tag, index) => (
              <li key={`${tag}-${index}`}>
                <Badge tone="neutral">{tag}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Card>
  )
}
