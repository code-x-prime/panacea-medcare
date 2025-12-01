import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  try {
    const [
      leadsCount,
      testimonialsCount,
      recentLeads,
      recentTestimonials,
      pendingTestimonials
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.testimonial.count(),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.testimonial.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.testimonial.count({
        where: { isVisible: false }
      })
    ]);

    return {
      leadsCount,
      testimonialsCount,
      recentLeads,
      recentTestimonials,
      pendingTestimonials
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  // Merge and sort recent activity
  const activities = [
    ...data.recentLeads.map(l => ({
      id: `lead-${l.id}`,
      type: 'lead',
      message: `New lead: ${l.name}`,
      time: l.createdAt,
      details: l.source
    })),
    ...data.recentTestimonials.map(t => ({
      id: `test-${t.id}`,
      type: 'testimonial',
      message: `New review from ${t.name}`,
      time: t.createdAt,
      details: `${t.rating} Stars`
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

  const stats = [
    {
      label: "Total Leads",
      value: data.leadsCount,
      icon: Users,
      color: "bg-blue-500",
      trend: "Live",
      trendUp: true
    },
    {
      label: "Testimonials",
      value: data.testimonialsCount,
      icon: MessageSquare,
      color: "bg-purple-500",
      trend: "Verified",
      trendUp: true
    },
    {
      label: "Pending Reviews",
      value: data.pendingTestimonials,
      icon: Clock,
      color: "bg-orange-500",
      trend: "Action Needed",
      trendUp: false
    },
    {
      label: "System Status",
      value: "Online",
      icon: CheckCircle,
      color: "bg-green-500",
      trend: "Stable",
      trendUp: true
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Real-time overview of your platform's performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                  {stat.trend}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Link href="/admin/leads" className="text-sm text-panacea-primary font-medium hover:underline">View All</Link>
          </div>
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${activity.type === 'lead' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                <div>
                  <p className="text-gray-900 font-medium">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{new Date(activity.time).toLocaleString()}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{activity.details}</span>
                  </div>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <div className="text-center py-8">
                <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500">No recent activity found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/leads"
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-panacea-light/20 hover:text-panacea-primary transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400 group-hover:text-panacea-primary" />
                <span className="font-medium">View All Leads</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-panacea-primary" />
            </Link>

            <Link
              href="/admin/testimonials"
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-panacea-light/20 hover:text-panacea-primary transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-panacea-primary" />
                <span className="font-medium">Manage Testimonials</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-panacea-primary" />
            </Link>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-blue-800 text-sm">System Note</span>
              </div>
              <p className="text-xs text-blue-700 leading-relaxed">
                Database is connected and running. Real-time data is being fetched from your PostgreSQL instance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
