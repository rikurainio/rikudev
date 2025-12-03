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
    <main className="min-h-screen bg-white text-zinc-900">
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {/* Back Link */}
        <Link 
          href="/blog"
          className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8 inline-block"
        >
          ← Back to blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {post.metadata.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6">
            <time dateTime={post.metadata.date}>
              {new Date(post.metadata.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.metadata.readTime}</span>
            <span>•</span>
            <span>By {post.metadata.author}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-zinc max-w-none">
          <PostContent />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-200">
          <Link 
            href="/blog"
            className="text-sm font-medium text-zinc-900 border-b border-zinc-900 pb-0.5 hover:opacity-70 transition-opacity inline-block"
          >
            ← Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  )
}

