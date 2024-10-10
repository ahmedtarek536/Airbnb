const express = require("express");
const router = express.Router();
const Product = require("../Models/productModel");
const Review = require("../Models/reviewModel");
const { authenticateToken } = require("../utils/services");

router.get("/", async (req, res) => {
  const query = req.query.query;
  try {
    const data = await Product.find(
      {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      },
      {
        title: true,
        images: true,
        location: true,
        information: true,
        reviews_id: true,
      }
    )
      .populate("reviews_id")
      .exec();

    return res.status(200).json({
      status: "success",
      message: "get products was successful",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "request error",
      error: {
        message: "get products was fail",
        errors: error,
      },
    });
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  const id = req.user._id;
  try {
    const data = await Product.find({ host_id: id });

    return res.status(200).json({
      status: "success",
      message: "get products user was successful",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "request error",
      error: {
        message: "get prodtucs user was fail",
        errors: error,
      },
    });
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Product.find({ host_id: id });

    return res.status(200).json({
      status: "success",
      message: "get products user was successful",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "request error",
      error: {
        message: "get prodtucs user was fail",
        errors: error,
      },
    });
  }
});

router.get("/product/:productID", async (req, res) => {
  const { productID } = req.params;
  try {
    const data = await Product.findOne({ _id: productID })
      .populate({
        path: "reviews_id",
        populate: {
          path: "reviews.user_id",
          model: "User",
        },
      })
      .populate("host_id");

    return res.status(200).json({
      status: "success",
      message: "get products was successful",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "request error",
      error: {
        message: "get products was fail",
        errors: error,
      },
    });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    data.host_id = req.user._id;
    const reviews = new Review();
    await reviews.save();
    data.reviews_id = reviews._id;
    const newProduct = new Product(data);
    await newProduct.save();
    return res.status(200).json({
      status: "success",
      message: "Request was successful",
      data: newProduct,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "request error",
      error: {
        message: "fail to create product",
        error: err,
      },
    });
  }
});

router.put("/:productID", authenticateToken, async (req, res) => {
  const { productID } = req.params;
  const newProduct = await Product.findById(productID);

  if (!newProduct) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
      errors: {
        message: "can not find product",
      },
    });
  }
  if (newProduct.host_id.toString() !== req.user?._id.toString()) {
    return res.status(403).json({
      status: "fail",
      message: "You do not have permission to update this product",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(403).json({
      status: "fail",
      message: "fail to update this product",
      error: {
        message: "update product was fail",
        errors: error,
      },
    });
  }
});

router.delete("/:productID", authenticateToken, async (req, res) => {
  const { productID } = req.params;

  try {
    // delete review
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
        errors: {
          message: "can not find product",
        },
      });
    }

    if (product.host_id.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to delete this product",
      });
    }
    try {
      const deletedReview = await Review.findByIdAndDelete(product.reviews_id);
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        message: "fail to delete product",
        error: {
          message: "delete product was fail",
          errors: error,
        },
      });
    }

    // delete product
    try {
      const deletedProduct = await Product.findByIdAndDelete(productID);
      return res.status(200).json({
        status: "success",
        message: "Product delete successfully",
        data: deletedProduct,
      });
    } catch (err) {
      return res.status(403).json({
        status: "fail",
        message: "fail to delete this product",
        errors: err,
      });
    }
  } catch (err) {
    return res.status(403).json({
      status: "fail",
      message: "fail to delete this product",
      errors: err,
    });
  }
});

module.exports = router;
