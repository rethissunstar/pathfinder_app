const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "supersecret";

// Sign the token
function generateToken(user) {
  return jwt.sign(
    {
      userId: user.userId,
      userName: user.userName,
      permission: user.permission,
    },
    SECRET,
    { expiresIn: "1h" }
  );
}

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // attach user info
    next();
  });
}

// Random User ID generator (if needed)
function generateUserId() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

module.exports = {
  generateToken,
  authenticateToken,
  generateUserId,
};

  