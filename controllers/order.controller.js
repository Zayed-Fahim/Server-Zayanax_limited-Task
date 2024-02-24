const {
  postOrderService,
  getOrdersService,
  updateOrderStatusService,
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
    if (orders?.length <= 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "No Orders found!",
        payload: orders,
      });
    }
    res.status(200).json({
      status: "Success",
      message: "All Orders data are here!",
      payload: orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await updateOrderStatusService(orderId, req.body);
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ status: "Failed", message: "Order not found" });
    }
    res.status(200).json({
      status: "Success",
      message: "Order Status updated successfully!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
    next(error);
  }
};
