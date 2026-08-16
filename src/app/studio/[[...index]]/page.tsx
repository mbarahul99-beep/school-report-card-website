import StudioWrapper from './StudioWrapper'

// Pre-generate static params for the Studio route to support output: "export"
export function generateStaticParams() {
  return [{ index: [] }]
}

export default function StudioPage() {
  return <StudioWrapper />
}
