import loginController from "../controllers/login.controller.js";
import express from "express";
const loginRout = express.Router();
loginRout.post("/api/login", loginController.loginUser);

export default loginRout;
