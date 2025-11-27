// src/app/(admin)/admin/leads/page.js
import LeadList from '@/components/admin/LeadList';

export default function LeadsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-panacea-primary mb-8">Leads</h1>
      <LeadList />
    </div>
  );
}

