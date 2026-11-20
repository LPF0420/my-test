import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { profile, sections } from '@/data/content'

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-title" tone="brand" spacing="lg">
      <Container size="narrow" className="flex flex-col items-center text-center">
        <SectionHeading id="contact-title" {...sections.contact} align="center" />

        <div className="mt-8 flex flex-col items-center gap-5">
          <Button href={`mailto:${profile.email}`} className="max-w-full">
            <span className="truncate">{profile.email}</span>
            <Icon name="arrow-up-right" />
          </Button>

          {profile.location ? <p className="text-sm text-ink-600">{profile.location}</p> : null}

          <SocialLinks
            links={profile.socials}
            showHandle={false}
            className="justify-center gap-x-6"
          />
        </div>
      </Container>
    </Section>
  )
}
