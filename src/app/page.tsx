import Link from 'next/link'
import Image from 'next/image'
import { client } from '../sanity/client'
import PublicLayout from '../components/PublicLayout'
import ReportCardWidget from '../components/ReportCardWidget'
import {
  FileText,
  Users,
  TrendingUp,
  Layout,
  Download,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
} from 'lucide-react'

// Define types
interface SanityFeature {
  title: string
  description: string
  iconName: string
}

interface SanityPageSetting {
  key: string
  value: string
}

// Fallback Default Content (resilient coding)
const defaultFeatures: SanityFeature[] = [
  {
    title: 'Bulk Marks Import',
    description: 'Upload your student marks via Excel spreadsheets and generate hundreds of report cards instantly.',
    iconName: 'FileText'
  },
  {
    title: 'Multi-Board Support',
    description: 'Fully compatible with CBSE, ICSE, state boards, or custom school grading systems (GPA, Grade points, percentages).',
    iconName: 'Layout'
  },
  {
    title: 'Instant PDF Exports',
    description: 'Export clean, high-resolution, print-ready PDF progress reports with your school logo and principal stamp.',
    iconName: 'Download'
  },
  {
    title: 'Parent & Teacher Portal',
    description: 'Secure credentials for teachers to input marks and parents to view digital grade sheets in real-time.',
    iconName: 'Users'
  },
  {
    title: 'Performance Analytics',
    description: 'Visual analytics dashboard showing subject-wise class metrics, top performers, and grade distributions.',
    iconName: 'TrendingUp'
  },
  {
    title: 'Absolute Data Security',
    description: 'ISO-certified bank-grade encryption to secure student records, parent contacts, and grading sheets.',
    iconName: 'Lock'
  }
]

const defaultSettings = {
  hero_title: 'Generate Professional School Report Cards in Seconds',
  hero_subtitle: 'The absolute fastest cloud ERP and marksheet creator. Built for modern schools, coordinators, and teachers. Say goodbye to manual formatting.',
  cta_primary: 'Start Free on JIDS',
  cta_secondary: 'Try Interactive Builder'
}

// Icon mapper helper
const iconMap: Record<string, any> = {
  FileText: FileText,
  Users: Users,
  TrendingUp: TrendingUp,
  Layout: Layout,
  Download: Download,
  Lock: Lock
}

// Page config
export const revalidate = 60 // ISR: Revalidate content every 60 seconds

export default async function Home() {
  let settings = { ...defaultSettings }
  let features = [...defaultFeatures]

  // Query Sanity with error fallbacks
  try {
    const fetchedSettings = await client.fetch<SanityPageSetting[]>(
      `*[_type == "pageSetting" && page == "home"]{key, value}`
    )
    if (fetchedSettings && fetchedSettings.length > 0) {
      fetchedSettings.forEach((item) => {
        if (item.key in settings) {
          settings[item.key as keyof typeof defaultSettings] = item.value
        }
      })
    }

    const fetchedFeatures = await client.fetch<SanityFeature[]>(
      `*[_type == "feature"] | order(order asc){title, description, iconName}`
    )
    if (fetchedFeatures && fetchedFeatures.length > 0) {
      features = fetchedFeatures
    }
  } catch (error) {
    console.error('Error fetching landing page details from Sanity:', error)
  }

  return (
    <PublicLayout>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-indigo-50/40 via-white to-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            {/* Pulsing Pill Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              <ShieldCheck className="h-3.5 w-3.5" /> ISO 9001:2015 Certified ERP
            </div>

            <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-zinc-900 tracking-tight leading-[1.1] text-balance">
              {settings.hero_title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto">
              {settings.hero_subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="https://jids.in/register?src=schoolreportcard-hero"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 text-base font-bold text-white shadow-lg shadow-indigo-600/10 hover:bg-indigo-500 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all"
              >
                {settings.cta_primary} <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#builder"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 hover:border-zinc-300 bg-white px-8 text-base font-semibold text-zinc-700 hover:bg-zinc-50/50 active:scale-[0.98] transition-all"
              >
                {settings.cta_secondary}
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-medium text-zinc-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free 15-day Trial</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No Credit Card Required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Instant PDF Download</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BUILDER WIDGET SECTION */}
      <section id="builder" className="py-16 sm:py-24 border-y border-zinc-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              Test Drive the Builder
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed">
              Create a custom marksheet in real-time. Change the grades, names, or template designs and see your PDF generated instantly.
            </p>
          </div>

          <ReportCardWidget />
        </div>
      </section>

      {/* 3. PRODUCT FEATURES GRID */}
      <section id="features" className="py-16 sm:py-24 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              Powerful Features for Smart Schools
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed">
              Everything you need to automate grading, manage reports, and improve teacher productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, index) => {
              const IconComponent = iconMap[feat.iconName] || CheckCircle2
              return (
                <div
                  key={index}
                  className="bg-white border border-zinc-150 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-200 transition-all duration-300 flex flex-col space-y-4"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <IconComponent className="h-5 w-5 stroke-[2]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-zinc-900">{feat.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. CALL-TO-ACTION (CTA) SECTION */}
      <section className="bg-indigo-900 py-16 sm:py-20 text-white relative overflow-hidden">
        {/* Decorative background grid blur */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_50%)]" />
        
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            Ready to Transform Your School Grading?
          </h2>
          <p className="text-indigo-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Join thousands of administrators worldwide using our modern ERP tools to create automated progress reports in seconds.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://jids.in/register?src=schoolreportcard-bottom-cta"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-indigo-900 shadow-md hover:bg-indigo-50 hover:shadow-lg active:scale-[0.98] transition-all"
            >
              Get Started for Free
            </a>
            <Link
              href="/templates"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-indigo-200/30 hover:border-indigo-200 bg-indigo-950/20 px-8 text-base font-semibold text-indigo-100 hover:bg-indigo-950/40 active:scale-[0.98] transition-all"
            >
              Browse Template Gallery <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
