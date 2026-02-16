import Link from 'next/link'
import { getAllLeetCodePosts } from '@/app/lib/leetcode'
import { DATA } from '@/app/lib/data'

export const metadata = {
  title: 'LeetCode | ' + DATA.name,
  description: 'Detailed solutions to LeetCode problems to showcase problem-solving skills.',
}

export default async function LeetCodePage() {
  const posts = await getAllLeetCodePosts()

  return (
    <main className="min-h-screen selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-widest text-zinc-600 hover:text-white transition-colors mb-12 inline-block"
          >
            ← Back
          </Link>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold tracking-tighter text-white">
              LeetCode <span className="text-zinc-600">Journal</span>
            </h1>
            <p className="text-xl text-zinc-500 font-light max-w-2xl leading-relaxed">
              Technical walkthroughs and complexity analysis of competitive programming problems.
            </p>
          </div>
        </header>

        {/* List */}
        <div className="space-y-12">
          {posts.length === 0 ? (
            <p className="text-zinc-600">No solutions documented yet. Check back soon!</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="group relative"
              >
                <Link
                  href={`/leetcode/${post.slug}`}
                  className="block h-full"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-bold uppercase tracking-widest ${post.metadata.difficulty === 'Easy' ? 'text-emerald-500' :
                          post.metadata.difficulty === 'Medium' ? 'text-amber-500' :
                            'text-rose-500'
                          }`}>
                          {post.metadata.difficulty}
                        </span>
                        <time dateTime={post.metadata.date} className="text-xs font-mono text-zinc-700 uppercase tracking-tight">
                          {new Date(post.metadata.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>

                    <h2 className="text-3xl font-semibold text-zinc-200 group-hover:text-white transition-colors tracking-tight">
                      {post.metadata.title}
                    </h2>

                    <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-2xl">
                      {post.metadata.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
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
