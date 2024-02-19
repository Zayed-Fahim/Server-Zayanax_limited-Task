const express = require("express");
const router = express.Router();

const { postAdmin } = require("../controllers/adminRegister.controller");

router.route("/").post(postAdmin);

module.exports = router;
