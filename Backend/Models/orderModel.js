const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
      required: true,
    },
    quantityNights: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Cash on Delivery"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Currently hosting",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    placedAt: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
      required: true,
    },
    leaveAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
