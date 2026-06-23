'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const steps = [
  { id: 1, label: 'Loan Details' },
  { id: 2, label: 'Personal Info' },
  { id: 3, label: 'Address & Banking' },
]

interface ProgressIndicatorProps {
  currentStep: number
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted || isActive ? '#14b8a6' : '#f1f5f9',
                    borderColor: isCompleted || isActive ? '#14b8a6' : '#cbd5e1',
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                    isCompleted || isActive ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check size={18} strokeWidth={3} /> : step.id}
                </motion.div>
                <span
                  className={`mt-2 hidden text-xs font-semibold sm:block ${
                    isActive ? 'text-navy-900' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {!isLast && (
                <div className="mx-2 h-1 flex-1 rounded-full bg-slate-200 sm:mx-4">
                  <motion.div
                    initial={false}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    className="h-full rounded-full bg-accent-500"
                    transition={{ duration: 0.35 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
