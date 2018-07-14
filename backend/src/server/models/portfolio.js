const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
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
  portfolio: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
      },
      github: {
        type: String
      },
      url: {
        type: String
      },
      details: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
      },
      date: {
        type: Date,
        required: true
      },
      tag: {
        type: [String],
        required: true
      },
      img: {
        type: [String],
        required: true
      },
      public_id: {
        type: [String],
        required: true
      },
      category: {
        type: [String],
        required: true
      }
    }
  ]
});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);
