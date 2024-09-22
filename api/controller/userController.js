const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const userCreate = {
  registerUser: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // check for email password and username
    if ((!username, !email, !password)) {
      throw new Error("username Email and Password is required");
    }
    //findOne email it throw an error
    let user = await User.findOne({ email });
    if (user) {
      throw new Error(" Email is  already registered");
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
      throw new Error("Email and Password is required");
    }
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("check your Email and Password ");
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    //res.status(201).json({ message: "Login Successful", user });
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "30d",
    });
    res.json({
      username: user.username,
      email: user.email,
      token,
    });
  }),
};
module.exports = userCreate;
