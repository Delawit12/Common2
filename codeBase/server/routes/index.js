import express from "express";
const appRoute = express.Router();

// all routes
import userRoutes from "./user.route.js";
import loginRoutes from "./login.route.js";
import profileRout from "./profile.route.js";
import messageRout from "./message.route.js";
import dashboardRoute from "./dashboard.route.js"

// adding middleware
appRoute.use(userRoutes);
appRoute.use(loginRoutes);
appRoute.use(profileRout);
appRoute.use(messageRout);
// appRoute.use(dashboardRoute);




export default appRoute;
