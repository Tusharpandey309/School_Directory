// pages/api/getSchools.js
import { getConnectionPool } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  try {
    const pool = await getConnectionPool();
    const [schools] = await pool.execute(
      'SELECT id, name, address, city, state, contact, image, email_id, created_at FROM schools ORDER BY created_at DESC'
    );
    
    res.status(200).json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ 
      error: 'Failed to fetch schools',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}
