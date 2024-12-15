import multer from 'multer';

import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from 'multer-storage-cloudinary';

  // Configuration
  cloudinary.config({ 
    cloud_name: 'dretmvews', 
    api_key: '892751638248434', 
    api_secret: '9brTI7f9DAeDuO6O1kYs33IixrQ' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'images',
    },
  });
  
  const uploadCloud = multer({ storage: storage })


export default uploadCloud