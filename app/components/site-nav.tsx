"use client";

import Image from "next/image";
import Link from "next/link";
import { DATA } from "../lib/data";
import { SocialDropdown } from "./social-dropdown";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md supports-backdrop-filter:bg-white/50">
      <div className="flex w-full min-w-0 items-center justify-between gap-x-4 px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center"
          aria-label="Home"
        >
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-neutral-100">
            <Image
              src="/avatar-v2.png"
              alt=""
              width={256}
              height={256}
              className="h-full w-full object-cover"
            />
          </span>
        </Link>

        <nav
          className="flex items-center gap-x-6 sm:gap-x-8"
          aria-label="Primary"
        >
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-emerald-600"
          >
            Writing
          </Link>
          <Link
            href="/personal"
            className="text-sm text-neutral-500 hover:text-emerald-600"
          >
            Hobbies
          </Link>
          <SocialDropdown links={DATA.links} />
        </nav>
      </div>
    </header>
  );
}
