'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Placement = 'top' | 'bottom'
type Align = 'center' | 'start' | 'end'
type PlacementPreference = 'auto' | 'bottom' | 'top'

interface SmartPopoverProps {
  anchorRef: React.RefObject<HTMLElement | null>
  isOpen: boolean
  offset?: number
  /** Horizontal alignment of the popover relative to the anchor */
  align?: Align
  /** Prefer opening below/above the anchor when there is room */
  placementPreference?: PlacementPreference
  /**
   * When opening below the anchor, use max(anchor bottom, this element's bottom)
   * so the popover clears a sticky bar (e.g. navbar) while staying aligned to the trigger horizontally.
   */
  alignBottomWithRef?: React.RefObject<HTMLElement | null>
  children: (props: { placement: Placement }) => React.ReactNode
}

export function SmartPopover({
  anchorRef,
  isOpen,
  offset = 10,
  align = 'center',
  placementPreference = 'auto',
  alignBottomWithRef,
  children,
}: SmartPopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const [style, setStyle] = useState<React.CSSProperties | undefined>()
  const [placement, setPlacement] = useState<Placement>('top')
  const [isPositioned, setIsPositioned] = useState(false)

  useLayoutEffect(() => {
    if (!isOpen) {
      setIsPositioned(false)
      setStyle(undefined)
      return
    }
    if (typeof window === 'undefined') return

    const updatePosition = () => {
      const anchorEl = anchorRef.current
      const popEl = popoverRef.current
      if (!anchorEl || !popEl) return

      const anchorRect = anchorEl.getBoundingClientRect()
      const popRect = popEl.getBoundingClientRect()

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const barEl = alignBottomWithRef?.current
      const floorY = barEl
        ? Math.max(anchorRect.bottom, barEl.getBoundingClientRect().bottom)
        : anchorRect.bottom

      const spaceAbove = anchorRect.top
      const spaceBelow = viewportHeight - floorY
      const minGap = offset + 16

      let nextPlacement: Placement = 'bottom'
      if (placementPreference === 'bottom') {
        if (spaceBelow >= popRect.height + minGap) {
          nextPlacement = 'bottom'
        } else if (spaceAbove >= popRect.height + minGap) {
          nextPlacement = 'top'
        } else {
          nextPlacement = spaceBelow >= spaceAbove ? 'bottom' : 'top'
        }
      } else if (placementPreference === 'top') {
        if (spaceAbove >= popRect.height + minGap) {
          nextPlacement = 'top'
        } else if (spaceBelow >= popRect.height + minGap) {
          nextPlacement = 'bottom'
        } else {
          nextPlacement = spaceAbove >= spaceBelow ? 'top' : 'bottom'
        }
      } else if (spaceBelow >= popRect.height || spaceBelow >= spaceAbove) {
        nextPlacement = 'bottom'
      } else {
        nextPlacement = 'top'
      }

      let top: number
      if (nextPlacement === 'top') {
        top = anchorRect.top - popRect.height - offset
        top = Math.max(8, top)
      } else {
        top = floorY + offset
        top = Math.min(top, viewportHeight - popRect.height - 8)
      }

      let left: number
      if (align === 'start') {
        left = anchorRect.left
      } else if (align === 'end') {
        left = anchorRect.right - popRect.width
      } else {
        left = anchorRect.left + anchorRect.width / 2 - popRect.width / 2
      }
      left = Math.max(8, Math.min(left, viewportWidth - popRect.width - 8))

      setPlacement(nextPlacement)
      setStyle({
        position: 'fixed',
        top,
        left,
        zIndex: 100,
        pointerEvents: 'auto',
      })
      setIsPositioned(true)
    }

    updatePosition()

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [anchorRef, alignBottomWithRef, isOpen, offset, align, placementPreference])

  if (!isOpen) return null

  const node = (
    <div
      ref={popoverRef}
      style={{
        ...style,
        visibility: isPositioned ? 'visible' : 'hidden',
      }}
      className="fixed z-[100] overflow-visible"
    >
      {children({ placement })}
    </div>
  )

  if (typeof document === 'undefined') return null
  return createPortal(node, document.body)
}


