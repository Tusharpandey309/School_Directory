// pages/api/addSchool.js
import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { getConnectionPool } from '../../utils/db';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  const isDevelopment = process.env.NODE_ENV === 'development';
  const form = new IncomingForm({
    maxFileSize: 10 * 1024 * 1024, // 10MB
    keepExtensions: true,
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
      // Development: Local storage
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileExtension = path.extname(imageFile.originalFilename);
      imageName = `${Date.now()}_${imageFile.originalFilename}`;
      const localPath = path.join(uploadDir, imageName);
      
      fs.renameSync(imageFile.filepath, localPath);
      imagePath = `/schoolImages/${imageName}`;
      
      console.log(`Development: Image saved locally as ${imageName}`);
    } else {
      // Production: Cloudinary
      try {
        const result = await cloudinary.uploader.upload(imageFile.filepath, {
          folder: 'school-images',
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto', fetch_format: 'auto' }
          ],
          resource_type: 'auto'
        });
        
        imageName = result.public_id;
        imagePath = result.secure_url;
        
        console.log(`Production: Image uploaded to Cloudinary: ${result.secure_url}`);
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed:', cloudinaryError);
        return res.status(500).json({ error: 'Failed to upload image to cloud storage' });
      }
    }

    // Extract form fields (formidable returns arrays)
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
    const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
    const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
    const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
    const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
    const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    const pool = await getConnectionPool();
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePath, email_id] // Store full path/URL
    );
    
    res.status(200).json({ 
      message: 'School data added successfully',
      schoolId: result.insertId,
      image: imageName,
      imagePath: imagePath,
      environment: isDevelopment ? 'development' : 'production'
    });

  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).json({ 
      error: error.message,
      details: isDevelopment ? error.stack : 'Internal server error'
    });
  }
}
