const express = require("express");
const router = express.Router();

const { postUser, verifyUser } = require("../controllers/register.controller");
const { verifyUserToken } = require("../middlewares/verifyUserToken");

router.route("/").post(postUser);
router.route("/verify").get(verifyUserToken, verifyUser);

module.exports = router;
