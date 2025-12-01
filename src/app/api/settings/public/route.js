// src/app/api/settings/public/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET public settings (no auth required)
export async function GET() {
    try {
        let settings = await prisma.settings.findFirst();

        // Return default if none exist
        if (!settings) {
            return NextResponse.json({ autoplayEnabled: true });
        }

        return NextResponse.json({ autoplayEnabled: settings.autoplayEnabled });
    } catch (error) {
        console.error('Error fetching public settings:', error);
        return NextResponse.json(
            { autoplayEnabled: true }, // Default fallback
            { status: 200 }
        );
    }
}
