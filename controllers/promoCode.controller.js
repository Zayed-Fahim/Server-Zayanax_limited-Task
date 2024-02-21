const PromoCode = require("../models/PromoCode");
const {
  postPromoCodeService,
  getPromoCodesService,
  getPromoCodeService,
} = require("../services/promoCode.service");

exports.postPromoCode = async (req, res, next) => {
  try {
    const promoCode = await postPromoCodeService(req.body);
    res.status(200).json({ status: "Success", message: "Promo Code Added!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.getPromoCodes = async (req, res, next) => {
  try {
    const promoCodes = await getPromoCodesService();
    res.status(200).json({
      status: "Success",
      message: "All Promo code are here!",
      payload: promoCodes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};

exports.getPromoCode = async (req, res, next) => {
  try {
    const { promoCode } = req.body;
    const isExists = await PromoCode.exists({ promoCode });
    if (!isExists) {
      return res.status(404).json({
        status: "Failed",
        message: "Not valid promo code!",
      });
    }
    const isAvailable = await PromoCode.exists({
      $and: [{ promoCode }, { userTime: { $ne: 0 } }],
    });
    if (!isAvailable) {
      return res.status(410).json({
        status: "Gone",
        message: "Limit exceeded!",
      });
    }
    const isActive = await PromoCode.exists({
      $and: [{ status: true }, { promoCode }],
    });
    if (isExists && !isActive) {
      return res.status(410).json({
        status: "Gone",
        message: "Expired code!",
      });
    }
    const result = await getPromoCodeService(req.body);
    const newResult = {
      discountRate: result.discountRate,
    };
    res.status(200).json({
      status: "Success",
      message: "Promo Code found and still available!",
      payload: newResult,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error!" });
    next(error);
  }
};
