import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'], // Block search engines from crawling the admin studio and APIs
    },
    sitemap: 'https://schoolreportcard.in/sitemap.xml',
  }
}
