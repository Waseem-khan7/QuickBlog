import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

export default auth;
