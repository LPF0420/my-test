import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile, sections } from '@/data/content'

export function AboutSummarySection() {
  const paragraphs = profile.bio.slice(0, 2)

  return (
    <Section id="about" labelledBy="about-summary-title" tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="about-summary-title" {...sections.aboutSummary} />
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7">
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 8)}`} className="max-w-[38em] text-ink-700">
                {paragraph}
              </p>
            ))}
            <div className="pt-2">
              <Button to="/about" variant="secondary">
                了解完整经历
                <Icon name="arrow-right" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
