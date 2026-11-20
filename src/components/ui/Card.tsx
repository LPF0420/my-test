import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  as?: 'div' | 'article' | 'li'
  /** 仅添加 hover 视觉反馈，不含跳转行为（跳转由内部 Link 承担） */
  interactive?: boolean
  className?: string
  children: ReactNode
}

export function Card({ as: Tag = 'div', interactive = false, className, children }: CardProps) {
  return (
    <Tag
      className={cn(
        'relative rounded-card border border-line bg-surface shadow-card',
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
