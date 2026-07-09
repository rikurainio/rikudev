import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPost } from '@/app/lib/blog'
import { DATA } from '@/app/lib/data'

export async function generateStaticParams() {
  const posts = await getAllPosts()
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
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.metadata.title} | ${DATA.name}`,
    description: post.metadata.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  // Dynamically import the MDX component
  let PostContent
  try {
    const module = await import(`../../content/${slug}.mdx`)
    PostContent = module.default
  } catch (error) {
    console.error(`Error loading MDX content for ${slug}:`, error)
    notFound()
  }

  return (
    <main className="min-h-screen bg-white text-neutral-600 font-sans selection:bg-emerald-500 selection:text-white">
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Back Link */}
        <Link
          href="/blog"
          className="text-xs uppercase tracking-widest text-neutral-400 hover:text-emerald-600 transition-colors mb-16 inline-block"
        >
          ← Back
        </Link>

        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl tracking-tight text-neutral-900 font-medium mb-6">
            {post.metadata.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-neutral-400">
            <time dateTime={post.metadata.date}>
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.metadata.readTime}</span>
            <span>·</span>
            <span>{post.metadata.tags.join(', ')}</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-neutral max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-600 prose-strong:text-neutral-800 prose-code:text-emerald-600">
          <PostContent />
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-neutral-200">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-widest text-neutral-400 hover:text-emerald-600 transition-colors inline-block"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  )
}

