'use client'

import { useEffect, useRef, useState } from 'react'

type Placement = 'top' | 'bottom'

interface SmartPopoverProps {
  anchorRef: React.RefObject<HTMLElement | null>
  isOpen: boolean
  offset?: number
  children: (props: { placement: Placement }) => React.ReactNode
}

export function SmartPopover({
  anchorRef,
  isOpen,
  offset = 10,
  children,
}: SmartPopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const [style, setStyle] = useState<React.CSSProperties | undefined>()
  const [placement, setPlacement] = useState<Placement>('top')
  const [isPositioned, setIsPositioned] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    if (typeof window === 'undefined') return

    // Reset positioned flag when (re)opening
    setIsPositioned(false)

    const updatePosition = () => {
      const anchorEl = anchorRef.current
      const popEl = popoverRef.current
      if (!anchorEl || !popEl) return

      const anchorRect = anchorEl.getBoundingClientRect()
      const popRect = popEl.getBoundingClientRect()

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const spaceAbove = anchorRect.top
      const spaceBelow = viewportHeight - anchorRect.bottom

      let nextPlacement: Placement = 'top'
      if (spaceBelow >= popRect.height || spaceBelow >= spaceAbove) {
        nextPlacement = 'bottom'
      } else {
        nextPlacement = 'top'
      }

      let top: number
      if (nextPlacement === 'top') {
        top = anchorRect.top - popRect.height - offset
        top = Math.max(8, top)
      } else {
        top = anchorRect.bottom + offset
        top = Math.min(top, viewportHeight - popRect.height - 8)
      }

      let left = anchorRect.left + anchorRect.width / 2 - popRect.width / 2
      left = Math.max(8, Math.min(left, viewportWidth - popRect.width - 8))

      setPlacement(nextPlacement)
      setStyle({
        position: 'fixed',
        top,
        left,
        zIndex: 50,
        pointerEvents: 'none',
      })
      setIsPositioned(true)
    }

    // Use rAF to ensure layout has settled before measurement
    const frame = requestAnimationFrame(updatePosition)

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [anchorRef, isOpen, offset])

  if (!isOpen) return null

  return (
    <div
      ref={popoverRef}
      style={{
        ...style,
        visibility: isPositioned ? 'visible' : 'hidden',
      }}
      className="fixed z-50 pointer-events-none"
    >
      {children({ placement })}
    </div>
  )
}


