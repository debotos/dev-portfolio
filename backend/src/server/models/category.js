const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  portfolio_categories: {
    type: [String]
  }
  // add blog category below
});

module.exports = Category = mongoose.model('category', CategorySchema);
