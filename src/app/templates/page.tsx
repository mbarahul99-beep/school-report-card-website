import Image from 'next/image'
import { client } from '../../sanity/client'
import PublicLayout from '../../components/PublicLayout'
import { CheckCircle2, LayoutGrid, Award, Download, ArrowUpRight } from 'lucide-react'

// Define types
interface SanityTemplate {
  title: string
  description: string
  imageUrl?: any
  downloadUrl: string
  isPremium: boolean
  category: string
}

// Fallback Mock Templates (Resilient Coding)
const defaultTemplates: SanityTemplate[] = [
  {
    title: 'Classic Academic Marksheet',
    description: 'Clean, double-bordered traditional card report layout optimized for primary & secondary schools.',
    downloadUrl: 'https://jids.in/register?template=classic-academic',
    isPremium: false,
    category: 'Primary School'
  },
  {
    title: 'Modern CBSE Grade Sheet',
    description: 'Complies with CBSE regulations containing grade descriptors, cumulative points, and attendance grids.',
    downloadUrl: 'https://jids.in/register?template=cbse-grade-sheet',
    isPremium: false,
    category: 'CBSE'
  },
  {
    title: 'Kindergarten Progress Journal',
    description: 'Colorful, icon-based evaluation sheet focusing on behavioral traits, social skills, and early learning.',
    downloadUrl: 'https://jids.in/register?template=kindergarten',
    isPremium: true,
    category: 'Kindergarten'
  },
  {
    title: 'High School Semester Report',
    description: 'Detailed high school report card displaying credit hours, GPA, class averages, and honors indicators.',
    downloadUrl: 'https://jids.in/register?template=high-school',
    isPremium: false,
    category: 'High School'
  },
  {
    title: 'Executive University Transcript',
    description: 'Highly professional layout featuring course codes, credit indexes, and clean signature spaces.',
    downloadUrl: 'https://jids.in/register?template=university-transcript',
    isPremium: true,
    category: 'University'
  },
  {
    title: 'Coaching Class Scorecard',
    description: 'Compact card layout displaying term tests, percentage rankings, and subject rank highlights.',
    downloadUrl: 'https://jids.in/register?template=coaching-class',
    isPremium: false,
    category: 'Coaching'
  }
]

export const revalidate = 60 // ISR: revalidate every 60s

export default async function TemplatesPage() {
  let templates = [...defaultTemplates]

  try {
    const fetchedTemplates = await client.fetch<SanityTemplate[]>(
      `*[_type == "template"] | order(order asc){title, description, imageUrl, downloadUrl, isPremium, category}`
    )
    if (fetchedTemplates && fetchedTemplates.length > 0) {
      templates = fetchedTemplates
    }
  } catch (error) {
    console.error('Error fetching templates from Sanity:', error)
  }

  // Predefined category tabs for display
  const categories = ['All', 'CBSE', 'Primary School', 'High School', 'Kindergarten', 'University', 'Coaching']

  return (
    <PublicLayout>
      {/* HEADER SECTION */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="font-sans font-black text-4xl sm:text-5xl text-zinc-900 tracking-tight">
            Report Card Templates
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-xl mx-auto">
            Choose from our pre-formatted layouts or customize your own board-compliant marksheet design.
          </p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Category Filter Tabs (Visual Only for static SSG markup, filters lead users directly) */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-zinc-100 pb-6">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  idx === 0
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((tpl, index) => {
              // Standard color themes for thumbnails in the mock view
              const themeColors = [
                'from-indigo-500 to-indigo-700',
                'from-emerald-500 to-emerald-700',
                'from-amber-600 to-amber-800',
                'from-purple-500 to-purple-700',
                'from-rose-500 to-rose-700',
                'from-teal-500 to-teal-700'
              ]
              const gradientTheme = themeColors[index % themeColors.length]

              return (
                <div
                  key={index}
                  className="group bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Thumbnail Preview Area */}
                  <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden flex items-center justify-center p-6 border-b border-zinc-100">
                    {/* Placeholder design replicating a marksheet card */}
                    <div className={`w-full h-full rounded-xl bg-gradient-to-br ${gradientTheme} p-4 text-white/90 shadow-inner flex flex-col justify-between select-none`}>
                      <div className="space-y-1">
                        <div className="h-2 w-16 bg-white/30 rounded-full" />
                        <div className="h-4 w-28 bg-white/70 rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <div className="border-t border-white/20 pt-2 flex justify-between">
                          <div className="h-2 w-10 bg-white/40 rounded-full" />
                          <div className="h-2 w-4 bg-white/60 rounded-full" />
                        </div>
                        <div className="flex justify-between">
                          <div className="h-2 w-12 bg-white/40 rounded-full" />
                          <div className="h-2 w-3 bg-white/60 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Premium Tag */}
                    {tpl.isPremium && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-amber-500 text-white font-bold px-2.5 py-1 rounded-lg text-[10px] tracking-wider uppercase shadow-sm">
                        <Award className="h-3 w-3" /> Premium
                      </span>
                    )}

                    {/* Category Label */}
                    <span className="absolute bottom-3 left-3 bg-white/95 text-zinc-800 font-semibold px-2.5 py-1 rounded-lg text-[10px] uppercase border border-zinc-100 shadow-sm">
                      {tpl.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-zinc-900 group-hover:text-indigo-600 transition-colors">
                        {tpl.title}
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>

                    <a
                      href={tpl.downloadUrl}
                      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 hover:border-transparent bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition-all"
                    >
                      Use This Template <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM TRUST INFO */}
      <section className="bg-zinc-50 py-16 border-t border-zinc-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-indigo-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900 text-sm">Board Compliant</h4>
              <p className="text-xs text-zinc-500 mt-1">Laying parameters configured according to major curricula requirements globally.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-indigo-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900 text-sm">Highly Customizable</h4>
              <p className="text-xs text-zinc-500 mt-1">Upload your logo, watermark stamps, signature PNGs, and custom headers.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-indigo-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-zinc-900 text-sm">Export Options</h4>
              <p className="text-xs text-zinc-500 mt-1">Download in PDF, raw Image, Excel Sheet, DOCX template or Markdown code.</p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
