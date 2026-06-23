import { LoanForm } from '@/components/LoanForm'
import { Sidebar } from '@/components/Sidebar'
import { BRAND_NAME } from '@/lib/constants'

export const metadata = {
  title: `Apply Now — ${BRAND_NAME}`,
  description: 'Complete our secure online loan application in just 3 easy steps.',
}

export default function ApplyNowPage() {
  return (
    <>
      <section className="gradient-hero px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl text-center lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Apply for a Personal Loan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Complete the form below in three simple steps. Your information is secure and encrypted.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <LoanForm />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
