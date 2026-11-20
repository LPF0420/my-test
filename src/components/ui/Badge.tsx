import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const toneClass = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-200',
  neutral: 'bg-ink-100 text-ink-700 ring-ink-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  danger: 'bg-rose-50 text-rose-700 ring-rose-200',
} as const

interface BadgeProps {
  tone?: keyof typeof toneClass
  className?: string
  children: ReactNode
}

export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
