const express = require("express");
const router = express.Router();

const { verifyAdminToken } = require("../middlewares/verifyAdminToken");
const { getAdminById, verifyAdmin } = require("../controllers/adminLogin.controller");

router.route("/").post(getAdminById);
router.route("/verify").get(verifyAdminToken, verifyAdmin);

module.exports = router;
