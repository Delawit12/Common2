import { auth, isAdmin } from "../auth/auth.js";
import loginController from "../controllers/login.controller.js";
import express from "express";
const loginRout = express.Router();
loginRout.post("/api/login", [auth, isAdmin], loginController.loginUser);

export default loginRout;
