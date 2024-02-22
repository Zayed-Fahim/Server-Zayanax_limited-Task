const express = require("express");
const router = express.Router();

const {
  postOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

router.route("/:orderId").patch(updateOrderStatus);
router.route("/").post(postOrder).get(getOrders);

module.exports = router;
