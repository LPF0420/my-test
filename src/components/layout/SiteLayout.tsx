import { Outlet } from 'react-router'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { ScrollManager } from './ScrollManager'

export function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* header 的 sticky 状态由这个 1px 哨兵是否离开视口决定 */}
      <div id="top-sentinel" aria-hidden="true" className="h-px w-full" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        跳到主内容
      </a>

      <SiteHeader />

      {/* tabIndex=-1 供路由切换后程序化聚焦，outline-none 由全局 focus-visible 规则接管 */}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <SiteFooter />
      <ScrollManager />
    </div>
  )
}
