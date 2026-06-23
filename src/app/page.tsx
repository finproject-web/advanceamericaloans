'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Percent, Clock, ShieldCheck } from 'lucide-react'
import { TrustBadge } from '@/components/TrustBadge'
import { BRAND_NAME } from '@/lib/constants'

const features = [
  { icon: CheckCircle2, title: 'No Hidden Fees', desc: 'Transparent rates and terms, no surprises.' },
  { icon: Percent, title: 'Competitive Rates', desc: 'Personalized APRs based on your credit profile.' },
  { icon: Clock, title: 'Fast Funding', desc: 'Funds can be deposited as soon as the next business day.' },
  { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Your data is protected with bank-level encryption.' },
]

export default function HomePage() {
  return (
    <>
      <section className="gradient-hero relative overflow-hidden px-4 py-24 lg:py-32">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-navy-400/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent-200 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                </span>
                Now accepting applications
              </div>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white lg:text-6xl">
                Personal loans that<br />
                <span className="text-accent-400">move you forward.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
                Apply in minutes, get a decision fast, and borrow up to $50,000 with clear, upfront terms.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/apply-now" className="btn-primary px-8 py-4 text-base">
                  Apply Now
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link href="#how-it-works" className="btn-secondary px-8 py-4 text-base">
                  Learn More
                </Link>
              </div>
              <div className="mt-10">
                <TrustBadge />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-md">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-300">Loan Amount</span>
                    <span className="text-2xl font-bold text-white">$15,000</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-300">Estimated APR</span>
                    <span className="text-2xl font-bold text-accent-400">9.99%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Monthly Payment</span>
                    <span className="text-2xl font-bold text-white">$320</span>
                  </div>
                  <div className="rounded-2xl bg-accent-500/10 p-4 text-center text-sm text-accent-200">
                    This is an example. Your actual rate may differ.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 lg:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              A simple, three-step process designed to get you funded quickly and securely.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Apply Online', desc: 'Fill out our secure 3-step application in just a few minutes.' },
              { step: '02', title: 'Get Reviewed', desc: 'We review your information and verify your details quickly.' },
              { step: '03', title: 'Receive Funds', desc: 'If approved, funds can be deposited directly to your account.' },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="card text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-lg font-bold text-white shadow-soft">
                  {item.step}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 lg:text-4xl">
              Why choose {BRAND_NAME}?
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                  <feature.icon size={24} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-navy-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Ready to take the next step?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Apply today and see what you qualify for — it only takes a few minutes and won’t affect your credit score.
          </p>
          <Link href="/apply-now" className="btn-primary mt-8 inline-flex px-10 py-4 text-base">
            Start Your Application
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </>
  )
}
