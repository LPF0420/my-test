import { cn } from '@/lib/cn'

const radiusClass = {
  none: '',
  top: 'rounded-t-card',
  all: 'rounded-card',
} as const

interface ProjectCoverProps {
  src: string | null
  alt: string
  radius?: keyof typeof radiusClass
  className?: string
}

/**
 * 固定 16:10 比例，保证无图/有图两种情况下卡片高度一致，避免 CLS。
 * 无封面时渲染占位块，而不是让 img 加载失败显示破图。
 */
export function ProjectCover({ src, alt, radius = 'top', className }: ProjectCoverProps) {
  if (src === null) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-brand-100/70 via-ink-100 to-ink-50',
          radiusClass[radius],
          className,
        )}
      >
        <span className="text-[0.7rem] font-medium tracking-[0.18em] text-ink-600 uppercase">
          暂无封面
        </span>
      </div>
    )
  }

  return (
    <div className={cn('aspect-[16/10] overflow-hidden bg-ink-100', radiusClass[radius], className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  )
}
