const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productPriceBeforeDiscount: {
      type: Number,
      required: true,
    },
    discountRate: {
      type: Number,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.index({ productName: "text" });
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
