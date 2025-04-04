"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SignOutButton from "@/app/components/sign-out-button";

export interface MenuItem {
  href: string;
  text: string;
  active?: boolean;
}

export default function DashboardLayout({
  children,
  menuItems = [],
}: {
  children: React.ReactNode;
  menuItems: MenuItem[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-[calc(100vh-5rem)] w-full overflow-hidden bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-800/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-20 mt-20 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:mt-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 lg:hidden">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar content */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                text={item.text}
                active={pathname === item.href}
              />
            ))}
            <SignOutButton />
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="flex items-center border-b border-gray-200 bg-white px-4 py-2 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          <h1 className="ml-2 text-lg font-semibold">Dashboard</h1>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  href: string;
  text: string;
  active?: boolean;
}

function SidebarItem({ href, text, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
        active
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {text}
    </Link>
  );
}
