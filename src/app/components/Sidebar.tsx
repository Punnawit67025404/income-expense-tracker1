// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, PlusCircle, Edit } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Activity", icon: List, path: "/activity" },
    { name: "Create", icon: PlusCircle, path: "/create" },
    { name: "Edit", icon: Edit, path: "/edit" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 p-6 flex flex-col fixed left-0 top-0">
      {/* Profile / Logo Section */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div> {/* รูปโปรไฟล์จำลอง */}
      </div>

      {/* Menu Links */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all duration-200 font-medium ${
                isActive
                  ? "bg-[#6BCB0E] text-white shadow-lg shadow-green-200" // สีเขียวตามรูป
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}