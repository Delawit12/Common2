import express from "express";
import dashboardController from "../controllers/dashboard.controller.js";
import { auth, isAdmin } from "../auth/auth.js";
const dashboardRoute = express.Router();

dashboardRoute.put("/api/user/deactivate/:id", dashboardController.deactivateUser);  
dashboardRoute.get("/api/user/delete/:id", dashboardController.deleteUser);
dashboardRoute.get("/api/user/date", dashboardController.getUsersRegisteredOnSpecificDay);
dashboardRoute.get("/api/user/month", dashboardController.getUsersRegisteredInSpecificMonth);
dashboardRoute.get("/api/user/year", dashboardController.getUsersRegisteredInSpecificYear);

// dashboardRoute.post("/api/user/assignRole", dashboardController.insertIntoRole);
dashboardRoute.get("/api/user/gender", dashboardController.getUserGenderPercentage);
dashboardRoute.get("/api/user/status",dashboardController.getUserStatusPercentage);
dashboardRoute.get("/api/user/role", dashboardController.getUsersCountByRole);
dashboardRoute.get("/api/user/emailstat", dashboardController.getEmailVerificationStats);





export default dashboardRoute;