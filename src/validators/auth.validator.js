import Joi from "joi";
import validateHandler from "../service/validateHandler.js";

export const signUpValidator = (req, res, next) => {
  const passwordPattern =
    "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()-__+.]){1,}).{8,}$";
  const namePattern = "^[a-zA-Z]+$";
  const signUpSchema = Joi.object({
    name: Joi.string()
      .max(50)
      .pattern(new RegExp(namePattern))
      .required()
      .messages({
        "string.pattern.base": "Name should only contain characters",
      }),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp(passwordPattern))
      .required()
      .messages({
        "string.pattern.base": "Password is not strong",
      }),
  });
  validateHandler(req, res, next, signUpSchema);
};

export const loginValidator = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  validateHandler(req, res, next, loginSchema);
};
