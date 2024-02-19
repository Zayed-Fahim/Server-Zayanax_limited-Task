const Admin = require("../models/Admin");
const { postAdminService } = require("../services/adminRegister.service");

exports.postAdmin = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const alreadyExists = await Admin.exists({
      userId,
    });
    if (alreadyExists) {
      return res
        .status(509)
        .json({ status: "Conflict", message: "Account already exists!" });
    }
    const admin = await postAdminService(req.body);
    res
      .status(200)
      .json({ status: "Success", message: "Account created successfully!" });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error" });
    next(error);
  }
};
