// src/app/(admin)/admin/page.js
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [testimonialsCount, leadsCount] = await Promise.all([
    prisma.testimonial.count(),
    prisma.lead.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-panacea-primary mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/testimonials"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Testimonials</h2>
          <p className="text-3xl font-bold text-panacea-primary">{testimonialsCount}</p>
        </Link>
        <Link
          href="/admin/leads"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Leads</h2>
          <p className="text-3xl font-bold text-panacea-primary">{leadsCount}</p>
        </Link>
      </div>
    </div>
  );
}





