// src/app/(admin)/admin/layout.js
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import env from "@/config/env";

export default async function AdminLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect("/n-admin/auth");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              className="text-xl font-bold text-panacea-primary"
            >
              {env.NEXT_PUBLIC_SITE_NAME} Admin
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/testimonials"
                className="text-gray-700 hover:text-panacea-primary transition"
              >
                Testimonials
              </Link>
              <Link
                href="/admin/leads"
                className="text-gray-700 hover:text-panacea-primary transition"
              >
                Leads
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

