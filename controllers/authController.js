import { StatusCodes } from "http-status-codes";
// model
import User from "../models/UserModel.js";
// utils
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { UnauthenticatedError } from "../middleware/customErrors.js";
import { createJWT } from "../utils/jwt.js";

export const register = async (req, res) => {
  // for admin
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  // hash password
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  // for user
  const user = await User.create(req.body);
  res
    .status(StatusCodes.CREATED) // 201
    .json({ msg: "User account created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidPassword =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidPassword) throw new UnauthenticatedError("Invalid credentials");
  const token = createJWT({ userId: user._id, role: user.role });
  // 1 sec (millisecs) * 1 min * 1 hour * 30 days (24 hr)
  const oneMonth = 1000 * 60 * 60 * 720;
  // secures token on browser from hackers when in production
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneMonth),
    secure: (process.env.NODE_ENV = "production"),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged in successfully" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out." });
};
