import { MetadataRoute } from 'next'
import { client } from '../sanity/client'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://schoolreportcard.in'

  // 1. Static site routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // 2. Dynamic Blog slugs
  let blogRoutes: MetadataRoute.Sitemap = []
  
  try {
    const posts = await client.fetch<Array<{ slug: { current: string }; publishedAt: string }>>(
      `*[_type == "post" && defined(slug.current)]{slug, publishedAt}`
    )
    if (posts && posts.length > 0) {
      blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error fetching blog routes for sitemap:', error)
    
    // Fallback static paths for sitemap index
    const fallbacks = [
      'report-card-comments-teachers-guide',
      'cbse-grading-system-excel-format',
      'kindergarten-progress-reports-evaluation',
      'why-automation-replaces-excel-sheets'
    ]
    blogRoutes = fallbacks.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  }

  return [...staticRoutes, ...blogRoutes]
}
