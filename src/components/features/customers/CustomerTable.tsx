"use client";
import React, { useEffect, useState } from "react";
import { useModalStore } from "../../../store/useModalStore";
import { Button } from "../../ui/Button";
import { Pencil, Trash } from "lucide-react";
import { Table } from "../../ui/Table";
import { getCustomers, softDeleteCustomer, updateCustomer } from "@/app/(dashboard)/customers/action";
import { Customer } from "@/types/customers";

const customerColumns = [
  { key: "name", header: "Customer Name" },
  {
    key: "level",
    header: "Level",
    render: (row: any) => (
      <span
        className={`px-3 py-1 rounded-full text-sm
          ${
            row.level === "Warga"
              ? "bg-orange-100 text-orange-600"
              : "bg-blue-100 text-blue-600"
          }`}
      >
        {row.level}
      </span>
    ),
  },
  { key: "product_name", header: "Favorite Menu", render: (row:any) => row.favorite_menu === null ? "-" : row.product_name },
  { key: "total_transaction", header: "Total Transaction" }
];

export default function CustomerTable({customers}:{customers: Customer[]}) {

  const handleEdit = async (customer: any) => {
    await updateCustomer(customer.id, { name: "Updated Name", phone: customer.phone, email: customer.email });
  };

  const handleDelete = async (item: any) => {
    await softDeleteCustomer(item.id)
  }

  return (
    <Table
      columns={customerColumns}
      data={customers}
      title="Customer"
      description="On this menu, you will be able to create, edit, and delete customers. Also, you can manage it easily."
      onAdd={async ()=> {}}
      onEdit={handleEdit}
      onDelete={handleDelete}
      addTransaction
    />
  );
}
