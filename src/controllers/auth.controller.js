import User from "../models/user.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  const user = await User.create({ name, email, password });

  user.password = undefined;
  const token = user.getJWTtoken();

  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({
    success: true,
    accessToken: token,
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("Invalid credentials", 401);
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    throw new CustomError("Invalid credentials", 401);
  }

  const token = user.getJWTtoken();
  user.password = undefined;

  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({
    success: true,
    accessToken: token,
    user,
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const { user } = req;

  if (!user) {
    throw new CustomError("User not found", 401);
  }

  res.status(200).json({
    success: true,
    user,
  });
});
