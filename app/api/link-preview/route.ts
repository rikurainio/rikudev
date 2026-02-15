import { NextResponse } from 'next/server'

interface LinkPreviewData {
  title?: string
  description?: string
  image?: string
  url: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  // Validate URL
  let targetUrl: URL
  try {
    targetUrl = new URL(url)
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  // Only allow http/https URLs
  if (!['http:', 'https:'].includes(targetUrl.protocol)) {
    return NextResponse.json({ error: 'Only HTTP/HTTPS URLs are allowed' }, { status: 400 })
  }

  try {
    // Fetch the HTML with a timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(targetUrl.toString(), {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const status = response.status >= 200 && response.status <= 599 ? response.status : 502;
      return NextResponse.json(
        { error: `Failed to fetch: ${response.statusText} (${response.status})` },
        { status }
      )
    }

    const html = await response.text()

    // Parse Open Graph and meta tags
    const preview: LinkPreviewData = {
      url: targetUrl.toString(),
    }

    // Extract Open Graph tags
    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i)
    const ogDescriptionMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i)
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)

    // Extract Twitter Card tags (fallback)
    const twitterTitleMatch = html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i)
    const twitterDescriptionMatch = html.match(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']+)["']/i)
    const twitterImageMatch = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i)

    // Extract basic meta tags (fallback)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)

    // Set title (priority: og:title > twitter:title > <title>)
    preview.title = ogTitleMatch?.[1] || twitterTitleMatch?.[1] || titleMatch?.[1]?.trim()

    // Set description (priority: og:description > twitter:description > meta description)
    preview.description = ogDescriptionMatch?.[1] || twitterDescriptionMatch?.[1] || descriptionMatch?.[1]

    // Set image (priority: og:image > twitter:image)
    const imageUrl = ogImageMatch?.[1] || twitterImageMatch?.[1]
    if (imageUrl) {
      // Handle relative URLs
      try {
        preview.image = new URL(imageUrl, targetUrl.origin).toString()
      } catch {
        preview.image = imageUrl
      }
    }

    return NextResponse.json(preview)
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ error: 'Request timeout' }, { status: 408 })
    }
    console.error('Link preview error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch link preview' },
      { status: 500 }
    )
  }
}

