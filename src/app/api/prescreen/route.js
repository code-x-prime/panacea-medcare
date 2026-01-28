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
        // Email
        if (email) {
            await sendMail({
                to: email,
                subject: `AI Pre-Screening Request Received - ${patientName}`,
                html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>AI Pre-Screening Started</h2>
            <p>Dear ${patientName},</p>
            <p>Thank you for submitting your medical details. Our AI system is currently analyzing your case.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>We will review your reports.</li>
              <li>You will receive a preliminary report within 2 hours.</li>
              <li>A care coordinator may contact you via WhatsApp/Email.</li>
            </ul>
            <p>Reference ID: #${newLead.id}</p>
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

        const adminEmailContent = `
      <h2>New AI Pre-Screening Request</h2>
      <p><strong>Patient:</strong> ${patientName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Concern:</strong> ${medicalConcern}</p>
      <p><strong>Files:</strong> ${uploadedFileLinks.length}</p>
      <pre>${detailedMessage}</pre>
      <p>View in Admin Panel.</p>
    `;

        // Admin Email
        await sendMail({
            to: adminEmail,
            subject: `[New Lead] AI Pre-Screening - ${patientName}`,
            html: adminEmailContent,
            attachments: uploadedFileLinks.map((link, i) => ({
                filename: `Report-${i + 1}.pdf`, // Generic name, assuming PDF/Image
                path: link
            }))
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
