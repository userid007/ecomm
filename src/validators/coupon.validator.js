import Joi from "joi";
import validateHandler from "../service/validateHandler.js";

const createCouponSchema = Joi.object({
  code: Joi.string().alphanum().required(),
  discount: Joi.number().min(0).max(100).required(),
  active: Joi.boolean().required(),
});

export const createCouponValidator = (req, res, next) => {
  validateHandler(req, res, next, createCouponSchema);
};

const updateCouponSchema = Joi.object({
  code: Joi.string().alphanum(),
  discount: Joi.number().min(0).max(100),
  active: Joi.boolean(),
});

export const updateCouponValidator = (req, res, next) => {
  validateHandler(req, res, next, updateCouponSchema);
};