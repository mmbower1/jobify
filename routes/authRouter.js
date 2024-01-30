import { Router } from "express";
import { login, register, logout } from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
