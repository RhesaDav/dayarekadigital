"use client";
import React, { useEffect, useState } from "react";
import { useModalStore } from "../../../store/useModalStore";
import { Table } from "../../ui/Table";
import { getCustomers, softDeleteCustomer, updateCustomer } from "@/app/(dashboard)/customers/action";
import { Customer } from "@/types/customers";
import { deleteProduct } from "@/app/(dashboard)/products/action";

const productColumns = [
  { key: "name", header: "Product Name" },
  { key: "price", header: "Price" },
  { key: "stock", header: "Stock" },
];

export default function ProductTable({products}:{products: Customer[]}) {
  const {openModal} = useModalStore()

  const handleDelete = async (item: any) => {
    await deleteProduct(item.id)
  }

  return (
    <Table
      columns={productColumns}
      data={products}
      title="Product"
      description="On this menu, you will be able to create, edit, and delete products. Also, you can manage it easily."
      onAddProduct={() => {}}
      onDelete={handleDelete}
    />
  );
}
