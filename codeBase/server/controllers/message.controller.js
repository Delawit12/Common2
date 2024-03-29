import messageService from '../services/message.service.js'
const messageController={
  sendMessage: async (req, res) => {
    try {
      req.body.senderId =  req.userId ;
      const { senderId ,recipientId, isText } = req.body;
     

      if (!senderId || !recipientId) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      req.body.user1 = parseInt(senderId) > parseInt(recipientId) ? recipientId : senderId;
      req.body.user2 = parseInt(senderId) > parseInt(recipientId) ? senderId : recipientId;
      const isConversationExist = await messageService.getConversation(req.body);
      console.log(isConversationExist);
      if (!isConversationExist.length) {
        const createConversation = await messageService.createConversation(req.body);
        req.body.conversationId = createConversation.insertId;
      } else {
        req.body.conversationId = isConversationExist[0].conversationId;
      }
      if (!isText) {
        req.body.imageUrl = req.file.path;
        req.body.messageText = "";
      } else {
        req.body.imageUrl = "";
      }
       
      // messageId, isText, imageUrl, messageText
      const isMessage = await messageService.insertIntoMessage(req.body);
      console.log(isMessage);
      req.body.messageId = isMessage.insertId;
      console.log(isMessage);
      const isMessageContent = await messageService.insertIntoMessageContent(req.body);
      console.log(isMessageContent);
      if (isMessage && isMessageContent) {
        return res.status(200).json({
          success: true,
          message: 'Message sent',
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },
  
  getConversation: async (req, res) => {
     try {
      const userId =req.userId;
      const isConversationsExists = await messageService.getConversation(userId);
      return res.status(200).json({
        success: true,
        data: isConversationsExists
      })
    

    //   const { user2 } = req.body;
    //   const user1 = req.user.id; // Assuming user ID is stored in req.user.id

    //   const conversationData = {
    //     user1: Math.min(user1, user2),
    //     user2: Math.max(user1, user2)
    //   };

      // const isConversationExist = await messageService.getConversation(conversationData);

      // if (!isConversationExist.length) {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'No conversation found',
      //   });
      // } else {
      //   const conversationId = isConversationExist[0].conversationId;
      //   const messageData = { conversationId };
      //   const isMessageExist = await messageService.getMessage(messageData);

      //   return res.status(200).json({
      //     success: true,
      //     data: isMessageExist,
      //   });
      // }
    } catch (error) {
      console.error('Error retrieving conversation:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },
  
  getMessage: async (req, res) => {
    try {
     const conversationId = req.params.id.substring(1);
     const isMessagesExists = await messageService.getMessage(conversationId);
     return res.status(200).json({
       success: true,
       data: isMessagesExists
     })
   

   } catch (error) {
     console.error('Error retrieving conversation:', error);
     return res.status(500).json({
       success: false,
       message: 'Server error',
     });
   }
 },


  getLastMessage: async (req, res) => {
    try {
      const isConversationExist = await messageService.getConversation(req.body);
      req.body.conversationId = isConversationExist[0].conversationId;
      
      const isMessageExist = await messageService.getMessageById(req.body);

      const lastMessage = isMessageExist[isMessageExist.length - 1];

      return res.status(200).json({
        success: true,
        data: lastMessage,
      });
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },
  
  getRoleName: async (req, res) => {
    try {
      const isRoleName = await messageService.getRoleName();
      if (!isRoleName.length) {
        return res.status(400).json({
          success: false,
          message: 'No Role found',
        });
      }
      return res.status(200).json({
        success: true,
        data: isRoleName,
      });
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  },

//   getRoleName : (req, res)=> {
//   try {
//     const roles = await rolesService.getRoles();
//     res.json(roles);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

};

export default messageController;