import { ShieldCheck, Clock, Lock, BadgeCheck } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'Bank-level security' },
  { icon: Clock, label: 'Fast decisions' },
  { icon: Lock, label: '256-bit encryption' },
  { icon: BadgeCheck, label: 'Trusted by 50,000+' },
]

export function TrustBadge() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-2">
          <badge.icon size={18} className="text-accent-400" />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  )
}
