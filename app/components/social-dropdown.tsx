"use client";

import { useEffect, useRef, useState } from "react";
import { SocialLinksWithPreviews } from "./social-links-with-previews";

interface Props {
  links: Record<string, string>;
}

export function SocialDropdown({ links }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex cursor-pointer items-center gap-1 text-sm hover:text-emerald-600 ${
          open ? "text-emerald-600" : "text-neutral-500"
        }`}
      >
        Links
        <svg
          className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <title>Toggle links menu</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <nav
          aria-label="Social links"
          className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg shadow-neutral-900/5"
          onClick={() => setOpen(false)}
        >
          <SocialLinksWithPreviews
            links={links}
            linkClassName="group/link flex w-full items-center justify-between px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-emerald-600"
          />
        </nav>
      )}
    </div>
  );
}
