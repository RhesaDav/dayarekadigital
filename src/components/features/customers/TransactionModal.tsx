import { getCustomers } from "@/app/(dashboard)/customers/action";
import { getProducts } from "@/app/(dashboard)/products/action";
import { createTransaction } from "@/app/(dashboard)/transaction/action";
import { Button } from "@/components/ui/Button";
import { ModalBase } from "@/components/ui/ModalBase";
import { useModalStore } from "@/store/useModalStore";
import { Customer } from "@/types/customers";
import { Product } from "@/types/products";
import { Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const TransactionModal = () => {
  const { isOpen, modalType, closeModal } = useModalStore();

  const [products, setProducts] = useState<Product[] | undefined>(undefined);
  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerId, setCustomerId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedProduct = products?.find((p) => p.id.toString() === productId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchProducts = async () => {
          const product = await getProducts();
          const customer = await getCustomers();
          setProducts(product);
          setCustomers(customer.customers);
        };
        fetchProducts();
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again.");
      }
    };

    if (isOpen && modalType === "transaction") {
      fetchData();
    }
  }, [isOpen, modalType]);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, value);
    if (selectedProduct && newQuantity <= selectedProduct.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = async () => {
    if (!productId || !customerId || quantity <= 0) {
      setError("Please fill all fields correctly.");
      return;
    }

    if (!selectedProduct) {
      setError("Selected product not found.");
      return;
    }

    if (quantity > selectedProduct.stock) {
      setError("Quantity exceeds available stock.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await createTransaction(parseInt(customerId), [
        {
          productId: parseInt(productId),
          quantity,
          price: selectedProduct.price,
        },
      ]);

      if (response.success) {
        toast.success("Transaction created successfully!");
        handleClose();
      } else {
        toast.error("Failed to create transaction.");
      }
    } catch (err) {
      console.error("Transaction error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setProducts(undefined);
    setCustomers(undefined);
    setQuantity(1);
    setProductId("");
    setCustomerId("");
    setError("");
  };

  if (!isOpen || modalType !== "transaction") return null;

  return (
    <ModalBase
      isOpen={isOpen && modalType === "transaction"}
      onClose={handleClose}
      title="Add New Transaction"
    >
      <div className="mt-4">
        <label className="block text-sm font-medium">Product</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          disabled={loading}
        >
          <option value="">Select Product</option>
          {products?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price} (Stock: {product.stock})
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Quantity</label>
        <div className="flex items-center mt-1 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || loading}
            className="h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <input
            type="number"
            className="w-full p-2 border rounded text-center"
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(parseInt(e.target.value) || 1)
            }
            min={1}
            max={selectedProduct?.stock}
            disabled={loading}
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={
              !selectedProduct || quantity >= selectedProduct.stock || loading
            }
            className="h-10 w-10"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        {selectedProduct && (
          <p className="text-sm text-gray-500 mt-1">
            Total: ${(selectedProduct.price * quantity).toFixed(2)}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Customer</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          disabled={loading}
        >
          <option value="">Select Customer</option>
          {customers?.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </div>
    </ModalBase>
  );
};
