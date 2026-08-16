import Link from 'next/link'
import { FileSpreadsheet } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-12 md:py-16 text-zinc-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 text-indigo-600">
                <FileSpreadsheet className="h-6 w-6 stroke-[2.5]" />
                <span className="font-sans font-bold text-xl tracking-tight text-zinc-900">
                  SchoolReportCard<span className="text-indigo-600">.in</span>
                </span>
              </Link>
            </div>
            <p className="max-w-md text-sm text-zinc-500 leading-relaxed">
              Create professional student report cards, marksheets, and grading tables automatically. Built for modern schools, teachers, and coordinators.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#features" className="hover:text-indigo-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-indigo-600 transition-colors">
                  Templates Gallery
                </Link>
              </li>
              <li>
                <a href="https://jids.in/register" className="hover:text-indigo-600 transition-colors">
                  Try Builder Free
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-indigo-600 transition-colors">
                  SEO Blog
                </Link>
              </li>
              <li>
                <a href="https://docs.documentero.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://jids.in/support" className="hover:text-indigo-600 transition-colors">
                  Support Helpdesk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            &copy; {currentYear} SchoolReportCard.in. Powered by <a href="https://jids.in" className="hover:text-indigo-600 transition-colors underline">JIDS ERP</a>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="https://jids.in/privacy" className="hover:text-indigo-600 transition-colors">
              Privacy Policy
            </a>
            <a href="https://jids.in/terms" className="hover:text-indigo-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
