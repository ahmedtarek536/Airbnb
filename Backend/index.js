const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = require("./routes/userRoutes");
const products = require("./routes/productRoutes");
const reviews = require("./routes/reviewsRoutes");
const orders = require("./routes/orderRoutes");
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/reviews", reviews);
app.use("/api/orders", orders);

const url =
  "mongodb+srv://ahmedtarek3182004:A3182004a@nodejs.qis7e.mongodb.net/Airbnb?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("success connect to database");
  })
  .catch((err) => {
    console.log("fail to connect to data base", err);
  });

app.listen(5000 || process.env.PORT, () => {
  console.log("servers is listening on port 5000");
});
