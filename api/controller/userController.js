const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const userCreate = {
  registerUser: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // check for email password and username
    if ((!username, !email, !password)) {
      throw new Error("username email and password is required");
    }
    //findOne email it throw an error
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Email is already Registered" });
    }
    //hashed the password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Account created successful", user });
  }),

  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if ((!email, !password)) {
      res.status(400).json({ message: "Email and Password is required" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "check you Email and password " });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    res.status(201).json({ message: "Login Successful", user });
  }),
};
module.exports = userCreate;
