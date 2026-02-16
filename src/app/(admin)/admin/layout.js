"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Shield
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import { useDebounce } from "@/lib/useDebounce";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchScope, setSearchScope] = useState("leads");
  const pathname = usePathname();
  const router = useRouter();
  const debouncedGlobalSearch = useDebounce(globalSearch, 350);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  ];

  const handleGlobalSearchSubmit = useCallback((e) => {
    e?.preventDefault();
    const q = (typeof debouncedGlobalSearch === "string" ? debouncedGlobalSearch : "").trim();
    if (q) {
      if (searchScope === "leads") router.push(`/admin/leads?q=${encodeURIComponent(q)}`);
      else router.push(`/admin/testimonials?q=${encodeURIComponent(q)}`);
    } else {
      if (searchScope === "leads") router.push("/admin/leads");
      else router.push("/admin/testimonials");
    }
  }, [debouncedGlobalSearch, searchScope, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop: premium dark with gradient accent */}
      <aside className="hidden md:flex flex-col w-56 bg-[#0a1628] text-white fixed h-full z-20 shadow-xl shadow-black/20 border-r border-white/5">
        <div className="p-6 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-panacea-primary to-panacea-dark flex items-center justify-center shadow-lg shadow-panacea-primary/30">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Panacea</h1>
              <p className="text-[10px] text-white/60">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-gradient-to-r from-panacea-primary to-panacea-primary/90 text-white shadow-lg shadow-panacea-primary/25"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 bg-black/20">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#0a1628] text-white z-40 transform transition-transform duration-300 ease-out md:hidden shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-panacea-primary to-panacea-dark flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">Panacea Admin</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-gradient-to-r from-panacea-primary to-panacea-primary/90 text-white shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Top Header: premium with debounced search */}
        <header className="bg-white border-b border-gray-200/80 sticky top-0 z-10 shadow-sm">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                className="md:hidden p-2 text-gray-500 hover:text-panacea-primary hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <form onSubmit={handleGlobalSearchSubmit} className="flex-1 md:flex-initial flex items-center gap-2 max-w-md">
                <div className="relative flex-1 flex items-center bg-gray-100 hover:bg-gray-50 rounded-xl px-3 py-2 border border-transparent focus-within:border-panacea-primary/50 focus-within:ring-2 focus-within:ring-panacea-primary/10 transition-all">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search leads or testimonials..."
                    className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700 placeholder-gray-400"
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                  />
                </div>
                <select
                  value={searchScope}
                  onChange={(e) => setSearchScope(e.target.value)}
                  className="hidden sm:block text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20"
                >
                  <option value="leads">Leads</option>
                  <option value="testimonials">Testimonials</option>
                </select>
                <button type="submit" className="p-2 bg-panacea-primary text-white rounded-lg hover:bg-panacea-dark transition-colors" aria-label="Search">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button className="relative p-2 text-gray-400 hover:text-panacea-primary transition-colors rounded-lg hover:bg-gray-50" aria-label="Notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-panacea-primary/20 to-panacea-dark/20 flex items-center justify-center text-panacea-primary font-bold text-sm ring-2 ring-panacea-primary/20">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-700">Admin</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
