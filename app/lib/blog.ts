import { readdir } from 'fs/promises'
import { join } from 'path'

export interface BlogPostMetadata {
  title: string
  description: string
  author: string
  date: string
  tags: string[]
  readTime: string
}

export interface BlogPost {
  slug: string
  metadata: BlogPostMetadata
}

// Get all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  const contentDir = join(process.cwd(), 'app', 'content')
  const files = await readdir(contentDir)
  
  const posts: BlogPost[] = []
  
  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const slug = file.replace(/\.mdx$/, '')
      try {
        // Dynamic import with explicit path
        const module = await import(`../content/${slug}.mdx`)
        if (module.metadata) {
          posts.push({
            slug,
            metadata: module.metadata as BlogPostMetadata,
          })
        }
      } catch (error) {
        console.error(`Error loading post ${slug}:`, error)
      }
    }
  }
  
  // Sort by date, newest first
  return posts.sort((a, b) => {
    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  })
}

// Get a single blog post
export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const module = await import(`../content/${slug}.mdx`)
    if (module.metadata) {
      return {
        slug,
        metadata: module.metadata as BlogPostMetadata,
      }
    }
    return null
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.metadata.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

