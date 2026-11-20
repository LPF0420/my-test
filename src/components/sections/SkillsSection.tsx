import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sections, skillGroups } from '@/data/content'

interface SkillsSectionProps {
  /** 首页只要标题和标签，关于页可以显示分组说明 */
  showDescription?: boolean
}

export function SkillsSection({ showDescription = true }: SkillsSectionProps) {
  if (skillGroups.length === 0) {
    return null
  }

  return (
    <Section id="skills" labelledBy="skills-title" tone="canvas">
      <Container>
        <SectionHeading id="skills-title" {...sections.skills} />

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <li key={group.title} className="rounded-card border border-line bg-surface p-6">
              <h3 className="text-h3 font-semibold">{group.title}</h3>
              {showDescription && group.description ? (
                <p className="mt-2 text-sm text-ink-600">{group.description}</p>
              ) : null}
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <Badge tone="neutral">{item}</Badge>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
