import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '@/data/content'

interface PageMeta {
  /** 完整标题，调用方自行拼接站点名，避免隐式规则造成不一致 */
  title: string
  description: string
  /** 404 等页面设为 true，阻止搜索引擎收录 */
  noindex?: boolean
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonical(href: string | null): void {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (href === null) {
    existing?.remove()
    return
  }
  if (existing) {
    existing.href = href
    return
  }
  const link = document.createElement('link')
  link.rel = 'canonical'
  link.href = href
  document.head.append(link)
}

/**
 * 轻量级页面 meta 管理。客户端渲染下只能改已加载文档的 head，
 * 对社交平台抓取无效（它们不执行 JS）。真正的 SSR/预渲染留作后续升级项，
 * 见 README「SEO 现状」一节。
 */
export function usePageMeta({ title, description, noindex = false }: PageMeta): void {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    upsertCanonical(site.url === '' ? null : `${site.url}${pathname}`)
  }, [title, description, noindex, pathname])
}
