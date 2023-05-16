import Joi from "joi";
import validateHandler from "../service/validateHandler.js";

export const createCouponValidator = (req, res, next) => {
  const createCouponSchema = Joi.object({
    code: Joi.string().trim().alphanum().required(),
    discount: Joi.number().min(0).max(100).required(),
    active: Joi.boolean().required(),
  });
  validateHandler(req, res, next, createCouponSchema);
};

export const updateCouponValidator = (req, res, next) => {
  const updateCouponSchema = Joi.object({
    discount: Joi.number().min(0).max(100),
    active: Joi.boolean(),
  });
  validateHandler(req, res, next, updateCouponSchema);
};
