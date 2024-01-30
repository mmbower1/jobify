import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

import { authorizePermissions } from "../middleware/authMiddleware.js";
import { validateUpdatedUser } from "../middleware/validationMiddleware.js";

const router = Router();

router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.get("/current-user", getCurrentUser);
router.patch("/update-user", validateUpdatedUser, updateUser);

export default router;
