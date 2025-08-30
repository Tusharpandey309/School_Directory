// pages/api/addSchool.js
import { IncomingForm } from 'formidable';
import { getConnectionPool } from '../../utils/db';
import fs from 'fs';

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  const form = new IncomingForm({
    uploadDir: './public/schoolImages',
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    filename: (name, ext, part, form) => {
      return Date.now() + '_' + part.originalFilename;
    }
  });

  try {
    // Ensure upload directory exists
    const uploadDir = './public/schoolImages';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const [fields, files] = await form.parse(req);
    
    // Extract form data (formidable returns arrays)
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
    const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
    const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
    const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
    const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;
    
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    const image = imageFile ? imageFile.newFilename || imageFile.originalFilename : null;

    if (!name || !address || !city || !state || !contact || !email_id || !image) {
      return res.status(400).json({ error: 'All fields, including image, are required.' });
    }

    const pool = await getConnectionPool();
    await pool.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, image, email_id]
    );
    
    res.status(200).json({ message: 'School data added successfully' });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ error: error.message });
  }
}
