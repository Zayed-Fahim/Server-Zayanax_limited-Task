const express = require("express");
const router = express.Router();

const {
  postProduct,
  getProducts,
} = require("../controllers/product.controller");

router.route("/").get(getProducts).post(postProduct);

module.exports = router;
