import auth from "../auth/auth.js";
import profileController from "../controllers/profile.controller.js";
import express from "express";
const profileRout = express.Router();

profileRout.put(
  "/api/profile/updateProfile",
  auth,
  profileController.updateProfile
);
profileRout.get("/api/profile/getProfile", auth, profileController.getProfile);

export default profileRout;
