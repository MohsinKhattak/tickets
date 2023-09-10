const jwt = require("jsonwebtoken"); 
const secretKey = "YourSecretKeyHere"; 

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  console.log("Received Token:", token);

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Payload:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(401).json({ message: "Token invalid." });
  }
};

module.exports = authMiddleware;
