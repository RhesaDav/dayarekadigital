import Sidebar from "@/components/layout/Sidebar";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
