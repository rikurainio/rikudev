import Link from 'next/link'
import { getAllPosts } from '@/app/lib/blog'
import { DATA } from '@/app/lib/data'

export const metadata = {
  title: 'Blog | ' + DATA.name,
  description: 'Thoughts on software development, web technologies, and more.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors mb-12 inline-block"
          >
            ← Back
          </Link>
          <h1 className="text-4xl font-semibold tracking-tighter text-white mb-4">
            Writing
          </h1>
          <p className="text-xl text-zinc-500 font-light max-w-xl">
            Technical articles, project deep-dives, and thoughts on craft.
          </p>
        </header>

        {/* Blog Posts List */}
        <div className="space-y-16">
          {posts.length === 0 ? (
            <p className="text-zinc-600">No posts yet. Check back soon!</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="group relative"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-tight text-zinc-700">
                      <time dateTime={post.metadata.date}>
                        {new Date(post.metadata.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.metadata.readTime}</span>
                    </div>

                    <h2 className="text-3xl font-semibold text-zinc-200 group-hover:text-white transition-colors tracking-tight">
                      {post.metadata.title}
                    </h2>

                    <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-2xl">
                      {post.metadata.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.metadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-zinc-600 border border-zinc-900 bg-zinc-950 px-2 py-0.5 rounded-sm group-hover:border-zinc-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

