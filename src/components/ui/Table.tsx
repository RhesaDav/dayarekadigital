"use client";
import React, { useState } from "react";
import { Button } from "./Button";
import { ChevronRight, Eye, Filter, Pencil, Plus, RefreshCcw, Search, Trash } from "lucide-react";
import Image from "next/image";
import { useModalStore } from "../../store/useModalStore";
import { AddCustomerModal } from "../features/customers/AddCustomerModal";
import { EditCustomerModal } from "../features/customers/EditCustomerModal";
import { DetailCustomerModal } from "../features/customers/DetailCustomerModal";
import { TransactionModal } from "../features/customers/TransactionModal";
import { AddProductModal } from "../features/products/AddProductModal";
import { usePathname } from "next/navigation";

interface Column {
  key: string;
  header: string;
  render?: (row: any) => React.ReactNode;
}

interface ReusableTableProps {
  columns: Column[];
  data: any[];
  title: string;
  description: string;
  onAdd?: () => void;
  onAddProduct?: () => void;
  onSearch?: (query: string) => void;
  onRefresh?: () => void;
  onFilter?: () => void;
  onEdit?: (item: any) => void;
  onDetails?: (item: any) => void;
  onDelete?: (item: any) => void;
  onPrint?: (item:any) => void;
  addTransaction?: boolean;
}

export const Table: React.FC<ReusableTableProps> = ({
  columns,
  data,
  title,
  description,
  onAdd,
  onAddProduct,
  onSearch,
  onRefresh,
  onFilter,
  onEdit,
  onDetails,
  onDelete,
  addTransaction = false
}) => {
  const { openModal } = useModalStore();
  const pathname = usePathname()
  console.log(pathname)

  const handleEdit = (item: any) => {
    openModal('edit', item);
  };

  const handleDetails = (item: any) => {
    openModal('details', item);
  };

  const handleDelete = (item: any) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete?.(item);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mt-4">
      <div className="p-4">
        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-lg shadow-lg text-white">
          <div className="absolute inset-y-0 right-0 rounded-lg overflow-hidden opacity-20">
            <Image
              src="/table_banner.png"
              alt="Customer Banner"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm">{description}</p>

            <div className="flex items-center gap-3">
              {onAdd && (
                <button
                  onClick={() => openModal('add')}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  <Plus size={16} />
                  Add New
                </button>
              )}
              {onAddProduct && (
                <button
                  onClick={() => openModal('add-product')}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  <Plus size={16} />
                  Add New
                </button>
              )}

              {addTransaction && (
                <button
                  onClick={() => openModal('transaction')}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  <Plus size={16} />
                  Add New Transaction
                </button>
              )}

              {onSearch && (
                <div className="flex-1 flex items-center bg-white/10 backdrop-blur-md rounded-lg overflow-hidden">
                  <span className="px-3 text-gray-300">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="flex-1 py-2 px-2 text-white placeholder-gray-300 bg-transparent outline-none"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition">
                    Search
                  </button>
                </div>
              )}

              {onFilter && (
                <button
                  onClick={onFilter}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  <Filter size={16} />
                  Filter
                </button>
              )}

              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
                >
                  <RefreshCcw size={16} />
                  Refresh
                </button>
              )}

            </div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              {columns.map((column) => (
                <th key={column.key} className="text-left p-3">
                  {column.header}
                </th>
              ))}
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="p-3">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
                <td className="p-3 flex gap-2">
                  {pathname === "/customers" && (
                    <>
                  <Button variant="ghost" size="sm" onClick={() => handleDetails(row)}>
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(row)}>
                    <Pencil size={16} />
                  </Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(row)}>
                    <Trash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">Showing {data.length} Data</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm">
              38
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      <AddCustomerModal />
      <EditCustomerModal />
      <DetailCustomerModal />
      <TransactionModal />
      <AddProductModal />
    </div>
  );
};
