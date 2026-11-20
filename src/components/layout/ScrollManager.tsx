import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const MAIN_ID = 'main'

/**
 * 路由切换后的滚动与焦点管理。三件事必须一起做，否则体验会割裂：
 *   1. 新页面回到顶部；带 hash 时滚到目标并留出 sticky header 空间（见 index.css 的 scroll-margin-top）
 *   2. 焦点移交 #main，键盘与读屏用户不会停留在已卸载的旧节点上
 *   3. 关掉浏览器自身的滚动恢复，避免与 1 打架
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef(pathname)

  useLayoutEffect(() => {
    if (hash !== '') {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    // 比较上一次的 pathname 而不是「是否首渲染」：
    // StrictMode 会双跑 effect，用 ref 布尔标记会在第二次误判成路由切换，把焦点抢到 main
    if (previousPathname.current === pathname) {
      return
    }
    previousPathname.current = pathname
    document.getElementById(MAIN_ID)?.focus({ preventScroll: true })
  }, [pathname])

  return null
}
