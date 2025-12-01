"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-panacea-dark text-white fixed h-full z-20">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-tight">Panacea Admin</h1>
          <p className="text-xs text-panacea-light/70 mt-1">Management Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? "bg-panacea-primary text-white shadow-lg shadow-panacea-primary/30"
                    : "text-panacea-light/70 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-panacea-dark text-white z-40 transform transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h1 className="text-xl font-bold">Panacea Admin</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="text-white/70 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? "bg-panacea-primary text-white shadow-lg"
                    : "text-panacea-light/70 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon className="w-5 h-5" />
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
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Search Bar (Visual only for now) */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-400 hover:text-panacea-primary transition-colors rounded-full hover:bg-gray-50">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-panacea-primary/10 flex items-center justify-center text-panacea-primary font-bold text-sm">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
