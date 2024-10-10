const mongoose = require("mongoose");

const singleReviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  description: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reviewSchema = new mongoose.Schema({
  reviews: [singleReviewSchema],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
