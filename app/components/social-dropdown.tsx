'use client'

import { useRef, useState } from 'react'
import { SmartPopover } from './smart-popover'
import { SocialLinksWithPreviews } from './social-links-with-previews'

interface Props {
  links: Record<string, string>
}

export function SocialDropdown({ links }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150) // Small delay to allow moving to the menu
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-sm text-[13px] font-bold transition-all cursor-pointer group/dropdown ${isOpen
          ? 'bg-zinc-100 text-zinc-950 border-zinc-100'
          : 'bg-zinc-950/50 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-500'
          }`}
      >
        <span>Connect</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zinc-950' : 'text-zinc-500 group-hover/dropdown:text-zinc-200'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <SmartPopover anchorRef={triggerRef} isOpen={isOpen} offset={6}>
        {() => (
          <div
            className="p-1 px-1.5 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col min-w-[160px] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 pointer-events-auto"
            onMouseEnter={handleMouseEnter}
          >
            <div className="px-3 py-2 mb-1 border-b border-white/5">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Connect</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <SocialLinksWithPreviews
                links={links}
                linkClassName="text-[13px] font-bold text-zinc-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xs transition-all flex items-center justify-between group/link"
              />
            </div>
          </div>
        )}
      </SmartPopover>
    </div>
  )
}
