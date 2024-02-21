const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.postUserService = async (data) => {
  const { phone, password, role } = data;
  try {
    const saltRounds = 14;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newData = {
      phone,
      password: hashedPassword,
      role,
    };
    const user = await User.create(newData);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
