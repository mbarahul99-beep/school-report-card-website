import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '../../../sanity/client'
import PublicLayout from '../../../components/PublicLayout'
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'

// Define types
interface SanityPost {
  title: string
  slug: { current: string }
  content: any
  metaDescription: string
  featuredImage?: any
  publishedAt: string
}

// Fallback Rich Content for Mock Posts (for perfect offline/local compilation)
const defaultPostsContent: Record<string, { title: string; publishedAt: string; metaDescription: string; htmlContent: string }> = {
  'report-card-comments-teachers-guide': {
    title: '150+ General Report Card Comments for Teachers (All Grades)',
    publishedAt: '2026-08-10T08:00:00.000Z',
    metaDescription: 'Struggling to write report card feedback? Browse our comprehensive list of over 150+ remarks categorized by subject, behavior, and improvement needs.',
    htmlContent: `
      <p class="lead">Writing progress reports can be one of the most time-consuming parts of teaching. Crafting feedback that is both constructive and encouraging takes thought.</p>
      <h3>Behavioral and Social Skill Comments</h3>
      <ul>
        <li><strong>Cooperative:</strong> Participates actively in group projects and supports peers.</li>
        <li><strong>Respectful:</strong> Treats teachers, classmates, and school property with respect.</li>
        <li><strong>Focus:</strong> Needs reminders to stay focused and avoid distracting others during work time.</li>
      </ul>
      <h3>Academic Performance Comments</h3>
      <ul>
        <li><strong>Mathematics:</strong> Shows a solid grasp of word problems and mathematical logic.</li>
        <li><strong>English:</strong> Reading comprehension is excellent; writing structure continues to improve.</li>
        <li><strong>Science:</strong> Displays natural curiosity and performs experiments with care.</li>
      </ul>
      <h3>Constructive "Needs Improvement" Comments</h3>
      <p>When a student struggles, phrase feedback constructively: <em>"Needs to focus on details..."</em> or <em>"Would benefit from reviewing basic calculations at home..."</em></p>
    `
  },
  'cbse-grading-system-excel-format': {
    title: 'How to Implement CBSE Grading System Format in Excel',
    publishedAt: '2026-08-05T09:30:00.000Z',
    metaDescription: 'A step-by-step tutorial on calculating cumulative grade points (CGPA) and matching grades in Excel using conditional formulas according to CBSE directives.',
    htmlContent: `
      <p class="lead">Under the CBSE curriculum, marks are mapped directly to grade points and letter grades (A1 to E). Implementing this manually in spreadsheet lists can be tedious. Here is how to automate it in Microsoft Excel.</p>
      <h3>The CBSE Grading Scale Table</h3>
      <table class="min-w-full border border-zinc-200 text-sm">
        <thead>
          <tr class="bg-zinc-150">
            <th class="p-2 border">Marks Range</th>
            <th class="p-2 border">Grade</th>
            <th class="p-2 border">Grade Point</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="p-2 border">91 - 100</td><td class="p-2 border">A1</td><td class="p-2 border">10.0</td></tr>
          <tr><td class="p-2 border">81 - 90</td><td class="p-2 border">A2</td><td class="p-2 border">9.0</td></tr>
          <tr><td class="p-2 border">71 - 80</td><td class="p-2 border">B1</td><td class="p-2 border">8.0</td></tr>
          <tr><td class="p-2 border">61 - 70</td><td class="p-2 border">B2</td><td class="p-2 border">7.0</td></tr>
        </tbody>
      </table>
      <h3 class="mt-6">Using the VLOOKUP Formula</h3>
      <p>Instead of complex nested <code>IF</code> statements, use <code>VLOOKUP</code> with approximate match enabled. Set up your boundary limits in a lookup table and call: <code>=VLOOKUP(ScoreCell, LookupTable, 2, TRUE)</code>.</p>
    `
  },
  'kindergarten-progress-reports-evaluation': {
    title: 'The Ultimate Guide to Kindergarten Progress Reports',
    publishedAt: '2026-07-28T10:15:00.000Z',
    metaDescription: 'Kindergarten evaluation is different from upper grades. Learn how to design progress reports focusing on cognitive, social, and fine-motor skills development.',
    htmlContent: `
      <p class="lead">Unlike primary school, early childhood progress reports evaluate development and motor coordination parameters over numeric testing.</p>
      <h3>Key Development Indicators to Track</h3>
      <ol>
        <li><strong>Fine Motor Skills:</strong> Holding scissors, drawing lines, pencil grip coordination.</li>
        <li><strong>Social Development:</strong> Sharing toys, following class instructions, working in groups.</li>
        <li><strong>Cognitive Basics:</strong> Recognising letter phonics, counting to 20, color matching.</li>
      </ol>
    `
  },
  'why-automation-replaces-excel-sheets': {
    title: 'Why Automatic Report Card Generators are Replacing Excel Templates',
    publishedAt: '2026-07-15T14:20:00.000Z',
    metaDescription: 'Explore the key efficiency benefits of using a cloud-based school ERP like JIDS compared to managing thousands of individual student Excel workbooks.',
    htmlContent: `
      <p class="lead">Excel is a great tool, but using it to manage school marksheets creates file management headaches, broken formulas, and version control issues.</p>
      <h3>The Key Pitfalls of Excel for Grading</h3>
      <ul>
        <li><strong>Broken Links:</strong> One cell deletion can break the entire school's CGPA calculations.</li>
        <li><strong>No Parent Sharing:</strong> Sending PDF reports via WhatsApp/Email manually takes hours.</li>
        <li><strong>Formatting Issues:</strong> Printers cut off tables or stretch marksheets awkwardly.</li>
      </ul>
    `
  }
}

