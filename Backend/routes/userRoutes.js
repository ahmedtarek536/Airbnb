const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const { generateToken, authenticateToken } = require("../utils/services");

router.post("/signup", async (req, res) => {
  const data = req.body;
  const user = await User.findOne({
    email: data.email,
  });

  if (user)
    return res.status(400).json({
      status: "fail",
      message: "signup error",
      error: {
        message: "this eamil already exisit",
      },
    });

  try {
    const user = new User(data);
    await user.save();
    const token = generateToken(data);
    return res.status(201).json({
      status: "success",
      message: "Create Account successful",
      data: {
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "fail",
      message: "signup error",
      error: {
        messag: "fail to create new accoutn",
        errors: err,
      },
    });
  }
});

router.post("/login", async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({
      email: data.email,
      password: data.password,
    });

    if (user == null) throw new Exception();

    const token = generateToken(data);
    return res.status(201).json({
      status: "success",
      message: "Login  successful",
      data: {
        token: token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "fail to login",
      error: {
        message: "user not found",
        errors: error,
      },
    });
  }
});

router.get("/info", authenticateToken, async (req, res) => {
  const user = req.user;
  return res.status(200).json({
    status: "success",
    message: "Request was successful",
    data: user,
  });
});

router.get("/info/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select(
      "_id about information profileImage fullName phoneNumber Address"
    );

    return res.status(200).json({
      status: "success",
      message: "Request was successful",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "profile was fail",
      error: {
        messge: "can not get user",
        errorCode: 400,
        errors: err,
      },
    });
  }
});

router.put("/info", authenticateToken, async (req, res) => {
  const user = req.user;
  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: "success",
      message: "update was successful",
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Validaion error",
      error: {
        messge: "can not update user",
        errorCode: 400,
        errors: err,
      },
    });
  }
});

module.exports = router;
