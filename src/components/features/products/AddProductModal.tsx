"use client";
import React, { useState } from "react";
import { useModalStore } from "../../../store/useModalStore";
import { createProduct } from "@/app/(dashboard)/products/action";
import { InputField } from "../../ui/InputField";
import { ModalBase } from "../../ui/ModalBase";
import { Button } from "../../ui/Button";
import toast from "react-hot-toast";

export const AddProductModal = () => {
  const { isOpen, modalType, closeModal } = useModalStore();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.stock || Number(formData.stock) < 0)
      newErrors.stock = "Stock must be 0 or more";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await createProduct(
        formData.name,
        Number(formData.price),
        Number(formData.stock)
      );

      toast.success("Product created successfully!");
      closeModal();
      setFormData({ name: "", price: "", stock: "" });
    } catch (error) {
      toast.error("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setFormData({ name: "", price: "", stock: "" });
  };

  if (!isOpen || modalType !== "add-product") return null;

  return (
    <ModalBase isOpen={isOpen} onClose={handleClose} title="Add New Product">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <InputField
          label="Product Name"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          error={errors.name}
        />
        <InputField
          label="Price (IDR)"
          type="number"
          value={formData.price}
          onChange={(value) => setFormData({ ...formData, price: value })}
          error={errors.price}
        />
        <InputField
          label="Stock"
          type="number"
          value={formData.stock}
          onChange={(value) => setFormData({ ...formData, stock: value })}
          error={errors.stock}
        />
        <div className="flex justify-end gap-2 mt-4">
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
