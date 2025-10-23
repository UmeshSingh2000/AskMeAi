const jwt = require('jsonwebtoken');

const decodeJWT = (token) => {
  try {
    if (!token) throw new Error("No token provided");

    // verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // differentiate between expired or malformed tokens
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};

module.exports = { decodeJWT };
