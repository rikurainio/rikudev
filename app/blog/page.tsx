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
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-16">
          <Link 
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8 inline-block"
          >
            ← Back to home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            Blog
          </h1>
          <p className="text-xl text-zinc-600 font-light">
            Thoughts on software development, web technologies, and more.
          </p>
        </header>

        {/* Notice */}
        <div className="mb-12 p-4 rounded-xl border border-sky-200 bg-sky-50/50">
          <p className="text-sm text-sky-600 font-light">
            These are test blogs. The blog section is under works.
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-12">
          {posts.length === 0 ? (
            <p className="text-zinc-500">No posts yet. Check back soon!</p>
          ) : (
            posts.map((post) => (
              <article 
                key={post.slug}
                className="group border-b border-zinc-200 pb-12 last:border-0"
              >
                <Link 
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <div className="flex flex-col gap-4">
                    {/* Date and Read Time */}
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <time dateTime={post.metadata.date}>
                        {new Date(post.metadata.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.metadata.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-zinc-600 transition-colors">
                      {post.metadata.title}
                    </h2>

                    {/* Description */}
                    <p className="text-lg text-zinc-600 font-light leading-relaxed">
                      {post.metadata.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.metadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <span className="text-sm font-medium text-zinc-900 border-b border-zinc-900 pb-0.5 inline-block w-fit mt-2 group-hover:opacity-70 transition-opacity">
                      Read more →
                    </span>
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

