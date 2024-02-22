const PromoCode = require("../models/PromoCode");

exports.postPromoCodeService = async (data) => {
  const promoCode = await PromoCode.create(data);
  return promoCode;
};

exports.getPromoCodesService = async () => {
  const promoCodes = await PromoCode.find({});
  return promoCodes;
};

exports.getPromoCodeService = async (data) => {
  const { promoCode } = data;
  const promoCodeData = await PromoCode.findOne({ promoCode });

  const currentDate = new Date();
  const endDate = new Date(promoCodeData.endDate);

  if (endDate < currentDate) {
    await PromoCode.findOneAndUpdate(
      { promoCode },
      { $set: { status: false } },
      { new: true }
    );
  }

  const updatedPromoCode = await PromoCode.findOneAndUpdate(
    { promoCode },
    {
      $inc: { usageCount: 1 },
      $set: { useTime: promoCodeData.useTime - 1 },
    },
    { new: true }
  );
  if (!updatedPromoCode) {
    throw new Error("Failed to update promo code");
  }
  return updatedPromoCode;
};

exports.updatePromoCodeService = async (promoCodeId, data) => {
  try {
    const updatedPromoCode = await PromoCode.findByIdAndUpdate(promoCodeId, data, {
      new: true,
    });
    if (!updatedPromoCode) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
