const express = require("express");
const router = express.Router();

const {
  postOrder,
  getOrders,
  updateOrderToConfirm,
  updateOrderToCancel,
} = require("../controllers/order.controller");

router.route("/").post(postOrder).get(getOrders);
router.route("/confirm-order/:orderId").patch(updateOrderToConfirm);
router.route("/cancel-order/:orderId").patch(updateOrderToCancel);

module.exports = router;
