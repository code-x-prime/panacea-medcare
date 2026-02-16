import { NextResponse } from "next/server";
import sendMail from "@/lib/mail";
import env from "@/config/env";
import { CONTACT_CONFIG } from "@/config/contact";

function toE164(phone) {
    if (!phone || typeof phone !== "string") return "";
    const digits = phone.replace(/\D/g, "");
    return phone.trim().startsWith("+") ? `+${digits}` : digits ? `+${digits}` : phone.trim();
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, phone, email, message, doctorName, doctorSpecialty, hospitalName, timestamp } = body;

        // Validate required fields (email optional)
        if (!name || !phone) {
            return NextResponse.json(
                { success: false, message: "Name and phone are required" },
                { status: 400 }
            );
        }

        // Validate email format only if provided
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { success: false, message: "Please enter a valid email address" },
                    { status: 400 }
                );
            }
        }

        // Format date nicely in IST
        const now = new Date(timestamp || Date.now());
        const formattedDate = now.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const formattedTime = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Professional Email Template
        const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #066F89 0%, #055a70 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">🏥 New Booking Request!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Someone wants to book an appointment</p>
        </div>

        <!-- Alert Badge -->
        <div style="padding: 20px 30px 0 30px;">
            <div style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%); color: white; padding: 12px 20px; border-radius: 8px; text-align: center; font-weight: 600;">
                ⚡ New Lead - Respond within 1 hour for best conversion
            </div>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
            
            <!-- Patient Details Card -->
            <div style="background-color: #f8fafb; border-radius: 10px; padding: 25px; border-left: 4px solid #066F89; margin-bottom: 20px;">
                <h2 style="color: #066F89; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">👤 Patient Information</h2>
                
                <!-- Name -->
                <div style="margin-bottom: 20px;">
                    <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Full Name</p>
                    <p style="color: #1a1a1a; font-size: 18px; margin: 0; font-weight: 600;">${name}</p>
                </div>
                
                <!-- Phone -->
                <div style="margin-bottom: 20px;">
                    <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">📞 Phone Number</p>
                    <a href="tel:${phone}" style="color: #066F89; font-size: 18px; font-weight: 600; text-decoration: none;">${phone}</a>
                </div>
                
                <!-- Email -->
                <div style="margin-bottom: 0;">
                    <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">✉️ Email Address</p>
                    <a href="mailto:${email || 'N/A'}" style="color: #066F89; font-size: 16px; font-weight: 600; text-decoration: none;">${email || 'N/A'}</a>
                </div>
            </div>

            ${doctorName || hospitalName ? `
            <!-- Appointment Details Card -->
            <div style="background-color: #e8f5f7; border-radius: 10px; padding: 25px; border-left: 4px solid #0891b2; margin-bottom: 20px;">
                <h2 style="color: #066F89; margin: 0 0 20px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">📋 Appointment Details</h2>
                
                ${doctorName ? `
                <div style="margin-bottom: 15px;">
                    <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">🩺 Doctor</p>
                    <p style="color: #1a1a1a; font-size: 18px; margin: 0; font-weight: 600;">${doctorName}</p>
                </div>
                ` : ''}
                
                ${doctorSpecialty ? `
                <div style="margin-bottom: 15px;">
                    <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">🔬 Specialty</p>
                    <p style="color: #1a1a1a; font-size: 16px; margin: 0; font-weight: 600;">${doctorSpecialty}</p>
                </div>
                ` : ''}
                
                ${hospitalName ? `
                <div style="margin-bottom: 0;">
                    <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">🏥 Hospital</p>
                    <p style="color: #1a1a1a; font-size: 16px; margin: 0; font-weight: 600;">${hospitalName}</p>
                </div>
                ` : ''}
            </div>
            ` : ''}

            ${message ? `
            <!-- Message Card -->
            <div style="background-color: #fef3c7; border-radius: 10px; padding: 25px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
                <h2 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">💬 Patient Message</h2>
                <p style="color: #78350f; font-size: 15px; margin: 0; line-height: 1.6;">${message}</p>
            </div>
            ` : ''}
            
            <!-- Action Buttons -->
            <div style="margin-top: 25px; text-align: center;">
                <a href="tel:${phone}" style="display: inline-block; background-color: #066F89; color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px; font-size: 14px;">📞 Call Patient</a>
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; background-color: #25D366; color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px; font-size: 14px;">💬 WhatsApp</a>
                <a href="mailto:${email}" style="display: inline-block; background-color: #6366f1; color: white; padding: 14px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px; font-size: 14px;">✉️ Email Reply</a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f0f4f5; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 13px; margin: 0 0 5px 0;">🕐 Received: ${formattedDate} at ${formattedTime} (IST)</p>
            <p style="color: #999; font-size: 11px; margin: 0;">This is an automated notification from ${env.NEXT_PUBLIC_SITE_NAME || CONTACT_CONFIG.companyName}</p>
        </div>
    </div>
</body>
</html>
        `;

        // Notification Status
        let emailSent = false;
        let whatsappSent = false;

        // --- 1. Email to Admin ---
        try {
            const emailResult = await sendMail({
                to: env.FROM_EMAIL || CONTACT_CONFIG.adminEmail,
                subject: `🏥 New Booking: ${doctorName || hospitalName || "General"} - ${name}`,
                html: emailHTML
            });
            emailSent = !!emailResult;
            if (!emailSent) console.error("Failed to send booking email");
        } catch (emailErr) {
            console.error("Booking Email Error:", emailErr);
        }

        // WhatsApp notifications removed - Email only

        return NextResponse.json({
            success: true,
            emailSent,
            message: "Booking request submitted successfully"
        });

    } catch (error) {
        console.error("Booking API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "We couldn't process your request. Please try again or contact us directly."
            },
            { status: 500 }
        );
    }
}
