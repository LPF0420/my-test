import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  /** 与 Section 的 labelledBy 对应 */
  id?: string
  eyebrow?: string
  title: string
  description?: string
  as?: 'h1' | 'h2'
  align?: 'left' | 'center'
  /** 右侧操作区，如「查看全部项目」链接 */
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  align = 'left',
  action,
  className,
}: SectionHeadingProps) {
  // 标题为空时整块不渲染，避免页面里出现空 h2 干扰读屏大纲
  if (title.trim() === '') {
    return null
  }

  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        !centered && action ? 'sm:flex-row sm:items-end sm:justify-between' : false,
        centered && 'items-center text-center',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-3', centered && 'items-center')}>
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <Heading
          id={id}
          className={cn(
            'font-semibold',
            Heading === 'h1' ? 'text-display' : 'text-h2',
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p className={cn('max-w-[40em] text-ink-600', centered && 'mx-auto')}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
