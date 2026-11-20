import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SocialLinks } from '@/components/ui/SocialLinks'
import { profile } from '@/data/content'

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-canvas">
      {/* 极淡的顶部渐变，只用来把 Hero 与页面其余部分区分开，不抢文字注意力 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-gradient-to-b from-brand-50/80 to-transparent"
      />

      <Container className="relative pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-24">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-6 lg:col-span-7">
            {profile.availability ? (
              <div>
                <Badge tone="success">{profile.availability}</Badge>
              </div>
            ) : null}

            <div>
              <h1 id="hero-title" className="text-display font-semibold">
                {profile.name}
              </h1>
              <p className="mt-4 text-lead font-medium text-brand-700">{profile.headline}</p>
            </div>

            <p className="max-w-[32em] text-ink-600">{profile.subheadline}</p>

            <div className="flex flex-wrap items-center gap-3">
              <Button to="/projects">
                查看项目
                <Icon name="arrow-right" />
              </Button>
              {profile.resumeUrl ? (
                <Button href={profile.resumeUrl} external variant="secondary">
                  <Icon name="download" />
                  下载简历
                </Button>
              ) : null}
            </div>

            <SocialLinks links={profile.socials} className="pt-1" />
          </div>

          {/* 移动端单列时头像排到最前，否则会孤零零地夹在简介和 facts 之间 */}
          <div className="order-first flex justify-center lg:order-none lg:col-span-5 lg:justify-end">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2.5 rounded-full bg-brand-50 sm:-inset-3 lg:-inset-4"
              />
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.name} 的头像`}
                  fetchPriority="high"
                  className="relative size-28 rounded-full object-cover ring-1 ring-line sm:size-36 lg:size-60"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="relative flex size-28 items-center justify-center rounded-full bg-brand-100 ring-1 ring-brand-200 sm:size-36 lg:size-60"
                >
                  <span className="text-2xl font-semibold text-brand-700 sm:text-3xl lg:text-6xl">
                    {profile.initials}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {profile.facts.length > 0 ? (
          <dl className="mt-14 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
            {profile.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-medium tracking-wide text-ink-600">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-h3 font-semibold text-ink-900">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </section>
  )
}
