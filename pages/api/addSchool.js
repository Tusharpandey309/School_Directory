// pages/api/addSchool.js
import { IncomingForm } from 'formidable';
import { getConnectionPool } from '../../utils/db';
import fs from 'fs';
import path from 'path';

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024,
  });

  try {
    const [fields, files] = await form.parse(req);
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
    
    if (!imageFile) {
      return res.status(400).json({ error: 'Image is required' });
    }

    let imageName;
    let imagePath;

    if (isDevelopment) {
      // Local storage for development
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileExtension = path.extname(imageFile.originalFilename);
      imageName = `${Date.now()}_${imageFile.originalFilename}`;
      const localPath = path.join(uploadDir, imageName);
      
      fs.renameSync(imageFile.filepath, localPath);
      imagePath = `/schoolImages/${imageName}`;
    } else {
      // For production, you might want to use Cloudinary or another service
      // But if you insist on trying local storage in production:
      imageName = imageFile.originalFilename;
      imagePath = `/schoolImages/${imageName}`;
      
      // Note: This won't work on Vercel production
      console.warn('Local file storage may not work in production environment');
    }

    // Extract form fields
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
    const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
    const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
    const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
    const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const pool = await getConnectionPool();
    await pool.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageName, email_id]
    );
    
    res.status(200).json({ 
      message: 'School data added successfully',
      image: imageName,
      imagePath: imagePath
    });
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ error: error.message });
  }
}
