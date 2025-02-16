"use client";
import { useModalStore } from "@/store/useModalStore";
import React, { useEffect, useState } from "react";
import { ModalBase } from "../../ui/ModalBase";
import { Button } from "../../ui/Button";
import { Customer } from "@/types/customers";
import { getTransactionByCustomerId } from "@/app/(dashboard)/transaction/action";
import toast from "react-hot-toast";

export const DetailCustomerModal = () => {
  const { isOpen, modalType, closeModal, selectedItem } = useModalStore();
  const [transactions, setTransactions] = useState<Transaction[] | undefined>();
  const [loading, setLoading] = useState(false);
  console.log(transactions);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (selectedItem?.id) {
        setLoading(true);
        try {
          const response = await getTransactionByCustomerId(selectedItem.id);
          console.log(response.transactions);
          if (response.success) {
            setTransactions(response.transactions);
          } else {
            toast.error("Failed to fetch transactions");
          }
        } catch (err) {
          console.error("Failed to fetch transactions:", err);
          toast.error("An error occurred while fetching transactions");
        } finally {
          setLoading(false);
        }
      }
    };

    if (isOpen && modalType === "details") {
      fetchTransactions();
    }
  }, [isOpen, modalType, selectedItem?.id]);

  return (
    <ModalBase
      isOpen={isOpen && modalType === "details"}
      onClose={closeModal}
      title="Customer Details"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="font-medium">Name:</div>
          <div>{selectedItem?.name}</div>

          <div className="font-medium">Email:</div>
          <div>{selectedItem?.email}</div>

          <div className="font-medium">Phone:</div>
          <div>{selectedItem?.phone}</div>

          <div className="font-medium">Level:</div>
          <div>
            <span
              className={`px-2 py-1 rounded-full text-sm
              ${
                selectedItem?.level === "Warga"
                  ? "bg-orange-100 text-orange-600"
                  : selectedItem?.level === "Juragan"
                  ? "bg-blue-100 text-blue-600"
                  : selectedItem?.level === "Konglomerat"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {selectedItem?.level}
            </span>
          </div>

          <div className="font-medium">Favorite Menu:</div>
          <div>{selectedItem?.product_name}</div>

          <div className="font-medium">Total Transaction:</div>
          <div>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(selectedItem?.total_transaction)}
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-1">ID</th>
              <th className="border p-1">Customer</th>
              <th className="border p-1">Total</th>
              <th className="border p-1">Products</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => (
              <tr key={index} className="text-center">
                <td className="border p-1">{transaction.transaction_id}</td>
                <td className="border p-1">{transaction.customer_name}</td>
                <td className="border p-1">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(Number(transaction.total_amount))}
                </td>
                <td className="border p-1 text-left">
                  {transaction.products.map((product) => (
                    <div key={product.product_id}>
                      {product.product_name} ({product.quantity} pcs @{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                      )
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <Button onClick={closeModal}>Close</Button>
        </div>
      </div>
    </ModalBase>
  );
};
