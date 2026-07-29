import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });
    return next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};

// Admin check
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next(); // just pass control
  } else {
    return res.status(403).json({ message: "Admin access required" });
  }
};
