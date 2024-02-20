const PromoCode = require("../models/PromoCode");

exports.postPromoCodeService = async (data) => {
  const promoCode = await PromoCode.create(data);
  return promoCode;
};

exports.getPromoCodesService = async () => {
  const promoCodes = await PromoCode.find({});
  return promoCodes;
};
