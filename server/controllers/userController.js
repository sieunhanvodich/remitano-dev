import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../share/util.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

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
