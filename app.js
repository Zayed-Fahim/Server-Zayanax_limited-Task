const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// all routes
const productRoute = require("./routes/product.route");
const userRegisterRoute = require("./routes/userRegister.route");
const adminRegisterRoute = require("./routes/adminRegistration");
const adminLoginRoute = require("./routes/adminLogin.route");

app.use("/api/v1/products", productRoute);
app.use("/api/v1/user/auth/register", userRegisterRoute);
app.use("/api/v1/admin/auth/register", adminRegisterRoute);
app.use("/api/v1/admin/auth/login", adminLoginRoute);

app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ status: "OK", message: "Server running successfully" });
});

module.exports = app;
