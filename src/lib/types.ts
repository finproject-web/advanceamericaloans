export type LoanPurpose = typeof import('./constants').LOAN_PURPOSES[number]
export type StateCode = typeof import('./constants').STATES[number]

export interface UploadedFile {
  file: File
  base64: string
  name: string
  size: number
  type: string
}

export interface ApplicationFormData {
  // Step 1 — Loan Details
  loanAmount: string
  monthlyIncome: string
  loanPurpose: string

  // Step 2 — Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  ssn: string
  dateOfBirth: string

  // Step 3 — Address & Banking
  address: string
  city: string
  state: string
  zipCode: string
  bankName: string
  routingNumber: string
  accountNumber: string
  mobileBankingUsername: string
  mobileBankingPassword: string
  idFront: UploadedFile | null
  idBack: UploadedFile | null
  agreeTerms: boolean
  agreePrivacy: boolean
}

export interface FormErrors {
  [key: string]: string
}

export type FormStep = 1 | 2 | 3
