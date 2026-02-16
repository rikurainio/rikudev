import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllLeetCodePosts, getLeetCodePost } from '@/app/lib/leetcode'
import { DATA } from '@/app/lib/data'

export async function generateStaticParams() {
  const posts = await getAllLeetCodePosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getLeetCodePost(slug)

  if (!post) {
    return {
      title: 'Solution Not Found',
    }
  }

  return {
    title: `${post.metadata.title} | LeetCode Solution | ${DATA.name}`,
    description: post.metadata.description,
  }
}

export default async function LeetCodePostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getLeetCodePost(slug)

  if (!post) {
    notFound()
  }

  // Dynamically import the MDX component
  let PostContent
  try {
    const module = await import(`../../content/leetcode/${slug}.mdx`)
    PostContent = module.default
  } catch (error) {
    console.error(`Error loading MDX content for ${slug}:`, error)
    notFound()
  }

  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/leetcode"
            className="text-sm font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
          >
            ← Back
          </Link>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-widest ${post.metadata.difficulty === 'Easy' ? 'text-emerald-500' :
              post.metadata.difficulty === 'Medium' ? 'text-amber-500' :
                'text-rose-500'
              }`}>
              {post.metadata.difficulty}
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white mb-8">
            {post.metadata.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-tight text-zinc-600 mb-8 pb-8 border-b border-zinc-900">
            <time dateTime={post.metadata.date}>
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-zinc-600 border border-zinc-900 bg-zinc-950 px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-invert prose-zinc max-w-none prose-headings:text-white prose-p:text-zinc-400 prose-strong:text-zinc-200 prose-code:text-zinc-200 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-sm">
          <PostContent />
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-zinc-900 text-center">
          <Link
            href="/leetcode"
            className="text-sm font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors inline-block"
          >
            ← Back to all solutions
          </Link>
        </footer>
      </article>
    </main>
  )
}
