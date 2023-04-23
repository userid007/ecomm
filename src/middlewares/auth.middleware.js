import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.cookies.accessToken ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.accessToken || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError("Not authorized to access this resource", 401);
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodedJwtPayload.sub, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this resource", 401);
  }
});

export const authorize = (...requiredRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      throw new CustomError(
        "You are not authorized to access this resource",
        401
      );
    }
    next();
  });
