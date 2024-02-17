import express from "express";
import userController from "../controllers/user.controller.js";
import { auth, isAdmin } from "../auth/auth.js";
const userRoutes = express.Router();

userRoutes.post("/api/user/register", userController.registerUser);
userRoutes.post("/api/user",  userController.confirmOTP);
userRoutes.post("/api/user",  userController.forgetPassword);
userRoutes.post("/api/user",  userController.newPassword);
userRoutes.post("/api/user", [auth], userController.changePassword);

export default userRoutes;
