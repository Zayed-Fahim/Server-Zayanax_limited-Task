const User = require("../models/User");
const { createJSONWebToken } = require("../hooks/jsonWebToken");
const { postUserService } = require("../services/userRegister.service");

exports.postUser = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const alreadyExists = await User.exists({ phone });
    if (alreadyExists) {
      return res.status(509).json({
        status: "Conflict",
        message: "Account already exists for this Number!",
      });
    }
    const user = await postUserService(req.body);
    if (!user) {
      return res.status(401).json({
        status: "Failed",
        message: "Failed to sign up! Try again later.",
      });
    } else {
      const newUserData = {
        phone: user.phone,
        role: user.role,
      };
      const token = await createJSONWebToken(
        { phone: user.phone, role: user.role },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({
        status: "Success",
        message: "Successfully sign up!",
        payload: { newUserData, token: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req?.user?.phone });

    const newUserData = {
      phone: user?.phone,
      role: user?.role,
    };
    res.status(200).json({
      status: "Success",
      message: "You have access to this protected route.",
      payload: { newUserData },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "You are not authorized!",
      error: error.message,
    });
  }
};
