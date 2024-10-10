const express = require("express");
const router = express.Router();
const Order = require("../Models/orderModel");
const { authenticateToken } = require("../utils/services");

// router.get("/:orderID", authenticateToken, async (req, res) => {
//   const { orderID } = req.params;

//   try {
//     const order = await Order.findById(orderID);

//     return res.status(201).json({
//       status: "success",
//       message: "get order successfully",
//       data: order,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       status: "error",
//       message: "get order fail",
//       errors: error,
//     });
//   }
// });

router.get("/host", authenticateToken, async (req, res) => {
  const host_id = req?.user?._id;

  try {
    const order = await Order.find({
      host_id: host_id,
    }).populate("product_id");

    return res.status(201).json({
      status: "success",
      message: "get order successfully",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "get order fail",
      error: {
        message: "can not get order",
        errors: error,
      },
    });
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  const user_id = req?.user?._id;
  try {
    const order = await Order.find({
      user_id: user_id,
      orderStatus: { $in: ["Pending", "Confirmed"] },
    }).populate("product_id");

    return res.status(201).json({
      status: "success",
      message: "get order successfully",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "get order fail",
      error: {
        message: "can not get order",
        errors: error,
      },
    });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const user_id = req.user._id;
  const data = req.body;
  data.user_id = user_id;
  try {
    const newOrder = new Order(data);
    await newOrder.save();
    return res.status(201).json({
      status: "success",
      message: "create order successfully",
      data: newOrder,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "create order fail",
      error: {
        message: "can not create new order",
        errors: error,
      },
    });
  }
});

router.put("/:orderID", authenticateToken, async (req, res) => {
  const { orderID } = req.params;
  const data = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderID, data);
    return res.status(201).json({
      status: "success",
      message: "update order successfully",
      data: updatedOrder,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "update order fail",
      error: {
        message: "error in update order",
        errors: error,
      },
    });
  }
});

module.exports = router;
