var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');

const cloudinaryConfig = require('../config/credential/keys').cloudinaryConfig;
cloudinary.config(cloudinaryConfig);

module.exports = path => {
  var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: `my_portfolio/${path}`,
    allowedFormats: ['jpg', 'png', 'svg', 'jpeg'],
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  var parser = multer({ storage: storage });
  return parser;
};
