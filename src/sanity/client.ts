import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ujk8xzn3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for ISR so we always fetch fresh data on build/revalidation
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source) return { url: () => '' };
  return builder.image(source)
}


