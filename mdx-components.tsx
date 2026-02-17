// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

const YouTube = ({ id }: { id: string }) => (
  <div className="my-10 aspect-video w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-200/50">
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
    />
  </div>
)

const components: MDXComponents = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight mt-12 mb-6 first:mt-0 text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold tracking-tight mt-10 mb-4 text-zinc-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold tracking-tight mt-8 mb-3 text-zinc-200">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold tracking-tight mt-6 mb-2 text-zinc-200">
      {children}
    </h4>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="text-zinc-400 leading-relaxed mb-6 last:mb-0">
      {children}
    </p>
  ),

  // Links
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http')
    const Component = isExternal ? 'a' : Link

    return (
      <Component
        href={href || '#'}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-white border-b border-zinc-700 pb-0.5 hover:border-white transition-colors"
      >
        {children}
      </Component>
    )
  },

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-zinc-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-zinc-400">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="ml-4">
      {children}
    </li>
  ),

  // --- UPDATED CODE BLOCKS ---

  // 1. The <pre> element (Block Code)
  // We MUST spread `...props` here because rehype-pretty-code injects the
  // 'style' prop (with the theme background) and data attributes here.
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="p-6 rounded-xl overflow-x-auto my-8 text-base md:text-lg font-mono border border-zinc-800/50 shadow-2xl bg-[#0c0c0e]/50 backdrop-blur-sm"
    >
      {children}
    </pre>
  ),


  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-zinc-800 pl-4 italic text-zinc-500 my-6">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-12 border-0 h-px bg-linear-to-r from-transparent via-zinc-800/50 to-transparent" />
  ),

  // Images
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg my-6 w-full"
      loading="lazy"
    />
  ),

  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-zinc-800">
      <table className="min-w-full border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-900/50">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-zinc-900">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr>
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-zinc-200 text-sm">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-zinc-400 text-sm">
      {children}
    </td>
  ),

  // Strong and emphasis
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-200">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic">
      {children}
    </em>
  ),
  YouTube,
}

export function useMDXComponents(): MDXComponents {
  return components
}