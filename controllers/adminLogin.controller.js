const { createJSONWebToken } = require("../hooks/jsonWebToken");
const Admin = require("../models/Admin");
const { getAdminByIdService } = require("../services/adminLogin.service");

exports.getAdminById = async (req, res, next) => {
  try {
    const admin = await getAdminByIdService(req.body);

    if (!admin) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Invalid credentials!",
      });
    } else {
      const newAdminData = {
        userId: admin?.userId,
        role: admin?.role,
      };
      const token = await createJSONWebToken(
        { userId: admin?.userId, role: admin?.role },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.status(200).json({
        status: "Success",
        message: "Successfully Logged in!",
        payload: { newAdminData, token: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
      error: error.message,
    });
    next(error);
  }
};

exports.verifyAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ userId: req?.admin?.userId });
    const newAdminData = {
      userId: admin?.userId,
      role: admin?.role,
    };
    res.status(200).json({
      status: "Success",
      message: "You have access to this protected route.",
      payload: { newAdminData },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "You don't have access.",
      error: error.message,
    });
  }
};
