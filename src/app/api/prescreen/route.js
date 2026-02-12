import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import sendMail from "@/lib/mail";
import { uploadToR2, validatePrescreenFile } from "@/lib/r2";
import { sendWhatsApp } from "@/lib/whatsapp";
import env from "@/config/env";

function toE164(phone) {
    if (!phone || typeof phone !== "string") return "";
    const digits = phone.replace(/\D/g, "");
    return phone.trim().startsWith("+") ? `+${digits}` : digits ? `+${digits}` : phone.trim();
}

export async function POST(request) {
    try {
        const formData = await request.formData();

        // Step 1: Patient Details
        const patientName = formData.get("patientName");
        const gender = formData.get("gender");
        const dob = formData.get("dob");
        const age = formData.get("age");
        const country = formData.get("country");
        const city = formData.get("city");
        const nationality = formData.get("nationality");
        const phoneRaw = formData.get("phone");
        const phone = toE164(phoneRaw);
        const email = formData.get("email");
        const preferredComm = formData.get("preferredComm");

        // Step 2: Medical Condition
        const medicalConcern = formData.get("medicalConcern");
        const specificDiagnosis = formData.get("specificDiagnosis");
        const symptoms = formData.get("symptoms");
        const duration = formData.get("duration");
        const previousTreatment = formData.get("previousTreatment");
        const treatmentDetails = formData.get("treatmentDetails");
        const currentMedications = formData.get("currentMedications");
        const allergies = formData.get("allergies");
        const existingConditions = formData.get("existingConditions");

        // Step 4: Preferences
        const preferredCountry = formData.get("preferredCountry");
        const preferredCity = formData.get("preferredCity");
        const budgetRange = formData.get("budgetRange");
        const travelReadiness = formData.get("travelReadiness");
        const assistanceNeeded = formData.get("assistanceNeeded");

        const timestamp = formData.get("timestamp") || new Date().toISOString();

        // Validation
        if (!patientName || !email || !phone || !country || !gender || !dob) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: name, gender, DOB, email, WhatsApp, country." },
                { status: 400 }
            );
        }

        // File Uploads to Cloudflare R2
        const files = formData.getAll("files");
        const uploadedFileLinks = [];

        if (files && files.length > 0) {
            for (const file of files) {
                if (!file || !file.size) continue;
                const v = validatePrescreenFile(file);
                if (!v.ok) {
                    console.warn(`Skipping invalid file: ${file.name}, reason: ${v.reason}`);
                    continue;
                }
                try {
                    const url = await uploadToR2(file, "prescreen");
                    if (url) uploadedFileLinks.push({ name: file.name, url, size: file.size });
                } catch (uploadErr) {
                    console.error(`Failed to upload ${file.name}:`, uploadErr);
                }
            }
        }

        // Prepare structured data for storage
        const patientProfile = {
            name: patientName,
            gender,
            dob,
            age,
            country,
            city,
            nationality,
            phone,
            email,
            preferredComm,
        };

        const medicalCase = {
            concern: medicalConcern,
            specificDiagnosis,
            symptoms,
            duration,
            previousTreatment,
            treatmentDetails,
            currentMedications,
            allergies,
            existingConditions,
        };

        const preferences = {
            preferredCountry,
            preferredCity,
            budgetRange,
            travelReadiness,
            assistanceNeeded,
        };

        const fullData = {
            patient: patientProfile,
            medical: medicalCase,
            preferences,
            files: uploadedFileLinks,
            submittedAt: timestamp,
            consentData: true,
            consentDisclaimer: true,
        };

        // Save to Database
        const newLead = await prisma.lead.create({
            data: {
                name: patientName,
                email: email || null,
                phone: phone || null,
                source: "AI_PRESCREEN",
                message: JSON.stringify(fullData, null, 2)
            },
        });

        // Track notification status
        let emailSent = false;
        let whatsappSent = false;

        // Patient Email Confirmation
        if (email) {
            try {
                const emailResult = await sendMail({
                    to: email,
                    subject: `✅ AI Pre-Screening Request Received - Ref #${newLead.id}`,
                    html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                        <div style="background: linear-gradient(135deg, #066F89, #003459); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #fff; margin: 0; font-size: 24px;">AI Pre-Screening Request Received</h1>
                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">Reference ID: #${newLead.id}</p>
                        </div>
                        <div style="padding: 30px; background: #fff; border: 1px solid #e0e0e0; border-top: none;">
                            <p style="font-size: 16px; margin-bottom: 20px;">Dear <strong>${patientName}</strong>,</p>
                            <p style="font-size: 15px; line-height: 1.6; color: #555;">
                                Thank you for choosing <strong>Panacea Medcare</strong>. We have successfully received your AI Pre-Screening request along with ${uploadedFileLinks.length} medical document(s).
                            </p>
                            
                            <div style="background: #f8fafc; border-left: 4px solid #FF6B35; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                                <h3 style="margin: 0 0 15px; color: #003459; font-size: 16px;">⏱️ What Happens Next?</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
                                    <li>Our AI Engine is analyzing your medical information</li>
                                    <li>Our Medical Team will review and verify findings</li>
                                    <li><strong>You will receive your AI Pre-Screening Report within 2 hours</strong></li>
                                </ul>
                            </div>
                            
                            <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                                    📱 <strong>Report delivery:</strong> Email + WhatsApp (${phone})
                                </p>
                            </div>
                            
                            <p style="font-size: 14px; color: #888; margin-top: 30px;">
                                If you have any questions, reply to this email or WhatsApp us at +91 99588 00961.
                            </p>
                            
                            <div style="text-align: center; margin-top: 30px;">
                                <a href="https://panaceamedcare.com" style="display: inline-block; background: linear-gradient(135deg, #FF6B35, #e55a2b); color: #fff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 14px;">Visit Our Website</a>
                            </div>
                        </div>
                        <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
                            <p style="margin: 0; font-size: 12px; color: #888;">
                                © ${new Date().getFullYear()} Panacea Medcare. International Healthcare Facilitation.
                            </p>
                        </div>
                    </div>
                    `,
                });
                emailSent = !!emailResult;
            } catch (emailErr) {
                console.error("Patient email failed:", emailErr);
            }
        }

        // Patient WhatsApp Confirmation
        if (phone) {
            try {
                const whatsappResult = await sendWhatsApp(
                    phone,
                    `✅ *AI Pre-Screening Request Received*\n\nHello ${patientName},\n\nPanacea Medcare has received your AI Pre-Screening request.\n\n📋 *Reference ID:* #${newLead.id}\n📎 *Documents:* ${uploadedFileLinks.length} uploaded\n\n⏱️ You will receive your AI Pre-Screening Report within *2 hours* via Email and WhatsApp.\n\nThank you for choosing Panacea Medcare!`
                );
                whatsappSent = whatsappResult?.success || false;
            } catch (waErr) {
                console.error("Patient WhatsApp failed:", waErr);
            }
        }

        // Admin Notifications
        const adminEmail = process.env.FROM_EMAIL || "care@panaceamedcare.com";
        const adminPhone = toE164(process.env.ADMIN_PHONE_NUMBER || "919958800961");

        // Build file links HTML
        const filesHtml = uploadedFileLinks.length > 0
            ? `<div style="margin-top: 10px;">
                ${uploadedFileLinks.map((f, i) => `
                    <a href="${f.url}" target="_blank" style="display: inline-block; background: #e2e8f0; color: #066F89; padding: 10px 16px; text-decoration: none; border-radius: 6px; margin: 4px; font-size: 13px;">
                        📄 ${f.name || `Document ${i + 1}`}
                    </a>
                `).join('')}
               </div>`
            : '<p style="color: #999; font-size: 14px;">No files uploaded</p>';

        // Admin Email
        const adminEmailHtml = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
            <div style="background: linear-gradient(135deg, #FF6B35, #e55a2b); padding: 20px 25px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; color: #fff; font-size: 20px;">🔥 New AI Pre-Screening Lead</h2>
                <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Ref #${newLead.id} | ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="padding: 25px; background: #fff; border: 1px solid #ddd; border-top: none;">
                <h3 style="color: #066F89; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-top: 0;">👤 Patient Information</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
                    <tr><td style="padding: 8px 0; color: #666; width: 35%;"><strong>Name:</strong></td><td>${patientName}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Gender / Age:</strong></td><td>${gender} / ${age} years (DOB: ${dob})</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td><a href="https://wa.me/${phone.replace('+', '')}" style="color: #25D366; font-weight: bold;">${phone}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td><a href="mailto:${email}" style="color: #066F89;">${email}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Country:</strong></td><td>${country}${city ? `, ${city}` : ''}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Preferred Comm:</strong></td><td>${preferredComm || 'Not specified'}</td></tr>
                </table>

                <h3 style="color: #066F89; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">🏥 Medical Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
                    <tr><td style="padding: 8px 0; color: #666; width: 35%; vertical-align: top;"><strong>Primary Concern:</strong></td><td style="font-weight: bold; color: #c0392b;">${medicalConcern || '-'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Specific Diagnosis:</strong></td><td>${specificDiagnosis || '-'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Duration:</strong></td><td>${duration || '-'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Previous Treatment:</strong></td><td>${previousTreatment || '-'} ${treatmentDetails ? `<br><em style="color:#666;">${treatmentDetails}</em>` : ''}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Current Medications:</strong></td><td>${currentMedications || '-'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Allergies:</strong></td><td>${allergies || 'None reported'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Existing Conditions:</strong></td><td>${existingConditions || '-'}</td></tr>
                </table>
                
                <div style="background: #fffbf0; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f39c12;">
                    <h4 style="margin: 0 0 10px; color: #003459;">📝 Symptoms Description:</h4>
                    <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${symptoms || '-'}</p>
                </div>

                <h3 style="color: #066F89; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">✈️ Treatment Preferences</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
                    <tr><td style="padding: 8px 0; color: #666; width: 35%;"><strong>Preferred Country:</strong></td><td>${preferredCountry || 'India'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Preferred City:</strong></td><td>${preferredCity || '-'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Budget Range:</strong></td><td>${budgetRange || '-'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Travel Readiness:</strong></td><td>${travelReadiness || '-'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #666;"><strong>Assistance Needed:</strong></td><td>${assistanceNeeded || '-'}</td></tr>
                </table>

                <h3 style="color: #066F89; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">📎 Uploaded Documents (${uploadedFileLinks.length})</h3>
                ${filesHtml}
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #f0f0f0; text-align: center;">
                    <a href="${env.APP_URL || 'https://panaceamedcare.com'}/admin/leads" style="display: inline-block; background: #066F89; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">Open Admin Panel</a>
                    <a href="https://wa.me/${phone.replace('+', '')}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-left: 10px;">WhatsApp Patient</a>
                </div>
            </div>
            
            <div style="background: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #888;">
                Submitted: ${timestamp} | Email: ${emailSent ? '✅' : '❌'} | WhatsApp: ${whatsappSent ? '✅' : '❌'}
            </div>
        </div>
        `;

        try {
            await sendMail({
                to: adminEmail,
                subject: `🔥 AI Pre-Screening: ${patientName} - ${medicalConcern} [#${newLead.id}]`,
                html: adminEmailHtml,
            });
        } catch (adminEmailErr) {
            console.error("Admin email failed:", adminEmailErr);
        }

        // Admin WhatsApp
        if (adminPhone) {
            try {
                const adminLink = `${env.APP_URL || 'https://panaceamedcare.com'}/admin/leads`;
                const adminMsg = `🔥 *New AI Pre-Screening Lead*\n\n` +
                    `👤 *Patient:* ${patientName}\n` +
                    `⚧ *Gender/Age:* ${gender} / ${age} (DOB: ${dob})\n` +
                    `📞 *Phone:* ${phone}\n` +
                    `📧 *Email:* ${email}\n` +
                    `🌍 *Location:* ${city ? city + ', ' : ''}${country}\n\n` +
                    `🏥 *Medical Details:*\n` +
                    `• *Concern:* ${medicalConcern}\n` +
                    `• *Diagnosis:* ${specificDiagnosis || 'N/A'}\n` +
                    `• *Duration:* ${duration || 'N/A'}\n` +
                    `• *Prev. Tx:* ${previousTreatment || 'N/A'}\n` +
                    `• *Meds:* ${currentMedications || 'N/A'}\n` +
                    `• *Allergies:* ${allergies || 'N/A'}\n` +
                    `• *Conditions:* ${existingConditions || 'N/A'}\n\n` +
                    `📝 *Symptoms:* ${symptoms ? symptoms.substring(0, 200) + (symptoms.length > 200 ? '...' : '') : 'N/A'}\n\n` +
                    `✈️ *Preferences:*\n` +
                    `• *Country:* ${preferredCountry || 'India'}\n` +
                    `• *City:* ${preferredCity || 'Any'}\n\n` +
                    `📎 *Files:* ${uploadedFileLinks.length}\n` +
                    `🔗 *Full Details:* ${adminLink}\n\n` +
                    `#Ref: ${newLead.id}`;

                await sendWhatsApp(adminPhone, adminMsg);
            } catch (adminWaErr) {
                console.error("Admin WhatsApp failed:", adminWaErr);
            }
        }

        return NextResponse.json({
            success: true,
            id: newLead.id,
            emailSent,
            whatsappSent,
            message: "Pre-screening request submitted successfully"
        });

    } catch (error) {
        console.error("Prescreen API Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
