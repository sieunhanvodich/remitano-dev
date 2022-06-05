import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken, isValidEmail } from "../share/util.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email.trim === "" || password.trim() === "" || !isValidEmail(email)) {
    res.status(400);
    throw new Error("Invalid value");
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      password,
    });
  } else if (!(await user.matchPassword(password))) {
    console.log("go here");
    res.status(401);
    throw new Error("Invalid password");
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
});

export { login };
