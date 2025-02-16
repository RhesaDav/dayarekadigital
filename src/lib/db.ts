import { Pool } from 'pg';
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
  connectionString: String(process.env.NEXT_PUBLIC_DB_URL),
});

export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};