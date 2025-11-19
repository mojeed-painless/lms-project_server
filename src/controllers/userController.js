import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, userName, password, role } = req.body;

  if (!firstName || !lastName || !email || !userName || !password || !role) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    const emailExists = existingUser.email === email;
    const usernameExists = existingUser.userName === userName;

    if (emailExists && usernameExists) {
      return res.status(400).json({ message: "Email and username already exist" });
    } else if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      return res.status(400).json({ message: "Username already exists" });
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    userName,
    password: hashedPassword,
    role: role || "student"
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: "Invalid Username or Password" });
  }
};

// Current user
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password"); // exclude password
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
