const express = require("express");
const router = express.Router();

const {
  postProduct,
  getProducts,
  getSearchedProducts,
} = require("../controllers/product.controller");

router.route("/").get(getProducts).post(postProduct);
router.get("/search", getSearchedProducts);

module.exports = router;
