import { useState } from 'react'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sections, site } from '@/data/content'
import { filterProjectsByTag, getAllTags } from '@/lib/projects'
import { cn } from '@/lib/cn'
import { usePageMeta } from '@/lib/seo'

export function ProjectsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const tags = getAllTags()
  const visibleProjects = filterProjectsByTag(activeTag)

  usePageMeta({
    title: `全部项目 — ${site.name}`,
    description: sections.projectsIndex.description,
  })

  return (
    <Section spacing="md">
      <Container>
        <SectionHeading id="projects-title" as="h1" {...sections.projectsIndex} />

        {tags.length > 0 ? (
          <div
            role="group"
            aria-label="按标签筛选项目"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <FilterButton active={activeTag === null} onClick={() => setActiveTag(null)}>
              全部
            </FilterButton>
            {tags.map((tag) => (
              <FilterButton
                key={tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              >
                {tag}
              </FilterButton>
            ))}
          </div>
        ) : null}

        <p className="mt-6 text-sm text-ink-600" aria-live="polite">
          共 {visibleProjects.length} 个项目
          {activeTag === null ? '' : `，标签「${activeTag}」`}
        </p>

        {visibleProjects.length === 0 ? (
          <p className="mt-10 rounded-card border border-dashed border-line-strong px-6 py-12 text-center text-sm text-ink-600">
            没有符合条件的项目，试试其他标签。
          </p>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <li key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}

interface FilterButtonProps {
  active: boolean
  onClick: () => void
  children: ReactNode
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'h-9 rounded-full border px-4 text-sm transition-colors duration-150',
        active
          ? 'border-brand-600 bg-brand-600 font-medium text-white'
          : 'border-line-strong bg-surface text-ink-600 hover:border-ink-400 hover:text-ink-900',
      )}
    >
      {children}
    </button>
  )
}
