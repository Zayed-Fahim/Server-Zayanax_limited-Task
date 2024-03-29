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
    const orders = await Order.find({});
    return orders;
  }
  if (data && data === "pending") {
    const orders = await Order.find({ status: "" });
    return orders;
  }
  if (data && data === "confirm") {
    const orders = await Order.find({ status: data });
    return orders;
  }
  if (data && data === "canceled") {
    const orders = await Order.find({ status: data });
    return orders;
  }
};

exports.updateOrderStatusService = async (orderId, data) => {
  const updateOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: data?.status },
    { new: true }
  );
  return true;
};
