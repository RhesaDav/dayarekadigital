"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useModalStore } from "../../../store/useModalStore";
import { createCustomer } from "@/app/(dashboard)/customers/action";
import { Level } from "@/types/customers"; // Sesuaikan path dengan lokasi file types
import { getProducts } from "@/app/(dashboard)/products/action";
import { InputField } from "../../ui/InputField";
import { SelectField } from "../../ui/SelectField";
import { ModalBase } from "../../ui/ModalBase";
import { Button } from "../../ui/Button";
import toast from "react-hot-toast";
import { validateCustomerForm } from "@/lib/validation";

export const AddCustomerModal = () => {
  const { isOpen, modalType, closeModal } = useModalStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "Warga" as Level,
    favoriteMenu: "",
    totalTransaction: "",
  });
  const [products, setProducts] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCustomerForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await createCustomer({
        ...formData,
        favorite_menu: Number(formData.favoriteMenu),
        total_transaction: Number(formData.totalTransaction),
      });
      toast.success("Success create customer")
      closeModal();
    } catch (error) {
      toast.error("Error creating customer");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setFormData({
      email: "",
      favoriteMenu: "",
      level: "Warga",
      name: "",
      phone: "",
      totalTransaction: "",
    });
  };

  if (!isOpen || modalType !== "add") return null;

  return (
    <ModalBase
      isOpen={isOpen && modalType === "add"}
      onClose={closeModal}
      title="Add New Customer"
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          error={errors.name}
        />
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          error={errors.email}
        />
        <InputField
          label="Phone"
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
          error={errors.phone}
        />
        <SelectField
          label="Level"
          value={formData.level}
          options={["Warga", "Juragan", "Konglomerat", "Sultan"]}
          onChange={(value) =>
            setFormData({ ...formData, level: value as Level })
          }
        />
        <SelectField
          label="Favorite Menu"
          value={formData.favoriteMenu}
          options={[
            { value: "", label: "-- Select Favorite Menu --" },
            ...products.map((p) => ({ value: p.id.toString(), label: p.name })),
          ]}
          onChange={(value) =>
            setFormData({ ...formData, favoriteMenu: value })
          }
          error={errors.favoriteMenu}
        />
        <InputField
          label="Total Transaction"
          value={formData.totalTransaction}
          onChange={(value) =>
            setFormData({ ...formData, totalTransaction: value })
          }
          error={errors.totalTransaction}
        />
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </ModalBase>
  );
};
