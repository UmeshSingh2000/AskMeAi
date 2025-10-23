const { decodeJWT } = require('../utils/decode');

const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = decodeJWT(token);

    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);

    // Handle specific error messages
    if (err.message === "Token expired") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }

    if (err.message === "Invalid token") {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }

    // Generic fallback
    return res.status(500).json({ message: "Authentication failed", error: err.message });
  }
};

module.exports = { isAuthenticated };
