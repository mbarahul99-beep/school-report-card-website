'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, FileSpreadsheet } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
            <FileSpreadsheet className="h-6 w-6 stroke-[2.5]" />
            <span className="font-sans font-bold text-xl tracking-tight text-zinc-900">
              SchoolReportCard<span className="text-indigo-600">.in</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link href="/templates" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
            Templates
          </Link>
          <Link href="/blog" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
            Blog
          </Link>
          <a href="https://docs.documentero.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
            Docs
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://jids.in/login" className="text-sm font-semibold text-zinc-700 hover:text-indigo-600 transition-colors">
            Sign In
          </a>
          <a
            href="https://jids.in/register"
            className="inline-flex h-9 items-center justify-center rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/10 active:scale-95 transition-all"
          >
            Start Free
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-4 py-4 space-y-3">
          <Link
            href="/#features"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-indigo-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/templates"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-indigo-600 transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-indigo-600 transition-colors"
          >
            Blog
          </Link>
          <a
            href="https://docs.documentero.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-2 text-base font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-indigo-600 transition-colors"
          >
            Docs
          </a>
          <div className="border-t border-zinc-100 pt-3 flex flex-col gap-2">
            <a
              href="https://jids.in/login"
              className="flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-base font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-indigo-600 transition-colors"
            >
              Sign In
            </a>
            <a
              href="https://jids.in/register"
              className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-505"
            >
              Start Free
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
