import type { SocialLink } from '@/data/types'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

interface SocialLinksProps {
  links: SocialLink[]
  showHandle?: boolean
  className?: string
}

/** 空数组时不渲染任何容器，避免页面出现空 ul */
export function SocialLinks({ links, showHandle = true, className }: SocialLinksProps) {
  if (links.length === 0) {
    return null
  }

  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {links.map((link) => {
        const isExternal = link.href.startsWith('http')
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="group inline-flex items-center gap-1.5 text-sm text-ink-600 transition-colors duration-150 hover:text-brand-700"
            >
              <span className="font-medium">{link.label}</span>
              {showHandle && link.handle ? (
                <span className="text-ink-600">{link.handle}</span>
              ) : null}
              {isExternal ? (
                <Icon
                  name="arrow-up-right"
                  size={13}
                  className="text-ink-400 transition-colors duration-150 group-hover:text-brand-600"
                />
              ) : null}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
