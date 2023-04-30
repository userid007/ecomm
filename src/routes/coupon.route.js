import { Router } from "express";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from "../controllers/coupon.controller.js";
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";
import {
  createCouponValidator,
  updateCouponValidator,
} from "../validators/coupon.validator.js";

const router = Router();

router.post(
  "/",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR),
  createCouponValidator,
  createCoupon
);
router.put(
  "/:id",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR),
  updateCouponValidator,
  updateCoupon
);
router.delete(
  "/:id",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR),
  deleteCoupon
);
router.get(
  "/",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.MODERATOR),
  getAllCoupons
);
export default router;
