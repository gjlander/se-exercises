import { v2 as cloudinary } from 'cloudinary';
import { type RequestHandler } from 'express';

// Configuration
cloudinary.config({
  secure_url: true
});

// Upload an image
const cloudUploader: RequestHandler = async (req, res, next) => {
  try {
    const filePath = req.image!.filepath;

    const cloudinaryData = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto'
    });

    req.body.image = cloudinaryData.secure_url;

    next();
  } catch (error) {
    next(error);
  }
};

export default cloudUploader;
