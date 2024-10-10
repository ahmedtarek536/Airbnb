const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

function generateToken(data) {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRETE);
  return token;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, async (err, user) => {
    if (err)
      return res.status(401).json({
        status: "fail",
        message: "Authentication error",
        error: {
          errorCode: 400,
          message: "authentication error",
          errors: err,
        },
      });
    try {
      const userData = await User.findOne({
        email: user.email,
        password: user.password,
      });
      req.user = userData;
      next();
    } catch (error) {
      res.status(401).json({
        status: "fail",
        message: "Authentication error",
        error: {
          errorCode: 400,
          message: "authentication error",
          errors: error,
        },
      });
    }
  });
}

module.exports = { generateToken, authenticateToken };
