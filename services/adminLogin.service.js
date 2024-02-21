const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

exports.getAdminByIdService = async (data) => {
  try {
    const admin = await Admin.findOne({ userId: data?.userId });
    if (!admin) {
      return null;
    }
    const isPasswordMatch = await bcrypt.compare(data.password, admin?.password);
    if (isPasswordMatch) {
      return admin;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding admin:", error);
    throw error;
  }
};
