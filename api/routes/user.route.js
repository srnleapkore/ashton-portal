import express from "express";
import { deleteUser, signOut, test, updatePassword, updateProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Route to test the API
router.get("/testapi", test);

// Route to update user profile picture, protected by token verification
router.put("/updateprofilepicture/:userId", verifyToken, updateProfile);

// Route to update user password, protected by token verification
router.put("/updatepassword/:userId", verifyToken, updatePassword);

// Route to delete a user, protected by token verification
router.delete("/delete/:userId", verifyToken, deleteUser);

// Route to sign out a user
router.post("/signout", signOut);

export default router;
