"use server"
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getProducts = async () => {
  const result = await query(
    "SELECT * FROM products WHERE deleted_at IS NULL"
  );
  return result.rows;
};

export const createProduct = async (name: string, price: number, stock: number) => {
  try {
    const result = await query(
      "INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *",
      [name, price, stock]
    );
    revalidatePath("/products")
    return result.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product.");
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const result = await query(
      "UPDATE products SET deleted_at = NOW() WHERE id = $1 RETURNING *",
      [id]
    );
    revalidatePath("/products")
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
};

