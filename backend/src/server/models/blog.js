const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
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
  blog: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
      },
      body: {
        type: String,
        required: true,
        minlength: 5
      },
      date: {
        type: Date,
        required: true
      },
      author: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
      },
      tag: {
        type: [String],
        required: true
      },
      img: {
        type: String,
        required: true
      },
      public_id: {
        type: String,
        required: true
      },
      category: {
        type: [String],
        required: true
      }
    }
  ]
});

module.exports = Blog = mongoose.model('blog', BlogSchema);
