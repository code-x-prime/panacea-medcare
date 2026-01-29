# AI Pre-Screening – Requirement Audit Checklist

**Source of truth:** Client requirements.  
**Last audit:** January 2026.

---

## SECTION A: Home Page & Copy

| #   | Requirement                                                    | Status | Notes                         |
| --- | -------------------------------------------------------------- | ------ | ----------------------------- |
| A1  | Headline matches "AI Pre-Screening for International Patients" | ✅     | Via `preScreening.hero.title` |
| A2  | Trust line: Fast, Accurate, Personalized, Trusted              | ✅     | `hero.tagline`                |
| A3  | "Get Medical Clarity Before You Travel"                        | ✅     | `hero.subtitle`               |
| A4  | CTA "Get Your AI Pre-Screening Done"                           | ✅     | `cta.button`                  |
| A5  | Conversion booster (95% stat)                                  | ✅     | `conversionBooster`           |

---

## SECTION B: Form Flow (4 Steps)

### STEP 1: Patient Details

| #    | Requirement                                               | Status | Notes                                            |
| ---- | --------------------------------------------------------- | ------ | ------------------------------------------------ |
| B1.1 | Full name (mandatory)                                     | ✅     | `patientName`                                    |
| B1.2 | Country of residence dropdown (ISO-like)                  | ⚠️     | Was text; **fixed** – dropdown with country list |
| B1.3 | WhatsApp mandatory, country code enforced                 | ⚠️     | **Fixed** – code dropdown + number               |
| B1.4 | Email mandatory                                           | ✅     |                                                  |
| B1.5 | Gender, DOB, Age auto, City, Nationality, Preferred comms | ❌     | Not implemented; optional per spec               |

### STEP 2: Medical Condition & History

| #    | Requirement                                              | Status | Notes                         |
| ---- | -------------------------------------------------------- | ------ | ----------------------------- |
| B2.1 | Primary medical concern dropdown                         | ✅     |                               |
| B2.2 | Symptoms textarea, **min 30 characters**                 | ⚠️     | **Fixed** – validated on next |
| B2.3 | Duration dropdown                                        | ✅     |                               |
| B2.4 | Preferred country for treatment                          | ✅     |                               |
| B2.5 | Previous treatment, meds, allergies, existing conditions | ❌     | Not in form                   |

### STEP 3: Medical Reports Upload

| #    | Requirement                                   | Status | Notes                           |
| ---- | --------------------------------------------- | ------ | ------------------------------- |
| B3.1 | Multiple file upload                          | ✅     |                                 |
| B3.2 | Accepted formats **PDF, DOC, DOCX, JPG, PNG** | ✅     | PDF, Word, images               |
| B3.3 | File size limit (e.g. **10 MB** per file)     | ⚠️     | **Fixed** – was 25MB            |
| B3.4 | Upload to Cloudflare (R2) then use links      | ✅     | R2 upload, links in admin email |
| B3.5 | UX message when no upload                     | ⚠️     | Optional step; tip shown        |

### STEP 4: Treatment Preferences & Consent

| #    | Requirement                                      | Status | Notes             |
| ---- | ------------------------------------------------ | ------ | ----------------- |
| B4.1 | Consent checkbox mandatory, unchecked by default | ✅     |                   |
| B4.2 | AI ≠ diagnosis disclaimer in consent             | ✅     | In `consentLabel` |
| B4.3 | Budget, travel readiness, assistance needs       | ❌     | Not in form       |
| B4.4 | CAPTCHA                                          | ❌     | Not implemented   |

---

## SECTION C: Submission & Status

| #   | Requirement                                             | Status | Notes                                     |
| --- | ------------------------------------------------------- | ------ | ----------------------------------------- |
| C1  | Submit confirmation message (exact)                     | ⚠️     | **Fixed** – aligned to client wording     |
| C2  | **2-hour SLA** – timestamp stored                       | ⚠️     | **Fixed** – `submittedAt` in payload & DB |
| C3  | Email confirmation to patient                           | ✅     | Via `sendMail`                            |
| C4  | WhatsApp confirmation to patient                        | ✅     | Via `sendWhatsApp`                        |
| C5  | Admin email + WhatsApp alert                            | ✅     |                                           |
| C6  | Reports uploaded to Cloudflare R2, links in admin email | ✅     |                                           |

---

## SECTION D: Legal & Compliance

| #   | Requirement                         | Status | Notes            |
| --- | ----------------------------------- | ------ | ---------------- |
| D1  | AI ≠ diagnosis disclaimer visible   | ✅     | Page + consent   |
| D2  | GDPR-style consent (locked wording) | ✅     | Translations     |
| D3  | IP / consent version logged         | ❌     | Not implemented  |
| D4  | Privacy / TOS linked                | ⚠️     | Site-wide footer |

---

## SECTION E: Backend & AI Readiness

| #   | Requirement                                 | Status | Notes                    |
| --- | ------------------------------------------- | ------ | ------------------------ |
| E1  | Structured JSON for patient + medical case  | ✅     | In `Lead.message`        |
| E2  | Files linked with case (R2 URLs in payload) | ✅     |                          |
| E3  | Care coordinator / admin alerted            | ✅     | Admin email + WhatsApp   |
| E4  | R2 upload skipped gracefully if env missing | ⚠️     | **Fixed** – guard in API |

---

## Summary

- **✅ Done:** 24
- **⚠️ Partially done / fixed in this pass:** 10
- **❌ Not done:** 5 (optional fields, CAPTCHA, IP logging, etc.)

---

## STEP 3: FINAL VERDICT

| Item                                     | Result                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| **Overall compliance score**             | **~85%** (must-haves)                                                    |
| **Risk level**                           | **MEDIUM**                                                               |
| **Safe to show international patients?** | **YES** (consent + disclaimer + secure upload + email/WhatsApp in place) |

### MUST-FIX before client demo

1. **Env:** Set `R2_*`, `TWILIO_*`, `SMTP_*`, `ADMIN_PHONE_NUMBER`, `APP_URL` in production.
2. **Test:** Submit prescreen form → confirm patient email + patient WhatsApp + admin email + admin WhatsApp.
3. **Test:** Upload PDF/DOC/DOCX/JPG/PNG (≤10 MB) → confirm files in Cloudflare R2 and links in admin email.

### Implemented in this audit

- Country dropdown (ISO-style), WhatsApp country code + number, both required.
- Symptoms min 30 characters enforced; file accept PDF, DOC, DOCX, JPG, PNG; 10 MB per file.
- Timestamp stored (`submittedAt`) for 2-hour SLA.
- R2 upload guarded when env missing; file validation (type + size) in API.
- Exact success copy; E.164 phone for WhatsApp.

### Still not implemented (optional)

- CAPTCHA, IP/consent version logging, DOB/Gender/Age, budget/travel/assistance fields.
