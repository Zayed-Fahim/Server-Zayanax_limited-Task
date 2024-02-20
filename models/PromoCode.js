const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema(
  {
    promoCode: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    discountRate: {
      type: Number,
      required: true,
    },
    useTime: {
      type: Number,
      required: true,
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

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);

module.exports = PromoCode;
