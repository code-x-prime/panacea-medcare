// src/app/api/testimonials/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { compressAndSaveImage, deleteImage, extractYouTubeId } from '@/lib/imageCompression';

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

    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const location = formData.get('location');
    const rating = formData.get('rating');
    const isVisible = formData.get('isVisible');
    const videoUrl = formData.get('videoUrl');
    const imageFile = formData.get('image');

    let imagePath = null;

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imagePath = await compressAndSaveImage(buffer, imageFile.name);
    }

    // Validate and extract YouTube ID if video URL provided
    let validatedVideoUrl = null;
    if (videoUrl) {
      const videoId = extractYouTubeId(videoUrl);
      if (videoId) {
        validatedVideoUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: name || null,
        description: description || null,
        location: location || null,
        image: imagePath,
        videoUrl: validatedVideoUrl,
        rating: rating ? parseInt(rating) : 5,
        isVisible: isVisible === 'true',
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

    const formData = await request.formData();
    const id = formData.get('id');
    const name = formData.get('name');
    const description = formData.get('description');
    const location = formData.get('location');
    const rating = formData.get('rating');
    const isVisible = formData.get('isVisible');
    const videoUrl = formData.get('videoUrl');
    const imageFile = formData.get('image');
    const removeImage = formData.get('removeImage') === 'true';

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    // Get existing testimonial
    const existing = await prisma.testimonial.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    let imagePath = existing.image;

    // Handle image removal
    if (removeImage && existing.image) {
      deleteImage(existing.image);
      imagePath = null;
    }

    // Handle new image upload
    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (existing.image) {
        deleteImage(existing.image);
      }
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      imagePath = await compressAndSaveImage(buffer, imageFile.name);
    }

    // Validate and extract YouTube ID if video URL provided
    let validatedVideoUrl = existing.videoUrl;
    if (videoUrl !== undefined) {
      if (videoUrl) {
        const videoId = extractYouTubeId(videoUrl);
        validatedVideoUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      } else {
        validatedVideoUrl = null;
      }
    }

    // Ensure rating always has a value - default to 5 if missing
    const finalRating = rating !== undefined && rating !== null && rating !== ''
      ? parseInt(rating)
      : (existing.rating || 5);

    console.log('Update data:', {
      id: parseInt(id),
      rating: finalRating,
      existingRating: existing.rating,
      providedRating: rating,
      isVisibleProvided: isVisible,
      nameProvided: name
    });

    const updateData = {
      rating: finalRating,
    };

    // Only update fields that are explicitly provided
    if (name !== undefined && name !== null) updateData.name = name || null;
    if (description !== undefined && description !== null) updateData.description = description || null;
    if (location !== undefined && location !== null) updateData.location = location || null;
    if (imagePath !== existing.image) updateData.image = imagePath;
    if (validatedVideoUrl !== existing.videoUrl) updateData.videoUrl = validatedVideoUrl;
    if (isVisible !== undefined && isVisible !== null) updateData.isVisible = isVisible === 'true';

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: updateData,
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

    // Get testimonial to delete associated image
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: parseInt(id) },
    });

    if (testimonial?.image) {
      deleteImage(testimonial.image);
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
