# Avant Finance — Personal Loan Website

A modern, professional personal loan application website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons
- Framer Motion

## Project Setup

```bash
npm install
npm run dev
```

The dev server will start at `http://localhost:3000`.

## Pages

- `/` — Home page with hero, trust badges, and features
- `/apply-now` — Multi-step loan application form
- `/success` — Submission confirmation screen

## Application Form

The form includes 3 steps:

1. **Loan Details** — Loan amount, monthly income, purpose
2. **Personal Information** — Name, email, phone, SSN, date of birth
3. **Address & Banking** — Address, bank details, ID upload, terms

Government ID front and back are required, converted to base64, and sent to Google Apps Script.

## Google Apps Script Integration

1. Open `google-apps-script.js`.
2. Replace `[ClientName]` placeholders with your client name.
3. Create a new Google Sheet with the tab name matching `SHEET_NAME`.
4. Add the headers listed in the script comments to row 1.
5. Paste the code into the Apps Script editor.
6. Deploy as a Web App (Execute as Me, Allow Anyone).
7. Copy the deployment URL into `src/lib/constants.ts` as `GOOGLE_SCRIPT_URL`.

## Deployment

> **Do not push to GitHub or deploy to Vercel until explicitly confirmed.**

When ready:

1. Update `GITHUB_REPO` in `src/lib/constants.ts`.
2. Push to the GitHub repository.
3. Connect Vercel to the repository for auto-deployment.

## Placeholder Checklist

Before going live, replace these placeholders:

- `BRAND_NAME` in `src/lib/constants.ts`
- `CLIENT_NAME` in `src/lib/constants.ts`
- `GOOGLE_SCRIPT_URL` in `src/lib/constants.ts`
- `GITHUB_REPO` in `src/lib/constants.ts`
- `[ClientName]` in `google-apps-script.js`
- Phone number and address in `src/components/Footer.tsx` and `src/components/Header.tsx`

## License

Private — for client use only.
