const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// all routes
const productRoute = require("./routes/product.route");
const registerRoute = require("./routes/register.route");

app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth/register", registerRoute);

app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ status: "OK", message: "Server running successfully" });
});

module.exports = app;
