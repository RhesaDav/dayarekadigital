"use server"
import { query } from "@/lib/db";

export const createTransaction = async (
  customerId: number,
  items: { productId: number; quantity: number; price: number }[]
) => {
  try {
    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const transactionResult = await query(
      "INSERT INTO transactions (customer_id, total_amount, created_at) VALUES ($1, $2, NOW()) RETURNING id",
      [customerId, totalAmount]
    );

    const transactionId = transactionResult.rows[0].id;

    for (const item of items) {
      await query(
        "INSERT INTO transaction_items (transaction_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [transactionId, item.productId, item.quantity, item.price]
      );

      await query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.productId]
      );
    }

    return { success: true, message: "Transaction created successfully", transactionId };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, message: "Failed to create transaction" };
  }
};

export const getAllTransactions = async () => {
  try {
    const result = await query(`
      SELECT t.id, t.total_amount, t.created_at, c.name as customer_name
      FROM transactions t
      JOIN customers c ON t.customer_id = c.id
      ORDER BY t.created_at DESC
    `);

    return { success: true, transactions: result.rows };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, message: "Failed to fetch transactions" };
  }
};

export const getTransactionByCustomerId = async (customerId: number) => {
  try {
    const result = await query(
      `
      SELECT 
        t.id AS transaction_id, 
        t.total_amount, 
        t.created_at, 
        c.name AS customer_name,
        json_agg(
          json_build_object(
            'product_id', p.id,
            'product_name', p.name,
            'quantity', ti.quantity,
            'price', ti.price
          )
        ) AS products
      FROM transactions t
      JOIN customers c ON t.customer_id = c.id
      JOIN transaction_items ti ON t.id = ti.transaction_id
      JOIN products p ON ti.product_id = p.id
      WHERE t.customer_id = $1
      GROUP BY t.id, c.name
      ORDER BY t.created_at DESC
      `,
      [customerId]
    );

    return { success: true, transactions: result.rows };
  } catch (error) {
    console.error("Error fetching transactions by customer:", error);
    return { success: false, message: "Failed to fetch transactions" };
  }
};
