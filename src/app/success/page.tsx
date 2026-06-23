import Link from 'next/link'
import { CheckCircle2, ArrowLeft, FileText } from 'lucide-react'
import { BRAND_NAME } from '@/lib/constants'

export const metadata = {
  title: `Application Submitted — ${BRAND_NAME}`,
  description: 'Your loan application has been submitted successfully.',
}

export default function SuccessPage() {
  return (
    <section className="flex min-h-[calc(100vh-300px)] items-center justify-center bg-slate-50 px-4 py-20">
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="card space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-navy-900">
            Application Submitted
          </h1>
          <p className="mx-auto max-w-md text-slate-600">
            Thank you for applying with {BRAND_NAME}. We have received your information and will review it shortly.
            You can expect a response within one business day.
          </p>

          <div className="rounded-2xl bg-slate-50 p-5 text-left">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              <FileText size={18} />
              What happens next?
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500" />
                Our team will review your application and documents.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500" />
                You may receive a follow-up email or phone call for verification.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500" />
                If approved, you will receive your loan offer and next steps.
              </li>
            </ul>
          </div>

          <Link href="/" className="btn-secondary inline-flex w-full sm:w-auto">
            <ArrowLeft size={18} className="mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    </section>
  )
}
