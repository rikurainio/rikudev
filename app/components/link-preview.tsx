'use client'

import { useEffect, useRef, useState } from 'react'
import { SmartPopover } from './smart-popover'

interface LinkPreviewProps {
  children: React.ReactNode
  href: string
  className?: string
  previewImage?: string
  previewText?: string
  initialPreviewData?: PreviewData
}

interface PreviewData {
  title?: string
  description?: string
  image?: string
  url: string
}

// --- NEW COMPONENT: LinkPreview ---
// This component handles the hover state and uses SmartPopover to position the preview
export const LinkPreview = ({
  children,
  href,
  className,
  previewImage,
  previewText,
  initialPreviewData,
}: LinkPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLAnchorElement | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [previewData, setPreviewData] = useState<PreviewData | null>(initialPreviewData ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update local preview data when preloaded data changes
  useEffect(() => {
    if (initialPreviewData) {
      setPreviewData(initialPreviewData)
    }
  }, [initialPreviewData])

  // Detect desktop (non-touch) to disable hover previews on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(pointer: fine) and (min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)

    update()
    mq.addEventListener('change', update)

    return () => mq.removeEventListener('change', update)
  }, [])

  const fetchPreview = async (url: string) => {
    // Only fetch for http/https URLs
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)
      if (response.ok) {
        const data = await response.json()
        setPreviewData(data)
      }
    } catch (error) {
      console.error('Failed to fetch preview:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMouseEnter = () => {
    if (!isDesktop) return
    if (!triggerRef.current) return

    setIsOpen(true)

    // Fetch preview with a small delay to avoid unnecessary requests
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current)
    }
    fetchTimeoutRef.current = setTimeout(() => {
      if (!previewData && (href.startsWith('http://') || href.startsWith('https://'))) {
        fetchPreview(href)
      }
    }, 300) // 300ms delay
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current)
    }
    // Reset transient states when closing
    setImageError(false)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
    }
  }, [])

  const shouldShowPreview =
    isMounted && isOpen && (isLoading || (previewData && (previewData.title || previewData.image)) || previewImage)

  // On mobile/touch, just render a normal link without hover preview
  if (!isDesktop) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <a
        ref={triggerRef}
        href={href}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>

      {/* Only show preview if we have meaningful data (title or image) or are still loading */}
      {shouldShowPreview && triggerRef.current && (
        <SmartPopover anchorRef={triggerRef} isOpen={isOpen}>
          {({ placement }) => (
            <div className="animate-in fade-in zoom-in-95 duration-200 flex flex-col">
              {/* When the popover is below the link, show the arrow on top of the card (pointing up) */}
              {placement === 'bottom' && (
                <div className="w-full flex justify-center mb-1">
                  <div className="w-3 h-3 bg-white border-t border-l border-zinc-200 transform rotate-45 translate-y-[50%]" />
                </div>
              )}

              <div className="bg-white rounded-sm shadow-xl border border-zinc-200 p-2 w-[280px] flex flex-col gap-2">
                {/* Image Preview Area */}
                <div className="relative w-full aspect-video bg-zinc-100 rounded-sm overflow-hidden border border-zinc-100">
                  {isLoading ? (
                    <div className="w-full h-full bg-zinc-50 flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
                    </div>
                  ) : (previewData?.image || previewImage) && !imageError ? (
                    <img
                      src={previewData?.image || previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    // Fallback for when no image is provided or image failed to load
                    <div className="w-full h-full bg-zinc-50 flex flex-col items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      </div>
                      <span className="text-zinc-400 text-xs font-mono">
                        {href.replace(/^https?:\/\//, '')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Text Meta Data */}
                <div className="px-1 pb-1">
                  <p className="text-sm font-bold text-zinc-900 truncate">
                    {previewData?.title || previewText || children}
                  </p>
                  {previewData?.description && (
                    <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5">{previewData.description}</p>
                  )}
                  <p className="text-[11px] text-zinc-500 truncate font-mono mt-0.5">{href}</p>
                </div>
              </div>

              {/* When the popover is above the link, show the arrow below the card (pointing down) */}
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