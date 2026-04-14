"use client";

import { useEffect, useState } from "react";

interface CopyButtonProps {
  text: string;
  contentName?: string;
  children: React.ReactNode;
  className?: string;
}

export function CopyButton({
  text,
  contentName = "Item",
  children,
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`relative text-left focus:outline-none ${className}`}
      aria-label={copied ? "Copied" : `Copy ${contentName}`}
    >
      {copied ? (
        <span className="block w-full text-left text-zinc-500" aria-live="polite">
          Copied
        </span>
      ) : (
        <span
          className="flex w-full min-w-0 items-center justify-between gap-2"
          aria-live="polite"
        >
          {children}
        </span>
      )}
    </button>
  );
}
