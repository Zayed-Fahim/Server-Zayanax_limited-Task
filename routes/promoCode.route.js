const express = require("express");
const router = express.Router();

const {
  getPromoCodes,
  postPromoCode,
} = require("../controllers/promoCode.controller");

router.route("/").get(getPromoCodes).post(postPromoCode);

module.exports = router;
