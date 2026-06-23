'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { BRAND_NAME } from '@/lib/constants'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/apply-now', label: 'Apply Now' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt={BRAND_NAME}
            className="h-10 w-auto rounded-xl object-contain shadow-soft"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight text-navy-950">
              {BRAND_NAME}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Trusted Lending
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-navy-900' : 'text-slate-600 hover:text-navy-900'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="header-underline"
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent-500"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="tel:+14642623906" className="text-sm font-medium text-slate-600 hover:text-navy-900">
            (464) 262-3906
          </Link>
          <Link href="/apply-now" className="btn-primary">
            Apply Now
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-slate-100 bg-white px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${
                  pathname === link.href ? 'text-navy-900' : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/apply-now" className="btn-primary mt-2">
              Apply Now
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
