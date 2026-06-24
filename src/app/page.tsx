'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Percent, Clock, ShieldCheck } from 'lucide-react'
import { TrustBadge } from '@/components/TrustBadge'
import { BRAND_NAME } from '@/lib/constants'

const services = [
  { title: 'Payday Loans', desc: 'Quick cash for unexpected expenses. Get funded within 24 hours with minimal paperwork.' },
  { title: 'Personal Loans', desc: 'Flexible loans for debt consolidation, medical bills, or any purpose you need.' },
  { title: 'Housing Finance', desc: 'Home purchase, renovation, or refinancing with competitive rates and terms.' },
  { title: 'Auto Loans', desc: 'Finance your new or used vehicle with flexible terms and fast approval.' },
  { title: 'Business Loans', desc: 'Working capital and expansion financing to grow your business.' },
  { title: 'Education Loans', desc: 'Invest in your future with affordable education financing options.' },
]

const features = [
  { icon: CheckCircle2, title: 'No Hidden Fees', desc: 'Transparent pricing, no penalties' },
  { icon: Percent, title: 'Competitive Rates', desc: 'Starting from 4% APR' },
  { icon: Clock, title: 'Fast Approval', desc: 'Decision within 24 hours' },
  { icon: ShieldCheck, title: 'Dedicated Support', desc: 'Personal loan advisor assigned' },
]

const stats = [
  { value: '$50M+', label: 'Loans Funded' },
  { value: '15K+', label: 'Happy Clients' },
  { value: '50', label: 'States Served' },
  { value: '4.9', label: 'Client Rating' },
]

const testimonials = [
  {
    name: 'Michael J.',
    loan: 'Personal Loan — $15,000',
    text: 'The process was incredibly smooth. I got approved within hours and the funds were in my account the next day. Highly recommend!'
  },
  {
    name: 'Sarah R.',
    loan: 'Home Improvement — $25,000',
    text: 'Best rates I found anywhere. The team was helpful and transparent throughout the entire process. No hidden surprises.'
  },
  {
    name: 'David W.',
    loan: 'Emergency Loan — $2,500',
    text: 'When I needed emergency funds, Avant Finance came through. Quick, easy, and professional. I felt supported every step of the way.'
  },
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
                Smart loans for a<br />
                <span className="text-accent-400">brighter future</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
                Personal loans from $500 to $50,000 with rates as low as 4% APR. Fast approval, no hidden fees, funds in 1-3 days.
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
                    <span className="text-sm text-slate-300">4% APR</span>
                    <span className="text-2xl font-bold text-white">As low as</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-300">24hrs</span>
                    <span className="text-2xl font-bold text-accent-400">Fast approval</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-sm text-slate-300">$0</span>
                    <span className="text-2xl font-bold text-white">Hidden fees</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Credit Score</span>
                    <span className="text-2xl font-bold text-white">No Impact</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 lg:text-4xl">
              Financing solutions tailored to your needs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Whether it's an emergency or a long-term goal, we have the right loan for you.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-navy-900">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.desc}</p>
                <Link href="/apply-now" className="mt-4 inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700">
                  Apply Now <ArrowRight size={16} className="ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 lg:text-4xl">
              Get funded in 3 simple steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Our streamlined process gets you from application to funded in as little as 24 hours.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Apply Online', desc: 'Complete our simple application in under 5 minutes. No paperwork, no hassle.' },
              { step: '02', title: 'Get Reviewed', desc: 'Our team reviews your application and contacts you with a decision within 24 hours.' },
              { step: '03', title: 'Receive Funds', desc: 'Once approved, funds are deposited directly into your bank account in 1-3 days.' },
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

      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 lg:text-4xl">
              Ready to take control of your finances?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Apply in minutes and get a decision within 24 hours. No hidden fees, no surprises — just straightforward lending.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link href="/apply-now" className="btn-primary inline-flex px-10 py-4 text-base">
              Apply Now
              <ArrowRight size={18} className="ml-2" />
            </Link>
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

      <section id="testimonials" className="bg-navy-900 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Trusted by thousands across America
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Real stories from real people who achieved their financial goals with {BRAND_NAME}.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md"
              >
                <p className="text-sm leading-relaxed text-slate-300">"{testimonial.text}"</p>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-slate-400">{testimonial.loan}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-accent-400 lg:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 lg:text-4xl">
              Common questions answered
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            <div className="card">
              <h3 className="text-base font-semibold text-navy-900">What credit score do I need?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We work with customers across the credit spectrum. While higher scores may qualify for better rates, we consider many factors beyond just your credit score. Our minimum requirement is typically a score of 580 or higher.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-navy-900">How long does the application take?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Our online application takes just 5-10 minutes to complete. You'll receive a decision within minutes in most cases. Once approved, funds are typically deposited to your account within 1-3 business days.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-navy-900">Will checking my rate affect my credit score?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                No, checking your rate with us uses a soft inquiry that does not impact your credit score. We only perform a hard credit check if you decide to proceed with a loan offer.
              </p>
            </div>
            <div className="card">
              <h3 className="text-base font-semibold text-navy-900">What are your interest rates?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Our rates range from 4% to 35% APR depending on your creditworthiness, loan amount, and term length. We offer competitive rates and transparent pricing with no hidden fees.
              </p>
            </div>
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
