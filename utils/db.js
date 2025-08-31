// utils/db.js
import mysql from 'mysql2/promise';

let pool = null;

export async function getConnection() {
  // Use connection pool for both functions for consistency
  return await getConnectionPool();
}

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
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // Add SSL for production databases (Railway, PlanetScale)
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      acquireTimeout: 60000,
      timeout: 60000,
      // Handle connection errors
      reconnect: true,
      idleTimeout: 300000,
    });

    console.log('Database pool created successfully');
    return pool;
  } catch (error) {
    console.error('Database pool creation failed:', error);
    throw error;
  }
}

// Close connection pool gracefully
export async function closeConnection() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
