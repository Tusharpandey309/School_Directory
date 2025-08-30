// utils/db.js
import mysql from 'mysql2/promise';

let connection = null;

export async function getConnection() {
  if (connection) {
    return connection;
  }

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log('Database connected successfully');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

let pool = null;

export async function getConnectionPool() {
  if (pool) {
    return pool;
  }

  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    return pool;
  } catch (error) {
    console.error('Database pool creation failed:', error);
    throw error;
  }
}
