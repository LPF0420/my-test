import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const spacingClass = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-28 lg:py-32',
} as const

const toneClass = {
  canvas: 'bg-canvas',
  surface: 'bg-surface',
  brand: 'bg-brand-50/70',
} as const

interface SectionProps {
  id?: string
  /** 与 SectionHeading 的 id 对应，让读屏软件能播报区块标题 */
  labelledBy?: string
  tone?: keyof typeof toneClass
  spacing?: keyof typeof spacingClass
  className?: string
  children: ReactNode
}

export function Section({
  id,
  labelledBy,
  tone = 'canvas',
  spacing = 'md',
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(spacingClass[spacing], toneClass[tone], className)}
    >
      {children}
    </section>
  )
}
