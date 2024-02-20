import express from "express";
const messageRoutes = express.Router();
import messageController from '../controllers/message.controller.js';
import { auth, isAdmin } from "../auth/auth.js";



// Send message route
messageRoutes.post('/api/message', auth,messageController.sendMessage);
messageRoutes.get('/api/conversations',auth, messageController.getConversation); 
messageRoutes.get('/api/messages/:id',auth, messageController.getMessage);
messageRoutes.get('/api/role', messageController.getRoleName); 



export default messageRoutes;