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
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-700">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/leetcode"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> Back to LeetCode
          </Link>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${post.metadata.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                post.metadata.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
              }`}>
              {post.metadata.difficulty}
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.metadata.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6">
            <time dateTime={post.metadata.date} className="font-mono">
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-zinc-600 bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose max-w-none">
          <PostContent />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-100 flex flex-col items-center gap-6">
          <p className="text-sm text-zinc-400 italic">
            Solution documented by {DATA.name}
          </p>
          <Link
            href="/leetcode"
            className="text-sm font-semibold text-zinc-900 border-b border-zinc-900 pb-0.5 hover:opacity-70 transition-opacity"
          >
            Explore more solutions
          </Link>
        </footer>
      </article>
    </main>
  )
}
