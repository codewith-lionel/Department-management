const multer = require('multer');
const { errorResponse } = require('../utils/response');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

/**
 * Handle multer errors
 */
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return errorResponse(res, 'File too large. Maximum size is 5MB', 400);
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return errorResponse(res, 'Unexpected field name. Use "image" for file uploads', 400);
    }
    return errorResponse(res, `Upload error: ${err.message}`, 400);
  }
  
  if (err && err.message === 'Only image files are allowed') {
    return errorResponse(res, 'Only image files are allowed', 400);
  }
  
  next(err);
};

/**
 * Single image upload middleware
 */
const uploadSingle = upload.single('image');

module.exports = {
  uploadSingle,
  handleUploadError
};