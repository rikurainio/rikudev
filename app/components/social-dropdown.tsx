"use client";

import { useRef, useState } from "react";
import { SmartPopover } from "./smart-popover";
import { SocialLinksWithPreviews } from "./social-links-with-previews";

interface Props {
  links: Record<string, string>;
  variant?: "default" | "nav";
  /** Sticky header: positions the nav menu just below this bar (nav variant). */
  belowBarRef?: React.RefObject<HTMLElement | null>;
}

export function SocialDropdown({
  links,
  variant = "default",
  belowBarRef,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 280);
    }
  };

  const handlePopoverMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
      setIsOpen(!isOpen);
    }
  };

  const triggerClasses =
    variant === "nav"
      ? `gap-1 border-0 bg-transparent px-0 py-0 text-xl shadow-none hover:text-white sm:gap-1.5 sm:text-2xl ${
          isOpen ? "text-white" : ""
        }`
      : `gap-2 border px-3.5 py-1.5 text-[13px] ${
          isOpen
            ? "border-zinc-100 bg-zinc-100"
            : "border-zinc-800/80 bg-zinc-950/50 hover:border-zinc-500 hover:text-white"
        }`;

  const iconClasses =
    variant === "nav"
      ? isOpen
        ? "rotate-180"
        : ""
      : isOpen
        ? "rotate-180"
        : "";

  return (
    <fieldset
      className="relative m-0 min-w-0 border-0 p-0"
      aria-label="Connect"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        ref={triggerRef}
        onClick={handleTriggerClick}
        data-state={isOpen ? "open" : "closed"}
        className={`flex cursor-pointer items-center rounded-sm transition-all group/dropdown ${variant === "default" ? "font-bold" : "font-normal"} ${triggerClasses}`}
      >
        <span>Links</span>
        <svg
          className={`shrink-0 transition-transform duration-300 ${variant === "nav" ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-3.5 w-3.5"} ${iconClasses}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <title>Expand menu</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={variant === "nav" ? 2.25 : 2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <SmartPopover
        anchorRef={triggerRef}
        isOpen={isOpen}
        align={variant === "nav" ? "end" : "start"}
        placementPreference="bottom"
        alignBottomWithRef={variant === "nav" ? belowBarRef : undefined}
      >
        {({ placement }) =>
          variant === "nav" ? (
            <div
              className="pointer-events-auto -mt-8 pt-8 max-sm:-mt-6 max-sm:pt-6"
              onMouseEnter={handlePopoverMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <nav
                aria-label="Social links"
                className={`flex min-w-[min(100vw-2rem,17rem)] max-w-[min(100vw-1.5rem,20rem)] flex-col divide-y divide-zinc-800/90 overflow-hidden rounded-md border border-zinc-800 bg-zinc-950/95 py-0 shadow-lg shadow-black/40 backdrop-blur-xl duration-150 animate-in fade-in slide-in-from-top-1 sm:min-w-[17rem] ${
                  placement === "bottom"
                    ? "origin-top-right"
                    : "origin-bottom-right slide-in-from-bottom-1"
                }`}
              >
                <SocialLinksWithPreviews
                  links={links}
                  linkClassName="group/link flex w-full items-center justify-between px-4 py-3 text-lg font-normal transition-colors hover:bg-zinc-900/95 hover:text-zinc-100 sm:py-3.5 sm:text-xl"
                />
              </nav>
            </div>
          ) : (
            <nav
              aria-label="Social links"
              className={`-mt-2 pt-2 pointer-events-auto flex min-w-[248px] max-w-[min(100vw-1.5rem,320px)] flex-col overflow-hidden rounded-sm border border-white/10 bg-zinc-950/95 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/6 ring-inset backdrop-blur-2xl duration-200 animate-in fade-in zoom-in-95 ${
                placement === "bottom"
                  ? "origin-top-left slide-in-from-top-1"
                  : "origin-bottom-left slide-in-from-bottom-1"
              }`}
              onMouseEnter={handlePopoverMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col gap-0.5">
                <SocialLinksWithPreviews
                  links={links}
                  linkClassName="group/link flex items-center justify-between rounded-sm px-3 py-2.5 text-sm font-bold transition-all hover:bg-white/5 hover:text-white"
                />
              </div>
            </nav>
          )
        }
      </SmartPopover>
    </fieldset>
  );
}
