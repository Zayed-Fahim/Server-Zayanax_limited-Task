const jwt = require("jsonwebtoken");

exports.createJSONWebToken = async (payload, secretKey) => {
  try {
    const token = jwt.sign(payload, secretKey);
    return token;
  } catch (error) {
    console.error("Error creating JWT:", error.message);
    throw error;
  }
};
