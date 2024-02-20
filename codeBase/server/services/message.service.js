import query from '../config/db.js';
import messageQuery from '../queries/message.query.js';

const messageService = {
  getConversation: async (data) => {
    try {
      const rows = await query(messageQuery.getConversation, [data.user1, data.user2]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  createConversation: async (data) => {
    try {
      const rows = await query(messageQuery.createConversation, [data.user1, data.user2]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  insertIntoMessageText: async (data) => {
    try {
      const rows = await query(messageQuery.insertIntoMessageText, [data.conversationId,data.messageText]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  insertIntoMessage: async (data) => {
    try {
      const rows = await query(messageQuery.insertIntoMessage, [data.conversationId,data.senderId]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  insertIntoMessageContent: async (data) => {
    try {
      console.log(data);
      console.log([data.messageId, data.isText, data.imageUrl, data.messageText]);
      const rows = await query(messageQuery.insertIntoMessageContent, [data.messageId, data.isText, data.imageUrl, data.messageText]);
      return rows;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  getMessage: async(data)=>{
  try {
    const rows = await query(messageQuery.getMessage, [data.conversationId]);
    return rows;
  } catch (e) {
    console.log(e);
    return null;
  }
},

getRoleName: async(data)=>{
  try {
    const rows = await query(messageQuery.getRoleName, [data.userRoleId]);
    return rows;
  } catch (e) {
    console.log(e);
    return null;
  }
},

getConversation: async (data) => {
  try {
    const rows = await query(messageQuery.getConversation, [data.conversationId]);
    return rows;
  } catch (e) {
    console.log(e);
    return null;
  }
},
getMessageById: async (data) => {
  try {
    const rows = await query(messageQuery.getMessageById, [data.conversationId]);
    return rows;
  } catch (e) {
    console.log(e);
    return null;
  }
},

};

export default messageService;