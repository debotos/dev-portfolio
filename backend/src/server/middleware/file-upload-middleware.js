const axios = require('axios');
const cloudinary = require('../config/cloudinary');

const validateTestimonialsInput = require('../validation/testimonials');

function fileUploadMiddleware(req, res) {
  const { errors, isValid } = validateTestimonialsInput(req.body);
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json({ errors });
  }
  cloudinary.uploader
    .upload_stream(result => {
      res.status(200).json({ success: true, fileUrl: result.secure_url });
    })
    .end(req.file.buffer);
}

module.exports = fileUploadMiddleware;
