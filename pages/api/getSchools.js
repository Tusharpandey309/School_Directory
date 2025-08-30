// pages/api/getSchools.js
import { getConnection } from '../../utils/db';

export default async function handler(req, res) {
  const db = await getConnection();
  const [schools] = await db.execute('SELECT id, name, address, city, state, image FROM schools');
  res.status(200).json(schools);
}
