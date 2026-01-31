import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import LeadList from '@/components/admin/LeadList';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">View and manage all incoming leads and inquiries.</p>
        </div>
      </div>

      <Suspense fallback={<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-gray-500">Loading leads…</div>}>
        <LeadList leads={leads} />
      </Suspense>
    </div>
  );
}
