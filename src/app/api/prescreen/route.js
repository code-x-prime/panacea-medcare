import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import sendMail from "@/lib/mail";
import { uploadToR2 } from "@/lib/r2";
import { sendWhatsApp } from "@/lib/whatsapp";
import env from "@/config/env";

export async function POST(request) {
    try {
        const formData = await request.formData();

        // Extract Patient Details
        const patientName = formData.get("patientName");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const country = formData.get("country");
        const preferredCountry = formData.get("preferredCountry");

        // Extract Medical Details
        const medicalConcern = formData.get("medicalConcern");
        const symptoms = formData.get("symptoms");
        const duration = formData.get("duration");
        const history = formData.get("history");

        // Extract Files
        const files = formData.getAll("files");

        // 1. Upload Files to R2
        const uploadedFileLinks = [];
        if (files && files.length > 0) {
            for (const file of files) {
                if (file.size > 0) {
                    try {
                        const url = await uploadToR2(file, "prescreen");
                        if (url) uploadedFileLinks.push(url);
                    } catch (err) {
                        console.error("File upload failed:", err);
                    }
                }
            }
        }

        // 2. Prepare Data for Database (Serialize complex data into 'message')
        const detailedMessage = JSON.stringify({
            country,
            preferredCountry,
            medicalConcern,
            symptoms,
            duration,
            history,
            files: uploadedFileLinks
        }, null, 2);

        // 3. Save to Database (Reuse Lead model)
        const newLead = await prisma.lead.create({
            data: {
                name: patientName,
                email: email || null,
                phone: phone || null,
                source: "AI_PRESCREEN",
                message: detailedMessage
            },
        });

        // 4. Send Confirmation to Patient
        // Email Template for Patient
        if (email) {
            await sendMail({
                to: email,
                subject: `Submission Received: AI Pre-Screening Request #${newLead.id}`,
                html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #066F89; padding: 20px; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Pre-Screening Request Received</h2>
                    </div>
                    <div style="padding: 30px;">
                        <p style="font-size: 16px;">Dear <strong>${patientName}</strong>,</p>
                        <p style="font-size: 16px; line-height: 1.6;">Thank you for trusting Panacea Medcare. We have successfully received your medical details and files.</p>
                        
                        <div style="background-color: #f7fafc; border-left: 4px solid #066F89; padding: 15px; margin: 20px 0;">
                            <p style="margin: 0; font-weight: bold; color: #066F89;">Application Reference ID: #${newLead.id}</p>
                        </div>
                        
                        <p style="font-size: 16px; font-weight: bold;">What Happens Next?</p>
                        <ul style="font-size: 15px; line-height: 1.6; color: #555;">
                            <li style="margin-bottom: 10px;">Our AI Analysis Engine is reviewing your submission.</li>
                            <li style="margin-bottom: 10px;">Our Medical Team will verify the findings.</li>
                            <li style="margin-bottom: 10px;">You will receive a <strong>Preliminary Assessment Report</strong> within 2 hours via Email or WhatsApp.</li>
                        </ul>
                        
                        <a href="https://panaceamedcare.com" style="display: inline-block; background-color: #FF6B35; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold; margin-top: 20px;">Visit Website</a>
                    </div>
                    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
                        &copy; ${new Date().getFullYear()} Panacea Medcare. All rights reserved.
                    </div>
                </div>
                `,
            });
        }

        // WhatsApp
        if (phone) {
            // Fallback or Both logic: We try to send. If failed, it logs.
            await sendWhatsApp(phone, `Hello ${patientName}, Panacea Medcare has received your AI Pre-Screening request (Ref: #${newLead.id}). Our team is analyzing your case and will send a report shortly.`);
        }

        // 5. Notify Admin (Email + WhatsApp)
        const adminEmail = process.env.FROM_EMAIL || "care@panaceamedcare.com"; // Fallback
        const adminPhone = process.env.ADMIN_PHONE_NUMBER || "919958800961"; // Fallback

        // Admin Email Template
        const uploadedFilesHtml = uploadedFileLinks.length > 0
            ? `<ul style="list-style-type: none; padding: 0;">${uploadedFileLinks.map((link, i) => `
                <li style="margin-bottom: 8px;">
                    <a href="${link}" target="_blank" style="background-color: #e2e8f0; color: #066F89; padding: 8px 12px; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 14px;">
                        📄 View Document ${i + 1}
                    </a>
                </li>`).join('')}</ul>`
            : '<span style="color: #999;">No files uploaded</span>';

        const adminEmailContent = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333; border: 1px solid #ddd; border-top: 5px solid #FF6B35;">
            <div style="padding: 20px; border-bottom: 1px solid #eee;">
                <h2 style="margin: 0; color: #066F89;">New AI Pre-Screening Lead</h2>
                <p style="margin: 5px 0 0; color: #666; font-size: 14px;">Ref ID: <strong>#${newLead.id}</strong> | Source: Web Form</p>
            </div>
            
            <div style="padding: 20px;">
                <h3 style="color: #444; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; margin-top: 0;">👤 Patient Information</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 8px 0; width: 40%; color: #666;"><strong>Name:</strong></td>
                        <td style="padding: 8px 0;">${patientName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                        <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #066F89;">${phone}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #066F89;">${email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;"><strong>Country of Residence:</strong></td>
                        <td style="padding: 8px 0;">${country || "Not specified"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666;"><strong>Preferred Destination:</strong></td>
                        <td style="padding: 8px 0;">${preferredCountry || "Not specified"}</td>
                    </tr>
                </table>

                <h3 style="color: #444; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">🏥 Medical Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                        <td style="padding: 8px 0; width: 40%; color: #666; vertical-align: top;"><strong>Medical Concern:</strong></td>
                        <td style="padding: 8px 0; vertical-align: top;">${medicalConcern || "-"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Duration:</strong></td>
                        <td style="padding: 8px 0; vertical-align: top;">${duration || "-"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>History:</strong></td>
                        <td style="padding: 8px 0; vertical-align: top;">${history || "-"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Symptoms:</strong></td>
                        <td style="padding: 8px 0; vertical-align: top; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${symptoms || "-"}</td>
                    </tr>
                </table>

                <h3 style="color: #444; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">📎 Attached Documents</h3>
                ${uploadedFilesHtml}
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                    <a href="${env.APP_URL || 'https://panaceamedcare.com'}/admin/leads" style="background-color: #066F89; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Admin Panel</a>
                </div>
            </div>
        </div>
        `;

        await sendMail({
            to: adminEmail,
            subject: `🔥 New Lead: ${patientName} - ${medicalConcern}`,
            html: adminEmailContent,
        });

        // Admin WhatsApp
        await sendWhatsApp(adminPhone, `New AI Lead: ${patientName} (${phone}). Check Email for details.`);


        return NextResponse.json({
            success: true,
            id: newLead.id,
            message: "Pre-screening request submitted successfully"
        });

    } catch (error) {
        console.error("Prescreen API Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
