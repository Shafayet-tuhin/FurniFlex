const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  original_price: {
    type: Number,
    required: true
  },
  discount_price: {
    type: Number,
    required: true
  },
  off_percentage: {
    type: Number,
    required: true
  },
  furniture_details: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['rocking', 'side', 'lounge'],
    required: true
  }
});

const Furniture = mongoose.model('Furniture', furnitureSchema);

module.exports = Furniture;
