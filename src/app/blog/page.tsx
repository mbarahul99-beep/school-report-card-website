import Link from 'next/link'
import { client, urlFor } from '../../sanity/client'
import PublicLayout from '../../components/PublicLayout'
import { Calendar, Clock, BookOpen, ChevronRight } from 'lucide-react'

// Define types
interface SanityPost {
  title: string
  slug: { current: string }
  metaDescription: string
  featuredImage?: any
  publishedAt: string
}

// Fallback Mock Blog Posts (Highly Relevant SEO Keywords)
const defaultPosts: SanityPost[] = [
  {
    title: '150+ General Report Card Comments for Teachers (All Grades)',
    slug: { current: 'report-card-comments-teachers-guide' },
    metaDescription: 'Struggling to write report card feedback? Browse our comprehensive list of over 150+ remarks categorized by subject, behavior, and improvement needs.',
    publishedAt: '2026-08-10T08:00:00.000Z'
  },
  {
    title: 'How to Implement CBSE Grading System Format in Excel',
    slug: { current: 'cbse-grading-system-excel-format' },
    metaDescription: 'A step-by-step tutorial on calculating cumulative grade points (CGPA) and matching grades in Excel using conditional formulas according to CBSE directives.',
    publishedAt: '2026-08-05T09:30:00.000Z'
  },
  {
    title: 'The Ultimate Guide to Kindergarten Progress Reports',
    slug: { current: 'kindergarten-progress-reports-evaluation' },
    metaDescription: 'Kindergarten evaluation is different from upper grades. Learn how to design progress reports focusing on cognitive, social, and fine-motor skills development.',
    publishedAt: '2026-07-28T10:15:00.000Z'
  },
  {
    title: 'Why Automatic Report Card Generators are Replacing Excel Templates',
    slug: { current: 'why-automation-replaces-excel-sheets' },
    metaDescription: 'Explore the key efficiency benefits of using a cloud-based school ERP like JIDS compared to managing thousands of individual student Excel workbooks.',
    publishedAt: '2026-07-15T14:20:00.000Z'
  }
]

export const revalidate = 60 // ISR: revalidate every 60s

export default async function BlogPage() {
  let posts = [...defaultPosts]

  try {
    const fetchedPosts = await client.fetch<SanityPost[]>(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){title, slug, metaDescription, featuredImage, publishedAt}`
    )
    if (fetchedPosts && fetchedPosts.length > 0) {
      posts = fetchedPosts
    }
  } catch (error) {
    console.error('Error fetching blog posts from Sanity:', error)
  }

  return (
    <PublicLayout>
      {/* HEADER SECTION */}
      <section className="bg-zinc-50 border-b border-zinc-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="font-sans font-black text-4xl sm:text-5xl text-zinc-900 tracking-tight">
            School & Grading Blog
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-xl mx-auto">
            Tips, templates, guidelines, and guides to help school admins and teachers build smart grading sheets.
          </p>
        </div>
      </section>

      {/* ARTICLES LISTING */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {posts.map((post, index) => {
              const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })

              // Fallback gradient colors if featuredImage is missing
              const gradients = [
                'from-indigo-400 to-indigo-600',
                'from-emerald-400 to-emerald-600',
                'from-purple-400 to-purple-600',
                'from-amber-400 to-amber-600'
              ]
              const bgGradient = gradients[index % gradients.length]

              return (
                <article
                  key={index}
                  className="flex flex-col bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Image/Gradient Cover */}
                  <Link href={`/blog/${post.slug.current}`} className="block relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-150">
                    {post.featuredImage ? (
                      <img
                        src={urlFor(post.featuredImage).url() || ''}
                        alt={post.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${bgGradient} flex items-center justify-center p-6 text-white select-none`}>
                        <BookOpen className="h-12 w-12 stroke-[1.5] opacity-75" />
                      </div>
                    )}
                  </Link>

                  {/* Body details */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      {/* Meta attributes */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" /> {formattedDate}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> 4 min read
                        </span>
                      </div>

                      <h2 className="font-extrabold text-xl sm:text-2xl text-zinc-900 hover:text-indigo-600 leading-snug transition-colors">
                        <Link href={`/blog/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                        {post.metaDescription}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors self-start"
                    >
                      Read Article <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
