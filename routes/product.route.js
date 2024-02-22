const express = require("express");
const router = express.Router();

const {
  postProduct,
  getProducts,
  getSearchedProducts,
  updateProduct,
} = require("../controllers/product.controller");

router.route("/:productId").patch(updateProduct);
router.route("/").get(getProducts).post(postProduct);
router.get("/search", getSearchedProducts);

module.exports = router;
