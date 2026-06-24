import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { BRAND_NAME, CONTACT_EMAIL } from '@/lib/constants'

const footerLinks = {
  Product: [
    { label: 'Personal Loans', href: '/apply-now' },
    { label: 'How It Works', href: '#' },
    { label: 'Rates & Fees', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Licenses', href: '#' },
    { label: 'Disclosures', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt={BRAND_NAME}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Fast, secure, and transparent personal loans. We are committed to helping you achieve your financial goals with confidence.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-400">
                <Phone size={16} className="text-accent-400" />
                <span>(464) 262-3906</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={16} className="text-accent-400" />
                <span>{CONTACT_EMAIL}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin size={16} className="mt-0.5 text-accent-400" />
                <span>222 W Merchandise Mart Plaza #1212<br />Chicago, IL 60654</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-accent-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved. Loans are subject to credit approval and underwriting criteria.
            {BRAND_NAME} is not a lender in all states.
          </p>
        </div>
      </div>
    </footer>
  )
}
