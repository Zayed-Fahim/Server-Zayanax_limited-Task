const {
  postPromoCodeService,
  getPromoCodesService,
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
