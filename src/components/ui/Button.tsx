import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

const variantClass = {
  primary: 'bg-brand-600 text-white shadow-card hover:bg-brand-700 active:bg-brand-800',
  secondary:
    'border border-line-strong bg-surface text-ink-800 hover:border-ink-400 hover:bg-ink-50',
  ghost: 'text-brand-700 hover:bg-brand-50',
} as const

const sizeClass = {
  sm: 'h-9 gap-1.5 px-4 text-sm',
  md: 'h-11 gap-2 px-5 text-[0.95rem]',
} as const

interface ButtonBase {
  variant?: keyof typeof variantClass
  size?: keyof typeof sizeClass
  className?: string
  children: ReactNode
}

/**
 * 三态按钮：站内跳转 / 站外链接 / 点击事件。
 * 用判别联合而不是 polymorphic `as` 泛型 —— 后者在 TS 里需要大量类型体操，
 * 调用处体验并不会更好。
 */
export type ButtonProps =
  | (ButtonBase & { to: string })
  | (ButtonBase & { href: string; external?: boolean })
  | (ButtonBase & { type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean })

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50',
    variantClass[variant],
    sizeClass[size],
    className,
  )

  if ('to' in props) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  if ('href' in props) {
    const externalProps = props.external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <a href={props.href} className={classes} {...externalProps}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {children}
    </button>
  )
}
