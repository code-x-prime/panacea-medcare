// src/app/(admin)/admin/testimonials/page.js
import TestimonialList from '@/components/admin/TestimonialList';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default function TestimonialsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-panacea-primary">Testimonials</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Testimonial</h2>
          <TestimonialForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">All Testimonials</h2>
          <TestimonialList />
        </div>
      </div>
    </div>
  );
}





