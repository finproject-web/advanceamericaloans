// ============================================================
// CLIENT CONFIGURATION — Replace placeholders with actual values
// ============================================================

export const BRAND_NAME = 'Avant Finance' as const
export const CLIENT_NAME = 'AvantFinance' as const
export const NOTIFICATION_EMAIL = 'finnfoxpersonalloan@gmail.com' as const
export const CONTACT_EMAIL = 'info@avantfinance.com' as const
export const SHEET_TAB_NAME = `${CLIENT_NAME} Applications` as const
export const SCRIPT_PROJECT_NAME = `${CLIENT_NAME} - Form Handler` as const

// Replace with your deployed Google Apps Script Web App URL after setup
export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwMnG_DmX3Y8d5HG5Cxas_fzEf8JXGDzgPAW1l2DLNwPXRxktTH3oPKkql7N_d06uQP/exec' as const

// Replace with your GitHub repository name when ready to deploy
export const GITHUB_REPO = 'https://github.com/finproject-web/avantfinance' as const

export const LOAN_PURPOSES = [
  'Debt Consolidation',
  'Credit Card Refinancing',
  'Home Improvement',
  'Medical Expenses',
  'Major Purchase',
  'Car Financing',
  'Business Expenses',
  'Vacation',
  'Other',
] as const

export const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const

export const MAX_FILE_SIZE_MB = 5 as const
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
] as const
