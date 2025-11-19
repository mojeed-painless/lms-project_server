import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"; // middleware to verify JWT

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser); // <-- new endpoint

export default router;  // <--- THIS is the default export
