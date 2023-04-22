import { Router } from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollection,
} from "../controllers/collection.controller.js";
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router();

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCollection);
router.put("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateCollection);
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteCollection);
router.get("/", getAllCollection);

export default router;
