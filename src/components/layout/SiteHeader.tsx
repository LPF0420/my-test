import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { nav, profile } from '@/data/content'
import { cn } from '@/lib/cn'

export function SiteHeader() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  // 记录「在哪个路径下打开的菜单」，路由一变 menuOpen 自动失效，
  // 比在 effect 里 setState(false) 少一次级联渲染
  const [openPath, setOpenPath] = useState<string | null>(null)
  const menuOpen = openPath === pathname

  const toggleMenu = () => {
    setOpenPath(menuOpen ? null : pathname)
  }

  // 用 sentinel + IntersectionObserver 代替 scroll 事件监听，避免滚动时反复触发布局计算
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) {
      return
    }
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setScrolled(!entry.isIntersecting)
      }
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPath(null)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled ? 'border-line bg-canvas/85 backdrop-blur' : 'border-transparent bg-canvas',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="rounded-sm text-[0.95rem] font-semibold tracking-tight text-ink-900 transition-colors hover:text-brand-700"
        >
          {profile.name}
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-2 text-sm transition-colors duration-150',
                  isActive
                    ? 'font-medium text-ink-900'
                    : 'text-ink-600 hover:text-ink-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button to="/#contact" size="sm" className="ml-3">
            联系我
          </Button>
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-surface text-ink-700 transition-colors hover:border-ink-400 md:hidden"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
        </button>
      </Container>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="animate-[slide-down_150ms_ease-out] border-t border-line bg-surface md:hidden"
        >
          <Container className="flex flex-col py-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-2 py-3 text-sm transition-colors',
                    isActive
                      ? 'font-medium text-ink-900'
                      : 'text-ink-600 hover:text-ink-900',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button to="/#contact" size="sm" className="mt-2 self-start">
              联系我
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
