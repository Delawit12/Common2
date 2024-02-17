import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const password = process.env.DB_PASS;
const user = process.env.DB_USER;
const database = process.env.DB_NAME;

const pool = mysql.createPool({
  host,
  port,
  password,
  user,
  database,
  connectionLimit: 10,
});

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

export default query;
