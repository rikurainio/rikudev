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
    <main className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-8 inline-block group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">←</span> Back to home
          </Link>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
              LeetCode <span className="text-zinc-400">Journal</span>
            </h1>
            <p className="text-xl text-zinc-600 font-light max-w-2xl leading-relaxed">
              Detailed technical walkthroughs of LeetCode problems. This is where I document my problem-solving process and complexity analysis.
            </p>
          </div>
        </header>

        {/* Blog Posts List */}
        <div className="grid gap-8">
          {posts.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-zinc-100 rounded-2xl">
              <p className="text-zinc-500">No solutions documented yet. Check back soon!</p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="group relative bg-zinc-50/50 hover:bg-zinc-50 rounded-2xl p-6 transition-all duration-300 border border-transparent hover:border-zinc-200"
              >
                <Link
                  href={`/leetcode/${post.slug}`}
                  className="block h-full"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${post.metadata.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                            post.metadata.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-rose-100 text-rose-700'
                          }`}>
                          {post.metadata.difficulty}
                        </span>
                        <time dateTime={post.metadata.date} className="text-xs font-mono text-zinc-400">
                          {new Date(post.metadata.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight group-hover:text-zinc-900 transition-colors">
                      {post.metadata.title}
                    </h2>

                    <p className="text-zinc-600 font-light leading-relaxed">
                      {post.metadata.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.metadata.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                      View Solution
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
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
