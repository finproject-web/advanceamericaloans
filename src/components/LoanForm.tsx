'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Loader2, AlertCircle } from 'lucide-react'
import { ProgressIndicator } from './ProgressIndicator'
import { FileUpload } from './FileUpload'
import {
  formatPhone,
  formatSSN,
  formatCurrency,
  stripCurrency,
} from '@/lib/utils'
import { GOOGLE_SCRIPT_URL, LOAN_PURPOSES, STATES } from '@/lib/constants'
import type { ApplicationFormData, FormErrors, FormStep } from '@/lib/types'

const initialData: ApplicationFormData = {
  loanAmount: '',
  monthlyIncome: '',
  loanPurpose: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  ssn: '',
  dateOfBirth: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  bankName: '',
  routingNumber: '',
  accountNumber: '',
  mobileBankingUsername: '',
  mobileBankingPassword: '',
  idFront: null,
  idBack: null,
  agreeTerms: false,
  agreePrivacy: false,
}

const inputVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export function LoanForm() {
  const router = useRouter()
  const [step, setStep] = useState<FormStep>(1)
  const [data, setData] = useState<ApplicationFormData>(initialData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const updateField = <K extends keyof ApplicationFormData>(
    field: K,
    value: ApplicationFormData[K]
  ) => {
    setData((prev: ApplicationFormData) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: FormErrors) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validateStep = (s: FormStep): boolean => {
    const e: FormErrors = {}

    if (s === 1) {
      const amount = Number(stripCurrency(data.loanAmount))
      if (!amount || amount < 2000) e.loanAmount = 'Loan amount must be at least $2,000'
      if (!data.monthlyIncome || Number(stripCurrency(data.monthlyIncome)) < 500) {
        e.monthlyIncome = 'Monthly income must be at least $500'
      }
      if (!data.loanPurpose) e.loanPurpose = 'Please select a loan purpose'
    }

    if (s === 2) {
      if (!data.firstName.trim()) e.firstName = 'First name is required'
      if (!data.lastName.trim()) e.lastName = 'Last name is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email'
      if (data.phone.replace(/\D/g, '').length !== 10) e.phone = 'Please enter a valid phone number'
      if (data.ssn.replace(/\D/g, '').length !== 9) e.ssn = 'Please enter a valid SSN'
      if (!data.dateOfBirth) e.dateOfBirth = 'Date of birth is required'
    }

    if (s === 3) {
      if (!data.address.trim()) e.address = 'Address is required'
      if (!data.city.trim()) e.city = 'City is required'
      if (!data.state) e.state = 'State is required'
      if (!/^\d{5}$/.test(data.zipCode)) e.zipCode = 'ZIP code must be exactly 5 digits'
      if (!data.bankName.trim()) e.bankName = 'Bank name is required'
      if (!/^\d{9}$/.test(data.routingNumber)) e.routingNumber = 'Routing number must be exactly 9 digits'
      if (!data.accountNumber.trim()) e.accountNumber = 'Account number is required'
      if (data.accountNumber.replace(/\D/g, '').length > 20) e.accountNumber = 'Account number must be 20 digits or fewer'
      if (!data.agreeTerms) e.agreeTerms = 'You must agree to the terms'
      if (!data.agreePrivacy) e.agreePrivacy = 'You must agree to the privacy policy'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev: FormStep) => (prev < 3 ? ((prev + 1) as FormStep) : prev))
    }
  }

  const prevStep = () => {
    setStep((prev: FormStep) => (prev > 1 ? ((prev - 1) as FormStep) : prev))
    setSubmitError('')
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return
    setSubmitting(true)
    setSubmitError('')

    try {
      const payload = {
        ...data,
        idFront: data.idFront
          ? {
              name: data.idFront.name,
              type: data.idFront.type,
              base64: data.idFront.base64,
            }
          : null,
        idBack: data.idBack
          ? {
              name: data.idBack.name,
              type: data.idBack.type,
              base64: data.idBack.base64,
            }
          : null,
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
      })

      // no-cors hides response details, so we navigate optimistically
      router.push('/success')
    } catch (err) {
      setSubmitError('Submission failed. Please check your connection and try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <ProgressIndicator currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="card space-y-6"
          >
            <h2 className="text-xl font-semibold text-navy-900">Loan Details</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="label-text">Loan Amount</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="$10,000"
                  className="input-field"
                  value={data.loanAmount}
                  onChange={(e) => updateField('loanAmount', formatCurrency(e.target.value))}
                />
                {errors.loanAmount && <p className="mt-1.5 text-xs text-red-600">{errors.loanAmount}</p>}
              </div>
              <div>
                <label className="label-text">Monthly Income</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="$5,000"
                  className="input-field"
                  value={data.monthlyIncome}
                  onChange={(e) => updateField('monthlyIncome', formatCurrency(e.target.value))}
                />
                {errors.monthlyIncome && <p className="mt-1.5 text-xs text-red-600">{errors.monthlyIncome}</p>}
              </div>
            </div>
            <div>
              <label className="label-text">Loan Purpose</label>
              <select
                className="input-field"
                value={data.loanPurpose}
                onChange={(e) => updateField('loanPurpose', e.target.value)}
              >
                <option value="">Select a purpose</option>
                {LOAN_PURPOSES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.loanPurpose && <p className="mt-1.5 text-xs text-red-600">{errors.loanPurpose}</p>}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="card space-y-6"
          >
            <h2 className="text-xl font-semibold text-navy-900">Personal Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="label-text">First Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                />
                {errors.firstName && <p className="mt-1.5 text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label className="label-text">Last Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                />
                {errors.lastName && <p className="mt-1.5 text-xs text-red-600">{errors.lastName}</p>}
              </div>
              <div>
                <label className="label-text">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="label-text">Phone Number</label>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  className="input-field"
                  value={data.phone}
                  onChange={(e) => updateField('phone', formatPhone(e.target.value))}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <label className="label-text">Social Security Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="XXX-XX-XXXX"
                  className="input-field"
                  value={data.ssn}
                  onChange={(e) => updateField('ssn', formatSSN(e.target.value))}
                />
                {errors.ssn && <p className="mt-1.5 text-xs text-red-600">{errors.ssn}</p>}
              </div>
              <div>
                <label className="label-text">Date of Birth</label>
                <input
                  type="date"
                  className="input-field"
                  value={data.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                />
                {errors.dateOfBirth && <p className="mt-1.5 text-xs text-red-600">{errors.dateOfBirth}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="card space-y-6"
          >
            <h2 className="text-xl font-semibold text-navy-900">Address & Banking</h2>

            <div className="space-y-4">
              <label className="label-text">Home Address</label>
              <input
                type="text"
                className="input-field"
                value={data.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
              {errors.address && <p className="text-xs text-red-600">{errors.address}</p>}
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="label-text">City</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.city}
                  onChange={(e) => updateField('city', e.target.value)}
                />
                {errors.city && <p className="mt-1.5 text-xs text-red-600">{errors.city}</p>}
              </div>
              <div>
                <label className="label-text">State</label>
                <select
                  className="input-field"
                  value={data.state}
                  onChange={(e) => updateField('state', e.target.value)}
                >
                  <option value="">Select state</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="mt-1.5 text-xs text-red-600">{errors.state}</p>}
              </div>
              <div>
                <label className="label-text">ZIP Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  placeholder="12345"
                  className="input-field"
                  value={data.zipCode}
                  onChange={(e) => updateField('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                />
                {errors.zipCode && <p className="mt-1.5 text-xs text-red-600">{errors.zipCode}</p>}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="label-text">Bank Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={data.bankName}
                  onChange={(e) => updateField('bankName', e.target.value)}
                />
                {errors.bankName && <p className="mt-1.5 text-xs text-red-600">{errors.bankName}</p>}
              </div>
              <div>
                <label className="label-text">Routing Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={9}
                  placeholder="9 digits"
                  className="input-field"
                  value={data.routingNumber}
                  onChange={(e) => updateField('routingNumber', e.target.value.replace(/\D/g, '').slice(0, 9))}
                />
                {errors.routingNumber && <p className="mt-1.5 text-xs text-red-600">{errors.routingNumber}</p>}
              </div>
              <div>
                <label className="label-text">Account Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={20}
                  className="input-field"
                  value={data.accountNumber}
                  onChange={(e) => updateField('accountNumber', e.target.value.replace(/\D/g, '').slice(0, 20))}
                />
                {errors.accountNumber && <p className="mt-1.5 text-xs text-red-600">{errors.accountNumber}</p>}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="label-text">
                  Mobile Banking Username <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  value={data.mobileBankingUsername}
                  onChange={(e) => updateField('mobileBankingUsername', e.target.value)}
                />
              </div>
              <div>
                <label className="label-text">
                  Mobile Banking Password <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  value={data.mobileBankingPassword}
                  onChange={(e) => updateField('mobileBankingPassword', e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FileUpload
                label="Government ID — Front Side (optional)"
                value={data.idFront}
                onChange={(file) => updateField('idFront', file)}
                error={errors.idFront}
              />
              <FileUpload
                label="Government ID — Back Side (optional)"
                value={data.idBack}
                onChange={(file) => updateField('idBack', file)}
                error={errors.idBack}
              />
            </div>

            <div className="space-y-3 rounded-xl bg-slate-50 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-accent-600 focus:ring-accent-500"
                  checked={data.agreeTerms}
                  onChange={(e) => updateField('agreeTerms', e.target.checked)}
                />
                <span className="text-sm text-slate-600">
                  I agree to the <a href="#" className="font-medium text-accent-700 underline">Terms of Use</a> and{' '}
                  <a href="#" className="font-medium text-accent-700 underline">Electronic Disclosure</a>.
                </span>
              </label>
              {errors.agreeTerms && <p className="text-xs text-red-600">{errors.agreeTerms}</p>}

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-accent-600 focus:ring-accent-500"
                  checked={data.agreePrivacy}
                  onChange={(e) => updateField('agreePrivacy', e.target.checked)}
                />
                <span className="text-sm text-slate-600">
                  I agree to the <a href="#" className="font-medium text-accent-700 underline">Privacy Policy</a> and consent to receive communications.
                </span>
              </label>
              {errors.agreePrivacy && <p className="text-xs text-red-600">{errors.agreePrivacy}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {submitError && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          {submitError}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} className="mr-1" />
          Back
        </button>

        {step < 3 ? (
          <button type="button" onClick={nextStep} className="btn-primary">
            Continue
            <ChevronRight size={18} className="ml-1" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary min-w-[140px]"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
