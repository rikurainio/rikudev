"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { DATA } from "../lib/data";
import { SocialDropdown } from "./social-dropdown";

export function SiteNav() {
  const headerRef = useRef<HTMLElement | null>(null);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-zinc-950/75 backdrop-blur-md supports-backdrop-filter:bg-zinc-950/55 overflow-x-hidden"
    >
      <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:gap-x-10 sm:px-8 sm:py-4 max-w-full">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-3"
        >
          <span 
            className={`
              relative shrink-0 overflow-hidden rounded-sm border-2
              border-zinc-900 bg-zinc-800 ring-1 ring-zinc-800
              hover:ring-zinc-600
              h-8 w-8 sm:h-8 sm:w-8
            `}>
            <Image
              src="/avatar.png"
              alt=""
              width={256}
              height={256}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="truncate text-xl sm:text-3xl tracking-tight font-medium">
            {DATA.name}
          </span>
        </Link>

        <nav
          className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-10 md:gap-x-12"
          aria-label="Primary"
        >
          <Link
            href="/blog"
            className="text-xl hover:text-white sm:text-2xl"
          >
            Writing
          </Link>
          <Link
            href="/personal"
            className="text-xl hover:text-white sm:text-2xl"
          >
            Hobbies
          </Link>
          <SocialDropdown
            links={DATA.links}
            variant="nav"
            belowBarRef={headerRef}
          />
        </nav>
      </div>
    </header>
  );
}
