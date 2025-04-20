const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email"); // Only send name & email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // Update name and email directly
    if (name) user.name = name;
    if (email) user.email = email;

    // Password change logic
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    const updatedUser = await User.findById(req.user.id).select("-password");
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};
