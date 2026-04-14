'use client'

import type { ReactNode } from 'react'
import { CopyButton } from './copy'
import { SocialLinkIcon } from './social-link-icon'

interface Props {
  links: Record<string, string>
  linkClassName?: string
}

/* Popover previews (LinkPreview, Instagram/LinkedIn cards, /api/link-preview preload) disabled for now. */

function CopyGlyph({ className }: { className?: string }) {
  /* Offset “two sheets” copy mark (Feather / Lucide style) */
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}

function LinkRow({
  linkKey,
  url,
  children,
  end = 'arrow',
}: {
  linkKey: string
  url: string
  children: ReactNode
  end?: 'arrow' | 'copy'
}) {
  const endClass =
    'shrink-0 text-zinc-600 transition-colors group-hover/link:text-zinc-400'

  return (
    <>
      <span className="flex min-w-0 items-center gap-3">
        <SocialLinkIcon linkKey={linkKey} url={url} />
        <span className="truncate">{children}</span>
      </span>
      {end === 'arrow' ? (
        <span className={endClass} aria-hidden>
          →
        </span>
      ) : (
        <CopyGlyph className={`${endClass} h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]`} />
      )}
    </>
  )
}

export function SocialLinksWithPreviews({ links, linkClassName }: Props) {
  return (
    <>
      {Object.entries(links).map(([key, url]) => {
        const isEmail = url.startsWith('mailto:') || key.toLowerCase() === 'email'

        if (isEmail) {
          const emailAddress = url.replace(/^mailto:/, '')
          return (
            <CopyButton
              key={key}
              text={emailAddress}
              contentName="Email address"
              className={linkClassName}
            >
              <LinkRow linkKey={key} url={url} end="copy">
                {key}
              </LinkRow>
            </CopyButton>
          )
        }

        const isHttp = url.startsWith('http://') || url.startsWith('https://')
        return (
          <a
            key={key}
            href={url}
            className={linkClassName}
            {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <LinkRow linkKey={key} url={url}>
              {key}
            </LinkRow>
          </a>
        )
      })}
    </>
  )
}
