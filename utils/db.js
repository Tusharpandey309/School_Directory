// utils/db.js
import mysql from 'mysql2/promise';

let pool = null;

export async function getConnection() {
  return await getConnectionPool();
}

export async function getConnectionPool() {
  if (pool) {
    return pool;
  }

  try {
    console.log(`Connecting to Railway: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // Railway requires SSL for external connections
      ssl: { rejectUnauthorized: false },
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true,
      idleTimeout: 300000,
    });

    console.log('Railway database connection successful');
    return pool;
  } catch (error) {
    console.error('Railway database connection failed:', error);
    throw error;
  }
}

export async function closeConnection() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
