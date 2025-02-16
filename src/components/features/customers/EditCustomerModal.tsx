"use client";
import { updateCustomer } from "@/app/(dashboard)/customers/action";
import { getProducts } from "@/app/(dashboard)/products/action";
import { FormErrors, validateCustomerForm } from "@/lib/validation";
import { useModalStore } from "@/store/useModalStore";
import { Customer, Level } from "@/types/customers";
import React, { useEffect, useState } from "react";
import { ModalBase } from "../../ui/ModalBase";
import { Button } from "../../ui/Button";
import { SelectField } from "../../ui/SelectField";
import { InputField } from "../../ui/InputField";

export const EditCustomerModal = () => {
  const { isOpen, modalType, closeModal, selectedItem } = useModalStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    level: "Warga" as Level,
    favorite_menu: "",
    total_transaction: "",
  });
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        ...selectedItem,
        favorite_menu: selectedItem.favorite_menu,
        total_transaction: selectedItem.total_transaction,
      });
    }
  }, [selectedItem]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        level: "Warga" as Level,
        favorite_menu: "",
        total_transaction: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const validationErrors = validateCustomerForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await updateCustomer(selectedItem.id, {
        ...formData,
        favorite_menu: Number(formData.favorite_menu),
        total_transaction: Number(formData.total_transaction),
      });
      closeModal();
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBase
      isOpen={isOpen && modalType === "edit"}
      onClose={closeModal}
      title="Edit Customer"
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          value={formData.name || ""}
          onChange={(value) => setFormData({ ...formData, name: value })}
          error={errors.name}
        />
        <InputField
          label="Email"
          type="email"
          value={formData.email || ""}
          onChange={(value) => setFormData({ ...formData, email: value })}
          error={errors.email}
        />
        <InputField
          label="Phone"
          value={formData.phone || ""}
          onChange={(value) => setFormData({ ...formData, phone: value })}
          error={errors.phone}
        />
        <SelectField
          label="Level"
          value={formData.level || "Warga"}
          options={["Warga", "Juragan", "Konglomerat", "Sultan"]}
          onChange={(value) =>
            setFormData({ ...formData, level: value as Level })
          }
        />
        <SelectField
          label="Favorite Menu"
          value={String(formData?.favorite_menu ?? "")}
          options={[
            { value: "", label: "-- Select Favorite Menu --" },
            ...products.map((p) => ({ value: String(p.id), label: p.name })),
          ]}
          onChange={(value) =>
            setFormData({
              ...formData,
              favorite_menu: value,
            })
          }
          error={errors.favorite_menu}
        />
        <InputField
          label="Total Transaction"
          value={String(formData?.total_transaction ?? "")}
          onChange={(value) =>
            setFormData({ ...formData, total_transaction: value })
          }
          error={errors.total_transaction}
        />
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="ghost" onClick={closeModal} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </ModalBase>
  );
};
