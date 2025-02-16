import { query } from "./db";

const seed = async () => {
  try {
    await query("DROP TABLE IF EXISTS transaction_items;");
    await query("DROP TABLE IF EXISTS transactions;");
    await query("DROP TABLE IF EXISTS products;");
    await query("DROP TABLE IF EXISTS customers;");
    await query("DROP TABLE IF EXISTS users;");
    await query("DROP TYPE IF EXISTS customer_level;");

    await query(`CREATE TYPE customer_level AS ENUM ('Warga', 'Juragan', 'Sultan', 'Konglomerat');`);

    await query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        deleted_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL,
        deleted_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        level customer_level DEFAULT 'Warga',
        favorite_menu INT REFERENCES products(id),
        total_transaction INT DEFAULT 0,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        deleted_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE transactions (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        customer_id INT REFERENCES customers(id),
        total_amount DECIMAL(10, 2) NOT NULL,
        deleted_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE transaction_items (
        id SERIAL PRIMARY KEY,
        transaction_id INT REFERENCES transactions(id),
        product_id INT REFERENCES products(id),
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
    `);

    console.log("Tables created successfully!");

    await query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [
      "Admin",
      "admin@example.com",
      "password123",
    ]);

    await query("INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3)", [
      "John Doe",
      "john@example.com",
      "1234567890",
    ]);

    await query("INSERT INTO products (name, price, stock) VALUES ($1, $2, $3)", [
      "Product A",
      19.99,
      100,
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error during database setup or seeding:", error);
  }
};

seed();
