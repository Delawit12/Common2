import messageController from "../controllers/message.controller.js";
import express from "express";
const messageRout = express.Router();

messageRout.post("/api/message/sendMessage", messageController.sendMessage);

export default messageRout;
