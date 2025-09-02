const cloudinary = require('cloudinary').v2;
const config = require('../config');
const logger = require('./logger');

// Configure cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});

/**
 * Upload image to Cloudinary
 * @param {Buffer} buffer - Image buffer
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<string>} - Cloudinary secure URL
 */
const uploadImage = async (buffer, folder = 'department-management') => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder,
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            logger.error({ error }, 'Cloudinary upload failed');
            reject(error);
          } else {
            logger.info({ url: result.secure_url }, 'Image uploaded to Cloudinary');
            resolve(result.secure_url);
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    logger.error({ error }, 'Cloudinary upload error');
    throw error;
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<void>}
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info({ publicId, result }, 'Image deleted from Cloudinary');
    return result;
  } catch (error) {
    logger.error({ error, publicId }, 'Cloudinary delete error');
    throw error;
  }
};

module.exports = {
  uploadImage,
  deleteImage
};