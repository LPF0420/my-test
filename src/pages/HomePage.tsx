import { AboutSummarySection } from '@/components/sections/AboutSummarySection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { profile } from '@/data/content'
import { usePageMeta } from '@/lib/seo'

export function HomePage() {
  usePageMeta({
    title: `${profile.name} — ${profile.headline}`,
    description: profile.subheadline,
  })

  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
      <AboutSummarySection />
      <ContactSection />
    </>
  )
}
