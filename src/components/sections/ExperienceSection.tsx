import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experiences, sections } from '@/data/content'

export function ExperienceSection() {
  if (experiences.length === 0) {
    return null
  }

  return (
    <Section id="experience" labelledBy="experience-title" tone="surface">
      <Container>
        <SectionHeading id="experience-title" {...sections.experience} />

        <ol className="mt-12 flex flex-col gap-10 border-l border-line pl-6 sm:pl-8">
          {experiences.map((item, index) => (
            <li key={`${item.period}-${index}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-6 size-2.5 -translate-x-1/2 rounded-full bg-brand-500 ring-4 ring-surface sm:-left-8"
              />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="text-xs font-medium tracking-[0.12em] text-ink-600 uppercase">
                  {item.period}
                </p>
                <Badge tone="neutral">{item.kind === 'work' ? '工作' : '教育'}</Badge>
              </div>

              <h3 className="mt-2 text-h3 font-semibold">{item.role}</h3>
              <p className="mt-0.5 text-sm font-medium text-brand-700">{item.organization}</p>
              <p className="mt-3 max-w-[40em] text-ink-700">{item.summary}</p>

              {item.highlights.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-2">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li
                      key={`${highlightIndex}-${highlight.slice(0, 8)}`}
                      className="flex gap-2.5 text-sm text-ink-600"
                    >
                      <Icon name="check" size={16} className="mt-0.5 text-brand-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.techStack.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="使用的技术">
                  {item.techStack.map((tech, techIndex) => (
                    <li key={`${tech}-${techIndex}`}>
                      <Badge tone="brand">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
