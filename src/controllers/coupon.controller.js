import Coupon from "../models/coupon.schema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";

export const createCoupon = asyncHandler(async (req, res) => {
  const { code, discount } = req.body;
  
  const exitingCoupon = await Coupon.findOne({ code });
  if (exitingCoupon) {
    throw new CustomError("Code already exists", 400);
  }

  const coupon = await Coupon.create({
    code,
    discount,
  });

  res.status(201).json({
    success: true,
    message: "Coupon created successfully",
    coupon,
  });
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const { id: couponId } = req.params;
  const { code, discount, active } = req.body;

  const coupon = await Coupon.findByIdAndUpdate(
    couponId,
    { code, discount, active },
    { new: true, runValidators: true }
  );

  if (!coupon) {
    throw new CustomError("Coupon not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Coupon updated",
    coupon,
  });
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id: couponId } = req.params;
  const coupon = await Coupon.findByIdAndDelete(couponId);
  if (!coupon) {
    throw new CustomError("Coupon not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Coupon deleted",
  });
});

export const getAllCoupons = asyncHandler(async (req, res) => {
  const Coupons = await Coupon.find();
  if (!Coupons) {
    throw new CustomError("No Coupons found", 400);
  }

  res.status(200).json({
    success: true,
    Coupons,
  });
});
