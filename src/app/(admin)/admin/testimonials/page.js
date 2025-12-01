import { prisma } from '@/lib/prisma';
import TestimonialList from '@/components/admin/TestimonialList';

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
        <p className="text-gray-500 mt-1">Manage patient reviews and testimonials.</p>
      </div>

      <TestimonialList testimonials={testimonials} />
    </div>
  );
}
