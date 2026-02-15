import { readdir } from 'fs/promises'
import { join } from 'path'

export interface LeetCodePostMetadata {
  title: string
  date: string
  difficulty: "Easy" | "Medium" | "Hard"
  description: string
  tags: string[]
}

export interface LeetCodePost {
  slug: string
  metadata: LeetCodePostMetadata
}

// Get all leetcode posts
export async function getAllLeetCodePosts(): Promise<LeetCodePost[]> {
  const contentDir = join(process.cwd(), 'app', 'content', 'leetcode')

  try {
    const files = await readdir(contentDir)
    const posts: LeetCodePost[] = []

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace(/\.mdx$/, '')
        try {
          // Dynamic import with explicit path
          const module = await import(`../content/leetcode/${slug}.mdx`)
          if (module.metadata) {
            posts.push({
              slug,
              metadata: module.metadata as LeetCodePostMetadata,
            })
          }
        } catch (error) {
          console.error(`Error loading leetcode post ${slug}:`, error)
        }
      }
    }

    // Sort by date, newest first
    return posts.sort((a, b) => {
      return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    })
  } catch (error) {
    console.error("Error reading leetcode content directory:", error)
    return []
  }
}

// Get a single leetcode post
export async function getLeetCodePost(slug: string): Promise<LeetCodePost | null> {
  try {
    const module = await import(`../content/leetcode/${slug}.mdx`)
    if (module.metadata) {
      return {
        slug,
        metadata: module.metadata as LeetCodePostMetadata,
      }
    }
    return null
  } catch (error) {
    console.error(`Error loading leetcode post ${slug}:`, error)
    return null
  }
}
