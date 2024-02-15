import express from "express";
const appRoute = express.Router();

// all routes
import userRout from "./user.routes.js";
import profileRout from "./profile.route.js";
import messageRout from "./message.route.js";


// adding middleware 
appRoute.use(userRout);
appRoute.use(profileRout);
appRoute.use(messageRout);
export default appRoute;