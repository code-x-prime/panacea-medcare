// src/app/api/leads/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import sendMail from "@/lib/mail";
import { sendWhatsApp } from "@/lib/whatsapp";
import env from "@/config/env";

function toE164(phone) {
  if (!phone || typeof phone !== "string") return "";
  const digits = phone.replace(/\D/g, "");
  return phone.trim().startsWith("+") ? `+${digits}` : digits ? `+${digits}` : phone.trim();
}

// POST create lead (public)
export async function POST(request) {
  try {
    const { name, email, phone, country, message, source, locale } = await request.json();

    // Block Indian leads (+91 / India) at API layer
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const isIndiaPhone = trimmedPhone.startsWith("+91");
    const isIndiaCountry =
      typeof country === "string" &&
      country.toLowerCase().includes("india");
    if (isIndiaPhone || isIndiaCountry) {
      return NextResponse.json(
        { error: "This form is only for international patients (non-Indian numbers)." },
        { status: 400 }
      );
    }

    // Only require email OR phone (not both mandatory)
    if (!email && !phone) {
      return NextResponse.json(
        { error: "Either email or phone is required" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name || "Chat User",
        email: email || null,
        phone: phone || null,
        message: message || null,
        source: source || "chatbot",
      },
    });

    // Notification Status Tracking
    let emailSent = false;
    let whatsappSent = false;

    // --- 1. Send Email Notification to Admin ---
    try {
      // Get IST time using proper timezone
      const formattedDate = new Date().toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const formattedTime = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const emailHtml = `
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
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">🎉 New Lead Received!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Someone is interested in your services</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <!-- Lead Details Card -->
              <div style="background-color: #f8fafb; border-radius: 10px; padding: 25px; border-left: 4px solid #066F89;">
                
                <!-- Name -->
                <div style="margin-bottom: 20px;">
                  <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">👤 Name</p>
                  <p style="color: #1a1a1a; font-size: 18px; margin: 0; font-weight: 600;">${name || "Not Provided"}</p>
                </div>
                
                <!-- Email -->
                ${email ? `
                <div style="margin-bottom: 20px;">
                  <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">📧 Email</p>
                  <a href="mailto:${email}" style="color: #066F89; font-size: 16px; text-decoration: none; font-weight: 500;">${email}</a>
                </div>
                ` : ''}
                
                <!-- Phone -->
                ${phone ? `
                <div style="margin-bottom: 20px;">
                  <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">📱 Phone</p>
                  <a href="tel:${phone}" style="color: #066F89; font-size: 16px; text-decoration: none; font-weight: 500;">${phone}</a>
                </div>
                ` : ''}
                
                <!-- Country -->
                ${country ? `
                <div style="margin-bottom: 20px;">
                  <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">🌍 Country</p>
                  <p style="color: #1a1a1a; font-size: 16px; margin: 0; font-weight: 500;">${country}</p>
                </div>
                ` : ''}
                
                <!-- Source -->
                <div style="margin-bottom: 20px;">
                  <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">📍 Source</p>
                  <span style="display: inline-block; background-color: ${source === 'chatbot' ? '#9333ea' : '#066F89'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${source || "Website"}</span>
                </div>

                <!-- Message -->
                ${message ? `
                <div style="margin-bottom: 20px;">
                    <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">💬 Message</p>
                    <p style="color: #1a1a1a; font-size: 15px; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                ` : ''}
                
                <!-- Date & Time -->
                <div>
                  <p style="color: #666; font-size: 12px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">🕐 Received At (IST)</p>
                  <p style="color: #1a1a1a; font-size: 14px; margin: 0;">${formattedDate} at ${formattedTime}</p>
                </div>
                
              </div>
              
              <!-- Action Buttons -->
              <div style="margin-top: 25px; text-align: center;">
                ${email ? `<a href="mailto:${email}" style="display: inline-block; background-color: #066F89; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">📧 Reply via Email</a>` : ''}
                ${phone ? `<a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">💬 WhatsApp</a>` : ''}
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f0f4f5; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #666; font-size: 12px; margin: 0;">This is an automated notification from ${env.NEXT_PUBLIC_SITE_NAME || 'Panacea Medcare'}</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await sendMail({
        to: env.FROM_EMAIL,
        subject: `🎉 New Lead: ${name || 'Chat User'} - ${source || 'Website'}`,
        html: emailHtml,
      });
      emailSent = true;
    } catch (emailError) {
      console.error("Error sending lead notification email:", emailError);
    }

    // --- 2. Send WhatsApp Notification to Admin ---
    const adminPhone = toE164(process.env.ADMIN_PHONE_NUMBER || "919958800961");
    if (adminPhone) {
      try {
        const adminLink = `${env.APP_URL || 'https://www.panaceamedcare.com'}/admin/leads`;
        const adminMsg = `🎉 *New Lead Received*\n\n` +
          `👤 *Contact Details:*\n` +
          `• Name: ${name || "Guest"}\n` +
          `• Phone: ${phone || "N/A"}\n` +
          `• Email: ${email || "N/A"}\n` +
          `• Country: ${country || "N/A"}\n\n` +
          `📍 *Source:* ${source || "Website"}\n\n` +
          `💬 *Message:*\n${message ? message.substring(0, 1000) : "No message"}\n\n` +
          `🔗 *Full Details:* ${adminLink}\n\n` +
          `#LeadID: ${lead.id}`;

        await sendWhatsApp(adminPhone, adminMsg);
        whatsappSent = true;
      } catch (adminWaErr) {
        console.error("Admin WhatsApp failed:", adminWaErr);
      }
    }

    // --- 3. Send WhatsApp Confirmation to User ---
    if (phone) {
      try {
        const userMsg = `👋 Hello ${name || "there"},\n\nThank you for contacting *Panacea Medcare*! \n\n✅ We have received your inquiry. Our medical team will review your details and get back to you shortly.\n\nFor urgent assistance, reply to this message.`;
        await sendWhatsApp(phone, userMsg);
      } catch (userWaErr) {
        console.error("User WhatsApp failed:", userWaErr);
      }
    }

    return NextResponse.json({ ...lead, emailSent, whatsappSent }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET all leads (admin only)
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

