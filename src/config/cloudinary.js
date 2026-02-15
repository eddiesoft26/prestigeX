import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// 1. Setup Cloudinary (Get these from your Cloudinary Dashboard)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DEBUG LOG:
console.log("Cloudinary Configured with:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  keyExists: !!process.env.CLOUDINARY_API_KEY,
  secretExists: !!process.env.CLOUDINARY_API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'payment_proofs',
    // Remove 'pdf' for now to test—Multer-Storage-Cloudinary 
    // sometimes struggles with non-image formats without extra config
    allowed_formats: ['jpg', 'png', 'jpeg'], 
  },
});

export const upload = multer({ storage: storage });
