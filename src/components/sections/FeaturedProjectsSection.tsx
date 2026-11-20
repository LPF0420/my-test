import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sections } from '@/data/content'
import { getFeaturedProjects } from '@/lib/projects'

export function FeaturedProjectsSection() {
  const featured = getFeaturedProjects(3)

  return (
    <Section id="work" labelledBy="featured-work-title" tone="canvas">
      <Container>
        <SectionHeading
          id="featured-work-title"
          {...sections.featuredProjects}
          action={
            <Button to="/projects" variant="ghost" size="sm">
              全部项目
              <Icon name="arrow-right" />
            </Button>
          }
        />

        {featured.length === 0 ? (
          <p className="mt-10 rounded-card border border-dashed border-line-strong px-6 py-10 text-sm text-ink-600">
            还没有标记为精选的项目。在{' '}
            <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">src/data/projects.ts</code>{' '}
            里把某个项目的 <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">featured</code>{' '}
            设为 <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">true</code> 即可展示。
          </p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <li key={project.slug} className="h-full">
                <ProjectCard project={project} showStatus={false} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}
