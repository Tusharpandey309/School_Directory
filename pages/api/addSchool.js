// pages/api/addSchool.js

import multer from 'multer';
import path from 'path';
import { getConnection } from '../../utils/db';

export const config = {
  api: { bodyParser: false }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/schoolImages',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, uniqueSuffix);
    },
  }),
});

// Helper to run a middleware in an API route
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  try {
    await runMiddleware(req, res, upload.single('image'));

    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file?.filename;

    if (!name || !address || !city || !state || !contact || !email_id || !image) {
      return res.status(400).json({ error: 'All fields, including image, are required.' });
    }

    const db = await getConnection();
    await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, image, email_id]
    );
    res.status(200).json({ message: 'School data added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
