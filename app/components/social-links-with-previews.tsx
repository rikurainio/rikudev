'use client'

import { useEffect, useRef, useState } from 'react'
import { LinkPreview } from './link-preview'
import { CopyButton } from './copy'
import { SmartPopover } from './smart-popover'

interface Props {
  links: Record<string, string>
  linkClassName?: string
}

interface PreviewData {
  title?: string
  description?: string
  image?: string
  url: string
}

type SocialKey = 'instagram' | 'linkedin'

const SOCIAL_PREVIEWS: Record<SocialKey, { title: string; subtitle: string; image: string }> = {
  instagram: {
    title: 'Instagram – @rikurainio',
    subtitle: 'Calisthenics, Gym',
    image: 'instagram_preview.png', // add this screenshot to /public
  },
  linkedin: {
    title: 'LinkedIn – Riku Rainio',
    subtitle: 'Experience, projects and professional background.',
    image: 'linkedin_preview.png', // add this screenshot to /public
  },
}

export function SocialLinksWithPreviews({ links, linkClassName }: Props) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [previews, setPreviews] = useState<Record<string, PreviewData>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(pointer: fine) and (min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)

    update()
    mq.addEventListener('change', update)

    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    const controller = new AbortController()

    const externalUrls = Object.values(links).filter(
      (url) => url.startsWith('http://') || url.startsWith('https://'),
    )

    async function preload() {
      const results: Record<string, PreviewData> = {}

      await Promise.all(
        externalUrls.map(async (url) => {
          try {
            const res = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`, {
              signal: controller.signal,
            })
            if (!res.ok) return
            const data = (await res.json()) as PreviewData
            results[url] = data
          } catch {
            // ignore failures; hover will just fetch on demand
          }
        }),
      )

      // Only update if we still care
      if (!controller.signal.aborted && Object.keys(results).length) {
        setPreviews((prev) => ({ ...prev, ...results }))
      }
    }

    preload()

    return () => {
      controller.abort()
    }
  }, [isDesktop, links])

  return (
    <>
      {Object.entries(links).map(([key, url]) => {
        const isEmail = url.startsWith('mailto:') || key.toLowerCase() === 'email'
        const isResumeLink = url.endsWith('.pdf') || key.toLowerCase() === 'resume'
        const isInstagram = url.includes('instagram.com')
        const isLinkedIn = url.includes('linkedin.com')

        if (isEmail) {
          const emailAddress = url.replace(/^mailto:/, '')
          return (
            <CopyButton
              key={key}
              text={emailAddress}
              contentName="Email address"
              className={linkClassName}
            >
              {key}
            </CopyButton>
          )
        }

        // Custom static preview cards for Instagram / LinkedIn (no metadata fetch)
        if (isInstagram || isLinkedIn) {
          return (
            <SocialStaticPreview
              key={key}
              href={url}
              label={key}
              className={linkClassName}
              socialKey={isInstagram ? 'instagram' : 'linkedin'}
              isDesktop={isDesktop}
            />
          )
        }

        if (isResumeLink) {
          return (
            <a
              key={key}
              href={url}
              className={linkClassName}
            >
              {key}
            </a>
          )
        }

        return (
          <LinkPreview
            key={key}
            href={url}
            className={linkClassName}
            previewText={key}
            initialPreviewData={previews[url]}
          >
            {key}
          </LinkPreview>
        )
      })}
    </>
  )
}

interface SocialStaticPreviewProps {
  href: string
  label: string
  className?: string
  socialKey: SocialKey
  isDesktop: boolean
}

function SocialStaticPreview({
  href,
  label,
  className,
  socialKey,
  isDesktop,
}: SocialStaticPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLAnchorElement | null>(null)

  const cleanedUrl = href.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const data = SOCIAL_PREVIEWS[socialKey]

  if (!isDesktop) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {label}
      </a>
    )
  }

  return (
    <>
      <a
        ref={triggerRef}
        href={href}
        className={className}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {label}
      </a>

      {isOpen && triggerRef.current && data && (
        <SmartPopover anchorRef={triggerRef} isOpen={isOpen}>
          {({ placement }) => (
            <div className="animate-in fade-in zoom-in-95 duration-200 flex flex-col">
              {placement === 'bottom' && (
                <div className="w-full flex justify-center mb-1">
                  <div className="w-3 h-3 bg-white border-t border-l border-zinc-200 transform rotate-45 translate-y-[50%]" />
                </div>
              )}

              <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-[240px] overflow-hidden">
                <div className="relative w-full h-24 bg-zinc-100">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-zinc-900 truncate">{data.title}</span>
                  <span className="text-[11px] text-zinc-500 line-clamp-2">{data.subtitle}</span>
                  <span className="text-[10px] text-zinc-400 truncate font-mono">{cleanedUrl}</span>
                </div>
              </div>

              {placement === 'top' && (
                <div className="w-full flex justify-center -mt-1">
                  <div className="w-3 h-3 bg-white border-b border-r border-zinc-200 transform rotate-45 translate-y-[-50%]" />
                </div>
              )}
            </div>
          )}
        </SmartPopover>
      )}
    </>
  )
}

