import { Link, useParams } from 'react-router'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { ProjectCover } from '@/components/ui/ProjectCover'
import { Section } from '@/components/ui/Section'
import { site } from '@/data/content'
import type { Project } from '@/data/types'
import { getProjectBySlug } from '@/lib/projects'
import { STATUS_LABEL, STATUS_TONE } from '@/lib/projectStatus'
import { usePageMeta } from '@/lib/seo'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug === undefined ? undefined : getProjectBySlug(slug)

  // 找不到时原地渲染 404，保留原始 URL —— 用户能看清自己访问的地址有误
  if (!project) {
    return <NotFoundPage />
  }

  return <ProjectDetailView project={project} />
}

function ProjectDetailView({ project }: { project: Project }) {
  usePageMeta({
    title: `${project.title} — ${site.name}`,
    description: project.summary,
  })

  return (
    <article>
      <Section spacing="sm" className="pb-0">
        <Container size="narrow">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-ink-600 transition-colors hover:text-brand-700"
          >
            <Icon name="arrow-right" className="rotate-180" />
            返回全部项目
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone={STATUS_TONE[project.status]}>{STATUS_LABEL[project.status]}</Badge>
            <p className="text-sm text-ink-600">
              {project.year} · {project.role}
            </p>
          </div>

          <h1 className="mt-3 text-display font-semibold">{project.title}</h1>
          <p className="mt-4 max-w-[36em] text-lead text-ink-600">{project.summary}</p>

          {project.links.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link, index) => (
                <Button
                  key={`${link.href}-${index}`}
                  href={link.href}
                  external
                  variant={index === 0 ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {link.label}
                  <Icon name="arrow-up-right" size={15} />
                </Button>
              ))}
            </div>
          ) : null}
        </Container>
      </Section>

      <Section spacing="sm" tone="canvas">
        <Container size="narrow">
          <ProjectCover src={project.coverImage} alt={project.coverAlt} radius="all" />

          {project.metrics.length > 0 ? (
            <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {project.metrics.map((metric, index) => (
                <div
                  key={`${metric.label}-${index}`}
                  className="rounded-card border border-line bg-surface px-5 py-4"
                >
                  <dt className="text-xs text-ink-600">{metric.label}</dt>
                  <dd className="mt-1 text-h3 font-semibold text-ink-900">{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="narrow">
          <div className="flex flex-col gap-12">
            {project.overview.length > 0 ? (
              <section aria-labelledby="overview-title">
                <h2 id="overview-title" className="text-h2 font-semibold">
                  项目概述
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {project.overview.map((paragraph, index) => (
                    <p key={`${index}-${paragraph.slice(0, 8)}`} className="text-ink-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ) : null}

            {project.highlights.length > 0 ? (
              <section aria-labelledby="highlights-title">
                <h2 id="highlights-title" className="text-h2 font-semibold">
                  关键要点
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.highlights.map((highlight, index) => (
                    <li
                      key={`${index}-${highlight.slice(0, 8)}`}
                      className="flex gap-3 text-ink-700"
                    >
                      <Icon name="check" size={18} className="mt-1 text-brand-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {project.techStack.length > 0 ? (
              <section aria-labelledby="stack-title">
                <h2 id="stack-title" className="text-h2 font-semibold">
                  技术栈
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <li key={`${tech}-${index}`}>
                      <Badge tone="brand">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </Container>
      </Section>

      {project.gallery.length > 0 ? (
        <Section spacing="md" tone="surface" labelledBy="gallery-title">
          <Container size="narrow">
            <h2 id="gallery-title" className="text-h2 font-semibold">
              界面与细节
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.gallery.map((item, index) => (
                <li key={`${index}-${item.src}`}>
                  <figure>
                    <div className="overflow-hidden rounded-card border border-line bg-ink-100">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {item.caption ? (
                      <figcaption className="mt-2 text-sm text-ink-600">{item.caption}</figcaption>
                    ) : null}
                  </figure>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section spacing="sm">
        <Container size="narrow">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <p className="text-sm text-ink-600">想看更多项目？</p>
            <Button to="/projects" variant="secondary" size="sm">
              全部项目
              <Icon name="arrow-right" size={15} />
            </Button>
          </div>
        </Container>
      </Section>
    </article>
  )
}
