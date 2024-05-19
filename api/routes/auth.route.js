import express from "express";
import { login, resendVerificationEmail, signup, verifyToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/login", login);
router.get("/verify/:token", verifyToken); 
router.post("/resend-verification", resendVerificationEmail);

export default router;
