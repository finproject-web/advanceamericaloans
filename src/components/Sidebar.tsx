'use client'

import { ShieldCheck, Zap, DollarSign, HeadphonesIcon } from 'lucide-react'

const cards = [
  {
    icon: ShieldCheck,
    title: 'Secure Application',
    description: '256-bit encryption protects your personal and financial information at every step.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: Zap,
    title: 'Quick Process',
    description: 'Complete your application in under 5 minutes. Get a decision as soon as the next business day.',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    icon: DollarSign,
    title: 'Loan Range',
    description: 'Borrow from $2,000 to $50,000 with flexible repayment terms that fit your budget.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: HeadphonesIcon,
    title: 'Need Help?',
    description: 'Speak with our support team at (464) 262-3906, Monday – Friday, 9 AM – 6 PM ET.',
    color: 'bg-violet-50 text-violet-700',
  },
]

export function Sidebar() {
  return (
    <div className="space-y-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="card p-5 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-start gap-4">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.color}`}>
              <card.icon size={22} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-navy-900">{card.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{card.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
