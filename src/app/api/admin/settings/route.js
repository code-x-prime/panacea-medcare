// src/app/api/admin/settings/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET settings
export async function GET(request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        let settings = await prisma.settings.findFirst();

        // Create default settings if none exist
        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    autoplayEnabled: true,
                },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT update settings
export async function PUT(request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { autoplayEnabled } = await request.json();

        let settings = await prisma.settings.findFirst();

        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    autoplayEnabled: autoplayEnabled !== undefined ? autoplayEnabled : true,
                },
            });
        } else {
            settings = await prisma.settings.update({
                where: { id: settings.id },
                data: {
                    ...(autoplayEnabled !== undefined && { autoplayEnabled }),
                },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
