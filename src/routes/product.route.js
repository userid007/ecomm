import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductByCollectionId,
} from "../controllers/product.controller.js";
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

router.get("/", isLoggedIn, getAllProducts);
router.get("/:id", isLoggedIn, getProductByCollectionId);
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteProduct);

export default router;
