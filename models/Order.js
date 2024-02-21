const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNo: {
      required: true,
      unique: true,
      type: Number,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    terms: {
      required: true,
      type: Boolean,
    },
    cart: [
      {
        required: true,
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
