const express = require("express");
const router = express.Router();

const {
  getPromoCodes,
  postPromoCode,
  getPromoCode,
} = require("../controllers/promoCode.controller");

router.route("/").get(getPromoCodes).post(postPromoCode);
router.route("/apply-promo-code").post(getPromoCode);

module.exports = router;
