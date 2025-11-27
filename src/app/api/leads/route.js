// src/app/api/leads/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import sendMail from "@/lib/mail";
import env from "@/config/env";

// POST create lead (public)
export async function POST(request) {
  try {
    const { name, email, phone, message, source, locale } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        source: source || "chatbot",
      },
    });

    // Send email notification to admin
    try {
      const emailHtml = `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Source:</strong> ${source || "chatbot"}</p>
        <p><strong>Locale:</strong> ${locale || "en"}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `;

      await sendMail({
        to: env.FROM_EMAIL,
        subject: "New Lead Received",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Error sending lead notification email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(lead, { status: 201 });
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

