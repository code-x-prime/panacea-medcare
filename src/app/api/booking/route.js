import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT_CONFIG } from "@/config/contact";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, phone, email, message, doctorName, doctorSpecialty, hospitalName, timestamp } = body;

        // Validate required fields
        if (!name || !phone || !email) {
            return NextResponse.json(
                { success: false, message: "Name, phone, and email are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address" },
                { status: 400 }
            );
        }

        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Email credentials not configured. Set EMAIL_USER and EMAIL_PASS in .env.local");
            // Still return success to user but log the issue
            console.log("Booking Request (Email not sent - credentials missing):", {
                name, phone, email, doctorName, hospitalName, message, timestamp
            });
            return NextResponse.json({
                success: true,
                message: "Booking request received successfully"
            });
        }

        // Create transporter - Using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Format date nicely
        const formattedDate = new Date(timestamp).toLocaleString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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
<body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #066f89 0%, #0891b2 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                                🏥 New Booking Request
                            </h1>
                            <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                                ${CONTACT_CONFIG.companyName}
                            </p>
                        </td>
                    </tr>

                    <!-- Alert Badge -->
                    <tr>
                        <td style="padding: 20px 40px 0 40px;">
                            <div style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%); color: white; padding: 12px 20px; border-radius: 8px; text-align: center; font-weight: 600;">
                                ⚡ New Lead - Respond within 1 hour for best conversion
                            </div>
                        </td>
                    </tr>

                    <!-- Patient Details Section -->
                    <tr>
                        <td style="padding: 30px 40px 20px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #066f89; font-size: 18px; border-bottom: 2px solid #066f89; padding-bottom: 10px;">
                                👤 Patient Information
                            </h2>
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <span style="color: #6b7280; font-size: 13px; display: block;">Full Name</span>
                                        <span style="color: #1f2937; font-size: 16px; font-weight: 600;">${name}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <span style="color: #6b7280; font-size: 13px; display: block;">Phone Number</span>
                                        <a href="tel:${phone}" style="color: #066f89; font-size: 16px; font-weight: 600; text-decoration: none;">
                                            📞 ${phone}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                        <span style="color: #6b7280; font-size: 13px; display: block;">Email Address</span>
                                        <a href="mailto:${email}" style="color: #066f89; font-size: 16px; font-weight: 600; text-decoration: none;">
                                            ✉️ ${email}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${doctorName || hospitalName ? `
                    <!-- Appointment Details Section -->
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #066f89; font-size: 18px; border-bottom: 2px solid #066f89; padding-bottom: 10px;">
                                📋 Appointment Details
                            </h2>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 12px; padding: 20px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        ${doctorName ? `
                                        <div style="margin-bottom: 15px;">
                                            <span style="color: #6b7280; font-size: 13px; display: block;">Doctor</span>
                                            <span style="color: #1f2937; font-size: 16px; font-weight: 600;">🩺 ${doctorName}</span>
                                        </div>
                                        ` : ''}
                                        ${doctorSpecialty ? `
                                        <div style="margin-bottom: 15px;">
                                            <span style="color: #6b7280; font-size: 13px; display: block;">Specialty</span>
                                            <span style="color: #1f2937; font-size: 16px; font-weight: 600;">🔬 ${doctorSpecialty}</span>
                                        </div>
                                        ` : ''}
                                        ${hospitalName ? `
                                        <div>
                                            <span style="color: #6b7280; font-size: 13px; display: block;">Hospital</span>
                                            <span style="color: #1f2937; font-size: 16px; font-weight: 600;">🏥 ${hospitalName}</span>
                                        </div>
                                        ` : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ''}

                    ${message ? `
                    <!-- Message Section -->
                    <tr>
                        <td style="padding: 0 40px 20px 40px;">
                            <h2 style="margin: 0 0 20px 0; color: #066f89; font-size: 18px; border-bottom: 2px solid #066f89; padding-bottom: 10px;">
                                💬 Patient Message
                            </h2>
                            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 0 8px 8px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 15px; line-height: 1.6;">${message}</p>
                            </div>
                        </td>
                    </tr>
                    ` : ''}

                    <!-- Quick Action Buttons -->
                    <tr>
                        <td style="padding: 10px 40px 30px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding-right: 10px;" width="50%">
                                        <a href="tel:${phone}" style="display: block; background: #066f89; color: white; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                                            📞 Call Patient
                                        </a>
                                    </td>
                                    <td align="center" style="padding-left: 10px;" width="50%">
                                        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="display: block; background: #25d366; color: white; padding: 14px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                                            💬 WhatsApp
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 20px 40px; border-top: 1px solid #e5e7eb;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <p style="margin: 0; color: #6b7280; font-size: 12px;">
                                            📅 Received: ${formattedDate}
                                        </p>
                                        <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 11px;">
                                            This is an automated email from ${CONTACT_CONFIG.companyName} website.
                                        </p>
                                    </td>
                                    <td align="right" style="vertical-align: top;">
                                        <span style="background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600;">
                                            ✓ Lead Captured
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        // Email options with reply-to for easy response
        const mailOptions = {
            from: `"${CONTACT_CONFIG.companyName}" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || CONTACT_CONFIG.adminEmail,
            replyTo: email, // So admin can reply directly to patient
            subject: `🏥 New Booking: ${doctorName || hospitalName || "General Inquiry"} - ${name}`,
            html: emailHTML
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log("Booking email sent successfully to:", mailOptions.to);

        return NextResponse.json({
            success: true,
            message: "Booking request submitted successfully"
        });

    } catch (error) {
        console.error("Booking API Error:", error);

        // Return user-friendly error message
        return NextResponse.json(
            {
                success: false,
                message: "We couldn't process your request. Please try again or contact us directly."
            },
            { status: 500 }
        );
    }
}
