import messageController from "../controllers/message.controller.js";
import express from "express";
const messageRout = express.Router();

messageRout.post("/api/message/send", messageController.sendMessage);
messageRout.post("/api/message/retrive", messageController.retrieveMessages);

export default messageRout;