// Generate static params for Next.js to pre-compile all posts at build time (SSG)
export async function generateStaticParams() {
  try {
    const posts = await client.fetch<Array<{ slug: { current: string } }>>(
      `*[_type == "post" && defined(slug.current)]{slug}`
    )
    if (posts && posts.length > 0) {
      return posts.map((p) => ({ slug: p.slug.current }))
    }
  } catch (e) {
    console.error('Error fetching static params paths from Sanity:', e)
  }

  // Fallback to static mock paths if no database connection
  return Object.keys(defaultPostsContent).map((slug) => ({ slug }))
}

// Generate metadata dynamically for SEO optimization
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let title = 'Blog Article'
  let description = 'Grading and marksheet generation guidelines.'
  
  try {
    const fetched = await client.fetch<SanityPost>(
      `*[_type == "post" && slug.current == $slug][0]{title, metaDescription}`,
      { slug }
    )
    if (fetched) {
      title = fetched.title
      description = fetched.metaDescription
    } else if (slug in defaultPostsContent) {
      title = defaultPostsContent[slug].title
      description = defaultPostsContent[slug].metaDescription
    }
  } catch (e) {
    if (slug in defaultPostsContent) {
      title = defaultPostsContent[slug].title
      description = defaultPostsContent[slug].metaDescription
    }
  }

  return {
    title: `${title} | SchoolReportCard.in`,
    description,
    alternates: {
      canonical: `https://schoolreportcard.in/blog/${slug}`
    }
  }
}

export const revalidate = 60 // ISR: revalidate every 60s

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post: SanityPost | null = null
  let isFallback = false

  try {
    post = await client.fetch<SanityPost>(
      `*[_type == "post" && slug.current == $slug][0]{title, content, metaDescription, featuredImage, publishedAt}`,
      { slug }
    )
  } catch (error) {
    console.error('Sanity fetch error, falling back to local mock data:', error)
  }

  // Fallback check
  if (!post) {
    if (slug in defaultPostsContent) {
      const mock = defaultPostsContent[slug]
      post = {
        title: mock.title,
        slug: { current: slug },
        content: null,
        metaDescription: mock.metaDescription,
        publishedAt: mock.publishedAt
      }
      isFallback = true
    } else {
      notFound()
    }
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <PublicLayout>
      <article className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-zinc-900 tracking-tight leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 border-b border-zinc-100 pb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 4 min read
              </span>
            </div>
          </div>

          {/* Cover image or fallback icon */}
          <div className="my-8 aspect-[16/9] rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-50 relative">
            {post.featuredImage ? (
              <img
                src={urlFor(post.featuredImage).url() || ''}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-indigo-700 flex items-center justify-center p-12 text-white">
                <BookOpen className="h-24 w-24 stroke-[1] opacity-40" />
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="prose prose-zinc max-w-none leading-relaxed prose-headings:font-sans prose-headings:font-black prose-a:text-indigo-600 hover:prose-a:text-indigo-700 mt-8 text-zinc-700">
            {isFallback ? (
              // Safely inject mock HTML content
              <div dangerouslySetInnerHTML={{ __html: defaultPostsContent[slug].htmlContent }} />
            ) : (
              // Render rich text from Sanity
              <PortableText value={post.content} />
            )}
          </div>
        </div>
      </article>
    </PublicLayout>
  )
}
