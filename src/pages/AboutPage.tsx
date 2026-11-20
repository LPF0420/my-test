import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile, sections, site } from '@/data/content'
import { usePageMeta } from '@/lib/seo'

export function AboutPage() {
  usePageMeta({
    title: `关于 — ${site.name}`,
    description: sections.aboutSummary.description,
  })

  return (
    <>
      <Section spacing="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                id="about-title"
                as="h1"
                eyebrow={sections.aboutSummary.eyebrow}
                title={`关于 ${profile.name}`}
              />

              <dl className="mt-8 flex flex-col gap-4 text-sm">
                <div>
                  <dt className="text-xs font-medium tracking-wide text-ink-600">
                    所在地
                  </dt>
                  <dd className="mt-1 text-ink-800">{profile.location}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium tracking-wide text-ink-600">
                    邮箱
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-ink-800 transition-colors hover:text-brand-700"
                    >
                      {profile.email}
                    </a>
                  </dd>
                </div>
                {profile.availability ? (
                  <div>
                    <dt className="text-xs font-medium tracking-wide text-ink-600">
                      当前状态
                    </dt>
                    <dd className="mt-1 text-ink-800">{profile.availability}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <div className="flex flex-col gap-5 lg:col-span-7">
              {profile.bio.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 8)}`} className="max-w-[38em] text-ink-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <SkillsSection />
      <ExperienceSection />
    </>
  )
}
