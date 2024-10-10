const express = require("express");
const Review = require("../Models/reviewModel");
const { authenticateToken } = require("../utils/services");
const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const { review_id, description, rate } = req.body;
  const user_id = req.user._id;
  try {
    const item = await Review.findById(review_id);
    if (!item) {
      throw new Error("Review not found");
    }
    try {
      item.reviews.push({
        user_id: user_id,
        description: description,
        rate: rate,
      });
      await item.save();
      return res.status(200).json({
        status: "success",
        message: "create review successfully",
        data: item,
      });
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        message: "add review error",
        error: {
          errors: err,
          message: "you cannot add zero",
        },
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "create review fail",
      error: {
        message: "create review was fail",
        errors: err,
      },
    });
  }

});

router.delete("/", authenticateToken, async (req, res) => {
  const { review_id } = req.body;
  const user_id = req.user._id;
  const item = await Review.findById(review_id);

  if (!item) {
    throw new Error("Review not found");
  }

  const userExisting = item.reviews.find(
    (item) => item.user_id.toString() == user_id.toString()
  );

  if (!userExisting) {
    return res.status(400).json({
      status: "fail",
      message: "delete review error",
      error: {
        message: "you don't have review",
      },
    });
  }
  try {
    item.reviews = item.reviews.filter((review) => review.user_id == user_id);
    await item.save();
    return res.status(200).json({
      status: "success",
      message: "remove review successfully",
      data: item,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "delete review fail",
      error: {
        message: "delete review was fail",
        errors: error,
      },
    });
  }
});

module.exports = router;
