import crypto from 'crypto';
import sendEmail from '../utils/email.js';
import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24hr' });
};

// Register

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    // Generate confirmation token
    const confirmToken = crypto.randomBytes(64).toString("hex");
    user.confirmEmailToken = confirmToken; 
    user.confirmEmailExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    // Confirmation link points to backend
    const confirmUrl = `http://localhost:${process.env.PORT || 5000}/api/users/confirm/${user.confirmEmailToken}`;
    await sendEmail({
      to: user.email,
      subject: "Welcome to E-Commerce App",
      text: `Hi ${user.name}, please confirm your email by clicking: ${confirmUrl}`,
      html: `<p>Hi ${user.name},</p><p>Please confirm your email by clicking <a href="${confirmUrl}">here</a>.</p>`
    });

    if (user) {
      res.status(201).json({
        message: "Registration successful. Please check your email to confirm.",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// Confirm Email
export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({
      confirmEmailToken: token,
      confirmEmailExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.isConfirmed = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Email confirmed successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Email confirmation failed", error });
  }
};


// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isConfirmed) {
        return res.status(403).json({ message: "Please confirm your email before logging in." });
      }

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Login failed", error: error.message });
  // }
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(64).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:${process.env.PORT || 5000}/reset/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `Reset your password here: ${resetUrl}`,
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`
    });

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending reset email", error });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password; // will be hashed by pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};


// Profile
export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// get single user (admin only)
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({message: "Users retrieved successfully",users});
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = req.body.isAdmin;
    await user.save();
    // Fetch updated user without password
    const updatedUser = await User.findById(user._id).select("-password");
    return res.status(200).json({
      message: "User role updated successfully",
      user:updatedUser
    });
  } catch (error) {
    return res.status(500).json({message: "Error updating user role",error: error.message});
  }
};


