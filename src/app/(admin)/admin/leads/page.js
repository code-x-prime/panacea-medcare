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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
        <p className="text-gray-500 mt-1">View and manage all incoming leads and inquiries.</p>
      </div>

      <LeadList leads={leads} />
    </div>
  );
}
