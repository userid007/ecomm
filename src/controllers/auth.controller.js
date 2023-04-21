import User from "../models/user.schema";
import asyncHandler from "../service/asyncHandler";
import CustomError from "../service/customError";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  const user = User.create({ name, email, password });

  const token = user.getJWTtoken();
  user.password = undefined;
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({
    success: true,
    accessToken: token,
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("All fields are required", 400);
  }

  const user = User.findOne({ email }).select("+password");
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
