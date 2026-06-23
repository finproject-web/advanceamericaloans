import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BRAND_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${BRAND_NAME} — Personal Loans Made Simple`,
  description:
    'Apply for a personal loan in minutes. Secure, fast, and transparent lending with competitive rates.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
