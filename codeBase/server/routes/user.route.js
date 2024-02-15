import express from 'express'
import userController from '../controllers/user.controller.js';
import {auth,isAdmin}from '../auth/auth.js'
const userRoutes = express.Router();

userRoutes.post('/api/user', [auth,isAdmin],userController.registerUser);
userRoutes.post('/api/user', [auth,isAdmin],userController.confirmOTP);
userRoutes.post('/api/user', [auth,isAdmin],userController.forgetPassword);
userRoutes.post('/api/user', [auth,isAdmin],userController.newPassword);
userRoutes.post('/api/user', [auth,isAdmin],userController.changePassword);


export default userRoutes;