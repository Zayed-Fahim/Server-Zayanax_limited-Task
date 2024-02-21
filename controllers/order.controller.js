const Order = require("../models/Order");
const {
  postOrderService,
  getOrdersService,
  updateOrderToConfirmService,
  updateOrderToCancelService,
} = require("../services/order.service");

exports.postOrder = async (req, res, next) => {
  try {
    const order = await postOrderService(req.body);
    res.status(200).json({ status: "Success", message: "Order Added!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  const { status } = req.query;
  try {
    const orders = await getOrdersService(status);
    if (orders.length > 0) {
      return res.status(200).json({
        status: "Success",
        message: "All Orders data are here!",
        payload: orders,
      });
    }
    res.status(404).json({
      status: "Not Found",
      message: "No Orders found!",
      payload: orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.updateOrderToConfirm = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await updateOrderToConfirmService(orderId);

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ status: "Success", message: "Order confirmed successfully" });
  } catch (error) {
    console.error("Error confirming order:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
    next(error);
  }
};

exports.updateOrderToCancel = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await updateOrderToCancelService(orderId);

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ status: "Success", message: "Order confirmed successfully" });
  } catch (error) {
    console.error("Error confirming order:", error);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
    next(error);
  }
};
