import { Router } from "express";
import authRoutes from "./auth.route.js";
import collectionRoutes from "./collection.route.js";
import productRoutes from "./product.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/collection", collectionRoutes);
router.use("/product", productRoutes);
export default router;
