"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  Utensils,
  PaintBucket,
  FileText,
  Shield,
  Settings,
  ShoppingCart,
  Boxes,
  LogOut,
} from "lucide-react";
import Image from "next/image";

function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/home", count: 4 },
    { icon: <Package size={20} />, label: "Stock", href: "/products" },
    { icon: <Users size={20} />, label: "Customer", href: "/customers" },
    { icon: <Utensils size={20} />, label: "Restaurant", href: "/restaurant" },
    { icon: <PaintBucket size={20} />, label: "Design", href: "/design" },
    { icon: <FileText size={20} />, label: "Report", href: "/report" },
    { icon: <Shield size={20} />, label: "Role & Admin", href: "/role-admin" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  ];

  const integrationItems = [
    { icon: <ShoppingCart size={20} />, label: "Stock", href: "/integration/stock" },
    { icon: <Boxes size={20} />, label: "Supply", href: "/integration/supply" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between">
      {/* Logo */}
      <div className="p-6">
        <Image width={120} height={50} src="/icon.png" alt="Square Logo" />
      </div>

      {/* Menu */}
      <nav className="px-6">
        <p className="text-gray-400 text-sm mb-2">Menu</p>
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link key={index} href={item.href} className="block">
              <div
                className={`flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100 transition ${
                  isActive ? "bg-indigo-100 text-indigo-600 font-medium" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {item.count}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Integration */}
      <nav className="px-6 mt-4">
        <p className="text-gray-400 text-sm mb-2">Integration</p>
        {integrationItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link key={index} href={item.href} className="block">
              <div
                className={`flex items-center py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100 transition ${
                  isActive ? "bg-indigo-100 text-indigo-600 font-medium" : ""
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-6 border-t">
        <div className="flex items-center space-x-3">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium">Savannah N</p>
            <p className="text-sm text-gray-500">Food Quality Manager</p>
          </div>
        </div>
        <button className="w-full mt-4 flex items-center justify-center bg-red-100 text-red-500 px-4 py-2 rounded-lg hover:bg-red-200 transition">
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
