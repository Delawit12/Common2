import messageService from '../services/message.service'

sendMessage: async (req, res) => {
    try {
      const { user1, user2, content } = req.body;

      if (!senderId || !recipientId || !content) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      req.body.user1 = parseInt(senderId) > parseInt(recipientId) ? recipientId : senderId;
      req.body.user2 = parseInt(senderId) > parseInt(recipientId) ? senderId : recipientId;

      const existingConversation = await messageService.getConversation(req.body.user1, req.body.user2);
      if (!existingConversation) {
        const createConversation = await messageService.createConversation(req.body.user1, req.body.user2);
        req.body.conversationId = createConversation.insertedId;
      } else {
        req.body.conversationId = existingConversation[0].conversationId;
      }

      const isSent = await messageService.insertIntoMessage(req.body);
      if (!isSent) {
        return res.status(400).json({
          success: false,
          message: 'Failed to send the message'
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Message sent'
        });
      }
    } catch (error) {
//      console.error('Error sending message:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  retrieveMessages: async (req, res) => {
    try {
      const { senderId, recipientId } = req.body;
  
      if (!senderId || !recipientId) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }
  
      const existingConversation = await messageService.getConversation(senderId, recipientId);
  
      if (!existingConversation) {
        return res.status(404).json({
          success: false,
          message: 'Conversation not found',
        });
      }
  
      const conversationId = existingConversation[0].conversationId;
      const messages = await messageService.getConversationMessages(conversationId);
  
      if (!messages || messages.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No messages found',
        });
      }
  
      const lastMessage = messages[messages.length - 1];
  
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

  retrieveLastMessages: async (req, res) => {
    try {
      const { senderId, recipientId } = req.body;
  
      if (!senderId || !recipientId) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }
  
      const existingConversation = await messageService.getConversation(senderId, recipientId);
  
      if (!existingConversation) {
        return res.status(404).json({
          success: false,
          message: 'Conversation not found',
        });
      }
  
      const conversationId = existingConversation[0].conversationId;
      const messages = await messageService.getConversationMessages(conversationId);
  
      if (!messages || messages.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No messages found',
        });
      }
  
      const lastMessage = messages[messages.length - 1];
      const allAboutMessage =  await messageService.getMessages(conversationId);
      const conversationId = allAboutMessage[0].conversationId;
      const conversationId = allAboutMessage[0].conversationId;


  
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



































//       if (messages) {
//         return res.status(200).json({
//           success: true,
//           data: messages
//         });
//       } else {
//         return res.status(500).json({
//           success: false,
//           message: 'Failed to retrieve messages'
//         });
//       }
//     } catch (error) {
//       console.error('Error retrieving messages:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Server error'
//       });
//     }
//   },

//   retrieveConversation: async (req, res) => {
//     try {
//       const { user1, user2 } = req.body;
//       const conversation = await messageService.retrieveConversation(user1, user2);

//       if (!conversation) {
//         return res.status(404).json({
//           success: false,
//           message: 'Conversation not found'
//         });
//       } else {
//         return res.status(200).json({
//           success: true,
//           data: conversation
//         });
//       }
//     } catch (error) {
//       console.error('Error retrieving conversation:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to retrieve conversation'
//       });
//     }
//   },

//   createConversation: async (req, res) => {
//     try {
//       const { user1, user2 } = req.body;
//       await messageService.createConversation(user1, user2);
//       return res.status(200).json({
//         success: true,
//         message: 'Conversation created successfully'
//       });
//     } catch (error) {
//       console.error('Error creating conversation:', error);
//       return res.status(500).json({
//         success: false,
//         error: 'Failed to create conversation'
//       });
//     }
//   }
};
export default messageController;