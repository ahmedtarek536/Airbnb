const mongoose = require("mongoose");

const productScheam = new mongoose.Schema({
  host_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: [],
  category: { type: String, required: true },
  location: {
    type: String,
    required: true,
  },
  information: {
    price: {
      type: Number,
      required: true,
    },
    cleaning: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bed: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
    mingLength: 20,
  },
  offers: [],
  reviews_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true,
    immutable: true,
  },
});

const Product = mongoose.model("Product", productScheam);
module.exports = Product;
