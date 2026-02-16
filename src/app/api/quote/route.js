import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import sendMail from "@/lib/mail";

export async function POST(request) {
    try {
        const data = await request.json();

        const { name, email, phone, treatment, message, hospital, source } = data;

        // Validation (only name and phone required, email optional)
        if (!name || !phone) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: name, phone." },
                { status: 400 }
            );
        }

        // Save to Database (email as 'N/A' if not provided)
        const newLead = await prisma.lead.create({
            data: {
                name,
                email: email || "N/A",
                phone: phone || null,
                source: source || "QUOTE_FORM",
                message: JSON.stringify({
                    treatment,
                    message,
                    hospital,
                    submittedAt: new Date().toISOString()
                }, null, 2)
            },
        });

        // Send confirmation email to patient
        if (email) {
            try {
                await sendMail({
                    to: email,
                    subject: `Quote Request Received - Ref #${newLead.id}`,
                    html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #066F89, #003459); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #fff; margin: 0;">Quote Request Received</h1>
                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Reference ID: #${newLead.id}</p>
                        </div>
                        <div style="padding: 30px; background: #fff; border: 1px solid #e0e0e0;">
                            <p>Dear <strong>${name}</strong>,</p>
                            <p>Thank you for your interest in <strong>${hospital || 'our services'}</strong>.</p>
                            <p>We have received your quote request and our team will get back to you within 24 hours with a personalized treatment plan and cost estimate.</p>
                            <div style="background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px;">
                                <h3 style="margin: 0 0 10px; color: #003459;">Your Request Details:</h3>
                                <p><strong>Treatment:</strong> ${treatment || 'Not specified'}</p>
                                <p><strong>Message:</strong> ${message || 'None'}</p>
                            </div>
                            <p style="color: #888; font-size: 14px;">If you have any questions, reply to this email or WhatsApp us at +91 99588 00961.</p>
                        </div>
                        <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; font-size: 12px; color: #888;">© ${new Date().getFullYear()} Panacea Medcare</p>
                        </div>
                    </div>
                    `,
                });
            } catch (emailErr) {
                console.error("Patient email failed:", emailErr);
            }
        }

        // WhatsApp notifications removed - Email only

        // Admin Email Notification
        const adminEmail = process.env.FROM_EMAIL || "care@panaceamedcare.com";
        try {
            await sendMail({
                to: adminEmail,
                subject: `🔥 New Quote Request: ${name} - ${hospital || 'General'} [#${newLead.id}]`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #FF6B35, #e55a2b); padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0; color: #fff;">🔥 New Quote Request</h2>
                        <p style="margin: 5px 0 0; color: rgba(255,255,255,0.9);">Ref #${newLead.id} | ${new Date().toLocaleString()}</p>
                    </div>
                    <div style="padding: 25px; background: #fff; border: 1px solid #ddd;">
                        <h3 style="color: #066F89; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">👤 Patient Information</h3>
                        <table style="width: 100%; margin-bottom: 20px;">
                            <tr><td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td><td>${name}</td></tr>
                            <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td><a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #25D366; font-weight: bold;">${phone}</a></td></tr>
                            <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td><a href="mailto:${email}" style="color: #066F89;">${email || 'N/A'}</a></td></tr>
                            <tr><td style="padding: 8px 0; color: #666;"><strong>Hospital:</strong></td><td>${hospital || 'Not specified'}</td></tr>
                            <tr><td style="padding: 8px 0; color: #666;"><strong>Treatment:</strong></td><td>${treatment || 'Not specified'}</td></tr>
                            <tr><td style="padding: 8px 0; color: #666;"><strong>Source:</strong></td><td>${source || 'Quote Form'}</td></tr>
                        </table>
                        <h3 style="color: #066F89; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">📝 Message</h3>
                        <p style="background: #f8fafc; padding: 15px; border-radius: 8px;">${message || 'No additional message'}</p>
                        <div style="margin-top: 30px; text-align: center;">
                            <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">WhatsApp Patient</a>
                        </div>
                    </div>
                </div>
                `,
            });
        } catch (adminEmailErr) {
            console.error("Admin email failed:", adminEmailErr);
        }

        // Admin WhatsApp removed - Email only

        return NextResponse.json({
            success: true,
            id: newLead.id,
            message: "Quote request submitted successfully"
        });

    } catch (error) {
        console.error("Quote API Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
