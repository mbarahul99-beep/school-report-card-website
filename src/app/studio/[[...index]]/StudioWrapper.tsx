'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Studio component and disable SSR inside this Client Component
const SanityStudio = dynamic(
  () => import('./StudioComponent'),
  { ssr: false }
)

export default function StudioWrapper() {
  return <SanityStudio />
}
