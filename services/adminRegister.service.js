const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

exports.postAdminService = async (data) => {
  const { password, userId, role } = data;
  try {
    const saltRounds = 14;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newData = {
      userId,
      password: hashedPassword,
      role,
    };
    const admin = await Admin.create(newData);
    return admin;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
