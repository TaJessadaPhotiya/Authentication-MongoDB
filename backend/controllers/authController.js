const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "Email already in use" });

    const user = new User({ username, email, password });
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const { username, email } = req.body;

    if (email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: decoded.userId },
      });
      if (emailExists) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { username, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getProfile, updateProfile };
