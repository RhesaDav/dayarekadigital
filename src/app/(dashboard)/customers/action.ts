"use server"
import { query } from "@/lib/db";
import { Customer } from "@/types/customers";
import { revalidatePath } from "next/cache";

export const createCustomer = async (
  {name, email, phone, level, favorite_menu, total_transaction}: Partial<Customer>
) => {
  const existingCustomer = await query(
    "SELECT * FROM customers WHERE (email = $1 OR phone = $2) AND deleted_at IS NOT NULL",
    [email, phone]
  );

  if (existingCustomer.rows.length > 0) {
    const result = await query(
      "UPDATE customers SET deleted_at = NULL, name = $1, level = $2, favorite_menu = $3, total_transaction = $4 WHERE id = $5 RETURNING *",
      [name, level, favorite_menu, total_transaction, existingCustomer.rows[0].id]
    );
    revalidatePath("/customers")
    return result.rows[0];
  }

  const result = await query(
    "INSERT INTO customers (name, email, phone, level, favorite_menu, total_transaction) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, email, phone, level, favorite_menu, total_transaction]
  );
  revalidatePath("/customers")
  return result.rows[0];
};

export const getCustomers = async (
  search: string = "", 
  page: number = 1, 
  limit: number = 10
) => {
  const offset = (page - 1) * limit;

  const result = await query(
    `SELECT c.*, p.name AS product_name 
     FROM customers c 
     LEFT JOIN products p ON c.favorite_menu = p.id 
     WHERE c.deleted_at IS NULL 
     AND c.name ILIKE $1
     ORDER BY c.created_at DESC
     LIMIT $2 OFFSET $3;`,
    [`%${search}%`, limit, offset]
  );

  const total = await query(
    `SELECT COUNT(*) AS total FROM customers 
     WHERE deleted_at IS NULL 
     AND name ILIKE $1;`,
    [`%${search}%`]
  );

  return {
    customers: result.rows,
    total: parseInt(total.rows[0].total, 10),
    page,
    limit
  };
};


export const getCustomerById = async (id: number) => {
  const result = await query(
    "SELECT * FROM customers WHERE id = $1 AND deleted_at IS NULL",
    [id]
  );
  return result.rows[0];
};

export const updateCustomer = async (
  id: number,
  { name, email, phone, level, favorite_menu, total_transaction }: Partial<Customer>
) => {
  const result = await query(
    `UPDATE customers 
     SET name = $1, email = $2, phone = $3, level = $4, favorite_menu = $5, total_transaction = $6
     WHERE id = $7 AND deleted_at IS NULL
     RETURNING *`,
    [name, email, phone, level, favorite_menu, total_transaction, id]
  );

  revalidatePath("/customers");

  return result.rows[0];
};

export const softDeleteCustomer = async (id: number) => {
  const result = await query(
    "UPDATE customers SET deleted_at = NOW() WHERE id = $1 RETURNING *",
    [id]
  );
  revalidatePath("/customers")
  return result.rows[0];
};

export const hardDeleteCustomer = async (id: number) => {
  const result = await query(
    "DELETE FROM customers WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
