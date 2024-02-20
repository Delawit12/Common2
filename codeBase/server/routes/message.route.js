import express from "express";
const messageRoutes = express.Router();
import messageController from '../controllers/message.controller.js';
// import { auth, isAdmin } from "../auth/auth.js";



// Send message route
messageRoutes.post('/api/message', messageController.sendMessage);
messageRoutes.get('/api/conversations', messageController.getConversation); 
messageRoutes.get('/api/messages', messageController.getLastMessage);
messageRoutes.get('/api/role', messageController.getRoleName); 



export default messageRoutes;