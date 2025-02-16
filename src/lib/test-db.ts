import { query } from './db';
import dotenv from "dotenv"

dotenv.config()

const testConnection = async () => {
  try {
    const res = await query('SELECT NOW()');
    console.log('Database connected successfully:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

testConnection();