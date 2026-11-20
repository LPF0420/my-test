import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { nav, profile, site } from '@/data/content'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-ink-900">{profile.name}</p>
            <p className="mt-1.5 text-sm text-ink-600">{profile.headline}</p>
          </div>
          <nav aria-label="页脚导航" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-ink-600 transition-colors hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <SocialLinks links={profile.socials} />

        <div className="flex flex-col gap-1.5 border-t border-line pt-6 text-xs text-ink-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>使用 React · TypeScript · Tailwind CSS 构建</p>
        </div>
      </Container>
    </footer>
  )
}
