"use client";

import { useState } from "react";

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
  className = "" 
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior if wrapped in one
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className={`relative group focus:outline-none ${className}`}
      aria-label={`Copy ${contentName}`}
    >
      {/* The trigger element (e.g., the icon or text) */}
      {children}

      {/* The "Neat Animation Box" */}
      {copied && (
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          {/* Soft glow backdrop */}
          <span className="absolute inset-0 w-full h-full blur-lg bg-white/70 rounded-xl opacity-90 animate-in fade-in zoom-in-95 duration-200" />

          {/* Main toast */}
          <span className="relative flex items-center justify-center px-3.5 py-2 bg-white text-zinc-900 text-sm font-medium rounded-xl shadow-lg border border-zinc-200 animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-200 whitespace-nowrap">
            {/* Success Message */}
            <span className="tracking-tight">
              {contentName} copied!
            </span>
          </span>
        </span>
      )}
    </button>
  );
}

// (Intentionally no icon to keep the toast minimal and clean)