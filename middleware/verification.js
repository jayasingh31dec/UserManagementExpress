const jwt = require("jsonwebtoken");

const verify_token = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No access!" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // ✅ Correct variable name
    req.user = { userId: payload.id };  // ✅ Pass only the userId
    next();
  } catch {
    res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = verify_token;
