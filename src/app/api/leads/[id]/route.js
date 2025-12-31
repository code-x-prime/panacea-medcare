import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { error: "Lead ID is required" },
                { status: 400 }
            );
        }

        const leadId = parseInt(id);

        if (isNaN(leadId)) {
            return NextResponse.json(
                { error: "Invalid lead ID" },
                { status: 400 }
            );
        }

        await prisma.lead.delete({
            where: { id: leadId },
        });

        return NextResponse.json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
        console.error("Error deleting lead:", error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: "Lead not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Failed to delete lead" },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const leadId = parseInt(id);

        if (isNaN(leadId)) {
            return NextResponse.json(
                { error: "Invalid lead ID" },
                { status: 400 }
            );
        }

        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
        });

        if (!lead) {
            return NextResponse.json(
                { error: "Lead not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(lead);
    } catch (error) {
        console.error("Error fetching lead:", error);
        return NextResponse.json(
            { error: "Failed to fetch lead" },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = params;
        const leadId = parseInt(id);
        const body = await request.json();

        if (isNaN(leadId)) {
            return NextResponse.json(
                { error: "Invalid lead ID" },
                { status: 400 }
            );
        }

        const updatedLead = await prisma.lead.update({
            where: { id: leadId },
            data: body,
        });

        return NextResponse.json(updatedLead);
    } catch (error) {
        console.error("Error updating lead:", error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: "Lead not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Failed to update lead" },
            { status: 500 }
        );
    }
}
