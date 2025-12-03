import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

const components: MDXComponents = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight mt-12 mb-6 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold tracking-tight mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold tracking-tight mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-semibold tracking-tight mt-6 mb-2">
      {children}
    </h4>
  ),
  
  // Paragraphs
  p: ({ children }) => (
    <p className="text-zinc-700 leading-relaxed mb-4">
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
        className="text-zinc-900 border-b border-zinc-900 pb-0.5 hover:opacity-70 transition-opacity"
      >
        {children}
      </Component>
    )
  },
  
  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-zinc-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-zinc-700">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="ml-4">
      {children}
    </li>
  ),
  
  // Code blocks
  code: ({ children, className }) => {
    const isInline = !className
    return isInline ? (
      <code className="bg-zinc-100 text-zinc-900 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ) : (
      <code className={className}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm">
      {children}
    </pre>
  ),
  
  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-zinc-300 pl-4 italic text-zinc-600 my-4">
      {children}
    </blockquote>
  ),
  
  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-zinc-200" />
  ),
  
  // Images
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg my-6 w-full"
    />
  ),
  
  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-zinc-300">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-100">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody>
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-zinc-200">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="border border-zinc-300 px-4 py-2 text-left font-semibold text-zinc-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-zinc-300 px-4 py-2 text-zinc-700">
      {children}
    </td>
  ),
  
  // Strong and emphasis
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-900">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic">
      {children}
    </em>
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}

