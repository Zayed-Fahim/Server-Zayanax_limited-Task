const Order = require("../models/Order");

exports.postOrderService = async (data) => {
  try {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 900) + 100;
    const orderNumber = parseInt(`${timestamp}${randomPart}`);
    const newData = {
      orderNo: orderNumber,
      ...data,
    };
    const order = await Order.create(newData);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};

exports.getOrdersService = async (data) => {
  if (!data || data === "all") {
    return await Order.find({});
  } else if (data) {
    return await Order.find({ status: data });
  }
};

exports.updateOrderToConfirmService = async (orderId) => {
  const updateOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: "confirm" },
    { new: true }
  );
  return updateOrder;
};

exports.updateOrderToCancelService = async (orderId) => {
  const updateOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: "cancel" },
    { new: true }
  );
  return updateOrder;
};
