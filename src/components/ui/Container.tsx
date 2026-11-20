import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const sizeClass = {
  narrow: 'max-w-narrow',
  default: 'max-w-content',
  wide: 'max-w-[86rem]',
} as const

interface ContainerProps {
  size?: keyof typeof sizeClass
  className?: string
  children: ReactNode
}

/** 全站唯一的水平内边距来源，改版式只改这里 */
export function Container({ size = 'default', className, children }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', sizeClass[size], className)}>
      {children}
    </div>
  )
}
