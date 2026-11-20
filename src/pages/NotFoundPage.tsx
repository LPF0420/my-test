import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { site } from '@/data/content'
import { usePageMeta } from '@/lib/seo'

export function NotFoundPage() {
  usePageMeta({
    title: `页面不存在 — ${site.name}`,
    description: '请求的页面不存在，可能链接已失效或地址拼写有误。',
    noindex: true,
  })

  return (
    <Section spacing="lg" className="flex min-h-[60vh] items-center">
      <Container size="narrow" className="flex flex-col items-center text-center">
        <p className="text-xs font-semibold tracking-[0.24em] text-brand-600 uppercase">404</p>
        <h1 className="mt-4 text-display font-semibold">这个页面不存在</h1>
        <p className="mt-4 max-w-[32em] text-ink-600">
          链接可能已经失效，或者地址拼写有误。你可以回到首页，或直接浏览全部项目。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">回到首页</Button>
          <Button to="/projects" variant="secondary">
            浏览项目
          </Button>
        </div>
      </Container>
    </Section>
  )
}
