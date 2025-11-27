// src/app/api/testimonials/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET all testimonials (public gets visible only, admin gets all)
export async function GET(request) {
  try {
    const session = await getSession();
    const isAdmin = !!session;

    const testimonials = await prisma.testimonial.findMany({
      where: isAdmin ? {} : { isVisible: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create testimonial (admin only)
export async function POST(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, content, rating, isVisible } = await request.json();

    if (!name || !content) {
      return NextResponse.json(
        { error: 'Name and content are required' },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        content,
        rating: rating || 5,
        isVisible: isVisible !== undefined ? isVisible : true,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update testimonial (admin only)
export async function PUT(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, name, content, rating, isVisible } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(content && { content }),
        ...(rating !== undefined && { rating }),
        ...(isVisible !== undefined && { isVisible }),
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE testimonial (admin only)
export async function DELETE(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.testimonial.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

