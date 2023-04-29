import { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";
import { formMiddleWare } from "../middlewares/form.middleware.js";

const router = Router();

router.post(
  "/",
  isLoggedIn,
  authorize(AuthRoles.ADMIN),
  formMiddleWare,
  addProduct
);

export default router;
