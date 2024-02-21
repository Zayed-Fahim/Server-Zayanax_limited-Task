const express = require("express");
const router = express.Router();

const {
  getPromoCodes,
  postPromoCode,
  getPromoCode,
  updatePromoCode,
} = require("../controllers/promoCode.controller");

router.route("/:promoCodeId").patch(updatePromoCode);
router.route("/").get(getPromoCodes).post(postPromoCode);
router.route("/apply-promo-code").post(getPromoCode);

module.exports = router;
